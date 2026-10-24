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
      id: 'conceptos', clase: 'Clase 1', titulo: 'Conceptos básicos de farmacología', tipo: 'mapa', sl: [[1,3,22]],
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
      id: 'clasificacion', clase: 'Clase 1', titulo: 'Clasificación de fármacos según su función', tipo: 'tabla', sl: [[1,23,36]],
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
      id: 'ladme', clase: 'Clase 2', titulo: 'LADME: el viaje del fármaco', tipo: 'fluxo', sl: [[2,4,8]],
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
      id: 'absorcion', clase: 'Clase 2', titulo: 'Absorción y biodisponibilidad', tipo: 'mapa', sl: [[2,12,15],[2,37,45]],
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
      id: 'vias', clase: 'Clase 2', titulo: 'Vías de administración', tipo: 'tabla', sl: [[2,16,36]],
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
      id: 'inyecciones', clase: 'Clase 2', titulo: 'Inyecciones: ángulo, sitio y volumen', tipo: 'tabla', sl: [[2,24,28]],
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
      id: 'cinetica', clase: 'Clase 2', titulo: 'Metabolismo y eliminación', tipo: 'mapa', sl: [[2,50,57]],
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
      id: 'curva', clase: 'Clase 2', titulo: 'Curva de niveles plasmáticos', tipo: 'mapa', sl: [[2,9,11]],
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
      id: 'receptores', clase: 'Clase 3', titulo: 'Receptores farmacológicos', tipo: 'mapa', sl: [[3,4,22]],
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
      id: 'agonistas', clase: 'Clase 3', titulo: 'Agonistas y antagonistas', tipo: 'tabla', sl: [[3,23,33]],
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
      id: 'dosis', clase: 'Clase 3', titulo: 'Dosis-respuesta: afinidad, potencia y eficacia', tipo: 'mapa', sl: [[3,36,41]],
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
          ['Concentración que produce el 50% del efecto máximo', 'Concentración eficaz media (CE50)', 'ec50|ce50|de50']
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
      id: 'farmacogenetica', clase: 'Clase 4', titulo: 'Farmacogenética', tipo: 'mapa', sl: [[4,4,34]],
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
      id: 'ram_tipos', clase: 'Clase 5', titulo: 'Reacciones adversas: tipos A a E', tipo: 'tabla', sl: [[5,8,10]],
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
      id: 'ram_terminos', clase: 'Clase 5', titulo: 'Reacciones adversas: términos y mecanismos', tipo: 'mapa', sl: [[5,4,7],[5,11,21]],
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
      id: 'hipersensibilidad', clase: 'Clase 5', titulo: 'Hipersensibilidad a fármacos', tipo: 'tabla', sl: [[5,22,30]],
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
      id: 'farmacovigilancia', clase: 'Clase 5', titulo: 'Farmacovigilancia', tipo: 'fluxo', sl: [[5,58,62]],
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
      id: 'sna', clase: 'Clase 6', titulo: 'Sistema nervioso autónomo: simpático y parasimpático', tipo: 'tabla', sl: [[6,4,15],[7,4,7]],
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
      id: 'nic_mus', clase: 'Clase 6', titulo: 'Receptores nicotínicos y muscarínicos', tipo: 'tabla', sl: [[6,29,40]],
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
      id: 'colinergicos', clase: 'Clase 6', titulo: 'Agonistas colinérgicos y anticolinesterásicos', tipo: 'mapa', sl: [[6,41,67]],
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
      id: 'antimuscarinicos', clase: 'Clase 6', titulo: 'Antimuscarínicos', tipo: 'mapa', sl: [[6,68,97]],
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
      id: 'noradrenalina', clase: 'Clase 7', titulo: 'Neurona adrenérgica: de la tirosina a la respuesta', tipo: 'fluxo', sl: [[7,8,12]],
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
      id: 'adrenoceptores', clase: 'Clase 7', titulo: 'Receptores adrenérgicos', tipo: 'tabla', sl: [[7,13,16],[7,20,20]],
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
      id: 'adrenergicos', clase: 'Clase 7', titulo: 'Agonistas adrenérgicos', tipo: 'mapa', sl: [[7,17,38]],
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
          ['Vía preferida en anafilaxia ambulatoria', 'Intramuscular (cara anterolateral del muslo)', 'intramuscular|muslo']
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
      id: 'bloqueadores', clase: 'Clase 7', titulo: 'Antagonistas adrenérgicos', tipo: 'mapa', sl: [[7,39,65]],
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
      id: 'aines_via', clase: 'Clase 8', titulo: 'Ácido araquidónico y AINES', tipo: 'fluxo', sl: [[8]],
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
      id: 'aines', clase: 'Clase 8', titulo: 'AINES: eicosanoides, efectos y fármacos', tipo: 'mapa', sl: [[8]],
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
      id: 'intoxicaciones', clase: 'Clase 8', titulo: 'Intoxicación por AAS y por paracetamol', tipo: 'tabla', sl: [[8]],
      fuente: 'Clase 8 · Intoxicación con aspirina y con paracetamol',
      columnas: ['', 'Ácido acetilsalicílico (AAS)', 'Paracetamol'],
      filas: [
        ['Mecanismo o lesión', 'Hiperventilación, [[alcalosis respiratoria y acidosis metabólica::alcalosis;acidosis]] y desacople de la fosforilación oxidativa', 'Metabolito tóxico [[NAPQI::napqi]]: necrosis hepática [[centrolobulillar::centrolobul]]'],
        ['Primeros síntomas', 'Tinnitus, hipoacusia, [[hipertermia::hipertermia]] y vómitos', 'Etapa I (24 h): náuseas, dolor abdominal y [[anorexia::anorexia]]'],
        ['Evolución', 'Excitación del SNC → depresión → [[coma::coma]]', 'Etapa II: ↑ [[transaminasas::transaminasa]]; etapa III: encefalopatía, ictericia y coagulopatía'],
        ['Dosis', '—', 'Máximo diario: no exceder [[4 g::4]]; dosis tóxica de [[150 a 250 mg/kg::150|250]]'],
        ['Tratamiento', 'Carbón activado, [[alcalinización de la orina::alcaliniz]] y hemodiálisis', '[[N-acetilcisteína (NAC)::acetilcisteina|nac]]: previene la toxicidad del NAPQI']
      ]
    },
    {
      id: 'opioides', clase: 'Clase 8', titulo: 'Opioides y escalera analgésica', tipo: 'mapa', sl: [[8]],
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
      id: 'corticoides', clase: 'Clase 9', titulo: 'Corticoides', tipo: 'mapa', sl: [[9,5,41]],
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
          ['Tipo de receptores a los que se unen', 'Intracelulares (citoplasmáticos)', 'citoplasm|intracelular'],
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
      id: 'potencia_cortico', clase: 'Clase 9', titulo: 'Corticoides: duración de acción', tipo: 'tabla', sl: [[9,25,31]],
      fuente: 'Clase 9 · Potencia glucocorticoide y mineralocorticoide, vida media',
      columnas: ['Grupo', 'Ejemplos (cite uno)', 'Rasgo'],
      filas: [
        ['Acción corta (8-12 h)', '[[Hidrocortisona::hidrocortisona|cortisol|cortisona]]', 'Mayor acción [[mineralocorticoide::mineralocorticoid]] entre los grupos'],
        ['Acción intermedia (12-36 h)', '[[Prednisolona::prednisolona|prednisona|metilprednisolona|triamcinolona|deflazacort]]', 'Acción mineralocorticoide [[baja::baja|poca|menor|minim]]'],
        ['Acción prolongada', '[[Dexametasona::dexametasona|betametasona]]', 'Mayor potencia [[glucocorticoide::glucocorticoid]]; acción mineralocorticoide casi nula'],
        ['Profármacos inactivos', 'Cortisona y [[prednisona::prednisona]]', 'Se activan en el hígado a cortisol y [[prednisolona::prednisolona]]']
      ]
    },

    /* ───────────── CASOS CLÍNICOS (nível de prova) ───────────── */
    {
      id: 'casos_farma_1', clase: 'Clases 1 a 5', titulo: 'Casos clínicos: vías, cinética, farmacogenética y reacciones adversas', tipo: 'casos',
      resumen: 'Elegir la vía, razonar la cinética y reconocer la reacción adversa a partir del cuadro clínico.',
      fuente: 'Actividades de las clases 1 y 2 (Dr. Giménez) y casos construidos con el contenido de las clases 4 y 5',
      casos: [
        ['Paciente inconsciente y con convulsiones.',
         '¿Qué vía de administración es adecuada?',
         'Intravenosa (o rectal si no hay acceso venoso)', 'intraven|endoven|rectal',
         'La vía IV da efecto inmediato y no depende de la absorción. La rectal es útil si el paciente está inconsciente o vomita.'],
        ['Paciente con crisis asmática aguda.',
         '¿Qué vía conviene y por qué?',
         'Inhalatoria: efecto local rápido con menos efectos sistémicos', 'inhal',
         'El fármaco llega directo al sitio de acción (ej.: salbutamol) y se usan dosis menores.'],
        ['Paciente que inicia un tratamiento antihipertensivo crónico.',
         '¿Qué vía de administración es la más adecuada?',
         'Oral', 'oral',
         'Es la vía más segura, conveniente y económica, y el paciente la maneja solo.'],
        ['Paciente con meningitis bacteriana grave.',
         '¿Qué vía necesita y qué obstáculo hay para llegar al sistema nervioso central?',
         'Intravenosa; la barrera hematoencefálica retrasa el paso (la vía intratecal se reserva para efectos locales y rápidos)', 'intraven|endoven|intratecal;barrera|bhe|hematoencefal',
         'Se necesita inicio rápido y control de la dosis. Cuando hace falta efecto local en el SNC se puede inyectar en el líquido cefalorraquídeo.'],
        ['Niño con vómitos persistentes que necesita un antipirético.',
         '¿Qué vía es una buena opción?',
         'Rectal (supositorio)', 'rectal|supositorio',
         'Es útil cuando el fármaco induce vómito por vía oral. Evita parcialmente el primer paso, pero la absorción es errática.'],
        ['Se administran 100 mg de un fármaco por vía oral y llegan sin cambios a la circulación sistémica 70 mg.',
         '¿Cuál es la biodisponibilidad? ¿Qué proceso explica la pérdida?',
         '70% (0,7); metabolismo de primer paso (y otras pérdidas en la absorción)', '70|0,7|0.7;primer paso|hepatic|higado',
         'La vía IV tiene biodisponibilidad de 100% porque no requiere absorción.'],
        ['Afirmación: "La vía intravenosa evita el metabolismo de primer paso."',
         '¿Verdadero o falso?',
         'a) Verdadero', 'a',
         'El fármaco entra directo a la circulación sistémica, sin pasar por la circulación portal.',
         ['a) Verdadero', 'b) Falso']],
        ['Afirmación: "Los fármacos liposolubles se eliminan fácilmente por el riñón sin metabolizarse."',
         '¿Verdadero o falso?',
         'b) Falso', 'b',
         'Los liposolubles poco ionizados se reabsorben por difusión en el túbulo; necesitan transformarse en metabolitos polares para eliminarse.',
         ['a) Verdadero', 'b) Falso']],
        ['Afirmación: "La cinética de orden cero elimina un porcentaje fijo por unidad de tiempo."',
         '¿Verdadero o falso?',
         'b) Falso', 'b',
         'Eso es la cinética de primer orden. La de orden cero elimina una cantidad fija porque las enzimas están saturadas.',
         ['a) Verdadero', 'b) Falso']],
        ['Paciente con sobredosis de fenobarbital, un ácido débil.',
         '¿Qué maniobra aumenta su eliminación renal y por qué?',
         'Alcalinizar la orina con bicarbonato: mantiene el fármaco ionizado y disminuye su reabsorción (atrapamiento iónico)', 'alcalin|bicarbonato;ioniz|atrapamiento|reabsorc',
         'La fracción ionizada es hidrosoluble y no se reabsorbe. Los ácidos débiles se eliminan alcalinizando la orina; las bases débiles, acidificándola.'],
        ['Paciente en tratamiento con fenitoína. Un pequeño aumento de la dosis produjo nistagmo, ataxia y confusión.',
         '¿Qué tipo de cinética explica la toxicidad?',
         'Cinética de orden cero: las enzimas están saturadas y la concentración sube de forma desproporcionada', 'cero;satur|desproporc|fija|constante',
         'La vida media no es constante y pequeños aumentos de dosis producen grandes aumentos de concentración. Pasa también con el etanol.'],
        ['Paciente con tuberculosis tratado con isoniazida. A las pocas semanas tiene hormigueo en las manos y debilidad.',
         '¿Qué característica genética explica la neuropatía?',
         'Acetilador lento (N-acetiltransferasa): acumula isoniazida', 'acetilador|acetiltransferasa;lent',
         'La acetilación lenta es recesiva. Los acetiladores lentos también tienen más riesgo de lupus inducido por hidralazina.'],
        ['Paciente anestesiado que recibió succinilcolina permanece paralizado y sin respirar durante horas.',
         '¿Qué deficiencia enzimática explica la reacción?',
         'Pseudocolinesterasa defectuosa (reacción idiosincrásica, autosómica recesiva)', 'colinesterasa',
         'Normalmente el efecto dura 3 a 4 minutos porque la pseudocolinesterasa degrada el fármaco.'],
        ['Paciente con déficit de G6PD que recibe primaquina presenta anemia, ictericia y orina oscura.',
         '¿Qué reacción ocurre y por qué?',
         'Hemólisis: los eritrocitos sin G6PD no soportan el estrés oxidativo', 'hemolisis;oxidativ|g6pd|glucosa',
         'Las sulfamidas y la nitrofurantoína también la desencadenan. Es una reacción de tipo B, no dependiente de la dosis.'],
        ['Adolescente con mononucleosis infecciosa (virus de Epstein-Barr) recibe ampicilina y a los 7-12 días presenta un exantema maculopapular pruriginoso.',
         '¿Se trata de una alergia verdadera a la penicilina?',
         'No: es una interacción fármaco-infección viral (el rash aparece hasta en el 95%)', 'interaccion|no es alergia|no es una alergia|no es alergica|no alergia|no es verdadera|falsa alergia|pseudoalerg',
         'No es una reacción inmunológica por sensibilización previa, por lo que no se contraindica la penicilina de por vida.'],
        ['Niño con varicela recibe ácido acetilsalicílico como antitérmico y desarrolla vómitos, encefalopatía y daño hepático.',
         '¿Qué síndrome es y qué se aprende?',
         'Síndrome de Reye; la aspirina no se usa como antitérmico en niños', 'reye;aspirina|acido acetilsalicilico|aas',
         'Es una interacción con una infección viral (varicela o influenza).'],
        ['Niño asmático con una infección viral respiratoria que usa teofilina presenta náuseas, taquicardia y convulsiones.',
         '¿Cómo se explica la toxicidad?',
         'El interferón de la infección viral inhibe el citocromo P450: baja el aclaramiento y sube la vida media de la teofilina', 'p450|citocromo|aclaramiento|vida media;interferon|viral|infeccion',
         'El resultado es acumulación del fármaco. Es una interacción farmacocinética entre fármaco e infección.']
      ]
    }
,
    /* ───────────── CASOS CLÍNICOS (nível de prova) ───────────── */
    {
      id: 'casos_farma_2', clase: 'Clases 6 a 9', titulo: 'Casos clínicos: colinérgicos, adrenérgicos, AINES, opioides y corticoides', tipo: 'casos',
      resumen: 'Diagnóstico farmacológico: reconocer el cuadro y elegir el fármaco, el antídoto o el riesgo.',
      fuente: 'Contenido de las clases 6 a 9 (Dr. Giménez), aplicado a cuadros clínicos',
      casos: [
        ['Agricultor que fumigó con un insecticida y presenta salivación, sudoración, miosis, broncoespasmo y diarrea.',
         '¿Qué intoxicación es y cuáles son los tres pilares del tratamiento?',
         'Organofosforados: medidas de soporte, atropina y oximas (pralidoxima) tempranas', 'organofosforad;atropina;oxima|pralidoxima|obidoxima',
         'Inhiben la colinesterasa de forma irreversible. La atropina controla los síntomas muscarínicos; las oximas reactivan la enzima solo si se dan temprano.'],
        ['Paciente que a los 45 minutos de comer setas del género Inocybe presenta sudoración, salivación, vómitos y diarrea.',
         '¿Qué sustancia causa el cuadro y cuál es el antídoto?',
         'Muscarina; atropina', 'muscarin;atropina',
         'Es una estimulación muscarínica excesiva. La atropina bloquea los receptores muscarínicos.'],
        ['Paciente en tratamiento con antidepresivos tricíclicos que llega con boca seca, piel seca, midriasis, taquicardia y confusión.',
         '¿Qué síndrome es y qué fármaco lo revierte?',
         'Síndrome atropínico (anticolinérgico); fisostigmina', 'atropin|anticolinerg;fisostigmin',
         'La fisostigmina es un anticolinesterásico terciario que atraviesa la barrera hematoencefálica y actúa también en el SNC.'],
        ['Mujer con debilidad muscular y fatiga intensa. Tiene anticuerpos que bloquean los receptores nicotínicos de la placa motora.',
         '¿Qué enfermedad es, qué fármaco de acción corta sirve para el diagnóstico y cuál se usa de forma crónica?',
         'Miastenia gravis; edrofonio; piridostigmina', 'miastenia;edrofonio;piridostigmina',
         'Los anticolinesterásicos aumentan la acetilcolina en la placa. El edrofonio también ayuda a distinguir crisis miasténica de crisis colinérgica.'],
        ['Mujer en el posparto que no logra orinar. La vejiga no se contrae y no hay obstrucción mecánica.',
         '¿Qué fármaco colinérgico puede estimular la micción?',
         'Betanecol (o neostigmina)', 'betanecol|neostigmina',
         'Estimulan la contracción del detrusor. Solo se usan si no hay obstrucción mecánica.'],
        ['Paciente con glaucoma de ángulo cerrado al que se desea dilatar la pupila para un examen.',
         '¿Qué familia de fármacos está contraindicada y por qué?',
         'Antimuscarínicos (atropina): la midriasis dificulta el drenaje del humor acuoso y sube la presión intraocular', 'antimuscarin|atropin|anticolinerg;drenaje|presion intraocular|humor',
         'Pueden desencadenar un ataque agudo de glaucoma. En cambio, la pilocarpina provoca miosis y favorece el drenaje.'],
        ['Mujer picada por una abeja entra en shock anafiláctico.',
         '¿Qué fármaco, por qué vía en el ámbito ambulatorio y por qué receptores actúa (broncodilatación e inotropismo)?',
         'Epinefrina por vía intramuscular (muslo); receptores β2 y β1', 'epinefrina|adrenalina;intramuscular|muslo;beta 2|β2|beta2|b2 y',
         'La vía IM tiene absorción rápida. La epinefrina también inhibe la liberación de mediadores de los mastocitos.'],
        ['Durante una infusión de norepinefrina aparecen palidez y esfacelación de la piel a lo largo de la vena.',
         '¿Qué ocurrió y qué fármaco se usa como antídoto local?',
         'Extravasación con necrosis por vasoconstricción; fentolamina', 'extravasac;fentolamina',
         'La fentolamina bloquea los receptores α1 y α2 y evita la necrosis dérmica.'],
        ['Paciente con sudoración e hipertensión paroxística por un tumor secretor de catecolaminas de la médula suprarrenal.',
         '¿Qué tumor es y qué bloqueador α no competitivo se usa?',
         'Feocromocitoma; fenoxibenzamina', 'feocromocitoma;fenoxibenzamina',
         'La fentolamina se usa para el diagnóstico y el manejo a corto plazo.'],
        ['Hombre asmático al que se le indica propranolol para la hipertensión y presenta broncoespasmo.',
         '¿Qué ocurrió y qué grupo sería más seguro?',
         'Bloqueo β2 no selectivo; un β-bloqueador cardioselectivo (β1) como metoprolol o atenolol, con vigilancia', 'beta 2|β2|beta2|no selectivo;cardioselectiv|beta 1|β1|atenolol|metoprolol|bisoprolol',
         'La cardioselectividad se pierde a dosis altas, por eso hay que vigilar la función respiratoria.'],
        ['Gestante con hipertensión arterial.',
         '¿Qué fármaco de acción central es de elección y cuál es una alternativa que bloquea α y β?',
         'Alfametildopa; labetalol', 'metildopa;labetalol',
         'La metildopa actúa como falso neurotransmisor sobre receptores α2 centrales. El labetalol también se usa en las emergencias hipertensivas.'],
        ['Paciente diabético que usa insulina y recibe propranolol.',
         '¿Qué riesgo metabólico aumenta?',
         'Hipoglucemia prolongada, porque el bloqueo β atenúa la respuesta normal a la hipoglucemia', 'hipoglucemia|hipoglicemia',
         'El bloqueo β reduce la glucogenólisis y la secreción de glucagón. Hay que vigilar la glucosa.'],
        ['Paciente que ingirió una dosis tóxica de paracetamol (150 a 250 mg/kg). A las 24 h tiene náuseas y dolor abdominal.',
         '¿Qué metabolito causa la lesión, qué lesión produce y cuál es el antídoto?',
         'NAPQI; necrosis hepática centrolobulillar; N-acetilcisteína', 'napqi;centrolobul|hepatica|hepatocel;acetilcisteina|nac',
         'La NAC previene la toxicidad del NAPQI y aumenta la capacidad de detoxificación. Se miden niveles seriados de paracetamol.'],
        ['Paciente con intoxicación por aspirina: hiperventilación, tinnitus e hipertermia.',
         'Nombre medidas para aumentar la eliminación.',
         'Alcalinizar la orina; carbón activado; hemodiálisis', 'alcaliniz|carbon|hemodialisis',
         'Además se dan medidas de sostén, lavado gástrico y se mide el nivel de salicilato en sangre.'],
        ['Paciente con insuficiencia cardíaca, insuficiencia renal o ascitis que toma AINES.',
         '¿Qué riesgo renal corre y por qué?',
         'Insuficiencia renal: disminuyen las prostaglandinas vasodilatadoras y cae el flujo sanguíneo renal', 'renal|rinon|filtrac|flujo;prostaglandina|pg|vasodilat',
         'En estos pacientes el flujo renal depende de las prostaglandinas. La inhibición de la COX produce vasoconstricción renal.'],
        ['Paciente con un opioide que llega con miosis puntiforme y una frecuencia respiratoria de 6 por minuto.',
         '¿Qué receptor explica la depresión respiratoria y cuál es el antídoto?',
         'Receptor μ (subtipo mu-2); naloxona', 'receptor mu|mu-2|mu2|μ|mu 2;naloxona',
         'La naloxona es un antagonista que revierte los efectos indeseables. El subtipo mu-1 produce la analgesia.'],
        ['Paciente que tomaba prednisona de forma crónica la suspende bruscamente y presenta hipotensión, debilidad y vómitos.',
         '¿Qué ocurre?',
         'Insuficiencia suprarrenal aguda por supresión del eje hipotálamo-hipófisis-suprarrenal', 'suprarrenal;aguda|supresion|eje',
         'Por eso los corticoides no se suspenden bruscamente: se reduce la dosis de forma gradual.'],
        ['Paciente con cirrosis hepática que necesita un glucocorticoide.',
         '¿Cuáles debe evitar y cuáles usar?',
         'Evitar cortisona y prednisona (profármacos que necesitan activación hepática); usar prednisolona o hidrocortisona', 'prednisona|cortisona;hepatic|higado|activac|profarmaco|inactiv',
         'La cortisona y la prednisona son inactivas: el hígado las convierte en cortisol y prednisolona.'],
        ['Niño que necesita un corticoide durante mucho tiempo y preocupa la supresión del crecimiento.',
         '¿Qué corticoide es la primera elección?',
         'Deflazacort', 'deflazacort',
         'Es un corticoide de acción intermedia con menor repercusión sobre el crecimiento.'],
        ['Paciente con enfermedad de Addison tratado con hidrocortisona (20 a 30 mg por día).',
         '¿Cómo se reparte la dosis durante el día?',
         '2/3 por la mañana y 1/3 por la tarde', '2/3;1/3|manana;tarde',
         'Imita el ritmo normal del cortisol.']
      ]
    },

    /* ───────────── NIVEL 3: SIMULADO ───────────── */
    {
      id: 'simulado_farma', clase: 'Clases 1 a 9', titulo: 'Simulado de prueba: Farmacología I', tipo: 'casos', cronometro: true,
      resumen: 'Preguntas de opción múltiple como en la prueba. Use el cronómetro y corrija al final.',
      fuente: 'Contenido de las clases 2 a 9 (Dr. Giménez): farmacocinética, farmacodinámica, farmacogenética, RAM, SNA, adrenérgicos, AINES, opioides y corticoides',
      casos: [
        ['',
         'Un fármaco se administra por vía oral: se ingieren 100 mg y llegan 70 mg sin cambios a la circulación sistémica. ¿Cuál es la biodisponibilidad?',
         'b) 70% (0,7)', 'b',
         'La biodisponibilidad es la fracción de la forma inalterada del fármaco que llega a la circulación sistémica (Clase 2).',
         ['a) 30% (0,3)', 'b) 70% (0,7)', 'c) 100% (1,0)', 'd) 170%']],
        ['',
         '¿Qué mecanismo de absorción usa la gran mayoría de los fármacos?',
         'a) Difusión pasiva', 'a',
         'La difusión pasiva sigue el gradiente de concentración, no necesita transportador, no se satura y no gasta energía.',
         ['a) Difusión pasiva', 'b) Transporte activo primario', 'c) Endocitosis', 'd) Difusión facilitada']],
        ['Un fármaco ácido débil se administra por vía oral.',
         '¿Dónde se absorbe mejor?',
         'c) En el estómago, porque en pH ácido está más no ionizado', 'c',
         'Los fármacos se absorben mejor no ionizados: ácidos débiles en el estómago (pH ácido) y bases débiles en el intestino (pH alcalino).',
         ['a) En el intestino, porque el pH alcalino lo deja no ionizado', 'b) Igual en todo el tubo digestivo', 'c) En el estómago, porque en pH ácido está más no ionizado', 'd) No se absorbe por vía oral']],
        ['Paciente en urgencias que requiere efecto inmediato de un fármaco.',
         '¿Qué vía parenteral es la más usada y de acción inmediata?',
         'd) Intravenosa', 'd',
         'La vía IV es la vía parenteral más común y tiene efecto inmediato; evita el metabolismo de primer paso.',
         ['a) Subcutánea', 'b) Rectal', 'c) Oral', 'd) Intravenosa']],
        ['',
         'Un agonista parcial como la buprenorfina se une al receptor μ. ¿Qué lo caracteriza?',
         'a) Alta afinidad pero menor eficacia: nunca alcanza el efecto máximo', 'a',
         'Produce efecto pero nunca alcanza el máximo aunque ocupe todos los receptores; con morfina puede disminuir su efecto.',
         ['a) Alta afinidad pero menor eficacia: nunca alcanza el efecto máximo', 'b) Baja afinidad y eficacia máxima', 'c) Reduce la actividad basal del receptor', 'd) Se une a otro sitio y bloquea el receptor']],
        ['Un antagonista se une al mismo sitio que el agonista de forma reversible.',
         '¿Cómo se supera el bloqueo?',
         'b) Aumentando la concentración del agonista', 'b',
         'En el antagonismo competitivo, más agonista puede superar la inhibición.',
         ['a) No se puede superar', 'b) Aumentando la concentración del agonista', 'c) Aumentando la dosis del antagonista', 'd) Con un antagonista alostérico']],
        ['Tras pocas dosis de un fármaco, su efecto disminuye de forma súbita.',
         '¿Cómo se llama este fenómeno?',
         'c) Taquifilaxia', 'c',
         'La taquifilaxia es la disminución súbita del efecto tras pocas dosis (tolerancia rápida). La tolerancia es gradual, de días o semanas.',
         ['a) Tolerancia', 'b) Acumulación', 'c) Taquifilaxia', 'd) Intolerancia']],
        ['Paciente en tratamiento con warfarina que presenta hemorragias con dosis habituales. Se identifica un polimorfismo.',
         '¿Qué enzima metaboliza la warfarina a un metabolito inactivo y qué riesgo tienen los metabolizadores lentos?',
         'a) CYP2C9; riesgo de hemorragia', 'a',
         'La CYP2C9 inactiva la warfarina; los alelos *2 y *3 producen metabolizadores lentos con riesgo de hemorragia.',
         ['a) CYP2C9; riesgo de hemorragia', 'b) CYP2D6; riesgo de trombosis', 'c) CYP2C19; riesgo de infección', 'd) CYP3A4; sin riesgo']],
        ['Un paciente presenta una reacción adversa proporcional a la dosis y relacionada con el mecanismo de acción del fármaco.',
         '¿Qué tipo de RAM es?',
         'd) Tipo A (aumentada)', 'd',
         'Las RAM tipo A son predecibles y dependientes de la dosis; las tipo B son impredecibles, alérgicas o idiosincráticas.',
         ['a) Tipo B (bizarra)', 'b) Tipo C (crónica)', 'c) Tipo E (fin de uso)', 'd) Tipo A (aumentada)']],
        ['Paciente hipertenso que suspende bruscamente su medicamento y presenta una reacción de rebote.',
         '¿Qué tipo de RAM es?',
         'a) Tipo E (end of use)', 'a',
         'Las RAM tipo E se asocian a la suspensión brusca del medicamento.',
         ['a) Tipo E (end of use)', 'b) Tipo A', 'c) Tipo D (diferida)', 'd) Tipo C (crónica)']],
        ['Paciente con urticaria y anafilaxia minutos después de recibir un antibiótico.',
         '¿Qué tipo de hipersensibilidad es y qué la media?',
         'b) Tipo I; IgE y mastocitos que liberan histamina', 'b',
         'La hipersensibilidad tipo I es inmediata (minutos): IgE y mastocitos liberan histamina. La tipo IV es tardía (48-72 h) y mediada por linfocitos T.',
         ['a) Tipo II; IgG contra células', 'b) Tipo I; IgE y mastocitos que liberan histamina', 'c) Tipo III; inmunocomplejos', 'd) Tipo IV; linfocitos T']],
        ['En el sistema nervioso autónomo comparamos simpático y parasimpático.',
         '¿Cuál es la combinación correcta de neurotransmisor principal posganglionar?',
         'c) Simpático: noradrenalina; parasimpático: acetilcolina', 'c',
         'El simpático (adrenérgico) libera noradrenalina y el parasimpático (colinérgico) acetilcolina; en ambos, las fibras preganglionares liberan acetilcolina.',
         ['a) Simpático: acetilcolina; parasimpático: noradrenalina', 'b) Ambos usan noradrenalina', 'c) Simpático: noradrenalina; parasimpático: acetilcolina', 'd) Ambos usan acetilcolina']],
        ['',
         '¿Qué tipo de receptor es el nicotínico y cuál el muscarínico?',
         'a) Nicotínico: canal iónico; muscarínico: acoplado a proteína G', 'a',
         'Los nicotínicos son receptores iónicos (ionotrópicos) y los muscarínicos están acoplados a proteína G.',
         ['a) Nicotínico: canal iónico; muscarínico: acoplado a proteína G', 'b) Nicotínico: acoplado a proteína G; muscarínico: canal iónico', 'c) Ambos son canales iónicos', 'd) Ambos están acoplados a proteína G']],
        ['Agricultor con sialorrea, broncoespasmo, miosis y bradicardia tras fumigar sin protección.',
         '¿Qué tratamiento antagoniza las acciones muscarínicas y cuál reactiva la colinesterasa?',
         'b) Atropina; oximas (pralidoxima)', 'b',
         'En la intoxicación por organofosforados: soporte, atropina para los efectos muscarínicos y oximas (pralidoxima, obidoxima) para reactivar la enzima, si se dan temprano.',
         ['a) Fisostigmina; atropina', 'b) Atropina; oximas (pralidoxima)', 'c) Neostigmina; pralidoxima', 'd) Atropina; fisostigmina']],
        ['Paciente con intoxicación atropínica: boca seca, piel caliente, midriasis, taquicardia, delirium.',
         '¿Qué anticolinesterásico se usa para el tratamiento?',
         'c) Fisostigmina', 'c',
         'La fisostigmina IV lenta revierte el síndrome anticolinérgico; si hay agitación intensa se agrega diazepam.',
         ['a) Pralidoxima', 'b) Edrofonio', 'c) Fisostigmina', 'd) Bethanecol']],
        ['',
         'En la síntesis de catecolaminas, ¿cuál es el paso limitante de velocidad?',
         'd) Tirosina → L-DOPA por la tirosina hidroxilasa', 'd',
         'La hidroxilación de la tirosina por la tirosina hidroxilasa es el paso limitante.',
         ['a) Dopamina → noradrenalina por la DBH', 'b) L-DOPA → dopamina por la LAAD', 'c) Noradrenalina → adrenalina por la FNMT', 'd) Tirosina → L-DOPA por la tirosina hidroxilasa']],
        ['',
         '¿Qué fármaco bloquea el transporte de dopamina a las vesículas de almacenamiento?',
         'a) Reserpina', 'a',
         'La reserpina bloquea el transportador de aminas hacia las vesículas; la guanetidina bloquea la liberación; cocaína e imipramina inhiben la recaptación.',
         ['a) Reserpina', 'b) Guanetidina', 'c) Cocaína', 'd) Imipramina']],
        ['Paciente asmático con hipertensión y taquicardia al que se le indica propranolol.',
         '¿Qué riesgo tiene?',
         'b) Broncoconstricción por bloqueo de receptores β2', 'b',
         'El propranolol es un antagonista β no selectivo: bloquea los β2 y provoca broncoconstricción.',
         ['a) Hipotensión por vasodilatación α', 'b) Broncoconstricción por bloqueo de receptores β2', 'c) Midriasis por bloqueo muscarínico', 'd) Taquicardia refleja']],
        ['Paciente con hiperplasia prostática benigna que recibe un bloqueante α1.',
         '¿Cuál es el fármaco?',
         'c) Tamsulosina', 'c',
         'Prazosina, terazosina, tamsulosina y doxazosina son bloqueadores α1.',
         ['a) Propranolol', 'b) Salbutamol', 'c) Tamsulosina', 'd) Mirabegron']],
        ['Paciente con dolor articular crónico tratado con un AINE no selectivo. Presenta epigastralgia y melenas.',
         '¿Por qué se produce la úlcera gastroduodenal?',
         'a) Inhibición de las prostaglandinas gastroprotectoras por bloqueo de la COX-1', 'a',
         'La PGE2 y la PGI2 favorecen la secreción de moco y bicarbonato; al inhibir la COX-1 se pierde la protección gástrica.',
         ['a) Inhibición de las prostaglandinas gastroprotectoras por bloqueo de la COX-1', 'b) Aumento de la síntesis de prostaciclina', 'c) Inhibición de la COX-2 solamente', 'd) Estimulación de la lipoxigenasa']],
        ['Adulto con ingestión de más de 150 mg/kg de paracetamol, náuseas y elevación de las transaminasas.',
         '¿Cuál es el antídoto?',
         'd) N-acetilcisteína (NAC)', 'd',
         'La NAC previene la toxicidad del NAPQI y aumenta la capacidad de detoxificación; es más eficaz cuanto antes se inicia.',
         ['a) Naloxona', 'b) Bicarbonato de sodio', 'c) Atropina', 'd) N-acetilcisteína (NAC)']],
        ['Paciente con depresión respiratoria y miosis tras una sobredosis de morfina.',
         '¿Qué fármaco revierte los efectos?',
         'b) Naloxona', 'b',
         'La naloxona es antagonista de los receptores opioides (μ, δ y κ); revierte los efectos indeseables.',
         ['a) Buprenorfina', 'b) Naloxona', 'c) Fentanilo', 'd) Ketorolac']],
        ['Paciente en tratamiento prolongado con prednisona.',
         '¿Cómo actúan los corticoides?',
         'c) Se unen a receptores citoplasmáticos, migran al núcleo y modulan la expresión génica', 'c',
         'El mecanismo principal es genómico (lento); también hay mecanismos no genómicos (rápidos). Inhiben la síntesis de mediadores inflamatorios y citoquinas.',
         ['a) Bloquean la COX-1 y la COX-2', 'b) Bloquean los receptores H1', 'c) Se unen a receptores citoplasmáticos, migran al núcleo y modulan la expresión génica', 'd) Inhiben la acetilcolinesterasa']],
        ['Paciente con hiperpigmentación, hipotensión y debilidad muscular por insuficiencia suprarrenal autoinmune.',
         '¿Qué enfermedad es?',
         'a) Enfermedad de Addison', 'a',
         'La ausencia de las hormonas suprarrenales produce Addison; el exceso, Cushing (cara de luna llena, estrías, obesidad central).',
         ['a) Enfermedad de Addison', 'b) Síndrome de Cushing', 'c) Feocromocitoma', 'd) Hiperaldosteronismo primario']]
      ]
    }


  ]
};
