---
syncRef: c0bf10c36348cff1ff3a2afe84968a90c5f50014
---

# Preguntas frecuentes técnicas

Este documento reúne algunas de las preguntas técnicas frecuentes de la comunidad.

## 1. ¿Qué se admite?

Actualmente el equipo da soporte a los componentes del Central ledger. Los componentes de DFSP están desactualizados, por lo que el entorno de extremo a extremo y la instalación completa resultan difíciles de montar.

## 2. ¿Podemos conectarnos directamente a Pathfinder en un entorno de desarrollo?

Para los entornos local y de pruebas, recomendamos usar el servicio 'mock-pathfinder' en su lugar. Pathfinder es un servicio de 'pago por uso'. 

Acceda al repositorio https://github.com/mojaloop/mock-pathfinder para descargar e instalar mock-pathfinder. Ejecute el comando npm install en el directorio mock-pathfinder para instalar las dependencias y, después de esto, actualice Database_URI en mock-pathfinder/src/lib/config.js.

## 3. ¿Debo registrar el DFSP mediante la url http://central-directory/commands/register o necesito actualizar la configuración en default.json?

Debería registrarlo usando la API proporcionada, con postman o curl. El cliente está usando código de LevelOne. Es necesario implementar la versión actual de Mojaloop con los scripts actuales de Postman.

## 4. ¿El estado del pod pi3-kafka-0 sigue en CrashLoopBackOff?

- Más contexto sobre la pregunta:

  Cuando intenté obtener los registros del contenedor centralledger-handler-admin-transfer, obtuve el siguiente error:
  Error from server (BadRequest): container "centralledger-handler-admin-transfer" in pod "pi3-centralledger-handler-admin-transfer-6787b6dc8d-x68q9" is waiting to start: PodInitializing
  Y el estado del pod pi3-kafka-0 sigue en CrashLoopBackOff.
  Estoy usando un vps con ubuntu 16.04 con 12GB de RAM, 2vCores, 2.4GHz, 50GB de disco en OVH para el despliegue.
    
Aumentar la RAM a 24 GB y la CPU a 4 resolvió los problemas. Parece tratarse de un tiempo de espera agotado en Zookeeper por agotamiento de los recursos disponibles, lo que provoca que los servicios se apaguen.

## 5. ¿Por qué recibo un error al intentar crear un nuevo DFSP con Admin?

Asegúrese de estar usando los scripts de Postman más recientes disponibles en el repositorio https://github.com/mojaloop/mock-pathfinder.


## 6.  ¿Puedo distribuir los componentes de Mojaloop entre distintas máquinas físicas y VM?

Debería poder instalarlo en distintas VM o máquinas físicas. La distribución depende en buena medida de sus requisitos y sería específica de cada implementación. Utilizamos Kubernetes para facilitar la orquestación de contenedores. Esto nos permite programar los despliegues a través del runtime de Kubernetes en máquinas concretas si hace falta, y solicitar recursos específicos si es necesario. Los helm charts del repositorio helm pueden servir de guía sobre la mejor forma de asignar y agrupar los componentes en su despliegue. Naturalmente, tendrá que actualizar las configuraciones para adaptarlas a su implementación personalizada.

## 7. ¿Podemos esperar que todos los endpoints definidos en el documento de la API estén implementados en Mojaloop?

La API de la Especificación de Mojaloop para transferencias y la implementación del Mojaloop Open Source Switch son flujos de trabajo independientes, aunque obviamente la implementación se basa en la Especificación. La implementación se realizará en función de los casos de uso priorizados para un periodo determinado y de los endpoints necesarios para dar soporte a esos casos de uso. Si algunos endpoints no se priorizan, es posible que su implementación no esté disponible. No obstante, creo que el objetivo es llegar a admitir todos los endpoints especificados, aunque pueda llevar tiempo. Gracias por la colección. Tenemos algunas de estas en el repositorio ‘postman’ de la organización mojaloop en GitHub.

## 8. ¿Mojaloop almacena la información de cotización y estado del FSP que inicia el pago?

Por el momento, la implementación del Mojaloop Open Source Switch *no* almacena información relacionada con las cotizaciones. La responsabilidad recae en el pagador y el beneficiario que participan en el proceso, que deben almacenar la información pertinente.

## 9. ¿Mojaloop gestiona la validación del flujo de trabajo?

Por el momento no, pero podría hacerlo en el futuro. En cuanto a correlacionar las solicitudes relacionadas con una transferencia concreta, puede consultar el endpoint o recurso ‘transaction’ en la Especificación para obtener más información al respecto. Además, puedo comentar que hay trabajo en curso sobre la especificación para hacer esta correlación más directa y sencilla, es decir, para correlacionar las solicitudes de cotización y de transferencia que forman parte de una misma transacción.


## 10. ¿Cómo registrar una nueva party en Mojaloop?

No existe  POST en el recurso /parties, como se indica en la sección 6.1.1 de la API Defintion. Consulte la sección: 6.2.2.3 `POST /participants/<Type>/<ID>` en la API Defintion.

” _La solicitud HTTP `POST /participants/<Type>/<ID>` (o `POST /participants/<Type>/<ID>/<SubId>`) se utiliza para crear información en el servidor sobre la identidad proporcionada, definida por `<Type>`, `<ID>` y, opcionalmente, `<SubId>` (por ejemplo, POST_
  _/participants/MSISDN/123456789 o POST /participants/BUSINESS/shoecompany/employee1). Consulte la Sección 5.1.6.11 para obtener más información sobre el direccionamiento de una Party._ ”.
  
## 11. ¿El participante representa la cuenta de un cliente en un banco?

Para más información sobre esto, consulte este documento (Sección 3..2): https://github.com/mojaloop/mojaloop-specification/blob/develop/Generic%20Transaction%20Patterns.pdf.
  
” _En la API, un Participante es lo mismo que un FSP que participa en un Esquema de Interoperabilidad. El propósito principal del recurso lógico de la API Participants es que los FSP averigüen en qué otro FSP se encuentra una contraparte de una transacción financiera interoperable. También hay servicios definidos para que los FSP aporten información a un sistema común._ ”

En esencia, un participante es cualquier FSP que participa en el esquema de pagos (normalmente no un cliente). Para la búsqueda de cuentas puede usarse un servicio de directorio como *Pathfinder*, que proporciona la búsqueda de usuarios y la correspondencia. Si no se dispone de un servicio de directorio de ese tipo, la Especificación ofrece una alternativa en la que el Switch aloja un Account Lookup Service (ALS), pero en el que los participantes deben registrar las partes. Ya lo mencioné antes. Conviene señalar aquí que el Switch no almacena los detalles, solo la correspondencia entre un ID y un FSP, y las llamadas para resolver la parte se envían a ese FSP. 

https://github.com/mojaloop/mojaloop-specification CORE RELATED (Mojaloop):

Este repositorio contiene el conjunto de documentos de especificación de la Open API for FSP Interoperability - mojaloop/mojaloop-specification.

## 12. ¿Cómo registrar a un beneficiario _de confianza_ para un pagador, para omitir el OTP?

Para omitir el OTP, la solicitud inicial en /transactionRequests por parte del beneficiario puede aprobarse de forma programática (o manual, si se quiere) sin usar el endpoint /authorizations (que es el necesario para la aprobación por OTP). En efecto, el FSP debe encargarse de esto, no el Switch. Se trata brevemente en la sección 6.4 de la Especificación.

## 13. ¿Recibe un error 404 al intentar acceder o cargar el archivo kubernetes-dashboard.yaml?

Según el README.md del repositorio oficial de kubernetes en github, el enlace más reciente a utilizar es "https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml". Verifique siempre los enlaces de terceros antes de implementarlos. Las aplicaciones de código abierto evolucionan constantemente.

## 14. ¿Al instalar nginx-ingress para balanceo de carga y acceso externo se obtiene "Error: no available release name found"?

Consulte lo siguiente, que aborda un problema similar. En resumen, lo más probable es que sea un problema de RBAC. Consulte la documentación para configurar Tiller con RBAC. https://docs.helm.sh/using_helm/#role-based-access-control lo explica en detalle. El problema registrado: helm/helm#3839.

## 15. Recibí "ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory" al ejecutar el comando `npm start'.

Encontré una solución aquí https://github.com/confluentinc/confluent-kafka-python/issues/65#issuecomment-269964346
GitHub
ImportError: librdkafka.so.1: cannot open shared object file: No such file or directory · Issue #65 · confluentinc/confluent-kafka-python
Ubuntu 14 here, pip==7.1.2, setuptools==18.3.2, virtualenv==13.1.2. First, I want to build latest stable (seems it&#39;s 0.9.2) librdkafka into /opt/librdkafka. curl https://codeload.github.com/ede...

Estos son los pasos para recompilar librdkafka:

git clone https://github.com/edenhill/librdkafka && cd librdkafka && git checkout `<commit_sha>

cd librdkafka && ./configure && make && make install && ldconfig

Después de eso puedo importar los módulos sin especificar LD_LIBRARY_PATH.
GitHub
edenhill/librdkafka
The Apache Kafka C/C++ library. Contribute to edenhill/librdkafka development by creating an account on GitHub.

## 16. ¿Podemos usar mojaloop como software de billetera móvil de código abierto o mojaloop solo sirve para la interoperabilidad?

Podemos usar mojaloop para la interoperabilidad, de modo que dé soporte a billeteras móviles y a otras transferencias de dinero similares. No es un software para un DFSP (existen proyectos de código abierto que cubren eso, como Finserv y otros). Mojaloop es principalmente para un Hub o Switch, y una API que debe implementar un DFSP. Pero no sirve para gestionar billeteras móviles como tal.

## 17. ¿Qué empresas ayudan a desplegar y dar soporte a mojaloop?

Mojaloop es un software y una especificación de código abierto.

## 18. ¿Puede decir algo sobre mojaloop y la seguridad?

La Especificación es bastante estándar y cuenta con buenos estándares de seguridad. Pero deben implementarlos quienes la adoptan y despliegan. Además, las medidas de seguridad deben combinarse con otras medidas de seguridad operativas y de despliegue. Asimismo, los próximos meses se centrarán en la perspectiva de seguridad para la comunidad de código abierto.

## 19. ¿Cuáles son los beneficios de usar mojaloop como plataforma de interoperabilidad?

Beneficios: en este momento, por ejemplo, un usuario de dinero móvil de Airtel solo puede transferir a otro usuario de dinero móvil de Airtel. Con esto, puede transferir a cualquier proveedor de servicios financieros, como otro proveedor de dinero móvil, o a cualquier otra cuenta bancaria o comercio conectado al Hub, con independencia de su implementación. Solo necesitan estar conectados al mismo Switch. Además, está diseñado para teléfonos básicos, de modo que todo el mundo pueda usarlo.

## 20. ¿Cuáles son los principales retos que enfrentan las empresas al usar mojaloop?

En este momento, los principales retos tienen que ver con las expectativas. Las expectativas de quienes adoptan mojaloop y lo que mojaloop es realmente. Muchos adoptantes tienen ideas distintas sobre qué es mojaloop y cuáles son sus capacidades. Si lo entienden bien, muchos de los retos actuales se mitigan..
Sí, el registro forense es también una medida de seguridad con fines de auditoría, que garantiza que exista un registro auditable de las acciones y que todo lo que sea una acción reseñable quede registrado y consolidado, de forma segura tras el cifrado en un par de niveles.

## 21. El registro forense o de auditoría en mojaloop, ¿está relacionado con la protección de la plataforma de interoperabilidad?

Esto también garantiza que todos los servicios ejecuten siempre el código que deben ejecutar y que se impida el arranque de cualquier cosa incorrecta o maliciosa. Además, para la elaboración de informes y para los auditores, los informes pueden incluir un registro forense que se pueda seguir.

## 22. ¿Cómo se conectan los proveedores de servicios financieros con mojaloop?

Hay un diagrama de arquitectura que ofrece una buena visión de la integración entre las distintas entidades. https://github.com/mojaloop/docs/blob/master/Diagrams/ArchitectureDiagrams/Arch-Flows.svg.

## 23. ¿Existe algún convertidor o conector ISO8583-OpenAPI de código abierto disponible?

No creo que exista actualmente una integración genérica ISO8583 `<-> Mojaloop. Estamos trabajando en algunas integraciones de "canales de pago tradicionales" con Mojaloop (POS y cajeros automáticos) que esperamos demostrar en la próxima reunión. Estas servirían de base para una integración ISO8583 que podríamos construir y agregar a la pila de código abierto, pero tenga en cuenta que estas integraciones serán muy específicas de cada caso de uso.

## 24. ¿Cómo conozco los endpoints para configurar postman y probar el despliegue?

En el panel de Kubernetes, seleccione el NAMESPACE correcto. Vaya a Ingeresses. Según cómo haya desplegado los helm charts, busque 'moja-centralledger-service'. Haga clic en editar y localice la etiqueta `<HOST>`. Ahí estará el endpoint de este servicio.

Si utiliza la CLI, busque la columna 'Host' en `kubectl describe ingress moja-centralledger-service`

## 25. ¿Por qué no se permiten las reversiones en Mojaloop?

La *irrevocabilidad* es un principio fundamental de Level One (editado) y no permitir reversiones es esencial para lograrla. Este es el sección de la API Definition que lo aborda:

_*6.7.1.2 Irrevocabilidad de las transacciones*_
_La API está diseñada para admitir únicamente transacciones financieras irrevocables; esto significa que una transacción financiera no se puede modificar, cancelar ni revertir una vez creada. El objetivo es simplificar y reducir los costos para los FSP que usan la API. Un porcentaje elevado de los costos operativos de un sistema financiero típico se debe a las reversiones de transacciones._
_En cuanto un FSP pagador envía una transacción financiera a un FSP beneficiario (es decir, mediante POST /transfers incluyendo la transacción financiera de extremo a extremo), la transacción es irrevocable desde la perspectiva del FSP pagador. La transacción todavía podría ser rechazada por el FSP beneficiario, pero el FSP pagador ya no puede rechazarla ni modificarla. Una excepción sería que se superara el tiempo de expiración de la transferencia antes de que respondiera el FSP beneficiario (consulte las Secciones 6.7.1.3 y 6.7.1.5 para obtener más información). En cuanto el FSP beneficiario acepta la transacción financiera, esta es irrevocable para todas las partes._

No obstante, los *reembolsos* son un caso de uso admitido por la API.

## 26. ¿Error "MountVolume.SetUp failed" en la instalación de microk8s?

Parecería un problema de espacio, pero se habían asignado más de 100GiB de almacenamiento EBS.
El problema se resolvió por sí solo al cabo de 45 minutos. La implementación inicial del proyecto mojaloop puede tardar un tiempo en estabilizarse.

## 27. ¿Por qué recibo este error al intentar crear un participante: "Hub reconciliation account for the specified currency does not exist"?

Debe crear las cuentas del Hub correspondientes (HUB_MULTILATERAL_SETTLEMENT y HUB_RECONCILIATION) para la moneda indicada antes de configurar los participantes. 
En esta colección de Postman encontrará las solicitudes para realizar la operación en la carpeta "Hub Account": https://github.com/mojaloop/postman/blob/master/OSS-New-Deployment-FSP-Setup.postman_collection.json

Encuentre también los entornos relacionados en el repositorio de Postman: https://github.com/mojaloop/postman
