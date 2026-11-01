#!/usr/bin/env python3
"""Importa (uma vez) a «edição completa» da apostila de Farmacologia P2 para a fonte SINUS.

Uso:  python3 tools/apostila-farmacologia/importar-edicao-completa.py <edicao-completa.html> <atlas-folhas.html>

Gera (fonte versionada, depois consumida por gerar.mjs):
  src/texto-aula.html          → texto corrido de cada capítulo 01–32  (<div data-aula="capNN">…</div>)
  src/folhas-manuscritas.html  → esquemas das 7 folhas manuscritas por capítulo (<div data-folha="capNN">)
                                 + o atlas completo (<section … id="atlas">)
Nada da apostila atual é removido: o gerador apenas acrescenta estes blocos.
Caixas idênticas às que a apostila já tem (p. ex. «Respuesta en español») não são repetidas.
"""
import re, sys, difflib
from pathlib import Path

HERE = Path(__file__).resolve().parent
completa = Path(sys.argv[1]).read_text(encoding='utf-8')
atlas_src = Path(sys.argv[2]).read_text(encoding='utf-8')

def limpa_latex(s):
    """O material colado trouxe LaTeX corrompido (\\a → BEL, \\b → BS, \\t → TAB). Troca por Unicode."""
    reps = [
        (r'\$\x07lpha_1, \x08eta_1, \x08eta_2, \x08eta_3\$', 'α1, β1, β2, β3'),
        (r'\$\x07lpha_1, \x07lpha_2, \x08eta_1, \x08eta_2\$', 'α1, α2, β1, β2'),
        (r'\$\x07lpha_\{1A\}\$', 'α1A'), (r'\$\x07lpha_1\$', 'α1'), (r'\$\x07lpha_2\$', 'α2'),
        (r'\$\x08eta_1\$', 'β1'), (r'\$G_i\$', 'Gi'), (r'\$Na\^\+/Cl\^-\$', 'Na⁺/Cl⁻'), (r'\$D_1\$', 'D1'),
        (r'\$t_\{1/2\} \x07pprox 10\text\{ min\}\$', 't½ ≈ 10 min'),
    ]
    for a, b in reps:
        s = re.sub(a, b, s)
    if re.search(r'[\x07\x08]|\$[^$\n]{1,40}\$', s):
        raise SystemExit('ainda há LaTeX corrompido: ' + repr(re.search(r'[\x07\x08].{0,30}|\$[^$\n]{1,40}\$', s).group()))
    return s

norm = lambda h: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h)).strip().lower()
atual = ''.join(p.read_text(encoding='utf-8') for p in sorted((HERE / 'src/capitulos').glob('mod*.html')))
caps_atuais = dict(re.findall(r'<section class="pg cap" id="(cap\d\d)">([\s\S]*?)</section>', atual))
caixas = lambda h: re.findall(r'<div class="box[^"]*">[\s\S]*?</div>', h)

# ---------- 1) texto corrido dos capítulos 01–32 ----------
saida, descartadas = [], 0
for cid, corpo in re.findall(r'<section class="pg cap" id="(cap\d\d)">([\s\S]*?)</section>', completa):
    if int(cid[3:]) > 32:          # 33 e 34 (treino e 9 perguntas) já são idênticos na apostila
        continue
    corpo = re.sub(r'<span class="eyebrow">[\s\S]*?</span>|<h1 class="h1">[\s\S]*?</h1>|<div class="meta">[\s\S]*?</div>', '', corpo)
    minhas = [norm(b) for b in caixas(caps_atuais.get(cid, ''))]
    def tira_repetida(m):
        global descartadas
        t = norm(m.group())
        if any(difflib.SequenceMatcher(None, t, x).ratio() > 0.85 for x in minhas):
            descartadas += 1
            return ''
        return m.group()
    corpo = re.sub(r'<div class="box[^"]*">[\s\S]*?</div>', tira_repetida, corpo)
    corpo = re.sub(r'\n{3,}', '\n\n', corpo).strip()
    saida.append(f'<div data-aula="{cid}">\n{corpo}\n</div>')
(HERE / 'src/texto-aula.html').write_text(
    '<!-- SINUS · Farmacología I · P2 — texto da aula por capítulo (edição completa). FELPS © 2026 -->\n' + '\n\n'.join(saida) + '\n',
    encoding='utf-8')

# ---------- 2) esquemas das 7 folhas manuscritas ----------
atlas_src = limpa_latex(atlas_src)
folhas = []
for n, bloco in re.findall(r'<section class="pg cap" id="fim-cap-(\d\d)">[\s\S]*?(<div class="vd-subblock"[\s\S]*?)\s*</section>', atlas_src):
    folhas.append(f'<div data-folha="cap{n}">\n{bloco.strip()}\n</div>')
atlas = re.search(r'<section class="pg cap" id="desenhos">([\s\S]*?)</section>', atlas_src).group(1)
atlas = re.sub(r'<div class="vd-tabs[\s\S]*?</div>\s*', '', atlas, count=1)          # filtro interativo: não usado
atlas = re.sub(r'<span class="tag-mod">[\s\S]*?</span>', '<span class="eyebrow">Atlas · 7 resumos manuscritos</span>', atlas)
atlas = atlas.replace('<h1 class="h1">Mapas Mentais e Fluxogramas dos Esquemas Desenhados</h1>',
                      '<h1 class="h1">Mapas e fluxogramas das 7 folhas manuscritas</h1>')
(HERE / 'src/folhas-manuscritas.html').write_text(
    '<!-- SINUS · Farmacología I · P2 — esquemas das 7 folhas manuscritas do autor. FELPS © 2026 -->\n'
    + '\n\n'.join(folhas) + '\n\n<section class="pg cap" id="atlas">\n' + atlas.strip() + '\n</section>\n',
    encoding='utf-8')
print(f'texto da aula: {len(saida)} capítulos ({descartadas} caixas repetidas não duplicadas) · folhas: {len(folhas)} capítulos + atlas')
