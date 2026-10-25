'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('sinus/subject-resource-balloons.js','utf8');
const gallerySource=fs.readFileSync('sinus/materias-galeria-acervo.js','utf8');
const html=fs.readFileSync('index.html','utf8');
assert.match(source,/function examPhotos\(c\)/);
assert.match(source,/function renderExamHighlights\(wrap,c,photos\)/);
assert.match(source,/const own=customFiles\(c,data\),suggested=libraryFiles\(c,own\),photos=examPhotos\(c\)/);
assert.match(source,/renderExamHighlights\(wrap,c,photos\)/);
assert.match(gallerySource,/W\.SinusGaleriaMateria=\{render,items,isExam,isImage,isVideo,card\}/);
assert.match(html,/subject-resource-balloons\.js\?v=20261025-exam-photo-featured/);
assert.match(html,/materias-galeria-acervo\.js\?v=20261025-exam-photo-cards/);
const begin=source.indexOf('function examPhotos(c){');
const end=source.indexOf('function suggestionTotal(',begin);
assert.ok(begin>=0&&end>begin);
const fixtures=[
 {id:'photo-1',subject:'Anatomía I',academicPeriod:1,cat:'provas',mime:'image/jpeg'},
 {id:'photo-other-period',subject:'Anatomía I',academicPeriod:2,cat:'provas',mime:'image/jpeg'},
 {id:'pdf-exam',subject:'Anatomía I',academicPeriod:1,cat:'provas',mime:'application/pdf'},
 {id:'non-exam-image',subject:'Anatomía I',academicPeriod:1,cat:'complementares',mime:'image/png'},
 {id:'photo-other-subject',subject:'Histología I',academicPeriod:1,cat:'provas',mime:'image/png'},
 {id:'uploaded-photo',subject:'Anatomía I',academicPeriod:null,uploaded:true,cat:'provas',mime:'image/png'},
 {id:'photo-1',subject:'Anatomía I',academicPeriod:1,cat:'provas',mime:'image/jpeg'},
 ...Array.from({length:12},(_,i)=>({id:'extra-'+i,subject:'Anatomía I',academicPeriod:1,cat:'provas',mime:'image/jpeg'}))
];
let subject='Anatomía I',period=1;
const gallery={
 items:()=>fixtures.filter(x=>x.subject===subject),
 isImage:x=>/^image\//.test(x.mime),
 isExam:x=>x.cat==='provas',
 card:x=>x.id
};
const context=vm.createContext({W:{SinusGaleriaMateria:gallery},console});
vm.runInContext(source.slice(begin,end),context);
const get=(c)=>Array.from(vm.runInContext('examPhotos('+JSON.stringify(c)+')',context)).map(x=>x.id);
let actual=get({subject,period,cohort:'A'});
assert.ok(actual.includes('photo-1'));
assert.ok(actual.includes('uploaded-photo'));
assert.ok(!actual.includes('photo-other-period'));
assert.ok(!actual.includes('pdf-exam'));
assert.ok(!actual.includes('non-exam-image'));
assert.ok(!actual.includes('photo-other-subject'));
assert.equal(new Set(actual).size,actual.length);
assert.equal(actual.length,8);
period=2;
actual=get({subject,period,cohort:'A'});
assert.ok(actual.includes('photo-other-period'));
assert.ok(!actual.includes('photo-1'));
subject='Histología I';
actual=get({subject,period:1,cohort:'B'});
assert.deepEqual(actual,['photo-other-subject']);
console.log('OK: fotos reais de provas priorizadas, sem misturar matérias/períodos, com máximo de 8 prévias.');
