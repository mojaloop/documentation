# Sobre os documentos de adoção do Mojaloop

Para que um operador de hub ou um banco central utilize o Mojaloop no seu sistema de pagamentos instantâneos inclusivo (IIPS), o processo de adoção e as etapas da tomada de decisão são frequentemente muito diferentes dos de contratar uma empresa para fornecer software proprietário. Utilizar o Mojaloop para construir e deter uma plataforma proporciona maior controlo, mas também maior responsabilidade. Não ter dependência de um único fornecedor significa exatamente isso.

A documentação e as ferramentas desta secção foram concebidas para ajudar na fundamentação da opção por utilizar o Mojaloop e num processo de implementação recomendado.

Construir um sistema de pagamentos é muito mais do que a plataforma tecnológica. O scheme (o conjunto de regras do sistema de pagamentos) e as operações são, na verdade, os fatores de sucesso. Desenvolvemos o Mojaloop para minimizar a carga operacional e reduzir o custo de implementar regras de scheme inclusivas, como a irrevogabilidade e a certeza.

O processo de construção de um sistema de pagamentos pode ser tão importante como algumas das decisões de scheme que dele resultam. Cada proprietário e operador de scheme pode desenvolver o seu próprio processo, mas recomendamos um processo inclusivo, transparente e iterativo, para maximizar a apropriação, a confiança e a sustentabilidade a longo prazo.

Ferramentas disponíveis para os adotantes:

* [**Escolhas do scheme**](#escolhas-do-scheme): documentos que ajudam a definir as regras do scheme, as diretrizes de operação, bem como as principais escolhas de negócio e de conceção
* [**Operações do Hub**](#operacoes-do-hub): guias que fornecem informação prática sobre os vários aspetos da operação de um Hub Mojaloop

## Escolhas do scheme

O [Modelo de Diretrizes de Operação da Plataforma](./Scheme/platform-operating-guideline.md) fornece um modelo para descrever como a Plataforma do Scheme irá operar e para especificar as obrigações e responsabilidades do Scheme, do Operador da Plataforma e dos DFSP.

O [Modelo de Regras de Negócio do Scheme](./Scheme/scheme-business-rules.md) fornece um modelo para definir as Regras de Negócio que regem os direitos e as responsabilidades dos participantes num scheme Mojaloop.

O documento [Escolhas-Chave do Scheme](./Scheme/scheme-key-choices.md) descreve e analisa algumas das escolhas de negócio e de conceção mais significativas, que afetam tanto a implementação técnica do Mojaloop como as Regras de Negócio que o Scheme irá redigir e que os DFSP participantes aceitarão cumprir.

O [Modelo de Acordo de Participação no Scheme](./Scheme/scheme-participation-agreement.md) fornece um modelo do Acordo de Participação no Scheme que contém as disposições mínimas necessárias para comprovar a candidatura de um DFSP à adesão ao Scheme e ao cumprimento das suas Regras de Negócio.

O [Modelo de Glossário Uniforme](./Scheme/scheme-uniform-glossary.md) funciona como um glossário de termos de negócio.

## Operações do Hub

Estes documentos podem servir de referência para os adotantes desenvolverem e personalizarem os portais de operações do hub e, posteriormente, criarem os seus próprios, conforme necessário.

O [Guia de Operações Técnicas](./HubOperations/TechOps/tech-ops-introduction.md) descreve os processos operacionais que permitem ao Operador do Hub tratar de todos os aspetos da gestão de um serviço em produção, tais como a gestão de incidentes, a gestão de problemas, a gestão da mudança, a gestão de versões e a triagem de defeitos.

O [Guia de gestão da liquidação](./HubOperations/Settlement/settlement-management-introduction.md) descreve como as liquidações são geridas pelo Hub Mojaloop e pelo(s) banco(s) de liquidação parceiro(s), e apresenta os principais blocos constituintes do processamento da liquidação.

O [Guia do Finance Portal v2](./HubOperations/Portalv2/busops-portal-introduction.md) destina-se ao Operador de um Hub Mojaloop e fornece informação sobre o Finance Portal, que facilita a gestão diária dos processos relacionados com a liquidação.

O documento [Controlo de Acesso Baseado em Funções](./HubOperations/RBAC/Role-based-access-control.md) aborda o mecanismo de segurança utilizado para controlar o acesso a vários aspetos de uma instância operacional de um Hub Mojaloop.

O [Guia de Onboarding para o Operador do Hub](./HubOperations/Onboarding/onboarding-introduction.md) destina-se ao Operador de um Hub Mojaloop e fornece informação sobre o processo de onboarding dos DFSP. Apresenta uma visão geral do percurso de onboarding seguido pelos DFSP, funcionando como uma lista de verificação das atividades de onboarding.
