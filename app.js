const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
let selectedCategory='자기관리', cards=[], page=0, selectedTemplate='minimal', topic='', suggestionRound=0;

const banks={
'자기관리':[
'의지보다 환경이 습관을 오래 끌고 가는 이유','할 일을 줄였는데 성과가 더 좋아지는 정리법','집중력이 떨어질 때 휴식보다 먼저 볼 것','계획이 자꾸 무너지는 사람의 일정 배치 실수','아침형 인간보다 중요한 나만의 회복 시간 찾기','자기관리 잘하는 사람이 감정을 기록하는 방법','완벽주의가 실행력을 떨어뜨리는 의외의 순간','퇴근 후 에너지를 지키는 경계 설정 5가지','결심을 행동으로 바꾸는 2분 시작 장치','꾸준한 사람이 목표를 작게 측정하는 법','비교 때문에 지칠 때 기준을 되찾는 질문','쉬어도 피곤한 사람을 위한 회복 점검표',
'일요일 밤 불안을 줄이는 주간 마감 루틴','자꾸 미루는 일을 시작하게 만드는 마찰 제거법','목표를 공개했는데 오히려 포기하게 되는 이유','자존감보다 자기효능감을 먼저 키워야 하는 이유','기분에 휘둘리지 않는 최소 루틴 설계법','잘 쉬는 사람이 월요일에 덜 지치는 준비법'
],
'자기관리템':[
'돈값 하는 수면 아이템을 고르는 현실 기준','매일 쓰는 뷰티도구, 교체 시기를 놓치면 생기는 일','광고에 흔들리지 않는 영양제 라벨 읽는 순서','여행용 파우치에 넣으면 후회 없는 미니템','책상 위 피로를 줄이는 작지만 유용한 도구','홈트 기구 사기 전 반드시 확인할 공간 기준','피부관리 기기 구매 전 비용까지 계산하는 법','향보다 지속력을 보고 바디제품 고르는 기준','다이어리보다 오래 쓰는 기록 도구의 조건','아침 준비 시간을 줄여주는 정리 아이템','유행템과 진짜 생활개선템을 구분하는 질문','재구매율 높은 생활템이 공통으로 가진 특징',
'무선기기 구매 전에 배터리보다 봐야 할 것','화장대가 어지럽지 않게 만드는 수납템 기준','선물용 자기관리템 실패를 줄이는 선택법','가격대별로 달라지는 홈케어 제품 체크포인트','SNS 추천템 구매 전 후기에서 찾아야 할 문장','부피만 차지하는 운동용품을 피하는 방법'
],
'건강지식':[
'건강검진 수치가 정상이어도 추세를 봐야 하는 이유','카페인 반감기를 알면 잠드는 시간이 달라진다','철분과 칼슘을 같은 시간에 먹기 전 확인할 점','수면시간보다 기상시간 일관성이 중요한 이유','운동 후 통증과 부상을 구분할 때 보는 신호','건강기능식품 함량표에서 1일 섭취량 찾는 법','물을 많이 마시는 것보다 분산해서 마셔야 하는 이유','피곤할 때 무조건 영양제부터 찾으면 안 되는 이유','근육량을 지키려면 체중보다 함께 봐야 할 지표','혈압은 한 번의 숫자보다 측정 조건이 중요하다','공복 운동이 모두에게 맞지 않는 이유','수면부채가 주말 늦잠만으로 해결되지 않는 이유',
'프로바이오틱스 제품마다 균 수만 보면 안 되는 이유','저혈압 증상이 있을 때 기록하면 좋은 항목','식후 졸림이 심할 때 생활에서 먼저 점검할 것','약과 건강기능식품을 함께 먹기 전 확인할 곳','휴식 중 심박수 변화를 장기적으로 보는 방법','같은 칼로리라도 포만감이 달라지는 구성'
],
'생활꿀팁':[
'구독료가 새는 계정을 10분 안에 찾는 방법','냉장고 식재료를 버리지 않게 만드는 배치 순서','옷이 많은데 입을 게 없는 문제를 줄이는 분류법','온라인 최저가보다 총비용을 비교해야 하는 이유','사진첩을 날짜보다 목적별로 정리하면 편한 이유','택배 상자를 바로 버리기 전에 확인할 정보','고정비를 줄일 때 만족도가 덜 떨어지는 순서','중고거래 사기를 피하기 위한 대화 체크리스트','여행 짐이 줄어드는 3단 분류 방식','비밀번호를 메모장에 적으면 안 되는 현실적 이유','세탁 표시에서 가장 먼저 확인할 기호','휴대폰 알림을 줄여 시간을 되찾는 설정',
'자동이체일을 월급 다음 날로 모으면 좋은 이유','냉동 보관 날짜를 잊지 않는 한 줄 규칙','가격 비교할 때 용량당 단가를 바로 보는 법','문서 파일명을 바꿔 검색 시간을 줄이는 규칙','충동구매를 막는 장바구니 24시간 규칙','집안일을 요일별보다 동선별로 묶는 방법'
],
'소상공인 홍보':[
'첫 방문 고객이 예약 전에 가장 궁금해하는 5가지','가격 할인 없이 재방문을 높이는 안내 방식','매장 사진 한 장으로 신뢰를 높이는 촬영 구도','후기를 광고처럼 보이지 않게 소개하는 방법','단골 고객이 친구에게 추천하기 쉬운 한 문장','예약 취소를 줄이는 사전 안내 체크리스트','우리 매장만의 차이를 보여주는 비교 콘텐츠','비수기에 반응이 좋은 콘텐츠 소재 5가지','사장님 얼굴 없이도 친근함을 만드는 게시물','메뉴가 많을 때 대표 상품을 고르는 기준','고객 질문을 한 달 콘텐츠로 바꾸는 방법','지역 고객에게 발견되는 소개글 작성법',
'예약 전 망설임을 줄이는 과정 공개 콘텐츠','신규 고객용과 단골용 이벤트를 나눠야 하는 이유','가격표를 올려도 문의가 늘어나는 설명 방식','시술 전후 사진에 꼭 함께 적어야 할 정보','매장 계정이 저장되는 체크리스트 콘텐츠','한 번 찍은 사진으로 게시물 5개 만드는 법'
],
'직접 입력':[
'초보자가 가장 먼저 알아야 할 핵심 5가지','경험자도 자주 놓치는 의외의 포인트','시작 전에 비용과 시간을 계산하는 방법','좋은 선택과 아쉬운 선택을 가르는 기준','후회하지 않기 위한 현실 체크리스트','꾸준히 실천할 수 있는 가장 작은 시작','정보가 너무 많을 때 기준을 세우는 법','잘못 알려진 상식과 실제로 확인할 내용','오늘 바로 적용할 수 있는 단계별 방법','한 달 뒤 차이를 만드는 기록 방식','실패를 줄이는 준비 순서 5단계','결정하기 전 스스로에게 물어볼 질문',
'사람들이 검색하지만 제대로 알려주지 않는 것','처음 시작한 사람이 반복하는 실수','시간 낭비를 줄이는 우선순위 정리법','내 상황에 맞는 방법을 고르는 기준','결과보다 과정을 점검해야 하는 이유','저장해두고 다시 볼 실전 요약'
]};

const detailSets=[
['핵심부터 구분하기','많이 하는 것보다 무엇을 줄일지 먼저 정하면 실행이 쉬워져요. 내 상황에서 가장 자주 반복되는 장면부터 살펴보세요.'],
['숫자보다 조건 보기','같은 결과도 시간·환경·컨디션에 따라 의미가 달라져요. 한 번의 결과보다 조건을 같이 기록하는 게 중요해요.'],
['작은 기준 만들기','선택 기준을 두세 가지로 좁혀두면 정보가 많아도 덜 흔들려요. 가격, 빈도, 지속 가능성을 함께 비교해보세요.'],
['반복 가능한지 확인','좋은 방법도 매일 하기 어렵다면 오래가지 않아요. 부담을 절반으로 낮춘 최소 버전을 먼저 만들어보세요.']
];

function toast(message){const e=$('#toast');e.textContent=message;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

$$('.category').forEach(button=>button.onclick=()=>{
 $$('.category').forEach(x=>x.classList.remove('active'));button.classList.add('active');
 selectedCategory=button.dataset.category;
 $('#keyword').placeholder=selectedCategory==='직접 입력'?'원하는 주제를 입력하세요':`예: ${selectedCategory}에서 다룰 키워드`;
});

function suggest(){
 const keyword=$('#keyword').value.trim();
 if(selectedCategory==='직접 입력'&&!keyword)return toast('직접 입력은 핵심 키워드를 적어주세요.');
 const source=banks[selectedCategory]; const start=(suggestionRound*6)%source.length;
 const rotated=[...source.slice(start),...source.slice(0,start)];
 const list=rotated.slice(0,12).map(x=>keyword&&!x.includes(keyword)?`${keyword}: ${x}`:x);
 suggestionRound++;
 $('#ideas').innerHTML=list.map((x,i)=>`<button class="idea" data-topic="${esc(x)}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(x)}</span><small>이 주제로 6장 만들기 →</small></button>`).join('');
 $$('.idea').forEach(b=>b.onclick=()=>build(b.dataset.topic));
 $('#ideasSection').classList.remove('hidden');$('#ideasSection').scrollIntoView({behavior:'smooth'});
}
$('#ideaBtn').onclick=suggest;$('#refreshBtn').onclick=suggest;

function build(chosen){
 topic=chosen;
 const tone=$('#tone').value;
 cards=[
 {k:'오늘의 저장 콘텐츠',t:chosen,b:`${selectedCategory}에서 한 단계 더 들어간 내용만 골랐어요.\n${tone.replace('하게','한 말투로')} 핵심을 확인해보세요.`},
 ...detailSets.map((d,i)=>({k:`POINT ${i+1}`,t:`${i+1}. ${d[0]}`,b:d[1]})),
 {k:'SAVE & SHARE',t:'아는 것보다 한 번 적용하는 게 중요해요',b:'오늘 가장 필요한 한 가지만 골라 실행해보세요.\n도움이 됐다면 저장하고 필요한 사람에게 공유해주세요.'}
 ];
 page=0; $('#editorTitle').textContent=chosen; createCaption(); render(); $('#editor').classList.remove('hidden');
 saveHistory(); $('#editor').scrollIntoView({behavior:'smooth'});
}
function createCaption(){
 const tags={자기관리:'#자기관리 #습관만들기 #마인드셋',자기관리템:'#자기관리템 #추천템 #생활템',건강지식:'#건강지식 #건강정보 #생활건강',생활꿀팁:'#생활꿀팁 #알아두면좋은정보 #꿀팁', '소상공인 홍보':'#소상공인 #매장홍보 #인스타마케팅','직접 입력':'#정보카드뉴스 #콘텐츠'}[selectedCategory];
 $('#caption').value=`${topic}\n\n알고 있는 내용에서 한 단계 더 들어가, 실제로 적용할 기준을 6장으로 정리했어요. 가장 필요한 페이지를 저장해두고 천천히 적용해보세요.\n\n${tags} #카드뉴스 #정보콘텐츠`;
}
function render(){
 const c=cards[page]; if(!c)return;
 $('#cardKicker').textContent=c.k;$('#cardTitle').textContent=c.t;$('#cardBody').textContent=c.b;
 $('#kickerInput').value=c.k;$('#titleInput').value=c.t;$('#bodyInput').value=c.b;
 $('.pageNo').textContent=`${String(page+1).padStart(2,'0')} / 06`;$('#pageLabel').textContent=`${page+1} / 6`;
 $('#cardPreview').className=`card ${selectedTemplate}`;
 $('#thumbs').innerHTML=cards.map((x,i)=>`<button class="thumb ${i===page?'active':''}" data-page="${i}"><b>${i+1}</b><span>${esc(x.t)}</span></button>`).join('');
 $$('.thumb').forEach(b=>b.onclick=()=>{page=Number(b.dataset.page);render()});
}
function bind(id,key,target){$(id).oninput=e=>{cards[page][key]=e.target.value;$(target).textContent=e.target.value;renderThumbOnly()}}
function renderThumbOnly(){const t=$$('.thumb')[page];if(t)t.querySelector('span').textContent=cards[page].t;saveDraft()}
bind('#kickerInput','k','#cardKicker');bind('#titleInput','t','#cardTitle');bind('#bodyInput','b','#cardBody');
$('#prev').onclick=()=>{if(page>0){page--;render()}};$('#next').onclick=()=>{if(page<5){page++;render()}};
$$('.template').forEach(b=>b.onclick=()=>{$$('.template').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedTemplate=b.dataset.template;render();saveDraft()});
$('#rewriteBtn').onclick=()=>{const c=cards[page];c.b=c.b.replace(/합니다/g,'해요').replace(/하세요/g,'해보세요');render();toast('문구를 자연스럽게 다듬었어요.')};

async function saveAll(){
 if(!cards.length)return;
 if(!window.html2canvas)return toast('이미지 모듈 연결을 확인해주세요.');
 const original=page; toast('6장 이미지를 만드는 중이에요…');
 for(let i=0;i<cards.length;i++){
   page=i;render();await new Promise(r=>setTimeout(r,80));
   const canvas=await html2canvas($('#cardPreview'),{width:800,height:1000,scale:1.35,useCORS:true,backgroundColor:null});
   const a=document.createElement('a');a.download=`postly-${String(i+1).padStart(2,'0')}.png`;a.href=canvas.toDataURL('image/png');a.click();
   await new Promise(r=>setTimeout(r,180));
 }
 page=original;render();toast('PNG 6장을 저장했어요.');
}
$('#saveAllBtn').onclick=saveAll;
$('#captionBtn').onclick=async()=>{try{await navigator.clipboard.writeText($('#caption').value);toast('캡션을 복사했어요.')}catch{toast('캡션을 선택해 복사해주세요.')}};
$('#metricoolBtn').onclick=()=>{window.open('https://app.metricool.com/planner','_blank');toast('Metricool을 열었어요. 저장한 PNG를 예약 등록하세요.')};

function saveHistory(){
 const h=JSON.parse(localStorage.getItem('postly-history')||'[]');h.unshift({topic,category:selectedCategory,date:new Date().toLocaleDateString('ko-KR')});
 localStorage.setItem('postly-history',JSON.stringify(h.slice(0,20)));saveDraft();
}
function saveDraft(){if(cards.length)localStorage.setItem('postly-draft',JSON.stringify({topic,selectedCategory,selectedTemplate,cards,caption:$('#caption').value}))}
$('#historyBtn').onclick=()=>{
 const h=JSON.parse(localStorage.getItem('postly-history')||'[]');
 if(!h.length)return toast('아직 만든 콘텐츠가 없어요.');
 alert('최근 만든 콘텐츠\n\n'+h.slice(0,10).map(x=>`• ${x.topic}  (${x.date})`).join('\n'));
};
$('#helpBtn').onclick=()=>$('#helpModal').classList.remove('hidden');
$('.modal-close').onclick=()=>$('#helpModal').classList.add('hidden');
$('#helpModal').onclick=e=>{if(e.target.id==='helpModal')e.currentTarget.classList.add('hidden')};
window.addEventListener('beforeunload',saveDraft);


let monthlyPosts=[];
const categoriesForMonth=[['자기관리','#countSelf'],['건강지식','#countHealth'],['생활꿀팁','#countLife'],['자기관리템','#countItem']];
const desktop=window.postlyDesktop;
(function initMonthly(){
 const d=new Date();d.setDate(d.getDate()+1);$('#monthStart').value=d.toISOString().slice(0,10);
 if(!desktop){$('#monthMessage').textContent='월간 자동화는 Windows 설치버전에서 사용할 수 있어요.';return}
 loadQueue();desktop.onQueueUpdated(loadQueueView);
})();
async function openSettings(){
 if(!desktop)return toast('Windows 설치버전에서 설정할 수 있어요.');
 const s=await desktop.getSettings();
 ['geminiKey','geminiModel','githubOwner','githubRepo','githubToken','githubBranch','igUserId','graphVersion','metaToken'].forEach(k=>{if($('#'+k))$('#'+k).value=s[k]||$('#'+k).value||''});
 $('#startWithWindows').checked=s.startWithWindows!==false;$('#settingsModal').classList.remove('hidden');
}
$('#settingsBtn').onclick=openSettings;$('#settingsClose').onclick=()=>$('#settingsModal').classList.add('hidden');
$('#saveSettingsBtn').onclick=async()=>{
 const s={};['geminiKey','geminiModel','githubOwner','githubRepo','githubToken','githubBranch','igUserId','graphVersion','metaToken'].forEach(k=>s[k]=$('#'+k).value.trim());
 s.startWithWindows=$('#startWithWindows').checked;await desktop.saveSettings(s);$('#settingsModal').classList.add('hidden');toast('연결 설정을 저장했어요.');
};
$('#generateMonthBtn').onclick=async()=>{
 if(!desktop)return toast('Windows 설치버전에서 실행해주세요.');
 const total=categoriesForMonth.reduce((n,[,id])=>n+Number($(id).value||0),0);
 if(total!==30)return toast('카테고리 수량 합계를 30개로 맞춰주세요.');
 const settings=await desktop.getSettings();if(!settings.geminiKey){toast('먼저 Gemini API 키를 설정해주세요.');return openSettings()}
 $('#generateMonthBtn').disabled=true;monthlyPosts=[];const used=JSON.parse(localStorage.getItem('postly-history')||'[]').map(x=>x.topic);
 try{
   let done=0;
   for(const [category,id] of categoriesForMonth){
     const count=Number($(id).value||0);if(!count)continue;
     $('#monthMessage').textContent=`${category} ${count}개를 AI가 작성 중이에요…`;
     const posts=await desktop.generate({category,count,startDate:$('#monthStart').value,usedTopics:[...used,...monthlyPosts.map(x=>x.topic)]});
     posts.slice(0,count).forEach(p=>monthlyPosts.push({...p,category}));
     done=monthlyPosts.length;$('#monthCount').textContent=done;$('#monthProgress').style.width=(done/30*100)+'%';
   }
   localStorage.setItem('postly-month',JSON.stringify(monthlyPosts));renderMonthList();$('#monthMessage').textContent='30개 원고가 준비됐어요. 목록을 확인한 뒤 예약하세요.';toast('한 달치 원고 생성 완료!');
 }catch(e){$('#monthMessage').textContent='생성 실패: '+e.message;toast('AI 생성에 실패했어요.')}
 $('#generateMonthBtn').disabled=false;
};
function renderMonthList(){
 if(!monthlyPosts.length)monthlyPosts=JSON.parse(localStorage.getItem('postly-month')||'[]');
 $('#monthCount').textContent=monthlyPosts.length;
 $('#monthList').innerHTML=monthlyPosts.map((p,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><div><small>${esc(p.category)}</small><h4 contenteditable="true" data-index="${i}">${esc(p.topic)}</h4><p>${esc((p.caption||'').slice(0,100))}</p></div></article>`).join('');
}
$('#reviewMonthBtn').onclick=()=>{renderMonthList();$('#monthList').classList.toggle('hidden');$('#monthList').scrollIntoView({behavior:'smooth'})};
function datePlus(start,days){const d=new Date(start+'T00:00:00+09:00');d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}
async function cardToBase64(post,cardIndex,template){
 cards=post.cards.map(x=>({k:x.kicker||x.k||'POSTLY NOTE',t:x.title||x.t,b:x.body||x.b}));
 page=cardIndex;selectedTemplate=template;render();await new Promise(r=>setTimeout(r,60));
 const canvas=await html2canvas($('#cardPreview'),{width:800,height:1000,scale:1.35,useCORS:true,backgroundColor:null});
 return canvas.toDataURL('image/png').split(',')[1];
}
$('#queueMonthBtn').onclick=async()=>{
 if(!desktop)return;renderMonthList();if(monthlyPosts.length!==30)return toast('먼저 원고 30개를 생성해주세요.');
 const s=await desktop.getSettings();if(!s.githubToken||!s.igUserId||!s.metaToken){toast('GitHub와 Instagram 연결 설정이 필요해요.');return openSettings()}
 if(!confirm('PNG 180장을 업로드하고 30일 예약을 만들까요? 시간이 몇 분 걸릴 수 있어요.'))return;
 $('#queueMonthBtn').disabled=true;const templates=['minimal','pink','deepblue','editorial','check','product'];const queued=[];
 try{
  for(let i=0;i<monthlyPosts.length;i++){
   const post=monthlyPosts[i],date=datePlus($('#monthStart').value,i),urls=[];
   $('#monthMessage').textContent=`${i+1}/30 게시물 이미지 업로드 중…`;$('#monthProgress').style.width=(i/30*100)+'%';
   for(let c=0;c<6;c++){
    const base64=await cardToBase64(post,c,templates[i%templates.length]);
    const path=`postly-media/${date}/${String(c+1).padStart(2,'0')}.png`;
    urls.push(await desktop.uploadImage({path,base64}));
   }
   queued.push({id:crypto.randomUUID(),topic:post.topic,category:post.category,caption:post.caption,mediaUrls:urls,publishAt:new Date(`${date}T${$('#monthTime').value}:00+09:00`).toISOString(),status:'scheduled',attempts:0});
  }
  await desktop.addQueue(queued);$('#monthProgress').style.width='100%';$('#monthMessage').textContent='30개 예약 준비 완료. Postly를 종료하지 않으면 정해진 시간에 발행돼요.';loadQueue();toast('30일 예약이 완료됐어요.');
 }catch(e){$('#monthMessage').textContent='예약 준비 실패: '+e.message;toast('중간에 실패했어요. 메시지를 확인해주세요.')}
 $('#queueMonthBtn').disabled=false;
};
async function loadQueue(){if(desktop)loadQueueView(await desktop.getQueue())}
function loadQueueView(q){
 $('#queueList').innerHTML=(q||[]).slice().sort((a,b)=>a.publishAt.localeCompare(b.publishAt)).map(x=>`<div class="queue-row"><span class="status ${x.status}">${x.status}</span><b>${esc(x.topic)}</b><time>${new Date(x.publishAt).toLocaleString('ko-KR')}</time>${x.error?`<small>${esc(x.error)}</small>`:''}</div>`).join('')||'<p class="fine">예약된 콘텐츠가 없어요.</p>';
}
$('#refreshQueueBtn').onclick=loadQueue;
