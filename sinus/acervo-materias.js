/* SINUS - acervo incremental, nunca substitui matérias originais.
   Indexa somente arquivos já listados no catálogo acadêmico, sem alterar permissões Google. */
(function(W){
'use strict';
var PATHS=['turma-c.json','turmas-efg.json','efg-sec-1.json','efg-sec-2.json','efg-sec-3.json','turma-c-periodos-1-8.json'];
var done={},inProgress=false,libraryStatus={indexed:0,skipped:0,unavailable:[]};
function str(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function legacySubject(name){
 var n=str(name);
 if(/semiolog/.test(n))return 'Semiología Médica I';
 if(/anatom.*patol|anatopato/.test(n))return 'Anatomía Patológica I';
 if(/farmacol/.test(n))return 'Farmacología I';
 if(/fisiopatol/.test(n))return 'Fisiopatología I';
 if(/imagenol/.test(n))return 'Imagenología';
 if(/medicina.*famil/.test(n))return 'Medicina de la Familia';
 return String(name||'Disciplina').trim();
}
function kind(mime,title){var m=String(mime||'').toLowerCase();var t=str(title);
 if(m.startsWith('image/'))return 'Imagem';
 if(m.startsWith('video/'))return 'Vídeo';
 if(m.startsWith('audio/'))return 'Áudio';
 if(m.includes('pdf'))return 'PDF';
 if(m.includes('presentation')||/\.pptx?$/.test(t))return 'Slides';
 if(m.includes('document')||m.includes('wordprocessing')||/\.docx?$/.test(t))return 'Documento';
 return 'Arquivo';
}
function category(r,k){
 var s=str((r.sec||'')+' '+(r.s||'')+' '+(r.t||''));
 if(k==='Áudio')return 'audios';if(k==='Vídeo')return 'videos';
 if(/prova|parcial|examen|simulad|final/.test(s))return 'provas';
 if(/pratica|practica|lamina|laboratorio|laminario|macrosc|microscop/.test(s))return 'pratica';
 if(k==='Slides'||/slide|aula|apresenta|presentac/.test(s))return 'slides';
 return 'complementares';
}
function emptySubject(name,period){
 return {teacher:'',practiceTeacher:'',mode:'Teoria + Prática',accent:'mint',slides:[],provas:[],audios:[],videos:[],pratica:[],complementares:[],id:'drive_'+String(period)+'_'+str(name).replace(/[^a-z0-9]/g,'_'),active:true,period:Number(period),slug:'drive'};
}
async function sync(DB,context,onDone){
 if(inProgress)return;
 inProgress=true;libraryStatus={indexed:0,skipped:0,unavailable:[]};
 var responses=await Promise.allSettled(PATHS.map(async f=>{
  var res=await fetch('/biblioteca/dados/'+f,{cache:'no-cache'});
  if(!res.ok)throw Error(f+' '+res.status);
  return {name:f,items:(await res.json()).items||[]};
 }));
 var existing=new Set();
 Object.values(DB.subjects||{}).forEach(s=>['slides','provas','audios','videos','pratica','complementares'].forEach(cat=>(s[cat]||[]).forEach(v=>{if(v.id)existing.add(v.id)})));
 for(var i=0;i<responses.length;i++){
  var out=responses[i];if(out.status!=='fulfilled'){libraryStatus.unavailable.push(PATHS[i]);continue}
  for(var raw of out.value.items){
   if(!raw||typeof raw.id!=='string'||!/^[a-z0-9_-]{12,}$/i.test(raw.id)||existing.has(raw.id)){libraryStatus.skipped++;continue}
   var p=Number(raw.p||5),subject=legacySubject(raw.s);
   if(p<1||p>10){libraryStatus.skipped++;continue}
   var k=kind(raw.m,raw.t),cat=category(raw,k);
   var key=Object.keys(DB.subjects||{}).find(function(name){return str(name)===str(subject)&&Number(DB.subjects[name].period)===p});
   if(!key){libraryStatus.skipped++;continue} // A grade determina matérias, nunca a biblioteca.
   var box=DB.subjects[key];
   var title=String(raw.t||'Material sem título');
   box[cat].push({title,period:'Turma '+(raw.c||'')+(raw.sec?' · '+raw.sec:''),kind:k,id:raw.id,uid:'drive_'+raw.id,active:true,studyMode:cat==='pratica'?'practice':'theory',studySection:cat==='pratica'?'laminas':cat==='slides'?'slides':'complementares',mime:raw.m||'',cohort:raw.c||'',origin:'drive-class',requiresGooglePermission:true});
   existing.add(raw.id);libraryStatus.indexed++;
  }
 }
 inProgress=false;done[context?.uid||'session']=true;
 W.SINUS_DRIVE_STATUS=libraryStatus;
 if(typeof onDone==='function')onDone(libraryStatus);
}
W.SinusDriveSync={sync,status:()=>libraryStatus};
})(window);