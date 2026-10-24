/* Sinus · Mapas guiados · Farmacología I (5º semestre, UCP Ciudad del Este)
   Conteúdo montado a partir das aulas do Dr. Cristhiam Giménez (Clases 1 a 9, Unidades I a III).
   Texto no idioma da aula (espanhol). Veja o cabeçalho de anatopato.js para o formato das chaves. */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
window.SINUS_MAPAS.farmacologia = {
  nome: 'Farmacología I',
  docente: 'Dr. Cristhiam Giménez',
  fonte: 'Unidades I a III, clases 1 a 9 · UCP Ciudad del Este',
  modulos: [

    /* ───────────── CLASE 1 ───────────── */
    {
      id: 'conceptos', clase: 'Clase 1', titulo: 'Conceptos básicos de farmacología', tipo: 'mapa',
      centro: 'Farmacología', sub: 'ciencia que estudia las acciones y propiedades de los fármacos',
      fuente: 'Clase 1 · Introducción, conceptos básicos, clasificación de fármacos',
      ramas: [
        { t: 'Fármaco', hojas: [
          ['Sustancia química capaz de interactuar con un organismo vivo', 'Fármaco', 'farmaco'],
          ['El fármaco es el... del medicamento', 'Principio activo', 'principio activo|activo']
        ] },
        { t: 'Ramas', hojas: [
          ['Absorción, distribución, metabolismo y excreción', 'Farmacocinética', 'farmacocinet'],
          ['Acciones y efectos del fármaco; mecanismo de acción', 'Farmacodinamia', 'farmacodinam'],
          ['Efectos nocivos o tóxicos de los fármacos', 'Toxicología', 'toxicolog'],
          ['Impacto de las variaciones genéticas en la respuesta a fármacos', 'Farmacogenómica', 'farmacogen']
        ] },
        { t: 'Acción y efecto', hojas: [
          ['Modificación que produce el fármaco en las funciones del organismo', 'Acción farmacológica', 'accion'],
          ['Manifestación de esa acción en un paciente', 'Efecto farmacológico', 'efecto'],
          ['Aumento de la función de las células de un órgano', 'Estimulación', 'estimulac'],
          ['Disminución de la función de las células', 'Depresión', 'depres'],
          ['Repone una secreción que falta en el organismo (ej.: hormona)', 'Reemplazo', 'reempl|sustitu|reposic'],
          ['Atenúa o destruye microorganismos', 'Antiinfecciosa', 'antiinfecc|antimicrob']
        ] },
        { t: 'Origen', hojas: [
          ['Obtenidos directamente de plantas, animales o minerales', 'Natural', 'natural'],
          ['Natural modificado en parte de su estructura química', 'Semisintético', 'semisintet'],
          ['Elaborado estrictamente en laboratorio', 'Sintético', 'sintet!semi']
        ] },
        { t: 'Tres nombres', hojas: [
          ['Composición molecular; reglas de nomenclatura química', 'Nombre químico', 'quimico'],
          ['Principio activo, conocido internacionalmente (ej.: metamizol)', 'Nombre genérico', 'generico'],
          ['Lo da el laboratorio; está protegido por patente (ej.: Apirón)', 'Nombre comercial (marca)', 'comercial|marca']
        ] },
        { t: 'Estudios clínicos', hojas: [
          ['Fases que establecen seguridad y eficacia', 'Fases I, II y III', 'iii|3|tres'],
          ['La fase IV se hace después de la...', 'Comercialización (nuevas indicaciones, riesgos y dosis)', 'comercializ|poscomercial|postcomercial|mercado'],
          ['Principio ético que exige el NIH antes de un ensayo (cite uno)', 'Consentimiento informado, validez científica, revisión independiente...', 'consentimiento|valor social|validez|riesgo|beneficio|revision|respeto|seleccion']
        ] }
      ]
    },
    {
      id: 'clasificacion', clase: 'Clase 1', titulo: 'Clasificación de fármacos según su función', tipo: 'tabla',
      resumen: 'Para qué sirve cada grupo y un fármaco de ejemplo (sirve cualquiera de los vistos en clase).',
      fuente: 'Clase 1 · Fármacos según su función',
      columnas: ['Grupo', 'Para qué sirve', 'Ejemplo (cite uno)'],
      filas: [
        ['Antipiréticos', 'Reducen la [[fiebre::fiebre|temperatura]]', '[[Paracetamol::paracetamol|dipirona|metamizol]]'],
        ['Analgésicos', 'Alivian el [[dolor::dolor]] físico: opioides y AINES', '[[Tramadol::tramadol|morfina|codeina|meperidina|ibuprofeno|ketorolac|diclofenac|aspirina|paracetamol]]'],
        ['Antiinflamatorios', 'AINES y [[corticoides::corticoid]]', '[[Dexametasona::dexametasona|prednisona|betametasona|hidrocortisona|ibuprofeno|diclofenac|ketorolac]]'],
        ['Expectorantes', 'Favorecen la expulsión de [[moco::moco|secrec|fluido]] de las vías aéreas', '[[Ambroxol::ambroxol|bromhexina|acetilcisteina]]'],
        ['Broncodilatadores', 'Relajan los músculos de las vías aéreas, que se [[dilatan::dilat]]', '[[Salbutamol::salbutamol|ipratropio]]'],
        ['Antihistamínicos', 'Bloquean la acción de la [[histamina::histamina]] (alergias)', '[[Loratadina::loratadina|clorfenamina|cetirizina]]'],
        ['Antiinfecciosos', '[[Antibióticos::antibiotic]] (bacterias), antimicóticos, antivirales y antiparasitarios', '[[Amoxicilina::amoxicilina|ceftriaxona|eritromicina|fluconazol|aciclovir|albendazol]]'],
        ['Antiácidos', 'Combaten la [[acidez::acid]] y las secreciones gástricas', '[[Omeprazol::omeprazol|sucralfato]]'],
        ['Antieméticos', 'Previenen las [[náuseas::nausea|vomito]] y los vómitos', '[[Metoclopramida::metoclopramida|ondansetron|domperidona]]'],
        ['Hipoglucemiantes', '[[Disminuyen::disminu|reduc|bajan]] la glucosa en sangre', '[[Metformina::metformina|glimepirida|sitagliptina]]'],
        ['Antihipertensivos', 'Disminuyen el riesgo [[cardiovascular::cardiovascular|cardiac]] en la HTA', '[[Enalapril::enalapril|losartan|amlodipino|hidroclorotiazida]]'],
        ['Diuréticos', 'Eliminan [[agua y electrolitos::agua|electrolit|sodio]] por la orina', '[[Furosemida::furosemida|hidroclorotiazida|espironolactona]]'],
        ['Anestésicos', 'Pérdida temporal de la sensibilidad o de la [[conciencia::conciencia]]', 'Local: [[lidocaína::lidocain]]; general: [[propofol::propofol]]']
      ]
    },

    /* ───────────── CLASE 2 ───────────── */
    {
      id: 'ladme', clase: 'Clase 2', titulo: 'LADME: el viaje del fármaco', tipo: 'fluxo',
      resumen: 'Liberación, absorción, distribución, metabolismo y excreción, en orden.',
      fuente: 'Clase 2 · Farmacocinética, LADME, vías de administración',
      pasos: [
        'Forma farmacéutica = fármaco + [[excipiente::excipient]]',
        'LIBERACIÓN: el fármaco se separa del excipiente en tres fases: [[desintegración::desintegr]] → desagregación → [[disolución::disoluc|disolv]]',
        'ABSORCIÓN: paso del fármaco desde el sitio de administración al torrente [[sanguíneo::sangui|sangre|plasma]]; depende de la [[vía::via]] de administración',
        'El mecanismo más frecuente es la difusión [[pasiva::pasiva]] (a favor del gradiente, sin gasto de energía)',
        'DISTRIBUCIÓN: solo el fármaco [[libre::libre]] difunde a los tejidos y es activo; el unido a [[albúmina::albumin]] es un reservorio',
        'METABOLISMO (biotransformación), sobre todo en el [[hígado::higado|hepat]]',
        'Fase I: [[oxidación::oxidac]], reducción o hidrólisis (citocromo [[P450::p450|p-450]])',
        'Fase II: [[conjugación::conjug]] con ácido glucurónico, sulfúrico o acético: más hidrosoluble',
        { end: 'EXCRECIÓN: la vía principal es el [[riñón::rinon|renal]]; también bilis, heces y pulmón (gases)' }
      ]
    },
    {
      id: 'absorcion', clase: 'Clase 2', titulo: 'Absorción y biodisponibilidad', tipo: 'mapa',
      centro: 'Absorción', sub: 'del sitio de administración al plasma',
      fuente: 'Clase 2 · Absorción, mecanismos de transporte, biodisponibilidad',
      ramas: [
        { t: 'Mecanismos de transporte', hojas: [
          ['A favor del gradiente, sin transportador ni energía: la mayoría de los fármacos', 'Difusión pasiva', 'pasiva'],
          ['Con proteína transportadora, sin energía, saturable', 'Difusión facilitada', 'facilitada'],
          ['Contra gradiente, con ATP, saturable y selectivo', 'Transporte activo', 'activo'],
          ['Para moléculas muy grandes (ej.: vitamina B12)', 'Endocitosis', 'endocitosis'],
          ['Transporte activo primario: saca 3 Na⁺ y mete 2 K⁺', 'Bomba Na⁺/K⁺-ATPasa', 'atpasa|bomba de sodio|sodio']
        ] },
        { t: 'Ionización', hojas: [
          ['Forma del fármaco que atraviesa las membranas', 'No ionizada (liposoluble)', 'no ionizad|liposolub'],
          ['Ecuación que calcula la fracción ionizada', 'Henderson-Hasselbalch', 'henderson|hasselbalch|hasselbach'],
          ['Los ácidos débiles se absorben mejor en el', 'Estómago (pH ácido)', 'estomago|gastric'],
          ['Las bases débiles se absorben mejor en el', 'Intestino (pH alcalino)', 'intestin|alcalin']
        ] },
        { t: 'Biodisponibilidad', hojas: [
          ['Cantidad de fármaco inalterado que llega a la circulación sistémica', 'Biodisponibilidad', 'biodisponib'],
          ['Se dan 100 mg por vía oral y se absorben 70 mg sin cambios', '70% (0,7)', '70|0,7|0.7'],
          ['Metabolismo en hígado o intestino antes de llegar a la circulación sistémica', 'Metabolismo de primer paso', 'primer paso'],
          ['Vía que evita el primer paso porque no necesita absorción', 'Intravenosa', 'intraven|endoven']
        ] }
      ]
    },
    {
      id: 'vias', clase: 'Clase 2', titulo: 'Vías de administración', tipo: 'tabla',
      resumen: 'Inicio de acción, ventaja principal y un ejemplo de cada vía.',
      fuente: 'Clase 2 · Vías de administración (enteral, parenteral, tópica y otras)',
      columnas: ['Vía', 'Inicio de acción', 'Ventaja principal', 'Ejemplo'],
      filas: [
        ['Oral', '[[30 min a varias horas::30|hora]]', 'La más [[segura::segura|conveniente|economica|frecuente]], conveniente y económica', '[[Paracetamol::paracetamol|amoxicilina|metformina]]'],
        ['Sublingual / bucal', '[[1 a 5 min::1|5]]', 'Absorción [[rápida::rapid|directa]] y evita el primer paso', '[[Nitroglicerina::nitroglicerina|buprenorfina]]'],
        ['Rectal', '10 a 30 min', 'Evita parcialmente el primer paso; útil si hay [[vómitos::vomito|inconsciente]]', '[[Dipirona::dipirona|promecaina]]'],
        ['Intravenosa', '[[Inmediato::inmediat]]', 'No requiere absorción; máximo [[control de la dosis::control|dosis]]', '[[Vancomicina::vancomicina|ketorolac|metoclopramida]]'],
        ['Intramuscular', '10 a 30 min', 'Admite vehículos oleosos; preparaciones [[de depósito::deposit]] de liberación lenta', '[[Haloperidol::haloperidol|medroxiprogesterona]]'],
        ['Subcutánea', 'Lenta y sostenida', 'Adecuada para fármacos de liberación [[lenta::lenta|sostenid]]', '[[Insulina::insulina|heparina|epinefrina|adrenalina]]'],
        ['Inhalatoria', 'Rápida (casi como un bolo IV)', 'Efecto [[local::local|pulmon]] con menos efectos sistémicos', '[[Salbutamol::salbutamol|fluticasona]]'],
        ['Tópica', 'Variable', 'Efecto [[local::local]]', '[[Clotrimazol::clotrimazol|betametasona|timolol]]'],
        ['Transdérmica (parche)', 'Lenta y sostenida', 'Evita el primer paso; ideal para fármacos [[lipofílicos::lipofil|liposolub]]', '[[Nicotina::nicotina|nitroglicerina|escopolamina]]']
      ]
    },
    {
      id: 'inyecciones', clase: 'Clase 2', titulo: 'Inyecciones: ángulo, sitio y volumen', tipo: 'tabla',
      fuente: 'Clase 2 · Vía parenteral',
      columnas: ['Vía', 'Ángulo de inserción', 'Sitio y volumen máximo'],
      filas: [
        ['Intramuscular', '[[90°::90]]', 'Deltoides (hasta [[2 mL::2]]); vasto lateral (hasta 4 mL); ventroglúteo (hasta [[5 mL::5]]); dorsoglúteo (hasta 4 mL)'],
        ['Subcutánea', '[[45°::45]]', 'Cara externa superior del brazo; región periumbilical (a unos [[5 cm::5]] del ombligo)'],
        ['Intravenosa', '[[25°::25]]', 'La vía parenteral más frecuente'],
        ['Intradérmica', '[[10-15°::10|15]]', 'Dermis (la capa más vascular bajo la epidermis); pruebas diagnósticas y [[desensibilización::desensibiliz|alerg]]']
      ]
    },
    {
      id: 'cinetica', clase: 'Clase 2', titulo: 'Metabolismo y eliminación', tipo: 'mapa',
      centro: 'Metabolismo y eliminación', sub: 'cinética de los fármacos',
      fuente: 'Clase 2 · Metabolismo, cinética de eliminación y excreción renal',
      ramas: [
        { t: 'Metabolismo', hojas: [
          ['Órgano principal de la biotransformación', 'Hígado', 'higado|hepat'],
          ['Fase I: reacciones (cite una)', 'Oxidación, reducción o hidrólisis', 'oxidac|reducc|hidrolis'],
          ['Fase II: reacciones de síntesis o...', 'Conjugación (glucuronidación, sulfatación, acetilación)', 'conjug|glucuron|sulfat|acetil'],
          ['Sistema enzimático principal de la fase I', 'Citocromo P450', 'p450|p-450|citocromo']
        ] },
        { t: 'Orden de eliminación', hojas: [
          ['Elimina un porcentaje constante por unidad de tiempo', 'Cinética de primer orden', 'primer orden|primer'],
          ['Ejemplo de primer orden', 'Paracetamol o penicilina', 'paracetamol|penicilina'],
          ['Elimina una cantidad fija por unidad de tiempo (enzimas saturadas)', 'Cinética de orden cero', 'cero'],
          ['Ejemplo de orden cero', 'Fenitoína o etanol', 'fenitoina|etanol|alcohol'],
          ['Riesgo de la cinética de orden cero', 'Toxicidad (pequeños aumentos de dosis dan grandes aumentos de concentración)', 'toxic|acumul']
        ] },
        { t: 'Unión a proteínas', hojas: [
          ['Principal proteína plasmática transportadora de fármacos', 'Albúmina', 'albumin'],
          ['Las bases débiles se unen sobre todo a las...', 'Lipoproteínas', 'lipoprot'],
          ['Solo el fármaco... difunde a los tejidos y es activo', 'Libre', 'libre']
        ] },
        { t: 'Excreción renal', hojas: [
          ['Procesos renales (cite dos)', 'Filtración glomerular, secreción tubular activa y reabsorción tubular pasiva', 'filtrac|secrec|reabsorc'],
          ['Para eliminar un ácido débil (fenobarbital) se... la orina con bicarbonato', 'Alcaliniza (atrapamiento iónico)', 'alcalin|atrapamiento'],
          ['Tiempo en que la concentración plasmática se reduce a la mitad', 'Semivida (vida media) de eliminación', 'semivida|vida media|t1/2|t 1/2']
        ] }
      ]
    },
    {
      id: 'curva', clase: 'Clase 2', titulo: 'Curva de niveles plasmáticos', tipo: 'mapa',
      centro: 'Curva de niveles plasmáticos', sub: 'después de una dosis oral',
      fuente: 'Clase 2 · Variaciones de la concentración del fármaco en el plasma',
      ramas: [
        { t: 'Concentraciones', hojas: [
          ['Por encima de ella se observa el efecto terapéutico', 'CME (concentración mínima eficaz)', 'cme|minima eficaz|eficaz'],
          ['Por encima de ella aparecen efectos nocivos', 'CMT (concentración mínima tóxica)', 'cmt|minima toxica|toxica'],
          ['Concentración plasmática más alta alcanzada', 'Cmax', 'cmax|maxima'],
          ['Margen entre la CME y la CMT', 'Intervalo (margen) terapéutico', 'terapeutic']
        ] },
        { t: 'Tiempos', hojas: [
          ['Desde la administración hasta el inicio del efecto', 'Período de latencia', 'latencia'],
          ['Tiempo que tarda en alcanzar la Cmax', 'Tmax', 'tmax|maximo'],
          ['Tiempo entre alcanzar la CME y bajar de ella', 'Duración de la acción (tiempo eficaz)', 'duracion|tiempo eficaz']
        ] },
        { t: 'Exposición', hojas: [
          ['Área bajo la curva', 'AUC', 'auc'],
          ['Al inicio de la curva predomina la... sobre la distribución y la eliminación', 'Absorción', 'absorc']
        ] },
        { t: 'Variabilidad', hojas: [
          ['Factores de la variabilidad individual (cite dos)', 'Genéticos, ambientales, fisiológicos (edad, embarazo), patológicos (riñón, hígado, corazón) e iatrogénicos', 'genetic|ambiental|fisiolog|edad|embaraz|patolog|renal|hepat|cardiac|iatrogen|interaccion']
        ] }
      ]
    },

    /* ───────────── CLASE 3 ───────────── */
    {
      id: 'receptores', clase: 'Clase 3', titulo: 'Receptores farmacológicos', tipo: 'mapa',
      centro: 'Receptores farmacológicos', sub: 'cuatro familias',
      fuente: 'Clase 3 · Farmacodinámica: receptores y transducción de señal',
      ramas: [
        { t: 'Canales iónicos', hojas: [
          ['Su activación cambia el potencial de membrana o la concentración de...', 'Iones', 'ion'],
          ['Ejemplo', 'Receptor nicotínico de acetilcolina (o GABA-A)', 'nicotin|gaba|acetilcolina'],
          ['Velocidad de respuesta (ionotrópicos)', 'Milisegundos', 'milisegundo|rapid']
        ] },
        { t: 'Proteína G', hojas: [
          ['Subunidad que se une al GTP', 'Alfa (α)', 'alfa|α'],
          ['Ejemplo', 'Adrenoceptores α y β', 'adrenoceptor|adrenergic|alfa|beta|muscarin'],
          ['Efectores típicos de la proteína G', 'Una enzima o un canal iónico', 'enzima|canal']
        ] },
        { t: 'Ligados a enzimas', hojas: [
          ['Actividad enzimática frecuente: fosforila residuos de...', 'Tirosina (tirosina cinasa)', 'tirosina|cinasa|quinasa'],
          ['Ejemplo', 'Receptor de insulina o de factores de crecimiento', 'insulina|crecimiento'],
          ['Tiempo de respuesta', 'Minutos a horas', 'minuto|hora']
        ] },
        { t: 'Intracelulares', hojas: [
          ['El ligando debe ser suficientemente...', 'Liposoluble (hidrófobo)', 'liposolub|lipid|hidrofob'],
          ['Ejemplo', 'Receptor de hormonas esteroideas', 'esteroid|hormon|corticoid'],
          ['Diana principal: factores de... en el núcleo', 'Transcripción (expresión génica)', 'transcripc|expresion|gen'],
          ['Tiempo de respuesta', 'Horas o días', 'hora|dia']
        ] }
      ]
    },
    {
      id: 'agonistas', clase: 'Clase 3', titulo: 'Agonistas y antagonistas', tipo: 'tabla',
      fuente: 'Clase 3 · Actividad intrínseca, agonistas y antagonistas',
      columnas: ['Tipo', '¿Qué hace en el receptor?', 'Ejemplo'],
      filas: [
        ['Agonista total', 'Se une y produce el efecto [[máximo::maxim|emax]] (Emax)', '[[Morfina::morfina|fentanilo]] (receptor μ opioide)'],
        ['Agonista parcial', 'Produce efecto, pero [[nunca alcanza el máximo::nunca|menor|menos|parcial]]; alta afinidad y menor eficacia', '[[Buprenorfina::buprenorfina]]'],
        ['Agonista inverso', 'Estabiliza la forma inactiva R y [[reduce::reduc|disminu]] la actividad basal del receptor', 'Antihistamínico H1: [[cetirizina::cetirizina]]'],
        ['Antagonista competitivo', 'Se une al mismo sitio, de forma reversible; se supera [[aumentando la dosis del agonista::aument|mas agonista|dosis]]', '[[Atropina::atropina]]'],
        ['Antagonista irreversible', 'Unión [[covalente::covalent]]: reduce los receptores disponibles y más agonista no lo supera', 'Enlace covalente con la COX: [[aspirina::aspirina|acetilsalicil|aas]]'],
        ['Antagonista alostérico', 'Se une a un sitio [[distinto::distint|otro|alosteric]] del agonista y previene la activación', '—'],
        ['Antagonista funcional', 'Actúa en otro receptor y produce efectos [[opuestos::opuest|contrari]]', 'Epinefrina (β2) frente a la [[histamina::histamina]] (H1) en el bronquio']
      ]
    },
    {
      id: 'dosis', clase: 'Clase 3', titulo: 'Dosis-respuesta: afinidad, potencia y eficacia', tipo: 'mapa',
      centro: 'Dosis-respuesta', sub: 'afinidad, potencia y eficacia',
      fuente: 'Clase 3 · Relaciones dosis-respuesta y conceptos clave',
      ramas: [
        { t: 'Afinidad', hojas: [
          ['Probabilidad de que el fármaco forme el complejo fármaco-receptor', 'Afinidad', 'afinidad'],
          ['Capacidad de unirse preferentemente a un tipo de receptor', 'Especificidad (selectividad)', 'especific|selectiv'],
          ['Enlace fármaco-receptor más frecuente', 'Iónico', 'ionico'],
          ['Enlace más firme (excepcional); suele ser irreversible', 'Covalente', 'covalent']
        ] },
        { t: 'Potencia', hojas: [
          ['Mide la cantidad de fármaco necesaria para producir un efecto', 'Potencia', 'potencia'],
          ['Concentración que produce el 50% del efecto máximo', 'CE50 (EC50 o DE50)', 'ec50|ce50|de50']
        ] },
        { t: 'Eficacia', hojas: [
          ['Capacidad de activar el receptor y generar una respuesta', 'Eficacia', 'eficacia'],
          ['Depende de los complejos fármaco-receptor y de la actividad...', 'Intrínseca', 'intrinseca'],
          ['Característica más útil en la clínica: da mayor beneficio terapéutico', 'Eficacia', 'eficacia']
        ] },
        { t: 'Respuesta con el uso', hojas: [
          ['Disminución gradual de la respuesta tras días o semanas', 'Tolerancia', 'toleranc'],
          ['Disminución súbita del efecto tras pocas dosis', 'Taquifilaxia', 'taquifilax'],
          ['El fármaco se concentra porque no se elimina antes de la dosis siguiente', 'Acumulación', 'acumulac'],
          ['Respuesta exagerada a una dosis muy baja (no inmunológica)', 'Intolerancia', 'intoleranc']
        ] }
      ]
    },

    /* ───────────── CLASE 4 ───────────── */
    {
      id: 'farmacogenetica', clase: 'Clase 4', titulo: 'Farmacogenética', tipo: 'mapa',
      centro: 'Farmacogenética', sub: 'genes y respuesta a los fármacos',
      fuente: 'Clase 4 · Farmacogenética: concepto y clasificación',
      ramas: [
        { t: 'Conceptos', hojas: [
          ['Influencia de las variaciones del ADN sobre la respuesta a fármacos', 'Farmacogenética', 'farmacogenetica'],
          ['Estudia más variantes (ADN y ARN), en un individuo o población', 'Farmacogenómica', 'farmacogenomica'],
          ['Polimorfismo: alelo mutante presente en más de este porcentaje de la población', '1%', '1'],
          ['Objetivo final', 'Medicina personalizada (prescripción individualizada)', 'personaliz|individualiz|medida']
        ] },
        { t: 'Metabolizadores', hojas: [
          ['Metabolismo lento: ↑ concentración plasmática y riesgo de...', 'Toxicidad', 'toxic'],
          ['Metabolismo rápido: ↓ concentración plasmática y riesgo de...', 'Ineficacia', 'ineficac|sin efecto|falta de efecto'],
          ['Isoenzima con mayor relevancia en el metabolismo de fármacos', 'CYP2D6', '2d6']
        ] },
        { t: 'Enzimas y fármacos', hojas: [
          ['CYP2C9 lento: riesgo de hemorragia con el anticoagulante', 'Warfarina', 'warfarin'],
          ['CYP2C19: inhibidor de la secreción gástrica', 'Omeprazol', 'omeprazol'],
          ['Acetiladores lentos: neuropatía por el antituberculoso', 'Isoniazida', 'isoniazid'],
          ['Acetiladores lentos: lupus inducido por', 'Hidralazina', 'hidralazin'],
          ['Pseudocolinesterasa defectuosa: parálisis prolongada con', 'Succinilcolina', 'succinilcolin|suxameton'],
          ['La fenitoína se metaboliza por', 'Hidroxilación', 'hidroxilac']
        ] },
        { t: 'Dianas y transportadores', hojas: [
          ['Déficit de G6PD con primaquina o sulfamidas: ...', 'Hemólisis', 'hemolisis|anemia hemolitica'],
          ['Mutaciones en canales de K⁺ con fármacos que alargan el QT', 'Torsades de pointes (arritmia)', 'torsade|arritmia'],
          ['Transportador que, sobreexpresado, da resistencia a antiepilépticos y antraciclinas', 'Glucoproteína P (MDR1)', 'glucoprot|mdr'],
          ['RYR1 con halotano y succinilcolina: ... maligna', 'Hipertermia', 'hipertermia']
        ] },
        { t: 'Dieta', hojas: [
          ['El zumo de pomelo... el CYP3A4 (↑ AUC de ciclosporina)', 'Inhibe', 'inhib'],
          ['La hierba de San Juan... el CYP3A4', 'Induce', 'induc']
        ] }
      ]
    },

    /* ───────────── CLASE 5 ───────────── */
    {
      id: 'ram_tipos', clase: 'Clase 5', titulo: 'Reacciones adversas: tipos A a E', tipo: 'tabla',
      fuente: 'Clase 5 · Clasificación de las reacciones adversas a medicamentos (RAM)',
      columnas: ['Tipo', 'Nombre y características', 'Ejemplo'],
      filas: [
        ['A', '[[Aumentadas::aumentad]]: predecibles, dependientes de la [[dosis::dosis]]; alta incidencia, baja mortalidad', '[[Hemorragia con anticoagulantes::hemorrag|hipotension]] o hipotensión con antihipertensivos'],
        ['B', '[[Bizarras::bizarr]]: impredecibles, NO dependen de la dosis; baja incidencia, [[alta mortalidad::mortalidad|alta]]', '[[Anafilaxia con penicilina::anafil|penicilina|alerg]]'],
        ['C', '[[Crónicas::cronic]]: por uso prolongado y acumulación de la dosis', '[[Síndrome de Cushing::cushing]] por corticoides crónicos'],
        ['D', '[[Diferidas::diferid]]: aparecen meses o años después, incluso tras suspender el fármaco', '[[Teratogénesis o carcinogénesis::terato|cancer|carcino|malform]]'],
        ['E', '[[End of use::end|fin|suspension|retirada]]: por suspensión brusca del tratamiento', '[[Convulsión al suspender un antiepiléptico::convuls|abstinencia|rebote]]']
      ]
    },
    {
      id: 'ram_terminos', clase: 'Clase 5', titulo: 'Reacciones adversas: términos y mecanismos', tipo: 'mapa',
      centro: 'Reacciones adversas', sub: 'términos y mecanismos',
      fuente: 'Clase 5 · Reacciones adversas y farmacovigilancia',
      ramas: [
        { t: 'Términos', hojas: [
          ['Parte de la acción del fármaco, pero indeseable (boca seca con anticolinérgicos)', 'Efecto colateral', 'colateral'],
          ['Efecto indirecto de la acción principal (hipopotasemia por diuréticos)', 'Efecto secundario', 'secundari'],
          ['Respuesta genética anormal (parálisis prolongada con succinilcolina)', 'Reacción idiosincrásica', 'idiosincras'],
          ['Relación entre dosis tóxica y dosis útil: margen de seguridad', 'Índice terapéutico', 'indice|terapeutic']
        ] },
        { t: 'Relacionadas con la dosis', hojas: [
          ['Enfermedad hepática: ↓ metabolismo y acumulación de', 'Sedantes o benzodiacepinas', 'benzodiacep|sedante'],
          ['Insuficiencia renal: toxicidad por', 'Aminoglucósidos', 'aminoglucosid'],
          ['Los ancianos son más sensibles a', 'Sedantes, anticolinérgicos y depresores del SNC', 'sedante|anticolinerg|depresor|snc']
        ] },
        { t: 'Con infección viral', hojas: [
          ['Mononucleosis (Epstein-Barr) + ampicilina', 'Erupción cutánea (no es alergia verdadera)', 'erupcion|rash|exantema|cutane'],
          ['Varicela o influenza + aspirina en niños', 'Síndrome de Reye', 'reye'],
          ['Infección viral respiratoria + teofilina: ↓ aclaramiento y riesgo de', 'Toxicidad', 'toxic']
        ] },
        { t: 'Uso prolongado', hojas: [
          ['Neurolépticos: movimientos involuntarios de lengua y labios', 'Discinesia tardía', 'discinesia'],
          ['Suspensión brusca de clonidina', 'Hipertensión de rebote', 'rebote|hipertension'],
          ['Analgésicos usados por años: daño en el riñón', 'Nefropatía analgésica', 'nefropat']
        ] },
        { t: 'Embarazo', hojas: [
          ['Período más crítico: organogénesis, en el primer...', 'Trimestre', 'trimestre'],
          ['Sedante que causó focomelia en más de 10.000 bebés (1957-1962)', 'Talidomida', 'talidomida'],
          ['Moléculas que cruzan la placenta con más facilidad', 'Pequeñas, liposolubles y no unidas a proteínas', 'pequen|liposolub|no unid|libre']
        ] }
      ]
    },
    {
      id: 'hipersensibilidad', clase: 'Clase 5', titulo: 'Hipersensibilidad a fármacos', tipo: 'tabla',
      fuente: 'Clase 5 · Reacciones adversas no relacionadas con la dosis: mecanismos inmunológicos',
      columnas: ['Tipo', 'Mecanismo', 'Tiempo', 'Ejemplos'],
      filas: [
        ['I (inmediata)', '[[IgE::ige]] + mastocitos liberan histamina', '[[Minutos::minuto]]', 'Urticaria, asma, [[anafilaxia::anafil]]'],
        ['II (citotóxica)', 'Anticuerpos [[IgG o IgM::igg|igm]] atacan células', 'Horas a días', 'Anemia hemolítica, [[trombocitopenia::trombocitopeni]]'],
        ['III (inmunocomplejos)', 'Complejos antígeno-anticuerpo se depositan en los [[vasos::vaso]]', '[[Días::dias]]', '[[Enfermedad del suero::suero]]'],
        ['IV (celular o tardía)', 'Activación de [[linfocitos T::linfocito]]', '48 a 72 h', 'Dermatitis, [[síndrome de Stevens-Johnson::stevens|johnson]]']
      ]
    },
    {
      id: 'farmacovigilancia', clase: 'Clase 5', titulo: 'Farmacovigilancia', tipo: 'fluxo',
      resumen: 'Cómo se vigila la seguridad de un medicamento después de salir al mercado.',
      fuente: 'Clase 5 · Farmacovigilancia: proceso y objetivos',
      pasos: [
        { f: 'Medicamento ya comercializado: los ensayos clínicos tienen pocos pacientes, poco tiempo y condiciones controladas' },
        '1. [[Identificación del riesgo::identificac]]: se genera una [[señal::senal]] cuando se notifica una sospecha de reacción adversa (médicos, enfermeros, farmacéuticos o el paciente)',
        '2. [[Cuantificación y evaluación::cuantific|evaluac]]: frecuencia, gravedad, relación [[causal::causal]], factores de riesgo y población vulnerable',
        '3. [[Gestión del riesgo::gestion]]: si el riesgo se confirma, la autoridad sanitaria toma medidas',
        { end: 'Medidas: modificar la ficha técnica, actualizar el prospecto, [[restringir::restring]] el uso, vigilancia especial o [[retirar::retir]] el medicamento' },
        { note: 'Meta: que la relación [[beneficio-riesgo::beneficio|riesgo]] del medicamento sea favorable', title: 'Objetivo principal' }
      ]
    },

    /* ───────────── CLASE 6 ───────────── */
    {
      id: 'sna', clase: 'Clase 6', titulo: 'Sistema nervioso autónomo: simpático y parasimpático', tipo: 'tabla',
      fuente: 'Clases 6 y 7 · Sistema nervioso autónomo y neurotransmisores clásicos',
      columnas: ['Característica', 'Simpático', 'Parasimpático'],
      filas: [
        ['Origen', '[[Toracolumbar::toracolumbar]]', '[[Craneosacro::craneosacro]]'],
        ['Fibra preganglionar', '[[Corta::corta]]', '[[Larga::larga]]'],
        ['Fibra posganglionar', '[[Larga::larga]]', '[[Corta::corta]]'],
        ['Neurotransmisor preganglionar (ambos)', '[[Acetilcolina::acetilcolina]] en receptores [[nicotínicos::nicotin]]', 'Igual que el simpático'],
        ['Neurotransmisor posganglionar', '[[Noradrenalina::noradrenalina|norepinefrina]]', '[[Acetilcolina::acetilcolina]]'],
        ['Tipo de fibras', '[[Adrenérgicas::adrenergic]]', '[[Colinérgicas::colinergic]]'],
        ['Función general', 'Estrés o [[alerta::alerta|estres|lucha]]', '[[Reposo y digestión::reposo|digestion]]'],
        ['Corazón', '[[Aumenta::aument]] la frecuencia', '[[Disminuye::disminu]] la frecuencia'],
        ['Pupila', '[[Dilata::dilat|midriasis]]', '[[Contrae::contra|miosis]]'],
        ['Intestino', '[[Disminuye::disminu]] la motilidad', '[[Aumenta::aument]] la motilidad']
      ]
    },
    {
      id: 'nic_mus', clase: 'Clase 6', titulo: 'Receptores nicotínicos y muscarínicos', tipo: 'tabla',
      fuente: 'Clase 6 · Receptores colinérgicos',
      columnas: ['Característica', 'Nicotínicos', 'Muscarínicos'],
      filas: [
        ['Tipo de receptor', '[[Canal iónico::canal]] (ionotrópico)', 'Acoplado a [[proteína G::proteina g|gpcr|metabotrop]]'],
        ['Velocidad de respuesta', '[[Rápida::rapid]]', 'Más [[lenta::lenta]]'],
        ['Activados por', '[[Nicotina::nicotina]]', '[[Muscarina::muscarina]]'],
        ['Bloqueados por', '[[Tubocurarina::tubocurarina|curare]]', '[[Atropina::atropina]]'],
        ['Ubicación principal', 'Ganglios y músculo [[esquelético::esquelet]]', 'Órganos [[parasimpáticos::parasimpat]] (corazón, glándulas, músculo liso)'],
        ['Subtipos', '5 subunidades (α, β, γ, δ, ε)', 'M1 a [[M5::m5|cinco]]'],
        ['Proteína G', '—', 'Impares (M1, M3, M5): [[Gq::gq]], estimulan; pares (M2, M4): [[Gi::gi]], inhiben'],
        ['M2', '—', 'Corazón: disminuye la [[frecuencia cardíaca::frecuencia|bradicard]]'],
        ['M3', '—', 'Músculo liso y glándulas: [[contracción y secreción::contracc|secrec]]']
      ]
    },
    {
      id: 'colinergicos', clase: 'Clase 6', titulo: 'Agonistas colinérgicos y anticolinesterásicos', tipo: 'mapa',
      centro: 'Agonistas colinérgicos', sub: 'directos y anticolinesterásicos',
      fuente: 'Clase 6 · Fármacos colinérgicos de acción directa e indirecta',
      ramas: [
        { t: 'Acción directa', hojas: [
          ['Fármaco tipo del grupo', 'Acetilcolina', 'acetilcolina'],
          ['Éster de colina usado en el diagnóstico de asma', 'Metacolina', 'metacolina'],
          ['Alcaloide natural usado en el glaucoma', 'Pilocarpina', 'pilocarpina'],
          ['Efecto cardiovascular de la ACh', 'Bradicardia y vasodilatación (↓ PA)', 'bradicard|vasodilat|hipotens|frecuencia'],
          ['Efecto ocular', 'Miosis y ↓ presión intraocular', 'miosis|presion intraocular']
        ] },
        { t: 'Anticolinesterásicos', hojas: [
          ['Enzima que inhiben', 'Acetilcolinesterasa (AChE)', 'colinesterasa|ache'],
          ['Inhibición muy corta; diagnóstico de miastenia gravis', 'Edrofonio', 'edrofonio'],
          ['Carbámico de acción intermedia (cite uno)', 'Neostigmina, piridostigmina o fisostigmina', 'neostigmina|piridostigmina|fisostigmina'],
          ['Inhibición irreversible; insecticidas y armas químicas', 'Organofosforados', 'organofosforad'],
          ['Para el Alzheimer (cite uno)', 'Donepezilo, rivastigmina o galantamina', 'donepezil|rivastigmina|galantamina'],
          ['Los cuaternarios no atraviesan la barrera...', 'Hematoencefálica', 'hematoencefalic|bhe']
        ] },
        { t: 'Usos clínicos', hojas: [
          ['Enfermedad autoinmune con anticuerpos contra receptores nicotínicos', 'Miastenia gravis', 'miastenia'],
          ['Tratamiento crónico más usado en la miastenia', 'Piridostigmina', 'piridostigmina'],
          ['Parálisis del intestino tras una cirugía', 'Íleo paralítico', 'ileo'],
          ['La vejiga no puede contraerse', 'Atonía vesical (retención urinaria)', 'atonia|retencion'],
          ['Provocan miosis y aumentan el drenaje del humor acuoso', 'Glaucoma', 'glaucoma'],
          ['Revierten a los bloqueantes neuromusculares no despolarizantes', 'Neostigmina o edrofonio', 'neostigmina|edrofonio']
        ] },
        { t: 'Intoxicación', hojas: [
          ['Síntomas muscarínicos (cite dos)', 'Miosis, salivación, sudoración, broncoespasmo, diarrea, vómitos', 'miosis|salivac|sudorac|broncoespasmo|diarrea|vomito'],
          ['Antídoto de los efectos muscarínicos', 'Atropina', 'atropina'],
          ['Reactivan la enzima si se dan temprano', 'Oximas (pralidoxima, obidoxima)', 'oxima|pralidoxima|obidoxima'],
          ['Hongos Inocybe: sustancia responsable', 'Muscarina', 'muscarina']
        ] }
      ]
    },
    {
      id: 'antimuscarinicos', clase: 'Clase 6', titulo: 'Antimuscarínicos', tipo: 'mapa',
      centro: 'Antimuscarínicos', sub: 'atropina y derivados',
      fuente: 'Clase 6 · Fármacos antagonistas colinérgicos muscarínicos',
      ramas: [
        { t: 'Atropina', hojas: [
          ['Prototipo del grupo; bloquea todos los subtipos M', 'Atropina', 'atropina'],
          ['Origen de la atropina y la escopolamina', 'Alcaloides naturales (plantas)', 'alcaloid|natural|planta'],
          ['Mecanismo: antagonista... y reversible', 'Competitivo', 'competitiv'],
          ['Efecto más sensible: ↓ secreción salival', 'Boca seca (xerostomía)', 'boca seca|xerostom']
        ] },
        { t: 'Efectos', hojas: [
          ['Corazón', '↑ frecuencia cardíaca', 'taquicard|aument|frecuencia'],
          ['Ojo (dos efectos)', 'Midriasis y cicloplejía', 'midriasis;cicloplej'],
          ['Tubo digestivo', '↓ motilidad', 'motilidad|peristalt|tono'],
          ['Vías urinarias', 'Retención urinaria', 'retencion'],
          ['Contraindicada en el glaucoma de ángulo...', 'Cerrado', 'cerrado']
        ] },
        { t: 'Usos', hojas: [
          ['Bradicardia vagal y bloqueo AV', 'Atropina', 'atropina'],
          ['Premedicación anestésica: ↓ secreciones y prevenir reflejos...', 'Vagales', 'vagal|bradicard'],
          ['Broncodilatador inhalado (cite uno)', 'Ipratropio o tiotropio', 'ipratropio|tiotropio'],
          ['Vejiga hiperactiva (cite uno)', 'Oxibutinina, tolterodina, darifenacina, solifenacina o trospio', 'oxibutinina|tolterodina|darifenacina|solifenacina|trospio'],
          ['Parche contra el mareo por movimiento', 'Escopolamina', 'escopolamin'],
          ['Espasmolítico digestivo (cite uno)', 'Butilbromuro de escopolamina o diciclomina', 'butilbromuro|diciclomina|dicicloverina|butilescopolamina']
        ] },
        { t: 'Intoxicación', hojas: [
          ['Síntomas clásicos (cite dos)', 'Midriasis, piel seca, taquicardia, confusión', 'midriasis|piel seca|taquicard|confusion|boca seca|delirio'],
          ['Antídoto de la intoxicación atropínica', 'Fisostigmina', 'fisostigmin'],
          ['Si hay agitación intensa', 'Diazepam', 'diazepam'],
          ['Cuaternario que NO atraviesa la BHE (cite uno)', 'Ipratropio, tiotropio o butilescopolamina', 'ipratropio|tiotropio|butilescopolamina|trospio']
        ] }
      ]
    },

    /* ───────────── CLASE 7 ───────────── */
    {
      id: 'noradrenalina', clase: 'Clase 7', titulo: 'Neurona adrenérgica: de la tirosina a la respuesta', tipo: 'fluxo',
      resumen: 'Síntesis, almacenamiento, liberación y terminación de la noradrenalina.',
      fuente: 'Clase 7 · Fármacos adrenérgicos: neurotransmisión',
      pasos: [
        'SÍNTESIS: [[tirosina::tirosina]] → (tirosina hidroxilasa: paso [[limitante::limitante|limit]]) → L-DOPA',
        'L-DOPA → (descarboxilasa) → [[dopamina::dopamina]]',
        'ALMACENAMIENTO: la dopamina entra a la vesícula (transporte bloqueado por [[reserpina::reserpina]]) y se convierte en [[noradrenalina::noradrenalina|norepinefrina]]',
        'En la médula suprarrenal, la noradrenalina se metila a [[adrenalina::adrenalina|epinefrina]]',
        'LIBERACIÓN: llega el impulso → entra [[calcio::calcio]] → exocitosis (bloqueada por [[guanetidina::guanetidina]])',
        'UNIÓN A RECEPTORES: los postsinápticos producen la respuesta; los presinápticos [[α2::alfa|α2]] inhiben la liberación (feedback negativo)',
        'TERMINACIÓN: [[recaptación::recaptaci]] en la neurona (la bloquean cocaína, imipramina y duloxetina)',
        { end: 'METABOLISMO: por [[COMT::comt]] en la sinapsis y [[MAO::mao]] dentro de la neurona → metabolitos inactivos en la orina' }
      ]
    },
    {
      id: 'adrenoceptores', clase: 'Clase 7', titulo: 'Receptores adrenérgicos', tipo: 'tabla',
      fuente: 'Clase 7 · Receptores adrenérgicos y respuestas características',
      columnas: ['Receptor', 'Ubicación típica', 'Efecto de su estimulación'],
      filas: [
        ['α1', 'Músculo liso de vasos (piel y vísceras) y esfínteres', '[[Vasoconstricción::vasoconstric]]: ↑ resistencia periférica y presión arterial; [[midriasis::midriasis]]'],
        ['α2', 'Terminaciones presinápticas simpáticas', '[[Inhibe::inhib|disminu]] la liberación de noradrenalina (feedback negativo)'],
        ['β1', 'Corazón y células yuxtaglomerulares', '↑ [[frecuencia y contractilidad::frecuencia|contractilidad|inotrop|cronotrop]]; ↑ [[renina::renina]]'],
        ['β2', 'Músculo liso bronquial, vasos del músculo esquelético, útero e hígado', '[[Broncodilatación::broncodilat]], vasodilatación y [[relajación uterina::relaj|utero]]; ↑ glucogenólisis'],
        ['β3', 'Tejido adiposo y detrusor', '[[Lipólisis::lipolisis]]; relaja el detrusor (mirabegron en la vejiga hiperactiva)']
      ]
    },
    {
      id: 'adrenergicos', clase: 'Clase 7', titulo: 'Agonistas adrenérgicos', tipo: 'mapa',
      centro: 'Agonistas adrenérgicos', sub: 'directos, indirectos y mixtos',
      fuente: 'Clase 7 · Características y fármacos agonistas adrenérgicos',
      ramas: [
        { t: 'Catecolaminas', hojas: [
          ['Cite una catecolamina', 'Epinefrina, norepinefrina, isoproterenol o dopamina', 'epinefrina|adrenalina|norepinefrina|noradrenalina|isoproterenol|dopamina'],
          ['Se inactivan por estas dos enzimas', 'COMT y MAO', 'comt;mao'],
          ['Por vía oral', 'Se inactivan (no son eficaces)', 'inactiv|ineficaz|no sirven|no se usan'],
          ['Penetración en el SNC', 'Mala (son polares)', 'mala|poca|polar']
        ] },
        { t: 'Epinefrina', hojas: [
          ['Fármaco de elección en el choque anafiláctico', 'Epinefrina (adrenalina)', 'epinefrina|adrenalina'],
          ['Receptor del efecto inotrópico y cronotrópico positivo', 'β1', 'beta 1|β1|beta1'],
          ['Receptor de la broncodilatación', 'β2', 'beta 2|β2|beta2'],
          ['Se agrega al anestésico local para...', 'Prolongar la anestesia (vasoconstricción)', 'prolong|duracion|vasoconstric'],
          ['Vía preferida en anafilaxia ambulatoria', 'Intramuscular (cara anterior del muslo)', 'intramuscular|muslo']
        ] },
        { t: 'Otras catecolaminas', hojas: [
          ['Choque séptico: ↑ resistencia vascular', 'Norepinefrina', 'norepinefrina|noradrenalina'],
          ['Choque cardiogénico; ↑ flujo renal a dosis bajas', 'Dopamina', 'dopamina'],
          ['Agonista β1 selectivo en la insuficiencia cardíaca', 'Dobutamina', 'dobutamina'],
          ['Estimula β1 y β2; rara vez se usa', 'Isoproterenol', 'isoproterenol'],
          ['Agonista β3 para la vejiga hiperactiva', 'Mirabegron', 'mirabegron']
        ] },
        { t: 'Selectivos', hojas: [
          ['α1: vasopresor y midriasis', 'Fenilefrina', 'fenilefrina'],
          ['α1 y α2: descongestionante nasal (no usar más de 3 días)', 'Oximetazolina', 'oximetazolina'],
          ['α2: hipertensión; riesgo de HTA de rebote', 'Clonidina', 'clonidina'],
          ['α2 central: elección en la HTA del embarazo', 'Alfametildopa', 'metildopa'],
          ['β2 inhalado para el asma (cite uno)', 'Salbutamol o salmeterol', 'salbutamol|salmeterol']
        ] },
        { t: 'Indirectos y mixtos', hojas: [
          ['Indirecto: libera catecolaminas de las terminales', 'Anfetamina', 'anfetamina'],
          ['Indirecto: bloquea la recaptación de norepinefrina', 'Cocaína', 'cocaina'],
          ['Acción mixta (cite uno)', 'Efedrina o seudoefedrina', 'efedrina|seudoefedrina|pseudoefedrina']
        ] }
      ]
    },
    {
      id: 'bloqueadores', clase: 'Clase 7', titulo: 'Antagonistas adrenérgicos', tipo: 'mapa',
      centro: 'Antagonistas adrenérgicos', sub: 'bloqueadores α y β',
      fuente: 'Clase 7 · Bloqueadores α y β-adrenérgicos',
      ramas: [
        { t: 'Bloqueadores α', hojas: [
          ['No selectivo y no competitivo; se usa en el feocromocitoma', 'Fenoxibenzamina', 'fenoxibenzamina'],
          ['Bloqueo competitivo α1 y α2; evita necrosis por extravasación de norepinefrina', 'Fentolamina', 'fentolamina'],
          ['α1 selectivos para la HTA (cite uno)', 'Prazosina, terazosina o doxazosina', 'prazosina|terazosina|doxazosina'],
          ['α1A: próstata y vejiga', 'Tamsulosina', 'tamsulosina'],
          ['Efecto adverso de la primera dosis', 'Hipotensión ortostática (síncope)', 'ortostatic|sincope|hipotension'],
          ['Bloqueador α2 selectivo', 'Yohimbina', 'yohimbina']
        ] },
        { t: 'Bloqueadores β', hojas: [
          ['Los nombres de casi todos terminan en', '-olol', 'olol'],
          ['Prototipo no selectivo (β1 y β2)', 'Propranolol', 'propranolol'],
          ['No selectivo en gotas para el glaucoma', 'Timolol', 'timolol'],
          ['Cardioselectivo β1 (cite uno)', 'Atenolol, metoprolol, bisoprolol, esmolol o nebivolol', 'atenolol|metoprolol|bisoprolol|esmolol|nebivolol|betaxolol'],
          ['Con actividad simpaticomimética intrínseca (cite uno)', 'Pindolol o acebutolol', 'pindolol|acebutolol'],
          ['Bloquean α y β (cite uno)', 'Labetalol o carvedilol', 'labetalol|carvedilol'],
          ['Contraindicados en', 'Asma y EPOC (broncoconstricción)', 'asma|epoc|broncoconstric']
        ] },
        { t: 'Usos de los β-bloqueadores', hojas: [
          ['Cite tres usos', 'Hipertensión, angina, arritmias, infarto, insuficiencia cardíaca, hipertiroidismo, glaucoma, migraña', 'hipertension|angina|arritmia|infarto|insuficiencia cardiaca|hipertiroid|glaucoma|migrana'],
          ['Esmolol: vía y duración', 'Intravenosa, semivida muy breve', 'intraven|breve|corta'],
          ['En el diabético con insulina pueden causar', 'Hipoglucemia prolongada (enmascaran la respuesta)', 'hipoglucemia|hipoglicemia'],
          ['Controla la tormenta tiroidea', 'Propranolol', 'propranolol']
        ] },
        { t: 'Sobre el neurotransmisor', hojas: [
          ['Bloquea el transporte a las vesículas y agota las aminas', 'Reserpina', 'reserpina'],
          ['Bloquea la liberación de norepinefrina', 'Guanetidina', 'guanetidina']
        ] }
      ]
    },

    /* ───────────── CLASE 8 ───────────── */
    {
      id: 'aines_via', clase: 'Clase 8', titulo: 'Ácido araquidónico y AINES', tipo: 'fluxo',
      fuente: 'Clase 8 · Biosíntesis de eicosanoides y mecanismo de acción de los AINES',
      pasos: [
        'Estímulos físicos, químicos o inflamatorios activan la [[fosfolipasa A2::fosfolipasa]]',
        'Se libera [[ácido araquidónico::araquidonic]] de los fosfolípidos de membrana',
        { cols: [
          { l: 'Vía de la ciclooxigenasa', s: [
            'Enzima: [[COX::cox|ciclooxigenasa]] (COX-1 y COX-2)',
            'Produce prostaglandinas, prostaciclina y [[tromboxano::tromboxano|txa2]]',
            { end: 'Los AINES [[inhiben::inhib|bloquean]] la COX: ↓ dolor, fiebre e inflamación' }
          ] },
          { l: 'Vía de la lipooxigenasa', s: [
            'Enzima: [[5-lipooxigenasa::lipooxigenasa|lox]]',
            'Produce [[leucotrienos::leucotrieno]]: broncoespasmo y migración de neutrófilos'
          ] }
        ], join: false }
      ]
    },
    {
      id: 'aines', clase: 'Clase 8', titulo: 'AINES: eicosanoides, efectos y fármacos', tipo: 'mapa',
      centro: 'AINES', sub: 'inhibidores de la ciclooxigenasa',
      fuente: 'Clase 8 · AINES: funciones de los eicosanoides, efectos adversos y clasificación',
      ramas: [
        { t: 'Eicosanoides', hojas: [
          ['Vasodilatador y antiagregante del endotelio', 'Prostaciclina (PGI2)', 'prostaciclina|pgi2'],
          ['Vasoconstrictor y proagregante de las plaquetas', 'Tromboxano A2', 'tromboxano|txa2'],
          ['Eleva la temperatura corporal y protege la mucosa gástrica', 'PGE2', 'pge2'],
          ['Estimulan la migración de neutrófilos y el broncoespasmo', 'Leucotrienos', 'leucotrien']
        ] },
        { t: 'Características', hojas: [
          ['Aumentar la dosis no aumenta el efecto: efecto...', 'Techo', 'techo'],
          ['La hipoalbuminemia... su efecto (alta unión a albúmina)', 'Aumenta', 'aument'],
          ['Atraviesan la barrera hematoencefálica y la...', 'Placenta', 'placenta']
        ] },
        { t: 'Efectos adversos', hojas: [
          ['Úlceras gastroduodenales por inhibición de la', 'COX-1', 'cox-1|cox1|cox 1'],
          ['Riesgo cardiovascular por inhibición selectiva de la', 'COX-2', 'cox-2|cox2|cox 2'],
          ['Órgano afectado por ↓ de prostaglandinas y flujo sanguíneo', 'Riñón', 'rinon|renal|nefro'],
          ['Broncoespasmo, urticaria y angioedema: reacciones de...', 'Hipersensibilidad', 'hipersens|alerg']
        ] },
        { t: 'Aspirina', hojas: [
          ['Se une a la COX con enlace', 'Covalente (irreversible)', 'covalent|irrevers'],
          ['Dosis antiagregante de mantenimiento', '70 a 120 mg', '70|120'],
          ['Contraindicada en niños por el riesgo de', 'Síndrome de Reye', 'reye'],
          ['Se suspende antes de una cirugía durante', 'Una semana', 'semana|7']
        ] },
        { t: 'Otros fármacos', hojas: [
          ['Derivado del ácido propiónico (cite uno)', 'Ibuprofeno o naproxeno', 'ibuprofeno|naproxeno'],
          ['Mayor efecto analgésico; puede sustituir a opioides por menos de 5 días', 'Ketorolac', 'ketorolac'],
          ['Indometacina: cierre del...', 'Conducto arterioso persistente', 'conducto|ductus'],
          ['Inhibidor selectivo de la COX-2', 'Celecoxib', 'celecoxib'],
          ['Pirazolona: riesgo de agranulocitosis y aplasia medular', 'Dipirona (metamizol)', 'dipirona|metamizol'],
          ['Analgésico y antipirético sin acción antiinflamatoria; hepatotóxico', 'Paracetamol', 'paracetamol']
        ] }
      ]
    },
    {
      id: 'intoxicaciones', clase: 'Clase 8', titulo: 'Intoxicación por AAS y por paracetamol', tipo: 'tabla',
      fuente: 'Clase 8 · Intoxicación con aspirina y con paracetamol',
      columnas: ['', 'Ácido acetilsalicílico (AAS)', 'Paracetamol'],
      filas: [
        ['Mecanismo o lesión', 'Hiperventilación, [[acidosis mixta::acidosis]] y desacople de la fosforilación oxidativa', 'Metabolito tóxico [[NAPQI::napqi]]: necrosis hepática [[centrolobulillar::centrolobul]]'],
        ['Primeros síntomas', 'Tinnitus, hipoacusia, [[hipertermia::hipertermia]] y vómitos', 'Etapa I (24 h): náuseas, dolor abdominal y [[anorexia::anorexia]]'],
        ['Evolución', 'Excitación del SNC → depresión → [[coma::coma]]', 'Etapa II: ↑ [[transaminasas::transaminasa]]; etapa III: encefalopatía, ictericia y coagulopatía'],
        ['Dosis', '—', 'Máximo diario: no exceder [[4 g::4]]; dosis tóxica de [[150 a 250 mg/kg::150|250]]'],
        ['Tratamiento', 'Carbón activado, [[alcalinización de la orina::alcaliniz]] y hemodiálisis', '[[N-acetilcisteína (NAC)::acetilcisteina|nac]]: previene la toxicidad del NAPQI']
      ]
    },
    {
      id: 'opioides', clase: 'Clase 8', titulo: 'Opioides y escalera analgésica', tipo: 'mapa',
      centro: 'Opioides', sub: 'analgésicos mayores',
      fuente: 'Clase 8 · Fármacos del dolor: opioides',
      ramas: [
        { t: 'Origen', hojas: [
          ['Planta de la que se extrae el opio', 'Amapola (Papaver somniferum)', 'amapola|papaver'],
          ['Natural (cite uno)', 'Morfina o codeína', 'morfina|codeina|papaverina'],
          ['Semisintético (cite uno)', 'Heroína, buprenorfina u oxicodona', 'heroina|buprenorfina|oxicodona'],
          ['Sintético (cite uno)', 'Fentanilo, meperidina, metadona o tramadol', 'fentanil|meperidina|metadona|tramadol|remifentanil'],
          ['Péptidos opioides endógenos (cite uno)', 'Encefalinas, endorfinas o dinorfinas', 'encefalina|endorfina|dinorfina']
        ] },
        { t: 'Mecanismo', hojas: [
          ['Receptor principal de la analgesia', 'μ (mu)', 'mu|μ'],
          ['Presináptico: bloquea canales de... y la liberación del neurotransmisor', 'Calcio', 'calcio'],
          ['Postsináptico: abre canales de... y causa hiperpolarización', 'Potasio', 'potasio'],
          ['Subtipo mu responsable de la depresión respiratoria', 'Mu-2', 'mu-2|mu2|mu 2'],
          ['Antagonista que revierte sus efectos', 'Naloxona', 'naloxona'],
          ['Agonista parcial', 'Buprenorfina', 'buprenorfina']
        ] },
        { t: 'Efectos', hojas: [
          ['Pupila', 'Miosis', 'miosis'],
          ['Ventilación', 'Depresión respiratoria (dosis dependiente)', 'respirat'],
          ['Centro de la tos', 'Lo inhiben', 'inhib|deprim|supr'],
          ['Tubo digestivo', 'Retrasan el vaciado gástrico; ↑ presión del esfínter de Oddi', 'vaciado|oddi|estren|motilidad'],
          ['Náuseas y vómitos por estímulo de la zona...', 'Quimiorreceptora', 'quimiorreceptor'],
          ['Liberan histamina: hipotensión...', 'Ortostática', 'ortostatic']
        ] },
        { t: 'Dolor', hojas: [
          ['Dolor ilimitado en el tiempo y con componente psicológico (cáncer)', 'Crónico', 'cronic'],
          ['Dolor limitado en el tiempo', 'Agudo', 'agudo'],
          ['Escalera OMS, escalón 1', 'AINES (± coadyuvantes)', 'aine'],
          ['Escalera OMS, escalón 2', 'Opioides débiles', 'debil'],
          ['Escalera OMS, escalón 3', 'Opioides fuertes', 'fuerte']
        ] }
      ]
    },

    /* ───────────── CLASE 9 ───────────── */
    {
      id: 'corticoides', clase: 'Clase 9', titulo: 'Corticoides', tipo: 'mapa',
      centro: 'Corticoides', sub: 'hormonas esteroideas de la corteza suprarrenal',
      fuente: 'Clase 9 · Antiinflamatorios esteroideos (Unidad III)',
      ramas: [
        { t: 'Corteza suprarrenal', hojas: [
          ['Zona glomerular secreta', 'Mineralocorticoides (aldosterona)', 'mineralocorticoid|aldosterona'],
          ['Zona fascicular secreta', 'Glucocorticoides (cortisol)', 'glucocorticoid|cortisol'],
          ['Zona reticular secreta', 'Andrógenos', 'androgen'],
          ['Insuficiencia suprarrenal: hiperpigmentación e hipotensión', 'Enfermedad de Addison', 'addison'],
          ['Exceso de cortisol: cara de luna llena y estrías', 'Síndrome de Cushing', 'cushing']
        ] },
        { t: 'Mecanismo', hojas: [
          ['Se unen a receptores...', 'Intracelulares (citoplasmáticos)', 'citoplasm|intracelular'],
          ['Efecto principal (lento)', 'Genómico: modifican la expresión génica', 'genomic|expresion|gen'],
          ['Factor de transcripción proinflamatorio con el que interfieren', 'NF-κB', 'nf-κ|nf-k|nfk|nfκ|factor nuclear'],
          ['Mediadores cuya síntesis frenan (cite uno)', 'Prostaglandinas, leucotrienos o citocinas', 'prostaglandina|leucotrieno|citocina']
        ] },
        { t: 'Farmacocinética', hojas: [
          ['Cortisona y prednisona son inactivas: se activan en el', 'Hígado', 'higado|hepat'],
          ['La prednisona se transforma en', 'Prednisolona', 'prednisolona'],
          ['Por eso se evitan en la insuficiencia...', 'Hepática', 'hepatic']
        ] },
        { t: 'Efectos adversos', hojas: [
          ['Metabólico y endocrino (cite uno)', 'Hiperglucemia, Cushing iatrogénico, ↑ PA o ↑ colesterol', 'hiperglu|cushing|presion|hta|colesterol'],
          ['Hueso y músculo', 'Osteoporosis y miopatía', 'osteoporosis|miopat'],
          ['Ojo (cite uno)', 'Cataratas o glaucoma', 'catarata|glaucoma'],
          ['Sistema inmunitario', 'Mayor riesgo de infecciones', 'infecc'],
          ['Electrolitos', 'Alcalosis hipopotasémica y edemas', 'hipopotas|alcalosis|edema'],
          ['Si se suspenden bruscamente', 'Insuficiencia suprarrenal aguda', 'suprarrenal|addison']
        ] },
        { t: 'Usos', hojas: [
          ['Insuficiencia suprarrenal crónica (sustitución)', 'Hidrocortisona', 'hidrocortisona'],
          ['Asma persistente: corticoide inhalado (cite uno)', 'Budesonida o fluticasona', 'budesonida|budesonide|fluticasona'],
          ['En la anafilaxia grave se da primero', 'Adrenalina', 'adrenalina|epinefrina'],
          ['Trasplante de órganos', 'Prednisona + otro inmunosupresor', 'prednisona|inmunosupres'],
          ['Corticoide de elección en niños (menor supresión del crecimiento)', 'Deflazacort', 'deflazacort']
        ] }
      ]
    },
    {
      id: 'potencia_cortico', clase: 'Clase 9', titulo: 'Corticoides: duración de acción', tipo: 'tabla',
      fuente: 'Clase 9 · Potencia glucocorticoide y mineralocorticoide, vida media',
      columnas: ['Grupo', 'Ejemplos (cite uno)', 'Rasgo'],
      filas: [
        ['Acción corta (8-12 h)', '[[Hidrocortisona::hidrocortisona|cortisol|cortisona]]', 'Mayor acción [[mineralocorticoide::mineralocorticoid]] entre los grupos'],
        ['Acción intermedia (12-36 h)', '[[Prednisolona::prednisolona|prednisona|metilprednisolona|triamcinolona|deflazacort]]', 'Acción mineralocorticoide [[baja::baja|poca|menor|minim]]'],
        ['Acción prolongada', '[[Dexametasona::dexametasona|betametasona]]', 'Mayor potencia [[glucocorticoide::glucocorticoid]]; acción mineralocorticoide casi nula'],
        ['Profármacos inactivos', 'Cortisona y [[prednisona::prednisona]]', 'Se activan en el hígado a cortisol y [[prednisolona::prednisolona]]']
      ]
    }

  ]
};
