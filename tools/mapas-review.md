# Mapas guiados — revisão de publicação

- 45 mapas, 5 módulos de casos/simulados, 798 itens base.
- Teste automático: 941 campos de texto incluindo células ocultas; respostas canônicas, caixa/espaços, truncamentos, acentos, negativas, alternativas e listas com cardinalidade.
- 51 conjuntos de alternativas explícitas para perguntas que pedem exemplos. Não se aceitam fragmentos como resposta correta. Duplicar um exemplo não satisfaz a quantidade pedida.
- 41 respostas têm referência terminológica individual no arquivo gabaritos-revisados.js. A conferência literal integral de todos os itens NÃO está concluída; tabelas/imagens de alguns PDFs exigem cotejo visual. Os testes de código não certificam conteúdo médico.
- O material original e as aulas 2–7 de Anatomia Patológica e 2–9 de Farmacologia foram consultados. Não atribuir certificado de revisão total ao banco.
- A interface apresenta gabarito direto e a referência do módulo, sem selos de validação por slides, conforme solicitado.
- As respostas e progresso ficam no navegador, separados por usuário quando incorporados no painel autenticado. Não há sincronização de progresso nesta alteração.

## Correções de conteúdo

- Termos completos para lipoproteínas de baixa/alta densidade e parâmetros da curva farmacocinética.
- CE50 é concentração, não DE50 (dose); removida equivalência incorreta.
- Alfa-1-antitripsina tratada como proteína no enunciado.
- Via intramuscular da adrenalina: face anterolateral da coxa. Referência: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3b7a4364-668d-4eb2-a20c-04adc35aabe4
- Salicilatos: alcalose respiratória e acidose metabólica, substituindo a generalização “acidosis mixta”. Referência: https://www.rch.org.au/clinicalguide/guideline_index/Salicylates_Posioning/

## Validação

Executar `node tools/testar-mapas.cjs`. Na interface, “Radiación; Traumatismo” é aceita quando se pedem dois agentes físicos; “Hipox” não recebe acerto. O arquivo de demonstração com respostas pré-preenchidas não é carregado.
