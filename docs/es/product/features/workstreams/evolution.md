---
i18n_source_sha: 01ae615200d52cf62961a082533f303fe110bdb7
---

# Workstream Mojaloop Evolution
Este workstream tiene como objetivo llevar a cabo una evolución significativa en los servicios centrales más críticos de Mojaloop:
- Reemplazar la funcionalidad de libro mayor contable que está en el corazón de Mojaloop por TigerBeetle.
- Reemplazar el corazón del motor de liquidación por funcionalidad de TigerBeetle, actualizándolo con las capacidades de Settlement V3.

# Justificación de negocio
Este workstream tiene importancia estratégica; TigerBeetle es la tecnología de libro mayor de próxima generación desarrollada específicamente pensando en Mojaloop, y ofrece el potencial de una mejora del rendimiento en el procesamiento de transacciones de al menos un orden de magnitud.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| Michael Richards | James Bush<br>Lewis Daley<br>Sam Kummary<br>Paul Makin |

## Última actualización (resumen)
### Forensic Audit
Este aspecto se ha trasladado a [su propio workstream](./audit.html).
### Nuevo modelo contable
El nuevo modelo contable está acordado en términos generales y representa un cambio importante hacia la alineación con los estándares contables internacionales. Esto responde a las inquietudes planteadas por instituciones globales y refuerza la credibilidad de Mojaloop como plataforma de infraestructura financiera. El objetivo inicial es TigerBeetle, aunque el equipo aún no ha decidido si también se producirá una versión del nuevo modelo para MySQL.
### Integración de TigerBeetle
El workstream Mojaloop Evolution sigue avanzando en la integración de TigerBeetle: el desarrollo se acerca a la finalización del código y el esfuerzo actual se centra en las pruebas de integración. La implementación admite la operación tanto con libros mayores MySQL como TigerBeetle, lo que permite una ruta de migración gradual sin perder compatibilidad con los despliegues existentes. El trabajo principal que queda es la validación del conjunto de pruebas de integración antes de que esté disponible una versión experimental para la comunidad.
### Settlement v3
Settlement v3 introduce lotes de liquidación deterministas, lo que resuelve dificultades de conciliación de larga data y habilita la escalabilidad entre múltiples esquemas de pagos. TigerBeetle almacenará las claves de los lotes de liquidación, mientras que los componentes SQL y las API de administración requerirán mejoras sustanciales para admitir la configuración del modelo, el seguimiento de lotes y las operaciones de liquidación.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.1.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julio de 2026| Paul Makin|Se agregó la última actualización|
|1.1|4 de diciembre de 2025| Paul Makin|Se agregó la última actualización|
|1.0|25 de noviembre de 2025| Paul Makin|Versión inicial|