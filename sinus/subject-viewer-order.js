/* SINUS · Ordem consistente dos recursos em todas as abas das matérias.
   Lembretes → leitores/players da turma → demais recursos. */
(function (W, D) {
  'use strict';
  var hostId = 'subjectContent';
  var selectors = [
    '.sxAPV', '.sxMG', '.sxAdminResourceLinks',
    '.sxResourceViewer', '.sxResourcePlayer', '.sxStudyPlayer',
    '.sxSlidesViewer', '.sxLibraryPlayer', '.sxVideoGallery'
  ];
  var observer, scheduled = false, modifying = false;
  function arrange() {
    scheduled = false;
    if (modifying) return;
    var host = D.getElementById(hostId);
    var view = D.getElementById('subjectView');
    if (!host || !view || view.classList.contains('hidden')) return;
    // O painel acadêmico contém o slot prioritário da aba atual.
    // Os módulos de Vídeos, Provas e Treino podem chegar assincronamente;
    // realocamos seus nós sem recriar iframes nem perder listeners.
    var academic = host.querySelector(':scope > .sxAcademicOrdered');
    if (academic) {
      var remSlot = academic.querySelector(':scope > .sxAOReminders');
      var primary = academic.querySelector('[data-sx-primary]');
      var slideOnly = W.UI?.mode === 'theory' && W.UI?.tab === 'slides';
      var incoming = Array.prototype.slice.call(host.children).filter(function(el) {return el !== academic;});
      modifying = true;
      for (var n = 0; n < incoming.length; n++) {
        var el = incoming[n];
        if (el.matches('.sinus-rem-box') && remSlot) {
          remSlot.replaceChildren(el);
        } else if (primary) {
          primary.appendChild(el);
        } else if (slideOnly && el.matches('.resourceLayout,.sxMG,.sxMGOriginal')) {
          // Slides possuem um único player; descartar visualizadores paralelos.
          el.remove();
        }
      }
      if (host.firstElementChild !== academic) host.prepend(academic);
      modifying = false;
      return;
    }
    var children = Array.prototype.slice.call(host.children);
    if (!children.length) return;
    var reminders = children.filter(function (el) { return el.matches('.sinus-rem-box'); });
    var viewers = children.filter(function (el) { return !el.matches('.sinus-rem-box') && selectors.some(function (sel) { return el.matches(sel); }); });
    if (!reminders.length && !viewers.length) return;
    var preferred = reminders.concat(viewers);
    if (preferred.every(function (el, i) { return children[i] === el; })) return;
    // Insert in reverse to retain the order within each group.
    modifying = true;
    for (var i = preferred.length - 1; i >= 0; i--) {
      if (host.firstElementChild !== preferred[i]) host.insertBefore(preferred[i], host.firstChild);
    }
    modifying = false;
  }
  function schedule() {
    if (scheduled || modifying) return;
    scheduled = true;
    W.requestAnimationFrame(arrange);
  }
  function connect() {
    var host = D.getElementById(hostId);
    if (!host) return;
    if (observer) observer.disconnect();
    observer = new MutationObserver(schedule);
    observer.observe(host, { childList: true });
    schedule();
  }
  function init() {
    var original = W.renderSubject;
    if (typeof original === 'function') {
      W.renderSubject = function () {
        var result = original.apply(this, arguments);
        connect();
        return result;
      };
    }
    connect();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
  var styles = D.createElement('style');
  styles.textContent =
    /* Lista à esquerda e player à direita no computador. */
    '.sxAPVColumns{grid-template-columns:minmax(250px,.85fr) minmax(0,1.45fr)!important}' +
    '.sxAPVColumns>.sxAPVSide{grid-column:1;grid-row:1;max-height:650px}' +
    '.sxAPVColumns>.sxAPVMain{grid-column:2;grid-row:1;min-width:0}' +
    '@media(max-width:760px){.sxAPVColumns{display:flex!important;flex-direction:column!important}' +
    '.sxAPVColumns>.sxAPVMain{order:1;width:100%}' +
    '.sxAPVColumns>.sxAPVSide{order:2;width:100%;max-height:340px}}';
  D.head.appendChild(styles);
})(window, document);
