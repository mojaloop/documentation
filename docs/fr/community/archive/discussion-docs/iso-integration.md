# Discussions d’intégration Mojaloop — ISO

# Intégration Mojaloop — ISO

La solution proposée pourrait gérer la traduction ISO vers Open API et inversement via un connecteur ou plug-in « ISO–Open API », sur le modèle du Scheme Adapter Mojaloop. Comme le Scheme Adapter convertit l’API Mojaloop vers l’API FSP, le plug-in personnalisé ferait office de traducteur de protocole et de messages entre l’interface ISO et l’API ML ou le Scheme Adapter.

## Périmètre

Définir les flux de messages sur les réseaux ISO et Open API et les correspondances entre messages.
 - Documenter les scénarios d’échec et les flux associés.
 - Définir un mécanisme de routage basé sur le MSISDN.
 - Les transactions Mojaloop pourraient transiter par des rails de paiement existants conformes à leurs normes (ex. ISO).
 - Développer un scheme adapter / plug-ins capables d’effectuer ISO ↔ Open API.
 - Permettre d’envoyer des transactions Mojaloop issues d’ATM et de TPE sur des réseaux ISO, entre systèmes Mojaloop.

## ISO 8583 — Mojaloop — Étude de cas inter-réseaux

L’Afrique compte de nombreux fournisseurs de services financiers axés sur l’inclusion régionale. Parmi les réseaux notables :

-   InterSwitch (Nigeria)
-   eProcess (Ghana)
-   Umoja Switch (Tanzanie)
-   KenSwitch (Kenya)
-   ZimSwitch (Zimbabwe)
-   RSwitch (Rwanda)

La plupart utilisent une plateforme de traitement basée sur ISO 8583 (Postilion Switch) pour les canaux ATM, TPE et mobile, et les transactions carte / non carte côté acquisition et émission.

La proposition est de permettre à ces réseaux existants de s’intégrer à un système basé Mojaloop comme Mowali sans modifier leur infrastructure actuelle.

Dans cette étude de cas, on considère Umoja Switch en Tanzanie et une solution permettant d’acheminer des transactions Mojaloop via leurs ATM déployés.

### Umoja Switch

Umoja Switch a été créé en 2006 par six banques en Tanzanie pour une infrastructure financière partagée et des économies d’échelle.

L’objectif était une plateforme commune où les institutions financières s’intègrent via un switch partagé.

Le nombre de membres a augmenté ; environ 27 banques font partie du consortium aujourd’hui.

## Réseaux ISO vers Open API

L’objectif du POC est de montrer comment une transaction Mojaloop transite par un switch / réseau ISO standard jusqu’à un système Mojaloop tel que Mowali.

Un adaptateur ISO–Open API traiterait les messages ISO issus d’un réseau type InterSwitch et les enverrait vers un réseau Open API comme Mowali.

## Solution proposée

La solution comprend une interface ou un adaptateur / plug-in traitant les transactions entre réseaux ISO et systèmes Mojaloop.

La plateforme de paiement ISO utilise une interface ISO sur TCP/IP pour envoyer et recevoir des messages ISO depuis les canaux. Pour accepter ces connexions, la solution inclurait un écouteur TCP/IP recevant les transactions du réseau ISO, les mappant vers Open API, puis les envoyant vers Mojaloop (ex. Mowali) via une URL.

Les réseaux s’appuient souvent sur le numéro de carte ou de compte (Visa, MasterCard, Verve, etc.) et des tables BIN pour le routage. Une option est de réserver une plage BIN (ex. 757575) identifiant les transactions Mojaloop et de router tout le trafic « Moja » vers le réseau Open API.

L’adaptateur ISO–Open API convertirait le message ISO reçu du switch ISO au format Open API pour Mojaloop.

Cela implique des changements de configuration sur les applications des ATM et terminaux, comparables aux changements opérationnels habituels selon les besoins métier.

