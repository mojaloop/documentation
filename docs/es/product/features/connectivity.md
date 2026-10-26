---
i18n_source_sha: 42e1ff59fdbbad028799c46cfe957f9da8bb7429
---

# Incorporación de DFSP

En principio, habiendo desarrollado y documentado las [API de Mojaloop](./transaction.md#Mojaloop APIs), esto debería ser suficiente para permitir que los DFSP se conecten a un Hub de Mojaloop. Sin embargo, como parte de la misión de la Comunidad Mojaloop de abordar la inclusión financiera, desde hace mucho tiempo se ha considerado que la clave para minimizar el costo y la complejidad de conectar el back office de un DFSP a un Hub de Mojaloop está en proporcionar un portafolio de soluciones de conectividad, que permita a un DFSP seleccionar el enfoque que mejor se adapte a sus necesidades. Estas se complementan con un DFSP Onboarding Playbook, que recoge los procesos de negocio necesarios para incorporar a un DFSP.
## Incorporación de negocio
La incorporación de un DFSP a un Hub de Mojaloop requiere muchos pasos que no tienen nada que ver con la tecnología, y estos se abordan en el DFSP Onboarding Playbook.

Este playbook, donado por Thitsaworks, comprende un conjunto de herramientas y plantillas que ayudan a planificar y ejecutar un despliegue de Mojaloop, con un enfoque específico en la incorporación de DFSP. Las herramientas son:
- Una plantilla de plan de trabajo, que incluye ejemplos usados en despliegues anteriores;
- Un caso de prueba de extremo a extremo de ejemplo, en este caso para la integración del DFSP beneficiario;
- Un formulario de evaluación técnica, usado para definir la asistencia técnica que requieren los DFSP candidatos;
- Una lista de verificación de incorporación técnica;
- Una plantilla de mapeo de API, usada para mapear entre los elementos de la API del Hub de Mojaloop y las acciones correspondientes que requiere el back office del DFSP;
- Un plan para la configuración de la seguridad de la conexión del DFSP al Hub de Mojaloop.

Puede [descargar el DFSP Onboarding Playbook de Thitsaworks haciendo clic en este enlace](https://github.com/mojaloop/product-council/tree/main/Documentation/DFSP%20Playbook).

## Incorporación técnica
El portafolio de conectividad actual incluye el Integration Toolkit (ITK), que permitirá a un integrador de sistemas (SI) crear una conexión combinando los distintos elementos de un kit de herramientas de la manera que mejor se ajuste a las necesidades del DFSP. Estos elementos incluyen:
  - Mojaloop Connection Manager (MCM);
  - Mojaloop Connector (para la integración con el Hub de Mojaloop);
  - Un conjunto de Core Connectors de ejemplo (para la integración con el back office del DFSP);
   - Documentación, que incluye guías "cómo hacerlo" y plantillas.

Para los DFSP de mayor tamaño, la Comunidad Mojaloop ofrece Payment Manager como alternativa al ITK. También conocido como Payment Manager for Mojaloop (PM4ML), ofrece toda la funcionalidad y flexibilidad que un banco grande pueda requerir.

Las distintas herramientas de conectividad disponibles para incorporar un DFSP a un Hub de Mojaloop se tratan con más detalle en las [Miniguías](./connectivity/participation_tools_mini_guides.md), y la orientación detallada sobre qué solución de conectividad es más apropiada para los distintos tipos de participantes y requisitos se presenta en la [Matriz de funcionalidades de los participantes](./connectivity/participant-matrix.md). 

Todos los DFSP deberían tener presente que obtener los beneficios de una solución de pagos instantáneos inclusivos como Mojaloop depende de la implementación de un enfoque de "ecosistema completo" - y esto significa extender el alcance del servicio de Mojaloop a los dominios de los DFSP, brindándoles a ellos y a sus clientes las ventajas de la garantía de la firmeza de la transacción, un costo menor y la entrega confiable de cada transacción válida.

La [guía de arquitectura de seguridad para la infraestructura de los DFSP](./dfsp-infrastructure-security.md) describe cómo los esquemas de pagos pueden evaluar el hardware y los entornos anfitriones en los que los DFSP operan las cargas de trabajo de conectividad y de firma.

Tenga en cuenta que el modo de despliegue del ITK afecta el tipo de servicio que un DFSP puede brindar a sus clientes, como se destaca en las [Miniguías](./connectivity/participation_tools_mini_guides.md). Las opciones que consumen más recursos son adecuadas para los DFSP con requisitos altos de rendimiento y confiabilidad; una opción de despliegue moderada impone algunos límites al rendimiento y a la disponibilidad, y puede ser la más adecuada para DFSP medianos o pequeños; y la opción más frugal impone límites estrictos al rendimiento y a la disponibilidad y elimina la capacidad de iniciar pagos masivos, por lo que solo puede ser adecuada para DFSP pequeños.

## Aplicabilidad

Esta versión de este documento corresponde a la versión [17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0) de Mojaloop

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.5|21 de agosto de 2026| Yevhen Kyriukha|Se enlazó la guía de seguridad de la infraestructura de los DFSP|
|1.4|17 de diciembre de 2025| Paul Makin |Se agregó el enlace a las Miniguías; se aclaró el texto para destacar el rol del ITK|
|1.3|6 de noviembre de 2025| Paul Makin|Se enlazó el DFSP Onboarding Playbook de Thitsaworks|
|1.2|9 de junio de 2025| Tony Williams|Se agregó una referencia a la matriz de funcionalidades de los participantes|
|1.1|14 de abril de 2025| Paul Makin|Actualizaciones relacionadas con el lanzamiento de la V17|
|1.0|5 de febrero de 2025| Paul Makin|Versión inicial|
