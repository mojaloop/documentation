# Notes de réunion des Scrum-of-scrum hebdomadaires

## Réunion OSS Scrum du jeudi **7 mai** 2020

1. Coil - Don :
   a. Performance : Problème de « Grand Écart » ; modifications sur cs-stream ; résultats modifiés ; préparation d’un document récapitulant les changements pour examen / révision technique ; travail de Joran sur le traitement concurrent des messages sur les topics Kafka → essais à venir ; observation d’un débit de 40-50% ;
   b. Adaptateur LPS : Collaboration avec Renjith (Applied Payments) ; mise en place d’un labo / environnement pour les équipes partenaires ; exploration d’une collaboration avec le GSMA lab.
2. Crosslake - Lewis :
   a. Performance : Rapport présenté à Confluent avec Nakul, fin de l’engagement ; diffusion des documents produits par Nakul ;
   b. PISP : Discussions sur la conception en cours ainsi que l’implémentation ;
   c. Versionnage : Définition du périmètre pour les déploiements ZDD ;
   d. Problèmes liés au lancement officiel : problèmes DNS - gérés et résolus.
3. ModusBox - Sam :
   a. Performance : Migration / standardisation des changements de performance de PI-9 vers la master (pas tous les PoC) ; travail sur les objectifs et la stratégie pour PI10 ;
   b. Core-team : Transferts groupés - début d’accompagnement sur sdk-scheme-adapter ;
   c. Maintenance (Corrections de bugs) :
     i) Accents dans les noms - en cours ;
     ii) Simulateur Mojaloop sur déploiements AWS - presque fini, travail sur les scripts de QA (sur ‘dev2’ - deuxième environnement) ;
   d. Outil de test : Actuellement disponible pour tests - toutes les ressources de l’API ML FSPIOP sont supportées. Rapports générés. Ajout d’options en ligne de commande et meilleure portabilité en cours ;
   e. CCB : Publication de la spécification v1.1 cette semaine - définition de l’API et Swagger correspondant (OpenAPI).
4. Virtual / Fondation Mojaloop - Megan :
   a. Lancement de la Fondation Mojaloop ;
   b. Paula H - Directrice exécutive de la Fondation Mojaloop.
5. Fondation Mojaloop - Simeon :
   a. Demande de retours sur l’enquête communautaire ;
   b. Hackathon envisagé dans le courant du début juin, en collaboration avec Google ;
   c. Lancement la semaine prochaine de la Newsletter Mojaloop avec des articles intéressants comme la Spec v1.1 ML FSPIOP, la release Helm v10.1.0, etc.

## Réunion OSS Scrum du jeudi **16 avril** 2020

1. Coil :
   a. Don C : Performance - résultats préliminaires - quelques chiffres obtenus - résultats individuels sur les handlers, comparaison en cours, focus sur la base de données - un tiers du temps d’un parcours dédié à la perf ;
   b. Don C : HSM : L’équipe de Renjith a présenté la démo pour la semaine prochaine - préparation de l’événement.
2. Crosslake :
   a. Lewis D : PISP - Planification de sprint - itération sur les designs ;
   b. Lewis D : Hackathons - Discussions de concepts avec Innocent K (HiPiPo) ;
   c. Lewis D : Accès au GSMA lab – pour essais ;
   d. Lewis D : Versionnage : préparation du deck pour PI10 ;
   e. Kim W : Mise à jour globale du flux performance - atelier avec Confluent ;
   f. Kim W : Mise à jour du flux performance - Pedro prépare une proposition et une présentation ;
3. Mifos :
   a. Ed C : Préparation Démo pour les réunions PI10 ;
4. Virtual :
   a. Megan : Préparation de l’événement PI10 & logistique ;
5. DA :
   a. Nico : Discussion autour du problème PISP dont Michael sera le responsable ;
6. Core team :
   a. Sam K : Performance : Préparation des métriques ; executions de tests pour établir base de référence après migration d’améliorations sur master ;
   b. Sam K : Problème des accents dans les noms - implémentation en cours ;
   f. Sam K : Implémentation de Settlements V2 par OSS-TIPS en cours - QA effectuée pour l’itération actuelle ;
   g. Sam K : Outil de test : amélioration de la couverture des tests unitaires. Ajout d’assertions pour divers endpoints ;
   i. Sam K : CCB : V1.1 de la définition de l’API ML FSPIOP - premier brouillon terminé, relectures en cours ;
7. Communauté Mojaloop :
   a. Mise à jour communautaire par Simeon ;

## Réunion OSS Scrum du jeudi **9 avril** 2020

1. Coil :
   a. Don C : Tests de performance – sous-utilisation des ressources – optimisations à prévoir ;
   b. Don C : Intégration HSM – préparation de la démo ;
   c. Don C : Adaptateur Legacy – mise à jour docs – recherche de retours ;
2. Crosslake :
   a. Kim W : Réunion FRMS ce matin – propositions faites ;
   b. Kim W : Mise à jour sur les réunions PI10, inscriptions – réponses aux questions ;
   c. Lewis D : PISP : planification avancée – travail sur les stories, items, discussions sur les designs Oauth, Fido ;
   d. Lewis D : Performance : Discussion avec Pedro sur PoC pour changements d’architecture, Event Sourcing, CQRS, etc ;
   e. Lewis D : Standards du code – mis à jour ;
   f. Lewis D : Qualité & sécurité du code : Utilisation de HSM, démo, sécurité dans l’écosystème OSS ;
   g. Lewis D : Scans de conteneurs fonctionnels – collaboration avec Victor, premiers benchmarks ;
   h. Lewis D : Pour finir – mise à jour sur le versionnage ;
3. Mifos :
   a. Ed C : Travail sur Payment Hub, intégration avec Kafka, transactions ML fonctionnelles, usage d’Elastic Search pour le monitoring des opérations back-office ;
   b. Ed C : Préparation Démo pour PI10 ;
4. Core team :
   a. Sam K : Performance : Rédaction de rapports, migration de métriques et autres améliorations sur master ;
   b. Sam K : Performance : Finalisation de la dernière série de tests ; feuille de route Phase4 et lancement ;
   c. Sam K : Support communauté : correction de bugs (plusieurs gros sujets réglés), clarification des décisions d’implémentation, etc. ;
   d. Sam K : Support des paiements commerçants – tests et validation de l’usage « Request to Pay », standardisation en cours ;
   e. Sam K : Problème des accents dans les noms – en cours ;
   f. Sam K : Implémentation Settlements V2 par OSS-TIPS en cours ;
   g. Sam K : Outil de test : Ajout d’assertions pour ressources API, JWS fait, mTLS en cours ;
   h. Sam K : Outil de test : rédaction d’un guide d’utilisation et ajout de tests pour Golden Path ;
   i. Sam K : CCB : V1.1 de l’API ML FSPIOP – premier brouillon prêt, attente de relecture ;

## Réunion OSS Scrum du jeudi **2 avril** 2020

1. Mifos :
   a. Ed C : L’équipe continue de développer Payment Hub EE, focus sur l’UI opérationnelle, capacités pour l’arrière-plan DFSP, cadre de gestion des erreurs ;
2. Coil :
   a. Don C : Performance – installation terminée et démarrée – sur GCP – latence élevée, besoin de dépannage, possible recours à d’autres contributeurs pour aider ;
   b. Don C : ATM – OTP – chiffrement ;
3. Crosslake :
   a. Kim W : Agenda PI10 rédigé – envoi d’email prochainement ;
   b. Kim W : Calendrier PI10 : mar-ven ; 11h-16h GMT – événement en ligne ;
   c. Lewis D : Réunion performance plus tard aujourd’hui – approfondissement de l’architecture ;
   d. Lewis D : Versionnage – En cours ;
   e. Lewis D : Qualité & sécurité du code – architecture sécurité générale, HSM traité par Coil ;
   f. Lewis D : Mojaloop dans un Vagrant box – en cours ;
4. Core team :
   a. Miguel dB : Performance : finalisation du travail de perf – près de 900 TPS bout-en-bout ; actuellement, essai d’identifier/comprendre une unité cible pour ce niveau de performance ;
   b. Sam K : Performance : finalisation de la dernière série de tests ; feuille de route Phase4, lancement ;
   c. Sam K : Support communauté : corrections de bugs (certains points majeurs résolus), clarification de décisions d’implémentation, etc. ;
   d. Sam K : Support paiement commerçant – standardisation en cours – corrections dans /authorizations ;
   e. Sam K : Accents dans les noms – en cours ;
   f. Sam K : Implémentation Settlements V2 par OSS-TIPS en cours ;
   g. Sam K : Outil de test : Ajout d’assertions pour ressources API, JWS en cours ;
   h. Sam K : CCB : V1.1 de l’API ML FSPIOP – rédaction en cours ;

## Réunion OSS Scrum du jeudi **26 mars** 2020

1. DA : Nico – Sujet versionnage discuté par Lewis, Matt, Sam ;
2. Crosslake :
   a. Kim W : Finalisation de l’agenda – lundi à vendredi ;
   b. Kim W : Disponible pour ceux qui souhaitent présenter/intervenir ;
   c. Kim W : Préparation de lectures préalables ;
   d. Kim W : Atelier Fraude & LBC : Justus postera un résumé et les notes sur GitHub après l’atelier ;
   e. Lewis D : Atelier performance / approfondissement probablement lundi ;
   f. Lewis D : Discussions Design PISP en cours ;
   g. Lewis D : Flux qualité et sécurité du code : i. Recommandations sécurité conteneurs Docker. ii. Portée GDPR pour Mojaloop ;
3. Mifos :
   a. Ed C / Istvan M : Poursuite de la création du Lab ;
   b. Ed C / Istvan M : Fineract, nouvelle instance de Payment Hub – bonne progression ;
   c. Ed C / Istvan M : Travail sur la supervision opérationnelle du backend (débogage et supervision back-office, etc) ;
4. Simeon O – Community Manager présent ;
5. Core team :
   a. Sam K : Performance : Phase-3 finalisée. Objectifs immédiats en cours d’atteinte – toujours en cours – feuille de route Phase4, lancement ;
   b. Sam K : Support de la communauté : correction de bugs, clarification des décisions d’implémentation, etc. ;
   d. Sam K : Support paiement commerçant – standardisation en cours – ajout de métriques, ajout du framework d’événements ;
   e. Sam K : Problème accents dans les noms – discussion, conception de solution ;
   f. Sam K : Mise en œuvre Settlements V2 par OSS-TIPS en cours ;
   g. Sam K : Outil de test : Ajouts d’assertions pour les ressources API, JWS en cours. Rédaction du guide d’utilisation en cours ;
   h. Sam K : CCB : Rédaction en cours de la V1.1 de la définition d’API ML FSPIOP ;

## Réunion OSS Scrum du jeudi **19 mars** 2020

1. Coil :
   a. Don C : Analyse de la performance, optimisations réseau (éviter les doubles vérifications, etc.) ;
   b. Adrian hB : Renjith & Matt travaillent sur la traduction ISO20022 (vers JWEs, etc.) – démo prévue sur l’utilisation du HSM ;
2. Crosslake :
   a. Kim W : Finalisation des actions issues du Mid-PI Workshop, items de suivi ;
   b. Kim W : L’événement communautaire d’avril sera virtuel ; événement de planification à confirmer – suggestions bienvenues ;
   c. Lewis D : Performance – inclusion de Don dans d’autres discussions ;
   d. Lewis D : Qualité du code – proposition des exigences GDPR ;
   e. Lewis D : Versionnage – premier brouillon fait en PR – sera présenté au DA la semaine prochaine ;
3. Mifos :
   a. Ed C, Istvan M : Payment Hub, environnement sur Azure ;
   b. Ed C, Istvan M : Les transactions passent désormais ;
   c. Ed C, Istvan M : Prochaine phase : implémentation d’écrans back-office pour utilisateurs métier ;
   d. Ed C, Istvan M : Atelier avec Google sur PISP ;
4. Core team :
   a. Sam K : Performance – combiner prepare+position handler et fulfil+position handler, caractérisation en cours ;
   b. Sam K : Performance – travail pour comprendre à quoi ressemble une unité d’infrastructure pour un déploiement Mojaloop ;
   c. Sam K : Standardisation du service de requêtes transactionnelles : ajout du framework d’événements, ajout de métriques en cours ;
   d. Sam K : Support communauté : correction de bugs, gestion des mises à jour, prise en charge des accents pour les noms, etc. ;
