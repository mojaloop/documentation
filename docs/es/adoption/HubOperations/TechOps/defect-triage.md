---
i18n_source_sha: 4ee0332a0ff97b0f0a36de2efe885b9eb3a5b736
---

# Triaje de defectos

El propósito del proceso de triaje de defectos es asegurar que todos los errores detectados en el entorno de Producción del Operador del Hub se capturen, se evalúen y se envíen a un equipo de Soporte de Mojaloop, un equipo dedicado a prestar servicios de Soporte para las operaciones técnicas de un Hub de Mojaloop. Ese equipo puede ser interno o externo (o incluso en parte interno y en parte externo), según el nivel de experiencia o de capacidad que haya dentro de la organización que aloja el esquema de pagos. Si se decide externalizar esta función, hay organizaciones dentro de la comunidad de Mojaloop que sí ofrecen distintos niveles de soporte como servicio. (Para más información y referencias, contacte con la Mojaloop Foundation.)

::: tip NOTA 
Los procesos que se describen en esta sección representan buenas prácticas y sirven de recomendaciones para las organizaciones que desempeñan un rol de Operador del Hub. 
:::

::: tip NOTA
El proceso que se propone aquí se aplica a los errores detectados en el entorno de Producción del Operador del Hub, y las funcionalidades nuevas o las mejoras quedan fuera de su alcance. Sin embargo, para facilitar las conversaciones de negocio, los Operadores del Hub pueden enviar solicitudes de funcionalidades nuevas o de mejoras, y estas se trasladarán a los equipos de Producto de la comunidad.
:::

Tiene que haber un equipo concreto que sea responsable de la evaluación y de la planificación de la resolución de cada error que se levante en los distintos entornos (Producción, Preproducción, QA, Desarrollo, etc.). Puede ser un equipo de Soporte o un equipo de QA/Desarrollo. En el resto de esta sección, a ese equipo se le llama el "equipo de Triaje de Soporte de Mojaloop".

El equipo de Triaje tiene los siguientes miembros: 

* Gerente de Producto de Mojaloop (Mojaloop central)
* Gerente de Producto de las extensiones u otros componentes implementados en el Hub: Payment Manager, PortX, etc.
* Experto Técnico en la Materia del Hub (Entrega de Producto, es decir, Desarrollo y QA)
* Representante de Operaciones (Operaciones Técnicas e Infraestructura)

## Errores detectados en un entorno de Producción del Operador del Hub

*Pasos del Operador del Hub:*

1. Un Ingeniero de Soporte L1 del Hub levanta un ticket de incidente en la herramienta de [Mesa de Servicio](key-terms-kpis.md#terminos-clave) del Operador del Hub, conforme al [proceso de gestión de incidentes](incident-management.md).
1. El ticket se escala al equipo L2/L3 del Hub para su investigación y análisis en profundidad, según se requiera.
1. El equipo L2/L3 del Hub evalúa si el comportamiento es un error nuevo o un problema conocido, y si ya existe un ticket o registro de error. Si es un error conocido y ya existe un ticket de Soporte de Mojaloop, el ingeniero L1 debe actualizar el ticket existente con los nuevos detalles e información, y la prioridad y el impacto o la severidad (el nivel de impacto en el Hub o en sus usuarios) pueden ajustarse en consecuencia. El ingeniero L1 debe comunicárselo al DFSP que lo reportó o al DFSP cliente (como se indica en el punto 6). Los errores nuevos seguirán el resto del proceso que se describe a continuación.
1. El equipo L2/L3 del Hub confirma que el problema de Producción puede reproducirse en entornos inferiores que ejecuten la misma versión que el entorno de Producción (PRD). Es decir, que el error no es un error de usuario ni un problema del entorno.
1. El equipo L3 del Hub puede escalar al Gerente de Operaciones Técnicas del Hub, y reportar el error a través de la herramienta de Mesa de Servicio de Soporte de Mojaloop, agregando todos los detalles de su análisis (incluidos pasos claros para reproducir el error, el comportamiento esperado, el comportamiento real y cualquier archivo de registro y detalle de las investigaciones L2/L3), además del identificador del ticket de incidente creado en el Paso 1 para facilitar el seguimiento.
1. Se envía la respuesta, el acuse de recibo y la comunicación al DFSP cliente dentro de los plazos pactados.

*Pasos del equipo de Soporte de Mojaloop:*

1. El equipo de Soporte de Mojaloop revisa el error, asigna a un miembro del equipo como responsable y acusa recibo del error.
1. Tras una revisión inicial del problema levantado, el miembro del equipo de Soporte de Mojaloop reenvía el problema al equipo de Triaje para su evaluación posterior. \
La revisión del ticket se lleva a cabo para a) establecer una buena comprensión del problema levantado, incluidos el nivel de severidad y la prioridad fijados por el Operador del Hub; b) confirmar que la información proporcionada está completa, incluidos los archivos de registro, una descripción clara, los pasos para reproducirlo, las capturas de pantalla, etc.
1. El equipo de Triaje evalúa el error: las mejoras y las solicitudes de funcionalidades nuevas se trasladan a los equipos de Producto de la comunidad. Se revisan el impacto operativo, la severidad y la prioridad, y la resolución del error se asigna al Gerente de Producto correspondiente. Para más detalles sobre la priorización, consulte [Priorización de los errores](#priorizacion-de-los-errores).
1. El Gerente de Producto clona el error en el backlog de producto de su equipo de Entrega de Producto, lo que vincula ambos problemas para referencia y para el seguimiento del avance. El Gerente de Producto también revisa y fija la prioridad frente a los demás elementos de su backlog de producto.
1. El Ingeniero de Soporte de Mojaloop asignado al ticket de error de Soporte de Mojaloop hace seguimiento del ticket clonado y se encarga de toda la comunicación entre el Gerente de Producto y el Operador del Hub sobre el avance de los errores, incluido el compartir cualquier paso de remediación (por ejemplo, soluciones alternativas o formas alternativas de usar la funcionalidad afectada). Cada actualización posterior del equipo de Entrega de Producto también debería compartirse en el ticket de error del Gerente de Producto para que el Operador del Hub tenga visibilidad. La persona asignada del Gerente de Producto debe seguir siendo la responsable del ticket de error del Gerente de Producto hasta que el error se resuelva.
1. El Gerente de Producto comunica el plan de resolución y los plazos al equipo de Soporte a través del ticket de error original del Gerente de Producto. El plan de resolución se comunica entonces al Operador del Hub. \
\
Para más detalles sobre qué ocurre si el Operador del Hub no está de acuerdo con la priorización y el plan de resolución propuestos, consulte [Proceso de escalamiento](#proceso-de-escalamiento). 
1. El error se resuelve siguiendo el proceso de desarrollo estándar del equipo de Entrega de Producto asignado y se incluye en una versión, que se pondrá a disposición del Operador del Hub o puede ofrecerse como una versión puntual (parche), si se requiere.
1. El ticket de Soporte de Mojaloop se cierra una vez que la versión con la corrección del error se despliega y se valida en el entorno del Operador del Hub.

## Errores detectados durante el despliegue o la ventana de cambio en el entorno del Hub

Los despliegues en los entornos del Hub son responsabilidad del equipo del Operador del Hub, y los errores detectados durante el despliegue deberían levantarse por el proceso estándar (es decir, se levanta un ticket conforme al proceso de gestión de incidentes del Hub y luego se escala al equipo de Soporte de Mojaloop si se requiere). Además: 

* El equipo del Hub evaluará si el comportamiento es un problema conocido o un defecto nuevo. En el caso de los problemas conocidos, la versión debería continuar y completarse según lo planificado, y el error conocido debería reportarse como parte del informe posterior al despliegue.
* En el caso de los defectos nuevos detectados, la versión o el cambio pueden revertirse según la severidad. Lo puede decidir el equipo de despliegue. En caso de reversión, deben ejecutarse pruebas de regresión para confirmar que la versión anterior que funcionaba es estable en el entorno, y el error debe reportarse como parte del informe posterior al despliegue.
* El error se captura a través de la herramienta de Mesa de Servicio de Soporte de Mojaloop y se gestionará por el proceso descrito arriba.

## Proceso de escalamiento

Si hay alguna discrepancia entre la prioridad asignada o las expectativas del cliente (el Operador del Hub) y el plan de resolución que proporciona el equipo de Soporte de Mojaloop, la [matriz de escalamiento de la gestión de incidentes](incident-management-escalation-matrix.md) rige lo que ocurre a continuación. En consecuencia, el incidente se fijará como prioridad P1 o como cualquier otro tipo de prioridad inferior y se informará a las partes interesadas.

Debe informarse de inmediato al Líder del Equipo de Soporte de Mojaloop y al Gerente de Programa del Operador del Hub. El Gerente de Programa del Operador del Hub es un gerente de la organización del Hub responsable de traducir las necesidades de negocio del Esquema de pagos en directivas de operaciones técnicas.

## Titularidad y responsabilidad

Quien crea el ticket de la Mesa de Servicio (el Ingeniero de Soporte del Operador del Hub) sigue siendo su responsable hasta que el ticket se resuelva.

La prioridad y la severidad deben alinearse, discutirse y negociarse entre el equipo de Triaje de Soporte de Mojaloop y el equipo de Operaciones del Operador del Hub.

El Ingeniero de Soporte de Mojaloop debe compartir en el ticket de la Mesa de Servicio la información procedente de las discusiones de triaje y del equipo de Entrega de Producto. 

El Gerente de Producto al que se le asigna el error debe asegurar que existan las referencias cruzadas y el seguimiento necesarios para garantizar el flujo de la información que requiere o produce la evaluación del equipo de Entrega de Producto. 

El Gerente de Producto al que se le asigna el error debe determinar y comunicar el plan de resolución al equipo o al ingeniero de Soporte de Mojaloop, únicamente a través del ticket.

### Priorización de los errores

La priorización de los errores es responsabilidad de los Expertos en la Materia (SME) del equipo de Triaje de Soporte de Mojaloop. 

Todos los errores se evalúan a partir del comportamiento esperado del sistema y del comportamiento real observado (y reproducido). El equipo de Operaciones del Operador del Hub debe capturar el impacto operativo y la urgencia del error para que el equipo de Triaje lo tenga en cuenta en la priorización.

Cada error se evalúa frente a la hoja de ruta y el backlog del Producto.

Las funcionalidades nuevas o las solicitudes de mejora se canalizan al equipo de Producto y no se gestionan por este proceso. Esto se comunica a quien lo solicita a través del equipo de Operaciones.

::: tip
La prioridad es el orden en el que se corregirá el error. Cuanto mayor sea la prioridad, antes se resolverá el error. \
\
La severidad es el nivel de impacto en el Hub o en sus usuarios. \
\
Estos dos factores van de la mano. Por ejemplo, un error cosmético como una errata en una página web probablemente se clasificará como de severidad baja, pero podría ser una corrección rápida y sencilla y clasificarse como de prioridad alta. Por eso es importante fijar estos valores con la debida consideración.
:::

## Diagrama de flujo del proceso

<img src="../../../../.vuepress/public/defect_triage.png" width="70%" height="70%" />
