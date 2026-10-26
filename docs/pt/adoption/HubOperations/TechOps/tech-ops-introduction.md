# Introdução – Guia de Operações Técnicas

O Hub Mojaloop opera vários ambientes que necessitam de gestão e manutenção diárias. Os procedimentos padrão descritos neste documento descrevem os processos operacionais que permitem ao Operador do Hub tratar de todos os aspetos da gestão de um serviço em produção.

É necessário que existam os seguintes procedimentos:

- [**Gestão de incidentes**](./incident-management.md): gerir os incidentes comunicados à equipa de Operações Técnicas ou que chegaram à equipa através de alertas ou de atividades de monitorização.

- [**Gestão de problemas**](./problem-management.md): chegar à causa raiz dos incidentes ou às causas potenciais de incidentes, e desencadear ações para melhorar ou corrigir a situação de imediato.

- [**Gestão da mudança**](./change-management.md): controlar o ciclo de vida de todas as alterações, permitindo que estas sejam efetuadas com a mínima perturbação dos serviços de TI.

- [**Gestão de versões**](./release-management.md): gerir, planear, calendarizar e controlar uma alteração de software ao longo do deployment e dos testes nos vários ambientes.

- [**Triagem de defeitos**](./defect-triage.md): assegurar que todos os bugs identificados no ambiente de Produção do cliente são registados, avaliados, priorizados e submetidos ao Service Desk.

Segue-se uma breve descrição dos ambientes geridos pelo Operador do Hub:

- **Development**: ambiente de desenvolvimento de software fora de produção, onde o código OSS do Mojaloop é integrado com as personalizações. Dá aos programadores retorno rápido dos testes sobre as novas submissões de código. Os Digital Financial Service Providers (DFSP) não interagem com este ambiente. Acesso exclusivo de programadores e de QA.

- **User Acceptance Testing (UAT)**: ambiente de teste para testes de aceitação pelo utilizador e testes de regressão, para validar as novas versões.

- **Sandbox (SBX)**: ambiente de teste para validar a conetividade dos DFSP, tanto nos requisitos de API como nos de segurança.

- **Staging (STG)**: ambiente de pré-produção que reproduz a produção tão fielmente quanto possível. Validação das novas versões e da integração dos DFSP.

- **Production (PRD)**: ambiente de produção compatível com a versão de produção.

::: tip
É disponibilizado um [Glossário](./key-terms-kpis.md) para ajudar a clarificar os termos correntes de Operações Técnicas utilizados ao longo deste documento. Ao deparar-se com um termo que necessite de explicação, vale a pena consultar o glossário para verificar se existe uma definição.
:::
