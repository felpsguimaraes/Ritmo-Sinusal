"""SINUS · PDF A4 da apostila P2 com o mesmo visual da tela (cores, balões, fontes, 3D).
Uso (na raiz do repo): python3 tools/apostila-lesion-p2/gerar-pdf.py
Saída: aulas/lesion/p2/apostila/apostila-p2.pdf
As fotos 3D entram em JPEG (o webp viraria imagem sem compressão e o PDF passaria de 80 MB).
Precisa de Pillow, Node e Playwright (Chromium) e acesso ao Google Fonts (Inter)."""
import os, subprocess, sys, tempfile, threading, functools, http.server, socketserver, glob
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, '..', '..'))
APOS = os.path.join(REPO, 'aulas/lesion/p2/apostila')
OUT = os.path.join(APOS, 'apostila-p2.pdf')

with tempfile.TemporaryDirectory() as jpg:
    for f in glob.glob(APOS + '/img3d/*.webp'):
        im = Image.open(f).convert('RGB')
        if im.width > 1200:
            im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        im.save(os.path.join(jpg, os.path.basename(f)[:-5] + '.jpg'), quality=74, optimize=True, progressive=True)
    class Quieto(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    Handler = functools.partial(Quieto, directory=REPO)
    with socketserver.TCPServer(('127.0.0.1', 0), Handler) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        url = f'http://127.0.0.1:{srv.server_address[1]}/aulas/lesion/p2/apostila/index.html'
        r = subprocess.run(['node', os.path.join(HERE, 'pdf.js'), url, OUT], env={**os.environ, 'JPG_DIR': jpg})
        srv.shutdown()
    sys.exit(r.returncode)
