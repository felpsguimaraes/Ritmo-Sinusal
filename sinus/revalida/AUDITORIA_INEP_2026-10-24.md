# Auditoria SINUS Revalida — 24/10/2026

> **Estado: revisão por lotes, não conclusão clínica.** Não apresentar quantidade de questões extraídas como quantidade de questões individualmente corrigidas.

## Fonte institucional e política de revisão

- Índice oficial do Inep: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/revalida/provas-e-gabaritos
- Comunicado oficial sobre cadernos e gabaritos preliminares de 2026/2, de 15/09/2026: https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/institucional/inep-divulga-gabarito-preliminar-do-enamed-2026-e-da-1a-etapa-do-revalida-2026-2
- Gabarito **definitivo de 2026/2** previsto pelo Inep para **04/12/2026**; não converter os preliminares em definitivos sem nova conferência.
- O número de uma questão é sempre associado à **edição e versão exatas do caderno**. Não transportar gabaritos entre cadernos com ordem diferente sem mapear a correspondência da questão.

## Retrato do banco local antes das melhorias deste lote

| Indicador | Resultado |
| --- | ---: |
| Registros da auditoria inicial anterior | 1.559 |
| Documentos reconhecidos no banco carregado | 94 |
| Cadernos/provas de origem com questões estruturadas | 39 |
| Registros de questões e estações nesses 39 cadernos | 1.463 |
| Pares textuais extras encontrados na triagem global | 384 |
| Questões objetivas sem quatro alternativas na estrutura anterior | 333 |
| Questões 2023/1 e 2024/1 com alternativas reparadas por texto do PDF | 36 |
| Questões objetivas que continuam sem quatro alternativas após os reparos | 297 (estimativa a confirmar por nova auditoria) |

A contagem **1.559** pertencia a uma auditoria anterior; **1.463** corresponde à soma de `questions` nos 39 cadernos da estrutura atual. A divergência de **96** registros ainda precisa ser conciliada por documento. **Não somar nem divulgar como total de questões únicas validadas.**

## Duplicação identificada e tratamento aplicado

1. Revalida **2015**, prova objetiva cinza e vermelha: 110 enunciados normalizados coincidentes entre as versões, com números reordenados. O painel prioriza a versão cinza, preservando a vermelha para consulta e conferência do gabarito correspondente.
2. **2026/1**, cadernos 1 e 2 já extraídos: 100 textos de enunciados coincidentes entre as duas versões. O painel prioriza o caderno 1 e preserva o 2 no arquivo.
3. **2025/2**, caderno 1 ampliado e superampliado: 87 correspondências textuais exatas entre 100 registros de cada versão; a versão superampliada fica oculta por padrão, mas acessível quando solicitado.
4. **2025/2**, caderno 2 versus caderno 1 ampliado: 82 enunciados coincidentes e 18 registros não coincidentes no teste textual. Os 82 ficam ocultos do modo deduplicado do caderno 2; os 18 **não devem ser chamados automaticamente de questões inéditas** sem inspeção visual dos PDFs.
5. Os documentos e o histórico de respostas não foram excluídos. O controle **“Exibir versões alternativas e questões repetidas”** restaura todos os cadernos no seletor. Retirada do treino principal ≠ apagamento da fonte.

## Provas com reparos de alternativa

No banco, a transcrição de duas provas continha **18 questões sem alternativas em cada edição**:

- **2023/1:** 9, 19, 26, 39, 49, 50, 56, 57, 60, 63, 68, 73, 85, 90, 92, 95, 98 e 100.
- **2024/1:** 15, 17, 20, 28, 30, 32, 38, 39, 40, 46, 48, 59, 70, 74, 84, 90, 93 e 100.

As 36 foram restauradas usando o texto dos cadernos PDFs de 100 questões do acervo do Drive. O estado `text_extracted_visual_pending` significa **texto recuperado, revisão visual de figuras/tabelas/formatação ainda pendente**. Nenhuma dessas 36 deve receber correção automática até conferência visual do enunciado e das alternativas.

## Gabaritos e justificativas

- Gabaritos definitivos **2023/1** e **2024/1** carregados para as respectivas versões regulares; anuladas devem aparecer como anuladas e não como erro.
- Justificativas clínicas individuais são apenas as registradas com fonte em `SINUS_CLINICAL_REVIEWS`; ter gabarito oficial **não** comprova justificativa clínica revisada.
- Gabaritos preliminares de **2026/2**, cadernos 1 e 2: disponíveis na pasta Drive `2026_2/1_etapa_escrita/Gabaritos_e_padroes`; devem ficar identificados como **preliminares**, sem revisão definitiva.
- Pasta Drive `2026_2/1_etapa_escrita/Cadernos` estava **vazia em 24/10/2026**. O Inep anunciou a disponibilização pública dos cadernos; é necessário recuperar os PDFs de origem antes de publicar questões dessa edição como transcritas.

## Priorização dos próximos lotes

1. **Integridade estrutural:** recapturar as questões faltantes das edições com segmentação incompleta, especialmente a objetiva de 2012 (6 itens), os dois cadernos objetivos de 2017 (4 itens cada) e a objetiva de 2022/1 (0 itens); verificar cada um contra o PDF.
2. **Acervo oficial:** cotejar cada edição e tipo (objetiva, discursiva e estações clínicas) disponível na lista oficial do Inep com o catálogo SINUS, distinguindo arquivo não encontrado, arquivo encontrado, texto extraído e texto validado.
3. **Gabaritos:** conferir versão por versão, diferenciar preliminares e definitivos, marcar anulações e impedir transposição incorreta por numeração.
4. **Revisão clínica:** para cada questão deduplicada, produzir justificativas por alternativa, referências verificáveis e status de revisão; não fabricar revisão automática para os demais itens.
5. **Qualidade:** inspecionar visualmente figuras, tabelas, valores, opções e páginas de fonte; testar versão móvel; publicar lotes menores e validar implantação no Cloudflare.

## Semântica obrigatória de status

- `arquivo_nao_localizado`: há referência do Inep, mas o documento não foi recuperado.
- `arquivo_localizado`: PDF identificado e linkado, ainda não transcrito.
- `extraido_sem_revisao`: texto OCR/nativo, estrutura não conferida.
- `texto_reparado_visual_pendente`: alternativas reextraídas do PDF e revisão visual pendente.
- `gabarito_oficial_conferido`: letra vinculada à versão exata; não equivale a análise clínica.
- `revisao_clinica_concluida`: enunciado e justificativas por alternativas e fontes foram revisados.

Estas distinções são necessárias para manter a confiança dos alunos na plataforma.


## Lote adicional de revisão — 24/10/2026

Após a auditoria inicial, foram acrescentados comentários por alternativa para:

| Edição | Questões deste lote | Status |
|---|---|---|
| 2023/1 | 10 (sífilis na gestação), 11 (trombocitopenia imune), 12 (massa testicular) | Gabarito definitivo conferido; comentários clínicos adicionados |
| 2024/1 | 9 (BI-RADS 4), 10 (dor torácica de alto risco), 11 (doença de Graves), 12 (massa testicular) | Gabarito definitivo conferido; comentários clínicos adicionados |

Fontes clínicas estão vinculadas no próprio objeto `SINUS_CLINICAL_REVIEWS` do arquivo `sinus/revalida-data/part-18.txt`. Esta etapa não substitui conferência visual integral do PDF nem valida automaticamente outras questões.

**Situação em 24/10/2026:** os PDFs de 2026/2 foram anunciados pelo Inep como disponibilizados em 15/09/2026; o gabarito definitivo está previsto para **04/12/2026**. No treino SINUS, a prova 2026/2 **não está importada como questões transcritas**. Usar somente gabaritos preliminares claramente identificados, sem classificá-los como definitivos.

**Lacunas estruturais críticas do banco:** 2012 objetiva (6 segmentos), 2017 objetivas 1 e 2 (4 segmentos por caderno), 2022/1 objetiva (0 segmentos). A priorização de reparos não deve remover as versões originais nem perder o vínculo de cada questão com sua edição.


## Evolução de grifos contextuais — 24/10/2026

O módulo `sinus/revalida-semiologia.js` recebeu uma atualização conservadora de regras de leitura: supressão de limiares numéricos adultos de PA e FR quando idade pediátrica ou desconhecida, combinação de contexto infeccioso e possíveis sinais de disfunção orgânica para destaque didático relacionado a sepse e identificação aproximada do foco do comando da banca (conduta versus investigação). A regra **não diagnostica sepse** e não altera gabaritos.

Regressões propostas em `sinus/revalida/tests/semiologia-contexto.test.cjs`: criança e adolescente com PA 80/50, adulto com PA 80/50, idade não especificada, febre isolada, pneumonia com oligúria, oligúria negada e oligúria sem contexto infeccioso.

**Importante:** testes automatizados foram adicionados ao repositório, mas sua execução no ambiente de CI e a validação visual por questão e em produção permanecem pendentes. Também faltam extrair e revisar contexto clínico individual de cada enunciado e aferir sensibilidade/especificidade de alertas sobre toda a base. A atualização de grifos não deve ser descrita como auditoria clínica concluída.
