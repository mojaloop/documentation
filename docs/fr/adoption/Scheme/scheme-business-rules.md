# Modèle de règles commerciales du schéma

- Version : 4.0 
    - Auteur : Carol Coye Benson (Glenbrook)
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

Des schémas de paiement à travers le monde sont en cours de mise en œuvre, ou envisagent la mise en œuvre, de systèmes de paiement basés sur Mojaloop. Mojaloop est un logiciel open source pour les sociétés de services financiers, les régulateurs gouvernementaux et d'autres acteurs relevant les défis de l'interopérabilité et de l'inclusion financière. La Fondation Bill & Melinda Gates a fourni un financement et un soutien pour Mojaloop à travers le Level One Project, une vision pour les marchés financiers numériques basée sur les principes d'interopérabilité, de collaboration et d'inclusion.

Les schémas mettant en œuvre Mojaloop devront rédiger des règles commerciales qui régissent les droits et responsabilités des participants au système. Ce document fournit un modèle pour ces règles commerciales. Le modèle est structuré sous forme de plan détaillé : la formulation réelle des règles sera déterminée par les schémas qui les mettent en œuvre et les juridictions dans lesquelles ils opèrent. Dans de nombreuses parties du document, nous suggérons simplement un sujet sur lequel un schéma pourrait vouloir envisager de rédiger une règle : encore une fois, les spécificités de la règle varieront selon le schéma.

Avant la rédaction des règles commerciales, les schémas doivent prendre des décisions commerciales majeures sur le fonctionnement du système et de ses partenaires de l'écosystème. Ces décisions sont décrites dans un document séparé au sein du projet de documents commerciaux de la communauté Mojaloop, « Choix clés du schéma ». Les lecteurs sont encouragés à lire ce document en premier.

Modèle de règles commerciales du schéma

## **Table des matières**

[1 - À propos de ces règles commerciales du schéma](#_1-a-propos-de-ces-regles-commerciales-du-schema)

[2 - Objectifs du schéma](#_2-objectifs-du-schema)

[3 - Participation au schéma](#_3-participation-au-schema)

[4 - Règles commerciales du schéma](#_4-regles-commerciales-du-schema)

[5 - Responsabilités et obligations du schéma](#_5-responsabilites-et-obligations-du-schema)

[6 - Responsabilités et obligations des participants](#_6-responsabilites-et-obligations-des-participants)

[7 - Responsabilité - Répartition des responsabilités](#_7-responsabilite-repartition-des-responsabilites)

[8 - Sécurité, gestion des risques et confidentialité des données](#_8-securite-gestion-des-risques-et-confidentialite-des-donnees)

[9 - Plateforme et services du schéma](#_9-plateforme-et-services-du-schema)

[10 - Gestion des exceptions](#_10-gestion-des-exceptions)

[11 - Annexe : Documents associés](#_11-annexe-documents-associes)

[12 - Annexe : Processus d'intégration et de sortie](#_12-annexe-processus-d-integration-et-de-sortie)

[13 - Annexe : Services du schéma](#_13-annexe-services-du-schema)

[14 - Annexe : Cas d'utilisation pris en charge par le schéma](#_14-annexe-cas-d-utilisation-pris-en-charge-par-le-schema)

[15 - Annexe : Grille tarifaire du schéma](#_15-annexe-grille-tarifaire-du-schema)

[16 - Annexe : Gestion des risques, sécurité, confidentialité et normes de service](#_16-annexe-gestion-des-risques-securite-confidentialite-et-normes-de-service)

## **Guide de ce document**

Les titres de section et les entrées à puces sous les titres de section sont des formulations réellement proposées, ou des sections suggérées pour un document de règles. Le texte en italique constitue des commentaires qui peuvent être utilisés lorsqu'un schéma rédige la formulation réelle d'un document de règles.

## 1. À propos de ces règles commerciales du schéma

### 1.1 Ceci constitue les règles commerciales du schéma

::: tip NOTE
Le logiciel Mojaloop peut être utilisé pour des échanges bilatéraux entre DFSP, ainsi que dans une structure de schéma qui utilise un commutateur. Ce document suppose cette dernière option ; que le schéma fournit, engage ou organise autrement l'échange de transactions interopérables via un commutateur. Certains concepts de ces règles ne s'appliquent qu'à cette configuration ; d'autres seraient utiles dans des accords bilatéraux également.
:::

### 1.2 Propriété du schéma 

<ul><i>Qui est propriétaire du schéma, quelles sont les possibilités de participation à la propriété. Référence à d'autres documents (charte, statuts, etc.)</i></ul>

### 1.3 Documents associés définis

- Ces règles incluent les documents associés répertoriés dans une annexe à ces règles. Les documents associés font partie des règles opérationnelles et ont la force de celles-ci.

<ul><i>Les documents associés devraient inclure la directive opérationnelle de la plateforme et le glossaire uniforme. Cela n'inclut pas les divers documents techniques qui peuvent être référencés dans les règles commerciales ou la directive opérationnelle de la plateforme.</i></ul>

### 1.4 Les règles commerciales du schéma sont contraignantes pour les participants

<ul><i>Cela répète la disposition de l'accord de participation au schéma. Notez que les règles commerciales du schéma ne sont contraignantes que pour les DFSP qui participent au schéma. Le schéma peut rédiger des règles exigeant que certaines dispositions de ces règles soient transmises aux clients des participants (par exemple, les commerçants) ou aux partenaires (par exemple, les processeurs) - mais il s'agit d'une obligation du participant envers le schéma, et non des autres parties.</i></ul>

### 1.5 Les règles peuvent être modifiées

<ul><i>Les détails du processus de modification sont spécifiés ailleurs.</i></ul>

### 1.6 Les termes sont définis dans le glossaire uniforme

<ul><i>Le glossaire est un document séparé, plutôt qu'interne au document des règles commerciales. Cela permet d'assurer la cohérence de la terminologie à mesure que le service évolue et que la directive opérationnelle de la plateforme change.</i></ul>

## 2. Objectifs du schéma

<ul><i>Il s'agit d'une section qui permet à un schéma d'énoncer les objectifs du schéma. Nous suggérons le soutien aux transactions financières interopérables, l'inclusion financière et l'égalité des genres. C'est également l'occasion de référencer le soutien aux principes de conception du Level One Project, une stratégie nationale ou régionale de paiement (ou stratégie d'économie numérique), ou un ensemble de principes de conception spécifiques au schéma.</i></ul>

## 3. Participation au schéma

### 3.1 Éligibilité à la participation

- Critères d'éligibilité

<ul><i>Une déclaration indiquant quels types d'institutions sont éligibles pour postuler comme participant au schéma. Le principe de conception Level One est que tout fournisseur autorisé de comptes de transaction dans une juridiction couverte par le schéma devrait être éligible pour postuler.</i></ul>

- Critères d'approbation

<ul><i>Dispositions du schéma pour l'acceptation des candidatures, y compris des déclarations de haut niveau sur les informations requises du candidat, telles que la démonstration d'une capacité durable à respecter les obligations financières et les obligations de conformité. Le processus de candidature réel figure dans une annexe à ces règles. Les exigences de certification technique peuvent être répertoriées dans la directive opérationnelle de la plateforme.</i></ul>

### 3.2 Licence

<ul><i>Ce concept peut ou non s'appliquer lorsque l'opérateur du schéma est une entité gouvernementale. Si le concept de licence n'est pas inclus dans les règles, il doit y avoir une disposition dans la section « Éligibilité à la participation » concernant la résiliation d'un participant.</i></ul>

- Un participant se voit accorder une licence pour participer au schéma et utiliser la propriété du schéma conformément aux règles commerciales du schéma.

- Un participant ne peut utiliser la propriété du schéma que conformément aux règles commerciales du schéma. Les licences limiteront l'utilisation de la propriété du schéma à la fourniture de services par le participant en lien avec le schéma et conformément aux règles.

- Les licences ne seront pas exclusives.

### 3.3 Accès par paliers

<ul><i>Les schémas peuvent choisir de permettre à certains candidats de rejoindre le schéma en tant que participants indirects. Cette section précise les conditions pour cela. Certains schémas permettent séparément la participation technique indirecte et la participation indirecte au règlement.</i></ul>

<ul><i>Si cela est autorisé, des termes définis (tels que banque sponsor et participant indirect) sont requis. Cette section doit clairement montrer quelles sont les obligations de chaque partie ; cela peut faire référence aux sections d'obligations apparaissant ultérieurement.</i></ul>

### 3.4 Départ de la participation

<ul><i>Dispositions pour la suspension ou la résiliation par le schéma de la participation d'un participant au schéma. Le schéma peut suspendre, limiter ou exclure un participant de la participation au schéma s'il détermine que l'incapacité du participant à respecter une règle constitue une charge excessive pour le schéma ou les autres participants ou pose des risques excessifs pour l'intégrité du schéma ou la réputation du schéma.</i></ul>

<ul><i>Dispositions permettant aux participants de mettre fin à leur participation au schéma.</i></ul>

## 4. Règles commerciales du schéma

### 4.1 Portée des règles commerciales du schéma

- Ces règles s'appliquent à chaque participant et régissent les droits et responsabilités des participants et du schéma.

- Ces règles peuvent être remplacées dans la mesure où elles entrent en conflit avec toute loi applicable. Rien dans ces règles ne sera appliqué de manière à exiger que le schéma ou tout participant viole la loi applicable.

- Toutes les questions relatives à l'interprétation des règles et tous les litiges découlant de la participation au schéma seront soumis aux lois de \[xxxx\]

<ul><i>Des dispositions devraient être prises pour la résolution des litiges entre participants ou entre les participants et le schéma.</i></ul>

### 4.2 Modifications des règles commerciales du schéma

- Les participants peuvent de temps à autre fournir des suggestions ou des demandes de modification des règles.

- Les suggestions des participants pour des modifications des règles peuvent être utilisées par le schéma ou par d'autres participants en lien avec le schéma sans compensation ni attribution au participant qui fait la suggestion ou la demande.

- Les modifications des règles seront effectuées selon une procédure consultative :

- Un ou plusieurs participants ou le schéma peuvent proposer une modification des règles commerciales du schéma.

- Le schéma publiera les propositions à tous les participants et demandera des commentaires et suggestions à ce sujet ; tous les commentaires reçus seront publiés à tous les participants.

- Le schéma peut inclure, avec la publication d'un changement proposé, sa suggestion déterminée de manière indépendante pour la formulation d'un changement dans les règles.

<ul><i>Le schéma devrait avoir un processus défini pour l'adoption des changements, qui peut inclure le vote des participants ou une décision du schéma. S'il y a un vote, les règles ici devraient spécifier les paramètres.</i></ul>

- Le schéma peut accorder des dérogations aux règles sur demande des participants.

- Des dispositions pour des changements urgents peuvent être prises par le schéma pour répondre à des risques ou des exigences réglementaires.

## 5. Responsabilités et obligations du schéma

### 5.1 Définition et fourniture des services du schéma

- Le schéma définit l'ensemble des services du schéma qui sont fournis aux participants. La liste définie des services du schéma est présentée dans une annexe à ces règles.

<ul><i>Services du schéma</i></ul>

- Le schéma précise comment les services du schéma sont fournis aux participants - ils peuvent être exploités par l'entité du schéma, par une autre entité sous contrat avec le schéma, ou il peut y avoir un autre arrangement. Cette section donne au schéma le droit de définir de nouveaux services, de modifier les services existants, etc.

- Le schéma peut définir des normes de niveau de service pour lui-même et pour les participants dans l'utilisation de ces services.

- Pour les services de plateforme externalisés, le schéma spécifie les services à fournir. Le schéma peut spécifier les accords de niveau de service pour les fournisseurs de ces services.

- Pour le service de règlement du schéma, le schéma sélectionne et contracte avec une ou plusieurs banques de règlement pour le règlement inter-participants.

- Le schéma établit une limite de valeur de transaction qui fixe la valeur maximale de tout transfert effectué via la plateforme du schéma. Les DFSP peuvent fixer des valeurs inférieures pour leurs clients.

- Le schéma devrait examiner s'il garantira au DFSP bénéficiaire tout transfert exécuté conformément à ces règles.

<ul><i>Le schéma devrait examiner s'il garantira au DFSP bénéficiaire tout transfert exécuté conformément à ces règles.</i></ul>

### 5.2 Rédaction, mise à jour et maintenance des règles

- Le schéma rédige, met à jour et maintient les règles commerciales.

- Le schéma est responsable d'informer les participants de toute modification des règles, de tous les frais, des politiques susceptibles d'affecter l'utilisation du schéma par les participants, ou de toute autre information importante et pertinente.

- Le schéma est responsable de l'établissement d'une politique, et de sa communication aux participants, pour l'application des règles.

- Le schéma est responsable de l'établissement de politiques concernant l'octroi de dérogations aux règles aux participants.

### 5.3 Autres responsabilités du schéma

- Le schéma administre les processus d'intégration et de sortie des participants. Ces processus sont répertoriés dans une annexe à ces règles.

- Le schéma surveille l'éligibilité continue des participants selon les exigences établies pour la participation.

- Le schéma définit un ensemble de cas d'utilisation et de cas d'utilisation secondaires. Ceux-ci sont répertoriés dans une annexe à ces règles.

- Le schéma établit la grille tarifaire et définit les processus par lesquels les frais sont collectés. La grille tarifaire figure dans une annexe à ces règles.

- Le schéma définit la marque du schéma et établit des directives pour son utilisation. Ces directives figurent dans un document associé.

- Le schéma mesure la progression du schéma et de ses participants.

- Le schéma définit des politiques et procédures en matière de sécurité, de gestion des risques et de confidentialité des données pour le schéma et ses participants.

- Le schéma définit des politiques et procédures pour la gestion des exceptions de transaction.

- Le schéma entreprend des activités pour promouvoir et encourager l'adoption et l'utilisation du schéma.

- Le schéma planifie l'amélioration et l'expansion à long terme de la plateforme pour répondre aux besoins et opportunités du marché en évolution dans l'avancement des objectifs du schéma.

## 6. Responsabilités et obligations des participants

- Les participants sont tenus de se conformer à ces règles commerciales et aux documents associés à ces règles.

- Les participants doivent se conformer à toute loi applicable en ce qui concerne leur participation au schéma dans les territoires dans lesquels ils opèrent et dans lesquels ils utilisent les services du schéma. Le schéma n'assume aucune responsabilité quant à la conformité des participants à la loi applicable.

- Les participants sont tenus de permettre l'utilisation et la divulgation d'informations personnelles comme l'exigent ces règles commerciales et de fournir des informations à leurs clients et d'obtenir les consentements nécessaires concernant cette utilisation et divulgation d'informations personnelles comme l'exige la loi applicable.

- Les participants acceptent de payer des frais au schéma et aux autres participants comme spécifié dans ces règles.

- Les participants adhéreront aux spécifications de marque du schéma comme spécifié dans ces règles.

- Les participants utiliseront les services du schéma comme spécifié dans ces règles.

    <ul><i>Les schémas devront examiner s'ils souhaitent : 1) exiger l'utilisation du schéma pour les transactions éligibles au schéma (en supposant l'autorité des règles pour ce faire) ; 2) exiger l'utilisation de la plateforme du schéma pour les transactions « on-us » (nécessiterait des frais de traitement séparés, probablement nuls pour ces transactions) ; si les transactions « on-us » ne passent pas par la plateforme, si le schéma souhaite exiger le reporting des transactions « on-us » au schéma, pour utilisation avec un utilitaire de fraude.</i></ul>

- Tous les transferts effectués en utilisant la marque du schéma ou décrits comme étant effectués avec le schéma seront effectués en utilisant les services du schéma.

    <ul><i>Les schémas devront examiner s'ils souhaitent énoncer la règle ci-dessus. Certains schémas peuvent vouloir que les participants utilisent la marque du schéma pour les transactions on-us qui n'utilisent pas les services du schéma. Cela pourrait être formulé comme « tous les transferts interopérables ».</i></ul>

- _\[Option de règlement net\]_ Les participants ouvriront un compte bancaire de règlement auprès de la banque de règlement spécifiée par le schéma, ou mettront à disposition un compte existant à ces fins, comme autorisé par le schéma. _\[Option de règlement brut continu\]_ Les participants deviendront copropriétaires du compte de règlement mutualisé du schéma et signeront l'accord de compte bancaire de règlement du schéma à cet effet. Les participants transféreront des fonds vers et depuis ce compte à partir de leurs comptes de réserve, de compensation ou de fiducie existants auprès de la banque de règlement du schéma, comme spécifié dans les directives opérationnelles du schéma.

- Les participants partageront des informations avec le schéma dans la mesure strictement nécessaire au fonctionnement du schéma, y compris pour la diligence raisonnable, l'intégration technique, la configuration, la gestion des transactions et d'autres fins spécifiées dans les règles.

- Les participants seront tenus par le schéma de respecter les normes de sécurité, de gestion des risques et de confidentialité des données spécifiées par le schéma.

- Les participants fourniront un service client adéquat à leurs clients en lien avec le schéma.

- Les participants doivent exclure les clients de l'utilisation du schéma à la demande du schéma lorsque le schéma détermine raisonnablement qu'un client présente un risque pour le schéma, qui peut inclure un risque financier, juridique, de sécurité, de réputation ou tout autre risque.

- Les participants ne permettront pas, et ne permettront pas à leurs clients, d'utiliser le schéma à des fins illégales, y compris les biens ou services illégaux ; les paiements illégaux, tels que la corruption, le blanchiment d'argent ou le financement du terrorisme ; le braconnage ou le trafic d'espèces animales protégées ou de produits dérivés.

    <ul><i>Les schémas peuvent examiner s'ils souhaitent spécifier que les participants interdisent contractuellement aux clients d'utiliser les services du schéma à des fins illégales et interrompront les services du schéma pour les clients dont ils savent, ou soupçonnent, qu'ils utilisent les services du schéma pour initier ou recevoir des transferts à des fins illégales.</i></ul>

### 6.1 Responsabilités et obligations des participants en tant que DFSP payeurs

- Un participant qui initie une demande de devis ou une demande de transfert agit en tant que participant payeur en vertu de ces règles.

- Un participant peut initier une transaction pour le compte de son payeur pour tout cas d'utilisation ou cas d'utilisation secondaire pris en charge par le schéma.

- Un participant payeur est tenu de régler un transfert lors de la soumission d'une demande de transfert, à moins que cette demande de transfert ne soit refusée par le DFSP bénéficiaire ou n'expire sans exécution.

- Le participant payeur garantit, lors de la soumission de chaque demande de transfert, que le transfert provient d'un compte conforme aux exigences KYC et AML et est exécuté conformément à la loi applicable, et que le payeur a reçu toutes les informations et a donné tous les consentements nécessaires pour effectuer le transfert conformément à ces règles commerciales et à la loi applicable.

- Le participant payeur garantit, lors de la soumission d'une demande de transfert, que la demande de transfert a été autorisée par son payeur, et que ses communications avec son payeur ont été correctement authentifiées conformément à ces règles commerciales et à la loi applicable.

- Le participant payeur reconnaît que la plateforme rejettera une demande de transfert si le transfert proposé violerait ces règles commerciales, comme le dépassement du plafond de débit net du participant payeur.

### 6.2 Responsabilités et obligations des participants en tant que DFSP bénéficiaires

- Un participant qui reçoit et répond à une demande de devis ou une demande de transfert agit en tant que participant bénéficiaire en vertu de ces règles.

- Un participant bénéficiaire qui reçoit une demande de devis est tenu de répondre, en l'absence de problèmes techniques, avec une réponse au devis si :

  - Le compte de transaction du bénéficiaire auprès du participant bénéficiaire est en règle et capable de recevoir, à ce moment-là, le montant du transfert et

  - L'acceptation du transfert ne mettra pas le compte du bénéficiaire dans un état non autorisé par la loi applicable ou les politiques et accords de compte du participant.

  - Le participant bénéficiaire affirme, lors de l'initiation d'une réponse au devis autre qu'une réponse d'erreur, que le compte du bénéficiaire a été validé — il est ouvert, en règle et capable d'accepter le montant du transfert proposé à ce moment-là.

- Le participant bénéficiaire affirme, lors de l'initiation d'une réponse au devis autre qu'une réponse d'erreur, qu'un transfert vers le compte désigné est conforme à ce moment-là aux exigences applicables en matière d'AML/CFT et de KYC.

- Un participant bénéficiaire qui reçoit une demande de transfert est tenu, en l'absence de problèmes techniques, de répondre avec une réponse de transfert avec l'état de transaction « Committed » si :

  - Il a reçu une demande de devis et a répondu avec une réponse au devis pour la transaction et

  - La réponse au devis n'a pas encore expiré

  - Le compte de transaction du bénéficiaire auprès du participant bénéficiaire est en règle et capable de recevoir, à ce moment-là, le montant du transfert et

  - L'acceptation du transfert ne mettra pas le compte du bénéficiaire dans un état non autorisé par la loi applicable ou les politiques et accords de compte du participant et

  - La demande de transfert sur la transaction n'a pas expiré.

- Un participant bénéficiaire qui envoie une réponse de transfert avec un état de transaction « Committed » doit comptabiliser ce transfert sur le compte du bénéficiaire dans un délai de \[X temps\].

- Un participant bénéficiaire qui reçoit une demande de transfert ne répondant pas aux critères ci-dessus est tenu de répondre avec une réponse de transfert avec l'état de transaction « Aborted ».

- Le participant bénéficiaire doit affirmer, lors de la soumission de chaque réponse de transfert avec un état de transaction « Committed », que le transfert est crédité sur un compte conforme aux exigences AML et est exécuté conformément à toute limitation de volume de compte, ou toute autre réglementation s'appliquant dans les territoires dans lesquels il opère, et que le bénéficiaire a reçu toutes les informations et a donné tous les consentements nécessaires pour effectuer le transfert conformément aux règles et à la loi applicable.

## 7. Responsabilité - Répartition des responsabilités

- Chaque participant est responsable des erreurs commises par lui, et de la fraude commise par ses employés ou sous-traitants, conformément à la loi applicable.

- Le schéma ne sera pas tenu responsable et chaque participant indemnisera et défendra le schéma contre les réclamations découlant des actions ou omissions des participants, de leurs clients ou sous-traitants.

- Le schéma peut choisir de défendre toute réclamation dans les circonstances où le schéma détermine que la résolution d'une réclamation pourrait avoir un impact défavorable sur les finances, les opérations ou la réputation du schéma.

- Le schéma sera tenu responsable de ses propres erreurs dans le traitement des transferts dans les limites prescrites par les règles.

- Le schéma compensera les participants pour les coûts de fonds dans la mesure où un participant est injustement privé de fonds pendant une période de temps résultant d'erreurs commises par le schéma.

- Chaque participant est responsable des actions et omissions de tout sous-traitant engagé par lui pour fournir des services en lien avec le schéma dans la même mesure que s'ils avaient été commis par le participant.

- Le schéma peut répartir la responsabilité entre les participants pour les conséquences de l'utilisation non autorisée ou de l'accès aux données par un participant ou pour un incident de sécurité subi par un participant qui impacte d'autres participants ou le schéma conformément aux principes énoncés dans les règles.

## 8. Sécurité, gestion des risques et confidentialité des données 

### 8.1 Confidentialité et protection des informations personnelles

- Les informations confidentielles du schéma divulguées aux participants seront tenues confidentielles par les participants et ne seront utilisées qu'aux fins autorisées par les règles. Les informations confidentielles du schéma peuvent inclure la technologie propriétaire et d'autres éléments désignés par le schéma.

- Les données de transaction n'appartiendront pas au schéma et appartiendront à un participant en ce qui concerne les transactions de ses clients.

- La confidentialité des données de transaction et de toute information personnelle traitée dans la plateforme sera protégée par le schéma et les participants conformément à la loi applicable.

- Les statistiques ou données qui identifient un participant ou à partir desquelles le participant peut être identifié ne seront pas divulguées à d'autres participants. Le schéma peut préparer pour un usage interne et divulguer à des tiers à des fins promotionnelles des statistiques basées sur des données agrégées et anonymisées, comme autorisé par la loi applicable.

- Le schéma effectuera des divulgations d'informations confidentielles pour se conformer à la loi applicable ou à la directive d'une autorité de régulation.

- Le schéma protégera les informations personnelles en sa possession ou sous son contrôle contre toute utilisation abusive et traitera ces informations conformément à la loi applicable protégeant la vie privée des individus.

- Le schéma maintiendra des mesures de sécurité de premier plan dans l'industrie pour protéger les informations contre tout accès et utilisation non autorisés.

- Les participants informeront le schéma et reconnaissent que le schéma peut informer d'autres participants, de tout incident de sécurité dans les systèmes ou locaux du participant, de ses entités affiliées ou de tout fournisseur tiers engagé par le participant pour fournir des services en soutien de la participation du participant au schéma.

- Le schéma peut mener des enquêtes sur les incidents de sécurité. Les participants coopéreront pleinement et rapidement avec l'enquête. Ces enquêtes seront aux frais du participant concerné.

- Le schéma peut exiger qu'un participant mène des enquêtes sur les incidents de sécurité et peut exiger que ces enquêtes soient menées par des auditeurs de sécurité indépendants qualifiés acceptables pour le schéma.

- Le schéma peut imposer des conditions de participation continue au participant concerné concernant la remédiation des causes de l'incident de sécurité et les mesures de sécurité en cours.

- L'enquête et le rapport, ainsi que les remèdes qui peuvent être requis, seront tenus confidentiels dans la mesure autorisée par la loi applicable.

### 8.2 Politiques de gestion des risques

<ul><i>Cette section suppose que l'élaboration de politiques de gestion des risques par le schéma et ses participants sera évolutive. Cette section envisage que certaines de ces politiques seront (éventuellement) dans les règles ; d'autres ne le seront pas.</i></ul>

- Les politiques et procédures de gestion des risques peuvent être énoncées dans les règles, dans les documents associés ou dans d'autres documents de politique écrits créés par le schéma et distribués aux participants.

- Les politiques et procédures de gestion des risques incluront la solidité fiscale, l'intégrité du système, la conformité à la loi applicable, en particulier en ce qui concerne les mesures de lutte contre le blanchiment d'argent/le financement du terrorisme, la protection de la vie privée des informations personnelles et la sécurité des données.

- Les fonctions de gestion des risques incluent les procédures applicables aux participants pour la surveillance des risques, y compris les exigences de reporting et les audits.

### 8.3 Continuité des activités

- Dispositions pour assurer la continuité des activités de la part du schéma, de ses fournisseurs et des participants.

## 9. Plateforme et services du schéma

- Le schéma définit l'ensemble des services du schéma auxquels les participants accèdent pour utiliser le système. Ceux-ci sont répertoriés dans une annexe à ce document. Les services essentiels du schéma nécessaires à l'interopérabilité sont considérés comme la plateforme du schéma.

- Les détails techniques et opérationnels sur l'utilisation des services du schéma, y compris la plateforme du schéma, sont fournis dans les documents associés. Cette liste de documents associés est une annexe à ce document.

## 10. Gestion des exceptions

- Des problèmes peuvent survenir lors de l'exécution d'une transaction, entraînant des cas d'exception, qui peuvent nécessiter ou être facilités par une communication inter-participants. Les cas d'exception peuvent inclure des erreurs de la part de toute partie, des fraudes ou d'autres anomalies de service.

- Le schéma créera et maintiendra des protocoles par lesquels les participants peuvent déterminer le type d'exception et les actions suggérées ou requises de la part des participants pour résoudre l'exception. Ces protocoles sont contenus dans un document associé.

- Les principes suivants régissent la gestion des exceptions :

  - Les participants impliqués coopéreront de bonne foi.

  - Chaque participant accepte de ne pas contacter directement le client de l'autre participant pendant le processus de résolution des litiges.

  - Les participants acceptent de coopérer entre eux et avec le schéma pour partager des informations sur les fraudes suspectées ou confirmées.

### 10.1 Irrévocabilité des transactions

- Les participants conviennent que les transferts exécutés via la plateforme sont irrévocables. Un transfert qui a été crédité sur le compte d'un bénéficiaire à la suite d'un transfert du schéma ne peut pas être révoqué sans le consentement du bénéficiaire.

- Le schéma peut ordonner à un participant d'initier une transaction corrective entre participants pour un montant déterminé par le schéma comme nécessaire pour corriger les erreurs causées par le DFSP payeur, le DFSP bénéficiaire ou le schéma. Les conditions dans lesquelles de telles transactions correctives peuvent être effectuées sont spécifiées par les règles. 

- Les erreurs de la part du DFSP bénéficiaire, du DFSP payeur ou du schéma qui entraînent une comptabilisation erronée ou en double d'un transfert sur le compte d'un bénéficiaire peuvent être corrigées par le participant bénéficiaire, tant que les instructions du transfert exécuté ne sont pas révoquées ou modifiées de quelque manière que ce soit.

## 11. Annexe : Documents associés

- Glossaire uniforme

- Directive opérationnelle de la plateforme

- Directive de marque

- Protocoles de gestion des exceptions

## 12. Annexe : Processus d'intégration et de sortie

## 13. Annexe : Services du schéma

Les services du schéma incluent :

- Plateforme du schéma, qui comprend

  - Le service de transfert

  - Le service de répertoire

  - Le service de règlement

  - Service de gestion du schéma

- Autres services partagés

  - Utilitaire de gestion de la fraude

## 14. Annexe : Cas d'utilisation pris en charge par le schéma

<ul><i>Les cas d'utilisation sont définis par le type de client qui paie quel autre type de client, et par l'objectif du paiement. Les cas d'utilisation secondaires sont des sous-ensembles des cas d'utilisation et sont utilisés pour démontrer des différences plus précises dans les transferts. Tous les transferts effectués via les services du schéma peuvent être catégorisés par un, et un seul, cas d'utilisation et cas d'utilisation secondaire.</i></ul>

<ul><i>Le cas d'utilisation et le cas d'utilisation secondaire d'une transaction peuvent nécessiter l'application de différents détails opérationnels et techniques, comme spécifié dans la directive opérationnelle de la plateforme ; différents frais d'interchange, comme spécifié dans une annexe à ces règles ; différentes exigences pour les procédures de gestion des exceptions, comme spécifié dans un document associé à ces règles.</i></ul>

<ul><i>Tous les cas d'utilisation et cas d'utilisation secondaires pris en charge par le schéma sont définis par les attributs des transactions, qui sont spécifiés dans la directive opérationnelle de la plateforme.</i></ul>

<ul><i>Ce qui suit est un exemple de tableau de cas d'utilisation et de cas d'utilisation secondaires qu'un schéma pourrait prendre en charge.</i></ul>

<ul><i>Un schéma ne définirait des cas d'utilisation secondaires que s'il souhaitait rédiger des règles et/ou spécifier des frais propres à ce cas d'utilisation secondaire.</i></ul>

|       | Cas d'utilisation   | Cas d'utilisation secondaire          |
| :---: | :--------: | :-------------------------- |
| 1.0 | P2P | Personne à personne |
| 1.1 | P2P | Portefeuille à portefeuille |
| 1.2 | P2P | Banque à banque |
| 1.3 | P2P | Portefeuille à banque |
| 1.4 | P2P | Banque à portefeuille |
| 2.0 | Paiement en masse |  |
| 2.1 | B2P | Entreprise à personne |
| 2.2 | G2P | Gouvernement à personne |
| 3.0 | P2B | Personne à entreprise |
| 3.1 | P2B | Achat par numéro de caisse |
| 3.2 | P2B | Achat par code QR |
| 3.3 | P2B | Achat en ligne |
| 3.4 | P2B | Paiement de facture |
| 3.5 | P2B | Personne à entreprise - Autre |
| 4.0 | P2G | |
| 4.1 | P2G | Personne à gouvernement |
| 4.1 | P2G | Achat par numéro de caisse |
| 4.2 | P2G | Achat par code QR |
| 4.3 | P2G | Achat en ligne |
| 4.4 | P2G | Paiement de facture |

## 15. Annexe : Grille tarifaire du schéma

1. Frais de traitement

   - Les frais de traitement sont calculés par \[définir\]

   - Les frais de traitement s'appliquent aux transferts exécutés

   - Les frais de traitement sont facturés à \[quelle partie ou parties\]

   - Les frais de traitement pour les transferts « on-us » (où le DFSP payeur et le DFSP bénéficiaire sont les mêmes) \[sont ou ne sont pas facturés\]

   - Les frais de traitement seront calculés et facturés aux participants \[définir\]

   - Disposition sur la manière dont les participants paieront les factures de traitement \[définir\]

2. Frais d'adhésion ou de participation

   - Les frais d'adhésion ou de participation sont facturés à \[définir\]

   - Spécifier la base, le mode de collecte, etc.

3. Frais d'interchange

   - Les frais d'interchange sont fixés par le schéma

   - Le montant du frais et la direction (quel participant paie quel autre) varient selon le cas d'utilisation et le cas d'utilisation secondaire. Certains cas d'utilisation et cas d'utilisation secondaires n'auront pas d'interchange.

   - \[Définir comment la plateforme collectera et distribuera l'interchange : sur une base transactionnelle ou périodique.\]

## 16. Annexe : Gestion des risques, sécurité, confidentialité et normes de service

<ul><i>Les schémas peuvent ou non vouloir spécifier des normes ou exiger que les participants se conforment à d'autres normes établies. Les schémas peuvent en outre spécifier des normes différentes pour différentes catégories de participants. La liste ci-dessous est donnée purement à titre d'exemple.</i></ul>

Les participants doivent adhérer aux pratiques suivantes en matière de qualité de service, de sécurité, de confidentialité des données et de service client en ce qui concerne leur participation au schéma.

- Les participants établiront un cadre de gestion des risques pour identifier, évaluer et contrôler les risques relatifs à leur utilisation du schéma.

- Les participants s'assureront que les systèmes, applications et réseaux prenant en charge l'utilisation du schéma sont conçus et développés de manière sécurisée.

- Les participants mettront en œuvre des processus pour gérer de manière sécurisée tous les systèmes et opérations prenant en charge l'utilisation du schéma.

- Les participants mettront en œuvre des processus pour s'assurer que les systèmes utilisés pour le schéma sont protégés contre les intrusions ou utilisations non autorisées.

- Les participants mettront en œuvre des processus pour assurer l'authentification de leurs clients lors de la création et de l'approbation des transactions utilisant le schéma.

-   Les participants élaboreront des plans efficaces de continuité des activités et de contingence.

-   Les participants géreront les opérations techniques et commerciales pour permettre des réponses rapides aux appels API reçus de la plateforme du schéma ou d'autres participants via la plateforme du schéma.

-   Les participants établiront des accords écrits régissant leurs relations avec les agents, processeurs et autres entités fournissant des services externalisés liés au schéma.

-   Les participants élaboreront des politiques et processus pour la gestion et la supervision continues du personnel, des agents, des processeurs et des autres entités fournissant des services externalisés liés au schéma.

-   Les participants s'assureront que les clients reçoivent des informations claires, visibles et opportunes concernant les frais et les conditions générales liés aux services utilisant le schéma.

-   Les participants élaboreront et publieront des politiques et procédures de service client liées aux services utilisant le schéma.

-   Les participants fourniront un mécanisme approprié pour que les clients puissent poser des questions et résoudre des problèmes. Les participants préciseront comment les litiges peuvent être résolus si la résolution interne échoue.

-   Les participants se conformeront aux bonnes pratiques et aux lois applicables régissant la confidentialité des données des clients.

-   Les participants s'assureront que les clients reçoivent des informations claires, visibles et opportunes concernant leurs pratiques de confidentialité des données.
