---
syncRef: af8ece4296e987223de16f4e0311366cb5e8d623
---

# Revisión técnica del diseño y revisión del código

El software de Mojaloop está pensado para formar la columna vertebral de esquemas de pagos instantáneos inclusivos a escala nacional. Estos esquemas de pagos
son piezas importantes de la infraestructura financiera nacional que facilitan las actividades diarias, críticas para la vida, de un
gran número de personas, como comprar comida y agua potable. Los adoptantes y usuarios del software de Mojaloop exigen
y merecen un nivel extremadamente alto de calidad, seguridad, fiabilidad y resiliencia en nuestros productos.

Para mantener estas cualidades y mitigar los muchos riesgos de negocio y técnicos a los que se enfrentan nuestros adoptantes y sus
partes interesadas, la Mojaloop Foundation implementa un proceso estructurado de ingeniería de producto basado en las mejores
prácticas demostradas del sector para software financiero regulado, que incluye un control de cambios técnico y guiado por procesos
y su trazabilidad, revisiones técnicas del diseño y del código, umbrales altos de pruebas y varios niveles de
puertas de aseguramiento de la calidad.

Nuestros procesos están pensados para ayudar a nuestros contribuyentes a identificar y mitigar riesgos mientras mejoran nuestros productos, en
beneficio de toda la comunidad de Mojaloop.

Lea con atención la siguiente información para asegurarse de que entiende nuestras definiciones y cómo se aplican estos procesos
al trabajo que quiere realizar **antes de empezar**.

**Tenga en cuenta que, si no sigue estos procesos, es posible que se le pida rehacer su contribución, o que esta se
rechace directamente si no cumple nuestros estándares. Esto puede provocar retrasos importantes para incorporar su trabajo a una
versión oficial de Mojaloop. Lea nuestras declaraciones sobre
el [proceso de donación externa](product-engineering-process.md#flujos-de-trabajo-no-oficiales-y-contribuciones-externas).**

## ¿Qué es la revisión técnica del diseño?

La "revisión técnica del diseño" es un proceso por el cual uno o más ingenieros expertos sénior en el dominio, que son miembros de la
Mojaloop Design Authority y conocen las áreas del sistema afectadas, hablan de los cambios propuestos con los contribuyentes
y los representantes de producto **antes de que empiece el trabajo de implementación**, con los siguientes fines:

- Gestión de riesgos
    - Ayudar a identificar y mitigar riesgos técnicos o de negocio para cualquiera de nuestras partes interesadas, usuarios u otros
      contribuyentes.
- Evaluación del impacto
    - Ayudar a identificar otras áreas del sistema, equipos y partes interesadas a los que pueda afectar el cambio, y
      facilitar la comunicación con ellos.
- Estándares y cohesión
    - Orientar sobre los estándares establecidos de Mojaloop en cuanto a herramientas, elección de componentes de terceros y patrones de diseño, con
      vistas a mantener la cohesión en todo el código base de Mojaloop.

Para los cambios no triviales, este proceso implica trabajar en colaboración con la Mojaloop Design Authority para producir un
documento de diseño que recoja los distintos elementos del cambio propuesto con suficiente nivel de detalle. Una vez implementado el
cambio, ese documento pasa a formar parte de la documentación de nuestra comunidad y ayuda a que otras personas entiendan el
razonamiento que hubo detrás de las decisiones de diseño tomadas históricamente a medida que evoluciona nuestro software.

## ¿Qué es la revisión del código?

La "revisión del código" es un proceso por el cual uno o más ingenieros de software revisan un conjunto de cambios de código propuestos
**antes de hacer merge en la rama principal de un repositorio**, con los siguientes fines:

- Aseguramiento de la calidad
    - Las revisiones de código ayudan a garantizar la calidad del código base al permitir que otros miembros del equipo identifiquen posibles problemas,
      errores o áreas de mejora antes de hacer merge del código en la rama principal. Esto puede dar lugar a software de mayor
      calidad y con menos defectos.
- Intercambio de conocimiento
    - Las revisiones de código brindan la oportunidad de que los miembros del equipo aprendan unos de otros. Al revisar el código escrito por sus
      pares, los contribuyentes pueden hacerse una idea de otros enfoques, mejores prácticas y patrones de codificación. Esto ayuda a
      difundir el conocimiento y la experiencia por la comunidad.
- Coherencia
    - Las revisiones de código ayudan a mantener la coherencia del estilo de codificación, los estándares y las convenciones dentro del proyecto Mojaloop. Al
      hacer que varios miembros de la comunidad revisen el código de los demás, esperamos garantizar que el código base siga los
      estándares establecidos y se mantenga cohesionado.
- Mitigación de riesgos
    - Las revisiones de código pueden ayudar a mitigar los riesgos asociados a los cambios en el código base. Al hacer que varios pares de ojos
      examinen el código, es posible identificar pronto los posibles riesgos, vulnerabilidades de seguridad y cuellos de botella de rendimiento
      y abordarlos antes de que causen problemas en los despliegues de producción.
- Retroalimentación y mejora
    - Las revisiones de código brindan la oportunidad de dar comentarios constructivos y de colaborar. Los contribuyentes pueden ofrecer
      sugerencias de mejora, compartir soluciones alternativas y debatir decisiones de diseño. Esto fomenta una cultura de
      mejora continua dentro de la comunidad.
- Propiedad del código
    - Las revisiones de código fomentan un sentido de propiedad colectiva del código base. Cuando hay varios miembros de la comunidad
      implicados en revisar el código y contribuir a él, pasa a ser una responsabilidad compartida en lugar de la responsabilidad
      exclusiva de contribuyentes individuales.

## Tipos de cambio

Como contribuyente de Mojaloop, el proceso que debe seguir depende de la naturaleza del cambio que esté haciendo y de su
posible impacto en las distintas categorías de usuarios y en el sistema en su conjunto.

Use las definiciones de abajo para identificar la categoría del cambio que está haciendo y seleccione el proceso apropiado a
seguir. Es su responsabilidad como contribuyente aplicar el proceso apropiado y se le exigirá firmar un
acuerdo de contribuyentes en el que declare que cumplirá estos requisitos.

Si tiene cualquier duda sobre cuál de las siguientes categorías se aplica a su cambio, consulte a la Mojaloop
Design Authority por slack aquí: [#design-authority](https://mojaloop.slack.com/archives/CARJFMH3Q). Tenga en cuenta que
es importante participar en cualquier proceso de revisión de diseño que sea necesario antes de seguir adelante con cambios de código, para no malgastar
sus propios esfuerzos si la Design Authority pide rehacer el trabajo.

### Cambios sin consecuencias

#### Definición y características

Un cambio de código sin consecuencias es una modificación pequeña y muy aislada que se hace sobre una pieza de código existente. Estos
cambios no afectan a la estructura interna o externa ni a la funcionalidad del ámbito local, es decir, a sus entradas o
salidas, y normalmente se hacen por motivos como mejorar la legibilidad, corregir problemas de estilo de codificación u optimizaciones menores
de rendimiento. Los cambios de código sin consecuencias son sencillos y de bajo riesgo.

Un cambio de código sin consecuencias no altera de ninguna manera las interfaces externas, la funcionalidad ni el comportamiento observable desde fuera
de uno o varios componentes.

Un cambio de código sin consecuencias no altera de ninguna manera la estructura interna de uno o más componentes.

_Nota importante: si su cambio es una optimización e implica alterar la implementación de algún algoritmo, valore
con cuidado si merece una revisión de diseño o una revisión de código más estricta de lo normal. Es mucho mejor ser cauto y
buscar más ojos sobre su cambio que introducir una regresión sin darse cuenta._

#### Ejemplos

Algunos ejemplos:

- Renombrar variables
- Ajustar la indentación
- Agregar comentarios
- Eliminar imports sin usar
- Optimizar algoritmos pequeños

#### Proceso obligatorio de revisión de diseño y de código

1. No se requiere revisión de diseño, pero puede realizarse igualmente si tiene dudas sobre las consecuencias
   de sus cambios.
2. Al menos una revisión de aprobación de un "code owner" de todos los archivos fuente que se modifiquen.
    1. Tenga en cuenta que, si no hay code owners definidos para alguno de los archivos fuente que se modifican, debe abrir un problema con
       {contact details} para que se le definan code owners antes de continuar. Todos los archivos de código de la organización de Mojaloop en GitHub
       deberían tener code owners definidos.
3. Revisiones de código adicionales por parte de pares, según se desee. Cuantos más ojos haya sobre su cambio propuesto, mejor.

### Cambios con consecuencias

#### Definición y características

Los cambios con consecuencias son modificaciones que tienen impacto en el comportamiento, la funcionalidad, las características operativas
o el rendimiento de un subsistema o del sistema en su conjunto. Estos cambios normalmente implican alterar la lógica de un
componente o servicio, implementar funcionalidades nuevas, corregir errores, cambiar o actualizar dependencias o refactorizar grandes
secciones de código. Los cambios con consecuencias exigen bastante reflexión previa y coordinación con otros
equipos y partes interesadas por su posible impacto en todo el sistema sobre la estabilidad y la funcionalidad del software. Normalmente
conllevan un riesgo mayor y exigen una consideración y una planificación cuidadosas antes de la implementación.

_Nota importante: si cree que su cambio entra en la categoría de "cambios con consecuencias", también debe asegurarse de que no
entra en la categoría de ["cambios críticos"](#cambios-criticos). Revise la definición
de ["cambios críticos"](#cambios-criticos) antes de continuar._

#### Ejemplos

Algunos ejemplos:

- Cambiar la implementación de un método existente de una API interna
- Agregar la implementación de un método nuevo de una API interna
- Cambiar la definición o el comportamiento de una interfaz interna
- Cambiar una dependencia de servicio de respaldo, como sustituir un tipo de DBMS existente por otro
- Cambiar una dependencia de código, como reemplazar un paquete analizador de YAML por otro
- Refactorizaciones en varios archivos de código
- Cambios en las configuraciones de despliegue, p. ej. en la infraestructura como código.

#### Proceso obligatorio de revisión de diseño y de código

Los cambios con consecuencias deben seguir el [proceso de cambios con consecuencias](consequential-change-process.md) definido.

### Cambios críticos

#### Definición y características

_**En Mojaloop, los "cambios críticos" tienen en gran medida la misma definición que los cambios con consecuencias, pero se aplican específicamente a
áreas del sistema consideradas críticas para nuestra funcionalidad principal y nuestros casos de uso principales.**_

Los cambios críticos son modificaciones que tienen impacto en el comportamiento, la funcionalidad, las características operativas o
el rendimiento de cualquier subsistema, sistema u otros artefactos críticos. Estos cambios normalmente implican alterar la lógica de
un componente o servicio crítico, p. ej. para implementar funcionalidades nuevas, corregir errores, cambiar o actualizar dependencias o
refactorizar código. Los cambios críticos exigen bastante reflexión previa y coordinación con otros equipos
y partes interesadas por su posible impacto en todo el sistema sobre la estabilidad y la funcionalidad de aspectos críticos del
software. Normalmente conllevan un riesgo muy alto y exigen una consideración y una planificación cuidadosas antes de la implementación.

Un cambio debería considerarse crítico si entra en uno o más de los siguientes repositorios de código, áreas
o subsistemas:

- API externas:
    - Cualquier alteración de una especificación de API externa, en las rutas normales o de error, incluidas la validación de solicitudes y las correcciones
      de errores.
    - Cualquier alteración de una implementación de gestión de solicitudes de una API externa, en las rutas normales o de error, incluidas la validación
      de solicitudes y las correcciones de errores.
        - Tenga en cuenta que "API externa" significa en este caso cualquier API expuesta fuera del límite del switch, p. ej. la API FSPIOP, etc...
- API administrativas:
    - Cualquier cambio en cualquier especificación de API administrativa.
    - Cualquier cambio en cualquier implementación de gestión de solicitudes de una API administrativa, en las rutas normales o de error, incluidas la validación
      de solicitudes y las correcciones de errores.
- Fase de descubrimiento del flujo de transferencia:
    - Cualquier cambio en la gestión de solicitudes de la API en la fase de descubrimiento, p. ej.:
        - Cualquier cambio en las implementaciones de gestión de solicitudes de la API de búsqueda de cuenta o en los flujos de llamadas hacia y desde "oracles" internos o
          externos.
- Fase de acuerdo del flujo de transferencia:
    - Cualquier cambio en la gestión de solicitudes de la API en la fase de acuerdo, p. ej.:
        - Cualquier cambio en el almacenamiento, la recuperación, el procesamiento o la visualización de datos o metadatos de la fase de acuerdo.
        - Cualquier cambio en las implementaciones de gestión de solicitudes de la API de la fase de acuerdo o en los flujos de llamadas hacia y desde entidades internas o
          externas.
- Fase de transferencia (compensación) del flujo de transferencia:
    - Cualquier cambio en la gestión de solicitudes de la API en la fase de compensación de la transferencia, p. ej.:
        - Cualquier cambio relacionado con el proceso de decidir si compensar una transferencia o rechazarla en función de la
          liquidez disponible de un participante (comprobación de liquidez).
        - Cualquier cambio en el cálculo, el almacenamiento, la recuperación, el procesamiento o la visualización de los valores del límite de débito neto de un participante.
        - Cualquier cambio en el cálculo, el almacenamiento, la recuperación, el procesamiento o la visualización de la liquidez disponible de un
          participante.
        - Cualquier cambio en el cálculo, el almacenamiento, la recuperación, el procesamiento o la visualización de cualquier valor monetario.
        - Cualquier cambio en el cálculo, el almacenamiento, la recuperación, el procesamiento o la visualización de datos o metadatos de la transferencia.
        - Cualquier cambio dentro del pipeline de procesamiento de solicitudes de transfer prepare.
        - Cualquier cambio dentro del pipeline de procesamiento de solicitudes de transfer fulfil.
- Liquidación:
    - Cualquier alteración de una especificación de API de liquidación externa o interna, en las rutas normales o de error, incluidas la validación de solicitudes
      y las correcciones de errores.
    - Cualquier alteración de una implementación de gestión de solicitudes de una API de liquidación externa o interna, en las rutas normales o de error,
      incluidas la validación de solicitudes y las correcciones de errores.
    - Cualquier cambio relacionado con la inclusión o exclusión de transferencias en los lotes de liquidación.
    - Cualquier cambio relacionado con el cálculo, el almacenamiento, la recuperación, el procesamiento o la visualización de datos o
      metadatos relacionados con la liquidación.

#### Ejemplos

Algunos ejemplos:

- Corregir un error en un método de validación de la API FSPIOP
- Agregar una funcionalidad nueva a una API administrativa
- Cambiar el formato de los valores de moneda que se muestran a los usuarios en un portal web
- Actualizar la versión de una dependencia de código externa, p. ej. el paquete npm de un servicio relacionado con el ledger
- Optimizar las llamadas a los servicios de almacenamiento de respaldo durante el procesamiento de una solicitud de API externa

#### Proceso obligatorio de revisión de diseño y de código

Los cambios críticos deben seguir el [proceso de cambios críticos](critical-change-process.md) definido.
