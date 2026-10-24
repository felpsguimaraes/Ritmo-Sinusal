#!/usr/bin/env python3
"""Indexa vídeos PÚBLICOS do canal no SINUS; não baixa os arquivos de vídeo.

Execute: python tools/sincronizar_videos_youtube.py
Requer: pip install yt-dlp
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

import yt_dlp

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "sinus" / "youtube-catalogo.json"
HANDLE = "aislanfernandes4039"
URL = "https://www.youtube.com/@" + HANDLE
ID_RX = re.compile(r"^UC[A-Za-z0-9_-]{22}$")
VIDEO_RX = re.compile(r"^[A-Za-z0-9_-]{11}$")
SECTIONS = ("videos", "shorts", "streams")


def channel_id_from_info(info):
    if not isinstance(info, dict):
        return None
    for k in ("channel_id", "id", "uploader_id"):
        value = str(info.get(k) or "")
        if ID_RX.fullmatch(value):
            return value
    for k in ("channel_url", "uploader_url", "webpage_url"):
        found = re.search(r"/channel/(UC[A-Za-z0-9_-]{22})", str(info.get(k) or ""))
        if found:
            return found.group(1)
    return None


def channel_id_from_html():
    """Fallback sem chave de API, caso a aba de vídeos não informe o ID."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; SINUS-Library/1.0)"}
        with urlopen(Request(URL + "/videos", headers=headers), timeout=20) as response:
            html = response.read(2_000_000).decode("utf-8", "replace")
        for pattern in (
            r'"externalId"\s*:\s*"(UC[A-Za-z0-9_-]{22})"',
            r'"channelId"\s*:\s*"(UC[A-Za-z0-9_-]{22})"',
            r'<meta\s+itemprop="channelId"\s+content="(UC[A-Za-z0-9_-]{22})"',
        ):
            result = re.search(pattern, html)
            if result:
                return result.group(1)
    except Exception as error:
        print("ID do canal não encontrado no HTML:", error)
    return None


def extract_section(section):
    options = {
        "extract_flat": "in_playlist",
        "skip_download": True,
        "ignoreerrors": True,
        "quiet": True,
        "no_warnings": True,
        "socket_timeout": 30,
        "retries": 2,
        "extractor_retries": 2,
        "playlistend": 10000,
        "lazy_playlist": False,
    }
    with yt_dlp.YoutubeDL(options) as ydl:
        info = ydl.extract_info(URL + "/" + section, download=False)
    if not isinstance(info, dict):
        return {}, []
    entries = info.get("entries") or []
    if not isinstance(entries, list):
        entries = list(entries)
    videos = []
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        candidate = str(entry.get("id") or "")
        if not VIDEO_RX.fullmatch(candidate):
            match = re.search(r"(?:watch\?v=|youtu\.be/|/shorts/|/live/)([A-Za-z0-9_-]{11})", str(entry.get("url") or ""))
            candidate = match.group(1) if match else ""
        if not VIDEO_RX.fullmatch(candidate):
            continue
        title = str(entry.get("title") or "Videoaula").strip()
        if title in ("[Private video]", "[Deleted video]"):
            continue
        videos.append({
            "id": candidate,
            "title": title[:500],
            "section": section,
            "description": str(entry.get("description") or "")[:400],
        })
    return info, videos


def run():
    old = json.loads(OUTPUT.read_text("utf-8")) if OUTPUT.exists() else {}
    previous = {str(x.get("id")): x for x in old.get("videos", []) if isinstance(x, dict)}
    found = {}
    cid = old.get("channelId") if ID_RX.fullmatch(str(old.get("channelId") or "")) else None
    channel_name = old.get("channelName") or "Clases Medicina - Py"
    errors = []
    for section in SECTIONS:
        try:
            info, videos = extract_section(section)
            cid = channel_id_from_info(info) or cid
            for item in videos:
                if item["id"] not in found:
                    found[item["id"]] = item
                elif found[item["id"]]["section"] == "streams" and section != "streams":
                    found[item["id"]] = item
            print(section, len(videos), "vídeos encontrados")
        except Exception as error:
            errors.append(section + ": " + str(error))
            print("Falhou", section, error, file=sys.stderr)

    cid = cid or channel_id_from_html()
    # Preserva títulos já indexados em uma falha transitória da origem.
    if not found:
        if previous:
            print("YouTube indisponível: catálogo anterior preservado.", file=sys.stderr)
            return 0
        print("Erro: nenhum vídeo recuperado. Canal permanece configurado, mas sem catálogo.", file=sys.stderr)
        return 1

    # Uma falha parcial NÃO elimina entradas já indexadas; novos vídeos continuam entrando.
    if errors:
        for vid, item in previous.items():
            if vid not in found:
                found[vid] = item

    videos = list(found.values())
    output = {
        "channelName": channel_name,
        "channelUrl": URL,
        "channelHandle": "@" + HANDLE,
        "channelId": cid,
        "uploadsPlaylistId": "UU" + cid[2:] if cid else old.get("uploadsPlaylistId"),
        "updatedAt": old.get("updatedAt"),
        "videos": videos,
    }
    if old.get("videos") != videos or old.get("channelId") != cid:
        output["updatedAt"] = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("Catálogo atualizado:", len(videos), "vídeos / canal", cid or "(sem ID)")
    else:
        print("Sem alterações:", len(videos), "vídeos")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
