# Ferramentas de deployment do Mojaloop

Este documento descreve as três opções de deployment do Mojaloop, ordenadas por complexidade e preparação para produção. Cada ferramenta serve casos de uso e cenários de deployment específicos.

## Core Test Harness

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(46, 204, 113, 0.3); margin-right: 10px;"></div>
    <span>Ambiente de desenvolvimento e testes</span>
</div>

O Core Test Harness fornece um ambiente de desenvolvimento de nó único utilizando docker-compose. Esta ferramenta implementa uma stack Mojaloop mínima, sem componentes de produção, o que a torna adequada para desenvolvimento e testes.

> **🔗 Documentação técnica:**  
> **LACUNA** - Não foi encontrada documentação técnica dedicada ao Core Test Harness. Referências relacionadas em:
> - [Guia de deployment - Pré-requisito: deployment do backend com Helm (em inglês)](../../../../technical/technical/deployment-guide/README.md#_5-1-prerequisite-backend-helm-deployment) (menciona exemplos de docker-compose)
> - [Notas de release (em inglês)](../../../../technical/technical/releases.md) (menciona a validação com o Core-test-harness)

### Detalhes de implementação

O Core Test Harness é executado numa única máquina, utilizando docker-compose para a orquestração. Faz o deploy dos serviços principais e dos serviços de apoio sem componentes de nível de produção, como gateways, ingress/egress ou stacks de IAM. A implementação utiliza perfis configuráveis para gerir diferentes cenários de deployment.

Os requisitos de recursos incluem um computador portátil ou uma estação de trabalho de gama média com memória suficiente para a orquestração de contentores. A ferramenta integra-se com pipelines de CI para testes e validação automatizados.

### Fluxo de trabalho de desenvolvimento

Os programadores interagem com o Core Test Harness através de comandos docker-compose. A ferramenta permite fluxos de trabalho de desenvolvimento local com capacidades de hot-reloading. A configuração é feita através de variáveis de ambiente e de ficheiros de override do docker-compose.

### Capacidades de teste

O Core Test Harness permite testes unitários, testes de integração e testes de ponta a ponta dos componentes do Mojaloop. Fornece um ambiente controlado para testar as interações entre serviços e validar a lógica de negócio.

## HELM Deploy

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(230, 126, 34, 0.3); margin-right: 10px;"></div>
    <span>Solução de deployment para produção</span>
</div>

O HELM Deploy fornece capacidades de deployment prontas para produção através de charts HELM. Esta implementação requer um cluster Kubernetes previamente configurado e implementa requisitos de segurança e de desempenho de nível de produção.

> **🔗 Documentação técnica:**  
> - [Guia de deployment do Mojaloop (em inglês)](../../../../technical/technical/deployment-guide/README.md) - Documentação completa do deployment com HELM
> - [Guia de estratégia de atualização (em inglês)](../../../../technical/technical/deployment-guide/upgrade-strategy-guide.md) - Procedimentos de atualização do HELM  
> - [Resolução de problemas de deployment (em inglês)](../../../../technical/technical/deployment-guide/deployment-troubleshooting.md) - Problemas comuns e soluções

### Requisitos de infraestrutura

O deployment requer:
- Um cluster Kubernetes endurecido (hardened)
- Políticas de rede e configurações de segurança
- Definições de storage class
- Quotas e limites de recursos

### Especificações de desempenho

A implementação deve cumprir estes critérios de desempenho:
- Mais de 1000 TPS sustentados durante uma hora
- Latência no percentil 99 inferior a 1 segundo para:
  - Operações de compensação
  - Operações de pesquisa (lookup)
  - Acordo de termos
- Disponibilidade de 99,99%
- RTO/RPO zero para operações críticas

### Implementação de segurança

A implementação de segurança inclui:
- Aplicação de políticas de rede
- Políticas de segurança de pods
- Integração de service mesh
- Gestão de segredos
- Gestão de certificados

## Infraestrutura como código

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <div style="width: 20px; height: 20px; background-color: rgba(231, 76, 60, 0.3); margin-right: 10px;"></div>
    <span>Solução de deployment empresarial</span>
</div>

A implementação de infraestrutura como código (Infrastructure as Code, IaC) fornece uma solução de deployment abrangente, compatível com várias plataformas e camadas de orquestração. Implementa padrões GitOps para a gestão de várias instâncias de hub.

> **🔗 Documentação técnica:**  
>  **LACUNA** - Documentação técnica interna limitada sobre a configuração e a instalação da IaC
> - [Guia de instalação da IaC (em inglês)](../../../../getting-started/installation/installing-mojaloop.md) - Visão geral básica da IaC (ver o item 2)
> - [Blogue sobre deployment com IaC](https://infitx.com/deploying-mojaloop-using-iac) - Guia externo detalhado
> - [Repositório da plataforma IaC para AWS](https://github.com/mojaloop/iac-aws-platform) - Implementação específica para AWS

### Plataformas compatíveis

A implementação é compatível com:
- Deployment em AWS através de CloudFormation/Terraform
- Deployment on-premises através de Terraform
- Deployment multi-cloud através de módulos independentes do fornecedor
- Várias distribuições de Kubernetes:
  - Serviços k8s geridos
  - Microk8s
  - EKS

### Arquitetura do centro de controlo

O centro de controlo implementa padrões GitOps para:
- Gestão de vários ambientes
- Versionamento da configuração
- Automatização do deployment
- Gestão de estado
- Deteção de desvios (drift)

### Deployment de componentes

A implementação faz o deploy de:
- Serviços do centro de controlo
- Serviços principais do Mojaloop
- Serviços de apoio
- Aplicações de portal
- Infraestrutura de IAM
- Stack de monitorização
- Componentes do PM4ML

### Desempenho e segurança

A implementação de IaC impõe:
- Controlos de segurança de nível de produção
- Requisitos de desempenho equivalentes aos do HELM Deploy
- Configurações de alta disponibilidade
- Procedimentos de recuperação de desastres
- Requisitos de conformidade

## Histórico do documento
|Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.1|5 de junho de 2025| Tony Williams|Adicionadas ligações à documentação técnica| 
|1.0|14 de maio de 2025| Tony Williams|Versão inicial|
