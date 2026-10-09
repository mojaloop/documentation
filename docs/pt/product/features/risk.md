# Gestão de risco

Um aspeto fundamental do funcionamento de um scheme de pagamentos (o conjunto de regras do sistema de pagamentos) construído em torno de um
hub Mojaloop é a gestão do risco entre as partes que transacionam, as quais
terão, elas próprias, apetites diferentes para o risco. Os princípios
aplicados são:

1.  Todos os participantes (FSP) são obrigados a depositar uma forma acordada de
    liquidez junto do parceiro de liquidação do scheme. Esta liquidez só
    pode ser retirada, total ou parcialmente, do scheme com o
    acordo do operador do scheme.
    &nbsp;
2.  Uma transação só será compensada (durante a fase de transferência) se
    existir liquidez suficiente disponível para a cobrir, medida
    em relação ao saldo de liquidez, à posição atual do DFSP (Digital Financial Services Provider) (o total
    líquido das transações previamente compensadas desde a última atividade de
    liquidação, quer como pagador quer como beneficiário) e a quaisquer fundos reservados. 
    &nbsp;
3.  O valor de uma transação compensada será adicionado à posição do DFSP pagador e debitado da posição do DFSP beneficiário.
 &nbsp;
4.  Durante a liquidação, para cada DFSP, uma posição negativa será debitada do
    saldo de liquidez e transferida para o parceiro de liquidação para
    distribuição aos credores; uma posição positiva será creditada
    no saldo de liquidez pelo parceiro de liquidação, utilizando fundos dos devedores. 
    &nbsp;
5.  Uma liquidação bem-sucedida retira da posição de cada DFSP o valor representado pelas transações na janela/lote de liquidação associado.
    &nbsp;
6.  Espera-se que um DFSP faça a gestão da sua liquidez, reforçando-a se
    descer para um nível em que os valores de transação previstos resultem em
    transações falhadas, ou retirando uma parte (mediante pedido ao
    operador do scheme) se o valor for demasiado elevado. Esta atividade tem lugar
    fora do Mojaloop, mas é um requisito que seja declarada
    no scheme Mojaloop, quer pelo DFSP quer pelo parceiro de
    liquidação.
    &nbsp;
7.  Quando o parceiro de liquidação não está disponível 24/7, um DFSP pode
    depositar um saldo adicional na sua conta de liquidez, por exemplo para
    cobrir as transações previstas durante um período de feriados. Um DFSP pode
    gerir este saldo adicional utilizando um limite líquido de débito (Net Debit Cap, NDC), que pode
    ser usado, por exemplo, para limitar a utilização da liquidez aos níveis
    esperados num determinado dia, de forma a garantir que o DFSP
    pode continuar a operar durante todo o período de feriados.
    O NDC é utilizado em conjunto com o saldo de liquidez na
    autorização de transações durante a fase de cotação.
    
## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Atualizações relacionadas com o release da V17|
|1.0|13 de março de 2025| Paul Makin|Versão inicial|