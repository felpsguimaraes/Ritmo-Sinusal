/* sinusal. · Provas antigas, aulas gravadas e organogramas da 2ª parcial.
   Rota #/provas[/banco|originais|aulas|mapas] da aula Lesión celular. Montado por aulas/app.js
   (A.extra), depois que a pessoa entrou. Dados em p2/dados.js (window.SINUSAL_P2_DADOS). */
(function () {
  'use strict'
  var D = window.SINUSAL_P2_DADOS
  var BASE = 'p2/'
  var KEY = 'sinusal-lesion:p2'
  var LET = 'ABCDEFGHIJ'
  var POR_VEZ = 20

  var TEMAS = {
    nec: ['Necrosis', '#b3141c'], apo: ['Apoptosis', '#7a3fe0'], acu: ['Acumulación: lípidos y glucógeno', '#b45309'],
    c7: ['Proteínas, amiloide, calcio', '#a21caf'], pig: ['Pigmentos', '#7c4a1e'], inf: ['Inflamación aguda', '#0c8f8a'],
    cro: ['Fora do slide atual', '#64748b']
  }
  var GRUPOS_FONTE = [
    ['p2', 'P2 antigas', ['p2c', 'p2d', 'p2f1', 'p2f2', 'reg24', 'rec23']],
    ['par', 'Parciais e final', ['par1', 'p1c', 'par1r', 'final24']],
    ['banco', 'Bancos Robbins e PEF', ['robbins', 'pef']]
  ]
  // prova -> grupo de páginas no visualizador
  var PAG_DA_FONTE = { p2c: 0, p2d: 1, p2f1: 2, p2f2: 2, reg24: 3, rec23: 4, final24: 5, par1: 6, par1r: 7, p1c: 8 }

  // gravações (arquivos em p2/audio). tema null = ainda não identificado
  var AUDIOS = [
    { arq: 'grabacion-5.m4a', t: 'Nueva grabación 5', s: 3220, tema: null },
    { arq: 'grabacion-6.m4a', t: 'Nueva grabación 6', s: 3048, tema: null },
    { arq: 'plaza-city.m4a', t: 'Plaza City', s: 499, tema: null },
    { arq: 'plaza-city-2.m4a', t: 'Plaza City 2', s: 3390, tema: null },
    { arq: 'plaza-city-3.m4a', t: 'Plaza City 3', s: 2865, tema: null },
    { arq: 'plaza-city-4.m4a', t: 'Plaza City 4', s: 1378, tema: null },
    { arq: 'alto-parana.m4a', t: 'Departamento del Alto Paraná', s: 1405, tema: null }
  ]
  // PDF das provas, lido aqui mesmo com o mesmo pdf.js do leitor da aula (aulas/app.js)
  var PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/'
  var PDF_ARQ = BASE + 'provas-antigas-chamorro.pdf'
  var ZOOMS = [1, 1.5, 2, 3]
  var VIDEO = {
    id: '19FqmuZrIucxmY-0QrC5GTx-S5jJeAjy7',
    t: 'Clase repaso · Anatomía Patológica I',
    d: 'Dra. Eliana Chamorro · gravação da aula de 12/05/2026 (Google Drive)'
  }

  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var $ = function (s, r) { return (r || document).querySelector(s) }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) }
  function ler() { try { var v = JSON.parse(localStorage.getItem(KEY)); return v && typeof v === 'object' ? v : {} } catch (e) { return {} } }
  function gravar() { try { localStorage.setItem(KEY, JSON.stringify(st)) } catch (e) {} }
  var st = ler()
  st.r = st.r || {}            // respostas: id -> {k|g}
  st.f = st.f || { tema: '', fonte: '', sit: '' }
  st.vel = st.vel || 1
  st.pos = st.pos || {}        // áudio -> segundo em que parou

  var FONTE = {}
  D.fontes.forEach(function (f) { FONTE[f.id] = f })
  var INICIO = [], TOTAL_PAG = 0  // página do PDF em que cada prova começa (mesma ordem de D.paginas)
  D.paginas.forEach(function (g) { INICIO.push(TOTAL_PAG + 1); TOTAL_PAG += g.pages.length })
  D.qs.forEach(function (q) { q.id = q.p + '-' + q.n + (q.t === 'vf' ? 'v' : '') })
  // ids únicos mesmo se duas questões tiverem o mesmo número na mesma prova
  var vistos = {}
  D.qs.forEach(function (q) { var b = q.id, i = 2; while (vistos[q.id]) q.id = b + '-' + (i++); vistos[q.id] = 1 })

  function hms(s) { var m = Math.round(s / 60); return m >= 60 ? Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : m + ' min' }
  function nota(q) { var r = st.r[q.id]; return r ? r.g : null }  // 1 certo, 0.5 quase, 0 errado

  var view = null, parte = 'banco', mostrando = POR_VEZ

  function render(v, p) {
    fecharLeitor()
    view = v
    var alvo = p && p[0], antes = view && view.querySelector('.p2') ? parte : null
    parte = ['banco', 'originais', 'aulas', 'mapas'].indexOf(alvo) >= 0 ? alvo : 'banco'
    if (antes && antes !== parte) scrollTo(0, 0)
    var nPag = D.paginas.reduce(function (a, g) { return a + g.pages.length }, 0)
    var nOrg = D.orgs.reduce(function (a, g) { return a + g.h.length }, 0)
    view.innerHTML = '<div class="tr-wrap p2">' +
      '<span class="sx-tag">Anatomía Patológica I · 2ª parcial · Dra. Chamorro</span>' +
      '<h1 class="sx-h1">Provas <em>antigas.</em></h1>' +
      '<p class="p2-lead">As questões das provas dela, com o enunciado igual ao original e o porquê de cada alternativa. Também as folhas originais, a aula de repaso, as gravações e os organogramas da parcial.</p>' +
      '<div class="tr-seg" role="tablist" aria-label="Parte">' +
        aba('banco', 'Banco', D.qs.length + ' questões comentadas') +
        aba('originais', 'Provas originais', nPag + ' páginas e o PDF') +
        aba('aulas', 'Aulas gravadas', 'Vídeo e ' + AUDIOS.length + ' áudios') +
        aba('mapas', 'Organogramas', nOrg + ' mapas da parcial') +
      '</div>' +
      '<div id="p2-parte"></div>' +
      '</div>'
    $$('.p2 .tr-seg [role=tab]', view).forEach(function (b) {
      b.addEventListener('click', function () { location.hash = '#/provas/' + b.dataset.p })
    })
    if (parte === 'banco') banco()
    if (parte === 'originais') originais(p[1], p[2])
    if (parte === 'aulas') aulas()
    if (parte === 'mapas') mapas()
  }
  function aba(id, t, s) {
    return '<button type="button" role="tab" data-p="' + id + '" aria-selected="' + (parte === id) + '"><b>' + t + '</b><small>' + s + '</small></button>'
  }

  // ------------------------------------------------------------ banco
  function filtradas() {
    var f = st.f
    var grupo = GRUPOS_FONTE.filter(function (g) { return g[0] === f.fonte })[0]
    return D.qs.filter(function (q) {
      if (f.tema && q.tema !== f.tema) return false
      if (f.fonte) {
        if (grupo) { if (grupo[2].indexOf(q.p) < 0) return false } else if (q.p !== f.fonte) return false
      }
      var g = nota(q)
      if (f.sit === 'novas' && g != null) return false
      if (f.sit === 'erros' && !(g != null && g < 1)) return false
      return true
    })
  }
  function banco() {
    var box = $('#p2-parte')
    var cont = {}; D.qs.forEach(function (q) { cont[q.tema] = (cont[q.tema] || 0) + 1 })
    var temas = Object.keys(TEMAS).filter(function (k) { return cont[k] })
    var opF = '<option value="">Todas as provas e bancos</option>' +
      GRUPOS_FONTE.map(function (g) { return '<option value="' + g[0] + '">' + esc(g[1]) + '</option>' }).join('') +
      '<optgroup label="Uma prova">' + D.fontes.map(function (f) { return '<option value="' + f.id + '">' + esc(f.titulo) + ' (' + f.n + ')</option>' }).join('') + '</optgroup>'
    box.innerHTML =
      '<div class="p2-filtros sx-glass">' +
        '<div class="p2-fl" role="group" aria-label="Tema"><span class="lbl">Tema</span>' +
          '<button type="button" class="p2-chip" data-tema="">Todos <span class="c">' + D.qs.length + '</span></button>' +
          temas.map(function (k) { return '<button type="button" class="p2-chip" data-tema="' + k + '"><i style="background:' + TEMAS[k][1] + '"></i>' + esc(TEMAS[k][0]) + ' <span class="c">' + cont[k] + '</span></button>' }).join('') +
        '</div>' +
        '<div class="p2-fl"><label class="lbl" for="p2-fonte">Prova</label><select class="p2-sel" id="p2-fonte">' + opF + '</select></div>' +
        '<div class="p2-fl" role="group" aria-label="Situação"><span class="lbl">Mostrar</span>' +
          '<button type="button" class="p2-chip" data-sit="">Todas</button><button type="button" class="p2-chip" data-sit="novas">Não respondidas</button><button type="button" class="p2-chip" data-sit="erros">Errei ou quase</button>' +
        '</div>' +
        '<div class="p2-placar" id="p2-placar" aria-live="polite"></div>' +
      '</div>' +
      '<div id="p2-lista"></div>'
    $('#p2-fonte').value = st.f.fonte || ''
    $$('[data-tema]', box).forEach(function (b) { b.addEventListener('click', function () { st.f.tema = b.dataset.tema; gravar(); mostrando = POR_VEZ; lista() }) })
    $$('[data-sit]', box).forEach(function (b) { b.addEventListener('click', function () { st.f.sit = b.dataset.sit; gravar(); mostrando = POR_VEZ; lista() }) })
    $('#p2-fonte').addEventListener('change', function () { st.f.fonte = this.value; gravar(); mostrando = POR_VEZ; lista() })
    lista()
  }
  function placar() {
    var feitas = 0, pontos = 0
    D.qs.forEach(function (q) { var g = nota(q); if (g != null) { feitas++; pontos += g } })
    var el = $('#p2-placar'); if (!el) return
    el.innerHTML = '<span><b>' + feitas + '</b> de ' + D.qs.length + ' respondidas</span>' +
      (feitas ? '<span>Acerto <b>' + Math.round(pontos / feitas * 100) + '%</b></span>' : '') +
      (feitas ? '<button class="linkbtn" type="button" id="p2-zerar">Zerar respostas</button>' : '')
    var z = $('#p2-zerar'), armado = false
    if (z) z.addEventListener('click', function () {
      if (!armado) { armado = true; z.textContent = 'Toque de novo para confirmar'; setTimeout(function () { armado = false; if (z.isConnected) z.textContent = 'Zerar respostas' }, 4000); return }
      st.r = {}; gravar(); lista()
    })
  }
  function lista() {
    $$('[data-tema]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.tema === (st.f.tema || ''))) })
    $$('[data-sit]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.sit === (st.f.sit || ''))) })
    placar()
    var qs = filtradas(), box = $('#p2-lista')
    if (!qs.length) { box.innerHTML = '<p class="p2-vazio sx-glass">Nenhuma questão com esses filtros.</p>'; return }
    box.innerHTML = qs.slice(0, mostrando).map(cartao).join('') +
      (qs.length > mostrando ? '<div class="p2-mais"><button class="sx-btn" type="button" id="p2-mais">Mostrar mais ' + Math.min(POR_VEZ, qs.length - mostrando) + ' de ' + (qs.length - mostrando) + '</button></div>' : '')
    qs.slice(0, mostrando).forEach(function (q) { ligar(q) })
    var m = $('#p2-mais')
    if (m) m.addEventListener('click', function () { var de = mostrando; mostrando += POR_VEZ; lista(); var c = $$('.p2-q', box)[de]; if (c) c.querySelector('.ts-q').focus({ preventScroll: false }) })
  }
  function cartao(q) {
    var f = FONTE[q.p] || {}, tm = TEMAS[q.tema] || ['', '#999']
    var tipo = q.t === 'mc' ? '' : q.t === 'vf' ? 'Verdadero o falso' : q.t === 'cita' ? 'Cita' : 'Completa'
    var opts = ''
    if (q.t === 'mc') opts = '<div class="ts-opts" role="group" aria-label="Alternativas">' + q.o.map(function (o, k) { return '<button type="button" class="ts-opt" data-k="' + k + '"><span class="L">' + LET[k] + '</span><span lang="es">' + esc(o) + '</span></button>' }).join('') + '</div>'
    if (q.t === 'vf') opts = '<div class="ts-opts" role="group" aria-label="Verdadeiro ou falso"><button type="button" class="ts-opt" data-k="1"><span class="L">V</span><span lang="es">Verdadero</span></button><button type="button" class="ts-opt" data-k="0"><span class="L">F</span><span lang="es">Falso</span></button></div>'
    if (q.t === 'cita' || q.t === 'comp') opts = '<div class="ts-act" style="margin:0"><button class="sx-btn sx-small" type="button" data-ver="1">Ver resposta</button></div>'
    var res = nota(q)
    return '<article class="ts-card sx-glass p2-q" id="q-' + esc(q.id) + '"' + (res != null ? ' data-res="' + (res === 1 ? 'ok' : res > 0 ? 'mid' : 'bad') + '"' : '') + '>' +
      '<p class="ts-meta"><span>' + esc(f.titulo || q.p) + ' · questão ' + esc(q.n) + (tipo ? ' · ' + tipo : '') + '</span><span class="p2-tema"><i style="background:' + tm[1] + '"></i>' + esc(tm[0]) + '</span></p>' +
      '<h2 class="ts-q" tabindex="-1" lang="es">' + esc(q.q) + '</h2>' + opts +
      '<div class="ts-fb" hidden aria-live="polite"></div>' +
    '</article>'
  }
  function ligar(q) {
    var card = document.getElementById('q-' + q.id); if (!card) return
    var fb = $('.ts-fb', card)
    var r = st.r[q.id]
    function marcar(g) { card.dataset.res = g === 1 ? 'ok' : g > 0 ? 'mid' : 'bad'; placar() }
    function links() {
      var i = PAG_DA_FONTE[q.p]
      var f = FONTE[q.p] || {}
      return '<div class="p2-links">' + (i != null ? '<a href="#/provas/originais/' + i + '">Ver a prova original (pág. ' + esc(f.pags) + ' do PDF)</a>' : '<span class="ts-meta">Fonte: ' + esc(f.titulo) + ', págs. ' + esc(f.pags) + ' do PDF</span>') + '</div>'
    }
    function notaHtml() { return q.nt ? '<p class="ts-nt">' + esc(q.nt) + '</p>' : '' }
    if (q.t === 'mc') {
      var mostrar = function (k) {
        $$('.ts-opt', card).forEach(function (b) {
          var j = +b.dataset.k; b.disabled = true
          if (q.ok.indexOf(j) >= 0) b.classList.add('ok'); else if (j === k) b.classList.add('bad'); else b.classList.add('dim')
        })
        var certo = q.ok.indexOf(k) >= 0
        var letras = q.ok.map(function (j) { return LET[j] }).join(' e ')
        fb.hidden = false
        fb.innerHTML = (certo ? '<p class="ts-ver ok">Correto.</p>' : '<p class="ts-ver bad">Não foi dessa vez. ' + (q.ok.length > 1 ? 'As certas são ' : 'A certa é a letra ') + letras + '.</p>') +
          '<ol class="p2-why">' + q.o.map(function (o, j) {
            var ok = q.ok.indexOf(j) >= 0
            return '<li class="' + (ok ? 'ok' : '') + '"><span class="L" aria-hidden="true">' + LET[j] + '</span><span><b>' + (ok ? 'Certa' : 'Errada') + '.</b> ' + esc(q.w[j]) + '</span></li>'
          }).join('') + '</ol>' + notaHtml() + links()
      }
      $$('.ts-opt', card).forEach(function (b) {
        b.addEventListener('click', function () {
          if (st.r[q.id]) return
          var k = +b.dataset.k, g = q.ok.indexOf(k) >= 0 ? 1 : 0
          st.r[q.id] = { k: k, g: g }; gravar(); marcar(g); mostrar(k)
        })
      })
      if (r && r.k != null) mostrar(r.k)
    } else if (q.t === 'vf') {
      var mostrarVf = function (k) {
        var certa = q.ok ? 1 : 0
        $$('.ts-opt', card).forEach(function (b) {
          var j = +b.dataset.k; b.disabled = true
          if (j === certa) b.classList.add('ok'); else if (j === k) b.classList.add('bad')
        })
        fb.hidden = false
        fb.innerHTML = (k === certa ? '<p class="ts-ver ok">Correto: é ' + (q.ok ? 'verdadeira' : 'falsa') + '.</p>' : '<p class="ts-ver bad">A afirmação é ' + (q.ok ? 'verdadeira' : 'falsa') + '.</p>') +
          '<p class="ts-ex">' + esc(q.e) + '</p>' + notaHtml() + links()
      }
      $$('.ts-opt', card).forEach(function (b) {
        b.addEventListener('click', function () {
          if (st.r[q.id]) return
          var k = +b.dataset.k, g = k === (q.ok ? 1 : 0) ? 1 : 0
          st.r[q.id] = { k: k, g: g }; gravar(); marcar(g); mostrarVf(k)
        })
      })
      if (r && r.k != null) mostrarVf(r.k)
    } else {
      var btn = $('[data-ver]', card)
      var abrir = function () {
        btn.parentNode.hidden = true
        fb.hidden = false
        var g0 = st.r[q.id] ? st.r[q.id].g : null
        fb.innerHTML = '<p class="ts-ans" lang="es"><b>Resposta:</b> ' + esc(q.a) + '</p><p class="ts-ex">' + esc(q.e) + '</p>' + notaHtml() +
          '<p class="ts-lab" style="margin:2px 0 0">Como foi? Compare com o gabarito.</p>' +
          '<div class="grade" role="group" aria-label="Como foi"><button type="button" class="g0" data-g="0" aria-pressed="' + (g0 === 0) + '">Errei</button><button type="button" class="g1" data-g="0.5" aria-pressed="' + (g0 === 0.5) + '">Quase</button><button type="button" class="g2" data-g="1" aria-pressed="' + (g0 === 1) + '">Acertei</button></div>' + links()
        $$('.grade button', fb).forEach(function (b) {
          b.addEventListener('click', function () {
            var g = +b.dataset.g; st.r[q.id] = { g: g }; gravar(); marcar(g)
            $$('.grade button', fb).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)) })
          })
        })
      }
      btn.addEventListener('click', abrir)
      if (r) abrir()
    }
  }

  // ------------------------------------------------------------ provas originais
  var vg = 0, vp = 0
  function chipsProva() {
    return '<div class="p2-filtros sx-glass"><div class="p2-modo" role="group" aria-label="Como ver as provas">' +
        '<a href="#/provas/originais" data-m="fotos">Fotos das folhas</a><a href="#/provas/originais/pdf" data-m="pdf">Ler o PDF aqui</a>' +
      '</div><div class="p2-fl" role="group" aria-label="Prova">' +
        D.paginas.map(function (gr, i) { return '<button type="button" class="p2-chip" data-g="' + i + '">' + esc(gr.g) + ' <span class="c">' + gr.pages.length + '</span></button>' }).join('') +
      '</div></div>'
  }
  function originais(g, p) {
    if (g === 'pdf') return leitorPdf(p)
    vg = Math.min(Math.max(+g || 0, 0), D.paginas.length - 1); vp = Math.max(+p || 0, 0)
    var box = $('#p2-parte')
    box.innerHTML = chipsProva() +
      '<section class="p2-viewer sx-glass" aria-label="Páginas da prova">' +
        '<div class="p2-vbar"><span class="t" id="p2-vt"></span><span class="pg" id="p2-vpg" aria-live="polite"></span>' +
          '<button class="p2-ib" type="button" id="p2-ant" aria-label="Página anterior"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>' +
          '<button class="p2-ib" type="button" id="p2-prox" aria-label="Próxima página"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>' +
          '<button class="p2-ib" type="button" id="p2-zoom" aria-pressed="false" aria-label="Ampliar a página"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg></button>' +
        '</div>' +
        '<div class="p2-stage" id="p2-stage"><img id="p2-img" alt="" decoding="async"></div>' +
        '<div class="p2-thumbs" id="p2-thumbs"></div>' +
      '</section>' +
      '<p class="p2-dl"><a class="sx-btn sx-small sx-primary" href="#/provas/originais/pdf" id="p2-lerpdf">Ler o PDF aqui</a><a class="linkbtn" href="' + PDF_ARQ + '" download="Provas antigas Chamorro.pdf">Baixar o PDF (8,6 MB)</a><span>As 49 páginas, só com as provas, com marcadores por prova.</span></p>' +
      '<p class="p2-aviso">As marcas de resposta nas fotos são de alunos e às vezes estão erradas. O gabarito comentado está no Banco.</p>'
    $('[data-m=fotos]', box).setAttribute('aria-current', 'true')
    $$('[data-g]', box).forEach(function (b) { b.addEventListener('click', function () { vg = +b.dataset.g; vp = 0; pagina(true) }) })
    $('#p2-ant').addEventListener('click', function () { mover(-1) })
    $('#p2-prox').addEventListener('click', function () { mover(1) })
    $('#p2-zoom').addEventListener('click', zoom)
    $('#p2-img').addEventListener('click', zoom)
    pagina(true)
  }
  function zoom() {
    var s = $('#p2-stage'), on = !s.classList.contains('full')
    s.classList.toggle('full', on); $('#p2-zoom').setAttribute('aria-pressed', String(on))
  }
  function mover(d) {
    var gr = D.paginas[vg]
    if (vp + d >= 0 && vp + d < gr.pages.length) { vp += d; pagina(false); return }
    if (d > 0 && vg < D.paginas.length - 1) { vg++; vp = 0; pagina(true) } else if (d < 0 && vg > 0) { vg--; vp = D.paginas[vg].pages.length - 1; pagina(true) }
  }
  function pad(n) { return ('00' + n).slice(-3) }
  function pagina(trocouGrupo) {
    var gr = D.paginas[vg]; if (vp >= gr.pages.length) vp = 0
    var pg = gr.pages[vp]
    $$('[data-g]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.g === vg)) })
    $('#p2-vt').innerHTML = esc(gr.g) + '<small>' + esc(gr.sub || '') + '</small>'
    $('#p2-vpg').textContent = 'Página ' + (vp + 1) + ' de ' + gr.pages.length + ' · p. ' + pg.p + ' do PDF original'
    var img = $('#p2-img')
    img.width = pg.w; img.height = pg.h
    img.src = BASE + 'provas/p' + pad(pg.p) + '.jpg'
    img.alt = gr.g + ', página ' + (vp + 1) + ' de ' + gr.pages.length
    $('#p2-ant').disabled = vg === 0 && vp === 0
    $('#p2-prox').disabled = vg === D.paginas.length - 1 && vp === gr.pages.length - 1
    if (trocouGrupo) {
      $('#p2-thumbs').innerHTML = gr.pages.map(function (x, i) { return '<button type="button" data-i="' + i + '" aria-label="Página ' + (i + 1) + '"><img src="' + BASE + 'provas/t' + pad(x.p) + '.jpg" alt="" loading="lazy"><span>' + (i + 1) + '</span></button>' }).join('')
      $$('#p2-thumbs button').forEach(function (b) { b.addEventListener('click', function () { vp = +b.dataset.i; pagina(false) }) })
    }
    $$('#p2-thumbs button').forEach(function (b) { b.setAttribute('aria-current', String(+b.dataset.i === vp)) })
    $('#p2-stage').scrollTop = 0
    try { history.replaceState(null, '', '#/provas/originais/' + vg + '/' + vp) } catch (e) {}
    var noPdf = '#/provas/originais/pdf/' + (INICIO[vg] + vp)
    $$('[data-m=pdf], #p2-lerpdf').forEach(function (a) { a.setAttribute('href', noPdf) })
    // pré-carrega a próxima
    var nx = gr.pages[vp + 1]; if (nx) { var im = new Image(); im.src = BASE + 'provas/p' + pad(nx.p) + '.jpg' }
  }
  document.addEventListener('keydown', function (e) {
    if (!view || parte !== 'originais') return
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName || '')) return
    var L = leitor && document.contains(leitor.box) ? leitor : null
    if (L) {
      if (e.key === 'Escape' && $('#p2-pdf').classList.contains('full')) { e.preventDefault(); telaCheia(L, false) }
      if (e.key === 'ArrowRight') { e.preventDefault(); irPag(L, L.at + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); irPag(L, L.at - 1) }
      return
    }
    if (!$('#p2-stage')) return
    if (e.key === 'ArrowRight') { e.preventDefault(); mover(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1) }
  })

  // ------------------------------------------------------------ leitor do PDF das provas (pdf.js, como o PDF da aula)
  var pdfLibP = null, pdfDocP = null, leitor = null
  function carregar(src) {
    return new Promise(function (ok, erro) {
      var s = document.createElement('script'); s.src = src; s.async = true
      s.onload = function () { ok() }
      s.onerror = function () { s.parentNode && s.parentNode.removeChild(s); erro(new Error(src)) }
      document.head.appendChild(s)
    })
  }
  function pdfDoc() {
    if (!pdfLibP) pdfLibP = (window.pdfjsLib ? Promise.resolve() : carregar(PDFJS + 'pdf.min.js')).then(function () {
      var lib = window.pdfjsLib
      if (!lib.GlobalWorkerOptions.workerSrc) lib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js'
      return lib
    }).catch(function (e) { pdfLibP = null; throw e })
    if (!pdfDocP) pdfDocP = pdfLibP.then(function (lib) { return lib.getDocument({ url: PDF_ARQ }).promise }).catch(function (e) { pdfDocP = null; throw e })
    return pdfDocP
  }
  function ib(id, rotulo, svg) {
    return '<button class="p2-ib" type="button" id="' + id + '" aria-label="' + rotulo + '" title="' + rotulo + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + svg + '</svg></button>'
  }
  function grupoDaPag(n) { var g = 0; INICIO.forEach(function (ini, i) { if (n >= ini) g = i }); return g }
  function fecharLeitor() {
    var L = leitor; if (!L) return
    leitor = null
    if (L.io) L.io.disconnect()
    Object.keys(L.tarefas).forEach(function (n) { try { L.tarefas[n].cancel() } catch (e) {} })
    removeEventListener('resize', L.onResize)
    document.documentElement.classList.remove('p2-trava')
  }
  function leitorPdf(pag) {
    var box = $('#p2-parte'), dims = []
    D.paginas.forEach(function (g) { g.pages.forEach(function (x) { dims.push(x) }) })
    box.innerHTML = chipsProva() +
      '<section class="p2-viewer p2-pdf sx-glass" id="p2-pdf" aria-label="PDF das provas">' +
        '<div class="p2-vbar"><span class="t">Provas antigas · Dra. Chamorro<small id="p2-pgr">&nbsp;</small></span>' +
          '<span class="pg" id="p2-ppg" aria-live="polite">Abrindo o PDF…</span>' +
          ib('p2-pant', 'Página anterior', '<path d="m15 18-6-6 6-6"/>') +
          ib('p2-pprox', 'Próxima página', '<path d="m9 18 6-6-6-6"/>') +
          ib('p2-pmenos', 'Diminuir', '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/>') +
          ib('p2-pmais', 'Ampliar', '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/>') +
          ib('p2-pfull', 'Tela cheia', '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>') +
        '</div>' +
        '<div class="p2-pdf-pages" id="p2-pp" tabindex="0" aria-label="Páginas do PDF">' +
          dims.map(function (x, i) { return '<div class="p2-pp" data-n="' + (i + 1) + '" style="aspect-ratio:' + x.w + ' / ' + x.h + '" role="img" aria-label="Página ' + (i + 1) + ' de ' + dims.length + '"></div>' }).join('') +
        '</div>' +
      '</section>' +
      '<p class="p2-dl"><a class="linkbtn" href="' + PDF_ARQ + '" download="Provas antigas Chamorro.pdf">Baixar o PDF (8,6 MB)</a><span>Role dentro do quadro para passar as páginas. As setas do teclado também passam.</span></p>' +
      '<p class="p2-aviso">As marcas de resposta nas folhas são de alunos e às vezes estão erradas. O gabarito comentado está no Banco.</p>'
    $('[data-m=pdf]', box).setAttribute('aria-current', 'true')
    var pp = $('#p2-pp')
    var L = leitor = { box: pp, at: 0, z: ZOOMS.indexOf(st.pz) >= 0 ? st.pz : 1, ver: 1, feitos: {}, tarefas: {}, pdf: null, io: null, larg: 0 }
    $$('[data-g]', box).forEach(function (b) { b.addEventListener('click', function () { irPag(L, INICIO[+b.dataset.g]) }) })
    $('#p2-pant').addEventListener('click', function () { irPag(L, L.at - 1) })
    $('#p2-pprox').addEventListener('click', function () { irPag(L, L.at + 1) })
    $('#p2-pmenos').addEventListener('click', function () { zoomPdf(L, -1) })
    $('#p2-pmais').addEventListener('click', function () { zoomPdf(L, 1) })
    $('#p2-pfull').addEventListener('click', function () { telaCheia(L) })
    var agendado = false
    pp.addEventListener('scroll', function () {
      if (agendado) return
      agendado = true
      requestAnimationFrame(function () { agendado = false; if (leitor === L) atual(L) })
    }, { passive: true })
    var t = 0
    L.onResize = function () { clearTimeout(t); t = setTimeout(function () { if (leitor === L && Math.abs(pp.clientWidth - L.larg) > 40) redesenhar(L) }, 200) }
    addEventListener('resize', L.onResize)
    aplicarZoom(L)
    irPag(L, +pag || 1)
    pdfDoc().then(function (pdf) {
      if (leitor !== L) return
      L.pdf = pdf
      redesenhar(L)
    }).catch(function () {
      if (leitor !== L) return
      $('#p2-ppg').textContent = 'Não abriu'
      pp.innerHTML = '<div class="p2-perr"><p class="sx-msg sx-erro">Não foi possível abrir o PDF agora. Verifique a conexão.</p>' +
        '<button class="sx-btn sx-small" type="button" id="p2-ptentar">Tentar de novo</button>' +
        '<a class="linkbtn" href="' + PDF_ARQ + '" target="_blank" rel="noopener">Abrir o PDF numa aba nova</a></div>'
      $('#p2-ptentar').addEventListener('click', function () { var n = L.at; fecharLeitor(); leitorPdf(n) })
    })
  }
  function redesenhar(L) {
    L.ver++; L.larg = L.box.clientWidth
    if (!L.pdf) return
    if (L.io) L.io.disconnect()
    // desenha só as páginas perto da vista e libera as que ficaram longe, para o celular não ficar sem memória
    L.io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var n = +e.target.dataset.n
        if (e.isIntersecting) desenhar(L, n, e.target)
        else if (L.feitos[n]) {
          L.feitos[n] = 0
          if (L.tarefas[n]) { try { L.tarefas[n].cancel() } catch (x) {} delete L.tarefas[n] }
          e.target.innerHTML = ''; e.target.classList.remove('ok')
        }
      })
    }, { root: L.box, rootMargin: '1200px 0px' })
    $$('.p2-pp', L.box).forEach(function (el) { L.io.observe(el) })
  }
  function desenhar(L, n, el) {
    var ver = L.ver
    if (!L.pdf || L.feitos[n] === ver) return
    L.feitos[n] = ver
    L.pdf.getPage(n).then(function (pg) {
      if (leitor !== L || L.feitos[n] !== ver) return
      var v1 = pg.getViewport({ scale: 1 })
      var k = (el.clientWidth || L.box.clientWidth) * Math.min(window.devicePixelRatio || 1, 2) / v1.width
      var teto = Math.sqrt(6e6 / (v1.width * v1.height)); if (k > teto) k = teto
      var vp = pg.getViewport({ scale: k })
      var cv = document.createElement('canvas'); cv.width = Math.floor(vp.width); cv.height = Math.floor(vp.height)
      if (L.tarefas[n]) { try { L.tarefas[n].cancel() } catch (x) {} }
      var tarefa = L.tarefas[n] = pg.render({ canvasContext: cv.getContext('2d'), viewport: vp })
      return tarefa.promise.then(function () {
        if (L.tarefas[n] === tarefa) delete L.tarefas[n]
        if (leitor !== L || L.feitos[n] !== ver) return
        el.style.aspectRatio = v1.width + ' / ' + v1.height
        el.innerHTML = ''; el.appendChild(cv); el.classList.add('ok')
      })
    }).catch(function () { if (L.feitos[n] === ver) L.feitos[n] = 0 })
  }
  function atual(L) {
    var lim = L.box.scrollTop + L.box.clientHeight * 0.35, els = L.box.children, at = els.length
    for (var j = 0; j < els.length; j++) { if (els[j].offsetTop + els[j].offsetHeight > lim) { at = j + 1; break } }
    marcarPag(L, at)
  }
  function marcarPag(L, at) {
    if (at === L.at || !$('#p2-ppg')) return
    L.at = at
    var g = grupoDaPag(at), gr = D.paginas[g], dentro = at - INICIO[g]
    $('#p2-ppg').textContent = 'Página ' + at + ' de ' + TOTAL_PAG
    $('#p2-pgr').textContent = gr.g + ' · folha ' + (dentro + 1) + ' de ' + gr.pages.length
    $$('[data-g]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.g === g)) })
    $('#p2-pant').disabled = at <= 1
    $('#p2-pprox').disabled = at >= TOTAL_PAG
    var f = $('[data-m=fotos]'); if (f) f.setAttribute('href', '#/provas/originais/' + g + '/' + dentro)
    try { history.replaceState(null, '', '#/provas/originais/pdf/' + at) } catch (e) {}
  }
  function irPag(L, n) {
    n = Math.min(Math.max(n | 0, 1), TOTAL_PAG)
    var el = L.box.children[n - 1]; if (!el) return
    L.box.scrollTop = el.offsetTop - 12
    marcarPag(L, n)
  }
  function aplicarZoom(L) {
    L.box.style.setProperty('--z', String(L.z))
    L.box.classList.toggle('zoom', L.z > 1)
    $('#p2-pmenos').disabled = L.z === ZOOMS[0]
    $('#p2-pmais').disabled = L.z === ZOOMS[ZOOMS.length - 1]
  }
  function zoomPdf(L, d) {
    var i = ZOOMS.indexOf(L.z) + d; if (i < 0 || i >= ZOOMS.length) return
    var b = L.box, el = b.children[L.at - 1]
    var fy = el ? (b.scrollTop - el.offsetTop) / el.offsetHeight : 0
    var fx = (b.scrollLeft + b.clientWidth / 2) / b.scrollWidth
    L.z = ZOOMS[i]; st.pz = L.z; gravar()
    aplicarZoom(L)
    if (el) b.scrollTop = el.offsetTop + fy * el.offsetHeight
    b.scrollLeft = fx * b.scrollWidth - b.clientWidth / 2
    redesenhar(L)
  }
  function telaCheia(L, on) {
    var s = $('#p2-pdf'), at = L.at
    if (on == null) on = !s.classList.contains('full')
    s.classList.toggle('full', on)
    document.documentElement.classList.toggle('p2-trava', on)
    var b = $('#p2-pfull'); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Sair da tela cheia' : 'Tela cheia'); b.title = b.getAttribute('aria-label')
    b.querySelector('svg').innerHTML = on ? '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>' : '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'
    L.at = 0; irPag(L, at)
    redesenhar(L)
    if (on) L.box.focus({ preventScroll: true })
  }
  addEventListener('hashchange', function () { if (!/^#\/provas\/originais\/pdf/.test(location.hash)) fecharLeitor() })

  // ------------------------------------------------------------ aulas gravadas
  function aulas() {
    var box = $('#p2-parte')
    var porTema = {}, semTema = []
    AUDIOS.forEach(function (a) { if (a.tema && TEMAS[a.tema]) (porTema[a.tema] = porTema[a.tema] || []).push(a); else semTema.push(a) })
    var bloco = function (lst) { return '<div class="p2-aud">' + lst.map(function (a) {
      return '<div class="p2-a sx-glass" data-arq="' + esc(a.arq) + '"><div class="top"><span class="t">' + esc(a.t) + '</span><span class="d">' + hms(a.s) + '<span class="onde"></span></span></div>' +
        '<audio controls preload="metadata" src="' + BASE + 'audio/' + a.arq + '"></audio>' +
        '<div class="p2-ctl"><div class="p2-vel" role="group" aria-label="Pular">' +
          '<button type="button" data-s="-15" aria-label="Voltar 15 segundos">−15 s</button><button type="button" data-s="15" aria-label="Avançar 15 segundos">+15 s</button></div>' +
        '<div class="p2-vel" role="group" aria-label="Velocidade">' + [1, 1.25, 1.5, 2].map(function (v) { return '<button type="button" data-v="' + v + '" aria-pressed="' + (st.vel === v) + '">' + String(v).replace('.', ',') + '×</button>' }).join('') + '</div></div></div>'
    }).join('') + '</div>' }
    box.innerHTML =
      '<section class="p2-sec"><h2 class="sx-h2">Clase repaso</h2><p>A aula de revisão da professora para a parcial.</p>' +
        '<div class="p2-video sx-glass"><span class="t">' + esc(VIDEO.t) + '<small>' + esc(VIDEO.d) + '</small></span>' +
          '<div class="p2-frame"><iframe src="https://drive.google.com/file/d/' + VIDEO.id + '/preview" title="' + esc(VIDEO.t) + '" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe></div>' +
          '<div class="p2-links"><a href="https://drive.google.com/file/d/' + VIDEO.id + '/view" target="_blank" rel="noopener">Abrir no Google Drive</a></div>' +
        '</div></section>' +
      Object.keys(TEMAS).filter(function (k) { return porTema[k] }).map(function (k) {
        return '<section class="p2-sec"><h2 class="sx-h2">' + esc(TEMAS[k][0]) + '</h2>' + bloco(porTema[k]) + '</section>'
      }).join('') +
      (semTema.length ? '<section class="p2-sec"><h2 class="sx-h2">Gravações das aulas</h2><p>As ' + semTema.length + ' gravações da parcial. Toque no play para ouvir aqui mesmo; a velocidade escolhida vale para todas.</p>' + bloco(semTema) + '</section>' : '')
    $$('.p2-a', box).forEach(function (c) {
      var au = $('audio', c), arq = c.dataset.arq, onde = $('.onde', c), salvo = 0
      var mostrarOnde = function () { var s = st.pos[arq]; onde.textContent = s > 30 ? ' · parou em ' + hms(s) : '' }
      mostrarOnde()
      au.addEventListener('loadedmetadata', function () {
        var s = st.pos[arq]
        if (s > 10 && au.currentTime < 1 && (!au.duration || s < au.duration - 5)) au.currentTime = s
      })
      au.addEventListener('play', function () {
        au.playbackRate = st.vel
        $$('.p2-a audio', box).forEach(function (o) { if (o !== au && !o.paused) o.pause() })
      })
      // guarda onde parou, para continuar dali na próxima vez
      au.addEventListener('timeupdate', function () {
        if (Math.abs(au.currentTime - salvo) < 5) return
        salvo = au.currentTime; st.pos[arq] = Math.floor(salvo); gravar(); mostrarOnde()
      })
      au.addEventListener('pause', function () { if (au.currentTime > 0) { st.pos[arq] = Math.floor(au.currentTime); gravar(); mostrarOnde() } })
      au.addEventListener('ended', function () { delete st.pos[arq]; gravar(); mostrarOnde() })
      $$('[data-s]', c).forEach(function (b) {
        b.addEventListener('click', function () {
          var alvo = Math.max(0, (au.currentTime || st.pos[arq] || 0) + +b.dataset.s)
          if (au.duration) alvo = Math.min(alvo, au.duration - 1)
          au.currentTime = alvo
          if (au.paused) { st.pos[arq] = Math.floor(alvo); gravar(); mostrarOnde() }
        })
      })
      $$('[data-v]', c).forEach(function (b) {
        b.addEventListener('click', function () {
          st.vel = +b.dataset.v; gravar()
          $$('.p2-a audio', box).forEach(function (o) { o.playbackRate = st.vel })
          $$('[data-v]', box).forEach(function (x) { x.setAttribute('aria-pressed', String(+x.dataset.v === st.vel)) })
        })
      })
    })
  }

  // ------------------------------------------------------------ organogramas
  function mapas() {
    var box = $('#p2-parte')
    box.innerHTML = '<div class="p2-orgs">' + D.orgs.map(function (g) {
      return '<h3 class="sx-h2" style="font-size:22px">' + esc(g.g) + '</h3>' + g.h.map(function (h) { return '<div class="p2-org">' + h + '</div>' }).join('')
    }).join('') + '</div>'
  }

  window.SINUSAL_EXTRA = { render: render }
})()
