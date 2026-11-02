---
i18n_source_sha: d4aa81c5d30e3863a304694786f1951c2ac5d986
---

# Mojaloop. Secuencia de actualización del repositorio

Este documento ofrece orientación sobre el orden en el que deben actualizarse los repositorios de NodeJS (Mojaloop) al lanzar nuevas funcionalidades y/o realizar el mantenimiento de la versión Mojaloop. Esto es importante para garantizar que cada uno de los servicios que forman parte de una versión Mojaloop utilice la dependencia correcta del repositorio Mojaloop. Esta es la actualización correspondiente a la versión Mojaloop RC v17; a medida que Mojaloop evolucione, será necesario actualizarla con nuevos componentes (y eliminar aquellos que se hayan suprimido).

## Índice

- [Secuencia de actualización del repositorio de Node.js](#nodejs-repository-update-sequence)]
  - [Índice](#table-of-contents)
  - [Categorías del repositorio](#repository-categories)
  - [Proceso de actualización](#update-process)
  - [Requisitos de prueba](#testing-requirements)
  - [Mojaloop Secuencia de reposición](#mojaloop-repo-sequence)

## Categorías del repositorio

A continuación se enumeran las categorías de los Mojaloop repositorios de NodeJS:

1. **Bibliotecas de Servicios Centrales**
   - `central-services-shared`
   - `central-services-error-handling`
   - `central-services-database`
   - `central-services-stream`
   - `central-services-metrics`
   - `central-services-error`
   - `central-services-logger`
   - `sdk-standard-components`

2. **Servicios principales**
   - `account-lookup-service`
   - `quoting-service`
   - `central-ledger`
   - `central-settlement`
   - `central-bulk-transfers`
   - `transaction-requests-service`
   - `ml-api-adapter`

3. **Componentes del evento**
   - `central-event-processor`
   - `event-framework`
   - `event-stream-processor`
   - `elastic-apm-node`
   - `elastic-apm-node-opentracing`
   - `email-notifier`
   - `event-sidecar`

4. **Adaptadores, SDK y API**
   - `sdk-scheme-adapter`
   - `event-sdk`
   - `thirdparty-sdk`
   - `bulk-api-adapter`
   - `thirdparty-api-svc`
   - `als-consent-oracle`
   - `als-oracle-pathfinder`

5. **Pruebas**
   - `ml-testing-toolkit`
   - `ml-testing-toolkit-client-lib`
   - `ml-testing-toolkit-ui`
   - `ml-testing-toolkit-shared-lib`
   - `mojaloop-simulator`
   - `simulator`

6. **Otras bibliotecas**
   - `api-snippets`
   - `auth-service`
   - `ml-number`
   - `object-store-lib`
   - `inter-scheme-proxy-cache-lib`
   - `database-lib`

## Proceso de actualización

1. **Identificar las dependencias**
   - Utilice el valor «`npm audit`» para identificar vulnerabilidades
   - Revisar `package.json` archivos en busca de dependencias obsoletas
   - Compruebe si hay cambios que afecten a la compatibilidad en las actualizaciones de versión principales

2. **Crear un plan de actualización**
   - Documente todos los repositorios que requieran actualizaciones
   - Identificar posibles cambios que puedan provocar incompatibilidades
   - Planifique la estrategia de pruebas para cada componente

3. **Ejecutar actualizaciones**
   - Empiece por las bibliotecas básicas
   - Actualice un repositorio cada vez
   - Realice pruebas tras cada actualización
   - Documente cualquier problema o solución alternativa

4. **Pruebas de integración**
   - Pruebe los componentes actualizados en conjunto
   - Verificar el funcionamiento de extremo a extremo
   - Compruebe si hay repercusiones en el rendimiento (hoja de ruta, a partir de la versión 17)

## Requisitos de ensayo

Para cada repositorio, siga las instrucciones de prueba que figuran en el archivo README y ejecute:

1. **Pruebas unitarias**
   - Ejecutar el conjunto de pruebas existente
   - Añada nuevas pruebas para las funcionalidades actualizadas
   - Verifique la cobertura de las pruebas

2. **Pruebas de integración**
   - Prueba con servicios dependientes
   - Compruebe la compatibilidad con la versión API
   - Compruebe la gestión de eventos

3. **Pruebas de extremo a extremo**
   - Kit de herramientas de pruebas «Mojaloop»
   - Verificar los flujos de transacciones
   - Escenarios de error de prueba


## Mojaloop. Secuencia de reposición

La siguiente tabla ofrece una visión detallada de Mojaloop repositorios y sus dependencias. Esta información es fundamental para comprender el orden correcto de las actualizaciones a la hora de abordar cambios en las dependencias o vulnerabilidades.

| Secuencia | Repo | Dependencias |
|---|---|---|
| 1 | fragmentos de API |  |
| 2 | ml-número |  |
| 3 | biblioteca de bases de datos |  |
| 4 | registrador-de-servicios-centrales |  |
| 5 | indicadores-de-servicios-centrales |  |
| 6 | gestión-de-errores-en-los-servicios-centrales |  |
| 7 | ml-kit-de-herramientas-shared-lib |  |
| 8 | logging-bc-public-types-lib |  |
| 9 | Plataforma-biblioteca-compartida-tipos-de-mensajes-lib |  |
| 10 | nodo-elastic-apm |  |
| 11 | elastic-apm-node-opentracing |  |
| 12 | object-store-libp | registrador-de-servicios-centrales |
| 13 | área de servicios centrales |  |
| 14 | servicios-centrales-de-salud | gestión-de-errores-en-los-servicios-centrales, registro-de-errores-en-los-servicios-centrales |
| 15 | event-sdk | central-services-stream, central-services-logger, central-services-stream |
| 16 | inter-scheme-proxy-cache-lib | registrador-de-servicios-centrales, servicios-centrales-compartidos, biblioteca-de-caché-de-proxy-entre-esquemas, gestión-de-errores-de-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, SDK-de-eventos |
| 17 | ml-schema-transformer-lib | gestión-de-errores-de-servicios-centrales, registrador-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, componentes-estándar-del-SDK, biblioteca-de-transformadores-de-esquemas-de-ML |
| 18 | sdk-componentes-estándar |  |
| 19 | servicios-centrales-compartidos |  |
| 20 | Plataforma-biblioteca-compartida-nodejs-cliente-kafka-lib |  |
| 21 | logging-bc-client-lib |  |
| 22 | **account-lookup-service** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, componentes-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, biblioteca-de-bases-de-datos, SDK-de-eventos, biblioteca-de-caché-de-proxy-entre-esquemas, componentes-estándar-del-SDK, componentes-estándar-del-SDK, registrador-de-servicios-centrales, servicios-compartidos-centrales, flujo-de-servicios-centrales |
| 23 | **als-consent-oracle** | fragmentos-de-API, estado-de-los-servicios-centrales, servicios-centrales-compartidos, componentes-estándar-del-SDK, gestión-de-errores-de-los-servicios-centrales, registrador-de-los-servicios-centrales, métricas-de-los-servicios-centrales, SDK-de-eventos |
| 24 | **als-oracle-pathfinder** | registrador-de-servicios-centrales, servicios-centrales-compartidos |
| 25 | **auth-service** | fragmentos-de-API, servicios-centrales-de-salud, servicios-centrales-compartidos, SDK-de-eventos, componentes-estándar-del-SDK, servicios-centrales-de-gestión-de-errores, registrador-de-servicios-centrales, métricas-de-servicios-centrales, SDK-de-eventos |
| 26 | **bulk-api-adapter** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registro-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, SDK-de-eventos, biblioteca-de-almacenamiento-de-objetos |
| 27 | **central-event-processor** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registro-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, SDK-de-eventos |
| 28 | **central-ledger** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, biblioteca-de-bases-de-datos, SDK-de-eventos, biblioteca-de-caché-de-proxy-entre-esquemas, número-de-ml, biblioteca-de-almacenamiento-de-objetos |
| 29 | **central-settlement** | central-ledger, base de datos de servicios centrales, gestión de errores de servicios centrales, estado de los servicios centrales, registro de servicios centrales, recursos compartidos de servicios centrales, flujo de servicios centrales, SDK de eventos, número de ML |
| 30 | **notificador por correo electrónico** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registro-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, SDK-de-eventos |
| 31 | **event-sidecar** | central-services-logger, central-services-metrics, central-services-stream, event-sdk |
| 32 | **Procesador de flujos de eventos** | servicios-centrales-salud, servicios-centrales-registrador, servicios-centrales-métricas, servicios-centrales-compartidos, servicios-centrales-flujo, nodo-elastic-apm, nodo-elastic-apm-opentracing, sdk-de-eventos |
| 33 | **mojaloop-simulator** | registrador-de-servicios-centrales |
| 34 | **ml-api-adapter** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, SDK-de-eventos, componentes-estándar-del-SDK, biblioteca-de-bases-de-datos, biblioteca-de-caché-de-proxy-entre-esquemas |
| 35 | **ml-testing-toolkit** | central-services-logger, central-services-metrics, ml-schema-transformer-lib, ml-testing-toolkit-shared-lib, sdk-standard-components |
| 36 | **ml-kit-de-herramientas-client-lib** | central-services-logger, ml-kit de herramientas de pruebas compartidas, sdk-standard-components |
| 37 | **ml-kit-de-herramientas-ui** | ml-kit-de-herramientas-shared-lib |
| 38 | **quoting-service** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, flujo-de-servicios-centrales, SDK-de-eventos, biblioteca-de-caché-de-proxy-entre-esquemas, número-de-ML, componentes-estándar-del-SDK |
| 39 | **simulador** (antiguo, oráculo ALS) | gestión-de-errores-de-servicios-centrales, registro-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, SDK-de-eventos, componentes-estándar-del-SDK |
| 40 | **sdk-scheme-adapter** | fragmentos-de-API, gestión-de-errores-de-servicios-centrales, registrador-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, SDK-de-eventos, componentes-estándar-del-SDK |
| 41 | **thirdparty-api-svc** | api-snippets, Servicios compartidos, Servicios stream, Error handling, Logger, Metrics, Event-sdk |
| 42 | **thirdparty-sdk** | fragmentos-de-API, gestión-de-errores-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, sdk-scheme-adapter, componentes-estándar-del-SDK |
| 43 | **transaction-requests-service** | gestión-de-errores-de-servicios-centrales, estado-de-los-servicios-centrales, registro-de-servicios-centrales, métricas-de-servicios-centrales, recursos-compartidos-de-servicios-centrales, SDK-de-eventos, biblioteca-compartida-del-Kit de herramientas de pruebas de aprendizaje automático |

### Visualización de la secuencia de actualización

El siguiente diagrama ilustra la secuencia de actualización recomendada para Mojaloop repositorios, teniendo en cuenta sus dependencias y relaciones:

![Repository Update Sequence](./assets/diagrams/repositoryUpdate/repository-update-sequence.svg)

Este diagrama ofrece una representación visual de la secuencia de actualización, en la que se muestran:
1. La agrupación lógica de los repositorios
2. Las dependencias entre los distintos grupos
3. Casos especiales, como las dependencias circulares
4. Las posibilidades de actualización en paralelo
5. Los distintos tipos de dependencias que deben tenerse en cuenta 