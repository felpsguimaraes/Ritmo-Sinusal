"""Monta os arquivos do painel Sinus a partir do HTML do painel (v11 + módulo Imigração/MEC v12).

Uso:
  python3 tools/montar_painel.py "Sinusal_v12_Imigracao_MEC_Analise_Documental.html"

Gera, na pasta sinus/:
  painel.css   estilos do painel (v11 + Imigração/MEC)
  painel.js    código do painel, com as imagens fora do HTML e a marca "Sinus"
  img/*.jpg    imagens dos horários que vinham embutidas em base64
  _markup.html corpo original do painel, só para consulta

Tudo o que é próprio do Sinus (login, cadastro, matérias, flashcards, apostila,
agenda, idioma, tema) fica em sinus/integracao.js, fora do código original.
"""
import base64, pathlib, re, sys

raiz = pathlib.Path(__file__).resolve().parent.parent
saida = raiz / 'sinus'
(saida / 'img').mkdir(parents=True, exist_ok=True)

fonte = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8')

# 1. estilos: o painel tem um único <style> no <head>
i = fonte.find('<style>'); j = fonte.find('</style>', i)
css = fonte[i + len('<style>'):j]

# 2. corpo e script principal
b = fonte.find('<body>'); s = fonte.find('<script>\nconst SAFE_STORE', b)
e = fonte.find('</script>', s)
markup = fonte[b + len('<body>'):s]
js = fonte[s + len('<script>'):e]

# 3. imagens embutidas viram arquivos (o mapa OFFLINE_IMAGES passa a ter URLs)
def externaliza(m):
    fid, mime, dados = m.group(1), m.group(2), m.group(3)
    ext = {'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp'}.get(mime, 'bin')
    nome = f'{fid}.{ext}'
    (saida / 'img' / nome).write_bytes(base64.b64decode(dados))
    return f'"{fid}":"/sinus/img/{nome}"'
js, n = re.subn(r'"([A-Za-z0-9_-]{20,})":"data:(image/[a-z]+);base64,([A-Za-z0-9+/=]+)"', externaliza, js)
print('imagens externalizadas:', n)

# 4. marca: Sinusal -> Sinus (só texto; identificadores e chaves começam em minúscula)
def marca(t):
    t = t.replace('Sinusal', 'Sinus').replace('SINUSAL', 'SINUS')
    return t.replace('>sinusal.<', '>sinus.<')
js, css, markup = marca(js), marca(css), marca(markup)

(saida / 'painel.css').write_text(css, encoding='utf-8')
(saida / 'painel.js').write_text(js, encoding='utf-8')
(saida / '_markup.html').write_text(markup, encoding='utf-8')
print('painel.css', len(css), 'painel.js', len(js), 'markup', len(markup))
