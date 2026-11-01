---
i18n_source_sha: a598ab8afe310b963595a9ba57c0fdb6d655ea9e
---

# Tarifas y reglas tarifarias

Los esquemas de pagos de Mojaloop pueden necesitar admitir varios tipos distintos de tarifas. Estas tarifas pueden calcularse mediante reglas tarifarias comunes, pero no todas representan el mismo tipo de obligación financiera y no necesariamente deberían cobrarse ni liquidarse de la misma manera. Mojaloop distingue entre:

- **Tarifas por transacción al cliente:** tarifas que cobra cualquiera de los dos DFSP por prestar un servicio de pago y que se cobran, según lo acordado durante la transacción, a la parte del débito o a la parte del crédito.
- **Tasas de intercambio:** tarifas que se deben entre los DFSP participantes como consecuencia de las transacciones procesadas a través del esquema de pagos. Las asumen los DFSP y, conforme a las reglas del esquema de pagos, no se recuperan directamente de los clientes.
- **Tarifas del Hub o del operador del esquema de pagos:** tarifas que los DFSP participantes deben al Hub o al operador del esquema de pagos por participar en el servicio o por usarlo.

Por lo tanto, Mojaloop separa tres conceptos relacionados:

**Tarifa:** la regla que determina cómo se calcula un cargo.

**Obligación de tarifa:** el monto que una parte debe a otra después de aplicar la tarifa correspondiente.

**Mecanismo de liquidación:** el medio por el cual esa obligación financiera se extingue finalmente.

Esta separación permite que Mojaloop admita estructuras tarifarias flexibles sin exigir que cada tipo de tarifa se trate como un pago aparte ni se liquide mediante el mismo mecanismo.

## Descripción general

Los tres tipos principales de tarifas se manejan de la siguiente manera:

| Tipo de tarifa | Obligación | Cálculo | Contabilización | Extinción |
|---|---|---|---|---|
| Tarifa por transacción al cliente | Parte del débito o del crédito → DFSP que cobra | Tarifa del DFSP / Acuerdo de términos | Se refleja en los términos acordados de la transacción y la contabilizan los DFSP correspondientes | Se cobra a través de la transacción a la parte del débito o del crédito, incluso cuando esa parte no es cliente del DFSP que cobra |
| Tasa de intercambio | DFSP → DFSP | Tarifa del esquema de pagos / Rules Handler | Cuentas de tasas de intercambio de Mojaloop | Liquidación periódica; la asumen los DFSP y no se recupera directamente de los clientes conforme a las reglas del esquema de pagos |
| Tarifa del Hub o del operador | DFSP → Operador del Hub | Tarifa del esquema de pagos o del operador | Facturación y contabilidad del Hub | Pago al Hub, normalmente iniciado mediante RTP |

El mecanismo de cálculo de la tarifa puede ser común a estos casos de uso. El tratamiento contable y de liquidación es deliberadamente distinto.

# Tarifas por transacción al cliente

Un DFSP puede cobrar una tarifa por transacción por enviar o recibir un pago, o por prestar de otro modo un servicio de pago. La parte a la que se le cobra esa tarifa no tiene que ser cliente del propio DFSP que la cobra. Con sujeción a las reglas del esquema de pagos y a los términos acordados para la transacción, una tarifa que cobre el DFSP pagador o el DFSP beneficiario puede asignarse a la parte del débito o a la parte del crédito y cobrarse a ella.

El proceso de Acuerdo de términos de Mojaloop comunica el monto propuesto de la transacción y las tarifas aplicables antes de que la transacción se autorice. Por lo tanto, la cotización puede expresar tanto qué DFSP cobra una tarifa como si esa tarifa se le cobrará a la parte del débito o a la del crédito. Esto permite incluir en los términos económicos presentados para su acuerdo todos los cargos que afectan al pagador o al beneficiario, independientemente de que la parte que asume una tarifa determinada sea cliente del DFSP que la cobra.

Por ejemplo, en una transferencia de USD 100, una tarifa de USD 1 cobrada por cualquiera de los dos DFSP puede asignarse a la parte del débito. Los términos acordados pueden entonces exigir un débito total de USD 101, conservando el monto de USD 100 acreditado a la parte del crédito. De otro modo, los términos acordados pueden asignar la tarifa a la parte del crédito, lo que reduce el monto entregado a esa parte según lo permitan el esquema de pagos y los términos de la transacción.

Mojaloop admite el cobro de la tarifa acordada como parte del procesamiento de la transacción. Los dos DFSP participantes contabilizan los montos resultantes de modo que el DFSP que cobra reciba su tarifa, incluso cuando la tarifa se le cobre al cliente del otro DFSP. No es necesario ejecutar la tarifa como un pago del cliente aparte ni incluirla como obligación de intercambio en la liquidación del esquema de pagos.

Los cargos de intercambio en los que incurre un DFSP pueden influir en su política general de precios, pero las reglas del esquema de pagos los distinguen de las tarifas por transacción al cliente. Una tasa de intercambio no debe presentarse a un cliente ni recuperarse directamente de él como un cargo de intercambio.

# Tasas de intercambio

Las tasas de intercambio son fundamentalmente distintas de las tarifas por transacción al cliente. Son obligaciones financieras **entre los DFSP participantes** que surgen de las transacciones procesadas a través del esquema de pagos. Los DFSP asumen esas obligaciones. Conforme a las reglas del esquema de pagos, las tasas de intercambio no se le cobran al cliente del débito o del crédito ni se recuperan directamente de él.

Por ejemplo, un esquema de pagos puede definir una tarifa según la cual el DFSP pagador debe al DFSP beneficiario el 0.6% del valor de una clase determinada de pago a comercio. Entonces, para una transacción de USD 100:

- el monto del pago se mantiene en USD 100;
- el cálculo de la tarifa produce una tasa de intercambio de USD 0.60;
- los USD 0.60 crean una obligación financiera del DFSP pagador hacia el DFSP beneficiario; y
- a ninguno de los dos clientes se le cobra directamente la tasa de intercambio de USD 0.60.

La tasa de intercambio no debería exigir que se ejecute un pago aparte de USD 0.60 junto con la transacción original. En cambio, Mojaloop registra la obligación en las cuentas de tasas de intercambio de los participantes.

## Cálculo de la tarifa

Las reglas tarifarias del esquema de pagos pueden implementarse mediante el Rules Handler de Mojaloop. Una regla tarifaria puede tomar en cuenta atributos como:

- el tipo de transacción;
- el valor de la transacción;
- el participante pagador o beneficiario;
- la categoría del participante;
- la moneda;
- el canal de la transacción; u
- otras características de la transacción definidas por el esquema de pagos.

La aplicación de la regla produce un monto de tarifa. Por lo tanto, el Rules Handler determina **cuánto debe un DFSP a otro**. No le cobra a un cliente ni mueve por sí mismo los fondos correspondientes. Conceptualmente:

**Atributos de la transacción → Regla tarifaria → Cálculo de la tarifa → Obligación de intercambio**

## Registro de las obligaciones de intercambio

Cada participante puede tener una cuenta de tasas de intercambio además de sus otras cuentas de Mojaloop. Cuando una transacción se completa, el Hub registra la obligación de intercambio resultante en las cuentas de tasas de intercambio correspondientes.

Por ejemplo, para un pago a comercio de USD 100:

- DFSP pagador → DFSP beneficiario: obligación de pago de USD 100

- DFSP pagador → DFSP beneficiario: obligación de intercambio de USD 0.60

Estas son obligaciones contables separadas entre los DFSP, aunque ambas surjan de la misma transacción. La obligación de intercambio no altera el monto de la transacción acordado con el cliente y no se traslada como un cargo directo al cliente.

Las cuentas de tasas de intercambio permiten que estas obligaciones se acumulen durante un periodo de liquidación en lugar de exigir que cada cargo de intercambio genere un pago adicional.

Por lo tanto, el modelo de procesamiento es:

**Transacción → Rules Handler → Cálculo del intercambio → Cuentas de intercambio → Liquidación**

## Liquidación de las tasas de intercambio

Las cuentas de tasas de intercambio pueden incluirse dentro del modelo de liquidación del esquema de pagos.

En la liquidación, las obligaciones de intercambio acumuladas se incorporan a las posiciones de liquidación de los participantes conforme al modelo de liquidación configurado por el esquema de pagos. Esto permite netear grandes cantidades de tasas de intercambio individuales en lugar de liquidarlas una por una.

Por ejemplo, durante un periodo de liquidación:

- el DFSP A puede deber al DFSP B USD 10,000 en tasas de intercambio;
- el DFSP B puede deber al DFSP A USD 7,000 en tasas de intercambio.

Por lo tanto, la posición neta de intercambio pertinente entre ellos es de USD 3,000 antes de cualquier neteo multilateral adicional que realice el proceso de liquidación.

En consecuencia, el intercambio se trata como una **obligación de libro mayor y de liquidación entre DFSP**, y no como un segundo pago del cliente adjunto a cada transacción.

(**Nota:** esta capacidad puede depender de la implementación de Settlement V3, que actualmente es una tarea pendiente.)

# Tarifas del Hub y del operador del esquema de pagos

Las tarifas del Hub son económicamente distintas de las tasas de intercambio.

Una tasa de intercambio representa una obligación entre participantes. Una tarifa del Hub representa una obligación de un participante hacia la organización que opera el esquema de pagos o el Hub. Los ejemplos pueden incluir:

- cuotas de membresía;
- cuotas de participación mensuales fijas;
- tarifas de procesamiento de transacciones;
- cargos basados en el volumen; u
- otros cargos por servicios del esquema de pagos.

El Hub puede usar reglas tarifarias e información de las transacciones para calcular estos cargos. Sin embargo, esto no exige que las tarifas del Hub se contabilicen ni se liquiden a través de las cuentas de intercambio de los participantes.

## Cálculo de las tarifas del Hub

Una tarifa del Hub podría, por ejemplo, especificar:

**Cargo mensual = USD 500 + (USD 0.002 × transacciones exitosas)**

El Hub puede acumular la información necesaria para calcular el monto que debe cada participante durante el periodo de facturación correspondiente. El monto resultante se convierte en una obligación financiera ordinaria del participante hacia el operador del Hub.

## Cobro de las tarifas del Hub

El modelo recomendado es que el operador del Hub mantenga una cuenta en uno de los DFSP participantes.

Al final del periodo de facturación, el Hub calcula el monto que debe cada participante y emite una solicitud de pago (RTP). Un representante autorizado del participante aprueba el pago y el DFSP lo ejecuta como una transacción ordinaria de Mojaloop.

Conceptualmente:

**Datos de transacciones y actividad → Tarifa del Hub → Factura periódica → RTP → Pago del participante → Cuenta del Hub**

Por lo tanto, el Hub recibe sus tarifas mediante la misma infraestructura de pagos que proporciona a los participantes. El DFSP que recibe el pago lo contabiliza posteriormente a través del proceso normal de liquidación de Mojaloop.

Esto evita exigir que el propio Hub mantenga liquidez de liquidación con el único fin de cobrar tarifas.

# Por qué las tarifas del Hub y las tasas de intercambio son distintas

Es técnicamente posible diseñar un modelo en el que el Hub cobre tanto las tarifas del Hub como las tasas de intercambio y posteriormente redistribuya los montos de intercambio a los participantes. Ese enfoque no se recomienda como el modelo predeterminado de Mojaloop, porque si el Hub cobrara el intercambio de forma centralizada, tendría que:

- recibir los fondos que se deben entre los participantes;
- mantener esos fondos en espera de su distribución;
- mantener liquidez para los pagos salientes;
- efectuar pagos a los participantes; y
- asumir una posición financiera directa en las obligaciones de los participantes.

Esto acercaría al Hub al papel de un intermediario financiero y podría introducir consideraciones operativas, de liquidez, legales y regulatorias adicionales.

Por lo tanto, la arquitectura preferida mantiene al Hub fuera de la relación económica entre los participantes.

**Intercambio:** DFSP → DFSP

**Tarifas del Hub:** DFSP → Hub

El Hub puede calcular y registrar las obligaciones del esquema de pagos y facilitar su liquidación cuando sea necesario, pero no se convierte en parte principal de ellas ni acepta el riesgo crediticio asociado.

# Responsabilidad por las obligaciones de intercambio

El esquema de pagos no debería tomar ninguna posición financiera en las obligaciones de intercambio ni debería garantizarlas. Cada obligación de intercambio sigue siendo responsabilidad del participante que la contrajo hasta que se haya extinguido mediante la liquidación. Por lo tanto, un participante que recibe un monto de intercambio conserva su exposición al participante que lo debe; la obligación no se convierte en un derecho de cobro frente al esquema de pagos ni al Hub.

No obstante, el esquema de pagos puede permitir que las tasas de intercambio se acumulen sin exigir que los participantes las prefondeen. En un modelo así, la ausencia de prefondeo no transfiere la obligación ni su riesgo crediticio al esquema de pagos: el participante deudor sigue siendo plenamente responsable del monto de intercambio y debe fondearlo y extinguirlo cuando venza la liquidación.

Las reglas del esquema de pagos y los controles de riesgo deberían especificar cómo se manejan las obligaciones de intercambio impagas. Esos mecanismos pueden incluir límites a los participantes, monitoreo, procedimientos de incumplimiento y otros controles, pero no deberían convertir al esquema de pagos en parte principal de la obligación ni exigirle cubrir la deuda de un participante con otro.

# Principios arquitectónicos

Por lo tanto, la arquitectura de tarifas de Mojaloop puede resumirse mediante los siete principios siguientes:

**El cálculo de la tarifa es independiente de la liquidación.**  
Una tarifa determina un monto. No determina cómo debe pagarse ese monto.

**La imposición de la tarifa al cliente y su cobro son distintos.**  
Una tarifa por transacción que cobre cualquiera de los dos DFSP puede, mediante el proceso de Acuerdo de términos, asignarse a la parte del débito o a la parte del crédito y cobrarse a ella. Por lo tanto, la parte a la que se le cobra no tiene que ser cliente del propio DFSP que impone la tarifa.

**El intercambio crea obligaciones entre participantes, no cargos a los clientes.**  
Las tasas de intercambio las asumen los DFSP, se registran entre ellos mediante cuentas dedicadas y se extinguen mediante la liquidación. Las reglas del esquema de pagos prohíben su recuperación directa de los clientes.

**Los participantes siguen siendo responsables del intercambio.**  
No es necesario prefondear el intercambio, pero el participante deudor sigue siendo responsable de la obligación hasta la liquidación. El esquema de pagos no garantiza la obligación ni acepta su riesgo crediticio.

**Las tarifas del Hub crean obligaciones hacia el operador del Hub.**  
Estas pueden calcularse periódicamente y pagarse al Hub mediante los mecanismos normales de pago de Mojaloop, incluida la solicitud de pago.

**Una tarifa no requiere necesariamente una transacción de pago.**  
Las tarifas por transacción al cliente pueden cobrarse como parte de la transacción acordada, mientras que los cargos de intercambio pueden acumularse como obligaciones de libro mayor y netearse posteriormente mediante la liquidación.

**El Hub no debería convertirse en un intermediario financiero.**  
Cuando existe una obligación entre dos participantes, Mojaloop debería registrar esa obligación y facilitar su liquidación sin exigir que el Hub cobre y redistribuya los fondos subyacentes, garantice el pago ni tome una posición financiera.

# Resumen

Mojaloop proporciona un marco común para determinar las tarifas y, al mismo tiempo, permite que las distintas obligaciones económicas se manejen de forma adecuada. La arquitectura resultante puede representarse así:

**Tarifas por transacción al cliente**

Parte del débito o del crédito → DFSP que cobra  
*La cobra cualquiera de los dos DFSP, se acuerda antes de la autorización y se cobra a cualquiera de las dos partes a través de la transacción*

**Tasas de intercambio**

DFSP → DFSP  
*Las asumen los DFSP y no se recuperan directamente de los clientes → se calculan a partir de las reglas tarifarias del esquema de pagos → se registran en las cuentas de intercambio → se liquidan periódicamente sin garantía del esquema de pagos; no es necesario exigir prefondeo, pero el participante sigue siendo responsable*

**Tarifas del Hub**

DFSP → Operador del Hub  
*Se calculan a partir de la tarifa del operador → se facturan periódicamente → se pagan mediante RTP*

Esta separación proporciona un marco tarifario flexible y, a la vez, preserva el modelo subyacente de Mojaloop, en el que el Hub facilita la compensación y la liquidación sin convertirse en parte principal de las obligaciones financieras de los participantes, sin aceptar su riesgo crediticio y sin garantizar su extinción.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.02.0) de Mojaloop

## Historial del documento

|Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|2.1|10 de septiembre de 2026|Paul Makin|Se aclaró cómo pueden imponerse y cobrarse las tarifas al cliente; se confirmó que las obligaciones de intercambio las asumen los DFSP y no se recuperan directamente de los clientes; se reemplazaron las garantías del esquema de pagos por la responsabilidad del participante, la ausencia de posición financiera del esquema de pagos y un enfoque sin prefondeo similar al de TIPS|
|2.0|3 de septiembre de 2026|Paul Makin|Se actualizó y amplió tras las conversaciones entre la MLF y los implementadores|
|1.0|17 de julio de 2025|Paul Makin|Versión inicial|
