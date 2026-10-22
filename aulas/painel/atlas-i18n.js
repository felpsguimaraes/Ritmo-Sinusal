/* Sinus Atlas 3D — idiomas (pt / es / en). Traduz nomes das estruturas e textos da interface. */
(function () {
  var LANGS = ['pt', 'es', 'en'], KEY = 'sinus.atlas.lang';
  var base = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^\/]*$/, '') : '';
  })();
  var realFetch = window.fetch.bind(window);

  function pick() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (q && LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem(KEY); if (s && LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    return n === 'es' ? 'es' : 'pt';
  }
  var lang = pick();
  var idx = lang === 'es' ? 1 : 0;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    try {
      var u = new URL(location.href); u.searchParams.set('lang', l);
      location.replace(u.toString());
    } catch (e) { location.reload(); }
  }

  /* ---------- nomes das estruturas ---------- */
  var namesP = null;
  function loadNames() {
    if (!namesP) namesP = realFetch(base + 'atlas-names.json').then(function (r) { return r.json(); });
    return namesP;
  }
  function cap(src, t) { return /^[A-Z]/.test(src) && t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
  function tName(map, name) {
    var v = map[name.toLowerCase()];
    return v ? cap(name, v.split('|')[idx]) : name;
  }
  window.fetch = function (u, o) {
    var s = typeof u === 'string' ? u : (u && u.url) || '';
    if (lang !== 'en' && /models\/atlas\.json/.test(s)) {
      return Promise.all([realFetch(u, o), loadNames()]).then(function (r) {
        return r[0].json().then(function (d) {
          d.parts.forEach(function (p) { p.en = p.name; p.name = tName(r[1], p.name); });
          d.concepts.forEach(function (c) { c.en = c.name; c.name = tName(r[1], c.name); });
          return new Response(JSON.stringify(d), { status: 200, headers: { 'Content-Type': 'application/json' } });
        });
      });
    }
    return realFetch(u, o);
  };

  /* ---------- textos da interface ---------- */
  var ui = null, uiLower = null, ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];
  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function lookup(k) {
    var v = ui[k]; if (v) return v[idx];
    v = uiLower[k.toLowerCase()]; return v ? v[idx] : null;
  }
  function tr(str) {
    if (!ui || lang === 'en') return null;
    var k = norm(str); if (!k) return null;
    var v = lookup(k); if (v) return v;
    var m = /^Show only (.+)$/.exec(k);
    if (m) { var a = lookup(m[1]); return (idx ? 'Mostrar solo ' : 'Mostrar apenas ') + (a ? a.toLowerCase() : m[1]); }
    m = /^Show (.+)$/.exec(k);
    if (m) { var b = lookup(m[1]); if (b) return 'Mostrar ' + b.toLowerCase(); }
    return null;
  }
  function fixText(n) {
    var o = n.nodeValue, t = tr(o);
    if (t) { var lead = /^\s*/.exec(o)[0], trail = /\s*$/.exec(o)[0]; n.nodeValue = lead + t + trail; }
  }
  function fixAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (v) { var t = tr(v); if (t && t !== v) el.setAttribute(ATTRS[i], t); }
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { fixText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.id === 'sinus-lang') return;
    fixAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
    var n = w.nextNode();
    while (n) {
      if (n.nodeType === 3) fixText(n);
      else if (n.id !== 'sinus-lang') fixAttrs(n);
      n = w.nextNode();
    }
  }
  function startObserver() {
    walk(document.body);
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === 'characterData') fixText(m.target);
        else if (m.type === 'attributes') fixAttrs(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  /* ---------- seletor de idioma ---------- */
  function mount() {
    var css = document.createElement('style');
    css.textContent =
      '#sinus-lang{position:fixed;z-index:60;top:14px;left:50%;transform:translateX(-50%);display:flex;gap:2px;padding:3px;border-radius:999px;background:rgba(255,255,255,.78);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(32,36,43,.14);box-shadow:0 2px 10px rgba(32,36,43,.08);font:600 12px/1 system-ui,-apple-system,sans-serif}' +
      '#sinus-lang button{appearance:none;border:0;background:transparent;color:#4b5560;padding:7px 11px;border-radius:999px;cursor:pointer;letter-spacing:.04em;font:inherit}' +
      '#sinus-lang button:hover{color:#14232a}' +
      '#sinus-lang button[aria-pressed="true"]{background:#1d7563;color:#fff}' +
      '#sinus-lang button:focus-visible{outline:2px solid #1d7563;outline-offset:2px}' +
      '@media (max-width:767px){#sinus-lang{top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 118px);left:auto;right:12px;transform:none}}';
    document.head.appendChild(css);
    var box = document.createElement('div');
    box.id = 'sinus-lang'; box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Idioma / Idioma / Language');
    [['pt', 'PT', 'Português'], ['es', 'ES', 'Español'], ['en', 'EN', 'English']].forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = x[1]; b.title = x[2]; b.lang = x[0];
      b.setAttribute('aria-label', x[2]); b.setAttribute('aria-pressed', x[0] === lang ? 'true' : 'false');
      b.addEventListener('click', function () { setLang(x[0]); });
      box.appendChild(b);
    });
    document.body.appendChild(box);
  }

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (d && typeof d === 'object' && d.type === 'sinus-atlas:lang') setLang(String(d.lang));
  });
  try { parent !== window && parent.postMessage({ type: 'sinus-atlas:ready', lang: lang }, '*'); } catch (e) {}


  /* ---------- painel "Detalhes para prova" ---------- */
  var detP = null, rev = null, detCss = false;
  function strip(n) { return n.replace(/\b(left|right)\b/g, ' ').replace(/\s+/g, ' ').trim(); }
  function loadDet() {
    if (!detP) detP = Promise.all([
      realFetch(base + 'atlas-detalhes.json').then(function (r) { return r.json(); }),
      loadNames()
    ]).then(function (r) {
      var det = r[0], names = r[1]; rev = {};
      Object.keys(names).forEach(function (en) {
        var k = strip(en); if (!det[k]) return;
        var t = names[en].split('|')[idx].toLowerCase();
        (rev[t] = rev[t] || {})[k] = 1;
      });
      Object.keys(det).forEach(function (k) { (rev[k] = rev[k] || {})[k] = 1; });
      return det;
    }).catch(function () { return null; });
    return detP;
  }
  var TXT = {
    pt: { h: 'Detalhes para prova', note: 'Conteúdo de apoio com base em Terminologia Anatômica e livros-texto. Confira sempre com o material e a nomenclatura do seu professor.' },
    es: { h: 'Detalles para el examen', note: 'Contenido de apoyo basado en Terminología Anatómica y textos de referencia. Confirma siempre con el material y la nomenclatura de tu profesor.' }
  };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function render(ent) {
    var t = TXT[lang === 'es' ? 'es' : 'pt'], d = ent[lang === 'es' ? 'es' : 'pt']; if (!d) return null;
    var h = '<h3>' + t.h + '</h3><p class="sd-res">' + md(d.resumo || '') + '</p>';
    (d.secoes || []).forEach(function (sc, i) {
      h += '<details' + (i < 3 ? ' open' : '') + '><summary>' + esc(sc.titulo) + '</summary><ul>' +
        sc.itens.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ul></details>';
    });
    return h + '<p class="sd-note">' + t.note + '</p>';
  }
  function injectDet() {
    if (lang === 'en') return;
    var title = document.querySelector('.detail-sheet .structure-title');
    var scroll = document.querySelector('.detail-sheet .detail-scroll');
    var old = document.getElementById('sinus-det');
    if (!title || !scroll) { if (old) old.remove(); return; }
    var key = title.textContent.trim().toLowerCase();
    if (old && old.getAttribute('data-k') === key && old.parentNode === scroll) return;
    loadDet().then(function (det) {
      if (!det || !rev) return;
      var t2 = document.querySelector('.detail-sheet .structure-title'), sc2 = document.querySelector('.detail-sheet .detail-scroll');
      if (!t2 || !sc2 || t2.textContent.trim().toLowerCase() !== key) return;
      var o = document.getElementById('sinus-det'); if (o) o.remove();
      var c = rev[key]; if (!c) return;
      var k = Object.keys(c)[0], html = det[k] && render(det[k]); if (!html) return;
      if (!detCss) {
        detCss = true; var st = document.createElement('style');
        st.textContent = '#sinus-det{border-top:1px solid rgba(32,36,43,.14);padding-top:14px;display:flex;flex-direction:column;gap:8px;font:14px/1.45 system-ui,-apple-system,sans-serif;color:inherit}' +
          '#sinus-det h3{margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#1d7563}' +
          '#sinus-det .sd-res{margin:0 0 4px}' +
          '#sinus-det details{border:1px solid rgba(32,36,43,.12);border-radius:10px;padding:0 12px;background:rgba(255,255,255,.5)}' +
          '#sinus-det summary{cursor:pointer;font-weight:600;padding:9px 0;list-style-position:inside}' +
          '#sinus-det ul{margin:0 0 10px;padding-left:18px;display:flex;flex-direction:column;gap:5px}' +
          '#sinus-det strong{color:#14575a}' +
          '#sinus-det .sd-note{margin:2px 0 6px;font-size:12px;opacity:.75}' +
          '.detail-scroll:has(#sinus-det) .structure-description,.detail-scroll:has(#sinus-det) .context-note{display:none}' +
          '.detail-scroll:has(#sinus-det) #sinus-det{order:-1;border-top:0;padding-top:0}' +
          '.detail-sheet:has(#sinus-det){height:calc(100vh - 150px);max-height:calc(100vh - 150px)}';
        document.head.appendChild(st);
      }
      var box = document.createElement('section'); box.id = 'sinus-det'; box.setAttribute('data-k', key); box.innerHTML = html;
      sc2.appendChild(box);
    });
  }
  var detQueued = false;
  function queueDet() { if (detQueued) return; detQueued = true; requestAnimationFrame(function () { detQueued = false; injectDet(); }); }
  function startDet() { if (lang === 'en') return; new MutationObserver(queueDet).observe(document.body, { subtree: true, childList: true, characterData: true }); queueDet(); }

  function init() {
    mount();
    startDet();
    if (lang === 'en') return;
    realFetch(base + 'atlas-ui.json').then(function (r) { return r.json(); }).then(function (d) {
      ui = d; uiLower = {};
      Object.keys(d).forEach(function (k) { uiLower[k.toLowerCase()] = d[k]; });
      startObserver();
    }).catch(function () {});
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();
