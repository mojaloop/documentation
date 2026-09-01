---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# La hoja de ruta de Mojaloop

La hoja de ruta de Mojaloop es elaborada y mantenida por la Mojaloop Foundation, en colaboración con la comunidad en general. Se revisa y se actualiza en cada reunión de la comunidad, y se actualizó por última vez en la reunión de la comunidad del PI 23 en Lusaka, Zambia.

La hoja de ruta se construye en torno al concepto de tres pilares.<P> <img src="https://raw.githubusercontent.com/mojaloop/product-council/a0cf73a8fb4921a3bf03aab42416a0ae6c8aa94e/Mojaloop%20Pillars.png" align="right" width="350"></a>

Los pilares son:

1. **Facilitar la adopción** – crear herramientas que permitan a los desarrolladores y a los adoptantes desplegar Mojaloop con el mínimo de complicaciones y dificultades, en un entorno que satisfaga sus necesidades técnicas, operativas o regulatorias.
2. **Lograr escala** – poner a disposición tantas funciones de “valor agregado” como sea posible, con el fin de apoyar a los adoptantes en la consecución de sus objetivos, ya sean de rentabilidad financiera o de apoyo a fines sociales; o incluso ambos.
3. **Conectar con otros sistemas** – reconocemos que Mojaloop no es la única solución de interoperabilidad de pagos, por lo que bajo este pilar buscamos desarrollar tantas opciones como sea posible tanto para interconectarse con otros servicios de pago y switches, como para asegurar que el motor subyacente de Mojaloop esté optimizado para admitir esas interconexiones.

Los pilares se apoyan a su vez en un conjunto fundacional de líneas de trabajo de **Producto de calidad**, que en conjunto respaldan el mantenimiento y la mejora continuos de la solución central de Mojaloop.

Esta es la hoja de ruta completa del PI-23: ![Hoja de ruta de Mojaloop](https://github.com/mojaloop/product-council/blob/main/PI%2023%20Mojaloop%20Roadmap.png?raw=true).

Esta revisión de la hoja de ruta abarca desde el lanzamiento de Mojaloop 15.1 al final del PI 21 (junio de 2023) hasta el final del PI 26 (febrero de 2025). Las versiones de Mojaloop pasaron de la numeración a los nombres durante el PI 22, por lo que tenemos Mojaloop Acacia a punto de ser lanzada; a esta le seguirá Mojaloop Zambezi, al final del PI 23, que se apoya en Acacia e incorpora los resultados de líneas de trabajo que incluyen Pagos a Comercios y Divisas (transferencias internacionales).

Actualmente prevemos lanzar Mojaloop Baobab, basada en el esfuerzo de desarrollo vNext y en la arquitectura de referencia, al final del PI 24, a finales de junio de 2024 (aunque esto sigue sujeto a alcanzar el nivel necesario de calidad y funcionalidad, que se logrará mediante un proceso de transición que tiene su propia hoja de ruta). A su vez, esta será reemplazada por Mojaloop Meerkat a finales de octubre de 2024, que se apoya en Baobab agregando los resultados de líneas de trabajo que aún no están definidas. Las versiones posteriores seguirán el mismo proceso.

A la derecha de la hoja de ruta hay cuatro tablas. Estas enumeran líneas de trabajo candidatas para cada pilar y para la base de producto de calidad. Se han establecido como funcionalidades deseables en distintos eventos de la comunidad, pero aún no han sido adoptadas por la comunidad.

Todos los pilares tienen sus propias líneas de trabajo. Para el PI 23, se han adoptado las siguientes líneas de trabajo técnicas.

## Facilitar la adopción
* Soporte para despliegue en las instalaciones
    * Mejorar el soporte para el despliegue de Mojaloop fuera de la nube, cuando ello sea necesario por motivos regulatorios u otros
* Herramientas de participación
    * Asegurar que exista una variedad de opciones para que los DFSP participantes se conecten a un Hub de Mojaloop, y que esas opciones ofrezcan capacidades de conectividad comparables

## Lograr escala
* Pagos a Comercios
    * Soporte para pagos a comercios utilizando un Hub de Mojaloop como elemento de pagos de un esquema de pagos para comercios que ofrece pagos mediante códigos QR o USSD. Esto incluye el registro de comercios y el soporte para la afiliación de comercios.

## Conectar con otros sistemas
* Liquidación de nueva generación
    * Conectarse a otros sistemas de pago y realizar transacciones transfronterizas aumenta la complejidad de los procesos de liquidación que necesita un switch, y esta línea de trabajo está actualizando el motor de liquidación de Mojaloop para aportar la flexibilidad necesaria.
* Divisas
    * Esta línea de trabajo está mejorando el Hub de Mojaloop para admitir transacciones multidivisa, mediante la integración con un proveedor externo de FX (FXP). La versión inicial admitirá un modelo (conversión por parte del remitente) y un FXP; las versiones futuras admitirán múltiples modelos, múltiples FXP y el uso de una moneda de reserva como intermediaria.
* Integración con MOSIP
    * Con el fin de dar mejor soporte a los pagos sociales y a los programas nacionales de pagos, esta línea de trabajo está desarrollando una solución que permitirá enrutar los pagos hacia una identidad digital MOSIP, en lugar de, por ejemplo, un número de teléfono móvil. Esta línea de trabajo también avanza hacia una mayor integración con otros proyectos DPG de código abierto, incluidos Mifos, PHEE y OpenG2P, en apoyo del uso de identificadores MOSIP para generar listas de pagos destinadas a la entrega masiva de pagos sociales.
## Producto de calidad
* Caracterización del rendimiento
    * Identificar e implementar cambios en el software central del Hub de Mojaloop que puedan mejorar el rendimiento, a medida que avanzamos hacia una serie de despliegues nacionales.
* Adoptar Tigerbeetle
    * Utilizar Tigerbeetle para las actualizaciones del libro mayor durante el procesamiento de transacciones con el fin de lograr un rendimiento aún mayor (no esperamos que esto esté implementado antes del lanzamiento de Mojaloop Baobab)
* Equipo central
    * Mantiene el núcleo de Mojaloop mediante correcciones de errores críticos, mejoras funcionales priorizadas y actualizaciones de dependencias, y se encarga del proceso de lanzamiento de los servicios centrales y de algunos servicios o productos adyacentes que forman parte de la plataforma Mojaloop.
* Calidad y seguridad de la plataforma
    * Evaluación, mantenimiento y mejora de la ciberseguridad de la plataforma Mojaloop, abarcando la conectividad con los DFSP participantes (incluidas las transacciones) y la seguridad de los portales del operador del hub.

Además de estas líneas de trabajo técnicas, contamos con una serie de **líneas de trabajo estratégicas**, destinadas a abordar cuestiones estratégicas de largo plazo, como la migración hacia el soporte de ISO 20022 o el seguimiento de la evolución de las transacciones transfronterizas. Se espera que los resultados de las líneas de trabajo estratégicas incluyan la especificación periódica de líneas de trabajo técnicas candidatas, para su posible adopción en futuros PI.
