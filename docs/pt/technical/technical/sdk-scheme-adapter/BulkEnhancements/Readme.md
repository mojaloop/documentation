---
i18n_source_sha: 7555e33f5924bc85e7e4cfb7b18bdcd8c807a67e
---

# SDK. Suporte para transferências em massa - Visão geral
O presente documento de conceção descreve a forma como o Adaptador scheme SDK foi melhorado para permitir o caso de uso das transferências em massa.

## Porquê? - Superação das limitações de transferência em massa de Mojaloop
A implementação de transferências em massa no âmbito do Mojaloop apresenta as seguintes limitações, que esta melhoria SDK em massa se destina a superar.
1. Apenas as transferências individuais destinadas ao mesmo pagador DFSP podem ser incluídas numa chamada para cotações em massa e transferências em massa.
1. O número de cotações individuais e transferências em cada bulkQuotes e bulkTransfers, respetivamente, está limitado a um máximo de 1000.
1. Para permitir a funcionalidade em massa, todos os DFSPs dos beneficiários têm de criar suporte de integração para o envio de mensagens em massa. Ou seja, se o caso de uso em massa fosse introduzido num esquema existente, todos os DFSPs ligados teriam de atualizar as suas ligações e integrações nos seus sistemas bancários centrais.
1. De momento, não há nenhuma chamada de descoberta em massa.

## SDK Requisitos de melhoria em massa do adaptador de scheme
As melhorias permitem:
1. Transferências em que ainda não foi marcada a fase de produção de provas.
1. Não há limite para o número de transferências (limitado pela infraestrutura e pelas capacidades da rede, mas superior a 1 000, tal como especificado no ML FSPIOP)
1. O suporte à integração de beneficiários para processamento em massa é opcional
1. Suporte opcional 
   - uma única chamada que realiza a deteção, o acordo e a transferência
   - aceita de forma independente as pesquisas de grupo
   - aceitação autónoma de cotações
   - definir um limite de comissão para a aceitação automática de cotações
   - a omissão da fase de descoberta
   - executando apenas a fase de descoberta
   - definir um prazo de validade para a mensagem em massa
   - IDs de transação internas, tanto para a mensagem em massa como para as transferências individuais.
   - tanto as chamadas síncronas (API) como as chamadas assíncronas (API)

## Funcionalidades implementadas
A implementação atual não inclui todas as funcionalidades. Todas as funcionalidades que foram concluídas estão operacionais e podem ser utilizadas. Podem ser adicionadas funcionalidades e melhorias adicionais à funcionalidade existente, de acordo com as prioridades definidas pelo produto «Mojaloop» e pela comunidade. Isto está em consonância com o conceito ágil de MVP (Produto Mínimo Viável).
Estas são as funcionalidades que se encontram atualmente implementadas:

| Característica | Estado da implementação | Release Version |
|---|---|---|
| Modo assíncrono | released | v14.1.0 RC |
| Modo síncrono | ainda não começou | |
| Aceitação automática da parte | ainda não começou | |
| Aceitação automática de cotação (com limite de comissão) | ainda não começou | |
| Validar apenas a parte | ainda não começou | |
| Ignorar pesquisa de festas | ainda não começou | |
| Expiração em massa | ainda não começou | |
| Beneficiário SDK — Desmultiplexação de cotações em massa | ainda não começou | |
| Beneficiário SDK — Desmultiplexação de transferências em massa | ainda não começou | |
| Mojaloop - Notificação de correções em massa | ainda não começou | |
| Beneficiário SDK - Desmultiplexação de notificação de correção em massa | ainda não começou | |

### Diagrama funcional
![Functional Diagram](../assets/BulkSDKEnhancements.drawio.svg)

## Diagrama arquitetónico
A arquitetura de Event Sourcing dividiu a implementação em quatro componentes
1. **Backend API** : 
O backend API recebe API chamada e gera os eventos de domínio correspondentes, além de monitorizar esses eventos para gerar API callbacks.
1. **Manipulador de eventos de domínio**:
O Gestor de Eventos de Domínio recebe eventos de domínio e gera eventos de comando.
1. **Manipulador de eventos de comando**:
O Gestor de Eventos de Comando processa eventos de comando e gera eventos de domínio
1. **FSPIOP API**:
O FSPIOP API monitoriza eventos do domínio e gera as chamadas FSPIOP correspondentes, e monitoriza API callbacks para gerar os eventos do domínio correspondentes.

![Architectural Diagram](../assets/BulkSDKEnhancements-Architecture.drawio.svg)


## Diagrama de sequências geral
Apresentamos aqui um diagrama de sequência que descreve o papel que o Adaptador de Esquema SDK irá desempenhar numa chamada em massa, tanto para um Pagador DFSP como para um Beneficiário DFSP.
![Bulk Transfer Sequence Diagram Overview](../assets/sequence/SDKBulkSequenceDiagram.svg)

