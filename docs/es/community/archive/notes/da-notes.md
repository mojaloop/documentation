---
i18n_source_sha: e0e85582c3db1376c4004c6ccbcddd8c351441f4
---

## Reuniones de la DA: descripción general
La Design Authority se reúne cada semana para una actualización semanal y celebra sesiones ad hoc o detalladas para temas concretos

Las reuniones están abiertas a la participación del público, aunque los debates suelen limitarse a los miembros del Board. No obstante, los asistentes pasarán a ser panelistas en las reuniones si tienen diseños que revisar o propuestas de cambios.

Puede encontrar más detalles [aquí](https://github.com/mojaloop/design-authority/issues/42#workspaces/da-issue-log-5cdd507422733779191866e9/board?notFullScreen=false&repos=186592307)

# Reunión de la DA - 30 de septiembre de 2020
Se inició el debate sobre los temas mencionados: se habló del "patch" recién implementado en la versión 1.1 de la especificación de la API y la mayor parte de la reunión se dedicó a cómo promover una adopción más amplia de este nuevo patrón.

Se plantearon dudas sobre la implementación y el uso del comando "patch", señalando que hace falta seguir debatiendo para determinar si no estamos intentando parchear un defecto de diseño con otro posible defecto de implementación.

Véase: https://github.com/mojaloop/design-authority/issues/68


# Reunión de la DA - 2 de septiembre de 2020
Primero debatimos el tema de excluir la carpeta "models" de las comprobaciones de cobertura de pruebas unitarias. La decisión tomada fue que, si la carpeta contiene lógica de negocio (lo que por lo general no debería ser el caso), debe refactorizarse y sacarse. Una vez en ese estado de "lógica de negocio aislada", se puede ignorar la comprobación de cobertura de esa carpeta. Véase: https://github.com/mojaloop/design-authority/issues/64

Concluimos los debates sobre el scheme-adapter separado para un PISP, véase el problema en el tablero: https://github.com/mojaloop/design-authority/issues/51
Eche un vistazo al borrador del documento en esta ubicación: https://github.com/mojaloop/pisp/blob/scratch/api-collision/docs/api-collision.md
El enlace anterior contiene un debate detallado sobre el planteamiento más reciente y algunos ejemplos de mitigaciones.
Se ha tomado la decisión de bloquear este tema hasta que se avance más en la prueba de concepto, para que la DA pueda evaluar si los diseños siguen alineados con el enfoque recomendado.

# Reunión de la DA - 26 de agosto de 2020
Debatimos más a fondo https://github.com/mojaloop/design-authority/issues/51 en nuestra reunión de la DA del 26/08/2020.

Se anotaron algunos puntos clave:

Para aprovechar Typescript y ayudar a acelerar el desarrollo, el workstream del PISP ya ha separado el thirdparty-scheme-adapter.

Uno de los retos identificados con el enfoque del "multi-scheme-adapter" eran los casos en los que hay recursos compartidos entre las API, como GET /parties/{type}/{id}.

Nuestra decisión de separar la Thirdparty API en su propia API (y no ampliar la FSPIOP-API) se basaba en la idea de que "no todos los participantes querrán funciones de terceros" y, por tanto, no deberían tener que preocuparse por ellas. Como parte de la decisión de mantener una Thirdparty API separada, decidimos que algunos recursos estarían duplicados entre las dos.

Esto podría causar problemas más adelante, cuando los callbacks a algunos recursos quizá no puedan llegar a su destino deseado: por ejemplo, si un DFSP necesita escuchar callbacks PUT /parties/{type}/{id} tanto de la FSPIOP API como de la Thirdparty API, puede que a los DFSP no les sea posible enrutar esos callbacks al lugar correcto.

Lewis Daly dedicará más tiempo a trabajar en algunos diagramas y documentos de diseño, y volverá a la DA en breve

# Reunión de la DA (ad hoc) - 24 de agosto de 2020
El tema de debate fue: https://github.com/mojaloop/design-authority/issues/65
La reunión ad hoc se celebró abordando un tema más amplio relacionado con las recomendaciones que hay que llevar al CCB para que considere cambiar o mejorar la especificación de la API.

Se plantearon y debatieron muchos puntos válidos, y Michael y Adrian propusieron colaborar en esta plataforma para consolidar las ideas presentadas y formular una recomendación al CCB.

# Reunión de la DA - 19 de agosto de 2020
El tema de debate fue: https://github.com/mojaloop/design-authority/issues/61 
El grupo coincidió en que tiene que haber un equilibrio con la necesidad de eliminar la conciliación y la gestión de liquidez de los FSP (pagadores), no reteniendo ni reservando fondos más tiempo del necesario. Además, se propuso usar un 'período de gracia' antes de cerrar las transferencias por timeout, para compensar las diferencias de reloj. También se sugirió que, para las transacciones de riesgo, la notificación final en forma de llamada PATCH que se introdujo con la FSPIOP API v1.1 se puede usar para mitigar el riesgo para los FSP beneficiarios.

Un punto que se planteó es que, tras el período de timeout (más el período de gracia para tener en cuenta la diferencia de reloj), el estado de una transferencia no se puede cambiar: o está finalizada o no lo está, pero no se puede cambiar. Por ejemplo, si un período de timeout (expresado como un momento futuro y no como una duración) es de 10 segundos, entonces un FSP pagador (o el Switch) puede agregar un período de gracia de 1 segundo y, tras esperar 11 segundos, puede consultar a la entidad aguas abajo el estado de la transferencia; en ese momento, si la transferencia está finalizada (Committed o Aborted), el FSP pagador puede actuar en consecuencia; sin embargo, si está en un estado intermedio, la transferencia tiene que cerrarse por timeout, ya que el período de timeout ha terminado.

El grupo coincidió en la necesidad de retomar el tema de implementar 'timeouts telescópicos', que actualmente no se admiten en favor del cifrado de extremo a extremo de (la mayoría de) los mensajes.

# Reunión de la DA - 12 de agosto de 2020
El tema de debate fue: https://github.com/mojaloop/design-authority/issues/63
La DA debatió dónde y cómo crear y trabajar en los tickets de problemas. Con más de 50 repositorios, tiene sentido crear un ticket en el repositorio donde se originó y seguir trabajando en él allí hasta que se resuelva. El Product Owner y el Scrum Master tendrían el contexto y deberían replicar un ticket en el repositorio de la Design Authority con un enlace al ticket de origen. Eche un vistazo al tablero de la DA para ver las decisiones tomadas aquí: https://github.com/mojaloop/design-authority#workspaces/da-issue-log-5cdd507422733779191866e9/board?repos=186592307

# Reunión de la DA - 5 de agosto de 2020
El tema de debate fue: https://github.com/mojaloop/project/issues/852
El "enfoque de integración de HSM" se tocó varias veces, y el grupo de trabajo que se ocupa del diseño y la implementación lo llevó a debate en la reunión de la DA de esta semana para responder a algunas preguntas surgidas de la última sesión de planificación del PI, donde se volvió a presentar el avance.

Como no hemos terminado el debate, se ha organizado una reunión ad hoc de la DA este viernes con una parte de los miembros de la DA. El motivo es que había algunas preguntas concretas que no tuvimos tiempo de tratar en detalle, y que se aclararán con las personas que las plantearon. Escríbame si quiere participar en esa reunión.

# Reunión de la DA - 29 de julio de 2020
Problema debatido: https://github.com/mojaloop/design-authority/issues/60
Claudio señaló tres observaciones sobre el uso de las mejores prácticas en el código base de Mojaloop Core. Uno de los problemas tiene un ticket activo que se usará para su seguimiento; los otros dos también se seguirán como historias o errores separados (estándares). Claudio aportará ejemplos y, en algunos casos, fragmentos de muestra que se pueden usar.

Istvan y Michael debatieron el uso de un ID único para las solicitudes de búsqueda y propusieron celebrar una reunión de seguimiento la semana siguiente para quienes estén interesados. Se planteó como solución el uso actual de las cabeceras de traza (opcionales) para la trazabilidad (APM), que tras la revisión de la DA se puede proponer al CCB (si la DA lo acepta).

# Reunión de la DA - 22 de julio de 2020
Cancelada por la celebración de la convocatoria de Mojaloop del PI-11

# Reunión de la DA - 15 de julio de 2020
Sam repasó algunos de los cambios de alto nivel que se introducen con la versión Helm v10.4.0 y varias secciones de las notas de la versión: https://github.com/mojaloop/helm/releases/tag/v10.4.0
Eche un vistazo al tablero de temas de la DA: https://github.com/mojaloop/design-authority/issues/56

Neal y Michael debatieron el tema de la base de datos y el código compartidos entre central-settlement y central-ledger; van a continuar con el trabajo actual sobre la liquidación bruta continua, pero después de la convocatoria recogerán las aportaciones de la prueba de concepto de rendimiento y arquitectura (Event sourcing / CQRS) y después se alinearán. https://github.com/mojaloop/design-authority/issues/58

# Reunión de la DA - 8 de julio de 2020
El equipo de TIPS hizo una presentación del diseño y la implementación de un **motor de reglas** que satisface sus requisitos de interpretación en la **parte de liquidaciones**, para ampliar las tarifas que se aplican como parte de una transferencia. La implementación permite interpretar reglas en cualquier fase de una transacción. Se hará una presentación formal en la convocatoria durante la semana del 20 de julio de 2020, tras la cual se podrán considerar decisiones más informadas sobre la adaptación de esta implementación al código base OSS de Core como enfoque genérico para implementar un motor de reglas.
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/53 para ver un planteamiento detallado del problema, el avance de las reuniones en las notas y observaciones y también, si está completada, la decisión posterior.

# Reunión de la DA - 1 de julio de 2020
Como parte del workstream de "versionado", se está llevando a cabo una prueba de concepto de una "propuesta de despliegue sin tiempo de inactividad" y los comentarios de ese proyecto se han presentado en forma de planteamiento del problema, solución y demostración. El equipo que trabaja actualmente en ello son Lewis Daly, Mat de Haast y Sam Kummary. Los comentarios fueron bien recibidos y, como este trabajo está en curso, la DA hará seguimiento de los elementos de acción que surjan de la próxima presentación de este workstream en la reunión del PI 11.
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/54 para ver un planteamiento detallado del problema, el avance de las reuniones en las notas y observaciones y también, si está completada, la decisión posterior.

# Reunión de la DA (ad hoc) - 29 de junio de 2020
Debate sobre KNEX, continuación. El debate sobre KNEX se extendió a hablar del posible uso de herramientas de terceros para ayudar a generar consultas y facilitar los esfuerzos de migración. Esto no tiene relación directa con el uso de KNEX en sí y, tras explorarlo algo más a fondo, se decidió que no había un motivo de peso para seguir investigando el uso de KNEX en sí, sino para mantener la mente abierta y estar atentos a soluciones alternativas que aparezcan a medida que se introduzcan. Esas bibliotecas se medirán frente a la implementación actual para asegurar que desplegamos las herramientas adecuadas para el propósito adecuado. Este problema está ahora cerrado.
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/27 para ver un planteamiento detallado del problema, el avance de las reuniones en las notas y observaciones y también, si está completada, la decisión posterior.

# Reunión de la DA (ad hoc) - 25 de junio de 2020
Debate sobre KNEX, iniciado
Se han iniciado las conversaciones, destacando el planteamiento del problema de la dificultad de generar o crear scripts de migración cuando se producen cambios en la base de datos, así como el escenario de tener que hacer esas actualizaciones sobre una base de datos que está en línea en ese momento.
Con este contexto, se han programado sesiones de diseño continuas para determinar si KNEX sería capaz de gestionar el escenario anterior y si existen bibliotecas o herramientas alternativas que sustituyan o complementen la implementación actual, lo que podría ayudar a aliviar esta tarea difícil.
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/27 para ver un planteamiento detallado del problema, el avance de las reuniones en las notas y observaciones y también, si está completada, la decisión posterior.


# Reunión de la DA - 24 de junio de 2020
El debate de hoy empezó con: la obsolescencia del soporte de Helm2, problema #52, donde se acordó que la migración a Helm3 debería continuar. Debería facilitarse documentación para ayudar en el uso de las herramientas disponibles para la migración. Encuentre el enlace a este documento en https://github.com/mojaloop/design-authority/issues/52

Se debatió el tema de tener un enfoque de diseño para implementar un sistema genérico basado en reglas, con alguna referencia concreta primero al requisito de tener la capacidad de interrogar transacciones completadas o en curso (ya sea en la fase de transferencia o incluso tan pronto como en la fase de cotización) para aplicar "tarifas de intercambio" a esa transacción, según el tipo de transacción, tal como lo interpreten ciertas reglas.
Se van a debatir varias decisiones de diseño en torno a este tema, ya que el requisito es poder adjuntar reglas en varios puntos del recorrido de la transacción.
Se debatió la implementación actual de un motor de reglas en el proyecto TIPS y en un debate de seguimiento se pedirá que se demuestren las capacidades de esa solución, para que la DA vea si es lo bastante genérica como para incorporarla al Switch principal.
Siga el avance de las decisiones de diseño en torno a este problema en el tablero, en https://github.com/mojaloop/design-authority/issues/53


# Reunión de la DA - 17 de junio de 2020
El tema debatido fue: entender y definir los roles de Mojaloop para los casos de uso de PISP, entre redes, etc.
A la DA le parece bien que los workstreams avancen y separen nuevas API y definiciones de rol (p. ej. Thirdparty API, CNP API, etc.)
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/44 para ver un planteamiento detallado del problema y la decisión posterior.

# Reunión de la DA - 10 de junio de 2020
Esta semana la DA debatió: debatir el simulador de PISP: https://github.com/mojaloop/design-authority/issues/46
Se tomó la decisión de que, por el momento, el workstream del PISP trabajará en su propia rama del sdk-scheme-adapter, y esa división o abstracción del sdk-scheme-adapter se retomará más adelante (véase #51)

# Reunión de la DA - 3 de junio de 2020
Continuamos el debate iniciado la semana pasada sobre la API separada para el PISP y decidimos optar por la opción 4: separación máxima de las API, con archivos swagger/open api comunes para la definición y la reutilización del modelo de datos:
Consulte el enlace del tablero de la Design Authority aquí: https://github.com/mojaloop/design-authority/issues/47 para ver un planteamiento detallado del problema y la decisión posterior.

# Reunión de la DA - 27 de mayo de 2020
Se alcanzó el consenso entre los asistentes sobre el problema planteado y debatido hace algún tiempo, según lo consultado por Adrian. El resultado es que el desarrollo del Switch no será restrictivo ni prescriptivo, pero en lo que respecta a la recomendación para nuevas contribuciones y módulos, se preferirá que se hagan en TypeScript.

Se puso sobre la mesa un nuevo tema de debate: https://github.com/mojaloop/design-authority/issues/47, que busca responder a la pregunta de si tener una API separada para el PISP o simplemente ampliar la Open API existente. Se preparó una declaración de posición y se agregó como comentario. Se puso a todos los asistentes al día sobre la decisión a tomar y el problema #47 será el tema de la próxima reunión de la DA.

Se puso sobre la mesa otro tema relacionado con el PISP, que se programará para otra reunión de la DA: https://github.com/mojaloop/design-authority/issues/48, responder a la pregunta de cómo gestionar las notificaciones para que un PISP pueda registrarse como parte interesada en la notificación del éxito de una transferencia
