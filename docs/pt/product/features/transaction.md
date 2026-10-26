
# Transações Mojaloop
Esta secção trata de todos os aspetos de uma transação Mojaloop.

## Fases de uma transação Mojaloop

Um hub de pagamentos baseado na plataforma Mojaloop compensa (encaminha e garante) pagamentos entre contas detidas por partes finais (pessoas, empresas,
departamentos governamentais, etc.) em DFSP (Digital Financial Services Providers), e integra-se com um parceiro de
liquidação para orquestrar a movimentação de fundos na liquidação entre
os DFSPs participantes, quer simultaneamente (liquidação contínua por valores brutos), quer num momento posterior (várias formas de liquidação por valores líquidos), de acordo com um calendário de liquidação
acordado.

Todas as transações Mojaloop são assíncronas (para garantir a utilização mais eficiente
dos recursos) e decorrem em três fases:

1.  **Descoberta,** quando o DFSP do pagador trabalha com o Hub Mojaloop para determinar para onde o pagamento deve ser enviado. Esta fase resolve um alias para um DFSP beneficiário específico e, em colaboração com esse DFSP, para uma conta individual.
 &nbsp;
2.  **Acordo de termos, ou cotação,** quando as duas partes DFSP da transação acordam que a transação pode avançar (sujeita, por exemplo, a restrições relacionadas com KYC escalonado) e em que termos (incluindo comissões).
 &nbsp;

3.  **Transferência,** quando a transação entre os dois DFSPs (e, por procuração, as contas dos seus clientes) é compensada.
&nbsp;

Estas fases são complementadas pela natureza assíncrona do Mojaloop. Uma transação é sempre única, o que garante que será processada apenas uma vez, independentemente da frequência com que seja submetida para processamento. Esta qualidade é conhecida como idempotência e garante que, mesmo que um cliente tenha conectividade intermitente, pode ter a certeza de que a sua conta só será debitada uma vez, independentemente do número de novas tentativas.

Esta abordagem em três fases, complementada pela idempotência, foi concebida para minimizar o risco de falhas ou de duplicação de transações. Consequentemente, o Mojaloop elimina a necessidade técnica de reconciliação de transações pelos DFSPs, reduz a maioria das causas de litígios e, assim, minimiza os custos para todas as partes. 

Em conjunto com a abordagem do Mojaloop à [gestão de risco](./risk.md), isto garante que mesmo a mais pequena instituição de microfinanças (IMF) e o maior banco internacional podem participar em pé de igualdade, sem que nenhum deles imponha risco ao outro, nem, de facto, ao próprio Hub.

&nbsp;
## APIs Mojaloop

O Hub Mojaloop disponibiliza quatro APIs. As duas primeiras dizem respeito às transações dos clientes finais, enquanto as duas últimas dizem respeito à administração da relação do Hub com os DFSPs participantes e à liquidação das transações compensadas:

1. **API transacional**    
O Mojaloop oferece duas APIs transacionais funcionalmente equivalentes, cada uma das quais permite ligações diretas com os participantes para a realização de transações. Ambas são compatíveis com todos os [**casos de uso do Mojaloop**](./use-cases.md) e foram desenvolvidas de acordo com os [princípios do Level One](https://www.leveloneproject.org/project_guide/level-one-project-design-principles/). Estas APIs são:
    - **API FSP Interoperability (FSPIOP)**, a API há muito estabelecida e amplamente comprovada;
&nbsp;
    - Um **schema de mensagens ISO 20022**, que utiliza um conjunto de mensagens ISO 20022 acordado provisoriamente pela Mojaloop Foundation com o ISO 20022 Registration Management Group (RMG) e adaptado às necessidades de um sistema de pagamentos instantâneos inclusivo (Inclusive Instant Payments System, IIPS) como o Mojaloop. Este é oferecido aos adotantes como alternativa à FSPIOP. Os detalhes completos da implementação Mojaloop do schema de mensagens ISO 20022 e da forma como se espera que os DFSPs participantes o utilizem podem ser consultados no [**documento de práticas de mercado ISO 20022 do Mojaloop**](./iso20022.md).
	
2.  **API de iniciação de pagamentos por terceiros (3PPI/PISP)**

	Esta API é utilizada para gerir acordos de pagamento por terceiros - pagamentos iniciados por fintechs em nome dos seus clientes a partir de contas detidas por esses clientes em DFSP ligados ao Hub Mojaloop. - e para iniciar esses pagamentos quando autorizados.


3.  **API de administração**

	O objetivo da API de administração é permitir que os operadores do Hub giram os processos administrativos relativos a:

	-   criar/ativar/desativar participantes no Hub

	-   adicionar e atualizar a informação de endpoints dos participantes

	-   gerir contas, limites e posições dos participantes

	-   criar contas do Hub

	-   realizar operações de entrada de fundos (Funds In) e de saída de fundos (Funds Out)

	-   criar/atualizar/visualizar modelos de liquidação, para gestão subsequente através da API de liquidação

	-   obter detalhes de transferências

4.  **API de liquidação**

	A API de liquidação é utilizada para gerir o processo de liquidação. Não se destina à gestão de modelos de liquidação.

&nbsp;

## Características únicas das transações

A maioria, se não a totalidade, das funções que o Mojaloop disponibiliza é também oferecida por
outros hubs de compensação de pagamentos. O que diferencia o Mojaloop é:

1.  **O fluxo de transação em três fases e a idempotência**, descritos acima.   &nbsp;
2.  **A fase de acordo de termos, ou cotação,** de uma transação,
    que permite a dois DFSPs acordarem que uma transação pode ter lugar *antes* de esta ser confirmada. Isto permite alguns dos aspetos mais complexos das transações entre tipos diferentes de participante; um DFSP beneficiário pode verificar que a conta do cliente pode receber o pagamento, que não foi suspensa, ou que o pagamento não excederá os limites de transação ou de saldo. Se tudo estiver em ordem, o DFSP beneficiário indicará então que pode aceitar a transação, sujeita a quaisquer comissões que irá cobrar (quaisquer comissões do Hub ficam fora da transação propriamente dita). Só se o DFSP pagador, e o próprio pagador, aceitarem esses encargos (e quaisquer outras condições associadas aos termos devolvidos pelo DFSP beneficiário) é que a transação será então iniciada. Isto elimina a incerteza e praticamente garante que a transação será bem-sucedida, mesmo antes de acontecer.
   
3.  **O não repúdio ponta a ponta** na fase de transferência da transação garante que cada parte numa mensagem pode ter a certeza de que a mensagem não foi modificada e de que foi realmente enviada pelo alegado emissor. Esta tecnologia subjacente é aproveitada pelo Mojaloop para garantir que uma transação só será confirmada se *tanto* o DFSP pagador *como* o DFSP beneficiário aceitarem que o é, e nenhuma das partes pode repudiar a transação. Isto dispensa a necessidade de reconciliação ao nível da transação, o que reduz o nível de transações contestadas e elimina o processamento de exceções, reduzindo assim substancialmente os custos para todos os participantes. Isto apoia também diretamente os objetivos de inclusão financeira da Mojaloop Foundation, uma vez que aborda uma das principais barreiras à inclusão: a falta de certeza e, por conseguinte, de confiança nos pagamentos.

	A comunidade Mojaloop disponibiliza um conjunto de ferramentas que podem ser utilizadas livremente pelos DFSPs para se ligarem a um Hub Mojaloop. Estas permanecem no domínio do DFSP e não são da responsabilidade do operador do hub nem de qualquer outra parte. Para além de gerirem a ligação ao Hub e facilitarem as transações, estas ferramentas asseguram também a segurança da ligação e, em particular, fornecem a ligação fundamental do DFSP a esta capacidade de não repúdio.  
	&nbsp;
4.  **A API PISP é disponibilizada através do Hub Mojaloop,** e não pelos participantes individuais. Consequentemente, uma fintech pode integrar-se com o Hub e ficar imediatamente ligada a todos os DFSPs ligados, em vez de ter de concluir uma integração de API com todos eles individualmente. Isto reduz substancialmente os custos e aumenta a fiabilidade para as fintechs e os seus clientes.

## Aplicabilidade

Esta versão deste documento diz respeito à versão [17.0.0](https://github.com/mojaloop/helm/releases/tag/v17.0.0) do Mojaloop

## Histórico do documento
  |Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.3|30 de junho de 2025| Paul Makin|Pequenas clarificações à descrição do acordo de termos| 
|1.2|14 de abril de 2025| Paul Makin|Atualizações relacionadas com o release da V17|