"""SINUS · traz uma gravação do Google Drive para o site (roda no GitHub Actions, ver .github/workflows/importar-audios-drive.yml).

Uso: python processar.py <id do Drive> "<nome original>" <pasta de saída>
- baixa o arquivo (compartilhado com "qualquer pessoa com o link");
- grava audio.m4a: AAC mono 22,05 kHz, moov no início (toca enquanto baixa), sempre abaixo de 24 MB,
  porque o Cloudflare Pages não serve arquivos acima de 25 MiB;
- transcreve em espanhol (faster-whisper small) para identificar o tema; a transcrição sai em transcricao.json
  e o workflow a criptografa antes de subir.
"""
import json
import os
import subprocess
import sys
import time
from pathlib import Path

FID, NOME, OUT = sys.argv[1], sys.argv[2], Path(sys.argv[3])
OUT.mkdir(parents=True, exist_ok=True)
orig = OUT / 'original'
LIMITE = 24 * 1024 * 1024


def baixou():
    if not orig.exists() or orig.stat().st_size < 200_000:
        return False
    with open(orig, 'rb') as f:
        cab = f.read(512).lower()
    return b'<html' not in cab and b'<!doctype' not in cab


def baixar():
    for tentativa in range(4):
        try:
            import gdown
            gdown.download(id=FID, output=str(orig), quiet=True)
        except Exception as e:  # noqa: BLE001
            print('gdown:', e)
        if baixou():
            return
        subprocess.run(['curl', '-L', '--fail', '--retry', '3', '-o', str(orig),
                        f'https://drive.usercontent.google.com/download?id={FID}&export=download&confirm=t'], check=False)
        if baixou():
            return
        time.sleep(15 * (tentativa + 1))
    raise SystemExit(f'não consegui baixar {FID} ({NOME})')


def sonda(p):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration,bit_rate,format_name',
                        '-show_entries', 'stream=codec_name,channels,sample_rate', '-of', 'json', str(p)],
                       capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


baixar()
info = sonda(orig)
dur = float(info['format']['duration'])
br = min(32000, int(LIMITE * 8 * 0.96 / dur))
audio = OUT / 'audio.m4a'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(orig), '-vn', '-ac', '1', '-ar', '22050',
                '-c:a', 'aac', '-b:a', str(br), '-movflags', '+faststart', str(audio)], check=True)
assert audio.stat().st_size < 25 * 1024 * 1024, audio.stat().st_size
print(f'{NOME}: {dur / 60:.1f} min, {orig.stat().st_size / 1e6:.1f} MB -> {audio.stat().st_size / 1e6:.1f} MB a {br // 1000} kbps')

wav = OUT / 'tmp.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(orig), '-ac', '1', '-ar', '16000', str(wav)], check=True)
from faster_whisper import WhisperModel  # noqa: E402
modelo = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=os.cpu_count() or 4)
t0 = time.time()
segs, _ = modelo.transcribe(str(wav), language='es', vad_filter=True, beam_size=1, condition_on_previous_text=False)
trechos = [[round(s.start, 1), round(s.end, 1), s.text.strip()] for s in segs]
print(f'transcrição: {len(trechos)} trechos em {(time.time() - t0) / 60:.1f} min')
(OUT / 'transcricao.json').write_text(json.dumps({'id': FID, 'nome': NOME, 'dur': dur, 'trechos': trechos}, ensure_ascii=False), encoding='utf-8')
meta = {'id': FID, 'nome': NOME, 'dur': round(dur, 1), 'bytes_original': orig.stat().st_size,
        'formato_original': info['format'], 'streams_original': info.get('streams'),
        'kbps_saida': br // 1000, 'bytes_saida': audio.stat().st_size}
(OUT / 'meta.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding='utf-8')
orig.unlink()
wav.unlink()
