---
i18n_source_sha: ddc0945d1f59a79b7231108cedcaab1c1cbdfeb4
---

# Invariantes

## Principios generales

**La función principal de la plataforma es compensar pagos en tiempo
real y facilitar la liquidación periódica, antes del final del día de
valor.**

1.  La plataforma permite que los participantes compensen fondos de
    inmediato hacia sus clientes manteniendo al mínimo los riesgos y
    costos asociados.

2.  La plataforma admite comprobaciones de liquidez disponible por
    transferencia cuando hacen falta para respaldar el primer objetivo.

3.  El Hub está optimizado para la ruta crítica.

4.  Liquidación automatizada intradía, configurada por esquema de pagos
    y por implementación usando los modelos de liquidación recomendados
    para las infraestructuras del mercado financiero.

**El Hub admite el procesamiento directo totalmente automático.**

1.  El procesamiento directo ayuda a reducir los errores humanos en el
    proceso de transferencia, lo que en última instancia reduce los
    costos.

2.  La naturaleza automatizada del procesamiento directo lleva a
    transferencias de valor más rápidas entre los clientes finales.

**El Hub no requiere conciliación manual, ya que el protocolo de
interacción con el Hub garantiza resultados deterministas.**

1.  Cuando una transferencia se finaliza, no puede haber duda sobre el
    estado de esa transferencia (o bien no está finalizada y se da aviso
    activo a los participantes).
2.  El Hub garantiza resultados deterministas para las transferencias y
    todos los participantes lo aceptan como la autoridad final ("sistema
    de registro") sobre el estado de las transferencias.
3.  El determinismo significa que las transferencias individuales son
    rastreables y auditables (según límites y restricciones), con un
    resultado final entregado dentro de un límite de tiempo garantizado.
4.  Para evitar dudas, las transferencias masivas se procesan línea por
    línea, con resultados deterministas potencialmente distintos para
    cada una.

**La lógica de configuración de la transacción, que es específica de cada
caso de uso, está separada de la transferencia de dinero libre de
políticas.**

1.  Los detalles de la transacción y las reglas de negocio deberían
    recogerse y acordarse como reglas del esquema de pagos y directrices
    técnicas de operación. Luego pueden aplicarse durante la fase de
    cotización por esas contrapartes, y el Hub las llevará entre esas
    contrapartes.
2.  La fase de acuerdo establece un objeto de transacción firmado y
    específico del caso de uso que incorpora todos los detalles
    específicos de la transacción.
3.  La fase de transferencia orquesta la compensación de la
    transferencia de valor minorista entre instituciones en beneficio de
    las contrapartes (es decir, solo se aplican comprobaciones de
    límites del sistema) y sin referencia a los detalles de la
    transacción.
4.  No hay procesamiento adicional específico de la transacción durante
    la fase de transferencia.

**El Hub no analiza ni actúa sobre los detalles de la transacción de
extremo a extremo; los mensajes de transferencia contienen solo los
valores necesarios para completar la compensación y la liquidación.**

1.  Las comprobaciones y validaciones durante el paso de transferencia
    son solo para la conformidad con las reglas del esquema de pagos,
    las comprobaciones de límites, la autenticación de firmas y la
    validación de la condición de pago y de su fulfilment.
2.  Las transferencias que se comprometen para liquidación son firmes y
    está garantizado que se liquidarán conforme a las reglas del esquema
    de pagos.

**La semántica de la transferencia de crédito tipo push se reduce a su
forma más simple y se estandariza para todos los tipos de transacción.**

1.  Simplifica la implementación y la integración de los participantes,
    ya que muchos tipos de transacción y casos de uso pueden reutilizar
    el mismo flujo de mensajes de transferencia de valor subyacente.
2.  Aparta la complejidad del caso de uso de la ruta crítica.

**Un hub de servicios de API basado en Internet no es un "conmutador de
mensajes".**

1.  El hub de servicios ofrece servicios de API en tiempo real para que
    los participantes puedan admitir transferencias instantáneas
    minoristas de crédito tipo push.
2.  Servicios de API como la búsqueda de ID a participante, el acuerdo
    de la transacción entre participantes, el envío de transferencias
    preparadas y el envío del aviso de fulfilment.
3.  Se ofrecen servicios de API auxiliares para los participantes con el
    fin de dar soporte a la incorporación, la gestión de posiciones, los
    informes para conciliación y otras funciones no de tiempo real no
    asociadas al procesamiento de transferencias.
4.  Todos los mensajes se validan para comprobar su conformidad con la
    especificación de la API; los mensajes no conformes se rechazan
    activamente con un código de motivo estandarizado e interpretable
    por máquina.

**El Hub expone interfaces asíncronas**

1.  Para maximizar el rendimiento del sistema y la eficiencia general.
2.  Para aislar los problemas de conectividad de los nodos hoja de modo
    que no afecten a otros usuarios finales.
3.  Para permitir que el sistema del Hub procese las solicitudes en su
    propio orden de prioridad y sin mantener una conexión activa por
    transferencia.
4.  Para gestionar numerosos procesos concurrentes de larga duración
    mediante agrupación y balanceo de carga internos.
5.  Para disponer de un único mecanismo de gestión de solicitudes (por
    ejemplo, transacciones masivas o que necesitan entrada del usuario
    final o que abarcan varios saltos).
6.  Para dar mejor soporte a las redes del mundo real, ya que los
    problemas de velocidad y fiabilidad de la conexión de un
    participante deberían tener un impacto mínimo en otros participantes
    o en la disponibilidad del sistema en general.

**La API de transferencia es idempotente**

1.  Esto asegura que los originadores de mensajes puedan hacer
    solicitudes duplicadas de forma segura en condiciones de
    conectividad de red degradada.
2.  Las solicitudes duplicadas se reconocen y dan el mismo resultado
    (duplicados válidos) o se rechazan como duplicadas (cuando la
    especificación no lo permite) haciendo referencia a la original.

**Los registros de transferencias finalizadas se conservan durante un
período configurable por el esquema de pagos, para dar soporte a
procesos del esquema de pagos como la conciliación y la facturación, y
con fines forenses**

1.  No es posible consultar el "subestado" de una transferencia en
    curso; la API ofrece un resultado determinista con aviso activo
    dentro del tiempo de servicio garantizado.

**Los registros de las transferencias finalizadas se conservan
indefinidamente en almacenamiento a largo plazo para dar soporte al
análisis de negocio por parte del operador del esquema de pagos y de los
participantes (a través de las interfaces apropiadas)**

1.  La disponibilidad de los registros de transferencias puede ir por
    detrás de la firmeza del proceso en línea, para acomodar la
    separación entre el mantenimiento de registros y el procesamiento en
    tiempo real de las solicitudes de transferencia.

**El Hub puede servir de proxy para algunos mensajes entre participantes
(p. ej. durante la fase de acuerdo) para simplificar la interconexión,
pero sin analizar, almacenar (salvo para posibilitar el reenvío) ni
procesar los mensajes más allá de eso.**

1.  En algunos flujos de mensajes, p. ej. la búsqueda de parte, puede
    ser deseable que los participantes tengan un único punto de contacto
    para el enrutamiento de los mensajes relacionados con el esquema de
    pagos, incluso cuando los mensajes no van dirigidos al Hub ni
    requieren inspección u otro procesamiento.

**Para asegurar que el sistema sea aritméticamente coherente, solo se
usa aritmética de punto fijo.**

1.  Para evitar dudas, los cálculos de punto flotante pueden perder
    exactitud y no deben usarse en ningún cálculo financiero.
2.  Consulte la representación y las formas del tipo decimal de Level
    One.
3.  Esta especificación permite el intercambio fluido con sistemas
    financieros basados en XML sin pérdida de precisión ni de exactitud

## Seguridad y protección 

**Los mensajes de la API son confidenciales, con evidencia de
manipulación y no repudiables.**

1.  La confidencialidad es necesaria para proteger la privacidad de los
    participantes y de sus clientes.
2.  Hay requisitos legales en muchos dominios regulatorios donde se
    espera que opere Mojaloop y, por tanto, el Hub debe emplear las
    mejores prácticas para asegurar que se protege la privacidad de los
    participantes y de sus clientes.
3.  Se necesitan mecanismos de integridad con evidencia de manipulación
    para asegurar que los mensajes no se puedan alterar en tránsito.
4.  Para asegurar la integridad del sistema en su conjunto, cada
    receptor de un mensaje debería poder saber de forma independiente,
    con un alto grado de confianza, que el mensaje no fue alterado en
    tránsito.
5.  La criptografía de clave pública (la firma digital) proporciona el
    mejor mecanismo conocido actualmente para una mensajería con
    evidencia de manipulación.
6.  La seguridad de la clave privada (de firma) del remitente es
    crítica.
7.  Deben establecerse reglas del esquema de pagos que aclaren las
    responsabilidades de la gestión de claves y la posible
    responsabilidad financiera en caso de que se comprometa una clave
    privada.
8.  El no repudio es necesario para asegurar que el mensaje fue enviado
    por la parte que dice haberlo enviado y que el remitente no pueda
    repudiar su procedencia.
9.  Esto es importante para determinar la parte responsable durante los
    procesos de auditoría y de resolución de disputas.

**Los mensajes de la API se autentican al recibirlos, antes de su
aceptación o de cualquier procesamiento posterior**

1.  La autenticación da un grado de confianza de que el mensaje fue
    enviado por la parte que dice haberlo enviado.
2.  La autenticación da un grado de confianza de que el mensaje no fue
    enviado por una parte no autorizada.

**Los mensajes autenticados no se acusan como aceptados hasta que se
registran de forma segura en almacenamiento permanente**

1.  La API de Mojaloop asigna un significado de negocio importante,
    relacionado con el esquema de pagos, a determinados códigos de
    respuesta HTTP en varios puntos de los flujos de transacción.
2.  Ciertas respuestas HTTP, p. ej. "202 Accepted", están pensadas para
    dar garantías financieras a los participantes y, por tanto, solo
    deben enviarse una vez que la entidad receptora está segura de que
    ha dejado registros seguros y permanentes que sirven para:
    -   Facilitar la recuperación de todo el sistema a un estado
        coherente tras los fallos de uno o varios componentes o
        entidades distribuidos.
    -   Procesos de liquidación exactos
    -   Procesos de auditoría y de resolución de disputas
3.  Por ejemplo, un "202 Accepted" del Hub al participante beneficiario
    al recibir un mensaje de fulfilment de transferencia indica una
    garantía de liquidación de la transacción al beneficiario.
4.  La API de Mojaloop está diseñada para operar de forma segura en
    condiciones de red imperfectas y, por tanto, tiene soporte integrado
    para reintentos y sincronización de estado entre participantes.

**Tres niveles de seguridad de la comunicación para asegurar la
integridad, la confidencialidad y el no repudio de los mensajes entre un
servidor de API y un cliente de API.**

1.  Conexiones seguras: se requiere mTLS para todas las comunicaciones
    entre el Hub y los participantes autorizados.
    -   Asegura que las comunicaciones sean confidenciales, entre
        corresponsales conocidos, y que estén protegidas frente a
        manipulaciones.
2.  Mensajes seguros: el contenido de los mensajes JSON se firma
    criptográficamente conforme a la especificación JWS.
    -   Asegura a los receptores que los mensajes fueron enviados por la
        parte que dice haberlos enviado y que el remitente no puede
        repudiar su procedencia.
3.  Términos de transferencia seguros: Interledger Protocol (ILP) entre
    los participantes pagador y beneficiario.
    -   Protege la integridad de la condición de pago y de su
        fulfilment.
    -   Limita el tiempo durante el cual una instrucción de
        transferencia es válida.

## Características operativas

**El sistema de referencia, demostrado en hardware mínimo, admite la
compensación de 1,000 transferencias por segundo, sostenidas durante una
hora, sin que más del 1% (de la etapa de transferencia) tarde más de 1
segundo en pasar por el Hub.**

1.  Esta medición incluye todos los componentes de hardware y software
    necesarios, con seguridad y persistencia de datos de nivel de
    producción.
2.  Esta medición incluye las tres etapas de la transferencia:
    descubrimiento, acuerdo y transferencia.
3.  Esta medición no incluye ninguna latencia introducida por los
    participantes.
4.  Un período de una hora es una aproximación razonable de un pico de
    demanda para un sistema nacional de pagos.
5.  Un costo unitario menor para escalar que para el aprovisionamiento
    inicial.
6.  1000 transferencias (compensación) por segundo es un punto de
    partida razonable para un sistema nacional de pagos.
7.  Que el 1% de las transferencias (compensación) tarde más de 1
    segundo es un punto de partida razonable para un sistema nacional de
    pagos.
8.  Los esquemas de pagos de Mojaloop deberían poder empezar con un
    costo razonable, para una infraestructura financiera nacional, y
    escalar de forma económica a medida que crece la demanda.

**Si se despliega correctamente, el Hub tiene alta disponibilidad y es
resiliente ante los fallos.**

1.  En este caso definimos el término "alta disponibilidad" como "la
    capacidad de proporcionar y mantener un nivel de servicio aceptable
    frente a fallos y desafíos al funcionamiento normal."
2.  Aunque los esquemas de pagos pueden determinar su propia definición
    de lo que constituye un "nivel de servicio aceptable", Mojaloop toma
    ciertas decisiones de compromiso que contribuyen a ello:
    -   Cuando los modos de fallo lo permiten, el servicio se degrada en
        toda la población de participantes en lugar de que participantes
        concretos sufran cortes totales mientras otros siguen
        operativos.
    -   El Hub no tiene ningún punto único de fallo, lo que significa
        que sigue funcionando con una degradación mínima del servicio si
        falla cualquier componente individual.
    -   Se despliegan varias instancias activas de cada componente de
        forma distribuida detrás de balanceadores de carga.
    -   Cada instancia activa de un componente puede gestionar
        solicitudes de cualquier cliente o participante, lo que
        significa que ningún participante pierde la capacidad de
        transaccionar si falla cualquier componente individual.
3.  Con la infraestructura apropiada para operar, el software de
    Mojaloop se puede desplegar en configuraciones que ofrecen un
    99.999% de tiempo de actividad (cinco nueves) en conjunto.
4.  Esto incluye configuraciones de varios centros de datos distribuidos
    geográficamente, en activo:activo y activo:pasivo, donde tanto los
    servicios como los datos se replican en varios nodos físicos que se
    espera que fallen de forma independiente.
5.  Tenga en cuenta que se espera que los nodos de los grupos de
    replicación (o clústeres) estén ubicados en lugares físicos diversos
    (racks o centros de datos) con suministros eléctricos e
    interconexiones de red independientes.
6.  Si se producen fallos de varios componentes que no se han mitigado
    ni en el software de Mojaloop, ni en la configuración del despliegue
    o la infraestructura, la API de Mojaloop ofrece mecanismos para que
    cada entidad del esquema de pagos se recupere a un estado coherente,
    siendo el Hub la fuente de verdad definitiva una vez restablecido
    por completo el servicio.
7.  Véanse también los puntos adicionales relativos a la resistencia a
    la pérdida de datos en caso de fallo.
8.  Dado que los esquemas de pagos de Mojaloop están pensados para
    formar parte de la infraestructura financiera nacional, deben tener
    un tiempo de inactividad lo más cercano posible a cero, dentro de
    unas restricciones de costo razonables.
9.  Cabe esperar fallos en los componentes de hardware y software,
    incluso en los componentes de mayor calidad disponibles. Las mejores
    prácticas sugieren que estos fallos deberían anticiparse y
    planificarse en la medida de lo posible en el diseño del Hub, con
    vistas a minimizar la pérdida o degradación del servicio o de los
    datos.
10. Para evitar dudas, esto significa que los compromisos elegidos
    favorecen la disponibilidad general del servicio y la coherencia del
    estado por encima del rendimiento, de modo que:

	-   Todos los participantes pueden seguir transaccionando a un ritmo
    reducido, en lugar de que algunos participantes no puedan
    transaccionar en absoluto.
	-   Las incoherencias de estado entre las entidades del esquema de pagos
    se pueden resolver tras el restablecimiento del servicio mediante la
    API de Mojaloop, con una conciliación manual mínima, siendo el Hub
    la fuente de verdad definitiva.

**El Hub es resistente a la pérdida de datos en caso de fallo.**

1.  Con la infraestructura apropiada para operar, el software de
    Mojaloop se puede desplegar en configuraciones que replican los
    datos de forma fiable en varios nodos de almacenamiento físico
    redundantes antes del procesamiento.
2.  Los componentes del motor de base de datos que proporcionan los
    mecanismos de despliegue de Mojaloop admiten lo siguiente:

	-   Replicación asíncrona primario:secundario.
	-   Replicación síncrona primario:primario.
	-   Replicación basada en un algoritmo de consenso por quórum síncrono.

3.  Los mecanismos de replicación disponibles dependen de la capa de
    almacenamiento y de las tecnologías de base de datos concretas que
    se empleen.
4.  Si se producen fallos de varios componentes que no se han mitigado
    ni en el software de Mojaloop, ni en la configuración del despliegue
    o la infraestructura, la API de Mojaloop ofrece mecanismos para que
    cada entidad del esquema de pagos se recupere a un estado coherente
    con un riesgo mínimo de exposición financiera.
5.  Las transferencias solo pasan a ser financieramente vinculantes
    cuando el Hub ha respondido correctamente a un mensaje de fulfilment
    de transferencia del participante beneficiario. Esta respuesta solo
    se envía cuando el Hub ha persistido el mensaje de fulfilment y su
    resultado en la base de datos de su libro mayor.
6.  Las marcas de tiempo de expiración en todos los mensajes de la API
    con relevancia financiera facilitan resultados de las rutas de fallo
    puntuales y deterministas para todos los participantes, mediante
    mecanismos automatizados de reintento.
7.  Cuando los esquemas de pagos de Mojaloop están pensados para formar
    parte de la infraestructura financiera nacional, deben hacer todo lo
    posible, dentro de unas restricciones de costo razonables, para
    evitar la pérdida de datos en caso de fallo.
8.  Cabe esperar fallos en los componentes de hardware y software,
    incluso en los componentes de mayor calidad disponibles. Las mejores
    prácticas sugieren que estos fallos deberían anticiparse y
    planificarse en el diseño del Hub, con vistas a evitar la pérdida de
    datos.
9.  Los participantes necesitan tener confianza a tiempo sobre el estado
    de las transacciones financieras en todo el esquema de pagos, para
    minimizar el riesgo de exposición y ofrecer experiencias de cliente
    excelentes.

## Aplicabilidad

Esta versión de este documento corresponde a la versión de Mojaloop [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14 de abril de 2025| Paul Makin|Se agregó el control de versiones|
|1.0|5 de febrero de 2025| James Bush|Versión inicial|