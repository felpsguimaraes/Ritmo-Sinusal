/* SINUS · Acervo fixo de videoaulas de Anatomia I e II, independente da turma. */
(function(W,D){
'use strict';
const URL_CATALOG='/sinus/anatomia-pratica-videos.json';
const UPE_CATALOG='/sinus/anatomia-upe-videos.json';
// Acervo de segurança: as aulas aparecem mesmo se a requisição JSON falhar.
// Gerado a partir do catálogo verificado do SINUS; a busca remota atualiza quando acessível.
const INLINE_CATALOG={"subjects":{"1":[{"id":"8clDlP0u-I0","title":"Músculos de la cabeza — Dr. Ronald Martínez","type":"catedra"},{"id":"3Bb-OG1mUEs","title":"Músculos de la cara — Dr. Víctor Benítez","type":"catedra"},{"id":"4cq1xIrCYCU","title":"Huesos del cráneo — Dr. Ronald Martínez","type":"catedra"},{"id":"5idEqlNOMOM","title":"Hueso esfenóides — Dr. Víctor Benítez","type":"catedra"},{"id":"TnXECT-HRX0","title":"Viscerocráneo — Dr. Víctor Benítez","type":"catedra"},{"id":"PMbTXCOY2W0","title":"Generalities of the skull — Dr. Víctor Benítez","type":"catedra"},{"id":"tA3gkHugBzU","title":"Viscerocráneo — Dr. Víctor Benítez (segunda aula)","type":"catedra"}],"2":[{"id":"d7yiZmmxUMQ","title":"Rins — Dr. Víctor Benítez","type":"catedra"},{"id":"m4YgiQet2Sc","title":"Ciego, Apendice y Cólon (I) — Dr. Víctor Benítez","type":"catedra"},{"id":"3z4PaeHm9OI","title":"Músculos del Muslo (II) y de la Pierna — Dr. Víctor Benítez","type":"catedra"},{"id":"lZe_kcaKogM","title":"Músculos de la Cintura Pelviana y del Muslo (I) — Dr. Víctor Benítez","type":"catedra"},{"id":"0GY0r9Yde_M","title":"Huesos del Miembro Inferior — Dr. Ronald Martínez","type":"catedra"},{"id":"3tSmr908qcA","title":"Nervios del Miembro Inferior — Dr. Ronald Martínez","type":"catedra"},{"id":"TXcxaDA1Lcs","title":"Nervios del Miembro Inferior II — Dr. Ronald Martínez","type":"catedra"},{"id":"WOa4bPwTzC4","title":"Small Intestine — Dr. Víctor Benítez","type":"catedra"},{"id":"C-EJi8B_Er0","title":"Hígado y Visícula Biliar — Dr. Víctor Benítez","type":"catedra"},{"id":"fsBYDslVPzQ","title":"Intestino Grueso I — Dr. Víctor Benítez","type":"catedra"},{"id":"vKqzflhllMo","title":"Intestino Grueso II — Dr. Víctor Benítez","type":"catedra"},{"id":"spBpM-s-WMU","title":"Bazo — Dr. Víctor Benítez","type":"catedra"},{"id":"dsfHIUdPbCM","title":"Páncreas y hígado — Dr. Víctor Benítez","type":"catedra"},{"id":"myLQ-zY73zI","title":"Estómago II y duodeno — Dr. Víctor Benítez","type":"catedra"},{"id":"hV1yUy8Tn_o","title":"Vísceras abdominales — Dr. Ronald","type":"catedra"},{"id":"E6Q80b7d6xw","title":"Estómago 1 — Dr. Víctor Benítez","type":"catedra"},{"id":"Zr5u-nHw644","title":"Peritoneo 3 — Dr. Víctor Benítez","type":"catedra"},{"id":"QMHBvi3qkRo","title":"Músculos de la Región Lombar y Conducto Inguinal — Dr. Víctor Benítez","type":"catedra"},{"id":"VCe3dFoVnPw","title":"Cintura Pélvica — Dr. Víctor Benítez","type":"catedra"},{"id":"hGqia8Idaq4","title":"Huesos del abdomen — Dr. Ronald Martínez","type":"catedra"},{"id":"WQ2OfTpidnY","title":"Vena cava inferior — Dr. Ronald Martínez","type":"catedra"},{"id":"EP89wGf8UX8","title":"Peritoneum 1 and 2 — Dr. Víctor Benítez","type":"catedra"},{"id":"4HA5dRi7u2Y","title":"Hígado — Dr. Ronald Martínez","type":"catedra"},{"id":"jBoibtElxvw","title":"Inguinal canal / anterolateral abdominal muscles — Dr. Víctor Benítez","type":"catedra"},{"id":"2PLhRx9Q-vs","title":"Vertebras Lumbares — Dr. Víctor Benítez","type":"catedra"},{"id":"qejAwhTMqfE","title":"Abdominal Overview — Dr. Víctor Benítez","type":"catedra"},{"id":"CtP5hMFLbuI","title":"Aorta abdominal — Dr. Ronald Martínez","type":"catedra"},{"id":"Pt09Y9jxS24","title":"Huesos sacro y cóccix — Dr. Víctor Benítez","type":"catedra"}]}};
const cache={data:INLINE_CATALOG,loading:null,erro:'',loaded:false};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const idOK=id=>/^[a-zA-Z0-9_-]{11}$/.test(String(id||''));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
function anatomyId(){
 if(typeof UI==='undefined')return '';
 const name=norm(UI.subject);
 if(/anatomia\s+patol|anatopato/.test(name))return '';
 const match=name.match(/^anatomia(?:\s+(?:humana|descriptiva|general))?\s+(ii|i|2|1)$/);
 return match?(match[1]==='i'||match[1]==='1'?'1':'2'):'';
}
function course(){return typeof UI!=='undefined'&&UI.mode==='practice'?anatomyId():'';}
function ensureLauncher(){
 const allowed=!!course(),tabs=D.getElementById('subjectTabs');
 if(!tabs)return;
 // Cátedra fica estritamente na Prática de Anatomia I e II.
 // Nunca oferecer um atalho que migra alunos da Teoria para a Prática.
 if(!allowed){
  tabs.querySelectorAll('[data-apv-launch]').forEach(el=>el.remove());
  D.querySelectorAll('[data-apv-shortcut]').forEach(el=>el.remove());
  return;
 }
 const id=course();
 const native=[...tabs.querySelectorAll('button')].find(b=>norm(b.textContent).includes('catedra'));
 if(native){
  native.classList.add('sxCatedraTab');
  // O botão nativo já usa setTab('catedra'). Não acionar dois handlers.
  native.removeAttribute('data-apv-launch');
  tabs.querySelectorAll('[data-apv-launch]').forEach(el=>el.remove());
 }else if(!tabs.querySelector('[data-apv-launch]')){
  const btn=D.createElement('button');
  btn.type='button';btn.className='sxCatedraTab'+(UI.tab==='catedra'?' active':'');
  btn.setAttribute('data-apv-launch','');
  btn.textContent='▶ Cátedra';
  const slide=[...tabs.querySelectorAll('button')].find(b=>norm(b.textContent).includes('slides'));
  if(slide)slide.after(btn);else tabs.appendChild(btn);
 }
 const host=D.getElementById('subjectContent');
 if(!host)return;
 if(UI.tab!=='overview'){
  host.querySelector('[data-apv-shortcut]')?.remove();
  return;
 }
 if(host.querySelector('[data-apv-shortcut]'))return;
 const shortcut=D.createElement('button');
 shortcut.type='button';shortcut.className='sxAPVShortcut';
 shortcut.setAttribute('data-apv-launch','');shortcut.setAttribute('data-apv-shortcut','');
 const count=(cache.data?.subjects?.[id]||[]).filter(v=>v.type==='catedra').length;
 shortcut.innerHTML='<span class="sxAPVShortcutIcon">▶</span><span><strong>Cátedra · Anatomia '+(id==='1'?'I':'II')+'</strong><small>'+count+' aulas em vídeo · Escolha uma aula para assistir</small></span><span aria-hidden="true">›</span>';
 host.prepend(shortcut);
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
function professor(it){
 const n=norm(it.title);
 return it.channelHandle==='@anatomiaupefranco'?'Anatomia UPE Franco':it.channelHandle==='@anatomiaupe2188'?'Anatomia UPE':/victor benitez/.test(n)?'Dr. Víctor Benítez':/ronald martinez|dr. ronald\b/.test(n)?'Dr. Ronald Martínez':'Outras aulas';
}
function statusKey(course){
 const uid=String(W.SinusApp?.S?.uid||'estudante').replace(/[^a-z0-9_-]/gi,'').slice(0,80);
 return 'sinus_catedra_progress_'+uid+'_'+course;
}
function readDone(course){
 try{return new Set(JSON.parse(localStorage.getItem(statusKey(course))||'[]'))}catch(e){return new Set()}
}
function saveDone(course,done){
 try{localStorage.setItem(statusKey(course),JSON.stringify([...done]))}catch(e){}
}
function mount(){
 ensureLauncher();
 const ctx=context(),target=D.getElementById('subjectContent');
 if(!ctx||!target)return;
 if(target.querySelector('[data-apv-root]'))return;
 const section=D.createElement('section');section.className='sxAPV';section.setAttribute('data-apv-root',ctx.subj);
 target.replaceChildren(section);
 if(!cache.data){
  section.innerHTML='<div class="sxAPVStatus" role="status"><h2>Cátedra · Anatomia '+(ctx.subj==='1'?'I':'II')+'</h2><p>'+
   (cache.erro?'Não foi possível carregar as aulas agora. Tente novamente.':'Carregando aulas da Cátedra…')+
   '</p><button type="button" class="sxAPVRetry">Atualizar aulas</button></div>';
  section.querySelector('button').addEventListener('click',()=>{if(cache.loading)return;cache.erro='';load(true)});
  if(!cache.erro)load();
  return;
 }
 const seen=new Set();
 const items=(cache.data.subjects?.[ctx.subj]||[]).filter(x=>{
  if(!x||x.type!=='catedra'||!idOK(x.id)||seen.has(x.id))return false;
  seen.add(x.id);return true;
 });
 if(!items.length){
  section.innerHTML='<div class="sxAPVStatus"><h2>Cátedra · Anatomia '+(ctx.subj==='1'?'I':'II')+'</h2><p>Nenhum vídeo da seleção atual foi encontrado.</p></div>';
  return;
 }
 const done=readDone(ctx.subj);
 const profs=['Todos',...new Set(items.map(professor))];
 let chosen=items[0].id,filter='Todos',query='';
 section.innerHTML='<header class="sxAPVHero"><div><span class="sxAPVLabel">PRÁTICA · ANATOMIA '+(ctx.subj==='1'?'I':'II')+'</span><h2>Cátedra</h2>'+
  '<p>Assista às aulas dos professores e acompanhe seu estudo sem sair da matéria.</p>'+
  '<div class="sxAPVHeroTags"><span>'+items.length+' aulas</span><span>'+profs.length-1+' docentes / grupos</span><span>Progresso salvo neste aparelho</span></div></div>'+
  '<span class="sxAPVHeroIcon" aria-hidden="true">▶</span></header>'+
  '<div class="sxAPVColumns"><div class="sxAPVMain">'+
  '<div class="sxAPVPlayer" data-apv-player><button type="button" class="sxAPVStart" data-apv-play aria-label="Reproduzir aula"><span>▶</span><strong>Assistir aula</strong></button></div>'+
  '<div class="sxAPVNow"><div><small>AULA SELECIONADA</small><h3 data-apv-title></h3><p data-apv-prof></p></div>'+
  '<button type="button" class="sxAPVDone" data-apv-done>Marcar como assistida</button></div>'+
  '<div class="sxAPVPlayerActions"><button type="button" data-apv-prev>← Anterior</button>'+
  '<button type="button" data-apv-next>Próxima aula →</button></div>'+
  '<a class="sxAPVExternal" data-apv-external target="_blank" rel="noopener noreferrer">Se o player não abrir, assistir no YouTube ↗</a>'+'<p class="sxAPVSource">Videoaulas públicas dos canais Clases Medicina - Py e Anatomia UPE. Os direitos e a autoria permanecem com seus respectivos criadores.</p>'+
  '</div><aside class="sxAPVSide" aria-label="Lista de videoaulas"><div class="sxAPVListHead"><div><h3>Lista de aulas</h3><small data-apv-progress></small></div>'+
  '<input type="search" data-apv-search placeholder="Buscar aula" aria-label="Buscar aula"></div>'+
  '<div class="sxAPVControls" data-apv-filters role="group" aria-label="Filtrar por professor">'+
  profs.map(p=>'<button type="button" class="sxAPVFilter'+(p==='Todos'?' active':'')+'" data-apv-prof="'+esc(p)+'">'+esc(p)+'</button>').join('')+
  '</div><div class="sxAPVPlaylist" data-apv-list></div></aside></div>';
 const player=section.querySelector('[data-apv-player]'),list=section.querySelector('[data-apv-list]');
 function displayed(){
  return items.filter(x=>(filter==='Todos'||professor(x)===filter)&&(!query||norm(x.title).includes(norm(query))));
 }
 function playerPoster(it){
  player.innerHTML='<button type="button" class="sxAPVStart" data-apv-play aria-label="Reproduzir '+esc(it.title)+'">'+
   '<img src="https://i.ytimg.com/vi/'+encodeURIComponent(it.id)+'/hqdefault.jpg" alt="">'+
   '<span>▶</span><strong>Reproduzir aula</strong></button>';
 }
 function draw(){
  const shown=displayed();
  list.innerHTML=shown.map(it=>'<button type="button" class="sxAPVLesson'+(it.id===chosen?' selected':'')+'" data-apv-id="'+esc(it.id)+'" aria-current="'+(it.id===chosen?'true':'false')+'">'+
    '<span class="sxAPVMini"><img alt="" loading="lazy" src="https://i.ytimg.com/vi/'+encodeURIComponent(it.id)+'/mqdefault.jpg">'+
     '<small>'+(done.has(it.id)?'✓':'▶')+'</small></span>'+
    '<span class="sxAPVLessonText"><b>'+esc(it.title)+'</b><small>'+esc(professor(it))+'</small></span></button>').join('')||
    '<div class="sxAPVEmpty">Nenhuma aula com este filtro. Tente outra busca.</div>';
  section.querySelector('[data-apv-progress]').textContent=items.filter(x=>done.has(x.id)).length+' de '+items.length+' assistidas';
  const btn=section.querySelector('[data-apv-done]');
  if(btn){btn.classList.toggle('on',done.has(chosen));btn.textContent=done.has(chosen)?'✓ Assistida':'Marcar como assistida'}
 }
 function select(id,autoplay){
  const it=items.find(x=>x.id===id);if(!it)return;
  chosen=id;
  const external=section.querySelector('[data-apv-external]');if(external)external.href='https://www.youtube.com/watch?v='+encodeURIComponent(it.id);
  section.querySelector('[data-apv-title]').textContent=it.title;
  section.querySelector('[data-apv-prof]').textContent=professor(it);
  if(autoplay){
   player.innerHTML='<iframe title="'+esc(it.title)+'" src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(it.id)+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }else playerPoster(it);
  draw();
 }
 function step(delta){
  let index=items.findIndex(x=>x.id===chosen);
  select(items[(index+delta+items.length)%items.length].id,false);
 }
 section.addEventListener('click',e=>{
  const a=e.target.closest('[data-apv-id]');if(a){select(a.dataset.apvId,true);return}
  const p=e.target.closest('[data-apv-prof]');if(p){filter=p.dataset.apvProf;section.querySelectorAll('[data-apv-prof]').forEach(b=>b.classList.toggle('active',b===p));draw();return}
  if(e.target.closest('[data-apv-play]')){select(chosen,true);return}
  if(e.target.closest('[data-apv-prev]')){step(-1);return}
  if(e.target.closest('[data-apv-next]')){step(1);return}
  if(e.target.closest('[data-apv-done]')){if(done.has(chosen))done.delete(chosen);else done.add(chosen);saveDone(ctx.subj,done);draw()}
 });
 section.querySelector('[data-apv-search]').addEventListener('input',e=>{query=e.target.value;draw()});
 select(chosen,false);
}
function mergeCatalog(base,extra){
 const subjects={'1':[],'2':[]};
 for(const level of ['1','2']){
  const seen=new Set();
  for(const x of base.subjects?.[level]||[]){
   if(!x||x.type!=='catedra'||!idOK(x.id)||seen.has(x.id))continue;
   seen.add(x.id);subjects[level].push(x);
  }
  for(const x of extra?.videos||[]){
   if(!x||!idOK(x.id)||seen.has(x.id))continue;
   if(!['1','2','geral'].includes(x.anatomyPeriod)||x.anatomyPeriod!=='geral'&&x.anatomyPeriod!==level)continue;
   seen.add(x.id);
   subjects[level].push({...x,type:'catedra'});
  }
 }
 return {subjects};
}
function load(force=false){
 if(cache.loading)return cache.loading;
 if(cache.loaded&&!force)return Promise.resolve(cache.data);
 const options={cache:force?'no-store':'default'},version='?v=20261025-upe-individual';
 cache.loading=Promise.allSettled(
  [URL_CATALOG,UPE_CATALOG].map(url=>fetch(url+version,options)
   .then(r=>{if(!r.ok)throw Error(url+' HTTP '+r.status);return r.json()})))
 .then(results=>{
  const original=results[0].status==='fulfilled'&&results[0].value?.subjects?results[0].value:INLINE_CATALOG;
  const extra=results[1].status==='fulfilled'&&Array.isArray(results[1].value?.videos)?results[1].value:null;
  cache.data=mergeCatalog(original,extra);
  cache.erro=results.filter(x=>x.status==='rejected').map(x=>String(x.reason)).join('; ');
  return cache.data;
 })
 .catch(err=>{cache.erro=String(err);return cache.data})
 .finally(()=>{
  cache.loaded=true;cache.loading=null;
  const root=D.querySelector('[data-apv-root]');
  // Atualiza a lista de aulas, mas não interrompe um vídeo em reprodução.
  if(root&&!root.querySelector('iframe')){root.remove();mount()}
  const home=D.querySelector('[data-apv-shortcut]');if(home)home.remove();
  ensureLauncher();
 });
 return cache.loading;
}
const css="\n#subjectTabs .sxCatedraTab{border:1px solid #92beab;background:#e5f2e9;color:#185840;font-weight:800;box-shadow:inset 0 0 0 1px rgba(24,88,64,.03)}\n#subjectTabs .sxCatedraTab:hover{background:#d5eadc;border-color:#4f9c7a}\n#subjectTabs .sxCatedraTab.active{background:#176449!important;color:#fff!important;border-color:#176449!important;box-shadow:0 4px 13px rgba(18,94,66,.22)}\n.sxAPV{margin:18px 0 22px;padding:20px;border:1px solid rgba(48,112,94,.18);border-radius:20px;background:linear-gradient(135deg,rgba(229,246,237,.75),rgba(255,255,255,.94));color:#1f3b32}\n.sxAPV *{box-sizing:border-box}\n.sxAPVHead{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap;margin-bottom:12px}\n.sxAPV .sxAPVLabel{font-size:10px;letter-spacing:.12em;font-weight:800;color:#47796a}\n.sxAPV h2{font-size:19px;line-height:1.25;margin:5px 0 7px;font-weight:800;color:#1e4336}\n.sxAPV p{font-size:12px;line-height:1.5;margin:0;color:#587469}\n.sxAPVCount{background:#e1eee7;border:1px solid #c9e4d8;border-radius:30px;padding:7px 12px;font-size:11px;white-space:nowrap;color:#376c59;font-weight:700}\n.sxAPVControls{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:13px 0}\n.sxAPVFilter,.sxAPVAll{border:1px solid #cfe1d8;border-radius:11px;padding:7px 11px;font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;background:#fff;color:#365e50}\n.sxAPVFilter.active{background:#276f52;color:white;border-color:#276f52}\n.sxAPVAll{margin-left:auto;display:inline-flex;align-items:center}\n.sxAPVCards{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px}\n.sxAPVCard{border:1px solid #d9e9e2;overflow:hidden;text-align:left;border-radius:14px;background:#fff;cursor:pointer;color:#294738;padding:0;box-shadow:0 2px 9px rgba(29,84,59,.045);transition:transform .15s,border-color .15s}\n.sxAPVCard:hover{border-color:#7fbca3;transform:translateY(-2px)}\n.sxAPVThumb{aspect-ratio:16/9;position:relative;background:#d9e8df;display:block;overflow:hidden}\n.sxAPVThumb img{width:100%;height:100%;object-fit:cover;display:block}\n.sxAPVPlay{position:absolute;inset:0;display:grid;place-content:center;color:white;font-size:22px;text-shadow:0 2px 10px #0009}\n.sxAPVPlay>span{display:grid;place-content:center;width:39px;height:39px;background:#173d32bb;border-radius:50%}\n.sxAPVText{padding:11px;display:block}\n.sxAPVText b{font-size:12px;line-height:1.45;color:#253b32;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;min-height:35px}\n.sxAPVText small{display:block;margin-top:7px;font-size:10px;color:#60806e}\n.sxAPVEmpty{padding:15px;font-size:12px;color:#4e6b5e}\n.sxAPVModal{position:fixed;z-index:99999;inset:0;background:rgba(8,28,23,.78);display:grid;place-items:center;padding:18px}\n.sxAPVDialog{width:min(930px,100%);border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 20px 80px #0007}\n.sxAPVDialogTop{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:14px 17px}\n.sxAPVDialogTop b{font-size:14px;line-height:1.5;color:#244a38}\n.sxAPVDialogClose{background:#e8f3ed;border:0;border-radius:10px;cursor:pointer;padding:8px 12px;color:#25503e}\n.sxAPVFrame{aspect-ratio:16/9;background:#111}\n.sxAPVFrame iframe{width:100%;height:100%;border:0}\n.sxAPVDialogFoot{padding:11px 17px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#506b5f;font-size:12px}\n.sxAPVDialogFoot a{color:#116b4b;font-weight:700}\n@media(max-width:560px){.sxAPV{padding:14px;border-radius:15px}.sxAPVCards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.sxAPV h2{font-size:17px}.sxAPVAll{margin-left:0}.sxAPVDialogTop b{font-size:12px}}\n";
if(!D.getElementById('sxAnatomiaPraticaStyle')){const style=D.createElement('style');style.id='sxAnatomiaPraticaStyle';style.textContent=css;D.head.appendChild(style)}
const upgradedStyle=D.createElement('style');upgradedStyle.textContent="\n#subjectTabs .sxCatedraTab{background:#175e43!important;border:1px solid #175e43!important;color:#fff!important;font-weight:800!important;box-shadow:0 4px 16px rgba(26,102,72,.25)!important;border-radius:12px!important}\n#subjectTabs .sxCatedraTab.active{background:#0f4935!important;color:#fff!important;outline:2px solid #76b99a;outline-offset:2px}\n.sxAPV{padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;color:inherit!important}\n.sxAPVHero{display:flex;align-items:center;justify-content:space-between;padding:23px;gap:16px;border-radius:20px;background:linear-gradient(115deg,#123d2f,#1e7452);color:#fff}\n.sxAPVHero h2{font-size:25px!important;color:#fff!important;margin:6px 0!important}.sxAPVHero p{color:#d5e9de!important;font-size:12px;max-width:510px}\n.sxAPVHero .sxAPVLabel{color:#b5e9c9!important}.sxAPVHeroTags{display:flex;gap:6px;flex-wrap:wrap;margin-top:13px}.sxAPVHeroTags span{padding:6px 9px;font-size:10px;border-radius:7px;background:#ffffff19;color:#e4f7e9}\n.sxAPVHeroIcon{font-size:33px;display:grid;place-items:center;background:#ffffff16;border:1px solid #ffffff3d;border-radius:16px;min-width:66px;height:66px}\n.sxAPVColumns{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(260px,.85fr);gap:15px;align-items:start;margin-top:17px}\n.sxAPVMain,.sxAPVSide{border:1px solid #d4e8db;border-radius:17px;background:#fff;overflow:hidden;color:#224335}\n.sxAPVPlayer{aspect-ratio:16/9;background:#112820;position:relative}\n.sxAPVPlayer iframe{width:100%;height:100%;border:0}\n.sxAPVStart{display:grid;place-items:center;width:100%;height:100%;border:0;position:relative;cursor:pointer;background:radial-gradient(circle,#3b6d55,#132d22);color:#fff;font:inherit}\n.sxAPVStart img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.55)}\n.sxAPVStart span{position:relative;display:grid;place-items:center;width:68px;height:68px;background:#f4f7f3e8;color:#184d32;border-radius:50%;font-size:25px;box-shadow:0 8px 28px #0005}\n.sxAPVStart strong{position:relative;font-size:12px;letter-spacing:.04em}\n.sxAPVNow{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:16px 17px 8px}\n.sxAPVNow small{font-size:9px;letter-spacing:.12em;color:#779683;font-weight:800}.sxAPVNow h3{color:#194f35;font-size:16px;margin:5px 0;line-height:1.35}.sxAPVNow p{font-size:11px;color:#6b8775}\n.sxAPVDone{border:1px solid #cde3d4;border-radius:9px;background:#eaf3ed;color:#236b47;font-weight:700;padding:9px 11px;font-size:11px;cursor:pointer}\n.sxAPVDone.on{background:#196643;color:#fff}\n.sxAPVPlayerActions{display:flex;justify-content:space-between;gap:8px;padding:8px 17px 13px}\n.sxAPVPlayerActions button{padding:9px 11px;background:#f2f8f3;color:#286647;border:1px solid #d5e8dc;border-radius:9px;cursor:pointer;font-size:11px}\n.sxAPVSource{border-top:1px solid #ebf1ec;padding:12px 17px!important;color:#829083!important;font-size:10px!important}\n.sxAPVSide{max-height:610px;display:flex;flex-direction:column}\n.sxAPVListHead{padding:15px 13px 9px}.sxAPVListHead h3{font-size:14px;margin:0 0 2px}.sxAPVListHead small{font-size:10px;color:#6d8977}\n.sxAPVListHead input{border:1px solid #dae9de;border-radius:10px;background:#f8fbf8;color:#274934;padding:10px;width:100%;box-sizing:border-box;font:inherit;font-size:12px;margin-top:12px}\n.sxAPVControls{margin:0!important;padding:4px 13px 11px;border-bottom:1px solid #e9f2e9}\n.sxAPVFilter{font-size:10px!important}.sxAPVPlaylist{overflow-y:auto;padding:5px 8px 12px;min-height:80px}\n.sxAPVLesson{display:flex;text-align:left;width:100%;gap:10px;align-items:center;padding:8px;border:1px solid transparent;border-radius:11px;background:#fff;color:#234b34;font:inherit;cursor:pointer}\n.sxAPVLesson:hover{background:#f3f8f4}.sxAPVLesson.selected{background:#e8f5eb;border-color:#b3d8c1}\n.sxAPVMini{position:relative;width:95px;min-width:95px;aspect-ratio:16/9;border-radius:7px;overflow:hidden;background:#d5e9db}\n.sxAPVMini img{display:block;width:100%;height:100%;object-fit:cover}.sxAPVMini small{position:absolute;right:3px;bottom:3px;font-size:9px;border-radius:5px;background:#146b48;color:#fff;padding:2px 5px}\n.sxAPVLessonText{display:grid;gap:4px;min-width:0}.sxAPVLessonText b{font-size:11px;line-height:1.3;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.sxAPVLessonText small{font-size:10px;color:#638370}\n.sxAPVStatus{background:#edf5ef;border:1px solid #cde5d3;border-radius:17px;padding:25px;color:#1e5a3a}.sxAPVStatus h2{font-size:20px}.sxAPVRetry{border:0;background:#1e6446;color:white;padding:10px;border-radius:9px;margin-top:12px;cursor:pointer}\n@media(max-width:870px){.sxAPVColumns{grid-template-columns:1fr}.sxAPVSide{max-height:440px}}\n@media(max-width:550px){.sxAPVHero{padding:15px;border-radius:13px}.sxAPVHeroIcon{min-width:42px;height:42px;font-size:19px}.sxAPVColumns{gap:9px}.sxAPVNow{padding:12px}.sxAPVMini{width:75px;min-width:75px}.sxAPVSide{max-height:395px}}\n";D.head.appendChild(upgradedStyle);
const launcherCSS=D.createElement('style');launcherCSS.textContent="\n#subjectTabs [data-apv-launch]{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;margin:0 2px;border:1px solid #19744d!important;border-radius:11px!important;background:#176344!important;color:white!important;font-weight:800!important;white-space:nowrap;box-shadow:0 3px 12px #125b4022}\n#subjectTabs [data-apv-launch]:active,#subjectTabs [data-apv-launch].active{background:#104732!important}\n.sxAPVShortcut{display:flex!important;align-items:center;gap:14px;width:100%;text-align:left;padding:16px 18px;margin:0 0 18px;border:1px solid #b7d9c4;border-radius:15px;background:linear-gradient(110deg,#e7f3eb,#f7fbf8);color:#155037;cursor:pointer;font:inherit}\n.sxAPVShortcut span:nth-child(2){flex:1;min-width:0}.sxAPVShortcut strong,.sxAPVShortcut small{display:block}.sxAPVShortcut strong{font-size:15px;font-weight:800}.sxAPVShortcut small{font-size:11px;color:#5f806b;margin-top:4px}\n.sxAPVShortcutIcon{display:grid;place-items:center;min-width:44px;height:44px;background:#155b40;color:white;border-radius:12px;font-size:18px}\n.sxAPVShortcut>span:last-child{font-size:26px;color:#1b6645}\n@media(max-width:550px){.sxAPVShortcut{padding:12px;gap:10px}.sxAPVShortcutIcon{min-width:38px;height:38px}}\n";D.head.appendChild(launcherCSS);
const scopeStyle=D.createElement('style');scopeStyle.textContent='.sxAPVExternal{display:block;padding:2px 17px 14px;text-decoration:none;color:#14734a;font-size:11px;font-weight:700}.sxAPVExternal:hover{text-decoration:underline}';D.head.appendChild(scopeStyle);
const previous=W.renderSubject;
if(typeof previous==='function'){
 W.renderSubject=function(){const out=previous.apply(this,arguments);mount();return out};
}
D.addEventListener('click',e=>{
 const btn=e.target.closest('[data-apv-launch]');
 if(!btn||!course())return;
 e.preventDefault();e.stopPropagation();
 if(!course())return;
 if(typeof W.setTab==='function')W.setTab('catedra');
 else {UI.tab='catedra';W.renderSubject?.()}
});
W.SinusAnatomiaPratica={mount,load,get catalog(){return cache.data},get error(){return cache.erro},course,anatomyId,ensureLauncher};
load();
})(window,document);
