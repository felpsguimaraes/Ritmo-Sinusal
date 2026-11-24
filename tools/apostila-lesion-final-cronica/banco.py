"""SINUS · banco da Anatomía Patológica I: questões de inflamação crônica, granulomas, reparação e adaptação.

Uso (na raiz do repo):  python3 tools/apostila-lesion-final-cronica/banco.py
Reescreve aulas/lesion/p2/dados.js. Idempotente: tira as questões marcadas por este script ("fc": 1) e põe de novo.

Fontes: Examen Final 21/02/2024 (foto págs. 1–4 e transcrição digitada págs. 104–110, numeração da transcrição),
1º Parcial (págs. 99–103), P1 Turma C (págs. 83–86) e 1º Parcial + Recuperatoria (págs. 87–89) do PDF das provas antigas.
As respostas vêm do negrito das transcrições; onde não há negrito, a nota (nt) diz de onde saiu a resposta."""
import json, os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ARQ = os.path.join(REPO, 'aulas/lesion/p2/dados.js')
PRE = 'window.SINUSAL_P2_DADOS='

F24T = {'id': 'f24t', 'titulo': 'Examen Final 21/02/2024 · transcrição',
        'sub': 'Transcrição digitada com respostas em negrito (págs. 104–110), na numeração dela: inflamação crônica, granulomas, reparação, adaptação e a de mediadores. Na foto da folha (págs. 1–4) as mesmas questões têm outro número.',
        'pags': '104–110'}

def mc(p, n, tema, q, o, ok, w, nt=None):
    d = {'p': p, 'n': n, 't': 'mc', 'tema': tema, 'q': q, 'o': o, 'ok': [ok], 'w': w}
    if nt: d['nt'] = nt
    return d

def ct(p, n, t, tema, q, a, e, nt=None):
    d = {'p': p, 'n': n, 't': t, 'tema': tema, 'q': q, 'a': a, 'e': e}
    if nt: d['nt'] = nt
    return d

NOVAS = [
    # ---------------- Final 2024, transcrição digitada ----------------
    ct('f24t', 2, 'cita', 'cro', 'Dos anomalías por formación excesiva de componentes que participan en la reparación de los tejidos:',
       'Cicatriz hipertrófica y queloide.',
       'Excesso de colágeno: a hipertrófica fica elevada dentro dos limites da ferida; o queloide passa das bordas e não regride. Excrecências carnosas (excesso de tecido de granulação) também são excesso de reparo.',
       'Na folha: "Anomalías por formación excesiva…", com duas linhas (a, b). A transcrição responde "cicatrices hipertróficas y cicatrices queloides".'),
    ct('f24t', 3, 'cita', 'cro', 'Dos enfermedades granulomatosas no necrosantes:',
       'Sarcoidosis y enfermedad de Crohn (la lepra también es correcta).',
       'Qualquer duas de três: sarcoidose, doença de Crohn e lepra dão granulomas não caseosos (o de corpo estranho também não necrosa). O slide dela destaca Crohn e sarcoidose.',
       'Na folha são duas linhas (a, b); a transcrição lista as três, e qualquer duas servem.'),
    ct('f24t', 4, 'cita', 'cro', 'Dos enfermedades granulomatosas necrosantes:',
       'Tuberculosis y sífilis.',
       'Tuberculose: necrose caseosa central. Sífilis: goma, com células centrais necróticas que conservam o contorno.',
       'Só na transcrição digitada; não aparece na foto da folha.'),
    ct('f24t', 9, 'comp', 'les', 'La proliferación del epitelio glandular endometrial en una mujer embarazada es un ejemplo de ________ que ocurre como respuesta a estímulos hormonales.',
       'Hiperplasia fisiológica.',
       'Estímulo hormonal normal = hiperplasia fisiológica hormonal. Por excesso de estrogênio seria patológica.',
       'Na foto da folha é a questão 7.'),
    ct('f24t', 10, 'comp', 'cro', 'Las células ________ presentan un citoplasma granular rosado con bordes celulares no diferenciados que corresponden a células derivadas de ________.',
       'Epitelioides; macrófagos activados.',
       'A célula epitelioide é o macrófago ativado do granuloma: citoplasma granular rosado e limites pouco definidos.',
       'Na foto da folha é a questão 8.'),
    ct('f24t', 13, 'cita', 'cro', 'Hombre de 43 años presenta tos crónica y fiebre de 1 mes de evolución. Una muestra de biopsia transbronquial revela infiltrados intersticiales con linfocitos, células plasmáticas y macrófagos activados. ¿Cuál de los mediadores químicos es más importante en la activación de los macrófagos?',
       'Interferón gamma.',
       'Inflamação crônica (mononucleares). O linfócito T colaborador 1 libera interferón gamma, que ativa o macrófago pela via clássica.',
       'Na foto da folha é a questão 11, com a resposta "Interferón γ". Escreva por extenso.'),
    mc('f24t', 15, 'cro', 'En el proceso de curación, una incisión quirúrgica limpia no infectada es una lesión que se cura por:',
       ['Primera intención', 'Segunda intención', 'Regeneración epitelial', 'Sin fibrosis'], 0,
       ['Incisão limpa, sem infecção e com bordas aproximadas: primeira intenção.',
        'Segunda intenção é para perdas extensas: feridas grandes, abscessos, úlceras, infartos.',
        'A epiderme regenera, mas a derme cicatriza; a cura não é só regeneração.',
        'Mesmo a primeira intenção deixa uma pequena cicatriz de colágeno.'],
       'Na foto da folha é a questão 14.'),
    mc('f24t', 16, 'cro', 'Son características histológicas de la inflamación crónica:',
       ['Presencia de neutrófilos y macrófagos', 'Aumento de permeabilidad vascular', 'Vasodilatación y estasis sanguínea', 'Proliferación de pequeños vasos sanguíneos'], 3,
       ['Neutrófilo é a marca da aguda; na crônica predominam mononucleares.',
        'Aumento de permeabilidade é mudança vascular da aguda.',
        'Vasodilatação e estase são da aguda.',
        'Angiogenia faz parte da tentativa de cura da crônica; é a única mudança vascular dela.'],
       'Na foto da folha é a questão 15 ("histológicas"); a transcrição escreveu "biológicas".'),
    mc('f24t', 19, 'les', 'De acuerdo a la capacidad de proliferación, las células de la médula ósea se clasifican como:',
       ['Lábiles', 'Estables', 'Permanentes', 'Transitorios'], 0,
       ['Medula óssea, linfonodos e epitélios de pele e mucosas se dividem continuamente.',
        'Estáveis ficam em repouso e só se dividem depois de lesão: fígado, rim, pâncreas, endotélio, fibroblastos, músculo liso.',
        'Permanentes não se dividem: neurônios, músculo cardíaco e esquelético.',
        '"Transitorios" não é categoria de proliferação.'],
       'Na foto da folha é a questão 18.'),
    mc('f24t', 22, 'les', '¿Qué cambios podríamos observar en un corazón hipertrofiado?',
       ['Aumento del peso del órgano debido a nuevas células', 'Mayor tamaño celular debido a la acumulación de líquido intracitoplasmático',
        'Aumento de proteínas contráctiles intracitoplasmáticas', 'Menor consumo de oxígeno para realizar el mismo trabajo que el corazón normal'], 2,
       ['Células novas seria hiperplasia; o miocárdio é permanente e só hipertrofia.',
        'Água dentro da célula é tumefação celular (lesão reversível), não adaptação.',
        'Slide: "más síntesis de proteínas y aumento de número de miofilamentos".',
        'Há mais músculo para nutrir e os capilares não acompanham; o coração hipertrofiado fica mais sujeito à isquemia.'],
       'Na foto da folha é a questão 21.'),
    mc('f24t', '22b', 'cro', 'Hombre de 24 años con apendicitis aguda se somete a la extirpación quirúrgica del apéndice inflamado. La incisión se sutura. La microscopía óptica muestra un corte de la zona con tinción tricrómica: el colágeno abundante está teñido de azul. ¿Cuánto tiempo después de la cirugía sería más probable observar esto?',
       ['1 día', '4–5 días', '1 mes'], 2,
       ['No 1º dia há coágulo e neutrófilos; ainda não há colágeno.',
        'Aos 3–5 dias o achado é tecido de granulação (vasos no máximo, fibroblastos ativos), com pouco colágeno maduro. Na foto essa opção está circulada por um aluno.',
        'O colágeno se acumula na 2ª semana e a cicatriz está formada na 4ª: colágeno denso, que o tricrômico cora de azul.'],
       'Sem gabarito oficial no material: a transcrição repete o número 22 e não marca resposta, e na foto (questão 22) "4–5 días" está circulado com a nota "por causa do tejido de granulación". A resposta aqui segue a cronologia do Robbins (cap. 3).'),
    mc('f24t', 23, 'les', 'Hombre de 71 años tiene dificultad para orinar. Su retención urinaria provoca numerosos viajes al baño. En el tacto rectal la próstata está agrandada de forma difusa. ¿Cuál de los siguientes representa un cambio patológico que conduce al problema de este hombre?',
       ['Displasia in situ', 'Hipertrofia mioepitelial', 'Hiperplasia glandular'], 2,
       ['Displasia é lesão precursora de câncer; não explica um aumento difuso.',
        'Não é a adaptação da próstata do idoso.',
        'Hiperplasia prostática benigna: hiperplasia glandular por ação dos andrógenos.'],
       'Na foto da folha é a questão 24.'),
    ct('f24t', 28, 'cita', 'cro', 'Citar dos características de la inflamación crónica:',
       'Infiltración por células mononucleares (macrófagos, linfocitos y células plasmáticas); intentos de curación (angiogenia: proliferación de pequeños vasos sanguíneos).',
       'Slide dela: 1) infiltrado de células mononucleares; 2) destruição dos tecidos; 3) tentativas de cura por angiogenia e fibrose. A transcrição respondeu com a 1ª e a 3ª.',
       'Só na transcrição digitada.'),
    ct('f24t', 31, 'cita', 'cro', 'Cite las diferencias del tejido de granulación y cicatriz:',
       'Tejido de granulación: angiogénesis, colágeno tipo III, fibroblastos activos; cicatriz: desvascularización, colágeno tipo I, fibroblastos inactivos.',
       'Granulação é o tecido jovem do reparo (3–5 dias): muitos vasos novos e fibroblastos trabalhando. A cicatriz é madura, pálida e avascular.',
       'Só na transcrição digitada.'),
    ct('f24t', '33b', 'cita', 'cro', 'Anomalías causadas por deficiencias de la cicatrización:',
       'Úlceras y dehiscencia de la herida.',
       'Robbins: pouco tecido de granulação ou colágeno mal remodelado levam à deiscência (a ferida se abre) ou à ulceração.',
       'Só na transcrição digitada, que repete o número 33 ("deformidades da cicatrização").'),
    ct('f24t', 35, 'cita', 'cro', 'Caso clínico: úlceras y abscesos cicatrizan por:',
       'Segunda intención.',
       'Perda extensa de tecido: mais inflamação, muito tecido de granulação e contração por miofibroblastos.',
       'Só na transcrição digitada.'),
    # ---------------- 1º Parcial (págs. 99–103) ----------------
    ct('par1', 5, 'cita', 'les', 'En una hepatectomía parcial, se inicia un estímulo por factores de crecimiento, lo que conduce a un aumento de tamaño del hígado. Proceso adaptativo que corresponde a:',
       'Hiperplasia fisiológica compensatoria.',
       'O hepatócito é estável: volta a se dividir quando o fígado perde massa. Slide: hiperplasia fisiológica compensadora (hepatectomia parcial).'),
    mc('par1', 13, 'les', 'Los tejidos que tienen capacidad de crecimiento hiperplásico y se clasifican como lábiles corresponden a:',
       ['Músculo esquelético, túbulos renales y ácinos pancreáticos', 'Células de la médula ósea, ganglios linfáticos y epidermis',
        'Tejido de granulación, cerebro y médula suprarrenal', 'Folículos tiroideos, células endoteliales y hepatocitos'], 1,
       ['Músculo esquelético é permanente; túbulos renais e ácinos pancreáticos são estáveis.',
        'Slide dela: lábeis = epitélio de pele e mucosas, medula óssea e linfonodos.',
        'Tecido de granulação não é categoria; cérebro (neurônios) é permanente.',
        'São todas estáveis.']),
    mc('par1', 17, 'les', 'El engrosamiento de la pared ventricular cardíaca en un paciente con valvulopatía aórtica es un ejemplo de ______ y ocurre por ______:',
       ['Hipertrofia patológica, aumento de volumen celular', 'Hiperplasia patológica, aumento de volumen celular',
        'Hipertrofia fisiológica, aumento de número de células', 'Hiperplasia compensatoria, aumento del número de células'], 0,
       ['Sobrecarga hemodinâmica crônica (valvopatia) → hipertrofia patológica: células maiores.',
        'Hiperplasia é aumento do número; e o miocárdio é permanente.',
        'Valvopatia não é estímulo fisiológico, e hipertrofia não aumenta o número de células.',
        'O miocárdio não faz hiperplasia.']),
    # ---------------- P1 Turma C (págs. 83–86) ----------------
    ct('p1c', 11, 'cita', 'les', 'Mujer de 53 años, sin antecedentes de interés, va a su médico para una revisión rutinaria; presenta una presión arterial de 150/95 y hallazgos electrocardiográficos sugestivos de cardiomegalia.',
       'Síntesis de proteínas aumentada.',
       'Hipertensão → sobrecarga de pressão → hipertrofia do ventrículo esquerdo: mais proteínas contráteis e miofilamentos, sem divisão celular.',
       'Questão de quadro de opções: falla de bomba de sodio y potasio, síntesis de proteínas aumentadas, piroptosis, presencia de citocromo c, colesterol LDL bajo, gangrena seca, necrosis caseosa, división celular aumentada.'),
    mc('p1c', 13, 'les', 'Los tejidos que tienen capacidad de crecimiento hiperplásico y se clasifican como estables:',
       ['Músculo esquelético, túbulos renales y ganglios linfáticos', 'Músculo cardíaco, ácinos pancreáticos y epidermis',
        'Tejido cicatricial, cerebro y médula suprarrenal', 'Folículos tiroideos, células endoteliales y hepatocitos'], 3,
       ['Músculo esquelético é permanente e linfonodo é lábil.',
        'Músculo cardíaco é permanente e epiderme é lábil.',
        'Tecido cicatricial não é categoria; cérebro é permanente.',
        'Slide dela: estáveis = tireoide, células endoteliais, fígado (e rim, pâncreas, fibroblastos, músculo liso).'],
       'A transcrição não marca a resposta; a certa sai do slide de hiperplasia (células estables).'),
    # ---------------- 1º Parcial + Recuperatoria (págs. 87–89) ----------------
    mc('par1r', 13, 'les', 'Los tejidos que tienen la capacidad de crecimiento hiperplásico y se clasifican como estables corresponden a:',
       ['Músculo esquelético, ácinos pancreáticos', 'Músculo liso, hepatocitos', 'Células de la médula ósea, epidermis', 'Tejido de granulación, cerebro'], 1,
       ['Músculo esquelético é permanente.',
        'Músculo liso e hepatócito são estáveis.',
        'Medula óssea e epiderme são lábeis.',
        'Tecido de granulação não é categoria; cérebro é permanente.']),
    mc('par1r', 18, 'les', 'Una mujer de 22 años está embarazada. En la ecografía fetal de 13 semanas el útero mide 7 × 4 × 3 cm. En el parto a término, el útero mide 34 × 18 × 12 cm. ¿Cuál de los siguientes procesos celulares ha contribuido al incremento de tamaño del útero?',
       ['Hipertrofia del músculo liso uterino', 'Hipertrofia del estroma endometrial', 'Hiperplasia del endotelio vascular', 'Hiperplasia atípica del endometrio'], 0,
       ['Slide dela: hipertrofia fisiológica do útero (fibras musculares lisas) por estímulo estrogênico.',
        'O que cresce é o miométrio, não o estroma endometrial.',
        'Não é o que aumenta o órgão.',
        'Hiperplasia atípica é lesão patológica.']),
]
for q in NOVAS:
    q['fc'] = 1

CRO_NT_VELHA = 'Inflamação crônica, fora dos slides atuais.'
CRO_NT_NOVA = 'Inflamação crônica e granulomas: slide da Clase 10 (inflamación crónica).'
SUB = {
    'par1': ('só as questões de necrose, apoptose e acumulação', 'questões de necrose, apoptose, acumulação e adaptação'),
    'p1c': ('só as questões de necrose, apoptose e acumulação', 'questões de necrose, apoptose, acumulação e adaptação'),
    'par1r': ('só as questões de necrose, apoptose e acumulação', 'questões de necrose, apoptose, acumulação e adaptação'),
}


def main():
    s = open(ARQ, encoding='utf-8').read()
    assert s.startswith(PRE)
    corpo = s[len(PRE):].rstrip('\n')
    fim = ';' if corpo.endswith(';') else ''
    D = json.loads(corpo[:-1] if fim else corpo)

    D['qs'] = [q for q in D['qs'] if not q.get('fc')]
    D['fontes'] = [f for f in D['fontes'] if f['id'] != 'f24t']
    chaves = {(q['p'], q['n']) for q in D['qs']}
    for q in NOVAS:
        assert (q['p'], q['n']) not in chaves, ('número já usado', q['p'], q['n'])
    # f24t logo depois do final24
    i = next(k for k, f in enumerate(D['fontes']) if f['id'] == 'final24')
    D['fontes'].insert(i + 1, dict(F24T))
    for q in D['qs']:
        if q.get('nt') == CRO_NT_VELHA:
            q['nt'] = CRO_NT_NOVA
        # a de mediadores tinha o mesmo número (20) da de leiomiossarcoma e nunca aparecia nos quadros de treino
        if q['p'] == 'final24' and q['n'] == 20 and q['tema'] == 'inf':
            q['p'], q['n'] = 'f24t', 21
            q['nt'] = 'Na foto da folha é a questão 20; aqui vai com o número da transcrição (21) para não colidir com a nº 20 de leiomiossarcoma.'
    # novas no fim de cada prova, na ordem do número
    D['qs'].extend(NOVAS)
    for f in D['fontes']:
        if f['id'] in SUB:
            a, b = SUB[f['id']]
            f['sub'] = f['sub'].replace(a, b)
        f['n'] = sum(1 for q in D['qs'] if q['p'] == f['id'])
    pag = next(p for p in D['paginas'] if p.get('g', '').startswith('Examen Final'))
    assert any(x['p'] == 104 for x in pag['pages'])
    open(ARQ, 'w', encoding='utf-8').write(PRE + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + fim + '\n')
    print(f'dados.js: {len(NOVAS)} questões novas, total {len(D["qs"])}')


if __name__ == '__main__':
    main()
