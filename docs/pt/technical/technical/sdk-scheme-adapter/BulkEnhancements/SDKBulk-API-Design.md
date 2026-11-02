---
i18n_source_sha: 638edcb54a2e6de5878d5c0bb9a9269b9ce604fb
---

# SDK Suporte para transferências em massa - API
Foram adicionadas melhorias ao adaptador do scheme «Payer SDK» ao endpoint «API» no endpoint /BulkTransactions. 
- **POST** /bulkTransactions 
- **PUT** /bulkTransactions 
- **PUT** /bulkTransactions - callback

A definição de «Outbound OpenAPI» pode ser consultada [aqui](https://github.com/mojaloop/api-snippets/blob/master/sdk-scheme-adapter/v2_0_0/outbound/openapi.yaml).
A definição de «Inbound OpenAPI» pode ser consultada [aqui](https://github.com/mojaloop/api-snippets/blob/master/sdk-scheme-adapter/v2_0_0/inbound/openapi.yaml).


## Diagrama de sequência técnica
![Technical Bulk Transfer Sequence Diagram](https://raw.githubusercontent.com/mojaloop/sdk-scheme-adapter/master/docs/design-bulk-transfers/assets/api-sequence-diagram.svg)

## Tabelas de erros para transferências em massa
[Tabela de códigos de erro](./assets/sequence/BULK-ERRORCODES.md)]

### Fase de Descoberta
Todos os erros detetados durante esta fase serão acumulados no mojaloop-connector e serão adicionados ao objeto «`lastError`», sendo posteriormente devolvidos ao pagador FSP, juntamente com todas as outras transferências bem-sucedidas ou com falha envolvidas no pedido de transferência em massa.

O mojaloop-connector funcionará como um canal de passagem para todos os erros devolvidos pelo switch

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de erro na pesquisa de participantes**

| Descrição do erro                                                      | Código de erro  |  Código HTTP       | Categoria                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Erro de comunicação                                                    | 1000        | 503              |  Erro técnico                                          |
| Erro de comunicação com o destino	                                       | 1001        | 503              |  Erro técnico                                          |
| Erro genérico do servidor                                                   | 2000        | 503              |  Erro de processamento                                         |
| Erro interno do servidor	                                                 | 2001        | 503              |  Erro de processamento                                         |
| Parte responsável pela resolução do tempo limite	                                               | 2004        | 503              |  Erro de processamento                                         |
| Erro genérico de validação                                               | 3100        | 400              |  Erro na validação do pedido                                 |
| Partido não encontrado	                                                       | 3204        | 202              |  Erro de processamento                                         |

### Fase de Acordo
Todos os erros detetados durante esta fase serão acumulados no mojaloop-connector e serão adicionados ao objeto «`lastError`», sendo posteriormente devolvidos ao pagador FSP, juntamente com todas as outras transferências bem-sucedidas ou com falha envolvidas no pedido de transferência em massa.

O mojaloop-connector funcionará como um canal de passagem para todos os erros devolvidos pelo switch

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de erro de cotações**

| Descrição do erro                                                      | Código de erro  |  Código HTTP       | Categoria                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Erro de comunicação                                                    | 1000        | 503              |  Erro técnico                                          |
| Erro de comunicação com o destino	                                       | 1001        | 503              |  Erro técnico                                          |
| Erro genérico do servidor                                                   | 2000        | 503              |  Erro técnico                                          |
| Erro interno do servidor	                                                 | 2001        | 503              |  Erro técnico                                          |
| Não implementado	                                                       | 2002        | 501              |  Erro de processamento                                         |
| O serviço não está disponível neste momento	                                         | 2003        | 503              |  Erro de processamento                                         |
| O servidor atingiu o tempo limite	                                                     | 2004        | 503              |  Erro de processamento                                         |
| Servidor ocupado     	                                                     | 2005        | 503              |  Erro de processamento                                         |
| Erro genérico do cliente                                                   | 3000        | 400              |  Erro na validação do pedido                                 |
| Foi solicitada uma versão inaceitável                                         | 3001        | 406              |  Erro inaceitável                                     |
| Desconhecido URI                                                            | 3002        | 404              |  Erro «Não encontrado»                                          |
| Erro genérico de validação                                               | 3100        | 400              |  Erro na validação do pedido                                 |
| Sintaxe incorreta	                                                     | 3101        | 400              |  Erro na validação do pedido                                 |
| Falta um elemento obrigatório	                                             | 3102        | 400              |  Erro na validação do pedido                                 |
| Existem demasiados elementos       	                                             | 3103        | 400              |  Erro na validação do pedido                                 |
| Payload demasiado grande       	                                             | 3104        | 400              |  Erro na validação do pedido                                 |
| Assinatura inválida       	                                             | 3105        | 403              |  Erro proibido                                          |
| Erro no destino FSP       	                                         | 3201        | 404              |  Erro «Não encontrado»                                          |
| Não foi encontrado o ID do pagador FSP       	                                         | 3202        | 404              |  Erro «Não encontrado»                                          |
| Não foi encontrado o ID do beneficiário FSP       	                                         | 3203        | 404              |  Erro «Não encontrado»                                          |
| Não foi encontrado o ID da cotação          	                                         | 3205        | 404              |  Erro «Não encontrado»                                          |
| Não foi encontrado o ID da cotação em massa          	                                     | 3209        | 404              |  Erro «Não encontrado»                                          |
| Erro genérico de validade expirada                                                  | 3300        | 503              |  Erro de processamento                                         |
| A cotação expirou                                                          | 3302        | 503              |  Erro de processamento                                         |
| Erro genérico do pagador                                                    | 4000        | 400              |  Erro na validação do pedido                                 |
| Rejeição por parte de um pagador genérico                                                | 4100        | 403              |  Erro proibido                                          |
| Erro no limite do pagador                                                      | 4200        | 400              |  Erro na validação do pedido                                 |
| Erro de autorização do pagador                                                 | 4300        | 403              |  Erro proibido                                          |
| Erro de bloqueio do pagador genérico                                            | 4400        | 403              |  Erro proibido                                          |
| Erro genérico relativo ao beneficiário                                                    | 5000        | 503              |  Erro de processamento                                         |
| Beneficiário FSP: liquidez insuficiente                                       | 5001        | 503              |  Erro de processamento                                         |
| Rejeição de beneficiário genérico                                                | 5100        | 403              |  Erro proibido                                          |
| O beneficiário rejeitou a cotação                                                   | 5101        | 503              |  Erro de processamento                                         |
| Beneficiário FSP: tipo de transação não permitido                                 | 5102        | 503              |  Erro de processamento                                         |
| O beneficiário rejeitou a cotação                                                   | 5103        | 503              |  Erro de processamento                                         |
| Moeda do beneficiário não permitida                                             | 5106        | 503              |  Erro de processamento                                         |
| Erro no limite do beneficiário                                                      | 5200        | 503              |  Erro de processamento                                         |
| Erro de autorização do beneficiário                                                 | 5300        | 403              |  Erro proibido                                          |
| Erro de bloqueio do beneficiário genérico                                            | 5400        | 403              |  Erro proibido                                          |



### Fase de transferência
Todos os erros detetados durante esta fase serão acumulados no mojaloop-connector e serão adicionados ao objeto «`lastError`», sendo posteriormente devolvidos ao pagador FSP, juntamente com todas as outras transferências bem-sucedidas ou com falha envolvidas no pedido de transferência em massa.

O mojaloop-connector funcionará como um canal de passagem para todos os erros devolvidos pelo switch

```
            "lastError": {
              "httpStatusCode": 404,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3210",
                  "errorDescription": "Bulk transfer ID not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Códigos de erro de transferência**

| Descrição do erro                                                      | Código de erro  |  Código HTTP       | Categoria                                                  |
|------------------------------------------------------------------------|-------------|------------------|-----------------------------------------------------------|
| Erro de comunicação                                                    | 1000        | 503              |  Erro técnico                                          |
| Erro de comunicação com o destino	                                     | 1001        | 503              |  Erro técnico                                          |
| Erro genérico do servidor                                                   | 2000        | 503              |  Erro de processamento                                         |
| Erro interno do servidor	                                                 | 2001        | 503              |  Erro de processamento                                         |
| O servidor atingiu o tempo limite	                                                 | 2004        | 503              |  Erro de processamento                                         |
| Erro genérico de validação                                               | 3100        | 400              |  Erro na validação do pedido                                 |
| Não foi encontrado o ID da transferência em massa                                             | 3210        | 404              |  Erro de processamento                                         |
| Erro genérico de validade expirada                                                  | 3300        | 503              |  Erro de processamento                                         |
| O pedido de transação expirou                                            | 3301        | 503              |  Erro de processamento                                         |
| A transferência expirou                                                       | 3303        | 503              |  Erro de processamento                                         |
| Erro genérico relativo ao beneficiário                                                    | 5000        | 400              |  Erro de processamento                                         |
| Beneficiário FSP: liquidez insuficiente                                       | 5001        | 400              |  Erro de processamento                                         |
| Rejeição de beneficiário genérico                                                | 5100        | 400              |  Erro de processamento                                         |
| O beneficiário rejeitou a cotação                                                   | 5101        | 400              |  Erro de processamento                                         |
| Beneficiário FSP: tipo de transação não permitido                                 | 5102        | 400              |  Erro de processamento                                         |
| O beneficiário n.º FSP rejeitou a cotação                                               | 5103        | 400              |  Erro de processamento                                         |
| O beneficiário rejeitou a transação                                             | 5104        | 400              |  Erro de processamento                                         |
| O beneficiário FSP rejeitou a transação                                         | 5105        | 400              |  Erro de processamento                                         |
| Moeda do beneficiário não permitida                                             | 5106        | 400              |  Erro de processamento                                         |
| Erro no limite do beneficiário                                                      | 5200        | 400              |  Erro de processamento                                         |
| Erro de autorização do beneficiário                                                 | 5300        | 403              |  Erro de processamento                                         |
| Erro de bloqueio do beneficiário genérico                                            | 5400        | 400              |  Erro de processamento                                         |
