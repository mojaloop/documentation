# BC API Tiers Partie

Le BC (Bounded Context) API Tiers Partie a été implémenté avec l’architecture de référence Mojaloop 2.0 afin de permettre aux opérateurs PISP tiers (généralement des applications) d’interagir avec la plateforme. Veuillez noter que, sauf indication contraire, toutes les références aux BC concernent les différents composants ou contextes délimités (Bounded Contexts, BCs) de Mojaloop.

## Termes

Les termes communs suivants sont utilisés dans ce BC :

| Terme      | Description  |
| ---------- | ------------ |
| **PISP**   | Prestataire de Service d’Initiation de Paiement (par exemple PayPal, ApplePay, GooglePay, etc.) |
| **DFSP**   | Prestataire de Services Financiers Numériques (par exemple Banque, Opérateur de Mobile Money) |
| **Utilisateur** | Client DFSP/PISP (selon indication) |

## Cas d’Usage

**Remarque :** Nos cas d’usage couvrent deux scénarios spécifiques :

| Scénarios   | Description                 |
| ----------- | -------------------------- |
| [Liaison](#linking-scenarios)           | Activités d’administration PISP       |
| [Transfert](#transfer-scenarios)        | Activités d’initiation de transfert PISP |

## Scénarios de Liaison

### Récupération par le PISP des DFSPs supportés

#### Description

Ce flux permet au Switch de gérer les demandes des utilisateurs PISP autorisés pour obtenir la liste des titulaires de comptes DFSP supportés par le système.

#### Schéma de Flux

![Cas d’usage - PISP Gets supported DFSPs](./assets/ML2RA_3PaL_ucPispGetSupportedDFSPs_Feb22a.png)
>Schéma de flux UC : PISP récupère les DFSPs supportés

### Récupération par le PISP de la liste des comptes pour un DFSP + Identifiant

#### Description

Ce flux permet au Switch de gérer les cas où des utilisateurs PISP autorisés souhaitent rechercher le détail de leurs comptes titulaires DFSP à l’aide de leur identifiant titulaire DFSP. Généralement, l’identifiant est intégré dans une application ou un processus d’origine PISP.

#### Schéma de Flux

![Cas d’usage - PISP Gets list of accounts for a DFSP + Identifier](./assets/ML2RA_3PaL-ucPispGetDfspAccList&Id_Feb22-a.png)
>Schéma de flux UC : PISP récupère la liste de comptes pour un DFSP + identifiant

### Demande de Consentement PISP

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé notifie son titulaire de compte DFSP de son intention de lier un ou plusieurs de ses comptes à un PISP via une demande de consentement. Cette demande est traitée par un processus [Émission de Consentement](#dfsp-issue-consent) hors bande, suite à la réception de la réponse à une demande de confirmation d’autorisation. Ce processus établit une relation de confiance entre l’utilisateur PISP, le PISP, et le titulaire du compte DFSP. Le Switch met à jour les détails des comptes participants en conséquence.

#### Schéma de Flux

![Cas d’usage - PISP Consent Request](./assets/ML2RA_3PaL_ucPispConsentRequest_Feb22a.png)
>Schéma de flux UC : Demande de consentement PISP

### Émission de Consentement DFSP

#### Description

Ce flux permet au Switch de gérer les cas où un titulaire de compte DFSP répond à une demande de consentement reçue d’un utilisateur PISP autorisé et authentifié. Le titulaire de compte DFSP émet une demande via le Switch pour que l’utilisateur PISP crée un justificatif d'identité sur son appareil. Une fois le justificatif reçu et vérifié par le titulaire DFSP, le Switch et le compte titulaire DFSP sont mis à jour avec le justificatif utilisateur PISP et les comptes liés, et l’utilisateur PISP est notifié que ses comptes ont été liés avec succès à son profil PISP.

***Remarque :*** *L’émission de Consentement fait suite à une demande de liaison initiée par un utilisateur PISP et suit le flux décrit dans la section [Demande de Consentement PISP](#pisp-consent-request) ci-dessus.*

#### Schéma de Flux

![Cas d’usage - DFSP Issue Consent](./assets/ML2RA_3PaL_ucDfspIssueConsent_Feb22a_P1&2.png)
>Schéma de flux UC : Émission de Consentement DFSP

### Dissociation de comptes : Authentification hébergée par le Hub

#### Description

Ce flux permet au Switch de gérer une demande formulée par un PISP ou un titulaire de compte DFSP autorisé pour révoquer le consentement qui lie un compte DFSP à un profil PISP. Le Switch procède à la dissociation dans le service de recherche de compte, notifie le titulaire DFSP (qui retire la liaison dans son système), et le PISP Hôte qui envoie une notification de complétion à l’utilisateur.

#### Schéma de Flux

![Cas d’usage - Dissocier des comptes - Authentification Hub](./assets/ML2RA_3PaL_ucUnlinkAccounts-HubHostAuth_Feb22-a_P1&2.png)
>Schéma de flux UC : Dissocier des comptes - Auth Hub

### Liaison de Comptes - Échec de Découverte de Compte

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé essaie de lier un compte DFSP à son profil PISP avec une paire DFSP/Identifiant invalide. Le DFSP signale une erreur au Switch, qui notifie le PISP approprié et l’utilisateur reçoit un message pour réessayer avec une autre paire DFSP/Identifiant.

#### Schéma de Flux

![Cas d’usage - Liaison de comptes - Échec découverte compte](./assets/ML2RA_3PaL-ucLinkAccnts-AccntDiscoveryFail_Mar22-a.png)
>Schéma de flux UC : Échec de découverte de compte

### Liaison de Comptes - DFSP Rejette la Demande de Consentement

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé demande la liaison de comptes à son profil PISP, mais où le DFSP refuse le consentement pour une raison quelconque (ex. : le compte sélectionné ne supporte pas la liaison). Le DFSP signale l’erreur et le Switch notifie le PISP concerné ; l’utilisateur PISP reçoit un message (in-app ou autre) l’invitant à réessayer.

#### Schéma de Flux

![Cas d’usage - Liaison de comptes - DFSP Rejette Demande de Consentement](./assets/ML2RA_3PaL-ucLinkAccnts-DfspRejectConsentReq_Mar22-a.png)
>Schéma de flux UC : Rejet DFSP

### Erreur d’Enregistrement de Justificatif

#### Description

Ce flux permet au Switch de gérer les cas où un titulaire de compte DFSP soumet au PISP une demande pour qu'un utilisateur crée un justificatif embarqué sur appareil pour confirmer une demande de consentement, mais le justificatif transmis comporte une signature ou des métadonnées invalides. Le DFSP signale l’erreur, qui est communiquée au PISP, informant ainsi l’utilisateur PISP du rejet du justificatif de consentement.

#### Schéma de Flux

![Cas d’usage - Erreur d’enregistrement de justificatif](./assets/ML2RA_3PaL-ucCredentialRegError_Mar22-a_P1&2.png)
>Schéma de flux UC : Erreur enregistrement justificatif

### Dissociation de comptes - Consentement Introuvable

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé se voit demander de confirmer une demande de consentement (émise via le PISP ou le DFSP) pour dissocier un compte DFSP de son profil PISP. Le Switch soumet la demande au Consent Oracle pour vérification de l’ID du détenteur du consentement. Si l’ID ne peut pas être confirmé, la demande échoue. L’utilisateur PISP est informé via le DFSP ou le PISP que le compte à dissocier n’a pas été trouvé.

#### Schéma de Flux

![Cas d’usage - Dissociation - Consentement introuvable](./assets/ML2RA_3PaL-ucUnlinkAccnts-ConsentNotFound_Mar22a.png)
>Schéma de flux UC : Consentement introuvable

### DFSP Rejette OTP/Tokène d’authentification du PISP

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP, autorisé, souhaite lier un ou plusieurs comptes DFSP à son profil PISP. La demande est transmise au DFSP qui génère un OTP/flux d’authentification web pour l’utilisateur. Si la réponse (tokène) est altérée ou expirée, le DFSP signale l’erreur au Switch, qui informe l’utilisateur PISP de l’échec de la demande de liaison.

#### Schéma de Flux

![Cas d’usage - DFSP rejette OTP/Tokène du PISP](./assets/ML2RA_3PaL-ucDfspRejectsOtpAuthTokenFromPisp_Mar22-a_P1&2.png)
>Schéma de flux UC : DFSP rejette OTP/tokène PISP

### Dissociation de comptes - Échec en aval

#### Description

Ce flux permet au Switch de gérer les cas où la confirmation de consentement pour dissocier un compte DFSP échoue l'étape d’authentification/autorisation du Switch (ex. : erreur API FSPIOP en aval). L’erreur est notifiée au DFSP, qui décide de la suite à donner. L’utilisateur PISP est informé via le PISP que la demande de dissociation a échoué.

#### Schéma de Flux

![Cas d’usage - Dissociation - Échec en aval](./assets/ML2RA_3PaL-ucUnlinkAccntsDownstrmFail_Mar22-a_P1&2.png)
>Schéma de flux UC : Dissociation - échec en aval

## Scénarios de Transfert

***Remarque :*** *Pour alléger la description du flux, le lecteur doit noter que l’API Tiers Partie et le BC Paiements Initiés par des Tiers collaborent pour maintenir les informations sur les participants – l’interaction n’est pas toujours précisée ici, mais se fait ainsi : lorsque le BC API Tiers Partie met à jour l’état d’une transaction et qu’une information participant n’est pas en cache, le BC Paiements Initiés par Tiers la sollicite auprès du BC Gestion Cycle de Vie Participant et la transmet au BC API Tiers Partie pour inclusion dans les données présentées aux DFSP/PISP.*

### Demande de Transaction Initiée par Tiers

#### Description

Ce flux permet au Switch d’autoriser les utilisateurs/applications PISP autorisés à émettre une demande à un DFSP pour effectuer une transaction au nom d’un titulaire de compte (généralement l’utilisateur PISP/app), en faveur d’un ou de plusieurs bénéficiaires tiers. La transaction est soumise à confirmation DFSP auprès du titulaire, et conclue dès la réception de la confirmation. Le Switch, selon les instructions DFSP, gère et met à jour les comptes concernés.

Quelques exemples d’application de l’initiation de paiement par un tiers :

 - Paiements pair-à-pair (ex. : GPay en Inde)
 - Paiement en ligne simplifié pour améliorer l’UX (ex. : PayPal)
 - Logiciels de gestion de paie

#### Schéma de Flux

![Cas d’usage - Demande transaction initiée par tiers](./assets/ML2RA_3PaT-ucThirdPartyInitTransactReq_Mar22-a_P1P2P3bP4.png)
>Schéma de flux UC : Demande de transaction initiée par tiers

### Demande de Transactions Groupées PISP

#### Description

Ce flux permet au Switch d’autoriser les utilisateurs/applications PISP à émettre une demande à un DFSP pour effectuer plusieurs transactions groupées au nom d’un titulaire, typiquement l’utilisateur PISP/app, en faveur d’un groupe de bénéficiaires tiers. La transaction est confirmée auprès du titulaire via le DFSP puis exécutée. Le Switch gère et met à jour tous les comptes selon les instructions DFSP.

#### Schéma de Flux

![Cas d’usage - Remplacer par exemple](./assets/ML2RA_3PaT-ucThirdPartyInitTransactReq_Mar22-a_P1P2P3bP4.png)
>Schéma de flux UC : Demande de transactions groupées PISP

### Paiement vers un PISP – PISP Bénéficiaire

#### Description

Ce flux permet au Switch d’autoriser les utilisateurs DFSP à initier et exécuter des paiements au profit de PISP en tant que bénéficiaires via le Switch. Le flux prend en charge les paiements mono ou multidestinataires PISP.

#### Schéma de Flux

![Cas d’usage - Paiement vers un PISP – PISP bénéficiaire](./assets/ML2RA_3PaT-ucPayToPisp-PispAsPayee_Mar22-b_P1-2.png)
>Schéma de flux UC : Paiement vers un PISP – bénéficiaire

### Échec de la Demande de Transaction Tiers – Recherche de Partie Invalide

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé initie une transaction avec un identifiant de participant invalide. L’erreur est détectée à l’étape de récupération des parties et la demande est automatiquement terminée, l’utilisateur recevant une notification d’échec et la raison.

#### Schéma de Flux

![Cas d’usage - Remplacer par exemple](./assets/ML2RA_3PaT-ucTransactReqFail-BadPartyLookup_Mar22-b.png)
>Schéma de flux UC : Échec de demande transaction – Partie introuvable

### Échec de la Demande de Transaction Tiers – Demande de Transaction Invalide

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP autorisé initie une demande de transaction tierce, confirme correctement les données du bénéficiaire, mais où le DFSP du bénéficiaire ne trouve pas d’accord valide pour la transaction. Le Switch rejette la demande et notifie l’utilisateur initiateur de l’échec et des actions suggérées.

#### Schéma de Flux

![Cas d’usage - Échec Transaction – Transaction Invalide](./assets/ML2RA_3PaT-ucTransactReqFail-BadTransactReq_Mar22-b.png)
>Schéma de flux UC : Échec Transaction – Demande invalide

### Échec de la Demande de Transaction Tiers – Échec FSPIOP Aval

#### Description

Ce flux permet au Switch de gérer les cas où une demande de transaction tierce confirmée échoue côté DFSP lors du processus de devis. Le Switch est informé de la défaillance et transmet la notification à l’utilisateur PISP via son application/processus PISP.

#### Schéma de Flux

![Cas d’usage - Échec de la demande – FSPIOP aval](./assets/ML2RA_3PaT-ucTransactReqFail-DownStreamFspiopFail_Mar22-b-P1-2.png)
>Schéma de flux UC : Échec de la demande – FSPIOP aval

### Échec de la Demande de Transaction Tiers – Autorisation Invalide

#### Description

Ce flux permet au Switch de gérer les cas où un parcours de transaction tierce est initié, puis autorisé par un utilisateur PISP sur demande du titulaire DFSP, et où la réponse à la demande de défi DFSP comporte une signature invalide. Le Switch vérifie et notifie le titulaire DFSP qui annule la transaction et informe l’utilisateur PISP via le Switch et son gestionnaire de profil PISP.

#### Schéma de Flux

![Cas d’usage - Échec – Autorisation invalide](./assets/ML2RA_3PaT-ucTransactReqFail-AuthInvalid_Mar22-a-P1-3.png)
>Schéma de flux UC : Échec transaction – Autorisation invalide

### Demande de Transaction Tiers Rejetée par l’Utilisateur

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP initie et confirme une transaction via son PISP, mais décline la signature finale auprès du DFSP. Après refus, le PISP prévient le DFSP via le Switch, qui annule la transaction et envoie la confirmation d’annulation au PISP initiateur.

#### Schéma de Flux

![Cas d’usage - Transaction rejetée par utilisateur](./assets/ML2RA_3PaT-ucTransactReqFail-rejectedByUser_Mar22-a-P1-3.png)
>Schéma de flux UC : Transaction rejetée par l’utilisateur

### Échec de la Demande de Transaction Tiers – Timeout DFSP

#### Description

Ce flux permet au Switch de gérer les cas où un utilisateur PISP initie et confirme une transaction via son PISP mais ne répond pas dans le délai requis à la demande d’acceptation de devis et de signature DFSP. Passé le délai, le PISP signale le défaut au DFSP via le Switch et le DFSP annule la transaction et notifie l’utilisateur de l’échec de la demande.

#### Schéma de Flux

![Cas d’usage - Timeout DFSP](./assets/ML2RA_3PaT-ucTransactReqFail-dfspTimeout_Mar22-a-P1-3.png)
>Schéma de flux UC : Timeout DFSP

<!-- Notes de bas de page en bas du document -->
<!--## Notes

[^1]: Interfaces communes : [Liste des Interfaces Communes Mojaloop](../../commonInterfaces.md)
-->