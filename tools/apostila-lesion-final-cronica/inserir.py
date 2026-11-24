"""SINUS · apostila do Final (Anatomía Patológica I): inflamação crônica, granulomas e reparação no tema 01 e
o tema novo 03 (adaptação · coração hipertrofiado). Base: slides da Dra. Chamorro (Clase 10 e Clase 2), Robbins 9ª ed.
(compêndio, caps. 2 e 3) e as provas antigas dela.

Uso (na raiz do repo):
    python3 tools/apostila-lesion-final-cronica/banco.py      # questões novas no banco
    python3 tools/apostila-lesion-final-cronica/inserir.py    # este script
    python3 tools/apostila-lesion-treino/treino.py            # refaz os quadros "Treine como ela pergunta"

Idempotente: tudo o que entra fica entre <!--fc:nome--> e <!--/fc:nome--> (ou /*fc*/ no CSS, "fc": 1 no quiz) e é
apagado antes de inserir de novo; as trocas de texto aceitam o texto antigo ou o novo."""
import html, json, os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
AP = os.path.join(REPO, 'aulas/lesion/p2/apostila/final.html')
FR = os.path.join(HERE, 'frag')


def frag(nome):
    return open(os.path.join(FR, nome), encoding='utf-8').read().strip()


def bloco(nome, txt):
    return f'<!--fc:{nome}-->{txt}<!--/fc:{nome}-->'


def limpa(s):
    s = re.sub(r'<!--fc:([\w-]+)-->.*?<!--/fc:\1-->', '', s, flags=re.S)
    s = re.sub(r'/\*fc\*/.*?/\*/fc\*/', '', s, flags=re.S)
    return s


def troca(s, velho, novo, n=1):
    """Troca idempotente: aceita o texto antigo (troca) ou o novo (já trocado)."""
    if s.count(novo) >= n and velho not in s:
        return s
    assert s.count(velho) == n, ('texto não encontrado', velho[:80], s.count(velho))
    return s.replace(velho, novo)


def antes(s, ancora, txt):
    assert s.count(ancora) == 1, ('âncora', ancora[:80], s.count(ancora))
    i = s.find(ancora)
    return s[:i] + txt + s[i:]


# ------------------------------------------------------------------ quiz impresso
LET = 'ABCDEFG'


def ordem(q, k):
    """Ordem fixa das alternativas no impresso: a certa (o[0]) cai em posições variadas."""
    o = q['o']
    pos = (k * 2 + 1) % len(o)
    resto = o[1:]
    return resto[:pos] + [o[0]] + resto[pos:], pos


def qprint_itens(qs, ini):
    li, gab = [], []
    for k, q in enumerate(qs):
        ops, pos = ordem(q, ini + k)
        li.append('<li><div class="qp-q">' + html.escape(q['q'], quote=False) + '</div><ol class="qp-o">' +
                  ''.join(f'<li><b>{LET[j]}</b> {html.escape(x, quote=False)}</li>' for j, x in enumerate(ops)) + '</ol></li>')
        gab.append(f'<li><b>{ini + k + 1} · {LET[pos]}</b> {q["e"]}</li>')
    return ''.join(li), ''.join(gab)


def main():
    s = limpa(open(AP, encoding='utf-8').read())
    Z = json.load(open(os.path.join(HERE, 'quiz.json'), encoding='utf-8'))

    # ---------------- cabeçalho do tema 01 e rótulos
    s = troca(s, '<section class="topic" data-title="Inflamación aguda" id="inflamacion">',
              '<section class="topic" data-title="Inflamación y reparación" id="inflamacion">')
    s = troca(s, '<h2>Inflamación aguda</h2><div class="section-kicker">Clase 8 · Unidad II · Robbins 9ª ed. cap. 3 pág. 69 · 10ª ed. cap. 3 pág. 57 · Harsh Mohan cap. 6 pág. 130</div><p class="nx-sub">A resposta vascular e celular: sinais cardinais, vasos, exsudado, reclutamiento, padrões e mediadores.</p>',
              '<h2>Inflamación · <em>aguda, crónica y reparación</em></h2><div class="section-kicker">Clase 8 · Unidad II · Robbins 9ª ed. cap. 3 pág. 69 · 10ª ed. cap. 3 pág. 57 · Harsh Mohan cap. 6 pág. 130 · Clase 10 · Inflamación crónica · Robbins 9ª ed. cap. 3 pág. 93</div><p class="nx-sub">A resposta vascular e celular (sinais cardinais, vasos, exsudado, reclutamiento, padrões e mediadores), depois a inflamação crônica, os granulomas e a reparação.</p>')
    s = troca(s, '<h3 data-short="Casos resueltos" id="casos-inflamacion"><span class="no">1.7</span>',
              '<h3 data-short="Casos resueltos" id="casos-inflamacion"><span class="no">1.10</span>')
    s = troca(s, '<div class="quiz" data-label="Inflamación aguda" data-quiz="inflamacion"></div>',
              '<div class="quiz" data-label="Inflamación y reparación" data-quiz="inflamacion"></div>')
    # a questão de mediadores do Final 2024 foi para a numeração da transcrição (colidia com a nº 20 de neoplasias)
    s = troca(s, '<li class="her"><span class="ac-src">Final 2024 · nº 20</span><span class="ac-q">Teniendo en cuenta los siguientes mediadores',
              '<li class="her"><span class="ac-src">Final 2024 digitada · nº 21</span><span class="ac-q">Teniendo en cuenta los siguientes mediadores')
    # aria-label quebrado num organograma antigo (aspas dentro do atributo)
    s = troca(s, '<div aria-label="Organograma: INFLAMACIÓN " class="org" itis""="" role="img">',
              '<div aria-label="Organograma: INFLAMACIÓN ITIS" class="org" role="img">')

    # ---------------- menu lateral, início e numeração
    s = troca(s, '<span class="nav-num">01</span>Inflamación aguda<span class="score"></span>',
              '<span class="nav-num">01</span>Inflamación y reparación<span class="score"></span>')
    s = troca(s, '<a class="nav-link" data-go="repaso" href="#repaso"><span class="nav-num">03</span>',
              '<a class="nav-link" data-go="repaso" href="#repaso"><span class="nav-num">04</span>')
    s = antes(s, '<a class="nav-link" data-go="repaso" href="#repaso">',
              bloco('nav', '<a class="nav-link" data-go="adaptacion" href="#adaptacion"><span class="nav-num">03</span>Adaptación · corazón<span class="score"></span></a>'))
    s = troca(s, '<span id="progressText">0/3</span>', '<span id="progressText">0/4</span>')
    s = troca(s, '<h1>Inflamación aguda<br/>y neoplasias.</h1>', '<h1>Inflamación, adaptación<br/>y neoplasias.</h1>')
    s = troca(s, '<span class="ic-k">01</span><span class="ic-h">Inflamación aguda</span>',
              '<span class="ic-k">01</span><span class="ic-h">Inflamación y reparación</span>')
    s = troca(s, '<button type="button" class="ini-card wide" data-goto="repaso"><div class="ic-n">03</div><span class="ic-b"><span class="ic-k">03</span>',
              '<button type="button" class="ini-card" data-goto="repaso"><div class="ic-n">04</div><span class="ic-b"><span class="ic-k">04</span>')
    s = troca(s, '<div class="ini-grid">', '<div class="ini-grid n4">')
    s = antes(s, '<button type="button" class="ini-card" data-goto="repaso">',
              bloco('card', '<button type="button" class="ini-card" data-goto="adaptacion"><img class="ic-img" loading="lazy" src="img3d/miocardio.webp" alt=""><span class="ic-b"><span class="ic-k">03</span><span class="ic-h">Adaptación · corazón hipertrofiado</span></span></button>'))
    fim_css = s.rfind('</style>', 0, s.find('</head>'))
    s = s[:fim_css] + '/*fc*/@media(min-width:760px){.ini-grid.n4{grid-template-columns:repeat(4,minmax(0,1fr))}}/*/fc*/' + s[fim_css:]
    s = troca(s, '<section class="topic" data-title="Repaso final + simulado" id="repaso"><div class="section"><div class="section-head"><div class="section-number">03</div>',
              '<section class="topic" data-title="Repaso final + simulado" id="repaso"><div class="section"><div class="section-head"><div class="section-number">04</div>')

    # ---------------- tema 01: seções 1.7–1.9 antes dos casos, casos novos antes do quiz
    s = antes(s, '<h3 data-short="Casos resueltos" id="casos-inflamacion">',
              bloco('secoes', frag('1-cronica.html') + frag('2-granulomas.html') + frag('3-reparacion.html')))
    s = antes(s, '<div class="quiz" data-label="Inflamación y reparación" data-quiz="inflamacion"></div>', bloco('casos', frag('4-casos.html')))

    # ---------------- quiz (tela) e quiz impresso do tema 01
    q0 = s.find('window.QUIZZES=')
    q1 = s.find('</script>', q0)
    corpo = s[q0 + len('window.QUIZZES='):q1].strip()
    fimq = ';' if corpo.endswith(';') else ''
    Q = json.loads(corpo[:-1] if fimq else corpo)
    Q['inflamacion'] = [x for x in Q['inflamacion'] if not x.get('fc')]
    Q.pop('adaptacion', None)
    base = len(Q['inflamacion'])
    Q['inflamacion'] += [dict(x, fc=1) for x in Z['inflamacion']]
    novo = {}
    for k, v in Q.items():  # adaptacion logo depois de neoplasias
        novo[k] = v
        if k == 'neoplasias':
            novo['adaptacion'] = [dict(x, fc=1) for x in Z['adaptacion']]
    Q = novo
    s = s[:q0] + 'window.QUIZZES=' + json.dumps(Q, ensure_ascii=False) + fimq + s[q1:]

    total = base + len(Z['inflamacion'])
    s = re.sub(r'<div class="qp-t">Preguntas · Inflamación (?:aguda|y reparación) <small>\d+ preguntas',
               f'<div class="qp-t">Preguntas · Inflamación y reparación <small>{total} preguntas', s, count=1)
    s = troca(s, '<b class="qp-gt">Gabarito comentado · Inflamación aguda</b>', '<b class="qp-gt">Gabarito comentado · Inflamación y reparación</b>')
    i = s.find('<div class="qp-t">Preguntas · Inflamación y reparación')
    li, gab = qprint_itens(Z['inflamacion'], base)
    a = s.find('</ol><div class="qp-g">', i)
    s = s[:a] + bloco('qpi', li) + s[a:]
    b = s.find('</ol></div></div>', s.find('<b class="qp-gt">Gabarito comentado · Inflamación y reparación</b>'))
    s = s[:b] + bloco('qpg', gab) + s[b:]

    # ---------------- tema 03 novo
    li, gab = qprint_itens(Z['adaptacion'], 0)
    n = len(Z['adaptacion'])
    tema = (frag('5-adaptacion.html') +
            '<div class="quiz" data-label="Adaptación · corazón hipertrofiado" data-quiz="adaptacion"></div>'
            f'<div class="qprint"><div class="qp-t">Preguntas · Adaptación <small>{n} preguntas · gabarito comentado al final</small></div>'
            f'<ol class="qp-l">{li}</ol><div class="qp-g"><b class="qp-gt">Gabarito comentado · Adaptación</b><ol>{gab}</ol></div></div>'
            '<button class="complete-btn" data-complete="adaptacion">✓ Marcar tema como estudiado</button>'
            '<div class="topic-nav"><button class="btn" data-dir="prev"></button><span></span><button class="btn primary" data-dir="next"></button></div></div></section>')
    s = antes(s, '<section class="topic" data-title="Repaso final + simulado" id="repaso">', bloco('tema', tema))

    # ---------------- repaso: radar e seções I/II
    s = troca(s, '<h3 id="radar-final">O que mais cai em inflamação e neoplasias</h3>', '<h3 id="radar-final">O que mais cai no Final</h3>')
    D = json.loads(subprocess.check_output(['node', '-e',
        "global.window={};require(%r);process.stdout.write(JSON.stringify(window.SINUSAL_P2_DADOS))" % os.path.join(REPO, 'aulas/lesion/p2/dados.js')]))
    QB = {(q['p'], str(q['n'])) for q in D['qs']}

    def conta(chaves):
        for c in chaves:
            assert (c[0], str(c[1])) in QB, c
        return len(chaves)
    cro = conta([('f24t', 3), ('f24t', 4), ('f24t', 10), ('f24t', 13), ('f24t', 16), ('f24t', 28), ('rec23', 5), ('rec23', 13), ('rec23', 15)])
    rep = conta([('f24t', 2), ('f24t', 15), ('f24t', 19), ('f24t', '22b'), ('f24t', 31), ('f24t', '33b'), ('f24t', 35)])
    adp = conta([('f24t', 9), ('f24t', 22), ('f24t', 23), ('final24', 13), ('p1g26', 1), ('p1g26', 7), ('p1g26', 10), ('p1g26', 13),
                 ('p1g26', 18), ('p1g26', 21), ('par1', 5), ('par1', 13), ('par1', 17), ('p1c', 11), ('p1c', 13), ('par1r', 13), ('par1r', 18)])
    linhas = (f'<tr><td>Inflamación crónica y granulomas</td><td>{cro}</td><td>0</td><td>Dos características → infiltrado de células mononucleares e intentos de curación (angiogenia) · característica histológica → proliferación de pequeños vasos · activa macrófagos → interferón gamma · no necrosantes → sarcoidosis, enfermedad de Crohn, lepra · necrosantes → tuberculosis y sífilis · citoplasma granular rosado → células epitelioides (macrófagos activados)</td></tr>'
              f'<tr><td>Reparación y cicatrización</td><td>{rep}</td><td>0</td><td>Incisión limpia suturada → primera intención · úlceras y abscesos → segunda intención · exceso → cicatriz hipertrófica y queloide · deficiencia → úlcera y dehiscencia · médula ósea → lábiles · granulación × cicatriz → vasos, colágeno tipo III × tipo I, fibroblastos activos × inactivos</td></tr>'
              f'<tr><td>Adaptación: corazón hipertrofiado, hiperplasia, lábiles y estables</td><td>{adp}</td><td>0</td><td>Corazón hipertrofiado → aumento de proteínas contráctiles · ventrículo izquierdo en la hipertensión arterial → hipertrofia concéntrica · cardiomegalia → síntesis de proteínas aumentada · útero en el embarazo → hipertrofia del músculo liso · hepatectomía parcial → hiperplasia fisiológica compensadora · estrógenos → hiperplasia patológica · próstata → hiperplasia glandular</td></tr>')
    r0 = s.find('<h3 id="radar-final">')
    r1 = s.find('</table>', r0)
    s = s[:r1] + bloco('radar', linhas) + s[r1:]

    def ex(qn, qt, ans):
        return f'<div class="ex"><div class="qn">{qn}</div><div class="qt">{qt}</div>\n<details><summary>Gabarito</summary><div class="ans">{ans}</div></details></div>'
    cita = (ex('I.13', 'Cite dos características de la inflamación crónica.', 'Qualquer 2: <b class="r">infiltración por células mononucleares</b> (macrófagos, linfocitos y células plasmáticas), <b class="r">destrucción de los tejidos</b>, <b class="r">intentos de curación</b> (angiogenia y fibrosis).') +
            ex('I.14', 'Cite dos enfermedades granulomatosas no necrosantes y dos necrosantes.', 'No necrosantes: <b class="r">sarcoidosis</b>, <b class="r">enfermedad de Crohn</b>, <b class="r">lepra</b>. Necrosantes: <b class="r">tuberculosis</b> y <b class="r">sífilis</b>.') +
            ex('I.15', 'Cite dos anomalías por formación excesiva de componentes de la reparación y dos por deficiencia.', 'Exceso: <b class="r">cicatriz hipertrófica</b>, <b class="r">queloide</b> (y excrecencias carnosas). Deficiencia: <b class="r">dehiscencia</b> y <b class="r">úlcera</b>.') +
            ex('I.16', 'Cite las diferencias entre el tejido de granulación y la cicatriz.', 'Granulación: <b class="r">angiogénesis</b>, <b class="r">colágeno tipo III</b>, <b class="r">fibroblastos activos</b>. Cicatriz: <b class="r">desvascularización</b>, <b class="r">colágeno tipo I</b>, <b class="r">fibroblastos inactivos</b>.') +
            ex('I.17', 'Cite dos causas de hipertrofia cardíaca por sobrecarga de presión y dos por sobrecarga de volumen o miocardiopatía.', 'Presión: <b class="r">hipertensión arterial</b> y <b class="r">estenosis valvular</b>. Volumen o miocardiopatía: <b class="r">insuficiencia mitral</b> y <b class="r">enfermedad de Chagas</b> (gabarito de la 1ª parcial 2026).'))
    comp = (ex('II.15', 'Las células ______ presentan un citoplasma granular rosado con bordes celulares no diferenciados y derivan de ______.', '<b class="r">Epitelioides</b>; <b class="r">macrófagos activados</b>.') +
            ex('II.16', 'Una incisión quirúrgica limpia, no infectada y suturada cicatriza por ______; las úlceras y los abscesos, por ______.', '<b class="r">Primera intención</b>; <b class="r">segunda intención</b>.') +
            ex('II.17', 'Las células de la médula ósea, los ganglios linfáticos y la epidermis se clasifican como ______; las neuronas y el músculo cardíaco, como ______.', '<b class="r">Lábiles</b>; <b class="r">permanentes</b>.') +
            ex('II.18', 'En la hipertensión arterial, el ventrículo izquierdo desarrolla una hipertrofia ______ por aumento de la síntesis de ______.', '<b class="r">Concéntrica</b>; <b class="r">proteínas</b> (contráctiles, miofilamentos), sin células nuevas.') +
            ex('II.19', 'La proliferación del epitelio glandular endometrial en una mujer embarazada es un ejemplo de ______.', '<b class="r">Hiperplasia fisiológica</b> (hormonal).'))
    # bug antigo: um <style> posterior zera o fundo do cabeçalho (var(--gl) não existe) e o texto branco some
    s = troca(s, 'th{background:var(--gl)}', 'th{background:var(--gl,var(--acc))}')
    s = antes(s, '<h3 id="seccion-ii-completa-final">', bloco('cita', cita))
    s = antes(s, '<h3 id="vespera-final">', bloco('comp', comp))

    open(AP, 'w', encoding='utf-8').write(s)
    print('final.html: tema 01 com 1.7–1.9 e casos 4–6; tema 03 Adaptación;',
          f'quiz +{len(Z["inflamacion"])} / {n}; radar {cro}/{rep}/{adp}')


if __name__ == '__main__':
    main()
