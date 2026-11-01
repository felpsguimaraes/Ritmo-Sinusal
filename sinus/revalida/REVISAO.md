# Revisão do Revalida — 23/10/2026

## Estado da revisão

Esta alteração NÃO conclui a revisão clínica integral nem foi publicada.

- 39 documentos originais no corpus acessível.
- 1.559 registros de questões/estações auditados estruturalmente após recuperar 96 segmentos do caderno 1 de 2017. O total inclui versões de cadernos e não representa questões únicas validadas.
- 820 associações candidatas a gabaritos em documentos identificados. Não liberadas como correção automática sem conferência da questão.
- 1 questão com enunciado, alternativas e célula do gabarito conferidos visualmente: Revalida 2023/1, objetiva, questão 1, resposta D.
- A justificativa dessa questão foi redigida com assistência de IA e referência AHA 2025; não há revisão docente registrada.
- 1.558 registros restantes com revisão de conteúdo pendente.

## Correções realizadas

- Reconhecimento de alternativas cuja letra está em linha separada.
- Limpeza conservadora de etiquetas de impressão em linhas isoladas.
- Recuperação da sequência de 100 questões no caderno 1 de 2017 usando a ordem das colunas. Essa recuperação ainda exige comparação visual do conteúdo.
- Bloqueio do envio de resposta nas objetivas sem alternativas recuperadas, que antes podiam aparecer como discursivas.
- Justificativas individuais e fontes no painel direito apenas quando a revisão específica autoriza a correção.
- Remoção da escolha automática do primeiro gabarito quando houver mais de uma versão sem correspondência identificada.

## Pendências impeditivas

1. Revisar visualmente todos os enunciados, tabelas, imagens, medidas e alternativas contra os PDFs.
2. Reparar os cadernos cuja segmentação continua incompleta (inclusive 2012, caderno 2 de 2017 e documentos dependentes de OCR).
3. Obter os PDFs não localizados no acervo (42 dos 136 itens do índice inicial). O gabarito definitivo de 2026/1 não foi recuperado nesta sessão: a URL oficial retornou 502/503 e a busca no Drive não encontrou o arquivo correspondente.
4. Conferir as células dos gabaritos e redigir/revisar todas as justificativas clínicas com fonte específica.
5. Conectar acesso de escrita ao GitHub e confirmar o processo de implantação em meusinus.pages.dev. O workflow presente no repositório pede publicação do GitHub Pages; não comprova implantação no Cloudflare.

## Validação técnica

JavaScript do painel e do integrador passou na verificação de sintaxe. Teste em navegador confirmou seleção do caderno 2023/1, resposta D, justificativa por alternativa e links de fontes. Uma questão sem anotações preparadas não recebe os grifos de outra questão.

## Arquivos

- `banco-revisao.json`: questões, candidatos a gabarito e estados de revisão.
- `auditoria-revisao.json`: pendências individuais, reparos estruturais e contagens.
- `../revalida-treino.html`: painel com dados integrados.

Os candidatos não constituem validação. Manter `auto_grade_enabled=false` até que a questão específica tenha sido conferida.
