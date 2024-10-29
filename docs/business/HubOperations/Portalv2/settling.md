# Settling

1. [Close the settlement window](#closing-a-settlement-window) that you want to settle.
1. [Settle closed window(s) of your choice](#settling-a-closed-settlement-window). This creates a new settlement.
1. Send settlement reports to DFSPs and the settlement bank, and obtain a confirmation from the bank that it has moved money in accordance with the report.
1. [Finalize the new settlement](#finalizing-a-settlement) created in Step 2.

This section describes those steps of the process (Steps 1, 2, and 4) that you perform via the portal.

## Closing a settlement window

To close an open settlement window, complete the following steps:

1. Go to **Settlement** > **Settlement Windows**. The **Settlement Windows** page displays.
1. Find the settlement window that you are looking for, [using the search filters](managing-windows.md).
1. The open window will have a **Close Window** button displayed next to it in the **Action** column. Click the **Close Window** button.

![Closing a settlement window](../../.vuepress/public/settlement_window_mgmt_close.png)

Closing a window will automatically open a new window with the state of **Open**.

## Settling a closed settlement window

To settle one or more settlement windows, complete the following steps:

1. Go to **Settlement** > **Settlement Windows**. The **Settlement Windows** page displays.
1. Find the settlement window that you are looking for, [using the search filters](managing-windows.md). The settlement window must be in the **Closed** state.
1. Click the window selector next to the settlement window(s) that you wish to settle. \
\
<img src="../../.vuepress/public/settlement_window_mgmt_selector.png" /> \
\
This activates the **Settle Selected Windows** button. Click the **Settle Selected Windows** button. \
\
<img src="../../.vuepress/public/settlement_window_mgmt_settle_button.png" /> 
1. A **Settlement Submitted** window pops up, where you have the following options:

* View submitted settlements
* Continue viewing windows \
\
<img src="../../.vuepress/public/settlement_window_settlement_submitted.png" width="50%" height="50%" /> \
\
If you wish to view the new settlement you have just created, click the **View Submitted Settlements** button. This takes you to the **Settlements** page, where you can search for the new settlement, [using the search filters](checking-settlement-details.md). The settlement will be in the **Pending Settlement** state.

## Finalizing a settlement

To finalize the settlement, complete the following steps:

**Prerequisites:** 

* The settlement bank has confirmed that all the DFSPs' MLNS Positions have been settled.

**Steps:**

1. Go to **Settlement** > **Settlements**. The **Settlements** page displays.
1. Find the settlement that you are looking for, using the [search filters](checking-settlement-details.md). The settlement must be in the **Pending Settlement** state. \
\
<img src="../../.vuepress/public/finalise_settlement.png" /> 
1. Click the **Finalize** button next to the settlement. A status window pops up that displays the states of the settlement with checkmarks being added as the settlement process progresses. \
\
When the settlement is finalized, you will see all states displayed with checkmarks next to them. The last state will say **State: SETTLED.** In addition, the **Close** button will be activated enabling you to return to the **Settlements** page. \
\
<img src="../../.vuepress/public/finalising_settlement_popup.png" /> 
1. Back on the **Settlements** page, when looking for the settlement, you should see the state of the settlement now display as **Settled**.

::: tip
In case the settlement state is something other than **Settled**, then it means that the settlement has not finished for some reason. Click **Finalize** again to complete the unfinished settlement process. 
:::