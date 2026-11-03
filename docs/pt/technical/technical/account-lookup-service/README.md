---
version: 1.1
i18n_source_sha: f46a7b1936f942b0da6bb4ee1210da89228ca840
---


# Serviço de pesquisa de contas

O **Serviço de Pesquisa de Contas** (**ALS**) _(consulte a secção `6.2.1.2`)_, de acordo com a [Mojaloop {{ $page.frontmatter.version }} Specification](/technical/api/), implementa os seguintes casos de uso:

* Pesquisa de participantes 
* Pesquisa de festas
* Gerir as informações do registo dos participantes
    * Adicionar informações do Registo de Participantes
    * Eliminação de informações do Registo de Participantes

Casos de uso que foram implementados para além da utilização operacional do hub: 
* Operações administrativas
    * Gerir informações de encaminhamento de pontos finais Oracle
    * Gerir informações de encaminhamento de pontos finais de switches

## 1. Considerações relativas à conceção

### 1.1. Serviço de Pesquisa de Contas (ALS)
A arquitetura ALS prevê um componente genérico de Serviço Central como parte do núcleo Mojaloop. O objetivo deste componente é assegurar o encaminhamento e a conformidade com a Especificação Mojaloop API. Este componente suportará vários registos de consulta (Oracles). Este ALS disponibilizará um Admin API para configurar o encaminhamento e a configuração de cada um dos Oracles, à semelhança do Serviço Central API para a configuração do ponto final no âmbito do encaminhamento DFSP pelo Gestor de Notificações (Componente Adaptador ML-API). O ALS será, em todos os efeitos práticos, um switch com um armazenamento persistente para o armazenamento e gestão das regras e configurações de encaminhamento.

#### 1.1.1. Pressupostos

* O projeto do ALS irá, por enquanto, permitir apenas um único switch.
* O suporte a vários switches utilizará o mesmo mecanismo de resolução de DNS que está a ser desenvolvido para o projeto «Cross Border/Network».

#### 1.1.2. Encaminhamento

A configuração de encaminhamento basear-se-á no seguinte:
* PartyIdType — Consulte a secção `7.5.6` da Especificação Mojaloop
* Moeda — Consulte a secção `7.5.5` da Especificação Mojaloop. O código da moeda está definido em [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) como uma sequência alfabética de três letras. Este campo é opcional; no entanto, o indicador `isDefault` deve ser definido como `true` caso o `Currency` não seja fornecido.
* isDefault - Indicador de que um Oracle específico é o fornecedor predefinido para um PartyIdType específico. Note-se que podem existir vários Oracles predefinidos, mas apenas pode haver um único Oracle predefinido para um PartyIdType específico. O Oracle predefinido para um PartyIdType específico só será selecionado se o pedido de origem não incluir um filtro de Moeda.


### 1.2. ALS Oracle
O ALS Oracle, a ser implementado como um **Serviço** ou um **Adaptador** (a semântica depende da utilização — Mediação = Adaptador, Serviço = Implementação), irá fornecer um componente de registo de pesquisa com funcionalidades semelhantes às dos recursos `/participants`, Mojaloop e API. No entanto, baseia-se vagamente na especificação MLAPI, uma vez que a sua interface implementa um padrão de sincronização que reduz os requisitos de correlação/persistência do padrão de callback assíncrono implementado diretamente pela especificação MLAPI. Isto proporcionará a todos os Serviços/Adaptadores do ALS Oracle uma interface padrão que será mediada pelo ALS com base na sua configuração de encaminhamento.  
Este componente (ou os sistemas de back-end) será também responsável pela persistência e preenchimento automático dos dados do participante.

## 2. Conceção da pesquisa de participantes

### 2.1. Visão geral da arquitetura
![Architecture Flow Account-Lookup for Participants](./assets/diagrams/architecture/arch-flow-account-lookup-participants.svg)

_Nota: O caso de uso «Pesquisa de Participante» aplica-se igualmente a um caso de uso iniciado pelo beneficiário, como é o caso das «solicitações de transação». A diferença reside no facto de, no diagrama acima, ser o beneficiário a iniciar o processo._

### 2.2. Diagramas de sequência

#### 2.2.1. Participantes do GET

- [Diagrama de sequência para os participantes do GET](als-get-participants.md)

#### 2.2.2. Participantes do programa POST

- [Diagrama de sequência para os participantes do POST](als-post-participants.md)

#### 2.2.3. Participantes do programa POST (lote)

- [Diagrama de sequência para participantes do POST (em lote)](als-post-participants-batch.md)

#### 2.2.4. Participantes do DEL

- [Diagrama de sequência para os participantes do DEL](als-del-participants.md)

## 3. Conceção da Pesquisa de Participantes

### 3.1. Visão geral da arquitetura
![Architecture Flow Account-Lookup for Parties](./assets/diagrams/architecture/arch-flow-account-lookup-parties.svg)

### 3.2. Diagrama de sequências

#### 3.2.1. Partes do GET

- [Diagrama de sequência para GET Parties](als-get-parties.md)

## 4. Conceção da área de administração do ALS

### 4.1. Visão geral da arquitetura
![Architecture Flow Account-Lookup for Admin Get Oracles](./assets/diagrams/architecture/arch-flow-account-lookup-admin.svg)

### 4.2. Diagrama de sequências

#### 4.2.1 Oráculos GET

- [Diagrama de sequência para GET Oracles](als-admin-get-oracles.md)

#### 4.2.2 PÓS-Oracle

- [Diagrama de sequência para POST Oracle](als-admin-post-oracles.md)

#### 4.2.3 PUT Oracle

- [Diagrama de sequência para PUT Oracle](als-admin-put-oracles.md)

#### 4.2.4 DELETE Oracle

- [Diagrama de sequência para DELETE Oracle](als-admin-del-oracles.md)

#### 4.2.5 ELIMINAR a cache de endpoints

- [Diagrama de sequência para o endpoint DELETE Cache](als-del-endpoint.md)

## 5. Conceção de bases de dados

### 5.1. Esquema da base de dados ALS

#### Notas
- `partyIdType` - Atualmente, os valores são preenchidos de acordo com a secção _`7.5.6`_ [Mojaloop {{ $page.frontmatter.version }} Especificação](/technical/api/).
- `currency` - Consulte a secção `7.5.5` da Especificação Mojaloop. O código da moeda é definido em [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) como uma sequência alfabética de três letras. Este campo é opcional e deve fornecer uma configuração «padrão» caso não seja indicada qualquer moeda, ou fornecer um valor padrão caso a moeda seja indicada, mas apenas exista a configuração «padrão» do ponto final.
- `endPointType` — Identificador de tipo para o ponto final (por exemplo, `URL`), que proporciona flexibilidade para o suporte a futuros meios de transporte.
- `migration*` - Tabelas de metadados utilizadas pelo motor do Knex Framework.
- Um `centralSwitchEndpoint` deve ser associado ao `OracleEndpoint` pelo Administrador API aquando da inserção de um novo registo `OracleEndpoint`. Se o `centralSwitchEndpoint` não for fornecido como parte do API Pedido, deve ser atribuído por predefinição. 

![Acount Lookup Service ERD](./assets/entities/AccountLookupService-schema.png)

* [Serviço de Pesquisa de Contas DBeaver ERD](./assets/entities/AccountLookupDB-schema-DBeaver.erd)
* [Serviço de Pesquisa de Contas MySQL Exportação do Workbench](./assets/entities/AccountLookup-ddl-MySQLWorkbench.sql)]

## 6. Conceção do ALS Oracle

A conceção detalhada do Oracle não faz parte do âmbito deste documento. A conceção e a implementação do Oracle são específicas para cada um dos requisitos do Oracle.

### 6.1. Especificação API

Consulte o **ALS Oracle API** na secção [API Especificações](../../api/README.md#als-oracle-api)].
