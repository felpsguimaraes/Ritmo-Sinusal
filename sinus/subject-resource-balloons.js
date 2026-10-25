/* SINUS · organização acadêmica: Lembretes > Materiais da turma > Arquivos da biblioteca. */
(function(W,D){'use strict';
if(!W.SinusBackend?.client||W.SINUS_DEMO)return;
const END='https://qyioizupudjrwmtasrue.supabase.co/functions/v1/sinus-subject-resources';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const stages={P1:'P1',P2:'P2',FINAL:'Final',OUTROS:'Outros'};
const cache=new Map(),pending=new Map(),active=new Map();let switching=false;
const sectionFor=t=>({apostila:'resumos',fotos:'laminas',cartoes:'training',mapas:'training',macro:'laminas'}[t]||t);
function context(){
 const view=D.getElementById('subjectView');
 if(!view||view.classList.contains('hidden')||typeof UI==='undefined'||!UI.subject)return null;
 const s=W.SinusApp?.S||{};
 return {subject:UI.subject,tab:UI.tab||'overview',section:sectionFor(UI.tab||'overview'),mode:UI.mode||'theory',period:Number(s.prefs?.periodo||DB?.subjects?.[UI.subject]?.period||0),cohort:String(s.turma||'').trim().toUpperCase()};
}
const keyFor=c=>[c.period,c.cohort,c.subject].join('|');
async function load(c){
 const k=keyFor(c);if(cache.has(k))return cache.get(k);if(pending.has(k))return pending.get(k);
 const task=(async()=>{
  const {data:{session}}=await W.SinusBackend.client.auth.getSession();
  if(!session)return {configs:{},items:[]};
  const r=await fetch(END,{method:'POST',headers:{Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'},body:JSON.stringify({action:'student',subject:c.subject})});
  if(!r.ok)throw Error('Não foi possível obter os recursos do SINUS');
  const d=await r.json(),configs={};
  for(const x of d.configs||[])configs[x.section]=x;
  const result={configs,items:Array.isArray(d.items)?d.items:[]};
  cache.set(k,result);return result;
 })().finally(()=>pending.delete(k));
 pending.set(k,task);return task;
}
function fileLink(item){
 try{
  const raw=String(item.url||'');
  let url;
  if(raw)url=new URL(raw);else if(/^[a-zA-Z0-9_-]{15,}$/.test(String(item.id||item.file_id||'')))url=new URL('https://drive.google.com/file/d/'+encodeURIComponent(item.id||item.file_id)+'/view');
  else return null;
  if(url.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(url.hostname))return null;
  const folder=/\/folders\//.test(url.pathname);
  const id=url.pathname.match(/\/(?:d|folders)\/([a-zA-Z0-9_-]{15,})/)?.[1]||url.searchParams.get('id')||'';
  let preview='';
  if(id&&!folder){
   if(url.hostname==='docs.google.com'&&/^\/(?:document|spreadsheets|presentation)\//.test(url.pathname)){
    preview='https://docs.google.com/'+url.pathname.split('/')[1]+'/d/'+encodeURIComponent(id)+'/preview';
   }else preview='https://drive.google.com/file/d/'+encodeURIComponent(id)+'/preview';
  }
  const title=String(item.title||'Material'),name=norm(title);
  let stage=String(item.stage||'').toUpperCase();
  if(!stages[stage]){
   if(/\bp[\s._-]*1\b|\bprimeiro parcial\b|\bparcial 1\b/.test(name))stage='P1';
   else if(/\bp[\s._-]*2\b|\bsegundo parcial\b|\bparcial 2\b/.test(name))stage='P2';
   else if(/\bfinal\b/.test(name))stage='FINAL';else stage='OUTROS';
  }
  return {id,title,url:url.href,preview,stage,section:item.section||item.cat||'',cohort:item.cohort||''};
 }catch{return null;}
}
function cohortMatch(x,c){
 const tagged=String(x.cohort||x.class_name||x.turma||'').trim().toUpperCase()||(String(x.period||'').match(/\bTurma\s+([A-Z]{1,3})\b/i)?.[1]||'').toUpperCase();
 return !tagged||!!c&&tagged===c;
}
function customFiles(c,data){
 const result=[],section=c.section;
 const configured=data.configs||{};
 const sections=section==='overview'?['overview','slides','resumos','provas','videos','audios','pratica','complementares','livros']:
  [section];
 for(const key of sections)for(const link of configured[key]?.visible===false?[]:configured[key]?.links||[]){
  const x=fileLink({...link,section:key});if(x)result.push(x);
 }
 for(const row of data.items||[]){
  if(row.academic_period!==c.period||!cohortMatch(row,c.cohort))continue;
  if(section!=='overview'&&section!=='transcribe'&&section!=='notebook'&&section!=='training'&&row.section!==section)continue;
  const x=fileLink({...row,id:row.file_id});if(x)result.push(x);
 }
 const sb=typeof DB!=='undefined'?DB.subjects?.[c.subject]:null;
 if(sb){const categories=section==='overview'?['slides','provas','audios','videos','pratica','complementares']:
     section==='resumos'?['complementares']:['training','transcribe','notebook','review'].includes(section)?['slides','provas','complementares']:[section];
  for(const category of categories)for(const item of sb[category]||[]){
   if(item.active===false||!cohortMatch(item,c.cohort))continue;
   const tagged=String(item.cohort||item.class_name||item.turma||'')||(String(item.period||'').match(/\bTurma\s+([A-Z]{1,3})\b/i)?.[1]||'');
   if(!tagged)continue; // Arquivo geral não será apresentado como arquivo exclusivo da turma.
   if(item.studyMode&&item.studyMode!==c.mode)continue;
   const x=fileLink({...item,section:category});if(x)result.push(x);
  }
 }
 const seen=new Set();
 return result.filter(x=>{if(seen.has(x.url))return false;seen.add(x.url);return true;});
}
function libraryFiles(c,known){
 const raw=W.SinusLibrary?.catalog?.()||[],selected=new Set(known.map(x=>x.id));
 const list=[],seen=new Set();
 for(const item of raw){
  if(!item||item.active===false||norm(item.subject)!==norm(c.subject)||!cohortMatch(item,c.cohort))continue;
  if(Number(item.academicPeriod||c.period)!==c.period)continue;
  if(item.id&&selected.has(item.id))continue;
  if(!['overview','training','transcribe','notebook','review'].includes(c.section)){
   const matches={resumos:['complementares','resumos','apostila'],slides:['slides'],provas:['provas'],videos:['videos'],audios:['audios'],pratica:['pratica'],laminas:['pratica','laminas'],livros:['livros'],complementares:['complementares']}[c.section];
   if(matches&&!matches.includes(String(item.cat||item.studySection||'')))continue;
  }
  const unique=String(item.id||item.title||'');if(seen.has(unique))continue;seen.add(unique);
  const link=fileLink(item);
  if(link)list.push({...link,kind:item.kind||'Arquivo',uploaded:!!item.uploaded});
 }
 return list.slice(0,36);
}
function setTabs(c,data){
 const hidden=k=>data.configs[k]?.visible===false;
 if(c.tab!=='overview'&&hidden(c.section)&&!switching){
  switching=true;UI.tab='overview';W.renderSubject?.();switching=false;return false;
 }
 D.querySelectorAll('#subjectTabs button').forEach(b=>{
  const key=b.dataset.sxTopTab||b.getAttribute('onclick')?.match(/setTab\(['"]([^'"]+)['"]\)/)?.[1];
  if(!key)return;b.hidden=hidden(sectionFor(key));
  const renamed=data.configs[sectionFor(key)]?.label;if(renamed)b.textContent=renamed;
 });
 return true;
}
function createElement(tag,className,inner){const el=D.createElement(tag);el.className=className;el.innerHTML=inner;return el;}
function classBody(c,files){
 const root=D.getElementById('sxCourseOwn');if(!root)return;
 const k=[...Object.values(stages)],chosen=active.get([keyFor(c),c.tab,c.mode].join('|'))||{stage:'TODOS',url:''};
 const currentList=files.filter(x=>c.section!=='slides'||chosen.stage==='TODOS'||x.stage===chosen.stage);
 if(!currentList.some(x=>x.url===chosen.url))chosen.url=currentList[0]?.url||'';
 active.set([keyFor(c),c.tab,c.mode].join('|'),chosen);
 const item=currentList.find(x=>x.url===chosen.url)||null;
 root.querySelector('.sxAOStage').innerHTML=c.section==='slides'?'<span>Selecionar avaliação</span><div class="sxAOPills">'+[['TODOS','Todos'],...Object.entries(stages)].map(([id,label])=>'<button type="button" class="'+(chosen.stage===id?'selected':'')+'" data-sx-aostage="'+id+'">'+label+'</button>').join('')+'</div>':'';
 const view=root.querySelector('.sxAOViewer');
 view.innerHTML=item?
 '<div class="sxAOFile"><strong>'+esc(item.title)+'</strong><a href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">Abrir no Drive ↗</a></div>'+
 (item.preview?'<iframe title="'+esc(item.title)+'" src="'+esc(item.preview)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>':'<div class="sxAOEmptyPreview">Pasta do Drive · abra para consultar os arquivos internos.</div>'):
 '<div class="sxAOEmptyPreview">'+(files.length?'Nenhum material identificado para essa avaliação.':'Nenhum material da turma cadastrado. Ao importar o Drive, os arquivos aparecerão aqui automaticamente.')+'</div>';
 const side=root.querySelector('.sxAOQueue');
 side.innerHTML='<div class="sxAOQueueTitle">'+currentList.length+' arquivo(s) · '+esc(c.cohort?'Turma '+c.cohort:'Conteúdo compartilhado')+'</div>'+
 currentList.map((x,i)=>'<button type="button" class="sxAOFileItem '+(chosen.url===x.url?'is-active':'')+'" data-sx-aourl="'+esc(x.url)+'"><b>'+esc(x.title)+'</b><small>'+esc(stages[x.stage])+' · '+esc(x.section||'Arquivo')+'</small></button>').join('');
 root.onclick=e=>{
  const stage=e.target.closest('[data-sx-aostage]');if(stage){chosen.stage=stage.dataset.sxAostage;chosen.url='';classBody(c,files);return;}
  const open=e.target.closest('[data-sx-aourl]');if(open){chosen.url=open.dataset.sxAourl;classBody(c,files);}
 };
}
function render(c,data){
 const host=D.getElementById('subjectContent');if(!host||!c||!setTabs(c,data))return;
 let current=context();if(!current||current.subject!==c.subject||current.tab!==c.tab||current.mode!==c.mode)return;
 const own=customFiles(c,data),suggested=libraryFiles(c,own);
 let wrap=host.querySelector(':scope > .sxAcademicOrdered');
 if(wrap){const freshRem=host.querySelector(':scope > .sinus-rem-box');if(freshRem)wrap.querySelector('.sxAOReminders').replaceChildren(freshRem);
  classBody(c,own);return;}
 wrap=createElement('div','sxAcademicOrdered','<section class="sxAOReminders"></section>'+
 '<section class="sxAOBlock" aria-label="Materiais da turma"><div class="sxAOHead"><div><small>CONTEÚDO OFICIAL DA TURMA</small><h2>'+(c.section==='slides'?'Slides da turma':'Materiais da turma')+'</h2><p>Arquivos da matéria vinculados ao seu período e turma.</p></div><span class="sxAOCohort">'+esc(c.cohort?'Turma '+c.cohort:'Sua turma')+'</span></div><div id="sxCourseOwn"><div class="sxAOStage"></div><div class="sxAOPlayQueue"><div class="sxAOViewer"></div><aside class="sxAOQueue" aria-label="Lista de materiais"></aside></div></div></section>'+
 '<section class="sxAOBlock sxAOLibrary" aria-label="Arquivos da biblioteca"><div class="sxAOHead"><div><small>ACERVO COMPLEMENTAR</small><h2>Arquivos da biblioteca</h2><p>Sugestões da biblioteca correspondentes à matéria e ao período.</p></div><span class="sxAOSuggestCount">'+suggested.length+' arquivos</span></div><div class="sxAOLibraryItems"></div></section>');
 const reminder=host.querySelector(':scope > .sinus-rem-box');
 if(reminder)wrap.querySelector('.sxAOReminders').appendChild(reminder);
 else wrap.querySelector('.sxAOReminders').innerHTML='<div class="sxAORemindFallback"><strong>Lembretes</strong><button type="button" data-rem-add="'+esc(c.subject)+'">＋ Adicionar lembrete</button></div>';
 // Reaproveitar galerias existentes, sem perder seus players ou seus manipuladores de eventos.
 const gallery=host.querySelector(':scope > .sxMG, :scope > .sxCourseMedia');
 if(gallery){
  gallery.querySelector('.sxMGHead h2,.sxCourseMediaHead h2')?.replaceChildren(D.createTextNode('Arquivos da biblioteca'));
  wrap.querySelector('.sxAOLibraryItems').appendChild(gallery);
 }else if(suggested.length){
  wrap.querySelector('.sxAOLibraryItems').innerHTML='<div class="sxAOLibraryGrid">'+suggested.slice(0,20).map(x=>'<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" class="sxAOLibraryItem"><span>▧</span><b>'+esc(x.title)+'</b><small>Ver arquivo ↗</small></a>').join('')+'</div>';
 }else{
  wrap.querySelector('.sxAOLibraryItems').innerHTML='<p class="sxAOEmptyLibrary">Não há arquivos sugeridos com classificação confirmada para esta matéria e período.</p>';
 }
 host.prepend(wrap);
 classBody(c,own);
 const originals=[...host.children].filter(el=>el!==wrap&&el.classList?.contains('resourceLayout'));
 if(originals.length&&own.length){
  // Preserve a funcionalidade nativa sem exibir uma segunda fila gigante antes da biblioteca.
  const details=createElement('details','sxAOExtras','<summary>Mais ferramentas e materiais da aba</summary>');
  originals.forEach(el=>details.appendChild(el));host.appendChild(details);
 }
}
const original=W.renderSubject;
if(typeof original==='function')W.renderSubject=function(){
 const result=original.apply(this,arguments),c=context();if(!c)return result;
 const k=keyFor(c),cached=cache.get(k);
 render(c,cached||{configs:{},items:[]});
 if(!cached)load(c).then(data=>{
  const current=context();
  if(current&&keyFor(current)===k&&current.tab===c.tab&&current.mode===c.mode){
   D.querySelector('#subjectContent > .sxAcademicOrdered')?.remove();
   // Restaurar lembrete original antes de reconstruir os três blocos.
   const old=D.querySelector('.sxAOReminders > .sinus-rem-box');if(old)D.getElementById('subjectContent').prepend(old);
   render(c,data);
  }
 }).catch(()=>{});
 return result;
};
W.SinusBackend.client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT'||event==='SIGNED_IN')cache.clear();});
D.head.insertAdjacentHTML('beforeend','<style>.sxAcademicOrdered{display:flex;flex-direction:column;gap:15px;margin-bottom:18px;color:#244632}.sxAcademicOrdered .sinus-rem-box{margin:0!important}.sxAOBlock{background:#fff;border:1px solid #dce9e0;border-radius:17px;padding:20px}.sxAOHead{display:flex;justify-content:space-between;align-items:start;gap:12px;margin-bottom:17px}.sxAOHead small{font-size:10px;letter-spacing:.12em;font-weight:800;color:#608b6e}.sxAOHead h2{font-size:21px;margin:5px 0}.sxAOHead p{font-size:12px;color:#788e7d;margin:0}.sxAOCohort,.sxAOSuggestCount{padding:8px 11px;border-radius:12px;background:#ebf5ee;color:#386e4c;font-size:11px;white-space:nowrap}.sxAOPlayQueue{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(225px,.9fr);gap:14px}.sxAOViewer,.sxAOQueue{border:1px solid #dce9e0;border-radius:12px;background:#fafcfb;min-height:220px;overflow:hidden}.sxAOViewer iframe{width:100%;height:min(54vw,520px);min-height:345px;border:0;background:#fff}.sxAOFile{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px}.sxAOFile strong{font-size:13px;overflow-wrap:anywhere}.sxAOFile a{font-size:11px;white-space:nowrap;color:#267449}.sxAOEmptyPreview{height:220px;display:grid;place-items:center;text-align:center;padding:22px;color:#6d8575;font-size:13px}.sxAOQueue{padding:9px;max-height:530px;overflow:auto}.sxAOQueueTitle{font-size:11px;color:#708a78;padding:9px 7px}.sxAOFileItem{display:block;text-align:left;width:100%;border:1px solid #e1eae4;background:#fff;color:#2a4e36;padding:11px;margin-bottom:6px;border-radius:11px;cursor:pointer}.sxAOFileItem.is-active{background:#e7f4e9;border-color:#a6ceb0}.sxAOFileItem b{display:block;font-size:12px}.sxAOFileItem small{display:block;margin-top:5px;color:#809786;font-size:10px}.sxAOStage{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}.sxAOStage>span{font-size:11px;color:#65856e}.sxAOPills{display:flex;flex-wrap:wrap;gap:5px}.sxAOPills button{padding:7px 12px;border-radius:16px;border:1px solid #d6e6dc;color:#3e6850;background:#f5f9f6;font-size:11px;cursor:pointer}.sxAOPills button.selected{background:#1f7850;border-color:#1f7850;color:white}.sxAOLibraryGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:9px}.sxAOLibraryItem{display:flex;flex-direction:column;gap:8px;padding:15px;text-decoration:none;border:1px solid #e1e9e3;border-radius:12px;background:#f8fbf8;color:#2e5a3e}.sxAOLibraryItem b{font-size:12px;overflow-wrap:anywhere}.sxAOLibraryItem small{font-size:10px;color:#709079}.sxAOEmptyLibrary{font-size:12px;color:#7c8c7f}.sxAOLibrary .sxMG,.sxAOLibrary .sxCourseMedia{margin:0!important;border:none!important;padding:0!important;background:transparent!important}.sxAOLibrary .sxMGHead h2,.sxAOLibrary .sxCourseMediaHead h2{display:none}.sxAOExtras{margin:12px 0;border:1px solid #e3eae5;padding:14px;border-radius:12px}.sxAOExtras summary{font-size:12px;cursor:pointer;color:#537b61}.sxAORemindFallback{display:flex;justify-content:space-between;align-items:center;padding:15px;background:#e9f1fa;border-radius:14px}.sxAORemindFallback button{background:#fff;border:1px solid #d5e1eb;padding:8px 12px;border-radius:9px}@media(max-width:780px){.sxAOPlayQueue{grid-template-columns:1fr}.sxAOViewer iframe{min-height:300px;height:400px}.sxAOHead{flex-wrap:wrap}.sxAOBlock{padding:14px}.sxAOQueue{min-height:80px;max-height:320px}}</style>');
})(window,document);