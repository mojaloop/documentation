# Documentation des API

Toutes les API devraient être documentées en RAML ou Swagger, voir [Architecture-Documentation-Guidelines](Architecture-Documentation-Guidelines.md).

**En-têtes de section**

* Ne numérotez pas les titres de sections - par exemple, utilisez « Préparer et Exécuter », et non « C - Préparer et Exécuter »
* Assurez-vous que les titres de section (\#) correspondent à ceux du PDF complet (généré à partir du [fichier de configuration dactyl](https://github.com/Mojaloop/Docs/blob/master/ExportDocs/dactyl-config.yml))
* N’incluez pas le mot « documentation » dans les titres

#### Repérabilité

* Pour les sections qui contiennent de nombreux sous-ensembles de points de terminaison ou méthodes, fournissez une table des matières au début de la section
* N’utilisez pas le mot « projet » ; préférez des termes comme composant, microservice, interface, etc.

#### Langage

Au lieu du mot « projet », utilisez un nom spécifique comme composant, microservice ou interface.

#### Procédures

* Introduisez les procédures avec des titres H3 (\#\#\#) ou H4 (\#\#\#\#), pas des H2 (\#\#).
* N’utilisez pas de numéros dans les titres de section concernant les procédures.
* Utilisez la numérotation ordonnée (liste numérotée) pour les étapes des procédures. Par exemple :
* Étape 1
* Étape 2
* Étape 3
