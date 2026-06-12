# Service Central Event Processor

Le service **Central Event Processor** (**CEP**) permet de surveiller un ensemble de règles métier ou de motifs prédéfinis ou configurés.

Dans l’itération actuelle, les règles portent sur trois critères :

  1. Dépassement d’un seuil sur la limite du plafond de débit net (qui peut être fixée lors de l’embarquement),
  2. Ajustement de la limite — plafond de débit net,
  3. Ajustement de position suite à un règlement.

Le CEP peut ensuite être couplé à un service de notification pour envoyer des notifications ou des alertes. Ici, il s’intègre à **email-notifier** pour envoyer des alertes selon les critères susmentionnés.

![Architecture du Central Event Processor](./assets/diagrams/architecture/CEPArchTechOverview.svg)
