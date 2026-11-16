"""Capítulo 06 · Neoplasias (Clase 11, Unidad IV) e acréscimos à Inflamación aguda (slides do pptx da Clase 9).
Escrito no formato do base.html (texto v4); o build.py injeta antes do Repaso e aplica o método SINUS por cima.
Termos e definições da Dra. Chamorro em espanhol (literais do slide); explicação em português.
Imagens: aulas/lesion/p2/apostila/img/neo-NN.jpg (slide NN da Clase 11, 1600 px) e inf-NN.* (Clase 9)."""


def fig(n, alt, cap):
    return f'<figure class="photo"><img alt="{alt}" loading="lazy" src="img/{n}"/><figcaption>{cap}</figcaption></figure>'


def grid(*figs):
    return '<div class="figgrid">\n' + '\n'.join(figs) + '\n</div>'


def slide(titulo, corpo):
    return f'<div class="callout slide"><b class="t">Slide · {titulo}</b>\n{corpo}</div>'


def easy(titulo):
    # o conteúdo vem de metodo.EXPL['neoplasias'] (substituído na ordem pelo build)
    return f'<div class="easy"><b class="t">Explicação · {titulo}</b><p></p></div>'


def org(root, cols, key=None, note=None):
    cs = ''
    for head, small, cor, cor_s, leaves in cols:
        lv = ''.join(f'<div class="org-leaf"><h5>{h}</h5><ul>' + ''.join(f'<li>{i}</li>' for i in its) + '</ul></div>' for h, its in leaves)
        cs += f'<div class="org-col" style="--c:{cor};--cs:{cor_s}"><div class="org-head">{head}<small>{small}</small></div>{lv}</div>'
    k = ''
    if key:
        k = '<div class="org-key">' + ''.join(f'<span style="background:{c}">{t}</span>' for t, c in key) + '</div>'
    nt = f'<div class="org-note">{note}</div>' if note else ''
    return (f'<div class="org" role="img" aria-label="Organograma: {root}"><div class="org-root">{root}</div><div class="org-stem"></div>'
            f'<div class="org-cols" style="--n:{len(cols)}">{cs}</div>{k}{nt}</div>')


def tbl(cab, linhas, cls='nx-tbl'):
    th = ''.join(f'<th>{c}</th>' for c in cab)
    tb = ''.join('<tr>' + ''.join(f'<td data-l="{cab[i]}">{v}</td>' for i, v in enumerate(l)) + '</tr>' for l in linhas)
    return f'<div class="nx-tw"><table class="{cls}"><thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>'


RED, ORA, TEA, PUR, NAV, SLA = '#b3141c', '#c2410c', '#0f766e', '#7a3fe0', '#13244a', '#475569'
REDs, ORAs, TEAs, PURs, NAVs, SLAs = '#fde7e9', '#ffedd5', '#ccfbf1', '#f3eefe', '#eaeef6', '#f1f5f9'

# ------------------------------------------------------------------ organogramas
ORG_NOMENCL = org('NEOPLASIA · NOMENCLATURA', [
    ('Benigna', 'localizada, extirpable', TEA, TEAs, [
        ('Mesenquimática → "OMA"', ['Fibroma · Condroma · Osteoma', '<b>Leiomioma</b> (músculo liso)', 'Rabdomioma (músculo esquelético)', 'Lipoma']),
        ('Epitelial → por célula, patrón o arquitectura', ['<b>Adenoma</b> (tejido glandular)', '<b>Papiloma</b> (proyecciones digitales)', '<b>Cistoadenoma</b> (masas quísticas, ovario)', 'Cistoadenoma papilar', '<b>Pólipo</b> · pólipo adenomatoso'])]),
    ('Maligna · "Cáncer"', 'invade y metastatiza', RED, REDs, [
        ('Mesenquimática sólida → "SARCOMA"', ['Fibrosarcoma · Condrosarcoma · Osteosarcoma', '<b>Leiomiosarcoma</b>', 'Rabdomiosarcoma · Liposarcoma']),
        ('Epitelial → "CARCINOMA"', ['<b>Carcinoma epidermoide (escamoso)</b>', '<b>Adenocarcinoma</b> (patrón glandular)', 'Origen desconocido: tumor maligno <b>indiferenciado</b>'])]),
    ('Células sanguíneas', 'formadoras de sangre', PUR, PURs, [
        ('Siempre malignas', ['<b>LEUCEMIAS</b>', '<b>LINFOMAS</b>'])]),
    ('Casos especiales', 'nomes que enganam', SLA, SLAs, [
        ('Más de un tipo celular', ['<b>Tumor mixto</b>: 1 clon, 1 capa germinal (adenoma pleomorfo)', '<b>Teratoma</b>: &gt;1 capa germinal (3), células totipotenciales']),
        ('Benignos · tejido del lugar o heterotópico', ['<b>Hamartoma</b>: células propias del lugar, desorganizadas', '<b>Coristoma</b>: tejido normal en lugar anormal']),
        ('"-oma" pero MALIGNOS', ['Linfoma · Melanoma · Mesotelioma · Seminoma'])]),
], key=[('Benigno', TEA), ('Maligno', RED), ('Hematológico', PUR), ('Especiales', SLA)],
   note='Regra de ouro: <b>epitelial maligno = carcinoma</b>; <b>mesenquimático maligno = sarcoma</b>; benigno = sufixo <b>-oma</b>.')

ORG_CARACT = org('CARACTERÍSTICAS · BENIGNAS × MALIGNAS', [
    ('1 · Diferenciación y anaplasia', 'como se vê a célula', PUR, PURs, [
        ('Benignos', ['<b>Bien diferenciados</b>', 'Mitosis infrecuentes y de forma normal']),
        ('Malignos', ['Diferenciación variada (bien → indiferenciados)', '<b>Anaplasia</b> = rasgo distintivo de malignidad'])]),
    ('2 · Invasión local', 'como cresce', ORA, ORAs, [
        ('Benignos', ['Masas <b>expansivas y cohesionadas</b>', '<b>Cápsula</b> de tejido fibroso comprimido', 'Excepto: <b>hemangioma</b>']),
        ('Malignos', ['Infiltración, invasión, destrucción', 'Seudocápsula · <b>"patas de un cangrejo"</b>'])]),
    ('3 · Metástasis', 'para onde vai', RED, REDs, [
        ('Benignos', ['<b>No</b> metastatizan']),
        ('Malignos', ['Todos pueden metastatizar', 'Excepción: <b>gliomas</b> y <b>carcinomas basocelulares</b> (invaden pero casi nunca metastatizan)'])]),
], note='A <b>metástasis</b> é o critério que <b>define</b> malignidade com certeza; a anaplasia é o "rasgo distintivo" na lâmina.')

ORG_VIAS = org('VÍAS DE DISEMINACIÓN', [
    ('1 · Siembra de cavidades', 'campo abierto', TEA, TEAs, [
        ('Dónde', ['Cavidad <b>peritoneal</b> (la más frecuente)', 'Pleural, pericárdica, subaracnoidea']),
        ('Ejemplo', ['<b>Carcinoma de ovario</b>', 'Mucosecretores apendiculares u ováricos → <b>SEUDOMIXOMA PERITONEAL</b>'])]),
    ('2 · Linfática', 'la de los carcinomas', PUR, PURs, [
        ('Característica', ['Vía más habitual de diseminación <b>inicial de los carcinomas</b>', 'También sarcomas']),
        ('Clave', ['<b>Ganglio linfático centinela</b>: primer ganglio que recibe la linfa del tumor'])]),
    ('3 · Hematógena', 'la de los sarcomas', RED, REDs, [
        ('Característica', ['<b>Característica de los sarcomas</b> (también carcinomas)', 'Venas &gt; arterias (pared arterial más gruesa)']),
        ('Destino', ['<b>HÍGADO</b> (drenaje portal)', '<b>PULMONES</b> (sangre de las cavas)'])]),
], note='Rara: propagação <b>iatrogénica</b> por instrumentos cirúrgicos.')

# ------------------------------------------------------------------ tabelas
T_BENIG_MALIG = tbl(['Rasgo', 'Benigno', 'Maligno'], [
    ['Diferenciación', '<b>bien diferenciado</b>, parece o tecido de origem', 'variada; os indiferenciados têm <b>anaplasia</b>'],
    ['Mitosis', 'infrequentes e normais', 'frequentes, <b>atípicas y grotescas</b> (tri-, tetra-, multipolares)'],
    ['Núcleo', 'normal (N:C 1:4 a 1:6)', '<b>grande, hipercromático</b>, N:C <b>1:1</b>, nucléolos grandes'],
    ['Crecimiento', 'lento, expansivo', 'rápido, infiltrativo'],
    ['Límites', '<b>cápsula</b> fibrosa: identifica, palpa, desloca, enuclea', 'mal delimitado; seudocápsula; <b>patas de cangrejo</b>'],
    ['Metástasis', '<b>nunca</b>', 'sim (exceto gliomas e basocelulares, quase nunca)'],
    ['Função', 'conserva (hormônios, queratina)', 'perde; às vezes funções novas (<b>síndromes paraneoplásicos</b>)']])

T_PARANEO = tbl(['Síndrome clínico (slide)', 'Tumor más asociado (Robbins)', 'Mecanismo'], [
    ['<b>Síndrome de Cushing</b>', 'carcinoma pulmonar de <b>células pequeñas</b>', 'ACTH o sustancia similar'],
    ['<b>SIADH</b> (secreción inadecuada de ADH)', 'carcinoma pulmonar de células pequeñas', 'ADH o péptidos natriuréticos'],
    ['<b>Hipercalcemia</b>', 'carcinoma <b>epidermoide</b> de pulmón, mama, renal', '<b>PTHrP</b>, TGF-α, TNF, IL-1'],
    ['<b>Hipoglucemia</b>', 'fibrosarcoma y otros sarcomas, hepatocarcinoma', 'insulina o sustancia similar (IGF-II)'],
    ['<b>Policitemia</b>', 'carcinoma renal, hemangioma cerebeloso, hepatocarcinoma', 'eritropoyetina'],
    ['Miastenia', 'carcinoma broncógeno, timoma', '<b>Inmunitario</b>'],
    ['Trastornos del SNC y periférico', 'carcinoma de mama', 'Inmunitario'],
    ['Acantosis nigricans', 'carcinoma gástrico, de pulmón, uterino', '<b>Inmunitario</b>; secreción de EGF'],
    ['Dermatomiositis', 'carcinoma broncógeno, de mama', 'Inmunitario'],
    ['Osteoartropatía hipertrófica y acropaquia digital', 'carcinoma broncógeno', '<b>Desconocido</b>'],
    ['Trombosis venosa (<b>fenómeno de Trousseau</b>)', 'carcinoma pancreático, broncógeno', 'productos tumorales (mucinas) que activan la coagulación'],
    ['Coagulación intravascular diseminada', 'leucemia promielocítica aguda, próstata', 'productos tumorales que activan la coagulación'],
    ['Endocarditis trombótica abacteriana', 'cánceres avanzados', 'hipercoagulabilidad'],
    ['Aplasia eritrocítica', 'timoma', '<b>Desconocido</b>'],
    ['Síndrome nefrótico', 'varios cánceres', 'antígenos tumorales, inmunocomplejos']])

T_TNM = tbl(['Letra', 'Qué mide', 'Escala (slide)'], [
    ['<b>T</b>', 'tumor primario (tamaño / extensión local)', '<b>T0</b> lesión in situ · <b>T1 a T4</b> conforme aumenta el tamaño'],
    ['<b>N</b>', 'afectación de ganglios linfáticos regionales', '<b>N0</b> sin ganglios · <b>N1 a N3</b> número y extensión crecientes'],
    ['<b>M</b>', 'metástasis a distancia (hematógena)', '<b>M0</b> sin metástasis · <b>M1 (M2)</b> con metástasis']])

T_GRAD_EST = tbl(['', 'Gradación', 'Estadificación'], [
    ['Mide', 'grado de <b>diferenciación</b> de las células (y nº de mitosis, rasgos arquitecturales)', '<b>extensión de la propagación</b> del tumor en el organismo'],
    ['Base', 'semejanza con las células sanas', 'tamaño de la lesión primaria · ganglios · metástasis hematógenas'],
    ['Categorías', '2 (bajo / alto) a 4 grados', 'sistema <b>TNM</b>'],
    ['Quién la hace', 'el patólogo: es <b>histológico</b>', 'clínica + imagen + patología: es <b>clínico</b>'],
    ['Valor pronóstico', 'menor', '<b>mayor</b> (Robbins)']])

# ------------------------------------------------------------------ capítulo
SECAO = f'''<section class="topic" id="neoplasias" data-title="Neoplasias"><div class="section"><div class="section-head"><div class="section-number">06</div><div><h2>Neoplasias · generalidades</h2><div class="section-kicker">Clase 11 · Unidad IV · Robbins 9ª ed. cap. 7 pág. 265 · Atlas Robbins · WebPath</div></div></div><div class="sum60"><div class="t">Resumen 60 s · Neoplasias</div><ul><li><strong>Neoplasia</strong>: masa anormal, crecimiento <strong>excesivo, descoordinado y autónomo</strong>, por mutaciones que afectan a <strong>una sola célula y a su progenie clónica</strong>.</li><li>2 componentes: <strong>parénquima</strong> (clasifica y define el comportamiento) + <strong>estroma reactivo</strong>. Mucho colágeno = <strong>DESMOPLASIA</strong> (mama, pétreo, escirro).</li><li>Benigno <strong>-OMA</strong> · maligno mesenquimático <strong>SARCOMA</strong> · maligno epitelial <strong>CARCINOMA</strong> · sangre: <strong>leucemias y linfomas</strong>.</li><li>3 características: <strong>diferenciación y anaplasia</strong> · <strong>invasión local</strong> · <strong>metástasis</strong>. Anaplasia = pleomorfismo + núcleo anómalo + mitosis atípicas + pérdida de polaridad.</li><li>Precursoras: metaplasia → <strong>displasia</strong> → <strong>carcinoma in situ</strong> (membrana basal <strong>intacta</strong>) → invasor.</li><li>Vías: cavidades · <strong>linfática (carcinomas)</strong> · <strong>hematógena (sarcomas)</strong> → hígado y pulmones. <strong>Gradación</strong> = histológica · <strong>estadificación</strong> = clínica, <strong>TNM</strong>.</li></ul></div>
<h3 id="neo-def">Definición y componentes</h3>
{slide('Neoplasia', '<p><strong>"Crecimiento nuevo". "Tumor".</strong> Es una masa anormal de tejido, con un <strong>crecimiento excesivo y descoordinado, independiente (autónomo)</strong>, en relación con el tejido sano, causado por una serie de mutaciones adquiridas que afectan a <strong>una sola célula y a su progenie clónica</strong>.</p><p><strong>Poseen 2 componentes esenciales:</strong></p><ul><li><strong>Parénquima tumoral</strong>: células neoplásicas (clasificación y el componente biológico).</li><li><strong>Estroma reactivo</strong>: tejido conjuntivo, vasos sanguíneos y células del sistema inmunitario adaptativo e innato (velocidad y propagación).<ul><li>Tejido conjuntivo escaso: consistencia <strong>blanda y carnosa</strong>.</li><li>Colágeno abundante: <strong>DESMOPLASIA</strong> (cáncer de mama, consistencia pétrea, <strong>escirros</strong>).</li></ul></li></ul>')}
{easy('o que é um tumor')}
<div class="pitfall"><b class="t">Pegadinha · "clonal" e "desmoplasia"</b>
<ul>
<li>A neoplasia nasce de <strong>uma só célula</strong> (monoclonal). Se a alternativa diz "varias células" ou "policlonal", está errada. Até o <strong>tumor mixto</strong> vem de <strong>um só clone</strong>.</li>
<li><strong>Desmoplasia</strong> é colágeno abundante <strong>no estroma</strong>, não no parênquima. Já caiu como "Acúmulo abundante de colágeno en neoplasia" → <strong>Desmoplasia</strong>.</li>
<li>Quem <strong>classifica</strong> o tumor e define seu comportamento é o <strong>parénquima</strong>; o estroma define <strong>velocidade e propagação</strong> (dá o suporte vascular).</li>
</ul></div>
{grid(fig('neo-04.jpg', 'Carcinoma ductal infiltrante de mama con desmoplasia', 'Carcinoma ductal infiltrante de mama: células tumorales entre <b>bandas de colágeno</b> (desmoplasia). Consistência pétrea = <b>escirro</b>.'))}
<h3 id="neo-nomenclatura">Nomenclatura</h3>
<h4 class="mm">Organograma da nomenclatura</h4>
{ORG_NOMENCL}
{slide('Tumores benignos', '<p>Tumor <strong>localizado</strong>, sin propagación a otros lugares y susceptible a <strong>extirpación quirúrgica local</strong>.</p><p><strong>Nomenclatura:</strong> de las células mesenquimatosas: <strong>"OMA"</strong>. De las células epiteliales: según la célula originaria, patrón microscópico o su arquitectura macroscópica.</p><p><strong>Mesenquimáticos:</strong> tejido fibroso: Fibroma · cartilaginoso: Condroma · muscular liso: Leiomioma · muscular esquelético: Rabdomioma · óseo: Osteoma.</p><p><strong>Epiteliales:</strong> derivadas del tejido glandular: <strong>Adenoma</strong> (las que forman y no forman estructuras glandulares) · proyecciones digitales o verrugosas (micro - macro): <strong>papilomas</strong> · masas quísticas (ovarios): <strong>cistoadenomas</strong> · patrones papilares que protruyen en espacios quísticos: <strong>cistoadenomas papilares</strong> · proyección macroscópica visible sobre la superficie de la mucosa (B/M): <strong>pólipo</strong> · pólipo con tejido glandular: <strong>pólipo adenomatoso</strong>.</p>')}
{slide('Tumores malignos "Cáncer"', '<p>El tumor puede <strong>invadir y destruir</strong> las estructuras adyacentes, y propagarse hacia sitios remotos (<strong>metastatizar</strong>), causando la muerte.</p><p><strong>Nomenclatura:</strong> de las células mesenquimatosas sólidas: <strong>SARCOMA</strong> · derivados de células formadoras de sangre: <strong>LEUCEMIAS o LINFOMAS</strong> · de las células epiteliales: <strong>CARCINOMAS</strong>.</p><p><strong>Mesenquimáticos:</strong> Fibrosarcoma · Condrosarcoma · Leiomiosarcoma · Rabdomiosarcoma · Osteosarcoma.</p><p><strong>Epiteliales:</strong> provenientes de cualquiera de las 3 capas germinales (ectodermo: epidermis · mesodermo: túbulos renales · endodermo: revestimiento del tubo digestivo). Se subclasifican: <strong>carcinoma epidermoide (escamoso)</strong>, las células se presentan como el epitelio escamoso estratificado · <strong>adenocarcinoma</strong>, adoptan un patrón glandular. Tumor con origen tisular desconocido: <strong>tumor maligno indiferenciado</strong>.</p>')}
{easy('como dar nome a qualquer tumor')}
{grid(fig('neo-09.jpg', 'Cistoadenoma y cistoadenoma papilar de ovario', '<b>Cistoadenoma</b> (esq.: cisto de parede lisa) e <b>cistoadenoma papilar</b> (dir.: papilas dentro do cisto), ovário.'),
      fig('neo-10.jpg', 'Pólipo adenomatoso', '<b>Pólipo adenomatoso</b> (adenoma tubular) do cólon: projeção na mucosa com glândulas.'),
      fig('neo-11.jpg', 'Adenoma hepático e hígado normal', '<b>Adenoma hepático</b> (dir.) × fígado normal (esq.): hepatócitos bem diferenciados, sem os espaços porta.'),
      fig('neo-14.jpg', 'Lipoma y liposarcoma', 'Tecido adiposo normal × <b>lipoma</b> (igual ao normal) × <b>liposarcoma</b> (núcleos atípicos, lipoblastos).'),
      fig('neo-15.jpg', 'Leiomioma y leiomiosarcoma', 'Músculo liso normal × <b>leiomioma</b> (feixes ordenados) × <b>leiomiosarcoma</b> (núcleos atípicos, celularidade alta).'),
      fig('neo-17.jpg', 'Adenocarcinoma in situ de pulmón', 'Pulmão normal × <b>adenocarcinoma in situ</b>: células atípicas forrando os septos alveolares.'),
      fig('neo-18.jpg', 'Adenocarcinoma hepático', 'Fígado normal × <b>adenocarcinoma hepático</b> (hepatocarcinoma): pleomorfismo, perda dos cordões.'),
      fig('neo-19.jpg', 'Carcinoma escamoso de pulmón', 'Brônquio normal × <b>carcinoma escamoso de pulmón</b>: ninhos de células escamosas com queratina.'),
      fig('neo-24.jpg', 'Tabla de nomenclatura de Robbins', 'Tabela de nomenclatura do Robbins. Os <b>quadros vermelhos</b> do slide marcam <b>mesotelioma, linfomas, seminoma y melanoma maligno</b>: "-oma" malignos.'))}
<div class="pitfall"><b class="t">Pegadinha · o sufixo engana</b>
<ul>
<li><strong>"-oma" nem sempre é benigno</strong>: <strong>linfoma, melanoma, mesotelioma e seminoma</strong> são malignos (a Dra. marcou esses quatro em vermelho na tabela).</li>
<li><strong>Leiomiosarcoma</strong> = maligno <strong>mesenquimático</strong>, <strong>mesmo bem diferenciado</strong>. "Bien diferenciado" não o torna benigno nem encapsulado.</li>
<li><strong>Carcinoma</strong> pode vir das <strong>3 capas germinais</strong> (o túbulo renal é mesoderma e dá carcinoma). Quem decide é ser <strong>epitélio</strong>, não a camada.</li>
<li><strong>Pólipo</strong> é descrição macroscópica (projeção na mucosa), não diagnóstico de benignidade: <strong>pólipo con tejido glandular</strong> = pólipo adenomatoso.</li>
</ul></div>
<h3 id="neo-mixtos">Tumores mixtos, teratoma, hamartoma y coristoma</h3>
{slide('Tumores mixtos y teratoma', '<p><strong>La mayoría de las neoplasias, incluso los tumores mixtos, se componen de células procedentes de una sola capa germinal.</strong></p><p><strong>Tumores mixtos:</strong> todos los elementos se originan de <strong>un solo clon neoplásico</strong>, capacitado para producir células tanto epiteliales como mioepiteliales: <strong>"ADENOMA PLEOMORFO"</strong>. Tumor mixto de las glándulas salivales: contienen componentes epiteliales dispersos en un <strong>estroma mixoide</strong> que puede albergar islotes de cartílago o hueso.</p><p><strong>Teratoma:</strong> contiene células o tejidos maduros e inmaduros reconocibles y pertenecientes a <strong>más de una de las capas germinales (3)</strong>. Se origina en <strong>células germinales totipotenciales</strong>, presentes en los <strong>ovarios y testículos</strong>, a veces en vestigios embrionarios anómalos de la línea media. <strong>Teratoma quístico del ovario</strong>: se diferencia sobre todo de las <strong>líneas ectodérmicas</strong> (tumor quístico tapizado por piel y lleno de pelos, glándulas sebáceas y estructuras dentarias) <strong>"QUISTE DERMOIDE"</strong>.</p>')}
{slide('Hamartoma y coristoma', '<p><strong>Hamartoma:</strong> masas desorganizadas (benignas), de <strong>células propias del lugar afectado</strong> (aberraciones cromosómicas clonales); <strong>hamartoma pulmonar</strong>.</p><p><strong>Coristoma:</strong> <strong>resto heterotópico</strong> de células (tejido que no es normal en el sitio de origen); coristoma de glándulas salivales del oído medio, pequeño nódulo de <strong>tejido pancreático</strong> perfectamente desarrollado y con una organización normal en la submucosa del estómago, duodeno o intestino delgado.</p>')}
{easy('mixto × teratoma × hamartoma × coristoma')}
{tbl(['Lesión', 'Capas germinales', 'Clave para a prova', 'Exemplo do slide'], [
    ['<b>Tumor mixto</b>', '<b>1</b> (um só clone)', 'epitelial + mioepitelial em estroma mixoide', '<b>Adenoma pleomorfo</b> de glándula salival'],
    ['<b>Teratoma</b>', '<b>&gt; 1 (3)</b>', 'células germinales totipotenciales; gônadas e linha média', '<b>Quiste dermoide</b> (ovário) · <b>struma ovarii</b>'],
    ['<b>Hamartoma</b>', '— (tecido do próprio lugar)', 'células <b>propias del lugar</b>, desorganizadas', '<b>Hamartoma pulmonar</b>'],
    ['<b>Coristoma</b>', '— (tecido normal fora do lugar)', '<b>resto heterotópico</b>: tecido normal em local anormal', '<b>Páncreas</b> na submucosa gástrica']])}
{grid(fig('neo-20.jpg', 'Tumor mixto de glándula salival', '<b>Tumor mixto</b> (adenoma pleomorfo): estroma <b>mixocondroide</b> e componente epitelial em padrão acinar.'),
      fig('neo-22.jpg', 'Quiste dermoide y struma ovarii', '<b>Quiste dermoide</b> (cheio de pelos e um dente) e cortes com elemento glandular, folículos pilosos, cartilagem, tecido adiposo e <b>struma ovarii</b> (tireoide).'))}
<div class="exam"><b class="t">Já caiu em prova · Sección III, Examen Final Complementario 21/02/2024</b>
<p><em>Parea las siguientes nomenclaturas con su definición correspondiente. Obs: solo 2 son correctas, las demás quedarán en blanco (doble marcación anula el ítem).</em> a) Quiste dermoide · b) Hamartoma</p>
<ul>
<li>(<span class="a">b</span>) Masas desorganizadas benignas de células propias del lugar afectado → <strong>Hamartoma</strong>.</li>
<li>(<span class="a">a</span>) Teratoma quístico que se diferencia sobre todo de las líneas ectodérmicas → <strong>Quiste dermoide</strong>.</li>
<li>( ) Presencia de tejido de aspecto normal en localización anormal → é <strong>coristoma</strong>: fica em branco.</li>
<li>( ) Forma especializada de teratoma que contiene cartílago, tejido adiposo, glándulas intestinales y numerosos folículos tiroideos → é <strong>struma ovarii</strong>: fica em branco.</li>
<li>( ) Proyección macroscópica visible sobre la superficie mucosa → é <strong>pólipo</strong>: fica em branco.</li>
</ul>
<p class="src">Fonte: foto da prova original (pág. 2 das provas antigas). Os distratores são definições <strong>corretas de outras lesões</strong>: marque só as 2 que pedem.</p>
</div>
<h3 id="neo-caract">Características: diferenciación y anaplasia</h3>
<h4 class="mm">Organograma benigno × maligno</h4>
{ORG_CARACT}
{slide('Diferenciación y anaplasia', '<p><strong>Diferenciación</strong>: es la <strong>magnitud en que las células parenquimatosas neoplásicas se asemejan en su función y forma a las células correspondientes del parénquima sano</strong>. La <strong>falta de diferenciación</strong> se conoce como <strong>ANAPLASIA</strong>.</p><p><strong>En general:</strong> 1. Benignos: <strong>bien diferenciados</strong>, mitosis infrecuentes y de forma normal. 2. Malignos: diferenciación celular parenquimatosa variada (bien diferenciados a indiferenciados).</p><p><strong>Anaplasia: rasgo distintivo de malignidad.</strong> "Formar hacia atrás" implica una inversión de la diferenciación hacia un plano más primitivo. Suele asociarse a: <strong>1. Pleomorfismo · 2. Morfología nuclear anómala · 3. Mitosis · 4. Pérdida de polaridad</strong>.</p>')}
{slide('Las 4 alteraciones de la anaplasia', '<ul><li><strong>Pleomorfismo</strong>: variación en el tamaño y forma de la célula. Las células de un mismo tumor no son uniformes, varían desde un tamaño pequeño con aspecto indiferenciado hasta <strong>células gigantes tumorales</strong> (pueden presentar 1 solo núcleo polimorfo enorme, mientras que otros presentan ≥2 núcleos hipercromáticos grandes).</li><li><strong>Morfología nuclear anómala</strong>: los núcleos son desproporcionadamente grandes (relación núcleo y citoplasma <strong>1:1</strong>; <strong>NORMAL: 1:4 o 1:6</strong>). La forma nuclear varía y es irregular, la cromatina adquiere un aspecto tosco y se distribuye a lo largo de la membrana nuclear o presenta tinción más oscura (<strong>NÚCLEO HIPERCROMÁTICO</strong>). Se observan <strong>nucléolos anormalmente grandes</strong>.</li><li><strong>Mitosis</strong>: se observa mitosis de muchas células de tumores indiferenciados, como reflejo de la gran actividad proliferativa. <strong>La presencia no indica necesariamente que un tumor sea maligno</strong> o el tejido sea neoplásico. Un rasgo más característico son las <strong>FIGURAS MITÓTICAS ATÍPICAS Y GROTESCAS</strong>, en ocasiones con husos tripolares, tetrapolares o multipolares.</li><li><strong>Pérdida de polaridad</strong>: se altera mucho la orientación de las células anaplásicas. Las láminas o grandes masas de células tumorales crecen de forma <strong>anárquica y desorganizada</strong>.</li></ul>')}
{easy('anaplasia sem decoreba')}
{T_BENIG_MALIG}
<div class="pitfall"><b class="t">Pegadinha · mitose não é sinônimo de câncer</b>
<ul>
<li>"La presencia de mitosis indica malignidad" → <strong>FALSO</strong>. Tecidos normais em renovação (medula, mucosa intestinal) e hiperplasias também têm mitoses. O marcador de malignidade é a <strong>mitosis atípica</strong> (fuso tripolar, tetrapolar, multipolar).</li>
<li>Relação núcleo:citoplasma: <strong>1:1 no tumor</strong> × <strong>1:4 a 1:6 no normal</strong>. Ela troca os números.</li>
<li>Diferenciación é sobre <strong>función y forma</strong>, comparando com o <strong>parénquima sano</strong> (não com o estroma).</li>
</ul></div>
{grid(fig('neo-27.jpg', 'Adenocarcinoma diferenciado y carcinoma escamoso moderadamente diferenciado', '<b>Adenocarcinoma diferenciado</b> (glândulas reconhecíveis) e <b>carcinoma escamoso moderadamente diferenciado</b>.'),
      fig('neo-28.jpg', 'Adenocarcinoma gástrico indiferenciado', '<b>Adenocarcinoma gástrico indiferenciado</b>: células em <b>anel de sinete</b> (o anel desenhado no slide), mucina empurrando o núcleo.'),
      fig('neo-30.jpg', 'Pleomorfismo', '<b>Pleomorfismo</b>: células de tamanhos e formas diferentes, células gigantes tumorais (setas).'),
      fig('neo-31.jpg', 'Morfología nuclear anómala', 'Núcleos grandes e <b>hipercromáticos</b>, <b>nucléolos</b> grandes (setas).'),
      fig('neo-32.jpg', 'Citología con núcleos grandes y oscuros', 'Citologia: <b>núcleos más grandes y oscuros</b> que os das células normais (círculos).'),
      fig('neo-33.jpg', 'Mitosis atípicas', '<b>Mitosis</b> abundantes (setas); a atípica é a que pesa para malignidade.'))}
<h3 id="neo-funcion">Función de la célula tumoral y síndromes paraneoplásicos</h3>
{slide('Función', '<p><strong>Cuanto mayor es la diferenciación de la célula transformada, mejor conservará las capacidades funcionales de su equivalente normal.</strong> Neoplasias benignas y carcinomas bien diferenciados de las glándulas endócrinas suelen <strong>secretar hormonas</strong> características de su origen. Ejemplo: carcinomas epidermoides bien diferenciados de la epidermis sintetizan <strong>queratina</strong>; carcinomas hepatocelulares bien diferenciados elaboran <strong>bilis</strong>.</p><p><strong>Los tumores anaplásicos de crecimiento rápido, NO suelen poseer una actividad funcional especializada.</strong> Células anaplásicas indiferenciadas dejan de parecerse a las células normales de donde provienen. En ocasiones, <strong>adquieren funciones nuevas e imprevistas</strong>: expresan proteínas fetales o proteínas que solo se descubren en otros tipos de células adultas. Ejemplo: <strong>carcinomas broncógenos</strong> producen, a veces, corticotropina, insulina, glucagón y otras hormonas, induciendo <strong>SÍNDROMES PARANEOPLÁSICOS</strong>.</p>')}
<h4>Síndromes paraneoplásicos · el cuadro del slide completado</h4>
<p>O slide 37 traz só a coluna dos síndromes e as etiquetas <em>Inmunitario</em> e <em>Desconocido</em>. As colunas do tumor e do mecanismo vêm da mesma tabela do Robbins (cap. 7).</p>
{T_PARANEO}
<div class="pitfall"><b class="t">Pegadinha · bem diferenciado × anaplásico</b>
<ul>
<li>Hormônio <strong>próprio do órgão</strong> (insulina num tumor de ilhota, queratina num escamoso) = sinal de <strong>boa diferenciação</strong>.</li>
<li>Hormônio <strong>estranho ao órgão</strong> (ACTH num carcinoma de pulmão) = função <strong>nova e imprevista</strong> de célula <strong>anaplásica</strong> → <strong>síndrome paraneoplásico</strong>.</li>
<li>Hipercalcemia paraneoplásica clássica = <strong>carcinoma epidermoide de pulmão</strong> (PTHrP). Cushing e SIADH = <strong>células pequeñas</strong>.</li>
</ul></div>
<h3 id="neo-precursoras">Lesiones precursoras: metaplasia, displasia, carcinoma in situ</h3>
{slide('Metaplasia', '<ul><li><strong>Sustitución de un tipo de células por otro.</strong></li><li>Se asocia casi siempre a <strong>daño, reparación y regeneración</strong> del tejido.</li><li><strong>Ejemplo:</strong> RGE que daña el epitelio escamoso del esófago (distal) y es reemplazado por <strong>epitelio glandular (gástrico o intestinal)</strong>.</li><li>Las displasias son frecuentes en un epitelio metaplásico, <strong>pero no todo el epitelio metaplásico es displásico</strong>.</li></ul>')}
{slide('Displasia', '<p>Se considera una <strong>lesión precursora</strong> de la transformación maligna (<strong>pero no siempre evoluciona hacia el cáncer</strong>).</p><ul><li><strong>"Crecimiento desordenado"</strong>.</li><li><strong>Principalmente en los epitelios.</strong></li><li>Se caracteriza por un conjunto de alteraciones, como: <strong>pérdida de la uniformidad</strong> de cada célula y <strong>desorientación arquitectónica</strong>. Presentan mucho <strong>pleomorfismo</strong>, grandes <strong>núcleos hipercromáticos</strong> con un elevado índice núcleo-citoplásmico, hay más <strong>figuras mitóticas</strong>.</li></ul>')}
{slide('Carcinoma in situ', '<ul><li>Si la alteración displásica es <strong>intensa y afecta a todo el espesor del epitelio, pero no penetra la membrana basal</strong>, se denomina <strong>NEOPLASIA PREINVASIVA o CARCINOMA IN SITU</strong>.</li><li>Puede persistir durante años sin infiltrar.</li><li>Se considera una lesión precursora de la transformación maligna, pero no siempre evoluciona hacia el cáncer.</li><li>Una vez que las células tumorales <strong>rompen la membrana basal</strong>, se habla de <strong>TUMOR INVASIVO o INFILTRANTE</strong>.</li><li>Si desaparece la causa desencadenante, una <strong>displasia leve o moderada</strong>, que no afecte a la totalidad del espesor del epitelio, <strong>puede revertir completamente</strong>.</li></ul>')}
{easy('a escada até o câncer invasor')}
<div class="pitfall"><b class="t">Pegadinha · o que define o in situ</b>
<ul>
<li>O que define <strong>carcinoma in situ</strong> é a <strong>membrana basal intacta</strong>. "Crecimiento desordenado en todo el espesor epitelial" descreve a <strong>displasia intensa</strong>, mas o critério pedido é a membrana basal (foi exatamente essa a pegadinha da prova).</li>
<li>Carcinoma in situ <strong>não</strong> metastatiza: sem invadir a membrana basal não alcança vasos. "Baja incidencia de metástasis" está errado: é <strong>nenhuma</strong>.</li>
<li><strong>Displasia ≠ câncer</strong> e <strong>nem sempre</strong> evolui; leve e moderada podem <strong>regredir</strong>. Já a displasia de <strong>todo o espesor</strong> é o in situ.</li>
<li>Metaplasia é <strong>adaptação</strong> (P1); o risco vem da displasia que pode surgir sobre ela (Barrett).</li>
</ul></div>
{grid(fig('neo-38.jpg', 'Metaplasia intestinal', '<b>Metaplasia "intestinal"</b> (cilíndrica) no esôfago: glândulas com células caliciformes ao lado do epitélio escamoso.'),
      fig('neo-40.jpg', 'Epitelio escamoso cervical normal y displásico', 'Epitélio escamoso cervical <b>normal</b> (maturação ordenada) × <b>displásico</b> (núcleos grandes e escuros subindo no espesor).'),
      fig('neo-42.jpg', 'Carcinoma escamoso in situ de cuello uterino', 'Colo normal × <b>carcinoma escamoso in situ</b>: atipia em todo o espesor, <b>membrana basal íntegra</b>.'),
      fig('neo-43.jpg', 'Carcinoma escamoso invasor de cuello uterino', '<b>Carcinoma escamoso</b> invasor: ninhos no estroma com <b>pérolas de queratina</b>.'))}
<div class="exam"><b class="t">Já caiu em prova · Examen Final Complementario 21/02/2024</b>
<p class="q"><strong>17.</strong> Se realiza una biopsia cervical, cuyo estudio histológico muestra un carcinoma in situ con áreas de epitelio escamoso con formación de perlas córneas. El concepto de carcinoma in situ corresponde a una lesión que se caracteriza por: a) Ausencia de atipia marcada · b) Baja incidencia de metástasis · c) Membrana basal intacta · d) Crecimiento desordenado en todo el espesor epitelial → <span class="a">c) Membrana basal intacta</span></p>
<p class="q"><strong>12.</strong> Mujer de 59 años con dolor retroesternal y ardor después de las comidas hace 4 años; biopsia de la mucosa esofágica inferior con epitelio cilíndrico con células caliciformes. ¿Qué alteración de la mucosa está más probablemente representada? → <span class="a">Metaplasia intestinal (esófago de Barrett)</span></p>
<p class="q">Transcrição de alunos: "Lesión tumoral en el cuello uterino. Examen que debe hacerse antes de que se vuelva un tumor" → <span class="a">Citología exfoliativa (Papanicolaou)</span></p>
</div>
<h3 id="neo-invasion">Invasión local</h3>
{slide('Invasión local', '<p><strong>TUMORES BENIGNOS:</strong> casi todos crecen en forma de <strong>masas expansivas y cohesionadas</strong> que se mantienen en su lugar de origen y <strong>carecen de la capacidad para infiltrar, invadir o metastatizar</strong>.</p><p><strong>TUMORES MALIGNOS "CÁNCER":</strong> el crecimiento se acompaña de una <strong>infiltración, invasión y destrucción progresivas</strong> del tejido circundante.</p><p><strong>Tumores benignos:</strong> crecen y se expanden con lentitud, por lo que crean una <strong>"cápsula" de tejido fibroso comprimido</strong> (MEC: células estromales, fibroblastos). Permite que el tumor sea: 1. Identificado · 2. Se palpe con facilidad · 3. Se desplace (no se encuentra fijo) · 4. Se extirpe fácilmente mediante <strong>enucleación quirúrgica</strong>. <strong>Excepto: HEMANGIOMA</strong> (constituido por vasos sanguíneos entrelazados), <strong>NO suelen encapsularse</strong>.</p><p><strong>Tumores malignos:</strong> suelen <strong>delimitarse mal</strong> del tejido circundante y carecen de un plano de resección bien definido. Hay tumores malignos con expansión lenta, que presentan una <strong>seudocápsula</strong>; aunque en el examen histológico se revela casi siempre hileras celulares que atraviesan el margen e infiltran las estructuras vecinas, con un patrón de crecimiento parecido a las <strong>"PATAS DE UN CANGREJO"</strong>.</p>')}
{easy('cápsula, seudocápsula e caranguejo')}
{grid(fig('neo-46.jpg', 'Tumores benignos macroscópicos', 'Benignos bem delimitados: <b>lipoma</b> na serosa do intestino delgado, <b>pólipo intestinal</b>, <b>leiomioma</b> uterino e <b>adenoma hepático</b>.'),
      fig('neo-48.jpg', 'Tumores malignos macroscópicos', 'Malignos: <b>CHC</b> (carcinoma hepatocelular) e <b>carcinoma de células escamosas</b> infiltrando sem limite nítido.'),
      fig('neo-49.jpg', 'Carcinoma de células escamosas invasor', '<b>Carcinoma de células escamosas</b>: cordões atravessam a margem e infiltram o estroma ("patas de cangrejo").'))}
<h3 id="neo-metastasis">Metástasis y vías de diseminación</h3>
{slide('Metástasis', '<p><strong>Propagación del tumor a sitios físicamente alejados del tumor primario.</strong> La capacidad de invasión le permite penetrar a través de los vasos sanguíneos, linfáticos y cavidades corporales, propagándose por todo el organismo.</p><p><strong>Todos los tumores malignos pueden metastatizar</strong>, si bien algunos apenas lo hacen: neoplasias malignas de las células gliales del SNC <strong>"GLIOMAS"</strong> y <strong>carcinomas basocelulares</strong> de la piel, producen invasión temprana, <strong>pero casi nunca metastatizan</strong>.</p><p><strong>En general, la probabilidad de que un tumor metastatice se correlaciona con:</strong> 1. Falta de diferenciación · 2. Invasión local agresiva · 3. Crecimiento rápido · 4. Tamaño voluminoso.</p>')}
<h4 class="mm">Organograma das vias de disseminação</h4>
{ORG_VIAS}
{slide('Vías de diseminación', '<p>Puede diseminarse por cualquiera de estas 3 vías: <strong>1. Siembra directa de cavidades o superficies corporales · 2. Siembra linfática · 3. Siembra hematógena</strong>. Propagación iatrogénica, instrumentos quirúrgicos (infrecuente).</p><p><strong>1. Siembra de cavidades y superficies corporales:</strong> ocurre cuando una neoplasia maligna penetra en un "campo abierto" natural sin barreras físicas. La mayoría invade la <strong>cavidad peritoneal</strong> aunque puede invadir cualquier otra. Es bastante característica de los <strong>carcinomas de ovario</strong>, que permanecen en la superficie de las vísceras abdominales sin penetrar en su interior. A veces los <strong>CARCINOMAS APENDICULARES U OVÁRICOS, secretores de moco</strong>, ocupan la cavidad peritoneal, formando una masa neoplásica gelatinosa llamada <strong>SEUDOMIXOMA PERITONEAL</strong>.</p><p><strong>2. Diseminación linfática:</strong> es la vía más habitual de <strong>diseminación inicial de los carcinomas</strong> (sarcomas). Los tumores carecen de vasos linfáticos funcionales, aunque los que se encuentran próximos son suficientes. Para examinar la presencia o ausencia de metástasis en ganglios linfáticos, se biopsian los ganglios centinela. <strong>GANGLIO LINFÁTICO CENTINELA</strong>: es el primer ganglio de una región linfática que recibe el flujo linfático del tumor primario.</p><p><strong>3. Diseminación hematógena:</strong> es <strong>característico de los sarcomas</strong> (carcinomas). Las paredes de las arterias son más gruesas, por lo que son penetradas con menos facilidad. En caso de invasión venosa, el <strong>HÍGADO y los PULMONES</strong> constituyen el asiento más habitual, puesto que todo el drenaje portal fluye hacia el hígado y toda la sangre de las venas cavas fluye hacia los pulmones.</p>')}
{easy('por que fígado e pulmão')}
<div class="pitfall"><b class="t">Pegadinha · carcinoma × sarcoma na disseminação</b>
<ul>
<li><strong>Carcinoma → linfática</strong> (inicial); <strong>sarcoma → hematógena</strong>. O slide põe a outra entre parênteses: as duas vias valem para ambos, mas a <strong>"característica"</strong> é essa.</li>
<li>Glioma e carcinoma basocelular: <strong>invadem cedo</strong>, mas <strong>quase nunca</strong> metastatizam. Não são benignos.</li>
<li>Seudomixoma peritoneal = <strong>siembra de cavidades</strong> por tumor <strong>mucosecretor</strong> de <strong>apêndice ou ovário</strong>, não metástase hematógena.</li>
<li>Veias são invadidas mais que artérias (parede mais fina). Por isso os destinos são <strong>fígado</strong> (porta) e <strong>pulmões</strong> (cavas).</li>
</ul></div>
{grid(fig('neo-51.jpg', 'Metástasis en hígado y pulmón', 'Metástases múltiplas no <b>fígado</b> e no <b>pulmão</b>: nódulos de tamanhos variados, típicos da via hematógena.'))}
<div class="exam"><b class="t">Já caiu em prova</b>
<p class="q">Final 21/02/2024 (transcrição digitada): "Tipo de diseminación metastásica de un tumor pulmonar" → <span class="a">Hematógena</span> (as metástases <strong>no</strong> pulmão chegam pelas cavas).</p>
<p class="q">Transcrição de alunos: "Vía de transmisión más común de los carcinomas" → <span class="a">Linfática</span></p>
</div>
<h3 id="neo-gradacion">Gradación y estadificación · TNM</h3>
{slide('Gradación y estadificación', '<p>Los métodos para cuantificar la agresividad clínica son imprescindibles para establecer el pronóstico adecuado y determinar la terapéutica: <strong>1. Gradación · 2. Estadificación</strong>.</p><p><strong>Gradación:</strong> se basa en el <strong>grado de diferenciación de las células tumorales</strong> (macroscópico y microscópico) y algunos casos, en el <strong>número de mitosis o rasgos arquitecturales</strong>. Los criterios de cada grado varían según el tipo de tumor (miden extensión en la que las células tumorales se asemejan o no a las sanas). Suelen incluir entre 2 (grado bajo y grado alto) a 4 categorías. <strong>Es histológico.</strong></p><p><strong>Estadificación:</strong> significa la <strong>extensión de la propagación del tumor</strong> dentro del organismo. Tumores sólidos se basa en: 1. <strong>Tamaño de la lesión primaria</strong> · 2. <strong>Propagación de ganglios linfáticos</strong> locales y regionales · 3. <strong>Presencia o ausencia de metástasis</strong> propagadas por vía hematógena. <strong>Es clínico.</strong></p><p><strong>Clasificación TNM (varía para cada forma de cáncer):</strong> 1. T (tumor primario) · 2. N (afectación de ganglios linfáticos regionales) · 3. M (presencia de metástasis). <strong>T0</strong> lesión in situ, <strong>T1 a T4</strong> conforme va aumentando el tamaño. <strong>N0</strong> ausencia de afectación ganglionar; <strong>N1 a N3</strong> afectación de un número y extensión de ganglios crecientes. <strong>M0</strong> no hay metástasis; <strong>M1 (M2)</strong> presencia de metástasis a distancia.</p>')}
{T_GRAD_EST}
{T_TNM}
{easy('TNM em 3 perguntas')}
<div class="pitfall"><b class="t">Pegadinha · gradación × estadificación</b>
<ul>
<li><strong>Gradación = histológica</strong> (o patologista olha a diferenciação). <strong>Estadificación = clínica</strong> (tamanho, linfonodos, metástase). Ela troca as palavras.</li>
<li>Os <strong>3 critérios da estadificación</strong> já caíram como "cita": tamaño de la lesión primaria · propagación a ganglios linfáticos · presencia o ausencia de metástasis.</li>
<li>No caso da mama: o <strong>T4</strong> vem de a massa estar <strong>fixa à parede torácica</strong> (extensão), não só dos 4 cm. 4 cm sozinho seria T2. Linfonodo axilar = <strong>N1</strong>; nódulos pulmonares = <strong>M1</strong>.</li>
<li>No slide, in situ = <strong>T0</strong> (nas tabelas do AJCC aparece como <strong>Tis</strong>). Use o termo do slide na prova.</li>
</ul></div>
{grid(fig('neo-60.jpg', 'Tablas TNM de colon y pulmón', 'Exemplos de TNM do Robbins: <b>carcinoma colorretal</b> e <b>câncer de pulmão</b>. Cada câncer tem a sua tabela.'))}
<div class="exam"><b class="t">Já caiu em prova · Examen Final Complementario 21/02/2024</b>
<p class="q"><strong>1.</strong> Cita: características morfológicas (microscópicas) de malignidad → <span class="a">Pleomorfismo · núcleos hipercromáticos (anisonucleosis) · mitosis atípicas · pérdida de polaridad / indiferenciación (anaplasia)</span></p>
<p class="q"><strong>6.</strong> "________ es la magnitud en que las células neoplásicas se asemejan en su función y forma a las células correspondientes del parénquima sano." → <span class="a">Diferenciación</span></p>
<p class="q">(transcrição digitada) "La falta de diferenciación se conoce como ______" → <span class="a">Anaplasia</span></p>
<p class="q"><strong>19.</strong> Una masa sólida en la pared uterina se corresponde con un leiomiosarcoma bien diferenciado. Ante este dato, podemos afirmar que se trata de una masa: a) Maligna, epitelial, no encapsulada · b) Benigna, derivada de varias capas germinales · c) Maligna, de origen mesenquimático · d) Benigna, de crecimiento lento, encapsulado → <span class="a">c) Maligna, de origen mesenquimático</span></p>
<p class="q"><strong>25.</strong> Mujer de 48 años: masa no dolorosa de 4 cm en la mama derecha, que parece fijada a la pared torácica; otra masa de 2 cm en la axila; radiografía con múltiples nódulos de 0,5 a 2 cm en ambos pulmones. ¿TNM? T1N1M0 · T2N1M0 · T4N1M1 → <span class="a">T4N1M1</span></p>
<p class="q">(transcrição digitada) Criterios usados para la estadificación de tumores → <span class="a">Tamaño de la lesión primaria · propagación a ganglios linfáticos · presencia o ausencia de metástasis</span></p>
<p class="q">(transcrição digitada) Acúmulo abundante de colágeno en neoplasia → <span class="a">Desmoplasia</span></p>
<p class="src">Fontes: Examen Final Complementario 21/02/2024 (fotos das págs. 1–4 e transcrição digitada das págs. 104–110 das provas antigas); transcrição de alunos (Clase de Anatomía Patológica). Na foto, a pergunta 25 diz "axila izquierda"; a resposta marcada pela Dra. é T4N1M1.</p>
</div>
<div class="quiz" data-quiz="neoplasias" data-label="Neoplasias"></div><button class="complete-btn" data-complete="neoplasias">✓ Marcar tema como estudiado</button><div class="topic-nav"><button class="btn" data-dir="prev"></button><span></span><button class="btn primary" data-dir="next"></button></div></div></section>'''

NAV = '<a class="nav-link" data-go="neoplasias" href="#neoplasias"><span class="nav-num">06</span>Neoplasias<span class="score"></span></a>'
CARD = ('<div class="mini-card" style="--c:#0c8059"><h4>06 · Neoplasias</h4><p>Definición, nomenclatura, mixtos y teratoma, diferenciación y anaplasia, '
        'lesiones precursoras, invasión, metástasis, gradación y TNM.</p><p style="margin-top:8px"><button class="btn primary" data-goto="neoplasias">Abrir →</button></p></div>')

# ------------------------------------------------------------------ simulado (alternativa certa = 1ª; o JS embaralha)
QUIZ = [
 {"q": "Concepto de neoplasia según el slide: masa anormal de tejido, con crecimiento excesivo y descoordinado, autónomo, causado por mutaciones adquiridas que afectan a:", "o": ["Una sola célula y a su progenie clónica", "Varias células de distintos linajes", "Todo el órgano de forma difusa", "Las células del estroma reactivo"], "e": "Neoplasia é monoclonal: uma célula e sua progênie."},
 {"q": "Acúmulo abundante de colágeno en el estroma de una neoplasia, que le da consistencia pétrea (escirro):", "o": ["Desmoplasia", "Anaplasia", "Metaplasia", "Displasia"], "e": "Já caiu no Final 21/02/2024. Exemplo do slide: carcinoma de mama."},
 {"q": "El componente que determina la clasificación y el comportamiento biológico del tumor es:", "o": ["El parénquima tumoral", "El estroma reactivo", "Los vasos sanguíneos", "Las células inmunitarias"], "e": "O estroma dá suporte e influencia velocidade e propagação; o parênquima classifica."},
 {"q": "Una masa sólida en la pared uterina se corresponde con un leiomiosarcoma bien diferenciado. Podemos afirmar que se trata de una masa:", "o": ["Maligna, de origen mesenquimático", "Maligna, epitelial, no encapsulada", "Benigna, derivada de varias capas germinales", "Benigna, de crecimiento lento, encapsulado"], "e": "Sarcoma = maligno mesenquimático. Copiada do Final 21/02/2024 (Q19)."},
 {"q": "Tumor maligno derivado del epitelio que adopta un patrón glandular:", "o": ["Adenocarcinoma", "Adenoma", "Carcinoma epidermoide", "Cistoadenoma"], "e": "Adenoma é o benigno; epidermoide imita epitélio escamoso."},
 {"q": "¿Cuál de los siguientes tumores es MALIGNO a pesar del sufijo \"-oma\"?", "o": ["Melanoma", "Leiomioma", "Condroma", "Lipoma"], "e": "Linfoma, melanoma, mesotelioma e seminoma: os quatro marcados em vermelho na tabela do slide."},
 {"q": "Tumor de glándula salival con componentes epiteliales dispersos en un estroma mixoide con islotes de cartílago, originado de un solo clon:", "o": ["Adenoma pleomorfo (tumor mixto)", "Teratoma", "Hamartoma", "Coristoma"], "e": "Tumor mixto: 1 clone, 1 capa germinal, células epiteliais e mioepiteliais."},
 {"q": "Teratoma quístico del ovario que se diferencia sobre todo de las líneas ectodérmicas, lleno de pelos y glándulas sebáceas:", "o": ["Quiste dermoide", "Struma ovarii", "Cistoadenoma papilar", "Hamartoma"], "e": "Struma ovarii é o teratoma com tecido tireoidiano."},
 {"q": "Nódulo de tejido pancreático normal en la submucosa del estómago:", "o": ["Coristoma", "Hamartoma", "Adenoma", "Teratoma"], "e": "Coristoma = resto heterotópico: tecido normal em local anormal."},
 {"q": "Masa desorganizada benigna formada por células propias del lugar afectado, por ejemplo en el pulmón:", "o": ["Hamartoma", "Coristoma", "Teratoma", "Pólipo"], "e": "Hamartoma pulmonar: cartilagem, epitélio e gordura do próprio pulmão, desorganizados."},
 {"q": "La falta de diferenciación de las células neoplásicas se conoce como:", "o": ["Anaplasia", "Displasia", "Metaplasia", "Desmoplasia"], "e": "Anaplasia = \"formar hacia atrás\", rasgo distintivo de malignidad."},
 {"q": "Relación núcleo-citoplasma típica de una célula anaplásica:", "o": ["1:1", "1:4", "1:6", "1:10"], "e": "Normal 1:4 a 1:6."},
 {"q": "Sobre las mitosis en las neoplasias, marca la correcta:", "o": ["Las figuras mitóticas atípicas y grotescas son más características de malignidad que la simple presencia de mitosis", "La presencia de mitosis indica siempre malignidad", "Los tumores benignos no presentan mitosis", "Las mitosis tripolares son frecuentes en tejidos normales"], "e": "Mitose existe em tecido normal e hiperplasia; a atípica é a que pesa."},
 {"q": "Carcinoma broncógeno que produce corticotropina y causa síndrome de Cushing. Esto refleja:", "o": ["Función nueva e imprevista de células anaplásicas (síndrome paraneoplásico)", "Buena diferenciación del tumor", "Metástasis a la hipófisis", "Hiperplasia suprarrenal primaria"], "e": "Hormônio estranho ao órgão = anaplasia → paraneoplásico."},
 {"q": "Se realiza una biopsia cervical con carcinoma in situ. El concepto de carcinoma in situ corresponde a una lesión que se caracteriza por:", "o": ["Membrana basal intacta", "Ausencia de atipia marcada", "Baja incidencia de metástasis", "Crecimiento desordenado en todo el espesor epitelial"], "e": "Final 21/02/2024 (Q17). O critério é a membrana basal intacta."},
 {"q": "Sobre la displasia, marca la INCORRECTA:", "o": ["Siempre evoluciona hacia el cáncer", "Es un crecimiento desordenado, principalmente en epitelios", "La leve o moderada puede revertir si desaparece la causa", "Presenta pleomorfismo y núcleos hipercromáticos"], "e": "Lesão precursora, mas não sempre evolui."},
 {"q": "Tumor benigno que, a diferencia de la mayoría, NO suele encapsularse:", "o": ["Hemangioma", "Lipoma", "Leiomioma", "Adenoma hepático"], "e": "Exceção do slide: hemangioma (vasos entrelaçados)."},
 {"q": "Neoplasias malignas que producen invasión temprana pero casi nunca metastatizan:", "o": ["Gliomas y carcinomas basocelulares de la piel", "Sarcomas y melanomas", "Carcinomas de ovario y de mama", "Linfomas y leucemias"], "e": "Literal do slide de metástasis."},
 {"q": "Vía más habitual de diseminación inicial de los carcinomas:", "o": ["Linfática", "Hematógena", "Siembra de cavidades", "Iatrogénica"], "e": "Carcinoma → linfática; sarcoma → hematógena."},
 {"q": "Primer ganglio de una región linfática que recibe el flujo linfático del tumor primario:", "o": ["Ganglio linfático centinela", "Ganglio regional distal", "Ganglio de Virchow", "Ganglio satélite"], "e": "É o que se biopsia para estadiar."},
 {"q": "En la diseminación hematógena con invasión venosa, los órganos más afectados son:", "o": ["Hígado y pulmones", "Cerebro y hueso", "Riñón y bazo", "Ganglios y piel"], "e": "Drenagem portal → fígado; cavas → pulmões."},
 {"q": "Masa gelatinosa en la cavidad peritoneal por carcinomas apendiculares u ováricos secretores de moco:", "o": ["Seudomixoma peritoneal", "Carcinomatosis linfática", "Absceso peritoneal", "Mesotelioma"], "e": "Siembra de cavidades por tumor mucosecretor."},
 {"q": "La gradación de un tumor se basa en:", "o": ["El grado de diferenciación de las células tumorales", "El tamaño de la lesión primaria", "La presencia de metástasis", "La afectación de ganglios linfáticos"], "e": "Gradação = histológica; as outras três são da estadificação."},
 {"q": "Mujer de 48 años: masa de 4 cm en la mama derecha fijada a la pared torácica, otra masa de 2 cm en la axila y múltiples nódulos en ambos pulmones. ¿Clasificación TNM?", "o": ["T4N1M1", "T1N1M0", "T2N1M0", "T2N0M1"], "e": "Final 21/02/2024 (Q25). T4 pela fixação à parede; N1 axila; M1 pulmões."},
 {"q": "La estadificación es clínica: verdadero o falso.", "o": ["Verdadero", "Falso"], "e": "Verdadero. A gradação é a histológica."},
]

# ------------------------------------------------------------------ acréscimos à Inflamación aguda (pptx da Clase 9)
NOTA_MED = ('<div class="callout green"><b class="t">Slide 52 completo</b>No PDF da aula alguns quadros do slide 52 ficam cortados. No arquivo original da apresentação aparecem também '
            '<b>C3a y C5a</b> e <b>LT C4, D4, E4</b> no aumento de permeabilidad, e <b>Quimiocinas (IL-8), C3a, C5a y LT B4</b> na quimiotaxia, com <b>IL-8, C5a e LT B4</b> marcados em amarelo pela Dra. A tabela acima já está completa.</div>')

FIG_INF_04 = fig('inf-04.jpg', 'Esquema general de la inflamación', 'Esquema do Robbins no slide de abertura: <b>estímulo</b> → células centinela liberam mediadores → <b>vasodilatación y ↑ permeabilidad</b> (edema) → <b>reclutamiento</b> de leucócitos → eliminação → <b>reparación</b>.')
FIG_INF_08 = fig('inf-08.jpg', 'Trastornos agudos y crónicos y sus células', 'Doenças com inflamação <b>aguda</b> (SDRA, asma, glomerulonefritis, shock séptico) e <b>crónica</b> (artritis, asma, aterosclerosis, fibrosis pulmonar) e as células de cada uma.')
FIG_INF_15 = fig('inf-15.jpg', 'Mecanismos del aumento de permeabilidad', 'Os mecanismos do ↑ de permeabilidade: <b>retracción de las células endoteliales</b> (histamina, minutos) × <b>lesión endotelial</b> (queimaduras, toxinas; rápida e prolongada). A <b>transcitosis</b> foi descrita em <b>modelos experimentales</b> (nota da Dra. no slide).')
FIG_INF_29 = fig('inf-29-marginacion.gif', 'Animación de la marginación leucocitaria', '<b>Animação do slide 29</b> (marginación): o leucócito sai do centro do fluxo, encosta no endotélio, rola, adere e atravessa a parede.')
