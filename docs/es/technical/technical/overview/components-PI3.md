---
i18n_source_sha: a3cb1b68663aba4d23decb2491bac62baef91724
---

# Mojaloop. Componentes heredados de Hub - PI3

El siguiente diagrama de componentes muestra el desglose de los servicios «Mojaloop» y su arquitectura de microservicios para la fase previa a PI3: 

![Mojaloop Architecture Overview PI5](./assets/diagrams/architecture/Arch-Mojaloop-overview-PI3.svg)

_Nota: La codificación por colores indica la relación entre el almacén de datos y las interconexiones de transmisión de mensajes o adaptadores. Por ejemplo, el `Central-Services` utiliza el `MySQL` como almacén de datos y recurre al `Kafka` para la transmisión de mensajes_
