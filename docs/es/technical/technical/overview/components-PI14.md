---
i18n_source_sha: d4c4e3887b3b046ded1a257ffb737f57f9f2db28
---

# Mojaloop Componentes de corriente del Hub - PI14

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI14:

![Mojaloop Architecture Overview PI14](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI14.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
