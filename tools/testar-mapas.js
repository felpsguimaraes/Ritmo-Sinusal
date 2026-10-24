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
      for (const g of it.keys) for (const k of g) {
        if (k.length <= 2 && !/^\d+$/.test(k)) warn(tag + ' → chave curta "' + k + '"');
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
    // hints de mapa: tamanho para caber no cartão (2 linhas)
    if (m.tipo === 'mapa') for (const b of m._tree) for (const it of b.leaves) {
      if (it.hint.length > 92) warn(m.id + ' pista longa (' + it.hint.length + '): ' + it.hint);
      if (it.ans.length > 90) warn(m.id + ' resposta longa (' + it.ans.length + '): ' + it.ans);
    }
  }
}
console.log('\n' + total + ' campos · ' + erros + ' erros · ' + avisos + ' avisos');
process.exit(erros ? 1 : 0);
