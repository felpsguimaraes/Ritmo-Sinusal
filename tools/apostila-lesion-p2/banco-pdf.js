// Gera aulas/lesion/p2/banco-questoes-p2.pdf: o banco de questões da 2ª parcial (p2/dados.js) no visual SINUS.
// Cada questão traz embaixo a resposta grifada em amarelo e o comentário; nas de completar, a lacuna vem preenchida.
// Também grava o .html ao lado (versão de tela). Só o PDF é assim: a aba Banco do site continua escondendo a resposta.
// Uso: node tools/apostila-lesion-p2/banco-pdf.js aulas/lesion/p2/dados.js /tmp/banco.pdf
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const [, , DADOS, SAIDA] = process.argv;
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
const grifo = t => '<mark>' + t + '</mark>';
// notas de bastidor não entram no material dos alunos
const NEUTRO = [[/,? mas não tenho a folha original\./, ', mas a folha original não está disponível.']];
const neutro = t => NEUTRO.reduce((s, [a, b]) => s.replace(a, b), String(t || ''));

// numeração única no PDF, tema por tema, na ordem do banco
let num = 0;
const porTema = TEMAS.map(([id, nome]) => ({ id, nome, qs: D.qs.filter(q => q.tema === id).map(q => Object.assign({ N: ++num }, q)) }))
  .filter(t => t.qs.length);
const total = num;
if (total !== D.qs.length) throw new Error('questões sem tema conhecido: ' + (D.qs.length - total));
const conta = k => D.qs.filter(q => q.t === k).length;

function origem(q) {
  const f = FONTE[q.p] || {};
  return esc(f.titulo || q.p) + ' · questão ' + esc(q.n) + (f.pags ? ' · págs. ' + esc(f.pags) + ' do PDF das provas' : '');
}
// completar: põe a resposta, grifada, no lugar de cada lacuna; devolve null se não couber
const MAIUSC = /^(Rojo|Azul|Sudán|Russell|Mallory|PAS|Perls)\b/;
function preenchida(q) {
  const lac = q.q.match(/_{2,}/g) || [];
  if (!lac.length) return null;
  const partes = String(q.a).replace(/\.\s*$/, '').split(/\s*;\s*/);
  if (partes.length !== lac.length) return null;
  let i = 0;
  return esc(q.q).replace(/_{2,}/g, (m, pos, s) => {
    let r = partes[i++];
    const antes = s.slice(0, pos).trim();
    const inicio = !antes || /[.:?!]$/.test(antes);
    if (!inicio && !MAIUSC.test(r)) r = r.charAt(0).toLowerCase() + r.slice(1);
    return grifo(esc(r));
  });
}
function questao(q) {
  let enun = esc(q.q), corpo = '';
  if (q.t === 'mc') {
    corpo = '<ol class="alts">' + q.o.map((o, k) => {
      const ok = q.ok.indexOf(k) >= 0;
      return '<li class="' + (ok ? 'ok' : 'no') + '"><span class="L">' + LET[k] + '</span><div><p class="op" lang="es">' + (ok ? grifo(esc(o)) : esc(o)) + '</p>' +
        '<p class="why"><b>' + (ok ? 'Certa.' : 'Errada.') + '</b> ' + esc(q.w[k]) + '</p></div></li>';
    }).join('') + '</ol>';
  } else if (q.t === 'vf') {
    corpo = '<p class="vf"><span>' + (q.ok ? grifo('(X) Verdadero') : '( ) Verdadero') + '</span><span>' + (q.ok ? '( ) Falso' : grifo('(X) Falso')) + '</span></p>' +
      '<p class="ex">' + esc(q.e) + '</p>';
  } else {
    const cheia = q.t === 'comp' ? preenchida(q) : null;
    if (cheia) enun = cheia;
    corpo = (cheia ? '' : '<p class="ans"><b>Resposta</b> <span lang="es">' + grifo(esc(q.a)) + '</span></p>') + '<p class="ex">' + esc(q.e) + '</p>';
  }
  return '<article class="q"><p class="meta"><span class="num">' + q.N + '</span><span class="src">' + origem(q) + '</span><span class="tp">' + TIPO[q.t] + '</span></p>' +
    '<p class="enun" lang="es">' + enun + '</p>' + corpo + (q.nt ? '<p class="nt"><b>Obs.</b> ' + esc(neutro(q.nt)) + '</p>' : '') + '</article>';
}

const capa = '<section class="capa">' +
  '<div class="brand">sinus<span>.</span></div>' +
  '<p class="eyebrow">Anatomía Patológica I · 2ª parcial · Dra. Eliana Chamorro</p>' +
  '<h1>Banco de <em>questões</em>.</h1>' +
  '<p class="lead">As questões das provas da Dra. Chamorro e dos bancos Robbins e PEF que ela usa, com o enunciado igual ao original e o porquê de cada alternativa.</p>' +
  '<div class="stats">' +
    [[total, 'questões'], [conta('mc'), 'múltipla escolha'], [conta('cita'), 'cita'], [conta('comp'), 'completa'], [conta('vf'), 'verdadero o falso']]
      .map(([n, t]) => '<div><b>' + n + '</b><span>' + t + '</span></div>').join('') +
  '</div>' +
  '<div class="indice"><p class="lab">Temas</p>' + porTema.map((t, i) =>
    '<p class="it"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><a class="t" href="#t-' + t.id + '">' + esc(t.nome) + '</a><span class="c">' + t.qs.length + ' questões · ' + t.qs[0].N + '–' + t.qs[t.qs.length - 1].N + '</span></p>').join('') +
  '</div>' +
  '<div class="como"><p class="lab">Como ler</p><p>Todas as respostas estão ' + grifo('grifadas em amarelo') + ', e o comentário vem logo embaixo de cada questão. Nas de múltipla escolha, cada alternativa traz o porquê de estar certa ou errada. Nas de completar, a lacuna já vem preenchida.</p>' +
  '<p>Os enunciados estão em espanhol, como na prova. As explicações estão em português. A fonte de cada questão aparece em cima dela, com as páginas do PDF das provas originais.</p></div>' +
  '</section>';

const temas = porTema.map((t, i) =>
  '<section class="tema" id="t-' + t.id + '">' +
    '<header class="th"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><div><p class="k">Tema</p><h2>' + esc(t.nome) + '</h2><p class="s">' + t.qs.length + ' questões · ' + t.qs[0].N + ' a ' + t.qs[t.qs.length - 1].N + '</p></div></header>' +
    t.qs.map(questao).join('') +
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
.th .k{margin:0;font-size:7.2pt;letter-spacing:.24em;text-transform:uppercase;opacity:.8}
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
.nt{margin:1.6mm 0 0;font-size:8.8pt;color:var(--ink2);background:var(--bg);border-left:2px solid var(--g2);padding:1.4mm 2.6mm;border-radius:0 6px 6px 0}
a{color:inherit;text-decoration:none}
mark{background:#ffe94a;color:inherit;padding:0 .14em;border-radius:2px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.alts{gap:2mm}
.alts li{align-items:flex-start}
.alts .op{margin:0;font-size:10.4pt;line-height:1.4}
.alts .why{margin:.4mm 0 0;font-size:9pt;line-height:1.38;color:var(--ink2)}
.alts li.ok .L{background:var(--g);border-color:var(--g);color:#fff}
.alts li.ok .why b{color:var(--g)}
.alts li.no .why b{color:var(--red)}
.q .ex{margin:1.8mm 0 0;font-size:9.6pt;color:var(--ink2)}
.q .ans{margin:0;font-size:10.4pt}
.q .ans b{font-family:var(--mono);font-size:7.2pt;letter-spacing:.14em;text-transform:uppercase;color:var(--g);margin-right:1.6mm;font-size-adjust:none}
.vf{gap:8mm}
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
  .tema{margin-top:36px;scroll-margin-top:12px}
  .th{padding:18px 20px}
  .th h2{font-size:26px}
  .q{padding:12px 14px;margin-bottom:12px}
  .enun{font-size:17px}
  .alts .op{font-size:16.5px}.alts .why{font-size:14.5px}.q .ans{font-size:16.5px}.q .ans b{font-size:11px}
  .meta{flex-wrap:wrap;font-size:11px}
  .tp{font-size:10px}.num{font-size:12px;min-width:30px;height:22px}
  .L{width:22px;height:22px;font-size:11px}
  .q .ex{font-size:15px}.nt{font-size:14px}.nt b{font-size:10px}
  .vf{font-size:13px}
}
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
