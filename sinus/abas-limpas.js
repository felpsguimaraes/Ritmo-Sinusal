/* SINUS · abas limpas.
   Abaixo da fileira de abas (Resumo / Apostila · Slides · Vídeos / Áudios · Arquivos da biblioteca · Treino)
   aparece só o conteúdo da aba que o aluno escolheu. Vale para todas as matérias, períodos, turmas,
   teoria e prática. Os blocos acessórios (lembretes, acervo complementar, «outros materiais»,
   visualizador original, galeria de apoio) ficam ocultos. Carregado por último: envolve os demais. */
(function (W, D) {
  'use strict';
  var HOST = 'subjectContent';

  // Sempre ocultos dentro da matéria: não são o conteúdo da aba escolhida.
  var SEMPRE = [
    '.sxAOReminders', '.sinus-rem-box', '.sxAORemindFallback', // Lembretes
    '.sxAOLibrary',                                            // Acervo complementar · Arquivos da biblioteca
    '.sxAOOtherOwn',                                           // Outros materiais desta aba
    '.sxStudyExtras',                                          // Outros materiais e ferramentas
    '.sxMGOriginal'                                            // Visualizador original da matéria
  ];
  var css = D.createElement('style');
  css.id = 'sxAbasLimpasCSS';
  css.textContent = SEMPRE.map(function (s) { return '#' + HOST + ' ' + s; }).join(',') + '{display:none!important}' +
    '#' + HOST + ' .sxAbaOculta{display:none!important}';
  D.head.appendChild(css);

  function tab() { return (typeof UI !== 'undefined' && UI && UI.tab) || ''; }

  // A galeria do acervo (.sxMG) só fica quando ela é o próprio conteúdo da aba.
  function limpar() {
    agendado = false;
    var host = D.getElementById(HOST), view = D.getElementById('subjectView');
    if (!host || !view || view.classList.contains('hidden')) return;
    var t = tab();
    host.setAttribute('data-sx-aba', t);
    var galerias = host.querySelectorAll('.sxMG');
    for (var i = 0; i < galerias.length; i++) {
      var g = galerias[i], ocultar = false;
      if (['training', 'cartoes', 'mapas', 'review'].indexOf(t) >= 0) ocultar = true;            // apoio no treino
      else if (t === 'apostila' && host.querySelector('[data-sx-apostila]')) ocultar = true;       // a apostila SINUS já é o conteúdo
      else if ((t === 'videos' || t === 'audios') && host.querySelector('[data-sx-avp-shell],[data-sx-course-media],.sxMediaSection')) ocultar = true;
      else if (t === 'slides' && host.querySelector('[data-sx-unified-slides],.resourceLayout')) ocultar = true; // a aba já tem os slides
      else if (t !== 'provas' && host.querySelector('.resourceLayout')) ocultar = true;            // conteúdo próprio da aba já presente
      g.classList.toggle('sxAbaOculta', ocultar);
    }
  }
  var agendado = false;
  function agendar() { if (agendado) return; agendado = true; (W.requestAnimationFrame || setTimeout)(limpar); }

  var obs = null;
  function conectar() {
    var host = D.getElementById(HOST);
    if (!host || typeof MutationObserver === 'undefined') return;
    if (obs) obs.disconnect();
    obs = new MutationObserver(agendar);
    obs.observe(host, { childList: true, subtree: true });
    agendar();
  }

  // «Visão geral» não é uma aba da fileira: a matéria abre direto em Resumo / Apostila.
  var original = W.renderSubject;
  if (typeof original === 'function') {
    W.renderSubject = function () {
      if (typeof UI !== 'undefined' && UI && UI.tab === 'overview') UI.tab = 'apostila';
      var r = original.apply(this, arguments);
      conectar();
      return r;
    };
  }
  conectar();
})(window, document);
