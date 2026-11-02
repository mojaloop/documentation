---
i18n_source_sha: 4bc36afa15ada1951c9849306a2759852c5f0881
---

# Notificações e alertas BC

O módulo «Notificações e Alertas BC» funciona como o motor de notificações da plataforma «Mojaloop». Proporciona funcionalidades de apoio para callbacks «FSPIOP» fiáveis, garantindo que os relatórios de entrega sejam disponibilizados para ações de compensação e para fins de auditoria. Da mesma forma, estas funcionalidades podem ser utilizadas para o envio fiável de alertas a subsistemas internos ou a destinatários externos.

A fiabilidade é assegurada por vários mecanismos:

- Cada comando de notificação contém
  - todas as informações necessárias (cabeçalhos, payload, transporte, etc.) exigidas pelo BC para a sua entrega
  - configuração de novas tentativas e de entrega relativa à forma como o BC de Notificação deve lidar com falhas de entrega
- Os relatórios de notificações ou alertas são armazenados e podem ser consultados.

## Termos

Termos com um significado específico e geralmente aceite no Contexto Delimitado em que são utilizados.

| Termo | Descrição |
|---|---|
| **Notificação** | Uma notificação de saída enviada pelo BC de Notificações e Alertas, normalmente para um destino externo, que contém cabeçalhos contextuais e payloads. Um exemplo disso são os «FSPIOP callbacks», que fazem parte da Especificação «Mojaloop API». |
| **Aviso** | É semelhante a uma notificação, com a diferença de que um Alerta é normalmente utilizado para informar subsistemas internos (ou seja, outros BC) ou um operador do hub sobre um Evento Canónico «observado». Um exemplo disso é o facto de um «FSP» ter excedido a sua liquidez disponível. |
| **Relatório de entrega** | Um relatório elaborado pelo Notifications and Alerts BC que contém informações de entrega relativas a uma Notificação ou Alerta específico, tais como o estado da entrega, a resposta recebida pelo destinatário, o número de tentativas e informações sobre falhas. Este relatório pode ser gerado com base num evento de domínio e/ou numa resposta síncrona a um pedido «API». |
| **Evento canónico** | Trata-se de qualquer evento de domínio produzido por um contexto delimitado |

## Casos de uso

### Enviar notificações assíncronas com relatório de entrega

#### Diagrama de fluxo

![Use Case - Send Async Notifications with Delivery Report](./assets/sendAsyncNotificationWithDeliveryReport.png)

### Enviar notificações síncronas com relatório de entrega

#### Diagrama de fluxo

![Use Case - Send Sync Notifications with Delivery Report](./assets/sendSyncNotificationWithDeliveryReport.png)

<!-- Footnotes themselves at the bottom. -->

### Registo de alertas

#### Descrição

Os operadores do hub ou subsistemas poderão chamar o Registo de Alertas API para subscreverem alertas de notificação específicos. A operação AlertRegister incluirá:

- Domínio da mensagem/evento a monitorizar
- Informações sobre o ponto final / transporte para a entrega de notificações
- Modelo do alerta de notificação que será utilizado para gerar a notificação propriamente dita

#### Diagrama de fluxo

![Use Case - Send Sync Notifications with Delivery Report](./assets/alertRegistration.png)

### Notificações de alerta

#### Diagrama de fluxo

![Use Case - Send Sync Notifications with Delivery Report](./assets/alertNotification.png)

<!-- Footnotes themselves at the bottom. -->
<!--## Notes

[^1]: Interfaces comuns: [Mojaloop Lista de interfaces comuns](../../commonInterfaces.md)-->
