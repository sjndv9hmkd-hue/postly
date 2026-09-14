const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const settingsPath = () => path.join(app.getPath('userData'), 'postly-settings.json');
const queuePath = () => path.join(app.getPath('userData'), 'postly-queue.json');
const readJson = (file, fallback) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } };
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500, height: 980, minWidth: 1080, minHeight: 720, title: 'Postly',
    backgroundColor: '#f6f5f2', autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

async function geminiGenerate(settings, payload) {
  if (!settings.geminiKey) throw new Error('Gemini API 키를 설정해주세요.');
  const model = settings.geminiModel || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(settings.geminiKey)}`;
  const prompt = `20~30대 여성용 Instagram 정보 카드뉴스 원고를 JSON으로 작성하라.
카테고리: ${payload.category}, 개수: ${payload.count}, 시작일: ${payload.startDate}
이미 만든 주제(중복 금지): ${(payload.usedTopics || []).join(' | ') || '없음'}
뻔한 기초상식은 제외하고 구체적이며 저장 가치가 있어야 한다. 건강정보는 단정·진단·과장을 피하고 검수 필요 문구를 포함한다.
각 게시물은 정확히 6장이다. 1장 후킹, 2~5장 핵심 정보, 6장 저장·공유 CTA.
반드시 마크다운 없이 다음 JSON 배열만 반환한다:
[{"topic":"주제","caption":"캡션과 해시태그","cards":[{"kicker":"작은제목","title":"큰제목","body":"본문 2~3문장"}]}]
cards 배열은 반드시 6개이며 모바일용으로 문장을 짧게 쓴다.`;
  const response = await fetch(url, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.9,responseMimeType:'application/json',maxOutputTokens:20000}})
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Gemini 요청 실패');
  const text = data?.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('') || '';
  const parsed = JSON.parse(text.replace(/^```json\s*|```$/g,'').trim());
  if (!Array.isArray(parsed)) throw new Error('AI 응답 형식이 올바르지 않습니다.');
  return parsed;
}

async function githubUpload(settings, item) {
  const { githubOwner, githubRepo, githubToken } = settings;
  if (!githubOwner || !githubRepo || !githubToken) throw new Error('GitHub 이미지 저장소 설정이 필요합니다.');
  const api = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${item.path}`;
  const old = await fetch(api, {headers:{Authorization:`Bearer ${githubToken}`,Accept:'application/vnd.github+json'}});
  const existing = old.ok ? await old.json() : null;
  const response = await fetch(api, {
    method:'PUT',
    headers:{Authorization:`Bearer ${githubToken}`,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},
    body:JSON.stringify({message:`Add Postly media ${item.path}`,content:item.base64,...(existing?.sha?{sha:existing.sha}:{})})
  });
  const data=await response.json();
  if(!response.ok) throw new Error(data?.message || 'GitHub 이미지 업로드 실패');
  const branch=settings.githubBranch||'main';
  return `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${branch}/${item.path.split('/').map(encodeURIComponent).join('/')}`;
}

async function graphPost(url, params) {
  const body=new URLSearchParams();
  Object.entries(params).forEach(([k,v])=>body.set(k, typeof v==='string'?v:JSON.stringify(v)));
  const r=await fetch(url,{method:'POST',body});
  const data=await r.json();
  if(!r.ok || data.error) throw new Error(data?.error?.message || 'Instagram API 오류');
  return data;
}

async function publishCarousel(settings, post) {
  if(!settings.igUserId || !settings.metaToken) throw new Error('Instagram 사용자 ID와 Meta 토큰을 설정해주세요.');
  const version=settings.graphVersion||'v24.0';
  const base=`https://graph.facebook.com/${version}`;
  const children=[];
  for(const imageUrl of post.mediaUrls){
    const child=await graphPost(`${base}/${settings.igUserId}/media`,{image_url:imageUrl,is_carousel_item:'true',access_token:settings.metaToken});
    children.push(child.id);
  }
  const container=await graphPost(`${base}/${settings.igUserId}/media`,{media_type:'CAROUSEL',children,caption:post.caption,access_token:settings.metaToken});
  await sleep(5000);
  const published=await graphPost(`${base}/${settings.igUserId}/media_publish`,{creation_id:container.id,access_token:settings.metaToken});
  return published.id;
}

function processQueue() {
  const queue=readJson(queuePath(),[]);
  const settings=readJson(settingsPath(),{});
  const due=queue.find(x=>x.status==='scheduled' && new Date(x.publishAt).getTime()<=Date.now());
  if(!due)return;
  due.status='publishing';writeJson(queuePath(),queue);
  publishCarousel(settings,due).then(id=>{
    due.status='published';due.instagramMediaId=id;due.publishedAt=new Date().toISOString();writeJson(queuePath(),queue);
    mainWindow?.webContents.send('queue-updated',queue);
  }).catch(error=>{
    due.status='failed';due.error=error.message;due.attempts=(due.attempts||0)+1;writeJson(queuePath(),queue);
    mainWindow?.webContents.send('queue-updated',queue);
  });
}

ipcMain.handle('settings:get',()=>readJson(settingsPath(),{}));
ipcMain.handle('settings:save',(_,settings)=>{writeJson(settingsPath(),settings);app.setLoginItemSettings({openAtLogin:Boolean(settings.startWithWindows)});return true});
ipcMain.handle('ai:generate',(_,payload)=>geminiGenerate(readJson(settingsPath(),{}),payload));
ipcMain.handle('github:upload',(_,item)=>githubUpload(readJson(settingsPath(),{}),item));
ipcMain.handle('queue:get',()=>readJson(queuePath(),[]));
ipcMain.handle('queue:add',(_,posts)=>{const q=readJson(queuePath(),[]);const merged=[...q,...posts];writeJson(queuePath(),merged);return merged});
ipcMain.handle('queue:retry',(_,id)=>{const q=readJson(queuePath(),[]);const p=q.find(x=>x.id===id);if(p){p.status='scheduled';p.publishAt=new Date(Date.now()+60000).toISOString();delete p.error}writeJson(queuePath(),q);return q});
ipcMain.handle('external:open',(_,url)=>shell.openExternal(url));

app.whenReady().then(()=>{createWindow();setInterval(processQueue,60000);setTimeout(processQueue,8000)});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
