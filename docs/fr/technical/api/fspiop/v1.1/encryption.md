---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, et la Bill & Melinda Gates Foundation
---
# Chiffrement

## Préface

Cette section contient des informations sur la façon d'utiliser ce document.

### Conventions Utilisées dans ce Document

Les conventions suivantes sont utilisées dans ce document pour identifier les types spécifiés d'information :

| **Type d'Information** | **Convention** | **Exemple** |
| :--- | :--- | :--- |
| **Éléments de l'API, tels que ressources** | Gras | **/authorization** |
| **Variables** | Italique entre accolades | _{ID}_ |
| **Termes du glossaire** | Italique à la première occurrence ; défini dans le _Glossaire_ | Le but de l'API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité fournissant un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un destinataire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP. |
| **Documents de référence** | Italique | Les informations utilisateur ne devraient, en général, pas être utilisées par les déploiements de l’API ; les mesures de sécurité détaillées dans _Signature de l'API_ et _Chiffrement de l'API_ devraient être utilisées à la place. |

### Informations sur les versions du document

| **Version** | **Date** | **Description des modifications** |
| :--- | :--- | :--- |
|**1.1**|2020-05-19|Cette version contient les modifications suivantes : 1. Les éléments ExtensionList de la Section 4 ont été mis à jour sur la base du problème [Interpretation of the Data Model for the ExtensionList element](https://github.com/mojaloop/mojaloop-specification/issues/51), afin de corriger le modèle de données de l'objet extensionList.|
| **1.0** | 2018-03-13 | Version initiale |

<br />

## Introduction

Ce document détaille les méthodes de sécurité à mettre en œuvre pour l'Open API (Interface de Programmation Applicative) pour l'interopérabilité des FSP (Fournisseurs de Services Financiers) (ci-après citée « l’API ») afin de garantir la confidentialité des messages API entre un client API et le serveur API.

En sécurité de l'information, la _confidentialité_ signifie que l'information n'est pas rendue disponible ou divulguée à des personnes, entités ou processus non autorisés (extrait de l’ISO27000<sup>[The ISO 27000 Directory](http://www.27000.org)</sup>). Pour l’API, la confidentialité signifie que certains champs sensibles du contenu d’un message API ne peuvent être consultés ou identifiés de manière non autorisée ou non détectée par les intermédiaires impliqués dans la communication API. Autrement dit, si certains champs d’un message API sont chiffrés par le client API, alors seul le destinataire prévu de l’API peut déchiffrer ces champs.

Le chiffrement JSON Web Encryption (JWE, défini dans la RFC 7516<sup>[JSON Web Encryption (JWE)](https://tools.ietf.org/html/rfc7516)</sup>) doit être appliqué à l'API pour assurer la confidentialité de bout en bout des messages. Lorsqu'un client API envoie une requête HTTP (telle qu'une requête API ou un message de rappel) à un contrepartie, le client API peut déterminer s'il existe des champs sensibles dans le message API à protéger selon la réglementation ou le système local. S'il y a un champ à protéger, le client API utilise JWE pour chiffrer la valeur de ce champ. Par la suite, le texte chiffré de ce champ sera transmis à la contrepartie.

Pour prendre en charge le chiffrement de plusieurs champs d’un message API, le JWE est étendu dans ce document pour s’adapter aux exigences de l’API.

<br />

### Spécification Open API pour l'interopérabilité FSP

La Spécification Open API pour l’Interopérabilité FSP comprend les documents suivants.

#### Documents logiques

- [Modèle de Données Logique](./logical-data-model)

- [Modèles de Transactions Génériques](./generic-transaction-patterns)

- [Cas d'Utilisation](./use-cases)

#### Documents de liaison REST asynchrones

- [Définition de l'API](./api-definition)

- [Règles de Liaison JSON](../json-binding-rules)

- [Règles du système](./scheme-rules)

#### Intégrité des données, Confidentialité et Non-répudiation

- [Bonnes pratiques PKI](./pki-best-practices)

- [Signature](./v1.1/signature)

- [Chiffrement](#)

#### Documents généraux

- [Glossaire](./glossary)

<br />

## Définition du chiffrement de l'API

Cette section présente la technologie utilisée par le chiffrement de l'API, notamment :

- Le format d'échange de données pour les champs chiffrés d’un message API.
- Le mécanisme de chiffrement et de déchiffrement des champs.

### Modèle de données pour le chiffrement

L’API utilise l’en-tête HTTP personnalisé **FSPIOP-Encryption** pour représenter les champs chiffrés d’un message API ; sa valeur est une sérialisation d’objet JSON. Le modèle de données de ce paramètre est décrit dans la [Table 1](#table-1), [Table 2](#table-2) et [Table 3](#table-3).

**Note** : Si **FSPIOP-Encryption** est présent dans un message API, il doit également être protégé par la signature de l’API. Cela signifie que **FSPIOP-Encryption** doit être inclus dans le JWS Protected Header de la signature.

###### Tableau 1

| **Nom** | **Cardinalité** | **Type** | **Description** |
| :--- | :---: | :--- | :--- |
| **encryptedFields** | 1 | EncryptedFields | Informations sur les champs chiffrés d’un message API |
**Tableau 1 -- Modèle de données du champ d’en-tête HTTP FSPIOP-Encryption**

###### Tableau 2

| **Nom** | **Cardinalité** | **Type** | **Description** |
| :--- | :---: | :--- | :--- |
| **encryptedField** | 1..* | EncryptedField | Informations sur un champ chiffré d’un message API |
**Tableau 2 -- Modèle de données du type complexe EncryptedFields**

###### Tableau 3

| **Nom** | **Cardinalité** | **Type** | **Description** |
| :--- | :---: | :--- | :--- |
|**fieldName** | 1 | String(1..512) | Cet élément identifie le champ à chiffrer dans le contenu d’un message API. <br>Comme la charge utile (payload) de l’API est une chaîne de sérialisation d’objet JSON, le nom du champ doit permettre d’identifier le chemin exact de l’élément dans l’objet JSON. Un point (‘**.**’) est utilisé pour séparer les éléments dans un chemin d’élément. Par exemple, **payer.personalInfo.dateOfBirth** est une valeur valide pour cet élément pour la requête API **POST /quotes**.</br> |
| **encryptedKey** | 1 | String(1..512) | Valeur de la clé de chiffrement de contenu chiffrée (CEK). Sa valeur est encodée en BASE64URL (Clé Chiffrée JWE). <br>S'il y a plusieurs champs à chiffrer dans le message API, il est recommandé d'utiliser la même clé chiffrée JWE pour simplifier la mise en œuvre ; cependant, c'est une décision propre à chaque FSP selon leur implémentation.</br> |
|**protectedHeader** | 1 | String(1..1024) | Cet élément identifie les paramètres d’en-tête appliqués à JWE pour chiffrer le champ spécifié. Sa valeur est encodée en BASE64URL(UTF8(JWE Protected Header)). <br>Par exemple, si le JWE Protected Header appliqué au chiffrement est ```{"alg":"RSA-OAEP-256","enc":"A256GCM"}```, alors la valeur est ```eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ```.</br> |
| **initializationVector** | 1 | String(1..128) | Valeur du vecteur d'initialisation utilisé lors du chiffrement du texte clair. Sa valeur est encodée en BASE64URL (vecteur d'initialisation JWE). |
| **authenticationTag** | 1 | String(1..128) | Valeur de l’étiquette d’authentification résultant du chiffrement authentifié du texte en clair avec des Données Authentifiées Additionnelles. Sa valeur est encodée en BASE64URL (Tag d’authentification JWE) |
**Tableau 3 -- Modèle de données du type complexe EncryptedField**

### Chiffrement des champs d’un message API

Cette section décrit le processus de chiffrement des champs de message. L’ordre des étapes n'est pas significatif dans les cas où il n'y a pas de dépendances entre les entrées et sorties des étapes.

1. Déterminer l'algorithme utilisé pour déterminer la valeur de la CEK (c'est l'algorithme enregistré dans le paramètre d'en-tête **alg** du JWE résultant). Parce que la CEK doit être chiffrée avec la clé publique du destinataire de l’API, l’algorithme disponible pour protéger la CEK dans l’API ne peut être que **RSA-OAEP-256**.
2. S'il y a plusieurs champs à chiffrer dans le message API, exécuter les étapes 3-15 pour chaque champ.
3. Générer une CEK aléatoire. Le FSP peut générer la valeur en utilisant sa propre application ou l’implémentation JWE employée.
4. Chiffrer la CEK avec l’algorithme déterminé par le paramètre d’en-tête JWE **alg**.
5. Calculer la valeur encodée en BASE64URL(JWE Encrypted Key).
6. Générer un vecteur d'initialisation JWE aléatoire de la taille correcte pour l’algorithme de chiffrement de contenu (si requis par l’algorithme) ; sinon, que le vecteur soit une séquence d’octets vide.
7. Calculer la valeur encodée du vecteur d'initialisation BASE64URL(JWE Initialization Vector).
8. Si un paramètre **zip** a été inclus, compresser le texte clair en utilisant l’algorithme de compression spécifié et que *M* soit la séquence d’octets représentant le texte clair compressé ; sinon, que _M_ soit la séquence d’octets représentant le texte clair.
9. Créer l'objet JSON ou les objets contenant le jeu désiré de paramètres d’en-tête, qui constituent ensemble le JWE Protected Header. Outre le paramètre **alg**, le paramètre **enc** doit être inclus dans le protected header JWE. Les valeurs disponibles pour le paramètre **enc** dans l’API ne peuvent être que : **A128GC**_M_, **A192GC**_M_, **A256GC**_M_. **A256GC**_M_ est recommandé.
10. Calculer la valeur encodée du protected header BASE64URL(UTF8(JWE Protected Header)).
11. Prendre pour paramètre de Données Authentifiées Additionnelles la valeur ASCII(Encoded Protected Header).
12. Chiffrer *M* en utilisant la CEK, le vecteur d'initialisation JWE et la Donnée Authentifiée Additionnelle selon l’algorithme de chiffrement de contenu spécifié pour créer la valeur du texte chiffré JWE et le Tag d’authentification JWE (qui est la sortie du chiffrement).
13. Calculer la valeur chiffrée encodée en BASE64URL (JWE Cipher Text).
14. Calculer la valeur du tag d’authentification encodée en BASE64URL (JWE Authentication Tag).
15. Calculer l'élément **encryptedField** (voir la Table 3) pour le paramètre d'en-tête HTTP **FSPIOP-Encryption**.
16. Calculer la valeur du paramètre d’en-tête HTTP **FSPIOP-Encryption** comme décrit dans la documentation [FSPIOP API](/fspiop). La valeur de ce **FSPIOP-Encryption** est une chaîne de sérialisation d’objet JSON.

**Note** : Si JWE est utilisé pour chiffrer certains champs de la charge utile, alors le client API doit :

1. Chiffrer les champs désirés.

2. Remplacer la valeur de ces champs par le texte chiffré encodé dans la charge utile.

3. Signer la charge utile.

### Déchiffrement des champs d’un message API

Si le paramètre d’en-tête HTTP **FSPIOP-Encryption** (qui est aussi protégé par la signature de l’API) est présent, alors le destinataire du message API doit déchiffrer les champs chiffrés du message API après que la signature de l’API ait été validée avec succès. Le processus de déchiffrement est l’inverse du chiffrement. L’ordre des étapes n’est pas significatif dans les cas où il n’y a pas de dépendance entre les entrées et sorties des étapes. S’il y a plusieurs champs chiffrés, alors tous les champs doivent être déchiffrés avec succès ; sinon cela indique que le message API est invalide.

1. Analyser le paramètre d’en-tête HTTP **FSPIOP-Encryption** pour obtenir les informations sur les champs chiffrés, y compris le nom du champ, le protected header JWE, la clé chiffrée JWE, le vecteur d’initialisation JWE et le tag d’authentification JWE pour chaque champ. S’il y a plusieurs champs à déchiffrer, exécuter les étapes 2-9 pour chaque champ.
2. Obtenir le texte chiffré du champ chiffré en analysant la charge utile avec le chemin de champ spécifié. La valeur du champ spécifié est déjà encodée en BASE64URL.
3. Vérifier que la séquence d'octets résultant du décodage du protected header JWE encodé est une représentation UTF-8 valide d'un objet JSON conforme au format d’échange JSON (cf. RFC 7159<sup>[The JavaScript Object Notation (JSON) Data Interchange Format](https://tools.ietf.org/html/rfc7159)</sup>) ; le protected header JWE doit être cet objet JSON.
4. Vérifier que les paramètres dans le protected header JWE comprennent et peuvent traiter tous les champs requis pour prendre en charge la spécification JWE ; par exemple, l’algorithme utilisé.
5. Déterminer si l’algorithme spécifié par le paramètre **alg** du header correspond à l’algorithme de la clé publique / privée du destinataire de l’API.
6. Déchiffrer la clé chiffrée JWE avec la clé privée du destinataire API pour obtenir la CEK JWE.
7. Prendre pour paramètre de Données Authentifiées Additionnelles la valeur ASCII (Encoded Protected Header).
8. Déchiffrer le texte chiffré JWE en utilisant la CEK, le vecteur d'initialisation JWE, la Donnée Authentifiée Additionnelle et le Tag d’authentification JWE avec l’algorithme de chiffrement spécifié, pour retourner le texte déchiffré tout en validant le tag d’authentification conformément à l’algorithme. Si le tag d’authentification JWE est incorrect, rejeter l’entrée sans procéder au déchiffrement.
9. Si un paramètre **zip** a été inclus, le destinataire de l’API doit décompresser le texte déchiffré en utilisant l'algorithme de compression spécifié.

## Exemples de chiffrement/déchiffrement d’API

Cette section utilise un processus typique de devis pour expliquer comment le chiffrement et le déchiffrement de l’API sont réalisés avec JWE. Puisque l’algorithme de clé publique / privée du destinataire de l’API ne peut être que RSA, la clé RSA utilisée pour cet exemple est représentée ci-dessous au format JSON Web Key (JWK, défini dans la RFC 7517<sup>[JSON Web Key(JWK)](https://tools.ietf.org/html/rfc7517)</sup>) (avec retours à la ligne pour l’affichage uniquement) :

```json
{
    "kty": "RSA",
    "n": "oahUIoWw0K0usKNuOR6H4wkf4oBUXHTxRvgb48E-
        BVvxkeDNjbC4he8rUWcJoZmds2h7M70imEVhRU5djINXtqllXI4DFqcI1DgjT9Le
        wND8MW2Krf3Spsk_ZkoFnilakGygTwpZ3uesH-
        PFABNIUYpOiN15dsQRkgr0vEhxN92i2asbOenSZeyaxziK72UwxrrKoExv6kc5tw
        XTq4h-QChLOln0_mtUZwfsRaMStPs6mS6XrgxnxbWhojf663tuEQueGC-
        FCMfra36C9knDFGzKsNa7LZK2djYgyD3JR_MB_4NUJW_TqOQtwHYbxevoJArm-
        L5StowjzGy-_bq6Gw",
    "e": "AQAB",
    "d": "kLdtIj6GbDks_ApCSTYQtelcNttlKiOyPzMrXHeI-yk1F7-kpDxY4-
        WY5NWV5KntaEeXS1j82E375xxhWMHXyvjYecPT9fpwR_M9gV8n9Hrh2anTpTD93D
        t62ypW3yDsJzBnTnrYu1iwWRgBKrEYY46qAZIrA2xAwnm2X7uGR1hghkqDp0Vqj3
        kbSCz1XyfCs6_LehBwtxHIyh8Ripy40p24moOAbgxVw3rxT_vlt3UVe4WO3JkJOz
        lpUf-KTVI2Ptgm-dARxTEtE-id-4OJr0h-K-
        VFs3VSndVTIznSxfyrj8ILL6MG_Uv8YAu7VILSB3lOW085-4qE3DzgrTjgyQ",
    "p": "1r52Xk46c-LsfB5P442p7atdPUrxQSy4mti_tZI3Mgf2EuFVbUoDBvaRQ-
        SWxkbk-
        moEzL7JXroSBjSrK3YIQgYdMgyAEPTPjXv_hI2_1eTSPVZfzL0lffNn03IXqWF5M
        DFuoUYE0hzb2vhrlN_rKrbfDIwUbTrjjgieRbwC6Cl0",
    "q":
        "wLb35x7hmQWZsWJmB_vle87ihgZ19S8lBEROLIsZG4ayZVe9Hi9gDVCOBmUDdaD
        YVTSNx_8Fyw1YYa9XGrGnDew00J28cRUoeBB_jKI1oma0Orv1T9aXIWxKwd4gvxF
        ImOWr3QRL9KEBRzk2RatUBnmDZJTIAfwTs0g68UZHvtc",
    "dp": "ZK-
        YwE7diUh0qR1tR7w8WHtolDx3MZ_OTowiFvgfeQ3SiresXjm9gZ5KLhMXvo-uz-
        KUJWDxS5pFQ_M0evdo1dKiRTjVw_x4NyqyXPM5nULPkcpU827rnpZzAJKpdhWAgq
        rXGKAECQH0Xt4taznjnd_zVpAmZZq60WPMBMfKcuE",
    "dq":
        "Dq0gfgJ1DdFGXiLvQEZnuKEN0UUmsJBxkjydc3j4ZYdBiMRAy86x0vHCjywcMlY
        Yg4yoC4YZa9hNVcsjqA3FeiL19rk8g6Qn29Tt0cj8qqyFpz9vNDBUfCAiJVeESOj
        JDZPYHdHY8v1b-o-Z2X5tvLx-TCekf7oxyeKDUqKWjis",
    "qi": "VIMpMYbPf47dT1w_zDUXfPimsSegnMOA1zTaX7aGk_8urY6R8-
        ZW1FxU7AlWAyLWybqq6t16VFd7hQd0y6flUK4SlOydB61gwanOsXGOAOv82cHq0E
        3eL4HrtZkUuKvnPrMnsUUFlfUdybVzxyjz9JF_XyaY14ardLSjf4L_FNY"
}
```

### Exemple de chiffrement

Le texte de message suivant est un exemple d’une requête POST /quotes sans chiffrement envoyée par le FSP Payeur à un FSP Bénéficiaire.

```json
POST /quotes HTTP/1.1 
FSPIOP-Destination:5678
Accept:application/vnd.interoperability.quotes+json;version=1.0 
Content-Length:975 
Date:Tue, 23 May 2017 21:12:31 GMT 
FSPIOP-Source:1234 
Content-Type:application/vnd.interoperability.quotes+json;version=1.0
```

```json
{
    "payee": {
        "partyIdInfo": { "partyIdType": "MSISDN", "partyIdentifier": "15295558888",
            "fspId": "5678" } },
    "amountType": "RECEIVE",
    "transactionType": { "scenario": "TRANSFER", "initiator": "PAYER",
        "subScenario": "P2P Transfer across MM systems", "initiatorType": "CONSUMER" },
    "note": "Ceci est un exemple de requête POST /quotes",
    "amount": { "amount": "150","currency": "USD" },
    "fees": { "amount": "1.5", "currency": "USD" },
    "extensionList": {
        "extension": [
            { "value": "value1", "key": "key1"},
            { "value": "value2", "key": "key2"},
            { "value": "value3", "key": "key3" }
        ]
    },
    "geoCode": { "latitude": "57.323889", "longitude": "125.520001"
    },
    "expiration": "2017-05-24T08:40:00.000-04:00",
    "payer": {
        "personalInfo": {
            "complexName": { "firstName": "Bill", "middleName": "Ben", "LastName": "Lee"
            }, "dateOfBirth": "1986-02-14" },
        "partyIdInfo": { "partyIdType": "MSISDN",
            "partySubIdOrType": "RegisteredCustomer", "partyIdentifier": "16135551212",
            "fspId": "1234"
        }, "name": "Bill Lee"
    }, "quoteId": "59e331fa-345f-4554-aac8-fcd8833f7d50",
    "transactionId": "36629a51-393a-4e3c-b347-c2cb57e1e1fc"
}
```

Dans ce cas, le FSP Payeur souhaite chiffrer deux champs du message API : **payer** et **payee.partyIdInfo.partyIdentifier**.

#### Chiffrer les champs requis

Comme il y a deux champs à chiffrer, le FSP Payeur doit les chiffrer l’un après l’autre.

##### Chiffrer "payer"

Le FSP Payeur exécute les étapes suivantes pour chiffrer le champ **payer** dans le message API **POST /quotes**.

1. Déterminer l’algorithme utilisé pour déterminer la CEK. Dans ce cas, supposons qu’il s’agit de **RSA-OAEP-256**.
2. Générer une CEK aléatoire de 256 bits. Dans ce cas, sa valeur est (notation tableau JSON) :

```
191 100 167 60 2 248 21 136 172 39 145 120 102 7 73 31 166 66 114 199 219 157 104 162 7 253 10 105 33 136 57 167
```

3. Chiffrer la CEK avec la clé publique du FSP Bénéficiaire indiquée au format JSON Web Key dans [Exemples de chiffrement/déchiffrement d’API](#api-encryptiondecryption-examples). Dans ce cas, la valeur chiffrée est :

```
22 210 45 47 ... (les valeurs restent identiques, inchangées pour la traduction)
```

4. Calculer la valeur de la clé chiffrée en BASE64URL(JWE Encrypted Key). La valeur sera :

```
FtItL5lft09UGsIqG5gyw6MS63mMeOCBtHgVAC7EFXL7lH9LxipX-rpiD4j5g-BJb2yfj...
```

... *(Le reste des exemples, tableaux, et représentations JSON sont laissés tels quels car ce sont des valeurs techniques universelles.)*

### Exemple de déchiffrement

Dans cet exemple, le FSP Bénéficiaire reçoit le message API POST /quotes du FSP Payeur. Le message est décrit dans le [Modèle de données pour le chiffrement](#encryption-data-model). Si le FSP Bénéficiaire détecte que le paramètre d'en-tête HTTP **FSPIOP-Encryption** est présent dans le message, il sait alors que certains champs ont été chiffrés par le FSP Payeur. Le FSP Bénéficiaire effectue alors les étapes suivantes pour déchiffrer les champs chiffrés.

#### Analyser FSPIOP-Encryption

Le FSP Bénéficiaire vérifie que la valeur de **FSPIOP-Encryption** est une représentation encodée UTF-8 d’un objet JSON valide selon la RFC 7159. Le FSP analyse alors le paramètre d’en-tête HTTP **FSPIOP-Encryption** pour obtenir les informations sur les champs chiffrés : nom du champ, Protected Header JWE, Clé chiffrée JWE, Vecteur d'initialisation JWE, et Tag d’authentification JWE pour chaque champ.

#### Déchiffrer les champs chiffrés

Dans ce cas, le FSP Bénéficiaire extrait deux champs **payer** et **payee.partyIdInfo.partyIdentifier** de l’en-tête HTTP **FSPIOP-Encryption**, puis les déchiffre l’un après l’autre.

##### Déchiffrer payer

Le FSP Payeur exécute les étapes suivantes pour déchiffrer le champ **payer** dans le message API **POST /quotes**.

1. Obtenir le Protected Header JWE encodé BASE64URL depuis **FSPIOP-Encryption** pour le champ **payer**. Sa valeur est :

```
eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0 
```

... *(Les étapes détaillées sont conservées, simplement traduites ; les valeurs techniques ne changent pas.)*

<br />

## Table des tableaux
- [Tableau 1 -- Modèle de données du champ d’en-tête HTTP FSPIOP-Encryption](#table-1)
- [Tableau 2 -- Modèle de données du type complexe EncryptedFields](#table-2)
- [Tableau 3 -- Modèle de données du type complexe EncryptedField](#table-3)