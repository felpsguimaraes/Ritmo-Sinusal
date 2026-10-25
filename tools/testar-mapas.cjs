const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'../mapas'),ctx={window:{}};vm.createContext(ctx);
const dados=fs.readdirSync(path.join(root,'dados')).filter(f=>f.endsWith('.js')).sort((a,b)=>(a.includes('-')-b.includes('-'))||a.localeCompare(b)).map(f=>'dados/'+f);
for(const file of dados.concat(['mapas-core.js','gabaritos-revisados.js']))vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const core=ctx.MapasCore;let count=0,reviewed=0;
for(const [sid,data] of Object.entries(ctx.window.SINUS_MAPAS))for(const module of data.modulos){
 core.compile(module);
 for(const it of module._items.concat(module._ditems||[])){
  const r=ctx.window.SINUS_MAPAS_REVISAO[sid+'/'+it.id];if(r){it.ans=r.answer;it.acceptedAnswers=r.accepted;it.answerSet=r.answerSet;it.minimum=r.minimum;if(r.source)reviewed++;}
  assert.equal(core.evaluate(it,it.ans),'ok',it.id);
  assert.equal(core.evaluate(it,''),'empty',it.id);
  if(it.mc){assert.equal(core.evaluate(it,it.ans.charAt(0)),'ok');continue;}
  assert.equal(core.evaluate(it,'  '+it.ans.toUpperCase()+'  '),'ok',it.id);
  if(!it.answerSet && it.ans.length>2) assert.notEqual(core.evaluate(it,it.ans.slice(0,-1)),'ok',it.id);
  count++;
 }
}
let item={ans:'Principio activo',keys:[['principio activo','activo']]};
for(const answer of ['activo','Principio activ','No es principio activo','Principio activo o placebo'])assert.notEqual(core.evaluate(item,answer),'ok');
assert.notEqual(core.evaluate(item,'No es principio activo',true),'ok');
assert.equal(core.evaluate(item,'Principio activo\nOtro término',true),'ok');
assert.notEqual(core.evaluate({ans:'Farmacocinética',keys:[['farmacocinet']]},'Farmacocinetica'),'ok');
assert.equal(core.evaluate({ans:'Consentimiento informado',acceptedAnswers:['Consentimiento informado','Validez científica'],keys:[]},'Validez científica'),'ok');
assert.equal(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('demo-seed'),false);
console.log(JSON.stringify({textFieldsIncludingHiddenCells:count,reviewedTerms:reviewed,regressionChecks:'passed'}));

const set={ans:'Miosis; Salivación',answerSet:['Miosis','Salivación','Sudoración'],minimum:2};
assert.equal(core.evaluate(set,'Sudoración; Miosis'),'ok');
assert.notEqual(core.evaluate(set,'Miosis; Miosis'),'ok');
assert.notEqual(core.evaluate(set,'Miosis; Salivación; falso'),'ok');
assert.notEqual(core.evaluate(set,'Miosi; Salivació'),'ok');
