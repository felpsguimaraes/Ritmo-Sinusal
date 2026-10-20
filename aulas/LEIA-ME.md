# Aulas do sinusal. com login Google

- Aula de Necrose: https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/necrose/
- Painel do dono: https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/painel.html

Quem abre o link entra com a conta Google. O painel mostra quantas pessoas entraram, quantas vezes, quando e quais temas abriram, e permite bloquear alguém. Só o e-mail `felpsguimaraes@gmail.com` abre o painel.

O texto da aula (conteúdo, questões, mapa) fica guardado no Firestore e só é entregue a quem entrou com Google e não foi bloqueado. As imagens das lâminas ficam nesta pasta do GitHub, que é pública.

## Configuração (uma vez, uns 10 minutos)

1. Entre em https://console.firebase.google.com com `felpsguimaraes@gmail.com` e crie um projeto (pode chamar de `sinusal`; o Google Analytics não é necessário).
2. **Authentication** → Começar → Método de login → **Google** → Ativar → escolha o e-mail de suporte → Salvar.
3. Ainda em Authentication → **Configurações** → Domínios autorizados → Adicionar domínio: `felpsguimaraes.github.io`.
4. **Firestore Database** → Criar banco de dados → modo de produção → local `southamerica-east1 (São Paulo)`.
5. Firestore → **Regras** → apague o que estiver lá, cole o conteúdo de `aulas/firestore.rules` → Publicar.
6. Engrenagem (Configurações do projeto) → Seus apps → ícone **Web `</>`** → dê um apelido → Registrar app. Copie os valores `apiKey`, `authDomain`, `projectId` e `appId` para `aulas/config.js` (dá para editar direto no GitHub, no lápis do arquivo) e salve.
7. Abra o painel, entre com Google e use **Enviar arquivo da aula** com o arquivo `necrose-conteudo.html`. Esse arquivo não fica no GitHub de propósito, para o texto da aula não ficar público.

Pronto: o link da aula pode ir para a turma.

## Custos

O plano gratuito do Firebase (Spark) cobre o uso de uma turma com folga: cada visita gasta poucas leituras e duas ou três gravações no banco. As imagens são servidas pelo GitHub Pages, sem custo.
