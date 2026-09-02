---
syncRef: e505b7585ca44397eb35cfd7cbec157c06afd257
---

# Política sobre el uso responsable de herramientas de inteligencia artificial (IA) por parte de los miembros de la comunidad

- Versión: 1.0
- Fecha de entrada en vigor: 2026-04-08
- Autor: James Bush (jbush@mojaloop.io)
- Se aplica a: todos los contribuyentes, mantenedores, adoptantes y participantes de la comunidad de Mojaloop y de sus proyectos asociados, incluidos los repositorios de la organización Mojaloop en GitHub.

**Divulgación de uso de IA** Este documento incluye contenido generado con la asistencia de ChatGPT 5.2. Todo el contenido ha sido revisado y validado por el autor.

---

## 1. Propósito

Esta política establece directrices claras y pragmáticas para el uso responsable de las herramientas de inteligencia artificial (IA) dentro de la comunidad de Mojaloop.

La Mojaloop Foundation apoya la innovación y las mejoras de productividad, incluido el uso de herramientas asistidas por IA. Sin embargo, la transparencia, la responsabilidad y la confianza de la comunidad siguen siendo primordiales. Esta política asegura que el uso de la IA mejore la colaboración sin socavar la apertura, la integridad de la autoría ni la calidad técnica.

---

## 2. Principios rectores

Todo uso de IA dentro de la comunidad de Mojaloop debe cumplir los siguientes principios:

1. **Responsabilidad humana**: siempre hay un contribuyente humano responsable del resultado final.
2. **Transparencia**: el uso de contenido generado por IA debe divulgarse claramente.
3. **Calidad y seguridad**: los resultados generados por IA deben cumplir los estándares de ingeniería y de documentación de Mojaloop.
4. **Integridad de la comunidad**: la IA no debe usarse de formas que alteren o desborden los procesos de la comunidad.

---

## 3. Usos permitidos de las herramientas de IA

### 3.1 La IA como tomadora de notas en las llamadas de la comunidad

Se pueden usar herramientas de IA para tomar notas durante las **llamadas públicas de la comunidad de Mojaloop**, con las siguientes condiciones:

- El usuario de la herramienta de IA **debe estar presente personalmente** en la llamada, salvo que obtenga autorización previa del anfitrión de la reunión.
- Las herramientas de IA para tomar notas no pueden unirse a las llamadas de forma independiente de un participante humano sin autorización previa explícita del anfitrión de la reunión.
- No se permiten bots de IA anónimos. Todos los bots de IA deben divulgar públicamente a qué miembro humano de la comunidad representan.
- Las herramientas de IA para tomar notas solo pueden unirse a llamadas en las que esté activada la grabación.

**Justificación:**
La comunidad de Mojaloop valora el debate abierto y la seguridad psicológica. La presencia de numerosos bots de grabación o de resumen sin supervisión puede desincentivar la participación y afectar negativamente a la colaboración.

---

### 3.2 Asistencia de IA en la documentación

Los miembros de la comunidad pueden usar herramientas de IA para ayudar a:

- Redactar documentación
- Mejorar la claridad o la gramática
- Reformatear contenido
- Generar resúmenes
- Traducir contenido

Sin embargo:

- Todo documento en el que la IA haya generado **cualquier parte del contenido** debe contener una declaración clara en la cabecera del documento que especifique:
  - Que se usaron herramientas de IA
  - Qué herramientas de IA se usaron

**Ejemplo de declaración de divulgación:**

  _Este documento incluye contenido generado con la asistencia de [nombre de la herramienta]. Todo el contenido ha sido revisado y validado por el autor._

No divulgar la generación asistida por IA puede dar lugar a que el documento se rechace o se devuelva para su corrección.

**Justificación:**
La transparencia mantiene la confianza en la autoría y permite que los lectores valoren la procedencia de forma apropiada.

---

### 3.3 Asistencia de IA en la creación de código y la depuración

Se pueden usar herramientas de IA para:

- La generación de código
- Las sugerencias de código
- La ayuda con la refactorización
- El apoyo en la depuración
- La generación de pruebas
- La generación de documentación del código

Sin embargo, se aplican estrictamente las siguientes reglas:

#### 3.3.1 Requisito de envío por un humano

- Todos los pull requests (PR), problemas y envíos de código deben hacerlos contribuyentes humanos.
- Los agentes de IA totalmente automatizados no pueden enviar PR, correcciones de errores ni cambios de código.
- Todos los pull requests (PR), problemas y envíos de código deben seguir los requisitos del proceso de ingeniería de producto de la comunidad de Mojaloop.
- La única excepción son las herramientas automatizadas con soporte oficial que ya están integradas en los flujos de trabajo de GitHub (p. ej. bots de actualización de dependencias como Dependabot).

Cualquier envío de un agente automatizado que vaya más allá de las herramientas nativas de GitHub aprobadas se **descartará sin revisión**.

---

#### 3.3.2 Revisión humana obligatoria

Todo el código asistido por IA:

- DEBE ser revisado a fondo por la persona que lo envía.
- DEBE ser comprendido por completo por quien lo envía.
- DEBE cumplir los estándares de codificación y los principios arquitectónicos de Mojaloop.
- DEBE pasar todas las pruebas automatizadas y los pipelines de validación.

El código que es claramente generado por IA y que no ha sido debidamente revisado, validado y comprendido por el autor humano no se aceptará en el código base.

El contribuyente humano que envía el PR conserva la responsabilidad plena de:

- La corrección
- La seguridad
- El cumplimiento de las licencias
- La coherencia arquitectónica
- La mantenibilidad a largo plazo

**Justificación:**
Mojaloop opera en el dominio de los servicios financieros. La integridad, la seguridad y la corrección del código no son negociables.

---

## 4. Usos prohibidos

Los siguientes usos de la IA no están permitidos dentro de los procesos de la comunidad de Mojaloop:

- Bots de IA sin supervisión que se unen a las llamadas de la comunidad.
- Agentes de IA totalmente autónomos que envían PR o problemas.
- Enviar contenido generado por IA sin la divulgación requerida (cuando proceda).
- Delegar decisiones arquitectónicas o de diseño en herramientas de IA.
- Usar herramientas de IA para extraer, resumir o redistribuir información restringida o confidencial sin permiso.

---

## 5. Aplicación

Los mantenedores y revisores pueden:

- Pedir que se agreguen declaraciones de divulgación.
- Rechazar los PR que parezcan insuficientemente revisados.
- Cerrar sin comentarios los envíos de agentes automatizados.
- Pedir aclaraciones sobre la participación de la IA.

Las infracciones repetidas o deliberadas pueden escalarse conforme a los procedimientos de gobernanza de la comunidad de Mojaloop.

---

## 6. Revisión futura

Las capacidades de la IA evolucionan con rapidez. Esta política será revisada periódicamente por la Mojaloop Foundation y los mantenedores de la comunidad para asegurar que siga siendo apropiada, práctica y alineada con los valores de la comunidad.

---

## 7. Resumen

Las herramientas de IA están permitidas dentro de la comunidad de Mojaloop cuando se usan de forma responsable y transparente.

- Los humanos deben seguir siendo responsables.
- La IA no debe desbordar los procesos de la comunidad.
- La divulgación es obligatoria en la documentación.
- El código siempre debe revisarlo y enviarlo un humano.

La Mojaloop Foundation fomenta la adopción reflexiva de herramientas de IA de formas que refuercen, y no diluyan, la calidad, la confianza y el espíritu colaborativo del ecosistema Mojaloop.
