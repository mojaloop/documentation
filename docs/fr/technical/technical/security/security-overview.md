
<h1>Processus de Gestion des Vulnérabilités Mojaloop</h1>

Contenu :
1. [Introduction](#1-introduction)
2. [Comité de sécurité](#2-commité-de-sécurité)
3. [Gestion d’une vulnérabilité potentielle](#3-gestion-d-une-vulnérabilité-potentielle)
4. [Processus de gestion des vulnérabilités Mojaloop en place](#4-processus-de-gestion-des-vulnérabilités-mojaloop-en-place)
5. [Périmètre](#5-périmètre)

<h3>1. Introduction</h3>

Ce document décrit le Processus de Gestion des Vulnérabilités Mojaloop et fournit des lignes directrices à la communauté Mojaloop pour identifier, signaler, évaluer et traiter les vulnérabilités de sécurité dans les logiciels Mojaloop. En respectant les normes de sécurité reconnues, telles que l’ISO 27001, Mojaloop garantit une approche cohérente pour maintenir la sécurité et la résilience.

Ce processus s’appuie sur les pratiques déjà établies par Mojaloop, garantissant un périmètre clair et des directives fiables pour les adoptants. Il met l'accent sur une gestion responsable des vulnérabilités jusqu’à ce que des correctifs vérifiés soient disponibles et correctement communiqués.

Un processus de gestion des vulnérabilités structuré, transparent et efficace est essentiel pour maintenir la confiance et la protection de l’écosystème Mojaloop.

<h3>2. Comité de sécurité</h3>

Le processus de gestion des vulnérabilités de Mojaloop est soutenu par un "Comité de sécurité" désigné, groupe central chargé de coordonner tous les aspects de la gestion des vulnérabilités. Ce comité supervise notamment :

1. La révision et la validation des signalements de vulnérabilités.
2. La décision d’accepter ou de rejeter les vulnérabilités signalées.
3. La définition des correctifs appropriés et la planification des annonces.
4. La coordination des versions intégrant des correctifs de sécurité.

Le comité de sécurité est composé de contributeurs principaux et de leaders de la communauté, garantissant une gestion efficace et sécurisée des vulnérabilités. Sa structure et ses responsabilités sont conçues pour préserver la sécurité et l’intégrité de l’écosystème Mojaloop.

<h3>3. Gestion d’une vulnérabilité potentielle</h3>

Politique de divulgation des vulnérabilités Mojaloop (CVD) : [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

Le processus par défaut pour gérer une éventuelle vulnérabilité de sécurité dans Mojaloop est décrit dans le lien ci-dessus. Les projets requérant un processus différent doivent le documenter clairement et publiquement.

Le processus concernant les dépendances tierces générales et autres modules open source est détaillé dans le guide [gestion des vulnérabilités de dépendances](dependency-vulnerability-management.md).

<h4>Sécurité pour les membres de la communauté Mojaloop</h4>

Les membres de la communauté Mojaloop et les organisations membres jouent un rôle clé dans la gestion des vulnérabilités, en particulier pour le respect des procédures établies en cas de découverte de vulnérabilités. Voici les étapes attendues :

* Évitez d’entrer les détails des vulnérabilités dans des suivis de bugs publics, sauf si l’accès y est strictement limité.
* Les communications concernant la sécurité doivent être limitées à des canaux privés dédiés. Ces canaux ne servent pas à notifier le grand public.

<h4>Travailler en privé</h4>

Les informations sur une vulnérabilité ne doivent pas être rendues publiques avant qu'une annonce officielle n'ait été faite à la fin du processus. Cela signifie :

* **Ne créez pas de tickets dans des suivis publics (par ex. GitHub/Zenhub) pour suivre l’incident**, car cela le rendrait public.
* **Les messages liés aux commits ne doivent pas révéler la nature sécuritaire du commit.**
* **Les discussions autour de la vulnérabilité, des corrections potentielles et des annonces doivent avoir lieu sur des canaux privés**, tels qu’une liste de diffusion sécurité du projet ou un canal dédié aux mainteneurs.
* Travaillez avec l’équipe sécurité Mojaloop (security at mojaloop dot io) pour suivre le processus CVD : https://docs.mojaloop.io/community/contributing/cvd.html

<h4>Déclarer</h4>

La personne ayant identifié la vulnérabilité (le rapporteur) doit remplir le rapport et l’envoyer par email à : **[security@mojaloop.io](mailto:security@mojaloop.io)**.
Des modèles de rapports peuvent s’inspirer du modèle de bug ici : https://github.com/mojaloop/project/issues .

Liste des problèmes jugés pertinents :
1. Problèmes/vulnérabilités de sécurité dans les services principaux Mojaloop (code applicatif)
2. Problèmes/vulnérabilités de sécurité dans les services de support Mojaloop
3. Vulnérabilités larges ou "jours zéro" dans les dernières versions des dépendances critiques utilisées par les services principaux ou de support (ex : nodejs, kafka, mysql)

Liste des problèmes non critiques ou à faible priorité (réponses pouvant être différées) :

1. Vulnérabilités concernant le site [mojaloop.io](mojaloop.io)
2. Vulnérabilités concernant le site [docs.mojaloop.io](docs.mojaloop.io)

<h4>Accuser réception</h4>

L’équipe sécurité Mojaloop doit envoyer un email d’accusé de réception au rapporteur initial. L’accusé de réception inclura idéalement une copie à la liste de diffusion sécurité privée concernée.

<h4>Analyser et répondre</h4>

L’équipe analyse le rapport et le rejette ou l’accepte.

1. L’information peut être partagée avec des experts du domaine en privé, à condition qu’ils comprennent qu’elle n’est pas destinée à être rendue publique.
2. En cas de rejet, l’équipe explique sa décision au rapporteur, avec copie à la liste de diffusion sécurité concernée.
3. En cas d’acceptation, l’équipe notifie au rapporteur que le rapport est en cours de traitement.

<h4>Résoudre</h4>

* L’équipe convient d’un correctif, généralement sur une liste privée.
* Les détails de la vulnérabilité et du correctif doivent être documentés pour générer des annonces préliminaires.
* Le rapporteur peut recevoir une copie du correctif et de l’annonce en projet pour commentaire.
* Le correctif est intégré sans mention du caractère sécurité dans le message du commit.
* Une version intégrant le correctif est publiée. Plus de détails dans la politique CVD Mojaloop.

<h4>Annonce</h4>

* Après la publication, la vulnérabilité et son correctif sont annoncés publiquement.
* L’annonce doit être envoyée aux destinataires concernés : rapporteur de la vulnérabilité, listes sécurité du projet et éventuellement listes publiques dédiées à la sécurité.

<h4>Clôturer</h4>

Les pages publiques de sécurité du projet doivent être mises à jour avec l’information sur la vulnérabilité afin d’assurer la transparence vis-à-vis des utilisateurs.

<h3>4. Processus de gestion des vulnérabilités Mojaloop en place</h3>

Mojaloop a mis en place une série de processus et outils robustes permettant de gérer les vulnérabilités tout au long du cycle de vie du développement logiciel, en conformité avec les meilleures pratiques du secteur et notamment la norme ISO 27001.

<h4>Gestion des vulnérabilités</h4>

La surveillance continue des composants open source pour les vulnérabilités est intégrée au pipeline CI/CD. Ce processus est automatisé pour évaluer chaque version, commit et pull request, en s’appuyant sur Node Package Manager (NPM) pour l’évaluation des vulnérabilités des dépendances.

<h4>Test de sécurité applicatif statique (SAST)</h4>

Mojaloop utilise plusieurs outils de SAST, offrant une vision détaillée des vulnérabilités dans le code, via l’usage de bases de données publiques de vulnérabilités, parmi lesquelles :

1. **Outils de sécurité GitHub** : dont Dependabot pour le scan de dépendances (basé sur la base de données GitHub Advisory), CodeQL pour l’analyse du code, et Secret Scanning pour éviter l’introduction d’informations sensibles.
2. **SonarCloud** : analyse chaque commit, pull request et version pour la qualité du code et les failles de sécurité, en utilisant notamment les données publiques telles que CVE (Common Vulnerabilities and Exposures).

<h4>SBOM (Software Bill of Materials) et gestion des dépendances</h4>

Un outil SBOM est utilisé pour générer un inventaire des dépendances tierces, permettant :

1. L’identification des vulnérabilités et des questions de conformité de licences ;
2. La génération de rapports réguliers pour les besoins réglementaires et d’audit ;
3. La surveillance permanente des versions de bibliothèques sur tous les dépôts ;
4. L’assurance que seuls les paquets/dépendances bien maintenus sont utilisés et que les obsolètes sont gérés de façon appropriée.

Plus d’informations sur le SBOM dans Mojaloop : https://github.com/mojaloop/ml-depcheck-utility?tab=readme-ov-file#sbom-generation-tool-for-mojaloop-repositories 

<h4>Sécurité des conteneurs</h4>

Les images des conteneurs sont analysées pour les vulnérabilités via Grype avant chaque publication. Grype est configuré selon les meilleures pratiques, et des configurations encore plus strictes sont recommandées pour les adoptants. Configuration Grype de l’Orb CI utilisée par Mojaloop : https://github.com/mojaloop/ci-config-orb-build?tab=readme-ov-file#vulnerability-image-scan-configuration .

<h4>Conformité des licences</h4>

Un outil automatisé de scan de licences s’assure que seules les composantes à licence compatible soient utilisées. Les contrôles de conformité sont intégrés au processus CI/CD, bloquant la fusion ou le déploiement du code non conforme.

<h4>Provenance des images</h4>

Depuis la version Mojaloop v17.1.0, les chart helm Mojaloop sont signés lors de la publication et peuvent être vérifiés lors de l’installation/le déploiement (cette fonctionnalité est supportée nativement par Helm), ce qui assure la provenance des artefacts associés. À l’avenir, cela pourra être étendu à d’autres artefacts comme les images.

<h4>Processus sécurité CI/CD de Mojaloop</h4>

Mojaloop dispose d’un pipeline CI/CD intégrant automatiquement des contrôles de sécurité à toutes les étapes du développement, garantissant ainsi une application systématique de la sécurité sans intervention manuelle. Des règles de protection des branches imposent des contrôles continus à chaque commit, pull request et version.

Intégration sécurité CI/CD :

1. **Sécurité des conteneurs** : …
2. **Conformité des licences** : …
3. **Analyse des vulnérabilités des dépendances** : …

Toutes les vulnérabilités critiques sont consignées et le pipeline bloque la publication des images ou paquets concernés tant que ces problèmes ne sont pas résolus. Ces mécanismes automatisés dans le pipeline garantissent un code testé en continu, sécurisé et conforme, maintenant ainsi un haut niveau de sécurité au sein du processus de développement.

<h4>Divulgation coordonnée des vulnérabilités (CVD)</h4>

Mojaloop applique une démarche CVD, garantissant aux parties concernées un délai suffisant pour traiter et corriger les vulnérabilités avant toute divulgation publique.

Politique de divulgation Mojaloop (CVD) : [https://docs.mojaloop.io/community/contributing/cvd.html](https://docs.mojaloop.io/community/contributing/cvd.html) 

<h4>Rapport et conformité</h4>

Des rapports complets sont générés après chaque analyse, détaillant les résultats, actions correctives et leur efficacité.

Tous les rapports sont archivés pour audit et conformité, garantissant la transparence et la responsabilité.

Le rapport provenant du scan de licences au niveau helm est intégré aux notes de version Mojaloop (ce qui confirme le contrôle réussi des licences et garantit la présence de licences autorisées uniquement). Le fichier résumé des licences est joint aux notes de version (en bas de page) : [https://github.com/mojaloop/helm/releases/tag/v17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) en fournit un exemple.

Les rapports d’analyse d’images sont disponibles pour consultation dans l’outil CI (CircleCI), permettant d’enregistrer la réussite ou l’échec du contrôle (le pipeline ne poursuit que si cette étape est validée). Par exemple, un résultat Grype est consultable ici : [https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts](https://app.circleci.com/pipelines/github/mojaloop/account-lookup-service/2165/workflows/d420ef53-85a7-46d3-af1e-1527baf3a207/jobs/16509/artifacts) (à titre d’exemple : cette référence peut devenir obsolète avec le temps).

<h3>5. Périmètre</h3>

Le processus de gestion des vulnérabilités Mojaloop s’applique à tous les composants faisant partie de la publication Helm Mojaloop. 

Cela inclut :

1. Tous les composants et services principaux explicitement définis dans les charts Helm Mojaloop.
2. Les dépendances comprises dans la release Helm Mojaloop, automatiquement scannées dans le cadre du processus de gestion des vulnérabilités.

Exclusions :

1. Les dépôts ne faisant pas partie de la release principale Mojaloop sont considérés comme non production et exclus du processus de gestion des vulnérabilités.
2. Les composants externes requis pour un déploiement Mojaloop typique (par ex. MySQL, Redis, MongoDB, Kafka) ne sont pas maintenus par la Fondation Mojaloop et sont exclus du processus de gestion des vulnérabilités spécifique au code applicatif Mojaloop, bien qu’ils relèvent de la gestion générale des vulnérabilités (en tant que dépendances OSS tierces).

Cette approche garantit la sécurité constante des composants de base Mojaloop, tout en définissant clairement la limite de responsabilité autour des dépendances externes et en fournissant des lignes directrices concernant tous les autres paquets OSS (internes ou tiers), dépendances et outils.

<h2></h2>
