---
i18n_source_sha: b9b1326d203cfee7c4f6e7562e5aeaa64d2e113f
---

# Rendimiento
Naturalmente, el rendimiento del procesamiento de transacciones, medido habitualmente en transacciones por segundo, es una métrica clave para los adoptantes, que necesitan tener la confianza de que Mojaloop puede satisfacer sus requisitos, ya se trate de un despliegue nacional, sectorial o multinacional.

Por esta razón, la Comunidad de Mojaloop ha establecido una línea base de rendimiento y trabaja continuamente para refinar y mejorar la eficiencia del procesamiento de transacciones.

## Línea base de rendimiento

Se ha demostrado que la versión 17.0.0 del Hub de Mojaloop admite las siguientes características de rendimiento en hardware ***mínimo***:

- Compensación de 1,000 transferencias por segundo
- Sostenido durante una hora
- Con no más del 1% (de la etapa de transferencia) tardando más de 1 segundo a través del Hub

Este rendimiento de referencia puede utilizarse como punto de referencia para el dimensionamiento del sistema y la planificación de capacidad.

Naturalmente, puede esperarse un mayor rendimiento utilizando mayores recursos de hardware.

## Expectativas de rendimiento futuras

Continúa el trabajo para reemplazar la tecnología de libro mayor existente de Mojaloop por la base de datos de transacciones financieras [TigerBeetle](https://tigerbeetle.com/). Dado que el rendimiento del libro mayor es un elemento significativo del rendimiento general de Mojaloop, se espera un aumento significativo de ese rendimiento mediante la adopción de TigerBeetle, y se prevé que esto esté completado para el momento del lanzamiento de la versión 19.0 de Mojaloop.


## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|3 de junio de 2025| Paul Makin|Versión inicial; el texto de rendimiento se trasladó desde la documentación de despliegue|