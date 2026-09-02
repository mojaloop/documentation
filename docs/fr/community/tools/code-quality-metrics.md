# Métriques de qualité du code

## Métriques de qualité fonctionnelle

### Métriques des tests unitaires

Une couverture élevée et des dépendances faibles indiquent que le code est testable, donc bien isolé et facile à maintenir. Une faible complexité rend le code lisible et maintenable et contribue à imposer le respect du principe de responsabilité unique. Les vrais tests unitaires s’exécutent très rapidement car ils n’appellent pas de composants externes.

| Métriques de qualité du code | Code nouveau et code du projet |
| :--- | :--- |
| Couverture des tests unitaires | ≥ 80 % de couverture par blocs |
| Vitesse des tests unitaires | ≤ 10 secondes |
| Dépendances / méthode | ≤ 10 |
| Complexité / méthode | ≤ 7 |

### Composant

Les tests fonctionnels couvrent en général des combinaisons par paires des états du système.

### Intégration

Les tests fonctionnels comportent un test par message et par erreur. Les messages et erreurs traités de la même manière utilisent le même test.

### Contrat

Limité à ce dont les équipes consommatrices ont besoin et qui n’est pas déjà couvert par les tests unitaires, de composant et d’intégration existants. Souvent enrichi au fil du temps.

### Bout en bout

Les tests bout en bout couvrent les tests d’acceptation à partir de scénarios.
