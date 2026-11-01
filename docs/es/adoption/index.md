---
i18n_source_sha: 4f41f162ea3aad6dfde122cb78655af0e6bf0074
---

# Acerca de los documentos de adopción de Mojaloop

Para que un operador de hub o un banco central use Mojaloop en su sistema de pagos instantáneos inclusivo (IIPS), el proceso de adopción y los pasos de la toma de decisiones suelen ser muy distintos de los de contratar a una empresa para que proporcione un software propietario.   Usar Mojaloop para construir y ser dueño de una plataforma da mayor control, pero también mayor responsabilidad.   No depender de un único proveedor significa exactamente eso.  

La documentación y las herramientas de esta sección están pensadas para ayudar con la justificación de elegir Mojaloop y con un proceso recomendado de implementación.  

Construir un sistema de pagos es mucho más que la plataforma tecnológica.  En realidad, los factores de éxito son el esquema de pagos y las operaciones.   Desarrollamos Mojaloop para reducir al mínimo la carga operativa y bajar el costo de implementar reglas de esquema de pagos inclusivas como la irrevocabilidad y la certeza. 

El proceso de construir un sistema de pagos puede ser tan importante como algunas de las decisiones de esquema de pagos que salen de él.  Cada dueño y operador de esquema de pagos puede desarrollar su propio proceso, pero recomendamos uno que sea inclusivo, transparente e iterativo para maximizar la apropiación, la confianza y la sostenibilidad a largo plazo. 



Herramientas disponibles para los adoptantes:

* [**Decisiones del esquema de pagos**](#decisiones-del-esquema-de-pagos): documentos que ayudan a definir las reglas del esquema de pagos, las directrices de operación y las decisiones clave de negocio y de diseño
* [**Operaciones del Hub**](#operaciones-del-hub): guías con información práctica sobre los distintos aspectos de operar un Hub de Mojaloop

## Decisiones del esquema de pagos

La [Plantilla de directriz de operación de la plataforma](./Scheme/platform-operating-guideline.md) ofrece una plantilla para describir cómo operará la Plataforma del Esquema de pagos y para especificar las obligaciones y responsabilidades del Esquema de pagos, del Operador de la Plataforma y de los DFSP.

La [Plantilla de reglas de negocio del esquema de pagos](./Scheme/scheme-business-rules.md) ofrece una plantilla para definir las Reglas de Negocio que rigen los derechos y las responsabilidades de los participantes de un esquema de pagos de Mojaloop.

El documento [Decisiones clave del esquema de pagos](./Scheme/scheme-key-choices.md) describe y analiza algunas de las decisiones de negocio y de diseño más significativas que afectan tanto a la implementación técnica de Mojaloop como a las Reglas de Negocio que escribirá el Esquema de pagos y que los DFSP Participantes aceptarán cumplir.

La [Plantilla de acuerdo de participación en el esquema de pagos](./Scheme/scheme-participation-agreement.md) ofrece una plantilla del Acuerdo de Participación en el Esquema de pagos que contiene las disposiciones mínimas necesarias para dejar constancia de la solicitud de un DFSP de unirse al Esquema de pagos y de cumplir sus Reglas de Negocio.

La [Plantilla de glosario uniforme](./Scheme/scheme-uniform-glossary.md) funciona como glosario de términos de negocio. 

## Operaciones del Hub

Estos documentos pueden servir de referencia para que los adoptantes construyan sobre ellos, personalicen los portales de operaciones del hub y luego desarrollen los suyos propios según sea necesario.

La [Guía de operaciones técnicas](./huboperations/techops/tech-ops-introduction.md) describe los procesos operativos que permiten al Operador del Hub encargarse de todos los aspectos de la gestión de un servicio en producción, como la gestión de incidentes, la gestión de problemas, la gestión de cambios, la gestión de versiones y el triaje de defectos.

La [Guía de gestión de la liquidación](./huboperations/settlement/settlement-management-introduction.md) describe cómo el Hub de Mojaloop y el banco o los bancos liquidadores asociados gestionan las liquidaciones, y presenta los principales componentes del procesamiento de la liquidación.

La [Guía del Finance Portal v2](./huboperations/portalv2/busops-portal-introduction.md) está dirigida al Operador de un Hub de Mojaloop y ofrece información sobre el Finance Portal, que facilita la gestión diaria de los procesos relacionados con la liquidación.

El documento [Control de acceso basado en roles](./huboperations/rbac/Role-based-access-control.md) analiza el mecanismo de seguridad empleado para controlar el acceso a los distintos aspectos de una instancia operativa de un Hub de Mojaloop. 

La [Guía de incorporación para el Operador del Hub](./huboperations/onboarding/onboarding-introduction.md) está dirigida al Operador de un Hub de Mojaloop y ofrece información sobre el proceso de incorporación de los DFSP. Ofrece una descripción general de alto nivel del recorrido de incorporación que siguen los DFSP, y funciona como lista de verificación de las actividades de incorporación.
