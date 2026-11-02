---
i18n_source_sha: eff17e54b551fdd1e52d962d4be0d6d891d50a17
---

# Adaptador de esquema SDK
Un adaptador de esquema es un servicio que actúa como interfaz entre un Switch compatible con Mojaloop API y una plataforma de fondo DFSP que no implementa de forma nativa el Mojaloop API.

El API entre el adaptador de esquema y el backend DFSP es síncrono HTTP, mientras que la interfaz entre el adaptador de esquema y el Switch es nativa Mojaloop API. Existe una excepción a esto: las integraciones masivas, que pueden configurarse para que sean síncronas o asíncronas.

El SDK-Scheme-Adapter cuenta con el respaldo de la Comunidad «Mojaloop» y se considera un referente en cuanto a las mejores prácticas para que un «DFSP» se conecte a un «Mojaloop» y a un «API». Lo más habitual es que el SDK-Scheme-Adapter se utilice y se implemente directamente en la solución. A continuación se ofrece un resumen de las diferentes formas en que esto puede llevarse a cabo.

## SDK Modelos de adopción
En función de las reglas del Esquema de pagos, existen cuatro modos habituales en los que los DFSP interactúan con el Hub central Mojaloop. Este resumen destaca el rol que desempeña el SDK-Scheme-Adapter en cada uno de los modos, ofrece una breve descripción general de cada uno de ellos y destaca las ventajas que reportan a los DFSP.

### 1. DFSP utilizando una solución de terceros, por ejemplo, Payment Manager, que emplea el adaptador del Esquema de pagos SDK 

Existen varias soluciones de terceros que ofrecen soporte, herramientas e integraciones con sistemas de backend que utilizan el SDK-Scheme-Adapter con el fin de facilitar la integración sincrónica (siguiendo las mejores prácticas indicadas en el punto Mojaloop) para conectarse a Mojaloop API.

«Payment Manager», una herramienta de código abierto*, es un ejemplo de ello. «Payment Manager» ofrece ventajas adicionales; puede encontrar más información [aquí](https://rtplex.io/). Los despliegues de «Payment Manager» pueden ser de tipo SaaS o autohospedados.

![SDK-Scheme-Adapter Mode 1](./assets/SDKSchemeAdapterMode1.svg)

- SDK El adaptador del Esquema de pagos se utiliza directamente en su implementación de integración personalizada.
- Dado que el SDK-Scheme-Adapter es mantenido por la comunidad, esta herramienta ofrece una vía de actualización para utilizar las nuevas versiones Mojaloop API.
- Solución estandarizada para una incorporación rápida
- Conector central desarrollado conjuntamente con integradores de sistemas o proveedores de software bancario
- La experiencia de usuario (UX) de Payment Manager facilita la automatización de las operaciones empresariales y de la Incorporación y el mantenimiento de la seguridad

:::tip Componentes de código abierto
Todos ellos están sujetos a la Licencia Apache v2.0. Se ha elegido específicamente esta licencia, ya que no infringe las políticas de numerosas organizaciones. La Licencia Apache v2.0 no incluye restricciones de «copy-left», por lo que los adoptantes pueden personalizar elementos, como los conectores principales, sin tener que compartir esos detalles privados con la comunidad.  
:::


### 2. DFSP utilizando su propio «Core Connector» con SDK «Esquema de pagos»

En este caso, la empresa «DFSP» opta por desarrollar un «Core Connector» personalizado entre su back-end y el adaptador «MojaloopSDK Esquema». Pueden utilizar las directrices de Código abierto para desarrollar dicho «Core Connector».

![SDK-Scheme-Adapter Mode 2](./assets/SDKSchemeAdapterMode2.svg)

- SDK El adaptador del Esquema de pagos se utiliza directamente en su implementación de integración personalizada.
- Dado que el SDK-Scheme-Adapter es mantenido por la comunidad, esta herramienta ofrece una vía de actualización para utilizar las nuevas versiones Mojaloop API.
- Desarrollado siguiendo las directrices del Core Connector de Código abierto
- Mojaloop. Apoyo a la comunidad
- Gestionado por el Departamento de Operaciones Técnicas de DFSP

### 3. DFSP. Solución de conexión «Mojaloop», desarrollada internamente

No se utiliza ninguna conexión estándar y el DFSP opta por establecer su propia conexión con el Mojaloop Hub.

![SDK-Scheme-Adapter Mode 3](./assets/SDKSchemeAdapterMode3.svg)

- Desarrollado a partir de documentación de diseño de Código abierto
- Mojaloop. Apoyo a la comunidad
- Gestionado por DFSP Tech Ops
- SDK: Es posible que se utilice el adaptador de Esquema de pagos como referencia
- Esta implementación interactúa directamente con las API asíncronas de «Mojaloop»




