# Modèle de glossaire uniforme

- Version : 1.0 
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

Ceci est un glossaire des termes utilisés dans le projet de documents commerciaux de la communauté Mojaloop, et contient d'autres termes liés aux sujets commerciaux. Un glossaire technique plus détaillé est disponible dans le cadre de la spécification Open API for FSP Interoperability.

# Modèle de glossaire uniforme

| Terme   | Définition                                                                                      |
| :----- | :---------------------------------------------------------------------------------------------- | 
| Canal d'accès | Lieux ou capacités utilisés pour initier ou recevoir un paiement. Les canaux d'accès peuvent inclure les succursales bancaires, les GAB, les terminaux au point de vente, les points d'agents, les téléphones mobiles et les ordinateurs. |
| Recherche de compte | Un processus qui détermine le DFSP responsable d'un compte de transaction. |
| Système de recherche de compte | Le système de recherche de compte est une entité abstraite utilisée pour récupérer des informations concernant le FSP dans lequel un compte, un portefeuille ou une identité est hébergé. Le système de recherche de compte lui-même peut être hébergé sur son propre serveur, dans le cadre d'un commutateur financier, ou dans les différents FSP. |
| Validation de compte | Un statut fourni par un appel API de réponse au devis : un DFSP bénéficiaire indique qu'un compte est disponible pour être crédité du montant de transfert proposé. |
| Utilisateur actif | Un terme utilisé par de nombreux fournisseurs pour décrire combien de leurs titulaires de compte sont des utilisateurs fréquents de leur service. |
| Adressage | L'utilisation d'un identifiant pour diriger un paiement d'un payeur vers un bénéficiaire, généralement un numéro de téléphone mobile ou une adresse e-mail. |
| Adjacences | Moyens par lesquels les entités et/ou les DFSP réalisent des revenus à partir de services qui ne sont pas directement associés à un paiement — par exemple, les prêts accordés aux titulaires de comptes de transaction. |
| Agent | Une entité autorisée par le fournisseur à gérer diverses fonctions telles que l'inscription des clients, l'encaissement et le décaissement à l'aide d'une caisse d'agent. |
| Point d'agent | Un emplacement physique qui possède une ou plusieurs caisses d'agent, lui permettant d'effectuer des transactions d'inscription, d'encaissement et de décaissement pour les clients au nom d'un ou plusieurs fournisseurs. La législation nationale définit si un point d'agent peut rester exclusif à un seul fournisseur. Les points d'agent peuvent avoir d'autres activités commerciales et fonctions de support. |
| Caisse d'agent | Une caisse d'agent est une « ligne » enregistrée émise par le fournisseur, soit une carte SIM spéciale, soit une machine TPV, utilisée pour effectuer des transactions d'inscription, d'encaissement et de décaissement pour les clients. La législation nationale dicte quels fournisseurs de services financiers peuvent émettre des caisses d'agent. |
| Encaissement initié par l'agent | Un cas d'utilisation défini dans le document des spécifications API. |
| Décaissement initié par l'agent | Un cas d'utilisation défini dans le document des spécifications API. |
| Agrégateur | Une forme spécialisée de fournisseur de services aux commerçants, qui gère généralement les transactions de paiement pour un grand nombre de petits commerçants. Les règles du schéma précisent souvent ce que les agrégateurs sont autorisés à faire. |
| Alias | Un identifiant de bénéficiaire qui est mappé à un DFSP bénéficiaire et à un numéro de compte de transaction. |
| Lutte contre le blanchiment d'argent (AML) | La lutte contre le blanchiment d'argent fait référence au droit applicable et, dans la mesure expressément adoptée par le schéma, aux guides de bonnes pratiques, concernant l'atténuation des risques de blanchiment d'argent. |
| API | Interface de programmation d'applications : une interface technique mise en œuvre par un protocole logiciel qui permet aux systèmes d'interagir les uns avec les autres via des structures standard, sans qu'un système utilisateur ait besoin de connaître les détails de mise en œuvre interne du système avec lequel il interagit. |
| Droit applicable | Tous les traités, conventions, lois, règlements, directives, orientations officielles ou directives d'une autorité de régulation dans la mesure où ils sont contraignants, respectivement, pour le schéma ou un participant en ce qui concerne les services du schéma. |
| Candidat | Une organisation qui a soumis ou souhaite soumettre une demande pour devenir participant, mais dont la demande n'a pas été traitée par le schéma. |
| Interface de programmation d'applications (API) | Une méthode de communication permettant l'interaction et le partage de données entre différents logiciels ou protocoles techniques. |
| Arbitrage | L'utilisation d'un arbitre, plutôt que des tribunaux, pour résoudre les litiges. |
| Documents associés | L'ensemble des documents répertoriés dans l'annexe A de ces règles. |
| Décaissement initié par GAB via OTP | Un cas d'utilisation défini dans le document des spécifications API. |
| Attribut | Une caractéristique d'une transaction, étant entendu que des règles spécifiques peuvent s'appliquer aux transactions avec des attributs spécifiques. |
| Authentification | Le processus consistant à s'assurer qu'une personne ou une transaction est valide pour le processus (ouverture de compte, initiation de transaction, etc.) en cours. |
| Autorisation | La permission donnée par le payeur ou l'entité d'effectuer un paiement. |
| Institution/entité autorisée | Institutions non financières qui ont suivi l'autorisation appropriée de la banque d'État et/ou des autorités réglementaires compétentes pour participer à la fourniture de services financiers mobiles. |
| B2P | Entreprise à personne ; un cas d'utilisation secondaire de paiement en masse. |
| Banque | Un système financier agréé dans un pays qui a la capacité d'accepter des dépôts et d'effectuer et de recevoir des paiements sur les comptes des clients. |
| Compte bancaire | Un compte de transaction offert par une banque. |
| Identifiant de compte bancaire | Un type d'identifiant de bénéficiaire. |
| Services de comptes et de transactions bancaires | Un compte de transaction détenu dans une banque. Ce compte peut être accessible par un téléphone mobile, auquel cas il est parfois appelé « banque mobile ». |
| Banque à banque | Un cas d'utilisation secondaire P2P. |
| Banque à portefeuille | Un cas d'utilisation secondaire P2P. |
| Modèle piloté par les banques | Une référence à un système dans lequel les banques sont les principaux fournisseurs de services financiers numériques aux utilisateurs finaux. La législation nationale peut l'exiger. |
| Téléphone basique | Appareil minimum requis pour utiliser les services financiers numériques. |
| Paiement de facture | Un cas d'utilisation secondaire P2B. |
| Authentification biométrique | L'utilisation d'une caractéristique physique d'une personne (empreinte digitale, iris, etc.) pour authentifier cette personne. |
| Liste noire | Une liste ou un registre d'entités (utilisateurs enregistrés) auxquelles un privilège, un service, une mobilité, un accès ou une reconnaissance particulière est refusé/bloqué. |
| Blockchain | Une technologie qui crée des architectures distribuées. Dans les systèmes de paiement, souvent une référence à un registre partagé qui enregistre et valide les transactions. |
| Blockchain | La technologie sous-jacente au bitcoin et à d'autres cryptomonnaies - un registre numérique partagé, ou une liste continuellement mise à jour de toutes les transactions. |
| Marque | Un mot et/ou une marque approuvée par le schéma pour utilisation par les participants. |
| Décaissement en masse | Un cas d'utilisation défini dans le document des spécifications API. |
| Paiement en masse | Un paiement d'un seul payeur à plusieurs bénéficiaires, par exemple des programmes de transfert d'argent d'un gouvernement ou d'une ONG à un ensemble de bénéficiaires. |
| Service de téléchargement en masse | Un service permettant l'importation de plusieurs transactions par session, le plus souvent via un fichier de transfert de données en masse utilisé pour initier des paiements. Exemple : fichier de paiement des salaires. |
| Entreprise | Entité telle qu'une société publique à responsabilité limitée ou une société qui utilise la monnaie mobile comme service ; par exemple, effectuer et accepter des paiements de factures et verser des salaires. |
| Gestion de la trésorerie | Gestion des soldes de trésorerie chez un agent. |
| Encaissement | Recevoir un crédit en monnaie électronique en échange d'espèces physiques - généralement effectué chez un agent. |
| Décaissement | Recevoir des espèces physiques en échange d'un débit sur un compte de monnaie électronique - généralement effectué chez un agent. |
| Carte à puce | Une carte à puce contient une puce informatique : elle peut être soit sans contact, soit à contact (nécessite l'insertion dans un terminal). Les normes mondiales pour les cartes à puce sont définies par EMV. |
| Compensation | Le processus au sein d'un système de paiement par lequel un DFSP payeur et un DFSP bénéficiaire débitent et créditent les comptes de leurs utilisateurs finaux. |
| Boucle fermée | Un système de paiement utilisé par un seul fournisseur, ou un groupe très restreint de fournisseurs. |
| Lutte contre le financement du terrorisme (CFT) | Initiatives visant à empêcher les individus ou les entités d'utiliser les systèmes de paiement pour envoyer des fonds à des individus ou des entités associés au terrorisme. |
| Commission | Un paiement incitatif effectué, généralement à un agent ou à un autre intermédiaire qui agit au nom d'un fournisseur de services financiers numériques. Fournit une incitation pour l'agent. |
| Engagement | Partie d'une opération de transfert en deux phases dans laquelle les fonds qui étaient réservés pour être transférés sont libérés au bénéficiaire ; le transfert est complété entre les comptes d'origine/payeur et de destination/bénéficiaire. |
| Condition | Dans le protocole Interledger, un verrou cryptographique utilisé lorsqu'un transfert est réservé. Généralement sous la forme d'un hachage SHA-256 d'une pré-image secrète. Lorsqu'elle est fournie dans le cadre d'une demande de transfert, le transfert doit être réservé de telle sorte qu'il ne soit engagé que si l'accomplissement de la condition (la pré-image secrète) est fourni. |
| Corridor | Désigne deux pays quelconques dans une transaction transfrontalière et la direction du transfert. |
| Contrepartie | L'autre partie dans une transaction de paiement ou de crédit. Un bénéficiaire est la contrepartie d'un payeur, et vice versa. |
| Coupon | Un jeton qui donne droit au porteur à une réduction ou qui peut être échangé contre des biens ou des services. |
| Virement | Un paiement ou un transfert de fonds initié par le DFSP payeur au DFSP bénéficiaire. Un virement est souvent appelé « transfert de crédit par poussée » car les fonds sont « poussés » depuis le compte de transaction du payeur. Le virement contraste avec le prélèvement automatique. |
| Transfrontalier | Un transfert d'un DFSP payeur domicilié dans un pays, vers un DFSP bénéficiaire domicilié dans un autre pays. |
| Transfert multi-devises | Transfert impliquant plusieurs devises, y compris un calcul de change. |
| Position actuelle | La position nette actuelle d'un participant dans le grand livre de position pour une devise donnée. |
| Client | Le client du système. Le terme est utilisé tant pour le payeur que pour le bénéficiaire. Les individus, les commerçants, les émetteurs de factures, les gouvernements et les autres entreprises sont tous des clients. Parfois désignés comme utilisateurs finaux. |
| Décaissement initié par le client | Un cas d'utilisation défini dans le document des spécifications API. |
| Achat initié par le client | Un cas d'utilisation défini dans le document des spécifications API. |
| Achat initié par le client via QR | Un cas d'utilisation défini dans le document des spécifications API. |
| DFSP (Fournisseur de services financiers numériques) | Un fournisseur de services financiers autorisé par une autorité de régulation à fournir des comptes de transaction qui détiennent les fonds des clients et sont utilisés pour effectuer et recevoir des paiements. Les DFSP ont des relations avec les consommateurs, les commerçants et d'autres entreprises, et fournissent des services financiers numériques aux utilisateurs finaux. Utilisé de manière interchangeable avec FSP (Fournisseur de services financiers). |
| Numérique | Communications électroniques entre deux individus ou entités pouvant se produire sur divers appareils électroniques (par ex. mobile, tablette, ordinateur). |
| Liquidité numérique | Une pratique consistant à conserver la valeur sous forme numérique, plutôt que d'échanger la valeur numérique contre des espèces (forme physique). |
| Paiement numérique | Un terme large incluant tout paiement exécuté électroniquement. Comprend les paiements initiés par téléphone mobile ou ordinateur. Les paiements par carte dans certaines circonstances sont considérés comme des paiements numériques. Le terme « paiement mobile » est tout aussi large et comprend une grande variété de types de transactions qui utilisent d'une manière ou d'une autre un téléphone mobile. |
| Prélèvement automatique | Un paiement ou un transfert de fonds initié par le DFSP bénéficiaire au DFSP payeur. Un prélèvement automatique est souvent appelé « transfert de débit par tirage » car les fonds sont « tirés » du compte de transaction du payeur. Le prélèvement automatique contraste avec le virement. |
| Répertoire | Un registre centralisé ou décentralisé d'identifiants de paiement à utiliser pour l'adressage, accessible par le système de paiement ou les DFSP. |
| Résolution des litiges | Un processus spécifié par un fournisseur ou par les règles d'un schéma de paiement pour résoudre les problèmes entre les utilisateurs finaux et les fournisseurs, ou entre un utilisateur final et sa contrepartie. |
| Domestique | Décrit une transaction entre deux DFSP domiciliés dans le même pays. |
| Monnaie électronique | Fonds ou valeur numériques détenus par un titulaire de compte de transaction sur un dispositif de paiement tel qu'une puce, une carte prépayée, un téléphone mobile ou un système informatique. La réglementation nationale précise quels types de DFSP peuvent émettre de la monnaie électronique. |
| Émetteur de monnaie électronique | Un DFSP autorisé dans le pays à agir en tant qu'émetteur de monnaie électronique. |
| Utilisateur final | Le client d'un DFSP. Le client peut être un consommateur, un commerçant, un gouvernement ou une autre forme d'entreprise. |
| Frais pour l'utilisateur final | Frais évalués par un DFSP à son client utilisateur final. |
| Entreprise | Toute personne non individuelle qui est cliente d'un DFSP : comprend les commerçants, les émetteurs de factures, les agences gouvernementales et d'autres entreprises. |
| Compte séquestre ou de fiducie | Un compte détenu par un DFSP non bancaire dans une banque ; normalement une exigence réglementaire pour protéger les dépôts des consommateurs auprès du DFSP. |
| Exceptions | Transactions erronées ou frauduleuses. |
| FATF | Le Groupe d'action financière est une organisation intergouvernementale pour lutter contre le blanchiment d'argent et agir contre le financement du terrorisme. |
| Téléphone basique | Un téléphone mobile sans capacités de calcul significatives. |
| Frais | Les paiements évalués par un fournisseur à son utilisateur final. Il peut s'agir d'un frais fixe, d'un frais en pourcentage de la valeur, ou d'un mélange. |
| Monnaies fiduciaires | Monnaie officielle émise par la banque centrale d'un pays ou d'une région comme monnaie légale. |
| Inclusion financière | La fourniture durable de services financiers numériques abordables qui intègrent les utilisateurs finaux à faible revenu dans l'économie formelle. |
| Inclusion financière | La fourniture durable de services financiers numériques abordables qui intègrent les personnes pauvres dans l'économie formelle. |
| Littératie financière | Consommateurs et entreprises possédant des compétences financières essentielles, telles que la préparation d'un budget familial ou la compréhension de concepts tels que la valeur temporelle de l'argent, l'utilisation d'un produit ou service de services financiers numériques, ou la capacité de postuler pour un tel service. |
| Fintech | Un terme utilisé pour décrire l'intersection de la finance et de la technologie. Les « fintechs » sont des entités fournissant des solutions innovantes dans le domaine financier, en tirant parti de la technologie. |
| Flottant | Ce terme peut signifier une variété de choses différentes. En banque, le flottant est créé lorsque le compte d'une partie est débité ou crédité à un moment différent de celui de la contrepartie à la transaction. La monnaie électronique, en tant qu'obligation d'un fournisseur non bancaire, est parfois désignée comme flottant. |
| Fraude | Utilisation criminelle des services financiers numériques pour prendre des fonds à un autre individu ou entreprise, ou pour nuire à cette partie d'une autre manière. |
| Gestion du risque de fraude | Outils pour gérer les risques des fournisseurs, et parfois les risques des utilisateurs (par exemple, pour les commerçants ou les gouvernements) dans la fourniture et/ou l'utilisation des services de services financiers numériques. |
| FSP | L'entité qui fournit un service financier numérique à un utilisateur final (soit un consommateur, une entreprise ou un gouvernement). Utilisé de manière interchangeable avec DFSP (Fournisseur de services financiers numériques). |
| Transfert exécuté | Un transfert qui a été accepté par le DFSP bénéficiaire et enregistré comme terminé par le schéma. Une fois qu'un transfert a été enregistré comme terminé par le schéma, le payeur est tenu d'honorer la transaction lorsqu'elle apparaît dans un règlement. |
| Accomplissement | Dans le protocole Interledger, un secret qui est la pré-image d'un hachage SHA-256, utilisé comme condition sur un transfert. La pré-image est requise dans le message d'engagement pour déclencher l'engagement du transfert. |
| FX | Change (Foreign Exchange). |
| G2P | Un cas d'utilisation secondaire de paiement en masse. |
| Gouvernance | L'ensemble des approches de gestion, des décisions et des fonctions de surveillance au sein du schéma. La gouvernance du schéma peut donner le ton de tout ce qui se passe dans le schéma. |
| Agence gouvernementale | Tout titulaire de compte de transaction qui est une sorte d'agence ou de département gouvernemental. |
| Services d'acceptation des paiements gouvernementaux | Services qui permettent aux gouvernements de collecter des impôts et des frais auprès des individus et des entreprises. |
| Règlement brut | Une méthode de règlement des obligations financières entre les DFSP et un schéma. Le règlement brut traite chaque transaction individuellement. Les détails du modèle de règlement brut sont spécifiés dans les règles du schéma. Le règlement brut contraste avec le règlement net. |
| Hub | Un terme qui peut être utilisé pour l'entité qui exploite la plateforme au nom du schéma. |
| Service d'identifiant | La manière dont le processus de recherche de compte fonctionne pour un type d'identifiant donné. |
| Identité | Un justificatif d'identité de quelque sorte qui identifie un utilisateur final. Les identités nationales sont délivrées par les gouvernements nationaux. Dans certains pays, une identité financière est délivrée par les fournisseurs de services financiers. |
| Transfert de fonds immédiat | Un paiement numérique qui est reçu par le bénéficiaire presque immédiatement après que le payeur a initié la transaction. |
| Interchange | Une structure au sein de certains schémas de paiement qui oblige un fournisseur à payer à l'autre fournisseur des frais sur certaines transactions. Généralement utilisé dans les schémas de cartes pour effectuer le paiement d'un frais d'un commerçant à la banque émettrice de la carte du consommateur. |
| Interledger | Le protocole Interledger est un protocole pour transférer de la valeur monétaire à travers plusieurs réseaux de paiement déconnectés en utilisant une chorégraphie de transferts conditionnels sur chaque réseau. |
| Transfert de fonds international | Effectuer et recevoir des paiements vers une autre personne dans un autre pays. |
| Interopérabilité | La capacité d'un client disposant d'un compte de transaction chez un participant à échanger une transaction avec un client qui a un compte de transaction chez un participant différent. |
| Service d'interopérabilité pour les transferts (IST) | Un commutateur. |
| Irrévocable | Une transaction qui ne peut pas être « rappelée » par le payeur ; un paiement irrévocable, une fois reçu par un bénéficiaire, ne peut pas être repris par le payeur. |
| Connaissance du client (KYC) | Exigences réglementaires pour qu'un DFSP établisse l'identité et les activités d'un utilisateur final ou d'une entité, tant avant l'ouverture d'un compte de transaction que dans le temps. |
| Grand livre | Un registre tenu des transactions. |
| Level One Project | Une initiative de la Fondation Bill & Melinda Gates pour promouvoir l'inclusion financière. |
| Responsabilité | Une obligation légale d'une partie envers une autre ; requise soit par la législation nationale, les règles du schéma de paiement, ou des accords spécifiques entre fournisseurs. Certaines règles de schéma transfèrent les responsabilités d'une transaction d'un fournisseur à un autre dans certaines conditions. |
| Licence | La licence accordée à un candidat par le schéma lors de l'acceptation de l'accord de participation au schéma, qui autorise le participant à participer au schéma et à utiliser la propriété du schéma conformément aux règles. |
| Liquidité | La disponibilité d'actifs liquides pour soutenir une obligation. Les banques et les fournisseurs non bancaires ont besoin de liquidité pour honorer leurs obligations. Les agents ont besoin de liquidité pour faire face aux transactions de décaissement des consommateurs et des petits commerçants. |
| Prêts | Moyens par lesquels les utilisateurs finaux peuvent emprunter de l'argent. |
| Commerçant | Une entreprise qui vend des biens ou des services et reçoit des paiements pour ces biens ou services. |
| Acquisition de commerçants | Le processus d'activation d'un commerçant pour la réception de paiements électroniques. |
| Codes de catégorie de commerçants | Un ensemble de catégorisation défini par un schéma pour différencier les clients entreprises. |
| Identifiant commerçant | Un type d'identifiant de bénéficiaire. |
| Fournisseur de services aux commerçants | Un fournisseur (banque ou non-banque) qui soutient les exigences des commerçants ou d'autres accepteurs de paiements pour recevoir des paiements de clients. Le terme « acquéreur » est utilisé spécifiquement en lien avec l'acceptation des transactions de paiement par carte. |
| Achat initié par le commerçant | Un cas d'utilisation défini dans le document des spécifications API. |
| Achat initié par le commerçant via TPV/OTP | Un cas d'utilisation défini dans le document des spécifications API. |
| Achat initié par le commerçant via QR | Un cas d'utilisation défini dans le document des spécifications API. |
| Institution de microfinance (IMF) | Une entité qui offre des services financiers aux populations à faible revenu. Presque toutes les IMF accordent des prêts à leurs membres, et beaucoup offrent des services d'assurance, de dépôt et autres. Les IMF sont considérées comme des DFSP dans un système Level One si elles fournissent des comptes de transaction à leurs clients. Les IMF qui ne sont pas des DFSP peuvent se connecter directement à une plateforme Level One, par le biais d'une relation avec un DFSP. Les règles du schéma préciseront comment ces IMF peuvent interagir avec la plateforme. |
| Opérateur de réseau mobile (ORM) | Une entreprise qui vend des services de téléphonie mobile, y compris les communications vocales et de données. |
| Opérateur de transfert d'argent | Un fournisseur spécialisé de services financiers numériques qui gère les transferts de fonds nationaux et/ou internationaux. |
| MSISDN | Numéro identifiant de manière unique un abonnement dans un réseau de téléphonie mobile. Ces numéros utilisent la norme E.164 qui définit le plan de numérotation pour un réseau téléphonique public commuté (RTPC) mondial. |
| Règlement net multilatéral | Un type de règlement qui gère les positions d'un groupe de participants dans un schéma. |
| Document d'identité national | Un justificatif qui identifie un utilisateur final. Les documents d'identité nationaux sont délivrés par les gouvernements nationaux. |
| Communication en champ proche | Une technologie de communication utilisée dans les paiements pour transmettre des données de paiement d'un téléphone mobile équipé NFC à un terminal compatible. |
| Plafond de débit net | Une valeur que la plateforme utilise pour déterminer si un DFSP payeur peut envoyer une demande de transfert, comme défini dans les règles opérationnelles du schéma. |
| Marge du plafond de débit net | Une valeur fixée par un schéma qui augmente ou diminue le plafond de débit net d'un participant. |
| Position nette | Une valeur dans le grand livre d'un participant au schéma, reflétant le solde net des obligations dues. |
| Règlement net | Un type de règlement qui compense la position d'un participant dans un schéma, reflétant à la fois les obligations dues à et par d'autres participants ou le schéma. |
| Non-banque | Une entité qui n'est pas une banque agréée, mais qui fournit des services financiers aux utilisateurs finaux. Les exigences pour que les non-banques fassent cela, et les limitations de ce qu'elles peuvent faire, sont spécifiées par la législation nationale. |
| Modèle piloté par les non-banques | Une référence à un système dans lequel les non-banques sont les fournisseurs de services financiers numériques aux utilisateurs finaux. Les non-banques doivent généralement répondre à des critères établis par la législation nationale et appliqués par les régulateurs. |
| Non-répudiation | Capacité de prouver l'authenticité d'une transaction, par exemple en validant une signature numérique. |
| Sans perte | Un modèle de recouvrement des coûts avec un ensemble supplémentaire de fonds disponibles pour couvrir les besoins d'investissement pour exploiter la plateforme. |
| Notification | Avis à un payeur ou un bénéficiaire concernant l'état du transfert. |
| Paiements off-us | Paiements effectués dans un système ou schéma à participants multiples, où le fournisseur du payeur est une entité différente de celle du fournisseur du bénéficiaire. |
| Paiements on-us | Paiements effectués dans un système ou schéma à participants multiples, où le fournisseur du payeur est la même entité que le fournisseur du bénéficiaire. |
| Achat en ligne | Un cas d'utilisation secondaire P2B. |
| Spécification Open API | La spécification Open API for FSP Interoperability. |
| Boucle ouverte | Un système ou schéma de paiement conçu pour que plusieurs fournisseurs y participent. Les règles du système de paiement ou la législation nationale peuvent restreindre la participation à certaines catégories de fournisseurs. |
| Règles opérationnelles | Règles rédigées par un schéma qui lient les participants au schéma. Parfois appelées « règles commerciales ». |
| Gestion des risques opérationnels | Outils pour gérer les risques des fournisseurs dans l'exploitation d'un système de services financiers numériques. |
| Opérateur | Une entité qui fournit et/ou gère la plateforme d'un système de paiement. |
| Organisation | Une entité telle qu'une entreprise, une œuvre de bienfaisance ou un département gouvernemental qui utilise la monnaie mobile comme service ; par exemple, recevoir des paiements de factures, effectuer des paiements de factures et verser des salaires. |
| OTP | Code à usage unique. L'OTP est un identifiant qui, par définition, ne peut être utilisé qu'une seule fois. Il est généré puis validé par le même FSP pour une approbation automatique. L'OTP est généralement lié à un payeur spécifique dans un paiement. L'OTP généré est généralement un nombre entre 4 et 6 chiffres. |
| Services au guichet | Services fournis par des agents lorsqu'une partie finale n'a pas de compte de monnaie électronique : le payeur (distant) peut payer la monnaie électronique sur le compte de l'agent, qui paie ensuite en espèces au bénéficiaire ne disposant pas de compte. |
| P2P | Un cas d'utilisation défini dans le document des spécifications API. |
| Participant | Un fournisseur qui est membre d'un schéma de paiement et soumis aux règles de ce schéma. |
| Marge discrétionnaire du participant sur le plafond de débit net | Une valeur fixée par un participant qui diminue son plafond de débit net. |
| Accord de participation | Un accord conclu entre chaque participant et un schéma. |
| Frais de participation | Frais pour la participation à un schéma de paiement (parfois appelés frais d'adhésion). |
| Requête Parties | Un appel API au service de répertoire du schéma par lequel un DFSP payeur demande l'identifiant du DFSP auprès duquel un identifiant de bénéficiaire est enregistré. |
| Réponse à la requête Parties | La réponse du service de répertoire du schéma à une requête Parties. |
| Banque partenaire | Institution financière soutenant le FSP et lui donnant accès à l'écosystème bancaire local. |
| Partie | Une entité qui utilise les services du schéma directement ou indirectement. |
| Identifiant de partie | Un élément d'information qui identifie de manière unique un client dans une mise en œuvre d'interopérabilité. |
| Type d'identifiant de partie | Une énumération qui distingue les différents types d'identifiants de partie. La gamme complète des types d'identifiants de partie est donnée dans la spécification Open API ; le sous-ensemble des types d'identifiants de partie pris en charge par un schéma donné est indiqué dans ses règles opérationnelles. |
| Bénéficiaire | Le destinataire de fonds électroniques dans une transaction de paiement. |
| DFSP bénéficiaire | Le rôle d'un participant qui reçoit un transfert au nom de son client bénéficiaire. |
| Payeur | Le payeur de fonds électroniques dans une transaction de paiement. |
| DFSP payeur | Le participant qui envoie un transfert. |
| Paiement | Un échange de fonds, d'identifiants et d'autres informations nécessaires pour compléter une obligation entre les utilisateurs finaux. Un transfert est un paiement. |
| Dispositif de paiement | Le dispositif de paiement est la notion abstraite d'un appareil électronique, autre que le propre appareil du payeur, capable de permettre à un payeur d'accepter une transaction via l'utilisation d'un identifiant (une sorte d'OTP). Des exemples de dispositifs (de paiement) sont les GAB et les TPV. |
| Système de paiement | Un terme large pour décrire le système global, y compris le schéma, les services du schéma et les participants au schéma. |
| Opérateur de système de paiement | L'entité qui exploite un système ou schéma de paiement. |
| Prestataire de services de paiement (PSP) | Un terme utilisé de deux manières : généralement, pour toute entreprise impliquée dans la fourniture de services de paiement (y compris les DFSP) ; ou pour un fournisseur qui offre des produits ou services de marque aux utilisateurs finaux, y compris les commerçants. Les PSP peuvent se connecter directement à une plateforme Level One, par le biais d'une relation avec un DFSP. Les règles du schéma préciseront comment les PSP peuvent interagir avec la plateforme. |
| Informations personnelles | Informations relatives à toute personne individuelle, y compris les clients ou les employés du schéma ou d'un participant, à partir desquelles l'individu peut être identifié ou reconnu, quelle que soit la forme de ces informations. |
| Plateforme | L'ensemble des capacités opérationnelles, incluant souvent un commutateur, qui mettent en œuvre l'échange de paiements dans un système de paiement interopérable aligné sur Level One. |
| Plateforme | Un terme utilisé pour décrire le logiciel ou le service utilisé par un fournisseur, un schéma ou un commutateur pour gérer les comptes des utilisateurs finaux et envoyer et recevoir des transactions de paiement. |
| Compte de règlement mutualisé | Un compte bancaire à la banque, détenu conjointement par les participants au schéma. |
| Grand livre de position | Un grand livre tenu par la plateforme qui enregistre les écritures de règlement provisoires et définitives pour un participant dans une devise donnée. |
| Comptabilisation | L'acte du fournisseur d'enregistrer une écriture de débit ou de crédit dans le relevé de compte de l'utilisateur final. |
| Frais de traitement | Frais facturés par le schéma aux participants pour le traitement effectué par la plateforme du schéma. |
| Processeur | Une entreprise qui gère, sur une base externalisée, diverses fonctions pour un DFSP. Ces fonctions peuvent inclure la gestion des transactions, la gestion de la base de données clients et la gestion des risques. Les processeurs peuvent également effectuer des fonctions pour le compte de systèmes de paiement, de schémas ou de commutateurs. Les processeurs peuvent se connecter directement à une plateforme Level One, agissant au nom d'un DFSP. Les règles du schéma préciseront comment les processeurs peuvent interagir avec la plateforme. |
| Débit provisoire | Un enregistrement dans le grand livre de position du schéma d'une demande de transfert qui n'a pas été exécutée ; enregistré uniquement dans le grand livre de position du DFSP payeur. |
| PSP | Prestataire de services de paiement. |
| Paiement par tirage | Un type de transaction initiée par le DFSP du bénéficiaire. Les prélèvements automatiques, les chèques et les paiements par carte sont tous des paiements par tirage. Les paiements par tirage peuvent être rejetés ou échouer pour insuffisance de fonds sauf si une autorisation séparée est effectuée (par ex. cartes). |
| Paiement par poussée | Un type de transaction initié par le DFSP payeur. Ceci est parfois appelé un virement. |
| Achat par code QR | Un cas d'utilisation secondaire P2B. |
| Code QR (Quick-Response) | Une méthode d'encodage et de visualisation de données sous forme lisible par machine. Il existe de multiples modèles de QR. |
| Devis | Un processus par lequel un DFSP bénéficiaire reconnaît la validité du compte du bénéficiaire pour accepter un transfert, et définit les termes (et éventuellement les frais) liés à ce transfert. |
| Demande de devis | Une demande par un DFSP payeur de données relatives à un transfert proposé. |
| Réponse au devis | La réponse d'un DFSP bénéficiaire à une demande de devis. |
| Règlement brut en temps réel (RTGS) | Un modèle de règlement qui règle les transferts sur une base individuelle, plutôt que nette. |
| Paiements de détail en temps réel (RTRP) | Paiements de détail qui sont traités en temps réel (au moment de l'initiation). |
| Montant reçu | Le montant qui est crédité sur le compte de transaction du bénéficiaire. |
| Rapprochement | Le rapprochement inter-FSP est le processus consistant à s'assurer que deux ensembles d'enregistrements, généralement les soldes de deux comptes, sont en accord entre les FSP. Le rapprochement est utilisé pour s'assurer que l'argent quittant un compte correspond à l'argent réellement transféré. Cela se fait en s'assurant que les soldes correspondent à la fin d'une période comptable particulière. |
| Recours | Droits accordés à un utilisateur final par la loi, les règles opérationnelles privées ou des accords spécifiques entre fournisseurs, permettant aux utilisateurs finaux de faire certaines choses (parfois révoquer une transaction) dans certaines circonstances. |
| Remboursement | Un transfert qui annule une transaction précédente. |
| Régulateur | Une organisation gouvernementale investie du pouvoir par la législation nationale de fixer et d'appliquer des normes et des pratiques. Les banques centrales, les départements des finances et du trésor, les régulateurs des télécommunications et les autorités de protection des consommateurs sont tous des régulateurs impliqués dans les services financiers numériques. |
| Demande de devis | Un appel API qui initie une transaction par laquelle le DFSP payeur demande au DFSP bénéficiaire des informations concernant un transfert proposé. |
| Demande de transfert | Un message qui est transmis d'un DFSP payeur via la plateforme à un DFSP bénéficiaire, qui demande qu'un transfert soit effectué du payeur au bénéficiaire. |
| Demande de paiement | Un message par lequel un bénéficiaire « demande » un paiement à un payeur. Une demande de paiement dans un système Level One est souvent utilisée pour décrire un commerçant qui demande un paiement par poussée à un utilisateur final. |
| Réservation | Partie d'une opération de transfert en deux phases dans laquelle les fonds à transférer sont bloqués (les fonds ne peuvent être utilisés à aucune fin jusqu'à ce qu'ils soient annulés ou engagés). Cela est généralement fait pour une durée prédéterminée, dont l'expiration entraîne l'annulation de la réservation. |
| Paiement de détail | Un paiement ou un transfert entre utilisateurs finaux, généralement de faible valeur. Le terme est souvent utilisé pour décrire les paiements P2P, B2P ou P2B. |
| Annulation | Le processus d'annulation d'un transfert terminé. |
| Gestion des risques | Les pratiques que les entreprises mettent en œuvre pour comprendre, détecter, prévenir et gérer divers types de risques. La gestion des risques se fait chez les fournisseurs, dans les systèmes et schémas de paiement, chez les processeurs et chez de nombreux commerçants ou accepteurs de paiements. |
| Approche fondée sur les risques | Une approche réglementaire et/ou de gestion commerciale qui crée différents niveaux d'obligation en fonction du risque de la transaction ou du client sous-jacent. |
| Annulation | L'annulation signifie que les fonds électroniques qui étaient précédemment réservés sont remis dans leur état d'origine. La transaction financière est annulée. Les fonds électroniques ne sont plus bloqués pour utilisation. |
| Règles | Les pratiques et normes nécessaires au fonctionnement des services de paiement définies par le schéma. Les règles sont parfois appelées règles du schéma, règles commerciales ou règles opérationnelles. |
| Modification des règles | Tous les changements, ajouts, suppressions ou autres modifications des règles opérationnelles du schéma ou de tout document associé. |
| Épargne et investissement | Conserver des fonds pour les besoins futurs et le rendement financier. |
| Produits d'épargne | Un compte chez un fournisseur bancaire ou non bancaire, qui stocke des fonds dans le but d'aider les utilisateurs finaux à économiser de l'argent. |
| Schéma | Un ensemble de règles, pratiques et normes nécessaires au fonctionnement des services de paiement. |
| Cas d'utilisation secondaire | Un sous-ensemble d'un cas d'utilisation. Des règles commerciales ou des directives opérationnelles spécifiques peuvent s'appliquer aux cas d'utilisation secondaires. |
| Élément sécurisé | Une puce sécurisée sur un téléphone qui peut être utilisée pour stocker des données de paiement. |
| Code d'accès de sécurité | Un numéro d'identification personnel (PIN), un mot de passe/mot de passe à usage unique (OTP), une reconnaissance biométrique, un code ou tout autre dispositif fournissant un moyen d'accès certifié au compte d'un client aux fins, entre autres, d'initier un transfert électronique de fonds. |
| Incident de sécurité | (i) Accès non autorisé ou divulgation d'informations personnelles ou de données de transaction relatives aux clients éligibles pour initier ou recevoir des transferts via le schéma qui s'est produit ou dont on soupçonne raisonnablement qu'il s'est produit ; ou (ii) une violation confirmée des réseaux ou systèmes d'un participant ou des réseaux ou systèmes de son fournisseur qui expose des informations personnelles ou des données de transaction relatives au schéma qui s'est produite ou dont on s'attend raisonnablement à ce qu'elle se soit produite. |
| Montant envoyé | Le montant qu'un payeur autorise à être débité de son compte de transaction. |
| Données sensibles du consommateur | Les données sensibles du consommateur désignent toute ou toutes les informations utilisées par un consommateur pour authentifier son identité et obtenir l'autorisation d'effectuer des services bancaires mobiles, y compris mais sans s'y limiter, l'identifiant utilisateur, le mot de passe, le PIN mobile, le PIN de transaction. Comprend également les données relatives aux croyances religieuses ou autres, à l'orientation sexuelle, à la santé, à la race, à l'origine ethnique, aux opinions politiques, à l'appartenance syndicale, au casier judiciaire. |
| Services | Éléments de la plateforme du schéma qui fournissent des capacités d'interopérabilité aux participants du schéma. |
| Règlement | Un processus par lequel les participants règlent leurs obligations les uns envers les autres et envers le schéma liées à l'échange de transactions tel qu'énoncé dans les directives opérationnelles de règlement. |
| Banque de règlement | Une banque désignée par le schéma pour être partenaire dans la gestion du règlement et dans laquelle chaque participant doit avoir un compte bancaire aux fins du règlement. |
| Compte bancaire de règlement | Le compte bancaire détenu par un participant auprès de la banque de règlement ou auprès d'une banque convenue avec la banque de règlement, qui est utilisé pour le règlement entre le schéma et le participant. |
| Instruction de règlement | Désigne une instruction donnée à un système de règlement par un participant au système de règlement ou par un opérateur de système de compensation de paiement au nom d'un participant au système de règlement de la banque centrale pour effectuer le règlement d'une ou plusieurs obligations de paiement, ou pour acquitter toute autre obligation d'un participant au système envers un autre participant au système. |
| Obligation de règlement | Désigne une dette due par un participant au système de règlement à un autre à la suite d'une ou plusieurs instructions de règlement. |
| Fenêtre de règlement | Une période de temps entre deux règlements nets successifs tels que planifiés conformément aux directives opérationnelles de règlement. |
| Service partagé | Un ensemble commun de services que les DFSP participants collaborent pour développer et/ou utiliser. |
| Smartphone | Un appareil qui combine un téléphone mobile avec un ordinateur. |
| Banques à charte spéciale | Banques dans un pays qui sont autorisées à effectuer un ensemble limité de fonctions, tel que déterminé par la réglementation. Les banques à charte spéciale qui ne peuvent qu'accepter des dépôts et gérer des paiements sont considérées comme des DFSP dans un système Level One. |
| Sponsor | Un arrangement entre un émetteur de monnaie électronique et une banque, utilisé pour le paiement et la collecte des frais d'interchange par les émetteurs de monnaie électronique. |
| Organisme de normalisation | Une organisation qui crée des normes utilisées par les fournisseurs, les schémas de paiement et les systèmes de paiement. |
| Compte de valeur stockée | Compte dans lequel les fonds sont conservés dans un format électronique sécurisé. Peut être un compte bancaire ou un compte de monnaie électronique. |
| Rapport de transaction suspecte | Si une institution financière remarque quelque chose de suspect dans une transaction ou une activité, elle peut déposer un rapport auprès de la cellule de renseignement financier qui l'analysera et le recoupera avec d'autres informations. Les informations dans un RTS varient selon la juridiction. |
| Commutateur | Une entité de traitement dans un système de paiement qui achemine une transaction d'un DFSP à un autre DFSP. Un système peut exploiter son propre commutateur, ou cette fonction peut être effectuée par un ou plusieurs tiers. |
| Système | Un terme utilisé pour décrire le schéma, les services, la plateforme et les participants alignés sur un Level One Project. |
| Risque systémique | Dans les systèmes de paiement, le risque d'effondrement d'un système financier entier ou d'un marché entier, par opposition au risque associé à un fournisseur individuel ou un utilisateur final individuel. |
| Le Level One Project | Une initiative de la Fondation Bill & Melinda Gates, au sein du programme Services financiers pour les pauvres, qui travaille à soutenir les pays ou régions construisant des systèmes de services financiers numériques interopérables et à faible coût pour intégrer les personnes et les commerçants à faible revenu dans l'économie formelle. |
| Accès par paliers | Une disposition établie dans les règles du schéma qui permet à un DFSP de participer au système sous le parrainage d'un autre DFSP. |
| Achat par numéro de caisse | Un cas d'utilisation secondaire P2B. |
| Transaction | Un ensemble d'appels API connexes qui sont échangés entre les participants via le schéma, y compris un transfert. |
| Compte de transaction | Un compte bancaire ou un portefeuille offert à un client par un DFSP. |
| Titulaire du compte de transaction | Le client d'un DFSP qui détient le compte de transaction fourni par ce DFSP. |
| Type de titulaire du compte de transaction | Une désignation utilisée pour définir si le titulaire du compte de transaction est un consommateur, une entreprise, une agence gouvernementale ou une agence à but non lucratif. |
| Type de compte de transaction | Une désignation utilisée pour définir un compte de transaction comme étant soit un compte bancaire, soit un portefeuille de monnaie électronique. |
| Coût de transaction | Le coût pour un fournisseur de services financiers numériques de fournir un service financier numérique. Cela pourrait être pour un ensemble de services (par exemple, un « portefeuille ») ou pour des transactions individuelles. |
| Frais de transaction | Frais pour le traitement des transactions interopérables fixés par un schéma. |
| Transfert | Terme générique pour décrire toute transaction financière où de la valeur est transférée d'un compte à un autre. |
| Montant du transfert | Le montant que le DFSP payeur transfère à un DFSP bénéficiaire en utilisant le schéma. |
| Demande de transfert | Une demande par un DFSP payeur d'effectuer un transfert. |
| Réponse au transfert | La réponse d'un DFSP bénéficiaire à une demande de transfert. |
| Compte de fiducie | Un moyen de détenir des fonds au profit d'une autre partie. Les émetteurs de monnaie électronique sont généralement tenus par la loi de détenir la valeur des comptes de monnaie électronique des utilisateurs finaux dans une banque, généralement dans un compte de fiducie. Cela accomplit les objectifs d'isolation et de protection des fonds. |
| Ubiquité | Un terme utilisé pour décrire la capacité de payer n'importe qui et d'être payé par n'importe qui. |
| Non bancarisé | Les personnes non bancarisées n'ont pas de compte de transaction. Les personnes sous-bancarisées peuvent avoir un compte de transaction mais ne l'utilisent pas activement. Sous-desservi est un terme large désignant les personnes qui sont les cibles des initiatives d'inclusion financière. Il est également parfois utilisé pour désigner une personne qui a un compte de transaction mais ne dispose pas de services supplémentaires de services financiers numériques. |
| Pertes non couvertes | Obligations de règlement qui ne sont pas satisfaites par le DFSP responsable et ne sont pas acquittées par le biais de garanties ou d'autres mécanismes. |
| Cas d'utilisation | Un terme utilisé pour décrire l'objet du paiement. Des règles commerciales ou des directives opérationnelles spécifiques peuvent s'appliquer aux cas d'utilisation. |
| Identifiant utilisateur | Un identifiant unique d'un utilisateur. Il peut s'agir d'un MSISDN, d'un compte bancaire, d'une forme d'identifiant fourni par le DFSP, d'une identité nationale, etc. Dans une transaction, l'argent est généralement adressé à un identifiant utilisateur et non directement à un identifiant de compte. |
| USSD | Une technologie de communication utilisée pour envoyer du texte entre un téléphone mobile et un programme d'application dans le réseau. |
| Services à valeur ajoutée | Services ou produits fournis aux utilisateurs finaux que les utilisateurs finaux paieront pour utiliser ou accéder, souvent utilisés en coordination avec les adjacences. |
| Bon | Un instrument de valeur monétaire couramment utilisé pour transférer des fonds à des clients (bénéficiaires) qui n'ont pas de compte auprès du FSP du payeur. Cela pourrait être des bénéficiaires sans compte ou ayant un compte auprès d'un autre FSP. |
| Portefeuille | Un compte de transaction offert aux clients par les émetteurs de monnaie électronique. |
| Portefeuille à banque | Un cas d'utilisation secondaire P2P. |
| Portefeuille à portefeuille | Un cas d'utilisation secondaire P2P. |
| Liste blanche | Une liste ou un registre d'entités (utilisateurs enregistrés) auxquelles un privilège, un service, une mobilité, un accès ou une reconnaissance particulière est accordé, en particulier celles qui étaient initialement sur liste noire. |
| Autonomisation économique des femmes (WEE) : | Augmenter l'accès et les droits des femmes aux ressources économiques par des opportunités de travail décent, la propriété et les actifs, l'inclusion financière et les plateformes. |
