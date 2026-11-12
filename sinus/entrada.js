/* Entrada do SINUS. Tema, idioma e Google na hora.
   O painel (calendário, flashcards, admin) só baixa depois da sessão. */
(function () {
  'use strict';
  var W = window, D = document;
  var LISTA = [
    '/aulas/catalogo.js?v=4',
    '/aulas/flashcards/cartoes.js?v=15',
    '/aulas/apostila-farmacologia/exercicios.js?v=1',
    '/aulas/agenda.js?v=3',
    '/sinus/transcricao-real.js?v=20261025-2',
    '/sinus/texto-rico.js?v=1',
    '/sinus/painel-v17.js?v=20261112-laminario',
    '/sinus/drive-sync.js?v=20261024-grade',
    '/sinus/acervo-materias.js?v=20261024-grade',
    '/sinus/calendario-dados.js?v=20261023',
    '/sinus/calendario-motor.js?v=20261024',
    '/sinus/academico-oficial-drive.js?v=20261025-oficial-ucp',
    '/sinus/ucp-catedra-catalog.js?v=20261025-anatomia2-folderfix-publish-2',
    '/sinus/integracao-v17.js?v=20261112-laminario',
    '/sinus/mapas-guiados.js?v=3',
    '/sinus/agenda-liquid-v4.js?v=20261024',
    '/sinus/identidade-esfera.js?v=2',
    '/sinus/biblioteca-visual.js?v=20261112-sessao',
    '/sinus/youtube-curadoria.js?v=20261025-all-courses-v1',
    '/sinus/youtube-videoteca.js?v=20261025-video-curadoria-v1',
    '/sinus/youtube-playlists-materias.js?v=20261025-anatomia-cards2',
    '/sinus/icones-materias.js?v=20261024',
    '/sinus/medicina-import.js?v=20261024-grade',
    '/sinus/acervo-provas-auditado.js?v=20261024-grade',
    '/sinus/atlas-revalida.js?v=revalida-20261101-areas',
    '/sinus/admin-integration.js?v=20261025-catedra-videos-permissions',
    '/sinus/compromissos-integrados.js?v=20261025-aoblocks1',
    '/sinus/agenda-semanal-v5.js?v=20261024-preview1',
    '/sinus/treino-unificado-v1.js?v=20261112-unificado',
    '/sinus/anatomia-pratica-videos.js?v=20261025-catedra-titulos-limpos6',
    '/sinus/estudo-acervo-disciplinas.js?v=20261025-video-curadoria-v1',
    '/sinus/materias-galeria-acervo.js?v=20261025-exam-label-cleanup',
    '/sinus/subject-resource-balloons.js?v=20261025-slides-library-sync-v2',
    '/sinus/treino-hub.js?v=20261112-laminario',
    '/sinus/subject-viewer-order.js?v=20261025-players-by-tab-v1',
    '/sinus/video-player-materias.js?v=20261025-audio-preview-fix2',
    '/laminario-zoom.js'
  ];
  var carregando = null;

  function msg(t, erro) {
    var m = D.getElementById('sxMsg');
    if (!m) return;
    m.textContent = t || '';
    m.className = 'sxMsg' + (erro ? ' erro' : '');
  }
  function temaAtual() { return D.documentElement.getAttribute('data-theme') === 'dark' ? 'escuro' : 'claro' }
  function aplicarTema(t) {
    D.documentElement.setAttribute('data-theme', t === 'escuro' ? 'dark' : 'light');
    try { localStorage.setItem('sinus_tema', t) } catch (e) {}
    var meta = D.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'escuro' ? '#0f1814' : '#155B48');
    D.querySelectorAll('[data-sx-tema]').forEach(function (b) {
      b.textContent = t === 'escuro' ? '☀' : '☾';
    });
  }
  function idioma() {
    try {
      var l = localStorage.getItem('sinus_idioma');
      if (l === 'pt' || l === 'es' || l === 'en') return l;
    } catch (e) {}
    var n = String(navigator.language || 'pt').slice(0, 2).toLowerCase();
    return n === 'es' ? 'es' : n === 'en' ? 'en' : 'pt';
  }
  function definirIdioma(l) {
    if (l !== 'pt' && l !== 'es' && l !== 'en') l = 'pt';
    try { localStorage.setItem('sinus_idioma', l) } catch (e) {}
    D.documentElement.lang = { pt: 'pt-BR', es: 'es', en: 'en' }[l];
    if (W.SinusI18n) W.SinusI18n.set(l);
    D.querySelectorAll('[data-sx-lang]').forEach(function (b) {
      var on = b.getAttribute('data-sx-lang') === l;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function entrar() {
    if (!W.SinusBackend) { msg('Não foi possível carregar o login. Atualize a página.', true); return }
    var b = D.getElementById('sxEntrar');
    if (b) b.disabled = true;
    msg('Abrindo a entrada do Google…');
    W.SinusBackend.signIn().catch(function (e) {
      if (b) b.disabled = false;
      msg((e && e.message) || 'Não foi possível entrar. Tente novamente.', true);
    });
  }
  function um(src) {
    return new Promise(function (ok, falha) {
      var s = D.createElement('script');
      s.src = src;
      s.onload = function () { ok() };
      s.onerror = function () { falha(new Error(src)) };
      D.body.appendChild(s);
    });
  }
  function carregarApp() {
    if (W.SINUS_APP_PRONTA) return Promise.resolve();
    if (carregando) return carregando;
    msg('Carregando seu espaço…');
    carregando = LISTA.reduce(function (p, src) { return p.then(function () { return um(src) }) }, Promise.resolve()).catch(function (e) {
      console.error('SINUS', e);
      carregando = null;
      D.documentElement.classList.remove('sxSessao');
      var b = D.getElementById('sxEntrar');
      if (b) b.disabled = false;
      msg('Não foi possível carregar o painel. Atualize a página e tente de novo.', true);
      throw e;
    });
    return carregando;
  }

  D.addEventListener('click', function (e) {
    if (W.SINUS_APP_PRONTA) return;
    var t = e.target.closest ? e.target.closest('[data-sx-tema],[data-sx-lang],#sxEntrar') : null;
    if (!t) return;
    if (t.id === 'sxEntrar') return entrar();
    if (t.hasAttribute('data-sx-tema')) return aplicarTema(temaAtual() === 'escuro' ? 'claro' : 'escuro');
    if (t.hasAttribute('data-sx-lang')) return definirIdioma(t.getAttribute('data-sx-lang'));
  });

  aplicarTema(temaAtual());
  definirIdioma(idioma());
  if (D.documentElement.classList.contains('sxSessao')) carregarApp();
  if (W.SinusBackend && W.SinusBackend.auth) {
    W.SinusBackend.auth.onAuthStateChanged(function (u) {
      if (u) carregarApp();
    });
  }
})();
