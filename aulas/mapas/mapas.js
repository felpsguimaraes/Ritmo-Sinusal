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
    pt: { app: 'Mapas guiados', sub: 'A estrutura já está montada. Complete os campos e ligue os assuntos; use Verificar para comparar com o gabarito.', all: 'Todos os mapas', check: 'Verificar', reveal: 'Mostrar gabarito', hide: 'Ocultar gabarito', clear: 'Limpar', clear2: 'Confirmar limpeza', empty: 'Vazio', filled: 'Preenchido', ok: 'Correto', part: 'Ajustar ao gabarito', miss: 'Revisar', blank: 'Em branco', toReview: 'Para revisar', gab: 'Gabarito', you: 'Você: ', waiting: 'O gabarito deste mapa aparece aqui depois de Verificar.', nothing: 'Nada para revisar por enquanto.', fields: 'campos', filledN: 'preenchidos', okN: 'corretos', partN: 'para ajustar', missN: 'para revisar', blankN: 'em branco', map: 'Mapa mental', flow: 'Fluxograma', table: 'Tabela', source: 'Fonte', prev: '← Anterior', next: 'Próximo →', drag: 'No celular, arraste o mapa para os lados.', ph: 'Sua resposta', phCell: 'Complete', semester: 'º semestre', subjects: 'Matérias', open: 'Abrir', of: 'de', cases: 'Casos clínicos', exam: 'Nível prova', guided: 'Guiado', memory: 'De memória', memIntro: 'Sem pistas e sem estrutura: escreva o que lembra de cada ramo. Escreva as respostas completas, uma por linha.', memPh: 'Escreva de memória…', memWait: 'Escreva de memória e use Verificar para ver quais conceitos você lembrou.', concepts: 'conceitos', recalled: 'lembrados', missed: 'Faltou', yourText: 'Seu texto', why: 'Por quê', caseW: 'Caso', typeAns: 'Escreva sua resposta', clsWord: 'Aula', slWord: 'slides', slSeq: 'ordem da aula', guide: 'Guia por slides', guideSub: 'Qual mapa fazer em cada slide da aula', hiddenName: 'Células ocultas', orderName: 'Ordenar passos', level: 'Nível', l1: 'Guiado', l1d: 'Estrutura pronta e pistas', l2: 'Desafio', l2d: 'Sem pistas: de memória, células ocultas e ordenar', l3: 'Prova', l3d: 'Casos clínicos e simulados com cronômetro', ordHint: 'Coloque os passos na ordem certa com as setas e use Verificar.', ordOk: 'passos na posição certa', ordRight: 'Ordem correta', timerStart: 'Iniciar cronômetro', timerStop: 'Parar cronômetro', hiddenCell: 'Escreva o que vai nesta célula', noDes: 'Sem versão Desafío', soon: 'Passos', score: 'Nota' },
    es: { app: 'Mapas guiados', sub: 'La estructura ya está armada. Completá los campos y conectá los temas; usá Verificar para comparar con la respuesta.', all: 'Todos los mapas', check: 'Verificar', reveal: 'Mostrar respuestas', hide: 'Ocultar respuestas', clear: 'Limpiar', clear2: 'Confirmar limpieza', empty: 'Vacío', filled: 'Completado', ok: 'Correcto', part: 'Ajustar ao gabarito', miss: 'Revisar', blank: 'En blanco', toReview: 'Para revisar', gab: 'Respuesta', you: 'Vos: ', waiting: 'Las respuestas de este mapa aparecen acá después de Verificar.', nothing: 'Nada para revisar por ahora.', fields: 'campos', filledN: 'completados', okN: 'correctos', partN: 'parciales', missN: 'para revisar', blankN: 'en blanco', map: 'Mapa mental', flow: 'Flujograma', table: 'Tabla', source: 'Fuente', prev: '← Anterior', next: 'Siguiente →', drag: 'En el celular, arrastrá el mapa hacia los costados.', ph: 'Tu respuesta', phCell: 'Completá', semester: 'º semestre', subjects: 'Materias', open: 'Abrir', of: 'de', cases: 'Casos clínicos', exam: 'Nivel examen', guided: 'Guiado', memory: 'De memoria', memIntro: 'Sin pistas y sin estructura: escribí lo que recordás de cada rama. Escribí las respuestas completas, una por línea.', memPh: 'Escribí de memoria…', memWait: 'Escribí de memoria y usá Verificar para ver qué conceptos recordaste.', concepts: 'conceptos', recalled: 'recordados', missed: 'Faltó', yourText: 'Tu texto', why: 'Por qué', caseW: 'Caso', typeAns: 'Escribí tu respuesta', clsWord: 'Clase', slWord: 'slides', slSeq: 'orden de la clase', guide: 'Guía por slides', guideSub: 'Qué mapa hacer con cada slide de la clase', hiddenName: 'Celdas ocultas', orderName: 'Ordenar pasos', level: 'Nivel', l1: 'Guiado', l1d: 'Estructura lista y pistas', l2: 'Desafio', l2d: 'Sin pistas: de memoria, celdas ocultas y ordenar', l3: 'Prueba', l3d: 'Casos clínicos y simulacros con cronómetro', ordHint: 'Poné los pasos en el orden correcto con las flechas y usá Verificar.', ordOk: 'pasos en la posición correcta', ordRight: 'Orden correcto', timerStart: 'Iniciar cronómetro', timerStop: 'Parar cronómetro', hiddenCell: 'Escribí lo que va en esta celda', noDes: 'Sin versión Desafío', soon: 'Pasos', score: 'Nota' },
    en: { app: 'Guided maps', sub: 'The structure is already built. Fill in the blanks and connect the topics; use Check to compare with the answers.', all: 'All maps', check: 'Check', reveal: 'Show answers', hide: 'Hide answers', clear: 'Clear', clear2: 'Confirm clear', empty: 'Empty', filled: 'Filled', ok: 'Correct', part: 'Partial', miss: 'Review', blank: 'Blank', toReview: 'To review', gab: 'Answer', you: 'You: ', waiting: 'The answers for this map appear here after Check.', nothing: 'Nothing to review for now.', fields: 'fields', filledN: 'filled', okN: 'correct', partN: 'partial', missN: 'to review', blankN: 'blank', map: 'Mind map', flow: 'Flowchart', table: 'Table', source: 'Source', prev: '← Previous', next: 'Next →', drag: 'On a phone, drag the map sideways.', ph: 'Your answer', phCell: 'Fill in', semester: 'th semester', subjects: 'Subjects', open: 'Open', of: 'of', cases: 'Clinical cases', exam: 'Exam level', guided: 'Guided', memory: 'From memory', memIntro: 'No hints and no structure: write what you remember for each branch. Write complete answers, one per line.', memPh: 'Write from memory…', memWait: 'Write from memory and press Check to see which concepts you recalled.', concepts: 'concepts', recalled: 'recalled', missed: 'Missed', yourText: 'Your text', why: 'Why', caseW: 'Case', typeAns: 'Type your answer', clsWord: 'Class', slWord: 'slides', slSeq: 'class order', guide: 'Slide guide', guideSub: 'Which map to build for each slide', hiddenName: 'Hidden cells', orderName: 'Order the steps', level: 'Level', l1: 'Guided', l1d: 'Structure ready, with hints', l2: 'Challenge', l2d: 'No hints: from memory, hidden cells and ordering', l3: 'Exam', l3d: 'Clinical cases and timed mock exams', ordHint: 'Put the steps in the right order with the arrows, then press Check.', ordOk: 'steps in the right position', ordRight: 'Correct order', timerStart: 'Start timer', timerStop: 'Stop timer', hiddenCell: 'Write what goes in this cell', noDes: 'No Challenge version', soon: 'Steps', score: 'Score' }
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
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.source === window.parent && e.data && e.data.sinusTema) { try { localStorage.setItem('sinus_tema', e.data.sinusTema); } catch (x) {} applyTheme(); } });

  /* ---------- estado salvo (por aluno, neste aparelho) ---------- */
  var uid = 'anon';
  try { uid = (window.parent && window.parent !== window && window.parent.SinusApp && window.parent.SinusApp.S && window.parent.SinusApp.S.uid) || 'anon'; } catch (e) {}
  var KEY = KEY_BASE + '_' + uid;
  var S = { a: {}, c: {}, v: {}, r: {}, m: {}, t: {}, mvb: {}, o: {}, ov: {}, lvl: '1' };
  try { var raw = localStorage.getItem(KEY); if (raw) { var o = JSON.parse(raw); if (o && o.a) S = { a: o.a || {}, c: o.c || {}, v: o.v || {}, r: o.r || {}, m: o.m || {}, t: o.t || {}, mvb: o.mvb || {}, o: o.o || {}, ov: o.ov || {}, lvl: o.lvl || '1' }; } } catch (e) {}
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
  var TYPE = { mapa: T.map, fluxo: T.flow, tabla: T.table, casos: T.cases };
  var TYPE_SVG = {
    mapa: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5.5" r="2"/><circle cx="19.5" cy="5.5" r="2"/><circle cx="4.5" cy="18.5" r="2"/><circle cx="19.5" cy="18.5" r="2"/><path d="M9.2 10.4 6 7M14.8 10.4 18 7M9.2 13.6 6 17M14.8 13.6 18 17"/></svg>',
    fluxo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="5" rx="1.5"/><rect x="8" y="17" width="8" height="5" rx="1.5"/><path d="M12 7v4m0 0-6 3v3m6-6 6 3v3"/></svg>',
    tabla: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></svg>',
    casos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 12h6M12 9v6"/></svg>'
  };

  var allMods = [];
  Object.keys(DATA).forEach(function (sid) {
    DATA[sid].modulos.forEach(function (m, i) { m.sid = sid; m.idx = i; Core.compile(m);
      m._items.concat(m._ditems || []).forEach(function (it) {
        var revision = (window.SINUS_MAPAS_REVISAO || {})[sid + '/' + it.id];
        if (revision) { it.ans = revision.answer; it.acceptedAnswers = revision.accepted; it.source = revision.source; it.answerSet = revision.answerSet; it.minimum = revision.minimum; }
        if (Object.prototype.hasOwnProperty.call(S.c, it.id)) S.c[it.id] = Core.evaluate(it, S.a[it.id]);
      }); });
    /* orden = orden de los slides de la clase (clase, slide inicial); los casos, al final */
    DATA[sid].modulos.sort(function (a, b) { return slideKey(a) - slideKey(b) || a.idx - b.idx; });
    DATA[sid].modulos.forEach(function (m, i) { m.idx = i; allMods.push(m); });
  });
  function findMod(sid, mid) { for (var i = 0; i < allMods.length; i++) if (allMods[i].sid === sid && allMods[i].id === mid) return allMods[i]; return null; }

  function slideKey(m) { return m.sl && m.sl.length ? m.sl[0][0] * 1000 + (m.sl[0][1] || 0) : 99000; }
  function slideText(m, short) {
    if (!m.sl || !m.sl.length) return m.clase;
    var by = {}, order = [];
    m.sl.forEach(function (e) { if (!by[e[0]]) { by[e[0]] = []; order.push(e[0]); } if (e[1]) by[e[0]].push(e[1] === e[2] ? '' + e[1] : e[1] + '–' + e[2]); });
    return order.map(function (c) { return (short ? 'C' + c : T.clsWord + ' ' + c) + (by[c].length ? ' · ' + T.slWord + ' ' + by[c].join(', ') : ' · ' + T.slSeq); }).join('  +  ');
  }
  function hasDes(mod) { return mod.tipo === 'mapa' || mod.tipo === 'tabla' || (mod.tipo === 'fluxo' && mod._linear); }
  /* modelo em uso: guiado | mem | celdas | orden | casos */
  function modelOf(mod) {
    if (mod.tipo === 'casos') return 'casos';
    if (S.m[mod.id] && hasDes(mod)) return mod.tipo === 'mapa' ? 'mem' : mod.tipo === 'tabla' ? 'celdas' : 'orden';
    return 'guiado';
  }
  function levelOf(mod) { return mod.tipo === 'casos' ? '3' : modelOf(mod) === 'guiado' ? '1' : '2'; }
  function levelList(sid, lvl) {
    return DATA[sid].modulos.filter(function (m) { return lvl === '1' ? m.tipo !== 'casos' : lvl === '2' ? hasDes(m) : m.tipo === 'casos'; });
  }
  function coverOk(mod, bi) { return memCover(mod, bi).filter(function (c) { return c.st === 'ok'; }).length; }
  function statsModel(mod, model) {
    if (model === 'mem') {
      var typed = 0, rec = 0, tot = 0;
      mod._tree.forEach(function (b, bi) { var tid = mod.id + '|' + bi; tot += b.leaves.length; if ((S.t[tid] || '').trim()) typed++; if (S.mvb[tid]) rec += coverOk(mod, bi); });
      return { filled: typed, total: mod._tree.length, ok: rec, okTotal: tot };
    }
    if (model === 'orden') {
      var n = mod._ord.length, o = S.o[mod.id], good = 0;
      if (o && S.ov[mod.id]) good = o.filter(function (v, i) { return v === i; }).length;
      return { filled: o ? n : 0, total: n, ok: good };
    }
    var items = model === 'celdas' ? mod._ditems : mod._items, f = 0, ok = 0;
    items.forEach(function (it) { if ((S.a[it.id] || '').trim()) f++; if (S.c[it.id] === 'ok') ok++; });
    return { filled: f, ok: ok, total: items.length };
  }
  function stats(mod) { return statsModel(mod, mod._model || 'guiado'); }
  function fmtStats(s, model) {
    if (model === 'mem') return s.filled + '/' + s.total + ' ' + (T.cases === 'Casos clínicos' ? 'ramos escritos' : 'ramas') + (s.ok ? ' · ' + s.ok + '/' + s.okTotal + ' ' + T.concepts : '');
    if (model === 'orden') return s.ok ? s.ok + '/' + s.total + ' ' + T.ordOk : s.filled + '/' + s.total + ' ' + T.soon;
    return s.filled + '/' + s.total + ' ' + T.filledN + (s.ok ? ' · ' + s.ok + ' ' + T.okN : '');
  }
  function statusOf(id) {
    var c = S.c[id];
    if (c && c !== 'empty') return c;
    return (S.a[id] || '').trim() ? 'filled' : 'empty';
  }

  try { if (window.parent !== window) { void window.parent.location.href; document.documentElement.classList.add('embed'); } } catch (e) {}
  var ONLY = null;
  try { ONLY = new URLSearchParams(location.search).get('s'); } catch (e) {}
  var root = document.getElementById('app');
  var cur = null;          // módulo aberto
  var curSid = null;       // matéria selecionada na lista
  var fitFns = [];

  function modelForLevel(m, lvl) { return m.tipo === 'casos' ? 'casos' : lvl === '2' && hasDes(m) ? (m.tipo === 'mapa' ? 'mem' : m.tipo === 'tabla' ? 'celdas' : 'orden') : 'guiado'; }
  function modelName(m) { return m.tipo === 'mapa' ? T.memory : m.tipo === 'tabla' ? T.hiddenName : T.orderName; }
  /* ---------- lista de mapas ---------- */
  function renderHome() {
    cur = null; fitFns = [];
    document.title = T.app + ' · Sinus';
    var sids = ONLY && DATA[ONLY] ? [ONLY] : Object.keys(DATA);
    if (!curSid || sids.indexOf(curSid) < 0) curSid = sids[0];
    root.innerHTML = '';
    var head = el('header', { class: 'head home-head' });
    head.innerHTML = '<div><p class="eyebrow">Sinus · 5' + esc(T.semester) + '</p><h1>' + esc(T.app) + '</h1><p class="sub">' + esc(T.sub) + '</p></div>';
    root.appendChild(head);
    var note = el('p', { class: 'sub' });
    note.textContent = LANG === 'es' ? 'Escribe el término completo, con ortografía y tildes correctas. Solo se ignoran mayúsculas y espacios. En el modo de memoria, escribe una respuesta por línea. Progreso guardado en este navegador.' : LANG === 'en' ? 'Use the complete answer with correct spelling and accents. Only case and whitespace are ignored. In memory mode, write one answer per line. Progress is saved in this browser.' : 'Escreva o termo completo, com grafia e acentos corretos. Só maiúsculas e espaços são desconsiderados. No modo de memória, use uma resposta por linha. Nas listas, separe as respostas por ponto e vírgula; não repita o mesmo exemplo. Progresso salvo neste navegador.';
    root.appendChild(note);

    var lvl = S.lvl || '1';
    var lv = el('div', { class: 'levels', role: 'tablist', 'aria-label': T.level });
    [['1', T.l1, T.l1d], ['2', T.l2, T.l2d], ['3', T.l3, T.l3d]].forEach(function (p) {
      var b = el('button', { type: 'button', role: 'tab', class: 'level', 'aria-selected': p[0] === lvl ? 'true' : 'false' });
      b.innerHTML = '<small>' + esc(T.level) + ' ' + p[0] + '</small><b>' + esc(p[1]) + '</b><span>' + esc(p[2]) + '</span>';
      b.addEventListener('click', function () { S.lvl = p[0]; save(); renderHome(); });
      lv.appendChild(b);
    });
    root.appendChild(lv);

    var tabs = el('div', { class: 'subjtabs', role: 'tablist', 'aria-label': T.subjects });
    sids.forEach(function (sid) {
      var b = el('button', { type: 'button', role: 'tab', 'aria-selected': sid === curSid ? 'true' : 'false', class: 'subjtab' });
      var list0 = levelList(sid, lvl), tot = 0, fil = 0;
      list0.forEach(function (m) { var s2 = statsModel(m, modelForLevel(m, lvl)); tot += s2.total; fil += s2.filled; });
      b.innerHTML = '<b>' + esc(DATA[sid].nome) + '</b><span>' + list0.length + ' ' + (lvl === '3' ? 'pruebas' : 'mapas') + ' · ' + fil + '/' + tot + '</span>';
      b.addEventListener('click', function () { curSid = sid; renderHome(); });
      tabs.appendChild(b);
    });
    if (sids.length > 1) root.appendChild(tabs);

    var subj = DATA[curSid];
    root.appendChild(el('p', { class: 'subjinfo' }, esc(subj.docente) + ' · ' + esc(subj.fonte)));

    var gd = el('details', { class: 'sguide' });
    var rowsG = '', lastC = null;
    DATA[curSid].modulos.filter(function (m) { return m.tipo !== 'casos'; }).forEach(function (m) {
      var c = m.sl && m.sl[0] ? m.sl[0][0] : null;
      if (c !== lastC) { rowsG += '<tr class="sg-h"><th colspan="3">' + esc(T.clsWord + ' ' + c) + '</th></tr>'; lastC = c; }
      var rng = m.sl.map(function (e) { return (e[0] !== c ? 'C' + e[0] + ' ' : '') + (e[1] ? (e[1] === e[2] ? e[1] : e[1] + '–' + e[2]) : T.slSeq); }).join(', ');
      rowsG += '<tr><td class="sg-r">' + esc(rng) + '</td><td><a href="#/' + m.sid + '/' + m.id + (lvl === '2' ? '/des' : lvl === '1' ? '/g' : '') + '">' + esc(m.titulo) + '</a></td><td class="sg-t">' + esc(TYPE[m.tipo]) + '</td></tr>';
    });
    gd.innerHTML = '<summary><b>' + esc(T.guide) + '</b> <span>' + esc(T.guideSub) + '</span></summary><table class="sg-table"><tbody>' + rowsG + '</tbody></table>';
    root.appendChild(gd);

    var grid = el('div', { class: 'cards' });
    levelList(curSid, lvl).forEach(function (m) {
      var model = modelForLevel(m, lvl), s2 = statsModel(m, model), pct = s2.total ? Math.round(s2.filled / s2.total * 100) : 0;
      var sub = lvl === '2' ? '/des' : lvl === '1' ? '/g' : '';
      var a = el('a', { class: 'mcard', href: '#/' + m.sid + '/' + m.id + sub });
      a.innerHTML = '<span class="mico t-' + m.tipo + '">' + TYPE_SVG[m.tipo] + '</span>' +
        '<span class="mbody"><b>' + esc(m.titulo) + (lvl === '3' ? ' <em class="badge">' + esc(T.exam) + '</em>' : '') + '</b><small>' + esc(slideText(m, true)) + ' · ' + esc(lvl === '2' ? modelName(m) : TYPE[m.tipo]) + '</small>' +
        '<span class="mbar"><i style="width:' + pct + '%"></i></span>' +
        '<small class="mnum">' + esc(fmtStats(s2, model)) + '</small></span>';
      grid.appendChild(a);
    });
    root.appendChild(grid);
    window.scrollTo(0, 0);
    notifyHeight();
  }

  /* ---------- tela de um mapa ---------- */
  function openMod(mod) {
    cur = mod; fitFns = [];
    var model = modelOf(mod);
    mod._model = model;
    mod._cur = model === 'celdas' ? mod._ditems : mod._items;
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
    head.innerHTML = '<div><p class="eyebrow">' + esc(DATA[mod.sid].nome) + ' · ' + esc(slideText(mod)) + ' · ' + esc(TYPE[mod.tipo]) + ' · ' + esc(T.level) + ' ' + levelOf(mod) + '</p><h1>' + esc(mod.titulo) + '</h1>' + (mod.resumen ? '<p class="sub">' + esc(mod.resumen) + '</p>' : '') + '</div>';
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
    var memMode = model === 'mem';
    mod._mem = memMode;
    var left = el('div', { class: 'barleft' });
    if (hasDes(mod)) {
      var seg = el('div', { class: 'seg', role: 'group', 'aria-label': T.level });
      [['g', T.l1], ['des', T.l2]].forEach(function (p) {
        var on = (p[0] === 'des') === (model !== 'guiado');
        var b = el('button', { type: 'button', 'aria-pressed': on ? 'true' : 'false' }, esc(T.level + ' ' + (p[0] === 'g' ? '1 · ' : '2 · ') + p[1]));
        b.addEventListener('click', function () {
          if (on) return;
          if (p[0] === 'des') { S.m[mod.id] = 'des'; S.lvl = '2'; } else { delete S.m[mod.id]; S.lvl = '1'; }
          save(); var y = window.scrollY; openMod(mod); window.scrollTo(0, y);
        });
        seg.appendChild(b);
      });
      left.appendChild(seg);
    }
    if (mod.cronometro) {
      var bT = el('button', { type: 'button', class: 'btn', id: 'bTimer' }, esc(T.timerStart));
      bT.addEventListener('click', function () { toggleTimer(mod); });
      act.insertBefore(bT, act.firstChild);
    }
    left.appendChild(act);
    bar.appendChild(left); bar.appendChild(legend);
    root.appendChild(bar);

    var board = el('div', { class: 'board board-' + (model === 'guiado' ? mod.tipo : model) });
    if (model === 'mem') buildMemory(mod, board);
    else if (model === 'orden') buildOrden(mod, board);
    else if (model === 'celdas') buildTable(mod, board, true);
    else if (mod.tipo === 'mapa') buildMap(mod, board);
    else if (mod.tipo === 'fluxo') buildFlow(mod, board);
    else if (mod.tipo === 'casos') buildCasos(mod, board);
    else buildTable(mod, board);
    root.appendChild(board);
    if (model === 'guiado' && mod.tipo === 'mapa' && !mod._mobile) root.appendChild(el('p', { class: 'hintline' }, esc(T.drag)));


    if (mod.fuente) root.appendChild(el('p', { class: 'src' }, esc(T.source) + ': ' + esc(mod.fuente)));

    var lvl = levelOf(mod), sub = lvl === '2' ? '/des' : lvl === '1' ? '/g' : '';
    var sib = levelList(mod.sid, lvl), i = sib.indexOf(mod);
    var nav = el('nav', { class: 'pager' });
    if (i > 0) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i - 1].id + sub }, esc(T.prev) + ' <small>' + esc(sib[i - 1].titulo) + '</small>'));
    else nav.appendChild(el('span'));
    if (i >= 0 && i < sib.length - 1) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i + 1].id + sub, class: 'nx' }, '<small>' + esc(sib[i + 1].titulo) + '</small> ' + esc(T.next)));
    root.appendChild(nav);

    if (model === 'mem') bindMem(mod); else if (model === 'orden') { /* botões ligados em buildOrden */ } else { bindFields(mod); mod._cur.forEach(function (it) { paint(it.id); }); }
    refresh(mod);
    bCheck.addEventListener('click', function () {
      if (memMode) { mod._tree.forEach(function (b, bi) { S.mvb[mod.id + '|' + bi] = true; }); save(); refresh(mod); return; }
      if (model === 'orden') { S.ov[mod.id] = true; save(); if (mod._renderOrden) mod._renderOrden(); refresh(mod); return; }
      mod._cur.forEach(function (it) { S.c[it.id] = Core.evaluate(it, S.a[it.id]); });
      S.v[mod.id] = true; save();
      if (mod.cronometro) stopTimer(mod);
      mod._cur.forEach(function (it) { paint(it.id); });
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
      if (memMode) {
        mod._tree.forEach(function (b, bi) { delete S.t[mod.id + '|' + bi]; delete S.mvb[mod.id + '|' + bi]; });
        delete S.r[mod.id]; save();
        root.querySelectorAll('[data-m]').forEach(function (f) { f.value = ''; });
        refresh(mod); return;
      }
      if (model === 'orden') { delete S.o[mod.id]; delete S.ov[mod.id]; delete S.r[mod.id]; save(); var y2 = window.scrollY; openMod(mod); window.scrollTo(0, y2); return; }
      mod._cur.forEach(function (it) { delete S.a[it.id]; delete S.c[it.id]; });
      delete S.v[mod.id]; delete S.r[mod.id]; save();
      if (mod.cronometro) resetTimer(mod);
      root.querySelectorAll('[data-f]').forEach(function (f) { if (f.type === 'radio') f.checked = false; else f.value = ''; });
      mod._cur.forEach(function (it) { paint(it.id); });
      refresh(mod);
    });
    window.scrollTo(0, 0);
    setTimeout(fitAll, 0);
    notifyHeight();
  }

  function bindFields(mod) {
    root.querySelectorAll('[data-f]').forEach(function (f) {
      var id = f.getAttribute('data-f');
      if (f.type === 'radio') {
        f.checked = S.a[id] === f.value;
        f.addEventListener('change', function () { if (f.checked) { S.a[id] = f.value; delete S.c[id]; save(); paint(id); refresh(mod); } });
        return;
      }
      f.value = S.a[id] || '';
      f.addEventListener('input', function () {
        S.a[id] = f.value; delete S.c[id]; save(); paint(id); refresh(mod);
      });
      if (f.matches('.leaf textarea') && !f.closest('.mlist')) f.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    });
  }

  /* Correção contextual: a resposta fica no campo original, sem gabarito duplicado abaixo. */
  function paint(id) {
    var f = root.querySelector('[data-f="' + id + '"]');
    if (!f) return;
    var holder = f.closest('[data-hold]') || f;
    var st = statusOf(id), checked = !!(cur && S.v[cur.id]);
    var revealed = !!(cur && S.r[cur.id]);
    var it = cur && cur._cur && cur._cur.find(function (item) { return item.id === id; });
    var show = !!it && (revealed || (checked && !!S.c[id]));
    holder.setAttribute('data-st', st);
    var ico = holder === f ? f.nextElementSibling : holder.querySelector('.ico');
    if (ico && ico.classList.contains('ico')) { ico.textContent = ICON[S.c[id]] || ''; ico.title = LABEL[S.c[id]] || ''; }
    f.setAttribute('aria-description', LABEL[S.c[id]] || '');
    var target = f.type === 'radio' ? f.closest('.opts') : f;
    if (!target) return;
    var old = target.parentNode.querySelector('[data-inline-for="' + id + '"]');
    if (old) old.remove();
    if (f.type === 'radio') {
      target.classList.toggle('inline-answer-hidden', show);
    } else {
      f.classList.toggle('inline-answer-hidden', show);
    }
    if (!show) return;
    var code = revealed && !checked ? 'ok' : (S.c[id] || 'empty');
    var given = (S.a[id] || '').trim();
    var correct = revealed || code !== 'ok';
    var answer = correct ? it.ans : (given || it.ans);
    if (it.mc && correct && it.opts) {
      var option = it.opts.find(function (o) { return Core.norm(o).charAt(0) === Core.norm(it.ans).charAt(0); });
      if (option) answer = option;
    }
    var display = el('button', { type: 'button', class: 'inline-answer', 'data-inline-for': id, 'data-st': code, title: LANG === 'es' ? 'Editar respuesta' : 'Editar resposta' });
    var label = code === 'ok' ? T.ok : code === 'part' ? T.part : code === 'miss' ? T.miss : T.blank;
    display.appendChild(el('span', { class: 'inline-answer-text' }, esc(answer)));
    display.appendChild(el('span', { class: 'inline-answer-status' }, esc(label)));
    display.addEventListener('click', function () {
      if (cur && cur._model && cur._model !== 'mem' && cur._model !== 'orden') {
        delete S.c[id]; delete S.v[cur.id]; delete S.r[cur.id]; save();
        cur._cur.forEach(function (item) { paint(item.id); });
        refresh(cur);
        var field = root.querySelector('[data-f="' + id + '"]');
        if (field) field.focus();
      }
    });
    target.insertAdjacentElement('afterend', display);
  }

  function refresh(mod) {
    if (mod._mem) return refreshMem(mod);
    if (mod._model === 'orden') return refreshOrden(mod);
    var s = stats(mod);
    var mt = document.getElementById('mtxt'), mb = document.getElementById('mbar');
    if (mt) mt.innerHTML = '<b>' + s.filled + '</b> ' + esc(T.of) + ' ' + s.total + ' ' + esc(T.fields) + ' ' + esc(T.filledN) + ' · <b>' + s.ok + '</b> ' + esc(T.okN) +
      (mod.cronometro && S.v[mod.id] && s.total ? ' · ' + esc(T.score) + ' <b>' + Math.round(s.ok / s.total * 100) + '%</b>' : '') + (mod.cronometro ? timerText(mod) : '');
    if (mb) mb.style.width = (s.total ? s.filled / s.total * 100 : 0) + '%';
    var rev = !!S.r[mod.id];
    var br = document.getElementById('bRev');
    if (br) { br.setAttribute('aria-pressed', rev ? 'true' : 'false'); br.textContent = rev ? T.hide : T.reveal; }
    mod._cur.forEach(function (it) { paint(it.id); });
    renderFeedback(mod);
    if (mod._counts) mod._counts();
    notifyHeight();
  }

  function renderFeedback(mod) {
    var box = document.getElementById('fb');
    if (box) box.replaceChildren();
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

  /* ---------- CASOS CLÍNICOS ---------- */
  function buildCasos(mod, board) {
    var box = el('div', { class: 'cases' });
    mod._tree.forEach(function (it, i) {
      var a = el('article', { class: 'case', 'data-hold': '1' });
      var h = '<header><b>' + esc(T.caseW) + ' ' + (i + 1) + '</b><span class="ico" aria-hidden="true"></span></header>' +
        (it.caso ? '<p class="vig">' + esc(it.caso) + '</p>' : '') + '<p class="ask">' + esc(it.hint) + '</p>';
      if (it.opts) {
        h += '<div class="opts" role="radiogroup" aria-label="' + esc(it.hint) + '">' + it.opts.map(function (o) {
          var letter = Core.norm(o).charAt(0);
          return '<label class="opt"><input type="radio" name="r-' + it.id + '" value="' + letter + '" data-f="' + it.id + '"><span>' + esc(o) + '</span></label>';
        }).join('') + '</div>';
      } else {
        h += '<textarea id="in-' + it.id + '" data-f="' + it.id + '" rows="3" spellcheck="false" autocomplete="off" placeholder="' + esc(T.typeAns) + '"></textarea>';
      }
      a.innerHTML = h;
      box.appendChild(a);
    });
    board.appendChild(box);
  }

  /* ---------- ORDENAR (fluxos lineares): embaralha e o aluno reordena ---------- */
  function shuffleFor(mod) {
    var n = mod._ord.length, seed = 0, i;
    for (i = 0; i < mod.id.length; i++) seed = (seed * 31 + mod.id.charCodeAt(i)) >>> 0;
    function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    var tries = 0, a;
    do {
      a = []; for (i = 0; i < n; i++) a.push(i);
      for (i = n - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
      tries++;
    } while (n > 1 && tries < 50 && a.every(function (v, k) { return v === k; }));
    return a;
  }
  function buildOrden(mod, board) {
    if (!S.o[mod.id] || S.o[mod.id].length !== mod._ord.length) { S.o[mod.id] = shuffleFor(mod); save(); }
    var box = el('div', { class: 'orden' });
    box.appendChild(el('p', { class: 'ordhint' }, esc(T.ordHint)));
    var ol = el('ol', { class: 'ordlist' });
    box.appendChild(ol);
    board.appendChild(box);
    mod._renderOrden = function () {
      var o = S.o[mod.id], ver = S.ov[mod.id];
      ol.innerHTML = '';
      o.forEach(function (idx, pos) {
        var st = ver ? (idx === pos ? 'ok' : 'miss') : '';
        var li = el('li', { class: 'ordit', 'data-st': st });
        li.innerHTML = '<span class="ordn">' + (pos + 1) + '</span><span class="ordt">' + esc(mod._ord[idx]) + '</span>' +
          '<span class="ordb"><button type="button" aria-label="Subir" data-d="-1"' + (pos === 0 ? ' disabled' : '') + '>↑</button><button type="button" aria-label="Bajar" data-d="1"' + (pos === o.length - 1 ? ' disabled' : '') + '>↓</button></span>';
        li.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () {
            var d = +b.getAttribute('data-d'), k = pos + d, arr = S.o[mod.id], t = arr[pos];
            arr[pos] = arr[k]; arr[k] = t; delete S.ov[mod.id]; save(); mod._renderOrden(); refresh(mod);
            var nb = ol.children[k] && ol.children[k].querySelector('button[data-d="' + d + '"]') || ol.children[k].querySelector('button:not([disabled])');
            if (nb) nb.focus();
          });
        });
        ol.appendChild(li);
      });
      if (ver) {
        var good = o.filter(function (v, i) { return v === i; }).length;
        var msg = el('p', { class: 'ordres' }, good === o.length ? '<b>' + esc(T.ordRight) + '</b>' : '<b>' + good + '/' + o.length + '</b> ' + esc(T.ordOk));
        ol.appendChild(msg);
      }
    };
    mod._renderOrden();
  }
  function refreshOrden(mod) {
    var s = statsModel(mod, 'orden');
    var mt = document.getElementById('mtxt'), mb = document.getElementById('mbar');
    if (mt) mt.innerHTML = '<b>' + s.ok + '</b> ' + esc(T.of) + ' ' + s.total + ' ' + esc(T.ordOk);
    if (mb) mb.style.width = (s.total ? Math.round(s.ok / s.total * 100) : 0) + '%';
  }

  /* ---------- cronômetro (simulados) ---------- */
  var TM = { id: null, t0: 0, acc: 0, run: false, mod: null };
  function timerText(mod) {
    var sec = Math.floor(((TM.mod === mod.id && TM.run ? Date.now() - TM.t0 : 0) + (TM.mod === mod.id ? TM.acc : 0)) / 1000);
    return ' · <span id="tclock">' + pad2(Math.floor(sec / 60)) + ':' + pad2(sec % 60) + '</span>';
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function tick() { var c = document.getElementById('tclock'); if (!c || !TM.run) return; var sec = Math.floor((Date.now() - TM.t0 + TM.acc) / 1000); c.textContent = pad2(Math.floor(sec / 60)) + ':' + pad2(sec % 60); }
  function toggleTimer(mod) {
    var b = document.getElementById('bTimer');
    if (TM.run) { stopTimer(mod); return; }
    if (TM.mod !== mod.id) { TM.mod = mod.id; TM.acc = 0; }
    TM.t0 = Date.now(); TM.run = true; TM.id = setInterval(tick, 500);
    if (b) b.textContent = T.timerStop;
    refresh(mod);
  }
  function stopTimer(mod) {
    if (TM.run) { TM.acc += Date.now() - TM.t0; TM.run = false; clearInterval(TM.id); }
    var b = document.getElementById('bTimer'); if (b) b.textContent = T.timerStart;
    refresh(mod);
  }
  function resetTimer(mod) { TM.run = false; clearInterval(TM.id); TM.acc = 0; TM.mod = null; var b = document.getElementById('bTimer'); if (b) b.textContent = T.timerStart; }

  /* ---------- MODO DE MEMÓRIA: um texto livre por ramo, correção por conceitos ---------- */
  function memCover(mod, bi) {
    var b = mod._tree[bi], text = (S.t[mod.id + '|' + bi] || '').trim();
    return b.leaves.map(function (it) { return { it: it, st: text ? Core.evaluate(it, text, true) : 'empty' }; });
  }
  function buildMemory(mod, board) {
    var box = el('div', { class: 'memwrap' });
    box.appendChild(el('div', { class: 'mcenter' }, '<b>' + esc(mod.centro) + '</b>' + (mod.sub ? '<span>' + esc(mod.sub) + '</span>' : '') + '<small>' + esc(T.memIntro) + '</small>'));
    var grid = el('div', { class: 'memgrid' });
    mod._tree.forEach(function (b, bi) {
      var tid = mod.id + '|' + bi;
      var c = el('article', { class: 'memcard', 'data-mb': String(bi) });
      c.innerHTML = '<header><h3>' + esc(b.t) + '</h3><small class="mcount"></small></header>' +
        '<textarea id="mt-' + bi + '" data-m="' + esc(tid) + '" rows="6" spellcheck="false" autocomplete="off" aria-label="' + esc(b.t) + '" placeholder="' + esc(T.memPh) + '"></textarea>' +
        '<ul class="memres"></ul>';
      grid.appendChild(c);
    });
    box.appendChild(grid);
    board.appendChild(box);
  }
  function bindMem(mod) {
    root.querySelectorAll('[data-m]').forEach(function (f) {
      var tid = f.getAttribute('data-m');
      f.value = S.t[tid] || '';
      f.addEventListener('input', function () {
        S.t[tid] = f.value; delete S.mvb[tid]; save();
        renderMemCard(mod, +f.closest('[data-mb]').getAttribute('data-mb'));
        refreshMemMeter(mod);
      });
    });
  }
  function renderMemCard(mod, bi) {
    var card = root.querySelector('[data-mb="' + bi + '"]'); if (!card) return;
    var tid = mod.id + '|' + bi, ver = !!S.mvb[tid], rev = !!S.r[mod.id];
    var cov = memCover(mod, bi), ok = cov.filter(function (c) { return c.st === 'ok'; }).length;
    var typed = !!(S.t[tid] || '').trim();
    card.querySelector('.mcount').textContent = (ver ? ok : '–') + '/' + cov.length;
    card.setAttribute('data-st', ver ? (ok === cov.length ? 'ok' : ok > 0 ? 'part' : 'miss') : typed ? 'filled' : 'empty');
    var res = card.querySelector('.memres'); res.innerHTML = '';
    if (!ver && !rev) return;
    cov.forEach(function (c) {
      var good = ver && c.st === 'ok';
      var li = el('li', { 'data-st': ver ? (good ? 'ok' : c.st === 'part' ? 'part' : 'miss') : 'rev' });
      var mark = el('span', { class: 'mk' }); mark.textContent = ver ? (good ? '✓' : c.st === 'part' ? '~' : '×') : '•';
      var tx = el('span', { class: 'mt' });
      var b1 = el('b'); b1.textContent = c.it.ans; tx.appendChild(b1);
      if (!good) { var sm = el('small'); sm.textContent = ' · ' + c.it.hint; tx.appendChild(sm); }
      li.appendChild(mark); li.appendChild(tx); res.appendChild(li);
    });
  }
  function refreshMemMeter(mod) {
    var tot = 0, rec = 0, anyVer = false;
    mod._tree.forEach(function (b, bi) {
      tot += b.leaves.length;
      if (S.mvb[mod.id + '|' + bi]) { anyVer = true; rec += memCover(mod, bi).filter(function (c) { return c.st === 'ok'; }).length; }
    });
    var mt = document.getElementById('mtxt'), mb = document.getElementById('mbar');
    if (mt) mt.innerHTML = anyVer ? '<b>' + rec + '</b> ' + esc(T.of) + ' ' + tot + ' ' + esc(T.concepts) + ' ' + esc(T.recalled) : esc(T.memWait);
    if (mb) mb.style.width = (anyVer && tot ? rec / tot * 100 : 0) + '%';
  }
  function refreshMem(mod) {
    mod._tree.forEach(function (b, bi) { renderMemCard(mod, bi); });
    refreshMemMeter(mod);
    var rev = !!S.r[mod.id], br = document.getElementById('bRev');
    if (br) { br.setAttribute('aria-pressed', rev ? 'true' : 'false'); br.textContent = rev ? T.hide : T.reveal; }
    var fb = document.getElementById('fb'); if (fb) fb.innerHTML = '';
    notifyHeight();
  }

  /* ---------- TABELA ---------- */
  function buildTable(mod, board, des) {
    var tree = mod._tree;
    var box = el('div', { class: 'tablewrap' });
    var h = '<table class="tbl"><thead><tr>' + tree.cols.map(function (c) { return '<th scope="col">' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
    tree.rows.forEach(function (row) {
      h += '<tr>' + row.map(function (cell, ci) {
        if (des && ci > 0 && cell._d) {
          var d = cell._d;
          return '<td data-hold="1"><textarea class="cell" id="in-' + d.id + '" data-f="' + d.id + '" rows="2" spellcheck="false" autocomplete="off" aria-label="' + esc(d.label) + '" placeholder="' + esc(T.hiddenCell) + '"></textarea><span class="ico" aria-hidden="true"></span></td>';
        }
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
      if (m) {
        if (h[2] === 'des' && hasDes(m)) { S.m[m.id] = 'des'; S.lvl = '2'; save(); }
        else if (h[2] === 'g') { delete S.m[m.id]; S.lvl = '1'; save(); }
        else if (m.tipo === 'casos') { S.lvl = '3'; save(); }
        openMod(m); return;
      }
    }
    if (h[0] && DATA[h[0]] && (!ONLY || h[0] === ONLY)) curSid = h[0];
    renderHome();
  }
  window.addEventListener('hashchange', route);
  route();
})();
