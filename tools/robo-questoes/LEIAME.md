# Robô de questões do Sinus

Objetivo: alimentar o banco de exercícios (`aulas/exercicios/banco.js`) das 6 matérias do 5º semestre a partir dos slides e provas da cátedra, com fonte em cada item. Rodada a cada hora, até 2 unidades de trabalho por vez, devagar e com precisão.

## Regras que não mudam
1. **Só o material.** Cada exercício nasce de um slide, de uma prova da cátedra ou de um cartão já existente (`aulas/flashcards/cartoes.js`). Se o material não sustenta a resposta, **não cria o item**; registra em `estado.json > semBase` o motivo e segue.
2. **A resposta segue a prova e a escrita da professora**: mesma terminologia e mesma forma dos slides e provas (castelhano quando o material for em castelhano). Nada de reescrever com palavras próprias.
3. **Fonte obrigatória**: `fonte: {arquivo, slide|pagina}`. Sem fonte, o validador reprova.
4. **Já caiu em prova**: quando o tema aparece numa prova ou foto de prova do Drive, preencha `prova: {ref: "Parcial 2025 · Prof.", img: "<id do Drive da foto, se houver>"}`. Isso exibe o balão "Já caiu em prova". Só marque se você viu a prova.
5. **Explicação com ênfase**: `explanation` usa `**negrito**` e `==grifo==`; `why` explica o erro mais comum ("Por que se erra"). Ambos saem do slide.
6. **Nunca publicar sozinho.** Commits na branch `robo-questoes`, um único PR aberto para revisão do Felipe. Não fazer merge.
7. Não apagar nem alterar itens já aprovados; só acrescentar. Não mexer em outros arquivos além de `aulas/exercicios/banco.js` e `tools/robo-questoes/*`.

## Formato do item
```js
{id:"ap-iam-001", subject:"Anatomía Patológica I", period:"P2", mode:"theory"|"practice",
 type:"multiple"|"truefalse"|"complete"|"cita"|"match"|"flashcard"|"image", difficulty:"medium",
 prompt:"…", options:["…","…","…","…"], answer:"…", explanation:"…**termo**…==grifo==…", why:"…",
 image:null, active:true,
 fonte:{arquivo:"IAM.pptx", slide:12}, prova:{ref:"Parcial 1 2025", img:"<idDrive>"} }
```
`subject` deve ser exatamente: Anatomía Patológica I · Semiología Médica I · Fisiopatología I · Imagenología · Medicina de la Familia · Farmacología I. `id` único: `<sigla>-<assunto>-<n>`.

## Cada rodada (1 unidade)
1. `git fetch`; trabalhar na branch `robo-questoes` (criar a partir de `main` se não existir; se já existir, `git merge origin/main`).
2. Ler `estado.json`; pegar as 2 primeiras unidades de `fila` ainda não concluída (a fila já está na ordem: matéria → assunto → aba).
3. Ler **só** os arquivos dessa unidade: ids em `inventario.json` (slides, provas) via conector do Google Drive (`read_file_content`/`download_file_content`). Provas em foto: ler a imagem e transcrever.
4. Escrever de 8 a 15 exercícios da unidade, variando tipos (múltipla escolha, V/F, completar, cita) e o modo teoria/prática conforme a origem.
5. Rodar `node tools/robo-questoes/validar.js` e `node tools/testar-mapas.js` (se existir). Corrigir até zerar erros.
6. Atualizar `estado.json` (unidade `feita`, contagens, `semBase`), commit `robo: <matéria> · <assunto> (+N)`, push, abrir/atualizar o PR "Robô de questões (revisão)".
7. Parar. No máximo 2 unidades por rodada.

## Abas cobertas por matéria
Exercícios (questões) · Flashcards (cartões novos só se o assunto não tiver) · Mapas mentais (conceitos de cada assunto no campo `explanation`) · comentários das láminas (campo `k` dos cartões práticos, só com base nos slides).

## Qualidade
- Distratores plausíveis e do mesmo tema; nada de "todas as anteriores".
- Enunciado único por matéria (o validador barra duplicados).
- Prefira cobrir o que já caiu em prova antes do restante.
