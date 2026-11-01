// Ajusta (uma vez) as linhas de texto dos diagramas SVG do atlas que vazam das caixas:
// mede no Chromium com fonte Arial e grava textLength/lengthAdjust em src/folhas-manuscritas.html.
// Uso (na raiz): node tools/apostila-farmacologia/ajustar-svg-folhas.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const HERE = dirname(fileURLToPath(import.meta.url));
const ARQ = join(HERE, 'src/folhas-manuscritas.html');
const { chromium } = createRequire(import.meta.url)('playwright');
let html = readFileSync(ARQ, 'utf8');
const b = await chromium.launch(); const p = await b.newPage();
await p.setContent(`<style>svg text{font-family:Arial,"Liberation Sans",sans-serif;letter-spacing:-.015em}</style>${html}`);
const ajustes = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('svg').forEach((svg, si) => {
    const W = svg.viewBox.baseVal.width;
    const rects = [...svg.querySelectorAll('rect')].map((r) => r.getBBox());
    svg.querySelectorAll('text').forEach((t, ti) => {
      const bb = t.getBBox(), anchor = t.getAttribute('text-anchor');
      const host = rects.filter((r) => bb.y >= r.y - 2 && bb.y <= r.y + r.height && (anchor === 'middle' ? Math.abs(r.x + r.width / 2 - +t.getAttribute('x')) < 3 : +t.getAttribute('x') >= r.x - 1 && +t.getAttribute('x') <= r.x + r.width))
        .sort((a, c) => a.width * a.height - c.width * c.height)[0];
      let max = host ? (anchor === 'middle' ? host.width - 16 : host.x + host.width - 8 - +t.getAttribute('x')) : W - 8 - +t.getAttribute('x');
      if (t.getComputedTextLength() > max) out.push({ si, ti, len: Math.floor(max) });
    });
  });
  return out;
});
await b.close();
// aplica na mesma ordem (svg → text)
let si = -1;
html = html.replace(/<svg[\s\S]*?<\/svg>/g, (svg) => { si++; let ti = -1;
  return svg.replace(/<text\b/g, (m) => { ti++; const a = ajustes.find((x) => x.si === si && x.ti === ti);
    return a ? `<text textLength="${a.len}" lengthAdjust="spacingAndGlyphs"` : m; }); });
writeFileSync(ARQ, html);
console.log(`linhas ajustadas: ${ajustes.length}`);
