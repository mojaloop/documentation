---
i18n_source_sha: 45b2203f86b11b55c62e60735121ddff82401ef0
---

# Servicio del procesador central de eventos

El servicio del Procesador Central de Eventos (CEP) permite realizar el monitoreo de un conjunto predefinido o configurado de reglas o patrones de negocio.

En la versión actual, las reglas están configuradas para realizar el monitoreo de tres criterios:

  1. El rebasamiento de un umbral del límite máximo de débito neto (que puede fijarse como parte del proceso de alta),
  2. Ajuste del límite: límite de débito neto,
  3. Ajuste de la posición en función de una Liquidación.

A continuación, el CEP puede integrarse con un servicio de notificaciones para enviar notificaciones o alertas. En este caso, se integra con el servicio de notificaciones por correo electrónico para enviar alertas según los criterios mencionados anteriormente.

![Central Event Processor Architecture](./assets/diagrams/architecture/CEPArchTechOverview.svg)