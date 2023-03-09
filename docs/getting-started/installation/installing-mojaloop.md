# Installing Mojaloop

Mojaloop is packaged and released as a set of [Helm Charts](https://github.com/mojaloop/helm) with various options for deployment and customization.  
Even if you are new to Mojaloop and unfamiliar with [Helm](https://helm.sh) / [Kubernetes](https://kubernetes.io) or if you just want to get the software up and running quickly, there are several options avaiable to deploy Mojaloop.

1. Manual Deployent. The Mojaloop [Deployment Guide](https://docs.mojaloop.io/legacy/deployment-guide/) is intended for those familiar with [Kubernetes](https://kubernetes.io) and [Helm](https://helm.sh).

2. IaC (Infrustructure as Code).  Comprehensive Mojaloop deployment aimed at giving users a starting point for production. IaC is highly automated (terraform, ansible).  To learn more about an [IaC Deployment](https://infitx.com/deploying-mojaloop-using-iac/) review the blog.   IaC currently supports the following configurations: Amazon Web Services (AWS): [IaC AWS Github](https://github.com/mojaloop/iac-aws-platform), Azure and is working on On-Premise.

3. [mini-Loop](https://github.com/tdaly61/mini-loop) install utilities for Mojaloop and offer an easy and efficient way to get started. The [mini-Loop](https://github.com/tdaly61/mini-loop) scripts enable you to deploy Mojaloop in the cloud or on your laptop / server with just a couple of commands. You can then easily run the [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) to interact and test your deployment.

4. [Azure Marketplace](https://github.com/mojaloop/documentation-artifacts/blob/master/presentations/pi_21_march_2023/presentations/Mojaloop%20Azure%20Deployment.pdf)  This is an Azure AKS native deployment and aims to give users a starting point for POC or pilot testing.  It is a simple deployment, with highly automated Microsoft ARM templates and deploys to managed Kubernetes for easier managment. Run the [Mojaloop Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit#mojaloop-testing-toolkit) to interact and test your deployment.




