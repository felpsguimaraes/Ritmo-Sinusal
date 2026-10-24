# Administração SINUS

Painel: https://meusinus.pages.dev/admin/control/

## Publicação atual

A migração inicial e as três migrações da expansão foram aplicadas no projeto Supabase do SINUS. A API `sinus-admin-api` está ativa na versão 2, com autenticação própria por Supabase Auth e permissões consultadas no banco a cada solicitação. A conta proprietária permanece protegida. Nenhum aluno foi bloqueado, nenhum preço foi alterado e nenhuma mensagem real foi enviada durante a implementação.

A interface está sendo atualizada no mesmo repositório e no domínio canônico. Não foi criado um segundo portal.

## Ferramentas e planos

O catálogo contém 49 ferramentas, incluindo biblioteca e seus tipos de material, estudo por matéria, agenda e horários, cronômetro, tela dividida, tipos de questões, treinos, flashcards, simulados, Revalida, Enamed, habilidades clínicas, Atlas, transcrição, caderno, estatísticas, comunidade e imigração.

- A disponibilidade global fica em **Funções e avisos**.
- **Acessos e limites por plano** configura, por ferramenta e operação, permissão e cotas diárias, mensais e totais. As operações são visualização, uso/execução e download pelo portal.
- Campo vazio significa ilimitado; zero significa nenhum uso. Os períodos seguem o calendário UTC. O total conta o histórico do aluno e não é zerado pela troca de plano.
- As cotas começaram ilimitadas, para preservar o acesso existente. Os planos pagos existentes e o grupo gratuito/sem assinatura possuem regras próprias. Não foram inventadas franquias comerciais.
- Mensagens recebidas, início, perfil e planos são recursos essenciais de conta e não podem ser desligados.
- O proprietário não consome franquia. Suporte, conteúdo e financeiro conservam as permissões de sua função; apenas o proprietário pode conceder manualmente acesso a um plano. Essa concessão não cria cobrança nem cancela assinatura paga.
- Operações protegidas reservam a cota no banco com trava por conta, idempotência por UUID e reserva atômica de múltiplos contadores. Uma nova tentativa da mesma solicitação não conta de novo.

## Cadastro acadêmico

A lista de usuários e os detalhes do cadastro mostram turma e período, além de campus e grupo de prática quando informados. O backend consulta os documentos existentes em `perfis/{uid}` e `progresso/{uid}_sinus-perfil`. Campos ausentes permanecem nulos e aparecem como **Não informado**. Não há semestre padrão inventado para completar o cadastro administrativo. A busca da lista atual inclui nome, e-mail, turma e período.

## Mensagens com imagem

- Entrega somente na caixa interna do SINUS; não envia WhatsApp, e-mail ou push externo.
- Destino: um aluno selecionado da lista, alunos atuais de um plano ou todos os alunos atuais. A lista de destinatários é resolvida no servidor e gravada no momento da publicação. Novos alunos não recebem retrospectivamente mensagens enviadas antes do cadastro.
- A prévia mostra o conteúdo e a quantidade de destinatários antes de confirmar. Mudanças na quantidade exigem nova revisão. Contas administrativas e bloqueadas não entram em envios para alunos.
- JPG, PNG e WebP; limite de 3 MB após redução da imagem no navegador, com remoção de metadados pela recodificação em canvas. SVG não é aceito.
- Anexos ficam no bucket privado `sinus-messages`; o servidor gera links com validade de dois minutos somente após validar a sessão e o destinatário.
- Cada aluno pode marcar apenas suas próprias mensagens como lidas. O painel mostra destinatários, leituras e permite retirar mensagens. Retirar não recolhe cópias já salvas.
- O envio usa um identificador idempotente; repetir uma solicitação não duplica a mensagem.

## Verificação

35 testes da API passaram com serviços simulados, sem enviar mensagens ou alterar alunos reais. Cobrem papéis, contas protegidas, origem e sessão, validação das cotas, mensagens, anexos, confirmação de destinatários, recibos e dados acadêmicos.

Cinco testes adicionais do portal passaram, verificando a reserva antes de abrir conteúdo, a negação de acesso, a preservação de recursos essenciais e a ordem das navegações dependentes.

O banco passou em oito verificações de cotas dentro de uma transação revertida: reserva inicial, repetição idempotente, franquia diária, mensal e total, reversão do lote ao negar uma etapa, indisponibilidade global e negação de execução anônima. As alterações de teste não foram persistidas.

As novas tabelas mantêm RLS habilitada e acesso somente pelo serviço. RPCs de cotas, publicação de mensagens e alterações administrativas são `SECURITY INVOKER` e têm execução revogada de `PUBLIC`, `anon` e `authenticated`. O acesso ocorre pela API que valida o usuário. Não há chave privilegiada nos arquivos do navegador.

## Limites materiais

A coleta e as cotas valem para os caminhos integrados ao portal. Links externos e arquivos já públicos ou baixados mantêm suas permissões originais. Não considerar um arquivo privado apenas porque a interface tem login. A revogação rigorosa de materiais exige armazenamento privado ou controle equivalente na origem.

A função de IA já existente permanece intacta: a revisão automática exigiu autorização específica para atualizar o processamento de documentos via OpenAI. O portal faz a reserva de cota antes do caminho integrado de IA, mas o backend de IA antigo não deve ser considerado uma barreira completa contra chamadas diretas enquanto sua atualização não for aprovada.

As aulas antigas em Firebase e suas chaves de conteúdo criptografado permanecem preservadas. Nenhum histórico do Firebase foi apagado ou migrado nesta alteração.

## Arquivos de banco

- `schema.sql`: instalação inicial, já aplicada.
- `schema-v2.sql`: catálogo, regras, acessos manuais, uso e mensagens, já aplicada. O arquivo-fonte já inclui a correção que verifica a permissão de visualização antes de uso/download.
- `schema-v2-helpers.sql`: reserva atômica de lotes e resumo de uso, já aplicada.
- `schema-v2-types.sql`: adiciona associação de pares e completar lacunas, já aplicada.
- `schema-v2-view-gate.sql`: correção aplicada à instalação existente, registrada separadamente no histórico de migrações.

Não executar novamente os scripts completos sobre tabelas existentes. Os arquivos são referência da implementação; novas alterações devem usar migrações próprias.
