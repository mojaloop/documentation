---
syncRef: e10d4c6990d4e76f61fe6cfdd2e6cd54f8b8d41c
---

# Directrices para los pull requests

> **Se aplica a:** todos los contribuyentes que envíen pull requests a repositorios de la [organización Mojaloop en GitHub](https://github.com/mojaloop).
> Estas directrices complementan la [guía del contribuyente](contributors-guide.md), la [política de IA](../standards/ai_policy.md) y el [proceso de ingeniería de producto](product-engineering-process.md).

**Divulgación de uso de IA** Este documento incluye contenido generado con la asistencia de Claude Sonnet 4.6. Todo el contenido ha sido revisado y validado por el autor.


---

## 1. Antes de abrir un PR

### 1.1 Empiece con un problema de GitHub

Todo PR debe estar vinculado a un problema de GitHub. No abra un PR sin uno.

- Si no existe un problema pertinente, **créelo primero** y deje tiempo para el triaje o el debate antes de empezar la implementación, especialmente para los cambios no triviales.
- Los problemas son el espacio principal para el debate del diseño, las decisiones de alcance y la alineación con los mantenedores. Úselos.


### 1.2 Hable primero de los cambios con consecuencias o críticos

Si su cambio toca interfaces compartidas, la lógica de liquidación o de compensación, API principales o código sensible desde el punto de vista de la seguridad, revise el [proceso de cambios con consecuencias](https://docs.mojaloop.io/community/contributing/consequential-change-process.html) y el [proceso de cambios críticos](https://docs.mojaloop.io/community/contributing/critical-change-process.html) **antes de escribir código**. Plantear un cambio arquitectónico grande como un PR sorpresa hará que se devuelva para hablarlo previamente.

---

## 2 Títulos de los pull requests

Mojaloop usa [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para ayudar a que nuestras herramientas automatizadas gestionen las versiones y los despliegues. El título de su pull request **debe** ajustarse a la especificación de conventional commits para pasar las comprobaciones de CI/CD en CircleCI.

Al adoptar Conventional Commits y el versionado semántico podemos publicar automáticamente una versión nueva de un componente dado e incrementar las versiones `MAJOR`, `MINOR` y `BUGFIX` basándonos únicamente en los títulos de los PR, y generar automáticamente changelogs completos. (Vea [este ejemplo](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) de un changelog generado automáticamente)

> **Nota**:
> Al hacer merge (y squash) de un PR, GitHub usa el *título* del PR como mensaje del commit de git. Esto significa que, para especificar un cambio incompatible, debe usar el formato `!`:
> "Si se incluye en el prefijo de tipo/ámbito, los cambios incompatibles DEBEN indicarse con un ! inmediatamente antes de los :. Si se usa !, BREAKING CHANGE: PUEDE omitirse de la sección de pie, y la descripción del commit DEBE usarse para describir el cambio incompatible."

#### Ejemplos de buenos títulos de PR

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

---

## 3. Mantenga los PR pequeños y centrados

Esto es lo más importante que puede hacer para ayudar a los revisores y a los mantenedores.

### 3.1 Un PR, un propósito

Un pull request debería hacer exactamente una cosa: corregir un error, implementar una funcionalidad o abordar una cuestión. Los PR con propósitos mezclados son difíciles de revisar, difíciles de revertir si algo sale mal y crean un historial de commits ambiguo.

**No combine:**
- La corrección de un error y una refactorización
- Una funcionalidad y una limpieza de pruebas sin relación
- Actualizaciones de dependencias y cambios funcionales
- Cambios de espacios en blanco con cambios funcionales

Si se descubre escribiendo "y además..." en la descripción del PR, eso es una señal de que hay que dividirlo.

Tenga en cuenta que los cambios en muchos espacios en blanco, p. ej. reindentar, pueden ocultar el propósito de un cambio subyacente. Separe los cambios grandes de espacios en blanco en sus propios PR para facilitar el proceso de revisión.

### 3.2 Apunte a un tamaño de diff apropiado

No hay un límite estricto de líneas, pero como guía práctica:

| Tamaño del diff | Expectativa |
|---|---|
| < 200 líneas | Ideal. Se puede revisar rápida y a fondo. |
| 200 – 500 líneas | Aceptable para cambios bien acotados y con buen contexto. |
| 500 – 1000 líneas | Requiere una justificación sólida. Considere dividirlo. |
| > 1000 líneas | Es probable que se devuelva y se pida dividirlo, salvo que el cambio sea inherentemente atómico (p. ej. un archivo generado, un renombrado grande). |

Cuando un cambio grande es genuinamente atómico, como una migración de esquema, la salida de una generación de código o un renombrado masivo, agregue una nota que explique por qué no se puede dividir.

### 3.3 Separe la refactorización de los cambios funcionales

Si necesita refactorizar código antes de hacer un cambio funcional, plantee la refactorización primero como su propio PR. Mezclar refactorización y cambios de comportamiento dificulta verificar que no se han introducido regresiones.

### 3.4 Mantenga los commits limpios

Haga squash o reorganice sus commits antes de abrir el PR, de forma que cada commit represente un paso lógico y autocontenido. Evite commits como `fix typo`, `wip` o `try again`. Un historial de commits limpio ayuda a los revisores y hace útil `git bisect`.

---

## 4. Escribir una buena descripción de PR

Una descripción bien escrita no es opcional, es parte de su contribución. Los revisores no deberían tener que deducir su intención a partir del diff.

La descripción de su PR debe incluir:

### 4.1 Qué y por qué

Explique **qué** hace el cambio y **por qué** hace falta. Enlace el problema de GitHub correspondiente. No se limite a repetir el título del problema; agregue el contexto que un revisor necesita para evaluar sus decisiones de implementación.

### 4.2 Cómo probarlo

Describa cómo puede el revisor verificar que el cambio funciona correctamente. Incluya:
- Los pasos para reproducir el problema (en las correcciones de errores)
- Cómo ejercitar el comportamiento nuevo (en las funcionalidades)
- Referencias a las pruebas automatizadas correspondientes

Si un cambio no se puede probar automáticamente, explique por qué y describa la verificación manual que hizo.

### 4.3 Cambios incompatibles

Si su PR introduce algún cambio incompatible, ya sea en una API, en una interfaz de configuración, en un esquema de base de datos o en un contrato compartido, indíquelo **de forma explícita y destacada** al principio de la descripción. Los cambios incompatibles requieren una revisión adicional y puede que tengan que seguir el [proceso de cambios con consecuencias](https://docs.mojaloop.io/community/contributing/consequential-change-process.html).

### 4.4 Divulgación de asistencia de IA (véase la sección 4)

Si se usaron herramientas de IA para producir cualquier parte del PR, ya sea código, pruebas o la descripción del PR, esto debe divulgarse en la descripción del PR. Consulte la sección 4 para conocer el formato requerido.

---

## 5. Asistencia de IA: atribución y responsabilidad

La [política de IA de Mojaloop](https://docs.mojaloop.io/community/standards/ai_policy.html) se aplica a todas las contribuciones por PR. Las siguientes reglas destilan esa política en requisitos concretos para los PR.

### 5.1 La divulgación es obligatoria

Si alguna herramienta de IA (incluidas, entre otras, GitHub Copilot, ChatGPT, Claude, Gemini, Cursor o similares) ayudó a producir **cualquier parte de su PR**, incluidos el código, las pruebas, los mensajes de commit o la propia descripción del PR, debe incluir el siguiente bloque de divulgación en la descripción del PR:

```
**AI Assistance Disclosure**
AI tools were used in producing part of this contribution.
Tools used: [list tool(s) and version(s) where known]
Scope: [brief description of what was AI-assisted, e.g. "unit test scaffolding", "initial implementation of X function", "PR description draft"]
All AI-generated content has been reviewed, understood, and validated by the author.
```

Todos los archivos de código de la organización Mojaloop en GitHub deben incluir una cabecera de licencia y de contribuyentes. Asegúrese de que los archivos que modifique tengan su nombre y su dirección de correo actual en la lista. Si ha usado IA, debería incluir los detalles de las herramientas usadas junto a su nombre y su correo, así:

```
 - {your name} <{your email}> [Assisted by {model name} {model version}] 
```

p. ej.
```
/*****
 License
 --------------
 Copyright © 2026 Mojaloop Foundation

 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0
 (the "License") and you may not use these files except in compliance with the [License](http://www.apache.org/licenses/LICENSE-2.0).

 You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the [License](http://www.apache.org/licenses/LICENSE-2.0).

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - James Bush <jbush@mojaloop.io> [Assisted by Claude Sonnet 4.6]

 --------------
 ******/
```

Omitir esta divulgación cuando se ha usado IA es una infracción de la política de IA y hará que se devuelva el PR.

### 5.2 Usted es plenamente responsable de todo el código enviado

La divulgación no es una renuncia a la responsabilidad. Se haya usado o no asistencia de IA, el autor humano del PR es plenamente responsable de:

- La **corrección** de la lógica
- La **seguridad** de la implementación
- La **coherencia arquitectónica** con los estándares de Mojaloop
- El **cumplimiento de las licencias**: no debe enviar código generado por IA derivado de datos de entrenamiento con licencias no permitidas
- La **mantenibilidad a largo plazo** de lo que ha introducido

"Lo escribió la IA" no es una respuesta aceptable a un comentario de revisión. Si no puede explicar y defender cada parte de su PR, no está listo para enviarlo.

### 5.3 La IA no debe sustituir al juicio humano

Las herramientas de IA no pueden usarse para tomar ni delegar decisiones arquitectónicas o de diseño. Cuando una herramienta de IA proponga un enfoque que se desvíe de los patrones o invariantes establecidos de Mojaloop, el contribuyente humano es responsable de detectarlo y corregirlo antes del envío.

### 5.4 Los envíos de agentes automatizados están prohibidos

Los PR no pueden enviarlos agentes de IA totalmente autónomos. Todos los PR debe abrirlos un contribuyente humano. La única excepción es la automatización nativa de GitHub sancionada oficialmente y ya integrada en los flujos de trabajo de Mojaloop (p. ej. Dependabot, Snyk, las herramientas automatizadas de mantenimiento de la Mojaloop Foundation). Los envíos de agentes automatizados se descartarán sin revisión.

---

## 6. Lista de verificación de calidad del código

Antes de marcar un PR como listo para revisión, confirme lo siguiente:

- El PR está vinculado a un problema de GitHub con una palabra clave de cierre
- El PR hace exactamente una cosa; los cambios sin relación se han eliminado o separado
- Todas las pruebas automatizadas pasan localmente
- El comportamiento nuevo está cubierto por pruebas
- No se han introducido nuevos errores ni advertencias de lint
- Los cambios de dependencias están justificados y son mínimos
- Los cambios incompatibles están claramente señalados
- La descripción del PR explica qué, por qué y cómo probarlo
- Se incluye la divulgación de asistencia de IA, si procede (véase la sección 5.1)
- Ha leído, entendido y puede defender cada línea del diff

---

## 7. Expectativas de los revisores

Los revisores son voluntarios que dedican su tiempo. Ayúdeles a ayudarle.

- **Responda con prontitud** a los comentarios de revisión. Si necesita tiempo, dígalo.
- **No suba cambios sin relación** a un PR que ya está en revisión sin señalarlo.
- **No haga rebase ni force-push** en un PR que tiene comentarios de revisión activos, porque rompe el contexto del revisor. Coordínelo antes.
- Si un revisor le pide dividir un PR, hágalo. Esto no es una crítica; es la forma en que Mojaloop mantiene un historial revisable y apto para bisección.
- Un PR sin actividad durante **30 días** puede cerrarlo un mantenedor. Se puede reabrir cuando usted esté listo para continuar.

---

## 8. PR en borrador

Use la función **Draft PR** de GitHub para el trabajo en curso. Esto indica a los mantenedores y revisores que se agradecen los comentarios sobre la dirección general, pero que todavía no se pide una revisión completa. Conviértalo en "Ready for Review" solo cuando se cumplan todos los elementos de la lista de verificación anterior.

---

## 9. Hotfixes y cambios urgentes

Para las correcciones críticas de seguridad o los errores que rompen producción, siga el [proceso de cambios críticos](https://docs.mojaloop.io/community/contributing/critical-change-process.html). Incluso con presión de tiempo, el requisito de divulgación de IA y la lista de verificación de calidad del código siguen aplicándose. Una revisión rápida no es una licencia para saltárselos.

---

*Para preguntas sobre estas directrices, publique en el canal de Slack del flujo de trabajo correspondiente o abra un problema de GitHub en el [repositorio de documentación](https://github.com/mojaloop/documentation).*
