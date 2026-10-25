#!/usr/bin/env python3
"""SINUS: indexa os vídeos INDIVIDUAIS de @anatomiaupefranco e @anatomiaupe2188.
Nenhuma mídia é baixada. Todos os IDs e títulos vêm do YouTube (yt-dlp).
O catálogo anterior é preservado quando a origem falha.
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import yt_dlp

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "sinus" / "anatomia-upe-videos.json"
CHANNELS = ("anatomiaupefranco", "anatomiaupe2188")
SECTIONS = ("videos", "shorts", "streams")
ID = re.compile(r"^[A-Za-z0-9_-]{11}$")

# Só classificar quando o título aponta claramente para o conteúdo;
# as aulas genéricas continuam disponíveis em ambas, sem inventar semestre.
FIRST = re.compile(
    r"cr[aâ]n|cran[eé]|cabe[zç]|cara\b|facial|rostro|cuello|pesco[cç]|"
    r"m[ií]embro superior|miembro superior|hombro|escapul|clav[ií]cula|"
    r"h[uú]mero|antebrazo|mu[nñ]eca|mano\b|t[oó]rax|tor[aá]x|costilla|"
    r"estern[oó]n|mediastin|coraz[oó]n|plexo braquial|"
    r"sistema nervioso central|cerebro|enc[eé]falo|"
    r"maxilar|mand[ií]bula|m[aá]sculos? de la cara|larynx|pharynx|faring|laringe|"
    r"mening|duramadre|neuroanatom|brain|cervical|pulmon|pulm[oó]n|"
    r"brazo|esc[aá]pula|shoulder|neck|columna vertebral|dorso", re.I)
SECOND = re.compile(
    r"abd[oô]m|abdom[ií]n|digestiv|est[oô]mag|intestin|duoden|colon|c[oó]lon|"
    r"h[ií]gad|ves[ií]cula|p[aâ]ncre|bazo|ri[nñ][oó]n|renal|"
    r"pelv|per[ií]ne|uter|ovari|vejiga|inguinal|lombar|lumbar|"
    r"miembro inferior|m[ií]embro inferior|muslo|pierna|rodilla|"
    r"tibia|f[ií]bula|peron[eé]|f[eê]mur|pie\b|"
    r"cadera|coxal|sacro|c[oó]ccix|aorta abdominal|"
    r"vena cava inferior|gl[uú]te|glute|pelvitrocant|femur|f[eê]mur|"
    r"biliar|spleen|celiac|stomach|kidney|ureter|sagital de pelvis|"
    r"sistema genital|genital femenin", re.I)

def classify(title):
    a = bool(FIRST.search(title))
    b = bool(SECOND.search(title))
    return "1" if a and not b else "2" if b and not a else "geral"

def extract(handle, section):
    options = {
        "extract_flat": "in_playlist", "skip_download": True,
        "ignoreerrors": True, "no_warnings": True,
        "quiet": True, "socket_timeout": 25,
        "retries": 2, "extractor_retries": 2,
        "playlistend": 350, "lazy_playlist": False,
    }
    with yt_dlp.YoutubeDL(options) as ydl:
        info = ydl.extract_info(
            f"https://www.youtube.com/@{handle}/{section}", download=False)
    entries = info.get("entries", []) if isinstance(info, dict) else []
    result = []
    for x in entries or []:
        if not isinstance(x, dict):
            continue
        vid = str(x.get("id") or "")
        if not ID.fullmatch(vid):
            raw = str(x.get("url") or "")
            match = re.search(r"(?:watch\\?v=|youtu\\.be/|/shorts/|/live/)([A-Za-z0-9_-]{11})", raw)
            vid = match.group(1) if match else ""
        title = str(x.get("title") or "").strip()
        if not ID.fullmatch(vid) or not title or title in (
            "[Private video]", "[Deleted video]", "[Unavailable video]"
        ):
            continue
        result.append({
            "id": vid, "title": title[:300],
            "channelHandle": "@" + handle,
            "channelUrl": f"https://www.youtube.com/@{handle}",
            "url": f"https://www.youtube.com/watch?v={vid}",
            "section": section, "anatomyPeriod": classify(title),
            "type": "catedra",
        })
    return result

def main():
    previous = json.loads(OUTPUT.read_text("utf-8")) if OUTPUT.exists() else {"videos": []}
    old_by_channel = {}
    for x in previous.get("videos", []):
        if x.get("channelHandle", "").lstrip("@") in CHANNELS and ID.fullmatch(str(x.get("id") or "")):
            old_by_channel.setdefault(x["channelHandle"].lstrip("@"), []).append(x)
    all_items = []
    stats = {}
    recovered = 0
    for handle in CHANNELS:
        fresh = []
        for section in SECTIONS:
            try:
                rows = extract(handle, section)
                print(handle, section, len(rows), "vídeos identificados", flush=True)
                fresh.extend(rows)
            except Exception as exc:
                print(f"ERRO {handle} {section}: {exc}", file=sys.stderr, flush=True)
        # Não inventar dados nem perder vídeos já validados em falha transitória.
        combined = {x["id"]: x for x in old_by_channel.get(handle, [])}
        combined.update({x["id"]: x for x in fresh})
        if fresh:
            recovered += 1
        stats[handle] = {"newScan": len(set(x["id"] for x in fresh)), "total": len(combined)}
        all_items.extend(combined.values())
    if not recovered and not any(stats[x]["total"] for x in CHANNELS):
        print("NÃO PUBLICADO: o YouTube não forneceu IDs verificáveis dos dois canais.", file=sys.stderr)
        return 1
    seen = set()
    videos = []
    for item in all_items:
        if item["id"] in seen:
            continue
        seen.add(item["id"])
        videos.append(item)
    output = {
        "updatedAt": previous.get("updatedAt"),
        "sources": [f"https://www.youtube.com/@{h}" for h in CHANNELS],
        "videos": videos,
        "counts": stats,
    }
    if previous.get("videos") != videos:
        output["updatedAt"] = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        OUTPUT.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", "utf-8")
    print("TOTAL ÚNICOS:", len(videos), "por canal:", stats, flush=True)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
