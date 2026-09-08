# Glossário

Esta secção funciona como um glossário de termos de Operações Técnicas e fornece definições de:

* termos-chave orientados pelas boas práticas da Information Technology Infrastructure Library (ITIL)
* Indicadores-Chave de Desempenho (KPI), ou seja, métricas que ajudam a determinar se objetivos específicos de gestão de incidentes são cumpridos

## Termos-chave

**Gestão da mudança:** a gestão da mudança é o processo de registar, aprovar, executar, encerrar e rever todas as alterações. A alteração pode ser contratual (como a assinatura inicial do contrato, a melhoria do SLA, a necessidade de novos recursos, e assim por diante) ou operacional, decorrente de um pedido de alteração.

**Escalamento:** o reconhecimento de que um incidente exige recursos adicionais para cumprir os objetivos de nível de serviço ou as expetativas dos utilizadores, tendo em conta a criticidade, o impacto e a urgência do incidente.

**Helpdesk/Service Desk:** o Ponto Único de Contacto entre o prestador do serviço e os utilizadores. Um Service Desk típico gere incidentes e pedidos de serviço, tratando também da comunicação com os utilizadores.

**Incidente:** uma interrupção não planeada de um serviço de TI, ou uma redução da qualidade de um serviço de TI. A falha de um item de configuração que ainda não afetou o serviço é igualmente um incidente; por exemplo, a falha de um disco de um conjunto em espelho.

**Processo de gestão de incidentes (IMP):** o processo de gerir o ciclo de vida de todos os incidentes. A finalidade principal da gestão de incidentes é restabelecer o funcionamento normal do serviço de TI o mais rapidamente possível, com o apoio de toda uma organização instituída para o efeito.

**Registo/ticket de incidente:** um registo que contém os detalhes de um incidente. Cada registo de incidente (também conhecido como ticket) documenta o ciclo de vida de um único incidente.

**Prioridade:** uma categoria utilizada para identificar a importância relativa de um incidente ou de uma alteração. A prioridade é utilizada para identificar os prazos exigidos para a tomada de ações.

**Gestão de versões:** a gestão de versões é o processo de gerir, planear, calendarizar, implementar e controlar uma build de software ao longo de diferentes fases e ambientes, com o objetivo de entregar funcionalidades a clientes ou a utilizadores finais.

**Pedido de Alteração (RFC):** o Request for Change (ou simplesmente Pedido de Alteração) é um pedido formal para a implementação de uma alteração. O RFC é precursor do «Registo de Alteração» e contém toda a informação necessária para aprovar e executar uma alteração.

**Função:** um conjunto de responsabilidades, atividades e poderes atribuídos a uma pessoa ou equipa. As funções são utilizadas para atribuir responsáveis aos vários processos de gestão de incidentes e para definir responsabilidades pelas atividades nas definições detalhadas dos processos.

**Análise da causa raiz (RCA):** a RCA é um termo coletivo que descreve um vasto conjunto de abordagens, ferramentas e técnicas utilizadas para descobrir as causas dos incidentes. É convocada em cada incidente urgente e sempre que um incidente ocorre mais do que uma vez.

**Acordo de Nível de Serviço (SLA):** um acordo entre um prestador de serviços de TI e um cliente. O SLA descreve o serviço de TI, documenta os objetivos de nível de serviço e especifica as responsabilidades do prestador de serviços de TI e do cliente.

**Severidade:** uma medida do efeito de um incidente nos processos de negócio.

**TAT (Turnaround Time):** é o tempo decorrido entre a comunicação do incidente e o momento em que este é resolvido e encerrado. Inclui o Guaranteed Intervention Time (GIT) e o Guaranteed Resolution Time (GRT).

## Indicadores-Chave de Desempenho (KPI)

**Taxa de disponibilidade (taxa de disponibilidade do serviço):** a disponibilidade de toda a solução técnica para prestar o serviço, por DFSP.

**Duração Média de Encerramento de Incidentes:** tempo médio decorrido entre o registo dos incidentes e o seu encerramento.

**Tempo Médio de Resposta a Incidentes:** o tempo médio (por exemplo, em minutos) entre a deteção de um incidente e a primeira ação tomada para o reparar.

**Número Médio de Incidentes Resolvidos pelo Service Desk:** número médio de incidentes resolvidos pelo Service Desk face à totalidade dos incidentes abertos.

**Guaranteed Intervention Time (GIT):** o tempo decorrido entre o momento em que um incidente é comunicado (por exemplo, é enviado um e-mail para a ferramenta de Service Desk) e o momento em que é devolvida uma resposta de aceitação a quem comunicou o problema.

**Guaranteed Resolution Time (GRT):** soma do tempo total despendido por todas as partes na resolução de um problema. (O estado do problema tem de ser «In Progress» ou «Escalated» para contar para o total. Os estados «Pending» ou «Closed» não são tidos em conta no cálculo do total.)

**Incidentes Concluídos Sem Escalamento:** a percentagem (%) de incidentes concluídos dentro do SLA sem qualquer escalamento.

**Taxa da Fila de Incidentes:** o número de incidentes encerrados face ao número de incidentes abertos num dado período de tempo.

**Mean Time Between Failures (MTBF):** o tempo médio entre falhas reparáveis de um produto tecnológico. A métrica é utilizada para acompanhar tanto a disponibilidade como a fiabilidade de um serviço de TI ou de qualquer outro item de configuração, para avaliar se conseguem desempenhar sem interrupção a função acordada. Quanto maior o tempo entre falhas, mais fiável é o sistema.

**Mean Time To Acknowledge (MTTA):** o tempo médio que decorre entre o despoletar de um alerta e o início do trabalho sobre o problema. Mede quanto tempo uma organização demora, em média, a responder a reclamações, indisponibilidades ou incidentes em todos os departamentos. Esta métrica é útil para acompanhar a capacidade de resposta de uma equipa e a eficácia de um sistema de alertas.

**Mean Time To Detect (MTTD) – «Ações proativas»:** a diferença entre o início de qualquer evento considerado com impacto nas receitas e a sua deteção efetiva pelo técnico, que desencadeia então alguma ação específica para repor o evento no seu estado original. Não é o mesmo que iniciar o cronómetro do Mean Time To Repair (MTTR) (ou seja, assim que o técnico recebe um ticket). O início de qualquer evento com impacto nas receitas é quase sempre registado a uma hora específica por algum equipamento específico. O elemento essencial é trazer a ferramenta de deteção para o ambiente do técnico e medir depois a diferença entre o carimbo temporal do evento e a primeira ação do técnico que indicie o reconhecimento do evento (MTTD).

**Mean Time To Failure (MTTF):** o tempo médio entre falhas não reparáveis de um produto tecnológico (sobretudo hardware).

**Mean Time To Repair (MTTR):** refere-se ao tempo médio necessário para reparar um sistema e repor a sua plena funcionalidade. \
\
O cronómetro do MTTR começa a contar quando as reparações se iniciam e prossegue até as operações estarem repostas. Inclui o tempo de reparação, o período de testes e o regresso à condição normal de funcionamento.

**Mean Time To Recovery:** o Mean Time To Recovery é uma medida do tempo entre o momento em que a falha é descoberta e o momento em que o serviço regressa ao funcionamento. Assim, além do tempo de reparação, do período de testes e do regresso à condição normal de funcionamento, abrange o tempo de notificação da falha e o diagnóstico.

**Backlog de Incidentes Antigos:** número de incidentes abertos com mais de 28 dias (ou qualquer outro período definido) face à totalidade dos incidentes abertos.

**Percentagem de Incidentes Resolvidos Dentro do Prazo/Objetivo:** número de incidentes encerrados dentro do período de duração permitido, face ao número total de incidentes encerrados num dado período de tempo. É aplicado um período de duração a cada incidente no momento em que é recebido, o qual estabelece um limite ao tempo disponível para o resolver. O período de duração aplicado decorre dos acordos celebrados com o cliente quanto à resolução de incidentes.

**Percentagem de Incidentes Resolvidos Dentro do Tempo do SLA:** número total de incidentes resolvidos dentro do tempo do SLA, dividido pelo número total de incidentes.

**Percentagem de Indisponibilidade Devida a Incidentes:** percentagem de indisponibilidade devida a incidentes, face às horas de serviço.

**Percentagem de Incidentes em Atraso:** número de incidentes em atraso (não encerrados e não resolvidos dentro do prazo estabelecido) face ao número de incidentes abertos (não encerrados).

**Percentagem de Incidentes Repetidos:** percentagem de incidentes que podem ser classificados como incidente repetido, face à totalidade dos incidentes comunicados no período de medição. Um incidente repetido é um incidente que já ocorreu (várias vezes) no período de medição.
