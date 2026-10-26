# Workstream QA Framework
O objetivo global deste workstream é desenvolver um QA Framework que possa ser utilizado para validar a configuração, a funcionalidade, a segurança, a prontidão para a interoperabilidade e o desempenho de um deployment. Este quadro poderá ser utilizado pelos adotantes para se «autocertificarem», ou poderá ser utilizado por um revisor externo para criar um nível de garantia para as autoridades de supervisão e os participantes.

Após a entrega do QA Framework no Mojacom 30, o workstream passou a desenvolver uma versão legível por máquina do quadro, com vista a tirar partido da automatização do processo de QA.

# Justificação de negócio
Um QA Framework proporciona às partes interessadas uma abordagem consistente para avaliar a qualidade e a prontidão dos deployments do Mojaloop, apoiando avaliações independentes da resiliência, da segurança e da integridade funcional. Ao estabelecer uma abordagem estruturada para a avaliação dos deployments, o quadro ajuda:

- As equipas de deployment a identificar e colmatar lacunas atempadamente
- Os participantes a avaliar a prontidão operacional antes do onboarding
- Os reguladores ou organismos de supervisão a interpretar a qualidade da implementação com base em dados objetivos
- A comunidade Mojaloop a partilhar boas práticas e a alinhar-se quanto às expectativas mínimas.

## Contribuidores
|Líder do workstream|Contribuidores|
|:--------------:|:--------------:|
| Moses Kipchirchir | Denis Mariru <br>Brian Njoroge<br>Bill Hodghead<br>Sam Kummary |

## Última atualização (resumo)
O workstream QA Framework começou a transformar o atual quadro de qualidade de seis pilares num formato legível por máquina. O trabalho inicial centrou-se no pilar Configuração, estabelecendo um esquema (schema) e desenvolvendo componentes de análise (parser) e de composição (composer) capazes de avaliar automaticamente os deployments do Mojaloop face a critérios de qualidade definidos. Uma vez validada, a abordagem será alargada a outros pilares técnicos, enquanto as áreas que exigem juízo humano continuarão a depender de avaliação manual.

## Aplicabilidade

Esta versão deste documento refere-se ao Mojaloop [versão 17.2.0](https://github.com/mojaloop/helm/releases/tag/v17.1.0)

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|28 de julho de 2026| Paul Makin|Adicionada a última atualização|
|1.1|4 de dezembro de 2025| Paul Makin|Adicionada a última atualização|
|1.0|25 de novembro de 2025| Paul Makin|Versão inicial|
