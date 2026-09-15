---
i18n_source_sha: 7fc61af6083263963716177e919e083bd686aef4
---

# Glosario

Esta sección funciona como glosario de términos de Operaciones Técnicas y ofrece definiciones de:

* términos clave guiados por las buenas prácticas de la Information Technology Infrastructure Library (ITIL)
* Indicadores clave de desempeño (KPI), es decir, métricas que ayudan a determinar si se cumplen objetivos concretos de la gestión de incidentes

## Términos clave

**Gestión de cambios:** la gestión de cambios es el proceso de registrar, aprobar, ejecutar, cerrar y revisar todos los cambios. El cambio puede ser contractual (como la firma inicial de un contrato, una mejora del SLA, la necesidad de nuevos recursos, etc.) u operativo, derivado de una solicitud de cambio.

**Escalamiento:** el reconocimiento de que un incidente requiere recursos adicionales para cumplir los objetivos de nivel de servicio o las expectativas del usuario, teniendo en cuenta la criticidad, el impacto y la urgencia del incidente.

**Mesa de ayuda / Mesa de Servicio:** el Punto Único de Contacto entre el proveedor del servicio y los usuarios. Una Mesa de Servicio típica gestiona incidentes y solicitudes de servicio, y también se encarga de la comunicación con los usuarios. 

**Incidente:** una interrupción no planificada de un servicio de TI, o una reducción de la calidad de un servicio de TI. El fallo de un elemento de configuración que aún no ha afectado al servicio también es un incidente; por ejemplo, el fallo de un disco de un conjunto en espejo. 

**Proceso de gestión de incidentes (IMP):** el proceso de gestionar el ciclo de vida de todos los incidentes. El propósito principal de la gestión de incidentes es restablecer la operación normal del servicio de TI lo antes posible con el apoyo de toda una organización ya establecida.

**Registro de incidente / ticket:** un registro que contiene los detalles de un incidente. Cada registro de incidente (también conocido como ticket) documenta el ciclo de vida de un único incidente. 

**Prioridad:** una categoría que se usa para identificar la importancia relativa de un incidente o de un cambio. La prioridad se usa para identificar los tiempos requeridos para tomar acciones.  

**Gestión de versiones:** la gestión de versiones es el proceso de gestionar, planificar, programar, implementar y controlar una compilación de software a través de distintas etapas y entornos, con el objetivo de entregar funcionalidades a los clientes o a los usuarios finales.

**Solicitud de Cambio (RFC):** la Solicitud de Cambio (o simplemente Petición de Cambio) es una solicitud formal para implementar un cambio. La RFC es un precursor del "Registro de Cambio" y contiene toda la información necesaria para aprobar y ejecutar un cambio.

**Rol:** un conjunto de responsabilidades, actividades y autoridades otorgadas a una persona o a un equipo. Los roles se usan para asignar responsables a los distintos procesos de gestión de incidentes, y para definir responsabilidades sobre las actividades en las definiciones detalladas de los procesos.

**Análisis de causa raíz (RCA):** el RCA es un término colectivo que describe una amplia gama de enfoques, herramientas y técnicas que se usan para descubrir las causas de los incidentes. Se convoca en cada incidente urgente, y cada vez que un incidente ocurre más de una vez.

**Acuerdo de Nivel de Servicio (SLA):** un acuerdo entre un proveedor de servicios de TI y un cliente. El SLA describe el servicio de TI, documenta los objetivos de nivel de servicio y especifica las responsabilidades del proveedor de servicios de TI y del cliente.

**Severidad:** una medida del efecto de un incidente sobre los procesos de negocio.

**TAT (Tiempo de Resolución Total):** es el tiempo que transcurre desde que se reporta el incidente hasta que se resuelve y se cierra. Incluye el Tiempo de Intervención Garantizado (GIT) y el Tiempo de Resolución Garantizado (GRT). 

## Indicadores clave de desempeño (KPI)

**Tasa de disponibilidad (tasa de disponibilidad del servicio):** la disponibilidad de toda la solución técnica para prestar el servicio por DFSP. 

**Duración media de cierre de incidentes:** cantidad media de tiempo entre el registro de los incidentes y su cierre.

**Tiempo medio de respuesta a incidentes:** la cantidad media de tiempo (por ejemplo, en minutos) entre la detección de un incidente y la primera acción tomada para repararlo.

**Número medio de incidentes resueltos por la Mesa de Servicio:** número medio de incidentes resueltos por la Mesa de Servicio respecto de todos los incidentes abiertos.

**Tiempo de Intervención Garantizado (GIT):** el tiempo transcurrido entre el momento en que se reporta un incidente (por ejemplo, se envía un correo electrónico a la herramienta de la Mesa de Servicio) y el momento en que se devuelve una respuesta de acuse de recibo a quien reportó el problema. 

**Tiempo de Resolución Garantizado (GRT):** suma del tiempo total dedicado por todas las partes a resolver un problema. (El estado del problema debe ser “En curso” o “Escalado” para que cuente en la suma total. Los estados “Pendiente” o “Cerrado” no se tienen en cuenta al calcular la suma total.)

**Incidentes completados sin escalamiento:** el porcentaje (%) de incidentes completados dentro del SLA sin ningún escalamiento.

**Tasa de cola de incidentes:** el número de incidentes cerrados respecto del número de incidentes abiertos en un periodo de tiempo dado.

**Tiempo medio entre fallos (MTBF):** el tiempo medio entre fallos reparables de un producto tecnológico. La métrica se usa para hacer seguimiento tanto de la disponibilidad como de la fiabilidad de un servicio de TI o de cualquier otro elemento de configuración, para evaluar si pueden desempeñar su función acordada sin interrupción. Cuanto mayor es el tiempo entre fallos, más fiable es el sistema.

**Tiempo medio hasta el acuse de recibo (MTTA):** el tiempo medio que transcurre desde que se dispara una alerta hasta que se empieza a trabajar en el problema. Mide cuánto tarda de media una organización en responder a quejas, caídas o incidentes en todos los departamentos. Esta métrica es útil para hacer seguimiento de la capacidad de respuesta de un equipo y de la eficacia de un sistema de alertas.

**Tiempo medio hasta la detección (MTTD) – "Acciones proactivas":** la diferencia entre el inicio de cualquier evento que se considere que afecta a los ingresos y su detección real por parte del técnico, que entonces inicia alguna acción concreta para devolver el evento a su estado original. No es lo mismo que poner en marcha el reloj del Tiempo medio hasta la reparación (MTTR) (es decir, cuando el técnico recibe un ticket). El inicio de cualquier evento que afecta a los ingresos casi siempre lo registra algún equipo concreto en un momento concreto. El elemento clave es llevar la herramienta de detección al entorno del técnico, y luego medir la diferencia entre la marca de tiempo del evento y la primera acción del técnico que indique que lo ha reconocido (MTTD).

**Tiempo medio hasta el fallo (MTTF):** el tiempo medio entre fallos no reparables de un producto tecnológico (principalmente hardware).

**Tiempo medio hasta la reparación (MTTR):** se refiere a la cantidad media de tiempo necesaria para reparar un sistema y devolverlo a su plena funcionalidad. \
\
El reloj del MTTR se pone en marcha cuando empiezan las reparaciones y sigue corriendo hasta que se restablecen las operaciones. Esto incluye el tiempo de reparación, el periodo de pruebas y la vuelta a la condición operativa normal.

**Tiempo medio hasta la recuperación:** el Tiempo medio hasta la recuperación es una medida del tiempo que transcurre desde el momento en que se descubre el fallo hasta el momento en que el servicio vuelve a estar operativo. Así pues, además del tiempo de reparación, el periodo de pruebas y la vuelta a la condición operativa normal, captura el tiempo de notificación del fallo y el diagnóstico.

**Backlog de incidentes antiguos:** número de incidentes abiertos con más de 28 días de antigüedad (o cualquier otro marco temporal dado) respecto de todos los incidentes abiertos.

**Porcentaje de incidentes resueltos dentro del plazo u objetivo:** número de incidentes cerrados dentro del marco temporal de duración permitido, respecto del número de todos los incidentes cerrados en un periodo de tiempo dado. A cada incidente se le aplica un marco temporal de duración cuando se recibe, que fija un límite a la cantidad de tiempo disponible para resolverlo. El marco temporal de duración aplicado se deriva de los acuerdos alcanzados con el cliente sobre la resolución de incidentes.

**Porcentaje de incidentes resueltos dentro del tiempo del SLA:** número total de incidentes resueltos dentro del tiempo del SLA, dividido entre el número total de incidentes.

**Porcentaje de indisponibilidad debida a incidentes:** porcentaje de indisponibilidad debida a incidentes, respecto de las horas de servicio.

**Porcentaje de incidentes vencidos:** número de incidentes vencidos (no cerrados y no resueltos dentro del marco temporal establecido) respecto del número de incidentes abiertos (no cerrados).

**Porcentaje de incidentes repetidos:** porcentaje de incidentes que pueden clasificarse como incidente repetido, respecto de todos los incidentes reportados dentro del periodo de medición. Un incidente repetido es un incidente que ya ha ocurrido (varias veces) en el periodo de medición.
