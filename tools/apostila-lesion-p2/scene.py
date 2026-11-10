"""Cenas maiores: recrutamento de leucócitos (passo a passo) e exsudato × transudato."""
from comp import *

def neutro(cx, cy, r, sx=1.0, sy=1.0, seed=1):
    body = ell(cx, cy, r * sx, r * sy, 'url(#g-neu)') + hl(cx - r * .35 * sx, cy - r * .45 * sy, r * .4 * sx, r * .16 * sy, op=.6)
    return body + dots(cx, cy, r * .75, 12, .6, 1.1, '#c69ad6', seed, .8) + lobes(cx, cy, r * .32, 4, 1.1, seed=seed)

def rbc(cx, cy, r, side=False):
    if side:
        return ell(cx, cy, r, r * .38, 'url(#g-rbc)') + ell(cx, cy - r * .1, r * .6, r * .1, '#f7b2a6', 'opacity=".55"')
    return circ(cx, cy, r, 'url(#g-rbc)') + circ(cx, cy, r * .38, 'url(#g-pal)') + hl(cx - r * .35, cy - r * .45, r * .32, r * .14, op=.7)

def ylig(x, y, color, up=True):
    d = -1 if up else 1
    return (f'<path d="M{x},{y} v{d*6} m0,0 l-3,{d*4} m3,{-d*4} l3,{d*4}" stroke="{color}" stroke-width="1.8" fill="none" stroke-linecap="round"/>')

def ring(cx, cy, r):
    return f'<circle class="ring" cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#b3141c" stroke-width="2.2" stroke-dasharray="5 5"/>'

def badge(x, y, n):
    return f'<g><circle cx="{x}" cy="{y}" r="11" fill="#b3141c"/><text x="{x}" y="{y+4}" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">{n}</text></g>'

def recrutamento():
    W, H = 960, 430
    s = f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="Reclutamiento de leucocitos paso a paso">'
    s += f'<rect width="{W}" height="{H}" fill="url(#g-tissue)"/>'
    s += '<rect x="0" y="0" width="960" height="205" fill="url(#g-lumen)"/>'
    s += '<text x="18" y="26" font-size="12" font-weight="900" fill="#a3485e" letter-spacing="1.2">LUZ DE LA VÉNULA POSCAPILAR</text>'
    s += '<g stroke="#e7a1ac" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8">' + ''.join(f'<path d="M{x},46 h34 m-6,-5 l6,5 l-6,5"/>' for x in (300, 520, 740)) + '</g>'
    s += '<text x="790" y="40" font-size="11" fill="#b06b78" font-weight="700">flujo</text>'
    rb = ''
    for i, (x, y, side) in enumerate([(40, 92, 0), (90, 112, 1), (150, 86, 0), (210, 118, 0), (260, 96, 1), (330, 90, 0), (380, 122, 0), (440, 98, 1),
                                      (500, 86, 0), (560, 116, 0), (620, 94, 0), (680, 120, 1), (730, 90, 0), (790, 110, 0), (850, 92, 1), (910, 118, 0), (180, 140, 1), (620, 145, 1)]):
        rb += rbc(x, y, 15, bool(side))
    s += g(rb, 'g-sh2')
    # endotélio
    endo = ''
    for i in range(9):
        x0 = i * 120 - 30
        if i == 5:
            continue
        endo += f'<path d="{blob(x0+60, 216, 56, 12, .05, 400+i, 10)}" fill="url(#g-endo)"/>' + ell(x0 + 60, 216, 16, 4, 'url(#g-nuc)')
    # célula endotelial dividida para a diapedese
    endo += f'<path d="{blob(548, 216, 30, 12, .05, 411, 10)}" fill="url(#g-endo)"/>' + f'<path d="{blob(652, 216, 30, 12, .05, 412, 10)}" fill="url(#g-endo)"/>'
    s += g(endo, 'g-sh2')
    s += '<path d="M0,232 H960" stroke="#e2a3b3" stroke-width="2.5" stroke-dasharray="7 5"/>'
    s += '<text x="18" y="418" font-size="12" font-weight="900" fill="#a3485e" letter-spacing="1.2">TEJIDO (INTERSTICIO)</text>'
    s += '<g stroke="#f0cdbf" stroke-width="2" fill="none" opacity=".9">' + ''.join(f'<path d="M{x},{y} c30,-10 60,10 90,0"/>' for x, y in [(30, 300), (120, 360), (240, 290), (330, 380), (440, 320), (520, 395)]) + '</g>'
    # gradiente quimiotático
    import random as _r
    rnd = _r.Random(500); ch = ''
    for _ in range(170):
        x = rnd.uniform(560, 955); y = rnd.uniform(245, 425)
        dist = ((x - 870) ** 2 + (y - 345) ** 2) ** .5
        if rnd.random() < max(0.05, 1 - dist / 260):
            ch += circ(x, y, rnd.uniform(1.2, 2.2), '#f59e0b', 'opacity=".55"')
    s += ch
    bac = ''.join(rod(x, y, 18, 6, a) for x, y, a in [(880, 330, 20), (900, 352, -30), (868, 360, 70), (912, 326, 80), (890, 376, 10)])
    s += g(bac, 'g-sh2')
    s += '<text x="846" y="408" font-size="11" fill="#2c7414" font-weight="800">bacterias</text>'
    # passos
    st = {}
    st[1] = ('<path d="M96,92 C110,110 118,126 126,140" stroke="#7d55cc" stroke-width="2.2" fill="none" stroke-dasharray="4 4"/>'
             + g(neutro(134, 168, 21, seed=601)) + ring(134, 168, 32) + badge(104, 140, 1))
    sel = ''.join(ylig(x, 205, '#0ea5e9') for x in (276, 292, 308, 324))
    st[2] = (sel + g(neutro(300, 182, 21, seed=602)) + '<path d="M272,150 a28,28 0 1 1 52,0" stroke="#0ea5e9" stroke-width="2.4" fill="none"/><path d="M318,144 l7,7 l2,-9" stroke="#0ea5e9" stroke-width="2.4" fill="none"/>'
             + ring(300, 182, 34) + badge(268, 140, 2) + '<text x="300" y="250" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0369a1">selectinas</text>')
    integ = ''.join(f'<path d="M{x},199 v7" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>' for x in (428, 440, 452, 464, 476))
    st[3] = (g(neutro(452, 188, 22, 1.45, .62, 603)) + integ + ring(452, 186, 40) + badge(410, 152, 3)
             + '<text x="452" y="250" text-anchor="middle" font-size="11.5" font-weight="800" fill="#15803d">integrinas</text>')
    hour = (ell(600, 194, 17, 11, 'url(#g-neu)') + '<rect x="595" y="196" width="10" height="38" rx="5" fill="url(#g-neu)"/>' + ell(600, 246, 19, 13, 'url(#g-neu)')
            + lobes(600, 194, 5, 2, 1, seed=604) + lobes(600, 247, 6, 3, 1, seed=605) + hl(592, 238, 8, 3, op=.6))
    pec = ''.join(f'<circle cx="{x}" cy="{y}" r="2.6" fill="#8b5cf6"/>' for x, y in [(588, 208), (612, 208), (588, 224), (612, 224)])
    st[4] = (g(hour) + pec + ring(600, 222, 40) + badge(560, 176, 4) + '<text x="600" y="282" text-anchor="middle" font-size="11.5" font-weight="800" fill="#6d28d9">PECAM-1 (CD31)</text>')
    pseudo = f'<path d="{blob(728, 312, 28, 18, .12, 606, 12)}" fill="url(#g-neu)"/>' + f'<path d="M748,306 C768,300 780,304 790,312 C778,316 764,318 750,318Z" fill="url(#g-neu)"/>'
    st[5] = (g(pseudo + lobes(722, 312, 7, 4, 1, seed=607) + hl(716, 302, 10, 3.5, op=.6)) + '<path d="M770,330 C800,348 822,352 846,350" stroke="#b45309" stroke-width="2.2" fill="none" stroke-dasharray="5 4"/><path d="M840,344 l8,6 l-9,4" stroke="#b45309" stroke-width="2.2" fill="none"/>'
             + ring(735, 312, 40) + badge(696, 280, 5) + '<text x="735" y="364" text-anchor="middle" font-size="11.5" font-weight="800" fill="#b45309">IL-8 · C5a · LTB4</text>')
    eng = (f'<path d="{blob(816, 300, 26, 24, .14, 608, 12)}" fill="url(#g-neu)"/>' + circ(820, 304, 10, '#f3fff0', 'stroke="#86c56a" opacity=".9"') + rod(820, 304, 12, 4.6, 30)
           + lobes(806, 294, 6, 3, 1, seed=609) + hl(806, 286, 9, 3, op=.6))
    ros = ''.join(f'<path d="M{x},{y} l2,-5 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 l-5,-2z" fill="#facc15" opacity=".9"/>' for x, y in [(828, 296), (812, 312)])
    st[6] = (g(eng) + ros + ring(816, 300, 38) + badge(784, 266, 6))
    for k in range(1, 7):
        s += f'<g class="sg s{k}">{st[k]}</g>'
    return s + '</svg>'

PASSOS = [
    ('Todo el trayecto', '<b>3 lugares, 6 pasos</b><br>En la <b>luz</b>: marginación → rodamiento → adhesión. En la <b>pared</b>: transmigración. En el <b>tejido</b>: quimiotaxia → fagocitosis.<br>Truco: <b>S</b>electina = <b>s</b>e desliza (rueda) · <b>I</b>ntegrina = se <b>i</b>nmoviliza (para) · <b>PECAM</b> = <b>pasa</b>.', []),
    ('1 · Marginación', '<b>Marginación</b>: redistribución leucocitaria; los leucocitos adoptan una posición periférica a lo largo de la superficie endotelial. Depende de la <b>estasis</b> (física): o sangue fica lento e os glóbulos brancos saem do centro da corrente.', ['estasis']),
    ('2 · Rodamiento', '<b>Rodamiento</b>: se adhieren de manera <b>transitoria</b> al endotelio, se desprenden y se vuelven a unir (como uma bola rolando no velcro).', ['SELECTINAS', 'E-selectina', 'P-selectina']),
    ('3 · Adhesión', '<b>Adhesión</b>: finalmente quedan en reposo en algún punto en el que se adhieren <b>con firmeza</b>. As integrinas do leucócito são ativadas por <b>quimiocinas</b>.', ['INTEGRINAS (β2)', 'activadas por quimiocinas']),
    ('4 · Transmigración', '<b>Transmigración = diapédesis = migración</b>: atraviesa el endotelio por los <b>espacios interendoteliales</b>, principalmente en las <b>vénulas poscapilares</b>, a favor del gradiente químico.<br><i>Distrator clássico:</i> "precapilares" está errado.', ['INMUNOGLOBULINAS', 'PECAM-1 / CD31']),
    ('5 · Quimiotaxia', '<b>Quimiotaxia</b>: movimiento a favor del gradiente quimiotáctico; desplazamiento por los tejidos hacia el sitio de lesión.', ['Exógenos: productos bacterianos', 'IL-8', 'C5a', 'LTB4']),
    ('6 · Fagocitosis', '<b>Fagocitosis</b> en 3 pasos: <b>reconocimiento y fijación</b> → <b>atrapamiento</b> (fagolisosoma) → <b>destrucción</b>.', ['ERO (especies reactivas de oxígeno)', 'óxido nítrico', 'enzimas lisosómicas']),
]

def stepper():
    bts = ''.join(f'<button type="button" data-s="{i}" data-tip="{esc(t)}" data-chips="{esc("|".join(c))}"{" aria-pressed=" + chr(34) + "true" + chr(34) if i == 0 else ""}>{n}</button>'
                  for i, (n, t, c) in enumerate(PASSOS))
    return (f'<div class="stp" data-stp><div class="g3d-h"><span class="g3d-t">Reclutamiento de leucocitos · paso a paso</span><span class="tap">toca cada paso</span></div>'
            f'<div class="stp-bar">{bts}</div><div class="stp-svg">{recrutamento()}</div><div class="stp-info" aria-live="polite">{PASSOS[0][1]}</div>'
            '<div class="stp-nav"><button type="button" data-d="-1">‹ Anterior</button><button type="button" data-d="1">Siguiente ›</button></div>'
            '<ol class="stp-print">' + ''.join(f'<li><div>{t}</div>' + (''.join(f'<span class="chip">{esc(x)}</span>' for x in c)) + '</li>' for n, t, c in PASSOS[1:]) + '</ol></div>')

# ------------------------------------------------ exsudato × transudato
def vaso(gaps):
    W, H = 440, 270
    s = f'<svg viewBox="0 0 {W} {H}" role="img" aria-label="{"Exudado" if gaps else "Trasudado"}">'
    s += f'<rect width="{W}" height="{H}" fill="url(#{"g-exu" if gaps else "g-tra"})"/>'
    s += '<rect x="0" y="0" width="440" height="112" fill="url(#g-lumen)"/>'
    s += g(''.join(rbc(x, y, 13, side) for x, y, side in [(40, 54, 0), (100, 70, 1), (160, 46, 0), (230, 66, 0), (300, 48, 1), (370, 64, 0), (420, 44, 0)]), 'g-sh2')
    prot = ''.join(sphere(x, y, 3.4, 'g-prot') for x, y in [(70, 30), (130, 90), (200, 30), (260, 92), (330, 88), (390, 30), (20, 90), (180, 96)])
    s += prot
    endo = ''
    if gaps:
        xs = [(10, 70), (100, 160), (190, 250), (280, 340), (370, 430)]
    else:
        xs = [(0, 110), (110, 220), (220, 330), (330, 440)]
    for i, (a, b) in enumerate(xs):
        endo += f'<path d="{blob((a+b)/2, 122, (b-a)/2-1, 10, .04, 700+i+gaps*10, 10)}" fill="url(#g-endo)"/>' + ell((a + b) / 2, 122, 12, 3.2, 'url(#g-nuc)')
    s += g(endo, 'g-sh2')
    if gaps:
        # proteínas, fibrina e neutrófilos saindo pelas fendas
        for x in (85, 175, 265, 355):
            s += f'<path d="M{x},110 C{x+6},140 {x-8},160 {x+4},190" stroke="#e7a83a" stroke-width="2.4" fill="none" stroke-dasharray="3 4"/>'
        s += ''.join(sphere(x, y, r, 'g-prot') for x, y, r in [(80, 150, 4), (96, 176, 3.6), (172, 158, 4.2), (186, 200, 3.4), (262, 170, 4), (250, 214, 3.6), (352, 154, 4), (366, 196, 3.8), (120, 220, 3.4), (310, 236, 3.6)])
        s += ''.join(f'<path d="M{x},{y} c20,-6 30,8 50,2" stroke="#f2c94c" stroke-width="2.4" fill="none" stroke-linecap="round"/>' for x, y in [(40, 238), (200, 248), (330, 220)])
        s += g(neutro(176, 132, 11, seed=710) + neutro(318, 210, 13, seed=711) + neutro(110, 196, 12, seed=712))
        s += '<g fill="#fff" opacity=".35">' + ''.join(circ(x, y, 7, '#fff') for x, y in [(60, 180), (140, 240), (230, 190), (290, 250), (400, 220), (380, 160)]) + '</g>'
    else:
        for x in (60, 170, 270, 380):
            s += f'<path d="M{x},116 v40" stroke="#5fb2e3" stroke-width="2.2" stroke-dasharray="3 4"/><path d="M{x-5},152 l5,6 l5,-6" stroke="#5fb2e3" stroke-width="2.2" fill="none"/>'
        s += ''.join(sphere(x, y, 6, 'g-water') for x, y in [(62, 180), (96, 214), (150, 186), (196, 236), (262, 192), (300, 230), (368, 186), (410, 228), (30, 240), (232, 252)])
    return s + '</svg>'

EXU = ('<div class="exu">'
       f'<figure>{vaso(0)}<figcaption><strong class="ttl">Trasudado</strong>Endotélio <b>íntegro</b>; sai só água e pouca albumina por <b>desequilíbrio de pressões</b>: ↑ hidrostática (insuficiência cardíaca) ou ↓ oncótica (hipoalbuminemia). Líquido <b>claro</b>, pobre em proteínas e células, <b>baixa densidade</b>. Sem inflamação.</figcaption></figure>'
       f'<figure>{vaso(1)}<figcaption><strong class="ttl">Exudado</strong>Abrem-se <b>fendas entre as células endoteliais</b> (↑ permeabilidade, inflamação): saem proteínas, fibrinogênio e leucócitos. Líquido <b>turvo</b>, rico em proteínas e restos celulares, <b>alta densidade</b>. Ex.: pus, derrame por pneumonia.</figcaption></figure>'
       '</div>')

SIG = ('<div class="sig">'
       f'<div>{ICO["rubor"]}<b>Rubor</b><i>Celso</i><span>Vasodilatação (histamina, prostaglandinas)</span></div>'
       f'<div>{ICO["calor"]}<b>Calor</b><i>Celso</i><span>Vasodilatação: mais sangue quente no local</span></div>'
       f'<div>{ICO["tumor"]}<b>Tumor</b><i>Celso</i><span>↑ Permeabilidade → edema (histamina, serotonina, bradicinina, PG)</span></div>'
       f'<div>{ICO["dolor"]}<b>Dolor</b><i>Celso</i><span>Prostaglandinas e bradicinina</span></div>'
       f'<div>{ICO["funcion"]}<b>Pérdida de función</b><i>Virchow · 5º</i><span>Dor + edema + lesão tecidual</span></div>'
       '</div>')
