/* Mapas guiados integrados ao painel SINUS: aba "Mapas guiados" (Anatomía Patológica I e Farmacología I).
   O conteúdo fica em /mapas/ (tela e dados); aqui só entram a aba e o quadro que o mostra. */
(function (W, D) {
  'use strict';
  var TXT = {
    pt: ['Mapas guiados', 'A estrutura já está pronta: você só completa os campos e liga os assuntos. Anatomía Patológica I e Farmacología I, 5º semestre.', 'Abrir em página inteira'],
    es: ['Mapas guiados', 'La estructura ya está lista: solo completás los campos y conectás los temas. Anatomía Patológica I y Farmacología I, 5º semestre.', 'Abrir en página completa'],
    en: ['Guided maps', 'The structure is ready: you only fill in the blanks and connect the topics. Pathology I and Pharmacology I, 5th semester.', 'Open full page']
  };
  function lang() { try { var l = localStorage.getItem('sinus_idioma'); return TXT[l] ? l : 'pt'; } catch (e) { return 'pt'; } }
  function box() { return D.getElementById('page-hub'); }
  function frame() { return D.getElementById('sinusMapasFrame'); }

  function render() {
    var t = TXT[lang()];
    D.getElementById('pageTitle').textContent = t[0];
    box().innerHTML =
      '<div class="sxMapasHeader"><div><span class="eyebrow">ESTUDO E REVISÃO</span><h1>' + t[0] + '</h1><p>' + t[1] + '</p></div>' +
      '<a class="btn" href="/mapas/" target="_blank" rel="noopener">' + t[2] + ' ↗</a></div>' +
      '<div class="sxMapasStage"><iframe id="sinusMapasFrame" title="' + t[0] + '" src="/mapas/"></iframe></div>';
  }

  var originalHub = W.renderHub;
  W.renderHub = function (page) {
    if (page === 'mapas') return render();
    return originalHub.apply(this, arguments);
  };
  var originalNav = W.nav;
  W.nav = function (page) {
    if (page !== 'mapas') { var f = frame(); if (f) f.remove(); }
    return originalNav.apply(this, arguments);
  };

  /* o quadro avisa a altura do conteúdo e quando troca de mapa (para voltar ao topo) */
  W.addEventListener('message', function (e) {
    if (e.origin !== W.location.origin || !e.data) return;
    var f = frame(); if (!f) return;
    if (e.data.sinusMapasAltura) f.style.height = Math.max(560, e.data.sinusMapasAltura + 8) + 'px';
    if (e.data.sinusMapasTopo) {
      var top = f.getBoundingClientRect().top + W.pageYOffset - 76;
      W.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  });

  var style = D.createElement('style');
  style.textContent = '.sxMapasHeader{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;flex-wrap:wrap;margin:12px 0 18px}' +
    '.sxMapasHeader h1{font-size:34px;letter-spacing:-1px;margin:8px 0}.sxMapasHeader p{max-width:62ch;color:#64796b;line-height:1.6;margin:0}' +
    '.sxMapasStage{border:0;border-radius:22px;overflow:hidden}.sxMapasStage iframe{display:block;width:100%;height:760px;border:0;background:transparent}';
  D.head.appendChild(style);
})(window, document);
