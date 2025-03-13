# Foreign Exchange

An important aspect of a modern payment system is the ability to support transactions in more than one currency; and Mojaloop is no different, with support for multiple transaction currencies built-in. It is an important precept that these currencies operate independently, so that a transaction debited from the debtor in currency X will always be credited to the creditor in currency X.

Sometimes, however, it is necessary to provide a "bridge" between these currencies. This is facilitated by a function typically known as foreign exchange, and involves a third party called, in Mojaloop parlance, a Foreign Exchange Provider (FXP). 

Note that this function is not necessarily related to sending funds cross border, since there are legitimate reasons why a person in a single jurisdiction might wish to hold funds denominated in multiple currencies, not least because there are countries where multiple currencies are commonly in circulation.

The following diagram shows how Mojaloop implements this functionality.

![Foreign Exchange](./FXP.svg)

Currently, Mojaloop only supports a single business model for the implementation of a foreign exchange transaction. This model implements the following "Payer Decides" model.

### Payer Decides

1. A customer of DFSP1 wishes to send 10 of currency X to the payee.
2. Discovery shows that the payee's account is hosted by DFSP 2.
3. DFSP 1 proposes the transaction to DFSP 2, who notes that the payment must be forwarded in currency Y.
4. DFSP 1 sends 10 X to the FXP, who forwards the equivalent value in currency Y to DFSP 2, and pays out to the payee (less fees, currency spread, etc). 

Further details of the implementation of this FX capability can be found in the [**FX documentation**](./fx.md).

Other, more complex business models will be supported in an upcoming release. These are currently planned to include:

### Multiple FXPs

1. A customer of DFSP1 wishes to send 10 of currency X to the payee.
2. Discovery shows that the payee's account is hosted by DFSP 2.
3. DFSP 1 proposes the transaction to DFSP 2, who notes that the payment must be forwarded in currency Y.
4. DFSP 1 proposes the transaction to multiple FXPs, selects the one with the most beneficial terms and sends 10 X to that FXP, who forwards the equivalent value in currency Y to DFSP 2, pays out to the payee (less fees, currency spread, etc). 

### Payee Decides

1. A customer of DFSP1 wishes to send 10 of currency X to the payee.
2. Discovery shows that the payee's account is hosted by DFSP 2.
3. DFSP 1 proposes the transaction to DFSP 2, who notes that the payment should be forwarded in the payer's currency, X.
4. DFSP 1 sends 10 X to DFSP 2
5. DFSP 2 proposes the transaction to multiple FXPs, selects the one with the most beneficial terms and sends 10 X to that FXP, who returns the equivalent value in currency Y back to DFSP 2, who then pays out to the payee (less fees, currency spread, etc). 

The following page will be of interest to those who wish to review how interscheme and foreign exchange capabilities relate to  [**cross border transactions**](.CrossBorder.md).