/* Sinus · Mapas guiados — tela.
   A estrutura (ramos, setas, decisões, colunas) vem pronta; o aluno só completa as lacunas. */
(function () {
  'use strict';
  var Core = window.MapasCore;
  var DATA = window.SINUS_MAPAS || {};
  var KEY_BASE = 'sinus_mapas_v1';

  /* ---------- idioma da interface (o conteúdo fica no idioma da aula) ---------- */
  var LANG = 'pt';
  try { var l = localStorage.getItem('sinus_idioma'); if (l === 'es' || l === 'en' || l === 'pt') LANG = l; } catch (e) {}
  var TT = {
    pt: { app: 'Mapas guiados', sub: 'A estrutura já está montada. Complete os campos e ligue os assuntos; use Verificar para comparar com o gabarito.', all: 'Todos os mapas', check: 'Verificar', reveal: 'Mostrar gabarito', hide: 'Ocultar gabarito', clear: 'Limpar', clear2: 'Confirmar limpeza', empty: 'Vazio', filled: 'Preenchido', ok: 'Correto', part: 'Parcial', miss: 'Revisar', blank: 'Em branco', toReview: 'Para revisar', gab: 'Gabarito', you: 'Você: ', waiting: 'O gabarito deste mapa aparece aqui depois de Verificar.', nothing: 'Nada para revisar por enquanto.', fields: 'campos', filledN: 'preenchidos', okN: 'corretos', partN: 'parciais', missN: 'para revisar', blankN: 'em branco', map: 'Mapa mental', flow: 'Fluxograma', table: 'Tabela', source: 'Fonte', prev: '← Anterior', next: 'Próximo →', drag: 'No celular, arraste o mapa para os lados.', ph: 'Sua resposta', phCell: 'Complete', semester: 'º semestre', subjects: 'Matérias', open: 'Abrir', of: 'de' },
    es: { app: 'Mapas guiados', sub: 'La estructura ya está armada. Completá los campos y conectá los temas; usá Verificar para comparar con la respuesta.', all: 'Todos los mapas', check: 'Verificar', reveal: 'Mostrar respuestas', hide: 'Ocultar respuestas', clear: 'Limpiar', clear2: 'Confirmar limpieza', empty: 'Vacío', filled: 'Completado', ok: 'Correcto', part: 'Parcial', miss: 'Revisar', blank: 'En blanco', toReview: 'Para revisar', gab: 'Respuesta', you: 'Vos: ', waiting: 'Las respuestas de este mapa aparecen acá después de Verificar.', nothing: 'Nada para revisar por ahora.', fields: 'campos', filledN: 'completados', okN: 'correctos', partN: 'parciales', missN: 'para revisar', blankN: 'en blanco', map: 'Mapa mental', flow: 'Flujograma', table: 'Tabla', source: 'Fuente', prev: '← Anterior', next: 'Siguiente →', drag: 'En el celular, arrastrá el mapa hacia los costados.', ph: 'Tu respuesta', phCell: 'Completá', semester: 'º semestre', subjects: 'Materias', open: 'Abrir', of: 'de' },
    en: { app: 'Guided maps', sub: 'The structure is already built. Fill in the blanks and connect the topics; use Check to compare with the answers.', all: 'All maps', check: 'Check', reveal: 'Show answers', hide: 'Hide answers', clear: 'Clear', clear2: 'Confirm clear', empty: 'Empty', filled: 'Filled', ok: 'Correct', part: 'Partial', miss: 'Review', blank: 'Blank', toReview: 'To review', gab: 'Answer', you: 'You: ', waiting: 'The answers for this map appear here after Check.', nothing: 'Nothing to review for now.', fields: 'fields', filledN: 'filled', okN: 'correct', partN: 'partial', missN: 'to review', blankN: 'blank', map: 'Mind map', flow: 'Flowchart', table: 'Table', source: 'Source', prev: '← Previous', next: 'Next →', drag: 'On a phone, drag the map sideways.', ph: 'Your answer', phCell: 'Fill in', semester: 'th semester', subjects: 'Subjects', open: 'Open', of: 'of' }
  };
  var T = TT[LANG];

  /* ---------- tema (o painel guarda sinus_tema em localStorage) ---------- */
  function applyTheme() {
    var t = null;
    try { t = localStorage.getItem('sinus_tema'); } catch (e) {}
    if (t !== 'claro' && t !== 'escuro') t = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'escuro' : 'claro';
    document.documentElement.setAttribute('data-theme', t === 'escuro' ? 'dark' : 'light');
  }
  applyTheme();
  window.addEventListener('storage', function (e) { if (e.key === 'sinus_tema') applyTheme(); });
  window.addEventListener('message', function (e) { if (e.data && e.data.sinusTema) { try { localStorage.setItem('sinus_tema', e.data.sinusTema); } catch (x) {} applyTheme(); } });

  /* ---------- estado salvo (por aluno, neste aparelho) ---------- */
  var uid = 'anon';
  try { uid = (window.parent && window.parent !== window && window.parent.SinusApp && window.parent.SinusApp.S && window.parent.SinusApp.S.uid) || 'anon'; } catch (e) {}
  var KEY = KEY_BASE + '_' + uid;
  var S = { a: {}, c: {}, v: {}, r: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) { var o = JSON.parse(raw); if (o && o.a) S = { a: o.a || {}, c: o.c || {}, v: o.v || {}, r: o.r || {} }; } } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- utilidades ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function txt(s) { return document.createTextNode(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ICON = { ok: '✓', part: '~', miss: '×' }, LABEL = { ok: T.ok, part: T.part, miss: T.miss, empty: T.blank };
  var TYPE = { mapa: T.map, fluxo: T.flow, tabla: T.table };
  var TYPE_SVG = {
    mapa: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5.5" r="2"/><circle cx="19.5" cy="5.5" r="2"/><circle cx="4.5" cy="18.5" r="2"/><circle cx="19.5" cy="18.5" r="2"/><path d="M9.2 10.4 6 7M14.8 10.4 18 7M9.2 13.6 6 17M14.8 13.6 18 17"/></svg>',
    fluxo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="5" rx="1.5"/><rect x="8" y="17" width="8" height="5" rx="1.5"/><path d="M12 7v4m0 0-6 3v3m6-6 6 3v3"/></svg>',
    tabla: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></svg>'
  };

  var allMods = [];
  Object.keys(DATA).forEach(function (sid) {
    DATA[sid].modulos.forEach(function (m, i) { m.sid = sid; m.idx = i; Core.compile(m); allMods.push(m); });
  });
  function findMod(sid, mid) { for (var i = 0; i < allMods.length; i++) if (allMods[i].sid === sid && allMods[i].id === mid) return allMods[i]; return null; }

  function stats(mod) {
    var f = 0, ok = 0;
    mod._items.forEach(function (it) { if ((S.a[it.id] || '').trim()) f++; if (S.c[it.id] === 'ok') ok++; });
    return { filled: f, ok: ok, total: mod._items.length };
  }
  function statusOf(id) {
    var c = S.c[id];
    if (c && c !== 'empty') return c;
    return (S.a[id] || '').trim() ? 'filled' : 'empty';
  }

  try { if (window.parent !== window) { void window.parent.location.href; document.documentElement.classList.add('embed'); } } catch (e) {}
  var root = document.getElementById('app');
  var cur = null;          // módulo aberto
  var curSid = null;       // matéria selecionada na lista
  var fitFns = [];

  /* ---------- lista de mapas ---------- */
  function renderHome() {
    cur = null; fitFns = [];
    document.title = T.app + ' · Sinus';
    var sids = Object.keys(DATA);
    if (!curSid || !DATA[curSid]) curSid = sids[0];
    root.innerHTML = '';
    var head = el('header', { class: 'head home-head' });
    head.innerHTML = '<div><p class="eyebrow">Sinus · 5' + esc(T.semester) + '</p><h1>' + esc(T.app) + '</h1><p class="sub">' + esc(T.sub) + '</p></div>';
    root.appendChild(head);

    var tabs = el('div', { class: 'subjtabs', role: 'tablist', 'aria-label': T.subjects });
    sids.forEach(function (sid) {
      var b = el('button', { type: 'button', role: 'tab', 'aria-selected': sid === curSid ? 'true' : 'false', class: 'subjtab' });
      var tot = 0, ok = 0, fil = 0;
      DATA[sid].modulos.forEach(function (m) { var s = stats(m); tot += s.total; ok += s.ok; fil += s.filled; });
      b.innerHTML = '<b>' + esc(DATA[sid].nome) + '</b><span>' + DATA[sid].modulos.length + ' mapas · ' + fil + '/' + tot + ' ' + esc(T.fields) + '</span>';
      b.addEventListener('click', function () { curSid = sid; renderHome(); });
      tabs.appendChild(b);
    });
    root.appendChild(tabs);

    var subj = DATA[curSid];
    var info = el('p', { class: 'subjinfo' }, esc(subj.docente) + ' · ' + esc(subj.fonte));
    root.appendChild(info);

    var grid = el('div', { class: 'cards' });
    subj.modulos.forEach(function (m) {
      var s = stats(m), pct = s.total ? Math.round(s.filled / s.total * 100) : 0;
      var a = el('a', { class: 'mcard', href: '#/' + m.sid + '/' + m.id });
      a.innerHTML = '<span class="mico t-' + m.tipo + '">' + TYPE_SVG[m.tipo] + '</span>' +
        '<span class="mbody"><b>' + esc(m.titulo) + '</b><small>' + esc(m.clase) + ' · ' + esc(TYPE[m.tipo]) + '</small>' +
        '<span class="mbar"><i style="width:' + pct + '%"></i></span>' +
        '<small class="mnum">' + s.filled + '/' + s.total + ' ' + esc(T.filledN) + (s.ok ? ' · ' + s.ok + ' ' + esc(T.okN) : '') + '</small></span>';
      grid.appendChild(a);
    });
    root.appendChild(grid);
    window.scrollTo(0, 0);
    notifyHeight();
  }

  /* ---------- tela de um mapa ---------- */
  function openMod(mod) {
    cur = mod; fitFns = [];
    document.title = mod.titulo + ' · ' + T.app;
    root.innerHTML = '';
    var top = el('div', { class: 'top' });
    var back = el('a', { class: 'back', href: '#/' }, esc(T.all));
    top.appendChild(back);
    var meter = el('div', { class: 'meter', 'aria-live': 'polite' });
    meter.innerHTML = '<span id="mtxt"></span><div class="bar"><i id="mbar"></i></div>';
    top.appendChild(meter);
    root.appendChild(top);

    var head = el('header', { class: 'head' });
    head.innerHTML = '<div><p class="eyebrow">' + esc(DATA[mod.sid].nome) + ' · ' + esc(mod.clase) + ' · ' + esc(TYPE[mod.tipo]) + '</p><h1>' + esc(mod.titulo) + '</h1>' + (mod.resumen ? '<p class="sub">' + esc(mod.resumen) + '</p>' : '') + '</div>';
    root.appendChild(head);

    var bar = el('div', { class: 'toolbar' });
    var bCheck = el('button', { type: 'button', class: 'btn primary', id: 'bCheck' }, esc(T.check));
    var bRev = el('button', { type: 'button', class: 'btn', id: 'bRev', 'aria-pressed': 'false' }, esc(T.reveal));
    var bClr = el('button', { type: 'button', class: 'btn ghost', id: 'bClr' }, esc(T.clear));
    var act = el('div', { class: 'actions' });
    act.appendChild(bCheck); act.appendChild(bRev); act.appendChild(bClr);
    var legend = el('ul', { class: 'legend', 'aria-label': 'Legenda' });
    [['empty', T.empty], ['filled', T.filled], ['ok', '✓ ' + T.ok], ['part', '~ ' + T.part], ['miss', '× ' + T.miss]].forEach(function (p) {
      legend.appendChild(el('li', null, '<span class="sw ' + p[0] + '"></span>' + esc(p[1])));
    });
    bar.appendChild(act); bar.appendChild(legend);
    root.appendChild(bar);

    var board = el('div', { class: 'board board-' + mod.tipo });
    if (mod.tipo === 'mapa') buildMap(mod, board);
    else if (mod.tipo === 'fluxo') buildFlow(mod, board);
    else buildTable(mod, board);
    root.appendChild(board);
    if (mod.tipo === 'mapa' && !mod._mobile) root.appendChild(el('p', { class: 'hintline' }, esc(T.drag)));

    var fb = el('section', { class: 'fb', id: 'fb', 'aria-live': 'polite' });
    root.appendChild(fb);

    if (mod.fuente) root.appendChild(el('p', { class: 'src' }, esc(T.source) + ': ' + esc(mod.fuente)));

    var sib = DATA[mod.sid].modulos, i = mod.idx;
    var nav = el('nav', { class: 'pager' });
    if (i > 0) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i - 1].id }, esc(T.prev) + ' <small>' + esc(sib[i - 1].titulo) + '</small>'));
    else nav.appendChild(el('span'));
    if (i < sib.length - 1) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i + 1].id, class: 'nx' }, '<small>' + esc(sib[i + 1].titulo) + '</small> ' + esc(T.next)));
    root.appendChild(nav);

    bindFields(mod);
    mod._items.forEach(function (it) { paint(it.id); });
    refresh(mod);
    bCheck.addEventListener('click', function () {
      mod._items.forEach(function (it) { S.c[it.id] = Core.evaluate(it, S.a[it.id]); });
      S.v[mod.id] = true; save();
      mod._items.forEach(function (it) { paint(it.id); });
      refresh(mod);
    });
    bRev.addEventListener('click', function () { S.r[mod.id] = !S.r[mod.id]; save(); refresh(mod); });
    var clrTimer = null;
    bClr.addEventListener('click', function () {
      if (!bClr.classList.contains('armed')) {
        bClr.classList.add('armed'); bClr.textContent = T.clear2;
        clrTimer = setTimeout(function () { bClr.classList.remove('armed'); bClr.textContent = T.clear; }, 4000);
        return;
      }
      clearTimeout(clrTimer); bClr.classList.remove('armed'); bClr.textContent = T.clear;
      mod._items.forEach(function (it) { delete S.a[it.id]; delete S.c[it.id]; });
      delete S.v[mod.id]; delete S.r[mod.id]; save();
      root.querySelectorAll('[data-f]').forEach(function (f) { f.value = ''; });
      mod._items.forEach(function (it) { paint(it.id); });
      refresh(mod);
    });
    window.scrollTo(0, 0);
    setTimeout(fitAll, 0);
    notifyHeight();
  }

  function bindFields(mod) {
    root.querySelectorAll('[data-f]').forEach(function (f) {
      var id = f.getAttribute('data-f');
      f.value = S.a[id] || '';
      f.addEventListener('input', function () {
        S.a[id] = f.value; delete S.c[id]; save(); paint(id); refresh(mod);
      });
      if (f.matches('.leaf textarea') && !f.closest('.mlist')) f.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    });
  }

  function paint(id) {
    var f = root.querySelector('[data-f="' + id + '"]');
    if (!f) return;
    var holder = f.closest('[data-hold]') || f;
    var st = statusOf(id);
    holder.setAttribute('data-st', st);
    var ico = holder === f ? f.nextElementSibling : holder.querySelector('.ico');
    if (ico && ico.classList.contains('ico')) { ico.textContent = ICON[S.c[id]] || ''; ico.title = LABEL[S.c[id]] || ''; }
    f.setAttribute('aria-description', LABEL[S.c[id]] || '');
  }

  function refresh(mod) {
    var s = stats(mod);
    var mt = document.getElementById('mtxt'), mb = document.getElementById('mbar');
    if (mt) mt.innerHTML = '<b>' + s.filled + '</b> ' + esc(T.of) + ' ' + s.total + ' ' + esc(T.fields) + ' ' + esc(T.filledN) + ' · <b>' + s.ok + '</b> ' + esc(T.okN);
    if (mb) mb.style.width = (s.total ? s.filled / s.total * 100 : 0) + '%';
    var rev = !!S.r[mod.id];
    var br = document.getElementById('bRev');
    if (br) { br.setAttribute('aria-pressed', rev ? 'true' : 'false'); br.textContent = rev ? T.hide : T.reveal; }
    renderFeedback(mod);
    if (mod._counts) mod._counts();
    notifyHeight();
  }

  function renderFeedback(mod) {
    var box = document.getElementById('fb'); if (!box) return;
    box.innerHTML = '';
    var rev = !!S.r[mod.id], ver = !!S.v[mod.id];
    var anyChecked = mod._items.some(function (it) { return S.c[it.id]; });
    var list = mod._items.filter(function (it) {
      var st = S.c[it.id];
      return rev || st === 'part' || st === 'miss';
    });
    box.appendChild(el('h2', null, esc(rev ? T.gab : T.toReview)));
    if (anyChecked || ver) {
      var c = { ok: 0, part: 0, miss: 0, empty: 0 };
      mod._items.forEach(function (it) { var st = S.c[it.id]; if (st) c[st === 'empty' ? 'empty' : st]++; else if (ver) c.empty++; });
      box.appendChild(el('p', { class: 'sum' }, c.ok + ' ' + esc(T.okN) + ' · ' + c.part + ' ' + esc(T.partN) + ' · ' + c.miss + ' ' + esc(T.missN) + ' · ' + c.empty + ' ' + esc(T.blankN)));
    }
    if (!list.length) {
      box.appendChild(el('p', { class: 'sum' }, esc(anyChecked ? T.nothing : T.waiting)));
      return;
    }
    var g = el('div', { class: 'fblist' });
    list.forEach(function (it) {
      var st = S.c[it.id] || ((S.a[it.id] || '').trim() ? 'filled' : 'empty');
      var a = el('article', { class: 'fbi', 'data-st': st });
      var h = el('header'); var s1 = el('span'); s1.textContent = it.label || ''; var s2 = el('span'); s2.textContent = LABEL[st] || ''; h.appendChild(s1); h.appendChild(s2); a.appendChild(h);
      if (it.hint) { var q = el('p', { class: 'q' }); q.textContent = it.hint; a.appendChild(q); }
      var y = (S.a[it.id] || '').trim();
      if (y) { var p = el('p', { class: 'yours' }); p.textContent = T.you + y; a.appendChild(p); }
      var gp = el('p', { class: 'gab' }); gp.appendChild(el('b', null, esc(T.gab) + ': ')); gp.appendChild(txt(it.ans)); a.appendChild(gp);
      g.appendChild(a);
    });
    box.appendChild(g);
  }

  /* ---------- MAPA MENTAL: disposição automática em colunas ---------- */
  var LW = 250, LH = 92, LG = 10, BG = 28, BW = 150, BH = 58, CW = 184, CH = 74;
  var X = { leafL: 10, brL: 320, cen: 578, brR: 870, leafR: 1080 }, CWID = 1340;
  var MOBILE_W = 720;
  function buildMapList(mod, board) {
    var box = el('div', { class: 'mlist' });
    box.appendChild(el('div', { class: 'mcenter' }, '<b>' + esc(mod.centro) + '</b>' + (mod.sub ? '<span>' + esc(mod.sub) + '</span>' : '')));
    mod._tree.forEach(function (b) {
      var sec = el('section', { class: 'mb' });
      sec.appendChild(el('h3', null, '<span>' + esc(b.t) + '</span><small class="cnt" data-cnt="' + esc(b.t) + '"></small>'));
      b.leaves.forEach(function (it) {
        var n = el('div', { class: 'leaf', 'data-hold': '1' });
        n.innerHTML = '<label class="hint" for="in-' + it.id + '">' + esc(it.hint) + '</label><span class="ico" aria-hidden="true"></span><textarea id="in-' + it.id + '" data-f="' + it.id + '" rows="2" spellcheck="false" autocomplete="off" placeholder="' + esc(T.ph) + '"></textarea>';
        sec.appendChild(n);
      });
      box.appendChild(sec);
    });
    board.appendChild(box);
    mod._counts = function () {
      mod._tree.forEach(function (b) {
        var n = b.leaves.filter(function (it) { return (S.a[it.id] || '').trim(); }).length;
        var c = board.querySelector('[data-cnt="' + b.t.replace(/"/g, '\\"') + '"]');
        if (c) c.textContent = n + '/' + b.leaves.length;
      });
    };
  }
  function buildMap(mod, board) {
    if (window.innerWidth < MOBILE_W) { mod._mobile = true; return buildMapList(mod, board); }
    mod._mobile = false;
    var tree = mod._tree, sums = tree.map(function (b) { return b.leaves.length; });
    var total = sums.reduce(function (a, b) { return a + b; }, 0);
    var acc = 0, split = 0, best = 1e9;
    for (var i = 1; i < tree.length; i++) {
      acc += sums[i - 1];
      var diff = Math.abs(acc - (total - acc));
      if (diff < best) { best = diff; split = i; }
    }
    if (tree.length === 1) split = 1;
    var sides = [tree.slice(0, split), tree.slice(split)];
    function groupH(b) { return b.leaves.length * LH + (b.leaves.length - 1) * LG; }
    function sideH(arr) { return arr.length ? arr.reduce(function (a, b) { return a + groupH(b); }, 0) + (arr.length - 1) * BG : 0; }
    var H = Math.max(sideH(sides[0]), sideH(sides[1])) + 48;
    var cy = H / 2;
    var nodes = [], paths = '';
    var cenX = X.cen, cenY = cy - CH / 2;
    nodes.push('<div class="node center" style="left:' + cenX + 'px;top:' + cenY + 'px;width:' + CW + 'px;height:' + CH + 'px"><b>' + esc(mod.centro) + '</b>' + (mod.sub ? '<span>' + esc(mod.sub) + '</span>' : '') + '</div>');
    var leafNodes = [];
    sides.forEach(function (arr, si) {
      var left = si === 0;
      var y = (H - sideH(arr)) / 2;
      arr.forEach(function (b) {
        var gh = groupH(b), by = y + gh / 2, bx = left ? X.brL : X.brR;
        nodes.push('<div class="node branch" data-b="' + esc(b.t) + '" style="left:' + bx + 'px;top:' + (by - BH / 2) + 'px;width:' + BW + 'px;height:' + BH + 'px"><b>' + esc(b.t) + '</b><span class="cnt" data-cnt="' + esc(b.t) + '"></span></div>');
        var sx = left ? cenX : cenX + CW, ex = left ? bx + BW : bx;
        paths += '<path d="M' + sx + ' ' + cy + ' C' + (sx + (left ? -50 : 50)) + ' ' + cy + ' ' + (ex + (left ? 50 : -50)) + ' ' + by + ' ' + ex + ' ' + by + '" class="l1"/>';
        b.leaves.forEach(function (it, j) {
          var ly = y + j * (LH + LG), lx = left ? X.leafL : X.leafR, lcy = ly + LH / 2;
          var s2 = left ? bx : bx + BW, e2 = left ? lx + LW : lx;
          paths += '<path d="M' + s2 + ' ' + by + ' C' + (s2 + (left ? -30 : 30)) + ' ' + by + ' ' + (e2 + (left ? 30 : -30)) + ' ' + lcy + ' ' + e2 + ' ' + lcy + '" class="l2"/>';
          leafNodes.push('<div class="node leaf" data-hold="1" data-br="' + esc(b.t) + '" style="left:' + lx + 'px;top:' + ly + 'px;width:' + LW + 'px;height:' + LH + 'px"><label class="hint" for="in-' + it.id + '">' + esc(it.hint) + '</label><span class="ico" aria-hidden="true"></span><textarea id="in-' + it.id + '" data-f="' + it.id + '" rows="2" spellcheck="false" autocomplete="off" placeholder="' + esc(T.ph) + '"></textarea></div>');
        });
        y += gh + BG;
      });
    });
    var wrap = el('div', { class: 'sizer' });
    var stage = el('div', { class: 'stage' });
    stage.style.width = CWID + 'px'; stage.style.height = H + 'px';
    stage.innerHTML = '<svg width="' + CWID + '" height="' + H + '" aria-hidden="true">' + paths + '</svg>' + nodes.join('') + leafNodes.join('');
    wrap.appendChild(stage); board.appendChild(wrap);
    fitFns.push(function () {
      var avail = board.clientWidth - 2;
      var s = Math.max(0.62, Math.min(1, avail / CWID));
      stage.style.transform = 'scale(' + s + ')';
      wrap.style.width = CWID * s + 'px'; wrap.style.height = H * s + 'px';
    });
    // contadores por ramo
    mod._counts = function () {
      tree.forEach(function (b) {
        var n = b.leaves.filter(function (it) { return (S.a[it.id] || '').trim(); }).length;
        var c = board.querySelector('[data-cnt="' + b.t.replace(/"/g, '\\"') + '"]');
        if (c) c.textContent = n + '/' + b.leaves.length;
      });
    };
  }

  /* ---------- FLUXOGRAMA: empilhado, com colunas quando há decisão ou vias paralelas ---------- */
  function partsHTML(parts) {
    return parts.map(function (p) {
      if (p.s != null) return esc(p.s);
      var it = p.b, long = it.ans.length > 26;
      var w = Math.max(6, Math.min(22, it.ans.length));
      return '<span class="blank">' + (long
        ? '<textarea class="cloze wide" rows="2" id="in-' + it.id + '" data-f="' + it.id + '" aria-label="' + esc(it.label || '') + '" spellcheck="false" placeholder="…"></textarea>'
        : '<input class="cloze" type="text" style="--n:' + w + '" id="in-' + it.id + '" data-f="' + it.id + '" aria-label="' + esc(it.label || '') + '" spellcheck="false" autocomplete="off" placeholder="…">') +
        '<span class="ico" aria-hidden="true"></span></span>';
    }).join('');
  }
  function stepHTML(st, last) {
    if (st.k === 'split') return splitHTML(st);
    var cls = 'fnode' + (st.k === 'f' ? ' fixed' : st.k === 'end' ? ' end' : st.k === 'note' ? ' note' : '') + (last ? ' last' : '');
    return '<div class="' + cls + '">' + (st.k === 'note' && st.title ? '<small>' + esc(st.title) + '</small>' : '') + '<div class="ft">' + partsHTML(st.p) + '</div></div>';
  }
  function chainHTML(steps, labelHTML, lastFill) {
    var out = '<div class="drop">' + (labelHTML || '') + '</div>';
    steps.forEach(function (st, i) {
      if (i > 0) out += '<div class="arrow"></div>';
      out += stepHTML(st, lastFill && i === steps.length - 1 && st.k !== 'split');
    });
    return out;
  }
  function splitHTML(sp) {
    var n = sp.cols.length;
    var out = '';
    if (sp.q) {
      out += '<div class="decision"><svg viewBox="0 0 300 118" preserveAspectRatio="none" aria-hidden="true"><polygon points="150,2 298,59 150,116 2,59"/></svg><span>' + esc(sp.q) + '</span></div>';
    }
    if (sp.q) out += '<div class="stem"></div>';
    out += '<div class="split' + (sp.join ? ' join' : '') + '" style="--n:' + n + '">';
    sp.cols.forEach(function (c) {
      out += '<div class="col">' + chainHTML(c.s, c.l ? '<span class="lab">' + esc(c.l) + '</span>' : '', sp.join) + (sp.join ? '<div class="rise"></div>' : '') + '</div>';
    });
    out += '</div>';
    return out;
  }
  function buildFlow(mod, board) {
    var wrap = el('div', { class: 'flow' });
    var html = '';
    mod._tree.forEach(function (st, i) {
      if (i > 0) html += '<div class="arrow"></div>';
      html += stepHTML(st, false);
    });
    wrap.innerHTML = html;
    board.appendChild(wrap);
  }

  /* ---------- TABELA ---------- */
  function buildTable(mod, board) {
    var tree = mod._tree;
    var box = el('div', { class: 'tablewrap' });
    var h = '<table class="tbl"><thead><tr>' + tree.cols.map(function (c) { return '<th scope="col">' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
    tree.rows.forEach(function (row) {
      h += '<tr>' + row.map(function (cell, ci) {
        var tag = ci === 0 ? 'th scope="row"' : 'td';
        var inner = cell.map(function (p) {
          if (p.s != null) return esc(p.s);
          var it = p.b, long = it.ans.length > 24;
          var w = Math.max(6, Math.min(24, it.ans.length));
          return '<span class="blank">' + (long
            ? '<textarea class="cloze wide" rows="2" id="in-' + it.id + '" data-f="' + it.id + '" aria-label="' + esc(it.label || '') + '" spellcheck="false" placeholder="…"></textarea>'
            : '<input class="cloze" type="text" style="--n:' + w + '" id="in-' + it.id + '" data-f="' + it.id + '" aria-label="' + esc(it.label || '') + '" spellcheck="false" autocomplete="off" placeholder="…">') +
            '<span class="ico" aria-hidden="true"></span></span>';
        }).join('');
        return '<' + tag + '>' + inner + '</' + tag.split(' ')[0] + '>';
      }).join('') + '</tr>';
    });
    h += '</tbody></table>';
    box.innerHTML = h;
    board.appendChild(box);
  }

  function fitAll() { fitFns.forEach(function (f) { f(); }); if (cur && cur._counts) cur._counts(); notifyHeight(); }
  window.addEventListener('resize', function () {
    if (cur && cur.tipo === 'mapa' && (window.innerWidth < MOBILE_W) !== !!cur._mobile) { var y = window.scrollY; openMod(cur); window.scrollTo(0, y); return; }
    fitAll();
  });
  /* ---------- avisa o painel da altura (quando embutido) ---------- */
  var lastH = 0;
  function notifyHeight() {
    try {
      if (window.parent && window.parent !== window) {
        var h = document.documentElement.scrollHeight;
        if (Math.abs(h - lastH) > 4) { lastH = h; window.parent.postMessage({ sinusMapasAltura: h }, '*'); }
      }
    } catch (e) {}
  }
  if (window.ResizeObserver) new ResizeObserver(function () { notifyHeight(); }).observe(document.body);

  function topo() { try { if (window.parent && window.parent !== window) window.parent.postMessage({ sinusMapasTopo: 1 }, '*'); } catch (e) {} }

  /* ---------- rota (#/matéria/mapa) ---------- */
  var firstRoute = true;
  function route() {
    if (!firstRoute) setTimeout(topo, 30);
    firstRoute = false;
    var h = (location.hash || '').replace(/^#\/?/, '').split('/');
    if (h[0] && h[1]) {
      var m = findMod(h[0], h[1]);
      if (m) { openMod(m); return; }
    }
    if (h[0] && DATA[h[0]]) curSid = h[0];
    renderHome();
  }
  window.addEventListener('hashchange', route);
  route();
})();
