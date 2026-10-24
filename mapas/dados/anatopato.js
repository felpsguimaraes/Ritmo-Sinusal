/* Sinus · Mapas guiados · Anatomía Patológica I (5º semestre, UCP)
   Conteúdo montado a partir das aulas teóricas da Dra. Eliana Chamorro Krauer (Clases 1 a 7, Unidad I)
   e do banco de questões das provas antigas. Texto no idioma da aula (espanhol).

   Como escrever um mapa novo:
   - mapa:   { tipo:'mapa', centro, sub, ramas:[{ t:'Ramo', hojas:[[pista, resposta, chaves], ...] }] }
   - fluxo:  { tipo:'fluxo', pasos:[ 'texto com [[resposta::chaves]]', {f:'texto fixo'}, {end:'...'}, {note:'...', title:'...'},
               {q:'pergunta?', join:false, cols:[{l:'sí', s:[passos]}, {l:'no', s:[passos]}]} ] }
   - tabla:  { tipo:'tabla', columnas:[...], filas:[['rótulo', 'célula com [[resposta::chaves]]', ...]] }
   Chaves: "a|b" = qualquer uma serve; "a;b" = as duas precisam aparecer; "a!b" = "b" invalida a resposta.
   Escreva as chaves sem acento e em raiz ("coagul" vale para coagulativa e coagulativo). */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
window.SINUS_MAPAS.anatopato = {
  nome: 'Anatomía Patológica I',
  docente: 'Dra. Eliana Chamorro Krauer',
  fonte: 'Unidad I, clases teóricas 1 a 7 · UCP Ciudad del Este',
  modulos: [

    /* ───────────── CLASE 1 ───────────── */
    {
      id: 'proceso', clase: 'Clase 1', titulo: 'El proceso patológico y sus métodos', tipo: 'mapa', sl: [[1,3,26]],
      centro: 'Proceso patológico', sub: 'Introducción a la Anatomía Patológica',
      fuente: 'Clase 1 · Introducción a la Anatomía Patológica (Robbins cap. 2; Harsh Mohan cap. 1)',
      ramas: [
        { t: 'Etiología', hojas: [
          ['Dos grandes categorías de causas', 'Genéticas y adquiridas', 'genetic;adquirid'],
          ['Causa desconocida: se llama...', 'Idiopática', 'idiopat'],
          ['La mayoría de las enfermedades son...', 'Multifactoriales', 'multifactor|varias causas|multiples']
        ] },
        { t: 'Patogenia', hojas: [
          ['Responde a la pregunta ¿por qué? o ¿cómo?', '¿Cómo? (mecanismos bioquímicos y moleculares)', 'como|mecanism|bioquim|molecul'],
          ['Secuencia de episodios que sigue a la exposición a un agente...', 'Lesional (lesivo)', 'lesion|lesiv|noci|agresor']
        ] },
        { t: 'Cambios morfológicos', hojas: [
          ['Alteraciones estructurales observables en dos niveles', 'Macroscópico y microscópico', 'macro;micro'],
          ['Método de estudio clásico de esos cambios', 'Histopatología (anatomía patológica)', 'histopatolog|anatomia patolog|biops']
        ] },
        { t: 'Manifestaciones clínicas', hojas: [
          ['Consecuencias funcionales que percibe el paciente', 'Síntomas y signos', 'sintoma|signo'],
          ['Condicionan la evolución clínica y el...', 'Pronóstico', 'pronostic']
        ] },
        { t: 'Diagnóstico', hojas: [
          ['Fragmento de tejido de un ser vivo para estudio microscópico', 'Biopsia', 'biops'],
          ['Estudio de un cadáver: apertura de cavidades y examen de órganos', 'Necropsia (autopsia)', 'necrops|autops'],
          ['Células de superficies, cavidades o líquidos (técnica de Papanicolaou)', 'Citología', 'citolog']
        ] },
        { t: 'Ramas', hojas: [
          ['Reacciones comunes de células y tejidos ante estímulos lesivos (ej.: inflamación aguda)', 'Patología general', 'general'],
          ['Alteraciones de cada órgano en enfermedades específicas (ej.: cirrosis hepática)', 'Patología sistémica', 'sistemic']
        ] }
      ]
    },
    {
      id: 'tinciones', clase: 'Clase 1', titulo: 'Tinciones especiales', tipo: 'tabla', sl: [[1,27,42]],
      resumen: 'Qué identifica cada tinción y de qué color se ve en la lámina.',
      fuente: 'Clase 1 · Tinciones especiales (histoquímica)',
      columnas: ['Tinción', '¿Qué identifica?', 'Color'],
      filas: [
        ['Hematoxilina-eosina (H&E)', 'Hematoxilina: núcleos. Eosina: [[citoplasma::citoplasm]] y material extracelular', 'Núcleos [[azul::azul]]; citoplasma [[rosado::rosad|rosa]]'],
        ['Ácido periódico de Schiff (PAS)', '[[Glucógeno::glucog]] y mucinas', '[[Magenta::magenta|fucsia]]'],
        ['Rojo Congo (con luz polarizada)', '[[Amiloide::amiloid]]', 'Birrefringencia [[verde::verde]] manzana'],
        ['Azul de Prusia', 'Hemosiderina ([[hierro::hierro]])', '[[Azul::azul]]'],
        ['Tricrómica de Masson', '[[Colágeno::colagen]] extracelular', '[[Azul::azul]]'],
        ['Weigert', 'Fibras [[elásticas::elastic]]', '[[Negro::negro]]'],
        ['Aceite rojo O (oil red O)', '[[Lípidos::lipid|grasa]]', '[[Rojo::rojo]]'],
        ['Ziehl-Neelsen', 'Bacilos [[ácido-alcohol resistentes::alcohol|acido]] (M. tuberculosis)', '[[Rojo::rojo]]'],
        ['Gram', '[[Bacterias::bacteri]]', 'Grampositivas [[azul::azul]]; gramnegativas [[rojo::rojo]]'],
        ['Metenamina de plata', '[[Hongos::hongo|fung]] (Cryptococcus, Pneumocystis)', '[[Negro::negro]]'],
        ['Giemsa', '[[Parásitos::parasit]]', '[[Azul oscuro::azul]]']
      ]
    },

    /* ───────────── CLASE 2 ───────────── */
    {
      id: 'adaptacion', clase: 'Clase 2', titulo: 'Adaptación celular', tipo: 'mapa', sl: [[2,3,29]],
      centro: 'Adaptación celular', sub: 'respuestas REVERSIBLES al estrés',
      fuente: 'Clase 2 · Adaptación celular (Robbins cap. 2; Harsh Mohan cap. 3)',
      ramas: [
        { t: 'Hipertrofia', hojas: [
          ['En la hipertrofia, ¿qué aumenta en la célula?', 'El tamaño (no hay células nuevas)', 'tamano'],
          ['Hipertrofia fisiológica del músculo esquelético: ejemplo', 'Culturistas haciendo pesas', 'cultur|pesas|ejercicio|entren'],
          ['Hipertrofia fisiológica del útero: estímulo', 'Embarazo (estimulación estrogénica)', 'embaraz|estrogen|gestac'],
          ['Hipertrofia patológica del corazón: causa', 'HTA o válvulas defectuosas (sobrecarga crónica)', 'hta|hipertension|valvul|sobrecarga'],
          ['Mecanismo: más síntesis de proteínas y más...', 'Miofilamentos (y organelos)', 'miofilam|organel|organul']
        ] },
        { t: 'Hiperplasia', hojas: [
          ['¿En qué tejidos solo puede ocurrir?', 'En los que tienen células capaces de dividirse', 'divid|mitosis|labil|estable'],
          ['Hiperplasia fisiológica hormonal: ejemplo', 'Epitelio glandular de la mama (pubertad, embarazo, lactancia)', 'mama|mamari|endometr'],
          ['Hiperplasia compensatoria: ejemplo', 'Regeneración hepática tras hepatectomía parcial', 'hepat|higado|epidermis|medula'],
          ['Hiperplasia patológica por andrógenos: órgano', 'Próstata (hiperplasia prostática benigna)', 'prostat'],
          ['Virus que causa verrugas por hiperplasia', 'Papilomavirus (VPH)', 'papiloma|vph|hpv']
        ] },
        { t: 'Atrofia', hojas: [
          ['Organelas que disminuyen', 'Mitocondrias, miofilamentos y retículo endoplasmático rugoso', 'mitocond|miofilam|rer|reticulo'],
          ['Cite una causa de atrofia patológica', 'Desuso, desnervación, isquemia, desnutrición, falta de estímulo endocrino o presión', 'desuso|inervac|riego|isquem|desnutr|endocrin|presion|inactiv'],
          ['Vía de degradación de proteínas', 'Ubicuitina-proteosoma', 'ubicuit|proteosom'],
          ['Célula privada de nutrientes que se alimenta de sus propios componentes', 'Autofagia', 'autofag'],
          ['Pigmento marrón de la atrofia parda', 'Lipofuscina (lipocromo)', 'lipofusc|lipocrom']
        ] },
        { t: 'Metaplasia', hojas: [
          ['Un tipo celular diferenciado es... por otro que tolera mejor la agresión', 'Reemplazado (sustituido)', 'reempl|sustitu'],
          ['Metaplasia más frecuente', 'Escamosa', 'escam'],
          ['Irritación crónica de la vía respiratoria que la causa', 'Tabaquismo (o carencia de vitamina A)', 'tabaq|fum|vitamina'],
          ['Esófago de Barrett (reflujo ácido): el epitelio escamoso pasa a epitelio...', 'Cilíndrico (tipo intestinal)', 'cilindr|intestin|columnar|calicif'],
          ['Riesgo si el estímulo persiste', 'Transformación maligna', 'maligna|malignizac|cancer|carcinoma|neoplas'],
          ['Miositis osificante: se forma... en el músculo', 'Hueso', 'hueso|oseo']
        ] }
      ]
    },

    /* ───────────── CLASE 3 ───────────── */
    {
      id: 'causas', clase: 'Clase 3', titulo: 'Causas de lesión celular', tipo: 'mapa', sl: [[3,4,9]],
      centro: 'Causas de lesión celular', sub: '7 grandes grupos',
      fuente: 'Clase 3 · Lesión celular (Robbins cap. 2; Harsh Mohan cap. 1)',
      ramas: [
        { t: 'Restricción de O₂', hojas: [
          ['Carencia o deficiencia de oxígeno', 'Hipoxia', 'hipox'],
          ['Reducción del flujo sanguíneo (causa de hipoxia)', 'Isquemia', 'isquem'],
          ['Menor capacidad de transporte de O₂: cite una causa', 'Anemia o intoxicación por monóxido de carbono', 'anemia|monoxido']
        ] },
        { t: 'Agentes físicos', hojas: [
          ['Cite dos agentes físicos', 'Traumatismo, temperaturas extremas, radiación, descargas eléctricas, cambios de presión', 'trauma|temperatura|radia|descarga|electric|quemadura|presion|frio|calor']
        ] },
        { t: 'Químicos y fármacos', hojas: [
          ['Venenos en cantidades mínimas: cite uno', 'Arsénico, cianuro o sales de mercurio', 'arsenic|cianur|mercur'],
          ['Drogas ilegales y...', 'Alcohol', 'alcohol']
        ] },
        { t: 'Reacciones inmunológicas', hojas: [
          ['Contra autoantígenos endógenos', 'Enfermedades autoinmunitarias', 'autoinmun'],
          ['Contra agentes externos: cite una', 'Hipersensibilidad o reacciones alérgicas', 'hipersens|alerg']
        ] },
        { t: 'Desequilibrios nutricionales', hojas: [
          ['Por carencia: cite una', 'Carencia proteico-calórica o de vitaminas (anorexia nerviosa)', 'proteic|calor|vitamin|anorex'],
          ['Por exceso: cite una', 'Exceso de colesterol (ateroesclerosis) u obesidad', 'colesterol|ateroesc|obesid']
        ] },
        { t: 'Agentes infecciosos', hojas: [
          ['Cite los cuatro tipos', 'Bacterias, virus, hongos y parásitos', 'bacteri;virus;hongo;parasit']
        ] },
        { t: 'Alteraciones genéticas', hojas: [
          ['Anomalía cromosómica numérica: ejemplo', 'Síndrome de Down', 'down|trisomia'],
          ['Sustitución de un par de bases: ejemplo', 'Drepanocitosis (anemia de células falciformes)', 'drepano|falciform']
        ] }
      ]
    },
    {
      id: 'mecanismos', clase: 'Clase 3', titulo: 'Mecanismos de lesión celular', tipo: 'mapa', sl: [[3,10,20]],
      centro: 'Mecanismos de lesión', sub: 'sobre mitocondrias, membranas, proteínas y ADN',
      fuente: 'Clase 3 · Lesión celular, mecanismos 1 a 6',
      ramas: [
        { t: 'Disminución de ATP', hojas: [
          ['Dos formas de producir ATP', 'Fosforilación oxidativa (mitocondrias) y glucólisis anaeróbica', 'fosforilac|oxidativ;glucolis|anaerob'],
          ['Falla la bomba Na⁺/K⁺: consecuencia visible', 'Edema celular (entra Na⁺ y agua)', 'edema|tumefac|hinchaz|sodio|agua'],
          ['La glucólisis anaeróbica acumula... y baja el pH', 'Ácido láctico (y fosfatos)', 'lati|lacti|lactat'],
          ['Se desprenden del RER y baja la síntesis proteica', 'Ribosomas (disociación de polisomas)', 'ribosom|polisom']
        ] },
        { t: 'Daño mitocondrial', hojas: [
          ['Función esencial de la mitocondria', 'Producir ATP (mantener la vida celular)', 'atp|energia'],
          ['Cite una causa de daño mitocondrial', '↑Ca²⁺, ↑ERO, carencia de O₂ o mutaciones', 'calcio|ca2|ero|radicales|oxigeno|hipox|mutacion']
        ] },
        { t: 'Entrada de Ca²⁺', hojas: [
          ['Ca²⁺ libre citosólico normal, comparado con el extracelular', 'Muy bajo', 'bajo|poco|minim'],
          ['Enzimas que activa (cite una)', 'Fosfolipasas, proteasas, endonucleasas, ATPasas', 'fosfolipas|proteas|endonucleas|atpas'],
          ['También induce muerte por... (activa caspasas)', 'Apoptosis', 'apopto']
        ] },
        { t: 'Radicales libres (ERO)', hojas: [
          ['El exceso de ERO se llama', 'Estrés oxidativo', 'oxidativ'],
          ['Lesión al restablecer el flujo sanguíneo', 'Isquemia-reperfusión', 'reperfus'],
          ['Moléculas que atacan (cite dos)', 'Proteínas, lípidos, hidratos de carbono, ácidos nucleicos', 'proteina|lipid|hidrato|carbohidrat|nucleic|adn']
        ] },
        { t: 'Permeabilidad de membranas', hojas: [
          ['Su aumento es característico de la lesión que lleva a...', 'Necrosis', 'necros'],
          ['Membranas más dañadas (cite dos)', 'Mitocondriales, plasmática y lisosómicas', 'mitocond|plasmatic|lisosom']
        ] },
        { t: 'Daño del ADN y proteínas', hojas: [
          ['Si el daño es demasiado grave, la célula inicia...', 'Apoptosis (suicidio programado)', 'apopto|suicid'],
          ['Las proteínas mal plegadas generan estrés del...', 'Retículo endoplasmático (RE)', 'reticulo|endoplasm']
        ] }
      ]
    },
    {
      id: 'flujo_lesion', clase: 'Clases 3 y 4', titulo: 'De la lesión reversible a la muerte celular', tipo: 'fluxo', sl: [[3,21,26],[4,3,5]],
      resumen: 'Sigue la secuencia de eventos de una lesión por hipoxia hasta el punto de no retorno.',
      fuente: 'Clase 3 · Lesión celular reversible; Clase 4 · Muerte celular',
      pasos: [
        { f: 'Célula normal (homeostasia) frente a un estrés' },
        'Si el estímulo es leve o transitorio, responde con [[adaptación::adaptac]] celular',
        { f: 'Se superan los límites de la adaptación → LESIÓN CELULAR' },
        'Hipoxia / isquemia → ↓ fosforilación oxidativa → ↓ [[ATP::atp]]',
        'Falla la bomba Na⁺/K⁺: entra [[sodio::sodio|na+|na⁺]] y agua → [[edema celular::edema|tumefac|hidropic]]',
        'Glucólisis anaeróbica → ↑ [[ácido láctico::lati|lacti]] → ↓ pH intracelular',
        { q: '¿Cesa el estímulo lesivo a tiempo?', join: false, cols: [
          { l: 'sí', s: [
            'Lesión [[reversible::revers!irrevers]]: la célula recupera su estado normal',
            'Dos rasgos al microscopio: [[edema celular::edema|tumefac]] y [[cambio graso::graso|esteatosis]]'
          ] },
          { l: 'no', s: [
            'Tres fenómenos de irreversibilidad: función de las [[mitocondrias::mitocond]], estructura de las [[membranas::membran]] y del [[ADN::adn|cromatina]]',
            'Entra [[calcio::calci]] → fosfolipasas dañan la membrana plasmática (el fenómeno más importante)',
            'Las proteasas dañan el [[citoesqueleto::citoesquel]]; las endonucleasas, el [[núcleo::nucle]]',
            { end: 'Muerte celular: [[necrosis::necros]] (accidental) o [[apoptosis::apopto]] (programada)' }
          ] }
        ] }
      ]
    },

    /* ───────────── CLASE 4 ───────────── */
    {
      id: 'patrones_necrosis', clase: 'Clase 4', titulo: 'Patrones de necrosis', tipo: 'mapa', sl: [[4,14,31]],
      centro: 'Necrosis', sub: 'seis patrones morfológicos',
      fuente: 'Clase 4 · Necrosis (Robbins cap. 2, pág. 34 en la 10ª ed.)',
      ramas: [
        { t: 'Coagulativa', hojas: [
          ['Estado de la arquitectura del tejido muerto durante algunos días', 'Preservada', 'preserv|conserv|mantien|intacta'],
          ['La desnaturalización de proteínas bloquea la... de las células muertas', 'Proteólisis', 'proteolis'],
          ['La isquemia la causa en todos los órganos excepto en el', 'Encéfalo', 'encefal|cerebr'],
          ['Área localizada de necrosis coagulativa (forma de cuña)', 'Infarto', 'infart']
        ] },
        { t: 'Licuefactiva', hojas: [
          ['El tejido se transforma en una masa...', 'Viscosa líquida', 'liquid|viscos'],
          ['Infecciones en las que ocurre', 'Bacterianas focales (a veces fúngicas)', 'bacteri|fung|hongo'],
          ['Material necrótico amarillento y pastoso', 'Pus', 'pus'],
          ['Muerte por hipoxia en el sistema nervioso central', 'Infarto cerebral', 'cerebr|encefal|snc']
        ] },
        { t: 'Gangrenosa', hojas: [
          ['Gangrena seca: tipo de necrosis', 'Coagulativa', 'coagul'],
          ['Gangrena húmeda (sobreinfección bacteriana): tipo de necrosis', 'Licuefactiva', 'licue|liquef|colicuat'],
          ['Localización más habitual', 'Extremidades, sobre todo las inferiores', 'extremid|pierna|miembro|pie']
        ] },
        { t: 'Caseosa', hojas: [
          ['Infección más habitual', 'Tuberculosis', 'tubercul'],
          ['Aspecto macroscópico', 'Similar al queso: friable, blanquecino-amarillento', 'queso|friab|blanquec'],
          ['Borde inflamatorio que la rodea', 'Granuloma', 'granulom'],
          ['Células gigantes multinucleadas del granuloma', 'Langhans', 'langhans']
        ] },
        { t: 'Grasa (enzimática)', hojas: [
          ['Enfermedad típica', 'Pancreatitis aguda', 'pancreatit'],
          ['Enzimas que licúan las membranas de las células grasas', 'Lipasas pancreáticas', 'lipasa'],
          ['Ácidos grasos + calcio forman áreas blanquecinas: ... de grasas', 'Saponificación', 'sapon|jabon']
        ] },
        { t: 'Fibrinoide', hojas: [
          ['Ocurre en reacciones... que afectan los vasos', 'Inmunitarias', 'inmun'],
          ['Depósito en las paredes arteriales de complejos...', 'Antígeno-anticuerpo (inmunocomplejos)', 'antigeno|anticuerpo|inmunocomplej'],
          ['Ejemplo en arteriolas', 'Hipertensión maligna (o vasculitis)', 'hipertension|vasculitis|autoinmun']
        ] }
      ]
    },
    {
      id: 'infarto', clase: 'Clase 4', titulo: 'Infarto de miocardio: secuencia histológica', tipo: 'fluxo', sl: [[4,15,19]],
      resumen: 'Pregunta clásica de prova: el orden de lo que se ve al microscopio.',
      fuente: 'Clase 4 · Necrosis coagulativa; banco de preguntas de pruebas anteriores',
      pasos: [
        { f: 'Obstrucción de una arteria coronaria' },
        'La causa más común es la [[ateroesclerosis::ateroesc|aterosc]] de las arterias coronarias',
        'Primeras horas: necrosis [[coagulativa::coagul]]',
        'Después: infiltrado [[neutrofílico::neutrofil]]',
        'Luego: tejido de [[granulación::granulac]]',
        { end: 'Finalmente: [[fibrosis::fibrosis|cicatriz]] (cicatrización definitiva)' }
      ]
    },

    /* ───────────── CLASES 4 y 5 ───────────── */
    {
      id: 'necro_vs_apopto', clase: 'Clases 4 y 5', titulo: 'Necrosis frente a apoptosis', tipo: 'tabla', sl: [[4,6,8],[5,3,7]],
      resumen: 'El cuadro comparativo que más se pregunta.',
      fuente: 'Clase 4 · Muerte celular; Clase 5 · Apoptosis',
      columnas: ['Característica', 'Necrosis', 'Apoptosis'],
      filas: [
        ['Naturaleza', '[[Accidental::acident]], NO regulada', 'Muerte celular [[programada::program]], regulada por vías genéticas'],
        ['Papel', 'Siempre [[patológica::patolog]]', 'Puede ser [[fisiológica::fisiolog]] o patológica'],
        ['Causas típicas', 'Isquemia, toxinas, [[infecciones::infecc]], traumatismos', 'ADN o proteínas dañados más allá de la [[reparación::repara]]'],
        ['Tamaño de la célula', 'La célula se [[hincha::hinch|edema|tumef|aument]]', 'La célula se [[retrae::retra|encoge|reduce|disminu]]'],
        ['Membrana plasmática', 'Se [[rompe::romp|ruptur|pierde|integridad]]', 'Permanece [[intacta::intact|integra]]'],
        ['Núcleo', 'Picnosis, [[cariorrexis::cariorr]] y cariólisis', '[[Condensación de la cromatina::condensac|cromatin]] y fragmentación'],
        ['Mediadores', 'Enzimas [[lisosómicas::lisosom]] digieren la célula', '[[Caspasas::caspasa]]'],
        ['Contenido celular', '[[Escapa::escap|sale|extravas|liber]] al medio extracelular', 'Se empaqueta en [[cuerpos apoptósicos::cuerpo|apopt]]'],
        ['Inflamación', '[[Sí::si|hay|produce]] provoca reacción inflamatoria', '[[No::no]] provoca reacción inflamatoria'],
        ['Eliminación de restos', 'Enzimas y fagocitosis por leucocitos; puede [[calcificarse::calcific]]', '[[Fagocitosis::fagocit]] rápida por macrófagos']
      ]
    },

    /* ───────────── CLASE 5 ───────────── */
    {
      id: 'apoptosis_vias', clase: 'Clase 5', titulo: 'Apoptosis: las dos vías', tipo: 'fluxo', sl: [[5,8,12]],
      resumen: 'Dos vías distintas convergen en la activación de caspasas.',
      fuente: 'Clase 5 · Apoptosis, mecanismos',
      pasos: [
        { f: 'Señal de muerte celular' },
        { cols: [
          { l: 'Vía intrínseca (mitocondrial)', s: [
            'Lesión: [[daño del ADN::adn]], falta de factor de crecimiento o proteínas mal plegadas',
            'Las proteínas proapoptóticas [[BAX y BAK::bax|bak]] superan a las antiapoptóticas BCL2',
            '↑ permeabilidad mitocondrial: sale [[citocromo c::citocromo]] al citoplasma',
            'Se activa la caspasa iniciadora [[9::9|nueve]]'
          ] },
          { l: 'Vía extrínseca (receptores de muerte)', s: [
            'Un ligando se une a un receptor de muerte: [[Fas (CD95)::fas|cd95]] o receptor de [[TNF::tnf]] tipo 1',
            'El receptor recluta proteínas [[adaptadoras::adaptad]] con dominio de muerte',
            'Se activa la caspasa iniciadora [[8::8|ocho|10|diez]]'
          ] }
        ], join: true },
        'Las caspasas [[ejecutoras::ejecut]] degradan el ADN, fragmentan el núcleo y desorganizan el [[citoesqueleto::citoesquel]]',
        'La célula se fragmenta en [[cuerpos apoptósicos::cuerpo|apopt]]',
        { end: '[[Fagocitosis::fagocit]] por macrófagos: NO hay [[inflamación::inflama]]' }
      ]
    },
    {
      id: 'apoptosis_mapa', clase: 'Clase 5', titulo: 'Apoptosis: dónde ocurre y cómo se ve', tipo: 'mapa', sl: [[5,3,7],[5,13,15]],
      centro: 'Apoptosis', sub: 'muerte celular programada',
      fuente: 'Clase 5 · Apoptosis y necroptosis',
      ramas: [
        { t: 'Situaciones fisiológicas', hojas: [
          ['Destrucción de células durante la...', 'Embriogénesis', 'embriog'],
          ['Involución de tejidos dependientes de hormonas: ejemplo', 'Atresia folicular en la menopausia, regresión de la mama tras el destete, ciclo menstrual', 'menopaus|atresia|destete|mama|menstru|endometri'],
          ['Se eliminan linfocitos... potencialmente nocivos', 'Autorreactivos', 'autorreact|autoreact']
        ] },
        { t: 'Situaciones patológicas', hojas: [
          ['Afectación del ADN: cite una causa', 'Radiación, fármacos antitumorales o hipoxia', 'radia|antitumor|quimio|hipox'],
          ['Proteínas mal plegadas: enfermedades degenerativas del...', 'Sistema nervioso central', 'nervioso|snc|neurodegener|cerebr'],
          ['Infecciones virales (cite una)', 'Adenovirus, VIH, hepatitis', 'adenovir|vih|hiv|hepatit']
        ] },
        { t: 'Morfología', hojas: [
          ['Principal característica', 'Condensación de la cromatina', 'condensac|cromatin'],
          ['Tamaño y citoplasma de la célula', 'Retracción: más pequeña, citoplasma denso', 'retrac|pequen|densa|encog'],
          ['Fragmentos rodeados de membrana', 'Cuerpos apoptósicos', 'cuerpo|apopt'],
          ['En H&E el citoplasma es intensamente...', 'Eosinófilo', 'eosinofil']
        ] },
        { t: 'Mecanismo', hojas: [
          ['Enzimas cuya activación desencadena todo', 'Caspasas', 'caspasa'],
          ['Dos fases', 'Iniciación y ejecución', 'inicia;ejecu'],
          ['Vía principal', 'Intrínseca (mitocondrial)', 'intrinsec|mitocond'],
          ['Familia de proteínas que regula el equilibrio pro y antiapoptótico', 'BCL2', 'bcl']
        ] },
        { t: 'Necroptosis', hojas: [
          ['Morfología y bioquímica semejantes a la...', 'Necrosis', 'necros'],
          ['Mecánica semejante a la apoptosis, pero SIN activación de...', 'Caspasas', 'caspasa'],
          ['Proteínas del necrosoma', 'RIP1 y RIP3', 'rip']
        ] }
      ]
    },

    /* ───────────── CLASE 6 ───────────── */
    {
      id: 'acumulaciones', clase: 'Clase 6', titulo: 'Acumulaciones intracelulares: mecanismos y lípidos', tipo: 'mapa', sl: [[6,3,6],[6,20,21]],
      centro: 'Acumulaciones intracelulares', sub: 'manifestación de alteraciones metabólicas',
      fuente: 'Clase 6 · Acumulaciones celulares (Robbins cap. 2, pág. 61)',
      ramas: [
        { t: 'Cuatro mecanismos', hojas: [
          ['Eliminación inadecuada de una sustancia normal: ejemplo', 'Esteatosis hepática', 'esteatosis|higado graso|graso'],
          ['Sustancia endógena anómala: mutaciones de...', 'α1-antitripsina', 'antitripsina|alfa'],
          ['Falta de degradación de un metabolito (carencias enzimáticas)', 'Tesaurismosis (enfermedades por almacenamiento)', 'tesaurismosis|almacenamiento|deposito'],
          ['Sustancia exógena anómala: ejemplo', 'Carbono o sílice', 'carbono|silice|antracosis|polvo']
        ] },
        { t: 'Lípidos', hojas: [
          ['Clases que se acumulan (cite dos)', 'Triglicéridos, colesterol/ésteres de colesterol y fosfolípidos', 'trigliceri|colesterol|fosfolipid'],
          ['Los fosfolípidos forman figuras de... en células necróticas', 'Mielina', 'mielina']
        ] },
        { t: 'Colesterol', hojas: [
          ['Procesos con acumulación de colesterol (cite dos)', 'Ateroesclerosis, xantomas, colesterolosis, Niemann-Pick', 'ateroesc|xantoma|colesterolosis|niemann'],
          ['Macrófagos cargados de colesterol', 'Células espumosas', 'espumos'],
          ['Acumulación focal en la lámina propia de la vesícula (patrón en fresa)', 'Colesterolosis', 'colesterolosis'],
          ['Agregados de células espumosas en piel y tendones', 'Xantomas', 'xantoma']
        ] },
        { t: 'Ateroma', hojas: [
          ['Lesión elevada de la íntima', 'Ateroma (placa ateromatosa)', 'ateroma|placa'],
          ['Núcleo lipídico cubierto por una cubierta...', 'Fibrosa', 'fibros'],
          ['Imagen negativa que dejan los ésteres de colesterol en los cortes', 'Hendiduras (agujas) de colesterol', 'hendidura|aguja']
        ] }
      ]
    },
    {
      id: 'ateroesclerosis', clase: 'Clase 6', titulo: 'Ateroesclerosis', tipo: 'mapa', sl: [[6,7,19]],
      centro: 'Ateroesclerosis', sub: 'lesión de la íntima arterial',
      fuente: 'Clase 6 · Ateroesclerosis (Robbins cap. 11)',
      ramas: [
        { t: 'Factores de riesgo', hojas: [
          ['Lipoproteína del "colesterol malo"', 'LDL', 'ldl|baja densidad'],
          ['Lipoproteína del "colesterol bueno"', 'HDL', 'hdl|alta densidad'],
          ['No modificables (cite dos)', 'Anomalías genéticas, antecedentes familiares, edad avanzada, sexo masculino', 'genetic|familiar|edad|sexo|masculin'],
          ['Modificables (cite dos)', 'Hiperlipidemia, HTA, tabaquismo, diabetes o síndrome metabólico, inflamación', 'hiperlip|colesterol|hta|hipertension|tabaq|diabet|metabolico|inflama']
        ] },
        { t: 'Patogenia', hojas: [
          ['Respuesta de la pared arterial tras la lesión endotelial', 'Inflamación crónica y cicatrización', 'inflama|cicatriz'],
          ['Células que interactúan (cite dos)', 'Macrófagos, linfocitos T, células endoteliales disfuncionales, células musculares lisas', 'macrofag|linfocito|endotel|muscul']
        ] },
        { t: 'Morfología', hojas: [
          ['Manchas amarillas planas: lesión inicial', 'Estrías grasas', 'estria'],
          ['Componentes de la placa (cite uno)', 'Células, matriz extracelular y núcleo necrótico con lípidos', 'celula|matriz|nucleo|lipid'],
          ['Cubierta fibrosa delgada y muchos lípidos', 'Placa vulnerable (riesgo de rotura)', 'vulnerable|inestable'],
          ['Cubierta de colágeno denso y mínima inflamación', 'Placa estable', 'estable']
        ] },
        { t: 'Cambios agudos', hojas: [
          ['Rotura, ulceración o erosión con formación de...', 'Trombos', 'trombo'],
          ['Liberación de residuos de la placa al torrente circulatorio', 'Ateroembolia', 'ateroembol|embol'],
          ['Pérdida de tejido elástico de la media', 'Aneurismas', 'aneurism']
        ] },
        { t: 'Consecuencias', hojas: [
          ['Arterias coronarias: ... de miocardio', 'Infarto', 'infart'],
          ['Obstrucción de arterias que irrigan el cerebro', 'ACV (infarto cerebral)', 'acv|ictus|apoplej|infarto|accidente'],
          ['Enfermedad vascular periférica: gangrena de las...', 'Piernas', 'pierna|miembro|extremid']
        ] }
      ]
    },

    /* ───────────── CLASE 7 ───────────── */
    {
      id: 'proteinas', clase: 'Clase 7', titulo: 'Acumulación de proteínas y amiloidosis', tipo: 'mapa', sl: [[7,3,16]],
      centro: 'Acumulación de proteínas', sub: 'gotículas, inclusiones y agregados',
      fuente: 'Clase 7 · Acumulaciones celulares: proteínas (Robbins cap. 2 y 6)',
      ramas: [
        { t: 'Gotículas e Ig', hojas: [
          ['Gotículas rosadas en el túbulo proximal renal: se asocian a...', 'Proteinuria (reversible)', 'proteinuri'],
          ['Inclusiones eosinófilas en plasmocitos (exceso de Ig)', 'Cuerpos de Russell', 'russell']
        ] },
        { t: 'Defecto de transporte', hojas: [
          ['Deficiencia de...: agregados en el RE de los hepatocitos', 'α1-antitripsina', 'antitripsina'],
          ['Consecuencia pulmonar de la carencia de la enzima', 'Enfisema', 'enfisema']
        ] },
        { t: 'Citoesqueleto', hojas: [
          ['Filamentos de queratina en la hepatopatía alcohólica', 'Hialina de Mallory', 'mallory|hialina'],
          ['Alzheimer: ... neurofibrilares', 'Ovillos', 'ovillo'],
          ['Inclusiones de α-sinucleína', 'Cuerpos de Lewy', 'lewy']
        ] },
        { t: 'Amiloidosis', hojas: [
          ['Tinción de elección', 'Rojo Congo', 'congo'],
          ['Con luz polarizada: birrefringencia...', 'Verde manzana', 'verde'],
          ['Primaria (AL): proliferación clonal de células plasmáticas; enfermedad asociada', 'Mieloma múltiple', 'mieloma'],
          ['Secundaria (AA): complicación de un proceso... crónico', 'Inflamatorio (artritis reumatoide, enfermedad inflamatoria intestinal)', 'inflama|artritis|crohn|colitis'],
          ['Proteína amiloide β: enfermedad', 'Alzheimer', 'alzheimer'],
          ['Órgano principal de la amiloidosis senil', 'Corazón', 'corazon|cardiac'],
          ['Órgano más afectado, y más grave', 'Riñón', 'rinon|renal']
        ] }
      ]
    },
    {
      id: 'calcificacion', clase: 'Clase 7', titulo: 'Calcificación patológica', tipo: 'tabla', sl: [[7,17,24]],
      resumen: 'Distrófica y metastásica, lado a lado.',
      fuente: 'Clase 7 · Calcificación patológica',
      columnas: ['', 'Calcificación distrófica', 'Calcificación metastásica'],
      filas: [
        ['¿Dónde se deposita?', 'Tejidos [[lesionados o muertos::lesion|muert|necro]]', 'Tejidos [[normales::normal]]'],
        ['Calcemia', '[[Normal::normal]]', '[[Hipercalcemia::hipercalc|elevad|alta|aument]]'],
        ['Reversibilidad', 'Generalmente [[irreversible::irrevers]]', '[[Reversible::revers!irrevers]] si se corrige el trastorno'],
        ['Sitios típicos', 'Áreas de necrosis, [[ateromas::ateroma]], válvulas cardíacas dañadas', 'Mucosa gástrica, [[riñones::rinon|renal]], pulmones, arterias sistémicas'],
        ['Causas', 'Proteínas desnaturalizadas se unen a [[fosfato::fosfato]] y este al calcio', '↑ [[PTH::pth|paratiroid]], resorción ósea, exceso de [[vitamina D::vitamina|vit]], insuficiencia renal crónica'],
        ['Aspecto en H&E', '[[Basófilo::basofil]], granular y amorfo', 'Depósitos amorfos o cristales de [[hidroxiapatita::hidroxiapatit]]'],
        ['Cuerpos de psamoma', 'Capas concéntricas como granos de arena: cuerpos de [[psamoma::psamom]] (carcinoma papilar de tiroides)', '—']
      ]
    },

    /* ───────────── CASOS CLÍNICOS (nível de prova) ───────────── */
    {
      id: 'casos_lesion', clase: 'Clases 2 a 7', titulo: 'Casos clínicos: adaptación, lesión, muerte y acumulaciones', tipo: 'casos',
      resumen: 'Preguntas de repaso de las clases y casos de aplicación. Hay que razonar, no solo recordar.',
      fuente: 'Preguntas de repaso de las clases 2 a 5 (Dra. Chamorro) y casos construidos con el contenido de las clases 6 y 7',
      casos: [
        ['Autopsia de un hombre de 84 años: el corazón es pequeño (250 g) y de color marrón oscuro al corte. En la microscopía hay pigmento marrón claro perinuclear (H&E) en las fibras musculares cardíacas.',
         '¿Qué es el pigmento y qué proceso adaptativo representa?',
         'Lipofuscina (lipocromo): atrofia parda', 'lipofusc|lipocrom;atrofia|parda',
         'La lipofuscina son restos de autofagia que dan color marrón al tejido. La atrofia reduce el tamaño de la célula y del órgano.'],
        ['Hombre de 43 años con dolor urente subesternal después de las comidas desde hace 3 años. La endoscopia no muestra masas ni úlceras. Las biopsias del esófago inferior (3 cm por encima de la unión gastroesofágica) muestran epitelio columnar con células caliciformes.',
         '¿Qué alteración de la mucosa representan estos hallazgos?',
         'd) Metaplasia intestinal', 'd',
         'El reflujo ácido crónico reemplaza el epitelio escamoso por epitelio cilíndrico de tipo intestinal (esófago de Barrett). Es reversible, pero si el estímulo persiste puede haber transformación maligna.',
         ['a) Displasia escamosa', 'b) Hiperplasia patológica', 'c) Isquemia transitoria', 'd) Metaplasia intestinal']],
        ['Mujer gestante de 28 semanas: el útero aumentó mucho de tamaño por la estimulación estrogénica.',
         '¿Qué adaptación predomina y es fisiológica o patológica?',
         'Hipertrofia de las fibras musculares lisas (con hiperplasia asociada); fisiológica', 'hipertrofia;fisiolog',
         'Aumenta el tamaño de las células por más proteínas y miofilamentos. La hipertrofia suele acompañarse de hiperplasia, y aquí es una respuesta fisiológica hormonal.'],
        ['Paciente con neumonía grave y saturación de O₂ de 86%.',
         'Explique cómo la hipoxia llega a producir edema celular.',
         '↓ O₂ → ↓ fosforilación oxidativa → ↓ ATP → falla la bomba Na⁺/K⁺ → entran Na⁺ y agua → edema celular', 'atp;bomba|sodio|na+|na⁺;edema|tumefac|hinchaz|agua',
         'Además, la glucólisis anaeróbica acumula ácido láctico y baja el pH. El edema es la primera manifestación de casi todas las formas de lesión.'],
        ['En una célula con lesión grave aumenta el calcio citosólico.',
         'Nombre tres enzimas que se activan y el daño que produce cada una.',
         'Fosfolipasas (membrana), proteasas (citoesqueleto) y endonucleasas (núcleo)', 'fosfolipas;proteas;endonucleas',
         'También se activan ATPasas, y el calcio induce apoptosis al activar caspasas y aumentar la permeabilidad mitocondrial.'],
        ['Algunas bacterias producen toxinas que dañan las mitocondrias de las células del huésped.',
         '¿Qué consecuencia tiene para la célula?',
         'Falla la fosforilación oxidativa y cae el ATP; si el daño es irreversible, muerte celular (necrosis, o apoptosis)', 'atp|fosforilac;necros|apopto|muerte',
         'Las mitocondrias son fundamentales en todas las vías de lesión y muerte celular: su disfunción es uno de los tres fenómenos de irreversibilidad.'],
        ['Hombre de 79 años con un gran infarto de miocardio de la pared libre del ventrículo izquierdo. Desarrolla insuficiencia cardíaca congestiva y, un año después, la ecocardiografía muestra un aneurisma del ventrículo izquierdo.',
         '¿Qué prueba sérica indicaría mejor mala perfusión tisular periférica?',
         'c) Ácido láctico elevado', 'c',
         'Con mala perfusión hay hipoxia y la glucólisis anaeróbica produce ácido láctico. La troponina I indica necrosis miocárdica, no perfusión periférica.',
         ['a) Troponina I elevada', 'b) Aumento de sodio', 'c) Ácido láctico elevado', 'd) Aumento de la glucosa']],
        ['Paciente de 65 años con diabetes de larga data y tratamiento irregular con insulina. Consulta porque la planta del pie empezó a oscurecerse y perdió la sensibilidad.',
         '¿Qué tipo de necrosis tiene? ¿Cómo cambia si se sobreinfecta con bacterias?',
         'Gangrena seca (necrosis coagulativa); con sobreinfección pasa a gangrena húmeda (necrosis licuefactiva)', 'gangrena;seca|coagul;humeda|licuef|licue|liquef',
         'La gangrena no es un patrón específico: es necrosis de una extremidad que perdió la irrigación. Las enzimas de bacterias y leucocitos la vuelven licuefactiva.'],
        ['Varón de 58 años que ingresa con dolor torácico en reposo y elevación del segmento ST en el ECG: infarto agudo de miocardio.',
         '¿Qué patrón de necrosis hay y cómo se llama el área localizada?',
         'Necrosis coagulativa; infarto', 'coagul;infart',
         'La isquemia por obstrucción de un vaso produce necrosis coagulativa en todos los órganos salvo el encéfalo. Se conserva la arquitectura por desnaturalización de proteínas.'],
        ['En una lesión, el centro es un área necrótica rosada y acelular rodeada por células gigantes de Langhans, células epitelioides y linfocitos.',
         '¿Qué tipo de necrosis hay en el centro y qué infección es típica?',
         'Necrosis caseosa; tuberculosis', 'caseos;tubercul',
         'Es un granuloma: la arquitectura del tejido se borra por completo y el aspecto es de queso, friable y blanquecino-amarillento.'],
        ['Paciente que sufrió una "apoplejía": pérdida focal del suministro de sangre en una parte del cerebro.',
         '¿Qué patrón de necrosis esperaría y por qué es la excepción a la regla de la isquemia?',
         'Necrosis licuefactiva: en el encéfalo la isquemia no produce necrosis coagulativa', 'licuef|licue|liquef;encefal|cerebr|nervioso|snc',
         'El infarto cerebral se resuelve con espacios quísticos a medida que se elimina el tejido necrótico.'],
        ['En la artritis reumatoidea, la lesión granulomatosa presenta en el centro...',
         '¿Qué patrón de necrosis es?',
         'Necrosis fibrinoide', 'fibrinoid',
         'Aparece en reacciones inmunitarias que afectan a los vasos: depósito de complejos antígeno-anticuerpo y fibrina, de aspecto rosado y amorfo.'],
        ['Mujer de 48 años con un linfoma maligno en ganglios paraaórticos. Recibe quimioterapia que provoca la pérdida de células neoplásicas por fragmentación de los núcleos y del citoplasma de células individuales. A los 2 meses el linfoma disminuyó de tamaño.',
         '¿Por qué mecanismo respondió principalmente su neoplasia?',
         'd) Apoptosis', 'd',
         'La apoptosis se activa cuando el ADN se daña más allá de la reparación. Fragmenta la célula en cuerpos apoptósicos, sin inflamación.',
         ['a) Necrosis coagulativa', 'b) Envenenamiento mitocondrial', 'c) Fagocitosis', 'd) Apoptosis']],
        ['Hombre con consumo crónico de alcohol. La biopsia hepática muestra vacuolas de grasa y, en los hepatocitos, inclusiones citoplásmicas eosinófilas.',
         '¿Qué inclusión es, de qué está hecha y qué alteración de grasa acompaña?',
         'Hialina de Mallory (filamentos intermedios de queratina); esteatosis', 'mallory|hialina;queratina;esteatosis|graso',
         'La esteatosis es una acumulación reversible de triglicéridos. La hialina alcohólica es propia de la hepatopatía alcohólica.'],
        ['Paciente con mieloma múltiple. En una biopsia se ven depósitos extracelulares rosa pálido, homogéneos y amorfos.',
         '¿Qué tinción lo confirma y qué se ve con luz polarizada?',
         'Rojo Congo; birrefringencia verde manzana (amiloidosis AL)', 'congo;verde',
         'La amiloidosis primaria viene de la proliferación clonal de células plasmáticas (cadena ligera). Siempre es extracelular y no provoca inflamación.'],
        ['Paciente con insuficiencia renal crónica e hipercalcemia. Hay depósitos de calcio en el pulmón y en la mucosa gástrica, tejidos que estaban normales.',
         '¿Qué tipo de calcificación es y se puede revertir?',
         'Calcificación metastásica; reversible si se corrige el trastorno metabólico', 'metastas;revers!irrevers',
         'La distrófica, en cambio, ocurre en tejido lesionado con calcemia normal y suele ser irreversible.']
      ]
    },

    /* ───────────── NIVEL 3: SIMULADO ───────────── */
    {
      id: 'simulado_anato', clase: 'Clases 1 a 7', titulo: 'Simulado de prueba: Anatomía Patológica I (Unidad I)', tipo: 'casos', cronometro: true,
      resumen: 'Preguntas de opción múltiple como en la prueba. Use el cronómetro y corrija al final.',
      fuente: 'Contenido de las clases 1 a 7 (Dra. Chamorro): tinciones, adaptaciones, lesión y muerte celular, acumulaciones y calcificación',
      casos: [
        ['',
         'Para demostrar amiloide en un corte se usa Rojo Congo. ¿Qué se observa con luz polarizada?',
         'c) Birrefringencia verde manzana', 'c',
         'El amiloide teñido con Rojo Congo muestra birrefringencia verde con luz polarizada (Clase 1, tinciones especiales).',
         ['a) Fluorescencia roja intensa', 'b) Color negro por impregnación de plata', 'c) Birrefringencia verde manzana', 'd) Gránulos azules de hierro']],
        ['Un patólogo sospecha tuberculosis en un ganglio linfático.',
         '¿Qué tinción especial identifica los bacilos ácido-alcohol-resistentes?',
         'a) Ziehl-Neelsen', 'a',
         'Ziehl-Neelsen tiñe de rojo los bacilos ácido-alcohol-resistentes (Mycobacterium tuberculosis, M. avium).',
         ['a) Ziehl-Neelsen', 'b) Gram', 'c) Azul de Prusia', 'd) Tricrómica de Masson']],
        ['En la biopsia de un paciente inmunodeprimido se sospecha una infección por Pneumocystis jiroveci.',
         '¿Qué tinción usaría para demostrar el hongo?',
         'd) Metenamina de plata', 'd',
         'La metenamina de plata tiñe hongos de negro (Cryptococcus, Pneumocystis).',
         ['a) Giemsa', 'b) Aceite rojo O', 'c) Azul de metileno', 'd) Metenamina de plata']],
        ['Se estudia un depósito de pigmento marrón-dorado en el hígado.',
         '¿Qué tinción confirma que es hemosiderina (hierro)?',
         'b) Azul de Prusia', 'b',
         'El azul de Prusia tiñe de azul la hemosiderina y el hierro.',
         ['a) Sudán negro B', 'b) Azul de Prusia', 'c) Orceína', 'd) Mucicarmín']],
        ['Un culturista aumenta su masa muscular con el entrenamiento; las fibras son más gruesas pero no hay fibras nuevas.',
         '¿Cuál es la adaptación celular?',
         'a) Hipertrofia fisiológica', 'a',
         'La hipertrofia aumenta el tamaño de las células por más proteínas y organelas, sin nuevas células. En el músculo esquelético por aumento de la demanda funcional es fisiológica.',
         ['a) Hipertrofia fisiológica', 'b) Hiperplasia fisiológica', 'c) Metaplasia', 'd) Hipertrofia patológica']],
        ['Un paciente con hipertensión arterial no controlada presenta una pared ventricular izquierda engrosada.',
         '¿Por qué el miocardio responde con hipertrofia y no con hiperplasia?',
         'd) Los miocitos cardíacos son células con capacidad de división limitada o nula', 'd',
         'La hiperplasia solo ocurre en tejidos con células capaces de dividirse; las células permanentes (músculo cardíaco) aumentan su masa solo por hipertrofia.',
         ['a) Porque el corazón no responde a factores de crecimiento', 'b) Porque la hiperplasia solo ocurre con infecciones virales', 'c) Porque las células cardíacas son células lábiles', 'd) Los miocitos cardíacos son células con capacidad de división limitada o nula']],
        ['Mujer de 40 años con sangrado menstrual anómalo. La biopsia muestra glándulas endometriales aumentadas en número, con estroma denso.',
         '¿Qué proceso explica el hallazgo?',
         'b) Hiperplasia patológica por exceso de estrógenos', 'b',
         'La hiperplasia endometrial es una respuesta patológica a aumentos absolutos o relativos de estrógenos y puede asociarse a sangrado anómalo.',
         ['a) Atrofia por falta de estímulo hormonal', 'b) Hiperplasia patológica por exceso de estrógenos', 'c) Metaplasia escamosa', 'd) Hipertrofia fisiológica por el embarazo']],
        ['Un paciente con reflujo gastroesofágico crónico tiene epitelio columnar con células caliciformes en el esófago distal.',
         '¿Cómo se llama este cambio?',
         'c) Metaplasia (esófago de Barrett)', 'c',
         'Metaplasia es el cambio reversible de un tipo celular diferenciado por otro; aquí el escamoso es sustituido por cilíndrico por el estímulo del reflujo.',
         ['a) Displasia escamosa', 'b) Hiperplasia', 'c) Metaplasia (esófago de Barrett)', 'd) Atrofia parda']],
        ['En la autopsia de un hombre mayor, el corazón es pequeño y de color marrón oscuro.',
         '¿Qué pigmento se acumula y cuál es el proceso?',
         'a) Lipofuscina; atrofia parda', 'a',
         'La atrofia reduce el tamaño de células y órganos por menor síntesis y mayor degradación de proteínas (vía ubicuitina-proteosoma); la lipofuscina da el color marrón.',
         ['a) Lipofuscina; atrofia parda', 'b) Hemosiderina; infarto', 'c) Melanina; hipertrofia', 'd) Bilirrubina; metaplasia']],
        ['Una célula hipóxica pierde la capacidad de mantener sus bombas iónicas.',
         '¿Cuál es la primera manifestación de casi todas las formas de lesión celular?',
         'b) Edema celular', 'b',
         'La falla de las bombas dependientes de energía permite la entrada de agua: es la primera manifestación de la lesión reversible (cambio hidrópico).',
         ['a) Cariólisis', 'b) Edema celular', 'c) Calcificación', 'd) Figuras de mielina']],
        ['Un paciente con isquemia presenta pérdida de ATP.',
         '¿Qué sucede con la bomba de sodio-potasio y con el pH intracelular?',
         'c) Falla la bomba y baja el pH por acidosis láctica', 'c',
         'La menor producción de ATP daña la bomba Na⁺/K⁺ y aumenta la glucólisis anaeróbica, con aumento de ácido láctico y fosfatos y pH intracelular reducido.',
         ['a) Se activa más la bomba y sube el pH', 'b) La bomba no cambia y el pH baja', 'c) Falla la bomba y baja el pH por acidosis láctica', 'd) Falla la bomba y el pH sube']],
        ['Hombre de 62 años con obstrucción de la arteria renal. El estudio histológico del riñón muestra preservación de la arquitectura tisular con células eosinófilas anucleadas.',
         '¿Qué patrón de necrosis es?',
         'a) Coagulativa', 'a',
         'En la necrosis coagulativa la arquitectura del tejido muerto se conserva durante días; la isquemia por obstrucción vascular la produce en todos los órganos excepto el encéfalo.',
         ['a) Coagulativa', 'b) Licuefactiva', 'c) Caseosa', 'd) Fibrinoide']],
        ['Paciente con un infarto cerebral. A las semanas, el área necrótica es una cavidad quística.',
         '¿Qué patrón de necrosis es característico del encéfalo?',
         'b) Licuefactiva', 'b',
         'En la necrosis licuefactiva se digieren las células muertas y el tejido se transforma en una masa líquida; el infarto cerebral resuelve con espacios quísticos.',
         ['a) Coagulativa', 'b) Licuefactiva', 'c) Grasa', 'd) Caseosa']],
        ['Mujer con pancreatitis aguda. Hay áreas blandas de color blanco calcáreo en el tejido adiposo peripancreático.',
         '¿Qué patrón de necrosis es?',
         'c) Grasa', 'c',
         'Las enzimas pancreáticas salen de las células acinares y licuan las membranas de las células grasas; las lipasas rompen los triglicéridos y se forman jabones de calcio.',
         ['a) Coagulativa', 'b) Gangrenosa', 'c) Grasa', 'd) Fibrinoide']],
        ['En un ganglio linfático hiliar hay áreas necróticas rosadas acelulares rodeadas de células epitelioides y células gigantes de Langhans.',
         '¿Qué patrón de necrosis es?',
         'd) Caseosa', 'd',
         'La necrosis caseosa, de aspecto similar al queso, se ve en focos de infección tuberculosa con reacción granulomatosa.',
         ['a) Licuefactiva', 'b) Coagulativa', 'c) Grasa', 'd) Caseosa']],
        ['Paciente con vasculitis por inmunocomplejos. En la pared arterial hay material rosado claro y amorfo.',
         '¿Qué patrón de necrosis explica el hallazgo?',
         'b) Fibrinoide', 'b',
         'Los complejos antígeno-anticuerpo depositados en las paredes arteriales junto con fibrina extravasada dan el aspecto rosado y amorfo llamado fibrinoide.',
         ['a) Caseosa', 'b) Fibrinoide', 'c) Licuefactiva', 'd) Grasa']],
        ['En la apoptosis por vía intrínseca hay aumento de la permeabilidad de la membrana mitocondrial externa.',
         '¿Qué proteínas proapoptósicas la aumentan y cuál es la caspasa iniciadora?',
         'a) BAX y BAK; caspasa 9', 'a',
         'BAX y BAK aumentan la permeabilidad mitocondrial y liberan citocromo C; la caspasa 9 es la iniciadora de la vía mitocondrial. BCL2, BCL-X y MCL1 son antiapoptósicas.',
         ['a) BAX y BAK; caspasa 9', 'b) BCL2 y BCL-X; caspasa 8', 'c) BAD y BIM; caspasa 3', 'd) MCL1 y BAK; caspasa 10']],
        ['Un fragmento de timo fetal muestra células con citoplasma intensamente eosinófilo y cromatina nuclear condensada, sin inflamación a su alrededor.',
         '¿Qué proceso representa y cuál es su rasgo principal?',
         'd) Apoptosis; condensación de la cromatina', 'd',
         'La condensación de la cromatina es la principal característica de la apoptosis; no produce inflamación porque el contenido de la célula no sale.',
         ['a) Necrosis; cariólisis', 'b) Apoptosis; rotura de la membrana lisosómica', 'c) Necroptosis; edema celular', 'd) Apoptosis; condensación de la cromatina']],
        ['En la lesión de aterosclerosis hay macrófagos cargados de colesterol y ésteres de colesterol.',
         '¿Cómo se llaman estas células?',
         'b) Células espumosas', 'b',
         'Los macrófagos y las células de músculo liso llenos de vacuolas lipídicas forman las células espumosas; los ésteres cristalizan y dejan hendiduras de colesterol.',
         ['a) Células de Langhans', 'b) Células espumosas', 'c) Cuerpos de Russell', 'd) Células epitelioides']],
        ['Dos pacientes tienen placas ateroescleróticas. En una, la cubierta fibrosa es delgada y el núcleo lipídico es grande con inflamación.',
         '¿Qué placa tiene más riesgo de romperse?',
         'a) La de cubierta delgada y gran núcleo lipídico (vulnerable)', 'a',
         'Las placas vulnerables tienen cubierta fibrosa delgada, muchas células espumosas y células inflamatorias; la rotura puede causar trombosis.',
         ['a) La de cubierta delgada y gran núcleo lipídico (vulnerable)', 'b) La de cubierta engrosada con colágeno denso', 'c) Las dos por igual', 'd) Ninguna, las placas no se rompen']],
        ['Biopsia hepática de un paciente con deficiencia hereditaria de α1-antitripsina.',
         '¿Qué hay en los hepatocitos y qué órgano sufre por falta de la enzima?',
         'c) Glóbulos eosinófilos en el retículo endoplásmico; pulmón (enfisema)', 'c',
         'Las proteínas mal plegadas se agregan en el RE de los hepatocitos y no se secretan; la carencia de la enzima circulante causa enfisema.',
         ['a) Hialina de Mallory; cerebro', 'b) Cuerpos de Russell; riñón', 'c) Glóbulos eosinófilos en el retículo endoplásmico; pulmón (enfisema)', 'd) Ovillos neurofibrilares; hígado']],
        ['Un paciente con mieloma múltiple desarrolla depósitos de amiloide en corazón y lengua.',
         '¿Qué tipo de amiloidosis y qué proteína?',
         'd) Primaria; proteína AL (cadena ligera)', 'd',
         'La amiloidosis primaria viene de la proliferación clonal de células plasmáticas (proteína AL). La secundaria (AA) complica procesos inflamatorios crónicos.',
         ['a) Secundaria reactiva; proteína AA', 'b) Hereditaria; transtiretina', 'c) Asociada a diálisis; microglobulina β2', 'd) Primaria; proteína AL (cadena ligera)']],
        ['Paciente con insuficiencia renal crónica e hipercalcemia con depósitos de calcio en el pulmón y la mucosa gástrica.',
         '¿Qué tipo de calcificación es?',
         'a) Metastásica', 'a',
         'La calcificación metastásica afecta tejidos normales siempre que haya hipercalcemia; la distrófica ocurre en tejido lesionado con calcemia normal.',
         ['a) Metastásica', 'b) Distrófica', 'c) Fisiológica', 'd) Iatrogénica por necrosis']],
        ['En un carcinoma papilar de tiroides se observan calcificaciones de color azul violáceo.',
         '¿Cómo se llaman?',
         'b) Cuerpos de Psamoma', 'b',
         'Los cuerpos de Psamoma son calcificaciones distróficas concéntricas, típicas del carcinoma papilar de tiroides.',
         ['a) Cuerpos de Lewy', 'b) Cuerpos de Psamoma', 'c) Hialina de Mallory', 'd) Cuerpos de Russell']]
      ]
    }


  ]
};
