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
    pt: { app: 'Mapas guiados', sub: 'A estrutura já está montada. Complete os campos e ligue os assuntos; use Verificar para comparar com o gabarito.', all: 'Todos os mapas', check: 'Verificar', reveal: 'Mostrar gabarito', hide: 'Ocultar gabarito', clear: 'Limpar', clear2: 'Confirmar limpeza', empty: 'Vazio', filled: 'Preenchido', ok: 'Correto', part: 'Parcial', miss: 'Revisar', blank: 'Em branco', toReview: 'Para revisar', gab: 'Gabarito', you: 'Você: ', waiting: 'O gabarito deste mapa aparece aqui depois de Verificar.', nothing: 'Nada para revisar por enquanto.', fields: 'campos', filledN: 'preenchidos', okN: 'corretos', partN: 'parciais', missN: 'para revisar', blankN: 'em branco', map: 'Mapa mental', flow: 'Fluxograma', table: 'Tabela', source: 'Fonte', prev: '← Anterior', next: 'Próximo →', drag: 'No celular, arraste o mapa para os lados.', ph: 'Sua resposta', phCell: 'Complete', semester: 'º semestre', subjects: 'Matérias', open: 'Abrir', of: 'de', cases: 'Casos clínicos', exam: 'Nível prova', guided: 'Guiado', memory: 'De memória', memIntro: 'Sem pistas e sem estrutura: escreva o que lembra de cada ramo. A correção procura os conceitos-chave no seu texto.', memPh: 'Escreva de memória…', memWait: 'Escreva de memória e use Verificar para ver quais conceitos você lembrou.', concepts: 'conceitos', recalled: 'lembrados', missed: 'Faltou', yourText: 'Seu texto', why: 'Por quê', caseW: 'Caso', typeAns: 'Escreva sua resposta', sound: 'Som', soundOn: 'Som ligado: acerto, quase e erro tocam um aviso', soundOff: 'Som desligado', clsWord: 'Aula', slWord: 'slides', slSeq: 'ordem da aula', guide: 'Guia por slides', guideSub: 'Qual mapa fazer em cada slide da aula', hiddenName: 'Células ocultas', orderName: 'Ordenar passos', level: 'Nível', l1: 'Guiado', l1d: 'Estrutura pronta e pistas', l2: 'Desafío', l2d: 'Sem pistas: de memória, células ocultas e ordenar', l3: 'Prova', l3d: 'Casos clínicos e simulados com cronômetro', ordHint: 'Coloque os passos na ordem certa com as setas e use Verificar.', ordOk: 'passos na posição certa', ordRight: 'Ordem correta', timerStart: 'Iniciar cronômetro', timerStop: 'Parar cronômetro', hiddenCell: 'Escreva o que vai nesta célula', noDes: 'Sem versão Desafío', soon: 'Passos', score: 'Nota',
      areaT: 'Teoria', areaP: 'Prática', areaLbl: 'Parte da matéria', fallbackArea: 'Esta matéria ainda não tem exercícios da prática. Mostrando os de teoria.', emptyArea: 'Ainda não há exercícios neste nível.',
      pl1d: 'Fotos das lâminas com banco de palavras', pl2d: 'Sem banco de palavras e em ordem aleatória', pl3d: 'Simulado: lâminas sorteadas, com cronômetro',
      lamType: 'Lâminas', lamWord: 'Lâmina', lamsWord: 'lâminas', lamList: 'Lâminas deste exercício', of2: 'de', randOrder: 'Ordem aleatória', drawn: 'sorteadas',
      fO: 'Órgão', fP: 'Processo', fD: 'Descrição', fX: 'Dx', phO: 'Qual órgão?', phP: 'Qual processo?', phD: 'Descreva as alterações que você vê…', phX: 'Diagnóstico',
      findN: 'alterações para descrever', finds: 'achados', bank: 'Banco de palavras', checkOne: 'Verificar esta lâmina', prevLam: '← Anterior', nextLam: 'Próxima →',
      photo: 'Foto', kpdf: 'Laminário (PDF)', kprof: 'Imagem da professora', kturma: 'Foto da turma no microscópio', zoom: 'Ampliar', close: 'Fechar', openDrive: 'Abrir no Drive', imgFail: 'A foto não carregou.',
      gabTitle: 'Descrição da professora', gabLink: 'Foto da descrição projetada na aula', obsTitle: 'Observação',
      gradeTitle: 'Planilha da prática', gradeNote: 'Para treinar, cada parte vale o mesmo (órgão, processo, descrição e dx). Não é o critério oficial da professora.', gradeWait: 'A planilha aparece aqui depois de Verificar.', total: 'Total', score2: 'Pontuação', notChecked: 'não verificada',
      newDraw: 'Novo sorteio', newDraw2: 'Confirmar novo sorteio', examFmt: 'Na prova prática, para cada lâmina a professora pede: ÓRGANO, PROCESO, DESCRIPCIÓN e DX.', prevPhoto: 'Foto anterior', nextPhoto: 'Próxima foto' },
    es: { app: 'Mapas guiados', sub: 'La estructura ya está armada. Completá los campos y conectá los temas; usá Verificar para comparar con la respuesta.', all: 'Todos los mapas', check: 'Verificar', reveal: 'Mostrar respuestas', hide: 'Ocultar respuestas', clear: 'Limpiar', clear2: 'Confirmar limpieza', empty: 'Vacío', filled: 'Completado', ok: 'Correcto', part: 'Parcial', miss: 'Revisar', blank: 'En blanco', toReview: 'Para revisar', gab: 'Respuesta', you: 'Vos: ', waiting: 'Las respuestas de este mapa aparecen acá después de Verificar.', nothing: 'Nada para revisar por ahora.', fields: 'campos', filledN: 'completados', okN: 'correctos', partN: 'parciales', missN: 'para revisar', blankN: 'en blanco', map: 'Mapa mental', flow: 'Flujograma', table: 'Tabla', source: 'Fuente', prev: '← Anterior', next: 'Siguiente →', drag: 'En el celular, arrastrá el mapa hacia los costados.', ph: 'Tu respuesta', phCell: 'Completá', semester: 'º semestre', subjects: 'Materias', open: 'Abrir', of: 'de', cases: 'Casos clínicos', exam: 'Nivel examen', guided: 'Guiado', memory: 'De memoria', memIntro: 'Sin pistas y sin estructura: escribí lo que recordás de cada rama. La corrección busca los conceptos clave en tu texto.', memPh: 'Escribí de memoria…', memWait: 'Escribí de memoria y usá Verificar para ver qué conceptos recordaste.', concepts: 'conceptos', recalled: 'recordados', missed: 'Faltó', yourText: 'Tu texto', why: 'Por qué', caseW: 'Caso', typeAns: 'Escribí tu respuesta', sound: 'Sonido', soundOn: 'Sonido activado: acierto, casi y error suenan', soundOff: 'Sonido desactivado', clsWord: 'Clase', slWord: 'slides', slSeq: 'orden de la clase', guide: 'Guía por slides', guideSub: 'Qué mapa hacer con cada slide de la clase', hiddenName: 'Celdas ocultas', orderName: 'Ordenar pasos', level: 'Nivel', l1: 'Guiado', l1d: 'Estructura lista y pistas', l2: 'Desafío', l2d: 'Sin pistas: de memoria, celdas ocultas y ordenar', l3: 'Prueba', l3d: 'Casos clínicos y simulacros con cronómetro', ordHint: 'Poné los pasos en el orden correcto con las flechas y usá Verificar.', ordOk: 'pasos en la posición correcta', ordRight: 'Orden correcto', timerStart: 'Iniciar cronómetro', timerStop: 'Parar cronómetro', hiddenCell: 'Escribí lo que va en esta celda', noDes: 'Sin versión Desafío', soon: 'Pasos', score: 'Nota',
      areaT: 'Teoría', areaP: 'Práctica', areaLbl: 'Parte de la materia', fallbackArea: 'Esta materia todavía no tiene ejercicios de la práctica. Se muestran los de teoría.', emptyArea: 'Todavía no hay ejercicios en este nivel.',
      pl1d: 'Fotos de las láminas con banco de palabras', pl2d: 'Sin banco de palabras y en orden aleatorio', pl3d: 'Simulacro: láminas sorteadas, con cronómetro',
      lamType: 'Láminas', lamWord: 'Lámina', lamsWord: 'láminas', lamList: 'Láminas de este ejercicio', of2: 'de', randOrder: 'Orden aleatorio', drawn: 'sorteadas',
      fO: 'Órgano', fP: 'Proceso', fD: 'Descripción', fX: 'Dx', phO: '¿Qué órgano?', phP: '¿Qué proceso?', phD: 'Describí las alteraciones que ves…', phX: 'Diagnóstico',
      findN: 'alteraciones para describir', finds: 'hallazgos', bank: 'Banco de palabras', checkOne: 'Verificar esta lámina', prevLam: '← Anterior', nextLam: 'Siguiente →',
      photo: 'Foto', kpdf: 'Laminario (PDF)', kprof: 'Imagen de la profesora', kturma: 'Foto del curso en el microscopio', zoom: 'Ampliar', close: 'Cerrar', openDrive: 'Abrir en Drive', imgFail: 'La foto no cargó.',
      gabTitle: 'Descripción de la profesora', gabLink: 'Foto de la descripción proyectada en clase', obsTitle: 'Observación',
      gradeTitle: 'Planilla de la práctica', gradeNote: 'Para practicar, cada parte vale lo mismo (órgano, proceso, descripción y dx). No es el criterio oficial de la profesora.', gradeWait: 'La planilla aparece acá después de Verificar.', total: 'Total', score2: 'Puntaje', notChecked: 'sin verificar',
      newDraw: 'Nuevo sorteo', newDraw2: 'Confirmar nuevo sorteo', examFmt: 'En la prueba práctica, para cada lámina la profesora pide: ÓRGANO, PROCESO, DESCRIPCIÓN y DX.', prevPhoto: 'Foto anterior', nextPhoto: 'Foto siguiente' },
    en: { app: 'Guided maps', sub: 'The structure is already built. Fill in the blanks and connect the topics; use Check to compare with the answers.', all: 'All maps', check: 'Check', reveal: 'Show answers', hide: 'Hide answers', clear: 'Clear', clear2: 'Confirm clear', empty: 'Empty', filled: 'Filled', ok: 'Correct', part: 'Partial', miss: 'Review', blank: 'Blank', toReview: 'To review', gab: 'Answer', you: 'You: ', waiting: 'The answers for this map appear here after Check.', nothing: 'Nothing to review for now.', fields: 'fields', filledN: 'filled', okN: 'correct', partN: 'partial', missN: 'to review', blankN: 'blank', map: 'Mind map', flow: 'Flowchart', table: 'Table', source: 'Source', prev: '← Previous', next: 'Next →', drag: 'On a phone, drag the map sideways.', ph: 'Your answer', phCell: 'Fill in', semester: 'th semester', subjects: 'Subjects', open: 'Open', of: 'of', cases: 'Clinical cases', exam: 'Exam level', guided: 'Guided', memory: 'From memory', memIntro: 'No hints and no structure: write what you remember for each branch. Checking looks for the key concepts in your text.', memPh: 'Write from memory…', memWait: 'Write from memory and press Check to see which concepts you recalled.', concepts: 'concepts', recalled: 'recalled', missed: 'Missed', yourText: 'Your text', why: 'Why', caseW: 'Case', typeAns: 'Type your answer', sound: 'Sound', soundOn: 'Sound on: right, almost and wrong play a cue', soundOff: 'Sound off', clsWord: 'Class', slWord: 'slides', slSeq: 'class order', guide: 'Slide guide', guideSub: 'Which map to build for each slide', hiddenName: 'Hidden cells', orderName: 'Order the steps', level: 'Level', l1: 'Guided', l1d: 'Structure ready, with hints', l2: 'Challenge', l2d: 'No hints: from memory, hidden cells and ordering', l3: 'Exam', l3d: 'Clinical cases and timed mock exams', ordHint: 'Put the steps in the right order with the arrows, then press Check.', ordOk: 'steps in the right position', ordRight: 'Correct order', timerStart: 'Start timer', timerStop: 'Stop timer', hiddenCell: 'Write what goes in this cell', noDes: 'No Challenge version', soon: 'Steps', score: 'Score',
      areaT: 'Theory', areaP: 'Practice', areaLbl: 'Part of the subject', fallbackArea: 'This subject has no practice exercises yet. Showing theory.', emptyArea: 'No exercises at this level yet.',
      pl1d: 'Slide photos with a word bank', pl2d: 'No word bank, random order', pl3d: 'Mock exam: random slides, timed',
      lamType: 'Histology slides', lamWord: 'Slide', lamsWord: 'slides', lamList: 'Slides in this exercise', of2: 'of', randOrder: 'Random order', drawn: 'drawn',
      fO: 'Organ', fP: 'Process', fD: 'Description', fX: 'Dx', phO: 'Which organ?', phP: 'Which process?', phD: 'Describe the changes you see…', phX: 'Diagnosis',
      findN: 'changes to describe', finds: 'findings', bank: 'Word bank', checkOne: 'Check this slide', prevLam: '← Previous', nextLam: 'Next →',
      photo: 'Photo', kpdf: 'Slide set (PDF)', kprof: 'Image from the professor', kturma: 'Class photo at the microscope', zoom: 'Enlarge', close: 'Close', openDrive: 'Open in Drive', imgFail: 'The photo did not load.',
      gabTitle: "Professor's description", gabLink: 'Photo of the description shown in class', obsTitle: 'Note',
      gradeTitle: 'Practice score sheet', gradeNote: "For practice, each part weighs the same (organ, process, description and dx). This is not the professor's official grading.", gradeWait: 'The score sheet appears here after Check.', total: 'Total', score2: 'Score', notChecked: 'not checked',
      newDraw: 'New draw', newDraw2: 'Confirm new draw', examFmt: 'In the practical exam, for each slide the professor asks for: ORGAN, PROCESS, DESCRIPTION and DX.', prevPhoto: 'Previous photo', nextPhoto: 'Next photo' }
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
  var S = { a: {}, c: {}, v: {}, r: {}, m: {}, t: {}, mvb: {}, o: {}, ov: {}, lvl: '1', li: {}, area: null };
  try { var raw = localStorage.getItem(KEY); if (raw) { var o = JSON.parse(raw); if (o && o.a) S = { a: o.a || {}, c: o.c || {}, v: o.v || {}, r: o.r || {}, m: o.m || {}, t: o.t || {}, mvb: o.mvb || {}, o: o.o || {}, ov: o.ov || {}, lvl: o.lvl || '1', li: o.li || {}, area: o.area || null }; } } catch (e) {}
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
  var TYPE = { mapa: T.map, fluxo: T.flow, tabla: T.table, casos: T.cases, laminas: T.lamType };
  var TYPE_SVG = {
    mapa: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5.5" r="2"/><circle cx="19.5" cy="5.5" r="2"/><circle cx="4.5" cy="18.5" r="2"/><circle cx="19.5" cy="18.5" r="2"/><path d="M9.2 10.4 6 7M14.8 10.4 18 7M9.2 13.6 6 17M14.8 13.6 18 17"/></svg>',
    fluxo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="2" width="8" height="5" rx="1.5"/><rect x="8" y="17" width="8" height="5" rx="1.5"/><path d="M12 7v4m0 0-6 3v3m6-6 6 3v3"/></svg>',
    tabla: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></svg>',
    casos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 12h6M12 9v6"/></svg>',
    laminas: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="7" width="19" height="10" rx="1.6"/><circle cx="13.5" cy="12" r="2.8"/><path d="M5.5 9.5v5"/></svg>'
  };

  var allMods = [];
  Object.keys(DATA).forEach(function (sid) {
    DATA[sid].modulos.forEach(function (m, i) { m.sid = sid; m.idx = i; Core.compile(m); });
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
  /* ---------- sons: acerto, quase e erro (sintetizados, sem arquivos) ---------- */
  var SFX = (function () {
    var ctx = null, on = true;
    try { on = localStorage.getItem('sinus_mapas_som') !== '0'; } catch (e) {}
    function ac() {
      if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { ctx = new C(); } catch (e) { return null; } }
      if (ctx.state === 'suspended' && ctx.resume) ctx.resume();
      return ctx;
    }
    function tone(c, f, t0, dur, type, vol, f2) {
      var o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter();
      o.type = type; o.frequency.setValueAtTime(f, t0);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
      lp.type = 'lowpass'; lp.frequency.value = 2600;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(lp); lp.connect(g); g.connect(c.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    }
    function play(kind) {
      if (!on || !kind) return;
      var c = ac(); if (!c) return;
      var t = c.currentTime + 0.02;
      if (kind === 'ok') {            /* duas notas subindo (mi → si) com brilho leve */
        tone(c, 659.25, t, 0.24, 'sine', 0.15);
        tone(c, 987.77, t + 0.12, 0.42, 'sine', 0.13);
        tone(c, 1975.5, t + 0.12, 0.30, 'sine', 0.025);
      } else if (kind === 'part') {   /* duas notas próximas, sem resolver: "quase" */
        tone(c, 523.25, t, 0.22, 'triangle', 0.11);
        tone(c, 587.33, t + 0.16, 0.32, 'triangle', 0.10);
      } else {                        /* descendo, grave e curto, sem ser agressivo */
        tone(c, 311.13, t, 0.22, 'triangle', 0.12);
        tone(c, 233.08, t + 0.16, 0.36, 'triangle', 0.11, 220);
      }
    }
    function verdict(list) {
      var n = 0, ok = 0, part = 0;
      list.forEach(function (st) { if (st === 'empty' || !st) return; n++; if (st === 'ok') ok++; else if (st === 'part') part++; });
      if (!n) return null;
      if (ok === n && n === list.length) return 'ok';
      return ok + part > 0 ? 'part' : 'miss';
    }
    return {
      play: play, verdict: verdict,
      isOn: function () { return on; },
      set: function (v) { on = !!v; try { localStorage.setItem('sinus_mapas_som', on ? '1' : '0'); } catch (e) {} if (on) play('ok'); }
    };
  })();
  var SPEAKER = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path class="w1" d="M15.5 8.5a5 5 0 0 1 0 7"/><path class="w2" d="M18.5 5.5a9 9 0 0 1 0 13"/><path class="x" d="M16 9l5 6M21 9l-5 6"/></svg>';
  function hasDes(mod) { return mod.tipo === 'mapa' || mod.tipo === 'tabla' || (mod.tipo === 'fluxo' && mod._linear); }
  /* área da matéria: teoria (padrão) ou prática (láminas, exame físico...) */
  function areaOf(m) { return m.area === 'pratica' ? 'pratica' : 'teoria'; }
  function areasOf(sid) { var a = {}; (DATA[sid] ? DATA[sid].modulos : []).forEach(function (m) { a[areaOf(m)] = 1; }); return ['teoria', 'pratica'].filter(function (x) { return a[x]; }); }
  /* modelo em uso: guiado | mem | celdas | orden | casos | laminas */
  function modelOf(mod) {
    if (mod.tipo === 'laminas') return 'laminas';
    if (mod.tipo === 'casos') return 'casos';
    if (S.m[mod.id] && hasDes(mod)) return mod.tipo === 'mapa' ? 'mem' : mod.tipo === 'tabla' ? 'celdas' : 'orden';
    return 'guiado';
  }
  function levelOf(mod) { if (mod.nivel) return mod.nivel; return mod.tipo === 'casos' ? '3' : modelOf(mod) === 'guiado' ? '1' : '2'; }
  function levelList(sid, lvl) {
    return DATA[sid].modulos.filter(function (m) {
      if (areaOf(m) !== curArea) return false;
      if (m.nivel) return m.nivel === lvl;
      return lvl === '1' ? m.tipo !== 'casos' : lvl === '2' ? hasDes(m) : m.tipo === 'casos';
    });
  }
  function coverOk(mod, bi) { return memCover(mod, bi).filter(function (c) { return c.st === 'ok'; }).length; }
  function statsModel(mod, model) {
    if (model === 'laminas') return lamStats(mod);
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
    if (model === 'laminas') return s.n + ' ' + T.lamsWord + ' · ' + s.filled + '/' + s.total + ' ' + T.filledN + (s.ok ? ' · ' + s.ok + ' ' + T.okN : '');
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
  var ONLY = null, MODO = null;
  try { var QS = new URLSearchParams(location.search); ONLY = QS.get('s'); MODO = QS.get('modo'); } catch (e) {}
  /* ?modo=pratica vem do painel quando a matéria está em Prática */
  var curArea = MODO === 'pratica' ? 'pratica' : MODO === 'teoria' ? 'teoria' : (S.area === 'pratica' ? 'pratica' : 'teoria');
  var root = document.getElementById('app');
  var cur = null;          // módulo aberto
  var curSid = null;       // matéria selecionada na lista
  var fitFns = [];

  function modelForLevel(m, lvl) { if (m.tipo === 'laminas') return 'laminas'; return m.tipo === 'casos' ? 'casos' : lvl === '2' && hasDes(m) ? (m.tipo === 'mapa' ? 'mem' : m.tipo === 'tabla' ? 'celdas' : 'orden') : 'guiado'; }
  function modelName(m) { return m.tipo === 'mapa' ? T.memory : m.tipo === 'tabla' ? T.hiddenName : T.orderName; }
  /* ---------- lista de mapas ---------- */
  function renderHome() {
    cur = null; fitFns = [];
    closeLightbox();
    document.title = T.app + ' · Sinus';
    var sids = ONLY && DATA[ONLY] ? [ONLY] : Object.keys(DATA);
    if (!curSid || sids.indexOf(curSid) < 0) curSid = sids[0];
    root.innerHTML = '';
    var head = el('header', { class: 'head home-head' });
    head.innerHTML = '<div><p class="eyebrow">Sinus · 5' + esc(T.semester) + '</p><h1>' + esc(T.app) + '</h1><p class="sub">' + esc(T.sub) + '</p></div>';
    root.appendChild(head);

    /* teoria ou prática: dentro da matéria, no painel, quem escolhe é a chave Teoria/Prática (parâmetro modo) */
    var areas = areasOf(curSid), note = '';
    if (areas.length && areas.indexOf(curArea) < 0) { if (curArea === 'pratica') note = T.fallbackArea; curArea = areas[0]; }
    if (areas.length > 1 && !MODO) {
      var as = el('div', { class: 'seg areaseg', role: 'group', 'aria-label': T.areaLbl });
      [['teoria', T.areaT], ['pratica', T.areaP]].forEach(function (p) {
        var b = el('button', { type: 'button', 'aria-pressed': p[0] === curArea ? 'true' : 'false' }, esc(p[1]));
        b.addEventListener('click', function () { if (curArea === p[0]) return; curArea = p[0]; S.area = p[0]; save(); renderHome(); });
        as.appendChild(b);
      });
      root.appendChild(as);
    }
    if (note) root.appendChild(el('p', { class: 'areanote' }, esc(note)));

    var lamArea = curArea === 'pratica' && DATA[curSid].modulos.some(function (m) { return areaOf(m) === 'pratica' && m.tipo === 'laminas'; });
    var lvl = S.lvl || '1';
    var lv = el('div', { class: 'levels', role: 'tablist', 'aria-label': T.level });
    [['1', T.l1, lamArea ? T.pl1d : T.l1d], ['2', T.l2, lamArea ? T.pl2d : T.l2d], ['3', T.l3, lamArea ? T.pl3d : T.l3d]].forEach(function (p) {
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

    var subj = DATA[curSid], prat = curArea === 'pratica';
    root.appendChild(el('p', { class: 'subjinfo' }, esc(prat && subj.docentePratica ? subj.docentePratica : subj.docente) + ' · ' + esc(prat && subj.fontePratica ? subj.fontePratica : subj.fonte)));
    if (lamArea) root.appendChild(el('p', { class: 'lamfmt' }, esc(T.examFmt)));

    var guideMods = DATA[curSid].modulos.filter(function (m) { return m.tipo !== 'casos' && areaOf(m) === curArea && m.sl && m.sl.length; });
    if (guideMods.length) {
      var gd = el('details', { class: 'sguide' });
      var rowsG = '', lastC = null;
      guideMods.forEach(function (m) {
        var c = m.sl[0][0];
        if (c !== lastC) { rowsG += '<tr class="sg-h"><th colspan="3">' + esc(T.clsWord + ' ' + c) + '</th></tr>'; lastC = c; }
        var rng = m.sl.map(function (e) { return (e[0] !== c ? 'C' + e[0] + ' ' : '') + (e[1] ? (e[1] === e[2] ? e[1] : e[1] + '–' + e[2]) : T.slSeq); }).join(', ');
        rowsG += '<tr><td class="sg-r">' + esc(rng) + '</td><td><a href="#/' + m.sid + '/' + m.id + (lvl === '2' ? '/des' : lvl === '1' ? '/g' : '') + '">' + esc(m.titulo) + '</a></td><td class="sg-t">' + esc(TYPE[m.tipo]) + '</td></tr>';
      });
      gd.innerHTML = '<summary><b>' + esc(T.guide) + '</b> <span>' + esc(T.guideSub) + '</span></summary><table class="sg-table"><tbody>' + rowsG + '</tbody></table>';
      root.appendChild(gd);
    }

    var grid = el('div', { class: 'cards' });
    var list = levelList(curSid, lvl);
    if (!list.length) grid.appendChild(el('p', { class: 'areanote' }, esc(T.emptyArea)));
    list.forEach(function (m) {
      var model = modelForLevel(m, lvl), s2 = statsModel(m, model), pct = s2.total ? Math.round(s2.filled / s2.total * 100) : 0;
      var lam = m.tipo === 'laminas';
      var sub = lam ? '' : lvl === '2' ? '/des' : lvl === '1' ? '/g' : '';
      var kind = lam ? (m.sorteo ? Math.min(m.sorteo, m._tree.length) + ' ' + T.lamsWord + ' ' + T.drawn : m.banco ? T.bank : T.randOrder) : (lvl === '2' ? modelName(m) : TYPE[m.tipo]);
      var a = el('a', { class: 'mcard', href: '#/' + m.sid + '/' + m.id + sub });
      a.innerHTML = '<span class="mico t-' + m.tipo + '">' + TYPE_SVG[m.tipo] + '</span>' +
        '<span class="mbody"><b>' + esc(m.titulo) + (lvl === '3' ? ' <em class="badge">' + esc(T.exam) + '</em>' : '') + '</b><small>' + esc(slideText(m, true)) + ' · ' + esc(kind) + '</small>' +
        '<span class="mbar"><i style="width:' + pct + '%"></i></span>' +
        '<small class="mnum">' + esc(fmtStats(s2, model)) + '</small></span>';
      grid.appendChild(a);
    });
    root.appendChild(grid);
    window.scrollTo(0, 0);
    notifyHeight();
  }

  /* botão que pede confirmação no segundo clique (Limpar, Novo sorteio) */
  function armed(btn, l1, l2, fn) {
    var tm = null;
    btn.addEventListener('click', function () {
      if (!btn.classList.contains('armed')) {
        btn.classList.add('armed'); btn.textContent = l2;
        tm = setTimeout(function () { btn.classList.remove('armed'); btn.textContent = l1; }, 4000);
        return;
      }
      clearTimeout(tm); btn.classList.remove('armed'); btn.textContent = l1;
      fn();
    });
  }

  /* ---------- tela de um mapa ---------- */
  function openMod(mod) {
    cur = mod; fitFns = [];
    closeLightbox();
    curArea = areaOf(mod);
    var lam = mod.tipo === 'laminas';
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
    if (lam && mod.sorteo) {
      var bDraw = el('button', { type: 'button', class: 'btn ghost', id: 'bDraw' }, esc(T.newDraw));
      armed(bDraw, T.newDraw, T.newDraw2, function () { clearLam(mod, true); });
      act.appendChild(bDraw);
    }
    var bSom = el('button', { type: 'button', class: 'btn ghost sfx', id: 'bSom', 'aria-pressed': SFX.isOn() ? 'true' : 'false', title: SFX.isOn() ? T.soundOn : T.soundOff }, SPEAKER + '<span>' + esc(T.sound) + '</span>');
    bSom.addEventListener('click', function () { SFX.set(!SFX.isOn()); bSom.setAttribute('aria-pressed', SFX.isOn() ? 'true' : 'false'); bSom.title = SFX.isOn() ? T.soundOn : T.soundOff; });
    act.appendChild(bSom);
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
    } else if (lam && mod.par && findMod(mod.sid, mod.par)) {
      /* láminas: o nível 1 (com banco de palavras) e o nível 2 (sem banco, embaralhado) são exercícios irmãos */
      var seg2 = el('div', { class: 'seg', role: 'group', 'aria-label': T.level });
      [mod, findMod(mod.sid, mod.par)].sort(function (a, b) { return (+a.nivel) - (+b.nivel); }).forEach(function (m2) {
        var on2 = m2 === mod;
        var b2 = el('button', { type: 'button', 'aria-pressed': on2 ? 'true' : 'false' }, esc(T.level + ' ' + m2.nivel + ' · ' + (m2.nivel === '1' ? T.l1 : T.l2)));
        b2.addEventListener('click', function () { if (on2) return; S.lvl = m2.nivel; save(); location.hash = '#/' + m2.sid + '/' + m2.id; });
        seg2.appendChild(b2);
      });
      left.appendChild(seg2);
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
    if (lam) buildLaminas(mod, board);
    else if (model === 'mem') buildMemory(mod, board);
    else if (model === 'orden') buildOrden(mod, board);
    else if (model === 'celdas') buildTable(mod, board, true);
    else if (mod.tipo === 'mapa') buildMap(mod, board);
    else if (mod.tipo === 'fluxo') buildFlow(mod, board);
    else if (mod.tipo === 'casos') buildCasos(mod, board);
    else buildTable(mod, board);
    root.appendChild(board);
    if (model === 'guiado' && mod.tipo === 'mapa' && !mod._mobile) root.appendChild(el('p', { class: 'hintline' }, esc(T.drag)));

    var fb = el('section', { class: 'fb', id: 'fb', 'aria-live': 'polite' });
    root.appendChild(fb);

    if (mod.fuente) root.appendChild(el('p', { class: 'src' }, esc(T.source) + ': ' + esc(mod.fuente)));

    var lvl = levelOf(mod), sub = lam ? '' : lvl === '2' ? '/des' : lvl === '1' ? '/g' : '';
    var sib = levelList(mod.sid, lvl), i = sib.indexOf(mod);
    var nav = el('nav', { class: 'pager' });
    if (i > 0) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i - 1].id + sub }, esc(T.prev) + ' <small>' + esc(sib[i - 1].titulo) + '</small>'));
    else nav.appendChild(el('span'));
    if (i >= 0 && i < sib.length - 1) nav.appendChild(el('a', { href: '#/' + mod.sid + '/' + sib[i + 1].id + sub, class: 'nx' }, '<small>' + esc(sib[i + 1].titulo) + '</small> ' + esc(T.next)));
    root.appendChild(nav);

    if (lam) { /* os campos de cada lâmina são ligados em renderLam */ }
    else if (model === 'mem') bindMem(mod); else if (model === 'orden') { /* botões ligados em buildOrden */ } else { bindFields(mod); mod._cur.forEach(function (it) { paint(it.id); }); }
    refresh(mod);
    bCheck.addEventListener('click', function () {
      if (lam) { checkAllLam(mod); return; }
      if (memMode) {
        var mst = [];
        mod._tree.forEach(function (b, bi) { S.mvb[mod.id + '|' + bi] = true; memCover(mod, bi).forEach(function (c) { mst.push(c.st); }); });
        save(); refresh(mod);
        SFX.play(mst.every(function (x) { return x === 'empty'; }) ? null : SFX.verdict(mst.map(function (x) { return x === 'empty' ? 'miss' : x; })));
        return;
      }
      if (model === 'orden') {
        S.ov[mod.id] = true; save(); if (mod._renderOrden) mod._renderOrden(); refresh(mod);
        var oo = S.o[mod.id] || [];
        SFX.play(SFX.verdict(oo.map(function (v, i) { return v === i ? 'ok' : 'miss'; })));
        return;
      }
      mod._cur.forEach(function (it) { S.c[it.id] = Core.evaluate(it, S.a[it.id]); });
      S.v[mod.id] = true; save();
      if (mod.cronometro) stopTimer(mod);
      mod._cur.forEach(function (it) { paint(it.id); });
      refresh(mod);
      SFX.play(SFX.verdict(mod._cur.map(function (it) { return S.c[it.id]; })));
    });
    bRev.addEventListener('click', function () { S.r[mod.id] = !S.r[mod.id]; save(); if (lam) renderLam(mod); refresh(mod); });
    armed(bClr, T.clear, T.clear2, function () {
      if (lam) { clearLam(mod, false); return; }
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
    if (mod.tipo === 'laminas') return refreshLam(mod);
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
    renderFeedback(mod);
    if (mod._counts) mod._counts();
    notifyHeight();
  }

  function renderFeedback(mod) {
    var box = document.getElementById('fb'); if (!box) return;
    box.innerHTML = '';
    var rev = !!S.r[mod.id], ver = !!S.v[mod.id];
    var anyChecked = mod._cur.some(function (it) { return S.c[it.id]; });
    var list = mod._cur.filter(function (it) {
      var st = S.c[it.id];
      return rev || st === 'part' || st === 'miss';
    });
    box.appendChild(el('h2', null, esc(rev ? T.gab : T.toReview)));
    if (anyChecked || ver) {
      var c = { ok: 0, part: 0, miss: 0, empty: 0 };
      mod._cur.forEach(function (it) { var st = S.c[it.id]; if (st) c[st === 'empty' ? 'empty' : st]++; else if (ver) c.empty++; });
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
      if (it.exp) { var ex = el('p', { class: 'exp' }); ex.appendChild(el('b', null, esc(T.why) + ': ')); ex.appendChild(txt(it.exp)); a.appendChild(ex); }
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

  /* ---------- LÁMINAS (prática): foto da lâmina + folha de resposta ÓRGANO · PROCESO · DESCRIPCIÓN · DX ---------- */
  var DRIVE_T = 'https://drive.google.com/thumbnail?id=';
  var KIND = { pdf: T.kpdf, prof: T.kprof, turma: T.kturma };
  var ZOOM_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6"/></svg>';
  function imgURL(im, size) { return im.src ? im.src : DRIVE_T + encodeURIComponent(im.drive) + '&sz=' + size; }
  function driveView(id) { return 'https://drive.google.com/file/d/' + encodeURIComponent(id) + '/view'; }
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function shuffled(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* simulacro: sorteia sem repetir a mesma lâmina que aparece em duas listas (campo g) */
  function drawLam(mod) {
    var seen = {}, out = [];
    shuffled(range(mod._tree.length)).forEach(function (i) { var g = mod._tree[i].g; if (out.length < mod.sorteo && !seen[g]) { seen[g] = 1; out.push(i); } });
    return out;
  }
  function lamWant(mod) { return mod.sorteo ? Math.min(mod.sorteo, mod._tree.length) : mod._tree.length; }
  /* ordem das lâminas (guardada): na ordem da lista, embaralhada (Desafío) ou sorteada (simulacro) */
  function lamOrder(mod, noCreate) {
    var n = mod._tree.length, o = S.o[mod.id];
    if (o && o.length === lamWant(mod) && o.every(function (v) { return typeof v === 'number' && v >= 0 && v < n; })) return o;
    if (noCreate) return mod.sorteo ? [] : range(n);
    o = mod.sorteo ? drawLam(mod) : mod.barajar ? shuffled(range(n)) : range(n);
    S.o[mod.id] = o; save();
    return o;
  }
  function lamText(t) { return S.a[t.txt] || ''; }
  function lamVerified(t) { return S.c[t.o.id] != null; }
  function lamTouched(t) { return [t.o, t.p, t.x].some(function (it) { return (S.a[it.id] || '').trim(); }) || !!lamText(t).trim(); }
  function lamCheck(t) {
    [t.o, t.p, t.x].forEach(function (it) { S.c[it.id] = Core.evaluate(it, S.a[it.id]); });
    var tx = lamText(t).trim();
    t.d.forEach(function (it) { S.c[it.id] = tx ? Core.evaluate(it, tx, true) : 'empty'; });
  }
  function lamUncheck(t) { [t.o, t.p, t.x].concat(t.d).forEach(function (it) { delete S.c[it.id]; }); }
  function pts(st) { return st === 'ok' ? 1 : st === 'part' ? 0.5 : 0; }
  function lamFound(t) { return t.d.filter(function (it) { return S.c[it.id] === 'ok'; }).length; }
  function lamDescScore(t) { if (!t.d.length) return 0; var s = 0; t.d.forEach(function (it) { s += pts(S.c[it.id]); }); return s / t.d.length; }
  function lamScore(t) { return (pts(S.c[t.o.id]) + pts(S.c[t.p.id]) + pts(S.c[t.x.id]) + lamDescScore(t)) / 4; }
  function lamVerdict(t) { var sc = lamScore(t); return sc >= 0.999 ? 'ok' : sc > 0 ? 'part' : 'miss'; }
  function lamState(t) { return lamVerified(t) ? (lamTouched(t) ? lamVerdict(t) : 'miss') : lamTouched(t) ? 'filled' : 'empty'; }
  function descState(t) {
    var typed = !!lamText(t).trim();
    if (!lamVerified(t)) return typed ? 'filled' : 'empty';
    if (!typed) return 'empty';
    var f = lamFound(t);
    return f === t.d.length ? 'ok' : lamDescScore(t) > 0 ? 'part' : 'miss';
  }
  function lamStats(mod) {
    var o = lamOrder(mod, true), n = o.length || lamWant(mod), filled = 0, ok = 0, ver = 0, sc = 0;
    o.forEach(function (i) {
      var t = mod._tree[i];
      [t.o, t.p, t.x].forEach(function (it) { if ((S.a[it.id] || '').trim()) filled++; if (S.c[it.id] === 'ok') ok++; });
      if (lamText(t).trim()) filled++;
      if (lamVerified(t)) { ver++; sc += lamScore(t); if (t.d.length && lamFound(t) === t.d.length) ok++; }
    });
    return { filled: filled, total: n * 4, ok: ok, ver: ver, n: n, score: ver ? sc / ver : 0 };
  }
  /* banco de palavras do nível Guiado: respostas desta lista (órgão, dx) e os processos das descrições */
  function lamBank(mod, k) {
    mod._bank = mod._bank || {};
    if (!mod._bank[k]) {
      var seen = {}, out = [];
      mod._tree.forEach(function (t) { var a = t[k].ans, n = Core.norm(a); if (!seen[n]) { seen[n] = 1; out.push(a); } });
      mod._bank[k] = out.sort(function (a, b) { return a.localeCompare(b, 'es'); });
    }
    return mod._bank[k];
  }

  function buildLaminas(mod, board) {
    var order = lamOrder(mod);
    if (!(S.li[mod.id] >= 0) || S.li[mod.id] >= order.length) S.li[mod.id] = 0;
    var wrap = el('div', { class: 'lamwrap' });
    var strip = el('nav', { class: 'lamstrip', 'aria-label': T.lamList });
    var view = el('div', { class: 'lamview' });
    wrap.appendChild(strip); wrap.appendChild(view);
    board.appendChild(wrap);
    mod._lamOrder = order;
    mod._lamView = view;
    mod._lamStrip = function () {
      strip.innerHTML = '';
      order.forEach(function (ti, pos) {
        var t = mod._tree[ti], st = lamState(t);
        var b = el('button', { type: 'button', class: 'lamdot', 'data-st': st, 'aria-label': T.lamWord + ' ' + (pos + 1) + ' · ' + (LABEL[st] || (st === 'filled' ? T.filled : T.empty)) });
        if (pos === S.li[mod.id]) b.setAttribute('aria-current', 'step');
        b.textContent = String(pos + 1);
        b.addEventListener('click', function () { lamGo(mod, pos); });
        strip.appendChild(b);
      });
    };
    renderLam(mod);
  }

  function lamGo(mod, pos) {
    if (!mod._lamOrder || pos < 0 || pos >= mod._lamOrder.length || pos === S.li[mod.id]) return;
    S.li[mod.id] = pos; save();
    renderLam(mod); refresh(mod);
    ensureVisible(mod._lamView);
  }
  /* leva o bloco para a vista; dentro do painel quem rola é a página de fora */
  function ensureVisible(node) {
    if (!node) return;
    try {
      var r = node.getBoundingClientRect(), fe = window.frameElement;
      if (fe && window.parent && window.parent !== window) {
        var top = fe.getBoundingClientRect().top + r.top;
        if (top < 0 || top > window.parent.innerHeight * 0.55) window.parent.scrollBy({ top: top - 76, behavior: 'smooth' });
      } else if (r.top < 0 || r.top > window.innerHeight * 0.55) window.scrollBy({ top: r.top - 12, behavior: 'smooth' });
    } catch (e) {}
  }

  function renderLam(mod, focusId, caret) {
    var order = mod._lamOrder, view = mod._lamView;
    if (!order || !view) return;
    view.innerHTML = '';
    if (!order.length) { view.appendChild(el('p', { class: 'areanote' }, esc(T.emptyArea))); return; }
    var pos = S.li[mod.id] || 0;
    if (pos >= order.length) { pos = 0; S.li[mod.id] = 0; }
    var t = mod._tree[order[pos]], L = t.L, rev = !!S.r[mod.id], ver = lamVerified(t), sim = !!mod.sorteo;
    var imgs = L.img || [];
    mod._imgPos = mod._imgPos || {};
    var k = Math.min(mod._imgPos[t.key] || 0, Math.max(0, imgs.length - 1));
    var grid = el('div', { class: 'lamgrid' });

    /* foto da lâmina, com as outras fotos da mesma lâmina embaixo */
    var fig = el('figure', { class: 'lamfig' });
    var stage = el('div', { class: 'lamstage' });
    var thumbs = el('div', { class: 'lamthumbs', role: 'group', 'aria-label': T.photo });
    var cap = el('figcaption');
    fig.appendChild(stage);
    if (imgs.length > 1) fig.appendChild(thumbs);
    fig.appendChild(cap);
    function showImg(i) {
      k = i; mod._imgPos[t.key] = i;
      var im = imgs[i];
      stage.innerHTML = ''; stage.classList.remove('fail');
      if (!im) { stage.appendChild(el('p', { class: 'lamnoimg' }, esc(T.imgFail))); cap.textContent = ''; return; }
      var img = el('img', { class: 'lammain', src: imgURL(im, 'w1600'), alt: T.lamWord + ' ' + (pos + 1) + ' · ' + T.photo + ' ' + (i + 1), referrerpolicy: 'no-referrer', decoding: 'async' });
      img.addEventListener('error', function () {
        stage.classList.add('fail');
        stage.appendChild(el('p', { class: 'lamnoimg' }, esc(T.imgFail) + (im.drive ? ' <a href="' + esc(driveView(im.drive)) + '" target="_blank" rel="noopener">' + esc(T.openDrive) + '</a>' : '')));
      });
      function zoom() { openLightbox(imgs, k, function (j) { if (j !== k) showImg(j); }); }
      img.addEventListener('click', zoom);
      stage.appendChild(img);
      var zb = el('button', { type: 'button', class: 'lamzoom' }, ZOOM_SVG + '<span>' + esc(T.zoom) + '</span>');
      zb.addEventListener('click', zoom);
      stage.appendChild(zb);
      cap.textContent = T.photo + ' ' + (i + 1) + ' ' + T.of + ' ' + imgs.length + (KIND[im.k] ? ' · ' + KIND[im.k] : '');
      [].forEach.call(thumbs.children, function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    }
    if (imgs.length > 1) imgs.forEach(function (im, i) {
      var b = el('button', { type: 'button', class: 'lamthumb', 'aria-label': T.photo + ' ' + (i + 1) + (KIND[im.k] ? ' · ' + KIND[im.k] : ''), 'aria-pressed': 'false' });
      var ti = el('img', { src: imgURL(im, 'w240'), alt: '', loading: 'lazy', referrerpolicy: 'no-referrer', decoding: 'async' });
      ti.addEventListener('error', function () { b.classList.add('fail'); });
      b.appendChild(ti);
      b.addEventListener('click', function () { showImg(i); });
      thumbs.appendChild(b);
    });
    grid.appendChild(fig);

    /* folha de resposta, na ordem da prova */
    var sheet = el('section', { class: 'lamsheet', 'aria-label': T.lamWord + ' ' + (pos + 1) + ' ' + T.of2 + ' ' + order.length });
    sheet.innerHTML = '<header class="lamhead"><div><small>' + esc(T.lamWord) + '</small><b>' + (pos + 1) + '</b><span>' + esc(T.of2) + ' ' + order.length + '</span></div>' +
      (ver ? '<em class="lamsc" data-st="' + lamState(t) + '">' + Math.round(lamScore(t) * 100) + '%</em>' : '') + '</header>' +
      ((rev || ver) ? '<p class="lamname">' + esc(L.nome || t.x.ans) + '</p>' : '');
    var useBank = !!mod.banco && !sim;
    function field(it, lbl, ph, bank, multi) {
      var w = el('div', { class: 'lamf', 'data-hold': '1' });
      w.innerHTML = '<label for="in-' + it.id + '">' + esc(lbl) + '</label><div class="lamin"><input id="in-' + it.id + '" data-f="' + it.id + '" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="' + esc(ph) + '"><span class="ico" aria-hidden="true"></span></div>';
      if (bank && bank.length) {
        var bk = el('div', { class: 'chips', role: 'group', 'aria-label': T.bank + ': ' + lbl });
        bank.forEach(function (c) {
          var b = el('button', { type: 'button', class: 'chip', 'aria-pressed': 'false' });
          b.textContent = c;
          b.addEventListener('click', function () {
            var inp = w.querySelector('input'), curv = inp.value.trim(), nc = Core.norm(c).trim();
            if (multi) {
              var parts = curv ? curv.split(/\s*\+\s*/).filter(Boolean) : [], ix = -1;
              parts.forEach(function (p, j) { if (Core.norm(p).trim() === nc) ix = j; });
              if (ix > -1) parts.splice(ix, 1); else parts.push(c);
              inp.value = parts.join(' + ');
            } else inp.value = Core.norm(curv).trim() === nc ? '' : c;
            inp.dispatchEvent(new Event('input', { bubbles: true }));
          });
          bk.appendChild(b);
        });
        w.appendChild(bk);
      }
      if (rev || (ver && S.c[it.id] !== 'ok')) {
        var pa = el('p', { class: 'lamans' });
        pa.appendChild(el('b', null, esc(T.gab) + ': ')); pa.appendChild(txt(it.ans));
        w.appendChild(pa);
      }
      return w;
    }
    sheet.appendChild(field(t.o, T.fO, T.phO, useBank ? lamBank(mod, 'o') : null, false));
    sheet.appendChild(field(t.p, T.fP, T.phP, useBank ? (mod.procesos || []) : null, true));

    var dw = el('div', { class: 'lamf lamdesc' });
    var nf = t.d.length;
    dw.innerHTML = '<label for="lt-' + t.key + '">' + esc(T.fD) + (useBank ? ' <small>' + nf + ' ' + esc(T.findN) + '</small>' : '') +
      (ver ? ' <small class="lamcount">' + lamFound(t) + '/' + nf + ' ' + esc(T.finds) + '</small>' : '') + '</label>' +
      '<textarea id="lt-' + t.key + '" data-lt="' + t.txt + '" rows="5" spellcheck="false" autocomplete="off" placeholder="' + esc(T.phD) + '"></textarea>';
    if (ver || rev) {
      var res = el('ul', { class: 'memres lamres' });
      t.d.forEach(function (it) {
        var st = ver ? (S.c[it.id] === 'ok' ? 'ok' : S.c[it.id] === 'part' ? 'part' : 'miss') : 'rev';
        var li = el('li', { 'data-st': st });
        li.appendChild(el('span', { class: 'mk' }, ver ? (st === 'ok' ? '✓' : st === 'part' ? '~' : '×') : '•'));
        var sp = el('span', { class: 'mt' }); sp.textContent = it.ans; li.appendChild(sp);
        res.appendChild(li);
      });
      dw.appendChild(res);
    }
    dw.setAttribute('data-st', descState(t));
    sheet.appendChild(dw);
    sheet.appendChild(field(t.x, T.fX, T.phX, useBank ? lamBank(mod, 'x') : null, false));

    if ((rev || ver) && L.obs) {
      var ob = el('p', { class: 'lamobs' }); ob.appendChild(el('b', null, esc(T.obsTitle) + ': ')); ob.appendChild(txt(L.obs));
      sheet.appendChild(ob);
    }
    if ((rev || ver) && L.gab && L.gab.length) {
      var gb = el('div', { class: 'lamgab' });
      gb.appendChild(el('h4', null, esc(T.gabTitle)));
      var row = el('div', { class: 'lamgabrow' });
      var gimgs = L.gab.filter(function (g) { return g.ver; }).map(function (g) { return { drive: g.drive, k: 'prof' }; });
      L.gab.forEach(function (g) {
        if (g.ver) {
          var j = gimgs.map(function (x) { return x.drive; }).indexOf(g.drive);
          var gbtn = el('button', { type: 'button', class: 'lamgabimg', 'aria-label': T.gabTitle + ' · ' + T.zoom });
          var gi = el('img', { src: imgURL(g, 'w600'), alt: '', loading: 'lazy', referrerpolicy: 'no-referrer' });
          gi.addEventListener('error', function () { gbtn.hidden = true; });
          gbtn.appendChild(gi);
          gbtn.addEventListener('click', function () { openLightbox(gimgs, j); });
          row.appendChild(gbtn);
        } else {
          row.appendChild(el('a', { href: driveView(g.drive), target: '_blank', rel: 'noopener', class: 'lamgablink' }, esc(T.gabLink) + ' ↗'));
        }
      });
      gb.appendChild(row);
      sheet.appendChild(gb);
    }

    var actr = el('div', { class: 'lamact' });
    var bp = el('button', { type: 'button', class: 'btn ghost' }, esc(T.prevLam));
    if (pos === 0) bp.disabled = true;
    bp.addEventListener('click', function () { lamGo(mod, pos - 1); });
    actr.appendChild(bp);
    if (!sim) {
      var b1 = el('button', { type: 'button', class: 'btn primary' }, esc(T.checkOne));
      b1.addEventListener('click', function () { checkOneLam(mod, t); });
      actr.appendChild(b1);
    }
    var bn = el('button', { type: 'button', class: 'btn' }, esc(T.nextLam));
    if (pos >= order.length - 1) bn.disabled = true;
    bn.addEventListener('click', function () { lamGo(mod, pos + 1); });
    actr.appendChild(bn);
    sheet.appendChild(actr);

    grid.appendChild(sheet);
    view.appendChild(grid);
    showImg(k);
    bindLam(mod, view, t);
    if (focusId) {
      var f = document.getElementById(focusId);
      if (f) { f.focus(); try { if (caret != null) f.setSelectionRange(caret, caret); } catch (e) {} }
    }
  }

  function markChips(w) {
    var inp = w && w.querySelector('input'); if (!inp) return;
    var vals = inp.value.split(/\s*\+\s*/).map(function (p) { return Core.norm(p).trim(); });
    w.querySelectorAll('.chip').forEach(function (b) { b.setAttribute('aria-pressed', vals.indexOf(Core.norm(b.textContent).trim()) > -1 ? 'true' : 'false'); });
  }
  function bindLam(mod, view, t) {
    /* depois de verificar, mexer em qualquer campo devolve a lâmina para "a verificar" */
    function edited(node) {
      save();
      if (lamVerified(t)) { lamUncheck(t); save(); renderLam(mod, node.id, node.selectionStart); refresh(mod); return true; }
      return false;
    }
    var fields = [].slice.call(view.querySelectorAll('.lamsheet input, .lamsheet textarea'));
    view.querySelectorAll('[data-f]').forEach(function (f) {
      var id = f.getAttribute('data-f'), w = f.closest('.lamf');
      f.value = S.a[id] || '';
      markChips(w); paint(id);
      f.addEventListener('input', function () {
        S.a[id] = f.value;
        if (edited(f)) return;
        paint(id); markChips(w); refresh(mod);
      });
      f.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        var nx = fields[fields.indexOf(f) + 1]; if (nx) nx.focus();
      });
    });
    var ta = view.querySelector('[data-lt]');
    if (ta) {
      ta.value = lamText(t);
      ta.addEventListener('input', function () {
        S.a[t.txt] = ta.value;
        if (edited(ta)) return;
        var dw = ta.closest('.lamdesc'); if (dw) dw.setAttribute('data-st', descState(t));
        refresh(mod);
      });
    }
  }

  function checkOneLam(mod, t) {
    lamCheck(t); save();
    renderLam(mod); refresh(mod);
    SFX.play(lamTouched(t) ? lamVerdict(t) : null);
  }
  function checkAllLam(mod) {
    var verd = [];
    mod._lamOrder.forEach(function (i) { var t = mod._tree[i]; lamCheck(t); verd.push(lamTouched(t) ? lamVerdict(t) : 'empty'); });
    S.v[mod.id] = true; save();
    if (mod.cronometro) stopTimer(mod);
    renderLam(mod); refresh(mod);
    SFX.play(SFX.verdict(verd));
    var fb = document.getElementById('fb'); if (fb) setTimeout(function () { ensureVisible(fb); }, 60);
  }
  function clearLam(mod, redraw) {
    mod._tree.forEach(function (t) { [t.o, t.p, t.x].forEach(function (it) { delete S.a[it.id]; }); delete S.a[t.txt]; lamUncheck(t); });
    delete S.v[mod.id]; delete S.r[mod.id]; S.li[mod.id] = 0;
    if (redraw || mod.barajar) delete S.o[mod.id];
    if (mod.cronometro) resetTimer(mod);
    mod._imgPos = {};
    save();
    var y = window.scrollY; openMod(mod); window.scrollTo(0, y);
  }

  function refreshLam(mod) {
    var s = lamStats(mod);
    var mt = document.getElementById('mtxt'), mb = document.getElementById('mbar');
    if (mt) mt.innerHTML = '<b>' + s.filled + '</b> ' + esc(T.of) + ' ' + s.total + ' ' + esc(T.fields) + ' ' + esc(T.filledN) + ' · <b>' + s.ok + '</b> ' + esc(T.okN) +
      (s.ver ? ' · ' + esc(T.score2) + ' <b>' + Math.round(s.score * 100) + '%</b>' + (s.ver < s.n ? ' <small>(' + s.ver + '/' + s.n + ' ' + esc(T.lamsWord) + ')</small>' : '') : '') +
      (mod.cronometro ? timerText(mod) : '');
    if (mb) mb.style.width = (s.total ? s.filled / s.total * 100 : 0) + '%';
    var rev = !!S.r[mod.id], br = document.getElementById('bRev');
    if (br) { br.setAttribute('aria-pressed', rev ? 'true' : 'false'); br.textContent = rev ? T.hide : T.reveal; }
    if (mod._lamStrip) mod._lamStrip();
    renderGrade(mod);
    notifyHeight();
  }

  /* planilha: uma linha por lâmina verificada (órgão, processo, descrição, dx e pontuação) */
  function renderGrade(mod) {
    var box = document.getElementById('fb'); if (!box) return;
    box.innerHTML = '';
    var order = mod._lamOrder || [];
    box.appendChild(el('h2', null, esc(T.gradeTitle)));
    if (!order.some(function (i) { return lamVerified(mod._tree[i]); })) { box.appendChild(el('p', { class: 'sum' }, esc(T.gradeWait))); return; }
    box.appendChild(el('p', { class: 'sum' }, esc(T.gradeNote)));
    function cell(it) { var st = S.c[it.id] || 'empty'; return '<td data-st="' + st + '"><span class="mk">' + (ICON[st] || '–') + '</span> ' + esc(LABEL[st] || '') + '</td>'; }
    var rows = '', sum = 0, nv = 0;
    order.forEach(function (ti, pos) {
      var t = mod._tree[ti], jb = '<button type="button" class="lamjump" data-pos="' + pos + '" aria-label="' + esc(T.lamWord + ' ' + (pos + 1)) + '">' + (pos + 1) + '</button>';
      if (!lamVerified(t)) { rows += '<tr><th scope="row">' + jb + '</th><td colspan="5" class="muted">' + esc(T.notChecked) + '</td></tr>'; return; }
      var sc = lamScore(t); sum += sc; nv++;
      rows += '<tr><th scope="row">' + jb + ' <small>' + esc(t.L.nome || t.x.ans) + '</small></th>' + cell(t.o) + cell(t.p) +
        '<td data-st="' + descState(t) + '">' + lamFound(t) + '/' + t.d.length + ' ' + esc(T.finds) + '</td>' + cell(t.x) +
        '<td class="lamtot"><b>' + Math.round(sc * 100) + '%</b></td></tr>';
    });
    var tb = '<div class="tablewrap lamgradewrap"><table class="tbl lamgrade"><thead><tr><th scope="col">' + esc(T.lamWord) + '</th><th scope="col">' + esc(T.fO) + '</th><th scope="col">' + esc(T.fP) + '</th><th scope="col">' + esc(T.fD) + '</th><th scope="col">' + esc(T.fX) + '</th><th scope="col">' + esc(T.score2) + '</th></tr></thead><tbody>' + rows +
      '</tbody><tfoot><tr><th scope="row">' + esc(T.total) + '</th><td colspan="4">' + nv + '/' + order.length + ' ' + esc(T.lamsWord) + '</td><td class="lamtot"><b>' + Math.round(sum / nv * 100) + '%</b></td></tr></tfoot></table></div>';
    box.insertAdjacentHTML('beforeend', tb);
    box.querySelectorAll('.lamjump').forEach(function (b) {
      b.addEventListener('click', function () { var p = +b.getAttribute('data-pos'); if (p === S.li[mod.id]) ensureVisible(mod._lamView); else lamGo(mod, p); });
    });
  }

  /* ---------- foto ampliada (dentro do painel ocupa só a parte visível do quadro) ---------- */
  var LB = null;
  function viewportBox() {
    var top = 0, h = window.innerHeight;
    try {
      var fe = window.frameElement;
      if (fe && window.parent && window.parent !== window) {
        var r = fe.getBoundingClientRect(), ph = window.parent.innerHeight;
        top = Math.max(0, -r.top);
        h = Math.max(260, Math.min(r.height, ph - r.top) - top);
      }
    } catch (e) {}
    return { top: top, h: h };
  }
  function openLightbox(imgs, i, onChange) {
    if (!imgs || !imgs.length) return;
    closeLightbox();
    var back = document.activeElement, many = imgs.length > 1;
    var box = el('div', { class: 'lbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': T.photo });
    box.innerHTML = '<div class="lbbar"><span class="lbcount"></span><span class="lbkind"></span><a class="lbdrive" target="_blank" rel="noopener"></a><button type="button" class="lbclose">' + esc(T.close) + '</button></div>' +
      '<div class="lbstage"><img class="lbimg" alt="" referrerpolicy="no-referrer"></div>' +
      (many ? '<button type="button" class="lbnav lbprev" aria-label="' + esc(T.prevPhoto) + '">‹</button><button type="button" class="lbnav lbnext" aria-label="' + esc(T.nextPhoto) + '">›</button>' : '');
    var img = box.querySelector('.lbimg'), stg = box.querySelector('.lbstage'), dl = box.querySelector('.lbdrive');
    function show(j) {
      i = (j + imgs.length) % imgs.length;
      var im = imgs[i];
      img.classList.remove('z');
      img.src = imgURL(im, 'w2400');
      img.alt = T.photo + ' ' + (i + 1);
      box.querySelector('.lbcount').textContent = T.photo + ' ' + (i + 1) + ' ' + T.of + ' ' + imgs.length;
      box.querySelector('.lbkind').textContent = KIND[im.k] || '';
      if (im.drive) { dl.href = driveView(im.drive); dl.textContent = T.openDrive; dl.hidden = false; } else { dl.hidden = true; dl.removeAttribute('href'); }
      if (onChange) onChange(i);
    }
    img.addEventListener('click', function () { img.classList.toggle('z'); });
    box.querySelector('.lbclose').addEventListener('click', closeLightbox);
    stg.addEventListener('click', function (e) { if (e.target === stg) closeLightbox(); });
    if (many) {
      box.querySelector('.lbprev').addEventListener('click', function () { show(i - 1); });
      box.querySelector('.lbnext').addEventListener('click', function () { show(i + 1); });
    }
    function place() { var vb = viewportBox(); box.style.top = vb.top + 'px'; box.style.height = vb.h + 'px'; }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeLightbox(); }
      else if (many && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); e.stopPropagation(); show(i + (e.key === 'ArrowRight' ? 1 : -1)); }
      else if (e.key === 'Tab') {
        var fo = [].slice.call(box.querySelectorAll('button, a[href]')).filter(function (x) { return !x.hidden; });
        var a = fo.indexOf(document.activeElement), nx = e.shiftKey ? a - 1 : a + 1;
        if (nx < 0) nx = fo.length - 1; if (nx >= fo.length) nx = 0;
        e.preventDefault(); if (fo[nx]) fo[nx].focus();
      }
    }
    document.addEventListener('keydown', onKey, true);
    var par = null;
    try { if (window.frameElement && window.parent !== window) { par = window.parent; par.addEventListener('scroll', place, { passive: true }); par.addEventListener('resize', place); } } catch (e) { par = null; }
    window.addEventListener('resize', place);
    place();
    document.body.appendChild(box);
    document.documentElement.classList.add('lbopen');
    LB = { box: box, back: back, onKey: onKey, place: place, par: par };
    show(i);
    box.querySelector('.lbclose').focus();
  }
  function closeLightbox() {
    if (!LB) return;
    var l = LB; LB = null;
    document.removeEventListener('keydown', l.onKey, true);
    window.removeEventListener('resize', l.place);
    try { if (l.par) { l.par.removeEventListener('scroll', l.place); l.par.removeEventListener('resize', l.place); } } catch (e) {}
    if (l.box.parentNode) l.box.parentNode.removeChild(l.box);
    document.documentElement.classList.remove('lbopen');
    try {
      if (l.back && document.body.contains(l.back)) l.back.focus();
      else { var z = document.querySelector('.lamzoom'); if (z) z.focus(); }
    } catch (e) {}
  }
  /* setas do teclado trocam de lâmina (fora dos campos de texto) */
  document.addEventListener('keydown', function (e) {
    if (LB || !cur || cur.tipo !== 'laminas' || !cur._lamOrder) return;
    var tg = e.target, tag = tg && tg.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (tg && tg.isContentEditable) || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); lamGo(cur, (S.li[cur.id] || 0) + (e.key === 'ArrowRight' ? 1 : -1)); }
  });

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
        if (m.tipo === 'laminas') { S.lvl = m.nivel || '1'; save(); }
        else if (h[2] === 'des' && hasDes(m)) { S.m[m.id] = 'des'; S.lvl = '2'; save(); }
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
