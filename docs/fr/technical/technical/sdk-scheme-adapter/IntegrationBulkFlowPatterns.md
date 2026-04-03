# Intégration des systèmes *core banking* via les transferts groupés

Il existe trois modèles pour construire l’intégration du DFSP payeur dans le cadre des transferts groupés.

1. Intégration de transfert en **trois phases**. Aligné sur les trois phases de transaction Mojaloop : découverte, accord et transfert.
1. **Intégration double API**. Ce modèle est détaillé dans le diagramme de séquence ci‑dessous. Il regroupe les phases Découverte et Accord en une première phase ; les résultats sont présentés au payeur pour confirmation ; la phase Transfert s’exécute ensuite en seconde phase.

![Modèle de flux d’intégration double API — transferts groupés, DFSP payeur](./assets/sequence/PayerDFSPBulkDoubleIntegrationApiPattern.svg)

1. **Intégration API unique**. Ce modèle est détaillé dans le diagramme de séquence ci‑dessous. Les trois phases sont regroupées en un seul appel de transfert synchrone.

![Modèle de flux d’intégration API unique — transferts groupés, DFSP payeur](./assets/sequence/PayerDFSPBulkSingleIntegrationApiPattern.svg)


::: tip Validation en deux temps
Tous les modèles d’intégration DFSP payeur prennent en charge une validation en deux temps (phase de réservation puis phase d’engagement).
:::

## Exigences côté DFSP bénéficiaire

Les évolutions du SDK Scheme Adapter garantissent que les DFSP ayant déjà intégré Mojaloop **n’ont pas** à modifier leur intégration pour **recevoir** des transferts groupés : le SDK Scheme Adapter reçoit les messages de transfert groupé et les convertit en messages de transfert individuels. Si un DFSP bénéficiaire souhaite tirer parti du message de transfert groupé, une intégration dédiée aux messages *bulk* peut être mise en œuvre au cas par cas.


## Modèle de flux idéal côté bénéficiaire (groupé)

Ici, les contrôles LBC/FT et les frais sont traités en phase d’accord, et la phase de transfert comporte une réservation puis un engagement.

![Modèle d’intégration idéal — transferts groupés, DFSP bénéficiaire](./assets/sequence/PayeeDFSPBulkIdealPattern.svg)

## API éditeur limitée à un seul appel

Si le système *core banking* ne propose qu’un **seul** appel API pour toutes les vérifications et phases du transfert, c’est le modèle le plus couramment supporté.

### Appel du transfert sur la notification PATCH

![Intégration DFSP bénéficiaire lors de la notification PATCH (groupé)](./assets/sequence/PayeeDFSPBulkSingleIntegrationApiOnPatch.svg)

Toute défaillance **après** la notification PATCH (étape **19**) peut entraîner une erreur de réconciliation. On peut y remédier en prévoyant des mécanismes de compensation (par exemple initier un transfert de remboursement en cas d’erreur après l’étape 19).
