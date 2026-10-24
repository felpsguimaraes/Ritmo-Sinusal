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

Aba **Mapas guiados** (menu "Estudo e revisão"): mapas mentais, fluxogramas e tabelas com a estrutura pronta, em que o aluno só completa os campos e compara com o gabarito. Conteúdo do 5º semestre em duas matérias, montado a partir das aulas do Drive:

- Anatomía Patológica I (Dra. Eliana Chamorro Krauer): 15 mapas, aulas 1 a 7.
- Farmacología I (Dr. Cristhiam Giménez): 30 mapas, aulas 1 a 9.

Arquivos: `mapas/` (tela, estilos e núcleo de correção), `mapas/dados/*.js` (um arquivo por matéria) e `sinus/mapas-guiados.js` (a aba dentro do painel). O formato para criar mapas novos está no cabeçalho de `mapas/dados/anatopato.js`. Depois de editar os dados, rode `node tools/testar-mapas.js`: cada resposta-modelo precisa ser aceita pelas próprias palavras-chave. O progresso do aluno fica salvo no navegador dele.

