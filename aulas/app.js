/* sinusal. · aulas: entrada com conta, escolha 3D ou PDF, leitor de PDF e treino. Serve para todas as aulas;
   cada pasta define window.SINUSAL_AULA antes de carregar este arquivo. */
(function () {
  'use strict'
  var A = window.SINUSAL_AULA || {}
  var AULA = A.id || 'necrose'
  var TITULO = A.titulo || 'Muerte celular y necrosis'
  var IMG = function (n) { return 'https://raw.githubusercontent.com/felpsguimaraes/Ritmo-Sinusal/main/aulas/' + AULA + '/img/' + n + '.png' }
  var PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/'
  var $ = function (s, r) { return (r || document).querySelector(s) }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) }
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('sinusal-' + AULA + ':' + k); return v == null ? d : JSON.parse(v) } catch (e) { return d } },
    set: function (k, v) { try { localStorage.setItem('sinusal-' + AULA + ':' + k, JSON.stringify(v)) } catch (e) {} },
    del: function (k) { try { localStorage.removeItem('sinusal-' + AULA + ':' + k) } catch (e) {} }
  }
  var sess = {
    get: function (k) { try { return JSON.parse(sessionStorage.getItem('sinusal-' + AULA + ':' + k)) } catch (e) { return null } },
    set: function (k, v) { try { sessionStorage.setItem('sinusal-' + AULA + ':' + k, JSON.stringify(v)) } catch (e) {} },
    del: function (k) { try { sessionStorage.removeItem('sinusal-' + AULA + ':' + k) } catch (e) {} }
  }

  var gate = $('#sx-gate'), app = $('#sx-app'), view = $('#sx-view'), msg = $('#sx-msg')
  function say(t, erro) { msg.textContent = t || ''; msg.classList.toggle('sx-erro', !!erro); msg.classList.remove('sx-ok') }
  function sayOk(t) { say(t); msg.classList.add('sx-ok') }
  function sayLoading(t) { msg.innerHTML = '<span class="sx-spin" style="display:inline-block;vertical-align:-3px;margin-right:8px"></span>'; msg.appendChild(document.createTextNode(t)); msg.classList.remove('sx-erro', 'sx-ok') }

  var cfg = window.SINUSAL_FIREBASE || {}
  if (!window.firebase || !cfg.apiKey) { say('A aula ainda está sendo configurada. Volte em instantes.', true); return }
  firebase.initializeApp(cfg)
  var auth = firebase.auth(), db = firebase.firestore(), FV = firebase.firestore.FieldValue
  auth.languageCode = 'pt'
  var google = new firebase.auth.GoogleAuthProvider(); google.setCustomParameters({ prompt: 'select_account' })
  var DONO = String(window.SINUSAL_DONO || '').toLowerCase()
  var montada = false, entrou = false, ocupado = false, perfilRef = null, perfil = null, usuario = null, perfilAntigo = null

  function aparelho() { return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'celular' : 'computador' }
  function soDigitos(t) { return String(t || '').replace(/\D/g, '') }
  function ehDono(u) { return !!(u && u.email && u.email.toLowerCase() === DONO && u.emailVerified) }

  // ---------------- telas da entrada: entrar, criar conta, completar dados, esqueci a senha ----------------
  var fDados = $('#f-dados'), gBtn = $('#sx-google'), ou = $('#sx-ou'), info = $('#dados-info')
  var modo = ''
  function tela(m, aviso, erro) {
    modo = m === 'migrar' || m === 'completar' ? m : 'entrar'
    gate.hidden = false; app.hidden = true
    fDados.hidden = modo === 'entrar'
    info.hidden = !(modo === 'migrar' || modo === 'completar')
    if (modo === 'migrar') info.textContent = 'Seus dados e seu progresso continuam. Entre com a sua conta Google para salvar tudo nela.'
    if (modo === 'completar') {
      info.innerHTML = 'Falta pouco: complete seus dados para liberar a aula. Você entrou como <b></b>. <button type="button" class="sx-link" id="sx-trocar">Usar outra conta</button>'
      $('b', info).textContent = (auth.currentUser && auth.currentUser.email) || 'sua conta'
      $('#sx-trocar').addEventListener('click', sair)
    }
    $('#dados-ok').textContent = 'Salvar e entrar'
    $('#dados-ok').hidden = modo === 'migrar'
    gBtn.hidden = modo === 'completar'
    ou.hidden = true
    gBtn.textContent = modo === 'migrar' ? 'Usar minha conta Google' : 'Entrar com Google'
    $$('[aria-invalid]', gate).forEach(function (n) { n.removeAttribute('aria-invalid') })
    $$('button[type=submit]', gate).forEach(function (b) { b.disabled = false })
    gBtn.disabled = false
    say(aviso || '', !!erro)
  }
  function ocupar(t) { ocupado = true; $$('button[type=submit]', gate).forEach(function (b) { b.disabled = true }); gBtn.disabled = true; sayLoading(t) }
  function liberar() { ocupado = false; $$('button[type=submit]', gate).forEach(function (b) { b.disabled = false }); gBtn.disabled = false }
  function preencher(p) {
    p = p || {}
    if (p.nome != null) $('#sx-nome').value = p.nome
    $$('input[name="turma"]', fDados).forEach(function (r) { r.checked = r.value === p.turma })
    if (p.whatsapp) $('#sx-whats').value = '+' + p.whatsapp
  }
  function sair() { auth.signOut().then(function () { sess.del('modo'); location.hash = ''; location.reload() }) }
  function bloqueado() { app.hidden = true; gate.hidden = false; fDados.hidden = gBtn.hidden = ou.hidden = true; say('O seu acesso foi bloqueado. Fale com quem te enviou o link.', true) }
  function erroCampo(id, texto) { var el = document.getElementById(id); if (el) { el.setAttribute('aria-invalid', 'true'); el.focus() } say(texto, true) }
  var ERROS = {
    'auth/invalid-email': 'Confira o e-mail: parece incompleto.',
    'auth/missing-email': 'Escreva o seu e-mail.',
    'auth/email-already-in-use': 'Este e-mail já tem conta no sinusal. Use Entrar.',
    'auth/credential-already-in-use': 'Esta conta já existe. Use Entrar.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/missing-password': 'Escreva a sua senha.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/invalid-login-credentials': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas seguidas. Espere alguns minutos ou use Esqueci minha senha.',
    'auth/network-request-failed': 'Sem conexão com a internet. Tente de novo.',
    'auth/operation-not-allowed': 'Esse jeito de entrar ainda não foi ativado. Tente com o Google.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'whats-ocupado': 'Este WhatsApp já tem uma conta no sinusal. Entre com o e-mail dessa conta; se esqueceu a senha, use Esqueci minha senha.',
    'permission-denied': 'O seu acesso foi bloqueado. Fale com quem te enviou o link.'
  }
  function erroAuth(e) {
    liberar()
    var c = e && e.code
    if (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') { say(''); return }
    if (c === 'auth/email-already-in-use' || c === 'auth/credential-already-in-use') { tela('entrar', ERROS[c], true); return }
    if (c === 'whats-ocupado' && modo !== 'completar') { tela('entrar', ERROS[c], true); return }
    say(ERROS[c] || 'Não foi possível concluir agora. Tente de novo.', true)
  }

  $$('.sx-olho').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = document.getElementById(b.getAttribute('aria-controls')), ver = i.type === 'password'
      i.type = ver ? 'text' : 'password'; b.textContent = ver ? 'Ocultar' : 'Mostrar'; b.setAttribute('aria-pressed', String(ver))
    })
  })

  // quem já tem conta neste aparelho entra direto
  auth.onAuthStateChanged(function (user) {
    if (montada || entrou || ocupado) return
    if (!user) { tela('entrar'); return }
    verificar(user)
  })
  auth.getRedirectResult().catch(function (e) { if (e && e.code === 'auth/credential-already-in-use' && e.credential) auth.signInWithCredential(e.credential); else if (e && e.code) erroAuth(e) })

  function verificar(user) {
    usuario = user
    perfilRef = db.doc('perfis/' + user.uid)
    sayLoading('Entrando…')
    return perfilRef.get().then(function (s) {
      if (user.isAnonymous) {
        // cadastro antigo, preso a este aparelho: pede e-mail e senha e mantém tudo
        if (s.exists) { perfilAntigo = s.data(); preencher(perfilAntigo); tela('migrar'); return }
        return auth.signOut()
      }
      if (!s.exists) {
        if (ehDono(user)) { perfil = { nome: user.displayName || 'Felipe', turma: '', dono: true }; entrar(user); return }
        preencher({ nome: user.displayName || '', email: user.email || '' }); tela('completar'); return
      }
      perfil = s.data()
      return db.doc('whats/' + perfil.whatsapp).get().then(function (w) {
        if (w.exists && w.data().uid === user.uid) { entrar(user); return }
        if (w.exists) { preencher(perfil); tela('completar', 'Esse WhatsApp já está em outra conta. Entre com ela ou escreva outro número.', true); return }
        // cadastro de antes da conta: reserva o WhatsApp agora
        var b = db.batch()
        b.set(w.ref, { uid: user.uid, em: FV.serverTimestamp() })
        var up = { nome: perfil.nome }; if (!perfil.email && user.email) up.email = user.email
        b.set(perfilRef, up, { merge: true })
        return b.commit().then(function () { entrar(user) })
      })
    }).catch(function (e) {
      if (e && e.code === 'permission-denied') { bloqueado(); return }
      tela('entrar', 'Não foi possível entrar agora. Verifique a conexão e tente de novo.', true)
    })
  }

  // reserva o WhatsApp (1 conta por número) e grava o cadastro, juntos
  function salvarPerfil(user, dados, junta) {
    var wref = db.doc('whats/' + dados.whatsapp)
    perfilRef = db.doc('perfis/' + user.uid)
    return wref.get().then(function (w) {
      if (w.exists && w.data().uid !== user.uid) throw { code: 'whats-ocupado' }
      var b = db.batch()
      if (!w.exists) b.set(wref, { uid: user.uid, em: FV.serverTimestamp() })
      var p = { nome: dados.nome, turma: dados.turma, whatsapp: dados.whatsapp }
      if (dados.email) p.email = dados.email
      if (!junta) { p.primeiro_acesso = FV.serverTimestamp(); p.temas = {} }
      b.set(perfilRef, p, { merge: !!junta })
      return b.commit()
    })
  }

  function lerDados(semConta) {
    $$('[aria-invalid]', fDados).forEach(function (n) { n.removeAttribute('aria-invalid') })
    var d = { nome: $('#sx-nome').value.replace(/\s+/g, ' ').trim(), whatsapp: soDigitos($('#sx-whats').value) }
    var marcada = fDados.querySelector('input[name="turma"]:checked')
    if (d.nome.length < 3 || d.nome.indexOf(' ') < 0) { erroCampo('sx-nome', 'Escreva o seu nome e sobrenome.'); return null }
    if (!marcada) { say('Escolha a sua turma (A a G).', true); fDados.querySelector('input[name="turma"]').focus(); return null }
    d.turma = marcada.value
    if (d.whatsapp.length < 8 || d.whatsapp.length > 15) { erroCampo('sx-whats', 'Confira o WhatsApp: use o código do país e o número completo.'); return null }
    return d
  }

  fDados.addEventListener('submit', function (ev) {
    ev.preventDefault()
    var d = lerDados(); if (!d) return
    ocupar('Salvando…')
    var u0 = auth.currentUser
    d.email = (u0 && u0.email) || ''
    var passo = Promise.resolve({ user: u0, junta: !!perfil })
    passo.then(function (x) {
      return salvarPerfil(x.user, d, x.junta).then(function () { return x }, function (err) {
        if (x.novo) return x.user.delete().catch(function () {}).then(function () { throw err })
        throw err
      })
    }).then(function (x) {
      liberar()
      perfil = Object.assign({}, perfilAntigo || perfil || {}, { nome: d.nome, turma: d.turma, whatsapp: d.whatsapp })
      entrar(x.user)
    }).catch(erroAuth)
  })

  gBtn.addEventListener('click', function () {
    var cur = auth.currentUser, migrando = modo === 'migrar' && cur && cur.isAnonymous
    var d = null
    if (migrando) { d = lerDados(true); if (!d) return }
    ocupar('Abrindo o Google…')
    var p = migrando ? cur.linkWithPopup(google) : auth.signInWithPopup(google)
    p.then(function (r) {
      if (migrando) { d.email = r.user.email || ''; return r.user.getIdToken(true).then(function () { return salvarPerfil(r.user, d, true) }).then(function () { liberar(); perfil = Object.assign({}, perfilAntigo, d); delete perfil.senha; entrar(r.user) }) }
      liberar(); return verificar(r.user)
    }).catch(function (e) {
      if (e && e.code === 'auth/credential-already-in-use' && e.credential) return auth.signInWithCredential(e.credential).then(function (r) { liberar(); verificar(r.user) }).catch(erroAuth)
      if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) return (migrando ? cur.linkWithRedirect(google) : auth.signInWithRedirect(google))
      erroAuth(e)
    })
  })

  // ---------------- depois da entrada ----------------
  function entrar(user) {
    if (entrou) return
    entrou = true; usuario = user
    if (!perfil || !perfil.dono) registrar(user)
    $('#sx-quem').textContent = perfil && perfil.nome ? perfil.nome + (perfil.turma ? ' · turma ' + perfil.turma : '') : ''
    addEventListener('hashchange', rota)
    rota()
  }
  $('#sx-sair').addEventListener('click', sair)

  // conta a entrada (uma vez por visita) e cria um registro com data e aparelho
  function registrar(user) {
    perfilRef.set({ ultimo_acesso: FV.serverTimestamp(), acessos: FV.increment(1) }, { merge: true }).catch(function () {})
    db.collection('acessos').add({ uid: user.uid, aula: AULA, em: FV.serverTimestamp(), aparelho: aparelho() }).catch(function () {})
  }
  var modosMarcados = {}
  function marcarModo(v) {
    if (modosMarcados[v] || !perfilRef || (perfil && perfil.dono)) return
    modosMarcados[v] = true
    var t = {}; t['m' + v + '-' + AULA] = true
    perfilRef.set({ temas: t }, { merge: true }).catch(function () {})
  }

  // rotas: #/inicio, #/3d[/c7], #/pdf[/material/14], #/treino[/dia|simulado|temas|erros|tarjetas]; #c7 = aula 3D naquele tema
  function lerRota() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ''))
    if (!h || h === '/') return { v: sess.get('modo') === '3d' ? '3d' : (A.apostila ? 'apostila' : 'inicio'), p: [] }
    if (h.charAt(0) !== '/') return { v: '3d', p: [h] }
    var p = h.slice(1).split('/')
    var v = ['inicio', '3d', 'pdf', 'treino', 'apostila'].indexOf(p[0]) >= 0 ? p[0] : 'inicio'
    return { v: v, p: p.slice(1) }
  }
  var vistaAtual = ''
  function rota() {
    if (montada) return
    var r = lerRota()
    if (r.v === '3d') { abrir3d(r.p[0]); return }
    sess.del('modo')
    gate.hidden = true; app.hidden = false
    document.documentElement.style.setProperty('--sx-bar-h', $('#sx-bar').offsetHeight + 'px')
    $$('.sx-tabs a').forEach(function (a) { if (a.dataset.v === r.v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current') })
    var mudou = vistaAtual !== r.v
    vistaAtual = r.v
    if (r.v !== 'pdf') pdfFechar()
    if (r.v === 'inicio') { hub(); document.title = TITULO + ' · sinusal.' }
    if (r.v === 'pdf') { marcarModo('pdf'); pdfAbrir(r.p[0], +r.p[1] || 0); document.title = 'PDF · ' + TITULO + ' · sinusal.' }
    if (r.v === 'treino') { marcarModo('treino'); treino(r.p[0] || ''); document.title = 'Treino · ' + TITULO + ' · sinusal.' }
    if (r.v === 'apostila') { marcarModo('apostila'); apostilaAbrir(); document.title = 'Apostila · ' + TITULO + ' · sinusal.' }
    if (mudou && !(r.v === 'pdf' && r.p[1])) scrollTo(0, 0)
  }
  function ir(h) { if (location.hash === h) rota(); else location.hash = h }

  // ---------------- apostila: HTML cifrado (AES-GCM) no GitHub; chave só para quem entrou ----------------
  function apostilaAbrir() {
    var cfg = A.apostila
    view.innerHTML = '<div class="sx-wrap"><p class="sx-lead" id="apos-msg">Abrindo a apostila…</p></div>'
    if (!cfg) { $('#apos-msg').textContent = 'A apostila ainda não está disponível.'; return }
    function b64bytes(b64) { var bin = atob(b64), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }
    Promise.all([
      db.doc('aulas/' + cfg.doc).get().then(function (snap) { if (!snap.exists) throw { code: 'sem-chave' }; return snap.data().chave }),
      fetch(cfg.arq, { cache: 'no-store' }).then(function (r) { if (!r.ok) throw { code: 'sem-arquivo' }; return r.arrayBuffer() })
    ]).then(function (r) {
      return crypto.subtle.importKey('raw', b64bytes(r[0]), 'AES-GCM', false, ['decrypt']).then(function (k) {
        var buf = new Uint8Array(r[1])
        return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.subarray(0, 12) }, k, buf.subarray(12))
      })
    }).then(function (raw) {
      var payload = JSON.parse(new TextDecoder().decode(raw)), urls = {}
      Object.keys(payload.imgs).forEach(function (nome) {
        urls[nome.replace(/\.jpg$/, '')] = URL.createObjectURL(new Blob([b64bytes(payload.imgs[nome])], { type: 'image/jpeg' }))
      })
      var inj = '<script>window.__SINUSAL_IMGS__=' + JSON.stringify(urls).replace(/</g, '\\u003c') + ';<\/script>'
      var html = payload.html.replace(/<head>/i, '<head>' + inj)
      view.innerHTML = ''
      var fr = document.createElement('iframe')
      fr.className = 'apos-frame'; fr.title = 'Apostila de ' + TITULO
      fr.srcdoc = html
      view.appendChild(fr)
    }).catch(function (e) {
      var m = $('#apos-msg'); if (!m) return
      if (e && e.code === 'permission-denied') m.textContent = 'Sua conta ainda não tem acesso à apostila. Fale com a professora ou com o dono do site.'
      else if (e && e.code === 'sem-chave') m.textContent = 'A apostila ainda não foi liberada.'
      else m.textContent = 'Não foi possível abrir a apostila agora. Tente de novo.'
    })
  }

  // ---------------- dados do treino (perguntas) ----------------
  var dadosP = null
  function dadosTreino() {
    if (!dadosP) dadosP = db.doc('aulas/' + AULA + '-treino').get().then(function (s) {
      if (!s.exists) throw { code: 'sem-treino' }
      var d = s.data(); d.mapa = {}; d.itens.forEach(function (it) { d.mapa[it.id] = it }); return d
    }).catch(function (e) { dadosP = null; throw e })
    return dadosP
  }
  function falhou(e, onde) {
    if (e && e.code === 'permission-denied') { bloqueado(); return }
    onde.innerHTML = '<div class="sx-wrap"><p class="sx-msg sx-erro">Não foi possível carregar agora. Verifique a conexão e tente de novo.</p><button class="sx-btn sx-small" type="button" id="tentar">Tentar de novo</button></div>'
    $('#tentar').addEventListener('click', rota)
  }

  // ---------------- início: escolher 3D ou PDF ----------------
  function hub() {
    var nome = perfil && perfil.nome ? perfil.nome.split(' ')[0] : ''
    view.innerHTML = '<div class="sx-wrap">' +
      '<span class="sx-tag">' + esc((A.materia || 'Anatomía Patológica I') + ' · ' + TITULO) + '</span>' +
      '<h1 class="sx-h1">' + (nome ? 'Olá, <em>' + esc(nome) + '.</em>' : 'Bons <em>estudos.</em>') + '</h1>' +
      '<p class="sx-lead">Como você quer estudar hoje? Escolha o jeito que funciona melhor para você agora.</p>' +
      '<div class="hub-modes">' +
        '<a class="mode sx-glass" href="#/3d"><span class="mode-art"><img src="' + IMG(A.capa || 'secuencia') + '" alt="" width="1920" height="1080"></span>' +
          '<span class="mode-txt"><b>Aula em 3D</b><span>' + (A.temas || 16) + ' temas com as lâminas em 3D. A câmera aproxima cada achado e o texto da professora aparece por cima.</span><span class="go">Abrir a aula</span></span></a>' +
        '<a class="mode sx-glass" href="#/pdf"><span class="mode-art mode-pdf" aria-hidden="true"><i></i><i></i><i></i></span>' +
          '<span class="mode-txt"><b>Material em PDF</b><span>O conteúdo inteiro em páginas para ler e revisar, e o resumo com as questões das provas.</span><span class="go">Abrir o PDF</span></span></a>' +
        (A.apostila ? '<a class="mode sx-glass" href="#/apostila"><span class="mode-art mode-apos" aria-hidden="true"><i></i><i></i></span>' +
          '<span class="mode-txt"><b>Apostila</b><span>Teoria em português com os termos em espanhol, o que caiu em cada prova, imagens e cartões de revisão.</span><span class="go">Abrir a apostila</span></span></a>' : '') +
      '</div>' +
      '<a class="hub-tr sx-glass" href="#/treino"><span><b class="t">Treino</b><span class="d" id="hub-tr-d">As perguntas das provas antigas e do repaso, uma por vez, com gabarito comentado.</span></span>' +
        '<span class="nums" id="hub-nums"><span><b>·</b>dominadas</span><span><b>·</b>para revisar</span><span><b>·</b>novas</span></span><span class="go">Treinar</span></a>' +
      outrasAulas() +
      '</div>'
    dadosTreino().then(function (d) {
      var c = contagem(d)
      var box = $('#hub-nums'); if (!box) return
      $('#hub-tr-d').textContent = c.tot + ' perguntas das provas antigas e do repaso, uma por vez, com gabarito comentado.'
      box.innerHTML = '<span><b>' + c.dom + '</b>dominadas</span><span><b>' + c.rev + '</b>para revisar</span><span><b>' + c.nov + '</b>novas</span>'
    }).catch(function (e) { if (e && e.code === 'permission-denied') bloqueado() })
  }

  // outras aulas da mesma conta (lista pública em config.js)
  function outrasAulas() {
    var lista = (window.SINUSAL_AULAS || []).filter(function (x) { return x.id !== AULA })
    if (!lista.length) return ''
    return '<section class="tr-sec"><h2 class="sx-h2">Outras aulas</h2><p class="sx-lead" style="font-size:15px;margin-top:6px">A mesma conta abre todas.</p><div class="hub-outras">' +
      lista.map(function (x) {
        return '<a class="outra sx-glass" href="../' + esc(x.id) + '/"><img src="https://raw.githubusercontent.com/felpsguimaraes/Ritmo-Sinusal/main/aulas/' + esc(x.id) + '/img/' + esc(x.capa) + '.png" alt="" loading="lazy"><span><small>' + esc(x.materia || 'Anatomía Patológica I') + '</small><b>' + esc(x.titulo) + '</b></span></a>'
      }).join('') + '</div></section>'
  }

  // ---------------- aula 3D ----------------
  function abrir3d(alvo) {
    marcarModo('3d')
    app.hidden = true; gate.hidden = false; fDados.hidden = gBtn.hidden = ou.hidden = true
    sayLoading('Abrindo a aula…')
    db.doc('aulas/' + AULA).get().then(function (snap) {
      if (!snap.exists) { say('A aula ainda não foi publicada. Volte em instantes.', true); return }
      sess.set('modo', '3d')
      montar(snap.data().html || '', alvo)
    }).catch(function (e) {
      if (e && e.code === 'permission-denied') { bloqueado(); return }
      say('Não foi possível abrir a aula agora. Tente recarregar a página.', true)
    })
  }

  // marca os temas que a pessoa realmente abriu (uma vez por visita)
  function seguirTemas() {
    if (!('IntersectionObserver' in window) || !perfilRef) return
    var vistos = {}
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var id = e.target.id
        if (!e.isIntersecting || vistos[id]) return
        vistos[id] = true
        var t = {}; t[id] = true
        perfilRef.set({ temas: t }, { merge: true }).catch(function () {})
        io.unobserve(e.target)
      })
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    $$('section.scene[id]').forEach(function (s) { io.observe(s) })
  }

  // coloca a aula na página: estilos, conteúdo e o script dela
  function montar(html, alvo) {
    montada = true
    var doc = new DOMParser().parseFromString(html, 'text/html')
    if (doc.title) document.title = doc.title + ' · sinusal.'
    var scripts = Array.prototype.slice.call(doc.querySelectorAll('script'))
    scripts.forEach(function (s) { s.parentNode.removeChild(s) })
    doc.querySelectorAll('link[rel="stylesheet"], style').forEach(function (n) { document.head.appendChild(document.importNode(n, true)) })
    doc.querySelectorAll('title, link[rel="preconnect"], link[rel="stylesheet"], style, meta').forEach(function (n) { n.parentNode && n.parentNode.removeChild(n) })
    // sem âncora: limpa o endereço para a aula oferecer "continuar de onde parou"
    if (alvo && /^[\w-]+$/.test(alvo) && doc.getElementById(alvo)) history.replaceState(null, '', '#' + alvo)
    else { alvo = null; history.replaceState(null, '', location.pathname + location.search) }
    document.body.className = ''
    document.body.innerHTML = doc.body.innerHTML
    // links da aula para o resto do site (início, PDF, treino)
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-sx-ir]')
      if (!a) return
      e.preventDefault(); e.stopPropagation()
      sess.del('modo')
      location.hash = '#/' + a.getAttribute('data-sx-ir')
      location.reload()
    }, true)
    scripts.forEach(function (s) {
      var n = document.createElement('script')
      if (s.src) n.src = s.src; else n.textContent = s.textContent
      document.body.appendChild(n)
    })
    var foot = document.querySelector('footer')
    if (foot && perfil) {
      var span = document.createElement('span'); span.className = 'mono'
      span.textContent = (perfil.nome || '') + ' · turma ' + (perfil.turma || '')
      foot.appendChild(span)
    }
    if (alvo) setTimeout(function () { var t = document.getElementById(alvo); if (t) t.scrollIntoView() }, 450)
    setTimeout(seguirTemas, 800)
  }

  // ---------------- PDF: arquivo cifrado no GitHub, chave só para quem entrou ----------------
  var pdfInfoP = null, pdfLibP = null, chaveP = null, pdfDocs = {}, pdfCur = null, zoom = 1
  var ZOOMS = [1, 1.35, 1.75, 2.25]
  function pdfInfo() {
    if (!pdfInfoP) pdfInfoP = db.doc('aulas/' + AULA + '-pdf').get().then(function (s) { if (!s.exists) throw { code: 'sem-pdf' }; return s.data() }).catch(function (e) { pdfInfoP = null; throw e })
    return pdfInfoP
  }
  function script(src) {
    return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = function () { no({ code: 'rede' }) }; document.head.appendChild(s) })
  }
  function pdfLib() {
    if (!pdfLibP) pdfLibP = (window.pdfjsLib ? Promise.resolve() : script(PDFJS + 'pdf.min.js')).then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js'
      return window.pdfjsLib
    }).catch(function (e) { pdfLibP = null; throw e })
    return pdfLibP
  }
  function chave(b64) {
    if (!chaveP) chaveP = crypto.subtle.importKey('raw', Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0) }), 'AES-GCM', false, ['decrypt'])
    return chaveP
  }
  function baixar(d, prog) {
    return fetch(d.arq + '?v=' + d.sha).then(function (r) {
      if (!r.ok) throw { code: 'rede' }
      if (!r.body || !r.body.getReader) return r.arrayBuffer().then(function (b) { return new Uint8Array(b) })
      var rd = r.body.getReader(), partes = [], n = 0, total = d.bytes || +r.headers.get('content-length') || 0
      return (function ler() {
        return rd.read().then(function (x) {
          if (x.done) { var out = new Uint8Array(n), o = 0; partes.forEach(function (p) { out.set(p, o); o += p.length }); return out }
          partes.push(x.value); n += x.value.length; if (total) prog(Math.min(1, n / total))
          return ler()
        })
      })()
    })
  }
  function pdfFechar() { if (pdfCur) { pdfCur.io && pdfCur.io.disconnect(); removeEventListener('scroll', pdfCur.onScroll); removeEventListener('resize', pdfCur.onResize); pdfCur = null } }

  function pdfAbrir(id, pag) {
    var ja = pdfCur && document.contains(pdfCur.box)
    if (ja && (!id || id === pdfCur.id)) { if (pag) irPagina(pag); return }
    pdfFechar()
    view.innerHTML = '<div class="pdf-bar" id="pdf-bar"><div class="seg" id="pdf-seg" role="group" aria-label="Qual PDF"></div>' +
      '<select class="pdf-toc" id="pdf-toc" aria-label="Ir para"></select>' +
      '<div class="pdf-right"><span class="pdf-pg" aria-live="polite">Página <b id="pdf-at">1</b> de <span id="pdf-n">·</span></span>' +
      '<button class="ibtn" type="button" id="z-out" aria-label="Diminuir">−</button><button class="ibtn" type="button" id="z-in" aria-label="Aumentar">+</button></div></div>' +
      '<div class="pdf-pages" id="pdf-pages"><div class="pdf-load"><span class="sx-spin"></span><span id="pdf-st">Preparando o material…</span><span class="bar"><i id="pdf-bar-i"></i></span></div></div>'
    pdfInfo().then(function (info) {
      var docs = info.docs
      id = (docs.some(function (d) { return d.id === id }) && id) || store.get('pdf-doc', docs[0].id)
      var d = docs.filter(function (x) { return x.id === id })[0] || docs[0]
      store.set('pdf-doc', d.id)
      $('#pdf-seg').innerHTML = docs.map(function (x) { return '<button type="button" data-doc="' + esc(x.id) + '" aria-pressed="' + (x.id === d.id) + '">' + esc(x.nome) + '</button>' }).join('')
      $('#pdf-seg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && b.dataset.doc !== d.id) ir('#/pdf/' + b.dataset.doc) })
      var toc = $('#pdf-toc')
      toc.innerHTML = '<option value="">Ir para…</option>' + (d.toc || []).map(function (t) { var tt = t.t || t[0], pp = t.p || t[1]; return '<option value="' + pp + '">' + esc(tt) + '  ·  p. ' + pp + '</option>' }).join('')
      toc.addEventListener('change', function () { if (toc.value) irPagina(+toc.value); toc.value = '' })
      var st = $('#pdf-st'), bi = $('#pdf-bar-i')
      var pronto = pdfDocs[d.id] ? Promise.resolve(pdfDocs[d.id]) : Promise.all([pdfLib(), chave(info.chave), baixar(d, function (f) { st.textContent = 'Baixando o material… ' + Math.round(f * 100) + '%'; bi.style.width = (f * 100) + '%' })]).then(function (r) {
        st.textContent = 'Abrindo…'
        return crypto.subtle.decrypt({ name: 'AES-GCM', iv: r[2].subarray(0, 12) }, r[1], r[2].subarray(12)).then(function (raw) {
          return r[0].getDocument({ data: new Uint8Array(raw) }).promise
        })
      }).then(function (pdf) { pdfDocs[d.id] = pdf; return pdf })
      return pronto.then(function (pdf) { if (vistaAtual === 'pdf') paginas(pdf, d, pag || store.get('pdf-pag-' + d.id, 1)) })
    }).catch(function (e) {
      if (e && e.code === 'permission-denied') { bloqueado(); return }
      var box = $('#pdf-pages'); if (!box) return
      box.innerHTML = '<div class="pdf-load"><p class="sx-msg sx-erro">' + (e && e.code === 'sem-pdf' ? 'O PDF ainda não foi publicado.' : 'Não foi possível abrir o PDF agora. Verifique a conexão.') + '</p><button class="sx-btn sx-small" type="button" id="tentar">Tentar de novo</button></div>'
      $('#tentar').addEventListener('click', function () { pdfCur = null; pdfAbrir(id, pag) })
    })
  }

  function paginas(pdf, d, pag) {
    var box = $('#pdf-pages'), n = pdf.numPages
    $('#pdf-n').textContent = n
    var nums = []; for (var k = 1; k <= n; k++) nums.push(k)
    Promise.all(nums.map(function (i) { return pdf.getPage(i).then(function (pg) { return pg.getViewport({ scale: 1 }) }) })).then(function (vs) {
      // cada página com a sua proporção (o mapa mental é uma página deitada)
      box.innerHTML = vs.map(function (v, k) { return '<div class="pdf-pg-box" data-n="' + (k + 1) + '" style="aspect-ratio:' + v.width.toFixed(1) + '/' + v.height.toFixed(1) + '" aria-label="Página ' + (k + 1) + '" role="img"></div>' }).join('')
      var cur = pdfCur = { id: d.id, pdf: pdf, box: box, feitos: {}, fila: {}, at: 1 }
      function largura() { var w = Math.min(860, box.clientWidth - 24); box.style.setProperty('--pw', Math.round(w * zoom) + 'px') }
      largura()
      function desenhar(i) {
        var el = box.querySelector('[data-n="' + i + '"]'); if (!el) return
        var w = Math.round(el.clientWidth)
        if (cur.feitos[i] === w || cur.fila[i]) return
        cur.fila[i] = true
        pdf.getPage(i).then(function (pg) {
          var base = pg.getViewport({ scale: 1 })
          var s = w * Math.min(window.devicePixelRatio || 1, 2) / base.width
          s = Math.min(s, Math.sqrt(5e6 / (base.width * base.height)))
          var vp = pg.getViewport({ scale: s }), c = document.createElement('canvas')
          c.width = Math.floor(vp.width); c.height = Math.floor(vp.height)
          return pg.render({ canvasContext: c.getContext('2d', { alpha: false }), viewport: vp }).promise.then(function () {
            if (pdfCur !== cur) return
            var old = el.querySelector('canvas'); if (old) { old.width = 0; old.remove() }
            el.appendChild(c); cur.feitos[i] = w
            limpar()
          })
        }).catch(function () {}).then(function () { delete cur.fila[i] })
      }
      // guarda no máximo 8 páginas desenhadas perto de onde a pessoa está (memória do celular)
      function limpar() {
        var ks = Object.keys(cur.feitos).map(Number)
        if (ks.length <= 8) return
        ks.sort(function (a, b) { return Math.abs(b - cur.at) - Math.abs(a - cur.at) }).slice(0, ks.length - 8).forEach(function (i) {
          var el = box.querySelector('[data-n="' + i + '"] canvas'); if (el) { el.width = 0; el.remove() }
          delete cur.feitos[i]
        })
      }
      cur.io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) desenhar(+e.target.dataset.n) }) }, { rootMargin: '900px 0px' })
      $$('.pdf-pg-box', box).forEach(function (el) { cur.io.observe(el) })
      var t = 0
      cur.onScroll = function () {
        if (t) return
        t = setTimeout(function () {
          t = 0
          var topo = ($('#pdf-bar') ? $('#pdf-bar').getBoundingClientRect().bottom : 0) + 60, at = 1
          $$('.pdf-pg-box', box).some(function (el) { if (el.getBoundingClientRect().bottom > topo) { at = +el.dataset.n; return true } return false })
          if (at !== cur.at) { cur.at = at; $('#pdf-at').textContent = at; store.set('pdf-pag-' + d.id, at) }
        }, 120)
      }
      addEventListener('scroll', cur.onScroll, { passive: true })
      var rt = 0
      cur.onResize = function () { clearTimeout(rt); rt = setTimeout(function () { var at = cur.at; largura(); cur.feitos = {}; irPagina(at, true) }, 250) }
      addEventListener('resize', cur.onResize)
      function setZoom(z) { var at = cur.at; zoom = z; largura(); cur.feitos = {}; irPagina(at, true); $('#z-out').disabled = zoom === ZOOMS[0]; $('#z-in').disabled = zoom === ZOOMS[ZOOMS.length - 1] }
      $('#z-in').addEventListener('click', function () { var k = ZOOMS.indexOf(zoom); if (k < ZOOMS.length - 1) setZoom(ZOOMS[k + 1]) })
      $('#z-out').addEventListener('click', function () { var k = ZOOMS.indexOf(zoom); if (k > 0) setZoom(ZOOMS[k - 1]) })
      $('#z-out').disabled = zoom === ZOOMS[0]; $('#z-in').disabled = zoom === ZOOMS[ZOOMS.length - 1]
      irPagina(Math.min(Math.max(1, pag || 1), n), true)
    })
  }
  function irPagina(i, sem) {
    if (!pdfCur) return
    var el = pdfCur.box.querySelector('[data-n="' + i + '"]'); if (!el) return
    var barra = $('#pdf-bar') ? $('#pdf-bar').getBoundingClientRect().height : 0
    var y = el.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sx-bar-h')) || 0) - barra - 10
    scrollTo({ top: Math.max(0, y), behavior: 'auto' })
    pdfCur.at = i; $('#pdf-at').textContent = i
    if (!sem) store.set('pdf-pag-' + pdfCur.id, i)
    setTimeout(pdfCur.onScroll, 50)
  }

  // ---------------- treino: progresso e repetição espaçada ----------------
  var INTERVALO = [0, 1, 3, 7, 16]
  var prog = store.get('treino', null) || { v: 1, it: {}, dias: [], hist: [], sim: {} }
  prog.sim = prog.sim || {}
  function hoje() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5) }
  function situ(id) {
    var s = prog.it[id]
    if (!s) return 'nova'
    if (s.g < 1 || s.d <= hoje()) return 'revisar'
    return s.b >= 3 ? 'dominada' : 'aprendendo'
  }
  function contagem(d, filtro) {
    var c = { dom: 0, rev: 0, nov: 0, apr: 0, tot: 0 }
    d.itens.forEach(function (it) {
      if (filtro && !filtro(it)) return
      c.tot++
      var s = situ(it.id)
      if (s === 'dominada') c.dom++; else if (s === 'revisar') c.rev++; else if (s === 'nova') c.nov++; else c.apr++
    })
    return c
  }
  // g: 1 acertou, .5 quase, 0 errou
  function anotar(id, g) {
    var s = prog.it[id] || { b: 0, n: 0, ok: 0 }
    s.n++; if (g === 1) s.ok++
    if (g === 1) s.b = s.g == null ? 2 : Math.min(4, s.b + 1)
    else if (g === 0.5) s.b = Math.max(1, s.b - 1)
    else s.b = 0
    s.g = g; s.d = hoje() + INTERVALO[s.b]
    prog.it[id] = s
    var h = hoje(); if (prog.dias[prog.dias.length - 1] !== h) { prog.dias.push(h); prog.dias = prog.dias.slice(-60) }
    store.set('treino', prog)
  }
  function sequencia() {
    var dias = prog.dias, h = hoje(), n = 0, k = dias.length - 1
    if (k < 0 || dias[k] < h - 1) return 0
    var esperado = dias[k]
    for (; k >= 0 && dias[k] === esperado; k--, esperado--) n++
    return n
  }
  function embaralhar(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t } return a }
  var ORDEM_PROVAS = ['1º Parcial', '1º Parcial · Turma C', '1º Parcial · Recuperación', '2º Parcial · Turma C', '2º Parcial · Turma D', 'Examen final', 'Banco de preguntas', 'Repaso de la profesora']
  function isProva(it) { return it.tipo !== 'tarjeta' && !!it.src && !/Repaso|Banco|Pregunta de la clase/.test(it.src) }
  function provas(d) {
    var m = {}
    d.itens.forEach(function (it) { if (it.tipo !== 'tarjeta') (m[it.src] = m[it.src] || []).push(it.id) })
    return Object.keys(m).sort(function (a, b) { var x = ORDEM_PROVAS.indexOf(a), y = ORDEM_PROVAS.indexOf(b); return (x < 0 ? 99 : x) - (y < 0 ? 99 : y) }).map(function (k) { return { nome: k, ids: m[k] } })
  }
  function temasOrdem(d) { var o = (d.ordem || []).filter(function (k) { return d.temas[k] }); return o.concat(Object.keys(d.temas).filter(function (k) { return o.indexOf(k) < 0 })) }

  // monta a lista de cada modo
  function lista(d, modo, arg) {
    var it = d.itens
    if (modo === 'dia') {
      var h = hoje()
      var rev = it.filter(function (x) { return situ(x.id) === 'revisar' }).sort(function (a, b) { return prog.it[a.id].d - prog.it[b.id].d || prog.it[a.id].b - prog.it[b.id].b })
      var por = {}; it.filter(function (x) { return !prog.it[x.id] }).forEach(function (x) { (por[x.th] = por[x.th] || []).push(x) })
      var novas = [], ts = temasOrdem(d), parou = false
      while (!parou) { parou = true; ts.forEach(function (k) { if (por[k] && por[k].length) { novas.push(por[k].shift()); parou = false } }) }
      var resto = it.filter(function (x) { var s = situ(x.id); return s === 'aprendendo' || s === 'dominada' }).sort(function (a, b) { return prog.it[a.id].d - prog.it[b.id].d })
      return embaralhar(rev.concat(novas, resto).slice(0, 10).map(function (x) { return x.id }))
    }
    if (modo === 'tema') return embaralhar(it.filter(function (x) { return x.th === arg }).map(function (x) { return x.id }))
    if (modo === 'erros') return embaralhar(it.filter(function (x) { var s = prog.it[x.id]; return s && s.g < 1 }).map(function (x) { return x.id }))
    if (modo === 'tarjetas') return embaralhar(it.filter(function (x) { return x.tipo === 'tarjeta' }).map(function (x) { return x.id }))
    if (modo === 'simulado') {
      if (arg === 'misto') {
        var por2 = {}; it.filter(function (x) { return x.tipo !== 'tarjeta' }).forEach(function (x) { (por2[x.th] = por2[x.th] || []).push(x.id) })
        Object.keys(por2).forEach(function (k) { por2[k] = embaralhar(por2[k]) })
        var out = [], ks = Object.keys(por2), mais = true
        while (out.length < 15 && mais) { mais = false; ks.forEach(function (k) { if (out.length < 15 && por2[k].length) { out.push(por2[k].shift()); mais = true } }) }
        return embaralhar(out)
      }
      var p = provas(d).filter(function (x) { return x.nome === arg })[0]
      return p ? p.ids.slice() : []
    }
    return []
  }

  var S = null   // sessão em andamento
  function salvarS() { if (S) sess.set('sessao-' + AULA, S); else sess.del('sessao-' + AULA) }
  function nomeModo(m, arg, d) {
    if (m === 'dia') return 'Treino do dia'
    if (m === 'tema') return 'Treino por tema: ' + (d.temas[arg] || arg)
    if (m === 'erros') return 'Revisão dos erros'
    if (m === 'tarjetas') return 'Tarjetas de repaso'
    if (m === 'simulado') return arg === 'misto' ? 'Simulado misto' : 'Simulado: ' + arg
    if (m === 'rodada') return 'Erros da rodada'
    return 'Treino'
  }
  function comecar(d, modo, arg, ids) {
    ids = ids || lista(d, modo, arg)
    if (!ids.length) return
    S = { modo: modo, arg: arg || '', titulo: nomeModo(modo, arg, d), ids: ids, i: 0, resp: {}, ini: Date.now(), fase: 'perg', sim: modo === 'simulado' }
    salvarS(); pergunta(d)
  }

  function treino(sub) {
    view.innerHTML = '<div class="tr-wrap"><div class="sx-load"><span class="sx-spin"></span>Carregando o treino…</div></div>'
    dadosTreino().then(function (d) {
      if (vistaAtual !== 'treino') return
      if (!S) S = sess.get('sessao-' + AULA)
      if (sub === 'dia') { history.replaceState(null, '', '#/treino'); comecar(d, 'dia'); return }
      if (sub === 'erros') { history.replaceState(null, '', '#/treino'); comecar(d, 'erros'); return }
      if (sub === 'tarjetas') { history.replaceState(null, '', '#/treino'); comecar(d, 'tarjetas'); return }
      if (S && S.fase !== 'fim' && !sub) { pergunta(d); return }
      inicioTreino(d, sub)
    }).catch(function (e) { falhou(e, view) })
  }

  function anel(p) {
    var r = 46, c = 2 * Math.PI * r
    return '<div class="ring" role="img" aria-label="' + Math.round(p * 100) + '% dominado"><svg viewBox="0 0 108 108"><circle cx="54" cy="54" r="' + r + '" fill="none" stroke="#e3eee8" stroke-width="10"/><circle cx="54" cy="54" r="' + r + '" fill="none" stroke="#176e5b" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + (c * p).toFixed(1) + ' ' + c.toFixed(1) + '"/></svg><b>' + Math.round(p * 100) + '%</b></div>'
  }

  function inicioTreino(d, foco) {
    var c = contagem(d), seq = sequencia()
    var nErros = d.itens.filter(function (x) { var s = prog.it[x.id]; return s && s.g < 1 }).length
    var andamento = S && S.fase !== 'fim' ? S : null
    var h = '<div class="tr-wrap">' +
      '<span class="sx-tag">' + esc(TITULO) + '</span><h1 class="sx-h1">Treino<em>.</em></h1>' +
      '<p class="sx-lead">' + (function () { var nt = d.itens.filter(function (x) { return x.tipo === 'tarjeta' }).length, nq = d.itens.length - nt; return 'As ' + nq + ' questões das provas antigas e do repaso da professora' + (nt ? ', mais as ' + nt + ' tarjetas' : '') + '.' })() + ' O que você erra volta mais cedo; o que acerta volta depois de alguns dias, até ficar dominado.</p>' +
      '<div class="tr-sum sx-glass">' + anel(c.tot ? c.dom / c.tot : 0) +
        '<div><div class="nums"><span><b>' + c.dom + '</b>dominadas</span><span><b>' + c.rev + '</b>para revisar</span><span><b>' + c.nov + '</b>novas</span><span><b>' + seq + '</b>' + (seq === 1 ? 'dia seguido' : 'dias seguidos') + '</span></div>' +
        '<p>Dominada é a pergunta que você acertou em dois dias diferentes. Seu progresso fica salvo neste aparelho.</p></div></div>' +
      (andamento ? '<div class="tr-cont"><span>Você tem um treino em andamento: <b>' + esc(andamento.titulo) + '</b>, ' + (Object.keys(andamento.resp).length) + ' de ' + andamento.ids.length + '.</span><button class="sx-btn sx-small sx-primary" type="button" id="tr-cont">Continuar</button><button class="sx-btn sx-small" type="button" id="tr-desc">Descartar</button></div>' : '') +
      '<button class="tr-main" type="button" id="tr-dia"><span><b>Treino do dia</b><span>10 perguntas misturadas: primeiro o que você precisa revisar, depois o que ainda não viu.</span></span><span class="go" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></button>' +
      '<div class="tr-modes">' +
        '<button class="tr-mode sx-glass" type="button" id="tr-sim"><b>Simulado de prova</b><span>A prova antiga inteira, sem gabarito até o fim.</span></button>' +
        '<button class="tr-mode sx-glass" type="button" id="tr-err"' + (nErros ? '' : ' disabled') + '><b>Revisar erros</b><span>' + (nErros ? nErros + (nErros === 1 ? ' pergunta que você errou ou quase acertou.' : ' perguntas que você errou ou quase acertou.') : 'Nenhum erro guardado ainda.') + '</span></button>' +
        '<button class="tr-mode sx-glass" type="button" id="tr-tar"><b>Tarjetas</b><span>As 12 perguntas-chave da aula, para responder em voz alta.</span></button>' +
      '</div>' +
      '<section class="tr-sec" id="tr-temas"><h2 class="sx-h2">Por tema</h2><p>Toque num tema para treinar só ele. A barra mostra quanto já está dominado.</p><div class="tr-list sx-glass">' +
        temasOrdem(d).map(function (k) {
          var ct = contagem(d, function (x) { return x.th === k })
          return '<button class="tr-row" type="button" data-tema="' + esc(k) + '"><span class="t">' + esc(d.temas[k]) + '<small>' + ct.tot + (ct.tot === 1 ? ' pergunta' : ' perguntas') + (ct.rev ? ' · ' + ct.rev + ' para revisar' : '') + '</small></span><span class="mbar"><i style="width:' + Math.round(ct.dom / Math.max(1, ct.tot) * 100) + '%"></i></span><span class="n">' + ct.dom + ' / ' + ct.tot + '</span></button>'
        }).join('') + '</div></section>' +
      '<section class="tr-sec" id="tr-provas"><h2 class="sx-h2">Simulados</h2><p>Cada prova antiga como caiu, na ordem original. Você só vê o gabarito no fim e corrige as abertas comparando com a resposta.</p><div class="tr-list sx-glass">' +
        provas(d).map(function (p) {
          var best = prog.sim[p.nome]
          return '<button class="tr-row" type="button" data-prova="' + esc(p.nome) + '"><span class="t">' + esc(p.nome) + '<small>' + p.ids.length + (p.ids.length === 1 ? ' questão' : ' questões') + '</small></span><span class="mbar"><i style="width:' + (best != null ? Math.round(best * 100) : 0) + '%"></i></span><span class="n">' + (best != null ? 'melhor ' + Math.round(best * 100) + '%' : 'não feito') + '</span></button>'
        }).join('') +
        '<button class="tr-row" type="button" data-prova="misto"><span class="t">Simulado misto<small>15 questões sorteadas de todas as provas, cobrindo todos os temas</small></span><span class="mbar"><i style="width:' + (prog.sim.misto != null ? Math.round(prog.sim.misto * 100) : 0) + '%"></i></span><span class="n">' + (prog.sim.misto != null ? 'melhor ' + Math.round(prog.sim.misto * 100) + '%' : 'não feito') + '</span></button>' +
      '</div></section>' +
      (prog.hist.length ? '<section class="tr-sec"><h2 class="sx-h2">Seus últimos treinos</h2><div class="tr-hist">' + prog.hist.slice(0, 6).map(function (x) {
        var dt = new Date(x.em)
        return '<div><span>' + dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' · ' + esc(x.titulo) + '</span><span>' + fmtNum(x.acertos) + ' de ' + x.total + '</span></div>'
      }).join('') + '</div></section>' : '') +
      '<p style="margin-top:26px"><button class="linkbtn" type="button" id="tr-zerar">Zerar meu progresso neste aparelho</button></p>' +
      '</div>'
    view.innerHTML = h
    $('#tr-dia').addEventListener('click', function () { comecar(d, 'dia') })
    $('#tr-sim').addEventListener('click', function () { $('#tr-provas').scrollIntoView({ behavior: 'smooth' }) })
    if (nErros) $('#tr-err').addEventListener('click', function () { comecar(d, 'erros') })
    $('#tr-tar').addEventListener('click', function () { comecar(d, 'tarjetas') })
    $$('[data-tema]').forEach(function (b) { b.addEventListener('click', function () { comecar(d, 'tema', b.dataset.tema) }) })
    $$('[data-prova]').forEach(function (b) { b.addEventListener('click', function () { comecar(d, 'simulado', b.dataset.prova) }) })
    if (andamento) {
      $('#tr-cont').addEventListener('click', function () { pergunta(d) })
      $('#tr-desc').addEventListener('click', function () { S = null; salvarS(); inicioTreino(d) })
    }
    var z = $('#tr-zerar'), armado = 0
    z.addEventListener('click', function () {
      if (!armado) { z.textContent = 'Toque de novo para zerar tudo'; armado = setTimeout(function () { armado = 0; z.textContent = 'Zerar meu progresso neste aparelho' }, 3500); return }
      clearTimeout(armado); prog = { v: 1, it: {}, dias: [], hist: [], sim: {} }; store.set('treino', prog); S = null; salvarS(); inicioTreino(d)
    })
    if (foco === 'temas') $('#tr-temas').scrollIntoView()
    if (foco === 'simulado') $('#tr-provas').scrollIntoView()
    if (foco) history.replaceState(null, '', '#/treino')
  }

  function fmtNum(n) { return String(Math.round(n * 2) / 2).replace('.', ',') }
  var LET = 'abcdefghij'
  function respostaCerta(it) { return it.tipo === 'mc' ? LET[it.ans] + ') ' + it.opts[it.ans] : it.ans }
  function linksRever(d, it) {
    var out = []
    if (it.to && d.caps && d.caps[it.to]) out.push('<a href="#/3d/' + esc(it.to) + '">Rever na aula 3D: ' + esc(d.caps[it.to]) + '</a>')
    if (it.to && d.pdf && d.pdf[it.to]) out.push('<a href="#/pdf/material/' + d.pdf[it.to] + '">Ver no PDF, página ' + d.pdf[it.to] + '</a>')
    return out.length ? '<p class="ts-links">' + out.join('') + '</p>' : ''
  }
  function explicacao(d, it) {
    return '<p class="ts-ans"><b>Resposta:</b> <span lang="es">' + respostaCerta(it) + '</span></p>' +
      (it.ex ? '<p class="ts-ex">' + it.ex + '</p>' : '') + (it.nt ? '<p class="ts-nt">' + it.nt + '</p>' : '') + linksRever(d, it)
  }

  function pergunta(d) {
    if (!S) { inicioTreino(d); return }
    if (S.fase === 'corr') { correcao(d); return }
    if (S.fase === 'fim' || S.i >= S.ids.length) { if (S.sim) { S.fase = 'corr'; salvarS(); correcao(d) } else fim(d); return }
    var id = S.ids[S.i], it = d.mapa[id]
    if (!it) { S.i++; salvarS(); pergunta(d); return }
    var r = S.resp[id] || {}
    var aberta = it.tipo !== 'mc'
    var n = S.ids.length
    var meta = esc(it.tipo === 'tarjeta' ? 'Tarjeta · ' + (it.tag || '') : it.src) + ' · ' + esc(d.temas[it.th] || '') + (it.fl ? ' · <span class="fl">' + esc(it.fl === 'Complemento' ? 'Complemento (fora da aula)' : it.fl) + '</span>' : '')
    view.innerHTML = '<div class="tr-wrap">' +
      '<div class="ts-top"><button class="sx-btn sx-small" type="button" id="ts-sair">Sair</button><div class="ts-prog" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + S.i + '"><i style="width:' + Math.round(S.i / n * 100) + '%"></i></div><span class="ts-n">' + (S.i + 1) + ' de ' + n + (S.sim ? ' · <span id="ts-rel">' + relogio() + '</span>' : '') + '</span></div>' +
      '<article class="ts-card sx-glass">' +
        '<p class="ts-meta">' + esc(S.titulo) + ' · ' + meta + '</p>' +
        (isProva(it) ? '<p class="prova-tag">Questão de prova anterior · ' + esc(it.src) + '</p>' : '') +
        '<h2 class="ts-q" id="ts-q" tabindex="-1" lang="es">' + it.q + '</h2>' +
        (aberta
          ? '<label class="ts-lab" for="ts-txt">' + (S.sim ? 'Sua resposta' : 'Sua resposta (escrever ajuda a fixar, mas pode só pensar)') + '</label><textarea class="ts-txt" id="ts-txt" lang="es" rows="3" placeholder="Escreva aqui…">' + esc(r.txt || '') + '</textarea>'
          : '<div class="ts-opts" role="group" aria-label="Alternativas">' + it.opts.map(function (o, k) { return '<button type="button" class="ts-opt" data-k="' + k + '" aria-pressed="' + (r.k === k) + '"><span class="L">' + LET[k] + '</span><span lang="es">' + o + '</span></button>' }).join('') + '</div>') +
        '<div class="ts-fb" id="ts-fb" hidden aria-live="polite"></div>' +
      '</article>' +
      '<div class="ts-act" id="ts-act"></div>' +
      '<p class="kb" id="ts-kb"></p>' +
      '</div>'
    $('#ts-sair').addEventListener('click', function () { salvarS(); inicioTreino(d) })
    var act = $('#ts-act'), fb = $('#ts-fb'), kb = $('#ts-kb')
    var ultima = S.i === n - 1
    function avancar() { S.i++; salvarS(); pergunta(d); var q = $('#ts-q'); if (q) q.focus({ preventScroll: true }); scrollTo(0, 0) }
    function botaoProx(txt) {
      act.innerHTML = '<button class="sx-btn sx-primary" type="button" id="ts-next">' + txt + '</button>'
      var b = $('#ts-next'); b.addEventListener('click', avancar); return b
    }
    if (S.sim) {
      // simulado: escolhe e segue, sem gabarito até o fim
      if (aberta) {
        var tx = $('#ts-txt')
        tx.addEventListener('input', function () { S.resp[id] = { txt: tx.value }; salvarS() })
      } else {
        $$('.ts-opt').forEach(function (b) { b.addEventListener('click', function () {
          $$('.ts-opt').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)) })
          S.resp[id] = { k: +b.dataset.k }; salvarS()
        }) })
      }
      act.innerHTML = (S.i > 0 ? '<button class="sx-btn" type="button" id="ts-prev">Anterior</button>' : '') + '<button class="sx-btn sx-primary" type="button" id="ts-next">' + (ultima ? 'Terminar e corrigir' : 'Próxima') + '</button>'
      $('#ts-next').addEventListener('click', avancar)
      if (S.i > 0) $('#ts-prev').addEventListener('click', function () { S.i--; salvarS(); pergunta(d) })
      kb.textContent = aberta ? 'Ctrl + Enter: próxima' : 'Teclas a, b, c… escolhem · Enter: próxima'
      tick()
    } else if (!aberta) {
      kb.textContent = 'Teclas a, b, c… respondem · Enter: próxima'
      var resp = function (k) {
        if (S.resp[id] && S.resp[id].g != null) return
        var g = k === it.ans ? 1 : 0
        S.resp[id] = { k: k, g: g }; anotar(id, g); salvarS()
        mostrarMc(k)
      }
      var mostrarMc = function (k) {
        $$('.ts-opt').forEach(function (b) {
          var j = +b.dataset.k; b.disabled = true; b.setAttribute('aria-pressed', 'false')
          if (j === it.ans) b.classList.add('ok'); else if (j === k) b.classList.add('bad'); else b.classList.add('dim')
        })
        fb.hidden = false
        fb.innerHTML = (k === it.ans ? '<p class="ts-ver ok">Correto.</p>' : '<p class="ts-ver bad">Não foi dessa vez. A certa é a letra ' + LET[it.ans] + '.</p>') + explicacao(d, it)
        botaoProx(ultima ? 'Ver resultado' : 'Próxima').focus({ preventScroll: true })
      }
      $$('.ts-opt').forEach(function (b) { b.addEventListener('click', function () { resp(+b.dataset.k) }) })
      if (r.g != null) mostrarMc(r.k)
    } else {
      // aberta ou tarjeta: pensa, compara com o gabarito e se autoavalia
      kb.textContent = 'Ctrl + Enter: mostrar resposta · depois 1, 2 ou 3 para avaliar'
      var tx2 = $('#ts-txt')
      tx2.addEventListener('input', function () { S.resp[id] = { txt: tx2.value }; salvarS() })
      var revelar = function () {
        tx2.readOnly = true
        fb.hidden = false
        fb.innerHTML = explicacao(d, it) + '<p class="ts-lab" style="margin-top:4px">Como foi? Compare com o gabarito e seja honesto: é isso que decide quando a pergunta volta.</p>' +
          '<div class="grade" role="group" aria-label="Como foi"><button type="button" class="g0" data-g="0">Errei</button><button type="button" class="g1" data-g="0.5">Quase</button><button type="button" class="g2" data-g="1">Acertei</button></div>'
        act.innerHTML = ''
        $$('.grade button', fb).forEach(function (b) { b.addEventListener('click', function () { avaliar(+b.dataset.g) }) })
        var g0 = $('.grade .g2', fb); if (g0) g0.focus({ preventScroll: true })
        fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
      var avaliar = function (g) {
        var prev = S.resp[id] || {}
        S.resp[id] = { txt: prev.txt || '', g: g }; anotar(id, g); salvarS(); avancar()
      }
      act.innerHTML = '<button class="sx-btn sx-primary" type="button" id="ts-show">Mostrar resposta</button>'
      $('#ts-show').addEventListener('click', revelar)
      if (r.g != null) { revelar() }
    }
    teclado = function (e) {
      if (e.altKey || e.metaKey) return
      var k = (e.key || '').toLowerCase()
      var emTexto = e.target && e.target.tagName === 'TEXTAREA'
      if (k === 'enter' && (e.ctrlKey || !emTexto)) {
        var b = $('#ts-next') || $('#ts-show'); if (b) { e.preventDefault(); b.click() } return
      }
      if (emTexto || e.ctrlKey) return
      if (!aberta && LET.indexOf(k) >= 0 && LET.indexOf(k) < it.opts.length) { var o = $('.ts-opt[data-k="' + LET.indexOf(k) + '"]'); if (o && !o.disabled) { e.preventDefault(); o.click() } }
      if (aberta && ['1', '2', '3'].indexOf(k) >= 0) { var gb = $$('.grade button')[+k - 1]; if (gb) { e.preventDefault(); gb.click() } }
    }
    var q = $('#ts-q'); if (q && document.activeElement !== $('#ts-next')) q.focus({ preventScroll: true })
  }
  var teclado = null
  addEventListener('keydown', function (e) { if (teclado && vistaAtual === 'treino' && $('.ts-card')) teclado(e) })
  function relogio() { var s = Math.floor((Date.now() - S.ini) / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') }
  var relT = 0
  function tick() { clearInterval(relT); relT = setInterval(function () { var el = $('#ts-rel'); if (!el || !S) { clearInterval(relT); return } el.textContent = relogio() }, 1000) }

  // simulado: correção no fim (múltipla escolha automática, abertas por autoavaliação)
  function correcao(d) {
    clearInterval(relT)
    if (!S.tempo) { S.tempo = Date.now() - S.ini; salvarS() }
    var h = '<div class="tr-wrap corr"><span class="sx-tag">' + esc(S.titulo) + '</span><h1 class="sx-h1">Correção<em>.</em></h1>' +
      '<p class="sx-lead">As de múltipla escolha já estão corrigidas. Nas abertas, compare a sua resposta com o gabarito e marque como foi. A nota sai quando todas estiverem marcadas.</p><div class="tr-miss">'
    S.ids.forEach(function (id, n) {
      var it = d.mapa[id]; if (!it) return
      var r = S.resp[id] || {}
      var tua
      if (it.tipo === 'mc') {
        r.g = r.k === it.ans ? 1 : 0; S.resp[id] = r
        tua = r.k == null ? '<p class="yours bad">Em branco.</p>' : '<p class="yours ' + (r.g ? 'ok' : 'bad') + '">Você marcou ' + LET[r.k] + ') <span lang="es">' + it.opts[r.k] + '</span></p>'
      } else tua = '<p class="yours">' + (r.txt ? 'Você escreveu: <span lang="es">' + esc(r.txt) + '</span>' : 'Em branco.') + '</p>'
      h += '<article class="sx-glass" data-id="' + esc(id) + '"><p class="ts-meta">' + (n + 1) + ' · ' + esc(d.temas[it.th] || '') + '</p><p class="q" lang="es">' + it.q + '</p>' + tua + explicacao(d, it) +
        (isProva(it) ? '<p class="prova-nota">Esta questão caiu em <b>' + esc(it.src) + '</b>. Vale memorizar o raciocínio, porque a professora já cobrou isso em prova.</p>' : '') +
        (it.tipo !== 'mc' ? '<div class="grade" role="group" aria-label="Como foi"><button type="button" class="g0" data-g="0" aria-pressed="' + (r.g === 0) + '">Errei</button><button type="button" class="g1" data-g="0.5" aria-pressed="' + (r.g === 0.5) + '">Quase</button><button type="button" class="g2" data-g="1" aria-pressed="' + (r.g === 1) + '">Acertei</button></div>' : '') + '</article>'
    })
    h += '</div><div class="ts-act"><button class="sx-btn sx-primary" type="button" id="corr-ok">Ver a nota</button></div><p class="sx-msg" id="corr-msg" role="status"></p></div>'
    view.innerHTML = h; salvarS()
    $$('.corr .grade').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return
        var id = g.closest('article').dataset.id
        $$('button', g).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)) })
        S.resp[id] = S.resp[id] || {}; S.resp[id].g = +b.dataset.g; salvarS()
      })
    })
    $('#corr-ok').addEventListener('click', function () {
      var falta = S.ids.filter(function (id) { var it = d.mapa[id]; return it && (S.resp[id] || {}).g == null })
      if (falta.length) { $('#corr-msg').textContent = 'Falta marcar ' + falta.length + (falta.length === 1 ? ' resposta aberta.' : ' respostas abertas.'); var a = $('[data-id="' + falta[0] + '"]'); if (a) a.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
      S.ids.forEach(function (id) { if (d.mapa[id]) anotar(id, S.resp[id].g) })
      fim(d)
    })
  }

  function fim(d) {
    clearInterval(relT)
    var ids = S.ids.filter(function (id) { return d.mapa[id] && S.resp[id] && S.resp[id].g != null })
    var total = ids.length, acertos = ids.reduce(function (a, id) { return a + S.resp[id].g }, 0)
    if (!S.salvo && total) {
      S.salvo = true
      var resp = {}; ids.forEach(function (id) { resp[id] = S.resp[id].g })
      prog.hist.unshift({ em: Date.now(), titulo: S.titulo, modo: S.modo, acertos: acertos, total: total }); prog.hist = prog.hist.slice(0, 20)
      if (S.modo === 'simulado') { var pct0 = acertos / total; if (prog.sim[S.arg] == null || pct0 > prog.sim[S.arg]) prog.sim[S.arg] = pct0 }
      store.set('treino', prog)
      if (usuario) db.collection('treinos').add({ uid: usuario.uid, aula: AULA, modo: S.modo, total: total, acertos: acertos, resp: resp, em: FV.serverTimestamp() }).catch(function () {})
    }
    S.fase = 'fim'; salvarS()
    var pct = total ? acertos / total : 0
    var porTema = {}
    ids.forEach(function (id) { var th = d.mapa[id].th; var t = porTema[th] = porTema[th] || { a: 0, n: 0 }; t.n++; t.a += S.resp[id].g })
    var errados = ids.filter(function (id) { return S.resp[id].g < 1 })
    var msgTxt = !total ? 'Nenhuma pergunta respondida nesta rodada.' : pct >= 0.85 ? 'Ótimo. Esse conteúdo está firme; as perguntas acertadas só voltam daqui a alguns dias.' : pct >= 0.6 ? 'Bom caminho. As que você errou já estão na fila de revisão e voltam no próximo treino do dia.' : 'Essa rodada mostrou bem onde estão as falhas. Vale rever os temas abaixo na aula ou no PDF e treinar os erros de novo.'
    var tempo = S.tempo || (Date.now() - S.ini), min = Math.max(1, Math.round(tempo / 60000))
    view.innerHTML = '<div class="tr-wrap"><span class="sx-tag">' + esc(S.titulo) + '</span>' +
      '<div class="tr-res-top"><p class="tr-score"><em>' + fmtNum(acertos) + '</em> de ' + total + '</p><p>' + Math.round(pct * 100) + '% · ' + min + (min === 1 ? ' minuto' : ' minutos') + '</p></div>' +
      '<p class="tr-msg">' + msgTxt + '</p>' +
      (Object.keys(porTema).length > 1 ? '<div class="tr-th sx-glass"><div class="tr-list" style="padding:0">' + Object.keys(porTema).map(function (k) {
        var t = porTema[k]; return '<div class="tr-row"><span class="t">' + esc(d.temas[k] || k) + '</span><span class="mbar"><i style="width:' + Math.round(t.a / t.n * 100) + '%"></i></span><span class="n">' + fmtNum(t.a) + ' / ' + t.n + '</span></div>'
      }).join('') + '</div></div>' : '') +
      (errados.length ? '<section class="tr-sec"><h2 class="sx-h2">Para rever</h2><div class="tr-miss">' + errados.map(function (id) {
        var it = d.mapa[id]; return '<article class="sx-glass"><p class="ts-meta">' + esc(S.resp[id].g === 0.5 ? 'Quase' : 'Errou') + ' · ' + esc(d.temas[it.th] || '') + '</p><p class="q" lang="es">' + it.q + '</p>' + explicacao(d, it) + '</article>'
      }).join('') + '</div></section>' : '') +
      '<div class="tr-acts">' + (errados.length ? '<button class="sx-btn sx-primary" type="button" id="fim-err">Treinar estes ' + errados.length + ' de novo</button>' : '') +
        '<button class="sx-btn' + (errados.length ? '' : ' sx-primary') + '" type="button" id="fim-dia">Novo treino do dia</button><button class="sx-btn" type="button" id="fim-volta">Voltar ao treino</button></div></div>'
    scrollTo(0, 0)
    if (errados.length) $('#fim-err').addEventListener('click', function () { comecar(d, 'rodada', '', embaralhar(errados)) })
    $('#fim-dia').addEventListener('click', function () { comecar(d, 'dia') })
    $('#fim-volta').addEventListener('click', function () { S = null; salvarS(); inicioTreino(d) })
  }
})()
