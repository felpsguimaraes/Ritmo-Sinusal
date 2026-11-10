"""SINUS · Apostila da 2ª parcial de Anatomía Patológica I (aula Lesión celular), estilo 3D.
Uso (na raiz do repo): python3 tools/apostila-lesion-p2/build.py && python3 tools/apostila-lesion-p2/gerar-pdf.py
Lê base.html (texto da apostila v4), escreve aulas/lesion/p2/apostila/index.html e img3d/.
Precisa de beautifulsoup4 e Pillow. O texto da apostila é para alunos: nada de recados ao autor (ver LIMPA)."""
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from bs4 import BeautifulSoup, Comment
from PIL import Image
from gal import *
from scene import *
from css import CSS
from js import JS

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, '..', '..'))
OUT = REPO + '/aulas/lesion/p2/apostila/index.html'
IMG_SRC = REPO + '/aulas/lesion/img'
IMG_DST = REPO + '/aulas/lesion/p2/apostila/img3d'

# ------------------------------------------------ imagens 3D (webp leves; ampliar abre o jpg original)
USADAS = ['necrosis-apoptosis', 'irreversibilidad', 'secuencia', 'morfologia', 'nucleo', 'miocardio', 'rinon', 'cerebro', 'absceso', 'gangrena',
          'tuberculosis', 'pancreas', 'fibrinoide', 'infarto-rojo', 'cuerpos-fagocitosis', 'eliminacion', 'apoptosoma', 'vias-bcl2', 'vs-necrosis',
          'visao-geral', 'esteatosis-organos', 'esteatosis-morfologia', 'ateroma-espumosas', 'placas-estria', 'cambios-agudos',
          'xantomas-colesterolosis', 'niemann-glucogeno']
THUMBS = ['miocardio', 'rinon', 'cerebro', 'absceso', 'gangrena', 'tuberculosis', 'pancreas', 'fibrinoide']
os.makedirs(IMG_DST, exist_ok=True)
for n in USADAS:
    dst = f'{IMG_DST}/{n}.webp'
    if not os.path.exists(dst):
        im = Image.open(f'{IMG_SRC}/{n}.jpg').convert('RGB')
        im.thumbnail((1400, 1400), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=80, method=6)
for n in THUMBS:
    dst = f'{IMG_DST}/t-{n}.webp'
    if not os.path.exists(dst):
        im = Image.open(f'{IMG_SRC}/{n}.jpg').convert('RGB')
        w, h = im.size; s = min(w, h * 4 / 3)
        im = im.crop(((w - s) / 2, (h - s * 3 / 4) / 2, (w + s) / 2, (h + s * 3 / 4) / 2))
        im.thumbnail((420, 420), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=78, method=6)

assert set(USADAS) == {n for n in USADAS if os.path.exists(f'{IMG_SRC}/{n}.jpg')}

# ------------------------------------------------ textos novos
FACIL = {
 'necrosis': facil('la casa que se incendia',
   '<p>Pense na célula como uma casa com gerador (<b>mitocondria</b>) e portas automáticas (<b>bomba Na⁺/K⁺</b>). Na <b>necrosis</b> o gerador queima:</p><ul>'
   '<li>sem <b>ATP</b> as portas param: entra água e a célula <b>incha</b>;</li>'
   '<li>entra <b>Ca²⁺</b>, que liga as "máquinas de demolição": <b>fosfolipasas</b> (membrana), <b>proteasas</b> (citoesqueleto), <b>endonucleasas</b> (núcleo);</li>'
   '<li>as paredes (<b>membranas</b>) rompem, o conteúdo vaza para a rua e chegam os bombeiros: <b>inflamación</b>.</li></ul>'
   '<p>Por isso a necrose é <b>accidental</b> e <b>siempre patológica</b>. A apoptose é o oposto: demolição planejada, sem sujeira.</p>'),
 'apoptosis': facil('la demolición programada',
   '<p>A <b>apoptosis</b> desmonta a célula por dentro com tesouras próprias (<b>caspasas</b>), embala tudo em pacotes fechados (<b>cuerpos apoptósicos</b>) e o caminhão (<b>macrófago</b>) leva sem sujar a rua: <b>sin inflamación</b>.</p><ul>'
   '<li><b>Vía intrínseca (mitocondrial)</b>: o alarme toca dentro de casa (dano no ADN, falta de fatores de crescimento) e a mitocôndria solta o <b>citocromo c</b>.</li>'
   '<li><b>Vía extrínseca</b>: a ordem vem de fora, por um <b>receptor de muerte</b> (Fas–FasL, TNF).</li>'
   '<li><b>Necroptosis</b>: começa programada como a apoptose, mas termina como necrose (membrana rompe e inflama), sem caspasas.</li></ul>'),
 'acumulacion': facil('el depósito que se llena',
   '<p>Pense num depósito. Algo se acumula dentro da célula por <b>4 motivos</b>:</p><ul>'
   '<li>chega demais e a saída não dá conta: <b>esteatosis</b> no álcool;</li>'
   '<li>sai com defeito de embalagem e não é despachado: dobramento ou transporte defeituoso (<b>α1-antitripsina</b>);</li>'
   '<li>falta o funcionário que desmonta: enzima lisossômica ausente (<b>Niemann-Pick</b>, <b>glucogenosis</b>);</li>'
   '<li>chega algo que ninguém sabe desmontar: pigmentos e partículas exógenas.</li></ul>'),
 'clase7': facil('gotitas, papel arrugado y cemento',
   '<ul><li><b>Proteínas</b> = <b>gotículas rosadas</b>. A célula engole demais (túbulo renal na proteinúria), produz demais (Ig no plasmócito → <b>Russell</b>), não consegue exportar (<b>α1-antitripsina</b>) ou o esqueleto embola (<b>Mallory</b>, Alzheimer, Lewy).</li>'
   '<li><b>Amiloide</b> = proteína mal dobrada que vira um "papel amassado" rígido <b>fora</b> das células; no Rojo Congo polarizado brilha <b>verde manzana</b>.</li>'
   '<li><b>Calcio</b> = vira "cimento". No tecido <b>morto</b>, com cálcio normal no sangue: <b>distrófica</b>. No tecido <b>sano</b>, porque sobra cálcio no sangue: <b>metastásica</b>.</li></ul>'),
 'inflamacion': facil('la ciudad llama a la policía',
   '<ul><li>O vigia (<b>mastocito</b>) toca o alarme: <b>histamina</b>.</li>'
   '<li>A avenida (arteríola) se alarga e enche de sangue: <b>vasodilatación</b> → <b>rubor</b> y <b>calor</b>.</li>'
   '<li>As calçadas viram peneira: <b>↑ permeabilidad</b> → sai líquido rico em proteína (<b>exudado</b>) → <b>tumor</b>.</li>'
   '<li>O trânsito fica lento (<b>estasis</b>) e as viaturas (<b>neutrófilos</b>) encostam no meio-fio (marginación), freiam (rodamiento), param (adhesión), passam entre os prédios (diapédesis), seguem o cheiro (quimiotaxia) e prendem o ladrão (fagocitosis).</li></ul>'),
}

def row(*figs):
    return '<div class="gem-row">' + ''.join(figs) + '</div>'

F = lambda n, alt, cap, wide=False: fig3d(n, alt, cap, wide)

FLUXO_ATP = fluxo('Del daño al estallido de la célula', ['Isquemia · toxinas · infecciones · trauma', ('↓ ATP (mitocondria dañada)', 'r'), 'Falla la bomba Na⁺/K⁺ ATPasa: entra agua',
                  ('Entra Ca²⁺ al citosol', 'a'), ('Fosfolipasas · proteasas · endonucleasas · ATPasas', 'a'), ('Rotura de membranas plasmática y lisosómica', 'r'),
                  'Enzimas lisosómicas digieren la célula · el contenido sale', ('Reacción inflamatoria', 'p')])
FLUXO_ATEROMA = fluxo('Patogenia de la placa, paso a paso', ['Lesión endotelial (HTA, tabaco, LDL alta, diabetes)', ('LDL entra en la íntima y se oxida', 'a'),
                      'Monocitos se adhieren, entran y se vuelven macrófagos', ('Fagocitan LDL oxidada → células espumosas', 'a'), ('Estría grasa', 'a'),
                      'Músculo liso migra a la íntima y produce colágeno', ('Placa fibrosa: capa fibrosa + núcleo necrótico de lípidos', 'r'), ('Cambios agudos: rotura, hemorragia, trombosis', 'r')])
FLUXO_AMILOIDE = fluxo('Del plegamiento al verde manzana', ['Proteína normal en exceso o proteína mutada', ('Se pliega mal', 'p'), ('Fibrillas anómalas insolubles', 'p'),
                       'Depósito EXTRACELULAR, empieza entre las células', ('Órgano grande, firme, grisáceo', 'a'), ('Rojo Congo + luz polarizada = verde manzana', 'g')])
FLUXO_DISTROF = fluxo('Patogenia de la calcificación distrófica', ['Tejido necrótico o degenerado', 'Proteínas desnaturalizadas se unen al fosfato',
                      ('+ Ca²⁺ → fosfato de calcio', 'b'), ('1. Iniciación: mitocondrias o vesículas de membrana', 'b'), ('2. Propagación: cristales', 'b'),
                      ('Basófilo, granular, amorfo · con el tiempo, hueso heterotópico', 'p')])
FLUXO_INFL = fluxo('La inflamación aguda en una línea (esquema de apertura del Robbins)', ['Estímulo: infección, necrosis, cuerpo extraño, inmunidad',
                   ('Células centinela (mastocitos, macrófagos) liberan mediadores', 'a'), ('Cambios vasculares: vasodilatación + ↑ permeabilidad', 'r'),
                   ('Reclutamiento de leucocitos (neutrófilos)', 'p'), 'Eliminación del agente', ('Reparación', 'g')])

VS_NEC_APO = vs('Necrosis', 'Accidental · siempre patológica', '<ul><li>célula <b>aumenta</b> (edema)</li><li>membrana <b>rota</b>, contenido sale</li><li><b>inflamación</b></li><li>picnosis → cariorrexis → cariólisis</li></ul>',
                'Apoptosis', 'Programada · fisiológica o patológica', '<ul><li>célula <b>se encoge</b></li><li>membrana <b>íntegra</b>, cuerpos apoptósicos</li><li><b>sin inflamación</b></li><li>condensación de la cromatina · caspasas</li></ul>')
VS_CALC = vs('Distrófica', 'Tejido lesionado o muerto', '<ul><li>Ca²⁺ sérico <b>normal</b></li><li>generalmente <b>irreversible</b></li><li>necrosis, ateroma, válvulas, Mönckeberg, TB, psamoma</li></ul>',
             'Metastásica', 'Tejido normal', '<ul><li><b>HIPERCALCEMIA</b> (PTH, mieloma, metástasis óseas, vit. D, IRC)</li><li><b>reversible</b> si se corrige la causa</li><li>mucosa gástrica, riñón, pulmón, vasos</li></ul>')

def pcard(n, nome, sub, tip):
    return (f'<img src="img3d/t-{n}.webp" alt="" loading="lazy" decoding="async">', nome, sub, tip)

G_PNEC = galeria('Galería · los 6 patrones de necrosis en 3D', [
    pcard('miocardio', 'Coagulativa', 'infarto de miocardio', '<b>Necrosis coagulativa</b><br>Isquemia de órgãos sólidos (menos o cérebro). A arquitetura se conserva por dias: células "fantasma" eosinófilas sem núcleo. Ex.: <b>infarto de miocardio</b>.'),
    pcard('rinon', 'Coagulativa · cuña', 'infarto renal blanco', '<b>Infarto renal</b> em <b>cunha</b>: base na cápsula, vértice para o hilo. Pálido = <b>infarto blanco</b> (circulação terminal).'),
    pcard('cerebro', 'Licuefactiva', 'infarto cerebral', '<b>Necrosis licuefactiva</b><br>No <b>SNC</b> a isquemia liquefaz o tecido e deixa uma <b>cavidade quística</b>.'),
    pcard('absceso', 'Licuefactiva · absceso', 'bacterias · hongos', '<b>Absceso</b><br>Infecções bacterianas ou fúngicas: as enzimas dos <b>neutrófilos</b> digerem o tecido e formam <b>pus</b> cremoso.'),
    pcard('gangrena', 'Gangrenosa', 'seca × húmeda', '<b>Gangrenosa</b> (termo clínico): isquemia de um membro, geralmente inferior. <b>Seca</b> = coagulativa; <b>húmeda</b> = infecção sobreposta (licuefactiva).'),
    pcard('tuberculosis', 'Caseosa', 'tuberculosis · granuloma', '<b>Necrosis caseosa</b><br>Branco-amarelada e friável como <b>queijo</b>; típica da <b>tuberculosis</b>, no centro de um <b>granuloma</b>.'),
    pcard('pancreas', 'Grasa', 'pancreatitis aguda', '<b>Necrosis grasa</b><br>Lipases pancreáticas destroem a gordura; ácidos graxos + cálcio = <b>saponificación</b> (manchas brancas como giz).'),
    pcard('fibrinoide', 'Fibrinoide', 'vasos · inmunocomplejos', '<b>Necrosis fibrinoide</b><br><b>Inmunocomplejos + fibrina</b> na parede dos vasos: material rosa brilhante. Vasculites, LES.'),
], dica='Toca cada patrón para ver la clave; las ilustraciones grandes están en cada subtema abajo.', tap='toca cada patrón')

# ------------------------------------------------ montagem
s = open(HERE + '/base.html', encoding='utf-8').read()
# texto para alunos: sem recados ao dono nem comandos dados a quem montou a apostila
LIMPA = [
    ('<div class="callout slide"><b class="t">Conferido com o PDF novo da Clase 4</b>O PDF que você mandou tem o mesmo texto do slide que já estava aqui. Tudo coberto.</div>', ''),
    ('<div class="callout slide"><b class="t">Conferido com o PDF novo da Clase 5</b>Idêntico ao slide já usado. Tudo coberto.</div>', ''),
    ('<div class="callout slide"><b class="t">Conferido com o PDF novo da Clase 8</b>O PDF "Clase 8 · Inflamación aguda" tem o mesmo conteúdo do slide que usamos (antes numerado Clase 9). Nada novo a acrescentar.</div>', ''),
    ('<div class="callout slide"><b class="t">Conferido com o PDF novo da Clase 6</b>O slide novo de acumulação cobre', '<div class="callout green"><b class="t">O que o slide da Clase 6 cobre</b>O slide de acumulação cobre'),
    ('só aparecem citados de passagem; o conteúdo deles abaixo vem do slide antigo. Estude-os por último.', 'aparecem só de passagem: estude-os por último.'),
    ('Isso é minha leitura do Robbins; o slide dela lista as figuras só na irreversível.', 'Essa leitura vem do Robbins; o slide da Dra. lista as figuras só na irreversível.'),
    ('Se as duas estiverem nas opções e a questão pedir uma só, eu marcaria', 'Se as duas estiverem nas opções e a questão pedir uma só, marque'),
    ('Isso é inferência minha; não há gabarito oficial dessa versão.', 'Não há gabarito oficial dessa versão.'),
    ('Fora do seu slide · caiu em turmas que tinham pigmentos', 'Fora do slide · caiu em turmas que tinham pigmentos'),
    ('no slide da sua Clase 6', 'no slide da Clase 6'),
    ('Não há prova antiga dela sobre a Clase 7 no material enviado; as perguntas', 'Não há prova antiga da Dra. sobre a Clase 7; as perguntas'),
    (', enviada pelo Felipe em 28/09/2026.', '.'),
    ('<span class="pill">Clase 7 nova</span>', '<a class="pill pdf-dl" href="apostila-p2.pdf?v=2" download="Apostila 2a parcial Anatomia Patologica I.pdf">⬇ Baixar em PDF</a>'),
    ('Proteínas, amiloide, calcio<span class="new">novo</span>', 'Proteínas, amiloide, calcio'),
    (' <span class="pillx">novo</span>', ''),
    ('<span class="pillx">novo · sem prova antiga</span>', '<span class="pillx">sem prova antiga</span>'),
    ('<div class="callout slide"><b class="t">Slide · qué cambió este semestre</b>A aula de acumulação agora tem', '<div class="callout green"><b class="t">Como a acumulação se divide</b>A aula de acumulação tem'),
    ('A esteatose e o glicogênio continuam acima porque estavam no slide antigo, mas <strong>não aparecem no slide novo</strong>: estude por último.', 'A esteatose e o glicogênio vinham no slide antigo e <strong>não aparecem no slide atual</strong>: estude por último.'),
    ('contradiz o slide, segui o slide e sinalizei.', 'contradiz o slide, vale o slide (está sinalizado).'),
]
for a, b in LIMPA:
    assert s.count(a) == 1, a[:60]
    s = s.replace(a, b)
s = s.replace('(só citada no slide novo)', '(só citada no slide atual)')
soup = BeautifulSoup(s, 'html.parser')
PH = {}
def ph(html):
    k = f'PH{len(PH):03d}'
    PH[k] = html
    t = soup.new_tag('div'); t['data-ph'] = k
    return t

def topic(tid):
    t = soup.find(id=tid)
    assert t is not None, tid
    return t

def heading(tid, txt, nth=0, names=('h3', 'h4')):
    hs = [h for h in topic(tid).find_all(names) if txt in h.get_text()]
    assert len(hs) > nth, (tid, txt, len(hs))
    return hs[nth]

def secao(h):
    out = []
    n = h.find_next_sibling()
    while n is not None and n.name not in ('h3', 'h4'):
        out.append(n); n = n.find_next_sibling()
    return out, n

def after_org(h, html):
    els, _ = secao(h)
    for e in els:
        if 'org' in (e.get('class') or []):
            e.insert_after(ph(html)); return
    h.insert_after(ph(html))

def before_lam(h, html):
    els, nxt = secao(h)
    for e in els:
        if 'laminas' in (e.get('class') or []):
            e.insert_before(ph(html)); return
    if nxt is not None:
        nxt.insert_before(ph(html))
    else:
        (els[-1] if els else h).insert_after(ph(html))

def after_sum(tid, html):
    topic(tid).select_one('.sum60').insert_after(ph(html))

# 1) textos literais do slide e do repaso -> recolhidos
n_sl = n_rep = 0
for c in soup.select('div.callout.slide'):
    t = c.find('b', class_='t')
    tt = t.get_text(' ', strip=True) if t else 'Slide'
    if tt.lower().startswith('slide'):
        rest = tt[5:].strip(' ·:')
        summ = 'Texto literal del slide' + (' · ' + rest if rest else '')
    else:
        summ = tt
    if t: t.extract()
    d = soup.new_tag('details'); d['class'] = 'slidebox'
    sm = soup.new_tag('summary'); sm.string = summ
    c.wrap(d); d.insert(0, sm); n_sl += 1
for c in soup.select('div.callout.repaso'):
    t = c.find('b', class_='t')
    tt = t.get_text(' ', strip=True) if t else ''
    rest = re.sub(r'^repaso\s*·?\s*', '', tt, flags=re.I)
    if t: t.extract()
    d = soup.new_tag('details'); d['class'] = 'repbox'
    sm = soup.new_tag('summary'); sm.string = 'Lo que dijo la Dra. en la clase de repaso' + (' · ' + rest if rest else '')
    c.wrap(d); d.insert(0, sm); n_rep += 1

# 2) recortes de slide -> miniaturas
def lam_wrap(figs, anchor):
    box = soup.new_tag('div'); box['class'] = 'laminas'
    sp = soup.new_tag('span'); sp['class'] = 'lam-t'; sp.string = 'Láminas y esquemas del slide · toca para ampliar'
    rowd = soup.new_tag('div'); rowd['class'] = 'lam-row'
    box.append(sp); box.append(rowd)
    anchor.insert_before(box)
    for fg in figs:
        rowd.append(fg.extract())
    return box
n_lam = 0
for fgd in soup.select('div.figgrid'):
    figs = fgd.find_all('figure', recursive=False)
    lam_wrap(figs, fgd); fgd.decompose(); n_lam += len(figs)
for fg in soup.select('figure.photo'):
    if fg.find_parent(class_='lam-row') is None and fg.img and fg.img.get('src', '').startswith('img/'):
        lam_wrap([fg], fg); n_lam += 1

# 3) cadeias -> fluxos
for ch in soup.select('div.chain'):
    nos = [sp.get_text(strip=True) for sp in ch.find_all('span')]
    cores = ['', 'a', 'r', 'p', 'b', 'g']
    ch.replace_with(ph(fluxo('', [(n, cores[i % len(cores)] or None) if i else n for i, n in enumerate(nos)])))

# 4) inserções por tema
after_sum('necrosis', F('necrosis-apoptosis', 'Necrosis y apoptosis lado a lado', '<b>Dos maneras de morir.</b> Izquierda: <b>necrosis</b>, la célula se hincha, la membrana se rompe y el contenido sale, con inflamación. Derecha: <b>apoptosis</b>, la célula se encoge, se fragmenta en cuerpos apoptósicos y el macrófago los come sin inflamación.') + FACIL['necrosis'])
h = heading('necrosis', 'Da lesão à morte celular')
after_org(h, F('irreversibilidad', 'Lesión celular irreversible', '<b>Lesión irreversible:</b> mitocondrias con densidades amorfas, membranas plasmática y de organelas rotas, lisosomas liberando enzimas.') + FLUXO_ATP)
before_lam(h, F('secuencia', 'Célula necrótica que estalla', 'La célula necrótica <b>estalla</b>: el contenido sale al tejido y atrae neutrófilos y macrófagos. Por eso la necrosis inflama.'))
after_org(heading('necrosis', 'Morfologia da necrose'), F('morfologia', 'Morfología de la necrosis', '<b>Morfología:</b> citoplasma eosinófilo y vítreo, <b>figuras de mielina</b> (espirales de membrana) y núcleos que se condensan, se fragmentan o desaparecen.'))
before_lam(heading('necrosis', 'Cambios nucleares'), F('nucleo', 'Picnosis, cariorrexis y cariólisis', 'De izquierda a derecha: núcleo <b>normal</b>, <b>picnosis</b> (encogido e hipercromático), <b>cariorrexis</b> (fragmentado) y <b>cariólisis</b> (se desvanece).') + G_NUCLEO)
after_org(heading('necrosis', 'Organograma dos padrões de necrose'), G_PNEC)
before_lam(heading('necrosis', 'Necrosis coagulativa'), row(F('miocardio', 'Infarto de miocardio', '<b>Infarto de miocardio:</b> necrosis coagulativa; las fibras conservan el contorno pero pierden el núcleo.'),
                                                            F('rinon', 'Infarto renal en cuña', '<b>Infarto renal en cuña</b> (blanco), base en la cápsula.')))
before_lam(heading('necrosis', 'Necrosis licuefactiva'), row(F('cerebro', 'Infarto cerebral', '<b>Infarto cerebral:</b> el tejido se licúa y queda una cavidad quística.'),
                                                             F('absceso', 'Absceso', '<b>Absceso:</b> pus cremoso por las enzimas de los neutrófilos.')))
before_lam(heading('necrosis', 'Necrosis gangrenosa'), F('gangrena', 'Gangrena seca y húmeda', '<b>Gangrena seca</b> (izq., momificada, coagulativa) × <b>húmeda</b> (der., infectada, licuefactiva).'))
before_lam(heading('necrosis', 'Necrosis caseosa'), F('tuberculosis', 'Necrosis caseosa en tuberculosis', '<b>Tuberculosis:</b> necrosis caseosa blanco-amarillenta en el centro del granuloma.'))
before_lam(heading('necrosis', 'Necrosis grasa'), F('pancreas', 'Necrosis grasa pancreática', '<b>Pancreatitis aguda:</b> focos blancos de saponificación (ácidos grasos + calcio).'))
before_lam(heading('necrosis', 'Necrosis fibrinoide'), F('fibrinoide', 'Necrosis fibrinoide', '<b>Necrosis fibrinoide:</b> inmunocomplejos y fibrina en la pared del vaso.'))
before_lam(heading('necrosis', 'Infarto rojo × blanco'), F('infarto-rojo', 'Infarto rojo de intestino y pulmón', '<b>Infarto rojo</b> (hemorrágico): intestino y pulmón, órganos con doble circulación o tejido laxo.'))

after_sum('apoptosis', F('cuerpos-fagocitosis', 'Cuerpos apoptósicos y fagocitosis', '<b>Apoptosis:</b> la célula se fragmenta en <b>cuerpos apoptósicos</b> envueltos en membrana y el <b>macrófago</b> los fagocita sin inflamación.') + FACIL['apoptosis'])
before_lam(heading('apoptosis', 'Morfología', names=('h3',)), F('eliminacion', 'Eliminación de células apoptósicas', 'Macrófago eliminando cuerpos apoptósicos en el tejido, <b>sin inflamación</b> alrededor.') + G_APOP)
after_org(heading('apoptosis', 'Organograma das vias da apoptose'), F('apoptosoma', 'Vías de la apoptosis', '<b>Las dos vías:</b> la mitocondria libera <b>citocromo c</b> y forma el apoptosoma (intrínseca); el receptor de muerte <b>Fas</b> activa caspasas (extrínseca).'))
before_lam(heading('apoptosis', 'Vía intrínseca'), F('vias-bcl2', 'BCL2 y la vía mitocondrial', '<b>BCL2 × BAX/BAK:</b> cuando ganan BAX y BAK, la membrana mitocondrial externa se vuelve permeable y sale el citocromo c.'))
after_org(heading('apoptosis', 'Necrose × apoptose × necroptose'), F('vs-necrosis', 'Apoptosis frente a necrosis', '<b>Apoptosis × necrosis</b> en 3D: encogimiento y cuerpos apoptósicos × hinchazón y rotura.') + VS_NEC_APO)

after_sum('acumulacion', FACIL['acumulacion'] + G_ACUM)
before_lam(heading('acumulacion', '4 mecanismos'), F('visao-geral', 'Panorama de las acumulaciones', '<b>Panorama:</b> lípidos, colesterol, proteínas, glucógeno y pigmentos dentro de la célula.'))
after_org(heading('acumulacion', 'Esteatose: causa, mecanismo, aspecto'), F('esteatosis-organos', 'Esteatosis en los órganos', '<b>Esteatosis:</b> hígado, corazón, músculo y riñón; dentro del hepatocito se rompe el equilibrio del metabolismo de los triglicéridos.'))
before_lam(heading('acumulacion', 'Morfología', 0, ('h4',)), F('esteatosis-morfologia', 'Morfología de la esteatosis', '<b>Micro y macrovesicular:</b> en la macro, una gota grande empuja el núcleo a la periferia.'))
before_lam(heading('acumulacion', 'Patogenia', 0, ('h4',)), F('ateroma-espumosas', 'Células espumosas en el ateroma', '<b>Células espumosas:</b> macrófagos llenos de LDL oxidada en la íntima, con los factores de riesgo.') + FLUXO_ATEROMA)
before_lam(heading('acumulacion', 'Morfología', 1, ('h4',)), F('placas-estria', 'Estría grasa y placa', '<b>De la estría grasa a la placa:</b> capa fibrosa, núcleo de lípidos y cristales de colesterol.'))
before_lam(heading('acumulacion', 'Cambios agudos de la placa'), F('cambios-agudos', 'Cambios agudos de la placa', '<b>Cambios agudos:</b> rotura, hemorragia intraplaca, trombosis y calcificación.'))
before_lam(heading('acumulacion', 'Xantomas, colesterolosis'), F('xantomas-colesterolosis', 'Xantomas y colesterolosis', '<b>Xantomas</b> (piel, párpado: xantelasma) y <b>colesterolosis</b> (vesícula en fresa): cúmulos de macrófagos espumosos.'))
before_lam(heading('acumulacion', 'Glucógeno', 0, ('h3',)), F('niemann-glucogeno', 'Niemann-Pick tipo C y glucógeno', 'Arriba: <b>Niemann-Pick tipo C</b> (colesterol en macrófagos, bazo). Abajo: <b>glucógeno</b> en vacuolas claras.'))

after_sum('clase7', FACIL['clase7'] + G_C7)
after_org(heading('clase7', 'Organograma da amiloidose'), FLUXO_AMILOIDE)
after_org(heading('clase7', 'Organograma da calcificação patológica'), VS_CALC + FLUXO_DISTROF)

after_sum('inflamacion', FACIL['inflamacion'] + FLUXO_INFL)
before_lam(heading('inflamacion', 'Organograma da inflamação aguda'), G_LEUCO)
hs = heading('inflamacion', 'Signos cardinales', names=('h3',))
els, _ = secao(hs)
first_box = next(e for e in els if e.name == 'details')
first_box.insert_after(ph(SIG))
after_org(heading('inflamacion', 'Exsudato × transudato'), EXU)
after_org(heading('inflamacion', 'Trajeto do leucócito'), stepper())
after_org(heading('inflamacion', 'Organograma dos padrões morfológicos'), G_PATRON)

# 4a) simulados em versão estática para a impressão/PDF (alternativa certa em posição fixa por questão)
import json, re as _re
_qz = _re.search(r'window\.QUIZZES=(\{.*?\});?\s*</script>', s, _re.S)
QUIZ = json.loads(_qz.group(1))
LET = 'ABCDEF'
def quiz_print(key, label):
    bank = QUIZ.get(key, [])
    qs, gab = [], []
    for i, q in enumerate(bank):
        n = len(q['o'])
        if sorted(q['o']) == ['Falso', 'Verdadero']:
            ops = ['Verdadero', 'Falso']; pos = ops.index(q['o'][0])
        else:
            pos = (i * 3 + 1) % n
            outros = q['o'][1:]
            ops = outros[:pos] + [q['o'][0]] + outros[pos:]
        caso = f'<div class="qp-c">{q["c"]}</div>' if q.get('c') else ''
        qs.append(f'<li><div class="qp-q">{q["q"]}</div>{caso}<ol class="qp-o">' + ''.join(f'<li><b>{LET[k]}</b> {o}</li>' for k, o in enumerate(ops)) + '</ol></li>')
        gab.append(f'<li><b>{i + 1} · {LET[pos]}</b> {q.get("e", "")}</li>')
    return (f'<div class="qprint"><div class="qp-t">Preguntas · {label} <small>{len(bank)} preguntas · gabarito comentado al final</small></div>'
            f'<ol class="qp-l">{"".join(qs)}</ol><div class="qp-g"><b class="qp-gt">Gabarito comentado · {label}</b><ol>{"".join(gab)}</ol></div></div>')
for qz in soup.select('.quiz[data-quiz]'):
    qz.insert_after(ph(quiz_print(qz['data-quiz'], qz.get('data-label', qz['data-quiz']))))

# 4b) players das aulas gravadas no topo de cada tema
from midia import bloco
for tid in ('necrosis', 'apoptosis', 'acumulacion', 'clase7', 'inflamacion'):
    h = bloco(tid)
    if h:
        topic(tid).select_one('.section-head').insert_after(ph(h))

# 4c) método SINUS (modelo Neuroimagenología): ⚡ Decorar, subtemas numerados, explicações em cards/tabelas/fluxos,
#     casos resolvidos, "Lo esencial en 1 minuto", respostas-modelo e modo "Solo lo esencial" (.det some)
import metodo as M
for tid, itens in M.EXPL.items():
    eas = topic(tid).select('.easy')
    assert len(eas) == len(itens), (tid, len(eas), len(itens))
    for e, (tt, html) in zip(eas, itens):
        e.replace_with(ph(f'<div class="nx-why"><div class="ttl">💡 {tt}</div>{html}</div>'))
assert not soup.select('.easy')
for tid in M.CAP_N:
    sm = topic(tid).select_one('.sum60')
    sm['class'] = ['sum60', 'dec']
    t = sm.select_one('.t')
    nome = t.get_text().split('·', 1)[1].strip()
    t.string = f'⚡ Decorar · {nome}'
    head = topic(tid).select_one('.section-head')
    sub = soup.new_tag('p'); sub['class'] = 'nx-sub'; sub.string = M.SUB[tid]
    head.select_one('.section-kicker').insert_after(sub)
    sec = topic(tid).select_one('.section')
    qz = sec.select_one('.quiz')
    hc = soup.new_tag('h3'); hc['id'] = f'casos-{tid}'; hc['data-short'] = 'Casos resueltos'; hc.string = M.TITULO_CASOS
    qz.insert_before(hc)
    qz.insert_before(ph(''.join(M.CASOS[tid])))
    cap = int(M.CAP_N[tid])
    hs = [h for h in sec.find_all('h3') if h.find_parent(class_='quiz') is None]
    for i, h in enumerate(hs, 1):
        no = soup.new_tag('span'); no['class'] = 'no'; no.string = f'{cap}.{i}'
        h.insert(0, no); no.insert_after(' ')
for el in soup.select('details.slidebox, details.repbox, .facil, .laminas'):
    c = el.get('class') or []
    el['class'] = (c.split() if isinstance(c, str) else list(c)) + ['det']
for b in soup.select('.pitfall > b.t'):
    b.insert(0, '⚠ ')
for b in soup.select('.exam > b.t'):
    b.insert(0, '📌 ')
ini = topic('inicio')
hero_p = ini.select_one('.hero > p')
hero_p.clear()
hero_p.append(BeautifulSoup('Os slides das <strong>Clases 4 a 8</strong> em formato <strong>resumen para decorar</strong>: ⚡ quadro para decorar, tabelas, fluxos e organogramas em cada tema, com os termos da Dra. em espanhol e a explicação em português, mais casos resolvidos, pegadinhas e as perguntas das provas antigas.', 'html.parser'))
pl = soup.new_tag('span'); pl['class'] = 'pill'; pl.string = f'{sum(len(v) for v in M.CASOS.values())} casos resueltos'
ini.select_one('.hero-meta .pill').insert_after(pl)
ini.select_one('.stats').insert_after(ph(M.essencial_html()))
g4 = ini.select_one('.grid4')
g4.replace_with(ph(M.COMO))
pr = topic('prueba').select_one('.section > .complete-btn')
pr.insert_before(ph(M.RESPOSTAS))
tb = soup.select_one('header.topbar .search-wrap')
bt = soup.new_tag('button'); bt['class'] = 'btn nx-ess-btn'; bt['id'] = 'essBtn'; bt['type'] = 'button'; bt['aria-pressed'] = 'false'
bt['title'] = 'Mostra só o essencial: esconde slides literais, lâminas e explicações longas'
bt.string = '⚡ Solo lo esencial'
tb.insert_after(bt)

# 5) CSS, defs, JS, lightbox com imagem grande
st = soup.find_all('style')[-1]
st.append(CSS)
out = str(soup)
for k, v in PH.items():
    tag = f'<div data-ph="{k}"></div>'
    assert out.count(tag) == 1, k
    out = out.replace(tag, v)
b = out.index('<body')
b = out.index('>', b) + 1
out = out[:b] + DEFS + out[b:]
old = "lb.querySelector('img').src=im.src;"
assert out.count(old) == 1
out = out.replace(old, "lb.querySelector('img').src=im.dataset.full||im.src;")
out = out.replace('</body>', '<script>' + JS + '</script></body>')
open(OUT, 'w', encoding='utf-8').write(out)
print('ok', len(out), 'slide', n_sl, 'repaso', n_rep, 'laminas', n_lam, 'placeholders', len(PH))
