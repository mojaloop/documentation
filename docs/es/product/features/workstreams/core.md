---
i18n_source_sha: e9cf2bdf5a78178f86c2c044f945d2289f4dae04
---

# Workstream Core and Releases
El workstream Core and Releases de Mojaloop mantiene el núcleo de Mojaloop (elementos de mantenimiento como la corrección de errores críticos, mejoras de funcionalidad priorizadas y actualizaciones de node) y se encarga del proceso de publicación de versiones de los servicios centrales y de algunos servicios o productos adyacentes que forman parte de la plataforma Mojaloop.

El workstream también busca apoyar a otros workstreams que entregan funcionalidades al núcleo o a los servicios de soporte, ayudando a empaquetar servicios con calidad de versión (las nuevas funcionalidades deben seguir los estándares de calidad y las mejores prácticas adoptados por Mojaloop, como pruebas automatizadas, documentación, helm charts y similares). Esto incluye también el aspecto de soporte a la comunidad.

# Justificación de negocio
La gestión del Mojaloop Core y de las versiones de la plataforma de código abierto es fundamental para la oferta.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| Sam Kummary | Shashi Hirugade<br>Juan Correa |

## Última actualización (resumen)
El workstream Core and Releases ha preparado la versión 17.3.0 incorporando una serie de mejoras de estabilidad y rendimiento, incluidas correcciones de fugas de recursos de larga duración detectadas mediante pruebas de rendimiento prolongadas. Los primeros resultados indican que el rendimiento se mantiene comparable a pesar de la introducción de medidas de seguridad adicionales como Istio y TLS mutuo. También está en marcha la planificación de la versión 18, con énfasis en una validación exhaustiva por parte de los adoptantes de la arquitectura basada en TigerBeetle antes de su publicación en producción.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julio de 2026| Paul Makin|Se agregó la última actualización|
|1.1|4 de diciembre de 2025| Paul Makin|Se agregó la última actualización|
|1.0|25 de noviembre de 2025| Paul Makin|Versión inicial|