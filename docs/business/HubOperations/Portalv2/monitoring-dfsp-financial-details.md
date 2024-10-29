# Monitoring DFSP financial details

The **DFSP Financial Positions** page allows you to monitor DFSPs' financial details such as Balance, current [Position](settlement-basic-concepts#position), [Net Debit Cap](settlement-basic-concepts#liquidity-management-net-debit-cap), percentage of NDC used.

To access the **DFSP Financial Positions** page, go to **Participants** > **DFSP Financial Positions**.

![Monitoring DFSP financial details](../../.vuepress/public/dfsp_financial_positions_2.png)

The following details are displayed for each DFSP:

* **Balance**: Reflects the balance of the DFSP's liquidity account at the settlement bank.
* **Current Position**: The current Position of the DFSP. \
\
The Position of a DFSP reflects – at a given point in time – the sum total of the transfer amounts sent and received by the DFSP. The Position is the sum of all outgoing transactions minus incoming transactions since the beginning of the settlement window, as well as any provisional transfers that have not yet been settled. \
\
Each attempted outgoing transfer results in the Position being recalculated by the Mojaloop Hub in real time, which, in turn, is compared to the Net Debit Cap. \
\
Once the settlement window is closed, then Positions are adjusted based on the settlement – the Position changes to the net amount of the transfers that were not initiated or not yet fulfilled when the settlement window was closed.
* **NDC**: The Net Debit Cap set for the DFSP. \
\
When pre-funding their liquidity account, DFSPs define the maximum amount that they can "owe" to other DFSPs, this is called the Net Debit Cap (NDC). The NDC acts as a limit or a cap placed on a DFSP’s funds available for transacting, and it can never exceed the balance of the liquidity account. This is required to ensure that a DFSP's liabilities can be met with funds immediately available to the settlement bank. \
\
The Position is continuously checked against the Net Debit Cap ((TransferAmount + Position) < = NDC) and if a transfer would cause the Position amount to exceed the NDC amount, the transfer is blocked.
* **% NDC Used**: A Position/NDC indicator to show the percentage of NDC used.
