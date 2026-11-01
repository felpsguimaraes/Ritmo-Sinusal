// SINUS · Apostila de Farmacología I · P2 — versão para impressão (PDF A4).
// Uso (na raiz): node tools/apostila-farmacologia/gerar.mjs && node tools/apostila-farmacologia/gerar-pdf.mjs
// Saída: aulas/apostila-farmacologia/apostila-farmacologia-p2.pdf
// Sem exercícios: no lugar deles, o convite para treinar no app (questões, flashcards e mapas mentais).
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
const marca = (p) => readFileSync(join(HERE, 'marca', p), 'utf8').replace(/<title>.*?<\/title>/, '');

const ctx = { window: {} }; vm.createContext(ctx);
['questoes.js', 'cartoes.js'].forEach((f) => vm.runInContext(src(f), ctx));
const Q = ctx.window.SINUS_QUESTOES, C = ctx.window.SINUS_CARTOES;
const APP = 'meusinus.pages.dev';
const QR = marca('qr-treino.svg').replace(/<\?xml[^>]*>\s*/, '').replace('<svg', '<svg class="qr"');
const LOGO = marca('sinus-logo-horizontal.svg');

let html = readFileSync(join(ROOT, 'aulas/apostila-farmacologia/index.html'), 'utf8');
const rep = (a, b) => { if (!html.includes(a)) throw new Error('não achei: ' + a.slice(0, 60)); html = html.replace(a, b); };

/* 1) tira tudo o que é interativo */
html = html.replace(/<nav class="tabs"[\s\S]*?<\/nav>/, '')
  .replace(/<nav class="toc"[\s\S]*?<\/nav>/, '')
  .replace(/<div class="box" style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><span class="lb">Pratique no Treino da matéria<\/span>[\s\S]*?<\/a><\/div>/, '')
  .replace(/<label class="check">[\s\S]*?<\/label>/g, '')
  .replace(/<div class="progress">[\s\S]*?<\/div>\s*<div class="mini" id="progtxt">[\s\S]*?<\/div>/, '')
  .replace(/<a class="rt" href="\/"[^>]*>[\s\S]*?<\/a>/, '<span class="rt">Cadernos de Medicina</span>')
  .replace(/<script>[\s\S]*?<\/script>/, '')
  .replace('<div data-pane="consulta" hidden>', '<div data-pane="consulta">');

/* 2) convite ao app no fim de cada módulo (no lugar dos exercícios) */
const ORDEM = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'];
const convite = (k, titulo) => {
  const nq = Q[k].filter((q) => q.tipo !== 'ab').length, nab = Q[k].filter((q) => q.tipo === 'ab').length, nc = C[k].length + nab;
  return `<aside class="ad"><div class="ad-txt"><span class="ad-k">Treine este módulo no app SINUS</span>
<h3>${titulo}: agora é com você</h3>
<ul><li><b>${nq} questões</b> de múltipla escolha e V/F, com correção e justificativa na hora</li><li><b>${nc} flashcards</b> com repetição espaçada${nab ? ', incluindo respostas abertas' : ''}</li><li><b>Mapas mentais para completar</b>, do nível guiado ao modo prova</li></ul>
<p>Abra <b>${APP}</b> → Farmacología I → <b>Treino</b>. Seu progresso fica salvo na sua conta.</p></div>${QR}</aside>`;
};
let i = 0;
html = html.replace(/(<section class="grupo" id="mod(\d)">[\s\S]*?)(?=<section class="grupo" id="mod\d">|\n<\/div>\n<div data-pane="consulta">)/g, (m, corpo, n) => {
  const k = ORDEM[+n - 1], titulo = (corpo.match(/<h2>(.*?)<\/h2>/) || [, ''])[1];
  i++;
  return corpo.replace(/<\/section>\s*$/, '') + convite(k, titulo) + '</section>\n';
});
if (i !== 7) throw new Error('módulos encontrados: ' + i);

/* 3) capa e página final de divulgação */
const NQ = ORDEM.reduce((n, k) => n + Q[k].filter((q) => q.tipo !== 'ab').length, 0);
const NC = ORDEM.reduce((n, k) => n + C[k].length + Q[k].filter((q) => q.tipo === 'ab').length, 0) + 17;
const capa = `<section class="capa"><div class="capa-top">${LOGO}<span>Cadernos de Medicina</span></div>
<div class="capa-meio"><span class="chip">FARMACOLOGÍA I · UCP · P2</span><h1>Apostila de farmacologia</h1><p class="sub">Clases 6 a 9 · SNA, colinérgicos, adrenérgicos, AINEs, opioides e corticoides</p>
<div class="rule"></div><p class="tag">Entender o mecanismo. Explicar a resposta.</p>
<p class="leg"><mark class="my">amarelo</mark> cai na prova · <mark class="mr">vermelho</mark> alerta / erro clássico · <b>negrito</b> termo-chave</p></div>
<div class="capa-pe"><b>FELPS ©</b> 2026 · Felipe Guimarães de Souza · Todos os direitos reservados<br>Base: aulas do Dr. Cristhiam Giménez · UCP / CDE</div></section>`;
const final = `<section class="final"><div>${LOGO}</div><h2>Leu? Agora treine no app.</h2>
<p class="big">Tudo o que você estudou aqui vira prática no <b>SINUS</b>, com correção na hora e progresso salvo.</p>
<div class="nums"><div><b>${NQ}</b><span>questões</span></div><div><b>${NC}</b><span>flashcards</span></div><div><b>68</b><span>mapas mentais</span></div></div>
<div class="qrbox">${QR}<div><b>Escaneie ou acesse</b><br><span class="url">${APP}</span><br>Farmacología I → <b>Treino</b></div></div>
<p class="foot">Seu estudo. Seu tempo. Seu ritmo. · <b>FELPS ©</b> 2026</p></section>`;
rep('<div class="wrap">', '<div class="wrap">' + capa);
rep('<div data-pane="consulta">', final + '<div data-pane="consulta">');

/* 4) estilos de impressão */
const css = `
@page{size:A4;margin:20mm 14mm 18mm 14mm}
html,body{background:#fff!important}
body{padding:0!important;font-size:14px}
body::before{display:none!important}
.brandbar,header.top,footer.pe,.howto{display:none!important}
.wrap{max-width:none}
.cap{box-shadow:none!important;backdrop-filter:none!important;background:#fff!important;border:1px solid #dfe8e2!important;border-radius:16px!important;padding:16px 18px!important;margin:12px 0!important;break-inside:auto!important}
.cap .head{break-after:avoid}
.cap p{font-size:13.5px}
.flow,.tree,.cmp,.box,table.t tr,.ad,.st,.br,.cd{break-inside:avoid}
.tw{break-inside:auto;overflow:visible}
.box.exp{break-inside:auto!important}.box.exp p{font-size:13px;line-height:1.55;orphans:3;widows:3}
h3.sub,.grupo-h{break-after:avoid}
section.grupo{break-before:page;margin-top:0}
.dt{display:block!important}.has{padding-right:12px!important}.has:after{display:none!important}
mark,.c1,.c2,.c3,.c4,.c5,.tree .root,.cmp .cd h4,.box,.ad,table.t thead th{-webkit-print-color-adjust:exact;print-color-adjust:exact}
.capa{height:250mm;display:flex;flex-direction:column;break-after:page}
.capa-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #d6e4dc;padding-bottom:14px}
.capa-top svg{height:44px;width:auto}.capa-top span{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6b7770}
.capa-meio{margin-top:70px}.chip{display:inline-block;background:#e8f3ec;color:#176e5b;font-weight:800;font-size:12px;letter-spacing:.06em;padding:8px 14px;border-radius:8px}
.capa h1{font-size:52px;font-weight:800;letter-spacing:-.03em;margin:24px 0 10px;line-height:1.05}
.capa .sub{font-size:19px;color:#176e5b;font-weight:600;margin:0}.capa .rule{width:56px;height:3px;background:#176e5b;margin:30px 0;border-radius:3px}
.capa .tag{font-size:16px;color:#5f6664}.capa .leg{font-size:13px;color:#5f6664;margin-top:30px}
.capa-pe{margin-top:auto;border-top:1px solid #d6e4dc;padding-top:14px;font-size:12px;color:#5f6664;line-height:1.7}
.ad{display:flex;gap:18px;align-items:center;justify-content:space-between;margin:18px 0 6px;padding:18px 20px;border-radius:18px;background:linear-gradient(135deg,#176e5b,#0c4a3b);color:#fff}
.ad *{color:#fff!important}.ad-k{font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;opacity:.85}
.ad h3{font-size:20px;margin:4px 0 8px}.ad ul{margin:0 0 8px;padding-left:18px;font-size:13px;line-height:1.6}.ad p{font-size:12.5px;margin:0}
.ad .qr{flex:none;width:112px;height:112px;background:#fff;border-radius:12px;padding:6px}
.final{break-before:page;break-after:page;height:250mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px}
.final svg{height:48px;width:auto}.final h2{font-size:40px;font-weight:800;letter-spacing:-.03em;margin:10px 0 0}
.final .big{font-size:17px;color:#33433c;max-width:520px;margin:0}
.final .nums{display:flex;gap:16px;margin:10px 0}.final .nums div{border:1.5px solid #176e5b;border-radius:16px;padding:14px 22px;min-width:120px}
.final .nums b{display:block;font-size:34px;color:#176e5b}.final .nums span{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#5f6664}
.final .qrbox{display:flex;gap:18px;align-items:center;text-align:left;border-radius:20px;padding:18px 22px;background:#e8f3ec}
.final .qr{width:150px;height:150px;background:#fff;border-radius:12px;padding:8px}.final .url{font-size:20px;font-weight:800;color:#176e5b}
.final .foot{font-size:12px;color:#6b7770;margin-top:18px}
`;
rep('</style>', css + '</style>');

const out = join(ROOT, 'aulas/apostila-farmacologia/impressao.html');
writeFileSync(out, html);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(out).href, { waitUntil: 'load' });
const logoMini = marca('sinus-icone.svg').replace('<svg ', '<svg width="14" height="14" ');
await page.pdf({
  path: join(ROOT, 'aulas/apostila-farmacologia/apostila-farmacologia-p2.pdf'),
  format: 'A4', printBackground: true, displayHeaderFooter: true,
  margin: { top: '20mm', bottom: '18mm', left: '14mm', right: '14mm' },
  headerTemplate: `<div style="width:100%;font:600 8.5px Inter,Arial,sans-serif;color:#6b7770;padding:0 14mm;display:flex;justify-content:space-between;align-items:center"><span style="display:flex;gap:6px;align-items:center">${logoMini}<b style="color:#10352a">sinus.</b></span><span>FARMACOLOGÍA I · P2 · CLASES 6–9</span></div>`,
  footerTemplate: `<div style="width:100%;font:500 8.5px Inter,Arial,sans-serif;color:#6b7770;padding:0 14mm;display:flex;justify-content:space-between"><span><b style="color:#10352a">FELPS ©</b> 2026 · Treine no app: ${APP}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
});
const n = await page.evaluate(() => document.querySelectorAll('article.cap[data-cap]').length);
await browser.close();
console.log(`PDF gerado: ${n} capítulos · 7 convites ao app · capa e página final`);
