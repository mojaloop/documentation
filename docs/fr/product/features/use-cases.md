---
sidebarTitle: Cas d’usage
---

# Cas d’usage

La fonction centrale d’un hub Mojaloop est la compensation du transfert de fonds entre deux comptes, chacun détenu chez un DFSP connecté au hub, couramment appelé paiement poussé (*push payment*). Cela lui permet de couvrir un large éventail de cas d’usage. Ce n’est toutefois pas le seul type de transfert pris en charge par Mojaloop.

La description ci-dessous des cas d’usage pris en charge par Mojaloop est regroupée selon les types de protocole sous-jacents, afin de montrer le caractère extensible d’un hub Mojaloop. On distingue notamment :
- les **paiements poussés**, qui couvrent les cas d’usage fondamentaux P2P, B2B, etc. ;
- la **demande de paiement** (*Request To Pay*), qui couvre certains paiements commerçants, le commerce en ligne et les recouvrements ;
- une gamme de **services d’espèces**, dont le CICO et l’hors ligne ;
- les **protocoles PISP/3PPI**, qui permettent aux fintechs et à d’autres acteurs de proposer des services tels que paiements commerçants, versements salariaux à petite échelle, recouvrements, etc. ;
- les **paiements de masse**, pour les versements sociaux à l’échelle nationale et les salaires ;
- les **paiements transfrontaliers**, y compris les envois de fonds et les paiements commerçants.

Ces éléments sont détaillés ci-dessous. En lisant ces descriptions, il convient de garder à l’esprit que nombre de ces types de transaction [permettent le transport de métadonnées avec le paiement lui-même](./metadata.md).

(Pour une vision centrée sur les API, voir la [section cas d’usage de la documentation API Mojaloop](https://docs.mojaloop.io/api/fspiop/use-cases.html#table-1).)
## Cas d’usage « paiement poussé » (*Push Payment*)
Un hub Mojaloop prend directement en charge les cas d’usage suivants, qui sont autant de variantes de paiements poussés :
- personne à personne (**P2P**) ;
- personne à entreprise (**P2B**), y compris des formes simples de paiement commerçant, en présentiel et à distance (en ligne) ;
- entreprise à entreprise (**B2B**) ;
- entreprise à administration (**B2G**) ;
- formes simples de paiements personne à administration (**P2G**).

Pour tous les types de paiement commerçant, le paiement peut être facilité par des identifiants commerçant (pour l’USSD) ou des codes QR (smartphones).

## Cas d’usage « demande de paiement » (*Request To Pay*)

Outre les paiements poussés, Mojaloop prend en charge les transactions de demande de paiement (RTP), dans lesquelles un bénéficiaire demande un paiement à un payeur et, _lorsque le payeur consent_, son DFSP pousse le paiement vers le bénéficiaire en son nom. Cela couvre notamment les cas d’usage suivants :

- **Paiements commerçants**, en environnement de face à face, par exemple via un code QR ;
    - Les aspects pratiques de la configuration de la solution Paiements commerçants Mojaloop, y compris le contenu des codes QR, sont traités dans [**Comment configurer les paiements commerçants pour Mojaloop**](./merchant-payments.md).
    - Pour tous les paiements commerçants en face à face, le paiement peut être facilité par des identifiants commerçant (USSD) ou des codes QR (smartphones).
- **Commerce électronique**, parfois appelé paiement commerçant à distance, lorsque par exemple une page de paiement (site web ou application mobile) inclut un bouton du type « payer depuis mon compte bancaire », déclenchant une RTP.

- **Recouvrements**, y compris P2G, P2B, B2B et B2G, couramment utilisés pour le règlement de factures d’utilités. Cela peut aussi passer par l’interface fintech/3PPI décrite ci-dessous — la décision relève de l’opérateur de schéma.

## Services d’espèces
Un hub Mojaloop prend directement en charge les opérations d’entrée/sortie d’espèces interopérables courantes attendues par tout DFSP (et ses clients) :
- **Distributeur sans carte**, par intégration aux réseaux de GAB, via le protocole ISO 8583 ;
- **Entrée / sortie d’espèces (CICO) chez un agent hors réseau** (*off-us agent*) ;
- **Espèces hors ligne** :
	- Un hub Mojaloop peut soutenir les schémas de paiement **espèces hors ligne**, car ce type de schéma est assimilé à des espèces — numériques. Un retrait vers un portefeuille espèces hors ligne (chargement) s’apparente ainsi à une sortie d’espèces ; un dépôt depuis un tel portefeuille (versement) s’apparente à une entrée d’espèces. L’opérateur du schéma peut toutefois exiger que toutes ces opérations de chargement/versement de portefeuille, qu’elles soient sur son réseau ou hors réseau, transitent par le hub Mojaloop pour faciliter la réconciliation du schéma hors ligne.

## Cas d’usage « 3PPI » — Fintechs et autres
Un hub Mojaloop prend directement en charge l’initiation de paiement par un tiers (3PPI), afin que les prestataires de services d’initiation de paiement (PISP) — souvent appelés fintechs — puissent, via leurs propres applications mobiles, recruter des clients et leur proposer un service de paiement unifié ou enrichi. La plupart des DFSP connectés à un hub Mojaloop peuvent proposer des services 3PPI s’ils disposent d’un back-office suffisamment moderne.

Une fintech peut utiliser le service 3PPI pour lancer une demande de paiement (RTP) — en demandant au DFSP de son client d’initier un paiement vers un bénéficiaire. Cela couvre notamment :
- les **recouvrements**, en particulier P2G et P2B ;
- les **paiements de salaires**, essentiellement le traitement d’une liste de paiements de masse pour le compte de petites et moyennes entreprises ;
- les **paiements commerçants** (P2B), avec initiation par code QR.

## Cas d’usage « paiement de masse » (*Bulk Payment*)
Tout service de paiement doit permettre les paiements de masse ; Mojaloop le propose selon un modèle très efficace. Tous les DFSP, sauf les plus petits, peuvent offrir ce service à leurs clients, qui peuvent soumettre des listes de paiements atteignant tout client de tout DFSP connecté. Cela sert notamment à :
- **pensions, prestations sociales et autres versements** (G2P) ;
- **salaires** (G2P et B2P).

En outre, la fonctionnalité de paiement de masse est disponible via le **service 3PPI** (ci-dessus), ce qui permet à tous les DFSP — y compris les plus petits — d’offrir un service de paiements de masse à plus petite échelle, par l’intermédiaire d’une fintech ou directement via leur propre service 3PPI.


## Cas d’usage « transfrontalier » (*Cross Border*)

Un hub Mojaloop peut permettre aux clients d’un DFSP d’envoyer de l’argent à l’étranger de manière économique, en intégrant le change (FX) dans la transaction. Cela couvre notamment :
- **P2P** et **P2B** (envoi à la famille et aux proches à l’étranger, ou règlement d’une facture dans un autre pays) ;
- **paiements commerçants**, via RTP transfrontalier (par exemple un petit commerçant qui franchit une frontière proche pour vendre sur un marché local et encaisser dans la monnaie locale).

Pour explorer les éléments de l’écosystème Mojaloop qui le rendent possible, il est recommandé de consulter :
1. La possibilité de connecter un hub Mojaloop à des schémas de paiement voisins, dans le même pays ou ailleurs, pour assurer l’interopérabilité. Cette capacité [**est présentée ici**](./InterconnectingSchemes.md).

2. La prise en charge des fournisseurs de change (FXP) se connectant à un hub Mojaloop pour proposer des services FX. Ni le payeur ni le bénéficiaire n’a besoin de définir la devise utilisée pour la transaction ; chacun opère dans sa propre devise, et le ou les hub(s) Mojaloop assure(nt) l’échange. Cette capacité [**est présentée ici**](./ForeignExchange.md).

3. La manière dont l’interconnexion / l’inter-schéma et le change sont combinés pour soutenir les [**transactions transfrontalières**](./CrossBorder.md).
## Autres ; paiements par carte
De nombreux adoptants potentiels se demandent s’il est possible d’utiliser Mojaloop pour commuter des transactions carte. La réponse est que, techniquement, commuter une transaction carte est tout à fait envisageable ; le numéro de compte personnel (PAN) de la carte peut servir d’alias pour initier une RTP, d’autant que le numéro d’identification bancaire (BIN), partie du PAN, identifie le DFSP qui détient le compte du client, vers lequel la RTP doit être routée.

En pratique toutefois, le terminal point de vente (PoS) carte devrait être adapté pour router les transactions en conséquence : transactions domestiques via une RTP vers le commutateur Mojaloop, le reste vers le réseau carte émetteur. Ces terminaux appartiennent souvent aux banques acquéreuses, peu enclines à en ouvrir l’accès (les grandes enseignes, qui possèdent souvent leurs propres PoS, souvent intégrés, peuvent être plus favorables).

De plus, rediriger des transactions initiées avec une carte portant le logo d’un réseau international serait totalement inapproprié et exposerait quasi certainement toutes les parties à un risque juridique majeur. Cette approche ne devrait donc être envisagée que lorsqu’un schéma carte domestique est utilisé et que son propriétaire accepte que ses cartes servent de la sorte.

Enfin, une telle approche se rapproche davantage d’une transaction RTP Mojaloop pour les cartes de débit ; pour une carte de crédit, avec par exemple mise en réserve de fonds sur un compte (à l’enregistrement à l’hôtel), la complexité augmente.

## Cas d’usage étendus

Outre ces cas d’usage standard, Mojaloop permet aux adoptants de mettre en œuvre des cas d’usage plus complexes, qui ajoutent des fonctionnalités et se superposent aux cas standard.

Ces cas propres à un schéma peuvent être ajoutés aisément par chaque opérateur de schéma.

## Applicabilité

La présente version de ce document correspond à Mojaloop version [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0).

## Historique du document
  |Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.6|24 juillet 2025| Paul Makin|Correction de liens cassés.|
|1.5|16 juillet 2025| Paul Makin|Sous-titres alignés sur l’introduction ; descriptions affinées ; lien vers les métadonnées ; note sur les transactions par carte.|
|1.4|12 juin 2025| Paul Makin|Introduction étendue pour expliquer le regroupement des cas d’usage.|
|1.3|10 juin 2025| Paul Makin|Description des paiements e-commerce via RTP ; 3PPI intitulé paiements fintech ; précision sur l’initiation des paiements de masse via 3PPI ; mises en forme des liens.|
|1.2|14 avril 2025| Paul Makin|Mises à jour liées à la sortie de la V17, y compris liens vers la documentation inter-schéma et FX.|
