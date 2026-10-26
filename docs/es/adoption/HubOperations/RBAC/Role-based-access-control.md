---
i18n_source_sha: 1e5bbd5eb9a9efff431d412df77cdebfb632607f
---

# Contexto del RBAC 
El Hub de Mojaloop usa un método de Control de Acceso Basado en Roles (RBAC) para mitigar el riesgo.

## ¿Qué es el RBAC y cómo diseñar para él?

El control de acceso basado en roles (RBAC) es un método de restringir el acceso a la red según los roles de cada usuario dentro de una empresa. El RBAC permite que los empleados tengan derechos de acceso únicamente a la información que necesitan para hacer su trabajo y les impide acceder a información que no les concierne.

El diseño del RBAC para un operador de hub describe los puntos de control de seguridad que deberían considerarse o ampliarse para mitigar el riesgo dentro de una organización típica de operaciones de un hub de Mojaloop. Algunos puntos de control tienen que ver con los procesos de negocio y la estructura organizativa, otros son técnicos y se refieren a las capas de identificación, autenticación y autorización, y otros requieren monitoreo. Los tres deberían considerarse para crear rendición de cuentas y mitigar el riesgo.

Este documento cubre:
1. Descripción general del RBAC.<br>
Donde tratamos los principios del RBAC y las estructuras organizativas.
2. Implementación técnica de los controles de RBAC.<br>
En concreto, qué es importante para una Implementación de Mojaloop y cómo aplicarlo técnicamente.
3. Recomendaciones de roles
4. Requisitos y enfoque del monitoreo.

## Descripción general del RBAC

### Principio de mínimo privilegio

El RBAC usa el principio de seguridad de mínimo privilegio. Mínimo privilegio significa que un usuario tiene exactamente la cantidad de privilegio necesaria para desempeñar un trabajo. El objetivo es reducir al mínimo la probabilidad de dar a un usuario permisos excesivos para realizar acciones en el ecosistema de Mojaloop.

### Implementación de Mojaloop con Confianza Cero

Una red de confianza cero es aquella en la que ninguna persona, dispositivo o red goza de confianza inherente. Toda confianza que permita acceder a información debe ganarse, y el primer paso para ello es demostrar una identidad válida. Un sistema necesita saber con seguridad quién es usted antes de poder determinar a qué debería tener acceso.

El diseño inherente de Mojaloop implementará un enfoque de Confianza Cero en su arquitectura y su despliegue, exigiendo que todas las entidades que interactúan se autentiquen primero y luego soliciten autorización para acceder a los datos y procesarlos según el rol al que pertenezcan.

### Segregación de Funciones

La Segregación de Funciones se centra en mitigar el riesgo de fraude interno fijando límites entre los roles asignados a un empleado, y frente al conflicto de interés que pueden generar las responsabilidades de un empleado, asegurando que ningún usuario pueda tener el control funcional de extremo a extremo de un proceso de negocio y de sus datos. Requiere más de una persona para crear, procesar y completar una acción.

### Auditoría

Auditoría tendría que trabajar en colaboración con el negocio y con los equipos de TI para Segregar esas funciones siempre que sea posible y asignar un control de mitigación adecuado en los casos en los que no sea factible hacerlo. Además, esos controles tendrían que monitorearse trimestralmente y los resultados tendrían que reportarse a la alta dirección.

Algunas definiciones de contexto son:
1. **Acción** : un evento concreto que dispara un usuario y que da lugar a:
   - La creación de un activo de datos
   - La lectura o el acceso a un activo de datos
   - La actualización o los cambios en el estado de un activo de datos
   - La eliminación o la retirada de un activo de datos de una aplicación o base de datos.
2. **Permiso** : autoridad para realizar una acción concreta en el contexto de una aplicación o servicio
3. **Rol** : las aplicaciones, las acciones y el acceso a datos necesarios para realizar las tareas relativas a un único rol
4. **Relación usuario-rol** : el rol (o los roles) asignados a cada usuario, que definen los permisos que tiene

## Implementación técnica del RBAC

Una persona que necesite acceder a los distintos portales de gestión del Hub de Mojaloop puede registrarse y generarse una “cuenta”, que puede usarse para acceder a diversos aspectos de una instancia operativa de un Hub de Mojaloop y para dar una base con la que auditar ese acceso vinculando las actividades al registro original. A efectos de este documento, una “cuenta” es una identidad digital, un medio de autenticar (vincular) a la persona que afirma esa identidad con el registro original, y un conjunto de atributos que incluirá, entre otras cosas, un conjunto de derechos de acceso, o derechos que se habilitan por poseer esos atributos.

El proceso de registro implica verificación de identidad, comprobación de antecedentes, etc. A la persona se le emiten entonces credenciales: un ID de cuenta de inicio de sesión o identidad digital y al menos un método de autenticación, que puede incluir una contraseña y autenticación de dos factores (2FA).

::: tip NOTA
El alcance de este documento no se limita a los operadores del Hub de Mojaloop. También aborda aspectos del acceso de los operadores de DFSP a los portales de Payment Manager.
:::

### Consideraciones sobre el 2FA

Cabe señalar que el 2FA mediante un teléfono celular puede no ser adecuado para algunos roles, ya que los roles muy sensibles pueden exigir que los teléfonos celulares queden guardados bajo llave mientras la persona está “de turno”. Esto hará necesarios otros métodos de 2FA, como los llaveros de seguridad.

### Usuarios, acciones y roles en un contexto de Mojaloop

Mojaloop tendrá 2 grandes categorías de usuarios:

1. **Humanos** <br>
Son los usuarios del hub y de los DFSP que, a través de distintas interfaces, interactuarán con Mojaloop. Los usuarios de los DFSP interactuarán con Mojaloop a través de Payment Manager y de los portales que se pondrán a disposición durante el proceso de incorporación.
2. **No humanos** <br> 
Estos automatizarán los procesos de negocio y las tareas que de otro modo haría una persona. Se comunicarán mediante llamadas a la API que ejecutarán acciones para cumplir requisitos de negocio.

El contexto de este documento se centrará únicamente en los usuarios humanos.

### Gestión del ciclo de vida del usuario

El &quot;Ciclo de Vida de la Cuenta de Usuario&quot; define el conjunto de procesos de gestión de cada cuenta de usuario. Esos procesos pueden desglosarse en Creación, Revisión/Actualización y Desactivación, o &quot;CRUD&quot;. Si una organización usa recursos de TI de cualquier tipo, depende de las cuentas de usuario para acceder a ellos.

### Incorporación

El proceso de incorporación tendrá algunas actividades que implican crear usuarios tanto del lado del DFSP como en el Hub. Serán las siguientes:

1. Hub: se crearán los siguientes usuarios
   - Operadores del Hub
   - Administradores del Hub
2. DFSP
   - Operadores del DFSP
   - Administradores del DFSP (solo aplicable a Payment Manager).


### Proceso de determinación de la Segregación de Funciones

1. Definir los flujos y los procesos de gestión de usuarios. Son todos los procesos de negocio que componen las acciones de negocio de Mojaloop en Mojaloop. Un ejemplo es la incorporación.
1. Racionalizar todos los requisitos de acceso de seguridad de los usuarios para las Aplicaciones de Mojaloop, tal como se describe en la tabla siguiente:
   - Definir las funciones de negocio y de aplicación para los usuarios y las API
   - Definir los perfiles de rol
   - Definir los perfiles de función y de competencia
   - Reunir una lista de los conflictos de SOD aplicables definiendo los roles de segregación de funciones
   - Tabla de matriz de perfiles de rol (con datos de ejemplo):

| **Matriz** de **roles y permisos** | Usuarios del Hub | Administrador | Usuario maker estándar | Usuario checker estándar | Solo lectura estándar | Usuarios del DFSP | Administrador | Usuario maker estándar | Usuario checker estándar | Solo lectura estándar |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Roles de incorporación | X | | | | | | | | | |
| Crear cuenta de usuario | X | | | | | | | | | |
| Crear perfil de DFSP | X | | | | | | | | | |
| Crear usuario de DFSP | X | | | | | | | | | |
|
| **Finance Portal** |
| Ver informes | | | X | X | X | | | X | X | X |
| Configuración de la plataforma | | | | | | | | | | |
|

3. Reconfigurar los roles que entren en conflicto
   - Aprobaciones de negocio
   - Creación de usuarios maker checker
4. Reporte periódico del Acceso al Sistema y de la Autorización de Usuarios
5. Separación de la seguridad de TI y de la seguridad de TI operativa que dará soporte a las actividades de gestión de usuarios

### Buenas prácticas para el RBAC y la gestión de identidades de Mojaloop

1. Todos los ID de usuario deberían ser únicos y tener un formato único que pueda correlacionarse en el hub pero que no sea significativo para terceros.
2. Los Usuarios de los DFSP no tendrán acceso a ningún rol administrativo del Hub
3. Debe impedirse que todos los usuarios no humanos inicien sesión en los frontales de la aplicación.
4. Los usuarios de los DFSP recibirán formación sobre los roles y las buenas prácticas
5. Imponer el aprovisionamiento automatizado de usuarios y la gestión de su ciclo de vida.
6. Clasificar las acciones que se realizan en Mojaloop para identificar las acciones de riesgo de negocio que requieren controles adicionales.
7. Los controles adicionales para mitigar los riesgos del RBAC pueden incluir:
   - Autenticación multifactor (MFA)
   - Registro de auditoría con alertas
   - Desactivación o deshabilitación automática del perfil de usuario
8. Mojaloop monitoreará la inactividad de los usuarios y deshabilitará a los usuarios inactivos durante un periodo determinado
9. Imponer la aplicación centralizada de políticas en todas las identidades, por ejemplo, política de contraseñas, políticas de inicio de sesión, MFA, autenticación basada en riesgo, etc.
10. Identificar y monitorear de cerca las identidades privilegiadas que tienen permisos para realizar acciones sensibles. 
Lo siguiente se aplica a los usuarios privilegiados:
    - Los privilegios avanzados deben solicitarse y aprobarse caso por caso;
    - Los administradores deberían tener sus permisos privilegiados durante el mínimo tiempo posible;
    - Los administradores solo deberían tener los permisos necesarios para completar una tarea concreta;
    - La pertenencia a los grupos administrativos debe revisarse con regularidad;
    - Imponer la autenticación multifactor a los usuarios administrativos;
    - Conservar los registros de acceso y las auditorías, y configurar notificaciones en tiempo real cuando se active un acceso.
11. Mojaloop configurará registros de auditoría y alertas para todas las acciones de los usuarios en Mojaloop. Donde sea posible, explorar la analítica de identidades mediante las herramientas de código abierto aplicables.

### Gestión automatizada de identidades y control del RBAC

Las herramientas preferidas para la gestión de usuarios e identidades en un despliegue de Mojaloop son:

1. **Motor de gestión de identidades KeyCloak**: almacena y procesa los controles de autenticación de la API y actúa además como gateway de API.
2. **Motor de gestión de identidades WSO2**: almacena y procesa los perfiles de rol de los usuarios e intermedia la autoincorporación de los usuarios de los DFSP.

## Diseñar los roles dentro de su organización

Un usuario con una cuenta que permite acceder al Hub tendrá roles asociados a esa cuenta, que definen lo que puede hacer una vez que se ha autenticado y ha iniciado sesión.

Muchos roles se aplican a varios portales; sin embargo, algunos roles pueden ser específicos de portales concretos.

Debería tenerse cuidado al asignar varios roles a una cuenta, o varias cuentas a una misma persona física. Esto se debe a la posibilidad que surge de eludir los controles. Parte del propósito del RBAC es asegurar que más de una persona intervenga en la cadena de autorización de las acciones importantes, reduciendo así las vulnerabilidades frente a actores maliciosos.

### Portales del ecosistema de Mojaloop

El ecosistema de Mojaloop ofrece varios portales, que admiten distintos grados de control de acceso y de RBAC. Se dividen en dos grupos:

- Portales del Hub, relacionados con la operación del propio Hub
- Portales de Payment Manager, relacionados con la gestión de la conexión de un DFSP concreto con el Hub

### El RBAC en el Hub de Mojaloop

En el entorno del Hub de Mojaloop, el RBAC se implementa mediante una combinación de herramientas: Ory Oathkeeper para la gestión de identidades y Keycloak para el control de acceso (incluidos los roles y maker/checker).

El propio Hub tiene los siguientes portales:

- **Incorporación del Operador del Hub:**<br>
Por ahora no hay una solución de Gestión de Identidades y Accesos (IAM) integrada para los operadores del Hub, aunque la función se cubre en parte mediante el uso de WSO2. Se está trabajando en desarrollar una solución IAM completa basada en Ory y Keycloak. Esto dará lugar a un operador administrador creado junto con el despliegue del Hub, que actúa como primer paso fundacional en esta área.
- **Finance Portal:** <br>
Tiene dos funciones principales: la gestión de las operaciones de liquidación y la gestión de la posición de liquidez de cada DFSP (y, en relación con esto, su valor de Límite de débito neto (NDC)).
Por ahora, el acceso al Finance Portal se limita a una función simple de control de acceso por nombre de usuario y contraseña.
- **Ciclo de vida del participante:** <br>
Controlar y configurar el acceso de los DFSP al Hub.
Desde una perspectiva técnica, por ahora esto se logra mediante el uso del Mojaloop Connection Manager (MCM). Sin embargo, se prevé que el propio MCM se desarrolle para presentar una API, que pueda usarse para desarrollar una interfaz de usuario que estaría disponible para los Operadores del Hub y para los DFSP.
- **Operaciones del Hub:** <br>
Incluyen las búsquedas de transacciones, el monitoreo del estado y del rendimiento, los tableros y las operaciones técnicas en general.
Por ahora esto se logra mediante el uso de Prometheus/Grafana y de otras herramientas, con el control de acceso estándar integrado en esas propias herramientas. Se prevé migrarlo a la solución Ory/Keycloak a medida que esta se desarrolle.

Otras operaciones del Hub, como la Gestión del Fraude y la Gestión de Casos y Disputas, son módulos adicionales que implementan su propio control de acceso para gestionar el acceso a sus funciones sensibles. No se abordan en este documento.

Además de las medidas de control de acceso anteriores, cabe señalar que el acceso a todas estas funciones solo es posible a través de una VPN, con credenciales individuales que controlan el acceso.

Además de estos portales, hay otros dos medios principales de acceder al Hub, y ninguno de los dos está sujeto al RBAC:

- El primero son las transacciones, que se controlan estrictamente conforme a sus propias medidas de ciberseguridad multicapa.
- Y el segundo son los pagos masivos (de gobierno a persona, G2P), que se sostienen mediante una API sujeta a los mismos controles que las demás transacciones individuales. Se prevé que los pagos masivos sean un servicio que se preste a los DFSP (y a sus clientes) mediante una API segura, siendo el DFSP quien opere un portal de pagos masivos para uso de sus clientes. Es posible que el operador de una instancia del Hub de Mojaloop ponga a disposición un portal de pagos masivos de marca blanca, que se conecte con la API de pagos masivos del Hub, para que lo personalice cualquier DFSP que quiera ofrecer el servicio a sus clientes. (Tenga en cuenta que no es un enfoque único: se ha propuesto un enfoque similar, por ejemplo, para los pagos a comercios, poniendo a disposición de los DFSP una aplicación de marca blanca para transacciones con código QR que puedan incorporar a sus billeteras móviles.)

Por tanto, los controles de acceso en torno a los pagos individuales o masivos no se tratan más en este documento.

### Payment Manager para la integración

Por ahora, Payment Manager es uno de los principales mecanismos para integrar a los DFSP con un Hub de Mojaloop. Mientras que el Hub es único en un esquema de pagos, hay una instancia aparte de Payment Manager para cada DFSP. Por tanto, los portales que ofrece Payment Manager deben asegurarse mediante RBAC para limitar el acceso a los representantes autorizados del DFSP.

En el entorno de Payment Manager, el RBAC se implementa únicamente mediante Keycloak.

Están disponibles los siguientes portales:

- **Incorporación de usuarios y operadores:**
Payment Manager incluye Keycloak para la IAM. Al desplegarse, se crea un único usuario administrador, que puede usarse para crear más cuentas de usuario.
- **Gestión de la conexión con el Hub:**
Incluye la capacidad de configurar la conexión con el Hub desde el lado de Payment Manager y, por extensión, de deshabilitarla. Por tanto, es una función controlada, con controles distintos para consultar y para modificar.
- **Investigación de transacciones:**
Es posible investigar consultas de transacciones usando el portal de Payment Manager. Esto es potencialmente un problema si a través del portal está disponible Información de Identificación Personal (PII).

### Cuentas fundacionales

En el momento en que un Hub se pone en marcha por primera vez, se usará Ory/Keycloak para crear una cuenta de usuario fundacional con privilegios de administrador. Esa cuenta se asignará a un administrador del sistema. Tenga en cuenta que al administrador del sistema no se le asignará ningún rol operativo más allá de los de administrador del sistema.

Todas las funciones que se realizan con Ory/Keycloak están sujetas a registro a nivel de sistema a efectos de auditoría.

El administrador del sistema usará entonces Ory/Keycloak para crear más cuentas de usuario, sujetas a las comprobaciones estándar de identidad y de antecedentes de cada persona (definidas en las Reglas del Esquema de pagos asociadas a un despliegue concreto de Mojaloop) antes de crear sus cuentas.

A esas nuevas cuentas de usuario se les asignará uno de estos roles:

- OPERATOR
- MANAGER

Una cuenta de usuario no puede tener a la vez los roles OPERATOR y MANAGER.

### Cuentas adicionales

Además del administrador del sistema, las cuentas fundacionales podrán usar Ory/Keycloak para agregar más cuentas. Sin embargo, para esos usuarios esta actividad estará sujeta a controles de maker/checker. Un usuario con el rol OPERATOR podrá dar de alta una cuenta de usuario (con procesos que aseguren que se ha hecho la debida diligencia en torno a la verificación de identidad y a las comprobaciones de antecedentes). Sin embargo, esa cuenta no se activará hasta que una persona con el rol MANAGER la apruebe.

A cada una de esas cuentas se le asignará un rol a medida que se crean. Además de los roles asociados a las cuentas fundacionales, pueden asignarse a las nuevas cuentas de usuario los siguientes roles:

- ADMINISTRATOR
- FINANCE_MANAGER

Una cuenta de usuario no puede tener más de uno de los roles OPERATOR, MANAGER, ADMINISTRATOR o FINANCE_MANAGER, con el fin de asegurar la separación de:

- La gestión financiera respecto de las demás tareas de operaciones del Hub
- Los roles de operador y de gestor en las funciones de maker/checker

::: tip NOTA
Asignar los roles ADMINISTRATOR o FINANCE_MANAGER está sujeto a un grado de verificación de identidad y de comprobación de antecedentes mayor que el de cualquier otro rol, por la naturaleza sensible de las funciones asociadas. Esas comprobaciones adicionales se establecen en las Reglas del Esquema de pagos.
:::

### Finance Portal / Business Operational Framework

Muchas funciones del Finance Portal (como consultar las posiciones de los DFSP, el estado de las ventanas de liquidación, etc.) están disponibles para todos los usuarios que hayan iniciado sesión, sea cual sea su rol. Sin embargo, las siguientes funciones solo pueden realizarlas usuarios con roles concretos:

- Procesamiento de la liquidación
  - Cerrar la ventana de liquidación
  - Iniciar la liquidación
- Gestión de la liquidez de los DFSP
  - Agregar y retirar fondos
  - Cambiar el NDC

Todas ellas están sujetas a controles de maker/checker, de modo que un usuario con el rol ADMINISTRATOR puede iniciar la acción, pero debe aprobarla un usuario con el rol FINANCE_MANAGER.

### Ciclo de vida del participante

Este portal ofrece al Operador del Hub una interfaz única para agregar y mantener DFSP en los ecosistemas del Hub.

Hay algunas funciones estandarizadas sujetas al RBAC:

- Crear un DFSP
- Crear las Cuentas de un DFSP
- Suspender un DFSP

Cada una de ellas está sujeta a controles de maker/checker, de modo que un usuario con el rol OPERATOR puede preparar los cambios, y estos deben aprobarlos un usuario con el rol MANAGER.

Además, hay una carga de trabajo importante en la incorporación técnica de un DFSP, en particular en torno al establecimiento del entorno operativo técnico (certificados, etc.). Esto no está sujeto al RBAC. No se considera un riesgo significativo, ya que no tiene valor sin poder crear un DFSP y las cuentas asociadas en el propio Hub, actividades que sí están sujetas al RBAC.

### Operaciones del Hub

El acceso a las funciones de reporte de Prometheus/Grafana no está sujeto a controles de RBAC: cualquier usuario que haya iniciado sesión y esté autenticado, con cualquier rol de RBAC asignado, puede consultar los informes y los tableros.

Crear un informe o un tablero nuevo es una función restringida, y solo está disponible para los usuarios con el rol MANAGER.

Como se ha señalado antes, los portales de operaciones y de reporte se migrarán al entorno Ory/Keycloak para facilitar estos controles.

### Payment Manager

La funcionalidad de operador de Payment Manager está sujeta a controles de RBAC, pero no se requiere maker/checker.

#### Incorporación de usuarios y operadores

Al desplegar Payment Manager se crea una única cuenta de usuario administrador usando Keycloak. Tenga en cuenta que al usuario administrador no se le asignará ningún rol operativo más allá de los de administrador del sistema.

Todas las funciones que se realizan con Keycloak están sujetas a registro a nivel de sistema a efectos de auditoría.

El usuario administrador usará Keycloak para crear más cuentas de usuario, sujetas a las comprobaciones estándar de identidad y de antecedentes de cada persona (definidas en las Reglas del Esquema de pagos asociadas a un despliegue concreto de Mojaloop) antes de crear sus cuentas.

A esas nuevas cuentas de usuario se les asignará uno de los siguientes roles:

- OPERATOR
- MANAGER

Una cuenta de usuario no puede tener a la vez los roles OPERATOR y MANAGER.

### Tableros

Los tableros de Payment Manager están disponibles para cualquier usuario que haya iniciado sesión y esté autenticado con el rol OPERATOR o MANAGER.

### Gestión de la conexión con el Hub

Consultar la configuración de la conexión entre Payment Manager y el Hub está disponible para cualquier usuario que haya iniciado sesión y esté autenticado con el rol OPERATOR o MANAGER. Sin embargo, modificar la configuración es una función controlada. Solo un usuario con el rol MANAGER puede modificarla.

### Investigación de transacciones

Llevar a cabo investigaciones de transacciones usando las facilidades del portal de Payment Manager es una actividad controlada, por la posibilidad de revelar datos PII. Por tanto, solo está disponible para los usuarios que hayan iniciado sesión y estén autenticados con el rol MANAGER.

## Monitoreo
El monitoreo es el cuarto pilar de la mitigación del riesgo del RBAC. Diseñarlo y configurarlo depende mucho de la madurez del Esquema de pagos, de las reglas del esquema de pagos, de los casos de uso que se usen y de las clases de participantes.
Como punto de partida para diseñar su monitoreo, considere estas categorías:
1. Monitoreo de amenazas de seguridad externas
1. Monitoreo de amenazas de seguridad internas, por ejemplo, auditoría
1. Monitoreo del cumplimiento de las reglas del esquema de pagos

