"""Tipografia e cabeçalhos no padrão do PDF da aula (sinus): Fraunces nos títulos, Inter no texto e nos rótulos.
Número do capítulo grande e fino, rótulo pequeno verde acima do título, palavra-chave do título em itálico verde,
frase-resumo em itálico serifado. Vem por último, então vence as regras anteriores."""

FONTES = ('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700'
          '&family=Inter:wght@400;500;600;700;800&display=swap')

CSS_TIPO = r'''
/* ===== padrão do PDF da aula: Fraunces (títulos) + Inter (texto e rótulos) ===== */
:root{--f-serif:'Fraunces',Georgia,'Times New Roman',serif;--f-sans:'Inter',system-ui,-apple-system,'Segoe UI',Arial,sans-serif;--f-mono:var(--f-sans)}
body{font-family:var(--f-sans);font-size-adjust:none;letter-spacing:-.003em;font-weight:400}
b,strong{font-weight:650}
h1,h2,h3,h4,.stat strong{font-family:var(--f-serif)!important}
h2 em,h1 em,.hero h1 em{color:var(--acc,#0c8059);font-style:italic;font-weight:inherit}
h3{font-weight:600;letter-spacing:-.01em}
h4{font-family:var(--f-sans)!important;font-weight:700}
.eyebrow,.side-label,.brand-sub,.section-kicker,.section-number,.stat span,.sum60 .t,.facil .t,.exam .t,.exam b.t,.pitfall .t,.pitfall b.t,
.callout b.t,.callout .t,.verify b.t,.verify .t,.gbadge,.lam-t,.laminas .lam-t,.flow-t,.tap,.quiz-count,.qp-gt,.qp-t small,.aud-caps .lbl,
.vs2 .tag,.sig i,.nx-case .t,th,.pill,.pillx,.nx-ref,.nav-num,.nav-link .score,.nav-link .new,h3 .no,.nx-flow .num,.nx-ess .ic,
.nx-steps li::before,.stp-bar button,.aud-top .d,.qdot,.radar .t,.mm,h4.mm,.org .lvl,.complete-btn,.nx-ess-btn,.aud-ctl button,details.slidebox>summary:after,details.repbox>summary:after
{font-family:var(--f-sans)!important}
.eyebrow,.side-label,.section-kicker,.sum60 .t,.facil .t,.exam .t,.exam b.t,.pitfall .t,.pitfall b.t,.callout b.t,.callout .t,.verify b.t,.verify .t,
.gbadge,.lam-t,.flow-t,.qp-gt,.aud-caps .lbl,.nx-case .t,h4.mm,.stat span
{text-transform:none!important;letter-spacing:0!important;font-weight:650!important}
th{letter-spacing:.01em;font-weight:650}
.brand-word{font-family:var(--f-sans)!important;font-weight:800}

/* cabeçalho do capítulo: branco, número grande e fino, rótulo verde acima, título serifado com itálico verde */
.topic>.section>.section-head{background:none!important;color:var(--ink,#102d25)!important;border-radius:0!important;
  margin:-6px 0 18px!important;padding:4px 0 16px!important;border-bottom:1px solid var(--line,#d9e9de);align-items:flex-start;gap:16px;overflow:visible}
.topic>.section>.section-head::before,.topic>.section>.section-head::after{display:none!important}
.topic>.section>.section-head .section-number{background:none!important;border:0!important;color:var(--ink,#102d25)!important;
  font-family:var(--f-serif)!important;font-weight:300!important;font-size:68px!important;line-height:.82!important;letter-spacing:-.04em!important;
  flex:0 0 auto!important;width:auto!important;height:auto!important;display:block!important;padding:0!important;margin-top:4px}
.topic>.section>.section-head>div:last-child{display:flex;flex-direction:column;min-width:0}
.topic>.section>.section-head .section-kicker{order:-1;color:var(--acc,#0c8059)!important;font-size:12px!important;margin:0 0 3px!important;opacity:1}
.topic>.section>.section-head h2{color:var(--ink,#102d25)!important;font-weight:400!important;font-size:38px!important;line-height:1.08;letter-spacing:-.02em;margin:0}
.topic>.section>.section-head .nx-sub{color:var(--ink2,#365d49)!important;font-family:var(--f-serif)!important;font-style:italic;font-weight:400!important;
  font-size:17px!important;line-height:1.45;margin:8px 0 0!important}
@media(max-width:650px){.topic>.section>.section-head .section-number{font-size:50px!important}.topic>.section>.section-head h2{font-size:29px!important}}

/* caixas "Em português" e afins: verde-claro, rótulo verde pequeno */
.easy,.facil{background:#f1f8f3;border:1px solid #dcebe1}
'''


def italico_titulos(soup):
    """Última palavra do título de cada capítulo em <em> (itálico verde), como no PDF da aula."""
    n = 0
    for h2 in soup.select('.topic>.section>.section-head h2'):
        if h2.find('em'):
            continue
        txt = h2.get_text()
        if h2.find(True) is not None or ' ' not in txt.strip():
            continue
        a, b = txt.strip().rsplit(' ', 1)
        h2.clear()
        h2.append(a + ' ')
        em = soup.new_tag('em')
        em.string = b
        h2.append(em)
        n += 1
    return n
