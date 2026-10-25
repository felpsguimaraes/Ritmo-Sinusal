/* SINUS · índice acadêmico auditado em 24/10/2026.
 * Somente metadados dos arquivos copiados para PROVAS; nunca altera arquivos,
 * permissões ou o catálogo original do aluno. A matéria só é vinculada quando
 * há identificação suficiente no nome auditado. */
(function(W){
'use strict';
var SOURCE='/biblioteca/dados/provas-auditadas.json?v=20261024';
var cats=['slides','provas','audios','videos','pratica','complementares'];
var state={items:[],ready:false,loading:true,error:'',count:0,unclassified:0,sourceCount:0};
var norm=function(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()};
var RULES=[
  [/anatom.*patol.*(?:\bii\b|\b2\b)|anatopato.*(?:\bii\b|\b2\b)|anatopa.*(?:\bii\b|\b2\b)/,'Anatomía Patológica II',6],
  [/anatom.*patol.*(?:\bi\b|\b1\b)|anatopato.*(?:\bi\b|\b1\b)/,'Anatomía Patológica I',5],
  [/anatom.*patol|anatopato|anatopa|coba|chamorro/,'Anatomía Patológica',null],
  [/semiolog.*(?:\bii\b|\b2\b)|semio.*(?:\bii\b|\b2\b)|fernanda brittez/,'Semiología Médica II',6],
  [/semiolog.*(?:\bi\b|\b1\b)|semio.*(?:\bi\b|\b1\b)/,'Semiología Médica I',5],
  [/semiolog|semio\b|brittez/,'Semiología Médica',null],
  [/farmacol.*(?:\bii\b|\b2\b)|farmaco.*(?:\bii\b|\b2\b)/,'Farmacología II',6],
  [/farmacol.*(?:\bi\b|\b1\b)|farmaco.*(?:\bi\b|\b1\b)|edgar pineda/,'Farmacología I',5],
  [/farmacol|farmaco|belem|belen/,'Farmacología',null],
  [/fisiopatol.*(?:\bii\b|\b2\b)|fisiopato.*(?:\bii\b|\b2\b)/,'Fisiopatología II',6],
  [/fisiopatol.*(?:\bi\b|\b1\b)|fisiopato.*(?:\bi\b|\b1\b)/,'Fisiopatología I',5],
  [/fisiopatol|fisiopato/,'Fisiopatología',null],
  [/fisiolog.*(?:\bii\b|\b2\b)|fisio.*(?:\bii\b|\b2\b)/,'Fisiología II',4],
  [/fisiolog.*(?:\bi\b|\b1\b)|fisio.*(?:\bi\b|\b1\b)/,'Fisiología I',3],
  [/fisiolog|fisio\b|fiso\b|eduardo zorrilla|federico/,'Fisiología',null],
  [/histolog.*(?:\bii\b|\b2\b)|histo.*(?:\bii\b|\b2\b)/,'Histología II',2],
  [/histolog.*(?:\bi\b|\b1\b)|histo.*(?:\bi\b|\b1\b)/,'Histología I',1],
  [/histolog|histo\b/,'Histología',null],
  [/microbiolog.*(?:\bii\b|\b2\b)|micro.*(?:\bii\b|\b2\b)/,'Microbiología II',4],
  [/microbiolog.*(?:\bi\b|\b1\b)|micro.*(?:\bi\b|\b1\b)/,'Microbiología I',3],
  [/microbiolog|micro\b|micosis|micologia|gramnegativo|grampositivo/,'Microbiología',null],
  [/bioquim.*(?:\bii\b|\b2\b)|bioq.*(?:\bii\b|\b2\b)/,'Bioquímica II',4],
  [/bioquim.*(?:\bi\b|\b1\b)|bioq.*(?:\bi\b|\b1\b)/,'Bioquímica I',3],
  [/bioquim|bioq\b/,'Bioquímica',null],
  [/anatom.*(?:\bii\b|\b2\b)|anato.*(?:\bii\b|\b2\b)/,'Anatomía II',2],
  [/anatom.*(?:\bi\b|\b1\b)|anato.*(?:\bi\b|\b1\b)/,'Anatomía I',1],
  [/anatom|anato\b|victor benitez|dr victor|latarjet/,'Anatomía',null],
  [/embriolog|dra\.? karen/,'Embriología',1],
  [/genetic|gene[st]ica/,'Genética',3],
  [/inmunolog|imunolog|inmuno|imuno/,'Inmunología',3],
  [/biofis/,'Biofísica',3],
  [/bioestat|biostat/,'Bioestadística',2],
  [/guarani/,'Guaraní',2],
  [/neurolog/,'Neurología',null],
  [/nutricion|nutri\b|nutricao/,'Nutrición',null],
  [/biolog|bio \bi\b/,'Biología',1],
  [/imagenolog|radiolog|diagnostico por imagen|imagen dra aguirre/,'Imagenología',5],
  [/neumolog|neumonia|tuberculosis/,'Neumología',null],
  [/anestes/,'Anestesiología',7],
  [/parasitolog/,'Parasitología',null],
  [/medicina comunitaria/,'Medicina Comunitaria',null],
  [/ingles instrumental/,'Inglés Instrumental',null],
  [/m[aá]cro(?:scopia)? prova pratica final.*fabio/,'Anatomía Patológica I',5],
  [/josue/,'Biofísica',null]
];
function discipline(t){var text=norm(t);for(var i=0;i<RULES.length;i++)if(RULES[i][0].test(text))return {name:RULES[i][1],period:RULES[i][2]};return {name:'Matéria a confirmar',period:null}}
function format(m,t){m=String(m||'').toLowerCase();if(m.indexOf('image/')===0||/\.(jpe?g|png|webp|heic)$/i.test(t))return 'Imagem';if(m.indexOf('presentation')>=0||/\.pptx?$/i.test(t))return 'Slides';if(m.indexOf('wordprocessing')>=0||m.indexOf('document')>=0||/\.docx?$/i.test(t))return 'Documento';if(m.indexOf('pdf')>=0||/\.pdf$/i.test(t))return 'PDF';return 'Arquivo'}
function subtype(x){var t=norm(x.t);if(x.k==='fotos_provas')return 'foto-prova';if(x.k==='retroalimentacoes')return 'correcao';if(x.k==='revisoes')return 'revisao';if(x.k==='questionarios'){if(/simulado/.test(t))return 'simulado';if(/banco de quest|banco de pergunt/.test(t))return 'banco';return 'questionario'}if(/simulado/.test(t))return 'simulado';if(/repasso|repaso|revisao|revision/.test(t))return 'revisao';if(/questionario|cuestionario|questoes|preguntas|ejercicios|exercicios/.test(t))return 'questionario';return 'prova'}
function normalizeFile(x){var d=discipline(x.t),sub=subtype(x),m=String(x.t).match(/\[([a-z0-9_-]{6,14})\](?:\.[a-z0-9]+)?$/i);var label={'prova':'Prova','foto-prova':'Foto de prova','questionario':'Questionário','simulado':'Simulado','banco':'Banco de questões','revisao':'Revisão','correcao':'Correção'}[sub]||'Documento';
return {id:x.id,title:x.t,subject:d.name,academicPeriod:d.period,period:d.period?d.period+'º período · acervo auditado':'Acervo auditado · período a confirmar',cat:(sub==='prova'||sub==='foto-prova')?'provas':'complementares',kind:format(x.m,x.t),mime:x.m,auditType:sub,auditLabel:label,source:'auditoria-provas',studyMode:'theory',studySection:sub==='prova'||sub==='foto-prova'?'provas':'complementares',active:true,requiresGooglePermission:true,originalSuffix:m?m[1]:'',searchTags:[label,d.name,sub,format(x.m,x.t)].join(' '),confidence:d.period?'identificada':d.name==='Matéria a confirmar'?'pendente':'disciplina sem período'};}
function apply(){if(typeof DB==='undefined'||!DB||!DB.subjects||!state.ready)return 0;var existing=new Set(),existingOrigin=new Set();Object.values(DB.subjects).forEach(function(s){cats.forEach(function(c){(s[c]||[]).forEach(function(f){if(f.id)existing.add(String(f.id));var t=String(f.title||'');var m=t.match(/\[([a-z0-9_-]{6,14})\](?:\.[a-z0-9]+)?$/i);if(m)existingOrigin.add(m[1]);});});});
var n=0;state.items.forEach(function(item){if(item.subject==='Matéria a confirmar'||!item.academicPeriod||existing.has(item.id))return;/* O acervo auditado prevalece na Biblioteca, sem substituir o original dentro da matéria. */if(item.originalSuffix&&existingOrigin.has(item.originalSuffix))return;
var s=DB.subjects[item.subject];if(!s){s=DB.subjects[item.subject]={id:'audit_'+norm(item.subject).replace(/[^a-z0-9]+/g,'_'),period:item.academicPeriod,active:true,teacher:'',mode:'Teoria',accent:'mint',slides:[],provas:[],audios:[],videos:[],pratica:[],complementares:[]};}
if(!Array.isArray(s[item.cat]))s[item.cat]=[];s[item.cat].push({...item,uid:'audit_'+item.id});existing.add(item.id);if(item.originalSuffix)existingOrigin.add(item.originalSuffix);n++;});return n;}
function refresh(){var added=apply();if(added&&W.SinUSApp?.S?.dentro){W.renderSubjects?.();}if(typeof UI!=='undefined'&&UI.page==='library')W.renderLibrary?.();}
state.promise=fetch(SOURCE,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Índice PROVAS HTTP '+r.status);return r.json()}).then(function(data){state.items=(data.items||[]).map(normalizeFile);state.ready=true;state.loading=false;state.count=state.items.length;state.unclassified=state.items.filter(x=>x.subject==='Matéria a confirmar').length;state.sourceCount=data.count||0;refresh();return state.items}).catch(function(e){state.loading=false;state.error=String(e);return []});
W.addEventListener('sinus:drive-ready',refresh);
var oldNav=W.nav;if(oldNav)W.nav=function(){apply();return oldNav.apply(this,arguments)};
var oldRenderAll=W.renderAll;if(oldRenderAll)W.renderAll=function(){apply();return oldRenderAll.apply(this,arguments)};
W.SinusAcervoAuditado={state:state,apply:apply,refresh:refresh,ready:state.promise,get items(){return state.items}};
})(window);
