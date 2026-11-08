---
i18n_source_sha: 1abbfb2438eb43ed71458d266c545449b50b7402
---

# O Roadmap do Mojaloop

O Roadmap do Mojaloop é desenvolvido e mantido pela Mojaloop Foundation, em colaboração com a Comunidade mais ampla. É revisto e atualizado em cada Reunião da Comunidade, e foi atualizado pela última vez na reunião da Comunidade do PI 23, em Lusaka, Zâmbia.

O roadmap está construído em torno do conceito de três pilares.<P> <img src="https://raw.githubusercontent.com/mojaloop/product-council/a0cf73a8fb4921a3bf03aab42416a0ae6c8aa94e/Mojaloop%20Pillars.png" align="right" width="350"></a>

Os pilares são:

1. **Facilitar a adoção** – criar ferramentas que permitam aos desenvolvedores e aos adotantes fazer o deployment do Mojaloop com o mínimo de complicação e incómodo, num ambiente que satisfaça as suas necessidades técnicas, operacionais ou regulatórias.
2. **Alcançar escala** – disponibilizar o maior número possível de funções de “valor acrescentado”, de modo a apoiar os adotantes na procura dos seus objetivos, sejam eles a rentabilidade financeira ou o apoio a fins sociais; ou, na verdade, ambos.
3. **Ligar a outros sistemas** – Reconhecemos que o Mojaloop não é a única solução de interoperabilidade de pagamentos, pelo que, ao abrigo deste pilar, procuramos desenvolver o maior número possível de opções, tanto para a interligação com outros serviços e switches de pagamentos, como para garantir que o motor subjacente do Mojaloop está otimizado para suportar essas interligações.

Os pilares são eles próprios apoiados por um conjunto fundacional de workstreams de **Produto de Qualidade**, que em conjunto sustentam a manutenção e o aperfeiçoamento contínuos da solução Core do Mojaloop.

Este é o roadmap completo do PI-23: ![Roadmap do Mojaloop](https://github.com/mojaloop/product-council/blob/main/PI%2023%20Mojaloop%20Roadmap.png?raw=true).

Esta revisão do Roadmap estende-se desde o lançamento do Mojaloop 15.1, no final do PI 21 (junho de 2023), até ao final do PI 26 (fevereiro de 2025). Os lançamentos do Mojaloop passaram de numeração para nomes durante o PI 22, pelo que temos o Mojaloop Acacia a ser lançado em breve; a este seguir-se-á o Mojaloop Zambezi, no final do PI 23, que assenta no Acacia e incorpora os resultados de workstreams que incluem Merchant Payments e Foreign Exchange (transferências internacionais).

Atualmente prevemos lançar o Mojaloop Baobab, baseado no esforço de desenvolvimento vNext e na arquitetura de Referência, no final do PI 24, no final de junho de 2024 (embora isto continue sujeito a alcançar o nível necessário de qualidade e funcionalidade, a atingir através de um processo de transição que tem o seu próprio roadmap). Por sua vez, este será substituído pelo Mojaloop Meerkat no final de outubro de 2024, que assenta no Baobab acrescentando os resultados de workstreams que ainda não estão definidos. Os lançamentos seguintes seguirão o mesmo processo.

À direita do Roadmap existem quatro tabelas. Estas listam os workstreams candidatos para cada pilar e para a fundação de produto de qualidade. Estes foram estabelecidos como funcionalidades desejáveis em vários eventos da Comunidade, mas ainda não foram adotados pela Comunidade.

Todos os pilares têm os seus próprios workstreams. Para o PI 23, foram adotados os seguintes workstreams técnicos.

## Facilitar a adoção
* Suporte para deployment On Premise
    * Melhorar o suporte para deployment do Mojaloop fora da Cloud, onde isso seja necessário por razões regulatórias ou outras
* Participation Tools
    * Garantir que existe um conjunto de opções para os DFSPs participantes se ligarem a um Hub Mojaloop, e que essas opções oferecem capacidades de conectividade comparáveis

## Alcançar escala
* Merchant Payments
    * Suporte para pagamentos a comerciantes utilizando um Hub Mojaloop como elemento de pagamentos de um scheme de comerciantes que oferece pagamentos através de códigos QR ou USSD. Isto inclui o registo de comerciantes e o suporte à aquisição de comerciantes.

## Ligar a outros sistemas
* Next Generation Settlement
    * A ligação a outros sistemas de pagamentos e a realização de transações transfronteiriças aumentam a complexidade dos processos de liquidação necessários a um switch, e este workstream está a atualizar o motor de liquidação do Mojaloop para proporcionar a flexibilidade necessária.
* Foreign Exchange
    * Este workstream está a melhorar o Hub Mojaloop para suportar transações multimoeda, através da integração com um FX Provider (FXP) externo. A versão inicial suportará um modelo (o emissor converte) e um FXP; versões futuras suportarão múltiplos modelos, múltiplos FXPs e a utilização de uma moeda de reserva como intermediária.
* MOSIP Integration
    * Para melhor apoiar os pagamentos sociais e os programas nacionais de pagamentos, este workstream está a desenvolver uma solução que permitirá encaminhar pagamentos para uma identidade digital MOSIP, em vez de, por exemplo, um número de telemóvel. Este workstream trabalha também no sentido de uma maior integração com outros projetos open source de DPG, incluindo Mifos, PHEE e OpenG2P, no apoio à utilização de IDs MOSIP para gerar listas de pagamentos destinadas à entrega em massa de pagamentos sociais.
## Produto de Qualidade
* Performance Characterisation
    * Identificar e implementar alterações ao software core do Hub Mojaloop que possam melhorar o desempenho, à medida que avançamos para um número de deployments nacionais.
* Adopt Tigerbeetle
    * Utilizar o Tigerbeetle para as atualizações do ledger durante o processamento de transações, de modo a alcançar um desempenho ainda maior (não esperamos que isto esteja em vigor antes do lançamento do Mojaloop Baobab)
* Core Team
    * Mantém o core do Mojaloop através da correção de bugs críticos, de melhorias de funcionalidades priorizadas e de atualizações de dependências, e conduz o processo de Release dos serviços core e de alguns serviços ou produtos adjacentes que fazem parte da Plataforma Mojaloop.
* Platform Quality and Security
    * Avaliação, manutenção e melhoria da cibersegurança da plataforma Mojaloop, abrangendo a conectividade com os DFSPs participantes (incluindo transações) e a segurança dos portais do operador do hub.

Além destes workstreams técnicos, temos vários **Workstreams Estratégicos**, destinados a abordar questões estratégicas de longo prazo, tais como a migração para o suporte da ISO 20022, ou a monitorização dos desenvolvimentos nas transações transfronteiriças. Espera-se que os resultados dos workstreams estratégicos incluam a especificação periódica de workstreams técnicos candidatos, para potencial adoção em PIs futuros.
