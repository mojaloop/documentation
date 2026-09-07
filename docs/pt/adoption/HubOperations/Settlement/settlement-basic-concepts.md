# Conceitos básicos

Esta secção reúne os principais conceitos e elementos do processo de gestão da liquidação.

## Cobertura de liquidez

Conforme descrito na [Introdução](settlement-management-introduction.md), uma das características de um sistema de pagamentos em tempo real é que os DFSP (Digital Financial Services Provider) credores têm de desembolsar fundos aos seus clientes antes de serem reembolsados pelo DFSP devedor. Para mitigar o risco de um DFSP credor não receber os fundos que lhe são devidos, o Mojaloop exige que os DFSP devedores apresentem prova credível de que dispõem de fundos efetivos suficientes para cumprir as obrigações que contraem em consequência de transacionarem no sistema.

Esta prova credível é designada por *cobertura de liquidez*. O sistema Mojaloop não estipula as formas que deve assumir; e, para um dado DFSP, pode assumir múltiplas formas. Pode ser:

- fundos depositados numa conta sobre a qual o Hub Mojaloop tem algum controlo
- uma linha de crédito de outra instituição financeira
- garantias de outro tipo

No entanto, qualquer cobertura de liquidez utilizada num scheme Mojaloop (o conjunto de regras do sistema de pagamentos) tem de possuir as seguintes características:

- Tem de poder ser convertida em pagamentos de liquidação *imediatamente* mediante solicitação do scheme Mojaloop.
- Tem de ser comprovada por prova fidedigna na posse do scheme Mojaloop.
- Não pode ser convertida pelo DFSP noutras formas (por exemplo, através do levantamento de fundos de uma conta bancária ou da mobilização de fundos de uma linha de crédito) sem o conhecimento e a aprovação prévios do scheme Mojaloop.

A cobertura de liquidez atribuída a um dado DFSP é cobertura de liquidez para um dado modelo de liquidação e moeda, e é imputável ao scheme no seu todo. Ou seja, o Mojaloop não permite que os participantes mantenham cobertura de liquidez aplicável apenas às suas transferências com um DFSP específico ou com DFSP específicos.

Quando um DFSP solicita ao Hub Mojaloop a realização de uma transferência, o Hub Mojaloop verifica se o DFSP devedor dispõe de cobertura de liquidez suficiente para garantir que a transferência pode ser liquidada caso seja concluída com êxito. Fá-lo comparando o total de fundos efetivos do DFSP com a soma dos seguintes elementos:

1. A soma das transferências que foram concluídas mas ainda não liquidadas, e nas quais o DFSP é *ou* a parte credora *ou* a parte devedora.
1. A soma das transferências que foram iniciadas mas ainda não concluídas, e nas quais o DFSP é a parte devedora.
1. O montante da transferência proposta.

Se o total destes três elementos for superior ao montante de fundos efetivos disponíveis para o DFSP devedor, a transferência é rejeitada pelo Hub Mojaloop. Note-se que, nesta configuração, a liquidez de um DFSP é creditada com o efeito das transferências em que este é o beneficiário assim que a transferência é concluída, sem ser necessário aguardar que os fundos sejam liquidados. O Mojaloop procede assim para manter no mínimo o montante de liquidez que os participantes têm de manter.

## Modelo de liquidação

Diferentes schemes vão querer liquidar fundos entre os seus participantes de formas diferentes. Estas dependem de quem opera o scheme, do volume de tráfego que atravessa o scheme e de muitas outras variáveis.

O Mojaloop foi concebido para ser compatível com as formas padrão da indústria de liquidação entre participantes. São as seguintes:

- Liquidação líquida diferida multilateral
- Liquidação líquida diferida bilateral
- Liquidação bruta imediata

O significado dos termos que compõem estes tipos de liquidação é o seguinte.

As liquidações são *líquidas diferidas* se um conjunto de transferências for liquidado em conjunto. As liquidações líquidas (nas quais um conjunto de transferências é liquidado em conjunto) são, por definição, diferidas (uma vez que a construção de um lote demora tempo.)

As liquidações são *brutas* se cada transferência for liquidada separadamente. As liquidações brutas podem ser imediatas ou diferidas. São *diferidas* se for necessária aprovação de liquidação proveniente do exterior do Hub, e *imediatas* se o Hub puder avançar para a liquidação de uma transferência sem exigir qualquer aprovação externa. Atualmente, o Mojaloop apenas é compatível com liquidações brutas imediatas.

As liquidações são *bilaterais* se cada par de participantes liquidar entre si o valor líquido de todas as transferências entre ambos. As liquidações são *multilaterais* se cada participante liquidar com o Hub o valor líquido de todas as transferências nas quais foi parte, independentemente de quem tenha sido a outra parte.

Um modelo de liquidação especifica a forma como um Hub Mojaloop liquida um conjunto de transferências. No caso simples, existe apenas um modelo de liquidação, que liquida todas as transferências processadas pelo Hub. No entanto, o Mojaloop é compatível com mais do que um modelo de liquidação para um único scheme. Isto permite, por exemplo, que um scheme defina modelos de liquidação diferentes para moedas diferentes, ou para tipos de conta do razão geral diferentes.

Se um scheme definir mais do que um modelo de liquidação, é da responsabilidade do scheme assegurar que uma dada transferência só pode pertencer a um único modelo de liquidação. Por exemplo, suponha-se que um scheme define um modelo de liquidação para todas as transferências que exigem conversão cambial (definidas como: todas as transferências em que a moeda de origem e a moeda de destino são diferentes entre si), e também um modelo de liquidação para todas as transferências em que a moeda de origem é o xelim queniano (KES). Neste caso, uma transferência convertida de xelins quenianos para rands sul-africanos poderia pertencer a ambos os modelos.

## Janela de liquidação

Todas as transferências concluídas no Hub são atribuídas à janela de liquidação atualmente aberta. A janela de liquidação é uma forma de agrupar transferências. A atribuição de transferências a uma janela de liquidação ocorre independentemente dos modelos de liquidação utilizados para liquidar as transferências. Isto significa que, se um scheme tiver definido mais do que um modelo de liquidação, as transferências pertencentes aos diferentes modelos de liquidação partilham uma janela de liquidação.

Não existe uma forma determinística de atribuir transferências a uma janela de liquidação específica. Quando um administrador do scheme cria uma nova janela de liquidação, não é possível determinar antecipadamente que transferências serão atribuídas à nova janela de liquidação e que transferências serão atribuídas à janela de liquidação antiga.

Uma janela de liquidação pode ter os seguintes estados:

- `OPEN`: a janela de liquidação está aberta, estão a ser aceites transferências na janela aberta atual.
- `CLOSED`: a janela de liquidação está fechada. Não está a aceitar transferências adicionais e todas as novas transferências estão a ser alocadas a uma nova janela de liquidação aberta.
- `PENDING_SETTLEMENT`: a janela de liquidação está fechada, as [Posições Líquidas de Liquidação Multilaterais](#posicoes-liquidas-de-liquidacao) foram calculadas para cada DFSP, mas a liquidação com o banco de liquidação parceiro ainda não ocorreu.
- `SETTLED`: o banco de liquidação confirmou que todos os DFSP participantes que efetuaram transferências na janela de liquidação liquidaram os seus pagamentos, e o Operador do Hub liquidou a janela.

O fecho de uma janela de liquidação abre automaticamente a seguinte.

### Liquidações e janelas de liquidação

Um Administrador do Hub pode solicitar liquidações para um dado modelo de liquidação e para uma ou mais janelas de liquidação.

Se um scheme tiver apenas um único modelo de liquidação, liquidar as transferências desse modelo numa dada janela de liquidação liquida todas as transferências dessa janela. Se, por outro lado, um scheme tiver definido mais do que um modelo de liquidação, liquidar as transferências pertencentes a um determinado modelo de liquidação para uma dada janela de liquidação significa que algumas das transferências dessa janela foram liquidadas, ao passo que outras não.

É particularmente importante compreender as implicações disto quando foi definido um modelo de liquidação Bruta Imediata. Neste caso, as transferências individuais são liquidadas assim que forem concluídas. Se o scheme tiver apenas um modelo de liquidação Bruta Imediata, todas as transferências são liquidadas à medida que são concluídas, e a janela de liquidação torna-se irrelevante. Se, por outro lado, o scheme combinar modelos de liquidação Bruta e Líquida, ou se o scheme tiver definido mais do que um modelo de liquidação Líquida, é possível que uma dada janela de liquidação contenha algumas transferências que foram liquidadas e outras que não o foram; e, no caso das transferências liquidadas por um modelo de liquidação Bruta, que transferências já liquidadas apareçam mesmo numa janela de liquidação atualmente aberta. Isto cria potenciais complicações na definição do estado global de uma janela de liquidação.

O Mojaloop lida com esta situação atribuindo sempre à janela de liquidação um estado que é o estado mínimo das transferências nela contidas. O *estado mínimo* é definido pela sequência de estados da janela de liquidação apresentada acima. Assim, por exemplo, se uma janela de liquidação contiver transferências que já foram liquidadas (por serem liquidadas de forma Bruta) e outras transferências cujo processo de liquidação ainda não começou, o estado da janela de liquidação é `OPEN`. Se uma janela de liquidação tiver sido fechada e contiver transferências pertencentes a dois modelos de liquidação diferentes, um dos quais está a ser liquidado (e cujo estado é, por conseguinte, `PENDING_SETTLEMENT`) e o outro não (e cujo estado é, por conseguinte, `CLOSED`,) o estado global da janela de liquidação é `CLOSED`.

## Gestão de liquidez (Net Debit Cap)

Conforme descrito acima, o Mojaloop exige que os participantes pré-financiem as transferências em que são a parte devedora, apresentando ao Hub Mojaloop prova credível de que conseguem satisfazer todas as suas exigências de liquidação atuais. Pode haver, no entanto, circunstâncias em que um participante não pretenda que toda a sua cobertura de liquidez seja utilizada como cobertura para transferências. Por exemplo, um participante pode ser um recetor num canal de remessas e, por conseguinte, um credor líquido global; ou um participante pode depositar fundos adicionais para cobrir períodos em que as suas contas não estão abertas para receber fundos.

Para cobrir estas possibilidades, o Mojaloop permite que os participantes ou os Administradores do Hub reservem parte da sua cobertura de liquidez disponível, de modo a que apenas parte dela possa ser utilizada para fornecer cobertura de liquidez para transferências. A isto chama-se Net Debit Cap (NDC). O NDC funciona como um limite ou um teto imposto aos fundos de um DFSP disponíveis para transacionar, e nunca pode exceder o saldo da conta de liquidez. Isto é necessário para assegurar que as responsabilidades de um DFSP podem ser satisfeitas com fundos imediatamente disponíveis para o banco de liquidação.

Ao calcular se uma transferência está ou não coberta pela liquidez disponível, o Hub tem em conta qualquer restrição ao montante de fundos disponíveis especificada pelo Net Debit Cap.

## Posição

A Posição de um DFSP reflete o total das obrigações não liquidadas de um DFSP para um dado modelo de liquidação num dado momento: ou seja, o montante de fundos que um DFSP acabará por ter de liquidar com o scheme. A Posição de um DFSP para um dado modelo de liquidação é o valor líquido dos seguintes elementos:

1. Todas as transferências concluídas mas não liquidadas que pertencem ao modelo de liquidação e em que o DFSP é a parte devedora.
2. Todas as transferências concluídas mas não liquidadas que pertencem ao modelo de liquidação e em que o DFSP é a parte credora.
3. Todas as transferências que foram solicitadas mas ainda não concluídas que pertencem ao modelo de liquidação e em que o DFSP é a parte devedora.

Para o DFSP pagador, este total inclui montantes de transferências que estão pendentes e ainda não foram concluídas. Note-se que, se ocorrer um cancelamento ou um timeout, as transferências afetadas não são concluídas e a reserva dessa transferência é removida.

A Posição é a posição total em todas as janelas de liquidação que ainda não foram liquidadas. O montante da posição de um participante só se altera quando algumas das transferências que a compõem são liquidadas.

## Posições líquidas de liquidação

Conforme descrito acima, uma liquidação líquida diferida pode ser multilateral ou bilateral. Quando um Administrador do Hub solicita uma liquidação, o Hub calcula quanto cada participante deve, ou lhe é devido, em consequência das transações a liquidar. As transações a liquidar são definidas como todas as transações que:

- Pertencem à(s) janela(s) de liquidação a liquidar.
- Pertencem ao modelo de liquidação que está a ser liquidado.

Se a liquidação for *multilateral*, um DFSP recebe apenas um valor como o montante que deve, ou que lhe é devido, em consequência da liquidação. Este valor é o líquido de todas as transações a liquidar.

Se a liquidação for *bilateral*, um DFSP pode receber múltiplos valores como o montante que deve, ou que lhe é devido, em consequência da liquidação. Cada valor representa o líquido das transações do DFSP com um DFSP específico. O líquido de todos estes valores é igual ao valor global que deveria, ou que lhe seria devido, numa liquidação líquida multilateral.

## Relatórios de liquidação

Para facilitar a reconciliação e a liquidação dos DFSP no banco de liquidação, o Hub disponibiliza vários relatórios de liquidação. Um Scheme pode optar por ter vários relatórios diferentes para diferentes finalidades. Seguem-se alguns exemplos:

- Relatório de Liquidação do DFSP: um relatório emitido a um DFSP quando a liquidação é iniciada. Fornece a posição de liquidação bilateral do DFSP com cada DFSP com o qual transacionou (quer como DFSP pagador, quer como DFSP beneficiário) na(s) janela(s) de liquidação a liquidar. Fornece também a Posição Líquida de Liquidação Multilateral do DFSP (o total dos montantes de transferências enviados e recebidos pelo DFSP na(s) janela(s) de liquidação).
- Relatório do Banco de Liquidação: um relatório emitido ao banco de liquidação quando a liquidação é iniciada. Fornece a posição de liquidação bilateral de cada DFSP face a todos os outros DFSP que transacionaram na(s) janela(s) de liquidação a liquidar. Fornece também a Posição Líquida de Liquidação Multilateral de cada DFSP (o total dos montantes de transferências enviados e recebidos pelo DFSP).
- Relatório de Resultado de Liquidação do DFSP: um relatório emitido a um DFSP quando a liquidação é finalizada. Fornece detalhes sobre o saldo da conta de liquidez do DFSP e os movimentos de fundos decorrentes do fecho da janela de liquidação.

## Finance Portal

O [Finance Portal (em inglês)](../../../../adoption/HubOperations/Portalv2/busops-portal-introduction.md) (habitualmente designado por «Finance Portal v2») é um portal web utilizado pelo Operador do Hub para gerir diariamente os processos relacionados com a liquidação. O portal disponibiliza funcionalidades para:

- monitorizar detalhes como o saldo, a [Posição](#posicao) e o [Net Debit Cap](#gestao-de-liquidez-net-debit-cap) dos DFSP
- atualizar o [Net Debit Cap](#gestao-de-liquidez-net-debit-cap) de um DFSP
- gerir janelas de liquidação
<!--* descarregar relatórios-->
- registar depósitos ou levantamentos nas contas de liquidez dos DFSP

::: tip NOTA
O Finance Portal apenas é atualmente compatível com processos de liquidação que assentam no modelo de Liquidação Líquida Diferida.
:::
