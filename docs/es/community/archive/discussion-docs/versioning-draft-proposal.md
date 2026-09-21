---
Authors: Lewis Daly, Matthew De Haast, Samuel Kummary
Proposal Name: Mojaloop Versioning Proposal
Solution Proposal Status: Draft
Created: 26-Feb-2020
Last Updated: 17-Mar-2020
Approved/Rejected Date: N/A
i18n_source_sha: 33e36e14342549f829658be7246d6b01bbb5b7c6
---

# Versionado de Mojaloop, una propuesta

_Nota: este documento es un borrador vivo de una propuesta de versionado dentro de Mojaloop. Cuando la propuesta esté lista, se enviará al CCB para su aprobación._

## Descripción general

El objetivo es producir una propuesta que mantenga el esquema de versionado sencillo de usar y claro en cuanto a los problemas de compatibilidad. No obstante, tiene que incluir también todos los detalles que necesita un ecosistema Mojaloop.

Objetivo:
Proponer un estándar para una nueva 'versión de Mojaloop' que incorpore:
1. Helm: versiones de los servicios individuales, versiones de los componentes de supervisión
2. Versiones de las API: FSPIOP API, Hub Operations / Admin API, Settlement API
3. Versiones de los esquemas internos: esquema de base de datos y versiones de la mensajería interna

## Estrategias de versionado y antecedentes (revisión de la literatura)

¿Cómo gestionan el versionado los sistemas actuales? Ofrezca una breve descripción general del espacio actual.
* La mayoría de las mejores prácticas siguen el versionado semántico para las API; esto se tratará más a fondo en [#1198](https://github.com/mojaloop/project/issues/1198)

### Muestra enfoques de despliegue sin tiempo de inactividad con Kubernetes [5]

Observaciones clave:
* para permitir los rollbacks, los servicios deben ser compatibles tanto hacia delante como hacia atrás.
las versiones consecutivas de la aplicación deben ser compatibles a nivel de esquema
* 'No desplegar nunca cambios de esquema incompatibles'; separarlos en varios despliegues

Por ejemplo, empezamos con una tabla PERSON:
```
PK  ID
    NAME
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

Y queremos desglosarla (normalizarla) en 2 tablas, PERSON y ADDRESS:

```
#person
PK  ID
    NAME

#address
PK  ID
FK  PERSON_ID
    ADDRESS_LINE_1
    ADDRESS_LINE_2
    ZIPCODE
    COUNTRY
```

Si este cambio se hiciera en una sola migración, 2 versiones distintas de nuestra aplicación no serían compatibles. En su lugar, los cambios de esquema deben desglosarse:
1. Crear la tabla ADDRESS
    * La aplicación usa los datos de la tabla PERSON como antes
    * Se dispara una copia de los datos a la tabla ADDRESS
2. ADDRESS pasa a ser la 'fuente de verdad'
    * La aplicación ya usa los datos de la tabla ADDRESS
    * Se dispara una copia de lo nuevo que se agrega a address hacia la tabla PERSON
3. Dejar de copiar datos
4. Eliminar las columnas sobrantes de la tabla PERSON

Esto significa que, por cada cambio del esquema de base de datos, habrá que crear varias versiones de la aplicación y deben hacerse varios despliegues sucesivos para llevar a cabo ese cambio.
* [5] también señala lo sencillo que hace Kubernetes desplegar un cambio así
        * despliegues de actualización progresiva
        * Consejo: ¡asegúrese de que su endpoint de salud espera a que terminen las migraciones!
* P: entonces, ¿cómo hacemos cambios grandes que tocan tanto el esquema de base de datos como la API?
        * esto parece realmente difícil y necesitaría mucha coordinación
        * Si no lo diseñamos correctamente, podría significar que un solo cambio de esquema exigiera que todos los DFSP se sumaran
             * Por eso creo que la versión de la API y la versión del servicio deberían ser independientes. Deberíamos poder
              desplegar una versión nueva de un servicio (que ejecuta una migración) y que admita una versión antigua de la API


### Usar un registro de esquemas para los mensajes de Kafka [6]

* [6] sugiere algunos enfoques, como usar un registro de esquemas para los mensajes de kafka, por ejemplo [Apache Avro](https://docs.confluent.io/current/schema-registry/index.html)
* Esto agrega cierto nivel de 'rigor' a los mensajes que producimos y ayudará a hacer cumplir el versionado
* Agrega un componente separado de 'registro de esquemas' que asegura que los mensajes se ajustan a un esquema dado. Esto en realidad no
 ayuda a hacer cumplir el versionado y nos sigue dejando el trabajo a nosotros, pero sí da más garantías sobre los formatos de los mensajes.

### Compatibilidad hacia atrás y hacia delante [3], [4]

* "El principio de robustez establece que debería ser “liberal en lo que acepta y conservador en lo que envía
”. En términos de API, esto implica cierta tolerancia en los servicios consumidores." [3]
* Compatibilidad hacia atrás frente a incompatibilidad hacia atrás [4]:
    * En general, las adiciones se consideran compatibles hacia atrás
    * Eliminar o cambiar nombres es incompatible hacia atrás
    * Es más algo que hay que valorar caso por caso, pero el [documento de diseño de API de Google](https://cloud.google.com/apis/design/compatibility) ayuda a exponer los casos.

## Ecosistema de Mojaloop
Al hablar de versionado tenemos que tener claro que estamos versionando interfaces para distintas partes.

# Propuesta
La siguiente sección expone la propuesta de versionado.

## Una “versión de Mojaloop”
Se puede definir una versión de Mojaloop **x.y**.z que englobe las versiones de las tres API incluidas (que se detallan abajo).
En la versión **x.y**.z, ‘x’ indica la versión mayor e ‘y’ una versión menor, de forma similar a los estándares de versionado de la Mojaloop FSPIOP API; ‘z’ representa la versión de ‘hotfix’ o una versión publicada con la misma versión mayor y menor x.y, pero, para mantener las cosas simples, hace falta agrupar todos los componentes incluidos en el ecosistema Mojaloop indicando qué elementos están incluidos.

En la práctica podemos decir que la versión de Mojaloop **x.y** incluye
1. Mojaloop FSPIOP API
    * Mantenida por el CCB (Change Control Board)
    * Usa el formato x.y
    * Actualmente están en preparación las versiones v1.0, v1.1 y v2.0
2. Settlement API
    * Mantenida por el CCB
    * Usará el formato x.y
    * Actualmente están en preparación las versiones v1.1 y v2.0
3. Admin / Operations API
    * Mantenida por el CCB
    * Usará el formato x.y
    * Puede usar la versión v1.0
4. Helm
    * Mantenido por la Design Authority
    * Usa el formato x.y.z
    * Versionado basado en PI (incremento de programa) + sprint.
    > *Nota:* el _versionado basado en PI + sprint_ tiene sentido en el contexto de los incrementos de programa actuales de Mojaloop, pero habrá que revisarlo más adelante.
    * Agrupa versiones compatibles de los servicios individuales
5. Esquemas internos
    * Mantenidos por la Design Authority
    * Esquema de base de datos x.y
    * Esquema de mensajería interna (Kafka) x.y

| **Mojaloop** | x.y | | |
|---|---|---|---
|   | Propietario/mantenedor | Formato | Significado |
| **API** | | | |
| - FSPIOP API | CCB | *x.y* | Mayor.Menor |
| - Settlement API | CCB | *x.y* | Mayor.Menor |
| - Admin/Operations API | CCB | *x.y* | Mayor.Menor |
| Helm | Design Authority  | *x.y.z* | PI.Sprint.Incremento |
| **Esquemas internos** | | | |
| - Esquema de base de datos | Design Authority | *x.y* | Mayor.Menor |
| - Mensajería interna | Design Authority | *x.y* | Mayor.Menor |



Por ejemplo: Mojaloop 1.0 incluye
1. API
    * FSPIOP API v1.0
    * Settlements API v1.1
    * Admin API v1.0
2. Helm v9.1.0
    * Versiones de los servicios individuales
    * Versiones de los componentes de supervisión
3. Esquemas internos
    * Esquema de base de datos v1.0
    * Versión de la mensajería interna v1.0

| **Mojaloop** | v1.0 | | |
|---|---|---|---
|   | Propietario/mantenedor | Versión |
| **API** | | | |
| - FSPIOP API | CCB | *1.0* |
| - Settlement API | CCB | *1.1* |
| - Admin/Operations API | CCB | *1.0* |
| Helm | Design Authority  | *9.1.0* |
| **Esquemas internos** | | | |
| - Esquema de base de datos | Design Authority | *1.0* |
| - Mensajería interna | Design Authority  | *1.0* |

### Ventajas

1. La ventaja de esta estrategia es sobre todo la simplicidad. Una versión dada, digamos Mojaloop v1.0, se puede usar sin más en
 los debates y remite entonces a versiones concretas de las tres API (FSPIOP, Settlements, Admin), junto con la versión de Helm que agrupa los servicios individuales que son compatibles entre sí y se pueden desplegar juntos. 
Junto con esto, las versiones de los esquemas de la base de datos y de la mensajería interna comunican si se han hecho cambios en ellos desde la versión publicada anteriormente.
2. La otra ventaja, evidentemente, es que sirve a todas las personas que puedan estar interesadas en distintos niveles de detalle
, ya sea de alto nivel o detallado. Por la naturaleza de las versiones mayor y menor, debería ser fácil para los usuarios y los adoptantes entender también los problemas de compatibilidad.

### Compatibilidad
Como se describe en la [sección 3.3 de la definición de la API v1.0](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning), que una versión sea compatible hacia atrás o no lo
 indica la versión **mayor**. Todas las versiones con la misma versión mayor deben ser compatibles, mientras que las que tengan versiones mayores distintas, muy probablemente no lo sean.

_Nota importante: es probable que los operadores del Hub tengan que admitir varias versiones de la FSPIOP API al mismo tiempo, para dar servicio a distintos participantes, ya que no se puede esperar que todos actualicen a la vez._

## Desglose de la “versión de Mojaloop”
Esta sección busca desglosar la versión de Mojaloop propuesta arriba en sus partes constitutivas y aportar respaldo a la estrategia de versionado propuesta

### API

La [especificación de Mojaloop](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#33-api-versioning) ya expone muchas de las decisiones tomadas sobre el versionado de las API.

En cuanto a las mejores prácticas comunes, hay muchos enfoques para solicitar versiones distintas, incluido agregar una
 versión en la url, pero no nos preocupemos por esto porque la especificación ya nos lo expone, usando la extensión de proveedor de HTML: [3.3.4.1 Http Accept Header](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3341-http-accept-header)

En cuanto a la negociación de versiones, la especificación también establece que, si un cliente solicita una versión no admitida
, se puede devolver un estado HTTP 406, junto con un mensaje de error que describa las versiones admitidas. [3.3.4.3 Non-Acceptable Version Requested by Client](https://github.com/mojaloop/mojaloop-specification/blob/master/documents/API%20Definition%20v1.0.md#3343-non-acceptable-version-requested-by-client)

Otra mejor práctica sobre versionado es especificar a qué nivel pueden los clientes solicitar api concretas.
* En un entorno de desarrollo, muchas API permiten especificar hasta la versión de BUGFIX, es decir, vX.X.X
* En producción, sin embargo, esto se limita solo a las versiones mayores, p. ej. v1, v2
* p. ej., la plataforma de API de Google solo admite versiones mayores, no versiones menores ni de parche
* Dadas las funcionalidades nuevas que pueden estar disponibles con la v1.1 de la API de Mojaloop, quizá queramos permitir que los participantes
 especifiquen versiones MAYOR y MENOR, es decir, vX.X. No obstante, esta práctica debería evitarse, ya que las versiones menores deberían ser compatibles hacia atrás

Los participantes que usen la misma versión MAYOR de la API deberían poder interactuar. Los participantes con versiones MAYORES
distintas no pueden interactuar. Por ejemplo, un participante con la API v1.1 puede enviar transferencias a otro participante con la v1.0, pero no a otro participante con la v2.0.

### Helm
Esta sección trata de cómo interactúan los servicios de Mojaloop dentro de un despliegue dado. Aquí intentamos plantear preguntas como "¿debería una instancia de central-ledger:v10.0.1 poder hablar con ml-api-adapter:v10.1.0? ¿Y con ml-api-adapter:v11.0.0?"? o "¿cómo nos aseguramos de que central-ledger:v10.0.1 y central-ledger:v10.1.0 hablen con la base de datos al mismo tiempo?"

Hay dos lugares donde ocurre esto:
1. Donde los servicios interactúan con el estado guardado: bases de datos MySQL Percona
2. Donde los servicios interactúan entre sí: Apache Kafka y (algunas) API internas

Esto implica que necesitamos versionar:
* el esquema de la base de datos
* los mensajes dentro de Apache kafka
    * hay que asegurarse de que los servicios correctos puedan leer adecuadamente los mensajes correctos. P. ej., ¿puede mojaloop/ml-api-adapter:v10
.1.0 publicar en kafka mensajes que mojaloop/central-ledger:v10.0.1 pueda entender?
    * P: si decidimos hacer cambios incompatibles en el formato de los mensajes, ¿cómo aseguramos que los mensajes de los flujos de kafka
 no los recojan los servicios equivocados?

### Esquemas internos

#### Base de datos

pendiente: ¿hay algo que decir aquí?

#### Kafka/mensajería
Actualmente usamos el protocolo lime para los formatos de nuestros mensajes de kafka: https://limeprotocol.org/

Consulte también el readme de mojaloop/central-services-stream para obtener más información sobre el formato de los mensajes.

El protocolo lime prevé un campo de tipo que admite declaraciones de tipo MIME. Así que potencialmente podríamos gestionar los mensajes de forma similar a la API anterior (p. ej. application/vnd.specific+json). Versionar los mensajes de esta manera significa que los consumidores que los lean tendrían que ser compatibles hacia atrás y hacia delante (las versiones consecutivas de los mensajes deben ser compatibles a nivel de esquema).
* P. ¿tiene sentido poner la versión en el topic de Kafka?
    * Un ejemplo: ml-api-adapter publica mensajes en el topic prepare
    * Si agregamos versionado a esto, ml-api-adapter:v10.0.0 publica mensajes en un topic prepare_v10.0, y una instancia nueva
     de ml-api-adapter:v10.1.0 publicará en el topic prepare_v10.1.
    * los suscriptores pueden suscribirse al topic prepare que quieran, o a los dos, según su propia tolerancia a esos
      mensajes
    * Esto puede tener efectos secundarios serios sobre el rendimiento
* Otra opción posible sería permitir un 'adaptador' de mensajes en el despliegue. Digamos que ml-api-adapter:v10.1.0 está produciendo mensajes en un topic prepare_v10.1 y no hay un central-ledger correspondiente en el despliegue que los lea; podríamos tener un adaptador que se suscriba a prepare_v10.1, los reformatee para que sean compatibles hacia atrás y los publique en prepare_v10.0 con el formato antiguo.

Un enfoque así permitiría hacer cambios incrementales de esquema en el formato de mensajería a medida que los servicios se van actualizando.

En conjunto, no encontré demasiado sobre este tema, así que probablemente tengamos que volver a él más adelante.

## Negociación de versiones
pendiente: @sam debatir cómo abordar la estrategia de negociación de versiones

## Soporte a largo plazo
pendiente: debatir cómo encaja el soporte a largo plazo en la propuesta de versionado. No creo que queramos entrar en demasiado detalle, sino más bien esbozar cómo podría ser

Mencionar la (falta de) soporte lts actual, la cadencia de PI actual

## Anexo A: definiciones

* **servicio**: Mojaloop sigue un enfoque orientado a microservicios, donde una aplicación grande se desglosa en
 microservicios más pequeños. En este caso, servicio se refiere a una aplicación en contenedor que se ejecuta como parte de un despliegue de Mojaloop. De momento, esto toma la forma de un contenedor Docker ejecutándose dentro de un clúster de Kubernetes. P. ej., mojaloop/central-ledger es el servicio central-ledger
* **versión del servicio**: la versión de un servicio dado. Actualmente no sigue el versionado semántico, pero puede que lo haga en el
 futuro, p. ej. mojaloop/central-ledger:v10.0.1. El enfoque actual se describe con más detalle en el [documento
 standards/Versioning](https://github.com/mojaloop/documentation/blob/master/contributors-guide/standards/versioning.md).
* **helm**: Helm es un gestor de paquetes de aplicaciones que se ejecuta sobre Kubernetes. También se le puede llamar el
 "despliegue". Un único despliegue de helm ejecuta muchos servicios distintos y PUEDE ejecutar varias versiones del mismo servicio simultáneamente. También nos referimos al despliegue por su repositorio, mojaloop/helm, indistintamente.
* **versión de helm**: una versión de helm es la versión de los charts de helm empaquetados, p. ej. mojaloop/helm:v1.1.0
* **interfaz**: una interfaz es el protocolo mediante el cual un switch de Mojaloop interactúa con el mundo exterior. Esto incluye
 las interacciones con los participantes (DFSP) que transfieren fondos a través del switch, los operadores del Hub que ejecutan un switch de Mojaloop y los administradores que realizan funciones administrativas.
* **api**: interfaz de programación de aplicaciones; en la mayoría de los casos se refiere a la FSPIOP-API, también conocida como Open API for FSP
 Interoperability, definida [aquí](https://github.com/mojaloop/mojaloop-specification).
* **versión de la api**: la versión de la FSPIOP-API, p. ej. FSPIOP-API v1. A efectos de este documento, se refiere al
 contrato entre un Switch de Mojaloop y los participantes (DFSP) que implementan la FSPIOP-API

## Referencias

[1] Versionado LTS dentro de nodejs. Es un gran ejemplo de estrategia de LTS y de cómo comunicar con claridad una estrategia así.
[2] Referencia del versionado semántico
[3] https://www.ben-morris.com/rest-apis-dont-need-a-versioning-strategy-they-need-a-change-strategy/
[4] https://cloud.google.com/apis/design/compatibility
[5] Nicolas Frankel - Zero-downtime deployment with Kubernetes, Spring Boot and Flyway
[6] Stackoverflow - Kafka Topic Message Versioning
