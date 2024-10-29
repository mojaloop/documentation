# Disabling and re-enabling transactions for a DFSP

In certain cases, it may be necessary to make a DFSP inactive temporarily or permanently. An example scenario is when you observe highly suspicious behavior and the actual cause needs investigation, the risk of money loss being too high.

The **Participants** > **DFSP Financial Positions** page provides an option to stop the sending and receiving of transfers for a particular DFSP by disabling its Position Ledger at the click of a button.

(The Hub maintains a Position Ledger for each DFSP. The Position Ledger tracks how much a DFSP owes or is owed. Every time a transfer is processed, the Position in the Hub is adjusted in real time.)

To disable transactions for a particular DFSP, complete the following steps:

::: warning
Disabling a DFSP will stop all incoming and outgoing transactions for that DFSP, so ensure you apply this option with care. Once the risk has been cleared, remember to resume services for the DFSP.
:::

1. Go to the **Participants** > **DFSP Financial Positions** page.
1. Find the entry of the DFSP you want to disable.
1. Click the **Disable** button.

<img src="../../.vuepress/public/disable_dfsp_position_ledger.png" />

To resume services for the DFSP that you have disabled previously, complete the following steps:

1. Go to the **Participants** > **DFSP Financial Positions** page.
1. Find the entry of the DFSP you want to enable.
1. Click the **Enable** button.

<img src="../../.vuepress/public/enable_dfsp_position_ledger.png" />

