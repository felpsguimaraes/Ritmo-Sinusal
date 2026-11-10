"""Desenhos 3D (SVG sombreado) para a apostila P2: células, galerias e cenas."""
import math, random, html

def esc(s):
    return html.escape(s, quote=True)

# ---------------------------------------------------------------- defs globais
def rg(id_, stops, cx='40%', cy='35%', r='68%'):
    st = ''.join(f'<stop offset="{o}" stop-color="{c}"' + (f' stop-opacity="{op}"' if op is not None else '') + '/>'
                 for o, c, op in [(s + (None,))[:3] for s in stops])
    return f'<radialGradient id="{id_}" cx="{cx}" cy="{cy}" r="{r}">{st}</radialGradient>'

def lg(id_, stops, x2='0', y2='1'):
    st = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{id_}" x1="0" y1="0" x2="{x2}" y2="{y2}">{st}</linearGradient>'

DEFS = ('<svg class="defs3d" width="0" height="0" aria-hidden="true" focusable="false"><defs>'
    '<filter id="g-sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="4" stdDeviation="3.5" flood-color="#4a1030" flood-opacity=".26"/></filter>'
    '<filter id="g-sh2" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#2a0c20" flood-opacity=".30"/></filter>'
    '<filter id="g-blur"><feGaussianBlur stdDeviation="1.2"/></filter>'
    + rg('g-cyto', [(0, '#fff2f5'), (.45, '#f9cbd7'), (.8, '#ee9fb4'), (1, '#c96a86')])
    + rg('g-cytoN', [(0, '#ffd9e1'), (.5, '#f58ea6'), (.85, '#da4a6e'), (1, '#a52a4c')])
    + rg('g-nuc', [(0, '#c2a8f4'), (.45, '#7d55cc'), (.85, '#4a2a96'), (1, '#2a1660')], '38%', '32%', '70%')
    + rg('g-nucD', [(0, '#7a58c8'), (.6, '#331a7a'), (1, '#160a3e')], '36%', '30%', '72%')
    + rg('g-nucG', [(0, '#f1eafc'), (.7, '#d8cbf3'), (1, '#bfaee8')])
    + rg('g-fat', [(0, '#fffdf0'), (.3, '#ffeaa3'), (.72, '#f5c443'), (1, '#cf8c10')], '35%', '30%', '72%')
    + rg('g-glyc', [(0, '#ffffff'), (.65, '#f4f0fb'), (1, '#dcd2f0')])
    + rg('g-foam', [(0, '#fffdfb'), (.6, '#f8efe6'), (1, '#e4d3c0')])
    + rg('g-hyal', [(0, '#ffffff'), (.3, '#ffbfd0'), (.78, '#f2587f'), (1, '#c22a55')], '35%', '30%', '72%')
    + rg('g-pas', [(0, '#ffe0f6'), (.55, '#e25cc6'), (1, '#9c1f86')], '35%', '30%', '72%')
    + rg('g-ca', [(0, '#c9d2ff'), (.45, '#6676dc'), (1, '#28318e')], '35%', '30%', '72%')
    + rg('g-rbc', [(0, '#f6b7ab'), (.42, '#ec8172'), (.78, '#d1463c'), (1, '#9c2422')], '50%', '50%', '50%')
    + rg('g-pal', [(0, '#fde4de'), (.7, '#f6b9ae', .85), (1, '#ec8172', 0)], '50%', '50%', '50%')
    + rg('g-neu', [(0, '#fdfbff'), (.6, '#ebe2f8'), (1, '#c4b2e6')])
    + rg('g-eos', [(0, '#ffc79e'), (.65, '#f0662f'), (1, '#b5370e')], '35%', '30%', '72%')
    + rg('g-baso', [(0, '#9b8ae0'), (.7, '#3d2c8e'), (1, '#1d1257')], '35%', '30%', '72%')
    + rg('g-lym', [(0, '#eef5ff'), (.6, '#bcd5f6'), (1, '#7ea5dc')])
    + rg('g-pla', [(0, '#e8f0ff'), (.6, '#a2bdea'), (1, '#5f83c4')])
    + rg('g-mac', [(0, '#ecf8fc'), (.55, '#acd8e8'), (.9, '#5ba4c3'), (1, '#2f7593')])
    + rg('g-bact', [(0, '#d6f7c4'), (.6, '#5fbf3a'), (1, '#2c7414')], '35%', '30%', '72%')
    + rg('g-plt', [(0, '#f6eefc'), (.6, '#d7c3ee'), (1, '#a58bd4')])
    + rg('g-amy', [(0, '#fffafc'), (.55, '#f9dce5'), (1, '#e8b4c4')])
    + rg('g-cgreen', [(0, '#f1ffd8'), (.55, '#a6e352'), (1, '#4c9711')], '45%', '40%', '62%')
    + rg('g-pus', [(0, '#fff8d8'), (.6, '#f3d47a'), (1, '#cf9a2c')], '45%', '40%', '62%')
    + rg('g-water', [(0, '#f4fbff'), (.6, '#b9e2f8'), (1, '#5fb2e3')], '35%', '30%', '72%')
    + rg('g-prot', [(0, '#fff6d6'), (.6, '#ffc94a'), (1, '#d38a0c')], '35%', '30%', '72%')
    + rg('g-hl', [(0, '#ffffff', .85), (1, '#ffffff', 0)], '50%', '50%', '50%')
    + rg('g-ico-r', [(0, '#ff9aa3'), (.6, '#e0353f'), (1, '#9c1019')], '35%', '28%', '75%')
    + rg('g-ico-a', [(0, '#ffd08a'), (.6, '#f07a2a'), (1, '#b2470b')], '35%', '28%', '75%')
    + rg('g-ico-b', [(0, '#b9d4ff'), (.6, '#3b72e0'), (1, '#173f9a')], '35%', '28%', '75%')
    + rg('g-ico-p', [(0, '#e2c8ff'), (.6, '#8b4fd6'), (1, '#4c1f8f')], '35%', '28%', '75%')
    + rg('g-ico-g', [(0, '#bff0cf'), (.6, '#22a35a'), (1, '#0d6233')], '35%', '28%', '75%')
    + rg('g-ico-t', [(0, '#9fe8e1'), (.6, '#1c9c93'), (1, '#0b5c57')], '35%', '28%', '75%')
    + lg('g-bg', [(0, '#fff8f9'), (1, '#fcedf1')])
    + lg('g-lumen', [(0, '#fde9e9'), (1, '#f7cfd0')])
    + lg('g-tissue', [(0, '#fff6f1'), (1, '#fbe6dc')])
    + lg('g-endo', [(0, '#ffe3ea'), (1, '#efa3b8')])
    + lg('g-skin', [(0, '#f7c6c0'), (1, '#e79a90')])
    + lg('g-derm', [(0, '#fde7e3'), (1, '#f6cfc6')])
    + lg('g-exu', [(0, '#fff3dc'), (1, '#f6dcae')])
    + lg('g-tra', [(0, '#f1fbff'), (1, '#d8f0fb')])
    + '</defs></svg>')

# ---------------------------------------------------------------- primitivas
def f(x):
    return f'{x:.1f}'.rstrip('0').rstrip('.')

def blob(cx, cy, rx, ry, irr=0.08, seed=1, n=12, rot=0.0):
    rnd = random.Random(seed)
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n + rot
        k = 1 + rnd.uniform(-irr, irr)
        pts.append((cx + rx * k * math.cos(a), cy + ry * k * math.sin(a)))
    d = f'M{f(pts[0][0])},{f(pts[0][1])}'
    for i in range(n):
        p0, p1, p2, p3 = pts[(i - 1) % n], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f' C{f(c1[0])},{f(c1[1])} {f(c2[0])},{f(c2[1])} {f(p2[0])},{f(p2[1])}'
    return d + 'Z'

def poly_round(cx, cy, r, n=6, rot=0.0, irr=0.05, seed=3):
    """polígono arredondado (hepatócito)."""
    return blob(cx, cy, r, r * .92, irr=irr, seed=seed, n=n, rot=rot)

def path(d, fill, extra=''):
    return f'<path d="{d}" fill="{fill}" {extra}/>'

def circ(cx, cy, r, fill, extra=''):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{fill}" {extra}/>'

def ell(cx, cy, rx, ry, fill, extra=''):
    return f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}" fill="{fill}" {extra}/>'

def hl(cx, cy, rx, ry, rot=-25, op=.8):
    return f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}" fill="url(#g-hl)" opacity="{op}" transform="rotate({rot} {f(cx)} {f(cy)})"/>'

def sphere(cx, cy, r, grad, op=1):
    return circ(cx, cy, r, f'url(#{grad})', f'opacity="{op}"' if op != 1 else '') + hl(cx - r * .32, cy - r * .38, r * .42, r * .2, op=.75)

def dots(cx, cy, R, n, rmin, rmax, fill, seed=5, op=1):
    rnd = random.Random(seed)
    out = []
    for _ in range(n):
        a = rnd.uniform(0, 2 * math.pi); d = R * math.sqrt(rnd.random())
        out.append(circ(cx + d * math.cos(a), cy + d * math.sin(a), rnd.uniform(rmin, rmax), fill, f'opacity="{op}"' if op != 1 else ''))
    return ''.join(out)

def nucleus(cx, cy, r, grad='g-nuc', seed=7, nucleolus=True, chrom=True):
    s = path(blob(cx, cy, r, r * .94, .06, seed, 10), f'url(#{grad})')
    if chrom:
        s += dots(cx, cy, r * .7, 7, r * .06, r * .12, '#2a1660', seed + 1, .35)
    if nucleolus:
        s += circ(cx + r * .2, cy + r * .1, r * .22, '#3a1f80', 'opacity=".75"')
    return s + hl(cx - r * .35, cy - r * .4, r * .45, r * .2, op=.7)

def cell(cx, cy, rx, ry, grad='g-cyto', seed=1, irr=.07, n=12):
    return path(blob(cx, cy, rx, ry, irr, seed, n), f'url(#{grad})') + hl(cx - rx * .38, cy - ry * .45, rx * .4, ry * .16, op=.65)

def g(inner, filt='g-sh', cls=''):
    return f'<g filter="url(#{filt})"{f" class={chr(34)}{cls}{chr(34)}" if cls else ""}>{inner}</g>'

def svg(inner, w=140, h=120, label=''):
    return f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{esc(label)}">{inner}</svg>'

def lobes(cx, cy, r, n=4, spread=1.0, grad='g-nuc', rot=0.0, seed=2):
    """núcleo multilobulado (neutrófilo)."""
    rnd = random.Random(seed)
    pts = []
    for i in range(n):
        a = rot + (i - (n - 1) / 2) * 0.95
        pts.append((cx + math.cos(a) * r * 1.05 * spread, cy + math.sin(a) * r * .75 * spread + rnd.uniform(-1, 1)))
    s = ''
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        s += f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" stroke="#4a2a96" stroke-width="{f(r*.28)}" stroke-linecap="round"/>'
    for (x, y) in pts:
        s += circ(x, y, r * .55, f'url(#{grad})') + hl(x - r * .18, y - r * .2, r * .25, r * .11, op=.6)
    return s

def bean(cx, cy, r, grad='g-nuc', rot=0):
    d = (f'M{f(cx-r)},{f(cy)} C{f(cx-r)},{f(cy-r*1.1)} {f(cx+r)},{f(cy-r*1.1)} {f(cx+r)},{f(cy)} '
         f'C{f(cx+r)},{f(cy+r*.8)} {f(cx+r*.35)},{f(cy+r*.9)} {f(cx)},{f(cy+r*.35)} '
         f'C{f(cx-r*.35)},{f(cy+r*.9)} {f(cx-r)},{f(cy+r*.8)} {f(cx-r)},{f(cy)}Z')
    return f'<g transform="rotate({rot} {f(cx)} {f(cy)})">' + path(d, f'url(#{grad})') + hl(cx - r * .35, cy - r * .45, r * .4, r * .15, op=.6) + '</g>'

def rod(cx, cy, L, w, ang, grad='g-bact'):
    return (f'<g transform="rotate({ang} {f(cx)} {f(cy)})"><rect x="{f(cx-L/2)}" y="{f(cy-w/2)}" width="{f(L)}" height="{f(w)}" rx="{f(w/2)}" fill="url(#{grad})"/>'
            f'<rect x="{f(cx-L/2+w*.4)}" y="{f(cy-w*.36)}" width="{f(L*.55)}" height="{f(w*.22)}" rx="{f(w*.11)}" fill="#fff" opacity=".55"/></g>')

def clockface(cx, cy, r, seed=9):
    s = path(blob(cx, cy, r, r * .95, .05, seed, 10), 'url(#g-nucG)')
    for i in range(8):
        a = i * math.pi / 4
        s += circ(cx + math.cos(a) * r * .66, cy + math.sin(a) * r * .66, r * .18, '#3a1f80', 'opacity=".85"')
    s += circ(cx, cy, r * .2, '#3a1f80', 'opacity=".85"')
    return s + hl(cx - r * .35, cy - r * .4, r * .4, r * .18, op=.6)

# ---------------------------------------------------------------- células
def c_normal(seed=1):
    return g(cell(70, 58, 46, 40, 'g-cyto', seed) + ell(48, 70, 6, 3, '#e07d98', 'opacity=".45"') + ell(92, 44, 6, 3, '#e07d98', 'opacity=".45"')
             + ell(90, 76, 5, 2.6, '#e07d98', 'opacity=".45"') + nucleus(68, 57, 16, seed=seed + 3))

def c_eosin():
    vac = ''.join(circ(x, y, r, '#fff', 'opacity=".75" stroke="#c94468" stroke-opacity=".35"') for x, y, r in [(46, 46, 4.5), (95, 64, 5), (54, 78, 3.8), (88, 42, 3.2)])
    myel = ''.join(f'<circle cx="92" cy="80" r="{r}" fill="none" stroke="#b33a5e" stroke-width="1.1" opacity=".7"/>' for r in (2.5, 4.5, 6.5))
    return g(cell(70, 58, 46, 40, 'g-cytoN', 11) + vac + myel + nucleus(66, 56, 15, seed=12))

def c_picnosis():
    return g(cell(70, 58, 44, 39, 'g-cytoN', 21) + nucleus(68, 57, 9, 'g-nucD', 22, nucleolus=False, chrom=False))

def c_cariorrexis():
    fr = ''.join(sphere(x, y, r, 'g-nucD') for x, y, r in [(58, 50, 5), (74, 46, 4), (82, 60, 5.5), (64, 68, 4.2), (52, 62, 3.2), (76, 72, 3.5)])
    return g(cell(70, 58, 44, 39, 'g-cytoN', 31) + fr)

def c_cariolisis():
    return g(cell(70, 58, 44, 39, 'g-cytoN', 41) + circ(68, 57, 16, 'url(#g-nucG)', 'opacity=".55"')
             + '<circle cx="68" cy="57" r="16" fill="none" stroke="#a48ad8" stroke-dasharray="2 3" opacity=".7"/>')

# apoptose
def a_normal():
    return c_normal(51)

def a_retraccion():
    halo = '<ellipse cx="70" cy="58" rx="46" ry="40" fill="#fff" opacity=".7" stroke="#e8b4c4" stroke-dasharray="3 4"/>'
    return halo + g(cell(70, 58, 30, 27, 'g-cytoN', 52) + nucleus(70, 57, 12, seed=53))

def a_cromatina():
    nuc = path(blob(70, 57, 13, 12.5, .04, 61, 10), 'url(#g-nucG)')
    caps = ''
    for a0 in (200, 320, 80):
        a1, a2 = math.radians(a0 - 38), math.radians(a0 + 38)
        x1, y1 = 70 + 10.5 * math.cos(a1), 57 + 10.5 * math.sin(a1)
        x2, y2 = 70 + 10.5 * math.cos(a2), 57 + 10.5 * math.sin(a2)
        caps += f'<path d="M{f(x1)},{f(y1)} A10.5,10.5 0 0 1 {f(x2)},{f(y2)}" fill="none" stroke="#24104f" stroke-width="5" stroke-linecap="round"/>'
    return g(cell(70, 58, 30, 27, 'g-cytoN', 62) + nuc + caps + circ(71, 58, 3, '#24104f', 'opacity=".9"'))

def a_blebs():
    body = cell(70, 58, 27, 25, 'g-cytoN', 71)
    bl = ''.join(sphere(70 + 29 * math.cos(math.radians(a)), 58 + 27 * math.sin(math.radians(a)), r, 'g-cytoN') for a, r in [(-60, 9), (10, 10), (85, 8), (160, 9.5), (220, 7.5)])
    fr = ''.join(sphere(x, y, r, 'g-nucD') for x, y, r in [(64, 54, 6), (77, 60, 5), (68, 66, 3.6)])
    return g(bl + body + fr)

def a_cuerpos():
    s = ''
    for x, y, r, nuc in [(42, 44, 12, 1), (76, 36, 9, 0), (98, 62, 13, 1), (60, 76, 10, 1), (34, 80, 8, 0)]:
        s += circ(x, y, r, 'url(#g-cytoN)', 'stroke="#fff" stroke-width="1.4" stroke-opacity=".8"')
        if nuc:
            s += sphere(x + 1, y + 1, r * .42, 'g-nucD')
        else:
            s += ell(x, y + 1, r * .4, r * .2, '#e07d98', 'opacity=".6"')
        s += hl(x - r * .35, y - r * .4, r * .4, r * .18, op=.75)
    return g(s)

def a_fagocitosis():
    mac = path(blob(72, 60, 54, 40, .16, 81, 14), 'url(#g-mac)') + hl(50, 36, 22, 7, op=.55)
    vac = circ(84, 62, 17, '#f1fbff', 'opacity=".75" stroke="#7fbcd6"')
    bodies = sphere(80, 58, 7, 'g-cytoN') + sphere(90, 68, 6, 'g-cytoN') + sphere(82, 66, 2.6, 'g-nucD')
    out = sphere(124, 30, 8, 'g-cytoN')
    return g(mac + bean(50, 64, 13, 'g-nuc', 20) + vac + bodies) + g(out, 'g-sh2')

# acumulações
def hepat(seed, grad='g-cyto'):
    return path(poly_round(70, 58, 44, 6, .3, .06, seed), f'url(#{grad})') + hl(52, 34, 18, 6, op=.6)

def ac_normal():
    return g(hepat(91) + dots(70, 58, 34, 22, .8, 1.6, '#d97a96', 92, .5) + nucleus(70, 58, 13, seed=93))

def ac_micro():
    drops = ''
    rnd = random.Random(94)
    for _ in range(16):
        a = rnd.uniform(0, 6.28); d = rnd.uniform(18, 34)
        drops += sphere(70 + d * math.cos(a), 58 + d * math.sin(a) * .9, rnd.uniform(3, 5.5), 'g-fat')
    return g(hepat(95) + drops + nucleus(70, 58, 12, seed=96))

def ac_macro():
    nucc = (f'<g transform="rotate(-20 104 66)">' + ell(104, 66, 5, 13, 'url(#g-nuc)') + hl(102, 59, 2.5, 5, 0, .5) + '</g>')
    return g(hepat(97) + sphere(64, 56, 31, 'g-fat') + nucc)

def ac_espumosa():
    base = path(blob(70, 58, 44, 38, .1, 101, 12), 'url(#g-foam)') + hl(52, 34, 18, 6, op=.6)
    rnd = random.Random(102); bub = ''
    for _ in range(40):
        a = rnd.uniform(0, 6.28); d = 34 * math.sqrt(rnd.random())
        x, y = 70 + d * math.cos(a), 58 + d * math.sin(a) * .85
        if (x - 92) ** 2 + (y - 70) ** 2 < 150:
            continue
        r = rnd.uniform(2.4, 4.6)
        bub += circ(x, y, r, '#fffaf0', 'stroke="#d8c3a4" stroke-width=".7"') + circ(x - r * .3, y - r * .3, r * .3, '#fff')
    return g(base + bub + nucleus(92, 70, 9, seed=103, nucleolus=False))

def ac_xantoma():
    s = ''
    for i, (x, y, r) in enumerate([(46, 50, 26), (92, 46, 24), (70, 82, 24)]):
        s += path(blob(x, y, r, r * .9, .1, 110 + i, 10), 'url(#g-foam)')
        rnd = random.Random(120 + i)
        for _ in range(14):
            a = rnd.uniform(0, 6.28); d = r * .75 * math.sqrt(rnd.random())
            s += circ(x + d * math.cos(a), y + d * math.sin(a), rnd.uniform(2, 3.6), '#fff4d8', 'stroke="#e1b964" stroke-width=".6"')
        s += sphere(x + r * .45, y + r * .4, 4.5, 'g-nuc')
    return g(s)

def ac_glucogeno():
    base = hepat(131, 'g-glyc')
    rnd = random.Random(132); gr = ''
    for _ in range(46):
        a = rnd.uniform(0, 6.28); d = rnd.uniform(15, 37)
        gr += circ(70 + d * math.cos(a), 58 + d * math.sin(a) * .9, rnd.uniform(1, 2.2), '#c43aa8', 'opacity=".75"')
    return g(base + gr + nucleus(70, 58, 12, seed=133))

# clase 7
def c7_gotitas():
    s = ''
    for i, x in enumerate((44, 96)):
        s += f'<rect x="{x-25}" y="26" width="50" height="70" rx="12" fill="url(#g-cyto)"/>'
        s += ''.join(f'<line x1="{x-22+k*4}" y1="26" x2="{x-22+k*4}" y2="19" stroke="#e99ab0" stroke-width="1.6" stroke-linecap="round"/>' for k in range(12))
        s += ell(x, 84, 10, 7, 'url(#g-nuc)') + hl(x - 4, 81, 4, 1.8, 0, .6)
        rnd = random.Random(140 + i)
        for _ in range(6):
            s += sphere(x + rnd.uniform(-14, 14), rnd.uniform(36, 66), rnd.uniform(3.2, 5.4), 'g-hyal')
    return g(s)

def c7_russell():
    base = path(blob(72, 58, 46, 34, .07, 151, 12), 'url(#g-pla)') + hl(52, 36, 18, 6, op=.55)
    halo = circ(52, 56, 9, '#f2f7ff', 'opacity=".85"')
    glob = sphere(86, 46, 11, 'g-hyal') + sphere(98, 70, 9, 'g-hyal') + sphere(76, 72, 7.5, 'g-hyal')
    return g(base + halo + clockface(38, 58, 14) + glob)

def c7_a1at():
    glob = ''.join(sphere(x, y, r, 'g-pas') for x, y, r in [(50, 40, 6.5), (92, 44, 7.5), (96, 74, 5.5), (48, 76, 6), (74, 86, 4.2), (60, 30, 3.8)])
    return g(hepat(161) + nucleus(72, 58, 12, seed=162) + glob)

def c7_mallory():
    ropes = ''
    for i, (pts) in enumerate([[(58, 40), (66, 34), (74, 42), (66, 48), (76, 52)], [(54, 46), (62, 52), (56, 58), (66, 60)], [(70, 36), (80, 40), (84, 48), (78, 54)]]):
        d = 'M' + ' '.join(f'{x},{y}' for x, y in pts)
        ropes += f'<path d="{d}" fill="none" stroke="#d63a64" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>'
        ropes += f'<path d="{d}" fill="none" stroke="#ffb3c6" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity=".8" transform="translate(-.8 -1)"/>'
    return g(hepat(171) + sphere(98, 72, 13, 'g-fat') + ropes + nucleus(66, 72, 11, seed=172))

def c7_amiloide():
    base = '<rect x="14" y="16" width="112" height="86" rx="18" fill="url(#g-amy)"/>'
    wav = ''.join(f'<path d="M20,{y} C40,{y-5} 60,{y+5} 80,{y} S110,{y-4} 120,{y}" fill="none" stroke="#e7a9bc" stroke-width="1" opacity=".7"/>' for y in (30, 46, 62, 78, 92))
    cells = ''.join(cell(x, y, rx, ry, 'g-cyto', 180 + i) + ell(x, y, rx * .35, ry * .4, 'url(#g-nuc)') for i, (x, y, rx, ry) in enumerate([(40, 40, 12, 9), (84, 34, 10, 8), (60, 72, 11, 8), (100, 74, 9, 7)]))
    inset = circ(112, 96, 15, '#14121f') + ''.join(f'<path d="M{102+k*4},{88+k*2} q4,4 2,10" stroke="url(#g-cgreen)" stroke-width="2.4" fill="none" stroke-linecap="round"/>' for k in range(4)) + circ(112, 96, 15, 'none', 'stroke="#fff" stroke-width="1.5"')
    return g(base + wav + cells) + g(inset, 'g-sh2')

def c7_distrofica():
    ghost = cell(70, 58, 46, 38, 'g-cytoN', 191) + circ(64, 56, 14, 'url(#g-nucG)', 'opacity=".45"')
    rnd = random.Random(192); ca = ''
    for _ in range(22):
        x = 70 + rnd.uniform(-30, 30); y = 58 + rnd.uniform(-22, 24)
        ca += sphere(x, y, rnd.uniform(2, 5), 'g-ca')
    return g(ghost + ca)

def c7_metastasica():
    wall = ('<circle cx="66" cy="58" r="40" fill="none" stroke="url(#g-cyto)" stroke-width="13"/>'
            '<circle cx="66" cy="58" r="40" fill="none" stroke="#e48aa3" stroke-width="1" opacity=".6"/>')
    nuc = ''.join(ell(66 + 40 * math.cos(math.radians(a)), 58 + 40 * math.sin(math.radians(a)), 4.5, 2.5, 'url(#g-nuc)', f'transform="rotate({a+90} {f(66+40*math.cos(math.radians(a)))} {f(58+40*math.sin(math.radians(a)))})"') for a in (20, 140, 260))
    ca = ''.join(sphere(66 + 40 * math.cos(math.radians(a)), 58 + 40 * math.sin(math.radians(a)), 3.4, 'g-ca') for a in range(60, 400, 34))
    pill = '<rect x="88" y="94" width="46" height="18" rx="9" fill="#3b46b0"/><text x="111" y="107" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">Ca²⁺ ↑</text>'
    return g(wall + nuc + ca) + pill

def c7_psamoma():
    s = ''
    for i, r in enumerate((30, 25, 20, 15, 10, 5)):
        s += circ(70, 58, r, 'url(#g-ca)' if i % 2 == 0 else '#e6e9ff')
    s += hl(58, 44, 12, 5, op=.7)
    return g(s)

# inflamação: células
def i_neutro():
    gr = dots(70, 58, 26, 26, .7, 1.2, '#c69ad6', 201, .8)
    return g(circ(70, 58, 32, 'url(#g-neu)') + hl(56, 40, 13, 5, op=.6) + gr + lobes(70, 58, 10, 4, 1.15, seed=202))

def i_eosino():
    rnd = random.Random(211); gr = ''
    for _ in range(46):
        a = rnd.uniform(0, 6.28); d = 28 * math.sqrt(rnd.random())
        gr += sphere(70 + d * math.cos(a), 58 + d * math.sin(a), rnd.uniform(1.8, 2.6), 'g-eos')
    lob = sphere(58, 58, 9.5, 'g-nuc') + sphere(82, 58, 9.5, 'g-nuc') + '<line x1="62" y1="60" x2="78" y2="60" stroke="#4a2a96" stroke-width="3"/>'
    return g(circ(70, 58, 33, 'url(#g-neu)') + gr + lob)

def i_baso():
    rnd = random.Random(221); gr = ''
    for _ in range(40):
        a = rnd.uniform(0, 6.28); d = 24 * math.sqrt(rnd.random())
        gr += sphere(70 + d * math.cos(a), 58 + d * math.sin(a), rnd.uniform(2, 3.2), 'g-baso')
    return g(circ(70, 58, 30, 'url(#g-neu)') + lobes(70, 58, 8, 2, 1, seed=222) + gr)

def i_masto():
    base = path(blob(70, 58, 44, 32, .08, 231, 12), 'url(#g-neu)') + hl(52, 38, 16, 5, op=.55)
    rnd = random.Random(232); gr = ''
    for _ in range(60):
        a = rnd.uniform(0, 6.28); d = 36 * math.sqrt(rnd.random())
        x, y = 70 + d * math.cos(a), 58 + d * math.sin(a) * .7
        if (x - 70) ** 2 + (y - 58) ** 2 < 120:
            continue
        gr += circ(x, y, rnd.uniform(1.6, 2.6), 'url(#g-baso)')
    out = ''.join(circ(x, y, r, 'url(#g-baso)', 'opacity=".75"') for x, y, r in [(122, 34, 2.4), (128, 48, 1.8), (118, 22, 1.6), (130, 66, 2)])
    return g(base + gr + nucleus(70, 58, 10, seed=233, nucleolus=False)) + out

def i_mono():
    return g(circ(70, 58, 36, 'url(#g-lym)') + hl(54, 38, 14, 5, op=.55) + dots(70, 58, 30, 18, .8, 1.3, '#9db6dc', 241, .7) + bean(70, 60, 17, 'g-nuc', -10))

def i_macro():
    mac = path(blob(70, 58, 56, 40, .2, 251, 16), 'url(#g-mac)') + hl(48, 34, 22, 7, op=.55)
    vac = ''.join(circ(x, y, r, '#f4fbff', 'opacity=".85" stroke="#7fbcd6"') for x, y, r in [(92, 50, 7), (100, 68, 5), (84, 74, 4.5)])
    return g(mac + vac + bean(54, 58, 14, 'g-nuc', 30) + rod(92, 50, 8, 3.4, 30))

def i_linfo():
    return g(circ(70, 58, 24, 'url(#g-lym)') + nucleus(68, 57, 19, 'g-nucD', 261, nucleolus=False))

def i_plasma():
    base = path(blob(72, 58, 42, 32, .06, 271, 12), 'url(#g-pla)') + hl(54, 38, 16, 5, op=.55)
    return g(base + circ(60, 56, 9, '#f2f7ff', 'opacity=".9"') + clockface(44, 58, 14))

def i_plaqueta():
    s = ''
    for x, y, rx, ry, a in [(52, 52, 14, 9, -15), (86, 62, 12, 8, 20), (68, 80, 10, 7, 5)]:
        s += f'<g transform="rotate({a} {x} {y})">' + ell(x, y, rx, ry, 'url(#g-plt)') + dots(x, y, rx * .5, 6, .8, 1.4, '#7a4fbf', x, .8) + hl(x - rx * .3, y - ry * .4, rx * .4, ry * .2, 0, .7) + '</g>'
    return g(s)

# padrões inflamatórios (cenas)
def p_serosa():
    derm = '<rect x="6" y="70" width="128" height="44" rx="10" fill="url(#g-derm)"/>'
    blister = '<path d="M14,70 C30,70 34,30 70,28 C106,30 110,70 126,70 Z" fill="url(#g-water)" opacity=".85"/>'
    epi = '<path d="M6,70 L16,70 C30,68 34,24 70,22 C106,24 110,68 124,70 L134,70 L134,62 L122,62 C108,58 104,14 70,12 C36,14 32,58 18,62 L6,62Z" fill="url(#g-skin)"/>'
    return g(derm + blister + epi + hl(54, 30, 16, 5, op=.8) + dots(70, 92, 50, 10, 1, 1.8, '#c45b74', 281, .5))

def p_fibrinosa():
    heart = '<path d="M6,84 C30,72 110,72 134,84 L134,114 L6,114Z" fill="url(#g-cytoN)"/>'
    peri = '<path d="M6,20 C30,32 110,32 134,20 L134,6 L6,6Z" fill="url(#g-cyto)"/>'
    rnd = random.Random(291); fib = ''
    for i in range(26):
        x = 10 + i * 4.8 + rnd.uniform(-2, 2)
        fib += f'<path d="M{f(x)},{f(28+rnd.uniform(0,4))} C{f(x+rnd.uniform(-8,8))},{f(48)} {f(x+rnd.uniform(-8,8))},{f(60)} {f(x+rnd.uniform(-3,3))},{f(76+rnd.uniform(0,4))}" stroke="#f0d36a" stroke-width="{f(rnd.uniform(1.6,3))}" fill="none" stroke-linecap="round" opacity=".9"/>'
    return g(heart + peri + fib + hl(40, 90, 18, 4, 0, .6))

def p_purulenta():
    tissue = '<rect x="6" y="8" width="128" height="104" rx="14" fill="url(#g-tissue)"/>'
    rim = circ(70, 60, 44, '#f3a6b2', 'opacity=".55"') + circ(70, 60, 38, 'url(#g-cytoN)', 'opacity=".55"')
    pus = path(blob(70, 60, 32, 30, .1, 301, 12), 'url(#g-pus)')
    rnd = random.Random(302); neu = ''
    for _ in range(14):
        a = rnd.uniform(0, 6.28); d = 24 * math.sqrt(rnd.random())
        x, y = 70 + d * math.cos(a), 60 + d * math.sin(a)
        neu += circ(x, y, 4.2, 'url(#g-neu)') + lobes(x, y, 2.2, 3, 1, seed=int(x))
    return g(tissue + rim + pus + neu + hl(58, 42, 12, 4, op=.6))

def p_ulcera():
    base = '<rect x="6" y="40" width="128" height="74" rx="10" fill="url(#g-tissue)"/>'
    epi = '<path d="M6,40 L44,40 C50,40 52,52 58,62 C64,72 76,72 82,62 C88,52 90,40 96,40 L134,40 L134,30 L96,30 C88,30 84,44 80,52 C74,62 66,62 60,52 C56,44 52,30 44,30 L6,30Z" fill="url(#g-cyto)"/>'
    crater = '<path d="M44,30 C52,30 56,44 60,52 C66,62 74,62 80,52 C84,44 88,30 96,30 C90,40 88,58 80,70 C72,80 66,80 58,70 C50,58 48,40 44,30Z" fill="url(#g-pus)" opacity=".9"/>'
    infl = '<path d="M40,74 C56,96 84,96 100,74 L104,100 L36,100Z" fill="url(#g-cytoN)" opacity=".55"/>'
    return g(base + infl + epi + crater + dots(70, 92, 30, 14, 1.2, 2, '#7d55cc', 311, .7))

# ícones dos sinais cardinais
def ico(grad, inner):
    return (f'<svg viewBox="0 0 64 64" aria-hidden="true"><g filter="url(#g-sh2)"><circle cx="32" cy="32" r="26" fill="url(#{grad})"/>'
            '<ellipse cx="24" cy="18" rx="11" ry="5" fill="url(#g-hl)" opacity=".75" transform="rotate(-25 24 18)"/></g>'
            f'<g fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">{inner}</g></svg>')

ICO = {
    'rubor': ico('g-ico-r', '<path d="M32,16 C26,26 20,32 20,39 a12,12 0 0 0 24,0 C44,32 38,26 32,16Z" fill="#fff" fill-opacity=".25"/>'),
    'calor': ico('g-ico-a', '<path d="M32,15 v20"/><circle cx="32" cy="41" r="7" fill="#fff" fill-opacity=".35"/><path d="M38,20 h5 M38,26 h5"/>'),
    'tumor': ico('g-ico-p', '<path d="M14,42 C22,42 22,22 32,22 C42,22 42,42 50,42"/><path d="M14,48 H50"/>'),
    'dolor': ico('g-ico-b', '<path d="M35,13 L23,34 H33 L28,51 L42,28 H32 Z" fill="#fff" fill-opacity=".3"/>'),
    'funcion': ico('g-ico-g', '<circle cx="32" cy="32" r="8"/><path d="M32,17 v6 M32,41 v6 M17,32 h6 M41,32 h6 M21,21 l4,4 M39,39 l4,4 M43,21 l-4,4 M25,39 l-4,4"/><path d="M18,46 L46,18" stroke="#fff"/>'),
}
