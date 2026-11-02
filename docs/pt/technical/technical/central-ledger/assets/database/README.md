---
i18n_source_sha: 77d71d79d7246c1e4e8ead753d3fc7937d829939
---

# Como EDITAR o ficheiro central-ledger-schema-DBeaver.erd 

Este é um guia básico sobre como visualizar/atualizar com sucesso o ficheiro central-ledger-schema-DBeaver.erd.

## Pré-requisitos
* Descarregue e instale o DBeaver Community DB Manager
* A base de dados «Mojaloop Central-Ledger MySQL» tem de estar em funcionamento e ser acessível pelo DBeaver
* Também irá precisar de um editor de texto    
##  Passos a seguir
* Crie uma nova ligação à base de dados no DBeaver, no separador «Database Navigator», para a instância MySQL que está a ser executada. 
* No separador «Projetos», clique com o botão direito do rato e crie um «Novo Diagrama ER».
* Atribua um nome ao diagrama e selecione «central-ledger db» no assistente.

* Copie o ficheiro «`central-ledger-schema-DBeaver.erd`» do módulo de documentação para «`DBeaverData/workspace/General/Diagrams`» na sua localização de armazenamento do DBeaver
* Aceda ao ficheiro ERD recém-criado utilizando um editor de texto, procure por «`data-source id`» e copie o seu valor, que se assemelha a «`mysql5-171ea991174-1218b6e1bf273693`».
* Utilize um editor de texto para aceder ao ficheiro «`central-ledger-schema-DBeaver.erd`» no diretório «ER Diagrams» e substitua o valor «`data-source id`» por aquele que copiou do ficheiro «erd» recém-criado.
* O «`central-ledger-schema-DBeaver.erd`» deverá agora apresentar as tabelas tal como no «`central-ledger-schema.png`»