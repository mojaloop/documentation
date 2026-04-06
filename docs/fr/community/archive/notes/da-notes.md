## Réunions DA : Aperçu
L’Authority Design (DA) se réunit chaque semaine pour une mise à jour hebdomadaire et tient également des sessions ad hoc ou détaillées sur des sujets spécifiques.

Les réunions sont ouvertes au public, bien que les discussions soient généralement limitées aux membres du Conseil. Cependant, les participants sont promus au rang de panélistes lors des réunions s'ils ont des conceptions à examiner ou des propositions de changement.

Plus de détails peuvent être trouvés [ici](https://github.com/mojaloop/design-authority/issues/42#workspaces/da-issue-log-5cdd507422733779191866e9/board?notFullScreen=false&repos=186592307)

# Réunion DA - 30 septembre 2020
La discussion sur les sujets mentionnés a débuté – le "patch" nouvellement implémenté dans la version 1.1 de la spécification de l'API a été discuté et la majeure partie de la réunion a été consacrée à la manière de promouvoir une adoption plus large de ce nouveau modèle.

Des inquiétudes concernant l'implémentation et l'utilisation de la commande "patch" ont été soulevées, indiquant qu'une discussion supplémentaire est nécessaire pour déterminer si nous n'essayons pas de corriger une erreur de conception par une autre potentielle erreur de mise en œuvre.

Voir : https://github.com/mojaloop/design-authority/issues/68


# Réunion DA - 2 septembre 2020
Nous avons d'abord discuté du dossier "models" devant être exclu des vérifications de couverture des tests unitaires. La décision prise était que si le dossier contient de la logique métier (ce qui ne devrait généralement pas être le cas), il doit être refactoré et déplacé. Une fois dans cet état "logique métier isolée", la couverture de tests pour ce dossier peut être ignorée. Voir : https://github.com/mojaloop/design-authority/issues/64

Nous avons conclu la discussion sur l’adaptateur de schéma séparé pour un PISP – voir le sujet sur le tableau : https://github.com/mojaloop/design-authority/issues/51
Veuillez consulter le document de travail à cette adresse : https://github.com/mojaloop/pisp/blob/scratch/api-collision/docs/api-collision.md
Le lien ci-dessus contient une discussion détaillée sur les réflexions les plus récentes et certains exemples de mesures d’atténuation.
La décision a été prise de bloquer ce sujet jusqu’à ce que d’autres développements sur la PoC aient été réalisés, afin que la DA puisse évaluer si les conceptions sont toujours alignées avec l’approche recommandée.

# Réunion DA - 26 août 2020
Nous avons poursuivi la discussion sur https://github.com/mojaloop/design-authority/issues/51 lors de la réunion DA du 26/08/2020.

Quelques points clés ont été notés :

Afin de profiter de TypeScript et d’accélérer le développement, le groupe de travail PISP a déjà séparé l’adaptateur de schéma tiers.

L’un des défis identifiés avec l’approche "multi-scheme-adapter" était pour les cas où des ressources sont partagées entre les APIs, comme GET /parties/{type}/{id}.

Notre décision de séparer l’API Thirdparty en sa propre API (et de ne pas étendre la FSPIOP-API) était basée sur l’idée que "tous les participants ne voudront pas des fonctions tierces", ils ne devraient donc pas avoir à s’en soucier. Dans le cadre de cette décision, certaines ressources seront donc dupliquées.

Cela pourrait poser problème à l’avenir, où les callbacks de certaines ressources pourraient ne pas, par exemple, arriver à la bonne destination : si un DFSP doit écouter les callbacks PUT /parties/{type}/{id} pour les deux APIs (FSPIOP et Thirdparty), il se peut qu'il ne soit pas possible de router correctement ces callbacks.

Lewis Daly va consacrer plus de temps à travailler sur des diagrammes et des documents de conception, et reviendra vers la DA prochainement.

# Réunion DA (Ad-Hoc) - 24 août 2020
Le sujet de discussion était : https://github.com/mojaloop/design-authority/issues/65
La réunion ad hoc a été menée pour aborder un problème plus large relatif aux recommandations devant être remontées au CCB pour examiner un changement/une amélioration de la spécification de l’API.

De nombreux points valides ont été soulevés et discutés, et Michael et Adrian ont suggéré une collaboration sur cette plateforme pour consolider les idées avancées afin de formuler une recommandation au CCB.

# Réunion DA - 19 août 2020
Le sujet de la réunion était : https://github.com/mojaloop/design-authority/issues/61 
Le groupe a convenu qu'il fallait trouver un équilibre entre la nécessité d’éliminer la conciliation et la gestion des liquidités des FSPs (payeurs) en évitant de bloquer/réserver des fonds plus longtemps que nécessaire. Il a également été proposé d'utiliser une "période de grâce" avant de faire expirer un transfert pour compenser les différences d'horloge. Il a aussi été suggéré que pour les transactions à risque, la notification finale sous forme d'appel PATCH, introduite avec FSPIOP API v1.1, puisse être utilisée pour atténuer le risque côté FSP bénéficiaire.

Un point a été soulevé : après la période de timeout (plus la période de grâce pour les différences d’horloge), le statut d’un transfert ne peut plus être modifié – il est soit finalisé, soit non, mais on ne peut pas le changer. Par exemple, si la période de timeout (exprimée comme un moment futur et non une durée) est de 10 secondes, alors un FSP payeur (ou Switch) peut ajouter une période de grâce d’1 seconde et, après 11 secondes, interroger l’entité en aval pour connaitre le statut du transfert ; À ce point, si le transfert est finalisé (Commit ou Abandon), le FSP payeur peut agir en conséquence ; sinon, si l’état est intermédiaire, le transfert doit être expiré puisque la période de timeout est dépassée.

Le groupe a convenu qu’il fallait réexaminer la mise en œuvre des "timeouts télescopiques", qui n’est pas actuellement prise en charge au profit du chiffrement de bout en bout de (la plupart) des messages.

# Réunion DA - 12 août 2020
Le sujet de la réunion était : https://github.com/mojaloop/design-authority/issues/63
La DA a discuté de la création et du suivi des tickets d’anomalie. Avec plus de 50 dépôts, il est logique de créer un ticket dans le dépôt d’origine et de continuer à le traiter là jusqu’à sa résolution. Le Product Owner et le Scrum Master, ayant le contexte, doivent répliquer un ticket dans le dépôt Design Authority avec un lien vers le ticket d'origine. Merci de consulter le tableau DA pour les décisions prises ici : https://github.com/mojaloop/design-authority#workspaces/da-issue-log-5cdd507422733779191866e9/board?repos=186592307

# Réunion DA - 5 août 2020
Le sujet de la réunion était : https://github.com/mojaloop/project/issues/852
L'approche d’intégration HSM a été évoquée à plusieurs reprises, et le groupe prenant en charge la conception et la mise en œuvre l’a soumis à discussion à la réunion DA pour répondre à quelques questions issues de la dernière session PI-Planning où l’avancée du projet a été présentée.

Comme la discussion n’a pas pu être terminée, une réunion DA ad hoc est prévue ce vendredi avec une sous-section des membres DA. La raison est qu’il y avait quelques questions spécifiques qui n’ont pas pu être abordées en détail, ce qui sera clarifié avec les personnes concernées. Contactez-moi si vous souhaitez participer à cette réunion.

# Réunion DA - 29 juillet 2020
Sujet abordé : https://github.com/mojaloop/design-authority/issues/60
Claudio a noté trois observations concernant les meilleures pratiques dans le code Mojaloop Core. L'un des problèmes bénéficie déjà d'un ticket actif et servira à son suivi ; les deux autres feront l'objet de nouveaux tickets. Claudio doit fournir des exemples, parfois des extraits de code, pouvant être utilisés.

Istvan et Michael ont discuté de l’utilisation d’un identifiant unique pour les requêtes de recherche et proposé de tenir une session de suivi la semaine suivante pour les personnes intéressées. L’utilisation actuelle d’entêtes de trace (optionnel) pour la traçabilité (APM) a été proposée, pouvant, après examen DA, être retenue et proposée au CCB.

# Réunion DA - 22 juillet 2020
Annulée pour cause du PI-11 Mojaloop Convening

# Réunion DA - 15 juillet 2020
Sam a présenté les changements majeurs de la version Helm v10.4.0 et des extraits des notes de version : https://github.com/mojaloop/helm/releases/tag/v10.4.0
Merci de consulter le tableau des sujets DA : https://github.com/mojaloop/design-authority/issues/56

Neal et Michael ont discuté du partage de base de données/code entre central-settlement et central-ledger ; ils vont continuer le travail courant sur la "Continuous Gross Settlement", mais après le convening ils récupèreront les retours du PoC Perf/Arch (event sourcing / CQRS) pour s'aligner : https://github.com/mojaloop/design-authority/issues/58

# Réunion DA - 8 juillet 2020
L’équipe TIPS a présenté la conception et la mise en œuvre d’un **moteur de règles** répondant aux exigences d'interprétation sur la **partie règlements**, pour étendre les frais perçus lors d'un transfert. L’implémentation permet d’interpréter des règles à chaque étape d’une transaction. Une présentation officielle sera faite lors du convening de la semaine du 20 juillet 2020, après quoi l’adaptation éventuelle dans le code OSS Core sera envisagée comme approche générique de la mise en œuvre d’un moteur de règles.
Voyez le lien sur le tableau Design Authority ici : https://github.com/mojaloop/design-authority/issues/53 pour un exposé du problème, le déroulement des réunions, les remarques, et aussi, une fois prise, la décision finale.

# Réunion DA - 1er juillet 2020
Dans le cadre du "workstream Versioning", une PoC de "déploiement sans interruption" est en cours et les retours sont présentés sous forme d’un exposé du problème, de la solution et d’une démo. L’équipe à l’œuvre comprend Lewis Daly, Mat de Haast et Sam Kummary. Les retours ont été bien accueillis et, le travail se poursuivant, la DA assurera le suivi des tâches à venir après la prochaine présentation lors du PI 11 Meeting.
Voyez le lien sur le tableau Design Authority ici : https://github.com/mojaloop/design-authority/issues/54 pour un exposé détaillé du problème, le suivi des réunions etc.

# Réunion DA (Ad-Hoc) - 29 juin 2020
Discussion KNEX – suite. Cette discussion a débordé sur l'éventuelle utilisation d'outils tiers pour l’assistance à la génération de requêtes et faciliter les migrations. Cela n’a pas d’impact direct sur l'usage de KNEX lui-même, et après un examen approfondi, il a été décidé qu’il n’y avait pas de raison suffisamment impérieuse pour continuer l’enquête sur KNEX, mais de rester ouvert à d’autres solutions à l’avenir. Ces bibliothèques seront évaluées en regard de l’implémentation actuelle pour garantir que les bons outils servent le bon but. Ce sujet est désormais clos.
Voyez le lien sur le tableau Design Authority ici : https://github.com/mojaloop/design-authority/issues/27 pour un exposé du problème, les réunions, remarques, et la décision le cas échéant.

# Réunion DA (Ad-Hoc) - 25 juin 2020
Discussion KNEX – initiée.
Les échanges ont débuté, mettant en avant la difficulté à générer/créer des scripts de migration lors de changements sur la base de données, ainsi que le scénario de devoir effectuer ces mises à jour sur une base en ligne.
Dans ce contexte, des ateliers de conception sont planifiés pour déterminer si KNEX permet de gérer ce scénario et s’il existe d’autres bibliothèques pouvant compléter ou remplacer l’implémentation actuelle, pour réduire cette difficulté.
Voyez le lien sur le tableau Design Authority ici : https://github.com/mojaloop/design-authority/issues/27 pour un exposé détaillé du problème, les réunions, remarques, et la décision finale.


# Réunion DA - 24 juin 2020
La discussion a débuté sur la dépréciation du support Helm2 (Issue #52), où il a été convenu que la migration vers Helm3 devait se poursuivre. Une documentation pour faciliter l'utilisation des outils d’aide à cette migration doit être fournie. Retrouvez le lien vers ce document ici : https://github.com/mojaloop/design-authority/issues/52

Le sujet de l’approche conception visant à implémenter un système de règles générique a été abordé, d’abord en lien avec un besoin de pouvoir interroger les transactions terminées ou en cours (que ce soit lors du transfert ou même au stade du devis), afin d’appliquer des "frais d’interchange" selon le type de transaction et des règles associées.
Différentes décisions de conception autour de ce sujet seront discutées, la nécessité étant de pouvoir attacher des règles à différentes étapes du parcours de transaction.
L’implémentation actuelle d’un moteur de règles dans le projet TIPS a été évoquée, ainsi qu’une demande de démonstration des capacités de cette solution afin de voir si cela pourrait s’intégrer de façon générique dans le Switch principal.
Merci de suivre l’avancée de ce sujet sur le tableau : https://github.com/mojaloop/design-authority/issues/53


# Réunion DA - 17 juin 2020
Sujet en discussion : comprendre et définir les rôles Mojaloop pour les cas d’utilisation PISP, x-network, etc.
La DA encourage les groupes de travail à créer de nouvelles APIs et définitions de rôles (ex : Thirdparty API, CNP API, etc.)
Voir le sujet sur le tableau Design Authority : https://github.com/mojaloop/design-authority/issues/44 pour l’énoncé du problème et la décision prise.

# Réunion DA - 10 juin 2020
Cette semaine, la DA a discuté : le simulateur PISP : https://github.com/mojaloop/design-authority/issues/46
La décision a été prise que pour l’instant le groupe de travail PISP continuera sur sa propre branche dans le sdk-scheme-adapter, et cette abstraction/partition sera revue ultérieurement (voir #51)

# Réunion DA - 3 juin 2020
Nous avons poursuivi la discussion de la semaine passée concernant l’API séparée pour PISP et décidé d’opter pour l’option 4 : séparation maximale des APIs, avec fichiers swagger/OpenAPI communs pour la définition et la réutilisation du modèle de données :
Voir le sujet sur le tableau Design Authority : https://github.com/mojaloop/design-authority/issues/47 pour l’énoncé du problème et la décision prise.

# Réunion DA - 27 mai 2020
Un consensus a été atteint parmi les participants sur le sujet discuté il y a quelque temps, tel que soulevé par Adrian. Il en ressort que le développement du Switch ne sera pas restrictif ni prescriptif mais, pour les recommandations concernant les contributions et modules, il est préféré que ceux-ci soient réalisés en TypeScript.

Un nouveau sujet a été proposé : https://github.com/mojaloop/design-authority/issues/47 pour répondre à la question de savoir s’il faut une API séparée pour PISP, ou simplement étendre l’OpenAPI existant. Une prise de position a été rédigée et ajoutée en commentaire. Tous les participants ont été informés sur la décision à prendre et ce sujet (#47) sera traité à la prochaine réunion DA.

Un autre sujet, relatif à PISP, sera programmé lors d’une prochaine réunion DA : https://github.com/mojaloop/design-authority/issues/48 - Comment gérer les notifications pour qu’un PISP puisse être inscrit comme partie intéressée à la notification du succès d’un transfert

