/* Sinus Drive · integra o índice das turmas AO painel de matérias já existente.
   Nunca remove disciplinas/arquivos manuais ou altera permissões de origem do Google. */
(function(W){
'use strict';
var CATALOGS=[
'/biblioteca/dados/turma-c.json',
'/biblioteca/dados/turmas-efg.json',
'/biblioteca/dados/efg-sec-1.json',
'/biblioteca/dados/efg-sec-2.json',
'/biblioteca/dados/efg-sec-3.json',
'/biblioteca/dados/turma-c-periodos-1-8.json',
'/biblioteca/dados/c-periodos-1-3-extra.json',
'/biblioteca/dados/c-periodos-4-6-extra.json',
'/biblioteca/dados/c-periodos-7-8-extra.json',
'/biblioteca/dados/c-periodos-6-8-subpastas.json',
'/biblioteca/dados/turmas-ab-1.json',
'/biblioteca/dados/turmas-ab-2.json',
'/biblioteca/dados/turmas-ab-3.json',
'/biblioteca/dados/turma-b-praticas.json',
'/biblioteca/dados/turma-b-modulos.json',
'/biblioteca/dados/praticas-ab-complemento.json',
'/biblioteca/dados/praticas-imagens-resumos.json'
];
var state={items:[],loaded:false,loading:true,errors:[],counts:{},applied:'',added:0,context:null};
var alias={
'semiologia':'Semiología Médica I','semiologia practica':'Semiología Médica I','semiologia prática':'Semiología Médica I',
'semiologia i':'Semiología Médica I','semiologia medica i':'Semiología Médica I',
'anatomia patologica i':'Anatomía Patológica I','anatomia patologica pratica':'Anatomía Patológica I',
'anatomia patologica práctica':'Anatomía Patológica I',
'anatomia patologica':'Anatomía Patológica I',
'farmacologia i':'Farmacología I','fisiopatologia i':'Fisiopatología I',
'imagenologia':'Imagenología','medicina de la familia':'Medicina de la Familia',
'anestesiologia p1':'Anestesiología','anestesiologia p2':'Anestesiología',
'neumologia p1':'Neumología','neumologia p2':'Neumología',
'anatomia ii teoria':'Anatomía II','histologia ii pratica':'Histología II',
'biologia':'Biología','bioquimica i':'Bioquímica I','fisiologia i':'Fisiología I',
'nutricao':'Nutrición','medicina interna i':'Medicina Interna I'
};
var norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
var subjectName=s=>alias[norm(s)]||String(s||'').trim();
function extKind(x){
 var m=x.m||'',title=(x.t||'').toLowerCase();
 if(/^image\//.test(m))return 'Imagem';
 if(/^video\//.test(m))return 'Vídeo';
 if(/^audio\//.test(m))return 'Áudio';
 if(/pdf/.test(m))return 'PDF';
 if(/presentation|powerpoint/.test(m))return 'Slides';
 if(/document|wordprocessing|msword/.test(m))return 'Documento';
 return 'Arquivo'
}
function category(x){
 var title=norm(x.t||''),sec=norm(x.sec||''),str=norm((x.s||'')+' '+sec+' '+title);
 var isPractice=/pratica|practica|lamina|laminario|macroscopia|microscopia|laboratorio/.test(sec+' '+title);
 // Provas da prática não podem cair em "Lâminas"; priorizar exames e simulados.
 var isExam=(/provas?|pruebas?|examen|avaliac|evaluac|parcial|simulad|questionario|cuestionario|questoes|exercicios/.test(title)&&!/^repasso|^repaso|^resumo/.test(title))
    ||/\b(provas|questionarios|simulados|avaliacoes|evaluaciones)\b/.test(sec)
    ||/\bfinal\b/.test(title)&&!/repasso|repaso|resumo|revision/.test(title);
 if(isExam)return ['provas',isPractice?'practice':'theory','provas'];
 if(/^video\//.test(x.m||''))return ['videos',isPractice?'practice':'theory','videos'];
 if(/^audio\//.test(x.m||''))return ['audios',isPractice?'practice':'theory','audios'];
 if(isPractice)return ['pratica','practice',/macroscopia/.test(str)?'macro':'laminas'];
 if(/slide|aula|teorica|teoria|clase|presentacion/.test(str))return ['slides','theory','slides'];
 if(/^image\//.test(x.m||''))return ['complementares','theory','fotos'];
 return ['complementares','theory','complementares'];
}
function apply(DB,period,cohort){
 if(!DB||!DB.subjects)return 0;
 state.context={DB:DB,period:period,cohort:cohort};
 if(!state.loaded)return 0;
 var num=Number(String(period||5).match(/\d+/)?.[0]||5);
 var c=String(cohort||'G').toUpperCase();
 var selected=state.items.filter(x=>Number(x.p)===num&&(x.c===c||(x.cohorts||[]).includes(c)));
 var count=0;
 var exists=new Set();
 Object.keys(DB.subjects).forEach(function(s){
   ['slides','provas','audios','videos','pratica','complementares'].forEach(function(t){(DB.subjects[s][t]||[]).forEach(function(f){if(f.id)exists.add(String(f.id))})});
 });
 selected.forEach(function(x){
   if(!x.id||exists.has(String(x.id)))return;
   var name=subjectName(x.s);
   var gradeName=Object.keys(DB.subjects).find(function(key){return norm(key)===norm(name)&&Number(DB.subjects[key].period)===num});
   if(!gradeName)return; // Jamais criar disciplina a partir de pasta ou arquivo.
   var subject=DB.subjects[gradeName],info=category(x),cat=info[0];
   if(!Array.isArray(subject[cat]))subject[cat]=[];
   var item={
    title:x.t,period:'Turma '+c+(x.sec?' · '+x.sec:''),
    kind:extKind(x),id:x.id,
    uid:'sinus_drive_'+String(x.id).replace(/[^a-zA-Z0-9_-]/g,''),
    active:true,studyMode:info[1],studySection:info[2],
    mime:x.m||'',source:'drive-indexado'
   };
   subject[cat].push(item);
   if(cat==='pratica')subject.mode='Teoria + Prática';
   exists.add(String(x.id));count++;
 });
 state.applied=num+'º/'+c;state.added=count;return count;
}
function lateApply(){
 try{
 const ctx=state.context,app=W.SinusApp,S=app?.S;
 if(!ctx||!S||!S.dentro)return;
 const count=apply(ctx.DB,ctx.period,ctx.cohort);
 if(count){
  if(typeof W.renderSubjects==='function')W.renderSubjects();
  if(typeof W.renderLibrary==='function')W.renderLibrary();
 }
 }catch(e){/* sem impedir o uso de matérias existentes */}
}
state.ready=Promise.allSettled(CATALOGS.map(async function(path){
 const r=await fetch(path,{cache:'no-store'});
 if(!r.ok)throw Error(path+': HTTP '+r.status);
 const data=await r.json();return {path,items:Array.isArray(data.items)?data.items:[]};
})).then(function(rs){
 var map=new Map();
 rs.forEach(function(v,i){
  if(v.status!=='fulfilled'){state.errors.push(CATALOGS[i]);return}
  state.counts[v.value.path]=v.value.items.length;
  v.value.items.forEach(function(x){
   if(!x||!/^[a-zA-Z0-9_-]{10,}$/.test(x.id||''))return;
   const k=x.id+'|'+x.p+'|'+subjectName(x.s);
   if(!map.has(k))map.set(k,{...x,cohorts:[x.c]});
   else {const obj=map.get(k);obj.cohorts=Array.from(new Set(obj.cohorts.concat(x.c)))}
  });
 });
 state.items=Array.from(map.values());state.loaded=true;state.loading=false;
 lateApply();W.dispatchEvent(new CustomEvent('sinus:drive-ready',{detail:{count:state.items.length,errors:state.errors}}));
 return state.items;
}).catch(function(e){state.errors.push(String(e));state.loading=false;return []});
W.SinusDrive={state:state,apply:apply,ready:state.ready,refresh:lateApply};
})(window);
