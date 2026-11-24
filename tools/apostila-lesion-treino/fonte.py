"""Troca a tipografia das apostilas P2 e Final pela pilha do Início do Sinus (aulas/sinus-identidade.css).
Uso (na raiz do repo): python3 tools/apostila-lesion-treino/fonte.py aulas/lesion/p2/apostila/index.html aulas/lesion/p2/apostila/final.html
Já aplicado em 24/11/2026; rodar de novo não muda nada."""
import re, sys
STACK = "'Manrope','DM Sans',-apple-system,BlinkMacSystemFont,system-ui,sans-serif"
for path in sys.argv[1:]:
    s = open(path, encoding='utf-8').read()
    n0 = len(s)
    if '--f-ui:' in s and 'fonts.googleapis' not in s:
        print(path, 'já está com a fonte do Início'); continue
    # 1) sem Google Fonts (Inter, Fraunces e JetBrains Mono deixam de ser usadas)
    s, k1 = re.subn(r'<link[^>]*href="https://fonts\.googleapis\.com/css2\?[^"]*"[^>]*/?>', '', s)
    s, k2 = re.subn(r'<link[^>]*href="https://fonts\.(?:googleapis|gstatic)\.com"[^>]*/?>', '', s)
    assert k1 == 1 and k2 == 2, (path, k1, k2)
    # 2) variável única
    assert s.count(':root{--navy:') == 1
    s = s.replace(':root{--navy:', ':root{--f-ui:' + STACK + ';--navy:', 1)
    # 3) declarações
    reps = [
        ('font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif', 'font-family:var(--f-ui)'),
        ("'Inter',system-ui,-apple-system,'Segoe UI',sans-serif", 'var(--f-ui)'),
        ("'Inter',sans-serif", 'var(--f-ui)'),
        ('Inter,sans-serif', 'var(--f-ui)'),
        ('/* ===== tipografia da aula 3D (SINUS): Fraunces no texto e nos títulos, JetBrains Mono nos rótulos ===== */',
         '/* ===== tipografia: a mesma pilha do Início do Sinus (Manrope, DM Sans, fonte do sistema) ===== */'),
    ]
    for a, b in reps:
        c = s.count(a); assert c >= 1, (path, a); s = s.replace(a, b)
    s = s.replace('button,a{font:inherit}', 'button,a{font:inherit}input,textarea,select{font-family:inherit}', 1)
    left = re.findall(r"Inter(?=['\",;) ])|Fraunces|JetBrains|fonts\.googleapis", s)
    assert not left, (path, left)
    open(path, 'w', encoding='utf-8').write(s)
    print(path, n0, '->', len(s), 'ok')
