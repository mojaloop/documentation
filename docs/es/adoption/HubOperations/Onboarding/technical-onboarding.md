---
i18n_source_sha: 4ab90a3735d57fdbeaa4c8bc511bc5e524e0cfb7
---

# Incorporación técnica de los DFSP

A alto nivel, incorporarse a un Hub de Mojaloop exige que un DFSP centre sus esfuerzos en torno a los siguientes hitos principales:

* [Integrar](#integracion-de-la-api) su backend central con el Hub de Mojaloop a nivel de API (esto implica tanto programar como probar).
* [Conectarse](#conectarse-a-los-entornos-de-mojaloop) a los entornos previos a producción y de producción siguiendo los rigurosos requisitos de seguridad de Mojaloop.

Además de los pasos que requieren la participación del DFSP, el Operador del Hub también debe realizar algunas actividades de incorporación en su [backend](#incorporacion-en-el-backend-del-hub), con independencia de los DFSP.

Esta sección ofrece una descripción general de alto nivel de todos estos hitos.

## Integración de la API

Dentro del contexto de la API de Interoperabilidad de Proveedores de Servicios Financieros (FSPIOP) de Mojaloop, una transferencia ocurre en tres pasos principales:

1. Identificar al Beneficiario (fase de búsqueda de partes o de descubrimiento)
1. Acordar la transferencia (fase de cotización o de acuerdo)
1. Ejecutar la transferencia (fase de transferencia)

Para más detalles sobre cada una de estas fases, consulte el **Módulo 2 - Demostración estática: un ejemplo de extremo a extremo** del [curso de formación de Mojaloop](https://learn.mojaloop.io/) **MOJA-102**.

Estas tres fases se corresponden con los recursos clave de la API FSPIOP de Mojaloop:

* **Servicio de búsqueda de partes**: identificar al DFSP que atiende al Beneficiario y al propio Beneficiario (= quien recibe los fondos en una transacción) a partir de un identificador del Beneficiario (normalmente un MSISDN, es decir, un número de celular).
* **Servicio de cotizaciones**: solicitar una cotización e intercambiar la prueba criptográfica para preparar y asegurar la transferencia. Una cotización es un contrato entre un DFSP Pagador y un DFSP Beneficiario para una transacción financiera concreta, antes de que la transacción se realice. Garantiza el acuerdo que fijan los DFSP Pagador y Beneficiario sobre el Pagador, el Beneficiario y el monto de la transferencia, y es válida durante la vida de una cotización y de la transferencia de una transacción financiera determinada.
* **Servicio de transferencias**: ejecutar la transacción conforme a los detalles acordados y a la prueba criptográfica.

Los DFSP pueden optar por:

* conectarse directamente al Hub de Mojaloop e implementar la versión asíncrona de Mojaloop de estos servicios de API, o 
* apoyarse en un componente de integración de código abierto (el [Mojaloop-SDK](#mojaloop-sdk) o [Payment Manager OSS](#payment-manager-oss)) e implementar una versión simplificada y síncrona de los servicios de la API FSPIOP de Mojaloop

Los DFSP que tengan un equipo de desarrollo interno y experiencia con API RESTful probablemente podrán gestionar el proceso internamente y desarrollar una conexión directa con Mojaloop. Sin embargo, se recomienda que los DFSP usen uno de los componentes de integración de código abierto, ya que una conexión directa requiere desarrollar y mantener código adicional. Usar el Mojaloop-SDK o Payment Manager OSS reduce el tiempo que lleva integrarse con el Hub de Mojaloop y facilita la resolución de problemas al Operador del Hub, lo que reduce el costo global del sistema.

Mientras el DFSP realiza el trabajo de desarrollo por su cuenta, el papel del Operador del Hub consiste en responder preguntas puntuales sobre los detalles de la API o, según la herramienta de código abierto elegida y el modelo de despliegue acordado, puede llegar incluso a encargarse de parte del desarrollo.

### Herramientas de código abierto que facilitan la integración de la API

#### Mojaloop-SDK

El [Mojaloop-SDK](https://github.com/mojaloop/sdk-scheme-adapter) presenta al sistema backend de un DFSP una versión simplificada y síncrona de la API FSPIOP de Mojaloop, lo que permite a los DFSP implementar internamente una API sencilla con la que interactuar con el Hub de Mojaloop, sin dejar de cumplir la especificación de la API FSPIOP de Mojaloop para las comunicaciones externas interoperables. 

El patrón asíncrono de la API FSPIOP de Mojaloop (aunque tiene muchas ventajas) puede no ser adecuado para las aplicaciones cliente que operan en modo síncrono de solicitud-respuesta. El Mojaloop-SDK ayuda a salvar esa distancia ofreciendo una API de solicitud-respuesta simplificada, que abstrae de los clientes finales la complejidad de componer varias solicitudes y los detalles de la API asíncrona.

![Mojaloop-SDK](../../../../.vuepress/public/mojaloop-sdk.png)

El Mojaloop-SDK debe descargarse desde [GitHub](https://github.com/mojaloop/sdk-scheme-adapter) al entorno del DFSP e integrarse en su backend. Se proporciona como imagen de contenedor Docker, y puede alojarse en la misma infraestructura que la aplicación bancaria central o en una máquina virtual aprovisionada específicamente para ello. El mantenimiento continuo puede requerir cierto soporte especializado de un Integrador de Sistemas formado en el software.

Además de una API simplificada, el Mojaloop-SDK también proporciona "listos para usar" los protocolos de seguridad que exige Mojaloop, dando a sus usuarios una interfaz de configuración simplificada. Esta característica del Mojaloop-SDK ayuda con el [paso de conexión](#conectarse-a-los-entornos-de-mojaloop) de la incorporación.

#### Payment Manager OSS

[Payment Manager OSS](https://pm4ml.github.io/documents/payment_manager_oss/latest/core_connector_rest/introduction.html) presenta al sistema backend de un DFSP una versión simplificada, síncrona y orientada a casos de uso de la API FSPIOP de Mojaloop. El componente clave de integración de Payment Manager se llama Core Connector, y actúa como traductor entre el backend central de un DFSP (CBS) y un componente de Payment Manager (llamado Mojaloop Connector, que se apoya en el Mojaloop-SDK) que habla directamente con el Hub de Mojaloop. 

![Payment Manager OSS](../../../../.vuepress/public/PM4ML_system_architecture.png)

Core Connector está construido en Apache Camel, un lenguaje declarativo basado en Java para ingenieros de integración que no requiere escribir código desde cero. Hay disponible una plantilla de Core Connector ya hecha para simplificar el esfuerzo de desarrollo. La plantilla proporciona una base de código de partida para los endpoints de la API que hay que desarrollar, y debe personalizarse para alinearla con la tecnología de CBS correspondiente. La flexibilidad que da la plantilla permite adaptar Core Connector al backend de un DFSP, y no al revés. 

El esfuerzo de personalizar una plantilla de Core Connector variará según la opción de despliegue elegida. Al desplegar Payment Manager hay dos opciones disponibles:

* **Gestionado y alojado por un Integrador de Sistemas**: un Integrador de Sistemas despliega Payment Manager en la nube y sincroniza la plantilla de Core Connector con la implementación del backend central del DFSP.
* **Autoalojado por el DFSP**: el DFSP despliega Payment Manager en sus instalaciones o en la nube, y la personalización de la plantilla de Core Connector pueden hacerla distintos actores (según el resultado de una evaluación inicial de las capacidades del DFSP):
    * el Integrador de Sistemas
    * el Integrador de Sistemas y el proveedor de la solución de backend central del DFSP
    * el DFSP y el proveedor de la solución de backend central del DFSP

Payment Manager se proporciona como un conjunto de imágenes de contenedor Linux (Docker) y puede alojarse en las instalaciones usando infraestructura de servidores estándar o en una infraestructura en la nube adecuada, cuando esté disponible.

Si el Operador del Hub así lo decide, puede asumir el rol de Integrador de Sistemas.

Dado que Payment Manager incorpora la funcionalidad del Mojaloop-SDK, también implementa la capa de seguridad que exige Mojaloop. Esta característica de Payment Manager ayuda con el [paso de conexión](#conectarse-a-los-entornos-de-mojaloop) de la incorporación.

## Conectarse a los entornos de Mojaloop

Una vez que el DFSP ha terminado de programar, prueba su integración contra una instancia de laboratorio en un entorno de pruebas que proporciona el Hub. Aquí empieza la fase de conexión del recorrido de incorporación técnica, con un nuevo conjunto de responsabilidades para el Operador del Hub. 

Los requisitos en torno a la conexión los dictan los múltiples protocolos de seguridad que todo Hub de Mojaloop y todo DFSP participante deben implementar:

* TLS bidireccional con autenticación mutua X.509
* Autenticación OAuth 2.0 para las sesiones a través del gateway de API del Hub
* Listas blancas basadas en direcciones IP en las reglas de firewall y en los gateways de API
* Firma de los mensajes mediante JSON Web Signature (JWS)
* Firma y validación de paquetes del Interledger Protocol (ILP)

Si le interesan más detalles, consulte [La seguridad en Mojaloop](#la-seguridad-en-mojaloop).

Llevar a la práctica las medidas de seguridad anteriores requiere compartir mucha información y una configuración técnica extensa por parte de distintos equipos, tanto del DFSP como del Hub de Mojaloop. Hay herramientas de código abierto a disposición de la comunidad para facilitar este proceso, tanto para los DFSP como para el Operador del Hub. 

### Herramientas de código abierto que facilitan la conexión a los entornos de Mojaloop

#### Mojaloop-SDK

El Mojaloop-SDK implementa componentes estándar que establecen una forma uniforme de conectar los sistemas de los DFSP con un Hub de Mojaloop. Implementa la siguiente funcionalidad de seguridad conforme a Mojaloop:

* TLS bidireccional con autenticación mutua X.509
* Firma de los mensajes mediante JSON Web Signature (JWS)
* Generación del paquete del Interledger Protocol (ILP), con firma y validación

El Mojaloop-SDK puede descargarse desde [GitHub](https://github.com/mojaloop/sdk-standard-components) y alojarse en la misma infraestructura que la aplicación bancaria central del DFSP o en una máquina virtual aprovisionada específicamente para ello. Tras generar, firmar e intercambiar los certificados TLS y JWS, los DFSP deben configurar en el Mojaloop-SDK las variables de entorno relativas a TLS y a JWS. Por último, instalar los certificados en los firewalls y en el gateway de API del DFSP completa la parte del proceso relativa a la configuración de certificados.

Obtener las credenciales del gateway de API del Hub necesarias para recoger tokens OAuth 2.0 y configurarlas en el Mojaloop-SDK mediante variables de entorno debe hacerse manualmente.

Intercambiar los detalles de los endpoints con el Hub y configurarlos en el Mojaloop-SDK mediante variables de entorno, así como en las listas blancas del firewall y del gateway, también son pasos manuales.

#### Payment Manager OSS

Payment Manager OSS proporciona todas las funcionalidades de seguridad que proporciona el Mojaloop-SDK, y más. Payment Manager viene con un Cliente de Mojaloop Connection Manager (MCM), que simplifica y automatiza la creación, la firma y el intercambio de certificados, así como la configuración de las conexiones necesarias con los distintos entornos. Cuánto de estos procesos está automatizado variará según la opción de despliegue elegida. Hay dos opciones disponibles:

* **Gestionado y alojado por un Integrador de Sistemas**: un Integrador de Sistemas despliega Payment Manager en la nube. 
* **Autoalojado por el DFSP**: el DFSP despliega Payment Manager en sus instalaciones o en la nube.

Cuando un DFSP opta por la **opción gestionada y alojada**, el Integrador de Sistemas (rol que puede ocupar el Operador del Hub) puede emplear Infraestructura como Código y scripts de incorporación para encargarse de forma automatizada de los siguientes elementos del proceso:

* la generación, la firma, la configuración y la instalación de los certificados TLS
* la inclusión de direcciones IP en las listas blancas de los firewalls y de los gateways de API
* la generación y la configuración del secreto o la clave de cliente necesarios para obtener tokens OAuth 2.0

Los pasos relativos a los certificados JWS se llevan a cabo a través del [portal Connection Wizard](https://pm4ml.github.io/documents/payment_manager_oss/latest/connection_wizard/index.html), un portal fácil de usar que Payment Manager ofrece para gestionar de forma guiada los procesos relativos a certificados y endpoints. Los DFSP y el Operador del Hub deben generar los certificados JWS con la herramienta que prefieran y luego compartir sus claves públicas a través del portal Connection Wizard. Configurar los certificados JWS en Payment Manager se hace a través del portal Connection Wizard, mientras que instalarlos en los gateways es un paso manual.

Cuando un DFSP opta por la **opción autoalojada**, usa el [portal Connection Wizard](https://pm4ml.github.io/documents/payment_manager_oss/latest/connection_wizard/index.html) para gestionar de forma semiautomatizada los pasos relativos a certificados y endpoints:

* Los DFSP introducen los detalles de sus endpoints y obtienen los del Hub desde el portal. Luego configuran esa información en Payment Manager mediante variables de entorno, así como manualmente en las listas blancas del firewall y del gateway.
* Los DFSP generan, firman y configuran los certificados TLS con un clic a través del portal Connection Wizard.
* Los DFSP generan los certificados JWS con la herramienta que elijan y los comparten y configuran en Payment Manager con un clic en el portal Connection Wizard.

Obtener las credenciales del gateway de API del Hub necesarias para recoger tokens OAuth 2.0 y configurarlas en Payment Manager mediante variables de entorno debe hacerse manualmente.

#### MCM

El producto Mojaloop Connection Manager (MCM) es fundamental para simplificar y automatizar buena parte del intercambio de información y de la configuración en torno a los endpoints y los certificados. MCM tiene un componente Cliente MCM y un componente Servidor MCM, que hablan entre sí al intercambiar detalles de endpoints y certificados, y al firmar Solicitudes de Firma de Certificado. 

El Cliente MCM está incorporado en Payment Manager, mientras que el Servidor MCM está dentro de los límites del Hub. MCM ofrece un portal para que el Operador del Hub envíe la información de los endpoints y los certificados del Hub, y para recuperar los detalles de endpoints y certificados del DFSP que este haya enviado a través de Payment Manager.

### La seguridad en Mojaloop

Para entender en detalle qué implica conectar un DFSP a un entorno de Mojaloop, es importante examinar más de cerca los requisitos de seguridad de Mojaloop.

Esta sección describe los protocolos que protegen la comunicación entre los DFSP y el Hub de Mojaloop. Para orientación sobre cómo evaluar el hardware y el entorno anfitrión dentro del dominio del DFSP, consulte [la orientación de arquitectura de seguridad para la infraestructura de los DFSP, disponible en inglés](../../../../product/features/dfsp-infrastructure-security.md).

Mojaloop exige implementar las siguientes medidas de seguridad para proteger los datos que se intercambian entre los DFSP:

* **Transport Layer Security** es un mecanismo seguro para intercambiar una clave simétrica compartida a través de una red entre dos pares anónimos, con verificación de identidad (es decir, certificados de confianza). Proporciona confidencialidad (nadie ha leído el contenido) e integridad (nadie ha cambiado el contenido). Mojaloop exige autenticación mutua TLS bidireccional usando certificados X.509 para asegurar las conexiones bidireccionales. Los DFSP y el Hub de Mojaloop se autentican entre sí para asegurar que ambas partes de la comunicación son de confianza. Ambas partes comparten sus certificados públicos entre sí y luego se realiza la verificación o validación a partir de ellos. 
* Otra medida de seguridad que se ofrece para la autenticación son los **tokens OAuth** que los DFSP deben usar al hacer una solicitud de llamada a la API. OAuth 2 se usa para dar acceso basado en roles a los endpoints del Hub de Mojaloop (autorización de la API).
* Las **listas blancas de direcciones IP** reducen la superficie de ataque del Hub de Mojaloop.
* Para proteger el nivel de aplicación, Mojaloop implementa **JSON Web Signature (JWS)** tal como se define en el [RFC 7515 (JSON Web Signature (JWS))](https://tools.ietf.org/html/rfc7515), el estándar de integridad y no repudio. Firmar los mensajes asegura que el DFSP Pagador y el DFSP Beneficiario puedan confiar en que los mensajes que se intercambian no han sido modificados por un tercero. 
* La API FSPIOP de Mojaloop implementa soporte para el **Interledger Protocol (ILP)**. ILP se construye sobre el concepto de transferencias condicionales, en las que los libros mayores implicados en una transacción financiera del Pagador al Beneficiario pueden primero reservar fondos de una cuenta del Pagador y después confirmarlos en la cuenta del Beneficiario. La transferencia de la cuenta del Pagador a la del Beneficiario está condicionada a la presentación de un fulfilment que satisfaga la condición adjunta a la solicitud de transferencia original. 

![Descripción general de la seguridad](../../../../.vuepress/public/security_overview.png)

Las siguientes secciones ofrecen información de contexto sobre los pasos que implica conectarse a un entorno de Mojaloop. La información se ha escrito de manera que los DFSP y el Hub puedan apoyarse en las buenas prácticas de PKI y en las herramientas y tecnologías propietarias que prefieran o a las que tengan acceso.

::: tip
Como se ha mencionado arriba, usando Payment Manager OSS, Mojaloop Connection Manager (MCM) y la Infraestructura como Código (IaC) que despliega los componentes que conforman el ecosistema de Mojaloop, muchos de los pasos de los procesos que se describen a continuación pueden hacerse de forma automatizada.
:::

#### Crear y compartir certificados

##### Certificados TLS

La autenticación TLS bidireccional o mutua (mTLS) se basa en que ambas partes (cliente y servidor) compartan entre sí sus certificados públicos y realicen la verificación o validación a partir de ellos.

Los siguientes pasos de alto nivel describen cómo se establece la conexión y cómo se transfieren los datos entre un cliente y un servidor en el caso de mTLS:

1. El cliente solicita un recurso protegido por el protocolo HTTPS y comienza el proceso de handshake SSL/TLS.
1. El servidor devuelve su certificado público al cliente junto con un server hello. 
1. El cliente valida y verifica el certificado recibido. En el caso de los certificados firmados por una CA, el cliente lo verifica a través de la Autoridad de Certificación (CA).
1. Si el certificado del servidor se validó correctamente, el servidor solicita el certificado del cliente.
1. El cliente proporciona su certificado público al servidor.
1. El servidor valida y verifica el certificado recibido. En el caso de los certificados firmados por una CA, el servidor lo verifica a través de la Autoridad de Certificación.

Una vez completado el proceso de handshake, el cliente y el servidor se comunican y transfieren datos entre sí, cifrados con las claves secretas que compartieron durante el handshake. 

<img src="../../../../.vuepress/public/TLS_connection.svg" width="65%" height="65%" />

El proceso anterior requiere que, antes de conectarse a cualquier entorno (previo a producción o de producción), el DFSP y el Hub de Mojaloop completen cada uno los siguientes pasos.

1. Crear un certificado de servidor firmado por su CA.
1. Compartir su certificado de servidor y su cadena de CA con la otra parte.
1. Instalar la cadena de CA de la otra parte en su firewall saliente (la validación y la verificación se harán contra esos certificados instalados).
1. Generar una Solicitud de Firma de Certificado (CSR) para su certificado de cliente TLS y compartirla con la otra parte.
1. Firmar la CSR de la otra parte usando su CA.
1. Compartir el certificado de cliente firmado, así como el certificado raíz de su CA, con la otra parte.
1. Instalar su propio certificado de cliente firmado por la CA de la otra parte en su gateway de API saliente.
1. Instalar el certificado raíz de la CA de la otra parte en su gateway de API saliente.

##### Certificados JWS

Siempre que un cliente de API envía un mensaje de API a una contraparte, el cliente de API debería firmar el mensaje con su clave privada JWS. Cuando la contraparte recibe el mensaje de API, debe validar la firma con la clave pública JWS de la parte emisora. La parte receptora usa JWS para validar que el mensaje vino del emisor esperado y que no se ha modificado en tránsito.

El proceso anterior requiere que todos los DFSP y el propio Hub de Mojaloop tengan un certificado JWS y que, antes de conectarse a cualquier entorno (previo a producción o de producción), el DFSP y el Hub de Mojaloop completen cada uno los siguientes pasos.

1. Crear un almacén de claves (para guardar su certificado y su clave privada), un par de claves asimétricas (una clave pública y una privada) y un certificado asociado que le identifique.
1. Compartir su clave pública JWS.
1. Instalar la clave pública JWS de las demás partes (el Hub y todos los demás DFSP) en su gateway entrante.
1. Instalar su clave privada JWS en su gateway saliente.

#### Compartir la información de los endpoints

El Hub de Mojaloop y los DFSP comparten la información de los endpoints para:

* incluir las direcciones IP públicas de la otra parte en las listas blancas de las reglas de firewall, con el fin de permitir el tráfico
* configurar las URL de callback de la otra parte en los gateways de API

Normalmente, el acceso a todo el tráfico entrante y saliente de un DFSP lo controlará el equipo de Seguridad correspondiente. El firewall del DFSP tiene que configurarse adecuadamente:

* para acceder al Hub de Mojaloop en cualquier entorno en el que el DFSP y el Hub interactúen, y 
* para que el Hub de Mojaloop pueda hacer callbacks al DFSP 

Aparte del acceso hacia y desde el Hub desplegado en un entorno, debería bloquearse todo el demás acceso público para impedir cualquier acceso no autorizado o injustificado.

En consecuencia, el acceso al Hub de Mojaloop también está regulado. Los DFSP tienen que compartir su IP o rango de IP desde el que se harán las llamadas al Hub, para que el firewall del Hub pueda configurarse adecuadamente. El equipo de Seguridad del DFSP debería poder facilitar esa información.

#### Obtener un token OAuth

El Hub de Mojaloop emplea tecnologías WSO2 para la integración entre el Hub y los DFSP, y para ofrecer un gateway a los DFSP. Para conectarse a los distintos entornos del Hub, los DFSP deben obtener acceso a WSO2. WSO2 ofrece un portal API Store en el que los DFSP pueden crear cuentas del gateway de API para el acceso a nivel de aplicación, suscribirse a las API y obtener tokens OAuth para usarlos al interactuar con el Hub de Mojaloop.

## Incorporación en el backend del Hub

La incorporación consta de ciertos pasos que no requieren ninguna acción de los DFSP y que son responsabilidad exclusiva del Operador del Hub. Esos pasos son los siguientes:

1. Configurar los gateways de API del Hub que gestionan los flujos de datos entrantes y salientes desde y hacia los DFSP. Mojaloop emplea tecnologías WSO2 para el acceso al gateway, así como para la autorización y la autenticación de los DFSP en el paso de mensajes a través de los gateways. La pila de productos WSO2 puede desplegarse desde código usando una solución de integración y despliegue continuos (CI/CD), y el aprovisionamiento puede hacerse mediante scripts de automatización.
1. Crear usuarios y cuentas, y configurar el control de acceso basado en roles.
1. Preparar el Hub para gestionar los casos de uso que admite el Esquema de pagos:
    - Configurar los libros mayores del Hub.
    - Configurar los correos electrónicos de notificación del Hub.
    - Configurar el modelo de liquidación.
    - Incorporar los oráculos. \
    Mojaloop proporciona un [script de aprovisionamiento](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/provisioning/MojaloopHub_Setup) para realizar de forma automatizada todos los pasos anteriores usando el [Mojaloop Testing Toolkit (TTK)](https://github.com/mojaloop/ml-testing-toolkit).
1. Preparar DFSP simuladores para las actividades de validación iniciales. \
   Mojaloop proporciona [scripts de aprovisionamiento](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/provisioning/MojaloopSims_Onboarding) para realizar este paso de forma automatizada usando el Mojaloop Testing Toolkit (TTK). 
1. Dar de alta a los DFSP en el backend del Hub. Para cada DFSP:
    - Agregar el DFSP y crearle una moneda.
    - Agregar las URL de callback de todos los servicios de la API.
    - Agregar un Límite de débito neto y fijar la Posición inicial en 0.
    - Configurar los correos electrónicos de notificación del DFSP. \
    Igual que en los pasos anteriores, la configuración de los detalles del DFSP también puede hacerse mediante un script de aprovisionamiento.

## Pruebas y validación

A medida que los DFSP avanzan en su recorrido de incorporación, deben realizar pruebas en cada entorno. Al probar hay que cumplir tanto la validación de negocio como los requisitos técnicos. Los detalles de la validación de negocio se definen en las Reglas del Esquema de pagos.

Estos son algunos ejemplos de las actividades de prueba que se espera que los DFSP realicen en los distintos entornos previos a producción:

* validación de la integración de extremo a extremo y de la capa de aplicación contra simuladores
* validación de la integración de extremo a extremo y de la capa de aplicación contra DFSP reales y colaboradores
* validación del proceso de liquidación
* validación de la configuración de seguridad
* validación de los Acuerdos de Nivel de Servicio (SLA) de tiempo de respuesta
* pruebas de rendimiento
