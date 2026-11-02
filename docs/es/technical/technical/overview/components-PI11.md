---
i18n_source_sha: 35b8396579830daed3853f286cb01e88c76ce46d
---

# Mojaloop Hub Current Components - PI11

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI11:

![Mojaloop Architecture Overview PI11](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI11.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
