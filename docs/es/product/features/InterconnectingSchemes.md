---
i18n_source_sha: dd32fd6957650bcd3e27eedf260ffde2d3cefc21
---

# Interconexión de esquemas de pagos

Mojaloop, como despliegue único, está pensado para operar uno (o más) esquemas de pagos, funcionando en una sola plataforma. Por supuesto, es bastante común que un país albergue múltiples esquemas de pagos que operan en plataformas separadas, construidos en torno a requisitos distintos para diferentes sectores. 

En última instancia, sin embargo, a medida que un esquema de pagos crece, crece también la necesidad de estar interconectado o ser interoperable con otros esquemas de pagos del país. Mojaloop da cabida a esto mediante un mecanismo que llamamos "Interscheme".

El enfoque Interscheme de Mojaloop utiliza un tipo especializado de participante DFSP, al que llamamos Proxy. Un Proxy es un DFSP ligero que existe en ambos esquemas de pagos interconectados y tiene las siguientes características:
- El Proxy no realiza ningún procesamiento de mensajes; lo único que hace es pasar mensajes (transacciones) entre los esquemas de pagos conectados;
- Garantizar el no repudio entre esquemas de pagos significa que el proxy no participa en el acuerdo de los términos, lo que ayuda a reducir costos;
- No desempeña ningún papel en la compensación de las transacciones.

La consecuencia de esto es que un Proxy preserva las tres fases de una transferencia de Mojaloop, además de garantizar el no repudio de extremo a extremo. En consecuencia, el acuerdo alcanzado durante una transferencia permanece entre el DFSP originador y el DFSP receptor, sea cual sea el esquema de pagos al que estén conectados.

![Conexión Interscheme simple](./SimpleInterscheme.svg)

Además, el modelo de interconexión de esquemas de pagos de Mojaloop admite el descubrimiento entre esquemas de pagos; en otras palabras, un alias utilizado en un esquema de pagos puede usarse para enrutar un pago desde otro.

La versión actual de Mojaloop solo admite la interconexión de esquemas de pagos basados en Mojaloop. Continúa el trabajo para ampliar esto y dar soporte a otros esquemas de pagos conectados a un esquema de pagos basado en Mojaloop.

Puede encontrar más detalles sobre la implementación de esta capacidad de interconexión de esquemas de pagos en la [**documentación de Interscheme**](./interscheme.md).

Las páginas siguientes serán de interés para quienes deseen revisar cómo se relacionan las capacidades interscheme con la [**conversión de divisas**](./ForeignExchange.md) y las [**transacciones transfronterizas**](./CrossBorder.md).

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22 de abril de 2025| Paul Makin|Se agregó el historial de versiones; se aclaró parte de la redacción|
|1.0|14 de abril de 2025| Paul Makin|Versión inicial|