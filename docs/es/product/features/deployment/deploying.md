---
i18n_source_sha: 3321269124b6cf8318d29488bbeae727d493cf45
---

# Despliegue de Mojaloop

Esta sección detalla los aspectos de despliegue del Hub de Mojaloop.

## Despliegue del Hub de Mojaloop (excluidas las integraciones de participantes)

La siguiente tabla ofrece orientación sobre qué escenario de despliegue de Mojaloop es más apropiado para distintos tipos de usuario y casos de uso.

Para obtener información detallada sobre cada herramienta de despliegue, consulte la documentación de [Herramientas de despliegue](./tools).

<style>
.deployment-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
        vertical-align: top;
        position: relative;
    }

    th {
        background-color: #f8f9fa;
    }

    td.green { 
        background-color: rgba(46, 204, 113, 0.3); /* Lighter green with opacity */
        position: relative;

        &:hover::after {
            content: "Usar: core test harness";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.orange { 
        background-color: rgba(243, 156, 18, 0.3); /* Lighter orange with opacity */
        position: relative;

        &:hover::after {
            content: "Usar: Miniloop";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.amber { 
        background-color: rgba(230, 126, 34, 0.3); /* Lighter amber with opacity */
        position: relative;

        &:hover::after {
            content: "Usar: HELM deploy";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.red { 
        background-color: rgba(231, 76, 60, 0.3); /* Lighter red with opacity */
        position: relative;

        &:hover::after {
            content: "Usar: IaC";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }
}
</style>

<table class="deployment-table">
<thead>
<tr>
<th>Escenario de despliegue / tipo de usuario</th>
<th>Aprendizaje</th>
<th>Evaluación (elección de Mojaloop)</th>
<th>Pruebas de casos de uso</th>
<th>Desarrollo de funcionalidades y pruebas de desarrollo</th>
<th>Producción</th>
</tr>
</thead>
<tbody>
<tr>
<td>Estudiante</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td>N/A</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td>N/A</td>
</tr>
<tr>
<td>Desarrollador</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td>N/A</td>
<td class="green">Huella:<br>- Una sola máquina, p. ej. una computadora portátil o una sola VM.<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="green">Huella:<br>- Una sola máquina, p. ej. una computadora portátil o una sola VM.<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td>N/A</td>
</tr>
<tr>
<td>Analista de negocio</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="green">Huella:<br>- Una sola máquina, p. ej. una computadora portátil o una sola VM.<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td>N/A</td>
</tr>
<tr>
<td>Adoptante potencial</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster<br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td>N/A</td>
</tr>
<tr>
<td>Auditor / QA externo / analista de seguridad</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td>N/A</td>
<td>N/A</td>
</tr>
<tr>
<td>Integrador de sistemas</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="red">Huella:<br>- Un despliegue totalmente redundante, replicado y de alta disponibilidad<br>- On-premises o en la nube<br>SLA: SLA alto en muchas áreas.</td>
</tr>
<tr>
<td>Operador del Hub</td>
<td class="green">Huella: una sola máquina, p. ej. una computadora portátil o una sola VM.<br>SLA: ninguno</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="amber">Huella:<br>- Bajo consumo de recursos, un solo clúster <br>- Un entorno similar al de producción (¿sandbox? SLA inferior al de prod)<br>SLA:<br>- Inferior al de prod, pero con posibilidad de probar los requisitos no funcionales.</td>
<td class="red">Huella:<br>- Un despliegue totalmente redundante, replicado y de alta disponibilidad<br>- On-premises o en la nube<br>SLA: SLA alto en muchas áreas.</td>
</tr>
</tbody>
</table>

## Herramientas de despliegue

<table class="deployment-table">
<thead>
<tr>
<th>Herramienta</th>
<th>Funcionalidades</th>
<th>Requisitos mínimos de recursos</th>
<th>Seguridad</th>
<th>Documentación</th>
<th>SLA</th>
<th>Advertencias, supuestos, limitaciones, etc...</th>
</tr>
</thead>
<tbody>
<tr>
<td class="green"><a href="./tools.html#core-test-harness">core test harness</a></td>
<td>- un solo nodo<br>- docker-compose<br>- "perfiles" disponibles<br>- Sin HELM<br>- Sin gateway<br>- Sin componentes de ingress/egress<br>- Sin stack de IAM<br>- Despliega:<br>  - los servicios principales y los servicios de soporte<br>  - los portales (opcional)<br>  - el stack de monitoreo (opcional)<br><br>Se usa en pipelines de CI para pruebas de integración.</td>
<td>Computadora portátil o estación de trabajo de escritorio de gama media</td>
<td>Sin seguridad</td>
<td>- Documentación orientada a desarrolladores.<br>- Documentación para usuarios no técnicos que apoye los objetivos de aprendizaje.<br>- Documentación a nivel de producto que explique las funcionalidades, p. ej. qué hace y dónde es apropiado usarlo</td>
<td>- Sin SLA</td>
<td>- No debe usarse nunca en producción.<br>- No debe usarse nunca para procesar transacciones con dinero real.</td>
</tr>

<tr>
<td class="amber"><a href="./tools.html#helm-deploy">HELM deploy</a></td>
<td>- Solo se necesitan los charts de HELM para desplegar los servicios de Mojaloop y los servicios de soporte.</td>
<td>- Computadora portátil o estación de trabajo de gama alta<br>- Un clúster de Kubernetes pequeño en la nube.</td>
<td>El usuario debe endurecer su propio clúster de Kubernetes.</td>
<td>- Documentación orientada a desarrolladores<br>- Documentación semitécnica / orientada a analistas de negocio que apoye la experimentación y las pruebas de casos de uso.<br>- Documentación a nivel de producto que explique las funcionalidades, p. ej. qué hace y dónde es apropiado usarlo.</td>
<td>- Debe poder cumplir los SLA (dadas las especificaciones de hardware de referencia):<br>  - Disponibilidad:<br>    - ¿4/5 nueves?<br>  - RTO/RPO: ¿lo más cercano a cero posible?<br>  - Rendimiento/desempeño<br>    - TPS: 1000+ (sostenidas durante 1 hora)<br>    - Latencia (percentiles) (excluidas las latencias externas):<br>      - Compensación: 99% < 1 segundo.<br>      - Búsqueda: 99% < segundo.<br>      - Acuerdo de términos: 99% < 1 segundo.<br>  - Gestión de datos:<br>    - Mitigaciones contra la pérdida de datos, es decir, replicación y recuperación ante desastres.<br>    - Retención (auditoría, cumplimiento)<br>    - Archivado.<br><br>NB: la estrategia prioriza la alta disponibilidad sobre la recuperación ante desastres.</td>
<td>- Puede usarse en producción.<br>- Es seguro para procesar transacciones con dinero real.<br>- El usuario o adoptante debe desplegar y configurar su propia infraestructura, incluidos los clústeres de Kubernetes, ingress/egress, firewalls, etc...<br>- La seguridad se limita a lo que proporcionan los charts de HELM. Se requiere diseño y configuración de seguridad adicionales.</td>
</tr>
<tr>
<td class="red"><a href="./tools.html#infrastructure-as-code-iac">Infraestructura como código</a></td>
<td>- múltiples plataformas de despliegue de destino<br>  - AWS, on-premises, otras nubes, (modular)<br>- múltiples opciones de capa de orquestación<br>  - k8s gestionado, microk8s, eks<br>- Patrón de GitOps (centro de control)<br>  - puede desplegar y gestionar múltiples instancias o entornos del Hub<br>- Despliega:<br>  - el centro de control<br>  - los servicios principales y los servicios de soporte (con opciones para servicios de soporte gestionados)<br>  - los portales<br>  - el stack de IAM<br>  - el stack de monitoreo<br>  - pm4ml<br>- Patrón de GitOps</td>
<td>- Infraestructura en la nube o on-premises de gama alta.</td>
<td>Seguridad completa</td>
<td>- Varios niveles de documentación dirigidos a todos los niveles de "usuario".<br>- Documentación para desarrolladores que permita usar, mantener, mejorar y extender las capacidades de IaC, p. ej. agregar nuevos destinos / servicios / funcionalidades.<br>  - Diagramas de arquitectura detallados y explicaciones que permitan una comprensión profunda.<br>- Documentación orientada a operaciones técnicas que permita a los usuarios de nivel "ingeniero de infraestructura" usar IaC para desplegar y mantener múltiples instancias de Mojaloop para desarrollo, pruebas y producción.<br>- Documentación a nivel de producto que explique las funcionalidades de IaC, p. ej. qué hace y dónde es apropiado usarlo.</td>
<td>- Debe poder cumplir los SLA (dadas las especificaciones de hardware de referencia):<br>  - Disponibilidad:<br>    - ¿4/5 nueves?<br>  - RTO/RPO: ¿lo más cercano a cero posible?<br>  - Rendimiento/desempeño<br>    - TPS: 1000+ (sostenidas durante 1 hora)<br>    - Latencia (percentiles) (excluidas las latencias externas):<br>      - Compensación: 99% < 1 segundo.<br>      - Búsqueda: 99% < segundo.<br>      - Acuerdo de términos: 99% < 1 segundo.<br>  - Gestión de datos:<br>    - Mitigaciones contra la pérdida de datos, es decir, replicación y recuperación ante desastres.<br>    - Retención (auditoría, cumplimiento)<br>    - Archivado.<br><br>NB: la estrategia prioriza la alta disponibilidad sobre la recuperación ante desastres.</td>
<td>- Puede usarse en producción.<br>- Es seguro para procesar transacciones con dinero real.</td>
</tr>
</tbody>
</table>

## Historial del documento
|Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|20 de agosto de 2025|Sam Kummary|Se actualizaron las secciones para usar helm como opción de despliegue donde corresponde|
|1.1|3 de junio de 2025|Paul Makin|Se eliminó la sección de rendimiento y se trasladó a un documento nuevo|
|1.0|7 de mayo de 2025|Tony Williams|Versión inicial|