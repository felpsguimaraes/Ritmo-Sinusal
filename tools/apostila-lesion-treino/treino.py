"""SINUS · quadros "Treine como ela pergunta" nas apostilas da 2ª parcial e do Final (Anatomía Patológica I).

Uso (na raiz do repo):  python3 tools/apostila-lesion-treino/treino.py
Reescreve no lugar aulas/lesion/p2/apostila/index.html (2ª parcial) e final.html (Final).

- Um quadro no fim de cada subseção (h3) que tenha questões ligadas; antes da 1ª subseção, um quadro com as do topo do tema.
- As questões vêm do banco (aulas/lesion/p2/dados.js), carregado pela própria apostila: corrigir o banco corrige os quadros.
- A ligação questão → explicação vem dos balões "Já caiu na prova" (cada balão ganha um id ac-N para o botão
  "Ver na explicação") e, para as questões sem balão, do EXTRA abaixo, conferido à mão contra o texto da subseção.
- Idempotente: apaga quadros, CSS, JS e ids anteriores antes de inserir de novo.
Precisa de beautifulsoup4 e node."""
import html, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapa import HERE, REPO, P2, BeautifulSoup, banco, ligar_balao

SEM_TREINO = {'inicio', 'prueba', 'repaso'}
FIM_TEMA = {'quiz', 'qprint', 'complete-btn', 'topic-nav'}
# questões sem balão: (início do texto do bloco que explica o assunto, [questões]). Fora daqui ficaram as que
# nenhuma das duas apostilas explica (adaptações, métodos de estudo, coloraciones especiales, leishmaniasis).
EXTRA = {
    'index.html': [
        ('Explicação passo a passo Toda lesão celular começa reversível', [('p1g26', 22)]),
        ('ESTÍMULO LESIVO Lesión reversible', [('p1g26', 15), ('p1g26', 4), ('p1g26', 5)]),
        ('💡 Por que esses 3 fenômenos marcam o ponto sem volta?', [('p1g26', 14), ('p1g26', 2), ('p1g26', 6), ('p1g26', 11), ('p1g26', 19)]),
        ('CAMBIOS MORFOLÓGICOS Microscopio óptico', [('p1g26', 3)]),
        ('⚠ Pegadinha · microscopio óptico × microscopio electrónico', [('p1g26', 16)]),
        ('💡 Necrosis caseosa: como o granuloma se forma', [('rec23', 13), ('rec23', 15)]),
    ],
    'final.html': [
        ('💡 A escada até o câncer invasor', [('p1g26', 20)]),
    ],
}
BANCO_EXTERNO = {'pef', 'robbins'}


def limpa(s):
    s = re.sub(r'<!--trn-->.*?<!--/trn-->', '', s, flags=re.S)
    s = re.sub(r'/\*trn\*/.*?/\*/trn\*/\n?', '', s, flags=re.S)
    s = re.sub(r'<script data-trn[^>]*>.*?</script>', '', s, flags=re.S)
    s = re.sub(r' id="(?:ac|trn-a)-\d+"', '', s)
    return s


def caixa(titulo, itens):
    dq = '|'.join(f'{p}:{n}@{a}' for (p, n), a in itens)
    t, n = html.escape(titulo), len(itens)
    return ('<!--trn--><div class="trn" data-trnq="' + html.escape(dq) + '" role="region" aria-label="Treine como ela pergunta: ' + t + '">'
            '<div class="trn-hd"><span class="trn-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></span><div class="trn-ti"><b>Treine como ela pergunta</b>'
            f'<small>{t} · {n} {"questão" if n == 1 else "questões"} do banco</small></div><span class="trn-pg" hidden></span></div>'
            '<div class="trn-bd"><p class="trn-load">Carregando as questões…</p></div></div><!--/trn-->')


def monta(arq, Q, css, js, vdados):
    path = f'{P2}/apostila/{arq}'
    s = limpa(open(path, encoding='utf-8').read())
    starts = [0] + [m.end() for m in re.finditer('\n', s)]
    soup = BeautifulSoup(s, 'html.parser')

    def pos(tag):
        o = starts[tag.sourceline - 1] + tag.sourcepos
        assert s.startswith('<' + tag.name, o), (tag.name, s[o:o + 40])
        return o

    ins = []  # (offset, texto)
    baloes = soup.select('details.alerta-cai')
    num = {id(b): k for k, b in enumerate(baloes, 1)}
    for b in baloes:
        o = pos(b)
        assert s.startswith('<details class="alerta-cai"', o)
        ins.append((o + len('<details class="alerta-cai"'), f' id="ac-{num[id(b)]}"'))

    extra = list(EXTRA.get(arq, []))
    usados_extra, n_anc, vistos, caixas = set(), 0, set(), []
    for t in soup.select('section.topic'):
        if t.get('id') in SEM_TREINO:
            continue
        ds = t.find('div', class_='section', recursive=False)
        h2 = ds.find('h2')
        grupo = {'t': (h2.get_text(' ', strip=True) if h2 else t.get('id')) + ' · visão geral', 'it': []}

        def fecha(o):
            if grupo['it']:
                ordem = sorted(grupo['it'], key=lambda x: (x[0][0] in BANCO_EXTERNO, x[2]))
                caixas.append((o, grupo['t'], [(k, a) for k, a, _ in ordem]))

        for c in ds.find_all(recursive=False):
            cls = set(c.get('class') or [])
            if cls & FIM_TEMA:
                fecha(pos(c)); grupo = None
                break
            if c.name == 'h3':
                fecha(pos(c))
                grupo = {'t': c.get_text(' ', strip=True), 'it': []}
                continue
            txt = c.get_text(' ', strip=True)
            for sig, keys in extra:
                if txt.startswith(sig):
                    assert sig not in usados_extra, sig
                    usados_extra.add(sig)
                    assert not c.get('id'), (sig, c.get('id'))
                    n_anc += 1
                    anc = f'trn-a-{n_anc}'
                    ins.append((pos(c) + len('<' + c.name), f' id="{anc}"'))
                    for k in keys:
                        assert k in Q, k
                        if k not in vistos:
                            vistos.add(k); grupo['it'].append((k, anc, pos(c)))
            for b in ([c] if 'alerta-cai' in cls else c.select('details.alerta-cai')):
                for li in b.select('li'):
                    k = ligar_balao(li, Q)
                    if k and k not in vistos:
                        vistos.add(k); grupo['it'].append((k, f'ac-{num[id(b)]}', pos(b)))
        assert grupo is None, ('tema sem quiz no fim', t.get('id'))
    faltando = [sig for sig, _ in extra if sig not in usados_extra]
    assert not faltando, faltando

    for o, titulo, itens in caixas:
        ins.append((o, caixa(titulo, itens)))
    fim_css = s.rfind('</style>', 0, s.find('</head>'))
    ins.append((fim_css, css))
    fim_body = s.rfind('</body>')
    ins.append((fim_body, f'<script data-trn src="../dados.js?v={vdados}"></script><script data-trn>{js}</script>'))

    for o, txt in sorted(ins, key=lambda x: x[0], reverse=True):
        s = s[:o] + txt + s[o:]
    open(path, 'w', encoding='utf-8').write(s)
    total = sum(len(i) for _, _, i in caixas)
    print(f'{arq}: {len(caixas)} quadros, {total} questões, {len(baloes)} balões com id, {n_anc} âncoras extra')
    return caixas


def main():
    D, Q = banco()
    css = open(HERE + '/treino.css', encoding='utf-8').read()
    js = open(HERE + '/treino.js', encoding='utf-8').read()
    assert '</script' not in js.lower()
    hub = open(REPO + '/aulas/lesion/index.html', encoding='utf-8').read()
    vdados = re.search(r"p2/dados\.js\?v=(\d+)", hub).group(1)
    for arq in ('index.html', 'final.html'):
        monta(arq, Q, css, js, vdados)


if __name__ == '__main__':
    main()
