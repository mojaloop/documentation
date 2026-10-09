---
i18n_source_sha: 380fed1f262ad13e1081427774bb1e81243c5ffe
---

# Gestión de versiones

La gestión de versiones se encarga de los procesos relativos a gestionar, planificar, programar y controlar un cambio de software a lo largo del despliegue y las pruebas en los distintos entornos.

::: tip NOTA
Los procesos que se describen en esta sección representan buenas prácticas y sirven de recomendaciones para las organizaciones que desempeñan un rol de Operador del Hub.
:::

::: tip NOTA
Esta sección hace referencia a un "equipo de Soporte de Mojaloop": un equipo dedicado a prestar servicios de Soporte para las operaciones técnicas de un Hub de Mojaloop. Tenga en cuenta que ese equipo puede ser una unidad interna o externa, según el nivel de experiencia o de capacidad que haya dentro de su organización. Si decide externalizar las funciones de Soporte, hay organizaciones dentro de la comunidad de Mojaloop que ofrecen distintos niveles de Soporte como servicio. (Para más información y referencias, contacte con la Mojaloop Foundation.)
:::

## Componentes de la versión y entornos

Cuando se aceptan nuevas versiones de Mojaloop Open Source para los servicios del Switch y otros componentes que se necesiten, las versiones pasan por una serie de actividades de prueba en entornos progresivamente superiores, empezando por los entornos de desarrollo y QA y terminando por las pruebas a nivel de producción.

La configuración de entornos recomendada consta de varios entornos, cada uno con un propósito distinto, tal como se representa en el diagrama siguiente.

<img src="../../../../.vuepress/public/release_mgmt.png" width="80%" height="80%" />

Una implementación de Mojaloop específica de un Hub se construye sobre varios componentes de servicio (Mojaloop OSS, extensiones u otros componentes, posibles personalizaciones), y las versiones incluirán funcionalidades nuevas, mejoras o correcciones de errores de todos esos componentes. 

<img src="../../../../.vuepress/public/release_service_components.png" width="70%" height="70%" />

## Desarrollo y pruebas (Definición de Terminado)

Las prácticas estándar de desarrollo y QA, que sigue el equipo de Desarrollo y Entrega de Producto de Mojaloop, incluyen lo siguiente como parte de la Definición de Terminado. La recomendación es que el Operador del Hub adopte una estrategia similar. 

* Se desarrollan pruebas unitarias para cada pieza de código que se escribe.
* El código, las pruebas unitarias y la documentación han pasado por revisión de pares.  
* Se han desarrollado y ejecutado pruebas de integración.
* Las pruebas de regresión completas se han ejecutado con éxito en el commit (fusión a la rama master). 
* Se han creado notas de la versión con los siguientes detalles: 
    * Descripción de los cambios 
    * Lista de componentes y servicios modificados
    * Lista de las historias de usuario y de los errores incluidos en la versión
    * Mención destacada de cualquier cambio fundamental (que rompa la compatibilidad) que afecte a alguna funcionalidad, solución de API o arquitectura del sistema
* Se ha creado un runbook de despliegue, con instrucciones de despliegue y de reversión que incluyen las variables de entorno, los scripts de actualización de la base de datos y los prerrequisitos del despliegue.
* Mantenimiento de las definiciones de las pruebas de regresión, de los resultados de referencia de las pruebas de Mojaloop OSS y de los criterios de validación (pruebas) específicos del Esquema de pagos que se agregan sobre ellos.
* Mantenimiento de una base de conocimiento de cualquier cambio nuevo o significativo en la funcionalidad, los productos, la arquitectura, etc., relativos a Mojaloop OSS y a otros componentes, así como de las personalizaciones hechas para el Esquema de pagos. La base de conocimiento sirve de base para el traspaso de conocimiento al equipo de Operaciones. Ese traspaso incluye la revisión completa del runbook de despliegue y de otros artefactos de la versión, como los paquetes de la versión y los scripts de base de datos, que ayudarán mucho al equipo de Operaciones en las operaciones diarias, la validación, la depuración de problemas y el mantenimiento.

## Versiones de Mojaloop

La práctica estándar para las versiones de Mojaloop es la siguiente:

* Todas las versiones nuevas de las aplicaciones, componentes y microservicios individuales que componen Mojaloop están disponibles mediante charts de Helm en los repositorios públicos aquí: <https://github.com/mojaloop/helm/releases>
* Con cada versión de componente se producen pruebas unitarias y algunas pruebas de integración funcional.
* La versión de Mojaloop también incluye pruebas de regresión automatizadas de extremo a extremo. Los conjuntos de pruebas se versionan, y el número de versión corresponde al número de versión de la versión de Mojaloop. 
* Se produce un paquete de versión, una vez en cada Program Increment (PI), para las versiones nuevas de Mojaloop. Esto incluye las actualizaciones de las aplicaciones, componentes y microservicios individuales dentro de Mojaloop. \
\
Un Program Increment es un intervalo de tiempo acotado durante el cual un equipo Agile entrega valor incremental.
* Todas las actualizaciones de mantenimiento, las funcionalidades nuevas y las correcciones de errores de Mojaloop se ponen a disposición de los usuarios de Mojaloop como parte de los ciclos de versiones, una vez en cada periodo de PI.

## Versiones de producto de las extensiones y de los componentes adicionales

Se recomienda que la práctica estándar para las versiones de producto de las extensiones y de los componentes adicionales esté alineada con el proceso de versiones de Mojaloop [descrito arriba](release-management.md#versiones-de-mojaloop):

* Todas las versiones nuevas de producto se ponen a disposición mediante paquetes de versión y se describen en las notas de la versión.
* Un paquete de versión incluye pruebas automatizadas de extremo a extremo para cada versión de producto. Los conjuntos de pruebas se versionan, y el número de versión corresponde al número de versión de la versión de producto.
* Las versiones de producto están alineadas con la cadencia de versiones de Mojaloop, una vez en cada periodo de PI.
* Todas las actualizaciones de mantenimiento, las funcionalidades nuevas y las correcciones de errores de producto se ponen a disposición de los DFSP clientes de las extensiones y de los productos adicionales como parte del ciclo de versiones, una vez en cada periodo de PI.

## Errores y correcciones urgentes

Los errores y las correcciones urgentes se gestionan de la siguiente manera:

* Todas las correcciones de errores (tanto de Mojaloop como de otros productos) se incluyen en los paquetes de versión.
* Del mismo modo, las correcciones urgentes también se proporcionan mediante una versión. No se recomienda desplegar correcciones urgentes directamente desde las versiones del paquete de una aplicación concreta, ya que desplegar un único componente de una versión (en lugar de desplegar la versión que incluye el componente actualizado) puede hacer que el Hub quede desincronizado respecto de la versión del paquete de la aplicación.
* Los errores se rastrean, se gestionan y se priorizan según se define en el [proceso de triaje de defectos](defect-triage.md): 
    * La herramienta de la Mesa de Servicio se usa para gestionar todos los errores. 
    * Un equipo de Triaje de Soporte de Mojaloop con representantes tanto de Mojaloop como de otros equipos de Entrega de Producto y de Gestión de Producto participa en el análisis de la urgencia y del impacto para determinar la priorización de los errores, incluidas la planificación y la programación de la resolución y la comunicación al Operador del Hub.

## Entornos y estrategia de QA

Para validar el despliegue de una versión de Mojaloop recién publicada frente a las últimas versiones de otros productos (extensiones y componentes adicionales), el Esquema de pagos debe montar un entorno con todos los componentes necesarios junto con la configuración específica que usa el Esquema de pagos. Esto permite a los equipos de QA y validación o de Soporte de Mojaloop (un equipo dedicado a prestar servicios de Soporte para las operaciones técnicas de un Hub de Mojaloop) llevar a cabo el despliegue y las pruebas de las versiones de Mojaloop frente a las últimas versiones de otros productos.

::: tip NOTA
El entorno que monta el equipo de Soporte de Mojaloop para la validación debería seguir una infraestructura estándar, replicando o simulando en la medida de lo posible una configuración de producción equivalente, para que cualquier problema o error pueda detectarse pronto en el proceso. Una configuración de producción incluye normalmente gateways de API, DMZ y una configuración de clústeres basada en zonas de seguridad, junto con todos los componentes y personalizaciones necesarios (incluidas las Reglas del Esquema de pagos) que haya hecho el Esquema de pagos. El Operador del Hub debe asegurar que su infraestructura de producción esté totalmente sincronizada con los estándares de infraestructura del equipo de Soporte de Mojaloop.
::: 

Tras el despliegue y la validación con éxito de una versión sobre la infraestructura y la arquitectura estándar, y después de ejecutar con éxito la última versión de Mojaloop y de los demás productos, la versión se aprueba y puede compartirse o ponerse a disposición (a través del servidor o el repositorio de clientes del Equipo de Soporte). El equipo del Hub puede entonces programar el despliegue en el entorno (posiblemente a medida) del Operador del Hub. 

La estrategia de QA que emplean los equipos de Entrega de Producto de Mojaloop y de los productos de extensión asegura que el código nuevo de todos y cada uno de los componentes de servicio haya pasado por pruebas exhaustivas antes de publicarse. La estrategia de QA del equipo de Soporte de Mojaloop, en cambio, debería centrarse en validar que los componentes de servicio integrados puedan desplegarse y que los productos sean interoperables, garantizando que hay un Switch de Mojaloop en funcionamiento que después pueda desplegarse en el entorno de un Operador del Hub.

## Proceso de versiones

La recomendación para las implementaciones del Hub es mantenerse alineadas con la cadencia de versiones de Mojaloop de una versión por periodo de PI y evitar desplegar cambios individuales directamente desde la rama master de aplicaciones, componentes o servicios concretos dentro de Mojaloop. Esta recomendación asegura que la integridad de las aplicaciones se mantenga más limpia y alineada con los repositorios de origen. 

Para cada versión, se recomienda al equipo de Soporte de Mojaloop dar los siguientes pasos:

::: tip NOTA
Debe informarse a los Operadores del Hub de la fecha objetivo de la versión con mucha antelación.
:::

1. El equipo de Soporte de Mojaloop revisa todos los artefactos de la versión, incluidas las notas de la versión y la documentación asociada, y crea o mejora el runbook de despliegue en cuanto la versión está disponible. 
1. El equipo de Soporte de Mojaloop lleva a cabo el despliegue y la validación de las versiones previstas de Mojaloop y de los demás productos en un entorno temporal de Soporte de Mojaloop (usando la infraestructura estándar de Soporte de Mojaloop, pero haciendo coincidir las versiones de las aplicaciones del cliente, es decir, del Operador del Hub). 
1. Tras el despliegue y la validación con éxito de una versión sobre la infraestructura y la arquitectura estándar de Soporte de Mojaloop, y después de probar con éxito la última versión de Mojaloop y de los demás productos, la versión se aprueba y se pone a disposición del Operador del Hub.
1. El equipo del Operador del Hub confirma que está listo (y, opcionalmente, la ventana de despliegue objetivo) para el despliegue en el entorno de Desarrollo del Operador del Hub. \
\
Es responsabilidad del Operador del Hub llevar a cabo el despliegue en el entorno de Desarrollo y su validación posterior. Como alternativa, puede pedir a Soporte de Mojaloop que realice esas actividades en su nombre.

### Despliegues realizados por el equipo de Soporte de Mojaloop

Si el Operador del Hub pide al equipo de Soporte de Mojaloop que realice el despliegue en el entorno de Desarrollo del Operador del Hub, el equipo de Soporte de Mojaloop envía un correo electrónico (o cualquier otra forma de comunicación según las preferencias del Operador del Hub) con información sobre la fecha objetivo de la versión, el conjunto de funcionalidades incluidas en ella y la ventana de despliegue. Tras el despliegue, se envía otra comunicación para confirmar que el despliegue se ha llevado a cabo y validado, y que la ventana de despliegue se ha cerrado.

## Diagrama de flujo del proceso

<img src="../../../../.vuepress/public/release_process.png" width="65%" height="65%" />
