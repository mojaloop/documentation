---
i18n_source_sha: 82f345ba598423e9eb2b23ca82101ff294736b8e
---

# Workstream Forensic Audit
En primer lugar, desarrollar una infraestructura o marco de auditoría forense; en segundo lugar, actualizar la base de código de Mojaloop para que use esa infraestructura y cree un registro de auditoría a prueba de manipulaciones; y en tercer lugar, crear herramientas que permitan analizar ese registro de auditoría.

# Justificación de negocio
Las capacidades de auditoría forense son vitales para un despliegue en producción, a cualquier escala.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| James Bush | Michael Richards <br>Paul Makin<br>Sam Kummary|

## Última actualización (resumen)
El workstream Forensic Audit ha pasado a la fase de implementación: ya está disponible una base de código funcional y las pruebas no funcionales están en marcha. La siguiente fase integrará el cliente de auditoría en los servicios centrales de Mojaloop, mientras pruebas de rendimiento exhaustivas evalúan si la arquitectura puede sostener los volúmenes de transacciones previstos. Los resultados de estas pruebas orientarán las decisiones sobre la arquitectura de auditoría definitiva, incluido el equilibrio entre el procesamiento sincrónico y el asincrónico.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|28 de julio de 2026| Paul Makin|Versión inicial|