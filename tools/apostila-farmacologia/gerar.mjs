// SINUS · Apostila de Farmacología I · P2 (Clases 6 a 9) — gerador único.
// Uso (na raiz do repositório):  node tools/apostila-farmacologia/gerar.mjs
// Gera a partir de tools/apostila-farmacologia/src:
//   aulas/apostila-farmacologia/index.html   → aba Apostila da matéria (HTML autocontido)
//   mapas/dados/farmacologia-apostila.js     → Mapas guiados (Guiado/Desafío) + questões (nível Prova)
//   aulas/flashcards/cartoes.js (bloco)      → aba Flashcards, baralho farmacologia/gimenez
// Depois rode: node tools/testar-mapas.js
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const src = (p) => readFileSync(join(HERE, 'src', p), 'utf8');
const marca = (p) => readFileSync(join(HERE, 'marca', p), 'utf8').replace(/<title>.*?<\/title>/, '');
const require = createRequire(import.meta.url);
const MAPAS_GUIADOS = require('./mapas-guiados.js');

const ctx = { window: {} }; vm.createContext(ctx);
['mapas.js', 'questoes.js', 'cartoes.js'].forEach((f) => vm.runInContext(src(f), ctx));
const MAPAS = ctx.window.SINUS_MAPAS, Q = ctx.window.SINUS_QUESTOES, C = ctx.window.SINUS_CARTOES;
const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ======================= 1) APOSTILA (HTML) ======================= */
const MODULOS = [
  { n: 1, file: 'mod1.html', titulo: 'Sistema nervoso autónomo', aula: 'Clase 6', q: 'm1' },
  { n: 2, file: 'mod2.html', titulo: 'Fármacos colinérgicos', aula: 'Clase 6', q: 'm2' },
  { n: 3, file: 'mod3.html', titulo: 'Fármacos adrenérgicos', aula: 'Clase 7', q: 'm3' },
  { n: 4, file: 'mod4.html', titulo: 'AINEs e analgésicos', aula: 'Clase 8', q: 'm4' },
  { n: 5, file: 'mod5.html', titulo: 'Dor e opioides', aula: 'Clase 8', q: 'm5' },
  { n: 6, file: 'mod6.html', titulo: 'Corticoides', aula: 'Clase 9', q: 'm6' },
  { n: 7, file: 'mod7.html', titulo: 'Integração e treino', aula: 'Clases 6–9', q: 'm7' },
];
const NQ = Object.values(Q).reduce((a, l) => a + l.length, 0);
const NC = Object.values(C).reduce((a, l) => a + l.length, 0);
const LOGO = marca('sinus-logo-horizontal.svg');
const LEG = '<div class="legend"><span><mark class="my">amarelo</mark> cai na prova</span><span><mark class="mr">vermelho</mark> alerta / erro clássico</span><span><b>negrito</b> termo-chave</span><span><b style="color:#176e5b">+</b> toque para abrir o detalhe</span></div>';

function cartao(sec, { check = true, modTitulo = '' } = {}) {
  const id = sec.match(/id="([^"]+)"/)[1];
  const h1 = sec.match(/<h1 class="h1">([\s\S]*?)<\/h1>/)[1];
  const m = h1.match(/^(\d+)\.\s*(.*)$/);
  const num = m ? m[1] : '', titulo = m ? m[2] : h1;
  const eyebrow = strip((sec.match(/<span class="eyebrow">([\s\S]*?)<\/span>/) || [, ''])[1]);
  let inner = sec.replace(/^<section[^>]*>/, '').replace(/<\/section>\s*$/, '')
    .replace(/<span class="eyebrow">[\s\S]*?<\/span>\s*/, '').replace(/<h1 class="h1">[\s\S]*?<\/h1>\s*/, '');
  if (num && MAPAS.find((x) => x.id === num)) inner += `<details class="mmdet"><summary>Mapa mental · completar</summary><p class="mmlegend">Diga a resposta e toque para conferir.</p><div class="mmwrap"><div class="mm" data-mm="${num}"></div></div></details>`;
  const head = `<div class="head"><div><span class="num">${num ? num + ' · ' : ''}${modTitulo || eyebrow}</span><h3>${titulo}</h3></div>${check && num ? `<label class="check"><input type="checkbox" data-lido="${num}"> Já estudei</label>` : ''}</div>`;
  return { id, num, titulo, html: `<article class="cap" id="${id}"${num ? ` data-cap="${num}"` : ''}>${head}${inner}</article>\n` };
}

let apostila = '', exerc = '', flash = '', toc = '', totalCaps = 0;
for (const m of MODULOS) {
  const caps = [...src(join('capitulos', m.file)).matchAll(/<section class="pg cap" id="cap\d\d">[\s\S]*?<\/section>/g)].map((x) => cartao(x[0], { modTitulo: m.titulo }));
  totalCaps += caps.length;
  toc += caps.map((c) => `<a href="#${c.id}" data-toc="${c.num}">${c.num}. ${c.titulo}</a>`).join('');
  apostila += `<section class="grupo" id="mod${m.n}"><div class="grupo-h"><h2>${m.titulo}</h2><span class="mini">${caps.length} capítulos · ${m.aula}</span></div>${caps.map((c) => c.html).join('')}</section>\n`;
  exerc += `<section class="grupo" id="ex${m.n}"><div class="grupo-h"><h2>${m.titulo}</h2><span class="mini">${Q[m.q].length} questões</span></div><div class="quiz ex" data-quiz="${m.q}"></div></section>\n`;
  flash += `<section class="grupo" id="fc${m.n}"><div class="grupo-h"><h2>${m.titulo}</h2><span class="mini">${C[m.q].length} cartões</span></div><div class="deck" data-deck="${m.q}"></div></section>\n`;
}
const consulta = [...src('apendice.html').matchAll(/<section class="pg cap" id="[^"]+">[\s\S]*?<\/section>/g)].map((x) => cartao(x[0], { check: false }).html).join('');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Apostila de farmacologia · P2 · SINUS</title>
<meta name="description" content="Apostila SINUS de Farmacología I · P2: SNA, colinérgicos, adrenérgicos, AINEs, opioides e corticoides, com esquemas interativos, mapas mentais, exercícios e flashcards.">
<meta name="theme-color" content="#155B48">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
${src('estilo.css')}
</style>
</head>
<body>
<div class="wrap">
<div class="brandbar">${LOGO}<a class="rt" href="/" style="text-decoration:none">← Voltar ao Sinus</a></div>
<header class="top">
<div class="kicker">Farmacología I · UCP · P2 · <span style="color:#10352a">FELPS ©</span></div>
<h1>Apostila de farmacologia</h1>
<p class="lede">SNA, colinérgicos, adrenérgicos, AINEs, opioides e corticoides. Explicação em português com os termos em espanhol, esquemas interativos e exercícios que corrigem na hora.</p>
<div class="progress"><i id="progbar"></i></div>
<div class="mini" id="progtxt">Capítulos lidos: 0 de ${totalCaps}</div>
</header>
<nav class="tabs" role="tablist">
<button role="tab" data-tab="apostila" aria-selected="true">Apostila</button>
<button role="tab" data-tab="exercicios" aria-selected="false">Exercícios <span class="mini">${NQ}</span></button>
<button role="tab" data-tab="flashcards" aria-selected="false">Flashcards <span class="mini">${NC}</span></button>
<button role="tab" data-tab="consulta" aria-selected="false">Consulta</button>
</nav>
<main>
<div data-pane="apostila">
<div class="howto glass">${LEG}</div>
<nav class="toc" aria-label="Capítulos">${toc}</nav>
${apostila}
</div>
<div data-pane="exercicios" hidden>
<p class="lede">Responda sem consultar. A correção e a justificativa aparecem na hora.</p>
${exerc}
</div>
<div data-pane="flashcards" hidden>
<p class="lede">Toque no cartão para virar. «Sei» tira da pilha; «Revisar de novo» manda para o fim.</p>
${flash}
</div>
<div data-pane="consulta" hidden>
${consulta}
</div>
</main>
<footer class="pe">${LOGO}<span>Seu estudo. Seu tempo. Seu ritmo.<br><b>FELPS ©</b> 2026 · Felipe Guimarães de Souza · Todos os direitos reservados</span></footer>
</div>
<script>
${src('mapas.js')}
${src('questoes.js')}
${src('cartoes.js')}
${src('app.js')}
</script>
</body>
</html>
`;
mkdirSync(join(ROOT, 'aulas/apostila-farmacologia'), { recursive: true });
writeFileSync(join(ROOT, 'aulas/apostila-farmacologia/index.html'), html);

/* ============ 2) MAPAS GUIADOS + QUESTÕES (nível Prova) ============ */
const MODS = { m1: ['Clase 6', 'SNA e receptores', [6, 5, 41]], m2: ['Clase 6', 'Fármacos colinérgicos', [6, 42, 110]], m3: ['Clase 7', 'Fármacos adrenérgicos', [7, 4, 65]], m4: ['Clase 8', 'AINEs e analgésicos', [8, 3, 36]], m5: ['Clase 8', 'Dor e opioides', [8, 38, 72]], m6: ['Clase 9', 'Corticoides', [9, 5, 46]], m7: ['Clases 6 a 9', 'Integração', null] };
const FONTE = 'Apostila SINUS · Farmacologia P2 (Clases 6–9) · autoria Felipe Guimarães de Souza';
const mods = MAPAS_GUIADOS.map((m) => ({ id: 'ap_' + m.id, clase: m.clase, titulo: 'Apostila · ' + m.titulo, tipo: 'mapa', sl: [m.sl], centro: m.centro, sub: m.sub || 'Apostila SINUS P2', fuente: FONTE, ramas: m.ramas.map((r) => ({ t: r.t, hojas: r.hojas })) }));
const L = 'abcd';
for (const [k, lista] of Object.entries(Q)) {
  const [clase, nome, sl] = MODS[k];
  const casos = lista.filter((q) => q.tipo !== 'ab').map((q) => {
    if (q.tipo === 'vf') { const ops = ['a) Verdadeiro', 'b) Falso'], r = q.r ? 0 : 1; return [q.q, 'Verdadeiro ou falso?', ops[r], L[r], q.ex, ops]; }
    const ops = q.ops.map((o, i) => L[i] + ') ' + o); return [q.q, 'Escolha a alternativa correta.', ops[q.r], L[q.r], q.ex, ops];
  });
  const mod = { id: 'ap_q_' + k, clase, titulo: 'Apostila · Questões: ' + nome, tipo: 'casos', resumen: 'Múltipla escolha e verdadeiro ou falso, com justificativa.', fuente: FONTE, casos };
  if (sl) mod.sl = [sl];
  mods.push(mod);
}
writeFileSync(join(ROOT, 'mapas/dados/farmacologia-apostila.js'), `/* Sinus · Mapas guiados · Farmacología I · APOSTILA SINUS P2 (Clases 6 a 9)
   Complemento de farmacologia.js: ${MAPAS_GUIADOS.length} mapas da apostila (níveis Guiado e Desafío) e
   ${Object.keys(Q).length} blocos de questões de múltipla escolha e V/F (nível Prova).
   Gerado por tools/apostila-farmacologia/gerar.mjs. Não editar à mão. */
(function () {
  var F = window.SINUS_MAPAS && window.SINUS_MAPAS.farmacologia;
  if (!F) return;
  var novos = ${JSON.stringify(mods, null, 1)};
  var ids = {}; F.modulos.forEach(function (m) { ids[m.id] = 1; });
  novos.forEach(function (m) { if (!ids[m.id]) F.modulos.push(m); });
})();
`);

/* ================= 3) FLASHCARDS (farmacologia/gimenez) ================= */
const GN = { m1: 'SNA e receptores', m2: 'Colinérgicos', m3: 'Adrenérgicos', m4: 'AINEs', m5: 'Opioides', m6: 'Corticoides', m7: 'Integração' };
const cards = [];
for (const [k, lista] of Object.entries(C)) lista.forEach((c, i) => cards.push({ id: 'ap-' + k + '-' + (i + 1), g: GN[k], t: MODS[k][0] + ' · ' + GN[k], q: c.f, a: c.b, x: 'Apostila SINUS P2' }));
for (const [k, lista] of Object.entries(Q)) lista.filter((q) => q.tipo === 'ab').forEach((q, i) => cards.push({ id: 'ap-ab-' + k + '-' + (i + 1), g: 'Respostas abertas', t: MODS[k][0] + ' · resposta aberta', q: q.q, a: q.resp, x: 'Responda em voz alta antes de virar. Apostila SINUS P2.' }));
[...src('capitulos/mod7.html').matchAll(/<div class="qt">([\s\S]*?)<\/div>[\s\S]*?<div class="ans">([\s\S]*?)<\/div>/g)].forEach((m, i) => {
  const c9 = i >= 8;
  cards.push({ id: 'ap-ab-' + (c9 ? 'c9-' + (i - 7) : 'treino-' + (i + 1)), g: 'Respostas abertas', t: c9 ? 'Clase 9 · questionário da aula' : 'Clases 6 a 9 · treino de mecanismos', q: strip(m[1]), a: strip(m[2]), x: c9 ? 'Pergunta oficial da Clase 9 (páginas 44 e 46).' : 'Treino de mecanismos da Apostila SINUS P2.' });
});
const deck = { nome: 'Dr. Cristhiam Giménez · Apostila P2', fonte: 'Apostila SINUS · Farmacologia P2 (Clases 6 a 9)', area: 'teoria', cartoes: cards };
const INI = '/* >>> farmacologia/gimenez · gerado por gerar.mjs (Apostila SINUS P2) */', FIM = '/* <<< farmacologia/gimenez */';
const cfile = join(ROOT, 'aulas/flashcards/cartoes.js');
let cs = readFileSync(cfile, 'utf8');
const bloco = `${INI}\nwindow.SINUS_CARTOES = window.SINUS_CARTOES || {};\nwindow.SINUS_CARTOES["farmacologia/gimenez"] = ${JSON.stringify(deck, null, 1)};\n${FIM}\n`;
const a = cs.indexOf(INI), b = cs.indexOf(FIM);
cs = a >= 0 ? cs.slice(0, a) + bloco + cs.slice(b + FIM.length + 1) : cs.replace(/\s*$/, '\n') + bloco;
writeFileSync(cfile, cs);

console.log(`apostila: ${totalCaps} capítulos · ${(html.length / 1024).toFixed(0)} KB | mapas guiados: ${MAPAS_GUIADOS.length} + ${Object.keys(Q).length} blocos de questões | flashcards: ${cards.length} (${cards.filter((c) => c.g === 'Respostas abertas').length} abertas)`);
