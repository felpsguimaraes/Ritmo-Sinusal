#!/usr/bin/env node
/* Teste automático dos mapas guiados: cada resposta-modelo precisa ser aceita pelas próprias chaves,
   chaves curtas demais e respostas "entregues" na pista são avisadas. Uso: node tools/testar-mapas.js */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const Core = require('../mapas/mapas-core.js');
const dir = path.join(__dirname, '..', 'mapas', 'dados');
const sandbox = { window: {} }; vm.createContext(sandbox);
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f }));
const DATA = sandbox.window.SINUS_MAPAS || {};
let erros = 0, avisos = 0, total = 0;
const err = m => { erros++; console.log('  ERRO  ' + m); };
const warn = m => { avisos++; console.log('  aviso ' + m); };
for (const sid of Object.keys(DATA)) {
  const S = DATA[sid]; const ids = new Set();
  console.log('\n' + S.nome + ' — ' + S.modulos.length + ' módulos');
  for (const m of S.modulos) {
    if (ids.has(m.id)) err('id repetido: ' + m.id); ids.add(m.id);
    try { Core.compile(m); } catch (e) { err(m.id + ': ' + e.message); continue; }
    const n = m._items.length; total += n;
    if (!n) err(m.id + ': sem lacunas');
    console.log('  ' + (m.clase + '').padEnd(13) + m.tipo.padEnd(6) + String(n).padStart(3) + ' campos  ' + m.titulo);
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
