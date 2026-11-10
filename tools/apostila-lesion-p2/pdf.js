// SINUS · gera o PDF A4 da apostila P2 (chamado por gerar-pdf.py, que serve o repo e prepara os JPEG).
// Uso direto: JPG_DIR=<pasta com os .jpg> node pdf.js <url-da-apostila> <saida.pdf>
const { chromium } = require('playwright');
(async () => {
  const [url, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  // nada de rede externa além das fontes: vídeo/Drive não entram no PDF
  await p.route(/drive\.google|cdnjs|youtube/, r => r.abort());
  // fotos 3D em JPEG no PDF (o webp vira imagem sem compressão dentro do PDF)
  const JPG = process.env.JPG_DIR;
  if (JPG) await p.route(/img3d\/[^/?]+\.webp/, r => { const n = r.request().url().split('/').pop().split('?')[0].replace('.webp', '.jpg');
    r.fulfill({ path: JPG + '/' + n, contentType: 'image/jpeg' }) });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.emulateMedia({ media: 'print' });
  await p.evaluate(async () => {
    window.__abrirTudo && window.__abrirTudo();
    document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; i.decoding = 'sync' });
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r })));
    await document.fonts.ready;
  });
  await p.waitForTimeout(800);
  const foot = '<div style="width:100%;font:500 8px Inter,Arial,sans-serif;color:#8a94a6;padding:0 10mm;display:flex;justify-content:space-between">' +
    '<span>Anatomía Patológica I · 2ª parcial · Dra. Chamorro · SINUS</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>';
  await p.pdf({ path: out, format: 'A4', printBackground: true, scale: 0.8, displayHeaderFooter: true,
    headerTemplate: '<span></span>', footerTemplate: foot, margin: { top: '10mm', bottom: '14mm', left: '9mm', right: '9mm' } });
  console.log('pdf ok', errs);
  await b.close();
})();
