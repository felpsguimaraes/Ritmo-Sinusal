/* Sinus · Mapas guiados · Semiología Médica I (5º semestre, UCP)
   Teoría: clases de la Dra. Cielo Brizueña (Unidad I a V): 1 y 2 Introducción, 3 Signos vitales, 4 Historia clínica,
   5 Ectoscopia, 7 Examen físico de tórax (respiratorio y cardiovascular).
   Práctica (Dra. Lilian Nuñez): Historia Clínica Práctica de la pasta PRÁTICA y el ejemplo de ectoscopia de la clase.
   sl = [clase, página inicial, página final] del PDF de la clase (la clase = el número del archivo en la pasta:
   1 y 2 Introducción, 3 Signos vitales, 4 Historia clínica, 5 Ectoscopia, 6 Ectoscopia Clase IV, 7 Tórax).
   En la clase 7 (PDF de 15 MB, leído sin páginas) se usa el número impreso en cada diapositiva + 1 (la tapa no tiene número).
   Todo fue conferido con el texto de las diapositivas; lo que la clase no dice, no está acá.
   Respuestas: escribir el término completo. "A || B" = las dos valen. */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
window.SINUS_MAPAS.semiologia = {
  nome: 'Semiología Médica I',
  docente: 'Dra. Cielo Brizueña',
  fonte: 'Unidades I a V, clases 1 a 7 · UCP Ciudad del Este',
  docentePratica: 'Dra. Lilian Nuñez',
  fontePratica: 'Historia Clínica Práctica: anamnesis, ectoscopia y examen físico (tórax, corazón y abdomen)',
  modulos: [

    /* ───────────── CLASE 1 · Introducción ───────────── */
    {
      id: 'semio_bases', clase: 'Clase 1', titulo: 'Semiología: signo, síntoma y síndrome', tipo: 'mapa', sl: [[1,3,6]],
      centro: 'Semiología', sub: 'De los signos y síntomas al razonamiento clínico',
      fuente: 'Clase 1 · Introducción a la Semiología (concepto, partes, signo, síntoma y síndrome)',
      ramas: [
        { t: 'Concepto', hojas: [
          ['Rama de la medicina que identifica las manifestaciones de las enfermedades', 'Semiología', 'semiolog'],
          ['Etimología: "Semeyon" significa…', 'Signo', 'signo'],
          ['Etimología: "Logos" significa…', 'Estudio || Estudio, discurso', 'estudio|discurso']
        ] },
        { t: 'Sus dos partes', hojas: [
          ['Técnica de la búsqueda del signo: cómo se explora cada manifestación', 'Semiotecnia', 'semiotecn'],
          ['Enseñanza preparatoria para reunir e interpretar signos y síntomas y llegar al diagnóstico', 'Clínica propedéutica || Propedéutica', 'propedeut']
        ] },
        { t: 'Conceptos clave', hojas: [
          ['Manifestación objetiva, que descubre el médico al examinar', 'Signo', 'signo!sintoma|sindrome'],
          ['Manifestación subjetiva, que solo percibe el paciente', 'Síntoma', 'sintoma!signo|sindrome'],
          ['Conjunto de signos y síntomas relacionados, que puede tener causas diversas', 'Síndrome', 'sindrome']
        ] },
        { t: 'Ejemplos de la clase', hojas: [
          ['Petequias, edema, soplo cardíaco, fiebre objetivada', 'Signos', 'signo'],
          ['Dolor, disnea, náuseas, sensación febril', 'Síntomas', 'sintoma'],
          ['Intestino irritable', 'Síndrome', 'sindrome']
        ] }
      ]
    },
    {
      id: 'semio_comunicacion', clase: 'Clase 1', titulo: 'Comunicación médica e iatrogenia', tipo: 'mapa', sl: [[1,7,15]],
      centro: 'Relación médico-paciente', sub: 'Comunicar, explorar y no dañar',
      fuente: 'Clase 1 · Comunicación en la consulta, indagación, principios, iatrogenia y relación médico-paciente',
      ramas: [
        { t: 'Comunicación', hojas: [
          ['La más usada; debe ser breve, clara y sencilla', 'Verbal || Comunicación verbal', 'verbal!extraverbal'],
          ['Mirada, gestos, actitudes, tono de voz y posturas', 'Extraverbal || Comunicación extraverbal', 'extraverbal|no verbal']
        ] },
        { t: 'Indagación', hojas: [
          ['Se interroga e interactúa con el propio paciente: información de primera mano', 'Directa || Indagación directa', 'directa'],
          ['Se interroga a acompañantes cuando el paciente no puede responder', 'Indirecta || Indagación indirecta', 'indirecta']
        ] },
        { t: 'Principios', hojas: [
          ['1.º: incentivar el diálogo activo', 'Escuchar y preguntar', 'escuch;pregunt'],
          ['2.º: captar el lenguaje verbal, los gestos y las emociones', 'Observar', 'observ'],
          ['3.º: sintetizar lo verbal y lo extraverbal', 'Integrar', 'integr']
        ] },
        { t: 'Tres momentos', hojas: [
          ['Presentación, saludo y vínculo de confianza', 'El encuentro || Encuentro', 'encuentro'],
          ['Explicar cada paso y pedir consentimiento', 'Durante el examen físico || Examen físico', 'examen'],
          ['Resumir hallazgos y confirmar que el paciente entendió', 'La despedida || Despedida', 'despedida']
        ] },
        { t: 'Iatrogenia', hojas: [
          ['Daño no intencional que ocasiona el profesional de la salud', 'Iatrogenia', 'iatrogen'],
          ['En la comunicación: lenguaje que el paciente no entiende', 'Lenguaje técnico', 'tecnic'],
          ['En el examen físico: no respetar…', 'El pudor || Pudor', 'pudor'],
          ['Para evitarla, pedir siempre…', 'Consentimiento informado', 'consentim']
        ] },
        { t: 'El ser médico', hojas: [
          ['Estudio riguroso y técnico del cuerpo y la enfermedad', 'Operaciones objetivantes', 'objetivant'],
          ['Acompañamiento humano del paciente', 'Operaciones empáticas', 'empatic']
        ] }
      ]
    },

    /* ───────────── CLASE 2 · Dolor, disnea y fiebre ───────────── */
    {
      id: 'semio_dolor_tipos', clase: 'Clase 2', titulo: 'Tipos de dolor', tipo: 'tabla', sl: [[2,4,6]],
      resumen: 'Origen, cómo lo describe el paciente y el caso que la profesora usó para cada tipo.',
      fuente: 'Clase 2 · Semiología del dolor (definición, clasificación y casos clínicos)',
      columnas: ['Tipo', 'Origen', 'Cómo se describe', 'Caso de la clase'],
      filas: [
        ['[[Neuropático::neuropat]]', 'Lesión o disfunción del sistema [[nervioso::nervios]] periférico o central', 'Urente, punzante o [[descarga eléctrica::descarga|electric]], con alteraciones sensitivas', 'Diabética con ardor "en [[calcetín::calcetin]]" y alodinia'],
        ['[[Somático::somatic]]', 'Estímulo de [[nociceptores::nocicep]] en piel, músculo, hueso o articulaciones', 'Bien [[localizado::localiz]]: "duele exactamente aquí"', 'Caída jugando al fútbol: dolor en el [[tobillo::tobillo]]'],
        ['[[Visceral::visceral]]', 'Distensión, isquemia o inflamación de [[vísceras::viscera]]', 'Difuso, mal localizado, con cortejo [[vegetativo::vegetat]]', 'Cólico en hipocondrio derecho con signo de [[Murphy::murphy]] positivo'],
        ['[[Psicogénico::psicogen]]', 'Sin sustrato [[orgánico::organic]]', 'Vinculado a factores psicológicos o emocionales', 'Cefalea y cervicalgia con estudios [[normales::normal]]']
      ]
    },
    {
      id: 'semio_alicia', clase: 'Clase 2', titulo: 'Semiología del dolor: ALICIA FREDUSA', tipo: 'mapa', sl: [[2,7,11]],
      centro: 'ALICIA FREDUSA', sub: 'Lo que se pregunta de todo dolor',
      fuente: 'Clase 2 · Mnemotecnias del dolor (ALICIA FREDUSA y LITIIC) y caracteres del dolor',
      ramas: [
        { t: 'ALICIA', hojas: [
          ['A: ¿cuándo y cómo comenzó?', 'Aparición', 'aparic'],
          ['L: ¿dónde se ubica?', 'Localización', 'localiz'],
          ['I: ¿hacia dónde se propaga?', 'Irradiación', 'irradiac'],
          ['C: ¿cómo se siente el dolor?', 'Características', 'caracter'],
          ['I: ¿qué tan fuerte es? (escala EVA)', 'Intensidad', 'intensid'],
          ['A: ¿qué lo alivia o lo empeora?', 'Atenuantes o agravantes || Atenuantes y agravantes', 'atenuant;agravant']
        ] },
        { t: 'FREDUSA', hojas: [
          ['FRE: cada cuánto se repiten las crisis', 'Frecuencia', 'frecuenc'],
          ['DU: cuánto dura cada crisis', 'Duración', 'duracion'],
          ['SA: náuseas, vómitos, fiebre que acompañan', 'Síntomas asociados', 'sintomas asociad|asociad']
        ] },
        { t: 'Caracteres del dolor', hojas: [
          ['Como si se quemara', 'Urente || Quemante', 'urente|quemant'],
          ['Como si apretara', 'Opresivo || Constrictivo', 'opresiv|constrict'],
          ['Como si atravesara de lado a lado', 'Transfixiante', 'transfix'],
          ['Retortijón que va y viene', 'Cólico', 'colico'],
          ['Como un golpe de electricidad o una llamarada', 'Fulgurante', 'fulgur'],
          ['Como un taladro', 'Terebrante || Taladrante', 'terebrant'],
          ['Con sensación de latido', 'Pulsátil', 'pulsatil'],
          ['Con pesadez', 'Gravativo', 'gravativ']
        ] },
        { t: 'LITIIC', hojas: [
          ['La T de LITIIC', 'Tipo', 'tipo'],
          ['La última C de LITIIC', 'Circunstancia de aparición', 'circunstanc']
        ] }
      ]
    },
    {
      id: 'semio_disnea', clase: 'Clase 2', titulo: 'Disnea', tipo: 'mapa', sl: [[2,12,15]],
      centro: 'Disnea', sub: 'Sensación de falta o "sed" de aire',
      fuente: 'Clase 2 · Disnea: definición, escala MRC modificada, clasificación y anamnesis',
      ramas: [
        { t: 'Escala MRC modificada', hojas: [
          ['Grado 0', 'Falta de aire con ejercicio intenso', 'ejercicio intenso|intenso'],
          ['Grado 1', 'Falta de aire al subir escaleras', 'escalera'],
          ['Grado 2', 'Debe parar al andar junto a alguien de su edad', 'parar|su edad'],
          ['Grado 3', 'Para al caminar unos 100 m', '100'],
          ['Grado 4', 'Disnea de reposo', 'reposo|salir de casa']
        ] },
        { t: 'Clasificación', hojas: [
          ['Según su etiopatogenia (1)', 'Por hiperventilación', 'hiperventil'],
          ['Según su etiopatogenia (2)', 'Por disminución de la capacidad vital', 'capacidad vital'],
          ['Según sus causas', 'Respiratorias, cardíacas y de otros orígenes', 'respirator;cardiac']
        ] },
        { t: 'Relación con la posición', hojas: [
          ['En decúbito; obliga a sentarse o a usar almohadas', 'Ortopnea', 'ortopnea'],
          ['Mejora en el decúbito del lado opuesto', 'Trepopnea', 'trepopnea'],
          ['Al inclinarse hacia adelante', 'Bendopnea', 'bendopnea'],
          ['Solo en posición vertical (de pie o sentado)', 'Platipnea', 'platipnea']
        ] },
        { t: 'Otros tipos', hojas: [
          ['Con cualquier ejercicio muscular (cardíaco o no cardíaco)', 'Disnea de esfuerzo || De esfuerzo', 'esfuerzo'],
          ['Inicio y cese abrupto', 'Disnea paroxística || Paroxística', 'paroxist|crisis'],
          ['Aun en decúbito dorsal', 'Disnea de reposo || De reposo', 'reposo']
        ] },
        { t: 'Anamnesis', hojas: [
          ['Forma de inicio, duración, intervalos libres', 'Inicio y evolución', 'inicio;evoluc'],
          ['Leve, moderado o grave', 'Relación con el esfuerzo', 'esfuerzo'],
          ['Reposo, broncodilatadores, posición', 'Factores atenuantes', 'atenuant']
        ] }
      ]
    },
    {
      id: 'semio_fiebre', clase: 'Clase 2', titulo: 'Fiebre e hipertermia', tipo: 'mapa', sl: [[2,16,21]],
      centro: 'Fiebre', sub: 'Elevación regulada de la temperatura (mayor a 38 °C)',
      fuente: 'Clase 2 · Fiebre: definición, patrones febriles, hipertermia y anamnesis',
      ramas: [
        { t: 'Mecanismo', hojas: [
          ['Lo que se reajusta en la fiebre', 'El termostato hipotalámico || Termostato hipotalámico', 'hipotalam'],
          ['Mediadores que lo reajustan', 'Pirógenos', 'pirogen']
        ] },
        { t: 'Patrones febriles', hojas: [
          ['Oscilación diaria menor a 0,6 °C', 'Continua || Fiebre continua', 'continua|sostenida'],
          ['Fluctúa y no vuelve a lo normal en el día', 'Remitente || Fiebre remitente', 'remitent'],
          ['Retorna a valores normales durante cada día de fiebre', 'Intermitente || Fiebre intermitente || Héctica || Séptica', 'intermit|hectic|septic'],
          ['Episodios febriles separados por días afebriles', 'Recurrente || Fiebre recurrente', 'recurrent']
        ] },
        { t: 'Hipertermia', hojas: [
          ['Mecanismo: fracaso de los centros…', 'Termorreguladores', 'termorregul'],
          ['Causa por el calor ambiental', 'Golpe de calor', 'golpe de calor'],
          ['Causa por la anestesia', 'Hipertermia maligna', 'malign'],
          ['Causa por antipsicóticos', 'Síndrome neuroléptico maligno', 'neurolept']
        ] },
        { t: 'Declinación', hojas: [
          ['Descenso rápido, en horas, con sudoración y poliuria', 'En crisis || Crisis', 'crisis'],
          ['Descenso lento, cerca de medio grado por día', 'En lisis || Lisis', 'lisis']
        ] }
      ]
    },

    /* ───────────── CLASE 3 · Signos vitales ───────────── */
    {
      id: 'semio_signos_vitales', clase: 'Clase 3', titulo: 'Signos vitales: valores normales', tipo: 'mapa', sl: [[3,4,4],[3,12,17]],
      centro: 'Signos vitales', sub: 'FC · FR · temperatura · PA · SpO₂',
      fuente: 'Clase 3 · Signos vitales: frecuencia cardíaca, frecuencia respiratoria, temperatura y saturación',
      ramas: [
        { t: 'Frecuencia cardíaca', hojas: [
          ['Adulto sano en reposo (lpm)', '60 – 100 lpm || 60-100 lpm || 60-100 || 60 a 100 || 60 a 100 lpm', '60;100'],
          ['Recién nacido (lpm)', '100 – 150 lpm || 100-150 lpm || 100-150 || 100 a 150 || 100 a 150 lpm', '100;150'],
          ['Niño (lpm)', '80 – 120 lpm || 80-120 lpm || 80-120 || 80 a 120 || 80 a 120 lpm', '80;120'],
          ['Deportistas jóvenes (lpm)', '40 – 60 lpm || 40-60 lpm || 40-60 || 40 a 60 || 40 a 60 lpm', '40;60'],
          ['¿En qué sexo la FC del adulto es unos 10 lpm mayor?', 'En la mujer || La mujer || Mujer || Femenino || Sexo femenino', 'mujer|femenin']
        ] },
        { t: 'Frecuencia respiratoria', hojas: [
          ['Adulto (rpm)', '16 – 25 rpm || 16-25 rpm || 16-25 || 16 a 25 || 16 a 25 rpm', '16;25'],
          ['FR aumentada (fiebre, ansiedad)', 'Taquipnea', 'taquipnea'],
          ['FR disminuida (atletas, sedantes)', 'Bradipnea', 'bradipnea'],
          ['Recién nacido (rpm)', '30 – 60 rpm || 30-60 rpm || 30-60 || 30 a 60 || 30 a 60 rpm', '30;60']
        ] },
        { t: 'Temperatura', hojas: [
          ['Normal', '36 – 37,5 °C || 36-37,5 °C || 36-37,5 || 36 a 37,5 || 36 a 37,5 °C', '36;37'],
          ['37,5 – 38 °C', 'Febrícula', 'febricul'],
          ['Menos de 35 °C', 'Hipotermia', 'hipotermia'],
          ['Más de 41,5 °C', 'Hiperpirexia', 'hiperpirex']
        ] },
        { t: 'Saturación de O₂', hojas: [
          ['SpO₂ normal', '95 – 100% || 95-100% || 95-100 || 95 a 100% || 95 a 100', '95;100'],
          ['Hipoxemia leve', '90 – 94% || 90-94% || 90-94 || 90 a 94% || 90 a 94', '90;94'],
          ['Hipoxemia moderada', '85 – 89% || 85-89% || 85-89 || 85 a 89% || 85 a 89', '85;89'],
          ['Hipoxemia grave', 'Menos de 85% || < 85% || <85% || <85 || Menor a 85%', '85'],
          ['Por debajo de qué valor se habla de hipoxemia en general', 'Menos de 90% || < 90% || <90% || 90% || 90', '90']
        ] }
      ]
    },
    {
      id: 'semio_pa_tabla', clase: 'Clase 3', titulo: 'Presión arterial: clasificación', tipo: 'tabla', sl: [[3,10,10]],
      resumen: 'Promedio de 5 mediciones en consultorio, en 3 oportunidades diferentes.',
      fuente: 'Clase 3 · Valores normales y clasificación de la PA',
      columnas: ['Categoría', 'PAS', 'PAD'],
      filas: [
        ['[[Normal::normal]]', '< [[120::120]] mmHg', '< [[80::80]] mmHg'],
        ['[[Elevada::elevad]]', '[[120-129 || 120 – 129 || 120 a 129::120;129]]', '< 80 mmHg'],
        ['[[Estadio 1 || Hipertensión estadio 1::estadio 1]]', '[[130-139 || 130 – 139 || 130 a 139::130;139]] mmHg', '[[80-89 || 80 – 89 || 80 a 89::80;89]] mmHg'],
        ['[[Estadio 2 || Hipertensión estadio 2::estadio 2]]', '≥ [[140::140]] mmHg', '≥ [[90::90]] mmHg'],
        ['[[Crisis hipertensiva::crisis]]', '> [[180::180]] mmHg', '> [[120::120]] mmHg']
      ]
    },
    {
      id: 'semio_pa_tecnica', clase: 'Clase 3', titulo: 'Presión arterial: Korotkoff y técnica', tipo: 'mapa', sl: [[3,5,11]],
      centro: 'Presión arterial', sub: 'Fuerza de la sangre sobre las paredes arteriales',
      fuente: 'Clase 3 · Presión sistólica y diastólica, escala de Korotkoff, técnica, factores y presión de pulso',
      ramas: [
        { t: 'Sistólica y diastólica', hojas: [
          ['Mayor valor, durante la eyección ventricular', 'Presión sistólica || Sistólica', 'sistolic'],
          ['Menor valor; depende de la resistencia vascular periférica', 'Presión diastólica || Diastólica', 'diastolic']
        ] },
        { t: 'Escala de Korotkoff', hojas: [
          ['Fase que marca la presión sistólica', '1.ª fase || Primera fase', '1|primera'],
          ['Ruidos de la 1.ª fase', 'Sordos || Ruidos sordos', 'sordo'],
          ['Ruidos de la 2.ª fase', 'Soplantes || Ruidos soplantes', 'soplant'],
          ['Límite que marca la diastólica', 'Entre la 3.ª y la 4.ª fase || Entre la 3.ª y 4.ª fase', '3;4'],
          ['Fase 5', 'Silencio total', 'silencio']
        ] },
        { t: 'Técnica', hojas: [
          ['Campana del estetoscopio: cuántos cm por debajo del borde del manguito', '2 cm || 2', '2'],
          ['Manguito común (cm)', '12 × 23 cm || 12 x 23 cm || 12 x 23 || 12x23 || 12x23 cm', '12;23'],
          ['Manguito en obesidad (cm)', '15 × 35 cm || 15 x 35 cm || 15 x 35 || 15x35 || 15x35 cm', '15;35'],
          ['Diferencia normal entre brazos (usar el de mayor presión)', 'Hasta 15 mmHg || 15 mmHg || Hasta 15', '15'],
          ['Desinflar muy lento la presión…', 'La sobreestima || Sobreestima || Sobreestimar', 'sobreestim'],
          ['Desinflar muy rápido la presión…', 'La subestima || Subestima || Subestimar', 'subestim']
        ] },
        { t: 'Factores y conceptos', hojas: [
          ['Aumento transitorio en el consultorio', 'Hipertensión de bata blanca || Bata blanca', 'bata blanca'],
          ['Medición ambulatoria que confirma la HTA', 'MAPA', 'mapa'],
          ['Sistólica menos diastólica', 'Presión de pulso || Presión diferencial', 'presion de pulso|diferencial'],
          ['Desaparece el 2.º ruido de Korotkoff y luego reaparecen los demás', 'Agujero auscultatorio', 'agujero']
        ] }
      ]
    },
    {
      id: 'semio_pulso_fr', clase: 'Clase 3', titulo: 'Cómo medir el pulso', tipo: 'fluxo', sl: [[3,13,14]],
      resumen: 'Los 4 pasos de la palpación del pulso, en orden.',
      fuente: 'Clase 3 · Técnica para medir el pulso y la frecuencia respiratoria',
      pasos: [
        '[[Ubicar::ubic]] el punto de palpación: muñeca (radial), cuello (carótida) o pecho',
        '[[Colocar::coloc]] los pulpejos de los dedos índice, medio y anular, juntos, en línea',
        '[[Orientar::orient]] los dedos en el eje longitudinal de la arteria',
        '[[Palpar::palp]] variando la presión de los dedos hasta percibir el pulso con claridad',
        { end: 'FR: sin anunciar que se mide, contando [[1 minuto completo::minuto]] (se puede simular que se palpa el pulso radial)' }
      ]
    },

    /* ───────────── CLASE 4 · Historia clínica ───────────── */
    {
      id: 'semio_hc_orden', clase: 'Clase 4', titulo: 'Estructura de la historia clínica', tipo: 'fluxo', sl: [[4,4,6]],
      resumen: 'El mapa de la HC, en el orden en que se escribe.',
      fuente: 'Clase 4 · Historia clínica: mapa general (anamnesis, examen físico, consideraciones diagnósticas, epicrisis)',
      pasos: [
        '1.1 [[Datos personales::datos personal]]',
        '1.2 [[Motivo de consulta::motivo]]',
        '1.3 [[AEA::aea|enfermedad actual]] (antecedentes de la enfermedad actual)',
        '1.4 [[AREA::area|remotos]] (antecedentes remotos)',
        '1.5 [[APP::app|personales]] (antecedentes patológicos personales)',
        '1.6 [[APF::apf|familiares]] (antecedentes patológicos familiares)',
        '1.7 [[AGO::ago|gineco]] (antecedentes gineco-obstétricos)',
        '1.8 [[Hábitos::habito]]',
        '1.9 [[Ectoscopia::ectoscop]]',
        '2. [[Examen físico::examen fisic]]: inspección, palpación, percusión y auscultación',
        '3. [[Consideraciones diagnósticas::consideraciones|diagnostic]]',
        '4. [[Epicrisis::epicrisis]] y evolución diaria'
      ]
    },
    {
      id: 'semio_hc_anamnesis', clase: 'Clase 4', titulo: 'Anamnesis: qué va en cada parte', tipo: 'mapa', sl: [[4,4,11]],
      centro: 'Historia clínica', sub: 'Anamnesis + examen físico + elaboración del médico',
      fuente: 'Clase 4 · Definición, dimensiones, anamnesis, datos personales, MC, AEA, AREA, APP, APF y AGO',
      ramas: [
        { t: '5 dimensiones', hojas: [
          ['Testimonio de lo actuado', 'Legal', 'legal'],
          ['Refleja la relación médico-paciente', 'Humano', 'human'],
          ['Las medidas tienen un costo', 'Económico', 'economic']
        ] },
        { t: 'Motivo de consulta', hojas: [
          ['Se lo llama la … médica de la HC', 'Portada', 'portada'],
          ['Lo que NO se consigna en el motivo de consulta', 'Diagnósticos', 'diagnost'],
          ['Ejemplo correcto de la clase', 'Dolor torácico y disnea de 3 días de evolución', 'dolor toracic;disnea']
        ] },
        { t: 'AEA y AREA', hojas: [
          ['Orden en que se redacta la enfermedad actual', 'Cronológico || Orden cronológico', 'cronolog'],
          ['Qué hace el médico mientras el paciente relata', 'No interrumpir || Escuchar sin interrumpir', 'interrump'],
          ['AREA: se busca un cuadro…', 'Similar previo || Similar', 'similar']
        ] },
        { t: 'APP', hojas: [
          ['Enfermedad de la infancia por Bordetella pertussis', 'Coqueluche || Tos ferina', 'coquelu|tos ferina'],
          ['Si no refiere, se registra "el paciente … haber padecido"', 'Niega', 'niega'],
          ['De la diabetes y la HTA se pregunta: ¿desde cuándo?, ¿tratado? y ¿…?', 'Controlado || ¿Controlado? || Controlada', 'control']
        ] },
        { t: 'AGO', hojas: [
          ['Edad de la primera menstruación', 'Menarca', 'menarc'],
          ['G, P, C, A', 'Gestaciones, partos, cesáreas y abortos', 'gestac;parto;cesare;aborto'],
          ['Prueba de detección preferida hoy', 'ADN del VPH || ADN-VPH', 'vph'],
          ['Cada cuántos años (no inmunodeprimidas)', 'Cada 5 años || 5 años', '5']
        ] }
      ]
    },
    {
      id: 'semio_habitos', clase: 'Clase 4', titulo: 'Hábitos: términos que hay que usar', tipo: 'tabla', sl: [[4,12,16]],
      resumen: 'Apetito, diuresis, catarsis intestinal, sueño y dipsia: el término médico y su valor.',
      fuente: 'Clase 4 · Hábitos: alimentación, apetito, diuresis, catarsis intestinal, sueño y dipsia',
      columnas: ['Término', 'Qué significa', 'Dato o causa de la clase'],
      filas: [
        ['[[Hiporexia::hiporex]]', 'Pérdida progresiva de las ganas de comer', 'Neoplasias, infecciones, enfermedades febriles'],
        ['[[Polifagia::polifag|hiperfag]]', 'Aumento del apetito', 'Diabetes mellitus e [[hipertiroidismo::hipertiroid]]'],
        ['[[Poliuria::poliuria]]', 'Diuresis mayor a [[3000 ml/día || 3 000 ml/día || 3000 ml || 3000::3000|3 000|3.000]]', 'Diabetes insípida, insuficiencia renal recompensada'],
        ['[[Oliguria::oliguria]]', 'Diuresis menor a [[500 ml/día || 500 ml || 500::500]]', 'Deshidratación, estados febriles, insuficiencia cardíaca'],
        ['[[Anuria::anuria]]', '0 ml: ausencia de formación o emisión de orina', 'Diuresis normal: [[1,5 litros/día || 1,5 l/día || 1,5 litros || 1,5 l || 1500 ml::1,5|1.5|1500]]'],
        ['[[Polaquiuria::polaquiur]]', 'Aumento de la frecuencia miccional', 'Irritación o infección urinaria baja'],
        ['[[Coluria::coluria]]', 'Orina color "coca-cola"', 'Presencia de [[bilis::bilis|bilirrub]]'],
        ['[[Melena::melena]]', 'Heces negras y fétidas', 'Sangrado digestivo [[alto::alto]]'],
        ['[[Hematoquecia::hematoquec]]', 'Sangre roja y fresca', 'Mezclada o no con la deposición'],
        ['[[Insomnio de terminación::terminac]]', 'Despierta temprano y no puede retomar el sueño', 'El de [[conciliación::conciliac]]: dificultad para tomar el sueño, por preocupaciones'],
        ['[[Polidipsia::polidips]]', 'Necesidad de beber con frecuencia y abundantemente', 'Lo contrario: [[adipsia::adipsia]]']
      ]
    },
    {
      id: 'semio_toxicos', clase: 'Clase 4', titulo: 'Hábitos tóxicos: alcohol y tabaco', tipo: 'mapa', sl: [[4,17,19]],
      centro: 'Hábitos tóxicos', sub: 'Preguntar sin juzgar',
      fuente: 'Clase 4 · Bebidas alcohólicas, patrones de consumo, tabaquismo e índice tabáquico',
      ramas: [
        { t: 'Bebidas', hojas: [
          ['Cerveza y vino', 'Fermentadas', 'ferment'],
          ['Coñac, whisky, vodka', 'Destiladas', 'destil'],
          ['Licores con aceites aromatizantes', 'Absínticas', 'absint']
        ] },
        { t: 'Patrones de consumo', hojas: [
          ['No ingiere bebidas alcohólicas', 'Abstemio', 'abstemio'],
          ['Necesidad imperiosa y periódica de beber (fines de semana)', 'Dipsomanía', 'dipsoman'],
          ['No puede detenerse hasta intoxicarse', 'Alcoholismo compulsivo', 'compulsiv']
        ] },
        { t: 'Índice tabáquico', hojas: [
          ['Fórmula (paquetes/año)', 'Cigarrillos por día × años fumando / 20 || Cigarrillos por día x años / 20', 'cigarr;anos|años;20'],
          ['Riesgo de EPOC con menos de 10', 'Nulo', 'nulo'],
          ['Riesgo con 10 a 20', 'Moderado', 'moderad'],
          ['Riesgo con 21 a 40', 'Intenso', 'intenso'],
          ['Riesgo con más de 41', 'Alto', 'alto']
        ] }
      ]
    },
    {
      id: 'semio_examen_fisico', clase: 'Clase 4', titulo: 'Examen físico y razonamiento clínico', tipo: 'mapa', sl: [[4,20,24]],
      centro: 'Examen físico', sub: 'De lo general a lo particular',
      fuente: 'Clase 4 · Ectoscopia y antropometría, las 4 técnicas, consideraciones diagnósticas, epicrisis y evolución',
      ramas: [
        { t: 'Las 4 técnicas', hojas: [
          ['General y segmentaria', 'Inspección', 'inspecc'],
          ['Monomanual o bimanual', 'Palpación', 'palpac'],
          ['Dígito-digital', 'Percusión', 'percus'],
          ['Inmediata o mediata', 'Auscultación', 'auscult']
        ] },
        { t: 'Detalles', hojas: [
          ['Percusión: el dedo de la mano izquierda que recibe el golpe', 'Plexímetro || Dedo plexímetro', 'plexim|pleximetr'],
          ['Auscultación con el oído directo y una pañoleta', 'Inmediata', 'inmediat'],
          ['Auscultación con estetoscopio biauricular', 'Mediata', 'mediata'],
          ['IMC', 'Peso (kg) / estatura (m)² || Peso / talla²', 'peso;estatura|talla']
        ] },
        { t: 'Razonamiento', hojas: [
          ['Agrupación de signos y síntomas con sentido fisiopatológico', 'Síndromes clínicos || Síndrome', 'sindrom'],
          ['Disquisiciones sobre las posibles causas', 'Diagnósticos diferenciales', 'diferencial'],
          ['El de mayor probabilidad, a confirmar', 'Diagnóstico presuntivo', 'presunt']
        ] },
        { t: 'Cierre de la HC', hojas: [
          ['Se confecciona al alta o al fallecimiento', 'Epicrisis', 'epicrisis'],
          ['Se registra todos los días con datos mensurables', 'Evolución diaria', 'evoluc']
        ] }
      ]
    },

    /* ───────────── CLASE 5 · Ectoscopia ───────────── */
    {
      id: 'semio_ecto_pasos', clase: 'Clase 5', titulo: 'Los 10 pasos de la ectoscopia', tipo: 'fluxo', sl: [[5,4,4]],
      resumen: 'La primera impresión, antes de tocar al paciente, en el orden en que se escribe.',
      fuente: 'Clase 5 · Ectoscopia: los 10 pasos',
      pasos: [
        '1. [[Sexo::sexo]]',
        '2. [[Edad::edad]]',
        '3. [[Biotipo::biotipo]]',
        '4. [[Hábito::habito]]',
        '5. [[Facies::facies]]',
        '6. [[Estado de conciencia::concienc]]',
        '7. [[Actitud::actitud]]',
        '8. [[Ingreso y posición en el lecho::ingreso|posic]]',
        '9. [[Qué llama la atención::llama la atenc]]',
        '10. [[Impresión general::impresi]]'
      ]
    },
    {
      id: 'semio_biotipo', clase: 'Clase 5', titulo: 'Edad, biotipo y hábito corporal', tipo: 'mapa', sl: [[5,5,12]],
      centro: 'Biotipo y hábito', sub: 'Pasos 2, 3 y 4 de la ectoscopia',
      fuente: 'Clase 5 · Sexo y edad, biotipo y estado nutricional, hábito corporal',
      ramas: [
        { t: 'Edad', hojas: [
          ['Años desde el nacimiento', 'Edad cronológica', 'cronolog'],
          ['Nivel de envejecimiento real de tejidos y órganos', 'Edad biológica', 'biologic'],
          ['Categoría de 18 a 35 años', 'Adultos jóvenes || Adulto joven', 'joven'],
          ['65 años o más', 'Tercera edad', 'tercera edad']
        ] },
        { t: 'Estado nutricional', hojas: [
          ['Contextura física "normal"', 'Normosómico', 'normosom'],
          ['Peso adecuado (bien nutrido)', 'Eutrófico', 'eutrof'],
          ['Peso alto para su contextura', 'Hipertrófico', 'hipertrof'],
          ['Peso inferior a lo normal', 'Hipotrófico', 'hipotrof']
        ] },
        { t: 'Brevilíneo', hojas: [
          ['Personaje con que se lo compara', 'Sancho Panza', 'sancho'],
          ['Ángulo epigástrico', 'Obtuso', 'obtuso'],
          ['Posición del corazón', 'Horizontal', 'horizontal']
        ] },
        { t: 'Longilíneo', hojas: [
          ['Personaje con que se lo compara', 'Don Quijote', 'quijote'],
          ['Talla comparada con la brazada', 'Mayor que la brazada || Mayor', 'mayor'],
          ['Ángulo epigástrico', 'Agudo', 'agudo'],
          ['Forma del corazón', 'En gota || Alargado', 'gota|alarg']
        ] },
        { t: 'Normolíneo', hojas: [
          ['Talla comparada con la brazada', 'Similar || Igual a la brazada', 'similar|igual'],
          ['Altura de las cúpulas diafragmáticas', '8.ª costilla || Octava costilla', '8|octava']
        ] }
      ]
    },
    {
      id: 'semio_facies', clase: 'Clase 5', titulo: 'Facies', tipo: 'tabla', sl: [[5,14,17]],
      resumen: 'Las 14 facies de la clase. No se memorizan aisladas: se asocia el color o la forma con el sistema u órgano comprometido.',
      fuente: 'Clase 5 · Facies I (coloración), II (estructurales), III (endocrinas) y IV (otras)',
      columnas: ['Facies', 'Cómo se ve', 'Dato de la clase'],
      filas: [
        ['[[Compuesta::compuesta]]', 'Sin alteraciones de forma, color ni expresión', 'Es la facies [[normal::normal]]'],
        ['[[Anémica::anemic]]', 'Pérdida del color sonrosado; palidez que puede llegar hasta los labios', 'Facies I: coloración'],
        ['[[Cianótica::cianotic]]', 'Azulada, más notable en mejillas, nariz, lóbulos y labios', 'Facies I: coloración'],
        ['[[Ictérica::icteric]]', 'Amarilla en cara y conjuntiva bulbar', 'Por aumento de la [[bilirrubina::bilirrub]]'],
        ['[[Urémica::uremic]]', 'Pálida amarillenta, con agotamiento y edema palpebral', 'Insuficiencia [[renal::renal]]'],
        ['[[Edematosa::edematos]]', 'Edema de la cara, muy prominente en los [[párpados::parpad]]', 'Por la laxitud del tejido palpebral'],
        ['[[Mongólica::mongol]]', 'Redondeada, epicanto, orejas pequeñas, nariz en "silla de montar"', 'Síndrome de [[Down::down]]: se describe, no se diagnostica solo por la ectoscopia'],
        ['[[Hipotiroidea::hipotiroid]]', 'Redondeada, opaca, con edema palpebral; piel fría y seca', 'Facies II: estructural'],
        ['[[Hipertiroidea::hipertiroid]]', 'Adelgazada, con [[exoftalmia::exoftalm]] bilateral y expresión de susto o sorpresa', 'Facies III: endocrina'],
        ['[[Cushingoidea::cushing]]', 'Cara redonda en [[luna llena::luna]], con hirsutismo', 'Facies III: endocrina'],
        ['[[Acromegálica::acromegal]]', 'Rasgos agrandados: frente, nariz, orejas, labios y mandíbula', 'Ej.: tumor de [[hipófisis::hipofis]]'],
        ['[[Lúpica::lupic]]', 'Erupción eritemato-papulo-escamosa en mejillas y nariz', 'En forma de "alas de [[mariposa::mariposa]]"'],
        ['[[Caquéxica::caquex]]', 'Panículo adiposo disminuido y relieve óseo notable', '[[Desnutrición grave::desnutric]]'],
        ['[[Mitral::mitral]]', 'Cianosis en las mejillas ("[[chapetas::chapeta]]")', 'Típica de una estenosis valvular']
      ]
    },
    {
      id: 'semio_conciencia_actitud', clase: 'Clase 5', titulo: 'Conciencia y actitud', tipo: 'mapa', sl: [[5,18,29]],
      centro: 'Conciencia y actitud', sub: 'Pasos 6, 7 y 8 de la ectoscopia',
      fuente: 'Clase 5 · Estado de conciencia, actitud o postura, decúbitos y actitudes neurológicas',
      ramas: [
        { t: 'Conciencia', hojas: [
          ['Somnoliento; despierta con estímulos menores', 'Obnubilación', 'obnubil'],
          ['Solo despierta con estímulos dolorosos', 'Estupor', 'estupor'],
          ['No responde a ningún estímulo', 'Coma', 'coma'],
          ['Sobrevive al coma: abre los ojos pero la conciencia sigue ausente', 'Estado vegetativo', 'vegetativ']
        ] },
        { t: 'Orientación', hojas: [
          ['"¿Qué día es hoy?" evalúa la orientación en el…', 'Tiempo', 'tiempo'],
          ['"¿Dónde se encuentra?"', 'Espacio', 'espacio'],
          ['"¿Cuál es su nombre?"', 'Persona', 'persona']
        ] },
        { t: 'Actitud', hojas: [
          ['Actitud normal', 'Compuesta || Actitud compuesta', 'compuesta'],
          ['De rodillas sobre los brazos en grandes derrames pericárdicos', 'Genupectoral || Plegaria mahometana', 'genupect|mahomet'],
          ['Sentado para poder respirar', 'Ortopnea', 'ortopnea'],
          ['La posición más fisiológica en el lecho', 'Dorsolateral derecha || Dorsolateral derecho || Decúbito dorsolateral derecho', 'dorsolateral;derech'],
          ['Inmóvil, siguiendo la gravedad (coma)', 'Decúbito pasivo || Pasivo', 'pasivo']
        ] },
        { t: 'Actitudes neurológicas', hojas: [
          ['Postura de los síndromes meníngeos', 'Gatillo de fusil || En gatillo de fusil', 'gatillo'],
          ['Flexión de la cadera con la rodilla extendida provoca dolor', 'Signo de Kernig || Kernig', 'kernig'],
          ['Flexión del cuello provoca flexión de rodillas y caderas', 'Signo de Brudzinski || Brudzinski', 'brudzinsk'],
          ['Arco con concavidad posterior (tétanos)', 'Opistótonos', 'opistot'],
          ['Flexión intensa de la cabeza sobre el pecho', 'Emprostótonos', 'emprostot']
        ] }
      ]
    },
    {
      id: 'semio_marchas', clase: 'Clase 5', titulo: 'Tipos de marcha', tipo: 'tabla', sl: [[5,31,37]],
      resumen: 'Cada marcha orienta al sistema comprometido.',
      fuente: 'Clase 5 · Marcha: forma de ingreso y tipos de marcha',
      columnas: ['Marcha', 'Causa', 'Cómo es'],
      filas: [
        ['[[Coja::coja]]', 'Dolor, acortamiento o inutilización de un miembro inferior', 'Pasos asimétricos, más cortos del lado enfermo'],
        ['[[Pesada::pesada]]', 'Obesidad y [[anasarca::anasarca|edema]]', 'Lenta, a pequeños pasos, pies separados y rotados hacia afuera'],
        ['De [[palo::palo]]', '[[Anquilosis::anquilos]] de tobillo, rodilla o cadera', 'Flexión incompleta del miembro ("pierna de palo")'],
        ['De [[pato::pato]]', 'Luxación congénita bilateral de [[cadera::cadera]]', 'Balanceo exagerado del tronco a cada lado, con lordosis'],
        ['[[Espástica::espastic|helicopod]] (helicópoda)', 'Lesión de neurona motriz [[central::central]] (hemiplejía)', 'Traza un semicírculo con el miembro afectado'],
        ['[[Cerebelosa::cerebel]]', 'Lesión del cerebelo o sus vías', 'Como un [[ebrio::ebrio|borracho]], en zigzag'],
        ['[[Vestibular::vestibul]]', 'Alteración del sistema vestibular', 'Se desvía y tiende a caer hacia el lado [[lesionado::lesion]]'],
        ['[[Bradicinética::bradicin]]', '[[Parkinson::parkinson]]', 'Pasos muy cortos, cuerpo inclinado hacia adelante'],
        ['En [[steppage::steppage|stepage|equina]] (equina)', 'Parálisis de los flexores del pie (polineuritis)', 'Eleva mucho las rodillas y pisa primero con la punta']
      ]
    },
    {
      id: 'semio_ecto_cierre', clase: 'Clase 5', titulo: 'Qué llama la atención y qué impresiona', tipo: 'mapa', sl: [[5,38,39]],
      centro: 'Cierre de la ectoscopia', sub: 'Pasos 9 y 10',
      fuente: 'Clase 5 · Qué llama la atención; qué impresiona (agudo o crónico)',
      ramas: [
        { t: 'Llama la atención', hojas: [
          ['Hallazgos producidos por la enfermedad (hematomas, cicatrices)', 'Orgánicas', 'organic!no organic'],
          ['Elementos del manejo clínico (vía venosa, sonda, mascarilla de O₂)', 'No orgánicas', 'no organic']
        ] },
        { t: 'Impresiona', hojas: [
          ['Comienzo súbito y evolución rápida', 'Aguda || Patología aguda', 'agud'],
          ['Comienzo insidioso, varios sistemas, tratamiento sintomático', 'Crónica || Patología crónica', 'cronic'],
          ['Lo que define agudo o crónico (no la gravedad)', 'El tiempo de evolución || Tiempo de evolución', 'tiempo']
        ] }
      ]
    },

    /* ───────────── CLASE 7 · Examen físico del tórax ───────────── */
    {
      id: 'semio_torax_inspeccion', clase: 'Clase 7', titulo: 'Tórax: inspección estática y dinámica', tipo: 'mapa', sl: [[7,5,13]],
      centro: 'Inspección del tórax', sub: 'Estática (forma) y dinámica (movimientos)',
      fuente: 'Clase 7 · Ángulo de Louis, tórax estático, abovedamientos y retracciones, tipo y frecuencia respiratoria, patrones anormales',
      ramas: [
        { t: 'Referencia', hojas: [
          ['Arista que marca la inserción del 2.º cartílago costal', 'Ángulo de Louis', 'louis'],
          ['Músculos accesorios que se observan', 'Intercostales, ECM y trapecio', 'intercostal|ecm|trapecio']
        ] },
        { t: 'Tórax estático', hojas: [
          ['Aumento de todos los diámetros, sobre todo el anteroposterior', 'En tonel || Tórax en tonel', 'tonel|enfisemat'],
          ['Diámetro vertical largo y anteroposterior reducido (TBC)', 'Paralítico || Tórax paralítico', 'paralitic'],
          ['Esternón hundido "en embudo"', 'Pectus excavatum', 'excavatum'],
          ['Esternón hacia adelante "en quilla" (raquitismo)', 'Pectus carinatum', 'carinatum']
        ] },
        { t: 'Hemitórax', hojas: [
          ['Protrusión asimétrica (neumotórax, hemotórax)', 'Abovedamiento', 'abovedam'],
          ['Hundimiento asimétrico (TB crónica, atelectasia, cáncer)', 'Retracción', 'retracc']
        ] },
        { t: 'Tipo respiratorio', hojas: [
          ['En la mujer', 'Costal superior', 'costal superior'],
          ['En el hombre', 'Costoabdominal', 'costoabdom'],
          ['En el niño', 'Abdominal', 'abdominal']
        ] },
        { t: 'Patrones anormales', hojas: [
          ['Profundidad creciente y decreciente seguida de apnea (insuficiencia cardíaca)', 'Cheyne-Stokes', 'cheyne'],
          ['Apneas impredecibles y ritmo desorganizado (meningitis)', 'Biot', 'biot'],
          ['Profunda, amplia y regular (acidosis metabólica)', 'Kussmaul', 'kussmaul']
        ] }
      ]
    },
    {
      id: 'semio_torax_palpacion', clase: 'Clase 7', titulo: 'Tórax: palpación', tipo: 'tabla', sl: [[7,14,18]],
      resumen: 'Qué se busca con cada maniobra y qué significa encontrarlo alterado.',
      fuente: 'Clase 7 · Palpación: mano de escultor, frémitos, elasticidad, expansión y vibraciones vocales',
      columnas: ['Maniobra', 'Cómo se hace', 'Hallazgo y significado'],
      filas: [
        ['Mano de [[escultor::escultor]]', 'Deslizar las manos por todo el tórax, comparando ambos lados', 'Depresiones, tumefacciones, deformaciones'],
        ['Frémito [[pleural::pleural]]', 'Palpar en inspiración profunda', 'Vibración tipo [[roce::roce]] de las hojas pleurales'],
        ['Frémito [[bronquial::bronquial]]', 'Palpar sobre zonas con secreciones', 'Vibración gruesa que cambia con la [[tos::tos]]'],
        ['[[Elasticidad::elastic]]', 'Compresión suave y firme de ambos hemitórax', 'Disminuida en [[enfisema::enfisem]] y derrame organizado'],
        ['[[Expansión::expansi]] (vértices)', 'Bordes cubitales paralelos a la clavícula; desde atrás, maniobra de [[Ruault::ruault]]', 'Asimetría: derrame, neumotórax, atelectasia o consolidación'],
        ['[[Expansión::expansi]] (bases)', 'Pulgares cerca de la línea media, en "V"', 'Los pulgares deben separarse en forma [[simétrica::simetric]]'],
        ['[[Vibraciones vocales::vibracion|vocal]]', 'Pedir que diga "[[33::33|treinta y tres]]"', 'Aumentadas en [[neumonía::neumon|consolid]]; abolidas en derrame y neumotórax']
      ]
    },
    {
      id: 'semio_torax_percusion', clase: 'Clase 7', titulo: 'Tórax: percusión', tipo: 'mapa', sl: [[7,19,21]],
      centro: 'Percusión del tórax', sub: 'Técnica dígito-digital de Gerhardt',
      fuente: 'Clase 7 · Técnica de percusión, secuencia por regiones y los 5 sonidos',
      ramas: [
        { t: 'Técnica', hojas: [
          ['Dedo medio de la mano izquierda, apoyado firme', 'Plexímetro || Dedo plexímetro', 'plexim|pleximetr'],
          ['Dedo medio de la mano derecha, que golpea', 'Percutor || Dedo percutor', 'percutor'],
          ['El golpe sale del movimiento de la…', 'Muñeca', 'muñeca|muneca'],
          ['Siempre se comparan puntos…', 'Simétricos', 'simetric']
        ] },
        { t: 'De más aire a menos aire', hojas: [
          ['Sonido de tambor (neumotórax a tensión)', 'Timpanismo', 'timpan'],
          ['Más aire que lo normal (enfisema)', 'Hipersonoridad', 'hipersonor'],
          ['Parénquima pulmonar normal', 'Sonoridad', 'sonoridad!hiper'],
          ['Disminución parcial del aire', 'Submatidez', 'submatid'],
          ['Sin aire (derrame, consolidación)', 'Matidez', 'matidez!sub']
        ] },
        { t: 'Secuencia de percusión', hojas: [
          ['Zona de timpanismo en la secuencia', 'Espacio de Traube || Traube', 'traube'],
          ['Los vértices', 'Campos de Krönig || Krönig || Campos de Kronig', 'kronig'],
          ['Anterior: matidez hepática a partir de la…', '6.ª costilla || Sexta costilla || 6.a costilla || 6ª costilla', '6|sexta'],
          ['Posterior: matidez de las bases pulmonares a la altura de la…', '10.ª costilla || Décima costilla || 10.a costilla || 10ª costilla', '10|decima'],
          ['Región lateral (brazo sobre la cabeza): se percute siguiendo la línea…', 'Axilar media || Línea axilar media', 'axilar media']
        ] }
      ]
    },
    {
      id: 'semio_torax_auscultacion', clase: 'Clase 7', titulo: 'Tórax: auscultación pulmonar', tipo: 'tabla', sl: [[7,22,27]],
      resumen: 'La tabla de la profesora para diferenciar los ruidos anormales.',
      fuente: 'Clase 7 · Ruidos normales, ruidos agregados, voz y tabla de diferenciación',
      columnas: ['Ruido', 'Cualidad', 'Momento del ciclo', 'Con la tos', 'Causas'],
      filas: [
        ['[[Sibilancias::sibilanc]]', 'Agudo, musical, continuo', '[[Espiración::espirac]]', 'No cambia', 'Asma, EPOC, cuerpo extraño'],
        ['[[Roncus::roncus]]', 'Grave, ronco, continuo', 'Ambas fases', '[[Cambia::cambia]] o desaparece', 'Bronquitis, secreciones'],
        ['[[Crepitantes::crepit]]', 'Fino, discontinuo', 'Fin de la [[inspiración::inspirac]]', 'No cambia', 'Neumonía, fibrosis, edema inicial'],
        ['[[Subcrepitantes::subcrepit]]', 'Grueso, como burbujas', 'Ambas fases', 'Suele cambiar', 'Edema avanzado, bronquiectasias'],
        ['Frote [[pleural::pleural]]', 'Áspero, de "cuero nuevo"', 'Ambas fases', 'No cambia', '[[Pleuritis::pleurit]]'],
        ['[[Estridor::estridor|cornaje]]', 'Agudo, intenso, sin estetoscopio', '[[Inspiración::inspirac]]', 'No cambia', 'Obstrucción de la vía aérea superior']
      ]
    },
    {
      id: 'semio_torax_voz', clase: 'Clase 7', titulo: 'Ruidos normales y auscultación de la voz', tipo: 'mapa', sl: [[7,22,26]],
      centro: 'Auscultación', sub: 'Lo normal antes de lo patológico',
      fuente: 'Clase 7 · Ruidos respiratorios normales y auscultación de la voz',
      ramas: [
        { t: 'Ruidos normales', hojas: [
          ['Suave; en todo el tórax; inspiración más larga que la espiración', 'Murmullo vesicular', 'murmullo|vesicul'],
          ['Intermedio; sobre el manubrio y entre las escápulas', 'Respiración broncovesicular || Broncovesicular', 'broncovesic'],
          ['Hueco y fuerte; normal solo sobre la tráquea', 'Respiración laringotraqueal || Laringotraqueal', 'laringotraq|bronquial']
        ] },
        { t: 'La voz', hojas: [
          ['Aumento de la transmisión de la voz, sin entender las palabras', 'Broncofonía', 'broncofon'],
          ['Las palabras se entienden con nitidez', 'Pectoriloquia', 'pectoriloq!afona'],
          ['Se entienden las palabras cuchicheadas', 'Pectoriloquia áfona', 'afona'],
          ['"Voz de cabra" en el límite superior de un derrame', 'Egofonía', 'egofon']
        ] },
        { t: 'Regla de la tos', hojas: [
          ['Si el ruido cambia con la tos, viene de…', 'Secreciones || Secreciones movibles', 'secrec'],
          ['Ruidos que suelen cambiar con la tos', 'Roncus y subcrepitantes', 'roncus;subcrepit']
        ] }
      ]
    },
    {
      id: 'semio_precordio', clase: 'Clase 7', titulo: 'Precordio: choque de punta, focos y ruidos', tipo: 'mapa', sl: [[7,28,34]],
      centro: 'Aparato cardiovascular', sub: 'Inspección, palpación y auscultación del precordio',
      fuente: 'Clase 7 · Choque de punta, LERIMPF, posiciones, focos de auscultación y ruidos R1 a R4',
      ramas: [
        { t: 'Choque de punta', hojas: [
          ['Espacio intercostal donde se palpa', '4.º o 5.º espacio intercostal izquierdo || 5.º espacio intercostal izquierdo', '5|4'],
          ['Línea vertical donde se palpa', 'Línea medioclavicular', 'medioclavic'],
          ['Si se desplaza hacia afuera y abajo, sugiere…', 'Cardiomegalia', 'cardiomegal|hipertrof|dilatac'],
          ['Decúbito que lo acentúa', 'Lateral izquierdo de Pachón || Decúbito lateral izquierdo', 'lateral izquierd|pachon']
        ] },
        { t: 'Focos', hojas: [
          ['2.º espacio intercostal derecho', 'Aórtico || Foco aórtico', 'aortic!accesor'],
          ['2.º espacio intercostal izquierdo', 'Pulmonar || Foco pulmonar', 'pulmonar'],
          ['3.er espacio intercostal izquierdo', 'Erb || Aórtico accesorio', 'erb|accesor'],
          ['4.º-5.º espacio, borde esternal izquierdo', 'Tricuspídeo || Foco tricuspídeo', 'tricusp'],
          ['5.º espacio, línea medioclavicular', 'Mitral || Foco mitral', 'mitral']
        ] },
        { t: 'Ruidos', hojas: [
          ['Cierre de mitral y tricúspide (inicio de la sístole)', 'R1 || Primer ruido', 'r1|primer'],
          ['Cierre de aórtica y pulmonar (fin de la sístole)', 'R2 || Segundo ruido', 'r2|segundo'],
          ['Galope "Ken-tuc-ky" (insuficiencia cardíaca en adultos)', 'R3 || Tercer ruido', 'r3|tercer'],
          ['Galope "Te-nnes-see", siempre patológico', 'R4 || Cuarto ruido', 'r4|cuarto'],
          ['R2 en dos componentes durante la inspiración', 'Desdoblamiento fisiológico || Desdoblamiento fisiológico de R2', 'desdobl']
        ] },
        { t: 'LERIMPF', hojas: [
          ['L', 'Localización', 'localiz'],
          ['E', 'Extensión', 'extensi'],
          ['M', 'Movilidad', 'movilid'],
          ['F (al final)', 'Frecuencia', 'frecuenc']
        ] }
      ]
    },

    /* ───────────── Casos y simulado ───────────── */
    {
      id: 'semio_casos', clase: 'Clases 1 a 7', titulo: 'Casos clínicos de la clase', tipo: 'casos',
      resumen: 'Los casos y actividades que la profesora usó en las clases, para razonar paso a paso.',
      fuente: 'Actividades de las clases 1 a 7 (Dra. Brizueña): clasificación de hallazgos, tipos de dolor, disnea, fiebre, signos vitales, tabaquismo, ectoscopia y tórax',
      casos: [
        ['En la consulta, el paciente refiere "palpitaciones".', '¿Es signo, síntoma o síndrome?', 'b) Síntoma', 'b',
         'Solo el paciente lo percibe; el médico lo conoce por el interrogatorio (Clase 1).',
         ['a) Signo', 'b) Síntoma', 'c) Síndrome']],
        ['Al auscultar al paciente se escuchan sibilancias.', '¿Es signo, síntoma o síndrome?', 'a) Signo', 'a',
         'Es una manifestación objetiva que descubre el médico al examinar (Clase 1).',
         ['a) Signo', 'b) Síntoma', 'c) Síndrome']],
        ['El médico pregunta rápido "¿Qué le pasa?", interrumpe a la paciente ("Sea breve que tengo otros pacientes"), dice "Eso es gastritis, seguro" y receta sin explorar más.', '¿Qué principio de la comunicación médica no se cumple?', 'a) Escuchar y preguntar', 'a',
         'El primer principio es incentivar el diálogo activo, con preguntas orientadas al padecimiento y al sentir del paciente; en la HC: dejar que relate libremente, sin interrumpir (Clases 1 y 4).',
         ['a) Escuchar y preguntar', 'b) Pedir consentimiento informado', 'c) Indagación indirecta', 'd) Operaciones objetivantes']],
        ['Médico: "Su electrocardiograma muestra alteraciones compatibles con una posible isquemia miocárdica y riesgo de eventos cardiovasculares mayores". Paciente: "Doctor, no entiendo… ¿qué significa eso?"', '¿Qué tipo de iatrogenia se identifica?', 'b) En la comunicación: lenguaje técnico que el paciente no entiende', 'b',
         'Iatrogenia en la comunicación: lenguaje técnico y comentarios que generan angustia innecesaria. Para evitarla: explicar en lenguaje sencillo cada paso (Clase 1).',
         ['a) En el examen físico: maniobras bruscas', 'b) En la comunicación: lenguaje técnico que el paciente no entiende', 'c) En el examen físico: no respetar el pudor', 'd) No hay iatrogenia']],
        ['Mujer de 58 años, diabética desde hace 15 años, con ardor, adormecimiento y pinchazos "en calcetín" en ambos pies; el roce de las sábanas le duele (alodinia).', '¿Qué tipo de dolor es?', 'c) Neuropático', 'c',
         'Lesión de fibras nerviosas: urente, punzante, en descarga eléctrica, con alteraciones sensitivas (Clase 2).',
         ['a) Somático', 'b) Visceral', 'c) Neuropático', 'd) Psicogénico']],
        ['Mujer de 42 años con dolor opresivo, tipo cólico, mal delimitado en epigastrio e hipocondrio derecho, irradiado a la región subescapular, con náuseas y sudoración; Murphy positivo.', '¿Qué tipo de dolor es?', 'b) Visceral', 'b',
         'Difuso, mal localizado y con cortejo vegetativo (Clase 2).',
         ['a) Somático', 'b) Visceral', 'c) Neuropático', 'd) Psicogénico']],
        ['Hombre de 62 años con disnea que empezó con esfuerzos moderados y llegó al reposo; aparece al acostarse y mejora al sentarse; despierta de noche.', '¿Cómo se llama la disnea que aparece en decúbito y mejora al sentarse?', 'Ortopnea', 'ortopnea',
         'Disnea mixta: de esfuerzo y posicional tipo ortopnea (Clase 2).'],
        ['Varón de 45 años internado por neumonía. Día 3: fiebre que oscila entre 38,8 °C y 39,2 °C, sin bajar a valores normales.', '¿Qué patrón febril tiene ese día?', 'a) Continua', 'a',
         'Oscila 0,4 °C, menos de 0,6 °C: fiebre continua. En la clase, el patrón de este caso fue "fiebre continua con tendencia a remitir tras el tratamiento" (Clase 2).',
         ['a) Continua', 'b) Remitente', 'c) Intermitente', 'd) Recurrente']],
        ['En la guardia: PA 148/94 mmHg, FC 104 lpm, FR 26 rpm, temperatura 38,6 °C y SpO₂ 91%.', '¿Cómo se clasifica la presión arterial?', 'c) Hipertensión estadio 2', 'c',
         'PAS ≥ 140 o PAD ≥ 90 = estadio 2. Además: FC por encima de 60–100 lpm, taquipnea (FR mayor a 25), fiebre (más de 38 °C) e hipoxemia leve (Clase 3).',
         ['a) Elevada', 'b) Hipertensión estadio 1', 'c) Hipertensión estadio 2', 'd) Crisis hipertensiva']],
        ['El mismo paciente tiene FR de 26 rpm.', '¿Cómo se llama esa alteración?', 'Taquipnea', 'taquipnea',
         'FR normal del adulto: 16–25 rpm (promedio 20). Aumentada = taquipnea; disminuida = bradipnea (Clase 3).'],
        ['El mismo paciente tiene SpO₂ de 91%.', '¿Cómo se clasifica?', 'a) Hipoxemia leve', 'a',
         'Leve 90–94%, moderada 85–89%, grave menos de 85% (Clase 3).',
         ['a) Hipoxemia leve', 'b) Hipoxemia moderada', 'c) Hipoxemia grave', 'd) Normal']],
        ['Hombre de 55 años que fuma 1 paquete por día desde los 15 años.', '¿Cuál es su índice tabáquico y qué riesgo de EPOC tiene?', 'd) 40 paquetes/año, riesgo intenso', 'd',
         '(20 cigarrillos × 40 años) / 20 = 40 paquetes/año → riesgo intenso (21–40) (Clase 4).',
         ['a) 20 paquetes/año, riesgo moderado', 'b) 55 paquetes/año, riesgo alto', 'c) 40 paquetes/año, riesgo alto', 'd) 40 paquetes/año, riesgo intenso']],
        ['Varón de 68 años que ingresa con ayuda, marcha lenta a pequeños pasos, cuerpo inclinado hacia adelante, rígido, con poca expresión facial.', '¿Qué marcha presenta?', 'Bradicinética', 'bradicin',
         'Marcha bradicinética, por rigidez del cuerpo estriado (Parkinson) (Clase 5).'],
        ['Paciente con traumatismo craneoencefálico. Respiración irregular, con inspiraciones de igual profundidad interrumpidas por pausas impredecibles, sin ningún ritmo claro.', '¿Qué patrón respiratorio es?', 'b) Biot', 'b',
         'Respiración atáxica de Biot: apneas impredecibles y patrón desorganizado (meningitis, lesiones del tronco encefálico, aumento de la presión intracraneal) (Clase 7).',
         ['a) Cheyne-Stokes', 'b) Biot', 'c) Kussmaul', 'd) Bradipnea']],
        ['Joven diabético en mal estado general, con respiración profunda, rápida y constante, sin pausas, y aliento afrutado.', '¿Qué patrón respiratorio es?', 'c) Kussmaul', 'c',
         'Respiración acidótica de Kussmaul: acidosis metabólica (cetoacidosis) (Clase 7).',
         ['a) Cheyne-Stokes', 'b) Biot', 'c) Kussmaul', 'd) Taquipnea simple']],
        ['Adulto mayor: la respiración empieza superficial, aumenta en profundidad, disminuye y termina en apnea; el ciclo se repite.', '¿Qué patrón respiratorio es?', 'a) Cheyne-Stokes', 'a',
         'Ciclopnea de Cheyne-Stokes: insuficiencia cardíaca, daño neurológico y sueño normal del anciano (Clase 7).',
         ['a) Cheyne-Stokes', 'b) Biot', 'c) Kussmaul', 'd) Batipnea']],
        ['Varón de 70 años, fumador: tórax en tonel, vibraciones vocales disminuidas en la base derecha, matidez en esa zona y murmullo vesicular abolido.', '¿Qué explica los hallazgos de la base derecha?', 'b) Derrame pleural', 'b',
         'Líquido entre el pulmón y la pared: VV abolidas, matidez y MV abolido (Clase 7).',
         ['a) Neumonía con bronquio permeable', 'b) Derrame pleural', 'c) Neumotórax', 'd) Enfisema aislado']],
        ['El mismo paciente tiene el choque de punta desplazado hacia afuera y abajo y un tercer ruido en el foco mitral.', '¿Qué sugieren estos hallazgos?', 'Insuficiencia cardíaca', 'insuficiencia cardiac',
         'Cardiomegalia con galope por R3: insuficiencia cardíaca en el adulto (Clase 7).']
      ]
    },
    {
      id: 'simulado_semio', clase: 'Clases 1 a 7', titulo: 'Simulado de prueba: Semiología Médica I', tipo: 'casos', cronometro: true,
      resumen: 'Preguntas de opción múltiple de todas las clases. Use el cronómetro y corrija al final.',
      fuente: 'Contenido de las clases 1 a 7 (Dra. Brizueña)',
      casos: [
        ['', '¿Qué parte de la semiología estudia la técnica de búsqueda del signo?', 'a) Semiotecnia', 'a', 'Semiotecnia = cómo se explora; clínica propedéutica = cómo se interpreta.',
         ['a) Semiotecnia', 'b) Clínica propedéutica', 'c) Fisiopatología', 'd) Anamnesis']],
        ['', 'El daño no intencional ocasionado por el profesional de la salud se llama:', 'c) Iatrogenia', 'c', 'Puede ir desde un malestar emocional hasta la muerte.',
         ['a) Negligencia', 'b) Mala praxis', 'c) Iatrogenia', 'd) Yatrofobia']],
        ['', 'En ALICIA FREDUSA, "SA" significa:', 'b) Síntomas asociados', 'b', 'FRE = frecuencia, DU = duración, SA = síntomas asociados.',
         ['a) Signos agravantes', 'b) Síntomas asociados', 'c) Sensación de alivio', 'd) Sitio afectado']],
        ['', 'Un dolor "como si atravesara de lado a lado" es:', 'd) Transfixiante', 'd', 'Urente quema, opresivo aprieta, terebrante taladra.',
         ['a) Terebrante', 'b) Urente', 'c) Opresivo', 'd) Transfixiante']],
        ['', 'En la escala MRC modificada, el paciente que debe parar al andar junto a alguien de su edad tiene:', 'c) Grado 2', 'c', 'Grado 1: escaleras; grado 3: ~100 m; grado 4: reposo.',
         ['a) Grado 0', 'b) Grado 1', 'c) Grado 2', 'd) Grado 3']],
        ['', 'La fiebre que vuelve a valores normales cada día se llama:', 'a) Intermitente (héctica o séptica)', 'a', 'Se ve en infecciones bacterianas, TBC miliar y linfomas.',
         ['a) Intermitente (héctica o séptica)', 'b) Continua', 'c) Remitente', 'd) Recurrente']],
        ['', 'La declinación de la fiebre "en lisis" es:', 'b) Lenta, cerca de medio grado por día', 'b', 'En crisis: rápida, en horas, con sudoración y poliuria.',
         ['a) Rápida, en horas, con sudoración', 'b) Lenta, cerca de medio grado por día', 'c) Con escalofríos', 'd) Solo con antitérmicos']],
        ['', 'En la escala de Korotkoff, la presión sistólica corresponde a:', 'a) La 1.ª fase', 'a', 'La diastólica: límite entre la 3.ª y la 4.ª fase o la desaparición total.',
         ['a) La 1.ª fase', 'b) La 2.ª fase', 'c) La 3.ª fase', 'd) La 5.ª fase']],
        ['', 'Una PA de 132/84 mmHg corresponde a:', 'b) Hipertensión estadio 1', 'b', 'Estadio 1: 130–139 / 80–89 mmHg.',
         ['a) Elevada', 'b) Hipertensión estadio 1', 'c) Hipertensión estadio 2', 'd) Normal']],
        ['', 'La presión de pulso normal es:', 'c) 25–30 a 50 mmHg', 'c', 'Mayor de 50: alta; menor de 25: baja.',
         ['a) 10–20 mmHg', 'b) 60–80 mmHg', 'c) 25–30 a 50 mmHg', 'd) Mayor de 50 mmHg']],
        ['', 'Una temperatura de 37,8 °C se llama:', 'd) Febrícula', 'd', 'Febrícula 37,5–38 °C; fiebre más de 38 °C.',
         ['a) Normal', 'b) Fiebre', 'c) Hipertermia', 'd) Febrícula']],
        ['', 'En el motivo de consulta NO se consigna:', 'a) Un diagnóstico', 'a', 'Solo síntomas, signos y su cronología: "dolor torácico y disnea de 3 días".',
         ['a) Un diagnóstico', 'b) La cronología', 'c) Los síntomas', 'd) Los signos']],
        ['', 'La orina color "coca-cola" por presencia de bilis se llama:', 'b) Coluria', 'b', 'Hematuria = sangre; piuria = pus.',
         ['a) Hematuria', 'b) Coluria', 'c) Piuria', 'd) Poliuria']],
        ['', 'Las heces negras y fétidas indican sangrado digestivo:', 'a) Alto', 'a', 'Melena = alto; hematoquecia = sangre roja y fresca.',
         ['a) Alto', 'b) Bajo', 'c) Anal', 'd) Biliar']],
        ['', 'El hábito brevilíneo se caracteriza por:', 'c) Ángulo epigástrico obtuso y corazón horizontal', 'c', 'El longilíneo tiene ángulo agudo y corazón en gota.',
         ['a) Talla mayor que la brazada', 'b) Ángulo epigástrico agudo', 'c) Ángulo epigástrico obtuso y corazón horizontal', 'd) Corazón en gota']],
        ['', 'La facies con eritema "en alas de mariposa" es:', 'd) Lúpica', 'd', 'Mitral: chapetas cianóticas; cushingoidea: luna llena.',
         ['a) Mitral', 'b) Cushingoidea', 'c) Acromegálica', 'd) Lúpica']],
        ['', 'El paciente que solo despierta con estímulos dolorosos está en:', 'b) Estupor', 'b', 'Obnubilación: estímulos menores; coma: ninguna respuesta.',
         ['a) Obnubilación', 'b) Estupor', 'c) Coma', 'd) Estado vegetativo']],
        ['', 'La marcha "de ebrio", en zigzag, corresponde a lesión:', 'a) Cerebelosa', 'a', 'Vestibular: se desvía hacia el lado lesionado.',
         ['a) Cerebelosa', 'b) Vestibular', 'c) Piramidal', 'd) Del cuerpo estriado']],
        ['', 'El tórax con aumento del diámetro anteroposterior es:', 'c) En tonel', 'c', 'Típico del enfisema.',
         ['a) Paralítico', 'b) Pectus excavatum', 'c) En tonel', 'd) Cifoescoliótico']],
        ['', 'Las vibraciones vocales aumentadas indican:', 'b) Condensación con bronquio permeable', 'b', 'Abolidas: derrame, neumotórax, obstrucción bronquial.',
         ['a) Derrame pleural', 'b) Condensación con bronquio permeable', 'c) Neumotórax', 'd) Enfisema']],
        ['', 'De más aire a menos aire, el orden de los sonidos de percusión es:', 'a) Timpanismo, hipersonoridad, sonoridad, submatidez, matidez', 'a', 'Matidez = ausencia de aire.',
         ['a) Timpanismo, hipersonoridad, sonoridad, submatidez, matidez', 'b) Sonoridad, timpanismo, matidez, submatidez, hipersonoridad', 'c) Matidez, submatidez, sonoridad, hipersonoridad, timpanismo', 'd) Hipersonoridad, timpanismo, sonoridad, matidez, submatidez']],
        ['', 'El ruido agregado que cambia o desaparece con la tos es:', 'd) Roncus', 'd', 'Viene de secreciones movibles; sibilancias, crepitantes y frote no cambian.',
         ['a) Sibilancias', 'b) Crepitantes', 'c) Frote pleural', 'd) Roncus']],
        ['', 'La "voz de cabra" en el límite superior de un derrame es:', 'c) Egofonía', 'c', 'Broncofonía y pectoriloquia indican condensación.',
         ['a) Broncofonía', 'b) Pectoriloquia', 'c) Egofonía', 'd) Pectoriloquia áfona']],
        ['', 'El foco pulmonar se ausculta en:', 'b) 2.º espacio intercostal izquierdo, junto al esternón', 'b', 'Aórtico: 2.º derecho; Erb: 3.º izquierdo; mitral: 5.º en la línea medioclavicular.',
         ['a) 2.º espacio intercostal derecho', 'b) 2.º espacio intercostal izquierdo, junto al esternón', 'c) 3.er espacio intercostal izquierdo', 'd) 5.º espacio intercostal izquierdo']],
        ['', 'El cuarto ruido (R4) es:', 'a) Siempre patológico', 'a', 'Contracción auricular contra un ventrículo poco distensible ("Te-nnes-see").',
         ['a) Siempre patológico', 'b) Normal en niños', 'c) El cierre de mitral y tricúspide', 'd) El cierre de aórtica y pulmonar']]
      ]
    },

    /* ───────────── PRÁCTICA ───────────── */
    {
      id: 'semio_p_ectoscopia', area: 'pratica', clase: 'Práctica', titulo: 'Redactar la ectoscopia (modelo de la clase)', tipo: 'fluxo', sl: [[6,44,46]],
      resumen: 'El ejemplo de ectoscopia de la historia clínica, para completar como se escribe en la HC.',
      fuente: 'Clase 6 · Ectoscopia (Unidad IV): ejemplo de ectoscopia de la historia clínica y plantilla para completar',
      pasos: [
        'Paciente [[adulto joven::adulto joven]] de sexo [[femenino::femenin]], de 36 años de edad,',
        'cuya edad cronológica [[coincide::coincid]] con la edad biológica,',
        'de biotipo [[normosómico::normosom]], [[eutrófico::eutrof]], de hábito [[mediolíneo::mediolin|normolin]],',
        'de facies [[dolorosa::doloros]], lúcido, colaborador, orientado en [[tiempo::tiempo]], persona y espacio.',
        'Ingresó al servicio [[caminando con sus propios medios::propios medios|caminando]] con marcha lenta',
        'y adopta en el lecho la posición [[decúbito dorsal::decubito dorsal|dorsal]] activo preferencial.',
        'Llama la atención la facies dolorosa e impresiona ser portador de patología [[aguda::agud]].'
      ]
    },
    {
      id: 'semio_p_ecto_caso', area: 'pratica', clase: 'Práctica', titulo: 'Ectoscopia del paciente de la actividad', tipo: 'fluxo', sl: [[5,40,40]],
      resumen: 'Actividad integradora de la clase: con los datos del caso, completá los pasos de la ectoscopia que se pueden deducir.',
      fuente: 'Clase 5 · Pausa activa: "redactá la ectoscopia" (varón de 68 años), con los criterios de los pasos 2, 8, 9 y 10',
      pasos: [
        { f: 'Varón de 68 años; ingresa caminando con ayuda de un familiar, marcha lenta a pequeños pasos, cuerpo inclinado hacia adelante, rígido, expresión facial poco variable; decúbito dorsal activo indiferente; hematoma en el antebrazo izquierdo.' },
        'Paciente de sexo [[masculino::masculin]], de 68 años, de la [[tercera edad::tercera edad]] (65 años o más).',
        'Forma de ingreso: caminando [[con ayuda de otra persona || con ayuda de un familiar || con ayuda::ayuda]].',
        'Marcha [[bradicinética::bradicin]], por rigidez muscular del cuerpo estriado.',
        'En el lecho, decúbito [[activo::activo]]: modifica su posición voluntariamente.',
        'Llama la atención el hematoma del antebrazo izquierdo: hallazgo [[orgánico::organic!no organic]].',
        { end: 'Impresiona ser portador de patología [[crónica::cronic]] (la clase cita el Parkinson como ejemplo de enfermedad crónica).' }
      ]
    },
    {
      id: 'semio_p_hc', area: 'pratica', clase: 'Práctica', titulo: 'La HC práctica: qué preguntar y cómo registrar', tipo: 'mapa',
      centro: 'Historia clínica práctica', sub: 'Interrogatorio → examen físico → síntesis semiológica',
      fuente: 'Historia Clínica Práctica — Semiología Médica (pasta PRÁTICA del Drive de la turma)',
      ramas: [
        { t: 'Antes de empezar', hojas: [
          ['Confiabilidad de la fuente: merecen fe, relativa fe o…', 'No merecen fe', 'no merecen'],
          ['Cómo se escribe el motivo de consulta', 'Con las palabras del paciente, entre comillas || Entre comillas', 'comillas|palabras del paciente'],
          ['Cómo se construye la enfermedad actual', 'En orden cronológico || Cronológica', 'cronolog']
        ] },
        { t: 'Nemotecnias de bolsillo', hojas: [
          ['Dolor: L-I-I-I-D-E-F-A-M (la M final)', 'Medicación', 'medicac'],
          ['Tos: I-T-I-E-H-D-F-A (la H)', 'Horario', 'horario'],
          ['Expectoración: T-C-C-O-C-A (la O)', 'Olor', 'olor'],
          ['Síntoma en general: ¿qué?, ¿cuándo?, ¿dónde?, ¿cuánto?, ¿cómo?, ¿qué lo modifica? y…', '¿Qué lo acompaña?', 'acompan']
        ] },
        { t: 'Orden del examen', hojas: [
          ['Tórax respiratorio', 'I-P-P-A || Inspección, palpación, percusión y auscultación', 'i-p-p-a|ippa|inspecc;palpac;percus;auscult'],
          ['Abdomen', 'I-A-P-P || Inspección, auscultación, percusión y palpación', 'i-a-p-p|iapp'],
          ['"Mirar antes de tocar": estado general, conciencia, orientación, facies', 'Ectoscopia || Ectoscopía || La ectoscopia', 'ectoscop'],
          ['En abdomen se ausculta antes de…', 'Palpar || La palpación', 'palp']
        ] },
        { t: 'Registro', hojas: [
          ['En la revisión por sistemas sin alteraciones se escribe…', 'Niega || "Niega…"', 'niega|no aporta'],
          ['Pulso: frecuencia, ritmo, amplitud, tensión y…', 'Simetría', 'simetr'],
          ['En la síntesis semiológica NO se coloca…', 'Una lista de diagnósticos || Diagnósticos', 'diagnost'],
          ['Edema en la planilla: localización y signo de… (negativo o positivo)', 'Fóvea || Signo de fóvea', 'fovea']
        ] }
      ]
    },
    {
      id: 'semio_p_torax', area: 'pratica', clase: 'Práctica', titulo: 'Examen del tórax paso a paso', tipo: 'fluxo', sl: [[7,5,27]],
      resumen: 'La secuencia del examen respiratorio que se hace en la práctica, con lo que se busca en cada paso.',
      fuente: 'Clase 7 · Examen físico del tórax; Historia Clínica Práctica (tórax: I-P-P-A)',
      pasos: [
        { f: 'Paciente sentado, espalda descubierta, brazos cruzados al frente para separar las escápulas; siempre comparar ambos hemitórax' },
        '[[Inspección::inspecc]] estática: forma del tórax, simetría, piel, circulación colateral',
        'Inspección dinámica: tipo respiratorio, [[frecuencia respiratoria || FR::frecuencia respirat]] y patrón',
        '[[Palpación::palpac]]: mano de escultor, elasticidad y expansión (maniobra de [[Ruault::ruault]])',
        'Vibraciones vocales: el paciente dice "[[33::33|treinta y tres]]"',
        '[[Percusión::percus]] dígito-digital, de arriba hacia abajo, comparando puntos simétricos',
        '[[Auscultación::auscult]]: murmullo vesicular y ruidos agregados',
        'Auscultación de la [[voz::voz]]: broncofonía, pectoriloquia, egofonía',
        { end: 'Registrar en la planilla: murmullo vesicular [[conservado::conservad]], disminuido o aumentado; ruidos agregados: no o sí' }
      ]
    },
    {
      id: 'semio_p_plan_torax', area: 'pratica', clase: 'Práctica', titulo: 'Planilla del examen: tórax respiratorio', tipo: 'tabla',
      resumen: 'Lo que la planilla de la HC práctica pide en cada paso del examen respiratorio (I-P-P-A).',
      fuente: 'Historia Clínica Práctica — Semiología Médica: Tórax, aparato respiratorio',
      columnas: ['Paso', 'Ítem de la planilla', 'Qué se marca o anota'],
      filas: [
        ['Inspección', 'Tórax', 'Simétrico o [[asimétrico::asimetric]]'],
        ['Inspección', 'Patrón respiratorio', 'Costal, abdominal o [[costoabdominal::costoabdom]]'],
        ['Inspección', 'Otros ítems', 'Coloración (normal o cianosis), FR, expansión, [[retracciones o tirajes || retracciones/tirajes || tirajes || retracciones::retracc|tiraje]] y circulación colateral'],
        ['Palpación', '[[Elasticidad::elastic]] y expansibilidad', 'Conservada, aumentada o disminuida'],
        ['Palpación', '[[Vibraciones vocales::vibracion|vocal]]', 'Conservadas, aumentadas o disminuidas, y localización de las alteraciones'],
        ['Percusión', '[[Sonoridad::sonorid]]', 'Conservada, disminuida o aumentada; columna, bases pulmonares y [[excursión::excursi]] en cm'],
        ['Auscultación', '[[Murmullo vesicular::murmullo|vesicul]]', 'Conservado, disminuido o aumentado'],
        ['Auscultación', 'Ruido [[laringotraqueal::laringotraq]]', 'Conservado o alterado'],
        ['Auscultación', 'Ruidos agregados', 'Sibilancias, roncus, crepitantes, [[subcrepitantes::subcrepit]] u otros, con su distribución por campo pulmonar']
      ]
    },
    {
      id: 'semio_p_plan_cardio', area: 'pratica', clase: 'Práctica', titulo: 'Planilla del examen: pulso y corazón', tipo: 'tabla',
      resumen: 'El examen cardiovascular de la planilla: los 5 elementos del pulso, la secuencia del corazón y cómo describir un soplo.',
      fuente: 'Historia Clínica Práctica — Semiología Médica: Aparato cardiovascular; Clase 7 (la percusión no se usa de rutina en cardiovascular)',
      columnas: ['Qué se evalúa', 'Ítems de la planilla'],
      filas: [
        ['Pulso: los 5 elementos', 'Frecuencia + ritmo + [[amplitud::amplitud]] + [[tensión::tension]] + [[simetría::simetr]]'],
        ['Pulso radial', 'Frecuencia en lpm; ritmo [[regular o irregular || regular/irregular || regular e irregular::regular;irregular]]'],
        ['Corazón: secuencia', 'Inspección → [[palpación::palpac]] → [[auscultación::auscult]] (la percusión no se usa de rutina)'],
        ['Inspección y palpación', 'Ictus cordis (visible en qué EIC), [[choque de punta::choque]] con su ubicación y frémitos'],
        ['Auscultación', 'FC; R1 y R2 [[normofonéticos::normofonet]], hipo o hiperfonéticos; soplos'],
        ['Si hay soplo, describir', '[[Sistólico o diastólico || Sistólico/diastólico::sistolic;diastolic]] + foco máximo + intensidad + [[irradiación::irradiac]] + modificaciones con la posición o la respiración']
      ]
    },
    {
      id: 'semio_p_plan_abdomen', area: 'pratica', clase: 'Práctica', titulo: 'Planilla del examen: abdomen y urinario', tipo: 'tabla',
      resumen: 'Abdomen en orden I-A-P-P (se ausculta antes de palpar) y los puntos del aparato urinario.',
      fuente: 'Historia Clínica Práctica — Semiología Médica: Abdomen y Aparato urinario',
      columnas: ['Paso', 'Ítems de la planilla'],
      filas: [
        ['1. Inspección', 'Forma: plano, [[globuloso::globulos]] o excavado; simetría; cicatriz umbilical (normal, invertida, evertida o protruida); cicatrices, estrías, circulación colateral, hernias'],
        ['2. [[Auscultación::auscult]]', 'Ruidos [[hidroaéreos::hidroaere]] por minuto: presentes, disminuidos o aumentados'],
        ['3. Percusión', 'Sonoridad conservada, matidez, matidez [[cambiante::cambiant]], onda líquida, signo del [[témpano::tempano]]'],
        ['4. [[Palpación::palpac]]', 'Blando o tenso, [[depresible::depresib]], dolor superficial y profundo, temperatura, tumoraciones, [[visceromegalias::visceromegal]]'],
        ['Tumoración', 'Localización, tamaño, forma, [[consistencia::consisten]], superficie, movilidad y sensibilidad'],
        ['Aparato urinario', 'Fosas lumbares, puntos costovertebrales y ureterales, [[puñopercusión || puñopercusion::punopercus|puñopercus]] (negativa o positiva, y lado)']
      ]
    },
    {
      id: 'semio_p_ausculta', area: 'pratica', clase: 'Práctica', titulo: 'Auscultación: ¿qué ruido es?', tipo: 'casos',
      resumen: 'Cada caso describe un ruido con las palabras de la clase: elegí cuál es. Para entrenar la auscultación de la práctica.',
      fuente: 'Clase 7 · Ruidos respiratorios, voz, focos y ruidos cardíacos (tabla de diferenciación de la profesora)',
      casos: [
        ['Sonido musical, continuo y agudo, como un silbido, sobre todo en la espiración. No cambia con la tos.', '¿Qué ruido es?', 'a) Sibilancias', 'a', 'Paso del aire por una vía aérea estrechada: asma, EPOC, cuerpo extraño.',
         ['a) Sibilancias', 'b) Roncus', 'c) Estridor', 'd) Frote pleural']],
        ['Sonido continuo, grave y ronco, en ambas fases; desaparece después de que el paciente tose.', '¿Qué ruido es?', 'b) Roncus', 'b', 'Secreciones en vías de mayor calibre (bronquitis, EPOC).',
         ['a) Sibilancias', 'b) Roncus', 'c) Crepitantes', 'd) Subcrepitantes']],
        ['Chasquidos breves al final de la inspiración, como frotar mechones de cabello cerca del oído. La tos no los modifica.', '¿Qué ruido es?', 'c) Crepitantes', 'c', 'Neumonía, fibrosis, edema pulmonar inicial.',
         ['a) Subcrepitantes', 'b) Roncus', 'c) Crepitantes', 'd) Frote pleural']],
        ['Burbujas gruesas que estallan en ambas fases; cambian con la tos.', '¿Qué ruido es?', 'd) Subcrepitantes', 'd', 'Edema pulmonar avanzado, bronquiectasias, secreciones abundantes.',
         ['a) Crepitantes', 'b) Sibilancias', 'c) Roncus', 'd) Subcrepitantes']],
        ['Sonido áspero, de "cuero nuevo" o "pasos en la nieve", en ambas fases, que no cambia con la tos.', '¿Qué ruido es?', 'a) Frote pleural', 'a', 'Inflamación de las hojas pleurales; su equivalente palpatorio es el frémito pleural.',
         ['a) Frote pleural', 'b) Roncus', 'c) Crepitantes', 'd) Estridor']],
        ['Sonido agudo e intenso que se oye sin estetoscopio, sobre todo en la inspiración, en un niño con crup.', '¿Qué ruido es?', 'c) Estridor (cornaje)', 'c', 'Obstrucción de la vía aérea superior: urgencia respiratoria.',
         ['a) Sibilancias', 'b) Roncus', 'c) Estridor (cornaje)', 'd) Egofonía']],
        ['Al pedir que diga "33", la voz se oye temblorosa, nasal y aguda en el límite superior de una matidez.', '¿Qué hallazgo es?', 'b) Egofonía', 'b', 'Marcador del límite superior de un derrame pleural.',
         ['a) Broncofonía', 'b) Egofonía', 'c) Pectoriloquia', 'd) Pectoriloquia áfona']],
        ['Sobre una zona de matidez, las palabras cuchicheadas se entienden con claridad.', '¿Qué hallazgo es y qué indica?', 'd) Pectoriloquia áfona: condensación con bronquio permeable', 'd', 'Broncofonía y pectoriloquia también indican condensación; la egofonía, derrame.',
         ['a) Egofonía: derrame', 'b) Broncofonía: neumotórax', 'c) Murmullo vesicular normal', 'd) Pectoriloquia áfona: condensación con bronquio permeable']],
        ['Sobre la tráquea se escucha un sonido hueco y fuerte, con la espiración tan audible como la inspiración.', '¿Es normal?', 'a) Sí: respiración laringotraqueal', 'a', 'Es normal solo sobre la tráquea; en el resto del tórax indica condensación.',
         ['a) Sí: respiración laringotraqueal', 'b) No: es un soplo patológico', 'c) No: son roncus', 'd) Sí: es murmullo vesicular']],
        ['En el foco mitral se oye un ruido grave justo después de R2, con ritmo "Ken-tuc-ky", en un adulto con disnea.', '¿Qué ruido es?', 'c) R3 (galope ventricular)', 'c', 'Fisiológico en jóvenes; en el adulto sugiere insuficiencia cardíaca.',
         ['a) R4', 'b) Desdoblamiento de R2', 'c) R3 (galope ventricular)', 'd) Soplo sistólico']],
        ['Antes de R1 se oye un ruido de baja frecuencia, con ritmo "Te-nnes-see", en un hipertenso.', '¿Qué ruido es?', 'a) R4', 'a', 'Contracción auricular contra un ventrículo poco distensible: siempre patológico.',
         ['a) R4', 'b) R3', 'c) R1 desdoblado', 'd) Clic de eyección']],
        ['Joven sano: durante la inspiración el segundo ruido se oye en dos componentes.', '¿Qué es?', 'b) Desdoblamiento fisiológico de R2', 'b', 'El cierre pulmonar se retrasa en la inspiración: normal en jóvenes.',
         ['a) Galope por R3', 'b) Desdoblamiento fisiológico de R2', 'c) R4', 'd) Soplo']],
        ['Para escuchar mejor el R1 y los ruidos de la válvula mitral, ¿dónde se coloca el estetoscopio?', '¿En qué foco?', 'd) Foco mitral: 5.º espacio intercostal izquierdo, línea medioclavicular', 'd', 'Coincide con el choque de punta; se acentúa en decúbito lateral izquierdo (Pachón).',
         ['a) 2.º espacio intercostal derecho', 'b) 2.º espacio intercostal izquierdo', 'c) 3.er espacio intercostal izquierdo', 'd) Foco mitral: 5.º espacio intercostal izquierdo, línea medioclavicular']]
      ]
    }
  ]
};
