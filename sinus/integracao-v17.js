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

  // ---------------------------------------------------------------- Supabase
  var backend = W.SinusBackend;
  if (!backend) throw new Error('Não foi possível carregar o Supabase.');
  var auth = backend.auth, db = backend.db;
  var agora = function () { return new Date().toISOString() };
  function msg(t, erro) { var m = $id('sxMsg'); if (!m) return; m.textContent = t || ''; m.className = 'sxMsg' + (erro ? ' erro' : '') }
  function standalone() { return (W.matchMedia && W.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true }
  function ehIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) }
  function entrar() {
    var b = $id('sxEntrar'); if (b) b.disabled = true;
    msg('Abrindo a entrada do Google…');
    backend.signIn().catch(function(e) { if (b) b.disabled = false; msg(e.message || 'Não foi possível entrar. Tente novamente.', true) });
  }
  function sair() { auth.signOut().then(function () { location.replace('/') }).catch(function(e) { msg(e.message, true) }) }

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
    S.uid = u.uid; S.email = String(u.email || '').toLowerCase(); S.dono = u.isAdmin === true;
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
    }).catch(function (error) {
      console.error('SINUS: falha ao carregar painel', error);
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
  function turmasDoPeriodo(periodo) { var n = {1:7,2:12,3:8,4:13,5:7,6:10,7:5,8:6,9:3,10:5}[Number(periodo)] || 7; return 'ABCDEFGHIJKLM'.slice(0,n).split('') }
  var GRUPOS_MATERIA = ['Semiología Médica I', 'Anatomía Patológica I'];

  function abrirPersonalizacao() {
    var pr = S.prefs || {};
    P = {
      passo: 0, nome: S.nome || '', whatsapp: S.whatsapp || '',
      faculdade: pr.faculdade || 'UCP', campus: pr.campus || 'Ciudad del Este', periodo: pr.periodo || 5,
      turma: S.turma || pr.turma || '', practiceAssignments:pr.practiceAssignments||{}, grupo: pr.grupo || '', subdivision: pr.subdivision || '', hospitalSubdivision: pr.hospitalSubdivision || '', papel: pr.papel || 'Estudante',
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

  function academicFields(prefix,period,cohort,prefs){
    var subjects=W.SinusTimetable?.academicOptions(period,cohort)||[];
    if(!subjects.length)return '<p class="soft">Escolha o período e a turma para ver as práticas oficiais.</p>';
    return '<div class="sxAcademic"><h3>Práticas e rotações da sua turma</h3>'+subjects.map(function(subject){return '<section class="sxAcademicSubject"><h4>'+H(subject.title)+'</h4><p class="soft">'+(subject.activities.length?(subject.theory?'Teoria · Prática':'Prática'):'Somente teoria')+'</p>'+subject.activities.map(function(a){var selected=prefs.practiceAssignments?.[a.key]||{},legacy=(prefs.gruposMateria||{})[subject.title]||prefs.grupo||'',group=String(selected.group??legacy).match(/\d+/)?.[0]?.replace(/^0+/,'')||'';if(a.groups.indexOf(group)<0)group='';var rows=a.events.filter(function(e){return !group||!e.group||e.group===group}),subs=[...new Set(rows.flatMap(function(e){return e.subdivision?[e.subdivision]:(e.cycle==='simulation'||e.cycle==='consultation')?['1','2','3']:[]}))].sort();var id=prefix+'Act'+encodeURIComponent(a.key),label=a.kind==='rotation'?'Hospital Los Ángeles · rotações':'Prática · laboratório / atendimento';var savedSub=String(selected.subdivision||(a.kind==='rotation'?prefs.hospitalSubdivision:prefs.subdivision)||'');if(subs.indexOf(savedSub)<0)savedSub='';return '<div class="sxAcademicActivity" data-academic-key="'+H(a.key)+'"><strong>'+label+'</strong>'+(a.groups.length?campoSel(id+'Group','Grupo de prática',[['','Escolha seu grupo']].concat(a.groups.map(function(g){return [g,'Grupo '+g]})),group):'<p>Prática sem divisão por grupos.</p>')+(subs.length?campoSel(id+'Sub','Subdivisão',[['','Escolha sua subdivisão']].concat(subs.map(function(x){return [x,'Subdivisão '+x]})),savedSub):'')+(a.kind==='rotation'?'<p class="sxHint">Datas, locais e rodízios seguem o calendário oficial da sua turma e grupo.</p>':'')+'</div>'}).join('')+'</section>'}).join('')+'</div>';
  }
  function readAcademic(prefix){var out={};D.querySelectorAll('#'+prefix+'Academic [data-academic-key]').forEach(function(el){var key=el.dataset.academicKey,id=prefix+'Act'+encodeURIComponent(key);out[key]={group:$id(id+'Group')?.value||'',subdivision:$id(id+'Sub')?.value||''}});return out}
  function refreshAcademic(prefix){var period=$id(prefix==='p'?'pPer':'pfPeriod')?.value,cohort=$id(prefix==='p'?'pTurma':'pfClass')?.value,box=$id(prefix+'Academic');if(!box)return;var base=prefix==='p'?P:S.prefs,prefs=Object.assign({},base,{practiceAssignments:readAcademic(prefix)});box.innerHTML=academicFields(prefix,period,cohort,prefs)}
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
      var g = '<div id="pAcademic">'+academicFields('p',P.periodo,P.turma,P)+'</div>';
      return {
        eyebrow: 'Um espaço que entende sua turma', titulo: 'Qual é o seu <em>momento na Medicina?</em>', lead: 'Vamos organizar suas matérias e seus horários a partir daqui. Você pode mudar tudo no Perfil depois.',
        corpo: '<div class="grid2">' + campoSel('pFac', 'Faculdade', ['UCP', 'Outra'], P.faculdade) +
          '<label class="field"><span>Campus</span><input id="pCampus" value="' + H(P.campus) + '" placeholder="Ciudad del Este"></label></div>' +
          '<div class="grid2">' + campoSel('pPer', 'Período', Array.from({ length: 10 }, function (_, i) { return [String(i + 1), (i + 1) + 'º período'] }), P.periodo) +
          campoSel('pTurma', 'Turma (sección)', [['', 'Escolha']].concat(turmasDoPeriodo(P.periodo).map(function (x) { return [x, x] })), P.turma) + '</div>' +
          campoSel('pPapel', 'Você participa como', ['Estudante', 'Monitor', 'Delegado'], P.papel) + g +
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
      P.turma = v('pTurma'); P.practiceAssignments=readAcademic('p'); P.papel = v('pPapel') || 'Estudante';
      P.gruposMateria={}; Object.keys(P.practiceAssignments).forEach(function(k){if(k.endsWith('::practice'))P.gruposMateria[k.split('::')[0]]=P.practiceAssignments[k].group});
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
    var zap = P.whatsapp;
    var perfil = { nome: P.nome, turma: P.turma, whatsapp: zap, email: S.email, ultimo_acesso: agora() };
    if (!S.perfil) perfil.primeiro_acesso = agora();
    db.doc('perfis/' + S.uid).set(perfil, { merge: true }).then(function () {

      S.perfil = Object.assign({}, S.perfil || {}, { nome: P.nome, turma: P.turma, whatsapp: zap, email: S.email });
      S.nome = P.nome; S.turma = P.turma; S.whatsapp = zap;
      return salvarPrefs({
        onboarding: true, idioma: idioma(), tema: temaAtual(), faculdade: P.faculdade, campus: P.campus, periodo: P.periodo,
        turma: P.turma, grupo: P.grupo, practiceAssignments:P.practiceAssignments, papel: P.papel, gruposMateria: P.gruposMateria, foco: P.foco, estilos: P.estilos, indicacao: P.indicacao
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
    /* tipos vindos da pasta da turma no Drive: a pasta já diz o que é cada arquivo */
    if (i.k === 'pratica-aula') return { cat: 'pratica', mode: 'practice', sec: 'pratica', kind: tipoArq(i) };
    if (i.k === 'lamina') return { cat: 'pratica', mode: 'practice', sec: 'laminas', kind: img ? 'Imagem da prática' : 'Prática' };
    if (i.k === 'foto') return { cat: 'complementares', mode: 'theory', sec: 'fotos', kind: 'Foto da aula' };
    if (i.k === 'slide' && /\bP[12]\b/.test(i.o || '')) return { cat: 'slides', mode: 'theory', sec: 'slides', kind: tipoArq(i) };
    if (i.k === 'pratica') return { cat: 'pratica', mode: 'practice', sec: /macrosc/i.test(t) ? 'macro' : 'laminas', kind: img ? 'Imagem' : 'Prática' };
    if (i.k === 'prova' || /prova|examen|parcial|evaluaci[oó]n/i.test(t)) return { cat: 'provas', mode: RE_PRATICA.test(t) ? 'practice' : 'theory', sec: 'provas', kind: img ? 'Imagem' : tipoArq(i) };
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
    // A grade oficial de horários é a fonte EXCLUSIVA de disciplinas por turma e período.
    // Catálogos acadêmicos fornecem arquivos, mas nunca criam novas matérias.
    var suggested = montarMaterias();
    var official = W.SinusTimetable?.academicOptions?.(per, S.turma || 'G') || [];
    var cleaned = function(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()};
    if (official.length) {
      var officialSubjects = {};
      official.forEach(function(row){
        if(!row?.title)return;
        var existingName=Object.keys(suggested).find(function(name){return cleaned(name)===cleaned(row.title)});
        var source=existingName?suggested[existingName]:null;
        officialSubjects[row.title]=source||{
          id:'grade_'+per+'_'+cleaned(row.title).replace(/[^a-z0-9]+/g,'_'),
          active:true,period:per,teacher:'',practiceTeacher:'',
          mode:row.activities?.length?'Teoria + Prática':'Teoria',
          accent:'mint',slides:[],provas:[],audios:[],videos:[],pratica:[],complementares:[]
        };
        officialSubjects[row.title].period=per;
        officialSubjects[row.title].fromTimetable=true;
      });
      DB.subjects=officialSubjects;
    } else {
      // Sem grade confirmada desta turma, não inferir matérias a partir de arquivos do Drive.
      DB.subjects={};
    }
    if (W.SinusDriveSync) W.SinusDriveSync.sync(DB, {uid:S.uid,period:per,cohort:S.turma}, function (status) {
      if (S.dentro && status.indexed > 0) { try { renderAll() } catch(e) {} }
    });
    if (W.SinusDrive) W.SinusDrive.apply(DB, S.prefs.periodo || 5, S.turma || "G");
    // Bioestatística: slides em PDF pertencem à Teoria da disciplina oficial.
    // Somente anexar à matéria existente na grade; nunca inventar matérias.
    Object.keys(DB.subjects||{}).filter(function(name){
      return /^bioesta[dt]istica$/i.test(cleaned(name));
    }).forEach(function(name){
      var mat=DB.subjects[name],seen=new Set((mat.slides||[]).map(function(x){return String(x.id)}));
      mat.slides=mat.slides||[];
      (W.SinusAcademicOfficial?.bioestadisticaSlides||[]).forEach(function(v){
        if(seen.has(v.id))return;seen.add(v.id);
        mat.slides.push({id:v.id,title:v.title,kind:'PDF',mime:'application/pdf',
          source:'ucp-oficial',studyMode:'theory',studySection:'slides',
          period:'Teoria',academicPeriod:2,active:true});
      });
    });
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
        var ts = function (x) { return typeof x === 'string' ? x : '' };
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
    ['overview', 'Visão geral'], ['apostila', 'Apostila'], ['cartoes', 'Flashcards'], ['mapas', 'Mapas guiados'], ['slides', 'Slides'], ['provas', 'Provas'], ['audios', 'Áudios'], ['videos', 'Vídeos'],
    ['fotos', 'Fotos'], ['complementares', 'Complementares'], ['transcribe', 'Transcrever'], ['training', 'Treino'], ['notebook', 'Caderno']);
  V11_SUBJECT_TABS.practice.splice(0, V11_SUBJECT_TABS.practice.length,
    ['overview', 'Visão geral'], ['apostila', 'Resumo / Apostila'], ['slides', 'Slides'], ['catedra', 'Cátedra'], ['laminas', 'Lâminas e imagens'], ['macro', 'Macroscopia'], ['pratica', 'Aulas práticas'], ['provas', 'Provas práticas'], ['audios', 'Áudios práticos'],
    ['videos', 'Vídeos práticos'], ['complementares', 'Complementares'], ['cartoes', 'Flashcards'], ['mapas', 'Mapas guiados'], ['transcribe', 'Transcrever'], ['training', 'Treino prático'], ['notebook', 'Caderno']);

  function pillPlano() { var p = $id('subjectPlanPill'); if (p) p.textContent = 'Acesso completo' }
  var renderVideoOriginal = W.renderVideos, renderAudioOriginal = W.renderAudios;
  function renderMidias() {
    var content = $id('subjectContent');
    renderVideoOriginal();
    var videos = D.createElement('section'); videos.className='sxMediaSection'; videos.setAttribute('aria-label','Vídeos');
    while (content.firstChild) videos.appendChild(content.firstChild);
    renderAudioOriginal();
    var audios = D.createElement('section'); audios.className='sxMediaSection'; audios.setAttribute('aria-label','Áudios');
    while (content.firstChild) audios.appendChild(content.firstChild);
    content.append(videos,audios);
  }
  W.renderVideos = renderMidias; W.renderAudios = renderMidias;
  var renderTrainingOriginal = W.renderTrainingBuilder;
  W.renderTrainingBuilder = function () {
    renderTrainingOriginal();
    var duplicate = D.querySelector('#subjectContent .trainTabs'); if (duplicate) duplicate.remove();
    var intro = D.querySelector('#subjectContent .trainHero p'); if (intro) intro.textContent = 'Os formatos são intercalados automaticamente.';
  };
  var studyQuery = new URLSearchParams(location.search);
  var studyEmbedded = W.parent !== W && studyQuery.has('sxStudySubject');
  var splitSubject = '';
  function fecharDivisao() {
    var layout = $id('sxSplitLayout'), content = $id('subjectContent');
    if (layout && content) { layout.before(content); layout.remove() }
    var toggle = $id('sxSplitToggle'); if (toggle) { toggle.textContent = 'Dividir tela'; toggle.setAttribute('aria-expanded', 'false') }
    var ratio = D.querySelector('.sxSplitRatio'); if (ratio) ratio.remove();
    splitSubject = '';
  }
  function prepararDivisao() {
    if (studyEmbedded) return;
    if (splitSubject && splitSubject !== UI.subject + ':' + UI.mode) fecharDivisao();
    if ($id('sxSplitTools')) return;
    var tools = D.createElement('div'); tools.id = 'sxSplitTools'; tools.className = 'sxSplitTools';
    tools.innerHTML = '<button class="btn sm" id="sxSplitToggle" type="button" aria-expanded="false">Dividir tela</button>';
    $id('subjectTabs').after(tools);
    tools.firstElementChild.addEventListener('click', function () {
      if ($id('sxSplitLayout')) { fecharDivisao(); return }
      splitSubject = UI.subject + ':' + UI.mode;
      var content = $id('subjectContent'), layout = D.createElement('div'); layout.id = 'sxSplitLayout';
      content.before(layout); layout.appendChild(content);
      var right = D.createElement('section'); right.className = 'sxSplitRight';
      right.innerHTML = '<label class="sxSplitPicker">À direita <select aria-label="Conteúdo do painel direito"><option value="videos">Vídeos / Áudios</option><option value="apostila">Resumo / Apostila</option><option value="slides">Slides</option><option value="training">Exercícios</option><option value="cartoes">Flashcards</option><option value="provas">Provas</option><option value="notebook">Caderno</option></select></label><iframe title="Segundo conteúdo de estudo" allow="fullscreen; picture-in-picture" loading="eager"></iframe>';
      layout.appendChild(right);
      var frame = right.querySelector('iframe');
      function abrirDireita() {
        var url = new URL(location.pathname, location.origin);
        url.searchParams.set('sxStudySubject', UI.subject); url.searchParams.set('sxStudyMode', UI.mode); url.searchParams.set('sxStudyTab', right.querySelector('select').value);
        frame.src = url.href;
      }
      right.querySelector('select').addEventListener('change', abrirDireita); abrirDireita();
      var ratio = D.createElement('label'); ratio.className = 'sxSplitRatio'; ratio.innerHTML = 'Largura dos painéis <input type="range" min="30" max="70" value="50" aria-label="Largura do painel esquerdo">';
      tools.appendChild(ratio); ratio.querySelector('input').addEventListener('input', function(e){layout.style.gridTemplateColumns=e.target.value+'fr '+(100-Number(e.target.value))+'fr'});
      tools.firstElementChild.textContent = 'Fechar divisão'; tools.firstElementChild.setAttribute('aria-expanded','true');
    });
  }
  var _renderSubject = W.renderSubject;
  W.renderSubject = function () {
    if (!UI.subject) return;
    var t = UI.tab;
    // Cátedra é exclusiva da prática de Anatomia I e II; não aparece em outras matérias.
    var isAnatomyPractice = UI.mode === 'practice' && /^anatom[ií]a(?:\s+(?:humana|descriptiva|general))?\s+(?:i|ii|1|2)$/i.test(String(UI.subject || '').trim());
    if (t === 'catedra' && !isAnatomyPractice) { UI.tab = t = 'videos'; }
    if (t === 'catedra' && isAnatomyPractice) {
      v11SubjectHeader();
      $id('subjectContent').innerHTML = '';
    } else if (t === 'slides' && UI.mode === 'practice') {
      // Slides práticos são guardados na categoria prática do Drive.
      v11SubjectHeader();
      renderResourceCategory(v11List('slides').length ? 'slides' : 'pratica');
    } else if (t === 'mapas' || t === 'apostila' || t === 'cartoes' || t === 'fotos' || t === 'macro') {
      v11SubjectHeader();
      if (t === 'apostila') { if(v11List('apostila').length) renderResourceCategory('apostila'); else renderApostilaMateria(); }
      else if (t === 'cartoes') renderCartoes();
      else if (t === 'mapas') renderMapasMateria();
      else renderResourceCategory(t);
    } else _renderSubject();
    pillPlano();
    prepararDivisao();
    var exercicios = ['training', 'cartoes', 'mapas', 'provas', 'review'];
    var principal = t === 'catedra' ? 'catedra' : t === 'provas' ? 'provas' : exercicios.indexOf(t) >= 0 ? 'training' : (t === 'audios' ? 'videos' : (['slides', 'videos'].indexOf(t) >= 0 ? t : 'apostila'));
    var tabs = $id('subjectTabs');
    if (tabs) tabs.innerHTML = [['apostila','Resumo / Apostila'],['slides','Slides']].concat(isAnatomyPractice ? [['catedra','Cátedra']] : [], [['videos','Vídeos / Áudios'],['provas','Provas'],['training','Exercícios']]).map(function (item) {
      return '<button type="button" class="' + (principal === item[0] ? 'active' : '') + (item[0] === 'catedra' ? ' sxCatedraTab' : '') + '" onclick="setTab(\'' + item[0] + '\')">' + (item[0] === 'catedra' ? '▣ ' : '') + item[1] + '</button>';
    }).join('');
    var content = $id('subjectContent');
    if (content && exercicios.indexOf(t) >= 0) content.insertAdjacentHTML('afterbegin', '<div class="sxExerciseChoices" role="group" aria-label="Tipo de exercício">' + [['training','Treino'],['cartoes','Flashcards'],['mapas','Mapas guiados'],['provas','Provas'],['review','Revisão']].filter(function(item){ return item[0] !== 'mapas' || temMapas(); }).map(function (item) {
      return '<button type="button" class="btn sm ' + (t === item[0] ? 'primary' : '') + '" onclick="setTab(\'' + item[0] + '\')">' + item[1] + '</button>';
    }).join('') + '</div>');
    else if (content && principal === 'apostila') content.insertAdjacentHTML('afterbegin', '<details class="sxStudyExtras"><summary>Outros materiais e ferramentas</summary><div class="sxExerciseChoices">' + [['overview','Visão geral'],['laminas','Lâminas e imagens'],['macro','Macroscopia'],['pratica','Aulas práticas'],['audios','Áudios'],['fotos','Fotos'],['complementares','Complementares'],['notebook','Caderno'],['transcribe','Transcrever']].filter(function(item){return V11_SUBJECT_TABS[UI.mode].some(function(x){return x[0]===item[0]})}).map(function(item){return '<button class="btn sm" onclick="setTab(\''+item[0]+'\')">'+item[1]+'</button>'}).join('') + '</div></details>');
    // Cátedra é parte da renderização principal de Prática. Não esperar outro módulo
    // observar renderSubject: a aba deve exibir aulas ao ser selecionada.
    if (t === 'catedra' && isAnatomyPractice) {
      if (W.SinusAnatomiaPratica && typeof W.SinusAnatomiaPratica.mount === 'function') {
        W.SinusAnatomiaPratica.mount();
      } else {
        var cbox = $id('subjectContent');
        if (cbox) cbox.innerHTML = '<div class="glass" role="status" style="padding:20px;border-radius:15px">Preparando videoaulas da Cátedra…</div>';
      }
    }
    var fc = $id('focusClock'); if (fc) { fc.classList.add('pip-mode'); fc.setAttribute('draggable', 'true'); }
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
      if ((UI.tab === 'training' && UI.trainingPane === 'flashcards') || UI.tab === 'cartoes') renderCartoes();
    }).catch(function () {});
  }
  // ---------------- mapas guiados da matéria (mapas, fluxogramas e tabelas que o aluno completa)
  /* matérias com mapas guiados e em que parte (teoria/prática) eles existem */
  var MAPAS_MATERIAS = { anatopato: { teoria: 1, pratica: 1 }, farmacologia: { teoria: 1 }, fisiopatologia: { teoria: 1 }, imagenologia: { teoria: 1 }, semiologia: { teoria: 1, pratica: 1 }, familia: { teoria: 1 } };
  function temMapas() {
    var s = subjectData(), m = s && MAPAS_MATERIAS[s.slug];
    return !!(m && m[UI.mode === 'practice' ? 'pratica' : 'teoria']);
  }
  function renderMapasMateria() {
    var s = subjectData(), slug = s && s.slug, box = $id('subjectContent');
    if (!slug || !MAPAS_MATERIAS[slug]) { box.innerHTML = emptyBox('Os mapas guiados desta matéria ainda não foram feitos.', 'Enquanto isso, use o Treino, os Flashcards e a Revisão e progresso.'); return }
    /* a chave Teoria/Prática da matéria decide o que o quadro mostra (na prática: láminas e exame físico) */
    var modo = UI.mode === 'practice' ? 'pratica' : 'teoria';
    box.innerHTML = '<div class="sxMapasStage"><iframe id="sinusMapasFrame" title="Mapas guiados · ' + H(s.name || s.nome || slug) + '" src="/mapas/?s=' + encodeURIComponent(slug) + '&modo=' + modo + '" style="display:block;width:100%;height:760px;border:0;background:transparent"></iframe></div>';
  }
  function renderCartoes() {
    var s = subjectData(), slug = s && s.slug, ks = Object.keys(DECKS).filter(function (x) { return x.indexOf(slug + '/') === 0 });
    var box = $id('subjectContent');
    if (!ks.length) { box.innerHTML = emptyBox('Os flashcards desta matéria ainda não foram feitos.', 'Enquanto isso, utilize os Exercícios ou os Mapas mentais.'); return }
    var k = ESCOLHA[slug] && DECKS[ESCOLHA[slug]] ? ESCOLHA[slug] : deckPadrao(slug);
    abrirDeck(k);
    var deck = CART.deck, c = CART.fila[CART.i], total = deck.cartoes.length;
    var dom = deck.cartoes.filter(function (x) { return PROG[x.id] === 'normal' || PROG[x.id] === 'facil' }).length;
    var chips = ks.length > 1 ? '<div class="filters" style="margin-bottom:12px">' + ks.map(function (x) { return '<button class="chip ' + (x === CART.key ? 'active' : '') + '" data-sx-deck="' + H(x) + '">' + H(DECKS[x].nome || x.split('/')[1]) + '</button>' }).join('') + '</div>' : '';
    box.innerHTML = '<section class="sxFlashStudy">' + chips + '<header class="sxFlashHeader"><div><span class="eyebrow">FLASHCARDS</span><h2>' + H(deck.nome || UI.subject) + '</h2></div><span class="sxFlashCount">' + (CART.i + 1) + ' / ' + CART.fila.length + '</span></header>' +
      '<div class="sxFlashProgress" role="progressbar" aria-label="Progresso no baralho" aria-valuemin="0" aria-valuemax="' + CART.fila.length + '" aria-valuenow="' + CART.i + '"><i style="width:' + (100*CART.i/Math.max(1,CART.fila.length)) + '%"></i></div>' +
      '<div class="glass sxCard"><div class="sxDeckRow"><span class="pill green">' + H(c ? c.t : '') + '</span><span class="soft">' + (CART.mostrar ? 'Confira sua resposta' : 'Pense antes de revelar') + '</span></div>' +
      '<p class="sxQ">' + H(c ? c.q : '') + '</p>' +
      (CART.mostrar ? '<div class="sxA"><b>Resposta</b><p>' + H(c.a) + '</p><small>' + H(c.x || '') + '</small></div><div class="sxGrades">' + GRAUS.map(function (g) { return '<button class="' + g[0] + '" data-sx-grau="' + g[0] + '">' + g[1] + '</button>' }).join('') + '</div>'
        : '<button class="btn primary" data-sx-virar>Mostrar resposta</button>') + '</div>' +
      '<nav class="sxFlashNav" aria-label="Navegação dos cartões"><button class="btn" data-sx-card-move="-1" ' + (CART.i===0?'disabled':'') + '>← Anterior</button><button class="btn" data-sx-card-move="1">Pular →</button></nav>' +
      '<footer class="sxFlashFooter"><b>' + dom + ' de ' + total + ' dominados</b><span>Seu progresso fica salvo na conta.</span><details><summary>Fonte do baralho</summary>' + H(deck.fonte || '') + '</details></footer></section>';
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
    var hoje = diaDeHoje(), hojeIdx = DIAS.findIndex(function (d) { return d[0] === hoje });
    var html = '<div class="sxCalGrid">';
    for (var i = 0; i < DIAS.length; i++) {
      var d = DIAS[i], dia = d[0], diaLabel = d[1];
      var lista = (hor.dias[dia] || []).slice().sort(function (a, b) { return a.time < b.time ? -1 : 1 });
      var eh_hoje = dia === hoje ? ' hoje' : '';
      html += '<div class="sxCalDia' + eh_hoje + '"><div class="sxCalHead">' + diaLabel.toUpperCase().substring(0, 3) + '</div>';
      if (lista.length) {
        html += lista.map(function (x) {
          var tag = x.tipo === 'p' ? 'Prática' : 'Aula';
          var hora = String(x.time).split('-');
          var horario = hora[0] + (hora[1] ? '-' + hora[1] : '');
          return '<div class="sxCalAula ' + (x.tipo === 'p' ? 'pratica' : 'teoria') + '"><div class="sxHora">' + H(horario) + '</div><div class="sxInfo"><b>' + H(x.mat) + '</b><small>' + tag + (x.gp ? ' · ' + x.gp.replace('GP0', 'Grupo ').replace('GP', 'Grupo ') : '') + '</small></div></div>';
        }).join('');
      } else {
        html += '<div class="sxCalVazio">Sem aulas</div>';
      }
      html += '</div>';
    }
    html += '</div><p class="soft" style="font-size:11px;margin-top:12px">Sala ' + H(hor.sala || '') + '. As práticas mostram seu grupo; confira em Perfil.</p>';
    return html;
  }

  W.renderHome = function () {
    var el=$id('page-home');if(!el)return;
    var first=(S.nome||S.nomeGoogle||'estudante').split(' ')[0];
    el.innerHTML='<div class="sxHomeWelcome"><span class="eyebrow">Seu espaço no SINUS</span><h1>Olá, '+H(first)+'.</h1><p>O que vamos fazer hoje?</p></div><div class="sxHomeActions">'+
      '<button class="glass" onclick="nav(\'subjects\')"><span>▤</span><h2>Estudar</h2><p>Apostilas, slides e aulas</p></button>'+
      '<button class="glass" onclick="nav(\'questions\')"><span>◎</span><h2>Treinar</h2><p>Questões e exercícios</p></button>'+
      '<button class="glass" onclick="nav(\'schedule\')"><span>▦</span><h2>Horários</h2><p>Aulas e compromissos</p></button>'+
      '<button class="glass" onclick="nav(\'errors\')"><span>↻</span><h2>Revisar</h2><p>Retome suas dificuldades</p></button></div>';
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
      campoSel('pfClass', 'Turma (sección)', turmasDoPeriodo(per), S.turma) +
      '</div><div id="pfAcademic">'+academicFields('pf',per,S.turma,pr)+'</div>' +
      '<p class="sxErr" id="pfErr"></p><button class="btn primary" onclick="saveProfile()">Salvar perfil</button></div>' +
      '<div class="stack"><div class="glass adminBlock"><span class="eyebrow">Aparência e idioma</span><h3 style="font-size:16px;margin:8px 0 10px">Do seu jeito</h3>' +
      '<label class="field"><span>Idioma do painel</span><div class="sxSeg"><button type="button" data-sx-lang="pt">Português</button><button type="button" data-sx-lang="es">Español</button><button type="button" data-sx-lang="en">English</button></div></label>' +
      '<label class="field"><span>Fundo</span><div class="sxSeg" style="grid-template-columns:1fr 1fr"><button type="button" data-sx-tema-set="claro" class="' + (temaAtual() === 'claro' ? 'on' : '') + '">Claro</button><button type="button" data-sx-tema-set="escuro" class="' + (temaAtual() === 'escuro' ? 'on' : '') + '">Escuro</button></div></label></div>' +
      '<div class="glass adminBlock"><span class="eyebrow">Atalhos</span><div class="heroActions"><button class="btn" data-sx-personalizar>Refazer a personalização</button><button class="btn" data-sx-icone>Adicionar à tela de início</button><button class="btn" data-sx-sair>Sair da conta</button></div></div></div></div>';
    definirIdioma(idioma(), false);
  };
  W.saveProfile = function () {
    var nome = ($id('pfName').value || '').trim(), turma = $id('pfClass').value, per = Number($id('pfPeriod').value || 5);
    var assignments=readAcademic('pf'),gm={};Object.keys(assignments).forEach(function(k){if(k.endsWith('::practice'))gm[k.split('::')[0]]=assignments[k].group});
    if (nome.length < 3) { $id('pfErr').textContent = 'Escreva seu nome (pelo menos 3 letras).'; return }
    db.doc('perfis/' + S.uid).set({ nome: nome, turma: turma, whatsapp: S.whatsapp, email: S.email, ultimo_acesso: agora() }, { merge: true }).then(function () {
      S.nome = nome; S.turma = turma;
      return salvarPrefs({ periodo: per, turma: turma, grupo:'', gruposMateria:gm, practiceAssignments:assignments });
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
    var fc = $id('focusClock'); if (fc && page !== 'subject') { fc.classList.remove('pip-mode'); fc.removeAttribute('draggable'); }
  };

  D.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-sx-tema],[data-sx-tema-set],[data-sx-lang],[data-sx-sair],[data-sx-menu],[data-sx-menu-fechar],[data-sx-go],[data-sx-onb],[data-sx-foco],[data-sx-estilo],[data-sx-instalar],[data-sx-deck],[data-sx-virar],[data-sx-grau],[data-sx-card-move],[data-sx-dia],[data-sx-personalizar],[data-sx-icone],[data-sx-libmat],#sxEntrar') : null;
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
    if (t.hasAttribute('data-sx-card-move')) { CART.i = (CART.i + Number(t.getAttribute('data-sx-card-move')) + CART.fila.length) % CART.fila.length; CART.mostrar = false; return renderCartoes() }
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
    if (t.id === 'pPer' || t.id === 'pfPeriod') { var cohort = $id(t.id === 'pPer' ? 'pTurma' : 'pfClass'); if (cohort) { var previous = cohort.value, choices = turmasDoPeriodo(t.value); cohort.innerHTML = choices.map(function(c) { return '<option value="'+c+'">'+c+'</option>' }).join(''); cohort.value = choices.indexOf(previous)>=0 ? previous : choices[0] } }
    if (['pPer','pTurma','pfPeriod','pfClass'].indexOf(t.id)>=0 || t.closest?.('[data-academic-key]')) refreshAcademic(t.id.startsWith('pf')?'pf':t.closest?.('#pfAcademic')?'pf':'p');
    if (t.matches && t.matches('[data-sx-lang-select]')) definirIdioma(t.value, true);
  });
  D.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches && t.matches('[data-sx-libq]')) { LIB.q = t.value; var pos = t.selectionStart; renderLibrary(); var n = D.querySelector('[data-sx-libq]'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos) } catch (_) {} } }
  });

  // foco draggável em modo PiP
  var focoDragData = { x: 0, y: 0, isDragging: false };
  D.addEventListener('dragstart', function (e) {
    var fc = $id('focusClock'); if (!fc || !fc.classList.contains('pip-mode')) return;
    focoDragData.isDragging = true;
    focoDragData.x = e.clientX - fc.getBoundingClientRect().left;
    focoDragData.y = e.clientY - fc.getBoundingClientRect().top;
    e.dataTransfer.effectAllowed = 'move';
  });
  D.addEventListener('dragover', function (e) { if (focoDragData.isDragging) e.preventDefault() });
  D.addEventListener('drop', function (e) {
    if (!focoDragData.isDragging) return;
    e.preventDefault();
    var fc = $id('focusClock'); if (!fc) return;
    var newX = e.clientX - focoDragData.x, newY = e.clientY - focoDragData.y;
    fc.style.right = 'auto'; fc.style.bottom = 'auto';
    fc.style.left = Math.max(0, Math.min(newX, W.innerWidth - 140)) + 'px';
    fc.style.top = Math.max(0, Math.min(newY, W.innerHeight - 140)) + 'px';
    focoDragData.isDragging = false;
  });
  D.addEventListener('dragend', function () { focoDragData.isDragging = false });

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
    if (studyEmbedded) {
      var studyName = studyQuery.get('sxStudySubject');
      if (DB.subjects[studyName]) {
        D.body.classList.add('sxStudyEmbedded'); openSubject(studyName);
        if (studyQuery.get('sxStudyMode') === 'practice') setSubjectMode('practice');
        setTab(studyQuery.get('sxStudyTab') || 'videos');
      }
    }
    if (q.toString()) try { history.replaceState(null, '', location.pathname) } catch (e) {}
  }
  function salvarAcesso() { db.doc('perfis/' + S.uid).set({ ultimo_acesso: agora() }, { merge: true }).catch(function () {}) }

  // ---------------------------------------------------------------- início
  aplicarTema(temaAtual());
  definirIdioma(idioma(), false);
  if (!W.SINUS_DEMO && 'serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(function () {});
  W.SinusApp = { S: S, salvarPrefs: salvarPrefs, sair: sair, montarDados: montarDados, abrirPersonalizacao: abrirPersonalizacao, definirIdioma: definirIdioma, aplicarTema: aplicarTema };
  if (studyEmbedded && W.SINUS_DEMO) backend.signIn();
})();
