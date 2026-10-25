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
assert.match(html, /subject-resource-balloons\.js\?v=20261025-no-priority-photos/);
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
