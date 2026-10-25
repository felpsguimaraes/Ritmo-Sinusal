/* SINUS — contrato da Cátedra para todas as turmas dos períodos 1 e 2. */
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const core=fs.readFileSync('sinus/painel-v17.js','utf8');
const anatomy=fs.readFileSync('sinus/anatomia-pratica-videos.js','utf8');
const catalog=fs.readFileSync('sinus/ucp-catedra-catalog.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const dbSrc=core.match(/const DEFAULT_DB = (\{.*\});\s*\nlet DB;/s);
const gradeSrc=core.match(/const DRIVE_CATALOG = (\{.*\});\s*\nconst DEFAULT_DB =/s);
assert.ok(dbSrc && gradeSrc,'Grade base do SINUS indisponível');
const DB=JSON.parse(dbSrc[1]);
const drive=JSON.parse(gradeSrc[1]);
const begin=core.indexOf('(function ensureAnatomyForEveryCohort(){');
assert.ok(begin>=0,'Cadastro universal de Anatomia não encontrado');
const end=core.indexOf('})();',begin);
assert.ok(end>begin,'Final do cadastro universal não encontrado');
const init=core.slice(begin,end+5);
vm.runInNewContext(init,{DB});
vm.runInNewContext(init,{DB});
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
for(const [period,roman] of [[1,'i'],[2,'ii']]){
  const names=Object.entries(DB.subjects)
    .filter(([,v])=>Number(v.period)===period&&v.active!==false)
    .map(([k])=>k);
  const anatomyNames=names.filter(k=>normalize(k)==='anatomia '+roman);
  assert.equal(anatomyNames.length,1,'Anatomia '+roman+' ausente/duplicada no '+period+'º período');
  const cohorts=Object.keys(drive.periods[String(period)]||{});
  assert.ok(cohorts.length>=5,'Turmas do '+period+'º período não indexadas');
  for(const cohort of cohorts){
    const visible=Object.entries(DB.subjects).filter(([,v])=>Number(v.period)===period&&v.active!==false);
    assert.ok(visible.some(([name])=>normalize(name)==='anatomia '+roman),'Turma '+cohort+' ('+period+'º) sem Anatomia');
  }
  console.log('Período '+period+': Cátedra habilitada para turmas '+cohorts.join(', '));
}
// Validar também a grade efetiva utilizada após o login.
// A sincronização do aluno substitui DB.subjects pelas matérias oficiais da turma.
const official={};
vm.runInNewContext(fs.readFileSync('sinus/calendario-dados.js','utf8'),{window:official});
vm.runInNewContext(fs.readFileSync('sinus/calendario-motor.js','utf8'),{window:official});
for(const [period,roman] of [[1,'i'],[2,'ii']]){
  const cohorts=official.SinusTimetable.cohorts(String(period));
  assert.deepEqual(cohorts,Object.keys(drive.periods[String(period)]||{}).sort(),'Turmas oficiais diferem do cadastro da grade');
  for(const cohort of cohorts){
    const subjects=official.SinusTimetable.academicOptions(period,cohort);
    const match=subjects.filter(row=>normalize(row.title)==='anatomia '+roman);
    assert.equal(match.length,1,'Grade oficial não inclui Anatomia '+roman+' para a turma '+cohort);
    assert.ok(match[0].activities.some(x=>x.kind==='practice'), 'Falta prática de Anatomia para '+period+'º '+cohort);
  }
}
console.log('OK: grades OFICIAIS de 19 turmas incluem Anatomia e aulas práticas.');

assert.match(anatomy,/items\.sort\(\(a,b\)=>Number\(b\.source==='drive'\)-Number\(a\.source==='drive'\)\)/);
assert.ok(!anatomy.includes('data-apv-source='),'Drive e YouTube não podem estar em listas distintas');
assert.ok(anatomy.includes("if(tab==='catedra'&&course())"),'Cátedra sem navegação');
assert.ok(anatomy.includes("W.SinusAccess.authorize('videos','view')"),'Cátedra deve respeitar acesso a Vídeos');
assert.ok(html.includes('anatomy-period-1-2-all-cohorts'),'Página não referencia a grade atualizada');
assert.ok(html.includes('catedra-navfix3-allcohorts'),'Página não referencia o player atualizado');
const match=catalog.match(/videos:(\[[\s\S]*?\])\};\}\)\(window\)/);
assert.ok(match,'Catálogo UCP ausente');
const videos=JSON.parse(match[1]);assert.equal(videos.length,53);
assert.ok(videos.some(x=>x.anatomyPeriod==='1'));assert.ok(videos.some(x=>x.anatomyPeriod==='2'));
console.log('OK: lista Drive → YouTube e 53 vídeos UCP vinculados, sem duplicar disciplinas.');
