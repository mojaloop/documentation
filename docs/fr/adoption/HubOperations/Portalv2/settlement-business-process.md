# Processus de règlement

Il est important de définir un processus métier autour de la gestion des règlements. Le processus de haut niveau suivant sert d'exemple que vous pouvez personnaliser en fonction des besoins spécifiques de votre organisation.

<table>
<caption><strong>Processus métier de règlement</strong></caption>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<thead>
<tr class="header">
<th>Étape</th>
<th>Détails</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1</p></td>
<td><p>L'Opérateur du Hub <a href="settling.html">ferme la fenêtre de règlement et initie le règlement pour les fenêtres sélectionnées à l'aide du Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>2</p></td>
<td><p>L'Opérateur du Hub récupère un rapport de règlement DFSP pour chaque DFSP actif dans la fenêtre de règlement.</p></td>
</tr>
<tr class="odd">
<td><p>3</p></td>
<td><p>L'Opérateur du Hub envoie par courriel le rapport de règlement DFSP aux points de contact désignés de chaque DFSP.</p></td>
</tr>
<tr class="even">
<td><p>4</p></td>
<td><p>Les DFSP examinent leur rapport et rapprochent les transactions avec leurs propres enregistrements dans les meilleurs délais.</p>
<p>Le rapport fournit des informations sur la position de règlement bilatérale du DFSP avec chaque DFSP avec lequel il a effectué des transactions (soit en tant que DFSP Payeur, soit en tant que DFSP Bénéficiaire) dans la ou les fenêtres de règlement en cours de règlement. Il fournit également le total des montants de transfert envoyés et reçus par le DFSP dans la ou les fenêtres de règlement.</p></td>
</tr>
<tr class="odd">
<td><p>5</p></td>
<td><p>L'Opérateur du Hub récupère le rapport bancaire de règlement.</p></td>
</tr>
<tr class="even">
<td><p>6</p></td>
<td><p>L'Opérateur du Hub informe les points de contact de la banque de règlement que le règlement peut être effectué, en partageant le rapport bancaire de règlement.</p><p>Le rapport sert d'instructions de paiement à la banque et fournit la position de règlement bilatérale de chaque DFSP par rapport à chaque autre DFSP ayant effectué des transactions dans la ou les fenêtres de règlement en cours de règlement. Il fournit également le total des montants de transfert envoyés et reçus par chaque DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>7</p></td>
<td><p>La banque de règlement transfère les fonds entre le compte de règlement et les comptes de liquidité des DFSP, conformément aux Positions nettes agrégées indiquées dans le rapport bancaire de règlement.</p></td>
</tr>
<tr class="even">
<td><p>8</p></td>
<td><p>La banque de règlement confirme que les fonds ont été transférés et (puisque l'Opérateur du Hub n'a pas de visibilité sur le solde des comptes détenus à la banque de règlement) partage le solde du compte de liquidité de chaque DFSP.</p></td>
</tr>
<tr class="odd">
<td><p>9</p></td>
<td><p>L'Opérateur du Hub <a href="settling.html">finalise le règlement à l'aide du Finance Portal</a>.</p></td>
</tr>
<tr class="even">
<td><p>10</p></td>
<td><p>L'Opérateur du Hub <a href="monitoring-dfsp-financial-details.html">vérifie les soldes des comptes de liquidité des DFSP par rapport aux soldes affichés dans le portail</a>, et les met à jour si nécessaire, en utilisant la <a href="recording-funds-in-out.html">fonctionnalité « ajouter/retirer des fonds » du portail</a>. Notez que cela peut entraîner un recalcul du NDC du DFSP, ce qui pourrait provoquer le rejet des transactions sortantes du DFSP par le Hub.</p></td>
</tr>
<tr class="odd">
<td><p>11</p></td>
<td><p>L'Opérateur du Hub récupère un rapport de résultat de règlement DFSP pour chaque DFSP.</p></td>
</tr>
<tr class="even">
<td><p>12</p></td>
<td><p>L'Opérateur du Hub informe chaque DFSP du résultat du règlement et du solde de son compte de liquidité en envoyant le rapport de résultat de règlement DFSP à chaque DFSP.</p></td>
</tr>
</tbody>
</table>
