/* SINUS · organização acadêmica: Lembretes > Materiais da turma > Arquivos da biblioteca. */
(function(W,D){'use strict';
// O player de slides também funciona sem sessão/backend (modo de demonstração).
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
  if(!W.SinusBackend?.client||W.SINUS_DEMO)return {configs:{},items:[]};
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
  // Arquivos do Office abertos no editor Google não são documentos nativos.
  // Para PPTX/DOCX/XLSX, usar o visualizador genérico do Drive.
  const mime=String(item.mimeType||item.mime_type||item.mime||'').toLowerCase();
  const office=/\.(?:pptx?|docx?|xlsx?|ppsx?)$/i.test(String(item.title||item.name||''))||
    /vnd\.openxmlformats-officedocument|vnd\.ms-powerpoint|msword|vnd\.ms-excel/.test(mime)||
    url.searchParams.has('rtpof')||url.searchParams.has('sd');
  let preview='';
  if(id&&!folder){
   if(url.hostname==='docs.google.com'&&!office&&/^\/(?:document|spreadsheets|presentation)\//.test(url.pathname)){
    preview='https://docs.google.com/'+url.pathname.split('/')[1]+'/d/'+encodeURIComponent(id)+'/preview';
   }else preview='https://drive.google.com/file/d/'+encodeURIComponent(id)+'/preview';
  }
  const title=String(item.title||'Material'),name=norm([title,item.period,item.stage].filter(Boolean).join(' '));
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
/* Leitor único de slides na aba Slides de todas as matérias teóricas, com acervo e turma.
 * O mesmo iframe permanece montado durante sincronizações e trocas de filtro.
 */
function slideCollection(c,data){
 if(data?.configs?.slides?.visible===false)return {own:[],library:[],all:[]};
 const slideContext={...c,tab:'slides',section:'slides',mode:'theory'};
 const seen=new Set(),own=[],library=[];
 const add=(item,source)=>{
  if(!item||item.active===false||item.studyMode==='practice'||item.mode==='practice')return;
  if(!cohortMatch(item,c.cohort))return;
  const period=Number(item.academicPeriod||item.academic_period||0);
  if(period&&c.period&&period!==c.period)return;
  const file=fileLink({...item,section:'slides'});
  if(!file||seen.has(file.url))return;
  seen.add(file.url);(source==='turma'?own:library).push({...file,source});
 };
 // O painel do administrador e o Drive da turma alimentam a primeira categoria.
 // customFiles já respeita matéria, turma, período e configurações da seção Slides.
 for(const item of customFiles(slideContext,data))add(item,'turma');
 const db=typeof DB!=='undefined'?DB.subjects?.[c.subject]:null;
 if(db){
  for(const item of [...(db.slides||[]),...(db.complementares||[]).filter(x=>x.studySection==='slides')]){
   if(item.active===false)continue;
   const tagged=String(item.cohort||item.class_name||item.turma||'')||
     (String(item.period||'').match(/\bTurma\s+([A-Z]{1,3})\b/i)?.[1]||'');
   add(item,tagged?'turma':'biblioteca');
  }
 }
 for(const item of W.SinusLibrary?.catalog?.()||[]){
  if(norm(item.subject)!==norm(c.subject))continue;
  if(!['slides'].includes(String(item.cat||''))&&item.studySection!=='slides')continue;
  const tagged=String(item.cohort||item.class_name||item.turma||'').trim();
  add(item,tagged?'turma':'biblioteca');
 }
 return {own,library,all:[...own,...library]};
}
function drawSlides(c,data,wrap,refresh=false){
 const section=wrap.querySelector('[data-sx-unified-slides]');if(!section)return;
 // Mudanças de filtro reutilizam o catálogo: só sincronizações reconstroem a lista.
 const collection=(!refresh&&section.__slideList)||slideCollection(c,data);
 section.__slideList=collection;
 const key=keyFor(c)+'|theory-slides';
 const state=active.get(key)||{stage:'TODOS',source:'todos',url:'',query:'',limit:75};
 active.set(key,state);
 const searchable=norm(state.query),list=collection.all.filter(x=>
  (state.source==='todos'||x.source===state.source)&&
  (state.stage==='TODOS'||x.stage===state.stage)&&
  (!searchable||norm(x.title).includes(searchable))
 );
 if(!list.some(x=>x.url===state.url))state.url=list[0]?.url||'';
 const item=list.find(x=>x.url===state.url)||null;
 section.querySelector('[data-sx-slide-total]').textContent=collection.all.length+' slides';
 section.querySelector('[data-sx-slide-breakdown]').textContent=collection.own.length+' da turma · '+collection.library.length+' da biblioteca';
 const stages=section.querySelector('[data-sx-slide-stages]');
 stages.innerHTML=[['TODOS','Todos'],...Object.entries(stagesLabels())].map(([code,name])=>
  '<button type="button" data-sx-slide-stage="'+code+'" class="'+(state.stage===code?'selected':'')+'">'+name+'</button>'
 ).join('');
 const sources=section.querySelector('[data-sx-slide-sources]');
 sources.innerHTML=[['todos','Todos os slides',collection.all.length],['turma','Da turma',collection.own.length],['biblioteca','Da biblioteca',collection.library.length]].map(([code,name,n])=>
  '<button type="button" data-sx-slide-source="'+code+'" class="'+(state.source===code?'selected':'')+'">'+name+' <span>'+n+'</span></button>'
 ).join('');
 const input=section.querySelector('[data-sx-slide-query]');
 if(input&&input.value!==state.query)input.value=state.query;
 const view=section.querySelector('[data-sx-slide-view]');
 const wanted=item?.preview||'',chosen=item?.url||'';
 if(view.dataset.preview!==wanted||view.dataset.selected!==chosen){
  view.dataset.preview=wanted;view.dataset.selected=chosen;
  view.innerHTML=item?
   '<div class="sxAOFile"><strong>'+esc(item.title)+'</strong><a href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">Abrir original ↗</a></div>'+
   (wanted?'<iframe title="'+esc(item.title)+'" src="'+esc(wanted)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'+
    '<div class="sxAOPreviewHelp"><span>Se a prévia do Google falhar, abra o arquivo original.</span>'+
    '<a href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">Abrir no Drive ↗</a></div>':
    '<div class="sxAOEmptyPreview">Esta origem é uma pasta. Abra o link para escolher uma apresentação.</div>'):
   '<div class="sxAOEmptyPreview">'+(collection.all.length?'Nenhum slide corresponde aos filtros selecionados.':'Ainda não há slides associados a esta matéria. Ao sincronizar o Drive da turma, eles aparecerão aqui.')+'</div>';
 }
 const queue=section.querySelector('[data-sx-slide-queue]');
 const shown=list.slice(0,state.limit);
 queue.innerHTML='<div class="sxAOQueueTitle">'+list.length+' arquivo(s) · '+esc(c.subject)+'</div>'+
  shown.map(x=>'<button type="button" class="sxAOFileItem '+(item?.url===x.url?'is-active':'')+'" data-sx-slide-item="'+esc(x.url)+'" aria-current="'+(item?.url===x.url?'true':'false')+'"><b>'+esc(x.title)+'</b><small>'+esc(stages[x.stage]||'Outros')+' · '+(x.source==='turma'?'Slides da turma':'Slides da biblioteca')+'</small></button>').join('')+
  (list.length>shown.length?'<button type="button" class="sxAOMore" data-sx-slide-more>Mostrar mais '+(list.length-shown.length)+' slides</button>':'');
 section.onclick=e=>{
  const stage=e.target.closest('[data-sx-slide-stage]');
  if(stage){state.stage=stage.dataset.sxSlideStage;state.url='';state.limit=75;drawSlides(c,data,wrap);return}
  const source=e.target.closest('[data-sx-slide-source]');
  if(source){state.source=source.dataset.sxSlideSource;state.url='';state.limit=75;drawSlides(c,data,wrap);return}
  const selected=e.target.closest('[data-sx-slide-item]');
  if(selected){state.url=selected.dataset.sxSlideItem;drawSlides(c,data,wrap);return}
  if(e.target.closest('[data-sx-slide-more]')){state.limit+=75;drawSlides(c,data,wrap)}
 };
 const search=section.querySelector('[data-sx-slide-query]');
 search.oninput=()=>{state.query=search.value;state.url='';state.limit=75;drawSlides(c,data,wrap)};
}
function stagesLabels(){return {P1:'P1',P2:'P2',FINAL:'Final',OUTROS:'Outros'}}
function renderOtherOfficial(c,files,wrap){
 const box=wrap.querySelector('[data-sx-official-other]');
 if(!box)return;
 const list=c.section==='slides'?[]:files.filter(x=>!(/^(?:p1|p2|final)$/i.test(x.section||'')&&c.section==='slides'));
 box.hidden=list.length===0;
 if(!list.length)return;
 box.querySelector('[data-sx-official-list]').innerHTML=list.map(x=>
  '<a class="sxAOOtherItem" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><span>'+esc(x.title)+'</span><small>Abrir arquivo ↗</small></a>'
 ).join('');
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
/* Cada aba tem exatamente um conteúdo principal.
 * Slides teóricos: leitor único; demais abas: conteúdo nativo próprio,
 * abaixo dos lembretes. Nunca montar um iframe de slides fora de Slides.
 */
function sectionIsSlides(c){return c.mode==='theory'&&c.tab==='slides'}
function libraryMarkup(suggested){
 const total=suggested.length;
 return '<section class="sxAOBlock sxAOLibrary" aria-label="Arquivos da biblioteca">'+
  '<div class="sxAOHead"><div><small>ACERVO COMPLEMENTAR</small><h2>Arquivos da biblioteca</h2>'+
  '<p>Materiais relacionados a esta disciplina.</p></div><span class="sxAOSuggestCount">'+total+' arquivos</span></div>'+
  '<div class="sxAOLibraryItems"></div></section>';
}
function renderLibrary(c,suggested,wrap){
 const library=wrap.querySelector('.sxAOLibrary');
 if(!library)return;
 // O treino precisa conservar o painel de exercícios como foco, sem acervo concorrente.
 const hide=['training','cartoes','mapas'].includes(c.tab)||suggested.length===0;
 library.hidden=hide;
 const label=wrap.querySelector('.sxAOSuggestCount');
 if(label)label.textContent=suggested.length+' arquivos';
 const list=wrap.querySelector('.sxAOLibraryItems');
 if(list&&!hide){
  const html=suggested.slice(0,20).map(x=>
   '<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" class="sxAOLibraryItem">'+
   '<span>▧</span><b>'+esc(x.title)+'</b><small>Abrir arquivo ↗</small></a>'
  ).join('');
  if(list.dataset.contents!==html){list.innerHTML='<div class="sxAOLibraryGrid">'+html+'</div>';list.dataset.contents=html;}
 }
}
function prioritizeNative(host,wrap,c){
 const reminderSlot=wrap.querySelector('.sxAOReminders');
 const primary=wrap.querySelector('[data-sx-primary]');
 for(const node of [...host.children]){
  if(node===wrap)continue;
  if(node.matches('.sinus-rem-box')){
   if(reminderSlot)reminderSlot.replaceChildren(node);
  }else if(sectionIsSlides(c)){
   // O leitor único da aba Slides substitui a fila e a galeria antigas de slides.
   if(node.matches('.resourceLayout,.sxMG,.sxMGOriginal'))node.remove();
   else if(primary)primary.appendChild(node);
  }else if(primary){
   // Preservar os ouvintes e os players originais: apenas mover os nós.
   primary.appendChild(node);
  }
 }
}
function render(c,data){
 const host=D.getElementById('subjectContent');if(!host||!c||!setTabs(c,data))return;
 const current=context();if(!current||current.subject!==c.subject||current.tab!==c.tab||current.mode!==c.mode)return;
 const slideOnly=sectionIsSlides(c);
 // Não consultar o catálogo de slides nas demais abas: menor trabalho e zero player indevido.
 const own=slideOnly?[]:customFiles(c,data);
 const suggested=slideOnly?[]:libraryFiles(c,own);
 let wrap=host.querySelector(':scope > .sxAcademicOrdered');
 if(wrap&&!!wrap.querySelector('[data-sx-unified-slides]')!==slideOnly){wrap.remove();wrap=null;}
 if(!wrap){
  const slideHTML='<section class="sxAOBlock sxAOUnified" data-sx-unified-slides aria-label="TEORIA · SLIDES">'+
   '<div class="sxAOHead"><div><small>TEORIA · SLIDES</small><h2>Estudar slides</h2>'+
   '<p>Slides da turma e da biblioteca em um único leitor.</p></div>'+
   '<div class="sxAOUnifiedMeta"><span class="sxAOCohort" data-sx-slide-total>0 slides</span>'+
   '<small data-sx-slide-breakdown></small></div></div>'+
   '<div class="sxAOSlideControls"><div class="sxAOPills sxAOSourcePills" data-sx-slide-sources></div>'+
   '<div class="sxAOPills" data-sx-slide-stages></div>'+
   '<input data-sx-slide-query aria-label="Buscar slides" type="search" placeholder="Buscar apresentação..." autocomplete="off"></div>'+
   '<div class="sxAOPlayQueue"><div class="sxAOViewer" data-sx-slide-view></div>'+
   '<aside class="sxAOQueue" aria-label="Slides para estudar" data-sx-slide-queue></aside></div></section>';
  const primaryHTML='<section class="sxAOPrimary" data-sx-primary aria-label="Conteúdo principal da aba"></section>'+
   '<details class="sxAOOtherOwn" data-sx-official-other hidden><summary>Outros materiais desta aba</summary>'+
   '<div class="sxAOOtherList" data-sx-official-list></div></details>';
  wrap=createElement('div','sxAcademicOrdered',
   '<section class="sxAOReminders"></section>'+ (slideOnly?slideHTML:primaryHTML+libraryMarkup(suggested)));
  host.prepend(wrap);
 }
 const freshRem=host.querySelector(':scope > .sinus-rem-box');
 if(freshRem)wrap.querySelector('.sxAOReminders')?.replaceChildren(freshRem);
 else if(!wrap.querySelector('.sxAOReminders')?.firstElementChild)
  wrap.querySelector('.sxAOReminders').innerHTML=
   '<div class="sxAORemindFallback"><strong>Lembretes</strong>'+
   '<button type="button" data-rem-add="'+esc(c.subject)+'">＋ Adicionar lembrete</button></div>';
 prioritizeNative(host,wrap,c);
 if(slideOnly){
  drawSlides(c,data,wrap,true);
 }else{
  renderOtherOfficial(c,own,wrap);
  renderLibrary(c,suggested,wrap);
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
   // Atualização incremental: não destruir lembretes, players ou o iframe da Cátedra.
   render(c,data);
  }
 }).catch(()=>{});
 return result;
};
W.SinusBackend?.client?.auth?.onAuthStateChange?.(event=>{if(event==='SIGNED_OUT'||event==='SIGNED_IN'){cache.clear();active.clear();}});
function refreshLibrarySuggestions(){
 const c=context();if(!c)return;
 const cached=cache.get(keyFor(c));
 render(c,cached||{configs:{},items:[]});
}
['sinus:drive-ready','sinus:medicina-ready','sinus:library-uploads-ready'].forEach(event=>W.addEventListener(event,refreshLibrarySuggestions));
W.SinusAcervoAuditado?.ready?.then(refreshLibrarySuggestions).catch(()=>{});
D.head.insertAdjacentHTML('beforeend','<style>.sxAOPreviewHelp{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 13px;font-size:11px;color:#63816e;border-top:1px solid #e0ece3;background:#f8fcf9}.sxAOPreviewHelp a{font-weight:750;color:#226e44;text-decoration:underline;text-underline-offset:2px}.sxAcademicOrdered{display:flex;flex-direction:column;gap:15px;margin-bottom:18px;color:#244632}.sxAOPrimary{min-width:0;display:flex;flex-direction:column;gap:14px}.sxAOPrimary:empty{display:none}.sxAOPrimary>.resourceLayout,.sxAOPrimary>.sxCourseMedia,.sxAOPrimary>.sxMG,.sxAOPrimary>.sxSPSection,.sxAOPrimary>.sxMediaSection,.sxAOPrimary>.sxSubjectHub{margin-top:0!important}.sxAcademicOrdered .sxAOLibrary[hidden],.sxAcademicOrdered .sxAOOtherOwn[hidden]{display:none!important}.sxAcademicOrdered .sinus-rem-box{margin:0!important}.sxAOBlock{background:#fff;border:1px solid #dce9e0;border-radius:17px;padding:20px}.sxAOHead{display:flex;justify-content:space-between;align-items:start;gap:12px;margin-bottom:17px}.sxAOHead small{font-size:10px;letter-spacing:.12em;font-weight:800;color:#608b6e}.sxAOHead h2{font-size:21px;margin:5px 0}.sxAOHead p{font-size:12px;color:#788e7d;margin:0}.sxAOCohort,.sxAOSuggestCount{padding:8px 11px;border-radius:12px;background:#ebf5ee;color:#386e4c;font-size:11px;white-space:nowrap}.sxAOPlayQueue{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(225px,.9fr);gap:14px}.sxAOViewer,.sxAOQueue{border:1px solid #dce9e0;border-radius:12px;background:#fafcfb;min-height:220px;overflow:hidden}.sxAOViewer iframe{width:100%;height:min(54vw,520px);min-height:345px;border:0;background:#fff}.sxAOFile{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px}.sxAOFile strong{font-size:13px;overflow-wrap:anywhere}.sxAOFile a{font-size:11px;white-space:nowrap;color:#267449}.sxAOEmptyPreview{height:220px;display:grid;place-items:center;text-align:center;padding:22px;color:#6d8575;font-size:13px}.sxAOQueue{padding:9px;max-height:530px;overflow:auto}.sxAOQueueTitle{font-size:11px;color:#708a78;padding:9px 7px}.sxAOFileItem{display:block;text-align:left;width:100%;border:1px solid #e1eae4;background:#fff;color:#2a4e36;padding:11px;margin-bottom:6px;border-radius:11px;cursor:pointer}.sxAOFileItem.is-active{background:#e7f4e9;border-color:#a6ceb0}.sxAOFileItem b{display:block;font-size:12px}.sxAOFileItem small{display:block;margin-top:5px;color:#809786;font-size:10px}.sxAOStage{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}.sxAOStage>span{font-size:11px;color:#65856e}.sxAOPills{display:flex;flex-wrap:wrap;gap:5px}.sxAOPills button{padding:7px 12px;border-radius:16px;border:1px solid #d6e6dc;color:#3e6850;background:#f5f9f6;font-size:11px;cursor:pointer}.sxAOPills button.selected{background:#1f7850;border-color:#1f7850;color:white}.sxAOLibraryGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:9px}.sxAOLibraryItem{display:flex;flex-direction:column;gap:8px;padding:15px;text-decoration:none;border:1px solid #e1e9e3;border-radius:12px;background:#f8fbf8;color:#2e5a3e}.sxAOLibraryItem b{font-size:12px;overflow-wrap:anywhere}.sxAOLibraryItem small{font-size:10px;color:#709079}.sxAOEmptyLibrary{font-size:12px;color:#7c8c7f}.sxAOLibrary .sxMG,.sxAOLibrary .sxCourseMedia{margin:0!important;border:none!important;padding:0!important;background:transparent!important}.sxAOLibrary .sxMGHead h2,.sxAOLibrary .sxCourseMediaHead h2{display:none}.sxAOExtras{margin:12px 0;border:1px solid #e3eae5;padding:14px;border-radius:12px}.sxAOExtras summary{font-size:12px;cursor:pointer;color:#537b61}.sxAORemindFallback{display:flex;justify-content:space-between;align-items:center;padding:15px;background:#e9f1fa;border-radius:14px}.sxAORemindFallback button{background:#fff;border:1px solid #d5e1eb;padding:8px 12px;border-radius:9px}@media(max-width:780px){.sxAOPlayQueue{grid-template-columns:1fr}.sxAOViewer iframe{min-height:300px;height:400px}.sxAOHead{flex-wrap:wrap}.sxAOBlock{padding:14px}.sxAOQueue{min-height:80px;max-height:320px}}.sxAOUnified{padding:17px 18px}.sxAOUnifiedMeta{display:flex;align-items:flex-end;flex-direction:column;gap:5px}.sxAOUnifiedMeta small{font-size:10px;color:#698775}.sxAOSlideControls{display:flex;flex-direction:column;align-items:flex-start;gap:9px;margin:0 0 13px}.sxAOSlideControls .sxAOPills{max-width:100%}.sxAOSourcePills button{border-radius:10px}.sxAOSourcePills button span{opacity:.65;margin-left:5px}.sxAOSlideControls input{width:min(100%,420px);font:inherit;font-size:12px;background:#fff;border:1px solid #d7e7dd;border-radius:10px;padding:10px;color:#214d36}.sxAOUnified .sxAOHead{margin-bottom:12px}.sxAOUnified .sxAOViewer iframe{min-height:365px}.sxAOUnified .sxAOQueue{max-height:555px}.sxAOMore{width:100%;padding:10px;border:1px solid #dce9e0;background:#eef7f0;border-radius:10px;color:#275e40;cursor:pointer;font:inherit;font-size:12px}.sxAOOtherOwn{margin:0;background:#fff;border:1px solid #e0eae4;padding:11px 15px;border-radius:13px}.sxAOOtherOwn summary{font-size:12px;color:#3b6a50;cursor:pointer}.sxAOOtherList{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:7px;margin-top:12px}.sxAOOtherItem{display:flex;flex-direction:column;gap:4px;border:1px solid #e1eae4;border-radius:10px;padding:9px;text-decoration:none;color:#2b6746;font-size:11px}.sxAOOtherItem small{color:#6f8c79}.sxAOUnified+.sxAOLibrary{margin-top:0}@media(max-width:780px){.sxAOUnified{padding:14px}.sxAOUnifiedMeta{align-items:flex-start}.sxAOSlideControls input{width:100%}.sxAOUnified .sxAOViewer iframe{min-height:300px}}</style>');
})(window,document);