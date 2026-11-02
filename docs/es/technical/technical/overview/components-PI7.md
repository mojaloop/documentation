---
i18n_source_sha: f2f59dd8ad5235f7c684e294bb6b5738601596b6
---

# Mojaloop: Componentes heredados de Hub - PI7

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para las versiones anteriores a PI7: 

![Mojaloop Architecture Overview PI7](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI7.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
