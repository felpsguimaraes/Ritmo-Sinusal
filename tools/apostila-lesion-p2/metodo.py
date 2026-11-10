"""Metodologia SINUS (modelo: apostila de Neuroimagenología · TC de cráneo).
Cada capítulo: eyebrow + linha-resumo → ⚡ Decorar (quadro escuro) → subtemas numerados (n.1, n.2…) → conteúdo em
formato "resumen para decorar": cards, tabelas, fluxos e organogramas, com a explicação curta (💡) marcada como detalhe
(.det) para o modo "Só o essencial" → ⚠ Trampas → 🩺 casos resolvidos → simulado.
EXPL substitui, na ordem, as caixas .easy de cada tema. Termos da professora em espanhol; explicação em português."""

# ------------------------------------------------------------------ componentes
def card(h, corpo, b=None):
    st = f' style="--b:{b}"' if b else ''
    return f'<div class="nx-card{" c" if b else ""}"{st}><h4>{h}</h4>{corpo}</div>'

def grade(n, *cards):
    return f'<div class="nx-g{n}">' + ''.join(cards) + '</div>'

def tabela(cab, linhas):
    th = ''.join(f'<th>{c}</th>' for c in cab)
    tb = ''.join('<tr>' + ''.join(f'<td data-l="{cab[i]}">{v}</td>' for i, v in enumerate(l)) + '</tr>' for l in linhas)
    return f'<div class="nx-tw"><table class="nx-tbl"><thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>'

def fluxo(*passos):
    """até 4 passos lado a lado; (titulo, texto[, exemplo])"""
    out = []
    for i, p in enumerate(passos, 1):
        h, t = p[0], p[1]
        ex = f'<span class="ex">{p[2]}</span>' if len(p) > 2 else ''
        out.append(f'<div class="st"><span class="h"><span class="num">{i}</span>{h}</span>{t}{ex}</div>')
    return '<div class="nx-flow">' + ''.join(out) + '</div>'

def passos(*ps):
    """sequência longa, vertical numerada; (titulo, texto)"""
    return '<ol class="nx-steps">' + ''.join(f'<li><b>{h}</b> {t}</li>' for h, t in ps) + '</ol>'

def chips(*cs):
    return '<div class="nx-chips">' + ''.join(f'<span class="nx-chip">{c}</span>' for c in cs) + '</div>'

R, A, V, P, B, T, G = '#c8463d', '#d27a1f', '#0f8a6a', '#7a4fc0', '#0b6246', '#0c8059', '#5d7a6c'

# ------------------------------------------------------------------ cabeçalho de cada capítulo
SUB = {
 'necrosis': 'Do "punto de retorno" à morte acidental: os 3 fenômenos, a morfologia, os 6 patrones e o infarto rojo × blanco.',
 'apoptosis': 'A morte programada: quando acontece, como se vê, as vías intrínseca e extrínseca e a necroptosis.',
 'acumulacion': 'Por que a célula acumula: os 4 mecanismos, esteatosis, colesterol, aterosclerosis e glucógeno.',
 'clase7': 'Proteínas, amiloide e calcio: onde está o depósito e por que chegou ali.',
 'inflamacion': 'A resposta vascular e celular: sinais cardinais, vasos, exsudado, reclutamiento, padrões e mediadores.',
}

# ------------------------------------------------------------------ explicações (substituem as caixas .easy, na ordem)
EXPL = {
'necrosis': [
('Os 3 caminhos da célula diante de uma agressão',
 fluxo(('Adaptación', 'hipertrofia, hiperplasia, atrofia, metaplasia: muda e segue funcionando.', 'P1'),
       ('Lesión reversible', '<b>tumefacción celular</b> (falha da bomba Na⁺/K⁺) e <b>cambio graso</b>; tirado o estímulo, volta ao normal.'),
       ('Muerte', 'passou o <b>"punto de retorno"</b>: <b>necrosis</b> ou <b>apoptosis</b>.'))
 + grade(2, card('Necrosis · accidental', '<ul><li>membranas rompem, enzimas vazam e digerem a célula</li><li>conteúdo sai → <b>inflamación</b></li><li><b>siempre patológica</b></li></ul>', R),
            card('Apoptosis · organizada', '<ul><li>programa genético, célula desmontada em pedaços com membrana</li><li>comida <b>sin inflamación</b></li><li>fisiológica (embrião, menstruação, timo) ou patológica</li></ul>', P))
 + '<p><b>Por que a lâmina engana no IAM?</b> A bioquímica vem antes da morfologia: perde a contração em ~1 min, fica irreversível em <b>20–40 min</b>, mas a necrose só aparece ao MO após <b>4–12 h</b>. Pode-se morrer de IAM com o coração "normal" na lâmina.</p>'),
('Por que esses 3 fenômenos marcam o ponto sem volta?',
 tabela(['Fenómeno', 'O que acontece', 'Consequência'], [
   ['1 · Mitocondria', 'Sem O₂ → ↓ <b>ATP</b> → glicólise anaeróbica → ácido láctico, ↓ pH. Abre-se o <b>poro de transição de permeabilidade</b> e se perde o potencial de membrana.', 'O ATP não volta: bomba Na⁺/K⁺ parada, ↓ síntese de proteínas → morte.'],
   ['2 · Membranas', '<b>Fosfolipasas</b> (ativadas pelo Ca²⁺), <b>radicais livres</b> (peroxidação lipídica) e <b>proteasas</b> (citoesqueleto).', '<b>Plasmática</b>: sai conteúdo, entra Ca²⁺ · <b>mitocondrial</b>: sai citocromo c · <b>lisosomal</b>: hidrolases digerem a célula. Vazam <b>troponina</b> e <b>transaminases</b>.'],
   ['3 · ADN', 'Núcleo sem integridade.', 'Sem reparo. Na lâmina: <b>picnosis, cariorrexis, cariólisis</b>.']])
 + '<p><b>O cálcio é o gatilho comum.</b> O Ca²⁺ do citosol é ~10.000× menor que o de fora; na lesão ele entra e sai da mitocôndria e do RE, ligando <b>fosfolipasas, proteasas, endonucleasas y ATPasas</b>. Daí "2 enzimas cuya actividad aumenta por incremento del calcio".</p>'),
('Por que a necrose inflama e a apoptose não?',
 fluxo(('Membrana rompe', 'saem <b>ATP, ácido úrico, ADN</b>, proteínas nucleares.'),
       ('Sinais de perigo', 'a imunidade inata lê os <b>DAMPs</b> por <b>TLR</b> e <b>inflamassoma</b>.'),
       ('Limpeza', 'chegam <b>neutrófilos e macrófagos</b>: todo infarto tem <b>borda inflamatória</b>.'))
 + '<p>Na apoptose o conteúdo não sai: <b>sin inflamación</b>. Ponte com a Clase 9: tecido necrótico é causa de inflamação aguda.</p>'),
('Coagular ou derreter? Quem vence decide o padrão',
 grade(2, card('Vence a desnaturação → coagulativa', '<ul><li>proteínas coagulam como <b>clara de ovo cozida</b></li><li>tecido firme, contorno mantido</li><li>isquemia em órgão sólido (a acidose desnatura até as enzimas)</li></ul>', B),
          card('Vence a digestão → licuefactiva', '<ul><li>hidrolases quebram tudo em líquido</li><li>muitos neutrófilos (infecção bacteriana)</li><li>tecido pobre em proteína estrutural: <b>cérebro</b></li></ul>', A))
 + '<p><b>Autólisis</b> = enzimas da própria célula. <b>Heterólisis</b> = enzimas dos leucócitos que chegaram (predomina na licuefactiva bacteriana).</p>'),
('Como ler a necrose na lâmina',
 grade(3, card('MO · citoplasma', '<p>A <b>hematoxilina</b> cora ácidos (ARN, ADN); a <b>eosina</b>, proteínas. Sem ARN e com proteína desnaturada: <b>↑ eosinofilia</b>, aspecto vítreo, às vezes vacuolizado ("roído por traças").</p>', R),
          card('Figuras de mielina', '<p>Restos de membrana em camadas concêntricas. Viram ácidos graxos; com cálcio, <b>sabões de cálcio</b> → início da <b>calcificación distrófica</b>.</p>', A),
          card('ME · sinal definitivo', '<p><b>Discontinuidad de la membrana plasmática</b> + <b>grandes densidades amorfas floculentas</b> nas mitocôndrias (na reversível, só pequenas).</p>', P))),
('Achar o padrão de necrose em 3 perguntas',
 tabela(['Pergunta', 'Resposta → padrão'], [
   ['1 · Qual órgão?', 'Cérebro/SNC → <b>licuefactiva</b> (mesmo na isquemia) · páncreas/peritônio → <b>grasa</b> · parede de vaso → <b>fibrinoide</b>'],
   ['2 · Qual causa?', 'Isquemia em órgão sólido → <b>coagulativa</b> · bactéria piogênica → <b>licuefactiva</b> · TB → <b>caseosa</b> · imunocomplexos → <b>fibrinoide</b>'],
   ['3 · É extremidade?', '<b>Gangrena</b>: seca (sem infecção) × húmeda (com infecção)']])
 + '<p><b>"No corresponden a un patrón específico":</b> gangrenosa e grasa são nomes clínicos. Gangrena seca = coagulativa; húmeda = licuefactiva; grasa = digestão da gordura + saponificação.</p>'),
('Necrosis coagulativa: as 4 perguntas que caem',
 grade(2, card('Por que a arquitetura fica?', '<p>A acidose desnatura também as <b>enzimas proteolíticas</b>: sem digestão interna, o contorno dura dias. Túbulos e fibras sem núcleo, mais rosados: <b>células fantasma</b>.</p>', B),
          card('Por que em cunha?', '<p>A artéria ocluída irriga um leque: <b>vértice</b> na oclusão, <b>base</b> na cápsula (rim, baço, pulmão).</p>', B),
          card('O que vem depois (IAM)?', '<p><b>Neutrófilos 1–3 d → macrófagos 3–7 d → granulação 1–2 sem → cicatriz ~1–2 meses</b>. O miocárdio não regenera.</p>', R),
          card('Por que o cérebro é exceção?', '<p>Muito lipídio, quase sem colágeno/estroma, micróglia rica em enzimas: sem "esqueleto" para coagular, o tecido se liquefaz.</p>', A))),
('Necrosis licuefactiva: de onde vem o pus?',
 fluxo(('Bactérias', 'atraem <b>muitos neutrófilos</b> com <b>proteasas, elastasa, mieloperoxidasa</b>.'),
       ('Heterólise', 'os neutrófilos morrem no foco e digerem o tecido e a si mesmos.'),
       ('Pus', 'neutrófilos + tecido liquefeito + bactérias + edema; amarelo-cremoso.', 'numa cavidade = absceso'))
 + '<p><b>No cérebro isquêmico</b>, os macrófagos removem o tecido em semanas e fica uma <b>cavidad quística</b> com gliose: "área quística en el lóbulo parietal" → "presencia de espacios quísticos".</p>'),
('Gangrena: seca ou húmeda?',
 '<p>Termo clínico para membro (sobretudo inferior) sem irrigação. Paciente típico: <b>diabético</b> (doença arterial periférica + microangiopatia, neuropatia, defesa reduzida).</p>'
 + tabela(['', 'Seca', 'Húmeda'], [
   ['Causa', 'só isquemia (congelação, oclusão lenta)', 'isquemia + <b>infecção bacteriana</b>'],
   ['Aspecto', '<b>preta, dura, mumificada</b>', 'úmida, inchada, <b>exsudado amarelado</b>, mau cheiro'],
   ['Limite', '<b>nítido</b>', '<b>mal definido</b>, espalha → sepse'],
   ['Por baixo', '<b>coagulativa</b>', '<b>licuefactiva</b>'],
   ['Pista de prova', '—', '"exudado amarillento" + <i>S. aureus</i>; também órgãos internos (intestino)']])),
('Necrosis caseosa: como o granuloma se forma',
 passos(('Bacilo resistente.', 'O <i>M. tuberculosis</i> tem parede rica em <b>ácidos micólicos</b> e sobrevive no macrófago.'),
        ('Imunidade celular.', '<b>Linfócitos T CD4</b> liberam <b>interferón γ</b> e ativam os macrófagos.'),
        ('Células epitelioides.', 'Macrófagos ativados, citoplasma amplo e rosado, agrupados como epitélio; alguns se fundem em <b>células gigantes tipo Langhans</b> (núcleos em ferradura).'),
        ('Granuloma.', 'Tudo cercado por linfócitos; no centro, as células morrem.'))
 + grade(2, card('Como diferenciar', '<p>Macro: branco-amarelada, friável, como <b>queijo</b>. MO: rosa granular <b>sem contorno celular</b> (na coagulativa ainda se vê o fantasma).</p>', G),
            card('Evolução', '<p>O caseum se liquefaz e drena por um brônquio: <b>caverna</b> no ápice pulmonar (TB do adulto).</p>', G))),
('Necrosis grasa passo a passo',
 fluxo(('Pancreatitis aguda', 'álcool, cálculo biliar: enzimas ativadas dentro do pâncreas.'),
       ('Lipasa', 'quebra triglicerídeos em <b>ácidos graxos</b>.'),
       ('Saponificación', 'ácidos graxos + <b>Ca²⁺</b> = sabões: manchas <b>branco-giz</b>.'),
       ('MO', 'adipócitos pálidos (<b>células en sombra</b>), cálcio <b>basófilo</b>, inflamação.'))
 + '<p><b>Na clínica:</b> o cálcio gasto pode dar <b>hipocalcemia</b>. Também há necrose gordurosa <b>traumática</b> na mama.</p>'),
('Necrosis fibrinoide: o material rosa do vaso',
 fluxo(('Imunocomplexos', 'hipersensibilidade <b>tipo III</b> na parede do vaso; complemento e neutrófilos.'),
       ('Parede permeável', 'o <b>fibrinógeno</b> sai e vira <b>fibrina</b> na parede.'),
       ('Fibrinoide', 'material <b>rosa-brilhante, amorfo</b>; só ao microscópio.'))
 + chips('LES', 'poliarteritis nodosa', 'vasculitis por inmunocomplejos', 'nódulo reumatoide (paliçada)', 'hipertensión maligna (pressão, não imune)')),
('Para onde vai o tecido necrótico?',
 grade(4, card('Regeneração', '<p>Tecido lábil/estável com estroma preservado.</p>', V), card('Cicatriz', '<p>Tecido permanente (miocárdio) ou destruição extensa.</p>', G),
          card('Cavidade', '<p>Cisto cerebral, absceso encapsulado, caverna.</p>', A), card('Calcificação', '<p>Se não é removido a tempo.</p>', P))
 + '<p><b>Calcificación distrófica:</b> sabões de cálcio e membranas mortas concentram fosfato e atraem cálcio. No H&amp;E, <b>basófila (roxa)</b>. Ex.: ateroma, válvula aórtica do idoso, TB antiga, <b>cuerpos de psamoma</b> (carcinoma papilar de tireoide, meningioma).</p>'),
('Por que o infarto é vermelho ou branco?',
 '<p>Depende de <b>quanto sangue entra no território morto</b>.</p>'
 + grade(2, card('Blanco (anémico)', '<ul><li>órgão sólido, <b>circulação terminal</b></li><li>sem colaterais; parênquima denso não deixa o sangue espalhar</li><li><b>corazón, bazo, riñón</b></li></ul>', G),
            card('Rojo (hemorrágico)', '<ul><li><b>doble circulación</b>: pulmão, intestino</li><li><b>oclusión venosa</b>: torção de ovário/testículo</li><li><b>tejido laxo</b>: pulmão</li><li><b>reperfusión</b> de vasos lesados</li></ul>', R))),
],
'apoptosis': [
('Por que a célula se suicida?',
 '<p>O corpo elimina <b>bilhões de células por dia</b>; a apoptose faz isso limpo e em minutos (por isso quase não se vê, nem no timo fetal). Do grego "cair", como folhas.</p>'
 + grade(3, card('Ativa', '<p>Gasta <b>ATP</b>; sem ATP vira necrose.</p>', P), card('Individual', '<p>Células isoladas entre vivas; a necrose pega um território.</p>', P),
          card('Sinal "coma-me"', '<p><b>Fosfatidilserina</b> vai para a face externa: "su estructura se altera, atrayendo a los fagocitos".</p>', P))
 + grade(2, card('Pouca apoptose', '<p>Sobrevivem células que deviam morrer: <b>câncer, autoimunidade</b>.</p>', R),
            card('Apoptose demais', '<p>Morrem células que deviam viver: <b>neurodegeneração, isquemia, infecções virais</b>.</p>', B))),
('Cada situação do slide, explicada',
 tabela(['Situación', 'Mecanismo / exemplo'], [
   ['<b>Fisiológica</b> · embrião', 'esculpe órgãos: os dedos se separam (membranas interdigitais)'],
   ['Fisiológica · retirada de hormônio', '↓ progesterona (endométrio), ↓ estrogênio (atresia folicular), fim da prolactina após o desmame (mama), castração (próstata)'],
   ['Fisiológica · renovação', 'medula óssea, epitélio intestinal, timo: equilibra a proliferação'],
   ['Fisiológica · timo', 'elimina linfócitos T autorreativos; se falha → autoimunidade'],
   ['Fisiológica · fim da inflamação', 'neutrófilos morrem por apoptose'],
   ['<b>Patológica</b> · ADN lesado', 'radiação, quimio, hipóxia leve: <b>p53</b> para o ciclo; sem reparo → via mitocondrial ("cuando la afectación es demasiado grave…")'],
   ['Patológica · proteína mal dobrada', 'estresse do RE: neurônios em <b>Alzheimer y Parkinson</b>'],
   ['Patológica · vírus', 'hepatite, HIV, adenovírus: <b>linfócitos T citotóxicos</b> matam a célula'],
   ['Patológica · tumor', 'a quimioterapia induz apoptose'],
   ['Patológica · ducto obstruído', 'pâncreas, parótida, rim: atrofia por apoptose']])),
('Como reconhecer a apoptose na lâmina',
 '<ul><li>Célula <b>isolada</b>, <b>menor</b>, citoplasma <b>muito eosinófilo</b>, núcleo em <b>pedaços densos</b>, às vezes com <b>halo claro</b>.</li><li><b>Sem neutrófilos</b> em volta. No fígado: <b>cuerpos de Councilman</b>.</li></ul>'
 + grade(2, card('Apoptosis · ADN em "escalera"', '<p>Endonucleasas cortam <b>entre nucleossomos</b> (~180–200 pb).</p>', P),
            card('Necrosis · ADN em "borrón"', '<p>Degradação ao acaso.</p>', R))),
('A vía mitocondrial (intrínseca) passo a passo',
 '<p><b>Caspasas</b> = proteases com <b>cisteína</b> que cortam após <b>aspártico</b>; inativas até a cascata. <b>Iniciadoras 8 y 9 · ejecutoras 3 y 6</b> (cortam citoesqueleto e proteínas nucleares, ativam endonucleasas).</p>'
 + fluxo(('Célula sã', '<b>BCL2, BCLX, MCL1</b> mantêm a mitocôndria fechada.'),
         ('Estresse', 'sensores <b>BH3 (BAD, BIM, BID)</b> bloqueiam BCL2 e ativam <b>BAX y BAK</b>.'),
         ('Canais', 'BAX/BAK furam a membrana externa: sai o <b>citocromo c</b>.'),
         ('Apoptosoma', 'citocromo c + <b>APAF-1</b> → <b>caspasa 9</b> → executoras.'))
 + '<p><b>Na clínica:</b> <b>linfoma folicular</b>, <b>t(14;18)</b> → BCL2 demais, linfócitos não morrem. "Proteína diminuída numa célula quase morrendo" = <b>BCL2</b>.</p>'),
('A vía extrínseca: a ordem vem de fora',
 fluxo(('Receptor', 'família do <b>TNF</b>: <b>Fas (CD95)</b>, receptor de TNF tipo 1, com <b>"dominio de muerte"</b>.'),
       ('Ligando', '<b>FasL</b> (linfócito T ativado) agrupa 3 receptores e recruta <b>FADD</b>.'),
       ('Caspasa 8', '(e 10) ativa direto as executoras.'))
 + chips('elimina linfócitos autorreativos', 'mata células infectadas e tumorais', 'perforina + granzimas', 'encerra a resposta imune')
 + '<p><b>As vias conversam:</b> a caspasa 8 corta a <b>BID</b> e liga também a via mitocondrial.</p>'),
('Necroptosis: o plano B da célula',
 fluxo(('Normal', 'TNF → <b>caspasa 8</b> → apoptose.'),
       ('Caspasa 8 bloqueada', 'vírus com inibidor (<b>citomegalovírus</b>): entram <b>RIPK1 y RIPK3</b>.'),
       ('MLKL', 'fosforilada, fura a membrana: a célula <b>incha e rompe</b>.'))
 + grade(2, card('Necroptosis', '<p><b>Morfologia de necrose + mecanismo de apoptose + sem caspasas</b>. Defesa contra vírus.</p>', P),
            card('Piroptosis', '<p>Morte programada com <b>IL-1</b>, <b>caspasa 1</b> e <b>inflamassoma</b> (opção de prova antiga).</p>', G))),
],
'acumulacion': [
('A lógica dos 4 mecanismos',
 '<p>Toda substância está numa balança <b>entrada/produção × uso/saída/degradação</b>. Acumula quando pende para a entrada.</p>'
 + grade(2, card('1 · Normal, entra mais do que sai', '<p>Triglicerídeos: <b>hígado graso</b>.</p>', A),
            card('2 · Endógena anómala', '<p>Fabricada errado: <b>α1-antitripsina</b> presa no RE (cirrose + enfisema).</p>', A),
            card('3 · Falta a enzima', '<p>Lisossomal, hereditária: <b>tesaurismosis</b> (Niemann-Pick, glucogenosis).</p>', A),
            card('4 · Exógena', '<p>Não digerida nem exportada: carvão (<b>antracosis</b>).</p>', A))
 + '<p>A acumulação é <b>pista morfológica</b> de doença metabólica; as progressivas lesam e matam a célula.</p>'),
('Por que a esteatose aparece no fígado?',
 '<ul><li><b>Central do metabolismo lipídico</b>: recebe ácidos graxos, fabrica triglicerídeos, exporta <b>VLDL</b>. Coração e rim também (anemia grave, hipóxia), mas importa menos.</li><li>Álcool e <b>doença hepática gordurosa não alcoólica</b> (obesidade, resistência à insulina, DM2, dislipidemia).</li></ul>'
 + fluxo(('Esteatosis', '<b>lesão reversível mais comum</b>'), ('Esteatohepatitis', 'inflamação + morte de hepatócitos'), ('Fibrosis', ''), ('Cirrosis', 'se a causa persiste'))),
('Álcool, obesidade e desnutrição nos 6 passos',
 tabela(['Causa', 'Mecanismo', 'Passos'], [
   ['<b>Álcool</b>', 'excesso de <b>NADH</b>: ↑ ácidos graxos e α-glicerofosfato, ↓ oxidação; lesa microtúbulos e a secreção de lipoproteínas. Poucos dias bastam.', '2, 3, 4, 6'],
   ['<b>Obesidade / DM2</b>', 'resistência à insulina → ↑ lipólise → mais ácidos graxos ao fígado; hiperinsulinemia ↑ síntese', '1, 2'],
   ['<b>Kwashiorkor, CCl₄</b>', 'falta apoproteína ou RE lesado: triglicerídeo não é empacotado', '5, 6'],
   ['<b>Anoxia</b>', 'sem O₂ a mitocôndria não oxida ácidos graxos', '3']])),
('Micro × macrovesicular, macroscopia e colorações',
 grade(2, card('Microvesicular', '<p>Gotículas ao redor do núcleo. Pura = <b>disfunção mitocondrial</b> grave (esteatose aguda da gravidez, Reye, fármacos).</p>', A),
          card('Macrovesicular', '<p>Uma gota grande empurra o núcleo para a periferia: hepatócito parece adipócito.</p>', A),
          card('Macroscopia ("rasgos macroscópicos")', '<p><b>3–6 kg</b>, <b>amarelo, mole, gorduroso</b>, cápsula tensa, <b>bordas arredondadas</b>.</p>', G),
          card('Por que congelação?', '<p>Álcool e xilol da parafina <b>dissolvem lipídios</b>. Corte congelado + <b>Sudán</b> (III/IV vermelho; negro B) ou <b>aceite rojo O</b>.</p>', B))),
('Aterosclerose em linguagem simples',
 '<ul><li>Doença da <b>íntima</b> de artérias <b>grandes e médias</b> (aorta, coronárias, carótidas, ilíacas, cerebrais); por trás do <b>IAM</b> e do <b>AVC isquêmico</b>.</li><li><b>Hendiduras de colesterol</b>: cristais dissolvidos no processamento deixam fendas vazias <b>em agulha</b>.</li></ul>'
 + grade(2, card('Núcleo', '<p>Mole, amarelo: colesterol, células mortas, restos.</p>', A),
            card('Capa fibrosa', '<p>Músculo liso + colágeno. <b>Grossa = estável · fina = vulnerável</b>.</p>', B))),
('Por que cada fator aumenta o risco?',
 tabela(['Factor', 'Por quê'], [
   ['<b>LDL alto</b>', 'o mais importante, causa sozinho; a LDL leva colesterol à íntima. HDL faz o inverso (protege).'],
   ['Hipertensión', 'força mecânica lesa o endotélio e ↑ entrada de lipoproteínas'],
   ['Tabaquismo', 'radicais livres, lesão endotelial, oxidação da LDL'],
   ['Diabetes / síndrome metabólica', 'glicação da parede, ↑ LDL, ↓ HDL; risco de infarto dobra'],
   ['PCR', 'inflamação crônica de baixo grau; prediz eventos'],
   ['No modificables', 'idade, sexo masculino (estrogênio protege até a menopausa), história familiar, <b>hipercolesterolemia familiar</b> (receptor de LDL)']])),
('Hipótese da resposta à lesão, passo a passo',
 passos(('Lesión endotelial:', 'HTA, tabaco, hiperlipidemia, fluxo turbulento; endotélio permeável e com moléculas de adesão.'),
        ('LDL na íntima e oxidada:', 'tóxica e pró-inflamatória.'),
        ('Monócitos → macrófagos:', 'engolem LDL oxidada por receptores "scavenger" sem freio → <b>células espumosas</b> → <b>estría grasa</b> (já em crianças).'),
        ('Linfócitos T:', 'mantêm a inflamação crônica. Células da placa = <b>macrófagos y linfocitos T</b>.'),
        ('Músculo liso migra:', '<b>PDGF, FGF, TGF-β</b> o trazem da média para a íntima; produz colágeno (capa fibrosa) e também vira espumosa.'),
        ('Núcleo necrótico:', 'espumosas morrem e soltam lipídio; neovasos, calcificação, placa cresce para a luz.'))),
('Placa estável × vulnerável',
 tabela(['', 'Estable', 'Vulnerable'], [
   ['Capa', 'grossa', '<b>fina</b>, muitos macrófagos com <b>metaloproteinasas</b>'],
   ['Tamanho', 'grande, estreita a luz devagar', 'pode ser pequena'],
   ['Clínica', '<b>angina estable</b>, claudicação intermitente', 'rotura → trombo em minutos: <b>IAM, angina inestable, AVC</b>']])
 + '<p>Por isso <b>a maioria dos infartos vem de placas que não eram críticas</b>.</p>'),
('Cada complicação da placa e sua consequência',
 tabela(['Complicación', 'Consecuencia'], [
   ['Rotura / ulceración + trombosis', 'oclusão aguda: IAM (coagulativa), AVC (licuefactiva), gangrena'],
   ['Hemorragia en la placa', 'a placa cresce de repente e pode romper a capa'],
   ['Ateroembolia', 'cristais de colesterol ocluem pequenas artérias (rim, pele, retina)'],
   ['Aneurisma', 'atrofia da média, perda de tecido elástico; <b>aorta abdominal</b>; rotura fatal'],
   ['Calcificación distrófica', 'artéria rígida ("tubo de louça")']])),
('Xantomas, colesterolosis y Niemann-Pick',
 '<p>As três têm <b>macrófagos espumosos com colesterol</b>; mudam lugar e causa.</p>'
 + grade(3, card('Xantomas', '<p>Colesterol sobra no <b>sangue</b>; nódulos amarelos na derme e tendões. <b>Xantelasma</b> = pálpebras.</p>', A),
          card('Colesterolosis', '<p>Colesterol da <b>bile</b> nos macrófagos da lâmina própria da vesícula: <b>"vesícula em morango"</b>.</p>', A),
          card('Niemann-Pick C', '<p>Colesterol <b>não sai do lisossomo</b> (<b>NPC1/NPC2</b>): SNC (ataxia, demência), baço, fígado.</p>', A))),
('Glucógeno: como ver, onde acumula, quais doenças',
 '<ul><li><b>Solúvel em água</b>: some no processamento, <b>vacúolos claros</b>. Cora com <b>PAS</b> ou <b>carmín de Best</b>; PAS negativo após <b>diastasa</b> confirma.</li><li><b>Diabetes</b>: túbulos renais (<b>Armanni-Ebstein</b>), hepatócitos (núcleos "vazios"), células β, miocárdio.</li></ul>'
 + tabela(['Glucogenosis', 'Enzima', 'Achado'], [
   ['I · von Gierke', 'glicose-6-fosfatase', 'fígado grande + hipoglicemia'],
   ['II · Pompe', 'maltase ácida lisossomal', 'cardiomegalia'],
   ['IV · Andersen (slide)', 'enzima ramificadora', 'glicogênio pouco ramificado, cirrose na infância'],
   ['V · McArdle', 'fosforilase muscular', 'cãibras no exercício']])),
],
'clase7': [
('A pergunta que resolve a Clase 7: onde está e por que chegou ali?',
 '<p>A Clase 6 foi a gordura. A Clase 7 é o resto que entope a fábrica: <b>proteína</b> e <b>cálcio</b>.</p>'
 + tabela(['O que se vê', 'O que é'], [
   ['Gotícula rosa <b>dentro</b> da célula', 'proteína intracelular'],
   ['Rosa pálido <b>entre</b> as células, verde-maçã na polarização', '<b>amiloide</b>'],
   ['Grânulo azul-violeta em tecido <b>morto</b>', '<b>calcificación distrófica</b>'],
   ['Grânulo azul-violeta em tecido <b>sadio</b> + cálcio alto', '<b>calcificación metastásica</b>']])),
('Por que o túbulo renal enche de gotas hialinas?',
 fluxo(('Proteinúria', 'glomérulo lesado deixa passar proteína.'), ('Pinocitosis', 'o túbulo proximal tenta recuperá-la.'),
       ('Gotículas hialinas', 'chega mais do que digere: gotas rosadas.', 'reversível'))),
('O que são os cuerpos de Russell?',
 fluxo(('Plasmócito', 'fábrica de anticorpos.'), ('Ig em excesso', 'o <b>RE incha</b> de proteína.'), ('Cuerpos de Russell', 'bolas rosas homogêneas.', 'Russell = plasmócito = Ig'))),
('α1-antitripsina: um defeito no fígado que destrói o pulmão',
 '<p>Fabricada no <b>fígado</b> para proteger o <b>pulmão</b> da elastase. Mutada, dobra devagar e fica <b>presa no RE do hepatócito</b> (mecanismo 2: "sustancia endógena anómala").</p>'
 + grade(2, card('Fígado', '<p>Glóbulos <b>PAS +</b>; estresse do RE → <b>apoptosis</b> → cirrose.</p>', A),
            card('Pulmão', '<p>Sem antiprotease, a elastase destrói os septos: <b>enfisema</b>.</p>', B))),
('Amiloide: um formato, não uma proteína',
 '<ul><li>Proteína em <b>folha β-plegada</b> empilha em <b>fibrilas insolúveis</b>, <b>entre as células</b>; comprime, <b>sem inflamação</b>.</li><li><b>Rim</b> = mais frequente e mais grave: <b>síndrome nefrótica</b> → insuficiência renal.</li></ul>'
 + tabela(['Tipo', 'Proteína de origem', 'Contexto'], [
   ['<b>AL</b>', 'cadeia leve de Ig', 'plasmócito clonal: <b>mieloma</b>'],
   ['<b>AA</b>', '<b>SAA</b> (fase aguda, fígado)', '<b>inflamação crônica</b> longa: AR, doença inflamatória intestinal'],
   ['β-amiloide', 'Aβ', 'Alzheimer'],
   ['β2-microglobulina', 'β2M', 'hemodiálise (não a filtra)']])),
('Distrófica × metastásica: tecido ou sangue?',
 grade(2, card('Distrófica · problema no tecido', '<p>Proteína morta expõe fosfato e "puxa" o cálcio <b>normal</b>. Ateroma, válvula velha, granuloma de TB, tumor.</p>', G),
          card('Metastásica · problema no sangue', '<p>Cálcio <b>alto</b> precipita em tecido <b>sadio</b> e <b>alcalino</b>: <b>mucosa gástrica, rim, pulmão</b>.</p>', B))
 + '<p><b>Cuidado:</b> "metastásica" não tem a ver com câncer; é o cálcio que "viaja".</p>'),
],
'inflamacion': [
('Para que serve a inflamação?',
 grade(2, card('Protetora', '<p>Leva ao foco as armas que estão dentro dos vasos: <b>leucócitos, anticorpos, complemento</b>.</p>', V),
          card('Mas "cega"', '<p>As mesmas enzimas e radicais lesam tecido normal: <b>AR, aterosclerose, asma, anafilaxia</b>.</p>', R))
 + '<p><b>Os 5 R do Robbins:</b> reconhecimento (TLR) → <b>recrutamento</b> → <b>remoção</b> → regulação → resolução/reparação (os slides cobrem os do meio). Sufixo <b>"-itis"</b> = inflamação do órgão.</p>'),
('Aguda × crônica',
 tabela(['', 'Aguda', 'Crónica'], [
   ['Imunidade', '<b>inata</b>: rápida, igual para todos', '<b>adaptativa</b>'],
   ['Quando', 'horas a dias, agente eliminado', 'agente <b>persiste</b> (TB, corpo estranho, autoimunidade)'],
   ['Células', '<b>neutrófilos</b> + edema', '<b>linfócitos, plasmócitos, macrófagos</b>'],
   ['Tecido', 'exsudado', 'destruição + reparo: <b>angiogênese, fibrose</b>']])),
('As alterações vasculares como um filme',
 fluxo(('Segundos', 'vasoconstrição reflexa, breve, sem importância clínica.'),
       ('Minutos', '<b>histamina</b> dilata arteríolas: <b>calor</b> e <b>rubor</b>.'),
       ('Ao mesmo tempo', 'endotélio das <b>vénulas poscapilares</b> contrai: <b>exudado</b> → <b>tumor</b>.', 'transitoria inmediata · 15–30 min'),
       ('Horas', 'sangue concentrado, fluxo lento: <b>estasis</b> → <b>marginación</b>.'))
 + '<p><b>Por que vênulas?</b> Lá estão os receptores e as junções mais frouxas. <b>Lesão endotelial direta</b> (queimadura, toxinas): vazamento imediato e prolongado, também em capilares e arteríolas. Na reparação, o <b>VEGF</b> forma vasos que vazam (transcitose).</p>'),
('Forças de Starling: transudado ou exudado?',
 '<p><b>Pressão hidrostática</b> empurra para fora; <b>oncótica</b> (albumina) segura dentro. Normalmente quase se anulam (slide: 32, 25, 12 mmHg).</p>'
 + tabela(['', 'Transudado', 'Exudado'], [
   ['Vaso', 'íntegro, balança alterada', '<b>furado</b> pela inflamação'],
   ['Causa', '↑ hidrostática (IC, trombose venosa) ou ↓ oncótica (<b>hipoalbuminemia</b>: cirrose, nefrótica, desnutrição)', 'inflamação'],
   ['Conteúdo', 'água e sal', 'água, <b>fibrinógeno</b>, células'],
   ['Aspecto', '<b>claro</b>', '<b>turvo</b>; com neutrófilos e restos = <b>pus</b>'],
   ['Densidade', '<b>&lt; 1,012</b>', '<b>&gt; 1,020</b>']])),
('E os linfáticos?',
 fluxo(('↑ Fluxo de linfa', 'drena o edema e leva antígeno ao linfonodo.'), ('Linfangitis', 'estrias vermelhas dolorosas.'),
       ('Linfadenitis', 'linfonodos grandes e dolorosos ("ínguas").'), ('Bacteriemia', 'passou dos linfonodos: sepse.'))),
('O reclutamiento como uma sequência de moléculas',
 tabela(['Etapa', 'Molécula', 'O que acontece'], [
   ['1 · Marginación', '— (física)', 'com a estase, leucócitos são empurrados para a parede'],
   ['2 · Rodamiento', '<b>selectinas</b>: P (minutos), E (1–2 h) ↔ <b>sialil-Lewis X</b>', 'liga e solta: "se colocan sobre el endotelio de forma transitoria"'],
   ['3 · Adhesión firme', '<b>β2-integrinas</b> (LFA-1, Mac-1) ↔ <b>ICAM-1</b>', 'quimiocinas ativam as integrinas; o leucócito para'],
   ['4 · Transmigración', '<b>PECAM-1 (CD31)</b>', 'passa entre células endoteliais nas <b>vénulas poscapilares</b>; colagenases na membrana basal'],
   ['5 · Quimiotaxis', '<b>IL-8, C5a, LTB4</b>; bacterianas: N-formil-metionina', 'segue o gradiente com pseudópodes']])
 + grade(2, card('LAD tipo 1', '<p>Falta <b>β2-integrina</b>: rolam mas <b>não param</b>. Neutrofilia no sangue, sem pus.</p>', R),
            card('LAD tipo 2', '<p>Falta <b>sialil-Lewis X</b>: <b>nem rolam</b>.</p>', R))),
('Fagocitose e morte intracelular em 3 tempos',
 fluxo(('Reconocimiento', 'receptores diretos (manose, scavenger, TLR) e <b>opsoninas</b>: <b>C3b</b>, <b>IgG</b>.'),
       ('Englobamiento', 'pseudópodes → <b>fagosoma</b> + lisossomo = <b>fagolisosoma</b>.'),
       ('Muerte', '<b>NADPH oxidasa</b> → H₂O₂; <b>mieloperoxidasa</b> → <b>HOCl</b> (água sanitária). + NO, elastasa, lisozima, defensinas, NETs.', 'estallido respiratorio'))
 + grade(2, card('Por que o neutrófilo chega primeiro?', '<p><b>Mais numeroso</b>, <b>mais rápido</b> às quimiocinas, <b>adesão mais firme</b>. Vive pouco: em 24–48 h morre por apoptose → <b>monócito/macrófago</b>. "<b>6–24 h × 24–48 h</b>".</p>', T),
            card('Dano colateral', '<p>Enzimas e radicais soltos para fora (fagocitose frustrada, imunocomplexos) destroem tecido: absceso, doenças por imunocomplexos.</p>', R))),
('Os 4 padrões morfológicos',
 '<p>Decidem: <b>quanto o vaso está lesado</b> e <b>quem causou</b>.</p>'
 + grade(2, card('Serosa', '<p>Lesão leve, líquido tipo soro, pobre em células. <b>Bolha de queimadura de 2º grau</b>, derrame inicial. Reabsorve.</p>', T),
          card('Fibrinosa', '<p>Sai <b>fibrinógeno</b>. Serosas (pericárdio, pleura, meninges): <b>"pan con mantequilla"</b>, atrito pericárdico. Resolve ou se <b>organiza</b> (aderências).</p>', A),
          card('Purulenta', '<p>Bactérias piogênicas + neutrófilos + licuefactiva = pus. Difusa (apendicite, empiema) ou <b>absceso</b> (parede fibrosa: drenar).</p>', R),
          card('Úlcera', '<p><b>Perda de tecido na superfície</b> por necrose. <b>Úlcera péptica</b>: aguda (neutrófilos, fibrina) + crônica (granulação, fibrose).</p>', P))),
('Qual desfecho esperar?',
 '<p>Pergunta-chave: <b>o tecido regenera e o estroma foi preservado?</b></p>'
 + grade(4, card('Resolución', '<p>Agressão curta, tecido que regenera (pneumonia lobar tratada).</p>', V), card('Cicatriz', '<p>Muita necrose, tecido permanente, fibrina demais.</p>', G),
          card('Cronificación', '<p>Agente persiste (TB, corpo estranho).</p>', P), card('Absceso', '<p>Aguda que não resolveu e está sendo isolada.</p>', R))),
('Os mediadores, família por família',
 tabela(['Familia', 'Origem', 'Efeitos que caem'], [
   ['<b>Histamina y serotonina</b>', 'grânulos prontos: <b>mastócitos</b>, basófilos, plaquetas', 'segundos; H1: vasodilatação + permeabilidade; urticária, anafilaxia'],
   ['<b>Prostaglandinas</b> (COX-1/2)', 'ácido araquidônico (fosfolipasa A2)', 'PGE2/PGD2: vasodilatação, permeabilidade, <b>dor, febre</b>; PGI2 antiagregante; TXA2 pró-agregante; AINEs bloqueiam'],
   ['<b>Leucotrienos</b> (lipooxigenasa)', 'ácido araquidônico', '<b>LTB4</b> quimiotaxia; LTC4/D4/E4 broncoespasmo e permeabilidade (asma); AINEs não bloqueiam'],
   ['<b>Citocinas</b>', 'macrófagos', '<b>TNF, IL-1</b>: adesão, febre, leucocitose, fase aguda; <b>IL-6</b>; <b>IL-8</b> quimiotaxia'],
   ['<b>Complemento</b>', 'fígado (3 vias → C3)', '<b>C3a, C5a</b> anafilatoxinas (C5a quimiotático) · <b>C3b</b> opsonina · <b>C5b-9</b> ataque à membrana'],
   ['<b>Cininas</b>', 'plasma: fator XII (Hageman) → calicreína', '<b>bradicinina</b>: permeabilidade, vasodilatação, <b>dor</b>; degradada pela ECA'],
   ['<b>Óxido nítrico</b>', 'endotélio, macrófagos', 'vasodilatador, microbicida; em excesso, choque']])),
('Como decorar a tabela do slide 52',
 tabela(['Sinal / efeito', 'Mecanismo', 'Mediadores'], [
   ['<b>Rubor + calor</b>', 'vasodilatação', 'histamina, PG ("H e P"), C3a/C5a, bradicinina'],
   ['<b>Tumor</b>', 'permeabilidade', 'histamina, serotonina, PGD2/E2, bradicinina, LTC4/D4/E4'],
   ['<b>Dor</b>', 'sensibilização nervosa', 'PG e bradicinina'],
   ['<b>Febre</b>', 'PG no hipotálamo', 'IL-1, TNF, IL-6'],
   ['<b>Leucocitose / quimiotaxia</b>', 'recrutamento', 'TNF, IL-1, IL-8, C5a, LTB4'],
   ['<b>Lesão tecidual</b>', 'o que o neutrófilo solta', 'enzimas lisossomais, radicais livres']])),
],
}

# ------------------------------------------------------------------ casos resolvidos (raciocínio passo a passo)
def caso(n, titulo, enunciado, ps):
    det = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in ps)
    return f'<div class="nx-case"><div class="t">🩺 Caso {n} · {titulo}</div><p>{enunciado}</p>{det}</div>'

CASOS = {
'necrosis': [
 caso(1, 'infarto do miocárdio', 'Homem de 62 anos, hipertenso e fumante, morre 3 dias depois de uma dor torácica intensa. Na autópsia há uma área amarelada e amolecida na parede anterior do ventrículo esquerdo.',
  [('1) Que necrose é essa?', 'Isquemia em órgão sólido → <b>coagulativa</b>; circulação terminal → infarto <b>blanco</b>.'),
   ('2) O que se vê ao MO no 3º dia?', 'Fibras <b>eosinófilas sem núcleo</b>, arquitetura mantida (<b>células fantasma</b>) e <b>neutrófilos</b> na borda.'),
   ('3) E se tivesse morrido 1 hora depois?', 'Coração <b>normal na lâmina</b>: a necrose só aparece ao MO após <b>4–12 h</b>, embora já irreversível.'),
   ('4) Que exame confirma em vida?', '<b>Troponina</b>: a membrana rota deixa vazar proteínas intracelulares.'),
   ('5) Como termina?', 'Macrófagos → granulação → <b>cicatriz</b>; o miocárdio não regenera.')]),
 caso(2, 'o mesmo infarto, no cérebro', 'Mulher de 70 anos teve um AVC isquêmico há 4 meses. A TC mostra uma área quística no lóbulo parietal.',
  [('1) Por que não é coagulativa?', 'Muito lipídio, pouca proteína estrutural, micróglia rica em enzimas → <b>licuefactiva</b>.'),
   ('2) O que é a área quística?', 'Tecido removido pelos macrófagos: <b>cavidad quística</b> com gliose ("presencia de espacios quísticos").'),
   ('3) Que outra causa dá o mesmo padrão?', '<b>Bactéria piogênica</b> → pus → <b>absceso</b>.')]),
 caso(3, 'pancreatite', 'Homem de 45 anos, etilista, com dor epigástrica em faixa, lipase muito alta e cálcio sérico baixo.',
  [('1) Que necrose há ao redor do pâncreas?', '<b>Grasa</b>: a lipase libera ácidos graxos.'),
   ('2) Como aparece à macroscopia?', 'Manchas <b>branco-giz</b>: <b>saponificación</b>.'),
   ('3) Por que o cálcio caiu?', 'Foi consumido nos <b>sabões de cálcio</b>.')]),
],
'apoptosis': [
 caso(1, 'hepatite viral', 'Biópsia hepática na hepatite viral aguda: hepatócitos isolados, pequenos, muito eosinófilos, núcleo fragmentado, sem neutrófilos ao redor.',
  [('1) Que morte é essa?', '<b>Apoptosis</b>: <b>cuerpos de Councilman</b>.'),
   ('2) Quem mata e por qual via?', '<b>Linfócitos T citotóxicos</b>: <b>FasL → Fas</b> (FADD → caspasa 8) e <b>perforina + granzimas</b>.'),
   ('3) Por que não há neutrófilos?', 'Membrana <b>íntegra</b>, sem DAMPs; a <b>fosfatidilserina</b> chama os macrófagos.'),
   ('4) Como fica o ADN na eletroforese?', '<b>Escalera</b> (cortes entre nucleossomos).')]),
 caso(2, 'a célula que não morre', 'Homem de 55 anos com linfonodos indolores; biópsia: linfoma folicular com t(14;18).',
  [('1) Que proteína está aumentada?', '<b>BCL2</b>.'),
   ('2) Por que o tumor cresce?', 'Mitocôndria fechada: sem citocromo c, sem apoptosoma, sem caspasa 9. Os linfócitos <b>não morrem</b>.'),
   ('3) Quem fica sem efeito?', '<b>BAX y BAK</b> (e os sensores BH3).')]),
 caso(3, 'apoptose bloqueada', 'Uma célula infectada por citomegalovírus, que inibe a caspasa 8, recebe sinal de TNF.',
  [('1) Morre por apoptose?', 'Pela via do TNF, não: <b>caspasa 8</b> bloqueada.'),
   ('2) Que via assume?', '<b>Necroptosis</b>: RIPK1/RIPK3 → <b>MLKL</b>.'),
   ('3) Morfologia e inflamação?', 'Aspecto de <b>necrose</b>, com <b>inflamação</b>; sem caspasas.')]),
],
'acumulacion': [
 caso(1, 'fígado do etilista', 'Homem de 50 anos, etilista há 20 anos, com hepatomegalia. Biópsia: hepatócitos com um grande vacúolo claro que empurra o núcleo.',
  [('1) Que acumulação?', '<b>Esteatosis macrovesicular</b>.'),
   ('2) Por que o álcool causa?', 'Excesso de <b>NADH</b>: ↑ síntese, ↓ oxidação, ↓ secreção de lipoproteínas.'),
   ('3) Como provar que é gordura?', 'Corte <b>congelado</b> + <b>Sudán</b> ou <b>aceite rojo O</b>.'),
   ('4) Macroscopia?', 'Grande, <b>amarelo, mole, gorduroso</b>, bordas <b>arredondadas</b>.'),
   ('5) Reverte?', 'Sim, se parar de beber; se não: esteatohepatite → fibrose → <b>cirrose</b>.')]),
 caso(2, 'a placa que não parecia perigosa', 'Homem de 58 anos, fumante, hipertenso, LDL 190 mg/dL, com dor torácica súbita em repouso. Trombo sobre uma placa que obstruía só 40% da luz.',
  [('1) Que placa era?', '<b>Vulnerável</b>: capa <b>fina</b>, macrófagos, <b>metaloproteinasas</b>.'),
   ('2) Por que o trombo em minutos?', '<b>Rotura</b> da capa expôs o núcleo <b>trombogênico</b>.'),
   ('3) Células inflamatórias da placa?', '<b>Macrófagos</b> (espumosas) e <b>linfócitos T</b>.'),
   ('4) Fator de risco mais importante?', '<b>LDL alto</b>.'),
   ('5) Necrose no miocárdio?', '<b>Coagulativa</b>.')]),
],
'clase7': [
 caso(1, 'amiloidose renal', 'Mulher de 60 anos com artrite reumatoide há 25 anos, edema generalizado e proteinúria maciça. Biópsia renal: material rosa pálido amorfo nos glomérulos.',
  [('1) Que depósito e onde?', '<b>Amiloide</b>, <b>extracelular</b>.'),
   ('2) Que tipo?', '<b>AA</b>, da <b>SAA</b> elevada pela inflamação crônica.'),
   ('3) Como confirmar?', '<b>Rojo Congo</b> + polarização = <b>verde manzana</b>.'),
   ('4) Há inflamação ao redor?', '<b>Não</b>.')]),
 caso(2, 'o cálcio que viaja', 'Mulher de 52 anos com hiperparatireoidismo, cálcio 13 mg/dL. Biópsia gástrica: depósitos basófilos em mucosa normal.',
  [('1) Que calcificação?', '<b>Metastásica</b>.'),
   ('2) Por que estômago, rim, pulmão?', 'Meio <b>alcalino</b> (perdem ácido).'),
   ('3) E a válvula calcificada do idoso com cálcio normal?', '<b>Distrófica</b>.')]),
 caso(3, 'fígado e pulmão', 'Homem de 35 anos, nunca fumou, com enfisema e cirrose.',
  [('1) Que proteína?', '<b>α1-antitripsina</b> mutante.'),
   ('2) Por que o fígado?', 'Presa no <b>RE</b>: glóbulos <b>PAS +</b>, apoptose.'),
   ('3) Por que o pulmão?', 'Sem antiprotease, a <b>elastase</b> destrói os septos.')]),
],
'inflamacion': [
 caso(1, 'apendicite', 'Menino de 9 anos com dor na fossa ilíaca direita há 18 h, febre e neutrofilia. Apêndice edemaciado e avermelhado, com exsudato na serosa.',
  [('1) Tipo e padrão?', '<b>Aguda</b>, <b>purulenta</b>.'),
   ('2) Por que vermelho e quente?', '<b>Vasodilatação</b> (histamina, PG).'),
   ('3) Por que edemaciado?', '↑ <b>permeabilidad</b> das vénulas poscapilares: <b>exudado</b>.'),
   ('4) Que célula e por quê?', '<b>Neutrófilo</b>: mais numeroso, mais rápido, adesão mais firme.'),
   ('5) Febre e leucocitose?', '<b>IL-1, TNF, IL-6</b> (PGE2 no hipotálamo).')]),
 caso(2, 'neutrófilos que não chegam', 'Lactente com infecções bacterianas de repetição, queda tardia do coto umbilical, neutrofilia, sem pus nas lesões.',
  [('1) Que etapa falha?', '<b>Adhesión firme</b>: LAD tipo 1, sem <b>β2-integrinas</b>.'),
   ('2) Por que muitos no sangue e poucos no tecido?', 'Rolam mas <b>não param</b>.'),
   ('3) E se faltasse sialil-Lewis X?', 'LAD tipo 2: <b>nem rolam</b>.')]),
 caso(3, 'dois derrames', 'A, com insuficiência cardíaca: derrame claro, densidade 1,010. B, com pneumonia: derrame turvo, densidade 1,025, muitos neutrófilos.',
  [('1) Classifique.', 'A = <b>transudado</b>; B = <b>exudado purulento</b>.'),
   ('2) O que mudou em A?', '↑ <b>pressão hidrostática</b>.'),
   ('3) Que proteína só sai em B?', '<b>Fibrinógeno</b>.')]),
],
}

# ------------------------------------------------------------------ capítulo 00 · Lo esencial en 1 minuto
ESSENCIAL = [
 ('#0c8059', 'necrosis', 'Lesión irreversible = <b>3 fenómenos</b>: no recupera la función mitocondrial · pérdida de membranas (<b>el más importante</b>) · pérdida de la integridad del ADN. El <b>Ca²⁺</b> activa fosfolipasas, proteasas, endonucleasas y ATPasas.'),
 ('#0c8059', 'necrosis', '<b>Necrosis</b>: accidental, siempre patológica, célula aumenta, membrana rota, <b>inflamación</b>. <b>Apoptosis</b>: programada, célula se encoge, membrana íntegra, <b>sin inflamación</b>.'),
 ('#0c8059', 'necrosis', 'Núcleo: <b>picnosis</b> (retracción, ↑ basofilia) → <b>cariorrexis</b> (fragmentación) → <b>cariólisis</b> (pérdida de basofilia). Citoplasma: <b>↑ eosinofilia</b> por pérdida de ARN.'),
 ('#0c8059', 'necrosis', '6 patrones: <b>coagulativa</b> (isquemia, cuña; no en cerebro) · <b>licuefactiva</b> (SNC, absceso) · <b>gangrenosa</b> (seca × húmeda) · <b>caseosa</b> (TB) · <b>grasa</b> (páncreas) · <b>fibrinoide</b> (inmunocomplejos).'),
 ('#0c8059', 'necrosis', 'Infarto <b>blanco</b> = circulación terminal (corazón, bazo, riñón). <b>Rojo</b> = doble circulación, oclusión venosa, tejido laxo, reperfusión (pulmón, intestino).'),
 ('#0c8059', 'apoptosis', '<b>Intrínseca</b>: BCL2 ↓ → BAX/BAK → <b>citocromo c</b> → apoptosoma → caspasa 9. <b>Extrínseca</b>: Fas–FasL → FADD → caspasa 8. Ejecutoras <b>3 y 6</b>. Necroptosis: RIPK1/RIPK3/MLKL, sin caspasas.'),
 ('#0c8059', 'acumulacion', 'Acumulación: <b>4 mecanismos</b>. Esteatosis = hígado; demostrar en corte congelado con <b>Sudán</b> o <b>aceite rojo O</b>. Glucógeno: <b>PAS</b> / carmín de Best.'),
 ('#0c8059', 'acumulacion', 'Ateroma = núcleo lipídico + capa fibrosa. Células: <b>macrófagos (espumosas) + linfocitos T</b>. <b>LDL ↑</b> = factor principal. Capa fina → rotura → trombo.'),
 ('#0c8059', 'clase7', '<b>Amiloide</b>: extracelular, β-plegada, Rojo Congo <b>verde manzana</b>, riñón. Calcificación <b>distrófica</b> (tejido muerto, Ca normal) × <b>metastásica</b> (tejido sano, hipercalcemia).'),
 ('#0c8059', 'inflamacion', 'Vasodilatación (rubor, calor) → ↑ permeabilidad en <b>vénulas poscapilares</b> (tumor) → marginación → rodamiento (<b>selectinas</b>) → adhesión (<b>integrinas–ICAM-1</b>) → diapédesis (<b>PECAM-1</b>) → quimiotaxis (IL-8, C5a, LTB4).'),
]
CAP_N = {'necrosis': '01', 'apoptosis': '02', 'acumulacion': '03', 'clase7': '04', 'inflamacion': '05'}

def essencial_html():
    cards = ''.join(f'<div class="nx-card" style="--b:{c}"><span class="ic">{i}</span>{t} <button class="nx-ref" data-goto="{tid}">Cap. {CAP_N[tid]}</button></div>'
                    for i, (c, tid, t) in enumerate(ESSENCIAL, 1))
    return ('<div class="section nx-cap0"><div class="section-head"><div class="section-number">00</div><div><h2>Lo esencial en 1 minuto</h2>'
            '<div class="section-kicker">Se só houver tempo para uma página, é esta. Cada ponto se desenvolve no capítulo indicado.</div></div></div>'
            f'<div class="nx-ess">{cards}</div></div>')

COMO = ('<div class="nx-how">'
        '<div><b>1 · ⚡ Decorar</b>Leia o quadro escuro do início de cada capítulo.</div>'
        '<div><b>2 · Mapas</b>Organogramas, tabelas e fluxos: como tudo se divide.</div>'
        '<div><b>3 · Casos</b>Raciocínio passo a passo e as trampas da prova.</div>'
        '<div><b>4 · Simulado</b>Banco de preguntas no fim de cada tema, com gabarito.</div></div>')

# ------------------------------------------------------------------ respostas-modelo, erros e checklist (capítulo da prova)
RESPOSTAS = (
 '<h3 id="respuestas-modelo">Respuestas cortas y errores frecuentes</h3>'
 '<p class="nx-sub">Como responder cada formato da prova da Dra. Chamorro, os erros que mais tiram ponto e o que conferir antes de entregar.</p>'
 + tabela(['Formato', 'Como responder', 'Exemplo'], [
   ['<b>Cita</b> (2 cada)', 'Só o nome técnico, em espanhol, um por linha. Se pede "con el daño", junte a consequência.', '"Fosfolipasas → daño de membrana · endonucleasas → daño nuclear"'],
   ['<b>Completa</b>', 'Uma palavra ou termo exato do slide, sem explicação.', '"Picnosis… <b>retracción</b> nuclear y aumento de basofilia"'],
   ['<b>Marca</b>', 'Procure a palavra que ela troca (MO × ME, pérdida × por medio de, siempre × nunca).', '"↑ eosinofilia por <b>pérdida</b> de ARN"'],
   ['<b>V/F</b>', 'Uma palavra muda o sentido; se ela pede justificar, corrija a frase em 1 linha.', '"Apoptosis siempre patológica" → <b>F</b>: puede ser fisiológica']])
 + '<h4>10 errores que se deben evitar</h4>'
 + tabela(['Error', 'Lo correcto'], [
   ['Chamar o infarto cerebral de coagulativo', 'Cérebro = <b>licuefactiva</b>, mesmo sendo isquemia'],
   ['"↑ eosinofilia por medio de ARN"', 'É por <b>pérdida</b> de ARN'],
   ['Confundir picnosis e cariólisis', 'Picnosis = <b>retracción</b>, ↑ basofilia · cariólisis = <b>pérdida</b> de basofilia'],
   ['Dizer que a apoptose inflama', 'Membrana íntegra: <b>sin inflamación</b>'],
   ['BCL2 como pró-apoptótica', 'BCL2 é <b>antiapoptótica</b>; pró: <b>BAX, BAK</b>'],
   ['Gangrena húmeda = coagulativa', 'Húmeda = infecção = <b>licuefactiva</b>'],
   ['Esteatose corada em parafina', 'Corte <b>congelado</b> + Sudán / aceite rojo O'],
   ['Calcificação metastásica = câncer', 'É <b>hipercalcemia</b> em tecido sano'],
   ['Selectinas = adesão firme', 'Selectinas = <b>rodamiento</b>; integrinas = <b>adhesión firme</b>'],
   ['Exsudado em arteríolas', 'Permeabilidade nas <b>vénulas poscapilares</b>']])
 + '<div class="callout green"><b class="t">Chequeo final antes de entregar</b><ul>'
   '<li>Respondi com o <b>termo dela</b> em espanhol?</li><li>Nas "cita", dei <b>exatamente</b> quantos itens pediu?</li>'
   '<li>Conferi as palavras-armadilha: <b>siempre, nunca, pérdida, aumento</b>, MO × ME?</li><li>No V/F com justificativa, corrigi a frase?</li></ul></div>')

TITULO_CASOS = 'Casos resueltos · raciocínio passo a passo'
