---
i18n_source_sha: 6b7ff1edb41b1d62119501804c61b158d3ab34f3
---

# Planificación de BC

Numerosos procesos y eventos en los BC de la plataforma Mojaloop Switch requieren que determinadas funciones se activen en momentos concretos o de acuerdo con una programación. Con el fin de dar respuesta a este requisito en toda la plataforma Switch y evitar tener que integrar funciones de programación en múltiples BC, se introducirá e implementará un único BC de programación para la plataforma Switch.

Para programar un proceso o un evento, un BC cliente envía una solicitud al BC de programación para que cree un recordatorio para una hora concreta o un horario determinado. El BC de programación mantiene un calendario con todos los recordatorios que recibe y, cuando llega el momento de los recordatorios, envía una Notificación del mismo al BC cliente correspondiente.

Además, el BC de programación también prestará servicios al Switch para que los BC de cliente y los administradores del Switch puedan gestionar los recordatorios configurados en el BC de programación.

## Términos

En este BC se utilizan los siguientes términos habituales:

| Término | Descripción |
|---|---|
| **Cliente BC** | Cualquier otro BC que utilice los Servicios de programación de BC |

## Caso de uso

<!--***Note:*** *An "Update Reminder" UC has not been provided. The recommended course of action to follow is to Delete and Create a new Reminder.*
-->
The status of the UCs for the Scheduling BC is as follows:

| UC disponibles |  |  | UC previstas |  |
| --- | :-- | --- | --- | :-- |
| **Caso de uso** | **Descripción** | | **Caso de uso** | **Descripción** |
| **Crear recordatorio** | El cliente BC solicita que se cree un recordatorio | | **Consulta sobre un recordatorio para un cliente** | El cliente BC consulta sus propios recordatorios |
| **Recordatorio de eliminación** | El cliente BC solicita que se elimine un recordatorio | | **Consulta sobre recordatorios de administración** | El administrador de la Plataforma consulta todos los recordatorios |
| **Desencadenante de recordatorio** | El módulo de programación de BC activa el recordatorio cuando llega el momento | | |
| **Recordatorio de actualización** | *No se ha facilitado.  Solución recomendada: elimine el recordatorio y cree uno nuevo* | | |  |  |

<!---The following UCs are planned for inclusion in the Scheduling BC -

| Caso de uso | Descripción |
| --- | :-- |
| Consulta sobre un recordatorio para un cliente | El cliente BC consulta sus propios recordatorios |
| Consulta sobre recordatorios de administración | El administrador de la Plataforma consulta todos los recordatorios |
| Desencadenante de recordatorio | El módulo de programación de BC activa el recordatorio cuando llega el momento |
--->
### Create Reminder

#### Descripción
El flujo de trabajo que ofrece esta UC permite que el Switch gestione las solicitudes autorizadas del Cliente BC para crear recordatorios.

#### Diagrama de flujo

![Create Reminder](./assets/schedulingCreateReminder_20211021.png)
>
### Se ha activado un recordatorio

#### Descripción
El flujo de trabajo que ofrece este UC permite que el Switch gestione los recordatorios enviados desde el BC de programación a un BC de cliente para ejecutar una tarea o simplemente a modo de recordatorio.

#### Diagrama de flujo

![Reminder Triggered](./assets/schedulingReminderTriggered_20211021.png)
>
### Eliminar recordatorio (recurrente)

#### Descripción
El flujo de trabajo que ofrece este UC permite que el Switch gestione los mensajes enviados por los BC de cliente autorizados al BC de programación para eliminar un recordatorio. En caso de que el BC de programación no pueda procesar la instrucción, envía un mensaje de alerta al BC de notificaciones.

#### Diagrama de flujo

![Delete (Recurring) Reminder](./assets/schedulingDeleteRecurringReminder_20211021.png)
>

<!-- Footnotes themselves at the bottom. -->
## Notes

#### Crear recordatorio: datos obligatorios

La solicitud «Crear recordatorio» debe incluir los siguientes datos:

| Datos | Descripción |
| --- | ---- |
| **Identificador** | nombre/id |
| **Definición de Cron** | ¿Periódico?, ¿intervalo de tiempo? |
| **Trigger Transport** | HTTP. Callback/Evento; Callback URL o Tema del evento |
| **Carga útil especial** | no está disponible para la planificación BC |
| **Condiciones de recuperación** | reintentar, reprogramar, interrumpir, abandonar |
| **Alertas** | Notificación, registro de excepciones |
| **Acciones** | registro de procesos de BC automatizables o programables |

#### Planificación BC: requisitos

El BC de programación debe cumplir los siguientes requisitos:

* Los recordatorios deben activarse una sola vez

* BC debe llevar un registro de los recordatorios activados

* BC debe realizar un seguimiento de las acciones de creación, lectura y eliminación

    * Las actualizaciones se llevarán a cabo mediante las acciones «Eliminar» y «Crear», tal y como se indica en la lista [Casos de uso disponibles (UCs](#use-cases)]

* Lotes de trabajos

* Ofrecer varias opciones de interfaz (gRPC, REST, HTTP, etc.)

* Los recordatorios deben activarse mediante una llamada de retorno «HTTP», no mediante una llamada gRPC ni a un tema específico.

* No debería tener capacidad alguna para procesar lógica ajena al propio BC de programación.

* Utilice únicamente marcas de tiempo UTC basadas en Linux para evitar problemas de sincronización

***Nota:*** *Se da por supuesto que el sistema subyacente mantendrá una sincronización perfecta.*

#### Planificación BC: necesidades pendientes

Aún es necesario definir los requisitos de acceso para el módulo de Planificación BC.

#### Planificación de BC: Excepciones

* Instrucciones con errores de formato
    * Fecha o hora no válida, incluidas las horas del pasado
    * BC o comando no válido
* Ejecución fallida (detectada mediante una llamada de retorno)
* Autorización insuficiente para que el cliente BC realice la operación CRD
* No se ha procesado/ejecutado el recordatorio

#### Preguntas

Durante las sesiones de trabajo sobre la arquitectura de referencia surgieron varias preguntas y, dado que se consideró que algunas de ellas podían resultar útiles para otros, las hemos incluido a continuación:

* Una vez iniciada la tarea programada, ¿sigue siendo el responsable de programación el encargado de supervisar su avance?

    * Respuesta: No. Cuando vence el plazo del recordatorio, se comunica al BC del cliente mediante el método establecido y, a partir de ese momento, la responsabilidad del BC de programación respecto al recordatorio vuelve a recaer en el BC del cliente.

* ¿Se indica como «usuario» en el sistema de programación BC el cliente BC o la persona que programó un recordatorio? En otras palabras, ¿qué identificación figura en el registro de auditoría del proceso?

    * Respuesta: Esto debería determinarlo el cliente BC, en función de la medida que adopte al recibir el recordatorio.