---
i18n_source_sha: 88251e17d6a6504b7277c046e3529ec154e74222
---

# Pedido de Pagamento (R2P) — suporte a casos de uso

Esta documentação descreve a forma como o Adaptador de Esquema SDK suporta o caso de uso «pedido de pagamento». O caso de uso «pedido de pagamento» constitui a base para todas as transferências iniciadas pelo beneficiário. O suporte a este caso de uso exige que cada DFSP num Mojaloop processe automaticamente uma transferência assim que for recebido e validado um pedido para efetuar uma transferência. É importante que o SDK-scheme-adapter ofereça suporte a este caso de uso, uma vez que minimiza o esforço de desenvolvimento que cada «DFSP» tem de realizar caso um Scheme exija que os participantes ofereçam suporte a este caso de uso. Este caso de uso é particularmente interessante do ponto de vista dos testes, uma vez que permite a realização de testes remotos tanto na qualidade de Pagador «DFSP» como de Beneficiário «DFSP».

> Importante:
>
> 1. Nem todas as funcionalidades foram totalmente testadas e alinhadas com a Especificação FSPIOP; por favor, consulte o seguinte épico para se informar sobre o progresso nesta matéria: [#3344 - Melhorar o Adaptador do Scheme SDK para suportar o case](https://github.com/mojaloop/project/issues/3344);];
> 2. Atualmente, não existem testes de ponta a ponta que verifiquem a funcionalidade completa, a qual inclui a autenticação através de OTP. Consulte a seguinte [coleção de casos de teste do Testing Toolkit, release](https://github.com/mojaloop/testing-toolkit-test-cases/releases), para saber o que está atualmente a ser testado: [testing-toolkit-test-cases@v15.0.1](https://github.com/mojaloop/testing-toolkit-test-cases/releases/tag/v15.0.1); e
> 3. É possível que nem todos os casos de falha tenham sido totalmente implementados. Consulte, mais uma vez, o épico [#3344](https://github.com/mojaloop/project/issues/3344)].
>

## Diagrama de sequência

1. O Beneficiário DFSP inicia o caso de uso R2P com a chamada **POST** /RequestToPay API. 
2. O beneficiário DFSP pode, se assim o desejar, validar o pagador. 
3. O Pagador DFSP executa o pedido R2P através de uma chamada **POST** /requestToPayTransfer API. Se o tipo de autenticação não for indicado nesta chamada, o fluxo parte do princípio de que o pagador confirmará a transferência e os termos através de uma chamada **PUT** /requestToPayTransfer; caso contrário, é executado o fluxo de autenticação adequado. 

O diagrama seguinte resume este fluxo.


![R2P Sequence Diagram](./assets/sequence/requestToPaySDK-R2P-SequenceDiagram.svg)

## Diagrama de sequência detalhado

Apresenta-se abaixo um diagrama de sequência mais detalhado para o caso de uso «pedido de pagamento» e as chamadas que o Adaptador do Esquema SDK realiza ao API.

![R2P Detailed Sequence Diagram](./assets/sequence/SDKrequestToPay.svg)


