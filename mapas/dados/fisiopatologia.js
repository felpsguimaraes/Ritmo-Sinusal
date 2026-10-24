/* Sinus · Mapas guiados · Fisiopatología I (5º semestre, UCP) · Dr. Kevin Feijó
   Unidades 0 a 7 (P1: introducción, signos y síntomas, inflamación, conceptos y generalidades, hemorragias, edema,
   regeneración/reparación, shock) y Unidad 7 de la P2 (anemias), con los dos casos clínicos de anemia.
   sl = [unidad, página inicial, página final] del PDF. Las unidades 0, 1, 2, 3, 5, 6 y Anemias (PDF de más de 10 MB)
   se leyeron como texto del Drive, sin números de página: ahí sl = [unidad] y la tarjeta dice "orden de la clase".
   Unidad 4 (escaneada) se leyó por OCR página a página; Shock, con las páginas del PDF.
   Anemias usa el número 8 solo para separarla del Shock (las dos son "Unidad 7" en el Drive).
   Todo fue conferido con el texto de las diapositivas; lo que la clase no dice, no está acá.
   Respuestas: escribir el término completo. "A || B" = las dos valen. */
window.SINUS_MAPAS = window.SINUS_MAPAS || {};
(function () {
  /* flechas de la tabla hemodinámica: se acepta la palabra o la flecha */
  var UPf = '[[Alta || Elevada || Aumentada || ↑::alt|elev|aument|↑!baj|dismin|↓]]';
  var DNf = '[[Baja || Disminuida || Reducida || ↓::baj|dismin|reduc|↓!alt|elev|aument|↑]]';
  var UPm = '[[Alto || Elevado || Aumentado || ↑::alt|elev|aument|↑!baj|dismin|↓]]';
  var DNm = '[[Bajo || Disminuido || Reducido || ↓::baj|dismin|reduc|↓!alt|elev|aument|↑]]';

  window.SINUS_MAPAS.fisiopatologia = {
    nome: 'Fisiopatología I',
    docente: 'Dr. Kevin Feijó',
    fonte: 'Unidades 0 a 7 y Anemias · UCP Ciudad del Este',
    clases: {
      0: ['Unidad 0 · Introducción', 'U0'],
      1: ['Unidad 1 · Signos y síntomas', 'U1'],
      2: ['Unidad 2 · Inflamación', 'U2'],
      3: ['Unidad 3 · Conceptos y generalidades', 'U3'],
      4: ['Unidad 4 · Hemorragias', 'U4'],
      5: ['Unidad 5 · Edema', 'U5'],
      6: ['Unidad 6 · Regeneración, reparación y cicatrización', 'U6'],
      7: ['Unidad 7 · Shock', 'U7 Shock'],
      8: ['Unidad 7 · Anemias', 'U7 Anemias']
    },
    modulos: [

      /* ───────────── UNIDAD 0 · Historia ───────────── */
      {
        id: 'fisio_historia', clase: 'Unidad 0', titulo: 'Historia de la fisiopatología', tipo: 'fluxo', sl: [[0]],
        resumen: 'De Hipócrates a la oveja Dolly, en orden cronológico.',
        fuente: 'Unidad 0 · Historia de la fisiopatología (antigüedad, Alejandría, Galeno, Renacimiento, siglos XIX a XXI)',
        pasos: [
          '[[Hipócrates::hipocrat]] (460–370 a. C.): teoría de los cuatro [[humores::humor]]; la enfermedad como "dyscrasia" (mala mezcla)',
          'Escuela de [[Alejandría::alejandr]] (siglo III a. C.): Herófilo y Erasístrato fundan la primera universidad de la historia',
          'Sorano de Éfeso (100 d. C.): distingue las enfermedades [[agudas y crónicas || crónicas y agudas::agud;cronic]]',
          '[[Galeno::galeno]] de Pérgamo (129–199 d. C.): demuestra que las arterias transportan [[sangre::sangre]] y no aire',
          'Renacimiento: [[Vesalio || Andreas Vesalius || Vesalius::vesali]] publica "De Humani Corporis Fabrica" (1543)',
          '[[William Harvey || Harvey::harvey]] describe la circulación sanguínea (1628)',
          'Siglo XIX: [[Rudolf Virchow || Virchow::virchow]] funda la patología celular (1858)',
          '[[Claude Bernard || Bernard::bernard]]: el "milieu intérieur", precursor de la homeostasis',
          '[[Pasteur::pasteur]] y [[Koch::koch]]: teoría microbiana de las enfermedades infecciosas',
          'Siglo XX: [[Walter Cannon || Cannon::cannon]] acuña el término homeostasis (1929)',
          '[[Watson y Crick::watson;crick]] describen el ADN (1953)',
          { end: 'Oveja [[Dolly::dolly]] (1996): primer mamífero clonado a partir de una célula somática adulta' }
        ]
      },
      {
        id: 'fisio_quien', clase: 'Unidad 0', titulo: 'Quién hizo qué', tipo: 'mapa', sl: [[0]],
        centro: 'Fisiopatología', sub: 'Une la fisiología y la patología',
        fuente: 'Unidad 0 · Definición e historia de la fisiopatología',
        ramas: [
          { t: 'Concepto', hojas: [
            ['Estudio de los cambios funcionales y bioquímicos debidos a las enfermedades', 'Fisiopatología', 'fisiopatolog'],
            ['Estudio del funcionamiento normal', 'Fisiología', 'fisiolog!fisiopat'],
            ['Estudio de las enfermedades', 'Patología', 'patolog!fisiopat']
          ] },
          { t: 'Antigüedad', hojas: [
            ['Padre de la medicina occidental', 'Hipócrates', 'hipocrat'],
            ['Médico de los gladiadores y de Marco Aurelio', 'Galeno || Galeno de Pérgamo', 'galeno'],
            ['Galeno demostró que el riñón es un órgano…', 'Excretor de orina || Excretor', 'excretor'],
            ['Su obra se consideró infalible durante…', 'Quince siglos || 15 siglos || 1500 años || 1.500 años', 'siglo|1500|1.500']
          ] },
          { t: 'Renacimiento', hojas: [
            ['Padre de la anatomía moderna', 'Vesalio || Andreas Vesalius || Vesalius', 'vesali'],
            ['Estudió la anatomofisiología en el siglo XV', 'Leonardo da Vinci || Da Vinci', 'vinci']
          ] },
          { t: 'Siglo XIX', hojas: [
            ['Padre de la patología moderna', 'Rudolf Virchow || Virchow', 'virchow'],
            ['Padre de la fisiología experimental', 'Claude Bernard || Bernard', 'bernard'],
            ['Demostró la teoría germinal de la enfermedad y desarrolló vacunas', 'Louis Pasteur || Pasteur', 'pasteur'],
            ['Postulados que relacionan un microorganismo con una enfermedad', 'Robert Koch || Koch', 'koch']
          ] },
          { t: 'Siglo XX', hojas: [
            ['Acuñó el término homeostasis', 'Walter Cannon || Cannon', 'cannon'],
            ['Fase de la patología con microscopía electrónica, inmunohistoquímica y biología molecular', 'Fase ultracelular || Ultracelular', 'ultracelul']
          ] }
        ]
      },

      /* ───────────── UNIDAD 1 · Signos y síntomas ───────────── */
      {
        id: 'fisio_manifestaciones', clase: 'Unidad 1', titulo: 'Signos, síntomas y respiración', tipo: 'mapa', sl: [[1]],
        centro: 'Manifestaciones', sub: 'De la enfermedad',
        fuente: 'Unidad 1 · Fisiopatología de los signos y síntomas: síntomas, signos, síndrome y respiración',
        ramas: [
          { t: 'Conceptos', hojas: [
            ['Manifestaciones subjetivas, percibidas únicamente por el paciente', 'Síntoma || Síntomas', 'sintoma'],
            ['Manifestaciones objetivas o físicas, observadas en la exploración', 'Signo || Signos', 'signo'],
            ['Conjunto de signos y síntomas que puede tener diferentes causas', 'Síndrome', 'sindrome']
          ] },
          { t: 'Ejemplos de la clase', hojas: [
            ['Cefalea intensa, fatiga, escalofríos, malestar', 'Síntomas', 'sintoma'],
            ['Fiebre, taquicardia, presión arterial', 'Signos', 'signo']
          ] },
          { t: 'Frecuencia respiratoria', hojas: [
            ['FR normal (rpm)', '12 – 20 || 12-20 || 12 a 20 || Entre 12 y 20', '12;20'],
            ['Por debajo de 12', 'Bradipnea', 'bradipnea'],
            ['Por encima de 20', 'Taquipnea', 'taquipnea']
          ] },
          { t: 'Amplitud', hojas: [
            ['Amplitud aumentada', 'Hiperpnea', 'hiperpnea'],
            ['Amplitud disminuida', 'Hipopnea', 'hipopnea'],
            ['Amplitud y FR aumentadas', 'Polipnea', 'polipnea']
          ] }
        ]
      },
      {
        id: 'fisio_disnea', clase: 'Unidad 1', titulo: 'Disnea: grados y tipos semiológicos', tipo: 'mapa', sl: [[1]],
        centro: 'Disnea', sub: 'Dificultad en el trabajo respiratorio, con o sin percepción del paciente',
        fuente: 'Unidad 1 · Disnea: definición, grados, disnea de esfuerzo y de reposo, ortopnea, trepopnea y platipnea',
        ramas: [
          { t: 'Disnea de esfuerzo', hojas: [
            ['Grado I', 'Grandes esfuerzos || Ante grandes esfuerzos', 'grande'],
            ['Grado II', 'Esfuerzos moderados || Moderados esfuerzos', 'moderad'],
            ['Grado III', 'Pequeños esfuerzos', 'pequeñ|peque'],
            ['Grado IV', 'En reposo || Reposo || En el reposo', 'reposo'],
            ['Suele ser el primer síntoma de la insuficiencia…', 'Ventricular izquierda', 'ventricular izquierd']
          ] },
          { t: 'Con la posición', hojas: [
            ['En decúbito; obliga a sentarse o a dormir con varias almohadas', 'Ortopnea', 'ortopnea'],
            ['En decúbito lateral; mejora en el lado opuesto (ej.: derrame pleural unilateral)', 'Trepopnea', 'trepopnea'],
            ['En posición vertical (sentado o parado); mejora en decúbito', 'Platipnea', 'platipnea']
          ] },
          { t: 'Trepopnea', hojas: [
            ['Los pacientes pulmonares se acuestan hacia el lado del…', 'Pulmón sano', 'sano'],
            ['Los cardíacos prefieren el decúbito…', 'Lateral derecho', 'derech']
          ] },
          { t: 'Disneas no cardíacas', hojas: [
            ['Ejemplos de la clase', 'Insuficiencia respiratoria, anemia y acidosis', 'respirator;anemia;acidosis'],
            ['Con el cambio de decúbito…', 'No se modifica || No se modifican', 'no se modific']
          ] }
        ]
      },
      {
        id: 'fisio_cianosis', clase: 'Unidad 1', titulo: 'Cianosis', tipo: 'mapa', sl: [[1]],
        centro: 'Cianosis', sub: 'Coloración azulada de piel y mucosas',
        fuente: 'Unidad 1 · Cianosis: definición, dónde buscarla, signos asociados y clasificación (central, periférica y mixta)',
        ramas: [
          { t: 'Generalidades', hojas: [
            ['Aparece cuando la hemoglobina reducida supera…', '5 g/dL || 5 g/dl', '5'],
            ['Se busca en labios, uñas, nariz, pómulos y orejas, con buena luz…', 'Natural', 'natural'],
            ['Dedos en palillo de tambor', 'Acropaquia', 'acropaqu']
          ] },
          { t: 'Central', hojas: [
            ['Mecanismo', 'Insaturación arterial de oxígeno || Desaturación arterial', 'satura'],
            ['Saturación por debajo de…', '85% || 85 %', '85'],
            ['Temperatura de la piel', 'Caliente', 'caliente'],
            ['Además de la piel, se ve en…', 'Mucosas || Las mucosas', 'mucosa']
          ] },
          { t: 'Periférica', hojas: [
            ['Saturación arterial normal con aumento de la…', 'Extracción tisular de oxígeno || Extracción de oxígeno', 'extracc'],
            ['Temperatura de la piel', 'Fría', 'fria'],
            ['Mejora con…', 'Masaje o calor || Calor o masaje', 'masaje|calor'],
            ['Regiones donde aparece', 'Acrales || Regiones acrales', 'acral']
          ] },
          { t: 'Distribución', hojas: [
            ['Lóbulos, nariz, labios, lengua, dedos y lechos ungueales', 'Generalizada', 'generaliz'],
            ['Solo en algunas áreas, como en las obstrucciones venosas', 'Localizada', 'localiz'],
            ['Central más periférica', 'Mixta', 'mixta']
          ] }
        ]
      },
      {
        id: 'fisio_fiebre_tos', clase: 'Unidad 1', titulo: 'Fiebre, tos e ictericia', tipo: 'mapa', sl: [[1]],
        centro: 'Síntomas generales', sub: 'Unidad 1',
        fuente: 'Unidad 1 · Fiebre, tos (patogenia, seca y húmeda), ictericia y circulación colateral',
        ramas: [
          { t: 'Fiebre', hojas: [
            ['Temperatura por encima de…', '38 °C || 38 grados || 38', '38'],
            ['Por alteración del centro…', 'Termorregulador', 'termorregul'],
            ['Cuánto aumenta la FC por cada grado', '8 lpm || 8 latidos', '8']
          ] },
          { t: 'Tos', hojas: [
            ['Patogenia: aumento de…', 'Secreciones || Las secreciones', 'secrec'],
            ['Patogenia: presencia de un… en las vías aéreas', 'Cuerpo extraño', 'cuerpo extra'],
            ['No se acompaña de expectoración', 'Tos seca || Seca', 'seca'],
            ['Productiva, con expectoración', 'Tos húmeda || Húmeda', 'humeda']
          ] },
          { t: 'Ictericia', hojas: [
            ['Coloración amarilla de piel y escleróticas por acumulación de…', 'Bilirrubina', 'bilirrub'],
            ['Orina oscura', 'Coluria', 'coluria'],
            ['Heces claras', 'Acolia', 'acolia'],
            ['Tratamiento de la ictericia neonatal', 'Fototerapia', 'fototerap']
          ] },
          { t: 'Abdomen', hojas: [
            ['Circulación colateral en "cabeza de medusa": signo de…', 'Hipertensión portal', 'portal']
          ] }
        ]
      },
      {
        id: 'fisio_dolor', clase: 'Unidad 1', titulo: 'Semiología del dolor (Unidad 1)', tipo: 'mapa', sl: [[1]],
        centro: 'Dolor', sub: 'Experiencia sensitiva y emocional desagradable',
        fuente: 'Unidad 1 · Dolor: definición, ALICIA FREDUSA, dolor referido, tipos y características',
        ramas: [
          { t: 'ALICIA', hojas: [
            ['A: ¿cuándo empezó ese dolor?', 'Antecedentes', 'antecedent'],
            ['C: "se aprieta, en punzadas, quemante, cólico…"', 'Característica || Características', 'caracter'],
            ['I: escala de 0 a 10', 'Intensidad', 'intensid'],
            ['Nombre de la escala de 0 a 10', 'Escala numérica verbal || ENV', 'numerica verbal|env']
          ] },
          { t: 'Tipos', hojas: [
            ['Minutos, horas o días', 'Aguda || Agudo', 'agud'],
            ['Semanas, meses o años', 'Crónica || Crónico', 'cronic'],
            ['Por daño de nervios sensitivos', 'Neuropática || Neuropático', 'neuropat'],
            ['Sentido en un área que no es el sitio del problema', 'Dolor referido || Referido', 'referid']
          ] },
          { t: 'Características', hojas: [
            ['Quemazón, aguja, choque, hormigueo', 'Neurológico || Neurológica', 'neurolog'],
            ['En faja, con nudo doloroso', 'Muscular', 'muscular'],
            ['Puntual, al final del movimiento', 'Articular', 'articular'],
            ['Pulsátil; la región puede estar caliente o fría', 'Vascular', 'vascular']
          ] }
        ]
      },
      {
        id: 'fisio_terminos', clase: 'Unidad 1', titulo: 'Términos técnicos por sistemas', tipo: 'tabla', sl: [[1]],
        resumen: 'El vocabulario de la anamnesis por aparatos que trae la Unidad 1.',
        fuente: 'Unidad 1 · Términos técnicos: dolor, síntomas generales, ojo, boca y aparato digestivo',
        columnas: ['Término', 'Significado'],
        filas: [
          ['[[Analgia::analgia]]', 'Ausencia de dolor'],
          ['[[Algogénico::algogen]]', 'Factor que causa dolor'],
          ['[[Precordialgia::precordial]]', 'Dolor en la región del corazón'],
          ['[[Dismenorrea::dismenorr]]', 'Menstruación dolorosa'],
          ['[[Adinamia::adinamia]]', 'Debilidad muscular'],
          ['[[Diplopía::diplopi]]', 'Visión doble'],
          ['[[Nistagmo::nistagm]]', 'Movimientos oculares rápidos e involuntarios'],
          ['[[Escotoma::escotoma]]', 'Pérdida de la visión en una región del campo visual'],
          ['[[Odinofagia::odinofag]]', 'Deglución dolorosa'],
          ['[[Xerostomía::xerostom]]', 'Boca seca'],
          ['[[Sialorrea::sialorr]]', 'Exceso de salivación'],
          ['[[Pirosis::pirosis]]', 'Quemazón en el pecho, debajo del esternón'],
          ['[[Esteatorrea::esteatorr]]', 'Grasa en las heces'],
          ['[[Meteorismo::meteorism]]', 'Aumento de gases en el tubo digestivo'],
          ['[[Disquecia::disquec|disquez]]', 'Dificultad para evacuar; más común en bebés']
        ]
      },
      {
        id: 'fisio_urinario', clase: 'Unidad 1', titulo: 'Aparato urinario: términos y signo de Giordano', tipo: 'tabla', sl: [[1]],
        resumen: 'Volumen, ritmo y color de la orina, con los valores de la clase.',
        fuente: 'Unidad 1 · Sistema renal y urinario: términos técnicos y signo de Giordano',
        columnas: ['Término', 'Definición de la clase'],
        filas: [
          ['[[Oliguria::oliguria]]', 'Menos de [[500 mL/24 h || 500 ml/24 h || 500 mL || 500 ml::500]] en el adulto; menos de 0,5 mL/kg/h en niños'],
          ['[[Anuria::anuria]]', 'Diuresis inferior a 50–100 mL al día'],
          ['[[Poliuria::poliuria]]', 'Diuresis mayor a [[3 L/día || 3 l/día || 3 litros/día || 3 L::3]]'],
          ['[[Polaquiuria::polaquiur]]', 'Necesidad frecuente de orinar en pequeñas cantidades'],
          ['[[Nicturia::nicturia]]', 'Necesidad de orinar de noche, que interrumpe el sueño'],
          ['[[Enuresis::enuresis]]', 'Incapacidad para controlar la micción'],
          ['[[Hematuria::hematuria]]', 'Más de [[3 eritrocitos || 3::3]] por campo de alta resolución'],
          ['[[Hemoglobinuria::hemoglobinur]]', 'Hemoglobina en la orina (rojo oscuro a negro), por [[hemólisis::hemolis]]'],
          ['[[Mioglobinuria::mioglobinur]]', 'Mioglobina en la orina por daño muscular'],
          ['Signo de [[Giordano::giordano]]', 'Puñopercusión a la altura de las costillas 11 y 12: pielonefritis o cálculos renales']
        ]
      },

      /* ───────────── UNIDAD 2 · Inflamación ───────────── */
      {
        id: 'fisio_inflamacion', clase: 'Unidad 2', titulo: 'Inflamación: signos cardinales y causas', tipo: 'mapa', sl: [[2]],
        centro: 'Inflamación', sub: 'Defensa de los tejidos vascularizados ante la lesión',
        fuente: 'Unidad 2 · Inflamación: definición, tétrada de Celso, signo de Virchow, tríada de Virchow y causas',
        ramas: [
          { t: 'Tétrada de Celso', hojas: [
            ['Enrojecimiento, por vasodilatación', 'Rubor', 'rubor'],
            ['Hinchazón, por acumulación de líquido y células', 'Tumor', 'tumor'],
            ['Por mayor circulación y mediadores químicos', 'Calor', 'calor'],
            ['Por estímulo de las terminaciones nerviosas', 'Dolor', 'dolor']
          ] },
          { t: 'Virchow', hojas: [
            ['Quinto signo que agregó Virchow', 'Pérdida de función || Impotencia funcional || Functio laesa || Función laesa', 'funci'],
            ['Tríada de Virchow (trombosis): hipercoagulabilidad, estasis y…', 'Lesión endotelial', 'endotel']
          ] },
          { t: 'Autor', hojas: [
            ['Médico romano de la tétrada', 'Celso || Aulo Cornelio Celso', 'celso']
          ] },
          { t: 'Causas', hojas: [
            ['Calor, frío, radiación, rayos UV', 'Físicos || Agentes físicos', 'fisic'],
            ['Virus, bacterias, hongos', 'Biológicos || Agentes biológicos', 'biologic'],
            ['Venenos, toxinas', 'Químicos || Agentes químicos', 'quimic']
          ] }
        ]
      },
      {
        id: 'fisio_mediadores', clase: 'Unidad 2', titulo: 'Mediadores de la inflamación', tipo: 'tabla', sl: [[2]],
        resumen: 'La tabla de la clase: de dónde sale cada mediador y qué hace.',
        fuente: 'Unidad 2 · Mediadores químicos derivados de células y de proteínas plasmáticas (tabla resumen)',
        columnas: ['Mediador', 'Fuente', 'Acciones principales'],
        filas: [
          ['[[Histamina::histamin]]', 'Mastocitos, basófilos, plaquetas', 'Vasodilatación, aumento de la [[permeabilidad::permeabil]] vascular, activación endotelial'],
          ['[[Serotonina::serotonin]]', 'Plaquetas', '[[Vasoconstricción::vasoconstric]]'],
          ['[[Prostaglandinas::prostaglandin]]', 'Mastocitos, leucocitos', 'Vasodilatación, [[dolor::dolor]], [[fiebre::fiebre]]'],
          ['[[Leucotrienos::leucotrien]]', 'Mastocitos, leucocitos', 'Permeabilidad vascular, [[quimiotaxis::quimiotax]], adhesión y activación de leucocitos'],
          ['Factor activador de [[plaquetas::plaquet]] (PAF)', 'Leucocitos, mastocitos', 'Vasodilatación, permeabilidad, quimiotaxis, degranulación, explosión oxidativa'],
          ['Especies reactivas del [[oxígeno::oxigen]]', 'Leucocitos', 'Destrucción de microbios, lesión tisular'],
          ['[[Óxido nítrico::oxido nitric]]', 'Endotelio, macrófagos', 'Relajación del músculo liso vascular, muerte de microbios'],
          ['[[Citocinas::citocin]] (TNF, IL-1, IL-6)', 'Macrófagos, células endoteliales, mastocitos', 'Local: activación endotelial; sistémica: fiebre, hipotensión ([[shock::shock]])'],
          ['[[Complemento::complement]]', 'Plasma (hígado)', 'Quimiotaxis, [[opsonización::opsoniz]], complejo de ataque de membrana, vasodilatación'],
          ['[[Cininas::cinina|quinina]]', 'Plasma (hígado)', 'Permeabilidad, contracción del músculo liso, vasodilatación, dolor']
        ]
      },
      {
        id: 'fisio_aa', clase: 'Unidad 2', titulo: 'Ácido araquidónico y mediadores plasmáticos', tipo: 'mapa', sl: [[2]],
        centro: 'Mediadores', sub: 'Derivados de células y del plasma',
        fuente: 'Unidad 2 · Aminas vasoactivas, metabolitos del ácido araquidónico, complemento, cininas y coagulación',
        ramas: [
          { t: 'Vías del AA', hojas: [
            ['Produce prostaglandinas y tromboxano', 'Ciclooxigenasa || COX', 'ciclooxigen|cox'],
            ['Produce leucotrienos y lipoxinas', 'Lipoxigenasa || 5-lipoxigenasa', 'lipoxigen'],
            ['Inhiben la ciclooxigenasa (aspirina, ibuprofeno)', 'AINE || AINEs || AINE´s', 'aine']
          ] },
          { t: 'Prostanoides', hojas: [
            ['Vasodilatación e inhibe la agregación plaquetaria', 'PGI2 || Prostaciclina', 'pgi2|prostaciclin'],
            ['Principal producto de las plaquetas: agrega y contrae', 'TXA2 || Tromboxano A2 || Tromboxano', 'txa2|tromboxan'],
            ['Vasodilatación, fiebre y dolor', 'PGE2 y PGD2 || PGE2', 'pge2']
          ] },
          { t: 'Leucotrienos', hojas: [
            ['Potente quimiotáctico para neutrófilos', 'LTB4', 'ltb4'],
            ['Broncoespasmo, vasoconstricción y permeabilidad', 'LTC4, LTD4 y LTE4 || LTC4', 'ltc4'],
            ['Antagonistas endógenos de los leucotrienos', 'Lipoxinas', 'lipoxin']
          ] },
          { t: 'Del plasma', hojas: [
            ['Activa cininas, coagulación, fibrinólisis y complemento', 'Factor de Hageman || Factor XII || Factor XIIa', 'hageman|xii'],
            ['Anafilotoxinas', 'C3a y C5a', 'c3a;c5a'],
            ['Opsonina del complemento', 'C3b', 'c3b'],
            ['Complejo de ataque de membrana', 'C5b-9 || MAC', 'c5b|mac']
          ] },
          { t: 'Aminas', hojas: [
            ['Amina vasoactiva, entre los primeros mediadores liberados; dilata las arteriolas', 'Histamina', 'histamin']
          ] }
        ]
      },
      {
        id: 'fisio_patrones', clase: 'Unidad 2', titulo: 'Patrones de la inflamación aguda', tipo: 'tabla', sl: [[2]],
        resumen: 'Qué exudado forma cada patrón y el ejemplo de la clase.',
        fuente: 'Unidad 2 · Inflamación serosa, fibrinosa, purulenta y seudomembranosa',
        columnas: ['Patrón', 'Qué se forma', 'Ejemplo de la clase'],
        filas: [
          ['[[Serosa::serosa]]', 'Líquido pobre en células, en cavidades o bajo la epidermis', 'Ampollas por [[quemaduras::quemadur]] o infecciones víricas'],
          ['[[Fibrinosa::fibrinos]]', 'Fibrina, por salida de [[fibrinógeno::fibrinogen]]', 'Pericarditis fibrinosa (pleura, meninges, pericardio)'],
          ['[[Purulenta o supurativa || Purulenta || Supurativa::purulent|supurat]]', '[[Pus::pus]]: neutrófilos, células necróticas y líquido de edema', 'Apendicitis aguda; acumulación localizada = [[absceso::absceso]]'],
          ['[[Seudomembranosa || Pseudomembranosa::membranos]]', 'Falsa membrana de exudado y epitelio necrosado', '[[Difteria::difteria]]; colitis pseudomembranosa']
        ]
      },
      {
        id: 'fisio_aguda_cronica', clase: 'Unidad 2', titulo: 'Inflamación aguda y crónica', tipo: 'mapa', sl: [[2]],
        centro: 'Aguda o crónica', sub: 'Según la defensa del huésped y la duración',
        fuente: 'Unidad 2 · Inflamación aguda (fases vascular y celular), crónica, granulomatosa, evolución y pielonefritis',
        ramas: [
          { t: 'Aguda', hojas: [
            ['Se inicia en…', 'Minutos', 'minuto'],
            ['Célula que emigra sobre todo', 'Neutrófilos', 'neutrofil'],
            ['Vasodilatación, permeabilidad y escape de líquido', 'Fase vascular', 'vascular'],
            ['Llegada de leucocitos al sitio de la lesión', 'Fase celular', 'celular']
          ] },
          { t: 'Crónica', hojas: [
            ['Duración', 'Semanas o meses', 'semana|mes'],
            ['Infiltrado', 'Linfocitos, macrófagos y células plasmáticas || Mononuclear', 'linfocit|mononucl'],
            ['Formación de vasos nuevos', 'Angiogénesis || Proliferación vascular', 'angiogen|prolifer']
          ] },
          { t: 'Granulomatosa', hojas: [
            ['Macrófagos activados que parecen células epiteliales', 'Células epitelioides', 'epitelioid'],
            ['Células gigantes del granuloma tuberculoso', 'Langhans || Células gigantes de Langhans', 'langhans'],
            ['Zona central del granuloma tuberculoso', 'Necrosis', 'necrosis']
          ] },
          { t: 'Evolución', hojas: [
            ['Reemplazo de células lesionadas y función normal', 'Resolución', 'resoluc'],
            ['Cicatriz con pérdida de funcionalidad', 'Fibrosis', 'fibrosis']
          ] },
          { t: 'Pielonefritis', hojas: [
            ['Inflamación supurativa del riñón y la pelvis renal', 'Pielonefritis aguda || Aguda', 'aguda'],
            ['Túbulos dilatados con cilindros coloides', 'Tiroidización', 'tiroidiz']
          ] }
        ]
      },

      /* ───────────── UNIDAD 3 · Conceptos y generalidades ───────────── */
      {
        id: 'fisio_conceptos', clase: 'Unidad 3', titulo: 'Conceptos: salud, enfermedad y curso clínico', tipo: 'mapa', sl: [[3]],
        centro: 'Conceptos', sub: 'Unidad 3',
        fuente: 'Unidad 3 · Fisiopatología, diagnóstico, salud, enfermedad, secuelas, complicaciones y curso clínico',
        ramas: [
          { t: 'Etimología', hojas: [
            ['Physis', 'Naturaleza', 'naturalez'],
            ['Pato', 'Enfermedad || Enfermedades', 'enfermedad'],
            ['Logía', 'Estudio || Tratado', 'estudio|tratado']
          ] },
          { t: 'Definiciones', hojas: [
            ['Identificación de un cuadro clínico por signos y síntomas', 'Diagnóstico', 'diagnost'],
            ['Completo bienestar físico, mental y social (OMS)', 'Salud', 'salud'],
            ['Desviación del estado fisiológico, con evolución más o menos previsible', 'Enfermedad', 'enfermedad']
          ] },
          { t: 'Después de la enfermedad', hojas: [
            ['Lesiones o disfunciones que siguen a una enfermedad', 'Secuelas', 'secuela'],
            ['Extensiones adversas de la enfermedad o del tratamiento', 'Complicaciones', 'complicac']
          ] },
          { t: 'Curso clínico', hojas: [
            ['Relativamente grave pero autolimitado', 'Agudo', 'agudo!subagud'],
            ['Continuo y prolongado', 'Crónico', 'cronic'],
            ['Intermedio entre los dos', 'Subagudo', 'subagud'],
            ['Agravamiento de los síntomas', 'Exacerbación', 'exacerbac'],
            ['Período de menor gravedad', 'Remisión', 'remisi']
          ] }
        ]
      },
      {
        id: 'fisio_respuestas', clase: 'Unidad 3', titulo: 'Respuestas celulares a la lesión', tipo: 'tabla', sl: [[3]],
        resumen: 'La tabla 1-1 de la clase y los dos ejemplos de isquemia.',
        fuente: 'Unidad 3 · Lesión, adaptación y muerte celular: tabla de respuestas celulares',
        columnas: ['Estímulo', 'Respuesta celular'],
        filas: [
          ['Aumento de la demanda o del estímulo trófico (factores de crecimiento, hormonas)', '[[Hiperplasia e hipertrofia || Hiperplasia, hipertrofia || Hipertrofia e hiperplasia::hiperplas;hipertrof]]'],
          ['Disminución de nutrientes y de la estimulación', '[[Atrofia::atrof]]'],
          ['Irritación crónica (química o física)', '[[Metaplasia::metaplas]]'],
          ['Menos oxígeno, lesión química o infección: aguda y autolimitada', 'Lesión aguda [[reversible::reversib!irrevers]]'],
          ['Lo mismo, pero progresiva y grave (incluye daño del ADN)', 'Lesión [[irreversible::irrevers]]: [[necrosis o apoptosis || necrosis y apoptosis::necros;apopto]]'],
          ['Daño agudo (acción muy corta): isquemia →', '[[Necrosis celular || Necrosis::necros]]'],
          ['Daño crónico (el agente persiste): isquemia →', '[[Atrofia::atrof]] (la célula se adapta)']
        ]
      },
      {
        id: 'fisio_adaptaciones', clase: 'Unidad 3', titulo: 'Adaptaciones celulares', tipo: 'mapa', sl: [[3]],
        centro: 'Adaptación', sub: 'Normal → hiperplasia → displasia → cáncer',
        fuente: 'Unidad 3 · Hiperplasia, hipertrofia, atrofia, metaplasia y displasia',
        ramas: [
          { t: 'Hiperplasia', hojas: [
            ['Fisiológica que aumenta la capacidad funcional', 'Hormonal', 'hormonal'],
            ['Fisiológica que aumenta la masa tras el daño', 'Compensadora', 'compensad'],
            ['Patológica: por estímulo hormonal excesivo o…', 'Factores de crecimiento', 'factores de crecim']
          ] },
          { t: 'Hipertrofia', hojas: [
            ['Ejemplos fisiológicos de la clase', 'Músculo del atleta y útero en el embarazo', 'atleta;utero'],
            ['Ejemplo patológico de la clase', 'Corazón en la hipertensión', 'corazon'],
            ['El aumento de tamaño se debe a la síntesis de más…', 'Componentes estructurales', 'estructural']
          ] },
          { t: 'Atrofia', hojas: [
            ['Por disminución de la carga de trabajo', 'Desuso || Por desuso', 'desuso'],
            ['Por pérdida de la inervación', 'Denervación || Por denervación', 'denervac'],
            ['Por falta de riego', 'Isquemia || Por isquemia', 'isquemia']
          ] },
          { t: 'Metaplasia y displasia', hojas: [
            ['Célula adulta reemplazada por otro tipo adulto más resistente', 'Metaplasia', 'metaplas'],
            ['Si el estímulo persiste, la metaplasia se considera lesión…', 'Preneoplásica', 'preneopl'],
            ['Crecimiento celular desordenado', 'Displasia', 'displas'],
            ['Normal → hiperplasia → displasia → …', 'Cáncer', 'cancer']
          ] }
        ]
      },
      {
        id: 'fisio_muerte', clase: 'Unidad 3', titulo: 'Lesión y muerte celular', tipo: 'mapa', sl: [[3]],
        centro: 'Muerte celular', sub: 'Necrosis y apoptosis',
        fuente: 'Unidad 3 · Causas, mecanismos moleculares, necrosis (signos y tipos), gangrena y apoptosis',
        ramas: [
          { t: 'Mecanismos', hojas: [
            ['Depleción de…', 'ATP', 'atp'],
            ['Daño de la…', 'Mitocondria || Mitocondrial', 'mitocondri'],
            ['Aflujo intracelular de…', 'Calcio', 'calcio'],
            ['Defectos en la permeabilidad de la…', 'Membrana', 'membrana']
          ] },
          { t: 'Núcleo en la necrosis', hojas: [
            ['Retracción con condensación de la cromatina', 'Picnosis', 'picnosis'],
            ['Fragmentación', 'Cariorrexis', 'cariorrex'],
            ['Disolución', 'Cariolisis || Cariólisis', 'cariolis']
          ] },
          { t: 'Tipos de necrosis', hojas: [
            ['Isquemia; se conserva el perfil celular (infarto de miocardio)', 'Coagulativa', 'coagulat'],
            ['Infecciones bacterianas focales; tejido líquido (pus)', 'Licuefactiva', 'licuefact|licuat'],
            ['Tuberculosis; aspecto de queso', 'Caseosa', 'caseos'],
            ['Por liberación de enzimas pancreáticas en la cavidad abdominal', 'Grasa', 'grasa'],
            ['Por Clostridium perfringens', 'Gangrena gaseosa || Gaseosa', 'gaseos']
          ] },
          { t: 'Apoptosis', hojas: [
            ['Muerte celular programada, sin inflamación', 'Apoptosis', 'apoptosis'],
            ['Gangrena de Fournier', 'Fascitis necrotizante', 'fascitis']
          ] }
        ]
      },

      /* ───────────── UNIDAD 4 · Hemorragias (PDF escaneado, leído por OCR) ───────────── */
      {
        id: 'fisio_hemorragias', clase: 'Unidad 4', titulo: 'Hemorragias: tipos, signos y complicaciones', tipo: 'mapa', sl: [[4,2,14],[4,26,26]],
        centro: 'Hemorragia', sub: 'Extravasación de sangre del lecho vascular',
        fuente: 'Unidad 4 · Hemorragias: hemostasia, trastornos primarios y secundarios, tipos, síntomas y complicaciones',
        ramas: [
          { t: 'Conceptos', hojas: [
            ['Mecanismos que detienen el sangrado y mantienen la fluidez', 'Hemostasia', 'hemostasi'],
            ['Por trastornos hereditarios o adquiridos de la hemostasia', 'Primarios || Trastornos primarios', 'primari'],
            ['Por enfermedad o traumatismo que lesiona arterias o venas', 'Secundarios || Trastornos secundarios', 'secundari']
          ] },
          { t: 'Según el vaso', hojas: [
            ['Sangre roja oscura; más fácil de controlar', 'Venosa', 'venosa'],
            ['Salida abundante e intermitente de sangre roja brillante', 'Arterial', 'arterial'],
            ['Vasos superficiales; se cierra sola; forma hematomas', 'Capilar', 'capilar']
          ] },
          { t: 'Según la localización', hojas: [
            ['La sangre no sale al exterior', 'Interna || Internas', 'interna'],
            ['Internas que salen por un orificio corporal', 'Exteriorizada || Exteriorizadas', 'exterioriz']
          ] },
          { t: 'Signos de la externa', hojas: [
            ['Cuadro más grave que puede producir', 'Estado de shock || Shock', 'shock'],
            ['Pulso y frecuencia cardíaca', 'Acelerados || Aumentados', 'aceler|aument'],
            ['Presión arterial', 'Disminuida || Desciende', 'dismin|descien|baja']
          ] },
          { t: 'Complicaciones', hojas: [
            ['Por pérdida de gran cantidad de sangre', 'Shock hipovolémico', 'hipovolem'],
            ['Mareo, sudoración, debilidad, náuseas, taquipnea e hipotensión', 'Síncope', 'sincope'],
            ['Fatiga y palidez tras una pérdida prolongada', 'Anemia', 'anemia']
          ] }
        ]
      },
      {
        id: 'fisio_hemorragia_manejo', clase: 'Unidad 4', titulo: 'Cómo actuar ante una hemorragia', tipo: 'mapa', sl: [[4,15,24]],
        centro: 'Manejo', sub: 'Primeros pasos y tratamiento',
        fuente: 'Unidad 4 · Cómo actuar (externa, interna, exteriorizadas) y tratamiento (líquidos, posición, fármacos)',
        ramas: [
          { t: 'Externa', hojas: [
            ['Primer paso', 'Compresión directa || Presión directa', 'compresi|presion'],
            ['En una extremidad: elevarla por encima del…', 'Corazón', 'corazon']
          ] },
          { t: 'Interna capilar', hojas: [
            ['Qué se aplica sobre la piel', 'Frío local || Frío', 'frio']
          ] },
          { t: 'Exteriorizadas', hojas: [
            ['La única que no hay que intentar detener', 'Otorragia', 'otorragia'],
            ['Sentado, cabeza hacia adelante, comprimir al menos 5 minutos', 'Epistaxis', 'epistaxis'],
            ['Semisentado a 45° y hielo en el tórax', 'Hemoptisis', 'hemoptisis'],
            ['Decúbito supino y hielo en el abdomen', 'Hematemesis', 'hematemesis']
          ] },
          { t: 'Reposición', hojas: [
            ['Accesos venosos de grueso calibre: por lo menos…', 'Dos || 2', 'dos|2'],
            ['Cristaloides de la clase', 'Cloruro de sodio 0,9% y Ringer lactato || Ringer lactato', 'ringer'],
            ['Posición para redistribuir líquidos', 'Trendelenburg || Trendelemburg', 'trendel'],
            ['Si los líquidos no revierten el shock', 'Drogas vasoactivas || Vasoactivos', 'vasoactiv']
          ] }
        ]
      },

      /* ───────────── UNIDAD 5 · Edema ───────────── */
      {
        id: 'fisio_edema', clase: 'Unidad 5', titulo: 'Edema: mecanismos y fuerzas de Starling', tipo: 'mapa', sl: [[5]],
        centro: 'Edema', sub: 'Exceso de líquido en el intersticio',
        fuente: 'Unidad 5 · Definición, tipos, mecanismo, fuerzas de Starling y ley de Frank-Starling',
        ramas: [
          { t: 'Tipos', hojas: [
            ['Por la ley de Starling', 'Localizado || Localizados', 'localiz'],
            ['Starling + retención de Na y H₂O', 'Generalizado || Generalizados', 'generaliz']
          ] },
          { t: 'Mecanismos', hojas: [
            ['Aumento de la presión… capilar', 'Hidrostática', 'hidrostat'],
            ['Disminución de la presión… plasmática', 'Oncótica', 'oncotic'],
            ['Aumento de la… capilar', 'Permeabilidad', 'permeabil'],
            ['Obstrucción del sistema…', 'Linfático', 'linfat']
          ] },
          { t: 'Fuerzas de Starling', hojas: [
            ['Extremo arterial del capilar', 'Filtración', 'filtrac'],
            ['Extremo venoso del capilar', 'Reabsorción', 'reabsorc'],
            ['Presión de filtración en el capilar arterial', '+10 mmHg || 10 mmHg || +10', '10'],
            ['Presión de filtración en el capilar venoso', '−7 mmHg || -7 mmHg || -7', '7']
          ] },
          { t: 'Frank-Starling', hojas: [
            ['A mayor precarga, mayor volumen…', 'Sistólico', 'sistolic'],
            ['Tipo de relación', 'Curvilínea || No lineal', 'curvil|no lineal']
          ] }
        ]
      },
      {
        id: 'fisio_edema_volemia', clase: 'Unidad 5', titulo: 'Edema, volemia y retención hidrosalina', tipo: 'tabla', sl: [[5]],
        resumen: 'Volemia arterial efectiva: el líquido dentro de los vasos que estimula barorreceptores y perfunde los tejidos.',
        fuente: 'Unidad 5 · Edemas y su relación con la volemia',
        columnas: ['Estado de la volemia', 'Mecanismo', 'Ejemplos'],
        filas: [
          ['[[Hipovolemia arterial efectiva::hipovolem]]', 'Retención hidrosalina [[secundaria::secundar]]', 'ICC, [[cirrosis hepática || cirrosis::cirrosis]], síndrome nefrótico'],
          ['[[Hipervolemia::hipervolem]]', 'Retención hidrosalina [[primaria::primari]]', 'Insuficiencia renal, [[glomerulonefritis aguda || glomerulonefritis::glomerulonefr]]']
        ]
      },
      {
        id: 'fisio_godet', clase: 'Unidad 5', titulo: 'Gravedad del edema (signo de la fóvea)', tipo: 'tabla', sl: [[5]],
        resumen: 'Profundidad de la depresión y tiempo de recuperación de cada grado.',
        fuente: 'Unidad 5 · Semiología: gravedad del edema',
        columnas: ['Grado', 'Depresión', 'Recuperación'],
        filas: [
          ['I', 'Leve, sin distorsión', 'Casi [[instantánea::instant]]'],
          ['II', 'Hasta [[4 mm::4]]', '[[15 segundos || 15 s::15]]'],
          ['III', 'Hasta [[6 mm::6]]', 'Hasta [[1 minuto || un minuto::1|un minuto]]'],
          ['IV', 'Hasta [[1 cm || 10 mm::1 cm|10 mm]]', 'Persiste [[2 a 5 minutos || 2-5 minutos::2;5]]']
        ]
      },
      {
        id: 'fisio_edema_semio', clase: 'Unidad 5', titulo: 'Semiología del edema', tipo: 'mapa', sl: [[5]],
        centro: 'Semiología', sub: 'Características del edema',
        fuente: 'Unidad 5 · Características semiológicas, anasarca, mixedema, linfedema, lipedema y edema generalizado vs localizado',
        ramas: [
          { t: 'Características', hojas: [
            ['Edema generalizado e importante, con trasudados en cavidades', 'Anasarca', 'anasarca'],
            ['Signo para medir la intensidad', 'Fóvea || Signo de la fóvea || Godet', 'fovea|godet'],
            ['Consistencia del edema renal', 'Blanda', 'blanda'],
            ['Consistencia del linfedema', 'Dura', 'dura'],
            ['Retorna inmediatamente (inflamatorio)', 'Elástico', 'elastic!inelast']
          ] },
          { t: 'Sin fóvea', hojas: [
            ['Hipotiroidismo; mucopolisacáridos en la piel', 'Mixedema', 'mixedema'],
            ['El sistema linfático no drena; proliferan fibroblastos', 'Linfedema', 'linfedema'],
            ['Linfedema que se cronifica', 'Elefantiasis', 'elefantias']
          ] },
          { t: 'Generalizado', hojas: [
            ['Distribución', 'Bilateral, simétrico y ascendente || Bilateral y simétrico', 'bilateral|simetric'],
            ['Con el reposo…', 'Disminuye', 'disminuye']
          ] },
          { t: 'Localizado', hojas: [
            ['Distribución', 'Unilateral', 'unilateral'],
            ['Con el reposo…', 'No disminuye', 'no disminuye']
          ] }
        ]
      },
      {
        id: 'fisio_edemas_tipos', clase: 'Unidad 5', titulo: 'Edemas por causa', tipo: 'tabla', sl: [[5]],
        resumen: 'Cómo es el edema en cada enfermedad, según la clase.',
        fuente: 'Unidad 5 · Edemas simétricos por retención hidrosalina, por aumento de la permeabilidad y por fármacos',
        columnas: ['Causa', 'Cómo es el edema'],
        filas: [
          ['[[Insuficiencia cardíaca congestiva || ICC::insuficiencia cardiac|icc]]', 'Frío, indoloro, cianótico; aumenta en el transcurso del [[día::dia]]'],
          ['[[Cirrosis hepática || Cirrosis::cirrosis]]', 'Precedido por [[ascitis::ascitis]]; con estigmas de cirrosis'],
          ['[[Síndrome nefrótico::nefrotic]]', 'Blando, pálido, simétrico, en miembros inferiores'],
          ['[[Síndrome nefrítico::nefritic]]', 'De escasa magnitud, [[matinal::matinal]], en región palpebral'],
          ['[[Angioneurótico::angioneurot]]', 'Hipersensibilidad: afecta primero la [[cara::cara]]; urticaria y prurito'],
          ['[[Cíclico || Idiopático o cíclico::ciclic]]', 'Relacionado con el ciclo menstrual (estrógenos)'],
          ['Por [[fármacos::farmac]]', 'Enalapril, alfametildopa, diltiazem, nifedipino, glucocorticoides, estrógenos']
        ]
      },
      {
        id: 'fisio_ascitis_eap', clase: 'Unidad 5', titulo: 'Ascitis, edema agudo de pulmón y taponamiento', tipo: 'mapa', sl: [[5]],
        centro: 'Líquido en cavidades', sub: 'Abdomen, pulmón, pericardio y pleura',
        fuente: 'Unidad 5 · Ascitis (técnicas de percusión), edema agudo de pulmón, derrame pleural y taponamiento cardíaco',
        ramas: [
          { t: 'Ascitis', hojas: [
            ['Casos más leves: el paciente se recuesta sobre cada lado', 'Matidez móvil', 'matidez movil'],
            ['Supino: timpanismo central y matidez periférica', 'Semicírculo de Skoda || Skoda', 'skoda'],
            ['Ascitis grave; se hace con un ayudante o con ayuda del paciente', 'Maniobra de Piparote || Piparote', 'piparote']
          ] },
          { t: 'Edema agudo de pulmón', hojas: [
            ['Por aumento de la presión hidrostática', 'Cardiogénico', 'cardiogen!no cardiog'],
            ['Por lesión del tabique alveolar (distrés respiratorio)', 'No cardiogénico', 'no cardiogen'],
            ['Líneas de la radiografía de tórax', 'Líneas de Kerley || Kerley', 'kerley'],
            ['Péptido natriurético > 500 pg/ml sugiere causa…', 'Cardíaca', 'cardiac'],
            ['Expectoración de la etapa 3', 'Espumosa y rosada', 'espumos']
          ] },
          { t: 'Tríada de Beck', hojas: [
            ['Ruidos cardíacos', 'Hipofonesis || Hipofonesis de los ruidos cardíacos', 'hipofon'],
            ['Presión arterial', 'Hipotensión arterial || Hipotensión', 'hipotens'],
            ['Venas del cuello', 'Turgencia yugular || Ingurgitación yugular', 'yugular']
          ] },
          { t: 'Derrame pleural', hojas: [
            ['Pus en la cavidad pleural', 'Empiema', 'empiema'],
            ['Quilo (linfa) en la cavidad pleural', 'Quilotórax', 'quilotorax']
          ] }
        ]
      },

      /* ───────────── UNIDAD 6 · Regeneración, reparación y cicatrización ───────────── */
      {
        id: 'fisio_ciclo', clase: 'Unidad 6', titulo: 'Proliferación y ciclo celular', tipo: 'mapa', sl: [[6]],
        centro: 'Ciclo celular', sub: 'Interfase, mitosis y meiosis',
        fuente: 'Unidad 6 · Células madre, ciclo celular, mitosis y meiosis',
        ramas: [
          { t: 'Células madre', hojas: [
            ['El cigoto', 'Totipotente || Totipotencial', 'totipot'],
            ['Masa celular interna del blastocisto', 'Pluripotentes || Pluripotenciales', 'pluripot'],
            ['Comprometidas con una línea', 'Multipotentes || Multipotenciales', 'multipot']
          ] },
          { t: 'Interfase', hojas: [
            ['Crecimiento; síntesis de ARN y proteínas', 'G1 || Fase G1', 'g1'],
            ['Síntesis de ADN e histonas', 'S || Fase S', '^s|fase s'],
            ['Síntesis continua de proteínas antes de la mitosis', 'G2 || Fase G2', 'g2']
          ] },
          { t: 'Mitosis', hojas: [
            ['Desaparecen nucléolo y membrana nuclear; se organiza el huso', 'Profase', 'profase'],
            ['Cromosomas en el ecuador', 'Metafase', 'metafase'],
            ['Las cromátidas hermanas migran a los polos', 'Anafase', 'anafase'],
            ['Dos núcleos nuevos; ocurre la citocinesis', 'Telofase', 'telofase']
          ] },
          { t: 'Meiosis', hojas: [
            ['Resultado final', 'Cuatro células haploides || 4 células haploides', 'haploide'],
            ['Intercambio entre cromosomas homólogos en la profase I', 'Entrecruzamiento || Cruce cromosómico || Crossing over', 'entrecruz|cruce|crossing'],
            ['Tercera fase de la profase I ("Levanta Zico para Didi")', 'Paquiteno', 'paquiteno']
          ] }
        ]
      },
      {
        id: 'fisio_mec', clase: 'Unidad 6', titulo: 'Matriz extracelular y colágeno', tipo: 'mapa', sl: [[6]],
        centro: 'Matriz extracelular', sub: 'Interacciones célula-matriz',
        fuente: 'Unidad 6 · Matriz extracelular: funciones, macromoléculas, colágenos, elastina y moléculas de adhesión',
        ramas: [
          { t: 'Macromoléculas', hojas: [
            ['Aportan fuerza tensil y capacidad retráctil', 'Proteínas estructurales fibrosas || Colágenos y elastinas', 'fibrosa|colagen'],
            ['Conectan los elementos entre sí y con las células', 'Glucoproteínas adhesivas', 'glucoprot'],
            ['Aportan resiliencia y lubricación', 'Proteoglucanos y hialuronano', 'proteoglucan|hialuron']
          ] },
          { t: 'Colágeno', hojas: [
            ['Cuántos tipos hay', '27 || 27 tipos', '27'],
            ['Componente de la membrana basal', 'Tipo IV || IV', 'iv'],
            ['Fibrillas de anclaje al epitelio', 'Tipo VII || VII', 'vii']
          ] },
          { t: 'Fibras elásticas', hojas: [
            ['Red periférica de microfibrillas', 'Fibrilina', 'fibrilin'],
            ['Defecto de la fibrilina', 'Síndrome de Marfan || Marfan', 'marfan']
          ] },
          { t: 'Adhesión', hojas: [
            ['Inmunoglobulinas, cadherinas, integrinas y…', 'Selectinas', 'selectin']
          ] }
        ]
      },
      {
        id: 'fisio_cicatrizacion', clase: 'Unidad 6', titulo: 'Secuencia de la cicatrización', tipo: 'fluxo', sl: [[6]],
        resumen: 'La secuencia de acontecimientos de la cicatrización, en orden.',
        fuente: 'Unidad 6 · Curación de las heridas cutáneas: secuencia de acontecimientos',
        pasos: [
          'Formación del [[coágulo::coagulo]] de sangre',
          'Formación del tejido de [[granulación::granulac]]',
          'Proliferación celular y depósito de [[colágeno::colagen]]',
          'Formación de la [[cicatriz::cicatriz]]',
          '[[Contracción::contracc]] de la herida',
          '[[Remodelado::remodel]] del tejido conjuntivo',
          { end: 'Recuperación de la fuerza [[tensil::tensil]]' }
        ]
      },
      {
        id: 'fisio_reparacion', clase: 'Unidad 6', titulo: 'Reparación: fases, angiogenia y patología', tipo: 'mapa', sl: [[6]],
        centro: 'Reparación', sub: 'Cuando la regeneración no es posible: cicatrización',
        fuente: 'Unidad 6 · Fases de la curación, angiogenia, factores locales y sistémicos y aspectos patológicos de la reparación',
        ramas: [
          { t: 'Fases', hojas: [
            ['Coágulo, plaquetas y quimiotaxis', 'Inflamación', 'inflamac'],
            ['Tejido de granulación, angiogenia y reepitelización', 'Proliferación || Proliferativa', 'prolifer'],
            ['Depósito de colágeno, remodelado y contracción', 'Maduración', 'madurac']
          ] },
          { t: 'Angiogenia', hojas: [
            ['Vasos nuevos desde vasos preexistentes (adulto)', 'Angiogenia || Angiogénesis', 'angiogen'],
            ['Red vascular primitiva del embrión', 'Vasculogenia || Vasculogénesis', 'vasculogen'],
            ['Factor que aumenta la permeabilidad', 'VEGF', 'vegf'],
            ['Degradan la membrana basal', 'Metaloproteinasas', 'metaloprot']
          ] },
          { t: 'Factores', hojas: [
            ['Sistémico: nutrición (proteínas y vitamina…)', 'C || Vitamina C', '^c|vitamina c'],
            ['Infección, factores mecánicos, cuerpos extraños', 'Locales || Factores locales', 'local']
          ] },
          { t: 'Patología', hojas: [
            ['Exceso de colágeno que respeta los márgenes', 'Cicatriz hipertrófica', 'hipertrof'],
            ['Exceso de colágeno que no respeta los bordes', 'Queloide', 'queloide'],
            ['Tejido de granulación inadecuado', 'Dehiscencia y ulceración || Dehiscencia', 'dehiscenc'],
            ['Limitación del movimiento', 'Contractura || Contracturas', 'contractur']
          ] }
        ]
      },
      {
        id: 'fisio_factores', clase: 'Unidad 6', titulo: 'Factores de crecimiento en la curación', tipo: 'tabla', sl: [[6]],
        resumen: 'Algunos factores de la tabla 3-1 y su función principal.',
        fuente: 'Unidad 6 · Tabla 3-1: factores de crecimiento y citocinas de la regeneración y la curación',
        columnas: ['Factor', 'Función principal'],
        filas: [
          ['[[EGF::egf]] (crecimiento epidérmico)', 'Mitogénico para queratinocitos y fibroblastos; formación de tejido de granulación'],
          ['[[VEGF::vegf]] (endotelial vascular)', 'Aumenta la permeabilidad vascular; mitógeno endotelial; [[angiogenia::angiogen]]'],
          ['[[PDGF::pdgf]] (derivado de plaquetas)', 'Quimiotáctico para PMN, macrófagos y fibroblastos; contracción de la herida'],
          ['[[FGF::fgf]] (de fibroblastos)', 'Angiogenia, contracción de la herida y depósito de matriz'],
          ['[[TGF-β || TGF-B || TGF beta::tgf]]', 'Angiogenia y fibroplasia; inhibe las metaloproteinasas'],
          ['[[KGF::kgf]] (también llamado FGF-7)', 'Emigración, proliferación y diferenciación de queratinocitos']
        ]
      },

      /* ───────────── UNIDAD 7 · Shock (páginas del PDF) ───────────── */
      {
        id: 'fisio_shock_bases', clase: 'Unidad 7', titulo: 'Shock: definición y suministro de oxígeno', tipo: 'mapa', sl: [[7,2,8]],
        centro: 'Shock', sub: 'Hipoxia celular y tisular',
        fuente: 'Unidad 7 · Shock: definición, fisiopatología, determinantes del DO₂, gasto cardíaco y contenido arterial de O₂',
        ramas: [
          { t: 'Fisiopatología', hojas: [
            ['Sin oxígeno, la célula pasa al metabolismo…', 'Anaeróbico', 'anaerob'],
            ['El piruvato se convierte en…', 'Lactato', 'lactato'],
            ['Si la hipoxia no se revierte, la célula entra en…', 'Apoptosis', 'apoptos']
          ] },
          { t: 'Fórmulas', hojas: [
            ['DO₂ =', 'DC × CaO₂ || DC x CaO2 || DC × CaO2', 'dc;cao'],
            ['DC =', 'FC × DS || FC x DS', 'fc;ds'],
            ['Factores del débito sistólico', 'Precarga, poscarga y contractilidad', 'precarga;poscarga;contractil'],
            ['CaO₂ depende de Hb, SaO₂ y…', 'PaO₂ || PaO2', 'pao']
          ] },
          { t: 'Primer signo', hojas: [
            ['Primer signo del shock (inespecífico)', 'Taquicardia', 'taquicard']
          ] }
        ]
      },
      {
        id: 'fisio_shock_tipos', clase: 'Unidad 7', titulo: 'Tipos de shock y sus causas', tipo: 'tabla', sl: [[7,9,25]],
        resumen: 'Los cuatro tipos de la clasificación, qué falla en cada uno y sus causas.',
        fuente: 'Unidad 7 · Clasificación del shock: distributivo, cardiogénico, hipovolémico, obstructivo y mixto',
        columnas: ['Tipo', 'Qué falla', 'Causas de la clase'],
        filas: [
          ['[[Distributivo::distribut]]', 'Reducción de la [[resistencia vascular periférica || RVP::resistencia|rvp]]', 'Principal: [[sepsis::sepsis|septic]]; anafilaxia, neurogénico, insuficiencia suprarrenal, quemaduras graves'],
          ['[[Cardiogénico::cardiogen]]', 'Compromiso del [[gasto cardíaco::gasto|debito]], con RVP aumentada', 'Infarto agudo de miocardio, miocarditis, arritmias, valvulopatías'],
          ['[[Hipovolémico::hipovolem]]', 'Reducción de la [[precarga::precarga]]', 'Principal: [[hemorragia::hemorrag]]; pérdidas gastrointestinales, quemaduras, poliuria'],
          ['[[Obstructivo::obstruct]]', 'Obstrucción del flujo; falla del llenado [[diastólico::diastol]]', 'Neumotórax a tensión, taponamiento cardíaco, TEP masivo, disección aórtica'],
          ['[[Mixto::mixto]]', 'Más de un tipo a la vez', 'Insuficiencia cardíaca previa + shock [[séptico::septic]]']
        ]
      },
      {
        id: 'fisio_shock_hemo', clase: 'Unidad 7', titulo: 'Shock: tabla hemodinámica', tipo: 'tabla', sl: [[7,78,78]],
        resumen: 'La tabla de "Interpretación y conducta". Escribí alta o baja (o la flecha).',
        fuente: 'Unidad 7 · Interpretación y conducta: PCAP, índice cardíaco, RVS, PAM y PVC en cada shock',
        columnas: ['Shock', 'PCAP', 'IC', 'RVS', 'PAM', 'PVC'],
        filas: [
          ['Cardiogénico', UPf, DNm, UPf, DNf, UPf],
          ['Séptico', DNf, UPm, DNf, DNf, DNf],
          ['Hipovolémico', DNf, DNm, UPf, DNf, DNf],
          ['Obstructivo', DNf, DNm, UPf, DNf, UPf]
        ]
      },
      {
        id: 'fisio_shock_reglas', clase: 'Unidad 7', titulo: 'Shock: reglas para leer la tabla', tipo: 'mapa', sl: [[7,78,78]],
        centro: 'Interpretación', sub: 'Las cuatro reglas de la clase',
        fuente: 'Unidad 7 · Interpretación y conducta (reglas debajo de la tabla)',
        ramas: [
          { t: 'Reglas', hojas: [
            ['El único con PCAP elevada', 'Cardiogénico || Shock cardiogénico', 'cardiogen'],
            ['Causa clásica de shock con IC alto', 'Séptico || Shock séptico', 'septic'],
            ['Todo se reduce excepto la RVS', 'Hipovolémico || Shock hipovolémico', 'hipovolem'],
            ['El índice cardíaco es antagonista de la…', 'RVS || Resistencia vascular sistémica', 'rvs|resistencia']
          ] }
        ]
      },
      {
        id: 'fisio_shock_eval', clase: 'Unidad 7', titulo: 'Etapas y evaluación del shock', tipo: 'mapa', sl: [[7,26,37]],
        centro: 'Evaluación', sub: 'Primero, confirmar el shock',
        fuente: 'Unidad 7 · Etapas del shock, historia clínica, examen físico, cuadro clínico e índice de shock',
        ramas: [
          { t: 'Etapas', hojas: [
            ['Signos sutiles; actúan los mecanismos compensatorios', 'Compensado || Shock compensado || Pre-shock', 'compensad!descomp'],
            ['Fase crítica; manifestaciones evidentes', 'Descompensado || Shock descompensado', 'descompens'],
            ['Muerte tisular y disfunción orgánica', 'Irreversible || Shock irreversible', 'irrevers']
          ] },
          { t: 'Perfusión', hojas: [
            ['Hipotensión: PAM menor a…', '60 mmHg', '60'],
            ['Diuresis del hipoflujo renal', 'Menos de 0,5 ml/kg/h || < 0,5 ml/kg/h || <0,5 ml/kg/h', '0,5|0.5'],
            ['Llenado capilar que indica hipoperfusión', 'Más de 2 segundos || > 2 segundos || >2 seg', '2'],
            ['Órganos para buscar disfunción: SNC, riñones y…', 'Piel', 'piel']
          ] },
          { t: 'Índice de shock', hojas: [
            ['Relación entre…', 'FC y PAS || FC / PAS || FC/PAS', 'fc;pas'],
            ['Valores normales', '0,5 – 0,7 || 0,5 a 0,7 || 0,5-0,7', '0,5;0,7|0.5;0.7'],
            ['Marcador sensible para transfundir por encima de', '0,9 || 0.9', '0,9|0.9']
          ] }
        ]
      },
      {
        id: 'fisio_shock_examenes', clase: 'Unidad 7', titulo: 'Exámenes complementarios en el shock', tipo: 'mapa', sl: [[7,38,45]],
        centro: 'Exámenes', sub: 'Laboratorio, lactato, ECG y ecocardiograma',
        fuente: 'Unidad 7 · Exámenes de laboratorio, lactato, electrocardiograma y ecocardiograma',
        ramas: [
          { t: 'Laboratorio', hojas: [
            ['Apunta a síndrome coronario agudo', 'Troponina', 'troponin'],
            ['Shock sin causa evidente: sospechar…', 'Sepsis', 'sepsis'],
            ['Lactato aumentado', 'Más de 2 mmol/L || > 2 mmol/L || >2 mmol/L', '2'],
            ['El lactato es producto del metabolismo… de la glucosa', 'Anaeróbico', 'anaerob']
          ] },
          { t: 'ECG', hojas: [
            ['Patrón patognomónico de TEP', 'S1Q3T3', 's1q3t3'],
            ['QRS grande y pequeño alternados', 'Alternancia eléctrica', 'alternanc'],
            ['La alternancia eléctrica sugiere…', 'Taponamiento cardíaco', 'taponam']
          ] },
          { t: 'Ecocardiograma', hojas: [
            ['En el TEP inestable, la sobrecarga derecha comprime el…', 'Ventrículo izquierdo', 'ventriculo izquierd']
          ] }
        ]
      },
      {
        id: 'fisio_shock_tto', clase: 'Unidad 7', titulo: 'Tratamiento del shock', tipo: 'mapa', sl: [[7,46,67]],
        centro: 'Tratamiento', sub: 'Restablecer la perfusión tisular',
        fuente: 'Unidad 7 · Abordaje inicial, volemia, reanimación, drogas vasoactivas, oxigenación, transfusión y objetivos',
        ramas: [
          { t: 'Volemia', hojas: [
            ['Prueba de fluidorrespuesta en la cama', 'Elevación pasiva de miembros inferiores', 'elevacion pasiva|miembros inferiores'],
            ['PVC que indica hipovolemia', 'Menos de 5 mmHg || < 5 mmHg || <5 mmHg', '5'],
            ['DPP que indica hipovolemia', 'Más de 12% || > 12% || >12%', '12']
          ] },
          { t: 'Reanimación', hojas: [
            ['Cristaloides en el shock séptico', '30 mL/kg || 30 ml/kg', '30'],
            ['Cristaloides de elección', 'Ringer lactato y Plasma-Lyte || Soluciones equilibradas', 'ringer|plasma-lyte|equilibrad']
          ] },
          { t: 'Drogas vasoactivas', hojas: [
            ['Vasopresor de elección en la mayoría', 'Noradrenalina || Norepinefrina', 'noradrenal|norepinef'],
            ['De elección en el shock anafiláctico', 'Adrenalina || Epinefrina', '^adrenal|^epinef'],
            ['Único inotrópico disponible (cardiogénico)', 'Dobutamina', 'dobutamin'],
            ['Segundo fármaco en shock séptico; receptores V1', 'Vasopresina', 'vasopresin'],
            ['Uso principal: bradiarritmias inestables', 'Dopamina', 'dopamin']
          ] },
          { t: 'Metas', hojas: [
            ['Hemoglobina a mantener', 'Más de 7 g/dL || > 7 g/dL || >7 g/dl', '7'],
            ['Trauma (ATLS): plasma, hematíes y plaquetas', '1:1:1 || 1x1x1 || 1 x 1 x 1', '1:1:1|1x1x1|1 x 1 x 1'],
            ['Caída del lactato asociada a menor mortalidad', 'Al menos 20% || 20%', '20']
          ] }
        ]
      },
      {
        id: 'fisio_shock_monitor', clase: 'Unidad 7', titulo: 'Monitorización hemodinámica', tipo: 'mapa', sl: [[7,69,77]],
        centro: 'Monitorización', sub: 'Volemia y gasto cardíaco',
        fuente: 'Unidad 7 · Parámetros que evalúan la volemia (VVS, PCAP, PVC, VCI) y el gasto cardíaco',
        ramas: [
          { t: 'Volemia', hojas: [
            ['Cuanto mayor la VVS, más…', 'Hipovolémico', 'hipovolem'],
            ['Única forma de medir la PCAP', 'Catéter de Swan-Ganz || Swan-Ganz', 'swan'],
            ['La PCAP es marcador de…', 'Hipervolemia', 'hipervolem'],
            ['La PVC refleja la presión de la…', 'Aurícula derecha', 'auricula derech'],
            ['VCI en la hipovolemia: pequeña y con mucha…', 'Variación respiratoria', 'variac']
          ] },
          { t: 'Gasto cardíaco', hojas: [
            ['Gold standard para medirlo', 'Catéter de Swan-Ganz || Swan-Ganz', 'swan'],
            ['Índice cardíaco adecuado', 'Más de 2,5 L/min/m² || > 2,5 L/min/m² || 2,5 L/min/m²', '2,5|2.5']
          ] }
        ]
      },

      /* ───────────── UNIDAD 7 · Anemias (P2) ───────────── */
      {
        id: 'fisio_anemia_def', clase: 'Unidad 7 · Anemias', titulo: 'Anemia: definición y síndrome anémico', tipo: 'mapa', sl: [[8]],
        centro: 'Anemia', sub: 'Masa eritrocitaria insuficiente para oxigenar los tejidos',
        fuente: 'Anemias · Concentración de hemoglobina (OMS), síndrome anémico, hemograma y anemia aguda o crónica',
        ramas: [
          { t: 'Hb según la OMS', hojas: [
            ['Hombres adultos (15 años o más)', 'Menos de 13 g/dL || < 13 g/dL || <13 g/dL', '13'],
            ['Mujeres no embarazadas', 'Menos de 12 g/dL || < 12 g/dL || <12 g/dL', '12'],
            ['Mujeres embarazadas', 'Menos de 11 g/dL || < 11 g/dL || <11 g/dL', '11'],
            ['Niños de 6 a 59 meses', 'Menos de 11 g/dL || < 11 g/dL || <11 g/dL', '11']
          ] },
          { t: 'Clínica', hojas: [
            ['Palidez mucocutánea, disnea, cefalea, acúfenos, oligoanuria y anorexia', 'Síndrome anémico', 'sindrome anemic']
          ] },
          { t: 'Instauración', hojas: [
            ['Minutos, horas o pocos días; síntomas intensos e inmediatos', 'Aguda || Anemia aguda', 'agud'],
            ['Semanas, meses o años; actúan mecanismos de compensación', 'Crónica || Anemia crónica', 'cronic']
          ] },
          { t: 'Valores normales (nivel del mar)', hojas: [
            ['Hematocrito del hombre', '42 – 50% || 42-50% || 42 a 50%', '42;50'],
            ['Hematocrito de la mujer', '37 – 47% || 37-47% || 37 a 47%', '37;47']
          ] }
        ]
      },
      {
        id: 'fisio_anemia_clasif', clase: 'Unidad 7 · Anemias', titulo: 'Clasificación de las anemias', tipo: 'tabla', sl: [[8]],
        resumen: 'Criterio morfológico (VCM y HCM), etiopatogénico y grados de la OMS (Hb).',
        fuente: 'Anemias · Tipos de anemia: criterio morfológico y etiopatogénico; grados de la OMS',
        columnas: ['Criterio', 'Categoría', 'Valor'],
        filas: [
          ['VCM', '[[Microcítica || Microcíticas::microcit]]', 'Menos de 80 fL'],
          ['VCM', '[[Normocítica || Normocíticas::normocit]]', '80 – 100 fL'],
          ['VCM', '[[Macrocítica || Macrocíticas::macrocit]]', 'Más de 100 fL'],
          ['HCM', '[[Hipocrómica || Hipocrómicas::hipocrom]]', 'Menos de 28 pg'],
          ['HCM', '[[Normocrómica || Normocrómicas::normocrom]]', '28 – 32 pg'],
          ['HCM', '[[Hipercrómica || Hipercrómicas::hipercrom]]', 'Más de 32 pg'],
          ['Etiopatogenia', '[[Arregenerativas::arregener]]', 'Centrales'],
          ['Etiopatogenia', '[[Regenerativas::regener!arregen]]', 'Periféricas'],
          ['OMS (Hb)', 'Grado I', '[[10 – 13 || 10-13 || 10 a 13::10;13]]'],
          ['OMS (Hb)', 'Grado II', '[[8 – 9,9 || 8-9,9 || 8 a 9,9::8;9,9|8;9.9]]'],
          ['OMS (Hb)', 'Grado III', '[[6 – 7,9 || 6-7,9 || 6 a 7,9::6;7,9|6;7.9]]'],
          ['OMS (Hb)', 'Grado IV', '[[Menos de 6 || < 6 || <6::6]]']
        ]
      },
      {
        id: 'fisio_ferropenica', clase: 'Unidad 7 · Anemias', titulo: 'Anemia ferropénica', tipo: 'mapa', sl: [[8]],
        centro: 'Ferropénica', sub: 'Eritropoyesis deficiente por falta de hierro',
        fuente: 'Anemias · Anemia ferropénica: etiología, factores de riesgo, clínica, diagnóstico y tratamiento',
        ramas: [
          { t: 'Clínica específica', hojas: [
            ['Comer regularmente cosas que no son alimentos', 'Pica', 'pica'],
            ['Anemia ferropénica + disfagia + membranas esofágicas', 'Síndrome de Plummer-Vinson || Plummer-Vinson', 'plummer'],
            ['Color de las escleras', 'Azules || Escleras azules', 'azul']
          ] },
          { t: 'Laboratorio', hojas: [
            ['VCM', 'Microcitosis || Disminuido', 'microcit|dismin'],
            ['HCM', 'Hipocromía || Disminuida', 'hipocrom|dismin'],
            ['RDW (amplitud de distribución)', 'Aumentado', 'aument'],
            ['Ferritina', 'Disminuida', 'dismin'],
            ['Transferrina', 'Elevada', 'elevad|aument']
          ] },
          { t: 'Buscar la causa', hojas: [
            ['Mujer en edad fértil', 'Sangrado ginecológico || Buscar sangrado ginecológico', 'ginecolog'],
            ['Hombre menor de 40 años', 'Sangre oculta en heces || Test de sangre oculta en heces', 'sangre oculta'],
            ['Hombre mayor de 40 años o mujer no menstruante', 'Descartar sangrado digestivo y neoplasias', 'digestivo;neoplas']
          ] },
          { t: 'Tratamiento', hojas: [
            ['Hierro oral', '100–200 mg/día durante 3–6 meses || 100-200 mg/día durante 3-6 meses', '100;200'],
            ['Hierro parenteral si hay…', 'Intolerancia oral o malabsorción', 'intoleran|malabsorc']
          ] }
        ]
      },
      {
        id: 'fisio_megaloblastica', clase: 'Unidad 7 · Anemias', titulo: 'Anemias megaloblásticas: B12 y ácido fólico', tipo: 'tabla', sl: [[8]],
        resumen: 'Comparación entre el déficit de vitamina B12 y el de ácido fólico.',
        fuente: 'Anemias · Anemia megaloblástica por déficit de vitamina B12 (cobalamina) y de ácido fólico; prueba de Schilling',
        columnas: ['', 'Vitamina B12', 'Ácido fólico'],
        filas: [
          ['Fuente', '[[Animal::animal]]', 'Vegetal (y animal)'],
          ['Reserva', '[[3 a 6 años || 3-6 años || 3 – 6 años::3;6]]', '[[3 a 4 meses || 3-4 meses || 3 – 4 meses::3;4]]'],
          ['Absorción', '[[Íleon::ileon]]', '[[Duodeno y yeyuno::duodeno;yeyuno]]'],
          ['Causa más frecuente', '[[Anemia perniciosa::pernicios]]', '[[Alcoholismo::alcohol]]'],
          ['Clínica', 'Síndrome anémico + manifestaciones [[neurológicas::neurolog]]', 'Igual, pero sin síntomas neurológicos'],
          ['Diagnóstico', 'B12 baja; ácido [[metilmalónico::metilmalon]] y homocisteína aumentados; prueba de [[Schilling::schilling]]', 'Megaloblástica con B12 normal'],
          ['Tratamiento', 'B12 [[intramuscular || IM::intramusc|im]] de por vida + ácido fólico', 'Ácido fólico [[1 mg/día || 1 mg::1 mg]] VO; profilaxis en el embarazo']
        ]
      },
      {
        id: 'fisio_hemoliticas', clase: 'Unidad 7 · Anemias', titulo: 'Anemias hemolíticas', tipo: 'mapa', sl: [[8]],
        centro: 'Hemolíticas', sub: 'Destrucción de hematíes antes de los 120 días',
        fuente: 'Anemias · Síndrome hemolítico, hemólisis intra y extravascular, mecanismos, autoinmunes, HPN y células falciformes',
        ramas: [
          { t: 'Síndrome hemolítico', hojas: [
            ['Ictericia, esplenomegalia, urobilinógeno urinario aumentado y…', 'Reticulocitosis', 'reticulocit'],
            ['Cálculos biliares de…', 'Pigmento biliar || Pigmento', 'pigment']
          ] },
          { t: 'Lugar', hojas: [
            ['Hemoglobinemia, hemoglobinuria y hemosiderinuria', 'Intravascular', 'intravasc'],
            ['En los sinusoides del bazo; sin hemoglobinuria', 'Extravascular', 'extravasc']
          ] },
          { t: 'Mecanismo', hojas: [
            ['Esferocitosis, drepanocitosis, talasemias', 'Intracorpusculares', 'intracorpus'],
            ['Inmunológicas, malaria, fragmentación mecánica', 'Extracorpusculares', 'extracorpus']
          ] },
          { t: 'Autoinmunes', hojas: [
            ['Anticuerpos que reaccionan a 37 °C', 'Calientes || Anticuerpos calientes', 'caliente'],
            ['Se unen a 0–20 °C; hemólisis intravascular', 'Fríos || Anticuerpos fríos', 'frio'],
            ['Prueba diagnóstica', 'Antiglobulina directa || Coombs directo', 'antiglobulin|coombs']
          ] },
          { t: 'Otras', hojas: [
            ['HPN: mutación del gen…', 'PIG-A', 'pig-a|piga'],
            ['HPN: diagnóstico de elección (sin CD55 y CD59)', 'Citometría de flujo', 'citometr'],
            ['Falciforme: causa más frecuente de muerte en niños', 'Sepsis neumocócica', 'neumococ']
          ] }
        ]
      },
      {
        id: 'fisio_otras_anemias', clase: 'Unidad 7 · Anemias', titulo: 'Otras anemias y signos neurológicos', tipo: 'mapa', sl: [[8]],
        centro: 'Otras anemias', sub: 'Sideroblástica, aplásica, mieloptísica y perniciosa',
        fuente: 'Anemias · Sideroblástica, aplásica, mieloptísica, pancitopenia y signos de Romberg y Babinski',
        ramas: [
          { t: 'Sideroblástica', hojas: [
            ['Hierro depositado en las mitocondrias', 'Sideroblastos en anillo', 'sideroblast'],
            ['Tinción de la médula ósea', 'Azul de Prusia', 'prusia'],
            ['Tratamiento de la anemia', 'Vitamina B6 || Piridoxina', 'b6|piridox']
          ] },
          { t: 'Médula ósea', hojas: [
            ['Pancitopenia con médula hipocelular', 'Aplásica || Anemia aplásica', 'aplasic'],
            ['Tratamiento definitivo de la aplásica', 'Trasplante de médula ósea', 'trasplant'],
            ['Invasión de la médula por tejido anormal', 'Mieloptísica || Anemia mieloptísica', 'mieloptis'],
            ['Anemia + leucopenia + trombocitopenia', 'Pancitopenia', 'pancitopen']
          ] },
          { t: 'Perniciosa', hojas: [
            ['Proteína gástrica que falta', 'Factor intrínseco', 'factor intrinsec'],
            ['Firme con ojos abiertos, inestable con ojos cerrados', 'Signo de Romberg || Romberg', 'romberg'],
            ['Dedo gordo hacia arriba al raspar la planta', 'Signo de Babinski || Babinski', 'babinski']
          ] }
        ]
      },

      /* ───────────── Casos y simulado ───────────── */
      {
        id: 'fisio_casos_anemia', clase: 'Casos clínicos', titulo: 'Casos clínicos de anemia', tipo: 'casos',
        resumen: 'Los dos casos de la clase: Lucía (ferropénica) y la paciente de 58 años (megaloblástica).',
        fuente: 'Caso Clínico Anemia Ferropénica y Caso Clínico Anemia Megaloblástica Perniciosa (Dr. K. F.)',
        casos: [
          ['Lucía, 28 años, profesora. Astenia de 4 meses, mareos ortostáticos, menorragia (7 días, 6 a 8 compresas diarias) y dieta vegetariana estricta sin suplementos. Hb 8,2 g/dL, VCM 68 fL, HCM 21 pg.', '¿Cómo se clasifica la anemia?', 'b) Microcítica e hipocrómica', 'b',
           'VCM 68 fL (referencia 80–100: microcitosis) y HCM 21 pg (referencia 27–33: hipocromía).',
           ['a) Macrocítica y normocrómica', 'b) Microcítica e hipocrómica', 'c) Normocítica y normocrómica', 'd) Microcítica e hipercrómica']],
          ['La misma paciente refiere deseo compulsivo de masticar hielo desde hace 2 meses.', '¿Cómo se llama ese síntoma?', 'Pica', 'pica',
           'Comer regularmente cosas que no son alimentos; es un síntoma específico de ferropenia.'],
          ['Al examen: uñas en forma de cuchara en pulgares e índices.', '¿Cómo se llama el hallazgo?', 'Coiloniquia', 'coiloniq',
           'Las "uñas en cuchara" del examen regional del caso.'],
          ['Reticulocitos 0,8% (referencia 0,5–2,0%).', '¿Qué patrón tiene la anemia?', 'a) Arregenerativo', 'a',
           'El caso concluye: anemia microcítica e hipocrómica moderada, de patrón arregenerativo.',
           ['a) Arregenerativo', 'b) Regenerativo', 'c) Hemolítico', 'd) Megaloblástico']],
          ['Ferritina 6 ng/mL, hierro sérico 28 µg/dL, TIBC 450 µg/dL, saturación de transferrina 6,2%.', '¿Cuál es el diagnóstico etiológico?', 'c) Ferropénica por menorragia y déficit dietético', 'c',
           'Pérdidas ginecológicas excesivas + dieta vegetariana sin suplementación.',
           ['a) Anemia de las enfermedades crónicas', 'b) Talasemia menor', 'c) Ferropénica por menorragia y déficit dietético', 'd) Déficit de vitamina B12']],
          ['Se indica sulfato ferroso, 100 mg de hierro elemental por día.', '¿Con qué conviene tomarlo para favorecer la absorción?', 'd) Con una fuente de vitamina C', 'd',
           'En ayunas o 1 hora antes de comer, con vitamina C; evitar té, café, lácteos o antiácidos.',
           ['a) Con leche', 'b) Con café', 'c) Con antiácidos', 'd) Con una fuente de vitamina C']],
          ['Para controlar la respuesta al hierro oral.', '¿Cuándo se espera el pico de reticulocitos?', 'b) A los 7–10 días', 'b',
           'Pico reticulocitario a los 7–10 días; Hb a las 4 semanas (subir al menos 1–2 g/dL); mantener 3 a 6 meses tras normalizar.',
           ['a) A las 24 horas', 'b) A los 7–10 días', 'c) A los 3 meses', 'd) Al año']],
          ['Mujer de 58 años con fatiga, hormigueo en pies y manos, dificultad para caminar en la oscuridad, glositis atrófica e ictericia escleral leve. Hb 7,8 g/dL, VCM 112 fL.', '¿Cómo se clasifica la anemia por el VCM?', 'Macrocítica', 'macrocit',
           'VCM mayor a 100 fL: macrocitosis acentuada.'],
          ['La misma paciente: leucocitos 3.200/µL con neutrófilos hipersegmentados, plaquetas 110.000/µL, LDH elevada y bilirrubina indirecta aumentada; B12 130 pg/mL.', '¿Cuál es el diagnóstico?', 'a) Anemia megaloblástica por déficit de vitamina B12', 'a',
           'La LDH y la bilirrubina indirecta reflejan hemólisis intramedular; la B12 está baja.',
           ['a) Anemia megaloblástica por déficit de vitamina B12', 'b) Anemia ferropénica', 'c) Anemia hemolítica autoinmune', 'd) Anemia aplásica']],
          ['¿Por qué tiene síntomas neurológicos?', 'Elegí la explicación del caso', 'c) La B12 es esencial para mantener la mielina', 'c',
           'La falta de B12 altera la síntesis de ADN (megaloblastos) y el mantenimiento de la mielina.',
           ['a) Por la anemia intensa', 'b) Por la ictericia', 'c) La B12 es esencial para mantener la mielina', 'd) Por déficit de hierro']],
          ['Para confirmar o descartar anemia perniciosa.', '¿Qué anticuerpos se buscan?', 'b) Anticélulas parietales y antifactor intrínseco', 'b',
           'La anemia perniciosa es autoinmune: falta el factor intrínseco y no se absorbe la B12.',
           ['a) Antinucleares', 'b) Anticélulas parietales y antifactor intrínseco', 'c) Antitiroideos', 'd) Anti-DNA']]
        ]
      },
      {
        id: 'fisio_casos_shock', clase: 'Casos clínicos', titulo: 'Shock: ¿qué tipo es?', tipo: 'casos',
        resumen: 'Ejercicio de la clase: clasificá el shock según la causa.',
        fuente: 'Unidad 7 · Shock: ejercicio de clasificación y shock mixto',
        casos: [
          ['Taponamiento cardíaco: el líquido alrededor del corazón obstruye el paso de la sangre.', '¿Qué tipo de shock produce?', 'c) Obstructivo', 'c',
           'Es una de las causas clásicas de shock obstructivo.',
           ['a) Distributivo', 'b) Cardiogénico', 'c) Obstructivo', 'd) Hipovolémico']],
          ['Diarrea con pérdida importante de líquidos.', '¿Qué tipo de shock produce?', 'd) Hipovolémico', 'd',
           'La pérdida de líquidos compromete el volumen sanguíneo.',
           ['a) Distributivo', 'b) Cardiogénico', 'c) Obstructivo', 'd) Hipovolémico']],
          ['Anafilaxia con vasodilatación intensa.', '¿Qué tipo de shock produce?', 'a) Distributivo', 'a',
           'Mediada por IgE e histamina: cae la RVP.',
           ['a) Distributivo', 'b) Cardiogénico', 'c) Obstructivo', 'd) Hipovolémico']],
          ['Paciente con insuficiencia cardíaca previa que desarrolla sepsis.', '¿Qué tipo de shock tiene?', 'b) Mixto', 'b',
           'Componente distributivo (sepsis) + cardiogénico (descompensación por la demanda).',
           ['a) Solo distributivo', 'b) Mixto', 'c) Solo obstructivo', 'd) Hipovolémico']],
          ['Shock anafiláctico en la guardia.', '¿Qué fármaco es de elección?', 'b) Adrenalina', 'b',
           'La noradrenalina es de elección en la mayoría de los shocks, excepto en el anafiláctico.',
           ['a) Noradrenalina', 'b) Adrenalina', 'c) Dopamina', 'd) Fenilefrina']]
        ]
      },
      {
        id: 'simulado_fisio', clase: 'Unidades 0 a 7', titulo: 'Simulado de prueba: Fisiopatología I', tipo: 'casos', cronometro: true,
        resumen: 'Preguntas de opción múltiple de todas las unidades. Use el cronómetro y corrija al final.',
        fuente: 'Contenido de las Unidades 0 a 7 y Anemias (Dr. Feijó)',
        casos: [
          ['', '¿Quién es considerado el padre de la patología moderna?', 'c) Rudolf Virchow', 'c', 'Fundó la patología celular (1858).',
           ['a) Claude Bernard', 'b) Galeno', 'c) Rudolf Virchow', 'd) Vesalio']],
          ['', 'El término homeostasis fue acuñado por:', 'a) Walter Cannon', 'a', 'Claude Bernard desarrolló el concepto de milieu intérieur, su precursor.',
           ['a) Walter Cannon', 'b) Robert Koch', 'c) William Harvey', 'd) Hipócrates']],
          ['', 'La amplitud y la frecuencia respiratoria aumentadas se llaman:', 'd) Polipnea', 'd', 'Hiperpnea = amplitud aumentada; hipopnea = disminuida.',
           ['a) Hiperpnea', 'b) Hipopnea', 'c) Bradipnea', 'd) Polipnea']],
          ['', 'La cianosis periférica se caracteriza por:', 'b) Piel fría y mejoría con masaje o calor', 'b', 'La central tiene desaturación arterial y piel caliente.',
           ['a) Desaturación arterial y piel caliente', 'b) Piel fría y mejoría con masaje o calor', 'c) Afectar sobre todo la lengua', 'd) Aparecer con Hb reducida menor a 1 g/dL']],
          ['', 'El quinto signo cardinal de la inflamación, agregado por Virchow, es:', 'a) La pérdida de función', 'a', 'Celso describió rubor, tumor, calor y dolor.',
           ['a) La pérdida de función', 'b) El edema', 'c) La fiebre', 'd) La leucocitosis']],
          ['', 'El principal producto de las plaquetas, agregante y vasoconstrictor, es:', 'c) Tromboxano A2', 'c', 'La prostaciclina (PGI2) hace lo contrario.',
           ['a) Prostaciclina', 'b) Leucotrieno B4', 'c) Tromboxano A2', 'd) Lipoxina']],
          ['', 'Los AINE actúan inhibiendo:', 'b) La ciclooxigenasa', 'b', 'Bloquean la síntesis de prostaglandinas y tromboxano.',
           ['a) La lipoxigenasa', 'b) La ciclooxigenasa', 'c) La histaminasa', 'd) El factor de Hageman']],
          ['', 'La inflamación con pus, como en la apendicitis aguda, es:', 'd) Purulenta o supurativa', 'd', 'Una acumulación localizada de pus es un absceso.',
           ['a) Serosa', 'b) Fibrinosa', 'c) Seudomembranosa', 'd) Purulenta o supurativa']],
          ['', 'El granuloma tuberculoso tiene células gigantes de:', 'a) Langhans', 'a', 'Rodeando una zona central de necrosis, con células epitelioides y linfocitos.',
           ['a) Langhans', 'b) Reed-Sternberg', 'c) Kupffer', 'd) Purkinje']],
          ['', 'La sustitución de una célula adulta por otra adulta más resistente es:', 'b) Metaplasia', 'b', 'Se considera lesión preneoplásica si el estímulo persiste.',
           ['a) Displasia', 'b) Metaplasia', 'c) Hiperplasia', 'd) Atrofia']],
          ['', 'La necrosis típica del infarto de miocardio es:', 'c) Coagulativa', 'c', 'Por isquemia; conserva el perfil celular durante días.',
           ['a) Licuefactiva', 'b) Caseosa', 'c) Coagulativa', 'd) Grasa']],
          ['', 'La fragmentación del núcleo en la necrosis se llama:', 'a) Cariorrexis', 'a', 'Picnosis = retracción; cariolisis = disolución.',
           ['a) Cariorrexis', 'b) Picnosis', 'c) Cariolisis', 'd) Apoptosis']],
          ['', 'La hemorragia con salida abundante e intermitente de sangre roja brillante es:', 'b) Arterial', 'b', 'La venosa es roja oscura y más fácil de controlar.',
           ['a) Venosa', 'b) Arterial', 'c) Capilar', 'd) Exteriorizada']],
          ['', 'La única hemorragia exteriorizada que no hay que intentar detener es:', 'd) La otorragia', 'd', 'Si no sale, se acumula dentro del cráneo.',
           ['a) La epistaxis', 'b) La hemoptisis', 'c) La hematemesis', 'd) La otorragia']],
          ['', 'El edema de la insuficiencia cardíaca, la cirrosis y el síndrome nefrótico se produce con:', 'a) Hipovolemia arterial efectiva y retención hidrosalina secundaria', 'a', 'La hipervolemia con retención primaria es la de la insuficiencia renal y la glomerulonefritis.',
           ['a) Hipovolemia arterial efectiva y retención hidrosalina secundaria', 'b) Hipervolemia y retención primaria', 'c) Obstrucción linfática', 'd) Aumento de la permeabilidad']],
          ['', 'Un edema que deja depresión de hasta 6 mm y se recupera en hasta 1 minuto es grado:', 'c) III', 'c', 'II: hasta 4 mm y 15 s; IV: hasta 1 cm y 2 a 5 minutos.',
           ['a) I', 'b) II', 'c) III', 'd) IV']],
          ['', 'El edema que no deja fóvea, por hipotiroidismo, es:', 'b) Mixedema', 'b', 'Acumulación de mucopolisacáridos; piel seca, pálida y fría.',
           ['a) Linfedema', 'b) Mixedema', 'c) Anasarca', 'd) Lipedema']],
          ['', 'La tríada de Beck del taponamiento cardíaco incluye:', 'a) Hipofonesis cardíaca, hipotensión y turgencia yugular', 'a', 'Se compromete el llenado diastólico.',
           ['a) Hipofonesis cardíaca, hipotensión y turgencia yugular', 'b) Fiebre, ictericia y dolor', 'c) Hipertensión, bradicardia y bradipnea', 'd) Disnea, tos y hemoptisis']],
          ['', 'La cicatriz con exceso de colágeno que NO respeta los bordes de la herida es:', 'd) El queloide', 'd', 'La cicatriz hipertrófica respeta los márgenes.',
           ['a) La contractura', 'b) La dehiscencia', 'c) La cicatriz hipertrófica', 'd) El queloide']],
          ['', 'El primer signo del shock, aunque inespecífico, es:', 'b) La taquicardia', 'b', 'Respuesta compensatoria para mantener el gasto cardíaco.',
           ['a) La hipotensión', 'b) La taquicardia', 'c) La oliguria', 'd) La cianosis']],
          ['', 'El único shock con PCAP elevada es el:', 'c) Cardiogénico', 'c', 'En el hipovolémico todo se reduce excepto la RVS.',
           ['a) Séptico', 'b) Hipovolémico', 'c) Cardiogénico', 'd) Obstructivo']],
          ['', 'El vasopresor de elección en la mayoría de los shocks es:', 'a) Noradrenalina', 'a', 'Excepto en el anafiláctico, donde es la adrenalina.',
           ['a) Noradrenalina', 'b) Dopamina', 'c) Fenilefrina', 'd) Vasopresina']],
          ['', 'Según la OMS, hay anemia en una mujer no embarazada con Hb menor a:', 'b) 12 g/dL', 'b', 'Hombres: 13; embarazadas y niños de 6 a 59 meses: 11.',
           ['a) 11 g/dL', 'b) 12 g/dL', 'c) 13 g/dL', 'd) 14 g/dL']],
          ['', 'La causa más frecuente de déficit de vitamina B12 es:', 'd) La anemia perniciosa', 'd', 'La del ácido fólico es el alcoholismo.',
           ['a) El alcoholismo', 'b) El embarazo', 'c) La dieta rica en carne', 'd) La anemia perniciosa']],
          ['', 'La hemólisis con hemoglobinemia, hemoglobinuria y hemosiderinuria es:', 'a) Intravascular', 'a', 'La extravascular ocurre en el bazo, sin hemoglobinuria.',
           ['a) Intravascular', 'b) Extravascular', 'c) Medular', 'd) Hepática']]
        ]
      }
    ]
  };
})();
