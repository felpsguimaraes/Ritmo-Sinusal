"""Paleta SINUS (verde) na apostila: troca os azuis e cinzas-azulados do CSS por verdes do SINUS.
As ilustrações (SVG) não passam por aqui; só blocos <style> e variáveis --c/--cs dos organogramas e cards."""
import colorsys, re

FIXO = {  # azuis da marca antiga -> paleta SINUS (sinus-identidade.css)
    '#3056d3': '#0c8059', '#5b7cf0': '#08a86e', '#eef2fd': '#e7f6eb', '#13244a': '#102d25', '#0f1b33': '#102d25',
    '#1b2740': '#17362c', '#1b3478': '#0b6246', '#0f2a44': '#0b3d2e', '#173f5c': '#0f5a43', '#1c2d55': '#0f4a38',
    '#3d5a99': '#2f7a5f', '#eaeef6': '#e7f6eb', '#7fe0e6': '#8fe3bf', '#e9f3f6': '#e8f5ee', '#dbe5f3': '#dcefe4',
    '#21a6c7': '#08a86e', '#a9d7eb': '#a8e0c4', '#4338ca': '#0b6246', '#e0e7ff': '#dff3e8', '#2867d8': '#0b6246',
    '#3b6fd6': '#0c8059', '#e3f0ff': '#e7f6eb', '#10284f': '#0b3d2e', '#2f6fb3': '#0b6246',
}
H_VERDE = 155 / 360

def _hls(hx):
    h = hx.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    return colorsys.rgb_to_hls(r, g, b)

def _hex(r, g, b):
    return '#' + ''.join(f'{round(max(0, min(1, v)) * 255):02x}' for v in (r, g, b))

def azul(H, S):
    return 190 / 360 <= H <= 252 / 360 and S > 0.06

def troca_hex(m):
    hx = m.group(0).lower()
    if hx in FIXO:
        return FIXO[hx]
    H, L, S = _hls(hx)
    if not azul(H, S):
        return m.group(0)
    return _hex(*colorsys.hls_to_rgb(H_VERDE, L, min(S, .55) * .8))

def troca_rgba(m):
    r, g, b = (int(x) for x in m.group(1, 2, 3))
    H, L, S = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    if not azul(H, S):
        return m.group(0)
    r2, g2, b2 = colorsys.hls_to_rgb(H_VERDE, L, min(S, .55) * .8)
    return f'rgba({round(r2 * 255)},{round(g2 * 255)},{round(b2 * 255)},'

HEX = re.compile(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-fA-F])')
RGBA = re.compile(r'rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,')

def verde_css(css):
    return RGBA.sub(troca_rgba, HEX.sub(troca_hex, css))

def verde_html(out):
    out = re.sub(r'(<style[^>]*>)(.*?)(</style>)', lambda m: m.group(1) + verde_css(m.group(2)) + m.group(3), out, flags=re.S)
    out = re.sub(r'style="(--c:[^"]*)"', lambda m: 'style="' + HEX.sub(troca_hex, m.group(1)) + '"', out)
    return out

CSS_VERDE = r'''
/* ===== paleta SINUS (verde) ===== */
:root{--acc:#0c8059;--acc2:#08a86e;--accs:#e7f6eb;--navy:#102d25;--ink:#102d25;--muted:#56715f;--line:#d9e9de;--bg:#f5fbf7}
#inicio,#prueba,#repaso,#necrosis,#apoptosis,#acumulacion,#clase7,#inflamacion{--acc:#0c8059;--acc2:#08a86e;--accs:#e7f6eb}
body{background:#f5fbf7;color:#17362c}
.hero{background:radial-gradient(120% 140% at 100% 0%,#0c8059 0%,#0b6246 40%,#0b3d2e 100%)}
.nav-link[data-go] .nav-num{background:#e7f6eb;color:#0c8059}
.nav-link[data-go].active .nav-num{background:#0c8059;color:#fff}
.nav-link:hover,.nav-link.active{background:#e7f6eb;color:#102d25}
.mini-card{border-top-color:#0c8059}
.progress-fill{background:linear-gradient(90deg,#0c8059,#08a86e)}
'''
