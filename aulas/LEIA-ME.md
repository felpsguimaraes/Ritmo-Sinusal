# Aulas do sinusal.

- Aula de Lesión celular (necrose, apoptose e acumulações): https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/lesion/
- Apostila direto (mesma conta): https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/apostila-lesao-celular/
- Painel do dono: https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/painel.html

As aulas antigas (`necrose`, `apoptosis`, `acumulaciones`) agora levam para a aula nova.

**Importante:** o site é publicado da branch `gh-pages`. Depois de enviar para a `main`, atualize também a `gh-pages`, senão nada muda no ar.

## Apostila

A apostila fica cifrada em `aulas/apostila-lesao-celular/conteudo.bin` (AES-GCM, HTML + imagens). A chave vai no documento `aulas/apostila-lesao-celular-pdf` do Firestore, pelo campo "Apostila" do painel do dono. Sem a chave, a apostila não abre.

## Como funciona para o aluno

1. **Conta**: na primeira vez a pessoa cria a conta (nome, turma A a G do 5º período, WhatsApp, e-mail e senha) ou entra com o Google e completa nome, turma e WhatsApp. Depois entra com e-mail e senha em qualquer aparelho, sem cadastro novo. Tem "Esqueci minha senha". Cada WhatsApp só pode ter uma conta. Quem entrou antes pelo cadastro sem senha só cria o e-mail e a senha e mantém tudo.
2. **Escolha**: logo depois de entrar, escolhe **Aula em 3D** ou **Material em PDF**. As abas (embaixo no celular, em cima no computador) trocam a qualquer momento.
3. **PDF**: abre dentro do site, com índice, zoom e página salva. O arquivo fica cifrado no GitHub; a chave só é entregue a quem tem conta e não foi bloqueado.
4. **Treino**: as 39 questões das provas antigas e do repaso, mais as 12 tarjetas, uma por vez. Treino do dia (10 perguntas: primeiro o que precisa revisar, depois o que ainda não viu), simulado de cada prova antiga (gabarito só no fim), por tema, revisão dos erros e tarjetas. Nas abertas a pessoa compara com o gabarito e marca Errei, Quase ou Acertei. Repetição espaçada: o que erra volta antes; o que acerta volta em 1, 3, 7 e 16 dias. Cada pergunta tem link para o tema na aula 3D e para a página do PDF.

## Painel do dono

Pessoas juntadas pelo WhatsApp (mesmo quem entrou antes por vários aparelhos), com aviso quando dois cadastros têm o mesmo nome e turma; turma, e-mail, acessos, temas vistos, treinos e % de acertos; como estudam (3D, PDF, treino); perguntas que a turma mais erra; filtro por turma; CSV; bloquear e liberar. Só `felpsguimaraes@gmail.com` abre, entrando com Google.

## Onde fica cada coisa

- `aulas/app.js`: telas de entrada, escolha, PDF e treino (servem para todas as aulas).
- `aulas/<aula>/index.html`: a página de cada aula; define `window.SINUSAL_AULA` (id, título, imagem de capa, nº de temas).
- Firestore `aulas/<aula>`: texto da aula 3D. `aulas/<aula>-treino`: perguntas do treino. `aulas/<aula>-pdf`: chave e índice dos PDFs.
- `aulas/<aula>/pdf/*.bin`: PDFs cifrados (AES-GCM).
- `aulas/firestore.rules`: regras do banco (Firestore → Regras → Publicar quando mudar).

Projeto Firebase `sinus-b1bfb`: Authentication com E-mail/senha, Google e Anônimo (só para quem já tinha entrado antes criar a senha), domínio `felpsguimaraes.github.io` autorizado, Firestore com as regras deste arquivo. O plano gratuito cobre o uso das turmas com folga.
