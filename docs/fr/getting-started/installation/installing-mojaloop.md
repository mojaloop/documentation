# Installer Mojaloop

Mojaloop est packagé et publié sous forme d’un ensemble de [charts Helm](https://github.com/mojaloop/helm), avec différentes options de déploiement et de personnalisation.  
Que vous découvriez Mojaloop et que vous ne soyez pas familier avec [Helm](https://helm.sh) / [Kubernetes](https://kubernetes.io), ou que vous souhaitiez simplement mettre le logiciel en service rapidement, plusieurs options sont disponibles pour déployer Mojaloop.

1. **Déploiement manuel** - Le [guide de déploiement](../../technical/deployment-guide/) Mojaloop s’adresse aux personnes familières avec [Kubernetes](https://kubernetes.io) et [Helm](https://helm.sh). C’est un excellent point de départ si vous envisagez de déployer Mojaloop sur un environnement Kubernetes existant, ou si vous souhaitez en mettre un en place vous-même.

2. **IaC (Infrastructure as Code)** - Un déploiement Mojaloop complet visant à fournir une base de départ pour la production. L’IaC est fortement automatisée ([Terraform](https://www.terraform.io), [Ansible](https://www.ansible.com)) et extensible. Pour en savoir plus, consultez le [billet de blog sur le déploiement IaC](https://infitx.com/deploying-mojaloop-using-iac).

   L’IaC prend actuellement en charge les configurations modulaires suivantes :
   - [Plateforme IaC AWS (Amazon Web Services)](https://github.com/mojaloop/iac-aws-platform)
   - On-Prem (à venir)

3. **Mini-Loop** - Des utilitaires d’installation Mojaloop offrant une manière simple et efficace de démarrer. Les scripts [mini-Loop](https://github.com/tdaly61/mini-loop) permettent de déployer Mojaloop dans le cloud ou sur votre ordinateur/serveur avec seulement quelques commandes. Vous pouvez ensuite exécuter facilement le [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) pour interagir avec votre déploiement et le tester.

4. **Azure Marketplace** - Un déploiement natif Azure AKS, visant à fournir une base pour un POC ou un pilote. Il s’agit d’un déploiement simple, basé sur des templates Microsoft ARM fortement automatisés, et déployé sur Kubernetes managé pour faciliter l’exploitation. Exécutez le [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) pour interagir avec votre déploiement et le tester. Pour plus d’informations, voir la [présentation Mojaloop Azure (PI 21)](https://github.com/mojaloop/documentation-artifacts/blob/master/presentations/pi_21_march_2023/presentations/Mojaloop%20Azure%20Deployment.pdf).
