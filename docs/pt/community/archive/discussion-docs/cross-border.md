---
i18n_source_sha: 4deec6f8db992d12849b2c63b4a9ed53d2661c47
---

**Reunião do workstream de transfronteiriços**

10 e 11 de março (Londres/remoto)

**Passos seguintes para o PI:**

•  Proposta sobre a forma como o CNP consulta e aloja os serviços de oracle e os objetivos globais  - Adrian, Michael 

•  Identificadores compostos, formas como isto é captado no sistema ou expresso nas apis - em aberto

•  Que informação é captada no modelo de dados ou na lista de extensões - Michael

•  Seguimento com a SWIFT para discutir os requisitos - Matt 

**Itens em aberto:**

•  Finalizar os requisitos do CNP

•  Tem de agregar a informação e juntá-la num único pedido, e terão de assinar separadamente

•  Finalizar que o FXP tem de gerir as taxas de câmbio, as liquidações e o que expira quando

•  Os CNP podem alargar isto e determinar regras de scheme adicionais

•  O FXP trata dos erros de arredondamento

•  O FXP garante uma dada taxa

•  Como se integram no schema os intervenientes não Mojaloop?

•  Como integramos o Mojaloop e algum scheme Mojaloop para fornecer pagamentos PVT completos - grupo de trabalho com Michael, Adrian, Sybrin e outros, conforme necessário

•  Como gerimos os pedidos por razões regulatórias

•  Investigar os mapeamentos de identificadores (mapear contas pathfinder/contas móveis para IDs únicos de DFSP)

•  Investigar a certificação (Hash e PKKI)


Notas detalhadas da reunião:
Dia #1:
	- Resposta de cotação
	
		○ Como codificamos o SLA na resposta
	
		○ Pedir a um 2.º CNP que encaminhe
		
		○ Na API - é preciso empacotar a forma de lá chegar
		
		○ Enquanto CMP no Mowali, se eu devolver uma resposta de cotação, o scheme tem implicações 
		
		○ Seguir todo o percurso do pagador ao beneficiário 
		
		○ Limitar a participação do CNP - têm de ser o último salto
		
			§ Como definir os requisitos de um CNP?
	
	- Formato das mensagens
	
		○ Sintaxe http
		
		○ Partiu-se do scheme mojaloop 
		
			§ Evoluir para que o CNP faça a gestão da conversão
		
		○ Versão SWIFT
		
		○ Segurança - TLS
		
		○ Cabeçalho/conteúdo encriptados em JWS
	
	- Sistema de retalho
	
		○ Fora da rede - remeter para o hub de alguém
	
	- Modelo de dados
	
		○ Estrutura: formas como acrescentámos nova informação, rotas diferentes, etc.
		
		○ Privacidade: visibilidade e segurança  - apenas acessível às pessoas que a podem ver
		
		○ Conteúdo do modelo de dados 
	
	- A transferência é feita através do switch (movimento de dinheiro)
	
		○ No mowali - os montantes são expressos, mas a taxa é importante, porque afeta as liquidações 
	
		§ Fluxo de dados - acrescentamos a taxa quando devolvemos a cotação
		
		§ Acrescentada na lista de extensões - deveria fazer parte da norma?
	
		§ Montante enviado e recebido (moeda diferente) 
	
	- Elemento de dados
		
		○ Comissão de cada participante
		
		○ O DFSP pagador soma-as 
		
		○ Elemento de comissão da transação 
	
	- Proposta

		○ Serviço de account lookup
	
			§ Lista de FSP locais
		
		○ Switch - precisa de manter o estado e os pedidos de consulta
	
			§ Para o remetente, deveria parecer uma transferência doméstica
			
			§ Recolher a informação e devolvê-la -
		
		○ CNP - a fazer pressupostos para cumprir os requisitos
		
			§ É preciso ver a rota
			
			§ A recolher informação diferente a jusante
			
			§ Os FSPs remetentes precisam de saber quem é o recetor
			
		○ O CNP tem de agregar a informação e juntá-la num único pedido, e terão de assinar separadamente 
			
			§ A condição e a execução fazem parte de uma estrutura PKI
			
			§ Se houver mais do que um CNP - é preciso garantir que o DFSP beneficiário tem de ter a certeza do DFSP pagador - ligações
			
			§ O CNP precisa de saber tudo, reporte regulatório - 
			 
		○ Precisamos de duplicar a estrutura numa transferência entre redes?
			
			§ A tentar impedir a adesão de um parceiro malicioso
			
			§ Confiar em que o CNP cumpre os seus SLAs
		
		○ Do Mojaloop para outro scheme - não temos controlo
		
			§ Exigir que confirmem a receção 
			
			§ Como posso saber 
			
			§ Como posso saber se a pessoa no fim recebeu o dinheiro 
		
		○ Autoridade de assinatura externa para confirmar que o dinheiro foi recebido
		
			§ Se o seu scheme quiser participar em transfronteiriços, então todos os participantes têm de ser assinados
			
			§ Chave pública -  para aderir a uma rede mojaloop é preciso emitir chaves públicas
			
			§ Autoridade central de emissão de certificados 
			
			§ É preciso ter uma estrutura de PKI implementada 
		
		○ Como se integram no schema os intervenientes não Mojaloop?
		
			§ Como integramos o Mojaloop e algum scheme Mojaloop para fornecer pagamentos PVT completos - grupo de trabalho com Michael, Adrian, Sybrin e outros, conforme necessário
			
			§ Identificar os participantes  -  FSP, DFSP - todos assinaram
			
			§ Partes - utilizadores finais (Bob/Alice)
			
			§ Transação única (com várias transferências)
			
			§ Ninguém compromete os seus fundos até que todos estejam satisfeitos 
			
			§ Como alargar o scheme mojaloop e não mojaloop 
		
		○ Certificação 
		
			§ Hash e PKKI
		
			§ Rede gold e silver
	
			§ Novo parceiro - em produção na rede 
			
			§ O scheme decide os requisitos na rede 
			
			§ Certificado autoassinado 
		
		○ Liquidez 
		
			§ O FXP faz a gestão de posições
			
			§ Que requisitos impomos a um FXP
			
			§ O dinheiro móvel tem menos flexibilidade 
			
			§ Regras que se aplicavam entre schemes 
		
		○ O FXP tem de gerir as liquidações, o que expira quando, etc.
		
			§ O FXP tem de gerir a escassez de validade das cotações 
			
			§ Permitir que o FXP rejeite os pedidos
	
		○ Como gerimos os pedidos por razões regulatórias
		
			§ Existe um dicionário 
			
				□ Existe o requisito de partilhar KYC?
			
				□ Podem pedir-se muitas coisas - cabe ao participante 
				
				□ É preciso acordar o scheme de base

**Dia #2:**

	- Dados do switch
	
		○ Números de conta
		
		○ Blacklist, white list (supervisão e bloqueio)
		
		○ Manter simples
		
		○ Hub 
		
		○ Serviço paralelo para quem o consiga fazer
		
			§ Captura de dados móveis
			
			§ Side car
			
			§ Processo digital 
			
			§ Serviços de valor acrescentado para o hub (serviço gerido)
	
	- Switch - precisa de manter o estado e os pedidos de consulta
	
	- O CNP pode ser um DFSP comum
	
		○ Todos os DFSPs suportam todos os casos de utilização
		
		○ Participantes plenos (podem apenas prestar um serviço de CNP ou de FXP)
	
	- Definição e requisitos do FXP
	
		○ FXP - exigir taxas/comissões como parte do serviço de cotação - é necessária uma taxa padrão da indústria
		
			§ Os CNP podem alargar isto e determinar regras de scheme adicionais
		
		○ O FXP trata dos erros de arredondamento 
		
		○ Garantir uma dada taxa
		
		○ Gerir a liquidação entre schemas
		
		○ Taxas de câmbio
		
		○ Deveria permitir quem faz apenas câmbio
		
		○ Casos-limite de falha
		
			§ Detalhes nas mensagens de erro para encontrar os erros
		
		○ O FXP precisa de devolver a informação certa 
		
			§ Como funciona a passagem de mensagens
			
			§ Casos-limite - partilhar o que foi feito até à data
			
			§ Jo tem uma API a funcionar - identificado 
			
			§ Alterou a cotação (intercetou a cotação) -- 
			
			§ Lista de extensões de KYC - alargou-se a cotação para isto
			
			§ As taxas estão na lista alargada (são a lista)
			
			§ Onde é aplicado o FXP ?
			
			§ O que fazemos com as comissões a jusante
			
				□  (o DFSP beneficiário assume a agregação)
	
	- Como gerir a resolução de identificadores 
	
		○ 2 tipos de identificadores
		
			§ Globais (passar ao CNP) - para obter uma resposta
			
			§ Locais - espera-se que o utilizador os forneça
		
		○ No Mojaloop, utilizamos identificadores como proxy 
		
		○ Os números de comerciante podem ser específicos de um scheme 
		
		○ Vários identificadores para uma única conta
		
		○ Como identificamos a conta de forma única?
		
		○ Depender do CNP (restringir cada identificador neste scheme)
		
		○ Que tipo de estruturas existem
		
		○ Identificação por passaporte - marcadores de posição
		
		○ Mapear contas pathfinder/contas móveis para IDs únicos de DFSP
		
			§ Serviço - a conta principal é X
			
			§ Cada país tem um serviço que disponibiliza
			
			§ Cada CNP compreende o scheme de endereçamento
			
			§ Global - é preciso saber que vias utilizar 
		
		○ Envia um get parties ao switch 
		
			§ O ALS nunca ouviu falar deles
			
			§ 2 vias 
			
				□ Via global (path finder e conversão para BIC)
	- CNP

		○ Não aloja nada
	
		○ Encaminhar através do CNP - perguntar a outros
		
		○ Construir as rotas alternativas 
	
	- Não existe um registo global
	
		○ Beneficiário último 
		
		○ Comunicação estabelecida
		
		○ O desafio será conseguirmos ter 2 DFSP a partilhar comunicação direta, e isso será difícil? 
	
	- O switch tem schemes
	
		○ Um operador de hub que siga as regras do scheme pode permitir nomes de FSP conforme decidido por essas regras
		
		○ A tecnologia ou a própria Admin API não restringe os nomes (para além das restrições de comprimento, tipo ou carateres, etc.)
		
		○ BGP: Border Gateway Protocol 
	
	- Consultar cada CNP e chegar depois a otimizações, uma matriz que forneça a rota global - o objetivo seria não consultar diretamente o CNP

• Como ligar-se ao Mojaloop?
	
	- Qualquer serviço financeiro se pode ligar ao Mowali
	
	- Regras de scheme, técnicas
	
	- Regulatórias 

	- Como atribuo as coisas? - ninguém conhece os passos
	
	- API Mojaloop - compreender isto.  
	
	- 2 instâncias, instâncias Mojaloop - TIPs e Mowali 
	
		○ WOCCU, Ásia, EUA - candidataram-se a uma instância
		
		○ Ainda a alargar as fronteiras 
	
	- Como é uma integração
	
		○ São precisos sandbox, simuladores 
		
		○ Abordagem padrão

• Serviço de pagamentos instantâneos

	- Pôr os fluxos a correr atempadamente
	
	- São precisos razões gerais em tempo real; o que acontece se estiverem offline?
	
	- Exceção para fora da rede (os bancos tiram partido do float) 

• Processo de descoberta (FSP remetente)

	- O switch determina se é preciso contactar um FXP
	
	- Em que moeda a conta recetora pode receber 
	
	- Consultas múltiplas
	
	- Modelo de dados - conjunto de contas, com uma moeda num DFSP


Participantes:
	
	- Mike, Patricia - Thume
	
	- Michael R, Rob R, Sam - Modusbox
	
	- Kim, Lewis - Crosslake
	
	- Rolland, Greg, Phillip - Sybrin
	
	- Vanburn -- Terrapay
	
	- Megan, Simeon - Virtual
