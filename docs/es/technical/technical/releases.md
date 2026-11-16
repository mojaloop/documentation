---
i18n_source_sha: 6e245e4789ec9e0dcbdf12dde58f37881477ab60
---

# Mojaloop. Proceso de publicación de versiones

El Proceso de publicación de versiones de la versión Mojaloop sigue un enfoque impulsado por la comunidad, concretamente dirigido por los grupos de trabajo técnicos, en colaboración y consulta con el Consejo de Producto y la Autoridad de Diseño (DA).

El DA establece las políticas, las directrices y los criterios técnicos para las versiones (como los indicadores de calidad), mientras que el equipo de Producto define los requisitos de las funcionalidades y del producto en los casos en que intervengan dichos aspectos. Esta tarea la llevan a cabo las Workstreams pertinentes.

## 1. Proceso de publicación de versiones Mojaloop
![YM8f9iPhGU1jAfr-dQUk4e34QMGPG1ZWnbmC4ERGpsqp70GJH2he2Nje4poq_dii642B82j-Cj-2-HuYTkEF4poIBg8rJSfWYagBVOMyt6PQs5_P2YRE9magU_jE](https://github.com/mojaloop/design-authority-project/assets/10507686/075e528c-d4b2-4100-a2b9-6d06d77155d0)

Evento comunitario (planificación a nivel de PI), Workstream, funcionalidades, calidad del lanzamiento, pruebas, lista de comprobación, Candidato a versión, ejemplo de épica, Versión

El proceso de publicación de versiones de la versión Mojaloop sigue un
- enfoque impulsado por la comunidad
- dirigido específicamente por líneas de trabajo técnicas
- en colaboración y consulta con el Consejo de Producto y
- la Autoridad de Diseño (DA)

Criterios y directrices:
El departamento de Desarrollo (DA) establece las políticas, las directrices y los criterios técnicos para las versiones, mientras que el departamento de Producto define los requisitos de las funcionalidades y del producto.
Ejemplo de notas de la versión, criterios para la v17.0.0, [v17.0.](https://github.com/mojaloop/helm/releases/tag/v17.0.0)

Las pruebas continúan también tras el lanzamiento, y se ejecutan tareas programadas diarias para realizar pruebas, hasta que se realice el siguiente lanzamiento, con el fin de garantizar la estabilidad.

**Tareas actuales y criterios de aceptación para las versiones Mojaloop (helm)**:

Ejemplo de historia: [3122](https://github.com/mojaloop/project/issues/3122), [3847](https://github.com/mojaloop/project/issues/3847)

Las decisiones sobre qué funcionalidades se incluirán y cuáles estarán listas y se incorporarán no se recogen aquí, ya que se toman durante las fases de planificación (y en función de los resultados esperados).

- [x] Asegúrese de que todos los servicios básicos y los servicios incluidos en la versión cumplan las normas relativas a
  - [x] Alertas de Dependabot
  - [x] Archivos de licencia
  - [x] Encabezados de licencia en los archivos fuente
  - [x] Alertas de Snyk
  - [x] archivos de los propietarios del código
  - [x] Se han verificado las reglas de protección de las ramas principales
  - [x] Revisar los asuntos pendientes
  - [x] Revisar las solicitudes de incorporación de cambios abiertas
  - [x] Revise las excepciones de auditoría indicadas y elimine o reduzca al mínimo la lista
- [x] Actualizar los manifiestos para la acción de GitHub «Publicar solicitud de incorporación de cambios (PR)» en Workflow
- [x] Valide el comunicado de prensa publicado y el proceso
- [x] Realice el despliegue de los valores predeterminados con RC en el entorno moja* de AWS 
  - [x] Compruebe que la recogida de GP funcione al 100 %
  - [x] Las pruebas de Validate FX entre esquemas de pagos funcionan al 100 %
- [x] Despliegue y validación de la versión RC en un segundo entorno
  - [x] Compruebe que la recogida de GP funcione al 100 %
  - [x] Las pruebas de Validate FX entre esquemas de pagos funcionan al 100 %
- [x] Identifique los posibles problemas en los scripts de control de calidad; si los hay, corríjalos y vuelva a realizar las pruebas. 
- [x] Control de calidad: errores y regresiones; regístrelos 
- [x] Corrija los errores registrados si son críticos 
- [x] Validar con la colección TTK GP 
- [x] Pruebe la opción de configuración «on-us» (cambio en el tiempo de despliegue) y compruebe que las pruebas «on-us» se superan
- [x] Se ha publicado la versión del repositorio de casos de prueba de TTK 
- [x] Se ha redactado el borrador de las notas de la versión de Helm RC
  - [x] Orientaciones para la migración desde la versión (puede que sea necesario tratarlo en una entrada aparte si el tema es lo suficientemente amplio o complejo)
- [x] Actualice las notas de la versión con el enlace a la «Guía de estrategia de actualización»
- [x] Se ha publicado la versión Helm 
- [x] Despliegue de la versión Helm en un entorno de desarrollo
  - [x] La versión Helm se ha desplegado correctamente en el entorno de desarrollo
  - [x] Pruebas de regresión en el entorno de desarrollo utilizando colecciones de TTK 
    - [x] Colección GP
    - [x] Recogida a granel de residuos de núcleo
    - [x] Cobro por parte de terceros
    - [x] SDK Recogida de residuos voluminosos
    - [x] Colección «SDK R2P»
    - [x] Pruebas en modo ISO 20022
    - [x] Colección (o pruebas) de FX (divisas)
    - [x] Recopilación de pruebas Interscheme
  - [x] Validación mediante las pruebas de regresión «Golden Path» de CGS 
  - [x] Comprobar la posibilidad de actualización desde la versión anterior (v16.0.4 / v16.0.0)
- [x] Despliegue de la versión Helm en un entorno de control de calidad
  - [x] El despliegue de la versión Helm se ha realizado correctamente en el entorno de control de calidad
  - [x] Validación mediante pruebas de regresión de «Golden Path» en control de calidad
    - [x] Colección GP
    - [x] Recogida a granel de residuos de núcleo
    - [x] Cobro por parte de terceros
    - [x] SDK Recogida de residuos voluminosos
    - [x]  Colección «SDK R2P»
    - [x] Colección (o pruebas) de FX (divisas)
    - [x] Pruebas en modo ISO 20022
    - [x] Recopilación de pruebas Interscheme
- [x] Comprobar que las tareas cron diarias en los entornos de desarrollo y control de calidad (dev/qa) para las ejecuciones de GP funcionen correctamente y que los scripts de limpieza se ejecuten sin problemas 
- Compruebe que sea posible actualizar desde la versión estable anterior; además, esto servirá para detectar cualquier «problema oculto» que deba ser dirigido como parte del lanzamiento, o tal vez sea necesario actualizar las notas de la versión, partiendo de la base de que correspondería al usuario encargado de la actualización ocuparse de ello.


## 2. Proceso de publicación de versiones Mojaloop: actualizaciones propuestas:

Proponer un calendario de lanzamientos y plazos

1. Ejemplo: Cierre de nuevas funcionalidades para una versión (principal) seis semanas antes del inicio del siguiente ciclo de desarrollo (o evento comunitario).
1. Las correcciones de errores (no críticas) se incluirán cuatro semanas antes de la fecha de lanzamiento
1. El RC deberá ser validado por al menos un implementador posterior, como Mini-loop, IaC, Core-test-harness u otro implementador.
1. El lanzamiento seguirá adelante según lo previsto si no hay errores de prioridad alta o media pendientes en la versión RC y si se ha validado en un entorno de desarrollo y en al menos un equipo o implementador posterior.
1. Optimizar la gestión de los números de versión entre los distintos componentes de la plataforma «Mojaloop», como el Portal de Finanzas
1. Incluya las cifras de rendimiento junto con los detalles sobre la configuración en la que se realizó la evaluación de referencia.
1. Uso de recursos: registrar la huella de recursos de una versión base
1. Mecanismos de soporte de la documentación para las versiones Mojaloop

## 3. Contenido del lanzamiento de «Mojaloop» de Helm

Mojaloop servicios que respaldan la funcionalidad básica de la Plataforma y otros servicios clave que los respaldan, junto con las herramientas necesarias para las pruebas, como los simuladores

Funcionalidad básica con capacidad de configuración
1. Búsqueda de cuentas
    - Administración de la búsqueda de cuentas
    - Oráculos
    - ALS (Account Lookup Service (ALS))
2. Cotización
    - Compatibilidad con los modos persistente y de paso (configurable)
3. Transferencias (Compensación)
    - Compatibilidad con transferencias internas (configurable)
4. Liquidación
    - Compatibilidad con diversos tipos, niveles de detalle y frecuencias
5. Solicitudes de transacción (funcionalidad «Solicitud de pago»)
6. Servicios 3PPI (Interfaz de proveedores externos)
7. Capa API: para partes, cotizaciones, transferencias y solicitudes de transacción
8. Notificaciones
    - Adaptador ML-API
9. Conversión de moneda
10. Funcionalidad ampliada
    - Procesador central de eventos
    - Notificador por correo electrónico (anterior a la versión 15)
    - Compatibilidad con la trazabilidad y el Monitoreo
    - Instrumentación
11. Auditoría
    - Capacidades de auditoría exhaustivas
12. Servicios y herramientas de apoyo para las pruebas
    - ML TTK (Kit de herramientas de pruebas)
    - Simulador ML
    - Adaptadores de esquemas SDK
    - Instancias del gestor de pagos
13. Adaptadores de esquemas de terceros
    - Integración con esquemas de terceros
14. Gestión del ciclo de vida de los participantes
    - Creación de participantes
    - Actualizaciones de participantes
15. Asistencia a los participantes
    - Herramientas sencillas y fáciles de usar para los adoptantes (Ejemplo: [SDK-Scheme-Adapter](https://github.com/mojaloop/sdk-scheme-adapter), [Toolkit](https://github.com/mojaloop/integration-toolkit/tree/main))
    - Funcionalidad y asistencia para la Incorporación

## 4. Plataforma «Mojaloop»
1. Versión y configuración principales de Mojaloop (Helm) compatibles con
    - Motor de compensación que incluye compatibilidad con operaciones masivas
    - Citando
    - Búsqueda de cuenta y componentes auxiliares
    - Motor de liquidación
    - Capa API
    - Compatibilidad con el sistema «Solicitud de pago» (solicitudes de transacción)
    - Gestión del ciclo de vida de los participantes
    - Ref.: Versión Mojaloop de Helm (ejemplo: v15.1.0)
2. PISP / Funcionalidad 3PPI
3. API Gateway(s)
    - Proporcione una capa de seguridad de nivel API 
    - Proporcionar funciones de entrada, salida, filtrado de direcciones IP y cortafuegos
    - Mecanismos de seguridad compatibles: JWS, mTLS
    - Referencia: WSO2
4. Componentes de seguridad:
    - HSM, cuando proceda o se utilice
    - Gestión de identidades y accesos
    - Gestión de certificados
    - Gestión de conexiones
5. Portal de finanzas, Informes
    - Portales para los equipos de operaciones de los Hub y de operaciones empresariales
    - Portales y funcionalidades para los equipos de operaciones técnicas
    - Ref.: FP v3, basada en el Marco de Operaciones Empresariales
6. Asistencia para el monitoreo:
    - Apoyo operativo y seguimiento (ejemplos: EFK, Prometheus, Grafana, Loki)
    - IaC utiliza Grafana, Prometheus y Loki
7. Utilice IaC como referencia; ejemplo: https://github.com/mojaloop/iac-modules/releases/tag/v5.7.0 



## Novedades

> *Nota: Las versiones que figuran a continuación son las últimas versiones publicadas de cada artefacto de lanzamiento concreto y se facilitan a título informativo. Consulte las notas de la versión correspondiente al lanzamiento Helm para ver qué versiones se incluyen en la versión [Helm Charts Packaged Release](#helm-charts-packaged-releases)].*

* Helm: [![Git Releases](https://img.shields.io/github/release/mojaloop/helm.svg?style=flat)](https://github.com/mojaloop/helm/releases)
* Libro mayor central: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-ledger.svg?style=flat)](https://github.com/mojaloop/central-ledger/releases)
* Ml-API-Adapter: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-api-adapter.svg?style=flat)](https://github.com/mojaloop/ml-api-adapter/releases)
* Account Lookup Service (ALS): [![Git Releases](https://img.shields.io/github/release/mojaloop/account-lookup-service.svg?style=flat)](https://github.com/mojaloop/account-lookup-service/releases)
* Servicio de cotizaciones: [![Git Releases](https://img.shields.io/github/release/mojaloop/quoting-service.svg?style=flat)](https://github.com/mojaloop/quoting-service/releases)
* Servicio de solicitud de transacciones: [![Git Releases](https://img.shields.io/github/release/mojaloop/transaction-requests-service.svg?style=flat)](https://github.com/mojaloop/transaction-requests-service/releases)
* Adaptador Bulk-API: [![Git Releases](https://img.shields.io/github/release/mojaloop/bulk-api-adapter.svg?style=flat)](https://github.com/mojaloop/bulk-api-adapter/releases)
* Central-Liquidación: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-settlement.svg?style=flat)](https://github.com/mojaloop/central-settlement/releases)
* Procesador central de eventos: [![Git Releases](https://img.shields.io/github/release/mojaloop/central-event-processor.svg?style=flat)](https://github.com/mojaloop/central-event-processor/releases)
* Notificador por correo electrónico: [![Git Releases](https://img.shields.io/github/release/mojaloop/email-notifier.svg?style=flat)](https://github.com/mojaloop/email-notifier/releases)
* Adaptador SDK-Esquema de pagos: [![Git Releases](https://img.shields.io/github/release/mojaloop/sdk-scheme-adapter.svg?style=flat)](https://github.com/mojaloop/sdk-scheme-adapter/releases)
* SDK de terceros: [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-sdk.svg?style=flat)](https://github.com/mojaloop/thirdparty-sdk/releases)
* Thirdparty-API-Svc: [![Git Releases](https://img.shields.io/github/release/mojaloop/thirdparty-api-svc.svg?style=flat)](https://github.com/mojaloop/thirdparty-api-svc/releases)
* Auth-Svc: [![Git Releases](https://img.shields.io/github/release/mojaloop/auth-service.svg?style=flat)](https://github.com/mojaloop/auth-service/releases)
* Kit de herramientas de pruebas ML: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit/releases)
* Kit de herramientas de pruebas ML: [![Git Releases](https://img.shields.io/github/release/mojaloop/ml-testing-toolkit-ui.svg?style=flat)](https://github.com/mojaloop/ml-testing-toolkit-ui/releases)


Para consultar una lista exhaustiva de las versiones de Helm, visite la [Helm página de versiones](https://github.com/mojaloop/helm/releases).
