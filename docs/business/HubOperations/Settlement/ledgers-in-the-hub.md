# Ledgers in the Hub

## Managing risk

Elements of the settlement process sit outside the control of the Hub, so it is important that there are a number of controls in place to prevent funds disappearing and to ensure there is always liquidity to support operation of the Hub. Other than the [Net Debit Cap](settlement-basic-concepts.md#liquidity-management-net-debit-cap), the Hub employs a number of internal ledgers to manage risk and ensure liquidity. These ledgers are as follows:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Ledger</th>
<th>Definition</th>
<th>Type of transfer recorded in ledger</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>DFSP Position Ledger</p></td>
<td><p>Tracks how much a DFSP owes or is owed. Every time a transfer is processed, the Position in the Hub is adjusted in real time.</p></td>
<td><p>P2P transfer: A person-to-person transaction between DFSP end users.<br />
<br />
Settlement transfer: The flow of funds between DFSPs aimed at reconciling the ledgers and updating Positions for a given settlement window.</p></td>
</tr>
<tr class="even">
<td><p>DFSP Settlement Ledger</p></td>
<td><p>The DFSP’s liquidity account held at the settlement bank mirrored in the Hub. Acts as a reconciliation account and mirrors the movement of real funds.</p></td>
<td><p>Funds transfer (in and out): The movement of funds initiated by the DFSP or the confirmation by the settlement bank that settlement has completed.</p></td>
</tr>
<tr class="odd">
<td><p>Hub Multilateral Net Settlement (HMLNS) Ledger</p></td>
<td><p>Used to capture the balancing journal entry for the net settlement amongst DFSPs. After a settlement window has been closed and settled amongst all the DFSPs, its balance will return to zero.</p></td>
<td><p>Settlement transfer: The flow of funds between DFSPs aimed at reconciling the ledgers and updating Positions for a given settlement window.</p></td>
</tr>
<tr class="even">
<td><p>Hub Reconciliation Ledger</p></td>
<td><p>Ensures that movements in and out of the liquidity accounts and recorded in the Settlement Ledgers are balanced. The balance is the amount that the Hub Operator is administering in all the participant DFSPs' Settlement Ledgers.<br />
<br />
Acts as a control account, and tracks the movement of funds across all DFSP Settlement Ledgers (which mirror the movement of real funds).</p></td>
<td><p>Funds transfer (in and out): The movement of funds initiated by the DFSP or the confirmation by the settlement bank that settlement has completed.</p></td>
</tr>
</tbody>
</table>

## Understanding accounting principles

In accounting, a positive net position (more debits) is treated as an asset, while a negative net position (more credits) is treated as a liability. The Mojaloop Hub applies these same principles but from the Hub's perspective. What does that mean?

A transfer is recorded by the Hub as a debit (DR) on the Payer DFSP side because the transfer reduces the amount that is owed back to that DFSP (reduced liability from the Hub's perspective). So while the Payer DFSP itself will treat the transfer as an increase in their liability in their own system, the Hub treats the transfer as an increase in their asset. 

The same transfer is recorded by the Hub as a credit (CR) on the Payee DFSP side because the transfer increases the amount owed to that DFSP (increased liability from the Hub's perspective). 

Recording a transaction in two accounts as opposing debit and credit entries (of equal amounts) is what we call "double entry" in accounting.

Applying the above accounting principles to a deposit by a DFSP in the DFSP's liquidity account, the amount creates a liability from the Hub's perspective (the money needs to be paid back). The amount that is entered in the Hub is therefore negative. This way at any point, the amount the Hub owes to any DFSP can be quickly calculated by adding the DFSP's Position to their liquidity account balance. The double entry for the DFSP Settlement Ledger is added to the Hub Reconciliation Ledger.

## Settlement: an example

This section demonstrates how a transaction is logged in the various ledgers, using a simple example. 

Let’s take the following example: DFSP1 sends 50 USD to DFSP2. Here is how this example transaction is recorded in the Hub ledgers.

### Step 1a: Reserving the transfer amount for the sender in the Position Ledger

The DFSP Position Ledger is used for keeping track of changes in the Position of a DFSP. Once a settlement window is closed and the settlement process is started, the transfer amount is reserved in the Hub’s Position Ledgers maintained for the DFSPs as well as in the Hub Multilateral Net Settlement Ledger. Reserving the transfer amount for the Payer DFSP (DFSP1) guarantees that the funds cannot be used for another transfer.

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

### Step 1b: Reserving the transfer amount for the recipient in the Position Ledger

Similarly, the Position of the Payee DFSP is also tracked through the DFSP's Position Ledger.

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

### Step 2a: Committing the transfer amount for the sender in the Position Ledger

Following the reservation of the transfer amount, the next step is to commit the amount in the same ledgers as before.

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

### Step 2b: Committing the transfer amount for the recipient in the Position Ledger

Committing the transfer amount for the Payee DFSP (DFSP2) allows the DFSP to send funds to other DFSPs if desired.

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

### Step 3: Reserving the transfer amount for the sender in the Settlement Ledger

Once Positions are in a controlled state and corresponding debit and credit entries have been recorded in the Hub Multilateral Net Settlement Ledger, the transaction must be recorded and reserved in the DFSP Settlement Ledgers and the Hub Reconciliation Ledger as well to ensure that funds are not released inadvertently for another Funds-Out operation.

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

### Step 4a: Committing the transfer amount for the recipient in the Settlement Ledger

Once real money has moved on DFSPs' liquidity accounts, transfer amounts can be committed in the DFSP Settlement Ledgers and the Hub Reconciliation Ledger. Money movement is recorded for the Payee DFSP first.

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

### Step 4b: Committing the transfer amount for the sender in the Settlement Ledger

Finally, the transfer amount is committed on the sender side too.

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

## Adding/withdrawing funds: an example

### Adding funds

As the funds of the liquidity accounts will fluctuate, the DFSPs will either add funds to fund their net sends, or look to make withdrawals. Deposits can happen whenever desired, but the Hub Reconciliation Ledger does need to be updated regularly, to avoid reconciliation issues. Whenever a change is made to the external account (that is, the DFSP's liquidity account), the Net Debit Cap must also be assessed.

In the following example, DFSP1 adds 100,000 USD to their liquidity account. This is how the deposit amount is recorded in the Hub's ledgers.

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

### Withdrawing funds

As a withdrawal could lead to an impact on the Net Debit Cap and the ability to transact, the NDC must be re-calculated in light of the DFSP's new balance (the balance must never be lower than the NDC).

In the following example, DFSP2 withdraws 100,000 USD from their liquidity account. This is how the withdrawal amount is recorded in the Hub's ledgers.

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