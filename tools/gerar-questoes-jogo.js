#!/usr/bin/env node
/* Gera jogo/assets/questoes.json com as questões de múltipla escolha dos mapas guiados
   (módulos de casos e simulados em mapas/dados/*.js), para o Desafio rápido do Campus SINUS.

   Rode depois de editar os dados dos mapas:  node tools/gerar-questoes-jogo.js
   O script confere que o gabarito de cada questão existe entre as alternativas. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const pastaDados = path.join(raiz, 'mapas', 'dados');
const saida = path.join(raiz, 'jogo', 'assets', 'questoes.json');

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of fs.readdirSync(pastaDados).filter(f => f.endsWith('.js')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(pastaDados, f), 'utf8'), ctx, { filename: f });
}

const semLetra = t => String(t).replace(/^\s*[a-e]\)\s*/i, '').trim();
const erros = [];
const existe = rel => fs.existsSync(path.join(raiz, rel));
const materias = {};

for (const [slug, m] of Object.entries(ctx.window.SINUS_MAPAS)) {
  const questoes = [];
  for (const mod of m.modulos || []) {
    if (mod.tipo !== 'casos') continue;
    (mod.casos || []).forEach((c, i) => {
      const [contexto, pergunta, resposta, chave, explicacao, opcoes] = c;
      if (!Array.isArray(opcoes)) return; // questões abertas ficam fora do jogo
      const letra = String(chave || '').trim().toLowerCase();
      const a = 'abcde'.indexOf(letra);
      const id = `${slug}/${mod.id}/${i}`;
      if (letra.length !== 1 || a < 0 || a >= opcoes.length) { erros.push(`${id}: gabarito "${chave}" fora das alternativas`); return; }
      if (resposta && semLetra(resposta) !== semLetra(opcoes[a])) erros.push(`${id}: resposta "${resposta}" difere da alternativa ${letra}`);
      questoes.push({
        id,
        c: String(contexto || '').trim(),
        q: String(pergunta).trim(),
        o: opcoes.map(semLetra),
        a,
        e: String(explicacao || '').trim(),
        f: [mod.clase, mod.titulo].filter(Boolean).join(' · '),
        // figura do módulo (ex.: familiograma), com caminho a partir da raiz do site
        ...(mod.figura ? { img: { src: 'mapas/' + mod.figura.src, alt: mod.figura.alt || '' } } : {}),
      });
    });
  }
  materias[slug] = { nome: m.nome, docente: m.docente || '', questoes };
}

for (const m of Object.values(materias)) for (const q of m.questoes) {
  if (q.img && !existe(q.img.src)) erros.push(`${q.id}: figura ${q.img.src} não encontrada`);
}
if (erros.length) {
  console.error('Questões com problema:\n' + erros.join('\n'));
  process.exit(1);
}

fs.writeFileSync(saida, JSON.stringify({ fonte: 'mapas/dados (casos e simulados)', materias }, null, 0) + '\n');
const total = Object.values(materias).reduce((n, m) => n + m.questoes.length, 0);
console.log(`${total} questões gravadas em ${path.relative(raiz, saida)}`);
for (const [slug, m] of Object.entries(materias)) console.log(`  ${slug}: ${m.questoes.length}`);
