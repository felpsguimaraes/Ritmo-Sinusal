# Mapas guiados: o que falta (pausado em 24/10/2026)

Branch `mapas-guiados` (PR #3). Nada deste branch está no `main` ainda.

## Atenção: o `main` já tem outra versão dos mapas (PR #4)

O PR #4 ("Adicionar Mapas guiados com termos completos e correção de listas") foi mesclado no `main` e
publica uma cópia revisada em `/aulas/mapas/`, aberta pela aba Mapas guiados da matéria (só teoria).
Ela traz decisões pedidas pelo Felipe que precisam continuar valendo:

- correção exige a resposta completa (só maiúsculas e espaços são ignorados); palavras-chave só dão "parcial";
- listas com quantidade pedida (`answerSet` + `minimum`), sem repetir exemplo;
- `gabaritos-revisados.js` (`window.SINUS_MAPAS_REVISAO`): 41 respostas com fonte e respostas aceitas;
- a resposta aparece no próprio campo depois de Verificar (botão `.inline-answer`), sem lista de gabarito embaixo;
- modo de memória: uma resposta por linha;
- rótulo do parcial: "Ajustar ao gabarito" / "para ajustar"; nível 2 "Desafio" (pt);
- nota na tela inicial: escrever o termo completo, com grafia e acentos;
- `message` do tema só aceita `origin` e `source` do próprio painel.

As 8 correções de texto do PR #4 (idiopática, alfa-1-antitripsina como proteína, CE50, adrenalina IM na
face anterolateral da coxa, salicilatos com alcalose respiratória e acidose metabólica, receptores dos
corticoides) já estão em `mapas/dados/`.

## 1. Unificar com o `main` (fazer primeiro)

1. `git merge origin/main`. Conflitos esperados:
   - `index.html`: manter `atlas-revalida.js?v=revalida-treino-20261023`, `admin-integration.js?v=2`
     e acrescentar `/sinus/mapas-guiados.js` (aba Mapas guiados do menu).
   - `sinus/integracao-v17.js`: ficar com `renderMapasMateria()` → `/mapas/?s=<slug>&modo=teoria|pratica`;
     apagar o bloco do `main` que abre `/aulas/mapas/`; filtrar o botão "Mapas guiados" com
     `temMapas()`, usando `MAPAS_MATERIAS = { anatopato: { teoria: 1, pratica: 1 }, farmacologia: { teoria: 1 } }`.
2. Levar para `/mapas/` o que o PR #4 mudou em `/aulas/mapas/`:
   - `mapas-core.js`: `exactNorm` + `evaluate` estrito do PR #4 (resposta inteira, `acceptedAnswers`,
     `answerSet`/`minimum`, memória por linha); o parcial pode usar `has()` (aceita as chaves `^`).
     Criar `evaluateKeys` (a correção por conceitos de hoje) e usar nas láminas (`lamCheck`), porque a
     descrição da lâmina é texto livre.
   - copiar `gabaritos-revisados.js` para `/mapas/`, carregar antes do `mapas.js` e aplicar no compile
     (`ans`, `acceptedAnswers`, `answerSet`, `minimum`, `source`), reavaliando o `S.c` salvo.
   - `mapas.js`: textos acima, nota inicial só na teoria, `paint()` com `.inline-answer` (não nas
     láminas), feedback da teoria vazio (o `#fb` continua para a planilha das láminas).
   - `mapas.css`: estilos `.inline-answer*`.
   - `tools/testar-mapas.cjs`: apontar para `mapas/`; em `tools/testar-mapas.js`, o texto da memória
     passa a ser unido por quebra de linha.
   - `/aulas/mapas/index.html`: redirecionar para `/mapas/` (mesma query e hash) e apagar as cópias.
3. Rodar `node tools/testar-mapas.js`, `node tools/testar-mapas.cjs` e o teste de navegador em duas
   larguras (1280 e 390).

## 2. Prática

- Anatomía Patológica I: láminas prontas (P1, P2, laminário de 25, simulacro). Falta transformar as
  aulas práticas em mapas direcionados: "clase 1-Adaptación Celular parte 1 e 2", "clase 2-Lesión celular",
  "clase 3-Acumulos intracelulares", "clase 4-Inflamación aguda y crónica PARTE 1", "clase 4-Inflamación
  crónica", CUADERNILLO DE PRACTICAS (`1rwM99lp4EWfyVs1b9NYmyUoTw0Rcr1lD`) e "ANATOPATOLOGIA aula 1 a 6".
- Quadro da Dra. Alicia Gonzalez, 30/09 (`1JgJiMrB_cOJCP7VI4SMa3km-vZZxLi1c`), apendicitis aguda:
  - estruturas: criptas de Lieberkühn na mucosa (glândulas tubulares com enterócitos, que absorvem
    eletrólitos e água, e células caliciformes, que liberam muco); erosão da mucosa; ulceração; nódulos
    linfoides da submucosa; neutrófilos na muscular; vasos hiperemiados e edema na serosa; hemorragia; necrose;
  - patogenia: obstrução por fecalito → ↑ muco → ↑ pressão na luz → vênulas e capilares comprimidos
    (parede fina) → vênulas congestionadas (sangue parado) e edema → arteríolas também comprimidas →
    não chega sangue nem O2 → isquemia → necrose → perfuração.
- Fotos sem rótulo da pasta LAMINARIO P2 (IMG_0026…IMG_3348, FullSizeRender 3 e 5, IMG_5070, IMG_5078,
  IMG_7881, IMG_1283, IMG_1634, IMG_1640, IMG_1642, IMG_1643, IMG_3140) não entraram: não se sabe de qual lâmina são.
- Semiología: mapas do exame físico e da ausculta a partir dos slides (Semio 7 Tórax só por
  `read_file_content`; HC práctica `1B-2TKgADIlgucxGCcDrHxb2F4cSl87S2`).

## 3. Mapas das outras matérias

Semiología, Fisiopatología, Imagenología, Medicina de la Familia e Farma clase 1.2
(`1h3sXGwZMpPBks_W4r4Ko3Y54S86dS8wV`), cada módulo com `sl`. Depois, ampliar `MAPAS_MATERIAS` e o texto
de `sinus/mapas-guiados.js`. Decks grandes demais para baixar (Semio 7 Tórax; Fisio U0, U1, U2, U3, U5,
U6, U7 Anemias): ler com `read_file_content` (vem sem número de página). Os dois arquivos de casos da
Fisio P2 foram baixados, mas não decodificados.

## 4. Farmacología, clase 8

73 páginas sem método que funcionou para numerar os slides; hoje os módulos usam `sl: [[8]]` (ordem da aula).

## 5. Fechamento

Validador e navegador nas duas larguras, README, republicar o artefato de demonstração
(`23a91748-05cd-4832-a159-2137f29f5c6e`) e relatório.
