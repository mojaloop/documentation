---
i18n_source_sha: afb76ba6884d13bab87c8252355a81d4a503da1e
---

# Preguntas frecuentes

Este documento recoge algunas de las preguntas técnicas más frecuentes de la comunidad.

## 1. ¿Qué servicios se ofrecen?

En la actualidad, el equipo ofrece soporte para los componentes del Libro mayor central. Los componentes «DFSP» están obsoletos, por lo que resulta complicado instalar el entorno de extremo a extremo y realizar la configuración íntegra.

### 2. ¿Podemos conectarnos directamente a Pathfinder en un entorno de desarrollo?

Para el entorno local y de pruebas, le recomendamos que utilice en su lugar el servicio «mock-pathfinder». Pathfinder es un servicio de «pago por uso». 

Acceda al repositorio https://github.com/mojaloop/mock-pathfinder para descargar e instalar mock-pathfinder. Ejecute el comando npm «install» en el Directorio de mock-pathfinder para instalar las dependencias; a continuación, actualice Database_URI en el paso mock-pathfinder/src/lib/config.js.

### 3. ¿Debo registrar el valor «DFSP» a través de la URL http://central-directory/commands/register o tengo que actualizar la configuración en el archivo default.json?

Debe registrarse utilizando el API facilitado, mediante Postman o curl. El cliente utiliza el código de LevelOne. Es necesario implementar la versión Mojaloop actual con los scripts actuales de Postman.

### 4. ¿El estado del pod «pi3-kafka-0» sigue siendo «CrashLoopBackOff»?

- Más información sobre el contexto de la pregunta:

  Cuando intento obtener los registros del contenedor «centralledger-handler-admin-transfer», me aparece el siguiente error:
  Error del servidor (BadRequest): el contenedor «centralledger-handler-admin-transfer» del pod «pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9» está a la espera de iniciarse: PodInitializing
  Y el estado del pod «pi3-kafka-0» sigue siendo «CrashLoopBackOff».
  Para el despliegue, estoy utilizando un VPS en Ubuntu 16.04 con 12 GB de RAM, 2 vCores, 2,4 GHz y 50 GB de espacio en disco en OVH.

Al aumentar la memoria RAM a 24 GB y la CPU a 4, se resolvieron los problemas. Parece tratarse de un tiempo de espera agotado en Zookeeper debido al agotamiento de los recursos disponibles, lo que provocó el cierre de los Servicios.

### 5. ¿Por qué aparece un error cuando intentamos crear un nuevo «DFSP» a través de Admin?

Asegúrese de que está utilizando los scripts de Postman más recientes disponibles en el repositorio «https://github.com/mojaloop/mock-pathfinder».


### 6.  ¿Puedo distribuir los componentes «Mojaloop» entre diferentes máquinas físicas y máquinas virtuales?

Debería poder realizar la configuración en diferentes máquinas virtuales o físicas. La distribución depende en gran medida de sus requisitos y variaría en función de la implementación concreta. Utilizamos Kubernetes para facilitar la orquestación de contenedores. Esto nos permite programar los despliegues a través del entorno de ejecución Kubernetes en máquinas específicas si es necesario, así como solicitar recursos concretos cuando sea preciso. Los gráficos de Helm del repositorio de Helm pueden servir de guía para determinar la mejor forma de asignar y agrupar los componentes en su despliegue. Naturalmente, deberá actualizar las configuraciones para adaptarlas a su implementación personalizada.

### 7. ¿Podemos esperar que todos los Endpoints definidos en el documento API se implementen en el Mojaloop?

La Especificación Mojaloop, API, para transferencias y la implementación del Switch de Código abierto Mojaloop son líneas de trabajo independientes, aunque, obviamente, la implementación se basa en la Especificación. La implementación se llevará a cabo en función de los casos de uso priorizados para un plazo determinado y de los puntos finales necesarios para dar soporte a dichos casos de uso. Si algunos puntos finales no se consideran prioritarios, es posible que no se lleve a cabo su implementación. No obstante, considero que el objetivo es, a la larga, dar soporte a todos los puntos finales especificados, aunque ello pueda llevar tiempo. Gracias por la recopilación. Disponemos de algunos de ellos en el repositorio «postman» de la organización mojaloopGitHub.

### 8. ¿Almacena el Mojaloop la información sobre la cotización o el estado del iniciador del pago FSP?

Por el momento, la implementación Mojaloop de Código abierto *no* almacena información relacionada con las cotizaciones. Es responsabilidad del Pagador y del Beneficiario implicados en el proceso almacenar la información pertinente.

### 9. ¿Mojaloop se encarga de la validación del flujo de trabajo?

Por el momento no, pero podría suceder en el futuro. En cuanto a la correlación de solicitudes relacionadas con una transferencia concreta, puede consultar el punto final/recurso «Transacción» en la especificación para obtener más información al respecto. Además, puedo informarle de que se está trabajando en la especificación para que esta correlación resulte más clara y sencilla; es decir, para correlacionar las solicitudes de cotización y de transferencia que forman parte de una misma transacción.


### 10. ¿Cómo se inscribe una nueva parte en el Mojaloop?

No existe ningún método POST en el recurso /parties, tal y como se especifica en la sección 6.1.1 de la Definición API. Consulte la sección 6.2.2.3.`POST /participants/<Type>/<ID>` de la Definición API.

» _La solicitud HTTP `POST /participants/<Type>/<ID>` (o `POST /participants/<Type>/<ID>/<SubId>`) se utiliza para crear información en el servidor relativa a la identidad facilitada, definida por `<Type>`, `<ID>` y, opcionalmente, `<SubId>` (por ejemplo, POST_
  _/participantes/MSISDN/123456789 o POST /participants/EMPRESA/shoecompany/participante1). Consulte la sección 5.1.6.11 para obtener más información sobre el direccionamiento de una Parte._ ».

### 11. ¿Actúa el Participante en nombre de una cuenta de un cliente en un banco?

Para obtener más información al respecto, consulte este documento (apartado 3.2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.

» _En el API, un «Participante» equivale a un FSP que participa en un Esquema de interoperabilidad. El objetivo principal de los «Participantes» del recurso lógico API es que los FSP puedan averiguar en qué otro FSP se encuentra una Contraparte en una Transacción financiera interoperable. También se definen servicios para que los proveedores de servicios financieros (FSP) faciliten información a un sistema común._ »

En esencia, un participante es cualquier FSP que participe en el Esquema de pagos (por lo general, no es un cliente). Para la búsqueda de cuentas, se puede utilizar un servicio de directorio como *Pathfinder*, que permite la búsqueda de usuarios y la asignación correspondiente. Si no se dispone de dicho servicio de directorio, la Especificación ofrece una alternativa en la que el Switch aloja un Account Lookup Service (ALS), aunque los participantes deben registrar a las partes en dicho servicio. Ya he abordado este tema anteriormente. No obstante, cabe señalar aquí que el Switch no almacena los datos, sino únicamente la correspondencia entre un identificador y un «FSP», y que, a continuación, las llamadas para localizar a la parte se envían a ese «FSP». 

https://github.com/mojaloop/mojaloop-specification RELACIONADO CON EL NÚCLEO (Mojaloop):

Este repositorio contiene el conjunto de documentos de especificaciones de la iniciativa «Open API por FSP» sobre Interoperabilidad: mojaloop/mojaloop-specification.

### 12. ¿Cómo se registra un beneficiario de confianza en la cuenta de un pagador para evitar la OTP?

Para omitir la contraseña de un solo uso (OTP), la solicitud inicial en la ruta /transactionRequests por parte del Beneficiario puede configurarse mediante programación (o manualmente, si se prefiere) para que se apruebe sin necesidad de utilizar el Endpoint /autorizaciones (necesario para la aprobación mediante OTP). De hecho, es el «FSP» quien debe gestionar esto, no el «Switch». Este tema se aborda brevemente en la sección 6.4 de la especificación.

### 13. ¿Le aparece un error 404 al intentar acceder o cargar el archivo kubernetes-dashboard.yaml?

En el repositorio oficial de Kubernetes en GitHub, en la versión README.md, el enlace más reciente que debe utilizarse es el «https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml"». Asegúrese siempre de verificar los enlaces de terceros antes de proceder a la implementación. Las aplicaciones de Código abierto están en constante evolución.

### 14. Al instalar nginx-ingress para el equilibrio de carga y el acceso externo: ¿Error: no se ha encontrado ningún nombre de versión disponible?

Le rogamos que consulte la siguiente información, que aborda un problema similar. En resumen: lo más probable es que se trate de un problema relacionado con RBAC. Consulte la documentación para configurar Tiller con RBAC. En el enlace https://docs.helm.sh/using_helm/#role-based-access-control se explica esto con detalle. El problema registrado: helm/helm#3839.

### 15. Se ha producido el error «ImportError: librdkafka.so.1: no se puede abrir el archivo de objeto compartido: No existe tal archivo o directorio» al ejecutar el comando «`npm start».

He encontrado una solución aquí https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346

GitHub

ImportError: librdkafka.so.1: no se puede abrir el archivo de objeto compartido: No existe tal archivo o directorio · Incidencia n.º 65 · confluentinc/confluent-kafka-python
Utilizo Ubuntu 14, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. En primer lugar, deseo compilar la última versión estable (parece que es la 0.9.2) de librdkafka en /opt/librdkafka. curl
https://codeload.github.com/ede
...

A continuación se indican los pasos para volver a compilar librdkafka:

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>

cd librdkafka && ./configure && make && make install && ldconfig

A partir de ahí, puedo importar elementos sin necesidad de especificar LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
La biblioteca C/C++ de Apache Kafka. Contribuya al desarrollo de edenhill/librdkafka creando una cuenta en GitHub.

### 16. ¿Podemos utilizar Mojaloop como software de billetera móvil de código abierto o Mojaloop solo se dedica a la interoperabilidad?

Podemos utilizar Mojaloop para garantizar la interoperabilidad y dar soporte a las billeteras móviles y otras transferencias de dinero similares. No se trata de un software destinado a «DFSP» (ya existen proyectos de Código abierto que se ocupan de ello, como Finserv, etc.). «Mojaloop» está destinado principalmente a un «Hub/Switch» y «API» debe ser implementado por «DFSP». Sin embargo, no está pensado para gestionar carteras móviles como tales.

### 17. ¿Podría describir las empresas que colaboran en el despliegue y el soporte técnico de Mojaloop?

Mojaloop es un software y una especificación de Código abierto.

### 18. ¿Podría comentarnos algo sobre Mojaloop y la seguridad?

La especificación es bastante estándar y cuenta con buenos estándares de seguridad. Sin embargo, son los adoptantes y los responsables del Despliegue quienes deben aplicarlos. Además, estas medidas de seguridad deben combinarse con otras medidas de seguridad relacionadas con el funcionamiento y el Despliegue. Por otra parte, en los próximos meses se prestará especial atención a la perspectiva de seguridad para la comunidad de Código abierto.

### 19. ¿Cuáles son las ventajas de utilizar Mojaloop como plataforma de interoperabilidad?

Ventajas: En estos momentos, por ejemplo, un usuario del servicio de dinero móvil de Airtel solo puede realizar transferencias a otro usuario del mismo servicio. Con esta función, podrá realizar transferencias a cualquier proveedor de servicios financieros, como otro proveedor de dinero móvil, cualquier otra cuenta bancaria o cualquier comercio conectado al Hub, independientemente de su sistema de implementación. Solo es necesario que estén conectados al mismo Switch. Además, está diseñado para teléfonos no inteligentes (feature phones), por lo que todo el mundo puede utilizarlo.

### 20. ¿Cuáles son los principales retos a los que se enfrentan las empresas al utilizar Mojaloop?

En este momento, los principales retos giran en torno a las expectativas: las expectativas de los adoptantes de Mojaloop y lo que realmente es Mojaloop. Muchos adoptantes tienen una concepción diferente de lo que es Mojaloop y de sus capacidades. Si contaran con una comprensión adecuada, muchos de los retos actuales se verían mitigados.
Sí, el registro forense es una medida de seguridad que también sirve para fines de auditoría, lo que garantizará que exista un registro auditable de las acciones y que todo lo que constituya una posible acción relevante quede registrado y consolidado de forma segura tras su cifrado en varios niveles.

### 21. ¿Existe un sistema de registro y auditoría forense en Mojaloop? ¿Está relacionado con la seguridad de la plataforma de interoperabilidad?

Esto también garantiza que todos los servicios ejecuten siempre el código que deben ejecutar y que se impida que cualquier elemento erróneo o malicioso llegue siquiera a iniciarse. Además, a efectos de elaboración de informes y para los auditores, los informes pueden incluir un registro forense que permita realizar un seguimiento.

### 22. ¿Cómo se conectan los proveedores de servicios financieros con Mojaloop?

Existe un diagrama de arquitectura que ofrece una buena visión general de la integración entre las distintas entidades. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

### 23. ¿Existe algún conversor o conector de Código abierto para ISO 8583-OpenAPI?

No creo que exista actualmente una integración genérica ISO 8583 ` <-> Mojaloop. Estamos trabajando en algunas integraciones de «canales de pago tradicionales» con el Mojaloop (TPV y cajero automático), que esperamos poder mostrar en la próxima reunión. Estas integraciones constituirían la base para una integración ISO 8583 que podríamos desarrollar e incorporar a la pila de software de código abierto, pero tenga en cuenta que dichas integraciones serán muy específicas para cada Caso de uso.

### 24. ¿Cómo puedo saber cuáles son los puntos finales para configurar Postman con el fin de probar el Despliegue?

En el tablero «Kubernetes», seleccione el NAMESPACE correcto. Vaya a «Ingresses». Dependiendo del despliegue de los gráficos de Helm, busque «moja-centralledger-service». Haga clic en «Editar» y busque la etiqueta «`<HOST>`». En ella encontrará el Endpoint de este servicio.

### 25. ¿Por qué no se permiten las reversiones en un Mojaloop?

La *irrevocabilidad* es un principio fundamental del Nivel Uno (editado) y, para ello, es esencial que no se permitan las reversiones. A continuación se incluye el apartado de la Definición del API que realiza el direccionamiento sobre este tema:

_*6.7.1.2 Irrevocabilidad de las transacciones*_
_El API está diseñado para admitir únicamente transacciones financieras irrevocables; esto significa que una transacción financiera no puede modificarse, cancelarse ni revertirse una vez creada. El objetivo es simplificar y reducir los costes para los proveedores de servicios financieros (FSP) que utilizan el API. Un gran porcentaje de los costes operativos de un sistema financiero típico se debe a las reversiones de transacciones._
_Tan pronto como un pagador FSP envía una transacción financiera a un beneficiario FSP (es decir, mediante POST /transfers, incluida la transacción financiera de extremo a extremo), la transacción es irrevocable desde la perspectiva del pagador FSP. La transacción aún podría ser rechazada por el Beneficiario FSP, pero el Pagador FSP ya no puede rechazarla ni modificarla. Una excepción a esto sería si se supera el plazo de validez de la transferencia antes de que el Beneficiario FSP responda (véanse las secciones 6.7.1.3 y 6.7.1.5 para obtener más información). Tan pronto como el BeneficiarioFSP haya aceptado la transacción financiera, esta será irrevocable para todas las partes._

No obstante, «*Reembolsos*» es un caso de uso compatible con la versión API.

### 26. ¿Se produce un error con la instalación de microk8s del tipo «MountVolume.SetUp failed»?

Parecería que se trata de un problema de espacio, pero se habían asignado más de 100 GiB de almacenamiento EBS.
El problema se resolvió por sí solo al cabo de 45 minutos. La implementación inicial del proyecto mojaloop puede tardar un tiempo en estabilizarse.

### 27. ¿Por qué me aparece este error al intentar crear un participante: «No existe la cuenta de Conciliación del Hub para la divisa especificada»?

Debe crear las cuentas de Hub correspondientes (HUB_MULTILATERAL_SETTLEMENT y HUB_RECONCILIATION) para la divisa especificada antes de configurar los Participantes. 
En esta colección de Postman encontrará las solicitudes necesarias para realizar la operación en la carpeta «Hub Account»: https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Consulte también los entornos relacionados en el repositorio de Postman: https://github.com/mojaloop/postman
