# Mapas guiados: o que falta (pausado em 24/10/2026)

Entregue no `main` em 24/10 (PR #3). O que segue é o que falta.

## Já feito na entrega de 24/10

O `main` tinha outra cópia dos mapas (PR #4, em `/aulas/mapas/`). As duas foram unificadas em `/mapas/`:
correção da teoria com resposta completa e listas (`evaluate`), `gabaritos-revisados.js`, resposta no
próprio campo depois de Verificar, textos e o filtro de `message` do PR #4; as láminas continuam com
correção por conceitos (`evaluateKeys`). `/aulas/mapas/` redireciona para `/mapas/`. A aba da matéria
abre `/mapas/?s=<slug>&modo=teoria|pratica`.

## 1. Prática

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

## 2. Mapas das outras matérias

Semiología, Fisiopatología, Imagenología, Medicina de la Familia e Farma clase 1.2
(`1h3sXGwZMpPBks_W4r4Ko3Y54S86dS8wV`), cada módulo com `sl`. Depois, ampliar `MAPAS_MATERIAS` e o texto
de `sinus/mapas-guiados.js`. Decks grandes demais para baixar (Semio 7 Tórax; Fisio U0, U1, U2, U3, U5,
U6, U7 Anemias): ler com `read_file_content` (vem sem número de página). Os dois arquivos de casos da
Fisio P2 foram baixados, mas não decodificados.

## 3. Farmacología, clase 8

73 páginas sem método que funcionou para numerar os slides; hoje os módulos usam `sl: [[8]]` (ordem da aula).

## 4. Fechamento

Validador e navegador nas duas larguras, README, republicar o artefato de demonstração
(`23a91748-05cd-4832-a159-2137f29f5c6e`) e relatório.
