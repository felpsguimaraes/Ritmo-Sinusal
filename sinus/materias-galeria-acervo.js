/* SINUS · Materiais visuais sincronizados à disciplina da grade — sem criar matérias. */
(function(W,D){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const period=x=>Number.isInteger(Number(x))&&Number(x)>=1&&Number(x)<=10?Number(x):null;
const mime=x=>String(x.mime||x.kind||'').toLowerCase();
const isImage=x=>/^image\//.test(mime(x))||/\.(jpg|jpeg|png|webp|heic|heif)$/i.test(x.title||'');
const isVideo=x=>/^video\//.test(mime(x))||/\.(mp4|mov|webm)$/i.test(x.title||'');
const isExam=x=>['provas','exam'].includes(x.cat)||x.category==='exam'||['prova','foto-prova','simulado','questionario','banco'].includes(x.auditType)||/prova|prueba|examen|parcial|simulado|cuestionario|questionario/i.test(x.title||'');
const aliases={'genetica humana':['genetica'],'semiologia medica i':['semiologia i'],'semiologia medica ii':['semiologia ii'],'anatomia patologica i':['anatopato i'],'anatomia patologica ii':['anatopato ii']};
function matching(a,b){return norm(a)===norm(b)||(aliases[norm(a)]||[]).includes(norm(b))}
function items(){
 if(typeof UI==='undefined'||typeof DB==='undefined'||!UI.subject||!DB.subjects?.[UI.subject]||!W.SinusLibrary)return [];
 const subject=UI.subject,p=period(DB.subjects[subject].period);
 if(!p)return [];
 const seen=new Set();
 return (W.SinusLibrary.catalog()||[]).filter(x=>{
  if(!x?.id||x.active===false||!matching(subject,x.subject))return false;
  if(period(x.academicPeriod)!==p&&!(x.uploaded&&!period(x.academicPeriod)))return false;
  if(seen.has(x.id))return false;
  seen.add(x.id);return true;
 });
}
function kind(x){return isVideo(x)?'VÍDEO':isImage(x)?'IMAGEM':/pdf/.test(mime(x))?'PDF':x.cat==='slides'?'SLIDE':'ARQUIVO'}
function card(x){
 const type=kind(x);
 // A primeira página do PDF e a capa do PowerPoint também precisam aparecer.
 // A miniatura vem do próprio arquivo no Drive, respeitando as permissões originais.
 const thumb=!x.uploaded&&/^[A-Za-z0-9_-]{20,}$/.test(x.id)?
  '<img class="sxMGPreview" src="https://drive.google.com/thumbnail?id='+encodeURIComponent(x.id)+'&sz=w640" loading="lazy" decoding="async" alt="Prévia do arquivo" onload="if(this.naturalWidth>0)this.parentElement.classList.add(\'sxMGHasPreview\');else this.remove()" onerror="this.remove()">':'';
 return '<button type="button" class="sxMGCard" data-sxmg-open="'+h(x.id)+'">'+
 '<span class="sxMGThumb">'+thumb+'<i>'+((type==='VÍDEO')?'▶':'▧')+'</i><small>'+type+'</small></span>'+
 '<span class="sxMGCaption"><b>'+h(x.title||'Material')+'</b><small>'+h(x.uploaded?'Biblioteca pessoal':x.studyMode==='practice'?'Prática':'Teoria')+'</small></span></button>';
}
function gallery(title,sub,list,tag){
 return '<section class="sxMG" data-sxmg><div class="sxMGHead"><div><small>'+h(tag)+'</small><h2>'+h(title)+'</h2><p>'+h(sub)+'</p></div><strong>'+list.length+' arquivos</strong></div>'+
 '<div class="sxMGGrid">'+list.slice(0,44).map(card).join('')+'</div>'+
 (list.length>44?'<button type="button" data-sxmg-library>Ver todos na Biblioteca</button>':'')+'</section>';
}
function render(){
 if(typeof UI==='undefined'||!UI.subject||!W.SinusLibrary||typeof DB==='undefined')return;
 const host=D.getElementById('subjectContent'),view=D.getElementById('subjectView');
 if(!host||!view||view.classList.contains('hidden')||host.querySelector('[data-sxmg]'))return;
 const all=items(),exams=all.filter(isExam),examPhotos=exams.filter(isImage);
 const photos=all.filter(x=>isImage(x)&&!isExam(x)),videos=all.filter(isVideo);
 const practical=all.filter(x=>x.studyMode==='practice'||x.cat==='pratica');
 const summaries=all.filter(x=>x.category==='summary'||x.studySection==='apostila'||/resumo|resumen|apostila|apunte|repaso|revisao|revision/i.test(x.title||''));
 const slides=all.filter(x=>x.cat==='slides'||x.studySection==='slides');
 const tab=UI.tab,subject=UI.subject;
 let html='',list=[],title='',desc='',label='';
 if(tab==='overview'){
  const popular=[...examPhotos.slice(0,4),...videos.slice(0,3),...photos.slice(0,3)];
  const featured=popular.length?popular:all.slice(0,8); // Períodos clínicos sem imagens ainda exibem PDFs e resumos existentes.
  html='<section class="sxMG" data-sxmg><div class="sxMGHead"><div><small>'+h(subject)+' · ACERVO</small><h2>Materiais mais procurados</h2><p>Fotos de provas, vídeos e imagens da Biblioteca desta matéria.</p></div><strong>'+all.length+' arquivos</strong></div>'+
  '<div class="sxMGStats">'+[['Fotos de provas',examPhotos.length,'provas'],['Vídeos',videos.length,'videos'],['Imagens',photos.length,'fotos'],['Resumos',summaries.length,'apostila'],['Slides',slides.length,'slides']].map(([name,n,tab])=>
  '<button type="button" data-sxmg-tab="'+tab+'"><b>'+n+'</b><small>'+name+'</small></button>').join('')+'</div>'+
  (featured.length?'<div class="sxMGGrid">'+featured.map(card).join('')+'</div>':'<p class="sxMGEmpty">Nenhum arquivo foi classificado com segurança para esta matéria ainda.</p>')+'</section>';
 }else if(tab==='provas'){
  list=[...examPhotos,...exams.filter(x=>!isImage(x))];title='Fotos de provas e avaliações';
  desc='Fotos primeiro, seguidas de PDFs, questionários e simulados identificados.';label='PROVAS · '+subject;
 }else if(['fotos','laminas','pratica','macro'].includes(tab)){
  list=tab==='fotos'?photos:[...photos.filter(x=>x.studyMode==='practice'),...practical.filter(x=>!isImage(x)&&!isExam(x))];
  title='Imagens e práticas';desc='Lâminas, fotografias e materiais visuais da disciplina.';label='PRÁTICA · '+subject;
 }else if(tab==='videos'){
  if(host.querySelector('[data-sx-course-media]'))return;
  list=videos;title='Vídeos da matéria';desc='Vídeos indexados na Biblioteca.';label='VIDEOAULAS';
 }else if(tab==='slides'){
  list=slides;title='Slides da Biblioteca';desc='Apresentações e materiais de aula.';label='SLIDES';
 }else if(tab==='apostila'){
  list=summaries;title='Resumos e apostilas';desc='Revisões desta disciplina.';label='ESTUDAR';
 }else if(['training','cartoes'].includes(tab)){
  list=examPhotos.slice(0,6);title='Provas de referência';desc='Imagens de avaliações para consultar durante o treino.';label='APOIO';
 }else return;
 if(!html&&list.length)html=gallery(title,desc,list,label);
 if(!html)return;
 const box=D.createElement('div');box.innerHTML=html;
 const el=box.firstElementChild;if(!el)return;host.prepend(el);
 if(['provas','videos'].includes(tab)){
  const native=host.querySelector(':scope > .resourceLayout');
  if(native){const details=D.createElement('details');details.className='sxMGOriginal';const summary=D.createElement('summary');summary.textContent='Visualizador original da matéria';details.append(summary,native);host.append(details)}
 }
}
function open(id){
 const item=items().find(x=>String(x.id)===String(id));if(!item)return;
 if(item.uploaded){W.SinusLibrary?.openUploaded?.(id);return}
 if(!/^[A-Za-z0-9_-]{20,}$/.test(id)){W.openDrive?.(id);return}
 D.querySelector('#sxMGModal')?.remove();
 const modal=D.createElement('div');modal.id='sxMGModal';modal.className='sxMGModal';
 modal.innerHTML='<section role="dialog" aria-modal="true" class="sxMGDialog" aria-label="'+h(item.title)+'"><header><strong>'+h(item.title)+'</strong><button type="button" data-sxmg-close aria-label="Fechar">✕</button></header>'+
 '<iframe title="'+h(item.title)+'" src="https://drive.google.com/file/d/'+encodeURIComponent(id)+'/preview" allowfullscreen></iframe>'+
 '<footer><span>Prévia do arquivo · permissões originais preservadas</span><button type="button" data-sxmg-original="'+h(id)+'">Abrir original</button></footer></section>';
 const close=()=>{modal.remove();D.removeEventListener('keydown',escKey)};
 const escKey=e=>{if(e.key==='Escape')close()};
 D.addEventListener('keydown',escKey);modal.addEventListener('click',e=>{
  if(e.target===modal||e.target.closest('[data-sxmg-close]'))close();
  const button=e.target.closest('[data-sxmg-original]');if(button)W.openDrive?.(button.dataset.sxmgOriginal);
 });
 D.body.append(modal);modal.querySelector('[data-sxmg-close]')?.focus();
}
D.addEventListener('click',e=>{
 const b=e.target.closest('[data-sxmg-open],[data-sxmg-tab],[data-sxmg-library]');
 if(!b)return;
 if(b.hasAttribute('data-sxmg-open'))return open(b.dataset.sxmgOpen);
 if(b.hasAttribute('data-sxmg-library'))return W.SinusLibrary?.openCollection?.({subject:UI.subject,period:DB.subjects[UI.subject].period,view:'documents'});
 const tab=b.dataset.sxmgTab;
 if(typeof V11_SUBJECT_TABS!=='undefined'&&V11_SUBJECT_TABS[UI.mode]?.some(([t])=>t===tab))return W.setTab?.(tab);
 W.SinusLibrary?.openCollection?.({subject:UI.subject,period:DB.subjects[UI.subject].period,view:'documents'});
});
const old=W.renderSubject;
if(typeof old==='function')W.renderSubject=function(){const v=old.apply(this,arguments);render();return v};
const refresh=()=>{if(!W.SinusApp?.S?.dentro)return;D.querySelector('[data-sxmg]')?.remove();render()};
['sinus:drive-ready','sinus:medicina-ready','sinus:library-uploads-ready'].forEach(e=>W.addEventListener(e,refresh));
W.SinusMedicina?.ready?.then(refresh);W.SinusAcervoAuditado?.ready?.then(refresh);
const css=D.createElement('style');css.textContent=
'.sxMG{border:1px solid #d5e6da;background:#f8fcf9;border-radius:18px;padding:17px;margin:0 0 16px;color:#1d4f35}.sxMGHead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap}.sxMGHead small{font-size:10px;letter-spacing:.09em;color:#42765a;font-weight:800}.sxMGHead h2{font-size:19px;margin:5px 0;color:#20533a}.sxMGHead p{font-size:12px;color:#617766;margin:0}.sxMGHead strong{font-size:11px;background:#e4f2e9;padding:7px 10px;border-radius:18px;white-space:nowrap}.sxMGGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-top:15px}.sxMGCard{border:1px solid #dfe9e2;border-radius:12px;background:white;overflow:hidden;text-align:left;padding:0;cursor:pointer;font:inherit;min-width:0}.sxMGCard:hover{border-color:#62a981}.sxMGThumb{display:grid;place-items:center;aspect-ratio:16/10;background:#e4eee6;position:relative}.sxMGThumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#fff}.sxMGThumb i{font-style:normal;font-size:25px;color:#397657}.sxMGThumb.sxMGHasPreview i{display:none}.sxMGThumb small{position:absolute;z-index:2;right:5px;bottom:5px;background:#20583ee0;color:white;padding:4px 6px;border-radius:4px;font-size:9px}.sxMGCaption{display:block;padding:9px}.sxMGCaption b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:30px;overflow-wrap:anywhere;font-size:11px;line-height:1.4}.sxMGCaption small{display:block;color:#73907b;font-size:10px;margin-top:7px}.sxMGStats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:14px}.sxMGStats button{border:1px solid #d5e6dc;background:white;border-radius:12px;cursor:pointer;padding:12px 7px;color:#1e6b48}.sxMGStats b{display:block;font-size:22px}.sxMGStats small{font-size:10px}.sxMGEmpty{font-size:12px;color:#637867}.sxMGOriginal{border:1px solid #dae9dd;border-radius:10px;padding:10px;margin-bottom:14px}.sxMGOriginal summary{cursor:pointer;font-size:12px;font-weight:700}.sxMGModal{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:#062017c7;padding:12px}.sxMGDialog{background:white;border-radius:13px;overflow:hidden;width:min(950px,95vw)}.sxMGDialog header,.sxMGDialog footer{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px;color:#23553c}.sxMGDialog header strong{font-size:13px}.sxMGDialog button{border:0;background:#e7f4eb;color:#286448;border-radius:8px;padding:8px;cursor:pointer}.sxMGDialog iframe{height:min(72vh,650px);width:100%;border:0}.sxMGDialog footer{font-size:11px}@media(max-width:650px){.sxMG{padding:11px}.sxMGGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.sxMGStats{grid-template-columns:repeat(3,minmax(0,1fr))}}';
D.head.append(css);
W.SinusGaleriaMateria={render,items,isExam,isImage,isVideo};
})(window,document);
