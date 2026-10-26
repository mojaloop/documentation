---
i18n_source_sha: a5c10e25064761bdb94a754010cc994065a5ac3c
---

# Gestión de problemas

El objetivo general de la gestión de problemas es llegar a la causa raíz de los incidentes (incidentes de Severidad 1 o incidentes que han ocurrido más de una vez) o a las posibles causas de los incidentes, y luego impulsar acciones para mejorar o corregir la situación de inmediato.

El procedimiento de gestión de problemas asegura que:

* los problemas se registren correctamente
* los problemas se enruten correctamente
* el estado de los problemas se reporte con exactitud
* la cola de problemas sin resolver sea visible y se reporte
* los problemas se prioricen correctamente y se atiendan en la secuencia adecuada
* la resolución proporcionada cumpla los requisitos del acuerdo de nivel de servicio (SLA) pactado
* se resuelvan las cuestiones o los problemas de causa raíz


## Identificar problemas

La parte interesada correspondiente de la gestión del servicio declara un problema en las siguientes situaciones:

* cuando hay un incidente cuya causa el responsable del incidente no puede establecer dentro del acuerdo de nivel de servicio fijado
* cuando hay repeticiones de un incidente con un impacto considerable en el negocio
* cuando hay una degradación del servicio o una desviación del comportamiento esperado que probablemente afecte al negocio en el futuro si no se mitiga, y cuya mitigación no está bien establecida

En cualquiera de los escenarios anteriores, o en cualquier otro escenario que el Gestor de Problemas considere aplicable, se abrirá un registro de problema y se pondrá en marcha el proceso de gestión de problemas.

Si resulta que un problema está causado por un defecto del producto, se levanta un error conforme al [proceso de triaje de defectos](defect-triage.md).

## Categorizar y priorizar problemas

Para determinar si se cumplen los SLA, es necesario categorizar y priorizar los problemas de forma rápida y correcta.

El objetivo de una categorización adecuada es:

* identificar el servicio afectado
* asociar los problemas con los incidentes relacionados
* indicar qué grupos de Soporte tienen que participar
* proporcionar métricas significativas sobre la fiabilidad del sistema

Para cada problema se identificará el servicio concreto.

La prioridad asignada a un problema determinará con qué rapidez se programa su resolución. La prioridad se fija a partir de una combinación de la severidad y el impacto de los incidentes relacionados.

La tabla siguiente ofrece orientación sobre cómo clasificar un problema. Para saber cómo leerla, vea los siguientes ejemplos:

* Un problema con severidad Alta e impacto Bajo se clasificará como un problema de prioridad Media (consulte la celda en el cruce de severidad Alta e impacto Bajo).
* Un problema con severidad Media e impacto Alto se clasificará como un problema de prioridad Alta (consulte la celda en el cruce de severidad Media e impacto Alto).

<table>
<caption><strong>Matriz de prioridad de problemas</strong></caption>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th colspan="4"><strong>SEVERIDAD</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td></td>
<td></td>
<td><p><strong>Baja</strong><br />
<br />
El problema impide al usuario realizar una parte de sus tareas.</p></td>
<td><p><strong>Media</strong><br />
<br />
El problema impide al usuario realizar funciones críticas sujetas a plazos.</p></td>
<td><p><strong>Alta</strong><br />
<br />
Un servicio, o una parte importante de un servicio, no está disponible.</p></td>
</tr>
<tr class="even">
<td rowspan="3"><p><strong>IMPACTO</strong></p></td>
<td><p><strong>Bajo</strong><br />
<br />
El problema afecta a uno o dos miembros del personal.</p>
<p>Niveles de servicio degradados, pero se sigue procesando dentro de los SLA.</p></td>
<td><p>Baja</p></td>
<td><p>Baja</p></td>
<td><p>Media</p></td>
</tr>
<tr class="odd">
<td><p><strong>Medio</strong><br />
<br />
Niveles de servicio degradados, pero sin procesar dentro de las restricciones del SLA o pudiendo prestar solo el nivel mínimo de servicio.</p>
<p>La causa del problema parece afectar a varias áreas funcionales.</p></td>
<td><p>Media</p></td>
<td><p>Media</p></td>
<td><p>Alta</p></td>
</tr>
<tr class="even">
<td><p><strong>Alto</strong><br />
<br />
Todos los usuarios de un servicio concreto se ven afectados.</p>
<p>Un servicio de cara al cliente no está disponible.</p></td>
<td><p>Alta</p></td>
<td><p>Alta</p></td>
<td><p>Alta</p></td>
</tr>
</tbody>
</table>

## Documentar soluciones alternativas

Una solución alternativa define una forma temporal de superar los efectos adversos de un problema. Las soluciones alternativas pueden ser:

* instrucciones que se dan al cliente sobre cómo completar su trabajo por un método alternativo
* correcciones temporales que ayudan a que un sistema funcione como se espera, pero que no resuelven el problema de forma permanente

Las soluciones alternativas deben documentarse y comunicarse a la Mesa de Servicio para que puedan agregarse a la Base de Conocimiento. Esto asegurará que las soluciones alternativas estén accesibles para la Mesa de Servicio y faciliten la resolución en futuras repeticiones del incidente.

En los casos en que se encuentre una solución alternativa, es importante documentar todos sus detalles dentro del Registro de Problema y que el Registro de Problema siga abierto.

## Documentar errores conocidos

Cuando se hace un diagnóstico para identificar un problema y sus síntomas, debe levantarse un Registro de Error Conocido y ponerse en la documentación de Errores Conocidos. Si surgen incidentes o problemas repetidos, pueden identificarse y restablecerse el servicio con mayor rapidez. Cualquier solución alternativa o solución debería documentarse también en el Registro de Error Conocido de ese problema concreto.

En algunos casos puede ser ventajoso levantar un Registro de Error Conocido incluso antes dentro del proceso general (solo a efectos informativos, por ejemplo) aunque el diagnóstico no esté completo o aún no se haya encontrado una solución alternativa.

El Registro de Error Conocido debe contener todos los síntomas conocidos para que, cuando se produzca un incidente nuevo, pueda hacerse una búsqueda de errores conocidos y encontrarse la coincidencia adecuada.

## Proceso

La figura siguiente muestra un resumen del proceso descrito arriba.

![Gestión de problemas](../../../../.vuepress/public/problem_mgmt.png)
