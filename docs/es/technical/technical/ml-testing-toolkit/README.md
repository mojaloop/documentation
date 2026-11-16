---
i18n_source_sha: 0260e22a207b0d89faf2dec0dce86dbd1e17deeb
---

Mojaloop Kit de herramientas de pruebas

El **Kit de herramientas de pruebas Mojaloop** se diseñó para ayudar a los Mojaloop esquemas de pagos a escalar de forma eficaz, facilitando el DFSP proceso de Incorporación. Los esquemas pueden proporcionar un conjunto de reglas y pruebas en el kit de herramientas, y los DFSP pueden utilizarlo para realizar pruebas internas (o autocertificación en algunos casos). De este modo, se garantiza que los DFSP estén plenamente preparados para que sus implementaciones se integren en el Esquema de pagos y se facilita un proceso de incorporación rápido y fluido para los Mojaloop Hubs, lo que aumenta su escalabilidad.

Inicialmente, estaba dirigido a los proveedores de servicios financieros (FSP) y Participantes que desearan participar en un Esquema de pagos «Mojaloop». Sin embargo, en su forma actual, este conjunto de herramientas puede ser utilizado tanto por los proveedores de servicios financieros digitales (DFSP) como por los _Mojaloop Hubs_ para verificar la integración entre ambas entidades. Se ha diseñado expresamente como una herramienta estándar de pruebas de integración entre un _proveedor de servicios financieros digitales (DFSP)_ y el _Mojaloop Switch_ (Hub), con el fin de facilitar las pruebas. 

Para obtener más información sobre el Kit de herramientas de autoevaluación, consulte [Mojaloop Kit de herramientas de evaluación](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md). Sería conveniente que los participantes se familiarizaran con el [Diagram](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/Mojaloop-Testing-Toolkit.md#7-architecture), que explica los distintos componentes y los flujos relacionados.

## Guías de uso

Para la interfaz web, siga esta [Guía de uso](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide.md)

Para la herramienta de línea de comandos, siga esta [CLI Guía del usuario](https://github.com/mojaloop/ml-testing-toolkit/blob/master/documents/User-Guide-CLI.md)

**Si dispone de su propia implementación de «DFSP», puede dirigir el Endpoint del par hacia el «Mojaloop Testing Toolkit» en el puerto 5000 e intentar enviar solicitudes desde su implementación en lugar de utilizar el «mojaloop-simulator».**
