#!/usr/bin/env node
/* Teste automático dos mapas guiados: cada resposta-modelo precisa ser aceita pelas próprias chaves,
   chaves curtas demais e respostas "entregues" na pista são avisadas. Uso: node tools/testar-mapas.js */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const Core = require('../mapas/mapas-core.js');
const dir = path.join(__dirname, '..', 'mapas', 'dados');
const sandbox = { window: {} }; vm.createContext(sandbox);
/* a mesma ordem da página: primeiro a matéria (anatopato.js), depois os complementos (anatopato-pratica.js) */
fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort((a, b) => (a.includes('-') - b.includes('-')) || a.localeCompare(b)).forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f }));
const DATA = sandbox.window.SINUS_MAPAS || {};
let erros = 0, avisos = 0, total = 0;
const err = m => { erros++; console.log('  ERRO  ' + m); };
const warn = m => { avisos++; console.log('  aviso ' + m); };
/* prática: cada lâmina precisa aceitar a própria resposta, achar todos os achados no texto-modelo
   e não aceitar o órgão ou o dx de outra lâmina (salvo quando é o mesmo diagnóstico em outro órgão) */
function testarLaminas(m) {
  const fotos = new Set();
  for (const t of m._tree) {
    const L = t.L, tag = m.id + ' [' + (L.nome || t.key) + ']';
    if (!L.img || !L.img.length) warn(tag + ' → sem foto');
    for (const im of L.img || []) {
      if (!im.src && !im.drive) err(tag + ' → foto sem src/drive');
      if (im.src && !fs.existsSync(path.join(__dirname, '..', 'mapas', im.src))) err(tag + ' → arquivo não existe: ' + im.src);
      const key = im.src || im.drive; if (fotos.has(key) && !m.sorteo) warn(tag + ' → foto repetida em outra lâmina: ' + key); fotos.add(key);
    }
    for (const it of [t.o, t.p, t.x]) {
      if (!it.keys.length) err(tag + ' ' + it.label + ' → sem chaves');
      if (Core.evaluate(it, it.ans) !== 'ok') err(tag + ' ' + it.label + ' → resposta-modelo "' + it.ans + '" não aceita');
      for (const lixo of ['nao sei', 'xxxxx', 'a']) if (Core.evaluate(it, lixo) === 'ok') warn(tag + ' ' + it.label + ' → "' + lixo + '" foi aceito');
    }
    if (!t.d.length) err(tag + ' → descrição sem achados');
    const texto = t.d.map(it => it.ans).join('. ');
    for (const it of t.d) if (Core.evaluate(it, texto, true) !== 'ok') err(tag + ' descrição → "' + it.ans + '" não reconhecido no texto-modelo');
    if (t.d.some(it => Core.evaluate(it, 'no se ve nada', true) === 'ok')) warn(tag + ' → descrição aceita texto vazio de sentido');
    for (const u of m._tree) {
      if (u === t) continue;
      if (Core.norm(u.o.ans) !== Core.norm(t.o.ans) && Core.evaluate(t.o, u.o.ans) === 'ok') err(tag + ' órgão aceita "' + u.o.ans + '"');
      const mesmoTipo = /carcinoma/i.test(t.x.ans) && /carcinoma/i.test(u.x.ans);
      if (u.g !== t.g && !mesmoTipo && Core.norm(u.x.ans) !== Core.norm(t.x.ans) && Core.evaluate(t.x, u.x.ans) === 'ok') err(tag + ' dx aceita "' + u.x.ans + '"');
    }
    if (m.banco && m.procesos) {
      const ok1 = m.procesos.some(c => Core.evaluate(t.p, c) === 'ok');
      const ok2 = ok1 || m.procesos.some(a => m.procesos.some(b => a !== b && Core.evaluate(t.p, a + ' + ' + b) === 'ok'));
      if (!ok2) err(tag + ' → nenhuma combinação do banco de processos dá a resposta "' + t.p.ans + '"');
    }
  }
  const ids = m._tree.map(t => t.key); if (new Set(ids).size !== ids.length) err(m.id + ': lâmina repetida');
  if (m.sorteo) { const g = new Set(m._tree.map(t => t.g)); if (g.size < m.sorteo) err(m.id + ': poucos grupos para sortear ' + m.sorteo); }
  if (m.par && !DATA[m.sid || 'anatopato'].modulos.some(x => x.id === m.par)) err(m.id + ': par inexistente ' + m.par);
}

for (const sid of Object.keys(DATA)) {
  const S = DATA[sid]; const ids = new Set();
  console.log('\n' + S.nome + ' — ' + S.modulos.length + ' módulos');
  for (const m of S.modulos) {
    m.sid = sid;
    if (ids.has(m.id)) err('id repetido: ' + m.id); ids.add(m.id);
    try { Core.compile(m); } catch (e) { err(m.id + ': ' + e.message); continue; }
    const n = m._items.length; total += n;
    if (!n) err(m.id + ': sem lacunas');
    console.log('  ' + (m.clase + '').padEnd(13) + m.tipo.padEnd(6) + String(n).padStart(3) + ' campos  ' + m.titulo + (m.nivel ? '  (nível ' + m.nivel + ')' : ''));
    if (m.tipo === 'laminas') { testarLaminas(m); continue; }
    for (const it of m._items) {
      const tag = m.id + ' [' + (it.label || '') + '] ' + (it.hint || it.ans);
      if (!it.keys.length) err(tag + ' → sem chaves');
      const r = Core.evaluate(it, it.ans);
      if (r !== 'ok') err(tag + ' → resposta-modelo "' + it.ans + '" deu ' + r);
      if (Core.evaluate(it, '') !== 'empty') err(tag + ' → vazio não é vazio');
      if (it.mc) {
        const letras = it.opts.map(o => Core.norm(o).charAt(0));
        if (letras.indexOf(it.keys[0][0]) < 0) err(tag + ' → a resposta "' + it.ans + '" não corresponde a nenhuma opção');
        if (new Set(letras).size !== letras.length) err(tag + ' → letras de opção repetidas');
        continue;
      }
      for (const g of it.keys) for (const k of g) {
        if (k.length <= 2 && !/^\d+$/.test(k)) warn(tag + ' → chave curta "' + k + '"');
      }
      // caso clínico: a resposta não pode já estar escrita no enunciado
      if (it.caso) {
        const h2 = Core.norm(it.caso + ' ' + it.hint);
        const vaza2 = it.keys.length && it.keys.every(g => g.some(k => k.length >= 5 && h2.indexOf(k) > -1));
        if (vaza2) warn(tag + ' → o enunciado parece entregar a resposta');
      }
      // pista que já traz a resposta: todas as chaves de algum grupo aparecem na pista
      if (it.hint) {
        const h = Core.norm(it.hint);
        const vaza = it.keys.length && it.keys.every(g => g.some(k => k.length >= 5 && h.indexOf(k) > -1));
        if (vaza) warn(tag + ' → a pista parece entregar a resposta');
      }
      // uma resposta qualquer não pode valer ponto cheio
      for (const lixo of ['nao sei', 'xxxxx', 'a']) { if (Core.evaluate(it, lixo) === 'ok') warn(tag + ' → "' + lixo + '" foi aceito'); }
    }
    // slides: todo módulo (exceto casos) precisa dizer em que slides da aula está
    if (m.tipo !== 'casos') {
      if (!m.sl || !m.sl.length) err(m.id + ': sem slides (sl)');
      else for (const e of m.sl) if (e[1] && (e[2] < e[1])) err(m.id + ': intervalo de slides inválido ' + e);
    }
    // nível 2: células ocultas das tabelas, ordenar dos fluxos lineares e texto livre dos mapas
    if (m.tipo === 'tabla') for (const it of m._ditems || []) {
      if (Core.evaluate(it, it.ans) !== 'ok') err(m.id + ' célula oculta [' + it.label + '] → resposta-modelo não aceita');
    }
    if (m.tipo === 'fluxo' && m._linear && (!m._ord || m._ord.length < 2)) err(m.id + ': fluxo linear sem ordem');
    if (m.tipo === 'mapa') for (const b of m._tree) {
      const texto = b.leaves.map(it => it.ans).join('. ');
      for (const it of b.leaves) if (Core.evaluate(it, texto, true) !== 'ok') err(m.id + ' memoria [' + b.t + '] "' + it.ans + '" não foi reconhecida no texto livre');
    }
    // hints de mapa: tamanho para caber no cartão (2 linhas)
    if (m.tipo === 'mapa') for (const b of m._tree) for (const it of b.leaves) {
      if (it.hint.length > 92) warn(m.id + ' pista longa (' + it.hint.length + '): ' + it.hint);
      if (it.ans.length > 90) warn(m.id + ' resposta longa (' + it.ans.length + '): ' + it.ans);
    }
  }
}
console.log('\n' + total + ' campos · ' + erros + ' erros · ' + avisos + ' avisos');
process.exit(erros ? 1 : 0);
