## Log Analysis Report – 03 Oct 2020

Below is a summary of the log analysis performed on Mojaloop on the 3rd Oct 2020

| Service | Mojaloop State | PII Data | Other Observations |
| ------- | -------------- | -------- | ------------------ |
| account-lookup                                      | fresh-install | NONE | |
| bulk-api-adapter                                    | fresh-install | NONE | |
| central-event-processor                             | fresh-install | NONE | MySQL Root password in log |s|
| central-ledger                                      | fresh-install | NONE | MySQL root password in logs </br></br>SQL script creating user contains password|
| central-settlement                                  | fresh-install | NONE | |
| cl-handler-bulk-transfer-fulfil/prepare/process     | fresh-install | NONE | |
| emailnotifier                                       | fresh-install | NONE | |
| finance-portal                                      | fresh-install | NONE | |
| finance-portal-settlement-management                | fresh-install | NONE | Mysql centalledger passwor |d|
| kafka-broker                                        | fresh-install | NONE | |
| kafka-metrics                                       | fresh-install | NONE | |
| kafka-exporter                                      | fresh-install | NONE | |
| ml-api-adapter                                      | fresh-install | NONE | |
| ml-api-adapter-handler-notification|                | fresh-install | NONE | |
| mongodb                                             | fresh-install | NONE | |
| quoting-service                                     | fresh-install | NONE | |
| sim-payeefsp-backend                                | fresh-install | NONE | |
| sim-payeefsp-cache                                  | fresh-install | NONE | |
| sim-payeefsp-scheme-adapter                         | fresh-install | NONE | |
| sim-testfsp1-backend                                | fresh-install | NONE | |
| sim-testfsp1-cache                                  | post-seeding | NONE | |
| sim-testfsp1-scheme-adapter                         | post-seeding | NONE | |
| account-lookup                                      | post-seeding | YES  | |
| bulk-api-adapter                                    | post-seeding | NONE | |
| central-event-processor                             | post-seeding | NONE | |
| central-ledger                                      | post-seeding | NONE | MySQL root password in logs </br></br>SQL script creating user contains password |
| central-settlement                                  | post-seeding | NONE |
| cl-handler-bulk-transfer-fulfil/prepare/process     | post-seeding | NONE |
| emailnotifier                                       | post-seeding | NONE |
| finance-portal-cmg-backend                          | post-seeding | NONE | MySQL Root password in logs </br> Testkey and Testsecret </br> azureclientID ||
| finance-portal-cmg-frontend                         | post-seeding | NONE |
| finance-portal-settlement-management                | post-seeding | NONE | Mysql centalledger password|
| kafka-broker                                        | post-seeding | NONE | |
| kafka-metrics                                       | post-seeding | NONE | |
| kafka-exporter                                      | post-seeding | NONE | |
| ml-api-adapter                                      | post-seeding | NONE | |
| ml-api-adapter-handler-notification                 | post-seeding | NONE | |
| mongodb                                             | post-seeding | NONE | |
| quoting-service                                     | post-seeding | NONE | |
| sim-payeefsp-backend                                | post-seeding | NONE | |
| sim-payeefsp-cache                                  | post-seeding | NONE | |
| sim-payeefsp-scheme-adapter                         | post-seeding | NONE | |
| sim-testfsp1-backend                                | post-seeding | NONE | |
| sim-testfsp1-cache                                  | post-seeding | NONE | |
| sim-testfsp1-scheme-adapter                         | post-seeding | NONE | |
| account-lookup-mysql-database                       | post-golden-path-tests | NONE | MySQL root password in logs</br></br>SQL script creating service users contains password |
| account-lookup-mysql-logs                           | post-golden-path-tests | NONE | |
| account-lookup-mysql-metrics                        | post-golden-path-tests | NONE | |
| account-lookup-service                              | post-golden-path-tests | YES  | |
| account-lookup-service-sidecar                      | post-golden-path-tests | NONE | |
| account-lookup-service-admin                        | post-golden-path-tests | NONE | |
| account-lookup-service-admin-sidecar                | post-golden-path-tests | NONE | |
| bulk-api-adapter-handler-notification               | post-golden-path-tests | NONE | |
| bulk-api-adapter                                    | post-golden-path-tests | NONE | |
| bulk-api-adapter-service                            | post-golden-path-tests | NONE | |
| central-event-processor                             | post-golden-path-tests | NONE | |
| central-event-handler-admin-transfer                | post-golden-path-tests | NONE | |
| central-event-handler-timeout                       | post-golden-path-tests | NONE | |
| central-event-handler-transfer-util                 | post-golden-path-tests | NONE | |
| central-event-handler-transfer-fulfil               | post-golden-path-tests | NONE | |
| central-event-handler-transfer-get                  | post-golden-path-tests | NONE | |
| central-event-handler-transfer-position             | post-golden-path-tests | NONE | |
| central-event-handler-transfer-prepare              | post-golden-path-tests | NONE | |
| central-ledger-mysql-0-database                     | post-golden-path-tests | NONE | MySQL root password in logs</br></br>SQL script creating user contains password |
| central-ledger-mysql-0-log                          | post-golden-path-tests | NONE | |
| central-ledger-mysql-0-metrics                      | post-golden-path-tests | NONE | |
| central-ledger-service                              | post-golden-path-tests | NONE | |
| central-settlement                                  | post-golden-path-tests | NONE | |
| cl-handler-bulk-transfer-fulfil/prepare/process     | post-golden-path-tests | NONE | |
| emailnotifier                                       | post-golden-path-tests | NONE | |
| finance-portal-cmg-backend                          | post-golden-path-tests | NONE | |
| finance-portal-cmg-frontend                         | post-golden-path-tests | NONE | |
| finance-portal-settlement-management                | post-golden-path-tests | NONE | Mysql centalledger password|
| kafka-broker                                        | post-golden-path-tests | NONE | |
| kafka-metrics                                       | post-golden-path-tests | NONE | |
| kafka-exporter                                      | post-golden-path-tests | NONE | |
| ml-api-adapter                                      | post-golden-path-tests | NONE | |
| ml-api-adapter-handler-notification                 | post-golden-path-tests | NONE | |
| ml-api-adapter-handler-adapter-service              | post-golden-path-tests | NONE | |
| ml-api-adapter-handler-adapter-service-sidecar      | post-golden-path-tests | NONE | |
| mongodb                                             | post-golden-path-tests | NONE | |
| quoting-service                                     | post-golden-path-tests | YES  | |
| quoting-service-sidecar                             | post-golden-path-tests | NONE | |
| sim-payeefsp-backend                                | post-golden-path-tests | NONE | |
| sim-payeefsp-cache                                  | post-golden-path-tests | NONE | |
| sim-payeefsp-scheme-adapter                         | post-golden-path-tests | NONE | |
| sim-payerfsp-backend                                | post-golden-path-tests | NONE | |
| sim-payerfsp-cache                                  | post-golden-path-tests | NONE | |
| sim-testfsp1-backend                                | post-golden-path-tests | NONE | |
| sim-testfsp1-cache                                  | post-golden-path-tests | NONE | |

