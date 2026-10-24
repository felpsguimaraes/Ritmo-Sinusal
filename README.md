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

- **Dentro de cada matéria**, na barra de exercícios ao lado de Flashcards (Treino · Flashcards · **Mapas guiados** · Provas · Revisão). Cada matéria mostra só os mapas dela (`/mapas/?s=anatopato` e `/mapas/?s=farmacologia`).
- No menu "Estudo e revisão", com as duas matérias juntas.

Conteúdo do 5º semestre, montado a partir dos slides das aulas no Drive:

- Anatomía Patológica I (Dra. Eliana Chamorro Krauer): 15 mapas das aulas 1 a 7, casos clínicos e um simulado.
- Farmacología I (Dr. Cristhiam Giménez): 30 mapas das aulas 1 a 9, casos clínicos e um simulado.

**Três níveis** (abas no topo): 1 Guiado (estrutura pronta e pistas); 2 Desafío (mapas em texto livre sem estrutura, tabelas com células ocultas, fluxogramas lineares para colocar na ordem); 3 Prova (casos clínicos e simulados de múltipla escolha com cronômetro e nota). Em cada mapa dá para alternar entre Guiado e Desafío.

**Guia por slides**: cada mapa informa em quais slides da aula está (campo `sl` nos dados) e a lista segue a ordem dos slides. A Clase 8 de Farmacología (PDF de 11 MB) não pôde ser baixada, então ela só segue a ordem da aula, sem número de slide.

**Correção da teoria** (revisão do PR #4): a resposta precisa estar completa, com grafia e acentos; só maiúsculas e espaços são ignorados, e as palavras-chave apenas marcam "ajustar ao gabarito". Listas pedem a quantidade indicada, sem repetir exemplo. As respostas revisadas, com fonte, ficam em `mapas/gabaritos-revisados.js`. Depois de Verificar, a resposta aparece no próprio campo.

**Prática de Anatomía Patológica I (láminas)**: com a chave Teoria/Prática da matéria em Prática (ou `?modo=pratica`), cada lâmina tem as fotos (laminário em PDF recortado sem rótulos, imagens que a professora mandou e fotos da turma no microscópio, pela miniatura pública do Drive) e a folha da prova: ÓRGANO, PROCESO, DESCRIPCIÓN e DX. Nível 1 com banco de palavras e o número de alterações; nível 2 sem banco e embaralhado; nível 3 simulacro com 8 lâminas sorteadas e cronômetro. A descrição é corrigida achado por achado e a planilha mostra a pontuação de cada lâmina (cada parte vale o mesmo; não é o critério oficial). Listas: P1 (quadro "Láminas p/ prova"), P2 (quadro "Temas P2 Práctica") e o laminário completo de 25. Dados em `mapas/dados/anatopato-pratica.js`, fotos do PDF em `mapas/img/laminario/`.

Arquivos: `mapas/` (tela, estilos e núcleo de correção), `mapas/dados/*.js` (um arquivo por matéria), `sinus/mapas-guiados.js` (o item de menu) e a aba da matéria em `sinus/integracao-v17.js`. O endereço antigo `/aulas/mapas/` redireciona para `/mapas/`. O formato para criar mapas novos está no cabeçalho de `mapas/dados/anatopato.js`. Depois de editar os dados, rode `node tools/testar-mapas.js` e `node tools/testar-mapas.cjs`. O progresso do aluno fica salvo no navegador dele. O que falta fazer está em `tools/mapas-continuacao.md`.

