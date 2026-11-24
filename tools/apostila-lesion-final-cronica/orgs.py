"""SINUS · organogramas do Final (aba "Organogramas" do hub): mapa geral com os 4 blocos e os grupos novos
(crônica/granulomas/reparação e adaptação), copiados dos mesmos organogramas da apostila (frag/*.html).

Uso (na raiz do repo):  python3 tools/apostila-lesion-final-cronica/orgs.py   (idempotente)"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
ARQ = os.path.join(REPO, 'aulas/lesion/p2/final-orgs.js')
PRE = 'window.SINUSAL_FINAL_ORGS='

G_CRO = 'Inflamación crónica, granulomas y reparación'
G_ADP = 'Adaptación · corazón hipertrofiado'

MAPA = ('<h4 class="mm">Mapa do Final</h4><div class="org" role="img" aria-label="Organograma: EXAMEN FINAL">'
        '<div class="org-root">EXAMEN FINAL</div><div class="org-stem"></div><div class="org-cols" style="--n:4">'
        '<div class="org-col" style="--c:#0f766e;--cs:#ccfbf1"><div class="org-head">Inflamación aguda<small>Clase 9</small></div>'
        '<div class="org-leaf"><h5>Qué es</h5><ul><li>Respuesta de tejidos vascularizados, <b>innata</b>, rápida y breve</li><li>Exudado (edema) + <b>neutrófilos</b></li></ul></div>'
        '<div class="org-leaf"><h5>Cae en prueba</h5><ul><li>Signos cardinales y 3 componentes</li><li>Reclutamiento de leucocitos</li><li>Patrones morfológicos y mediadores</li></ul></div></div>'
        '<div class="org-col" style="--c:#0b6246;--cs:#dff3e8"><div class="org-head">Crónica y reparación<small>Clase 10 + Robbins</small></div>'
        '<div class="org-leaf"><h5>Qué es</h5><ul><li>Semanas o meses: inflamación, destrucción y reparación a la vez</li><li><b>Mononucleares</b> + angiogenia + fibrosis</li></ul></div>'
        '<div class="org-leaf"><h5>Cae en prueba</h5><ul><li>Características y células (interferón gamma)</li><li>Granulomas necrosantes × no necrosantes; epitelioides</li><li>Lábiles, primera × segunda intención, queloide</li></ul></div></div>'
        '<div class="org-col" style="--c:#b45309;--cs:#fef3c7"><div class="org-head">Adaptación<small>Clase 2</small></div>'
        '<div class="org-leaf"><h5>Qué es</h5><ul><li>Respuesta <b>reversible</b>: hipertrofia, hiperplasia, atrofia, metaplasia</li></ul></div>'
        '<div class="org-leaf"><h5>Cae en prueba</h5><ul><li>Corazón hipertrofiado: más proteínas contráctiles</li><li>Hipertrofia concéntrica y sus causas</li><li>Hiperplasia fisiológica × patológica</li></ul></div></div>'
        '<div class="org-col" style="--c:#b3141c;--cs:#fde7e9"><div class="org-head">Neoplasias<small>Clases 10 y 11</small></div>'
        '<div class="org-leaf"><h5>Qué es</h5><ul><li>Masa de crecimiento <b>autónomo</b> por mutaciones clonales</li><li>Parénquima + estroma</li></ul></div>'
        '<div class="org-leaf"><h5>Cae en prueba</h5><ul><li>Nomenclatura benigno × maligno</li><li>Anaplasia, invasión y metástasis</li><li>Displasia, in situ, gradación y TNM</li></ul></div></div>'
        '</div><div class="org-note">Los 4 bloques del Final, según los slides de la Dra. Chamorro (Clases 2, 9, 10 y 11) y el Robbins.</div></div>')


def orgs_do(frags):
    """Pares <h4 class="mm">…</h4><div class="org"…>…</div> dos fragmentos, na ordem."""
    out = []
    for f in frags:
        s = open(os.path.join(HERE, 'frag', f), encoding='utf-8').read()
        for m in re.finditer(r'<h4 class="mm">', s):
            i = m.start()
            j = s.find('</h4>', i) + len('</h4>')
            if not s.startswith('<div class="org"', j):
                continue  # h4 seguido de fluxo ou outro bloco: só organogramas vão para a aba
            # fecha o div.org contando aberturas e fechamentos
            k, nivel = j, 0
            for t in re.finditer(r'<div\b|</div>', s[j:]):
                nivel += 1 if t.group(0) == '<div' else -1
                if nivel == 0:
                    k = j + t.end()
                    break
            out.append(s[i:k])
    return out


def main():
    s = open(ARQ, encoding='utf-8').read().strip()
    assert s.startswith(PRE)
    fim = ';' if s.endswith(';') else ''
    F = json.loads(s[len(PRE):-1] if fim else s[len(PRE):])
    F = [g for g in F if g['g'] not in (G_CRO, G_ADP)]
    assert F[0]['g'] == 'Mapa geral'
    F[0]['h'] = [MAPA]
    novo = []
    for g in F:
        novo.append(g)
        if g['g'] == 'Inflamación aguda':
            novo.append({'g': G_CRO, 'h': orgs_do(['1-cronica.html', '2-granulomas.html', '3-reparacion.html'])})
        if g['g'] == 'Neoplasias':
            novo.append({'g': G_ADP, 'h': orgs_do(['5-adaptacion.html'])})
    open(ARQ, 'w', encoding='utf-8').write(PRE + json.dumps(novo, ensure_ascii=False, separators=(',', ':')) + fim + '\n')
    print('final-orgs.js:', ', '.join(f"{g['g']} ({len(g['h'])})" for g in novo))


if __name__ == '__main__':
    main()
