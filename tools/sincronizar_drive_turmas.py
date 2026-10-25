#!/usr/bin/env python3
"""Sincroniza o índice de slides/materiais do Google Drive por turma (somente metadados).

Lê sinus/drive-turmas.json, percorre cada pasta-raiz recursivamente e grava
biblioteca/dados/drive-turmas-5.json no mesmo formato dos demais catálogos
(id, t, m, p, c, s, sec, size, origin), que o drive-sync.js já consome.

Regras de segurança:
- Não baixa arquivos e não altera permissões no Drive.
- Se uma turma falhar (403/404/erro de rede), mantém os dados anteriores dela.
- Se nada for encontrado em nenhuma turma, não sobrescreve o arquivo publicado.

Autenticação (uma das duas):
- DRIVE_SERVICE_ACCOUNT_JSON: JSON de conta de serviço (pasta compartilhada com ela);
- GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET e GOOGLE_OAUTH_REFRESH_TOKEN: token da conta Google do dono.
"""
import json
import os
import re
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "sinus" / "drive-turmas.json"
OUTPUT = ROOT / "biblioteca" / "dados" / "drive-turmas-5.json"
FOLDER_MIME = "application/vnd.google-apps.folder"
ID_RE = re.compile(r"^[a-zA-Z0-9_-]{10,}$")


def classify(path_parts):
    """path_parts = [matéria, PRÁTICA|TEÓRICO, ...subpastas]. Devolve (matéria, seção)."""
    if not path_parts:
        return "Sem matéria", None
    subject = path_parts[0].strip()
    rest = [p.strip() for p in path_parts[1:] if p.strip()]
    return subject, "/".join(rest) or None


def fold(text):
    """Minúsculas, sem acentos e espaços normalizados (para comparar nomes de pasta)."""
    base = unicodedata.normalize("NFD", str(text or ""))
    base = "".join(ch for ch in base if unicodedata.category(ch) != "Mn")
    return re.sub(r"\s+", " ", base).strip().lower()


def crawl(root_id, list_children, log, ignore=()):
    """Percorre a pasta raiz em largura. list_children(folder_id) -> lista de dicts do Drive.

    Retorna (itens, ok). ok=False indica que alguma pasta falhou e a turma deve
    manter os dados anteriores.
    """
    items, seen = [], set()
    ignored = {fold(name) for name in ignore}
    queue = [(root_id, [])]
    ok = True
    while queue:
        folder_id, path = queue.pop(0)
        if folder_id in seen:
            continue
        seen.add(folder_id)
        try:
            children = list_children(folder_id)
        except Exception as exc:  # 403/404/rede: registra e segue
            log(f"  pasta {folder_id} falhou: {exc}")
            ok = False
            continue
        for child in children:
            name = str(child.get("name") or "").strip()
            if child.get("mimeType") == FOLDER_MIME:
                if not path and fold(name) in ignored:
                    log(f"  pasta ignorada (não é matéria): {name}")
                    continue
                queue.append((child["id"], path + [name]))
                continue
            items.append({
                "id": child["id"],
                "name": name,
                "mime": child.get("mimeType") or "",
                "size": int(child.get("size") or 0),
                "path": path,
            })
    return items, ok


def to_catalog(entries, periodo, turma):
    out = []
    for e in entries:
        subject, section = classify(e["path"])
        if not ID_RE.fullmatch(e["id"]):
            continue
        out.append({
            "id": e["id"],
            "t": e["name"],
            "m": e["mime"],
            "p": periodo,
            "c": turma,
            "s": subject,
            "sec": section,
            "size": e["size"],
            "origin": f"drive-turma-{turma.lower()}",
        })
    return out


def build_drive_client():
    """Credencial do Drive, em ordem de preferência:
    1) DRIVE_SERVICE_ACCOUNT_JSON: conta de serviço (pastas compartilhadas com ela);
    2) GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN:
       token da conta Google do dono (gerado uma vez por tools/obter_refresh_token_drive.py).
    """
    from googleapiclient.discovery import build

    scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
    raw = os.environ.get("DRIVE_SERVICE_ACCOUNT_JSON")
    if raw:
        from google.oauth2 import service_account
        creds = service_account.Credentials.from_service_account_info(json.loads(raw), scopes=scopes)
    elif all(os.environ.get(k) for k in ("GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET", "GOOGLE_OAUTH_REFRESH_TOKEN")):
        from google.oauth2.credentials import Credentials
        creds = Credentials(
            token=None,
            refresh_token=os.environ["GOOGLE_OAUTH_REFRESH_TOKEN"],
            token_uri="https://oauth2.googleapis.com/token",
            client_id=os.environ["GOOGLE_OAUTH_CLIENT_ID"],
            client_secret=os.environ["GOOGLE_OAUTH_CLIENT_SECRET"],
            scopes=scopes,
        )
    else:
        raise SystemExit("Defina DRIVE_SERVICE_ACCOUNT_JSON ou as três variáveis GOOGLE_OAUTH_*.")
    return build("drive", "v3", credentials=creds, cache_discovery=False)


def drive_list_children(service):
    def _list(folder_id):
        files, token = [], None
        while True:
            resp = service.files().list(
                q=f"'{folder_id}' in parents and trashed = false",
                fields="nextPageToken, files(id, name, mimeType, size)",
                pageSize=1000,
                pageToken=token,
                supportsAllDrives=True,
                includeItemsFromAllDrives=True,
            ).execute()
            files.extend(resp.get("files", []))
            token = resp.get("nextPageToken")
            if not token:
                return files
    return _list


def load_previous():
    if OUTPUT.exists():
        try:
            return json.loads(OUTPUT.read_text(encoding="utf-8")).get("items", [])
        except (ValueError, OSError):
            return []
    return []


def main():
    log = lambda msg: print(msg, file=sys.stderr)
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    previous = load_previous()
    service_list = drive_list_children(build_drive_client())

    all_items = []
    for entry in config["turmas"]:
        periodo, turma = int(entry["periodo"]), str(entry["turma"]).upper()
        log(f"Turma {turma} ({periodo}º): raiz {entry['rootId']}")
        entries, ok = crawl(entry["rootId"], service_list, log, config.get("ignorar", []))
        fresh = to_catalog(entries, periodo, turma)
        if not ok or not fresh:
            log(f"  mantendo dados anteriores de {turma} (ok={ok}, itens={len(fresh)})")
            fresh = [x for x in previous if x.get("p") == periodo and x.get("c") == turma]
        else:
            log(f"  {len(fresh)} arquivos")
        all_items.extend(fresh)

    if not all_items:
        log("Nenhum item encontrado; arquivo publicado não foi alterado.")
        return 1

    all_items.sort(key=lambda x: (x["p"], x["c"], x["s"], x["sec"] or "", x["t"]))
    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "kind": "drive_turmas_sync",
        "items": all_items,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    log(f"Gravado {OUTPUT.relative_to(ROOT)} com {len(all_items)} itens.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
