---
i18n_source_sha: a935f7cc5a0c2612e2624fdc37811156f8b591ed
---

# Mojaloop: Componentes heredados de Hub - PI6

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la versión anterior a PI6: 

![Mojaloop Architecture Overview PI6](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI6.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
