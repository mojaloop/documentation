---
i18n_source_sha: 76b8654c8f9e781900909073adf3270309ae3cd1
---

# Auditoría de BC

El Auditing BC se encarga de mantener un registro inmutable de todas las transacciones que tienen lugar en el Switch. La arquitectura se compone de cinco componentes principales:

* Servicio Central de Registro Forense
* Servicios
* Almacén de datos inmutable
* Sistema de gestión de claves
* Proveedor criptográfico[^1] modular

Los usuarios autorizados pueden consultar el BC de auditoría mediante la operación API, habilitada a tal efecto, para obtener detalles sobre los eventos sujetos a auditoría.

## Términos

Términos con un significado específico y comúnmente aceptado dentro del contexto delimitado en el que se utilizan.

| Término | Descripción |
|---|---|
| **KMS** | Sistema de gestión de claves: proporciona servicios de cifrado y descifrado, así como de autoridad de certificación, al entorno del Switch (emisión, firma y verificación a través del centro de operaciones de seguridad).  |
| **CPM** | Módulo de proveedores de cifrado: gestiona las técnicas y metodologías criptográficas empleadas por el Switch para proporcionar servicios de cifrado y descifrado de extremo a extremo para cualquier dato almacenado o transmitido. |

## Descripción general de las funciones

![Use Case - Auditing System Functional Overview](./assets/ML2RA_Audit_bcFunctionalOverview_Mar22_1450.png)
> Diagrama funcional de BC: Descripción general del funcionamiento del sistema de auditoría

## Caso de uso

### Auditoría de BC Startup

#### Descripción

El proceso de auditoría «BC Startup UC» se activa durante el arranque (en intervalos o ante determinados eventos) y recupera todas las claves públicas que utilizan los distintos BC participantes en el Switch a partir del BC de seguridad que presta Servicios KMS a todos los BC participantes en el Switch.

#### Diagrama de flujo

![Use Case - Auditing BC Startup](./assets/ML2RA_Audit_ucAuditingBCStartup_Mar22_1450.png)
> Diagrama de flujo de trabajo de UC: Auditoría de la puesta en marcha de BC

### Auditoría de sincronización/RPC

#### Descripción

La UC de auditoría Sync/RPC se activa para los eventos sujetos a auditoría que se desencadenan durante una Transacción registrada por un BC Participante. El BC Participante procede a notificar al BC de auditoría mediante una llamada de auditoría RPC síncrona. La entrada de auditoría es firmada localmente por el BC notificante.  Tras su recepción, el BC de auditoría lleva a cabo una serie de procedimientos que incluyen la ejecución de un procedimiento KMS con el BC de seguridad y el almacenamiento del registro en un almacén de solo adición.

#### Diagrama de flujo

![Use Case - Sync/RPC Audit](./assets/ML2RA_Audit_ucSyncRPCAudit_Mar22_1450.png)
>Diagrama de flujo de trabajo de UC: Auditoría de sincronización/RPC

### Auditoría basada en eventos

#### Descripción

La UC de auditoría basada en eventos se activa cuando un BC participante que cuenta con capacidad de auditoría local detecta un evento susceptible de ser auditado, crea un evento de auditoría firmado localmente —que posteriormente publica— y, a continuación, envía un único evento o un lote de eventos al BC de auditoría.  El evento se valida durante un procedimiento con el BC de seguridad y se almacena de forma permanente en el almacén de solo adición.

#### Diagrama de flujo

![Use Case - Event Based Audit](./assets/ML2RA_Audit_ucEventBasedAudit_Mar22_1450.png)
> Diagrama de flujo de trabajo de la UC: Auditoría basada en eventos

<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]: El término «criptográfico» hace referencia a las técnicas y metodologías algorítmicas que emplean los sistemas para impedir que sistemas o personas no autorizadas accedan, identifiquen o utilicen los datos almacenados. Para más información, consulte el artículo correspondiente de Wikipedia: [Criptografía, de Wikipedia, la enciclopedia libre](https://en.wikipedia.org/wiki/Cryptography)

[^2]: Interfaces comunes: [Mojaloop Lista de interfaces comunes](../../refarch/commonInterfaces.md)
