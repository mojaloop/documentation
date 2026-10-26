---
i18n_source_sha: e056ce135f57c8fd2f1d93ebb3e0129328aa1efd
---

# Metadatos
La naturaleza misma de Mojaloop como un Switch que interconecta DFSP significa que Mojaloop no puede atribuir un significado a la transacción. Sin embargo, las transacciones también tienen la posibilidad de transportar metadatos junto con los detalles del pago, y son estos metadatos los que un esquema de pagos puede utilizar para vincular el pago con transacciones externas a Mojaloop, lo que respalda la interoperabilidad al transportar contexto entre los DFSP. Esto se aplica tanto a una transacción tipo push como a una transacción RTP.

Los metadatos ayudan a describir, contextualizar o gestionar el pago más allá del monto, el remitente y el destinatario. No son estrictamente necesarios para mover dinero, pero son cruciales para la conciliación, la automatización, el cumplimiento normativo y la experiencia del cliente.

En el nivel más simple, esto puede utilizarse, por ejemplo, para vincular un pago a una factura, de modo que pueda reconocerse como el pago de una factura de electricidad. Otro ejemplo sería usarlo para transportar un número de factura junto con un pago en liquidación de una obligación B2B. O podría describir el propósito de un pago, como “Matrícula del 3er trimestre de 2025”, “Salario de junio de 2025” o “Pago de préstamo”.

Cuando estos metadatos están destinados a usarse para la automatización de pagos, este "significado" lo definen el operador del esquema de pagos y los DFSP participantes, no el Hub de Mojaloop. La automatización se implementaría habitualmente como parte de la [personalización del Core Connector en las herramientas de participación](./connectivity.md).

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|16 de julio de 2025| Paul Makin|Primera versión.|