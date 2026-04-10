# Glossaire

Cette section sert de glossaire des termes des opérations techniques et fournit des définitions :

* des termes clés guidés par les bonnes pratiques de la bibliothèque d'infrastructure des technologies de l'information (ITIL)
* des indicateurs clés de performance (KPI), c'est-à-dire des métriques qui aident à déterminer si les objectifs spécifiques de gestion des incidents sont atteints

## Termes clés

**Gestion des changements :** La gestion des changements est le processus d'enregistrement, d'approbation, d'exécution, de clôture et de révision de tous les changements. Le changement peut être soit contractuel (comme la signature initiale d'un contrat, une mise à niveau de SLA, de nouvelles ressources nécessaires, etc.), soit opérationnel résultant d'une demande de changement.

**Escalade :** La reconnaissance du fait qu'un incident nécessite des ressources supplémentaires pour respecter les objectifs de niveau de service ou les attentes des utilisateurs, en tenant compte de la criticité, de l'impact et de l'urgence de l'incident.

**Centre d'assistance/Service Desk :** Le point de contact unique entre le fournisseur de services et les utilisateurs. Un Service Desk typique gère les incidents et les demandes de service, et assure également la communication avec les utilisateurs.

**Incident :** Une interruption non planifiée d'un service informatique, ou une réduction de la qualité d'un service informatique. La défaillance d'un élément de configuration qui n'a pas encore impacté le service est également un incident ; par exemple, la défaillance d'un disque dans un ensemble en miroir.

**Processus de gestion des incidents (IMP) :** Le processus de gestion du cycle de vie de tous les incidents. L'objectif principal de la gestion des incidents est de restaurer le fonctionnement normal du service informatique aussi rapidement que possible avec le soutien de l'ensemble de l'organisation en place.

**Enregistrement/ticket d'incident :** Un enregistrement contenant les détails d'un incident. Chaque enregistrement d'incident (également appelé ticket) documente le cycle de vie d'un seul incident.

**Priorité :** Une catégorie utilisée pour identifier l'importance relative d'un incident ou d'un changement. La priorité est utilisée pour identifier les délais requis pour les actions à entreprendre.

**Gestion des mises en production :** La gestion des mises en production est le processus de gestion, de planification, de programmation, de mise en œuvre et de contrôle d'une version logicielle à travers différentes étapes et environnements, dans le but de fournir des fonctionnalités aux clients ou aux utilisateurs finaux.

**Demande de changement (RFC) :** La demande de changement (ou simplement demande de modification) est une demande formelle pour la mise en œuvre d'un changement. La RFC est un précurseur de l'« enregistrement de changement » et contient toutes les informations nécessaires pour approuver et exécuter un changement.

**Rôle :** Un ensemble de responsabilités, d'activités et d'autorisations accordées à une personne ou une équipe. Les rôles sont utilisés pour attribuer des propriétaires aux différents processus de gestion des incidents et pour définir les responsabilités des activités dans les définitions détaillées des processus.

**Analyse des causes premières (RCA) :** La RCA est un terme collectif qui décrit un large éventail d'approches, d'outils et de techniques utilisés pour découvrir les causes des incidents. Elle est invoquée lors de chaque incident urgent et chaque fois qu'un incident se produit plus d'une fois.

**Accord de niveau de service (SLA) :** Un accord entre un fournisseur de services informatiques et un client. Le SLA décrit le service informatique, documente les objectifs de niveau de service et précise les responsabilités du fournisseur de services informatiques et du client.

**Sévérité :** Une mesure de l'effet d'un incident sur les processus métier.

**TAT (Délai de traitement) :** Il s'agit du temps écoulé entre le moment où l'incident est signalé et le moment où il est résolu et clôturé. Il comprend le temps d'intervention garanti (GIT) et le temps de résolution garanti (GRT).

## Indicateurs clés de performance (KPI)

**Taux de disponibilité (Taux de disponibilité du service) :** La disponibilité de l'ensemble de la solution technique pour fournir le service par DFSP.

**Durée moyenne de clôture des incidents :** Durée moyenne entre l'enregistrement des incidents et leur clôture.

**Temps moyen de réponse aux incidents :** La durée moyenne (par exemple, en minutes) entre la détection d'un incident et la première action entreprise pour réparer l'incident.

**Nombre moyen d'incidents résolus par le Service Desk :** Nombre moyen d'incidents résolus par le Service Desk par rapport à tous les incidents ouverts.

**Temps d'intervention garanti (GIT) :** Le temps écoulé entre le moment où un incident est signalé (par exemple, un courriel est envoyé à l'outil Service Desk) et le moment où une réponse d'accusé de réception est renvoyée au signaleur du problème.

**Temps de résolution garanti (GRT) :** Somme du temps total consacré à la résolution d'un problème par toutes les parties. (Le statut du problème doit être « En cours » ou « Escaladé » pour être comptabilisé dans la somme totale. Les statuts « En attente » ou « Clôturé » ne sont pas pris en compte dans le calcul de la somme totale.)

**Incidents résolus sans escalade :** Le pourcentage (%) d'incidents résolus dans le cadre du SLA sans aucune escalade.

**Taux de file d'attente des incidents :** Le nombre d'incidents clôturés par rapport au nombre d'incidents ouverts sur une période donnée.

**Temps moyen entre les pannes (MTBF) :** Le temps moyen entre les pannes réparables d'un produit technologique. Cette métrique est utilisée pour suivre à la fois la disponibilité et la fiabilité d'un service informatique ou de tout autre élément de configuration, afin d'évaluer s'ils peuvent remplir leur fonction convenue sans interruption. Plus le temps entre les pannes est élevé, plus le système est fiable.

**Temps moyen d'accusé de réception (MTTA) :** Le temps moyen entre le déclenchement d'une alerte et le début du travail sur le problème. Cela mesure le temps qu'il faut à une organisation pour répondre aux plaintes, pannes ou incidents dans tous les départements en moyenne. Cette métrique est utile pour suivre la réactivité d'une équipe et l'efficacité d'un système d'alerte.

**Temps moyen de détection (MTTD) – « Actions proactives » :** La différence entre le début de tout événement considéré comme ayant un impact sur les revenus et sa détection effective par le technicien qui initie ensuite une action spécifique pour rétablir l'événement à son état d'origine. Ce n'est pas la même chose que de démarrer le chronomètre du temps moyen de réparation (MTTR) (c'est-à-dire une fois que le technicien reçoit un ticket). Le début de tout événement ayant un impact sur les revenus est presque toujours enregistré à un moment précis par un équipement spécifique. L'élément clé est d'intégrer l'outil de détection dans l'environnement du technicien, puis de mesurer la différence entre l'horodatage de l'événement et la première action du technicien indiquant la reconnaissance de l'événement (MTTD).

**Temps moyen jusqu'à la défaillance (MTTF) :** Le temps moyen entre les pannes non réparables d'un produit technologique (principalement le matériel).

**Temps moyen de réparation (MTTR) :** Fait référence au temps moyen nécessaire pour réparer un système et le restaurer à sa pleine fonctionnalité. \
\
Le chronomètre MTTR commence à tourner lorsque les réparations commencent et continue jusqu'à ce que les opérations soient restaurées. Cela inclut le temps de réparation, la période de test et le retour à la condition de fonctionnement normal.

**Temps moyen de récupération :** Le temps moyen de récupération est une mesure du temps entre le moment où la panne est découverte pour la première fois et le moment où le service reprend son fonctionnement. Ainsi, en plus du temps de réparation, de la période de test et du retour à la condition de fonctionnement normal, il capture le temps de notification de la panne et le diagnostic.

**Arriéré d'anciens incidents :** Nombre d'incidents ouverts de plus de 28 jours (ou tout autre délai donné) par rapport à tous les incidents ouverts.

**Pourcentage d'incidents résolus dans les délais/objectifs :** Nombre d'incidents clôturés dans le délai autorisé, par rapport au nombre total d'incidents clôturés sur une période donnée. Un délai est appliqué à chaque incident lors de sa réception et fixe une limite au temps disponible pour résoudre l'incident. Le délai appliqué est dérivé des accords conclus avec le client concernant la résolution des incidents.

**Pourcentage d'incidents résolus dans le délai SLA :** Nombre total d'incidents résolus dans le délai SLA, divisé par le nombre total d'incidents.

**Pourcentage d'indisponibilité due aux incidents :** Pourcentage d'indisponibilité due aux incidents, par rapport aux heures de service.

**Pourcentage d'incidents en retard :** Nombre d'incidents en retard (non clôturés et non résolus dans le délai établi) par rapport au nombre d'incidents ouverts (non clôturés).

**Pourcentage d'incidents répétés :** Pourcentage d'incidents pouvant être classés comme incidents répétés, par rapport à tous les incidents signalés au cours de la période de mesure. Un incident répété est un incident qui s'est déjà produit (plusieurs fois) au cours de la période de mesure.
