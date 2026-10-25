'use strict';
/* Regressão: os slides da Biblioteca entram no leitor da respectiva matéria. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('sinus/subject-resource-balloons.js','utf8');
const biblioteca=fs.readFileSync('sinus/biblioteca-visual.js','utf8');
const med=JSON.parse(fs.readFileSync('biblioteca/dados/medicina.json','utf8')).items;
const catalog=med.filter(x=>x.cat==='slides').map(x=>({
 id:x.id,title:x.t,subject:x.s,academicPeriod:x.p,cohort:x.c,cat:x.cat,
 studySection:x.section,studyMode:x.area,mime:x.m
}));
const expected=catalog.filter(x=>x.subject==='Fisiología I'&&x.academicPeriod===3).length;
assert.ok(expected>=40,'O catálogo de Fisiologia deve conter dezenas de slides.');
catalog.push(
 {id:'uploaded:meu-slide-privado',title:'Minha apresentação.pdf',subject:'Fisiología I',
  academicPeriod:3,cat:'slides',mime:'application/pdf',uploaded:true},
 {id:'1rawPdfClase1234567890abcdefghijkl',title:'Clase 12.pdf',subject:'Fisiología I',
  academicPeriod:3,cat:'complementares',mime:'application/pdf'},
 {id:'1rawPdfManual1234567890abcdefgh',title:'Manual de laboratório.pdf',subject:'Fisiología I',
  academicPeriod:3,cat:'complementares',mime:'application/pdf'},
 {id:'1outroPeriodo1234567890abcdefgh',title:'Slides 5º período.pptx',subject:'Fisiología I',
  academicPeriod:5,cat:'slides',mime:'application/vnd.openxmlformats-officedocument.presentationml.presentation'}
);
const window={
 SinusLibrary:{catalog:()=>catalog},addEventListener(){},
};
const document={head:{insertAdjacentHTML(){}}};
const DB={subjects:{'Fisiología I':{period:3,slides:[],complementares:[]}}};
const patched=source.replace('function setTabs(c,data){',
 'W.__testSlides={slideCollection,sectionIsSlides};\nfunction setTabs(c,data){');
assert.notEqual(patched,source,'Não foi possível instalar o gancho de testes.');
vm.runInNewContext(patched,{window,document,DB,URL,console});
const run=(subject,period,cohort='C')=>window.__testSlides.slideCollection({
 subject,period,cohort,tab:'slides',section:'slides',mode:'theory'
},{configs:{},items:[]});
const out=run('Fisiología I',3);
assert.equal(out.own.length,0,'Slides gerais não devem ser marcados como exclusivos da turma.');
assert.equal(out.library.length,expected+2,'Não mostrou os slides indexados e os PDFs privados/de aulas.');
assert.equal(out.library.filter(x=>x.uploaded).length,1);
assert.ok(out.library.find(x=>x.title==='Clase 12.pdf'));
assert.ok(!out.library.find(x=>x.title==='Manual de laboratório.pdf'));
assert.ok(!out.library.find(x=>x.title==='Slides 5º período.pptx'));
assert.ok(!out.library.find(x=>x.title.includes('Anatomía')));
assert.equal(window.__testSlides.sectionIsSlides({mode:'theory',tab:'slides'}),true);
assert.equal(window.__testSlides.sectionIsSlides({mode:'theory',tab:'videos'}),false);
assert.equal(window.__testSlides.sectionIsSlides({mode:'theory',tab:'provas'}),false);
assert.equal(window.__testSlides.sectionIsSlides({mode:'practice',tab:'slides'}),false);
const h=run('Histología I',1);
assert.equal(h.library.length,catalog.filter(x=>x.subject==='Histología I'&&x.academicPeriod===1).length);
assert.match(source,/showUploadedSlide/);
assert.match(biblioteca,/async function previewUploaded\(id\)/);
assert.match(biblioteca,/openUploaded,previewUploaded,openYoutube/);
console.log('OK: '+expected+' slides oficiais da Fisiología I, PDF de aula e upload privado; matéria/período corretos e sem player fora de Slides.');
