# Modelo de Diretrizes de Operação da Plataforma

- Versão: 2.0
    - Autoria: Carol Coye Benson (Glenbrook), Michael Richards (ModusBox)
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

Um Scheme que implemente um sistema alinhado com os Level One, incluindo os que utilizam código de referência Mojaloop na plataforma, terá de redigir Regras de Negócio para o Scheme. Um modelo para essas Regras de Negócio faz parte deste projeto. As Regras de Negócio introduzem o conceito de Documentos Associados, que fazem parte das Regras de Negócio e têm a mesma força — os DFSP que subscrevem as Regras de Negócio ficam também vinculados a cumprir as disposições dos Documentos Associados.

As Diretrizes de Operação da Plataforma são um Documento Associado importante que descreve como a Plataforma do Scheme irá operar e especifica as obrigações e responsabilidades do Scheme, do Operador da Plataforma e dos DFSP.

Este documento é um modelo para essas Diretrizes de Operação da Plataforma. Muitas das suas disposições variarão, porém, consoante as escolhas feitas pelo Scheme: algumas dessas escolhas estão descritas no documento «Escolhas-Chave do Scheme», que faz parte deste projeto.

O modelo de Regras de Negócio que faz parte deste projeto pode ser utilizado independentemente da escolha de plataforma de um scheme. Estas Diretrizes de Operação da Plataforma são mais específicas da utilização do Mojaloop como plataforma.

## **Índice — Modelo de Diretrizes de Operação da Plataforma**

[1 - Sobre este documento](#_1-sobre-este-documento)

[1.1 - Serviços do Scheme](#_1-1-servicos-do-scheme)

[1.2 - Open API Specification](#_1-2-open-api-specification)

[1.3 - Casos de Utilização do Scheme](#_1-3-casos-de-utilizacao-do-scheme)

[1.4 - Identificadores suportados pelo Scheme](#_1-4-identificadores-suportados-pelo-scheme)

[2 - O Serviço de Consulta de Contas](#_2-o-servico-de-consulta-de-contas)

[2.1 - Descrição do Serviço de Consulta de Contas](#_2-1-descricao-do-servico-de-consulta-de-contas)

[2.2 - Pedido de Parte](#_2-2-pedido-de-parte)

[2.3 - Consulta de Partes](#_2-3-consulta-de-partes)

[2.4 - Resposta a Consulta de Partes](#_2-4-resposta-a-consulta-de-partes)

[3 - O Serviço de Cotação](#_3-o-servico-de-cotacao)

[3.1 - Descrição do Serviço de Cotação](#_3-1-descricao-do-servico-de-cotacao)

[3.2 - Pedido de Cotação](#_3-2-pedido-de-cotacao)

[3.3 - Resposta a Cotação](#_3-3-resposta-a-cotacao)

[4 - O Serviço de Transferências](#_4-o-servico-de-transferencias)

[4.1 - Descrição do Serviço de Transferências](#_4-1-descricao-do-servico-de-transferencias)

[4.2 - Pedido de Transferência](#_4-2-pedido-de-transferencia)

[4.3 - Pedido de Pagamento](#_4-3-pedido-de-pagamento)

[5 - O Serviço de Liquidação](#_5-o-servico-de-liquidacao)

[5.1 - Liquidação de transferências](#_5-1-liquidacao-de-transferencias)

[5.2 - Liquidação de comissões: Comissões de Processamento](#_5-2-liquidacao-de-comissoes-comissoes-de-processamento)

[5.3 - Liquidação de comissões: Comissões de Intercâmbio](#_5-3-liquidacao-de-comissoes-comissoes-de-intercambio)

[6 - O Serviço de Gestão do Scheme](#_6-o-servico-de-gestao-do-scheme)

[6.1 - Descrição do Serviço de Gestão do Scheme](#_6-1-descricao-do-servico-de-gestao-do-scheme)

[6.2 - O Processo de Registo](#_6-2-o-processo-de-registo)

[6.3 - Apoio ao cliente DFSP](#_6-3-apoio-ao-cliente-dfsp)

[6.4 - Gestão do sistema do Scheme](#_6-4-gestao-do-sistema-do-scheme)

[7 - O Serviço de Gestão da Fraude](#_7-o-servico-de-gestao-da-fraude)

[8 - Anexo: Casos de Utilização suportados pelo Scheme e parâmetros do sistema](#_8-anexo-casos-de-utilizacao-suportados-pelo-scheme-e-parametros-do-sistema)

[9 - Anexo: Códigos de Categoria de Comerciante](#_9-anexo-codigos-de-categoria-de-comerciante)

## 1. Sobre este documento

Estas Diretrizes de Operação da Plataforma especificam os requisitos operacionais e técnicos aplicáveis aos DFSP e ao Scheme. De tempos a tempos, o Scheme emitirá Boletins Operacionais adicionais, que descreverão funcionalidades operacionais adicionais do Scheme e especificarão requisitos adicionais dos DFSP.

### 1.1 Serviços do Scheme

- Os Serviços do Scheme são utilizados pelos DFSP para trocar transações interoperáveis e para gerir o seu envolvimento com o Scheme.

- O Serviço de Consulta de Contas do Scheme permite aos DFSP do sistema identificar o DFSP que gere a Conta de Transação de um Beneficiário pretendido ou de outra contraparte de uma Transferência.

- O Serviço de Transferências do Scheme permite a um DFSP Pagador enviar uma Transferência a um DFSP Beneficiário, concretizando assim uma transferência de fundos de um Pagador para um Beneficiário.

- O Serviço de Liquidação do Scheme permite aos DFSP liquidar as suas obrigações financeiras perante o Scheme no que respeita às Transferências.

- O Serviço de Gestão do Scheme permite ao Scheme conceder e revogar o acesso ao Scheme por parte dos DFSP, gere as interações correntes dos DFSP com o Scheme, monitoriza o funcionamento eficaz do Scheme e fornece ferramentas para os DFSP gerirem o seu envolvimento com o Scheme.

- O Serviço de Gestão da Fraude do Scheme permite aos DFSP colaborar em certos elementos da gestão da fraude, de modo a reduzir custos e melhorar resultados.

- Os DFSP são obrigados a seguir os procedimentos detalhados abaixo para utilizar o Scheme.

### 1.2 Open API Specification

Os protocolos do Scheme baseiam-se nos modelos operacionais e de dados definidos no documento de especificações «Open API for FSP Interoperability Specification», versão 1.0, com data de \[xx\]. Sempre que o Scheme se afaste desta especificação, esses afastamentos são aqui documentados e prevalecerão sobre as secções pertinentes daquele documento. O Scheme pode atualizar a versão utilizada mediante a emissão de um Boletim Operacional.

### 1.3 Casos de Utilização do Scheme

Algumas regras e especificações operacionais variam consoante os Casos de Utilização e os Casos de Utilização Secundários suportados pelo Scheme. O Scheme reconhece os Casos de Utilização e os Casos de Utilização Secundários através de uma combinação de componentes de dados exigidos e de inferência do sistema. Isto está detalhado num Anexo ao presente documento.

### 1.4 Identificadores suportados pelo Scheme

O Scheme suporta determinados Identificadores, ou endereços de pagamento, para utilização na realização de Transferências. O Identificador identifica o Beneficiário cuja Conta de Transação é creditada pela Transferência. Os Identificadores suportados pelo Scheme estão enumerados num Anexo às Regras de Negócio.

Para cada identificador suportado pelo scheme, este documento deve especificar o que é o identificador e como é resolvido (como se determina qual o DFSP Beneficiário responsável pela conta de transação associada a esse identificador.

#### 1.4.1 Exemplo: o Identificador MSISDN

Cada scheme terá as suas próprias diretrizes para cada identificador; as disposições abaixo podem variar significativamente consoante as escolhas feitas.

- Os MSISDN são números de telemóvel globalmente únicos. Os MSISDN são o Identificador de Conta de Transação dos DFSP que são Operadores de Rede Móvel e que disponibilizam Contas de Transação aos seus clientes.

- A utilização do MSISDN como Identificador de Beneficiário está limitada às Contas de Transação disponibilizadas por DFSP que sejam o Operador de Rede Móvel responsável por esse MSISDN.

::: tip NOTA
Se forem utilizados MSISDN para outras Contas de Transação, são alias, e tem de ser especificado um protocolo separado para a sua resolução.
:::

- Um Pedido de Parte relativo a um MSISDN é resolvido por um serviço de diretório de MSISDN determinado pelo Scheme. O Scheme pode especificar, de tempos a tempos, obrigações de manutenção do serviço de diretório para os DFSP que sejam Operadores de Rede Móvel.

#### 1.4.2 Exemplo: o Identificador de Número de Conta Bancária

Cada scheme terá as suas próprias diretrizes para cada identificador; as disposições abaixo podem variar significativamente consoante as escolhas feitas.

- Os números de Conta Bancária são atribuídos aos clientes pelos DFSP Bancários que disponibilizam Contas de Transação aos seus clientes.

- O Número de Conta Bancária, juntamente com um Código de Banco, formam o Identificador de Número de Conta Bancária do Scheme. Os DFSP Pagadores são responsáveis por formatar corretamente o Identificador de Número de Conta Bancária de acordo com os formatos que o Scheme especificar.

- A utilização do Identificador de Número de Conta Bancária está limitada às Contas de Transação disponibilizadas por DFSP que sejam Bancos.

- Um Pedido de Parte relativo a um Identificador de Conta Bancária é enviado pelo DFSP Pagador ao Scheme. O Scheme verifica se o Código de Banco constante do Identificador de Conta Bancária está associado a um Banco ativo no Scheme.

#### 1.4.3 Exemplo: o Identificador de Comerciante do Scheme

Cada scheme terá as suas próprias diretrizes para cada identificador; as disposições abaixo podem variar significativamente consoante as escolhas feitas.

- O ID de Comerciante é um identificador definido pelo Scheme utilizado para pagamentos de pessoa para empresa.

- A utilização do ID de Comerciante está limitada aos DFSP que disponibilizam Contas de Transação a comerciantes, emissores de faturas, organismos públicos ou outras entidades empresariais que recebem pagamentos dos seus clientes através do Scheme. Pode ser utilizado tanto em pagamentos presenciais como remotos. O termo «comerciante» utilizado nesta secção inclui todos estes tipos de recetores de pagamentos.

- A utilização do ID de Comerciante está limitada às Transferências dos Casos de Utilização P2B ou P2G

- Um comerciante pode solicitar vários IDs de comerciante ao seu DFSP; podem ser utilizados pelo comerciante em diferentes pontos de venda, caixas ou lojas. Não há limite ao número de IDs de comerciante que podem ser associados a uma única Conta de Transação. Um dado ID de comerciante só pode, no entanto, estar associado a uma única Conta de Transação.

- O ID de Comerciante é emitido pelo Scheme ao DFSP que disponibiliza ao comerciante a Conta de Transação na qual os pagamentos serão feitos.

- O ID de Comerciante é emitido como um número, que pode ser apresentado pelo comerciante de forma física ou digital.

- Os IDs de comerciante podem ser representados como códigos QR pelos DFSP ou pelos seus clientes comerciantes. Os códigos QR têm de ser representados de acordo com as diretrizes de formato e de marca emitidas pelo Scheme. Os DFSP estão proibidos de utilizar outros formatos de dados de código QR ou outras marcas para receber pagamentos através do Scheme.

- Os DFSP são obrigados a apresentar a identidade visual do Scheme. Os requisitos de marca do Scheme serão especificados pelo Scheme. A identidade visual do Scheme tem de estar visível para o cliente na loja do comerciante, ou no dispositivo que o cliente pagador está a utilizar para comprar remotamente.

- Requisitos de registo. Os DFSP solicitarão um ID de Comerciante para um cliente através de uma API do Scheme específica para o efeito. Os DFSP terão de fornecer:

    - O ID do DFSP

    - O número da Conta de Transação que receberá os fundos pagos ao comerciante. Pode ser um MSISDN ou um número de conta bancária.

    - O \[registo comercial ou número de identificação fiscal\] do comerciante. Pode estar associado ao mesmo registo comercial ou número de identificação fiscal qualquer número de IDs de comerciante.

    - O Nome do Comerciante

- Os DFSP que solicitam um ID de Comerciante ao Scheme garantem que concluíram a informação de KYC exigida para a conta do comerciante no momento do pedido.

- Os DFSP são obrigados a fornecer informação de formação adequada aos seus clientes.

- Desativação de IDs de Comerciante. Os DFSP podem solicitar a desativação de um ID de Comerciante. O Scheme desativará imediatamente esse ID de Comerciante, mas mantê-lo-á no sistema do Scheme para efeitos de reporte. Os Pedidos de Cotação ou Pedidos de Transferência dirigidos a este ID de Comerciante serão recusados pelo Scheme e devolvidos ao DFSP Pagador.

O Scheme pode querer prever algum mecanismo de portabilidade de um ID de Comerciante de um DFSP para outro.

#### 1.4.4 O Identificador ID do Scheme

Este ID seria semelhante ao ID de Comerciante acima, mas destinar-se-ia tanto a consumidores como a empresas, e poderia ser expresso em expressões em vez de um número. Note-se que cada scheme terá as suas próprias diretrizes para cada identificador; as disposições abaixo podem variar significativamente consoante as escolhas feitas.

- O ID do Scheme é um identificador definido pelo Scheme.

- Os DFSP são obrigados a oferecer aos seus clientes a opção de solicitarem um ID do Scheme.

- Os IDs do Scheme podem assumir qualquer forma, sujeitos apenas às restrições de comprimento que o Scheme especificar de tempos a tempos. O Scheme reserva-se o direito de recusar a utilização de qualquer ID do Scheme solicitado em concreto.

Os Schemes podem querer permitir IDs do Scheme

- Os clientes podem solicitar qualquer número de IDs do Scheme, sujeitos aos limites impostos pelo seu DFSP. Podem estar associados a uma única Conta de Transação vários IDs do Scheme. Cada ID do Scheme só pode, no entanto, estar associado a uma única Conta de Transação.

- Requisitos de registo. Os DFSP solicitarão um ID do Scheme para um cliente através de uma API do Scheme específica para o efeito. Os DFSP terão de fornecer nesta API:

    - O ID do DFSP

    - O ID do Scheme solicitado

    - O número da Conta de Transação que receberá os fundos pagos ao cliente. Pode ser um MSISDN ou um número de conta bancária.

    - Se o Titular da Conta de Transação for um comerciante ou uma empresa, o \[registo comercial ou número de identificação fiscal\] do Titular da Conta. Pode estar associado ao mesmo registo comercial ou número de identificação fiscal qualquer número de IDs do Scheme.

- Os DFSP que solicitam um ID do Scheme ao Scheme garantem que concluíram a informação de KYC exigida para a conta do cliente no momento do pedido.

- Desativação de Identificadores do Scheme. Os DFSP podem solicitar a desativação de um ID do Scheme. O Scheme desativará imediatamente esse ID do Scheme, mas mantê-lo-á no sistema do Scheme para efeitos de reporte. Os Pedidos de Cotação ou Pedidos de Transferência dirigidos a este ID do Scheme serão recusados pelo Scheme e devolvidos ao DFSP Pagador.

O Scheme pode querer prever algum mecanismo de portabilidade de um ID do Scheme de um DFSP para outro.

As secções seguintes descrevem cada serviço e as obrigações e responsabilidades das partes interessadas. Cada serviço é composto por processos: a maioria dos processos está associada a chamadas de API específicas indicadas na secção [Open API Specification](#_1-2-open-api-specification) do presente documento.

## 2. O Serviço de Consulta de Contas

### 2.1 Descrição do Serviço de Consulta de Contas

- O Serviço de Consulta de Contas permite aos DFSP mapear Identificadores específicos de clientes individuais para o DFSP que disponibiliza uma Conta de Transação a esse cliente. Os Identificadores servem para identificar particulares, comerciantes, emissores de faturas, organismos públicos ou outras empresas. Qualquer Tipo de Identificador suportado pelo Scheme tem um Serviço de Identificadores definido, cujos parâmetros constam da secção «Identificadores suportados pelo Scheme» do presente documento.

- Todos os Serviços de Identificadores asseguram que os Identificadores utilizados nas Transações do Scheme são únicos dentro do Scheme e estão associados a um único DFSP que disponibiliza a Conta de Transação pertinente para esse cliente. Qualquer Identificador tem de estar associado a uma única Conta de Transação.

- Os DFSP têm de concluir o processo de Consulta de Contas imediatamente antes de iniciar um processo de Cotação, salvo se estas Diretrizes permitirem outra coisa.

### 2.2 Pedido de Parte

- Um Pedido de Parte é enviado por um DFSP Pagador à Plataforma. O Pedido de Parte tem de conter os seguintes elementos de dados essenciais:

    - O Identificador do Beneficiário pretendido

    - O identificador do DFSP Pagador

O scheme pode definir elementos de dados essenciais adicionais que serão exigidos no Pedido de Partes.

- O pedido é encaminhado da Plataforma para o Serviço de Consulta de Contas correspondente a esse tipo de Identificador.

- O Serviço de Identificadores devolve ao Serviço de Consulta de Contas a identificação do DFSP associado a esse Identificador, se for encontrada uma referência. Caso não seja, é devolvida uma resposta negativa, que a Plataforma comunica ao DFSP Pagador. Se for encontrada uma referência, o Serviço de Consulta de Contas associa então o DFSP identificado ao ID de DFSP do Scheme correto.

### 2.3 Consulta de Partes

- Se o Pedido de Parte conseguir identificar um DFSP Beneficiário, a Plataforma executa então uma Consulta de Partes ao DFSP identificado, para determinar se este está disposto a aceitar um Pedido de Cotação dirigido a esse Identificador.

### 2.4 Resposta a Consulta de Partes

- O DFSP identificado responde com uma Resposta a Consulta de Partes positiva ou com uma resposta de erro. Se for positiva, a Resposta a Consulta de Partes tem de conter os seguintes elementos de dados essenciais:

    - O Nome completo do Beneficiário

    - O Identificador do DFSP Pagador

    - O Tipo de Conta de Transação, que especifica se a Conta é uma conta bancária ou uma carteira

    - O Tipo de Titular de Conta de Transação, que especifica se o Titular da Conta de Transação é um consumidor, um comerciante (incluindo outros tipos de empresa) ou um organismo público.

    - Se o Beneficiário for um Comerciante, o Código de Categoria de Comerciante. Estes códigos constam de um anexo ao presente documento.

O scheme pode definir elementos de dados adicionais exigidos na Resposta a Consulta de Partes.

-   A Plataforma responde ao DFSP Pagador com o resultado da Resposta a Consulta de Partes

## 3. O Serviço de Cotação

#### 3.1 Descrição do Serviço de Cotação

- O Processo de Cotação precede o Processo de Transferência e permite ao DFSP Pagador e ao DFSP Beneficiário trocarem determinada informação antes da Transferência.

- O Processo de Cotação tem de estar concluído antes de um DFSP Pagador iniciar o Processo de Transferência. Isto é válido para todos os Casos de Utilização e Casos de Utilização Secundários.

- As etapas do Processo de Cotação são apresentadas abaixo.

#### 3.2 Pedido de Cotação

- Um Pedido de Cotação é enviado por um DFSP Pagador ao DFSP Beneficiário; o Pedido de Cotação é registado pela Plataforma. O Pedido de Cotação tem de conter os seguintes elementos de dados essenciais:

    - O Montante da Transferência

    - O Tipo de Montante definido como Montante a Enviar.

    - O conjunto completo da Informação de Parte devolvida na Resposta ao Pedido de Partes.

    - O Nome Completo do Pagador (o Titular da Conta de Transação junto do DFSP Pagador)

    - Os dados de Tipo de Transação exigidos para o Caso de Utilização e o Caso de Utilização Secundário da Transação, conforme especificado no Anexo de Casos de Utilização ao presente documento.

    - Um prazo de expiração, cujos parâmetros admissíveis serão especificados pelo scheme de tempos a tempos.

O scheme pode definir elementos de dados essenciais adicionais que serão exigidos na Resposta a Consulta de Partes.

- Um Pedido de Cotação de montante superior ao Limite de Valor de Transação do Scheme será rejeitado pela Plataforma e devolvido ao DFSP Pagador.

### 3.3 Resposta a Cotação

- Uma Resposta a Cotação é enviada pelo DFSP Beneficiário ao DFSP Pagador; a Resposta a Cotação é registada pela Plataforma. O DFSP Beneficiário é obrigado a responder a um Pedido de Cotação.

- A Resposta a Cotação tem de conter os seguintes elementos de dados essenciais:

    - O Montante da Transferência

    - Um prazo de expiração, cujos parâmetros admissíveis serão especificados pelo Scheme de tempos a tempos.

    - O Objeto de Transação assinado, que contém os parâmetros da transferência. O Objeto de Transação é a descrição autoritativa da transação para efeitos de reporte do Scheme, gestão da fraude e resolução de litígios.

O scheme pode definir elementos de dados essenciais adicionais que serão exigidos na Resposta a Consulta de Partes.

- A Resposta a Cotação é assinada pelo DFSP Beneficiário e define os parâmetros da Transação; o DFSP Pagador não pode alterar estes parâmetros no Processo de Transferência.

## 4. O Serviço de Transferências

### 4.1 Descrição do Serviço de Transferências

- O Serviço de Transferências é o meio pelo qual se concretiza a transferência efetiva de fundos entre o DFSP Pagador e o DFSP Beneficiário. O Pedido de Transferência é o processo essencial dentro do serviço. Um Pedido de Transferência tem de ser precedido de um processo de Cotação.

### 4.2 Pedido de Transferência

- Um Pedido de Transferência é enviado por um DFSP Pagador ao DFSP Beneficiário através do Serviço de Transferências no Scheme. A Plataforma regista o Pedido de Transferência. O Pedido de Transferência tem de conter os seguintes elementos de dados essenciais:

    - Os Identificadores do DFSP Pagador e do DFSP Beneficiário

    - O Montante da Transação

    - Um pacote ILP que representa o Objeto de Transação

    - Um prazo de expiração, cujos parâmetros admissíveis serão especificados pelo Scheme de tempos a tempos.

O scheme pode definir elementos de dados essenciais adicionais que serão exigidos no Pedido de Transferência.

- O Pedido de Transferência é assinado pelo DFSP Pagador

- A Plataforma executa um processo de Aprovação da Transferência para determinar se a Transferência proposta pode ser liquidada. O processo de Aprovação da Transferência é definido mais adiante na secção do Serviço de Liquidação do presente documento.

- Se o Pedido de Transferência não passar o processo de Aprovação da Transferência, o Pedido de Transferência é devolvido ao DFSP Pagador.

- Se o Pedido de Transferência passar o processo de Aprovação da Transferência, a Plataforma reserva os fundos especificados no Pedido de Transferência na Razão Geral de Posição do DFSP Pagador. Isto é definido mais adiante na secção do Serviço de Liquidação do presente documento.

- O DFSP Beneficiário determina se aceita a Transferência.

- Se não for aceite, é devolvida uma resposta de erro à Plataforma. A Plataforma liberta a reserva de fundos na Razão Geral de Posição do DFSP Pagador e devolve uma condição de erro ao DFSP Pagador.

- Se for aceite, o DFSP Beneficiário devolve uma Resposta a Transferência assinada indicando que a Transferência foi Cumprida. A Plataforma substitui o débito provisório por um débito na Razão Geral de Posição do DFSP Pagador e credita a Razão Geral de Posição do DFSP Beneficiário com um crédito no montante da Transferência.

- A Plataforma envia então uma confirmação da Transferência cumprida ao DFSP Pagador e ao DFSP Beneficiário.

- Se a Plataforma não receber uma Resposta a Transferência assinada dentro do prazo de expiração indicado no Pedido de Transferência, a transferência será cancelada e o Scheme notificará disso os DFSP Beneficiário e Pagador.

- Os DFSP Pagador e Beneficiário são obrigados:

    - A notificar atempadamente os seus clientes do estado de uma transferência

    - A debitar e creditar imediatamente as Contas de Transação dos seus clientes após o cumprimento da Transferência

    - A libertar imediatamente quaisquer fundos reservados se uma Transferência tiver sido recusada ou cancelada

### 4.3 Pedido de Pagamento

_Esta secção ainda não foi redigida._

## 5. O Serviço de Liquidação

Este documento apresenta um modelo para os processos de liquidação, tanto das transferências como das comissões do scheme. Existem várias abordagens possíveis à liquidação, que são discutidas no documento «Escolhas-Chave» que faz parte deste projeto. O modelo abaixo abrange dois modelos: liquidação líquida e liquidação bruta contínua. O código de referência do Mojaloop suporta vários modelos de liquidação diferentes, incluindo estes.

### 5.1 Liquidação de transferências

#### 5.1.1 Descrição do Serviço de Liquidação de Transferências

- A Liquidação de Transferências é o meio pelo qual os DFSP liquidam entre si as suas obrigações financeiras. A Liquidação de Transferências comporta cinco processos: o Processo da Razão Geral, o Processo do Net Debit Cap, o Processo de Aprovação da Transferência, o Processo de Registo da Liquidação e
o Processo de Gestão da Conta de Liquidação.

- \[_Opção de liquidação líquida_\] Os DFSP são obrigados a abrir uma conta no Banco de Liquidação junto do Banco de Liquidação do Scheme. \[_Opção de liquidação bruta contínua_\] Os DFSP são obrigados a tornar-se comproprietários da conta bancária de Liquidação Comum do Scheme no Banco de Liquidação do Scheme e a utilizar ou abrir as demais contas bancárias individuais no Banco de Liquidação do Scheme que sejam necessárias para transferir fundos para dentro e para fora da conta bancária de Liquidação Comum do Scheme.

#### 5.1.2 A Razão Geral da Plataforma

- A Plataforma é responsável por manter uma Razão Geral de Posição de DFSP para cada DFSP. Esta operação decorre de forma contínua. \[_Opção de liquidação bruta contínua_\] A Razão Geral de Posição de cada DFSP, deduzidos quaisquer lançamentos provisórios, representa a quota de propriedade desse DFSP na Conta Bancária de Liquidação Comum do Scheme.

- A Razão Geral de Posição regista:

    - Todas as Transferências Cumpridas como débitos na razão geral do DFSP Pagador e créditos na razão geral do DFSP Beneficiário

    - Todos os Pedidos de Transferência como débitos provisórios na razão geral do DFSP Pagador. Estes débitos provisórios são removidos quando a Transferência é Cumprida, recusada pelo DFSP Beneficiário, ou expira.

    - \[_Apenas na opção de liquidação líquida_\] Os Lançamentos de Liquidação entregues ao Banco de Liquidação do Scheme e por este aceites para esse DFSP.

    - \[_Apenas na opção de liquidação bruta contínua_\] As transferências para dentro e para fora da Conta Bancária de Liquidação Comum do Scheme efetuadas pelos DFSP.

- A Posição da Razão Geral do DFSP é a soma de todos os itens acima enumerados. É utilizada no Processo de Aprovação da Transferência.

#### 5.1.3 Processo do Net Debit Cap

- O Net Debit Cap de um DFSP é um valor que a Plataforma utiliza durante o Processo de Aprovação da Transferência. O Net Debit de um DFSP é a soma de:

    - \[_Apenas na Opção de Liquidação Líquida_\] Um valor definido pelo scheme, destinado a representar os fundos que o DFSP tem disponíveis na sua Conta Bancária de Liquidação

Note-se que o scheme pode conseguir automatizar o cálculo do valor acima descrito, ou pode optar por o introduzir manualmente na secção do Operador da Plataforma do Portal do Scheme.

- A Margem do Scheme para esse DFSP. Trata-se de um valor, determinado pelo Scheme, específico de um dado DFSP. Este valor pode ser uma percentagem da Posição da Razão Geral do DFSP ou um valor absoluto. O Scheme pode alterar a Margem do Scheme de qualquer DFSP ao seu critério. Pode ter o efeito de aumentar ou diminuir a capacidade de um DFSP para executar transações.

- A Margem Discricionária do DFSP. Trata-se de um valor, determinado por cada DFSP, que reduz o valor absoluto do Net Debit Cap. A Margem Discricionária do DFSP é definida dentro dos parâmetros admissíveis definidos pelo Scheme. Tem o efeito de diminuir a capacidade do DFSP para executar transações.

#### 5.1.4 Processo de Aprovação da Transferência

- Aprovação da Transferência. Quando a Plataforma recebe um Pedido de Transferência de um DFSP Pagador, a Plataforma aprovará ou rejeitará o pedido com base na comparação entre o montante da transferência pedida e a Posição Atual da Razão Geral do DFSP Pagador, deduzido o Net Debit Cap do DFSP Pagador.

- Se a transferência pedida for inferior a esta soma, a Plataforma encaminhará o pedido para o DFSP Beneficiário. Se for superior ao valor do Net Debit Cap, a Plataforma rejeitará o pedido e devolvê-lo-á ao DFSP Pagador.

#### 5.1.5 Processo de Registo da Liquidação

- \[_Apenas na opção de liquidação líquida_\] O scheme definirá os parâmetros das Janelas de Liquidação utilizadas pelo scheme; incluirá a frequência das janelas ou outros parâmetros (limites de valor, etc.) escolhidos para definir as janelas de liquidação.

- \[_Apenas na opção de liquidação líquida_\] No fim de cada janela de liquidação definida, a Plataforma calculará a posição líquida de liquidação de cada DFSP: essa posição é o saldo da Razão Geral de Posição do DFSP. Estes saldos passam a ser os Lançamentos de Liquidação dessa janela.

- \[_Apenas na opção de liquidação líquida_\] A Plataforma enviará os Lançamentos de Liquidação de cada DFSP ao Banco de Liquidação escolhido pelo scheme

- \[_Apenas na opção de liquidação líquida_\] O Banco de Liquidação registará os Lançamentos de Liquidação na Conta Bancária de Liquidação de cada DFSP e enviará à Plataforma a confirmação da conclusão deste processo.

As regras do scheme terão de prever disposições e procedimentos para o caso de falha do processo acima descrito.

#### 5.1.6 Processo de Gestão da Conta de Liquidação

- \[_Opção de liquidação líquida_\] Os DFSP podem acrescentar fundos à sua Conta Bancária de Liquidação do Scheme ao seu critério. O Scheme fornecerá instruções sobre como o fazer. \[_Opção de liquidação bruta contínua_\] Os DFSP podem transferir fundos para a Conta Bancária de Liquidação Comum do Scheme ao seu critério. O Scheme fornecerá instruções sobre como o fazer.

- \[_Apenas na opção de liquidação bruta contínua_\] O Scheme fornecerá aos DFSP um relatório de fim de dia que apresenta a sua quota de propriedade na Conta Bancária de Liquidação Comum do Scheme.

- Os DFSP podem solicitar o levantamento de fundos da sua \[_Opção de liquidação líquida_\] Conta Bancária de Liquidação através do Portal do Scheme \[_Opção de liquidação bruta contínua_\] Os DFSP podem solicitar o levantamento de fundos da Conta Bancária de Liquidação Comum do Scheme através do Portal do Scheme. O scheme analisará o levantamento pedido e, se for aprovado, executará a transferência em nome do DFSP. A finalidade desta análise é assegurar que a quota do DFSP na Conta Bancária de Liquidação é suficiente para suportar as Transferências em curso: esta aprovação não será recusada sem motivo razoável.

#### 5.1.7 Reporte de liquidação do Scheme

- O scheme fornecerá, através do Portal DFSP do Scheme, informação para os DFSP que inclui, para cada DFSP:

    - O Net Debit Cap atual e as suas componentes

    - A Posição atual da Razão Geral e as suas componentes, incluindo as Transferências Cumpridas de todos os DFSP e as Transferências Provisórias dos DFSP Pagadores

    - Alertas a determinados níveis da Posição Atual da Razão Geral: estes níveis a determinar pelos DFSP e/ou pelo Scheme de tempos a tempos

- Ferramentas que permitam aos DFSP prever o seu volume de transferências previsto com base em dados históricos

### 5.2 Liquidação de comissões: Comissões de Processamento

Esta secção ainda não foi redigida.

### 5.3 Liquidação de comissões: Comissões de Intercâmbio

Esta secção ainda não foi redigida.

## 6. O Serviço de Gestão do Scheme

::: tip NOTA
Existe um Serviço do Operador da Plataforma paralelo, necessário ao funcionamento da plataforma, que não é descrito neste documento.
:::

### 6.1 Descrição do Serviço de Gestão do Scheme

- O Serviço de Gestão do Scheme é prestado pelo Scheme para apoiar os DFSP na utilização dos Serviços do Scheme. Muitas destas funções são disponibilizadas através do Portal do Scheme, que é disponibilizado aos DFSP do Scheme.

- Os processos seguintes fazem parte do Serviço de Gestão do Scheme:

### 6.2 O Processo de Registo

- O Processo de Registo permite a candidatura dos DFSP à participação e o onboarding operacional e técnico. Abrange as seguintes áreas:

    - Formulários e processos de candidatura dos DFSP à Participação no Scheme.

    - Formulários e processos para obtenção de certificados digitais e assinaturas digitais para utilização com a Plataforma.

    - Processos para transferência de artefactos de software fornecidos pelo Scheme, incluindo SDK e API.

    - Processos para testar a prontidão técnica para aceder à Plataforma e aos Serviços.

    - Processos para obter a aprovação e a certificação do Scheme para aceder à Plataforma e aos Serviços.

### 6.3 Apoio ao cliente DFSP

- O scheme disponibilizará um serviço de apoio (help desk) aos DFSP, tanto em linha como por telefone.

- O Portal do Scheme disponibilizará meios pelos quais os DFSP podem designar administradores e utilizadores do Portal e atualizar a informação do Perfil do DFSP.

### 6.4 Gestão do sistema do Scheme

- O scheme disponibilizará, através do Portal do Scheme, meios pelos quais os DFSP podem consultar a sua Razão Geral de Posição atual, o seu Net Debit Cap e a sua atividade recente e histórica com o Scheme.

- O scheme disponibilizará, através do Portal do Scheme, meios pelos quais os DFSP podem utilizar dados históricos, incluindo o histórico das suas Posições e do seu Net Debit Cap, para prever os volumes futuros e os níveis de financiamento de liquidação necessários.

- O scheme disponibilizará meios pelos quais os DFSP podem obter atualizações dos artefactos de software que tenham transferido anteriormente.

- O scheme disponibilizará, através do Portal do Scheme, meios pelos quais os DFSP podem solicitar um levantamento da sua quota na Conta Bancária de Liquidação do Scheme.

- O scheme disponibilizará, através do Portal do Scheme, meios pelos quais os DFSP podem consultar a sua quota do saldo da Conta Bancária de Liquidação do Scheme.

## 7. O Serviço de Gestão da Fraude

_Esta secção ainda não foi redigida, mas prevê-se que inclua as
seguintes secções:_

1. _Descrição do Utilitário de Gestão da Fraude — Finalidade e Âmbito_

2. _A Base de Dados de Transações Partilhada_

3. _Esquema de Categorização da Fraude_

4. _Comunicação de Agentes ou Transações Reconhecidamente Maliciosos_

5. _Algoritmos e Processos de Deteção de Anomalias e de Fraude_

6. _Reporte dos DFSP_

7. _Opções de Interceção de Transações em Tempo Real_

## 8. Anexo: Casos de Utilização suportados pelo Scheme e parâmetros do sistema

_Esta é a mesma tabela que consta do documento de Regras de Negócio, mas com os códigos sistémicos necessários para que a Plataforma reconheça uma transação como pertencendo a um dado caso de utilização ou caso de utilização secundário. Um scheme só definiria Casos de Utilização Secundários se pretendesse redigir regras e/ou especificar comissões exclusivas desse Caso de Utilização Secundário._

_Esta tabela é um exemplo de uma tabela de Casos de Utilização e de Casos de Utilização Secundários que um scheme poderá suportar._

| Código do Caso de Utilização | Caso de Utilização | Caso de Utilização Secundário | Elementos de Dados Exigidos | Outros Métodos de Determinação do Caso de Utilização |
| :--- | :----- | :--------- | :-------------------------- | :------------------------------------------- |
| 1.0  | P2P  | Pessoa para Pessoa | Definição da API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Consumer</br> | |
| 1.1 | P2P | Carteira para carteira | O Tipo de Conta de Transação do DFSP Pagador é Carteira e o do DFSP Beneficiário é Carteira |
| 1.2 | P2P | Banco para banco | O Tipo de Conta de Transação do DFSP Pagador é Banco e o do DFSP Beneficiário é Carteira |
| 1.3 | P2P | Carteira para banco | O Tipo de Conta de Transação do DFSP Pagador é Carteira e o do DFSP Beneficiário é Banco |
| 1.4 | P2P | Banco para Carteira |  O Tipo de Conta de Transação do DFSP Pagador é Banco e o do DFSP Beneficiário é Carteira. |
| 2.0 | Pagamento em Massa | | Definições da API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Consumer</br> |
| 2.1 | B2P | Banco para banco | Initiator Type = Business |
| 2.2 | G2P | Governo para Pessoa | Initiator Type = Government |
| 3.0 | P2B | Pessoa para Empresa | Definições da API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Initiator Type = Consumer</br> <br>Recipient Type = Business</br> |
| 3.1 | P2B | Compra por Número de Caixa | Initiator Type = Device | |
| 3.2 | P2B | Compra por código QR | a definir | |
| 3.3 | P2B | Compra Online | Merchant ID Code = a definir | |
| 3.4 | P2B | Pagamento de Faturas | | a definir: um elemento de dados no Pedido de Cotação incluirá o número de conta do Pagador junto do emissor da fatura |
| 3.5 | P2B | Pessoa para Empresa - Outros | | |
| 4.0 | P2G | | Definições da API <br>Scenario=Transfer</br> <br>Initiator = Payer</br> <br>Recipient Type = Government</br> |
| 4.1 | P2G | Pessoa para Governo | | |
| 4.1 | P2G | Compra por Número de Caixa | Initiator Type = Device | |
| 4.2 | P2G | Compra por código QR | a definir | |
| 4.3 | P2G | Compra Online | Merchant ID Code = a definir | |
| 4.4 | P2G | Pagamento de Faturas | | a definir: um elemento de dados no Pedido de Cotação incluirá o número de conta do Pagador junto do emissor da fatura |

## 9. Anexo: Códigos de Categoria de Comerciante

_O scheme vai querer especificar códigos para reconhecer o tipo de comerciante a quem se paga. O termo «comerciante» é aqui utilizado em sentido amplo, para incluir todos os tipos de aceitantes de pagamentos que não sejam consumidores. Um esquema de códigos de categoria de comerciante poderá querer reconhecer setores de atividade, domínios (lojas presenciais versus remotas ou online) e/ou a dimensão do comerciante._
