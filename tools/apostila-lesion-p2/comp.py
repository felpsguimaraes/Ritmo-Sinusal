"""Componentes HTML da apostila P2 (galerias, passo a passo, fluxos, figuras 3D)."""
from art import *

def galeria(titulo, cards, dica='Toca cada célula para ver qué es y cómo cae en la prueba.', tap='toca cada célula', cls=''):
    """cards: lista de (svg_ou_html, nome, sub, tip_html)."""
    bts = ''.join(
        f'<button type="button" class="g3c" data-tip="{esc(tip)}">{art}<b>{nome}</b><small>{sub}</small></button>'
        for art, nome, sub, tip in cards)
    pr = ''.join(f'<div class="gp-i"><small>{sub}</small><div class="gp-tx">{tip}</div></div>' for _, nome, sub, tip in cards)
    return (f'<div class="g3d {cls}" data-g3d><div class="g3d-h"><span class="g3d-t">{titulo}</span><span class="tap">{tap}</span></div>'
            f'<div class="g3d-cells">{bts}</div><div class="g3d-info" aria-live="polite"><span class="g3d-hint">{dica}</span></div>'
            f'<div class="g3d-print">{pr}</div></div>')

def fig3d(nome, alt, cap, wide=False):
    return (f'<figure class="photo gem{" wide" if wide else ""}"><span class="gbadge">Ilustración 3D · toca para ampliar ↗</span>'
            f'<img src="img3d/{nome}.webp" data-full="../../img/{nome}.jpg" alt="{esc(alt)}" loading="lazy" decoding="async">'
            f'<figcaption>{cap}</figcaption></figure>')

def facil(titulo, corpo):
    return f'<div class="facil"><b class="t">Explicado fácil · {titulo}</b>{corpo}</div>'

def fluxo(titulo, nos, cor=None):
    """nos: lista de str ou (str, cor). Setas entre eles."""
    parts = []
    for i, n in enumerate(nos):
        txt, c = (n, cor) if isinstance(n, str) else n
        parts.append(f'<div class="node{" "+c if c else ""}">{txt}</div>')
        if i < len(nos) - 1:
            parts.append('<span class="down" aria-hidden="true"></span>')
    t = f'<div class="flow-t">{titulo}</div>' if titulo else ''
    return f'<div class="flow">{t}{"".join(parts)}</div>'

def vs(a_tag, a_tit, a_txt, b_tag, b_tit, b_txt):
    return (f'<div class="vs2"><div class="side bad"><span class="tag">{a_tag}</span><b>{a_tit}</b>{a_txt}</div>'
            f'<div class="mid">×</div><div class="side good"><span class="tag">{b_tag}</span><b>{b_tit}</b>{b_txt}</div></div>')

def _hms(s):
    m = round(s / 60)
    return f'{m // 60} h {m % 60:02d} min' if m >= 60 else f'{m} min'

def _mmss(s):
    s = int(s)
    return f'{s // 3600}:{s % 3600 // 60:02d}:{s % 60:02d}' if s >= 3600 else f'{s // 60}:{s % 60:02d}'

FONE = ('<svg class="aud-ico" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="url(#g-ico-t)"/>'
        '<ellipse cx="18" cy="13" rx="9" ry="5" fill="#fff" opacity=".35"/>'
        '<path d="M13 28v-4a11 11 0 0 1 22 0v4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'
        '<rect x="11" y="26" width="6" height="10" rx="3" fill="#fff"/><rect x="31" y="26" width="6" height="10" rx="3" fill="#fff"/></svg>')

def player(titulo, sub, audios, video=None):
    """audios: lista de dicts {arq, t, s, caps:[(seg, rótulo)]}. video: (drive_id, titulo, sub)."""
    tot = sum(a['s'] for a in audios)
    its = []
    for a in audios:
        caps = ''.join(f'<button type="button" data-at="{c}"><b>{_mmss(c)}</b> {r}</button>' for c, r in a.get('caps', []))
        its.append(
            f'<div class="aud-it" data-arq="{a["arq"]}"><div class="aud-top"><span class="t">{a["t"]}</span>'
            f'<span class="d">{_hms(a["s"])}<span class="onde"></span></span></div>'
            f'<audio controls preload="none" src="../audio/{a["arq"]}"></audio>'
            '<div class="aud-ctl"><span class="grp"><button type="button" data-j="-15" aria-label="Voltar 15 segundos">−15 s</button>'
            '<button type="button" data-j="15" aria-label="Avançar 15 segundos">+15 s</button></span><span class="grp vel">'
            + ''.join(f'<button type="button" data-v="{v}">{str(v).replace(".", ",")}×</button>' for v in (1, 1.25, 1.5, 2))
            + '</span></div>'
            + (f'<div class="aud-caps"><span class="lbl">Ir direto ao assunto</span>{caps}</div>' if caps else '')
            + '</div>')
    vid = ''
    if video:
        vid_id, vt, vs_ = video
        vid = (f'<div class="vid3d"><div class="vid-t"><b>{vt}</b><small>{vs_}</small></div>'
               f'<div class="vid-fr"><iframe src="https://drive.google.com/file/d/{vid_id}/preview" title="{esc(vt)}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen></iframe></div>'
               f'<a class="vid-a" href="https://drive.google.com/file/d/{vid_id}/view" target="_blank" rel="noopener">Abrir no Google Drive ↗</a></div>')
    n = len(audios)
    cab_sub = sub + (f' · {n} gravaç{"ões" if n > 1 else "ão"} · {_hms(tot)}' if n else '')
    return (f'<div class="aud3d" data-aud><div class="aud-h">{FONE}<div><b>{titulo}</b><small>{cab_sub}</small></div></div>'
            f'{vid}<div class="aud-list">{"".join(its)}</div></div>')
