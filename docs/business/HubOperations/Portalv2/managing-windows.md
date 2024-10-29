# Checking settlement window details

The **Settlement Windows** page allows you to:

* search for settlement windows based on multiple search criteria
* close an open settlement window
* settle a single window or settle multiple windows at once

::: tip NOTE
Remember that settling must follow this procedure: 

* Close the settlement window that you want to settle.
* Settle closed window(s) of your choice. This creates a new settlement.
* Send settlement reports to DFSPs and the settlement bank, and obtain a confirmation from the bank that it has moved money in accordance with the report.
* Finalize the new settlement created in Step 2.

Given that closing a window and initiating settlement by settling select windows are integral part of the settlement process, they are described in a section dedicated to [settling](settling.md).
:::

A settlement window is a time period between two successive settlements. It has a start time and an end time, and any transfers that go through (and reach a `"COMMITTED"` state) during the time that the settlement window is open will be settled in bulk after the settlement window has closed.

Transfers that take place in the same settlement window are settled in batch after the end of the settlement window.

To access the **Settlement Windows** page, go to **Settlement** > **Settlement Windows**.

![Managing settlement windows](../../.vuepress/public/settlement_window_mgmt.png)

The **Settlement Windows** page provides a list of settlement windows that you can filter using various search criteria:

* **Date**: Provides a drop-down list of time ranges. The default value is **Today**. \
\
The **Clear** option allows you to remove any date filters already applied.
* **From** and **To**: Displays the start time and end time of the time range selected in the **Date** field. When **Date** is set to **Custom Range**, you have to set the date and time yourself in the **From** and **To** fields.
* **State**: Provides a drop-down list of settlement window states:
    * **Open**: The settlement window is open, transfers are being accepted into the current open window.
    * **Closed**: The settlement window is closed. It is not accepting any additional transfers and all new transfers are being allocated to a new, open settlement window.
    * **Pending**: The settlement window is closed, but the settlement window still needs to be settled. A window can only be settled once the settlement bank has confirmed that all the participant DFSPs that engaged in transfers in the settlement window have settled their payments.
    * **Settled**: The settlement bank has confirmed that all the affected DFSPs have settled their obligations towards one another. Following confirmation, the Hub Operator has settled the settlement window.
    * **Aborted**: The settlement window was part of a settlement that got aborted. It is possible to add the aborted window to a new settlement.
    * **Clear**: Allows you to remove any window state filters already applied.
* **Clear Filters** button: Allows you to remove all filters you applied.

As you apply search criteria, the list of results (settlement windows) is continuously updated. The search results list displays the following details:

* Window selector: Only displayed for **Pending** settlement windows. Clicking the window selector activates the **Settle Selected Windows** button. For details about settling a settlement window, see [Settling](settling.md#settling-a-closed-settlement-window).
* **Window ID**: The unique identifier of the settlement window.
* **State**: The state of the settlement window.
* **Opened Date**: The date and time when the settlement window was opened.
* **Closed Date**: The date and time when the settlement window was closed.
* **Action**: **Close Window** button. Allows you to close a settlement window. This button is only displayed for **Open** settlement windows as only open windows can be closed. For details about closing a settlement window, see [Settling](settling.md#closing-a-settlement-window).