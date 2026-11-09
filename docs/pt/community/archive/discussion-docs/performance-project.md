---
i18n_source_sha: 58f3ee075258a90e4935acfcf0fdaa86260d85d7
---

# Workstream de desempenho

Quarta-feira, 11 de março de 2020

## Objetivos de desempenho:

- Sistema de HW atual a atingir 1k TPS de forma estável, pico de 5k e escalabilidade horizontal comprovada
  1. Mais instâncias = mais desempenho, de forma quase linear.
  1. Validar a infraestrutura mínima para fazer 1K TPS (TPS fin)
  1. Determinar a configuração e o custo de nível de entrada (AWS e infraestrutura própria)

## POC:

Testar o impacto ou a substituição direta da BD mysql por um serviço de rede de memória partilhada, como o redis (utilizando o algoritmo redlock, se forem necessários locks)

Testar um método diferente de partilha de estado, utilizando uma versão leve de event-driven com algum CQRS

## Recursos:

- Canal do Slack: `#perf-engineering`
- [Apresentação de desempenho de meio de PI](https://github.com/mojaloop/documentation-artifacts/tree/master/presentations/March2020-PI9-MidPI-Review)
- [Configurar os componentes de monitorização](https://github.com/mojaloop/helm/tree/master/monitoring)
 
## Itens de ação/seguimento:

- Que métricas de Kafka (do lado do cliente e do servidor) deveríamos estar a rever? - Confluent a apoiar
- Explorar os locks e a liquidação de posições - Sybrin a apoiar
  1. Rever o RedLock - locking pessimista face a locking automático
  2. Remover a BD partilhada pelo meio (locking automático no Redis)

- Combinar o handler de prepare/position com uma BD distribuída
- Rever o cliente node.js e a forma como afeta o kafka, a configuração do Node e o cliente Kafka final - Nakul
- Voltar a ligar o tracing para ver como se comportam a latência e as aplicações
- Garantir que as contagens de chamadas foram racionalizadas (a um nível mais profundo)
- Validar os tempos de processamento nos handlers e se estamos a atingir a cache  
- Padrões assíncronos no Node
  1. Falta alguém que seja excelente em mysql e percona
  2. Estaremos a tirar partido disto corretamente
        
- Que camada de cache estamos a utilizar (em memória)
- Rever a implementação da modelação de eventos - identificar os eventos de domínio
- Node.js/kubernetes - 
- Focar nos problemas da aplicação, não tanto nos problemas de arquitetura
- Como estamos a fazer a tecnologia assíncrona - rever isto (Node.JS - questão mais ampla), os modelos com threads precisam de ser otimizados - Nakul
 
## Notas/detalhes da reunião

### Historial

1. A tecnologia foi implementada, esperava-se que o design resolvesse um problema empresarial
        
2. O esforço da comunidade não deu prioridade a tornar as fatias do sistema de nível empresarial ou baratas de operar
        
3. Escolhas de tecnologia OSS

### Objetivos

1. Otimizar o sistema atual
2. Torná-lo mais barato de operar
3. Torná-lo escalável até 5K TPS  
4. Garantir que os serviços de valor acrescentado conseguem aceder aos dados das transações de forma eficaz e segura 

### Restrições dos testes

1. Só foi feita a transferência golden - a perna da transferência    
2. Fluxo da transferência
3. Simuladores (legado e avançado) - a utilizar o legado por continuidade 
4. Handler de tempo limite desativado
5. 8 DFSP (organizações participantes) - com mais DFSP conseguiríamos escalar

### Processo

1. O Jmeter inicia o pedido do pagador    
2. O simulador legado recebe o callback de notificação de fulfill
3. O simulador legado trata do processamento do beneficiário, inicia o callback de execução
4. Registo na tabela de posições de cada DFSP
    - a. Algoritmo parcial em que o lock é feito para reservar os fundos, fazer os cálculos e fazer os commits finais
    - b. O handler de posições processa um registo de cada vez

5. O algoritmo futuro faria um processamento em lote 
        
- Uma transferência é tratada por um handler de posições
    - As transferências são todas pré-financiadas

1. Custos de liquidação reduzidos     
2. É possível controlar a rapidez com que os DFSPs respondem ao pedido de fulfill (concluir primeiro as transferências confirmadas antes de tratar novos pedidos)
- O sistema precisa de terminar por tempo limite as transferências que demorem mais de 30 segundos
  - Qualquer redesenho das BD 
  - Casos de teste

- Transação financeira
  - Ponta a ponta
  - Apenas prepare
  - Apenas fulfil

- Caracterização individual do Mojaloop
  - Serviços e handlers
  - Arquitetura e bibliotecas de streaming
  - Base de dados
  - O que mudou: 150 para 300 TPS?

- Como processamos as mensagens
- Handler de posições (executar em modo misto, aleatório 
  - Medição da latência

1. 5 s para a BD processar, X s para o Kafka processar
2. Como medir isto?

### Metas 

1. Suficientemente elevadas para que o sistema tenha de funcionar bem
2. Aumentar o sistema para acrescentar escala (adição de x DFSP) 
3. Casos suspeitos para investigação
4. Observar as contenções em torno da BD
5. BD partilhada, 600 MS sem quaisquer erros
  - A contenção está totalmente na BD
  - O estrangulamento é a BD (distribuir os sistemas para que corram de forma independente 



- 16 bases de dados executadas de ponta a ponta 
- GSMA - 500 TPS
- Qual é o design ótimo?

### Contenções 

1. Contenção do handler do sistema 
    - Onde o sistema pode ser escalado
1. Se houver alterações de arquitetura que tenhamos de fazer, podemos explorá-las
    - Consistência para cada DFSP
    - Threading dos fluxos de informação - questão em aberto

1. Resultados enviesados de uma única BD para todos os DFSPs     
1. O desafio é saber até onde se chega com HW adicional 
    - Quais são os limites do design da aplicação
1. Transferências financeiras (para dentro e para fora do sistema)
    - Sistemas de auditoria
    - Atividade de liquidação 
    - Agrupar na BD resolve alguns problemas
    - Feedback da Confluent

1. Problemas de BD partilhada, várias BD
        
1. Problemas ao nível do design da aplicação
        
1. Vimos situações em que executámos um conjunto de simuladores/sandboxes
    - É preciso recorrer a tracers e análises assim que isto entrar em produção
    - Miguel afirma que desativamos o tracing por agora
 
### Problemas conhecidos

1. Carga de recursos de CPU nas máquinas (node à espera) - reotimizar o código
2. Os tempos de processamento aumentam ao longo do tempo

## Otimização
 1. Monolítico distribuído - PRISM - eliminar as leituras redundantes
 2. Combinar os handlers - Prepare+Position e Fulfil+Position

### O que estamos a tentar corrigir?
  1. Conseguimos escalar o sistema?    
  2. Quanto custa fazê-lo? (custo por unidade de escala) 
  3. É preciso perceber  - como fazer isto em pequena e em grande escala
  3. Recursos otimizados
  4. 2,5 sprints
  5. É preciso escalar horizontalmente 
  6. Acrescentar auditoria e repetibilidade - 

### Participantes:

- Don, Joran (perito de desempenho recém-contratado) - Coil
- Sam, Miguel, Roman, Valentine, Warren, Bryan, Rajiv - ModusBox
- Pedro - Crosslake
- Rhys, Nakul Mishra - Confluent
- Miller - Gates Foundation
- Presencialmente: Lewis (CL), Rob (MB), Roland (Sybrin), Greg (Sybrin), Megan (V), Simeon (V), Kim (CL)
