"""Liga cada questão do banco (aulas/lesion/p2/dados.js) ao trecho da apostila que a explica.
Usado por treino.py. Fonte das ligações: os balões "Já caiu na prova" que já estão logo depois de cada explicação
e, para as questões que não têm balão, os EXTRA abaixo (conferidos à mão contra o texto da subseção)."""
import json, os, re, subprocess, unicodedata
from bs4 import BeautifulSoup

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, '..', '..'))
P2 = REPO + '/aulas/lesion/p2'

ROTULO = {  # rótulo curto do balão → id da prova em dados.js
    'Final 2024': ['final24'], 'Banco PEF': ['pef'], 'Banco Robbins': ['robbins'], 'P2 · Turma D': ['p2d'],
    'P2 · Turma C': ['p2c'], '2ª parcial 2026 · 5º F': ['p2_26'], '2ª parcial 2026 · 5º G': ['r26g'],
    '1º Parcial + Recup.': ['par1r'], 'P1 · Turma C': ['p1c'], 'P2 · folha original': ['p2f1', 'p2f2'],
    '1º Parcial': ['par1'], 'Recuperatoria 2023': ['rec23'], 'Regularización 2024': ['reg24'], '1ª parcial 2026': ['p1g26'],
}

def norm(t):
    t = unicodedata.normalize('NFKD', t.lower())
    t = ''.join(c for c in t if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', ' ', t).strip()

def banco():
    js = "global.window={};require(%r);process.stdout.write(JSON.stringify(window.SINUSAL_P2_DADOS))" % (P2 + '/dados.js')
    D = json.loads(subprocess.check_output(['node', '-e', js]))
    return D, {(q['p'], q['n']): q for q in D['qs']}

def ligar_balao(li, Q):
    """(prova, nº) da questão do balão, ou None quando o balão traz uma questão que não está no banco."""
    src = li.select_one('.ac-src').get_text(' ', strip=True)
    m = re.match(r'(.*?) · nº\s*(\w+)\s*$', src)
    assert m, src
    rot, n = m.group(1), m.group(2)
    n = int(n) if n.isdigit() else n
    stem = norm(li.select_one('.ac-q').get_text(' ', strip=True))
    cands = [(p, n) for p in ROTULO[rot] if (p, n) in Q]
    ok = [k for k in cands if norm(Q[k]['q'])[:50] == stem[:50] or stem[:40] in norm(Q[k]['q'])]
    assert len(ok) <= 1, (src, stem[:60], cands)
    return ok[0] if ok else None
