/* Sinus · integração do painel com a conta Google, o cadastro e o conteúdo do Sinus.
   O código original do painel fica em sinus/painel.js; aqui só entram:
   entrada (idioma + Google), personalização, matérias com os arquivos do Drive,
   flashcards, apostila, horário e avisos, perfil, tema claro/escuro e navegação no celular. */
(function () {
  'use strict';
  var W = window, D = document;
  var $id = function (i) { return D.getElementById(i) };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)) };
  var H = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] }) };
  var norm = function (s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() };
  var T = function (s) { return W.SinusI18n ? W.SinusI18n.t(s) : s };

  var CAT = W.SINUS_CATALOGO || { materias: [] };
  var DECKS = W.SINUS_CARTOES || {};
  var HOR = W.SINUS_HORARIO || {};
  var AVISOS = W.SINUS_AVISOS || [];
  var DONO = String(W.SINUSAL_DONO || 'felpsguimaraes@gmail.com').toLowerCase();

  var NOMES = { anatopato: 'Anatomía Patológica I', farmacologia: 'Farmacología I', fisiopatologia: 'Fisiopatología I', imagenologia: 'Imagenología', familia: 'Medicina de la Familia', semiologia: 'Semiología Médica I' };
  var SLUG = {}; Object.keys(NOMES).forEach(function (k) { SLUG[NOMES[k]] = k });
  var DIAS = [['lun', 'Seg'], ['mar', 'Ter'], ['mie', 'Qua'], ['jue', 'Qui'], ['vie', 'Sex'], ['sab', 'Sáb']];
  var SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  var AVISO = {
    'prova-pratica': ['Prova prática', 't-prova-pratica', '#b42318'], 'prova-teorica': ['Prova teórica', 't-prova-teorica', '#6941c6'],
    'evento': ['Evento', 't-evento', '#0e7490'], 'recuperacao': ['Recuperação', 't-recuperacao', '#a15c07'],
    'a-confirmar': ['Confirmar', 't-a-confirmar', '#475467'], 'atividade': ['Atividade', 't-atividade', '#b54708']
  };

  // ---------------------------------------------------------------- estado
  var S = { uid: '', email: '', nome: '', turma: '', whatsapp: '', perfil: null, prefs: {}, dono: false, dentro: false };
  var SESSAO = null; // usuário que o painel enxerga em user()

  // ---------------------------------------------------------------- tema claro/escuro
  function temaAtual() { return D.documentElement.getAttribute('data-theme') === 'dark' ? 'escuro' : 'claro' }
  function aplicarTema(t) {
    D.documentElement.setAttribute('data-theme', t === 'escuro' ? 'dark' : 'light');
    try { localStorage.setItem('sinus_tema', t) } catch (e) {}
    var m = D.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'escuro' ? '#0f1814' : '#1f7a5d');
    qsa('[data-sx-tema]').forEach(function (b) { b.textContent = t === 'escuro' ? '☀' : '☾'; b.title = t === 'escuro' ? 'Fundo claro' : 'Fundo escuro' });
  }
  function alternarTema() { aplicarTema(temaAtual() === 'escuro' ? 'claro' : 'escuro'); if (S.uid && S.dentro) salvarPrefs({ tema: temaAtual() }) }

  // ---------------------------------------------------------------- idioma
  function idioma() {
    try { var l = localStorage.getItem('sinus_idioma'); if (l === 'pt' || l === 'es' || l === 'en') return l } catch (e) {}
    var n = String(navigator.language || 'pt').slice(0, 2).toLowerCase();
    return n === 'es' ? 'es' : n === 'en' ? 'en' : 'pt';
  }
  function definirIdioma(l, salvar) {
    if (['pt', 'es', 'en'].indexOf(l) < 0) l = 'pt';
    try { localStorage.setItem('sinus_idioma', l) } catch (e) {}
    D.documentElement.lang = { pt: 'pt-BR', es: 'es', en: 'en' }[l];
    if (W.SinusI18n) W.SinusI18n.set(l);
    try { auth.languageCode = l } catch (e) {}
    qsa('[data-sx-lang]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-sx-lang') === l) });
    qsa('[data-sx-lang-select]').forEach(function (s) { s.value = l });
    if (salvar && S.uid && S.dentro) salvarPrefs({ idioma: l });
  }

  // ---------------------------------------------------------------- Firebase
  firebase.initializeApp(W.SINUSAL_FIREBASE);
  var auth = firebase.auth(), db = firebase.firestore();
  try { auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {}) } catch (e) {}
  var agora = function () { return firebase.firestore.FieldValue.serverTimestamp() };

  function msg(t, erro) { var m = $id('sxMsg'); if (!m) return; m.textContent = t || ''; m.className = 'sxMsg' + (erro ? ' erro' : '') }
  function standalone() { return (W.matchMedia && W.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true }
  function ehIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) }

  function entrar() {
    var b = $id('sxEntrar');
    var g = new firebase.auth.GoogleAuthProvider(); g.setCustomParameters({ prompt: 'select_account' });
    if (b) b.disabled = true; msg('Abrindo a entrada do Google…');
    auth.signInWithPopup(g).catch(function (e) {
      var c = (e && e.code) || '';
      if (c === 'auth/popup-blocked' || c === 'auth/operation-not-supported-in-this-environment' || c === 'auth/web-storage-unsupported') {
        try { sessionStorage.setItem('sinus_redirect', '1') } catch (_) {}
        return auth.signInWithRedirect(g);
      }
      if (b) b.disabled = false;
      if (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') return msg('');
      if (c === 'auth/unauthorized-domain') return msg('Este endereço ainda não está autorizado no login do Google.', true);
      if (c === 'auth/network-request-failed') return msg('Sem conexão. Confira a internet e tente de novo.', true);
      msg('Não foi possível entrar. Tente de novo.' + (c ? ' (' + c + ')' : ''), true);
    });
  }
  auth.getRedirectResult().then(function (r) {
    var tentou = false; try { tentou = sessionStorage.getItem('sinus_redirect') === '1'; sessionStorage.removeItem('sinus_redirect') } catch (e) {}
    if (tentou && !(r && r.user) && !auth.currentUser) msg(standalone() && ehIOS() ? 'O login não voltou para o ícone. Abra o Sinus pelo Safari, entre por lá e depois use o ícone.' : 'O Google não devolveu o login. Tente de novo.', true);
  }).catch(function (e) { msg('Não foi possível entrar.' + (e && e.code ? ' (' + e.code + ')' : ''), true) });

  function sair() { auth.signOut().then(function () { try { sessionStorage.clear() } catch (e) {} location.replace('/') }) }

  // ---------------------------------------------------------------- telas
  function mostrar(qual) {
    $id('landing').classList.toggle('hidden', qual !== 'entrada');
    $id('sxOnboarding').classList.toggle('hidden', qual !== 'personalizacao');
    if (qual !== 'painel') { $id('app').classList.add('hidden'); $id('subjectView').classList.add('hidden'); $id('admin').classList.add('hidden') }
    W.scrollTo(0, 0);
  }
  function mostrarEntrada() { S.dentro = false; mostrar('entrada'); var b = $id('sxEntrar'); if (b) b.disabled = false }

  auth.onAuthStateChanged(function (u) {
    if (!u) { S.uid = ''; return mostrarEntrada() }
    S.uid = u.uid; S.email = String(u.email || '').toLowerCase(); S.dono = S.email === DONO;
    S.nomeGoogle = u.displayName || '';
    msg('Carregando seu espaço…');
    var local = {}; try { local = JSON.parse(localStorage.getItem('sinus_prefs_' + u.uid) || '{}') } catch (e) {}
    Promise.all([
      db.doc('perfis/' + u.uid).get(),
      db.doc('progresso/' + u.uid + '_sinus-perfil').get().catch(function () { return null })
    ]).then(function (r) {
      S.perfil = r[0].exists ? r[0].data() : null;
      S.prefs = Object.assign({}, local, (r[1] && r[1].exists && r[1].data().prog) || {});
      S.nome = (S.perfil && S.perfil.nome) || S.nomeGoogle;
      S.turma = (S.perfil && S.perfil.turma) || '';
      S.whatsapp = (S.perfil && S.perfil.whatsapp) || '';
      if (S.prefs.idioma && S.prefs.idioma !== idioma()) definirIdioma(S.prefs.idioma, false);
      if (S.prefs.tema && S.prefs.tema !== temaAtual()) aplicarTema(S.prefs.tema);
      msg('');
      var completo = !!(S.perfil && S.perfil.nome && S.perfil.turma && S.perfil.whatsapp);
      if (!completo || !S.prefs.onboarding) return abrirPersonalizacao();
      entrarNoPainel();
    }).catch(function () {
      msg('Não foi possível carregar seu cadastro. Confira a internet e tente de novo.', true);
      mostrarEntrada();
    });
  });

  // ---------------------------------------------------------------- personalização
  var deferredInstall = null;
  W.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; if (P && PASSOS[P.passo] === 'icone') renderOnb() });
  W.addEventListener('appinstalled', function () { deferredInstall = null; if (P) { P.instalou = true; renderOnb() } });

  var PASSOS = ['nome', 'icone', 'apresentacao', 'turma', 'foco', 'jeito', 'indicacao', 'pronto'];
  var P = null;
  var GRUPOS_MATERIA = ['Semiología Médica I', 'Anatomía Patológica I'];

  function abrirPersonalizacao() {
    var pr = S.prefs || {};
    P = {
      passo: 0, nome: S.nome || '', whatsapp: S.whatsapp || '',
      faculdade: pr.faculdade || 'UCP', campus: pr.campus || 'Ciudad del Este', periodo: pr.periodo || 5,
      turma: S.turma || pr.turma || '', grupo: pr.grupo || '', papel: pr.papel || 'Estudante',
      gruposMateria: Object.assign({}, pr.gruposMateria || {}), foco: pr.foco || 'semestre',
      estilos: (pr.estilos || []).slice(), indicacao: pr.indicacao || '', erro: '', salvando: false
    };
    mostrar('personalizacao');
    renderOnb();
  }

  function campoSel(id, rotulo, opcoes, valor) {
    return '<label class="field"><span>' + H(rotulo) + '</span><select id="' + id + '">' + opcoes.map(function (o) {
      var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o;
      return '<option value="' + H(v) + '"' + (String(v) === String(valor) ? ' selected' : '') + '>' + H(t) + '</option>';
    }).join('') + '</select></label>';
  }

  function corpoPasso(k) {
    if (k === 'nome') return {
      eyebrow: 'Vamos começar pelo seu nome', titulo: 'Como te <em>chamamos?</em>', lead: 'Seu espaço de estudo merece a sua cara.',
      corpo: '<label class="field"><span>Nome ou apelido</span><input id="pNome" autocomplete="name" maxlength="80" value="' + H(P.nome) + '" placeholder="Seu nome"></label>' +
        '<label class="field"><span>E-mail da sua conta Google</span><input value="' + H(S.email) + '" readonly></label>' +
        '<label class="field"><span>WhatsApp, só números, com código do país</span><input id="pZap" inputmode="numeric" autocomplete="tel" value="' + H(P.whatsapp) + '" placeholder="595981234567"></label>' +
        '<p class="sxHint">Cada número fica com uma conta só. Usamos para avisar quando sair aula nova.</p>'
    };
    if (k === 'icone') {
      var c;
      if (standalone() || P.instalou) c = '<div class="sxInstall"><p class="ok">✓ O Sinus já está na sua tela de início.</p></div>';
      else if (deferredInstall) c = '<div class="sxInstall"><p>Toque no botão e confirme. O ícone aparece na sua tela de início e abre direto no seu painel.</p><button class="btn primary" type="button" data-sx-instalar style="margin-top:12px">Adicionar à tela de início</button></div>';
      else if (ehIOS()) c = '<div class="sxInstall"><b>No iPhone ou iPad, pelo Safari:</b><ol><li>Toque em <b>Compartilhar</b> (o quadrado com a seta para cima).</li><li>Escolha <b>Adicionar à Tela de Início</b>.</li><li>Toque em <b>Adicionar</b>.</li></ol><p class="sxHint" style="margin-top:8px">O ícone abre o Sinus como app. Na primeira vez, entre com o Google de novo por ele.</p></div>';
      else c = '<div class="sxInstall"><b>No Android ou no computador:</b><ol><li>Abra o menu do navegador (⋮).</li><li>Escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</li><li>Confirme.</li></ol></div>';
      return { eyebrow: 'Leve o Sinus com você', titulo: 'Coloque o ícone na sua <em>tela de início.</em>', lead: 'Abre como um app, em tela cheia, direto no seu painel.', corpo: c, pular: true };
    }
    if (k === 'apresentacao') return {
      eyebrow: 'Oi, somos o Sinus.', titulo: 'Mais espaço para aprender.<br><em>Menos coisas para procurar.</em>', lead: 'Você chega com uma aula, um PDF e pouco tempo. Aqui, tudo encontra o seu lugar.',
      corpo: '<div class="sxPoints"><div class="sxPoint"><b>01</b><span>Seu período e sua turma, primeiro.</span></div><div class="sxPoint"><b>02</b><span>Seu material dentro de cada matéria.</span></div><div class="sxPoint"><b>03</b><span>Seu estudo continua de onde parou.</span></div></div>' +
        '<div class="sxConnect"><span class="eyebrow">Meu espaço · Tudo se conecta</span><h3>Seu estudo, do seu jeito.</h3><div class="row"><span>Materiais</span><span>Aulas</span><span>Caderno</span></div><small>Tudo salvo no seu espaço. Você continua de onde parou.</small></div>'
    };
    if (k === 'turma') {
      var g = '<div class="sxGroups"><h4>Seu grupo em cada matéria</h4><p class="sxHint">O grupo pode mudar de uma matéria para outra. A agenda usa cada escolha para mostrar suas aulas práticas.</p>' +
        GRUPOS_MATERIA.map(function (m, i) {
          return campoSel('pGm' + i, m, [['', 'Todos os grupos'], ['Grupo 1', 'Grupo 1 · GP01'], ['Grupo 2', 'Grupo 2 · GP02'], ['Grupo 3', 'Grupo 3 · GP03']], P.gruposMateria[m] || '');
        }).join('') + '</div>';
      return {
        eyebrow: 'Um espaço que entende sua turma', titulo: 'Qual é o seu <em>momento na Medicina?</em>', lead: 'Vamos organizar suas matérias e seus horários a partir daqui. Você pode mudar tudo no Perfil depois.',
        corpo: '<div class="grid2">' + campoSel('pFac', 'Faculdade', ['UCP', 'Outra'], P.faculdade) +
          '<label class="field"><span>Campus</span><input id="pCampus" value="' + H(P.campus) + '" placeholder="Ciudad del Este"></label></div>' +
          '<div class="grid2">' + campoSel('pPer', 'Período', Array.from({ length: 10 }, function (_, i) { return [String(i + 1), (i + 1) + 'º período'] }), P.periodo) +
          campoSel('pTurma', 'Turma (sección)', [['', 'Escolha']].concat('ABCDEFG'.split('').map(function (x) { return [x, x] })), P.turma) + '</div>' +
          '<div class="grid2">' + campoSel('pGrupo', 'Grupo padrão de prática', [['', 'Todos os grupos']].concat(['GP01', 'GP02', 'GP03', 'GP04', 'GP05', 'GP06', 'GP07', 'GP08'].map(function (x) { return [x, x] })), P.grupo) +
          campoSel('pPapel', 'Você participa como', ['Estudante', 'Monitor', 'Delegado'], P.papel) + '</div>' + g +
          '<p class="sxHint">As escolhas são guardadas por faculdade, campus, período e turma. As aulas teóricas continuam na agenda.</p>'
      };
    }
    if (k === 'foco') return {
      eyebrow: 'Um passo de cada vez', titulo: 'Eu organizo seu <em>próximo passo.</em>', lead: 'Qual é o seu foco agora? Seu espaço pode acompanhar cada fase da jornada.',
      corpo: '<div class="sxChoices">' + [['semestre', 'Cuidar do meu semestre', 'Matérias, aulas e provas da faculdade.'], ['internato', 'Viver o internato', 'Rodízios, prática e revisão organizada.'], ['revalida', 'Preparar para o Revalida', 'Organizar meu material de preparação.']].map(function (o) {
        return '<button type="button" class="sxChoice' + (P.foco === o[0] ? ' on' : '') + '" data-sx-foco="' + o[0] + '"><span><b>' + H(o[1]) + '</b><small>' + H(o[2]) + '</small></span><span class="tick">' + (P.foco === o[0] ? '✓' : '') + '</span></button>';
      }).join('') + '</div><p class="sxHint">Seu objetivo orienta o espaço. Você escolhe o ritmo.</p>'
    };
    if (k === 'jeito') return {
      eyebrow: 'Existe mais de um jeito de aprender', titulo: 'Como você gosta de <em>estudar?</em>', lead: 'Escolha seus formatos favoritos. Pode marcar mais de um.',
      corpo: '<div class="sxChips">' + ['Resumos', 'Questões', 'Flashcards', 'Aulas em vídeo', 'Áudio e podcast', 'Mapas mentais'].map(function (o) {
        return '<button type="button" class="' + (P.estilos.indexOf(o) >= 0 ? 'on' : '') + '" data-sx-estilo="' + H(o) + '">' + H(o) + '</button>';
      }).join('') + '</div><p class="sxHint">Seu material fica em Materiais, Aulas e Caderno, dentro de cada matéria.</p>'
    };
    if (k === 'indicacao') return {
      eyebrow: 'A comunidade começa com gente', titulo: 'Alguém te <em>indicou?</em>', lead: 'Se quiser, conte de onde veio. Esse campo é opcional.',
      corpo: '<label class="field"><span>Nome ou código de indicação</span><input id="pInd" maxlength="80" value="' + H(P.indicacao) + '"></label>', pular: true
    };
    // pronto
    return {
      eyebrow: 'Pronto para o próximo passo', titulo: 'Já sei o suficiente <em>para começar com você.</em>',
      lead: (P.nome ? P.nome.split(' ')[0] + ', este' : 'Este') + ' é o seu espaço. Materiais, notas e aulas vão morar nas suas matérias.',
      corpo: '<div class="sxSummary"><div><span>Sua turma</span><b>' + H(P.faculdade) + ' · ' + H(P.periodo) + 'º ' + H(P.turma) + '</b></div><div><span>Seu jeito</span><b>' + H(P.estilos.length ? P.estilos.join(' + ') : 'Do seu jeito') + '</b></div></div>'
    };
  }

  function renderOnb() {
    if (!P) return;
    var k = PASSOS[P.passo], c = corpoPasso(k), n = P.passo + 1, total = PASSOS.length;
    var ultimo = k === 'pronto';
    $id('sxOnboarding').innerHTML = '<section class="glass sxOnb">' +
      '<div class="sxOnbTop"><div class="logo"><span class="logoMark">S</span><span>sinus.</span></div><div class="topbarRight">' +
      '<select class="sxLangMini" data-sx-lang-select aria-label="Idioma do painel"><option value="pt">PT</option><option value="es">ES</option><option value="en">EN</option></select>' +
      '<button class="btn sm sxThemeBtn" type="button" data-sx-tema aria-label="Alternar fundo claro ou escuro">☾</button></div></div>' +
      '<div class="sxBar"><i style="width:' + Math.round(n / total * 100) + '%"></i></div>' +
      '<span class="eyebrow">' + c.eyebrow + '</span><h2>' + c.titulo + '</h2><p class="lead">' + c.lead + '</p>' +
      '<div class="sxOnbBody">' + c.corpo + '</div>' +
      '<p class="sxErr" id="pErr">' + H(P.erro || '') + '</p>' +
      '<div class="sxOnbFoot"><span class="sxStep">' + n + ' de ' + total + ' · seu espaço, no seu ritmo</span><div class="btns">' +
      (P.passo > 0 ? '<button class="btn" type="button" data-sx-onb="voltar">Voltar</button>' : (S.dentro ? '<button class="btn" type="button" data-sx-onb="cancelar">Voltar ao painel</button>' : '<button class="btn" type="button" data-sx-sair>Sair</button>')) +
      (c.pular ? '<button class="btn" type="button" data-sx-onb="pular">Pular esta etapa</button>' : '') +
      '<button class="btn primary" type="button" data-sx-onb="seguir"' + (P.salvando ? ' disabled' : '') + '>' + (ultimo ? (P.salvando ? 'Salvando…' : 'Entrar no meu espaço') : 'Continuar') + '</button>' +
      '</div></div><p class="sxHint" style="margin-top:10px">Você pode voltar e editar quando quiser.</p></section>';
    aplicarTema(temaAtual()); definirIdioma(idioma(), false);
  }

  function lerPasso() {
    var k = PASSOS[P.passo], v = function (id) { var e = $id(id); return e ? e.value : '' };
    if (k === 'nome') { P.nome = v('pNome').trim(); P.whatsapp = v('pZap').replace(/\D/g, '') }
    if (k === 'turma') {
      P.faculdade = v('pFac') || 'UCP'; P.campus = v('pCampus').trim(); P.periodo = Number(v('pPer') || 5);
      P.turma = v('pTurma'); P.grupo = v('pGrupo'); P.papel = v('pPapel') || 'Estudante';
      GRUPOS_MATERIA.forEach(function (m, i) { var x = v('pGm' + i); if (x) P.gruposMateria[m] = x; else delete P.gruposMateria[m] });
    }
    if (k === 'indicacao') P.indicacao = v('pInd').trim();
  }
  function validarPasso() {
    var k = PASSOS[P.passo];
    if (k === 'nome') {
      if (P.nome.length < 3) return 'Escreva seu nome (pelo menos 3 letras).';
      if (!/^[0-9]{8,15}$/.test(P.whatsapp)) return 'Confira o WhatsApp: só números, com o código do país (8 a 15 dígitos).';
    }
    if (k === 'turma' && !P.turma) return 'Escolha a sua turma (sección).';
    return '';
  }

  function salvarPersonalizacao() {
    P.salvando = true; P.erro = ''; renderOnb();
    var lote = db.batch(), zap = P.whatsapp, novoZap = !S.perfil || S.perfil.whatsapp !== zap;
    var perfil = { nome: P.nome, turma: P.turma, whatsapp: zap, email: S.email, ultimo_acesso: agora() };
    if (!S.perfil) perfil.primeiro_acesso = agora();
    if (novoZap) lote.set(db.doc('whats/' + zap), { uid: S.uid, em: agora() });
    lote.set(db.doc('perfis/' + S.uid), perfil, { merge: true });
    var semZap = function () { var l2 = db.batch(); l2.set(db.doc('perfis/' + S.uid), perfil, { merge: true }); return l2.commit() };
    lote.commit().catch(function (e) {
      if (!novoZap) throw e;
      // o número pode já ser desta conta (reserva antiga): confere e grava só o perfil
      return db.doc('whats/' + zap).get().then(function (w) {
        if (w.exists && w.data().uid === S.uid) return semZap();
        throw { code: 'whats-ocupado' };
      });
    }).then(function () {
      S.perfil = Object.assign({}, S.perfil || {}, { nome: P.nome, turma: P.turma, whatsapp: zap, email: S.email });
      S.nome = P.nome; S.turma = P.turma; S.whatsapp = zap;
      return salvarPrefs({
        onboarding: true, idioma: idioma(), tema: temaAtual(), faculdade: P.faculdade, campus: P.campus, periodo: P.periodo,
        turma: P.turma, grupo: P.grupo, papel: P.papel, gruposMateria: P.gruposMateria, foco: P.foco, estilos: P.estilos, indicacao: P.indicacao
      });
    }).then(function () { P = null; entrarNoPainel() }).catch(function (e) {
      P.salvando = false;
      P.erro = e && e.code === 'whats-ocupado' ? 'Esse WhatsApp já está em outra conta. Use a conta dele ou outro número.' : 'Não foi possível salvar. Confira a internet e tente de novo.';
      if (e && e.code === 'whats-ocupado') P.passo = 0;
      renderOnb();
    });
  }

  function salvarPrefs(patch) {
    S.prefs = Object.assign({}, S.prefs || {}, patch || {}, { atualizado: new Date().toISOString() });
    try { localStorage.setItem('sinus_prefs_' + S.uid, JSON.stringify(S.prefs)) } catch (e) {}
    if (!S.uid) return Promise.resolve();
    return db.doc('progresso/' + S.uid + '_sinus-perfil').set({ uid: S.uid, aula: 'sinus-perfil', prog: S.prefs, em: agora() }, { merge: true }).catch(function () {});
  }

  // ---------------------------------------------------------------- dados do Sinus dentro do painel
  function sobrenome(p) { return norm((p && (p.curto || p.nome)) || '').split(' ').pop() }
  function profTeoria(m) { var t = m.teoria || []; return t.filter(function (x) { return S.turma && x.turmas.indexOf(S.turma) >= 0 })[0] || t[0] || null }
  function profPratica(m) { var t = m.pratica || []; return t.filter(function (x) { return S.turma && x.turmas.indexOf(S.turma) >= 0 })[0] || t[0] || null }
  function ordenar(lista, p) {
    var sn = p ? sobrenome(p) : '', tu = (p && p.turmas) || [];
    return lista.map(function (i, n) {
      var sc = 0;
      if (sn && norm(i.t).indexOf(sn) >= 0) sc += 2;
      if (i.o && tu.some(function (t) { return norm(i.o).indexOf('turma ' + norm(t)) >= 0 })) sc += 1;
      if (S.turma && norm(i.o) === 'turma ' + norm(S.turma)) sc += 1;
      return { i: i, s: sc, n: n };
    }).sort(function (a, b) { return b.s - a.s || a.n - b.n }).map(function (x) { return x.i });
  }
  function tipoArq(i) {
    var m = i.mime || '';
    if (/pdf/.test(m)) return 'PDF';
    if (/presentation|powerpoint/.test(m)) return 'Slides';
    if (/word|document/.test(m)) return 'Documento';
    if (/^image\//.test(m)) return 'Imagem';
    if (/^video\//.test(m)) return 'Vídeo';
    if (/^audio\//.test(m)) return 'Áudio';
    return 'Arquivo';
  }
  var RE_PRATICA = /l[aá]mina|macrosc|h[ií]gado|coraz[oó]n|pulm[oó]n|ri[ñn][oó]n|est[oó]mago|bazo|cerebro|intestino|ves[ií]cula|pr[aá]ctic/i;
  function classificar(m, i) {
    var img = /^image\//.test(i.mime || ''), t = i.t || '', temPratica = !!(m.pratica && m.pratica.length);
    if (i.k === 'pratica') return { cat: 'pratica', mode: 'practice', sec: /macrosc/i.test(t) ? 'macro' : 'laminas', kind: img ? 'Imagem' : 'Prática' };
    if (temPratica && RE_PRATICA.test(t)) {
      if (/macrosc/i.test(t)) return { cat: 'pratica', mode: 'practice', sec: 'macro', kind: 'Macroscopia' };
      if (i.k === 'video') return { cat: 'videos', mode: 'practice', sec: 'videos', kind: 'Vídeo' };
      if (i.k === 'audio') return { cat: 'audios', mode: 'practice', sec: 'audios', kind: 'Áudio' };
      return { cat: 'pratica', mode: 'practice', sec: 'laminas', kind: img ? 'Imagem' : 'Lâmina' };
    }
    if (i.k === 'slide') return { cat: 'slides', mode: 'theory', sec: 'slides', kind: tipoArq(i) };
    if (i.k === 'prova') return { cat: 'provas', mode: 'theory', sec: 'provas', kind: img ? 'Imagem' : 'Prova' };
    if (i.k === 'audio') return { cat: 'audios', mode: 'theory', sec: 'audios', kind: 'Áudio' };
    if (i.k === 'video') return { cat: 'videos', mode: 'theory', sec: 'videos', kind: 'Vídeo' };
    if (img) return { cat: 'complementares', mode: 'theory', sec: 'fotos', kind: 'Foto da aula' };
    if (i.k === 'livro') return { cat: 'complementares', mode: 'theory', sec: 'complementares', kind: 'Livro' };
    return { cat: 'complementares', mode: 'theory', sec: 'complementares', kind: tipoArq(i) };
  }
  function montarMaterias() {
    var out = {};
    (CAT.materias || []).forEach(function (m) {
      var nome = NOMES[m.slug] || m.nome, pt = profTeoria(m), pp = profPratica(m);
      var s = {
        teacher: pt ? pt.nome : '', practiceTeacher: pp ? pp.nome : '', mode: (m.pratica && m.pratica.length) ? 'Teoria + Prática' : 'Teoria',
        accent: 'mint', slides: [], provas: [], audios: [], videos: [], pratica: [], complementares: [], id: 'sx_' + m.slug, active: true, period: 5, slug: m.slug
      };
      ordenar(m.itensLista || [], pt).forEach(function (i, n) {
        var c = classificar(m, i);
        s[c.cat].push({ title: i.t, period: i.o || 'Geral', kind: c.kind, id: i.id, uid: 'sx_' + m.slug + '_' + n + '_' + String(i.id).slice(0, 10), active: true, studyMode: c.mode, studySection: c.sec, mime: i.mime || '' });
      });
      out[nome] = s;
    });
    return out;
  }
  function montarHorarios() {
    var out = {};
    Object.keys(HOR).forEach(function (t) {
      var d = HOR[t], dias = {};
      Object.keys(d.dias || {}).forEach(function (k) {
        dias[k] = (d.dias[k] || []).map(function (x) { return { time: x[0] + '-' + x[1], mat: x[2], prof: x[3], tipo: x[4], gp: x[5] || '', loc: x[6] || '' } });
      });
      out[t] = { sala: d.sala, dias: dias };
    });
    return out;
  }
  function montarQuestoes() {
    var qs = [];
    Object.keys(DECKS).forEach(function (key) {
      var slug = key.split('/')[0], deck = DECKS[key], nome = NOMES[slug];
      if (!nome) return;
      (deck.cartoes || []).forEach(function (c) {
        qs.push({ id: 'fc_' + key.replace('/', '_') + '_' + c.id, subject: nome, period: 'Geral', mode: 'theory', type: 'flashcard', difficulty: 'hard', prompt: c.q, options: [], pairs: [], answer: c.a, explanation: (c.x || '') + (deck.nome ? ' · ' + deck.nome : ''), image: null, active: true, deck: key, topic: c.t });
      });
    });
    return qs;
  }
  function gruposDoAluno() { var g = Object.assign({}, (S.prefs && S.prefs.gruposMateria) || {}); return g }

  function montarDados() {
    var per = Number((S.prefs && S.prefs.periodo) || 5);
    SESSAO = {
      id: S.uid, name: S.nome || S.nomeGoogle || 'Aluno', email: S.email, role: S.dono ? 'admin' : 'student', status: 'active', planId: 'sinus',
      period: per + 'º período', class: S.turma || 'G', group: (S.prefs && S.prefs.grupo) || 'GP01', devices: 1,
      createdAt: new Date().toISOString(), lastSeenAt: new Date().toISOString(), subjectGroups: gruposDoAluno(), rotationAssignments: {}
    };
    if (!DB.plans.some(function (p) { return p.id === 'sinus' })) DB.plans.push({ id: 'sinus', name: 'Acesso completo', priceCents: 0, active: false, description: 'Lançamento do Sinus', features: ['Todo o conteúdo liberado'], limits: { previews: 9999, examFiles: 9999, transcriptionsMonth: 100 } });
    DB.users = [SESSAO];
    DB.sales = [];
    DB.subjects = montarMaterias();
    DB.schedules = montarHorarios();
    DB.training = DB.training || { types: [], questions: [] };
    DB.training.questions = montarQuestoes();
    DB.settings = DB.settings || {}; DB.settings.brandName = 'Sinus';
    try { v11Initialize() } catch (e) {}
    SCHEDULE_UI.period = per; SCHEDULE_UI.className = SESSAO.class; SCHEDULE_UI.index = 0; SCHEDULE_UI.digital = false;
    if (S.dono) carregarAlunos();
  }
  function carregarAlunos() {
    db.collection('perfis').limit(500).get().then(function (snap) {
      var lista = [];
      snap.forEach(function (d) {
        var p = d.data(); if (d.id === S.uid) return;
        var ts = function (x) { return x && x.toDate ? x.toDate().toISOString() : '' };
        lista.push({ id: d.id, name: p.nome || '—', email: p.email || '', role: 'student', status: 'active', planId: 'sinus', period: '5º período', class: p.turma || '—', group: '', devices: 1, createdAt: ts(p.primeiro_acesso), lastSeenAt: ts(p.ultimo_acesso), whatsapp: p.whatsapp || '' });
      });
      DB.users = [SESSAO].concat(lista);
    }).catch(function () {});
  }

  // ---------------------------------------------------------------- substituições no painel
  W.user = function () { return SESSAO || DB.users[0] };

  // nunca persistir dados de outro aluno no aparelho: o painel volta a montar tudo a cada entrada
  var _saveDB = W.saveDB;
  W.saveDB = function () { if (!S.dono) { toast('Salvo neste aparelho'); try { SAFE_STORE.setItem('sinusalEditorialDB', JSON.stringify(DB)) } catch (e) {} return } _saveDB() };
  var _resetDemo = W.resetDemo;
  W.resetDemo = function () { if (!S.dono) return; _resetDemo(); montarDados(); renderAll() };
  var _enterAdmin = W.enterAdmin;
  W.enterAdmin = function () { if (!S.dono) return toast('Área restrita ao administrador.'); _enterAdmin() };
  W.enterLanding = function () { sair() };

  // abas da matéria: as do painel + Apostila, Flashcards, Fotos e Macroscopia
  V11_SUBJECT_TABS.theory.splice(0, V11_SUBJECT_TABS.theory.length,
    ['overview', 'Visão geral'], ['apostila', 'Apostila'], ['cartoes', 'Flashcards'], ['slides', 'Slides'], ['provas', 'Provas'], ['audios', 'Áudios'], ['videos', 'Vídeos'],
    ['fotos', 'Fotos'], ['complementares', 'Complementares'], ['transcribe', 'Transcrever'], ['training', 'Treino'], ['review', 'Revisão e progresso'], ['notebook', 'Caderno']);
  V11_SUBJECT_TABS.practice.splice(0, V11_SUBJECT_TABS.practice.length,
    ['overview', 'Visão geral'], ['laminas', 'Lâminas e imagens'], ['macro', 'Macroscopia'], ['pratica', 'Aulas práticas'], ['provas', 'Provas práticas'], ['audios', 'Áudios práticos'],
    ['videos', 'Vídeos práticos'], ['complementares', 'Complementares'], ['cartoes', 'Flashcards'], ['transcribe', 'Transcrever'], ['training', 'Treino prático'], ['review', 'Revisão e progresso'], ['notebook', 'Caderno']);

  function pillPlano() { var p = $id('subjectPlanPill'); if (p) p.textContent = 'Acesso completo' }
  var _renderSubject = W.renderSubject;
  W.renderSubject = function () {
    if (!UI.subject) return;
    var t = UI.tab;
    if (t === 'apostila' || t === 'cartoes' || t === 'fotos' || t === 'macro') {
      v11SubjectHeader();
      if (t === 'apostila') renderApostilaMateria();
      else if (t === 'cartoes') renderCartoes();
      else renderResourceCategory(t);
    } else _renderSubject();
    pillPlano();
  };
  var _overview = W.renderSubjectOverview;
  W.renderSubjectOverview = function () {
    _overview();
    var s = subjectData(); if (!s) return;
    var prof = UI.mode === 'practice' ? (s.practiceTeacher || s.teacher) : s.teacher;
    var temApost = s.slug === 'anatopato', decks = Object.keys(DECKS).filter(function (k) { return k.indexOf(s.slug + '/') === 0 });
    $id('subjectContent').insertAdjacentHTML('afterbegin', '<div class="glass sxBlock"><span class="eyebrow">Da sua turma ' + H(S.turma) + '</span>' +
      '<h3>' + H(prof || 'Professor a definir') + '</h3><p class="soft" style="font-size:12px;line-height:1.6">O material do professor da sua turma aparece primeiro. O das outras turmas vem depois, sem esconder nada.</p>' +
      '<div class="heroActions">' + (temApost ? '<button class="btn primary sm" onclick="setTab(\'apostila\')">Abrir a apostila</button>' : '') +
      (decks.length ? '<button class="btn sm" onclick="setTab(\'cartoes\')">Flashcards</button>' : '') +
      '<button class="btn sm" onclick="setTab(\'' + (UI.mode === 'practice' ? 'laminas' : 'slides') + '\')">' + (UI.mode === 'practice' ? 'Lâminas' : 'Slides') + '</button></div></div>');
  };

  function renderApostilaMateria() {
    var s = subjectData(), ap = s && s.slug === 'anatopato';
    $id('subjectContent').innerHTML = '<p class="soft" style="margin:0 0 12px;font-size:12.5px">A mesma matéria, de dois jeitos. Escolha como prefere estudar agora.</p><div class="sxApost">' +
      '<div class="glass"><span class="eyebrow">Apostila · para ler</span><h3>Ler na tela</h3><p>A teoria toda em português com os termos em espanhol, o que caiu em cada prova, os exercícios um por vez e os flashcards. Abre rápido e acompanha o seu progresso.</p>' +
      '<div class="heroActions">' + (ap ? '<a class="btn primary sm" href="/aulas/lesion/apostila/">Abrir a apostila</a><a class="btn sm" href="/aulas/lesion/#/pdf">Versão em PDF</a>' : '<span class="btn sm" style="opacity:.6;cursor:default">Em preparação</span>') + '</div></div>' +
      '<div class="glass"><span class="eyebrow">Apostila · em 3D</span><h3>Ver em 3D</h3><p>Os temas um a um, com as lâminas em 3D: a câmera aproxima cada achado e o texto da professora aparece por cima.</p>' +
      '<div class="heroActions">' + (ap ? '<a class="btn primary sm" href="/aulas/lesion/#/3d">Abrir em 3D</a><a class="btn sm" href="/aulas/lesion/#/treino">Treino para prova</a>' : '<span class="btn sm" style="opacity:.6;cursor:default">Em preparação</span>') + '</div></div></div>';
  }

  // ---------------- flashcards (cartões do Sinus, com progresso na conta)
  var CART = { key: '', deck: null, fila: [], i: 0, mostrar: false }, PROG = {}, ESCOLHA = {};
  var GRAUS = [['errou', 'Errei'], ['dificil', 'Difícil'], ['normal', 'Normal'], ['facil', 'Fácil']], RANK = { errou: 0, dificil: 1, normal: 3, facil: 4 };
  function lerLocal(k) { try { return JSON.parse(localStorage.getItem('sinus_cartoes_' + k) || '{}') } catch (e) { return {} } }
  function gravarLocal(k, o) { try { localStorage.setItem('sinus_cartoes_' + k, JSON.stringify(o)) } catch (e) {} }
  function docProg(k) { return db.doc('progresso/' + S.uid + '_cartoes-' + k.replace('/', '-')) }
  function montarFila(cards) { return cards.map(function (c, n) { var g = PROG[c.id]; return { c: c, r: (g in RANK) ? RANK[g] : 2, n: n } }).sort(function (a, b) { return a.r - b.r || a.n - b.n }).map(function (x) { return x.c }) }
  function deckPadrao(slug) {
    var s = subjectData(), prof = null;
    (CAT.materias || []).forEach(function (m) { if (m.slug === slug) prof = profTeoria(m) });
    var k = slug + '/' + sobrenome(prof);
    if (DECKS[k]) return k;
    var ks = Object.keys(DECKS).filter(function (x) { return x.indexOf(slug + '/') === 0 });
    return ks.indexOf(slug + '/geral') >= 0 ? slug + '/geral' : ks[0];
  }
  function abrirDeck(k) {
    if (CART.key === k) return;
    PROG = lerLocal(k);
    CART = { key: k, deck: DECKS[k], fila: montarFila(DECKS[k].cartoes), i: 0, mostrar: false };
    if (S.uid) docProg(k).get().then(function (snap) {
      if (CART.key !== k || !snap.exists || !snap.data().prog) return;
      PROG = Object.assign({}, PROG, snap.data().prog); gravarLocal(k, PROG);
      CART.fila = montarFila(CART.deck.cartoes); CART.i = 0; CART.mostrar = false;
      if (UI.tab === 'cartoes') renderCartoes();
    }).catch(function () {});
  }
  function renderCartoes() {
    var s = subjectData(), slug = s && s.slug, ks = Object.keys(DECKS).filter(function (x) { return x.indexOf(slug + '/') === 0 });
    var box = $id('subjectContent');
    if (!ks.length) { box.innerHTML = emptyBox('Os flashcards desta matéria ainda não foram feitos.', 'Enquanto isso, use o Treino e a Revisão e progresso.'); return }
    var k = ESCOLHA[slug] && DECKS[ESCOLHA[slug]] ? ESCOLHA[slug] : deckPadrao(slug);
    abrirDeck(k);
    var deck = CART.deck, c = CART.fila[CART.i], total = deck.cartoes.length;
    var dom = deck.cartoes.filter(function (x) { return PROG[x.id] === 'normal' || PROG[x.id] === 'facil' }).length;
    var chips = ks.length > 1 ? '<div class="filters" style="margin-bottom:12px">' + ks.map(function (x) { return '<button class="chip ' + (x === CART.key ? 'active' : '') + '" data-sx-deck="' + H(x) + '">' + H(DECKS[x].nome || x.split('/')[1]) + '</button>' }).join('') + '</div>' : '';
    box.innerHTML = chips + '<div class="glass sxCard"><div class="sxDeckRow"><span class="pill green">' + H(c ? c.t : '') + '</span><span class="pill">' + (CART.i + 1) + ' / ' + CART.fila.length + '</span></div>' +
      '<p class="sxQ">' + H(c ? c.q : '') + '</p>' +
      (CART.mostrar ? '<div class="sxA"><b>Resposta</b><p>' + H(c.a) + '</p><small>' + H(c.x || '') + '</small></div><div class="sxGrades">' + GRAUS.map(function (g) { return '<button class="' + g[0] + '" data-sx-grau="' + g[0] + '">' + g[1] + '</button>' }).join('') + '</div>'
        : '<button class="btn primary" data-sx-virar>Mostrar resposta</button>') + '</div>' +
      '<p class="soft" style="font-size:12px;margin-top:12px;line-height:1.6">' + dom + ' de ' + total + ' dominados. Nível alto, com perguntas de raciocínio e casos. Fonte: ' + H(deck.fonte || '') + '. Seu progresso fica salvo na sua conta.</p>';
  }
  function gravarGrau(g) {
    var c = CART.fila[CART.i]; if (!c) return;
    PROG[c.id] = g; gravarLocal(CART.key, PROG);
    if (S.uid) docProg(CART.key).set({ uid: S.uid, aula: 'cartoes-' + CART.key.replace('/', '-'), prog: PROG, em: agora() }, { merge: true }).catch(function () {});
    try {
      STUDY.attempts.push({ id: 'fc_' + CART.key.replace('/', '_') + '_' + c.id, subject: UI.subject, mode: 'theory', type: 'flashcard', ok: g === 'normal' || g === 'facil', date: new Date().toISOString(), tag: 'flashcards' });
      studySave();
    } catch (e) {}
    CART.i++; CART.mostrar = false;
    if (CART.i >= CART.fila.length) { CART.fila = montarFila(CART.deck.cartoes); CART.i = 0 }
    renderCartoes();
  }

  // ---------------- avisos, horário do dia e agenda
  function hojeISO() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) }
  function dataCurta(iso, fim) { var p = iso.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]), t = SEMANA[d.getDay()] + ' ' + p[2] + '/' + p[1]; if (fim) { var q = fim.split('-'); t += ' a ' + q[2] + '/' + q[1] } return t }
  function proximosAvisos(n) {
    var h = hojeISO();
    return AVISOS.filter(function (a) { return (a.data_fim || a.data || '') >= h }).sort(function (a, b) { return (a.data || '') < (b.data || '') ? -1 : 1 }).slice(0, n || 99);
  }
  function htmlAvisos(lista) {
    if (!lista.length) return '<p class="soft" style="font-size:12px">Sem avisos por enquanto.</p>';
    return '<div class="sxAvisos">' + lista.map(function (a) {
      var c = AVISO[a.tipo] || AVISO.atividade;
      return '<div class="sxAviso" style="border-left-color:' + c[2] + '"><div><span class="sxTag ' + c[1] + '">' + c[0] + '</span><b>' + H(dataCurta(a.data, a.data_fim)) + ' · ' + H(a.titulo) + '</b>' + (a.detalhe ? '<small>' + H(a.detalhe) + '</small>' : '') + '</div></div>';
    }).join('') + '</div>';
  }
  function legenda() { return '<div class="sxLeg">' + Object.keys(AVISO).map(function (k) { return '<span class="' + AVISO[k][1] + '">' + AVISO[k][0] + '</span>' }).join('') + '<span class="t-aula">Aula</span><span class="t-pratica">Prática</span></div>' }
  var diaSel = null;
  function diaDeHoje() { return ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'][new Date().getDay()] }
  function htmlSemana(turma) {
    var hor = DB.schedules && DB.schedules[turma];
    if (!hor) return '<p class="soft" style="font-size:12px">Escolha sua turma no Perfil para ver o horário.</p>';
    if (!diaSel) diaSel = DIAS.some(function (d) { return d[0] === diaDeHoje() }) ? diaDeHoje() : 'lun';
    var lista = (hor.dias[diaSel] || []).slice().sort(function (a, b) { return a.time < b.time ? -1 : 1 });
    var meusGrupos = gruposDoAluno(), gp = SESSAO && SESSAO.group;
    return '<div class="sxDias">' + DIAS.map(function (d) { return '<button type="button" class="' + (d[0] === diaSel ? 'on' : '') + '" data-sx-dia="' + d[0] + '">' + d[1] + (d[0] === diaDeHoje() ? ' · hoje' : '') + '</button>' }).join('') + '</div>' +
      (lista.length ? '<div class="sxHoje">' + lista.map(function (x) {
        var tag = x.tipo === 'p' ? 'Prática' : 'Aula teórica', mine = x.tipo === 'p' && x.gp ? ' · ' + x.gp.replace('GP0', 'Grupo ').replace('GP', 'Grupo ') : '';
        var hora = String(x.time).split('-');
        return '<div class="sxAula ' + (x.tipo === 'p' ? 'p' : '') + '"><div class="h">' + H(hora[0]) + '<br>' + H(hora[1] || '') + '</div><div><b>' + H(x.mat) + '</b><small>' + tag + mine + ' · ' + H(x.prof) + (x.loc ? ' · ' + H(x.loc) : '') + '</small></div></div>';
      }).join('') + '</div>' : '<p class="soft" style="font-size:12px">Sem aulas neste dia.</p>') +
      '<p class="soft" style="font-size:11px;margin-top:8px">Sala ' + H(hor.sala || '') + '. As práticas mostram o grupo de cada horário; confira o seu grupo em Perfil.</p>';
  }

  var _home = W.renderHome;
  W.renderHome = function () {
    _home();
    var el = $id('page-home'); if (!el) return;
    var head = el.querySelector('.heading');
    var pill = head && head.querySelector('.pill'); if (pill) pill.textContent = 'Turma ' + (S.turma || '—') + ' · UCP';
    var bloco = '<div class="grid2" style="margin-bottom:14px;align-items:start">' +
      '<div class="glass sxBlock" style="margin:0"><span class="eyebrow">Próximas provas e avisos</span><h3>Por data</h3>' + htmlAvisos(proximosAvisos(5)) +
      '<button class="btn sm" style="margin-top:12px" onclick="nav(\'agenda\')">Ver agenda completa</button></div>' +
      '<div class="glass sxBlock" style="margin:0"><span class="eyebrow">Sua semana · turma ' + H(S.turma) + '</span><h3>Aulas do dia</h3><div id="sxSemanaHome">' + htmlSemana(S.turma) + '</div></div></div>';
    if (head) head.insertAdjacentHTML('afterend', bloco); else el.insertAdjacentHTML('afterbegin', bloco);
  };

  var _schedule = W.renderSchedule;
  W.renderSchedule = function () {
    _schedule();
    var el = $id('page-schedule'); if (!el) return;
    if (Number(SCHEDULE_UI.period) !== 5) return;
    var t = SCHEDULE_UI.className;
    el.insertAdjacentHTML('afterbegin', '<div class="grid2" style="margin-bottom:14px;align-items:start"><div class="glass sxBlock" style="margin:0"><span class="eyebrow">Turma ' + H(t) + ' · 5º período</span><h3>Aulas por dia</h3><div id="sxSemanaSch">' + htmlSemana(t) + '</div></div>' +
      '<div class="glass sxBlock" style="margin:0"><span class="eyebrow">Provas e avisos</span><h3>Em ordem de data</h3>' + legenda() + htmlAvisos(proximosAvisos(8)) + '</div></div>');
  };

  var _agenda = W.renderAgenda;
  W.renderAgenda = function () {
    _agenda();
    var el = $id('page-agenda'); if (!el) return;
    var head = el.querySelector('.heading');
    var bloco = '<div class="glass sxBlock"><span class="eyebrow">Calendário da faculdade</span><h3>Provas e avisos, por data</h3>' + legenda() + htmlAvisos(proximosAvisos()) + '</div>' +
      '<div class="heading" style="margin-top:6px"><div><span class="eyebrow">Pessoal</span><h1 style="font-size:22px">Seus compromissos</h1></div></div>';
    if (head) head.insertAdjacentHTML('afterend', bloco);
  };

  W.renderApostilas = function () {
    var docs = [];
    Object.keys(DB.subjects).forEach(function (n) { ['slides', 'complementares', 'provas'].forEach(function (k) { (DB.subjects[n][k] || []).forEach(function (f) { if (f.studySection !== 'fotos') docs.push(f) }) }) });
    hubBox().innerHTML = sectionTitle('ESTUDAR · APOSTILAS', 'Apostilas de estudo', 'A apostila do Sinus para ler e em 3D, e os documentos das matérias logo abaixo.') +
      '<div class="glass sxBlock"><span class="eyebrow">Anatomía Patológica I · Lesión celular</span><h3>Necrosis, apoptosis y acumulaciones</h3>' +
      '<p class="soft" style="font-size:12.5px;line-height:1.65">A teoria em português com os termos em espanhol, o que caiu em cada prova, exercícios e flashcards. Também em 3D, com as lâminas.</p>' +
      '<div class="heroActions"><a class="btn primary sm" href="/aulas/lesion/apostila/">Ler na tela</a><a class="btn sm" href="/aulas/lesion/#/pdf">Versão em PDF</a><a class="btn sm" href="/aulas/lesion/#/3d">Ver em 3D</a><a class="btn sm" href="/aulas/lesion/#/treino">Treino para prova</a></div></div>' +
      '<div class="glass sxBlock"><span class="eyebrow">Próximas apostilas</span><p class="soft" style="font-size:12.5px;margin-top:6px">Semiología, Farmacología, Fisiopatología, Imagenología e Medicina de la Familia estão em preparação.</p></div>' +
      '<div class="glass adminBlock"><input id="apostSearch" oninput="filterApostilas()" placeholder="Buscar pelo título, matéria ou tipo..."><div id="apostList"></div></div>';
    filterApostilas();
  };

  W.renderPlans = function () {
    $id('page-plans').innerHTML = '<div class="heading"><div><span class="eyebrow">Planos</span><h1>Assinatura</h1><p>Os planos ainda não estão à venda. Por enquanto, todo o conteúdo do Sinus está liberado para você.</p></div><span class="pill green">Acesso completo</span></div>' +
      '<div class="grid3">' + DB.plans.filter(function (p) { return p.active !== false }).map(function (p) {
        return '<div class="glass adminBlock"><span class="pill ' + (p.id === 'premium' ? 'violet' : p.id === 'basic' ? 'green' : 'amber') + '">' + H(p.name) + '</span><h2 style="font-size:24px;margin:12px 0 4px">R$ ' + (p.priceCents / 100).toFixed(2).replace('.', ',') + '</h2><p class="soft" style="font-size:11px;line-height:1.7">' + H(p.description || '') + '</p><div class="stack" style="margin-top:12px">' + (p.features || []).slice(0, 6).map(function (f) { return '<div class="quickItem"><span>' + H(f) + '</span></div>' }).join('') + '</div><button class="btn" style="margin-top:14px" disabled>Em breve</button></div>';
      }).join('') + '</div>';
  };

  W.renderLibrary = function () {
    var items = [];
    Object.keys(DB.subjects).forEach(function (n) { V11_CATS.forEach(function (cat) { (DB.subjects[n][cat] || []).forEach(function (it) { items.push(Object.assign({}, it, { subject: n, cat: cat })) }) }) });
    var f = items.filter(function (it) { return !searchTerm || (it.title + ' ' + it.subject + ' ' + it.kind).toLowerCase().indexOf(searchTerm) >= 0 });
    if (LIB.mat) f = f.filter(function (it) { return it.subject === LIB.mat });
    if (LIB.q) f = f.filter(function (it) { return norm(it.title + ' ' + it.subject + ' ' + it.kind).indexOf(norm(LIB.q)) >= 0 });
    $id('page-library').innerHTML = '<div class="heading"><div><span class="eyebrow">Biblioteca</span><h1>Todos os materiais</h1><p>Tudo o que está nas matérias, num lugar só. Toque para abrir.</p></div><div class="heroActions"><button class="btn primary" onclick="$(\'libUp\').click()">Subir arquivo local</button><input id="libUp" class="hidden" type="file" onchange="addLocalLib(this.files[0])"></div></div>' +
      '<input placeholder="Buscar arquivo, matéria ou tipo..." value="' + H(LIB.q) + '" data-sx-libq style="margin-bottom:10px">' +
      '<div class="filters" style="margin-bottom:12px"><button class="chip ' + (!LIB.mat ? 'active' : '') + '" data-sx-libmat="">Todas</button>' + Object.keys(DB.subjects).map(function (n) { return '<button class="chip ' + (LIB.mat === n ? 'active' : '') + '" data-sx-libmat="' + H(n) + '">' + H(n) + '</button>' }).join('') + '</div>' +
      '<p class="soft" style="font-size:12px;margin-bottom:10px">' + f.length + ' materiais</p>' +
      '<div class="cards">' + f.slice(0, 300).map(function (it) {
        return '<div class="card"><div class="cardHead"><div class="iconWrap">' + H((it.kind || 'A')[0].toUpperCase()) + '</div><span class="pill">' + H(it.subject) + '</span></div><h3>' + H(it.title) + '</h3><p>' + H(it.kind || 'Arquivo') + ' · ' + H(it.period || 'Geral') + '</p><div class="heroActions" style="margin-top:12px">' + (it.id ? '<button class="btn sm primary" onclick="openDrive(\'' + H(it.id) + '\')">Abrir</button>' : '') + '</div></div>';
      }).join('') +
      localLib.map(function (fl, i) { return '<div class="card"><div class="cardHead"><div class="iconWrap">L</div><span class="pill violet">Local</span></div><h3>' + H(fl.name) + '</h3><p>' + H(fl.type || 'arquivo') + ' · ' + (fl.size / 1024 / 1024).toFixed(1) + ' MB</p><button class="btn sm" onclick="window.open(localLib[' + i + '].url,\'_blank\')">Abrir</button></div>' }).join('') + '</div>';
  };
  var LIB = { q: '', mat: '' };

  W.renderProfile = function () {
    var u = user(), pr = S.prefs || {}, per = Number(pr.periodo || 5);
    $id('page-profile').innerHTML = '<div class="heading"><div><span class="eyebrow">Perfil</span><h1>' + H(u.name) + '</h1><p>Sua conta, sua turma e o jeito do painel.</p></div><span class="pill green">Turma ' + H(S.turma) + '</span></div>' +
      '<div class="grid2"><div class="glass adminBlock">' +
      '<label class="field"><span>Nome</span><input id="pfName" maxlength="80" value="' + H(S.nome) + '"></label>' +
      '<label class="field"><span>E-mail da sua conta Google</span><input value="' + H(S.email) + '" readonly></label>' +
      '<label class="field"><span>WhatsApp</span><input value="' + H(S.whatsapp) + '" readonly></label>' +
      '<div class="grid3">' + campoSel('pfPeriod', 'Período', Array.from({ length: 10 }, function (_, i) { return [String(i + 1), (i + 1) + 'º período'] }), per) +
      campoSel('pfClass', 'Turma (sección)', 'ABCDEFG'.split(''), S.turma) +
      campoSel('pfGroup', 'Grupo de prática', [['', 'Todos']].concat(['GP01', 'GP02', 'GP03', 'GP04', 'GP05', 'GP06', 'GP07', 'GP08'].map(function (x) { return [x, x] })), pr.grupo || '') + '</div>' +
      GRUPOS_MATERIA.map(function (m, i) { return campoSel('pfGm' + i, 'Grupo em ' + m, [['', 'Todos os grupos'], ['Grupo 1', 'Grupo 1 · GP01'], ['Grupo 2', 'Grupo 2 · GP02'], ['Grupo 3', 'Grupo 3 · GP03']], (pr.gruposMateria || {})[m] || '') }).join('') +
      '<p class="sxErr" id="pfErr"></p><button class="btn primary" onclick="saveProfile()">Salvar perfil</button></div>' +
      '<div class="stack"><div class="glass adminBlock"><span class="eyebrow">Aparência e idioma</span><h3 style="font-size:16px;margin:8px 0 10px">Do seu jeito</h3>' +
      '<label class="field"><span>Idioma do painel</span><div class="sxSeg"><button type="button" data-sx-lang="pt">Português</button><button type="button" data-sx-lang="es">Español</button><button type="button" data-sx-lang="en">English</button></div></label>' +
      '<label class="field"><span>Fundo</span><div class="sxSeg" style="grid-template-columns:1fr 1fr"><button type="button" data-sx-tema-set="claro" class="' + (temaAtual() === 'claro' ? 'on' : '') + '">Claro</button><button type="button" data-sx-tema-set="escuro" class="' + (temaAtual() === 'escuro' ? 'on' : '') + '">Escuro</button></div></label></div>' +
      '<div class="glass adminBlock"><span class="eyebrow">Atalhos</span><div class="heroActions"><button class="btn" data-sx-personalizar>Refazer a personalização</button><button class="btn" data-sx-icone>Adicionar à tela de início</button><button class="btn" data-sx-sair>Sair da conta</button></div></div></div></div>';
    definirIdioma(idioma(), false);
  };
  W.saveProfile = function () {
    var nome = ($id('pfName').value || '').trim(), turma = $id('pfClass').value, per = Number($id('pfPeriod').value || 5), grupo = $id('pfGroup').value;
    var gm = {}; GRUPOS_MATERIA.forEach(function (m, i) { var v = $id('pfGm' + i).value; if (v) gm[m] = v });
    if (nome.length < 3) { $id('pfErr').textContent = 'Escreva seu nome (pelo menos 3 letras).'; return }
    db.doc('perfis/' + S.uid).set({ nome: nome, turma: turma, whatsapp: S.whatsapp, email: S.email, ultimo_acesso: agora() }, { merge: true }).then(function () {
      S.nome = nome; S.turma = turma;
      return salvarPrefs({ periodo: per, turma: turma, grupo: grupo, gruposMateria: gm });
    }).then(function () { montarDados(); renderAll(); toast('Perfil salvo') }).catch(function () { $id('pfErr').textContent = 'Não foi possível salvar. Tente de novo.' });
  };

  W.renderSubjects = (function (orig) {
    return function () {
      orig();
      if (!subjectEntries().length) $id('page-subjects').insertAdjacentHTML('beforeend', emptyBox('As matérias deste período ainda não estão no Sinus.', 'Hoje o Sinus organiza o 5º período. Você pode trocar o período no Perfil.'));
    };
  })(W.renderSubjects);

  // ---------------------------------------------------------------- navegação, celular e botões
  var _nav = W.nav;
  W.nav = function (page, btn) {
    D.body.classList.remove('sxMenuAberto');
    _nav(page, btn);
    qsa('.sxBottomNav [data-sx-go]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-sx-go') === UI.page || (UI.page === 'hub' && false)) });
  };

  D.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-sx-tema],[data-sx-tema-set],[data-sx-lang],[data-sx-sair],[data-sx-menu],[data-sx-menu-fechar],[data-sx-go],[data-sx-onb],[data-sx-foco],[data-sx-estilo],[data-sx-instalar],[data-sx-deck],[data-sx-virar],[data-sx-grau],[data-sx-dia],[data-sx-personalizar],[data-sx-icone],[data-sx-libmat],#sxEntrar') : null;
    if (!t) return;
    if (t.id === 'sxEntrar') return entrar();
    if (t.hasAttribute('data-sx-tema')) return alternarTema();
    if (t.hasAttribute('data-sx-tema-set')) { aplicarTema(t.getAttribute('data-sx-tema-set')); if (S.dentro) salvarPrefs({ tema: temaAtual() }); if (UI.page === 'profile') renderProfile(); return }
    if (t.hasAttribute('data-sx-lang')) return definirIdioma(t.getAttribute('data-sx-lang'), true);
    if (t.hasAttribute('data-sx-sair')) return sair();
    if (t.hasAttribute('data-sx-menu')) return D.body.classList.toggle('sxMenuAberto');
    if (t.hasAttribute('data-sx-menu-fechar')) return D.body.classList.remove('sxMenuAberto');
    if (t.hasAttribute('data-sx-go')) return nav(t.getAttribute('data-sx-go'));
    if (t.hasAttribute('data-sx-personalizar')) return abrirPersonalizacao();
    if (t.hasAttribute('data-sx-icone')) { if (deferredInstall) { deferredInstall.prompt(); return } P = null; abrirPersonalizacao(); P.passo = 1; return renderOnb() }
    if (t.hasAttribute('data-sx-libmat')) { LIB.mat = t.getAttribute('data-sx-libmat'); return renderLibrary() }
    if (t.hasAttribute('data-sx-dia')) {
      diaSel = t.getAttribute('data-sx-dia');
      var a = $id('sxSemanaHome'), b = $id('sxSemanaSch');
      if (a) a.innerHTML = htmlSemana(S.turma);
      if (b) b.innerHTML = htmlSemana(SCHEDULE_UI.className);
      return;
    }
    if (t.hasAttribute('data-sx-deck')) { var s = subjectData(); ESCOLHA[s.slug] = t.getAttribute('data-sx-deck'); CART.key = ''; return renderCartoes() }
    if (t.hasAttribute('data-sx-virar')) { CART.mostrar = true; return renderCartoes() }
    if (t.hasAttribute('data-sx-grau')) return gravarGrau(t.getAttribute('data-sx-grau'));
    if (t.hasAttribute('data-sx-instalar')) { if (deferredInstall) { deferredInstall.prompt(); deferredInstall.userChoice.then(function (r) { if (r && r.outcome === 'accepted') P.instalou = true; deferredInstall = null; renderOnb() }) } return }
    if (t.hasAttribute('data-sx-foco')) { P.foco = t.getAttribute('data-sx-foco'); return renderOnb() }
    if (t.hasAttribute('data-sx-estilo')) { var x = t.getAttribute('data-sx-estilo'), i = P.estilos.indexOf(x); if (i >= 0) P.estilos.splice(i, 1); else P.estilos.push(x); return renderOnb() }
    if (t.hasAttribute('data-sx-onb')) {
      var acao = t.getAttribute('data-sx-onb');
      if (acao === 'cancelar') { P = null; return entrarNoPainel() }
      lerPasso();
      if (acao === 'voltar') { P.erro = ''; P.passo = Math.max(0, P.passo - 1); return renderOnb() }
      if (acao === 'pular') { P.erro = ''; P.passo = Math.min(PASSOS.length - 1, P.passo + 1); return renderOnb() }
      var er = validarPasso(); if (er) { P.erro = er; return renderOnb() }
      P.erro = '';
      if (PASSOS[P.passo] === 'pronto') return salvarPersonalizacao();
      P.passo++; return renderOnb();
    }
  });
  D.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-sx-lang-select]')) definirIdioma(t.value, true);
  });
  D.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-sx-libq]')) { LIB.q = t.value; var pos = t.selectionStart; renderLibrary(); var n = D.querySelector('[data-sx-libq]'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos) } catch (_) {} } }
  });

  // ---------------------------------------------------------------- entrar no painel
  function entrarNoPainel() {
    S.dentro = true;
    montarDados();
    qsa('.sxSoDono').forEach(function (el) { el.hidden = !S.dono });
    mostrar('painel');
    enterStudent();
    nav('home');
    salvarAcesso();
    var q = new URLSearchParams(location.search), m = q.get('m'), volta = q.get('volta') || '';
    if (volta && volta.charAt(0) === '/' && volta.charAt(1) !== '/' && volta !== '/' && volta.indexOf('/aulas/materia') !== 0 && volta.indexOf('/aulas/anatopato') !== 0) return location.replace(volta);
    if (!m && volta) { var mm = volta.match(/[?&]m=([a-z]+)/); if (mm) m = mm[1]; else if (volta.indexOf('/aulas/anatopato') === 0) m = 'anatopato' }
    if (m && NOMES[m] && DB.subjects[NOMES[m]]) openSubject(NOMES[m]);
    if (q.toString()) try { history.replaceState(null, '', location.pathname) } catch (e) {}
  }
  function salvarAcesso() { db.doc('perfis/' + S.uid).set({ ultimo_acesso: agora() }, { merge: true }).catch(function () {}) }

  // ---------------------------------------------------------------- início
  aplicarTema(temaAtual());
  definirIdioma(idioma(), false);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(function () {});
  W.SinusApp = { S: S, sair: sair, montarDados: montarDados, abrirPersonalizacao: abrirPersonalizacao, definirIdioma: definirIdioma, aplicarTema: aplicarTema };
})();
