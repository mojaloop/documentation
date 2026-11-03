---
i18n_source_sha: 83d215a6fa70bbe4613cad48f83bfc41fcb75700
---

# Infraestrutura de produção Mojaloop

**O que adquirir e como deployá-lo para obter schemas fiáveis e de alto desempenho**

**Declaração relativa à IA** Este documento inclui conteúdo gerado com a ajuda do Claude Opus 5.5. Todo o conteúdo foi revisto e validado pelo autor.

---

## Sobre este documento

Este guia destina-se a utilizadores da versão Mojaloop, operadores do hub, integradores de sistemas e equipas de aquisições que estejam a planear a infraestrutura para um projeto da versão Mojaloop em produção. Explica quais as decisões relativas à infraestrutura que são importantes, as vantagens e desvantagens subjacentes a cada uma delas e o que a comunidade Mojaloop recomenda, para que possam tomar boas decisões de aquisição e questionar as propostas dos fornecedores com confiança.

Baseia-se na sessão de engenharia n.º Mojaloop Foundation *Infraestrutura para produção Mojaloop*, apresentada no MojaCom32, em Acra, no Gana, em setembro de 2026, e inclui o conteúdo completo das notas do orador.

### Âmbito

**Âmbito de aplicação:** switches de produção instalados nas instalações, que executam schemes em tempo real, em que o tempo de inatividade implica que os pagamentos não sejam efetuados. O guia aborda a fiabilidade, o desempenho e os SLAs, bem como o que adquirir e como deployar.

**As mesmas questões, não abordadas separadamente:** os ambientes de pré-produção, tais como os ambientes de teste de transição e de desempenho, partilham a maioria destas questões. Devem refletir fielmente a topologia de produção, especialmente se pretender obter resultados de testes de desempenho em que possa confiar. Por conseguinte, a maior parte deste guia aplica-se também a esses ambientes.

**Fora do âmbito:** ambientes de desenvolvimento, experimentação, laboratórios e ambientes de teste, bem como as especificidades dos deployments na nuvem. Isso não significa que não sejam importantes. As vantagens e desvantagens nesses casos são muito diferentes (pode-se executar o Mojaloop num portátil para fins de desenvolvimento) e merecem ser abordadas separadamente.

### Índice

1. [Na nuvem ou no local?](#1-cloud-or-on-premises)
2. [Fundamentos físicos: locais, energia e rede](#2-physical-foundations-sites-power-and-network)
3. [Dimensionamento do hardware: 500, 1 000 e 2 000 TPS](#3-sizing-the-hardware-500-1000-and-2000-tps)
4. [Armazenamento e replicação: o que não deve comprar](#4-storage-and-replication-what-not-to-buy)
5. [Escolha da plataforma](#5-platform-choice)
6. [Alta disponibilidade, RPO e RTO](#6-high-availability-rpo-and-rto)
7. [Utilização da plataforma](#7-operating-the-platform)
8. [Perspetivas futuras: TigerBeetle](#8-looking-ahead-tigerbeetle)
9. [Lista de verificação de aquisições](#9-procurement-checklist)
10. [Questões a resolver no âmbito do seu programa](#10-questions-to-settle-within-your-scheme)
11. [Glossário](#glossary)
12. [Referências](#references)

---

## 1. Na nuvem ou no local?

Ambas as opções são válidas. Atualmente, alguns adotantes implementam esquemas «Mojaloop» em tempo real com o switch alojado na nuvem pública, enquanto outros operam inteiramente nos seus próprios centros de dados. A maioria das questões atuais da comunidade diz respeito ao deployment no local, que constitui o foco do resto deste guia.

| | Nuvem pública | No local |
|---|---|---|
| **Pontos fortes** | **Rapidez:** infraestrutura de nível de produção em semanas, e não em meses. **Elasticidade:** adicione capacidade para fazer face ao crescimento e aos picos sazonais, conforme a necessidade. **Resiliência integrada:** várias zonas e regiões disponíveis de imediato. | **Custo mais baixo a longo prazo** para volumes nacionais estáveis e previsíveis. **Soberania:** controlo total sobre a localização dos dados e das chaves. **Despesas previsíveis:** sem faturação por utilização de recursos de computação nem por tráfego de saída. |
| **Tenha cuidado com** | Custos mais elevados a longo prazo com um volume elevado e constante; residência dos dados e aprovação das entidades reguladoras; comissões de saída e dependência de serviços geridos. | Prazos de execução prolongados para as instalações e aquisições; requer competências internas em matéria de plataformas; capacidade adquirida antecipadamente para fazer face aos picos de procura. |

A grande vantagem da nuvem é o tempo. Não é necessário aguardar a instalação de um centro de dados ou um concurso para aquisição de hardware, e é possível aumentar a capacidade rapidamente à medida que o scheme cresce ou para fazer face a picos sazonais. As zonas de disponibilidade proporcionam-lhe, de imediato, domínios de falha fisicamente separados.

No entanto, as contrapartidas são significativas:
- **Custo:** com volumes nacionais elevados e estáveis, alugar recursos de computação 24 horas por dia costuma sair mais caro ao longo de cinco ou mais anos do que os adquirir.
- **Residência dos dados:** muitos bancos centrais e entidades reguladoras exigem-na, pelo que é necessária uma região no próprio país ou uma aprovação explícita.
- **Saída de dados:** o encargo pela saída de dados da nuvem.
- **Dependência:** se utilizar uma base de dados gerida proprietária ou um serviço de mensagens de um fornecedor de serviços na nuvem, a mudança posterior torna-se mais difícil.

A implementação no local inverte esta situação. Obtém-se um custo a longo prazo mais baixo para cargas previsíveis, soberania total sobre os dados e as chaves, e despesas previsíveis. No entanto, os prazos de execução para as instalações e aquisições são longos, é necessário dispor de competências relacionadas com a plataforma, quer internamente quer através de contratantes, e é necessário adquirir capacidade antecipadamente para fazer face aos picos de procura.

### O que deve orientar a decisão?

Cinco perguntas:

- **Regulamentação:** o switch e os seus dados têm de permanecer no país? Existe alguma região de nuvem no país que a entidade reguladora aceite? Muitas vezes, este aspeto por si só é determinante.
- **Cronograma:** quando é que o scheme deve entrar em funcionamento? A aquisição de instalações e de equipamento pode demorar meses. Se faltam seis meses para a entrada em funcionamento e não dispõe de um centro de dados adequado, a nuvem poderá ser a única opção viável.
- **Volume:** uma carga constante, elevada e previsível favorece a aquisição de imóveis. Um crescimento incerto favorece o arrendamento.
- **Competências:** consegue garantir o funcionamento da plataforma 24 horas por dia, 7 dias por semana, com pessoal próprio, ou irá recorrer a serviços externos? Seja qual for a opção, não necessitará de nKubernetesas competências, mas, no caso de uma solução no local, será também responsável pelo ciclo de vida do hardware.
- **Conclusão:** seja qual for a sua escolha, opte por uma solução portátil. A versão Mojaloop é compatível com a versão Kubernetes padrão. Se evitar serviços geridos exclusivamente na nuvem, mantém a opção de mudar mais tarde.

> **Um caminho comum:** comece na nuvem para cumprir a data de entrada em funcionamento, mantenha a plataforma portátil e, posteriormente, migre para as instalações próprias quando os volumes e as competências internas o justifiquem. Tenha em conta que a migração de um sistema em funcionamento não é uma tarefa trivial, pelo que deve planear essa transição desde o início.

---

## 2. Infraestruturas físicas: instalações, energia e rede

### O centro de dados

**Instalações**
- Manutenção simultânea: Nível III ou equivalente.
- A manutenção não deve exigir a interrupção do funcionamento do switch.
- Segurança física e controlo de acesso auditado.
- Refrigeração para racks de alta densidade e assistência remota 24 horas por dia, 7 dias por semana.

Uma instalação com capacidade de manutenção simultânea pode realizar trabalhos de manutenção planeada nos sistemas de alimentação ou refrigeração sem desligar o seu equipamento. Caso a instalação necessite de um período de manutenção durante o qual todos os sistemas fiquem inoperacionais, o seu SLA ficará sujeito a essa condição.

**Alimentação**
- Alimentações A e B independentes, provenientes de percursos de distribuição distintos.
- UPS e gerador, com contratos de fornecimento de combustível e testes de carga regulares. Não basta um único teste de arranque.
- Duas fontes de alimentação em cada servidor e switch, uma ligada a cada alimentação.

As fontes de alimentação duplas são económicas de especificar na fase de aquisição, mas dispendiosas de instalar posteriormente.

**Rede**
- Duas operadoras cuja fibra entra no edifício por percursos fisicamente diferentes. Duas operadoras que partilham um mesmo duto ficam com a fibra cortada pela mesma escavadora.
- Switches «top-of-rack» redundantes, com cada servidor ligado a ambos (2 × 25 GbE por servidor).
- Tráfego separado para o DFSP, tráfego de replicação e tráfego de gestão: pelo menos a nível lógico (VLANs) e, idealmente, a nível físico.

### Um, dois ou três locais?

Esta única decisão determina, em grande medida, o seu RPO, o seu RTO e parte da sua latência.

| Topologia | Sobrevive | RPO | RTO | Aspetos a ter em conta |
|---|---|---|---|---|
| Um local, três domínios de falha (racks / zonas de alimentação) | Perda de um nó, rack, switch ou fonte de alimentação | 0 (transferências confirmadas) | Sem interrupção; breve paragem parcial (de alguns segundos a cerca de 1 minuto) | A perda total do local constitui uma interrupção do serviço |
| Dois locais: principal + recuperação de desastres assíncrona | Perda do site, com failover manual | Segundos de atraso na replicação | Minutos a horas (uma decisão humana) | As transferências em curso necessitam de reconciliação |
| Três locais: dois ativos + testemunha de quórum | Perda do site, automaticamente | 0 (transferências confirmadas) | De alguns segundos a cerca de 1 minuto (deteção de falhas no site) | Requer uma baixa latência entre locais (RTT de alguns ms); cada commit contribui para isso |

**Um site com três domínios de falha** (racks diferentes, zonas de alimentação diferentes) resiste à perda de um nó, de um rack, de um switch ou de uma fonte de alimentação. O RPO é zero para transferências confirmadas. Não há interrupção de serviço, apenas uma breve paragem de alguns segundos a cerca de um minuto para o tráfego que se encontrava no nó em falha. Isso inclui a base de dados, uma vez que o projeto de produção recomendado utiliza um Percona XtraDB Cluster de três nós ([Secção 6](#6-high-availability-rpo-and-rto)). A perda de todo o site constitui uma interrupção de serviço.

**Dois locais, um primário e outro de recuperação de desastres (DR), com replicação assíncrona,** garantem a continuidade da atividade em caso de perda de um local. No entanto:
- **O RPO corresponde ao atraso na replicação,** normalmente de alguns segundos. Com a replicação assíncrona, o local primário confirma uma transferência antes de a alteração chegar ao local de recuperação de desastres (DR). Se todo o local primário for perdido, as transferências confirmadas que ainda se encontrem nessa janela serão perdidas com ele.
- **Dentro do local primário, o RPO continua a ser zero.** A replicação no interior do local é síncrona, pelo que o atraso só é relevante se todo o local primário for perdido.
- **O RTO varia entre minutos e horas,** porque o failover é, normalmente, uma decisão humana.
- **As transferências em curso** no momento da falha necessitam de reconciliação.

**Três locais, sendo dois ativos e um terceiro a funcionar como testemunha de quórum,** podem efetuar a transição automática em caso de falha:
- O RPO é zero para transferências confirmadas.
- O RTO varia entre segundos e cerca de um minuto, enquanto a falha do local é detetada.
- No que diz respeito à base de dados, um pequeno árbitro Galera no local testemunha fornece o voto de desempate.
- O custo reside no facto de os locais terem de estar próximos: no máximo, alguns milissegundos de tempo de ida e volta (RTT), uma vez que cada commit síncrono implica essa latência.

> **Porque não simplesmente dois sites ativos?** O «Kubernetes» etcd, o quórum de controladores «Kafka» e o Percona XtraDB Cluster necessitam todos de uma maioria para funcionar em segurança. Com dois locais, quando a ligação entre eles falha, nenhum dos lados consegue determinar se o outro sofreu uma falha ou se está simplesmente inacessível. Ou ambos param, ou corre-se o risco de ocorrer uma situação de «split brain» (dois registos a aceitarem transferências em simultâneo). A testemunha desempata, e pode ser de pequena dimensão: apenas precisa de votar, não de transportar tráfego.

### Como as escolhas relativas às instalações se refletem nos SLAs e no desempenho

| Disponibilidade | Tempo de inatividade por ano |
|---|---|
| 99,9 % | ≈ 8,8 horas |
| 99,95 % | ≈ 4,4 horas |
| 99,99 % | ≈ 53 minutos |
| 99,999% | ≈ 5 minutos |

99,9 % permite quase nove horas de inatividade por ano, enquanto 99,99 % permite 53 minutos, o que corresponde a um único incidente grave.

- **A dependência partilhada mais fraca limita o seu SLA.** Uma fonte de alimentação, um operador ou um local limitam todo o sistema, independentemente do nível de redundância dos servidores.
- **A distância equivale à latência.** Com a replicação síncrona entre locais, cada confirmação aguarda o tempo de ida e volta. Uma transferência de Mojaloop é confirmada várias vezes (preparação, execução, atualizações de posição), pelo que 10 ms entre locais não correspondem a 10 ms por transferência. Trata-se de um múltiplo desse valor, o que reduz a taxa de transferência alcançável.
- **As intervenções de manutenção planeadas são contabilizadas**, a menos que o seu SLA as exclua explicitamente. As instalações que podem ser mantidas em simultâneo e as atualizações contínuas para a versão Kubernetes não são contabilizadas no orçamento de tempo de inatividade.
- **Chegue primeiro a acordo quanto ao SLA,** e só depois conceba a topologia da rede de forma a cumprir o mesmo, e não o contrário.

---

## 3. Dimensionamento do hardware: 500, 1000 e 2000 TPS

### Princípios de dimensionamento

1. **Tenha em conta os picos, não a média.** O tráfego de pagamentos apresenta picos: dias de pagamento de salários, fim de mês, feriados religiosos e nacionais. Os picos podem atingir várias vezes a média diária. Se dispuser de dados reais de schemes já existentes no seu mercado, utilize-os.
2. **Fazer face à perda de um nó durante o pico de tráfego.** Plano N+1: mesmo com um servidor em inatividade, deve continuar a satisfazer o pico de tráfego.
3. **Mantenha uma margem de segurança.** Não conceba o sistema para funcionar a 95 % da capacidade nos picos; procure que a utilização não ultrapasse cerca de 70 % no pico previsto.
4. **Separar o processamento dos dados.** Os serviços «Mojaloop» sem estado são executados em nós de trabalho. Os serviços «Kafka» e as bases de dados dispõem de nós de dados dedicados com discos locais (não SAN nem NAS), pelo que um serviço com elevada carga de trabalho não pode privar a base de dados da razão geral de recursos de CPU.
5. **Utilize discos locais rápidos.** NVMe nos nós de dados, com proteção contra falhas de alimentação nas unidades MySQL. A latência de confirmação limita diretamente o TPS.
6. **Comprove-o no seu equipamento.** As ferramentas comunitárias de teste de desempenho estão disponíveis ao público. Execute-as no equipamento que efetivamente adquirir, antes da entrada em funcionamento e após atualizações significativas.

### O que revelam os testes de desempenho do «Mojaloop»

A workstream de desempenho Mojaloop publica tudo no repositório [ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws): Terraform, Helm substituições, scripts de teste e relatórios completos dos cenários.
- **Fluxos:** cada execução utiliza fluxos de ponta a ponta (descoberta, cotação, transferência) em relação a oito simuladores «DFSP», quatro pagadores e quatro beneficiários.
- **Carga:** gerada pelo k6 a partir do seu próprio cluster separado, para que o gerador de carga não entre em concorrência com o switch pela utilização de recursos.
- **Avaliação:** os resultados são avaliados numa janela de estado estacionário, com um critério de validade que confirma se o pipeline de Kafka manteve o ritmo.

Há três resultados que são importantes para a contratação pública:

- **500 TPS (v17.1.0, ISO 20022, full mTLS): APROVADO, p99 951 ms.** Foi executado com um único broker Kafka e um único MySQL com durabilidade reduzida, pelo que se trata de um teste de desempenho e não de uma configuração de produção.
- **1 000 TPS (v17.1.0, ISO 20022, HA): APROVADO, p99 997 ms face à meta de < 1 s.** Esta é a configuração de produção:
  - Kafka, com um fator de replicação de 3 e um mínimo de 2 réplicas sincronizadas.
  - MySQL, replicação semissíncrona com um fsync em cada commit.
  - Não há recorrência à replicação assíncrona.
- **2 000 TPS (gráfico v17.3.0, HA): APROVADO em termos de débito (throughput).**
  - 1 998 TPS mantidos durante um período de 60 minutos (7,2 milhões de transferências), tendo sido ultrapassado o limite de validade sem que se verificasse qualquer saturação.
  - A 2 000 TPS, o critério é o débito (throughput); não está definida qualquer meta de latência acima dos 1 000 TPS. O próprio resumo do relatório aplica a meta de um segundo em toda a análise e classifica o teste como «falhado», razão pela qual alguns leitores terão visto essa classificação.
  - A título de informação, o valor p99 foi de 1 727 ms e a mediana situou-se ligeiramente abaixo de um segundo.

Todas estas execuções decorreram em máquinas virtuais simples com 8 vCPU, utilizando o MicroK8s. Nenhum nó excedeu cerca de 70 % de utilização da CPU nas execuções de alta disponibilidade.

**Conclusões:**
- **O débito (throughput) escala com nós de hardware comum.** Passar de 1 000 para 2 000 TPS exigiu cerca de 1,84 vezes mais infraestrutura.
- **A latência aumenta com a carga, independentemente do hardware.** A 2 000 TPS, seis saltos sequenciais de Kafka representam cerca de 518 ms da etapa de transferência, enquanto cada camada apresenta uma utilização da CPU entre 50 % e 65 %. Trata-se de uma característica do pipeline de software, na qual a comunidade está a trabalhar.
- **Não é possível obter um p99 mais baixo apenas através da aquisição de equipamento.** Servidores de maior capacidade não o irão reduzir, pelo que não permita que ninguém lhe venda hardware de gama alta com base nesse argumento.

### O que foi efetivamente testado

| | 500 TPS | 1 000 TPS | 2 000 TPS |
|---|---|---|---|
| Resultado | ✓ 500 TPS, p99 951 ms | ✓ 1 000 TPS, p99 997 ms | ✓ 1 998 TPS (p99: 1 727 ms, a título informativo) |
| Postura de resiliência | Não é HA: Kafka e MySQL isolados | HA: Kafka RF 3, MySQL semissíncrono | HA, a 1 000 TPS |
| Switch os nós da aplicação | 5 × 8 vCPU / 32 GB | 10 × 8 vCPU / 32 GB | 20 × 8 vCPU / 32 GB |
| Kafka nós | 1 × 4 vCPU / 16 GB | 3 × 8 vCPU / 32 GB | 3 × 8 vCPU / 32 GB |
| MySQL nós | 1 × 4 vCPU / 16 GB | 2 × 8 vCPU / 32 GB | 2 × 16 vCPU / 64 GB |
| Total do cluster de switches (incluindo monitorização) | ≈ 50 vCPU / 200 GB | ≈ 122 vCPU / 490 GB | ≈ 224 vCPU / 900 GB |
| Nó mais ativo, pico de CPU | 84 % | 70 % | 65 % |

Todas as execuções utilizaram máquinas virtuais AWS m7i com o MicroK8s, com as opções «mTLS», «JWS» e «ILP» totalmente ativadas. Foram também aplicados controlos técnicos da norma ISO 27001, tais como a encriptação em repouso e a persistência real.

- **A 500 TPS:** cinco nós de aplicações com 8 vCPU, mais um nó pequeno de Kafka e um nó pequeno de MySQL. Cerca de 50 vCPU no total, sem HA.
- **A 1 000 TPS com HA:** dez nós de aplicação, três nós dKafka e dois nós dMySQL, todos com 8 vCPU e 32 GB. Cerca de 120 vCPU. O nó mais ocupado atingiu um pico de 70%, e oMySQL utilizou menos de um terço das suas IOPS provisionadas, pelo que a procura de armazenamento é modesta.
- **A 2 000 TPS:** vinte nós de aplicação, os mesmos três nós cKafka e dois nós cMySQL com vCPU duplicadas para 16. Cerca de 220 vCPU, sendo que o nó mais ocupado se situava nos 65 %.

O padrão: **a camada de aplicações expande-se horizontalmente, a camada MySQL expande-se verticalmente e a camada Kafka absorveu o dobro da carga com o mesmo hardware.**

Reservas quanto à comparabilidade:
- **Formato das mensagens:** os testes de 500 e 1 000 TPS utilizaram a versão ISO 20022, cujas mensagens são cerca de 30 % maiores. O teste de 2 000 TPS utilizou a versão FSPIOP com carga uniformemente distribuída; por isso, considere-o como um limite mínimo e não como um limite máximo.
- **Versão do software:** o teste de 2 000 TPS utilizou um ramo de funcionalidades com uma versão do Chart ainda não lançada (v17.3.0).
- **Topologia da base de dados:** todos os testes utilizaram uma configuração de «MySQL primário» com uma réplica semissíncrona. O projeto de produção aqui recomendado utiliza um Percona XtraDB Cluster, que ainda não foi submetido a estes testes.

> **Dica de otimização para os responsáveis pela implementação:** faça com que o número de réplicas do consumidor corresponda a um número de partiçõKafka e certifique-se de que o número de réplicas seja um múltiplo do número de nós. Caso contrário, o agendador cria pontos de congestionamento persistentes.

### Tradução para «bare metal»: servidores por local (HA)

| Função | 500 TPS | 1 000 TPS | 2 000 TPS |
|---|---|---|---|
| Kubernetes. plano de controlo | 3 × 8 núcleos, 32 GB | 3 × 8 núcleos, 32 GB | 3 × 8 núcleos, 32 GB |
| Trabalhadores de aplicações | 3 × 16 núcleos, 128 GB | 3 × 24 núcleos, 192 GB | 5 × 24 núcleos, 192 GB |
| Kafka corretores (NVMe local) | 3 × 8 núcleos, 64 GB, 2 × 1,92 TB | 3 × 8 núcleos, 64 GB, 2 × 1,92 TB | 3 × 16 núcleos, 64 GB, 2 × 3,84 TB |
| Percona XtraDB Cluster (PLP NVMe, RAID1) | 3 × 8 núcleos, 64 GB, 1,92 TB | 3 × 16 núcleos, 128 GB, 3,84 TB | 3 × 32 núcleos, 256 GB, 7,68 TB |
| Monitorização | 1 × 8 núcleos, 64 GB | 1 × 8 núcleos, 64 GB | 1 × 16 núcleos, 64 GB |
| Equipamentos de equilíbrio de carga | 2 × 8 núcleos, 32 GB | 2 × 8 núcleos, 32 GB | 2 × 8 núcleos, 32 GB |
| **Total por local** | **15 servidores · 144 núcleos · ≈ 1,0 TB de RAM** | **15 servidores · 192 núcleos · ≈ 1,4 TB de RAM** | **17 servidores · 320 núcleos · ≈ 2,1 TB de RAM** |

Rede para todos os níveis: um par de switches top-of-rack de 25 GbE, com duas ligações de 25 GbE por servidor.

**Método**
- **Mapeamento de vCPU:** uma vCPU da AWS corresponde a um hyperthread; assim, uma instância de 8 vCPU equivale a cerca de quatro núcleos físicos.
- **Workers:** dimensionados de forma a que, caso um worker fique inativo, a capacidade restante continue a ser igual à capacidade total provisionada para o teste.
  - A 1 000 TPS, isso corresponde a três workers com 24 núcleos e 192 GB. Se perder um, ainda dispõe de 96 threads face às 80 vCPU testadas.
  - A 2 000 TPS, são cinco workers idênticos.
- **BrokerKafka:** três brokers com NVMe local. A 2 000 TPS, são ampliados para 16 núcleos, de modo a que a perda de um broker não leve os restantes a atingirem uma taxa de utilização na casa dos 85 %. Trata-se de uma inferência; os testes não a verificaram.
- **Base de dados:** a produção utiliza um Percona XtraDB Cluster (PXC) de três nós, em vez do sistema primário e réplica testado, pelo que existe um servidor adicional por local.
  - Continua a escalar verticalmente, porque as gravações são direcionadas para um nó de cada vez e as linhas de posição dos participantes são ativas. Consequentemente, dispõe de uma margem generosa: 16 núcleos a 1 000 TPS e 32 a 2 000, com os três nós dimensionados de forma idêntica.
  - As unidades de disco devem dispor de proteção contra falha de alimentação (PLP), uma vez que cada commit é gravado no disco.
- **Funções de apoio:** um plano de controlo dedicado de três nós (Kubernetes), um nó de monitorização e um par de equilibradores de carga que substituem o equilibrador de carga na nuvem.
- **A coluna de 500 TPS** segue o mesmo método.
  - A camada de aplicações provém da execução de 500 TPS: 40 vCPU provisionadas, ou seja, três nós de trabalho de 16 núcleos com 128 GB.
  - Essa execução não incluiu HA, pelo que a camada de dados foi reduzida em relação à execução de 1 000 TPS com HA.
  - O resultado continua a ser 15 servidores. Na extremidade inferior, as funções fixas de HA (plano de controlo, três brokers «Kafka», três nós de base de dados, balanceadores de carga) definem o limite mínimo, e não o débito (throughput).

> **Aviso importante:** os testes de desempenho publicados utilizaram um servidor primário e uma réplica semissíncrona, e não o PXC. Cada commit no PXC aguarda também a certificação em todo o cluster; por isso, execute os testes de desempenho no PXC antes de se basear nestes valores de latência.

Portanto: **15 servidores por local a 500 e 1 000 TPS, e 17 a 2 000.** Multiplique por número de locais na sua topologia e valide no seu próprio hardware com o mesmo conjunto de testes.

### Orçamento indicativo para equipamento por local

| Capacidade de processamento | Intervalo indicativo (apenas hardware) | Servidores |
|---|---|---|
| 500 TPS | 150 000 $ – 190 000 $ | 15 |
| 1 000 TPS | 165 000 $ – 215 000 $ | 15 |
| 2 000 TPS | 220 mil – 285 mil dólares | 17 |

Trata-se deliberadamente de intervalos de preços, e não de uma tabela de preços, uma vez que o mercado é volátil.

- **Base:** preços de retalho nos EUA por unidade para os servidores especificados, a partir de setembro de 2026, acrescidos de cerca de 30 % de margem de segurança, por uma abordagem conservadora. Os valores incluem o terceiro nó da base de dados.
- **Os preços são voláteis:**
  - Uma escassez de DRAM prevista para 2026 faz com que a memória represente cerca de um terço do custo do hardware.
  - Os preços dos processadores variam consoante as promoções e algumas peças têm prazos de entrega longos.
  - Obtenha cotações com datas específicas e encomende toda a gama de memórias numa única compra.
- **Questione as cotações dos fabricantes originais (OEM):** Os preços de tabela dos fabricantes originais (OEM) para memórias e SSDs podem ser várias vezes superiores ao preço de mercado. Se uma cotação de um fornecedor parecer elevada, questione primeiro essas rubricas.
- **Exclui:** o local de recuperação de desastres (DR), ambientes que não sejam de produção, racks e alimentação elétrica, portes e direitos aduaneiros, assistência técnica e subscrições, bem como armazenamento a baixa temperatura. Um local de recuperação de desastres dimensionado para o pico total duplica, aproximadamente, o número de servidores.

---

## 4. Armazenamento e replicação: o que não deve adquirir

Esta é a secção que os adotantes mais precisam de compreender, pois é aqui que as propostas dos fornecedores divergem com maior frequência daquilo de que o Mojaloop realmente necessita.

### Onde é que o «Mojaloop» mantém o seu estado

**Serviços sem estado.** Os Mojaloop serviços (pesquisa de conta, cotação, o API adaptador, os central-ledger manipuladores, liquidação) são sem estado. Não contêm nada que não possa ser perdido, pelo que pode executar várias réplicas em qualquer nó e escalá-las horizontalmente.

**Componentes com estado.** Todo o estado persistente reside num pequeno número de componentes, e cada um deles replica-se entre os nós:

| Componente | Como é que se replica |
|---|---|
| Kafka | Três cópias de cada mensagem em três brokers (fator de replicação 3) |
| MySQL (Percona XtraDB Cluster) | Cluster síncrono de três nós; cada confirmação é replicada para todos os nós antes de ser devolvida |
| Redis | Réplicas com failover |
| MongoDB | Conjunto de réplicas |

Os testes de desempenho utilizaram um servidor primário MySQL com uma réplica semissíncrona. Isso proporciona a mesma garantia de dados que o PXC, mas sem failover automático.

**A camada de armazenamento não precisa, portanto, de proporcionar redundância, uma vez que a aplicação já o faz.** O que o armazenamento deve ser é:
- **rápido,** com baixa latência de confirmação;
- **independente,** o que significa que cada réplica se encontra no seu próprio nó, com os seus próprios discos.

Trata-se de NVMe local.

### Por que razão o SAN/NAS constitui um antipadrão para Mojaloop

Um SAN ou NAS não só é desnecessário para o «Mojaloop», como também funciona ativamente contra si.

- **Redundante.** O Kafka e o MySQL já mantêm três cópias dos dados. Se as colocar numa SAN com RAID-10 e espelhamento de matriz para matriz, um único registo pode existir doze vezes. O senhor paga por cada cópia.
- **Mais lento.** Kafka e a base de dados é gravada no disco a cada commit. Com uma SAN, cada gravação implica uma viagem de ida e volta pela rede até ao array. Essa latência é adicionada a cada transferência e limita o seu TPS.
- **Falha partilhada.** Este aspeto é subtil. Colocou cuidadosamente três réplicas em três servidores, de modo a que falhassem de forma independente. Se os três discos forem volumes na mesma matriz, uma avaria num controlador, um erro de firmware ou uma atualização mal executada deixa os três fora de serviço de uma só vez. Transformou um projeto com tripla redundância num único ponto de falha.
- **Caro.** A SAN implica vários custos próprios:
  - as próprias matrizes;
  - Switches Fibre Channel;
  - adaptadores de barramento de anfitrião (HBAs) em todos os servidores;
  - licenças e contratos de assistência.

  Em conjunto, estes costumam custar mais do que os servidores e todos os outros componentes combinados. A título de referência, uma SAN híbrida de gama económica com 500 TB de capacidade útil, uma malha Fibre Channel redundante e 5 anos de assistência técnica tinha um preço de mercado nos EUA de aproximadamente 175 mil a 280 mil dólares em setembro de 2026. Trata-se de cerca de um quarto de milhão de dólares americanos por um único subsistema de armazenamento, um valor comparável ou superior ao custo total dos componentes dos servidores para um local com 1 000 TPS.

**O espelhamento local é adequado.** Um espelhamento RAID1 local e económico em cada servidor dMySQL é adequado e está incluído na lista de materiais recomendada. O anti-padrão é a matriz partilhada e o seu espelhamento, e não a proteção do disco local.

**Uma nuance, expressa com franqueza.** Os testes de desempenho utilizaram o AWS EBS, que, por si só, está ligado à rede, e mesmo assim foram bem-sucedidos. O argumento principal contra o SAN/NAS é, portanto, a duplicação, a falha correlacionada e o custo. A latência é um fator real, mas secundário, e é mais relevante para o seu p99.

> **Em vez disso:** utilize NVMe local em cada nó de dados, disponibilizado através de Kubernetes volumes persistentes locais, com réplicas distribuídas pelos nós e racks.

### Replicação de máquinas virtuais vs. replicação de aplicações

Muitos ambientes empresariais ativam, por predefinição, a alta disponibilidade (HA) e a replicação ao nível do hipervisor. Isto causa incompatibilidades com a replicação ao nível da aplicação.

| Hipervisor / replicação de armazenamento | Replicação Kafka/MySQL |
|---|---|
| Copia blocos de disco, normalmente de forma assíncrona | Reproduz as transações confirmadas numa ordem rigorosa, identificadas por Kafka deslocamentos e MySQL GTIDs (identificadores globais de transação) |
| Na melhor das hipóteses, é consistente em caso de falha para uma VM de cada vez, sem coordenação entre as VMs | Recorre ao quórum para decidir quem é o líder |
| Não sabe nada sobre transações, nem sobre quem é o líder «Kafka» ou o «MySQL» primário | Concebido para ser a única fonte de informação fiável |

**Quando ambos estão em execução, ocorrem conflitos:**
- **Percurso de gravação duplo:** cada commit é replicado duas vezes, aumentando a latência e desperdiçando largura de banda sem qualquer benefício.
- **Ressurreição de dados desatualizados:** o hipervisor reinicia uma VM de base de dados ou de broker que tenha falhado a partir do seu disco replicado. Essa cópia está desatualizada, mas é reiniciada na convicção de que está atualizada.
- **«Split brain»:** uma partição de rede desencadeia um failover do hipervisor ao mesmo tempo que a aplicação elege um novo líder, e acaba por ficar com dois primários a aceitar gravações.

### Como se apresenta, então, essa recuperação e como evitá-la

**Sintomas observados após uma falha de transição deste tipo:**
- **MySQL:** um membro regressa com transações que o resto do cluster não possui, ou em que faltam transações que este possui. O cluster deteta que o histórico de transações do membro (o seu conjunto de GTIDs) já não corresponde, rejeita-o e o utilizador reconstrói-o a partir de um doador em bom estado. Esse é o resultado *positivo*.
- **Caso Kafka:** um broker regressa com um registo que diverge do dos seus pares. Se se tornar líder através de uma eleição não válida, as mensagens confirmadas podem perder-se.
- **Máquinas virtuais restauradas:** se restaurar várias máquinas virtuais a partir de réplicas, cada uma fica num ponto no tempo ligeiramente diferente. A base de dados da razão geral, as posições dos participantes e os Kafka offsets já não coincidem.
- **Transferências:** algumas ficam bloqueadas a meio do processo, e as posições de liquidação necessitam de reconciliação manual, num sistema de pagamentos, sob pressão.

**Orientações:**
- **Deixe que a própria aplicação se encarregue da replicação.**
- **No caso de componentes com estado,** desative o reinício de alta disponibilidade (HA) do hipervisor e a replicação das máquinas virtuais. Melhor ainda, não utilize qualquer hipervisor nestes componentes.
- **Quando uma réplica falhar,** reconstrua-a a partir das suas réplicas em bom estado. Nunca restaure uma imagem de VM desatualizada num cluster ativo.
- **Para situações de catástrofe real,** mantenha cópias de segurança adequadas com recuperação a um momento específico. Trata-se de algo diferente da replicação.

---

## 5. Escolha da plataforma

### A recomendação: mantenha as coisas simples

A pilha recomendada, de cima para baixo:

| Camada | Recomendação |
|---|---|
| Aplicações | Mojaloop, Kafka, MySQL, Redis, MongoDB, deployed com Helm |
| Serviços de plataforma | Código aberto: Prometheus, Grafana e Loki para observabilidade, cert-manager para certificados, um controlador de entrada e ferramentas GitOps para deployment |
| Orquestração | Kubernetes de código aberto instalado diretamente em hardware nu, por exemplo, RKE2, K3s, MicroK8s ou kubeadm (os testes de desempenho utilizaram o MicroK8s) |
| Sistema operativo | Linux padrão, por exemplo, Ubuntu, SLES, Rocky |
| Hardware | Servidores x86 de gama média («um VW, não um Rolls-Royce») com NVMe local, 2 × 25 GbE e duas fontes de alimentação. Nada de extraordinário. |

**Porquê o «bare metal»?**
- **Sem sobrecarga do hipervisor nem licenças de hipervisor.**
- **Acesso direto ao disco:** as bases de dados têm acesso direto ao NVMe.
- **Sem funcionalidades em falta:** o «Kubernetes» já oferece a maior parte do que se poderia desejar de uma camada de virtualização, nomeadamente agendamento, isolamento, autocorreção e atualizações contínuas.
- **Menos modos de falha:** cada camada que se remove é uma camada que não pode falhar nem ser mal configurada.

É assim que se obtém o máximo valor de um hardware adequado e económico.

### O compromisso: o código aberto em detrimento das plataformas dos fornecedores

Trata-se de um compromisso deliberado, e vale a pena ser honesto em relação a ambas as partes.

| O que irá ganhar | O que o(a) senhor(a) assume | Como mitigar |
|---|---|---|
| Custos de licença e de hardware significativamente mais baixos | A integração e as atualizações estão a seu cargo | Subscrições opcionais de suporte comercial para distribuições de código aberto «Kubernetes» e para o Linux, por uma fração dos custos das licenças das plataformas proprietárias |
| Sem vinculação: funciona da mesma forma na nuvem ou no local | Não há um único fornecedor a quem ligar às 3 da manhã; o apoio é prestado, em primeiro lugar, pela comunidade | Formar e certificar uma equipa local responsável pela plataforma |
| A mesma pilha em que a comunidade testa o Mojaloop | São necessárias competências genuínas em engenharia de plataformas | Integradores contratados para operações, e não para licenças |

O «Mojaloop Foundation» considera que esta opção é a mais adequada para a maioria dos adotantes.

## 6. Alta disponibilidade, RPO e RTO

### Como o Mojaloop consegue a alta disponibilidade (HA)

| Camada | Mecanismo | Caso se perca um nó |
|---|---|---|
| Serviços sem estado | Réplicas distribuídas pelos nós (anti-afinidade); escalabilidade horizontal | Não há interrupção. O tráfego no nó inativo fica bloqueado até ser reencaminhado |
| Kafka | Fator de replicação 3, mínimo de 2 em sincronia, `acks = all`; eleição de líder não validada desativada | Os líderes foram reeleitos em segundos; não se registou a perda de nenhuma mensagem |
| MySQL: Percona XtraDB Cluster | 3 nós, virtualmente síncronos; um gravador de cada vez através do ProxySQL | Escritor perdido: o proxy executa as gravações em segundos; nenhuma transferência confirmada é perdida |
| Quórum PXC | Se quaisquer 2 dos 3 nós permanecerem operacionais, o cluster continua a permitir gravações | O nó que sofreu uma falha volta a integrar-se através da sincronização a partir de um par (IST/SST) |
| Kubernetes. plano de controlo | 3 membros do etcd | Sobrevive à perda de um |
| API design | Assíncrono, identificadores de transferência idempotentes, verificações de duplicados | Os DFSPs repetem com segurança as transferências que estavam em curso |

**Os serviços sem estado** funcionam como réplicas distribuídas pelos nós com anti-afinidade, pelo que nenhum nó individual detém todas as cópias de qualquer elemento. Se um nó falhar, não se verifica qualquer interrupção do serviço. Os pods que permanecem operacionais continuam a prestar o serviço, embora o tráfego que se encontrava no nó inoperacional fique em espera até ser reencaminhado (ver abaixo).

**O Kafka** executa três réplicas, com um mínimo de duas em sincronia. Os produtores aguardam que todas as réplicas estejam em sincronia, e a eleição de líderes «unclean» permanece desativada. Uma mensagem só é confirmada quando dois intermediários a detêm; assim, a perda de um intermediário não implica a perda de nada que já tenha sido confirmado, e os novos líderes são eleitos em segundos.

**A razão geral: Percona XtraDB Cluster.** A arquitetura recomendada para produção da razão geral é um Percona XtraDB Cluster de três nós.
- **Sem etapa de promoção:** cada commit é validado e replicado para todos os nós antes de ser devolvido, pelo que cada nó mantém todas as transferências confirmadas.
- **Roteamento de escritor único:** os três nós estão ativos e sincronizados, mas as gravações são encaminhadas para um nó de cada vez através do ProxySQL. A razão prende-se com a carga de trabalho do «Mojaloop»: cada transferência atualiza uma de um pequeno número de linhas de posição dos participantes. Com vários escritores, as atualizações simultâneas na mesma linha falham na certificação no momento do commit e, a estes ritmos, isso significa uma elevada taxa de commits rejeitados. O encaminhamento para um único escritor evita essa situação.
- **Perda de um escritor:** se o nó escritor falhar, o proxy redireciona as gravações para outro nó em segundos.
- **Quórum:** quaisquer dois dos três nós mantêm o cluster em estado de gravação, e um nó que tenha falhado volta a integrar-se através da sincronização com um par.

Note-se que os resultados de desempenho publicados utilizaram um servidor primário MySQL com uma réplica semissíncrona, e não o PXC.

**O plano de controlo** conta com três membros do etcd e mantém-se operacional mesmo em caso de perda de um deles.

**O design «API»** também é importante. As transferências são assíncronas, com IDs únicas e verificações de duplicados, pelo que um «DFSP» que perca uma resposta durante uma falha pode tentar novamente com segurança, sem criar um pagamento duplo.

### Perda de um nó: como se apresentam, na realidade, o RPO e o RTO

Uma pergunta frequente: com três réplicas de tudo, replicação em Kafka e um cluster de bases de dados síncrono, por que razão a perda de um nó teria qualquer custo?

**RPO: zero.** No que diz respeito aos dados, a perda de um nó não acarreta qualquer custo.
- **As transferências confirmadas** sobrevivem à perda de qualquer nó individual.
- **As transferências em curso** nunca foram confirmadas, pelo que o DFSP as repete e a idempotência garante que esse processo é seguro.
- **Condições:** isto só se verifica se:
  - todos os produtores no caminho da transferência utilizarem o valor `acks=all`;
  - a eleição de líder «unclean» permanecer desativada no valor Kafka;
  - o cluster da base de dados mantiver o quórum.

**RTO: uma breve paragem.** O tempo de recuperação é um caso à parte, porque qualquer mecanismo de failover tem, em primeiro lugar, de detetar a falha.
- **Deteção de nós:** por predefinição, o Kubernetes demora cerca de 40 a 50 segundos a marcar um nó como «NotReady» e a retirar os seus pods de serviço.
- **Reequilíbrio do consumidor:** Kafka pod de consumidor nesse nó contém partições que permanecem por consumir até que o grupo se reequilibre, o que demora cerca de 45 segundos por predefinição.
- **Efeito:** não há interrupção do serviço, mas a parte das transferências que passa pelo nó em falha fica em espera durante cerca de um minuto, e algumas atingem os tempos limite dos clientes. É isso que o nível DFSP experimenta.

**Base de dados: segundos, não minutos.** Com o Percona XtraDB Cluster, a base de dados já não é a exceção.
- Cada nó já contém todas as confirmações, pelo que não há qualquer etapa de promoção ou sincronização.
- O ProxySQL deteta o escritor com falha e redireciona as gravações para um nó ativo em segundos.
- A única regra é gravar num único nó de cada vez, uma vez que as linhas em posição ativa do «Mojaloop» causariam conflitos de confirmação com vários escritores.

> **Para reduzir o RTO,** utilize tempos de espera mais curtos (Kafka) para as sessões dos utilizadores, deteção de valores atípicos na malha de serviços, testes de prontidão mais rigorosos e uma deteção mais rápida de falhas nos nós. Estas medidas reduzem o tempo de paragem parcial para segundos, à custa de um maior número de falsos positivos. **Após qualquer falha, a sua redundância fica esgotada até que o nó seja substituído,** razão pela qual o dimensionamento é N+1.

---

## 7. Utilização da plataforma

Adquirir a infraestrutura adequada é metade do trabalho; operá-la é a outra metade.

- **Replicação ≠ cópia de segurança.** A replicação copia fielmente uma migração mal sucedida ou uma eliminação acidental para todas as réplicas. Efetue cópias de segurança programadas com recuperação a um momento específico, armazene-as fora do local e teste efetivamente as restaurações.
- **Esteja atento a tudo.** Utilize o Prometheus, o Grafana e o Loki. Esteja atento a atrasos nos consumidores (Kafka), atrasos na replicação da base de dados e latência do disco; esses são os seus sinais de alerta precoces.
- **Ensaie o fracasso.** Realize exercícios de simulação regulares: desligue um nó, um switch, uma fonte de alimentação e o nó de gravação da base de dados, de acordo com um calendário definido. Um RTO que não tenha sido demonstrado é uma esperança, não um número, e a esperança não é uma estratégia.
- **Teste o desempenho** no seu próprio equipamento, antes da entrada em funcionamento e após cada atualização significativa.
- **Assegure a segurança da plataforma.** mTLS, JWS e ILP fazem parte da configuração testada. Faça a gestão adequada de PKI e do armazenamento de chaves e mantenha uma cadência regular de aplicação de correções de segurança.
- **Analisar a capacidade** trimestralmente: tendência de crescimento em relação à margem de manobra, bem à frente dos picos conhecidos.

---

## 8. Perspetivas para o futuro: TigerBeetle

A comunidade Mojaloop está a trabalhar no sentido de substituir a razão geral MySQL pelo [TigerBeetle](https://tigerbeetle.com/), uma base de dados concebida especificamente para transações financeiras. Isto afeta as aquisições das seguintes formas:

- **Margem de capacidade de processamento:** cerca de 450 000 transferências nativas do TigerBeetle por segundo equivalem a cerca de 65 Mojaloop TPS (no pior dos casos) num cluster de produção com seis réplicas. Não há necessidade de mais núcleos nem de mais memória RAM para aumentar o débito (throughput); já existe uma ampla margem de capacidade.
- **Latência:** uma menor latência de gravação no «hot-path» significa uma melhor latência p99.
- **Escalabilidade:** uma melhor escalabilidade sublinear do débito traduz-se em um desempenho significativamente superior no mesmo hardware.
- **Ainda são necessários MySQL:** os metadados das transações continuam a ser armazenados no MySQL, pelo que a necessidade de disponibilizar o MySQL se mantém. Serão necessários menos recursos, uma vez que a contenção é eliminada, pelo que não será necessário adicionar hardware.

> **Conclusão principal:** adquirir o produto com as características atuais do Ledger MySQL não o prejudicará. Terá mais margem de crescimento quando atualizar para a versão Mojaloop, equipada com a tecnologia TigerBeetle.

---

## 9. Lista de verificação para a contratação pública

Tenha isto em conta na sua próxima concurso ou revisão do projeto.

**Questões a que deve responder antes de comprar qualquer coisa**

- [ ] SLA, RPO e RTO alvo acordados com a entidade reguladora
- [ ] TPS de pico e sustentado, com uma previsão de crescimento
- [ ] Topologia do site selecionada: domínios de falha, testemunha, DR; PXC de três nós com failover por proxy
- [ ] Alimentação elétrica diversificada (alimentações A+B) e operadores de rede diversificados
- [ ] A latência entre os locais foi medida, não estimada

**Como deve ser a lista de materiais**

- [ ] Servidores de gama média com NVMe local; sem SAN nem NAS
- [ ] Kubernetes em ambiente «bare-metal» de código aberto; sem hipervisor nos componentes de dados
- [ ] Margem para N+1 em picos de carga e cerca de 30 % de reserva
- [ ] O orçamento destina-se à formação, ao apoio e a exercícios de simulação de falhas, e não a licenças
- [ ] Um teste de desempenho bem-sucedido no hardware entregue, previsto no contrato como critério de aceitação

---

## 10. Questões a resolver no âmbito do seu scheme

Estes foram os temas propostos para o debate aberto da sessão e constituem questões úteis para qualquer equipa de planeamento de schemes:

- O que está a motivar a sua decisão de optar pela nuvem ou por uma solução no local?
- Que SLA é exigido pela sua entidade reguladora ou pelo regulamento do seu scheme, e já foi traduzido numa topologia do local?
- Caso tenha propostas de fornecedores em análise, em que aspetos diferem mais da abordagem apresentada neste guia?

---

## Glossário

| Termo | Significado |
|---|---|
| **acks = todos** | Configuração «Kafka» do produtor: uma mensagem só é confirmada quando todas as réplicas sincronizadas a tiverem recebido |
| **Anti-afinidade** | Regra Kubernetes, que distribui réplicas do mesmo serviço por diferentes nós |
| **DFSP** | Prestador de serviços financeiros digitais: um participante no esquema |
| **DR** | Recuperação em caso de catástrofe, normalmente num local secundário |
| **etcd** | O estado do cluster da loja de consenso é «Kubernetes» |
| **FSPIOP / ISO 20022** | Os dois formatos de mensagem que o API permite Mojaloop; as mensagens ISO 20022 são cerca de 30% maiores |
| **GTID** | Identificador global da transação: o ID único da MySQL para cada transação confirmada, utilizado para acompanhar quais as transações que cada servidor aplicou |
| **HBA** | Adaptador de barramento anfitrião: a placa de interface instalada em cada servidor para o ligar a uma SAN, normalmente Fibre Channel |
| **IST / SST** | Transferência incremental / de instantâneo de estado: como um nó do Percona XtraDB Cluster sincroniza-se com um par ao voltar a integrar-se |
| **ISR** | Réplicas sincronizadas: as Kafka réplicas estão totalmente em sincronia com o líder |
| **N+1** | A capacidade foi dimensionada de forma a que o serviço continue a cumprir a sua meta mesmo que um dos componentes falhe |
| **p. 99** | Latência no 99.º percentil: 99 % dos pedidos são concluídos dentro deste intervalo de tempo |
| **PLP** | Proteção contra falhas de alimentação: condensadores do SSD que garantem que as gravações confirmadas cheguem à memória flash durante uma falha de alimentação |
| **PXC** | Percona XtraDB Cluster: um cluster «MySQL» síncrono, baseado no Galera |
| **RF** | Fator de replicação: o número de cópias que o Kafka mantém de cada mensagem |
| **RPO** | Objetivo de ponto de recuperação: qual a quantidade de dados reconhecidos que podem ser perdidos em caso de falha |
| **RTO** | Objetivo de tempo de recuperação: o tempo que o serviço demora a recuperar após uma falha |
| **RTT** | Tempo de ida e volta: o tempo que uma mensagem demora a chegar a outro local e a resposta a regressar |
| **SAN / NAS** | Rede de armazenamento (SAN) / armazenamento ligado à rede (NAS): matrizes de armazenamento partilhadas e ligadas à rede |
| **Cérebro dividido** | Duas partes de um cluster, cada uma delas a considerar-se responsável pelo encargo e a aceitar gravações de forma independente |
| **Termos de Referência** | Switch de topo de rack |
| **TPS** | Transferências por segundo |

---

## Referências

- Mojaloop. Workstream de desempenho: [github.com/mojaloop/ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws). Contém o código da infraestrutura, Helm substituições, scripts de teste e os relatórios completos dos cenários para as execuções de 500, 1 000 e 2 000 TPS referidas neste guia.
