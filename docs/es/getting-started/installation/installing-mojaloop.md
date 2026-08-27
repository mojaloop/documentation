---
syncRef: 8091be8c5ed6372790e9b0262a57cc7d81bbb125
---

# Instalar Mojaloop

Mojaloop se empaqueta y publica como un conjunto de [Helm Charts](https://github.com/mojaloop/helm) con distintas opciones de despliegue y personalización.  
Incluso si es nuevo en Mojaloop y no conoce [Helm](https://helm.sh) / [Kubernetes](https://kubernetes.io), o si simplemente quiere poner el software en marcha rápidamente, existen varias opciones disponibles para desplegar Mojaloop.

1. **Despliegue manual** - La [Guía de despliegue](../../technical/deployment-guide/) de Mojaloop está dirigida a quienes ya conocen [Kubernetes](https://kubernetes.io) y [Helm](https://helm.sh). Es un buen punto de partida si está pensando en desplegar Mojaloop en un entorno de Kubernetes existente, o si le interesa montar uno usted mismo.

2. **IaC (infraestructura como código)** - Un despliegue completo de Mojaloop pensado para dar a los usuarios un punto de partida hacia producción. IaC está altamente automatizado ([Terraform](https://www.terraform.io), [Ansible](https://www.ansible.com)) y es extensible. Para saber más sobre IaC, consulte el [blog sobre despliegue con IaC](https://infitx.com/deploying-mojaloop-using-iac).

   Actualmente IaC admite las siguientes configuraciones modulares:
   - [Plataforma IaC AWS (Amazon Web Services)](https://github.com/mojaloop/iac-aws-platform)
   - On-Prem (próximamente)

3. **Mini-Loop** - Utilidades de instalación para Mojaloop que ofrecen una forma sencilla y eficiente de empezar. Los scripts de [mini-Loop](https://github.com/tdaly61/mini-loop) le permiten desplegar Mojaloop en la nube o en su portátil o servidor con solo un par de comandos. Después puede ejecutar fácilmente el [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) para interactuar con su despliegue y probarlo.

4. **Azure Marketplace** - Se trata de un despliegue nativo en Azure AKS, pensado para dar a los usuarios un punto de partida para una prueba de concepto o un piloto.  Es un despliegue sencillo, con plantillas ARM de Microsoft altamente automatizadas, que se despliega sobre Kubernetes gestionado para facilitar su administración. Ejecute el [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) para interactuar con su despliegue y probarlo. Consulte la [presentación de Mojaloop en Azure del PI 21](https://github.com/mojaloop/documentation-artifacts/blob/master/presentations/pi_21_march_2023/presentations/Mojaloop%20Azure%20Deployment.pdf) para obtener más información.
