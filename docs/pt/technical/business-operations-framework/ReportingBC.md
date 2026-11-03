---
i18n_source_sha: 5b1eeff49b68fd6ccde57acc3fef0fce3896db40
---

# Relatório sobre a implementação do contexto delimitado

Um dos objetivos deste projeto da workstream consiste em proporcionar a capacidade de acompanhar uma transferência de ponta a ponta. A fim de concretizar este objetivo, parte do contexto delimitado (BC) de relatórios deverá ser desenvolvida em conformidade com a arquitetura de referência.


## Visão geral do projeto

Aqui está o projeto arquitetónico global.

![Architecture overview diagram of reporting bounded context](../../.vuepress/public/Reporting-&-Auditing-Overview.png)

Na versão Mojaloop, todos os serviços principais já estão a enviar eventos para a versão Kafka num tópico (denominado «topic-event»).

Existem duas bases de dados fundamentais para a elaboração de relatórios:
1. **Base de dados de relatórios** 
A base de dados de relatórios é uma base de dados relacional que mantém um registo do estado mais recente dos Mojaloop objetos e os disponibiliza através de uma interface de consulta eficiente. \
\
Na implementação deste esforço da workstream, será utilizada uma réplica dedicada da base de dados do Central Ledger para a elaboração de relatórios. Isto não se enquadra totalmente no modelo arquitetónico, uma vez que uma base de dados pertencente ao contexto delimitado de relatórios não deve ter dependências externas. Uma réplica da base de dados do Central Ledger depende do esquema do Central Ledger e, por conseguinte, apresenta uma dependência externa. 
::: aviso Dívida Técnica
Isto deve ser reconhecido como **dívida técnica** que deverá ser liquidada à medida que a arquitetura de referência for sendo construída. 
:::
Existem duas abordagens que podem ser adotadas para liquidar esta dívida técnica:
  - Alterar a chamada à réplica para uma função de **sincronização de dados unidirecional**, o que desacoplaria os esquemas das duas bases de dados.
  - Recriar uma **base de dados relacional** com um novo design, que seja atualizada com base nos tópicos «Kafka» subscritos.

A melhor abordagem dependerá do estado da versão atual Mojaloop no momento em que esta dívida for liquidada. \
\
2. **Base de dados de eventos** 
A base de dados de eventos constitui um registo dos detalhes dos eventos, podendo proporcionar uma visão mais pormenorizada do que ocorreu. 

**Limitações do trabalho relativo ao «event store» nesta workstream**
Este projeto será implementado na versão atual Mojaloop. 

Atualmente, apenas os dados necessários para permitir o rastreio de ponta a ponta de uma transferência serão recolhidos e disponibilizados através do relatório API. É possível alargar facilmente esta oferta, ampliando o processador de eventos para processar mensagens de novos casos de uso e armazená-las na base de dados MongoDB, e, em seguida, configurar a consulta genérica de recursos GraphQL de modo a consultar os novos armazenamentos de dados de forma adequada.

## Alinhamento com a arquitetura de referência

Embora o contexto delimitado se refira à elaboração de relatórios e à auditoria, este projeto apenas começa a abordar a parte da definição relativa à elaboração de relatórios. A conceção atual é independente de outros contextos delimitados, o que está em conformidade com a arquitetura de referência. 

(Não existe uma separação total, uma vez que o atual projeto utiliza uma réplica da base de dados como base de dados de relatórios. A dívida técnica e os próximos passos para resolver esta situação estão descritos acima.)


É importante ter em conta a forma como este contexto delimitado irá evoluir à medida que for sendo implementada uma parte cada vez maior do projeto da arquitetura de referência.

Os contextos delimitados deixarão — durante a implementação da arquitetura de referência — de armazenar dados nas bases de dados do Central Ledger.

Existem três abordagens que podem ser adotadas para dar resposta a esta alteração. A forma como a arquitetura de referência for construída determinará qual é a melhor abordagem:
1. Modificar a funcionalidade de sincronização para dar resposta ao novo armazenamento de dados do contexto delimitado.
2. Alargar o processador de eventos de mensagens para capturar a informação necessária na base de dados de relatórios.
3. Chamar as APIs do contexto delimitado recentemente definidas, para recuperar os dados necessários.

## Casos de uso para permitir o rastreio de uma transferência


A fim de acompanhar eficazmente uma transferência de ponta a ponta, foram definidos quatro casos de uso.

### Caso de uso 1: Visualização do painel de controlo


**Na qualidade de** Especialista em Operações Empresariais de Operador do Hub,
**pretendo** um resumo num painel de controlo de alto nível das transferências que passam pelo hub, obtido a partir de um intervalo de data e hora, 
**para que** possa monitorizar de forma proativa o estado do ecossistema.

:::::: col-wrapper

| Dados devolvidos |

| --- |
| Número de transferências |

| Valor total da transferência por moeda |

| Número de transferências por código de erro  |

| Número de transferências por pagador DFSP |

| Número de transferências por beneficiário DFSP |

| Montante da transferência por moeda por pagador DFSP |

| Montante da transferência por moeda por beneficiário DFSP |

:::::::::

### Caso de uso 2: Visualização da lista de transferências


**Na qualidade de** Especialista em Operações Empresariais de Operador do Hub,
**pretendo** visualizar uma lista de transferências que possa ser filtrada com base num ou mais dos seguintes critérios: 
- Sempre obrigatório (deve ser indicado em todas as chamadas)
   - Intervalo de data e hora

- Filtros opcionais 

   - Um beneficiário específico DFSP

   - Um tipo específico de ID do beneficiário 

   - Um beneficiário específico

   - Um pagador específico DFSP

   - Um tipo específico de identificador de pagador

   - Um pagador específico

   - Estado da transferência

   - Moeda


- Seria bom dispor de filtros (não é um requisito obrigatório, mas devem ser disponibilizados se o design o permitir)

   - Um código de erro específico

   - Período de liquidação

   - ID do lote de liquidação: O identificador único do lote de liquidação no qual a transferência foi liquidada. Se a transferência ainda não tiver sido liquidada, este campo fica em branco.

   - Pesquisar uma expressão nas mensagens


**Para que** eu possa monitorizar de forma proativa o estado do ecossistema, através de uma visão mais detalhada dos dados de transferência que circulam pelo hub.

:::::: col-wrapper

| Dados devolvidos | |

| --- | --- |
| ID da transferência | O identificador único da transferência |

| Estado da transferência | Indica se a transferência foi bem-sucedida, se está pendente ou se ocorreu um erro |

| Tipo de transferência | (Por exemplo: P2P) |

| Moeda | A moeda da transferência |

| Montante | O montante da transferência |

| Pagador DFSP  | |

| Tipo de identificação do pagador  | |

| Pagador | |

| Beneficiário DFSP | |

| Tipo de identificação do beneficiário | |

| Beneficiário | |

| ID do lote de liquidação | O identificador único do lote de liquidação no qual a transferência foi liquidada. settled.<br> Se a transferência ainda não tiver sido liquidada, este campo fica em branco. |

| Data de envio | A data e a hora em que a transferência foi iniciada. |

:::::::::

### Caso de uso 3: Visualização dos detalhes da transferência


**Na qualidade de** Especialista em Operações Empresariais de Operadores do Hub, 
**pretendo** rastrear uma transferência específica a partir do seu ID de transferência,
**para que** possa identificar:

- O calendário e a situação atual da transferência

- Quaisquer informações relativas a erros associadas a essa transferência

- As informações relativas à cotação e ao calendário associados a essa transferência

- O estado e os identificadores do processo de liquidação associado


:::::: col-wrapper

| Dados devolvidos | |

| --- | --- |
| ID da transferência | O identificador único da transferência |

| Estado da transferência | Indica se a transferência foi bem-sucedida, se está pendente ou se ocorreu um erro |

| Tipo de transferência | (Por exemplo: P2P) |

| Moeda | A moeda da transferência |

| Montante | O montante da transferência |

| ID do lote de liquidação | O identificador único do lote de liquidação no qual a transferência foi liquidada. settled.<br> Se a transferência ainda não tiver sido liquidada, este campo fica em branco. |

| Pagador |  |

| Dados do pagador | O identificador único do pagador (normalmente, um MSISDN, ou seja, um número de telemóvel) |

| Pagador DFSP | |

| Beneficiário DFSP | |

| Beneficiário | |

| Dados do beneficiário | O identificador único do beneficiário (normalmente, um MSISDN, ou seja, um número de telemóvel) |

| Estado da transferência | Indica se a transferência foi bem-sucedida, se está pendente ou se ocorreu um erro |

| Data de envio | A data e a hora em que a transferência foi iniciada |

:::::::::

### Caso de uso 4: Visualização da mensagem de transferência


**Na qualidade de** Especialista em Operações Empresariais de Operador do Hub, 
**pretendo** consultar as mensagens detalhadas relativas ao ID dessa transferência,
**para que** possa investigar qualquer problema inesperado associado a essa transferência.

:::::: col-wrapper

| Dados devolvidos | |

| --- | --- |
| ID de transferência do scheme | |

| TransferID | |

| ID da citação | |

| Página inicial - ID de transferência | |

| Informações do pagador e do beneficiário | Tipo de identificação, Valor da identificação, Nome de apresentação, Nome próprio, Nome do meio,<br> Apelido, Data de nascimento, Código de classificação do comerciante,<br> FSP Identificação, Lista de extensões |

| Resposta à consulta de participantes | |

| Cotação de preço | |

| Resposta à cotação | |

| Preparação da transferência | |

| Execução da transferência | |

| Mensagem(s) de erro | |

:::::::::

## Fluxo de trabalho empresarial

Apresentamos aqui um fluxo de trabalho empresarial que descreve a forma como os casos de uso são acionados.

![Business workFlow](../../.vuepress/public/BusinessFlowView.png)

## Ferramentas selecionadas

### Base de dados de eventos: MongoDB

A base de dados MongoDB foi escolhida porque:

   - O MongoDB é atualmente utilizado e deployado em Mojaloop e constitui uma ferramenta de código aberto reconhecida que, opcionalmente, conta com empresas de referência capazes de prestar apoio empresarial, caso tal seja necessário.

   - O MongoDB irá satisfazer os nossos requisitos para este projeto.

   - Foram consideradas outras ferramentas, mas verificou-se que estas não cumpriam todos os requisitos para uma ferramenta de software livre na versão Mojaloop.


### API: GraphQL

Para além do sistema de relatórios existente API, será também realizado o deployment de um GraphQL API. Este novo API contará com a funcionalidade adicional de poder aceder à base de dados de relatórios de eventos, quer como dados complementares, quer como dados de consulta autónomos. 


A implementação do GraphQL API foi adicionada pelas seguintes razões:
   - Uma implementação mais natural da modelação RBAC
   - Maior facilidade para combinar dados de diferentes fontes num único recurso
   - A implementação da solução de relatórios existente resultava em instruções SQL muito complexas, cuja criação e manutenção exigiam conhecimentos especializados. A divisão dos dados num recurso mais natural e na subsequente instrução SQL simplifica tanto a instrução SQL como a utilização desse recurso.
   - Na equipa, contávamos com um especialista em GraphQL que conhecia as melhores bibliotecas e ferramentas a utilizar.
   - Foi criada uma implementação genérica para que não fossem necessários conhecimentos específicos de GraphQL para alargar a funcionalidade. 

**Vantagens adicionais da utilização do GraphQL**
   - Recursos reutilizáveis/permissões RBAC associadas entre relatórios
   - As consultas complexas são mais simples de construir, uma vez que os recursos são modelados 
   - Combinação de fontes de dados numa única consulta (por exemplo, MySQL com o MongoDB)
   - Não é necessário recorrer a recuperações aninhadas
   - Não é necessário recorrer a múltiplas recuperações
   - Não é necessário utilizar a versão API. A versão API permite naturalmente a compatibilidade retroativa entre versões. 
   - Autodocumentação API

**Introdução de uma nova tecnologia**
A introdução de uma nova tecnologia na comunidade acarreta, de facto, alguns riscos e a necessidade de aprender e manter essa nova tecnologia. Foi feita uma tentativa para reduzir o impacto desta situação através da implementação do API, utilizando uma abordagem genérica ou baseada em modelos, minimizando assim os conhecimentos de GraphQL necessários para a implementação. Além disso, foi fornecido um exemplo de consulta GraphQL.

A atual implementação do GraphQL é fácil de utilizar para os programadores.

**Implementação de relatórios REST**
Existe uma REST implementação de relatórios API que foi doada à Mojaloop comunidade. É possível implementar esta funcionalidade em paralelo com a implementação GraphQL API, caso tal se revele necessário.

### GraphQL API — explicação sobre a implementação de recursos genéricos

No cerne da implementação deste contexto delimitado encontra-se uma implementação genérica que associa um repositório de dados de relatórios e uma consulta a um recurso de dados GraphQL que possui a sua própria autorização RBAC. Ou seja, é possível adicionar um novo recurso personalizado a este «API» procedendo da seguinte forma:


1. Definir o tipo de armazenamento de dados

2. Defina a consulta

3. Defina os nomes dos recursos e os campos do GraphQL

3. Defina a autorização de utilizador associada a este recurso


### Exemplos de consultas GraphQL


**Consultar as transferências filtradas por um pagador específico DFSP**
```GraphQL
query GetTransfers {
  transfers(filter: {
    payer: "payerfsp"
  }) {
    transferId
    createdAt
    payee {
      name
    }
  }
}
```

**Consultar um resumo das transferências**
```GraphQL
query TransferSumary2021Q1 {
  transferSummary(
    filter: {
        currency: "USD"
        startDate: "2021-01-01"
        endDate: "2021-03-31"
    }) {
        count
        payer
  }
}
```


## Criação do repositório de dados de eventos

O objetivo do repositório de dados de eventos é proporcionar um armazenamento persistente de eventos de interesse que possam ser facilmente e eficientemente localizados e consultados para a elaboração de relatórios.


Para alcançar este objetivo com o mínimo de alterações na estrutura da mensagem original, decidiu-se processar a mensagem em categorias e armazenar essas categorias como metadados adicionais no interior da mensagem, os quais podem ser consultados posteriormente. As mensagens que não se enquadram nessas categorias não são armazenadas e, por conseguinte, são filtradas.

Eis um exemplo dos metadados que são adicionados à mensagem «JSON»:

```json{7-12}
{
    "event": {
        "id" : {},
        "content" : {},
        "type" : {},
        "metadata" : {}
    },
    "metadata" : {
        "reporting" : {
            "transactionId" : "...",
            "quoteId": "...",
            "eventType" : "Quote"
        }
    }
}
```
Em que «`"eventType"`» pode ser um dos seguintes:
:::::: col-wrapper
::: col-third
:::

::: col-third

| tipo de evento    |

| ------- |
|Citação |

|Transferência |

|Liquidação    |

:::
:::::::::

O processador de fluxo de eventos irá subscrever o tópico `'topic-event'` do Kafka. Esta fila de mensagens contém todas as mensagens de eventos. Por conseguinte, é necessário um grau significativo de filtragem.

:::dica NOTA

O código que proporciona esta funcionalidade foi estruturado de forma a que estes filtros possam ser facilmente modificados ou ampliados.

As mensagens subscritas e classificadas são representadas em ficheiros «const», pelo que podem ser facilmente adicionadas ou alteradas sem que seja necessário um conhecimento aprofundado do código.

:::

### Armazenamento exclusivo de mensagens de «auditoria»


Apenas Kafka mensagens do tipo `'audit'` serão consideradas para gravação, ou seja, apenas se:
:::::: col-wrapper
::: col-third
:::
::: col-third
| metadata.event.type |
| ---- |
| audit |
:::
:::::::::

## Mensagens de «transferência» que se encontram armazenadas

**ml-api-adapter**

:::::: col-wrapper

| metadata.trace.service |

| ---- |
| ml_transfer_prepare |

| ml_transfer_fulfil |

| ml_transfer_abort |

| ml_transfer_getById |

| ml_notification_event |

:::::::::

## Mensagens «citando» que estão armazenadas

**quoting-service**
:::::: col-wrapper

::: col-third

| metadata.trace.service |

| ---- |
| qs_quote_handleQuoteRequest |

| qs_quote_forwardQuoteRequest |

| qs_quote_forwardQuoteRequestResend |

| qs_quote_handleQuoteUpdate |

| qs_quote_forwardQuoteUpdate |

| qs_quote_forwardQuoteUpdateResend |

| qs_quote_handleQuoteError |

| qs_quote_forwardQuoteGet |

| qs_quote_sendErrorCallback |

:::

::: col-third

| metadata.trace.service |

| ---- |
| qs_bulkquote_forwardBulkQuoteRequest |

| qs_quote_forwardBulkQuoteUpdate |

| qs_quote_forwardBulkQuoteGet |

| qs_quote_forwardBulkQuoteError |

| qs_bulkQuote_sendErrorCallback |

:::

::: col-third

| metadata.trace.service |

| ---- |
| QuotesErrorByIDPut |

| QuotesByIdGet |

| QuotesByIdPut |

| QuotesPost |

| BulkQuotesErrorByIdPut |

| BulkQuotesByIdGet |

| BulkQuotesByIdPut |

| BulkQuotesPost |

:::
:::::::::

## Mensagens de «liquidação» que se encontram armazenadas

**central-settlement**
:::::: col-wrapper

::: col-third

| metadata.trace.service |

| ---- |
| cs_process_transfer_settlement_window |

| cs_close_settlement_window |

| ... |
:::

::: col-third

| metadata.trace.service |

| ---- |
| getSettlementWindowsByParams |

| getSettlementWindowById |

| updateSettlementById |

| getSettlementById |

| createSettlement |

| fecharJanelaDeLiquidação |

| ... |
:::
:::::::::

## Mensagens que, neste momento, continuam sem classificação e são filtradas 

**account-lookup-service (não consta do PI — incluído a título de referência)**

:::::: col-wrapper

::: col-third

| metadata.trace.service |

| ---- | 
| ParticipantsErrorByIDPut |

| ParticipantesPorID |

| Erros dos participantes por tipo e ID |

| Erros dos participantes por tipo de sub-ID e IDPut |

| ParticipantsSubIdByTypeAndIDGet |

| ParticipantsSubIdByTypeAndIDPut |

| ParticipantsSubIdByTypeAndIDPost |

| ParticipantsSubIdByTypeAndIDDelete |

| ParticipantsByTypeAndIDGet |

| ParticipantesPorTipoEID |

| ParticipantesPorIDeTipoPublicação |

| Eliminar participantes por tipo e ID |

| Publicações dos participantes |

| PartiesByTypeAndIDGet |

| PartiesByTypeAndIDPut |

| Erros de Partes por Tipo e ID |

| PartiesBySubIdTypeAndIDGet |

| PartiesSubIdByTypeAndIDPut |

| Erro de Partes por SubIdType e IDPut |

:::

::: col-third

| metadata.trace.service |

| ---- |
| OraclesGet |

| OraclesPost |

| OraclesByIdPut |

| OraclesByIdDelete |

:::

::: col-third

| metadata.trace.service |

| ---- |
| participantes da publicação |

| getPartiesByTypeAndID |

| ... |
:::
:::::::::

**transaction-requests-service (não consta no PI — incluído a título de referência)**
:::::: col-wrapper
::: col-third
| metadata.trace.service |
| ----- |
| TransactionRequestsErrorByID |
| TransactionRequestsByID |
| TransactionRequestsByIDPut |
| TransactionRequests |
| AuthorizationsIDResponse |
| AuthorizationsIDPutResponse |
| AuthorizationsErrorByID |
:::

::: col-third

| metadata.trace.service |

| ----- |
| forwardAuthorizationMessage |

| erro de autorização de reencaminhamento |

| ... |
:::
:::::::::

### Ferramentas úteis


#### Explorador Kafka

O software [«kowl»](https://github.com/cloudhut/kowl), da cloudhut, é uma ferramenta útil para explorar todas as Kafka mensagens num Mojaloop cluster. Podemos deployá-lo no mesmo namespace que os Mojaloop serviços principais.


O ficheiro de valores personalizados para o deployment do OSS encontra-se neste [repository](https://github.com/mojaloop/deploy-config/tree/deploy/PI15.2/mojaloop/kowl-kafka-ui).
(Trata-se de um repositório privado; poderá ser necessária autorização para aceder a esta ligação.)

**Passos para a instalação**
```
helm repo add cloudhut https://raw.githubusercontent.com/cloudhut/charts/master/archives
helm repo update
helm install kowl cloudhut/kowl -f values-moja2-kowl-values.yaml
```
**Interface de utilizador web**
Abra o ficheiro URL, cuja configuração se encontra na secção `ingress` do ficheiro `values`.

**Personalização adicional**
Para obter informações sobre como adicionar mais personalizações, consulte a [configuração de referência](https://github.com/cloudhut/kowl/blob/master/docs/config/kowl.yaml)] fornecida pela cloudhut.

#### Percurso ideal do TTK

Os casos de teste do «golden path» do TTK foram concebidos para explorar todos os resultados de teste possíveis aquando do envio de transferências. Trata-se, portanto, de uma ferramenta importante que pode ser utilizada para verificar se a funcionalidade está preparada para todas as eventualidades. Ou seja, podemos utilizar o TTK integrado para executar diferentes casos de teste, tais como o «happy path» P2P, cenários negativos, casos de uso relacionados com a liquidação, entre outros.


## Serviço de processamento de eventos


O serviço de processamento de eventos é responsável por subscrever Kafka tópicos e filtrar os eventos por tipo de evento. O tipo de evento divide-se, por sua vez, em várias partes, dependendo do serviço a partir do qual os eventos foram produzidos. Os eventos filtrados serão então processados em função do contexto da estrutura do evento, e serão criados metadados de relatório.

Exemplo:

```json
{
    "event": {
        "id" : {},
        "content" : {},
        "type" : {},
        "metadata" : {}
    },
    "metadata" : {
        "reporting" : {
            "transactionId" : "...",
            "quoteId": "...",
            "eventType" : "Quote"
        }
    }
}
```

| tipo de evento	| Origem do evento |
| ------- | ------- |
| Citação | quoting-service |
| Transferência | ml-api-adapter |
| Liquidação	| central-settlement |

O serviço de processamento de eventos subscreve o fluxo de eventos «Kafka» para criar um repositório relacionado com a transferência de eventos, que pode ser consultado através do fluxo operacional «API». Isto está em conformidade com a arquitetura de referência.
