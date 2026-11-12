// SINUS · Anatomía Patológica I · 2ª parcial: leva o banco da aula (aulas/lesion/p2/dados.js)
// para a aba Treino → Exercícios da matéria (todas as turmas do 5º período).
// Uso (na raiz do repositório):  node tools/apostila-lesion-p2/exercicios-sinus.js
// Saída: aulas/lesion/p2/exercicios.js  (window.SINUS_EXERCICIOS_APOSTILA.anatopato)
'use strict';
const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..', '..');
const ctx = {};
new Function('window', fs.readFileSync(path.join(raiz, 'aulas/lesion/p2/dados.js'), 'utf8'))(ctx);
const D = ctx.SINUSAL_P2_DADOS;

const TEMAS = [
  ['nec', 'Necrosis', 'Clase 4'],
  ['apo', 'Apoptosis', 'Clase 5'],
  ['acu', 'Acumulación: lípidos y glucógeno', 'Clase 6'],
  ['c7', 'Proteínas, amiloide, calcio', 'Clase 7'],
  ['pig', 'Pigmentos', 'Clase 7'],
  ['inf', 'Inflamación aguda', 'Clase 9'],
  ['cro', 'Inflamación crónica', 'Fora do slide']
];
const fonte = {};
D.fontes.forEach(f => { fonte[f.id] = f.titulo; });

function questao(q) {
  const o = { f: (fonte[q.p] || '') + (q.n ? ' · questão ' + q.n : '') };
  if (q.t === 'mc') {
    o.q = q.q; o.ops = q.o; o.r = q.ok.length === 1 ? q.ok[0] : q.ok.slice(); o.w = q.w;
    if (q.e) o.ex = q.e;
  } else if (q.t === 'vf') {
    o.q = q.q; o.ops = ['Verdadero', 'Falso']; o.r = q.ok ? 0 : 1; o.ex = q.e;
  } else {
    /* cita / completar: resposta aberta, o aluno compara e marca Acertei ou Errei */
    o.q = q.q; o.aberta = 1; o.a = q.a; o.ex = q.e;
  }
  return o;
}

const blocos = TEMAS.map(([id, titulo, clase]) => ({
  id, titulo, clase,
  questoes: D.qs.filter(q => q.tema === id).map(questao)
})).filter(b => b.questoes.length);

const total = blocos.reduce((n, b) => n + b.questoes.length, 0);
if (total !== D.qs.length) throw new Error('questões sem tema: ' + (D.qs.length - total));

const out = '/* Sinus · Exercícios de Anatomía Patológica I · 2ª parcial (aba Treino → Exercícios).\n' +
  '   Gerado por tools/apostila-lesion-p2/exercicios-sinus.js a partir de aulas/lesion/p2/dados.js. Não editar à mão. */\n' +
  'window.SINUS_EXERCICIOS_APOSTILA = window.SINUS_EXERCICIOS_APOSTILA || {};\n' +
  'window.SINUS_EXERCICIOS_APOSTILA.anatopato = ' + JSON.stringify({
    titulo: 'Anatomía Patológica I · 2ª parcial (provas antigas e bancos)',
    area: 'teoria',
    banco: '2ª parcial',
    pdf: '/aulas/lesion/p2/banco-questoes-p2.pdf?v=1',
    blocos
  }, null, 1) + ';\n';
fs.writeFileSync(path.join(raiz, 'aulas/lesion/p2/exercicios.js'), out);
console.log('exercicios.js:', total, 'questões em', blocos.length, 'temas');
