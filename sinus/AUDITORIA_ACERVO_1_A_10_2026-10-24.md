# SINUS — Auditoria do acervo por matéria e período (24/10/2026)

## Objetivo e escopo
Vincular vídeo, imagens e provas às disciplinas **reais** do 1º ao 10º período, disponíveis para as turmas que efetivamente cursam cada disciplina. Não alterar arquivos ou permissões do Google Drive.

## Anatomia I e Anatomia II · Prática
- Criada a aba **Cátedra** entre **Slides** e **Vídeos / Áudios**, exclusivamente na prática de Anatomia I e II.
- O catálogo `sinus/anatomia-pratica-videos.json` contém **7 aulas classificadas como cátedra de Anatomia I** e **28 de Anatomia II**, separadas por disciplina e filtráveis por docente.
- Dois vídeos classificados como **revisão/simulado prático** permanecem na videoteca complementar, **fora** da aba Cátedra.
- Material da cátedra é reproduzido a partir do vídeo público original. Isso **não** comprova que cada aula seja uma publicação oficial da instituição.

## Histologia e Microbiologia
- **Histologia I:** sete vídeos MP4 identificados em uma pasta `Videos` no Drive, indexados em `sinus/estudo-acervo-disciplinas.js` para a prática, sem duplicar IDs existentes.
- **Histologia II:** roteiros, lâminas e apresentações existentes na Biblioteca são apresentados na prática como material visual; gravações próprias da cátedra ainda precisam ser verificadas individualmente.
- **Microbiologia I:** o índice `biblioteca/dados/medicina.json` registra **11 vídeos de prática**. O canal público fornece aulas complementares e de laboratório.
- **Microbiologia II:** materiais práticos do Drive e playlists da disciplina disponíveis; vídeos próprios da cátedra **não identificados com confiança**.
- O canal `@aislanfernandes4039` já tem **185 vídeos** indexados em `sinus/youtube-catalogo.json`. A identificação por palavras-chave não atribui aulas ambíguas a um período específico.

## Provas, avaliações, simulados
- `biblioteca/dados/provas-auditadas.json`: **560 arquivos** (inclui provas, questionários, simulados, revisões e fotos).
- **414 arquivos** possuem associação explícita de matéria e período no índice (1º a 6º períodos); **146 precisam de classificação adicional** por matéria e/ou período.
- A rotina `sinus/acervo-provas-auditado.js` inclui provas e simulados na aba **Provas**, com distinção de teoria/prática quando identificável.
- `sinus/drive-sync.js` prioriza **Provas práticas** antes de **Lâminas**, impedindo classificação indevida por causa da pasta de prática.
- Para os períodos **7º a 10º**, não foi localizado um conjunto de provas acadêmicas com associação inequívoca por matéria e período. As pastas de horários/rotações do 9º e 10º não devem ser tratadas como provas.
- Nenhum arquivo pendente deve ser ligado arbitrariamente a uma disciplina.

## Verificações técnicas
- Conferência de sintaxe JavaScript nos módulos editados.
- Catálogo Cátedra validado: **7 aulas** no painel de Anatomia I e **28 aulas** em Anatomia II, sem duplicidade de ID.
- Simulação da classificação de três arquivos de prática: prova fotográfica → **provas**; laminário → **pratica/laminas**; gravação MP4 → **videos**.
- Inserção dos scripts no `index.html` conferida; parâmetros de versão atualizados para evitar cache desatualizado.
- **Não representa garantia de disponibilidade online no Cloudflare Pages**. A implantação em `meusinus.pages.dev` requer confirmação no painel de deploy e teste real de login/permissões.

## Teste manual após implantação
1. Selecionar turma/1º período → Anatomía I → Prática → **Cátedra**. Confirmar 7 aulas, filtros de docente e reprodução.
2. Selecionar turma/2º período → Anatomía II → Prática → **Cátedra**. Confirmar 28 aulas.
3. Em ambas as matérias, abrir **Vídeos / Áudios** e conferir que revisões/simulados práticos permanecem acessíveis.
4. Verificar Histologia I, Histologia II, Microbiologia I e II → **Prática → Vídeos / Áudios**; arquivos do Drive podem exigir autorização original.
5. Navegar por todas as turmas/períodos 1–10 e conferir as provas de cada disciplina; onde não houver identificação segura, manter pendente, sem material de outra matéria.

## Arquivos centrais
- `sinus/integracao-v17.js`
- `sinus/anatomia-pratica-videos.js`
- `sinus/anatomia-pratica-videos.json`
- `sinus/estudo-acervo-disciplinas.js`
- `sinus/drive-sync.js`
- `sinus/acervo-provas-auditado.js`
- `sinus/medicina-import.js`
- `biblioteca/dados/medicina.json`
- `biblioteca/dados/provas-auditadas.json`
