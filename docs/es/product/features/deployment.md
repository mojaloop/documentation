---
i18n_source_sha: 169876c92ac99c9cdeb69ade05b486c281eece68
---

# Despliegue de Mojaloop
Existe una variedad de razones distintas para desplegar Mojaloop, que van desde el deseo de aprender más sobre Mojaloop o la voluntad de evaluar su idoneidad para algún propósito, pasando por desarrolladores que desean desarrollar o probar nuevas funcionalidades, o quizá un adoptante que desea evaluar su funcionalidad y conectividad, hasta un despliegue de grado productivo de un sistema de pagos nacional.

## Guía de despliegue

Para cada escenario, la comunidad Mojaloop ha desarrollado las herramientas de despliegue apropiadas. La siguiente [guía de despliegue](./deployment/deploying.md) incluye una matriz que cruza los tipos de usuario con el propósito del despliegue, con notas sobre la huella o las expectativas de hardware y los SLA asociados. Para cada caso se recomienda una herramienta de despliegue, y una tabla aparte ofrece una breve introducción a cada herramienta.

## Herramientas de despliegue

Una vez establecido qué herramienta de despliegue es apropiada para los requisitos del lector, la [guía de herramientas de despliegue](./deployment/tools.md) proporciona más detalles de cada una de las herramientas, incluidas las características de rendimiento y seguridad que cada una admite.

## Preparación para producción

La comunidad ha desarrollado una matriz de autoevaluación que los adoptantes pueden utilizar para evaluar la preparación de su despliegue de Mojaloop y de su organización para pasar a producción. Tenga en cuenta que este documento no pretende servir de base para ninguna evaluación formal de la preparación para producción de ningún despliegue de Mojaloop ni de ningún esquema de pagos. Está pensado únicamente como un conjunto de comprobaciones básicas para asegurar que se hayan considerado algunos aspectos importantes de un sistema en producción. Una evaluación completa de la idoneidad de un despliegue de Mojaloop sigue siendo responsabilidad exclusiva del operador del esquema de pagos.

Puede [consultar la matriz aquí](./Production_Readiness_Technical_Assessment.md), y el formulario se puede [descargar aquí](https://github.com/mojaloop/product-council/tree/main/Documentation/Deployment%20Readiness) cuando esté listo para comenzar una evaluación.

## Historial del documento
  |Versión|Fecha|Autor|Detalle|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|18 de diciembre de 2025| Paul Makin, Julie Guetta|Se agregó un enlace al documento de preparación para producción|
|1.0|3 de junio de 2025| Paul Makin|Versión inicial|
