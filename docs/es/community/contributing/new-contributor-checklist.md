---
syncRef: e10d4c6990d4e76f61fe6cfdd2e6cd54f8b8d41c
---

# Lista de verificación para nuevos contribuyentes

Esta guía resume los pasos necesarios para ponerse en marcha como contribuyente de Mojaloop. No hace falta completarlos todos de una sola vez, pero al final de la lista de verificación debería haber aprendido bastante sobre Mojaloop y estar preparado para contribuir a la comunidad.


## 1. Herramientas y documentación

- Asegúrese de tener ya una cuenta de GitHub o cree una [aquí](https://github.com/join)

- Únase a la comunidad de slack en el [enlace de autoinvitación](https://join.slack.com/t/mojaloop/shared_invite/zt-1qy6f3fs0-xYfqfIHJ6zFfNXb0XRpiHw) y únase a los siguientes canales:
  - `#announcements` - Anuncios de nuevas versiones y del estado de QA
  - `#design-authority` - Preguntas y debate sobre el diseño de Mojaloop
  - `#general` - Debate general sobre Mojaloop
  - `#help-mojaloop` - Pida ayuda para instalar o ejecutar Mojaloop
  - `#ml-oss-bug-triage` - Debate y triaje de nuevos errores y problemas

- ¡Salude! No dude en presentarse brevemente a la comunidad en el canal `#general`.

- Revise la [guía del flujo de trabajo de Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) y asegúrese de estar familiarizado con git.
  - Lectura adicional: [Introducción al flujo de trabajo de Github](https://www.atlassian.com/git/tutorials/comparing-workflows)

- Familiarícese con nuestro estilo de codificación estándar: https://standardjs.com/

- Explore la [documentación de Mojaloop](https://mojaloop.io/documentation/) y obtenga una comprensión básica de cómo funciona la tecnología.

- Siga la [guía de herramientas para desarrolladores](https://github.com/mojaloop/mojaloop/blob/master/onboarding.md) para poner en marcha en su entorno local las herramientas de desarrollo necesarias.

- (Opcional) Ponga en marcha el Central-Ledger en máquinas locales:
  - https://github.com/mojaloop/central-ledger/blob/master/Onboarding.md
  - https://github.com/mojaloop/ml-api-adapter/blob/master/Onboarding.md

- (Opcional:) Ejecute usted mismo un switch completo con Kubernetes https://mojaloop.io/documentation/deployment-guide/ _(nota: si lo ejecuta localmente, su clúster de Kubernetes necesitará 8GB de RAM o más)_

## 2. Encontrar un problema

- Revise la lista [good-first-issue](https://github.com/mojaloop/project/labels/good%20first%20issue) en [`mojaloop/project`](https://github.com/mojaloop/project) para encontrar un buen problema con el que empezar a trabajar. Como alternativa, escriba a la comunidad en Slack en `#general` para pedir ayuda para encontrar un problema.

- Deje un comentario en el problema pidiendo que se le asigne; esto ayuda a asegurarnos de que no dupliquemos trabajo. Como siempre, escríbanos por Slack si tiene alguna duda o preocupación.

- Haga fork de los repositorios pertinentes para el problema, clónelos y cree una rama nueva para el problema
  - Consulte nuestra [guía de usuario de Git](https://docs.mojaloop.io/community/standards/creating-new-features.html) si se pierde


## 3. Abrir su primer PR 

Consulte nuestras directrices para crear pull requests [aquí](pr-guidance.md).

## 4. Firmar el CLA

Después de abrir su primer PR, nuestros pipelines de CI/CD le pedirán que firme el CLA. Para obtener más información sobre qué es el CLA y cómo firmarlo, consulte [Firmar el CLA](./signing-the-cla.md)
