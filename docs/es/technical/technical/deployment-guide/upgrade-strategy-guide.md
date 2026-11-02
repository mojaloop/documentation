---
i18n_source_sha: f7ee9a0df1fcfe68240221521596016fc1a8fa8b
---

# Guía estratégica de actualización

El presente documento ofrece instrucciones sobre cómo actualizar instalaciones existentes de la versión Mojaloop. Se parte de la base de que la versión Mojaloop ya está instalada mediante la versión Helm, aunque estas estrategias pueden aplicarse de forma general.

## Índice

- [Guía de estrategia de actualización](#upgrade-strategy-guide)
  - [Índice](#table-of-contents)
  - [Helm Actualizaciones](#helm-upgrades)
    - [Versiones sin cambios](#non-breaking-releases)
    - [Últimas noticias](#breaking-releases)
      - [Mojaloop instalado sin dependencias del backend](#mojaloop-installed-without-backend-dependencies)
        - [1. La versión de destino no presenta cambios que afecten a la compatibilidad del almacén de datos](#1-target-version-has-no-datastore-breaking-changes)
          - [Ejemplo de implementación al estilo Canary](#example-canary-style-deployment)
        - [2. La versión de destino presenta cambios en el almacén de datos que provocan incompatibilidades](#2-target-version-has-datastore-breaking-changes)
      - [Mojaloop instalado con las dependencias del backend](#mojaloop-installed-with-backend-dependencies)
        - [Ejemplo de implementación con el estilo azul-verde](#example-blue-green-style-deployment)
  - [Comandos de actualización](#upgrade-commands)
    - [Actualización a la versión 17.0.](#upgrade-to-v1700)
      - [Prueba del proceso de actualización de la versión 16.0.0 a la versión 17.0.](#testing-the-upgrade-scenario-from-v1600-to-v1700)

## Helm Actualizaciones

En esta sección se analizan las estrategias para aplicar actualizaciones a un despliegue existente de Mojaloop Helm que utiliza el [Mojaloop Helm Charts](https://github.com/mojaloop/helm).

El alcance de los cambios que afectan a la compatibilidad descritos a continuación se aplica al despliegue Helm del Operador Switch sin que ello suponga un impacto directo (es decir, sin cambios funcionales, como una nueva versión de la especificación Mojaloop API) para los participantes (por ejemplo, los proveedores de servicios financieros). Dichos cambios funcionales pueden formar parte de una versión «Helm», pero quedan fuera del ámbito de aplicación de esta sección.

Recomendaciones:

1. Todas las actualizaciones deben someterse a pruebas y verificarse en un entorno de preproducción (de pruebas o de control de calidad).
2. Consulte siempre las notas de la versión, ya que puede haber algunos problemas conocidos o indicaciones útiles que deban tenerse en cuenta al actualizar.
3. El comando [migrate:list](https://knexjs.org/#Migrations)] permite mostrar los cambios pendientes en los almacenes de datos de los siguientes repositorios:
    - <https://github.com/mojaloop/central-ledger>
    - <https://github.com/mojaloop/account-lookup-service>

### Versiones sin cambios sustanciales

Los cambios que no afectan a la compatibilidad no requerirán ninguna acción adicional o especial (salvo que se indique lo contrario en las notas de la versión), salvo la ejecución del comando estándar [Helm upgrade](https://helm.sh/docs/helm/helm_upgrade).

Tenga en cuenta los siguientes parámetros opcionales que le resultarán útiles a la hora de actualizar:

```
   -i, --install                      if a release by this name doesn't already exist, run an install
   --reuse-values                 when upgrading, reuse the last release's values and merge in any overrides from the command line via --set and -f. If '--reset-values' is specified, this is ignored
   --version string               specify a version constraint for the chart version to use. This constraint can be a specific tag (e.g. 1.1.1) or it may reference a valid range (e.g. ^2.0.0). If this is not specified, the latest version is used
```

Vea el siguiente ejemplo de cómo se pueden aplicar estos parámetros:

```bash
helm --namespace ${NAMESPACE} ${RELEASE_NAME} upgrade --install mojaloop/mojaloop --reuse-values --version ${RELEASE_VERSION}
```

Si lo desea, puede revertir los cambios mediante el comando [Helm rollback](https://helm.sh/docs/helm/helm_rollback/)].

### Últimas novedades

Existen varias estrategias que pueden emplearse a la hora de actualizar entre versiones que implican cambios importantes, en función de las siguientes topologías de despliegue:

1. Mojaloop instalado sin dependencias del backend (por ejemplo, Kafka, MySQL, MongoDB, etc.), gestionándose las dependencias del backend por separado. Esta es la opción recomendada y le proporcionará la mayor flexibilidad a la hora de actualizar, especialmente cuando se produzcan cambios que afecten a la compatibilidad.

2. Mojaloop instalado con las dependencias del backend, estando estas estrechamente vinculadas a la instalación de Helm

    > *NOTA: Este proceso quedará obsoleto a partir de la versión Mojaloop v15.0.0 (incluida la v15), aunque se ofrece compatibilidad con el despliegue de backends de ejemplo para pruebas y control de calidad. Consulte la sección [5. CAMBIOS QUE IMPLICAN INCOMPATIBILIDAD](https://github.com/mojaloop/helm/blob/master/.changelog/release-v15.0.0.md#5-breaking-changes) en las [Notas de la versión v15.0.0](https://github.com/mojaloop/helm/blob/master/.changelog/release-v15.0.0.md).*


#### Mojaloop instalado sin dependencias del backend

Esta es la topología de despliegue recomendada, ya que ofrece la mayor flexibilidad a la hora de actualizar. Al separar las dependencias del backend, permitirá desplegar la versión Mojaloop como un nuevo despliegue.

Este nuevo despliegue puede hacer referencia a las dependencias de backend existentes o bien requerirá nuevas dependencias de backend, en función de lo siguiente:

##### 1. La versión de destino no presenta cambios que afecten a la compatibilidad con el almacén de datos

En este escenario, podemos utilizar una estrategia de despliegue de tipo «Canary» configurando la nueva implementación según las dependencias del backend existente. La nueva implementación actualizará, de forma predeterminada, los esquemas de los almacenes de datos según sea necesario, ejecutando los scripts `migration` (véase [Central-ledger](https://github.com/mojaloop/central-ledger/tree/master/migrations), [Account-lookup-service](https://github.com/mojaloop/account-lookup-service/tree/master/migrations)). Como alternativa, los scripts de migración pueden desactivarse (p. ej., [central-ledger](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml#L147), configurándose de forma similar el Account Lookup Service (ALS)) si es necesario, y puede prepararse un script SQL de actualización manual (véase el comando [migrate:listcommand](https://knexjs.org/#Migrations) para enumerar los cambios pendientes) si se prefiere.

No debería producirse ninguna interrupción en el despliegue actual de «Mojaloop».

Dado que las dependencias del backend son comunes al despliegue actual y al de destino, también será posible trasladar a un subconjunto de usuarios al despliegue de destino «Mojaloop», lo que permitirá validar el nuevo despliegue con un impacto mínimo y, además, ofrecerá a los usuarios la posibilidad de volver fácilmente al despliegue actual.

###### Ejemplo de despliegue al estilo Canary

![Helm Canary Upgrade Strategy](./assets/diagrams/upgradeStrategies/helm-canary-upgrade-strategy.svg)

1. Personalice el archivo [Mojaloop values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) para la versión Mojaloop de destino que desee:
   1. Asegúrese de que las configuraciones de backend estén ajustadas a las dependencias de backend existentes (compartidas) que se han desplegado.
   2. Si procede, asegúrese de que las reglas de acceso no sobrescriban la configuración actual del despliegue
2. Implemente la versión Mojaloop (Azul)
   1. Realice el monitoreo de los registros del script de migración para detectar posibles errores de actualización a través de los contenedores «`run-migration`»:
      - `kubectl -n ${NAMESPACE} logs -l app.kubernetes.io/name=centralledger-service -c run-migration`
      - `kubectl -n ${NAMESPACE} logs -l app.kubernetes.io/name=account-lookup-service-admin -c run-migration`
3. Realice pruebas de validación en el entorno de despliegue «Current Green» (verifique el impacto de los cambios en los almacenes de datos y permita la reversión o la transición parcial para los DFSP, etc.)
4. Realice pruebas de validación en el entorno de despliegue de Target Blue
5. Realice la transición del Gateway API (o actualice las reglas de Ingress de destino) del despliegue «Verde» actual al despliegue «Azul» de destino.

##### 2. La versión de destino presenta cambios que afectan a la compatibilidad del almacén de datos

#### Mojaloop instalado sin dependencias del backend
En este caso, podemos utilizar la actualización in situ de Helm para las dependencias del backend.
Es necesario programar una ventana de mantenimiento para detener las transacciones «en vivo» en el despliegue actual, con el fin de garantizar la coherencia de los datos y permitir que la transición se lleve a cabo de forma segura. Esto provocará una interrupción, pero se puede mitigar en cierta medida asegurándose de que la ventana de mantenimiento se programe durante el horario de menor actividad.

Es muy importante realizar una copia de seguridad de la base de datos por si necesitamos volver a una versión anterior.

1. Programar el periodo de actualización
2. Realice una copia de seguridad de las bases de datos
3. Personalice el archivo [Mojaloop values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) para la versión Mojaloop de destino que desee
4. Desinstale los servicios de Mojaloop
5. Actualice las dependencias del backend utilizando 
```bash 
helm upgrade ${RELEASE_NAME} mojaloop/example-mojaloop-backend --namespace ${NAMESPACE} --version ${RELEASE_VERSION}
```
6. Instalar los servicios de Mojaloop
```bash 
helm install ${RELEASE_NAME} mojaloop/mojaloop --namespace ${NAMESPACE} --version ${RELEASE_VERSION} -f {$VALUES_FILE}
```
7. Realice pruebas de validación
8. Si necesita revertir los cambios (asegúrese de que se haya realizado una copia de seguridad de la base de datos antes de la actualización)
   1. Utilice el comando «`helm rollback`» para revertir a la versión anterior de las dependencias del backend.
   2. Cargue la base de datos desde la copia de seguridad (para garantizar que el almacén de datos se encuentre en un estado correcto)
   3. Instalar la versión anterior de los servicios de Mojaloop

#### Mojaloop, instalado con las dependencias del backend (versión 15 o anterior)

En este escenario, podemos utilizar una estrategia de despliegue de tipo «azul-verde» mediante la implementación de nuevas dependencias del backend y la implementación por separado de la versión Mojaloop (con la ventaja adicional de ajustar su despliegue a la topología de despliegue recomendada).

Será necesario realizar una migración manual de los datos desde los almacenes de datos existentes a las nuevas dependencias del backend de destino. Asimismo, será necesario mantener sincronizados los almacenes de datos actuales y los nuevos mientras se sigan procesando transacciones en producción a través del despliegue existente «Mojaloop». Es necesario programar una ventana de mantenimiento para detener las transacciones «en tiempo real» en el Despliegue actual, con el fin de garantizar la coherencia de los datos y permitir que la transición se produzca de forma segura. Esto provocará una interrupción, pero puede mitigarse en cierta medida asegurándose de que la ventana de mantenimiento se programe durante el horario de menor actividad.

##### Ejemplo de despliegue con el estilo «azul-verde»

![Helm Blue-green Upgrade Strategy](./assets/diagrams/upgradeStrategies/helm-blue-green-upgrade-strategy.svg)

1. Personalice el archivo [Mojaloop values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) para la versión Mojaloop de destino que desee:
   1. Asegúrese de que las configuraciones del backend estén ajustadas a las dependencias del backend de destino desplegado
   2. Si procede, asegúrese de que las reglas de acceso no sobrescriban la configuración actual del despliegue
2. Despliega la versión Mojaloop (Azul)
3. Cree un proceso de migración para sincronizar y transformar los datos en las dependencias del almacén de datos del backend de destino, desde «Green» a «Blue».
4. Programar la ventana de transición
5. Llevar a cabo la transición durante la ventana de tiempo
   1. Configure las dependencias actuales del almacén de datos de Green Backend como de solo lectura (siempre que sea posible)
   2. Elimine cualquier conexión restante de Green
   3. Asegúrese de que el proceso de migración esté totalmente sincronizado entre «Green» y «Blue»
   4. Realice pruebas de validación en el entorno de despliegue de Blue Target
   5. Realice la transición del Gateway API (o actualice las Reglas de Ingress de destino) del entorno de despliegue «Green Current» al entorno de despliegue «Blue Target».


## Comandos de actualización

El presente documento proporciona los comandos necesarios para actualizar las instalaciones existentes de la versión Mojaloop. Se da por supuesto que la versión Mojaloop ya está instalada mediante la versión Helm.

### Actualice a la versión 17.0.0

1. Actualice las dependencias del backend
```bash
helm upgrade backend mojaloop/example-mojaloop-backend --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```
2. Instale los servicios de Mojaloop
```bash
helm install moja mojaloop/mojaloop --namespace ${NAMESPACE} --version v17.0.0 -f ${VALUES_FILE}
```

#### Prueba del proceso de actualización de la versión 16.0.0 a la 17.0.0

1. Instale las dependencias del backend v16.0.0 con la persistencia activada (deberá crear las bases de datos manualmente, ya que los scripts de initDb no se ejecutarán)
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/example-mojaloop-backend --version 16.0.0  -f ${VALUES_FILE}
```
2. Instale los servicios de Mojaloop v16.0.0 y ejecute pruebas para generar datos en las bases de datos
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/mojaloop --version 16.0.0  -f ${VALUES_FILE}
```
3. Desinstale los servicios de Mojaloop
```bash
helm delete ${RELEASE} --namespace ${NAMESPACE}
```
4. Actualice las dependencias del backend a la versión v17.0.0 (esto actualizará las versiones de MySQL, Kafka y MongoDB)
```bash
helm --namespace ${NAMESPACE} upgrade ${RELEASE} mojaloop/example-mojaloop-backend --version 17.0.0  -f ${VALUES_FILE}
```
5. Instale los servicios de Mojaloop v17.0.0 (esto ejecutará las migraciones de Knex para actualizar los esquemas de la base de datos)
```bash
helm --namespace ${NAMESPACE} install ${RELEASE} mojaloop/mojaloop --version 17.0.0  -f ${VALUES_FILE}
```
6. Ejecute las pruebas de GP
```bash
helm test ${RELEASE} --namespace=${NAMESPACE} --logs
```


