---
i18n_source_sha: 673b919544ca006f6f730976d17fc0285a614902
---

# Workstream PISP 2.0
La implementación actual del PISP requiere una refactorización para satisfacer las necesidades generales de los adoptantes y de las fintech, en lugar de admitir una sola forma de trabajo. Esto requerirá cambios complementarios en el Hub y en el Mojaloop Connector, y se espera que admita la autorización continua en el DFSP.

La interfaz PISP refactorizada también admitirá el inicio de pagos masivos por parte de una fintech, que ofrezca por ejemplo un servicio tercerizado de procesamiento de salarios.

Este workstream debe completarse antes de emprender los cambios propuestos a los pagos masivos/PISP.

Las mejoras para dar soporte al AISP llegarán en un PI futuro.

# Justificación de negocio
Generalizar la implementación del PISP de Mojaloop para admitir modelos de negocio distintos del de Google, el patrocinador de la implementación original.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| Olivier Manzi<br>Yui Kanchalai | Adetayo Teluwo <br>Paul Makin<br>Sam Kummary<br>Michael Richards<br>Péricles Correa
 |

## Última actualización (resumen)
El workstream PISP se ha centrado en establecer procesos de entrega, incluidos el seguimiento de proyectos en GitHub, la gestión de hitos y la incorporación de contribuyentes. La participación activa en el código abierto ha aumentado de forma significativa, mientras que ha comenzado el trabajo de migración de la base de código a TypeScript. Mirando hacia adelante, el workstream se prepara para una prueba de concepto integral de PISP 2.0, con atención particular en las herramientas de integración para fintech y en el SDK de soporte necesario para complementar la funcionalidad existente del hub.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0| 28 de julio de 2026 | Paul Makin|Versión inicial|