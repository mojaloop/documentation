---
i18n_source_sha: e2a9f33230f5f4eccf3135ea811acff38a180ec9
---

# Introducción – Guía de operaciones técnicas

El Hub de Mojaloop opera varios entornos que hay que gestionar y mantener a diario. Los procedimientos estándar que se describen en este documento describen los procesos operativos que permiten al Operador del Hub encargarse de todos los aspectos de la gestión de un servicio en producción.

Deben existir los siguientes procedimientos:

- [**Gestión de incidentes**](./incident-management.md): gestionar los incidentes que se han reportado al equipo de Operaciones Técnicas o que le han llegado a través de alertas o de actividades de monitoreo.

- [**Gestión de problemas**](./problem-management.md): llegar a la causa raíz de los incidentes o a las posibles causas de los incidentes, e impulsar acciones para mejorar o corregir la situación de inmediato.

- [**Gestión de cambios**](./change-management.md): controlar el ciclo de vida de todos los cambios, permitiendo hacerlos con la mínima interrupción de los servicios de TI.

- [**Gestión de versiones**](./release-management.md): gestionar, planificar, programar y controlar un cambio de software a lo largo del despliegue y las pruebas en los distintos entornos.

- [**Triaje de defectos**](./defect-triage.md): asegurar que todos los errores detectados en el entorno de Producción del cliente se capturen, se evalúen, se prioricen y se envíen a la Mesa de Servicio.

A continuación se ofrece una descripción general rápida de los entornos que gestiona el Operador del Hub:

- **Desarrollo**: entorno de desarrollo de software que no es de producción, donde el código OSS de Mojaloop se fusiona con las personalizaciones. Da a los desarrolladores una devolución rápida de las pruebas sobre los envíos de código nuevo. Los Proveedores de Servicios Financieros Digitales (DFSP) no interactúan con este entorno. Acceso solo para desarrollo y QA.

- **Pruebas de aceptación del usuario (UAT)**: entorno de pruebas para las pruebas de aceptación del usuario y de regresión que validan las nuevas versiones.

- **Sandbox (SBX)**: entorno de pruebas para validar la conectividad de los DFSP tanto en los requisitos de API como en los de seguridad.

- **Preproducción (STG)**: entorno previo a producción que refleja producción con la mayor fidelidad posible. Validación de nuevas versiones y de la integración de los DFSP.

- **Producción (PRD)**: entorno de producción compatible con la versión de producción.

::: tip
Se proporciona un [Glosario](./key-terms-kpis.md) para ayudar a aclarar los términos habituales de Operaciones Técnicas que se usan a lo largo de este documento. Si encuentra un término que necesita explicación, conviene consultar el glosario para ver si se ha proporcionado una definición.
:::
