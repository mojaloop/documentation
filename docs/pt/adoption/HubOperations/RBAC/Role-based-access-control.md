# Contexto do RBAC
O Hub Mojaloop utiliza um método de Controlo de Acesso Baseado em Funções (RBAC) para mitigar o risco.

## O que é o RBAC e como conceber para ele?

O controlo de acesso baseado em funções (RBAC) é um método de restrição do acesso à rede com base nas funções de cada utilizador dentro de uma empresa. O RBAC permite que os colaboradores tenham direitos de acesso apenas à informação de que necessitam para desempenhar as suas tarefas e impede-os de aceder a informação que não lhes diz respeito.

A conceção do RBAC para um operador de hub descreve os pontos de controlo de segurança que devem ser considerados ou alargados para mitigar o risco dentro de uma organização típica de operações de um hub Mojaloop. Alguns pontos de controlo estão relacionados com processos de negócio e com a estrutura organizacional, outros são técnicos e dizem respeito às camadas de identificação, autenticação e autorização, e outros ainda exigem monitorização. Os três devem ser considerados para criar responsabilização e mitigar o risco.

Este documento abrange:
1. Visão geral do RBAC.<br>
Onde se abordam os princípios do RBAC e as estruturas organizacionais.
2. Implementação técnica dos controlos de RBAC.<br>
Especificamente, o que é importante para uma implementação Mojaloop e como impô-lo tecnicamente.
3. Recomendações de funções
4. Requisitos e abordagem de monitorização.

## Visão geral do RBAC

### Princípio do privilégio mínimo

O RBAC recorre ao princípio de segurança do privilégio mínimo. Privilégio mínimo significa que um utilizador tem exatamente o nível de privilégio necessário para desempenhar uma tarefa. O objetivo é minimizar a probabilidade de atribuir a um utilizador permissões em excesso para executar ações no ecossistema Mojaloop.

### Implementação Mojaloop de Confiança Zero

Uma rede de confiança zero é aquela em que nenhuma pessoa, dispositivo ou rede goza de confiança inerente. Toda a confiança que permite o acesso à informação tem de ser conquistada, e o primeiro passo para isso é demonstrar uma identidade válida. Um sistema precisa de saber, com segurança, quem é cada um, antes de poder determinar a que deve ter acesso.

A conceção inerente do Mojaloop implementará uma abordagem de Confiança Zero na sua arquitetura e no seu deployment, exigindo que todas as entidades que interagem se autentiquem primeiro e depois solicitem autorização para aceder aos dados e processá-los, consoante a função a que pertencem.

### Segregação de Funções

A Segregação de Funções centra-se na mitigação do risco de fraude interna, estabelecendo fronteiras entre as funções atribuídas a um colaborador e entre os conflitos de interesse que possam resultar das responsabilidades de um colaborador, assegurando que nenhum utilizador isolado pode ter controlo funcional ponta a ponta de um processo de negócio e dos seus dados. Exige mais do que uma pessoa para criar, processar e concluir uma ação.

### Auditoria

A Auditoria terá de trabalhar em colaboração com as equipas de negócio e de TI para segregar estas funções sempre que possível e atribuir um controlo de mitigação adequado nos casos em que tal não seja exequível. Além disso, estes controlos terão de ser monitorizados trimestralmente e os resultados terão de ser comunicados à direção de topo.

Algumas definições contextuais incluem:
1. **Ação**: um evento distinto despoletado por um utilizador que resulta em:
   - Criação de um ativo de dados
   - Leitura ou acesso a um ativo de dados
   - Atualização ou introdução de alterações no estado de um ativo de dados
   - Eliminação ou remoção de um ativo de dados de uma aplicação ou base de dados.
2. **Permissão**: autoridade para executar uma ação específica no contexto de uma aplicação ou serviço
3. **Função**: aplicações, ações e acesso a dados necessários para executar as tarefas relativas a uma única função
4. **Relação utilizador-função**: a função (ou funções) atribuída a cada utilizador, que define as permissões de que dispõe

## Implementação técnica do RBAC

Uma pessoa que necessite de aceder aos vários portais de gestão do Hub Mojaloop pode ser registada e é gerada uma «conta», que pode ser utilizada para aceder a vários aspetos de uma instância operacional de um Hub Mojaloop e para fornecer uma base de auditoria desse acesso, associando as atividades ao registo original. Para efeitos deste documento, uma «conta» é uma identidade digital, um meio de autenticar (associar) a pessoa que afirma essa identidade ao registo original, e um conjunto de atributos que incluirá — entre outras coisas — um conjunto de direitos de acesso, ou direitos ativados pela posse desses atributos.

O processo de registo envolve verificação de identidade, verificação de antecedentes, e assim por diante. São então emitidas credenciais à pessoa — um ID de conta de início de sessão/identidade digital e pelo menos um método de autenticação, que pode incluir uma palavra-passe e autenticação de dois fatores (2FA).

::: tip NOTA
O âmbito deste documento não se limita aos operadores do Hub Mojaloop. Aborda também aspetos do acesso dos operadores dos DFSP aos portais do Payment Manager.
:::

### Considerações sobre 2FA

Note-se que a 2FA através de telemóvel pode ser inadequada para algumas funções, uma vez que funções altamente sensíveis podem exigir que os telemóveis fiquem guardados enquanto a pessoa está «de serviço». Isso obrigará a outros métodos de 2FA, tais como tokens físicos (key fobs).

### Utilizadores, ações e funções num contexto Mojaloop

O Mojaloop terá 2 grandes categorias de utilizadores:

1. **Humanos** <br>
São os utilizadores do hub e dos DFSP que interagirão com o Mojaloop através de várias interfaces. Os utilizadores dos DFSP interagirão com o Mojaloop através do Payment Manager e dos portais que serão disponibilizados durante o processo de onboarding.
2. **Não humanos** <br>
Estes automatizarão os processos de negócio e as tarefas que de outro modo seriam realizadas por um humano. Comunicarão através de chamadas de API que produzirão ações para cumprir os requisitos de negócio.

O contexto deste documento incidirá apenas sobre os utilizadores humanos.

### Gestão do ciclo de vida dos utilizadores

O «Ciclo de Vida da Conta de Utilizador» define o conjunto de processos de gestão de cada conta de utilizador. Estes processos podem ser decompostos em Criação, Revisão/Atualização e Desativação — ou «CRUD». Qualquer organização que utilize recursos de TI, sejam eles quais forem, depende de contas de utilizador para lhes aceder.

### Onboarding

O processo de onboarding terá algumas atividades que envolvem a criação de utilizadores, tanto do lado do DFSP como no Hub. São as seguintes:

1. Hub: serão criados os seguintes utilizadores
   - Operadores do Hub
   - Administradores do Hub
2. DFSP
   - Operadores do DFSP
   - Administradores do DFSP (aplicável apenas ao Payment Manager).


### Processo de determinação da Segregação de Funções

1. Definir os workflows e os processos de gestão de utilizadores. São todos os processos de negócio que compõem as ações de negócio do Mojaloop. Os exemplos incluem o onboarding.
1. Racionalizar todos os requisitos de acesso de segurança dos utilizadores às aplicações do Mojaloop, conforme descrito na tabela abaixo:
   - Definir as funções de negócio e de aplicação para utilizadores e APIs
   - Definir os perfis de função
   - Definir os perfis de função &amp; competência
   - Reunir uma lista dos conflitos de SOD aplicáveis, definindo as funções de segregação de funções
   - Tabela matriz de perfis de função (com dados de exemplo):

| **Matriz** de **Funções e Permissões** | Utilizadores do Hub | Administrador | Utilizador Maker Padrão | Utilizador Checker Padrão | Padrão Apenas Leitura | Utilizadores DFSP | Administrador | Utilizador Maker Padrão | Utilizador Checker Padrão | Padrão Apenas Leitura |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Funções de Onboarding | X | | | | | | | | | |
| Criar Conta de Utilizador | X | | | | | | | | | |
| Criar Perfil de DFSP | X | | | | | | | | | |
| Criar Utilizador de DFSP | X | | | | | | | | | |
|
| **Finance Portal** |
| Consultar Relatórios | | | X | X | X | | | X | X | X |
| Configuração da Plataforma | | | | | | | | | | |
|

3. Reconfigurar quaisquer funções conflituantes
   - Aprovações de negócio
   - Criação de utilizadores maker checker
4. Comunicação periódica de acessos ao sistema e de autorizações de utilizador
5. Separação entre a segurança de TI e a segurança de TI operacional que apoiará as atividades de gestão de utilizadores

### Boas práticas para o RBAC e a gestão de identidades no Mojaloop

1. Todos os ids de utilizador devem ser únicos e ter um formato único que possa ser correlacionado no hub, mas que não tenha significado para terceiros.
2. Os utilizadores dos DFSP não terão acesso a qualquer função administrativa do Hub
3. Todos os utilizadores não humanos têm de ser impedidos de iniciar sessão nos front ends das aplicações.
4. Os utilizadores dos DFSP receberão formação sobre as funções e as boas práticas
5. Impor o aprovisionamento automatizado de utilizadores e a gestão do ciclo de vida.
6. Classificar as ações executadas no Mojaloop para identificar ações de risco para o negócio que exijam controlos adicionais.
7. Os controlos adicionais para mitigar os riscos de RBAC podem incluir:
   - Autenticação multifator (MFA)
   - Registo de auditoria com alertas
   - Desativação/inibição automática do perfil de utilizador
8. O Mojaloop monitorizará a inatividade dos utilizadores e desativará os utilizadores inativos durante um período especificado
9. Impor uma aplicação centralizada de políticas em todas as identidades, por exemplo, política de palavras-passe, políticas de início de sessão, MFA, autenticação baseada em risco, etc.
10. Identificar e monitorizar de perto as identidades privilegiadas que têm permissões para executar ações sensíveis.
O seguinte aplica-se aos utilizadores privilegiados:
    - Os privilégios avançados têm de ser pedidos e aprovados caso a caso;
    - Os administradores devem manter as suas permissões privilegiadas pelo menor tempo possível;
    - Os administradores só devem ter as permissões necessárias para concluir uma tarefa específica;
    - A pertença a grupos administrativos tem de ser revista regularmente;
    - Impor autenticação multifator para os utilizadores administrativos;
    - Manter registos de acesso e auditorias e configurar notificações em tempo real para quando um acesso é ativado.
11. O Mojaloop configurará registos de auditoria e alertas para todas as ações dos utilizadores no Mojaloop. Sempre que possível, explorar a analítica de identidades através de ferramentas de código aberto aplicáveis.

### Gestão automatizada de identidades e controlo de RBAC

As ferramentas preferenciais para a gestão de utilizadores e de identidades num deployment Mojaloop são:

1. **Motor de gestão de identidades KeyCloak** – Armazena e processa os controlos de autenticação de API e funciona também como gateway de API.
2. **Motor de gestão de identidades WSO2** – Armazena e processa os perfis de função dos utilizadores e intermedeia o autoonboarding dos utilizadores dos DFSP.

## Conceber as funções dentro da sua organização

Um utilizador com uma conta que permita o acesso ao Hub terá funções associadas a essa conta, que definem o que pode fazer depois de se autenticar e iniciar sessão.

Muitas funções aplicam-se a vários portais; no entanto, algumas podem ser específicas de portais individuais.

Deve ter-se cuidado ao atribuir várias funções a uma conta, ou várias contas a uma única pessoa singular. Isto deve-se ao potencial que daí decorre para a contornagem dos controlos. Parte da finalidade do RBAC é assegurar que mais do que uma pessoa tem de estar na cadeia de autorização das ações importantes, reduzindo assim as vulnerabilidades associadas a agentes maliciosos.

### Portais do ecossistema Mojaloop

O ecossistema Mojaloop oferece vários portais, que suportam graus variáveis de controlo de acesso e de RBAC. Dividem-se em dois grupos:

- Portais do Hub, relacionados com a operação do próprio Hub
- Portais do Payment Manager, relacionados com a gestão da ligação de um DFSP específico ao Hub

### RBAC no Hub Mojaloop

No ambiente do Hub Mojaloop, o RBAC é implementado através de uma combinação de ferramentas — Ory Oathkeeper para a gestão de identidades e Keycloak para o controlo de acesso (incluindo funções e maker/checker).

O próprio Hub tem os seguintes portais:

- **Onboarding do Operador do Hub:**<br>
Atualmente, não existe uma solução integrada de Gestão de Identidades e Acessos (IAM) para os operadores do Hub, embora a função seja parcialmente assegurada pela utilização do WSO2. Está em curso trabalho de desenvolvimento para criar uma solução IAM abrangente assente no Ory e no Keycloak. Daí resultará a criação de um operador de administração juntamente com o deployment do Hub, que constitui um primeiro passo fundacional nesta área.
- **Finance Portal:** <br>
Tem duas funções principais: a gestão das operações de liquidação e a gestão da posição de liquidez de cada DFSP (e, associado a isto, o respetivo valor de Net Debit Cap (NDC)).
O acesso ao Finance Portal está atualmente limitado a uma simples função de controlo de acesso por nome de utilizador/palavra-passe.
- **Ciclo de vida do participante:** <br>
Controlo e configuração do acesso ao Hub por parte dos DFSP.
Do ponto de vista técnico, isto é atualmente conseguido através da utilização do Mojaloop Connection Manager (MCM). No entanto, prevê-se que o próprio MCM venha a ser desenvolvido para apresentar uma API, que possa ser utilizada para desenvolver uma interface disponível para os Operadores do Hub e para os DFSP.
- **Operações do Hub:** <br>
Incluem pesquisas de transações, monitorização de estado e de desempenho, dashboards e as operações técnicas em geral.
Atualmente, estas funções são conseguidas através da utilização do Prometheus/Grafana e de um conjunto de outras ferramentas, com o controlo de acesso padrão incorporado nas próprias ferramentas. Prevê-se que isto venha a ser migrado para a solução Ory/Keycloak, à medida que esta se desenvolve.

Outras operações do Hub, como a Gestão de Fraude e a Gestão de Casos/Litígios, são módulos adicionais que implementam o seu próprio controlo de acesso para gerir o acesso às suas funções sensíveis. Não são abordadas neste documento.

Para além das medidas de controlo de acesso acima referidas, importa notar que o acesso a todas estas funções só é possível através de uma VPN, com credenciais individuais a controlar o acesso.

Além destes portais, existem duas outras formas principais de aceder ao Hub, nenhuma delas sujeita a RBAC:

- A primeira são as transações, que são estritamente controladas de acordo com as suas próprias medidas de cibersegurança em múltiplas camadas.
- E, em segundo lugar, os pagamentos em massa (do governo para a pessoa — G2P), que são suportados por meio de uma API sujeita aos mesmos controlos que as restantes transações individuais. Prevê-se que os pagamentos em massa venham a ser um serviço prestado aos DFSP (e aos seus clientes) por meio de uma API segura, cabendo ao DFSP operar um portal de pagamentos em massa para utilização pelos seus clientes. É possível que o operador de uma instância do Hub Mojaloop venha a disponibilizar um portal de pagamentos em massa white label, que comunique com a API de pagamentos em massa do Hub, para personalização por qualquer DFSP que pretenda oferecer o serviço aos seus clientes. (Note-se que esta não é uma abordagem única: foi proposta uma abordagem semelhante, por exemplo, para os pagamentos a comerciantes, com a disponibilização aos DFSP de uma aplicação white label para transações por código QR, para incorporação nas suas carteiras móveis.)

Os controlos de acesso relativos aos pagamentos individuais ou em massa não são, por conseguinte, abordados mais aprofundadamente neste documento.

### Payment Manager para integração

O Payment Manager é atualmente um dos principais mecanismos de integração dos DFSP num Hub Mojaloop. Enquanto o Hub é único num scheme, existe uma instância separada do Payment Manager para cada DFSP. Os portais oferecidos pelo Payment Manager têm, por isso, de ser protegidos por meio de RBAC, para limitar o acesso a representantes autorizados do DFSP.

No ambiente do Payment Manager, o RBAC é implementado exclusivamente através do Keycloak.

Estão disponíveis os seguintes portais:

- **Onboarding de utilizadores/operadores:**
O Payment Manager inclui o Keycloak para IAM. No deployment, é criado um único utilizador de administração, que pode ser utilizado para criar outras contas de utilizador.
- **Gestão da ligação ao Hub:**
Inclui a possibilidade de configurar a ligação ao Hub do lado do Payment Manager e, por implicação, de a desativar. Trata-se, portanto, de uma função controlada, com controlos diferentes para consulta e para modificação.
- **Investigação de transações:**
É possível investigar consultas de transações através do portal do Payment Manager. Isto pode ser problemático se estiverem disponíveis Informações de Identificação Pessoal (PII) através do portal.

### Contas fundacionais

Quando um Hub é criado pela primeira vez, o Ory/Keycloak será utilizado para criar uma conta de utilizador fundacional com privilégios de administrador. Esta conta será atribuída a um administrador de sistema. Note-se que ao administrador de sistema não será atribuída qualquer função operacional para além das de administrador de sistema.

Todas as funções executadas através do Ory/Keycloak estão sujeitas a registo ao nível do sistema para efeitos de auditoria.

O administrador de sistema utilizará então o Ory/Keycloak para criar outras contas de utilizador, sujeitas às verificações padrão de identidade e de antecedentes de cada pessoa (definidas nas Regras do Scheme associadas a um determinado deployment Mojaloop) antes da criação das respetivas contas.

A estas novas contas de utilizador será atribuída uma das seguintes funções:

- OPERATOR
- MANAGER

Uma conta de utilizador não pode ter simultaneamente as funções OPERATOR e MANAGER.

### Contas adicionais

Para além do administrador de sistema, as contas fundacionais terão a capacidade de utilizar o Ory/Keycloak para adicionar outras contas. No entanto, para estes utilizadores, esta atividade estará sujeita a controlos maker/checker. Um utilizador com a função OPERATOR poderá criar uma conta de utilizador (com processos instituídos para assegurar que foi feita a devida diligência quanto à verificação de identidade e de antecedentes). Contudo, essa conta não será ativada enquanto uma pessoa com a função MANAGER não a aprovar.

A cada uma destas contas será atribuída uma função, à medida que forem criadas. Para além das funções associadas às contas fundacionais, podem ser atribuídas às novas contas de utilizador as seguintes funções:

- ADMINISTRATOR
- FINANCE_MANAGER

Uma conta de utilizador não pode ter mais do que uma das funções OPERATOR, MANAGER, ADMINISTRATOR ou FINANCE_MANAGER, de modo a assegurar a separação entre:

- A gestão financeira e as restantes tarefas de operação do Hub
- As funções de operador e de gestor nas funções maker/checker

::: tip NOTA
A atribuição das funções ADMINISTRATOR ou FINANCE_MANAGER está sujeita a um grau mais elevado de verificação de identidade e de antecedentes do que qualquer outra função, devido à natureza sensível das funções associadas. Estas verificações adicionais estão estabelecidas nas Regras do Scheme.
:::

### Finance Portal / Quadro Operacional de Negócio

Muitas funções do Finance Portal (como a consulta das posições dos DFSP, o estado das janelas de liquidação, e assim por diante) estão disponíveis para todos os utilizadores com sessão iniciada, independentemente da sua função. No entanto, as funções seguintes só podem ser executadas por utilizadores com funções específicas:

- Processamento da liquidação
  - Fechar a janela de liquidação
  - Iniciar a liquidação
- Gestão da liquidez dos DFSP
  - Adicionar/levantar fundos
  - Alterar o NDC

Todas estas estão sujeitas a controlos maker/checker, pelo que um utilizador com a função ADMINISTRATOR pode iniciar a ação, mas esta tem de ser aprovada por um utilizador com a função FINANCE_MANAGER.

### Ciclo de vida do participante

Este portal fornece uma interface única para o Operador do Hub adicionar e manter os DFSP nos ecossistemas do Hub.

Existem algumas funções normalizadas que estão sujeitas a RBAC:

- Criar DFSP
- Criar Contas de DFSP
- Suspender DFSP

Cada uma delas está sujeita a controlos maker/checker, pelo que um utilizador com a função OPERATOR pode preparar as alterações, que têm de ser aprovadas por um utilizador com a função MANAGER.

Além disso, existe uma carga de trabalho significativa no onboarding técnico de um DFSP, em especial em torno do estabelecimento do ambiente técnico de operação (certificados, e assim por diante). Isto não está sujeito a RBAC. Não é considerado um risco significativo, uma vez que nada disso tem valor sem que seja possível criar um DFSP e as contas associadas no próprio Hub — atividades essas que estão sujeitas a RBAC.

### Operações do Hub

O acesso às funções de reporte do Prometheus/Grafana não está sujeito a controlos de RBAC — qualquer utilizador com sessão iniciada/autenticado, com qualquer função de RBAC atribuída, pode consultar os relatórios e os dashboards.

Criar um novo relatório/dashboard é uma função restrita e está apenas disponível para utilizadores com a função MANAGER.

Como referido anteriormente, os portais de operações e de reporte serão migrados para o ambiente Ory/Keycloak, de modo a facilitar estes controlos.

### Payment Manager

A funcionalidade de operador do Payment Manager está sujeita a controlos de RBAC, mas não é exigido maker/checker.

#### Onboarding de utilizadores/operadores

No deployment do Payment Manager, é criada uma única conta de utilizador de administração através do Keycloak. Note-se que ao utilizador de administração não será atribuída qualquer função operacional para além das de administrador de sistema.

Todas as funções executadas através do Keycloak estão sujeitas a registo ao nível do sistema para efeitos de auditoria.

O utilizador de administração utilizará o Keycloak para criar outras contas de utilizador, sujeitas às verificações padrão de identidade e de antecedentes de cada pessoa (definidas nas Regras do Scheme associadas a um determinado deployment Mojaloop) antes da criação das respetivas contas.

A estas novas contas de utilizador será atribuída uma das seguintes funções:

- OPERATOR
- MANAGER

Uma conta de utilizador não pode ter simultaneamente as funções OPERATOR e MANAGER.

### Dashboards

Os dashboards do Payment Manager estão disponíveis para qualquer utilizador com sessão iniciada/autenticado com a função OPERATOR ou MANAGER.

### Gestão da ligação ao Hub

A consulta das definições da ligação Payment Manager/Hub está disponível para qualquer utilizador com sessão iniciada/autenticado com a função OPERATOR ou MANAGER. No entanto, modificar as definições é uma função controlada. Só um utilizador com a função MANAGER pode modificar as definições.

### Investigação de transações

Realizar investigações de transações através das funcionalidades do portal do Payment Manager é uma atividade controlada, devido à possibilidade de revelar dados PII. Está, por isso, disponível apenas para utilizadores com sessão iniciada/autenticados com a função MANAGER.

## Monitorização
A monitorização é o quarto pilar da mitigação do risco de RBAC. A sua conceção e configuração dependem muito da maturidade do Scheme, das regras do scheme, dos casos de utilização adotados e das classes de participantes.
Como ponto de partida para conceber a monitorização, considere estas categorias:
1. Monitorização de ameaças de segurança externas
1. Monitorização de ameaças de segurança internas, por exemplo, auditoria
1. Monitorização do cumprimento das regras do scheme
