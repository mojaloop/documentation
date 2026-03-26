# Choix clés du schéma

- Version : 5.0 
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

Des schémas de paiement à travers le monde sont en cours de mise en œuvre, ou envisagent la mise en œuvre, de systèmes de paiement basés sur Mojaloop. Mojaloop est un logiciel open source pour les sociétés de services financiers, les régulateurs gouvernementaux et d'autres acteurs relevant les défis de l'interopérabilité et de l'inclusion financière. Mojaloop est basé sur la spécification « Open API for FSP Interoperability Specification », qui a été développée pour fournir une spécification d'API ouverte pour l'interopérabilité de la monnaie mobile.

La Fondation Bill & Melinda Gates a fourni un financement et un soutien pour Mojaloop. Mojaloop est un code de référence open source qui démontre les principes du Level One Project, une vision pour les marchés financiers numériques basée sur les principes d'interopérabilité, de collaboration et d'inclusion.

Les schémas mettant en œuvre Mojaloop devront faire un certain nombre de choix commerciaux concernant la conception du système. Ces choix, une fois effectués, affecteront à la fois la mise en œuvre technique de Mojaloop et les règles commerciales que le schéma rédigera, et auxquelles les DFSP participants accepteront de se conformer. Ce document décrit et examine certains des choix les plus significatifs. Le cas échéant, des recommandations de meilleures pratiques sont formulées pour s'aligner sur les principes de conception du Level One Project (L1P).

Bien que ce document soit rédigé en tant que contribution à la communauté Mojaloop, les questions décrites ici sont pertinentes pour tout système de paiement aligné sur Level One, quel que soit la mise en œuvre technique choisie.

## **Choix décrits dans ce document**

[1 - Choix : Propriété du schéma](#_1-choix-propriete-du-schema)

[2 - Choix : Participation au schéma](#_2-choix-participation-au-schema)

[3 - Choix : Relation entre le schéma et la plateforme](#_3-choix-relation-entre-le-schema-et-la-plateforme)

[4 - Choix : Portée des règles du schéma et autorité des règles du schéma](#_4-choix-portee-des-regles-du-schema-et-autorite-des-regles-du-schema)

[5 - Choix : Cas d'utilisation](#_5-choix-cas-d-utilisation)

[6 - Choix : Codes QR](#_6-choix-codes-qr)

[7 - Choix : Adressage des paiements](#_7-choix-adressage-des-paiements)

[8 - Choix : Règlement inter-participants](#_8-choix-reglement-inter-participants)

[9 - Choix : Accès par paliers](#_9-choix-acces-par-paliers)

[10 - Choix : Frais du schéma et tarification pour l'utilisateur final](#_10-choix-frais-du-schema-et-tarification-pour-l-utilisateur-final)

[11 - Choix : Gestion de la marque](#_11-choix-gestion-de-la-marque)

[12 - Choix : Connexions du schéma avec d'autres schémas](#_12-choix-connexions-du-schema-avec-d-autres-schemas)

[13 - Choix : Utilisation du schéma par d'autres FSP](#_13-choix-utilisation-du-schema-par-d-autres-fsp)

[14 - Choix : Normes de gestion des risques du schéma](#_14-choix-normes-de-gestion-des-risques-du-schema)

[15 - Choix : Gestion des exceptions](#_15-choix-gestion-des-exceptions)

## 1. Choix : Propriété du schéma

Le schéma est l'entité qui rédige les règles du système de paiement. En tant que tel, le schéma contrôle de multiples aspects de la fourniture des services du schéma, y compris la manière dont la plateforme technique et opérationnelle sera fournie aux DFSP participants. Les modèles courants de propriété de schéma dans l'industrie des paiements incluent :

- Une association de DFSP participants, avec ou sans propriété partielle par la banque centrale

- Une banque centrale ou une autre entité gouvernementale

- Une entité commerciale

Le modèle associatif maximise le contrôle des DFSP sur le schéma et peut encourager les DFSP à rejoindre et utiliser le schéma. Un schéma contrôlé par le gouvernement ou la banque centrale peut rendre la supervision réglementaire des DFSP plus efficace et simplifier la prise de décision : un organisme gouvernemental peut être disposé à prendre des décisions d'infrastructure qui sont bénéfiques pour l'ensemble de l'écosystème, plutôt que d'optimiser les avantages individuels des DFSP. Une entité commerciale peut être plus rapide à mettre en œuvre un nouveau système et peut être plus efficace dans certaines situations pour créer un modèle opérationnel durable.

### 1.1 Alignement Level One — Propriété du schéma

N'importe laquelle de ces structures de propriété peut atteindre les objectifs du L1P et de l'inclusion financière. Les principes de conception Level One suggèrent « l'auto-gouvernance par les DFSP » (le premier modèle) comme conception préférée, sur la base de la conviction que la participation à la gouvernance peut augmenter l'engagement des DFSP envers le schéma. D'autres conceptions peuvent fonctionner, cependant, tant que le schéma et ses membres disposent d'une certaine forme de gouvernance participative et fonctionnent avec transparence et communications ouvertes.

Le principe Level One le plus important est que le schéma lui-même devrait fonctionner sur un modèle « sans perte » (recouvrement durable des coûts). Ce dernier point est particulièrement important pour atteindre l'objectif du L1P de créer un système de paiement à très faible coût. Ce principe repose sur l'idée que les DFSP peuvent, bien entendu, fonctionner sur une base lucrative en fournissant des services de paiement. La source de leurs revenus, cependant, peut provenir principalement des « [adjacences](https://docs.gatesfoundation.org/documents/fighting%20poverty%20profitably%20full%20report.pdf) » plutôt que des frais liés à la transaction de paiement elle-même. Notez que la plateforme opérationnelle peut être fournie par une entité commerciale, même si le schéma lui-même est exploité sur une base « sans perte ». Ceci est discuté plus loin dans « Choix : Relation entre le schéma et la plateforme ».

De nombreux systèmes de paiement bancaires hérités dans le monde fonctionnent sur le modèle associatif. Les systèmes ACH et les systèmes de carte de débit nationaux (tels que le système ACH américain et le système Interac du Canada) utilisent ce modèle et offrent des coûts de traitement ultra-faibles aux DFSP participants. Certains nouveaux systèmes de paiement mobile, tels que le système UPI de l'Inde et le système BIM du Pérou, utilisent également ce modèle.

Plusieurs pays fournissent des services par l'intermédiaire de la banque centrale : le modèle SPEI du Mexique est notable ici. Le système JoMoPay de la Jordanie a commencé comme un système de banque centrale et est passé au modèle associatif.

Les réseaux de cartes mondiaux, notamment Visa et MasterCard, ont commencé comme des modèles associatifs et sont passés à un modèle commercial. De nombreuses FinTechs, telles que PayPal ou WeChat Payments, exploitent des systèmes en boucle fermée sur un modèle commercial.

## 2. Choix : Participation au schéma

Mojaloop et le L1P utilisent le terme « DFSP » (Fournisseur de services financiers numériques) pour désigner toute entité dans la juridiction dans laquelle le système de paiement opère, qui est autorisée d'une certaine manière à fournir des comptes de transaction aux utilisateurs finaux qui détiennent des fonds et qui peuvent être utilisés pour effectuer et recevoir des paiements. Cette définition inclut les banques, les autres institutions financières de dépôt et les émetteurs de monnaie électronique (parfois appelés opérateurs de monnaie mobile).

Il existe une myriade d'autres participants de l'écosystème qui ne détiennent pas de comptes de transaction des utilisateurs finaux : ceux-ci incluent les processeurs, les agrégateurs et certains types de fournisseurs de services de paiement. La relation de ces entités avec le schéma et les DFSP est discutée dans [Choix : Utilisation du schéma par d'autres FSP](#_13-choix-utilisation-du-schema-par-d-autres-fsp).

La question de la participation est double : premièrement, quelles catégories de DFSP sont prises en charge par le schéma, et deuxièmement, quel est le processus par lequel les DFSP sont autorisés à participer. Le terme « boucle ouverte » est utilisé pour désigner une structure dans laquelle plusieurs DFSP adhèrent et utilisent le schéma pour échanger des transactions (interopérer). Mais un schéma en « boucle ouverte » peut être soit un schéma dans lequel tout DFSP d'une catégorie prise en charge est éligible pour rejoindre le schéma, soit un schéma dans lequel la participation est limitée et gérée par invitation. Un DFSP candidat peut faire face à certains critères d'éligibilité (taille, santé financière, etc.) avant d'être admis au schéma.

Le terme « boucle fermée » est le plus souvent utilisé pour désigner un schéma qui n'est pas interopérable ; dans lequel l'entité du schéma a des relations directes avec tous les clients finaux.

Le L1P est fortement en faveur des systèmes en boucle ouverte. De plus, le L1P préconise que tous les fournisseurs autorisés de comptes de transaction soient éligibles : en d'autres termes, les catégories de banques et d'émetteurs de monnaie électronique devraient être incluses et autorisées à interopérer via la plateforme du schéma.

Il y a un certain nombre d'arguments qui soutiennent cette recommandation. Le concept même d'« inclusion financière » implique l'intégration de populations précédemment exclues dans l'écosystème financier du pays. Dans de nombreux pays, l'émission de monnaie électronique ou d'autres structures ont été approuvées par les régulateurs pour fournir des comptes de transaction à des populations qui n'ont pas pu être servies économiquement par les banques traditionnelles. Ces émetteurs de monnaie électronique ont fréquemment créé des portefeuilles mobiles en boucle fermée, et l'un des objectifs du L1P et de Mojaloop est de permettre l'interopérabilité de ces portefeuilles. Cependant, les détenteurs de portefeuilles doivent payer non seulement d'autres détenteurs de portefeuilles, mais aussi des commerçants et d'autres institutions bancaires, ainsi que des individus bancarisés. Les individus et institutions bancarisés effectuent également des paiements aux détenteurs de portefeuilles. Il est logique que le même système de paiement interopérable prenne en charge les deux pour des raisons d'efficacité (pourquoi avoir plusieurs systèmes quand un seul peut connecter tous les acteurs ?) et pour des raisons économiques.

L'argument économique tourne autour de la nature des systèmes de traitement transactionnel : plus le volume est important, plus le coût unitaire est faible. Ce principe est également soutenu dans le [Rapport PAFI de la Banque mondiale/CPMI](http://www.worldbank.org/en/topic/financialinclusion/brief/pafi-task-force-and-report) : « le cadre promeut l'innovation et la concurrence en ne faisant pas obstacle à l'entrée de nouveaux types de PSP... L'interopérabilité accrue des infrastructures soutenant la commutation, le traitement, la compensation et le règlement des instruments de paiement du même type est encouragée... les infrastructures de paiement, y compris celles exploitées par les banques centrales, ont des exigences de participation objectives, fondées sur les risques, qui permettent un accès juste et ouvert à leurs services. » Un point connexe et important est que les règles du schéma devraient spécifier qu'un participant individuel ne peut pas discriminer un autre participant individuel : sauf contrainte par d'autres facteurs (limites réglementaires de compte, etc.), les participants doivent recevoir les transactions envoyées par d'autres participants du schéma. Cela garantit une interopérabilité totale.

La deuxième question est de savoir quels critères d'éligibilité un DFSP potentiel doit remplir pour effectivement rejoindre le schéma. De nombreux schémas de paiement ont des procédures assez élaborées pour s'assurer que les DFSP candidats disposent des ressources financières pour se conformer aux règles et des moyens techniques pour répondre aux exigences opérationnelles des règles.

Une certaine forme de ces exigences est nécessaire pour tout schéma. Mais la technologie moderne et, en particulier, les modèles de règlement pré-financés réduisent considérablement les risques pour le schéma dans ses relations avec les DFSP plus petits. La question d'alignement Level One ici est de s'assurer que le schéma ne discrimine pas involontairement les petits DFSP en faveur des grands. L'objectif devrait être de garantir les qualifications minimales nécessaires pour soutenir les obligations qu'un DFSP candidat entreprend.

## 3. Choix : Relation entre le schéma et la plateforme

Nos définitions séparent le concept de schéma (l'entité qui rédige les règles d'un système de paiement) et de plateforme (l'ensemble des services qui permettent physiquement l'interopérabilité). Le plus souvent, mais pas nécessairement, la plateforme fonctionne comme un commutateur qui achemine les transactions d'un DFSP à un autre : l'alternative est des connexions physiques bilatérales entre les DFSP.

Quelle est la relation entre le schéma et la plateforme ? Il existe de multiples modèles démontrés dans les systèmes de paiement à l'échelle mondiale :

1. Même entité : le schéma exploite la plateforme. Cela se voit fréquemment dans les systèmes commerciaux (par ex. Visa) et également dans les systèmes fournis par la banque centrale (par ex. Bank of Mexico SPEI).

2. Le schéma engage la plateforme : le commutateur et les services associés sont exploités par une entité distincte, sous contrat avec l'entité du schéma. Le schéma paie l'entité de la plateforme ; ce coût est recouvré par les frais du schéma à ses DFSP participants. Le système Faster Payments du Royaume-Uni fonctionne sur ce modèle (Faster Payments Scheme Ltd. engage Vocalink pour exploiter la plateforme).

3. Le schéma définit les paramètres selon lesquels le(s) opérateur(s) gèrent les transactions régies par les règles : s'il y a plusieurs opérateurs, ces entités doivent interopérer, encore une fois comme spécifié dans les règles du schéma. Les DFSP individuels choisissent l'opérateur qu'ils souhaitent utiliser pour accéder au système. Le système ACH américain fonctionne de cette manière, tout comme plusieurs des systèmes de paiement SEPA en Europe.

4. Pas de commutateur : c'est en réalité une variation du modèle 3 ci-dessus. Chaque DFSP se connecte indépendamment et physiquement à chaque autre DFSP, toujours dans les contraintes fixées par les règles du schéma. Les cartes de débit en Australie fonctionnent de cette manière.

### 3.1 Alignement L1P : Relation entre le schéma et la plateforme

Il n'y a pas de principe Level One unique qui plaiderait en faveur de l'un de ces modèles par rapport à l'autre. Les facteurs à considérer incluent :

- L'objectif est que tous les acteurs de l'écosystème (schéma, plateforme, DFSP, etc.) encouragent un comportement conforme au L1P. Un modèle plus contrôlé (modèles 1 ou 2) rend cela sans doute plus facile.

- Avoir un système à faible coût est un principe fondamental. Cependant, il est discutable de savoir si cela est mieux réalisé par le modèle 1 ou le modèle 2. Les modèles 3 et 4 portent le risque d'exclure ou de désavantager les petits DFSP ou les nouveaux entrants du système.

- Dans les modèles 2 et 3, les fournisseurs de plateforme auront leurs propres directives opérationnelles. Il peut y avoir des situations dans lesquelles les dispositions des règles du schéma ne sont pas adéquatement reflétées ou mises en œuvre par la plateforme. Il s'agit d'une question de pouvoir et de contrôle. Le modèle 1 évite ce problème mais pourrait créer un problème de type « verrouillage fournisseur », où les DFSP n'ont d'autre choix que de payer les coûts de la plateforme contrôlée par le schéma.

## 4. Choix : Portée des règles du schéma et autorité des règles du schéma

### 4.1 Portée

Les règles de schéma varient considérablement en portée d'un schéma à l'autre. Toutes couvrent les éléments essentiels de la participation au schéma, les obligations des parties et les mécanismes d'interopérabilité. Mais de nombreux schémas vont beaucoup plus loin en termes de définition de la manière dont les DFSP mettent les services de paiement à la disposition de leurs clients, et selon quelles conditions. Deux domaines méritent d'être notés : 

- Certains schémas spécifient des éléments de l'expérience de l'utilisateur final. Des exemples incluent les réseaux de cartes spécifiant les paramètres physiques et les exigences de conception des cartes. Certains systèmes (par exemple, le BIM du Pérou) spécifient comment l'interface du téléphone mobile apparaît au consommateur. D'autres systèmes (par exemple, le UPI de l'Inde) vont jusqu'à fournir les SDK et API qui définissent ce que l'application de l'utilisateur final peut fonctionnellement faire. Certains systèmes peuvent exiger qu'un DFSP recevant une transaction de crédit par poussée doive la comptabiliser sur le compte d'un client dans un délai spécifié.
- Certains schémas spécifient également des dispositions élaborées en matière de responsabilité sur les transactions interopérables. Ces dispositions peuvent varier selon le cas d'utilisation et les attributs particuliers d'une transaction. Par exemple, dans les réseaux de cartes, la responsabilité peut passer de l'émetteur de la carte à l'acquéreur du commerçant si le terminal du commerçant ne répond pas à certaines spécifications.

### 4.2 Autorité des règles

Comme décrit ci-dessus, le schéma est l'entité qui rédige les règles du système de paiement. Mais qui approuve ces règles ? Il existe deux modèles principaux sur le marché :

- Autorité des DFSP. Dans ce modèle, tous (ou certains) changements de règles sont votés par les DFSP participants. Le vote peut être déterminé sur une base par siège, ou sur une base pondérée par le volume. De nombreux schémas ont expérimenté des variations à ce sujet.

- Autorité du schéma avec participation des DFSP. Dans ce modèle, l'autorité des règles repose sur l'entité du schéma, mais un certain degré de participation formelle ou informelle des DFSP est inclus : cela peut être formel (comités permanents qui se réunissent pour examiner les changements de règles, périodes de commentaires sur les modifications des règles spécifiées dans les règles, etc.) ou informel (les représentants du schéma se réunissent et/ou demandent des retours écrits sur les changements de règles proposés).

### 4.3 Alignement L1P — Portée et autorité des règles

Il y a deux principes Level One pertinents : l'un est la gouvernance participative, et l'autre est le mandat de fournir un système à faible coût. Level One reconnaît également l'importance d'un système pratique et facile à utiliser pour les clients utilisateurs finaux, en particulier les consommateurs et commerçants pauvres. Les considérations incluent donc :

- Les règles peuvent créer des coûts : plus les règles sont élaborées pour spécifier comment les DFSP doivent fournir des services au client, plus les coûts de conformité à ces règles seront élevés.

- En contrepartie, il y a la valeur d'avoir une expérience consommateur commune — il existe des preuves considérables qu'avoir une expérience commune peut aider les consommateurs à s'auto-éduquer dans l'utilisation des services. On peut argumenter que c'est un facteur important dans la mise à l'échelle du système. Mais plus un schéma va loin dans la rédaction de règles qui affectent l'expérience de l'utilisateur final, plus il est important que les DFSP participants aient une voix dans ces règles.

- L'expérience des schémas a montré que les règles de vote explicites, bien qu'elles semblent bonnes pour les DFSP, aboutissent souvent à des pratiques de décision très longues : c'est l'une des raisons pour lesquelles certains schémas utilisent le second modèle ci-dessus, et utilisent les DFSP participants comme sondages, mais ne leur accordent pas l'autorité sur les règles.

## 5. Choix : Cas d'utilisation

L'un des choix les plus importants qu'un schéma doit faire est de déterminer quels cas d'utilisation prendre en charge. Fréquemment, un schéma de crédit par poussée en temps réel pour le commerce de détail commence par les paiements de personne à personne (P2P) comme premier cas d'utilisation : souvent, un schéma indiquera au marché qu'il a l'intention de prendre en charge d'autres cas d'utilisation à l'avenir. À mesure que les schémas évoluent, il y a des « sous-cas d'utilisation » significatifs à considérer : dans certaines mises en œuvre de Mojaloop, le terme « cas d'utilisation secondaire » est utilisé pour cela : par exemple, si le P2P est le cas d'utilisation, le P2P transfrontalier pourrait être un cas d'utilisation secondaire ; portefeuille-à-portefeuille et portefeuille-à-compte bancaire pourraient être des cas d'utilisation secondaires.

Les règles commerciales peuvent varier selon le cas d'utilisation et/ou le cas d'utilisation secondaire. Cela peut inclure des détails opérationnels (champs de données utilisés, etc.), la tarification du schéma (en particulier, l'interchange) et même des dispositions de responsabilité.

Le document Open API utilisé par le code Mojaloop inclut la liste suivante de cas d'utilisation :

- Transfert P2P
- Encaissement initié par un agent
- Décaissement initié par un agent
- Décaissement initié par un agent autorisé sur TPV
- Décaissement initié par le client
- Paiement commerçant initié par le commerçant
- Paiement commerçant initié par le commerçant autorisé sur TPV
- Décaissement initié par GAB
- Remboursement

Un schéma en cours de mise en œuvre choisira ses propres cas d'utilisation primaires et secondaires, et les définitions de ceux-ci figureront dans les règles commerciales. Les schémas devraient considérer les éléments suivants :

- L'interopérabilité éventuelle entre schémas sera plus facile (surtout d'un schéma implémenté par Mojaloop à un autre) si les mêmes cas d'utilisation primaires et définitions sont utilisés.

- Les schémas peuvent avoir besoin de différencier entre la capacité d'un DFSP à initier des transactions dans un cas d'utilisation ou cas d'utilisation secondaire spécifique, et les exigences qu'un DFSP doit être en mesure de prendre en charge pour recevoir des transactions dans un cas d'utilisation ou cas d'utilisation secondaire spécifique.

- Toute règle rédigée spécifiquement pour un cas d'utilisation ou un cas d'utilisation secondaire doit être détectable systémiquement (par étiquetage ou inférence) si la règle doit être appliquée automatiquement : cela est particulièrement important pour les frais d'interchange spécifiques aux cas commerciaux. La manière dont cela est fait devrait faire partie de la documentation commerciale, dans les directives opérationnelles.

### 5.1 Alignement L1P — Cas d'utilisation

Il y a deux considérations ici. Une question significative est la relation entre les volumes élevés dans un système de paiement et la capacité à offrir des frais de traitement ultra-faibles aux DFSP participants. Presque tous les systèmes de paiement de détail prennent en charge plusieurs cas d'utilisation, y compris ceux qui ont commencé avec un seul cas d'utilisation. Les réseaux de cartes sont un excellent exemple de cela : ayant commencé pour prendre en charge les achats en point de vente, ils prennent maintenant en charge les achats en ligne, le paiement de factures, les paiements de salaires et les paiements B2B. Le traitement des paiements est une activité d'échelle : plus le volume est important, plus les coûts unitaires peuvent être faibles. Level One soutient fortement l'utilisation d'un système de paiement pour plusieurs cas d'utilisation : idéalement, tous les cas d'utilisation de détail (c'est-à-dire excluant les grands montants B2B) dans un pays.

L'autre considération est de rendre le système de paiement facile d'accès et de compréhension pour les utilisateurs finaux. Le même système, avec des interfaces utilisateur similaires, etc., pour les cas d'utilisation sera plus facile à utiliser pour les utilisateurs finaux (en particulier les utilisateurs pauvres ou peu instruits).

## 6. Choix : Codes QR

Les codes QR émergent comme un facilitateur majeur des paiements commerçants dans les pays en développement. Les schémas de paiement et les autorités nationales de paiement décident des formats, protocoles et de la portée des codes QR. Certaines des décisions incluent :

- Le code QR est-il présenté par le commerçant et scanné par le consommateur, ou présenté par le consommateur et scanné par le commerçant ? Level One a une préférence pour les codes QR présentés par le commerçant, mis en œuvre en conjonction avec des paiements par poussée, et non par tirage. Un code QR présenté par le commerçant peut être combiné avec un numéro de caisse pour permettre aux consommateurs disposant de téléphones basiques de payer facilement le même commerçant.

- Le code QR est-il statique (le même pour tous les achats) ou dynamique ? Plutôt qu'un choix, cela est perçu comme une évolution : la plupart des marchés commencent avec des codes QR statiques, mais ont des plans pour passer à des codes dynamiques. Les codes dynamiques fonctionnent comme un message de « demande de paiement » dans un système de paiement par poussée, et peuvent contenir des données spécifiques à l'achat.

- L'approche nationale des codes QR utilise-t-elle une approche de « code QR partagé », dans laquelle un seul code QR peut représenter les identifiants de paiement d'un commerçant à travers plusieurs schémas ? La manière la plus courante dont cette approche est mise en œuvre est par l'utilisation des normes de code QR EMVCo. Une alternative est une approche de code QR unique, dans laquelle un code QR est utilisé uniquement pour accéder soit à un schéma de paiement interopérable (par exemple, le système CoDi du Mexique) soit à un système en boucle fermée (par exemple, WeChat Payments en Chine). Une approche de code QR unique peut créer des avantages de coût faible en dirigeant le volume à travers une seule plateforme nationale, tandis qu'une approche inter-schémas peut permettre la concurrence entre plusieurs schémas.

- Si une approche de code QR partagé est utilisée, y a-t-il une entité nationale unique qui contrôle quels schémas un commerçant donné accepte ? Si oui, qui gère cette fonction de « répertoire » et quelles sont ses fonctions ? Émet-elle réellement la chaîne de données du code QR ? Si oui, signe-t-elle la chaîne et la valide-t-elle ? Il y a des spéculations selon lesquelles un répertoire de codes QR pourrait servir de point de surveillance inter-systèmes de paiement et de gestion de la fraude. Il pourrait également être lié à un registre national des entreprises d'une certaine manière. Il est intéressant de considérer qu'un répertoire de codes QR inter-schémas pourrait nécessiter ses propres règles commerciales, qui deviendraient des « méta-règles » existant au-dessus des règles commerciales des schémas individuels.

- La chaîne de données du code QR (la « charge utile ») contient-elle l'« adresse de paiement » du commerçant, ou pointe-t-elle d'une certaine manière vers un endroit où celle-ci est stockée ? Cette dernière approche offre plus de flexibilité et prend en charge la capacité d'un commerçant à changer de fournisseur.

- Comment le consommateur (et le commerçant) est-il protégé contre la fraude par code QR ?

- Quels sont les aspects économiques de la transaction pour le commerçant ? Level One a une forte préférence pour une tarification nulle ou quasi nulle pour le petit commerçant ou le commerçant pauvre.

## 7. Choix : Adressage des paiements

Tout schéma mettant en œuvre des paiements par crédit-poussée doit spécifier comment le payeur et son DFSP payeur adressent le paiement. L'adresse doit d'une certaine manière être résolue en numéro de compte du bénéficiaire auprès du DFSP qui fournit son compte de transaction. Le schéma doit décider :

- Quels types d'adresses de paiement (parfois appelées « identifiants ») sont utilisés. Certaines adresses de paiement sont des identifiants institutionnels et des numéros de compte : un numéro de routage bancaire et un numéro de compte bancaire en sont un exemple. D'autres adresses de paiement peuvent être des numéros de compte sans l'identifiant institutionnel : un numéro de téléphone mobile utilisé pour diriger des fonds vers un portefeuille de monnaie électronique fourni par un opérateur de réseau mobile en est un exemple. Tous les autres types d'adresses de paiement sont des alias de quelque sorte. Un alias peut être une adresse e-mail, un identifiant commerçant attribué par le schéma, un numéro d'identité national ou un numéro de téléphone mobile utilisé pour diriger des fonds vers un compte autre que celui fourni par un émetteur de monnaie électronique opérateur de réseau mobile. Un alias pris en charge par le schéma peut également être une phrase : « payadamnu123 ».

- Pour chaque type d'adresse de paiement pris en charge par le schéma, le schéma doit déterminer comment cette adresse de paiement est résolue. Au minimum, le schéma doit prendre en charge un mécanisme par lequel l'adresse est mappée à un identifiant DFSP participant au schéma responsable du compte de transaction associé à cette adresse de paiement. La résolution peut être effectuée de plusieurs manières différentes :

    - Le schéma peut maintenir un répertoire mappant les adresses aux identifiants DFSP responsables : cela nécessite un certain type de processus d'enregistrement DFSP pour les adresses.

    - Le schéma peut maintenir un répertoire qui mappe l'adresse au DFSP responsable et spécifie également le numéro de compte : cela nécessite un processus d'enregistrement légèrement différent.

    - L'un ou l'autre de ces types de répertoires peut être maintenu par un tiers : les règles du schéma établiraient comment ces répertoires sont alimentés, maintenus et utilisés, et quelles sont les responsabilités des différentes parties.

    - Un schéma peut également utiliser une méthode de diffusion pour déterminer le DFSP responsable d'une adresse de paiement donnée (« revendiquez-vous cette adresse »), mais doit développer un protocole pour gérer les conflits si plus d'un DFSP « revendique » l'adresse.

- Il est important de noter que la méthode de résolution peut être différente pour chaque type d'adresse de paiement pris en charge. Certains types d'adresses de paiement pris en charge peuvent également être accompagnés d'ensembles de données particuliers : par exemple, lorsqu'un paiement est effectué en règlement d'une facture, l'adresse de paiement peut être un certain type d'alias, et l'utilisation de cet alias peut être liée à des données de facture accompagnantes. Les codes QR dynamiques, par exemple, créeront une « demande de paiement » qui peut contenir l'identifiant commerçant pris en charge par le schéma (un alias) et le détail des données de transaction accompagnantes.

La spécification Open API et le code de référence Mojaloop prennent en charge un large éventail de différents types d'adresses : numéro de mobile, compte bancaire, identité nationale, alias (« Quickshop\@abc »), etc.

### 7.1 Alignement L1P — Adressage des paiements 

Un adressage de paiement sécurisé et facile se rapporte à deux concepts importants dans Level One : la commodité pour l'utilisateur final et l'« ouverture ». Ce dernier point est particulièrement important pour permettre la concurrence et la mise à l'échelle rapide d'un système de paiement. Alors que les schémas (Level One et autres) à travers le monde luttent pour déterminer comment résoudre au mieux la question de l'adressage des paiements, quelques meilleures pratiques semblent émerger :

- Bien que l'utilisation du numéro de mobile, en particulier, comme adresse ait un attrait évident, il semble y avoir une tendance à utiliser des alias — des identifiants sans signification supplémentaire. Cela est démontré en Inde avec le système UPI et dans le nouveau système en temps réel de l'Australie, où l'identifiant est appelé PAYID.

- La portabilité des identifiants est souhaitable, tant du point de vue de la commodité de l'utilisateur que comme mécanisme pour éviter le « verrouillage DFSP ».

- Comme mentionné ci-dessus, le répertoire doit assurer l'unicité de l'adresse de paiement au sein du système de paiement : toute adresse donnée ne peut mapper qu'à un seul DFSP. Cependant, un seul compte de transaction DFSP peut avoir plusieurs adresses de paiement qui y dirigent. Les DFSP ont la possibilité de créer des services à valeur ajoutée pour leurs clients, dans lesquels ils différencient le traitement des transactions acheminées vers eux via différentes adresses de paiement (sous réserve, bien sûr, des règles commerciales globales du schéma).

## 8. Choix : Règlement inter-participants

Les schémas de paiement doivent déterminer comment les DFSP participants régleront leurs obligations financières les uns envers les autres découlant des transactions interopérables. Il y a de multiples décisions à prendre concernant le modèle de règlement. Les modèles de règlement existants utilisés dans les systèmes de paiement de détail hérités comportent des contrôles importants sur les risques. En règle générale, les schémas d'aujourd'hui ont la possibilité de faire des choix en tirant parti de la technologie moderne et de la connectivité pour gérer ces risques de différentes manières. Certains des choix sont :

- Règlement net, brut ou brut continu. Traditionnellement, le règlement net a été utilisé pour les systèmes de paiement de détail (pratiquement parlant, tous les systèmes sauf le RTGS). Certains systèmes de paiement de détail en temps réel utilisent maintenant le règlement brut (le SPEI du Mexique) ou prévoient de le faire (le Brésil). Certains systèmes utilisent un compte de règlement brut continu (le réseau RTP américain) : dans cette approche, les DFSP possèdent conjointement un compte unique à la banque de règlement, et les parts de propriété dans le compte mutualisé sont déterminées, à tout moment, par la position du grand livre du DFSP à la plateforme. Cette approche n'utilise pas d'écritures de règlement, de compensation ou de comptabilisation d'écritures de règlement.

- Choix de la banque de règlement. La plupart des systèmes de paiement de détail interopérables utilisent la banque centrale du pays comme banque de règlement, mais il existe des exemples (règlement par réseau de cartes aux États-Unis) où une banque commerciale est utilisée comme banque de règlement.

- Comptes de règlement dédiés ou polyvalents. Les comptes de règlement des DFSP, détenus à la banque de règlement, sont-ils dédiés au but du règlement du schéma, ou sont-ils utilisés à d'autres fins (autres règlements de schéma, soldes de réserve, etc.) également ? Dans un modèle de règlement brut continu, le compte mutualisé est toujours un compte dédié.

- Règlement le jour même ou différé. Dans un modèle de règlement net, les écritures de règlement sont-elles comptabilisées sur les comptes de la banque de règlement le jour de la transaction, ou plus tard ?

- Fenêtres de règlement multiples ou uniques. Dans un modèle de règlement net, y a-t-il une seule fenêtre de règlement par jour ouvrable, ou y en a-t-il plusieurs ? Si multiples, les fenêtres sont-elles définies par des périodes de temps, le volume de transactions ou un autre facteur ?

- Pré-financé ou non. Les écritures de règlement (dans un système net) ou les transactions individuelles (dans un système brut) sont-elles autorisées si le financement du compte de la banque de règlement n'est pas suffisant ? Si oui, quels mécanismes (lignes de crédit, comptes de garantie, etc.) sont utilisés pour couvrir ce risque ? Le terme « pré-financé » est utilisé lorsque les règles du schéma spécifient que le DFSP doit avoir suffisamment d'argent sur son compte de règlement pour couvrir une transaction sortante : sinon, la plateforme refusera la transaction.

- Gestion dynamique de la position ou non. Dans un système de règlement net qui utilise un commutateur, le commutateur « connaît-il » la position réelle du DFSP émetteur avant d'envoyer la transaction au DFSP récepteur ?

- Calcul automatisé ou manuel du plafond de débit net. Le plafond de débit net est un montant que le système utilise, en conjonction avec la gestion dynamique de la position, pour déterminer si une transaction individuelle est envoyée ou non au DFSP récepteur. Cela peut être soit fixé manuellement par le schéma (individuellement pour chaque DFSP) soit automatisé : ce dernier nécessite une connexion en temps réel entre le compte de la banque de règlement (dédié) et le commutateur.

- Des composantes discrétionnaires du plafond de débit net peuvent être définies par le schéma. Il en existe deux types. Une composante discrétionnaire du schéma peut s'ajouter ou se soustraire au plafond de débit net d'un DFSP individuel. Un ajout peut être utilisé pour créer une marge de sécurité ; une soustraction peut être utilisée pour étendre les capacités de découvert au DFSP. Dans ce dernier cas, la responsabilité du découvert doit être clairement convenue entre le schéma et la banque de règlement.

### 8.1 Alignement L1P — Règlement inter-participants

Level One a un principe clair appelant au règlement le jour même. En dehors de cela, les considérations les plus importantes sont la manière dont un schéma donné gérera le risque et les coûts pour les DFSP — les coûts de liquidité en particulier. Il s'agit d'un domaine en évolution rapide dans les systèmes de paiement, et il est prévu que différents schémas feront des choix différents. En général, on peut observer que l'automatisation soutient la mise à l'échelle, et que le pré-financement et les fenêtres multiples soutiennent un risque et un coût faibles.

Le code de référence Mojaloop prend en charge une variété de mécanismes de règlement différents.

## 9. Choix : Accès par paliers

Les systèmes de paiement de détail hérités (et les systèmes de gros) prennent généralement en charge l'accès par paliers — la capacité pour les institutions plus petites d'accéder au système via des relations de correspondance avec des institutions plus grandes. Cela a été considéré nécessaire car les institutions plus petites avaient fréquemment des difficultés à remplir les obligations de règlement de la participation directe ou les obligations techniques (en particulier la sécurité) de la participation directe.

Dans les pays disposant de licences d'émission de monnaie électronique (ou d'autres DFSP non traditionnels, ou de fournisseurs de comptes de transaction), la question devient de savoir si ces fournisseurs non traditionnels accèdent au système directement ou par le biais d'une relation avec une banque traditionnelle : dans ces cas, c'est généralement la question du règlement, et non la question technique, qui est en jeu.

### 9.1 Alignement L1P — Accès par paliers

Il n'y a pas de principe Level One unique qui orienterait un schéma sur la manière de traiter cette question. Il y a, cependant, des questions de coût et de risque à considérer :

- Il convient de noter que les grandes institutions ont créé des activités très rentables en servant ces institutions plus petites. Ces coûts, supportés par les participants indirects, seront d'une certaine manière répercutés sur les utilisateurs finaux. Pour cette raison, les schémas Level One pourraient vouloir éviter ce modèle lorsque c'est possible.

- Le principe Level One de « boucle ouverte » suggère qu'un schéma devrait soutenir la capacité de tous les DFSP à participer directement partout où c'est possible : la technologie moderne, telle que celle utilisée par Mojaloop, et les modèles de règlement pré-financés devraient rendre cela plus simple.

- Les systèmes hérités tendent également à « cacher » l'activité de l'institution plus petite au schéma ou au Hub. Cela peut être indésirable du point de vue réglementaire ou de la gestion des risques. Certains nouveaux systèmes de paiement de détail en temps réel (notamment le réseau RTP américain) permettent à la fois l'accès indirect technique et de règlement avec une transparence totale de l'institution plus petite vis-à-vis du schéma et de la plateforme.

- Un autre facteur à considérer est particulier aux pays disposant d'émetteurs de monnaie électronique ou d'autres fournisseurs DFSP non traditionnels. Selon le principe L1P d'implication des DFSP dans les décisions de gouvernance, il se peut que demander aux émetteurs de monnaie électronique d'accéder à un système « sous » un participant bancaire puisse laisser ces DFSP dans une position de « second rang » en ce qui concerne la gouvernance : cela est sans doute indésirable, et en particulier dans les cas, qui semblent pertinents dans certains pays, où les émetteurs de monnaie électronique ont un volume de transactions plus élevé que leurs banques sponsors.

Notez que cette section ne traite pas de l'accès au système par d'autres FSP : cela est abordé dans [Choix : Utilisation du schéma par d'autres FSP](#_13-choix-utilisation-du-schema-par-d-autres-fsp).

## 10. Choix : Frais du schéma et tarification pour l'utilisateur final

Les frais associés à un schéma de paiement interopérable peuvent être catégorisés comme :

-   Frais pour l'utilisateur final : les frais (ou exigences de solde minimum, etc.) évalués par un DFSP à son client utilisateur final. Cela inclut les frais facturés aux consommateurs, commerçants, émetteurs de factures, gouvernements ou autres entreprises. Certains de ces frais sont spécifiquement liés au transfert interopérable lui-même (par ex. un frais d'« envoi de transfert » ou un « frais d'escompte commerçant ») ; d'autres sont connexes (un frais de « décaissement », un frais de retrait au GAB). Ces frais sont généralement fixés par le DFSP. Dans certains pays et situations, la réglementation ou les accords de règles du schéma peuvent s'appliquer ou influencer les frais. Les frais peuvent être des montants fixes ; des pourcentages de valeur, ou une combinaison de montants fixes et de pourcentage de valeur. Dans tous les cas, les grilles tarifaires peuvent différer en fonction des tranches de valeur (par exemple, les transactions inférieures à la valeur « X » ont ce frais) ou du volume de transactions de l'utilisateur final.

- Frais de traitement : les frais que le schéma et l'opérateur de la plateforme (si différent) facturent aux DFSP pour l'utilisation du schéma et de la plateforme. Comme pour les frais pour l'utilisateur final, les frais de traitement peuvent être fixes ou variables et peuvent également varier selon la tranche de valeur ou le volume de transactions.

- Frais d'interchange : frais qu'un DFSP paie à un autre DFSP liés à une transaction interopérable. Les frais d'interchange sont normalement fixés par le schéma (dans les règles du schéma) et sont physiquement tabulés et collectés par le schéma. Le schéma et l'opérateur de la plateforme ne paient ni ne reçoivent ces frais : ils constituent un débit pour un DFSP et un crédit pour l'autre. Tant le taux des frais d'interchange que la direction (le DFSP payeur paie-t-il ou reçoit-il ?) peuvent varier selon le cas d'utilisation et le cas d'utilisation secondaire. Les frais d'interchange peuvent être fixes, un pourcentage de la valeur, ou une combinaison des deux.

En plus de fixer les politiques de frais, les schémas devront décider de la manière dont les frais sont collectés et (dans le cas des frais d'interchange) distribués. Il y a une considération importante avec l'interchange : les frais doivent-ils être collectés et distribués dans le cadre du règlement de chaque transaction, ou sous forme de facturation en fin de période (comme mensuellement) ?

### 10.1 Alignement L1P : Frais

L'un des concepts Level One les plus importants est d'avoir une plateforme à coût ultra-faible, avec des frais pour les consommateurs et les petits commerçants aussi bas que possible. Un élément important pour y parvenir dans un système de paiement est d'atteindre l'échelle. Les schémas voudront considérer ces deux facteurs lorsqu'ils fixeront les politiques de frais. Les considérations incluent :

- **Tarification pour l'utilisateur final.** Le schéma est-il en position de mettre des contrôles ou des limitations à ce sujet ? La réponse variera selon la juridiction. Certains schémas ont mis des limitations sur la structure des frais (par ex. doit être fixe vs pourcentage de la valeur), sur les parties pouvant être facturées (par ex. les payeurs peuvent être facturés mais pas les bénéficiaires, etc.) ou sur ce que les frais globaux peuvent être. Certains schémas n'ont pas écrit cela dans les règles mais ont encouragé des accords informels sur les politiques de frais (sous réserve des approbations réglementaires) pour inciter l'utilisation par les consommateurs. D'autres schémas ont interdit certains types d'actions tarifaires, comme facturer des surcharges pour les transactions interopérables.

- **Frais de traitement.** L'objectif ici est que les frais du schéma aux DFSP soient aussi bas que possible (spécifiquement et idéalement, une fraction d'un cent américain). Les meilleures pratiques du marché sont que ces frais soient fixes, plutôt qu'un pourcentage de la valeur : cela a du sens étant donné que le schéma et la plateforme ne prennent pas de risque de valeur dans le traitement des transactions. Cependant, il y a un défi avec des frais purement fixes : comment éviter d'avoir des frais trop élevés pour les transactions de très faible valeur. Certains schémas abordent cela par des tranches de valeur, avec des frais fixes inférieurs pour les transactions en dessous d'une certaine valeur. Certains schémas établissent des paliers de volume pour inciter les DFSP. Les schémas peuvent souhaiter encourager (ou même imposer) que les DFSP acheminent les transactions « on-us » (où le DFSP payeur et le DFSP bénéficiaire sont la même institution) via la plateforme : si tel est le cas, le schéma peut souhaiter fixer un frais nul pour ces transactions. Certains schémas peuvent également facturer des frais d'adhésion et/ou d'intégration aux DFSP. Enfin, certains schémas peuvent prévoir une période après le lancement du schéma pendant laquelle tous les frais sont supprimés.

- **Frais d'interchange**. Il s'agit d'un sujet complexe et souvent débattu dans l'industrie du paiement mondial, et qui attire fréquemment l'attention des régulateurs. Les schémas peuvent vouloir considérer :

    - S'il faut ou non avoir de l'interchange. Certains systèmes de paiement en ont ; beaucoup n'en ont pas. Les systèmes de paiement de détail en temps réel dans le monde sont partagés sur la question de savoir s'ils prennent en charge l'utilisation de l'interchange, et là où ils le font, dans quelle direction l'interchange circule pour des cas d'utilisation tels que le P2P.

    - L'interchange est un mécanisme utile pour une forme de facturation : lorsque le receveur d'un service de valeur (comme un commerçant qui veut accéder au compte de paiement d'un consommateur) n'a pas de relation avec le fournisseur de ce service (le DFSP du consommateur). Un autre exemple est celui où le GAB d'une banque est utilisé pour distribuer des fonds au client d'une autre banque.

    - L'interchange est plus discutable lorsqu'il est utilisé pour soutenir des modèles commerciaux hérités : par exemple, si une transaction interopérable fait « perdre » à un DFSP payeur un frais de décaissement qu'il aurait autrement gagné, le schéma peut spécifier un taux d'interchange dans lequel le DFSP bénéficiaire paie le DFSP payeur pour compenser cette perte. Il peut être pratique d'utiliser l'interchange dans ces situations à court terme, mais à long terme on peut argumenter que le modèle commercial sous-jacent doit évoluer.

    - Les schémas doivent garder à l'esprit que partout où l'interchange est utilisé, un « coût dur » est créé qui est absorbé par, et probablement répercuté dans les frais pour l'utilisateur final, par le DFSP payant l'interchange.

## 11. Choix : Gestion de la marque

Faut-il utiliser une marque de schéma ? La même marque doit-elle être utilisée pour tous les cas d'utilisation ? Ou la seule marque utilisée doit-elle être la marque du DFSP qui offre un service à ses clients ? Sans surprise, c'est une question qui a été débattue dans les systèmes de paiement au fil des ans.

### 11.1 Alignement L1P — Marque

Level One a un principe de conception clair soutenant une marque commune : cela repose sur le fait de rendre le service compréhensible et facile à utiliser pour les consommateurs et les commerçants. Une marque commune de schéma peut être utilisée en conjonction avec les marques des DFSP : « Utilisez DFSP SuperPay (marque DFSP) avec XPay (marque du schéma) pour payer vos factures. »

Les règles commerciales devront spécifier comment et où la marque commune est utilisée.

## 12. Choix : Connexions du schéma avec d'autres schémas

L'avènement de systèmes de paiement de détail en temps réel à peu près similaires dans le monde a conduit à de nombreuses discussions sur l'opportunité de connecter ces schémas entre eux. Cela peut faciliter les transactions au sein d'un pays, mais a notamment une importance pour les paiements transfrontaliers de toutes sortes, y compris les transferts de fonds des travailleurs.

Dans les systèmes de paiement hérités, ce type de connexion est rare sur une base de schéma à schéma. Des exceptions notables incluent la connexion domestique des réseaux de GAB, et la connexion de schémas de cartes domestiques qui sont détenus ou contrôlés par des réseaux de cartes mondiaux. Ce qui se passe, au lieu de cela, c'est que les DFSP ou d'autres fournisseurs qui participent à plusieurs réseaux (soit directement, soit par le biais de partenariats) créent l'effet d'une connexion inter-schémas par des accords individuels : c'est, essentiellement, le fonctionnement de la banque correspondante transfrontalière.

Mojaloop en tant que technologie est conçu pour permettre la connectivité système à système. Les schémas mettant en œuvre des systèmes Mojaloop devront considérer l'équilibre entre conclure des accords commerciaux de schéma à schéma (avec des connexions techniques concomitantes) et/ou permettre aux DFSP de leur schéma de se connecter bilatéralement à d'autres schémas ou DFSP.

### 12.1 Alignement L1P — Connexions avec d'autres schémas

Les principes L1P pertinents ici sont le faible coût et l'« ouverture ». Le code Mojaloop en particulier a le potentiel de transformer les transactions transfrontalières, qui sont régies par des relations complexes (comme dans le cas de la banque correspondante traditionnelle), en transactions qui font l'objet de concurrence dans un marché ouvert et interconnecté. Les schémas devront évaluer les mérites de cela (promouvant sans doute des coûts plus bas) avec les risques de dominance par les grandes institutions. Les arrangements commerciaux de schéma à schéma peuvent avoir des caractéristiques bénéfiques d'« égalisation des chances ». Des relations hybrides sont également possibles. Il s'agit d'un domaine en évolution de l'industrie du paiement, et un domaine où une variété considérable d'arrangements sont à la fois possibles et probables.

## 13. Choix : Utilisation du schéma par d'autres FSP

Un schéma aligné L1P réussi sera utilisé par de nombreuses entreprises — commerçants, émetteurs de factures, agences gouvernementales, etc. — ainsi que par des individus. Il y aura également un large éventail d'autres FSP (fournisseurs de services financiers) qui ne sont pas des DFSP : en d'autres termes, qui ne détiennent pas de comptes de transaction des clients. Cela inclut les fournisseurs de services de paiement : agrégateurs, fournisseurs de services aux commerçants, divers processeurs de DFSP, etc., qui peuvent tous vouloir se connecter et utiliser le schéma.

Comme décrit dans le choix « participation » ci-dessus, un schéma aligné Level One inclut comme participants directs et réglants uniquement les entités qui détiennent les comptes de transaction des utilisateurs finaux : les comptes qui sont débités et crédités à la suite de la transaction interopérable.

D'autres entités peuvent se connecter physiquement à la plateforme dans le cadre de divers arrangements commerciaux. Le schéma devra décider à quel point les règles commerciales du schéma sont impliquées dans la dictée des termes ou normes de ces arrangements. En règle générale, tout autre FSP se connectant à la plateforme devra agir pour le compte d'un DFSP dont le compte de transaction du client est débité (le DFSP payeur) ou crédité (le DFSP bénéficiaire). Dans les modèles de paiement hérités, le DFSP conserve toutes les obligations financières et responsabilités de la transaction : le tiers agit purement pour le compte du DFSP. Les règles commerciales du schéma peuvent spécifier des exigences pour les arrangements commerciaux entre le DFSP et le tiers. Dans certaines juridictions (notamment l'Inde et l'UE), la réglementation pousse à des changements de ce modèle pour permettre aux autres FSP d'avoir une implication plus directe dans les schémas. Les règles du schéma devront décrire et prescrire soigneusement les paramètres de ces arrangements.

Note de définition : nous n'utilisons intentionnellement pas le terme « PSP » (Prestataire de services de paiement) ici, car dans diverses juridictions, ce terme est utilisé pour inclure les fournisseurs de comptes de transaction, dans certains cas, et les fournisseurs de comptes non-transactionnels dans d'autres cas. En commentaire supplémentaire, dans de nombreux pays aujourd'hui, des entités telles que les agrégateurs détiennent des comptes financiers dans des banques ou chez des émetteurs de monnaie électronique et utilisent ces comptes pour recevoir de l'argent des clients et distribuer de l'argent à d'autres clients. Dans ce rôle, l'agrégateur est un client d'un DFSP (la banque ou l'émetteur de monnaie électronique) et agit également en tant que fournisseur de services financiers. Il se peut que ces agrégateurs, à l'avenir, n'aient pas besoin d'intermédier la transaction financière, mais fournissent plutôt des instructions conduisant au transfert direct de fonds, via le schéma, du compte de transaction d'un client à celui d'un autre.

### 13.1 Alignement L1P — Utilisation par d'autres FSP

Les principes ici sont, encore une fois, le faible coût et l'ouverture. Level One encouragerait les nouveaux acteurs à pouvoir utiliser et accéder au schéma, tant que leurs actions sont contrôlées par le schéma afin d'assurer la sécurité et la stabilité financière.

## 14. Choix : Normes de gestion des risques du schéma

Les schémas de paiement, leurs plateformes et les DFSP participants ainsi que les tiers doivent tous, évidemment, fonctionner selon des normes de gestion des risques solides afin d'assurer un écosystème de systèmes de paiement sain.

La question pour un schéma est l'équilibre entre définir ces normes lui-même et s'appuyer sur d'autres normes. Du point de vue des règles commerciales, c'est un choix significatif. Les schémas peuvent soit :

- Développer des normes détaillées de gestion des risques pour les DFSP (et pour la plateforme) et mener des processus rigoureux de certification et/ou d'audit pour assurer la conformité

- Exiger que les DFSP, la plateforme et les tiers suivent les normes nationales ou mondiales référencées en matière de gestion des risques et de sécurité

### 14.1 Alignement L1P — Normes de gestion des risques

Level One ne traite pas de quel choix ci-dessus est le meilleur. Mais les concepts d'un système sûr pour les consommateurs et d'un système à faible coût s'appliquent clairement ici. Quelques considérations :

- Un utilitaire partagé de gestion de la fraude (que les principes Level One soutiennent) peut gérer de manière rentable certaines des tâches de gestion de la fraude. Cela ne réduit pas la charge de conformité individuelle d'un DFSP, mais déplace simplement la manière dont il remplit cette charge.

- Les réseaux de cartes mondiaux ont effectivement démontré la capacité d'automatiser des éléments du traitement des exceptions, en se concentrant sur les transactions qui se produisent le plus fréquemment.

- La communauté Mojaloop a exprimé son intérêt pour la codification des exceptions et la fourniture d'un support par le code pour certains processus.

- La communauté Mojaloop peut également développer des documents de meilleures pratiques pour traiter les domaines de la gestion des risques, y compris la cybersécurité.

## 15. Choix : Gestion des exceptions

Le traitement des exceptions comprend une grande variété de transactions et d'interactions non standard parmi les utilisateurs et les fournisseurs d'un schéma de paiement. Celles-ci incluent :

- Les erreurs de la part des utilisateurs finaux

- Les erreurs de la part des DFSP, de la plateforme ou d'autres FSP

- La fraude commise par les clients utilisateurs finaux, y compris les individus, les commerçants, les émetteurs de factures ou d'autres entités

- La fraude commise par des tiers, y compris les pirates informatiques

- Les attaques malveillantes sur le système ou sur des DFSP individuels, y compris les cyberattaques.

Les schémas ont des choix importants à faire sur le degré d'implication du schéma et de ses règles commerciales dans la définition de la manière dont les participants au schéma gèrent ces exceptions. Les systèmes de paiement hérités nous montrent une grande variété de modèles utilisés, allant de systèmes où le schéma et les règles commerciales ont une implication minimale dans le traitement des exceptions (chèques, la plupart des systèmes ACH) à des systèmes où le schéma et ses règles commerciales sont largement impliqués (la plupart des réseaux de cartes). Les systèmes de paiement de détail en temps réel dans le monde n'en sont généralement qu'aux premiers stades de la décision sur la manière de traiter ces questions.

### 15.1 Alignement L1P — Traitement des exceptions

Il y a deux principes de conception Level One très importants qui s'y rapportent.

- L'un est le principe d'irrévocabilité des transactions. Cela signifie qu'une transaction de paiement qui est complétée avec succès (dans une implémentation Mojaloop, une qui a été exécutée) ne peut pas être annulée sans le consentement du bénéficiaire.

- L'autre est l'engagement envers une ressource partagée de gestion de la fraude au niveau de la plateforme. L'idée est que le schéma et sa plateforme auront une vue plus large de toutes les données de transaction et seront en mesure d'effectuer des tâches de détection et de gestion de la fraude plus efficacement et à moindre coût que les DFSP individuels. Ce concept en est à ses tout premiers stades d'évolution à mesure que les systèmes Level One sont déployés, tant avec que sans la technologie Mojaloop.

Les schémas feront face à des défis significatifs dans ce domaine alors que le déploiement tant attendu des paiements commerçants se produit, en particulier dans les marchés moins développés qui ne disposent pas d'industries de paiement par carte très pénétrées. Le défi sera d'équilibrer le désir de protéger les consommateurs contre la fraude des commerçants avec le désir d'avoir une tarification à faible coût pour l'utilisateur final. Sur les marchés développés de paiement par carte, cela est souvent assuré par des règles commerciales qui spécifient que la banque du commerçant est financièrement responsable de la fraude commise par le commerçant. Cela fonctionne mais entraîne des frais de transaction relativement élevés pour le commerçant, car sa banque doit couvrir son exposition au risque en vertu de ces règles. Ce modèle financier peut ou non être viable dans les économies moins développées. C'est un autre domaine où nous anticipons une évolution considérable dans les années à venir.
