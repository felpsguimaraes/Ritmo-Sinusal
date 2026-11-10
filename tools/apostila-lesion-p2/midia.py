"""Players de áudio e vídeo por tema (gravações das aulas da Dra. Chamorro)."""
from comp import player
VIDEO = ('19FqmuZrIucxmY-0QrC5GTx-S5jJeAjy7', 'Clase de repaso · Dra. Chamorro',
         'Vídeo da aula gravada em 12/05/2026 · toque no play para assistir aqui')
# tema da apostila -> lista de gravações; preenchido a partir dos trechos transcritos de cada áudio
AUD = {
    'apoptosis': [
        {'arq': 'grabacion-5.m4a', 't': 'Apoptosis · clase completa', 's': 3220, 'caps': [(620, 'Membrana íntegra: sin inflamación')]},
        {'arq': 'plaza-city.m4a', 't': 'Vía extrínseca · receptores de muerte (Fas)', 's': 499, 'caps': [(20, 'Receptores de muerte y ligando Fas')]},
    ],
    'acumulacion': [
        {'arq': 'plaza-city-3.m4a', 't': 'Mecanismos de acumulación, colesterol y aterosclerosis', 's': 2865, 'caps': [(2160, 'Aterosclerosis como inflamación crónica'), (2520, 'Colesterol: LDL y HDL')]},
        {'arq': 'plaza-city-2.m4a', 't': 'Placa de ateroma: cápsula fibrosa, rotura y trombo', 's': 3390, 'caps': [(1650, 'Cápsula fibrosa y rotura de la placa'), (2250, 'Células de la placa'), (2850, 'Placa amarilla y trombo')]},
        {'arq': 'plaza-city-4.m4a', 't': 'Esteatosis (cambio graso)', 's': 1378, 'caps': [(200, 'Esteatosis o cambio graso')]},
    ],
    'clase7': [
        {'arq': 'grabacion-6.m4a', 't': 'Proteínas y amiloide', 's': 3048, 'caps': [(1500, 'Depósito intracelular × extracelular'), (2400, 'β2-microglobulina: amiloide de la diálisis')]},
        {'arq': 'alto-parana.m4a', 't': 'Calcificación patológica', 's': 1405, 'caps': [(740, 'Calcificación metastásica: calcio y PTH')]},
    ],
}
TITULO = {'necrosis': 'Necrosis', 'apoptosis': 'Apoptosis', 'acumulacion': 'Acumulación: lípidos y glucógeno',
          'clase7': 'Proteínas, amiloide y calcificación', 'inflamacion': 'Inflamación aguda'}
def bloco(tid):
    auds = AUD.get(tid, [])
    vid = VIDEO if tid == 'inflamacion' else None
    if not auds and not vid:
        return ''
    return player('Clase grabada · ' + TITULO[tid], 'Dra. Chamorro', auds, vid)
