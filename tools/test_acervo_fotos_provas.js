'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('sinus/subject-resource-balloons.js', 'utf8');
const gallery = fs.readFileSync('sinus/materias-galeria-acervo.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

// A preferência editorial do administrador não deve aparecer como bloco prioritário aos alunos.
assert.doesNotMatch(source, /SUGESTÕES PRIORITÁRIAS|function renderExamHighlights|sxAOExamHighlights|Fotos de provas/);
assert.match(source, /sxAOLibraryItems/);
assert.match(gallery, /title='Provas e avaliações'/);
assert.doesNotMatch(gallery, /Fotos de provas/);
assert.match(html, /subject-resource-balloons\.js\?v=20261025-preview-office-fix2/);
assert.match(html, /materias-galeria-acervo\.js\?v=20261025-exam-label-cleanup/);

// Os materiais continuam classificados e acessíveis na aba Provas, sem vazamento entre turmas.
const from=gallery.indexOf('const norm='), to=gallery.indexOf('function kind(x){',from);
assert.ok(from>=0&&to>from,'Trecho de filtros da Biblioteca não encontrado');
const library=[
 {id:'photo-c',subject:'Anatomía I',academicPeriod:1,cohort:'C',cat:'provas',mime:'image/jpeg',title:'Avaliação P1'},
 {id:'exam-pdf',subject:'Anatomía I',academicPeriod:1,cohort:'C',cat:'provas',mime:'application/pdf',title:'Prova objetiva'},
 {id:'photo-d',subject:'Anatomía I',academicPeriod:1,cohort:'D',cat:'provas',mime:'image/jpeg',title:'Avaliação turma D'},
 {id:'photo-wrong-period',subject:'Anatomía I',academicPeriod:2,cohort:'C',cat:'provas',mime:'image/jpeg',title:'Avaliação outro período'},
 {id:'other-subject',subject:'Histología I',academicPeriod:1,cohort:'C',cat:'provas',mime:'image/png',title:'Avaliação histologia'},
 {id:'non-exam',subject:'Anatomía I',academicPeriod:1,cohort:'C',cat:'complementares',mime:'image/png',title:'Esquema didático'},
 {id:'photo-c',subject:'Anatomía I',academicPeriod:1,cohort:'C',cat:'provas',mime:'image/jpeg',title:'Avaliação P1 duplicada'}
];
const W={SinusLibrary:{catalog:()=>library},SinusApp:{S:{turma:'C'}}};
const UI={subject:'Anatomía I'};
const DB={subjects:{'Anatomía I':{period:1}}};
const ctx=vm.createContext({W,UI,DB});
vm.runInContext(gallery.slice(from,to),ctx);
const items=()=>Array.from(vm.runInContext('items()',ctx));
const found=items();
assert.deepEqual(found.map(x=>x.id),['photo-c','exam-pdf','non-exam']);
assert.equal(vm.runInContext('isExam(items()[0])',ctx),true);
assert.equal(vm.runInContext('isImage(items()[0])',ctx),true);
assert.equal(vm.runInContext('isExam(items()[1])',ctx),true);
assert.equal(vm.runInContext('isImage(items()[1])',ctx),false);
assert.equal(vm.runInContext('isExam(items()[2])',ctx),false);
W.SinusApp.S.turma='D';
assert.deepEqual(items().map(x=>x.id),['photo-d']);
console.log('OK: bloco editorial removido; Provas preservadas e corretamente filtradas por matéria, período e turma.');

// Regressão da navegação: TEORIA · SLIDES só pertence à aba Slides.
// Nenhum player de slides deve disputar espaço com Vídeos / Áudios, Provas e Treino.
const viewerOrder=fs.readFileSync('sinus/subject-viewer-order.js','utf8');
const slideshowStart=source.indexOf('function sectionIsSlides(c){');
const slideshowEnd=source.indexOf('function libraryMarkup(suggested){',slideshowStart);
const nativeStart=source.indexOf('function prioritizeNative(host,wrap,c){');
const nativeEnd=source.indexOf('function render(c,data){',nativeStart);
assert.ok(slideshowStart>=0&&slideshowEnd>slideshowStart&&nativeStart>=0&&nativeEnd>nativeStart);
const sourceQA=source.slice(slideshowStart,slideshowEnd)+'\n'+source.slice(nativeStart,nativeEnd);
const tabs=vm.createContext({});
vm.runInContext(sourceQA,tabs);
const isSlide=(tab,mode='theory')=>vm.runInContext('sectionIsSlides('+JSON.stringify({tab,mode})+')',tabs);
assert.equal(isSlide('slides'),true);
for(const tab of ['videos','audios','provas','training','overview','cartoes','mapas','pratica']){
 assert.equal(isSlide(tab),false,'Outro player invadido por Slides: '+tab);
}
assert.equal(isSlide('slides','practice'),false);

function testNativeOrder(tab){
 const children=[],moved=[],removed=[];
 const remind={id:'Lembretes',matches:selector=>selector.includes('.sinus-rem-box')};
 const main={id:tab==='videos'?'Vídeos / Áudios':tab==='provas'?'Provas':'Treino',matches:selector=>selector.includes('.resourceLayout'),remove(){removed.push(this.id)}};
 const gallery={id:'Galeria da matéria',matches:selector=>selector.includes('.sxMG'),remove(){removed.push(this.id)}};
 const remSlot={replaceChildren:node=>moved.push('primeiro:'+node.id)};
 const primary={appendChild:node=>moved.push('principal:'+node.id)};
 const wrap={querySelector:selector=>selector==='.sxAOReminders'?remSlot:
  selector==='[data-sx-primary]'&&tab!=='slides'?primary:null};
 children.push(wrap,remind,main,gallery);
 vm.runInContext('prioritizeNative',tabs)({children},wrap,{tab,mode:'theory'});
 return {moved,removed};
}
const slideState=testNativeOrder('slides');
assert.deepEqual(slideState.removed,['Treino','Galeria da matéria']);
for(const tab of ['videos','provas','training']){
 const result=testNativeOrder(tab);
 assert.deepEqual(result.removed,[]);
 assert.equal(result.moved[0],'primeiro:Lembretes');
 assert.ok(result.moved[1]?.startsWith('principal:'),tab+' perdeu o conteúdo próprio');
}
assert.match(source,/slideOnly\?slideHTML:primaryHTML\+libraryMarkup/);
assert.match(source,/if\(slideOnly\)\{\s*drawSlides\(c,data,wrap,true\)/);
assert.match(viewerOrder,/primary\.appendChild\(el\)/);
assert.match(viewerOrder,/new MutationObserver\(schedule\)/);
assert.match(html,/subject-resource-balloons\.js\?v=20261025-preview-office-fix2/);
assert.match(html,/subject-viewer-order\.js\?v=20261025-players-by-tab-v1/);
console.log('OK: Slides exclusivos da aba Slides; Vídeos, Provas e Treino priorizam seus componentes, após Lembretes.');

