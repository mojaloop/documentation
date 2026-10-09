---
i18n_source_sha: 8d3e910c72bbf2ae0ba11629dd32f05b841a2555
---

# Transacciones de Mojaloop
Esta sección aborda todos los aspectos de una transacción de Mojaloop.

## Fases de una transacción de Mojaloop

Un hub de pagos basado en la plataforma Mojaloop compensa (enruta y garantiza) los pagos entre cuentas mantenidas por partes finales (personas, empresas,
organismos públicos, etc.) en los DFSP, y se integra con un socio de
liquidación para orquestar el movimiento de fondos en la liquidación entre
los DFSP participantes, ya sea de forma simultánea (liquidación bruta continua) o en un momento posterior (diversas formas de liquidación neta), de acuerdo con un calendario de liquidación
acordado.

Todas las transacciones de Mojaloop son asíncronas (para garantizar el uso más eficiente
de los recursos) y avanzan a través de tres fases:

1.  **Descubrimiento,** cuando el DFSP del pagador trabaja con el Hub de Mojaloop para determinar a dónde debe enviarse el pago. Esta fase resuelve un alias a un DFSP beneficiario específico y, en colaboración con ese DFSP, a una cuenta individual.
 &nbsp;
2.  **Acuerdo de términos, o cotización,** cuando los dos DFSP que son parte de la transacción acuerdan que la transacción puede llevarse a cabo (sujeto, por ejemplo, a restricciones relacionadas con el KYC escalonado) y en qué términos (incluidas las tarifas).
 &nbsp;

3.  **Transferencia,** cuando se compensa la transacción entre los dos DFSP (y, por extensión, entre las cuentas de sus clientes).
&nbsp;

Estas fases se complementan con la naturaleza asíncrona de Mojaloop. Una transacción es siempre única, lo que garantiza que solo se procesará una vez, independientemente de cuántas veces se envíe para su procesamiento. Esta cualidad se conoce como idempotencia y garantiza que, incluso si un cliente experimenta una conectividad intermitente, puede estar seguro de que solo se debitará su cuenta una vez, independientemente del número de reintentos.

Este enfoque de tres fases, complementado con la idempotencia, se ha diseñado para minimizar el riesgo de fallas o duplicación de transacciones. En consecuencia, Mojaloop elimina la necesidad técnica de que los DFSP realicen la conciliación de transacciones, reduce la mayoría de las causas de disputas y, con ello, minimiza los costos para todas las partes. 

Junto con el enfoque de Mojaloop respecto a la [Gestión de riesgos](./risk.md), esto garantiza que incluso la institución microfinanciera (MFI) más pequeña y el banco internacional más grande puedan participar en igualdad de condiciones, sin que ninguno imponga riesgo al otro ni al propio Hub.

&nbsp;
## API de Mojaloop

El Hub de Mojaloop admite cuatro API. Las dos primeras se refieren a las transacciones del cliente final, mientras que las dos últimas se refieren a la administración de la relación del Hub con los DFSP participantes y a la liquidación de las transacciones compensadas:

1. **Transactional API**    
Mojaloop ofrece dos API transaccionales funcionalmente equivalentes, cada una de las cuales admite conexiones directas con los participantes con el fin de realizar transacciones. Ambas admiten todos los [**casos de uso de Mojaloop**](./use-cases.md) y se han desarrollado de acuerdo con los [Level One Principles](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/). Estas API son:
    - **FSP Interoperability (FSPIOP) API**, la API consolidada y bien probada;
&nbsp;
    - Un **ISO 20022 Messaging Schema**, que utiliza un conjunto de mensajes ISO 20022 acordado provisionalmente por la Mojaloop Foundation con el ISO 20022 Registration Management Group (RMG), y adaptado a las necesidades de un sistema de pagos instantáneos inclusivo (IIPS) como Mojaloop. Este se ofrece a los adoptantes como alternativa a FSPIOP. Los detalles completos de la implementación de Mojaloop del esquema de mensajería ISO 20022 y de cómo se espera que lo utilicen los DFSP participantes se encuentran en el [**Mojaloop ISO 20022 Market Practice Document**](./iso20022.md).
	
2.  **Third-party Payment Initiation (3PPI/PISP) API**

	Esta API se utiliza para gestionar los acuerdos de pago de terceros - pagos iniciados por fintech en nombre de sus clientes desde cuentas que esos clientes mantienen en DFSP conectados al Hub de Mojaloop. - y para iniciar esos pagos cuando están autorizados.


3.  **Administration API**

	El propósito de la Administration API es permitir que los operadores del Hub gestionen los procesos administrativos relacionados con:

	-   crear/activar/desactivar participantes en el Hub

	-   agregar y actualizar la información de los endpoint de los participantes

	-   gestionar las cuentas, los límites y las posiciones de los participantes

	-   crear cuentas del Hub

	-   realizar operaciones de Funds In y Funds Out

	-   crear/actualizar/consultar modelos de liquidación, para su gestión posterior mediante la Settlement API

	-   obtener los detalles de las transferencias

4.  **Settlement API**

	La Settlement API se utiliza para gestionar el proceso de liquidación. No está pensada para gestionar los modelos de liquidación.

&nbsp;

## Características únicas de las transacciones

La mayoría, si no todas, de las funciones que Mojaloop admite también son ofrecidas por
otros hubs de compensación de pagos. Lo que diferencia a Mojaloop es:

1.  **El flujo de transacción de tres fases y la idempotencia**, descritos anteriormente.   &nbsp;
2.  La fase de **acuerdo de términos, o cotización,** de una transacción,
    que permite a dos DFSP acordar que una transacción puede realizarse *antes* de que se confirme. Esto respalda algunos de los aspectos más complejos de las transacciones entre tipos distintos de participante; un DFSP beneficiario puede verificar que la cuenta del cliente puede recibir el pago, que no ha sido suspendida, o que el pago no infringirá los límites de transacción o de saldo. Si todo eso está en orden, el DFSP beneficiario indicará que puede aceptar la transacción, sujeta a las tarifas que cobrará  (las tarifas del Hub quedan fuera de la transacción misma). Solo si el DFSP pagador, y el pagador mismo, aceptan esos cargos (y cualquier otra condición asociada a los términos devueltos por el DFSP beneficiario) se iniciará entonces la transacción. Esto elimina la incertidumbre y prácticamente garantiza que la transacción se completará con éxito, incluso antes de que ocurra.
   
3.  **El no repudio de extremo a extremo** en la fase de transferencia de la transacción garantiza que cada parte de un mensaje pueda estar segura de que el mensaje no ha sido modificado y de que realmente fue enviado por el originador que se declara. Mojaloop aprovecha esta tecnología subyacente para garantizar que una transacción solo se confirme si *tanto* el DFSP pagador *como* el DFSP beneficiario aceptan que así sea, y ninguna de las partes puede repudiar la transacción. Esto hace innecesaria la conciliación a nivel de transacción, lo que reduce el nivel de transacciones disputadas y elimina el procesamiento de excepciones, y así reduce sustancialmente los costos para todos los participantes. Esto también respalda directamente los objetivos de inclusión financiera de la Mojaloop Foundation, ya que aborda una de las barreras clave para la inclusión: la falta de certeza y, por lo tanto, de confianza en los pagos.

	La comunidad Mojaloop proporciona varias herramientas que los DFSP pueden usar libremente para conectarse a un Hub de Mojaloop. Estas permanecen dentro del dominio del DFSP y no son asunto del operador del hub ni de ninguna otra parte. Además de gestionar la conexión con el Hub y facilitar las transacciones, estas herramientas también garantizan la seguridad de la conexión y, en particular, proporcionan el enlace clave del DFSP con esta capacidad de no repudio.  
	&nbsp;
4.  **La PISP API se pone a disposición a través del Hub de Mojaloop,** no por participantes individuales. En consecuencia, una fintech puede integrarse con el Hub y quedar conectada de inmediato con todos los DFSP conectados, en lugar de tener que completar una integración de API con todos ellos individualmente. Esto reduce sustancialmente los costos y aumenta la confiabilidad para las fintech y sus clientes.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.3|30 de junio de 2025| Paul Makin|Aclaraciones menores en la descripción del acuerdo de términos| 
|1.2|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17|