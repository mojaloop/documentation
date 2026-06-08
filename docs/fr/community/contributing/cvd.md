# Divulgation et réception d’informations sur les vulnérabilités de sécurité

La Fondation Mojaloop et la communauté prennent très au sérieux la sécurité du logiciel Mojaloop et mettent en œuvre plusieurs processus pour en faire une plateforme sûre pour les activités économiques. Voir aussi notre [documentation sur l’architecture de cybersécurité](../tools/cybersecurity.md).

La Fondation Mojaloop applique un processus de [« divulgation coordonnée des vulnérabilités »](https://github.com/ossf/oss-vulnerability-guide/blob/main/finder-guide.md#what-is-coordinated-vulnerability-disclosure) : une vulnérabilité ou un problème n’est rendu public qu’après que les parties responsables et concernées ont eu le temps de corriger ou de remédier au problème. En appliquant ce modèle, la Fondation Mojaloop et la communauté visent à minimiser l’impact potentiel de ces problèmes sur nos adoptants.

## Politique de divulgation coordonnée des vulnérabilités de la Fondation Mojaloop

Les sections suivantes définissent les exigences et attentes des différentes parties impliquées dans la découverte et la remédiation des vulnérabilités de sécurité du logiciel Mojaloop. Tous les membres de la communauté Mojaloop sont tenus de respecter cette politique, quel que soit le rôle joué dans un scénario donné. Participer à la communauté Mojaloop implique l’acceptation et le respect de ces politiques.

### Terminologie

Les définitions suivantes s’appliquent au sein de cette politique :

#### Termes issus de la RFC 2119

Les termes « MUST », « MUST NOT », « REQUIRED », « SHALL », « SHALL NOT », « SHOULD », « SHOULD NOT », « RECOMMENDED », « MAY » et « OPTIONAL » dans ce document doivent être interprétés comme décrit dans la RFC 2119.

#### Termes issus de l’ISO, du CERT

Les termes « Researcher » ou « Reporter » visent à être cohérents avec « Finder » et/ou « Reporter » tels qu’utilisés dans l’ISO/IEC 29147:2014(E) et le CERT® Guide to Coordinated Vulnerability Disclosure.

### Politique à l’égard des rapporteurs

Les rapporteurs DOIVENT respecter les lignes directrices suivantes.

#### Général

* Les rapporteurs DOIVENT respecter toutes les lois locales et internationales applicables aux activités de recherche en sécurité ou à toute autre participation à ce programme de divulgation des vulnérabilités.

* Les rapporteurs DEVRAIENT de bonne foi notifier et travailler directement avec le ou les fournisseurs ou prestataires concernés avant toute divulgation publique de rapports de vulnérabilité.

#### Périmètre des tests autorisés

* Les rapporteurs PEUVENT tester le logiciel open source Mojaloop pour détecter une vulnérabilité dans le seul but de fournir à la Fondation Mojaloop des informations sur cette vulnérabilité.

* Les rapporteurs DEVRAIENT ne tester qu’avec des comptes de test appartenant au rapporteur ou avec l’autorisation explicite du titulaire du compte.

* Les rapporteurs DOIVENT éviter de nuire aux systèmes d’information et aux opérations de la Fondation Mojaloop, de ses partenaires et des utilisateurs du logiciel open source Mojaloop.

* Les rapporteurs DOIVENT s’efforcer d’éviter les atteintes à la vie privée, la dégradation de l’expérience utilisateur, les perturbations des systèmes de production, ainsi que la destruction ou la manipulation de données.

* Les rapporteurs DOIVENT cesser les tests dès qu’ils ont établi l’existence d’une vulnérabilité ou rencontré des données sensibles. Les données sensibles incluent les informations personnellement identifiables, les informations financières (ex. numéros de compte), les informations propriétaires ou secrets d’affaires.

* Les rapporteurs NE DOIVENT PAS tester de logiciels ou services non expressément contenus dans les dépôts GitHub du logiciel open source Mojaloop, y compris les services connectés.

* Les rapporteurs NE DOIVENT PAS exploiter une vulnérabilité au-delà du minimum de tests nécessaire pour prouver son existence ou identifier un indicateur lié à cette vulnérabilité.

* Les rapporteurs NE DOIVENT PAS accéder intentionnellement au contenu de communications, données ou informations en transit ou stockées sur les systèmes appartenant à la Fondation Mojaloop, à ses partenaires ou aux utilisateurs du logiciel open source Mojaloop — sauf dans la mesure où l’information est directement liée à une vulnérabilité et que l’accès est nécessaire pour prouver son existence.

* Les rapporteurs NE DOIVENT en aucun cas exfiltrer de données.

* Les rapporteurs NE DOIVENT PAS compromettre intentionnellement la vie privée ou la sécurité du personnel de la Fondation Mojaloop, des clients, du grand public, des utilisateurs du logiciel open source Mojaloop ou de tiers légitimes.

* Les rapporteurs NE DOIVENT PAS utiliser d’exploit pour compromettre, altérer ou exfiltrer des données.

* Les rapporteurs NE DEVRAIENT PAS établir d’accès en ligne de commande ni de persistance.

* Les rapporteurs NE DOIVENT PAS exploiter des vulnérabilités pour pivoter vers d’autres systèmes.

* Les rapporteurs NE DOIVENT PAS compromettre intentionnellement la propriété intellectuelle ou d’autres intérêts commerciaux ou financiers du personnel ou entités de la Fondation Mojaloop, des clients, du grand public, des utilisateurs du logiciel open source Mojaloop ou de tiers légitimes.

* Les rapporteurs NE DOIVENT PAS provoquer de déni de service légitime dans le cadre de leurs tests.

* Les rapporteurs NE DOIVENT PAS effectuer de tests d’accès physique (ex. accès aux bureaux, ouvrir des portes, suivre quelqu’un sans autorisation, intrusion).

* Les rapporteurs NE DOIVENT PAS mener d’ingénierie sociale à l’encontre du personnel de la Fondation Mojaloop, de ses sous-traitants, associés ou utilisateurs du logiciel open source Mojaloop, ni de leur personnel, sous-traitants ou clients.

* Les rapporteurs DEVRAIENT contacter la Fondation Mojaloop par e-mail à [security@mojaloop.io](mailto:security@mojaloop.io) s’ils ont un doute sur la poursuite des tests.

#### Coordination avec la Fondation Mojaloop

* Les rapporteurs DEVRAIENT transmettre les rapports de vulnérabilité à la Fondation Mojaloop par e-mail sécurisé (chiffré) à [security@mojaloop.io](mailto:security@mojaloop.io).

* Les rapporteurs DEVRAIENT fournir des rapports de haute qualité.

* Les rapporteurs DEVRAIENT inclure suffisamment de détails pour permettre à la Fondation Mojaloop et/ou aux fournisseurs concernés de reproduire fidèlement le comportement vulnérable.

* Les rapporteurs NE DEVRAIENT PAS signaler des vidages mémoire non analysés ou des sorties de fuzzer sans explication suffisante montrant qu’il s’agit d’une vulnérabilité de sécurité.

* Les rapporteurs DEVRAIENT signaler d’autres vulnérabilités trouvées incidentellement pendant des tests dans le périmètre, même si elles seraient sinon hors périmètre (ex. exposition de données d’un système hors périmètre lors d’un test sur un système couvert).

* Les rapporteurs DOIVENT garder confidentielles les informations sur les vulnérabilités découvertes pendant 90 jours après notification à la Fondation Mojaloop. Cela n’empêche pas une coordination simultanée avec d’autres parties affectées (fournisseurs, prestataires, coordinateurs, etc.).

* Les rapporteurs PEUVENT joindre une preuve de concept si disponible.

* Les rapporteurs PEUVENT demander que leurs coordonnées ne soient pas transmises à tous les fournisseurs affectés.

* Les rapporteurs PEUVENT demander à ne pas être nommé dans les remerciements des divulgations publiques de la Fondation Mojaloop.

* Les rapporteurs NE DOIVENT PAS soumettre un grand volume de rapports de faible qualité.

* Les rapporteurs NE DOIVENT PAS exiger que la Fondation Mojaloop entre dans une relation client, signe un NDA ou toute autre obligation contractuelle ou financière comme condition pour recevoir ou coordonner des rapports de vulnérabilité.

* Les rapporteurs NE DOIVENT PAS exiger une compensation en échange d’informations sur des vulnérabilités signalées en dehors d’un programme de bug bounty explicite.

#### Coordination avec les fournisseurs

* Si le rapporteur trouve une vulnérabilité dans le logiciel open source de la Fondation Mojaloop consécutive à une vulnérabilité dans un produit ou service grand public, il PEUT signaler la vulnérabilité au ou aux fournisseurs, prestataires ou services tiers de coordination pour permettre une correction.

#### Coordination avec d’autres acteurs

* Les rapporteurs PEUVENT faire appel à un service tiers de coordination (ex. CERT/CC, DHS CISA) pour résoudre des conflits entre le rapporteur et la Fondation Mojaloop.

* Les rapporteurs NE DEVRAIENT PAS divulguer de détails sur une vulnérabilité existante du logiciel open source de la Fondation Mojaloop, ni d’indicateurs de vulnérabilité, à une partie qui n’en était pas déjà informée au moment du signalement à la Fondation Mojaloop.

#### Divulgation publique

* Les rapporteurs PEUVENT divulguer au public l’existence antérieure de vulnérabilités déjà corrigées par la Fondation Mojaloop, y compris des détails potentiels sur la vulnérabilité, des indicateurs, ou la nature (mais pas le contenu) des informations rendues accessibles.

* Les rapporteurs qui choisissent une divulgation publique DEVRAIENT le faire en consultation avec la Fondation Mojaloop.

* Les rapporteurs NE DOIVENT PAS divulguer de données propriétaires accessoires révélées pendant les tests, ni le contenu d’informations rendues accessibles par la vulnérabilité, à une partie qui n’en était pas déjà informée au moment du signalement à la Fondation Mojaloop.

### Politique à l’égard des destinataires (Fondation Mojaloop)

La Fondation Mojaloop traitera de bonne foi les rapporteurs qui découvrent, testent et signalent des vulnérabilités conformément à ces lignes directrices.

#### Général

* La Fondation Mojaloop PEUT modifier les termes de cette politique ou y mettre fin à tout moment.

* La Fondation Mojaloop utilisera les informations signalées à des fins défensives uniquement : atténuer ou remédier aux vulnérabilités du logiciel open source Mojaloop, des réseaux et applications de la Fondation, des applications des fournisseurs et des utilisateurs du logiciel open source Mojaloop.

#### Traitement des cas

* La Fondation Mojaloop PEUT, à sa discrétion, refuser de coordonner ou de publier un rapport de vulnérabilité. Cette décision est généralement fondée sur le périmètre et la gravité de la vulnérabilité ainsi que sur la capacité de la Fondation à apporter une valeur ajoutée au processus de coordination et de divulgation.

* Si la Fondation Mojaloop refuse de coordonner, le rapporteur PEUT coordonner avec d’autres fournisseurs affectés et PEUT procéder à une divulgation publique à sa discrétion.

* La Fondation Mojaloop examinera chaque vulnérabilité signalée et s’efforcera de prendre les mesures appropriées pour atténuer les risques et corriger les vulnérabilités.

* La Fondation Mojaloop s’efforcera, dans la mesure du possible, de valider l’existence de la vulnérabilité.

* La Fondation Mojaloop déterminera un délai approprié pour le développement et le déploiement des correctifs pour les vulnérabilités sur les systèmes qu’elle contrôle.

#### Coordination avec les rapporteurs

* La Fondation Mojaloop accusera réception des rapports par e-mail dans un délai de 7 jours ouvrés.

* La Fondation Mojaloop PEUT contacter le rapporteur pour des informations complémentaires.

* La Fondation Mojaloop informera le rapporteur des résultats de sa validation, le cas échéant, et lui fournira des mises à jour régulières tout au long de la remédiation de la vulnérabilité.

* La Fondation Mojaloop créditera le rapporteur dans toute publication sauf demande contraire.

* En cas de divulgation publique, la Fondation Mojaloop reconnaîtra votre contribution si vous êtes le premier à signaler une vulnérabilité unique et que le rapport entraîne un changement de code ou de configuration.

* La Fondation Mojaloop PEUT transmettre le nom et les coordonnées du rapporteur aux fournisseurs affectés sauf demande contraire.

* La Fondation Mojaloop transmettra le nom et les coordonnées du rapporteur aux fournisseurs affectés sauf demande contraire.

* La Fondation Mojaloop informera le rapporteur des changements importants dans le statut d’une vulnérabilité dans la mesure du possible sans révéler des informations reçues en confidence.

* La Fondation Mojaloop PEUT ajuster le calendrier de publication pour tenir compte de contraintes du rapporteur si compatible avec cette politique (souvent un report, ex. pour une conférence).

* La Fondation Mojaloop N’exigera PAS que les rapporteurs entrent dans une relation client, signent un NDA ou toute autre obligation contractuelle ou financière comme condition pour recevoir ou coordonner des rapports.

#### Coordination avec les fournisseurs

* Si la vulnérabilité signalée résulte d’un produit ou service grand public, la Fondation Mojaloop PEUT signaler la vulnérabilité aux fournisseurs, prestataires ou services de coordination concernés.

* La Fondation Mojaloop s’efforcera de bonne foi d’informer les fournisseurs avant divulgation publique.

* La Fondation Mojaloop transmettra les rapports aux fournisseurs affectés dès que pratique après réception.

* La Fondation Mojaloop informera les fournisseurs affectés de ses plans de publication et négociera des calendriers alternatifs si nécessaire.

* La Fondation Mojaloop donnera au fournisseur l’occasion d’inclure une déclaration dans le document de divulgation publique.

* La Fondation Mojaloop ne retiendra pas d’informations fournies par un fournisseur uniquement parce qu’elles contredisent notre évaluation.

* La Fondation Mojaloop notifiera les fournisseurs affectés de tout plan de divulgation publique.

* La Fondation Mojaloop ne révélera pas d’informations fournies en confidence par un fournisseur.

* La Fondation Mojaloop respectera les attentes des rapporteurs énoncées dans cette politique lorsqu’elle agit elle-même comme rapporteur auprès d’autres organisations.

#### Coordination avec d’autres acteurs

* La Fondation Mojaloop PEUT faire appel à un service tiers (ex. CERT/CC, DHS CISA) pour résoudre des conflits avec le rapporteur.

* La Fondation Mojaloop PEUT, à sa discrétion, communiquer des informations sur les vulnérabilités à toute partie pouvant contribuer à la solution et avec laquelle elle entretient une relation de confiance, notamment des fournisseurs (y compris souvent des fournisseurs dont les produits ne sont pas vulnérables), prestataires de services, experts de la communauté, sponsors et sites faisant partie d’une infrastructure nationale critique, si elle estime que ces sites sont à risque.

#### Divulgation publique

* La Fondation Mojaloop déterminera le type et le calendrier de sa divulgation publique.

* La Fondation Mojaloop PEUT divulguer des vulnérabilités au public 7 jours après le premier rapport, indépendamment de l’existence ou de la disponibilité de correctifs ou contournements des fournisseurs affectés.

* La Fondation Mojaloop PEUT divulguer plus tôt ou plus tard en raison de circonstances particulières (exploitation active, menaces graves ou mineures, nécessité de modifier une norme établie).

* La Fondation Mojaloop PEUT consulter le rapporteur et les fournisseurs affectés sur le calendrier et le détail de la divulgation publique.

* La Fondation Mojaloop équilibrera le besoin du public d’être informé des vulnérabilités de sécurité avec le besoin des fournisseurs et des utilisateurs du logiciel open source Mojaloop de disposer du temps nécessaire pour répondre efficacement.

* La décision finale sur le calendrier de publication sera fondée sur le meilleur intérêt global de la communauté.

* La Fondation Mojaloop publiera les divulgations par e-mail, Slack et/ou le site Community Central.

* La Fondation Mojaloop PEUT divulguer au public l’existence antérieure de vulnérabilités déjà corrigées, y compris des détails ou indicateurs, ou la nature (mais pas le contenu) des informations rendues accessibles.

* La Fondation Mojaloop fondera ses décisions sur des facteurs pertinents tels que, sans s’y limiter : divulgation publique préalable, gravité de la vulnérabilité, impact potentiel sur l’infrastructure critique, menace possible pour la santé publique et la sécurité, atténuations immédiates disponibles, réactivité du fournisseur et faisabilité de la création d’une mise à niveau ou d’un correctif, et estimation du délai nécessaire pour que les clients obtiennent, testent et appliquent le correctif. Exploitation active ou menaces graves peuvent accélérer ou retarder la divulgation.

* La Fondation Mojaloop PEUT divulguer des vulnérabilités produit 30 jours après le premier contact si le produit est affecté et que le fournisseur ne répond pas ou n’établit pas un délai raisonnable de remédiation, indépendamment de l’existence de correctifs ou contournements.
