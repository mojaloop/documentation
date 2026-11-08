---
i18n_source_sha: e53175ac0db31e33d7ec44f51bade322f1569631
---

# Notas das reuniões semanais de scrum-of-scrum

## Chamada scrum-of-scrum OSS, qui., **7 de maio** de 2020

1. Coil - Don:
  a Desempenho: problema do «Big Gap»; alterações ao cs-stream; resultados alterados; a preparar um documento com as alterações para revisão; trabalho do Joran sobre processamento concorrente de mensagens em tópicos Kafka -> tentar testá-lo; a observar 40-50% de débito;
  b Adaptador LPS: a trabalhar com Renjith (Applied Payments); a montar um laboratório / ambiente para as equipas parceiras o utilizarem; a explorar colaboração com o laboratório da GSMA
2. Crosslake - Lewis:
  a. Desempenho: houve relatório com a Confluent com Nakul, o envolvimento está a terminar; a divulgar os documentos produzidos por Nakul
  b. PISP: discussões de design em curso, a par da implementação
  c. Versioning: a definir o âmbito para deployments ZDD
  d. Questões relacionadas com o lançamento oficial: problemas de DNS - trabalhados e resolvidos
3. ModusBox - Sam:
  a. Desempenho: a mover / normalizar as alterações de Perf do PI-9 para o master (nem todos os PoC); a trabalhar nos objetivos e na estratégia para o PI10
  b. Equipa nuclear: transferências em lote - a começar, dando suporte no sdk-scheme-adapter
  c. Manutenção (correções de erros):
    i) Acentos nos nomes - em curso
    ii) Simulador Mojaloop em deployments AWS - quase concluído, a trabalhar nos scripts de QA (no «dev2» - segundo ambiente)
  d. Testing toolkit: atualmente disponível para testes - todos os recursos da ML FSPIOP API abrangidos. Podem ser gerados relatórios. A trabalhar na disponibilização de opções de linha de comandos e em mais portabilidade
  e. CCB: publicação da especificação v1.1 esta semana - definição da API e Swagger correspondente (Open API)
4. Virtual / Mojaloop Foundation - Megan:
  a. Lançamento da Mojaloop Foundation
  b. Paula H - Diretora Executiva da Mojaloop Foundation.
5. Mojaloop Foundation - Simeon:
  a. Dar feedback sobre o inquérito à Comunidade 
  b. Hackathon possível no início de junho, em colaboração com a Google
  c. Newsletter do Mojaloop, com itens interessantes como a especificação ML FSPIOP v1.1, a versão Helm v10.1.0, etc., a lançar na próxima semana.

## Chamada scrum-of-scrum OSS, qui., **16 de abril** de 2020

1. Coil:
  a. Don C: Perf - resultados preliminares - obtivemos alguns números - obtivemos números por handler individual, para comparar com handlers individuais - foco na BD - um terço do tempo de uma perna gasto em perf
  b. Don C: HSM: a equipa do Renjith apresentou a demonstração agendada para a próxima semana - preparação do evento
2. Crosslake:
  a. Lewis D: PISP - planeamento do sprint - a iterar designs
  b. Lewis D: Hackathons - discutiu alguns conceitos com Innocent K (HiPiPo)
  c. Lewis D: tem acesso ao laboratório da GSMA - vai experimentar
  d. Lewis D: Versioning: a trabalhar na apresentação para o PI10
  e. Kim W: atualização global do fluxo de desempenho - workshop com a Confluent
  f. Kim W: atualização do fluxo de desempenho - Pedro a preparar uma proposta, apresentação
3. Mifos:
  a. Ed C: preparação da demonstração para as reuniões do PI10
4. Virtual:
  a. Megan : a preparar o evento do PI10 e a logística
5. DA:
  a. Nico: a discutir a issue de PISP, cujo responsável será o Michael
6. Equipa nuclear:
  a. Sam K: Desempenho: a preparar métricas; a fazer execuções de desempenho para estabelecer a linha de base dos branches master, depois de mover algumas melhorias para o master
  b. Sam K: questão dos acentos nos nomes - implementação em curso
  f. Sam K: implementação de Settlements V2 pela equipa OSS-TIPS em curso - QA feito para a iteração atual
  g. Sam K: Testing toolkit: a melhorar a cobertura de testes unitários. Acrescentadas asserções para vários endpoints
  i. Sam K: CCB: v1.1 da definição da ML FSPIOP API - primeiro rascunho concluído, revisões em curso
7. Comunidade Mojaloop:
  a. Atualização da comunidade por Simeon

## Chamada scrum-of-scrum OSS, qui., **9 de abril** de 2020

1. Coil:
  a. Don C: testes de desempenho - subutilização de recursos - há mais ajustes a fazer
  b. Don C: integração de HSM - preparação da demonstração
  c. Don C: adaptador legado - atualização da documentação - à procura de feedback
2. Crosslake:
  a. Kim W: reunião de FRMS hoje mais cedo - propostas feitas
  b. Kim W: atualização das reuniões do PI10, inscrições - questões
  c. Lewis D: PISP: mais planeamento - a trabalhar em stories e itens, mas a discutir designs sobre Oauth, Fido
  d. Lewis D: Desempenho: discussão com Pedro sobre o PoC para alterações de arquitetura, para Event Sourcing, CQRS, etc.
  e. Lewis D: normas de código - atualizadas
  f. Lewis D: fluxo de qualidade de código e segurança: utilização de HSM, demonstração, segurança na comunidade OSS
  g. Lewis D: análises de contentores a funcionar - vai trabalhar com Victor, primeiros benchmarks
  h. Lewis D: por fim - atualização sobre versioning
3. Mifos:
  a. Ed C: trabalho no Payment Hub, integração com Kafka, transações ML a passar, utilização do Elastic Search para a monitorização das operações de back-office
  b. Ed C: preparação da demonstração para as reuniões do PI10
4. Equipa nuclear:
  a. Sam K: Desempenho: a redigir relatórios, a mover métricas e outras melhorias para os branches master
  b. Sam K: Desempenho: a concluir o conjunto final de testes; roadmap da Fase 4 e planeamento do arranque
  c. Sam K: Apoio à comunidade: a corrigir erros (alguns itens de discussão importantes corrigidos), a prestar esclarecimentos sobre decisões de implementação, etc.
  d. Sam K: Suporte a pagamentos a comerciantes - fornecer testes e validar o caso de utilização «Request to Pay» de comerciante, normalização em curso
  e. Sam K: questão dos acentos nos nomes - implementação em curso
  f. Sam K: implementação de Settlements V2 pela equipa OSS-TIPS em curso
  g. Sam K: Testing toolkit: a acrescentar asserções para os recursos da API, JWS concluído, mTLS a ser acrescentado
  h. Sam K: Testing toolkit: guia de utilização em curso, a par do acréscimo de testes relacionados com o Golden path
  i. Sam K: CCB: v1.1 da definição da ML FSPIOP API - primeiro rascunho concluído, a aguardar revisão

## Chamada scrum-of-scrum OSS, qui., **2 de abril** de 2020

1. Mifos:
  a. Ed C: a equipa continua o trabalho no Payment Hub EE, foco na UI operacional, capacidades para backends de DFSP, framework de tratamento de eventos de erro
2. Coil:
  a. Don C: Desempenho - configuração concluída e trabalho iniciado - no GCP - a obter tempos de latência elevados - é preciso diagnosticar e provavelmente haverá apoio de outros contribuidores
  b. Don C: ATM - OTP - encriptação
3. Crosslake:
  a. Kim W: agenda do PI10 redigida - o e-mail deverá sair em breve
  b. Kim W: calendário do PI10: ter. - sex.; 11h00 - 16h00 GMT - evento remoto / virtual
  c. Lewis D: reunião de Perf hoje mais tarde - análise aprofundada da arquitetura
  d. Lewis D: Versioning - em curso
  e. Lewis D: Qualidade de código e segurança - arquitetura global de segurança, HSM coberto pela Coil
  f. Lewis D: Mojaloop numa Vagrant box - em curso
4. Equipa nuclear:
  a. Miguel dB: Desempenho: a concluir o trabalho de Perf - perto de 900 TPS de ponta a ponta; atualmente a tentar identificar / compreender uma unidade única que precisa deste desempenho
  b. Sam K: Desempenho: a concluir o conjunto final de testes; roadmap da Fase 4 e planeamento do arranque
  c. Sam K: Apoio à comunidade: a corrigir erros (alguns itens de discussão importantes corrigidos), a prestar esclarecimentos sobre decisões de implementação, etc.
  d. Sam K: Suporte a pagamentos a comerciantes - normalização em curso - a corrigir problemas em /authorizations
  e. Sam K: questão dos acentos nos nomes - implementação em curso
  f. Sam K: implementação de Settlements V2 pela equipa OSS-TIPS em curso
  g. Sam K: Testing toolkit: a acrescentar asserções para os recursos da API, JWS em curso
  h. Sam K: CCB: v1.1 da definição da ML FSPIOP API - redação em curso

## Chamada scrum of scrum OSS qui., **26 de março** de 2020

1. DA: Nico - tema do versioning discutido por Lewis, Matt, Sam
2. Crosslake:
  a. Kim W: a finalizar a agenda - de segunda a sexta-feira
  b. Kim W: contacte se quiser apresentar / intervir
  c. Kim W: a preparar as leituras prévias
  d. Kim W: workshop de fraude e AML: Justus vai publicar o resumo e as notas no GitHub depois dos workshops
  e. Lewis D: workshop / análise aprofundada de desempenho possivelmente na segunda-feira
  f. Lewis D: discussões de design de PISP em curso
  g: Lewis D: fluxo de qualidade de código e segurança: i. recomendações de segurança para contentores Docker. ii. âmbito do RGPD para o Mojaloop
3. Mifos:
  a. Ed C / Istvan M: continuar a criar o laboratório
  b. Ed C / Istvan M: Fineract , nova instância do Payment Hub - bom progresso
  c. Ed C / Istvan M: a trabalhar na monitorização operacional da parte de backend (depuração de back-office, monitorização, etc.)
4. Simeon O - Community Manager presente
5. Equipa nuclear:
  a. Sam K: Desempenho: trabalho da fase 3 finalizado. Chegar aos objetivos imediatos para uma conclusão lógica - ainda em curso - roadmap e arranque da Fase 4
  b. Sam K: Apoio à comunidade: a corrigir erros, a prestar esclarecimentos sobre decisões de implementação, etc.
  d. Sam K: Suporte a pagamentos a comerciantes - normalização em curso - métricas a serem acrescentadas, framework de eventos acrescentada
  e. Sam K: questão dos acentos nos nomes - a discutir a questão, a desenhar a solução
  f. Sam K: implementação de Settlements V2 pela equipa OSS-TIPS em curso
  g. Sam K: Testing toolkit: a acrescentar asserções para os recursos da API, JWS em curso. Guia de utilização em curso
  h. Sam K: CCB: v1.1 da definição da ML FSPIOP API - redação em curso

## Chamada scrum-of-scrum OSS, qui., **19 de março** de 2020

1. Coil:
  a. Don C: a analisar o desempenho, os saltos de rede (evitar verificações duplicadas, etc.)
  b. Adrian hB: Renjith e Matt a trabalhar na tradução ISO20022, (para JWEs, etc.) - demonstração, quando nos reunirmos, sobre como utilizar o HSM
2. Crosslake:
  a. Kim W: a terminar os itens de ação do workshop de meio de PI, itens de seguimento
  b. Kim W: o evento da comunidade de abril vai realizar-se, mas será um evento virtual. Kim tem um evento de planeamento e confirmará os detalhes: sugestões são bem-vindas
  c. Lewis D: Desempenho - incluir o Don noutras discussões
  d. Lewis D: Qualidade de código - proposta de requisitos do RGPD
  e: Lewis D: Versioning - rascunho inicial submetido como PR - será apresentado à DA na próxima semana
3. Mifos:
  a. Ed C, Istvan M: Payment Hub, ambiente no Azure, 
  b. Ed C, Istvan M: transações agora a passar
  c. Ed C, Istvan M: fase seguinte: implementar os ecrãs de back office, para que os utilizadores de negócio os possam ver
  d. Ed C, Istvan M: workshop com a Google sobre PISP
4. Equipa nuclear:
  a. Sam K: Perf - a combinar os handlers prepare+position e fulfil+position, trabalho de caracterização em curso
  b. Sam K: Perf - a trabalhar na compreensão do que é 1 unidade de infraestrutura num deployment Mojaloop
  c. Sam K: normalização do serviço de transaction requests: framework de eventos acrescentada, métricas a serem acrescentadas agora
  d. Sam K: Apoio à comunidade: a corrigir problemas, problemas de atualização, questão da permissão de acentos nos nomes, etc,.
