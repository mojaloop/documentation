---
i18n_source_sha: e0e85582c3db1376c4004c6ccbcddd8c351441f4
---

## Reuniões da DA: visão geral
A Design Authority reúne-se todas as semanas para uma atualização semanal e realiza sessões ad hoc ou detalhadas sobre temas específicos

As reuniões são abertas à participação do público, embora as discussões estejam normalmente limitadas aos membros do Board. No entanto, os participantes serão promovidos a panelistas nas reuniões se tiverem designs a rever ou propostas de alteração.

Mais detalhes podem ser consultados [aqui](https://github.com/mojaloop/design-authority/issues/42#workspaces/da-issue-log-5cdd507422733779191866e9/board?notFullScreen=false&repos=186592307)

# Reunião da DA - 30 de setembro de 2020
Começou a discussão em torno dos temas indicados - foi discutido o «patch» recém-implementado na versão 1.1 da especificação da API, e a maior parte da reunião foi dedicada à forma de promover uma adoção mais alargada deste novo padrão.

Foram levantadas preocupações sobre a implementação e a utilização do comando «patch», afirmando-se que é necessária mais discussão para determinar se não estaremos a tentar corrigir uma falha de design com outra potencial falha de implementação.

Ver: https://github.com/mojaloop/design-authority/issues/68


# Reunião da DA - 2 de setembro de 2020
Primeiro, discutimos o tema da exclusão da pasta «models» das verificações de cobertura de testes unitários. A decisão tomada foi a de que, se a pasta contiver lógica de negócio (o que, em geral, não deveria acontecer), esta tem de ser refatorizada e retirada dali. Uma vez atingido esse estado de «lógica de negócio isolada», os testes de cobertura dessa pasta podem ser ignorados. Ver: https://github.com/mojaloop/design-authority/issues/64

Concluímos as discussões sobre um scheme-adapter separado para um PISP - ver a issue no quadro: https://github.com/mojaloop/design-authority/issues/51
Consulte o documento de rascunho nesta localização: https://github.com/mojaloop/pisp/blob/scratch/api-collision/docs/api-collision.md
A ligação acima contém uma discussão detalhada sobre o pensamento mais recente e alguns exemplos de mitigações.
Foi tomada a decisão de bloquear este tema até que o PoC tenha tido mais desenvolvimento, para que a DA possa avaliar se os designs continuam alinhados com a abordagem recomendada.

# Reunião da DA - 26 de agosto de 2020
Discutimos mais aprofundadamente a https://github.com/mojaloop/design-authority/issues/51 na nossa reunião da DA de 26/08/2020.

Foram registados alguns dos pontos principais:

Para tirar partido do Typescript e ajudar a acelerar o desenvolvimento, o workstream PISP avançou e já separou o thirdparty-scheme-adapter.

Um dos desafios identificados na abordagem «multi-scheme-adapter» dizia respeito aos casos em que existem recursos partilhados entre as APIs, como GET /parties/{type}/{id}.

A nossa decisão de separar a Thirdparty API na sua própria API (e não de alargar a FSPIOP-API) assentou na ideia de que «nem todos os participantes vão querer funções thirdparty» e, por isso, não deveriam ter de se preocupar com elas. Como parte da decisão de manter uma Thirdparty API separada, decidimos que alguns recursos seriam duplicados entre as duas.

Isto pode dar origem a problemas mais adiante, em que os callbacks para alguns recursos poderão não conseguir chegar ao destino pretendido: por exemplo, se um DFSP precisar de escutar callbacks PUT /parties/{type}/{id} tanto para a FSPIOP API como para a Thirdparty API, poderá não ser possível aos DFSPs encaminhar esses callbacks para o sítio certo.

Lewis Daly vai dedicar mais tempo a trabalhar em alguns diagramas e documentos de design e voltará à DA em breve

# Reunião da DA (ad hoc) - 24 de agosto de 2020
O tema em discussão foi: https://github.com/mojaloop/design-authority/issues/65
A reunião ad hoc decorreu com a abordagem de uma questão mais ampla, relativa às recomendações que têm de ser levadas ao CCB para consideração de alterações/melhorias à especificação da API.

Foram levantados e discutidos muitos pontos válidos, e Michael e Adrian sugeriram alguma colaboração nesta plataforma para consolidar as ideias apresentadas, de forma a formular uma recomendação ao CCB.

# Reunião da DA - 19 de agosto de 2020
O tema em discussão foi: https://github.com/mojaloop/design-authority/issues/61 
O grupo concordou que tem de haver um equilíbrio com a necessidade de eliminar a reconciliação e a gestão de liquidez dos FSPs (Pagadores), não retendo/reservando fundos durante mais tempo do que o necessário. Além disso, foi proposta a utilização de um «período de tolerância» antes de terminar as transferências por tempo limite, para compensar as diferenças de relógios. Foi também sugerido que, nas transações de risco, a notificação final sob a forma de uma chamada PATCH, introduzida com a FSPIOP API v1.1, pode ser utilizada para mitigar o risco para os FSPs Beneficiários.

Um dos pontos referidos foi o de que, após o período de tempo limite (mais o período de tolerância para contabilizar a diferença de relógios), o estado de uma transferência não pode ser alterado - ou está finalizada ou não está, mas não pode ser alterada. Por exemplo, se um período de tempo limite (expresso como um momento no futuro e não como uma duração) for de 10 segundos, então um FSP Pagador (ou Switch) pode acrescentar um período de tolerância de 1 segundo e, após esperar 11 segundos, pode consultar a entidade a jusante para saber o estado da transferência; nesse momento, se a transferência estiver finalizada (Committed ou Aborted), o FSP Pagador pode agir em conformidade; no entanto, se estiver num estado intermédio, a transferência tem de ser terminada por tempo limite, uma vez que o período de tempo limite terminou.

O grupo concordou com a necessidade de voltar ao tema da implementação de «tempos limite telescópicos», que atualmente não é permitida, a favor da encriptação de ponta a ponta da (maioria das) mensagens.

# Reunião da DA - 12 de agosto de 2020
O tema em discussão foi: https://github.com/mojaloop/design-authority/issues/63
A DA discutiu o tema de onde e como criar e trabalhar os tickets das issues. Com mais de 50 repositórios, faz sentido criar um ticket no repositório onde a questão teve origem e continuar a trabalhá-lo aí até estar resolvido. O Product Owner e o Scrum Master teriam o contexto e deveriam replicar um ticket no repositório da Design Authority, com uma ligação para o ticket de origem. Consulte o quadro da DA para ver as decisões tomadas aqui: https://github.com/mojaloop/design-authority#workspaces/da-issue-log-5cdd507422733779191866e9/board?repos=186592307

# Reunião da DA - 5 de agosto de 2020
O tema em discussão foi: https://github.com/mojaloop/project/issues/852
A «abordagem de integração de HSM» foi abordada algumas vezes, e o grupo de trabalho responsável pelo design e pela implementação trouxe o tema para discussão na reunião da DA desta semana, para responder a algumas questões surgidas na última sessão de planeamento do PI, onde o progresso deste trabalho foi novamente apresentado.

Como não concluímos a discussão, foi marcada uma reunião ad hoc da DA para esta sexta-feira, com um subconjunto dos membros da DA. A razão foi a existência de algumas questões específicas que não tivemos tempo de aprofundar e que serão esclarecidas com as pessoas que as levantaram. Envie-me uma mensagem se quiser participar nessa reunião.

# Reunião da DA - 29 de julho de 2020
Issue discutida: https://github.com/mojaloop/design-authority/issues/60
Claudio registou três observações sobre a utilização de boas práticas na base de código do Mojaloop Core. Uma das questões tem uma issue ativa, que será utilizada para a acompanhar; as outras duas serão igualmente acompanhadas como stories/bugs separados (normas). Claudio fornecerá exemplos e, nalguns casos, excertos de amostra que podem ser utilizados.

Istvan e Michael discutiram a utilização de um ID único para os pedidos de consulta e propuseram uma reunião de seguimento na semana seguinte para os interessados. A utilização atual dos cabeçalhos de trace (opcionais) para rastreabilidade (APM) foi levantada como solução, que, após a revisão da DA, pode ser proposta ao CCB (se aceite pela DA).

# Reunião da DA - 22 de julho de 2020
Cancelada devido à realização do Mojaloop Convening do PI-11

# Reunião da DA - 15 de julho de 2020
Sam percorreu algumas das alterações de alto nível introduzidas com a versão Helm v10.4.0 e várias secções das notas de versão: https://github.com/mojaloop/helm/releases/tag/v10.4.0
Consulte o quadro de temas da DA: https://github.com/mojaloop/design-authority/issues/56

Neal e Michael discutiram a questão da base de dados e do código partilhados entre o central-settlement e o central-ledger; vão continuar com o trabalho atual sobre Continuous Gross Settlement mas, depois do convening, obterão os contributos do PoC de Perf/Arquitetura (Event sourcing / CQRS) e farão depois o alinhamento. https://github.com/mojaloop/design-authority/issues/58

# Reunião da DA - 8 de julho de 2020
A equipa TIPS fez uma apresentação do design e da implementação de um **motor de regras** que satisfaz os seus requisitos de interpretação na **parte das liquidações**, para alargar as comissões cobradas no âmbito de uma transferência. A implementação permite que as regras sejam interpretadas em qualquer fase de uma transação. Será feita uma apresentação formal no convening, durante a semana de 20 de julho de 2020, após a qual poderão ser consideradas decisões mais informadas quanto à adaptação desta implementação na base de código OSS do Core, como abordagem genérica à implementação de um motor de regras.
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/53 para um enunciado detalhado do problema, a progressão das reuniões nas notas e observações e também, se concluída, a decisão subsequente.

# Reunião da DA - 1 de julho de 2020
No âmbito do workstream «Versioning», está a ser conduzido um PoC de «proposta de deployment sem indisponibilidade», e o feedback desse projeto foi apresentado sob a forma de um enunciado do problema, de uma solução e de uma demonstração. A equipa que está atualmente a trabalhar nisso é composta por Lewis Daly, Mat de Haast e Sam Kummary. O feedback foi bem recebido e, uma vez que este trabalho está em curso, a DA dará seguimento a quaisquer itens de ação que resultem da próxima apresentação deste workstream na reunião do PI 11.
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/54 para um enunciado detalhado do problema, a progressão das reuniões nas notas e observações e também, se concluída, a decisão subsequente.

# Reunião da DA (ad hoc) - 29 de junho de 2020
Discussão sobre KNEX - continuação. A discussão sobre o KNEX estendeu-se à possível utilização de ferramentas de terceiros para ajudar na geração de queries que apoiem os esforços de migração. Isto não tem influência direta na utilização do próprio KNEX e, após uma exploração um pouco mais profunda, decidiu-se que não havia razão convincente para continuar a investigar a utilização do próprio KNEX, mas sim para manter a mente aberta e estar atento a soluções alternativas que surjam. Essas bibliotecas serão avaliadas face à implementação atual, de forma a garantir que utilizamos as ferramentas certas para o fim certo. Esta issue está agora fechada.
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/27 para um enunciado detalhado do problema, a progressão das reuniões nas notas e observações e também, se concluída, a decisão subsequente.

# Reunião da DA (ad hoc) - 25 de junho de 2020
Discussão sobre KNEX - iniciada
As conversas foram iniciadas, evidenciando o enunciado do problema da dificuldade em gerar ou criar scripts de migração quando ocorrem alterações à base de dados, bem como o cenário de ter de realizar essas atualizações numa base de dados que está online nesse momento.
Com este contexto definido, foram agendadas sessões de design subsequentes para determinar se o KNEX seria capaz de lidar com o cenário acima e se existem bibliotecas ou ferramentas alternativas que substituam ou complementem a implementação atual, o que poderá ajudar a aliviar esta tarefa difícil.
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/27 para um enunciado detalhado do problema, a progressão das reuniões nas notas e observações e também, se concluída, a decisão subsequente.


# Reunião da DA - 24 de junho de 2020
A discussão de hoje começou com: descontinuação do suporte ao Helm2 - Issue #52, tendo sido acordado que a migração para o Helm3 deveria prosseguir. Deveria ser disponibilizada documentação de apoio à utilização das ferramentas disponíveis para ajudar na migração. A ligação para este documento encontra-se em https://github.com/mojaloop/design-authority/issues/52

Foi discutido o tema de uma abordagem de design para implementar um sistema genérico baseado em regras, com referência específica, em primeiro lugar, ao requisito de ter a capacidade de interrogar transações concluídas ou em curso (quer na fase de transferência, quer mesmo logo na fase de cotação), de forma a aplicar «comissões de intercâmbio» a essa transação, consoante o tipo de transação, conforme interpretado por determinadas regras.
Serão discutidas várias decisões de design em torno deste tema, uma vez que o requisito é a possibilidade de associar regras em vários pontos do percurso da transação.
Foi discutida a implementação atual de um motor de regras no projeto TIPS, e será feito, numa discussão de seguimento, um pedido para demonstrar as capacidades dessa solução, de forma a que a DA possa avaliar se é suficientemente genérica para ser incorporada no Switch nuclear.
Acompanhe a progressão das decisões de design relativas a esta issue no quadro, em https://github.com/mojaloop/design-authority/issues/53


# Reunião da DA - 17 de junho de 2020
O tema em discussão foi: compreender e definir as funções do Mojaloop para os casos de utilização de PISP, x-network, etc.
A DA vê com bons olhos que os workstreams avancem e separem novas APIs e definições de funções (por exemplo, Thirdparty API, CNP API, etc.)
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/44 para um enunciado detalhado do problema e a decisão subsequente.

# Reunião da DA - 10 de junho de 2020
Esta semana, a DA discutiu: discutir o simulador de PISP: https://github.com/mojaloop/design-authority/issues/46
Foi tomada a decisão de que, por agora, o workstream PISP trabalhará no seu próprio branch no sdk-scheme-adapter, e essa divisão/abstração do sdk-scheme-adapter será retomada mais tarde (ver #51)

# Reunião da DA - 3 de junho de 2020
Continuámos a discussão iniciada na semana passada sobre a API separada para PISP e decidimos avançar com a opção 4: separação máxima da API, com ficheiros swagger/open api comuns para a definição e a reutilização do modelo de dados:
Consulte a ligação no quadro da Design Authority aqui: https://github.com/mojaloop/design-authority/issues/47 para um enunciado detalhado do problema e a decisão subsequente.

# Reunião da DA - 27 de maio de 2020
Foi alcançado consenso entre os participantes quanto à questão levantada e discutida há algum tempo, conforme questionado por Adrian. O resultado é que o desenvolvimento do Switch não será restritivo nem prescritivo mas, no que toca à recomendação para novas contribuições e módulos, será preferível que estas sejam feitas em TypeScript.

Foi apresentado um novo tema de discussão: https://github.com/mojaloop/design-authority/issues/47, que procura responder à questão de ter uma API separada para PISP ou simplesmente alargar a Open API existente. Foi preparada uma declaração de posição, acrescentada como comentário. Todos os participantes foram inteirados da decisão a tomar, e a Issue-#47 será o tema da próxima reunião da DA.

Foi apresentado outro tema relacionado com PISP, que será agendado para outra reunião da DA: https://github.com/mojaloop/design-authority/issues/48 - responder à questão de como gerir as notificações, de forma a que um PISP possa ser registado como parte interessada na notificação do sucesso de uma transferência
