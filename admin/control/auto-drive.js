/* SINUS · importar uma pasta Google Drive e classificar toda a árvore automaticamente. */
(function(W,D){'use strict';
const FOLDER='application/vnd.google-apps.folder';
const END='https://qyioizupudjrwmtasrue.supabase.co/functions/v1/sinus-subject-resources';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
let busy=false,latest=null;
const state={root:'',found:0,folders:0,processed:0,imported:0,updated:0,skipped:0,issues:[],rows:[],savedRows:[],errors:[]};
function idOf(link){try{const u=new URL(link);if(u.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(u.hostname))return '';return u.pathname.match(/\/folders\/([A-Za-z0-9_-]{15,})/)?.[1]||u.searchParams.get('id')||'';}catch{return '';}}
function stage(text){
 const n=norm(text);
 if(/\bp[\s._-]*1\b|\b1\s*(?:o|er)?\s*parcial\b|\bprimeiro\s*parcial\b/.test(n))return 'P1';
 if(/\bp[\s._-]*2\b|\b2\s*(?:o|do)?\s*parcial\b|\bsegundo\s*parcial\b/.test(n))return 'P2';
 if(/\bfinal(?:es)?\b/.test(n))return 'FINAL';
 return 'OUTROS';
}
function period(text){
 const n=norm(text);
 for(const regex of [/(?:^|[\s/])(\d{1,2})\s*(?:o|°|º|ª)?\s*(?:semestre|sem\.?|periodo|per\.?)(?:\b|$)/i,/(?:semestre|periodo)\s*(\d{1,2})\b/i]){
  const m=n.match(regex);if(m&&Number(m[1])>=1&&Number(m[1])<=10)return Number(m[1]);
 }
 return 0;
}
function cohort(text){
 const chunks=String(text||'').split(' / ');
 for(const ch of chunks){
  const m=ch.match(/(?:^|\s)(?:turma|classe|grupo)\s*[-.:]?\s*([A-Z])\b/i);
  if(m)return m[1].toUpperCase();
 }
 return '*';
}
function subjects(){
 const motor=W.SinusTimetable;if(!motor)return [];
 const all=[];
 for(let p=1;p<=10;p++)for(const cls of motor.cohorts(p)||[]){
  for(const x of motor.academicOptions(p,cls)||[]){
   if(all.some(r=>r.period===p&&norm(r.title)===norm(x.title)))continue;
   all.push({period:p,title:x.title,n: norm(x.title)});
  }
 }
 return all;
}
const aliases={'anatomia patologica':'anatomia patologica','anatopato':'anatomia patologica','semiologia':'semiologia','fisiopatologia':'fisiopatologia','medicina familiar':'medicina de la familia','medicina da familia':'medicina de la familia'};
function matchSubject(path,p,catalog){
 const parents=path.split(' / ').slice(0,-1),options=catalog.filter(s=>s.period===p);
 const candidates=options.map(s=>{
  const full=s.n.replace(/\s+(?:i|ii|iii|iv|v|1|2|3|4|5)$/,'');
  const terms=[s.n,full,...Object.entries(aliases).filter(([,v])=>s.n.includes(v)).map(([k])=>k)];
  let score=0;
  for(let idx=0;idx<parents.length;idx++){
   const segment=norm(parents[idx]);if(!segment)continue;
   for(const term of terms){if(term.length<5)continue;
    if(segment===term)score=Math.max(score,100+idx);
    else if(segment.includes(term))score=Math.max(score,60+idx);
   }
  }
  return {s,score};
 }).sort((a,b)=>b.score-a.score);
 if(!candidates[0]?.score)return null;
 if(candidates.length>1&&candidates[0].score===candidates[1].score&&norm(candidates[0].s.title)!==norm(candidates[1].s.title))return null;
 return candidates[0].s.title;
}
function sectionOf(path,file){
 const n=norm(path),name=norm(file.name),mime=String(file.mimeType||'');
 if(/(?:provas?|exames?|evaluacion|examenes?|gabarito|parcial|simulado|prueba)/.test(name))return 'provas';
 if(/(?:^|\/)(?:provas?|exames?|parciais?|evaluaciones|pruebas?)(?:\/|$)/.test(n))return 'provas';
 if(/\b(?:livros?|libros?|books?|bibliografia)\b/.test(n))return 'livros';
 if(/\b(?:resumos?|resumenes?|apostilas?|apuntes?|revisao|revision)\b/.test(n))return 'resumos';
 if(/\b(?:laminas?|laminas?|microscopia|histologia\s+pratica)\b/.test(n))return 'laminas';
 if(/video\//.test(mime)||/\.(mp4|mov|avi|webm|mkv)$/i.test(name))return 'videos';
 if(/audio\//.test(mime)||/\.(mp3|m4a|wav|ogg|aac)$/i.test(name))return 'audios';
 if(/\b(?:pratica|practica|laboratorio|hospital|rotacion|rotacao)\b/.test(n))return 'pratica';
 if(/presentation/.test(mime)||/\.(ppt|pptx|odp)$/i.test(name)||/\b(?:slides?|diapositivas?|presentaciones?)\b/.test(n))return 'slides';
 if(mime.includes('pdf')||/\.(pdf)$/i.test(name)){
  // PDFs de aula sob pastas da disciplina vão para Slides, salvo pasta explicitamente classificada acima.
  return 'slides';
 }
 return 'complementares';
}
function classify(file,path,cat,root){
 let p=period(path),t=p?matchSubject(path,p,cat):null;
 if(!p){
  // Uma pasta de disciplina isolada só é atribuída quando a grade indica um único período possível.
  const possibilities=[...new Set(cat.map(s=>s.period))].map(pp=>({period:pp,subject:matchSubject(path,pp,cat)})).filter(x=>x.subject);
  if(possibilities.length===1){p=possibilities[0].period;t=possibilities[0].subject;}
 }
 if(!p)return {issue:'Período não identificado',path};
 if(!t)return {issue:'Matéria não identificada na grade',path};
 const sec=sectionOf(path,file),classGroup=cohort(path);
 const id=String(file.id||'');
 if(!/^[\w-]{10,120}$/.test(id))return {issue:'Identificador inválido',path};
 const type=file.mimeType||'';
 const url=String(file.webViewLink||(
  type.includes('google-apps.document')?'https://docs.google.com/document/d/'+id+'/edit':
  type.includes('google-apps.presentation')?'https://docs.google.com/presentation/d/'+id+'/edit':
  type.includes('google-apps.spreadsheet')?'https://docs.google.com/spreadsheets/d/'+id+'/edit':
  'https://drive.google.com/file/d/'+id+'/view'));
 return {file_id:id,title:file.name,period:p,cohort:classGroup,subject:t,section:sec,stage:stage(path),study_mode:/\b(pratica|practica|laboratorio|rotacion|rotacao)\b/.test(norm(path))?'practice':'theory',mime_type:type,url,source_path:path,root_id:root};
}
async function session(){const {data:{session}}=await W.SinusBackend.client.auth.getSession();if(!session)throw Error('Faça login com sua conta administrativa.');return session;}
async function api(action,data){const ss=await session();const r=await fetch(END,{method:'POST',headers:{Authorization:'Bearer '+ss.access_token,'Content-Type':'application/json'},body:JSON.stringify({action,...data})});const d=await r.json();if(!r.ok)throw Error(d.error||'Não foi possível salvar os arquivos.');return d;}
async function drive(path,params={},token){
 const q=new URLSearchParams(params),url='https://www.googleapis.com/drive/v3/'+path+(q.size?'?'+q:'');
 const r=await fetch(url,{headers:{Authorization:'Bearer '+token}}),d=await r.json().catch(()=>({}));
 if(!r.ok){const err=new Error(d.error?.message||'Google Drive retornou erro '+r.status);err.isAccess=[401,403].includes(r.status);throw err;}
 return d;
}
function status(text,error=false){const el=D.getElementById('sx-auto-status');if(el){el.textContent=text;el.classList.toggle('error',error);}}
function progress(){const el=D.getElementById('sx-auto-count');if(el)el.textContent=state.folders+' pastas · '+state.found+' arquivos lidos · '+state.rows.length+' classificados';}
async function oauth(){
 const url=D.getElementById('sx-auto-url')?.value.trim();
 try{sessionStorage.setItem('sxAutoPendingDriveUrl',url);}catch{}
 localStorage.setItem('sinus_admin_return','1');
 const {error}=await W.SinusBackend.client.auth.signInWithOAuth({provider:'google',options:{
  redirectTo:location.origin+'/',scopes:'https://www.googleapis.com/auth/drive.metadata.readonly',
  queryParams:{access_type:'offline',prompt:'consent'}
 }});
 if(error)status(error.message,true);
}
async function scan(root,token){
 const cat=subjects(),queue=[{id:root,path:''}],visited=new Set();state.rows=[];state.issues=[];state.errors=[];state.found=0;state.folders=0;
 const meta=await drive('files/'+encodeURIComponent(root),{fields:'id,name,mimeType,webViewLink',supportsAllDrives:'true'},token);
 if(meta.mimeType!==FOLDER)throw Error('O link precisa abrir uma pasta do Drive, não um arquivo.');
 queue[0].path=meta.name;
 while(queue.length){
  if(state.folders>=220||state.found>=2500){state.issues.push({issue:'Limite de segurança (220 pastas ou 2.500 arquivos)',path:queue[0].path});break;}
  const item=queue.shift();if(visited.has(item.id))continue;visited.add(item.id);state.folders++;
  let next;
  do{
   const query="'"+item.id.replace(/'/g,"\\'")+"' in parents and trashed = false";
   let data;
   try{data=await drive('files',{q:query,pageSize:'500',fields:'nextPageToken,files(id,name,mimeType,webViewLink,shortcutDetails)',supportsAllDrives:'true',includeItemsFromAllDrives:'true',...(next?{pageToken:next}:{})},token);}
   catch(e){state.errors.push({issue:'Pasta inacessível: '+e.message,path:item.path});break;}
   for(const f of data.files||[]){
    if(f.mimeType===FOLDER){queue.push({id:f.id,path:item.path+' / '+f.name});continue;}
    if(f.mimeType==='application/vnd.google-apps.shortcut'){state.issues.push({issue:'Atalho não processado',path:item.path+' / '+f.name});continue;}
    state.found++;
    const result=classify(f,item.path+' / '+f.name,cat,root);
    if(result.issue)state.issues.push(result);else state.rows.push(result);
   }
   next=data.nextPageToken;progress();status('Lendo arquivos em '+item.path+'…');
  }while(next&&state.found<2500);
 }
 return state.rows;
}
function groups(rows){const map=new Map();for(const x of rows){const key=[x.period,x.cohort,x.subject,x.section].join(' | ');map.set(key,(map.get(key)||0)+1);}return [...map].sort((a,b)=>a[0].localeCompare(b[0]));}
function report(){const r=D.getElementById('sx-auto-report');if(!r)return;
 const g=groups(state.savedRows);
 r.innerHTML='<div class="sxAutoSummary"><b>'+state.imported+'</b><span>Novos arquivos cadastrados</span><b>'+state.updated+'</b><span>Arquivos atualizados</span><b>'+state.issues.length+'</b><span>Sem classificação</span></div>'+
 (g.length?'<h3>Abas alimentadas</h3><div class="sxAutoGroups">'+g.map(([name,n])=>'<div><span>'+esc(name.replace(/ \| /g,' · '))+'</span><b>'+n+' arquivo(s)</b></div>').join('')+'</div>':'<p>Nenhuma aba foi alimentada.</p>')+
 (state.issues.length?'<details><summary>Ver '+state.issues.length+' arquivo(s) não classificados</summary><div class="sxAutoIssues">'+state.issues.slice(0,100).map(x=>'<p><b>'+esc(x.issue)+'</b> — '+esc(x.path)+'</p>').join('')+'</div></details>':'')+
 (state.errors.length?'<details open><summary>'+state.errors.length+' erro(s) de leitura</summary>'+state.errors.map(x=>'<p>'+esc(x.issue)+' — '+esc(x.path)+'</p>').join('')+'</details>':'');
}
async function run(){
 if(busy)return;
 const url=D.getElementById('sx-auto-url')?.value.trim()||'',root=idOf(url);
 if(!root)return status('Cole um link válido de pasta do Google Drive.',true);
 busy=true;state.root=root;state.imported=0;state.updated=0;state.savedRows=[];
 const btn=D.getElementById('sx-auto-run');btn.disabled=true;D.getElementById('sx-auto-report').innerHTML='';
 try{
  const ss=await session();let token=ss.provider_token;
  if(!token){D.getElementById('sx-auto-connect').hidden=false;throw Error('Conecte sua conta Google com permissão de leitura dos nomes dos arquivos.');}
  status('Verificando acesso ao Drive…');
  try{await drive('files/'+encodeURIComponent(root),{fields:'id,name,mimeType'},token);}catch(e){if(e.isAccess)D.getElementById('sx-auto-connect').hidden=false;throw e;}
  const files=await scan(root,token);
  const ids=new Set();const unique=[];
  for(const f of files){const key=[f.file_id,f.period,f.cohort,f.subject,f.section,f.study_mode].join('|');if(!ids.has(key)){ids.add(key);unique.push(f);}}
  state.skipped=files.length-unique.length;
  if(!unique.length){report();status('Leitura concluída, mas nenhum arquivo foi vinculado. Confira os avisos de classificação.',true);return;}
  for(let i=0;i<unique.length;i+=70){
   status('Salvando os materiais no SINUS: '+Math.min(i+70,unique.length)+' / '+unique.length+'…');
   const saved=await api('import_batch',{root_id:root,items:unique.slice(i,i+70)});
   state.imported+=Number(saved.created||0);state.updated+=Number(saved.updated||0);state.savedRows.push(...unique.slice(i,i+70));
  }
  report();status('Importação concluída: '+state.imported+' novos e '+state.updated+' atualizados. Veja as abas alimentadas abaixo.');
 }catch(e){
  report();
  status('Não foi possível concluir: '+e.message+(state.imported||state.updated?' Arquivos anteriores a este erro já foram salvos.':''),true);
 }finally{busy=false;btn.disabled=false;progress();}
}
function renderInto(target){
 if(!target)return;
 let remembered='';try{remembered=sessionStorage.getItem('sxAutoPendingDriveUrl')||'';sessionStorage.removeItem('sxAutoPendingDriveUrl');}catch{}
 target.innerHTML='<section class="sxAuto"><div class="sxAutoHeading"><span>SINCRONIZAÇÃO AUTOMÁTICA · GOOGLE DRIVE</span><h2>Importar pasta inteira</h2><p>Cole o link da pasta de uma turma ou período. O SINUS lê as subpastas, reconhece a matéria, classifica os materiais por aba e por P1/P2/Final, e registra um relatório do que conseguiu importar.</p></div><div class="sxAutoForm"><label>Link da pasta do Google Drive<input id="sx-auto-url" type="url" value="'+esc(remembered)+'" placeholder="https://drive.google.com/drive/folders/…"></label><div class="sxAutoButtons"><button id="sx-auto-run" class="primary" type="button">Analisar e alimentar todas as matérias</button><button id="sx-auto-connect" type="button" hidden>Conectar Google Drive</button></div><div id="sx-auto-count">Nenhuma pasta analisada</div><p id="sx-auto-status" role="status">A importação exige acesso aos metadados do Drive. Arquivos privados continuam protegidos pelo Google.</p></div><div id="sx-auto-report"></div><p class="sxAutoNote">Arquivos só são publicados quando há período e matéria identificáveis. Itens sem correspondência são mostrados no relatório, não enviados à turma errada. O painel não altera nem compartilha os arquivos originais.</p></section>';
 target.querySelector('#sx-auto-run').onclick=run;target.querySelector('#sx-auto-connect').onclick=oauth;
}
W.SinusAutoDrive={render:()=>renderInto(D.getElementById('view')),mount:renderInto,scanMetadata:classify};
D.head.insertAdjacentHTML('beforeend','<style>.sxAuto{background:#fff;border:1px solid #dce8e0;border-radius:18px;padding:25px;margin-bottom:20px;color:#234633}.sxAutoHeading{margin-bottom:18px}.sxAutoHeading>span{letter-spacing:.1em;color:#548063;font-size:10px;font-weight:800}.sxAutoHeading h2{font-size:22px;margin:6px 0}.sxAutoHeading p{color:#6d8174;font-size:13px;line-height:1.6;max-width:800px}.sxAutoForm{border:1px solid #d8e6db;background:#f7fbf8;border-radius:12px;padding:18px}.sxAutoForm label{display:block;color:#3a5845;font-weight:700;font-size:13px}.sxAutoForm input{display:block;width:100%;padding:13px;border:1px solid #ccdccc;border-radius:9px;margin-top:8px;background:#fff;color:#284535}.sxAutoButtons{display:flex;flex-wrap:wrap;gap:10px;margin:13px 0}.sxAutoButtons button{border-radius:9px;padding:12px 14px}.sxAutoButtons button:disabled{opacity:.45}.sxAutoButtons #sx-auto-connect{border:1px solid #ccdacc;background:#fff;color:#236444}.sxAutoForm #sx-auto-count,.sxAutoForm #sx-auto-status{font-size:12px;color:#607d67;margin:7px 0}.sxAutoForm .error{color:#b34337!important}.sxAutoSummary{display:grid;grid-template-columns:70px 1fr;gap:5px 10px;background:#f4faf6;padding:16px;margin:17px 0;border-radius:12px}.sxAutoSummary b{font-size:23px;color:#236d45}.sxAutoSummary span{font-size:12px;align-self:center;color:#526957}.sxAutoGroups{display:grid;gap:5px;margin:10px 0}.sxAutoGroups>div{display:flex;justify-content:space-between;gap:15px;background:#f6faf8;padding:10px 12px;border:1px solid #e2eae3;border-radius:8px;font-size:12px}.sxAutoGroups b{white-space:nowrap}.sxAuto details{margin:15px 0;font-size:12px;color:#6b7d70}.sxAuto details summary{cursor:pointer;font-weight:700}.sxAutoIssues{max-height:250px;overflow:auto}.sxAutoIssues p{margin:6px 0}.sxAutoNote{font-size:12px;color:#70857a;line-height:1.5;margin:15px 0 0}@media(max-width:700px){.sxAuto{padding:17px}.sxAutoGroups>div{flex-direction:column;gap:3px}}</style>');
})(window,document);