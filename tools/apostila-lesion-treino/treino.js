(function () {
  'use strict';
  var caixas = [].slice.call(document.querySelectorAll('.trn'));
  if (!caixas.length) return;
  var D = window.SINUSAL_P2_DADOS;
  if (!D || !D.qs) { caixas.forEach(function (c) { c.hidden = true; }); return; }

  var Q = {};
  D.qs.forEach(function (q) { Q[q.p + ':' + q.n] = q; });
  var FONTE = { final24: 'Final 2024', f24t: 'Final 2024 digitada', pef: 'Banco PEF', robbins: 'Banco Robbins', p2d: 'P2 · Turma D', p2c: 'P2 · Turma C',
    p2_26: '2ª parcial 2026 · 5º F', r26g: '2ª parcial 2026 · 5º G', par1r: '1º Parcial + Recup.', p1c: 'P1 · Turma C',
    p2f1: 'P2 · folha original', p2f2: 'P2 · folha original', par1: '1º Parcial', rec23: 'Recuperatoria 2023',
    reg24: 'Regularización 2024', p1g26: '1ª parcial 2026', rec26f: 'Recuperatoria 2026 · 5º F' };
  var BANCO = { pef: 1, robbins: 1 };
  var TIPO = { mc: 'Marca la opción correcta', cita: 'Cita', comp: 'Completa', vf: 'Verdadero o falso' };
  var LET = 'abcdefghij';
  var KEY = 'sinus-treino-apostila:v1', mem = {};
  try { mem = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { mem = {}; }
  function grava() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------------------------------------------------------------- conferência no jeito dela
  var STOP = {};
  ('de del la las los el en y o u e a al con sin por para que se su sus un una uno unos unas es son lo le como mas muy ' +
   'entre sobre tambien the da do das dos na no nas nos em ou ao aos sua seu pelo pela').split(' ').forEach(function (w) { STOP[w] = 1; });
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function raiz(n) { return n.replace(/(?:es|s)$/, '').replace(/[aeo]$/, ''); }
  function toks(s) {
    return (String(s).match(/[A-Za-zÀ-ÿ0-9α]+(?:-[A-Za-zÀ-ÿ0-9α]+)*/g) || []).map(function (w) {
      var n = norm(w).replace(/[^a-z0-9]/g, '');
      return { w: w, n: n, r: raiz(n) };
    }).filter(function (o) { return (o.n.length >= 3 || /\d/.test(o.n)) && !STOP[o.n]; });
  }
  var NUM = { dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6 };
  function pedidos(enunciado) {
    var m = norm(enunciado).match(/^\s*(?:cite\s+|mencione\s+|nombre\s+|enumere\s+)?(\d|dos|tres|cuatro|cinco|seis)\s/);
    return m ? NUM[m[1]] || 0 : 0;
  }
  function semParenteses(s) { return String(s).replace(/\([^)]*\)/g, ' '); }
  function itens(s) {
    return semParenteses(s).replace(/[.;:]\s*$/, '').split(/\s*[;,\n]\s*|\s+y\s+|\s+e\s+(?=h?i)/i)
      .map(function (x) { return x.trim(); }).filter(function (x) { return toks(x).length; });
  }
  var SIGLA = { LDL: 'lipoproteína de baja densidad', HDL: 'lipoproteína de alta densidad', CML: 'células musculares lisas',
    IG: 'inmunoglobulinas', Ig: 'inmunoglobulinas', Sx: 'síndrome', MO: 'microscopio óptico', ME: 'microscopio electrónico',
    PAS: 'ácido periódico de Schiff', HTA: 'hipertensión arterial', DM: 'diabetes mellitus', IAM: 'infarto agudo de miocardio',
    ACV: 'accidente cerebrovascular', LES: 'lupus eritematoso sistémico', TB: 'tuberculosis', TBC: 'tuberculosis',
    PG: 'prostaglandinas', LT: 'leucotrienos', ERO: 'especies reactivas de oxígeno', PMN: 'polimorfonucleares',
    AAT: 'alfa-1-antitripsina', Enf: 'enfermedad', 'Cél': 'células', Cel: 'células' };
  var ROMANO = /^(?:I|II|III|IV|V|VI|VII|VIII|IX|X)$/;
  function siglas(txt, gab) {
    var dela = [], talvez = [], visto = {};
    (String(txt).match(/[A-Za-zÀ-ÿ0-9α]+(?:-[A-Za-zÀ-ÿ0-9α]+)*\.?/g) || []).forEach(function (t) {
      var b = t.replace(/\.$/, '');
      if (visto[b]) return;
      visto[b] = 1;
      var re = new RegExp('(^|[^A-Za-zÀ-ÿ0-9])' + b.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&') + '(?=$|[^A-Za-zÀ-ÿ0-9])');
      if (re.test(gab)) return;
      if (Object.prototype.hasOwnProperty.call(SIGLA, b)) dela.push([b, SIGLA[b]]);
      else if (/^[A-Z]{2,5}[0-9]*$/.test(b) && !ROMANO.test(b)) talvez.push(b);
    });
    return { dela: dela, talvez: talvez };
  }
  function confere(q, txt) {
    var gab = String(q.a || '');
    var meu = {}; toks(txt).forEach(function (o) { meu[o.r] = 1; });
    var todos = toks(semParenteses(gab)), its = itens(gab), N = pedidos(q.q);
    var falta = [], vistos = {};
    function faltou(o) { if (!vistos[o.r]) { vistos[o.r] = 1; falta.push(o.w); } }
    var nota;
    if (its.length <= 1 || todos.length > 12) {
      var h = todos.filter(function (o) { return meu[o.r]; }).length, f = todos.length ? h / todos.length : 0;
      todos.forEach(function (o) { if (!meu[o.r]) faltou(o); });
      var corte = todos.length <= 2 ? 1 : todos.length === 3 ? 2 / 3 : 0.6;
      nota = f >= corte ? 1 : f > 0 ? 0.5 : 0;
    } else {
      var bons = 0;
      its.forEach(function (it) {
        var t = toks(it), h2 = t.filter(function (o) { return meu[o.r]; }).length;
        var precisa = t.length <= 2 ? t.length : t.length === 3 ? 2 : Math.ceil(t.length * 0.7);
        if (h2 >= precisa) bons++;
        if (h2 < t.length) t.forEach(function (o) { if (!meu[o.r]) faltou(o); });
      });
      var alvo = N && N < its.length ? N : its.length;
      nota = bons >= alvo ? 1 : bons > 0 ? 0.5 : 0;
      if (N && N < its.length && bons >= N) falta = [];
    }
    var sg = siglas(txt, gab);
    if (sg.dela.length) nota = 0;
    var escritos = semParenteses(txt).split(/\s*[;,\n]\s*|\s+y\s+|\s+e\s+/i).filter(function (x) { return toks(x).length; }).length;
    if (N && escritos > N && nota === 1) nota = 0.5;  // "Cite 2" é exatamente dois
    return { nota: nota, falta: falta.slice(0, 6), siglas: sg, N: N, escritos: escritos };
  }

  // ---------------------------------------------------------------- volta ao quadro depois de ver a explicação
  var volta = document.createElement('button');
  volta.type = 'button'; volta.className = 'trn-volta'; volta.hidden = true; volta.textContent = '↩ Voltar ao treino';
  document.body.appendChild(volta);
  var voltaT;
  function irPara(id, caixa) {
    var a = document.getElementById(id); if (!a) return;
    var alvo = a;
    if (a.classList.contains('alerta-cai')) {
      var p = a.previousElementSibling;
      while (p && (p.classList.contains('alerta-cai') || p.classList.contains('trn'))) p = p.previousElementSibling;
      if (p && !/^H[1-6]$/.test(p.tagName) && p.offsetParent) alvo = p;
    }
    if (!alvo.offsetParent) alvo = a;
    alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    alvo.classList.remove('trn-flash'); void alvo.offsetWidth; alvo.classList.add('trn-flash');
    volta.hidden = false;
    volta.onclick = function () { caixa.scrollIntoView({ behavior: 'smooth', block: 'start' }); volta.hidden = true; };
    clearTimeout(voltaT); voltaT = setTimeout(function () { volta.hidden = true; }, 20000);
  }

  // ---------------------------------------------------------------- cada quadro
  caixas.forEach(function (cx) {
    var todos = (cx.getAttribute('data-trnq') || '').split('|').map(function (s) {
      var m = s.split('@'); return { k: m[0], ancora: m[1], q: Q[m[0]] };
    }).filter(function (x) { return x.q; });
    if (!todos.length) { cx.hidden = true; return; }
    var bd = cx.querySelector('.trn-bd'), pg = cx.querySelector('.trn-pg');
    var lista = todos, i = 0;
    for (var j = 0; j < todos.length; j++) { if (mem[todos[j].k] == null) { i = j; break; } }
    var nav = document.createElement('div');
    nav.className = 'trn-nav';
    nav.innerHTML = '<button type="button" class="trn-b" data-a="-1" aria-label="Questão anterior">‹</button><span class="trn-pos" aria-live="polite"></span><button type="button" class="trn-b" data-a="1" aria-label="Próxima questão">›</button>';
    cx.appendChild(nav);
    nav.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var d = +b.getAttribute('data-a');
      if (i + d >= lista.length) { fim(); return; }
      i = Math.max(0, i + d); mostra();
    });
    function placar() {
      var f = todos.filter(function (x) { return mem[x.k] != null; }).length;
      pg.hidden = !f; pg.textContent = '✓ ' + f + '/' + todos.length;
    }
    function nota(k, g) { mem[k] = g; grava(); placar(); }
    function rodape(x) {
      return '<div class="trn-row">' + (x.ancora ? '<button type="button" class="trn-b" data-ir="' + esc(x.ancora) + '">📍 Ver na explicação</button>' : '') + '</div>';
    }
    function ligaIr(el) {
      [].forEach.call(el.querySelectorAll('[data-ir]'), function (b) { b.onclick = function () { irPara(b.getAttribute('data-ir'), cx); }; });
    }
    function fim() {
      var g = todos.map(function (x) { return mem[x.k]; });
      var feitas = g.filter(function (v) { return v != null; }).length;
      var certas = g.filter(function (v) { return v === 1; }).length, quase = g.filter(function (v) { return v === 0.5; }).length;
      var erradas = todos.filter(function (x) { return mem[x.k] != null && mem[x.k] < 1; });
      var errs = feitas - certas - quase;
      var frase = feitas === 0 ? 'Você ainda não respondeu nenhuma questão deste quadro.' :
        (feitas < todos.length ? 'Você respondeu ' + feitas + ' de ' + todos.length + ': ' : 'Você respondeu as ' + todos.length + ': ') +
        certas + (certas === 1 ? ' certa' : ' certas') + (quase ? ', ' + quase + ' quase' : '') + ' e ' + errs + (errs === 1 ? ' errada.' : ' erradas.');
      bd.innerHTML = '<div class="trn-fim"><p><b>Fim do quadro.</b> ' + frase + '</p><div class="trn-row">' +
        (erradas.length ? '<button type="button" class="trn-b pri" data-f="err">Refazer as ' + erradas.length + ' que não acertei</button>' : '') +
        (feitas ? '<button type="button" class="trn-b" data-f="tudo">Refazer tudo</button>' : '<button type="button" class="trn-b pri" data-f="ini">Começar pela 1ª</button>') + '</div></div>';
      nav.querySelector('.trn-pos').textContent = 'Fim';
      nav.querySelector('[data-a="1"]').disabled = true;
      nav.querySelector('[data-a="-1"]').disabled = false;
      [].forEach.call(bd.querySelectorAll('[data-f]'), function (b) {
        b.onclick = function () {
          var f = b.getAttribute('data-f');
          if (f === 'err') lista = erradas;
          else { lista = todos; if (f === 'tudo') { todos.forEach(function (x) { delete mem[x.k]; }); grava(); placar(); } }
          i = 0; mostra(); cx.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
      });
      i = lista.length;
    }
    function mostra() {
      var x = lista[i], q = x.q, ult = mem[x.k];
      nav.querySelector('.trn-pos').textContent = (i + 1) + ' / ' + lista.length;
      nav.querySelector('[data-a="-1"]').disabled = i === 0;
      nav.querySelector('[data-a="1"]').disabled = false;
      var meta = '<div class="trn-meta"><span class="trn-src' + (BANCO[q.p] ? ' ban' : '') + '">' + esc((FONTE[q.p] || q.p) + ' · nº ' + q.n) + '</span>' +
        '<span class="trn-tp">' + esc(TIPO[q.t] || '') + '</span>' +
        (ult != null ? '<span class="trn-ult' + (ult === 1 ? ' ok' : '') + '">' + (ult === 1 ? 'você já acertou' : 'da última vez não acertou') + '</span>' : '') + '</div>';
      var corpo = '';
      if (q.t === 'mc') {
        corpo = (q.ok.length > 1 ? '<p class="trn-dica">Tem ' + q.ok.length + ' respostas certas: marque as ' + q.ok.length + '.</p>' : '') +
          '<div class="trn-ops" role="group" aria-label="Alternativas">' + q.o.map(function (o, k) {
            return '<button type="button" class="trn-op" data-k="' + k + '" aria-pressed="false"><span class="L">' + LET[k] + '</span><span lang="es">' + esc(o) + '</span></button>';
          }).join('') + '</div>';
      } else if (q.t === 'vf') {
        corpo = '<div class="trn-vf" role="group" aria-label="Verdadero o falso"><button type="button" class="trn-op" data-k="1"><span lang="es">Verdadero</span></button><button type="button" class="trn-op" data-k="0"><span lang="es">Falso</span></button></div>';
      } else {
        var N = pedidos(q.q);
        corpo = '<textarea class="trn-in" rows="2" lang="es" spellcheck="false" placeholder="' + (N ? 'Escreva os ' + N + ', por extenso, como na prova' : 'Escreva por extenso, como na prova') + '" aria-label="Sua resposta"></textarea>' +
          '<div class="trn-row"><button type="button" class="trn-b pri" data-c="1" disabled>Corrigir</button><button type="button" class="trn-b" data-c="0">Não sei · ver o gabarito</button></div>';
      }
      bd.innerHTML = meta + '<p class="trn-st" lang="es">' + esc(q.q) + '</p>' + corpo + '<div class="trn-fb" hidden aria-live="polite"></div>';
      var fb = bd.querySelector('.trn-fb');
      if (q.t === 'mc') {
        var ops = [].slice.call(bd.querySelectorAll('.trn-op')), marcadas = [];
        var abre = function () {
          var certo = q.ok.length === marcadas.length && marcadas.every(function (k) { return q.ok.indexOf(k) >= 0; });
          ops.forEach(function (b) {
            var k = +b.getAttribute('data-k'); b.disabled = true;
            if (q.ok.indexOf(k) >= 0) b.classList.add('ok'); else if (marcadas.indexOf(k) >= 0) b.classList.add('bad'); else b.classList.add('dim');
            if (q.w && q.w[k]) b.lastChild.insertAdjacentHTML('beforeend', '<span class="w" lang="pt"><b>' + (q.ok.indexOf(k) >= 0 ? 'Certa.' : 'Errada.') + '</b> ' + esc(q.w[k]) + '</span>');
          });
          var letras = q.ok.map(function (k) { return LET[k] + ')'; }).join(' e ');
          fb.hidden = false;
          fb.innerHTML = (certo ? '<p class="trn-ver ok">✓ Correto.</p>' : '<p class="trn-ver no">✗ Não foi dessa vez. ' + (q.ok.length > 1 ? 'As certas são ' : 'A certa é a ') + letras + '.</p>') + rodape(x);
          ligaIr(fb); nota(x.k, certo ? 1 : 0);
        };
        ops.forEach(function (b) {
          b.addEventListener('click', function () {
            var k = +b.getAttribute('data-k');
            if (q.ok.length > 1) {
              var p = marcadas.indexOf(k);
              if (p >= 0) marcadas.splice(p, 1); else marcadas.push(k);
              b.setAttribute('aria-pressed', String(p < 0));
              if (marcadas.length === q.ok.length) abre();
            } else { marcadas = [k]; abre(); }
          });
        });
      } else if (q.t === 'vf') {
        [].forEach.call(bd.querySelectorAll('.trn-op'), function (b) {
          b.addEventListener('click', function () {
            var k = +b.getAttribute('data-k'), certa = q.ok ? 1 : 0;
            [].forEach.call(bd.querySelectorAll('.trn-op'), function (o) {
              var j2 = +o.getAttribute('data-k'); o.disabled = true;
              if (j2 === certa) o.classList.add('ok'); else if (j2 === k) o.classList.add('bad');
            });
            fb.hidden = false;
            fb.innerHTML = '<p class="trn-ver ' + (k === certa ? 'ok">✓ Correto: é ' : 'no">✗ A afirmação é ') + (q.ok ? 'verdadeira' : 'falsa') + '.</p>' +
              (q.e ? '<p>' + esc(q.e) + '</p>' : '') + rodape(x);
            ligaIr(fb); nota(x.k, k === certa ? 1 : 0);
          });
        });
      } else {
        var ta = bd.querySelector('.trn-in'), bC = bd.querySelector('[data-c="1"]'), bN = bd.querySelector('[data-c="0"]');
        ta.addEventListener('input', function () { bC.disabled = !ta.value.trim(); });
        ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && ta.value.trim()) bC.click(); });
        var corrige = function (txt) {
          ta.readOnly = true; bC.disabled = true; bN.disabled = true;
          var r = txt ? confere(q, txt) : { nota: 0, falta: [], siglas: { dela: [], talvez: [] }, N: 0, escritos: 0 };
          var h = '';
          if (txt) {
            h += r.nota === 1 ? '<p class="trn-ver ok">✓ Bate com o gabarito dela.</p>' : r.nota === 0.5 ? '<p class="trn-ver mid">Quase: falta parte do gabarito.</p>' : '<p class="trn-ver no">✗ Ainda não é a resposta dela.</p>';
            if (r.falta.length) h += '<p class="trn-fal">' + (r.nota === 1 ? 'No gabarito ainda aparece: ' : 'Faltou: ') + r.falta.map(function (w) { return '<b lang="es">' + esc(w) + '</b>'; }).join(', ') + '.</p>';
            r.siglas.dela.forEach(function (s) { h += '<p class="trn-av">⚠️ <b>' + esc(s[0]) + '</b> é sigla: ela zera a resposta. Escreva <b lang="es">' + esc(s[1]) + '</b>.</p>'; });
            if (r.siglas.talvez.length) h += '<p class="trn-av">⚠️ <b>' + r.siglas.talvez.map(esc).join(', ') + '</b> ' + (r.siglas.talvez.length > 1 ? 'parecem siglas' : 'parece sigla') + '. Na prova ela não considera siglas: escreva por extenso.</p>';
            if (r.N && r.escritos && r.escritos !== r.N) h += '<p class="trn-av">⚠️ Ela pediu <b>' + r.N + '</b> e você escreveu <b>' + r.escritos + '</b>. "Cite ' + r.N + '" é exatamente ' + r.N + ', todos certos.</p>';
          }
          h += '<div class="trn-gab"><span>Gabarito dela</span><b lang="es">' + esc(q.a) + '</b></div>';
          if (q.e && !/^Resposta oficial\.?$/i.test(q.e.trim())) h += '<p><b>Por quê:</b> ' + esc(q.e) + '</p>';
          h += '<p class="trn-lab">Como foi? Ajuste se a conferência automática errou.</p><div class="trn-grade" role="group" aria-label="Como foi">' +
            [['0', 'Errei'], ['0.5', 'Quase'], ['1', 'Acertei']].map(function (g) { return '<button type="button" class="trn-b" data-g="' + g[0] + '" aria-pressed="' + (+g[0] === r.nota) + '">' + g[1] + '</button>'; }).join('') + '</div>' + rodape(x);
          fb.hidden = false; fb.innerHTML = h; ligaIr(fb); nota(x.k, r.nota);
          [].forEach.call(fb.querySelectorAll('[data-g]'), function (b) {
            b.onclick = function () {
              [].forEach.call(fb.querySelectorAll('[data-g]'), function (o) { o.setAttribute('aria-pressed', String(o === b)); });
              nota(x.k, +b.getAttribute('data-g'));
            };
          });
        };
        bC.addEventListener('click', function () { corrige(ta.value.trim()); });
        bN.addEventListener('click', function () { corrige(''); });
      }
    }
    placar(); mostra();
  });
})();
