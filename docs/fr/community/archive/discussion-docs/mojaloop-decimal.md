# Type décimal Mojaloop (basé sur le type décimal XML Schema)

## Type de valeur décimal

**Définition :** `decimal` représente un sous-ensemble des nombres réels exprimables en notation décimale. L’espace de valeurs est l’ensemble des nombres obtenus en multipliant un entier par une puissance non positive de dix, c’est-à-dire de la forme _i_ × 10<sup>−n</sup> où _i_ et _n_ sont des entiers et _n_ ≥ 0. La précision n’apparaît pas dans cet espace de valeurs : 2,0 n’est pas distinct de 2,00. La relation d’ordre est celle des réels, restreinte à ce sous-ensemble.

**Exigence :** tous les processeurs Level One doivent prendre en charge des nombres décimaux avec au minimum 18 chiffres décimaux. Les processeurs Level One peuvent toutefois se conformer à une limite maximale définie par le schéma sur le nombre de chiffres décimaux pris en charge, cette limite devant être ≥ 18 et être clairement documentée.

## Représentation lexicale

`decimal` a une représentation lexicale constituée d’une suite finie de chiffres décimaux (#x30 – #x39) séparés par un point comme séparateur décimal. Un signe initial optionnel est autorisé ; s’il est omis, « + » est supposé. Les zéros de tête et de fin sont optionnels. Si la partie fractionnaire est nulle, le point et les zéros suivants peuvent être omis. Exemples : -1,23, 12678967,543233, +100000,00, 210., 452

## Représentation canonique

La représentation canonique de `decimal` est définie en interdisant certaines options de la représentation lexicale (§3.2.3.1). En particulier, le signe « + » optionnel en tête est interdit. Le point décimal est obligatoire. Les zéros de tête et de fin sont interdits, sous réserve qu’il existe au moins un chiffre (éventuellement zéro) à gauche et à droite du point décimal.

Cette forme canonique est conforme à la représentation lexicale décimale XML ; tout système conforme aux schémas XML l’accepte.

Ce que d’autres écrivent en forme canonique, nous pouvons le lire comme représentation lexicale ; ce que nous écrivons en forme canonique, d’autres peuvent le lire comme représentation lexicale. Nous rejetons les formats exponentiels en lecture et n’écrivons pas en notation exponentielle. On peut comparer directement les chaînes canoniques de deux valeurs pour l’égalité.

Lors des échanges, une forme lexicale qui exprime la précision implicite avec des zéros de fin est préférable à la seule forme canonique si cela clarifie le message. Ex. : écrire « 5,00 » plutôt que « 5,0 » lorsque l’unité d’échange est en général précisée à deux décimales (USD, EUR, GBP). Cette option est permise dans les formes lexicales valides du décimal XML et du décimal Mojaloop.

## Validateurs

Validateur lexical décimal (ce que nos récepteurs de messages acceptent) :

```^[-+]?(([0-9]+[.]?[0-9]*)|([.]?[0-9]+))$```

Validateur décimal canonique (forme stockée et comparée ; peut servir à vérifier la forme canonique des messages générés) :

```^([0]|([-]?[1-9][0-9]*))[.]([0]|([0-9]*[1-9]))$```

## Traduction entre formes externes et internes

Lors du passage de la forme lexicale ou canonique vers une représentation binaire interne, l’espace de valeurs de la représentation interne doit être suffisant pour couvrir la plage décimale définie par le schéma, avec une mantisse signée dans l’intervalle −10<sup>_m_−1</sup>..10<sup>_m_−1</sup> et un exposant entier non positif dans l’intervalle −_m_..0, où _m_ est le nombre maximal de chiffres décimaux, au moins 18, tel que défini par le schéma Level One spécifique.

Une implémentation ne doit pas traduire entre représentations décimales externes et une représentation binaire en virgule flottante. Tous les calculs sur les représentations internes des valeurs décimales doivent produire des résultats comme s’ils étaient effectués « à la main » en décimal sur la représentation externe.

L’espace de valeurs d’un entier signé 64 bits suffit pour encoder une mantisse décimale signée sur 18 chiffres ; un entier signé 6 bits suffit pour encoder l’exposant en base dix non positif requis.
