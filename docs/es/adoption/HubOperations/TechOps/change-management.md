---
i18n_source_sha: 205adaee810fae7c071b020ae149c1fb5a8daef5
---

# Gestión de cambios

El propósito del proceso de gestión de cambios es controlar el ciclo de vida de todos los cambios, permitiendo hacerlos con la mínima interrupción de los servicios de TI.

::: tip NOTA
Los procesos que se describen en esta sección representan buenas prácticas y sirven de recomendaciones para las organizaciones que desempeñan un rol de Operador del Hub.
:::

## Objetivos

Los objetivos de la gestión de cambios son:

* Responder a los requisitos de negocio cambiantes maximizando el valor y reduciendo los incidentes y el retrabajo
* Responder a las Solicitudes de Cambio (RFC) que alinearán los servicios con las necesidades del negocio
* Asegurar que los cambios se registren y se evalúen, y que los cambios autorizados se gestionen de forma controlada
* Optimizar el riesgo global del negocio

## Alcance

El alcance de la gestión de cambios debería incluir los cambios en todas las arquitecturas, procesos, herramientas, métricas y documentación, así como los cambios en todos los elementos de configuración (CI) a lo largo de todo el ciclo de vida del servicio.

Todos los cambios deben registrarse y gestionarse en un entorno controlado en todos los CI. Estos pueden ser activos físicos, como servidores o redes; activos virtuales, como servidores virtuales o almacenamiento; u otros tipos de activos, como convenios o contratos.

La gestión de cambios no es responsable de coordinar todos los procesos de gestión del servicio para asegurar la implementación fluida de los proyectos.

## Roles y responsabilidades

Los roles que figuran a continuación indican algunas de las partes interesadas cruciales para que el proceso de gestión de cambios sea eficaz.

### Gestor de Cambios

El Gestor de Cambios actúa como líder y es responsable del proceso de gestión de cambios en su conjunto.

Las responsabilidades principales del Gestor de Cambios son:

* Impulsar la eficiencia y la eficacia del proceso de gestión de cambios
* Producir información de gestión
* Supervisar la eficacia de la gestión de cambios y hacer recomendaciones de mejora
* Cumplir el proceso de gestión de cambios
* Planificar y gestionar el soporte a las herramientas y los procesos de gestión de cambios
* Verificar que las RFC se completen correctamente y se asignen a las autoridades de cambio (si corresponde)
* Comunicar las decisiones de las autoridades de cambio a las partes afectadas
* Supervisar y revisar las actividades
* Publicar el calendario de cambios y la indisponibilidad prevista del servicio
* Llevar a cabo revisiones posteriores a la implementación para validar los resultados de las solicitudes de cambio
* Determinar la satisfacción del negocio con las solicitudes de cambio

### Coordinador de Cambios

Los Coordinadores de Cambios son miembros del personal de Soporte que se encargan de los detalles de una solicitud de cambio.

Las responsabilidades de un Coordinador de Cambios incluyen:

* Reunir la información adecuada según el tipo de cambio que se esté investigando
* Asociar a la solicitud de cambio los elementos de configuración, los incidentes y los servicios relacionados
* Dar actualizaciones de estado a quienes lo solicitan
* Revisar los planes y los calendarios de cambio. Las actividades de planificación incluyen programar la solicitud de cambio, evaluar el riesgo y el impacto, crear planes, definir y secuenciar las tareas necesarias para llevar a cabo la solicitud de cambio, y programar a las personas y los recursos de cada tarea.
* Revisar todas las tareas completadas. En la etapa [Implementar](#paso-4-implementar), al menos una tarea relacionada con la solicitud de cambio está en curso.
* Llevar a cabo revisiones posteriores a la implementación para validar los resultados de la solicitud de cambio
* Determinar la satisfacción de quien lo solicita con la solicitud de cambio

### Iniciador del Cambio

Un Iniciador del Cambio es una persona que inicia o solicita un cambio, desde un rol de negocio o técnico. Distintas personas pueden iniciar un cambio; este rol no es exclusivo de una sola persona. Quien inicia o solicita el cambio debe proporcionar toda la información y la justificación necesarias para el cambio.  

Otras responsabilidades de un Iniciador del Cambio incluyen:

* Completar y presentar una propuesta de cambio (si se requiere)
* Completar y presentar una Solicitud de Cambio (RFC)
* Asistir a las reuniones del Comité Asesor de Cambios (CAB) para aportar más información
* Revisar los cambios cuando lo solicite la Gestión de Cambios

### Implementador del Cambio

Es la persona que se considera responsable de la solicitud de cambio a lo largo de todo su ciclo de vida. Implementar un cambio requiere la aprobación de maker/checker, es decir, todos los cambios requieren que una persona realice el cambio y otra lo valide.

Las responsabilidades de un Implementador del Cambio incluyen:

* Servir de enlace con quien solicita el cambio para las consultas y los problemas de negocio y técnicos, si los hay
* Crear una RFC y actualizar su estado siempre que se requiera
* Comprobar y decidir una fecha de implementación, asegurando que no entre en conflicto con otras actividades, por ejemplo, los plazos de preparación, las ventanas de cambio, etc.
* Evaluar y gestionar el riesgo que se asume durante el ciclo de vida de la solicitud de cambio
* Probar e implementar el cambio
* Coordinarse y comunicarse con cualquier otro equipo afectado antes de presentar el cambio (en ausencia del Coordinador de Cambios)
* Una vez aprobado el cambio, crear un caso de remediación para el cambio programado
* Ejecutar el cambio en la fecha y la hora programadas
* Dar el estado de cierre tras completarlo con éxito
* Documentar el procedimiento del cambio después de implementarlo

### Aprobador del Cambio

Es una persona que da la aprobación de primer nivel a una Solicitud de Cambio antes de que pase a la revisión del Comité Asesor de Cambios. Los Aprobadores del Cambio se definen para distintos cambios del Hub, lo que significa que este rol puede estar ocupado por distintas personas en varios niveles jerárquicos del marco de gestión de cambios, cada una con su propia área en la que actúa como aprobador.

Las responsabilidades de un Aprobador del Cambio incluyen:

* Revisar todas las RFC presentadas por quienes inician o solicitan el cambio
* Asegurar que la solicitud de cambio haya alcanzado el nivel de preparación necesario para justificar una decisión del Gestor de Cambios y del CAB
* Revisar y comentar el contenido del Registro de Cambio, en concreto: el Plan de Cambio, la Implementación, el Plan de Pruebas y Remediación, y el Calendario
* Otorgar la aprobación una vez satisfecho de que se han cumplido todos los criterios pertinentes y se han atendido las inquietudes, O denegar la aprobación exponiendo claramente las inquietudes y reservas sobre el contenido del Registro de Cambio
* El resultado de los cambios fallidos cuando el resultado negativo se deba a una aprobación no determinada

### SME Técnico

El Experto Técnico en la Materia (SME) es una persona que es una autoridad en un área o tema técnico concreto. En relación con la gestión de cambios, el SME es responsable de:

* Proporcionar los Planes detallados de Implementación, Pruebas y Remediación
* Asistir a la reunión del CAB para responder a las preguntas e inquietudes sobre el cambio de los aprobadores y de la Gestión de Cambios (si se le invita)
* La implementación de las tareas del cambio y la actualización de los registros pertinentes en la herramienta de gestión de cambios respecto al estado de la implementación
* Revisar y retrabajar un cambio cuando se le pida, y contribuir a la revisión de un cambio después de su implementación

### Miembro del CAB

El Comité Asesor de Cambios (CAB) incluye miembros de distintos ámbitos, entre ellos seguridad de la información, operaciones, desarrollo, redes, Mesa de Servicio y relaciones con el negocio, entre otros. Un miembro del CAB tiene las siguientes responsabilidades:

* Hacer circular las RFC dentro de su área de responsabilidad y coordinar los comentarios
* Revisar las RFC y recomendar si deberían autorizarse
* Revisar los cambios exitosos, fallidos y no autorizados
* Revisar el calendario de cambios y la indisponibilidad prevista del servicio

### Presidencia del CAB

La Presidencia del CAB es responsable de:

* Convocar y presidir las reuniones del CAB
* Supervisar el proceso de gestión de cambios en su conjunto
* Asegurar que el CAB cumpla el mandato sobre las políticas y los procedimientos relativos a los cambios

## Tipos de cambio

El proceso de gestión de cambios se encarga de los siguientes tipos de cambio.

### Cambios estándar

Un cambio estándar es un cambio en un servicio u otro elemento de configuración que está preautorizado y, por tanto, no necesita pasar por el proceso de aprobación. Para que se lo considere candidato a convertirse en cambio estándar, deben haberse implementado al menos tres cambios menores con éxito. Entonces debe presentarse al Comité Asesor de Cambios una solicitud de cambio estándar para su aprobación.

El riesgo de un cambio estándar debe ser bajo y bien conocido, las tareas deben ser bien conocidas, estar documentadas y probadas, y debe existir un disparador definido que lo inicie, como un evento o una solicitud de servicio.

Ejemplos de cambios estándar son: la actualización del sistema operativo (SO), el despliegue de parches, etc.

### Cambios menores

Un cambio menor es un cambio no trivial que tiene bajo impacto y bajo riesgo. Son cambios no triviales que no ocurren con frecuencia, pero que aun así pasan por todas las etapas del ciclo de vida del cambio, incluida la aprobación del CAB. Es importante documentar la información pertinente para futuras consultas. Con el tiempo, un cambio menor puede convertirse en un cambio estándar.

Ejemplos de cambios menores son: los cambios en un sitio web y las mejoras de rendimiento.

Para que un cambio se clasifique como cambio menor, debe tener un plazo de preparación inferior a 3 días.

### Cambios mayores

Un cambio mayor es un cambio de alto riesgo y alto impacto que podría interrumpir los entornos de producción en vivo si no se planifica correctamente. La evaluación del cambio es crucial para determinar el calendario y el flujo de aprobación. Un cambio mayor requiere la aprobación de la dirección además de la aprobación del CAB. La Solicitud de Cambio (RFC) de un cambio mayor debe contener una propuesta detallada sobre el costo-beneficio, el análisis de riesgo e impacto y las implicaciones financieras, si las hay.

En la práctica, todos los cambios que impliquen indisponibilidad, en concreto la que afecte a las actividades de incorporación y de pruebas de los DFSP en entornos inferiores, deberían clasificarse como cambios mayores y ser revisados por el CAB. Esos cambios deberían implementarse en coordinación con el Gerente Técnico de Proyecto.

Para que un cambio se clasifique como cambio mayor, debe tener un plazo de preparación de 5 días o más.

### Cambios de emergencia

Un cambio de emergencia es un cambio que debe completarse lo antes posible. Un cambio de emergencia solo se aceptará si está vinculado a un Incidente de Severidad 1, que tenga su correspondiente ticket S1 en la herramienta de la Mesa de Servicio. El Gerente de Servicio impulsará la apertura de un cambio de emergencia e instruirá al SME Técnico para que lo levante.

### Resumen de plazos de preparación y matriz de aprobación

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Tipo de cambio</th>
<th>Plazo de preparación para implementar</th>
<th>Revisión y aprobación</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Cambio estándar</p></td>
<td><p>3 días hábiles</p></td>
<td><p>Preaprobado</p></td>
</tr>
<tr class="even">
<td><p>Cambio menor</p></td>
<td><p>3 días hábiles</p></td>
<td><ol type="1">
<li><p>CAB</p></li>
<li><p>Aprobadores de Negocio (cuando corresponda)</p></li>
</ol></td>
</tr>
<tr class="odd">
<td><p>Cambio mayor</p></td>
<td><p>5 días hábiles</p></td>
<td><ol type="1">
<li><p>CAB</p></li>
<li><p>Aprobadores de Negocio (cuando corresponda)</p></li>
</ol></td>
</tr>
<tr class="even">
<td><p>Cambio de emergencia</p></td>
<td><p>Lo antes posible</p></td>
<td><p>CAB de emergencia o Dueño del Negocio</p></td>
</tr>
</tbody>
</table>

## Comité Asesor de Cambios

El Comité Asesor de Cambios (CAB) apoya a la gestión de cambios en la evaluación, la priorización y la programación de los cambios. El CAB debe tener visibilidad completa de todos los cambios que puedan suponer un riesgo moderado o superior para los servicios y los elementos de configuración. Es importante que dentro del CAB haya miembros que puedan aportar una experiencia adecuada para evaluar todos los cambios tanto desde el punto de vista del negocio como del técnico.

Hay miembros permanentes del CAB a los que se invita a todas las reuniones, pero, para asegurar que hay una comprensión clara de las necesidades de todas las partes interesadas, se pedirá a otras personas que participen por su experiencia respecto a un cambio que se vaya a discutir. Si corresponde, también puede invitarse al proveedor externo.

### Reunión del CAB

La reunión del CAB puede celebrarse presencialmente o de forma electrónica. Puede ser más cómodo celebrar reuniones electrónicas, pero de este modo puede ser más difícil atender las preguntas. Corresponderá a la Presidencia del CAB decidirlo según la situación. Se espera que las reuniones del CAB sean electrónicas por las limitaciones de tiempo.

Una reunión del CAB es una reunión formal con una estructura designada. Antes de cualquier reunión del CAB, los cambios que se vayan a discutir deben hacerse circular entre todos los miembros. La Presidencia del CAB es responsable de asegurar que esto se haga, pero puede delegar la tarea en la Copresidencia del CAB o en cualquier Miembro del CAB.

Todos los representantes de un cambio deben asistir o enviar a un delegado. Si no hay asistencia, el cambio no se discutirá y, por tanto, no se aprobará. Todos los asistentes al CAB deben acudir a la reunión preparados para discutir los cambios que representan y para expresar puntos de vista y opiniones desde el área concreta que representan.

La reunión del CAB es el foro para discutir los cambios anteriores, tanto los exitosos como los fallidos, y para revisar las lecciones aprendidas.

Debe hacerse circular un orden del día de la reunión del CAB antes de la reunión. La Presidencia del CAB es responsable de asegurar que se siga la estructura, que se levante acta y que se recojan los puntos de acción para distribuirlos después de la reunión.

## Proceso de gestión de cambios

Esta sección ofrece un resumen de las actividades clave del proceso de gestión de cambios. Las instrucciones concretas sobre cómo realizar las actividades del proceso en el contexto de un Servicio o una Función pueden proporcionarse mediante procedimientos operativos locales dentro de un manual de procedimientos.

Todos los cambios deben levantarse en la herramienta de la Mesa de Servicio.

La figura siguiente ofrece un resumen de alto nivel del proceso de gestión de cambios con las actividades clave:

![Resumen de alto nivel de las actividades del proceso de gestión de cambios](../../../../.vuepress/public/change_mgmt_flow.png)

### Paso 1: Levantar la Solicitud de Cambio (RFC)

#### Objetivo

El objetivo de esta actividad es asegurar que se respeten los tipos de solicitud de cambio, de modo que el proceso pueda responder al entorno y gestionarlo, protegiendo al mismo tiempo al negocio.

La figura siguiente ofrece un resumen del primer paso del proceso de gestión de cambios.

![Proceso de gestión de cambios – Iniciar un cambio levantando una RFC](../../../../.vuepress/public/raise_rfc.png)

#### Prerrequisitos

Los prerrequisitos de los cambios deberían estar alineados con los requisitos de las versiones que se describen en el [proceso de gestión de versiones](release-management.md). Lo siguiente debería capturarse claramente en la herramienta de la Mesa de Servicio al preparar el Registro de Cambio:

* Traspaso del equipo correspondiente al equipo de Operaciones, incluida la revisión completa de lo siguiente:
    * Ticket de Cambio o Registro de Cambio: el motivo del cambio, incluidos el impacto, los riesgos y las limitaciones. La matriz de categorización del cambio puede ser la misma que la de los incidentes. Para más detalles sobre la matriz de categorización de incidentes, consulte [Matriz de categorización de incidentes](incident-management.md#matriz-de-categorizacion-de-incidentes).
    * Runbook del cambio: los pasos necesarios para hacer el cambio y para revertirlo si hace falta
    * Resultados de las pruebas en un entorno inferior: evidencia de que el cambio se probó con éxito y no causa regresión
    * Plan de pruebas para el entorno superior: qué pruebas concretas hay que ejecutar para validar el cambio
    * Toda la documentación relacionada, incluidas la arquitectura, los diagramas de flujo, la información de configuración, etc., se ha actualizado
* Pruebas previas al cambio: verificar la estabilidad del entorno revisando los últimos resultados de las pruebas del Golden Path (GP)
* Pruebas posteriores al cambio: ejecución de las pruebas acordadas para validar el cambio, y ejecución de las pruebas GP completas para confirmar que no hay regresión en el entorno

#### Entradas

Las entradas de la RFC son:

* Las Solicitudes de Servicio
* Las solicitudes de la [Gestión de Incidentes](incident-management.md) para aplicar soluciones alternativas o correcciones
* Las solicitudes de la [Gestión de Incidentes](incident-management.md) para hacer cambios de emergencia que resuelvan incidentes de Severidad 1
* Las solicitudes de funcionalidad nueva de la Oficina de Gestión de Proyectos
* Las solicitudes de cambio por mantenimiento

#### Salidas

Registros de Cambio que contienen los detalles de las RFC para su revisión.

### Paso 2: Revisar y autorizar

#### Objetivo

Los cambios se revisan, y una etapa de aprobación técnica determina si se ha capturado la información mínima obligatoria requerida para permitir una fase eficaz de planificación y programación.

La figura siguiente ofrece un resumen del paso "revisar y autorizar" del proceso de gestión de cambios.

![Proceso de gestión de cambios – Revisar y autorizar](../../../../.vuepress/public/review_authorize.png)

#### Entradas

Registro de Cambio para su revisión.

#### Salidas

Registro de Cambio con aprobación técnica.

### Paso 3: Planificar y aprobar

#### Objetivo

Los Registros de Cambio cualificados que han superado una evaluación inicial en los pasos anteriores del proceso se planifican y se aprueban. El nivel de riesgo del cambio marcará la vía de aprobación.

La figura siguiente ofrece un resumen del paso "planificar y aprobar" del proceso de gestión de cambios.

![Proceso de gestión de cambios – Planificar y aprobar](../../../../.vuepress/public/plan_approve.png)

#### Entradas

Registro de Cambio autorizado inicialmente.

#### Salidas

Registro de Cambio totalmente planificado y aprobado.

### Paso 4: Implementar

#### Objetivo

Los SME Técnicos correspondientes llevan a cabo las actividades planificadas, registrando cualquier desviación y emprendiendo actividades de remediación cuando corresponda, conforme a los planes de cambio, para implementar los cambios solicitados.

La figura siguiente ofrece un resumen del paso "implementar" del proceso de gestión de cambios.

![Proceso de gestión de cambios – Implementar](../../../../.vuepress/public/implement.png)

#### Entradas

Registro de Cambio aprobado.

#### Salidas

Cambio implementado, cambio fallido, cambio revertido, cambio fallido remediado.

### Paso 5: Cerrar

La actividad final del proceso asegura que los cambios sujetos a una revisión posterior a la implementación reciban la atención necesaria y que las actividades de remediación se entiendan y se ejecuten.

La figura siguiente ofrece un resumen del paso "cerrar" del proceso de gestión de cambios.

![Proceso de gestión de cambios – Cerrar](../../../../.vuepress/public/close.png)

#### Entradas

Cambios exitosos, cambios fallidos, cambios fallidos con remediación.

#### Salidas

Cambios cerrados.

## Gobernanza

**Nombre de la reunión:** reunión del Comité Asesor de Cambios

**Frecuencia de la reunión:** semanal

**Propósito de la reunión:**

* Revisar y aprobar o rechazar los cambios propuestos en un contexto de negocio y técnico
* Priorizar los cambios propuestos según las necesidades del negocio
* Realizar la revisión posterior a la implementación de los cambios completados y determinar y documentar las lecciones aprendidas
* Revisar los cambios aprobados previamente pero no implementados en la ventana de cambio anterior y recomendar acciones de seguimiento

**Presidencia de la reunión (rol del proceso):** Presidencia del CAB

**Asistentes recomendados (roles del proceso):**

* Miembros permanentes del CAB 
* Representantes del negocio 
* Iniciador o Implementador del Cambio

**Entradas:**

* Calendario de Cambios 
* Registro de Cambio

**Salidas:**

* Aprobación o rechazo 
* Registros de Cambio actualizados 
* Puntos de acción

### Gobernanza de la comunicación de cambios

Las siguientes directrices se aplican a la comunicación de los cambios:

* Los cambios estándar se comunicarán a las partes interesadas internas.
* Los cambios mayores, menores y de emergencia se comunicarán a todas las partes interesadas pertinentes del negocio y técnicas.
* Los cambios se comunicarán después de las aprobaciones del CAB.
* Al inicio de la ventana de cambio aprobada, debería enviarse a las partes interesadas pertinentes una actualización por correo electrónico y una notificación por Slack (o similar).
* Al final de la ventana de cambio aprobada, debería enviarse a las partes interesadas pertinentes una actualización por correo electrónico y una notificación por Slack (o similar).
* La comunicación externa a los clientes (DFSP) y a los socios del Hub la realizará el Gerente de Servicio.

La notificación debe incluir los siguientes detalles:

* Título y descripción del cambio
* Impacto en el negocio
* Ventana de cambio
* Contactos / Coordinador de Cambios
