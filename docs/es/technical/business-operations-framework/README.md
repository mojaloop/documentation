---
i18n_source_sha: b6690c1f73b00387a0854869e0b3c4f3004b4cc6
---

# Introducción


Únase a esta iniciativa para crear un conjunto de procesos empresariales básicos que permitan **«ponerse en marcha rápidamente»**, que sean fáciles de personalizar, que contribuyan al Código abierto y que sigan las mejores prácticas. 

El Marco de Operaciones Empresariales tiene como objetivo ayudar a los operadores del Hub a crear e implementar portales de procesos empresariales que respalden sus procesos empresariales tal y como se definen en [Mojaloop la documentación empresarial](https://docs.mojaloop.io/mojaloop-business-docs/). El Marco de Operaciones Empresariales fomenta la colaboración de la comunidad en la creación de una experiencia de usuario (UX) para un Mojaloop Operador del Hub que incluya API robustas, siga las mejores prácticas y sea segura desde su diseño. El objetivo es seguir impulsando la adopción y mejorar el valor de uso inmediato de la Mojaloop solución.

La interfaz de usuario (UI) resultante no pretende ser exhaustiva, sino mostrar un ejemplo de experiencia web que resulte fácil de ampliar y personalizar. Por lo tanto, es importante que se admita el Control de acceso basado en roles (RBAC), que se integre con los sistemas estándar de gestión de identidades y accesos (IAM), el control de seguridad a nivel de API, los microfrontends y los flujos de trabajo de tipo «Maker/checker». La arquitectura de la experiencia de usuario (UX) sigue un patrón de paquete precompilado con un «API» de respaldo que puede realizarse en una red de distribución de contenidos (CDN). 

El presente documento ofrece una descripción más detallada del diseño, incluyendo los aspectos de seguridad, las tecnologías utilizadas y los patrones de arquitectura.

El marco:
1. Implementa una integración e implementación de RBAC e IAM basadas en las mejores prácticas.
2. Incluye un plan de despliegue para incorporar la solución de RBAC e IAM en la versión Mojaloop.
3. Incluye un plan de despliegue para el portal de la interfaz de usuario, de modo que pueda implementarse en una red CDN.
4. Utiliza microfrontends creados a partir de diferentes repositorios para desacoplar los esfuerzos de la comunidad y facilitar la ampliación y la personalización.
5. Proporciona un registro de auditoría de todas las actividades realizadas.

Para configurar la seguridad según las mejores prácticas, se requieren tres niveles o grados de control:
1. Acceso diario a las interfaces de usuario de IAM, donde se crean y suspenden los usuarios y se les asignan sus roles.
2. Asignaciones de roles a permisos, que pueden editarse mediante una solicitud de cambio de configuración.
3. Restricciones de acceso «API» basadas en los permisos de los que dispone un sujeto (un usuario o API cliente) a través de sus roles.

## Iniciativa comunitaria: lista de tareas pendientes

La entrega inicial de este marco incluye una pequeña sección vertical para demostrar la implementación funcional de extremo a extremo del mismo. Aunque esta función, que se entrega en primer lugar, cumple un propósito importante, no constituye el objetivo final de este proyecto. El objetivo es proporcionar un marco al que puedan contribuir otras iniciativas de la comunidad. A continuación se presenta la lista actual de tareas pendientes, que incluye el soporte para API procesos de backend y microfrontends que está previsto añadir a este marco mediante Mojaloop iniciativa de implementación de la comunidad:


| Categoría | Descripción | Esfuerzo comunitario solidario |
| --- | --- | --- |
| **Configuración de la plataforma** | Proceso para configurar la plataforma de modo que aplique el Esquema de pagos y las Reglas del mismo. | - |
| **Gestión de plataformas** | Controles técnicos de gestión operativa de la Plataforma. | Actualmente se lleva a cabo mediante el monitoreo del rendimiento de las aplicaciones (APM) de Kibana y Elasticsearch. Por el momento, no hay planes de pasar a un marco de trabajo. |
| **Gestión de la liquidez** | Apoyo en los procesos de gestión de la liquidez. | Portal financiero V2: aún no forma parte del marco. |
| **Gestión del ciclo de vida de los participantes <br> (vista del Hub)** | Gestión de la incorporación y los cambios de estado de los participantes. | Portal financiero V2: aún no forma parte del marco. |
| **Gestión del ciclo de vida de los participantes <br> (DFSP vista)** | Permitir a los DFSP gestionar su estado y su interacción con el Hub. | - |
| **Gestión de liquidaciones** | Interfaz de gestión para la liquidación. | DFSP informes de conciliación: los informes del proyecto de digitalización de las IMF de Myanmar (MMD) se están incorporando al marco (se accede a ellos a través de un API).<br> Liquidación neta diferida multilateral: el Portal Financiero V2 aún no está disponible en el marco. |
| **Gestión de transferencias y transacciones** | Vista de las operaciones comerciales de todas las transacciones en el Hub. | Portal financiero V2: se está transformando en un marco de trabajo con mejoras. Permite el seguimiento de una transferencia de extremo a extremo. |
| **Gestión de contratos (cotizaciones)** | - | - |
| **Búsqueda de cuenta y gestión de la identificación** | - | - |
| **Gestión de pagos iniciados por terceros** | - | - |
| **Gestión de tarifas (de intercambio y de facturación)** | - | - |
| **Informes y análisis** | - | - |

## Arquitectura de referencia

El Workstream de arquitectura de referencia ha diseñado —mediante un proceso colaborativo— la arquitectura de la futura/próxima versión de Mojaloop. El Marco de Operaciones Empresariales se está diseñando para funcionar en la versión Mojaloop existente (núcleo v1.0). No obstante, dicho marco debe ser compatible con la arquitectura de referencia y, siempre que sea posible, facilitar la transición hacia el diseño de la arquitectura de referencia.


Los siguientes elementos del proyecto del marco de operaciones empresariales contribuyen directamente a la creación de una arquitectura de referencia:
1. **Contexto delimitado de seguridad**
La implementación del modelo RBAC en esta Workstream utilizó algunas de las ideas de diseño y separaciones definidas en el contexto delimitado de seguridad de la arquitectura de referencia. No se implementó ninguna de las interfaces necesarias para que esta se considere una implementación del contexto delimitado de seguridad.
2. **Contexto delimitado de generación de informes**
En esta Workstream se está desarrollando parte del contexto delimitado de generación de informes.

La división del frontend en microfrontends que pueden desarrollarse, probarse y lanzarse de forma independiente; lo que permite a los equipos que crean soluciones dentro de cada contexto delimitado desarrollar de forma independiente la funcionalidad API y la interfaz de usuario correspondiente. Este diseño también facilita la implementación de personalizaciones y ampliaciones para cada contexto delimitado.

A continuación se ofrece una visión general de cómo se pueden combinar las API operativas, las API de experiencia y los microfrontends para formar los componentes que conforman el marco de Operaciones Empresariales.

![Architecture overview diagram compatible with the reference architecture](../../.vuepress/public/BizOps-Framework-BizOps-Framework.png) 


## IaC 4.xx

La próxima versión del proyecto «Infraestructura como código» tiene previsto utilizar un conjunto de herramientas distinto al que se emplea actualmente en la Comunidad «Mojaloop»; es decir, WSO2, con su Identity Server como gestor de claves (IS-KM), y las implementaciones de HAproxy se sustituirán por las herramientas Keycloak, Ambassador y Envoy. Este diseño es compatible con la próxima versión de IaC.