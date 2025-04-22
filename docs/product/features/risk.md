# Risk Management

A key aspect of the operation of a payment scheme that is built around a
Mojaloop hub is the management of risk between transacting parties, who
will themselves have different appetites for risk. The principles
applied are:

1.  All Participants (FSPs) are required to deposit an agreed form of
    liquidity with the Scheme settlement partner. This liquidity can
    only be withdrawn, in whole or in part, from the Scheme with the
    agreement of the Scheme Operator.
    &nbsp;
2.  A transaction will only be cleared (during the Transfer phase) if
    there is sufficient liquidity available to cover it, as measured
    against the liquidity balance, the DFSP's current Position (the net
    total of previously-cleared transactions since the last settlement
    activity, as either payer or payee), and any reserved funds. 
    &nbsp;
3.  The value of a cleared transaction will be added to the payer DFSP's Position, and debited from the payee DFSP's Position.
 &nbsp;
4.  During settlement, for each DFSP, a negative Position will be debited from the
    Liquidity balance and transferred to the settlement partner for
    distribution to the creditors; a positive Position will be credited
    to the Liquidity balance by the settlement partner, using funds from the debtors. 
    &nbsp;
5.  Successful settlement clears the value represented by the transactions in the associated settlement window/batch from each DFSP's Position.
    &nbsp;
6.  A DFSP is expected to manage their liquidity, adding to it if it
    drops to a level where anticipated transaction values will result in
    failed transactions, or withdrawing some (on application to the
    scheme operator) if the value is too high. This activity takes place
    outside of Mojaloop, but it is a requirement that it is declared
    within the Mojaloop scheme, by either the DFSP or the settlement
    partner.
    &nbsp;
7.  Where the settlement partner is not available 24/7, a DFSP can
    deposit extra balance to their liquidity account, for example to
    cover anticipated transactions over a holiday period. A DFSP can
    manage this extra balance using a Net Debit Cap (NDC), which might
    be used for example to limit the use of liquidity to the levels that
    are expected on a particular day, in order to ensure that the DFSP
    can continue to trade throughout the whole of the holiday period.
    The NDC is used in tandem with the liquidity balance in the
    authorisation of transactions during the Quotation phase.
    
## Applicability

This version of this document relates to Mojaloop Version 17.

## Document History
  |Version|Date|Author|Detail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|14th April 2025| Paul Makin|Updates related to the release of V17|
|1.0|13th March 2025| Paul Makin|Initial version|