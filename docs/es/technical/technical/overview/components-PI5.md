---
i18n_source_sha: f54ac4856b09e4e958799ffcfbe2f2fab3409796
---

# Mojaloop: Componentes heredados de Hub - PI5

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI5: 

![Mojaloop Architecture Overview PI5](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI5.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
