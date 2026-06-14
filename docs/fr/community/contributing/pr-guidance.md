# Directives pour les pull requests

> **S’applique à :** Tous les contributeurs soumettant des pull requests aux dépôts de l’[organisation GitHub Mojaloop](https://github.com/mojaloop).
> Ces directives complètent le [guide des contributeurs](contributors-guide.md), la [politique d’usage responsable de l’IA](../standards/ai_policy.md) et le [processus d’ingénierie produit](product-engineering-process.md).

**Divulgation IA** Ce document inclut du contenu généré avec l’assistance de Claude Sonnet 4.6. L’ensemble du contenu a été relu et validé par l’auteur.


---

## 1. Avant d’ouvrir une PR

### 1.1 Commencer par un ticket GitHub

Chaque PR doit être liée à un ticket GitHub. N’ouvrez pas de PR sans ticket.

- Si aucun ticket pertinent n’existe, **créez-le d’abord** et laissez le temps au triage ou à la discussion avant de commencer l’implémentation — en particulier pour les changements non triviaux.
- Les tickets sont l’espace principal pour la discussion de conception, les décisions de périmètre et l’alignement avec les mainteneurs. Utilisez-les.


### 1.2 Discuter d’abord des changements conséquents ou critiques

Si votre changement touche des interfaces partagées, la logique de règlement ou de compensation, les API centrales ou du code sensible à la sécurité, consultez le [processus de changement conséquent](https://docs.mojaloop.io/community/contributing/consequential-change-process.html) et le [processus de changement critique](https://docs.mojaloop.io/community/contributing/critical-change-process.html) **avant d’écrire du code**. Soumettre un changement architectural majeur en PR surprise entraînera son renvoi pour discussion préalable.

---

## 2. Titres des pull requests

Mojaloop utilise [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) pour l’outillage automatisé de releases et déploiements. Le titre de votre pull request **doit** respecter la spécification des commits conventionnels pour passer les contrôles CI/CD dans CircleCI.

Avec Conventional Commits et le versionnement sémantique, une nouvelle version peut être publiée automatiquement pour un composant, avec incrément `MAJOR`, `MINOR` ou correctif selon les titres de PR, et génération de changelogs détaillés. (Voir [cet exemple](https://github.com/mojaloop/thirdparty-scheme-adapter/releases/tag/v11.20.0) de changelog auto-généré.)

> **Note** :
> Lors de la fusion (avec squash), GitHub utilise le *titre* de la PR comme message de commit. Pour indiquer un changement rupturiste, utilisez le format avec `!` :
> « Si inclus dans le préfixe type/scope, les changements rupturistes DOIVENT être indiqués par un ! immédiatement avant les deux-points. Si ! est utilisé, BREAKING CHANGE: peut être omis du pied de page, et la description du commit DOIT décrire le changement rupturiste. »

#### Exemples de bons titres de PR

- feat(api): add ability to handle `PUT /thirdpartyRequests/trasactions/{ID}` endpoint
- fix: update outdated node modules
- feat(models)!: change database schema
- chore: tidy up readme

---

## 3. Garder les PR petites et ciblées

C’est la chose la plus importante que vous puissiez faire pour aider les reviewers et les mainteneurs.

### 3.1 Une PR, un objectif

Une pull request doit faire exactement une chose : corriger un bug, implémenter une fonctionnalité ou traiter un sujet précis. Les PR à objectifs multiples sont difficiles à revoir, difficiles à annuler en cas de problème et créent un historique de commits ambigu.

**Ne combinez pas :**
- Un correctif de bug et un refactoring
- Une fonctionnalité et un nettoyage de tests sans lien
- Des mises à jour de dépendances et des changements fonctionnels
- Des changements d’espacement et des changements fonctionnels

Si vous vous surprenez à écrire « et aussi… » dans la description de la PR, c’est le signe qu’il faut la scinder.

Notez que des changements massifs d’espacement, par exemple une réindentation, peuvent masquer l’objectif d’un changement sous-jacent. Séparez les grands changements d’espacement dans leurs propres PR pour faciliter la revue.

### 3.2 Viser une taille de diff appropriée

Il n’existe pas de limite stricte en nombre de lignes, mais voici un guide pratique :

| Taille du diff | Attente |
|---|---|
| < 200 lignes | Idéal. Peut être revu rapidement et en profondeur. |
| 200 – 500 lignes | Acceptable pour des changements bien cadrés et bien contextualisés. |
| 500 – 1000 lignes | Nécessite une justification solide. Envisagez de scinder. |
| > 1000 lignes | Sera probablement renvoyée pour être découpée, sauf si le changement est intrinsèquement atomique (par ex. un fichier généré, un renommage massif). |

Lorsqu’un changement important est réellement atomique — par exemple une migration de schéma, une sortie de génération de code ou un renommage en masse — ajoutez une note expliquant pourquoi il ne peut pas être scindé.

### 3.3 Séparer le refactoring des changements fonctionnels

Si vous devez refactoriser du code avant d’apporter un changement fonctionnel, soumettez d’abord le refactoring dans sa propre PR. Mélanger refactoring et changements de comportement rend difficile la vérification qu’aucune régression n’a été introduite.

### 3.4 Garder des commits propres

Squashez ou réorganisez vos commits avant d’ouvrir la PR afin que chaque commit représente une étape logique et autonome. Évitez les commits du type `fix typo`, `wip` ou `try again`. Un historique de commits propre aide les reviewers et rend `git bisect` utile.

---

## 4. Rédiger une bonne description de PR

Une description bien rédigée n’est pas optionnelle — elle fait partie de votre contribution. Les reviewers ne doivent pas avoir à reconstruire votre intention à partir du diff.

Votre description de PR doit inclure :

### 4.1 Quoi et pourquoi

Expliquez **ce que** fait le changement et **pourquoi** il est nécessaire. Liez le ticket GitHub pertinent. Ne vous contentez pas de reprendre le titre du ticket — ajoutez le contexte dont un reviewer a besoin pour évaluer vos choix d’implémentation.

### 4.2 Comment tester

Décrivez comment le reviewer peut vérifier que le changement fonctionne correctement. Incluez :
- Les étapes pour reproduire le problème (pour les correctifs de bug)
- Comment exercer le nouveau comportement (pour les fonctionnalités)
- Des indications vers les tests automatisés pertinents

Si un changement ne peut pas être testé automatiquement, expliquez pourquoi et décrivez la vérification manuelle que vous avez effectuée.

### 4.3 Changements rupturistes

Si votre PR introduit un changement rupturiste — sur une API, une interface de configuration, un schéma de base de données ou un contrat partagé — signalez-le **explicitement et de façon visible** en tête de la description. Les changements rupturistes nécessitent une revue supplémentaire et peuvent devoir suivre le [processus de changement conséquent](https://docs.mojaloop.io/community/contributing/consequential-change-process.html).

### 4.4 Divulgation de l’assistance IA (voir section 5)

Si des outils d’IA ont été utilisés pour produire une partie de la PR — code, tests ou description de PR — cela doit être divulgué dans la description de la PR. Voir la section 5 pour le format requis.

---

## 5. Assistance IA : attribution et responsabilité

La [politique IA Mojaloop](https://docs.mojaloop.io/community/standards/ai_policy.html) s’applique à toutes les contributions par PR. Les règles suivantes en distillent les exigences concrètes pour les PR.

### 5.1 La divulgation est obligatoire

Si un outil d’IA (y compris, sans s’y limiter, GitHub Copilot, ChatGPT, Claude, Gemini, Cursor ou équivalent) a assisté la production de **toute partie de votre PR** — y compris le code, les tests, les messages de commit ou la description de PR elle-même — vous devez inclure le bloc de divulgation suivant dans la description de votre PR :

```
**Divulgation de l’assistance IA**
Des outils d’IA ont été utilisés pour produire une partie de cette contribution.
Outils utilisés : [liste des outils et versions si connues]
Périmètre : [brève description de ce qui a été assisté par l’IA, par ex. « échafaudage de tests unitaires », « implémentation initiale de la fonction X », « brouillon de description de PR »]
L’ensemble du contenu généré par l’IA a été relu, compris et validé par l’auteur.
```

Tous les fichiers de code de l’organisation GitHub Mojaloop doivent inclure un en-tête de licence et de contributeurs. Assurez-vous que les fichiers que vous modifiez contiennent votre nom et votre adresse e-mail actuelle dans la liste. Si vous avez utilisé l’IA, vous devez inclure les détails des outils utilisés à côté de votre nom et de votre e-mail, ainsi :

```
 - {votre nom} <{votre e-mail}> [Assisté par {nom du modèle} {version du modèle}] 
```

Par exemple :
```
/*****
 License
 --------------
 Copyright © 2026 Mojaloop Foundation

 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0
 (the "License") and you may not use these files except in compliance with the [License](http://www.apache.org/licenses/LICENSE-2.0).

 You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the [License](http://www.apache.org/licenses/LICENSE-2.0).

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - James Bush <jbush@mojaloop.io> [Assisted by Claude Sonnet 4.6]

 --------------
 ******/
```

Omettre cette divulgation lorsque l’IA a été utilisée constitue une violation de la politique IA et entraînera le renvoi de la PR.

### 5.2 Vous êtes entièrement responsable de tout le code soumis

La divulgation n’est pas une décharge de responsabilité. Que l’assistance IA ait été utilisée ou non, l’auteur humain de la PR est entièrement responsable de :

- La **justesse** de la logique
- La **sécurité** de l’implémentation
- La **cohérence architecturale** avec les normes Mojaloop
- La **conformité aux licences** — vous ne devez pas soumettre de code généré par l’IA issu de données d’entraînement sous licence non autorisée
- La **maintenabilité à long terme** de ce que vous avez introduit

« L’IA l’a écrit » n’est pas une réponse acceptable à un commentaire de revue. Si vous ne pouvez pas expliquer et défendre chaque partie de votre PR, elle n’est pas prête à être soumise.

### 5.3 L’IA ne doit pas se substituer au jugement humain

Les outils d’IA ne peuvent pas être utilisés pour prendre ou déléguer des décisions architecturales ou de conception. Lorsqu’un outil d’IA propose une approche qui s’écarte des motifs ou invariants Mojaloop établis, le contributeur humain est responsable de le reconnaître et de le corriger avant la soumission.

### 5.4 Les soumissions par agents automatisés sont interdites

Les PR ne peuvent pas être soumises par des agents IA entièrement autonomes. Toutes les PR doivent être ouvertes par un contributeur humain. La seule exception concerne l’automatisation GitHub native officiellement approuvée déjà intégrée aux workflows Mojaloop (par ex. Dependabot, Snyk, outillage automatisé de maintenance de la Mojaloop Foundation). Les soumissions par agents automatisés seront rejetées sans revue.

---

## 6. Checklist de qualité du code

Avant de marquer une PR prête pour revue, confirmez les points suivants :

- La PR est liée à un ticket GitHub avec un mot-clé de clôture
- La PR fait exactement une chose ; les changements sans lien ont été retirés ou scindés
- Tous les tests automatisés passent localement
- Le nouveau comportement est couvert par des tests
- Aucune nouvelle erreur ou alerte de linting n’a été introduite
- Les changements de dépendances sont justifiés et minimaux
- Tout changement rupturiste est clairement signalé
- La description de la PR explique quoi, pourquoi et comment tester
- La divulgation de l’assistance IA est incluse le cas échéant (voir section 5.1)
- Vous avez lu, compris et pouvez défendre chaque ligne du diff

---

## 7. Attentes envers les reviewers

Les reviewers sont des bénévoles qui donnent de leur temps. Aidez-les à vous aider.

- **Répondez rapidement** aux commentaires de revue. Si vous avez besoin de temps, dites-le.
- **N’ajoutez pas de changements sans lien** à une PR déjà en cours de revue sans les signaler.
- **Ne rebasez pas et ne force-push pas** une PR qui fait l’objet de commentaires de revue actifs — cela perturbe le contexte du reviewer. Coordonnez-vous d’abord.
- Si un reviewer vous demande de scinder une PR, faites-le. Ce n’est pas une critique ; c’est ainsi que Mojaloop maintient un historique revueable et bisectable.
- Une PR sans activité pendant **30 jours** peut être fermée par un mainteneur. Elle peut être rouverte lorsque vous êtes prêt à continuer.

---

## 8. PR brouillon

Utilisez la fonctionnalité GitHub **Draft PR** pour les travaux en cours. Cela indique aux mainteneurs et reviewers qu’un retour sur l’orientation générale est le bienvenu, mais qu’une revue complète n’est pas encore demandée. Passez à « Ready for Review » uniquement lorsque tous les éléments de la checklist ci-dessus sont satisfaits.

---

## 9. Correctifs urgents et changements critiques

Pour les correctifs de sécurité critiques ou les bugs bloquants en production, suivez le [processus de changement critique](https://docs.mojaloop.io/community/contributing/critical-change-process.html). Même sous la pression du temps, l’exigence de divulgation IA et la checklist de qualité du code s’appliquent toujours. Une revue rapide n’est pas une autorisation de les contourner.

---

*Pour toute question sur ces directives, publiez sur le canal Slack du workstream concerné ou ouvrez un ticket GitHub contre le [dépôt documentation](https://github.com/mojaloop/documentation).*
