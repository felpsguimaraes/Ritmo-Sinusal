#!/usr/bin/env python3
"""Remonta sinus/revalida-treino.html a partir das fontes em sinus/revalida/.

Fontes: revalida-v2.css, revalida-v2.body.html, revalida-v2.js.
Os dados (<script id="bank-data">) e o <head> são preservados do HTML atual.
Também copia o resultado para sinus/revalida/index.html.
Uso: python3 tools/build_revalida.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent / 'sinus'
src = root / 'revalida'
out = root / 'revalida-treino.html'
html = out.read_text(encoding='utf-8')

head = html[:html.index('<style>')]
bank_start = html.index('<script type="application/json" id="bank-data">')
bank_end = html.index('</script>', bank_start) + len('</script>')
bank = html[bank_start:bank_end]

css = (src / 'revalida-v2.css').read_text(encoding='utf-8')
body = (src / 'revalida-v2.body.html').read_text(encoding='utf-8')
js = (src / 'revalida-v2.js').read_text(encoding='utf-8')

result = (head + '<style>' + css + '</style></head><body>\n' + body.strip() + '\n'
          + bank + '\n<script>' + js + '</script></body></html>\n')
out.write_text(result, encoding='utf-8')
(src / 'index.html').write_text(result, encoding='utf-8')
print(f'{out.relative_to(root.parent)}: {len(result):,} bytes')
