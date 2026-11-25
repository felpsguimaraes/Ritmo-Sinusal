'use strict';
/* O Laminário de Anatomía Patológica I separa P1, P2 e Final sem duplicar foto nem ID. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('aulas/flashcards/cartoes.js', 'utf8'), ctx, { filename: 'cartoes.js' });
const D = ctx.window.SINUS_CARTOES;
assert.ok(D, 'SINUS_CARTOES não carregou');

function fotos(cs) { return (cs || []).filter(function (c) { return !c.video && c.g !== 'Vídeos'; }); }
function videos(cs) { return (cs || []).filter(function (c) { return c.video || c.g === 'Vídeos'; }); }

const p1 = D['anatopato/p1'];
const p2 = D['anatopato/p2'];
const fin = D['anatopato/final'];
assert.ok(p1 && p2 && fin, 'Faltam os baralhos P1, P2 ou Final');
assert.equal(p1.curto, 'P1');
assert.equal(p2.curto, 'P2');
assert.equal(fin.curto, 'Final');
assert.equal(fotos(p1.cartoes).length, 5, 'P1 deve manter as 5 lâminas originais');
assert.equal(fotos(p2.cartoes).length, 143, 'P2 deve ter exatamente as 143 lâminas originais');
assert.equal(videos(p2.cartoes).length, 7, 'Os 7 vídeos continuam no complemento da P2');
assert.equal(p2.cartoes.length, 150);
assert.equal(fin.cartoes.length, 55, 'Final deve ter as 40 fotos adicionais + 6 de teratoma + 9 enviadas em 25/11');
assert.equal(videos(fin.cartoes).length, 0);

const esperados = {
  '11 · Adenoma pleomorfo': 7,
  '12 · Adenocarcinoma de esófago': 6,
  '13 · Carcinoma escamoso de piel': 9,
  '14 · Lipoma': 6,
  '15 · Liposarcoma': 6,
  '16 · Leiomioma intramural': 10,
  '17 · Leiomiosarcoma': 2,
  '18 · Teratoma ovárico maduro': 9
};
const contagem = {};
fin.cartoes.forEach(function (c) { contagem[c.g] = (contagem[c.g] || 0) + 1; });
assert.deepEqual(contagem, esperados);
p2.cartoes.forEach(function (c) {
  assert.ok(!/^1[1-7] ·/.test(c.g || ''), 'Assunto 11–17 não pode permanecer na P2: ' + c.id);
});

const ids = new Map();
const imgs = new Map();
['anatopato/p1', 'anatopato/p2', 'anatopato/final'].forEach(function (k) {
  D[k].cartoes.forEach(function (c) {
    assert.ok(c.id, 'Cartão sem ID em ' + k);
    assert.ok(!ids.has(c.id), 'ID duplicado entre períodos: ' + c.id);
    ids.set(c.id, k);
    if (c.img) {
      assert.ok(!imgs.has(c.img), 'Foto duplicada entre períodos: ' + c.img + ' (' + c.id + ')');
      imgs.set(c.img, c.id);
    }
    if (!c.video) {
      const b = c.b && c.b[0];
      assert.ok(b && b.o && b.p && b.x && b.d && b.d.length, 'Resposta incompleta em ' + c.id);
    }
  });
});

assert.equal(D['anatopato/p2-videos']._oculto, true);
assert.equal(D['anatopato/p2-referencias']._oculto, true);
assert.equal(D['anatopato/p2-sin-rotulo']._oculto, true);
assert.ok(D['anatopato/laminario'] && !D['anatopato/laminario']._oculto, 'A tabela da cátedra continua disponível');
assert.ok(D['farmacologia/gimenez'], 'Outros baralhos precisam continuar no catálogo');
assert.ok(D['farmacologia/gimenez'].cartoes.length > 100);

const ui = fs.readFileSync('sinus/integracao-v17.js', 'utf8');
assert.match(ui, /function htmlLaminario/);
assert.match(ui, /data-sx-grupo-local/);
assert.match(ui, /sinus_cartoes_migrou_final/);
assert.match(fs.readFileSync('sinus/entrada.js', 'utf8'), /cartoes\.js\?v=\d+/);
assert.match(ui, /c\.fe && c\.fe\.length/, 'O esquema do quadro (fe) precisa ser exibido no Laminário');

/* Teratoma ovárico maduro: resposta do slide (Clase 6, diapositiva 42), diapositiva e esquemas do quadro. */
const terato = fin.cartoes.filter(function (c) { return c.g === '18 · Teratoma ovárico maduro'; });
terato.forEach(function (c) {
  assert.equal(c.b[0].o, 'Ovario');
  assert.equal(c.b[0].p, 'Neoplásico benigno');
  assert.equal(c.b[0].x, 'Teratoma ovárico maduro');
  assert.ok(c.fd && c.fd.length === 1 && c.fe && c.fe.length === 2, 'Teratoma precisa de diapositiva e 2 esquemas: ' + c.id);
  [c.img].concat(c.fd, c.fe).forEach(function (u) {
    assert.ok(fs.existsSync(u.replace(/^\//, '')), 'Imagem inexistente: ' + u);
  });
});
/* Fotos dos órgãos (peças macroscópicas) das diapositivas da Clase 6 · Neoplasias (prática). */
assert.match(ui, /c\.fo && c\.fo\.length/, 'A foto do órgão (fo) precisa ser exibida no Laminário');
const orgaos = { '14 · Lipoma': 2, '15 · Liposarcoma': 1, '11 · Adenoma pleomorfo': 1, '17 · Leiomiosarcoma': 1, '18 · Teratoma ovárico maduro': 3 };
Object.keys(orgaos).forEach(function (g) {
  const cs = fin.cartoes.filter(function (c) { return c.g === g; });
  assert.ok(cs.length > 0, 'Grupo ausente: ' + g);
  cs.forEach(function (c) {
    assert.equal((c.fo || []).length, orgaos[g], 'Fotos do órgão em ' + c.id);
    c.fo.forEach(function (u) { assert.ok(fs.existsSync(u.replace(/^\//, '')), 'Imagem inexistente: ' + u); });
  });
});
assert.doesNotMatch(fs.readFileSync('sinus/treino-hub.js', 'utf8'), /data-sx-filtro/);

console.log('Laminário OK: P1 ' + fotos(p1.cartoes).length + ' fotos, P2 ' + fotos(p2.cartoes).length + ' fotos e ' + videos(p2.cartoes).length + ' vídeos, Final ' + fin.cartoes.length + ' fotos.');
