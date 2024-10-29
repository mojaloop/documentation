# Accessing the portal

On accessing the portal, you are prompted to log in. Enter your credentials on the login page.

<img src="../../.vuepress/public/portal_login.png" width="40%" height="40%" />

The portal implements role-based access control, meaning that the role you have determines the range of portal functionalities available to you. Currently, the following roles exist:

* `portaladmin`: has full access to all portal functionalities
* `portaluser`: has limited access to portal functionalities 

The following table lists all available functionalities, the navigation paths where you can access them, and the relevant roles permissions.

<table>
<caption><strong>Portal functionalities and navigation paths</strong></caption>
<colgroup>
<col style="width: 30%" />
<col style="width: 30%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Functionality</th>
<th>Navigation path</th>
<th>portaladmin</th>
<th>portaluser</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="managing-windows.html">View settlement window details</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#closing-a-settlement-window">Close settlement windows</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#settling-a-closed-settlement-window">Settle settlement windows</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="settling.html#finalizing-a-settlement">Finalize settlement</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlement Windows</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="checking-settlement-details.html">View settlement details</a></p></td>
<td><p><strong>Settlement</strong> &gt; <strong>Settlements</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="monitoring-dfsp-financial-details.html">View DFSP financial details</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="enabling-disabling-transactions.html">Disable and re-enable transactions for a DFSP</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="odd">
<td><p><a href="recording-funds-in-out.html">Record deposits to or withdrawals from DFSPs' liquidity accounts</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
<tr class="even">
<td><p><a href="updating-ndc.html">Update a DFSP’s Net Debit Cap</a></p></td>
<td><p><strong>Participants</strong> &gt; <strong>DFSP Financial Positions</strong></p></td>
<td><p>✓</p></td>
<td><p>x</p></td>
</tr>
<tr class="odd">
<td><p><a href="searching-for-transfer-data.html">Search for transfer data</a></p></td>
<td><p><strong>Transfers</strong> &gt; <strong>Find Transfers</strong></p></td>
<td><p>✓</p></td>
<td><p>✓</p></td>
</tr>
</tbody>
</table>