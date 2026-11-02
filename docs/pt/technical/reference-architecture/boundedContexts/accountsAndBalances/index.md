---
i18n_source_sha: 4503991da1c09789524a4d7a6008d6519068daec
---

# Contas e Saldos BC

O BC de Contas e Saldos funciona como a «razão geral» do sistema. Interage principalmente com os BC de Liquidações, de Ciclo de Vida dos Participantes e de Transferências, e é um subsistema dirigido, o que significa que depende dos BC que o utilizam como «sistema financeiro de registo» para a contabilidade financeira.

**Nota:**

O BC de Contas e Saldos contém uma quantidade limitada de lógica para garantir que **(a)** sejam criadas e mantidas as relações corretas entre entidades quando um BC externo cria, atualiza, consulta ou encerra contas e **(b)** os limites de conta corretos sejam aplicados (ou seja, definidos e não excedidos) quando um BC externo tenta criar lançamentos contábeis e **\(c\)** evita a duplicação de lançamentos na razão geral, utilizando *Identificadores Únicos Universais (UUID)* para identificadores únicos de lançamentos contábeis.

## Termos

Termos com um significado específico e geralmente aceite no Contexto Delimitado em que são utilizados.

| Termo              | Descrição                                                                                                                                           |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Conta**       | Refere-se a uma conta da razão geral, um registo num sistema de contabilidade que regista os lançamentos a débito ou a crédito que representam uma transação financeira. |
| **Entrada no diário** | Lançar registos financeiros de crédito/débito na conta.                                                                                                       | 
| **Saldo**       | O montante disponível numa conta, após terem sido contabilizados os débitos e os créditos.                                                                |

## Visão geral das funcionalidades - Contas e saldos

![Functional Overview - Accounts and Balances](./assets/ML2RA_A&B-bcAccBal-FunctionalOverview_Mar22-c.png)
>Diagrama funcional do BC: Visão geral das contas e saldos

## Casos de uso

### Criar conta

#### Descrição

O fluxo de trabalho proporcionado por esta UC permite que a Switch crie novas contas de participante, de transferência e de liquidação na Razão Geral do Sistema. (A criação de contas de participante ocorre tanto a partir da Gestão do Ciclo de Vida do Participante como dos BCs de Liquidação. Foram apresentados exemplos de ambos nos diagramas de fluxo abaixo).

Além disso, o fluxo de trabalho permite definir limites para os lançamentos contábeis de crédito/débito e assegurar que a conta seja única na razão geral do sistema.

#### Diagrama de fluxo

Criação de conta a partir de [Gestão do Ciclo de Vida do Participante BC](../participantLifecycleManagement/index.md)

<!-- Warning Note to Developers & Editors!!: The following two images are being rendered from the Participant Lifecycle BC. -->

![Use Case - PLCM BC](../participantLifecycleManagement/assets/ML2RA_PLM-ucAddParticipantAccountInit_Apr22-a_P1-1429.png)
![Use Case - Add Participant Account - Approval (P2)](../participantLifecycleManagement/assets/ML2RA_PLM-ucAddParticipantAccountAppro_Apr22-a_P2-1429.png)
>Diagrama de fluxo de trabalho da UC: Adicionar contas de participantes

Criação de conta a partir de [Liquidações BC](../settlements/index.md)

![Use Case - Settlements BC](../settlements/assets/ML2RA_SET-ucBootStrapSettleModViaConfig_Mar22-b.png)
>Diagrama de fluxo de trabalho da UC: Modelo de liquidação inicial (arranque) através da configuração

### Encerrar conta

#### Descrição

Encerrar uma conta de participante na Razão geral do Sistema e impedir que novos lançamentos contábeis a afetem. <br/> (Ainda por determinar: transferir automaticamente os saldos da conta de garantia para outra conta?)

### Consultar conta

#### Descrição

Consultar o estado e o saldo da conta do participante.

#### Diagrama de fluxo

Consultar os limites de liquidez CR/DR a partir de [Gestão do Ciclo de Vida dos Participantes BC](../participantLifecycleManagement/index.md)

<!-- Warning Note to Developers & Editors!!: The following two images are being rendered from the Participant Lifecycle BC. -->

![Use Case - PLCM BC](../participantLifecycleManagement/assets/ML2RA_PLM-ucLiquidityCoverQuery_Apr22-a_1429.png)
>Diagrama de fluxo de trabalho da UC: Consultas relativas à cobertura de liquidez

### Consultar lançamentos contábeis

#### Descrição

Consultar os lançamentos de débito/crédito do diário de uma conta.

### Inserir lançamento contabilístico

#### Descrição

Insira um lançamento contábil de participante na Razão Geral do Sistema, especificando as contas de débito e crédito (existem três formas de efetuar lançamentos contábeis de participantes. Consulte os diagramas de fluxo abaixo para obter uma descrição de cada uma delas.)
Responda indicando o saldo atualizado da conta.

#### Diagrama de fluxo

Inserção de lançamento contábil a partir de [Transferências BC](../transfers/index.md)

![Use Case - Transfers BC](../transfers/assets/ML2RA_Trf_ucPerformTrfUniMode_Mar22a.png)
>Diagrama de fluxo de trabalho da UC: Efetuar transferência (modo universal)

Inserção de lançamento contábil a partir de [Liquidações BC](../settlements/index.md), utilizando o modelo `Deferred Net Settlement` (DNS)

![Use Case - Settlements BC](../settlements/assets/ML2RA_SET-ucDeferNetSettle_Mar22-a-P1-2.png)
>Diagrama de fluxo de trabalho da UC: Liquidação líquida diferida - 19/10/2021

Inserção de lançamentos contabilísticos a partir do [BC](../settlements/index.md), utilizando o modelo `Immediate Gross Settlement` (IGS)

![Use Case - Settlements BC](../settlements/assets/ML2RA_SET-ucInstantGrossSettle_Mar22-a.png)
>Diagrama de fluxo de trabalho da UC: Liquidação bruta imediata

## Modelo canónico

- Conta
  - accountId
  - tipo de conta do livro-razão
  - ledgerAccountState
  - limite de débito
  - limite de crédito
  - saldo a débito
  - saldo credor
- Registo no diário
  - journalEntryId
  - debitAccountId
  - creditAccountId
  - tipo de lançamento contábil
  - montante da transferência
  - transferTimestamp

<!-- Footnotes themselves at the bottom. -->
<!-- ## Notes -->

[^1]: Interfaces comuns: [Mojaloop Lista de interfaces comuns](../../commonInterfaces.md)
