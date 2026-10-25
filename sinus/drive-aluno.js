/* SINUS · Drive do aluno: leitura opt-in, apenas metadados.
   Nenhum token nem conteúdo de terceiros é salvo ou publicado. */
(function(W){
'use strict';
var FOLDER='application/vnd.google-apps.folder';
var SCOPE='https://www.googleapis.com/auth/drive.metadata.readonly';
var MAX_FOLDERS=300,MAX_FILES=2500,MAX_SLIDES=500;
var state={busy:false,last:null};
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ')}
function folderLink(input){
 try{
  var u=new URL(String(input||'').trim());
  if(u.protocol!=='https:'||u.hostname!=='drive.google.com')return null;
  var m=u.pathname.match(/(?:^|\/)folders\/([A-Za-z0-9_-]{10,})(?:\/|$)/);
  var id=m?m[1]:u.pathname==='/open'?u.searchParams.get('id'):null;
  if(!id||!/^[A-Za-z0-9_-]{10,}$/.test(id))return null;
  return {id:id,url:'https://drive.google.com/drive/folders/'+id};
 }catch(e){return null}
}
function isSlide(file,path){
 var mime=String(file.mimeType||''),name=normalize(file.name),folder=normalize(path);
 if(/provas?|pruebas?|examen|evaluac|avaliac|parcial|resumo|repaso|revisao|livro|libro|manual|atlas|questionario|cuestionario|simulado/.test(name+' '+folder))return false;
 return /presentation|powerpoint/.test(mime)||/\.(ppt|pptx|pps|ppsx)$/i.test(file.name||'')||
  (/pdf/.test(mime)||/\.pdf$/i.test(file.name||'')) && !/prova|exame|livro|resumo/.test(name);
}
function subjectFor(path,subjects){
 var normPath=' '+normalize(path)+' ',chosen='',best=0;
 (subjects||[]).forEach(function(name){
  var n=normalize(name);
  if(!n)return;
  var variants=[n];
  if(n==='anatomia patologica i')variants.push('anatopato i','anatomi a patologica i');
  if(n==='semiologia medica i')variants.push('semiologia i','semiologia practica');
  for(var i=0;i<variants.length;i++){
   var v=variants[i];
   if(normPath.indexOf(' '+v+' ')>=0 && v.length>best){chosen=name;best=v.length}
  }
 });
 return chosen;
}
function codeError(message,code){var e=new Error(message);e.code=code;return e}
async function driveGet(token,path,query){
 var url='https://www.googleapis.com/drive/v3/'+path+(query?'?'+query.toString():'');
 var res=await fetch(url,{headers:{Authorization:'Bearer '+token},cache:'no-store'});
 if(!res.ok){
  var msg='HTTP '+res.status;
  try{var body=await res.json();msg=body.error&&body.error.message||msg}catch(_){}
  if(res.status===401||res.status===403&&/scope|insufficient authentication|authentication credential/i.test(msg))throw codeError('O Google precisa autorizar a leitura de metadados do Drive.','drive-auth-required');
  if(res.status===403||res.status===404)throw codeError('Sem acesso a esta pasta. Confira se ela foi compartilhada com sua conta Google do SINUS.','drive-no-access');
  throw codeError('Erro na leitura do Drive: '+msg,'drive-api-error');
 }
 return res.json();
}
async function listChildren(token,id){
 var out=[],page='';
 do{
  var q=new URLSearchParams({q:"'"+id+"' in parents and trashed = false",fields:'nextPageToken,files(id,name,mimeType,webViewLink,shortcutDetails(targetId,targetMimeType))',pageSize:'1000',supportsAllDrives:'true',includeItemsFromAllDrives:'true'});
  if(page)q.set('pageToken',page);
  var result=await driveGet(token,'files',q);
  out.push.apply(out,result.files||[]);
  page=result.nextPageToken||'';
 }while(page&&out.length<MAX_FILES);
 return out;
}
function scopeKey(ctx,folderId){return String(ctx.uid||'')+'|'+Number(ctx.period)+'|'+String(ctx.cohort||'').toUpperCase()+'|'+folderId}
function storedItems(ctx,prefs){
 var link=folderLink(prefs&&prefs.driveFolderUrl);
 if(!link||scopeKey(ctx,link.id)!==String(prefs.driveScope||''))return [];
 return (Array.isArray(prefs.driveSlides)?prefs.driveSlides:[]).filter(function(x){return x&&x.id&&x.subject&&/^[A-Za-z0-9_-]{10,}$/.test(x.id)}).slice(0,MAX_SLIDES);
}
function apply(DB,ctx,prefs){
 if(!DB||!DB.subjects)return 0;
 var items=storedItems(ctx,prefs),count=0;
 items.forEach(function(x){
  var name=Object.keys(DB.subjects).find(function(n){return normalize(n)===normalize(x.subject)});
  if(!name)return;
  var mat=DB.subjects[name];if(Number(mat.period)!==Number(ctx.period))return;
  mat.slides=mat.slides||[];
  if(mat.slides.some(function(it){return String(it.id)===x.id}))return;
  mat.slides.push({id:x.id,title:String(x.title||'Slide').slice(0,220),mime:x.mime||'application/pdf',kind:'Slides',active:true,
   source:'drive-aluno',studyMode:'theory',studySection:'slides',period:'Turma '+String(ctx.cohort).toUpperCase(),
   academicPeriod:Number(ctx.period),cohort:String(ctx.cohort).toUpperCase(),requiresGooglePermission:true});
  count++;
 });
 return count;
}
async function scan(ctx){
 var folder=folderLink(ctx.url);
 if(!folder)throw codeError('Cole um link válido de uma pasta do Google Drive.','invalid-folder-url');
 if(state.busy)throw codeError('Uma sincronização já está em andamento.','drive-busy');
 var client=W.SinusBackend&&W.SinusBackend.client;
 if(!client)throw codeError('Entre na sua conta Google para sincronizar.','drive-auth-required');
 var response=await client.auth.getSession(),session=response.data&&response.data.session;
 if(!session||!session.provider_token)throw codeError('Autorize a leitura do Google Drive para continuar.','drive-auth-required');
 var token=session.provider_token;
 state.busy=true;
 try{
  var root=await driveGet(token,'files/'+encodeURIComponent(folder.id),new URLSearchParams({fields:'id,name,mimeType',supportsAllDrives:'true'}));
  if(root.mimeType!==FOLDER)throw codeError('O link precisa apontar para uma pasta, não para um arquivo.','invalid-folder-url');
  var queue=[{id:folder.id,path:''}],seen=new Set(),scanned=0,matched=[],unmatched=0;
  while(queue.length&&seen.size<MAX_FOLDERS&&scanned<MAX_FILES&&matched.length<MAX_SLIDES){
   var node=queue.shift();if(seen.has(node.id))continue;
   seen.add(node.id);
   var children=await listChildren(token,node.id);
   for(var i=0;i<children.length&&scanned<MAX_FILES&&matched.length<MAX_SLIDES;i++){
    var f=children[i];if(!f||!f.id||!f.name)continue;
    if(f.mimeType===FOLDER){if(seen.size+queue.length<MAX_FOLDERS)queue.push({id:f.id,path:node.path+' / '+f.name});continue}
    scanned++;
    if(!isSlide(f,node.path))continue;
    var subject=subjectFor(node.path+' / '+f.name,ctx.subjects||[]);
    if(!subject){unmatched++;continue}
    if(matched.some(function(x){return x.id===f.id&&x.subject===subject}))continue;
    matched.push({id:f.id,title:String(f.name).slice(0,220),mime:f.mimeType||'',subject:subject});
   }
  }
  var result={folderUrl:folder.url,folderId:folder.id,scope:scopeKey(ctx,folder.id),items:matched,
   scanned:scanned,folders:seen.size,unmatched:unmatched,partial:!!queue.length||matched.length>=MAX_SLIDES,at:new Date().toISOString()};
  state.last=result;return result;
 }finally{state.busy=false}
}
async function authorize(){
 var client=W.SinusBackend&&W.SinusBackend.client;
 if(!client)throw codeError('Entre na sua conta Google antes de sincronizar.','drive-auth-required');
 var redirect=location.origin+'/';
 var r=await client.auth.signInWithOAuth({provider:'google',options:{
  redirectTo:redirect,scopes:SCOPE,queryParams:{prompt:'consent'}
 }});
 if(r.error)throw r.error;
}
W.SinusStudentDrive={folderLink:folderLink,scan:scan,apply:apply,authorize:authorize,scopeKey:scopeKey,storedItems:storedItems,state:state};
})(window);
