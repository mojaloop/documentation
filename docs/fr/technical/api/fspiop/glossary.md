---
footerCopyright: Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) | Ericsson, Huawei, Mahindra-Comviva, Telepin, et la Fondation Bill & Melinda Gates
---

# Glossaire

## Préface

Cette section fournit des informations sur la façon d'utiliser ce document.

### Conventions utilisées dans ce document

Les conventions suivantes sont utilisées dans ce document pour identifier les types d'informations spécifiés.

| **Type d’Information** | **Convention** | **Exemple** |
| :--- | :--- | :--- |
| **Éléments de l'API tels que les ressources** | Gras | **/authorization** |
| **Variables** | Italique entre accolades | _{ID}_ |
| **Glossaire** | Italique à la première occurrence ; défini dans le _Glossaire_ | Le but de l’API est de permettre des transactions financières interopérables entre un _Payeur_ (un payeur de fonds électroniques dans une transaction de paiement) situé dans un _FSP_ (une entité qui fournit un service financier numérique à un utilisateur final) et un _Bénéficiaire_ (un bénéficiaire de fonds électroniques dans une transaction de paiement) situé dans un autre FSP. |
| **Documents de référence** | Italique | Les informations utilisateur ne doivent, en général, pas être utilisées par les déploiements d’API ; les mesures de sécurité détaillées dans _Signature de l'API_ et _Chiffrement de l'API_ doivent être utilisées à la place.|

### Informations sur la version du document

| **Version** | **Date** | **Description des modifications** |
| :--- | :--- | :--- |
| **1.0** | 2018-03-13 | Version initiale |

<br />

## Introduction

Ce document fournit le glossaire pour la spécification Open API pour l’interopérabilité FSP. Les termes ont été compilés à partir de trois sources :

- ITU-T Digital Financial Services Focus Group Glossary (ITU-T)<sup>[ITU-T Digital Financial Services Focus Group Glossary (ITU-T)](https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-ECOPO-2018-PDF-E.pdf)</sup>,
- Retours des fournisseurs de services technologiques (TSP) dans les groupes de travail Product Development Partnership (PDP), et
- Retours de l’équipe L1P IST Reference Implementation (RI).

Les informations sont partagées conformément à la licence Creative Commons<sup>[LICENSE](https://github.com/mojaloop/mojaloop-specification/blob/master/LICENSE.md)</sup>.


### Open API pour la spécification d’interopérabilité FSP

L’Open API pour la spécification d’interopérabilité FSP comprend les documents suivants.

#### Documents logiques

- [Modèle de données logique](./logical-data-model)

- [Modèles de transactions génériques](./generic-transaction-patterns)

- [Cas d'utilisation](./use-cases)

#### Documents de liaison REST asynchrone

- [Définition de l'API](./api-definition)

- [Règles de liaison JSON](./json-binding-rules)

- [Règles du système](./scheme-rules)

#### Intégrité des données, confidentialité et non-répudiation

- [Bonnes pratiques PKI](./pki-best-practices)

- [Signature](./v1.1/signature)

- [Chiffrement](./v1.1/encryption)

#### Documents généraux

- [Glossary](#)

<br />


## Glossaire de l’API

| **Terme** | **Termes alternatifs et connexes** | **Définition** | **Source** |
| --- | --- | --- | --- |
| **Access Channel** | POS ("Point of Sale"), Customer Access Point, ATM, Branch, MFS Access Point | Lieux ou moyens utilisés pour initier ou recevoir un paiement. Les canaux d'accès peuvent inclure les agences bancaires, les distributeurs automatiques (ATM), terminaux POS, points d’agents, téléphones portables et ordinateurs. | ITU-T |
| **Account ID** | | Identifiant unique assigné par le FSP ayant créé le compte. | PDP |
| **Account Lookup System** | | Entité abstraite utilisée pour retrouver dans quel FSP un compte, un wallet, ou une identité est hébergé. Peut être hébergée sur son propre serveur, au sein d’un financial switch ou chez divers FSPs. | PDP |
| **Active User** | | Terme utilisé par plusieurs fournisseurs pour décrire combien de détenteurs de compte utilisent fréquemment leur service. | 
| **Agent** | Agent Till, Agent Outlet | Entité autorisée par le fournisseur pour gérer diverses fonctions comme l’enrôlement client, le cash-in et le cash-out à l’aide d’un _agent till_. | ITU-T |
| **Agent Outlet** | Access Point | Emplacement physique accueillant un ou plusieurs _agent tills_, permettant de réaliser des opérations d’enrôlement, cash-in et cash-out pour des clients au nom d’un ou plusieurs fournisseurs. Le droit d’exclusivité peut dépendre de la loi nationale. Un _agent outlet_ peut exercer d’autres activités. | ITU-T |
| **Agent Till** | Registered Agent | Un _agent till_ est une ligne enregistrée délivrée par un fournisseur (carte SIM spéciale ou terminal POS), utilisée pour les opérations d’enrôlement, cash-in et cash-out. La loi nationale définit quels fournisseurs de services financiers peuvent en émettre. | ITU-T |
| **Aggregator** | Merchant Aggregator | Fournisseur spécialisé de services aux marchands, gérant généralement les transactions pour de nombreux petits commerçants. Les règles du système peuvent limiter leur champ d’action. | ITU-T |
| **Anti-Money Laundering** | AML ; aussi "Combating the Financing of Terrorism", ou CFT | Initiatives visant à détecter et arrêter l’utilisation des systèmes financiers pour dissimuler des fonds obtenus illégalement. | ITU-T |
| **API** | Application Programming Interface | Ensemble de méthodes clairement définies pour permettre l’interaction et l’échange de données entre différents programmes logiciels. |PDP |
| **Arbitration** | | Recours à un arbitre (et non au tribunal) pour résoudre des litiges. | ITU-T |
| **Authentication** | Verification, Validation | Processus permettant de s’assurer qu’une personne ou une transaction est valide pour le processus effectué (ouverture de compte, initiation de transaction, etc) | ITU-T |
| **Authorization** | | Processus utilisé lors d’un paiement tiré (« pull payment », tel un paiement par carte), dans lequel le bénéficiaire demande (par l’intermédiaire de son fournisseur) à la banque du payeur de confirmer la validité de la transaction. | ITU-T |
| **Authorized /institution entity** | | Institution non financière autorisée par la Banque d’État ou autres autorités de régulation à fournir des services financiers mobiles. | PDP |
| **Automated Clearing House** | ACH | Système électronique d’échanges d’ordres de paiement entre fournisseurs de services de paiement, via médias magnétiques ou réseaux de télécommunications, puis compensation entre participants. | ITU-T |
| **Bank** | Savings Bank, Credit Union, Payments Bank | Système financier agréé dans un pays, capable d’accepter des dépôts et d’effectuer des paiements sur les comptes des clients. | ITU-T |
| **Bank Accounts and Transaction Services** | Mobile Banking, Remote Banking, Digital Banking| Compte de transactions détenu auprès d’une banque, parfois accessible par téléphone mobile (mobile banking). | ITU-T |
| **Bank-Led Model** | Bank-Centric Model| Système où les banques sont les principaux fournisseurs de services financiers numériques à l’utilisateur final. | ITU-T |
| **Basic Phone** | | Appareil minimal requis pour l’utilisation des services financiers numériques. | PDP |
| **Bill Payment** | C2B, Utility Payments, School Payments | Réalisation d’un paiement pour un service récurrent, en personne ou à distance. | ITU-T |
| **Biometric Authentication** | | Utilisation d’une caractéristique physique d'une personne (empreinte digitale, iris...) pour l’authentifier. | ITU-T |
| **Biometric Authentication** | | Tout processus validant l’identité d’un utilisateur souhaitant accéder à un système par mesure d’une caractéristique intrinsèque. | ITU-T |
| **Blacklist** | | Registre d’entités (utilisateurs enregistrés) refusés/désactivés d’un privilège, service, accès… N’ayant pas droit d’accès/usage/prise en compte. Cette pratique permet d’identifier explicitement les utilisateurs à refuser. | PDP |
| **Blockchain** | Digital Currency, Cryptocurrency, Distributed Ledger Technology | Technologie sous-jacente à Bitcoin et autres crypto-monnaies : un registre numérique partagé, mis à jour en continu. | ITU-T |
| **Borrowing** | | Emprunter de l’argent pour un besoin à court ou long terme. | ITU-T |
| **Bulk Payments** | G2C, B2C, G2P, Social Transfers| Versements de masse gouvernement-consommateur : allocations, transferts, salaires, pensions… | ITU-T |
| **Bulk Payment Services** | | Service permettant à une agence gouvernementale ou entreprise d’effectuer des paiements à un grand nombre de bénéficiaires. | ITU-T |
| **Bulk upload service** | | Service permettant l’import de multiples transactions par session, souvent via transfert de fichier bulk pour initialiser des paiements (ex: fichier de paie). | ITU-T |
| **Bundling** | Packaging, Tying | Modèle dans lequel un fournisseur regroupe des services en un seul produit que l’utilisateur final accepte d’acheter ou d’utiliser. | ITU-T |
| **Business** | | Entité (ex : société anonyme, SARL, etc) utilisant le mobile money pour effectuer / recevoir des paiements, verser les salaires… | PDP |
| **Cash Management** | Agent Liquidity Management | Gestion des soldes de liquidité chez un agent. | ITU-T |
| **Cash-In** | CICO (Cash-In Cash-Out) | Crédit d’eMoney en échange d’argent liquide, typiquement chez un agent. | ITU-T |
| **Cash-Out** | CICO (Cash-In Cash-Out) | Remise d’argent physique en échange d’un débit sur compte eMoney, typiquement chez un agent. | ITU-T |
| **Certificate Signing Request** | CSR | Message envoyé d’un demandeur à une Autorité de Certification pour demander un certificat d’identité numérique. | |
| **Chip Card** | EMV Chip Card, Contactless Chip Card | Carte à puce comportant un microprocesseur, pouvant être sans contact ou à contact (insérée en terminal). | ITU-T |
| **Clearing** | | Processus de transmission, rapprochement et confirmation des transactions avant leur règlement. Inclut parfois le netting et la création des positions finales. | RI |
| **Clearing House** | | Emplacement ou mécanisme central où les institutions financières échangent instructions de paiement ou d’autres obligations, avant règlement selon les règles et procédures du clearinghouse. | ITU-T |
| **Client Authentication** | TLS | Certificat utilisé pour authentifier un client durant un handshake SSL ; celuici permet de vérifier que le client est bien celui revendiqué (Source: Techopedia). | |
| **Closed-Loop** | | Système de paiement utilisé par un fournisseur unique ou un groupe fermé de fournisseurs. | ITU-T |
| **Combatting Terrorist Financing** | | Initiatives visant à détecter et à empêcher l’utilisation des systèmes financiers pour transférer des fonds à des organisations ou personnes terroristes. | ITU-T |
| **Commission** | | Paiement incitatif effectué, typiquement à un agent ou autre intermédiaire agissant pour le compte d’un fournisseur DFS. Offre une incitation à l’agent. | ITU-T |
| **Commit** | | Partie d’une opération de transfert en deux phases au cours de laquelle les fonds réservés pour le transfert sont libérés au bénéficiaire ; le transfert est achevé entre les comptes du payeur d’origine et du bénéficiaire. | PDP |
| **Condition** | | Dans le protocole Interledger, verrou cryptographique utilisé lorsqu’un transfert est réservé. Prend généralement la forme d’un hachage SHA-256 d’une image secrète (preimage). Lorsqu’elle est fournie dans une demande de transfert, le transfert doit être réservé de sorte qu’il ne soit validé (commit) que si la condition est remplie (la preimage secrète est fournie). | PDP |
| **Counterparty** | Payee, Payer, Borrower, Lender | L’autre partie d’un paiement ou d’une opération de crédit. Un bénéficiaire est la contrepartie d’un payeur, et inversement. | ITU-T |
| **Coupon** | | Jeton donnant droit à une remise ou échangeable contre des biens ou services. | PDP |
| **Credit History** | Credit Bureaus, Credit Files | Ensemble d’enregistrements conservés pour un utilisateur final reflétant son utilisation du crédit, y compris emprunts et remboursements. | ITU-T |
| **Credit Risk Management** | | Outils pour gérer le risque qu’un emprunteur ou une contrepartie ne respecte pas ses obligations selon les conditions convenues. | ITU-T |
| **Credit Scoring** | | Processus créant un score numérique reflétant la solvabilité. | ITU-T |
| **Cross Border Trade Finance Services** | | Services permettant à une entreprise de vendre ou d’acheter à des entreprises ou particuliers d’autres pays ; peuvent inclure la gestion des transactions de paiement, le traitement des données et le financement. | ITU-T |
| **Cross-FX Transfer** | | Transfert impliquant plusieurs devises, incluant un calcul de change. | PDP |
| **Customer Database Management** | | Pratiques des fournisseurs pour gérer les données clients ; peuvent être prises en charge par la plateforme de paiement utilisée. | ITU-T |
| **Customer Financial Data** | Customer Financial Data | Ensemble d’informations financières du client, incluant soldes de compte, dépôts et données relatives aux transactions financières, etc. | PDP |
| **Data Controller** | Data Controller | Toute personne physique ou morale, autorité publique, agence ou autre organisme qui, seul ou conjointement avec d’autres, détermine les finalités et les moyens du traitement des données personnelles. Le responsable du traitement est également chargé de fournir une infrastructure sécurisée pour les données. | PDP |
| **Data Portability** | Data Portability | Capacité d’une personne concernée à demander une copie des données personnelles traitées dans un format utilisable et à les transmettre électroniquement à un autre système de traitement. | PDP |
| **Data Protection** | PCI-DSS | Pratiques des entreprises pour protéger les données et identifiants des utilisateurs finaux. « PCI-DSS » est une norme de l’industrie des cartes à cet effet. | ITU-T |
| **Deposit Guarantee System** | Deposit Insurance | Fonds garantissant les dépôts des titulaires de compte auprès d’un fournisseur ; souvent une fonction gouvernementale pour les comptes bancaires. | ITU-T |
| **Diffie-Hellman solution** | | Mécanisme sécurisé d’échange d’une clé symétrique partagée entre deux pairs anonymes. | |
| **Digital Financial Services** | DFS, Mobile Financial Services | Les services financiers numériques comprennent des méthodes de stockage et de transfert électroniques de fonds, d’émission et de réception de paiements, d’emprunt, d’épargne, d’assurance et d’investissement, ainsi que de gestion des finances personnelles ou d’entreprise. | ITU-T |
| **Digital Liquidity** | | État dans lequel un consommateur accepte de laisser des fonds (eMoney ou dépôts bancaires) sous forme électronique plutôt que d’effectuer un cash-out. | ITU-T |
| **Digital Payment** | Mobile Payment, Electronic Funds Transfer | Terme large incluant tout paiement exécuté électroniquement, y compris les paiements initiés par téléphone mobile ou ordinateur. | ITU-T |
| **Dispute Resolution** | | Processus défini par un fournisseur ou par les règles d’un système de paiement pour résoudre les litiges entre utilisateurs finaux et fournisseurs, ou entre un utilisateur final et sa contrepartie. | ITU-T |
| **Electronic consent** | Electronic consent | Tout son, symbole ou processus qui est :<br>1. Lié à une technologie<ul>a. Ayant des capacités électriques, numériques, magnétiques, sans fil, optiques, électromagnétiques ou similaires, y compris (sans s’y limiter) téléphone mobile, télécopie et internet, et</ul><ul>b. Qui ne peut être accessible que par un code d’accès sécurisé, et</ul></br><br>2. Logiquement associé à un accord ou une autorisation juridiquement contraignants et exécuté ou adopté par une personne avec l’intention d’être liée par cet accord ou cette autorisation.</br> | PDP |
| **Electronic Invoicing, ERP, Digital Accounting, Supply Chain Solutions, Services, Business Intelligence** | | Services soutenant les fonctions marchandes ou d’entreprise liées aux services DFS. | ITU-T |
| **eMoney** |eFloat, Float, Mobile Money, Electronic Money, Prepaid Cards, Electronic Funds | Enregistrement de fonds ou de valeur disponible pour un consommateur, stocké sur un dispositif de paiement (puce, carte prépayée, téléphone mobile) ou dans des systèmes informatiques comme compte non traditionnel auprès d’une entité bancaire ou non bancaire. | ITU-T |
| **eMoney Accounts and Transaction Services** | Digital Wallet, Mobile Wallet, Mobile Money Account | Compte de transaction détenu auprès d’une entité non bancaire. La valeur de ce compte est appelée eMoney. | ITU-T |
| **eMoney Issuer** | Issuer, Provider | Fournisseur (banque ou non-banque) qui dépose de l’eMoney sur un compte ouvert pour un utilisateur final. L’eMoney peut être créé lorsque le fournisseur reçoit des espèces (cash-in) ou un paiement numérique d’un autre fournisseur. | ITU-T |
| **Encryption** |Decryption | Processus d’encodage d’un message pour qu’il ne puisse être lu que par l’expéditeur et le destinataire prévu. | ITU-T |
| **End User** |Consumer, Customer, Merchant, Biller | Client d’un fournisseur de services financiers numériques : consommateur, marchand, gouvernement ou autre forme d’entreprise. | ITU-T |
| **External Account** | | Compte hébergé en dehors du FSP, régulièrement accessible via une API d’interface de fournisseur externe. | PDP |
| **FATF** | | Le Groupe d’action financière (GAFI) est une organisation intergouvernementale visant à lutter contre le blanchiment d’argent et à agir sur le financement du terrorisme. | ITU-T |
| **Feature Phone** | | Téléphone mobile sans capacités informatiques significatives. | ITU-T |
| **Fees** | | Paiements facturés par un fournisseur à son utilisateur final (frais fixes, pourcentage ou mixte). Les systèmes ou systèmes de paiement, ainsi que les processeurs, facturent également des frais à leurs clients (typiquement le fournisseur). | ITU-T |
| **Financial Inclusion** | | Fourniture durable de services financiers numériques abordables intégrant les populations défavorisées dans l’économie formelle. | ITU-T |
| **Financial Literacy** | | Compétences financières essentielles des consommateurs et entreprises (budget familial, valeur temporelle de l’argent, utilisation d’un produit DFS, etc.). | ITU-T |
| **FinTech** | | Terme désignant les entreprises fournissant logiciels, services et produits pour les services financiers numériques ; souvent associé aux technologies récentes. | ITU-T |
| **Float** | | Terme pouvant signifier différentes choses. En banque, le float est créé lorsque le compte d’une partie est débité ou crédité à un moment différent de sa contrepartie. L’eMoney, obligation d’un fournisseur non bancaire, est parfois appelé float. | ITU-T |
| **Fraud** | Fraud Management, Fraud Detection, Fraud Prevention | Usage criminel des services financiers numériques pour retirer des fonds à une personne ou entreprise, ou lui nuire autrement. | ITU-T |
| **Fraud Risk Management** | | Outils pour gérer les risques des fournisseurs et parfois des utilisateurs (marchands, gouvernements) dans la fourniture et l’utilisation des services DFS. | ITU-T |
| **FSP** | Provider, Financial Service Provider (FSP), Payment Service Provider, Digital Financial Services Provider (DFSP) | Entité fournissant un service financier numérique à un utilisateur final. Dans un système en boucle fermée, l’opérateur du système de paiement est aussi le fournisseur. Dans un système en boucle ouverte, les fournisseurs sont les banques ou non-banques participant au système. | ITU-T |
| **FSP On-boarding** | | Processus d’ajout d’un nouveau FSP à ce réseau financier. | RI |
| **Fulfillment** | | Dans le protocole Interledger, secret qui est la preimage d’un hachage SHA-256, utilisé comme condition sur un transfert. La preimage est requise dans le message de commit pour déclencher le transfert. | PDP |
| **FX** | | Change (Foreign Exchange). | PDP |
| **Government Payments Acceptance Services** | | Services permettant aux gouvernements de percevoir taxes et redevances auprès des particuliers et entreprises. | ITU-T |
| **HCE** | | Host Card Emulation. Technologie permettant de stocker en toute sécurité des données de paiement sans utiliser l’élément sécurisé du téléphone. | ITU-T |
| **Identity** | National Identity, Financial Identity, Digital Identity | Justificatif identifiant un utilisateur final. Identités nationales émises par les gouvernements ; dans certains pays, identité financière émise par les fournisseurs de services financiers. | ITU-T |
| **Immediate Funds Transfer** | Real Time | Paiement numérique reçu par le bénéficiaire presque immédiatement après initiation par le payeur. | ITU-T |
| **Insurance Products** | | Produits permettant aux utilisateurs finaux d’assurer des actifs ou des vies. | ITU-T |
| **Insuring Lives or assets** | | Payer pour protéger la valeur d’une vie ou d’un actif. | ITU-T |
| **Interchange** | Swipe Fee, Merchant Discount Fee | Structure dans certains systèmes de paiement imposant à un fournisseur de payer des frais à un autre sur certaines transactions (typiquement cartes : du marchand vers la banque émettrice). | ITU-T |
| **Interledger** | | Protocole de transfert de valeur monétaire entre plusieurs réseaux de paiement déconnectés via une chorégraphie de transferts conditionnels sur chaque réseau. | PDP |
| **International Remittance** | P2P; Remote Cross-Border Transfer of Value, Cross-Border Remittance | Émission et réception de paiements vers une personne dans un autre pays. | ITU-T |
| **Interoperability** | Interconnectivity | Lorsque les systèmes de paiement sont interopérables, ils permettent l’interaction de plateformes ou produits propriétaires distincts. Résultat : échange de transactions entre fournisseurs (participation à un système ou accords bilatéraux/multilatéraux). Questions techniques et de règles métier à résoudre. | ITU-T |
| **Interoperability Service for Transfers (IST)** | Switch | Entité recevant des transactions d’un fournisseur et les routant vers un autre. Peut être détenue ou louée par un système ou des fournisseurs individuels ; peut se connecter à un système de règlement. | ITU-T |
| **Interoperability settlement bank** | | Entité facilitant l’échange de fonds entre FSP. Banque de règlement centrale dans toute transaction inter-FSP. | PDP |
| **Investment Products** | | Produits permettant aux utilisateurs finaux d’investir hors compte d’épargne. | ITU-T |
| **Irrevocable** | | Transaction ne pouvant pas être « rappelée » par le payeur ; une fois reçue par le bénéficiaire, elle ne peut être annulée par le payeur. | ITU-T |
| **JSON** | JavaScript Object Notation | Format léger d’échange de données, lisible par humains et machines, basé sur un sous-ensemble de JavaScript (ECMA-262). | |
| **Know Your Customer** | KYC, Agent and Customer Due Diligence, Tiered KYC, Zero Tier | Processus d’identification d’un nouveau client à l’ouverture de compte, conforme à la loi. Exigences réduites possibles pour comptes à faible valeur (KYC par paliers). | ITU-T |
| **Liability** | Agent Liability, Issuer Liability, Acquirer Liability | Obligation légale d’une partie envers une autre, imposée par la loi nationale, les règles du système ou des accords entre fournisseurs. | ITU-T |
| **Liquidity** | Agent Liquidity | Disponibilité d’actifs liquides pour honorer une obligation. Banques, non-banques et agents ont besoin de liquidité. | ITU-T |
| **Loans** | Microfinance, P2P Lending, Factoring, Cash Advances, Credit, Overdraft, Facility | Moyens par lesquels les utilisateurs finaux peuvent emprunter. | ITU-T |
| **M2C** | | Marchand vers client ou consommateur (Merchant to Customer or Consumer). | PDP |
| **mCommerce** | eCommerce | Achat ou vente à distance : par téléphone ou tablette (mCommerce) ou par ordinateur (eCommerce). | ITU-T |
| **Merchant** | Payments Acceptor | Entreprise vendant biens ou services et recevant des paiements. | ITU-T |
| **Merchant Acquisition** | Onboarding | Processus d’activation d’un marchand pour la réception de paiements électroniques. | ITU-T |
| **Merchant payment - POS** | C2B, Proximity Payments | Paiement pour un bien ou service en personne ; inclut bornes et distributeurs automatiques. | ITU-T |
| **Merchant payment - Remote** |C2b, eCommerce Payment, Mobile Payment | Paiement pour un bien ou service à distance (téléphone, ordinateur, etc.). | ITU-T |
| **Merchant Payments Acceptance Services** | Acquiring Services | Service permettant à un marchand d’accepter un ou plusieurs types de paiements électroniques. « Acquiring » est typique des systèmes cartes. | ITU-T |
| **Merchant Service Provider** | Acquirer | Fournisseur (banque ou non-banque) soutenant les marchands pour recevoir des paiements clients. « Acquirer » concerne l’acceptation cartes. |  ITU-T |
| **Mobile Network Operator** | MNO | Entreprise vendant services de téléphonie mobile (voix et données). | ITU-T |
| **Money Transfer Operator** | | Fournisseur DFS spécialisé dans les envois de fonds nationaux et/ou internationaux. | ITU-T |
| **MSISDN** | | Numéro identifiant de façon unique un abonnement dans un réseau mobile (norme E.164). | RI |
| **Mutual Authentication** | TLS | Authentification mutuelle : les deux parties s’authentifient simultanément (mode par défaut dans IKE, SSH ; optionnel dans TLS). | |
| **Near Field Communication** | NFC | Technologie de communication utilisée en paiement pour transmettre des données du téléphone NFC au terminal. | ITU-T |
| **Netting** | | Compensation des obligations entre participants du système de règlement, réduisant nombre et valeur des paiements nécessaires. | RI |
| **Non-Bank** | Payments Institution, Alternative Lender | Entité non bancaire fournissant des services financiers ; conditions et limites fixées par la loi nationale. | ITU-T |
| **Non-Bank-Led Model** | MNO-Led Model | Système où des non-banques sont les fournisseurs principaux de services financiers numériques aux utilisateurs finaux. | ITU-T |
| **Non-repudiation** | | Capacité à prouver l’authenticité d’une transaction (par ex. validation d’une signature numérique). | PDP |
| **Nostro Account** | | Du point de vue du payeur : fonds/comptes du FSP payeur détenus/hébergés chez le FSP bénéficiaire. | PDP |
| **Notification** | | Avis au payeur ou bénéficiaire concernant le statut d’un transfert. |PDP |
| **Off-Us Payments** | Off-Net Payments | Paiements dans un système multi-participants où le fournisseur du payeur diffère de celui du bénéficiaire. | ITU-T |
| **On-Us Payments** | On-Net Payments | Paiements où le fournisseur du payeur est le même que celui du bénéficiaire. | ITU-T |
| **Open-Loop** | | Système de paiement conçu pour la participation de multiples fournisseurs ; la loi ou les règles peuvent restreindre les classes de participants. | ITU-T |
| **Operations Risk Management** | | Outils pour gérer les risques opérationnels des fournisseurs d’un système DFS. | ITU-T |
| **Organization** | Business | Entité (entreprise, association, administration) utilisant le mobile money pour paiements et décaissements de salaires, etc. | PDP |
| **OTP** | One-Time Password | Justificatif utilisable une seule fois, généré puis validé par le même FSP pour approbation automatique ; souvent lié à un payeur précis. Généralement numérique de 4 à 6 chiffres. | PDP |
| **Over The Counter Services** | OTC, Mobile to Cash | Services d’agents lorsqu’une partie n’a pas de compte eMoney : le payeur distant peut créditer le compte agent qui verse des espèces au bénéficiaire sans compte. | ITU-T |
| **P2P** | Domestic Remittance, Remote Domestic Transfer of Value| Paiements entre personnes dans le même pays. | ITU-T |
| **Participant** | | Fournisseur membre d’un système de paiement, soumis à ses règles. | ITU-T |
| **Partner Bank** | | Institution financière soutenant le FSP et lui donnant accès à l’écosystème bancaire local. | PDP |
| **Payee** | Receiver | Bénéficiaire de fonds électroniques dans une transaction de paiement. | ITU-T |
| **Payee FSP** | | FSP du bénéficiaire. | PDP |
| **Payer** | Sender | Payeur de fonds électroniques dans une transaction de paiement. | ITU-T |
| **Payer FSP** | | FSP du payeur. | PDP |
| **Paying for Purchases** | C2B - Consumer to Business | Paiements d’un consommateur vers une entreprise ; l’entreprise est le marchand ou accepteur de paiement. | ITU-T |
| **Payment Device** | ATM (Automated Teller Machine), POS (Point of Sale), Access Point, Point of Sale Device | Notion abstraite d’un dispositif électronique (autre que celui du payeur) permettant d’accepter une transaction via un justificatif (OTP). Exemples : DAB et TPE. | PDP |
| **Payment Instruction** | Payment Instruction | Instruction d’un émetteur à son prestataire de services de paiement pour payer un montant fixe ou déterminable à un bénéficiaire, sous conditions de temps de paiement uniquement, transmise directement ou via agent/système de transfert. | PDP |
| **Payment System** | Payment Network, Money Transfer System | Ensemble des activités, processus, mécanismes, infrastructures, institutions et utilisateurs liés au paiement dans un pays ou une région. | ITU-T |
| **Payment System Operator** | Mobile Money Operator, Payment Service Provider | Entité exploitant un système ou système de paiement. | ITU-T |
| **Peer FSP** | | FSP homologue (contrepartie). | PDP |
| **PEP** | | Personne politiquement exposée (PPE) : personne ayant reçu une fonction publique importante, présentant un risque accru de corruption. | PDP |
| **Platform** | Payment Platform, Payment Platform Provider, Mobile Money Platform | Logiciel ou service utilisé par un fournisseur, un système ou un switch pour gérer les comptes utilisateurs et les transactions. | ITU-T |
| **Posting** | Clearing | Action du fournisseur d’inscrire un débit ou crédit dans le registre du compte utilisateur. | ITU-T |
| **Pre-approval** |Debit Authorization, Mandate |Le payeur autorise un bénéficiaire précis à prélever des fonds sans validation manuelle à chaque transaction (ponctuelle, période définie ou jusqu’à annulation).| PDP |
| **Prefunding** | | Processus d’ajout de fonds aux comptes Vostro/Nostro. | PDP |
| **Prepaid Cards** | | Produit eMoney à usage général où l’enregistrement des fonds est sur la carte (bande magnétique ou puce) ou un système central. | ITU-T |
| **Processing of Personal/Consumer Data** | Processing of Personal/Consumer Data | Toute opération effectuée sur des données personnelles/de consommation (collecte, enregistrement, stockage, consultation, transmission, effacement, etc.). | PDP |
| **Processor** | Gateway | Entreprise gérant en sous-traitance des fonctions pour un fournisseur DFS (transactions, données clients, risques) ; peut aussi servir systèmes ou switches. | ITU-T |
| **Promotion** | | Initiative marketing d’un FSP offrant une remise de frais sur biens ou services ; peut utiliser un coupon. | PDP |
| **Pull Payments** | | Type de paiement initié par le bénéficiaire (marchand) dont le fournisseur « tire » les fonds du compte du payeur. | ITU-T |
| **Push Payments** | | Type de paiement initié par le payeur qui instruit son fournisseur de débiter son compte et « pousser » les fonds vers le bénéficiaire. | ITU-T |
| **Quote** | | Prix pour une transaction financière hypothétique (frais, change, commission, taxes). Garanti pour une courte période, puis expire. | PDP |
| **Reconciliation** | | Processus de rapprochement de deux ensembles d’enregistrements (soldes de comptes) entre FSP pour s’assurer que les fonds sortants correspondent aux transferts effectifs. | PDP |
| **Recourse** | | Droits accordés par la loi, les règles privées ou des accords permettant certaines actions (par ex. annulation) dans certaines circonstances. | ITU-T |
| **Refund** | | Remboursement d’une somme au client retournant biens ou services. | PDP |
| **Registration** | Enrollment, Agent Registration, User Creation, User On- Boarding | Processus d’ouverture d’un compte fournisseur (consommateurs, marchands, agents, etc.). | ITU-T |
| **Regulator** | | Organisation gouvernementale habilitée par la loi à fixer et faire respecter normes et pratiques (banques centrales, régulateurs télécoms, protection des consommateurs, etc.). | ITU-T |
| **Reserve** | Prepare | Partie d’un transfert en deux phases : fonds verrouillés jusqu’à commit ou rollback (souvent avec expiration automatique). | PDP |
| **Reversal** | | Processus d’annulation d’un transfert achevé. | PDP |
| **Risk Management** | Fraud Management | Pratiques pour comprendre, détecter, prévenir et gérer les risques chez fournisseurs, systèmes, processeurs et accepteurs de paiement. | ITU-T |
| **Risk-based Approach** | | Approche réglementaire et/ou de gestion créant des obligations différentes selon le risque de la transaction ou du client. | ITU-T |
| **Roll back** | Reject | Remise des fonds électroniques réservés à leur état initial ; la transaction est annulée. | PDP |
| **Rollback** | | Annulation d’une transaction pour restaurer l’état du système (soldes), typiquement après erreur par un administrateur. | PDP |
| **Rules** | | Règles d’exploitation privées d’un système de paiement liant les participants directs. | ITU-T |
| **Saving and Investing** | | Conserver des fonds pour besoins futurs et rendement financier. | ITU-T |
| **Savings Products** | | Compte bancaire ou non bancaire aidant les utilisateurs finaux à épargner. | ITU-T |
| **Scheme** | | Ensemble de règles, pratiques et normes nécessaires au fonctionnement des services de paiement. | ITU-T |
| **Secure Element** | | Puce sécurisée dans un téléphone pouvant stocker des données de paiement. | ITU-T |
| **Security Access Code** | Security Access Code | NIP, mot de passe/OTP, reconnaissance biométrique ou autre moyen d’accès certifié au compte pour initier un transfert électronique. | PDP |
| **Security Level** | | Niveau de sécurité du système définissant l’efficacité de la protection des risques. | ITU-T |
| **Sensitive Consumer Data** | Sensitive Consumer Data | Données sensibles du consommateur : identifiants d’authentification (ID utilisateur, mot de passe, PIN mobile, PIN transaction) et données relatives à convictions, santé, origine, opinions politiques, syndicales, casier, etc. | PDP |
| **Settlement** | Real Time Gross Settlement (RTGS) | Acte qui éteint les obligations de transfert de fonds ou titres entre parties. | RI |
| **Settlement Instruction** | | Instruction donnée à un système de règlement pour effectuer le règlement d’obligations de paiement entre participants. | PDP |
| **Settlement Obligation** | | Dette due par un participant à un autre suite à une ou plusieurs instructions de règlement. | PDP |
| **Settlement System** | Net Settlement, Gross Settlement, RTGS | Système facilitant le règlement des transferts de fonds, actifs ou instruments financiers (net ou brut). | ITU-T |
| **Short Message Service** | | Service d’envoi de messages courts entre téléphones mobiles. | ITU-T |
| **SIM Card** | SIM ToolKit, Thin SIM | Carte à puce dans un téléphone mobile portant un numéro d’identification unique, stockant des données personnelles. | ITU-T |
| **Smart Phone** | | Appareil combinant téléphone mobile et ordinateur. | ITU-T |
| **Standards Body** | EMV, ISO, ITU, ANSI, GSMA | Organisation créant des normes utilisées par fournisseurs et systèmes de paiement. | ITU-T |
| **Stored Value Account** | SVA | Compte dans lequel les fonds sont conservés sous forme électronique sécurisée (compte bancaire ou eMoney). | PDP |
| **Storing Funds** | Account, Wallet, Cash-In, Deposit | Conversion d’espèces en argent électronique et conservation sécurisée (compte bancaire ou eMoney). | PDP |
| **Super-Agent** | Master Agent | Dans certains pays, agents gérés par des super-agents responsables de leurs actions vis-à-vis du fournisseur. | ITU-T |
| **Supplier Payment** | B2B - Business to Business, B2G - Business to Government | Paiement d’une entreprise à une autre pour fournitures, en personne ou à distance, national ou transfrontalier. | ITU-T |
| **Suspicious Transaction Report** | Suspicious Transaction Report | Si une institution financière note une activité suspecte, elle peut déposer un rapport auprès de l’unité de renseignement financier. | PDP |
| **Systemic Risk** | | Dans les systèmes de paiement, risque d’effondrement de l’ensemble du système financier ou du marché. | ITU-T |
| **Tax Payment** | C2G, B2G | Paiement d’un consommateur vers un gouvernement (taxes, redevances, etc.). | ITU-T |
| **Tokenization** | | Substitution d’un jeton (« numéros factices ») aux « vrais » numéros pour limiter le vol et l’usage frauduleux. | ITU-T |
| **Trading** | International Trade | Échange de capitaux, biens et services au-delà des frontières internationales. | ITU-T |
| **Transaction Accounts** | | Compte de transaction : compte auprès d’une banque ou d’un prestataire autorisé/régulé (y compris non bancaire) pour émettre et recevoir des paiements. | ITU-T |
| **Transaction Cost** | | Coût pour un fournisseur DFS de fournir un service (forfait ou par transaction). | ITU-T |
| **Transaction Request** | Payment Request | Demande envoyée par un bénéficiaire à un payeur pour transférer des fonds électroniques ; approbation manuelle habituelle, ou pré-approbation/justificatif (OTP) pour validation automatique. | PDP |
| **Transfer** | | Terme générique pour toute transaction où de la valeur passe d’un compte à un autre. | PDP |
| **Transfer Funds** | Sending or Receiving Funds | Émission et réception de paiements à une autre personne. | ITU-T |
| **Transport Layer Security** | TLS, client authentication, mutual authentication | Protocole cryptographique assurant la sécurité des communications sur un réseau informatique (point à point). | |
| **Trust Account** | Escrow, Funds Isolation, Funds Safeguarding, Custodian Account, Trust Account | Moyen de détenir des fonds au profit d’une autre partie. Les émetteurs eMoney doivent souvent isoler la valeur des comptes utilisateurs dans un compte fiduciaire bancaire. | ITU-T |
| **Trusted Execution Environment** | | Environnement d’exécution disposant de capacités et exigences de sécurité. | ITU-T |
| **Ubiquity** | | Capacité d’un payeur d’atteindre la plupart des bénéficiaires du pays, quel que soit leur fournisseur ; nécessite l’interopérabilité. | ITU-T |
| **Unbanked** | Underbanked, Underserved| Personnes sans compte de transaction ; sous-bancarisées avec compte peu utilisé ; « mal desservies » cible l’inclusion financière. | ITU-T |
| **User ID** | | Identifiant unique d’un utilisateur (MSISDN, compte bancaire, ID fournisseur, identité nationale, etc.). En transaction, l’argent est adressé à un ID utilisateur, pas directement à un ID de compte. | PDP |
| **USSD** | | Technologie d’envoi de texte entre téléphone mobile et application réseau. | ITU-T |
| **Vostro Account** | | Du point de vue du bénéficiaire : fonds/comptes du FSP payeur détenus chez le FSP bénéficiaire. | PDP |
| **Voucher** | | Instrument de valeur monétaire pour transférer des fonds à des bénéficiaires sans compte chez le FSP payeur. | ITU-T |
| **Wallet** | eWallet | Référentiel de fonds pour un compte ; relation portefeuille-compte pouvant être plusieurs-à-un. | PDP |
| **Whitelist** | | Liste d’entités autorisées pour un privilège, service ou accès (inverse de la liste noire). | PDP |
| **'x'-initiated** | | Utilisé pour la partie ayant initié une transaction (ex. cash-out initié par agent vs. par utilisateur). | PDP |

