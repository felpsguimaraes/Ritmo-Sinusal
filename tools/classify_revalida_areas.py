#!/usr/bin/env python3
"""Classifica por grande área do Revalida (Portaria Inep 540/2020) as questões sem área.

Áreas: Clínica Médica, Cirurgia, Ginecologia e Obstetrícia, Pediatria,
Medicina de Família e Comunidade.

- Regras por palavras-chave + idade do paciente; nada é inventado no texto.
- Áreas já atribuídas manualmente são preservadas (area_source='manual').
- As automáticas recebem area_source='auto' e area_confidence ('alta'|'media'|'baixa').
- Atualiza o bank-data embutido em sinus/revalida-treino.html e sinus/revalida/banco-revisao.json.

Uso: python3 tools/classify_revalida_areas.py [--dry-run]
Depois: python3 tools/build_revalida.py (copia para sinus/revalida/index.html).
"""
import json, re, sys, unicodedata
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'sinus'
HTML = ROOT / 'revalida-treino.html'
BANK = ROOT / 'revalida' / 'banco-revisao.json'

CM, CIR, GO, PED, MFC = ('Clínica Médica', 'Cirurgia', 'Ginecologia e Obstetrícia',
                         'Pediatria', 'Medicina de Família e Comunidade')


def norm(t):
    t = unicodedata.normalize('NFD', str(t or '').lower())
    return ''.join(c for c in t if unicodedata.category(c) != 'Mn')


# (regex sobre texto normalizado sem acento, peso)
RULES = {
    PED: [
        (r'\blactente', 4), (r'recem[- ]nascid', 4), (r'\brn\b', 3), (r'neonat', 4), (r'\bcrianca', 3),
        (r'\bmenin[oa]\b', 3), (r'pre-?escolar', 3), (r'puericultura', 4), (r'aleitamento', 3),
        (r'dias de vida', 4), (r'\bpediatr', 3), (r'apgar', 2), (r'caderneta da crianca', 4),
        (r'teste do pezinho|triagem neonatal', 4), (r'curva de crescimento|escore z|percentil', 2),
        (r'bronquiolite|coqueluche|sarampo|varicela|exantema subito|mao-pe-boca|kawasaki', 2),
        (r'desidratacao', 1), (r'fontanela', 3), (r'adolescente', 2), (r'\bberco|\bcreche', 2),
    ],
    GO: [
        (r'gestant|gestacao|gravid(a|as|ez)\b|gestacional', 4), (r'pre-?natal', 4), (r'\bparto\b|parturiente', 4),
        (r'puerper', 4), (r'semanas de (gestacao|idade gestacional)|\big\b', 3), (r'obstetr', 4),
        (r'cesar', 3), (r'eclampsia|pre-?eclampsia|placent|aborto|abortamento|ectopica', 4),
        (r'\butero|uterin|endometr|miometr|mioma', 3), (r'\bovari|anexial', 3),
        (r'amenorre|menarca|ciclos? menstrua|sangramento vaginal|sangramento uterino|dismenorre|menorragia', 3), (r'menstru', 1),
        (r'menopausa|climateri', 3), (r'contracep|anticoncepc|\bdiu\b|laqueadura', 3),
        (r'colo do utero|colpo|papanicolau|citopatologico|\bnic\b|\bhpv\b', 3),
        (r'vulv|vaginose|candidiase vulvovaginal|corrimento vaginal(?! ou)', 3), (r'vagin', 1),
        (r'mamografia|\bmama\b|mamas\b|mamaria|nodulo mamario|birads|bi-rads', 3),
        (r'infertilidade|ovulac|sindrome dos ovarios', 3), (r'ginecolog', 3), (r'trabalho de parto', 4),
        (r'batimentos cardiacos fetais|\bbcf\b|cardiotocograf|\bfet(o|os|al|ais)\b', 3), (r'g\d+\s*p\d+', 3),
    ],
    CIR: [
        (r'pos-?operatori|pre-?operatori|intraoperatori', 4), (r'cirurgi', 3), (r'laparotomia|laparoscopi', 4),
        (r'apendic', 4), (r'colecist|colelitiase|coledoco|vesicula biliar', 3), (r'hernia|herniorrafia', 4),
        (r'trauma|politrauma|atls|\bxabcde|\babcde', 4), (r'ferimento|arma de fogo|arma branca|facada|\bpaf\b', 4),
        (r'queimadura|queimado', 4), (r'abdome agudo|obstrucao intestinal|volvo|isquemia mesenterica', 4),
        (r'fratura|luxacao|ortoped', 3), (r'\bqueda (de|da|do) (escada|altura|telhado|laje|moto|bicicleta|cavalo)|caiu (da|de|do) |junto a (uma )?escada|traumatismo cranio|\btce\b', 3), (r'acidente (automobilistico|de transito|de moto|motociclist)|atropelad|colisao|capotamento', 4),
        (r'pneumotorax|hemotorax|torax instavel|tamponamento', 3), (r'choque hemorragico|hemorragia', 2),
        (r'anestesi', 3), (r'drenagem|dreno', 2), (r'hemorroid|fissura anal|fistula|abscesso perianal', 3),
        (r'oclusao arterial|isquemia aguda de membro|aneurisma', 3), (r'\bfast\b|e-?fast', 3),
        (r'intubacao orotraqueal|via aerea definitiva|cricotireoid', 2), (r'glasgow', 1),
        (r'diverticulite|perfuracao', 2), (r'incisao|sutura|bisturi|cicatriza', 2),
    ],
    MFC: [
        (r'unidade basica|\bubs\b|estrategia (de )?saude da familia|\besf\b|atencao (primaria|basica)|unidade de saude da familia', 2),
        (r'agente comunitari|\bacs\b|nasf|e-?multi|matriciament', 3), (r'medic[oa] de familia', 3),
        (r'\bsus\b|lei (n\.?o? ?)?8\.?080|lei (n\.?o? ?)?8\.?142|conselho (municipal|local|nacional) de saude', 4),
        (r'epidemiolog', 4), (r'incidencia|prevalencia|letalidade|coeficiente|taxa de mortalidade|indicador', 3),
        (r'especificidade|valor preditivo|razao de verossimilhanca|curva roc|sensibilidade (e|de|do teste|do exame)', 4),
        (r'coorte|caso-?controle|ensaio clinico|estudo transversal|metanalise|meta-analise|vies|risco relativo|odds|\bnnt\b', 4),
        (r'vigilancia|notificacao compulsoria|notificar|surto|epidemia|endemi', 3),
        (r'territori|adscri|visita domiciliar|genograma|ecomapa|projeto terapeutico singular|\bpts\b', 3),
        (r'prevencao quaternaria|rastreament', 3), (r'saude do trabalhador|acidente de trabalho|\bcat\b|ocupacional', 3),
        (r'saude indigena|\bdsei\b|comunidade quilombola|populacao em situacao de rua|consultorio na rua', 3),
        (r'equidade|integralidade|universalidade|principios do sus|controle social|regionaliza', 4),
        (r'calendario (nacional )?de vacina|vacinac|imuniza', 2), (r'educacao em saude|promocao da saude', 3), (r'agrotox|comunidade (rural|ribeirinha|indigena)|saude ambiental|contaminacao', 3), (r'internac(ao|oes) (involuntaria|compulsoria|sem consentimento)|reducao de danos|\braps\b|\bcaps\b|politica nacional|politicas? de saude|ministerio da saude', 3),
        (r'\bgestao\b|\bgestor|financiamento|pactua', 2), (r'declaracao de obito|atestado de obito', 3), (r'bioetic|sigilo|autonomia do paciente|codigo de etica|etica medica|consentimento|beneficencia|nao maleficencia', 5),
    ],
    CM: [
        (r'hipertens|diabet|dislipidem|insuficiencia cardiaca|fibrilacao|arritmi|infarto|sindrome coronariana|\becg\b|eletrocardiogram', 2),
        (r'pneumonia|dpoc|asma|tuberculose|tromboembolismo|derrame pleural', 2),
        (r'insuficiencia renal|lesao renal|nefr|dialise|hiponatremi|hipercalemi|hipocalemi', 2),
        (r'cirrose|hepatite|ascite|encefalopatia hepatica|hemorragia digestiva', 2),
        (r'\bhiv\b|sifilis|dengue|chikungunya|malaria|leptospir|sepse|meningite', 2),
        (r'anemia|leucemia|linfoma|trombocitopeni|coagul', 2), (r'\bavc\b|acidente vascular|hemiparesia|hemiplegia|disartria|afasia|convuls|epilep|demencia|parkinson', 4), (r'cefaleia', 2),
        (r'tireoid|hipotireoid|hipertireoid|cushing|addison|cetoacidose', 2),
        (r'lupus|artrite|gota|vasculite|esclerodermia', 2), (r'depress|ansiedade|esquizofren|psicose|bipolar|suicid|alcool', 2),
        (r'cancer de pulmao|neoplasia|quimioterapia', 1), (r'pronto-?socorro|emergencia|uti\b', 1),
    ],
}
COMPILED = {a: [(re.compile(p), w) for p, w in rules] for a, rules in RULES.items()}
AGE_YEARS = re.compile(r'(\d{1,3})\s*anos(?: de idade)?')
AGE_MONTHS = re.compile(r'(\d{1,2})\s*(meses|dias)(?: de (idade|vida))?')


EXPLICIT = [(re.compile(r'area:\s*(medicina de familia|saude coletiva|medicina preventiva)'), MFC),
            (re.compile(r'area:\s*clinica medica'), CM), (re.compile(r'area:\s*cirurgia'), CIR),
            (re.compile(r'area:\s*(ginecologia|obstetricia)'), GO), (re.compile(r'area:\s*pediatria'), PED)]


def classify(text):
    t = norm(text)
    for rx, area in EXPLICIT:  # estações que já trazem a área impressa pela prova
        if rx.search(t[:600]):
            return area, 'prova', {area: 99}
    score = Counter()
    for area, rules in COMPILED.items():
        for rx, w in rules:
            if rx.search(t):
                score[area] += w
    m = AGE_YEARS.search(t[:260])
    if m:
        age = int(m.group(1))
        if age <= 11:
            score[PED] += 5
        elif age <= 15:
            score[PED] += 2
    for mm in AGE_MONTHS.finditer(t[:220]):
        # só "lactente de 7 meses", "RN com 3 dias" — nunca "há cerca de 3 dias"
        before = t[max(0, mm.start() - 30):mm.start()]
        if re.search(r'(lactente|crianca|menin[oa]|bebe|filh[oa]|\brn|recem-nascid[oa])\s*,?\s*(de|com)?\s*$', before):
            score[PED] += 4
            break
    # gestante adolescente: GO vence pediatria
    if score[GO] >= 4 and score[PED] and re.search(r'gestant|gravid|pre-?natal|parto', t):
        score[GO] += 3
    if not score:
        return CM, 'baixa', {}
    pref = [CM, PED, GO, CIR, MFC]
    ranked = sorted(score.items(), key=lambda kv: (-kv[1], pref.index(kv[0])))
    top, s1 = ranked[0]
    s2 = ranked[1][1] if len(ranked) > 1 else 0
    if s1 < 2:
        return CM, 'baixa', dict(score)
    conf = 'alta' if s1 >= 4 and s1 - s2 >= 3 else 'media' if s1 - s2 >= 1 else 'baixa'
    return top, conf, dict(score)


def text_of(q):
    parts = [q.get('stem') or q.get('raw_text') or '']
    for c in q.get('choices') or []:
        parts.append(c.get('text', ''))
    return '\n'.join(parts)


def apply(bank, stats):
    for d in bank['documents']:
        if d.get('kind') != 'original_exam':
            continue
        for q in d['questions']:
            if q.get('area') and q.get('area_source') != 'auto':
                q.setdefault('area_source', 'manual')
                guess, _, _ = classify(text_of(q))
                stats['gold'] += 1
                stats['gold_hit'] += guess == q['area']
                if guess != q['area']:
                    stats['misses'].append((d['edition'], q['number'], q['area'], guess))
                continue
            area, conf, _ = classify(text_of(q))
            q['area'], q['area_source'], q['area_confidence'] = area, 'auto', conf
            stats['auto'][area] += 1
            stats['conf'][conf] += 1


def main():
    dry = '--dry-run' in sys.argv
    html = HTML.read_text(encoding='utf-8')
    tag = '<script type="application/json" id="bank-data">'
    a = html.index(tag) + len(tag)
    b = html.index('</script>', a)
    bank = json.loads(html[a:b])
    stats = {'gold': 0, 'gold_hit': 0, 'misses': [], 'auto': Counter(), 'conf': Counter()}
    apply(bank, stats)
    print(f"Validação nas questões classificadas à mão: {stats['gold_hit']}/{stats['gold']} acertos")
    for m in stats['misses']:
        print('  divergência', m)
    print('Automáticas por área:', dict(stats['auto']))
    print('Confiança:', dict(stats['conf']))
    if dry:
        return
    payload = json.dumps(bank, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    HTML.write_text(html[:a] + payload + html[b:], encoding='utf-8')
    if BANK.exists():
        full = json.loads(BANK.read_text(encoding='utf-8'))
        apply(full, {'gold': 0, 'gold_hit': 0, 'misses': [], 'auto': Counter(), 'conf': Counter()})
        BANK.write_text(json.dumps(full, ensure_ascii=False), encoding='utf-8')
    print('Gravado.')


if __name__ == '__main__':
    main()
