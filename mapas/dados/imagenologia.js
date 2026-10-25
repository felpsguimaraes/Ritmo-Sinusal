/* Sinus · Mapas guiados · Imagenología (5º semestre, UCP) · Dr. Kevin Feijó
   P1: 00 Historia, 01 y 02 Radiografía de tórax, 03 RX abdominal, 04 y 04.1 RX de abdomen patológico,
   5.0 Ejercicios de casos clínicos. P2: Tomografía computarizada, Resonancia magnética y Trauma craneoencefálico.
   sl = [clase, página inicial, página final]. Solo "03 RX abdominal" (5 MB) se bajó en PDF y tiene páginas;
   los demás (más de 10 MB) se leyeron como texto del Drive, sin páginas: ahí sl = [clase] y la tarjeta dice
   "orden de la clase". Los números de clase siguen la pasta (00 a 5.0) y luego TC, RM y TCE (7, 8 y 9).
   Todo fue conferido con el texto de las diapositivas; lo que la clase no dice, no está acá.
   Respuestas: escribir el término completo. "A || B" = las dos valen. */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
window.SINUS_MAPAS.imagenologia = {
  nome: 'Imagenología',
  docente: 'Dr. Kevin Feijó',
  fonte: 'Clases 00 a 5.0 (P1), TC, RM y TCE (P2) · UCP Ciudad del Este',
  clases: {
    0: ['00 · Historia de la imagenología', '00 Historia'],
    1: ['01 · Radiografía de tórax', '01 RX tórax'],
    2: ['02 · RX de tórax (parte II)', '02 RX tórax II'],
    3: ['03 · Radiografía abdominal', '03 RX abdomen'],
    4: ['04 · RX de abdomen patológico (parte I)', '04 Abdomen I'],
    5: ['04.1 · RX de abdomen patológico (parte II)', '04.1 Abdomen II'],
    6: ['5.0 · Ejercicios de casos clínicos', '5.0 Casos'],
    7: ['TC · Tomografía computarizada', 'TC'],
    8: ['RM · Resonancia magnética', 'RM'],
    9: ['TCE · Trauma craneoencefálico', 'TCE']
  },
  modulos: [

    /* ───────────── 00 · Historia ───────────── */
    {
      id: 'img_historia', clase: '00 Historia', titulo: 'Historia de la imagenología', tipo: 'fluxo', sl: [[0]],
      resumen: 'Del ámbar de Tales a la resonancia magnética, en orden.',
      fuente: '00 · Historia de la imagenología: electricidad, tubo de Crookes, rayos X, radiactividad, TC y RM',
      pasos: [
        'Tales de Mileto: al frotar [[ámbar::ambar]] se atraen pelos y plumas',
        'William Gilbert (1600): padre de la [[electricidad y el magnetismo || electricidad::electric]]',
        'Otto von Guericke (1663): primera máquina de producción de [[electricidad::electric]]',
        'William Crookes (1869–1875): el tubo de rayos [[catódicos::catodic]]',
        '[[Röntgen || Wilhelm Conrad Röntgen || Roentgen::rontgen|roentgen|röntgen]] descubre los rayos X (8 de noviembre de 1895)',
        'Primera radiografía (22 de diciembre de 1895): la mano de su esposa, [[Anna Bertha::anna|bertha]]',
        'J. J. Thomson (1897): descubre el [[electrón::electron]] con un tubo de Crookes',
        'Marie y Pierre [[Curie::curie]] (1898): polonio, radio y el término "radioactividad"',
        'William D. Coolidge (1913): tubo caliente con filamento de [[tungsteno::tungsten]]',
        'Primera Guerra Mundial: unidades móviles de rayos X, las "[[Petites Curies::petites curies|curies]]"',
        '[[Hounsfield::hounsfield]] y Cormack: la tomografía computarizada (1971)',
        { end: 'Raymond Damadian (1976): primer tomógrafo de [[resonancia magnética::resonancia]]' }
      ]
    },
    {
      id: 'img_fisica', clase: '00 Historia', titulo: 'Física de los rayos X y protección', tipo: 'mapa', sl: [[0]],
      centro: 'Rayos X', sub: 'Producción, atenuación y protección',
      fuente: '00 · Física de los rayos X, atenuación y densidades, evolución y protección radiológica',
      ramas: [
        { t: 'Producción', hojas: [
          ['Los electrones se liberan del cátodo calentado: efecto…', 'Termoiónico', 'termoionic'],
          ['Metal del ánodo', 'Tungsteno', 'tungsten'],
          ['Radiación que se produce por la desaceleración brusca de los electrones', 'Bremsstrahlung || Radiación de frenado', 'bremsstrahlung|frenado'],
          ['Proporción que sale como calor', '99% || 99 %', '99']
        ] },
        { t: 'Atenuación', hojas: [
          ['Depende de la densidad y del número…', 'Atómico || Número atómico || Z', 'atomic'],
          ['Blanco: huesos, metal, contraste de bario', 'Radiopaco', 'radiopac'],
          ['Oscuro: aire de los pulmones', 'Radiolúcido', 'radiolucid']
        ] },
        { t: 'Protección', hojas: [
          ['"Tan bajo como sea razonablemente posible"', 'ALARA || Principio ALARA', 'alara'],
          ['Tiempo mínimo, distancia máxima y blindaje de…', 'Plomo', 'plomo'],
          ['Pionero de la fluoroscopia que abandonó tras la muerte de su asistente', 'Thomas Edison || Edison', 'edison']
        ] },
        { t: 'Premios Nobel', hojas: [
          ['Primer Nobel de Física (1901)', 'Röntgen || Roentgen', 'rontgen|roentgen|röntgen'],
          ['Única científica con Nobel en dos campos', 'Marie Curie || Curie', 'curie']
        ] }
      ]
    },
    {
      id: 'img_modalidades', clase: '00 Historia', titulo: 'Otras modalidades: ecografía, TC, RM y PET', tipo: 'mapa', sl: [[0]],
      centro: 'Modalidades', sub: 'Sonido, rayos X, imanes e isótopos',
      fuente: '00 · Ultrasonografía y efecto Doppler, tomografía computarizada, resonancia magnética y medicina nuclear',
      ramas: [
        { t: 'Ecografía', hojas: [
          ['Efecto de los cristales del transductor', 'Piezoeléctrico || Efecto piezoeléctrico', 'piezoelectric'],
          ['Velocidad del sonido en tejido blando', '1540 m/s || 1.540 m/s', '1540|1.540'],
          ['Ventaja en recién nacidos y embarazadas', 'Ausencia de radiación || Sin radiación', 'radiac'],
          ['Evalúa el flujo sanguíneo en tiempo real', 'Doppler || Efecto Doppler', 'doppler']
        ] },
        { t: 'Tomografía', hojas: [
          ['Premio Nobel de Medicina 1979 con Cormack', 'Hounsfield || Godfrey Hounsfield', 'hounsfield'],
          ['Agua pura en la escala Hounsfield', '0 HU || 0 UH || 0', '0'],
          ['Aire en la escala Hounsfield', '−1000 HU || -1000 HU || -1000', '1000|1.000']
        ] },
        { t: 'Resonancia', hojas: [
          ['Núcleos que alinea el campo magnético', 'Protones de hidrógeno || Hidrógeno', 'hidrogen'],
          ['Secuencia para anatomía y grasa', 'T1', 't1'],
          ['Secuencia para líquidos y edema', 'T2', 't2'],
          ['Premio Nobel 2003 con Mansfield', 'Lauterbur', 'lauterbur']
        ] },
        { t: 'Medicina nuclear', hojas: [
          ['La radiación la emite…', 'El propio cuerpo del paciente || El paciente', 'paciente'],
          ['Radiofármaco de glucosa (Abass Alavi, 1976)', 'Fluorodesoxiglucosa || FDG', 'fluorodesox|fdg']
        ] }
      ]
    },
    {
      id: 'img_accidentes', clase: '00 Historia', titulo: 'Accidentes con radiación', tipo: 'tabla', sl: [[0]],
      resumen: 'Los dos accidentes que trae la clase, lado a lado.',
      fuente: '00 · El desastre de Chernobyl (1986) y el accidente de cesio-137 en Goiânia (1987)',
      columnas: ['', 'Chernobyl', 'Goiânia'],
      filas: [
        ['Año', '[[1986::1986]]', '[[1987::1987]]'],
        ['Tipo', 'Accidente en una central [[nuclear::nuclear]]', 'Accidente [[radiológico urbano || radiológico::radiologic]]'],
        ['Elemento', 'Uranio, plutonio, yodo-131, cesio-137', '[[Cesio-137 || Cesio 137 || Cesio::cesio]]'],
        ['Escala INES', 'Nivel [[7::7]] (el máximo)', 'Nivel [[5::5]]'],
        ['Qué pasó', 'Prueba de seguridad mal planificada en el reactor n.º 4', 'Un aparato de [[radioterapia::radioterap]] abandonado fue desmontado']
      ]
    },

    /* ───────────── 01 · Radiografía de tórax ───────────── */
    {
      id: 'img_rx_bases', clase: '01 RX tórax', titulo: 'Radiografía de tórax: bases', tipo: 'mapa', sl: [[1]],
      centro: 'RX de tórax', sub: 'Densidades, proyecciones e inspiración',
      fuente: '01 · Radiografía de tórax: dosis, densidades, proyecciones, inspiración y telerradiografía',
      ramas: [
        { t: 'Dosis', hojas: [
          ['Proyección PA', '0,02 mSv || 0.02 mSv', '0,02|0.02'],
          ['Proyección lateral', '0,04 mSv || 0.04 mSv', '0,04|0.04'],
          ['A qué distancia se coloca el especialista', '1,5 metros || 1,5 m || 1.5 m', '1,5|1.5']
        ] },
        { t: '5 densidades', hojas: [
          ['Negro', 'Aire || Aire, gas', 'aire'],
          ['Gris oscuro', 'Grasa', 'grasa'],
          ['Gris', 'Tejido blando || Líquido o tejidos blandos', 'blando|liquido'],
          ['Blanquecino', 'Hueso || Calcio', 'hueso|calcio'],
          ['Blanco', 'Metal || Metales', 'metal']
        ] },
        { t: 'Proyecciones', hojas: [
          ['El haz va de atrás hacia adelante, paciente de pie', 'Posteroanterior || PA', 'posteroant|pa'],
          ['Paciente en decúbito', 'Anteroposterior || AP', 'anteropost|ap'],
          ['Lesiones detrás del corazón o cerca del diafragma', 'Lateral', 'lateral']
        ] },
        { t: 'Inspiración', hojas: [
          ['Costillas posteriores sobre el diafragma en una inspiración excelente', '10 || Diez', '10|diez'],
          ['Hemidiafragma más elevado, por el hígado', 'Derecho', 'derech'],
          ['Distancia tubo–receptor de la telerradiografía', '1,80 m || 1,8 m || 1.80 m', '1,8|1.8']
        ] }
      ]
    },
    {
      id: 'img_sievert', clase: '01 RX tórax', titulo: 'Escala de dosis (sievert)', tipo: 'tabla', sl: [[1]],
      resumen: 'El sievert mide el impacto biológico de la radiación ionizante. 1 mSv = 0,001 Sv.',
      fuente: '01 · Escala sievert y milisievert (Rolf Sievert)',
      columnas: ['Dosis', 'Efecto según la clase'],
      filas: [
        ['[[3 a 20 mSv || 3–20 mSv || 3-20 mSv::3;20]]', 'Exposición media anual natural o límite de seguridad ocupacional'],
        ['[[1 Sv || 1.000 mSv || 1000 mSv::1 sv|1000|1.000]] de una vez', 'Náuseas, caída temporal del cabello y alteraciones leves en la sangre'],
        ['[[5 a 10 Sv || 5–10 Sv || 5-10 Sv::5;10]]', 'Dosis [[letal::letal]] sin tratamiento médico inmediato (fallo de órganos)']
      ]
    },
    {
      id: 'img_lectura', clase: '01 RX tórax', titulo: 'Lectura sistemática de la radiografía', tipo: 'fluxo', sl: [[1]],
      resumen: 'Los 4 pasos de la lectura, en orden.',
      fuente: '01 · ¿Cómo empezar a leer una RX?: identificación, aspecto general, anatomía y semiología radiológica',
      pasos: [
        '1.er paso: [[identificación del paciente || identificación::identific]] (¿quién?, ¿qué?, ¿cuándo?, ¿dónde?, ¿por qué?)',
        '2.º paso: [[aspecto general::aspecto general]] (posición o proyección, inspiración y exposición)',
        '3.er paso: [[anatomía radiológica normal || anatomía radiológica::anatomia]] (regla ABCDE)',
        { end: '4.º paso: [[semiología radiológica::semiolog]]' }
      ]
    },
    {
      id: 'img_abcde', clase: '01 RX tórax', titulo: 'La regla ABCDE', tipo: 'mapa', sl: [[1]],
      centro: 'ABCDE', sub: 'Anatomía radiológica normal del tórax',
      fuente: '01 · Tercer paso: anatomía radiológica normal y regla ABCDE',
      ramas: [
        { t: 'A · Vías aéreas', hojas: [
          ['Ángulo de la carina: obtuso y no mayor de…', '100 grados || 100°', '100'],
          ['Bronquio más alto y más horizontal', 'Izquierdo || Bronquio izquierdo', 'izquierd']
        ] },
        { t: 'B · Pulmones y pleura', hojas: [
          ['Cisura que se ve en la proyección PA', 'Cisura menor || Menor', 'menor'],
          ['Cómo deben ser los senos costofrénicos', 'Agudos', 'agudo']
        ] },
        { t: 'C · Silueta', hojas: [
          ['Índice cardiotorácico normal en el adulto', '≤ 0,5 || 0,5 || Igual o menor a 0,5', '0,5|0.5'],
          ['ICT =', 'Diámetro transverso cardíaco / diámetro transverso del tórax', 'cardiac;torax|torac'],
          ['Pedículo vascular patológico por encima de…', '85 mm', '85'],
          ['Lado del botón aórtico', 'Izquierdo || A la izquierda', 'izquierd']
        ] },
        { t: 'D · Huesos', hojas: [
          ['Qué se busca en costillas, clavículas y vértebras', 'Fracturas || Fracturas o lesiones focales', 'fractur']
        ] },
        { t: 'E · Todo lo demás', hojas: [
          ['Aire libre debajo del diafragma', 'Neumoperitoneo', 'neumoperit'],
          ['Nivel hidroaéreo retrocardíaco', 'Hernia hiatal', 'hiatal']
        ] }
      ]
    },
    {
      id: 'img_icc', clase: '01 RX tórax', titulo: 'RX de tórax en la insuficiencia cardíaca', tipo: 'mapa', sl: [[1]],
      centro: 'Signos de ICC', sub: 'Lo que muestra la radiografía',
      fuente: '01 · Signos de ICC, líneas B de Kerley, cardiomegalia y crecimiento de cavidades',
      ramas: [
        { t: 'Edema', hojas: [
          ['Hipertensión venocapilar', 'Redistribución venosa', 'redistribuc'],
          ['Edema intersticial: líneas horizontales periféricas que llegan a la pleura', 'Líneas B de Kerley || Kerley', 'kerley'],
          ['Edema alveolar: infiltrados perihiliares en…', 'Alas de mariposa', 'mariposa']
        ] },
        { t: 'Corazón', hojas: [
          ['Cardiomegalia sugiere disfunción…', 'Sistólica', 'sistolic'],
          ['Sin cardiomegalia sugiere disfunción…', 'Diastólica', 'diastolic'],
          ['Aurícula izquierda dilatada', 'Valvulopatía mitral', 'mitral']
        ] },
        { t: 'Pleura', hojas: [
          ['Derrame de la ICC', 'Derecho o bilateral', 'derech|bilateral']
        ] },
        { t: 'Otras de la clase', hojas: [
          ['Colapso del tejido pulmonar (griego: expansión imperfecta)', 'Atelectasia', 'atelectas'],
          ['Tumor benigno: tejidos maduros, periférico, solitario, bien delimitado', 'Hamartoma', 'hamartoma']
        ] }
      ]
    },

    /* ───────────── 02 · Radiografía de tórax II ───────────── */
    {
      id: 'img_calidad', clase: '02 RX tórax II', titulo: 'Calidad técnica de la placa', tipo: 'mapa', sl: [[2]],
      centro: 'Calidad técnica', sub: '¿Cuándo es una buena placa de tórax?',
      fuente: '02 · Radiografía de tórax: calidad técnica (datos, proyección, penetración, rotación e inspiración)',
      ramas: [
        { t: 'Proyección', hojas: [
          ['Signo de las clavículas en la PA', 'Clavículas en V', 'en v'],
          ['Proyección de pacientes encamados o en UCI', 'Anteroposterior en decúbito || AP', 'anteropost|ap'],
          ['Pequeños derrames (hasta 50 ml)', 'Decúbito lateral con rayo horizontal', 'decubito lateral'],
          ['Para estudiar los vértices pulmonares', 'Lordótica apical || Lordóticas apicales', 'lordotic']
        ] },
        { t: 'Penetración', hojas: [
          ['Pulmón muy gris; no se ven los cuerpos vertebrales retrocardíacos', 'Blanda || Infraexpuesta || Subexpuesta', 'blanda|expuest'],
          ['Pulmón negro; se ven muy bien los cuerpos vertebrales', 'Dura || Sobreexpuesta', 'dura|sobreexp'],
          ['Tono grisáceo; algunos discos borrosos detrás del corazón', 'Normal', 'normal']
        ] },
        { t: 'Rotación', hojas: [
          ['Placa centrada: las clavículas simétricas respecto a las…', 'Apófisis espinosas', 'espinos']
        ] },
        { t: 'Inspiración', hojas: [
          ['Arcos anteriores mínimos de una placa bien inspirada', '6 a 7 || 6-7 || 6', '6'],
          ['Arcos posteriores', '10 || Diez', '10|diez']
        ] }
      ]
    },
    {
      id: 'img_pa_ap', clase: '02 RX tórax II', titulo: 'PA o AP: cómo diferenciarlas', tipo: 'tabla', sl: [[2]],
      resumen: 'Posición: cómo se coloca el paciente. Proyección: hacia dónde van los rayos.',
      fuente: '02 · Posición vs. proyección; diferencias entre posteroanterior y anteroposterior',
      columnas: ['', 'Posteroanterior (PA)', 'Anteroposterior (AP)'],
      filas: [
        ['Escápulas', 'En la [[periferia::periferia|fuera]] del tórax', 'Sobre los [[campos pulmonares::campos pulmon]]'],
        ['Clavículas', 'Dentro de los campos; la región medial sobre la 3.ª o 4.ª costilla', 'Sobre los [[ápices::apice|vertice]] pulmonares'],
        ['Silueta cardíaca', 'Proyección en la que se mide el ICT', '[[Magnificada || Aumentada::magnific|aument]]'],
        ['Paciente', 'De pie', 'Encamado, urgencias o UCI']
      ]
    },
    {
      id: 'img_silueta', clase: '02 RX tórax II', titulo: 'Signo de la silueta', tipo: 'tabla', sl: [[2]],
      resumen: 'Qué contorno se pierde según el lóbulo afectado.',
      fuente: '02 · Lóbulo pulmonar afectado y estructura cuyo contorno se pierde',
      columnas: ['Lóbulo afectado', 'Contorno que se pierde'],
      filas: [
        ['[[Medio || Lóbulo medio::medio]]', 'Borde cardíaco derecho'],
        ['[[Língula::lingula]]', 'Borde cardíaco izquierdo'],
        ['Superior derecho', 'Aorta ascendente y borde [[paratraqueal::paratraq]]'],
        ['Superior izquierdo', '[[Botón aórtico::boton aortic]]'],
        ['[[Inferiores || Lóbulos inferiores::inferior]]', 'Hemidiafragmas ipsilaterales']
      ]
    },
    {
      id: 'img_patrones', clase: '02 RX tórax II', titulo: 'Patrones radiológicos pulmonares', tipo: 'mapa', sl: [[2]],
      centro: 'Patrones', sub: 'Radiopacos y radiolúcidos',
      fuente: '02 · Patrones alveolar, intersticial, atelectásico, pleural, nódulo y masa, y radiolucidez',
      ramas: [
        { t: 'Alveolar', hojas: [
          ['Bronquios con aire dentro de la opacidad', 'Broncograma aéreo', 'broncograma'],
          ['Aspecto de los bordes', 'Algodonoso || Difusos', 'algodon|difus'],
          ['Generalizado de la clase', 'Edema pulmonar cardiogénico', 'edema']
        ] },
        { t: 'Intersticial', hojas: [
          ['Reticular grueso con septos de 2–3 mm', 'Panal de abeja || En panal de abeja', 'panal'],
          ['Patrón granular', 'Vidrio deslustrado', 'deslustr'],
          ['¿Tiene broncograma o signo de la silueta?', 'No || No tiene', '^no']
        ] },
        { t: 'Pleural', hojas: [
          ['Borde superior cóncavo del derrame', 'Signo del menisco || Menisco', 'menisco'],
          ['El mediastino se desplaza hacia el lado…', 'Contralateral || Opuesto', 'contralat|opuesto'],
          ['Volumen mínimo visible en la lateral', '75 cc || 75 ml', '75'],
          ['Volumen mínimo visible en la PA', '200 cc || 200 ml', '200']
        ] },
        { t: 'Nódulo y masa', hojas: [
          ['Entre 2 mm y 3 cm', 'Nódulo', 'nodulo'],
          ['Mayor de 3 cm', 'Masa', 'masa']
        ] },
        { t: 'Radiolucidez', hojas: [
          ['Sin pared', 'Enfisema', 'enfisema'],
          ['Con pared', 'Cavitación, quiste o bulla || Cavitación', 'cavitac|quiste|bulla']
        ] }
      ]
    },
    {
      id: 'img_atelectasias', clase: '02 RX tórax II', titulo: 'Tipos de atelectasia', tipo: 'tabla', sl: [[2]],
      resumen: 'Pérdida de volumen o colapso del pulmón: el mecanismo y ejemplos de la clase.',
      fuente: '02 · Patrón atelectásico: tipos y signos radiológicos',
      columnas: ['Tipo', 'Mecanismo', 'Ejemplos'],
      filas: [
        ['[[Obstructiva::obstruct]]', 'Obstrucción bronquial', 'Carcinoma broncogénico, [[cuerpo extraño::cuerpo extra]]'],
        ['[[Pasiva::pasiva]]', 'Compresión física extrapulmonar', '[[Neumotórax::neumotorax]], derrame pleural, hemotórax'],
        ['[[Compresiva::compresiva]]', 'Compresión física intrapulmonar', 'Neoplasias, sarcoidosis'],
        ['[[Adhesiva::adhesiva]]', 'Pérdida del [[surfactante::surfactant]]', 'Distrés respiratorio del recién nacido'],
        ['[[Cicatricial::cicatric]]', 'Cicatrización del parénquima', 'TBC secundaria, [[silicosis::silicosis]], fibrosis']
      ]
    },
    {
      id: 'img_calcificaciones', clase: '02 RX tórax II', titulo: 'Calcificaciones de nódulos y masas', tipo: 'tabla', sl: [[2]],
      resumen: 'Patrones de benignidad y de malignidad.',
      fuente: '02 · Patrón nódulo y masa: según tamaño, número y calcificaciones',
      columnas: ['Calcificación', 'Patrón', 'Pensar en'],
      filas: [
        ['Sólida de bordes netos', '[[Benigno || Benignidad::benign]]', '[[Granuloma::granuloma]]'],
        ['Central en ojo de buey', 'Benigno', 'TBC, histiocitosis'],
        ['En cáscara de huevo', 'Benigno', '[[Silicosis::silicosis]]'],
        ['Central con halo graso ("pop corn")', 'Benigno', '[[Hamartoma::hamartoma]]'],
        ['Excéntricas, irregulares o en punteado', '[[Maligno || Malignidad::malign]]', 'Neoplasia']
      ]
    },
    {
      id: 'img_epoc', clase: '02 RX tórax II', titulo: 'EPOC, sarcoidosis, asbestosis y bronquiectasias', tipo: 'mapa', sl: [[2]],
      centro: 'Enfermedades', sub: 'Hallazgos de la clase',
      fuente: '02 · EPOC, proteinosis alveolar, sarcoidosis, bronquiectasias, absceso y asbestosis',
      ramas: [
        { t: 'EPOC', hojas: [
          ['Campos pulmonares', 'Hiperinsuflados e hiperclaros || Hiperinsuflados', 'hiperinsufl|hiperclar'],
          ['Forma del corazón', 'En gota', 'gota'],
          ['Arcos costales', 'Horizontalizados', 'horizontal']
        ] },
        { t: 'Sarcoidosis', hojas: [
          ['Granulomas…', 'No caseosos', 'no caseos'],
          ['Etiología', 'Idiopática', 'idiopat']
        ] },
        { t: 'Asbestosis', hojas: [
          ['Signo característico', 'Pulmón en llamas', 'llamas']
        ] },
        { t: 'Bronquiectasias', hojas: [
          ['Qué les pasa a los bronquios de gran calibre', 'Dilatación y destrucción', 'dilatac;destrucc'],
          ['Causa común de la clase', 'Fibrosis quística', 'fibrosis quist']
        ] }
      ]
    },

    /* ───────────── 03 · RX abdominal (con páginas) ───────────── */
    {
      id: 'img_abd_lectura', clase: '03 RX abdomen', titulo: 'Lectura sistematizada de la RX abdominal', tipo: 'fluxo', sl: [[3,3,3]],
      resumen: 'Los 11 pasos, en el orden de la clase.',
      fuente: '03 · Lectura sistematizada de la radiografía abdominal',
      pasos: [
        '1. Región [[anatómica::anatomic]]',
        '2. [[Técnica::tecnica]]',
        '3. Tejidos [[blandos::blando]]',
        '4. Bandas [[preperitoneales::preperitone]]',
        '5. [[Bazo::bazo]]',
        '6. [[Hígado::higado]]',
        '7. Estructuras [[óseas::osea]]',
        '8. Músculo [[psoas::psoas]]',
        '9. [[Riñones::riñon|rinon]]',
        '10. Cavidad [[pélvica::pelvic]]',
        { end: '11. Recesos [[peritoneales::peritone]]' }
      ]
    },
    {
      id: 'img_abd_proyecciones', clase: '03 RX abdomen', titulo: 'Proyecciones de la RX de abdomen', tipo: 'tabla', sl: [[3,5,5]],
      resumen: 'Distancia foco–detector: 100–115 cm. Incluir desde el diafragma hasta la sínfisis púbica.',
      fuente: '03 · Proyecciones diagnósticas de la RX de abdomen',
      columnas: ['Proyección', 'Útil para'],
      filas: [
        ['AP [[supino || decúbito dorsal::supino|dorsal]]', 'Gas intestinal, calcificaciones, dispositivos, masas'],
        ['[[Bipedestación || De pie::bipedest|pie]]', '[[Niveles hidroaéreos::niveles]], aire libre, obstrucción intestinal'],
        ['Decúbito lateral [[izquierdo::izquierd]] con rayo horizontal', 'Aire libre [[subdiafragmático::subdiafrag]], niveles hidroaéreos']
      ]
    },
    {
      id: 'img_abd_estructuras', clase: '03 RX abdomen', titulo: 'Qué mirar en la RX abdominal', tipo: 'mapa', sl: [[3,4,27]],
      centro: 'RX de abdomen', sub: 'Regiones, órganos, recesos y gas',
      fuente: '03 · Regiones, tejidos blandos, bandas preperitoneales, estructuras óseas, riñones, pelvis, recesos y gas',
      ramas: [
        { t: 'Regiones', hojas: [
          ['Ciego, apéndice e íleon terminal', 'Fosa ilíaca derecha', 'iliaca derech'],
          ['Colon sigmoide', 'Fosa ilíaca izquierda', 'iliaca izquierd'],
          ['Hígado (lóbulo derecho) y vesícula biliar', 'Hipocondrio derecho', 'hipocondrio derech'],
          ['Colon ascendente', 'Flanco derecho', 'flanco derech']
        ] },
        { t: 'Partes blandas', hojas: [
          ['Líneas grasas laterales: se ven a partir de los…', '2 años || Dos años', '2|dos'],
          ['Grasa entre el peritoneo parietal y la pared', 'Bandas preperitoneales', 'preperitone']
        ] },
        { t: 'Recesos', hojas: [
          ['Entre el lóbulo derecho del hígado y el riñón derecho', 'Espacio de Morrison || Receso hepatorrenal', 'morrison|hepatorren'],
          ['Fondo de saco de la mujer', 'Saco de Douglas || Douglas', 'douglas'],
          ['Fondo de saco del hombre', 'Saco rectovesical || Rectovesical', 'rectovesic']
        ] },
        { t: 'Aire libre', hojas: [
          ['Aire subdiafragmático', 'Neumoperitoneo', 'neumoperit'],
          ['Doble pared intestinal', 'Signo de Rigler || Rigler', 'rigler']
        ] },
        { t: 'Pelvis', hojas: [
          ['Sitio donde termina el tracto urinario e intestinal', 'Cavidad pélvica', 'pelvic'],
          ['Litiasis distal: cálculo en la…', 'Vejiga', 'vejiga']
        ] }
      ]
    },

    /* ───────────── 04 · Abdomen patológico I ───────────── */
    {
      id: 'img_acalasia', clase: '04 Abdomen I', titulo: 'Acalasia y úlcera péptica', tipo: 'mapa', sl: [[4]],
      centro: 'Esófago y estómago', sub: 'Acalasia, úlcera péptica y perforación',
      fuente: '04 · Acalasia esofágica y úlcera péptica (complicaciones y perforación)',
      ramas: [
        { t: 'Acalasia', hojas: [
          ['El EEI no se relaja y falta la…', 'Peristalsis || Peristaltismo', 'peristal'],
          ['Gold standard del diagnóstico', 'Manometría esofágica || Manometría', 'manometr'],
          ['Signo del esofagograma con bario', 'Pico de pájaro || Cola de ratón', 'pico|cola de raton'],
          ['Causa infecciosa importante', 'Enfermedad de Chagas || Chagas', 'chagas'],
          ['Cirugía que secciona el esfínter', 'Miotomía de Heller || Heller', 'heller']
        ] },
        { t: 'Úlcera péptica', hojas: [
          ['Bacteria que la causa', 'Helicobacter pylori || H. pylori', 'pylori'],
          ['Fármacos que la causan', 'AINE || AINEs', 'aine'],
          ['Examen de referencia', 'Endoscopia digestiva alta || Endoscopia', 'endoscop'],
          ['Tratamiento: IBP (omeprazol) y…', 'Antibióticos', 'antibiot']
        ] },
        { t: 'Perforación', hojas: [
          ['Hallazgo de la RX de tórax en el 80%', 'Aire libre subdiafragmático || Aire libre', 'aire libre'],
          ['Signo del examen abdominal', 'Signo de rebote || Rebote', 'rebote']
        ] }
      ]
    },
    {
      id: 'img_vesicula', clase: '04 Abdomen I', titulo: 'Colecistitis y coledocolitiasis', tipo: 'mapa', sl: [[4]],
      centro: 'Vía biliar', sub: 'Vesícula y colédoco',
      fuente: '04 · Colecistitis (causas, clínica, diagnóstico, tratamiento) y coledocolitiasis (CPRE)',
      ramas: [
        { t: 'Colecistitis', hojas: [
          ['Causa más común', 'Cálculos biliares || Colelitiasis', 'calculo|colelit'],
          ['Signo clínico', 'Signo de Murphy || Murphy', 'murphy'],
          ['Prueba no invasiva de primera elección', 'Ecografía || Ultrasonido', 'ecograf|ultrason'],
          ['Tratamiento definitivo', 'Colecistectomía', 'colecistect'],
          ['Sin cálculos', 'Alitiásica || Colecistitis aguda alitiásica', 'alitias']
        ] },
        { t: 'Coledocolitiasis', hojas: [
          ['Cálculos en el…', 'Colédoco', 'coledoco'],
          ['Orina oscura', 'Coluria', 'coluria'],
          ['Técnica de referencia, diagnóstica y terapéutica', 'CPRE', 'cpre'],
          ['Estudio sin contraste de la vía biliar', 'Colangiorresonancia || Colangio-RMN', 'colangio']
        ] },
        { t: 'Complicaciones', hojas: [
          ['Complicación crónica: vesícula en…', 'Porcelana', 'porcelana'],
          ['Infección de la bilis', 'Colangitis', 'colangitis'],
          ['Inflamación del páncreas', 'Pancreatitis', 'pancreatit']
        ] }
      ]
    },

    /* ───────────── 04.1 · Abdomen patológico II ───────────── */
    {
      id: 'img_pancreas_eii', clase: '04.1 Abdomen II', titulo: 'Pancreatitis y enfermedad inflamatoria intestinal', tipo: 'mapa', sl: [[5]],
      centro: 'Inflamación abdominal', sub: 'Páncreas e intestino',
      fuente: '04.1 · Pancreatitis aguda, colitis ulcerosa, enfermedad de Crohn, apendicitis y litiasis urinaria',
      ramas: [
        { t: 'Pancreatitis', hojas: [
          ['Enzimas elevadas hasta…', 'Tres veces su valor normal || 3 veces', 'tres|3'],
          ['Causa más frecuente (40–50%)', 'Cálculos biliares', 'calculo'],
          ['Segunda causa (35%)', 'Alcohol || Consumo de alcohol', 'alcohol'],
          ['Triglicéridos que la causan', 'Más de 1000 mg/dl || > 1000 mg/dl', '1000|1.000'],
          ['Gas del colon que se corta en el ángulo esplénico', 'Signo del colon cortado', 'colon cortado']
        ] },
        { t: 'EII', hojas: [
          ['Afecta de manera continua el colon y el recto', 'Colitis ulcerosa', 'colitis ulcer'],
          ['Cualquier parte, de la boca al ano, todas las capas', 'Enfermedad de Crohn || Crohn', 'crohn'],
          ['Dato de laboratorio que anticipa recidivas (con la lactoferrina)', 'Calprotectina', 'calprotect']
        ] },
        { t: 'Otras', hojas: [
          ['Estudio urgente ante sospecha de apendicitis', 'Ecografía abdominal || Ecografía', 'ecograf'],
          ['Cálculos de ácido úrico, oxalato o fosfato de calcio', 'Litiasis urinaria', 'litiasis']
        ] }
      ]
    },
    {
      id: 'img_signos_abd', clase: '04.1 Abdomen II', titulo: 'Signos radiológicos del abdomen', tipo: 'tabla', sl: [[4],[5]],
      resumen: 'Cada signo y lo que significa.',
      fuente: '04 y 04.1 · Signos clásicos: pico de pájaro, colon cortado, escalera, collar de perlas, grano de café, gaviota y garra',
      columnas: ['Signo', 'Indica'],
      filas: [
        ['Pico de pájaro', '[[Acalasia::acalasia]]'],
        ['Colon cortado', '[[Pancreatitis || Pancreatitis aguda::pancreatit]]'],
        ['Niveles hidroaéreos en escalera; collar de perlas', 'Obstrucción del intestino [[delgado::delgado]]'],
        ['Grano de café o U invertida', '[[Vólvulo::volvulo]]'],
        ['Gaviota (alas de gaviota)', '[[Neumoperitoneo::neumoperit]]'],
        ['Garra (claw sign)', '[[Intususcepción || Invaginación intestinal::intususc|invagin]]'],
        ['Signo de la cuerda', 'Enfermedad de [[Crohn::crohn]]']
      ]
    },
    {
      id: 'img_obstruccion', clase: '04.1 Abdomen II', titulo: 'Oclusión de delgado o de colon', tipo: 'tabla', sl: [[5]],
      resumen: 'Cómo se ve cada una en la radiografía.',
      fuente: '04.1 · Oclusión de intestino delgado y oclusión de colon',
      columnas: ['', 'Intestino delgado', 'Colon'],
      filas: [
        ['Causas de la clase', 'Bridas, [[hernias::hernia]], tumores; íleo paralítico', 'Tumores, hernias, [[fecalomas::fecaloma]], vólvulos'],
        ['Asas', 'Dilatadas, con gas', 'Marco colónico [[ensanchado::ensanch|dilat]]'],
        ['Niveles hidroaéreos', 'En [[escalera::escalera]], de pie', 'Menos numerosos'],
        ['Gas distal', 'Escaso o ausente en el colon', 'Ausente en recto y sigma'],
        ['Signo típico', 'Collar de [[perlas::perla]]', 'Grano de café (vólvulo)']
      ]
    },

    /* ───────────── 5.0 · Ejercicios de casos clínicos ───────────── */
    {
      id: 'img_casos', clase: '5.0 Casos', titulo: 'Ejercicios de casos clínicos en radiología', tipo: 'casos',
      resumen: 'Los 15 casos del material de la clase: leé el hallazgo y elegí el diagnóstico.',
      fuente: '5.0 · Ejercicios de casos clínicos en radiología (con las respuestas del material)',
      casos: [
        ['62 años, disnea progresiva y dolor pleurítico. RX AP: opacidad homogénea en la base derecha que borra los ángulos costofrénico y cardiofrénico, con curvatura superior cóncava.', '¿Diagnóstico y signo clásico?', 'b) Derrame pleural; menisco de Damoiseau', 'b',
         'La línea de Ellis-Damoiseau es la curvatura superior cóncava del derrame.',
         ['a) Neumonía lobar; broncograma aéreo', 'b) Derrame pleural; menisco de Damoiseau', 'c) Atelectasia; desplazamiento de cisura', 'd) Neumotórax; línea pleural']],
        ['35 años, fiebre alta, tos con esputo herrumbroso y leucocitosis. RX: consolidación parenquimatosa delimitada por las cisuras.', '¿Hallazgo clave dentro de la consolidación?', 'c) Broncograma aéreo', 'c',
         'Neumonía lobar: bronquios con aire (líneas oscuras) rodeados de alvéolos ocupados.',
         ['a) Signo del menisco', 'b) Líneas B de Kerley', 'c) Broncograma aéreo', 'd) Corazón en gota']],
        ['Joven delgado con dolor torácico súbito y disnea. RX: hiperclaridad periférica sin trama vascular, con una fina línea de pleura visceral.', '¿Diagnóstico?', 'a) Neumotórax espontáneo primario', 'a',
         'Colapso parcial del pulmón con área hiperlúcida periférica.',
         ['a) Neumotórax espontáneo primario', 'b) Enfisema', 'c) Bulla', 'd) Derrame pleural']],
        ['70 años con insuficiencia cardíaca descompensada, ortopnea severa y crepitantes bilaterales.', '¿Cómo se describe el infiltrado alveolar perihiliar?', 'd) En alas de mariposa', 'd',
         'Edema agudo de pulmón: bilateral y simétrico; con cardiomegalia, redistribución y líneas B de Kerley.',
         ['a) En vidrio deslustrado periférico', 'b) Nodular fino', 'c) En panal de abeja', 'd) En alas de mariposa']],
        ['58 años, fumadora, disnea y tos seca. RX: diafragmas aplanados, espacio retroesternal aumentado, hiperclaridad difusa, corazón en gota.', '¿Diagnóstico?', 'b) Enfisema pulmonar / EPOC', 'b',
         'Patrón de hiperinsuflación pulmonar severa.',
         ['a) Neumotórax bilateral', 'b) Enfisema pulmonar / EPOC', 'c) Edema pulmonar', 'd) Fibrosis pulmonar']],
        ['Aspiración de cuerpo extraño. RX: opacidad del lóbulo superior izquierdo, cisura mayor desplazada hacia la lesión, hemidiafragma izquierdo elevado y tráquea desviada hacia el lado afectado.', '¿Diagnóstico?', 'c) Atelectasia (colapso lobar)', 'c',
         'Signos de pérdida de volumen: las estructuras son atraídas hacia la lesión.',
         ['a) Derrame pleural', 'b) Neumonía', 'c) Atelectasia (colapso lobar)', 'd) Masa pulmonar']],
        ['45 años, fumador, pérdida de peso. RX PA: lesiones radiopacas de 3,5 cm, 1,6 cm y 0,9 cm en los lóbulos medio e inferior derecho.', '¿Cómo se clasifica la lesión de 3,5 cm?', 'a) Masa (más de 3 cm)', 'a',
         'Más de 3 cm = masa; menos de 3 cm = nódulo. Bordes espiculados aumentan la sospecha de malignidad.',
         ['a) Masa (más de 3 cm)', 'b) Nódulo (menos de 3 cm)', 'c) Granuloma calcificado', 'd) Quiste']],
        ['60 años con HTA mal controlada. RX PA: ICT mayor a 0,50.', '¿Diagnóstico radiológico?', 'Cardiomegalia', 'cardiomegal',
         'El ancho máximo del corazón supera el 50% del ancho interno del tórax en una PA bien inspirada.'],
        ['Dolor torácico y disnea. RX: mediastino superior ensanchado (más de 8 cm en PA), tráquea desplazada a la derecha y botón aórtico prominente.', '¿Qué patología vascular hay que descartar?', 'd) Aneurisma o disección de aorta torácica', 'd',
         'El ensanchamiento del mediastino es el hallazgo cardinal ante esta sospecha.',
         ['a) Tromboembolismo pulmonar', 'b) Pericarditis', 'c) Neumomediastino', 'd) Aneurisma o disección de aorta torácica']],
        ['Dolor abdominal súbito "en puñalada" con antecedente de úlcera péptica. RX de tórax de pie: semiluna radiolúcida debajo del hemidiafragma derecho.', '¿Diagnóstico?', 'Neumoperitoneo', 'neumoperit',
         'Perforación de víscera hueca: el aire libre sube bajo las cúpulas diafragmáticas de pie.'],
        ['72 años con cirugías abdominales previas, vómitos, distensión y sin gases ni heces. RX de pie: múltiples niveles hidroaéreos escalonados en el centro.', '¿Diagnóstico?', 'b) Obstrucción mecánica del intestino delgado', 'b',
         'Las válvulas conniventes cruzan todo el ancho de la luz: "pila de monedas" o escalera.',
         ['a) Vólvulo de sigma', 'b) Obstrucción mecánica del intestino delgado', 'c) Íleo biliar', 'd) Neumoperitoneo']],
        ['Anciano con estreñimiento crónico, distensión marcada y dolor cólico. RX: gran asa en "U" invertida desde la pelvis hacia el cuadrante superior izquierdo.', '¿Causa de la obstrucción?', 'c) Vólvulo de colon', 'c',
         'La torsión del colon sobre su mesenterio da el "grano de café".',
         ['a) Fecaloma', 'b) Cáncer de colon', 'c) Vólvulo de colon', 'd) Intususcepción']],
        ['Niño de 4 años con llanto intermitente, dolor abdominal y masa palpable. RX: poco aire distal y masa en cuadrante superior derecho con signo de la diana.', '¿Sospecha principal?', 'a) Invaginación intestinal (intususcepción)', 'a',
         'Un segmento proximal se introduce en la luz del distal; con contraste se ve el signo de la garra.',
         ['a) Invaginación intestinal (intususcepción)', 'b) Apendicitis', 'c) Vólvulo', 'd) Estenosis pilórica']],
        ['Cólico renal derecho recurrente. RX: imagen de densidad calcio en el trayecto del uréter derecho, a la altura de L4.', '¿Diagnóstico?', 'Litiasis ureteral || Urolitiasis', 'litiasis|urolit',
         'El 80–85% de los cálculos tienen calcio y son radiopacos.'],
        ['52 años con disfagia progresiva a sólidos y líquidos, regurgitación nocturna y pérdida de peso. Esofagograma: esófago dilatado que termina en una estenosis afilada y lisa.', '¿Patología y nombre del signo?', 'b) Acalasia; pico de pájaro', 'b',
         'También llamado "cola de ratón": el EEI no se relaja.',
         ['a) Cáncer de esófago; manzana mordida', 'b) Acalasia; pico de pájaro', 'c) Hernia hiatal; nivel hidroaéreo', 'd) Úlcera péptica; nicho']],
        ['54 años con colelitiasis, ictericia, dolor en hipocondrio derecho y coluria. CPRE: vía biliar dilatada con defectos de repleción ovoides en el colédoco distal.', '¿Diagnóstico?', 'Coledocolitiasis', 'coledocolit',
         'Los cálculos interrumpen el contraste y dejan un defecto de repleción.']
      ]
    },

    /* ───────────── P2 · Tomografía computarizada ───────────── */
    {
      id: 'img_tc', clase: 'TC', titulo: 'Tomografía computarizada', tipo: 'mapa', sl: [[7]],
      centro: 'TC', sub: 'Rayos X giratorios y computadoras',
      fuente: 'TC · Historia y principios, matriz y unidades Hounsfield, ventanas, posprocesamiento, ventajas y limitaciones',
      ramas: [
        { t: 'Principio', hojas: [
          ['Armazón con el haz rotatorio y los detectores', 'Gantry || Caballete', 'gantry|caballete'],
          ['Rango de números TC', '−1000 a +1000 UH || -1000 a +1000 || -1.000 a +1.000', '1000|1.000']
        ] },
        { t: 'Densidades', hojas: [
          ['Absorben más radiación: se ven blancas', 'Hiperdensas || Más densas || Alta atenuación', 'hiperdens|densas|alta'],
          ['Absorben poca radiación y se ven oscuras (aire, grasa)', 'Hipodensas || Menos densas || Baja atenuación', 'hipodens|menos dens|baja aten'],
          ['Rango preseleccionado de números TC para la escala de grises', 'Ventana', 'ventana']
        ] },
        { t: 'Ventanas del tórax', hojas: [
          ['Parénquima y bronquios', 'Pulmonar || Ventana pulmonar', 'pulmonar'],
          ['Estructuras del centro del tórax, hilios y pleura', 'Mediastínica || Ventana mediastínica', 'mediastin'],
          ['¿Hace falta repetir el estudio para cambiar de ventana?', 'No || No hace falta', '^no']
        ] },
        { t: 'Ventajas', hojas: [
          ['Densidades que distingue frente a las 5 de la RX', 'Más de 1000 || > 1000', '1000|1.000'],
          ['Planos de reconstrucción', 'Axial, sagital y coronal', 'axial;sagital;coronal'],
          ['Aplicaciones nuevas', 'Colonoscopia y broncoscopia virtual', 'virtual']
        ] },
        { t: 'Limitaciones', hojas: [
          ['Tipo de radiación', 'Ionizante || Radiación ionizante', 'ionizant'],
          ['¿Es portátil?', 'No || Todavía no', '^no']
        ] }
      ]
    },

    /* ───────────── P2 · Resonancia magnética ───────────── */
    {
      id: 'img_rm', clase: 'RM', titulo: 'Resonancia magnética: principios y ponderaciones', tipo: 'mapa', sl: [[8]],
      centro: 'Resonancia', sub: 'Mide intensidad de señal',
      fuente: 'RM · Principios, ventajas, indicaciones, seguridad, ponderaciones T1, T2, FLAIR y densidad protónica',
      ramas: [
        { t: 'Principios', hojas: [
          ['Átomos que usa', 'Hidrógeno || Átomos de hidrógeno', 'hidrogen'],
          ['Los manipula con campos magnéticos y pulsos de…', 'Radiofrecuencia', 'radiofrecuenc'],
          ['La TC mide densidad; la RM mide…', 'Intensidad de señal', 'intensidad']
        ] },
        { t: 'Seguridad', hojas: [
          ['Dispositivo implantado que exige precaución', 'Marcapasos || Marcapasos cardíacos', 'marcapaso'],
          ['Metal de la mayoría de las placas modernas (no ferromagnético)', 'Titanio', 'titanio']
        ] },
        { t: 'Señal', hojas: [
          ['Blanco o muy brillante', 'Hiperintenso', 'hiperintens'],
          ['Gris intermedio', 'Isointenso', 'isointens'],
          ['Oscuro o negro', 'Hipointenso', 'hipointens']
        ] },
        { t: 'Ponderaciones', hojas: [
          ['Mejor detalle anatómico', 'T1', 't1'],
          ['Patológica: edema e inflamación brillantes', 'T2', 't2'],
          ['T2 con el LCR suprimido (oscuro)', 'FLAIR', 'flair'],
          ['Cartílagos, ligamentos y meniscos', 'Densidad protónica || DP', 'densidad proton|dp']
        ] }
      ]
    },
    {
      id: 'img_tr_te', clase: 'RM', titulo: 'TR y TE en cada ponderación', tipo: 'tabla', sl: [[8]],
      resumen: 'TR: tiempo entre dos pulsos. TE: tiempo hasta leer el eco. Los dos en milisegundos.',
      fuente: 'RM · TR (tiempo de repetición) y TE (tiempo de eco); tabla de ponderaciones',
      columnas: ['Ponderación', 'TR', 'TE', 'LCR'],
      filas: [
        ['T1', '[[Corto::corto]]', '[[Corto::corto]]', '[[Hipointenso || Oscuro::hipointens|oscur]]'],
        ['T2', '[[Largo::largo]]', '[[Largo::largo]]', '[[Hiperintenso || Brillante::hiperintens|brillant]]'],
        ['Densidad protónica', '[[Largo::largo]]', '[[Corto::corto]]', '—'],
        ['FLAIR', 'Variante de T2', 'Variante de T2', '[[Hipointenso || Suprimido::hipointens|suprim]]']
      ]
    },
    {
      id: 'img_tc_rm_tejidos', clase: 'RM', titulo: 'TC y RM: cómo se ve cada tejido', tipo: 'tabla', sl: [[8]],
      resumen: 'La tabla de la clase para comparar el encéfalo en TC, T1, T2 y FLAIR.',
      fuente: 'RM · Densidades en TC y RM (hueso, grasa, LCR, sustancia blanca y gris)',
      columnas: ['Estructura', 'TC', 'T1', 'T2', 'FLAIR'],
      filas: [
        ['Hueso', '[[Hiperdenso::hiperdens]]', 'Hipointenso', 'Hipointenso', 'Hipointenso'],
        ['Grasa', 'Hipodensa', '[[Hiperintensa || Hiperintenso::hiperintens]]', 'Hiperintensa', 'Hiperintensa'],
        ['LCR', '[[Hipodenso || Hipodensa::hipodens]]', '[[Hipointenso::hipointens]]', '[[Hiperintenso || Hiperintensa::hiperintens]]', '[[Hipointenso::hipointens]]'],
        ['Sustancia blanca', 'Hipodensa', 'Levemente hiperintensa', '[[Hipointensa || Hipointenso::hipointens]]', 'Hipointensa'],
        ['Sustancia gris', 'Hiperdensa', '[[Isointensa || Isointenso::isointens]]', 'Isointensa', 'Isointensa']
      ]
    },

    /* ───────────── P2 · Trauma craneoencefálico ───────────── */
    {
      id: 'img_tce', clase: 'TCE', titulo: 'TCE: epidemiología, clasificación y fisiopatología', tipo: 'mapa', sl: [[9]],
      centro: 'TCE', sub: 'Impacto violento en la región craneal y facial',
      fuente: 'TCE · Definición, epidemiología, clasificación clínica, fisiopatología y doctrina de Monro-Kellie',
      ramas: [
        { t: 'Epidemiología', hojas: [
          ['Edad más afectada', '15 a 45 años || 15-45 años', '15;45'],
          ['Cuántas veces más en varones', 'Tres || 3 veces || Tres veces', 'tres|3'],
          ['Causa más frecuente (75%)', 'Accidentes de tráfico', 'trafico|transito']
        ] },
        { t: 'Fracturas', hojas: [
          ['El 80% de las fracturas craneales', 'Lineal || Fractura lineal', 'lineal'],
          ['Hundimiento con cuero cabelludo intacto', 'Simple o cerrada || Cerrada', 'cerrada|simple'],
          ['Hundimiento con cuero cabelludo lacerado (80%)', 'Compuesta o abierta || Abierta', 'abierta|compuesta']
        ] },
        { t: 'Lesión primaria', hojas: [
          ['Focal, por fuerzas directas', 'Contusión cerebral || Contusión', 'contusi'],
          ['Difusa, por estiramiento, cizallamiento y rotación', 'Lesión axonal difusa', 'axonal']
        ] },
        { t: 'Lesión secundaria', hojas: [
          ['Daños extracraneales de la clase', 'Hipoxia e hipotensión || Hipoxia, hipotensión', 'hipoxia|hipotens'],
          ['Neurotransmisor que se libera', 'Glutamato', 'glutamat']
        ] },
        { t: 'Contenido craneal', hojas: [
          ['Masa encefálica', '80%', '80'],
          ['Sangre y LCR', '10% cada uno || 10%', '10']
        ] }
      ]
    },
    {
      id: 'img_glasgow', clase: 'TCE', titulo: 'Escala de coma de Glasgow', tipo: 'tabla', sl: [[9]],
      resumen: 'Puntaje mínimo 3, máximo 15. La tabla GCS-P de la clase resta puntos por la reactividad pupilar.',
      fuente: 'TCE · Escala de coma de Glasgow (ocular, verbal, motora), reactividad pupilar y clasificación',
      columnas: ['Respuesta', 'Puntaje máximo', 'Mejor respuesta'],
      filas: [
        ['[[Ocular || Apertura ocular::ocular]]', '[[4::4]]', 'Espontánea'],
        ['[[Verbal::verbal]]', '[[5::5]]', 'Orientado y conversando'],
        ['[[Motora::motora]]', '[[6::6]]', 'Obedece órdenes'],
        ['Motora 3', '—', 'Flexión anormal: rigidez de [[decorticación::decortic]]'],
        ['Motora 2', '—', 'Extensión anormal: rigidez de [[descerebración::descerebr]]'],
        ['Reactividad pupilar', 'Ninguna: −2; unilateral: −1', 'Bilateral: 0'],
        ['TCE grave', 'Glasgow [[≤ 8 || 8 o menos || Menor o igual a 8 || 3 a 8::8]]', '10% de los casos']
      ]
    },
    {
      id: 'img_tce_tc', clase: 'TCE', titulo: 'HTIC, criterios de TC y hematomas', tipo: 'mapa', sl: [[9]],
      centro: 'TCE en la urgencia', sub: 'Qué buscar y cuándo pedir TC',
      fuente: 'TCE · Hipertensión intracraneal, PIC, criterios de TAC craneal, fracturas de base y hematomas',
      ramas: [
        { t: 'HTIC', hojas: [
          ['Vómitos sin náuseas previas', 'En escopetazo || Vómitos en escopetazo', 'escopetazo'],
          ['Signo que tarda unos días en aparecer', 'Edema de papila', 'papila'],
          ['PIC normal', '5 – 15 mmHg || 5-15 mmHg || 5 a 15 mmHg', '5;15'],
          ['Gold standard: mide la PIC y drena LCR', 'Catéter intraventricular || DVE', 'intraventric|dve']
        ] },
        { t: 'Base de cráneo', hojas: [
          ['Equimosis periorbitaria', 'Ojos de mapache', 'mapache'],
          ['Equimosis sobre la apófisis mastoides', 'Signo de Battle || Battle', 'battle'],
          ['Sangre detrás del tímpano', 'Hemotímpano', 'hemotimpan']
        ] },
        { t: 'Pedir TC si…', hojas: [
          ['Glasgow en la valoración inicial menor a…', '13', '13'],
          ['Pérdida de conciencia que aumenta el riesgo: más de…', '15 minutos', '15'],
          ['Utilidad de la RX de cráneo', 'Escasa || Escasa utilidad', 'escasa']
        ] },
        { t: 'Hematomas', hojas: [
          ['Entre la duramadre y el cráneo; no cruza las suturas', 'Epidural || Extradural', 'epidural|extradural'],
          ['Entre la duramadre y el cerebro; semilunar', 'Subdural', 'subdural'],
          ['Subdural agudo en la TC', 'Hiperdenso || Blanco', 'hiperdens|blanco'],
          ['Subdural crónico en la TC', 'Hipodenso || Negro', 'hipodens|negro']
        ] }
      ]
    },

    /* ───────────── Simulado ───────────── */
    {
      id: 'simulado_img', clase: 'Todas las clases', titulo: 'Simulado de prueba: Imagenología', tipo: 'casos', cronometro: true,
      resumen: 'Preguntas de opción múltiple de todas las clases. Use el cronómetro y corrija al final.',
      fuente: 'Contenido de las clases 00 a 5.0, TC, RM y TCE (Dr. Feijó)',
      casos: [
        ['', 'Röntgen descubrió los rayos X en:', 'c) 1895', 'c', 'El 8 de noviembre; la primera radiografía fue el 22 de diciembre.',
          ['a) 1663', 'b) 1869', 'c) 1895', 'd) 1913']],
        ['', 'En el tubo de rayos X, la energía de los electrones se convierte en:', 'b) 99% calor y 1% rayos X', 'b', 'Radiación de frenado (Bremsstrahlung) en el ánodo de tungsteno.',
          ['a) 99% rayos X y 1% calor', 'b) 99% calor y 1% rayos X', 'c) 50% y 50%', 'd) Solo rayos X']],
        ['', 'El principio ALARA se basa en:', 'a) Tiempo mínimo, distancia máxima y blindaje', 'a', '"Tan bajo como sea razonablemente posible".',
          ['a) Tiempo mínimo, distancia máxima y blindaje', 'b) Dosis máxima en poco tiempo', 'c) Solo el uso de plomo', 'd) Distancia mínima al tubo']],
        ['', 'En la escala Hounsfield, el agua tiene:', 'b) 0 HU', 'b', 'El aire tiene −1000 HU.',
          ['a) −1000 HU', 'b) 0 HU', 'c) +1000 HU', 'd) +3000 HU']],
        ['', 'La densidad que se ve gris oscuro en la radiografía es:', 'c) La grasa', 'c', 'Aire negro, grasa gris oscuro, tejido blando gris, hueso blanquecino, metal blanco.',
          ['a) El aire', 'b) El hueso', 'c) La grasa', 'd) El metal']],
        ['', 'Una inspiración excelente en la RX de tórax permite contar sobre el diafragma:', 'd) 10 costillas posteriores', 'd', 'Menos de 10 indica inspiración insuficiente.',
          ['a) 4 posteriores', 'b) 6 posteriores', 'c) 8 posteriores', 'd) 10 costillas posteriores']],
        ['', 'El índice cardiotorácico normal del adulto es:', 'a) Igual o menor a 0,5', 'a', 'Mayor a 0,5 en una PA bien inspirada = cardiomegalia.',
          ['a) Igual o menor a 0,5', 'b) Mayor a 0,6', 'c) Igual a 0,8', 'd) Menor a 0,2']],
        ['', 'Una placa en la que el pulmón se ve negro y los cuerpos vertebrales retrocardíacos se ven muy bien está:', 'c) Sobreexpuesta (dura)', 'c', 'La blanda o subexpuesta se ve muy gris y no deja ver las vértebras.',
          ['a) Subexpuesta (blanda)', 'b) Rotada', 'c) Sobreexpuesta (dura)', 'd) Mal inspirada']],
        ['', 'En la proyección AP, a diferencia de la PA:', 'b) Las escápulas se proyectan sobre los campos pulmonares', 'b', 'Además, la silueta cardíaca se ve magnificada.',
          ['a) Las escápulas quedan fuera del tórax', 'b) Las escápulas se proyectan sobre los campos pulmonares', 'c) El corazón se ve más chico', 'd) El paciente está de pie']],
        ['', 'La neumonía del lóbulo medio borra:', 'a) El borde cardíaco derecho', 'a', 'La língula borra el borde izquierdo; los inferiores, los hemidiafragmas.',
          ['a) El borde cardíaco derecho', 'b) El borde cardíaco izquierdo', 'c) El botón aórtico', 'd) El hemidiafragma izquierdo']],
        ['', 'Un nódulo pulmonar mide entre:', 'c) 2 mm y 3 cm', 'c', 'Más de 3 cm es masa.',
          ['a) 1 y 5 mm', 'b) 3 y 6 cm', 'c) 2 mm y 3 cm', 'd) Más de 3 cm']],
        ['', 'La calcificación en "pop corn" sugiere:', 'd) Hamartoma', 'd', 'Cáscara de huevo: silicosis; ojo de buey: TBC.',
          ['a) Silicosis', 'b) Tuberculosis', 'c) Carcinoma', 'd) Hamartoma']],
        ['', 'La proyección de abdomen útil para niveles hidroaéreos y aire libre es:', 'b) Bipedestación', 'b', 'El AP supino sirve para gas intestinal, calcificaciones y masas.',
          ['a) AP supino', 'b) Bipedestación', 'c) Oblicua', 'd) Lordótica']],
        ['', 'El receso entre el hígado y el riñón derecho se llama:', 'a) Espacio de Morrison', 'a', 'También llamado receso hepatorrenal.',
          ['a) Espacio de Morrison', 'b) Saco de Douglas', 'c) Receso de Landzert', 'd) Canaleta paracólica']],
        ['', 'El gold standard del diagnóstico de acalasia es:', 'c) La manometría esofágica', 'c', 'El esofagograma muestra el pico de pájaro.',
          ['a) La RX simple', 'b) La TC', 'c) La manometría esofágica', 'd) La ecografía']],
        ['', 'La técnica de referencia, diagnóstica y terapéutica, para la coledocolitiasis es:', 'b) CPRE', 'b', 'La colangiorresonancia no necesita contraste.',
          ['a) Ecografía', 'b) CPRE', 'c) RX simple', 'd) Gammagrafía HIDA']],
        ['', 'El signo del colon cortado se asocia a:', 'd) Pancreatitis aguda', 'd', 'El gas del colon se interrumpe en el ángulo esplénico.',
          ['a) Vólvulo', 'b) Acalasia', 'c) Apendicitis', 'd) Pancreatitis aguda']],
        ['', 'El signo de la gaviota indica:', 'a) Neumoperitoneo', 'a', 'Aire libre en la cavidad peritoneal.',
          ['a) Neumoperitoneo', 'b) Intususcepción', 'c) Obstrucción de colon', 'd) Ascitis']],
        ['', 'La TC usa:', 'b) Radiación ionizante y mide densidad', 'b', 'La RM no usa radiación ionizante y mide intensidad de señal.',
          ['a) Ondas de sonido', 'b) Radiación ionizante y mide densidad', 'c) Campos magnéticos', 'd) Isótopos emitidos por el paciente']],
        ['', 'La ponderación con TR largo y TE largo es:', 'c) T2', 'c', 'T1: TR y TE cortos; densidad protónica: TR largo y TE corto.',
          ['a) T1', 'b) Densidad protónica', 'c) T2', 'd) Difusión']],
        ['', 'En FLAIR el LCR se ve:', 'a) Hipointenso (suprimido)', 'a', 'Así se ve el edema cerca de los ventrículos (ACV, esclerosis múltiple).',
          ['a) Hipointenso (suprimido)', 'b) Hiperintenso', 'c) Isointenso', 'd) Igual que en T2']],
        ['', 'El hematoma entre la duramadre y el cráneo que no cruza las suturas es:', 'd) Epidural', 'd', 'El subdural es semilunar, entre la duramadre y el cerebro.',
          ['a) Subdural', 'b) Subaracnoideo', 'c) Intraparenquimatoso', 'd) Epidural']],
        ['', 'El signo de Battle es:', 'b) Equimosis sobre la apófisis mastoides', 'b', 'Signo de fractura de base de cráneo, como los ojos de mapache.',
          ['a) Equimosis periorbitaria', 'b) Equimosis sobre la apófisis mastoides', 'c) Salida de LCR por la nariz', 'd) Sangre en el tímpano']],
        ['', 'Un TCE grave tiene un Glasgow:', 'a) Menor o igual a 8', 'a', 'El puntaje va de 3 a 15.',
          ['a) Menor o igual a 8', 'b) Entre 9 y 12', 'c) Entre 13 y 15', 'd) Igual a 15']],
        ['', 'La presión intracraneal normal es:', 'c) 5 a 15 mmHg', 'c', 'El catéter intraventricular es el gold standard para medirla.',
          ['a) 0 a 2 mmHg', 'b) 20 a 40 mmHg', 'c) 5 a 15 mmHg', 'd) 60 a 80 mmHg']]
      ]
    }
  ]
};
