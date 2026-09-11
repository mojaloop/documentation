---
i18n_source_sha: 2cc9a2ff672fa3c89d8247d07ee24239d1c363bc
---

# Proyecto Code_Improvement

## Descripción general
El propósito es mejorar la calidad y la seguridad del código del proyecto Mojaloop.  Incluye el análisis y la introducción de nuevas herramientas de código abierto, mejoras de procesos, comprobaciones de puertas (dentro de los pull requests y las compilaciones) junto con documentación.

Alcance: el proyecto se centra en la calidad y la seguridad, pero puede llevar a otras áreas como la automatización de pruebas y la automatización y las herramientas de DevOps.

## Resultado (fase uno, para finales de enero):
- Implementación y análisis de nuevas herramientas OSS
- Actualizar los scripts de publicación: los aspectos de seguridad deben incorporarse a release/devops (CI/CD)
- Actualizar las reglas de los pull requests: aspectos de seguridad incorporados a los pull requests (antes de los check-ins)
- Actualizar la documentación: estándares y guías de contribución
 
Canal de Slack:#code_security
 
 ## Debates:
 ### Implementar cambios en el Dockerfile y en el proceso de compilación de CI/CD para ayudar a reforzar la seguridad de nuestros contenedores
 - Crear un usuario no root dentro del Dockerfile
 - Activar docker-content-trust en el host de docker (esto estará dentro de CircleCI)
 - Ejecutar las compilaciones con --no-cache durante el paso de CircleCI para asegurar que traemos los parches de seguridad nuevos cada vez (no creo que sea un problema importante, ya que de todos modos no tenemos activada la caché de imágenes docker de CircleCI
 
 ### Pasar de Javascript a Typescript
 - Hacer la transición a typescript (mezclando js y ts) para más seguridad y calidad
 - Se prefiere Typescript, pero no es obligatorio: https://github.com/mojaloop/template-typescript-public
