/* SINUS · Acervo fixo de videoaulas de Anatomia I e II, independente da turma. */
(function(W,D){
'use strict';
const URL_CATALOG='/sinus/anatomia-pratica-videos.json';
const cache={data:null,loading:null,erro:''};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const idOK=id=>/^[a-zA-Z0-9_-]{11}$/.test(String(id||''));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
function course(){
 if(typeof UI==='undefined'||UI.mode!=='practice')return '';
 const name=norm(UI.subject);
 if(/anatomia\s+patol|anatopato/.test(name))return '';
 const match=name.match(/(?:^|\b)anatomia(?:\s+(?:humana|descriptiva|general))?\s+(ii|i|2|1)(?:\b|$)/);
 return match?(match[1]==='i'||match[1]==='1'?'1':'2'):'';
}
function context(){
 const subj=course();
 if(!subj||UI.tab!=='catedra')return null;
 return {subj,tab:'catedra'};
}
function showModal(item){
 if(!item||!idOK(item.id))return;
 D.querySelector('.sxAPVModal')?.remove();
 const modal=D.createElement('div');
 modal.className='sxAPVModal';modal.setAttribute('role','presentation');
 modal.innerHTML='<div class="sxAPVDialog" role="dialog" aria-modal="true" aria-label="'+esc(item.title)+'">'+
 '<div class="sxAPVDialogTop"><b>'+esc(item.title)+'</b><button type="button" class="sxAPVDialogClose" aria-label="Fechar vídeo">✕</button></div>'+
 '<div class="sxAPVFrame"><iframe title="'+esc(item.title)+'" src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(item.id)+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="eager"></iframe></div>'+
 '<div class="sxAPVDialogFoot"><span>Canal Clases Medicina - Py</span><a href="https://www.youtube.com/watch?v='+encodeURIComponent(item.id)+'" target="_blank" rel="noopener noreferrer">Abrir no YouTube ↗</a></div></div>';
 const close=()=>{modal.remove();D.removeEventListener('keydown',onKey)};
 const onKey=e=>{if(e.key==='Escape')close()};
 modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.sxAPVDialogClose'))close()});
 D.addEventListener('keydown',onKey);
 D.body.appendChild(modal);
 modal.querySelector('button')?.focus();
}
function cards(box,items,filter){
 const selected=filter==='all'?items:items.filter(x=>norm(x.title).includes(filter));
 box.innerHTML=selected.map(it=>'<button class="sxAPVCard" type="button" data-apv-video="'+esc(it.id)+'" aria-label="Assistir '+esc(it.title)+'">'+
 '<span class="sxAPVThumb"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+encodeURIComponent(it.id)+'/mqdefault.jpg"><span class="sxAPVPlay"><span>▶</span></span></span>'+
 '<span class="sxAPVText"><b>'+esc(it.title)+'</b><small>Aula da cátedra · Anatomia '+(course()==='1'?'I':'II')+'</small></span></button>').join('')||
 '<div class="sxAPVEmpty">Nenhuma aula encontrada para esse filtro.</div>';
}
function mount(){
 const ctx=context(),target=D.getElementById('subjectContent');
 if(!ctx||!target||target.querySelector('[data-apv-root]'))return;
 if(!cache.data){load();return}
 const seen=new Set();
 const items=(cache.data.subjects?.[ctx.subj]||[]).filter(x=>{
  if(!x||x.type!=='catedra'||!idOK(x.id)||seen.has(x.id))return false;
  seen.add(x.id);return true;
 });
 const section=D.createElement('section');
 section.className='sxAPV';section.setAttribute('data-apv-root',ctx.subj);
 const professors=[
  {id:'victor benitez',name:'Dr. Víctor Benítez'},
  {id:'ronald martinez',name:'Dr. Ronald Martínez'}
 ].filter(p=>items.some(it=>norm(it.title).includes(p.id)));
 section.innerHTML='<div class="sxAPVHead"><div><span class="sxAPVLabel">ANATOMIA '+(ctx.subj==='1'?'I':'II')+' · AMBIENTE PRÁTICO</span>'+
 '<h2>Cátedra</h2><p>Aulas específicas dos docentes de Anatomia, separadas dos vídeos complementares e simulados.</p></div>'+
 '<span class="sxAPVCount">'+items.length+' '+(items.length===1?'aula':'aulas')+'</span></div>'+
 '<div class="sxAPVControls" role="group" aria-label="Filtrar por professor">'+
 '<button class="sxAPVFilter active" type="button" data-apv-filter="all">Todos</button>'+
 professors.map(p=>'<button class="sxAPVFilter" type="button" data-apv-filter="'+esc(p.id)+'">'+esc(p.name)+'</button>').join('')+
 '</div><div class="sxAPVCards"></div>';
 const listing=section.querySelector('.sxAPVCards');
 cards(listing,items,'all');
 section.addEventListener('click',e=>{
  const open=e.target.closest('[data-apv-video]');
  if(open){showModal(items.find(x=>x.id===open.dataset.apvVideo));return}
  const btn=e.target.closest('[data-apv-filter]');
  if(btn){
   section.querySelectorAll('[data-apv-filter]').forEach(x=>x.classList.toggle('active',x===btn));
   cards(listing,items,btn.dataset.apvFilter);
  }
 });
 target.replaceChildren(section);
}
function load(){
 if(cache.data||cache.loading)return cache.loading;
 cache.loading=fetch(URL_CATALOG,{cache:'default'})
 .then(r=>{if(!r.ok)throw Error('catálogo indisponível');return r.json()})
 .then(data=>{
   if(!data||!data.subjects||!Array.isArray(data.subjects['1'])||!Array.isArray(data.subjects['2']))throw Error('formato inválido');
   cache.data=data;cache.erro='';mount();
 })
 .catch(e=>{cache.erro=String(e)})
 .finally(()=>{cache.loading=null});
 return cache.loading;
}
const css="\n#subjectTabs .sxCatedraTab{border:1px solid #92beab;background:#e5f2e9;color:#185840;font-weight:800;box-shadow:inset 0 0 0 1px rgba(24,88,64,.03)}\n#subjectTabs .sxCatedraTab:hover{background:#d5eadc;border-color:#4f9c7a}\n#subjectTabs .sxCatedraTab.active{background:#176449!important;color:#fff!important;border-color:#176449!important;box-shadow:0 4px 13px rgba(18,94,66,.22)}\n.sxAPV{margin:18px 0 22px;padding:20px;border:1px solid rgba(48,112,94,.18);border-radius:20px;background:linear-gradient(135deg,rgba(229,246,237,.75),rgba(255,255,255,.94));color:#1f3b32}\n.sxAPV *{box-sizing:border-box}\n.sxAPVHead{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;margin-bottom:12px}\n.sxAPV .sxAPVLabel{font-size:10px;letter-spacing:.12em;font-weight:800;color:#47796a}\n.sxAPV h2{font-size:19px;line-height:1.25;margin:5px 0 7px;font-weight:800;color:#1e4336}\n.sxAPV p{font-size:12px;line-height:1.5;margin:0;color:#587469}\n.sxAPVCount{background:#e1eee7;border:1px solid #c9e4d8;border-radius:30px;padding:7px 12px;font-size:11px;white-space:nowrap;color:#376c59;font-weight:700}\n.sxAPVControls{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:13px 0}\n.sxAPVFilter,.sxAPVAll{border:1px solid #cfe1d8;border-radius:11px;padding:7px 11px;font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;background:#fff;color:#365e50}\n.sxAPVFilter.active{background:#276f52;color:white;border-color:#276f52}\n.sxAPVAll{margin-left:auto;display:inline-flex;align-items:center}\n.sxAPVCards{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px}\n.sxAPVCard{border:1px solid #d9e9e2;overflow:hidden;text-align:left;border-radius:14px;background:#fff;cursor:pointer;color:#294738;padding:0;box-shadow:0 2px 9px rgba(29,84,59,.045);transition:transform .15s,border-color .15s}\n.sxAPVCard:hover{border-color:#7fbca3;transform:translateY(-2px)}\n.sxAPVThumb{aspect-ratio:16/9;position:relative;background:#d9e8df;display:block;overflow:hidden}\n.sxAPVThumb img{width:100%;height:100%;object-fit:cover;display:block}\n.sxAPVPlay{position:absolute;inset:0;display:grid;place-content:center;color:white;font-size:22px;text-shadow:0 2px 10px #0009}\n.sxAPVPlay>span{display:grid;place-content:center;width:39px;height:39px;background:#173d32bb;border-radius:50%}\n.sxAPVText{padding:11px;display:block}\n.sxAPVText b{font-size:12px;line-height:1.45;color:#253b32;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;min-height:35px}\n.sxAPVText small{display:block;margin-top:7px;font-size:10px;color:#60806e}\n.sxAPVEmpty{padding:15px;font-size:12px;color:#4e6b5e}\n.sxAPVModal{position:fixed;z-index:99999;inset:0;background:rgba(8,28,23,.78);display:grid;place-items:center;padding:18px}\n.sxAPVDialog{width:min(930px,100%);border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 20px 80px #0007}\n.sxAPVDialogTop{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:14px 17px}\n.sxAPVDialogTop b{font-size:14px;line-height:1.5;color:#244a38}\n.sxAPVDialogClose{background:#e8f3ed;border:0;border-radius:10px;cursor:pointer;padding:8px 12px;color:#25503e}\n.sxAPVFrame{aspect-ratio:16/9;background:#111}\n.sxAPVFrame iframe{width:100%;height:100%;border:0}\n.sxAPVDialogFoot{padding:11px 17px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#506b5f;font-size:12px}\n.sxAPVDialogFoot a{color:#116b4b;font-weight:700}\n@media(max-width:560px){.sxAPV{padding:14px;border-radius:15px}.sxAPVCards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.sxAPV h2{font-size:17px}.sxAPVAll{margin-left:0}.sxAPVDialogTop b{font-size:12px}}\n";
if(!D.getElementById('sxAnatomiaPraticaStyle')){const style=D.createElement('style');style.id='sxAnatomiaPraticaStyle';style.textContent=css;D.head.appendChild(style)}
const previous=W.renderSubject;
if(typeof previous==='function'){
 W.renderSubject=function(){const out=previous.apply(this,arguments);mount();return out};
}
W.SinusAnatomiaPratica={mount,load,get catalog(){return cache.data},get error(){return cache.erro},course};
load();
})(window,document);
