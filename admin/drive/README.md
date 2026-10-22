# Sinus · Administrador · Inventário seguro do Google Drive

Esta ferramenta NÃO expõe arquivos privados aos alunos, não copia bibliotecas de terceiros e não altera permissões do Drive. Publicada apenas como área administrativa para varredura autenticada.

- Local público do código da ferramenta: `/admin/drive/`. A interface pode ser carregada publicamente, mas nenhum dado de Drive é embutido nela.
- Acesso efetivo: requer entrar pela conta Google administradora configurada em `/aulas/config.js`. Somente a pessoa autorizada vê e utiliza seu próprio token OAuth Google.
- O Firebase já mantém sessão local para o app; a autorização adicional Google Drive Metadata Readonly poderá requerer consentimento e configuração do projeto OAuth. Se o Google retornar `access_denied`, `unauthorized_client`, `access_blocked` ou problemas de validação da aplicação, configurar a tela de consentimento OAuth no Google Cloud/Firebase antes de usar.
- A leitura acontece diretamente de `https://www.googleapis.com/drive/v3/files` a partir do navegador autorizado. Token fica em memória; nenhum token é exportado.
- A ferramenta procura todos os diretórios `starred=true` e a raiz de `MEDICINA`, percorre recursivamente até o fim das páginas, em grupos de 3 pastas, e captura 403/404.
- Duplicatas pelo mesmo `fileId` são deduplicadas, com caminhos alternativos registrados.
- Exporta JSON completo e CSV para conferência pessoal. Não cria documentos no Drive nem publica nomes de arquivos no GitHub.
- Classificação por período/turma/matéria é heurística e deve ser conferida: pastas que misturam turmas ou semestres exigem revisão.
- Permissão `canShare=false` não significa necessariamente download bloqueado; indica ausência de poder de compartilhar. Arquivos de terceiros permanecem `third-party-review` até autorização de redistribuição.
- Essa etapa é inventário de sincronização. Para exibir conteúdo de forma privada a alunos, implantar API em Cloudflare Workers/Pages Functions, autenticação Firebase verificada, controle de licenças, upload autorizado para R2 privado e links assinados. Não disponibilizar arquivos por links públicos sem permissão.

Relatórios conhecidos durante primeira auditoria (22/10/2026): `5 F / Semiología I` retornou 404 Not Found para a conta conectada. Dez pastas favoritas verificadas têm `canShare=false`; a 11ª `Turma A` foi listada com sucesso anteriormente e compartilha condição de pasta de terceiros; consultar metadados completos na varredura.