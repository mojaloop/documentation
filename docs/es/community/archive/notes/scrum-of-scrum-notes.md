---
i18n_source_sha: e53175ac0db31e33d7ec44f51bade322f1569631
---

# Notas de las reuniones semanales de scrum de scrums

## Llamada de scrum de scrums del OSS, jueves **7 de mayo** de 2020

1. Coil - Don:
  a Rendimiento: problema de la 'gran brecha'; cambios en cs-stream; resultados modificados; se está preparando un documento con los cambios para su revisión; el trabajo de Joran sobre el procesamiento concurrente de mensajes en topics de Kafka -> intentar probarlo; se ve un 40-50% de rendimiento;
  b Adaptador LPS: trabajando con Renjith (Applied Payments); montando un lab o entorno para que lo usen los equipos socios; explorando la colaboración con el laboratorio de la GSMA
2. Crosslake - Lewis:
  a. Rendimiento: se hizo el informe con Confluent y Nakul, la colaboración está terminando; difundiendo los documentos que produjo Nakul
  b. PISP: los debates de diseño siguen en marcha junto con la implementación
  c. Versionado: definiendo el alcance de los despliegues ZDD
  d. Problemas relacionados con el lanzamiento oficial: problemas de DNS, se trabajaron y se resolvieron
3. ModusBox - Sam:
  a. Rendimiento: moviendo y estandarizando en master los cambios de rendimiento del PI-9 (no todas las pruebas de concepto); trabajando en los objetivos y la estrategia para el PI10
  b. Equipo principal: transferencias masivas, empezando con el soporte en sdk-scheme-adapter
  c. Mantenimiento (corrección de errores):
    i) Acentos en los nombres - En curso
    ii) Simulador de Mojaloop en despliegues de AWS - casi listo, trabajando en los scripts de QA (en 'dev2', el segundo entorno)
  d. Testing toolkit: actualmente disponible para pruebas, todos los recursos de la ML FSPIOP API admitidos. Se pueden generar informes. Trabajando en ofrecer opciones de línea de comandos y más portabilidad
  e. CCB: publicando la especificación v1.1 esta semana, la definición de la API y el Swagger correspondiente (Open API)
4. Virtual / Mojaloop Foundation - Megan:
  a. Lanzamiento de la Mojaloop Foundation
  b. Paula H, directora ejecutiva de la Mojaloop Foundation.
5. Mojaloop Foundation - Simeon:
  a. Dar comentarios sobre la encuesta de la comunidad
  b. Posible hackathon a principios de junio en colaboración con Google
  c. El boletín de Mojaloop, con temas interesantes como la especificación ML FSPIOP v1.1, la versión Helm v10.1.0, etc., se lanzará la semana que viene.

## Llamada de scrum de scrums del OSS, jueves **16 de abril** de 2020

1. Coil:
  a. Don C: rendimiento, resultados preliminares, tenemos algunas cifras, tenemos cifras de handlers individuales, para compararlas con handlers individuales, centrados en la base de datos, un tercio del tiempo de un tramo se va en rendimiento
  b. Don C: HSM: el equipo de Renjith presentó la demostración programada para la semana que viene, preparación del evento
2. Crosslake:
  a. Lewis D: PISP, planificación del sprint, iterando los diseños
  b. Lewis D: hackathons, habló de algunos conceptos con Innocent K (HiPiPo)
  c. Lewis D: tiene acceso al Lab de la GSMA, va a experimentar
  d. Lewis D: versionado: trabajando en la presentación para el PI10
  e. Kim W: actualización general del flujo de rendimiento, taller con Confluent
  f. Kim W: actualización del flujo de rendimiento, Pedro está preparando una propuesta y una presentación
3. Mifos:
  a. Ed C: preparación de la demostración para las reuniones del PI10
4. Virtual:
  a. Megan: preparándose para el evento del PI10 y la logística
5. DA:
  a. Nico: debatiendo el problema del PISP, del que Michael será responsable
6. Equipo principal:
  a. Sam K: rendimiento: preparando métricas; haciendo ejecuciones de rendimiento para establecer la línea base de las ramas master tras pasar algunas mejoras a master
  b. Sam K: problema de los acentos en los nombres, implementación en curso
  f. Sam K: implementación de Settlements V2 a cargo del equipo OSS-TIPS, en curso, QA hecho para la iteración actual
  g. Sam K: Testing toolkit: mejorando la cobertura de pruebas unitarias. Agregadas aserciones para varios endpoints
  i. Sam K: CCB: v1.1 de la definición de la ML FSPIOP API, primer borrador hecho, revisiones en curso
7. Comunidad de Mojaloop:
  a. Actualización de la comunidad a cargo de Simeon

## Llamada de scrum de scrums del OSS, jueves **9 de abril** de 2020

1. Coil:
  a. Don C: pruebas de rendimiento, infrautilización de recursos, quedan más ajustes por hacer
  b. Don C: integración de HSM, preparación de la demostración
  c. Don C: adaptador legacy, actualización de la documentación, buscando comentarios
2. Crosslake:
  a. Kim W: reunión de FRMS hoy más temprano, se hicieron propuestas
  b. Kim W: actualización de las reuniones del PI10, inscripciones, preguntas
  c. Lewis D: PISP: más planificación, trabajando en historias y elementos, pero debatiendo diseños sobre Oauth y Fido
  d. Lewis D: rendimiento: conversación con Pedro sobre una prueba de concepto para cambios de arquitectura, para Event Sourcing, CQRS, etc.
  e. Lewis D: estándares de código, actualizados
  f. Lewis D: flujo de calidad de código y seguridad: uso de HSM, demostración, seguridad en la comunidad OSS
  g. Lewis D: los análisis de contenedores funcionan, trabajará con Victor, primeras mediciones de referencia
  h. Lewis D: por último, actualización del versionado
3. Mifos:
  a. Ed C: trabajo en el Payment Hub, integrando con Kafka, transacciones de ML pasando correctamente, usando Elastic Search para la supervisión de las operaciones de back-office
  b. Ed C: preparación de la demostración para las reuniones del PI10
4. Equipo principal:
  a. Sam K: rendimiento: redactando informes, moviendo métricas y otras mejoras a las ramas master
  b. Sam K: rendimiento: cerrando el conjunto final de pruebas; hoja de ruta de la fase 4 y planificación del arranque
  c. Sam K: soporte a la comunidad: corrigiendo errores (arreglados algunos puntos de debate importantes), aclarando decisiones de implementación, etc.
  d. Sam K: soporte de pagos a comercios, aportar pruebas y validar el caso de uso "Request to Pay" de comercios, estandarización en curso
  e. Sam K: problema de los acentos en los nombres, implementación en curso
  f. Sam K: implementación de Settlements V2 a cargo del equipo OSS-TIPS, en curso
  g. Sam K: Testing toolkit: agregando aserciones para los recursos de la API, JWS hecho, agregando mTLS
  h. Sam K: Testing toolkit: guía de uso en curso, junto con la adición de pruebas relacionadas con el Golden path
  i. Sam K: CCB: v1.1 de la definición de la ML FSPIOP API, primer borrador hecho, esperando revisión

## Llamada de scrum de scrums del OSS, jueves **2 de abril** de 2020

1. Mifos:
  a. Ed C: el equipo sigue trabajando en Payment Hub EE, centrado en la interfaz operativa, las capacidades para los backends de los DFSP y el marco de gestión de eventos de error
2. Coil:
  a. Don C: rendimiento, configuración hecha y ya empezado, en GCP, se obtienen tiempos de latencia altos, hay que investigar y probablemente se pedirá apoyo a otros contribuyentes
  b. Don C: cajeros automáticos, OTP, cifrado
3. Crosslake:
  a. Kim W: agenda del PI10 redactada, el correo debería salir pronto
  b. Kim W: calendario del PI10: de martes a viernes, de 11:00 a 16:00 GMT, evento remoto o virtual
  c. Lewis D: reunión de rendimiento hoy más tarde, análisis profundo de la arquitectura
  d. Lewis D: versionado, en curso
  e. Lewis D: calidad de código y seguridad, arquitectura general de seguridad, HSM cubierto por Coil
  f. Lewis D: Mojaloop en una caja de Vagrant, en curso
4. Equipo principal:
  a. Miguel dB: rendimiento: cerrando el trabajo de rendimiento, acercándose a 900 TPS de extremo a extremo; actualmente intentando identificar y entender una única unidad que necesite este rendimiento
  b. Sam K: rendimiento: cerrando el conjunto final de pruebas; hoja de ruta de la fase 4 y planificación del arranque
  c. Sam K: soporte a la comunidad: corrigiendo errores (arreglados algunos puntos de debate importantes), aclarando decisiones de implementación, etc.
  d. Sam K: soporte de pagos a comercios, estandarización en curso, corrigiendo problemas en /authorizations
  e. Sam K: problema de los acentos en los nombres, implementación en curso
  f. Sam K: implementación de Settlements V2 a cargo del equipo OSS-TIPS, en curso
  g. Sam K: Testing toolkit: agregando aserciones para los recursos de la API, JWS en curso
  h. Sam K: CCB: v1.1 de la definición de la ML FSPIOP API, redacción en curso

## Llamada de scrum de scrums del OSS, jueves **26 de marzo** de 2020

1. DA: Nico, tema del versionado debatido por Lewis, Matt y Sam
2. Crosslake:
  a. Kim W: finalizando la agenda, de lunes a viernes
  b. Kim W: escriba si quiere presentar o intervenir
  c. Kim W: preparando las lecturas previas
  d. Kim W: taller de fraude y AML: Justus publicará el resumen y las notas en GitHub después de los talleres
  e. Lewis D: taller o análisis profundo de rendimiento, posiblemente el lunes
  f. Lewis D: debates de diseño del PISP en curso
  g: Lewis D: flujo de calidad de código y seguridad: i. recomendaciones de seguridad para contenedores Docker. ii. alcance del RGPD para Mojaloop
3. Mifos:
  a. Ed C / Istvan M: siguen creando el Lab
  b. Ed C / Istvan M: Fineract, nueva instancia de Payment Hub, buen avance
  c. Ed C / Istvan M: trabajando en la supervisión operativa de la parte de backend (depuración de back-office, supervisión, etc.)
4. Simeon O, responsable de comunidad, asistió
5. Equipo principal:
  a. Sam K: rendimiento: finalizado el trabajo de la fase 3. Llegar a los objetivos inmediatos para una conclusión lógica, todavía en curso; hoja de ruta y arranque de la fase 4
  b. Sam K: soporte a la comunidad: corrigiendo errores, aclarando decisiones de implementación, etc.
  d. Sam K: soporte de pagos a comercios, estandarización en curso, agregando métricas, agregado el marco de eventos
  e. Sam K: problema de los acentos en los nombres, debatiendo el problema y diseñando la solución
  f. Sam K: implementación de Settlements V2 a cargo del equipo OSS-TIPS, en curso
  g. Sam K: Testing toolkit: agregando aserciones para los recursos de la API, JWS en curso. Guía de uso en curso
  h. Sam K: CCB: v1.1 de la definición de la ML FSPIOP API, redacción en curso

## Llamada de scrum de scrums del OSS, jueves **19 de marzo** de 2020

1. Coil:
  a. Don C: mirando el rendimiento y los saltos de red (evitar comprobaciones de duplicados, etc.)
  b. Adrian hB: Renjith y Matt trabajando en la traducción ISO20022 (a JWE, etc.), demostración para cuando nos reunamos sobre cómo usar el HSM
2. Crosslake:
  a. Kim W: terminando los elementos de acción del taller de mitad de PI y los elementos de seguimiento
  b. Kim W: el evento comunitario de abril se celebra, pero será virtual. Kim tiene un evento de planificación y confirmará los detalles: se agradecen las sugerencias
  c. Lewis D: rendimiento, incluir a Don en otros debates
  d. Lewis D: calidad de código, propuesta de requisitos del RGPD
  e: Lewis D: versionado, borrador inicial enviado como pull request, se presentará a la DA la semana que viene
3. Mifos:
  a. Ed C, Istvan M: Payment Hub, entorno en Azure, 
  b. Ed C, Istvan M: las transacciones ya pasan correctamente
  c. Ed C, Istvan M: siguiente fase: implementar las pantallas de back-office para que las vean los usuarios de negocio
  d. Ed C, Istvan M: taller con Google sobre PISP
4. Equipo principal:
  a. Sam K: rendimiento, combinando los handlers de prepare+posición y de fulfil+posición, trabajo de caracterización en curso
  b. Sam K: rendimiento, trabajando en entender cómo es 1 unidad de infraestructura para un despliegue de Mojaloop
  c. Sam K: estandarización del servicio de solicitudes de transacción: agregado el marco de eventos, agregando ahora las métricas
  d. Sam K: soporte a la comunidad: corrigiendo problemas, problemas de actualización, el problema de permitir acentos en los nombres, etc.
