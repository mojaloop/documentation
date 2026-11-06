---
i18n_source_sha: 9971c0d3a643dd23223f32a73aa2a09d3348981a
---


<h1>Mojaloop Vulnerability Management Process</h1>

Índice:
1. [Introducción](#1-introduction)
2. [Committee](#2-security-committee)
3. [Gestión de una posible vulnerabilidadvulnerability](#3-handling-a-possible-vulnerability)
4. [Mojaloop
Procesos de gestión de vulnerabilidades implantados](#4-mojaloop-vulnerability-management-processes-in-place)
5. [Scope](#5-scope)

<h3>1. Introduction</h3>

El presente documento describe el proceso de gestión de vulnerabilidades Mojaloop y ofrece directrices a la comunidad Mojaloop para identificar, notificar, evaluar y realizar el direccionamiento de las vulnerabilidades de seguridad presentes en el software Mojaloop. Al cumplir con normas de seguridad reconocidas, como la ISO 27001, Mojaloop garantiza un enfoque coherente para mantener la seguridad y la resiliencia.

Este proceso se basa en los procedimientos establecidos por «Mojaloop», lo que garantiza un alcance y unas directrices bien definidos en los que pueden confiar los adoptantes del software. Hace hincapié en la gestión responsable de las vulnerabilidades hasta que se disponga de soluciones verificadas y estas se hayan comunicado adecuadamente.

Un proceso de gestión de vulnerabilidades estructurado, transparente y eficaz es esencial para mantener la confianza y proteger el ecosistema de Mojaloop.

<h3>2. Security Committee</h3>

Mojaloop

1. Revisión y validación de informes de vulnerabilidades.
2. Decidir sobre la aceptación o el rechazo de las vulnerabilidades notificadas.
3. Definir las soluciones adecuadas y planificar los comunicados.
4. Coordinar las versiones que incluyen parches de seguridad.

El Comité de Seguridad está compuesto por contribuyentes principales y líderes de la comunidad que garantizan una gestión eficiente y segura de las vulnerabilidades dentro de Mojaloop. Su estructura y sus responsabilidades están diseñadas para mantener la seguridad y la integridad del ecosistema Mojaloop.

<h3>3. Handling a Possible Vulnerability</h3>

Política de divulgación de vulnerabilidades (CVD) Mojaloop: [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

En el enlace anterior se describe el proceso predeterminado para gestionar una posible vulnerabilidad de seguridad en Mojaloop. Los proyectos que requieran un proceso diferente deberán documentarlo de forma clara y pública.

El proceso relativo a las dependencias generales de terceros y otros módulos de Código abierto se describe en la guía [gestión de vulnerabilidades en las dependencias](dependency-vulnerability-management.md).

<h4>Security for Mojaloop Community Members</h4>

Mojaloop Los miembros de la comunidad y las organizaciones afiliadas desempeñan un rol fundamental en el proceso de gestión de vulnerabilidades, especialmente a la hora de gestionar las posibles vulnerabilidades de acuerdo con los procedimientos establecidos. Las siguientes orientaciones describen los pasos que se deben seguir:

* Evite introducir detalles sobre vulnerabilidades de seguridad en sistemas públicos de seguimiento de errores, a menos que el acceso esté estrictamente restringido.
* Las comunicaciones en materia de seguridad deben limitarse a los canales privados destinados a tal fin. Estos canales no son sistemas de notificación dirigidos al público en general.

<h4>Work in Private</h4>

La información sobre una vulnerabilidad no debe hacerse pública hasta que se publique un comunicado oficial al final del proceso. Esto significa que:

* **No cree tickets públicos en el sistema de seguimiento de incidencias (por ejemplo, GitHub/Zenhub) para realizar el seguimiento de la incidencia**, ya que esto la haría pública.
* **Los mensajes relacionados con las incorporaciones de código no deben hacer referencia al carácter de seguridad de la confirmación.**
* **Los debates sobre la vulnerabilidad, las posibles soluciones y los comunicados deben tener lugar en canales privados**, como una lista de correo dedicada a la seguridad del proyecto o un canal privado para los responsables del mantenimiento.
* Colabore con el equipo de seguridad de Mojaloop (security@mojaloop.io) para seguir el proceso CVD: https://docs.mojaloop.io/community/contributing/cvd.html

<h4>Report</h4>

La persona que detecte el problema (el informante) deberá notificar la vulnerabilidad rellenando el formulario de informe y enviándolo por correo electrónico a: **[security@mojaloop.io](mailto:security@mojaloop.io)**. Las plantillas de informe pueden seguir el modelo de informe de errores que se encuentra aquí: https://github.com/mojaloop/project/issues.

Lista de incidencias que se consideran relevantes:
1. Incidencias de seguridad / vulnerabilidades en Mojaloop servicios básicos (código fuente de la aplicación)
2. Problemas de seguridad o vulnerabilidades en Mojaloop de los servicios de apoyo
3. Problemas generalizados o de «día cero» en las últimas versiones de las dependencias críticas que utilizan los servicios básicos y de apoyo de Mojaloop (como Node.js, Kafka o MySQL)

Lista de incidencias que no se consideran críticas o que tienen baja prioridad y cuyas respuestas pueden retrasarse:

1. Vulnerabilidades relacionadas con el sitio web [mojaloop.io](mojaloop.io)
2. Vulnerabilidades relacionadas con el sitio web docs.mojaloop.io](docs.mojaloop.io)

<h4>Acknowledge</h4>

El equipo de seguridad de «Mojaloop» debería enviar un correo electrónico a la persona que presentó la denuncia para acusar recibo de la misma. Lo ideal sería que este acuse de recibo incluyera una copia a la lista de correo de seguridad privada correspondiente.

<h4>Investigate and Respond</h4>

El equipo examina el informe y, a continuación, lo rechaza o lo acepta.

1. La información podrá compartirse de forma privada con expertos en la materia, siempre que estos comprendan que no debe hacerse pública.
2. En caso de rechazo, el equipo explica la decisión al informante, con copia a la lista de correo de seguridad correspondiente.
3. En caso de que se acepte, el equipo informa al autor de la notificación de que se está realizando el direccionamiento de la misma.

<h4>Resolve</h4>

* El equipo acuerda una solución, normalmente en una lista privada.
* Se deben documentar los detalles de la vulnerabilidad y la solución para elaborar borradores de comunicados.
* Es posible que se facilite al periodista una copia de la corrección y del borrador del comunicado para que emita sus comentarios.
* La corrección se ha incorporado sin que en el mensaje de confirmación se haga referencia alguna a que se trate de una vulnerabilidad de seguridad.
* Se ha creado una versión que incluye la corrección. En la política «Mojaloop CVD» se ofrecen más detalles al respecto.

<h4>Announce</h4>

* Tras el lanzamiento, se dan a conocer públicamente la vulnerabilidad y la corrección.
* El comunicado debe enviarse a los destinatarios pertinentes, entre los que se incluyen la persona que ha informado de la vulnerabilidad, las listas de seguridad del proyecto y, en su caso, las listas de seguridad públicas.

<h4>Complete</h4>

Las páginas del proyecto dedicadas a la seguridad pública deberían actualizarse con información sobre la vulnerabilidad, garantizando así la transparencia para los usuarios.

<h3>4. Mojaloop Vulnerability Management Processes in Place</h3>

Mojaloop ha establecido una serie de procesos y herramientas sólidos para gestionar las vulnerabilidades a lo largo de todo el ciclo de vida del desarrollo de software, garantizando la conformidad con las mejores prácticas del sector, incluidas las normas ISO 27001 relativas a la identificación y mitigación de vulnerabilidades.

<h4>Vulnerability Management</h4>

El monitoreo continuo de los componentes de código abierto en busca de vulnerabilidades está integrado en el proceso de CI/CD. Este proceso está automatizado para evaluar cada lanzamiento, cada confirmación (commit) y cada solicitud de incorporación de cambios, utilizando Node Package Manager (NPM) para evaluar las vulnerabilidades de las dependencias.

<h4>Static Application Security Testing (SAST)</h4>

Mojaloop utiliza diversas herramientas para el análisis estático de seguridad (SAST), lo que permite obtener información detallada sobre las vulnerabilidades a nivel de código gracias al uso de bases de datos públicas de vulnerabilidades, entre las que se incluyen:

1. **Herramientas de seguridad GitHub:** Entre ellas, Dependabot para el análisis de dependencias (que se basa en la base de datos de avisos de GitHub), CodeQL para el análisis de código y Secret Scanning para evitar la inclusión de información confidencial.
2. **SonarCloud:** Analiza cada confirmación (commit), solicitud de incorporación de cambios y versión para detectar problemas de calidad del código y de seguridad, utilizando datos sobre vulnerabilidades procedentes de bases de datos públicas como CVE (Common Vulnerabilities and Exposures).

<h4>Software Bill of Materials (SBOM) and Dependency Management</h4>

Una herramienta SBOM se utiliza para generar un inventario de dependencias de terceros, lo que permite:

1. Identificación de vulnerabilidades y problemas relacionados con el cumplimiento de las licencias.
2. Elaboración periódica de informes para evaluaciones normativas y de seguridad.
3. Monitoreo continuo de las versiones de las bibliotecas en todos los repositorios.
4. Garantizar que se utilicen paquetes y dependencias bien mantenidos y gestionados, y que los obsoletos se gestionen adecuadamente.

Aquí encontrará más información sobre la SBOM en la versión Mojaloop: https://github.com/mojaloop/ml-depcheck-utility?tab=readme-ov-file#sbom-generation-tool-for-mojaloop-repositories 

<h4>Container Security</h4>

Las imágenes de contenedores se analizan en busca de vulnerabilidades mediante Grype antes de su publicación. Grype se configura siguiendo las mejores prácticas y se recomienda a los adoptantes que adopten configuraciones más estrictas. La configuración de Grype del CI Orb Mojaloop utiliza: https://github.com/mojaloop/ci-config-orb-build?tab=readme-ov-file#vulnerability-image-scan-configuration.

<h4>License Compliance</h4>

Un escáner automático de licencias garantiza que solo se utilicen componentes con licencias compatibles. Las comprobaciones de cumplimiento normativo están integradas en los procesos de CI/CD, lo que impide que el código que no cumpla con los requisitos se incorpore o se realice el Despliegue.

<h4>Provenance of Images</h4>

A partir de la versión Mojaloop (v17.1.0), los gráficos de Helm de la versión Mojaloop se firman en el momento de su publicación y pueden verificarse en el momento de la instalación o el Despliegue (esta función cuenta con soporte nativo en Helm), con el fin de garantizar la procedencia de los artefactos relacionados con los gráficos. En el futuro, esto podrá ampliarse a otros artefactos, como las imágenes.

<h4>Mojaloop CI/CD Security Process</h4>

Mojaloop utiliza un proceso de CI/CD que integra automáticamente controles de seguridad a lo largo de todo el proceso de desarrollo de software. Esto garantiza una aplicación coherente de la seguridad sin necesidad de supervisión manual. Las reglas de protección de ramas imponen controles continuos en cada confirmación (commit), solicitud de incorporación de cambios y lanzamiento.

Integración de la seguridad en CI/CD:

1. **Seguridad de los contenedores: **…
2. **Cumplimiento de las condiciones de la licencia:** …
3. **Análisis de vulnerabilidades en las dependencias:** …

Todas las vulnerabilidades críticas se registran, y el proceso de CI/CD bloqueará la publicación de imágenes o paquetes hasta que se resuelvan estos problemas. Estas medidas de seguridad automatizadas en el proceso de CI/CD garantizan que el código se someta a pruebas continuas, sea seguro y cumpla con la normativa, lo que permite mantener unos elevados estándares de seguridad a lo largo de todo el proceso de desarrollo.

<h4>Coordinated Vulnerability Disclosure (CVD)</h4>

Mojaloop aplica un proceso de CVD, lo que garantiza que las partes responsables dispongan del tiempo suficiente para abordar y subsanar las vulnerabilidades antes de su divulgación pública.

Política de divulgación de vulnerabilidades (CVD) Mojaloop: [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

<h4>Reporting and Compliance</h4>

Tras cada análisis se generan informes exhaustivos en los que se detallan los resultados, las medidas de remediación y su eficacia.

Todos los informes se almacenan con fines de auditoría y cumplimiento normativo, lo que garantiza la transparencia y la rendición de cuentas.

Se proporciona un informe del análisis de licencias a nivel de Helm junto con las notas de la versión Mojaloop (que también confirman que el paso de análisis de licencias se ha superado y que solo incluye las licencias permitidas). El archivo de resumen de licencias se adjunta a las notas de la versión (se encuentra al final): [https://github.com/mojaloop/helm/releases/tag/v17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) ofrece un ejemplo.

Los informes de análisis de imágenes están disponibles para su revisión en la herramienta de integración continua (CircleCI) con el fin de registrar si el resultado es un fallo o una superación (aunque el flujo de trabajo solo avanza si se supera este paso). A modo de ejemplo o referencia, aquí tiene un ejemplo de resultado de análisis de Grype: [https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts](https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts) (aunque esta información podría quedar desactualizada con el tiempo, se ofrece a modo de ejemplo)

<h3>5. Scope</h3>

El proceso de gestión de vulnerabilidades «Mojaloop» se aplica a todos los componentes que forman parte de la versión «MojaloopHelm». 

Esto incluye:

1. Todos los componentes y servicios fundamentales se definen de forma explícita en los gráficos «Mojaloop» y «Helm».
2. Dependencias incluidas en la versión MojaloopHelm, que se analizan automáticamente como parte del proceso de gestión de vulnerabilidades.

Exclusiones:

1. Los repositorios que no forman parte de la versión principal «Mojaloop» se consideran fuera de producción y quedan excluidos del proceso de gestión de vulnerabilidades.
2. Los componentes externos necesarios para un despliegue típico de Mojaloop (por ejemplo, MySQL, Redis, MongoDB, Kafka) no son gestionados por Mojaloop Foundation y quedan excluidos de este proceso de gestión de vulnerabilidades destinado al código fuente de la aplicación de Mojaloop, aunque forman parte de la gestión general de vulnerabilidades (como dependencias de software de código abierto de terceros).

Este enfoque garantiza que los componentes básicos «Mojaloop» estén protegidos de forma coherente, al tiempo que aclara los límites de responsabilidad en lo que respecta a las dependencias externas y ofrece orientación sobre otros paquetes de software libre (o de terceros), dependencias y herramientas.

<h2></h2>
