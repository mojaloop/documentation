---
i18n_source_sha: 80b6bd732ba2a78eda9d5f71e5cca707b855e1de
---

# Resolução de problemas de deployment

## 1. Problemas conhecidos

Consulte as notas da **Versão Mojaloop Helm** para obter mais informações sobre os problemas conhecidos da release: [https://github.com/mojaloop/helm/releases](https://github.com/mojaloop/helm/releases).

### 1.1. Suporte ao Nginx-Ingress Controller para a release Mojaloop (v13.x - v14.0x.x) e para a release Helm (v1.20 - v1.21) e para a release Kubernetes (v1.20 - v1.21)

Se estiver a utilizar a versão Mojaloop `v13.x` - `v14.0.x` e pretender instalar a versão `Nginx-Ingress`, recomenda-se que instale a versão `Nginx-Ingress Controller v0.47.0` juntamente com a versão `Kubernetes v1.20 - v1.21`, devido às alterações que implicam incompatibilidades introduzidas na versão `Kubernetes v1.22`.

Se estiver a utilizar o Helm, pode fazê-lo da seguinte forma:

```bash
helm install ingress-nginx ingress-nginx --version="3.33.0" --repo https://kubernetes.thub.io/ingress-nginx
```

### 1.2. Suporte ao Nginx-Ingress Controller para a release MojaloopHelm, v12.x

Se estiver a instalar o Mojaloop v12.x com uma versão do controlador Nginx-Ingress superior à `v0.22.0`, certifique-se de que cria uma configuração personalizada [Mojaloop v12.0.0 valores](https://github.com/jaloop/helm/blob/v12.0.0/mojaloop/values.yaml) com as seguintes alterações antes da instalação:**

```YAML
## **LOOK FOR THIS LINE IN mojaloop/values.yaml CONFIG FILE**
mojaloop-simulator:
  ingress:
   ## nginx ingress controller >= v0.22.0 <-- **COMMENT THE FOLLOWING THREE LINES BELOW:**
   # annotations: <-- COMMENTED
   #  nginx.ingress.kubernetes.io/rewrite-target: '/$2' <-- COMMENTED
   # ingressPathRewriteRegex: (/|$)(.*) <-- COMMENTED
   ## nginx ingress controller < v0.22.0 <-- **UNCOMMENT THE FOLLOWING THREE LINES LOW:**
   annotations:
     nginx.ingress.kubernetes.io/rewrite-target: '/'
   ingressPathRewriteRegex: "/"
```

**Nota: Isto NÃO é necessário se estiver a instalar a versão Mojaloop v13.x ou uma versão mais recente.**

### 1.3. Suporte para o Desktop Docker Kubernetes para o Mojaloop, versões v13.x - v14.0.x

Caso esteja a instalar a versão Mojaloop `v13.x` - `v14.0.x` no Windows ou no macOS, recomenda-se que instale a versão [Docker Desktop v4.2.0](https://docs.docker.com/desktop/release-notes/#420), uma vez que esta inclui a versão Kubernetes v1.21.5, que cumpre os requisitos das versões Mojaloop `v13.x` - `v14.0.x`, em conformidade com as recomendações do [Guia de Implementação (1. Pré-requisitos)](../../../../technical/technical/deployment-guide/README.md#1-pre-requisites).

### 1.4. A release MojaloopHelm, na versão 10.x ou inferior, não é permitida para a versão Kubernetes, na versão 1.16 ou superior

#### 1.4.1 Descrição

_Nota: Isto aplica-se apenas à release MojaloopHelm v10.x ou anterior._

Ao instalar os gráficos Helm do Mojaloop, ocorre o seguinte erro:

```log
Error: validation failed: [unable to recognize "": no matches for kind "Deployment" in version "apps/v1beta2", unable to recognize "": no matches for kind "Deployment" in version "extensions/v1beta1", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta2", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta1"]
```

#### 1.4.2 Motivo

Na versão 1.16 de Kubernetes, não foi introduzida qualquer alteração que implique incompatibilidade (mais informações sobre o assunto [na secção «Funcionalidades obsoletas e removidas» das notas de lançamento da versão Kubernetes](https://kubernetes.io/docs/setup/release/notes/#deprecations-and-removals)]. As  versões Kubernetes, API, `apps/v1beta1` e `apps/v1beta2` já não são permitidas e  foram substituídas pela versão `apps/v1`.

Mojaloop As tabelas do Helm v10 ou versões anteriores referem-se a identificadores obsoletos; por conseguinte, não é possível instalar a versão v10 ou superior numa versão Kubernetes superior à 1.15 sem uma modificação manual.

Consulte o seguinte ticket para obter mais informações: [mojaloop/helm#219](https://github.com/mojaloop/helm/issues/219)

#### 1.4.3 Correções

Certifique-se de que está a deployar o Mojaloop Helm charts v10.x ou versões anteriores na versão 1.15 do Kubernetes.

## 2. Problemas de deployment

### 2.1. Erro `ERR_NAME_NOT_RESOLVED`

#### 2.1.1 Descrição

É apresentado o seguinte erro ao tentar aceder a um ponto final (por exemplo, central-ledger.local) através do Serviço Kubernetes diretamente num navegador: `ERR_NAME_NOT_RESOLVED`

#### 2.1.2 Correções

1. Verifique se o Mojaloop foi deployado corretamente (verificando se o(s) gráfico(s) do Helm foi(foram) instalado(s)) executando:

   ```bash
   helm list
   ```

   Caso os gráficos do Helm não estejam listados, consulte a secção [Guia de Deployment - 5.1. Mojaloop Helm Deployment](../../../../technical/technical/deployment-guide/README.md#51-mojaloop-helm-deployment)] para instalar um gráfico.

2. Certifique-se de que todos os Mojaloop Pods/Contentores foram iniciados corretamente e estão disponíveis através do Kubernetes. painel de controlo.

3. Tenha em atenção que o deployment do Mojaloop através do Helm pode demorar alguns minutos a iniciar-se pela primeira vez, dependendo dos recursos disponíveis e das especificações do sistema. Este processo poderá demorar entre 2 e 10 minutos.

### 2.3. MicroK8s — Problemas de conectividade

#### 2.3.1 Descrição

Os meus pods não conseguem aceder à Internet nem comunicar entre si (mas o meu computador anfitrião do MicroK8s consegue).

Um exemplo disso é o facto de os registos do Central Ledger indicarem que existe um erro no transporte do Broker, conforme se pode ver no exemplo seguinte:

```log
2019-11-05T12:28:10.470Z - info: Server running at: 
2019-11-05T12:28:10.474Z - info: Handler Setup - Registering {"type":"prepare","enabled":true}!
2019-11-05T12:28:10.476Z - info: CreateHandler::connect - creating Consumer for topics: [topic-transfer-prepare]
2019-11-05T12:28:10.515Z - info: CreateHandler::connect - successfully connected to topics: [topic-transfer-prepare]
2019-11-05T12:30:20.960Z - error: Consumer::onError()[topics='topic-transfer-prepare'] - Error: Local: Broker transport failure)
```

#### 2.3.2 Correções

Certifique-se de que os pacotes de e para a interface de rede do pod possam ser reencaminhados de e para a interface predefinida no anfitrião através da ferramenta iptables. Estas alterações podem tornar-se permanentes através da instalação do pacote iptables-persistent:

```bash
sudo iptables -P FORWARD ACCEPT
sudo apt-get install iptables-persistent
```

ou, se utilizar o ufw:

```bash
sudo ufw default allow routed
```

O comando «inspect» do MicroK8s pode ser utilizado para verificar a configuração da firewall:

```bash
microk8s.inspect
```

## 3. Problemas com o Ingress

### 3.1. As regras do Ingress não estão a funcionar no Nginx Ingress v0.22 ou posterior quando se instala o Mojaloop Helm v12.x ou anterior

#### 3.1.1 Descrição

_Nota: Isto aplica-se apenas à release MojaloopHelm v12.x ou anterior._

As regras do Ingress não conseguem determinar o caminho correto com base nas anotações especificadas nos ficheiros de configuração [values.yaml](https://github.com/mojaloop/helm/blob/v12.0.0/mojaloop/values.yaml)] quando se utilizam controladores Ingress do Nginx v0.22 ou posterior.

Isto deve-se às alterações introduzidas nos controladores Ingress do Nginx a partir da versão v0.22, conforme indicado na seguinte ligação: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.1.2 Correções

Efetue a seguinte alteração nas anotações Ingress (de --> para) nos values.yaml ficheiros:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/$1'
```

### 3.2. As regras do Ingress não estão a funcionar no Nginx Ingress anterior à versão v0.22

#### 3.2.1 Descrição

As regras do Ingress não conseguem determinar o caminho correto com base nas anotações especificadas nos ficheiros de configuração [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml), quando se utilizam controladores Ingress do Nginx com versões anteriores à v0.22.

Isto deve-se às alterações introduzidas nos controladores Ingress do Nginx a partir da versão v0.22, conforme indicado na seguinte ligação: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.2.2 Correções

Efetue a seguinte alteração em todas as anotações Ingress (de --> para) em cada um dos values.yaml ficheiros:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/$1'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/'
```
