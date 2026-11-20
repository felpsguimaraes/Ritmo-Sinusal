# SINUS · Apostila Medicina de la Familia (Unidades III e IV) — gera aulas/apostila-familia/exercicios.js
# Uso (raiz do repositório): python3 tools/apostila-familia/gerar_exercicios.py
import json, os, random, sys
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
import data
BLOCOS = [("promocion", "Promoción de la salud", "Unidad III", data.T1), ("prevencion", "Prevención", "Unidad III", data.T2),
          ("nino", "Salud del niño", "Unidad IV", data.T3), ("antropometria", "Antropometría y percentiles", "Unidad IV", data.T4),
          ("mujer", "Salud de la mujer", "Unidad IV · Planificación familiar", data.T5)]
out = {"titulo": "Apostila SINUS · Medicina de la Familia (Unidades III y IV) · ★ = slide marcado pela professora", "blocos": []}
for bid, titulo, clase, qs in BLOCOS:
    lista = []
    for n, q in enumerate(qs):
        enun, ops, ex = q[0], list(q[1]), q[2]
        caso = len(q) > 3 and q[3]
        certa = ops[0]
        rnd = random.Random(f"{bid}-{n}")
        if len(ops) > 2:
            rnd.shuffle(ops)
        lista.append({"q": ("Caso clínico: " if caso else "") + enun, "ops": ops, "r": ops.index(certa), "ex": ex})
    out["blocos"].append({"id": bid, "titulo": titulo, "clase": clase, "questoes": lista})
js = ("/* Sinus · Exercícios da Apostila Medicina de la Familia (aba Treino → Exercícios).\n   Gerado por tools/apostila-familia/gerar_exercicios.py. Não editar à mão. */\n"
      "window.SINUS_EXERCICIOS_APOSTILA = window.SINUS_EXERCICIOS_APOSTILA || {};\n"
      "window.SINUS_EXERCICIOS_APOSTILA.familia = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
dest = os.path.join(here, "..", "..", "aulas", "apostila-familia", "exercicios.js")
open(dest, "w", encoding="utf-8").write(js)
print(sum(len(b["questoes"]) for b in out["blocos"]), "questões →", os.path.normpath(dest))
