---
syncRef: 023dd70c4103948a435dfd00c9f334b6a08bca99
---

# Invariantes de Mojaloop

Los siguientes invariantes se han establecido a lo largo del desarrollo de la plataforma y a partir de los requisitos técnicos deducidos de los [principios del Level One Project](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/) y de las mejores prácticas aplicables del sector.
Estos invariantes deberían guiar cualquier debate de diseño de producto y técnico relacionado con la arquitectura de la plataforma.

## Principios generales

### 1. La función principal de la plataforma es compensar pagos de crédito tipo push en tiempo real y facilitar la liquidación periódica, antes del final del día de valor.
#### Notas:
1. La plataforma permite que los participantes compensen fondos de inmediato hacia sus clientes manteniendo al mínimo los riesgos y costos asociados.
2. La plataforma admite comprobaciones de liquidez disponible por transferencia cuando hacen falta para respaldar el primer objetivo.
3. El Hub está optimizado para la ruta crítica.
4. Liquidación automatizada intradía, configurada por esquema de pagos y por implementación usando los modelos de liquidación recomendados para las infraestructuras del mercado financiero.


### 2. El Hub admite el procesamiento directo totalmente automático.
#### Notas:
1. "Procesamiento directo" significa que no deberían hacer falta intervenciones manuales en la ejecución de pagos ni de liquidaciones, salvo cuando se requiera la aceptación de los términos de un pago por parte de un usuario final, conforme a los principios de Level One
2. El procesamiento directo ayuda a reducir los errores humanos en el proceso de transferencia, lo que en última instancia reduce los costos.
3. La naturaleza automatizada del procesamiento directo lleva a transferencias de valor más rápidas entre los clientes finales.

Más información aquí: [Definición de procesamiento directo](https://www.investopedia.com/terms/s/straightthroughprocessing.asp)


### 3. El Hub no requiere conciliación manual, ya que el protocolo de interacción con el Hub garantiza resultados deterministas.
#### Notas:
1. Cuando una transferencia se finaliza, no puede haber duda sobre el estado de esa transferencia (o bien no está finalizada y se da aviso activo a los participantes. El aviso a los participantes es bajo demanda: si preguntan, se les informa de que el estado es indeterminado).
2. El Hub garantiza resultados deterministas para las transferencias y todos los participantes lo aceptan como la autoridad final sobre el estado de las transferencias.
3. El determinismo significa que las transferencias individuales son rastreables y auditables (según límites y restricciones), con un resultado final entregado dentro de un límite de tiempo garantizado.
4. Para evitar dudas, las transferencias masivas se procesan línea por línea, con resultados deterministas potencialmente distintos para cada una.


### 4. La lógica de configuración de la transacción, que es específica de cada caso de uso, está separada de la transferencia de dinero libre de políticas.
#### Notas:
1. Los detalles de la transacción y las reglas de negocio deberían recogerse y aplicarse entre las contrapartes antes de la fase de acuerdo de los términos y quedan fuera del alcance de Mojaloop.
2. La fase de acuerdo establece un objeto de transacción firmado y específico del caso de uso que incorpora todos los detalles específicos de la transacción.
3. La fase de transferencia orquesta la transferencia de valor minorista entre instituciones en beneficio de las contrapartes (es decir, solo se aplican comprobaciones de límites del sistema) y sin referencia a los detalles de la transacción.
4. No hay procesamiento adicional específico de la transacción durante la fase de transferencia.


### 5. El Hub no analiza ni actúa sobre los detalles de la transacción de extremo a extremo; los mensajes de transferencia contienen solo los valores necesarios para completar la compensación y la liquidación.
#### Notas:
1. Las comprobaciones y validaciones durante el paso de transferencia son solo para la conformidad con las reglas del esquema de pagos, las comprobaciones de límites, la autenticación de firmas y la validación de la condición de pago y de su fulfilment.
2. Las transferencias que se comprometen para liquidación son firmes y está garantizado que se liquidarán conforme a las reglas del esquema de pagos.


### 6. La semántica de la transferencia de crédito tipo push se reduce a su forma más simple y se estandariza para todos los tipos de transacción.
#### Notas:
1. Simplifica la implementación y la integración de los participantes, ya que muchos tipos de transacción y casos de uso pueden reutilizar el mismo flujo de mensajes de transferencia de valor subyacente.
2. Aparta la complejidad del caso de uso de la ruta crítica.


### 7. Un hub de servicios de API basado en Internet no es un “conmutador de mensajes”.
#### Notas:
1. El hub de servicios ofrece servicios de API en tiempo real para que los participantes puedan admitir transferencias instantáneas minoristas de crédito tipo push.
    1.  Servicios de API como la resolución de direcciones, el acuerdo de la transacción entre participantes, el envío de transferencias preparadas y el envío del aviso de fulfilment.
2. Se ofrecen servicios de API auxiliares para los participantes con el fin de dar soporte a la incorporación, la gestión de posiciones, los informes para conciliación y otras funciones no de tiempo real no asociadas al procesamiento de transferencias.
3. Todos los mensajes se validan para comprobar su conformidad con la especificación de la API; los mensajes no conformes se rechazan activamente con un código de motivo estandarizado e interpretable por máquina.


### 8. El Hub expone interfaces asíncronas a los participantes
#### Notas:
1. Para maximizar el rendimiento del sistema.
2. Para aislar los problemas de conectividad de los nodos hoja de forma que no afecten a otros usuarios finales.
3. Para permitir que el sistema del Hub procese las solicitudes en su propio orden de prioridad y sin mantener una conexión activa por transferencia.
4. Para gestionar numerosos procesos concurrentes de larga duración mediante agrupación y balanceo de carga internos.
5. Para disponer de un único mecanismo de gestión de solicitudes (por ejemplo, transacciones masivas o que necesitan entrada del usuario final o que abarcan varios saltos).
6. Para dar mejor soporte a las redes del mundo real, ya que los problemas de velocidad y fiabilidad de la conexión de un participante deberían tener un impacto mínimo en otros participantes o en la disponibilidad del sistema en general.

### 9. La API de transferencia es [idempotente](https://docs.mojaloop.io/api/fspiop/v1.1/api-definition.html#idempotent-services-in-server)
#### Notas:
1. Esto asegura que los originadores de mensajes puedan hacer solicitudes duplicadas de forma segura en condiciones de conectividad de red degradada.
    1. Las solicitudes duplicadas se reconocen y dan el mismo resultado (duplicados válidos) o se rechazan como duplicadas (cuando la especificación no lo permite) haciendo referencia a la original.


### 10. Los registros de transferencias **_finalizadas_** se conservan durante un período configurable por el esquema de pagos, para dar soporte a procesos del esquema de pagos como la conciliación y la facturación, y con fines forenses
#### Notas:
1. No es posible consultar el "subestado" de una transferencia en curso; la API ofrece un resultado determinista con aviso activo dentro del tiempo de servicio garantizado.


### 11. Los registros de las transferencias finalizadas se conservan indefinidamente en almacenamiento a largo plazo para dar soporte al análisis de negocio por parte del operador del esquema de pagos y de los participantes (a través de las interfaces apropiadas)
#### Notas:
1. La disponibilidad de los registros de transferencias puede ir por detrás de la firmeza del proceso en línea, para acomodar la separación entre el mantenimiento de registros y el procesamiento en tiempo real de las solicitudes de transferencia.


### 12. El Hub debería hacer el mínimo análisis, almacenamiento y procesamiento de mensajes necesario para ejecutar los servicios que presta al esquema de pagos en su conjunto.
#### Notas:
1. En algunos flujos de mensajes, p. ej. la búsqueda de parte, puede ser deseable que los participantes tengan un único punto de contacto para el enrutamiento de los mensajes relacionados con el esquema de pagos, incluso cuando los mensajes no van dirigidos al Hub ni requieren inspección u otro procesamiento.


## Seguridad y protección de las API

### 13. Los mensajes de la API son confidenciales, con evidencia de manipulación y no repudiables.
#### Notas:
1. La confidencialidad es necesaria para proteger la privacidad de los participantes y de sus clientes.
    1. Hay requisitos legales en muchos dominios regulatorios donde se espera que opere Mojaloop y, por tanto, el Hub debe emplear las mejores prácticas para asegurar que se protege la privacidad de los participantes y de sus clientes.
2. Se necesitan mecanismos de integridad con evidencia de manipulación para asegurar que los mensajes no se puedan alterar en tránsito.
    1. Para asegurar la integridad del sistema en su conjunto, cada receptor de un mensaje debería poder saber de forma independiente, con un alto grado de confianza, que el mensaje no fue alterado en tránsito.
    2. La criptografía de clave pública (la firma digital) proporciona el mejor mecanismo conocido actualmente para una mensajería con evidencia de manipulación
        1. La seguridad de la clave privada del remitente es crítica.
        2. Deben establecerse reglas del esquema de pagos que aclaren las responsabilidades de la gestión de claves y la posible responsabilidad financiera en caso de que se comprometa una clave privada.
3. El no repudio es necesario para asegurar que el mensaje fue enviado por la parte que dice haberlo enviado y que el remitente no pueda repudiar su procedencia.
    1. Esto es importante para determinar la parte responsable durante los procesos de auditoría y de resolución de disputas.


### 14. Los mensajes de la API se autentican al recibirlos, antes de su aceptación o de cualquier procesamiento posterior
#### Notas:
1. La autenticación da un grado de confianza de que el mensaje fue enviado por la parte que dice haberlo enviado.
2. La autenticación da un grado de confianza de que el mensaje no fue enviado por una parte no autorizada.


### 15. Los mensajes autenticados no se acusan como aceptados hasta que se registran de forma segura en almacenamiento permanente.
#### Notas:
1. La API de Mojaloop asigna un significado de negocio importante, relacionado con el esquema de pagos, a determinados códigos de respuesta HTTP en varios puntos de los flujos de transacción:
    1. Ciertas respuestas HTTP, p. ej. "202 Accepted", están pensadas para dar garantías financieras a los participantes y, por tanto, solo deben enviarse una vez que la entidad receptora está segura de que ha dejado registros seguros y permanentes que sirven para:
        1. Facilitar la recuperación de todo el sistema a un estado coherente tras los fallos de uno o varios componentes o entidades distribuidos.
        2. Procesos de liquidación exactos
        3. Procesos de auditoría y de resolución de disputas
    2. Por ejemplo, un "200 OK" del Hub al participante beneficiario al recibir un mensaje de fulfilment de transferencia indica una garantía de liquidación de la transacción al beneficiario, pendiente de las comprobaciones de validación.
2. La API de Mojaloop está diseñada para operar de forma segura en condiciones de red imperfectas y, por tanto, tiene soporte integrado para reintentos y sincronización de estado entre participantes.


### 16. Tres niveles de seguridad de la comunicación para asegurar la integridad, la confidencialidad y el no repudio de los mensajes entre un servidor de API y un cliente de API.
#### Notas:
1. Conexiones seguras: se requiere mTLS para todas las comunicaciones entre el esquema de pagos y los participantes autorizados.
    1. Asegura que las comunicaciones sean confidenciales, entre corresponsales conocidos, y que estén protegidas frente a manipulaciones.
2. Mensajes seguros: el contenido de los mensajes JSON se firma criptográficamente conforme a la especificación JWS.
    1. Asegura a los receptores que los mensajes fueron enviados por la parte que dice haberlos enviado y que el remitente no puede repudiar su procedencia.
3. Términos de transferencia seguros: Interledger Protocol (ILP) entre los participantes pagador y beneficiario.
    1. Protege la integridad de la condición de pago y de su fulfilment.
    2. Limita el tiempo durante el cual una instrucción de transferencia es válida.


### 17. Para asegurar que el sistema sea aritméticamente coherente, solo se usa aritmética de punto fijo.
#### Notas:
1. Para evitar dudas, los cálculos de punto flotante pueden perder exactitud y no deben usarse en ningún cálculo financiero.
2. Consulte la representación y las formas del [tipo decimal de Level One](https://docs.mojaloop.io/documentation/discussions/decimal.html).
    1. Esta especificación permite el intercambio fluido con sistemas financieros basados en XML sin pérdida de precisión ni de exactitud


## Características operativas

Mojaloop está diseñado para funcionar como parte de un sistema de pagos instantáneos jurisdiccional. Por tanto, debe cumplir de forma demostrable los estándares de rendimiento y resiliencia que se exigen a esos sistemas.


### 1. El sistema de referencia, demostrado en hardware mínimo, admite la compensación de 1.000 transferencias por segundo, sostenidas durante una hora, sin que más del 1% (de la etapa de transferencia) tarde más de 1 segundo en pasar por el Hub.
#### Notas:
1. Esta medición incluye todos los componentes de hardware y software necesarios, con seguridad y persistencia de datos de nivel de producción.
2. Esta medición incluye las tres etapas de la transferencia: descubrimiento, acuerdo y transferencia.
3. Esta medición no incluye ninguna latencia introducida por los participantes.
4. Un período de una hora es una aproximación razonable de un pico de demanda para un sistema nacional de pagos.
5. El costo de escalar la capacidad debería ser menor por unidad de capacidad que el costo del aprovisionamiento inicial.
6. 1000 transferencias (compensación) por segundo es un punto de partida razonable para un sistema nacional de pagos.
7. Que el 1% de las transferencias (compensación) tarde más de 1 segundo es un punto de partida razonable para un sistema nacional de pagos.
8. Los esquemas de pagos de Mojaloop deberían poder empezar con un costo razonable, para una infraestructura financiera nacional, y escalar de forma económica a medida que crece la demanda.


### 2. El Hub tiene alta disponibilidad y es resiliente ante los fallos.
#### Notas:
1. Definición de "alta disponibilidad":
   1. En este caso definimos el término "_alta disponibilidad_" como "_la capacidad de proporcionar y mantener un nivel de servicio aceptable frente a fallos y desafíos al funcionamiento normal._"
   2. Aunque los esquemas de pagos pueden determinar su propia definición de lo que constituye un "_nivel de servicio aceptable_", Mojaloop toma ciertas decisiones de compromiso que contribuyen a ello:
      1. Cuando los modos de fallo lo permiten, el servicio se degrada en toda la población de participantes en lugar de que participantes concretos sufran cortes totales mientras otros siguen operativos.
2. El Hub no tiene ningún punto único de fallo, lo que significa que sigue funcionando con una degradación mínima del servicio si falla cualquier componente individual.
   1. Se despliegan varias instancias activas de cada componente de forma distribuida detrás de balanceadores de carga.
   2. Cada instancia activa de un componente puede gestionar solicitudes de cualquier cliente o participante, lo que significa que ningún participante pierde la capacidad de transaccionar si falla cualquier componente individual.
3. Con la infraestructura apropiada para operar, el software de Mojaloop se puede desplegar en configuraciones de varios centros de datos distribuidos geográficamente, en activo:activo o activo:pasivo, donde tanto los servicios como los datos se replican en varios nodos físicos que se espera que fallen de forma independiente.
4. Tenga en cuenta que se espera que los nodos de los grupos de replicación (o clústeres) estén ubicados en lugares físicos diversos (racks o centros de datos) con suministros eléctricos e interconexiones de red independientes.
5. Si se producen fallos de varios componentes que no se han mitigado ni en el software de Mojaloop, ni en la configuración del despliegue, ni en la infraestructura, la API de Mojaloop ofrece mecanismos para que cada entidad del esquema de pagos se recupere a un estado coherente, siendo el Hub la fuente de verdad definitiva una vez restablecido por completo el servicio.
6. _Véanse también los puntos adicionales relativos a la resistencia a la pérdida de datos en caso de fallo._
7. Dado que los esquemas de pagos de Mojaloop están pensados para formar parte de la infraestructura financiera nacional, deben tener un tiempo de inactividad lo más cercano posible a cero, dentro de unas restricciones de costo razonables.
8. Cabe esperar fallos en los componentes de hardware y software, incluso en los componentes de mayor calidad disponibles. Las mejores prácticas sugieren que estos fallos deberían anticiparse y planificarse en la medida de lo posible en el diseño del Hub, con vistas a minimizar la pérdida o degradación del servicio o de los datos.
9. Para evitar dudas, esto significa que los compromisos elegidos favorecen la disponibilidad general del servicio y la coherencia del estado por encima del rendimiento. Es decir:
   1. Todos los participantes pueden seguir transaccionando a un ritmo reducido, en lugar de que algunos participantes no puedan transaccionar en absoluto.
   2. Las incoherencias de estado entre las entidades del esquema de pagos se pueden resolver tras el restablecimiento del servicio mediante la API de Mojaloop, con una conciliación manual mínima, siendo el Hub la fuente de verdad definitiva.
10. En situaciones en las que no se puede sostener un rendimiento suficiente para atender todas las solicitudes entrantes de forma puntual, el Hub priorizará el procesamiento de las transferencias en curso frente a las nuevas solicitudes entrantes.
    1. Las transferencias que el Hub no pueda procesar antes de que expiren los plazos especificados se cerrarán por tiempo de espera de forma ordenada.


### 3. El Hub es resistente a la pérdida de datos en caso de fallo.
#### Notas:
1. Con la infraestructura apropiada para operar, el software de Mojaloop se puede desplegar en configuraciones que replican los datos de forma fiable en varios nodos de almacenamiento físico redundantes antes del procesamiento.
   1. Los componentes del motor de base de datos que proporcionan los mecanismos de despliegue de Mojaloop admiten lo siguiente:
      1. Replicación asíncrona primario:secundario
      2. Replicación síncrona primario:primario.
      3. Replicación basada en un algoritmo de consenso por quórum síncrono.
   2. Los mecanismos de replicación disponibles dependen de la capa de almacenamiento y de las tecnologías de base de datos concretas que se empleen.
2. Si se producen fallos de varios componentes que no se han mitigado ni en el software de Mojaloop, ni en la configuración del despliegue, ni en la infraestructura, la API de Mojaloop ofrece mecanismos para que cada entidad del esquema de pagos se recupere a un estado coherente con un riesgo mínimo de exposición financiera.
   1. Las transferencias solo pasan a ser financieramente vinculantes cuando el Hub ha respondido correctamente a un mensaje de fulfilment de transferencia del participante beneficiario. Esta respuesta solo se envía cuando el Hub ha persistido el mensaje de fulfilment y su resultado en la base de datos de su libro mayor.
   2. Las marcas de tiempo de expiración en todos los mensajes de la API con relevancia financiera facilitan resultados de las rutas de fallo puntuales y deterministas para todos los participantes, mediante mecanismos automatizados de reintento.
3. Dado que los esquemas de pagos de Mojaloop están pensados para formar parte de la infraestructura financiera nacional, deben hacer todo lo posible, dentro de unas restricciones de costo razonables, para evitar la pérdida de datos en caso de fallo.
4. Cabe esperar fallos en los componentes de hardware y software, incluso en los componentes de mayor calidad disponibles. Las mejores prácticas sugieren que estos fallos deberían anticiparse y planificarse en el diseño del Hub, con vistas a evitar la pérdida de datos.
5. Los participantes necesitan tener confianza a tiempo sobre el estado de las transacciones financieras en todo el esquema de pagos, para minimizar el riesgo de exposición y ofrecer experiencias de cliente excelentes.


## Decisiones de diseño
1. NodeJS es el entorno de ejecución principal y TypeScript es el lenguaje preferido para el desarrollo.
    1. Esta plataforma es de código abierto y gratuita
    2. Se usa mucho y cuenta con el soporte activo de las mayores instituciones web del mundo
    3. Tiene una cartera global enorme de bibliotecas
    4. Utiliza únicamente la familia ECMAScript de lenguajes y bibliotecas neutrales respecto de la arquitectura, conocida por millones de programadores web cualificados


2. Usar una arquitectura distribuida de microservicios.
    1. [Ley de Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter) o principio del mínimo conocimiento
    2. [Separación de intereses](https://en.wikipedia.org/wiki/Separation_of_concerns) asegurada mediante contratos entre módulos
    3. La [arquitectura modular](https://en.wikipedia.org/wiki/Modular_programming) permite el desarrollo distribuido en un entorno comunitario y la mejora de los componentes con una alteración mínima de los componentes adyacentes


3. [Apache Kafka](https://kafka.apache.org/intro) distribuido de [publicación–suscripción](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) para la [separación comando–consulta (CQS)](https://en.wikipedia.org/wiki/Command–query_separation) entre módulos


4. [Apache Kafka](https://kafka.apache.org/intro) para la gestión persistente de los mensajes de la API de los participantes


5. Mojaloop usa API basadas en Open API 3.0.
    1. Expone recursos que se corresponden con la funcionalidad necesaria para dar soporte a los casos de uso definidos de la API.
    2. Es práctica común para la especificación de API web


## Anexo A: descripción general de los principios de Level One
El [Level One Project](https://www.leveloneproject.org) propone un nuevo sistema de pagos de bajo costo que admite pagos digitales inclusivos e interoperables. La [guía del Level One Project](https://www.leveloneproject.org/project_guide/03-welcome-to-the-2019-guide/) describe una visión de cómo puede funcionar un sistema inclusivo de servicios financieros digitales en beneficio de las personas pobres. Los principios de diseño subyacentes de la guía incluyen:
* Un modelo de pago de crédito tipo push con transferencia inmediata de fondos y liquidación el mismo día
* Interoperabilidad de circuito abierto entre proveedores
* La adhesión a estándares internacionales bien definidos y adoptados
* Una protección compartida contra el fraude y de seguridad adecuada en todo el sistema
* Requisitos de identidad y de conocimiento del cliente (KYC) eficientes y proporcionales
* Igualar o superar la comodidad, el costo y la utilidad del efectivo

Al utilizar un enfoque abierto y digital de las transacciones, y al asociarse con organizaciones de los sectores público y privado, el Level One Project busca dar acceso a una infraestructura compartida de servicios financieros digitales robusta y de bajo costo, impulsando la innovación de participantes nuevos y existentes, reduciendo el riesgo y generando un valor sustancial para los proveedores, las personas y las economías de los mercados en desarrollo. Se han creado recursos adicionales para ayudar a los gobiernos, las ONG y los proveedores de servicios financieros a implementar estos cambios con éxito.
