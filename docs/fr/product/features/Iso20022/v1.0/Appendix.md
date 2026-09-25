---
sidebarTitle: Annexe ISO 20022
---

# 8. Annexe A : codes de type d’identifiant de paiement
## 8.1 Types d’identifiant FSPIOP
|Code|Description|
| -- | -- |
|MSISDN|Un MSISDN (*Mobile Station International Subscriber Directory Number*, c’est-à-dire le numéro de téléphone) sert de référence à un participant. Le MSISDN doit être au format international selon la norme UIT-T E.164. Optionnellement, le MSISDN peut être préfixé d’un seul signe plus, indiquant le préfixe international.|
|EMAIL|Une adresse e-mail sert de référence à un participant. Le format doit suivre la RFC 3696 (informatif).|
|PERSONAL_ID|Un identifiant personnel sert de référence à un participant. Exemples : numéro de passeport, d’acte de naissance, d’enregistrement national. Le numéro figure dans l’élément PartyIdentifier ; le type d’identifiant personnel dans PartySubIdOrType.|
|BUSINESS|Une entité commerciale précise (organisation, entreprise, etc.) sert de référence. L’identifiant BUSINESS peut prendre tout format. Pour lier une transaction à un nom d’utilisateur ou un numéro de facture dans une entreprise, utiliser PartySubIdOrType.|
|DEVICE|Un identifiant d’appareil (terminal de paiement, GAB, etc.) rattaché à une entreprise ou organisation sert de référence à une partie. Pour un appareil sous une entreprise ou organisation donnée, utiliser PartySubIdOrType.|
|ACCOUNT_ID|Un numéro de compte bancaire ou identifiant de compte FSP sert de référence. L’identifiant ACCOUNT_ID peut prendre tout format selon pays et FSP.|
|IBAN|Un numéro de compte ou identifiant FSP sert de référence. L’IBAN comporte jusqu’à 34 caractères alphanumériques, sans espace.|
|ALIAS|Un alias sert de référence à un participant. L’alias est créé chez le FSP comme référence alternative au titulaire du compte ; un autre exemple est un nom d’utilisateur dans le système FSP. L’identifiant ALIAS peut prendre tout format ; PartySubIdOrType peut identifier un compte sous un alias défini par PartyIdentifier.|


## 8.2 Table des codes d’identifiant personnel
Ces types ne sont pas encore pris en charge.

|Code|Description|
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


## 8.3 Table des codes d’identifiant d’organisation
Ces types ne sont pas encore pris en charge.

|Code|Description
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
