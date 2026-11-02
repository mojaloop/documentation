---
i18n_source_sha: 4bc36afa15ada1951c9849306a2759852c5f0881
---

# Notificaciones y alertas BC

El módulo «Notificaciones y alertas» (Notifications and Alerts BC) actúa como motor de notificaciones de la plataforma «Mojaloop». Proporciona capacidades de apoyo para garantizar la fiabilidad de las respuestas de llamada «FSPIOP», asegurando que los informes de entrega estén disponibles para la aplicación de medidas correctivas y con fines de auditoría. Del mismo modo, estas capacidades pueden aprovecharse para enviar alertas de forma fiable a sistemas internos o a usuarios externos.

La fiabilidad queda garantizada gracias a varios mecanismos:

- Cada comando de Notificación contiene
  - toda la información necesaria (encabezados, carga útil, transporte, etc.) que requiere el BC para entregarla
  - Configuración de reintentos y entrega relativa a cómo debe gestionar el canal de Notificación (BC) los errores de entrega
- Los informes de notificaciones o alertas se almacenan de forma permanente y pueden consultarse.

## Términos

Términos con un significado específico y comúnmente aceptado dentro del contexto delimitado en el que se utilizan.

| Término | Descripción |
|---|---|
| **Notificación** | Notificación saliente enviada normalmente por el BC de Notificaciones y Alertas a un destino externo, que contiene encabezados contextuales y cargas útiles. Un ejemplo de ello son las «FSPIOP Callbacks», que forman parte de la especificación «Mojaloop API». |
| **Aviso** | Es similar a una notificación, salvo que una alerta se utiliza normalmente para informar a los subsistemas internos (es decir, a otros BC) o a un Operador del Hub de un evento canónico «observado». Un ejemplo de ello sería que un «FSP» haya superado su liquidez disponible. |
| **Informe de entrega** | Un informe elaborado por Notifications and Alerts BC que contiene información sobre el envío de una Notificación o alerta concreta, como el estado del envío, la respuesta recibida por el destinatario, el número de reintentos e información sobre los fallos. Este informe puede corresponder a un evento de dominio y/o a una respuesta sincrónica a una solicitud «API». |
| **Evento canónico** | Se trata de cualquier evento de dominio generado por un contexto delimitado |

## Caso de uso

### Enviar notificaciones asíncronas con informe de entrega

#### Diagrama de flujo

![Use Case - Send Async Notifications with Delivery Report](./assets/sendAsyncNotificationWithDeliveryReport.png)

### Enviar notificaciones sincrónicas con informe de entrega

#### Diagrama de flujo

![Use Case - Send Sync Notifications with Delivery Report](./assets/sendSyncNotificationWithDeliveryReport.png)

<!-- Footnotes themselves at the bottom. -->

### Registro de alertas

#### Descripción

Los operadores del Hub o los subsistemas podrán llamar a la operación «Alert RegistrationAPI» para suscribirse a alertas de notificación específicas. La operación «AlertRegister» incluirá:

- Mensaje o evento del dominio que se va a realizar el monitoreo
- Punto final / Información sobre el transporte para la entrega de notificaciones
- Plantilla de la alerta de Notificación que se utilizará para generar la Notificación propiamente dicha

#### Diagrama de flujo

![Use Case - Send Sync Notifications with Delivery Report](./assets/alertRegistration.png)

### Notificaciones de alertas

#### Diagrama de flujo

![Use Case - Send Sync Notifications with Delivery Report](./assets/alertNotification.png)

<!-- Footnotes themselves at the bottom. -->
<!--## Notes

[^1]: Interfaces comunes: [Mojaloop Lista de interfaces comunes](../../commonInterfaces.md)-->
