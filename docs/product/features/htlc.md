# Hashed Timelock Contracts
Mojaloop uses ILP's cryptographic locks to ensure atomic, conditional transfers between DFSPs. The mechanism centres around Hashed Timelock Contracts (HTLCs), which allow Mojaloop to support conditional transfers — ensuring a transfer either completes fully across all participating parties, or not at all.

A contract is agreed between the Payee and Payer DFSPs during the Agreement of Terms phase of a Mojaloop transaction, which begins when the Payer DFSP proposes a transaction, by means of a quotation request. 

When the Payee DFSP is satisfied that the transaction can go ahead (having completed its own internal checks), the Payee DFSP:
-	Amends the proposed terms of the transaction to set out the conditions on which it will carry out the transaction (which might include, for example, the fees it will charge and any compliance conditions);
-	Creates the Transaction object, which defines the terms on which it is prepared to honour the payment request;
-	Creates and retains the Fulfilment, which is a hash of the Transaction object, itself signed with the Payee DFSP's private key (a key created specifically for, and restricted to, this purpose);
-	Creates the Condition, which is a hash of the Fulfilment;
-	Appends the Condition to the Transaction object;
-	And returns it to the Payer DFSP in a quotation response.

If the Payer DFSP accepts the terms of the transaction, it sends a transfer request, comprising the Transaction object, the received Condition and an expiry time, to the Mojaloop Hub. 

The Mojaloop Hub stores the Condition, and forwards the transfer request to the Payee DFSP. It also starts a timer to match the specified expiry time. 

On receipt of the transfer request, the Payee DFSP: 
-	Verifies that the Condition received matches that agreed (this includes a check that the payment requested is the same as the payment it agreed to), and satisfies itself that the compliance conditions have been met;
-	Returns the Fulfilment to the Mojaloop Hub in a transfer response.

The Mojaloop Hub hashes the returned Fulfilment to validate that it matches the Condition received from the Payer DFSP, and if successful notifies the Payer DFSP (and the Payee DFSP, if this has been requested) that an obligation has been created between them; that is, that the payment has been cleared.

The notification to the Payer DFSP includes the fulfilment, which acts as cryptographic proof of irrevocable completion. If the Payer DFSP re-generates the Condition and finds that it has changed from that agreed, then they should raise a dispute with the Payee DFSP.

Note that if the transaction timer expires at the Hub before the Fulfilment is received from the Payee DFSP, the Hub will notify each DFSP that the transaction has been cancelled.

## Applicability
This document relates to Mojaloop Version 17.0.0
## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|2nd July 2025| Paul Makin|Updated after review by Michael Richards|
|1.0|30th June 2025| Paul Makin|Initial version|