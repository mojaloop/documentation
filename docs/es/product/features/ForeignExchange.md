---
i18n_source_sha: 139534f3937e41abf0c7d3b90d8f08a7d1a43d0d
---

# Conversión de divisas

Un aspecto importante de un sistema de pagos moderno es la capacidad de admitir transacciones en más de una moneda; y Mojaloop no es distinto, ya que incorpora soporte para múltiples monedas de transacción. Es un precepto importante que estas monedas operen de forma independiente, de modo que una transacción debitada al deudor en la moneda X siempre se acreditará al acreedor en la moneda X.

A veces, sin embargo, es necesario proporcionar un "puente" entre estas monedas. Esto se facilita mediante una función conocida habitualmente como conversión de divisas, e involucra a un tercero denominado, en la terminología de Mojaloop, Foreign Exchange Provider (FXP). 

Tenga en cuenta que esta función no está necesariamente relacionada con el envío de fondos transfronterizos, ya que existen razones legítimas por las que una persona en una sola jurisdicción podría querer mantener fondos denominados en múltiples monedas, en particular porque hay países en los que circulan habitualmente varias monedas.

El siguiente diagrama muestra cómo Mojaloop implementa esta funcionalidad.

![Conversión de divisas](./FXP.svg)

Actualmente, Mojaloop solo admite un único modelo de negocio para la implementación de una transacción de conversión de divisas. Este modelo implementa el siguiente modelo "El pagador decide".

### El pagador decide

1. Un cliente de DFSP1 desea enviar 10 de la moneda X al beneficiario.
2. El descubrimiento muestra que la cuenta del beneficiario está alojada en el DFSP 2.
3. El DFSP 1 propone la transacción al DFSP 2, que señala que el pago debe reenviarse en la moneda Y.
4. El DFSP 1 envía 10 X al FXP, que reenvía el valor equivalente en la moneda Y al DFSP 2 y paga al beneficiario (menos tarifas, diferencial cambiario, etc.). 

Puede encontrar más detalles sobre la implementación de esta capacidad de FX en la [**documentación de FX**](./fx.md).

Otros modelos de negocio más complejos se admitirán en una próxima versión. Actualmente está previsto que incluyan:

### Múltiples FXP

1. Un cliente de DFSP1 desea enviar 10 de la moneda X al beneficiario.
2. El descubrimiento muestra que la cuenta del beneficiario está alojada en el DFSP 2.
3. El DFSP 1 propone la transacción al DFSP 2, que señala que el pago debe reenviarse en la moneda Y.
4. El DFSP 1 propone la transacción a múltiples FXP, selecciona el que ofrece los términos más beneficiosos y envía 10 X a ese FXP, que reenvía el valor equivalente en la moneda Y al DFSP 2 y paga al beneficiario (menos tarifas, diferencial cambiario, etc.). 

### El beneficiario decide

1. Un cliente de DFSP1 desea enviar 10 de la moneda X al beneficiario.
2. El descubrimiento muestra que la cuenta del beneficiario está alojada en el DFSP 2.
3. El DFSP 1 propone la transacción al DFSP 2, que señala que el pago debería reenviarse en la moneda del pagador, X.
4. El DFSP 1 envía 10 X al DFSP 2
5. El DFSP 2 propone la transacción a múltiples FXP, selecciona el que ofrece los términos más beneficiosos y envía 10 X a ese FXP, que devuelve el valor equivalente en la moneda Y al DFSP 2, que luego paga al beneficiario (menos tarifas, diferencial cambiario, etc.). 

La página siguiente será de interés para quienes deseen revisar cómo se relacionan las capacidades interscheme y de conversión de divisas con las [**transacciones transfronterizas**](./CrossBorder.md).

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|22 de abril de 2025| Paul Makin|Se agregó el historial de versiones|
|1.0|13 de marzo de 2025| Paul Makin|Versión inicial|