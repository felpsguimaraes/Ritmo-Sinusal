// SINUS · Farmacología I · P2 — Caderno de exercícios RESPONDIDOS (PDF A4).
// Uso (na raiz): node tools/apostila-farmacologia/gerar-gabarito.mjs
// Saída: aulas/apostila-farmacologia/exercicios-respondidos-p2.pdf
// Conteúdo: questões (múltipla escolha e V/F) com resposta e justificativa, respostas abertas
// (treino de mecanismos e as 9 perguntas da Clase 9), flashcards, mapas mentais completos e
// mapas guiados com pista e resposta.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const src = (p) => readFileSync(join(HERE, 'src', p), 'utf8');
const marca = (p) => readFileSync(join(HERE, 'marca', p), 'utf8').replace(/<\?xml[^>]*>\s*/, '').replace(/<title>.*?<\/title>/, '');
const ctx = { window: {} }; vm.createContext(ctx);
['mapas.js', 'questoes.js', 'cartoes.js'].forEach((f) => vm.runInContext(src(f), ctx));
const MAPAS = ctx.window.SINUS_MAPAS, Q = ctx.window.SINUS_QUESTOES, C = ctx.window.SINUS_CARTOES;
const GUIADOS = require('./mapas-guiados.js');
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const LOGO = marca('sinus-logo-horizontal.svg'), QR = marca('qr-treino.svg').replace('<svg', '<svg class="qr"');
const MOD = { m1: ['Clase 6', 'Sistema nervoso autónomo'], m2: ['Clase 6', 'Fármacos colinérgicos'], m3: ['Clase 7', 'Fármacos adrenérgicos'], m4: ['Clase 8', 'AINEs e analgésicos'], m5: ['Clase 8', 'Dor e opioides'], m6: ['Clase 9', 'Corticoides'], m7: ['Clases 6 a 9', 'Integração'] };
const L = 'ABCD';

/* 1) Questões de múltipla escolha e V/F */
let nQ = 0;
const questoes = Object.entries(Q).map(([k, lista]) => {
  const itens = lista.filter((q) => q.tipo !== 'ab').map((q) => {
    nQ++;
    const ops = q.tipo === 'vf' ? ['Verdadeiro', 'Falso'] : q.ops, r = q.tipo === 'vf' ? (q.r ? 0 : 1) : q.r;
    return `<div class="q"><div class="qn">Questão ${nQ} · ${q.tipo === 'vf' ? 'Verdadeiro ou falso' : 'Múltipla escolha'}</div><p class="qt">${esc(q.q)}</p>
<ul class="ops">${ops.map((o, j) => `<li class="${j === r ? 'ok' : ''}"><b>${q.tipo === 'vf' ? (j ? 'F' : 'V') : L[j]}</b> ${esc(o)}${j === r ? ' <span class="tick">✓ resposta</span>' : ''}</li>`).join('')}</ul>
<p class="just"><b>Justificativa:</b> ${esc(q.ex)}</p></div>`;
  }).join('');
  return `<h3 class="mod">${MOD[k][1]} <small>${MOD[k][0]}</small></h3>${itens}`;
}).join('');

/* 2) Respostas abertas */
const abertas = [];
for (const [k, lista] of Object.entries(Q)) lista.filter((q) => q.tipo === 'ab').forEach((q) => abertas.push([MOD[k][1], q.q, q.resp]));
const m7 = [...src('capitulos/mod7.html').matchAll(/<div class="qt">([\s\S]*?)<\/div>[\s\S]*?<div class="ans">([\s\S]*?)<\/div>/g)];
m7.slice(0, 8).forEach((m) => abertas.push(['Treino de mecanismos', strip(m[1]), strip(m[2])]));
const clase9 = m7.slice(8).map((m) => [strip(m[1]), m[2].replace(/<(?!\/?b>)[^>]+>/g, '').trim()]);
const abHtml = abertas.map((a, i) => `<div class="q"><div class="qn">Aberta ${i + 1} · ${esc(a[0])}</div><p class="qt">${esc(a[1])}</p><p class="ans"><b>Resposta:</b> ${esc(a[2])}</p></div>`).join('') +
  `<h3 class="mod">Questionário oficial da Clase 9 <small>em espanhol, como na aula</small></h3>` +
  clase9.map((p, i) => `<div class="q"><div class="qn">Pergunta ${i + 1}</div><p class="qt">${esc(p[0])}</p><p class="ans"><b>Resposta:</b> ${p[1]}</p></div>`).join('');

/* 3) Flashcards */
let nC = 0;
const flash = Object.entries(C).map(([k, lista]) => `<h3 class="mod">${MOD[k][1]} <small>${lista.length} cartões</small></h3><table class="t"><thead><tr><th style="width:42%">Frente</th><th>Verso</th></tr></thead><tbody>${lista.map((c) => { nC++; return `<tr><td><b>${esc(c.f)}</b></td><td>${esc(c.b)}</td></tr>`; }).join('')}</tbody></table>`).join('');

/* 4) Mapas mentais da apostila (completos) */
const CORES = ['#176e5b', '#2f5f8a', '#6d5a9a', '#9a6f3a'];
const mapas = MAPAS.map((m) => `<div class="mm"><div class="mm-h"><span>Mapa ${m.id}</span><b>${esc(m.title)}</b></div><div class="mm-g">${m.ramos.map((r, i) => `<div class="mm-r" style="--c:${CORES[i % 4]}"><b>${esc(r.t)}</b><ul>${r.f.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>`).join('')}</div></div>`).join('');

/* 5) Mapas guiados (pista → resposta) */
let nG = 0;
const guiados = GUIADOS.map((m) => `<div class="mg"><div class="mm-h"><span>${esc(m.clase)}</span><b>${esc(m.titulo)}</b></div><table class="t"><thead><tr><th style="width:20%">Ramo</th><th style="width:48%">Pista</th><th>Resposta</th></tr></thead><tbody>${m.ramas.map((r) => r.hojas.map((h, j) => { nG++; return `<tr><td>${j ? '' : `<b>${esc(r.t)}</b>`}</td><td>${esc(h[0])}</td><td><b>${esc(h[1].split('||')[0].trim())}</b>${h[1].includes('||') ? `<br><small>também aceito: ${esc(h[1].split('||').slice(1).map((x) => x.trim()).join(' · '))}</small>` : ''}</td></tr>`; }).join('')).join('')}</tbody></table></div>`).join('');

const secao = (n, t, d, corpo) => `<section class="sec"><div class="sec-h"><span>Parte ${n}</span><h2>${t}</h2><p>${d}</p></div>${corpo}</section>`;
const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Exercícios respondidos · Farmacología I · P2 · SINUS</title><style>
@page{size:A4;margin:20mm 14mm 18mm 14mm}
*{box-sizing:border-box}body{margin:0;font:13px/1.5 Inter,"Helvetica Neue",Arial,sans-serif;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3{margin:0;letter-spacing:-.02em}
.capa{height:250mm;display:flex;flex-direction:column;break-after:page}
.capa-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #d6e4dc;padding-bottom:14px}.capa-top svg{height:44px;width:auto}.capa-top span{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b7770}
.chip{display:inline-block;background:#e8f3ec;color:#176e5b;font-weight:800;font-size:12px;letter-spacing:.06em;padding:8px 14px;border-radius:8px;margin-top:70px}
.capa h1{font-size:46px;font-weight:800;line-height:1.05;margin:24px 0 10px}.capa .sub{font-size:18px;color:#176e5b;font-weight:600}
.idx{margin-top:34px;display:grid;gap:8px}.idx div{display:flex;justify-content:space-between;border:1px solid #dfe8e2;border-radius:12px;padding:10px 14px;font-size:14px}.idx b{color:#176e5b}
.capa-pe{margin-top:auto;border-top:1px solid #d6e4dc;padding-top:14px;font-size:12px;color:#5f6664;line-height:1.7}
.sec{break-before:page}.sec-h{border-bottom:2px solid #176e5b;padding-bottom:8px;margin-bottom:12px}.sec-h span{font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#176e5b}.sec-h h2{font-size:26px;font-weight:800}.sec-h p{margin:4px 0 0;color:#5f6664}
h3.mod{font-size:17px;color:#0c4a3b;margin:18px 0 8px;break-after:avoid}h3.mod small{font-size:12px;color:#6b7770;font-weight:500}
.q{border:1px solid #dfe8e2;border-radius:12px;padding:10px 13px;margin:0 0 8px;break-inside:avoid}
.qn{font-size:11px;font-weight:700;color:#176e5b;letter-spacing:.04em;text-transform:uppercase}.qt{font-weight:600;margin:3px 0 6px}
.ops{list-style:none;margin:0 0 6px;padding:0;display:grid;gap:3px}.ops li{border:1px solid #e3e8e5;border-radius:8px;padding:4px 9px}.ops li b{color:#176e5b;margin-right:4px}
.ops li.ok{background:#e1f3e8;border-color:#1e7d4f;font-weight:600}.tick{color:#1e7d4f;font-size:11px;font-weight:800}
.just,.ans{margin:0;font-size:12.5px;background:#f4faf6;border-left:3px solid #176e5b;border-radius:0 8px 8px 0;padding:6px 10px}
table.t{width:100%;border-collapse:collapse;font-size:12px;margin:0 0 10px}table.t th{background:#e8f3ec;color:#0c4a3b;text-align:left;padding:6px 8px}table.t td{border-top:1px solid #e3e8e5;padding:5px 8px;vertical-align:top}table.t tr{break-inside:avoid}
.mm,.mg{border:1px solid #dfe8e2;border-radius:12px;padding:10px 12px;margin:0 0 10px;break-inside:avoid}.mm-h{display:flex;gap:10px;align-items:baseline;margin-bottom:6px}.mm-h span{font-size:11px;font-weight:800;color:#176e5b;text-transform:uppercase;letter-spacing:.06em}.mm-h b{font-size:15px}
.mm-g{display:grid;grid-template-columns:1fr 1fr;gap:6px}.mm-r{border-left:4px solid var(--c);background:#f6f9f7;border-radius:0 8px 8px 0;padding:6px 10px}.mm-r b{color:var(--c)}.mm-r ul{margin:2px 0 0;padding-left:16px}
.final{break-before:page;height:250mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px}.final svg{height:46px;width:auto}.final h2{font-size:36px;font-weight:800}.final p{font-size:16px;color:#33433c;max-width:520px;margin:0}
.qrbox{display:flex;gap:18px;align-items:center;text-align:left;border-radius:20px;padding:18px 22px;background:#e8f3ec}.qr{width:150px;height:150px;background:#fff;border-radius:12px;padding:8px}.url{font-size:20px;font-weight:800;color:#176e5b}
</style></head><body>
<section class="capa"><div class="capa-top">${LOGO}<span>Cadernos de Medicina</span></div>
<span class="chip">FARMACOLOGÍA I · UCP · P2</span><h1>Exercícios respondidos</h1><p class="sub">Clases 6 a 9 · todos os tipos, com gabarito e justificativa</p>
<div class="idx"><div>Parte 1 · Questões de múltipla escolha e V/F <b>${nQ}</b></div><div>Parte 2 · Respostas abertas e questionário da Clase 9 <b>${abertas.length + clase9.length}</b></div><div>Parte 3 · Flashcards <b>${nC}</b></div><div>Parte 4 · Mapas mentais completos <b>${MAPAS.length}</b></div><div>Parte 5 · Mapas guiados (pista e resposta) <b>${GUIADOS.length} mapas · ${GUIADOS.reduce((n, m) => n + m.ramas.reduce((a, r) => a + r.hojas.length, 0), 0)} campos</b></div></div>
<div class="capa-pe"><b>FELPS ©</b> 2026 · Felipe Guimarães de Souza · Todos os direitos reservados<br>Use depois de tentar sozinho: o treino com correção na hora está no app <b>meusinus.pages.dev</b>.</div></section>
${secao(1, 'Questões de múltipla escolha e V/F', 'A alternativa correta está marcada em verde, com a justificativa logo abaixo.', questoes)}
${secao(2, 'Respostas abertas', 'Tente responder em voz alta antes de ler a resposta.', abHtml)}
${secao(3, 'Flashcards', 'Cubra a coluna «Verso» e teste a memória.', flash)}
${secao(4, 'Mapas mentais completos', 'Os 34 mapas da apostila com todos os ramos preenchidos.', mapas)}
${secao(5, 'Mapas guiados · pista e resposta', 'Gabarito dos mapas para completar do app. A primeira resposta é a do gabarito; as outras também são aceitas.', guiados)}
<section class="final">${LOGO}<h2>Treine com correção na hora</h2><p>No app, cada resposta é corrigida na hora e seu progresso fica salvo.</p><div class="qrbox">${QR}<div><b>Escaneie ou acesse</b><br><span class="url">meusinus.pages.dev</span><br>Farmacología I → <b>Treino</b></div></div></section>
</body></html>`;

const out = join(ROOT, 'aulas/apostila-farmacologia/exercicios-respondidos.html');
writeFileSync(out, html);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(out).href, { waitUntil: 'load' });
const mini = marca('sinus-icone.svg').replace('<svg ', '<svg width="14" height="14" ');
await page.pdf({
  path: join(ROOT, 'aulas/apostila-farmacologia/exercicios-respondidos-p2.pdf'),
  format: 'A4', printBackground: true, displayHeaderFooter: true,
  margin: { top: '20mm', bottom: '18mm', left: '14mm', right: '14mm' },
  headerTemplate: `<div style="width:100%;font:600 8.5px Inter,Arial,sans-serif;color:#6b7770;padding:0 14mm;display:flex;justify-content:space-between;align-items:center"><span style="display:flex;gap:6px;align-items:center">${mini}<b style="color:#10352a">sinus.</b></span><span>FARMACOLOGÍA I · P2 · EXERCÍCIOS RESPONDIDOS</span></div>`,
  footerTemplate: `<div style="width:100%;font:500 8.5px Inter,Arial,sans-serif;color:#6b7770;padding:0 14mm;display:flex;justify-content:space-between"><span><b style="color:#10352a">FELPS ©</b> 2026 · Treine no app: meusinus.pages.dev</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
await browser.close();
console.log(`gabarito: ${nQ} questões · ${abertas.length + clase9.length} abertas · ${nC} flashcards · ${MAPAS.length} mapas mentais · ${GUIADOS.length} mapas guiados (${nG} campos)`);
