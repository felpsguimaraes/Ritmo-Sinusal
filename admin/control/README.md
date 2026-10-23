# SINUS — administração conectada

Estado em 23/10/2026: a migração `sinus_admin_control` foi aplicada após autorização explícita. A conta proprietária foi confirmada, e a função `sinus-admin-api` está ativa na versão 1. Nenhum usuário foi bloqueado e os preços permanecem iguais. A API negou solicitações sem token e com token inválido. O helper RLS confirmou acesso permitido ao proprietário. O consultor de segurança reconhece as cinco tabelas com RLS sem políticas (intencionalmente exclusivas do serviço) e aponta proteção contra senhas vazadas desativada no projeto, anterior a esta alteração.

A atualização de `sinus-study-ai` permanece pendente: a revisão automática exige autorização específica para o processamento de materiais via OpenAI. A versão de IA já existente continua intacta. A visibilidade da IA na interface não deve ser tratada como bloqueio de autorização do backend até essa atualização ser aprovada e publicada. A publicação estática e a validação autenticada estão em andamento.

## Resultado

- A entrada histórica `aulas/painel.html` encaminha à administração no domínio canônico, sem carregar Firebase.
- Administração com sessão Supabase, verificação de função no servidor a cada chamada e dados sem persistência local administrativa.
- Usuários paginados, último login, bloqueio/desbloqueio com motivo e proteção do proprietário.
- Papéis: proprietário, suporte, conteúdo e financeiro. Contas comuns não acessam os dados administrativos.
- Catálogo de preços em centavos, disponibilidade dos planos e proteção contra divergência de preços já vinculados ao Stripe.
- Avisos aos alunos e visibilidade das funções. Desativação da IA também verificada pelo backend de estudo.
- Atividade autenticada, usuários únicos por dia (UTC), presença aproximada em cinco minutos e histórico das solicitações e conclusões administrativas.
- Leitura de metadados do Drive adaptada ao login atual, com autorização Google explícita do proprietário. Nenhum arquivo é excluído ou alterado.

## Ativação pendente

1. Revisar e aprovar `schema.sql`. A migração cria cinco tabelas com RLS e acesso exclusivo pelo serviço. Seleciona a conta `felpsguimaraes@gmail.com` como proprietária. Não muda os preços nem bloqueia usuários existentes. Acrescenta uma política restritiva às tabelas profiles, sinus_documents, subscriptions e sinus_ai_usage: operações autenticadas passam a verificar se a conta está bloqueada. Os direitos existentes continuam dependendo das políticas já instaladas.
2. Aplicar a migração como `sinus_admin_control` na referência Supabase `qyioizupudjrwmtasrue`. A instalação deve ser transacional; não executar trechos isolados. O arquivo falha caso as tabelas já existam, prevenindo sobrescrita acidental.
3. Publicar `supabase/functions/sinus-admin-api/index.ts`. O corpo verifica o token via Supabase Auth e consulta permissões atuais. Configurar `verify_jwt=false` apenas para esta função: ela faz sua própria autenticação e nega todas as operações de dados sem sessão validada. Essa configuração evita incompatibilidade do gateway com chaves publicáveis/assinaturas atuais. Nenhuma chave secreta deve ir ao frontend.
4. Atualizar `sinus-study-ai` com os dois arquivos preservados neste repositório. Manter sua configuração existente `verify_jwt=true`. O acréscimo confere bloqueio e a chave de ativação da IA antes de processar arquivos.
5. Autenticar a escrita ao GitHub, enviar a branch e publicar os arquivos estáticos no projeto Cloudflare existente. Não criar outro site nem alterar o domínio canônico. A publicação no GitHub Pages sozinha não comprova a atualização de `meusinus.pages.dev`.
6. Validar login do proprietário e de uma conta de teste sem privilégios; testar bloqueio/desbloqueio somente na conta de teste. Validar negacão REST usando token anterior ao bloqueio, e negacão na função de IA. Não testar bloqueio na conta do proprietário nem em alunos reais.
7. Verificar a tela no desktop e celular e executar os consultores de segurança do Supabase após aplicar a migração. Testar negação anônima de cada nova tabela.

## Testes executados

`node --test admin/control/tests/api.test.cjs`: 16 testes com banco e autenticação simulados, sem usuários reais, todos aprovados. Incluem origem inválida, ausência de token, conta comum, revogação de papel, bloqueio, proteção do proprietário, divisão de permissões, preços inválidos e auditoria.

Verificação sintática com `node --check` nos scripts novos e inline HTML. Não substitui teste autenticado em produção, teste da migração nem inspeção visual do navegador.

## Limites materiais

- Firebase histórico: `aulas/lesion/`, `aulas/app.js` e o leitor da apostila antiga ainda dependem do acervo e das chaves do Firebase. Não foram modificados para evitar perda de acesso a conteúdos criptografados. A migração desses dados exige exportação autenticada e mapeamento das identidades antigas para as contas Supabase. Nenhum dado do Firebase foi apagado ou copiado nesta alteração.
- Estatísticas começam na instalação. Não há visitantes anônimos históricos, receita ou pagamentos simulados. A consulta limita a 10.000 eventos por período e sinaliza resultados parciais. O último login vem do Auth, independentemente da coleta nova.
- Bloquear uma conta não recolhe arquivos previamente baixados nem restringe arquivos servidos publicamente. Acesso pago rigoroso a materiais exige armazenamento privado e URLs temporárias. Não considerar esses arquivos privados apenas por haver login na interface.
- Alterar o catálogo não reajusta assinaturas existentes nem cria produtos de cobrança. Os três planos existentes têm vínculo Stripe vazio. O painel comunica essa distinção.
- Configurações de funções, exceto IA, controlam a navegação. Não representam autorização granular por assinatura.
- O log registra intenção antes de mutações e conclusão após sucesso. Uma intenção sem conclusão precisa ser investigada; chamadas ao Auth e banco não são uma transação única.

## Recuperação

Antes da publicação, basta não aplicar a migração nem as funções e descartar esta branch. Depois, reverter somente o frontend não desfaz bloqueios já aplicados ou as regras do banco: revisar registros de auditoria e controles de acesso antes de qualquer remoção. Não remover tabelas de produção automaticamente.
