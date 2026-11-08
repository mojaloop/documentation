# Deployment do Mojaloop

Esta secção detalha os aspetos de deployment do Hub Mojaloop.

## Deployment do Hub Mojaloop (excluindo as integrações dos participantes)

A tabela seguinte fornece orientação sobre qual o cenário de deployment do Mojaloop mais adequado para os diferentes tipos de utilizador e casos de uso.

Para informação detalhada sobre cada ferramenta de deployment, consulte a documentação das [Ferramentas de deployment](./tools).

<style>
.deployment-table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
        vertical-align: top;
        position: relative;
    }

    th {
        background-color: #f8f9fa;
    }

    td.green { 
        background-color: rgba(46, 204, 113, 0.3); /* Lighter green with opacity */
        position: relative;

        &:hover::after {
            content: "Utilizar: core test harness";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.orange { 
        background-color: rgba(243, 156, 18, 0.3); /* Lighter orange with opacity */
        position: relative;

        &:hover::after {
            content: "Utilizar: Miniloop";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.amber { 
        background-color: rgba(230, 126, 34, 0.3); /* Lighter amber with opacity */
        position: relative;

        &:hover::after {
            content: "Utilizar: HELM deploy";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }

    td.red { 
        background-color: rgba(231, 76, 60, 0.3); /* Lighter red with opacity */
        position: relative;

        &:hover::after {
            content: "Utilizar: IaC";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            white-space: nowrap;
            z-index: 1;
        }
    }
}
</style>

<table class="deployment-table">
<thead>
<tr>
<th>Cenário de deployment / tipo de utilizador</th>
<th>Aprendizagem</th>
<th>Avaliação (escolher o Mojaloop)</th>
<th>Testes de casos de uso</th>
<th>Desenvolvimento de funcionalidades e testes de desenvolvimento</th>
<th>Produção</th>
</tr>
</thead>
<tbody>
<tr>
<td>Estudante</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td>N/A</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td>N/A</td>
</tr>
<tr>
<td>Programador</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td>N/A</td>
<td class="green">Pegada:<br>- Máquina única, p. ex. portátil ou VM única.<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR (requisitos não funcionais).</td>
<td class="green">Pegada:<br>- Máquina única, p. ex. portátil ou VM única.<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td>N/A</td>
</tr>
<tr>
<td>Analista de negócio</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="green">Pegada:<br>- Máquina única, p. ex. portátil ou VM única.<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td>N/A</td>
</tr>
<tr>
<td>Potencial adotante</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único<br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td>N/A</td>
</tr>
<tr>
<td>Auditor / QA externo / analista de segurança</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td>N/A</td>
<td>N/A</td>
</tr>
<tr>
<td>Integrador de sistemas</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="red">Pegada:<br>- Deployment totalmente redundante, replicado e de alta disponibilidade<br>- On-premises ou na cloud<br>SLA: SLA elevado em muitas áreas.</td>
</tr>
<tr>
<td>Operador do hub</td>
<td class="green">Pegada: máquina única, p. ex. portátil ou VM única.<br>SLA: nenhum</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="amber">Pegada:<br>- Baixa utilização de recursos, cluster único <br>- Ambiente semelhante ao de produção (sandbox? SLA inferior ao de produção)<br>SLA:<br>- Inferior ao de produção, mas com possibilidade de testar os NFR.</td>
<td class="red">Pegada:<br>- Deployment totalmente redundante, replicado e de alta disponibilidade<br>- On-premises ou na cloud<br>SLA: SLA elevado em muitas áreas.</td>
</tr>
</tbody>
</table>

## Ferramentas de deployment

<table class="deployment-table">
<thead>
<tr>
<th>Ferramenta</th>
<th>Funcionalidades</th>
<th>Requisitos mínimos de recursos</th>
<th>Segurança</th>
<th>Documentação</th>
<th>SLA</th>
<th>Ressalvas, pressupostos, limitações, etc.</th>
</tr>
</thead>
<tbody>
<tr>
<td class="green"><a href="./tools.html#core-test-harness">core test harness</a></td>
<td>- nó único<br>- docker-compose<br>- «perfis» disponíveis<br>- Sem HELM<br>- Sem gateway<br>- Sem componentes de ingress/egress<br>- Sem stack de IAM<br>- Faz o deploy de:<br>  - serviços principais e serviços de apoio<br>  - portais (opcional)<br>  - stack de monitorização (opcional)<br><br>Utilizado em pipelines de CI para testes de integração.</td>
<td>Computador portátil ou estação de trabalho de gama média</td>
<td>Segurança nula</td>
<td>- Documentação orientada para programadores.<br>- Documentação para utilizadores não técnicos, de apoio a objetivos de aprendizagem.<br>- Documentação ao nível do produto para explicar as funcionalidades, p. ex. o que faz e onde é adequado utilizá-lo</td>
<td>- Sem SLA</td>
<td>- Nunca deve ser utilizado em produção.<br>- Nunca deve ser utilizado para processar transações com dinheiro real.</td>
</tr>

<tr>
<td class="amber"><a href="./tools.html#helm-deploy">HELM deploy</a></td>
<td>- Apenas são necessários charts HELM para fazer o deploy dos serviços Mojaloop e dos serviços de apoio.</td>
<td>- Computador portátil ou estação de trabalho de gama alta<br>- Pequeno cluster kubernetes na cloud.</td>
<td>O utilizador tem de endurecer (harden) o seu próprio cluster Kubernetes.</td>
<td>- Documentação orientada para programadores<br>- Documentação semitécnica / orientada para analistas de negócio, de apoio à experimentação e aos testes de casos de uso.<br>- Documentação ao nível do produto para explicar as funcionalidades, p. ex. o que faz e onde é adequado utilizá-lo.</td>
<td>- Tem de conseguir atingir os SLAs (dadas as especificações de hardware de referência):<br>  - Disponibilidade:<br>    - ? 4/5 noves?<br>  - RTO/RPO: ? Tão próximo de zero quanto possível.<br>  - Débito/desempenho<br>    - TPS: mais de 1000 (sustentados durante 1 hora)<br>    - Latência (percentis) (excluindo latências externas):<br>      - Compensação: 99% < 1 segundo.<br>      - Pesquisa: 99% < segundo.<br>      - Acordo de termos: 99% < 1 segundo.<br>  - Gestão de dados:<br>    - Mitigações contra a perda de dados, i.e. replicação, recuperação de desastres.<br>    - Retenção (auditoria, conformidade)<br>    - Arquivo.<br><br>NB: a estratégia privilegia a alta disponibilidade em detrimento da recuperação de desastres.</td>
<td>- Pode ser utilizado em produção.<br>- Seguro para processar transações com dinheiro real.<br>- O utilizador/adotante tem de fazer o deploy e configurar a sua própria infraestrutura, incluindo cluster(s) Kubernetes, ingress/egress, firewalls, etc.<br>- A segurança limita-se ao que os charts HELM fornecem. É necessária conceção e configuração de segurança adicional.</td>
</tr>
<tr>
<td class="red"><a href="./tools.html#infraestrutura-como-codigo">Infraestrutura como código</a></td>
<td>- várias plataformas de deployment alvo<br>  - AWS, on-prem, outras clouds (modular)<br>- várias opções de camada de orquestração<br>  - k8s gerido, microk8s, eks<br>- padrão GitOps (centro de controlo)<br>  - pode fazer o deploy e gerir várias instâncias de hub / ambientes<br>- Faz o deploy de:<br>  - centro de controlo<br>  - serviços principais e serviços de apoio (opções para serviços de apoio geridos)<br>  - portais<br>  - stack de IAM<br>  - stack de monitorização<br>  - pm4ml<br>- padrão GitOps</td>
<td>- Infraestrutura de gama alta na cloud ou on-premises.</td>
<td>Segurança completa</td>
<td>- Vários níveis de documentação dirigidos a todos os níveis de «utilizador».<br>- Documentação para programadores que permita a utilização, manutenção, melhoria e extensão das capacidades da IaC, p. ex. adicionar novos alvos / serviços / funcionalidades.<br>  - Diagramas de arquitetura detalhados e explicação que permitam uma compreensão profunda.<br>- Documentação orientada para operações técnicas que permita a utilizadores de nível «engenheiro de infraestrutura» utilizar a IaC para fazer o deploy e manter várias instâncias mojaloop para desenvolvimento, testes e produção.<br>- Documentação ao nível do produto para explicar as funcionalidades da IaC, p. ex. o que faz e onde é adequado utilizá-la.</td>
<td>- Tem de conseguir atingir os SLAs (dadas as especificações de hardware de referência):<br>  - Disponibilidade:<br>    - ? 4/5 noves?<br>  - RTO/RPO: ? Tão próximo de zero quanto possível.<br>  - Débito/desempenho<br>    - TPS: mais de 1000 (sustentados durante 1 hora)<br>    - Latência (percentis) (excluindo latências externas):<br>      - Compensação: 99% < 1 segundo.<br>      - Pesquisa: 99% < segundo.<br>      - Acordo de termos: 99% < 1 segundo.<br>  - Gestão de dados:<br>    - Mitigações contra a perda de dados, i.e. replicação, recuperação de desastres.<br>    - Retenção (auditoria, conformidade)<br>    - Arquivo.<br><br>NB: a estratégia privilegia a alta disponibilidade em detrimento da recuperação de desastres.</td>
<td>- Pode ser utilizado em produção.<br>- Seguro para processar transações com dinheiro real.</td>
</tr>
</tbody>
</table>

## Histórico do documento
|Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|20 de agosto de 2025|Sam Kummary|Secções atualizadas para utilizar o helm como opção de deployment onde relevante|
|1.1|3 de junho de 2025|Paul Makin|Removida a secção de desempenho, movida para um novo documento|
|1.0|7 de maio de 2025|Tony Williams|Versão inicial|
