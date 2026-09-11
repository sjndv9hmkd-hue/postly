const modes=document.querySelectorAll('.mode');let selectedMode='업체 홍보',cards=[],page=0;
const $=s=>document.querySelector(s);const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)};
modes.forEach(b=>b.onclick=()=>{modes.forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedMode=b.dataset.mode});
const hooks={
'업체 홍보':k=>[`${k}, 사람들이 다시 찾는 진짜 이유 5가지`,`${k} 처음 방문한다면 꼭 알아둘 포인트`,`${k} 선택 전 30초 체크리스트`],
'정보성':k=>[`${k}, 의외로 다들 놓치는 5가지`,`${k} 초보라면 이것부터 시작하세요`,`${k} 제대로 하는 사람들의 공통점`],
'퍼스널 브랜딩':k=>[`${k}를 하며 알게 된 현실적인 5가지`,`${k}에 대한 내 기준이 바뀐 이유`,`${k}, 꾸준히 해보니 결국 남는 것`],
'대행사':k=>[`${k} 고객이 저장하게 되는 콘텐츠 공식`,`${k} 계정, 반응을 높이는 5가지 포인트`,`${k} 브랜드가 놓치면 아쉬운 콘텐츠 전략`]
};
$('#ideaBtn').onclick=()=>{const k=$('#keyword').value.trim();if(!k)return toast('키워드를 먼저 입력해주세요.');const list=hooks[selectedMode](k);$('#ideas').innerHTML=list.map((x,i)=>`<button class="idea" data-i="${i}"><b>0${i+1}</b><br>${x}</button>`).join('');document.querySelectorAll('.idea').forEach((b,i)=>b.onclick=()=>build(list[i],k))};
function build(topic,k){cards=[
{t:topic,b:`${k}에 관심 있다면 저장해두세요.\n핵심만 빠르게 정리했습니다.`},
{t:'1. 시작은 작고 명확하게',b:`처음부터 모든 걸 바꾸기보다 ${k}에서 가장 중요한 한 가지부터 정하세요. 작은 실행이 오래 갑니다.`},
{t:'2. 기준을 먼저 만들기',b:'남들이 좋다는 것보다 나에게 필요한 기준을 2~3개 정하면 선택이 훨씬 쉬워집니다.'},
{t:'3. 반복 가능한 방식으로',b:'한 번 크게 하는 것보다 매주 반복할 수 있는 구조가 결과를 만듭니다. 시간과 비용까지 함께 계산하세요.'},
{t:'4. 기록하고 비교하기',b:'전후를 기록하면 감이 아니라 데이터로 판단할 수 있습니다. 잘된 건 남기고 안 맞는 건 빠르게 바꾸세요.'},
{t:'오늘 하나만 실행해보세요',b:`${k}, 완벽하게 시작할 필요 없습니다.\n도움됐다면 저장하고 다음 콘텐츠도 확인해보세요.`}
];page=0;$('#editor').classList.remove('hidden');$('#editorTitle').textContent=topic;render();$('#editor').scrollIntoView({behavior:'smooth'})}
function render(){const c=cards[page];if(!c)return;$('#cardTitle').textContent=c.t;$('#cardBody').textContent=c.b;$('#titleInput').value=c.t;$('#bodyInput').value=c.b;$('.pageNo').textContent=`0${page+1} / 06`;$('#pageLabel').textContent=`${page+1} / 6`;$('#cardKicker').textContent=page===0?'POSTLY PICK':page===5?'SAVE & FOLLOW':'POSTLY GUIDE'}
$('#prev').onclick=()=>{if(page>0){sync();page--;render()}};$('#next').onclick=()=>{if(page<5){sync();page++;render()}};
function sync(){if(!cards[page])return;cards[page].t=$('#titleInput').value;cards[page].b=$('#bodyInput').value}
$('#titleInput').oninput=e=>{$('#cardTitle').textContent=e.target.value;cards[page].t=e.target.value};$('#bodyInput').oninput=e=>{$('#cardBody').textContent=e.target.value;cards[page].b=e.target.value};
$('#cardTitle').oninput=e=>{$('#titleInput').value=e.target.textContent;cards[page].t=e.target.textContent};$('#cardBody').oninput=e=>{$('#bodyInput').value=e.target.textContent;cards[page].b=e.target.textContent};
document.querySelectorAll('.template').forEach(b=>b.onclick=()=>{document.querySelectorAll('.template').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#cardPreview').className=`card ${b.dataset.template}`});
$('#saveBtn').onclick=async()=>{if(!window.html2canvas)return toast('이미지 모듈을 불러오지 못했습니다.');toast('이미지 만드는 중…');const canvas=await html2canvas($('#cardPreview'),{scale:2,useCORS:true});const a=document.createElement('a');a.download=`postly-${page+1}.png`;a.href=canvas.toDataURL('image/png');a.click();toast('PNG 저장 완료!')};
$('#loginBtn').onclick=()=>toast('MVP에서는 로그인 없이 바로 사용할 수 있어요.');