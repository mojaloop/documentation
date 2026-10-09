---
i18n_source_sha: be5e7bb5035dcd6ac98616e31f63b232b67253d5
---

# Gestión de incidentes

El objetivo principal de la gestión de incidentes es restablecer la operación normal del servicio lo antes posible y reducir al mínimo el impacto en las operaciones del negocio, asegurando así que se mantengan los mejores niveles posibles de calidad y disponibilidad del servicio. La "operación normal del servicio" se define aquí como la operación del servicio dentro de los [acuerdos de nivel de servicio (SLA)](service-level-agreements.md).

Esto se logra mediante un proceso de gestión de incidentes robusto y bien alineado, guiado por un sistema de Mesa de Servicio que ayuda a capturar todos los problemas y a hacer seguimiento del tiempo de resolución total (TAT) desde que se reporta un problema hasta que se resuelve y se cierra.

El proceso de gestión de incidentes implica detectar un incidente, registrarlo con toda la información adecuada, analizar el problema, corregir los defectos y restablecer el servicio conforme al TAT estipulado.

Esta sección reúne los principales procesos, conceptos y principios en torno a la gestión de incidentes.

::: tip NOTA
Los procesos que se describen en esta sección representan buenas prácticas y sirven de recomendaciones para las organizaciones que desempeñan un rol de Operador del Hub.
:::

::: tip NOTA
A lo largo de esta sección, los términos "cliente", "usuario final" y "usuario" designan todos a un empleado de un DFSP. Cuando esas palabras se usan en otro sentido, se señala el significado de la palabra y se explica en detalle.
:::

## La gestión de incidentes en una sola imagen

La figura siguiente define el flujo del proceso y los conceptos clave de la gestión de incidentes en una sola imagen.

<img src="../../../../.vuepress/public/incident_mgmt_single_image.png" width="75%" height="75%" />

<!--![La gestión de incidentes en una sola imagen](/incident_mgmt_single_image.png)-->

## Límites del proceso

El proceso de gestión de incidentes empieza cuando:

* un incidente se dispara por una llamada telefónica, un correo electrónico o una interacción en la Mesa de Servicio por parte de los usuarios o de los clientes
* un incidente se detecta a través de un proceso o una herramienta interna; por ejemplo, hay una alerta de evento de una de las herramientas de alerta o de los sistemas de monitoreo
* el personal de Soporte de cualquier nivel (Ingenieros de Soporte L1, L2, L3) o el Gerente de Servicio levantan directamente un incidente

El proceso de gestión de incidentes termina:

* para el cliente: cuando el estado del ticket en la herramienta de la Mesa de Servicio pasa a "Cerrado"
* para el equipo de la Mesa de Servicio: cuando el incidente está resuelto y se envía al cliente la validación para el cierre

Los límites de la gestión de incidentes estipulan que el proceso tiene en cuenta los siguientes prerrequisitos:

* Existe un Acuerdo de Nivel de Servicio (SLA) entre la Comunidad (por ejemplo, Mojaloop), las sociedades holding (por ejemplo, el Hub) y los Proveedores de Servicios Financieros Digitales (DFSP).
* Existe un SLA entre el Socio Implementador (el Hub) y los Proveedores de Software externos (por ejemplo, Microsoft, Oracle, etc.). 
* Existe un acuerdo de nivel operativo (OLA). Ese acuerdo describe las responsabilidades de cada grupo interno de Soporte frente a los demás grupos de Soporte, incluidos el proceso y el plazo de prestación de sus servicios.

## La gestión de incidentes paso a paso

Esta sección ofrece una descripción detallada del proceso de gestión de incidentes. Todos los incidentes que se levantan pasan por los siguientes pasos principales.

### Paso 1: Reportar y registrar el incidente, la solicitud de cambio o la pregunta

Los problemas, las solicitudes de cambio o las preguntas pueden reportarse y registrarse a través de la herramienta de la Mesa de Servicio en cuanto se producen. La herramienta de la Mesa de Servicio es el canal principal para recibir consultas relacionadas con incidentes. Los correos electrónicos, las llamadas telefónicas y la mensajería instantánea pueden usarse como canales secundarios. 

El estado de los tickets, tal como se captura en el sistema de la Mesa de Servicio, puede tomar los siguientes valores:

* **En curso**: un incidente que se ha recibido a través de la Mesa de Servicio y se ha asignado a un Ingeniero de Soporte. Los esfuerzos de resolución han comenzado.
* **Escalado**: un incidente que se ha escalado a alguna parte ajena al equipo de Operaciones, incluido el equipo de Entrega de Producto o proveedores de servicios L4 externos.
* **Pendiente**: un incidente que se ha puesto temporalmente en espera o que está a la espera de comentarios del usuario o de otro ticket que debe resolverse antes de poder resolver este. \
\
Teniendo en cuenta que usar el estado "Pendiente" detiene el reloj del SLA, la única razón que justifica usar "Pendiente" es cuando se requiere una acción del cliente. Debe ser una acción que sea responsabilidad del cliente o de su proveedor y que sea un prerrequisito para continuar el proceso; por ejemplo, solicitar información esencial o la aprobación para resolver la solicitud. Los tickets de Severidad 1 y 2 no deben ponerse en estado "Pendiente". Restablecer un servicio o una función de un servicio rara vez depende de una acción del cliente. La única excepción es cuando el cliente detiene la investigación o la implementación de una solución, o deniega una aprobación necesaria. En cualquier caso, la decisión del cliente tiene que documentarse.
* **Cancelado**: un incidente que se ha cancelado. Un incidente solo puede cancelarse cuando lo inicia el cliente.
* **Resuelto**: un incidente en el que trabajó un Ingeniero de Soporte y que se corrigió, y se ha disparado una alerta al usuario para que lo reabra si no queda satisfecho.
* **Cerrado**: un incidente que se cerró una vez que el usuario final acusó recibo de la resolución. 

Toda la información pertinente relativa a los incidentes debe registrarse para que se mantenga un registro histórico completo. Al mantener registros de incidentes exactos y completos, el personal del grupo de Soporte que se asigne en el futuro estará en mejores condiciones de resolver los incidentes registrados.

### Paso 2: Categorizar y priorizar 

Al usuario final o a quien lo solicita se le asigna un número de ticket como referencia y para facilitar el acceso cuando el Equipo de Soporte acusa recibo del problema y actúa sobre él. El ticket debería ser visible para quien lo solicita (el empleado del DFSP que levantó el problema) en todos los niveles de Soporte.

Quien lo solicita recibirá notificación automática por correo electrónico de cualquier cambio, actualización de estado, solicitud de más información, disponibilidad para pruebas o resolución final relativos al ticket. 

Por lo general, clasificamos las solicitudes de soporte en:

* Incidente
* Solicitud de Servicio
* Petición de Cambio o Solicitud de Cambio (RFC, como funcionalidades o mejoras)

Los incidentes se categorizan y se subcategorizan según el servicio de TI o el área de negocio que el incidente está interrumpiendo. 

Estas son algunas categorías de servicio de ejemplo:

* Infraestructura
* Mojaloop
* Seguridad
* Liquidaciones
* Incorporación

La severidad de un incidente puede determinarse usando una [matriz de categorización](#matriz-de-categorizacion-de-incidentes). Según su severidad, los incidentes pueden categorizarse como:

* Crítico = S1
* Grave = S2
* Medio = S3
* Menor = S4

Una vez categorizado el incidente, se enruta automáticamente a un Ingeniero de Soporte L1 con la experiencia adecuada.

### Paso 3: Investigar y resolver

El recurso de Soporte asignado se encargará de investigar el problema, así como de preparar el registro del incidente y de comunicarse con el cliente sobre cómo resolverlo.

La investigación del incidente puede incluir cualquiera de las siguientes acciones: 

* Recopilación y análisis de información 
* Investigación, incluida la reproducción del problema 
* Obtención de información adicional de otras fuentes

La resolución del incidente puede incluir cualquiera de las siguientes acciones: 

* Proporcionar una resolución o pasos hacia una resolución 
* Cambios de configuración

Según la complejidad del incidente, puede que haya que descomponerlo en subtareas o tareas. Normalmente se crean tareas cuando la resolución de un incidente requiere la contribución de varios técnicos de distintos departamentos.

Mientras se procesa el incidente, el Ingeniero de Soporte debe asegurar que no se incumpla el Acuerdo de Nivel de Servicio. Un SLA es el tiempo aceptable dentro del cual un incidente necesita una respuesta (SLA de respuesta) o una resolución (SLA de resolución). Los SLA pueden asignarse a los incidentes según parámetros como la categoría de servicio, quien lo solicita, el impacto, la urgencia, etc. En los casos en que un SLA esté a punto de incumplirse o ya se haya incumplido, el incidente puede escalarse funcional o jerárquicamente para asegurar que se resuelva cuanto antes.

Un incidente se considera resuelto cuando el Equipo de Soporte L1/L2/L3 ha dado con una solución alternativa temporal o con una solución permanente para el problema. Las soluciones alternativas pueden ser:

* instrucciones que se dan al cliente sobre cómo completar su trabajo por un método alternativo
* correcciones temporales que ayudan a que un sistema funcione como se espera, pero que no resuelven el problema de forma permanente

Las soluciones alternativas deben documentarse y comunicarse a la Mesa de Servicio para que puedan agregarse a la Base de Conocimiento. (Es una buena práctica mantener un repositorio de artículos de la Base de Conocimiento que describan los pasos de la solución alternativa o de la resolución de los incidentes ocurridos en el pasado.) Esto asegurará que las soluciones alternativas estén accesibles para la Mesa de Servicio y faciliten la resolución en futuras repeticiones del incidente.

### Paso 4: Escalar

El escalamiento de incidentes es el reconocimiento de que existe la posibilidad de que un incidente supere los plazos de resolución acordados en cada nivel de Soporte. Una gestión clara del escalamiento permite al Equipo de Soporte identificar, rastrear, monitorear y gestionar las situaciones que requieren mayor atención y una acción rápida. 

Hay dos tipos de escalamiento:

* **Escalamiento funcional**: este tipo de escalamiento entra en juego cuando un equipo de un nivel de Soporte (por ejemplo, L1) no puede resolver el problema o mantenerse dentro del plazo acordado (es decir, se supera el tiempo objetivo de resolución). Por tanto, el caso se asigna de forma proactiva al siguiente nivel de servicio (por ejemplo, L2).
* **Escalamiento jerárquico**: este tipo de escalamiento actúa como medio para informar a todas las partes implicadas, de forma proactiva, de un posible incumplimiento del SLA. Esto ayuda a aportar orden, estructura, responsabilidad, titularidad, gestión enfocada y movilización de recursos con el fin de prestar servicios eficaces y eficientes. 

### Paso 5: Cerrar el incidente

Un incidente puede cerrarse una vez que el problema está resuelto y el usuario acusa recibo de la resolución y queda satisfecho con ella.

## Matriz de categorización de incidentes

Una de las etapas más importantes de la gestión de incidentes es la categorización del incidente. Esto no solo ayuda a ordenar los tickets entrantes, sino que también asegura que se enruten a los Ingenieros de Soporte más cualificados para trabajar en el problema. La categorización de incidentes también ayuda al sistema de la Mesa de Servicio a aplicar a los incidentes los SLA más adecuados y a comunicar esas prioridades a los usuarios finales. Una vez categorizado un incidente, los Ingenieros de Soporte pueden diagnosticarlo y proporcionar al usuario final una resolución.

La tabla siguiente ofrece orientación sobre cómo clasificar la severidad de un incidente.

<table>
<caption><strong>Matriz de categorización de incidentes</strong></caption>
<colgroup>
<col style="width: 16%" />
<col style="width: 83%" />
</colgroup>
<thead>
<tr class="header">
<th>Código de severidad</th>
<th>Criterios</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Severidad 1</p></td>
<td><ul>
<li><p>Impacto extenso en el negocio, caída del sistema de Producción, la operación normal no es posible.</p></li>
<li><p>Cualquier incidente que haya provocado una caída importante del Hub, incluida la conectividad de varios socios o DFSP.</p></li>
<li><p>Cualquier incidente que presente riesgos financieros importantes y tenga implicaciones contractuales.</p></li>
<li><p>Un incidente de seguridad con un impacto importante en la privacidad o la disponibilidad del Hub, de los socios o DFSP, o de los datos de los clientes.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Severidad 2</p></td>
<td><ul>
<li><p>Caída parcial del Hub.</p></li>
<li><p>Una funcionalidad clave está afectada y no hay solución alternativa disponible.</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Severidad 3</p></td>
<td><ul>
<li><p>Impacto funcional menor o moderado en un solo usuario o en un grupo pequeño de usuarios. Existe una solución alternativa.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Severidad 4</p></td>
<td><ul>
<li><p>Un incidente menor con (casi) ningún impacto o perjuicio para la funcionalidad del sistema, pero que aun así es un error válido.</p></li>
</ul></td>
</tr>
</tbody>
</table>

Leyenda:

* Severidad 1 = Crítico
* Severidad 2 = Grave
* Severidad 3 = Medio
* Severidad 4 = Menor

El código de severidad asignado a un incidente determinará el tiempo de solución y lo usará la Mesa de Servicio para asignar recursos a la solicitud.

Además de la severidad, en algunos casos también puede haber que considerar la prioridad de un incidente. La prioridad la asigna el Operador del Hub (y no el cliente) y es el orden en el que se corregirá el incidente. Cuanto mayor sea la prioridad, antes se resolverá el incidente. Considere el siguiente ejemplo: un error cosmético como una errata en una página web probablemente se clasificará como de severidad baja, pero podría ser una corrección rápida y sencilla y clasificarse como de prioridad alta. Por eso es importante dar a la severidad y a la prioridad la debida consideración.

La tabla siguiente ofrece orientación sobre cómo asignar prioridad a un incidente.

<table>
<caption><strong>Matriz de prioridad</strong></caption>
<colgroup>
<col style="width: 16%" />
<col style="width: 83%" />
</colgroup>
<thead>
<tr class="header">
<th>Código de prioridad</th>
<th>Criterios</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Prioridad 1</p></td>
<td>Se ha producido un problema grave que afecta a varios usuarios dentro de un receptor del servicio (&gt;50 % de los usuarios del receptor del servicio) hasta el punto de que no pueden desempeñar las funciones de trabajo que tienen asignadas, O bien se ven afectados el receptor del servicio o áreas ajenas a él.</td>
</tr>
<tr class="even">
<td><p>Prioridad 2</p></td>
<td>Se ha producido un problema que afecta a varios usuarios (afecta a &gt;10 pero no a más del 50 % de todos los usuarios del receptor del servicio) O a un usuario avanzado concreto del servicio, hasta el punto de que no pueden desempeñar las funciones de trabajo que tienen asignadas y se ve afectada una unidad de negocio.</td>
</tr>
<tr class="odd">
<td><p>Prioridad 3</p></td>
<td>Se ha producido un problema que afecta a un solo usuario O BIEN (afecta a &lt;10 usuarios O a no más del 25 % de todos los usuarios) hasta el punto de que no pueden desempeñar las funciones de trabajo que tienen asignadas.</td>
</tr>
<tr class="even">
<td><p>Prioridad 4</p></td>
<td>Se ha producido un problema que afecta a un solo usuario y que reduce la funcionalidad de una sola aplicación. Hay una solución alternativa para que el usuario desempeñe las funciones de trabajo que tiene asignadas, pero la interrupción reduce su productividad.</td>
</tr>
</tbody>
</table>

## Incidentes de seguridad

Esta sección describe el procedimiento que se recomienda implementar a un Operador del Hub para atender los eventos e incidentes de seguridad. Los incidentes de seguridad pueden clasificarse como incidentes de Severidad 1, Severidad 2, Severidad 3 o Severidad 4. Sea cual sea su categorización, siga los pasos descritos en la tabla siguiente si un incidente está relacionado con la seguridad.

<table>
<caption><strong>Gestión de incidentes de seguridad</strong></caption>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2">Paso</th>
<th>Acción o información adicional</th>
<th>Rol</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>Paso 1</strong>: se recibe un posible evento o incidente de seguridad a través de la Mesa de Servicio mediante un ticket asignado al equipo de seguridad (L1) para su revisión y triaje iniciales.</p></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td><p><strong>Paso 2</strong>: poner en marcha el proceso de triaje.</p></td>
<td><p><strong>Paso 2a</strong>:</p>
<ul>
<li><p>Identificar los artefactos del incidente.</p></li>
<li><p>Identificar los dispositivos, sistemas o usuarios afectados.</p></li>
</ul></td>
<td><ul>
<li><p>Reunir los indicadores clave de una amenaza.</p></li>
<li><p>Recuperar los registros.</p></li>
<li><p>Consultar los artefactos (direcciones IP, nombres de usuario, URL, nombres de host, etc.).</p></li>
<li><p>Revisar los registros para averiguar si el incidente infringe alguna ley o regulación (si es un incidente grave, podría dañar la reputación de la organización).</p></li>
</ul></td>
<td><p>Responsable de Seguridad de la Información (ISO) L1</p></td>
</tr>
<tr class="odd">
<td><p></p></td>
<td><p><strong>Paso 2b</strong>:</p>
<ul>
<li><p>Evaluar la situación: evaluación del impacto.</p></li>
<li><p>Estimar el efecto potencial del evento o del incidente.</p></li>
</ul></td>
<td><ul>
<li><p>Revisar los indicadores de compromiso disponibles.</p></li>
<li><p>Evaluar el impacto según la criticidad del sistema afectado.</p></li>
<li><p>Revisar los registros de auditoría.</p></li>
<li><p>Trazar una línea de tiempo de los eventos.</p></li>
</ul></td>
<td><p>ISO L1</p></td>
</tr>
<tr class="even">
<td><p></p></td>
<td><p><strong>Paso 2c</strong>:</p>
<p>Recoger evidencia.</p></td>
<td><ul>
<li><p>Recoger y cotejar toda la información disponible para permitir la categorización.</p></li>
</ul></td>
<td><p>ISO L1</p></td>
</tr>
<tr class="odd">
<td><p></p></td>
<td><p><strong>Paso 2d</strong>:</p>
<p>Determinar la categorización.</p></td>
<td><ul>
<li><p>A partir de la información recogida, asignar una categoría al ticket.</p></li>
<li><p>Seguridad L1 actualizará las categorizaciones según corresponda.</p></li>
</ul>
<p>Ejemplos de categorías son:</p>
<ul>
<li><p>Denegación de servicio (DOS)</p></li>
<li><p>Código malicioso</p></li>
<li><p>Acceso no autorizado</p></li>
<li><p>Fuga o pérdida de datos</p></li>
<li><p>Vulneración de datos (incumplimiento de la regulación relativa a la protección de datos)</p></li>
<li><p>Uso inapropiado</p></li>
</ul></td>
<td><p>ISO L1</p></td>
</tr>
<tr class="even">
<td><p></p></td>
<td><p><strong>Paso 2e</strong>:</p>
<p>Dar los pasos básicos para mitigar el efecto en el entorno.</p></td>
<td>Los pasos básicos pueden incluir tareas como:
<ul>
<li><p>Bloquear un endpoint.</p></li>
<li><p>Desplegar antimalware donde se requiera.</p></li>
<li><p>Revisar los Procedimientos Operativos Estándar (SOP) de seguridad (si corresponde) por si hay pasos adicionales que puedan requerirse.</p></li>
</ul>
<p>Si los pasos de mitigación que se toman resuelven con éxito el problema reportado, Seguridad L1 actualizará el ticket y pasará al Paso 8 (Cerrar el problema).</p></td>
<td><p>ISO L1/L2</p></td>
</tr>
<tr class="odd">
<td><p><strong>Paso 3</strong>: evaluar si el problema reportado es un evento o un incidente.</p></td>
<td><p></p></td>
<td><p>La decisión de la evaluación la toma el equipo de Seguridad L1 en colaboración con Seguridad L2.</p></td>
<td><p>ISO L1/L2</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 4.1</strong>: si el problema reportado se categoriza como "evento", siga estos pasos:</p></td>
<td><p><strong>Paso 4.1a</strong>:</p>
<p>Realizar el seguimiento del evento.</p></td>
<td>Ejemplos de seguimiento de eventos son:
<ul>
<li><p>Verificar e instalar antimalware en todos los hosts.</p></li>
<li><p>Disparar tickets que soliciten la aplicación de parches en los sistemas o la revisión del evento por parte del equipo de Operaciones.</p></li>
</ul></td>
<td><p>ISO L1/L2</p></td>
</tr>
<tr class="odd">
<td><p></p></td>
<td><p><strong>Paso 4.1b</strong>:</p>
<p>Ir al Paso 8.</p></td>
<td></td>
<td><p>ISO L1</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 4.2</strong>: si el problema reportado se categoriza como "incidente", siga estos pasos:</p></td>
<td><p><strong>Paso 4.2a</strong>:</p>
<p>El ISO L1 escala al ISO L2 para su investigación posterior reasignando el ticket al grupo de Seguridad L2 para su seguimiento.</p></td>
<td></td>
<td><p>ISO L1</p></td>
</tr>
<tr class="odd">
<td><p></p></td>
<td><p><strong>Paso 4.2b</strong>:</p>
<p>El ISO L2 acusa recibo del ticket de L1 y procede a abrir el Informe de Incidente de Seguridad.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td><p></p></td>
<td><p><strong>Paso 4.2c</strong>:</p>
<p>El ISO L2 revisa y verifica la severidad y la categorización del incidente.</p></td>
<td><ul>
<li><p>Para las definiciones de severidad de los incidentes, consulte la <a href="incident-management.html#matriz-de-categorizacion-de-incidentes">matriz de categorización</a>.</p></li>
<li><p>Continúe con el Paso 5.</p></li>
</ul></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td><p><strong>Paso 5.1</strong>: si el incidente reportado se categoriza como incidente "S1", siga estos pasos:</p></td>
<td><p><strong>Paso 5.1a</strong>:</p>
<p>Actualizar el Informe de Incidente de Seguridad.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 5.1b</strong>:</p>
<p>Informar a las partes interesadas por correo electrónico seguro.</p></td>
<td><p>Las partes interesadas están documentadas en el <a href="incident-management-escalation-matrix.html">Apéndice A: Matriz de escalamiento de la gestión de incidentes</a>.</p></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 5.1c</strong>:</p>
<p>Continúe con el Paso 6.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 5.2</strong>: si el incidente reportado se categoriza como incidente "S4", siga estos pasos:</p></td>
<td><p><strong>Paso 5.2a</strong>:</p>
<p>Continúe con el Paso 6.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td><p><strong>Paso 6</strong>: contener y erradicar.</p></td>
<td><p><strong>Paso 6a</strong>:</p>
<p>Revisar y actualizar las acciones de mitigación para reducir el impacto.</p></td>
<td><p>Ejemplos de acciones de mitigación son:</p>
<ul>
<li><p>Cambiar las contraseñas.</p></li>
<li><p>Bloquear el acceso.</p></li>
</ul></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 6b</strong>:</p>
<p>Recoger evidencia.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 6c</strong>:</p>
<p>Realizar el análisis de causa raíz e identificar e implementar una corrección.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 6d</strong>:</p>
<p>Actualizar los Procedimientos Operativos Estándar (SOP) de incidentes según sea necesario.</p></td>
<td><p>L3 revisa las actualizaciones de los SOP antes de adoptarlas.</p></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td><p><strong>Paso 6.1</strong>: si el Paso 6 tiene éxito, siga estos pasos:</p></td>
<td><p><strong>Paso 6.1a</strong>:</p>
<p>Actualizar el Informe de Incidente de Seguridad y el ticket.</p></td>
<td><p>Asegúrese de que el ticket no contenga información sensible de seguridad.</p></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 6.1b</strong>:</p>
<p>Comunicarse con las partes interesadas por correo electrónico seguro.</p></td>
<td><p>Las partes interesadas están documentadas en el <a href="incident-management-escalation-matrix.html">Apéndice A: Matriz de escalamiento de la gestión de incidentes</a>.</p></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 6.1c</strong>:</p>
<p>Levantar el bloqueo del sistema o del servicio.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 6.1d</strong>:</p>
<p>Continúe con el Paso 8.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td><p><strong>Paso 6.2</strong>: si el Paso 6 no tiene éxito, siga estos pasos:</p></td>
<td><p><strong>Paso 6.2a</strong>:</p>
<p>Escalar al equipo de Seguridad L3.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="even">
<td></td>
<td><p>Paso <strong>6.2b</strong>:</p>
<p>Informar al equipo de negocio.</p></td>
<td></td>
<td><p>ISO L2</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 6.2c</strong>:</p>
<p>L3 continúa con el Paso 7.</p></td>
<td></td>
<td><p>ISO L3</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 7</strong>: L3 revisa y resuelve el problema.</p></td>
<td><p><strong>Paso 7a</strong>:</p>
<p>Revisar las actividades y el historial del incidente documentados por L1 y L2.</p></td>
<td></td>
<td><p>ISO L3</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 7b</strong>:</p>
<p>Dar orientación sobre nuevas acciones de contención.</p></td>
<td></td>
<td><p>ISO L3</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 7c</strong>:</p>
<p>Si L3 resuelve el problema, ir al Paso 8.</p></td>
<td></td>
<td><p>ISO L3</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 7d</strong>:</p>
<p>Si L3 no puede resolver el problema, puede escalar al OEM del sistema o del software o contratar servicios especializados (sujeto a aprobación) para obtener soporte.</p></td>
<td><p>Si L3 no puede resolver el problema, puede escalar al OEM del sistema o del software o contratar servicios especializados (sujeto a aprobación) para obtener soporte. Puede que haya que tomar una decisión sobre activar el plan de recuperación ante desastres, incluida la formación de una "sala de crisis".</p><p>Un plan de recuperación ante desastres (DRP) es un arreglo a medida, basado en las capacidades técnicas del Operador del Hub, así como en su apetito de riesgo. Forma parte de las políticas de Seguridad de TI del Operador del Hub. Es necesario evaluar los detalles de la política de DRP y de las expectativas del Operador del Hub, y afinar el despliegue para ajustarlo a sus necesidades. Los detalles deben concretarse durante la implementación (preferiblemente durante la fase de diseño), ya que las distintas opciones disponibles pueden tener implicaciones de costo.</p></td>
<td><p>ISO L3</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 8</strong>: cerrar el problema.</p></td>
<td><p><strong>Paso 8a</strong>:</p>
<p>Restablecer los sistemas afectados.</p></td>
<td></td>
<td><p>ISO L1 / L2 / L3</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 8b</strong>:</p>
<p>Actualizar el Informe de Incidente de Seguridad.</p></td>
<td></td>
<td><p>ISO L2 / L3</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 8c</strong>:</p>
<p>Identificar y comunicar las lecciones aprendidas.</p></td>
<td></td>
<td><p>ISO L2 / L3</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 8d</strong>:</p>
<p>El equipo de respuesta a incidentes revisa las recomendaciones pertinentes para su posible adopción.</p></td>
<td><p>Esta sesión de revisión puede incluir a los equipos de Operaciones Técnicas y de Gestión del Servicio, según la severidad.</p></td>
<td><p>ISO L1 / L2 / L3</p></td>
</tr>
<tr class="even">
<td></td>
<td><p><strong>Paso 8e</strong>:</p>
<p>Actualizar a las partes interesadas.</p></td>
<td></td>
<td><p>ISO L2 / L3</p></td>
</tr>
<tr class="odd">
<td></td>
<td><p><strong>Paso 8f</strong>:</p>
<p>Cerrar el problema.</p></td>
<td></td>
<td><p>ISO L1 / L2 / L3</p></td>
</tr>
<tr class="even">
<td><p><strong>Paso 9</strong>: el ISO L3 modifica y revisa las políticas y los procedimientos de vulneración.</p></td>
<td></td>
<td></td>
<td><p>ISO L3</p></td>
</tr>
</tbody>
</table>

La figura siguiente muestra un resumen del proceso descrito arriba.

![Gestión de incidentes de seguridad](../../../../.vuepress/public/security_incident_process.png)

### Plantilla del Informe de Incidente de Seguridad

Al escribir un Informe de Incidente de Seguridad, es una buena práctica usar una plantilla creada para ese fin.

## Roles y responsabilidades

Esta sección ofrece directrices genéricas sobre los roles y las responsabilidades propuestos dentro del proceso de gestión de incidentes.

::: tip NOTA
Conviene describir el soporte continuo a las operaciones técnicas del Hub de Mojaloop en forma de niveles. Este documento describe cuatro niveles. Los niveles son cómodos porque cada nivel de soporte requiere un grado distinto de conocimiento del sistema y de acceso a él. Dicho de otro modo, los niveles se refieren a distintos roles o equipos de Soporte dentro de su organización.

Algunos de esos equipos pueden externalizarse opcionalmente, según el nivel de experiencia o de capacidad que haya dentro de su organización. Si decide externalizar las funciones de Soporte, hay organizaciones dentro de la comunidad de Mojaloop que sí ofrecen distintos niveles de Soporte como servicio. (Para más información y referencias, contacte con la Mojaloop Foundation.)
:::

### Usuario final / usuario / solicitante / L0

*Rol*

Es la parte interesada que sufre una interrupción del servicio y levanta un ticket de incidente para poner en marcha el proceso de gestión de incidentes.

*Responsabilidades*

* Contactar con la Mesa de Servicio para levantar una nueva solicitud de incidente.
* Hacer seguimiento de una solicitud existente.
* Monitorear el canal de comunicación por si hay comentarios de los Ingenieros de Soporte.
* Comunicar con claridad a los Ingenieros de Soporte toda la información requerida o solicitada.
* Acusar recibo del restablecimiento del servicio y de la finalización del ticket.
* Responder a las encuestas de seguimiento tras la resolución del ticket, cerrando el ciclo de retroalimentación.

### Equipo de Nivel 1 / Mesa de Servicio

*Rol*

Es el primer punto de contacto (Soporte de Nivel 1) para quienes solicitan o para los usuarios finales cuando quieren levantar una solicitud o un incidente. Este rol es responsable de la resolución básica de la Mesa de Servicio, del diagnóstico inicial y de la investigación de los tickets de la Mesa de Servicio.

*Responsabilidades*

* Registrar todas las solicitudes de incidente entrantes con los parámetros adecuados, como la severidad y la prioridad (si esta última corresponde).
* Asignar los tickets a los Ingenieros de Soporte según los parámetros anteriores (severidad y prioridad).
* Analizar y resolver el incidente para restablecer el servicio.
* Escalar al Equipo de Nivel 2 los incidentes sin resolver.
* Reunir toda la información necesaria de quienes lo solicitan y enviarles actualizaciones periódicas del estado de su solicitud.
* Actuar como punto de contacto para quienes lo solicitan y, si hace falta, coordinar entre el Equipo de Nivel 2 y los usuarios finales.
* Verificar la resolución con el usuario final y recoger sus comentarios mientras actualiza los tickets.
* Monitorear los comentarios y las encuestas relativos a las acciones que L1 tomó para resolver el problema, con el fin de analizar la calidad del servicio ofrecido.

### Equipo de Nivel 2 (Soporte L2 de Aplicaciones, Infraestructura, Seguridad y Operaciones de Negocio) (Equipo de Soporte al Cliente)

*Roles*

Esta función de soporte está formada por ingenieros o Expertos en la Materia (SME) de Operaciones de Negocio con conocimiento avanzado del Hub. Se espera que el Equipo L2 proporcione resolución de problemas en profundidad, análisis técnico, análisis de transacciones y soporte para resolver los incidentes reportados. Normalmente reciben solicitudes más complejas de los usuarios finales; también reciben solicitudes en forma de escalamientos del Equipo L1.

*Responsabilidades*

* Llevar a cabo el diagnóstico del incidente.
* Documentar los pasos seguidos para resolver el incidente y enviar artículos a la Base de Conocimiento. (En cada incidente, el Equipo de Soporte actualiza la Base de Conocimiento. El propósito de los artículos de la Base de Conocimiento es que los usuarios finales y el personal de Soporte puedan resolver los problemas por su cuenta.)
* Atender los incidentes intermedios, por ejemplo, los relacionados con Aplicaciones, Infraestructura, Análisis de Registros, Análisis de Transacciones, etc.
* Si el incidente se resuelve, confirmar la resolución con el usuario final.
* Dar soporte a la incorporación de los DFSP.

### Equipo de Nivel 3 (Soporte L3 de Aplicaciones, Infraestructura y Seguridad) (Equipo de Soporte Técnico)

*Roles*

Este nivel suele estar formado por Ingenieros Especialistas con conocimiento avanzado de ámbitos concretos del Hub; por ejemplo, conocimiento de los componentes de infraestructura o de las aplicaciones del sistema, o experiencia en ingeniería de seguridad. 

*Responsabilidades*

* Realizar un análisis profundo o reproducir el problema en un entorno de pruebas para diagnosticarlo correctamente y probar la solución.
* Interpretar y analizar el código y los datos usando la información triada por L1 y L2.
* Si no se resuelve, escalar el incidente a los socios de soporte "L4" para identificar el problema subyacente, o a proveedores externos, DFSP o al Banco liquidador (consultas de transacciones o informes de transferencias), según corresponda.
* Aportar experiencia en la materia.
* Documentar el incidente y actualizar la Base de Conocimiento. (En cada incidente, el Equipo de Soporte actualiza la Base de Conocimiento. El propósito de los artículos de la Base de Conocimiento es que los usuarios finales y el personal de Soporte puedan resolver los problemas por su cuenta.)

### Gestor de Incidentes / Gerente de Servicio

*Rol*

El Gerente de Servicio supervisa la eficacia del proceso. El Gerente de Servicio gestiona el proceso para restablecer la operación normal del servicio lo antes posible y reducir al mínimo el impacto en las operaciones del negocio. 

*Responsabilidades*

* Servir de punto de contacto para todos los incidentes S1 reportados.
* Planificar y facilitar todas las actividades que implica el proceso de gestión de incidentes.
* Asegurar que se siga el proceso correcto en todos los tickets, y corregir cualquier desviación.
* Coordinarse y comunicarse con el Dueño del Proceso.
* Alinear las expectativas del cliente con los SLA siendo la interfaz entre los clientes y el equipo de Operaciones.
* Identificar los incidentes que necesitan revisarse y llevar a cabo la revisión.

### Dueño del Proceso: Gerente de Operaciones Técnicas

*Rol*

Es el dueño del proceso que se sigue para gestionar los incidentes. Este rol también actúa como coordinador entre equipos y organizaciones. El Gerente de Operaciones Técnicas analiza, modifica y mejora el proceso para asegurar que sirva lo mejor posible a los intereses de la organización.

*Responsabilidades*

* Responde de la calidad general del proceso. Supervisa la gestión y el cumplimiento de los procedimientos, los modelos de datos, las políticas y las tecnologías asociados al proceso.
* Es dueño del proceso y de la documentación que lo sustenta, desde una perspectiva estratégica y táctica.
* Asegura que el proceso de gestión de incidentes esté alineado con otras políticas de la organización, por ejemplo, la Política de RR. HH., la Política de Seguridad, los Principios Rectores de Level One, etc.
* Define los [indicadores clave de desempeño (KPI)](key-terms-kpis.md) y los alinea con los factores críticos de éxito (CSF), y asegura que esos objetivos se cumplan.
* Diseña, documenta, revisa y mejora los procesos.
* Establece la mejora continua del servicio (CSI) y asegura que los procedimientos, las políticas, los roles, la tecnología y los demás aspectos del proceso de gestión de incidentes se revisen y se mejoren.
* Se mantiene informado sobre las buenas prácticas del sector y las incorpora al proceso de gestión de incidentes.

## Salidas del proceso de gestión de incidentes

El proceso de gestión de incidentes produce las siguientes salidas. Tenga en cuenta que la única salida obligatoria para los incidentes de Seguridad o S1 es el Análisis de Causa Raíz (RCA), y que todas las demás salidas que figuran a continuación podrían alimentarlo.

* Incidentes resueltos o cerrados. Es el resultado más deseado del proceso de gestión de incidentes. El registro del incidente cerrado contiene los detalles exactos de los atributos del incidente y de los pasos dados para su resolución o para la solución alternativa.
* Solicitudes de Cambio (RFC).
* Métricas de resolución (Tiempo medio entre fallos, Tiempo medio hasta la reparación, Tiempo medio hasta el acuse de recibo y Tiempo medio hasta el fallo). Para más detalles sobre los KPI, consulte el [Glosario](key-terms-kpis.md).
* Cambio implementado con éxito a través del proceso de gestión de cambios.
* Documento de RCA que cumple la plantilla de RCA.
* Servicio restablecido.
* Base de datos de la Base de Conocimiento actualizada.
* Notificación a las distintas partes interesadas por diversos canales (Mesa de Servicio, correo electrónico, llamada, etc.) sobre el inicio, la resolución y el cierre de un incidente S1.
* Informe Diario de Operación e informe de gestión actualizados para constatar las decisiones tomadas respecto a las mejoras del servicio y a la asignación o reasignación de recursos.
* Detalles registrados con exactitud de la indisponibilidad del servicio o de sus componentes (por ejemplo, inicio, fin, duración, clasificación de la indisponibilidad, etc.).

## Impacto en otros procesos

El proceso de gestión de incidentes se conecta con otros procesos, alimentándose e influyéndose mutuamente:

* **Proceso de Gestión de Cambios**: el objetivo del proceso de gestión de cambios es asegurar que se usen métodos y procedimientos estandarizados para atender de forma eficiente y rápida todos los cambios, con el fin de reducir al mínimo el impacto de los incidentes relacionados con cambios en la disponibilidad o la calidad del servicio y, en consecuencia, mejorar las operaciones diarias de la organización.
* **Proceso de Gestión de Versiones**: la gestión de versiones y despliegues se define como el proceso de gestionar, planificar y programar el despliegue de servicios de TI, actualizaciones y versiones en el entorno de producción. El objetivo principal de este proceso es asegurar que se proteja la integridad del entorno en vivo y que se publiquen los componentes correctos y las funcionalidades validadas para su uso por parte del cliente.
* **Proceso de Comunicación de Incidentes**: la comunicación de incidentes es el proceso de avisar a los usuarios de que un servicio está sufriendo algún tipo de caída o degradación del rendimiento. Es especialmente importante en los servicios en los que se espera disponibilidad 24/7. La comunicación de incidentes es importante para todos los socios, los clientes y los clientes de estos.
