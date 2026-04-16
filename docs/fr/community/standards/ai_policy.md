# Politique relative à l’usage responsable d’outils d’intelligence artificielle (IA) par les membres de la communauté

- Version : 1.0
- Date d’entrée en vigueur : 2026-04-08
- Auteur : James Bush (jbush@mojaloop.io)
- S’applique à : Tous les contributeurs, mainteneurs, adoptants et participants à la communauté Mojaloop et à ses projets associés, y compris les dépôts sous l’organisation GitHub Mojaloop.

**Divulgation relative à l’IA** Ce document comporte du contenu produit avec l’aide de ChatGPT 5.2. L’ensemble du contenu a été relu et validé par l’auteur.

---

## 1. Objet

Cette politique définit des lignes directrices claires et pragmatiques pour l’usage responsable d’outils d’intelligence artificielle (IA) au sein de la communauté Mojaloop.

La Fondation Mojaloop soutient l’innovation et le gain de productivité, y compris l’usage d’outils assistés par l’IA. Toutefois, la transparence, la responsabilité et la confiance de la communauté demeurent essentielles. Cette politique vise à ce que l’usage de l’IA renforce la collaboration sans compromettre l’ouverture, l’intégrité de la paternité des contenus ni la qualité technique.

---

## 2. Principes directeurs

Tout usage de l’IA au sein de la communauté Mojaloop doit respecter les principes suivants :

1. **Responsabilité humaine** – Un contributeur humain assume toujours la responsabilité du résultat final.
2. **Transparence** – L’usage de contenu généré par l’IA doit être clairement indiqué.
3. **Qualité et sécurité** – Les productions assistées par l’IA doivent respecter les normes d’ingénierie et de documentation de Mojaloop.
4. **Intégrité de la communauté** – L’IA ne doit pas être utilisée de manière à perturber ou submerger les processus communautaires.

---

## 3. Usages autorisés des outils d’IA

### 3.1 L’IA comme prise de notes lors des appels communautaires

Les outils d’IA peuvent servir à prendre des notes pendant les **appels publics de la communauté Mojaloop**, sous réserve des conditions suivantes :

- L’utilisateur de l’outil d’IA **doit être personnellement présent** à l’appel, sauf autorisation préalable de l’animateur ou de l’animatrice de la réunion.
- Les outils de prise de notes par l’IA ne peuvent pas rejoindre les appels indépendamment d’un participant humain sans autorisation préalable explicite de l’animateur ou de l’animatrice.
- Les robots IA anonymes ne sont pas autorisés. Tout robot IA doit indiquer publiquement le membre humain de la communauté qu’il représente.
- Les outils de prise de notes par l’IA ne peuvent rejoindre que les appels pour lesquels l’enregistrement est activé.

**Justification :**
La communauté Mojaloop valorise la discussion ouverte et la sécurité psychologique. La présence de nombreux robots d’enregistrement ou de synthèse sans supervision peut décourager la participation et nuire à la collaboration.

---

### 3.2 Assistance par l’IA pour la documentation

Les membres de la communauté peuvent utiliser des outils d’IA pour :

- Rédiger de la documentation
- Améliorer la clarté ou la grammaire
- Reformater le contenu
- Produire des synthèses
- Traduire du contenu

Toutefois :

- Tout document dans lequel l’IA a généré **une partie du contenu** doit comporter, dans l’en-tête du document, une mention claire indiquant :
  - que des outils d’IA ont été utilisés ;
  - quels outils d’IA ont été utilisés.

**Exemple de mention de divulgation :**

  _Ce document comporte du contenu produit avec l’aide de [Nom de l’outil]. L’ensemble du contenu a été relu et validé par l’auteur._

Le défaut de divulgation d’une génération assistée par l’IA peut entraîner le rejet du document ou son renvoi pour correction.

**Justification :**
La transparence préserve la confiance dans la paternité des textes et permet aux lecteurs et lectrices d’évaluer correctement la provenance.

---

### 3.3 Assistance par l’IA pour la création et le débogage du code

Les outils d’IA peuvent être utilisés pour :

- Génération de code
- Suggestions de code
- Aide au refactoring
- Support au débogage
- Génération de tests
- Génération de documentation pour le code

Les règles suivantes s’appliquent toutefois strictement :

#### 3.3.1 Obligation de soumission par un humain

- Toutes les pull requests (PR), issues et soumissions de code doivent être effectuées par des contributeurs humains.
- Les agents IA entièrement automatisés ne peuvent pas soumettre de PR, correctifs de bogues ou modifications de code.
- Toutes les pull requests (PR), issues et soumissions de code doivent respecter les exigences du processus d’ingénierie produit de la communauté Mojaloop.
- La seule exception concerne les outils automatisés officiellement pris en charge et déjà intégrés aux flux de travail GitHub (par ex. robots de mise à jour des dépendances tels que Dependabot).

Toute soumission par un agent automatisé autre que les outils natifs GitHub approuvés sera **rejetée sans examen**.

---

#### 3.3.2 Revue humaine obligatoire

Pour tout code assisté par l’IA :

- il **DOIT** être soigneusement relu par la personne qui le soumet ;
- il **DOIT** être entièrement compris par cette personne ;
- il **DOIT** respecter les normes de codage et les principes d’architecture de Mojaloop ;
- il **DOIT** réussir l’ensemble des tests automatisés et des pipelines de validation.

Un code manifestement généré par l’IA et qui n’a pas été correctement relu, validé et compris par le contributeur humain ne sera pas accepté dans la base de code.

La personne qui soumet la PR demeure entièrement responsable de :

- l’exactitude ;
- la sécurité ;
- le respect des licences ;
- la cohérence architecturale ;
- la maintenabilité à long terme.

**Justification :**
Mojaloop évolue dans le domaine des services financiers. L’intégrité, la sécurité et l’exactitude du code sont non négociables.

---

## 4. Usages interdits

Les usages suivants de l’IA ne sont pas autorisés dans les processus de la communauté Mojaloop :

- Robots IA non supervisés rejoignant les appels communautaires.
- Agents IA entièrement autonomes soumettant des PR ou des issues.
- Soumission de contenu généré par l’IA sans la divulgation requise (lorsqu’elle s’applique).
- Déléguer des décisions d’architecture ou de conception à des outils d’IA.
- Utiliser des outils d’IA pour extraire, résumer ou redistribuer des informations restreintes ou confidentielles sans autorisation.

---

## 5. Application

Les mainteneurs et les personnes chargées de la revue peuvent :

- Demander l’ajout de mentions de divulgation ;
- Rejeter des PR qui semblent insuffisamment relues ;
- Fermer sans commentaire les soumissions d’agents automatisés ;
- Demander des précisions sur le recours à l’IA.

Les manquements répétés ou délibérés peuvent être escaladés conformément aux procédures de gouvernance de la communauté Mojaloop.

---

## 6. Révision future

Les capacités de l’IA évoluent rapidement. Cette politique sera réexaminée périodiquement par la Fondation Mojaloop et les mainteneurs de la communauté afin qu’elle reste adaptée, pratique et alignée sur les valeurs de la communauté.

---

## 7. Synthèse

Les outils d’IA sont autorisés au sein de la communauté Mojaloop lorsqu’ils sont utilisés de manière responsable et transparente.

- Les humains doivent demeurer responsables.
- L’IA ne doit pas submerger les processus communautaires.
- La divulgation est requise dans la documentation.
- Le code doit toujours être relu et soumis par un humain.

La Fondation Mojaloop encourage une adoption réfléchie des outils d’IA de manière à renforcer, et non à diluer, la qualité, la confiance et l’esprit collaboratif de l’écosystème Mojaloop.

