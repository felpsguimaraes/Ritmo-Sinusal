/* Sinus · Mapas guiados · Medicina de la Familia (5º semestre, UCP) · Dra. Loren Noguera
   Clases 1 (Introducción), 2 (Principios), 4 (Familiograma), 5 (Clasificación familiar), 6 (Ciclo vital
   individual y familiar), 7 (APGAR familiar y escala de Holmes y Rahe), 8 (Promoción de la salud),
   9 (Prevención de enfermedades) y 10 (Salud del niño). La pasta del Drive no trae la clase 3.
   sl = [clase, página inicial, página final] del PDF de cada clase (todos se bajaron con páginas).
   Las láminas que son solo imagen se leyeron una por una; lo que la clase no dice, no está acá.
   Donde dos láminas dan edades distintas (Erikson, Freud), la edad no se pregunta o se aclara.
   figura = el familiograma del ejercicio, recortado de la lámina (img/familia).
   Respuestas: escribir el término completo. "A || B" = las dos valen. */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
window.SINUS_MAPAS.familia = {
  nome: 'Medicina de la Familia',
  docente: 'Dra. Loren Noguera',
  fonte: 'Clases 1, 2 y 4 a 10 · Hospital Universitario, UCP',
  clases: {
    1: ['1 · Introducción a la medicina familiar', '1 Introducción'],
    2: ['2 · Principios de la medicina familiar', '2 Principios'],
    4: ['4 · Familiograma', '4 Familiograma'],
    5: ['5 · Clasificación familiar', '5 Clasificación'],
    6: ['6 · Ciclo vital individual y familiar', '6 Ciclo vital'],
    7: ['7 · APGAR familiar y escala de Holmes y Rahe', '7 APGAR y Holmes'],
    8: ['8 · Promoción de la salud', '8 Promoción'],
    9: ['9 · Prevención de enfermedades', '9 Prevención'],
    10: ['10 · Salud del niño', '10 Niño sano']
  },
  modulos: [

    /* ───────────── Clase 1 · Introducción ───────────── */
    {
      id: 'mf_salud', clase: '1 Introducción', titulo: 'Salud, enfermedad y determinantes', tipo: 'mapa', sl: [[1, 9, 12]],
      centro: 'Salud y enfermedad', sub: 'Definiciones de la OMS y los 4 determinantes',
      fuente: 'Clase 1 · ¿Qué es salud?, determinantes de la salud y ¿qué es enfermedad?',
      ramas: [
        { t: 'Salud (OMS)', hojas: [
          ['Estado de completo bienestar físico, mental y…', 'Social', 'social'],
          ['…y no solamente la ausencia de afecciones o…', 'Enfermedades', 'enfermedad'],
          ['Además del estado físico, cuentan los aspectos psicológicos y cómo nos influye el…', 'Entorno', 'entorno']
        ] },
        { t: 'Determinantes', hojas: [
          ['La edad y la genética', 'Biológicos', 'biologic'],
          ['Organismos infecciosos, contaminación, clima', 'Ambientales', 'ambiental'],
          ['Alimentación, actividad física, consumo de drogas, tipo de trabajo', 'Estilo de vida', 'estilo'],
          ['Centros de salud, hospitales, personal sanitario, acceso a medicamentos', 'Salud pública', 'publica']
        ] },
        { t: 'Enfermedad (OMS)', hojas: [
          ['Alteración o desviación del estado… en una o varias partes del cuerpo', 'Fisiológico', 'fisiolog'],
          ['Se manifiesta por síntomas y…', 'Signos característicos || Signos', 'signo'],
          ['Su evolución es más o menos…', 'Previsible', 'previsible'],
          ['Trastorno del normal funcionamiento del organismo, a nivel físico y…', 'Mental', 'mental']
        ] }
      ]
    },
    {
      id: 'mf_que_es', clase: '1 Introducción', titulo: '¿Qué es la Medicina de la Familia?', tipo: 'mapa', sl: [[1, 13, 15]],
      centro: 'Medicina de la Familia', sub: 'Origen, objetivo y lo que la distingue',
      fuente: 'Clase 1 · ¿Qué es Medicina de la Familia?, definición y diferencia con los otros especialistas',
      ramas: [
        { t: 'Origen', hojas: [
          ['Surgió en la década de los 50 en México, Reino Unido y…', 'Canadá', 'canada'],
          ['Década en que surgió', 'Los 50 || Los 50s || Los años 50 || 1950 || La década de 1950', '50']
        ] },
        { t: 'Objetivo', hojas: [
          ['Resolver los problemas que impactan la salud…', 'Familiar', 'familiar'],
          ['Problemas biológicos, psicológicos, sociales, familiares, culturales y…', 'Administrativos y organizacionales || Administrativos', 'administrativ']
        ] },
        { t: 'Definición', hojas: [
          ['Integra las ciencias biológicas, clínicas, sociales y del…', 'Comportamiento', 'comportamiento'],
          ['Especialidad clínica orientada a la…', 'Atención Primaria || Atención primaria || APS', 'atencion primaria|aps'],
          ['Da atención sanitaria continua e integral al individuo y a la…', 'Familia', 'familia']
        ] },
        { t: 'Lo que la distingue', hojas: [
          ['Parte de la consulta en AP que resuelve', 'Más del 80% || Más del 80 %', '80'],
          ['Su ámbito: todas las edades, ambos sexos, cada sistema orgánico y todas las…', 'Enfermedades', 'enfermedad'],
          ['Brinda atención y consejería a familias en…', 'Riesgo', 'riesgo'],
          ['También maneja las… en Atención Primaria', 'Urgencias', 'urgencia']
        ] }
      ]
    },
    {
      id: 'mf_pilares', clase: '1 Introducción', titulo: 'Los 4 pilares y por qué la familia', tipo: 'mapa', sl: [[1, 16, 19]],
      centro: 'Atención integral', sub: 'Los 4 pilares, la familia y el modelo de atención',
      fuente: 'Clase 1 · Los 4 pilares de la Medicina Familiar, por qué la familia y el modelo de atención integral en salud familiar',
      ramas: [
        { t: 'Los 4 pilares', hojas: [
          ['Aborda mente, cuerpo y emociones', 'Integral', 'integral'],
          ['Relación a largo plazo para una atención consistente', 'Continua', 'continua'],
          ['Colaboración para mejorar la salud en la comunidad', 'Comunitaria', 'comunitari'],
          ['Enfoque anticipado para evitar enfermedades', 'Preventiva', 'preventiv']
        ] },
        { t: 'Por qué la familia', hojas: [
          ['Contexto social primario del individuo: matriz de humanización y de…', 'Individuación', 'individuaci'],
          ['Sus creencias definen la vivencia de la enfermedad, el rol de enfermo y el uso de los…', 'Servicios de salud', 'servicio'],
          ['Modula la respuesta al tratamiento, es decir, la…', 'Adherencia', 'adherencia'],
          ['Aporta factores protectores o de…', 'Riesgo', 'riesgo']
        ] },
        { t: 'Familia y salud', hojas: [
          ['Hacia la salud, la familia transmite conductas y…', 'Hábitos', 'habito'],
          ['Ante la enfermedad, la familia da apoyo o…', 'Abandono', 'abandono']
        ] },
        { t: 'Modelo de atención integral', hojas: [
          ['Con enfoque familiar y…', 'Comunitario', 'comunitari'],
          ['Equipos que requiere (sigla)', 'ESF || Equipos de Salud Familiar', 'esf|equipos de salud familiar'],
          ['Trabajan en su territorio, en un espacio geo-poblacional previamente…', 'Definido', 'definido'],
          ['No solo cuando la persona está enferma: atención continua en todas las etapas de la…', 'Vida', 'vida']
        ] }
      ]
    },

    /* ───────────── Clase 2 · Principios ───────────── */
    {
      id: 'mf_mcwhinney', clase: '2 Principios', titulo: 'Principios: los 7 atributos de McWhinney', tipo: 'fluxo', sl: [[2, 3, 5]],
      resumen: 'La medicina familiar como especialidad horizontal y los siete atributos, en el orden de la clase.',
      fuente: 'Clase 2 · Principios de la medicina familiar y atributos definidos por McWhinney',
      pasos: [
        'A diferencia de las especialidades lineales, la medicina familiar es una especialidad [[horizontal::horizontal]]',
        'Comparte aproximadamente el [[70% || 70 %::70]] de los contenidos de cualquier especialidad lineal y además comprende los espacios entre ellas',
        '1 · Especialización en el [[paciente::paciente]]',
        '2 · Comprensión del [[contexto::contexto]]',
        '3 · Actitud permanente hacia la educación y la [[prevención::prevenci]]',
        '4 · Actitud hacia todos sus pacientes como integrantes de una [[población de riesgo::poblacion;riesgo]]',
        '5 · [[Accesibilidad::accesib]] y disponibilidad',
        '6 · Compatibilización de juicios, valores y [[actitudes::actitud]] con los de sus pacientes',
        { end: '7 · Manejo eficiente y racional de los [[recursos::recurso]]' }
      ]
    },
    {
      id: 'mf_atributos', clase: '2 Principios', titulo: 'Qué exige cada atributo', tipo: 'mapa', sl: [[2, 6, 14]],
      centro: 'Atributos del médico de familia', sub: 'Lo que la clase explica de cada uno',
      fuente: 'Clase 2 · Los siete atributos explicados uno por uno',
      ramas: [
        { t: 'Paciente y contexto', hojas: [
          ['Para diferenciarlo del pediatra, el clínico o el geriatra, es un generalista…', 'Genérico', 'generic'],
          ['Su área de responsabilidad se define solo por las… del paciente y su familia', 'Necesidades', 'necesidad'],
          ['Resolver un problema desde una sola perspectiva es insuficiente y…', 'Reduccionista', 'reduccion']
        ] },
        { t: 'Educación y prevención', hojas: [
          ['Cada encuentro es una oportunidad para la educación o la…', 'Prevención', 'prevenci'],
          ['Estrategia preventiva más efectiva (la otra es el tamizaje o cribado)', 'La pesquisa de casos || Pesquisa de casos || Pesquisa clínica de casos', 'pesquisa'],
          ['En la pesquisa clínica, quien inicia la intervención es el…', 'Médico', 'medico'],
          ['Veces al año que, en promedio, cada paciente ve a su médico de cabecera', 'Dos || 2 || Al menos dos', 'dos|2']
        ] },
        { t: 'Población de riesgo', hojas: [
          ['Le preocupa tanto como un hipertenso no controlado: no chequear la… de un no hipertenso', 'Presión || Presión arterial', 'presion'],
          ['…o la falta de una… en un individuo expuesto', 'Vacuna', 'vacun']
        ] },
        { t: 'Accesibilidad y valores', hojas: [
          ['Dónde debería vivir el médico de familia', 'Cerca de donde viven sus pacientes || Cerca de sus pacientes', 'cerca'],
          ['Lo que está detrás del mensaje del terapeuta', 'Metamensaje || El metamensaje', 'metamensaje'],
          ['Ejemplo de la clase: en la región andina, mascar coca no significa ser…', 'Cocainómano', 'cocainoman']
        ] },
        { t: 'Recursos', hojas: [
          ['Como puerta de entrada al sistema, los médicos de atención primaria se transforman en…', 'Primera línea || La primera línea', 'primera linea'],
          ['Buscan un uso más apropiado y… de los servicios disponibles', 'Equitativo', 'equitativ']
        ] }
      ]
    },
    {
      id: 'mf_componentes', clase: '2 Principios', titulo: 'Componentes, estrategias y habilidades', tipo: 'mapa', sl: [[2, 15, 20]],
      centro: 'Atención médica primaria', sub: 'Componentes, estrategias y habilidades',
      fuente: 'Clase 2 · Componentes de la atención médica primaria, estrategias de la medicina familiar y habilidades del médico de familia',
      ramas: [
        { t: 'Componentes (1 a 4)', hojas: [
          ['Primer…', 'Contacto', 'contacto'],
          ['El segundo de la lista, que también es atributo de McWhinney', 'Accesibilidad', 'accesib'],
          ['Continuidad y… en la atención', 'Longitudinalidad', 'longitudinal'],
          ['Atención…', 'Integral', 'integral']
        ] },
        { t: 'Componentes (5 a 8)', hojas: [
          ['Colaboración y trabajo en…', 'Equipo', 'equipo'],
          ['Coordinación de la atención y proceso de…', 'Interconsulta', 'interconsult'],
          ['Orientación familiar y orientación…', 'Comunitaria', 'comunitari']
        ] },
        { t: 'Estrategias', hojas: [
          ['Conocer las enfermedades más…', 'Frecuentes', 'frecuente'],
          ['La que la clase nombra en segundo lugar', 'La prevención || Prevención', 'prevenci'],
          ['Enfoque…', 'Biopsicosocial', 'biopsicosocial']
        ] },
        { t: 'Habilidades', hojas: [
          ['Solución de problemas… en una relación personal y continuada', 'Indiferenciados', 'indiferenciad'],
          ['Identificar en forma precoz los riesgos y problemas de los pacientes conocidos', 'Preventivas || Habilidades preventivas', 'preventiv'],
          ['Usar la relación médico-paciente-familia para que los planes sean más efectivos', 'Terapéuticas || Habilidades terapéuticas', 'terapeutic'],
          ['Emplear los recursos de la comunidad y del sistema de atención', 'Gestionar los recursos || Habilidades para gestionar los recursos', 'gestion']
        ] },
        { t: 'Procedimientos que domina', hojas: [
          ['Toma de… e interpretación de mamografías', 'Papanicolaou', 'papanicol'],
          ['Colocación y remoción del…', 'Dispositivo intrauterino || DIU', 'intrauterino|diu'],
          ['Cuidado del embarazo y puerperio, y partos vaginales en…', 'Cefálica', 'cefalic'],
          ['Reanimación…, manejo de la vía aérea y cardioversión eléctrica', 'Cardiopulmonar', 'cardiopulmonar']
        ] }
      ]
    },
    {
      id: 'mf_aps', clase: '2 Principios', titulo: 'APS y medicina familiar', tipo: 'mapa', sl: [[2, 21, 25]],
      centro: 'APS', sub: 'Atención Primaria de la Salud',
      fuente: 'Clase 2 · Definición de APS, sus componentes, medicina familiar como especialidad de la APS y conclusión',
      ramas: [
        { t: 'Definición', hojas: [
          ['Cuidado esencial basado en métodos prácticos, científicamente sólidos y socialmente…', 'Aceptables', 'aceptable'],
          ['Con tecnología universalmente…', 'Accesible', 'accesible'],
          ['Para individuos y familias de la comunidad, a través de su participación…', 'Total', 'total'],
          ['A un costo al que la comunidad y el país puedan…', 'Acceder', 'acceder']
        ] },
        { t: 'Componentes', hojas: [
          ['Abastecimiento de alimentos y una adecuada…', 'Nutrición', 'nutrici'],
          ['Suministro de… y de servicios sanitarios básicos', 'Agua potable', 'agua'],
          ['Salud materno-infantil, incluyendo la…', 'Planificación familiar', 'planificaci'],
          ['…contra las principales enfermedades infecciosas', 'Inmunización', 'inmuniz'],
          ['Prevención y control de las enfermedades… locales', 'Endémicas', 'endemic'],
          ['Provisión de medicamentos…', 'Esenciales', 'esencial']
        ] },
        { t: 'Medicina familiar', hojas: [
          ['Por definición, la especialidad médica… de la APS', 'Efectora', 'efector'],
          ['La unidad funcional de los cuidados primarios es la familia y no el…', 'Individuo', 'individuo'],
          ['Así se evita… a cada integrante en distintos proveedores de salud', 'Fragmentar', 'fragment']
        ] }
      ]
    },
    {
      id: 'mf_casos_perla', clase: '2 Principios', titulo: 'Casos de la clase: la Sra. Perla', tipo: 'casos', sl: [[2, 26, 29]],
      resumen: 'Los dos casos de la clase 2 y sus preguntas, respondidas con los atributos del médico de familia.',
      fuente: 'Clase 2 · Primer y segundo caso clínico y sus cinco preguntas',
      casos: [
        ['La Sra. Perla, de 32 años, sana y sin factores de riesgo coronario, consulta al cardiólogo por dolor retroesternal sin relación con el esfuerzo. No le parece un dolor coronario, pero pide ECG y prueba ergométrica "para tener mayor seguridad".', 'La pregunta 1 de la clase es si usa en forma adecuada y racional los métodos auxiliares. ¿Qué atributo de McWhinney se pone en juego?', 'b) Manejo eficiente y racional de los recursos', 'b',
         'Séptimo atributo: el médico de familia debe manejar los recursos con racionalidad y eficiencia, buscando un uso más apropiado y equitativo de los servicios.',
         ['a) Accesibilidad y disponibilidad', 'b) Manejo eficiente y racional de los recursos', 'c) Compatibilización de juicios y valores', 'd) Actitud hacia la población de riesgo']],
        ['Las dos pruebas son normales: el cardiólogo descarta enfermedad coronaria y le sugiere consultar a un gastroenterólogo o a un psicólogo si los síntomas persisten.', 'Pregunta 2 de la clase: ¿el especialista conoce a la paciente y a su familia?', 'b) No: la ve una sola vez y la deriva', 'b',
         'Para el médico de familia el objeto de la práctica es el paciente y su familia, y su área de responsabilidad se define por las necesidades de ellos (primer atributo).',
         ['a) Sí: indagó su contexto familiar', 'b) No: la ve una sola vez y la deriva']],
        ['Segundo caso: la misma paciente consulta al gastroenterólogo por el mismo dolor. Le pide una endoscopia, inicia antiácidos en forma empírica y le sugiere ver a un cardiólogo o a un psicólogo si los síntomas persisten.', 'Cada especialista mira el dolor desde su órgano. ¿Qué atributo dice que resolverlo desde una sola perspectiva es insuficiente y reduccionista?', 'c) Comprensión del contexto', 'c',
         'La mayoría de los padecimientos reflejan la interacción de factores genéticos, personales, demográficos, ambientales y socioculturales.',
         ['a) Accesibilidad y disponibilidad', 'b) Manejo eficiente de los recursos', 'c) Comprensión del contexto', 'd) Especialización en el paciente']],
        ['', 'Pregunta 4 de la clase: definí medicina de la familia.', 'a) Especialidad médica que proporciona atención sanitaria continua e integral al individuo y a la familia', 'a',
         'Definición de la clase 1. Integra las ciencias biológicas, clínicas, sociales y del comportamiento.',
         ['a) Especialidad médica que proporciona atención sanitaria continua e integral al individuo y a la familia', 'b) Especialidad lineal que atiende solo los problemas frecuentes de cada órgano', 'c) Especialidad hospitalaria centrada en el individuo enfermo', 'd) Especialidad que atiende solo a niños y adultos mayores']],
        ['', 'La conclusión de la clase: la medicina familiar usa la prevención, el conocimiento de las enfermedades más frecuentes y el enfoque…', 'Biopsicosocial', 'biopsicosocial',
         'Para poder realizar una atención más humana e integral.']
      ]
    },

    /* ───────────── Clase 4 · Familiograma ───────────── */
    {
      id: 'mf_familiograma', clase: '4 Familiograma', titulo: 'El familiograma: concepto, funciones e interpretación', tipo: 'mapa', sl: [[4, 4, 6], [4, 13, 16]],
      centro: 'Familiograma', sub: 'Qué es, para qué sirve y cómo se lee',
      fuente: 'Clase 4 · Concepto, funciones del familiograma, nivel de relaciones e interpretación',
      ramas: [
        { t: 'Concepto', hojas: [
          ['Representación… del desarrollo de la familia a lo largo del tiempo', 'Gráfica', 'grafic'],
          ['Facilita el abordaje… familiar en la atención al paciente', 'Sistémico', 'sistemic'],
          ['Al conocer el crecimiento de la familia, la familia misma se convierte en un… para el manejo', 'Recurso', 'recurso']
        ] },
        { t: 'Funciones', hojas: [
          ['Visión rápida y global del ambiente… del paciente', 'Psicosocial', 'psicosocial'],
          ['Las etapas del ciclo vital familiar e… del paciente', 'Individual', 'individual'],
          ['Las pautas generacionales…', 'Repetitivas', 'repetitiv'],
          ['Mapa relacional: los sistemas de comunicación e… de los componentes', 'Interacción', 'interacci']
        ] },
        { t: 'Relaciones', hojas: [
          ['El nivel de relaciones es el elemento más… del genograma', 'Inferencial', 'inferencial'],
          ['Se basa en informes de los miembros de la familia y en la observación…', 'Directa', 'directa'],
          ['Las conexiones emocionales se dibujan una vez construida la estructura…', 'Básica', 'basica']
        ] },
        { t: 'Interpretación', hojas: [
          ['Composición del…', 'Hogar', 'hogar'],
          ['Constelación…', 'Fraterna', 'fratern'],
          ['Configuraciones familiares…', 'Inusuales', 'inusual'],
          ['Repetición de pautas a través de las…', 'Generaciones', 'generacion'],
          ['Sucesos de la vida y… familiar', 'Funcionamiento', 'funcionamiento']
        ] }
      ]
    },
    {
      id: 'mf_simbolos', clase: '4 Familiograma', titulo: 'Símbolos: personas y parejas', tipo: 'tabla', sl: [[4, 7, 10], [4, 14, 15]],
      resumen: 'Cómo se dibuja cada persona y cada tipo de unión, con las reglas de la clase.',
      fuente: 'Clase 4 · Estructura, símbolos y formato para la realización del familiograma',
      columnas: ['Qué se representa', 'Cómo se dibuja'],
      filas: [
        ['Hombre', '[[Cuadrado::cuadrad]]'],
        ['Mujer', '[[Círculo::circul]]'],
        ['Paciente identificado', 'Con línea [[doble::doble]], o señalado con una flecha'],
        ['Persona fallecida', 'Una [[X::^x]] dentro de la figura, con la edad al fallecer'],
        ['Edad', '[[Dentro de la figura || Dentro::dentro]]'],
        ['Fechas de nacimiento y muerte', 'A la [[izquierda::izquierd]] y a la derecha, sobre la figura'],
        ['Matrimonio', 'Línea que baja y cruza, con el esposo a la [[izquierda::izquierd]] y la esposa a la derecha'],
        ['Fecha de casamiento', 'La letra [[M::^m]] seguida de la fecha'],
        ['Separación', '[[Una diagonal || 1 diagonal::una|1]] sobre la línea de la pareja'],
        ['Divorcio', '[[Dos diagonales || 2 diagonales::dos|2]] sobre la línea de la pareja'],
        ['Pareja no casada', 'Igual que la casada, pero con línea de [[segmentos::segmento]]; la fecha es cuando se conocieron o empezaron a vivir juntos'],
        ['Matrimonios múltiples', 'De izquierda a derecha, con el más [[reciente::recient]] al final']
      ]
    },
    {
      id: 'mf_simbolos_hijos', clase: '4 Familiograma', titulo: 'Símbolos: hijos y hogar', tipo: 'tabla', sl: [[4, 11, 14]],
      resumen: 'Hijos, embarazos, pérdidas y la línea que marca quiénes viven juntos.',
      fuente: 'Clase 4 · Genograma: hijos (lámina 11), hogar (lámina 12) y simbología (lámina 14)',
      columnas: ['Qué se representa', 'Cómo se dibuja'],
      filas: [
        ['Hijo natural', 'Línea [[continua::continu]] que baja de la línea de la pareja'],
        ['Hijo adoptado', 'Línea [[punteada::puntead]] que baja de la línea de la pareja'],
        ['Hijos mellizos', 'Dos líneas que salen de un [[mismo punto::mismo punto|punto]]'],
        ['Hijos gemelos', 'Como los mellizos, pero con una línea [[horizontal::horizontal]] que une las dos ramas'],
        ['Embarazo', '[[Triángulo::triangul]]'],
        ['Aborto espontáneo', 'Un [[círculo negro || punto negro || círculo relleno::negro|relleno]]'],
        ['Aborto inducido', 'Una [[X::^x]] pequeña al final de la línea'],
        ['Familia que vive en un mismo lugar', 'Línea [[punteada::puntead]] alrededor de los integrantes que cohabitan']
      ]
    },
    {
      id: 'mf_relaciones', clase: '4 Familiograma', titulo: 'Líneas de relación', tipo: 'tabla', sl: [[4, 13, 15]],
      resumen: 'Las seis conexiones emocionales de la lámina 15 (la 14 llama "hostil" a la del zigzag).',
      fuente: 'Clase 4 · Nivel de relaciones y conexiones emocionales del genograma',
      columnas: ['Cómo es la línea', 'Relación'],
      filas: [
        ['Tres líneas paralelas', '[[Muy estrecha::estrech]]'],
        ['Dos líneas paralelas', '[[Cercana::cercan]]'],
        ['Línea de guiones', '[[Distante::distant]]'],
        ['Línea en zigzag', '[[Conflictiva || Hostil::conflict|hostil]]'],
        ['Tres líneas con un zigzag encima', '[[Muy estrecha pero conflictiva || Muy estrecha, pero conflictiva::estrech;conflict]]'],
        ['Línea cortada por dos barras', '[[Quiebre::quiebre]]']
      ]
    },
    {
      id: 'mf_fg_juan', clase: '4 Familiograma', titulo: 'Leé el familiograma: Juan y María', tipo: 'casos', sl: [[4, 8, 8]],
      figura: { src: 'img/familia/fg-aula4-juan-maria.png', w: 1152, h: 557, alt: 'Familiograma de la clase 4: Juan, María, sus tres hijos con sus parejas y los nietos', pie: 'Clase 4 · lámina 8' },
      resumen: 'El familiograma que la clase muestra junto a los símbolos: identificá quién es quién y qué marca cada línea.',
      fuente: 'Clase 4 · Ejemplo de familiograma de la sección de estructura, símbolos y formato',
      casos: [
        ['', '¿Quién es el paciente identificado?', 'Juan', 'juan', 'Es el cuadrado con línea doble (77 años, contador jubilado).'],
        ['', '¿Cuántos años de matrimonio tienen Juan y María?', '48 años || 48', '48', 'Está escrito sobre la línea que une a la pareja.'],
        ['', '¿Quiénes viven en el hogar que marca la línea punteada?', 'b) Solo Juan y María', 'b', 'La línea punteada rodea a los integrantes que cohabitan: acá, solo la pareja de 77 y 67 años.',
         ['a) Juan, María y sus tres hijos', 'b) Solo Juan y María', 'c) Juan, María y los nietos', 'd) Toda la familia']],
        ['', '¿Qué patologías tiene Juan?', 'c) DM, HAS, cardiopatía y enfermedad de Parkinson', 'c', 'María tiene DM, HAS y várices.',
         ['a) DM, HAS y várices', 'b) Obesidad y tabaquismo', 'c) DM, HAS, cardiopatía y enfermedad de Parkinson', 'd) Distimia y dislipidemia']],
        ['', 'Sobre la línea de Alejandro (40) y Rosa (35) hay dos diagonales. ¿Qué indican?', 'b) Divorcio', 'b', 'Una diagonal es separación; dos, divorcio. Sus hijos de 17 y 13 años radican en otra ciudad.',
         ['a) Separación', 'b) Divorcio', 'c) Relación distante', 'd) Pareja no casada']],
        ['', '¿Qué hábito se repite en Ramiro, Juan Manuel y Alejandro?', 'Tabaquismo', 'tabaq', 'Juan Manuel además tiene alcoholismo; Alejandro, dislipidemia.'],
        ['', '¿Qué patología comparten Lucía y Rosa?', 'Obesidad', 'obesidad', 'Las dos figuran con obesidad; Celia, la esposa de Juan Manuel, con distimia.']
      ]
    },
    {
      id: 'mf_fg_gloria', clase: '4 Familiograma', titulo: 'Leé el familiograma: Gloria y Sergio', tipo: 'casos', sl: [[4, 17, 17]],
      figura: { src: 'img/familia/fg-aula4-gloria-sergio.png', w: 1124, h: 920, alt: 'Familiograma de la clase 4: Gloria, su expareja Antonio, su esposo Sergio, los hijos y las dos familias de origen', pie: 'Clase 4 · lámina 17' },
      resumen: 'Estructura familiar con un divorcio, una nueva unión y una relación conflictiva. La imagen está ampliada de la original, que es pequeña.',
      fuente: 'Clase 4 · Ejemplo de genograma "Estructura familiar"',
      casos: [
        ['', '¿Cómo se llama la paciente identificada?', 'Gloria', 'gloria', 'La de 33 años, con línea doble. Su madre, de 76, también se llama Gloria.'],
        ['', '¿Qué tipo de familia vive en el hogar (línea punteada)?', 'd) Ensamblada o reconstituida', 'd', 'Conviven Gloria, Sergio, el hijo de la unión anterior de Gloria con Antonio y los hijos de ambos: se conforma con la agregación de dos familias.',
         ['a) Nuclear', 'b) Extensa', 'c) Monoparental', 'd) Ensamblada o reconstituida']],
        ['', '¿Qué relación muestra el zigzag entre Gloria y Sergio?', 'Conflictiva || Hostil || Relación conflictiva', 'conflict|hostil', 'La línea en zigzag es la relación conflictiva (hostil en la lámina 14).'],
        ['', '¿Cómo se llama el hijo de la unión anterior de Gloria con Antonio?', 'Sergio', 'sergio', 'El de 6 años: cuelga de la línea de Gloria y Antonio, cortada por dos diagonales (divorcio, 1997). Figura con agresividad.'],
        ['', '¿Qué patologías tiene Sergio, el esposo (34 años)?', 'a) Alcoholismo, tabaquismo y farmacodependencia', 'a', 'Gloria figura con obesidad exógena y depresión crónica.',
         ['a) Alcoholismo, tabaquismo y farmacodependencia', 'b) DM, HTA e IAM', 'c) Obesidad exógena y depresión crónica', 'd) Agresividad']],
        ['', '¿Qué patología comparten Fidel (80), Gloria (76) y Ana (64), tres de los abuelos?', 'DM || Diabetes mellitus || Diabetes', 'diabet|dm', 'Fidel además tiene HTA e IAM; Ana, HTA: pautas que se repiten a través de las generaciones.'],
        ['', '¿Qué representa el círculo negro de 1998?', 'b) Un aborto', 'b', 'El círculo relleno es el aborto; el triángulo sería un embarazo.',
         ['a) Una hija fallecida', 'b) Un aborto', 'c) Un embarazo en curso', 'd) Una hija adoptada']]
      ]
    },
    {
      id: 'mf_fg_dibujar', clase: '4 Familiograma', titulo: 'Resolvé: cómo dibujar cada familia', tipo: 'fluxo', sl: [[4, 19, 22]], nivel: '1',
      resumen: 'Los cuatro ejercicios "Resuelve" de la clase 4, paso a paso con los símbolos.',
      fuente: 'Clase 4 · Casos clínicos "Resuelve" 1 a 4',
      pasos: [
        { note: 'María tiene 24 años y está casada con Juan, de 27, desde el 12/05/12; viven juntos y tienen un hijo de 3 años.', title: 'Caso 1' },
        'Juan: un [[cuadrado::cuadrad]] a la izquierda; María: un [[círculo::circul]] a la derecha, con la edad dentro de cada figura',
        'Sobre la línea de la pareja: la letra [[M::^m]] y la fecha 12/05/12',
        'El hijo de 3 años: un [[cuadrado::cuadrad]] que baja de la línea de la pareja',
        'Como viven juntos, una línea [[punteada::puntead]] rodea a los tres',
        { note: 'Marcos, de 33 años, vive con Marta, de 31, desde hace 3 años; tuvieron una hija de 5 años.', title: 'Caso 2' },
        'No están casados: la pareja se une con una línea de [[segmentos::segmento]]',
        'La fecha que se anota es cuando [[empezaron a vivir juntos || se conocieron::vivir juntos|conocieron]]',
        'La hija de 5 años: un [[círculo::circul]]',
        { note: 'Juan (25) y Alba (22) están casados desde hace dos años; ella tiene problemas para quedar embarazada y adoptaron una hija de 2 años.', title: 'Caso 3' },
        'Pareja casada: línea continua con la letra [[M::^m]] y la fecha',
        'La hija adoptada se une con una línea [[punteada::puntead]]',
        { note: 'Familia Silva Vera: Pedro (67) y su esposa Ángela (58) tienen dos hijas, Ariana (24), ingeniera eléctrica, y Angelina (27), que se comprometió con Vicente (28) y por eso salió de la casa.', title: 'Caso 4' },
        'Pedro a la [[izquierda::izquierd]] y Ángela a la derecha, unidos por la línea de matrimonio',
        'Angelina y Vicente no están casados: línea de [[segmentos::segmento]]',
        { end: 'La línea punteada del hogar rodea a Pedro, Ángela y [[Ariana::ariana]]; Angelina queda afuera' }
      ]
    },

    /* ───────────── Clase 5 · Clasificación familiar ───────────── */
    {
      id: 'mf_tipos', clase: '5 Clasificación', titulo: 'La familia y sus tipos', tipo: 'tabla', sl: [[5, 4, 6]],
      resumen: 'Qué es la familia y los siete tipos de la clase.',
      fuente: 'Clase 5 · La familia, clasificación familiar y tipos de familia',
      columnas: ['Familia', 'Cómo está formada'],
      filas: [
        ['Qué es', 'Un grupo de personas unidas por el [[parentesco::parentesco]]'],
        ['Vínculos', '[[Consanguíneos::consanguin]], o constituidos y reconocidos legal y socialmente, como el matrimonio o la [[adopción::adopci]]'],
        ['Nuclear', 'Los progenitores y uno, dos o más [[hijos::hijo]]; es la familia [[tradicional::tradicional]]'],
        ['Extensa', '[[Abuelos::abuelo]], tíos, primos y otros parientes consanguíneos o afines'],
        ['Monoparental', 'Los hijos cuentan con un solo [[progenitor::progenitor]], ya sea la madre o el padre'],
        ['Homoparental', 'Parejas del mismo [[sexo::sexo]] con hijos adoptados o biológicos'],
        ['Ensamblada o reconstituida', 'Se conforma con la [[agregación de dos o más familias || agregación::agregaci]]'],
        ['Adoptiva', 'Con hijos sin parentesco [[sanguíneo::sanguin]]'],
        ['Sin hijos', 'Por [[elección::elecci]] o por problemas relacionados']
      ]
    },
    {
      id: 'mf_problemas', clase: '5 Clasificación', titulo: 'Problemas en cada tipo de familia', tipo: 'mapa', sl: [[5, 7, 11]],
      centro: 'Problemas familiares', sub: 'Lo que la clase señala en cada estructura',
      fuente: 'Clase 5 · Problemas en la familia nuclear, extensa, monoparental, homoparental y ensamblada',
      ramas: [
        { t: 'Nuclear', hojas: [
          ['Falta de apoyo externo diario para el cuidado y las tareas domésticas', 'Sobrecarga de roles', 'sobrecarga|roles'],
          ['Dependencia excesiva del núcleo cerrado, que reduce la red de apoyo', 'Aislamiento social', 'aislamiento'],
          ['El sustento económico recae en uno o dos adultos', 'Presión financiera', 'financier'],
          ['Los conflictos conyugales impactan en forma directa en los hijos', 'Crisis de pareja', 'crisis']
        ] },
        { t: 'Extensa', hojas: [
          ['Dificultad para mantener espacios o momentos de intimidad', 'Invasión de la privacidad', 'privacidad'],
          ['Desautorización entre padres y abuelos al educar', 'Conflictos de autoridad', 'autoridad'],
          ['Falta de espacio físico que genera fricciones cotidianas', 'Hacinamiento', 'hacinamiento'],
          ['Presión para atender a niños y ancianos a la vez', 'Sobrecarga del cuidador', 'cuidador']
        ] },
        { t: 'Monoparental', hojas: [
          ['Estrés crónico por asumir solo todas las responsabilidades', 'Agotamiento físico y mental', 'agotamiento'],
          ['Dependencia de un único ingreso', 'Precarización económica', 'precariz'],
          ['Falta de una segunda figura de apego y crianza', 'Ausencia de un rol', 'ausencia'],
          ['Jornadas laborales extensas frente a la atención de los hijos', 'Poco tiempo de calidad', 'calidad']
        ] },
        { t: 'Homoparental', hojas: [
          ['Prejuicio social, homofobia o acoso escolar hacia los hijos', 'Discriminación externa', 'discrimin'],
          ['Falta de reconocimiento jurídico de ambos progenitores', 'Vacíos legales', 'vacio'],
          ['Presión social sobre los hijos al explicar su estructura familiar', 'Cuestionamiento de identidad', 'cuestionamiento'],
          ['Desgaste por tener que defender su legitimidad familiar', 'Estrés de minorías', 'minoria']
        ] },
        { t: 'Ensamblada', hojas: [
          ['Celos y disputas entre hijos biológicos y políticos', 'Rivalidad entre hermanos', 'rivalidad'],
          ['El padrastro o la madrastra no logra disciplinar sin generar rechazo', 'Ambigüedad de roles', 'ambig'],
          ['Tensiones por la interferencia de las exparejas', 'Conflictos con el ex', 'conflicto'],
          ['Convivencia inmediata sin un vínculo afectivo previo', 'Llegada abrupta', 'abrupta']
        ] }
      ]
    },
    {
      id: 'mf_estrategias', clase: '5 Clasificación', titulo: 'Estrategias de resolución por tipo de familia', tipo: 'mapa', sl: [[5, 12, 17]],
      centro: 'Estrategias', sub: 'Una línea de trabajo para cada tipo de familia',
      fuente: 'Clase 5 · Estrategia de resolución de problemas familiares',
      ramas: [
        { t: 'Nuclear', hojas: [
          ['Eje: alivio de la carga y…', 'Espacio propio', 'propio'],
          ['Involucrar a amigos, vecinos o actividades extraescolares', 'Red de apoyo externa', 'red de apoyo'],
          ['Un calendario visible con las tareas repartidas en forma justa', 'Co-responsabilidad equitativa || Corresponsabilidad equitativa', 'responsabilidad'],
          ['Momentos a solas sin los hijos para proteger el vínculo conyugal', 'Tiempo exclusivo de pareja', 'exclusivo'],
          ['Pasatiempos individuales para respirar fuera del núcleo', 'Espacios de ventilación', 'ventilaci']
        ] },
        { t: 'Extensa', hojas: [
          ['Eje de la estrategia', 'Delimitación de fronteras', 'fronter'],
          ['Pactar que los padres biológicos tienen la última palabra en la crianza', 'Voto de calidad || El voto de calidad', 'voto'],
          ['Acordar desde el inicio horarios, aportes económicos y tareas', 'Reglas de convivencia claras', 'reglas'],
          ['Un espacio semanal para hablar de las fricciones antes de que escalen', 'Reuniones familiares periódicas', 'reunion'],
          ['Zonas de la casa privadas y exclusivas de cada subgrupo', 'Respetar la intimidad', 'intimidad']
        ] },
        { t: 'Monoparental', hojas: [
          ['Eje: gestión del tiempo y…', 'Autocuidado', 'autocuidado'],
          ['Enseñar autonomía a los hijos con tareas según su edad', 'Delegación progresiva', 'delegaci'],
          ['Automatizar horarios de sueño y comidas', 'Rutinas estrictas', 'rutina'],
          ['Periodos breves para el adulto, para evitar el agotamiento extremo', 'Tiempo de descompresión', 'descompresi']
        ] },
        { t: 'Homoparental', hojas: [
          ['Eje: fortalecimiento interno y…', 'Blindaje legal', 'blindaje'],
          ['Hablar con naturalidad de la diversidad familiar antes de que lo haga el entorno', 'Educación proactiva', 'proactiva'],
          ['Dejar por escrito testamentos, poderes médicos y reconocimientos de filiación', 'Asesoría legal temprana', 'asesor'],
          ['Reunirse con los directivos para asegurar protocolos contra el acoso', 'Alianza con la escuela', 'alianza']
        ] },
        { t: 'Ensamblada', hojas: [
          ['Eje: paciencia y…', 'Construcción de roles', 'construcci'],
          ['El progenitor biológico disciplina al inicio, mientras el tutor político construye afecto', 'Crianza a dos tiempos', 'dos tiempos'],
          ['No forzar a los niños a llamar "mamá" o "papá" al nuevo miembro', 'Evitar la paternidad instantánea || Evitar la "paternidad instantánea"', 'instantanea'],
          ['Comunicación con las exparejas solo logística, no emocional', 'Pactos claros con los ex', 'pacto'],
          ['Por ejemplo, un juego de mesa los viernes', 'Nuevas tradiciones familiares', 'tradicion']
        ] }
      ]
    },
    {
      id: 'mf_fg_n1', clase: '5 Clasificación', titulo: 'Familiograma N.º 1: la familia de Ma. Cruz', tipo: 'casos', sl: [[5, 19, 21]],
      figura: { src: 'img/familia/fg-aula5-n1-ma-cruz.png', w: 1918, h: 1060, alt: 'Familiograma N.º 1 de la clase 5: genograma socio dinámico de la familia de Ma. Cruz', pie: 'Clase 5 · lámina 21' },
      resumen: 'El ejercicio de la clase 5 con las tres preguntas de la profesora: tipo de familia y paciente identificado, patologías y relaciones.',
      fuente: 'Clase 5 · Ejercitarios: familiograma N.º 1',
      casos: [
        ['', '¿Cómo se llama la paciente identificada?', 'Ma. Cruz || Ma Cruz || María Cruz', 'cruz', 'Es el círculo con línea doble: 41 años, enfermera, con depresión.'],
        ['', '¿Qué tipo de familia vive en el hogar (línea punteada)?', 'c) Monoparental', 'c', 'Eusebio, el esposo, falleció (la X en el cuadrado): los hijos cuentan con un solo progenitor.',
         ['a) Nuclear', 'b) Extensa', 'c) Monoparental', 'd) Ensamblada']],
        ['', '¿De qué murió Eusebio?', 'Accidente automovilístico || De un accidente automovilístico || Un accidente automovilístico', 'accidente', 'Murió a los 33 años; la X dentro de la figura marca a la persona fallecida, con la edad al fallecer.'],
        ['', '¿Qué representa el círculo negro de 1979?', 'b) Un aborto', 'b', 'Está entre los hijos, sin nombre ni edad: el círculo relleno es el aborto.',
         ['a) Una hija fallecida', 'b) Un aborto', 'c) Un embarazo en curso', 'd) Una hija adoptada']],
        ['', 'Patologías: ¿qué tienen los integrantes del hogar?', 'a) Depresión en Ma. Cruz y Ma. Jesús, y obesidad en Ma. Jesús', 'a', 'Martín y Mar Viridiana figuran como aparentemente sanos.',
         ['a) Depresión en Ma. Cruz y Ma. Jesús, y obesidad en Ma. Jesús', 'b) Cirrosis hepática y farmacodependencia', 'c) DM, HAS y obesidad en todos', 'd) Ninguna patología']],
        ['', 'Por la línea de Eusebio, ¿qué patología se repite en tres generaciones?', 'b) Obesidad', 'b', 'Magdalena (la abuela), Rafaela, Felisa y José de Jesús (los tíos) y Ma. Jesús: "repetición de pautas a través de las generaciones", uno de los puntos de interpretación de la clase 4.',
         ['a) Cirrosis hepática', 'b) Obesidad', 'c) Farmacodependencia', 'd) Depresión']],
        ['', 'En la familia de origen de Ma. Cruz, ¿quién tiene farmacodependencia?', 'José || Jose', 'jose', 'José, de 36 años, artesano. El padre, Cruz, falleció con cirrosis hepática.'],
        ['', 'Relaciones: ¿qué muestra la línea de guiones entre Ma. Cruz y Ma. Jesús?', 'Distante || Relación distante', 'distant', 'La línea de guiones es la relación distante.']
      ]
    },
    {
      id: 'mf_fg_n2', clase: '5 Clasificación', titulo: 'Familiograma N.º 2: la familia de Carmen Mir', tipo: 'casos', sl: [[5, 22, 23]],
      figura: { src: 'img/familia/fg-aula5-n2-carmen-mir.png', w: 1800, h: 946, alt: 'Familiograma N.º 2 de la clase 5: Carmen Mir, sus padres, sus hermanos, su expareja Javier y su hijo Isaac', pie: 'Clase 5 · lámina 23' },
      resumen: 'Describí el familiograma: tipo de familia, paciente identificado y uniones. La imagen de la lámina es de baja resolución: usá Ampliar.',
      fuente: 'Clase 5 · Ejercitarios: familiograma N.º 2',
      casos: [
        ['', '¿Cómo se llama la paciente identificada?', 'Carmen Mir', 'carmen mir|mir', 'El círculo con línea doble, de 24 años, ama de casa. Su madre se llama Carmen García.'],
        ['', 'La línea punteada rodea a Luis, Carmen García, Carmen Mir, Jorge, Pilar e Isaac. ¿Qué tipo de familia es?', 'b) Extensa', 'b', 'Conviven tres generaciones: los padres, sus hijos y el nieto Isaac. La familia extensa incluye abuelos, tíos, primos y otros parientes.',
         ['a) Nuclear', 'b) Extensa', 'c) Monoparental', 'd) Sin hijos']],
        ['', 'Javier Cortés y Carmen Mir están unidos por una línea de segmentos con "c. 2010". ¿Qué indica?', 'b) Que son una pareja no casada', 'b', 'Las parejas no casadas se dibujan con línea de segmentos y la fecha en que empezaron a vivir juntos; los matrimonios llevan "m." y la fecha.',
         ['a) Que se casaron en 2010', 'b) Que son una pareja no casada', 'c) Que son hermanos', 'd) Que tienen una relación distante']],
        ['', 'Sobre esa línea hay una diagonal y "s. 2012". ¿Qué indica?', 'a) Separación', 'a', 'Una diagonal es separación; dos, divorcio.',
         ['a) Separación', 'b) Divorcio', 'c) Fallecimiento', 'd) Matrimonio']],
        ['', 'Jorge y Pilar (22 años) salen del mismo punto, sin línea que una las dos ramas. ¿Qué son?', 'Mellizos || Hijos mellizos', 'melliz', 'Si una línea horizontal uniera las dos ramas, serían gemelos.'],
        ['', '¿Qué problema figura en Isaac, de 3 años?', 'Agresividad', 'agresiv', 'Isaac es el hijo de Javier y Carmen Mir.'],
        ['', '¿En qué año se casaron Luis Mir y Carmen García?', '1988', '1988', '"m. 1988" sobre la línea de la pareja.']
      ]
    },

    /* ───────────── Clase 6 · Ciclo vital ───────────── */
    {
      id: 'mf_ciclo_individual', clase: '6 Ciclo vital', titulo: 'Ciclo vital individual: etapas y edades', tipo: 'tabla', sl: [[6, 4, 6]],
      resumen: 'Serie de cambios sucesivos del ser humano a lo largo de su desarrollo cronológico, desde la etapa neonatal hasta el adulto mayor: las once etapas.',
      fuente: 'Clase 6 · Ciclo vital individual: concepto y etapas',
      columnas: ['Etapa', 'Edad'],
      filas: [
        ['Recién nacido', 'Hasta los [[28 días::28]] de nacido'],
        ['Lactante menor', 'De los 28 días a los [[12 meses::12]]'],
        ['Lactante mayor', 'De [[12 a 24 meses || 12-24 meses::12;24]]'],
        ['Preescolar', 'De [[2 a 5 años || 2-5 años::2;5]]'],
        ['Escolar', 'De [[6 a 9 años || 6-9 años::6;9]]'],
        ['Adolescencia', 'De [[10 a 19 años || 10-19 años::10;19]]'],
        ['Adulto joven', 'De [[20 a 44 años || 20-44 años::20;44]]'],
        ['Adulto medio', 'De [[45 a 59 años || 45-59 años::45;59]]'],
        ['Adulto mayor o anciano joven', 'De [[60 a 74 años || 60-74 años::60;74]]'],
        ['Anciano', 'De [[75 a 90 años || 75-90 años::75;90]]'],
        ['Anciano longevo', 'A partir de los [[90 años::90]]']
      ]
    },
    {
      id: 'mf_teorias', clase: '6 Ciclo vital', titulo: 'Las tres teorías del desarrollo', tipo: 'mapa', sl: [[6, 5, 14]],
      centro: 'Ciclo vital individual', sub: 'Aspectos que estudia y las teorías de la clase',
      fuente: 'Clase 6 · Ciclo vital individual, teoría de Piaget, de Erikson y de Freud',
      ramas: [
        { t: 'Aspectos', hojas: [
          ['Biológicos, cognitivos, psicosociales y…', 'Psicosexuales', 'psicosexual'],
          ['Interacción con condiciones sociales, genéticas, ambientales, culturales, económicas e…', 'Históricas', 'historic']
        ] },
        { t: 'Teorías', hojas: [
          ['Teoría cognitiva', 'Piaget', 'piaget'],
          ['Etapas del desarrollo psicosocial', 'Erikson', 'erikson|erickson'],
          ['Teoría del desarrollo psicosexual', 'Freud', 'freud']
        ] },
        { t: 'Piaget', hojas: [
          ['Las estructuras cognitivas se van haciendo cada vez más…', 'Complejas', 'complej'],
          ['Número de etapas', 'Cuatro || 4', 'cuatro|4']
        ] },
        { t: 'Erikson', hojas: [
          ['Número de etapas de desarrollo psicosocial', 'Ocho || 8', 'ocho|8'],
          ['Cada etapa se caracteriza por una… emocional con dos soluciones', 'Crisis', 'crisis'],
          ['Las dos soluciones posibles: favorable o…', 'Desfavorable', 'desfavorable'],
          ['Las especialmente importantes, porque se centran en los niños pequeños', 'Las cuatro primeras || Las 4 primeras', 'primeras']
        ] },
        { t: 'Freud', hojas: [
          ['Áreas del cuerpo de mucha sensibilidad en cada etapa', 'Zonas erógenas', 'erogen'],
          ['Conflictos entre los impulsos biológicos innatos y las restricciones de la…', 'Sociedad', 'sociedad']
        ] }
      ]
    },
    {
      id: 'mf_piaget', clase: '6 Ciclo vital', titulo: 'Etapas de Piaget', tipo: 'tabla', sl: [[6, 8, 9]],
      resumen: 'Las cuatro etapas del desarrollo cognitivo, con su edad y lo que se desarrolla.',
      fuente: 'Clase 6 · Teoría del desarrollo cognitivo de Piaget',
      columnas: ['Edad', 'Etapa', 'Qué se desarrolla'],
      filas: [
        ['0 a 2 años', '[[Motora sensorial || Sensoriomotora || Sensorio motora::sensori|motora]]', 'Control motor y aprendizaje acerca de objetos [[físicos::fisic]]'],
        ['2 a 7 años', '[[Preoperacional || Pre operacional || Pre-operacional::operacional]]', 'Desarrollo de habilidades [[verbales::verbal]]'],
        ['7 a 12 años', '[[Concreta operacional || Operacional concreta::concret]]', 'Inicio del asentamiento de conceptos [[abstractos::abstract]]'],
        ['12 a 15 años', '[[Formal operacional || Operacional formal::formal]]', 'Habilidades sistemáticas y [[lógicas::logic]] del razonamiento']
      ]
    },
    {
      id: 'mf_erikson', clase: '6 Ciclo vital', titulo: 'Las 8 etapas de Erikson', tipo: 'tabla', sl: [[6, 10, 12]],
      resumen: 'Cada etapa es una crisis entre dos polos. Las edades cambian entre las láminas 11 y 12; coinciden en 40 a 60 años (generatividad) y 60 en adelante (integridad).',
      fuente: 'Clase 6 · Teoría del desarrollo psicosocial de Erik Erikson',
      columnas: ['Etapa', 'Crisis', 'Qué se pone en juego'],
      filas: [
        ['1 · Infante', '[[Confianza::confianza]] vs. [[desconfianza::desconfianza]]', 'Se crean vínculos afectivos'],
        ['2 · Bebé', '[[Autonomía::autonom]] vs. [[vergüenza y duda || vergüenza-duda || vergüenza::verguenza]]', 'Exploración del mundo y desarrollo del cuerpo'],
        ['3 · Preescolar', '[[Iniciativa::iniciativa]] vs. [[culpa::culpa]]', 'Desarrollo de la creatividad; sigue explorando el mundo'],
        ['4 · Niño', '[[Laboriosidad::laborios]] vs. [[inferioridad::inferior]]', 'Inicia la vida social con pares y se aproxima a la sociedad productiva'],
        ['5 · Adolescente', '[[Búsqueda de identidad || Búsqueda::busqueda]] vs. [[difusión de identidad || difusión::difusi]]', 'La identidad propia y cómo la ven los pares'],
        ['6 · Adulto joven', '[[Intimidad::intimidad]] vs. [[aislamiento::aislamiento]]', 'Capacidad de amar y entregarse; dificultades para relacionarse'],
        ['7 · Adulto maduro (40 a 60)', '[[Generatividad::generativ]] vs. [[estancamiento::estancamiento]]', 'Proyección a futuro; improductividad, motivación disminuida'],
        ['8 · Adulto mayor (60 en adelante)', '[[Integridad::integridad]] vs. [[desesperación::desesperaci]]', 'Acepta la vivencia, pero existe temor a la muerte']
      ]
    },
    {
      id: 'mf_freud', clase: '6 Ciclo vital', titulo: 'Etapas del desarrollo psicosexual (Freud)', tipo: 'tabla', sl: [[6, 14, 20]],
      resumen: 'La lámina 14 habla de cuatro etapas; las láminas 15 y 20 suman la latencia. Para la oral, la lámina 20 dice hasta los 18 meses.',
      fuente: 'Clase 6 · Teoría psicosexual de Freud: etapas oral, anal, fálica, de latencia y genital',
      columnas: ['Edad', 'Etapa', 'Foco'],
      filas: [
        ['Del nacimiento al primer año', '[[Oral::oral]]', 'La boca, los labios y la lengua: succión, mordida y masticación'],
        ['De 1 a 3 años', '[[Anal::anal]]', 'El control de los [[esfínteres::esfinter]] y el entrenamiento para ir al baño'],
        ['De 3 a 6 años', '[[Fálica::falic]]', 'Los genitales; se desarrollan los complejos de [[Edipo::edipo]] y Electra'],
        ['De 6 a 12 años', '[[Latencia::latencia]]', 'Impulsos sexuales inactivos; el foco está en la [[socialización::socializ]] y la educación'],
        ['Desde los 12 años (pubertad)', '[[Genital::genital]]', 'La madurez sexual y el desarrollo de relaciones [[íntimas || maduras::intima|madura]]']
      ]
    },
    {
      id: 'mf_ciclo_familiar', clase: '6 Ciclo vital', titulo: 'Ciclo vital familiar', tipo: 'fluxo', sl: [[6, 21, 27]],
      resumen: 'Concepto y las etapas que trae la clase, en orden (la presentación pasa de la etapa 4 a la 6).',
      fuente: 'Clase 6 · Ciclo vital familiar: concepto y etapas 1, 2, 3, 4, 6 y 7',
      pasos: [
        { note: 'Secuencia más o menos ordenada de sucesos [[previsibles::previsible]] durante todo el ciclo de vida familiar, con crisis también previsibles', title: 'Concepto' },
        'Etapa 1 · [[Constitución de la pareja::constituci]]: se construyen los primeros pilares del nuevo sistema familiar',
        'Etapa 2 · [[Nacimiento y crianza::crianza]]: todo gira alrededor del bebé y aparecen los nuevos roles de padres',
        'Etapa 3 · [[Escolarización::escolariz]]: los hijos se relacionan con otros y la familia recibe imágenes externas de cómo son',
        'Etapa 4 · [[Adolescencia::adolescen]]: crisis de identidad, priman las relaciones entre iguales y aparecen los actos de rebeldía',
        'Etapa 6 · [[Pareja edad madura || Pareja de edad madura::madura]]: reencuentro de la pareja, cese laboral y nuevo rol de abuelos',
        { end: 'Etapa 7 · [[Ancianidad::ancianidad]]: los cuidados los dan los hijos o nietos a los padres o abuelos' }
      ]
    },

    /* ───────────── Clase 7 · APGAR familiar y Holmes y Rahe ───────────── */
    {
      id: 'mf_apgar', clase: '7 APGAR y Holmes', titulo: 'APGAR familiar: qué es y cuándo se aplica', tipo: 'mapa', sl: [[7, 4, 8]],
      centro: 'APGAR familiar', sub: 'Concepto, utilidad e indicaciones',
      fuente: 'Clase 7 · APGAR familiar: concepto, para qué sirve, utilidad para el equipo de APS e indicaciones',
      ramas: [
        { t: 'Concepto', hojas: [
          ['Muestra cómo perciben los miembros el funcionamiento de la unidad familiar de forma…', 'Global', 'global'],
          ['Número de preguntas del cuestionario', 'Cinco || 5', 'cinco|5'],
          ['Evidencia cómo una persona percibe el funcionamiento de su familia en un momento…', 'Determinado', 'determinad']
        ] },
        { t: 'Para qué sirve', hojas: [
          ['En la práctica ambulatoria, los pacientes no suelen manifestar directamente sus problemas…', 'Familiares', 'familiar'],
          ['Para el equipo de APS: primera aproximación para identificar familias con conflictos o…', 'Disfunciones familiares || Disfunciones', 'disfunci'],
          ['Ejemplo de la clase de patología que puede deberse a una crisis familiar', 'Cefalea', 'cefalea']
        ] },
        { t: 'Cuándo se aplica', hojas: [
          ['En servicios de medicina familiar, rutinariamente en la…', 'Segunda cita', 'segunda'],
          ['Padecimientos con componente psicosocial o somatomorfo predominante', 'Pacientes polisintomáticos || Polisintomáticos', 'polisintomatic'],
          ['Acuden de manera reiterada al primer nivel de atención', 'Consultadores crónicos e hiperfrecuentadores || Hiperfrecuentadores', 'hiperfrecuent|consultador'],
          ['Hipertensión, diabetes o asma que no responden como se espera', 'Mala adherencia o falta de respuesta terapéutica || Mala adherencia', 'adherencia'],
          ['Verificar si el ambiente familiar favorece la recuperación', 'Evaluación de red de apoyo para rehabilitación || Red de apoyo', 'red de apoyo']
        ] },
        { t: 'Funcionalidad y salud', hojas: [
          ['En niños, se relacionó con la disfunción familiar', 'Obesidad', 'obesidad'],
          ['En la tercera edad, se relacionó con la alteración de la función familiar', 'Depresión', 'depresi']
        ] }
      ]
    },
    {
      id: 'mf_apgar_componentes', clase: '7 APGAR y Holmes', titulo: 'Componentes del APGAR', tipo: 'tabla', sl: [[7, 9, 11]],
      resumen: 'Las cinco letras del APGAR familiar y su definición.',
      fuente: 'Clase 7 · Componentes del APGAR familiar',
      columnas: ['Letra', 'Componente', 'Definición'],
      filas: [
        ['A', '[[Adaptación::adaptaci]]', 'Capacidad de utilizar recursos intra y extrafamiliares para resolver problemas en situaciones de estrés o crisis'],
        ['P', '[[Participación::participaci]]', 'O cooperación: implicación de los miembros en la toma de decisiones y en las responsabilidades del mantenimiento familiar'],
        ['G', '[[Gradiente de recursos::gradiente]]', 'Maduración física, emocional y autorrealización gracias al apoyo y asesoramiento mutuo'],
        ['A', '[[Afectividad::afectiv]]', 'Relación de cariño y amor entre los miembros'],
        ['R', '[[Recursos o capacidad resolutiva || Capacidad resolutiva::resolutiv]]', 'Compromiso de dedicar tiempo a las necesidades físicas y emocionales de los otros; suele implicar compartir ingresos y espacios']
      ]
    },
    {
      id: 'mf_apgar_puntaje', clase: '7 APGAR y Holmes', titulo: 'Puntaje del APGAR', tipo: 'tabla', sl: [[7, 12, 12]],
      resumen: 'Cuánto vale cada respuesta y cómo se interpreta la suma de las cinco preguntas.',
      fuente: 'Clase 7 · Cuestionario APGAR familiar e instrucciones',
      columnas: ['', 'Valor o interpretación'],
      filas: [
        ['Casi nunca', '[[0::0]] puntos'],
        ['Algunas veces', '[[1::1]] punto'],
        ['Casi siempre', '[[2::2]] puntos'],
        ['Período que se evalúa', 'Los últimos [[seis meses || 6 meses::seis|6]]'],
        ['7 a 10 puntos', 'Familia [[muy funcional::muy funcional]]'],
        ['4 a 6 puntos', 'Familia [[moderadamente disfuncional::moderad]]'],
        ['0 a 3 puntos', 'Familia con [[grave disfunción::grave]]'],
        ['Si vive solo', 'Su familia son las personas con quienes tiene relaciones emocionales muy [[estrechas::estrecha]]']
      ]
    },
    {
      id: 'mf_funcionalidad', clase: '7 APGAR y Holmes', titulo: 'Familia funcional, disfuncional y patológica', tipo: 'tabla', sl: [[7, 13, 13]],
      resumen: 'Las tres situaciones de la lámina 13, lado a lado.',
      fuente: 'Clase 7 · Familia funcional, disfuncional y patológica',
      columnas: ['', 'Funcional', 'Disfuncional', 'Patológica'],
      filas: [
        ['Sus problemas', 'Los resuelve [[sin ayuda::sin ayuda]]', 'No puede resolverlos sin ayuda: los problemas la [[desbordan::desborda]]', 'Uno o más miembros tienen [[adicciones::adicci]], trastornos de personalidad o patologías psicológicas o psiquiátricas'],
        ['Qué requiere', 'Orientación familiar [[preventiva::preventiv]], sobre todo con cursos y programas', 'Orientación familiar también por medio de la [[consulta de orientación familiar || consulta::consulta]]', '[[Atención especializada::especializad]] para los miembros con patologías y orientación familiar para los sanos'],
        ['Evolución', 'Previene futuros o mayores problemas', 'Recupera la funcionalidad [[paulatinamente::paulatin]]', 'Con atención [[interdisciplinaria::interdisciplin]] pasa de la patología a la disfuncionalidad y luego a la funcionalidad']
      ]
    },
    {
      id: 'mf_holmes', clase: '7 APGAR y Holmes', titulo: 'Escala de Holmes y Rahe: qué mide', tipo: 'mapa', sl: [[7, 14, 17]],
      centro: 'Holmes y Rahe', sub: 'Escala de reajuste social',
      fuente: 'Clase 7 · Escala de Holmes y Rahe: concepto, tabla de valores y resultado',
      ramas: [
        { t: 'Qué valora', hojas: [
          ['Los acontecimientos vitales… por los que atraviesa una persona', 'Estresantes', 'estresante'],
          ['Permite predecir la probabilidad de… en un tiempo cercano', 'Enfermar', 'enferm'],
          ['Se suman los valores de lo vivido en el último…', 'Año', 'ano']
        ] },
        { t: 'Resultado', hojas: [
          ['Mayor a 300', 'Riesgo alto || Alto', 'alto'],
          ['De 150 a 300', 'Riesgo intermedio || Intermedio', 'intermedio'],
          ['Menor a 150', 'Bajo riesgo || Bajo', 'bajo'],
          ['Con más de 300, riesgo alto de padecer eventos…', 'Cardiovasculares', 'cardiovascular']
        ] }
      ]
    },
    {
      id: 'mf_holmes_valores', clase: '7 APGAR y Holmes', titulo: 'Holmes y Rahe: valores de la tabla', tipo: 'tabla', sl: [[7, 16, 16]],
      resumen: 'Los acontecimientos de la tabla de la clase que más se usan, con su valor.',
      fuente: 'Clase 7 · Tabla de la escala Holmes-Rahe ("puntaje de estrés")',
      columnas: ['Acontecimiento', 'Valor'],
      filas: [
        ['Muerte del esposo(a) o compañero(a)', '[[100::100]]'],
        ['Divorcio', '[[73::73]]'],
        ['Separación', '[[65::65]]'],
        ['Pena de cárcel', '[[63::63]]'],
        ['Herida personal', '[[53::53]]'],
        ['Matrimonio', '[[50::50]]'],
        ['Despido del trabajo', '[[47::47]]'],
        ['Reconciliación matrimonial', '[[45::45]]'],
        ['Jubilación', '[[45::45]]'],
        ['Cambios en la salud de un miembro de la familia', '[[44::44]]'],
        ['Embarazo', '[[40::40]]'],
        ['Cambio en el estado financiero', '[[38::38]]'],
        ['Muerte de un amigo cercano', '[[37::37]]'],
        ['Hijo(a) saliendo del hogar', '[[29::29]]'],
        ['Cambio de residencia', '[[20::20]]'],
        ['Vacaciones', '[[13::13]]'],
        ['Navidad', '[[12::12]]']
      ]
    },
    {
      id: 'mf_calculos_apgar_holmes', clase: '7 APGAR y Holmes', titulo: 'Calculá: APGAR familiar y Holmes y Rahe', tipo: 'casos', sl: [[7, 12, 17]],
      resumen: 'Sumá los puntajes con las tablas de la clase e interpretá el resultado.',
      fuente: 'Clase 7 · Instrucciones del APGAR (lámina 12), tabla de Holmes y Rahe (16) y resultado (17)',
      casos: [
        ['Una paciente responde el APGAR: casi siempre, algunas veces, algunas veces, casi nunca y algunas veces.', '¿Puntaje e interpretación?', 'b) 5 puntos: moderadamente disfuncional', 'b', '2 + 1 + 1 + 0 + 1 = 5; de 4 a 6 sugiere una familia moderadamente disfuncional.',
         ['a) 3 puntos: grave disfunción', 'b) 5 puntos: moderadamente disfuncional', 'c) 7 puntos: muy funcional', 'd) 9 puntos: muy funcional']],
        ['Un paciente marca "casi siempre" en las cinco preguntas.', '¿Qué puntaje obtiene?', '10 || 10 puntos', '10', 'Casi siempre vale 2: 5 × 2 = 10, una familia muy funcional (7 a 10).'],
        ['Respuestas: casi nunca, casi nunca, algunas veces, casi nunca y algunas veces.', '¿Qué sugiere el resultado?', 'c) Grave disfunción', 'c', '0 + 0 + 1 + 0 + 1 = 2: de 0 a 3 sugiere una familia con grave disfunción.',
         ['a) Familia muy funcional', 'b) Moderadamente disfuncional', 'c) Grave disfunción']],
        ['Respuestas: casi siempre en tres preguntas, algunas veces en una y casi nunca en otra.', '¿Qué sugiere el resultado?', 'a) Familia muy funcional', 'a', '2 + 2 + 2 + 1 + 0 = 7: el límite inferior de 7 a 10.',
         ['a) Familia muy funcional', 'b) Moderadamente disfuncional', 'c) Grave disfunción']],
        ['En el último año: divorcio, despido del trabajo, vacaciones y Navidad.', '¿Puntaje y riesgo en la escala de Holmes y Rahe?', 'a) 145: bajo riesgo', 'a', '73 + 47 + 13 + 12 = 145, menor a 150.',
         ['a) 145: bajo riesgo', 'b) 145: riesgo intermedio', 'c) 245: riesgo intermedio', 'd) 345: riesgo alto']],
        ['En el último año: muerte del esposo, jubilación, cambio de residencia y Navidad.', '¿Puntaje y riesgo?', 'c) 177: riesgo intermedio', 'c', '100 + 45 + 20 + 12 = 177, entre 150 y 300.',
         ['a) 127: bajo riesgo', 'b) 157: bajo riesgo', 'c) 177: riesgo intermedio', 'd) 317: riesgo alto']],
        ['En el último año: muerte de la esposa, herida personal, despido del trabajo, jubilación, cambios en la salud de un miembro de la familia y Navidad.', '¿Puntaje y riesgo?', 'd) 301: riesgo alto', 'd', '100 + 53 + 47 + 45 + 44 + 12 = 301: mayor a 300, riesgo alto de padecer eventos cardiovasculares.',
         ['a) 201: riesgo intermedio', 'b) 251: riesgo intermedio', 'c) 300: riesgo intermedio', 'd) 301: riesgo alto']],
        ['En el último año: matrimonio, embarazo, cambio de residencia y vacaciones.', '¿Qué puntaje suma?', '123 || 123 puntos', '123', '50 + 40 + 20 + 13 = 123: bajo riesgo (menor a 150).']
      ]
    },

    /* ───────────── Clase 8 · Promoción de la salud ───────────── */
    {
      id: 'mf_promocion', clase: '8 Promoción', titulo: 'Promoción de la salud', tipo: 'mapa', sl: [[8, 4, 7]],
      centro: 'Promoción de la salud', sub: 'Definiciones, características y ejemplos',
      fuente: 'Clase 8 · Definición de la Carta de Ottawa, definición de OPS/OMS, ejemplos y características',
      ramas: [
        { t: 'Carta de Ottawa', hojas: [
          ['Año', '1986', '1986'],
          ['Dar a la gente los medios para mejorar su salud y ejercer un mayor… sobre la misma', 'Control', 'control']
        ] },
        { t: 'OPS/OMS (1990)', hojas: [
          ['Suma de acciones de población, servicios, autoridades sanitarias y otros sectores…', 'Sociales y productivos', 'social|productiv'],
          ['Para mejores condiciones de salud individual y…', 'Colectiva', 'colectiv']
        ] },
        { t: 'Características', hojas: [
          ['Se basa en una aproximación… de la salud, no estrictamente médica', 'Holística', 'holistic'],
          ['Objetivo', 'Empoderamiento de individuos y comunidades || Empoderamiento', 'empodera'],
          ['Meta: alcanzar la… y reducir las desigualdades de salud entre naciones', 'Equidad', 'equidad']
        ] },
        { t: 'Ejemplos de la clase', hojas: [
          ['Entornos, escuelas y hospitales…', 'Saludables', 'saludable'],
          ['Además de estilos de vida y ejercicios físicos: la convivencia…', 'Pacífica', 'pacific']
        ] }
      ]
    },
    {
      id: 'mf_ottawa', clase: '8 Promoción', titulo: 'Los cinco lineamientos de Ottawa', tipo: 'fluxo', sl: [[8, 8, 14]],
      resumen: 'Las cinco estrategias de la Carta de Ottawa (1986), en orden, con la idea central de cada una.',
      fuente: 'Clase 8 · Principios básicos: los cinco lineamientos de Ottawa y las estrategias 1 a 5',
      pasos: [
        '1 · Construir una política pública [[saludable::saludable]]: legislación, medidas fiscales, impuestos y cambios de organización',
        '2 · Crear [[entornos || ambientes::entorno|ambiente]] que apoyen la salud: el trabajo y el ocio como fuente de salud y la conservación de los recursos naturales',
        '3 · Fortalecer la acción [[comunitaria::comunitari]]: en el corazón del proceso está el empoderamiento de las comunidades',
        '4 · Desarrollar habilidades [[personales::personal]]: información, educación para la salud y habilidades para la vida',
        { end: '5 · Reorientar los [[servicios de salud::servicio]]: más allá de los servicios clínicos y curativos, sensibles a las necesidades culturales' }
      ]
    },
    {
      id: 'mf_prom_prev', clase: '8 Promoción', titulo: 'Prevención de la enfermedad vs. promoción de la salud', tipo: 'tabla', sl: [[8, 15, 15]],
      resumen: 'La comparación de la lámina 15, punto por punto.',
      fuente: 'Clase 8 · Prevención de la enfermedad vs. promoción de la salud',
      columnas: ['', 'Prevención de la enfermedad', 'Promoción de la salud'],
      filas: [
        ['Definición', 'Prevenir la aparición de la enfermedad y también detener su [[avance::avance]] y atenuar sus consecuencias (OMS, 1998)', 'Dar a individuos y comunidades los medios para ejercer un mayor [[control::control]] sobre su salud y sus determinantes (Ottawa, 1986)'],
        ['Población', 'Población [[enferma o en riesgo de enfermar || enferma::enferm]]', 'Población [[sana::sana]]'],
        ['A quién se dirige', 'Puede actuar en la sociedad, los grupos y los individuos, pero sobre todo en los [[individuos::individu]]', 'Con mayor énfasis en la [[población y sus grupos || población::poblaci]]; escasamente en los individuos'],
        ['Qué hace', 'Neutraliza los factores de [[riesgo::riesgo]] con estrategias de control viables y eficaces', 'Modifica [[actitudes, conductas y comportamientos || actitudes::actitud]]'],
        ['Ejemplos', 'Vacunación, preservativos para ITS y VIH, tamiz neonatal, [[Papanicolaou::papanicol]]', 'Áreas verdes, gimnasios comunitarios al aire libre, campaña [[antitabaco || anti-tabaco::tabaco]]']
      ]
    },

    /* ───────────── Clase 9 · Prevención de enfermedades ───────────── */
    {
      id: 'mf_prevencion', clase: '9 Prevención', titulo: 'Prevención de la enfermedad', tipo: 'mapa', sl: [[9, 4, 5]],
      centro: 'Prevención', sub: 'Qué es y cómo se aplica en medicina familiar',
      fuente: 'Clase 9 · Prevención de la enfermedad y prevención en medicina familiar',
      ramas: [
        { t: 'Definición', hojas: [
          ['Evita la aparición de la enfermedad mediante el control de los factores de…', 'Riesgo', 'riesgo'],
          ['…detiene su avance y reduce sus… una vez establecida', 'Consecuencias', 'consecuencia'],
          ['Sinónimo que da la clase', 'Profilaxis', 'profilaxis']
        ] },
        { t: 'En medicina familiar', hojas: [
          ['Combina promoción de la salud, protección específica y detección…', 'Oportuna', 'oportuna'],
          ['Permite revisar riesgos y sostener cambios', 'La continuidad || Continuidad', 'continuidad'],
          ['El plan considera preferencias, recursos y… de la familia', 'Barreras', 'barrera']
        ] }
      ]
    },
    {
      id: 'mf_niveles', clase: '9 Prevención', titulo: 'Niveles de prevención', tipo: 'tabla', sl: [[9, 6, 21]],
      resumen: 'Los cinco niveles: a quién se dirigen, cuándo actúan y los ejemplos de la clase.',
      fuente: 'Clase 9 · Niveles de prevención: primordial, primaria, secundaria, terciaria y cuaternaria',
      columnas: ['Nivel', 'A quién y para qué', 'Cuándo actúa', 'Ejemplos de la clase'],
      filas: [
        ['Primordial', 'Individuos sanos, no portadores de factores de riesgo, para evitar que [[adquieran factores de riesgo || los adquieran::adquier]]', 'Sobre el [[entorno::entorno]]: salud desde la raíz', 'Agua segura y saneamiento, escuelas libres de humo, etiquetado de alimentos, impuestos al azúcar, ciclovías'],
        ['Primaria', 'Individuos sanos, para evitar la [[aparición::aparici]] de un trastorno o enfermedad', '[[Antes de enfermar::antes]]; es el nivel más eficaz', 'Vacunas según el calendario, actividad física, apoyo para dejar el tabaco, educación sexual, cinturón de seguridad'],
        ['Secundaria', 'Identificar y tratar a personas [[asintomáticas::asintomat]] que ya desarrollaron una enfermedad', '[[Detección temprana::deteccion]]: sin síntomas no significa sin riesgos', 'Mamografía, presión arterial en personas con factores de riesgo, glucosa o colesterol'],
        ['Terciaria', 'Parte del [[tratamiento::tratamiento]] de las personas con enfermedad', 'Después del diagnóstico: evitar complicaciones, frenar la progresión y mejorar la calidad de vida', 'Fisioterapia tras un ACV o una fractura, control del pie diabético, grupos de ayuda'],
        ['Cuaternaria', 'Evitar los riesgos y la [[iatrogenia::iatrogen]] del uso innecesario de las intervenciones sanitarias', 'Atención proporcionada: [[primum non nocere || primero, no hacer daño || primero no hacer daño::nocere|no hacer dano]]', 'Evitar sobretratamiento y cascadas médicas; reducir la polifarmacia en ancianos']
      ]
    },
    {
      id: 'mf_niveles_casos', clase: '9 Prevención', titulo: '¿Qué nivel de prevención es?', tipo: 'casos', sl: [[9, 6, 21]],
      resumen: 'Cada ejemplo sale de las láminas de la clase: elegí el nivel.',
      fuente: 'Clase 9 · Ejemplos de cada nivel de prevención (láminas 8 a 21)',
      casos: [
        ['La municipalidad construye ciclovías seguras y espacios peatonales en el barrio.', '¿Qué nivel de prevención es?', 'a) Primordial', 'a', 'Diseño urbano activo: actúa sobre el entorno, antes de que aparezcan los factores de riesgo.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Campaña de vacunación según el calendario vigente.', '¿Qué nivel de prevención es?', 'b) Primaria', 'b', 'Actúa antes de enfermar: reduce la exposición y fortalece la protección del organismo.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Mamografía a una mujer de riesgo que no tiene síntomas.', '¿Qué nivel de prevención es?', 'c) Secundaria', 'c', 'Detección temprana de enfermedades asintomáticas, para un tratamiento oportuno.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Fisioterapia para recuperar la movilidad después de un ACV.', '¿Qué nivel de prevención es?', 'd) Terciaria', 'd', 'Actúa cuando la enfermedad ya está presente: rehabilitación para reducir secuelas y mejorar la calidad de vida.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['El médico revisa la medicación de una anciana polimedicada y deja solo lo esencial.', '¿Qué nivel de prevención es?', 'e) Cuaternaria', 'e', 'Uso racional de medicamentos y desprescripción: proteger al paciente de los excesos de la propia medicina.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Ley de etiquetado de alimentos e impuestos al azúcar.', '¿Qué nivel de prevención es?', 'a) Primordial', 'a', 'Políticas públicas saludables: salud desde la raíz.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Uso del cinturón de seguridad.', '¿Qué nivel de prevención es?', 'b) Primaria', 'b', 'Protección de riesgos en personas sanas, como los equipos de seguridad.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Análisis de glucosa y colesterol para detectar diabetes e hiperlipidemia.', '¿Qué nivel de prevención es?', 'c) Secundaria', 'c', 'Pruebas de tamizaje poblacional: detectar la enfermedad antes de que dé síntomas.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Educación y control de un paciente diabético para prevenir el pie diabético.', '¿Qué nivel de prevención es?', 'd) Terciaria', 'd', 'Control de complicaciones de una enfermedad crónica ya diagnosticada.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Evitar un estudio innecesario que puede dar un falso positivo y llevar a una biopsia invasiva.', '¿Qué nivel de prevención es?', 'e) Cuaternaria', 'e', 'Evitar sobrediagnóstico y cascadas médicas: primum non nocere.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Escuelas y lugares de trabajo libres de humo.', '¿Qué nivel de prevención es?', 'a) Primordial', 'a', 'Prevención primordial sobre el entorno; el apoyo para dejar el tabaco, en cambio, es primaria.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']],
        ['Grupos de ayuda y apoyo psicológico para sostener la adherencia al tratamiento.', '¿Qué nivel de prevención es?', 'd) Terciaria', 'd', 'Apoyo integral al paciente que ya está enfermo: no se trata solo de curar, sino de cuidar.',
         ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria', 'e) Cuaternaria']]
      ]
    },

    /* ───────────── Clase 10 · Salud del niño ───────────── */
    {
      id: 'mf_nino_sano', clase: '10 Niño sano', titulo: 'Control del niño sano', tipo: 'mapa', sl: [[10, 4, 6]],
      centro: 'Control del niño sano', sub: 'Qué incluye y qué se evalúa en cada consulta',
      fuente: 'Clase 10 · Control de niño sano, actividades de la consulta y qué se evalúa',
      ramas: [
        { t: 'Qué es', hojas: [
          ['Prevención, detección y tratamiento… de enfermedades', 'Oportuno', 'oportun'],
          ['Además, acompañamiento y… al niño y a su familia', 'Educación', 'educaci'],
          ['Con el fin de lograr un adecuado desarrollo y…', 'Crecimiento', 'crecimiento']
        ] },
        { t: 'Prevención', hojas: [
          ['Las del programa nacional', 'Inmunizaciones', 'inmuniz'],
          ['Educación en salud y hábitos de vida…', 'Saludable', 'saludable']
        ] },
        { t: 'Detección y guía', hojas: [
          ['Para detectar y tratar a tiempo: la anamnesis y el…', 'Examen físico', 'examen'],
          ['Cuidados por edad, estimulación del desarrollo, prevención de accidentes', 'Guía anticipatoria', 'anticipatori']
        ] },
        { t: 'Qué se evalúa', hojas: [
          ['Peso, talla, PC e IMC; P/E, T/E, P/T e IMC/E', 'Somatometría', 'somatometr'],
          ['Además de la alimentación, los hábitos y la actividad física: el…', 'Neurodesarrollo', 'neurodesarrollo'],
          ['…y el esquema de…', 'Vacunación', 'vacunaci']
        ] }
      ]
    },
    {
      id: 'mf_controles', clase: '10 Niño sano', titulo: '¿Cada cuánto va al control?', tipo: 'tabla', sl: [[10, 7, 7]],
      resumen: 'La pauta ideal de controles según la edad.',
      fuente: 'Clase 10 · ¿Con qué frecuencia se debe asistir a los controles de niño sano?',
      columnas: ['Edad', 'Frecuencia de los controles'],
      filas: [
        ['Recién nacido a 6 meses', 'Antes de los [[15 días::15]], al mes de vida y luego [[mensualmente::mensual]]'],
        ['6 a 12 meses', 'Cada [[2 meses || dos meses::2|dos]]'],
        ['12 a 24 meses', 'Cada [[3 meses || tres meses::3|tres]]'],
        ['2 a 6 años', 'Cada [[6 meses || seis meses::6|seis]]'],
        ['6 a 18 años', 'Control [[anual::anual]]']
      ]
    },
    {
      id: 'mf_crecimiento', clase: '10 Niño sano', titulo: 'Crecimiento y desarrollo', tipo: 'tabla', sl: [[10, 8, 10]],
      resumen: 'Cambios somáticos y funcionales, comunes a todos los seres vivos desde la concepción hasta la adultez.',
      fuente: 'Clase 10 · Crecimiento y desarrollo',
      columnas: ['', 'Crecimiento', 'Desarrollo'],
      filas: [
        ['Cambios', '[[Somáticos::somatic]]', '[[Funcionales::funcional]]'],
        ['Tipo de cambio', '[[Cuantitativo::cuantitativ]]: en peso y en talla', '[[Cualitativo::cualitativ]]: evolución del sistema nervioso'],
        ['Qué es', 'Aumento de [[tamaño::tamano]] corporal', 'Adquisición de [[funciones o capacidades || funciones::funcion]]'],
        ['Cómo se ve', 'Determinado por factores genéticos, nutricionales y ambientales; se usan las tablas de la [[NCHS::nchs]]', 'Lenguaje, motricidad fina y gruesa y aspecto [[socioemocional::socioemocional]]']
      ]
    },
    {
      id: 'mf_crec_factores', clase: '10 Niño sano', titulo: 'Qué regula el crecimiento y cómo se valora', tipo: 'mapa', sl: [[10, 11, 19]],
      centro: 'Crecimiento', sub: 'Factores que lo regulan y valoración',
      fuente: 'Clase 10 · Factores que regulan el crecimiento y el desarrollo, valoración del crecimiento y medidas antropométricas',
      ramas: [
        { t: 'Factores que regulan', hojas: [
          ['Herencia: cromosomas y poblaciones étnicas', 'Genéticos', 'genetic'],
          ['Hormonas: GH y T3/T4', 'Neuroendócrinos || Neuroendocrinos', 'neuroendocrin'],
          ['Aporte adecuado de alimentos', 'Nutricionales', 'nutricional'],
          ['Acceso a la salud y a la educación', 'Socioeconómicos', 'socioeconomic'],
          ['Apego seguro, estimulación temprana, evitar el estrés grave', 'Emocionales || Afectivos', 'emocional|afectiv']
        ] },
        { t: 'Valoración del crecimiento', hojas: [
          ['El elemento diagnóstico más simple', 'Antropometría || La antropometría', 'antropometr'],
          ['Además de la antropometría: la maduración ósea y la maduración…', 'Sexual', 'sexual']
        ] },
        { t: 'Medidas antropométricas', hojas: [
          ['Además de peso y talla: el perímetro…', 'Cefálico', 'cefalic'],
          ['La relación entre las dos primeras', 'P/T || Peso/talla', 'p/t|peso'],
          ['Pliegue cutáneo o…', 'Tricipital', 'tricipital'],
          ['El otro pliegue', 'Braquial || Pliegue braquial', 'braquial']
        ] }
      ]
    },
    {
      id: 'mf_riesgo_nino', clase: '10 Niño sano', titulo: 'Factores de riesgo para el niño', tipo: 'mapa', sl: [[10, 12, 16]],
      centro: 'Factores de riesgo', sub: 'Para el crecimiento y el desarrollo del niño',
      fuente: 'Clase 10 · Factores de riesgo en la comunidad, en la familia, de la madre y del niño',
      ramas: [
        { t: 'En la comunidad', hojas: [
          ['Barrios peligrosos que impiden jugar al aire libre', 'Inseguridad y violencia social', 'inseguridad'],
          ['Sin centros de salud cercanos, escuelas de calidad o agua potable', 'Acceso limitado a servicios básicos', 'acceso'],
          ['Exposición a basura y aguas residuales: más infecciones recurrentes', 'Contaminación y falta de saneamiento', 'contamina']
        ] },
        { t: 'En la familia', hojas: [
          ['Abuso físico, psicológico o negligencia: estrés tóxico', 'Violencia intrafamiliar y maltrato', 'violencia|maltrato'],
          ['Limita alimentos, vivienda digna y materiales de estimulación', 'Pobreza y escasez de recursos', 'pobreza'],
          ['Divorcios conflictivos, abandono o falta de estructura de apoyo', 'Disfunción familiar', 'disfunci']
        ] },
        { t: 'De la madre', hojas: [
          ['Dificulta el apego seguro (por ejemplo, la depresión posparto)', 'Problemas de salud mental', 'salud mental'],
          ['Tabaco, alcohol o drogas en el embarazo o la crianza', 'Consumo de sustancias', 'sustancia'],
          ['Desconocer las pautas de crianza y las señales de alarma', 'Bajo nivel educativo o falta de conocimientos', 'educativo|conocimiento']
        ] },
        { t: 'Del niño', hojas: [
          ['Nacer antes de tiempo o con poco peso', 'Prematuridad y bajo peso al nacer', 'prematur'],
          ['Desnutrición, obesidad y anemia', 'Malnutrición y deficiencias cronificadas || Malnutrición', 'malnutrici'],
          ['Infecciones respiratorias o gastrointestinales repetidas', 'Enfermedades crónicas o recurrentes', 'recurrente|cronica'],
          ['Demasiadas pantallas y poca interacción verbal y juego', 'Falta de estimulación temprana', 'estimulaci']
        ] }
      ]
    },
    {
      id: 'mf_peso', clase: '10 Niño sano', titulo: 'Ganancia de peso esperada', tipo: 'tabla', sl: [[10, 21, 21]],
      resumen: 'Peso al nacer y lo que gana el niño por trimestre y por año.',
      fuente: 'Clase 10 · Peso',
      columnas: ['Período', 'Peso'],
      filas: [
        ['Al nacer', '[[2500 || 2.500::2500|2.500]] a [[3800 || 3.800::3800|3.800]] gramos'],
        ['1.er trimestre', '25 a 30 g por día: unos [[800::800]] g por mes'],
        ['2.º trimestre', '20 g por día: unos [[600::600]] g por mes'],
        ['3.er trimestre', '10 a 15 g por día: unos [[400::400]] g por mes'],
        ['4.º trimestre', '10 g por día: unos [[300::300]] g por mes'],
        ['Al año', '[[9500 || 9.500::9500|9.500]] a [[10250 || 10.250::10250|10.250]] gramos'],
        ['Del 1.er al 2.º año', '[[2500 || 2.500::2500|2.500]] a [[3500 || 3.500::3500|3.500]] g por año'],
        ['Del 2.º al 5.º año', '[[2::2]] kg por año']
      ]
    },
    {
      id: 'mf_talla', clase: '10 Niño sano', titulo: 'Ganancia de talla esperada', tipo: 'tabla', sl: [[10, 22, 22]],
      resumen: 'Talla al nacer y lo que crece el niño por mes y por año.',
      fuente: 'Clase 10 · Talla',
      columnas: ['Período', 'Talla'],
      filas: [
        ['Al nacer', '[[48::48]] a [[52::52]] cm'],
        ['1.er mes', '[[4::4]] cm en el mes'],
        ['2.º mes', '[[3::3]] cm en el mes'],
        ['Del 3.º al 7.º mes', '[[2::2]] cm por mes'],
        ['Del 8.º al 12.º mes', '[[1::1]] cm por mes'],
        ['Al año', '[[70::70]] a [[75::75]] cm'],
        ['A los 2 años', '[[82::82]] cm'],
        ['Del 2.º al 5.º año', '[[10::10]] cm por año'],
        ['Edad escolar', '[[5::5]] a [[7::7]] cm por año']
      ]
    },
    {
      id: 'mf_nino_casos', clase: '10 Niño sano', titulo: 'Calculá: controles, peso y talla', tipo: 'casos', sl: [[10, 7, 22]],
      resumen: 'Pautas de control y cuentas de crecimiento con las tablas de la clase.',
      fuente: 'Clase 10 · Frecuencia de controles (lámina 7), peso (21) y talla (22)',
      casos: [
        ['Lactante sano de 8 meses.', '¿Cada cuánto va al control de niño sano?', 'b) Cada 2 meses', 'b', 'De 6 a 12 meses, control cada 2 meses.',
         ['a) Mensualmente', 'b) Cada 2 meses', 'c) Cada 3 meses', 'd) Cada 6 meses']],
        ['Niña sana de 4 años.', '¿Cada cuánto va al control?', 'd) Cada 6 meses', 'd', 'De 2 a 6 años, control cada 6 meses.',
         ['a) Mensualmente', 'b) Cada 2 meses', 'c) Cada 3 meses', 'd) Cada 6 meses']],
        ['Recién nacido sano.', '¿Cuándo es su primer control?', 'a) Antes de los 15 días', 'a', 'Luego al mes de vida y después mensualmente hasta los 6 meses.',
         ['a) Antes de los 15 días', 'b) Al mes de vida', 'c) A los 2 meses', 'd) A los 6 meses']],
        ['Niño sano de 18 meses.', '¿Cada cuánto va al control?', 'c) Cada 3 meses', 'c', 'De 12 a 24 meses, control cada 3 meses.',
         ['a) Mensualmente', 'b) Cada 2 meses', 'c) Cada 3 meses', 'd) Anual']],
        ['Bebé que nació con 3200 g.', '¿Cuánto debería ganar por mes en el primer trimestre?', '800 || 800 g || 800 g por mes', '800', '25 a 30 g por día en el primer trimestre: unos 800 g por mes.'],
        ['Bebé que nació con 50 cm.', 'Sumando lo que crece mes a mes, ¿cuánto debería medir al año?', '72 cm || 72', '72', '4 + 3 + (5 × 2) + (5 × 1) = 22 cm: 50 + 22 = 72 cm, dentro de los 70 a 75 cm esperados al año.'],
        ['Niño de 2 años que mide 82 cm.', '¿Cuánto mediría a los 5 años si crece lo esperado?', '112 cm || 112', '112', 'Del 2.º al 5.º año crece 10 cm por año: 82 + 30 = 112 cm.'],
        ['Niño de 2 años que pesa 12 kg.', '¿Cuánto pesaría a los 5 años si gana lo esperado?', '18 kg || 18', '18', 'Del 2.º al 5.º año gana 2 kg por año: 12 + 6 = 18 kg.']
      ]
    },

    /* ───────────── Simulado ───────────── */
    {
      id: 'simulado_mf', clase: 'Todas las clases', titulo: 'Simulado de prueba: Medicina de la Familia', tipo: 'casos', cronometro: true, sl: [[1], [2], [4], [5], [6], [7], [8], [9], [10]],
      resumen: 'Preguntas de opción múltiple de todas las clases. Usá el cronómetro y corregí al final.',
      fuente: 'Contenido de las clases 1, 2 y 4 a 10 (Dra. Noguera)',
      casos: [
        ['', 'Según la OMS, la salud es:', 'c) Un estado de completo bienestar físico, mental y social, y no solamente la ausencia de afecciones o enfermedades', 'c', 'No cuenta solo el estado físico: también los aspectos psicológicos y el entorno.',
          ['a) La ausencia de enfermedades', 'b) El buen estado físico y fisiológico', 'c) Un estado de completo bienestar físico, mental y social, y no solamente la ausencia de afecciones o enfermedades', 'd) La capacidad de trabajar']],
        ['', 'La edad y la genética son determinantes de la salud:', 'a) Biológicos', 'a', 'Los otros son ambientales, estilo de vida y salud pública.',
          ['a) Biológicos', 'b) Ambientales', 'c) Del estilo de vida', 'd) De la salud pública']],
        ['', 'La medicina familiar surgió en:', 'b) La década de los 50, en México, Reino Unido y Canadá', 'b', 'Su objetivo es resolver los problemas que impactan la salud familiar.',
          ['a) La década de los 30, en Estados Unidos', 'b) La década de los 50, en México, Reino Unido y Canadá', 'c) La década de los 80, en Cuba', 'd) La década de los 70, en Paraguay']],
        ['', 'El médico de familia resuelve en Atención Primaria:', 'd) Más del 80% de la consulta', 'd', 'Incluye mantenimiento de la salud, patologías en etapa inicial, crónicas y problemas del comportamiento.',
          ['a) El 20% de la consulta', 'b) La mitad de la consulta', 'c) Solo las urgencias', 'd) Más del 80% de la consulta']],
        ['', 'No es uno de los 4 pilares de la Medicina Familiar:', 'c) Hospitalaria', 'c', 'Los pilares son integral, continua, comunitaria y preventiva.',
          ['a) Integral', 'b) Continua', 'c) Hospitalaria', 'd) Preventiva']],
        ['', 'A diferencia de las especialidades lineales, la medicina familiar es:', 'a) Horizontal, y comparte cerca del 70% de los contenidos de cada especialidad', 'a', 'Además comprende los espacios entre las especialidades.',
          ['a) Horizontal, y comparte cerca del 70% de los contenidos de cada especialidad', 'b) Lineal, centrada en un sistema orgánico', 'c) Vertical, centrada en la familia', 'd) Horizontal, y comparte el 10% de los contenidos']],
        ['', 'Para mejorar el cumplimiento de las prácticas preventivas, la estrategia más efectiva es:', 'b) La pesquisa de casos', 'b', 'El médico inicia la intervención aunque el paciente consulte por otra razón.',
          ['a) El tamizaje o cribado', 'b) La pesquisa de casos', 'c) La derivación al especialista', 'd) La internación']],
        ['', 'Por definición, la medicina familiar es la especialidad médica:', 'c) Efectora de la APS', 'c', 'Su unidad funcional es la familia, no el individuo.',
          ['a) Hospitalaria', 'b) Lineal de la APS', 'c) Efectora de la APS', 'd) Quirúrgica']],
        ['', 'En el familiograma, el paciente identificado se señala con:', 'a) Una línea doble o una flecha', 'a', 'El hombre es un cuadrado y la mujer un círculo.',
          ['a) Una línea doble o una flecha', 'b) Una X dentro de la figura', 'c) Un triángulo', 'd) Una línea punteada']],
        ['', 'Dos diagonales sobre la línea de una pareja indican:', 'b) Divorcio', 'b', 'Una diagonal es separación.',
          ['a) Separación', 'b) Divorcio', 'c) Matrimonio', 'd) Pareja no casada']],
        ['', 'Una pareja no casada se dibuja con:', 'd) Una línea de segmentos', 'd', 'La fecha que se anota es cuando se conocieron o empezaron a vivir juntos.',
          ['a) Una línea doble', 'b) Una línea en zigzag', 'c) Dos diagonales', 'd) Una línea de segmentos']],
        ['', 'La línea en zigzag entre dos miembros representa una relación:', 'c) Conflictiva', 'c', 'Tres líneas paralelas: muy estrecha; línea de guiones: distante.',
          ['a) Muy estrecha', 'b) Distante', 'c) Conflictiva', 'd) Cercana']],
        ['', 'La familia que se conforma con la agregación de dos o más familias es la:', 'a) Ensamblada o reconstituida', 'a', 'Problemas típicos: rivalidad entre hermanos, ambigüedad de roles, conflictos con el ex y llegada abrupta.',
          ['a) Ensamblada o reconstituida', 'b) Extensa', 'c) Nuclear', 'd) Adoptiva']],
        ['', '"Dependencia de un único ingreso" es un problema típico de la familia:', 'b) Monoparental', 'b', 'Es la precarización económica.',
          ['a) Nuclear', 'b) Monoparental', 'c) Extensa', 'd) Homoparental']],
        ['', 'El "voto de calidad" de los padres biológicos es una estrategia para la familia:', 'c) Extensa', 'c', 'Su eje es la delimitación de fronteras.',
          ['a) Nuclear', 'b) Monoparental', 'c) Extensa', 'd) Ensamblada']],
        ['', 'Según Piaget, la etapa de 2 a 7 años es la:', 'b) Preoperacional', 'b', 'Desarrollo de habilidades verbales.',
          ['a) Motora sensorial', 'b) Preoperacional', 'c) Concreta operacional', 'd) Formal operacional']],
        ['', 'La quinta etapa de Erikson, la del adolescente, es:', 'd) Búsqueda de identidad vs. difusión de identidad', 'd', 'Cada etapa es una crisis con una solución favorable o desfavorable.',
          ['a) Intimidad vs. aislamiento', 'b) Laboriosidad vs. inferioridad', 'c) Iniciativa vs. culpa', 'd) Búsqueda de identidad vs. difusión de identidad']],
        ['', 'En la teoría de Freud, el control de esfínteres corresponde a la etapa:', 'a) Anal', 'a', 'Aproximadamente de 1 a 3 años.',
          ['a) Anal', 'b) Oral', 'c) Fálica', 'd) Genital']],
        ['', 'La etapa del ciclo vital familiar en que todo gira alrededor del bebé y aparecen los nuevos roles de padres es:', 'c) Nacimiento y crianza', 'c', 'Es la etapa 2; la 1 es la constitución de la pareja.',
          ['a) Constitución de la pareja', 'b) Escolarización', 'c) Nacimiento y crianza', 'd) Adolescencia']],
        ['', 'Un APGAR familiar de 7 a 10 puntos sugiere una familia:', 'a) Muy funcional', 'a', 'De 4 a 6, moderadamente disfuncional; de 0 a 3, grave disfunción.',
          ['a) Muy funcional', 'b) Moderadamente disfuncional', 'c) Con grave disfunción', 'd) Patológica']],
        ['', 'En los servicios de medicina familiar, el APGAR se aplica rutinariamente:', 'b) En la segunda cita', 'b', 'Para tener un panorama completo del paciente.',
          ['a) Solo en las urgencias', 'b) En la segunda cita', 'c) Una vez por año', 'd) Solo si el paciente lo pide']],
        ['', 'La "G" del APGAR familiar es:', 'd) Gradiente de recursos', 'd', 'Maduración física, emocional y autorrealización gracias al apoyo mutuo.',
          ['a) Grado de afecto', 'b) Gestión del tiempo', 'c) Género', 'd) Gradiente de recursos']],
        ['', 'En la escala de Holmes y Rahe, más de 300 puntos indica:', 'c) Riesgo alto de padecer eventos cardiovasculares', 'c', 'De 150 a 300, riesgo intermedio; menos de 150, bajo riesgo.',
          ['a) Bajo riesgo', 'b) Riesgo intermedio', 'c) Riesgo alto de padecer eventos cardiovasculares', 'd) Familia patológica']],
        ['', 'El acontecimiento con mayor valor en la escala de Holmes y Rahe es:', 'a) La muerte del esposo(a) o compañero(a)', 'a', 'Vale 100; el divorcio, 73.',
          ['a) La muerte del esposo(a) o compañero(a)', 'b) El divorcio', 'c) La pena de cárcel', 'd) El despido del trabajo']],
        ['', 'La primera estrategia de la Carta de Ottawa (1986) es:', 'b) Construir una política pública saludable', 'b', 'Luego: entornos que apoyen la salud, acción comunitaria, habilidades personales y reorientar los servicios.',
          ['a) Reorientar los servicios de salud', 'b) Construir una política pública saludable', 'c) Desarrollar habilidades personales', 'd) Fortalecer la acción comunitaria']],
        ['', 'La promoción de la salud trabaja con:', 'a) Población sana, con énfasis en la población y sus grupos', 'a', 'La prevención trabaja con población enferma o en riesgo, sobre todo con individuos.',
          ['a) Población sana, con énfasis en la población y sus grupos', 'b) Población enferma, sobre todo con individuos', 'c) Solo pacientes hospitalizados', 'd) Solo con el equipo de salud']],
        ['', 'El nivel de prevención más eficaz, porque evita que el problema llegue a desarrollarse, es la prevención:', 'b) Primaria', 'b', 'Actúa antes de enfermar.',
          ['a) Primordial', 'b) Primaria', 'c) Secundaria', 'd) Terciaria']],
        ['', 'La prevención que se rige por "primum non nocere" es la:', 'd) Cuaternaria', 'd', 'Protege al paciente de la sobremedicalización, el sobrediagnóstico y el sobretratamiento.',
          ['a) Primaria', 'b) Secundaria', 'c) Terciaria', 'd) Cuaternaria']],
        ['', 'Un niño de 6 a 12 meses va al control de niño sano:', 'c) Cada 2 meses', 'c', 'De 12 a 24 meses, cada 3; de 2 a 6 años, cada 6; de 6 a 18, anual.',
          ['a) Mensualmente', 'b) Cada 6 meses', 'c) Cada 2 meses', 'd) Anualmente']],
        ['', 'El peso normal al nacer, según la clase, es:', 'a) 2500 a 3800 g', 'a', 'Al año: 9500 a 10 250 g.',
          ['a) 2500 a 3800 g', 'b) 1500 a 2500 g', 'c) 4000 a 4500 g', 'd) 3800 a 5000 g']],
        ['', 'La talla esperada al año es:', 'b) 70 a 75 cm', 'b', 'Al nacer, 48 a 52 cm; a los 2 años, 82 cm.',
          ['a) 60 a 65 cm', 'b) 70 a 75 cm', 'c) 82 cm', 'd) 90 cm']],
        ['', 'El crecimiento es un cambio:', 'c) Cuantitativo, en peso y en talla', 'c', 'El desarrollo es cualitativo: la adquisición de funciones.',
          ['a) Cualitativo, del sistema nervioso', 'b) Solo emocional', 'c) Cuantitativo, en peso y en talla', 'd) Solo de la motricidad fina']]
      ]
    }
  ]
};
