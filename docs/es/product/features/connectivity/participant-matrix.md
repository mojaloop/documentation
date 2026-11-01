---
i18n_source_sha: 981709f264a68e0ad110a1554e035b5f1d17d2b2
---

# Matriz de funcionalidades de los participantes

Este documento proporciona una matriz completa de los distintos tipos de participantes, sus requisitos y las soluciones de conectividad recomendadas para la integración con Mojaloop.

<style>
.participant-matrix {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-size: 12px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        position: relative;
    }

    th {
        background-color: #f8f9fa;
        font-weight: bold;
        font-size: 13px;
    }

    .category-header {
        background-color: #e9ecef;
        font-weight: bold;
        text-align: center;
    }

    td.small { 
        background-color: rgba(46, 204, 113, 0.2);
    }

    td.low-medium { 
        background-color: rgba(243, 156, 18, 0.2);
    }

    td.high-medium { 
        background-color: rgba(230, 126, 34, 0.2);
    }

    td.large { 
        background-color: rgba(231, 76, 60, 0.2);
    }

    .participant-type {
        font-weight: bold;
        min-width: 120px;
    }
}
</style>

## DFSP con casos de uso de pago

<table class="participant-matrix">
<thead>
<tr>
<th>Categoría de participante</th>
<th>Descripción</th>
<th>Casos de uso esperados</th>
<th>Requisitos de infraestructura para la integración con Mojaloop</th>
<th>SLA de producción esperado</th>
<th>Regulación probablemente relevante</th>
<th>Requisitos especiales de seguridad</th>
<th>Opciones de solución</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">DFSP pequeño autoalojado</td>
<td>- Institución financiera pequeña con una sola sucursal.<br>- Estaciones de trabajo propias<br>- Nube y/o SaaS mínimos.</td>
<td>- Todos los tipos de transferencia de moja excepto las masivas.<br>- Open banking (incluidos PISP, AISP)</td>
<td>- Una sola mini-pc dedicada, económica y de gama baja (p. ej. RPi)<br>- Una sola conexión de Internet de banda ancha para pequeñas empresas<br>- Sistema de core banking autoalojado, p. ej. Mifos<br>- Usar un firewall de SO/software en el mismo nodo de HW que la capa de integración.</td>
<td>- Es aceptable "algo" de tiempo de inactividad si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Comprar hardware de reemplazo ante una falla total puede tardar muchos días o semanas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ~10 TPS de pico sostenidas durante 1 hora.<br>  - Capacidad máxima de 864000 cada 24 horas.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- No es necesario integrarse con las plataformas de seguridad empresariales existentes.<br>- Se necesita una solución totalmente segura "en una caja" que siga las mejores prácticas del sector para servicios expuestos a Internet, es decir, incluido un firewall.</td>
<td>Se recomienda el “Standard Service Manager”: una solución de funcionalidad mínima basada en el Integration Toolkit (accesible localmente mediante una herramienta de BI). Puede alojarse en un servidor básico, desde un servidor de especificación media para una institución microfinanciera (MFI) grande o un banco pequeño, hasta una Raspberry PI para los DFSP más pequeños con requisitos de continuidad del servicio menos rigurosos y volúmenes de transacciones más bajos. El Standard Service Manager no admite pagos masivos.<br>- Capa de integración basada en Docker compose.<br>- Capa de integración mínima y autocontenida.</td>
</tr>
<tr>
<td class="low-medium participant-type">DFSP autoalojado medio-bajo</td>
<td>- Institución financiera pequeña con una o dos sucursales.<br>- "Centro de datos" propio, es decir, un armario de limpieza con algunos servidores, un router, un firewall, etc...<br>- Algunos conocimientos de nube y/o uso de SaaS.</td>
<td>- Todos los tipos de transferencia de moja<br>- Masivas (miles de transferencias).<br>- Open banking (incluidos PISP, AISP)</td>
<td>- Un solo nodo de hardware de servidor de grado empresarial.<br>- Usar un firewall de SO/software en el mismo nodo de HW que la capa de integración O un firewall de HW dedicado.</td>
<td>- Es aceptable "algo" de tiempo de inactividad si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Reemplazar el hardware ante una falla total puede tardar horas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ~50 TPS de pico sostenidas durante 1 hora.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...<br>?? requiere más aclaración</td>
<td>Se recomienda el “Enhanced Service Manager”: basado en el “Standard Service Manager” descrito antes, lo amplía agregando un despliegue de Kafka y compatibilidad con pagos masivos. Puede alojarse como mínimo en un servidor básico en el "centro de datos" propio del DFSP. <br>- Capa de integración basada en Docker compose o docker swarm.<br>- Capa de integración mínima y autocontenida.</td>
</tr>
<tr>
<td class="high-medium participant-type">DFSP autoalojado medio-alto</td>
<td>- Institución financiera pequeña con una o dos sucursales.<br>- "Centro de datos" propio, es decir, un armario de limpieza con algunos servidores, un router, un firewall, etc...<br>- Algunos conocimientos de nube y/o uso de SaaS.</td>
<td>- Todos los tipos de transferencia de moja<br>- Masivas (miles de transferencias).<br>- Open banking (incluidos PISP, AISP)</td>
<td>- Para tolerar la falla de 1 nodo de hardware se requieren 3 o más nodos de hardware. (2n+1)</td>
<td>- Es aceptable "algo" de tiempo de inactividad limitado (minutos) si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Debería tener hardware de repuesto a la espera o servicios de reemplazo muy rápidos en caso de fallas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ~50 TPS de pico sostenidas durante 1 hora.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...</td>
<td>Se recomienda el “Enhanced Service Manager”: basado en el “Standard Service Manager” descrito antes, lo amplía agregando un despliegue de Kafka y compatibilidad con pagos masivos. Puede alojarse como mínimo en una configuración redundante de varios servidores en el "centro de datos" propio del DFSP. <br>- Capa de integración basada en Kubernetes<br>- Posiblemente ya cuente con tecnología de integración existente.</td>
</tr>
<tr>
<td class="large participant-type">DFSP autoalojado grande</td>
<td>- Institución financiera madura, con varias sucursales y alta capacidad interna de TI<br>- Tiene su propio centro de datos y expertos para gestionar los sistemas<br>- Se desenvuelve con comodidad con la nube y las aplicaciones híbridas<br>- Tiene capacidad interna de ingeniería de software.</td>
<td>- Todos los tipos de transferencia de moja, incluidas las masivas.<br>- Masivas (millones de transferencias en una transacción, a 1000 por bloque, ordenadas por DFSP beneficiario).<br>- Open banking (incluidos PISP, AISP)</td>
<td>- Es necesaria la alta disponibilidad de la infraestructura interna<br>- Múltiples instancias activas de todos los servicios de integración críticos distribuidas en varios nodos de hardware.<br>- Almacenamiento de datos replicado y de alta disponibilidad.<br>  - puede ser multisitio / zona de disponibilidad / región.</td>
<td>- No se acepta ningún tiempo de inactividad<br>- Alta disponibilidad de la conectividad.<br>  - múltiples conexiones activas por rutas diversas.<br>- Almacenamiento persistente opcional.<br>- El SLA de la conexión al esquema de pagos y de la capa de integración debería coincidir con el SLA de la infraestructura interna existente.<br>- Hasta 800 TPS de pico sostenidas durante 1 hora para, p. ej., los FXP.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...</td>
<td>Se recomienda el “Premium Service Manager”: un servicio totalmente funcional del tipo Payment Manager, para uso de los DFSP más grandes. Su operación requiere recursos significativos; debe alojarse en el centro de datos existente del DFSP o en la nube.<br>- Capa de integración basada en Kubernetes<br>- Posiblemente ya cuente con tecnología de integración existente.<br> </td>
</tr>
</tbody>
</table>

## Fintech que usan PISP y/o AISP

<table class="participant-matrix">
<thead>
<tr>
<th>Categoría de participante</th>
<th>Descripción</th>
<th>Casos de uso esperados</th>
<th>Requisitos de infraestructura para la integración con Mojaloop</th>
<th>SLA de producción esperado</th>
<th>Regulación probablemente relevante</th>
<th>Requisitos especiales de seguridad</th>
<th>Opciones de solución</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">PISP/AISP pequeño autoalojado</td>
<td>- Organización pequeña, una fintech de una sola "sucursal" con uno o dos productos.<br>- Estaciones de trabajo / servidores propios<br>- Nube y/o SaaS mínimos.</td>
<td>- Pagos masivos relativamente pequeños, p. ej. pagos de salarios para pymes</td>
<td>- Una sola mini-pc dedicada, económica y de gama baja (p. ej. RPi)<br>- Una sola conexión de Internet de banda ancha para pequeñas empresas<br>- Sistema de core banking autoalojado, p. ej. Mifos<br>- Usar un firewall de SO/software en el mismo nodo de HW que la capa de integración.</td>
<td>- Es aceptable "algo" de tiempo de inactividad si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Comprar hardware de reemplazo ante una falla total puede tardar muchos días o semanas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ¿SLA de la interfaz masiva?<br>  - ¿Cómo debería definirse? ¿Tamaño del lote? ¿Tiempo para enviar el lote por la API? ¿Tiempo de respuesta de los callbacks?<br>  - Tamaño máximo de lote de aproximadamente 10k pagos<br>  - El envío de 10k pagos mediante la API masiva debería tardar < 30 segundos.<br>  - La respuesta a los callbacks debería tardar < 5 segundos.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- No es necesario integrarse con las plataformas de seguridad empresariales existentes.<br>- Se necesita una solución totalmente segura "en una caja" que siga las mejores prácticas del sector para servicios expuestos a Internet, es decir, incluido un firewall.</td>
<td>- Capa de integración basada en Docker compose.<br>- Capa de integración mínima y autocontenida.</td>
</tr>
<tr>
<td class="low-medium participant-type">PISP/AISP autoalojado medio-bajo</td>
<td>- Organización pequeña con una o dos sucursales.<br>- "Centro de datos" propio, es decir, un armario de limpieza con algunos servidores, un router, un firewall, etc...<br>- Algunos conocimientos de nube y/o uso de SaaS.</td>
<td>- Pagos masivos relativamente pequeños, p. ej. pagos de salarios para pymes<br>- Agregación de cuentas</td>
<td>- Un solo nodo de hardware de servidor de grado empresarial.<br>- Usar un firewall de SO/software en el mismo nodo de HW que la capa de integración O un firewall de HW dedicado.</td>
<td>- Es aceptable "algo" de tiempo de inactividad si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Reemplazar el hardware ante una falla total puede tardar horas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ¿SLA de la interfaz masiva?<br>  - ¿Cómo debería definirse? ¿Tamaño del lote? ¿Tiempo para enviar el lote por la API? ¿Tiempo de respuesta de los callbacks?<br>  - Tamaño máximo de lote de aproximadamente 25k pagos<br>  - El envío de 25k pagos mediante la API masiva debería tardar < 60 segundos.<br>  - La respuesta a los callbacks debería tardar < 10 segundos.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...<br>?? requiere más aclaración</td>
<td>- Capa de integración basada en Docker compose o docker swarm.<br>- Capa de integración mínima y autocontenida.</td>
</tr>
<tr>
<td class="high-medium participant-type">PISP/AISP autoalojado medio-alto</td>
<td>- Organización pequeña con una o dos sucursales.<br>- "Centro de datos" propio, es decir, un armario de limpieza con algunos servidores, un router, un firewall, etc...<br>- Algunos conocimientos de nube y/o uso de SaaS.</td>
<td>- Pagos masivos para organizaciones grandes, p. ej. organismos públicos.<br>- Agregación de cuentas</td>
<td>- Para tolerar la falla de 1 nodo de hardware se requieren 3 o más nodos de hardware. (2n+1)</td>
<td>- Es aceptable "algo" de tiempo de inactividad limitado (minutos) si falla el hardware.<br>  - Algunos esquemas de pagos pueden excluir a los DFSP que no puedan cumplir un determinado SLA de tiempo de inactividad.<br>  - Debería tener hardware de repuesto a la espera o servicios de reemplazo muy rápidos en caso de fallas.<br>- Conjunto completo de funciones de seguridad de Mojaloop: mTLS, JWS, ILP<br>- ¿SLA de la interfaz masiva?<br>  - ¿Cómo debería definirse? ¿Tamaño del lote? ¿Tiempo para enviar el lote por la API? ¿Tiempo de respuesta de los callbacks?<br>  - Tamaño máximo de lote de aproximadamente 100-200k pagos<br>  - El envío de 100-200k pagos mediante la API masiva debería tardar < 300 segundos.<br>  - La respuesta a los callbacks debería tardar < 120 segundos.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...</td>
<td>- Capa de integración basada en Kubernetes<br>- Posiblemente ya cuente con tecnología de integración existente.</td>
</tr>
<tr>
<td class="large participant-type">PISP/AISP autoalojado grande</td>
<td>- Organización madura, con varias sucursales y alta capacidad interna de TI<br>- Tiene su propio centro de datos y expertos para gestionar los sistemas<br>- Se desenvuelve con comodidad con la nube y las aplicaciones híbridas<br>- Tiene capacidad interna de ingeniería de software.</td>
<td>- Pagos masivos para organizaciones grandes, p. ej. organismos públicos.</td>
<td>- Es necesaria la alta disponibilidad de la infraestructura interna<br>- Múltiples instancias activas de todos los servicios de integración críticos distribuidas en varios nodos de hardware.<br>- Almacenamiento de datos replicado y de alta disponibilidad.<br>  - puede ser multisitio / zona de disponibilidad / región.</td>
<td>- No se acepta ningún tiempo de inactividad<br>- Alta disponibilidad de la conectividad.<br>  - múltiples conexiones activas por rutas diversas.<br>- Almacenamiento persistente opcional.<br>- El SLA de la conexión al esquema de pagos y de la capa de integración debería coincidir con el SLA de la infraestructura interna existente.<br>- ¿SLA de la interfaz masiva?<br>  - ¿Cómo debería definirse? ¿Tamaño del lote? ¿Tiempo para enviar el lote por la API? ¿Tiempo de respuesta de los callbacks?<br>  - Tamaño máximo de lote de aproximadamente 1 millón de pagos<br>  - El envío de 1 millón de pagos mediante la API masiva debería tardar < 600 segundos.<br>  - La respuesta a los callbacks debería tardar < 300 segundos.</td>
<td>- ¿Mantenimiento de registros?<br>- ¿Seguridad?</td>
<td>- Puede requerir integración con las plataformas de seguridad empresariales existentes, p. ej. firewalls, gateways, etc...</td>
<td>- Capa de integración basada en Kubernetes<br>- Posiblemente ya cuente con tecnología de integración existente.</td>
</tr>
</tbody>
</table>

## Historial del documento
|Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|9 de junio de 2025|Tony Williams|Versión inicial| 