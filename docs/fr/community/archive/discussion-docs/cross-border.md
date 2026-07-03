**Réunion du fil transfrontalier**

10 et 11 mars (Londres / à distance)

**Prochaines étapes pour le PI :**

•  Proposition sur la requête CNP, l’hébergement des services oracle et les objectifs mondiaux — Adrian, Michael

•  Identifiants composés, façon de les capturer dans le système ou de les exprimer dans les API — ouvert

•  Quelles informations figurer dans le modèle de données ou la liste d’extensions — Michael

•  Suite avec SWIFT sur les exigences — Matt

**Points ouverts :**

•  Finaliser les exigences CNP

•  Il faut agréger les informations et les regrouper en une seule requête ; ils devront signer séparément

•  Finaliser le fait que le FXP gère les taux de change, les règlements et ce qui expire quand

•  Les CNP peuvent étendre cela et définir des règles de schéma supplémentaires

•  Le FXP gère les erreurs d’arrondi

•  Le FXP garantit un taux donné

•  Comment intégrer des acteurs non Mojaloop au schéma ?

•  Comment intégrer Mojaloop et un schéma Mojaloop pour des paiements PVT complets — groupe de travail avec Michael, Adrian, Sybrin, autres au besoin

•  Comment gérer les demandes pour motifs réglementaires

•  Étudier les correspondances d’identifiants (comptes Pathfinder / mobile vers identifiants uniques DFSP)

•  Étudier la certification (hachage et PKI)


Notes détaillées de réunion :
Jour n°1 :
	- Réponse de devis
	
		○ Comment coder le SLA dans la réponse
	
		○ Demander à un 2e CNP de router
		
		○ Dans l’API — il faut empaqueter comment y parvenir
		
		○ En tant que CMP dans Mowali, si je renvoie une réponse de devis, le schéma a des implications
		
		○ Suivre tout le parcours du payeur au bénéficiaire
		
		○ Limiter la participation du CNP — il doit être le dernier saut
		
			§ Comment définir les exigences d’un CNP ?
	
	- Format des messages
	
		○ Syntaxe HTTP
		
		○ Parti du schéma Mojaloop
		
			§ Évoluer vers le fait que le CNP gère la conversion
		
		○ Version SWIFT
		
		○ Sécurité — TLS
		
		○ En-tête / contenu chiffrés en JWS
	
	- Système de détail
	
		○ Hors réseau — envoi vers un hub
	
	- Modèle de données
	
		○ Structure : façons d’ajouter de nouvelles informations, routes différentes, etc.
		
		○ Confidentialité : visibilité et sécurité — accessible seulement aux personnes autorisées
		
		○ Contenu du modèle de données
	
	- Le transfert passe par le switch (mouvement d’argent)
	
		○ Dans Mowali — les montants sont exprimés mais le taux est important car il impacte les règlements
	
		§ Flux de données — on ajoute le taux quand on renvoie le devis
		
		§ Ajouté dans la liste d’extensions — doit-il faire partie du standard ?
	
		§ Montant envoyé et reçu (devises différentes)
	
	- Élément de données
		
		○ Frais pour chaque participant
		
		○ Le DFSP payeur les additionne
		
		○ Élément de frais pour la transaction
	
	- Proposition

		○ Service de recherche de compte
	
			§ Liste des FSP locaux
		
		○ Switch — doit maintenir l’état et les requêtes de recherche
	
			§ Doit ressembler à un transfert domestique pour l’émetteur
			
			§ Collecter les informations et les renvoyer
		
		○ CNP — faire des hypothèses pour satisfaire les exigences
		
			§ Faut-il voir la route
			
			§ Collecter des informations différentes en aval
			
			§ Les FSP émetteurs doivent savoir qui est le bénéficiaire
			
		○ Le CNP doit agréger les informations et les regrouper en une seule requête ; signatures séparées
			
			§ Condition et exécution font partie d’une structure PKI
			
			§ S’il y a plus d’un CNP — il faut s’assurer que le DFSP bénéficiaire est certain du DFSP payeur — connexions
			
			§ Le CNP doit tout savoir, reporting réglementaire
			 
		○ Faut-il dupliquer la structure dans un transfert inter-réseaux ?
			
			§ Empêcher un partenaire indésirable de se joindre
			
			§ Faire confiance au CNP pour respecter ses SLA
		
		○ Mojaloop vers un autre schéma — nous n’avons pas le contrôle
		
			§ Exiger qu’ils confirment la réception
			
			§ Comment le savoir
			
			§ Comment savoir que la personne en bout de chaîne a reçu l’argent
		
		○ Autorité de signature externe pour confirmer la réception des fonds
		
			§ Si votre schéma veut participer au transfrontalier, tous les participants doivent être signés
			
			§ Clé publique — pour rejoindre un réseau Mojaloop il faut émettre des clés publiques
			
			§ Autorité centrale de certification
			
			§ Besoin d’une structure PKI en place
		
		○ Comment intégrer des acteurs non Mojaloop au schéma ?
		
			§ Comment intégrer Mojaloop et un schéma Mojaloop pour des paiements PVT complets — groupe de travail avec Michael, Adrian, Sybrin, autres au besoin
			
			§ Identifier les participants — FSP, DFSP — tous signés
			
			§ Parties — utilisateurs finaux (Bob / Alice)
			
			§ Transaction unique (avec plusieurs transferts)
			
			§ Personne n’engage ses fonds tant que tout le monde n’est pas satisfait
			
			§ Comment étendre Mojaloop et un schéma non Mojaloop
		
		○ Certification
		
			§ Hachage et PKI
		
			§ Réseau or et argent
	
			§ Nouveau partenaire — en ligne sur le réseau
			
			§ Le schéma décide des exigences sur le réseau
			
			§ Certificat auto-signé
		
		○ Liquidité
		
			§ Le FXP fait la gestion de position
			
			§ Quelles exigences imposer à un FXP
			
			§ L’argent mobile a moins de flexibilité
			
			§ Règles qui s’appliquent entre schémas
		
		○ Le FXP doit gérer les règlements, ce qui expire quand, etc.
		
			§ Le FXP doit gérer le manque de validité des devis
			
			§ Permettre au FXP de rejeter les requêtes
	
		○ Comment gérer les demandes pour motifs réglementaires
		
			§ Il existe un dictionnaire
			
				□ Exigence de partager le KYC ?
			
				□ On peut demander beaucoup de choses — à la charge du participant
				
				□ Besoin d’accord sur le schéma de base

**Jour n°2 :**

	- Données du switch
	
		○ Numéros de compte
		
		○ Liste noire, liste blanche (supervision et blocage)
		
		○ Garder la simplicité
		
		○ Hub
		
		○ Service annexe pour ceux qui peuvent faire cela
		
			§ Capture de données mobiles
			
			§ Sidecar
			
			§ Processus numérique
			
			§ Services à valeur ajoutée pour le hub (service géré)
	
	- Switch — doit maintenir l’état et les requêtes de recherche
	
	- Le CNP peut être un DFSP ordinaire
	
		○ Tous les DFSP supportent tous les cas d’usage
		
		○ Participants complets (peuvent fournir seulement un service CNP ou FXP)
	
	- Définition et exigences du FXP
	
		○ FXP — exiger taux / frais dans le service de devis — besoin d’un taux industrie standard
		
			§ Les CNP peuvent étendre et définir des règles de schéma supplémentaires
		
		○ Le FXP gère les erreurs d’arrondi
		
		○ Garantir un taux donné
		
		○ Gérer le règlement entre schémas
		
		○ Taux de change
		
		○ Devrait permettre aux acteurs qui ne font que du FX
		
		○ Cas limites en cas d’échec
		
			§ Détails dans les messages d’erreur pour localiser les erreurs
		
		○ Le FXP doit renvoyer les bonnes informations
		
			§ Comment les messages circulent
			
			§ Cas limites — partager ce qui est fait à ce jour
			
			§ Jo a une API fonctionnelle — identifiée
			
			§ Modifier le devis (intercepter le devis) —
			
			§ Liste d’extensions KYC — étendu le devis pour cela
			
			§ Les taux sont dans la liste étendue (sont la liste)
			
			§ Où le FXP s’applique-t-il ?
			
			§ Que faire des frais en aval
			
				□ (le DFSP bénéficiaire prend la place de l’agrégation)
	
	- Comment gérer la résolution d’identifiants
	
		○ 2 types d’identifiants
		
			§ Globaux (passés au CNP) — pour obtenir une réponse
			
			§ Locaux — on attend que l’utilisateur fournisse
		
		○ Dans Mojaloop nous utilisons les identifiants comme proxy
		
		○ Les numéros marchands peuvent être spécifiques à un schéma
		
		○ Plusieurs identifiants pour un seul compte
		
		○ Comment identifier de façon unique le compte ?
		
		○ S’appuyer sur le CNP (restreindre chaque identifiant dans ce schéma)
		
		○ Quelles structures mettre en place
		
		○ Identification passeport — espaces réservés
		
		○ Cartographier comptes Pathfinder / mobile vers identifiants uniques DFSP
		
			§ Service — compte principal est X
			
			§ Chaque pays a un service qu’il fournit
			
			§ Chaque CNP comprend le schéma d’adresse
			
			§ Identifiant global — savoir quelles voies utiliser
		
		○ Envoie un get parties au switch
		
			§ L’ALS ne les a jamais connus
			
			§ 2 voies
			
				□ Voie globale (pathfinder et conversion vers BIC)
	- CNP

		○ N’héberge rien
	
		○ Route via le CNP — solliciter d’autres acteurs
		
		○ Construire des routes alternatives
	
	- Pas de registre global
	
		○ Bénéficiaire ultime
		
		○ Communication établie
		
		○ Défi : deux DFSP pourront-ils partager une communication directe — ce sera difficile ?
	
	- Le switch a des schémas
	
		○ Un opérateur de hub suivant les règles du système peut autoriser les noms de FSP selon ces règles
		
		○ La technologie ou l’Admin API elle-même ne restreint pas les noms (sauf longueur, type, caractères, etc.)
		
		○ BGP : Border Gateway Protocol
	
	- Interroger chaque CNP puis optimiser, matrice de route globale — objectif : ne pas interroger le CNP directement

• Comment se connecter à Mojaloop ?
	
	- Tout service financier peut se connecter à Mowali
	
	- Règles techniques et du schéma
	
	- Réglementaire

	- Comment assigner les choses ? — personne ne connaît les étapes
	
	- API Mojaloop — comprendre cela.
	
	- 2 instances Mojaloop — TIPs et Mowali
	
		○ WOCCU, Asie, US — demande d’instance
		
		○ On repousse encore les limites
	
	- À quoi ressemble une intégration
	
		○ Besoin de bac à sable, simulateurs
		
		○ Approche standard

• Service de paiement par instance

	- Faire circuler les flux en temps utile
	
	- Besoin de grands livres en temps réel ; que se passe-t-il s’ils sont hors ligne ?
	
	- Exception pour hors réseau (les banques profitent du float)

• Processus de découverte (FSP émetteur)

	- Le switch détermine s’il doit contacter un FXP
	
	- Dans quelle devise le compte bénéficiaire peut recevoir
	
	- Recherches multiples
	
	- Modèle de données — ensemble de comptes, avec une devise par DFSP


Participants :
	
	- Mike, Patricia — Thume
	
	- Michael R, Rob R, Sam — Modusbox
	
	- Kim, Lewis — Crosslake
	
	- Rolland, Greg, Phillip — Sybrin
	
	- Vanburn — Terrapay
	
	- Megan, Simeon — Virtual
