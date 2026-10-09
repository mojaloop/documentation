# Onboarding de DFSP

Em princípio, tendo desenvolvido e documentado as [APIs Mojaloop](./transaction.md#apis-mojaloop), isso deveria ser suficiente para permitir que os DFSPs (Digital Financial Services Providers) se liguem a um Hub Mojaloop. No entanto, como parte da missão da comunidade Mojaloop de promover a inclusão financeira, há muito que se considera que a chave para minimizar o custo e a complexidade de ligar o back office de um DFSP a um Hub Mojaloop passa pela disponibilização de um portefólio de soluções de conectividade, permitindo a um DFSP selecionar a abordagem que melhor responde às suas necessidades. Estas são complementadas por um DFSP Onboarding Playbook, que encapsula os processos de negócio necessários para fazer o onboarding de um DFSP.
## Onboarding de negócio
Há muitos passos necessários no onboarding de um DFSP a um Hub Mojaloop que nada têm a ver com tecnologia, e estes são abordados no DFSP Onboarding Playbook.

Este playbook, que foi doado pela Thitsaworks, é composto por um conjunto de ferramentas e modelos para apoiar o planeamento e a execução de um deployment Mojaloop, com especial incidência no onboarding de DFSP. As ferramentas são:
- Um modelo de plano de trabalho, incluindo exemplos utilizados em deployments anteriores;
- Um exemplo de caso de teste ponta a ponta, neste caso para a integração de um DFSP do lado do beneficiário;
- Um formulário de avaliação técnica, utilizado para definir a assistência técnica requerida pelos DFSPs candidatos;
- Uma lista de verificação de onboarding técnico;
- Um modelo de mapeamento de API, utilizado para mapear os elementos da API do Hub Mojaloop para as ações correspondentes requeridas pelo back office do DFSP;
- Um plano para a configuração da segurança da ligação do DFSP ao Hub Mojaloop.

É possível [descarregar o DFSP Onboarding Playbook da Thitsaworks através desta ligação](https://github.com/mojaloop/product-council/tree/main/Documentation/DFSP%20Playbook).

## Onboarding técnico
O portefólio de conectividade atual inclui o Integration Toolkit (ITK), que permitirá a um integrador de sistemas (SI) criar uma ligação combinando os vários elementos de um toolkit da forma que melhor responda às necessidades do DFSP. Estes elementos incluem:
  - Mojaloop Connection Manager (MCM);
  - Mojaloop Connector (para a integração com o Hub Mojaloop);
  - Um conjunto de exemplos de Core Connectors (para a integração com o back office do DFSP);
   - Documentação, incluindo guias «how to» e modelos.

Para DFSP de maior dimensão, a comunidade Mojaloop oferece o Payment Manager como alternativa ao ITK. Também conhecido como Payment Manager for Mojaloop (PM4ML), oferece toda a funcionalidade e flexibilidade de que um grande banco possa necessitar.

As várias ferramentas de conectividade disponíveis para fazer o onboarding de um DFSP a um Hub Mojaloop são discutidas em maior detalhe nos [miniguias](./connectivity/participation_tools_mini_guides.md), e orientações detalhadas sobre qual a solução de conectividade mais adequada para diferentes tipos de participante e requisitos são apresentadas na [matriz de funcionalidades dos participantes](./connectivity/participant-matrix.md). 

Todos os DFSPs devem estar cientes de que colher os benefícios de uma solução de pagamentos instantâneos inclusiva como o Mojaloop depende da implementação de uma abordagem de «ecossistema completo» - e isso significa alargar o alcance do serviço Mojaloop aos domínios dos DFSPs, dando-lhes, a eles e aos seus clientes, as vantagens da garantia de finalidade das transações, de custos mais baixos e da entrega fiável de todas as transações válidas.

As [orientações de arquitetura de segurança para a infraestrutura dos DFSPs](./dfsp-infrastructure-security.md) descrevem como os schemes (o conjunto de regras do sistema de pagamentos) podem avaliar o hardware e os ambientes de alojamento em que os DFSPs operam as cargas de trabalho de conectividade e de assinatura.

Note-se que o modo de deployment do ITK afeta o tipo de serviço que um DFSP pode prestar aos seus clientes, conforme destacado nos [miniguias](./connectivity/participation_tools_mini_guides.md). As opções mais exigentes em recursos são adequadas para DFSP com requisitos elevados de débito (throughput) e de fiabilidade, uma opção de deployment moderada impõe alguns limites ao débito e à disponibilidade e pode ser a mais adequada para DFSP de média ou pequena dimensão, e a opção mais frugal impõe limites estritos ao débito e à disponibilidade e remove a capacidade de iniciar pagamentos em lote, pelo que pode ser adequada apenas para DFSP de pequena dimensão.

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.5|21 de agosto de 2026| Yevhen Kyriukha|Ligação às orientações de segurança da infraestrutura dos DFSPs|
|1.4|17 de dezembro de 2025| Paul Makin |Adicionada ligação aos miniguias; clarificado o texto para destacar o papel do ITK|
|1.3|6 de novembro de 2025| Paul Makin|Ligação ao DFSP Onboarding Playbook da Thitsaworks|
|1.2|9 de junho de 2025| Tony Williams|Adicionada referência à matriz de funcionalidades dos participantes|
|1.1|14 de abril de 2025| Paul Makin|Atualizações relacionadas com o release da V17|
|1.0|5 de fevereiro de 2025| Paul Makin|Versão inicial|
