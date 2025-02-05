# Portal and Operational Features

The aspects of portals and other operational features that are addressed are:

-   User Management

-   Participant Management

-   Transaction Review

-   Settlement

-   Logging & Audit

-   Hub Management

-   Oracle Management

-   Participant Portal

-   Reporting

These functions are provided through Mojaloop's Business Operations
Framework (BOF), which not only provides the core functions described
here but also provides a set of APIs to allow a Hub operator to extend
these portals, and create new ones, to meet their specific requirements.

The BOF channels all activity through a single Identity and Access
Management (IAM) framework, which incorporates Role Based Access
Controls (RBACs), giving a hub operator granular control of an individual's
access to the management capabilities of the Mojaloop Hub.

Access to each of the above functions is implemented using the BOF, and
is managed using the IAM and RBAC.

## User Management 

These features relate to the management of the hub operator's staff
using the integrated IAM module, rather than management of the service
itself.

1.  Create and manage user accounts for staff of the hub operator and
    participants through the IAM portal.
2.  Define roles associated with access to various sub-elements of the
    portals.
3.  Assign roles to user accounts, defining which users have access to
    which features of the portals.
4.  For sensitive functions, define a maker/checker requirement,
    including the roles that must be held by the maker and the checker,
    and any restrictions.
5.  Enable/disable user accounts.
6.  Create user accounts for participants, to facilitate self service
    through the Participant Portal (when it is implemented).
7.  Allow a user to be a maker and a checker (but not of their own
    work).

Note that the Participant Portal is not yet implemented by any Mojaloop
hub, and so it is not currently a requirement.

## Participant Management

Features that allow a hub operator to manage a participating DFSP (note
that this is distinct from the Participant Portal).

1.  Onboarding a participating DFSP.
2.  Define and manage end-points (including specification of
    certificates and source IPs)
3.  Manage Participant contacts (name, email, MSISDN, role etc).
4.  Define thresholds (for notifications).
5.  Define and manage accounts for Participant by type, currency.
6.  Disable a participating DFSP (though it should not be possible to
    disable a DFSP with outstanding/unsettled transactions).
7.  Pause/Resume a Participant's connection.
8.  Assign/adjust liquidity (for multiple currencies), controlled with
    maker/checker.
9.  Assign/adjust a Net Debit Cap (NDC) for each Participant, controlled
    by maker/checker, to include two options for NDC: fixed value
    (manual adjustment after each liquidity change), or variable (as a
    fixed percentage of available liquidity).
10. Restrict Participant connection to send or receive only.

## Transaction Review

The hub operator's staff need to be able to find details about a
transaction, whatever its status. They are able to search by:

-   Date/time range

-   Payer or Payee DFSP (Participant)

-   Value - Mojaloop transaction ID

-   Transfer state

-   Settlement Batch ID

-   Transaction type

-   Error code

The search returns a list of all the transactions matching the search
criteria, each clickable for a detailed view, which gives access to:

-   All details held by the Mojaloop Hub, grouped in a set of
    sub-windows to improve usability

This will include the settlement window/batch ID, which is itself
clickable to allow the operator to review the settlement status of the
batch and therefore the transaction itself.

## Settlement

Management of the settlement function of the Mojaloop Hub needs to be
robust and reliable. The related features are:

1.  To define the settlement model to be used for the service
2.  To close a settlement window or batch either manually or
    automatically, according to a predefined schedule
3.  To automatically create all of the necessary settlement files for
    integration with settlement partner(s) when a settlement window is
    closed
4.  To review the positions of all Participants in the settlement
    window/batch
5.  Once settlement has been completed/finalised, to automatically
    update the positions and current available liquidity based on
    reports from the settlement partner(s)
6.  To provide tools to support the integration between the Mojaloop Hub
    and settlement partner(s).

Note that at least one settlement window or batch will always be open,
and transactions will be added to the open settlement window/batch as
they are processed. This means that the creation of a new settlement
window is automatic when the existing settlement window is closed.

## Logging & Audit 

The Mojaloop Hub provides a range of tools that support the logging and
audit of operator activity, in addition to low level audit functions for
the detailed analysis of transaction processing (which are defined
elsewhere in this document). These tools have been developed with the
requirements of both Hub operator management and external auditors in
mind.

1.  All modifications arising from hub operator activity (including user
    management) are logged in an uneditable data store, with the
    operator's credentials attached

2.  "Auditor" is a default hub user role; auditors have unrestricted
    read access to the logs.

3.  An audit portal is available, which has Search/refine functionality
    available

4.  Log/audit entries include changes to Hub configuration.

## Hub Management 

There are some basic requirements for the configuration of a Mojaloop
Hub, defining the service that it supports.

1.  A Mojaloop Hub supports all ISO-defined currencies by default. Each
    is enabled for use by a particular deployment by the creation of
    settlement and position accounts for that currency. In support of
    this, there is a requirement to be able to view the balances in Hub
    operating accounts (settlement and position, replicated per currency
    supported)

2.  Add/view/delete the CA certificates needed for normal operation.

## Oracle Management

Management of the oracles used by the Account Lookup Service (ALS) for
the resolution of aliases to DFSPs/Participants (and then, in
collaboration with the identified DFSP, to a specific account).

1.  View the registered oracles

2.  Register an Oracle

3.  Define an endpoint

4.  Test the health of an oracle

## Participant Portal

Currently, the Mojaloop Hub does not offer a Participant Portal.
Instead, this functionality is provided by another open source project,
Payment Manager (<https://github.com/pm4ml>). Other tools, such as
Mojaloop's Integration Toolkit, provide an API to allow DFSPs to access
the same information.

## Reports

Mojaloop provides a flexible reporting engine as part of the Business
Operations Framework, which allows a Hub operator's staff to design and
generate a wide range of reports based on data held in Mojaloop's
databases and ledgers. The Framework also supports the integration of
those reports into any of the operator portals, allowing the reports to
be generated as required by operations staff.

This includes the reports relating to settlement.