---
i18n_source_sha: b2c5c062d8610ee5bac0a4dbf7d988853e27ec86
---

# Terceros, API a. C.

El «Third Party API BC» se ha implementado con la arquitectura de referencia «Mojaloop 2.0» para permitir que los operadores «Third Party PISP» (normalmente aplicaciones) interactúen con la Plataforma. Tenga en cuenta que, salvo que se indique lo contrario, todas las referencias a BC se refieren a los distintos Mojaloop componentes o contextos delimitados (BC).

## Términos

En el presente BC se utilizan los siguientes términos habituales:

| Término | Descripción  |
| ---- | ------------ |
| **PISP** | Proveedor de servicios de iniciación de pagos (por ejemplo, PayPal, Apple Pay, Google Pay, etc.) |
| **DFSP** | Proveedor de servicios financieros digitales (por ejemplo, banco, operador de pagos móviles) |
| **Usuario** | Cliente DFSP/PISP (tal y como se indica) |

## Caso de uso

**Nota:** Nuestros casos de uso abarcan dos situaciones concretas:

| Escenarios | Descripción |
| --------- | ----------- |
| [Enlace](#linking-scenarios) | PISP. Tareas de limpieza |
| [Transferencia](#transfer-scenarios) | PISP. Actividades de inicio de la transferencia |

## Escenarios de vinculación

### PISP: DFSP compatibles

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar las solicitudes autorizadas de PISP usuario para obtener una lista de DFSP titulares de cuenta admitidos por el Sistema.

#### Diagrama de flujo

![Use Case - PISP Gets supported DFSPs](./assets/ML2RA_3PaL_ucPispGetSupportedDFSPs_Feb22a.png)
>Diagrama de flujo de la UC: PISP: Obtención de los DFSP compatibles

### PISP: Obtiene la lista de cuentas correspondientes a un DFSP + identificador

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que los usuarios PISP autorizados deseen consultar los datos de su cuenta DFSP utilizando su identificador de titular de cuenta DFSP para ello. Normalmente, el identificador está integrado en una aplicación o un proceso originado por un PISP.

#### Diagrama de flujo

![Use Case - PISP Gets list of accounts for a DFSP + Identifier](./assets/ML2RA_3PaL-ucPispGetDfspAccList&Id_Feb22-a.png)
>Diagrama de flujo de UC: PISP. Obtener la lista de cuentas para un DFSP + identificador

### PISP. Solicitud de consentimiento

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un Usuario PISP autorizado notifica a su Titular de cuenta DFSP su intención de vincular una o varias de sus cuentas a un PISP mediante una solicitud de consentimiento. La solicitud se tramita mediante un proceso fuera de banda [proceso de emisión de consentimiento](#dfsp-issue-consent) tras recibir una respuesta a la solicitud de confirmación de Autorización.  El resultado de este proceso es el establecimiento de una relación de confianza entre el PISP usuario, el PISP y el DFSP titular de la cuenta.  El Switch actualiza los datos de las cuentas de los Participantes en consecuencia.

#### Diagrama de flujo

![Use Case - PISP Consent Request](./assets/ML2RA_3PaL_ucPispConsentRequest_Feb22a.png)
>Diagrama de flujo de la UC: Solicitud de consentimiento n.º PISP

### DFSP. Consentimiento

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un Titular de cuenta DFSP responde a una solicitud de consentimiento recibida de un Usuario PISP autorizado y autenticado. El Titular de cuenta DFSP envía una solicitud al PISP a través del Switch para que el Usuario PISP cree una credencial de identificación en su dispositivo.  Tras la recepción de la credencial de identificación, verificada por el DFSP titular de la cuenta emisor, tanto los registros del Switch como los del DFSP titular de la cuenta se actualizan con la credencial del PISP usuario y las cuentas vinculadas, y se notifica al PISP usuario que su(s) DFSP cuenta(s) del titular de la cuenta ha(n) sido vinculada(s) correctamente a su PISP perfil.

***Nota:*** *La cuestión del consentimiento responde a una solicitud de consentimiento presentada por un usuario autorizado PISP para vincular una o varias de sus cuentas de titular DFSP a su perfil PISP, y sigue el flujo de trabajo indicado en la [PISP Solicitud de consentimiento](#pisp-consent-request) UC anterior*

#### Diagrama de flujo

![Use Case - DFSP Issue Consent](./assets/ML2RA_3PaL_ucDfspIssueConsent_Feb22a_P1&2.png)
>Diagrama de flujo de la UC - Consentimiento para la emisión de un número DFSP

### Desvincular cuentas: Autenticación alojada en Hub

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar una solicitud autorizada del Titular de la cuenta PISP/DFSP para revocar el consentimiento relativo a la vinculación de la cuenta del Titular de la cuenta DFSP a su perfil PISP; ante ello, el Switch actúa actualizando el Account Lookup Service (ALS) para desvincular la asociación entre el PISP Participant/DFSP cuenta, y notificando tanto al DFSP titular de la cuenta (que elimina la entrada del Participante en el ALS y el enlace de su Sistema) como al PISP proveedor de servicios, quien envía una Notificación de Fulfilment al usuario.

#### Diagrama de flujo

![Use Case - Unlink Accounts - Hub Hosted Auth](./assets/ML2RA_3PaL_ucUnlinkAccounts-HubHostAuth_Feb22-a_P1&2.png)
>Diagrama de flujo de trabajo de UC: Desvincular cuentas - Autenticación alojada en el Hub

### Vincular cuentas: error al detectar la cuenta

#### Descripción

El flujo de trabajo que ofrece este UC permite al Switch gestionar los casos en los que un usuario PISP autorizado inicia una solicitud para vincular una cuenta DFSP a su perfil PISP utilizando un par DFSP/Identifier no válido que no es reconocido por el DFSP. El DFSP envía un mensaje de error al Switch, que notifica al PISP correspondiente, y el usuario recibe un mensaje para que pruebe con otro par DFSP/Indentifier.

#### Diagrama de flujo

![Use Case - Link Accounts - Account Discovery Failure](./assets/ML2RA_3PaL-ucLinkAccnts-AccntDiscoveryFail_Mar22-a.png)
>Diagrama de flujo de UC: Vinculación de cuentas - Error en la detección de cuentas

### Vincular cuentas: DFSP rechazos de la solicitud de consentimiento

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar correctamente los casos en los que un usuario «PISP» autorizado solicita que el titular de la cuenta «DFSP» vincule una o varias cuentas a su perfil «PISP».  En caso de que el «DFSP» titular de la cuenta deniegue su consentimiento para que se lleve a cabo la vinculación por cualquier motivo —por ejemplo, si una cuenta seleccionada no admite la vinculación—, enviará un mensaje al «Switch» indicando una condición de error.  El Switch notifica al PISP correspondiente, y el PISP Usuario recibe un mensaje, ya sea dentro de la aplicación o por otro medio, para que vuelva a intentar su solicitud, ya que la solicitud anterior de vinculación de cuentas ha fallado.

#### Diagrama de flujo

![Use Case - Link Accounts - DFSP Rejects Consent Request](./assets/ML2RA_3PaL-ucLinkAccnts-DfspRejectConsentReq_Mar22-a.png)
>Diagrama de flujo de UC: Vincular cuentas - DFSP rechazos de la solicitud de consentimiento

### Error en el registro de las credenciales

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un Titular de cuenta DFSP envía al PISP una solicitud para que un (PISP) Usuario cree una credencial integrada en el dispositivo con el fin de confirmar una Solicitud de consentimiento, y en los que la credencial, al enviarse al DFSP, incluye bien un desafío firmado no válido, bien metadatos firmados que son rechazados.  En este caso, el DFSP comunica la condición de error al Switch, el cual a su vez informa al PISP correspondiente, quien notifica al (PISP) usuario que la credencial de consentimiento ha sido rechazada.

#### Diagrama de flujo

![Use Case - Credential Registration Error](./assets/ML2RA_3PaL-ucCredentialRegError_Mar22-a_P1&2.png)
>Diagrama de flujo de UC: Error en el registro de credenciales

### Desvincular cuentas: no se ha encontrado el consentimiento

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que se solicita a un usuario PISP autorizado que confirme una solicitud de consentimiento emitida a través del titular de la cuenta PISP o DFSP para desvincular su cuenta DFSP de su perfil PISP. El Switch remite la respuesta a la solicitud de consentimiento al Oracle de Consentimiento para que confirme el ID de usuario del titular del consentimiento.  En los casos en que el Oracle no pueda confirmar el identificador del titular del consentimiento, la solicitud se rechaza. Se avisa al usuario PISP, a través del titular de la cuenta DFSP o del titular del perfil PISP, de que no se ha encontrado la cuenta DFSP que pretendía desvincular de su perfil PISP.

#### Diagrama de flujo

![Use Case - Unlink Accounts - Consent not found](./assets/ML2RA_3PaL-ucUnlinkAccnts-ConsentNotFound_Mar22a.png)
>Diagrama de flujo de UC: Desvincular cuentas — No se ha encontrado el consentimiento

### El DSPF rechaza el token OTP/de autenticación de PISP

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un usuario autorizado (PISP) solicita que una o varias de sus cuentas de titular (DFSP) se vinculen a su perfil (PISP).  El Switch dirige la solicitud alDFSP titular de la cuenta, quien envía un flujo de inicio de sesión web con OTP alPISP usuario con fines de verificación; dicho flujo se devuelve a través delPISP al Switch y, a continuación, alDFSP titular de la cuenta para que dé su consentimiento.  En los casos en que el token de respuesta se haya modificado o haya caducado, el DFSP titular de la cuenta envía un mensaje de error al Switch y se notifica al PISP usuario que la DFSP solicitud de vinculación de la cuenta ha fallado.

#### Diagrama de flujo

![Use Case - DFSP Rejects OTP/Auth Token from PISP](./assets/ML2RA_3PaL-ucDfspRejectsOtpAuthTokenFromPisp_Mar22-a_P1&2.png)
>Diagrama de flujo de UC: DFSP rechaza el token OTP/de autenticación procedente de PISP

### Desvincular cuentas: error en la fase posterior

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar aquellos casos en los que la confirmación del consentimiento para desvincular la cuenta DFSP de un usuario PISP autorizado no supera el proceso de Autenticación/Autorización del Switch por cualquier motivo, por ejemplo: un error FSPIOP API en una etapa posterior.  El Switch comunica el error al DFSP titular de la cuenta, quien lo revisará y determinará cómo responder.  Cuando se produce un error, el Switch notifica al PISP usuario, a través del PISP, que su solicitud de desvincular su DFSP cuenta ha fallado.

#### Diagrama de flujo

![Use Case - Unlink Accounts - Downstream Failure](./assets/ML2RA_3PaL-ucUnlinkAccntsDownstrmFail_Mar22-a_P1&2.png)
>Diagrama de flujo de UC: Desvincular cuentas — Fallo en la fase posterior

## Escenarios de transferencia de datos

***Nota:*** *Con el fin de simplificar esta descripción del flujo de trabajo, se debe tener en cuenta que el BC de terceros «API» y el BC de pagos iniciados por terceros funcionan de forma coordinada para mantener la información de los participantes. La interacción entre ambos BC no se indicará específicamente, pero es la siguiente: cuando el BC «Tercero API» actualiza el estado de la transacción y la información de los participantes no se almacena en caché, el BC «Pagos iniciados por terceros» solicitará la información de los participantes que falte al BC «Gestión del ciclo de vida de los participantes» y la remitirá al BC «Tercero API» para que se incluya en la información de la transacción que se presenta a los sistemas DFSP/PISP/

### Solicitud de transacción iniciada por una parte tercera

#### Descripción

El flujo de trabajo que ofrece esta UC permite que el Switch autorice a los usuarios o aplicaciones PISP a enviar una solicitud a DFSP para que este ejecute una transacción en nombre de un titular de la cuenta transaccional —normalmente el usuario o aplicación PISP— a favor de uno o varios destinatarios externos.  La transacción se verifica mediante una solicitud de confirmación (DFSP) dirigida al titular de la cuenta y se completa una vez recibida la confirmación. El Switch, siguiendo las instrucciones (DFSP), gestiona la transacción y actualiza todas las cuentas en consecuencia.

Entre las aplicaciones sugeridas de la iniciativa de pago por terceros (UC) se incluyen:

 - Pagos entre particulares (por ejemplo: GPay en la India)
 - Sistemas de pago en línea que garantizan una experiencia de usuario final (UX) fluida (p. ej.: PayPal)
 - Software de compensación de nóminas

#### Diagrama de flujo

![Use Case - Third Party Initiated Transaction Request](./assets/ML2RA_3PaT-ucThirdPartyInitTransactReq_Mar22-a_P1P2P3bP4.png)
>Diagrama de flujo de trabajo de la UC: Solicitud de transacción iniciada por un tercero

### PISP. Solicitud de transacción masiva

#### Descripción

El flujo de trabajo que ofrece esta UC permite que el Switch autorice a los usuarios/aplicaciones PISP a enviar una solicitud a un DFSP para que este ejecute una serie de transacciones masivas en nombre de un titular de cuenta —normalmente el usuario/aplicación PISP— a favor de un grupo de destinatarios terceros.  La transacción se verifica mediante una solicitud de confirmación (DFSP) enviada al titular de la cuenta, y se completa una vez recibida la confirmación. El Switch, siguiendo las instrucciones (DFSP), gestiona la transacción y actualiza todas las cuentas en consecuencia.

#### Diagrama de flujo

![Use Case - Example REPLACE ME](./assets/ML2RA_3PaT-ucThirdPartyInitTransactReq_Mar22-a_P1P2P3bP4.png)
>Diagrama de flujo de trabajo de la UC: Solicitud de transacción masiva n.º PISP

### Pagar a un PISP - PISP como Beneficiario

#### Descripción

El flujo de trabajo que ofrece esta UC permite que el Switch autorice a los usuarios DFSP a iniciar y ejecutar pagos a favor de los PISP como beneficiarios a través del Switch. El flujo de trabajo admite pagos tanto a un único beneficiario como a varios PISP beneficiarios.

#### Diagrama de flujo

![Use Case - Pay to a PISP - PISP as a Payee](./assets/ML2RA_3PaT-ucPayToPisp-PispAsPayee_Mar22-b_P1-2.png)
>Diagrama de flujo de la UC: Pago a un PISP - PISP como Beneficiario

### Error en la solicitud de transacción con terceros: error en la búsqueda de la parte

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un usuario «PISP» autorizado inicia una transacción utilizando un Identificador de parte no válido. El Switch detecta el error durante la fase «Get Parties» de la preparación de la transacción y cancela automáticamente la solicitud, enviando una Notificación al usuario que la originó en la que se indica el fallo y el motivo.

#### Diagrama de flujo

![Use Case - Example REPLACE ME](./assets/ML2RA_3PaT-ucTransactReqFail-BadPartyLookup_Mar22-b.png)
>Diagrama de flujo de UC: Fallo en la solicitud de transacción con terceros — Error en la búsqueda de la parte implicada

### Error en la solicitud de transacción de terceros: solicitud de transacción incorrecta

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un usuario autorizado «PISP» inicia una solicitud de transacción de terceros, confirma correctamente los datos del Beneficiario, pero el Beneficiario «DFSP» no logra localizar un acuerdo válido para la transacción.  El Switch rechaza la solicitud y envía una Notificación al usuario que la ha originado, indicando el fallo y las medidas de seguimiento recomendadas.

#### Diagrama de flujo

![Use Case - Third Party Transaction Request Failed - Bad Transaction Request](./assets/ML2RA_3PaT-ucTransactReqFail-BadTransactReq_Mar22-b.png)
>Diagrama de flujo de UC: Fallo en la solicitud de transacción de terceros — Solicitud de transacción incorrecta

### Error en la solicitud de transacción de terceros: error de FSPIOP en la fase posterior

#### Descripción
El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un usuario con autorización (PISP) solicita y confirma una solicitud de transacción que, al remitirse al titular de la cuenta transaccional (DFSP), falla por algún motivo durante el proceso de cotización. El Switch recibe una alerta sobre el fallo y envía una Notificación al usuario (PISP) a través de su aplicación o proceso (PISP).

#### Diagrama de flujo

![Use Case - Third Party Transaction Request Failed - downstream FSPIOP failure](./assets/ML2RA_3PaT-ucTransactReqFail-DownStreamFspiopFail_Mar22-b-P1-2.png)
>Diagrama de flujo de UC: Fallo en la solicitud de transacción de terceros - Fallo en la fase posterior (FSPIOP)

### Error en la solicitud de transacción de terceros: la Autorización no era válida

#### Descripción

El flujo de trabajo que ofrece este UC permite al Switch gestionar los casos en los que se inicia un proceso de transacción de terceros, que posteriormente es autorizado por un PISP Usuario a petición del DFSP Titular de la cuenta, y el Switch detecta que la DFSP respuesta a la solicitud de verificación recibida contenía una firma no válida.  A continuación, el Switch puede verificar que se ha producido el error y notificárselo alDFSP titular de la cuenta, quien, a su vez, cancela la transacción y notifica alPISP usuario a través del Switch y de suPISP titular del perfil.

#### Diagrama de flujo

![Use Case - Third Party Transaction Request Failed - authorization was invalid](./assets/ML2RA_3PaT-ucTransactReqFail-AuthInvalid_Mar22-a-P1-3.png)
>Diagrama de flujo de UC: Fallo en la solicitud de transacción de terceros — La Autorización no era válida

### Solicitud de transacción de terceros rechazada por el usuario

#### Descripción

El flujo de trabajo que ofrece este UC permite al Switch gestionar los casos en los que un Usuario PISP inicia y confirma una transacción a través de su PISP, pero posteriormente se niega a completarla al recibir la aceptación de la cotización y la solicitud de firma del Titular de la cuenta transaccional DFSP.  Una vez rechazada la transacción, el «PISP» notifica al «DFSP» titular de la cuenta a través del Switch, quien procede a cancelar la transacción y envía una notificación de confirmación de la cancelación de la transacción al «PISP» de origen.

#### Diagrama de flujo

![Use Case - Third Party Transaction Request Rejected by user](./assets/ML2RA_3PaT-ucTransactReqFail-rejectedByUser_Mar22-a-P1-3.png)
>Diagrama de flujo de UC: Solicitud de transacción de terceros rechazada por el usuario

### Error en la solicitud de transacción de terceros: tiempo de espera de DFSP

#### Descripción

El flujo de trabajo que ofrece esta UC permite al Switch gestionar los casos en los que un Usuario PISP inicia y confirma una transacción a través de su PISP, pero posteriormente no responde a la solicitud de aceptación de la cotización y a la solicitud de firma del Titular de la cuenta transaccional DFSP dentro de un plazo de espera predeterminado.  Una vez superado el tiempo de espera, el «PISP» notifica al «DFSP» titular de la cuenta transaccional, a través del Switch, que no se ha recibido la respuesta requerida, y el «DFSP» cancela la transacción, enviando una Notificación al «PISP» usuario para informarle de que su solicitud de transacción ha fallado.

#### Diagrama de flujo

![Use Case - Third Party Transaction Request Failed - DFSP timeout](./assets/ML2RA_3PaT-ucTransactReqFail-dfspTimeout_Mar22-a-P1-3.png)
>Diagrama de flujo de UC: Error en la solicitud de transacción de terceros — Tiempo de espera DFSP

<!-- Footnotes themselves at the bottom. -->
<!--## Notes

[^1]: Interfaces comunes: [Mojaloop
Lista de interfaces comunes](../../commonInterfaces.md)
-->