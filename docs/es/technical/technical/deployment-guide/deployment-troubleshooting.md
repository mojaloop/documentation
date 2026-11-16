---
i18n_source_sha: 80b6bd732ba2a78eda9d5f71e5cca707b855e1de
---

# Resolución de problemas de despliegue

## 1. Problemas conocidos

Consulte las notas de la **versión Mojaloop Helm** para obtener más información sobre los problemas conocidos: [https://github.com/mojaloop/helm/releases](https://github.com/mojaloop/helm/releases).

### 1.1. Compatibilidad de Nginx-Ingress Controller con la versión Mojaloop Helm (v13.x - v14.0x.x); compatibilidad con la versión Kubernetes (v1.20 - v1.21)

Si está utilizando la versión Mojaloop `v13.x` - `v14.0.x` y desea instalar la versión `Nginx-Ingress`, se recomienda que instale la versión `Nginx-Ingress Controller v0.47.0` junto con la `Kubernetes v1.20 - v1.21`, debido a los cambios que afectan a la compatibilidad introducidos en la versión `Kubernetes v1.22`.

Si utiliza Helm, puede hacerlo de la siguiente manera:

```bash
helm install ingress-nginx ingress-nginx --version="3.33.0" --repo https://kubernetes.thub.io/ingress-nginx
```

### 1.2. Compatibilidad de Nginx-Ingress Controller con la versión MojaloopHelm, v12.x

Si va a instalar Mojaloop v12.x con una versión del controlador Nginx-Ingress posterior a `v0.22.0`, asegúrese de crear un archivo de configuración personalizado [Mojaloop v12.0.0 values config](https://github.com/jaloop/helm/blob/v12.0.0/mojaloop/values.yaml) con los siguientes cambios antes de la instalación:**

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

**Nota: Esto NO es necesario si va a instalar la versión Mojaloop, v13.x o una versión posterior.**

### 1.3.Docker Compatibilidad de Desktop Kubernetes con Mojaloop, versiones v13.x - v14.0.x

Si va a instalar la versión Mojaloop `v13.x` - `v14.0.x` en Windows o macOS, se recomienda que instale la versión [Docker Desktop v4.2.0](https://docs.docker.com/desktop/release-notes/#420), ya que incluye la versión Kubernetes v1.21.5, que cumple con la versión Mojaloop `v13.x` - `v14.0.x`, lo cual se ajusta a las recomendaciones de la [Guía de Despliegue (1. Requisitos previos)](README.md#1-pre-requisites).

### 1.4. La versión MojaloopHelm, en su versión v10.x o inferior, no es compatible con la versión Kubernetes, en su versión v1.16 o superior

#### 1.4.1 Descripción

_Nota: Esto solo es aplicable a la versión MojaloopHelm v10.x o anterior._

Al instalar los gráficos de Helm de Mojaloop, se produce el siguiente error:

```log
Error: validation failed: [unable to recognize "": no matches for kind "Deployment" in version "apps/v1beta2", unable to recognize "": no matches for kind "Deployment" in version "extensions/v1beta1", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta2", unable to recognize "": no matches for kind "StatefulSet" in version "apps/v1beta1"]
```

#### 1.4.2 Motivo

En la versión 1.16 de Kubernetes se ha introducido un cambio que afecta a la compatibilidad (más información al respecto [en «Elementos obsoletos y eliminados» de las notas de la versión Kubernetes](https://kubernetes.io/docs/setup/release/notes/#deprecations-and-removals)]. Las  Kubernetes, API, `apps/v1beta1` y `apps/v1beta2` ya no son compatibles y  han sido sustituidas por la `apps/v1`.

Mojaloop. Las tablas de Helm de la versión 10 o anteriores hacen referencia a identificadores obsoletos; por lo tanto, no es posible instalar la versión 10 o superior en una versión Kubernetes superior a la 1.15 sin realizar modificaciones manuales.

Consulte el siguiente ticket para obtener más información: [mojaloop/helm#219](https://github.com/mojaloop/helm/issues/219)

#### 1.4.3 Correcciones

Asegúrese de que está implementando Mojaloop Helm charts v10.x o una versión anterior en la versión 1.15 de Kubernetes.

## 2. Problemas de despliegue

### 2.1. Error `ERR_NAME_NOT_RESOLVED`

#### 2.1.1 Descripción

Al intentar acceder a un punto final (por ejemplo, central-ledger.local) a través del Servicio Kubernetes directamente en un navegador, aparece el siguiente error: `ERR_NAME_NOT_RESOLVED`

#### 2.1.2 Correcciones

1. Compruebe que «Mojaloop» se haya implementado correctamente (verificando que se hayan instalado los gráficos de Helm) ejecutando lo siguiente:

   ```bash
   helm list
   ```

   Si no aparecen las cartas de Helm, consulte la sección [Guía de despliegue - 5.1. Mojaloop Helm Deployment](./README.md#51-mojaloop-helm-deployment)] para instalar una carta.

2. Asegúrese de que los Mojaloop pods/contenedores se hayan iniciado correctamente y estén disponibles a través del tablero Kubernetes.

3. Tenga en cuenta que la puesta en marcha inicial del despliegue «Mojaloop» a través de «Helm» puede tardar unos minutos, dependiendo de los recursos disponibles y las especificaciones del Sistema. Se prevé que este proceso dure entre 2 y 10 minutos.

### 2.3. MicroK8s: problemas de conectividad

#### 2.3.1 Descripción

Mis pods no pueden conectarse a Internet ni comunicarse entre sí (aunque mi máquina host MicroK8s sí puede).

Un ejemplo de ello es que los registros del Libro mayor central indican que se ha producido un error en el transporte del Broker, tal y como se muestra en el siguiente ejemplo:

```log
2019-11-05T12:28:10.470Z - info: Server running at: 
2019-11-05T12:28:10.474Z - info: Handler Setup - Registering {"type":"prepare","enabled":true}!
2019-11-05T12:28:10.476Z - info: CreateHandler::connect - creating Consumer for topics: [topic-transfer-prepare]
2019-11-05T12:28:10.515Z - info: CreateHandler::connect - successfully connected to topics: [topic-transfer-prepare]
2019-11-05T12:30:20.960Z - error: Consumer::onError()[topics='topic-transfer-prepare'] - Error: Local: Broker transport failure)
```

#### 2.3.2 Correcciones

Asegúrese de que los paquetes que se envían a la interfaz de red del pod o que proceden de ella puedan reenviarse a la interfaz predeterminada del host o desde ella mediante la herramienta iptables. Estos cambios pueden hacerse permanentes instalando el paquete iptables-persistent:

```bash
sudo iptables -P FORWARD ACCEPT
sudo apt-get install iptables-persistent
```

o, si utiliza ufw:

```bash
sudo ufw default allow routed
```

El comando «inspect» de MicroK8s se puede utilizar para comprobar la configuración del cortafuegos:

```bash
microk8s.inspect
```

## 3. Problemas con Ingress

### 3.1. Las reglas de Ingress no se resuelven en Nginx Ingress v0.22 o posterior al instalar Mojaloop Helm v12.x o anterior

#### 3.1.1 Descripción

_Nota: Esto solo es aplicable a la versión MojaloopHelm v12.x o anterior._

Las reglas de Ingress no pueden determinar la ruta correcta basándose en las anotaciones especificadas en los archivos de configuración [values.yaml](https://github.com/mojaloop/helm/blob/v12.0.0/mojaloop/values.yaml)] cuando se utilizan controladores de Ingress de Nginx v0.22 o posteriores.

Esto se debe a los cambios introducidos en los controladores Ingress de Nginx a partir de la versión v0.22, tal y como se indica en el siguiente enlace: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.1.2 Correcciones

Realice el siguiente cambio en las anotaciones de Ingress (de --> a) en los values.yaml archivos:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/$1'
```

### 3.2. Las reglas de Ingress no se resuelven en Nginx Ingress anterior a la versión v0.22

#### 3.2.1 Descripción

Las reglas de Ingress no pueden determinar la ruta correcta basándose en las anotaciones especificadas en los archivos de configuración [values.yaml](https://github.com/mojaloop/helm/blob/master/mojaloop/values.yaml)] cuando se utilizan controladores Ingress de Nginx anteriores a la versión v0.22.

Esto se debe a los cambios introducidos en los controladores Ingress de Nginx a partir de la versión v0.22, tal y como se indica en el siguiente enlace: https://kubernetes.github.io/ingress-nginx/examples/rewrite/#rewrite-target.

#### 3.2.2 Correcciones

Realice el siguiente cambio en todas las anotaciones de Ingress (de --> a) en cada uno de los values.yaml archivos:

```yaml
nginx.ingress.kubernetes.io/rewrite-target: '/$1'` --> `nginx.ingress.kubernetes.io/rewrite-target: '/'
```
