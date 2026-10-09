# Comissões e tarifas
O Mojaloop permite comissões de transação através de uma arquitetura flexível orientada por regras, concebida para garantir transparência e acordo em cada fase de um pagamento.

##  **Acordo de termos – negociação de comissões**

Antes de uma transação ocorrer, o Mojaloop utiliza a sua fase de transação de **Acordo de termos** para permitir que os DFSPs calculem  e acordem todas as comissões e encargos associados. 

No início desta fase, o DFSP do pagador propõe a transação ao DFSP do beneficiário, incluindo a escolha de um modelo de cobrança, sendo que ou as comissões são adicionadas ao montante que o remetente paga, ou são deduzidas do montante que o beneficiário recebe.

Se o DFSP do pagador pretender prosseguir, então submete uma confirmação. Nesta, o DFSP do beneficiário submete as suas comissões (e outras condições) ao DFSP do pagador sob a forma de um contrato, incluindo ou a aceitação do modelo de cobrança escolhido, ou a sua rejeição.

Se o DFSP pagador pretender prosseguir nos termos apresentados pelo DFSP beneficiário, então apresenta os termos da transferência ao pagador, incluindo o total a pagar pelo pagador com base no modelo de cobrança selecionado. 

| Modelo de cobrança | Pagador paga| Beneficiário recebe |
| -------------- | ---------------------- | -------------------- |
| Remetente paga | Valor + comissão do DFSP pagador + comissão do DFSP beneficiário |Valor|
| Beneficiário paga| Valor + comissão do DFSP pagador|Valor - comissão do DFSP beneficiário|


Se o pagador aceitar os termos e pretender prosseguir, o valor acordado da transferência é debitado da conta do pagador pelo DFSP do pagador, que depois retém as suas próprias comissões e submete um pedido de transferência pelo valor remanescente, juntamente com o contrato do beneficiário, ao Hub Mojaloop.

O DFSP beneficiário, após a conclusão da transferência, retém as suas comissões acordadas e credita a conta do beneficiário com o remanescente.

Desta forma, todas as comissões são consolidadas numa única cotação, para que o pagador conheça o custo exato antes de prosseguir - incluindo se as comissões do DFSP beneficiário são pagas pelo pagador ou pelo beneficiário. 

##  **Rules Handler – comissões de interchange**

O Mojaloop permite regras de comissões avançadas, como as **comissões de interchange**, através do seu Rules Handler, que avalia as transações em curso. Por exemplo, num pagamento P2P (peer‑to‑peer) de carteira para carteira que envolva DFSPs diferentes, o Mojaloop pode aplicar automaticamente uma comissão de 0,6% cobrada pelo DFSP beneficiário ao DFSP pagador. Estas são registadas como lançamentos na razão geral e liquidadas mais tarde.

## **Comissões do hub (comissões do operador)**

Para além dos encargos por transação, os operadores do hub podem impor comissões adicionais de utilização da infraestrutura ou de subscrição aos DFSPs participantes. Estas «comissões do hub» são tipicamente mínimas — apenas o suficiente para cobrir os custos operacionais — com o objetivo de manter as comissões para o utilizador final tão baixas quanto possível, num modelo de «recuperação de custos acrescida» (cost‑recovery plus). 

---

### Em resumo

| Tipo de comissão                   | Tratada por                 | Quando e como                                                |
| ---------------------------------- | --------------------------- | ------------------------------------------------------------ |
| Comissões de transação             | Serviço de Acordo de termos | Cotadas antecipadamente, acordadas antes da execução         |
| Comissões de interchange           | Rules Handler + razão geral | Aplicadas durante o processamento com base em regras         |
| Comissões de infraestrutura do hub | Operador do hub             | Cobradas separadamente para recuperar os custos operacionais |

Esta abordagem por camadas confere ao Mojaloop uma forte capacidade de transparência, configurabilidade e automatização das comissões, bem como de consistência da liquidação — crucial para sistemas de inclusão financeira interoperáveis e economicamente eficientes.

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|17 de julho de 2025| Paul Makin|Versão inicial|
