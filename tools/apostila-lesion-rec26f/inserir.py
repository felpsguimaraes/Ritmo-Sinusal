"""SINUS · recuperatória da 2ª parcial da 5º F (23/11/2026) no banco e na apostila da 2ª parcial.

Uso (na raiz do repo):
    python3 tools/apostila-lesion-rec26f/inserir.py
    python3 tools/apostila-lesion-treino/treino.py      # refaz os quadros "Treine como ela pergunta"

Base: foto do gabarito oficial manuscrito (5º F, Filas 1 e 2) enviada em 24/11/2026. A prova não foi fotografada:
o enunciado de cada aberta é o da versão em que a mesma resposta já caiu (1º Parcial antigo, P1 Turma C,
2ª parcial 2026 da 5º G e a transcrição das provas antigas), e a nota (nt) diz de onde veio. O pareamento (9–10)
e a múltipla escolha (11–17) ficam de fora porque só há as letras; elas ficam guardadas em 'sub' da fonte.

Idempotente: tira a fonte rec26f, as questões dela e os <li data-rf> dos balões, e põe tudo de novo."""
import html, json, os, re

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DADOS = os.path.join(REPO, 'aulas/lesion/p2/dados.js')
AP = os.path.join(REPO, 'aulas/lesion/p2/apostila/index.html')
PRE = 'window.SINUSAL_P2_DADOS='
ROT = 'Recuperatoria 2026 · 5º F'   # rótulo do balão (mapa.ROTULO e FONTE de treino.js)

FONTE = {'id': 'rec26f', 'titulo': 'Recuperatoria 2ª parcial · 23/11/2026 · 5º F',
         'sub': 'Gabarito oficial manuscrito, Filas 1 e 2. Abertas 1 a 8, com o enunciado da versão anterior que tem a mesma '
                'resposta (a prova não foi fotografada). Pareamento (9–10) e múltipla escolha só com as letras: '
                'Fila 1 = 11C 12B 13D 14A 15A 16B 17D; Fila 2 = 11C 12D 13A 14B 15B 16C 17A.',
         'pags': ''}


def ct(n, t, tema, q, a, e, nt):
    return {'p': 'rec26f', 'n': n, 't': t, 'tema': tema, 'q': q, 'a': a, 'e': e, 'nt': nt}


NOVAS = [
    ct(1, 'cita', 'nec', 'Patrones de necrosis que presentan digestión enzimática:',
       'Licuefactiva, gangrena húmeda y caseosa (también grasa).',
       'Digestão enzimática (heterólise) é o contrário da desnaturação de proteínas, que dá coagulativa e gangrena seca '
       '(nº 1 da 2ª parcial da 5º F). A gangrena úmida é a gangrena com infecção bacteriana por cima, que soma necrose '
       'liquefativa. No 1º Parcial antigo ela aceitou as quatro: licuefactiva, grasa, gangrenosa húmeda y caseosa.',
       'Gabarito oficial, Fila 1, nº 1: "Licuefactiva, gangrena húmeda, caseosa". A prova não foi fotografada; o enunciado '
       'é o do 1º Parcial antigo (pág. 8 do PDF), em que a mesma lista foi aceita.'),
    ct(2, 'cita', 'apo', '2 situaciones de apoptosis patológica:',
       'Daño del ADN y mal plegamiento de proteínas.',
       'O slide dela lista também as infecções virais (hepatite viral, com linfócitos T citotóxicos) e a atrofia patológica '
       'por obstrução de ductos. Não confunda com a fisiológica: embriogênese, menstruação, involução hormonal.',
       'Gabarito oficial, Fila 1, nº 2: "Daño del ADN, mal plegamiento de proteínas". Enunciado reconstruído (prova não '
       'fotografada): a pergunta "Cite dos situaciones de apoptosis patológica" está na transcrição das provas antigas.'),
    ct(3, 'cita', 'acu', 'Cambios patológicos (agudos) que pueden sufrir las placas ateromatosas:',
       'Hemorragia y rotura (ulceración).',
       'Na 5º G o gabarito foi "rotura (ulceración o erosión), hemorragia y ateroembolia". A trombose não é cambio da '
       'placa: é consequência da rotura (ela frisou na correção).',
       'Gabarito oficial, Fila 1, nº 3: "Hemorragia, Rotura/Ulceración". Mesma resposta da nº 2 da 2ª parcial da 5º G; '
       'o enunciado é o dessa versão.'),
    ct(4, 'comp', 'nec', 'La ________ es un cambio nuclear caracterizado por pérdida de basofilia de la cromatina debido a la '
       'disolución nuclear por degradación enzimática.',
       'Cariólisis.',
       'Os três cambios nucleares da necrose: picnosis (retração e aumento da basofilia), cariorrexis (fragmentação) e '
       'cariólisis (dissolução pelas DNases). A apoptose não tem cariólisis.',
       'Gabarito oficial, Fila 1, nº 4. O enunciado é o da P1 Turma C (nº 4), que tem a mesma resposta.'),
    ct(5, 'comp', 'apo', 'En una infección viral, los linfocitos T citotóxicos provocan la muerte de los hepatocitos mediante '
       'la activación de las enzimas denominadas ______.',
       'Caspasas.',
       'Primeiro identifique o tipo de morte (apoptose), depois a enzima dela. É a resposta que mais se repete nas provas dela.',
       'Gabarito oficial, Fila 1, nº 5. Mesma resposta da nº 6 da 2ª parcial da 5º G; o enunciado é o dessa versão.'),
    ct(6, 'comp', 'acu', 'Los factores de crecimiento estimulan la síntesis de matriz extracelular, en especial de colágeno, '
       'producido en las placas por las ______.',
       'Células musculares lisas.',
       'Elas migram da média para a íntima e fabricam o colágeno da cápsula fibrosa. No gabarito está "Cél. musculares '
       'lisas": na prova, escreva sem abreviar.',
       'Gabarito oficial, Fila 1, nº 6. Mesma resposta da nº 7 da 2ª parcial da 5º G; o enunciado é o dessa versão.'),
    ct(7, 'cita', 'nec', 'Órganos en los que se produce un infarto blanco (anémico):',
       'Riñón, bazo y corazón.',
       'Infarto blanco: oclusão arterial em órgão sólido com circulação terminal, necrose coagulativa em forma de cunha. '
       'O rojo é o contrário: dupla circulação ou tecido frouxo (pulmão, intestino delgado) e oclusão venosa (torção '
       'testicular ou ovariana), nº 3 da 2ª parcial da 5º G.',
       'Gabarito oficial, Fila 1, nº 7: "Riñón, bazo, corazón". Enunciado reconstruído (prova não fotografada): nas provas '
       'antigas ela pediu "dos órganos donde puede producirse un infarto rojo"; esta é a mesma pergunta para o infarto blanco.'),
    ct(8, 'cita', 'nec', '2 cambios morfológicos de la lesión celular irreversible (necrosis):',
       'Rotura de la membrana celular y fragmentación del núcleo.',
       'A rotura da membrana é o que só a necrose tem e o que faz ela inflamar. A fragmentação do núcleo (cariorrexis) '
       'também existe na apoptose; se a pergunta pedir o que diferencia da apoptose, junte inflamación o cariólisis.',
       'Gabarito oficial, Fila 1, nº 8: "Rotura de membrana celular, fragmentación del núcleo". Enunciado reconstruído '
       '(prova não fotografada); a transcrição das provas antigas tem a versão de microscopia eletrônica, com rotura de la '
       'membrana plasmática y figuras de mielina.'),
]

# balão da apostila que recebe cada questão: início do enunciado de uma questão que já está nele
BALAO = {
    1: '2 patrones de necrosis en los que predomina la desnaturalización',
    2: 'Las células tienen mecanismos por los cuales reparan el daño en el ADN',
    3: 'Cambios patológicos (agudos) que pueden sufrir las placas ateromatosas',
    4: 'Picnosis es un cambio nuclear caracterizado por ________',
    5: 'En una infección viral, los linfocitos T citotóxicos provocan',
    6: 'Los factores de crecimiento estimulan la síntesis de matriz extracelular',
    7: '2 condiciones que determinan que un órgano sufra un infarto hemorrágico',
    8: '¿Qué hallazgo indicativo de necrosis podrás observar al microscopio electrónico?',
}

# o 1º Parcial antigo aceitou quatro padrões de digestão enzimática (pág. 8 do PDF); o banco só tinha dois
PAR1_A = ('Necrosis licuefactiva y necrosis grasa.', 'Necrosis licuefactiva y necrosis grasa (también gangrenosa húmeda y caseosa).')
P2_26_E = ('Digestão enzimática seria licuefactiva e grasa.',
           'O contrário, digestão enzimática, é licuefactiva, grasa, gangrena húmeda y caseosa: as quatro foram aceitas no '
           '1º Parcial antigo, e a recuperatória de 23/11/2026 deu licuefactiva, gangrena húmeda y caseosa.')
TEXTO_AP = [
    ('<span class="ac-a">→ Necrosis licuefactiva y necrosis grasa.</span>',
     '<span class="ac-a">→ Necrosis licuefactiva y necrosis grasa (también gangrenosa húmeda y caseosa).</span>'),
    ('Numa lista de "digestión enzimática", licuefactiva e grasa são as respostas seguras.</li>',
     'Numa lista de "digestión enzimática", licuefactiva e grasa são as respostas seguras, mas ela aceita também gangrena '
     'húmeda y caseosa: as quatro estão certas no 1º Parcial antigo, e a recuperatória de 23/11/2026 deu licuefactiva, '
     'gangrena húmeda y caseosa.</li>'),
    ('<span class="a">Licuefactiva y grasa</span> (<mark class="sl-y"><b class="sl-b">gangrena húmeda</b></mark> também aceita)',
     '<span class="a">Licuefactiva y grasa</span> (<mark class="sl-y"><b class="sl-b">gangrena húmeda</b></mark> e '
     '<mark class="sl-y"><b class="sl-b">caseosa</b></mark> também aceitas)'),
]


def troca(s, velho, novo):
    """Troca idempotente: aceita o texto antigo (troca) ou o novo (já trocado)."""
    if novo in s and velho not in s.replace(novo, ''):
        return s
    assert s.count(velho) == 1, ('texto não encontrado', velho[:80], s.count(velho))
    return s.replace(velho, novo)


def banco():
    s = open(DADOS, encoding='utf-8').read()
    assert s.startswith(PRE)
    corpo = s[len(PRE):].rstrip('\n')
    fim = ';' if corpo.endswith(';') else ''
    D = json.loads(corpo[:-1] if fim else corpo)
    D['qs'] = [q for q in D['qs'] if q['p'] != 'rec26f']
    D['fontes'] = [f for f in D['fontes'] if f['id'] != 'rec26f']
    i = next(k for k, f in enumerate(D['fontes']) if f['id'] == 'r26g')
    D['fontes'].insert(i + 1, dict(FONTE))
    for q in D['qs']:
        if q['p'] == 'par1' and q['n'] == 2 and q['a'] == PAR1_A[0]:
            q['a'] = PAR1_A[1]
        if q['p'] == 'p2_26' and q['n'] == 1 and P2_26_E[0] in q.get('e', ''):
            q['e'] = q['e'].replace(P2_26_E[0], P2_26_E[1])
    D['qs'].extend(NOVAS)
    for f in D['fontes']:
        f['n'] = sum(1 for q in D['qs'] if q['p'] == f['id'])
    open(DADOS, 'w', encoding='utf-8').write(PRE + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + fim + '\n')
    return D


def apostila(D):
    s = open(AP, encoding='utf-8').read()
    s = re.sub(r'<li class="her" data-rf="1">.*?</li>', '', s, flags=re.S)
    Q = {(q['p'], q['n']): q for q in D['qs']}
    for n, ancora in BALAO.items():
        alvo = '<span class="ac-q">' + ancora
        assert s.count(alvo) == 1, ('âncora do balão', ancora, s.count(alvo))
        i = s.find(alvo)
        ini = s.rfind('<details class="alerta-cai"', 0, i)
        ul = s.find('<ul>', ini) + len('<ul>')
        q = Q[('rec26f', n)]
        li = (f'<li class="her" data-rf="1"><span class="ac-src">{ROT} · nº {n}</span>'
              f'<span class="ac-q">{html.escape(q["q"], quote=False)}</span><span class="ac-a">→ {html.escape(q["a"], quote=False)}</span></li>')
        s = s[:ul] + li + s[ul:]
    # contagem de cada balão
    def conta(m):
        bloco = m.group(0)
        k = bloco.count('<li class="her"') + bloco.count('<li class="ban"')
        return re.sub(r'<b class="ac-n">\d+ quest(?:ão|ões)</b>', f'<b class="ac-n">{k} {"questão" if k == 1 else "questões"}</b>', bloco, count=1)
    s = re.sub(r'<details class="alerta-cai".*?</details>', conta, s, flags=re.S)
    for velho, novo in TEXTO_AP:
        s = troca(s, velho, novo)
    open(AP, 'w', encoding='utf-8').write(s)
    return s.count('data-rf="1"')


def main():
    D = banco()
    n = apostila(D)
    print(f'dados.js: fonte rec26f com {len(NOVAS)} questões, total {len(D["qs"])}; apostila: {n} itens nos balões')


if __name__ == '__main__':
    main()
