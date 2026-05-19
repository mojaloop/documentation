# API Tierce Partie

L’API Tierce Partie est une API destinée aux acteurs qui ne détiennent pas de fonds afin de leur permettre d’interagir via un hub Mojaloop centralisé.
Plus précisément, cette API permet aux Prestataires de Services d’Initiation de Paiement (PISP) d’agir en tant que mandataire lors de l’initiation
des paiements, tout en assurant une authentification forte des utilisateurs.

## Termes

Les termes suivants sont fréquemment utilisés dans la documentation de l’API Tierce Partie :

| **Terme** | **Termes alternatifs et associés** | **Définition** | **Source** |
| --- | --- | --- | --- |
| **Prestataire de Services d’Initiation de Paiement** | PISP, Initiateur de Paiement Tiers (3PPI) | Entités réglementées telles que des banques de détail ou des tiers, permettant aux clients d'effectuer des paiements sans accéder à des comptes bancaires ou à des cartes | [DSP2 (Directive sur les Services de Paiement 2)](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32015L2366) |
| **FSP** | Fournisseur, Prestataire de Services Financiers (FSP), Prestataire de Services de Paiement, Prestataire de Services Financiers Numériques (DFSP) | L’entité qui fournit un service financier numérique à un utilisateur final (consommateur, entreprise ou gouvernement). Dans un système de paiement en boucle fermée, l’Opérateur du Système de Paiement remplit également ce rôle. Dans un système en boucle ouverte, les fournisseurs sont des banques ou des établissements non bancaires participant à ce système. | [UIT-T](https://www.itu.int/dms_pub/itu-t/opb/tut/T-TUT-ECOPO-2018-PDF-F.pdf) |
| **Utilisateur**                           | Utilisateur final                        | Un utilisateur final partagé entre un PISP et un DFSP. Utilisé principalement pour désigner un être humain, mais peut également représenter une machine ou une entreprise par exemple. |
| **Consentement**                          | Lien de compte                           | Représentation d’un accord entre le DFSP, le PISP et l’Utilisateur | |
| **Service d’authentification**            |                                          | Service opéré par le Hub Mojaloop, responsable de la vérification et conservation des consentements, ainsi que de la vérification des signatures des demandes de transaction | |

## Définition de l’API

L’API Tierce Partie est définie à travers les fichiers OpenAPI 3.0 suivants :

- [API Tierce Partie – PISP](https://github.com/mojaloop/mojaloop-specification/blob/master/thirdparty-api/thirdparty-pisp-v1.0.yaml)
- [API Tierce Partie – DFSP](https://github.com/mojaloop/mojaloop-specification/blob/master/thirdparty-api/thirdparty-dfsp-v1.0.yaml)

L’implémentation de ces API dépendra du rôle du participant. Les PISP doivent implémenter l’interface [API Tierce Partie – PISP](https://github.com/mojaloop/mojaloop-specification/blob/master/thirdparty-api/thirdparty-pisp-v1.0.yaml)
pour initier et gérer les opérations de Liaison de Compte et initier des Demandes de Transaction Tierce Partie.

Les DFSP qui souhaitent prendre en charge les opérations de liaison de compte, et être en mesure de répondre aux demandes de transaction tierce partie et de les vérifier doivent
implémenter l’[API Tierce Partie – DFSP](https://github.com/mojaloop/mojaloop-specification/blob/master/thirdparty-api/thirdparty-dfsp-v1.0.yaml).

## Modèles de transaction

Les interactions et exemples de collaboration entre un DFSP et un PISP via l’API Tierce Partie sont disponibles dans les documents suivants sur les modèles de transaction :

1. [Liaison](./transaction-patterns-linking.md) décrit comment un lien de compte et un justificatif peuvent être établis entre un DFSP et un PISP.
2. [Transfert](./transaction-patterns-transfer.md) décrit comment un PISP peut initier un paiement depuis un compte DFSP à l’aide du lien de compte.

## Modèles de données

Le [document sur les modèles de données](./data-models.md) décrit en détail les modèles de données utilisés dans l’API Tierce Partie.
