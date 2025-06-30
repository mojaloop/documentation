# Hashed Timelock Contracts
Mojaloop uses ILP's cryptographic locks to ensure atomic, conditional transfers between DFSPs. The mechanism centres around Hashed Timelock Contracts (HTLCs), which allow Mojaloop to support conditional transfers — ensuring a transfer either completes fully across all participating parties, or not at all.

In summary:
1. Payer DFSP Sends a “prepare” ILP packet to the Mojaloop Hub, which includes  the amount, payee ID, expiry, and ILP condition
	-	The condition is the heart of the HTLC. It is a one-way hash of the fulfilment condition (known as the preimage of the hash) which was agreed with the Payee DFSP during the ["Agreement of Terms"](./transaction.html#unique-transaction-characteristics) phase of the transaction.
2. The Mojaloop Hub validates the ILP packet, and forwards it to the Payee DFSP. The Mojaloop Hub then sets a timer, as defined by the "expiry" in the prepare packet.
3. The Payee DFSP verifies the ILP packet and (tentatively) credits the recipient, then generates the ILP fulfilment (the preimage of the hash) and sends it back to the Mojaloop Hub.
4. The Mojaloop Hub validates that the returned fulfilment satisfies the ILP condition (that is, verifies that the hash of the fulfilment returned by the Payee DFSP matches the ILP condition set by the Payer DFSP); if it is valid, it confirms the transfer to both parties, otherwise it cancels the transfer.
5. Since the fulfilment serves as cryptographic proof of completion, the payer is debited by the payer DFSP, and the payee is credited by the payee DFSP. 
 
Note that each conditionally-locked transfer includes a time limit (expiry), so creating a timelock. If the fulfilment is not provided within this time window, the transfer is cancelled automatically by the Mojaloop Hub. This protects DFSPs from funds being held indefinitely in limbo.

## Applicability
This document relates to Mojaloop Version 17.0.0
## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|30th June 2025| Paul Makin|Initial version|