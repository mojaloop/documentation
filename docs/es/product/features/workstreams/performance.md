---
i18n_source_sha: c0c57e0819c2f1ced7a62df01c1f372935884bce
---

# Workstream Performance Optimisation
Demostrar el rendimiento de Mojaloop en diversas configuraciones de despliegue, y elaborar y publicar un documento técnico. Usar una configuración de referencia en instalaciones propias para medir los cambios de rendimiento entre versiones de Mojaloop.

# Justificación de negocio
Un documento técnico que demuestre cómo Mojaloop supera los requisitos de rendimiento de los adoptantes sería una herramienta valiosa para la comunidad de Mojaloop.

## Contribuyentes
|Responsable del workstream|Contribuyentes|
|:--------------:|:--------------:|
| James Bush | Shashi Hirugade<br>Sam Kummary<br>Nathan Delma<br>Ablipay (Jerome, team)|

## Última actualización (resumen)
El workstream Performance se ha concentrado en mejorar la reproducibilidad de los resultados de benchmark publicados en los distintos entornos de los adoptantes. La investigación identificó las diferencias de configuración de despliegue, en particular en torno a la configuración del gateway de Kubernetes, como la causa principal de las discrepancias de rendimiento reportadas por los integradores de sistemas. Las pruebas de rendimiento se pausaron temporalmente mientras se completaba la remediación de seguridad en toda la plataforma; después de eso, las pruebas se reanudarán con el objetivo de publicar un informe de rendimiento actualizado. Los resultados iniciales siguen siendo cercanos al rendimiento demostrado anteriormente de aproximadamente 2,000 transacciones por segundo.

## Aplicabilidad

Esta versión de este documento corresponde a Mojaloop [versión 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julio de 2026| Paul Makin|Se agregó la última actualización|
|1.1|4 de diciembre de 2025| Paul Makin|Se agregó la última actualización|
|1.0|25 de noviembre de 2025| Paul Makin|Versión inicial|