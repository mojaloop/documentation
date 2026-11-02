---
i18n_source_sha: 3d18e7facf97f1fad8e5dcde561d15545deeb4bc
---

# Mojaloop. Componentes heredados de Hub - PI8

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI8:

![Mojaloop Architecture Overview PI8](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI8.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
