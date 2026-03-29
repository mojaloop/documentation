# Modèle de directive opérationnelle de la plateforme

- Version : 2.0 
    - Auteur : Carol Coye Benson (Glenbrook), Michael Richards (ModusBox)  
    - Date : Octobre 2019
    - Description : 

---

## **À propos du projet de documents commerciaux de la communauté Mojaloop**

Ce document fait partie du projet de documents commerciaux de la communauté Mojaloop. Le projet est destiné à soutenir les entités (pays, régions, associations de fournisseurs ou entreprises commerciales) mettant en œuvre de nouveaux systèmes de paiement utilisant le code Mojaloop. Ces entités devront également rédiger des règles commerciales que les participants au système suivront.

Le projet de documents commerciaux de la communauté Mojaloop fournit des modèles pour les règles commerciales et les documents associés. De nombreux choix sont impliqués dans la mise en œuvre d'un nouveau système de paiement : les modèles présentent certains de ces choix et, le cas échéant, des commentaires sont fournis sur la manière dont le choix particulier est lié aux objectifs d'un système aligné sur Level One.

Les documents suivants font partie du projet :

- Choix clés du schéma

- Modèle d'accord de participation au schéma

- Modèle de règles commerciales du schéma

- Modèle de directive opérationnelle de la plateforme

- Modèle de directive opérationnelle de gestion des exceptions

- Glossaire uniforme

## **Introduction**

Un schéma mettant en œuvre un système aligné sur Level One, y compris ceux utilisant le code de référence Mojaloop dans la plateforme, devra rédiger des règles commerciales pour le schéma. Un modèle pour ces règles commerciales est inclus dans ce projet. Les règles commerciales introduisent le concept de documents associés, qui font partie des règles commerciales et ont la même force — les DFSP signant les règles commerciales sont également tenus de suivre les dispositions des documents associés.

La directive opérationnelle de la plateforme est un document associé important qui décrit comment la plateforme du schéma fonctionnera et précise les obligations et responsabilités du schéma, de l'opérateur de la plateforme et des DFSP.

Ce document est un modèle pour une telle directive opérationnelle de la plateforme. Cependant, de nombreuses dispositions varieront en fonction des choix effectués par le schéma : certains de ces choix sont décrits dans le document « Choix clés du schéma » qui fait partie de ce projet.

Le modèle de règles commerciales qui fait partie de ce projet peut être utilisé indépendamment du choix de plateforme d'un schéma. Cette directive opérationnelle de la plateforme est plus spécifique à l'utilisation de Mojaloop comme plateforme.

## **Table des matières — Modèle de directive opérationnelle de la plateforme**

[1 - À propos de ce document](#_1-a-propos-de-ce-document)

[1.1 - Services du schéma](#_1-1-services-du-schema)

[1.2 - Spécification Open API](#_1-2-specification-open-api)

[1.3 - Cas d'utilisation du schéma](#_1-3-cas-d-utilisation-du-schema)

[1.4 - Identifiants pris en charge par le schéma](#_1-4-identifiants-pris-en-charge-par-le-schema)

[2 - Le service de recherche de compte](#_2-le-service-de-recherche-de-compte)

[2.1 - Description du service de recherche de compte](#_2-1-description-du-service-de-recherche-de-compte)

[2.2 - Requête de partie](#_2-2-requete-de-partie)

[2.3 - Requête Parties](#_2-3-requete-parties)

[2.4 - Réponse à la requête Parties](#_2-4-reponse-a-la-requete-parties)

[3 - Le service de devis](#_3-le-service-de-devis)

[3.1 - Description du service de devis](#_3-1-description-du-service-de-devis)

[3.2 - Demande de devis](#_3-2-demande-de-devis)

[3.3 - Réponse au devis](#_3-3-reponse-au-devis)

[4 - Le service de transfert](#_4-le-service-de-transfert)

[4.1 - Description du service de transfert](#_4-1-description-du-service-de-transfert)

[4.2 - Demande de transfert](#_4-2-demande-de-transfert)

[4.3 - Demande de paiement](#_4-3-demande-de-paiement)

[5 - Le service de règlement](#_5-le-service-de-reglement)

[5.1 - Règlement des transferts](#_5-1-reglement-des-transferts)

[5.2 - Règlement des frais : frais de traitement](#_5-2-reglement-des-frais-frais-de-traitement)

[5.3 - Règlement des frais : frais d'interchange](#_5-3-reglement-des-frais-frais-d-interchange)

[6 - Le service de gestion du schéma](#_6-le-service-de-gestion-du-schema)

[6.1 - Description du service de gestion du schéma](#_6-1-description-du-service-de-gestion-du-schema)

[6.2 - Le processus d'inscription](#_6-2-le-processus-d-inscription)

[6.3 - Service client DFSP](#_6-3-service-client-dfsp)

[6.4 - Gestion du système du schéma](#_6-4-gestion-du-systeme-du-schema)

[7 - Le service de gestion de la fraude](#_7-le-service-de-gestion-de-la-fraude)

[8 - Annexe : Cas d'utilisation pris en charge par le schéma et paramètres système](#_8-annexe-cas-d-utilisation-pris-en-charge-par-le-schema-et-parametres-systeme)

[9 - Annexe : Codes de catégorie de commerçants](#_9-annexe-codes-de-categorie-de-commercants)

## 1. À propos de ce document

Ces directives opérationnelles de la plateforme spécifient les exigences opérationnelles et techniques pour les DFSP et pour le schéma. De temps à autre, le schéma publiera des bulletins opérationnels supplémentaires, qui décriront des fonctionnalités opérationnelles supplémentaires du schéma et spécifieront des exigences supplémentaires pour les DFSP.

### 1.1 Services du schéma

- Les services du schéma sont utilisés par les DFSP pour échanger des transactions interopérables et pour gérer leur participation au schéma.

- Le service de recherche de compte du schéma permet aux DFSP du système d'identifier le DFSP qui gère le compte de transaction d'un bénéficiaire prévu ou d'une autre contrepartie à un transfert.

- Le service de transfert du schéma permet à un DFSP payeur d'envoyer un transfert à un DFSP bénéficiaire, effectuant ainsi un transfert de fonds d'un payeur à un bénéficiaire.

- Le service de règlement du schéma permet aux DFSP de régler leurs obligations financières envers le schéma en ce qui concerne les transferts.

- Le service de gestion du schéma permet au schéma d'accorder et de révoquer l'accès au schéma par les DFSP, gère les interactions continues des DFSP avec le schéma, surveille le fonctionnement efficace du schéma et fournit des outils aux DFSP pour gérer leur participation au schéma.

- Le service de gestion de la fraude du schéma permet aux DFSP de collaborer sur certains éléments de la gestion de la fraude afin de réduire les coûts et d'améliorer les résultats.

- Les DFSP sont tenus de suivre les procédures détaillées ci-dessous pour l'utilisation du schéma.

### 1.2 Spécification Open API

Les protocoles du schéma sont basés sur les modèles opérationnels et de données définis dans le document de spécifications « Open API for FSP Interoperability Specification » version 1.0 daté du \[xx\]. Lorsque le schéma s'écarte de cette spécification, ces écarts sont documentés ici et remplaceront les sections pertinentes de ce document. Le schéma peut mettre à jour la version utilisée en publiant un bulletin opérationnel.

### 1.3 Cas d'utilisation du schéma

Certaines règles et spécifications opérationnelles varient selon les cas d'utilisation et les cas d'utilisation secondaires pris en charge par le schéma. Le schéma reconnaît les cas d'utilisation et les cas d'utilisation secondaires par une combinaison de composants de données requis et d'inférence système. Cela est détaillé dans une annexe à ce document.

### 1.4 Identifiants pris en charge par le schéma

Le schéma prend en charge certains identifiants, ou adresses de paiement, à utiliser pour effectuer des transferts. L'identifiant identifie le bénéficiaire dont le compte de transaction est crédité pour le transfert. Les identifiants pris en charge par le schéma sont répertoriés dans une annexe aux règles commerciales.

Pour chaque identifiant pris en charge par le schéma, ce document doit spécifier ce qu'est l'identifiant et comment il est résolu (comment il est déterminé quel DFSP bénéficiaire est responsable du compte de transaction associé à cet identifiant).

#### 1.4.1 Exemple : L'identifiant MSISDN 

Chaque schéma aura ses propres directives pour chaque identifiant ; les dispositions ci-dessous pourraient varier considérablement en fonction des choix effectués.

- Les MSISDN sont des numéros mobiles qui sont globalement uniques. Les MSISDN sont l'identifiant de compte de transaction pour les DFSP qui sont des opérateurs de réseau mobile et qui fournissent des comptes de transaction à leurs clients.

- L'utilisation du MSISDN comme identifiant de bénéficiaire est limitée aux comptes de transaction fournis par les DFSP qui sont l'opérateur de réseau mobile responsable de ce MSISDN.

::: tip NOTE
Si les MSISDN sont utilisés pour d'autres comptes de transaction, ce sont des alias, et un protocole distinct pour les résoudre doit être spécifié.
:::

- Une requête de partie pour un MSISDN est résolue par un service de répertoire MSISDN déterminé par le schéma. Le schéma peut spécifier des obligations de maintenance du service de répertoire pour les DFSP opérateurs de réseau mobile de temps à autre.

#### 1.4.2 Exemple : L'identifiant du numéro de compte bancaire 

Chaque schéma aura ses propres directives pour chaque identifiant ; les dispositions ci-dessous pourraient varier considérablement en fonction des choix effectués.

- Les numéros de compte bancaire sont attribués aux clients par les DFSP bancaires qui fournissent des comptes de transaction à leurs clients.

- Le numéro de compte bancaire, associé à un code bancaire, forme l'identifiant de numéro de compte bancaire du schéma. Les DFSP payeurs sont responsables du formatage correct de l'identifiant de numéro de compte bancaire selon les formats qui seront spécifiés par le schéma.

- L'utilisation de l'identifiant de numéro de compte bancaire est limitée aux comptes de transaction fournis par les DFSP qui sont des banques.

- Une requête de partie pour un identifiant de compte bancaire est envoyée par le DFSP payeur au schéma. Le schéma vérifie que le code bancaire dans l'identifiant de compte bancaire est associé à une banque active dans le schéma.

#### 1.4.3 Exemple : L'identifiant commerçant du schéma 

Chaque schéma aura ses propres directives pour chaque identifiant ; les dispositions ci-dessous pourraient varier considérablement en fonction des choix effectués.

- L'identifiant commerçant est un identifiant défini par le schéma utilisé pour les paiements de personne à entreprise.

- L'utilisation de l'identifiant commerçant est limitée aux DFSP qui fournissent des comptes de transaction aux commerçants, émetteurs de factures, agences gouvernementales ou autres entités commerciales qui reçoivent des paiements de leurs clients via le schéma. Il peut être utilisé pour les paiements en personne et à distance. Le terme « commerçant » utilisé dans cette section inclut tous ces types de receveurs de paiements.

- L'utilisation de l'identifiant commerçant est limitée aux transferts des cas d'utilisation P2B ou P2G.

- Un commerçant peut demander plusieurs identifiants commerçant à son DFSP ; ceux-ci peuvent être utilisés par le commerçant pour différents points de vente, caisses ou magasins. Il n'y a pas de limite au nombre d'identifiants commerçant pouvant être liés à un seul compte de transaction. Cependant, un identifiant commerçant donné ne peut être lié qu'à un seul compte de transaction.

- L'identifiant commerçant est émis par le schéma au DFSP qui fournit au commerçant le compte de transaction dans lequel les paiements seront effectués.

- L'identifiant commerçant est émis sous forme de numéro, qui peut être affiché par un commerçant physiquement ou numériquement.

- Les identifiants commerçant peuvent être rendus sous forme de codes QR par les DFSP ou leurs clients commerçants. Les codes QR doivent être rendus selon les directives de format et de marque qui seront publiées par le schéma. Il est interdit aux DFSP d'utiliser d'autres formats de données de code QR ou marques pour recevoir des paiements via le schéma.

- Les DFSP sont tenus d'afficher la marque du schéma. Les exigences de marque du schéma seront spécifiées par le schéma. La marque du schéma doit être visible pour le client dans le magasin du commerçant, ou sur l'appareil que le client payeur utilise pour acheter à distance.

- Exigences d'inscription. Les DFSP demanderont un identifiant commerçant pour un client en utilisant une API du schéma spécifique à cet effet. Les DFSP devront fournir :

    - Identifiant DFSP

    - Le numéro de compte de transaction qui recevra les fonds payés au commerçant. Il peut s'agir soit d'un MSISDN, soit d'un numéro de compte bancaire.

    - Le \[numéro d'enregistrement commercial ou d'identification fiscale\] du commerçant. N'importe quel nombre d'identifiants commerçant peut être associé au même numéro d'enregistrement commercial ou d'identification fiscale.

    - Le nom du commerçant

- Les DFSP demandant un identifiant commerçant au schéma garantissent qu'ils ont complété les informations KYC requises pour le compte du commerçant au moment de la demande.

- Les DFSP sont tenus de fournir des informations de formation adéquates à leurs clients.

- Désactivation des identifiants commerçant. Les DFSP peuvent demander la désactivation d'un identifiant commerçant. Le schéma désactivera immédiatement cet identifiant commerçant, mais le conservera dans le système du schéma à des fins de reporting. Les demandes de devis ou les demandes de transfert effectuées vers cet identifiant commerçant seront refusées par le schéma et renvoyées au DFSP payeur.

Le schéma peut souhaiter fournir un mécanisme permettant le portage d'un identifiant commerçant d'un DFSP à un autre.

#### 1.4.4 L'identifiant Scheme ID 

Cet identifiant serait similaire à l'identifiant commerçant ci-dessus mais serait destiné aux consommateurs ainsi qu'aux entreprises, et pourrait être exprimé en phrases plutôt qu'en numéro. Notez que chaque schéma aura ses propres directives pour chaque identifiant ; les dispositions ci-dessous pourraient varier considérablement en fonction des choix effectués.

- Le Scheme ID est un identifiant défini par le schéma.

- Les DFSP sont tenus d'offrir à leurs clients l'option de demander un Scheme ID.

- Les Scheme ID peuvent prendre n'importe quelle forme, sous réserve uniquement de restrictions de longueur que le schéma spécifiera de temps à autre. Le schéma se réserve le droit de refuser l'utilisation de tout Scheme ID spécifique demandé.

Les schémas peuvent souhaiter activer les Scheme ID.

- Les clients peuvent demander un nombre quelconque de Scheme ID, sous réserve des limites imposées par leur DFSP. Plusieurs Scheme ID peuvent être associés à un seul compte de transaction. Cependant, chaque Scheme ID ne peut être associé qu'à un seul compte de transaction.

- Exigences d'inscription. Les DFSP demanderont un Scheme ID pour un client en utilisant une API du schéma spécifique à cet effet. Les DFSP devront fournir dans cette API :

    - Identifiant DFSP

    - Le Scheme ID demandé

    - Le numéro de compte de transaction qui recevra les fonds payés au client. Il peut s'agir soit d'un MSISDN, soit d'un numéro de compte bancaire.

    - Si le titulaire du compte de transaction est un commerçant ou une entreprise, le \[numéro d'enregistrement commercial ou d'identification fiscale\] du titulaire du compte. N'importe quel nombre de Scheme ID peut être associé au même numéro d'enregistrement commercial ou d'identification fiscale.

- Les DFSP demandant un Scheme ID au schéma garantissent qu'ils ont complété les informations KYC requises pour le compte du client au moment de la demande.

- Désactivation des identifiants du schéma. Les DFSP peuvent demander la désactivation d'un Scheme ID. Le schéma désactivera immédiatement ce Scheme ID, mais le conservera dans le système du schéma à des fins de reporting. Les demandes de devis ou les demandes de transfert effectuées vers ce Scheme ID seront refusées par le schéma et renvoyées au DFSP payeur.

Le schéma peut souhaiter fournir un mécanisme permettant le portage d'un Scheme ID d'un DFSP à un autre.

Les sections suivantes décrivent chaque service ainsi que les obligations et responsabilités des parties prenantes. Chaque service est composé de processus : la plupart des processus sont liés à des appels API spécifiques spécifiés dans la section [Spécification Open API](#_1-2-specification-open-api) de ce document.

## 2. Le service de recherche de compte

### 2.1 Description du service de recherche de compte 

- Le service de recherche de compte permet aux DFSP de faire correspondre des identifiants spécifiques pour des clients individuels au DFSP qui fournit un compte de transaction pour ce client. Les identifiants sont utilisés pour identifier des individus, commerçants, émetteurs de factures, agences gouvernementales ou autres entreprises. Tout type d'identifiant pris en charge par le schéma dispose d'un service d'identifiant défini, dont les paramètres sont indiqués dans la section « Identifiants pris en charge par le schéma » de ce document.

- Tous les services d'identifiant garantissent que les identifiants utilisés pour les transactions du schéma sont uniques au sein du schéma et sont associés à un seul DFSP qui fournit le compte de transaction pertinent pour ce client. Tout identifiant doit être associé à un seul compte de transaction.

- Les DFSP doivent compléter le processus de recherche de compte immédiatement avant d'initier un processus de devis, sauf autorisation contraire dans ces directives.

### 2.2 Requête de partie

- Une requête de partie est envoyée par un DFSP payeur à la plateforme. La requête de partie doit contenir les éléments de données clés suivants :

    - L'identifiant du bénéficiaire prévu

    - L'identifiant du DFSP payeur

Le schéma peut définir des éléments de données clés supplémentaires qui seront requis dans la requête de partie.

- La requête est transmise de la plateforme au service de recherche de compte pour ce type d'identifiant.

- Le service d'identifiant renvoie au service de recherche de compte l'identification du DFSP associé à cet identifiant, si une référence est trouvée. Si ce n'est pas le cas, une réponse négative est renvoyée et cela est communiqué par la plateforme au DFSP payeur. Si une référence est trouvée, le service de recherche de compte associe alors le DFSP identifié à l'identifiant DFSP correct du schéma.

### 2.3 Requête Parties

- Si la requête de partie réussit à identifier un DFSP bénéficiaire, la plateforme exécute alors une requête Parties au DFSP identifié pour déterminer si le DFSP est disposé à accepter une demande de devis dirigée vers cet identifiant.

### 2.4 Réponse à la requête Parties

- Le DFSP identifié répond soit avec une réponse positive à la requête Parties, soit avec une réponse d'erreur. Si positive, la réponse à la requête Parties doit contenir les éléments de données clés suivants :

    - Le nom complet du bénéficiaire

    - L'identifiant du DFSP payeur

    - Le type de compte de transaction, qui précise si le compte est un compte bancaire ou un portefeuille

    - Le type de titulaire du compte de transaction, qui précise si le titulaire du compte de transaction est un consommateur, un commerçant (y compris d'autres types d'entreprises) ou une agence gouvernementale.

    - Si le bénéficiaire est un commerçant, le code de catégorie de commerçant. Ces codes se trouvent dans une annexe à ce document.

Le schéma peut définir des éléments de données supplémentaires requis dans la réponse à la requête Parties.

-   La plateforme répond au DFSP payeur avec le résultat de la réponse à la requête Parties

## 3. Le service de devis

#### 3.1 Description du service de devis

- Le processus de devis précède le processus de transfert et permet au DFSP payeur et au DFSP bénéficiaire d'échanger certaines informations avant le transfert.

- Le processus de devis doit être complété avant qu'un DFSP payeur n'initie le processus de transfert. Cela est vrai pour tous les cas d'utilisation et cas d'utilisation secondaires.

- Les étapes du processus de devis sont présentées ci-dessous.

#### 3.2 Demande de devis 

- Une demande de devis est envoyée par un DFSP payeur au DFSP bénéficiaire ; la demande de devis est enregistrée par la plateforme. La demande de devis doit contenir les éléments de données clés suivants :

    - Le montant du transfert

    - Le type de montant défini comme montant d'envoi.

    - L'ensemble complet des informations de partie renvoyées par la réponse à la requête Parties.

    - Le nom complet du payeur (le titulaire du compte de transaction au DFSP payeur)

    - Les données de type de transaction requises pour le cas d'utilisation et le cas d'utilisation secondaire de la transaction, comme spécifié dans l'annexe des cas d'utilisation de ce document.

    - Un délai d'expiration, dont les paramètres autorisés seront spécifiés par le schéma de temps à autre.

Le schéma peut définir des éléments de données clés supplémentaires qui seront requis dans la réponse à la requête Parties.

- Une demande de devis pour un montant supérieur à la limite de valeur de transaction du schéma sera rejetée par la plateforme et renvoyée au DFSP payeur.

### 3.3 Réponse au devis

- Une réponse au devis est envoyée par le DFSP bénéficiaire au DFSP payeur ; la réponse au devis est enregistrée par la plateforme. Le DFSP bénéficiaire est tenu de répondre à une demande de devis.

- La réponse au devis doit contenir les éléments de données clés suivants :

    - Le montant du transfert

    - Un délai d'expiration, dont les paramètres autorisés seront spécifiés par le schéma de temps à autre.

    - L'objet de transaction signé qui contient les paramètres du transfert. L'objet de transaction est la description faisant autorité de la transaction aux fins du reporting du schéma, de la gestion de la fraude et de la résolution des litiges.

Le schéma peut définir des éléments de données clés supplémentaires qui seront requis dans la réponse à la requête Parties.

- La réponse au devis est signée par le DFSP bénéficiaire et définit les paramètres de la transaction ; le DFSP payeur ne peut pas modifier ces paramètres dans le processus de transfert.

## 4. Le service de transfert

### 4.1 Description du service de transfert

- Le service de transfert est le moyen par lequel le transfert effectif de fonds est accompli entre le DFSP payeur et le DFSP bénéficiaire. La demande de transfert est le processus clé au sein du service. Une demande de transfert doit être précédée d'un processus de devis.

### 4.2 Demande de transfert

- Une demande de transfert est envoyée par un DFSP payeur au DFSP bénéficiaire via le service de transfert du schéma. La plateforme enregistre la demande de transfert. La demande de transfert doit contenir les éléments de données clés suivants :

    - Les identifiants du DFSP payeur et du DFSP bénéficiaire

    - Le montant de la transaction

    - Un paquet ILP représentant l'objet de transaction

    - Un délai d'expiration, dont les paramètres autorisés seront spécifiés par le schéma de temps à autre.

Le schéma peut définir des éléments de données clés supplémentaires qui seront requis dans la demande de transfert.

- La demande de transfert est signée par le DFSP payeur

- La plateforme effectue un processus d'approbation de transfert pour déterminer si le transfert proposé peut être réglé. Le processus d'approbation de transfert est défini plus en détail dans la section du service de règlement de ce document.

- Si la demande de transfert échoue au processus d'approbation de transfert, la demande de transfert est renvoyée au DFSP payeur.

- Si la demande de transfert réussit le processus d'approbation de transfert, la plateforme réserve les fonds spécifiés dans la demande de transfert dans le grand livre de position du DFSP payeur. Cela est défini plus en détail dans la section du service de règlement de ce document.

- Le DFSP bénéficiaire détermine s'il acceptera le transfert.

- S'il n'est pas accepté, une réponse d'erreur est renvoyée à la plateforme. La plateforme libère la réservation de fonds dans le grand livre de position du DFSP payeur et renvoie une condition d'erreur au DFSP payeur.

- S'il est accepté, le DFSP bénéficiaire renvoie une réponse de transfert signée indiquant que le transfert a été exécuté. La plateforme remplace le débit provisoire par un débit dans le grand livre de position du DFSP payeur et crédite le grand livre de position du DFSP bénéficiaire d'un crédit du montant du transfert.

- La plateforme envoie ensuite une confirmation du transfert exécuté au DFSP payeur et au DFSP bénéficiaire.

- Si la plateforme ne reçoit pas de réponse de transfert signée dans le délai d'expiration de la demande de transfert, le transfert sera annulé et le schéma en informera les DFSP bénéficiaire et payeur.

- Les DFSP payeurs et bénéficiaires sont tenus :

    - De notifier leurs clients de l'état d'un transfert en temps opportun

    - De débiter et créditer immédiatement les comptes de transaction de leurs clients lors de l'exécution du transfert

    - De libérer immédiatement tout fonds réservé si un transfert a été refusé ou annulé

### 4.3 Demande de paiement 

_Cette section n'a pas encore été rédigée._

## 5. Le service de règlement

Ce document présente un modèle pour les processus de règlement tant pour les transferts que pour les frais du schéma. Il existe de multiples approches possibles pour le règlement, qui sont discutées dans le document « Choix clés » qui fait partie de ce projet. Le modèle ci-dessous couvre deux modèles : le règlement net et le règlement brut continu. Le code de référence Mojaloop prend en charge un certain nombre de modèles de règlement différents, y compris ceux-ci.

### 5.1 Règlement des transferts 

#### 5.1.1 Description du service de règlement des transferts

- Le règlement des transferts est le moyen par lequel les DFSP règlent leurs obligations financières les uns envers les autres. Il y a cinq processus dans le règlement des transferts : le processus de grand livre, le processus de plafond de débit net, le processus d'approbation de transfert, le processus de comptabilisation du règlement et le processus de gestion du compte de règlement.

- \[_Option de règlement net_\] Les DFSP sont tenus d'ouvrir un compte bancaire de règlement auprès de la banque de règlement du schéma. \[_Option de règlement brut continu_\] Les DFSP sont tenus de devenir copropriétaires du compte bancaire de règlement mutualisé du schéma auprès de la banque de règlement du schéma, et d'utiliser ou d'ouvrir tout autre compte bancaire individuel auprès de la banque de règlement du schéma si nécessaire pour transférer des fonds vers et depuis le compte bancaire de règlement mutualisé du schéma.

#### 5.1.2 Le grand livre de la plateforme 

- La plateforme est responsable du maintien d'un grand livre de position DFSP pour chaque DFSP. Cette opération fonctionne en continu. \[_Option de règlement brut continu_\] Le grand livre de position DFSP de chaque DFSP, moins les écritures provisoires, représente la part de propriété de ce DFSP dans le compte bancaire de règlement mutualisé du schéma.

- Le grand livre de position enregistre :

    - Tous les transferts exécutés comme débits dans le grand livre du DFSP payeur et crédits dans le grand livre du DFSP bénéficiaire

    - Toutes les demandes de transfert comme débits provisoires dans le grand livre du DFSP payeur. Ces débits provisoires sont supprimés lorsque le transfert est exécuté, refusé par le DFSP bénéficiaire ou expire.

    - \[_Option de règlement net uniquement_\] Les écritures de règlement livrées et acceptées par la banque de règlement du schéma pour ce DFSP.

    - \[_Option de règlement brut continu uniquement_\] Les transferts vers et depuis le compte bancaire de règlement mutualisé du schéma effectués par les DFSP.

- La position du grand livre DFSP est la somme de tous les éléments énumérés ci-dessus. Cela est utilisé dans le processus d'approbation de transfert.

#### 5.1.3 Processus de plafond de débit net

- Le plafond de débit net d'un DFSP est une valeur que la plateforme utilise pendant le processus d'approbation de transfert. Le débit net d'un DFSP est la somme de :

    - \[_Option de règlement net uniquement_\] Une valeur fixée par le schéma qui est destinée à représenter les fonds que le DFSP a disponibles sur son compte bancaire de règlement

Notez que le schéma peut être en mesure d'automatiser le calcul de la valeur décrite ci-dessus, ou il peut choisir de la saisir manuellement dans la section Opérateur de la plateforme du portail du schéma.

- La marge du schéma pour ce DFSP. Il s'agit d'une valeur, déterminée par le schéma, qui est spécifique à un DFSP donné. Cette valeur peut être un pourcentage de la position du grand livre DFSP ou peut être une valeur absolue. Le schéma peut modifier la marge du schéma pour tout DFSP à sa discrétion. Elle peut avoir pour effet d'augmenter ou de diminuer la capacité d'un DFSP à exécuter des transactions.

- La marge discrétionnaire du DFSP. Il s'agit d'une valeur, déterminée par un DFSP individuel, qui diminue la valeur absolue du plafond de débit net. La marge discrétionnaire du DFSP est fixée dans les paramètres autorisés définis par le schéma. Cela a pour effet de diminuer la capacité du DFSP à exécuter des transactions.

#### 5.1.4 Processus d'approbation de transfert 

- Approbation de transfert. Lorsque la plateforme reçoit une demande de transfert d'un DFSP payeur, la plateforme approuvera ou rejettera la demande sur la base d'une comparaison du montant du transfert demandé avec la position actuelle du grand livre du DFSP payeur moins le plafond de débit net du DFSP payeur.

- Si le transfert demandé est inférieur à cette somme, la plateforme transmettra la demande au DFSP bénéficiaire. S'il est supérieur à la valeur du plafond de débit net, la plateforme rejettera la demande et la renverra au DFSP payeur.

#### 5.1.5 Processus de comptabilisation du règlement

- \[_Option de règlement net uniquement_\] Le schéma définira les paramètres des fenêtres de règlement utilisées pour le schéma ; cela inclura la fréquence des fenêtres ou d'autres paramètres (limites de valeur, etc.) choisis pour définir les fenêtres de règlement.

- \[_Option de règlement net uniquement_\] À la fin de chaque fenêtre de règlement définie, la plateforme calculera la position nette de règlement de chaque DFSP : cette position est le solde du grand livre de position DFSP. Ces soldes deviennent les écritures de règlement pour cette fenêtre.

- \[_Option de règlement net uniquement_\] La plateforme enverra les écritures de règlement pour chaque DFSP à la banque de règlement choisie par le schéma.

- \[_Option de règlement net uniquement_\] La banque de règlement comptabilisera les écritures de règlement sur le compte bancaire de règlement de chaque DFSP, et enverra une confirmation à la plateforme de l'achèvement de ce processus.

Les règles du schéma devront tenir compte des dispositions et procédures en cas d'échec du processus décrit ci-dessus.

#### 5.1.6 Processus de gestion du compte de règlement

- \[_Option de règlement net_\] Les DFSP peuvent ajouter des fonds à leur compte bancaire de règlement du schéma à leur discrétion. Le schéma fournira des instructions sur la manière de procéder. \[_Option de règlement brut continu_\] Les DFSP peuvent transférer des fonds vers le compte bancaire de règlement mutualisé du schéma à leur discrétion. Le schéma fournira des instructions sur la manière de procéder.

- \[_Option de règlement brut continu uniquement_\] Le schéma fournira un rapport de fin de journée aux DFSP montrant leur part de propriété dans le compte bancaire de règlement mutualisé du schéma.

- Les DFSP peuvent demander le retrait de fonds de leur \[_Option de règlement net_\] compte bancaire de règlement via le portail du schéma. \[_Option de règlement brut continu_\] Les DFSP peuvent demander le retrait de fonds du compte bancaire de règlement mutualisé du schéma via le portail du schéma. Le schéma examinera le retrait demandé et, s'il est approuvé, exécutera le transfert pour le compte du DFSP. L'objectif de cet examen est de s'assurer que la part du DFSP dans le compte bancaire de règlement est suffisante pour prendre en charge les transferts en cours : cette approbation ne sera pas refusée de manière déraisonnable.

#### 5.1.7 Rapports de règlement du schéma 

- Le schéma fournira, via le portail DFSP du schéma, des informations aux DFSP qui incluent pour chaque DFSP :

    - Le plafond de débit net actuel et ses composantes

    - La position actuelle du grand livre et ses composantes, y compris les transferts exécutés pour tous les DFSP et les transferts provisoires pour les DFSP payeurs

    - Des alertes à certains niveaux de la position actuelle du grand livre : ces niveaux seront déterminés par les DFSP et/ou le schéma de temps à autre

- Des outils pour permettre aux DFSP de prévoir leur volume de transfert anticipé sur la base de données historiques

### 5.2 Règlement des frais : frais de traitement

Cette section n'a pas encore été rédigée.

### 5.3 Règlement des frais : frais d'interchange

Cette section n'a pas encore été rédigée.

## 6. Le service de gestion du schéma

::: tip NOTE
Il existe un service parallèle d'opérateur de plateforme nécessaire au fonctionnement de la plateforme qui n'est pas décrit dans ce document.
:::

### 6.1 Description du service de gestion du schéma

- Le service de gestion du schéma est fourni par le schéma pour aider les DFSP dans leur utilisation des services du schéma. Bon nombre de ces fonctions sont fournies via le portail du schéma, qui est mis à la disposition des DFSP du schéma.

- Les processus suivants font partie du service de gestion du schéma :

### 6.2 Le processus d'inscription

- Le processus d'inscription permet la demande de participation d'un DFSP et l'intégration opérationnelle et technique. Il couvre les domaines suivants :

    - Formulaires et processus de demande de participation d'un DFSP au schéma.

    - Formulaires et processus d'obtention de certificats numériques et de signatures numériques pour une utilisation avec la plateforme.

    - Processus de téléchargement des artefacts logiciels fournis par le schéma, y compris les SDK et les API.

    - Processus de test de la préparation technique pour accéder à la plateforme et aux services.

    - Processus de réception de l'approbation et de la certification du schéma pour l'accès à la plateforme et aux services.

### 6.3 Service client DFSP

- Le schéma fournira un service d'assistance en ligne et téléphonique pour les DFSP.

- Le portail du schéma fournira des moyens par lesquels les DFSP peuvent désigner des administrateurs et des utilisateurs du portail, et mettre à jour les informations du profil DFSP.

### 6.4 Gestion du système du schéma

- Le schéma fournira, via le portail du schéma, des moyens par lesquels les DFSP peuvent consulter leur grand livre de position actuel, leur plafond de débit net et leur activité récente et historique avec le schéma.

- Le schéma fournira, via le portail du schéma, des moyens par lesquels les DFSP peuvent utiliser les données historiques, y compris leurs positions et historiques de plafond de débit net, pour prévoir les volumes à venir et les niveaux de financement de règlement requis.

- Le schéma fournira des moyens par lesquels les DFSP peuvent obtenir des mises à jour des artefacts logiciels qu'ils ont précédemment téléchargés.

- Le schéma fournira, via le portail du schéma, des moyens par lesquels les DFSP peuvent demander un retrait de leur part du compte bancaire de règlement du schéma.

- Le schéma fournira, via le portail du schéma, des moyens par lesquels les DFSP peuvent consulter leur part du solde du compte bancaire de règlement du schéma.

## 7. Le service de gestion de la fraude

_Cette section n'a pas encore été rédigée, mais devrait inclure les sections suivantes :_
    
1. _Description de l'utilitaire de gestion de la fraude — Objet et portée_

2. _La base de données de transactions partagée_

3. _Schéma de catégorisation de la fraude_

4. _Signalement des acteurs ou transactions connus comme malveillants_

5. _Algorithmes et processus de détection des anomalies et de la fraude_

6. _Rapports DFSP_

7. _Options d'interception de transactions en temps réel_

## 8. Annexe : Cas d'utilisation pris en charge par le schéma et paramètres système

_Il s'agit du même tableau que celui qui apparaît dans le document des règles commerciales, mais il a ajouté les codes systémiques nécessaires pour que la plateforme reconnaisse une transaction comme appartenant à un cas d'utilisation ou un cas d'utilisation secondaire donné. Un schéma ne définirait des cas d'utilisation secondaires que s'il souhaitait rédiger des règles et/ou spécifier des frais propres à ce cas d'utilisation secondaire._

_Ce tableau est un exemple de tableau de cas d'utilisation et de cas d'utilisation secondaires qu'un schéma pourrait prendre en charge._

| Code du cas d'utilisation | Cas d'utilisation | Cas d'utilisation secondaire | Éléments de données requis | Autres méthodes de détermination du cas d'utilisation |
| :--- | :----- | :--------- | :-------------------------- | :------------------------------------------- |
| 1.0  | P2P  | Personne à personne | Paramètre API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Consumer</br> | |
| 1.1 | P2P | Portefeuille à portefeuille | Le type de compte de transaction pour le DFSP payeur est Portefeuille et pour le DFSP bénéficiaire est Portefeuille |
| 1.2 | P2P | Banque à banque | Le type de compte de transaction pour le DFSP payeur est Banque et pour le DFSP bénéficiaire est Portefeuille |
| 1.3 | P2P | Portefeuille à banque | Le type de compte de transaction pour le DFSP payeur est Portefeuille et pour le DFSP bénéficiaire est Banque |
| 1.4 | P2P | Banque à portefeuille | Le type de compte de transaction pour le DFSP payeur est Banque et pour le DFSP bénéficiaire est Portefeuille. |
| 2.0 | Paiement en masse | | Paramètres API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Consumer</br> |
| 2.1 | B2P | Banque à banque | Initiator Type = Business |
| 2.2 | G2P | Gouvernement à personne | Initiator Type = Government |
| 3.0 | P2B | Personne à entreprise | Paramètres API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Business</br> |
| 3.1 | P2B | Achat par numéro de caisse | Initiator Type = Device | |
| 3.2 | P2B | Achat par code QR | à déterminer | |
| 3.3 | P2B | Achat en ligne | Merchant ID Code = à déterminer | |
| 3.4 | P2B | Paiement de facture | | à déterminer : un élément de données dans la demande de devis inclura le numéro de compte du payeur chez l'émetteur de factures |
| 3.5 | P2B | Personne à entreprise - Autre | | | 
| 4.0 | P2G | | Paramètres API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Government</br> | 
| 4.1 | P2G | Personne à gouvernement | | |
| 4.1 | P2G | Achat par numéro de caisse | Initiator Type = Device | |
| 4.2 | P2G | Achat par code QR | à déterminer | |
| 4.3 | P2G | Achat en ligne | Merchant ID Code = à déterminer | |
| 4.4 | P2G | Paiement de facture | | à déterminer : un élément de données dans la demande de devis inclura le numéro de compte du payeur chez l'émetteur de factures |

## 9. Annexe : Codes de catégorie de commerçants

_Le schéma voudra spécifier des codes pour reconnaître le type de commerçant payé. Le terme « commerçant » est ici utilisé au sens large pour inclure tous les types d'accepteurs de paiements non-consommateurs. Un système de codes de catégorie de commerçants pourrait vouloir reconnaître les industries, les domaines (magasins en personne vs à distance ou en ligne) et/ou la taille des commerçants._
