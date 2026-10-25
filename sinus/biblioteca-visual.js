/* SINUS · biblioteca visual. Mantém o catálogo, visualizador e uploads existentes. */
(function(W,D){
'use strict';
const H=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const state={q:'',subject:'',view:'all',type:'all',purpose:'all',period:'all',audit:'all',limit:24};
const uploads={items:[],user:null,loading:false,ready:false};
const backend=()=>W.SinusBackend?.client;
const uploadBucket='sinus-library';
function uploadedItems(){return uploads.items.map(x=>({...x,id:'uploaded:'+x.id,title:x.title||x.file_name,name:x.file_name,subject:x.subject||'Geral',academicPeriod:x.academic_period,cat:x.category==='exam'?'provas':x.category==='slides'?'slides':'complementares',kind:x.mime_type||x.file_name,mime:x.mime_type,local:true,uploaded:true,storagePath:x.storage_path,category:x.category}));}
async function loadUploads(){
 if(uploads.loading||!backend()||W.SINUS_DEMO)return;
 uploads.loading=true;
 try {
  const {data:session,error:authErr}=await backend().auth.getUser();
  if(authErr)throw authErr;
  const uid=session?.user?.id;
  if(!uid){uploads.items=[];uploads.user=null;uploads.ready=false;W.dispatchEvent(new CustomEvent('sinus:library-uploads-ready',{detail:{count:0}}));return;}
  const {data,error}=await backend().from('sinus_library_files').select('id,file_name,title,subject,academic_period,category,mime_type,file_size,storage_path,created_at').eq('user_id',uid).order('created_at',{ascending:false}).limit(500);
  if(error)throw error;
  uploads.items=data||[];uploads.user=uid;uploads.ready=true;
  W.dispatchEvent(new CustomEvent('sinus:library-uploads-ready',{detail:{count:uploads.items.length}}));
  if(UI.page==='library')render();
 } catch(err){console.error('SINUS biblioteca',err);W.toast?.('Não foi possível carregar seus arquivos: '+(err.message||'erro desconhecido'));}
 finally{uploads.loading=false;}
}
async function openUploaded(id){
 const item=uploads.items.find(x=>'uploaded:'+x.id===id);if(!item)return;
 const popup=W.open('about:blank','_blank');try{
  const {data,error}=await backend().storage.from(uploadBucket).createSignedUrl(item.storage_path,120);
  if(error)throw error;
  if(popup)popup.location.href=data.signedUrl;else W.location.assign(data.signedUrl);
 }catch(err){popup?.close();W.toast?.('Não foi possível abrir o arquivo: '+err.message);}
}
function closeUploader(){D.getElementById('sxUploader')?.remove();}
function openUploader(){
 closeUploader();
 const subjects=Object.keys(DB.subjects||{}).sort((a,b)=>a.localeCompare(b,'pt'));
 const wrap=D.createElement('div');wrap.id='sxUploader';wrap.className='sxUploaderOverlay';
 wrap.innerHTML='<form class="sxUploaderBox" id="sxUploadForm"><div class="sxUploadTitle"><div><small>BIBLIOTECA SINUS</small><h2>Adicionar arquivo</h2></div><button type="button" data-close-upload aria-label="Fechar">✕</button></div><p>Envie documentos para sua biblioteca privada. Eles permanecem disponíveis quando você retornar.</p><div class="sxFilePicker"><span class="sxFileLabel">Arquivo</span><div class="sxFilePickRow"><input id="sxPickLibraryFile" name="upload_file" type="file" aria-label="Escolher arquivo no computador" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.odt,.ods,.odp,.jpg,.jpeg,.png,.webp,.mp3,.mp4"><span data-file-name>Nenhum arquivo selecionado</span></div><div class="sxFileDrop" data-file-drop role="button" tabindex="0">Ou arraste um arquivo do Finder até aqui</div></div><label>Título<input name="title" maxlength="180" placeholder="Nome do material" required /></label><div class="sxUploadCols"><label>Matéria<select name="subject"><option value="Geral">Geral / Sem matéria</option>'+subjects.map(n=>'<option value="'+H(n)+'">'+H(n)+'</option>').join('')+'</select></label><label>Período<select name="period"><option value="">Todos</option>'+Array.from({length:10},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'º</option>').join('')+'</select></label></div><label>Tipo de material<select name="category"><option value="summary">Resumo / Apostila</option><option value="exam">Prova</option><option value="work">Trabalho</option><option value="slides">Slides</option><option value="book">Livro</option><option value="other">Outro</option></select></label><p role="status" data-upload-status aria-live="polite"></p><div class="sxUploadActions"><button type="button" class="btn" data-close-upload>Cancelar</button><button type="submit" class="btn primary" data-upload-submit>Enviar arquivo</button></div></form>';
 D.body.appendChild(wrap);
 wrap.querySelectorAll('[data-close-upload]').forEach(b=>b.addEventListener('click',closeUploader));
 wrap.addEventListener('click',e=>{if(e.target===wrap)closeUploader();});
 const form=wrap.querySelector('form');
 // Um único seletor nativo, visível e independente: evita disparos duplicados
 // por <label>, botões programáticos e File System Access API.
 const fileInput=wrap.querySelector('#sxPickLibraryFile');
 const fileName=wrap.querySelector('[data-file-name]');
 const drop=wrap.querySelector('[data-file-drop]');
 const status=wrap.querySelector('[data-upload-status]');
 let selectedFile=null;
 function setSelectedFile(file){
  selectedFile=file||null;
  fileName.textContent=selectedFile?selectedFile.name:'Nenhum arquivo selecionado';
  fileName.title=selectedFile?.name||'';
  status.textContent=selectedFile?'Arquivo pronto para enviar.':'';
  if(selectedFile&&!form.elements.title.value.trim())form.elements.title.value=selectedFile.name.replace(/\.[^.]+$/,'');
 }
 fileInput.addEventListener('change',()=>setSelectedFile(fileInput.files?.[0]));
 fileInput.addEventListener('click',()=>{if(!selectedFile)status.textContent='Aguarde a janela de arquivos do Chrome. Se ela não aparecer, pressione Esc para encerrar uma seleção anterior ou arraste o arquivo do Finder.';});
 ['dragenter','dragover'].forEach(eventName=>drop.addEventListener(eventName,e=>{e.preventDefault();drop.classList.add('isDragging')}));
 ['dragleave','drop'].forEach(eventName=>drop.addEventListener(eventName,e=>{e.preventDefault();drop.classList.remove('isDragging')}));
 drop.addEventListener('drop',e=>setSelectedFile(e.dataTransfer?.files?.[0]));
 // A área de arrastar não simula cliques no seletor; o input visível acima é nativo.
 drop.setAttribute('aria-label','Arraste um arquivo do computador e solte nesta área');
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const file=selectedFile,submit=wrap.querySelector('[data-upload-submit]');
  if(!file){status.textContent='Selecione um arquivo ou arraste-o do Finder até a área indicada.';return;}
  if(file.size>50*1024*1024){status.textContent='O limite é de 50 MB por arquivo.';return;}
  if(!file.size){status.textContent='O arquivo está vazio.';return;}
  const extensions=['pdf','doc','docx','ppt','pptx','xls','xlsx','txt','odt','ods','odp','jpg','jpeg','png','webp','mp3','mp4'];
  const ext=file.name.split('.').pop().toLowerCase();
  if(!extensions.includes(ext)){status.textContent='Este formato de arquivo não é permitido.';return;}
  submit.disabled=true;status.textContent='Enviando arquivo com segurança...';
  let stored=null;
  try {
   const client=backend();if(!client)throw Error('Conexão indisponível. Entre novamente no SINUS.');
   const {data:userResult,error:authError}=await client.auth.getUser();
   if(authError)throw authError;
   const uid=userResult?.user?.id;if(!uid)throw Error('Sua sessão expirou. Faça login novamente.');
   const fileId=crypto.randomUUID();stored=uid+'/'+fileId+'.'+ext;
   const {error:uploadError}=await client.storage.from(uploadBucket).upload(stored,file,{upsert:false,contentType:file.type||'application/octet-stream'});
   if(uploadError)throw uploadError;
   status.textContent='Salvando no catálogo...';
   const row={user_id:uid,storage_path:stored,file_name:file.name,title:form.elements.title.value.trim(),subject:form.elements.subject.value,academic_period:form.elements.period.value?Number(form.elements.period.value):null,category:form.elements.category.value,mime_type:file.type||null,file_size:file.size};
   const {error:saveError}=await client.from('sinus_library_files').insert(row);
   if(saveError)throw saveError;
   closeUploader();state.view='mine';state.subject='';state.period='all';state.purpose='all';state.type='all';state.q='';
   await loadUploads();W.toast?.('Arquivo salvo na sua biblioteca.');
  } catch(err){if(stored)await backend()?.storage.from(uploadBucket).remove([stored]).catch(()=>{});status.textContent='Falha no envio: '+(err.message||'tente novamente');console.error('SINUS upload',err);}
  finally{submit.disabled=false;}
 });
}
async function deleteUploaded(id){
 const item=uploads.items.find(x=>'uploaded:'+x.id===id);if(!item||!W.confirm('Excluir '+item.title+' da sua biblioteca?'))return;
 const client=backend();const {error:storageError}=await client.storage.from(uploadBucket).remove([item.storage_path]);
 if(storageError){W.toast?.('Não foi possível excluir: '+storageError.message);return;}
 const {error}=await client.from('sinus_library_files').delete().eq('id',item.id);
 if(error){W.toast?.('Arquivo apagado, mas cadastro não foi removido: '+error.message);return;}
 await loadUploads();W.toast?.('Arquivo excluído.');
}
const key=()=> 'sinus_library_'+(W.SinusApp?.S?.uid||'demo');
function read(){try{return JSON.parse(SAFE_STORE.getItem(key())||'{}')}catch{return {}}}
function write(data){try{SAFE_STORE.setItem(key(),JSON.stringify(data))}catch{W.toast('Não foi possível salvar esta preferência no navegador.')}}
function catalog(){
 const ids=new Set(),origins=new Set(),out=[];
 function add(item,subject,cat,academicPeriod){
  if(item.active===false||!item.id)return;
  const id=String(item.id),m=String(item.title||'').match(/\[([a-z0-9_-]{6,14})\](?:\.[a-z0-9]+)?$/i);
  const origin=item.originalSuffix||(m&&m[1])||'';
  // O mesmo material pode pertencer a matérias/períodos diferentes: indexar por contexto.
  const scope=norm(subject)+'|'+String(academicPeriod??''),unique=id+'|'+scope,fromOrigin=origin+'|'+scope;
  if(ids.has(unique)||(origin&&origins.has(fromOrigin)))return;
  ids.add(unique);if(origin)origins.add(fromOrigin);
  out.push({...item,id,subject,cat,academicPeriod:academicPeriod??null,local:false});
 }
 /* A Biblioteca cataloga materiais por período mesmo quando a turma está em outro semestre.
    Somente a grade determina quais matérias aparecem no portal. */
 (W.SinusAcervoAuditado?.items||[]).forEach(x=>add(x,x.subject,x.cat,x.academicPeriod));
 (W.SinusMedicina?.state?.items||[]).forEach(x=>{
  if(!x.id||!x.s||!Number.isInteger(Number(x.p))||Number(x.p)<1||Number(x.p)>10)return;
  add({title:x.t,id:x.id,kind:x.m,mime:x.m,source:'medicina',studyMode:x.area==='practice'?'practice':'theory',
     studySection:x.section||x.cat,requiresGooglePermission:true},x.s,x.cat||'complementares',Number(x.p));
 });
 (W.SinusDrive?.state?.items||[]).forEach(x=>{
  const period=Number(x.p);if(!x.id||!x.s||!Number.isInteger(period)||period<1||period>10)return;
  const mime=String(x.m||'');
  const desc=norm((x.sec||'')+' '+(x.t||''));
  const practice=/pratica|practica|lamina|laboratorio|microscop|macroscop/.test(desc);
  const exam=/prova|prueba|examen|parcial|avaliac|evaluac|simulado|questionario|cuestionario/.test(desc);
  const mode=practice?'practice':'theory';
  const category=exam?'provas':/^video\//.test(mime)?'videos':/^audio\//.test(mime)?'audios':
     practice?'pratica':/presentation|powerpoint/.test(mime)?'slides':'complementares';
  add({title:x.t,id:x.id,kind:mime,mime,source:'drive-indexado',studyMode:mode,
       studySection:category==='pratica'?'laminas':category,cohort:x.c||'',requiresGooglePermission:true},x.s,category,period);
 });
 Object.keys(DB.subjects||{}).forEach(subject=>{V11_CATS.forEach(cat=>{(DB.subjects[subject][cat]||[]).forEach(item=>add(item,subject,cat,item.academicPeriod??DB.subjects[subject].period))})});
 return out.concat(uploadedItems());
}
function kind(x){const s=norm(x.mime||x.type||x.kind||x.title||'');if(x.cat==='audios'||s.includes('audio'))return 'audio';if(x.cat==='videos'||s.includes('video'))return 'video';if(s.includes('image/')||/\.(jpe?g|png|webp|heic)$/i.test(x.title||x.name||''))return 'image';if(/wordprocessing|msword|google-apps.document|text\//.test(s)||/\.(docx?|odt|txt)$/i.test(x.title||x.name||''))return 'document';if(s.includes('pdf')||/\.pdf$/i.test(x.title||x.name||''))return 'pdf';if(s.includes('presentation')||/\.pptx?$/i.test(x.title||x.name||'')||x.cat==='slides')return 'slides';return 'document'}
const names={pdf:'PDF',slides:'Slides',audio:'Áudio',video:'Vídeo',image:'Imagem',document:'Documento'};
const purposeNames={summary:'Resumos e revisões',exam:'Provas',questions:'Questões e simulados',feedback:'Correções',work:'Trabalhos',book:'Livros',other:'Outros materiais'};
function isSlide(x){const type=kind(x);return type==='slides'||/\.pptx?(?:\.pdf)?$/i.test(x.title||x.name||'')||(x.cat==='slides'&&type==='pdf')}
function purpose(x){if(x.auditType)return x.auditType==='prova'||x.auditType==='foto-prova'?'exam':x.auditType==='revisao'?'summary':x.auditType==='correcao'?'feedback':'questions';if(x.uploaded)return x.category==='slides'?'other':x.category;const t=norm(x.title||x.name||'');if(x.studySection==='apostila'||/resum[oae]|apostila|repaso|revisao|revision/.test(t))return 'summary';if(x.cat==='provas'||x.studySection==='provas'||/prova|examen|exame|simulado|cuestionario|questionario|ejercici|exercici|preguntas|questoes|parcial/.test(t))return 'exam';if(/trabalho|trabajo|tarea|portafolio|portfolio|seminario|articulo cientifico/.test(t))return 'work';if(isSlide(x))return 'other';if(/\blivro|\blibro|\batlas|robbins|harrison|guyton|netter|schwartz|thompson|lippincott|murray|junqueira|sobotta|gray.s anatomy|moore.*anatom|harper|farreras|ganong|katzung|goodman|patologia de porth|fisiopatologia de porth|abbas|latarjet|langman|silverthorn|rang.*dale|mario parisi|karp|canese|harsh mohan|de.robertis|ju[nq]+ueira|juqueira|ross.*ed|snell|tortora|stryer|voet|janeway|kuby|boron|antonio.blanco|anatomia humana|histologia basica/.test(t)||norm(x.kind)==='livro')return 'book';return 'other'}
function priority(x){if(isSlide(x))return 9;return {summary:0,exam:1,questions:2,work:3,feedback:4,book:5,other:6}[purpose(x)]??8}
function order(a,b){return priority(a)-priority(b)||norm(a.title||a.name).localeCompare(norm(b.title||b.name),'pt')}
function icon(type){const paths=type==='folder'?'<path d="M3 7h7l2 3h9v11H3z"/>':type==='video'?'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="m10 9 5 3-5 3z"/>':type==='audio'?'<path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v8H4zM17 12h3v8h-3z"/>':'<path d="M6 2h8l5 5v15H6zM14 2v6h5M9 12h7M9 16h7"/>';
return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">'+paths+'</svg>'}
function localItems(){return localLib.map((x,i)=>({...x,title:x.name,id:'local:'+i,index:i,local:true,subject:'Meus arquivos',cat:'local'}))}
function filtered(ignorePurpose=false){const data=read(),fav=data.favorites||[];return catalog().concat(localItems()).filter(x=>(!state.subject||x.subject===state.subject)&&(state.period==='all'||String(x.academicPeriod)===state.period)&&(!state.q||norm(x.title+' '+x.subject+' '+names[kind(x)]+' '+purposeNames[purpose(x)]+' '+(x.searchTags||'')+' '+(x.auditLabel||'')).includes(norm(state.q)))&&(!searchTerm||norm(x.title+' '+x.subject).includes(norm(searchTerm)))&&(state.view!=='favorites'||fav.includes(x.id))&&(state.view!=='audited'||x.source==='auditoria-provas')&&(state.view!=='mine'||x.local)&&(state.view!=='slides'||x.cat==='slides'||kind(x)==='slides')&&(state.view!=='books'||purpose(x)==='book')&&(state.view!=='photos'||kind(x)==='image'&&purpose(x)!=='exam')&&(state.view!=='exam-photos'||kind(x)==='image'&&purpose(x)==='exam')&&(state.view!=='videos'||kind(x)==='video')&&(['slides','books','favorites','mine','audited','photos','exam-photos','videos'].includes(state.view)||!isSlide(x)&&purpose(x)!=='book')&&(state.type==='all'||kind(x)===state.type)&&(state.audit==='all'||x.auditType===state.audit)&&(ignorePurpose||state.purpose==='all'||purpose(x)===state.purpose)).sort(order)}
function card(x){const type=kind(x),category=purpose(x),fav=(read().favorites||[]).includes(x.id),title=x.title||'Material';
return '<article class="sxLibCard purpose-'+category+'"><div class="sxLibCover kind-'+type+'"><button class="sxLibOpenCover" data-lib-open="'+H(x.id)+'" aria-label="Abrir '+H(title)+'"><span class="sxLibFallback">'+icon(type)+'<small>'+names[type]+'</small></span>'+(x.local?'':'<img src="https://drive.google.com/thumbnail?id='+encodeURIComponent(x.id)+'&sz=w400" alt="" loading="lazy" onload="this.parentElement.classList.add(\'has-preview\')" onerror="this.remove()">')+'</button><span class="sxLibBadge">'+(x.uploaded?'Meu arquivo':x.local?'Local':x.auditLabel||((category==='other')?names[type]:purposeNames[category]))+'</span>'+(!x.local?'<button class="sxLibFavorite '+(fav?'on':'')+'" data-lib-favorite="'+H(x.id)+'" aria-label="'+(fav?'Remover dos favoritos: ':'Favoritar: ')+H(title)+'" aria-pressed="'+fav+'">'+(fav?'★':'☆')+'</button>':'')+'</div><button class="sxLibTitle" data-lib-open="'+H(x.id)+'">'+H(title)+'</button><p class="sxLibMeta">'+H(x.subject)+'</p><small class="sxLibContext">'+H(x.uploaded?'Arquivo salvo na sua conta':x.local?'Arquivo temporário desta sessão':x.academicPeriod?x.academicPeriod+'º período'+(x.period&&norm(x.period).includes('turma')?' · '+x.period:''):x.period||names[type])+'</small>'+(x.uploaded?'<button class="sxUploadDelete" data-lib-delete="'+H(x.id)+'">Excluir arquivo</button>':'')+'</article>'}
function folder(subject,n){return '<button class="sxLibFolder" data-lib-subject="'+H(subject)+'"><span class="sxLibFolderArt">'+icon('folder')+'</span><h3>'+H(subject)+'</h3><p>'+n+' materiais</p><small>Explorar coleção ↗</small></button>'}
function section(title,body,extra){return '<section class="sxLibSection"><div class="sxLibSectionHead"><h2>'+title+'</h2>'+(extra||'')+'</div>'+body+'</section>'}
function render(){const box=D.getElementById('page-library');if(!box)return;const all=catalog(),data=read(),results=filtered();const recent=(data.recent||[]).map(id=>all.find(x=>x.id===id)).filter(x=>x&&!isSlide(x)&&purpose(x)!=='book').slice(0,8);const counts=new Map();all.forEach(x=>counts.set(x.subject,(counts.get(x.subject)||0)+1));
const subjects=Array.from(counts.keys()).sort((a,b)=>a.localeCompare(b,'pt'));const scope=filtered(true),periods=Array.from(new Set(all.map(x=>Number(x.academicPeriod)).filter(p=>p>=1&&p<=10))).sort((a,b)=>a-b);const categoryCounts={};scope.forEach(x=>{const c=purpose(x);categoryCounts[c]=(categoryCounts[c]||0)+1});
box.innerHTML='<div class="sxLibHeader"><div><span class="eyebrow">SEU ACERVO DE MEDICINA</span><h1>Biblioteca</h1><p>Sua revisão começa aqui. Resumos e provas primeiro.</p></div><button class="btn primary" data-lib-upload>+ Adicionar arquivo</button></div><div class="sxLibSearch"><span aria-hidden="true">⌕</span><input type="search" data-lib-search aria-label="Buscar na biblioteca" placeholder="Busque documentos, matérias ou temas" value="'+H(state.q)+'"></div><nav class="sxLibTabs" aria-label="Visualização da biblioteca">'+[['all','Todos'],['exam-photos','Fotos de provas'],['videos','Vídeos'],['photos','Imagens'],['documents','Documentos'],['slides','Slides'],['books','Livros'],['subjects','Matérias'],['audited','Auditados'],['favorites','Favoritos'],['mine','Meus arquivos']].map(([id,label])=>'<button data-lib-view="'+id+'" class="'+(state.view===id?'on':'')+'" aria-pressed="'+(state.view===id)+'">'+label+'</button>').join('')+'</nav>'+
'<nav class="sxLibFocus" aria-label="Tipo de material"'+(['books','slides','videos','photos','exam-photos'].includes(state.view)?' style="display:none"':'')+'>'+[['all','Todos'],['summary','Resumos'],['exam','Provas'],['questions','Questões'],['feedback','Correções'],['work','Trabalhos']].map(([id,label])=>'<button data-lib-purpose="'+id+'" class="'+(state.purpose===id?'on':'')+'" aria-pressed="'+(state.purpose===id)+'"><span>'+label+'</span><strong>'+ (id==='all'?scope.length:categoryCounts[id]||0)+'</strong></button>').join('')+'</nav>'+
(!state.q&&!state.subject&&state.period==='all'&&state.purpose==='all'&&state.view==='all'?section('Continue de onde parou',recent.length?'<div class="sxLibRail">'+recent.map(card).join('')+'</div>':'<div class="sxLibRecentEmpty"><span>'+icon('document')+'</span><p>Seus últimos materiais aparecerão aqui quando você começar a estudar.</p></div>')+section('Suas coleções','<div class="sxLibRail sxLibFolderRail">'+subjects.map(s=>folder(s,counts.get(s))).join('')+'</div>'):'')+
(state.view==='videos'?'<div id="sxYoutubeMount"></div>'+section('Vídeos do Drive',results.length?'<div class="sxLibGrid">'+results.slice(0,state.limit).map(card).join('')+'</div>':'<p class="sxLibLocalNote">Nenhum vídeo do Drive encontrado nesta seleção.</p>'):state.view==='subjects'?section('Coleções por matéria','<div class="sxLibCollections">'+subjects.filter(s=>!state.q||norm(s).includes(norm(state.q))).map(s=>folder(s,counts.get(s))).join('')+'</div>'):
section(state.view==='favorites'?'Seus favoritos':state.view==='mine'?'Meus arquivos':state.view==='books'?'Livros para consultar':state.view==='exam-photos'?'Fotos de provas':state.view==='photos'?'Fotos e imagens':state.view==='audited'?'Acervo PROVAS · auditado':state.view==='slides'?'Slides e apresentações':state.subject?H(state.subject):'Explore os materiais','<div class="sxLibToolbar"><span>'+results.length+' '+(results.length===1?'material':'materiais')+'</span><div><label>Matéria<select data-lib-subject-select><option value="">Todas as matérias</option>'+subjects.map(s=>'<option '+(s===state.subject?'selected':'')+'>'+H(s)+'</option>').join('')+'</select></label><label>Período<select data-lib-period><option value="all">Todos os períodos</option>'+periods.map(p=>'<option value="'+p+'" '+(state.period===String(p)?'selected':'')+'>'+p+'º período</option>').join('')+'</select></label><label>Categoria<select data-lib-audit>'+[['all','Todas as categorias'],['prova','Prova aplicada'],['foto-prova','Fotos de provas'],['questionario','Questionários'],['simulado','Simulados'],['banco','Bancos de questões'],['revisao','Revisões'],['correcao','Correções']].map(([value,label])=>'<option value="'+value+'" '+(state.audit===value?'selected':'')+'>'+label+'</option>').join('')+'</select></label><label>Formato<select data-lib-type>'+[['all','Todos os formatos'],['pdf','PDF'],['slides','Slides'],['video','Vídeos'],['audio','Áudios'],['document','Documentos'],['image','Imagens']].map(([value,label])=>'<option value="'+value+'" '+(state.type===value?'selected':'')+'>'+label+'</option>').join('')+'</select></label></div></div>'+(state.subject?'<button class="btn sm sxLibClearSubject" data-lib-subject="">← Todas as matérias</button>':'')+(state.view==='mine'?'<p class="sxLibLocalNote">Arquivos enviados ficam salvos na sua conta. Arquivos temporários não persistem.</p>':'')+(results.length?'<p class="sxLibOrderNote">Filtre por matéria, período e formato.</p><div class="sxLibGrid">'+results.slice(0,state.limit).map(card).join('')+'</div>':'<div class="sxLibEmpty"><h3>'+(state.view==='favorites'?'Seus favoritos ficam aqui':'Nenhum material encontrado')+'</h3><p>'+(state.view==='favorites'?'Toque na estrela de um documento para guardar seu atalho.':'Tente outra busca ou adicione um arquivo.')+'</p></div>')+(results.length>state.limit?'<div class="sxLibMore"><button class="btn" data-lib-more>Mostrar mais materiais</button><small>'+Math.min(state.limit,results.length)+' de '+results.length+'</small></div>':'')));
if(state.view==='videos'&&W.SinusYoutube)W.SinusYoutube.mount(state.q);
}
const oldDrive=W.openDrive;W.openDrive=function(id){const file=catalog().find(x=>x.id===id);if(file){const data=read();data.recent=[id,...(data.recent||[]).filter(x=>x!==id)].slice(0,12);write(data)}const result=oldDrive.apply(this,arguments);if(UI.page==='library')render();return result};
W.renderLibrary=render;
const oldNav=W.nav;W.nav=function(page,button){const r=oldNav(page,button);if(page==='library'){if(D.getElementById('pageTitle'))D.getElementById('pageTitle').textContent='Biblioteca';loadUploads();}return r};
D.addEventListener('click',e=>{const t=e.target.closest('[data-lib-open],[data-lib-favorite],[data-lib-subject],[data-lib-view],[data-lib-more],[data-lib-upload],[data-lib-delete],[data-lib-purpose]');if(!t)return;
if(t.hasAttribute('data-lib-open')){const id=t.dataset.libOpen;if(id.startsWith('uploaded:')){openUploaded(id);return}if(id.startsWith('local:')){const item=localLib[Number(id.split(':')[1])];if(item)W.open(item.url,'_blank','noopener');return}W.openDrive(id);return}
if(t.hasAttribute('data-lib-favorite')){const data=read(),id=t.dataset.libFavorite;data.favorites=(data.favorites||[]).includes(id)?data.favorites.filter(x=>x!==id):[...(data.favorites||[]),id];write(data);render();return}
if(t.hasAttribute('data-lib-upload')){openUploader();return}if(t.hasAttribute('data-lib-delete')){deleteUploaded(t.dataset.libDelete);return}
if(t.hasAttribute('data-lib-more'))state.limit+=24;
if(t.hasAttribute('data-lib-purpose')){state.purpose=t.dataset.libPurpose;state.limit=24;if(state.view==='subjects')state.view='documents'}
if(t.hasAttribute('data-lib-view')){state.view=t.dataset.libView;state.limit=24;state.type='all';state.audit='all';state.purpose='all'}
if(t.hasAttribute('data-lib-subject')){state.subject=t.dataset.libSubject;state.view='documents';state.limit=24}render();
});
D.addEventListener('change',e=>{const t=e.target;if(t.matches('[data-lib-subject-select]'))state.subject=t.value;else if(t.matches('[data-lib-audit]'))state.audit=t.value;else if(t.matches('[data-lib-type]'))state.type=t.value;else if(t.matches('[data-lib-period]'))state.period=t.value;else return;state.limit=24;render()});
D.addEventListener('input',e=>{if(!e.target.matches('[data-lib-search]'))return;state.q=e.target.value;state.limit=24;const pos=e.target.selectionStart;render();const input=D.querySelector('[data-lib-search]');if(input){input.focus();try{input.setSelectionRange(pos,pos)}catch{}}});
const visualStyle=D.createElement('style');visualStyle.textContent='\n.sxLibFocus{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:8px 0 26px}.sxLibFocus button{display:flex;justify-content:space-between;align-items:center;gap:10px;text-align:left;border:1px solid #d6e4db;border-radius:18px;padding:18px;background:var(--card,#ffffffb3);color:inherit;font:inherit;cursor:pointer;transition:transform .18s,border-color .18s}.sxLibFocus button:hover{transform:translateY(-2px);border-color:#368d6b}.sxLibFocus button.on{background:#17694c;color:white;border-color:#17694c;box-shadow:0 6px 18px #17694c22}.sxLibFocus strong{font-size:22px;font-weight:650}.sxLibFocus span{font-size:14px;font-weight:650}.sxLibOrderNote{font-size:12px;color:#687e70;margin:0 0 18px}.sxLibGrid .sxLibCard{padding:12px;border-radius:20px;background:var(--card,#ffffffb3);border:1px solid #e0e8e2;transition:transform .18s,box-shadow .18s}.sxLibGrid .sxLibCard:hover{transform:translateY(-3px);box-shadow:0 10px 26px #204d3412}.purpose-summary .sxLibBadge{background:#e5f4e9;color:#226544}.purpose-exam .sxLibBadge{background:#fff0d7;color:#825511}.purpose-book .sxLibBadge{background:#f2e7db;color:#795335}.purpose-work .sxLibBadge{background:#e8ecfa;color:#4a5682}.sxLibHeader{padding:24px;border-radius:24px;background:linear-gradient(120deg,#e9f3eb,#f7f8ef);border:1px solid #dce7dc}.sxLibHeader p{line-height:1.5}@media(max-width:700px){.sxLibFocus{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.sxLibFocus button{padding:14px}.sxLibFocus strong{font-size:20px}.sxLibHeader{padding:18px}.sxLibGrid .sxLibCard{padding:9px}}html[data-theme="dark"] .sxLibHeader{background:#18392e}html[data-theme="dark"] .sxLibFocus button:not(.on){background:#18392e}';D.head.appendChild(visualStyle);
const uploaderStyle=D.createElement('style');uploaderStyle.textContent='.sxUploaderOverlay{position:fixed;inset:0;background:#0b231bbb;z-index:99999;display:flex;align-items:center;justify-content:center;padding:15px}.sxUploaderBox{width:min(520px,100%);max-height:92vh;overflow-y:auto;background:#fff;color:#18392c;border-radius:22px;padding:26px;box-shadow:0 24px 80px #061b1860;display:grid;gap:14px}.sxUploadTitle{display:flex;justify-content:space-between;align-items:flex-start}.sxUploadTitle small{color:#438166;letter-spacing:.1em}.sxUploadTitle h2{font-size:23px;margin:4px 0}.sxUploadTitle button{background:transparent;border:0;cursor:pointer;font-size:20px}.sxUploaderBox p{font-size:13px;color:#5b7168;margin:0}.sxUploaderBox label{font-size:13px;font-weight:600;display:grid;gap:6px}.sxUploaderBox input,.sxUploaderBox select{width:100%;border:1px solid #cbd9d0;border-radius:11px;padding:11px;background:#fff;color:#18392c;font:inherit}.sxUploadCols{display:grid;grid-template-columns:1fr 1fr;gap:12px}.sxUploadActions{display:flex;justify-content:flex-end;gap:10px}#sxUploader .sxFilePicker{display:grid;gap:9px}#sxUploader .sxFileLabel{font-size:13px;font-weight:650}#sxUploader .sxFilePickRow{display:flex;align-items:center;gap:12px;flex-wrap:wrap}#sxUploader .sxFilePickRow input[type=file]{display:block!important;position:static!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;min-width:240px;width:100%;max-width:100%;font-size:13px;background:#f5faf7;border:1px solid #c5ded0;border-radius:12px;padding:9px;cursor:pointer}#sxUploader .sxFilePickRow input[type=file]::file-selector-button{background:#dcefe5;color:#185d3d;border:1px solid #b9dcc8;border-radius:9px;padding:10px 12px;font:600 12px system-ui,sans-serif;cursor:pointer;margin-right:10px}#sxUploader .sxFilePickRow input[type=file]:focus-visible{outline:3px solid #57a67d;outline-offset:3px}#sxUploader [data-file-name]{font-size:12px;word-break:break-word;min-width:0;flex:1;color:#486e59}#sxUploader .sxFilePickRow input[type=file]{flex:1 1 280px}#sxUploader .sxFileDrop{border:1px dashed #9dbdae;border-radius:12px;text-align:center;padding:20px 12px;color:#35664c;background:#f6fbf7;cursor:pointer;font-size:12px}#sxUploader .sxFileDrop:hover,#sxUploader .sxFileDrop.isDragging{border-color:#17694c;background:#e6f5ed}#sxUploader .sxFileDrop:focus-visible{outline:3px solid #57a67d;outline-offset:3px}.sxUploaderBox [data-upload-status]{color:#24583f}.sxUploadDelete{border:0;background:transparent;color:#a44336;font-size:12px;cursor:pointer;display:block;margin:7px auto}.sxUploadActions button:disabled{opacity:.5}@media(max-width:560px){.sxUploadCols{grid-template-columns:1fr}.sxUploaderBox{padding:18px}}';D.head.appendChild(uploaderStyle);
D.addEventListener('visibilitychange',()=>{if(!D.hidden&&UI.page==='library')loadUploads();});
loadUploads();
function openCollection(options={}){
 const subject=String(options.subject||'');
 const p=Number(options.period);
 state.subject=subject;
 state.period=Number.isInteger(p)&&p>=1&&p<=10?String(p):'all';
 state.view=options.view||'documents';
 state.purpose=options.purpose||'all';
 state.type='all';state.audit='all';state.q='';state.limit=24;
 if(!['subjects','videos','photos','exam-photos','slides','books','audited','mine','favorites','documents','all'].includes(state.view))state.view='documents';
 const subjectView=D.getElementById('subjectView');
 if(subjectView&&!subjectView.classList.contains('hidden')&&typeof W.closeSubject==='function')W.closeSubject();
 if(typeof W.nav==='function')W.nav('library');
 render();
}
function privateForSubject(subject,period){
 const p=Number(period);
 return uploadedItems().filter(x=>x.subject===subject&&(!x.academicPeriod||Number(x.academicPeriod)===p));
}
W.SinusLibrary={catalog,filtered,render,purpose,priority,isSlide,loadUploads,openUploaded,privateForSubject,openCollection,get uploadsReady(){return uploads.ready}};
})(window,document);
