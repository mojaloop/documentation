# 8. Anexo A: códigos de tipo de identificador de pagamento
## 8.1 Tipos de identificador FSPIOP
|Código|Descrição|
| -- | -- |
|MSISDN|Um MSISDN (Mobile Station International Subscriber Directory Number, ou seja, o número de telefone) é utilizado como referência a um participante. O identificador MSISDN deverá estar em formato internacional, de acordo com a norma ITU-T E.164. Opcionalmente, o MSISDN pode ser precedido de um único sinal de mais, indicando o prefixo internacional.|
|EMAIL|Um endereço de e-mail é utilizado como referência a um participante. O formato do e-mail deverá estar de acordo com a RFC 3696 (informativa).|
|PERSONAL_ID|Um identificador pessoal é utilizado como referência a um participante. Exemplos de identificação pessoal são o número de passaporte, o número da certidão de nascimento e o número de registo nacional. O número do identificador é adicionado no elemento PartyIdentifier. O tipo de identificador pessoal é adicionado no elemento PartySubIdOrType.|
|BUSINESS|Uma empresa específica (por exemplo, uma organização ou uma sociedade) é utilizada como referência a um participante. O identificador BUSINESS pode estar em qualquer formato. Para associar uma transação a um nome de utilizador ou a um número de fatura específicos numa empresa, deverá ser utilizado o elemento PartySubIdOrType.|
|DEVICE|O ID de um dispositivo específico (por exemplo, um POS ou um ATM) associado a uma empresa ou organização específica é utilizado como referência a uma parte. Para referenciar um dispositivo específico de uma empresa ou organização específica, utilize o elemento PartySubIdOrType.|
|ACCOUNT_ID|Um número de conta bancária ou um ID de conta do FSP deverá ser utilizado como referência a um participante. O identificador ACCOUNT_ID pode estar em qualquer formato, uma vez que os formatos podem variar bastante consoante o país e o FSP.|
|IBAN|Um número de conta bancária ou um ID de conta do FSP é utilizado como referência a um participante. O identificador IBAN pode ser composto por até 34 caracteres alfanuméricos e deverá ser introduzido sem espaços.|
|ALIAS| Um alias é utilizado como referência a um participante. O alias deverá ser criado no FSP como referência alternativa a um titular de conta. Outro exemplo de alias é um nome de utilizador no sistema do FSP. O identificador ALIAS pode estar em qualquer formato. É também possível utilizar o elemento PartySubIdOrType para identificar uma conta sob um alias definido pelo PartyIdentifier.|


## 8.2 Tabela de códigos de identificador pessoal
Estes tipos ainda não são permitidos.

|Código|Descrição|
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


## 8.3 Tabela de códigos de identificador de organização
Estes tipos ainda não são permitidos.

|Código|Descrição
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
