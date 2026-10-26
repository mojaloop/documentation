---
i18n_source_sha: 5f28f7fe3d95103b9df364da49686ccdab781f2d
---

# Conceptos básicos

Esta sección reúne los conceptos y elementos clave del proceso de gestión de la liquidación.

## Cobertura de liquidez

Como se describe en la [Introducción](settlement-management-introduction.md), una de las características de un sistema de pagos en tiempo real es que los DFSP acreedores deben entregar los fondos a sus clientes antes de que el DFSP deudor se los reembolse. Para mitigar el riesgo de que un DFSP acreedor no reciba los fondos que se le deben, Mojaloop exige que los DFSP deudores aporten evidencia creíble de que tienen fondos suficientes y disponibles para cumplir las obligaciones que contraen como consecuencia de transaccionar en el sistema.

Esa evidencia creíble se llama *cobertura de liquidez*. El sistema Mojaloop no estipula qué formas debería adoptar y, para un DFSP dado, puede adoptar varias. Podría ser:

- fondos depositados en una cuenta sobre la que el Hub de Mojaloop tenga algún control
- una línea de crédito de otra institución financiera
- una garantía de algún otro tipo

Sin embargo, cualquier cobertura de liquidez que se use en un esquema de pagos de Mojaloop debe tener las siguientes características:

- Debe poder convertirse en pagos de liquidación *de inmediato* cuando lo solicite el esquema de pagos de Mojaloop.
- Debe estar acreditada por evidencia fiable en poder del esquema de pagos de Mojaloop.
- El DFSP no debe poder convertirla en otras formas (por ejemplo, retirando fondos de una cuenta bancaria o disponiendo de fondos de una línea de crédito) sin el conocimiento y la aprobación previos del esquema de pagos de Mojaloop.

La cobertura de liquidez atribuida a un DFSP dado es cobertura de liquidez para un modelo de liquidación y una moneda dados, y es atribuible al esquema de pagos en su conjunto. Es decir, Mojaloop no permite que los participantes mantengan cobertura de liquidez aplicable únicamente a sus transferencias con un DFSP concreto o con varios DFSP concretos.

Cuando un DFSP pide al Hub de Mojaloop que haga una transferencia, el Hub de Mojaloop comprueba que el DFSP deudor tenga cobertura de liquidez suficiente para garantizar que la transferencia pueda liquidarse si se completa con éxito. Lo hace comparando el total de fondos disponibles del DFSP con la suma de los siguientes elementos:

1. La suma de las transferencias que se han completado pero aún no se han liquidado, y en las que el DFSP es *la parte acreedora o la parte deudora*.
1. La suma de las transferencias que se han iniciado pero aún no se han completado, y en las que el DFSP es la parte deudora.
1. El monto de la transferencia propuesta.

Si el total de estos tres elementos es mayor que el monto de fondos disponibles del DFSP deudor, el Hub de Mojaloop rechazará la transferencia. Tenga en cuenta que, en esta configuración, la liquidez de un DFSP se acredita con el efecto de las transferencias en las que es beneficiario en cuanto la transferencia se completa, sin necesidad de esperar a que los fondos se liquiden. Mojaloop hace esto para mantener al mínimo la cantidad de liquidez que los participantes deben mantener.

## Modelo de liquidación

Distintos esquemas de pagos querrán liquidar fondos entre sus participantes de distintas maneras. Dependerá de quién opere el esquema de pagos, de cuánto tráfico pase por él y de muchas otras variables.

Mojaloop está diseñado para admitir las formas estándar del sector de liquidar entre participantes. Son las siguientes:

- Liquidación neta diferida multilateral
- Liquidación neta diferida bilateral
- Liquidación bruta inmediata

El significado de los términos que componen estos tipos de liquidación es el siguiente.

Las liquidaciones son *netas diferidas* si varias transferencias se liquidan juntas. Las liquidaciones netas (en las que varias transferencias se liquidan juntas) son por definición diferidas (ya que construir un lote lleva tiempo.)

Las liquidaciones son *brutas* si cada transferencia se liquida por separado. Las liquidaciones brutas pueden ser inmediatas o diferidas. Son *diferidas* si se requiere una aprobación de liquidación externa al Hub, e *inmediatas* si el Hub puede proceder a liquidar una transferencia sin requerir ninguna aprobación externa. Por ahora, Mojaloop solo admite liquidaciones brutas inmediatas.

Las liquidaciones son *bilaterales* si cada par de participantes liquida entre sí el neto de todas las transferencias que hay entre ellos. Las liquidaciones son *multilaterales* si cada participante liquida con el Hub el neto de todas las transferencias en las que ha sido parte, sea quien sea la otra parte.

Un modelo de liquidación especifica una forma en la que un Hub de Mojaloop liquidará un conjunto de transferencias. En el caso simple, hay un único modelo de liquidación y este liquida todas las transferencias que procesa el Hub. Sin embargo, Mojaloop admite más de un modelo de liquidación para un mismo esquema de pagos. Esto permite, por ejemplo, que un esquema de pagos defina modelos de liquidación distintos para monedas distintas, o para tipos de cuenta del libro mayor distintos.

Si un esquema de pagos define más de un modelo de liquidación, es responsabilidad del esquema de pagos asegurar que una transferencia dada solo pueda pertenecer a un único modelo de liquidación. Por ejemplo, suponga que un esquema de pagos define un modelo de liquidación para todas las transferencias que requieren conversión de divisas (definidas como: todas las transferencias en las que la moneda de origen y la de destino son distintas entre sí), y también un modelo de liquidación para todas las transferencias en las que la moneda de origen es el chelín keniano (KES). En ese caso, una transferencia que convirtiera de chelines kenianos a rands sudafricanos podría pertenecer potencialmente a ambos modelos.

## Ventana de liquidación

Cada transferencia que se completa en el Hub se asigna a la ventana de liquidación abierta en ese momento. La ventana de liquidación es una forma de agrupar transferencias. La asignación de transferencias a una ventana de liquidación se produce con independencia de los modelos de liquidación que se usen para liquidarlas. Esto significa que, si un esquema de pagos ha definido más de un modelo de liquidación, las transferencias que pertenecen a los distintos modelos de liquidación compartirán una ventana de liquidación.

No hay una forma determinista de asignar transferencias a una ventana de liquidación concreta. Cuando un administrador del esquema de pagos crea una ventana de liquidación nueva, no hay forma de saber de antemano qué transferencias se asignarán a la ventana de liquidación nueva y cuáles a la antigua.

Una ventana de liquidación puede tener los siguientes estados:

* `OPEN`: la ventana de liquidación está abierta y se están aceptando transferencias en la ventana abierta actual.
* `CLOSED`: la ventana de liquidación está cerrada. No acepta transferencias adicionales y todas las transferencias nuevas se están asignando a una ventana de liquidación nueva y abierta.
* `PENDING_SETTLEMENT`: la ventana de liquidación está cerrada, se han calculado las [Posiciones de Liquidación Neta Multilateral](#posicion-de-liquidacion-neta-multilateral) de cada DFSP, pero la liquidación con el banco liquidador asociado aún no se ha producido. 
* `SETTLED`: el banco liquidador ha confirmado que todos los DFSP participantes que hicieron transferencias en la ventana de liquidación han liquidado sus pagos, y el Operador del Hub ha liquidado la ventana.

Cerrar una ventana de liquidación abre automáticamente la siguiente.

### Liquidaciones y ventanas de liquidación

Un Administrador del Hub puede solicitar liquidaciones para un modelo de liquidación dado y para una o varias ventanas de liquidación.

Si un esquema de pagos solo tiene un modelo de liquidación, liquidar las transferencias de ese modelo en una ventana de liquidación dada liquidará todas las transferencias de esa ventana. Si, en cambio, un esquema de pagos ha definido más de un modelo de liquidación, liquidar las transferencias que pertenecen a un modelo de liquidación concreto para una ventana de liquidación dada significará que algunas de las transferencias de esa ventana se han liquidado y otras no.

Es especialmente importante entender las implicaciones de esto cuando se ha definido un modelo de liquidación Bruta Inmediata. En ese caso, las transferencias individuales se liquidarán en cuanto se hayan completado. Si el esquema de pagos solo tiene un modelo de liquidación Bruta Inmediata, todas las transferencias se liquidarán a medida que se completen, y la ventana de liquidación pasará a ser irrelevante. Si, en cambio, el esquema de pagos mezcla modelos de liquidación Bruta y Neta, o si ha definido más de un modelo de liquidación Neta, es posible que una ventana de liquidación dada contenga algunas transferencias liquidadas y otras no liquidadas; y, en el caso de las transferencias que se liquidan con un modelo de liquidación Bruta, que aparezcan transferencias ya liquidadas incluso en una ventana de liquidación abierta en ese momento. Esto crea posibles complicaciones a la hora de definir el estado global de una ventana de liquidación.

Mojaloop resuelve esta situación asignando siempre a la ventana de liquidación un estado que es el estado mínimo de las transferencias que contiene. El *estado mínimo* se define por la secuencia de estados de la ventana de liquidación que se indica arriba. Así, por ejemplo, si una ventana de liquidación contiene transferencias que ya se han liquidado (porque se liquidan en Bruto) y otras transferencias cuyo proceso de liquidación aún no ha empezado, el estado de la ventana de liquidación será `OPEN`. Si una ventana de liquidación se ha cerrado y contiene transferencias que pertenecen a dos modelos de liquidación distintos, uno de los cuales se está liquidando (y cuyo estado es por tanto `PENDING_SETTLEMENT`) y el otro no (y cuyo estado es por tanto `CLOSED`,) el estado global de la ventana de liquidación será `CLOSED`.

## Gestión de la liquidez (Límite de débito neto)

Como se ha descrito arriba, Mojaloop exige que los participantes prefinancien las transferencias en las que son la parte deudora aportando al Hub de Mojaloop evidencia creíble de que pueden cubrir todas sus exigencias de liquidación actuales. Sin embargo, puede haber circunstancias en las que un participante no quiera que toda su cobertura de liquidez se use como cobertura de transferencias. Por ejemplo, un participante podría ser receptor en un canal de remesas y, por tanto, acreedor neto global; o un participante podría depositar fondos adicionales para cubrir los periodos en los que sus cuentas no están abiertas para recibir fondos.

Para contemplar estas posibilidades, Mojaloop permite que los participantes o los Administradores del Hub reserven parte de su cobertura de liquidez disponible, de modo que solo una parte de ella pueda usarse para dar cobertura de liquidez a las transferencias. Esto se llama Límite de débito neto (NDC). El NDC actúa como un límite o tope sobre los fondos de un DFSP disponibles para transaccionar, y nunca puede superar el saldo de la cuenta de liquidez. Esto es necesario para asegurar que los pasivos de un DFSP puedan cubrirse con fondos inmediatamente disponibles para el banco liquidador.

Al calcular si una transferencia está cubierta o no por la liquidez disponible, el Hub tendrá en cuenta cualquier restricción sobre el monto de fondos disponibles que especifique el Límite de débito neto.

## Posición

La Posición de un DFSP refleja el total de obligaciones sin liquidar de un DFSP para un modelo de liquidación dado en un momento dado: es decir, el monto de fondos que un DFSP tendrá que liquidar finalmente con el esquema de pagos. La Posición de un DFSP para un modelo de liquidación dado es el neto de los siguientes elementos:

1. Todas las transferencias completadas pero sin liquidar que pertenecen al modelo de liquidación y en las que el DFSP es la parte deudora.
2. Todas las transferencias completadas pero sin liquidar que pertenecen al modelo de liquidación y en las que el DFSP es la parte acreedora.
3. Todas las transferencias que se han solicitado pero aún no se han completado, que pertenecen al modelo de liquidación y en las que el DFSP es la parte deudora.

Para el DFSP Pagador, esta suma total incluye los montos de transferencia que están pendientes y aún no se han completado. Tenga en cuenta que si se produce una cancelación o un vencimiento, las transferencias afectadas no se completarán y se eliminará la reserva de esa transferencia.

La Posición es la posición total de todas las ventanas de liquidación que aún no se han liquidado. El monto de la posición de un participante solo cambia cuando se liquidan algunas de las transferencias que la componen.

## Posiciones de Liquidación Neta

Como se ha descrito arriba, una liquidación neta diferida puede ser multilateral o bilateral. Cuando un Administrador del Hub solicita una liquidación, el Hub calculará cuánto debe cada participante, o cuánto se le debe, como consecuencia de las transacciones que se van a liquidar. Las transacciones que se van a liquidar se definen como todas las transacciones que:

- Pertenecen a la ventana o las ventanas de liquidación que se van a liquidar.
- Pertenecen al modelo de liquidación que se está liquidando.

Si la liquidación es *multilateral*, un DFSP recibirá una sola cifra como monto que debe, o que se le debe, como consecuencia de la liquidación. Esa cifra es el neto de todas las transacciones que se van a liquidar.

Si la liquidación es *bilateral*, un DFSP puede recibir varias cifras como monto que debe, o que se le debe, como consecuencia de la liquidación. Cada cifra representa el neto de las transacciones del DFSP con un DFSP concreto. El neto de todos esos valores será igual a la cifra global que debería, o que se le debería, en una liquidación neta multilateral.

## Informes de liquidación

Para facilitar la conciliación y la liquidación de los DFSP en el banco liquidador, el Hub proporciona varios informes de liquidación. Un Esquema de pagos puede optar por tener varios informes distintos para distintos fines. A continuación se dan algunos ejemplos:

* Informe de Liquidación del DFSP: un informe que se emite a un DFSP cuando se ha iniciado la liquidación. Proporciona la posición de liquidación bilateral del DFSP con cada DFSP con el que haya transaccionado (como DFSP Pagador o como DFSP Beneficiario) en la ventana o las ventanas de liquidación que se están liquidando. También proporciona la Posición de Liquidación Neta Multilateral del DFSP (la suma total de los montos de transferencia enviados y recibidos por el DFSP en la ventana o las ventanas de liquidación).
* Informe del Banco Liquidador: un informe que se emite al banco liquidador cuando se ha iniciado la liquidación. Proporciona la posición de liquidación bilateral de cada DFSP frente a todos los demás DFSP que transaccionaron en la ventana o las ventanas de liquidación que se están liquidando. También proporciona la Posición de Liquidación Neta Multilateral de cada DFSP (la suma total de los montos de transferencia enviados y recibidos por el DFSP).
* Informe de Resultado de Liquidación del DFSP: un informe que se emite a un DFSP cuando la liquidación se ha finalizado. Proporciona detalles sobre el saldo de la cuenta de liquidez del DFSP y sobre los movimientos de dinero derivados del cierre de la ventana de liquidación.

## Finance Portal

El [Finance Portal](busops-portal-introduction.md) (al que se suele llamar "Finance Portal v2") es un portal web que usa el Operador del Hub para gestionar a diario los procesos relacionados con la liquidación. El portal ofrece funcionalidad para:

* monitorear detalles como el saldo, la [Posición](#posicion) y el [Límite de débito neto](#gestion-de-la-liquidez-limite-de-debito-neto) de los DFSP
* actualizar el [Límite de débito neto](#gestion-de-la-liquidez-limite-de-debito-neto) de un DFSP
* gestionar las ventanas de liquidación
<!--* descargar informes-->
* registrar los depósitos en las cuentas de liquidez de los DFSP o los retiros de ellas

::: tip NOTA
Por ahora, el Finance Portal solo admite procesos de liquidación que se basan en el modelo de Liquidación Neta Diferida.
:::
