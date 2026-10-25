# Ritmo Sinusal

Plataforma de estudo de Medicina.

**Aplicativo atual:** https://meusinus.pages.dev

**Painel inicial do 5º G:** https://meusinus.pages.dev/

O endereço https://felpsguimaraes.github.io/Ritmo-Sinusal/ encaminha para o aplicativo atual. Ele mantém seu perfil, biblioteca, matérias e Revalida no ambiente com servidor. A primeira implantação prioriza o 5º G, com seis matérias e separação entre conteúdo da turma, fotos de aula e referências históricas.

O catálogo inicial acrescenta 87 PDFs, nove coleções com 158 fotos e sete vídeos. As fontes do Drive continuam exigindo as permissões originais. Fotos HEIC/HEIF e documentos que precisam de revisão adicional ainda não foram incluídos.

A aplicação atual tem APIs e armazenamento próprios. O espelhamento integral de sua fonte neste repositório e a migração para Firebase ainda estão pendentes. O acesso público pelo GitHub Pages funciona como entrada para a publicação atual.

## Versão anterior e aulas

A versão anterior do arquivo único foi preservada em `index-legacy.html`, no mesmo diretório, e no histórico Git. As aulas existentes continuam na pasta `aulas/`:

- Necrose: https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/necrose/
- Apoptose: https://felpsguimaraes.github.io/Ritmo-Sinusal/aulas/apoptosis/

O aplicativo atual é publicado em um ambiente com servidor, banco e arquivos privados; o GitHub Pages hospeda a entrada e as aulas estáticas. O workflow existente solicita a publicação da branch `gh-pages`.

### Aulas preservadas no GitHub

- [Necrose](aulas/necrose/)
- [Apoptosis](aulas/apoptosis/)
- [Acumulaciones intracelulares](aulas/acumulaciones/)

As três aulas e seus PDFs/imagens permanecem nos caminhos originais.

## Administração

A entrada antiga `aulas/painel.html` encaminha ao painel atual em `https://meusinus.pages.dev/admin/control/`. A ativação do backend está documentada em [admin/control/README.md](admin/control/README.md).

## Mapas guiados

Os mapas mentais, fluxogramas e tabelas com a estrutura pronta (o aluno só completa os campos e compara com o gabarito) aparecem em dois lugares do Sinus:

- **Dentro de cada matéria**, na barra de exercícios ao lado de Flashcards (Treino · Flashcards · **Mapas guiados** · Provas · Revisão). Cada matéria mostra só os mapas dela (`/mapas/?s=<matéria>`; a chave Teoria/Prática da matéria passa `&modo=teoria` ou `&modo=pratica`).
- No menu "Estudo e revisão", com todas as matérias juntas.

Conteúdo do 5º semestre, montado a partir dos slides das aulas no Drive da turma, na ordem dos slides:

| Matéria | Docente | Teoria | Prática |
| --- | --- | --- | --- |
| Anatomía Patológica I (`anatopato`) | Dra. Eliana Chamorro Krauer; prática: Dra. Alicia Gonzalez | 15 mapas das aulas 1 a 7, casos e simulado | láminas da P1, da P2 e do laminário (níveis 1 e 2) e simulacro; 10 mapas das aulas práticas 1 a 4 e do quadro da apendicite; casos de lâmina; treinos do Laminario total corregido (20 nov, pasta da turma E): mapas por processo e de mesmo órgão, 4 quadros por bloco, quiz pela foto, quiz pela descrição, 34 verdadeiro ou falso e simulacro só do laminário |
| Farmacología I (`farmacologia`) | Dr. Cristhiam Giménez | 35 mapas das aulas 1, 1.2 (formas farmacêuticas) e 2 a 9, casos e simulado | — |
| Fisiopatología I (`fisiopatologia`) | Dr. Kevin Feijó | 45 mapas das unidades 0 a 7 e anemias, casos de anemia e de choque, simulado | — |
| Imagenología (`imagenologia`) | Dr. Kevin Feijó | 31 mapas das aulas 00 a 5.0, TC, RM e TCE, casos e simulado | — |
| Medicina de la Familia (`familia`) | Dra. Loren Noguera | 39 mapas das aulas 1, 2 e 4 a 10, quatro exercícios de leitura de familiograma com a figura da lâmina, cálculos de APGAR, Holmes e crescimento, simulado | — |
| Semiología Médica I (`semiologia`) | Dra. Cielo Brizueña; prática: Dra. Lilian Nuñez | 27 mapas das aulas 1 a 7, casos e simulado | ectoscopia, HC, planos do exame de tórax, coração e abdome, ausculta |

**Três níveis** (abas no topo): 1 Guiado (estrutura pronta e pistas); 2 Desafío (mapas em texto livre sem estrutura, tabelas com células ocultas, fluxogramas lineares para colocar na ordem); 3 Prova (casos clínicos e simulados de múltipla escolha com cronômetro e nota). Em cada mapa dá para alternar entre Guiado e Desafío.

**Guia por slides**: cada mapa informa em quais slides da aula está (campo `sl` nos dados; `clases` dá o nome de cada aula) e a lista segue a ordem dos slides. Sem número de slide, só com "ordem da aula": a aula 8 de Farmacología (PDF de 11,2 MB, acima do limite de download) e os decks de Fisiopatología, Imagenología e a aula 7 de Semiología que só puderam ser lidos como texto.

**Casos com figura**: um módulo de casos pode ter `figura` (imagem em `mapas/img/`), que fica fixa ao lado das perguntas no computador e em cima no celular, com zoom. É o caso dos familiogramas de Medicina de la Familia. Cada caso também pode ter a própria foto (7º item do caso, `{ src, alt }`), como no quiz pela foto do laminário; o texto alternativo não pode entregar a resposta (o teste confere). Com `explicar: true`, a explicação do caso aparece depois de Verificar, e `rotulo` troca o nome do tipo no cartão.

**Correção da teoria** (revisão do PR #4): a resposta precisa estar completa, com grafia e acentos; só maiúsculas e espaços são ignorados, e as palavras-chave apenas marcam "ajustar ao gabarito". Listas pedem a quantidade indicada, sem repetir exemplo. As respostas revisadas, com fonte, ficam em `mapas/gabaritos-revisados.js`. Depois de Verificar, a resposta aparece no próprio campo.

**Prática de Anatomía Patológica I (láminas)**: com a chave Teoria/Prática da matéria em Prática (ou `?modo=pratica`), cada lâmina tem as fotos (laminário em PDF recortado sem rótulos, imagens que a professora mandou e fotos da turma no microscópio, pela miniatura pública do Drive) e a folha da prova: ÓRGANO, PROCESO, DESCRIPCIÓN e DX. Nível 1 com banco de palavras e o número de alterações; nível 2 sem banco e embaralhado; nível 3 simulacro com 8 lâminas sorteadas e cronômetro. A descrição é corrigida achado por achado e a planilha mostra a pontuação de cada lâmina (cada parte vale o mesmo; não é o critério oficial). Listas: P1 (quadro "Láminas p/ prova"), P2 (quadro "Temas P2 Práctica") e o laminário completo de 25. Entre as lâminas, os mapas das aulas práticas e um quadro de revisão por aula no formato da prova. Os quadros do laminário têm `claves: true`: no nível 2 a célula oculta vale pelas palavras-chave (como a descrição da lâmina), não pela frase exata. A aula `lt` dos dados troca "slides" por "láminas" no rótulo (terceiro item de `clases`). Dados em `mapas/dados/anatopato-pratica.js`, fotos do PDF em `mapas/img/laminario/`.

Arquivos: `mapas/` (tela, estilos e núcleo de correção), `mapas/dados/*.js` (um arquivo por matéria), `sinus/mapas-guiados.js` (o item de menu) e a aba da matéria em `sinus/integracao-v17.js`. O endereço antigo `/aulas/mapas/` redireciona para `/mapas/`. O formato para criar mapas novos está no cabeçalho de `mapas/dados/anatopato.js`. Depois de editar os dados, rode `node tools/testar-mapas.js` e `node tools/testar-mapas.cjs`. O progresso do aluno fica salvo no navegador dele. O que falta fazer está em `tools/mapas-continuacao.md`.

