Le diagramme suivant illustre la séquence de mise à jour recommandée pour les dépôts Mojaloop, en tenant compte de leurs dépendances et relations :

```mermaid
graph TD
    step1["Étape 1 : Bibliothèques de base<br>api-snippets<br>ml-number<br>central-services-logger<br>central-services-metrics<br>central-services-error-handling<br>ml-testing-toolkit-shared-lib<br>elastic-apm-node<br>elastic-apm-node-opentracing"]
    step2["Étape 2 : Dépendances de premier niveau<br>object-store-lib<br>central-services-stream<br>central-services-health<br>inter-scheme-proxy-cache-lib"]
    step3["Étape 3 : Dépendances de second niveau<br>event-sdk"]
    step4["Étape 4 : Groupe à dépendances circulaires<br>central-services-shared<br>ml-schema-transformer-lib<br>sdk-standard-components"]
    step5["Étape 5 : Couche base de données<br>central-services-db"]
    step6["Étape 6 : Bibliothèques plateforme<br>logging-bc-public-types-lib<br>platform-shared-lib-messaging-types-lib<br>platform-shared-lib-nodejs-kafka-client-lib<br>logging-bc-client-lib"]
    step7["Étape 7 : Services principaux<br>central-ledger<br>central-settlement"]
    step8["Étape 8 : Services API<br>sdk-scheme-adapter<br>ml-api-adapter<br>account-lookup-service<br>auth-service"]
    step9["Étape 9 : Autres services<br>event-stream-processor<br>event-sidecar<br>central-event-processor<br>bulk-api-adapter<br>email-notifier<br>ml-testing-toolkit<br>ml-testing-toolkit-client-lib<br>ml-testing-toolkit-ui<br>quoting-service<br>thirdparty-api-svc<br>thirdparty-sdk<br>transaction-requests-service<br>als-oracle-pathfinder<br>als-consent-oracle<br>mojaloop-simulator<br>simulator"]
    note1["Remarque : les dépôts de l’étape 4<br>ont des dépendances circulaires.<br>Mettez-les à jour comme un ensemble."]
    %% Clear update sequence arrows
    step1 --> step2
    step2 --> step3
    step3 --> step4
    step4 --> step5
    %% Handle dependencies that can be updated in parallel
    step5 --> step7
    step6 --> step8
    %% Platform libraries need special handling
    step4 --> step6
    %% Final services depend on all previous updates
    step7 --> step9
    step8 --> step9
    %% Connect notes
    step4 --- note1
    %% Styling
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef note fill:#ffffcc,stroke:#333,stroke-width:1px;
    class note1 note;
```

Ce diagramme donne une représentation visuelle de la séquence de mise à jour et montre :

1. Le regroupement logique des dépôts
2. Les dépendances entre groupes
3. Les cas particuliers comme les dépendances circulaires
4. Les possibilités de mises à jour en parallèle
5. Les différents types de dépendances à prendre en compte
