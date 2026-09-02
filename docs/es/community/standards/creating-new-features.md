---
syncRef: e10d4c6990d4e76f61fe6cfdd2e6cd54f8b8d41c
---

# Crear funcionalidades nuevas

## Fork

Haga fork del repositorio de Mojaloop en su propio espacio personal. Asegúrese de mantener sincronizada la rama `master`.

Consulte la siguiente documentación para obtener más información: [https://help.github.com/articles/fork-a-repo/](https://help.github.com/articles/fork-a-repo/)

1. Clone el repositorio usando el botón Fork de Git \(consulte la documentación anterior para obtener más información\)
2. Clone su repositorio bifurcado: `git clone https://github.com/<your_username>/<forked_repo>.git`
3. Sincronice su repositorio bifurcado con Mojaloop

   Agregue un nuevo repositorio upstream para Mojaloop `$ git remote add mojaloop https://github.com/mojaloop/<original_repo>.git`

   Ahora debería ver que tiene dos remotos:

   ```bash
    git remote -v
    origin    https://github.com/<your_username>/<forked_repo>.git (fetch)
    origin    https://github.com/<your_username>/<forked_repo>.git (push)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (fetch)
    mojaloop  https://github.com/mojaloop/<original_repo>.git (push)
   ```

4. Para sincronizar con su rama actual: `git pull mojaloop <current_branch>` Esto hará merge de cualquier cambio del repositorio de Mojaloop en su repositorio bifurcado.
5. Suba los cambios de vuelta a su fork remoto: `git push origin <current_branch>`

## Crear una rama

Cree una rama nueva a partir de la rama `master` con el siguiente formato: `<branchType>/<issue#><issueDescription>`, donde `issue#` se puede obtener del problema de Github y `issueDescription` es la descripción del problema en formato CamelCase.

1. Cree la rama y sitúese en ella: `git checkout -b <branchType>/<issue#><issueDescription>`
2. Suba la rama a su remoto: `git push origin <branchType>/<issue#><issueDescription>`

Donde `<branchType>` puede ser uno de los siguientes:

| branchType | Descripción |
| :---       | :--- |
| hotfix     | Una rama `hotfix` es para cualquier corrección urgente. |
| feature    | Una rama de `development` para funcionalidades nuevas o de mantenimiento que están en desarrollo activo. |
| fix        | Una rama de `development` que se usa para corregir un error. |
| release    | Una rama de versión que contiene una instantánea de una versión publicada. |
| backup     | Una rama de copia de seguridad temporal. Se usa normalmente durante el mantenimiento del repositorio. |
| major      | Una rama de `pre-release` para cambios mayores. |
| minor      | Una rama de `pre-release` para cambios menores. |
| patch      | Una rama de `pre-release` para cambios de parche. |

## Rama principal

La rama principal debe contener siempre código apto para el despliegue.
Las herramientas de automatización de compilación intentarán compilar y probar el código de esta rama y
etiquetarla con etiquetas de versión basadas en semver si lo consiguen. Los
artefactos resultantes también se publicarán en los repositorios correspondientes (npm, docker, etc.),
para que otros módulos puedan usarlos.

## Ramas hotfix

Estas ramas se crean a partir de una etiqueta de la rama principal, cuando la
versión correspondiente se ha desplegado en producción y debe corregirse un problema y, al
mismo tiempo, la rama principal tiene versiones publicadas más nuevas o está en desarrollo,
de forma que esa corrección no se puede incluir de manera puntual y estable. Estas ramas se
nombran con el patrón `hotfix/<issue#><issueDescription>`. Se recomienda
encarecidamente que la corrección se haga primero en main (o en otra rama de la que se vaya a
hacer merge en main) y después se haga cherry-pick en la rama hotfix. De las ramas
hotfix no suele hacerse merge en main y no se eliminan, ya que pueden usarse
para correcciones posteriores. En las ramas hotfix, las herramientas de automatización de compilación crearán
etiquetas y publicarán los paquetes correspondientes incrementando solo el número de versión de parche.

## Ramas de prelanzamiento

Las ramas de prelanzamiento se usan cuando el proceso de desarrollo requiere que haya artefactos
disponibles en el repositorio para las pruebas automatizadas o manuales de
funcionalidades o correcciones en curso que aún no están listas para publicarse.
Estas ramas se usan para evitar el trabajo manual asociado a publicar
en repositorios. Los artefactos publicados tendrán versiones y etiquetas de prelanzamiento,
según especifica semver. Las herramientas de automatización de compilación crearán y publicarán estas
versiones de prelanzamiento en el repositorio de paquetes y etiquetarán la rama en el repositorio
de git por cada commit que se compile correctamente. Las ramas de prelanzamiento se
crean normalmente a partir de la rama principal y después se hace merge en ella. Los patrones
de las ramas de prelanzamiento son:

- `major/<issue#><issueDescription>`: cuando se espera que una rama incluya
  cambios incompatibles.
- `minor/<issue#><issueDescription>`: cuando se espera que una rama incluya
  solo funcionalidades nuevas y ningún cambio incompatible. Es el tipo de rama más
  habitual, donde ocurre todo el desarrollo nuevo.
- `patch/<issue#><issueDescription>`: cuando se espera que una rama incluya
  solo correcciones y ninguna funcionalidad nueva ni cambio incompatible. A veces se pueden
  crear a partir de ramas hotfix, cuando hay que publicar primero las correcciones para pruebas,
  antes de hacer merge en la rama hotfix.

Los scripts de compilación publicarán automáticamente una versión y una etiqueta de prelanzamiento usando
`<issue#><issueDescription>` como identificador de prelanzamiento, seguido de un
número secuencial, es decir, algo como
`X.Y.Z-<issue#><issueDescription>.sequence`, donde X, Y o Z se
incrementarán automáticamente una vez en la primera compilación de la rama, según el
prefijo major/minor/patch del nombre de la rama, y `sequence` se incrementará
en cada compilación correcta. En las ramas de prelanzamiento es importante asegurarse de que
`<issue#><issueDescription>` cumple las reglas del identificador de prelanzamiento
que especifica semver. A veces una rama de prelanzamiento minor puede acabar
incluyendo un cambio incompatible, en cuyo caso los desarrolladores deben asegurarse de que
no hay desarrollo activo en paralelo en otra rama major,
ya que esto puede acabar con las dos ramas intentando publicar la misma versión
mayor. En general, los desarrolladores deberían tener cuidado cuando se desarrollan varias ramas
de prelanzamiento y asegurarse de que la versión que se publica al final
no entra en conflicto con otras ramas de prelanzamiento. En esos casos puede hacer falta editar
manualmente la versión al resolver un conflicto de merge en la propiedad de la versión.

## Ramas de desarrollo

Estas ramas se usan principalmente para desarrollar funcionalidades nuevas, cuando no hace falta publicar
ningún artefacto en los repositorios de paquetes hasta que se haga merge de la rama.
Se crean a partir de la rama principal o de las ramas de prelanzamiento. Los nombres de estas
ramas no deben coincidir con ninguno de los patrones descritos arriba. Los más
usados son `feature/<issue#><issueDescription>` o
`fix/<issue#><issueDescription>`. Las ramas de desarrollo se pueden renombrar
después como ramas de prelanzamiento, si el proceso de desarrollo lo requiere. Usar una
rama de desarrollo en lugar de una de prelanzamiento ayuda a evitar la publicación
excesiva de artefactos y etiquetas, que lleva más tiempo y desordena el repositorio.

## Trabajar en su funcionalidad

Antes de empezar a trabajar en su funcionalidad, siga estos pasos para ayudar a asegurar que el código base de Mojaloop se mantiene bien y está protegido frente a problemas de seguridad; tenga en cuenta que algunos de estos pasos serán necesarios para que su pull request (*PR*) pase las comprobaciones de validación de CI (como se indica abajo).

Se recomienda ejecutar `npm test` después de cada uno de estos pasos para asegurar que no se han introducido cambios incompatibles.

1. REQUERIDO - Actualizar las dependencias

   ```bash
   npm run dep:check
   ```

   >
   > IMPORTANTE
   >
   > Tome nota de cualquier dependencia que tenga actualizaciones de versión mayor, ya que pueden introducir un BREAKING CHANGE. Esto puede requerir refactorizar algo de código para acomodar el cambio.
   >
   > Consulte [Gestión de dependencias](./guide#actualizaciones-de-dependencias) para saber cómo se pueden ignorar las actualizaciones de dependencias si hace falta.
   >

   Ejecute lo siguiente para actualizar e instalar las dependencias

   ```bash
   npm run dep:update && npm i
   ```

2. REQUERIDO - Comprobaciones de vulnerabilidades

   ```bash
   npm run audit:check
   ```

[npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) se puede usar para aplicar las correcciones conocidas que estén disponibles:

   ```bash
   npm audit fix --package-lock-only
   ```

   >
   > IMPORTANTE
   >
   > Tome nota de cualquier dependencia que tenga cambios de versión, ya que pueden introducir un BREAKING CHANGE.
   >
   > Consulte [Gestión de dependencias](./guide#auditoria-de-dependencias) para obtener más información.
   >

   Si no hay una corrección disponible que funcione para el problema de vulnerabilidad, tendrá que hacer una de estas dos cosas:

   1. Si el repositorio usa [audit-ci](https://www.npmjs.com/package/audit-ci), actualice `audit-ci.jsonc` con el problema agregándolo a la `allowlist` y asegúrese de agregar un comentario que indique el motivo.
   2. Si el repositorio usa [npm-audit-resolver](https://www.npmjs.com/package/npm-audit-resolver), ejecute `npm run audit:resolve` y siga las indicaciones de la CLI para intentar corregir o ignorar el problema (si no hay corrección disponible)

3. OPCIONAL - Actualizar NodeJS a la versión `Active LTS`

   Compruebe la versión `Active LTS` según las [versiones oficiales de NodeJS](https://nodejs.org/en/about/releases).

   1. Actualice `.nvmrc`

   2. Actualice el `Dockerfile` (tanto para el contenedor *builder* como para el de *runtime*), ref. [Entorno de ejecución - 2.Sistema operativo (*SO*) del contenedor (Docker)](./guide.md#entorno-de-ejecucion).

   >
   > IMPORTANTE
   >
   > Tenga en cuenta que actualizar la versión de NodeJS puede introducir un BREAKING CHANGE. Esto puede requerir refactorizar algo de código para acomodar el cambio.
   >

## Abrir un pull request (PR)

Una vez que su funcionalidad esté lista para la revisión, cree un pull request desde su rama de funcionalidad hacia la rama `main` del repositorio de Mojaloop.

Consulte nuestras directrices para conocer los requisitos concretos al crear pull requests [aquí](../contributing/pr-guidance.md).
