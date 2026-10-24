#!/usr/bin/env python3
"""Sincroniza as playlists públicas do canal (somente índice/URLs, sem baixar vídeos).

A página /playlists é consultada via yt-dlp. Falhas preservam os dados anteriores,
em vez de apagar coleções já publicadas.
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import yt_dlp

OUTPUT = Path(__file__).resolve().parents[1] / "sinus" / "youtube-playlists.json"
CHANNEL = "https://www.youtube.com/@aislanfernandes4039"
PLAYLIST_RE = re.compile(r"^(?:PL|OLAK|UU|FL|LL)[a-zA-Z0-9_-]{10,}$")


def parse(entry):
    if not isinstance(entry, dict):
        return None
    title = str(entry.get("title") or "").strip()
    playlist_id = str(entry.get("id") or "")
    if not PLAYLIST_RE.fullmatch(playlist_id):
        urls = [str(entry.get(field) or "") for field in ("url", "webpage_url", "original_url")]
        for url in urls:
            match = re.search(r"[?&]list=((?:PL|OLAK|UU|FL|LL)[a-zA-Z0-9_-]{10,})", url)
            if match:
                playlist_id = match.group(1)
                break
    if not PLAYLIST_RE.fullmatch(playlist_id) or not title:
        return None
    count = entry.get("playlist_count") or entry.get("video_count") or entry.get("n_entries")
    try:
        count = int(count)
    except (TypeError, ValueError):
        count = None
    return {"id": playlist_id, "title": title[:300], "videoCount": count}


def run():
    previous = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {}
    opts = {
        "extract_flat": "in_playlist",
        "skip_download": True,
        "quiet": True,
        "no_warnings": True,
        "ignoreerrors": True,
        "socket_timeout": 30,
        "retries": 3,
        "extractor_retries": 3,
        "playlistend": 10000,
    }
    try:
        with yt_dlp.YoutubeDL(opts) as dl:
            info = dl.extract_info(CHANNEL + "/playlists", download=False)
        entries = info.get("entries", []) if isinstance(info, dict) else []
        if not isinstance(entries, list):
            entries = list(entries)
        catalog = {}
        for entry in entries:
            p = parse(entry)
            if p and p["id"] not in catalog:
                catalog[p["id"]] = p
        print("Playlists públicas encontradas:", len(catalog))
        for p in catalog.values():
            print(" -", p["title"], p["id"])
        if not catalog:
            raise RuntimeError("O YouTube não retornou playlists públicas válidas")
    except Exception as exc:
        if previous.get("playlists"):
            print("Playlists preservadas: falha temporária na coleta:", str(exc), file=sys.stderr)
            return 0
        print("Erro ao carregar as playlists:", str(exc), file=sys.stderr)
        return 1

    new = {
        "channelUrl": CHANNEL,
        "updatedAt": previous.get("updatedAt"),
        "playlists": list(catalog.values())
    }
    if new["playlists"] != previous.get("playlists"):
        new["updatedAt"] = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        OUTPUT.write_text(json.dumps(new, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("Sincronização atualizada.")
    else:
        print("Sem mudanças no catálogo.")
    return 0


if __name__ == "__main__":
    raise SystemExit(run())
