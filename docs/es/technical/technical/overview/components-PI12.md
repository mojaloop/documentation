---
i18n_source_sha: d90d82eb9335667b15d0da185963c5a45edacd10
---

# Mojaloop Hub Current Components - PI12

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI12:

![Mojaloop Architecture Overview PI12](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI12.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
