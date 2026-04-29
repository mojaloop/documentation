# Dépannage du déploiement

## 1. Problèmes connus

Consultez les notes de publication des **charts Helm Mojaloop** pour les problèmes connus : [https://github.com/mojaloop/helm/releases](https://github.com/mojaloop/helm/releases).

### 1.1. Prise en charge du contrôleur Nginx-Ingress pour les versions Helm Mojaloop v13.x - v14.0.x et Kubernetes v1.20 - v1.21

Si vous utilisez Mojaloop `v13.x` - `v14.0.x` et souhaitez installer le contrôleur `Nginx-Ingress`, il est recommandé d’installer `Nginx-Ingress Controller v0.47.0` avec `Kubernetes v1.20 - v1.21`, en raison de changements cassants introduits dans `Kubernetes v1.22`.

Avec Helm :

```bash
helm install ingress-nginx ingress-nginx --version="3.33.0" --repo https://kubernetes.github.io/ingress-nginx
```

### 1.2. Prise en charge du contrôleur Nginx-Ingress pour la version Helm Mojaloop v12.x

Si vous installez Mojaloop v12.x avec un contrôleur Nginx-Ingress plus récent que `v0.22.0`, créez une [configuration values Mojaloop v12.0.0](https://github.com/mojaloop/helm/blob/v12.0.0/mojaloop/values.yaml) personnalisée avec les modifications suivantes **avant l’installation** :

```YAML
## **RECHERCHEZ CETTE LIGNE DANS LE FICHIER DE CONFIG mojaloop/values.yaml**
mojaloop-simulator:
  ingress:
   ## contrôleur nginx ingress >= v0.22.0 <-- **COMMENTEZ LES TROIS LIGNES CI-DESSOUS :**
   # annotations: <-- COMMENTÉ
   #  nginx.ingress.kubernetes.io/rewrite-target: '/$2' <-- COMMENTÉ
   # ingressPathRewriteRegex: (/|$)(.*) <-- COMMENTÉ
   ## contrôleur nginx ingress < v0.22.0 <-- **DÉCOMMENTEZ LES TROIS LIGNES CI-DESSOUS :**
   annotations:
     nginx.ingress.kubernetes.io/rewrite-target: '/'
   ingressPathRewriteRegex: "/"
```

**Remarque :** inutile si vous installez Mojaloop v13.x ou plus récent.

### 1.3. Prise en charge de Kubernetes Docker Desktop pour Mojaloop v13.x - v14.0.x

Si vous installez Mojaloop `v13.x` - `v14.0.x` sous Windows ou macOS, il est recommandé d’installer [Docker Desktop v4.2.0](https://docs.docker.com/desktop/release-notes/#420), livré avec Kubernetes v1.21.5, ce qui correspond aux recommandations Mojaloop `v13.x` - `v14.0.x` du [guide de déploiement (1. Prérequis)](README.md#_1-prérequis).

### 1.4. La version Helm Mojaloop v10.x ou antérieure ne prend pas en charge Kubernetes v1.16 ou supérieur

#### 1.4.1 Description

_Remarque : applicable uniquement aux publications Helm Mojaloop v10.x ou antérieures._

Lors de l’installation des charts Helm Mojaloop, l’erreur suivante peut apparaître :

```log
Error: validation failed: [unable to recognize "": no matches for kind "Deployment" in version "apps/v1beta2", unable to recognize "": no matches for kind "Deployment" in version "extensions/v1beta1", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta2", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta1"]
```

#### 1.4.2 Cause

À partir de Kubernetes 1.16, des changements cassants ont été introduits (voir [« Deprecations and Removals » dans les notes de version Kubernetes](https://kubernetes.io/docs/setup/release/notes/#deprecations-and-removals)). Les versions d’API `apps/v1beta1` et `apps/v1beta2` ne sont plus prises en charge et ont été remplacées par `apps/v1`.

Les charts Helm Mojaloop v10 ou antérieurs référencent encore des API dépréciées ; l’installation de v10- sur Kubernetes supérieur à 1.15 nécessite une modification manuelle.

Voir le ticket [mojaloop/helm#219](https://github.com/mojaloop/helm/issues/219).

#### 1.4.3 Correctifs

Déployez les charts Helm Mojaloop v10.x ou antérieurs sur Kubernetes v1.15.

## 2. Problèmes de déploiement

### 2.1. Erreur `ERR_NAME_NOT_RESOLVED`

#### 2.1.1 Description

Cette erreur apparaît en accédant à un l'endpoint (ex. central-ledger.local) via le service Kubernetes directement dans un navigateur : `ERR_NAME_NOT_RESOLVED`

#### 2.1.2 Correctifs

1. Vérifiez que Mojaloop est correctement déployé (charts Helm installés) :

   ```bash
   helm list
   ```

   Si les charts n’apparaissent pas, voir la section [Guide de déploiement — 5.2. Déploiement Helm Mojaloop](./README.md#_5-2-déploiement-helm-mojaloop).

2. Vérifiez que tous les pods / conteneurs Mojaloop ont démarré et sont visibles dans le tableau de bord Kubernetes.

3. Le premier démarrage après déploiement Helm peut prendre plusieurs minutes selon les ressources et la configuration (souvent entre 2 et 10 minutes).
  
### 2.3. MicroK8s — problèmes de connectivité

#### 2.3.1 Description

Les pods n’atteignent pas Internet ni les autres pods (alors que la machine hôte MicroK8s y arrive).

Exemple : les journaux Central-Ledger indiquent une erreur de transport du broker, par exemple :

```log
2019-11-05T12:28:10.470Z - info: Server running at: 
2019-11-05T12:28:10.474Z - info: Handler Setup - Registering {"type":"prepare","enabled":true}!
2019-11-05T12:28:10.476Z - info: CreateHandler::connect - creating Consumer for topics: [topic-transfer-prepare]
2019-11-05T12:28:10.515Z - info: CreateHandler::connect - successfully connected to topics: [topic-transfer-prepare]
2019-11-05T12:30:20.960Z - error: Consumer::onError()[topics='topic-transfer-prepare'] - Error: Local: Broker transport failure)
```

#### 2.3.2 Correctifs

Assurez-vous que le trafic peut être acheminé entre l’interface réseau des pods et l’interface par défaut de l’hôte via iptables. Pour rendre ces règles persistantes, installez le paquet iptables-persistent :

```bash
sudo iptables -P FORWARD ACCEPT
sudo apt-get install iptables-persistent
```

Ou, avec ufw :

```bash
sudo ufw default allow routed
```

La commande d’inspection MicroK8s permet de vérifier la configuration du pare-feu :

```bash
microk8s.inspect
```

## 3. Problèmes d’Ingress

### 3.1. Les règles Ingress ne se résolvent pas avec Nginx Ingress v0.22 ou ultérieur et Mojaloop Helm v12.x ou antérieur

#### 3.1.1 Description

_Remarque : applicable uniquement aux publications Helm Mojaloop v12.x ou antérieures._

Les règles Ingress ne mènent pas au bon chemin selon les annotations du fichier [values.yaml](https://github.com/mojaloop/helm/blob/v12.0.0/mojaloop/values.yaml) avec les contrôleurs Nginx Ingress v0.22 ou ultérieurs.

Cela est dû aux changements des contrôleurs Nginx Ingress v0.22+ : https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.1.2 Correctifs

Modifiez les annotations Ingress (de → vers) dans les fichiers values.yaml :

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/$1'
```

### 3.2. Les règles Ingress ne se résolvent pas avec Nginx Ingress antérieur à v0.22

#### 3.2.1 Description

Les règles Ingress ne mènent pas au bon chemin selon les annotations du fichier [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml) avec les contrôleurs Nginx Ingress **plus anciens** que v0.22.

Voir : https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.2.2 Correctifs

Appliquez la modification suivante à **toutes** les annotations Ingress (de → vers) dans chaque fichier values.yaml :
  
```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/$1'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/'
```
