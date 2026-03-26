# Concepts de base

Cette section regroupe les concepts et éléments clés du processus de gestion des règlements.

## Couverture de liquidité

Comme décrit dans l’[Introduction](settlement-management-introduction.md), l’une des caractéristiques d’un système de paiements en temps réel est que les DFSP créanciers doivent débourser des fonds à leurs clients avant d’être remboursés par le DFSP débiteur. Pour atténuer le risque qu’un DFSP créancier ne reçoive pas les fonds qui lui sont dus, Mojaloop exige que les DFSP débiteurs fournissent une preuve crédible qu’ils disposent de fonds réels suffisants pour honorer les obligations qu’ils contractent du fait des opérations dans le système.

Cette preuve crédible est appelée *couverture de liquidité*. Le système Mojaloop ne prescrit pas la forme qu’elle doit prendre ; pour un DFSP donné, elle peut prendre plusieurs formes. Il peut s’agir par exemple :

- de fonds déposés sur un compte sur lequel le Hub Mojaloop exerce un certain contrôle
- d’une ligne de crédit accordée par un autre établissement financier
- d’une autre forme de garantie

Toute couverture de liquidité utilisée dans un schéma Mojaloop doit toutefois présenter les caractéristiques suivantes :

- Elle doit pouvoir être convertie en paiements de règlement *immédiatement* sur demande du schéma Mojaloop.
- Elle doit être attestée par des preuves fiables dont dispose le schéma Mojaloop.
- Elle ne doit pas pouvoir être convertie par le DFSP sous d’autres formes (par exemple en retirant des fonds d’un compte bancaire ou en tirant sur une ligne de crédit) sans que le schéma Mojaloop en ait été informé au préalable et l’ait approuvé.

La couverture de liquidité attribuée à un DFSP donné est une couverture de liquidité pour un modèle de règlement et une devise donnés, et elle est attribuée au schéma dans son ensemble. Autrement dit, Mojaloop n’autorise pas les participants à détenir une couverture de liquidité qui ne s’appliquerait qu’à leurs transferts avec un ou certains DFSP spécifiques.

Lorsqu’un DFSP demande au Hub Mojaloop d’effectuer un transfert, le Hub Mojaloop vérifie que le DFSP débiteur dispose d’une couverture de liquidité suffisante pour garantir que le transfert pourra être réglé s’il se termine avec succès. Il le fait en comparant le total des fonds réels du DFSP à la somme des éléments suivants :

1. La somme des transferts qui ont été complétés mais pas encore réglés, et pour lesquels le DFSP est *soit* le créancier *soit* le débiteur.
1. La somme des transferts qui ont été initiés mais ne sont pas encore terminés, et pour lesquels le DFSP est le débiteur.
1. Le montant du transfert proposé.

Si le total de ces trois éléments est supérieur au montant des fonds réels disponibles pour le DFSP débiteur, le transfert sera rejeté par le Hub Mojaloop. Notez que, dans cette configuration, la liquidité d’un DFSP est créditée de l’effet des transferts dont il est le bénéficiaire dès que le transfert est complété, sans attendre le règlement des fonds. Mojaloop agit ainsi pour réduire au minimum le montant de liquidité que les participants doivent détenir.

## Modèle de règlement

Les schémas souhaitent régler les fonds entre leurs participants de différentes manières. Cela dépend de qui exploite le schéma, du volume de trafic dans le schéma et de nombreux autres paramètres.

Mojaloop est conçu pour prendre en charge les modes de règlement entre participants conformes aux usages du secteur. Ils sont les suivants :

- Règlement net différé multilatéral
- Règlement net différé bilatéral
- Règlement brut immédiat

La signification des termes composant ces types de règlement est la suivante.

Les règlements sont *nets différés* si plusieurs transferts sont réglés ensemble. Les règlements nets (dans lesquels plusieurs transferts sont réglés ensemble) sont par définition différés (puisqu’il faut du temps pour constituer un lot).

Les règlements sont *bruts* si chaque transfert est réglé séparément. Les règlements bruts peuvent être immédiats ou différés. Ils sont *différés* si une approbation extérieure au Hub est requise pour le règlement, et *immédiats* si le Hub peut procéder au règlement d’un transfert sans approbation externe. À ce jour, Mojaloop ne prend en charge que les règlements bruts immédiats.

Les règlements sont *bilatéraux* si chaque paire de participants se règle entre elle pour le net de tous les transferts entre eux. Les règlements sont *multilatéraux* si chaque participant se règle avec le Hub pour le net de tous les transferts auxquels il a participé, quelle que soit l’autre partie.

Un modèle de règlement définit la manière dont un Hub Mojaloop règlera un ensemble de transferts. Dans le cas simple, il n’y a qu’un seul modèle de règlement et il règle tous les transferts traités par le Hub. Mojaloop prend toutefois en charge plus d’un modèle de règlement pour un même schéma. Cela permet, par exemple, à un schéma de définir des modèles de règlement différents selon les devises ou les types de comptes du grand livre.

Si un schéma définit plus d’un modèle de règlement, il incombe au schéma de veiller à ce qu’un transfert donné ne puisse relever que d’un seul modèle de règlement. Par exemple, supposons qu’un schéma définisse un modèle de règlement pour tous les transferts nécessitant une conversion de devise (définis comme : tous les transferts dont la devise source et la devise cible diffèrent), et un autre modèle pour tous les transferts dont la devise source est le shilling kényan (KES). Dans ce cas, un transfert convertissant des shillings kényans en rand sud-africain pourrait relever des deux modèles.

## Fenêtre de règlement

Chaque transfert complété dans le Hub est affecté à la fenêtre de règlement actuellement ouverte. La fenêtre de règlement sert à regrouper des transferts. L’affectation des transferts à une fenêtre de règlement est indépendante des modèles de règlement utilisés pour régler ces transferts. Ainsi, si un schéma a défini plus d’un modèle de règlement, les transferts relevant de modèles différents partageront une même fenêtre de règlement.

Il n’existe pas de méthode déterministe pour affecter les transferts à une fenêtre de règlement donnée. Lorsqu’un administrateur du schéma crée une nouvelle fenêtre de règlement, on ne peut pas savoir à l’avance quels transferts seront affectés à la nouvelle fenêtre et lesquels resteront dans l’ancienne.

Une fenêtre de règlement peut présenter les états suivants :

* `OPEN` : la fenêtre de règlement est ouverte ; les transferts sont acceptés dans la fenêtre ouverte en cours.
* `CLOSED` : la fenêtre de règlement est fermée ; elle n’accepte plus de transferts supplémentaires et tous les nouveaux transferts sont affectés à une nouvelle fenêtre de règlement ouverte.
* `PENDING_SETTLEMENT` : la fenêtre de règlement est fermée, les [positions nettes de règlement multilatéral](#multilateral-net-settlement-position) ont été calculées pour chaque DFSP mais le règlement avec la banque de règlement partenaire n’a pas encore eu lieu.
* `SETTLED` : la banque de règlement a confirmé que tous les DFSP participants ayant effectué des transferts dans la fenêtre de règlement ont réglé leurs paiements, et l’opérateur du Hub a soldé la fenêtre.

La fermeture d’une fenêtre de règlement ouvre automatiquement la suivante.

### Règlements et fenêtres de règlement

Un administrateur du Hub peut demander des règlements pour un modèle de règlement donné et pour une ou plusieurs fenêtres de règlement.

Si un schéma n’a qu’un seul modèle de règlement, le règlement des transferts pour ce modèle dans une fenêtre de règlement donnée règle tous les transferts de cette fenêtre. En revanche, si un schéma a défini plus d’un modèle de règlement, le règlement des transferts relevant d’un modèle de règlement particulier pour une fenêtre donnée signifie que certains transferts de cette fenêtre ont été réglés et d’autres pas.

Il est particulièrement important de comprendre les implications lorsqu’un modèle de règlement brut immédiat a été défini. Dans ce cas, les transferts individuels sont réglés dès qu’ils sont complétés. Si le schéma n’a qu’un modèle de règlement brut immédiat, tous les transferts sont réglés à leur complétion et la fenêtre de règlement devient sans objet. En revanche, si le schéma combine des modèles brut et net, ou s’il a défini plus d’un modèle net, une fenêtre de règlement donnée peut contenir à la fois des transferts réglés et des transferts non réglés ; et, pour les transferts réglés par un modèle brut, des transferts déjà réglés peuvent apparaître même dans une fenêtre de règlement encore ouverte. Cela complique la définition du statut global d’une fenêtre de règlement.

Mojaloop gère cette situation en attribuant toujours à la fenêtre de règlement un état qui est l’*état minimal* des transferts qu’elle contient. L’*état minimal* est défini par la séquence des états de fenêtre de règlement indiquée ci-dessus. Ainsi, par exemple, si une fenêtre de règlement contient des transferts déjà réglés (parce qu’ils sont réglés en brut) et d’autres transferts dont le processus de règlement n’a pas encore commencé, l’état de la fenêtre de règlement sera `OPEN`. Si une fenêtre de règlement a été fermée et qu’elle contient des transferts relevant de deux modèles de règlement différents, dont l’un est en cours de règlement (état `PENDING_SETTLEMENT`) et l’autre pas (état `CLOSED`), l’état global de la fenêtre de règlement sera `CLOSED`.

## Gestion de la liquidité (Net Debit Cap) {#liquidity-management-net-debit-cap}

Comme indiqué ci-dessus, Mojaloop exige que les participants préfinancent les transferts lorsqu’ils sont la partie débitrice en fournissant au Hub Mojaloop une preuve crédible qu’ils peuvent honorer l’ensemble de leurs besoins de règlement actuels. Il peut toutefois exister des situations où un participant ne souhaite pas que l’intégralité de sa couverture de liquidité serve de garantie aux transferts. Par exemple, un participant peut être bénéficiaire dans un canal de rémittances et donc créancier net au global ; ou un participant peut déposer des fonds supplémentaires pour couvrir les périodes où ses comptes ne sont pas ouverts pour recevoir des fonds.

Pour couvrir ces cas, Mojaloop permet aux participants ou aux administrateurs du Hub de réserver une partie de leur couverture de liquidité disponible, de sorte que seule une partie puisse servir de couverture de liquidité pour les transferts. Cela s’appelle le Net Debit Cap (NDC). Le NDC agit comme une limite ou un plafond posé sur les fonds d’un DFSP disponibles pour les opérations ; il ne peut jamais dépasser le solde du compte de liquidité. Cela est nécessaire pour garantir que les passifs d’un DFSP peuvent être couverts avec des fonds immédiatement disponibles auprès de la banque de règlement.

Lorsqu’il calcule si un transfert est couvert par la liquidité disponible, le Hub tient compte de toute restriction du montant de fonds disponibles fixée par le Net Debit Cap.

## Position {#position}

La Position d’un DFSP reflète l’ensemble des obligations non réglées de ce DFSP pour un modèle de règlement donné à un instant donné : autrement dit, le montant des fonds qu’un DFSP devra éventuellement régler avec le schéma. La Position d’un DFSP pour un modèle de règlement donné est le net des éléments suivants :

1. Tous les transferts complétés mais non réglés qui relèvent du modèle de règlement et pour lesquels le DFSP est le débiteur.
2. Tous les transferts complétés mais non réglés qui relèvent du modèle de règlement et pour lesquels le DFSP est le créancier.
3. Tous les transferts demandés mais pas encore complétés qui relèvent du modèle de règlement et pour lesquels le DFSP est le débiteur.

Pour le DFSP payeur, ce total inclut les montants de transfert en attente et pas encore complétés. Notez qu’en cas d’abandon ou de délai d’attente dépassé, les transferts concernés ne se complètent pas et la réservation pour ce transfert est levée.

La Position est la position totale sur l’ensemble des fenêtres de règlement qui n’ont pas encore été réglées. Le montant de la position d’un participant ne change que lorsque certains des transferts qui la composent sont réglés.

## Positions nettes de règlement {#multilateral-net-settlement-position}

Comme indiqué ci-dessus, un règlement net différé peut être multilatéral ou bilatéral. Lorsqu’un administrateur du Hub demande un règlement, le Hub calcule combien chaque participant doit ou est dû du fait des transactions à régler. Les transactions à régler sont définies comme toutes les transactions qui :

- Relèvent de la ou des fenêtre(s) de règlement à régler.
- Relèvent du modèle de règlement en cours de règlement.

Si le règlement est *multilatéral*, un DFSP ne reçoit qu’un seul montant pour ce qu’il doit ou ce qui lui est dû du fait du règlement. Ce montant est le net de toutes les transactions à régler.

Si le règlement est *bilatéral*, un DFSP peut recevoir plusieurs montants pour ce qu’il doit ou ce qui lui est dû du fait du règlement. Chaque montant représente le net des transactions du DFSP avec un DFSP particulier. Le net de toutes ces valeurs sera égal au montant global qu’il devrait ou qu’on lui devrait dans un règlement net multilatéral.

## Rapports de règlement

Pour faciliter le rapprochement des DFSP et le règlement à la banque de règlement, le Hub fournit divers rapports de règlement. Un schéma peut choisir d’avoir plusieurs rapports différents selon les usages. Voici quelques exemples :

* Rapport de règlement DFSP : rapport remis à un DFSP lorsque le règlement a été initié. Il indique la position de règlement bilatérale du DFSP avec chaque DFSP avec lequel il a opéré (en tant que DFSP payeur ou DFSP bénéficiaire) dans la ou les fenêtre(s) de règlement concernée(s). Il indique aussi la position nette de règlement multilatéral du DFSP (somme des montants de transferts envoyés et reçus par le DFSP dans la ou les fenêtre(s) de règlement).
* Rapport de la banque de règlement : rapport remis à la banque de règlement lorsque le règlement a été initié. Il indique la position de règlement bilatérale de chaque DFSP par rapport à tout autre DFSP ayant opéré dans la ou les fenêtre(s) de règlement concernée(s). Il indique aussi la position nette de règlement multilatéral de chaque DFSP (somme des montants de transferts envoyés et reçus par le DFSP).
* Rapport de résultat de règlement DFSP : rapport remis à un DFSP lorsque le règlement est finalisé. Il détaille le solde du compte de liquidité du DFSP et les mouvements de fonds résultant de la clôture de la fenêtre de règlement.

## Portail Finance

Le [Portail Finance](busops-portal-introduction.md) (souvent désigné « Finance Portal v2 ») est un portail web utilisé par l’opérateur du Hub pour gérer au quotidien les processus liés au règlement. Le portail offre notamment les fonctionnalités suivantes :

* consulter des informations telles que le solde, la [Position](#position), le [Net Debit Cap](#liquidity-management-net-debit-cap) des DFSP
* mettre à jour le [Net Debit Cap](#liquidity-management-net-debit-cap) d’un DFSP
* gérer les fenêtres de règlement
<!--* download reports-->
* enregistrer les dépôts ou retraits sur les comptes de liquidité des DFSP

::: tip NOTE
Le Portail Finance ne prend actuellement en charge que les processus de règlement fondés sur le modèle de règlement net différé.
:::
