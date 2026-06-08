# REST pragmatique

## REST pragmatique pour le projet Mojaloop

Avec l’émergence de la stratégie API comme levier de montée en charge pour les services Internet, l’attention portée aux technologies d’interconnexion a évolué. S’appuyant sur les principes qui ont permis au Web de se structurer et de scaler, REST (Representational State Transfer) est devenu un choix de conception privilégié pour les API de services Internet. Mais si les principes REST, proposés dans la thèse de doctorat de Roy Fielding qui les a définis, ont une valeur académique pour la recherche, un design REST pur n’est pas aujourd’hui praticable pour la plupart des applications. Nous préconisons une forme de REST pragmatique — un patron de conception qui adopte les éléments utiles du design RESTful sans exiger une pureté académique stricte.

### Le modèle de maturité de Richardson

Martin Fowler a cité un modèle structuré d’adoption RESTful élaboré par Leonard Richardson et [exposé](http://www.crummy.com/writing/speaking/2008-QCon/act3.html) lors d’une conférence QCon. Fowler l’appelle le modèle de maturité de Richardson du design RESTful.

<!-- ![](./assets/diagrams/rest/glory-of-rest.png) -->

Martin Fowler, en référence à [Rest in Practice](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829)², résume ainsi la genèse du design RESTful :

> utiliser des services web RESTful pour traiter une grande partie des problèmes d’intégration auxquels les entreprises sont confrontées. Au cœur du propos se trouve l’idée que le Web est une preuve par l’existence d’un système distribué massivement scalable qui fonctionne très bien, et que nous pouvons en tirer des idées pour construire des systèmes intégrés plus facilement.

Une approche pragmatique du design RESTful emprunte les meilleures parties du cadre conceptuel de Fielding pour permettre aux développeurs et intégrateurs de comprendre aussi rapidement que possible ce qu’ils peuvent faire avec l’API, sans avoir à écrire de code superflu.

Au plus fondamental, un design RESTful est centré sur les ressources et utilise les verbes HTTP. Au plus avancé, un design REST académique pur applique HATEOAS via des contrôles hypermédia. Nous recommandons un design RESTful de niveau 2 pour Mojaloop.

### Pourquoi pas les contrôles hypermédia ?

Bien que HATEOAS soit un principe fascinant — il préconise qu’un serveur réponde à chaque action client par une liste de toutes les actions possibles menant le client vers son prochain état applicatif — et que les clients _ne doivent pas_ s’appuyer sur des informations hors bande (comme une spécification API écrite) pour savoir quelles actions sont possibles sur quelles ressources ni sur le format des URI.

C’est cette dernière interdiction qui fait échouer le test du REST pragmatique : si HATEOAS est une approche théorique intéressante pour limiter le couplage, elle ne s’applique pas facilement à Mojaloop (ni à tout autre design d’API contractuelle). Si l’on considère le public des API d’interconnexion, on trouve des acteurs commerciaux soumis à des règles de schéma très précises. Les interactions entre participants, et entre participant et hub de services central, sont fortement spécifiées pour fixer un risque commercial acceptable, pour proposer aux utilisateurs finaux des transactions tarifées à très faible coût. Cela exige une prévisibilité _ex ante_ de l’API, incompatible avec le principe HATEOAS défini par Fielding.

### Principes REST pragmatiques

#### Les URI définissent les ressources

Un schéma d’URI bien conçu rend une API facile à consommer, à découvrir et à étendre, comme une API soignée dans un langage classique. Le REST pur dédaigne ce principe au profit de HATEOAS. Mais le REST pragmatique suit un schéma d’URI habituel pour faciliter la compréhension humaine, même si des principes HATEOAS sont employés pour la découverte.

Les chemins d’URI qui désignent une collection d’objets doivent être un nom pluriel, p. ex. `/customers`, pour un ensemble de clients. Lorsqu’une collection ne peut avoir qu’une seule instance, on utilise le singulier pour éviter la confusion. P. ex. `GET /transfers/:id/fulfillment` est correct, car il n’y a qu’un objet fulfillment par transfert identifié.

Les chemins d’URI qui désignent un objet unique doivent être un nom pluriel (la collection) suivi d’un identifiant unique prédéfini. P. ex. `/customers/123456` pour le client numéro 123456. L’identifiant doit être unique dans la collection et persister pendant la vie de l’objet dans cette collection. Les identifiants ne doivent pas être des valeurs ordinales — un parcours ordinal dans une collection se fait via des paramètres de requête sur l’URI de collection.

Les chemins d’URI peuvent avoir un préfixe pour l’environnement, la version ou un autre contexte de la ressource. Après le chemin d’identification, il ne doit suivre que des collections et des références d’objets.

Les identifiants de segments de chemin et de requête doivent être choisis dans l’ensemble des caractères romains `[0-9A-Za-z]`. Utiliser _camelCase_ pour les éléments du chemin d’URI. Ne pas utiliser snake_case.

Pour lever toute ambiguïté, le caractère « _ » (tiret bas) et « - » (tiret) ne doivent pas être utilisés dans les identifiants de segments de chemin ou de requête.

Cela peut sembler un peu étroit. L’objectif est d’avoir un format d’URI bien défini, cohérent avec les usages répandus, simple à décrire, prévisible, et qui se mappe aux environnements et conventions natifs. Cela ne satisfera pas tout le monde. Voici la logique de cette contrainte :

CapitalCase et camelCase sont la norme de facto pour NodeJS et JavaScript et une contrainte courante pour les URI : les segments de chemin sont souvent mappés vers des ressources internes JS ; respecter les conventions JS est cohérent.

Les noms de champs en JSON et SQL doivent suivre la même convention, car ils sont souvent mappés automatiquement vers l’espace de noms des variables et peuvent être référencés dans les URI comme segments de chemin ou de requête.

Il faut aussi éviter « $ » sauf si une bibliothèque l’exige (p. ex. jQuery). Le JCL IBM est révolu ; laissons-le en paix. Il existe de meilleurs outils de portée pour séparer les espaces de noms que d’introduire des symboles non romains.

Il faut éviter « - » (tiret) dans les noms de segments de chemin et de paramètres de requête car cela ne se mappe pas aux noms de variables, SQL ou champs JSON.

Les caractères tiret bas doivent être échappés dans le source Markdown en les préfixant par « \ ».

On a signalé que snake_case serait légèrement plus lisible que camelCase dans les noms de variables, mais cela n’améliore pas la lisibilité des URI : cela gêne visuellement la lecture des délimiteurs de segments de chemin et de requête. Et lorsque les URI sont soulignées à l’affichage, les tirets bas deviennent illisibles.

#### Paramètres d’URI

Utiliser un ensemble standard et prévisible de paramètres optionnels de manière cohérente.

Un ensemble standard de paramètres de requête doit servir pour les collections afin de laisser l’appelant contrôler la portion de collection retournée. « count » pour définir le nombre d’objets à retourner, « start » pour définir le point de départ dans le jeu de résultats, et « q » comme requête de recherche libre. Nous définirons l’ensemble standard au fil du temps et l’appliquerons de façon uniforme.

#### Verbes

Les objets singuliers doivent prendre en charge GET pour la lecture, PUT pour le remplacement complet (ou la création lorsque la clé primaire est fournie par le client et persistante, p. ex. un PAN de carte de paiement), et DELETE pour la suppression.

Les collections doivent prendre en charge GET pour lire tout ou partie d’une collection, et POST pour ajouter un nouvel objet à la collection.

Les objets singuliers peuvent prendre en charge POST pour modifier leur état de façon déterminée. Poster un document JSON vers l’URI d’un objet singulier peut mettre à jour des champs sélectionnés ou déclencher un changement d’état ou une action sans remplacer tout l’objet.

GET doit être implémenté de manière _nullipotente_ — c’est-à-dire que GET ne provoque jamais d’effets de bord ni ne modifie l’état visible par le client hors journalisation ou mise à jour des métriques d’instrumentation.

PUT et DELETE doivent être implémentés de manière _idempotente_ — les changements s’appliquent de façon cohérente aux données du système en ne dépendant que de l’état de la ressource et des entrées, rien d’autre. L’action n’a pas d’effet supplémentaire si elle est répétée avec les mêmes paramètres et ne dépend pas de l’ordre d’autres opérations sur une collection ou d’autres ressources. Par exemple, retirer une ressource d’une collection peut être idempotent sur la collection. Utiliser PUT pour remplacer (ou créer) entièrement une ressource identifiée de façon unique lorsque l’URI est entièrement connue du client est aussi idempotent. Le système peut donc réordonner les opérations pour gagner en efficacité ; le client n’a pas besoin de savoir si la ressource existe avant de tenter un remplacement.

POST et PATCH ne sont pas des opérations idempotentes. POST sert à créer des ressources dont l’identifiant est assigné par le serveur ou lorsqu’une ressource interne unique est impliquée par l’URI cible (p. ex. `POST /transfers`, mais `PUT /transfers/:id/fulfillment`). Voir la note 3 (RFC 5789).

#### Format des données

Nous privilégions les formats liés à [JSON](http://json.org/) plutôt que XML (voir note 4). Dans certains cas, les formats seront binaires ou XML, selon des normes préexistantes, et seront précisément spécifiés. Les formats binaires doivent avoir une syntaxe formelle pour éviter des ambiguïtés de représentation (jeux de caractères, représentations big-endian ou little-endian des valeurs numériques, etc.).

Les dates et heures utilisées dans les API doivent respecter la norme ISO 8601, avec le profil du document W3C sur les formats date et heure (voir note 5). Cette note W3C doit réduire la complexité et les erreurs lorsque des composants échangent des dates et heures concrètes. Il existera des cas où un format non ISO sera requis par une norme externe, p. ex. dates d’expiration ISO 7813.

Les formats XML standard existants doivent disposer d’un schéma XSD pour le sous-ensemble de profil acceptable dans le projet. Pour des formats particulièrement complexes, on peut utiliser un traducteur de profil commun pour mapper entre le sous-ensemble projet du format standard et le format fil utilisé par un protocole normalisé. Cela limite le couplage aux formats complexes de façon plus maintenable.

Lorsque l’action PATCH est spécifiée pour une ressource, nous utiliserons un format de document de patch cohérent (p. ex. [JSON Patch](http://jsonpatch.com/), voir note 6).

#### Codes de retour

Utiliser les codes HTTP de façon cohérente et conformément à leurs définitions standard. Les codes standard sont définis dans la RFC 2616 (voir note 7).

#### Format d’erreur lisible par machine

L’API doit fournir un résultat d’erreur lisible par machine dans un format JSON bien défini. {À définir : enveloppe de réponse et format des erreurs, défauts et enveloppes de succès. Le design RESTful s’appuie sur les en-têtes pour les erreurs de protocole ; les infos de débogage peuvent aussi transiter dans les en-têtes. Il faut être clair sur l’usage d’une enveloppe et comment elle soutient la communication production normale entre client et serveur.}

#### Versionnement

Les URI d’API doivent inclure un identifiant de version au format `vM` comme premier segment de chemin (où _M_ est la composante majeure du numéro de version). L’API et son identifiant de version doivent respecter la spécification [versionnement sémantique](http://semver.org/) 2.0 pour le versionnement d’API (voir note 8).

Un client doit indiquer le numéro de version majeure dans chaque requête. Un client ne peut pas exprimer l’exigence d’une version mineure précise.

Le numéro de version complet de l’API est indiqué dans l’en-tête de réponse (À définir) pour toutes les réponses réussies et en erreur.

Bien que le contrat de version d’une API soit influencé par les niveaux majeur, mineur _et_ correctif, seul le numéro majeur lie l’API en production — un client de production ne peut pas demander une version mineure ou un niveau de correctif particulier, et un serveur de production n’accepte pas une requête URI qui spécifierait ces éléments supplémentaires.

En revanche, dans les environnements de préproduction, on prévoit qu’une combinaison de suffixes mineur, correctif, pré-release et métadonnées puisse être prise en charge dans les requêtes client (comme défini dans _semver_ [3]) et _peut_ figurer dans les URI de _préproduction_ pour faciliter le développement et l’intégration.

### Il sera peut-être temps de mettre REST de côté

En concevant les API d’interconnexion entre composants et systèmes participants, nous pourrions rencontrer des exigences qui ne correspondent pas exactement au modèle REST pragmatique défini ici. Nous évaluerons au cas par cas et choisirons ce qui sert le mieux les objectifs du projet.

### Exigences non fonctionnelles

En développant les API, nous ferons des choix cohérents sur les exigences non fonctionnelles pour renforcer les objectifs du projet.

1: [http://martinfowler.com/articles/richardsonMaturityModel.html](Richardson%20Maturity%20Model), consulté le 18 août 2016.

2: [https://www.amazon.com/gp/product/0596805829](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829), consulté le 18 août 2016.

3: RFC 5789, _PATCH Method for HTTP_, [https://tools.ietf.org/html/rfc5789](https://tools.ietf.org/html/rfc5789), consulté le 18 août 2016.

4: _Introducing JSON_, [http://json.org/](http://json.org/), consulté le 18 août 2016.

5: [http://www.w3.org/TR/1998/NOTE-datetime-19980827](http://www.w3.org/TR/1998/NOTE-datetime-19980827), consulté le 22 août 2016.

6: _JSON Patch_, [http://jsonpatch.com/](http://jsonpatch.com/), consulté le 18 août 2016.

7: [https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

8: _Semantic Versioning 2.0.0_, [http://semver.org/](http://semver.org/), consulté le 18 août 2016.
