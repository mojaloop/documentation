# Modelo de Glossário Uniforme

- Versão: 1.0
    - Autoria: Carol Coye Benson (Glenbrook)
    - Data: outubro de 2019
    - Descrição:

---

## **Sobre o Mojaloop Community Business Document Project**

Este documento faz parte do Mojaloop Community Business Document Project. O projeto destina-se a apoiar as entidades (países, regiões, associações de prestadores ou empresas comerciais) que implementam novos sistemas de pagamentos com código Mojaloop. Estas entidades terão também de redigir as Regras de Negócio que os participantes no sistema seguirão.

O Mojaloop Community Business Document Project fornece modelos para as Regras de Negócio e documentos conexos. A implementação de um novo sistema de pagamentos envolve muitas escolhas: os modelos apresentam algumas dessas escolhas e, quando adequado, é fornecido comentário sobre a forma como cada escolha em concreto se relaciona com os objetivos de um sistema alinhado com os Level One.

Os documentos seguintes fazem parte do projeto:

- Escolhas-Chave do Scheme

- Modelo de Acordo de Participação no Scheme

- Modelo de Regras de Negócio do Scheme

- Modelo de Diretrizes de Operação da Plataforma

- Modelo de Diretrizes de Operação para a Gestão de Exceções

- Glossário Uniforme

## **Introdução**

Este é um glossário dos termos utilizados no Mojaloop Business Community Document Project e contém outros termos relacionados com temas de negócio. Está disponível um glossário técnico mais detalhado como parte da Open API for FSP Interoperability Specification.

# Modelo de Glossário Uniforme

::: tip NOTA
As entradas mantêm a ordenação alfabética do documento original em inglês, e cada termo é apresentado em português seguido do termo original entre parênteses, para permitir a consulta cruzada com as Regras de Negócio e a documentação técnica em inglês.
:::

| Termo   | Definição                                                                                      |
| :----- | :---------------------------------------------------------------------------------------------- |
| Canal de Acesso (Access Channel) | Locais ou capacidades utilizados para iniciar ou receber um pagamento. Os canais de acesso podem incluir balcões de agências bancárias, caixas automáticas, terminais no POS, pontos de agente, telemóveis e computadores. |
| Consulta de Conta (Account Lookup) | Um processo que determina o DFSP responsável por uma Conta de Transação. |
| Sistema de Consulta de Contas (Account Lookup System) | O Sistema de Consulta de Contas é uma entidade abstrata utilizada para obter informação sobre em que FSP está alojada uma conta, carteira ou identidade. O próprio Sistema de Consulta de Contas pode estar alojado no seu próprio servidor, como parte de um switch financeiro, ou nos diferentes FSP. |
| Validação de Conta (Account Validation) | Um estado fornecido por uma chamada de API de Resposta a Cotação: um DFSP Beneficiário indica que uma conta está disponível para ser creditada com um montante de transferência proposto. |
| Utilizador Ativo (Active User) | Termo utilizado por muitos prestadores para descrever quantos dos seus titulares de conta são utilizadores frequentes do seu serviço. |
| Endereçamento (Addressing) | A utilização de um identificador para dirigir um Pagamento de um Pagador a um Beneficiário, habitualmente um número de telemóvel ou um endereço de e-mail. |
| Adjacências (Adjacencies) | Formas pelas quais as entidades e/ou os DFSP obtêm receitas de serviços não diretamente associados a um Pagamento — por exemplo, empréstimos concedidos a titulares de Contas de Transação. |
| Agente (Agent) | Uma entidade autorizada pelo prestador a desempenhar várias funções, tais como a inscrição de clientes, depósitos e levantamentos através de uma caixa de agente. |
| Ponto de Agente (Agent Outlet) | Um local físico que dispõe de uma ou mais caixas de agente, permitindo-lhe realizar operações de inscrição, depósito e levantamento para clientes, em nome de um ou mais prestadores. A lei nacional define se um ponto de agente pode manter-se exclusivo de um prestador. Os pontos de agente podem ter outros negócios e funções de apoio. |
| Caixa de Agente (Agent Till) | Uma caixa de agente é uma «linha» registada e emitida pelo prestador, seja um cartão SIM especial, seja uma máquina POS, utilizada para realizar operações de inscrição, depósito e levantamento para clientes. A lei nacional determina que prestadores de serviços financeiros podem emitir caixas de agente. |
| Depósito Iniciado pelo Agente (Agent-Initiated Cash-In) | Um Caso de Utilização definido no documento de Especificações da API. |
| Levantamento Iniciado pelo Agente (Agent-Initiated Cash-Out) | Um Caso de Utilização definido no documento de Especificações da API. |
| Agregador (Aggregator) | Uma forma especializada de prestador de serviços a comerciantes, que habitualmente trata das transações de pagamento de um grande número de pequenos comerciantes. As regras do scheme especificam frequentemente o que os agregadores estão autorizados a fazer. |
| Alias (Alias) | Um Identificador de Beneficiário que é mapeado para um DFSP Beneficiário e um Número de Conta de Transação. |
| Combate ao Branqueamento de Capitais (AML) | O Combate ao Branqueamento de Capitais refere-se à Lei Aplicável e, na medida em que sejam expressamente adotadas pelo Scheme, às orientações de boas práticas relativas à mitigação dos riscos de branqueamento de capitais. |
| API | Application Programming Interface: uma interface técnica implementada por um protocolo de software que permite aos sistemas interagirem entre si através de estruturas normalizadas, sem exigir que um sistema utilizador conheça os detalhes de implementação interna do sistema com que interage. |
| Lei Aplicável (Applicable Law) | Todos os tratados, convenções, leis, regulamentos, diretivas e orientações ou instruções oficiais de uma Autoridade Reguladora, na medida em que sejam vinculativos, respetivamente, para o Scheme, para o Scheme ou para um Participante no que respeita aos Serviços do Scheme. |
| Candidato (Applicant) | Uma organização que submeteu ou pretende submeter uma candidatura para se tornar Participante, mas cuja candidatura ainda não foi apreciada pelo Scheme. |
| Application Program Interface (API) | Um método de comunicação que permite a interação e a partilha de dados entre diferentes softwares ou Protocolos Técnicos. |
| Arbitragem (Arbitration) | O recurso a um árbitro, em vez dos tribunais, para resolver litígios. |
| Documentos Associados (Associated Documents) | O conjunto de documentos enumerados no Anexo A das presentes Regras. |
| Levantamento Iniciado em Caixa Automática via OTP (ATM-Initiated Cash-Out via OTP) | Um Caso de Utilização definido no documento de Especificações da API. |
| Atributo (Attribute) | Uma característica de uma Transação, entendendo-se que podem aplicar-se regras específicas a Transações com Atributos específicos. |
| Autenticação (Authentication) | O processo de assegurar que uma pessoa ou uma transação é válida para o processo em curso (abertura de conta, iniciação de transação, e assim por diante). |
| Autorização (Authorization) | A permissão dada pelo Pagador ou pela entidade para efetuar um Pagamento. |
| Entidade/instituição autorizada (Authorized /institution entity) | Instituições não financeiras que obtiveram a devida autorização do Banco Central e/ou das autoridades reguladoras competentes para participar na prestação de serviços financeiros móveis. |
| B2P | Business to Person; um Caso de Utilização Secundário de Pagamento em Massa. |
| Banco (Bank) | Um sistema financeiro autorizado num país com capacidade para aceitar depósitos e para efetuar e receber pagamentos em contas de clientes. |
| Conta Bancária (Bank Account) | Uma Conta de Transação oferecida por um Banco. |
| Identificador de Conta Bancária (Bank Account Identifier) | Um tipo de Identificador de Beneficiário. |
| Contas Bancárias e Serviços de Transação (Bank Accounts and Transaction Services) | Uma conta de transação detida num banco. Esta conta pode ser acessível por telemóvel, caso em que é por vezes designada por «banca móvel». |
| Banco para Banco (Bank to Bank) | Um Caso de Utilização Secundário de P2P. |
| Banco para Carteira (Bank to Wallet) | Um Caso de Utilização Secundário de P2P. |
| Modelo Liderado por Bancos (Bank-Led Model) | Uma referência a um sistema em que os bancos são os principais prestadores de serviços financeiros digitais aos utilizadores finais. A lei nacional pode exigi-lo. |
| Telemóvel Básico (Basic Phone) | Dispositivo mínimo exigido para utilizar serviços financeiros digitais. |
| Pagamento de Faturas (Bill Payment) | Um Caso de Utilização Secundário de P2B. |
| Autenticação Biométrica (Biometric Authentication) | A utilização de uma característica física de uma pessoa (impressão digital, íris, e assim por diante) para autenticar essa pessoa. |
| Lista Negra (Blacklist) | Uma lista ou registo de entidades (utilizadores registados) a quem está a ser negado/bloqueado um determinado privilégio, serviço, mobilidade, acesso ou reconhecimento. |
| Blockchain | Uma tecnologia que cria arquiteturas distribuídas. Nos sistemas de pagamentos, é muitas vezes uma referência a uma razão geral partilhada que regista e valida Transações.
| Blockchain | A tecnologia subjacente à bitcoin e a outras criptomoedas — uma razão geral digital partilhada, ou uma lista continuamente atualizada de todas as transações. |
| Marca (Brand) | Uma palavra e/ou marca aprovada pelo Scheme para utilização pelos Participantes. |
| Desembolso em Massa (Bulk Disbursement) | Um Caso de Utilização definido no documento de Especificações da API. |
| Pagamento em Massa (Bulk Payment) | Um Pagamento de um único Pagador para vários Beneficiários, por exemplo, programas de transferências monetárias de um governo ou de uma ONG para um conjunto de beneficiários. |
| Serviço de carregamento em massa (Bulk upload service) | Um serviço que permite a importação de várias transações por sessão, mais frequentemente através de um ficheiro de transferência de dados em massa utilizado para iniciar pagamentos. Exemplo: ficheiro de pagamento de salários. |
| Empresa (Business) | Entidade, tal como uma sociedade anónima, uma sociedade por quotas ou uma corporação, que utiliza o dinheiro móvel como serviço; por exemplo, para efetuar e aceitar pagamentos de faturas e desembolsar salários. |
| Gestão de Numerário (Cash Management) | Gestão dos saldos de numerário num agente. |
| Depósito (Cash-In) | Receber crédito em eMoney em troca de numerário físico — habitualmente feito num agente. |
| Levantamento (Cash-Out) | Receber numerário físico em troca de um débito numa conta de eMoney — habitualmente feito num agente. |
| Cartão com Chip (Chip Card) | Um cartão com chip contém um chip informático: pode ser sem contacto ou com contacto (exige a introdução num terminal). As normas globais dos cartões com chip são definidas pela EMV. |
| Compensação (Clearing) | O processo, dentro de um sistema de Pagamento, pelo qual um DFSP Pagador e um DFSP Beneficiário debitam e creditam as contas dos seus Utilizadores Finais. |
| Circuito Fechado (Closed-Loop) | Um sistema de pagamentos utilizado por um único prestador, ou por um grupo de prestadores muito restrito. |
| Combate ao Financiamento do Terrorismo (CFT) | Iniciativas para impedir que pessoas ou entidades utilizem sistemas de pagamentos para enviar fundos a pessoas ou entidades associadas ao terrorismo. |
| Comissão (Commission) | Um pagamento de incentivo efetuado, habitualmente, a um agente ou a outro intermediário que atua em nome de um prestador de DFS. Constitui um incentivo para o agente. |
| Confirmar (Commit) | Parte de uma operação de transferência em 2 fases em que os fundos que tinham sido reservados para transferência são libertados a favor do beneficiário; a transferência é concluída entre as contas de origem/pagador e de destino/beneficiário. |
| Condição (Condition) | No protocolo Interledger, um bloqueio criptográfico utilizado quando uma transferência é reservada. Habitualmente sob a forma de um hash SHA-256 de uma pré-imagem secreta. Quando fornecida como parte de um pedido de transferência, a transferência tem de ser reservada de modo a só ser confirmada se for apresentado o cumprimento da condição (a pré-imagem secreta). |
| Corredor (Corridor) | Refere-se a quaisquer dois países numa Transação transfronteiriça e ao sentido da transferência. |
| Contraparte (Counterparty) | O outro lado de uma transação de pagamento ou de crédito. Um beneficiário é a contraparte de um pagador, e vice-versa. |
| Cupão (Coupon) | Um título que dá ao seu portador direito a um desconto ou que pode ser trocado por bens ou serviços. |
| Transferência a Crédito (Credit Transfer) | Um Pagamento ou uma Transferência de fundos iniciada pelo DFSP Pagador para o DFSP Beneficiário. Uma Transferência a Crédito é muitas vezes designada por «transferência push a crédito», porque os fundos são «empurrados» a partir da Conta de Transação do Pagador. A Transferência a Crédito contrasta com o Débito Direto. |
| Transfronteiriço (Cross-Border) | Uma Transferência de um DFSP Pagador domiciliado num país para um DFSP Beneficiário domiciliado noutro país. |
| Transferência com Câmbio (Cross-FX Transfer) | Transferência que envolve várias moedas, incluindo um cálculo cambial. |
| Posição Atual (Current Position) | A posição líquida atual de um Participante na Razão Geral de Posição para uma dada Moeda. |
| Cliente (Customer) | O cliente do sistema. O termo é utilizado tanto para o Pagador como para o Beneficiário. Particulares, comerciantes, emissores de faturas, governos e outras empresas são todos clientes. Por vezes designados por utilizadores finais. |
| Levantamento Iniciado pelo Cliente (Customer-Initiated Cash-Out) | Um Caso de Utilização definido no documento de Especificações da API. |
| Compra Iniciada pelo Cliente (Customer-Initiated Purchase) | Um Caso de Utilização definido no documento de Especificações da API. |
| Compra Iniciada pelo Cliente via QR (Customer-Initiated Purchase via QR) | Um Caso de Utilização definido no documento de Especificações da API. |
| DFSP (Digital Financial Services Provider) | Um prestador de serviços financeiros licenciado por uma autoridade reguladora para disponibilizar Contas de Transação que detêm fundos de clientes e são utilizadas para efetuar e receber Pagamentos. Os DFSP têm relações com consumidores, comerciantes e outras empresas, e prestam serviços financeiros digitais aos Utilizadores Finais. Utilizado indistintamente com FSP (Financial Services Provider). |
| Digital (Digital) | Comunicações eletrónicas entre duas pessoas ou entidades que podem ocorrer em vários dispositivos eletrónicos (por exemplo, telemóvel, tablet, computador). |
| Liquidez Digital (Digital Liquidity) | A prática de manter o valor em forma Digital, em vez de trocar o valor Digital por numerário (forma física). |
| Pagamento Digital (Digital Payment) | Termo amplo que inclui qualquer pagamento executado por via eletrónica. Inclui os pagamentos iniciados por telemóvel ou computador. Os pagamentos com cartão são, em certas circunstâncias, considerados pagamentos digitais. O termo «pagamento móvel» é igualmente amplo e inclui uma grande variedade de tipos de transação que, de algum modo, utilizam um telemóvel. |
| Débito Direto (Direct Debit) | Um Pagamento ou uma Transferência de fundos iniciada pelo DFSP Beneficiário para o DFSP Pagador. Um Débito Direto é muitas vezes designado por «transferência pull a débito», porque os fundos são «puxados» da Conta de Transação do Pagador. O Débito Direto contrasta com a Transferência a Crédito. |
| Diretório (Directory) | Um repositório centralizado ou descentralizado de identificadores de pagamento para utilização no Endereçamento, acessível ao sistema de pagamentos ou aos DFSP. |
| Resolução de Litígios (Dispute Resolution) | Um processo definido por um prestador ou pelas regras de um scheme de pagamentos para resolver questões entre utilizadores finais e prestadores, ou entre um utilizador final e a sua contraparte. |
| Doméstico (Domestic) | Descreve uma Transação entre dois DFSP domiciliados no mesmo país. |
| eMoney | Fundos ou valor digitais detidos por um titular de Conta de Transação num dispositivo de pagamento, como um chip, um cartão pré-pago, um telemóvel, ou num sistema informático. A regulamentação nacional especifica que tipos de DFSP podem emitir eMoney. |
| Emissor de eMoney (eMoney Issuer) | Um DFSP licenciado no país para atuar como Emissor de eMoney. |
| Utilizador Final (End User) | O cliente de um DFSP. O cliente pode ser um consumidor, um comerciante, um governo ou outra forma de empresa. |
| Comissões ao Utilizador Final (End-User Fees) | Comissões cobradas por um DFSP ao seu cliente utilizador final. |
| Empresa (Enterprise) | Qualquer pessoa não singular que seja cliente de um DFSP: inclui Comerciantes, Emissores de Faturas, Organismos Públicos e outras empresas. |
| Conta Caução ou Fiduciária (Escrow or Trust Account) | Uma conta detida por um DFSP Não Bancário num banco; normalmente uma exigência regulamentar para proteger os depósitos dos consumidores no DFSP. |
| Exceções (Exceptions) | Transações erróneas ou fraudulentas. |
| FATF | O Financial Action Task Force é uma organização intergovernamental de combate ao branqueamento de capitais e de atuação sobre o financiamento do terrorismo. |
| Telemóvel Simples (Feature Phone) | Um telemóvel sem capacidades computacionais significativas. |
| Comissões (Fees) | Os montantes cobrados por um prestador ao seu utilizador final. Podem consistir numa comissão fixa, numa comissão percentual sobre o valor ou numa combinação de ambas. |
| Moedas Fiduciárias (Fiat Currencies) | Moeda oficial emitida pelo banco central de um país ou região com curso legal. |
| Inclusão Financeira (Financial Inclusion) | A prestação sustentável de serviços financeiros Digitais acessíveis que trazem os Utilizadores Finais de Baixos Rendimentos para a economia formal. |
| Inclusão Financeira (Financial Inclusion) | A prestação sustentável de serviços financeiros digitais acessíveis que trazem os mais pobres para a economia formal. |
| Literacia Financeira (Financial Literacy) | Consumidores e empresas dotados de competências financeiras essenciais, tais como preparar um orçamento familiar ou compreender conceitos como o valor temporal do dinheiro, a utilização de um produto ou serviço de DFS, ou a capacidade de se candidatar a esse serviço. |
| Fintech | Termo utilizado para descrever a interseção entre finanças e tecnologia. As «fintechs» são entidades que oferecem soluções inovadoras no espaço financeiro, tirando partido da tecnologia. |
| Float | Este termo pode significar coisas diferentes. Na banca, o float surge quando a conta de uma das partes é debitada ou creditada num momento diferente do da contraparte da transação. O eMoney, enquanto obrigação de um prestador não bancário, é por vezes designado por float. |
| Fraude (Fraud) | Utilização criminosa de serviços financeiros digitais para retirar fundos a outra pessoa ou empresa, ou para a lesar de qualquer outra forma. |
| Gestão do Risco de Fraude (Fraud Risk Management) | Ferramentas para gerir os riscos dos prestadores e, por vezes, os riscos dos utilizadores (por exemplo, de comerciantes ou governos) na prestação e/ou utilização de serviços de DFS. |
| FSP | A entidade que presta um serviço financeiro digital a um utilizador final (seja um consumidor, uma empresa ou um governo). Utilizado indistintamente com DFSP (Digital Financial Services Provider). |
| Transferência Cumprida (Fulfilled Transfer) | Uma transferência que foi aceite pelo DFSP Beneficiário e registada como concluída pelo Scheme. Uma vez registada como concluída pelo Scheme, o Pagador fica obrigado a honrar a transação quando esta surgir numa Liquidação. |
| Cumprimento (Fulfillment) | No protocolo Interledger, um segredo que é a pré-imagem de um hash SHA-256, utilizado como condição de uma transferência. A pré-imagem é exigida na mensagem de confirmação para desencadear a confirmação da transferência. |
| FX | Foreign Exchange (câmbio). |
| G2P | Um Caso de Utilização Secundário de Pagamento em Massa. |
| Governação (Governance) | O conjunto de abordagens de gestão, decisões e funções de supervisão dentro do Scheme. A Governação do Scheme pode determinar o tom de tudo o que nele ocorre. |
| Organismo Público (Government Agency) | Qualquer Titular de Conta de Transação que seja algum tipo de organismo ou departamento público. |
| Serviços de Aceitação de Pagamentos ao Estado (Government Payments Acceptance Services) | Serviços que permitem aos governos cobrar impostos e taxas a particulares e a empresas. |
| Liquidação Bruta (Gross Settlement) | Um método de liquidar obrigações financeiras entre DFSP e um Scheme. A Liquidação Bruta processa cada Transação individualmente. Os detalhes do modelo de Liquidação Bruta são especificados nas regras do Scheme. A Liquidação Bruta contrasta com a Liquidação Líquida. |
| Hub | Termo que pode ser utilizado para designar a entidade que opera a Plataforma em nome do Scheme. |
| Serviço de Identificadores (Identifier Service) | A forma como o Processo de Consulta de Contas funciona para um dado tipo de Identificador. |
| Identidade (Identity) | Uma credencial de algum tipo que identifica um utilizador final. As identidades nacionais são emitidas pelos governos nacionais. Nalguns países, é emitida uma identidade financeira pelos prestadores de serviços financeiros. |
| Transferência Imediata de Fundos (Immediate Funds Transfer) | Um pagamento digital que é recebido pelo beneficiário quase de imediato após o pagador ter iniciado a transação. |
| Intercâmbio (Interchange) | Uma estrutura existente nalguns schemes de pagamentos que obriga um prestador a pagar a outro prestador uma comissão sobre determinadas transações. Habitualmente utilizada nos schemes de cartões para concretizar o pagamento de uma comissão de um comerciante ao banco emissor do cartão do consumidor. |
| Interledger | O protocolo Interledger é um protocolo para transferir valor monetário através de múltiplas redes de pagamento desligadas entre si, utilizando uma coreografia de transferências condicionais em cada rede. |
| Remessa Internacional (International Remittance) | Efetuar e receber pagamentos de e para outra pessoa noutro país. |
| Interoperabilidade (Interoperability) | A capacidade de um Cliente com Conta de Transação num Participante trocar uma transação com um Cliente que tem Conta de Transação num Participante diferente. |
| Interoperability Service for Transfers (IST) | Um switch. |
| Irrevogável (Irrevocable) | Uma transação que não pode ser «chamada de volta» pelo pagador; um pagamento irrevogável, uma vez recebido por um beneficiário, não pode ser retirado pelo pagador. |
| Conheça o Seu Cliente (KYC) | Requisitos regulamentares que obrigam um DFSP a apurar a Identidade e a atividade de um Utilizador Final ou entidade, tanto antes da abertura de uma Conta de Transação como ao longo do tempo. |
| Razão Geral (Ledger) | Um registo mantido das transações. |
| Level One Project | Uma iniciativa da Bill & Melinda Gates Foundation para promover a inclusão financeira. |
| Responsabilidade (Liability) | Uma obrigação legal de uma parte perante outra; exigida pela lei nacional, pelas regras do scheme de pagamentos ou por acordos específicos entre prestadores. Algumas regras de scheme transferem responsabilidades por uma transação de um prestador para outro em determinadas condições. |
| Licença (License) | A licença concedida a um Candidato pelo Scheme mediante a aceitação do Acordo de Participação no Scheme, que permite ao Participante participar no Scheme e utilizar Propriedade do Scheme em conformidade com as Regras. |
| Liquidez (Liquidity) | A disponibilidade de ativos líquidos para suportar uma obrigação. Os bancos e os prestadores não bancários necessitam de liquidez para cumprir as suas obrigações. Os agentes necessitam de liquidez para satisfazer os levantamentos de consumidores e de pequenos comerciantes. |
| Empréstimos (Loans) | Meios pelos quais os utilizadores finais podem contrair dinheiro emprestado. |
| Comerciante (Merchant) | Uma empresa que vende bens ou serviços e recebe pagamentos por esses bens ou serviços. |
| Angariação de Comerciantes (Merchant Acquisition) | O processo de habilitar um comerciante a receber pagamentos eletrónicos. |
| Códigos de Categoria de Comerciante (Merchant Category Codes) | Uma categorização definida por um Scheme para distinguir entre clientes empresariais. |
| ID de Comerciante (Merchant ID) | Um tipo de Identificador de Beneficiário. |
| Prestador de Serviços a Comerciantes (Merchant Service Provider) | Um prestador (bancário ou não bancário) que apoia os requisitos dos comerciantes ou de outros aceitantes de pagamentos para receber pagamentos de clientes. O termo «acquirer» é utilizado especificamente em relação à aceitação de transações de pagamento com cartão. |
| Compra Iniciada pelo Comerciante (Merchant-Initiated Purchase) | Um Caso de Utilização definido no documento de Especificações da API. |
| Compra Iniciada pelo Comerciante via POS/OTP (Merchant-Initiated Purchase via POS/OTP) | Um Caso de Utilização definido no documento de Especificações da API. |
| Compra Iniciada pelo Comerciante via QR (Merchant-Initiated Purchase via QR) | Um Caso de Utilização definido no documento de Especificações da API. |
| Instituição de Microfinanças (IMF) | Uma entidade que oferece serviços financeiros a populações de Baixos Rendimentos. Quase todas as IMF concedem empréstimos aos seus membros e muitas oferecem seguros, depósitos e outros serviços. As IMF são consideradas DFSP num Sistema Level One se disponibilizarem Contas de Transação aos seus clientes. As IMF que não são DFSP podem ligar-se diretamente a uma Plataforma Level One, através de uma relação com um DFSP. As regras do scheme especificarão como essas IMF podem interagir com a Plataforma. |
| Operador de Rede Móvel (MNO) | Uma empresa que vende serviços de telefonia móvel, incluindo comunicações de voz e de dados. |
| Operador de Transferência de Fundos (Money Transfer Operator) | Um prestador especializado de DFS que trata de remessas domésticas e/ou internacionais. |
| MSISDN | Número que identifica de forma única uma subscrição numa rede de telefonia móvel. Estes números seguem a norma E.164, que define o plano de numeração de uma rede telefónica pública comutada (PSTN) à escala mundial. |
| Liquidação Líquida Multilateral (Multilateral Net Settlement) | Um tipo de liquidação que gere as posições de um grupo de participantes num scheme. |
| Documento de Identificação Nacional (National Identity Document) | Uma credencial que identifica um Utilizador Final. Os Documentos de Identificação Nacional são emitidos pelos governos nacionais. |
| Comunicação de Campo Próximo (Near Field Communication) | Uma tecnologia de comunicação utilizada nos pagamentos para transmitir dados de pagamento de um telemóvel equipado com NFC para um terminal compatível. |
| Net Debit Cap | Um valor que a Plataforma utiliza para determinar se um DFSP Pagador pode enviar um Pedido de Transferência, tal como definido nas Regras de Operação do Scheme. |
| Margem do Net Debit Cap (Net Debit Cap Margin) | Um valor definido por um scheme que aumenta ou diminui o Net Debit Cap de um participante. |
| Posição Líquida (Net Position) | Um valor na razão geral de um participante do scheme, que reflete o líquido das obrigações devidas. |
| Liquidação Líquida (Net Settlement) | Um tipo de liquidação que apura o líquido da posição de um participante num scheme, refletindo tanto as obrigações devidas a outros participantes ou ao scheme como as devidas por estes. |
| Não Bancário (Non-Bank) | Uma entidade que não é um banco autorizado, mas que presta serviços financeiros a utilizadores finais. Os requisitos para que as entidades não bancárias o façam, e as limitações do que podem fazer, são especificados pela lei nacional. |
| Modelo Não Liderado por Bancos (Non-Bank-Led Model) | Uma referência a um sistema em que as entidades não bancárias são os prestadores de serviços financeiros digitais aos utilizadores finais. As entidades não bancárias necessitam habitualmente de cumprir critérios estabelecidos pela lei nacional e aplicados pelos reguladores. |
| Não Repúdio (Non-repudiation) | Capacidade de provar a autenticidade de uma transação, por exemplo, validando uma assinatura digital. |
| Sem Fins Lucrativos (Not-for-Loss) | Um modelo de recuperação de custos com um conjunto adicional de fundos disponíveis para cobrir as necessidades de investimento na operação da Plataforma. |
| Notificação (Notification) | Aviso a um pagador ou beneficiário sobre o estado de uma transferência. |
| Pagamentos Off-Us (Off-Us Payments) | Pagamentos efetuados num sistema ou scheme com vários participantes, em que o prestador do pagador é uma entidade diferente do prestador do beneficiário. |
| Pagamentos On-Us (On-Us Payments) | Pagamentos efetuados num sistema ou scheme com vários participantes, em que o prestador do pagador é a mesma entidade que o prestador do beneficiário. |
| Compra Online (Online Purchase) | Um Caso de Utilização Secundário de P2B. |
| Open API Specification | A especificação Open API for FSP Interoperability. |
| Circuito Aberto (Open-Loop) | Um sistema ou scheme de pagamentos concebido para a participação de vários prestadores. As regras do sistema de pagamentos ou a lei nacional podem restringir a participação a certas classes de prestadores. |
| Regras de Operação (Operating Rules) | Regras redigidas por um scheme que vinculam os participantes do scheme. Por vezes designadas por «Regras de Negócio». |
| Gestão do Risco Operacional (Operations Risk Management) | Ferramentas para gerir os riscos dos prestadores na operação de um sistema de DFS. |
| Operador (Operator) | Uma entidade que fornece e/ou gere a Plataforma de um sistema de pagamentos. |
| Organização (Organization) | Uma entidade, como uma empresa, uma instituição de solidariedade ou um departamento público, que utiliza o dinheiro móvel como serviço; por exemplo, para receber pagamentos de faturas, efetuar pagamentos de faturas e desembolsar salários. |
| OTP | One-time Passcode (código de utilização única). O OTP é uma credencial que, por definição, só pode ser utilizada uma vez. É gerada e depois validada pelo mesmo FSP para aprovação automática. O OTP está habitualmente associado a um Pagador específico num Pagamento. O OTP gerado é geralmente um número entre 4 e 6 dígitos. |
| Serviços ao Balcão (Over The Counter Services) | Serviços prestados por agentes quando uma das partes não tem conta de eMoney: o pagador (remoto) pode pagar o eMoney à conta do agente, que depois paga numerário ao beneficiário sem conta. |
| P2P | Um Caso de Utilização definido no documento de Especificações da API. |
| Participante (Participant) | Um prestador que é membro de um scheme de pagamentos e está sujeito às regras desse scheme. |
| Margem Discricionária do Participante no Net Debit Cap (Participant Discretionary Net Debit Cap Margin) | Um valor definido por um participante que reduz o seu Net Debit Cap. |
| Acordo de Participação (Participation Agreement) | Um acordo celebrado entre cada Participante e um Scheme. |
| Comissões de Participação (Participation Fees) | Comissões pela participação num scheme de pagamentos (por vezes designadas por quotas de adesão). |
| Consulta de Partes (Parties Query) | Uma chamada de API ao Serviço de Diretório do Scheme pela qual um DFSP Pagador solicita o identificador do DFSP em que está registado um identificador de beneficiário. |
| Resposta a Consulta de Partes (Parties Query Response) | A resposta do Serviço de Diretório do Scheme a uma Consulta de Partes. |
| Banco Parceiro (Partner Bank) | Instituição financeira que apoia o FSP e lhe dá acesso ao ecossistema bancário local. |
| Parte (Party) | Uma entidade que utiliza Serviços do Scheme direta ou indiretamente. |
| Identificador de Parte (Party Identifier) | Um elemento de informação que identifica de forma única um Cliente numa implementação de Interoperabilidade. |
| Tipo de Identificador de Parte (Party Identifier Type) | Uma enumeração que distingue diferentes tipos de Identificador de Parte. A gama completa de Tipos de Identificador de Parte consta da Open API Specification; o subconjunto de Tipos de Identificador de Parte suportado por um dado Scheme consta das suas Regras de Operação. |
| Beneficiário (Payee) | Quem recebe fundos eletrónicos numa transação de pagamento. |
| DFSP Beneficiário (Payee DFSP) | O papel de um Participante que recebe uma Transferência em nome do seu cliente Beneficiário. |
| Pagador (Payer) | Quem paga fundos eletrónicos numa transação de pagamento. |
| DFSP Pagador (Payer DFSP) | O Participante que envia uma Transferência. |
| Pagamento (Payment) | Uma troca de fundos, credenciais e outra informação necessária para cumprir uma obrigação entre Utilizadores Finais. Uma Transferência é um Pagamento. |
| Dispositivo de Pagamento (Payment Device) | Dispositivo de pagamento é a noção abstrata de um dispositivo eletrónico, distinto do dispositivo do próprio Pagador, capaz de permitir que um Pagador aceite uma transação através da utilização de uma credencial (algum tipo de OTP). São exemplos de Dispositivos (de Pagamento) as caixas automáticas e os POS. |
| Sistema de Pagamentos (Payment System) | Termo amplo que descreve o sistema global, incluindo o Scheme, os Serviços do Scheme e os Participantes do Scheme. |
| Operador do Sistema de Pagamentos (Payment System Operator) | A entidade que opera um sistema ou scheme de pagamentos. |
| Prestador de Serviços de Pagamento (PSP) | Termo utilizado de duas formas: em geral, qualquer empresa envolvida na prestação de serviços de pagamento (incluindo os DFSP); ou um prestador que oferece produtos ou serviços de marca a Utilizadores Finais, incluindo comerciantes. Os PSP podem ligar-se diretamente a uma Plataforma Level One, através de uma relação com um DFSP. As regras do scheme especificarão como os PSP podem interagir com a Plataforma. |
| Informação Pessoal (Personal Information) | Informação relativa a qualquer pessoa singular, incluindo Clientes ou colaboradores do Scheme ou de um Participante, a partir da qual essa pessoa possa ser identificada ou reconhecida, independentemente da forma dessa informação. |
| Plataforma (Platform) | O conjunto de capacidades operacionais, incluindo muitas vezes um Switch, que concretizam a troca de Pagamentos num sistema de pagamentos interoperável alinhado com os Level One. |
| Plataforma (Platform) | Termo utilizado para descrever o software ou serviço utilizado por um prestador, um scheme ou um switch para gerir as contas dos utilizadores finais e para enviar e receber transações de pagamento. |
| Conta de Liquidação Comum (Pooled Settlement Account) | Uma conta bancária no Banco, detida conjuntamente pelos participantes do scheme. |
| Razão Geral de Posição (Position Ledger) | Uma razão geral mantida pela plataforma, que regista os Lançamentos Provisórios de Liquidação e os Lançamentos Finais de Liquidação de um Participante numa dada Moeda. |
| Lançamento (Posting) | O ato de o prestador introduzir um lançamento a débito ou a crédito no registo da conta do utilizador final. |
| Comissões de Processamento (Processing Fees) | Comissões faturadas pelo Scheme aos Participantes pelo Processamento realizado pela Plataforma do Scheme. |
| Processador (Processor) | Uma empresa que gere, em regime de externalização, várias funções de um DFSP. Estas funções podem incluir a gestão de transações, a gestão da base de dados de clientes e a gestão do risco. Os processadores podem também desempenhar funções em nome de sistemas de pagamentos, Schemes ou Switches. Os processadores podem ligar-se diretamente a uma Plataforma Level One, atuando em nome de um DFSP. As regras do scheme especificarão como os Processadores podem interagir com a Plataforma. |
| Débito Provisório (Provisional Debit) | Um registo, na Razão Geral de Posição de um scheme, de um Pedido de Transferência que não foi cumprido; registado apenas na Razão Geral de Posição do DFSP Pagador |
| PSP | Payment Service Provider (prestador de serviços de pagamento). |
| Pagamento Pull (Pull Payment) | Um tipo de Transação originada pelo DFSP do Beneficiário. Os Débitos Diretos, os cheques e os pagamentos com cartão são todos Pagamentos Pull. Os Pagamentos Pull podem ser devolvidos ou falhar por insuficiência de fundos, exceto se for feita uma Autorização separada (por exemplo, cartões). |
| Pagamento Push (Push Payment) | Um tipo de Transação iniciada pelo DFSP Pagador. Por vezes designado por Transferência a Crédito. |
| Compra por Código QR (QR Code Purchase) | Um Caso de Utilização Secundário de P2B. |
| Código de Resposta Rápida (QR) | Um método de codificação e visualização de dados em forma legível por máquina. Existem vários modelos de QR. |
| Cotação (Quote) | Um processo pelo qual um DFSP Beneficiário reconhece a validade da conta do Beneficiário para aceitar uma transferência e fixa os termos (e eventualmente as comissões) relativos a essa transferência. |
| Pedido de Cotação (Quote Request) | Um pedido de um DFSP Pagador de dados relativos a uma Transferência proposta. |
| Resposta a Cotação (Quote Response) | A resposta de um DFSP Beneficiário a um Pedido de Cotação. |
| Liquidação Bruta em Tempo Real (RTGS) | Um modelo de liquidação que liquida as transferências numa base individual, e não líquida. |
| Pagamentos de Retalho em Tempo Real (RTRP) | Pagamentos de Retalho processados em tempo real (à medida que são iniciados). |
| Montante a Receber (Receive Amount) | O montante creditado na Conta de Transação de um Beneficiário. |
| Reconciliação (Reconciliation) | A Reconciliação entre FSP é o processo de assegurar que dois conjuntos de registos, habitualmente os saldos de duas contas, estão em concordância entre FSP. A Reconciliação é utilizada para assegurar que o dinheiro que sai de uma conta corresponde ao dinheiro efetivamente transferido. Isto é feito verificando se os saldos coincidem no fim de um determinado período contabilístico. |
| Recurso (Recourse) | Direitos conferidos a um utilizador final pela lei, por regras de operação privadas ou por acordos específicos entre prestadores, que permitem aos utilizadores finais praticar determinados atos (por vezes revogar uma transação) em certas circunstâncias. |
| Reembolso (Refund) | Uma transferência que reverte uma transação anterior. |
| Regulador (Regulator) | Uma organização governamental a quem a lei nacional confere poder para definir e fazer cumprir normas e práticas. Os Bancos Centrais, os Ministérios das Finanças e do Tesouro, os Reguladores das Telecomunicações e as Autoridades de Defesa do Consumidor são todos reguladores envolvidos nos serviços financeiros digitais. |
| Pedido de Cotação (Request for Quote) | Uma chamada de API que inicia uma Transação nos termos da qual o DFSP Pagador solicita ao DFSP Beneficiário informação sobre uma Transferência proposta. |
| Pedido de Transferência (Request for Transfer) | Uma mensagem que passa de um DFSP Pagador, através da Plataforma, para um DFSP Beneficiário, e que solicita que seja efetuada uma Transferência do Pagador para o Beneficiário. |
| Pedido de Pagamento (Request to Pay) | Uma mensagem pela qual um Beneficiário «solicita» um Pagamento a um Pagador. Num Sistema Level One, um Pedido de Pagamento é muitas vezes utilizado para descrever um comerciante que solicita um Pagamento Push a um Utilizador Final. |
| Reservar (Reserve) | Parte de uma operação de transferência em 2 fases em que os fundos a transferir são bloqueados (não podem ser utilizados para qualquer fim até serem objeto de rollback ou confirmados). Isto é habitualmente feito por um período predeterminado, cujo termo dá origem ao rollback da reserva. |
| Pagamento de Retalho (Retail Payment) | Um Pagamento ou Transferência entre Utilizadores Finais, habitualmente de baixo valor. O termo é muitas vezes utilizado para descrever Pagamentos P2P, B2P ou P2B. |
| Reversão (Reversal) | O processo de reverter uma transferência concluída. |
| Gestão do Risco (Risk Management) | As práticas que as empresas adotam para compreender, detetar, prevenir e gerir vários tipos de risco. A gestão do risco ocorre nos prestadores, nos sistemas e schemes de pagamentos, nos processadores e em muitos comerciantes ou aceitantes de pagamentos. |
| Abordagem Baseada no Risco (Risk-based Approach) | Uma abordagem regulamentar e/ou de gestão que cria níveis de obrigação diferentes em função do risco da transação ou do cliente subjacentes. |
| Rollback | Rollback significa que os fundos eletrónicos anteriormente reservados são repostos no estado original. A transação financeira é cancelada. Os fundos eletrónicos deixam de estar bloqueados para utilização. |
| Regras (Rules) | As práticas e normas necessárias ao funcionamento dos serviços de pagamento definidas pelo Scheme. As Regras são por vezes designadas por regras do scheme, regras de negócio ou regras de operação. |
| Modificação das Regras (Rules Modification) | Todas as alterações, aditamentos, supressões ou outras modificações às Regras de Operação do Scheme ou a quaisquer Documentos Associados. |
| Poupança e Investimento (Saving and Investing) | Reter fundos para necessidades futuras e rendimento financeiro. |
| Produtos de Poupança (Savings Products) | Uma conta num prestador bancário ou não bancário, que guarda fundos com o objetivo de ajudar os utilizadores finais a poupar dinheiro. |
| Scheme | Um conjunto de regras, práticas e normas necessárias ao funcionamento dos serviços de pagamento. |
| Caso de Utilização Secundário (Secondary Use Case) | Um subconjunto de um Caso de Utilização. Podem aplicar-se Regras de Negócio ou Diretrizes de Operação específicas aos Casos de Utilização Secundários. |
| Elemento Seguro (Secure Element) | Um chip seguro num telemóvel que pode ser utilizado para guardar dados de pagamento. |
| Código de Acesso de Segurança (Security Access Code) | Um número de identificação pessoal (PIN), palavra-passe/palavra-passe de utilização única (OTP), reconhecimento biométrico, código ou qualquer outro dispositivo que constitua um meio de acesso certificado à conta de um cliente para efeitos, entre outros, de iniciação de uma transferência eletrónica de fundos. |
| Incidente de Segurança (Security Incident) | (i) O acesso não autorizado a Informação Pessoal ou a Dados de Transação relativos a Clientes elegíveis para iniciar ou receber Transferências através do Scheme, ou a sua divulgação, que tenha ocorrido ou que se suspeite razoavelmente ter ocorrido; ou (ii) uma violação confirmada das redes ou sistemas de um Participante, ou das redes ou sistemas do seu fornecedor, que exponha Informação Pessoal ou Dados de Transação relativos ao Scheme, que tenha ocorrido ou que se espere razoavelmente ter ocorrido. |
| Montante a Enviar (Send Amount) | O montante que um Pagador autoriza que seja debitado da sua Conta de Transação. |
| Dados Sensíveis do Consumidor (Sensitive Consumer Data) | Entende-se por Dados Sensíveis do Consumidor toda e qualquer informação utilizada por um consumidor para autenticar a identidade e obter autorização para realizar serviços de banca móvel, incluindo, entre outros, o ID de Utilizador, a Palavra-passe, o PIN Móvel e o PIN de Transação. Inclui também dados relativos a convicções religiosas ou outras, orientação sexual, saúde, raça, etnia, opiniões políticas, filiação sindical e registo criminal. |
| Serviços (Services) | Elementos da plataforma do scheme que entregam capacidades de interoperabilidade aos participantes do scheme. |
| Liquidação (Settlement) | Um processo pelo qual os Participantes liquidam as suas obrigações entre si e perante o Scheme relativas à troca de Transações, tal como estabelecido nas Diretrizes de Operação da Liquidação. |
| Banco de Liquidação (Settlement Bank) | Um banco nomeado pelo Scheme para ser parceiro na gestão da Liquidação e no qual cada Participante deve ter uma conta bancária para efeitos de Liquidação. |
| Conta Bancária de Liquidação (Settlement Bank Account) | A conta bancária detida por um Participante no Banco de Liquidação, ou num Banco acordado com o Banco de Liquidação, utilizada para a Liquidação entre o Scheme e o Participante. |
| Instrução de Liquidação (Settlement Instruction) | Uma instrução dada a um sistema de liquidação por um participante desse sistema, ou por um operador de sistema de câmara de compensação de pagamentos em nome de um participante do sistema de liquidação do Banco Central, para efetuar a liquidação de uma ou mais obrigações de pagamento, ou para extinguir qualquer outra obrigação de um participante do sistema perante outro participante do sistema. |
| Obrigação de Liquidação (Settlement Obligation) | Uma dívida devida por um participante de um sistema de liquidação a outro em resultado de uma ou mais instruções de liquidação. |
| Janela de Liquidação (Settlement Window) | Um período de tempo entre duas Liquidações Líquidas sucessivas, conforme calendarizado nos termos das Diretrizes de Operação da Liquidação. |
| Serviço Partilhado (Shared Service) | Um conjunto comum de serviços que os DFSP participantes colaboram para desenvolver e/ou utilizar. |
| Telemóvel Inteligente (Smart Phone) | Um dispositivo que combina um telemóvel com um computador. |
| Bancos com Autorização Especial (Special Charter Banks) | Bancos de um país autorizados a exercer um conjunto limitado de funções, conforme determinado pela regulamentação. Os Bancos com Autorização Especial que só podem aceitar depósitos e tratar de Pagamentos são considerados DFSP num Sistema Level One. |
| Patrocínio (Sponsor) | Um acordo entre um emissor de moeda eletrónica e um banco, utilizado para o pagamento e a cobrança de comissões de intercâmbio pelos emissores de moeda eletrónica |
| Organismo de Normalização (Standards Body) | Uma organização que cria normas utilizadas pelos prestadores, pelos schemes de pagamentos e pelos sistemas de pagamentos. |
| Conta de Valor Armazenado (Stored Value Account) | Conta em que os fundos são mantidos num formato eletrónico seguro. Pode ser uma conta bancária ou uma conta de eMoney. |
| Comunicação de Transação Suspeita (Suspicious Transaction Report) | Se uma instituição financeira detetar algo suspeito numa transação ou atividade, pode apresentar uma comunicação à Unidade de Informação Financeira, que a analisará e cruzará com outra informação. A informação constante de uma STR varia consoante o ordenamento jurídico. |
| Switch | Uma entidade de processamento num sistema de pagamentos que encaminha uma Transação de um DFSP para outro DFSP. Um sistema pode operar o seu próprio Switch, ou esta função pode ser desempenhada por um ou mais terceiros. |
| Sistema (System) | Termo utilizado para descrever o Scheme, os serviços, a Plataforma e os Participantes alinhados com um Level One Project. |
| Risco Sistémico (Systemic Risk) | Nos sistemas de pagamentos, o risco de colapso de todo um sistema financeiro ou de todo um mercado, por oposição ao risco associado a um prestador ou utilizador final individual. |
| The Level One Project | Uma iniciativa da Bill & Melinda Gates Foundation, no âmbito do programa Financial Services for the Poor, que trabalha para apoiar países ou regiões na construção de sistemas de serviços financeiros digitais interoperáveis e de baixo custo, de modo a trazer pessoas e comerciantes de Baixos Rendimentos para a economia formal. |
| Acesso Escalonado (Tiered Access) | Uma disposição das regras do scheme que permite a um DFSP participar no sistema sob patrocínio de outro DFSP. |
| Compra por Número de Caixa (Till Number Purchase) | Um Caso de Utilização Secundário de P2B. |
| Transação (Transaction) | Um conjunto de chamadas de API relacionadas que são trocadas entre Participantes através do Scheme, incluindo uma Transferência. |
| Conta de Transação (Transaction Account) | Uma conta bancária ou carteira oferecida a um cliente por um DFSP. |
| Titular de Conta de Transação (Transaction Account Holder) | O cliente de um DFSP que detém a Conta de Transação disponibilizada por esse DFSP. |
| Tipo de Titular de Conta de Transação (Transaction Account Holder Type) | Uma designação utilizada para definir se o Titular de Conta de Transação é um Consumidor, uma Empresa, um Organismo Público ou uma Entidade Sem Fins Lucrativos. |
| Tipo de Conta de Transação (Transaction Account Type) | Uma designação utilizada para definir uma Conta de Transação como Conta Bancária ou como Carteira de eMoney. |
| Custo de Transação (Transaction Cost) | O custo, para um prestador de DFS, de prestar um serviço financeiro digital. Pode dizer respeito a um pacote de serviços (por exemplo, uma «carteira») ou a transações individuais. |
| Comissões de Transação (Transaction Fees) | Comissões pelo processamento de transações interoperáveis definidas por um scheme. |
| Transferência (Transfer) | Termo genérico para descrever qualquer transação financeira em que é transferido valor de uma conta para outra. |
| Montante da Transferência (Transfer Amount) | O montante que o DFSP Pagador Transfere para um DFSP Beneficiário através do Scheme. |
| Pedido de Transferência (Transfer Request) | Um pedido de um DFSP Pagador para efetuar uma Transferência. |
| Resposta a Transferência (Transfer Response) | A resposta de um DFSP Beneficiário a um Pedido de Transferência. |
| Conta Fiduciária (Trust Account) | Um meio de deter fundos em benefício de outra parte. Os Emissores de eMoney são habitualmente obrigados por lei a deter o valor das contas de eMoney dos utilizadores finais num banco, habitualmente numa Conta Fiduciária. Isto cumpre os objetivos de isolamento e de salvaguarda dos fundos. |
| Ubiquidade (Ubiquity) | Termo utilizado para descrever a capacidade de pagar a qualquer pessoa e de ser pago por qualquer pessoa. |
| Não Bancarizados (Unbanked) | As pessoas não bancarizadas não têm conta de transação. As pessoas sub-bancarizadas podem ter conta de transação, mas não a utilizam ativamente. «Subservidos» é um termo amplo que designa as pessoas visadas pelas iniciativas de inclusão financeira. É também por vezes utilizado para designar quem tem uma conta de transação mas não dispõe de serviços de DFS adicionais. |
| Perdas Não Cobertas (Uncovered Losses) | Obrigações de Liquidação que não são cumpridas pelo DFSP responsável e não são extintas com recurso a garantias ou outros mecanismos. |
| Caso de Utilização (Use Case) | Termo utilizado para descrever a finalidade do Pagamento. Podem aplicar-se Regras de Negócio ou Diretrizes de Operação específicas aos Casos de Utilização. |
| ID de Utilizador (User ID) | Um identificador único de um utilizador. Pode ser um MSISDN, uma conta bancária, alguma forma de ID fornecido pelo DFSP, um ID nacional, e assim por diante. Numa transação, o dinheiro é geralmente endereçado a um ID de utilizador e não diretamente a um ID de conta. |
| USSD | Uma tecnologia de comunicação utilizada para enviar texto entre um telemóvel e um programa aplicacional na rede. |
| Serviços de Valor Acrescentado (Value-Added Services) | Serviços ou produtos fornecidos aos Utilizadores Finais que estes pagarão para utilizar ou aceder, muitas vezes utilizados em articulação com as Adjacências. |
| Vale (Voucher) | Um instrumento com valor monetário habitualmente utilizado para transferir fundos para clientes (Beneficiários) que não têm conta no FSP do Pagador. Pode tratar-se de Beneficiários sem conta ou com conta noutro FSP. |
| Carteira (Wallet) | Uma Conta de Transação oferecida aos clientes pelos emissores de moeda eletrónica. |
| Carteira para Banco (Wallet to Bank) | Um Caso de Utilização Secundário de P2P. |
| Carteira para Carteira (Wallet to Wallet) | Um Caso de Utilização Secundário de P2P. |
| Lista Branca (Whitelist) | Uma lista ou registo de entidades (utilizadores registados) a quem está a ser concedido um determinado privilégio, serviço, mobilidade, acesso ou reconhecimento, em especial as que tinham sido inicialmente colocadas em lista negra. |
| Capacitação Económica das Mulheres (WEE): | Aumentar o acesso e os direitos das mulheres aos recursos económicos através de oportunidades de trabalho digno, propriedade e ativos, Inclusão Financeira e Plataformas. |
