# How to EDIT the central-ledger-schema-DBeaver.erd file 

This is a basic guide on how to successfully view/update the central-ledger-schema-DBeaver.erd file.

## Prerequisites
* Download and install the DBeaver Community DB Manager
* The Mojaloop Central-Ledger MySQL Database needs to be up and running, and connectable by the DBeaver
* You'll also need a text editor    
##  Steps to follow
* Create a new db connection in DBeaver under Database Navigator tab for the MySQL instance running. 
* Under the Projects tab right click and create a New ER Diagram.
* Give the diagram a name and select central-ledger db in the wizard.
* Import the documentation module as an existing project into DBeaver.
* Navigate to the newly created erd file using a text editor, search for `data-source id` and copy its value which looks like `mysql5-171ea991174-1218b6e1bf273693`.
* Navigate with a text editor to the `central-ledger-schema-DBeaver.erd` file in the documentation module and replace its `data-source id` value with the one copied from the newly created erd file.
* The `central-ledger-schema-DBeaver.erd` should now show the tables as per the `central-ledger-schema.png`
