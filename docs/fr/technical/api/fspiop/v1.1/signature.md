---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, et la Fondation Bill & Melinda Gates
---
# Signature

## Préface

Cette section contient des informations sur la manière d'utiliser ce document.

### Conventions utilisées dans ce document

Ce document utilise les conventions de notation pour BASE64URL(OCTETS), UTF8(CHAÎNE), ASCII(CHAÎNE), et || définies dans la RFC 7515<sup>[1](https://tools.ietf.org/html/rfc7515#section-1.1)</sup>.

Les conventions suivantes sont utilisées dans ce document pour identifier les types d'information spécifiés.

|Type d'information|Convention|Exemple|
|---|---|---|
|**Éléments de l'API, tels que les ressources**|Gras|**/authorization**|
|**Variables**|Italique entre accolades|_{ID}_|
|**Termes du glossaire**|Italique à la première occurrence; définis dans le _Glossaire_|Le but de l'API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (entité fournissant un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un destinataire des fonds électroniques dans une transaction de paiement) situé dans un autre FSP.|
|**Documents de référence**|Italique|Les informations utilisateur ne doivent généralement pas être utilisées par les implémentations de l'API ; les mesures de sécurité détaillées dans _Signature de l'API_ et _Chiffrement de l'API_ doivent être utilisées à la place.|

### Informations sur les versions du document

|Version|Date|Description des changements|
|---|---|---|
|**1.1**|2020-05-19|Cette version contient les changements suivants : 1. Les sections 3.1, 3.2 et 3.3 ont été mises à jour selon « Solution Proposal 12 - Clarify usage of FSPIOP-Destination ». 2. Les éléments ExtensionList dans la section 4 ont été mis à jour en fonction du problème [Interpretation of the Data Model for the ExtensionList element](https://github.com/mojaloop/mojaloop-specification/issues/51), pour corriger le modèle de données de l'objet extensionList.|
|**1.0**|2018-03-13|Version initiale|

<br />

## Introduction

Ce document détaille les méthodes de sécurité à implémenter pour l'Open API pour l'interopérabilité des FSP (ci-après dénommée l'API) afin de garantir l’_intégrité_ et la _non-répudiation_ entre le client API et le serveur API.

En sécurité de l'information, l’_intégrité des données_ signifie maintenir et assurer l'exactitude et la complétude des données sur tout leur cycle de vie. Pour l'API, l'intégrité des données signifie qu'un message API ne peut être modifié de manière non autorisée ou non détectée par les parties impliquées dans la communication API.

Dans les termes juridiques, la _non-répudiation_ signifie qu'une personne s'engage à remplir ses obligations contractuelles. Cela signifie aussi qu'une des parties à une transaction ne peut pas nier avoir reçu la transaction, pas plus que l'autre partie ne peut nier l’avoir envoyée. Pour l'API, la non-répudiation signifie qu’un client API ne peut pas nier avoir envoyé un message API à une contrepartie. JSON Web Signature (JWS), telle que définie dans la RFC 7515<sup>[2](https://tools.ietf.org/html/rfc7515)</sup>, doit être appliquée à l'API pour garantir l'intégrité et la non-répudiation du message, soit pour des champs composants d'une charge utile API, soit pour la totalité de celle-ci. À chaque fois qu'un client API envoie un message API à une contrepartie, le client API doit signer le message à l'aide de sa clé privée. Après que la contrepartie a reçu le message API, elle doit valider la signature avec la clé publique du client API. Seul le message HTTP request d'une API doit être signé ; toute réponse API HTTP NE DOIT PAS être signée.

**Note :** La clé publique correspondante doit soit être partagée à l'avance avec la contrepartie, soit être récupérée par la contrepartie (par exemple via l'autorité de certification du système local).

Comme les frais d'intermédiaire ne sont pas supportés dans la version courante de l'API, les intermédiaires impliqués dans le transit du message API ne peuvent pas modifier la charge utile du message API. Ainsi, la signature au niveau de la charge utile complète est utilisée pour protéger l'intégrité de l'ensemble du message API de bout en bout. Peu importe le nombre d'intermédiaires, la charge utile originale ne peut pas être modifiée. Le destinataire final du message API doit valider la signature générée par le client API original en se basant sur la charge utile reçue.

**Note :** La nécessité pour les intermédiaires d’effectuer la validation de la signature en transit dépend de l’implémentation interne de chaque intermédiaire ou du système local.

**Note :** Dans une future version de l'API, les frais d’intermédiaire pourraient être pris en charge ; la signature au niveau du champ pourrait alors aussi être prise en charge. Cependant, ces deux fonctionnalités sont hors du périmètre de cette version de l'API.

<br />

### Spécification Open API pour l'interopérabilité des FSP

La spécification Open API pour l'interopérabilité des FSP inclut les documents suivants.

#### Documents logiques

- [Modèle de données logique](./logical-data-model)

- [Modèles de transactions génériques](./generic-transaction-patterns)

- [Cas d'utilisation](./use-cases)

#### Documents de liaison REST asynchrone

- [Définition de l'API](./definitions)

- [Règles de liaison JSON](./json-binding-rules)

- [Règles du système](./scheme-rules)

#### Intégrité des données, confidentialité et non-répudiation

- [Bonnes pratiques PKI](./pki-best-practices)

- [Signature](#)

- [Chiffrement](./v1.1/encryption)

#### Documents généraux

- [Glossaire](../glossary)

<br />

## Définition de la signature API

Cette section présente la technologie utilisée par la signature API, y compris le format d'échange de données pour la signature d'un message API et le mécanisme utilisé pour générer et vérifier une signature.

### Modèle de données de la signature

L'API utilise un paramètre d'en-tête HTTP personnalisé **FSPIOP-Signature** pour représenter la signature produite par le client API initiateur pour le message API. Le modèle de données de ce paramètre est décrit dans le [Tableau 1](#table-1).

**Note :** Actuellement, l'API ne prend pas en charge les intermédiaires dans un message API ; seul l'initiateur du message peut signer un message. Si cela est requis à l'avenir, un nouveau paramètre d'en-tête HTTP personnalisé sera défini, mais cela est hors périmètre pour cette version de l'API.

###### Tableau 1

| Nom | Cardinalité | Type | Description |
| --- | --- | --- | --- |
| protectedHeader | 1 | Chaîne(1..32768) | <br>Cet élément indique les paramètres d'en-tête HTTP protégés par la signature. Sa valeur doit être BASE64URL(UTF8(JWS Protected Header)).</br> <br>Selon la spécification JWS, le paramètre d'en-tête **alg** doit être présent pour identifier l'algorithme cryptographique utilisé pour sécuriser le JWS.</br> <br>Un paramètre personnalisé **FSPIOP-URI** représentant le chemin d'URI et les paramètres de requête du message de requête HTTP de l'API doit être présent.</br> <br>Un paramètre personnalisé **FSPIOP-HTTP-Method** contenant la méthode HTTP utilisée dans le message HTTP doit être présent.</br> <br>Un paramètre personnalisé **FSPIOP-Source** indiquant le système qui a envoyé la requête API doit être présent.</br> <br>Le paramètre d'en-tête HTTP personnalisé **FSPIOP-Destination** est obligatoire dans protectedHeader si le FSP de destination est connu par l'initiateur du message. Sinon, cet en-tête ne doit pas être protégé car il peut être modifié par les systèmes intermédiaires. Voir Définition de l'API pour plus d'informations sur les services pour lesquels l'en-tête FSPIOP-Destination est optionnel.</br> |
| signature | 1 | Chaîne(1..512) | Cet élément représente la signature. Sa valeur fait partie de la sérialisation JWS : BASE64URL(JWS Signature). |
**Tableau 1 – Modèle de données du champ d'en-tête HTTP FSPIOP-Signature**

### Génération d'une signature

Pour créer la signature d'un message API, on effectue les étapes suivantes. L’ordre des étapes n’est pas significatif lorsque les entrées et sorties ne dépendent pas les unes des autres.

1. Créer le contenu à utiliser comme JWS Payload. Puisque la signature est actuellement au niveau de la charge utile complète, le corps complet HTTP du message API est le JWS Payload.
  
2. Calculer la valeur encodée du payload : BASE64URL(JWS Payload).
  
3. Créer l'objet ou les objets JSON contenant les paramètres désirés pour le JWS Protected Header.

    A. Le paramètre **alg** du JWS Protected Header doit être présent. Dans l’API, les algorithmes disponibles pour la signature sont **RS256, RS384, RS512**. Une clé d’une taille de 2048 bits ou supérieure doit être utilisée avec ces algorithmes.

    B. Les autres paramètres enregistrés dans l’IANA JSON _Web Signature and Encryption Header Parameters_<sup>[3](https://www.iana.org/assignments/jose/jose.xhtml#web-signature-encryption-header-parameters)</sup> sont optionnels.

    C. Le paramètre personnalisé **FSPIOP-URI** doit être inclus dans le JWS Protected Header pour protéger le chemin d'URI et les paramètres de requête des API.

    D. Le paramètre personnalisé **FSPIOP-HTTP-Method** doit être inclus dans le JWS Protected Header pour protéger la méthode HTTP de la requête.

    E. Le paramètre **FSPIOP-Source** doit être présent, sa valeur provenant du paramètre d'en-tête HTTP correspondant **FSPIOP-Source**.

    F. Le paramètre **FSPIOP-Destination** doit être présent si le FSP de destination est connu par l'initiateur du message, et sa valeur doit être la même que le paramètre d'en-tête HTTP **FSPIOP-Destination**.

    G. Il est recommandé d'inclure d'autres paramètres d’en-tête HTTP des APIs dans le JWS Protected Header, mais ils sont optionnels.

4. Calculer la valeur encodée de l'en-tête : BASE64URL(UTF8(JWS Protected Header)).

5. Calculer la signature JWS selon la spécification JWS en utilisant la sortie des étapes 2 et 4.

6. Calculer la valeur encodée de la signature : BASE64URL(JWS Signature).

7. Calculer la valeur pour le paramètre d'en-tête HTTP **FSPIOP-Signature** tel que décrit dans la section [Modèle de données de la signature](#signature-data-model). La valeur de ce **FSPIOP-Signature** est une chaîne de sérialisation d’objet JSON.

**Note :** Si JSON Web Encryption (JWE) est utilisé pour chiffrer certains champs de la charge utile (voir « Chiffrement »), alors le client API doit tout d’abord chiffrer les champs concernés, remplacer leur texte en clair par le texte chiffré encodé dans la charge utile, puis enfin signer la charge utile.

### Validation de la signature

Lors de la validation de la signature d'une requête API, on effectue les étapes suivantes. L’ordre des étapes n’est pas significatif lorsque les entrées et sorties ne dépendent pas les unes des autres. Si l’une des étapes échoue, alors la signature ne peut pas être validée.

1. Analyser le paramètre d’en-tête HTTP **FSPIOP-Signature** pour obtenir les composants **protectedHeader** et **signature**.

2. Utiliser BASE64URL pour décoder la représentation encodée du JWS Protected Header. Vérifier que la séquence d’octets résultante est une représentation UTF-8 d’un objet JSON complètement valide conforme au format JSON Data Interchange, défini dans la RFC 7159<sup>[4](https://tools.ietf.org/html/rfc7159)</sup>.

3. Vérifier les paramètres du JWS Protected Header.

    a) Le paramètre **alg** doit être présent et sa valeur doit être l'une de **RS256, RS384, RS512**.

    b) Les autres paramètres enregistrés dans l’IANA JSON _Web Signature and Encryption Header Parameters_ sont optionnels.

    c) Le paramètre **FSPIOP-URI** doit être présent et sa valeur doit correspondre exactement à l'URL cible de la requête.

    d) Le paramètre **FSPIOP-HTTP-Method** doit être présent et sa valeur doit être la même que la méthode d'opération de la requête.

    e) Le paramètre **FSPIOP-Source** doit être présent, et sa valeur doit être la même que celle du paramètre d’en-tête HTTP **FSPIOP-Source**.

    f) Si le paramètre **FSPIOP-Destination** est présent dans le JWS Protected Header, alors sa valeur doit être la même que celle du paramètre d’en-tête HTTP **FSPIOP-Destination**.

    g) S'il y a d'autres paramètres d'en-tête HTTP présents dans le JWS Protected Header, leurs valeurs doivent être validées avec les valeurs d’en-tête HTTP correspondantes.

4. Calculer la valeur encodée du payload : BASE64URL(JWS Payload). Actuellement, il s'agit du corps HTTP complet du message API.

5. Valider la signature JWS contre JWS Signing Input ASCII(BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL(JWS Payload)) de la manière définie par l’algorithme utilisé, qui doit correspondre à la valeur du paramètre d’en-tête **alg**.

6. Consigner le résultat de la validation.

<br />

## Exemples de signatures API

Cette section utilise un processus de devis typique pour expliquer comment la signature API est implémentée via JWS. Les FSP de l’API peuvent vérifier que leur implémentation interne pour la signature API est correcte à l’aide du scénario suivant.

Le cas de cette section utilise RS256 comme algorithme de signature. La clé RSA utilisée dans cet exemple de signature est représentée en format JSON Web Key (JWK), défini dans la RFC 7517<sup>[5](https://tools.ietf.org/html/rfc7517)</sup>, ci-dessous (avec retours à la ligne et indentation pour la présentation uniquement) :

```json
{
    "kty": "RSA",
    "n": "ofgWCuLjybRlzo0tZWJjNiuSfb4p4fAkd_wWJcyQoTbji9k0l8W26mPddxHmfHQp-Vaw-4qPCJrcS2mJPMEzP1Pt0Bm4d4QlL-yRT-SFd2lZS-pCgNMsD1W_YpRPEwOWvG6b32690r2jZ47soMZo9wGzjb_7OMg0LOL-bSf63kpaSHSXndS5z5rexMdbBYUsLA9e-KXBdQOS-UTo7WTBEMa2R2CapHg665xsmtdVMTBQY4uDZlxvb3qCo5ZwKh9kG4LT6_I5IhlJH7aGhyxXFvUK-DWNmoudF8NAco9_h9iaGNj8q2ethFkMLs91kzk2PAcDTW9gb54h4FRWyuXpoQ",
    "e": "AQAB",
    "d": "Eq5xpGnNCivDflJsRQBXHx1hdR1k6Ulwe2JZD50LpXyWPEAeP88vLNO97IjlA7_GQ5sLKMgvfTeXZx9SE-7YwVol2NXOoAJe46sui395IW_GO-pWJ1O0BkTGoVEn2bKVRUCgu-GjBVaYLU6f3l9kJfFNS3E0QbVdxzubSu3Mkqzjkn439X0M_V51gfpRLI9JYanrC4D4qAdGcopV_0ZHHzQlBjudU2QvXt4ehNYTCBr6XCLQUShb1juUO1ZdiYoFaFQT5Tw8bGUl_x_jTj3ccPDVZFD9pIuhLhBOneufuBiB4cS98l2SR_RQyGWSeWjnczT0QU91p1DhOVRuOopznQ",
    "p": "4BzEEOtIpmVdVEZNCqS7baC4crd0pqnRH_5IB3jw3bcxGn6QLvnEtfdUdiYrqBdss1l58BQ3KhooKeQTa9AB0Hw_Py5PJdTJNPY8cQn7ouZ2KKDcmnPGBY5t7yLc1QlQ5xHdwW1VhvKn-nXqhJTBgIPgtldC-KDV5z-y2XDwGUc",
    "q": "uQPEfgmVtjL0Uyyx88GZFF1fOunH3-7cepKmtH4pxhtCoHqpWmT8YAmZxaewHgHAjLYsp1ZSe7zFYHj7C6ul7TjeLQeZD_YwD66t62wDmpe_HlB-TnBA-njbglfIsRLtXlnDzQkv5dTltRJ11BKBBypeeF6689rjcJIDEz9RWdc",
    "dp": "BwKfV3Akq5_MFZDFZCnW-wzl-CCo83WoZvnLQwCTeDv8uzluRSnm71I3QCLdhrqE2e9YkxvuxdBfpT_PI7Yz-FOKnu1R6HsJeDCjn12Sk3vmAktV2zb34MCdy7cpdTh_YVr7tss2u6vneTwrA86rZtu5Mbr1C1XsmvkxHQAdYo0",
    "dq": "h_96-mK1R_7glhsum81dZxjTnYynPbZpHziZjeeHcXYsXaaMwkOlODsWa7I9xXDoRwbKgB719rrmI2oKr6N3Do9U0ajaHF-NKJnwgjMd2w9cjz3_-kyNlxAr2v4IKhGNpmM5iIgOS1VZnOZ68m6_pbLBSp3nssTdlqvd0tIiTHU",
    "qi": "IYd7DHOhrWvxkwPQsRM2tOgrjbcrfvtQJipd-DlcxyVuuM9sQLdgjVk2oy26F0EmpScGLq2MowX7fhd_QJQ3ydy5cY7YIBi87w93IKLEdfnbJtoOPLUW0ITrJReOgo1cq9SbsxYawBgfp_gh6A5603k2-ZQwVK0JKSHuLFkuQ3U"
}
```

### Génération d'une signature exemple

Le texte de message ci-dessous est un exemple de `POST /quotes` sans signature, envoyé par le FSP Payeur vers un destinataire (retours à la ligne et indentation à des fins de présentation uniquement).

```json
POST /quotes HTTP/1.1
Accept:application/vnd.interoperability.quotes+json;version=1.0
FSPIOP-Source:1234
FSPIOP-Destination:5678
Content-Length:975
Date:Tue, 23 May 2017 21:12:31 GMT
Content-Type:application/vnd.interoperability.quotes+json;version=1.0
{
    "amount": { "amount": "150", "currency": "USD" },"transactionType": {
        "scenario": "TRANSFER", "initiator": "PAYER","subScenario": "P2P Transfer across MM systems","initiatorType": "CONSUMER"
    },
    "transactionId": "36629a51-393a-4e3c-b347-c2cb57e1e1fc","quoteId": "59e331fa-345f-4554-aac8-fcd8833f7d50","expiration": "2017-05-24T08:40:00.000-04:00",
    "payer": {
        "personalInfo": {
            "dateOfBirth": "1986-02-14",
            "complexName": { "middleName": "Ben",
            "LastName": "Lee", "firstName": "Bill" } },
            "name": "Bill Lee",
            "partyIdInfo": { "fspId": "1234", "partyIdType": "MSISDN",
                "partySubIdOrType": "RegisteredCustomer","partyIdentifier": "16135551212" }
    },
    "payee": {
        "partyIdInfo": { "fspId": "5678",
        "partyIdType": "MSISDN",
        "partyIdentifier": "15295558888" }
    },
    "fees": { "amount": "1.5", "currency": "USD" },
    "extensionList": {
        "extension": [
            { "value": "value1", "key": "key1" },
            { "value": "value2", "key": "key2" },
            { "value": "value3", "key": "key3" }
        ]
    },
    "note": "this is a sample for POST /quotes",
    "geoCode": {
        "longitude": "125.520001", "latitude": "57.323889" },
    "amountType": "RECEIVE"
}
```

#### Calcul de l'entrée de la signature

Conformément à la spécification JWS, l'entrée de la signature est BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL(JWS Payload).

En supposant que les paramètres d'en-tête HTTP **Date** et **FSPIOP-Destination** soient protégés par la signature, et que l'algorithme RS256 soit utilisé pour signer le message, le JWS Protected Header est le suivant (indentation pour la présentation uniquement) :

```json
{
    "alg":"RS256",
    "FSPIOP-Destination":"5678",
    "FSPIOP-URI":"/quotes",
    "FSPIOP-HTTP-Method":"POST",
    "Date":"Tue, 23 May 2017 21:12:31 GMT",
    "FSPIOP-Source":"1234"
}
```

L'encodage de ce JWS Protected Header en BASE64URL(UTF8(JWS Protected Header)) donne :

```
eyJhbGciOiJSUzI1NiIsIkZTUElPUC1EZXN0aW5hdGlvbiI6IjU2NzgiLCJGU1BJT1AtVVJJIjoiL3F1b3RlcyIsIkZTUElPUC1IVFRQLU1ldGhvZCI6IlBPU1QiLCJEYXRlIjoiVHVlLCAyMyBNYXkgMjAxNyAyMToxMjozMSBHTVQiLCJGU1BJT1AtU291cmNlIjoiMTIzNCJ9
```

Dans ce cas, le JWS Payload est le corps HTTP décrit dans la section [Génération d'une signature](#generating-a-signature). En codant ce JWS Payload en BASE64URL(JWS Payload), on obtient :

```
eyJwYXllZSI6eyJwYXJ0eUlkSW5mbyI6eyJwYXJ0eUlkVHlwZSI6Ik1TSVNETiIsInBhcnR5SWRlbnRpZmllciI6IjE1Mjk1NTU4ODg4IiwiZnNwSWQiOiI1Njc4In19LCJhbW91bnRUeXBlIjoiUkVDRUlWRSIsInRyYW5zYWN0aW9uVHlwZSI6eyJzY2VuYXJpbyI6IlRSQU5TRkVSIiwiaW5pdGlhdG9yIjoiUEFZRVIiLCJzdWJTY2VuYXJpbyI6IlAyUCBUcmFuc2ZlciBhY3Jvc3MgTU0gc3lzdGVtcyIsImluaXRpYXRvclR5cGUiOiJDT05TVU1FUiJ9LCJub3RlIjoidGhpcyBpcyBhIHNhbXBsZSBmb3IgUE9TVCAvcXVvdGVzIiwiYW1vdW50Ijp7ImFtb3VudCI6IjE1MCIsImN1cnJlbmN5IjoiVVNEIn0sImZlZXMiOnsiYW1vdW50IjoiMS41IiwiY3VycmVuY3kiOiJVU0QifSwiZXh0ZW5zaW9uTGlzdCI6W3sidmFsdWUiOiJ2YWx1ZTEiLCJrZXkiOiJrZXkxIn0seyJ2YWx1ZSI6InZhbHVlMiIsImtleSI6ImtleTIifSx7InZhbHVlIjoidmFsdWUzIiwia2V5Ijoia2V5MyJ9XSwiZ2VvQ29kZSI6eyJsYXRpdHVkZSI6IjU3LjMyMzg4OSIsImxvbmdpdHVkZSI6IjEyNS41MjAwMDEifSwiZXhwaXJhdGlvbiI6IjIwMTctMDUtMjRUMDg6NDA6MDAuMDAwLTA0OjAwIiwicGF5ZXIiOnsicGVyc29uYWxJbmZvIjp7ImNvbXBsZXhOYW1lIjp7ImZpcnN0TmFtZSI6IkJpbGwiLCJtaWRkbGVOYW1lIjoiQmVuIiwiTGFzdE5hbWUiOiJMZWUifSwiZGF0ZU9mQmlydGgiOiIxOTg2LTAyLTE0In0sInBhcnR5SWRJbmZvIjp7InBhcnR5SWRUeXBlIjoiTVNJU0ROIiwicGFydHlTdWJJZE9yVHlwZSI6IlJlZ2lzdGVyZWRDdXN0b21lciIsInBhcnR5SWRlbnRpZmllciI6IjE2MTM1NTUxMjEyIiwiZnNwSWQiOiIxMjM0In0sIm5hbWUiOiJCaWxsIExlZSJ9LCJxdW90ZUlkIjoiNTllMzMxZmEtMzQ1Zi00NTU0LWFhYzgtZmNkODgzM2Y3ZDUwIiwidHJhbnNhY3Rpb25JZCI6IjM2NjI5YTUxLTM5M2EtNGUzYy1iMzQ3LWMyY2I1N2UxZTFmYyJ9
```

#### Production de la signature

Utiliser la clé privée RSA fournie, le JWS Protected Header et le JWS Payload pour générer la signature, puis encoder la signature en BASE64URL(JWS Signature) donne :

```
dz2ntyS0_rDyA0pLeWluG--tBcYYrlvG99ffkXcEB-dz2ntyS0_rDyA0pLeWluG--tBcYYrlvG99ffkXcEB-uve5Qzvzyn0ZUi82J7h17RsdfHPuTnbEGvCeU9Y4Bg0nIZHGL4icswaaO09T5hPPYKBTzVQeHkokLmL4dXpHdr1ggSEpu3WEU3nfgOFGGAdOq355i1iGuDbhqm_lSfVHaqdVCEhkJ2Y_r2glO2QpdZrcbvsBV39derj_PlfISBBGjdh0dIPxnFIVcZuPHiq9Ha2MslrBHfqwFfNeU_xhErBd2PywkDQJbKOlfqdkmFC9bS8Ofx0O6Mg7qdFGw-QkseJTfp0HMbH1d9e6H0cocY8xfuDNGaZpOJhxiYtiPLg
```

#### Reproduction de la requête API avec signature

Comme décrit dans la section [Modèle de données de la signature](#signature-data-model), la signature API est représentée par un en-tête HTTP personnalisé **FSPIOP-Signature** ; donc la requête API avec la signature dans ce cas ressemble à :

```json
POST /quotes HTTP/1.1
FSPIOP-Destination:5678
Accept:application/vnd.interoperability.quotes+json;version=1.0
Content-Length:975
Date:Tue, 23 May 2017 21:12:31 GMT
FSPIOP-Source:1234
Content-Type:application/vnd.interoperability.quotes+json;version=1.0
FSPIOP-Signature: {"signature": "dz2ntyS0_rDyA0pLeWluG--tBcYYrlvG99ffkXcEBuve5Qzvzyn0ZUi82J7h17RsdfHPuTnbEGvCeU9Y4Bg0nIZHGL4icswaaO09T5hPPYKBTzVQeHkokLmL4dXpHdr1ggSEpu3WEU3nfgOFGGAdOq355i1iGuDbhqm_lSfVHaqdVCEhkJ2Y_r2glO2QpdZrcbvsBV39derj_PlfISBBGjdh0dIPxnFIVcZuPHiq9Ha2MslrBHfqwFfNeU_xhErBd2PywkDQJbKOlfqdkmFC9bS8Ofx0O6Mg7qdFGwQkseJTfp0HMbH1d9e6H0cocY8xfuDNGaZpOJhxiYtiPLg", "protectedHeader": "eyJhbGciOiJSUzI1NiIsIkZTUElPUC1EZXN0aW5hdGlvbiI6IjU2NzgiLCJGU1BJT1AtVVJJIjoiL3F1b3RlcyIsIkZTUElPUC1IVFRQLU1ldGhvZCI6IlBPU1QiLCJEYXRlIjoiVHVlLCAyMyBNYXkgMjAxNyAyMToxMjozMSBHTVQiLCJGU1BJT1AtU291cmNlIjoiMTIzNCJ9"
}
{
    "amount": { "amount": "150", "currency": "USD" },
    "transactionType": {
        "scenario": "TRANSFER", "initiator": "PAYER",
        "subScenario": "P2P Transfer across MM systems",
        "initiatorType": "CONSUMER" },
    "transactionId": "36629a51-393a-4e3c-b347-c2cb57e1e1fc",
    "quoteId": "59e331fa-345f-4554-aac8-fcd8833f7d50",
    "expiration": "2017-05-24T08:40:00.000-04:00",
    "payer": {
        "personalInfo": { "dateOfBirth": "1986-02-14",
            "complexName": { "middleName": "Ben",
                "LastName": "Lee", "firstName": "Bill" } },
        "name": "Bill Lee",
        "partyIdInfo": { "fspId": "1234", "partyIdType": "MSISDN",
            "partySubIdOrType": "RegisteredCustomer",
            "partyIdentifier": "16135551212" } },
    "payee": { "partyIdInfo": { "fspId": "5678",
        "partyIdType": "MSISDN",
        "partyIdentifier": "15295558888" } },
    "fees": { "amount": "1.5", "currency": "USD" },
    "extensionList": {
        "extension": [
            { "value": "value1", "key": "key1" },
            { "value": "value2", "key": "key2" },
            { "value": "value3", "key": "key3" }
        ]
    },
    "note": "this is a sample for POST /quotes",
    "geoCode": { "longitude": "125.520001", "latitude": "57.323889" },
    "amountType": "RECEIVE"
}
```

### Validation de la signature

Après que le FSP Bénéficiaire ait reçu le message API `POST /quotes` du FSP Payeur, le FSP Bénéficiaire doit valider la signature signée par le FSP Payeur.

#### Analyse de FSPIOP-Signature

1. Analysez le paramètre d’en-tête HTTP **FSPIOP-Signature** pour obtenir les composants **protectedHeader** et **signature**. Dans ce cas, la valeur de **protectedHeader** est :

```
eyJhbGciOiJSUzI1NiIsIkZTUElPUC1EZXN0aW5hdGlvbiI6IjU2NzgiLCJGU1BJT1AtVVJJIjo
iL3F1b3RlcyIsIkZTUElPUC1IVFRQLU1ldGhvZCI6IlBPU1QiLCJEYXRlIjoiVHVlLCAyMyBNYX
kgMjAxNyAyMToxMjozMSBHTVQiLCJGU1BJT1AtU291cmNlIjoiMTIzNCJ9
```

2. Utilisez BASE64URL pour décoder la représentation encodée du JWS Protected Header. Vérifiez que la séquence d’octets résultante est une représentation UTF-8 d’un objet JSON conforme au format RFC7159. Dans ce cas, l'objet JSON décodé est :

```json
{
    "alg":"RS256",
    "FSPIOP-Destination":"5678",
    "FSPIOP-URI":"/quotes",
    "FSPIOP-HTTP-Method":"POST",
    "Date":"Tue, 23 May 2017 21:12:31 GMT",
    "FSPIOP-Source":"1234"
}
```

3. Vérifier que le paramètre **alg** est valide pour l’API. Il doit faire partie de **RS256, RS384, RS512**. Dans ce cas, la valeur **alg** est **RS256**, ce qui est valide.

4. Vérifier que la valeur du paramètre **FSPIOP-URI** est la même que l’URL d’entrée de ce message API.

5. Vérifier que la valeur du paramètre **FSPIOP-HTTP-Method** est la même que la méthode HTTP de ce message API.

6. Vérifier que la valeur de l'en-tête HTTP **FSPIOP-Source** est la même que celle indiquée dans ce JWS Protected Header.

7. Vérifier que la valeur de l’en-tête HTTP **FSPIOP-Destination** est la même que celle indiquée dans ce JWS Protected Header.

8. Vérifier les autres paramètres d’en-tête HTTP protégés. Ici, le paramètre **Date** est protégé par le JWS Protected Header. Si les paramètres **Date** dans l’en-tête HTTP et le JWS Protected Header sont égaux, alors la validation est réussie. Les deux paramètres **Date** dans l’exemple doivent avoir la valeur :

```
"Tue, 23 May 2017 21:12:31 GMT"
```

La validation est réussie.

#### Vérification de la signature JWS

1. Dans ce cas, le JWS Payload est le corps complet du message HTTP de l'API, donc (indentation incluse pour la présentation) :

```json
{
    "amount": { "amount": "150", "currency": "USD" },
    "transactionType": { "scenario": "TRANSFER", "initiator": "PAYER",
    "subScenario": "P2P Transfer across MM systems",
    "initiatorType": "CONSUMER"
    },
    "transactionId": "36629a51-393a-4e3c-b347-c2cb57e1e1fc",
    "quoteId": "59e331fa-345f-4554-aac8-fcd8833f7d50",
    "expiration": "2017-05-24T08:40:00.000-04:00",
    "payer": {
        "personalInfo": { "dateOfBirth": "1986-02-14",
            "complexName": { "middleName": "Ben",
                "LastName": "Lee", "firstName": "Bill" } },
        "name": "Bill Lee",
        "partyIdInfo": { "fspId": "1234",
            "partyIdType": "MSISDN",
            "partySubIdOrType": "RegisteredCustomer",
            "partyIdentifier": "16135551212" } },
    "payee": {
        "partyIdInfo": { "fspId": "5678",
            "partyIdType": "MSISDN",
            "partyIdentifier": "15295558888" } },
    "fees": { "amount": "1.5", "currency": "USD" },
    "extensionList": {
        "extension": [
            { "value": "value1", "key": "key1" },
            { "value": "value2", "key": "key2" },
            { "value": "value3", "key": "key3" }
        ]
    },
    "note": "this is a sample for POST /quotes",
    "geoCode": { "longitude": "125.520001", "latitude": "57.323889" },
    "amountType": "RECEIVE"
}
  ```

2. Calculez la valeur encodée du payload : BASE64URL(JWS Payload). Obtenez la valeur encodée suivante :

```
eyJwYXllZSI6eyJwYXJ0eUlkSW5mbyI6eyJwYXJ0eUlkVHlwZSI6Ik1TSVNETiIsInBhcnR5SWRlbnRpZmllciI6IjE1Mjk1NTU4ODg4IiwiZnNwSWQiOiI1Njc4In19LCJhbW91bnRUeXBlIjoiUkVDRUlWRSIsInRyYW5zYWN0aW9uVHlwZSI6eyJzY2VuYXJpbyI6IlRSQU5TRkVSIiwiaW5pdGlhdG9yIjoiUEFZRVIiLCJzdWJTY2VuYXJpbyI6IlAyUCBUcmFuc2ZlciBhY3Jvc3MgTU0gc3lzdGVtcyIsImluaXRpYXRvclR5cGUiOiJDT05TVU1FUiJ9LCJub3RlIjoidGhpcyBpcyBhIHNhbXBsZSBmb3IgUE9TVCAvcXVvdGVzIiwiYW1vdW50Ijp7ImFtb3VudCI6IjE1MCIsImN1cnJlbmN5IjoiVVNEIn0sImZlZXMiOnsiYW1vdW50IjoiMS41IiwiY3VycmVuY3kiOiJVU0QifSwiZXh0ZW5zaW9uTGlzdCI6W3sidmFsdWUiOiJ2YWx1ZTEiLCJrZXkiOiJrZXkxIn0seyJ2YWx1ZSI6InZhbHVlMiIsImtleSI6ImtleTIifSx7InZhbHVlIjoidmFsdWUzIiwia2V5Ijoia2V5MyJ9XSwiZ2VvQ29kZSI6eyJsYXRpdHVkZSI6IjU3LjMyMzg4OSIsImxvbmdpdHVkZSI6IjEyNS41MjAwMDEifSwiZXhwaXJhdGlvbiI6IjIwMTctMDUtMjRUMDg6NDA6MDAuMDAwLTA0OjAwIiwicGF5ZXIiOnsicGVyc29uYWxJbmZvIjp7ImNvbXBsZXhOYW1lIjp7ImZpcnN0TmFtZSI6IkJpbGwiLCJtaWRkbGVOYW1lIjoiQmVuIiwiTGFzdE5hbWUiOiJMZWUifSwiZGF0ZU9mQmlydGgiOiIxOTg2LTAyLTE0In0sInBhcnR5SWRJbmZvIjp7InBhcnR5SWRUeXBlIjoiTVNJU0ROIiwicGFydHlTdWJJZE9yVHlwZSI6IlJlZ2lzdGVyZWRDdXN0b21lciIsInBhcnR5SWRlbnRpZmllciI6IjE2MTM1NTUxMjEyIiwiZnNwSWQiOiIxMjM0In0sIm5hbWUiOiJCaWxsIExlZSJ9LCJxdW90ZUlkIjoiNTllMzMxZmEtMzQ1Zi00NTU0LWFhYzgtZmNkODgzM2Y3ZDUwIiwidHJhbnNhY3Rpb25JZCI6IjM2NjI5YTUxLTM5M2EtNGUzYy1iMzQ3LWMyY2I1N2UxZTFmYyJ9
```

3. Validez la signature JWS par rapport à JWS Signing Input (le JWS Protected Header, JWS Payload) avec l'algorithme **RS256** (spécifié dans le JWS Protected Header), et la clé publique. Notez si la validation a réussi ou non.

<br />

## Références

<sup>1</sup> [https://tools.ietf.org/html/rfc7515#section-1.1](https://tools.ietf.org/html/rfc7515#section-1.1) – JSON Web Signature (JWS) - Conventions de notation

<sup>2</sup> [https://tools.ietf.org/html/rfc7515](https://tools.ietf.org/html/rfc7515) – JSON Web Signature (JWS)

<sup>3</sup> [https://www.iana.org/assignments/jose/jose.xhtml#web-signature-encryption-header-parameters](https://www.iana.org/assignments/jose/jose.xhtml#web-signature-encryption-header-parameters) – Paramètres d’en-tête JSON Web Signature et Encryption

<sup>4</sup> [https://tools.ietf.org/html/rfc7159](https://tools.ietf.org/html/rfc7159) – Format d'échange de données JavaScript Object Notation (JSON)

<sup>5</sup> [https://tools.ietf.org/html/rfc7517](https://tools.ietf.org/html/rfc7517) – JSON Web Key (JWK)
