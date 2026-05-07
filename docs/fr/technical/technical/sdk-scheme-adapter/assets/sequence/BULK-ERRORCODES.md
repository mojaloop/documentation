# Transferts groupés

## Cas d’erreur

### Phase de découverte

Toutes les erreurs rencontrées pendant cette phase sont agrégées dans le *mojaloop-connector*, ajoutées à l’objet `lastError` et renvoyées au FSP payeur avec l’ensemble des transferts réussis ou en échec inclus dans la requête de transfert groupé.

Le *mojaloop-connector* relaie les erreurs renvoyées par le commutateur (*pass-through*).

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Codes d’erreur — recherche de partie**

| Description de l’erreur                                                | Code erreur | Code HTTP        | Catégorie                                                |
|------------------------------------------------------------------------|-------------|------------------|----------------------------------------------------------|
| Erreur de communication                                                | 1000        | 503              | Erreur technique                                         |
| Erreur de communication vers la destination                            | 1001        | 503              | Erreur technique                                         |
| Erreur serveur générique                                               | 2000        | 503              | Erreur de traitement                                     |
| Erreur interne du serveur                                              | 2001        | 503              | Erreur de traitement                                     |
| Délai d’attente dépassé lors de la résolution de la partie             | 2004        | 503              | Erreur de traitement                                     |
| Erreur de validation générique                                         | 3100        | 400              | Erreur de validation de la requête                       |
| Partie introuvable                                                     | 3204        | 202              | Erreur de traitement                                     |

### Phase d’accord

Toutes les erreurs rencontrées pendant cette phase sont agrégées dans le *mojaloop-connector*, ajoutées à l’objet `lastError` et renvoyées au FSP payeur avec l’ensemble des transferts réussis ou en échec inclus dans la requête de transfert groupé.

Le *mojaloop-connector* relaie les erreurs renvoyées par le commutateur.

```
            "lastError": {
              "httpStatusCode": 202,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3204",
                  "errorDescription": "Party not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Codes d’erreur — devis**

| Description de l’erreur                                                | Code erreur | Code HTTP        | Catégorie                                                |
|------------------------------------------------------------------------|-------------|------------------|----------------------------------------------------------|
| Erreur de communication                                                | 1000        | 503              | Erreur technique                                         |
| Erreur de communication vers la destination                            | 1001        | 503              | Erreur technique                                         |
| Erreur serveur générique                                               | 2000        | 503              | Erreur technique                                         |
| Erreur interne du serveur                                              | 2001        | 503              | Erreur technique                                         |
| Non implémenté                                                         | 2002        | 501              | Erreur de traitement                                     |
| Service actuellement indisponible                                      | 2003        | 503              | Erreur de traitement                                     |
| Délai d’attente du serveur dépassé                                     | 2004        | 503              | Erreur de traitement                                     |
| Serveur occupé                                                         | 2005        | 503              | Erreur de traitement                                     |
| Erreur client générique                                                | 3000        | 400              | Erreur de validation de la requête                       |
| Version demandée inacceptable                                          | 3001        | 406              | Erreur « non acceptable »                                |
| URI inconnue                                                           | 3002        | 404              | Erreur « introuvable »                                   |
| Erreur de validation générique                                         | 3100        | 400              | Erreur de validation de la requête                       |
| Syntaxe incorrecte                                                     | 3101        | 400              | Erreur de validation de la requête                       |
| Élément obligatoire manquant                                           | 3102        | 400              | Erreur de validation de la requête                       |
| Trop d’éléments                                                        | 3103        | 400              | Erreur de validation de la requête                       |
| Charge utile trop volumineuse                                          | 3104        | 400              | Erreur de validation de la requête                       |
| Signature invalide                                                     | 3105        | 403              | Erreur « interdit »                                      |
| Erreur FSP destinataire                                                | 3201        | 404              | Erreur « introuvable »                                   |
| Identifiant FSP payeur introuvable                                     | 3202        | 404              | Erreur « introuvable »                                   |
| Identifiant FSP bénéficiaire introuvable                               | 3203        | 404              | Erreur « introuvable »                                   |
| Identifiant de devis introuvable                                    | 3205        | 404              | Erreur « introuvable »                                   |
| Identifiant de devis groupé introuvable                            | 3209        | 404              | Erreur « introuvable »                                   |
| Erreur d’expiration générique                                          | 3300        | 503              | Erreur de traitement                                     |
| Devis expirée                                                       | 3302        | 503              | Erreur de traitement                                     |
| Erreur payeur générique                                                | 4000        | 400              | Erreur de validation de la requête                       |
| Rejet payeur générique                                                 | 4100        | 403              | Erreur « interdit »                                      |
| Erreur de plafond payeur                                               | 4200        | 400              | Erreur de validation de la requête                       |
| Erreur d’autorisation payeur                                           | 4300        | 403              | Erreur « interdit »                                      |
| Erreur de blocage payeur générique                                     | 4400        | 403              | Erreur « interdit »                                      |
| Erreur bénéficiaire générique                                          | 5000        | 503              | Erreur de traitement                                     |
| Liquidité insuffisante côté FSP bénéficiaire                           | 5001        | 503              | Erreur de traitement                                     |
| Rejet bénéficiaire générique                                           | 5100        | 403              | Erreur « interdit »                                      |
| Devis rejetée par le bénéficiaire                                   | 5101        | 503              | Erreur de traitement                                     |
| Type de transaction non pris en charge par le FSP bénéficiaire         | 5102        | 503              | Erreur de traitement                                     |
| Devis rejetée par le bénéficiaire                                   | 5103        | 503              | Erreur de traitement                                     |
| Devise non prise en charge par le bénéficiaire                         | 5106        | 503              | Erreur de traitement                                     |
| Erreur de plafond bénéficiaire                                         | 5200        | 503              | Erreur de traitement                                     |
| Erreur d’autorisation bénéficiaire                                     | 5300        | 403              | Erreur « interdit »                                      |
| Erreur de blocage bénéficiaire générique                               | 5400        | 403              | Erreur « interdit »                                      |



### Phase de transfert

Toutes les erreurs rencontrées pendant cette phase sont agrégées dans le *mojaloop-connector*, ajoutées à l’objet `lastError` et renvoyées au FSP payeur avec l’ensemble des transferts réussis ou en échec inclus dans la requête de transfert groupé.

Le *mojaloop-connector* relaie les erreurs renvoyées par le commutateur.

```
            "lastError": {
              "httpStatusCode": 404,
              "mojaloopError": {
                "errorInformation": {
                  "errorCode": "3210",
                  "errorDescription": "Bulk transfer ID not found",
                  "extensionList": {"extension": [{"key": "string","value": "string"}]}
                }
              }
            }
```

**Codes d’erreur — transfert**

| Description de l’erreur                                                | Code erreur | Code HTTP        | Catégorie                                                |
|------------------------------------------------------------------------|-------------|------------------|----------------------------------------------------------|
| Erreur de communication                                                | 1000        | 503              | Erreur technique                                         |
| Erreur de communication vers la destination                            | 1001        | 503              | Erreur technique                                         |
| Erreur serveur générique                                               | 2000        | 503              | Erreur de traitement                                     |
| Erreur interne du serveur                                              | 2001        | 503              | Erreur de traitement                                     |
| Délai d’attente du serveur dépassé                                     | 2004        | 503              | Erreur de traitement                                     |
| Erreur de validation générique                                         | 3100        | 400              | Erreur de validation de la requête                       |
| Identifiant de transfert groupé introuvable                              | 3210        | 404              | Erreur de traitement                                     |
| Erreur d’expiration générique                                          | 3300        | 503              | Erreur de traitement                                     |
| Demande de transaction expirée                                         | 3301        | 503              | Erreur de traitement                                     |
| Transfert expiré                                                       | 3303        | 503              | Erreur de traitement                                     |
| Erreur bénéficiaire générique                                          | 5000        | 400              | Erreur de traitement                                     |
| Liquidité insuffisante côté FSP bénéficiaire                           | 5001        | 400              | Erreur de traitement                                     |
| Rejet bénéficiaire générique                                           | 5100        | 400              | Erreur de traitement                                     |
| Devis rejetée par le bénéficiaire                                   | 5101        | 400              | Erreur de traitement                                     |
| Type de transaction non pris en charge par le FSP bénéficiaire         | 5102        | 400              | Erreur de traitement                                     |
| Devis rejetée par le FSP bénéficiaire                                | 5103        | 400              | Erreur de traitement                                     |
| Transaction rejetée par le bénéficiaire                                | 5104        | 400              | Erreur de traitement                                     |
| Transaction rejetée par le FSP bénéficiaire                            | 5105        | 400              | Erreur de traitement                                     |
| Devise non prise en charge par le bénéficiaire                         | 5106        | 400              | Erreur de traitement                                     |
| Erreur de plafond bénéficiaire                                         | 5200        | 400              | Erreur de traitement                                     |
| Erreur d’autorisation bénéficiaire                                     | 5300        | 403              | Erreur de traitement                                     |
| Erreur de blocage bénéficiaire générique                               | 5400        | 400              | Erreur de traitement                                     |
