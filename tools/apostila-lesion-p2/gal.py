"""Conteúdo das galerias interativas (termos da Dra. Chamorro em espanhol, explicação em português)."""
from comp import *

def S(fn, label):
    return svg(fn(), label=label)

G_NUCLEO = galeria('Galería · cambios de la célula necrótica', [
    (S(c_normal, 'Célula normal'), 'Célula normal', 'núcleo redondo · citoplasma rosado',
     '<b>Célula normal</b><br>Núcleo com cromatina fina e nucléolo; citoplasma rosa claro. É a referência para comparar as mudanças da necrose.'),
    (S(c_eosin, 'Eosinofilia'), '↑ Eosinofilia', 'vítreo · vacuolado · mielina',
     '<b>Aumento de eosinofilia</b> (citoplasma)<br>Perde ARN (que é basófilo) e as proteínas se desnaturam: o citoplasma fica <b>mais rosado, vítreo e vacuolado</b> ("comido por traças"). <b>Figuras de mielina</b>: espirais de membrana das organelas rotas.'),
    (S(c_picnosis, 'Picnosis'), 'Picnosis', 'encogido · hipercromático',
     '<b>Picnosis</b><br>Núcleo <b>encogido e hipercromático</b> (retração e aumento da basofilia). É o 1º dos 3 padrões nucleares.'),
    (S(c_cariorrexis, 'Cariorrexis'), 'Cariorrexis', 'núcleo fragmentado',
     '<b>Cariorrexis</b><br>O núcleo picnótico se <b>fragmenta</b> em vários pedaços.'),
    (S(c_cariolisis, 'Cariólisis'), 'Cariólisis', 'la basofilia se desvanece',
     '<b>Cariólisis</b><br>A <b>basofilia nuclear se desvanece</b> pela ação das <b>ADNasas</b>: o núcleo vira um "fantasma" e some.<br><i>Pegadinha:</i> os 3 padrões são da necrose; na apoptose o achado principal é a <b>condensação da cromatina</b>.'),
])

G_APOP = galeria('Galería · la apoptosis paso a paso', [
    (S(a_normal, 'Célula normal'), '1 · Normal', 'antes del estímulo', '<b>Célula normal</b><br>Ponto de partida, antes do sinal de morte.'),
    (S(a_retraccion, 'Retracción'), '2 · Retracción celular', 'menor · citoplasma denso',
     '<b>Retracción celular</b><br>Célula <b>menor</b>, citoplasma <b>denso</b> e organelas relativamente normais, mais compactadas. Ao contrário da necrose, ela <b>encolhe</b>.'),
    (S(a_cromatina, 'Condensación de la cromatina'), '3 · Condensación de la cromatina', 'principal característica',
     '<b>Condensación de la cromatina</b> = <b>PRINCIPAL CARACTERÍSTICA DE LA APOPTOSIS</b><br>Massas densas de formas e tamanhos distintos; o núcleo se divide em ≥2 fragmentos.'),
    (S(a_blebs, 'Vesículas citoplásmicas'), '4 · Vesículas citoplásmicas', 'evaginaciones de membrana',
     '<b>Formación de vesículas citoplásmicas</b><br>A membrana forma bolhas (evaginações), mas <b>continua íntegra</b>: por isso nada vaza e não há inflamação.'),
    (S(a_cuerpos, 'Cuerpos apoptósicos'), '5 · Cuerpos apoptósicos', 'con membrana · ± núcleo',
     '<b>Cuerpos apoptósicos</b><br>Rodeados por membrana, com citoplasma e organelas, <b>com ou sem fragmentos nucleares</b>. No H&E: massa redonda de citoplasma <b>intensamente eosinófilo</b> com cromatina densa.'),
    (S(a_fagocitosis, 'Fagocitosis'), '6 · Fagocitosis', 'macrófagos · sin inflamación',
     '<b>Fagocitosis</b> de células apoptósicas ou cuerpos celulares pelos <b>macrófagos</b>.<br><b>NO PRODUCE INFLAMACIÓN.</b>'),
])

G_ACUM = galeria('Galería · reconoce cada acumulación', [
    (S(ac_normal, 'Hepatocito normal'), 'Hepatocito normal', 'referencia', '<b>Hepatócito normal</b><br>Poligonal, núcleo central, citoplasma rosa granular.'),
    (S(ac_micro, 'Esteatosis microvesicular'), 'Esteatosis microvesicular', 'gotas pequeñas · núcleo central',
     '<b>Esteatosis (cambio graso) microvesicular</b><br>Muitas gotículas de <b>triglicéridos</b>; o núcleo continua no centro. No H&E a gordura sai no processamento e fica um vacúolo claro; para corar a gordura: <b>Sudán / aceite rojo O</b> (tecido congelado).'),
    (S(ac_macro, 'Esteatosis macrovesicular'), 'Esteatosis macrovesicular', 'una gota · núcleo desplazado',
     '<b>Esteatosis macrovesicular</b><br>As gotículas se fundem num grande vacúolo que <b>empurra o núcleo para a periferia</b>. Causa mais comum: <b>álcool</b>; também obesidade, diabetes, desnutrição proteica, toxinas.'),
    (S(ac_espumosa, 'Célula espumosa'), 'Célula espumosa', 'macrófago con colesterol',
     '<b>Célula espumosa</b><br>Macrófago (ou célula muscular lisa) cheio de vacúolos de <b>colesterol e ésteres</b> que dão aspecto de espuma. É a célula da <b>estría grasa</b> e do <b>ateroma</b>.'),
    (S(ac_xantoma, 'Xantoma'), 'Xantoma · colesterolosis', 'cúmulos de espumosas',
     '<b>Xantomas</b>: cúmulos de macrófagos espumosos no tecido subepitelial da pele e tendões (hipercolesterolemia). <b>Colesterolosis</b>: macrófagos espumosos na lâmina própria da vesícula ("vesícula en fresa"). <b>Niemann-Pick tipo C</b>: defeito do transporte de colesterol, acúmulo em muitos órgãos.'),
    (S(ac_glucogeno, 'Glucógeno'), 'Glucógeno', 'vacuolas claras · PAS +',
     '<b>Glucógeno</b><br>Vacúolos claros no citoplasma; cora de <b>rosa-violáceo</b> com <b>PAS</b> ou carmín de <b>Best</b>. <b>Diabetes mellitus</b> (túbulos renais, hepatócitos, ilhotas) e <b>glucogenosis</b> (enzimopatias). Baixa prioridade: estava só no slide antigo.'),
])

G_C7 = galeria('Galería · lo que se acumula en la Clase 7', [
    (S(c7_gotitas, 'Gotículas de reabsorción'), 'Gotículas hialinas', 'túbulo proximal · reversible',
     '<b>Reabsorción de gotículas en túbulos renales proximales</b><br>Na <b>proteinúria</b> o túbulo proximal reabsorve mais proteína por <b>pinocitosis</b>: gotículas rosadas no citoplasma. <b>PROCESO REVERSIBLE</b>: a proteinúria diminui e elas desaparecem.'),
    (S(c7_russell, 'Cuerpos de Russell'), 'Cuerpos de Russell', 'célula plasmática · Ig',
     '<b>Cuerpos de Russell</b><br>A <b>célula plasmática</b> produz <b>inmunoglobulinas</b> em excesso, o RE se distende e formam-se grandes inclusões <b>eosinófilas homogéneas</b>.'),
    (S(c7_a1at, 'Alfa-1-antitripsina'), 'α1-antitripsina', 'hepatocito · PAS + · enfisema',
     '<b>Transporte intracelular defectuoso</b>: deficiência de <b>α1-antitripsina</b><br>A proteína mutada dobra devagar e fica presa no RE do <b>hepatócito</b> (glóbulos eosinófilos, <b>PAS +</b>). Sem a enzima circulando, o pulmão faz <b>ENFISEMA</b>; o estresse do RE leva à apoptose.'),
    (S(c7_mallory, 'Hialina de Mallory'), 'Hialina de Mallory', 'queratina · alcohol',
     '<b>Hialina alcohólica (de Mallory)</b><br>Agregados de filamentos intermediários de <b>queratina</b> no hepatócito, junto à esteatose, na <b>hepatopatia alcohólica</b>. Mesmo grupo (citoesqueleto): <b>ovillos neurofibrilares</b> (Alzheimer, prata) e <b>cuerpos de Lewy</b> (α-sinucleína, IHQ ubiquitina).'),
    (S(c7_amiloide, 'Amiloide'), 'Amiloide', 'extracelular · verde manzana',
     '<b>Amiloide</b>: proteínas mal dobradas que formam fibrilas insolúveis, <b>SIEMPRE extracelular</b>, começando entre as células.<br>H&E: rosa pálido, homogêneo, amorfo · <b>Rojo Congo</b>: vermelho-alaranjado · <b>luz polarizada</b>: birrefringência <b>verde manzana</b> (patognomônico). Não induz inflamação.'),
    (S(c7_distrofica, 'Calcificación distrófica'), 'Calcificación distrófica', 'tejido muerto · Ca²⁺ normal',
     '<b>Calcificación DISTRÓFICA</b><br>Depósito local em tecido <b>lesionado ou morto</b>, com <b>cálcio sérico normal</b>. Geralmente <b>irreversível</b>. Necrose (todas), ateromas, válvulas lesadas ou de idosos, Mönckeberg. H&E: <b>basófilo, granular, amorfo</b>.'),
    (S(c7_metastasica, 'Calcificación metastásica'), 'Calcificación metastásica', 'tejido sano · hipercalcemia',
     '<b>Calcificación METASTÁSICA</b><br>Depósito em tecido <b>normal</b> por <b>HIPERCALCEMIA</b>: ↑ PTH, reabsorção óssea (mieloma, metástases, imobilização), vitamina D, insuficiência renal crônica. <b>Reversível</b> se a causa for corrigida.'),
    (S(c7_psamoma, 'Cuerpo de psamoma'), 'Cuerpo de psamoma', 'capas como grano de arena',
     '<b>Cuerpos de psamoma</b> (distrófica)<br>Camadas concêntricas que lembram grãos de areia; típicos de <b>cânceres papilares</b> (tireoide, ovário seroso).'),
])

G_LEUCO = galeria('Galería · las células de la inflamación', [
    (S(i_neutro, 'Neutrófilo'), 'Neutrófilo (PMN)', 'núcleo 3–5 lóbulos', '<b>Neutrófilo polimorfonuclear</b><br>A célula da <b>inflamação AGUDA</b>: chega primeiro (6–24 h), fagocita e destrói. Núcleo segmentado em 3–5 lóbulos.'),
    (S(i_eosino, 'Eosinófilo'), 'Eosinófilo', 'gránulos naranjas', '<b>Eosinófilo</b><br>Núcleo bilobulado ("óculos") e grânulos vermelho-alaranjados. Alergias e parasitas.'),
    (S(i_baso, 'Basófilo'), 'Basófilo', 'gránulos oscuros', '<b>Basófilo</b><br>Grânulos azul-escuros que tapam o núcleo; libera <b>histamina</b>, como o mastócito.'),
    (S(i_masto, 'Mastocito'), 'Mastocito', 'tejido · histamina', '<b>Mastócito</b> (no tecido)<br>Célula sentinela: ao desgranular libera <b>histamina</b>, o primeiro mediador: <b>vasodilatação</b> e <b>↑ permeabilidade</b>.'),
    (S(i_mono, 'Monocito'), 'Monocito', 'núcleo en frijol', '<b>Monócito</b> (no sangue)<br>Ao entrar no tecido vira <b>macrófago</b>; predomina em 24–48 h.'),
    (S(i_macro, 'Macrófago'), 'Macrófago', 'fagocito · reparación', '<b>Macrófago</b><br>O outro grande <b>fagocito</b>: ingere micro-organismos, tecido necrótico e substâncias estranhas, e produz fatores de crescimento para a <b>reparação</b>.'),
    (S(i_linfo, 'Linfocito'), 'Linfocito', 'núcleo grande', '<b>Linfócito</b><br>Núcleo redondo que ocupa quase tudo. Junto com plasmócitos e macrófagos marca a <b>inflamação CRÓNICA</b>.'),
    (S(i_plasma, 'Célula plasmática'), 'Célula plasmática', 'rueda de carreta', '<b>Plasmócito</b><br>Núcleo excêntrico em "roda de carroça", halo perinuclear (Golgi). Produz anticorpos. Inflamação <b>crônica</b>.'),
])

G_PATRON = galeria('Galería · patrones morfológicos', [
    (S(p_serosa, 'Serosa'), 'Serosa', 'ampolla · pocas células',
     '<b>Inflamación serosa</b><br>Líquido com <b>poucas células</b>, sem micro-organismos destrutivos, em espaços criados pela lesão ou em cavidades (pleura, pericárdio, peritônio). Ex.: <b>ampollas cutáneas</b> por queimadura ou infecção viral.'),
    (S(p_fibrinosa, 'Fibrinosa'), 'Fibrinosa', 'pan con mantequilla',
     '<b>Inflamación fibrinosa</b><br>A permeabilidade é <b>maior</b>: sai <b>fibrinógeno</b> que vira <b>fibrina</b>. Revestimento de cavidades (meninges, pericárdio, pleura). Ex.: <b>pericarditis en "pan con mantequilla"</b>. Se não é removida: organização → cicatriz.'),
    (S(p_purulenta, 'Purulenta'), 'Purulenta · absceso', 'pus · neutrófilos',
     '<b>Purulenta (supurativa)</b>: pus = neutrófilos + restos de necrose licuefactiva + edema. Bactérias <b>piógenas</b> (Staphylococcus). Ex.: apendicitis aguda.<br><b>Absceso</b>: coleção localizada de pus; na Rx de tórax, <b>nivel hidroaéreo</b>.'),
    (S(p_ulcera, 'Úlcera'), 'Úlcera', 'defecto de superficie',
     '<b>Úlcera</b><br>Defeito local (escavação) da superfície por necrose e descamação do tecido inflamado. Mucosa digestiva, geniturinária, pele. Ex.: úlcera péptica, pé diabético. Coexistem aguda e crônica.'),
], dica='Toca cada patrón para ver la clave y el ejemplo que ella usa.', tap='toca cada patrón')
