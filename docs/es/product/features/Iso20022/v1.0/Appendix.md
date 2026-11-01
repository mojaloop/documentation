---
i18n_source_sha: 7e0c862cdeeed0e0dac130e5a64b24492f9e198c
---

# 8. Apéndice A: códigos de tipo de identificador de pago
## 8.1 Tipos de identificador de FSPIOP
|Código|Descripción|
| -- | -- |
|MSISDN|Un MSISDN (Mobile Station International Subscriber Directory Number, es decir, el número de teléfono) se usa como referencia a un participante. El identificador MSISDN debería estar en formato internacional conforme al estándar ITU-T E.164. De forma opcional, el MSISDN puede ir precedido de un único signo más, que indica el prefijo internacional.|
|EMAIL|Un correo electrónico se usa como referencia a un participante. El formato del correo electrónico debería ajustarse al RFC 3696 informativo.|
|PERSONAL_ID|Un identificador personal se usa como referencia a un participante. Ejemplos de identificación personal son el número de pasaporte, el número de acta de nacimiento y el número de registro nacional. El número del identificador se agrega en el elemento PartyIdentifier. El tipo de identificador personal se agrega en el elemento PartySubIdOrType.|
|BUSINESS|Una empresa específica (por ejemplo, una organización o una sociedad) se usa como referencia a un participante. El identificador BUSINESS puede tener cualquier formato. Para hacer una transacción vinculada a un nombre de usuario o a un número de factura específicos dentro de una empresa, debería usarse el elemento PartySubIdOrType.|
|DEVICE|El ID de un dispositivo específico (por ejemplo, un POS o un cajero automático) vinculado a una empresa u organización específicas se usa como referencia a una parte. Para hacer referencia a un dispositivo específico dentro de una empresa u organización específicas, use el elemento PartySubIdOrType.|
|ACCOUNT_ID|Debería usarse un número de cuenta bancaria o un ID de cuenta del FSP como referencia a un participante. El identificador ACCOUNT_ID puede tener cualquier formato, ya que los formatos pueden diferir mucho según el país y el FSP.|
|IBAN|Un número de cuenta bancaria o un ID de cuenta del FSP se usa como referencia a un participante. El identificador IBAN puede constar de hasta 34 caracteres alfanuméricos y debería introducirse sin espacios en blanco.|
|ALIAS| El alias se usa como referencia a un participante. El alias debería crearse en el FSP como una referencia alternativa al titular de una cuenta. Otro ejemplo de alias es un nombre de usuario en el sistema del FSP. El identificador ALIAS puede tener cualquier formato. También es posible usar el elemento PartySubIdOrType para identificar una cuenta bajo un Alias definido por el PartyIdentifier.|


## 8.2 Tabla de códigos de identificador personal
Estos tipos aún no se admiten.

|Código|Descripción|
| -- | -- |
|ARNU|AlienRegistrationNumber|
|CCPT|PassportNumber|
|CUST|CustomerIdentificationNumber|
|DRLC|DriversLicenseNumber|
|EMPL|EmployeeIdentificationNumber|
|NIDN|NationalIdentityNumber|
|SOSE|SocialSecurityNumber|
|TELE|TelephoneNumber|
|TXID|TaxIdentificationNumber|
|POID|PersonCommercialIdentification|


## 8.3 Tabla de códigos de identificador de organización
Estos tipos aún no se admiten.

|Código|Descripción
| -- | -- |
|BANK|BankPartyIdentification|
|CBID|CentralBankIdentificationNumber|
|CHID|ClearingIdentificationNumber|
|CINC|CertificateOfIncorporationNumber|
|COID|CountryIdentificationCode|
|CUST|CustomerNumber|
|DUNS|DataUniversalNumberingSystem|
|EMPL|EmployerIdentificationNumber|
|GS1G|GS1GLNIdentifier|
|SREN|SIREN|
|SRET|SIRET|
|TXID|TaxIdentificationNumber|
|BDID|BusinessDomainIdentifier|
|BOID|BusinessOtherIdentification|
