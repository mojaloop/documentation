---
i18n_source_sha: d895c3a83acecffe6233260290e541607bb287b7
---

# Relatórios BC

## Visão geral

### Estratégia e Regras

A estratégia de relatórios para esta Arquitetura de Referência consiste em descrever os mecanismos genéricos através dos quais os dados das BCs clientes podem ser armazenados de forma persistente e mantidos atualizados num Repositório de Dados de Relatórios, para que os utilizadores e os sistemas possam, posteriormente, aceder a esses dados diretamente a partir do Repositório de Dados de Relatórios ou através de quaisquer ferramentas de relatórios e/ou painéis de controlo ligadas ao Repositório de Dados de Relatórios.  

- Este repositório de dados de relatórios deve ser de escrita exclusiva do ponto de vista do switch e de leitura exclusiva para os componentes externos.
- Os modelos de dados no Repositório de Dados de Relatórios podem ser diferentes dos modelos de dados operacionais internos utilizados pelo switch; sempre que for relevante, por motivos de desempenho ou outros, podem ser disponibilizados vários modelos dos mesmos dados no Repositório de Dados de Relatórios — à semelhança de múltiplas projeções ou perspetivas.
- Um componente de relatórios de BC do cliente, fornecido pelo switch, irá converter eventos internos e modelos de dados internos para os modelos do repositório de dados externo — este componente pode ser substituído ou, ainda, podem existir vários destes para um único BC do cliente.
- Esse componente deve existir no BC de Relatórios para qualquer BC de Cliente cujos dados estejam disponíveis no Armazenamento de Dados de Relatórios.
- Qualquer envio ou obtenção direta de dados a partir do Cliente BC de origem, ou dos seus repositórios de dados internos, para o Repositório de Dados de Relatórios, constitui uma violação do princípio de desacoplamento e afetará negativamente a facilidade de manutenção do sistema, devido ao seu acoplamento estreito.

### Estratégias de elaboração de relatórios:

- Baseado em eventos — Método preferencial — No BC de relatórios existe um componente (gestor de eventos) que está atento aos eventos relevantes provenientes do seu BC correspondente e transforma esses eventos em entradas no repositório de dados de relatórios — pode haver vários destes componentes por cada BC do cliente; no entanto, cada um deve ser o único responsável pela gravação de um subconjunto dos dados de relatórios
- Push — O BC do Cliente irá contactar o Componente de Relatórios API do BC do Cliente correspondente para enviar dados; este API irá transformar os dados e armazená-los no repositório de relatórios ([^1] com o BC de origem, ou seja, deverá existir um API por cada BC de origem)
- Pull — No BC de relatórios, existe um Componente de Relatórios do BC do Cliente (baseado em temporizador) que invoca um «API» no BC de origem para recuperar os seus dados, os quais são depois armazenados de forma persistente no repositório de relatórios ([^1] juntamente com o BC de origem)

**No caso de BC em que o desempenho é fundamental, devemos procurar sempre utilizar a estratégia de geração de relatórios orientada por eventos.**

### Regras absolutamente mínimas a respeitar:

- Apenas o Repositório de Dados de Relatórios pode ser utilizado para a elaboração de relatórios e painéis de controlo. É proibido o acesso direto de sistemas externos aos próprios repositórios de dados dos Contextos Delimitados. O acesso operacional para sistemas externos estará disponível através das APIs Operacionais ou [Interop](/refarch/boundedContexts/fspInteropApi/).
- Os dados de origem internos do Cliente BC não podem ser «transmitidos» diretamente para o Repositório de Dados de Relatórios — é necessário que haja uma conversão entre a estrutura dos dados de origem e a estrutura dos dados de relatórios, mesmo que não haja alterações na estrutura. O objetivo é evitar que o lado dos relatórios dependa da estrutura dos dados de origem do BC.

### Tarefas a realizar

- Decida quais os relatórios e painéis iniciais que devem ser incluídos como parte da funcionalidade básica de relatórios
- Escolha uma ferramenta de código aberto para a elaboração de relatórios e painéis de controlo, a fim de disponibilizar esta funcionalidade básica
- Relatórios de conformidade/garantia — definir alguns destes relatórios básicos (KYC, AML)
- Discutam o tema «Monitorização de Processos (e SLAs)» e decidam se tal pode ser feito a nível da camada de relatórios (a definição dos indicadores críticos, SLIs e SLOs, é efetuada através da configuração da plataforma)
- Adicione o link para o Operacional API a.C. na secção de regras acima

## Termos

Termos com um significado específico e geralmente aceite no Contexto Delimitado em que são utilizados.

| Termo | Descrição |
|---|---|
| **Cliente BC** | Contexto delimitado da fonte (ou proprietário) dos dados que estão a ser armazenados no Repositório de Dados de Relatórios |
| **Base de dados de relatórios** | Armazenamento(s) de dados externo(s) (pode(m) ser vários) onde os dados de relatório produzidos pelos Componentes de Relatórios BC do Cliente são armazenados e mantidos atualizados |
| **Componente de Relatórios BC do Cliente** | Este componente, que pode assumir a forma de um serviço, será responsável pela conversão do modelo interno para o(s) modelo(s) externo(s) armazenado(s) no Repositório de Dados de Relatórios |
| **Ferramenta de relatórios ou painel de controlo**  | Ferramentas externas que utilizam os dados do Repositório de Dados de Relatórios como fonte para produzir relatórios, painéis de controlo ou qualquer outra tarefa relacionada com a elaboração de relatórios |

## Visão geral das funcionalidades

![Reporting Functional Overview diagram](./assets/ML2RA_Rpts_functionalOverview_Apr22-b.png)
> Diagrama de funções do BC: Visão geral funcional

## Casos de uso

### Relatórios baseados em eventos (método preferencial)

#### Descrição

Estratégia para alimentar o Repositório de Dados de Relatórios, fazendo com que o Componente de Relatórios BC do Cliente esteja atento aos eventos internos e armazene os dados de relatórios relacionados.

#### Diagrama de fluxo

![Event Based Reporting use case diagram](./assets/ML2RA_Rpts_eventBasedReporting_Apr22-b.png)
> Diagrama de fluxo de trabalho da UC: Relatórios baseados em eventos (método recomendado)

### Relatórios baseados no método «pull»

#### Descrição

Estratégia para alimentar o Repositório de Dados de Relatórios, fazendo com que o Componente de Relatórios BC do Cliente obtenha dados do BC API do Cliente.

#### Diagrama de fluxo

![Pull Based Reporting use case diagram](./assets/ML2RA_Rpts_pullReporting_Apr22-b.png)
> Diagrama de fluxo de trabalho da UC: Relatórios «Pull»

### Relatórios baseados em notificações push

#### Descrição

Estratégia para alimentar o Repositório de Dados de Relatórios, consistindo em que o BC do Cliente envie ao Componente de Relatórios API do BC do Cliente os dados a comunicar, e que o referido componente os converta e os armazene.

#### Diagrama de fluxo

![Push Based Reporting use case diagram](./assets/ML2RA_Rpts_pushReporting_Apr22-b.png)
> Diagrama de fluxo de trabalho da UC: Relatórios de envio

### Relatório do utilizador e consumo do painel de controlo

#### Descrição

Exemplo de como um utilizador pode aceder a relatórios e painéis de controlo

#### Diagrama de fluxo

![User Report and Dashboard Consumption diagram](./assets/ML2RA_Rpts_reportDashboardConsumption_Apr22-b.png)
> Diagrama de fluxo de trabalho da UC: Painel de relatórios e consumo do utilizador

<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]: Interfaces comuns: [Mojaloop Lista de interfaces comuns](../../refarch/commonInterfaces.md)
