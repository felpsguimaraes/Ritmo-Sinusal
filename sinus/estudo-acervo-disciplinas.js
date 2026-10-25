/* SINUS · Acervo por disciplina para todas as turmas (períodos 1–10).
 * Compartilha links originais; não altera permissões, não copia mídias e não inventa cátedra.
 */
(function (W, D) {
'use strict';
const YT_PATH='/sinus/youtube-catalogo.json';
const PL_PATH='/sinus/youtube-playlists.json';
const CAT_PATH='/sinus/anatomia-pratica-videos.json';
const SECCTIONS=['slides','provas','audios','videos','pratica','complementares'];
const HISTO_DRIVE=[
 ['16Y5_Cow8E9pdB1UML7s8ozFsto5NTPkV','Osteogénesis'],
 ['15AncwxVuNhEAqffTz4lc1GzZZ8cmC_ne','Tejido nervioso'],
 ['1oCMHhYpkENgx8EqfgLy6Qy4X3ZkZLqoW','Tejido muscular'],
 ['14e4y5nORXZEOVy80UrGQ9GM_uOcJvpqd','Tejido sanguíneo'],
 ['1sly5DBC0p0UC057KNQsO-xDf9CTCeft1','Tejido cartilaginoso'],
 ['18i1kzrrspdKTbkzB1RthgFFExxBFrvkc','Tejido óseo'],
 ['1u6CJOfnnhAbJjpZONq7yJLabTnC3JEKM','Hematopoyesis — Dra. Solanche Molinas']
];
const S={youtube:null,playlists:null,anatomy:null,promise:null,loading:false,error:'',filter:'all',limit:18,subject:'',mode:''};
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validDrive=x=>/^[a-zA-Z0-9_-]{20,100}$/.test(String(x||''));
const validYT=x=>/^[a-zA-Z0-9_-]{11}$/.test(String(x||''));
function baseSubject(s){
 const n=norm(s).replace(/[.]/g,'');
 if (/^anatomia\s+patologica/.test(n))return 'anatopato';
 if (/^anatomia\s+(?:ii|i|2|1)\b/.test(n))return 'anatomia';
 if (/^histologia\s+(?:ii|i|2|1)\b/.test(n))return 'histologia';
 if (/^microbiologia\s+(?:ii|i|2|1)\b/.test(n))return 'microbiologia';
 if (/^fisiologia\s+(?:ii|i|2|1)\b/.test(n))return 'fisiologia';
 if (/^bioquimica\s+(?:ii|i|2|1)\b/.test(n))return 'bioquimica';
 if (/^farmacologia\s+(?:ii|i|2|1)\b/.test(n))return 'farmacologia';
 if (/^semiologia/.test(n))return 'semiologia';
 if (/^fisiopatologia/.test(n))return 'fisiopatologia';
 if (/^inmunologia|^imunologia/.test(n))return 'inmunologia';
 if (/^epidemiologia|^salud publica/.test(n))return 'epidemiologia';
 if (/^nutricion/.test(n))return 'nutricion';
 if (/^biofisica/.test(n))return 'biofisica';
 if (/^genetica/.test(n))return 'genetica';
 if (/^neurologia/.test(n))return 'neurologia';
 if (/^parasitologia/.test(n))return 'parasitologia';
 return '';
}
function ytGroup(title){
 const n=norm(title);
 // Apenas expressões inequívocas; termos genéricos ou só o nome de um professor ficam fora.
 if (/anatomia\s+patologica|anatopato/.test(n))return 'anatopato';
 if (/\bmicrobiolog|\bmicrobiology|\bmicro\s+pratica|\bmicro\s+teorica|\bmicologia|\bmicosis/.test(n))return 'microbiologia';
 if (/\bhistolog/.test(n))return 'histologia';
 if (/\banatomia\s+(?:humana|i\b|ii\b)|\bmusculos?\s+de\s+la\s+(?:cabeza|cara)|\bhuesos?\s+del\s+craneo|\bviscerocraneo/.test(n))return 'anatomia';
 if (/\bfisiopatolog/.test(n))return 'fisiopatologia';
 if (/\bfarmacolog|\bfarmaco\b/.test(n))return 'farmacologia';
 if (/\bsemiolog/.test(n))return 'semiologia';
 if (/\binmunolog|\binmunidad|\bhistocompatibilidad/.test(n))return 'inmunologia';
 if (/\bepidemiolog|\bepidemiol|\bsalud\s+publica|\batencion\s+primaria|\bprimary health care|\bdeterminantes de la salud/.test(n))return 'epidemiologia';
 if (/\bbioquimic|\bciclo de krebs|\bglucogenolisis|\bglucogenesis|\bmetabolismo|\bfosforilacion/.test(n))return 'bioquimica';
 if (/\bfisiolog|\bphysiology/.test(n))return 'fisiologia';
 if (/\bnutricion|\bnutrition/.test(n))return 'nutricion';
 if (/\bbiofisic/.test(n))return 'biofisica';
 if (/\bgenetica|\bgenetic/.test(n))return 'genetica';
 if (/\bneurologia/.test(n))return 'neurologia';
 if (/\bparasitolog|\bprotozoarios/.test(n))return 'parasitologia';
 return '';
}
function videoMode(title){const n=norm(title);return /pr[aá]ctica|pratica|laboratorio|lab\b|microscop|macroscop|simulado de huesos/.test(n)?'practice':'shared'}
function ensureHisto(){
 if(typeof DB==='undefined'||!DB?.subjects)return 0;
 let added=0;
 for(const [name,subject] of Object.entries(DB.subjects)){
  if(!/^histologia i$/.test(norm(name))||Number(subject.period||1)!==1)continue;
  subject.videos=Array.isArray(subject.videos)?subject.videos:[];
  const present=new Set(SECCTIONS.flatMap(c=>(subject[c]||[]).map(x=>String(x.id||''))));
  for(const [id,title] of HISTO_DRIVE){
   if(!validDrive(id)||present.has(id))continue;
   subject.videos.push({id,title,kind:'Vídeo',mime:'video/mp4',active:true,
    uid:'sx_histo_drive_'+id,source:'histologia-drive-curadoria',period:'Histologia I · Drive',
    academicPeriod:1,studyMode:'practice',studySection:'videos',requiresGooglePermission:true});
   present.add(id);added++;
  }
 }
 return added;
}
function originalIds(base){
 if(base!=='anatomia'||!S.anatomy?.subjects)return new Set();
 return new Set(Object.values(S.anatomy.subjects).flat().map(x=>x.id));
}
function mediaFromDb(subject,mode){
 const db=typeof DB!=='undefined'&&DB?.subjects?.[subject];
 if(!db)return {videos:[],visual:[]};
 const videos=[],visual=[],ids=new Set();
 for(const cat of SECCTIONS){
  for(const item of (db[cat]||[])){
   if(item.active===false||!validDrive(item.id)||ids.has(item.id))continue;
   const m=String(item.mime||'').toLowerCase();
   const title=String(item.title||'');
   const area=item.studyMode||(cat==='pratica'?'practice':'theory');
   if(mode==='practice'&&area!=='practice')continue;
   if(mode==='theory'&&area==='practice')continue;
   ids.add(item.id);
   if(m.startsWith('video/')||cat==='videos'&&/v[ií]deo/i.test(item.kind||'')){
    videos.push({id:item.id,title,origin:'drive',type:'video',label:'Vídeo no Drive',item});
   }else if(mode==='practice'&&cat!=='provas'&&(
      m.startsWith('image/')||cat==='pratica'||item.studySection==='laminas')){
    visual.push({id:item.id,title,origin:'drive',type:m.startsWith('image/')?'image':'document',
     label:m.startsWith('image/')?'Imagem da prática':'Material visual da prática',item});
   }
  }
 }
 return {videos,visual};
}
function toCards(){
 if(typeof UI==='undefined'||!UI.subject)return null;
 const subject=UI.subject,mode=UI.mode,base=baseSubject(subject);
 if(!base||!['practice','theory'].includes(mode)||UI.tab!=='videos')return null;
 if(!D.getElementById('subjectContent'))return null;
 const db=mediaFromDb(subject,mode),ignore=originalIds(base),seen=new Set(db.videos.map(x=>x.id));
 const anatomyVersion=/^anatomia\s+(?:i|1)$/.test(norm(subject))?'1':'2';
 // Os simulados práticos são complementares, não aulas da Cátedra.
 const anatomyPractice=(base==='anatomia'&&mode==='practice'?(S.anatomy?.subjects?.[anatomyVersion]||[]):[])
  .filter(x=>x.type==='pratica'&&validYT(x.id))
  .map(x=>({id:x.id,title:x.title,origin:'youtube',type:'video',label:'Revisão e demonstração prática'}));
 const youtube=(S.youtube||[]).filter(x=>validYT(x.id)&&ytGroup(x.title)===base&&!ignore.has(x.id))
   .filter(x=>mode==='theory'||['practice','shared'].includes(videoMode(x.title)))
   .map(x=>({id:x.id,title:x.title,origin:'youtube',type:'video',label:'Aula do canal · conteúdo geral da disciplina'}))
   .filter(x=>{if(seen.has('yt_'+x.id))return false;seen.add('yt_'+x.id);return true});
 const pl=(mode==='practice'&&base!=='anatomia'?S.playlists||[]:[]).filter(p=>/^(?:PL|OLAK|UU|FL|LL)[a-zA-Z0-9_-]{10,}$/.test(p.id||''))
   .filter(p=>{
     const t=norm(p.title);
     const keys={anatomia:['anato','anatomia'],histologia:['histo','histologia'],microbiologia:['microbiologia'],
      fisiologia:['fisiologia','neuro'],bioquimica:['bioquimica'],inmunologia:['inmunologia'],
      epidemiologia:['epidemiologia'],nutricion:['nutricion']};
     return (keys[base]||[]).includes(t);
   }).map(p=>({id:p.id,title:p.title,origin:'playlist',type:'playlist',label:'Playlist da disciplina · aulas gerais'}));
 // No ambiente prático, dar destaque a recursos de prática. As aulas gerais permanecem rotuladas.
 return {subject,mode,base,videos:[...db.videos,...anatomyPractice,...youtube],visual:db.visual,playlists:pl};
}
function card(x){
 const media=x.origin==='youtube';
 const pic=media?'<img alt="" loading="lazy" src="https://i.ytimg.com/vi/'+encodeURIComponent(x.id)+'/mqdefault.jpg">':
 '<span class="sxCourseMediaGlyph">'+(x.type==='image'?'▧':x.type==='playlist'?'☰':x.type==='document'?'▤':'▶')+'</span>';
 const action=media?' data-sx-video="'+esc(x.id)+'"':
 x.origin==='playlist'?' data-sx-playlist="'+esc(x.id)+'"':
 ' data-sx-drive="'+esc(x.id)+'"';
 return '<button type="button" class="sxCourseMediaCard"'+action+' aria-label="Abrir '+esc(x.title)+'">'+
 '<span class="sxCourseMediaThumb">'+pic+'<span class="sxCourseMediaType">'+esc(x.type==='image'?'IMAGEM':x.type==='document'?'MATERIAL VISUAL':x.type==='playlist'?'PLAYLIST':'VÍDEO')+'</span></span>'+
 '<span class="sxCourseMediaCaption"><b>'+esc(x.title)+'</b><small>'+esc(x.label)+'</small></span></button>';
}
function render(){
 const data=toCards(),host=D.getElementById('subjectContent');
 if(!data||!host||host.querySelector('[data-sx-course-media]'))return;
 // Se a biblioteca dinâmica apareceu antes do catálogo do YouTube terminar de carregar,
 // substituí-la pela videoteca unificada para não mostrar duas galerias iguais.
 host.querySelector('[data-sxmg]')?.remove();
 const all=[...data.playlists,...data.videos,...data.visual];
 // O painel de Anatomia já exibe 35 vídeos da cátedra, e este complemento evita repeti-los.
 if(!all.length)return;
 S.subject=data.subject;S.mode=data.mode;S.filter='all';S.limit=18;
 const wrap=D.createElement('section');
 wrap.className='sxCourseMedia';wrap.setAttribute('data-sx-course-media','');
 const practice=data.mode==='practice';
 wrap.innerHTML='<div class="sxCourseMediaHead"><div><small>'+esc(data.subject.toUpperCase())+' · '+(practice?'PRÁTICA':'TEORIA')+'</small>'+
 '<h2>Videoaulas e materiais visuais</h2><p>Acervo por disciplina, compartilhado com todas as turmas que cursam esta matéria. Alguns arquivos do Drive exigem acesso autorizado.</p></div>'+
 '<strong>'+all.length+' recursos</strong></div>'+
 '<div class="sxCourseMediaFilters" role="group" aria-label="Tipo de recurso">'+
 '<button type="button" data-sx-filter="all" class="is-active">Todos</button>'+
 '<button type="button" data-sx-filter="video">Vídeos</button>'+
 '<button type="button" data-sx-filter="visual">Imagens e lâminas</button>'+
 '<button type="button" data-sx-filter="playlist">Playlists</button>'+
 '</div><div class="sxCourseMediaGrid"></div><div class="sxCourseMediaActions"></div>';
 function draw(){
  const filtered=all.filter(x=>S.filter==='all'||S.filter==='video'&&x.type==='video'||S.filter==='visual'&&['image','document'].includes(x.type)||S.filter==='playlist'&&x.type==='playlist');
  const list=filtered.slice(0,S.limit);
  wrap.querySelector('.sxCourseMediaGrid').innerHTML=list.map(card).join('')||'<p class="sxCourseMediaEmpty">Nenhum recurso desta categoria por enquanto.</p>';
  wrap.querySelector('.sxCourseMediaActions').innerHTML=filtered.length>S.limit?'<button type="button" data-sx-more>Mostrar mais '+(filtered.length-S.limit)+' recursos</button>':'';
 }
 wrap.addEventListener('click',e=>{
  const f=e.target.closest('[data-sx-filter]');if(f){S.filter=f.dataset.sxFilter;S.limit=18;wrap.querySelectorAll('[data-sx-filter]').forEach(b=>b.classList.toggle('is-active',b===f));draw();return}
  if(e.target.closest('[data-sx-more]')){S.limit+=24;draw();return}
  const v=e.target.closest('[data-sx-video]');if(v){openMedia('youtube',v.dataset.sxVideo,all);return}
  const p=e.target.closest('[data-sx-playlist]');if(p){openMedia('playlist',p.dataset.sxPlaylist,all);return}
  const d=e.target.closest('[data-sx-drive]');if(d)openMedia('drive',d.dataset.sxDrive,all);
 });
 draw();host.prepend(wrap);
 // Preserva o reprodutor e a fila original, mas evita uma segunda área gigante aberta.
 const native=host.querySelector(':scope > .resourceLayout');
 if(native){
  const details=D.createElement('details');details.className='sxCourseNative';
  const summary=D.createElement('summary');summary.textContent='Outros vídeos e arquivos originais desta matéria';
  details.appendChild(summary);details.appendChild(native);host.appendChild(details);
 }
}
function openMedia(origin,id,items){
 const item=(items||[]).find(x=>x.id===id&&x.origin===origin);
 if(!item)return;
 if(origin==='youtube'&&!validYT(id)||origin==='drive'&&!validDrive(id))return;
 if(origin==='playlist'&&!/^(?:PL|OLAK|UU|FL|LL)[A-Za-z0-9_-]{10,}$/.test(id))return;
 const url=origin==='youtube'?'https://www.youtube.com/watch?v='+encodeURIComponent(id):
   origin==='playlist'?'https://www.youtube.com/playlist?list='+encodeURIComponent(id):
   'https://drive.google.com/file/d/'+encodeURIComponent(id)+'/view';
 const embed=origin==='youtube'?'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id):
   origin==='playlist'?'https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(id):
   'https://drive.google.com/file/d/'+encodeURIComponent(id)+'/preview';
 D.querySelector('.sxCourseModal')?.remove();
 const modal=D.createElement('div');modal.className='sxCourseModal';
 modal.innerHTML='<div class="sxCourseDialog" role="dialog" aria-modal="true" aria-label="'+esc(item.title)+'">'+
 '<div class="sxCourseDialogHead"><b>'+esc(item.title)+'</b><button type="button" data-sx-close aria-label="Fechar">✕</button></div>'+
 '<div class="sxCourseFrame"><iframe loading="eager" title="'+esc(item.title)+'" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen src="'+esc(embed)+'"></iframe></div>'+
 '<div class="sxCourseDialogFoot"><span>'+esc(item.label)+(origin==='drive'?' · Permissão do Drive pode ser necessária':'')+'</span>'+
 '<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Abrir original ↗</a></div></div>';
 const close=()=>{modal.remove();D.removeEventListener('keydown',key)};
 const key=e=>{if(e.key==='Escape')close()};
 D.addEventListener('keydown',key);
 modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-sx-close]'))close()});
 D.body.appendChild(modal);
 modal.querySelector('[data-sx-close]')?.focus();
}
function load(){
 if(S.promise)return S.promise;
 S.loading=true;
 S.promise=Promise.allSettled([
 fetch(YT_PATH).then(r=>{if(!r.ok)throw Error('YouTube '+r.status);return r.json()}),
 fetch(PL_PATH).then(r=>{if(!r.ok)throw Error('Playlists '+r.status);return r.json()}),
 fetch(CAT_PATH).then(r=>{if(!r.ok)throw Error('Anatomia '+r.status);return r.json()})
 ]).then(results=>{
  if(results[0].status==='fulfilled')S.youtube=Array.isArray(results[0].value.videos)?results[0].value.videos:[];
  if(results[1].status==='fulfilled')S.playlists=Array.isArray(results[1].value.playlists)?results[1].value.playlists:[];
  if(results[2].status==='fulfilled')S.anatomy=results[2].value;
  S.error=results.filter(x=>x.status==='rejected').map(x=>String(x.reason)).join('; ');
  ensureHisto();render();
 }).finally(()=>{S.loading=false;S.promise=null});
 return S.promise;
}
const style=D.createElement('style');style.textContent=
'.sxCourseMedia{margin:14px 0 22px;border:1px solid #d4e5dc;border-radius:19px;padding:19px;background:#fcfffd;box-shadow:0 3px 20px #1f5b3908;color:#214735}'+
'.sxCourseMediaHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.sxCourseMediaHead small{font-size:10px;font-weight:800;letter-spacing:.11em;color:#598071}.sxCourseMediaHead h2{font-size:19px;line-height:1.25;margin:6px 0;color:#173e30}.sxCourseMediaHead p{font-size:12px;color:#668073;line-height:1.55;margin:0;max-width:580px}.sxCourseMediaHead strong{padding:7px 11px;background:#e7f2eb;color:#336e50;border-radius:30px;white-space:nowrap;font-size:11px}'+
'.sxCourseMediaFilters{display:flex;flex-wrap:wrap;gap:7px;margin:16px 0}.sxCourseMediaFilters button{font-family:inherit;background:white;border:1px solid #d7e8dc;color:#4a735d;border-radius:10px;padding:7px 10px;cursor:pointer;font-size:11px;font-weight:650}.sxCourseMediaFilters button.is-active{background:#246d50;color:white;border-color:#246d50}'+
'.sxCourseMediaGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}.sxCourseMediaCard{border:1px solid #dfebe2;overflow:hidden;border-radius:13px;background:#fff;color:#234638;text-align:left;padding:0;cursor:pointer;font-family:inherit}.sxCourseMediaCard:hover{border-color:#83baa0;box-shadow:0 3px 14px #31785216}.sxCourseMediaThumb{display:block;aspect-ratio:16/9;position:relative;background:linear-gradient(145deg,#ddede3,#c8dfd1)}.sxCourseMediaThumb img{display:block;object-fit:cover;width:100%;height:100%}.sxCourseMediaGlyph{display:grid;place-content:center;height:100%;font-size:28px;color:#276f50}.sxCourseMediaType{position:absolute;right:7px;bottom:7px;background:#133c2de8;color:white;font-size:9px;padding:3px 6px;border-radius:5px}.sxCourseMediaCaption{display:block;padding:10px}.sxCourseMediaCaption b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:35px;font-size:12px;line-height:1.45}.sxCourseMediaCaption small{display:block;margin-top:7px;color:#658174;font-size:10px;line-height:1.4}.sxCourseMediaActions{margin-top:12px}.sxCourseMediaActions button{background:#edf5ef;border:1px solid #d4e6d9;border-radius:9px;padding:8px 12px;color:#296446;cursor:pointer}.sxCourseMediaEmpty{font-size:12px;color:#617c69}.sxCourseNative{border:1px solid #dae6de;border-radius:12px;background:#fff;padding:12px 15px;margin:16px 0}.sxCourseNative summary{cursor:pointer;font-weight:650;font-size:12px;color:#38684f}'+
'.sxCourseModal{position:fixed;inset:0;z-index:99999;background:#071e19c9;display:grid;place-content:center;padding:16px}.sxCourseDialog{width:min(940px,95vw);background:white;border-radius:15px;overflow:hidden}.sxCourseDialogHead,.sxCourseDialogFoot{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 15px}.sxCourseDialogHead b{font-size:13px;color:#244b36}.sxCourseDialogHead button{cursor:pointer;border:0;background:#eef4ef;border-radius:8px;padding:7px 11px}.sxCourseFrame{aspect-ratio:16/9;background:#111}.sxCourseFrame iframe{width:100%;height:100%;border:0}.sxCourseDialogFoot{font-size:11px;color:#55715b}.sxCourseDialogFoot a{color:#1f734e;font-weight:750}'+
'@media(max-width:580px){.sxCourseMedia{padding:13px;border-radius:14px}.sxCourseMediaGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.sxCourseMediaHead{flex-wrap:wrap}.sxCourseMediaHead h2{font-size:17px}}';
D.head.appendChild(style);
const prior=W.renderSubject;
if(typeof prior==='function')W.renderSubject=function(){const result=prior.apply(this,arguments);ensureHisto();if(S.youtube)render();else load();return result};
W.addEventListener('sinus:drive-ready',()=>{ensureHisto();render()});
W.SinusMedicina?.ready?.then(()=>{ensureHisto();render()});
W.SinusEstudoAcervo={load,render,ensureHisto,ytGroup,baseSubject,get status(){return {youtube:S.youtube?.length||0,playlists:S.playlists?.length||0,errors:S.error}}};
ensureHisto();load();
})(window,document);
