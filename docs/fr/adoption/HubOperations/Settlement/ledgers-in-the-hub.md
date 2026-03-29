# Grands livres dans le Hub

## Gestion du risque

Certains éléments du processus de règlement échappent au contrôle du Hub ; il importe donc qu’un ensemble de contrôles soit en place pour éviter la disparition de fonds et garantir qu’il y ait toujours suffisamment de liquidité pour l’exploitation du Hub. Outre le [Net Debit Cap](settlement-basic-concepts.md#liquidity-management-net-debit-cap), le Hub utilise plusieurs grands livres internes pour gérer le risque et assurer la liquidité. Ces grands livres sont les suivants :

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Grand livre</th>
<th>Définition</th>
<th>Type de transfert enregistré dans le grand livre</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>DFSP Position Ledger</p></td>
<td><p>Suit combien un DFSP doit ou a droit de recevoir. Chaque fois qu’un transfert est traité, la Position dans le Hub est ajustée en temps réel.</p></td>
<td><p>Transfert P2P : transaction de personne à personne entre utilisateurs finaux de DFSP.<br />
<br />
Transfert de règlement : flux de fonds entre DFSP visant à rapprocher les grands livres et à mettre à jour les Positions pour une fenêtre de règlement donnée.</p></td>
</tr>
<tr class="even">
<td><p>DFSP Settlement Ledger</p></td>
<td><p>Compte de liquidité du DFSP tenu à la banque de règlement, reflété dans le Hub. Sert de compte de rapprochement et reflète les mouvements de fonds réels.</p></td>
<td><p>Transfert de fonds (entrant et sortant) : mouvement de fonds initié par le DFSP ou confirmation par la banque de règlement que le règlement est terminé.</p></td>
</tr>
<tr class="odd">
<td><p>Hub Multilateral Net Settlement (HMLNS) Ledger</p></td>
<td><p>Sert à enregistrer l’écriture d’équilibre pour le règlement net entre les DFSP. Après qu’une fenêtre de règlement a été fermée et réglée entre tous les DFSP, son solde revient à zéro.</p></td>
<td><p>Transfert de règlement : flux de fonds entre DFSP visant à rapprocher les grands livres et à mettre à jour les Positions pour une fenêtre de règlement donnée.</p></td>
</tr>
<tr class="even">
<td><p>Hub Reconciliation Ledger</p></td>
<td><p>Garantit que les mouvements entrants et sortants des comptes de liquidité enregistrés dans les grands livres de règlement (Settlement Ledgers) s’équilibrent. Le solde correspond au montant que l’opérateur du Hub administre dans l’ensemble des grands livres de règlement des DFSP participants.<br />
<br />
Fait office de compte de contrôle et suit les mouvements de fonds sur l’ensemble des DFSP Settlement Ledgers (qui reflètent les mouvements de fonds réels).</p></td>
<td><p>Transfert de fonds (entrant et sortant) : mouvement de fonds initié par le DFSP ou confirmation par la banque de règlement que le règlement est terminé.</p></td>
</tr>
</tbody>
</table>

## Principes comptables

En comptabilité, une position nette positive (davantage de débits) est traitée comme un actif, tandis qu’une position nette négative (davantage de crédits) est traitée comme un passif. Le Hub Mojaloop applique ces mêmes principes, mais du point de vue du Hub. Qu’est-ce que cela signifie ?

Un transfert est enregistré par le Hub comme un débit (DR) du côté du DFSP payeur, car le transfert réduit le montant qui doit être reversé à ce DFSP (passif réduit du point de vue du Hub). Ainsi, alors que le DFSP payeur lui-même traitera le transfert comme une augmentation de son passif dans son propre système, le Hub le traite comme une augmentation de son actif.

Le même transfert est enregistré par le Hub comme un crédit (CR) du côté du DFSP bénéficiaire, car le transfert augmente le montant dû à ce DFSP (passif accru du point de vue du Hub).

Enregistrer une transaction sur deux comptes sous forme d’écritures de débit et de crédit opposées (de montants égaux) correspond à ce qu’on appelle en comptabilité la « partie double ».

En appliquant ces principes comptables à un dépôt effectué par un DFSP sur son compte de liquidité, le montant crée un passif du point de vue du Hub (l’argent doit être remboursé). Le montant saisi dans le Hub est donc négatif. Ainsi, à tout moment, le montant que le Hub doit à un DFSP peut être calculé rapidement en additionnant la Position du DFSP au solde de son compte de liquidité. L’écriture en partie double pour le DFSP Settlement Ledger est ajoutée au Hub Reconciliation Ledger.

## Règlement : un exemple

Cette section montre comment une transaction est enregistrée dans les différents grands livres, à l’aide d’un exemple simple.

Prenons l’exemple suivant : DFSP1 envoie 50 USD à DFSP2. Voici comment cette transaction d’exemple est enregistrée dans les grands livres du Hub.

### Étape 1a : Réserver le montant du transfert pour l’émetteur dans le grand livre de Position

Le DFSP Position Ledger sert à suivre les variations de la Position d’un DFSP. Une fois qu’une fenêtre de règlement est fermée et que le processus de règlement est lancé, le montant du transfert est réservé dans les grands livres de Position du Hub tenus pour les DFSP ainsi que dans le Hub Multilateral Net Settlement Ledger. Réserver le montant du transfert pour le DFSP payeur (DFSP1) garantit que les fonds ne peuvent pas être utilisés pour un autre transfert.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP1 Position Ledger</strong></th>
<th colspan="2"><strong>Hub Multilateral Net Settlement Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Étape 1b : Réserver le montant du transfert pour le bénéficiaire dans le grand livre de Position

De même, la Position du DFSP bénéficiaire est suivie via le DFSP Position Ledger du DFSP.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP2 Position Ledger</strong></th>
<th colspan="2"><strong>Hub Multilateral Net Settlement Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Étape 2a : Comptabiliser le montant du transfert pour l’émetteur dans le grand livre de Position

Après la réservation du montant du transfert, l’étape suivante consiste à comptabiliser le montant dans les mêmes grands livres qu’auparavant.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP1 Position Ledger</strong></th>
<th colspan="2"><strong>Hub Multilateral Net Settlement Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Étape 2b : Comptabiliser le montant du transfert pour le bénéficiaire dans le grand livre de Position

La comptabilisation du montant du transfert pour le DFSP bénéficiaire (DFSP2) permet au DFSP d’envoyer des fonds vers d’autres DFSP s’il le souhaite.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP2 Position Ledger</strong></th>
<th colspan="2"><strong>Hub Multilateral Net Settlement Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Étape 3 : Réserver le montant du transfert pour l’émetteur dans le grand livre de règlement

Une fois que les Positions sont dans un état contrôlé et que les écritures de débit et de crédit correspondantes ont été enregistrées dans le Hub Multilateral Net Settlement Ledger, la transaction doit aussi être enregistrée et réservée dans les DFSP Settlement Ledgers et le Hub Reconciliation Ledger afin de garantir que des fonds ne sont pas libérés par inadvertance pour une autre opération de sortie de fonds (Funds-Out).

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP1 Settlement Ledger</strong></th>
<th colspan="2"><strong>Hub Reconciliation Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

### Étape 4a : Comptabiliser le montant du transfert pour le bénéficiaire dans le grand livre de règlement

Une fois que l’argent réel a bougé sur les comptes de liquidité des DFSP, les montants de transfert peuvent être comptabilisés dans les DFSP Settlement Ledgers et le Hub Reconciliation Ledger. Le mouvement de fonds est d’abord enregistré pour le DFSP bénéficiaire.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP2 Settlement Ledger</strong></th>
<th colspan="2"><strong>Hub Reconciliation Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>50 USD</p></td>
<td><p>50 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Étape 4b : Comptabiliser le montant du transfert pour l’émetteur dans le grand livre de règlement

Enfin, le montant du transfert est aussi comptabilisé côté émetteur.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP1 Settlement Ledger</strong></th>
<th colspan="2"><strong>Hub Reconciliation Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>50 USD</p></td>
<td></td>
<td></td>
<td><p>50 USD</p></td>
</tr>
</tbody>
</table>

## Ajouter ou retirer des fonds : un exemple

### Ajout de fonds

Les soldes des comptes de liquidité fluctuant, les DFSP ajoutent des fonds pour financer leurs envois nets ou procèdent à des retraits. Les dépôts peuvent intervenir à tout moment, mais le Hub Reconciliation Ledger doit être mis à jour régulièrement pour éviter des problèmes de rapprochement. Chaque fois qu’une modification est apportée au compte externe (c’est-à-dire au compte de liquidité du DFSP), le Net Debit Cap doit aussi être réévalué.

Dans l’exemple suivant, DFSP1 ajoute 100 000 USD à son compte de liquidité. Voici comment le montant du dépôt est enregistré dans les grands livres du Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP1 Settlement Ledger</strong></th>
<th colspan="2"><strong>Hub Reconciliation Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td></td>
<td><p>100,000 USD</p></td>
<td><p>100,000 USD</p></td>
<td></td>
</tr>
</tbody>
</table>

### Retrait de fonds

Un retrait pouvant avoir une incidence sur le Net Debit Cap et sur la capacité à opérer, le NDC doit être recalculé au regard du nouveau solde du DFSP (le solde ne doit jamais être inférieur au NDC).

Dans l’exemple suivant, DFSP2 retire 100 000 USD de son compte de liquidité. Voici comment le montant du retrait est enregistré dans les grands livres du Hub.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th colspan="2"><strong>DFSP2 Settlement Ledger</strong></th>
<th colspan="2"><strong>Hub Reconciliation Ledger</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
<td><p><strong>DR</strong></p></td>
<td><p><strong>CR</strong></p></td>
</tr>
<tr class="even">
<td><p>100,000 USD</p></td>
<td></td>
<td></td>
<td><p>100,000 USD</p></td>
</tr>
</tbody>
</table>
