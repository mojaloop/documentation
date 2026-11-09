---
i18n_source_sha: b82657f378a3afbb8cd01d874334c601df511874
---

# Versionamento

## Versionamento das versões dos serviços nucleares do Switch

Este documento fornece orientações sobre a estratégia de versionamento utilizada nas versões dos repositórios Mojaloop Open Source correspondentes aos serviços do Switch.

### Estratégia de versionamento


#### Norma para o PI-11 e seguintes
1. A partir do PI-11 (27 de julho de 2020), a orientação de versionamento é passar para um sistema de versionamento estreitamente alinhado com o versionamento semântico, eliminando a dependência do PI/Sprint. Assim, a partir da 11.x.x, a proposta é passar para [SemVer](https://semver.org/) puro.
2. A um nível geral, continuaremos a seguir o formato vX.Y.Z, mas X representa a versão «Major», Y representa a versão «Minor» e Z representa a versão «patch». As correções menores e os patches afetam os incrementos de «Z», ao passo que as alterações de funcionalidade compatíveis afetam as alterações de «Y»; as alterações incompatíveis afetam a versão «X».
3. Além destes, são utilizados sufixos como «-snapshot», «-patch», «-hotfix», conforme relevante e consoante a necessidade (permitidos pela configuração de CI).
4. Assim, a partir da 11.0.0 (principalmente para o Helm, mas também para os serviços individuais) para o PI-11, a proposta é passar para [SemVer](https://semver.org/) puro.
5. Isto implica que qualquer nova versão de um pacote/serviço abaixo de X=11 (para repositórios existentes e não para novos) será primeiro nivelada para a v11.0.0 e, a partir daí, seguirá as orientações SemVer padrão discutidas acima. Para projetos ou repositórios novos, o versionamento pode começar na v1.0.0 (depois de atingirem o estado de versão publicada)


#### Estratégia de versionamento utilizada até ao PI-10
1. O sistema de versionamento do Mojaloop (até ao PI-10) inspira-se no sistema de numeração [Versionamento Semântico](https://semver.org/) para as versões.
2. No entanto, este é personalizado para refletir os prazos do projeto Mojaloop, com base nos números do Program Increment \(PI\) e do Sprint
3. Por exemplo, o número de versão v5.1.0 implica que esta versão foi a primeira feita durante um Sprint 5.1, em que o Sprint 5.1 é o primeiro Sprint do PI-5. Assim, para uma versão vX.Y.Z, X.Y é o número do Sprint, em que X é o número do PI, e Z representa o número da versão para este repositório específico. O exemplo v4.4.4 implica que a versão atual é a quarta de quatro versões feitas no Sprint 4.4 \(do PI-4\)



### Versão atual

A informação sobre a versão atual do Mojaloop pode ser consultada [aqui](../../deployment-guide/releases.md).

### Calendário de sprints do PI-13

Abaixo está o calendário de sprints do Program Increment 13, que termina com o evento da Comunidade do PI-14, em abril de 2021.

|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Arranque presencial da Fase 5**|25/01/2021|29/01/2021|5 dias| Webinars virtuais no Zoom|
|**Sprint 13.1**|01/02/2021|14/02/2021|2 semanas | |
|**Sprint 13.2**|15/02/2021|28/02/2021|2 semanas | |
|**Sprint 13.3**|01/03/2021|14/03/2021|2 semanas | |
|**Sprint 13.4**|15/03/2021|28/03/2021|2 semanas | |
|**Sprint 13.5**|29/03/2021|11/04/2021|2 semanas | |
|**Sprint 13.6**|12/04/2021|25/04/2021|2 semanas | |
|**Fase 5 PI-14**|26/04/2021|30/04/2021|5 dias| Reuniões virtuais |

### Calendário de sprints do PI-12

Abaixo está o calendário de sprints do Program Increment 12, que termina com o evento da Comunidade do PI-13, em janeiro de 2021.

|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Arranque presencial da Fase 4**|28/01/2020|30/01/2020|3 dias| Joanesburgo|
|**Fase 4 PI-10 virtual**|21/04/2020|24/04/2020|4 dias| Webinars virtuais no Zoom|
|**Fase 4 PI-11 virtual**|21/07/2020|24/07/2020|4 dias| Webinars virtuais no Zoom|
|**Fase 4 PI-12 virtual**|19/10/2020|23/10/2020|5 dias| Webinars virtuais no Zoom|
|**Sprint 12.1**|26/10/2020|15/11/2020|3 semanas | |
|**Sprint 12.2**|16/11/2020|29/11/2020|2 semanas | |
|**Sprint 12.3**|30/11/2020|13/12/2020|2 semanas | |
|**Sprint 12.4**|14/12/2020|27/12/2020|2 semanas | |
|**Sprint 12.5**|28/12/2020|10/01/2021|2 semanas | |
|**Sprint 12.6**|11/01/2021|24/01/2021|2 semanas | |
|**Arranque da Fase 5 / PI-13**|25/01/2021|29/01/2021|5 dias| A definir |

### Calendários de sprints anteriores:

### Calendário de sprints do PI-11

Abaixo está o calendário de sprints do Program Increment 11, que termina com o evento do PI 12.

|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Arranque presencial da Fase 4**|28/01/2020|30/01/2020|3 dias| Joanesburgo|
|**Fase 4 PI-10 virtual**|21/04/2020|24/04/2020|4 dias| Webinars virtuais no Zoom |
|**Fase 4 PI-11 virtual**|21/07/2020|24/07/2020|4 dias| Webinars virtuais no Zoom |
|**Sprint 11.1**|27/07/2020|09/08/2020|2 semanas| |
|**Sprint 11.2**|10/08/2020|23/08/2020|2 semanas| |
|**Sprint 11.3**|24/08/2020|06/09/2020|2 semanas| |
|**Sprint 11.4**|07/09/2020|20/09/2020|2 semanas| |
|**Sprint 11.5**|21/09/2020|04/10/2020|2 semanas| |
|**Sprint 11.6**|05/10/2020|18/10/2020|2 semanas | |
|**Fase 4 PI-12**|20/10/2020|23/10/2020|4 dias| A definir |

#### Calendário de sprints do PI-10

Abaixo está o calendário de sprints do Program Increment 10, que termina com o evento do PI 11. Utilize-o como orientação durante os processos de versionamento e de disponibilização de versões.

|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Fase 3 PI6 presencial**|16/04/2019|18/04/2019|3 dias| Joanesburgo|
|**Fase 3 PI7 presencial**|25/06/2019|27/06/2019|3 dias| Arusha|
|**Fase 3 PI8 presencial**|10/09/2019|12/09/2019|3 dias| Abidjan|
|**Arranque presencial da Fase 4**|28/01/2020|30/01/2020|3 dias| Joanesburgo|
|**Fase 4 PI 10 virtual**|21/04/2020|24/04/2020|5 dias| Webinars virtuais no Zoom |
|**Sprint 10.1**|27/04/2020|10/05/2020|2 semanas| |
|**Sprint 10.2**|11/05/2020|24/05/2020|2 semanas| |
|**Sprint 10.3**|25/05/2020|07/06/2020|2 semanas| |
|**Sprint 10.4**|08/06/2020|21/06/2020|2 semanas| |
|**Sprint 10.5**|22/06/2020|05/07/2020|2 semanas| |
|**Sprint 10.6**|06/07/2020|19/07/2020|2 semanas | |
|**Fase 4 PI 11 presencial**|21/07/2020|23/07/2020|3 dias| Quénia (provisório) |

#### PI-9
|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Sprint 9.1**|03/02/2020|16/02/2020|2 semanas| |
|**Sprint 9.2**|17/02/2020|01/03/2020|2 semanas| |
|**Sprint 9.3**|02/03/2020|15/03/2020|2 semanas| |
|**Sprint 9.4**|16/03/2020|29/03/2020|2 semanas| |
|**Sprint 9.5**|30/03/2020|12/04/2020|2 semanas| |
|**Sprint 9.6**|13/04/2020|19/04/2020|1 semana | |
|**Fase 4 PI 10 virtual**|21/04/2020|23/04/2020|5 dias| Webinars virtuais no Zoom |

#### PI-8
|Fase/Marco|Início|Fim|Semanas|Notas|
|---|---|---|---|---|
|**Sprint 8.1**|16/09/2019|29/09/2019|2 semanas| |
|**Sprint 8.2**|30/09/2019|13/10/2019|2 semanas| |
|**Sprint 8.3**|14/10/2019|27/10/2019|2 semanas| |
|**Sprint 8.4**|28/10/2019|10/11/2019|2 semanas| |
|**Sprint 8.5**|11/11/2019|24/11/2019|2 semanas| |
|**Sprint 8.6**|25/11/2019|08/12/2019|2 semanas| |
|**Sprint 8.7**|09/12/2019|05/01/2020|4 semanas| Pausa de Natal|
|**Sprint 8.8**|06/01/2020|26/01/2020|3 semanas| 1 semana de preparação|
|**Arranque presencial da Fase 4**|28/01/2020|30/01/2020|3 dias| Joanesburgo|

### Notas

1. É feita uma nova versão do repositório **helm** com base nas alterações de funcionalidades e de configuração feitas aos serviços nucleares e nos requisitos da Comunidade.
