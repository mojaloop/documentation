---
i18n_source_sha: d992996adb4432391b1d5c0889b468c209bc0bde
---

# Implementación operativa de RBAC API

## Introducción a la implementación operativa de RBAC API

Los objetivos de esta implementación consisten en proporcionar una solución RBAC que respalde las operaciones del Hub y las funciones asociadas. La presente guía describe el diseño general y explica los fundamentos en los que se basa dicho diseño.


El diseño de seguridad:
1. implementa un control de acceso basado en roles para la versión actual Mojaloop

1. es compatible, en la medida de lo posible, con la arquitectura de referencia y, por lo tanto, con futuras versiones de Mojaloop
1. es compatible con futuros despliegues de «Infraestructura como código» (IaC)
1. proporciona un registro de actividades que puede utilizarse en una auditoría

## Detalles de la implementación de RBAC

1. A los usuarios se les asignan uno o varios roles. Un usuario puede «asumir» varios roles, siempre que se respeten las reglas establecidas.

1. A los roles se les asignan permisos

1. El proxy de identidad y acceso (Ory Oathkeeper) controla el acceso a los Endpoints en función de los permisos.

1. El backend API puede, de forma opcional, comprobar los permisos a través de Keto API.

1. En el sistema se pueden definir conjuntos de permisos mutuamente excluyentes para garantizar la separación de funciones. 


## Aplicación del modelo «Maker/checker»

Existen dos enfoques que pueden adoptarse para aplicar un flujo de validación del tipo «Maker/checker».

1. Aplique esta medida mediante roles y permisos mutuamente excluyentes a través de políticas de seguridad. Es decir, los «Maker/checker» no pueden ser al mismo tiempo «verificadores».

1. Aplicar las reglas de seguridad en la capa de aplicación; es decir, los creadores no pueden actuar también como verificadores dentro del mismo proceso de validación. Esto suele implementarse en la capa de aplicación al asignar creadores y/o verificadores tal y como se define en un flujo de procesos, y garantizando que un verificador no pueda ser la misma persona que el creador en un flujo de validación. Es decir, el código que garantiza esto se encontrará dentro de cada contexto delimitado.



::: Consejo: Responsabilidad en el RBAC

Para dar soporte a esta funcionalidad, el sistema RBAC debe proporcionar:

1. el identificador de usuario de ese contexto delimitado.

1. Un medio para comprobar la autorización, en caso necesario.

::: 

### Indicación del identificador de usuario

La configuración actual incluye el identificador de usuario en el encabezado de las llamadas «API». 

Ory Oathkeeper está configurado para utilizar un mutador «header». Este mutador «header» transformará la solicitud, lo que le permitirá enviar las credenciales a la aplicación de origen a través de los encabezados. Por ejemplo, los API backends recibirán el siguiente encabezado en las solicitudes HTTP.

```
X-User: wso2-uuid
```

Cabe señalar que los «id_token» cJWT también se admiten fácilmente modificando la configuración del mutador Ory Oathkeeper. El mutador «id_token» toma la información de autenticación (por ejemplo, el sujeto) y la transforma en un token web firmado JSON, y más concretamente en un token de identificación de OpenID Connect. Los API backends pueden verificar el token obteniendo la clave (pública) del /.well-known/jwks.json Endpoint proporcionado por Ory Oathkeeper API.

### Comprobación de la autorización

Toda la información relativa a las autorizaciones se gestiona en Ory Keto. Ory Keto dispone de un código estándar (API) al que se puede recurrir para comprobar la autorización. 

Es decir, responde a la pregunta: *«¿Tiene este token de identificación de usuario este permiso?»*


## Herramientas y normas seleccionadas

A continuación se incluye una lista de las herramientas estándar que se han seleccionado para llevar a cabo el diseño.

1. **Ory Oathkeeper** 

Se utilizará como proxy de identidad y acceso (IAP), que comprobará la autenticación y la autorización antes de conceder acceso a los Endpoints funcionales; es decir, se utilizará para aplicar el control de acceso.

2. **Ory Keto** 

Comprobará la autorización mediante las correspondencias entre sujeto y rol, y entre rol y permiso. Utiliza una estructura flexible de objetos, relaciones y sujetos, desarrollada por primera vez en Google, que permite modelar numerosos esquemas de autorización, incluido el Control de acceso basado en roles (RBAC).

3. **Ory Kratos** 

Se utilizará Ory Kratos para crear y gestionar el objeto de autorización de cookies.

4. **OpenID Connect** 

Es el estándar que se ha elegido para interactuar con un sistema de gestión de identidades. Se trata de un estándar ampliamente admitido y compatible con todas las herramientas que se utilizan actualmente en la comunidad «Mojaloop», es decir, WSO2 Identity Server (IS), Keycloak y Ory Kratos.


## Descripción general de la arquitectura

A continuación se presenta una descripción general de alto nivel de la arquitectura de la implementación de esta actualización operativa RBAC API en la versión actual Mojaloop.


![Architecture overview diagram of security bounded context implementation](../../.vuepress/public/BizOps-Framework-IaC-3.xx-&-Mojaloop-13.xx.png)

A continuación se muestra una tabla con los servicios y los roles que desempeñan.
| Servicio | Responsable de | Implementa |
| --- | --- | --- |
|**WSO2 IS KM**|Usuarios| 1. Redirección de inicio de sesión del usuario e interfaz de usuario que crea el token de cookie <br>2. Flujo estándar de código de autorización de OpenID Connect (OIDC) |
|**Ory Keto**|1. Los roles asignados a los usuarios <br> 2. El participante asignado a los usuarios| 1. API Comprobación de autorización RBAC a través de Ory Oathkeeper<br>2. API Comprobación de autorización RBAC mediante una llamada operativa API|
|**Ory Oathkeeper**|Los permisos relacionados con el acceso API | API Gateway para las API operativas con comprobaciones de autenticación y autorización|
|**Ory Kratos**|Nada|Cookie de autenticación|
|**BC Operativo API**|Los permisos relacionados con las API llamadas operativas|API funciones operativas|
|**Shim**| Nada | Redirección para configurar OIDC|
|**Rol de Operador**| Nada | Actualización de Keto para reflejar los cambios en la asignación de permisos por rol realizados en el archivo de recursos de roles|
|**Archivo de recursos de roles Kubernetes**| Los roles y las asignaciones de permisos a los roles| Las modificaciones de este archivo se controlan mediante un sistema de control de versiones (por ejemplo, GitHub o GitLab).|
|**Roles API**|Nada|1. Role-user API controla <br> (lista de usuarios, lista de roles, lista de roles asignados a usuarios, añadir un rol a un usuario, eliminar un rol de un usuario)<br> 2. Participant-user API controla <br> (lista de usuarios, lista de participantes, lista de participantes asignados a un usuario, añadir un participante a un usuario, eliminar un participante de un usuario)|

## ¿En qué medida se ajusta este diseño a la arquitectura de referencia?

Comparemos esta implementación de RBAC Operativo API con el contexto delimitado de seguridad tal y como se define en la arquitectura de referencia. Este diseño difiere de la arquitectura de referencia en cuanto a función, finalidad y enfoque, aunque, cuando ha sido pertinente, ha adoptado algunas de las ideas de diseño. La finalidad de esta implementación de RBAC es añadir una capa de seguridad a los contextos delimitados de Operativo API. El diseño del «contexto delimitado de seguridad» de la arquitectura de referencia se ha concebido para dar respuesta a los requisitos de rendimiento de las funciones de transacción críticas del «Mojaloop». 

A continuación se indican los aspectos generales en los que estos diseños difieren:

1. Las funciones de autorización están centralizadas en esta implementación de RBAC. El diseño de la arquitectura de referencia requiere una autorización distribuida que se implemente de forma independiente en cada contexto delimitado. Este nivel adicional de complejidad resulta innecesario para el caso de uso operativo API.

1. El diseño de la arquitectura de referencia requiere interfaces con otros contextos delimitados para poner en marcha la funcionalidad de autorización distribuida. Estas interfaces no se han desarrollado debido a que no existen componentes que puedan utilizarlas. 

1. La arquitectura de referencia requiere que el BC de seguridad genere sus propios tokens de seguridad. Esta implementación de RBAC utiliza los tokens generados por el IAM.

1. La arquitectura de referencia exige que los permisos se distribuyan a través del JWT a cada contexto delimitado. Aunque esto es posible de configurar en el conjunto de herramientas actual, no se ha hecho. El motivo es que algunos expertos en seguridad consideran que esta distribución de los conjuntos de permisos de usuario constituye una vulnerabilidad de seguridad, y no era un requisito para la actual implementación de RBAC.


Hay aspectos del contexto delimitado de seguridad que se han incorporado en esta implementación operativa del modelo RBAC API.
1. Cada contexto delimitado cuenta con su propio conjunto de permisos o privilegios.
1. La implementación del modelo RBAC gestiona todas las asociaciones de privilegios a los usuarios.
1. Los permisos de los roles de usuario están estructurados de tal forma que se distribuyen fácilmente dentro de un clúster de «Kubernetes».

## Compatibilidad con IaC 4.xxx

A continuación se muestra un diagrama que ilustra cómo sería la arquitectura de alto nivel si este diseño de implementación operativa RBAC API se aplicara en la próxima versión de IaC (versión IaC 4.xxx), que utiliza Keycloak y Ambassador/Envoy, entre otros cambios.


![Architecture overview diagram of security bounded context implementation](../../.vuepress/public/BizOps-Framework-IaC-4.xx-&-Mojaloop-13.xx.png)  

## Caracterización del rendimiento de la implementación de RBAC

Se llevó a cabo una caracterización del rendimiento de la implementación de RBAC POC con el fin de evaluar la magnitud de la sobrecarga de rendimiento que supone la capa de seguridad RBAC.

::: Consejo: En resumen:

El RBAC añade una sobrecarga de 10 ms por cada API comprobación de autorización por llamada. 

Si una llamada «API» concreta requiere una llamada de autorización adicional de tipo «API», la sobrecarga es de 20 ms.


En nuestras consultas de prueba, esto solía suponer:
1. menos del 5 % en el caso de las comprobaciones de autorización simples (Ory Oathkeeper y Ory Keto), 
1. y menos del 10 % en el caso de las comprobaciones de autorización dobles (Ory Oathkeeper y Ory Keto, más una llamada adicional a Ory Keto).
:::

**Detalles de la configuración de la prueba de caracterización**
En la misma infraestructura de pruebas, se realizaron llamadas cronometradas idénticas al mismo backend API, tanto directamente como a través de la implementación de RBAC.
A continuación se muestran los resultados de las llamadas de prueba realizadas al rol API con y sin RBAC, y a las transferencias POST API con y sin RBAC. El rol API cuenta con una única comprobación de autorización que se lleva a cabo a través de Ory Oathkeeper, el cual invoca a Ory Keto. La transferencia API es un grafo QL API que cuenta con un RBAC adicional.

**Estadísticas de solicitudes**

| Método |	Nombre |	# Solicitudes |	# Fallos |	Media (ms) |	Mín. (ms) |	Máximo (ms) |	Tamaño medio | (bytes)    RPS |	Fallos/s |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OBTENER |	Rol API |	321 |	0 |	248 |	221 |	499 |	604 |	9,0 |	0,0 |
| OBTENER |	Rol API: RBAC |	320 |	0 |	262 |	232 |	418 |	604 |	8,9 |	0,0 |
| Contabilización |	TransferenciasAPI |	318 |	0 |	229 |	184 |	373 |	4873 |	8,9 |	0,0 |
| Contabilización |	Transferencias: API; RBAC |	314 |	0 |	240 |	194 |	406 |	4873 |	8,8 |	0,0 |
| | **Agregado** |	**1273** |	**0** |	**245** |	**184** |	**499** |	**2723** |	**35,5** |	**0,0** |


**Estadísticas sobre el tiempo de respuesta**

| Método |	Nombre |	50.º percentil (ms) |	60.º percentil (ms) |	70.º percentil (ms) |	80.º percentil (ms) |	90.º percentil (ms) |	95.º percentil (ms) |	99.º percentil (ms) |	100.º percentil (ms) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OBTENER |	Rol API |	240 |	240 |	240 |	250 |	270 |	290 |	400 |	500 |
| OBTENER |	Rol API: RBAC |	250 |	260 |	260 |	270 |	290 |	320 |	410 |	420 |
| Contabilización |	Transferencias API |	220 |	220 |	240 |	250 |	290 |	330 |	360 |	370 |
| Contabilización |	Transferencias API RBAC |	230 |	240 |	250 |	280 |	310 |	330 |	400 |	410 |
| | **Agregado** |	**240** |	**250** |	**250** |	**260** |	**290** |	**320** |	**400** |	**500** |

## Inicio de sesión en la interfaz de usuario

Este diagrama de secuencia ilustra los eventos que tienen lugar cuando un navegador intenta acceder a un servidor backend API. 

- Si el navegador ya ha iniciado sesión, la solicitud se reenvía. 

- Si el navegador no ha iniciado sesión, se activa un flujo de autorización OIDC estándar que comienza con una redirección.


![Sequence diagram illustrating how a brower logs in](../../.vuepress/public/frontend.png) 

## Consulta de datos mediante el microfrontend operativo BC API

El siguiente diagrama de secuencia muestra más detalles sobre las interacciones cuando:

- si el token al portador es válido o no válido

- la autorización se aprueba o se rechaza


El microfrontend se representa como un cliente.

![Sequence diagram illustrating how an API client call has its authorization performed](../../.vuepress/public/client.png) 

En algunos casos, podría ser necesario que el API operativo realizara una comprobación de autorización más detallada. El siguiente diagrama de secuencia describe cómo se lleva a cabo.

Es importante señalar que no todas las API operativas requerirán este nivel de Autorización, y que el control Ory Oathkeeper puede ser necesario o no en este Caso de uso.

![Sequence diagram illustrating how an API client call has its authorization performed](../../.vuepress/public/clientgraphql.png) 

## Garantizar la separación de funciones

Esta implementación de RBAC permite garantizar la separación de funciones mediante la aplicación de conjuntos de permisos mutuamente excluyentes. La aplicación de la separación de funciones proporciona una mayor seguridad, pero puede suponer una mayor complejidad tanto para el administrador de seguridad como para los usuarios finales que utilizan el sistema. La aplicación de permisos mutuamente excluyentes puede reducir esta complejidad y facilitar su gestión.


Un ejemplo de permisos mutuamente excluyentes podría ser el caso de un usuario que pueda acceder al portal de finanzas y realizar funciones sensibles, como ingresar o retirar fondos. Dicho usuario no debería tener también acceso a las funciones de auditoría.

### Modelización de la exclusión

Esta implementación modela estos requisitos como un conjunto de permisos mutuamente excluyentes —exclusiones de permisos que se aplican de forma global—. Estas exclusiones se definen como dos conjuntos de permisos que se excluyen entre sí, lo cual resulta intuitivo y fácil de mantener.


*Justificación*
Existen tres formas posibles en las que se podría haber modelado esta exclusión, a saber:
1. Permiso: exclusiones de permisos
1. Rol de usuario: exclusiones de roles de usuario
1. Rol de usuario: exclusiones de permisos

Dado que esta funcionalidad se ha incorporado para facilitar la segregación o separación de funciones, la forma más clara de garantizar su cumplimiento es establecer una exclusión de pares de permisos que se aplique de forma global. Con todas las demás opciones, existe la posibilidad de que la exclusión pueda eludirse mediante la incorporación de un nuevo rol inclusivo. 

### Roles sintéticos frente a roles de usuarios múltiples

Esta implementación de RBAC no utiliza roles sintéticos, sino que recurre a múltiples asignaciones de roles funcionales a los usuarios.


*Justificación*
Estos son dos métodos que pueden utilizarse para modelar los permisos RBAC con permisos mutuamente excluyentes.
1. Crear dinámicamente un rol sintético para cada usuario basándose en las reglas asociadas a los roles asignados actualmente, así como a sus permisos y exclusiones.
1. Definir roles asociados a las funciones de los usuarios. Por lo tanto, a cada usuario se le deberá asignar más de un rol. Es menos probable que cambien los permisos de los roles.

Se recomienda implementar múltiples roles funcionales. Esto se debe a que este método resulta mucho más sencillo de comprender, mantener y gestionar. Identificar la causa de una pérdida de permisos en un rol sintético, debida a la asignación de múltiples roles y a la posterior aplicación de reglas, requiere un conocimiento detallado del proceso mediante el cual se calculan e implementan los roles sintéticos. Esta complejidad se evita con la segunda opción.

### Las asignaciones de roles a varios usuarios requerían una comprobación dinámica de las exclusiones

Permitir que el administrador del sistema asigne más de un rol a un usuario resulta práctico y flexible, y limita el número de roles necesarios dentro de la organización. Esto también implica que es posible infringir un permiso mutuamente excluyente al asignar roles a los usuarios. Por lo tanto, la comprobación y la aplicación de estas exclusiones deben realizarse de forma dinámica.


Hay varios momentos en los que debe realizarse esta comprobación dinámica.
1. Al asignar un rol a un usuario
1. Al aplicar una nueva definición de recursos de permisos por rol, o al aplicar una nueva política de seguridad que pueda incluir un cambio generalizado de las estructuras de permisos y roles.
::: Advertencia: Ampliación futura:
Si existe la posibilidad de que se produzca una infracción en el sistema, cada vez que se compruebe un permiso, también deberían comprobarse las infracciones de exclusión. Actualmente, esto no está previsto, ya que se da por supuesto que los puntos 1 y 2 están suficientemente implementados como para que no pueda producirse ninguna infracción.
Se recomienda incluir esta comprobación adicional en la hoja de ruta para futuras ampliaciones, ya que ello garantizaría que no se pueda realizar ninguna anulación encubierta que viole esta separación de funciones.
:::

::: Nota: 

Es posible que la autorización del control de cambios y las pruebas en entornos de prueba no detecten estas infracciones. No es posible realizar pruebas para detectar estas infracciones en entornos de prueba sin asegurarse primero de que el control de acceso de los usuarios sea idéntico en dichos entornos, lo cual no suele ser el caso.

:::

**Relación «Keto»**
Introducción de una relación que vincula dos permisos que no pueden coexistir.
```
“permission:X excludes permission:Y#allowed”
```

**Definición de recurso personalizado de exclusión de permisos**
Los recursos personalizados de exclusión de permisos son utilizados por el controlador de permisos de roles, que cargará las exclusiones en Keto mediante esta relación. Cada uno contendrá dos conjuntos de permisos, y poseer cualquier permiso de un conjunto implicará que no se podrá poseer ningún permiso del otro conjunto. Esto permite numerosos escenarios flexibles, y el escenario más sencillo —«cualquier persona que pueda hacer esta cosa no puede hacer aquella otra, y viceversa»— sigue siendo fácil de expresar.

**Comprobación de validación del operador de permisos de roles API**
El controlador de recursos de permisos de roles proporcionará un API que podrá utilizarse para comprobar si una actualización de permisos de seguridad es admisible antes de que se aplique. Dicho «API» tomará un cambio propuesto para un recurso concreto de permisos de Rol y calculará si algún usuario existente tendría permisos mutuamente excluyentes tras dicho cambio, devolviendo el resultado. Este «API» podrá ser utilizado por la interfaz de usuario administrativa y los sistemas de infraestructura de TI para realizar una «comprobación previa» de los cambios en busca de posibles problemas.

**Aplicación de cambios en los permisos de roles por parte del operador**
Cuando se modifica un recurso de permisos de rol, el Operador de permisos de rol bloqueará en primer lugar la posibilidad de modificar las asignaciones de roles de usuario; a continuación, realizará la misma comprobación que la validación API; y, si el recurso no supera dicha comprobación, no aceptará los cambios de dicho recurso, sino que mantendrá las asignaciones actuales de permisos de rol, y mostrará el problema como un error en Kubernetes API para su instrumentación y notificación.

**Comprobación de conflictos en la asignación de roles de usuario**
Cuando se asigna un rol a un usuario, la asignación de roles de usuario n.º API comprobará que el cambio no dé lugar a que el usuario tenga dos permisos mutuamente excluyentes. De ser así, el cambio se rechazará y se devolverá un error.

## Asignación de roles y derechos de acceso a los participantes a los usuarios

Esta funcionalidad se ha implementado en el servicio «Roles API». El siguiente diagrama de secuencia describe cómo se consulta y se modifica el acceso al rol de usuario y a la participación del usuario a través del servicio «Roles API». 

![Sequence diagram illustrating how roles and participant access is assigned to users](../../.vuepress/public/userroles.png) 

### RolesAPI

La siguiente tabla ofrece un resumen de los recursos de Roles API.


| Categoría | Método HTTP | Endpoint | Descripción | Códigos de error |
| --- | --- | --- | --- | --- |
| **SALUD** | | | | |
| | OBTENER | /salud | Se utiliza para devolver el estado actual del API | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTENER | /métricas | Se utiliza para devolver métricas para el API | 400, 401, 403, 404, 405, 406, 501, 503 |
| **PARTICIPANTES** | | | | |
| | OBTENER | /participantes | Se utiliza para devolver una lista de identificadores de participantes | 400, 401, 403, 404, 405, 406, 501, 503 |
| **ROLES** | | | | |
| | OBTENER | /Roles | Se utiliza para devolver una lista de identificadores de roles | 400, 401, 403, 404, 405, 406, 501, 503 |
| **USUARIOS** | | | | |
| | OBTENER | /usuarios | Se utiliza para devolver una lista de IDs de usuario | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTENER | /usuarios/{ID de usuario} |  Se utiliza para recuperar a un usuario concreto | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTENER | /usuarios/{ID}/participantes | Se utiliza para devolver una lista de participantes asignados a un usuario | 400, 401, 403, 404, 405, 406, 501, 503 |
| | PARCHE | /usuarios/{ID}/participantes | Se utiliza para asignar un participante a un usuario | 400, 401, 403, 404, 405, 406, 501, 503 |
| | OBTENER | /usuarios/{ID}/roles | Se utiliza para devolver una lista de los roles asignados a un usuario | 400, 401, 403, 404, 405, 406, 501, 503 |
| | PARCHE | /usuarios/{ID}/roles | Se utiliza para asignar un rol a un usuario | 400, 401, 403, 404, 405, 406, 501, 503 |


Puede consultar la especificación detallada de los roles API [aquí](https://docs.mojaloop.io/role-assignment-service/
).
Puede consultar el repositorio GitHub del servicio de asignación de roles [aquí](https://github.com/mojaloop/role-assignment-service).

## Asignación de permisos a roles y conjuntos de permisos mutuamente excluyentes

La asignación de permisos a los roles se almacena en un archivo de `.yml` que denominamos «archivo de recursos de roles» (`roleresource.yml`). 

El acceso y las modificaciones de estos archivos de recursos de roles se gestionarán a través de una solución de control de versiones alojada, como la GitHub o la GitLab. Esto resulta muy práctico, ya que permite conservar un historial completo de los cambios y cuenta con puntos de control configurables, tanto automáticos como manuales.

Estos archivos de recursos de roles se asignan como Kubernetes definiciones de recursos personalizados (CRD) a las que se suscribe un operador de permisos de roles. Los cambios en los archivos de recursos de roles hacen que el operador de permisos de roles actualice Ory Keto con el cambio correspondiente. Un rol puede estar representado por más de un archivo si es necesario.


Existen dos tipos de archivos de recursos de roles: el primero contiene las asignaciones de permisos de los roles y el segundo, los conjuntos de permisos mutuamente excluyentes.

A continuación se muestra un ejemplo de un archivo de asignación de permisos entre roles y recursos:
```yml
apiVersion: "mojaloop.io/v1"
kind: MojaloopRole
metadata:
  name: arbitrary-name-here
spec:
  # must match what is used in Keto, whatever that is
  role: RoleIdentifier
  permissions:
  - permission_01
  - permission_02
  - permission_03
  - permission_04'
```
El siguiente diagrama de secuencia ilustra cómo se actualiza Ory Keto.

![Sequence diagram illustrating how roles and participant access is assigned to users](../../.vuepress/public/rolepermissions.png)

## Ory Keto: detalles de implementación

Ory Keto, en este diseño, es la herramienta que se encarga de determinar si un token de inicio de sesión cuenta con la autorización adecuada para acceder a un aspecto del Sistema; es decir, se utiliza para aplicar el modelo RBAC. La implementación de esto en Keto consta de tres partes:

1. La asignación de roles a los usuarios.

Esta funcionalidad se mantendrá y actualizará desde el módulo «Roles API», que llamará a Keto y lo actualizará en consecuencia.

2. La asignación de acceso de participante a un usuario. 

Esto se refiere a los informes de acceso «DFSP», que solo deben facilitarse a los participantes configurados.

Esta funcionalidad también se mantendrá a través del módulo «Rol API», que llamará a Keto y lo actualizará en consecuencia. 

3. La asignación de permisos o privilegios a los roles. 

Esto se controlará mediante las modificaciones realizadas en un archivo GitHub `roleresource.yml`. El operador de permisos de roles Kubernetes es el servicio que realizará el monitoreo de estos archivos de roles y recursos, y actualizará Keto para que se reflejen las asignaciones.


### Asignación de roles y permisos de acceso a los participantes en Keto

La lista de usuarios (que incluye tanto a personas como a cuentas de servicio) se obtendrá de WSO2 Identity Server, y la lista de participantes, del sistema «API» ya existente para tal fin. En ambos casos, se deberá utilizar un identificador permanente y duradero como parte de las llamadas a Keto.


La lista de roles se definirá de forma fija, y a cada rol se le deberá asignar un identificador breve único que sea legible y escribible por personas, además de un nombre. La interfaz de usuario deberá mostrar tanto el identificador como el nombre, ya que el identificador será necesario para su uso en el Operador de permisos de roles.

Se utilizarán dos espacios de nombres de Keto para las llamadas: «Rol» y «Participante». Las tuplas de Keto que se utilizarán serán: 
```
role:ROLEID#member@USERID and participant:PARTICIPANTID#member@USERID 
```
(utilizando la notación empleada para [Keto/Zanzíbar](https://www.ory.sh/keto/docs/concepts/relation-tuples)

La reutilización de la relación «`"member"`» no supone ningún problema, ya que cada relación es específica de cada espacio de nombres. Si existe un término preferido para la relación «participante-usuario» distinto de «`"member"`», puede utilizarse ese término en su lugar, y debe documentarse aquí.

Para recuperar la lista de roles o participantes de un usuario concreto, se utilizará la [Consulta de tuplas de relación API](https://www.ory.sh/keto/docs/reference/rest-api#query-relation-tuples)], y se proporcionarán como parámetros el espacio de nombres, la relación y el sujeto. De este modo, se obtendrá una lista de tuplas en la respuesta, junto con un token de página siguiente si hay resultados adicionales, y los identificadores de los participantes o roles podrán leerse a partir de las tuplas resultantes.

Cuando se añade o se elimina un Rol o un Participante para un usuario, se pueden utilizar las llamadas a las tuplas de relación [create](https://www.ory.sh/keto/docs/reference/rest-api#create-a-relation-tuple) y [delete](https://www.ory.sh/keto/docs/reference/rest-api#delete-a-relation-tuple), ya que solo interviene una tupla cada vez. Si la llamada falla, pero el error no es de tipo HTTP 4xx, se debe volver a intentar un par de veces.

A continuación se muestra un ejemplo de la llamada «Keto API» que se utiliza para asignar roles a los usuarios.
::: consejo Ejemplo: Asignar un rol a un usuario en Ory Keto
PATCH /relation-tuples HTTP/1.1
Content-Type: application/json
Accept: application/json
:::

```json 
[
  {
    "action": "insert",
    "relation_tuple": {
    "namespace": "role",
    "object": "RoleIdentifier",
    "relation": "member",
    "subject": "userIdentifier"
    }
  }
]
```
Si la operación se realiza con éxito, se devuelve un mensaje «HTTP 204» sin contenido.

::: consejo NOTA

En nuestra implementación actual utilizamos el `"member"` en lugar del `"relation"`.

Utilizamos el valor «`PATCH`» en lugar de «`PUT`», ya que el valor «`PATCH`» se utiliza para la creación y/o eliminación masiva.

:::

### Cómo añadir permisos o privilegios a los roles en Keto

La asignación de permisos o privilegios a los roles en KetoThis se llevará a cabo mediante un operador Kubernetes para una definición de recurso personalizado [(CRD)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/_print/). El operador podría implementarse en prácticamente cualquier lenguaje de programación. La experiencia actual de ModusBox en materia de operadores se basa principalmente en `kopf`, un marco de trabajo de Python, pero también existen opciones en Go y Node (entre otros).


El operador debe llevar un registro de todos los recursos que gestiona, agrupados por Rol. [La funcionalidad de indexing](https://kopf.readthedocs.io/en/latest/indexing/) de Kopf resulta ideal para ello.] 

Cuando se modifica un recurso de rol, debe recopilarse la lista de permisos de dicho rol en todos los recursos de rol, y debe enviarse una modificación a través de Keto Patch [Tupletas de relaciones múltiples API](https://www.ory.sh/keto/docs/reference/rest-api#patch-multiple-relation-tuples) utilizando las acciones de parche `insert` y `delete`. Es necesario tener en cuenta todos los recursos de rol, ya que puede haber varios recursos para un mismo rol y más de uno puede incluir el mismo permiso, por lo que eliminar un recurso de rol que asigne el Rol X al permiso P no implica necesariamente que deba eliminarse la tupla de Keto correspondiente a esa conexión entre rol y permiso, ya que podría seguir existiendo otro recurso de rol que asigne el Rol X al permiso P.

Las tuplas de Keto tendrán la siguiente forma: 
```
permission:PERMISSIONID#granted@role:ROLEID#member
```

Las operaciones específicas relacionadas con la modificación de recursos son las siguientes:

1. Recupere los permisos actuales concedidos para el Rol mediante la consulta [Query Relation Tuples API](https://www.ory.sh/keto/docs/reference/rest-api/#query-relation-tuples)].

2. A partir del índice almacenado de roles y permisos, calcule las diferencias con respecto a la lista recuperada.

3. Aplique el parche a partir del archivo «diff».

4. Si surgen problemas, genere una excepción para que el problema quede registrado y se intente volver a sincronizar más adelante.



A continuación se muestra un ejemplo de la llamada «Keto API» que se utiliza para añadir permisos a los roles.
::: consejo Ejemplo: Asignar un permiso o privilegio a un rol en Ory Keto
PATCH /relation-tuples HTTP/1.1
Content-Type: application/json
Accept: application/json
:::

```json
[
  {
  "action": "insert",
  "relation_tuple": {
    "namespace": "permission",
    "object": "permissionIdentifier",
    "relation": "granted",
    "subject": "role:x#member"
  }
  }
]
```
Si la operación se realiza con éxito, se devuelve un mensaje «HTTP 204» sin contenido.

::: consejo NOTA

En nuestra implementación actual utilizamos el `"granted"` en lugar del `"relation"`.

Utilizamos el valor «`PATCH`» en lugar de «`PUT`», ya que el valor «`PATCH`» se utiliza para la creación y/o eliminación masiva.

:::

### Añadir permisos mutuamente excluyentes a Keto

Los conjuntos de permisos mutuamente excluyentes también se gestionan y modelan en Keto mediante la relación «excludes».

Las relaciones que vinculan dos permisos que no pueden coexistir se representan mediante tuplas de exclusión:

```
“permission:X excludes permission:Y#allowed”
```

::: consejo NOTA

Utilizamos el `"excludes"` en lugar del `"relation"` para definir permisos mutuamente excluyentes.

:::

### Llamada al servicio estándar «API» para comprobar la Autorización

La comprobación de si un usuario dispone de autorización para un privilegio o permiso la gestiona la Gateway «API» y, en caso necesario, puede ser realizada por cada contexto delimitado.


A continuación se muestra un ejemplo de la llamada «Keto API» que se utiliza para comprobar la autorización de un usuario en función de un permiso o privilegio.
::: consejo Ejemplo: Comprobación de la autorización en Ory Keto
POST /check HTTP/1.1
Content-Type: application/json
Accept: application/json
:::
```json
{
  "namespace": "permission",
  "object": "PermissionIdentifier",
  "relation": "granted",
  "subject": "UserIdentifier"
}
```
Esta es la respuesta que se recibe:
```json
{
"allowed": true/false
}
```
::: Nota:

No es necesario comprobar explícitamente los permisos mutuamente excluyentes mediante una llamada a Keto, ya que el sistema está diseñado de tal forma que las asignaciones de roles y permisos solo pueden definirse si no se infringen los conjuntos de permisos mutuamente excluyentes.

:::

## Ory Oathkeeper: detalles de implementación

### Configuración de Ory Oathkeeper para BizOps


[ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/next/) autoriza las solicitudes entrantes HTTP. Puede actuar como punto de aplicación de políticas (Policy Enforcement Point) en su arquitectura en la nube; es decir, como un proxy inverso situado delante de su servidor API o servidor web, que rechaza las solicitudes no autorizadas y reenvía las autorizadas a su servidor. Si desea utilizar otra Gateway API (Kong, Nginx, Envoy, AWS API Gateway, etc.), Ory Oathkeeper también puede integrarse en ella y actuar como su punto de decisión de políticas.


El gráfico Ory Oathkeeper Helm se describe en [Gráfico ORY Oathkeeper Helm | k8s](https://k8s.ory.sh/helm/oathkeeper.html) y se define en [k8s/helm/charts/oathkeeper en master · ory/k8s · GitHub](https://github.com/ory/k8s/tree/master/helm/charts/oathkeeper). El repositorio Ory Helm está documentado en [Diagramas de ORY Helm | k8s](https://k8s.ory.sh/helm/). La referencia de configuración de Ory Oathkeeper se encuentra en [Configuración | ORY Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/configuration), pero tenga en cuenta que los valores del diagrama Helm tienen formas diferentes de realizar ciertas tareas. Además, todos los valores de configuración pueden anularse mediante variables de entorno. 


El diagrama de Ory Oathkeeper Helm integra dos componentes clave en Kubernetes: el propio Ory Oathkeeper y el Ory Oathkeeper Maester. Ory Oathkeeper no mantiene estado y se rige por la configuración, y se recarga de forma transparente sin tiempo de inactividad cada vez que cambia la configuración. Ory Oathkeeper Maester es un controlador para el CRD «Rule» y agrupa los objetos «Rule» de Kubernetes en un único archivo de reglas completo que carga Ory Oathkeeper.  De forma predeterminada, se trata de un ConfigMap que Ory Oathkeeper monta, pero también se puede configurar para que se ejecute como un sidecar y utilice un montaje compartido.


Ory Oathkeeper expone dos puertos como dos servicios. Uno de ellos es el servicio «API», y el otro es el servicio «Proxy». A largo plazo, utilizaremos el servicio «API», al que accederá la Gateway de próxima generación «API» mediante la Decisión de control de acceso «API» (véase [REST API | Oathkeeper6 ) que proporciona Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/api/#access-control-decision-api); sin embargo, por el momento utilizaremos el servicio «Proxy» y lo expondremos a través de Ingress. Las URL externas a los servicios protegidos por Ory Oathkeeper apuntarán al punto de entrada del proxy de Ory Oathkeeper, que a su vez gestionará el acceso a los servicios internos en dichas URL y aplicará las reglas de control de acceso.


Ory Oathkeeper se configurará para generar y firmar un token web JSON (JWT) que contenga reclamaciones que los servicios internos puedan comprobar y verificar haciendo referencia al conjunto de claves web JSON (JWKS) que Ory Oathkeeper publicará (lo cual forma parte de la configuración) en el identificador conocido URL para JWKS en el servicio API (véase [REST API 6 | Oathkeeper](https://www.ory.sh/oathkeeper/docs/reference/api/#lists-cryptographic-keys)). Si un servicio actúa de este modo, estará operando bajo un régimen básico de «zero trust», ya que no será posible llamar a dicho servicio salvo con un token generado por Ory Oathkeeper, y Ory Oathkeeper solo generará un token si las reglas de acceso para el URL en cuestión permiten dicho acceso.



### Depuración

Las respuestas y los registros de Ory Oathkeeper suelen ser bastante informativos, así que empiece por ahí. Asegúrese de consultar los registros correspondientes a la solicitud en cuestión. Ory Oathkeeper también registrará comprobaciones de estado y datos similares. 



Algunas medidas de depuración que han resultado útiles en diversas circunstancias:


* Haga que la coincidencia sea mucho más flexible (una buena opción es sustituir toda la parte que comienza por «`<.*>`» y, a continuación, utilizar el sufijo mínimo que sea único en ese momento).


* Compruebe dos veces que cada URL interno sea el URL interno correcto, verificando que sea accesible desde el interior del Clúster mediante el curl.


* Consulte los registros del proveedor de identidad (IdP).


* Asegúrese de que los dominios y los puertos para la introspección y el Endpoint externo del token sean idénticos. Al menos a Keycloak no le gusta que no lo sean.


* Configure la regla «Ory Oathkeeper» en «https://httpbin.org/», normalmente el prefijo de ruta «`/anything`», que reflejará todo lo que reciba, lo que facilitará ver lo que verá el servicio.



### Componentes necesarios además de una tabla «Helm»


Además de la tabla «Helm», se necesitarán las siguientes piezas:

* un secreto de JWKS

* valores «Helm» anotados



#### Secreto de JWKS



Se debe crear un secreto con la clave `mutator.id_token.jwks.json` y el valor de un JWKS adecuado para su uso con Ory Oathkeeper. Se puede generar uno inicial tal y como se describe en [Configurar y realizar el despliegue | Oathkeeper](https://www.ory.sh/oathkeeper/docs/configure-deploy#cryptographic-keys)]. Contendrá tanto la clave pública como la privada.


##### Utilización del secreto de JWKS



Para rotar la clave, siga el siguiente procedimiento:

0. Anote la hora.

1. Añada un par de claves pública y privada al principio de la matriz del JWKS (asegúrese de que todas las JWK públicas tengan un `kid` único especificado) en el secreto. Se pueden eliminar todas las claves, salvo las nuevas y las primeras claves pública y privada anteriores. Esto se debe a que Ory Oathkeeper siempre firma con la primera clave.

2. Espere hasta que todas las solicitudes que Ory Oathkeeper pudiera haber recibido y autorizado hayan sido procesadas por el servicio de fondo (JWT). El principal retraso en este caso es el tiempo que tarda en propagarse la actualización del secreto, que comprende el retraso del gestor de secretos hasta que el secreto quede actualizado y el retraso del secreto hasta que se aplique al volumen actualizado, lo que probablemente suponga, como máximo, uno o dos minutos; por lo tanto, espere ese tiempo tras el momento indicado en el paso 0.

3. Si se va a eliminar la clave antigua (esto solo es necesario si se sospecha que se ha producido una filtración; de lo contrario, el paso 1 es suficiente para la rotación periódica de claves), elimínela ahora.


#### Valores «Helm» anotados



Será necesario sustituir varios elementos por las URL específicas del resto del Despliegue u otros valores. Dichos elementos se describen en los comentarios del ejemplo que figura a continuación, junto con otras observaciones.

Por el momento, aún no se ha decidido cómo configurar el ingreso del proxy, ya que será necesario modificarlo cuando la solución se incorpore a IaC 3.xxx, por lo que esa parte de la configuración sigue sin especificarse. Esto hace que el ingreso quede desactivado por defecto. Al cambiar el valor de `ingress.proxy.enabled` a `true`, se activará el ingreso del proxy. Consulte las páginas enlazadas al principio para conocer las opciones disponibles para la configuración de la entrada integrada.

Si es necesario que TLS finalice en Ory Oathkeeper, consulte las secciones `tls` de la [documentación de configuración](https://www.ory.sh/oathkeeper/docs/reference/configuration) y combínelas con los secretos y los valores `deployment.extraVolumes` y `deployment.extraVolumeMounts`.
Prometheus está en `:9000/metrics` de forma predeterminada, si se está utilizando.


```yaml

oathkeeper:
  config:
    log:
    # the maximum log level, we'll stick here or maybe debug if this is overwhelming until the config is verified
    # then, we'll determine what log level to set based on needs
    level: trace
    access_rules:
      matching_strategy: regexp
    authenticators:
      cookie_session:
        enabled: true
        config:
          # this should be the internal URL of the public Kratos service's whoami endpoint, which might look like the below
          check_session_url: http://kratos-public/sessions/whoami
          preserve_path: true
          # this means we automatically sweep up all the metadata kratos provides for use
          # in, for example, the JWT, if we ever have more
          extra_from: "@this"
          # kratos will be configured to put the subject from the IdP here
          subject_from: "identity.id"
          only:
          - ory_kratos_session
      oauth2_introspection:
        enabled: true
        config:
          introspection_url: https://whatever/the/wso2/url/is/oauth2/introspect
          introspection_request_headers:
          # see https://is.docs.wso2.com/en/latest/learn/invoke-the-oauth-introspection-endpoint/ for what credentials
          # will need to be configured here
          # also, this does not seem to be settable via environment variable, which means it is 
          authorization: "Basic SOME WORKING AUTH HERE"
          cache:
            # disabled to make debugging easier. enable for caching.
            enabled: false
            ttl: "60s"
    authorizers:
      remote_json:
        enabled: true
        config:
          # the check URL for Keto. This will be POST'd to. See https://www.ory.sh/keto/docs/reference/rest-api#operation/postCheck
          remote: http://internal-keto-url-here/check
    mutators:
      id_token:
        enabled: true
        config:
          # this should be the internal base URL for the API service, which will look something like the below
          issuer_url: http://whatever-oathkeeper-internal-is-api:4456/
    errors:
      fallback:
        - json
      handlers:
        json:
        # this gives API clients pretty error JSON
        enabled: true
        config:
          verbose: true
          redirect:
        enabled: true
        config:
          # set this to whatever the main URL is, it'll ensure that browser errors redirect there
          to: https://whatever-external-main-url-is/
          when:
          - error:
            - unauthorized
            - forbidden
            request: 
            header:
              accept:
              - text/html
secret:
  # without this we would need to put the JWKS in the config, which would mean we couldn't rotate it just by changing the secret
  manage: false
  # change to whatever is used for secret name
  name: oathkeeper-jwks
deployment:
  extraEnv:
    # for whatever reason this environment variable only gets set if the JWKS is in the config even though the rest of the secret mounting
    # and such still happens
    - name: MUTATORS_ID_TOKEN_CONFIG_JWKS_URL
    value: file:///etc/secrets/mutator.id_token.jwks.json


```

### Reglas


Será necesario crear recursos de reglas en Kubernetes para cada «coincidencia» del backend (URL expresión regular más HTTP método(s)) protegida con un permiso. El ejemplo que se ofrece a continuación sirve de orientación.


A medida que aumenta la flexibilidad para definir servicios de terceros y contextos delimitados, estos pueden establecer sus propias reglas (quizás mediante un indicador de valores Helm), que especifican qué permisos deben exigirse para cada URL. 


El mayor problema potencial en este caso es que cada coincidencia DEBE ser única. Si una solicitud coincide con varias, Ory Oathkeeper mostrará un mensaje de error. Una vez que se haya elegido un patrón general que dé lugar a expresiones regulares únicas, esto no ocurrirá, salvo en caso de error por parte del usuario.

```yaml

apiVersion: oathkeeper.ory.sh/v1alpha1
kind: Rule
metadata:
  name: a-unique-name
spec:
  version: v0.36.0-beta.4
  upstream:
    # set to whatever URL this request should be forwarded to
    url: http://internal-url-of-backend-service/
  match:
    # this might need to be http even if external is https, it depends on how ingress does things
    # my recommendation is to have a given prefix, then the "everything else in the domain name" matcher
    # so it doesn't need to be changed when the config is moved between various main domains
    # then whatever is needed for the specific path (this is set to match all subpaths)
    # regexes go in between angle brackets
    url: https://example.<[^/]*>/<.*>
    methods:
    # whatever method(s) this rule applies to
    - GET
  authenticators:
    - handler: oauth2_introspection
    # comment out this second one to not allow browser-cookie access
    - handler: cookie_session
  authorizer:
    handler: remote_json
    config:
      # these will generally be identical for all rules,
      # except "object" will be changed to the permission ID that is relevant for
      # this URL
      payload: |
      {
        "namespace": "permission",
        "object": "PERMISSION IDENTIFIER HERE",
        "relation": "granted",
        "subject_id": "{{ print .Subject }}"
      }
  mutators:
    # change this to an empty array if the id_token isn't needed, if you want
    - handler: id_token

```
### Configurar Ory Oathkeeper para que utilice Kratos como autenticador de cookies

Esta parte de la configuración anterior es aplicable. La documentación de referencia sobre los autenticadores Ory Oathkeeper se encuentra [here](https://www.ory.sh/oathkeeper/docs/next/pipeline/authn).


```yaml
    authenticators:
      cookie_session:
        enabled: true
        config:
          # this should be the internal URL of the public Kratos service's whoami endpoint, which might look like the below
          check_session_url: http://kratos-public/sessions/whoami
          preserve_path: true
          # this means we automatically sweep up all the metadata kratos provides for use
          # in, for example, the JWT, if we ever have more
          extra_from: "@this"
          # kratos will be configured to put the subject from the IdP here
          subject_from: "identity.id"
          only:
          - ory_kratos_session

```

### Configurar Ory Oathkeeper para utilizar WSO2 ISKM en la introspección de tokens

La documentación de referencia se encuentra [aquí](https://www.ory.sh/oathkeeper/docs/next/pipeline/authn).


```yaml
      oauth2_introspection:
        enabled: true
        config:
          introspection_url: https://whatever/the/wso2/url/is/oauth2/introspect
          introspection_request_headers:
          # see https://is.docs.wso2.com/en/latest/learn/invoke-the-oauth-introspection-endpoint/ for what credentials
          # will need to be configured here
          # also, this does not seem to be settable via environment variable, which means it is 
          authorization: "Basic SOME WORKING AUTH HERE"
          cache:
            # disabled to make debugging easier. enable for caching.
            enabled: false
            ttl: "60s"
```

### Configure Ory Oathkeeper para que utilice Ory Keto como su autorizador

Esta parte de la configuración anterior tiene aplicabilidad.

La documentación de referencia sobre los autorizadores de Ory Oathkeeper se encuentra [here](https://www.ory.sh/oathkeeper/docs/next/pipeline/authz).


```yaml
    authorizers:
      remote_json:
        enabled: true
        config:
          # the check URL for Keto. This will be POST'd to. See https://www.ory.sh/keto/docs/reference/rest-api#operation/postCheck
          remote: http://internal-keto-url-here/check

```

## Ory Kratos – detalles de implementación


Ory Kratos es el componente de la suite Ory Implementation que gestiona todos los flujos de autenticación.
Es altamente configurable y puede conectarse a una amplia variedad de sistemas y flujos de autenticación. La [Documentación de Kratos](https://www.ory.sh/kratos/docs/next/) explica detalladamente las posibilidades de configuración. Es decir, es probable que se adapte a sus necesidades.
En este proyecto de Workstream, solo se requieren y se han implementado los flujos de inicio y cierre de sesión de usuario. 
Es útil saber que Kratos también puede proporcionar flujos para: 
- **Inicio de sesión y registro de autoservicio:** Permite a los usuarios finales crear y acceder a cuentas (lo que denominamos «identidades») mediante combinaciones de nombre de usuario/correo electrónico y contraseña, inicio de sesión a través de redes sociales («Iniciar sesión con Google, GitHub»), flujos sin contraseña y otros.
- **Autenticación multifactor (MFA/2FA):** es compatible con protocolos como TOTP (RFC 6238 e IETF RFC 4226, más conocido como Google Authenticator)
- **Verificación de cuentas:** Verifique que una dirección de correo electrónico, un número de teléfono o una dirección física pertenezcan realmente a esa identidad.
- **Recuperación de cuentas:** Recupere el acceso mediante flujos de «Olvidé mi contraseña», códigos de seguridad (en caso de pérdida del dispositivo de MFA), etc.
- **Gestión de perfiles y cuentas:** Actualizar contraseñas, datos personales, direcciones de correo electrónico y perfiles sociales vinculados mediante flujos seguros.
- **API de administración:** Importar, actualizar y eliminar identidades.
... que podrían cobrar importancia en futuras versiones de los diseños de despliegue de IaC.


### Detalles del despliegue

El gráfico Kratos Helm se describe en [ORY Kratos Helm Chart | k8s](https://k8s.ory.sh/helm/kratos.html) y se define en [k8s/helm/charts/kratos at master · ory/k8s · GitHub](https://github.com/ory/k8s/tree/master/helm/charts/kratos). A diferencia de Ory Oathkeeper, no cuenta con ningún Maester relacionado que gestione un CRD. Sin embargo, sí requiere una base de datos (que puede ser MySQL, PostgreSQL, CockroachDB o algunas otras). El repositorio Helm es el mismo que el de Ory Oathkeeper, y está documentado en [ORY Helm Charts | k8s](https://k8s.ory.sh/helm/). Encontrará una referencia de configuración en [Configuración | Ory Kratos](https://www.ory.sh/kratos/docs/reference/configuration), aunque tenga en cuenta que el Helm chart funciona de forma ligeramente diferente.



Además de una base de datos, la otra diferencia importante en el caso de Kratos es que requiere una interfaz de usuario, en forma de una pequeña aplicación web que se encarga de mostrar en el navegador el estado actual de lo que está sucediendo con Kratos y, asimismo, de llevar a cabo la comunicación necesaria con el backend para que ello se produzca de forma segura. En nuestro caso, la interfaz de usuario que utilizaremos es muy sencilla y, de hecho, nunca llega a ser visible: lo único que hará es redirigir inmediatamente al único proveedor de identidad (IdP) OIDC que hayamos configurado y recibir la llamada de retorno correspondiente. Esta aplicación de interfaz de usuario ya se ha creado y se ha publicado como Código abierto en el repositorio `modusbox`, y ofrece imágenes Docker públicas en el registro Docker GitHub. La interfaz de usuario se puede encontrar en [GitHub - modusbox/kratos-ui-oidcer: una interfaz de usuario de Kratos para redirigir inmediatamente a un único proveedor OIDC configuradoprovider](https://github.com/modusbox/kratos-ui-oidcer), y es una aplicación en Rust muy minimalista con una excelente cobertura de pruebas y una imagen de Docker minúscula (unos 5 megabytes, https://github.com/modusbox/kratos-ui-oidcer/pkgs/container/oidcer). En la documentación de diseño anterior se denomina «Shim».

Para facilitar el alojamiento, Kratos y la interfaz de usuario deben instalarse en rutas distintas dentro del mismo dominio que la interfaz de usuario principal. Como alternativa, es posible instalarlos en un dominio diferente y configurar Kratos para que utilice cookies entre dominios. El presente documento se ha redactado partiendo de la base de que se ha optado por la estrategia del mismo dominio.

### Conexión a la interfaz de usuario principal

Se debe crear un cliente en el IdP que admita concesiones de código de autorización OIDC. Este cliente debe configurarse para redirigir bien a cualquier «URL» bajo la interfaz de usuario principal, si admite comodines, bien al «URL» específico para la ruta «`/kratos/self-service/methods/oidc/callback/idp`» (tenga en cuenta que el último segmento, «`idp`», es el ID del proveedor en la configuración, por lo que ambos deben modificarse conjuntamente). Este cliente se utilizará en la configuración de valores del gráfico de Helm.


Para poder conectarse correctamente con Kratos, la interfaz de usuario principal debe comportarse de la siguiente manera:

1. Realice una solicitud que incluya cookies al `/kratos/sessions/whoami` (documentado en [HTTP API Documentación | Ory Kratos](https://www.ory.sh/kratos/docs/reference/api/#operation/toSession)), que devuelve un código 200 y un objeto que contiene los metadatos del usuario si este ha iniciado sesión, o un código 401 si no lo ha hecho.

2. Si el usuario no ha iniciado sesión, rediríjalo inmediatamente a `/kratos/self-service/registration/browser` o facilítele un enlace a dicha página. Nota: el `registration` del URL no es un error tipográfico. Se refiere al Registro en Kratos, del que los usuarios de IdP no formarán parte inicialmente. Si el usuario ya existe, Kratos seguirá automáticamente el proceso de inicio de sesión.

3. Para cerrar sesión, asigne al usuario el valor `/kratos/self-service/browser/flows/logout`


### Valores «Helm» comentados

Esta configuración parte de la base de que el nombre del despliegue de Helm es «`kratos`», que el servicio Kratos está accesible en el puerto «`/kratos/`» en el mismo dominio que la interfaz de usuario principal y que la interfaz de usuario de Kratos está accesible en el puerto «`/auth/`» en el mismo dominio que la interfaz de usuario principal.


El gráfico «Helm» permite crear ingresos, pero esto no se explica en la documentación.

```yaml
deployment:
  extraVolumes:
  - name: extra-config
    configMap:
      name: kratos-extra-config
  extraVolumeMounts:
  - name: extra-config
    mountPath: /etc/config2
    readOnly: true
kratos:
  # NOTE: helm chart deployment does not seem to automatically pick up
  # on changes here
  identitySchemas:
    # TODO note the domain to be replaced in $id, the url doesn't need to resolve
    "identity.schema.json": |
      {
        "$id": "http://REPLACE_THIS_WITH_SOME_MEANINGFUL_DOMAIN/schema/user",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "A user",
        "type": "object",
        "properties": {
          "traits": {
            "type": "object",
            "properties": {
              "email": {
                "title": "E-Mail",
                "type": "string",
                "format": "email"
              },
              "subject": {
                "title": "Subject",
                "type": "string"
              },
              "name": {
                "title": "Name",
                "type": "string"
              }
            }
          }
        }
      }
  config:
    identity:
      default_schema_url: file:///etc/config/identity.schema.json
    courier:
      smtp:
        connection_uri: smtp://unused/
    # TODO the appropriate database DSN needs to go here, or be wired up via a secret and the environment variable `DSN`
    dsn: TODO DATABASE DSN HERE
    hashers:
      argon2:
        parallelism: 1
        iterations: 3
        # add resources and increase this amount,
        # if using passwords (vs oidc) in a production context
        memory: 17000
        salt_length: 16
        key_length: 32
    log:
      # TODO adjust after successful setup, likely down to info
      level: trace
    selfservice:
      flows:
        registration:
          # TODO if the place the UI goes changes, this needs to change
          ui_url: /auth/
          after:
            oidc:
              hooks:
              - hook: session
        logout:
          after:
            # TODO the IdP's logout URL should go here, with a redirect encoded into it if that's supported (might not work the same way, this is just an example)
            default_browser_return_url: https://idp.logout.url.here/logout/path?redirect_uri=https%3A%2F%2Fsomewhere.example.com%2F
      methods:
        oidc:
          enabled: true
          config:
            providers:
            - id: idp
              provider: generic
              # TODO both the client_id and client_secret need to be set appropriately to the client supporting authorization code grants with openid
              # TODO these can alternatively be set via environment variable from a k8s secret
              client_id: TODO
              client_secret: TODO
              mapper_url: file:///etc/config2/oidc.jsonnet
              # TODO this should be the right IdP URL to perform OIDC discovery on
              # If the IdP does not support discovery, auth_url and token_url can be set here instead
              # some IdPs may also need a requested_claims, see Kratos config documentation if there seems to be an issue
              issuer_url: https://some.public.idp.url.supporting.discovery/might/have/path/
              scope:
              # TODO adjust requested scope based on IdP (WSO2) documentation
              - openid
        password:
          enabled: false
      # TODO set this to the base URL of the main UI
      default_browser_return_url: "https://somewhere.example.com/"
    serve:
      public:
        # TODO set this to the base URL of the main UI plus the `/kratos` path, will need to be updated if the same-domain approach is not used
        base_url: "https://somewhere.example.com/kratos"
  autoMigrate: true
```
### ConfigMap de JSonnet

En los valores de Kratos Helm, se hace referencia a un ConfigMap `kratos-extra-config` que contiene JSonnet (un lenguaje de configuración) en el que se especifica cómo transformar las reclamaciones del IdP en la información que Kratos almacena sobre la persona. Dicho ConfigMap debe contener una clave `oidc.jsonnet` con el siguiente contenido:


```javascript
local claims = std.extVar('claims');

{
  identity: {
    traits: {
      email: claims.email,
      name: claims.name,
      subject: claims.sub
    },
  },
}
```

Es probable que la dirección de correo electrónico y el asunto nunca tengan que modificarse, pero con algunos proveedores de identidad (IdP), el nombre podría indicarse de forma diferente, en cuyo caso habrá que actualizar esa parte del JSonnet. Las claves del elemento «`traits`» son básicamente arbitrarias (aunque el elemento «`subject`» tiene algunas dependencias en otros lugares que habría que actualizar), siempre y cuando también se actualicen en el esquema de la configuración; sin embargo, los valores están limitados a la lista de reclamaciones probables dentro de un token de identificación OIDC, y se describen en la documentación de Kratos. Es probable que esto no sea necesario.

### Despliegue y servicio de la interfaz de usuario

El servicio también deberá estar accesible en una ruta adecuada; la configuración parte de la base de que es `/auth/`, en el mismo dominio que la interfaz de usuario principal.


```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: kratos-ui
  labels:
    app: kratos-ui
spec:
  ports:
  - name: http
    port: 80
    targetPort: http
  selector:
    app: kratos-ui

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kratos-ui
  labels:
    app: kratos-ui
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kratos-ui
  template:
    metadata:
      labels:
        app: kratos-ui
    spec:
      containers:
      - name: kratos-ui
        image: ghcr.io/modusbox/oidcer:latest
        env:
        - name: ROCKET_PORT
          value: "80"
        - name: ROCKET_REGISTRATION_ENDPOINT
          # TODO if the kratos helm chart is given a different name than kratos,
          # the domain will be different here, it should be the domain of the kratos service
          value: http://kratos-public/self-service/registration/flows
        ports:
        - name: http
          containerPort: 80
        readinessProbe:
          httpGet:
            path: /healthz
            port: 80
```
### Enlaces de referencia de Ory

- **Configuración de sesiones de inicio de sesión.** [documentación aquí](https://www.ory.sh/kratos/docs/guides/login-session)

- **Configuración de las cookies de sesión.** Información detallada sobre las cookies de sesión [documentación aquí](https://www.ory.sh/kratos/docs/guides/configuring-cookies)

- **Configuración de Kratos para CORS.** [documentación aquí](https://www.ory.sh/kratos/docs/guides/setting-up-cors)

- **Ory Kratos: integración con Ory Oathkeeper (OIDC).** [Documentación de Kratos aquí](https://www.ory.sh/kratos/docs/guides/zero-trust-iap-proxy-identity-access-proxy)

- **Ory Kratos - Integración de WSO2 con OIDC.** [documentación aquí](https://www.ory.sh/kratos/docs/guides/sign-in-with-github-google-facebook-linkedin)



