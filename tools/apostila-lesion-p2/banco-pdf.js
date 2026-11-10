// Gera aulas/lesion/p2/banco-questoes-p2.pdf: o banco de questões da 2ª parcial (p2/dados.js) no visual SINUS,
// com as questões de cada tema e, logo depois, o gabarito comentado. Também grava o .html ao lado (versão de tela).
// Uso: node tools/apostila-lesion-p2/banco-pdf.js aulas/lesion/p2/dados.js /tmp/banco.pdf [--respondido]
// Com --respondido, cada questão já vem com a resposta certa e a justificativa logo abaixo (sem gabarito separado).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [, , DADOS, SAIDA, MODO] = process.argv;
const RESP = MODO === '--respondido';
global.window = {};
require(path.resolve(DADOS));
const D = window.SINUSAL_P2_DADOS;

const TEMAS = [
  ['nec', 'Necrosis'], ['apo', 'Apoptosis'], ['acu', 'Acumulación: lípidos y glucógeno'],
  ['c7', 'Proteínas, amiloide, calcio'], ['pig', 'Pigmentos'], ['inf', 'Inflamación aguda'], ['cro', 'Fora do slide atual']
];
const TIPO = { mc: 'Múltipla escolha', vf: 'Verdadero o falso', cita: 'Cita', comp: 'Completa' };
const LET = 'ABCDEFGHIJ';
const FONTE = {};
D.fontes.forEach(f => { FONTE[f.id] = f; });
const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// numeração única no PDF, tema por tema, na ordem do banco
let num = 0;
const porTema = TEMAS.map(([id, nome]) => ({ id, nome, qs: D.qs.filter(q => q.tema === id).map(q => Object.assign({ N: ++num }, q)) }))
  .filter(t => t.qs.length);
const total = num;
if (total !== D.qs.length) throw new Error('questões sem tema conhecido: ' + (D.qs.length - total));
const conta = k => D.qs.filter(q => q.t === k).length;

function origem(q) {
  const f = FONTE[q.p] || {};
  return esc(f.titulo || q.p) + ' · questão ' + esc(q.n);
}
function questao(q) {
  let corpo = '';
  if (q.t === 'mc') corpo = '<ol class="alts">' + q.o.map((o, k) => '<li><span class="L">' + LET[k] + '</span><span>' + esc(o) + '</span></li>').join('') + '</ol>';
  if (q.t === 'vf') corpo = '<p class="vf"><span>( ) Verdadero</span><span>( ) Falso</span></p>';
  if (q.t === 'cita' || q.t === 'comp') corpo = '<div class="linhas"><i></i><i></i></div>';
  return '<article class="q"><p class="meta"><span class="num">' + q.N + '</span><span class="src">' + origem(q) + '</span><span class="tp">' + TIPO[q.t] + '</span></p>' +
    '<p class="enun" lang="es">' + esc(q.q) + '</p>' + corpo + '</article>';
}
function gabarito(q) {
  let cab = '', corpo = '';
  if (q.t === 'mc') {
    cab = (q.ok.length > 1 ? 'Certas: ' : 'Certa: ') + q.ok.map(j => LET[j]).join(' e ');
    corpo = '<ol class="why">' + q.o.map((o, j) => {
      const ok = q.ok.indexOf(j) >= 0;
      return '<li class="' + (ok ? 'ok' : 'no') + '"><span class="L">' + LET[j] + '</span><span><b>' + (ok ? 'Certa.' : 'Errada.') + '</b> ' + esc(q.w[j]) + '</span></li>';
    }).join('') + '</ol>';
  } else if (q.t === 'vf') {
    cab = q.ok ? 'Verdadera' : 'Falsa';
    corpo = '<p class="ex">' + esc(q.e) + '</p>';
  } else {
    cab = 'Resposta';
    corpo = '<p class="ans" lang="es">' + esc(q.a) + '</p><p class="ex">' + esc(q.e) + '</p>';
  }
  return { cab, corpo: corpo + (q.nt ? '<p class="nt"><b>Obs.</b> ' + esc(q.nt) + '</p>' : '') };
}
function resposta(q) {
  const { cab, corpo } = gabarito(q);
  const f = FONTE[q.p] || {};
  return '<article class="g"><p class="gh"><span class="num">' + q.N + '</span><b>' + cab + '</b><span class="src">' + origem(q) + (f.pags ? ' · págs. ' + esc(f.pags) + ' do PDF das provas' : '') + '</span></p>' +
    corpo + '</article>';
}
// questão já respondida: enunciado, resposta certa e o porquê, no mesmo cartão
function respondida(q) {
  const { cab, corpo } = gabarito(q);
  return '<article class="q qr"><p class="meta"><span class="num">' + q.N + '</span><span class="src">' + origem(q) + '</span><span class="tp">' + TIPO[q.t] + '</span></p>' +
    '<p class="enun" lang="es">' + esc(q.q) + '</p><p class="rc"><b>' + cab + '</b></p>' + corpo + '</article>';
}

const capa = '<section class="capa">' +
  '<div class="brand">sinus<span>.</span></div>' +
  '<p class="eyebrow">Anatomía Patológica I · 2ª parcial · Dra. Eliana Chamorro</p>' +
  '<h1>Banco de <em>questões</em>.</h1>' +
  '<p class="lead">As questões das provas da Dra. Chamorro e dos bancos Robbins e PEF que ela usa, com o enunciado igual ao original' + (RESP ? ', já respondidas e justificadas, uma a uma.' : ' e o porquê de cada alternativa.') + '</p>' +
  '<div class="stats">' +
    [[total, 'questões'], [conta('mc'), 'múltipla escolha'], [conta('cita'), 'cita'], [conta('comp'), 'completa'], [conta('vf'), 'verdadero o falso']]
      .map(([n, t]) => '<div><b>' + n + '</b><span>' + t + '</span></div>').join('') +
  '</div>' +
  '<div class="indice"><p class="lab">Temas</p>' + porTema.map((t, i) =>
    '<p class="it"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><a class="t" href="#t-' + t.id + '">' + esc(t.nome) + '</a><span class="c">' + t.qs.length + ' questões · ' + t.qs[0].N + '–' + t.qs[t.qs.length - 1].N + '</span>' + (RESP ? '' : '<a class="gl" href="#g-' + t.id + '">gabarito</a>') + '</p>').join('') +
  '</div>' +
  '<div class="como"><p class="lab">Como usar</p>' + (RESP
    ? '<p>Cada questão já vem <b>respondida e justificada</b>: logo abaixo do enunciado aparece a resposta certa e o porquê. Nas de múltipla escolha, cada alternativa é explicada, a certa e as erradas.</p>'
    : '<p>Cada tema traz primeiro as questões e, logo depois, o <b>gabarito comentado</b>. Resolva o tema inteiro antes de olhar as respostas. Nas de múltipla escolha, o gabarito explica cada alternativa, a certa e as erradas.</p>') +
  '<p>Os enunciados estão em espanhol, como na prova. As explicações estão em português. A fonte de cada questão aparece em cima dela, com as páginas do PDF das provas originais.</p></div>' +
  '</section>';

const cabTema = (t, i) => '<header class="th"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><div><p class="k">Tema</p><h2>' + esc(t.nome) + '</h2><p class="s">' + t.qs.length + ' questões · ' + t.qs[0].N + ' a ' + t.qs[t.qs.length - 1].N + '</p></div></header>';
const temas = RESP ? porTema.map((t, i) => '<section class="tema" id="t-' + t.id + '">' + cabTema(t, i) + t.qs.map(respondida).join('') + '</section>').join('') : porTema.map((t, i) =>
  '<section class="tema" id="t-' + t.id + '">' +
    '<header class="th"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><div><p class="k">Tema</p><h2>' + esc(t.nome) + '</h2><p class="s">' + t.qs.length + ' questões · ' + t.qs[0].N + ' a ' + t.qs[t.qs.length - 1].N + '</p></div></header>' +
    t.qs.map(questao).join('') +
    '<p class="irgab"><a href="#g-' + t.id + '">Ver o gabarito comentado de ' + esc(t.nome) + ' ↓</a></p>' +
  '</section>' +
  '<section class="gab" id="g-' + t.id + '">' +
    '<header class="gt"><p class="k">Gabarito comentado</p><h2>' + esc(t.nome) + '</h2><a class="volta" href="#t-' + t.id + '">↑ voltar às questões</a></header>' +
    t.qs.map(resposta).join('') +
  '</section>'
).join('');

const CSS = `
:root{--g:#0c8059;--g2:#08a86e;--gd:#0b6246;--mint:#e7f6eb;--ink:#102d25;--ink2:#365d49;--ink3:#6d897a;--line:#d9e9de;--bg:#f5fbf7;--red:#c8463d;
  --serif:'Fraunces',Georgia,'Times New Roman',serif;--mono:'JetBrains Mono',ui-monospace,Menlo,monospace}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff;color:var(--ink);font-family:var(--serif);font-size:10.4pt;line-height:1.45;font-size-adjust:.52}
b{font-weight:620}
.lab,.eyebrow,.k,.meta,.gh .src,.stats span,.indice .n,.indice .c,.th .n,.th .s,.num,.L,.tp{font-family:var(--mono);font-size-adjust:none}
/* capa */
.capa{break-after:page;padding:6mm 2mm 0}
.brand{font-family:'Inter',system-ui,sans-serif;font-weight:800;font-size:22pt;letter-spacing:-.04em;color:#155B48;font-size-adjust:none}
.brand span{color:var(--g2)}
.eyebrow{margin:16mm 0 3mm;font-size:8pt;letter-spacing:.22em;text-transform:uppercase;color:var(--g)}
h1{font-weight:300;font-size:46pt;line-height:1;margin:0 0 5mm;letter-spacing:-.02em}
h1 em{color:var(--g);font-style:italic}
.lead{font-size:13pt;font-weight:300;color:var(--ink2);max-width:150mm;margin:0 0 9mm}
.stats{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg);margin-bottom:9mm}
.stats div{padding:4mm 3mm;border-left:1px solid var(--line)}.stats div:first-child{border-left:0}
.stats b{display:block;font-size:22pt;font-weight:400;color:var(--g);line-height:1.1}
.stats span{font-size:6.6pt;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.lab{font-size:7.4pt;letter-spacing:.2em;text-transform:uppercase;color:var(--g);margin:0 0 2.5mm}
.indice{margin-bottom:8mm}
.indice .it{display:flex;align-items:baseline;gap:4mm;margin:0;padding:2.4mm 0;border-bottom:1px solid var(--line)}
.indice .n{color:var(--g);font-size:9pt;width:8mm}.indice .t{flex:1;font-size:12pt}.indice .c{font-size:7.6pt;color:var(--ink3);letter-spacing:.06em}
.como{background:var(--mint);border-radius:14px;padding:5mm 6mm}
.como p{margin:0 0 2mm}.como p:last-child{margin:0}
/* tema */
.tema{break-before:page}
.th{display:flex;gap:5mm;align-items:center;background:linear-gradient(120deg,#0c8059 0%,#0b6246 45%,#0b3d2e 100%);color:#fff;border-radius:16px;padding:6mm 7mm;margin-bottom:6mm}
.th .n{font-size:26pt;opacity:.55;font-weight:300}
.th .k,.gt .k{margin:0;font-size:7.2pt;letter-spacing:.24em;text-transform:uppercase;opacity:.8}
.th h2{margin:.5mm 0 1mm;font-weight:400;font-size:21pt;line-height:1.1}
.th .s{margin:0;font-size:7.6pt;letter-spacing:.1em;opacity:.85}
.q{break-inside:avoid;border:1px solid var(--line);border-left:3px solid var(--g);border-radius:10px;padding:3.2mm 4.2mm 3.4mm;margin:0 0 3.4mm;background:#fff}
.meta{display:flex;align-items:center;gap:2.6mm;margin:0 0 1.6mm;font-size:6.9pt;letter-spacing:.06em;color:var(--ink3)}
.num{display:inline-flex;align-items:center;justify-content:center;min-width:7.4mm;height:5.6mm;padding:0 1.4mm;border-radius:99px;background:var(--g);color:#fff;font-size:7.6pt;font-weight:600;letter-spacing:0}
.meta .src{flex:1}
.tp{font-size:6.4pt;letter-spacing:.14em;text-transform:uppercase;color:var(--g);background:var(--mint);border-radius:99px;padding:.6mm 2.2mm}
.enun{margin:0 0 1.8mm;font-size:10.8pt;line-height:1.42}
.alts{list-style:none;margin:0;padding:0;display:grid;gap:1.3mm}
.alts li,.why li{display:flex;gap:2.4mm;align-items:flex-start}
.L{flex:none;display:inline-flex;align-items:center;justify-content:center;width:5.2mm;height:5.2mm;border-radius:50%;border:1px solid var(--line);font-size:7.2pt;font-weight:600;color:var(--ink2);margin-top:.3mm;background:var(--bg)}
.vf{display:flex;gap:10mm;margin:0;font-family:var(--mono);font-size:8.6pt;color:var(--ink2)}
.linhas i{display:block;height:7mm;border-bottom:1px dashed #b9d3c4}
/* gabarito */
.gab{break-before:page}
.gt{border-bottom:2px solid var(--g);padding:0 0 2.6mm;margin-bottom:5mm}
.gt .k{color:var(--g);opacity:1}
.gt h2{margin:.6mm 0 0;font-weight:400;font-size:18pt;line-height:1.1}
.g{break-inside:avoid;padding:2.8mm 0 3mm;border-bottom:1px solid var(--line)}
.gh{display:flex;align-items:center;gap:2.6mm;margin:0 0 1.6mm;flex-wrap:wrap}
.gh b{font-family:var(--mono);font-size:8pt;letter-spacing:.06em;color:var(--g);text-transform:uppercase;font-size-adjust:none}
.gh .src{font-size:6.8pt;color:var(--ink3);letter-spacing:.05em}
.why{list-style:none;margin:0;padding:0;display:grid;gap:1.2mm}
.why li{font-size:9.6pt;line-height:1.4}
.why li.ok .L{background:var(--g);border-color:var(--g);color:#fff}
.why li.ok b{color:var(--g)}
.why li.no b{color:var(--red)}
.ans{margin:0 0 1.2mm;padding:2mm 3mm;background:var(--mint);border-radius:8px;font-weight:560;color:var(--ink)}
.ex{margin:0;font-size:9.6pt}
.nt{margin:1.6mm 0 0;font-size:8.8pt;color:var(--ink2);background:var(--bg);border-left:2px solid var(--g2);padding:1.4mm 2.6mm;border-radius:0 6px 6px 0}
a{color:inherit;text-decoration:none}
/* respondido: a resposta dentro do cartão da questão */
.qr{break-inside:avoid}
.qr .enun{margin-bottom:2.4mm}
.rc{margin:0 0 1.6mm;padding-top:2mm;border-top:1px dashed var(--line)}
.rc b{font-family:var(--mono);font-size:8pt;letter-spacing:.06em;color:var(--g);text-transform:uppercase;font-size-adjust:none}
@media screen{.rc b{font-size:12px}}
.indice .gl,.irgab a,.volta{font-family:var(--mono);font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--g);font-size-adjust:none}
.irgab,.volta{display:none}
@media screen{
  html{background:#f5fbf7}
  body{max-width:820px;margin:0 auto;padding:20px 16px 60px;font-size:16px;background:#f5fbf7}
  .capa{padding:8px 0 0;margin-bottom:28px}
  .eyebrow{margin-top:28px}
  h1{font-size:clamp(34px,9vw,58px)}
  .lead{font-size:18px}
  .stats{grid-template-columns:repeat(auto-fit,minmax(110px,1fr));background:#fff}
  .stats div{border-left:0;border-top:1px solid var(--line);margin-top:-1px}
  .stats b{font-size:28px}
  .indice .t{text-decoration:underline;text-decoration-color:var(--line);text-underline-offset:3px}
  .indice .it{flex-wrap:wrap}
  .tema,.gab{margin-top:36px;scroll-margin-top:12px}
  .th{padding:18px 20px}
  .th h2{font-size:26px}
  .q{padding:12px 14px;margin-bottom:12px}
  .enun{font-size:17px}
  .alts li,.why li{font-size:15.5px}
  .meta{flex-wrap:wrap;font-size:11px}
  .tp{font-size:10px}.num{font-size:12px;min-width:30px;height:22px}
  .L{width:22px;height:22px;font-size:11px}
  .gab{background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px 16px}
  .gt h2{font-size:24px}
  .gh .src{font-size:11px}.gh b{font-size:12px}
  .ex,.why li{font-size:15.5px}.nt{font-size:14px}.nt b{font-size:10px}
  .irgab{display:block;margin:6px 0 0;text-align:right}
  .volta{display:inline-block;margin-top:6px}
  .irgab a,.volta,.indice .gl{font-size:11px}
  .vf{font-size:13px}
}
@media print{.indice .gl{display:none}}
.nt b{font-family:var(--mono);font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--g);font-size-adjust:none}
`;

const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Banco de questões · 2ª parcial · Anatomía Patológica I</title>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@800&display=swap">' +
  '<style>' + CSS + '</style></head><body>' + capa + temas + '</body></html>';

(async () => {
  const htmlPath = SAIDA.replace(/\.pdf$/, '.html');
  fs.writeFileSync(htmlPath, html);
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(htmlPath), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const fontes = await p.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family).filter((v, i, a) => a.indexOf(v) === i));
  const rodape = '<div style="width:100%;padding:0 14mm;display:flex;justify-content:space-between;font-family:Menlo,monospace;font-size:7px;letter-spacing:.08em;color:#6d897a">' +
    '<span>BANCO DE QUESTÕES · 2ª PARCIAL · ANATOMÍA PATOLÓGICA I · SINUS</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>';
  await p.pdf({ path: SAIDA, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: rodape,
    margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' } });
  await b.close();
  console.log('ok', total, 'questões', 'fontes:', fontes.join(', '));
})();
