#!/usr/bin/env python3
"""Gera o refresh token da sua conta Google para o sincronizador do Drive (rodar UMA vez, no seu computador).

Pré-requisitos (no Google Cloud Console, com sua conta Gmail):
1. Criar um projeto e ativar a "Google Drive API".
2. Tela de consentimento OAuth: tipo Externo, e adicionar sua conta como usuária de teste.
3. Credenciais > Criar credenciais > ID do cliente OAuth > tipo "App para computador".
4. Baixar o JSON e salvá-lo como client_secret.json ao lado deste script.

Uso:  python3 obter_refresh_token_drive.py client_secret.json
Ele abre o login no navegador e imprime os três valores para o GitHub Secrets:
GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN.
Trate esses valores como senhas: não os cole em chats nem os commite.
"""
import json
import sys

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"]


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    flow = InstalledAppFlow.from_client_secrets_file(sys.argv[1], SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent", access_type="offline")
    client = json.load(open(sys.argv[1], encoding="utf-8"))
    info = client.get("installed") or client.get("web") or {}
    print("GOOGLE_OAUTH_CLIENT_ID=", info.get("client_id"), sep="")
    print("GOOGLE_OAUTH_CLIENT_SECRET=", info.get("client_secret"), sep="")
    print("GOOGLE_OAUTH_REFRESH_TOKEN=", creds.refresh_token, sep="")


if __name__ == "__main__":
    main()
