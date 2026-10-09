---
i18n_source_sha: 8a174d79e8022471238ef29e303588faa249378e
---

# Plantilla de directriz de operación de la plataforma

- Versión: 2.0 
    - Autores: Carol Coye Benson (Glenbrook), Michael Richards (ModusBox)  
    - Fecha: octubre de 2019
    - Descripción: 

---

## **Acerca del Mojaloop Community Business Document Project**

Este documento forma parte del Mojaloop Community Business Document Project. El proyecto está pensado para dar soporte a las entidades (países, regiones, asociaciones de proveedores o empresas comerciales) que implementan nuevos sistemas de pagos usando el código de Mojaloop. Esas entidades también tendrán que escribir las Reglas de Negocio que seguirán los participantes del sistema.

El Mojaloop Community Business Document Project ofrece plantillas para las Reglas de Negocio y los documentos relacionados. Implementar un nuevo sistema de pagos implica muchas decisiones: las plantillas muestran algunas de ellas y, cuando corresponde, se incluyen comentarios sobre cómo se relaciona cada decisión con los objetivos de un sistema alineado con Level One.

Los siguientes documentos forman parte del proyecto:

- Decisiones clave del esquema de pagos

- Plantilla de acuerdo de participación en el esquema de pagos

- Plantilla de reglas de negocio del esquema de pagos

- Plantilla de directriz de operación de la plataforma

- Plantilla de directriz de operación para la gestión de excepciones

- Glosario uniforme

## **Introducción**

Un Esquema de pagos que implemente un sistema alineado con Level One, incluidos los que usan el código de referencia de Mojaloop en la plataforma, tendrá que escribir Reglas de Negocio para el Esquema de pagos. En este proyecto se incluye una plantilla de esas Reglas de Negocio. Las Reglas de Negocio introducen el concepto de Documentos Asociados, que forman parte de las Reglas de Negocio y tienen la misma fuerza: los DFSP que firman las Reglas de Negocio también quedan obligados a cumplir las disposiciones de los Documentos Asociados.

La Directriz de Operación de la Plataforma es un Documento Asociado importante que describe cómo operará la Plataforma del Esquema de pagos, y especifica las obligaciones y responsabilidades del Esquema de pagos, del Operador de la Plataforma y de los DFSP.

Este documento es una plantilla de esa Directriz de Operación de la Plataforma. Sin embargo, muchas de sus disposiciones variarán en función de las decisiones que haya tomado el Esquema de pagos: algunas de ellas se describen en el documento "Decisiones clave del esquema de pagos", que forma parte de este proyecto.

La plantilla de Reglas de Negocio que forma parte de este proyecto puede usarse con independencia de la plataforma que elija un esquema de pagos. Esta Directriz de Operación de la Plataforma es más específica del uso de Mojaloop como plataforma.

## **Tabla de contenidos — Plantilla de directriz de operación de la plataforma**

[1 - Acerca de este documento](#_1-acerca-de-este-documento)

[1.1 - Servicios del Esquema de pagos](#_1-1-servicios-del-esquema-de-pagos)

[1.2 - Open API Specification](#_1-2-open-api-specification)

[1.3 - Casos de uso del Esquema de pagos](#_1-3-casos-de-uso-del-esquema-de-pagos)

[1.4 - Identificadores admitidos por el Esquema de pagos](#_1-4-identificadores-admitidos-por-el-esquema-de-pagos)

[2 - El Account Lookup Service](#_2-el-account-lookup-service)

[2.1 - Descripción del Account Lookup Service](#_2-1-descripcion-del-account-lookup-service)

[2.2 - Solicitud de parte](#_2-2-solicitud-de-parte)

[2.3 - Consulta de partes](#_2-3-consulta-de-partes)

[2.4 - Respuesta a la consulta de partes](#_2-4-respuesta-a-la-consulta-de-partes)

[3 - El Servicio de Cotización](#_3-el-servicio-de-cotizacion)

[3.1 - Descripción del Servicio de Cotización](#_3-1-descripcion-del-servicio-de-cotizacion)

[3.2 - Solicitud de cotización](#_3-2-solicitud-de-cotizacion)

[3.3 - Respuesta a la solicitud de cotización](#_3-3-respuesta-a-la-solicitud-de-cotizacion)

[4 - El Servicio de Transferencia](#_4-el-servicio-de-transferencia)

[4.1 - Descripción del Servicio de Transferencia](#_4-1-descripcion-del-servicio-de-transferencia)

[4.2 - Solicitud de transferencia](#_4-2-solicitud-de-transferencia)

[4.3 - Solicitud de pago](#_4-3-solicitud-de-pago)

[5 - El Servicio de Liquidación](#_5-el-servicio-de-liquidacion)

[5.1 - Liquidación de transferencias](#_5-1-liquidacion-de-transferencias)

[5.2 - Liquidación de tarifas: tarifas de procesamiento](#_5-2-liquidacion-de-tarifas-tarifas-de-procesamiento)

[5.3 - Liquidación de tarifas: tasas de intercambio](#_5-3-liquidacion-de-tarifas-tasas-de-intercambio)

[6 - El Servicio de Gestión del Esquema de pagos](#_6-el-servicio-de-gestion-del-esquema-de-pagos)

[6.1 - Descripción del Servicio de Gestión del Esquema de pagos](#_6-1-descripcion-del-servicio-de-gestion-del-esquema-de-pagos)

[6.2 - El proceso de registro](#_6-2-el-proceso-de-registro)

[6.3 - Servicio al cliente del DFSP](#_6-3-servicio-al-cliente-del-dfsp)

[6.4 - Gestión del sistema del Esquema de pagos](#_6-4-gestion-del-sistema-del-esquema-de-pagos)

[7 - El Servicio de Gestión del Fraude](#_7-el-servicio-de-gestion-del-fraude)

[8 - Apéndice: Casos de uso admitidos por el Esquema de pagos y parámetros del sistema](#_8-apendice-casos-de-uso-admitidos-por-el-esquema-de-pagos-y-parametros-del-sistema)

[9 - Apéndice: Códigos de categoría de comercio](#_9-apendice-codigos-de-categoria-de-comercio)

## 1. Acerca de este documento

Estas Directrices de Operación de la Plataforma especifican los requisitos operativos y técnicos para los DFSP y para el Esquema de pagos. De vez en cuando, el Esquema de pagos emitirá Boletines Operativos adicionales, que describirán funcionalidades operativas adicionales del Esquema de pagos y especificarán requisitos adicionales para los DFSP.

### 1.1 Servicios del Esquema de pagos

- Los DFSP usan los Servicios del Esquema de pagos para intercambiar transacciones interoperables y para gestionar su participación en el Esquema de pagos.

- El Account Lookup Service del Esquema de pagos permite a los DFSP del sistema identificar al DFSP que gestiona la Cuenta Transaccional de un Beneficiario previsto o de otra contraparte de una Transferencia.

- El Servicio de Transferencia del Esquema de pagos permite a un DFSP Pagador enviar una Transferencia a un DFSP Beneficiario, y efectuar así una transferencia de fondos de un Pagador a un Beneficiario.

- El Servicio de Liquidación del Esquema de pagos permite a los DFSP liquidar sus obligaciones financieras con el Esquema de pagos respecto de las Transferencias.

- El Servicio de Gestión del Esquema de pagos permite al Esquema de pagos otorgar y revocar el acceso de los DFSP al Esquema de pagos, gestiona las interacciones continuas de los DFSP con el Esquema de pagos, supervisa el funcionamiento efectivo del Esquema de pagos y proporciona herramientas para que los DFSP gestionen su participación en el Esquema de pagos.

- El Servicio de Gestión del Fraude del Esquema de pagos permite a los DFSP colaborar en ciertos elementos de la gestión del fraude para reducir costos y mejorar los resultados.

- Los DFSP deben seguir los procedimientos que se detallan a continuación para usar el Esquema de pagos.

### 1.2 Open API Specification

Los protocolos del Esquema de pagos se basan en los modelos operativos y de datos definidos en el documento de especificaciones "Open API for FSP Interoperability Specification" versión 1.0, de fecha \[xx\]. Cuando el Esquema de pagos se aparte de esa especificación, esas desviaciones se documentan aquí y prevalecerán sobre las secciones pertinentes de ese documento. El Esquema de pagos puede actualizar la versión usada emitiendo un Boletín Operativo.

### 1.3 Casos de uso del Esquema de pagos

Algunas reglas y especificaciones operativas varían según los Casos de Uso y los Casos de Uso Secundarios que admita el Esquema de pagos. El Esquema de pagos reconoce los Casos de Uso y los Casos de Uso Secundarios mediante una combinación de componentes de datos obligatorios e inferencia del sistema. Esto se detalla en un Apéndice de este documento.

### 1.4 Identificadores admitidos por el Esquema de pagos

El Esquema de pagos admite ciertos Identificadores, o direcciones de pago, para usarlos al hacer Transferencias. El Identificador identifica al Beneficiario cuya Cuenta Transaccional se acredita por la Transferencia. Los Identificadores admitidos por el Esquema de pagos figuran en un Apéndice de las Reglas de Negocio.

Para cada identificador admitido por el esquema de pagos, este documento debería especificar cuál es el identificador y cómo se resuelve (cómo se determina qué DFSP Beneficiario es responsable de la cuenta transaccional asociada a ese identificador.

#### 1.4.1 Ejemplo: el identificador MSISDN 

Cada esquema de pagos tendrá sus propias directrices para cada identificador; las disposiciones siguientes podrían variar mucho en función de las decisiones tomadas.

- Los MSISDN son números de celular que son únicos a escala mundial. Los MSISDN son el Identificador de Cuenta Transaccional de los DFSP que son Operadores de Red Móvil y que proporcionan Cuentas Transaccionales a sus clientes.

- El uso del MSISDN como Identificador del Beneficiario se limita a las Cuentas Transaccionales que proporcionan los DFSP que son el Operador de Red Móvil responsable de ese MSISDN.

::: tip NOTA
Si los MSISDN se usan para otras Cuentas Transaccionales, son alias, y debe especificarse un protocolo aparte para resolverlos.
:::

- Una Solicitud de parte para un MSISDN la resuelve un servicio de directorio de MSISDN que determina el Esquema de pagos. El Esquema de pagos puede especificar de vez en cuando obligaciones de mantenimiento del servicio de directorio para los DFSP que son Operadores de Red Móvil.

#### 1.4.2 Ejemplo: el identificador de Número de Cuenta Bancaria

Cada esquema de pagos tendrá sus propias directrices para cada identificador; las disposiciones siguientes podrían variar mucho en función de las decisiones tomadas.

- Los números de Cuenta Bancaria los asignan a los clientes los DFSP que son Bancos y que proporcionan Cuentas Transaccionales a sus clientes.

- El Número de Cuenta Bancaria, junto con un Código de Banco, forman el Identificador de Número de Cuenta Bancaria del Esquema de pagos. Los DFSP Pagadores son responsables de dar formato correctamente al Identificador de Número de Cuenta Bancaria según los formatos que especifique el Esquema de pagos.

- El uso del Identificador de Número de Cuenta Bancaria se limita a las Cuentas Transaccionales que proporcionan los DFSP que son Bancos.

- El DFSP Pagador envía al Esquema de pagos una Solicitud de parte para un Identificador de Cuenta Bancaria. El Esquema de pagos comprueba que el Código de Banco del Identificador de Cuenta Bancaria esté asociado a un Banco activo en el Esquema de pagos.

#### 1.4.3 Ejemplo: el Identificador de Comercio del Esquema de pagos 

Cada esquema de pagos tendrá sus propias directrices para cada identificador; las disposiciones siguientes podrían variar mucho en función de las decisiones tomadas.

- El ID del comercio es un identificador definido por el Esquema de pagos que se usa para los pagos de persona a empresa.

- El uso del ID del comercio se limita a los DFSP que proporcionan Cuentas Transaccionales a comercios, emisores de facturas, organismos públicos u otras entidades empresariales que reciben pagos de sus clientes a través del Esquema de pagos. Puede usarse tanto para pagos presenciales como remotos. El término "comercio" que se usa en esta sección incluye a todos estos tipos de receptores de pagos.

- El uso del ID del comercio se limita a las Transferencias de los Casos de Uso P2B o P2G

- Un comercio puede solicitar varios ID de comercio a su DFSP; el comercio puede usarlos para distintos puntos de atención, cajas o tiendas. No hay límite al número de ID de comercio que pueden vincularse a una única Cuenta Transaccional. Sin embargo, un ID de comercio dado solo puede vincularse a una única Cuenta Transaccional.

- El Esquema de pagos emite el ID del comercio al DFSP que proporciona al comercio la Cuenta Transaccional en la que se harán los pagos.

- El ID del comercio se emite como un número, que el comercio puede mostrar de forma física o digital.

- Los DFSP o sus clientes comercios pueden representar los ID de comercio como códigos QR. Los códigos QR deben representarse conforme a las directrices de formato y de marca que emita el Esquema de pagos. Se prohíbe a los DFSP usar otros formatos de datos o marcas de código QR para recibir pagos a través del Esquema de pagos.

- Los DFSP deben mostrar la marca del Esquema de pagos. El Esquema de pagos especificará sus requisitos de marca. La marca del Esquema de pagos debe ser visible para el cliente en la tienda del comercio, o en el dispositivo que el cliente pagador esté usando para comprar de forma remota.

- Requisitos de registro. Los DFSP solicitarán un ID del comercio para un cliente usando una API del Esquema de pagos específica para este fin. Los DFSP deberán proporcionar:

    - El ID del DFSP

    - El número de Cuenta Transaccional que recibirá los fondos pagados al comercio. Puede ser un MSISDN o un número de cuenta bancaria.

    - El \[registro mercantil o ID fiscal\] del comercio. Puede asociarse cualquier número de ID de comercio al mismo registro mercantil o ID fiscal.

    - El Nombre del Comercio

- Los DFSP que solicitan un ID del comercio al Esquema de pagos garantizan que han completado la información de KYC requerida para la cuenta del comercio en el momento de la solicitud.

- Los DFSP deben proporcionar información de formación adecuada a sus clientes.

- Deshabilitar ID de comercio. Los DFSP pueden solicitar que se deshabilite un ID del comercio. El Esquema de pagos deshabilitará inmediatamente ese ID del comercio, pero lo conservará en el sistema del Esquema de pagos a efectos de reporte. Las Solicitudes de cotización o las Solicitudes de transferencia hechas a ese ID del comercio serán rechazadas por el Esquema de pagos y devueltas al DFSP Pagador.

El Esquema de pagos puede querer ofrecer algún mecanismo para portar un ID del comercio de un DFSP a otro.

#### 1.4.4 El Identificador ID del Esquema de pagos 

Este ID sería similar al ID del comercio anterior, pero estaría pensado tanto para consumidores como para empresas, y podría expresarse en frases en lugar de como un número. Tenga en cuenta que cada esquema de pagos tendrá sus propias directrices para cada identificador; las disposiciones siguientes podrían variar mucho en función de las decisiones tomadas.

- El ID del Esquema de pagos es un identificador definido por el Esquema de pagos.

- Los DFSP deben ofrecer a sus clientes la opción de solicitar un ID del Esquema de pagos.

- Los ID del Esquema de pagos pueden tener cualquier forma, sujetos únicamente a las restricciones de longitud que el Esquema de pagos especifique de vez en cuando. El Esquema de pagos se reserva el derecho de rechazar el uso de cualquier ID del Esquema de pagos concreto que se solicite.

Los esquemas de pagos pueden querer habilitar los ID del Esquema de pagos

- Los clientes pueden solicitar cualquier número de ID del Esquema de pagos, sujeto a los límites que imponga su DFSP. Pueden asociarse varios ID del Esquema de pagos a una única Cuenta Transaccional. Sin embargo, cada ID del Esquema de pagos solo puede asociarse a una única Cuenta Transaccional.

- Requisitos de registro. Los DFSP solicitarán un ID del Esquema de pagos para un cliente usando una API del Esquema de pagos específica para este fin. Los DFSP deberán proporcionar en esa API:

    - El ID del DFSP

    - El ID del Esquema de pagos solicitado

    - El número de Cuenta Transaccional que recibirá los fondos pagados al cliente. Puede ser un MSISDN o un número de cuenta bancaria.

    - Si el Titular de la Cuenta Transaccional es un comercio o una empresa, el \[registro mercantil o ID fiscal\] del Titular de la Cuenta. Puede asociarse cualquier número de ID del Esquema de pagos al mismo registro mercantil o ID fiscal.

- Los DFSP que solicitan un ID del Esquema de pagos al Esquema de pagos garantizan que han completado la información de KYC requerida para la cuenta del cliente en el momento de la solicitud.

- Deshabilitar Identificadores del Esquema de pagos. Los DFSP pueden solicitar que se deshabilite un ID del Esquema de pagos. El Esquema de pagos deshabilitará inmediatamente ese ID del Esquema de pagos, pero lo conservará en el sistema del Esquema de pagos a efectos de reporte. Las Solicitudes de cotización o las Solicitudes de transferencia hechas a ese ID del Esquema de pagos serán rechazadas por el Esquema de pagos y devueltas al DFSP Pagador.

El Esquema de pagos puede querer ofrecer algún mecanismo para portar un ID del Esquema de pagos de un DFSP a otro.

Las siguientes secciones describen cada servicio y las obligaciones y responsabilidades de las partes interesadas. Cada servicio consta de procesos: la mayoría de los procesos están vinculados a llamadas a la API concretas que se especifican en la sección [Open API Specification](#_1-2-open-api-specification) de este documento.

## 2. El Account Lookup Service

### 2.1 Descripción del Account Lookup Service

- El Account Lookup Service permite a los DFSP asociar Identificadores concretos de clientes individuales al DFSP que proporciona una Cuenta Transaccional a ese cliente. Los Identificadores se usan para identificar a personas, comercios, emisores de facturas, organismos públicos u otras empresas. Todo Tipo de Identificador que admita el Esquema de pagos tiene un Servicio de identificadores definido, cuyos parámetros se muestran en la sección "Identificadores admitidos por el Esquema de pagos" de este documento.

- Todos los Servicios de identificadores aseguran que los Identificadores usados en las Transacciones del Esquema de pagos sean únicos dentro del Esquema de pagos y estén asociados a un único DFSP que proporcione la Cuenta Transaccional correspondiente a ese cliente. Todo Identificador debe estar asociado a una única Cuenta Transaccional.

- Los DFSP deben completar el proceso de Búsqueda de cuenta inmediatamente antes de iniciar un proceso de Cotización, salvo que estas Directrices permitan otra cosa.

### 2.2 Solicitud de parte

- Un DFSP Pagador envía una Solicitud de parte a la Plataforma. La Solicitud de parte debe contener los siguientes elementos de datos clave:

    - El Identificador del Beneficiario previsto

    - El identificador del DFSP Pagador

El esquema de pagos puede definir elementos de datos clave adicionales que serán obligatorios en la Solicitud de partes.

- La Plataforma reenvía la solicitud al Account Lookup Service correspondiente a ese tipo de Identificador.

- El Servicio de identificadores devuelve al Account Lookup Service la identificación del DFSP asociado a ese Identificador, si se encuentra una referencia. Si no se encuentra, se devuelve una respuesta negativa y la Plataforma se lo comunica al DFSP Pagador. Si se encuentra una referencia, el Account Lookup Service asocia entonces el DFSP identificado con el ID de DFSP correcto del Esquema de pagos.

### 2.3 Consulta de partes

- Si la Solicitud de parte consigue identificar a un DFSP Beneficiario, la Plataforma ejecuta entonces una Consulta de partes al DFSP identificado para determinar si el DFSP está dispuesto a aceptar una Solicitud de cotización dirigida a ese Identificador.

### 2.4 Respuesta a la consulta de partes

- El DFSP identificado responde con una Respuesta a la consulta de partes positiva o con una respuesta de error. Si es positiva, la Respuesta a la consulta de partes debe contener los siguientes elementos de datos clave:

    - El Nombre completo del Beneficiario

    - El Identificador del DFSP Pagador

    - El Tipo de cuenta transaccional, que especifica si la Cuenta es una cuenta bancaria o una billetera

    - El Tipo de titular de cuenta transaccional, que especifica si el Titular de la Cuenta Transaccional es un consumidor, un comercio (incluidos otros tipos de empresa) o un organismo público.

    - Si el Beneficiario es un Comercio, el Código de categoría de comercio. Estos códigos figuran en un apéndice de este documento.

El esquema de pagos puede definir elementos de datos adicionales obligatorios en la Respuesta a la consulta de partes.

-   La Plataforma responde al DFSP Pagador con el resultado de la Respuesta a la consulta de partes

## 3. El Servicio de Cotización

#### 3.1 Descripción del Servicio de Cotización

- El Proceso de Cotización precede al Proceso de Transferencia, y permite al DFSP Pagador y al DFSP Beneficiario intercambiar cierta información antes de la Transferencia.

- El Proceso de Cotización debe completarse antes de que un DFSP Pagador inicie el Proceso de Transferencia. Esto es así para todos los Casos de Uso y Casos de Uso Secundarios.

- Los pasos del Proceso de Cotización se muestran a continuación.

#### 3.2 Solicitud de cotización 

- Un DFSP Pagador envía una Solicitud de cotización al DFSP Beneficiario; la Plataforma registra la Solicitud de cotización. La Solicitud de cotización debe contener los siguientes elementos de datos clave:

    - El Monto de la transferencia

    - El Tipo de Monto fijado como Monto a enviar.

    - El conjunto completo de Información de la Parte que devolvió la Respuesta a la Solicitud de partes.

    - El Nombre completo del Pagador (el Titular de la Cuenta Transaccional en el DFSP Pagador)

    - Los datos del Tipo de Transacción requeridos para el Caso de Uso y el Caso de Uso Secundario de la Transacción, según se especifica en el Apéndice de Casos de Uso de este documento.

    - Un tiempo de expiración, cuyos parámetros admisibles especificará el esquema de pagos de vez en cuando.

El esquema de pagos puede definir elementos de datos clave adicionales que serán obligatorios en la Respuesta a la consulta de partes.

- La Plataforma rechazará una Solicitud de cotización por un monto superior al Límite de Valor de Transacción del Esquema de pagos y la devolverá al DFSP Pagador.

### 3.3 Respuesta a la solicitud de cotización

- El DFSP Beneficiario envía una Respuesta a la solicitud de cotización al DFSP Pagador; la Plataforma registra la Respuesta a la solicitud de cotización. El DFSP Beneficiario debe responder a una Solicitud de cotización.

- La Respuesta a la solicitud de cotización debe contener los siguientes elementos de datos clave:

    - El Monto de la transferencia

    - Un tiempo de expiración, cuyos parámetros admisibles especificará el Esquema de pagos de vez en cuando.

    - El Objeto de Transacción firmado, que contiene los parámetros de la transferencia. El Objeto de Transacción es la descripción autorizada de la transacción a efectos del reporte del Esquema de pagos, de la gestión del fraude y de la resolución de disputas.

El esquema de pagos puede definir elementos de datos clave adicionales que serán obligatorios en la Respuesta a la consulta de partes.

- El DFSP Beneficiario firma la Respuesta a la solicitud de cotización y esta define los parámetros de la Transacción; el DFSP Pagador no puede cambiar esos parámetros en el Proceso de Transferencia.

## 4. El Servicio de Transferencia

### 4.1 Descripción del Servicio de Transferencia

- El Servicio de Transferencia es el medio por el que se realiza la transferencia efectiva de fondos entre el DFSP Pagador y el DFSP Beneficiario. La Solicitud de transferencia es el proceso clave dentro del servicio. Una Solicitud de transferencia debe ir precedida de un proceso de Cotización.

### 4.2 Solicitud de transferencia

- Un DFSP Pagador envía una Solicitud de transferencia al DFSP Beneficiario a través del Servicio de Transferencia del Esquema de pagos. La Plataforma registra la Solicitud de transferencia. La Solicitud de transferencia debe contener los siguientes elementos de datos clave:

    - Los Identificadores del DFSP Pagador y del DFSP Beneficiario

    - El Monto de la Transacción

    - Un paquete ILP que representa el Objeto de Transacción

    - Un tiempo de expiración, cuyos parámetros admisibles especificará el Esquema de pagos de vez en cuando.

El esquema de pagos puede definir elementos de datos clave adicionales que serán obligatorios en la Solicitud de transferencia.

- El DFSP Pagador firma la Solicitud de transferencia

- La Plataforma realiza un proceso de Aprobación de la Transferencia para determinar si la Transferencia propuesta puede liquidarse. El proceso de Aprobación de la Transferencia se define más adelante en la sección del Servicio de Liquidación de este documento.

- Si la Solicitud de transferencia no supera el proceso de Aprobación de la Transferencia, la Solicitud de transferencia se devuelve al DFSP Pagador.

- Si la Solicitud de transferencia supera el proceso de Aprobación de la Transferencia, la Plataforma reserva los fondos especificados en la Solicitud de transferencia en el Libro mayor de posiciones del DFSP Pagador. Esto se define más adelante en la sección del Servicio de Liquidación de este documento.

- El DFSP Beneficiario determina si aceptará la Transferencia.

- Si no la acepta, se devuelve una respuesta de error a la Plataforma. La Plataforma libera la reserva de fondos en el Libro mayor de posiciones del DFSP Pagador y devuelve una condición de error al DFSP Pagador.

- Si la acepta, el DFSP Beneficiario devuelve una Respuesta a la solicitud de transferencia firmada que indica que la Transferencia se ha completado mediante fulfilment. La Plataforma sustituye el débito provisional por un débito en el Libro mayor de posiciones del DFSP Pagador y abona en el Libro mayor de posiciones del DFSP Beneficiario un crédito por el monto de la Transferencia.

- La Plataforma envía entonces una confirmación de la Transferencia completada al DFSP Pagador y al DFSP Beneficiario.

- Si la Plataforma no recibe una Respuesta a la solicitud de transferencia firmada dentro del periodo de expiración indicado en la Solicitud de transferencia, la transferencia se cancelará y el Esquema de pagos lo notificará a los DFSP Beneficiario y Pagador.

- Los DFSP Pagador y Beneficiario deben:

    - Notificar a sus clientes el estado de una transferencia de forma oportuna

    - Debitar y acreditar de inmediato las Cuentas Transaccionales de sus clientes cuando se complete la Transferencia mediante fulfilment

    - Liberar de inmediato cualquier fondo reservado si una Transferencia ha sido rechazada o cancelada

### 4.3 Solicitud de pago 

_Esta sección aún no se ha escrito._

## 5. El Servicio de Liquidación

Este documento presenta una plantilla de los procesos de liquidación, tanto de las transferencias como de las tarifas del esquema de pagos. Hay múltiples enfoques posibles de la liquidación, que se analizan en el documento "Decisiones clave" que forma parte de este proyecto. La plantilla siguiente cubre dos modelos: la liquidación neta y la liquidación bruta continua. El código de referencia de Mojaloop admite varios modelos de liquidación distintos, incluidos estos.

### 5.1 Liquidación de transferencias 

#### 5.1.1 Descripción del Servicio de Liquidación de Transferencias

- La Liquidación de transferencias es el medio por el que los DFSP liquidan las obligaciones financieras que tienen entre sí. La Liquidación de transferencias consta de cinco procesos: el Proceso del Libro mayor, el Proceso del Límite de débito neto, el Proceso de Aprobación de la Transferencia, el Proceso de Contabilización de la Liquidación y
el Proceso de Gestión de la Cuenta de Liquidación.

- \[_Opción de liquidación neta_\] Los DFSP deben abrir una cuenta en el Banco liquidador del Esquema de pagos. \[_Opción de liquidación bruta continua_\] Los DFSP deben convertirse en propietarios conjuntos de la cuenta bancaria de Liquidación Común del Esquema de pagos en el Banco liquidador del Esquema de pagos, y usar o abrir las demás cuentas bancarias individuales que sean necesarias en el Banco liquidador del Esquema de pagos para transferir fondos hacia y desde la cuenta bancaria de Liquidación Común del Esquema de pagos.

#### 5.1.2 El Libro mayor de la Plataforma 

- La Plataforma es responsable de mantener un Libro mayor de posiciones del DFSP para cada DFSP. Esta operación se ejecuta de forma continua. \[_Opción de liquidación bruta continua_\] El Libro mayor de posiciones de cada DFSP, menos las anotaciones provisionales, representa la cuota de propiedad de ese DFSP en la Cuenta Bancaria de Liquidación Común del Esquema de pagos.

- El Libro mayor de posiciones registra:

    - Todas las Transferencias completadas como débitos en el libro mayor del DFSP Pagador y créditos en el libro mayor del DFSP Beneficiario

    - Todas las Solicitudes de transferencia como débitos provisionales en el libro mayor del DFSP Pagador. Esos débitos provisionales se eliminan cuando la Transferencia se completa mediante fulfilment, la rechaza el DFSP Beneficiario o expira.

    - \[_Solo en la opción de liquidación neta_\] Las Anotaciones de Liquidación entregadas al Banco liquidador del Esquema de pagos y aceptadas por él para ese DFSP.

    - \[_Solo en la opción de liquidación bruta continua_\] Las transferencias que los DFSP hacen hacia y desde la cuenta bancaria de Liquidación Común del Esquema de pagos.

- La Posición del Libro mayor del DFSP es la suma de todos los elementos enumerados arriba. Se usa en el Proceso de Aprobación de la Transferencia.

#### 5.1.3 Proceso del Límite de débito neto

- El Límite de débito neto de un DFSP es un valor que la Plataforma usa durante el Proceso de Aprobación de la Transferencia. El Débito Neto de un DFSP es la suma de:

    - \[_Solo en la Opción de liquidación neta_\] Un valor fijado por el esquema de pagos que pretende representar los fondos que el DFSP tiene disponibles en su Cuenta en el Banco liquidador

Tenga en cuenta que el esquema de pagos puede automatizar el cálculo del valor descrito arriba, o puede optar por introducirlo manualmente en la sección del Operador de la Plataforma del Portal del Esquema de pagos.

- El Margen del Esquema de pagos para ese DFSP. Es un valor, determinado por el Esquema de pagos, específico de un DFSP dado. Ese valor puede ser un porcentaje de la Posición del Libro mayor del DFSP o puede ser un valor absoluto. El Esquema de pagos puede cambiar el Margen del Esquema de pagos de cualquier DFSP a su discreción. Puede tener el efecto de aumentar o de reducir la capacidad de un DFSP de ejecutar transacciones.

- El Margen Discrecional del DFSP. Es un valor, determinado por cada DFSP, que reduce el valor absoluto del Límite de débito neto. El Margen Discrecional del DFSP se fija dentro de los parámetros admisibles definidos por el Esquema de pagos. Esto tiene el efecto de reducir la capacidad del DFSP de ejecutar transacciones.

#### 5.1.4 Proceso de Aprobación de la Transferencia 

- Aprobación de la Transferencia. Cuando la Plataforma recibe una Solicitud de transferencia de un DFSP Pagador, la Plataforma aprobará o rechazará la solicitud comparando el monto de la transferencia solicitada con la Posición Actual del Libro mayor del DFSP Pagador menos el Límite de débito neto del DFSP Pagador.

- Si la transferencia solicitada es inferior a esa suma, la Plataforma reenviará la solicitud al DFSP Beneficiario. Si es superior al valor del Límite de débito neto, la Plataforma rechazará la solicitud y la devolverá al DFSP Pagador.

#### 5.1.5 Proceso de Contabilización de la Liquidación

- \[_Solo en la opción de liquidación neta_\] El esquema de pagos definirá los parámetros de las Ventanas de liquidación que use el esquema de pagos; esto incluirá la frecuencia de las ventanas u otros parámetros (límites de valor, etc.) elegidos para definir las ventanas de liquidación.

- \[_Solo en la opción de liquidación neta_\] Al final de cada ventana de liquidación definida, la Plataforma calculará la posición neta de liquidación de cada DFSP: esa posición es el saldo del Libro mayor de posiciones del DFSP. Esos saldos se convierten en las Anotaciones de Liquidación de esa ventana.

- \[_Solo en la opción de liquidación neta_\] La Plataforma enviará las Anotaciones de Liquidación de cada DFSP al Banco liquidador elegido por el esquema de pagos

- \[_Solo en la opción de liquidación neta_\] El Banco liquidador contabilizará las Anotaciones de Liquidación en la Cuenta en el Banco liquidador de cada DFSP, y enviará a la Plataforma la confirmación de que este proceso se ha completado.

Las reglas del esquema de pagos tendrán que contemplar disposiciones y procedimientos para el caso de que falle el proceso descrito arriba.

#### 5.1.6 Proceso de Gestión de la Cuenta de Liquidación

- \[_Opción de liquidación neta_\] Los DFSP pueden agregar fondos a su Cuenta en el Banco liquidador del Esquema de pagos a su discreción. El Esquema de pagos dará instrucciones sobre cómo hacerlo. \[_Opción de liquidación bruta continua_\] Los DFSP pueden transferir fondos a la Cuenta Bancaria de Liquidación Común del Esquema de pagos a su discreción. El Esquema de pagos dará instrucciones sobre cómo hacerlo.

- \[_Solo en la opción de liquidación bruta continua_\] El Esquema de pagos proporcionará a los DFSP un informe de fin de día que muestre su cuota de propiedad en la Cuenta Bancaria de Liquidación Común del Esquema de pagos.

- Los DFSP pueden solicitar el retiro de fondos de su \[_Opción de liquidación neta_\] Cuenta en el Banco liquidador a través del Portal del Esquema de pagos \[_Opción de liquidación bruta continua_\] Los DFSP pueden solicitar el retiro de fondos de la Cuenta Bancaria de Liquidación Común del Esquema de pagos a través del Portal del Esquema de pagos. El esquema de pagos revisará el retiro solicitado y, si lo aprueba, ejecutará la transferencia en nombre del DFSP. El propósito de esta revisión es asegurar que la cuota del DFSP en la Cuenta en el Banco liquidador sea suficiente para respaldar las Transferencias en curso: esta aprobación no se denegará de forma irrazonable.

#### 5.1.7 Reporte de liquidación del Esquema de pagos 

- El esquema de pagos proporcionará, a través del Portal del Esquema de pagos para DFSP, información para los DFSP que incluye, para cada DFSP:

    - El Límite de débito neto actual y sus componentes

    - La Posición del Libro mayor actual y sus componentes, incluidas las Transferencias completadas de todos los DFSP y las Transferencias Provisionales de los DFSP Pagadores

    - Alertas en ciertos niveles de la Posición Actual del Libro mayor: esos niveles los determinarán los DFSP o el Esquema de pagos de vez en cuando

- Herramientas que permitan a los DFSP prever su volumen de transferencias esperado a partir de datos históricos

### 5.2 Liquidación de tarifas: tarifas de procesamiento

Esta sección aún no se ha escrito.

### 5.3 Liquidación de tarifas: tasas de intercambio

Esta sección aún no se ha escrito.

## 6. El Servicio de Gestión del Esquema de pagos

::: tip NOTA
Hay un Servicio del Operador de la Plataforma paralelo que es necesario para la operación de la plataforma y que no se describe en este documento.
:::

### 6.1 Descripción del Servicio de Gestión del Esquema de pagos

- El Esquema de pagos proporciona el Servicio de Gestión del Esquema de pagos para ayudar a los DFSP en su uso de los Servicios del Esquema de pagos. Muchas de estas funciones se proporcionan a través del Portal del Esquema de pagos, que se pone a disposición de los DFSP del Esquema de pagos.

- Los siguientes procesos forman parte del Servicio de Gestión del Esquema de pagos:

### 6.2 El proceso de registro

- El proceso de registro permite la solicitud de participación del DFSP y su incorporación operativa y técnica. Cubre las siguientes áreas:

    - Formularios y procesos para la solicitud de Participación del DFSP en el Esquema de pagos.

    - Formularios y procesos para obtener certificados digitales y firmas digitales para usarlos con la Plataforma.

    - Procesos para descargar los artefactos de software que proporciona el Esquema de pagos, incluidos los SDK y las API.

    - Procesos para probar la preparación técnica para acceder a la Plataforma y a los Servicios.

    - Procesos para recibir la aprobación y la certificación del Esquema de pagos para acceder a la Plataforma y a los Servicios.

### 6.3 Servicio al cliente del DFSP

- El esquema de pagos proporcionará a los DFSP una mesa de ayuda tanto en línea como telefónica.

- El Portal del Esquema de pagos proporcionará medios por los que los DFSP puedan designar administradores y usuarios del Portal, y actualizar la información del Perfil del DFSP.

### 6.4 Gestión del sistema del Esquema de pagos

- El esquema de pagos proporcionará, a través del Portal del Esquema de pagos, medios por los que los DFSP puedan ver su Libro mayor de posiciones actual, su Límite de débito neto y su actividad reciente e histórica con el Esquema de pagos.

- El esquema de pagos proporcionará, a través del Portal del Esquema de pagos, medios por los que los DFSP puedan usar datos históricos, incluidos los históricos de sus Posiciones y de su Límite de débito neto, para prever los volúmenes próximos y los niveles de financiamiento de la liquidación necesarios.

- El esquema de pagos proporcionará medios por los que los DFSP puedan obtener actualizaciones de los artefactos de software que hayan descargado antes.

- El esquema de pagos proporcionará, a través del Portal del Esquema de pagos, medios por los que los DFSP puedan solicitar un retiro de su cuota de la Cuenta en el Banco liquidador del Esquema de pagos.

- El esquema de pagos proporcionará, a través del Portal del Esquema de pagos, medios por los que los DFSP puedan ver su cuota del saldo de la Cuenta en el Banco liquidador del Esquema de pagos.

## 7. El Servicio de Gestión del Fraude

_Esta sección aún no se ha escrito, pero se espera que incluya las
siguientes secciones:_
    
1. _Descripción de la Utilidad de Gestión del Fraude: propósito y alcance_

2. _La Base de Datos Compartida de Transacciones_

3. _Esquema de Categorización del Fraude_

4. _Reporte de Actores o Transacciones Conocidos como Maliciosos_

5. _Algoritmos y Procesos de Detección de Anomalías y de Fraude_

6. _Reporte de los DFSP_

7. _Opciones de Interceptación de Transacciones en Tiempo Real_

## 8. Apéndice: Casos de uso admitidos por el Esquema de pagos y parámetros del sistema

_Esta es la misma tabla que aparece en el documento de Reglas de Negocio, pero se le han agregado los códigos sistémicos necesarios para que la Plataforma reconozca una transacción como perteneciente a un caso de uso o caso de uso secundario dado. Un esquema de pagos solo definiría Casos de Uso Secundarios si quisiera escribir reglas o especificar tarifas que sean exclusivas de ese Caso de Uso Secundario._

_Esta tabla es un ejemplo de una tabla de Casos de Uso y Casos de Uso Secundarios que un esquema de pagos podría admitir._

| Código del caso de uso | Caso de uso | Caso de uso secundario | Elementos de datos obligatorios | Otros métodos de determinación del caso de uso |
| :--- | :----- | :--------- | :-------------------------- | :------------------------------------------- |
| 1.0  | P2P  | Persona a persona | Configuración de la API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Consumer</br> | |
| 1.1 | P2P | Billetera a billetera | El Tipo de cuenta transaccional del DFSP Pagador es Billetera y el del DFSP Beneficiario es Billetera |
| 1.2 | P2P | Banco a banco | El Tipo de cuenta transaccional del DFSP Pagador es Banco y el del DFSP Beneficiario es Billetera |
| 1.3 | P2P | Billetera a banco | El Tipo de cuenta transaccional del DFSP Pagador es Billetera y el del DFSP Beneficiario es Banco |
| 1.4 | P2P | Banco a billetera |  El Tipo de cuenta transaccional del DFSP Pagador es Banco y el del DFSP Beneficiario es Billetera. |
| 2.0 | Pago masivo | | Configuración de la API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Consumer</br> |
| 2.1 | B2P | Banco a banco | Initiator Type = Business |
| 2.2 | G2P | Gobierno a persona | Initiator Type = Government |
| 3.0 | P2B | Persona a empresa | Configuración de la API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Business</br> |
| 3.1 | P2B | Compra con número de caja | Initiator Type = Device | |
| 3.2 | P2B | Compra con código QR | por determinar | |
| 3.3 | P2B | Compra en línea | Merchant ID Code = por determinar | |
| 3.4 | P2B | Pago de facturas | | por determinar: un elemento de datos de la Solicitud de cotización incluirá el número de cuenta del Pagador en el emisor de la factura |
| 3.5 | P2B | Persona a empresa - Otros | | | 
| 4.0 | P2G | | Configuración de la API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Government</br> | 
| 4.1 | P2G | Persona a gobierno | | |
| 4.1 | P2G | Compra con número de caja | Initiator Type = Device | |
| 4.2 | P2G | Compra con código QR | por determinar | |
| 4.3 | P2G | Compra en línea | Merchant ID Code = por determinar | |
| 4.4 | P2G | Pago de facturas | | por determinar: un elemento de datos de la Solicitud de cotización incluirá el número de cuenta del Pagador en el emisor de la factura |

## 9. Apéndice: Códigos de categoría de comercio

_El esquema de pagos querrá especificar códigos para reconocer el tipo de comercio al que se paga. El término "comercio" se usa aquí en sentido amplio para incluir todos los tipos de aceptadores de pagos que no son consumidores. Un esquema de códigos de categoría de comercio podría querer reconocer industrias, ámbitos (tiendas presenciales frente a remotas o en línea) o el tamaño del comercio._
