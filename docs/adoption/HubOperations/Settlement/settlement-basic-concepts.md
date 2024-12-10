# Basic concepts

This section collects key concepts and elements of the settlement management process.

## Liquidity cover

As described in the [Introduction](settlement-management-introduction.md), one of the characteristics of a real-time payments system is that creditor DFSPs are required to disburse funds to their customers before they are reimbursed by the debtor DFSP. To mitigate the risk that a creditor DFSP will not receive the funds that it is due, Mojaloop requires that debtor DFSPs should provide credible evidence that they have sufficient good funds to meet the obligations they incur as a consequence of transacting in the system.

This credible evidence is called *liquidity cover*. The Mojaloop system does not stipulate what forms it should take; and, for any given DFSP, it may take multiple forms. It might be:

- funds deposited in an account over which the Mojaloop Hub has some control
- a line of credit from another financial institution
- collateral of some other kind

However, any liquidity cover used in a Mojaloop scheme must have the following characteristics:

- It must be capable of being converted into settlement payments *immediately* on demand from the Mojaloop scheme.
- It must be attested to by reliable evidence in the Mojaloop scheme's possession.
- It must not be convertible by the DFSP into other forms (for example, by withdrawing funds from a bank account, or drawing down funds from a line of credit) without the prior knowledge and approval of the Mojaloop scheme.

The liquidity cover attributed to a given DFSP is liquidity cover for a given settlement model and currency, and is attributable to the scheme as a whole. That is to say that Mojaloop does not allow participants to maintain liquidity cover that is applicable only to their transfers with a specific DFSP or DFSPs.

When a DFSP asks the Mojaloop Hub to make a transfer, the Mojaloop Hub checks that the debtor DFSP has sufficient liquidity cover to guarantee that the transfer can be settled if it completes successfully. It does this by comparing the DFSP's total good funds against the sum of the following items:

1. The sum of transfers which have been completed but not yet settled, and to which the DFSP is *either* the creditor *or* the debtor party.
1. The sum of transfers which have been started but which have not yet completed, and to which the DFSP is the debtor party.
1. The amount of the proposed transfer.

If the total of these three items is greater than the amount of good funds available to the debtor DFSP, then the transfer will be rejected by the Mojaloop Hub. Note that, in this arrangement, a DFSP's liquidity is credited with the effect of transfers where it is the beneficiary as soon as the transfer is completed, without needing to wait for the funds to be settled. Mojaloop does this to keep to a minimum the amount of liquidity that participants are required to maintain.

## Settlement model

Different schemes will want to settle funds between their participants in different ways. These will depend on who is operating the scheme, how much traffic there is through the scheme, and many other variables.

Mojaloop is designed to support the industry standard ways of settling between participants. These are as follows:

- Multilateral deferred net settlement
- Bilateral deferred net settlement
- Immediate gross settlement

The meaning of the component terms of these settlement types is as follows.

Settlements are *deferred net* if a number of transfers are settled together. Net settements (in which a number of transfers are settled together) are by definition deferred (since it takes time to construct a batch.)

Settlements are *gross* if each transfer is settled separately. Gross settlements may be immediate or deferred. They are *deferred* if approval for settlement from outside the Hub is required, and *immediate* if the Hub can proceed to settlement of a transfer without requiring any external approval. At present, Mojaloop only supports immediate gross settlements.

Settlements are *bilateral* if each pair of participants settles with each other for the net of all transfers between them. Settlements are *multilateral* if each participant settles with the Hub for the net of all transfers to which it has been a party, no matter who the other party was.

A settlement model specifies a way in which a Mojaloop Hub will settle a set of transfers. In the simple case, there is only one settlement model and it settles all the transfers that are processed by the Hub. However, Mojaloop supports more than one settlement model for a single scheme. This allows, for instance, a scheme to define different settlement models for different currencies, or for different ledger account types.

If a scheme defines more than one settlement model, it is the responsibility of the scheme to ensure that a given transfer can only belong to a single settlement model. For example, suppose that a scheme defines a settlement model for all transfers that require currency conversion (defined as: all transfers where the source currency and the target currency are different from each other), and also a settlement model for all transfers where the source currency is Kenyan shillings (KES). In this case, a transfer which converted from Kenyan shillings to South African rand could potentially belong to both models.

## Settlement window

Every transfer that is completed in the Hub is assigned to the currently open settlement window. The settlement window is a way of grouping transfers together. Assigning transfers to a settlement window happens independently of the settlement models that are used to settle the transfers. This means that if a scheme has defined more than one settlement model, transfers that belong to the different settlement models will share a settlement window.

There is no deterministic way of assigning transfers to a particular settlement window. When a scheme administrator creates a new settlement window, there is no way to tell in advance which transfers will be assigned to the new settlement window and which transfers will be assigned to the old settlement window.

A settlement window can have the following states:

* `OPEN`: The settlement window is open, transfers are being accepted into the current open window.
* `CLOSED`: The settlement window is closed. It is not accepting any additional transfers and all new transfers are being allocated to a new, open settlement window.
* `PENDING_SETTLEMENT`: The settlement window is closed, the [Multilateral Net Settlement Positions](#multilateral-net-settlement-position) have been calcluated for each DFSP but settlement with the partner settlement bank has not happened yet. 
* `SETTLED`: The settlement bank has confirmed that all the participant DFSPs that engaged in transfers in the settlement window have settled their payments, and the Hub Operator has settled the window.

Closing a settlement window automatically opens the next one.

### Settlements and settlement windows

A Hub Administrator may request settlements for a given settlement model and for one or more settlement windows.

If a scheme only has a single settlement model, then settling transfers for that model in a given settlement window will settle all the transfers in that window. If, on the other hand, a scheme has defined more than one settlement model, then settling transfers belonging to a particular settlement model for a given settlement window will mean that some of the transfers in that window have been settled, while others have not.

It is particularly important to understand the implications of this where an Immediate Gross settlement model has been defined. In this case, individual transfers will be settled as soon as they have been completed. If the scheme only has an Immediate Gross settlement model, then all transfers will be settled as they are completed, and the settlement window will become irrelevant. If, on the other hand, the scheme mixes Gross and Net settlement models, or if the scheme has defined more than one Net settlement model, then it is possible for a given settlement window to contain some transfers which have been settled and some which have not been settled; and, in the case of transfers which are settled by a Gross settlement model, for transfers which have been settled to appear even in a currently open settlement window. This creates potential complications in defining the overall status of a settlement window.

Mojaloop deals with this situation by always assigning the settlement window a state which is the minimum state of the transfers within it. *Minimum state* is defined by the sequence of settlement window states given above. So, for instance, if a settlement window contains transfers which have already been settled (because they are settled Gross) and other transfers whose settlement process has not yet started, then the settlement window's state will be `OPEN`. If a settlement window has been closed, and it contains transfers which belong to two different settlement models, one of which is being settled (and whose state is therefore `PENDING_SETTLEMENT`) and the other is not (and whose state is therefore `CLOSED`,) the overall state of the settlement window will be `CLOSED`.

## Liquidity management (Net Debit Cap)

As described above, Mojaloop requires participants to pre-fund transfers where they are the debit party by providing credible evidence to the Mojaloop Hub that they can meet all their current settlement demands. There may, however, be circumstances in which a participant does not want all of its liquidity cover to be used as cover for transfers. For instance, a participant might be a recipient in a remittance channel and therefore an overall net creditor; or a participant might deposit extra funds to cover periods when their accounts are not open to receive funds.

To cover these possibilities, Mojaloop allows either participants or Hub Administrators to reserve part of their available liquidity cover, so that only part of it can be used to provide liqidity cover for transfers. This is called the Net Debit Cap (NDC). The NDC acts as a limit or a cap placed on a DFSP's funds available for transacting, and it can never exceed the balance of the liquidity account. This is required to ensure that a DFSP's liabilities can be met with funds immediately available to the settlement bank.

When calculating whether or not a transfer is covered by available liquidity, the Hub will take into account any restriction on the amount of available funds specified by the Net Debit Cap.

## Position

The Position of a DFSP reflects the total unsettled obligations of a DFSP for a given settlement model at a given point in time: that is to say, the amount of funds that a DFSP will eventually be required to settle with the scheme. A DFSP's Position for a given settlement model is the net of the following elements:

1. All completed but unsettled transfers that belong to the settlement model and where the DFSP is the debtor party.
2. All completed but unsettled transfers that belong to the settlement model and where the DFSP is the creditor party.
3. All transfers that have been requested but have not yet completed which belong to the settlement model and where the DFSP is the debtor party.

For the Payer DFSP, this sum total includes transfer amounts that are pending and have not yet been completed. Note that if an abort or timeout happens, the affected transfers will not complete and the reservation for that transfer will be removed.

The Position is the total position across all settlement windows that have not yet been settled. The amount of a participant's position only changes when some of the transfers which make up its position are settled.

## Net Settlement Positions

As described above, a deferred net settlement can be either multilateral or bilateral. When a Hub Administrator requests a settlement, the Hub will calculate how much each participant owes, or is owed, as a consequence of the transactions that are to be settled. The transactions to be settled are defined as all transactions which:

- Belong to the settlement window(s) that are to be settled.
- Belong to the settlement model that is being settled.

If the settlement is *multilateral*, then a DFSP will receive only one figure as the amount it owes, or is owed, as a consequence of the settlement. This figure is the net of all the transactions to be settled.

If the settlement is *bilateral*, then a DFSP may receive multiple figures as the amount it owes, or is owed, as a consequence of the settlement. Each figure represents the net of the DFSP's transactions with a particular DFSP. The net of all these values will be equal to the overall figure which it would owe, or be owed, in a multilateral net settlement.

## Settlement reports

To facilitate DFSP reconciliation and settlement at the settlement bank, the Hub provides various settlement reports. A Scheme can choose to have several different reports for different purposes. Below are some examples:

* DFSP Settlement Report: A report issued to a DFSP when settlement has been initiated. It provides the DFSP's bilateral settlement position with each DFSP they transacted with (either as a Payer DFSP or Payee DFSP) in the settlement window(s) being settled. It also provides the Multilateral Net Settlement Position of the DFSP (the sum total of the transfer amounts sent and received by the DFSP in the settlement window(s)).
* Settlement Bank Report: A report issued to the settlement bank when settlement has been initiated. It provides the bilateral settlement position of each DFSP against every other DFSP that transacted in the settlement window(s) being settled. It also provides the Multilateral Net Settlement Position of each DFSP (the sum total of the transfer amounts sent and received by the DFSP).
* DFSP Settlement Result Report: A report issued to a DFSP when settlement has been finalised. It provides details about the balance of the DFSP's liquidity account, and the money movements arising from the closure of the settlement window.

## Finance Portal

The [Finance Portal](busops-portal-introduction.md) (commonly referred to as "Finance Portal v2") is a web portal used by the Hub Operator to manage settlement-related processes on a daily basis. The portal provides functionality to:

* monitor details such as the balance, [Position](#position), [Net Debit Cap](#liquidity-management-net-debit-cap) of DFSPs
* update a DFSP's [Net Debit Cap](#liquidity-management-net-debit-cap)
* manage settlement windows
<!--* download reports-->
* record deposits to or withdrawals from DFSPs' liquidity accounts

::: tip NOTE
The Finance Portal currently only supports settlement processes that rely on the Deferred Net Settlement model.
:::