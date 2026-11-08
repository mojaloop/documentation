
# Metadados
A própria natureza do Mojaloop como switch que interliga DFSP (Digital Financial Services Providers) significa que o Mojaloop não pode atribuir significado à transação. No entanto, as transações têm também o potencial de transportar metadados juntamente com os detalhes do pagamento, e são estes metadados que podem ser utilizados por um scheme (o conjunto de regras do sistema de pagamentos) para associar o pagamento a transações fora do Mojaloop, promovendo assim a interoperabilidade ao transportar contexto entre DFSP. Isto aplica-se tanto a uma transação push como a uma transação RTP.

Os metadados ajudam a descrever, contextualizar ou gerir o pagamento para além do simples montante, remetente e destinatário. Não são estritamente necessários para movimentar dinheiro, mas são cruciais para a reconciliação, a automatização, a conformidade e a experiência do cliente.

Ao nível mais simples, isto pode ser utilizado, por exemplo, para associar um pagamento a uma conta a pagar, de modo a que possa ser reconhecido como pagamento de uma fatura de eletricidade. Outro exemplo seria utilizá-los para transportar um número de fatura juntamente com um pagamento em liquidação de uma responsabilidade B2B. Ou podem descrever a finalidade de um pagamento, como «Propinas do 3.º trimestre de 2025», «Salário de junho de 2025» ou «Reembolso de empréstimo».

Quando estes metadados se destinam a ser utilizados para a automatização de pagamentos, este «significado» é definido pelo operador do scheme e pelos DFSPs participantes, e não pelo Hub Mojaloop. A automatização seria normalmente implementada como parte da [personalização do Core Connector nas ferramentas de participação](./connectivity.md).

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|16 de julho de 2025| Paul Makin|Primeira versão.|