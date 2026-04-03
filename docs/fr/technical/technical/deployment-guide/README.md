# Déploiement Mojaloop

Ce document s’adresse à un public disposant de solides connaissances techniques et souhaitant mettre en place un environnement pour le développement, les tests et la contribution au projet Mojaloop.

## Déploiement et configuration

- [Déploiement Mojaloop](#déploiement-mojaloop)
  - [Déploiement et configuration](#déploiement-et-configuration)
    - [1. Prérequis](#_1-prérequis)
    - [2. Recommandations de déploiement](#_2-recommandations-de-déploiement)
    - [3. Kubernetes](#_3-kubernetes)
      - [3.1. Contrôleur d’entrée Kubernetes (Ingress)](#_3-1-contrôleur-dentrée-kubernetes-ingress)
      - [3.2. Interfaces d’administration Kubernetes](#_3-2-interfaces-dadministration-kubernetes)
    - [4. Helm](#_4-helm)
      - [4.1. Configuration Helm](#_4-1-configuration-helm)
    - [5. Mojaloop](#_5-mojaloop)
      - [5.1. Déploiement Helm du backend (prérequis)](#_5-1-déploiement-helm-du-backend-prérequis)
      - [5.2. Déploiement Helm Mojaloop](#_5-2-déploiement-helm-mojaloop)
      - [5.3. Vérification des règles Ingress](#_5-3-vérification-des-règles-ingress)
      - [5.4. Tester Mojaloop](#_5-4-tester-mojaloop)
      - [5.5. Tester Mojaloop avec Postman](#_5-5-tester-mojaloop-avec-postman)
    - [6. Services superposés / 3PPI](#_6-services-superposés--3ppi)
      - [6.1 Configurer un déploiement pour la prise en charge de l’API tierce](#_61-configurer-un-déploiement-pour-la-prise-en-charge-de-lapi-tierce)
      - [6.2 Valider et tester l’API tierce](#_62-valider-et-tester-lapi-tierce)
        - [6.2.1 Déployer les simulateurs](#_621-déployer-les-simulateurs)
        - [6.2.2 Provisionner l’environnement](#_622-provisionner-lenvironnement)
        - [6.2.3 Exécuter la collection de tests de l’API tierce](#_623-exécuter-la-collection-de-tests-de-lapi-tierce)

<a id="_1-prérequis"></a>

### 1. Prérequis

Choisissez avec soin les versions des logiciels : une incompatibilité peut provoquer des erreurs ou des problèmes de compatibilité.

Liste des outils prérequis pour le déploiement de Mojaloop :

- **Kubernetes** — Système open source pour automatiser le déploiement, la mise à l’échelle et la gestion d’applications conteneurisées. En savoir plus sur [Kubernetes](https://kubernetes.io).

  - **Versions recommandées**

  | Version de publication du chart Helm Mojaloop                    | Version Kubernetes recommandée |
  | ---------------------------------------------------------------- | ------------------------------ |
  | [v16.0.0](https://github.com/mojaloop/helm/releases/tag/v16.0.0) | v1.29                          |
  | [v15.0.0](https://github.com/mojaloop/helm/releases/tag/v15.0.0) | v1.24 - v1.25                  |
  | [v14.1.1](https://github.com/mojaloop/helm/releases/tag/v14.1.1) | v1.20 - v1.24                  |
  | [v14.0.0](https://github.com/mojaloop/helm/releases/tag/v14.0.0) | v1.20 - v1.21                  |
  | [v13.x](https://github.com/mojaloop/helm/releases/tag/v13.1.1)   | v1.13 - v1.21                  |
  | [v12.x](https://github.com/mojaloop/helm/releases/tag/v12.0.0)   | v1.13 - v1.20                  |
  | [v11.x](https://github.com/mojaloop/helm/releases/tag/v11.0.0)   | v1.13 - v1.17                  |
  | [v10.x](https://github.com/mojaloop/helm/releases/tag/v10.4.0)   | v1.13 - v1.15                  |

  > NOTES :
  >
  > - Les liens ci-dessus pointent vers la dernière version majeure (ex. v13.x → v13.1.1).
  > - Consulter [https://github.com/mojaloop/helm/releases](https://github.com/mojaloop/helm/releases) pour les versions intermédiaires.
  > - La colonne « Version Kubernetes recommandée » indique les versions de Kubernetes testées et validées avec la version correspondante du chart Helm Mojaloop.

  - **kubectl** — Interface en ligne de commande Kubernetes ; requise pour l’administration. En savoir plus sur [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) :
    - [Installer kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

- **Helm** — Gestionnaire de paquets pour Kubernetes. En savoir plus sur [Helm](https://helm.sh)

   **Versions recommandées**

  - [Helm v3](https://helm.sh/docs/intro/install)

  > NOTES :
  >
  > - Consulter le guide [Migration de Helm v2 vers v3](https://docs.mojaloop.io/legacy/deployment-guide/helm-legacy-migration.html) pour migrer de Helm v2.x vers v3.x.

### 2. Recommandations de déploiement

Cette section présente des recommandations sur les ressources d’environnement et l’architecture d’infrastructure.

**Besoins en ressources :**

- Plan de contrôle (nœuds maîtres)

  [https://kubernetes.io/docs/setup/cluster-large/#size-of-master-and-master-components](https://kubernetes.io/docs/setup/cluster-large/#size-of-master-and-master-components)

  - 3 nœuds maîtres pour la montée en charge future et la haute disponibilité (HA)

- Plan ETCd :

  [https://etcd.io/docs/latest/op-guide/hardware/](https://etcd.io/docs/latest/op-guide/hardware/)

  - 3 nœuds ETCd pour la HA (haute disponibilité)

- Plan de calcul (nœuds workers) :

  À confirmer une fois les tests de charge terminés. Taille générale actuellement recommandée :

  - 3 nœuds workers, chacun avec :
    - 4 vCPU, 16 Go de RAM et 40 Go de stockage

  **Remarque :** cela dépend aussi de votre infrastructure sous-jacente et **n’inclut pas** les besoins en volumes persistants / stockage.

![Recommandations de déploiement Mojaloop — Architecture d’infrastructure](./assets/diagrams/deployment/KubeInfrastructureArch.svg)

### 3. Kubernetes

Si vous installez Kubernetes vous-même, nous recommandons l’une des distributions suivantes, en installant la version cible indiquée à la section [1. Prérequis](#_1-prérequis) :

- [k3s](https://docs.k3s.io/installation) — Distribution Kubernetes légère et flexible, utilisable pour presque tout, du local à la production.
- [Minikube](https://minikube.sigs.k8s.io/docs/start) — Distribution Kubernetes mono-nœud, simple et multiplateforme, adaptée au local ou au développement.
- [Microk8s](https://microk8s.io/docs/install-alternatives) — Distribution Kubernetes simple, adaptée au local ou au développement.
- [Docker Desktop](https://docs.docker.com/desktop/kubernetes/) — Distribution Kubernetes simple, adaptée au local ou au développement (installez la version qui inclut votre version Kubernetes cible en consultant les [notes de version Docker Desktop](https://docs.docker.com/desktop/release-notes)).

Nous ne prescrivons pas une distribution Kubernetes précise ; toute distribution certifiée [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/certification/software-conformance) ou solution managée (ex. Azure, AWS, GCP) convient pour tester les nouvelles versions Mojaloop.

Si vous débutez avec Kubernetes, il est fortement conseillé de vous familiariser avec les concepts. [Concepts Kubernetes](https://kubernetes.io/docs/concepts/overview/) est un bon point de départ.

Vérifiez que **kubectl** est installé. Les instructions complètes se trouvent [ici](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

#### 3.1. Contrôleur d’entrée Kubernetes (Ingress)

Installez le contrôleur Ingress de votre choix pour l’équilibrage de charge et l’accès externe.

Pour installer le contrôleur Nginx-Ingress utilisé dans ce guide, voir : <https://kubernetes.github.io/ingress-nginx/deploy/#using-helm>.

Liste d’autres contrôleurs Ingress : <https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/>.

Installez une version **prise en charge** du `Ingress Controller` compatible avec votre version cible de `Kubernetes`.

> **DÉPANNAGE DU DÉPLOIEMENT — Mis à jour en mars 2023**
>
> - Si vous utilisez Mojaloop `v13.x` - `v14.0.x`, voir [Dépannage du déploiement — 1.1. Prise en charge du contrôleur Nginx-Ingress pour les versions Helm Mojaloop v13.x - v14.0.x et Kubernetes v1.20 - v1.21](./deployment-troubleshooting.md#11-nginx-ingress-controller-support-for-mojaloop-helm-release-v13x---v140xx-support-for-kubernetes-v120---v121).
>
> - Si vous utilisez Mojaloop `v12.x`, voir [Dépannage du déploiement — 1.2. Prise en charge du contrôleur Nginx-Ingress pour la version Helm Mojaloop v12.x](./deployment-troubleshooting.md#12-nginx-ingress-controller-support-for-mojaloop-helm-release-v12x).
>
> - Si vous utilisez Mojaloop `v10.x`, voir [Dépannage du déploiement — 1.4. La version Helm Mojaloop v10.x ou antérieure ne prend pas en charge Kubernetes v1.16 ou supérieur](./deployment-troubleshooting.md#14-mojaloop-helm-release-v10x-or-less-does-not-support-kubernetes-v116-or-greater).
>

#### 3.2. Interfaces d’administration Kubernetes (facultatif)

1. Tableaux de bord Kubernetes

   Interface web officielle d’administration Kubernetes.

   Instructions d’installation : [Web UI (Dashboard) — installation](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) (inutile si **MicroK8s** est installé).

   **IMPORTANT :** Configurez les rôles RBAC et un compte de service associé (inutile si **MicroK8s** est installé) ; exemple pour un utilisateur de test uniquement : [Créer un utilisateur d’exemple](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md).

   Si vous avez installé MicroK8s, **activez le tableau de bord MicroK8s** :

   ```bash
   microk8s.enable dashboard
   ```

   Plus d’informations : [Extension : dashboard](https://microk8s.io/docs/addon-dashboard).

   **Pensez** à préfixer toutes les commandes **kubectl** par **microk8s** si vous n’avez pas créé d’alias.

2. k8sLens

   Alternative graphique locale à kubectl, simple à installer et à configurer.

   Plus d’informations : <https://k8slens.dev/>.

### 4. Helm

Consultez [Charts Helm Mojaloop](../repositories/helm.md) pour comprendre les relations entre les charts Helm déployés.

Installation de la dernière version de Helm : <https://helm.sh/docs/intro/install/>.

Si vous utilisez Helm v2 : [Déploiement avec Helm v2 (obsolète)](https://docs.mojaloop.io/legacy/deployment-guide/helm-legacy-deployment.html).

Pour migrer un déploiement Helm v2 existant vers v3 : [Guide de migration Helm v2 vers v3](https://docs.mojaloop.io/legacy/deployment-guide/helm-legacy-migration.html).

#### 4.1. Configuration Helm

1. Ajoutez le dépôt mojaloop à la configuration Helm :

   ```bash
   helm repo add mojaloop https://mojaloop.io/helm/repo/
   ```

   Si le dépôt existe déjà, remplacez `add` par `apply` dans la commande ci-dessus.

2. Mettez à jour les dépôts Helm :

   ```bash
   helm repo update
   ```

### 5. Mojaloop

#### 5.1. Déploiement Helm du backend (prérequis)

Mojaloop dépend de plusieurs backends externes.

Nous recommandons de déployer ces dépendances dans un déploiement nommé distinct.

Le chart backend d’exemple est fourni à titre indicatif et ne doit servir qu’à la preuve de concept, au développement et aux tests.

Plus de détails [ici](https://github.com/mojaloop/helm/blob/master/README.md#deploying-backend-dependencies).

1. Déployer le backend

   ```bash
   helm --namespace demo install backend mojaloop/example-mojaloop-backend --create-namespace
   ```

<a id="_5-2-déploiement-helm-mojaloop"></a>

#### 5.2. Déploiement Helm Mojaloop

1. Installer Mojaloop :

   1.1. Installer la dernière version :

   ```bash
   helm --namespace demo install moja mojaloop/mojaloop --create-namespace
   ```

   Ou avec une configuration personnalisée :

   ```bash
   helm --namespace demo install moja mojaloop/mojaloop --create-namespace -f {custom-values.yaml}
   ```

   Plus de détails [ici](https://github.com/mojaloop/helm/blob/master/README.md#deploying-mojaloop-helm-charts).

   _Remarque : Téléchargez et adaptez le fichier [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml). Utilisez le `values.yaml` correspondant à la bonne version (ex. `https://github.com/mojaloop/helm/blob/v<SPECIFIC_VERSION>/mojaloop/values.yaml`) via les [releases Helm](https://github.com/mojaloop/helm/releases). Pour vérifier la version installée : `helm --namespace demo list`. Sous la colonne **CHART**, vous devriez voir quelque chose comme `mojaloop-**{version}**`._

   ```bash
    $ helm -n demo list
    NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART
    moja            demo            1               2021-06-11 15:06:04.533094 +0200 SAST   deployed        mojaloop-{version}
   ```

   _Remarque : L’option `--create-namespace` n’est nécessaire que si l’espace de noms `demo` n’existe pas. Vous pouvez aussi le créer avec : `kubectl create namespace demo`._

   1.2. Installation d’une version précise :

   ```bash
   helm --namespace demo install moja mojaloop/mojaloop --create-namespace --version {version}
   ```

   1.3. Liste des versions Mojaloop :

   ```bash
    $ helm search repo mojaloop/mojaloop -l
    NAME                            CHART VERSION   APP VERSION                 DESCRIPTION
    mojaloop/mojaloop               {version}       {list of app-versions}      Mojaloop Helm chart for Kubernetes
    ...                             ...             ...                         ...
   ```

#### 5.3. Vérification des règles Ingress

1. Mettez à jour `/etc/hosts` pour un déploiement local :

   _Remarque : Uniquement pour les déploiements locaux ; inutile si le DNS ou les règles Ingress sont définis dans un [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) personnalisé._

   ```bash
   vi /etc/hosts
   ```

   _Sous Windows, modifiez le fichier dans le Bloc-notes avec des droits administrateur. Emplacement : `C:\Windows\System32\drivers\etc\hosts`._

   Ajoutez les lignes suivantes (ou combinez-les) à la configuration hôte.

   Configuration requise pour les versions du chart Helm >= 6.2.2 pour les services API Mojaloop :

   ```bash
    # Mojaloop Demo
    127.0.0.1   ml-api-adapter.local central-ledger.local account-lookup-service.local account-lookup-service-admin.local quoting-service.local central-settlement-service.local transaction-request-service.local central-settlement.local bulk-api-adapter.local moja-simulator.local sim-payerfsp.local sim-payeefsp.local sim-testfsp1.local sim-testfsp2.local sim-testfsp3.local sim-testfsp4.local mojaloop-simulators.local finance-portal.local operator-settlement.local settlement-management.local testing-toolkit.local testing-toolkit-specapi.local
   ```

2. Testez la santé du système dans le navigateur après installation. Cela ne fonctionne que si un déploiement Helm est actif.

   _Remarque : Les exemples ci-dessous concernent un déploiement local. Les entrées doivent correspondre au DNS ou aux règles Ingress du [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) ou à toute configuration Ingress personnalisée._

   Test de santé **ml-api-adapter** : <http://ml-api-adapter.local/health>

   Test de santé **central-ledger** : <http://central-ledger.local/health>

<a id="_5-4-tester-mojaloop"></a>

#### 5.4. Tester Mojaloop

Le [Mojaloop Testing Toolkit](../../documentation/mojaloop-technical-overview/ml-testing-toolkit/README.md) (**TTK**) sert à tester les déploiements ; il est intégré à Helm via son interface CLI pour tester facilement tout déploiement Mojaloop.

1. Valider Mojaloop avec Helm

   ```bash
   helm -n demo test moja
   ```

   Ou avec les journaux affichés dans la console :

   ```bash
   helm -n demo test moja --logs
   ```

   Cela exécute automatiquement les [cas de test](https://github.com/mojaloop/testing-toolkit-test-cases) suivants via le CLI du [Mojaloop Testing Toolkit](../../documentation/mojaloop-technical-overview/ml-testing-toolkit/README.md) (**TTK**) :

   - [Collection de provisionnement du Hub et des simulateurs TTK](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/provisioning).

   Journaux de la collection de provisionnement :

   ```bash
   kubectl -n demo logs pod/moja-ml-ttk-test-setup
   ```

   - [Collection de tests Golden Path TTK](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/golden_path).

   Journaux de la collection Golden Path :

   ```bash
    kubectl -n demo logs pod/moja-ml-ttk-test-validation
   ```

   Exemple de résumé final dans les journaux de la collection Golden Path :

   ```bash
    Test Suite:GP Tests
    Environment:Development
    ┌───────────────────────────────────────────────────┐
    │                      SUMMARY                      │
    ├───────────────────┬───────────────────────────────┤
    │ Total assertions  │ 1557                          │
    ├───────────────────┼───────────────────────────────┤
    │ Passed assertions │ 1557                          │
    ├───────────────────┼───────────────────────────────┤
    │ Failed assertions │ 0                             │
    ├───────────────────┼───────────────────────────────┤
    │ Total requests    │ 297                           │
    ├───────────────────┼───────────────────────────────┤
    │ Total test cases  │ 61                            │
    ├───────────────────┼───────────────────────────────┤
    │ Passed percentage │ 100.00%                       │
    ├───────────────────┼───────────────────────────────┤
    │ Started time      │ Fri, 11 Jun 2021 15:45:53 GMT │
    ├───────────────────┼───────────────────────────────┤
    │ Completed time    │ Fri, 11 Jun 2021 15:47:25 GMT │
    ├───────────────────┼───────────────────────────────┤
    │ Runtime duration  │ 91934 ms                      │
    └───────────────────┴───────────────────────────────┘
    TTK-Assertion-Report-multi-2021-06-11T15:47:25.656Z.html was generated
   ```

2. Accéder à l’interface du Mojaloop Testing Toolkit

   Ouvrez dans le navigateur : <http://testing-toolkit.local>.

   Vous pouvez charger et exécuter manuellement les collections du Testing Toolkit pour inspecter en détail requêtes, réponses et assertions. C’est une bonne façon d’apprendre Mojaloop.

   Voir la [documentation du Mojaloop Testing Toolkit](../../documentation/mojaloop-technical-overview/ml-testing-toolkit/README.md).

<a id="_5-5-tester-mojaloop-avec-postman"></a>

#### 5.5. Tester Mojaloop avec Postman

[Postman](https://www.postman.com/downloads) peut remplacer le [Mojaloop Testing Toolkit](../../documentation/mojaloop-technical-overview/ml-testing-toolkit/README.md). Voir le [Guide des tests automatisés](../contributors-guide/tools-and-technologies/automated-testing.md).

Les [collections Postman Mojaloop](https://github.com/mojaloop/postman) correspondent aux [cas de test du Mojaloop Testing Toolkit](https://github.com/mojaloop/testing-toolkit-test-cases) comme suit :

| Collection Postman | Mojaloop Testing Toolkit | Description |
|---------|----------|---------|
| [Collection Postman MojaloopHub_Setup](https://github.com/mojaloop/postman/blob/master/MojaloopHub_Setup.postman_collection.json) et [MojaloopSims_Onboarding](https://github.com/mojaloop/postman/blob/master/MojaloopSims_Onboarding.postman_collection.json) | [Collection de provisionnement du Hub et des simulateurs TTK](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/provisioning) | Configuration du Hub et provisionnement des simulateurs |
| [Golden_Path_Mojaloop](https://github.com/mojaloop/postman/blob/master/Golden_Path_Mojaloop.postman_collection.json) | [Collection de tests Golden Path TTK](https://github.com/mojaloop/testing-toolkit-test-cases/tree/master/collections/hub/golden_path) | Tests Golden Path |

Prérequis :

- Importer ou adapter l’environnement Postman suivant pour les collections ci-dessus : [Mojaloop-Local-MojaSims.postman_environment.json](https://github.com/mojaloop/postman/blob/master/environments/Mojaloop-Local-MojaSims.postman_environment.json).
- Téléchargez la **dernière version patch** depuis les [releases du dépôt Postman Mojaloop](https://github.com/mojaloop/postman/releases). Par exemple, si vous installez Mojaloop v12.0.**X**, assurez-vous d’avoir la dernière version patch des collections v12.0.**Y**.

### <a id='overlay-services'></a>6. Services superposés / 3PPI

À partir de la [R.C. v13.1.0](https://github.com/mojaloop/helm/tree/release/v13.1.0) de Mojaloop, l’API tierce est prise en charge et sera publiée avec la version officielle Mojaloop v13.1.0,
ce qui permet aux initiateurs de paiement tiers (3PPI) de demander un lien de compte auprès d’un DFSP et d’initier
des paiements pour le compte des utilisateurs.

> En savoir plus sur les 3PPI :
> - [API tierce](https://github.com/mojaloop/mojaloop-specification/tree/master/thirdparty-api) Mojaloop
> - Cas d’usage tiers :
>   - [Liaison de compte tiers](https://sandbox.mojaloop.io/usecases/3ppi-account-linking.html)
>   - [Paiements initiés par un tiers](https://sandbox.mojaloop.io/usecases/3ppi-transfer.html)


#### <a id='configuring-a-deployment'></a>6.1 Configurer un déploiement pour la prise en charge de l’API tierce

La prise en charge de l’API tierce est **désactivée** par défaut sur le déploiement Mojaloop. Vous pouvez l’activer en modifiant votre fichier `values.yaml`
avec les paramètres suivants :

```yaml
...
account-lookup-service:
  account-lookup-service:
    config:
      featureEnableExtendedPartyIdType: true # permet à l’ALS de prendre en charge le PartyIdType THIRD_PARTY_LINK plus récent

  account-lookup-service-admin:
    config:
      featureEnableExtendedPartyIdType: true # permet à l’ALS de prendre en charge le PartyIdType THIRD_PARTY_LINK plus récent

...

thirdparty:
  enabled: true
...
```

De plus, l’API tierce a plusieurs dépendances à déployer manuellement pour que les services thirdparty
fonctionnent. [mojaloop/helm/thirdparty](https://github.com/mojaloop/helm/tree/master/thirdparty) décrit ces
dépendances et fournit des exemples de fichiers de configuration k8s pour les installer.

```bash
# installer redis et mysql pour auth-service
kubectl apply --namespace demo -f https://raw.githubusercontent.com/mojaloop/helm/master/thirdparty/chart-auth-svc/example_dependencies.yaml
# installer mysql pour le consent oracle
kubectl apply --namespace demo -f https://raw.githubusercontent.com/mojaloop/helm/master/thirdparty/chart-consent-oracle/example_dependencies.yaml

# appliquer les modifications ci-dessus à values.yaml, puis mettre à jour l’installation mojaloop pour déployer les services thirdparty :
helm upgrade --install --namespace demo moja mojaloop/mojaloop -f values.yaml
```

Une fois la mise à jour Helm terminée, vérifiez que les services tiers sont opérationnels :

```bash
kubectl get po | grep tp-api
# tp-api-svc-b9bf78564-4g59d                                        1/1     Running   0          7m17s

kubectl get po | grep auth-svc
# auth-svc-b75c954d4-9vq7w                                          1/1     Running   0          8m5s

kubectl get po | grep consent-oracle
# consent-oracle-849cb69769-vq4rk                                   1/1     Running   0          8m31s


# vérifier aussi que l’ingress est correctement exposé
curl -H "Host: tp-api-svc.local" <adresse ip ingress>/health
# {"status":"OK","uptime":3545.77290063,"startTime":"2021-11-04T05:41:32.861Z","versionNumber":"11.21.0","services":[]}

curl -H "Host: auth-service.local" <adresse ip ingress>/health

# {"status":"OK","uptime":3682.48869561,"startTime":"2021-11-04T05:43:19.056Z","versionNumber":"11.10.1","services":[]}

curl -H "Host: consent-oracle.local" <adresse ip ingress>/health
# {"status":"OK","uptime":3721.520096665,"startTime":"2021-11-04T05:43:48.382Z","versionNumber":"0.0.8","services":[]}
```

> Vous pouvez aussi ajouter les entrées suivantes à `/etc/hosts` pour faciliter l’accès aux services thirdparty
>
> ```bash
> <adresse ip ingress> tp-api-svc.local auth-service.local consent-oracle.local
> ```

#### <a id='validating-and-testing'></a>6.2 Valider et tester l’API tierce

Une fois les services tiers déployés, déployez des simulateurs capables de reproduire
les scénarios tiers.

##### 6.2.1 Déployer les simulateurs

Modifiez à nouveau votre fichier `values.yaml`, cette fois sous l’entrée `mojaloop-simulator` :

```yaml
...

mojaloop-simulator:
  simulators:
  ...
    pisp:
      config:
        thirdpartysdk:
          enabled: true
    dfspa:
      config:
        thirdpartysdk:
          enabled: true
    dfspb: {}
...
```

Cette configuration crée trois nouveaux jeux de simulateurs mojaloop :

1. `pisp` — un PISP
2. `dfspa` — un DFSP prenant en charge l’API tierce
3. `dfspb` — un simulateur DFSP classique sans API tierce, pouvant recevoir des paiements

##### 6.2.2 Provisionner l’environnement

Une fois les simulateurs déployés et opérationnels, configurez le Hub Mojaloop
et les simulateurs pour tester l’API tierce.

Utilisez la [collection de provisionnement tiers](https://github.com/mojaloop/testing-toolkit-test-cases#third-party-provisioning-collection)
du dépôt mojaloop/testing-toolkit-test-cases pour provisionner l’environnement tiers et les simulateurs
définis à l’étape précédente.

##### 6.2.3 Exécuter la collection de tests de l’API tierce

Une fois le provisionnement terminé, exécutez la [collection de tests tiers](https://github.com/mojaloop/testing-toolkit-test-cases#third-party-test-collection)
pour vérifier que les services tiers sont correctement déployés et configurés.
