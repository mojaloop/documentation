---
i18n_source_sha: 19718d7ae9925c94407e4f4a57ba5210228a27fe
---

# Introducción a Mojaloop 

Mojaloop es software de pagos instantáneos de código abierto que interconecta
instituciones financieras dispares de una manera que promueve la inclusión
financiera y brinda una gestión de riesgos robusta para todos los participantes. Está disponible para que lo use cualquier entidad que desee implementar y operar un esquema de pagos instantáneos inclusivos (IIPS).

## Perspectiva de los reguladores y los operadores
Mojaloop proporciona la base para que un operador establezca un sistema de pagos instantáneos inclusivos (IIPS), y está pensado para integrarse con un socio de liquidación. El socio puede ser el LBTR/RTGS nacional, aunque también se admiten otros mecanismos de liquidación. De esta manera, Mojaloop permite la entrega de un servicio integral de interoperabilidad de pagos a las instituciones financieras (FI) participantes.

Una vez desplegado, Mojaloop permite al operador del esquema de pagos:
- Incorporar, suspender o reactivar las FI participantes según sea necesario;
- Establecer límites de débito neto para cada participante, a fin de gestionar tanto el riesgo como la liquidez;
- Seleccionar y operar el modelo de liquidación que mejor se alinee con los requisitos del esquema de pagos y los nacionales;
- Definir múltiples periodos de liquidación a lo largo del día operativo; el cierre de cada periodo genera un archivo de liquidación (según el modelo elegido) para la acción del socio de liquidación.

El Hub de Mojaloop sustenta estas funciones al:
- Procesar pagos entre las FI deudoras y acreedoras de forma continua 24/7;
- Actualizar la posición de cada participante en tiempo real a medida que se producen los débitos y los créditos;
- Validar cada pago para asegurar que haya liquidez suficiente y el cumplimiento del límite de débito neto del participante, rechazando las transacciones si no se cumplen estas condiciones;
- Actualizar las posiciones de los participantes al final de cada ventana de liquidación para reflejar el valor de los fondos liquidados.

Además, Mojaloop admite un **modelo de participación indirecta**, diseñado para extender el acceso a instituciones financieras más pequeñas — en particular entidades no bancarias como las MFI — que no son elegibles para participar directamente en el LBTR/RTGS nacional. Esto asegura una inclusión amplia dentro del ecosistema de pagos, al tiempo que mantiene la estabilidad financiera.


## Perspectiva técnica

Para brindar el IIPS descrito anteriormente, Mojaloop implementa un conjunto de funciones centrales:

  |Resolución de alias|Compensación|Liquidación|
|:--------------:|:--------------:|:--------------:|
|La **resolución de alias** o de la dirección del beneficiario, que asegura que la institución que mantiene la cuenta – y por lo tanto la cuenta correcta del beneficiario - se identifique de forma confiable|**Compensación** de los pagos de extremo a extremo, con medidas robustas que eliminan cualquier elemento de duda sobre el éxito de una transacción|Orquestación de la **liquidación** de las transacciones compensadas entre instituciones financieras usando un modelo acordado entre esas instituciones, y de acuerdo con un calendario predefinido.|

&nbsp;

Estas funciones centrales se apoyan en algunas [características únicas](./transaction.html#unique-transaction-characteristics), que
en conjunto hacen de Mojaloop un sistema de pagos instantáneos inclusivos de bajo costo:

1.  **Un flujo de transacción de tres fases**, como sigue:
	+  **Descubrimiento,** cuando el DFSP pagador trabaja con el Hub de Mojaloop para determinar a dónde debería enviarse el pago, asegurando así que las transacciones no se dirijan a un destino equivocado. Esta fase resuelve un alias hacia un DFSP beneficiario específico y, en colaboración con ese DFSP, hacia una cuenta individual.

	 + **Acuerdo de términos, o cotización,** cuando los dos DFSP que son parte de la transacción acuerdan que la transacción puede proceder (lo que admite, por ejemplo, restricciones relativas al KYC escalonado), y en qué términos (incluidas las tarifas), **antes** de que cualquiera de ellos se comprometa.

	+  **Transferencia,** cuando la transacción entre los dos DFSP (y por extensión las cuentas de sus clientes) se compensa, y se garantiza que ambas partes tengan la misma visión, en tiempo real, del éxito o el fracaso de la transacción.
&nbsp;

2.  **El no repudio de extremo a extremo** garantiza que cada parte de un mensaje pueda tener la certeza de que el mensaje no ha sido modificado y de que realmente fue enviado por el supuesto originador. Mojaloop aprovecha esta tecnología subyacente para garantizar que una transacción solo se confirme si *tanto* el DFSP pagador *como* el DFSP beneficiario aceptan que así sea, y que ninguna de las partes pueda repudiar la transacción. Naturalmente, también garantiza que ningún tercero pueda modificar la transacción.
3.  **La API PISP se pone a disposición a través del Hub de Mojaloop,** no por los DFSP individuales. En consecuencia, una fintech puede integrarse con el Hub y quedar inmediatamente conectada a **todos** los DFSP conectados. 

**Nota** En términos de Mojaloop, un DFSP - o proveedor de servicios financieros digitales - es un término genérico para cualquier institución financiera, de cualquier tamaño o condición, que pueda transaccionar digitalmente. Se aplica por igual al banco internacional más grande y a la institución microfinanciera o al operador de billetera móvil más pequeños. "DFSP" se usa a lo largo de este documento.   
&nbsp;

# El ecosistema de Mojaloop
## El núcleo
Al leer este documento, es importante comprender la terminología que se usa para identificar a los distintos actores y cómo interactúan. El siguiente diagrama ofrece una visión de alto nivel del ecosistema de Mojaloop.

![Ecosistema de Mojaloop](./ecosystem.svg)

## Servicios superpuestos
Alrededor del núcleo ilustrado en el diagrama anterior hay un conjunto de servicios superpuestos, que también forman parte del paquete completo de código abierto de Mojaloop. Son los siguientes:
- El **Account Lookup Service** (ALS), y una serie de oráculos que el ALS usa en la resolución de alias;
- Un conjunto de **portales**, construidos para usar el Business Operations Framework, que permiten a un operador del Hub interactuar con el Hub de Mojaloop y gestionarlo;
- Un módulo de **Merchant Payments**, que admite el registro de comercios y la emisión de ID del comercio, incluida la generación de códigos QR que pueden escanearse para iniciar una transacción con un comercio;
- El **Testing Toolkit** (TTK), que permite a los ingenieros simular cualquier aspecto del ecosistema central de Mojaloop, para facilitar sus tareas de desarrollo, integración y pruebas;
- Un **Integration Toolkit** (ITK), parte de la biblioteca de [soporte de conectividad](./connectivity.md), que facilita la conexión entre un DFSP y un Hub de Mojaloop;
- **Integración con ISO 8583**, que permite integrar los cajeros automáticos (o un switch de cajeros automáticos) con un Hub de Mojaloop, para retiros de efectivo;
- [**Integración con MOSIP**](https://www.mosip.io), que permite enrutar los pagos hacia una identidad digital basada en MOSIP, en lugar de (por ejemplo) un número de teléfono celular.

## Lista de funcionalidades

Este documento presenta una lista de funcionalidades que abarca los siguientes aspectos de Mojaloop:

-   [**Casos de uso**](./use-cases.md), que describen los casos de uso que admite cada despliegue de Mojaloop.
-   [**Transacciones**](./transaction.md), que describen las API de Mojaloop, cómo se desarrolla una transacción y los aspectos de una transacción de Mojaloop que la hacen singularmente apta para la   implementación de un servicio de pagos instantáneos inclusivos.

-   [**Gestión de riesgos**](./risk.md), que establece las medidas tomadas para asegurar que ningún DFSP que participe en un esquema de pagos de Mojaloop quede expuesto a riesgo de contraparte, y que se proteja la integridad del esquema de pagos en su conjunto.

-  [**Soporte de conectividad**](./connectivity.md), que describe las distintas herramientas y opciones para una incorporación sencilla de los DFSP participantes.

-  [**Portales y funcionalidades operativas**](./product.md), como los portales para la gestión de usuarios y servicios, y la configuración y la operación de un Hub de Mojaloop.
-  [**Tarifas y tarifarios**](./tariffs.md) establece los mecanismos que Mojaloop proporciona para dar soporte a una variedad de modelos tarifarios distintos y las oportunidades para que los participantes y los operadores del Hub cobren tarifas.

-  [**Rendimiento**](./performance.md), que describe en términos generales el rendimiento de procesamiento de transacciones que los adoptantes podrían esperar. 
- [**Despliegue**](./deployment.md), que describe las distintas formas de desplegar Mojaloop para una variedad de propósitos diferentes, y las herramientas que facilitan estos tipos de despliegue. 
- [**Seguridad**](./security.md), que abarca la seguridad de las transacciones entre los DFSP conectados y el Hub de Mojaloop, la seguridad del propio Hub (incluidos los portales del operador) y el QA Framework que se está desarrollando actualmente para validar la seguridad y la calidad de un despliegue de Mojaloop.
- [**Seguridad de la infraestructura de los DFSP**](./dfsp-infrastructure-security.md), que ofrece orientación a los esquemas de pagos que evalúan el hardware y los entornos anfitriones en los que los DFSP ejecutan cargas de trabajo de conectividad, de firma y de gestión de certificados.
- [**Principios de ingeniería**](./engineering.md), como la adhesión algorítmica a la especificación de Mojaloop, la calidad del código, las prácticas de seguridad, los patrones de escalabilidad y rendimiento (entre otros).

-   [**Invariantes**](./invariants.md), que establecen los principios de desarrollo y de operación a los que debe adherirse cualquier implementación de Mojaloop. Esto incluye los principios que aseguran la seguridad y la integridad de un despliegue de Mojaloop.

&nbsp;
## Desarrollo continuo
Ningún software está terminado nunca, y Mojaloop no es la excepción. Siempre hay nuevas funcionalidades que considerar, nuevas API que implementar, nuevos portales que agregar y, por supuesto, siempre hay mantenimiento continuo, y la seguridad exige vigilancia constante.

La hoja de ruta de Mojaloop aborda y prioriza estas necesidades, las ubica en una línea de tiempo y las define como un conjunto de workstreams. Cada uno de estos workstreams tiene un responsable del workstream, encargado de definir, gestionar y entregar el workstream a la Comunidad Mojaloop. El responsable del workstream cuenta con el apoyo de varios colaboradores, que pueden ser ingenieros que ayudan a implementar una funcionalidad, o personas que pueden documentar la funcionalidad, o personas que ayudan a definir los requisitos.

Puede ver el conjunto actual de workstreams y sus últimos informes de estado en la [sección **Desarrollo continuo**](./development.md).

# Acerca de este documento

## Propósito de este documento

Este documento cataloga las funcionalidades de Mojaloop, con independencia de la
implementación. Su propósito es tanto informar a los posibles adoptantes de las funcionalidades que pueden esperar y (cuando corresponda) cómo se espera que funcionen esas funcionalidades, como informar a los desarrolladores de las funcionalidades que deben implementar para que su trabajo sea aceptado como una instancia oficial de Mojaloop.

La Mojaloop Foundation (MLF) define una implementación como una
instancia oficial de Mojaloop si implementa todas las funcionalidades de
Mojaloop, sin excepción, y estas superan el conjunto estándar de pruebas de Mojaloop.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.6|21 de agosto de 2026| Yevhen Kyriukha|Se agregó la guía de seguridad de la infraestructura de los DFSP|
|1.5|4 de diciembre de 2025| Paul Makin|Se agregó la subsección "Desarrollo continuo"|
|1.4|28 de agosto de 2025| Paul Makin|Se agregó la "Perspectiva de los reguladores y los operadores"|
|1.3|23 de junio de 2025| Paul Makin|Se agregó el texto y el diagrama del ecosistema|
|1.2|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17|
