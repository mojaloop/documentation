---
i18n_source_sha: 9da4b0f6107d3dac98dd955b1a64b0cb0b63619c
---

# Workstream QA Framework
El objetivo general de este workstream es desarrollar un QA Framework que pueda usarse para validar la configuración, la funcionalidad, la seguridad, la preparación para la interoperabilidad y el rendimiento de un despliegue. Este marco podría ser usado por los adoptantes para "autocertificarse", o podría ser usado por un revisor externo para crear un nivel de aseguramiento ante las autoridades supervisoras y los participantes.

Tras la entrega del QA Framework en Mojacom 30, el workstream ha pasado a desarrollar una versión legible por máquina del marco, con el fin de aprovechar la automatización del proceso de QA.

# Justificación de negocio
Un QA Framework proporciona un enfoque consistente para que las partes interesadas evalúen la calidad y la preparación de los despliegues de Mojaloop, y respalda evaluaciones independientes de resiliencia, seguridad e integridad funcional. Al establecer un enfoque estructurado para evaluar los despliegues, el marco ayuda a que:

- Los equipos de despliegue identifiquen y atiendan las brechas de forma temprana
- Los participantes evalúen la preparación operativa antes de la incorporación
- Los reguladores o los organismos supervisores interpreten la calidad de la implementación a partir de insumos objetivos
- La comunidad de Mojaloop comparta las mejores prácticas y se alinee en torno a expectativas mínimas.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| Moses Kipchirchir | Denis Mariru <br>Brian Njoroge<br>Bill Hodghead<br>Sam Kummary |

## Última actualización (resumen)
El workstream QA Framework ha comenzado a transformar el marco de calidad existente de seis pilares a un formato legible por máquina. El trabajo inicial se ha centrado en el pilar de Configuración, estableciendo un esquema de datos y desarrollando componentes de parser y composer capaces de evaluar automáticamente los despliegues de Mojaloop frente a criterios de calidad definidos. Una vez validado, el enfoque se extenderá a otros pilares técnicos, mientras que las áreas que requieren juicio humano seguirán dependiendo de una evaluación manual.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julio de 2026| Paul Makin|Se agregó la última actualización|
|1.1|4 de diciembre de 2025| Paul Makin|Se agregó la última actualización|
|1.0|25 de noviembre de 2025| Paul Makin|Versión inicial|