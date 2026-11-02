---
i18n_source_sha: 68642b23fc4cc09a86395b261ad23e44f575b5c2
---

# Seguridad BC

## Descripción general

El protocolo se basa en solicitudes y respuestas, y el protocolo de transporte utilizado es el Protocolo Seguro de Transferencia de Hipertexto (HTTPS). Todos los servicios utilizan los métodos POST y GET HTTP. Tanto el cuerpo de la solicitud como el de la respuesta están codificados en texto con formato JSON.

## Términos

Términos con un significado específico y comúnmente aceptado dentro del contexto delimitado de seguridad.

| Módulo | Descripción |
|---|---|
| **Proveedores de criptomonedas** | Adaptador que proporcionará servicios criptográficos y servicios de gestión de claves |
| **IAM** | Gestión de identidades y accesos. Adaptador que proporcionará servicios de gestión de usuarios, menús, perfiles, roles y permisos.  |
| **AuthN** | Módulo de autenticación. Requiere un nombre de usuario y una contraseña, y devuelve un token «JWT».  |
| **AuthZ** | Módulo de autorización. Requiere un valor de JWT y un certificado (clave pública). Verifica JWT Roles y la firma  |
| **JWT** | JSON. Token web. Se devuelve tras una autenticación correcta del usuario. Contiene los datos del usuario, los ROLES y la firma.   |
| **KMS** | Sistema de gestión de claves. Gestiona el ciclo de vida de las claves criptográficas (definición, creación y retirada). Forma parte del subsistema «Cyrpto». |

## Caso de uso

### Inicio de sesión de usuario/operador de BC (autenticación)

#### Descripción

La función de inicio de sesión requiere que se envíen el ID de usuario y una clave secreta en el cuerpo de la solicitud HTTP. La respuesta contiene un token firmado de valor JWT. La firma la genera el subsistema Crypto. El inicio de sesión lo llevan a cabo los Servicios de Autorización o IAM.

#### Diagrama de flujo

![Use Case - BC User / Operator Login (AuthN)](./assets/ML2RA_SecAuth-ucUserOpsLogin(AuthN)_abr22_1829.png)
> Diagrama de flujo de trabajo de UC: Inicio de sesión de usuario/Operador de BC (autenticación)

### Modelo de autorización de BC (AuthZ)

#### Descripción

IAM proporcionará asociaciones entre usuarios/grupos, roles y privilegios. Cada BC contará, además, con una lista de roles relacionados. Cuando se invoca una función o un microservicio (API),
se verifica la firma (JWT) mediante la clave pública y se compara el rol proporcionado en (JWT) con el rol asociado al BC. Si la verificación de la firma y el rol se comprueban correctamente, se ejecuta la función o el microservicio (API).

#### Diagrama de flujo

![Use Case - BC Authorization Model (AuthZ)](./assets/ML2RA_SecAuth-ucAuthModel_Apr22_1829.png)
> Diagrama de flujo de trabajo de UC: Modelo de autorización de BC (AuthZ)

### BC Bootstrap

#### Descripción

Durante el proceso de arranque, el BC enviará la lista de posibles privilegios. Esto se lleva a cabo una vez por cada despliegue de una nueva versión.

#### Diagrama de flujo

![Use Case - BC Bootstrap](./assets/ML2RA_SecAuth-ucBcBootstrap-OncePerNewVer_Apr22_1829.png)
> Diagrama de flujo de trabajo de UC: BC Bootstrap

### BC Startup

#### Descripción

Al iniciarse, el BC solicitará las claves públicas de los emisores de autenticación a los subsistemas Crypto y KMS del BC de Seguridad, así como la lista de roles y privilegios al subsistema IAM del BC de Seguridad. Una función de verificación de firmas de la biblioteca criptográfica local verificará la firma JWT, y los roles de la JWT se compararán con la lista local de roles obtenida del servicio central de autorización.

##### Diagrama de flujo

![Use Case - BC Startup](./assets/ML2RA_SecAuth-ucBcStartup_Apr22_1829.png)
> Diagrama de flujo de trabajo de UC: Puesta en marcha de BC

### Asociación entre roles y privilegios

#### Descripción

Los roles están asociados a una serie de privilegios.

#### Diagrama de flujo

![Use Case - BC Startup](./assets/ML2RA_SecAuth-ucRolePriviledgeAssoc_Apr22_1829.png)
> Diagrama de flujo de trabajo de la UC: Asociación entre roles y privilegios

### Ejemplo de consulta / llamada

#### Descripción

La autenticación de cliente debe realizarse mediante un token de acceso. En primer lugar, el cliente debe solicitar al Servicio de Autorización que cree un token de acceso para el usuario que solicita acceder a la interfaz. El usuario se autentica en el Servicio de Autorización. A continuación, el token de acceso creado se utiliza para la autorización en la interfaz.
Para utilizar el token de acceso, el cliente debe establecer el encabezado «AutorizaciónHTTP» en «Bearer [access_token]» en cada solicitud enviada a la interfaz.

#### Diagrama de flujo

![Use Case - Example API Query/Call](./assets/ML2RA_SecAuth-ucExampleApiQueryCall_Apr22_1829.png)
> Diagrama de flujo de trabajo de la UC: Ejemplo nAPI: Consulta/Llamada

<!-- Footnotes themselves at the bottom. -->
<!--## Notes

[^1]: Interfaces comunes: [Mojaloop
Lista de interfaces comunes](../../commonInterfaces.md)
-->