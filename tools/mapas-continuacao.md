# Mapas guiados: o que ficou de fora (24/10/2026)

As seis matérias do 5º semestre têm mapas, casos e simulado (veja a seção "Mapas guiados" do README).
O que segue não entrou, e o motivo.

## Arquivos que não puderam ser usados

- Farmacología, aula 8 ("CLASE 8 ALUMNO", `1VQ8Ey48zOyd_CrsmZMeFO4fjghM9C1AX`): 11,2 MB, acima do limite de
  10 MB do download do Drive; a leitura em texto vem sem páginas. Os módulos da aula 8 seguem a ordem da aula,
  sem número de slide. Com uma cópia menor (PPTX ou PDF comprimido) dá para numerar.
- Anatomía Patológica, "CUADERNILLO DE PRACTICAS (anatopato prática)" (`1rwM99lp4EWfyVs1b9NYmyUoTw0Rcr1lD`):
  o download estoura o limite da conexão.
- Anatomía Patológica, "clase 4-Inflamación aguda y crónica PARTE 1" (`17p3cPQ4s4HCLgLDgUnKtuXMNyX-D0BZs`):
  não existe mais no Drive da turma. A parte de inflamação aguda da prática ficou só com o quadro de 30/09
  (apendicite).
- Medicina de la Familia: a pasta não traz a aula 3.
- Fotos sem rótulo da pasta LAMINARIO P2 (IMG_0026…IMG_3348, FullSizeRender 3 e 5, IMG_5070, IMG_5078,
  IMG_7881, IMG_1283, IMG_1634, IMG_1640, IMG_1642, IMG_1643, IMG_3140): não se sabe de qual lâmina são.

## Sem número de slide ("ordem da aula")

Decks lidos só como texto, por passarem de 10 MB: Fisiopatología U0, U1, U2, U3, U5, U6 e U7 (anemias),
Imagenología (todas as aulas menos "03 RX abdominal"), Semiología aula 7 (tórax) e Farmacología aula 8.

## Para publicar no app

O branch `mapas-guiados` (PR #3) tem tudo; o Cloudflare publica a partir do `main`. Falta o merge do PR #3.

## Ao editar os dados

Rode `node tools/testar-mapas.js` e `node tools/testar-mapas.cjs`. O teste estrito recusa uma resposta que
continue aceita sem a última letra: com singular e plural, ponha o singular primeiro ("Pasta || Pastas").
