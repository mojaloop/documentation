# Matriz de funcionalidades dos participantes

Este documento apresenta uma matriz abrangente dos diferentes tipos de participantes, dos respetivos requisitos e das soluções de conectividade recomendadas para a integração com o Mojaloop.

<style>
.participant-matrix {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
    font-size: 12px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        vertical-align: top;
        position: relative;
    }

    th {
        background-color: #f8f9fa;
        font-weight: bold;
        font-size: 13px;
    }

    .category-header {
        background-color: #e9ecef;
        font-weight: bold;
        text-align: center;
    }

    td.small { 
        background-color: rgba(46, 204, 113, 0.2);
    }

    td.low-medium { 
        background-color: rgba(243, 156, 18, 0.2);
    }

    td.high-medium { 
        background-color: rgba(230, 126, 34, 0.2);
    }

    td.large { 
        background-color: rgba(231, 76, 60, 0.2);
    }

    .participant-type {
        font-weight: bold;
        min-width: 120px;
    }
}
</style>

## DFSPs de casos de uso de pagamento

<table class="participant-matrix">
<thead>
<tr>
<th>Categoria de participante</th>
<th>Descrição</th>
<th>Casos de uso esperados</th>
<th>Requisitos de infraestrutura para a integração com o Mojaloop</th>
<th>SLA de produção esperado</th>
<th>Regulamentação provavelmente relevante</th>
<th>Requisitos de segurança especiais</th>
<th>Opções de solução</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">DFSP de pequena dimensão com alojamento próprio</td>
<td>- Pequena instituição financeira (IF) com uma única agência.<br>- Estações de trabalho próprias<br>- Utilização mínima de cloud e/ou SaaS.</td>
<td>- Todos os tipos de transferência moja, exceto em lote.<br>- Open banking (incl. PISP, AISP)</td>
<td>- Um único mini-PC dedicado, barato e de gama baixa (p. ex. RPi)<br>- Uma única ligação à Internet de banda larga para pequenas empresas<br>- Sistema de core banking com alojamento próprio, p. ex. Mifos<br>- Utilização de firewall de SO/software no mesmo nó de HW que a camada de integração.</td>
<td>- «Algum» tempo de indisponibilidade é aceitável em caso de falha de hardware.<br>  - Alguns schemes (o scheme é o conjunto de regras do sistema de pagamentos) podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - A compra de hardware de substituição pode demorar muitos dias/semanas em caso de falha total.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- Pico de ~10 TPS sustentado durante 1 hora.<br>  - Capacidade máxima de 864 000 por 24 horas.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Sem necessidade de integração com plataformas de segurança empresariais existentes.<br>- Necessidade de uma solução totalmente segura «in-a-box», que siga as melhores práticas do setor para serviços expostos à Internet, ou seja, incluindo firewall.</td>
<td>Recomenda-se o «Standard Service Manager»: uma solução de funcionalidade mínima baseada no Integration Toolkit (acessível localmente através de uma ferramenta de BI). Pode ser alojada num servidor básico, desde um servidor de especificação intermédia para uma grande IMF (instituição de microfinanças) ou um pequeno banco, até um Raspberry PI para os DFSPs mais pequenos, com requisitos de continuidade de serviço menos rigorosos e volumes de transações mais baixos. O Standard Service Manager não permite pagamentos em lote.<br>- Camada de integração baseada em Docker compose.<br>- Camada de integração mínima e autónoma.</td>
</tr>
<tr>
<td class="low-medium participant-type">DFSP de dimensão média-baixa com alojamento próprio</td>
<td>- Pequena IF com uma ou duas agências.<br>- «Centro de dados» próprio, ou seja, um armário de vassouras com alguns servidores, router, firewall, etc.<br>- Algum conhecimento de cloud e/ou utilização de SaaS.</td>
<td>- Todos os tipos de transferência moja<br>- Em lote (milhares de transferências).<br>- Open banking (incl. PISP, AISP)</td>
<td>- Um único nó de hardware de servidor de classe empresarial.<br>- Utilização de firewall de SO/software no mesmo nó de HW que a camada de integração OU firewall de HW dedicada.</td>
<td>- «Algum» tempo de indisponibilidade é aceitável em caso de falha de hardware.<br>  - Alguns schemes podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - A substituição do hardware pode demorar horas em caso de falha total.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- Pico de ~50 TPS sustentado durante 1 hora.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.<br>?? necessita de mais clarificação</td>
<td>Recomenda-se o «Enhanced Service Manager»: baseado no «Standard Service Manager» descrito anteriormente, alarga-o acrescentando um deployment de Kafka e a possibilidade de pagamentos em lote. Pode ser alojado, no mínimo, num servidor básico no «centro de dados» do próprio DFSP. <br>- Camada de integração baseada em Docker compose ou docker swarm.<br>- Camada de integração mínima e autónoma.</td>
</tr>
<tr>
<td class="high-medium participant-type">DFSP de dimensão média-alta com alojamento próprio</td>
<td>- Pequena IF com uma ou duas agências.<br>- «Centro de dados» próprio, ou seja, um armário de vassouras com alguns servidores, router, firewall, etc.<br>- Algum conhecimento de cloud e/ou utilização de SaaS.</td>
<td>- Todos os tipos de transferência moja<br>- Em lote (milhares de transferências).<br>- Open banking (incl. PISP, AISP)</td>
<td>- Para tolerar a falha de 1 nó de hardware, são necessários 3 ou mais nós de hardware. (2n+1)</td>
<td>- «Algum» tempo de indisponibilidade limitado (minutos) é aceitável em caso de falha de hardware.<br>  - Alguns schemes podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - Deveria dispor de hardware sobresselente em espera ou de serviços de substituição muito rápidos em caso de falhas.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- Pico de ~50 TPS sustentado durante 1 hora.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.</td>
<td>Recomenda-se o «Enhanced Service Manager»: baseado no «Standard Service Manager» descrito anteriormente, alarga-o acrescentando um deployment de Kafka e a possibilidade de pagamentos em lote. Pode ser alojado, no mínimo, numa configuração redundante de múltiplos servidores no «centro de dados» do próprio DFSP. <br>- Camada de integração baseada em Kubernetes<br>- Possivelmente dispõe de tecnologia de integração existente.</td>
</tr>
<tr>
<td class="large participant-type">DFSP de grande dimensão com alojamento próprio</td>
<td>- IF madura, com várias agências e elevada capacidade interna de TI<br>- Dispõe de centro de dados próprio e de especialistas para gerir os sistemas<br>- À vontade com aplicações na cloud e híbridas<br>- Dispõe de capacidade interna de engenharia de software.</td>
<td>- Todos os tipos de transferência moja, incluindo em lote.<br>- Em lote (milhões de transferências numa transação, a 1000 por bloco, ordenadas por DFSP beneficiário).<br>- Open banking (incl. PISP, AISP)</td>
<td>- É necessária alta disponibilidade da infraestrutura interna<br>- Múltiplas instâncias ativas de todos os serviços de integração críticos, distribuídas por múltiplos nós de hardware.<br>- Armazenamento de dados replicado e de alta disponibilidade.<br>  - pode ser multi-site / zona de disponibilidade / região.</td>
<td>- Nenhum tempo de indisponibilidade é aceitável<br>- Alta disponibilidade da conectividade.<br>  - múltiplas ligações ativas através de rotas diversas.<br>- Armazenamento persistente opcional.<br>- O SLA da ligação ao scheme e da camada de integração deveria corresponder ao SLA da infraestrutura interna existente.<br>- Pico de até 800 TPS sustentado durante 1 hora, p. ex. para FXP.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.</td>
<td>Recomenda-se o «Premium Service Manager»: um serviço totalmente funcional, do tipo Payment Manager, para utilização por DFSPs de maior dimensão. A sua operação exige recursos significativos; deve ser alojado no centro de dados existente do DFSP ou na cloud.<br>- Camada de integração baseada em Kubernetes<br>- Possivelmente dispõe de tecnologia de integração existente.<br> </td>
</tr>
</tbody>
</table>

## Fintechs que utilizam PISP e/ou AISP

<table class="participant-matrix">
<thead>
<tr>
<th>Categoria de participante</th>
<th>Descrição</th>
<th>Casos de uso esperados</th>
<th>Requisitos de infraestrutura para a integração com o Mojaloop</th>
<th>SLA de produção esperado</th>
<th>Regulamentação provavelmente relevante</th>
<th>Requisitos de segurança especiais</th>
<th>Opções de solução</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">PISP/AISP de pequena dimensão com alojamento próprio</td>
<td>- Pequena organização, fintech com uma única «agência» e um ou dois produtos.<br>- Estações de trabalho / servidores próprios<br>- Utilização mínima de cloud e/ou SaaS.</td>
<td>- Pagamentos em lote relativamente pequenos, p. ex. pagamento de salários para PME</td>
<td>- Um único mini-PC dedicado, barato e de gama baixa (p. ex. RPi)<br>- Uma única ligação à Internet de banda larga para pequenas empresas<br>- Sistema de core banking com alojamento próprio, p. ex. Mifos<br>- Utilização de firewall de SO/software no mesmo nó de HW que a camada de integração.</td>
<td>- «Algum» tempo de indisponibilidade é aceitável em caso de falha de hardware.<br>  - Alguns schemes podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - A compra de hardware de substituição pode demorar muitos dias/semanas em caso de falha total.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- SLA da interface de lote?<br>  - Como deveria ser definido? Dimensão do lote? Tempo de envio do lote através da API? Tempo de resposta para os callbacks?<br>  - Dimensão máxima do lote de aproximadamente 10 mil pagamentos<br>  - O envio de 10 mil pagamentos através da API de lote deveria demorar < 30 segundos.<br>  - A resposta aos callbacks deveria demorar < 5 segundos.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Sem necessidade de integração com plataformas de segurança empresariais existentes.<br>- Necessidade de uma solução totalmente segura «in-a-box», que siga as melhores práticas do setor para serviços expostos à Internet, ou seja, incluindo firewall.</td>
<td>- Camada de integração baseada em Docker compose.<br>- Camada de integração mínima e autónoma.</td>
</tr>
<tr>
<td class="low-medium participant-type">PISP/AISP de dimensão média-baixa com alojamento próprio</td>
<td>- Pequena organização com uma ou duas agências.<br>- «Centro de dados» próprio, ou seja, um armário de vassouras com alguns servidores, router, firewall, etc.<br>- Algum conhecimento de cloud e/ou utilização de SaaS.</td>
<td>- Pagamentos em lote relativamente pequenos, p. ex. pagamento de salários para PME<br>- Agregação de contas</td>
<td>- Um único nó de hardware de servidor de classe empresarial.<br>- Utilização de firewall de SO/software no mesmo nó de HW que a camada de integração OU firewall de HW dedicada.</td>
<td>- «Algum» tempo de indisponibilidade é aceitável em caso de falha de hardware.<br>  - Alguns schemes podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - A substituição do hardware pode demorar horas em caso de falha total.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- SLA da interface de lote?<br>  - Como deveria ser definido? Dimensão do lote? Tempo de envio do lote através da API? Tempo de resposta para os callbacks?<br>  - Dimensão máxima do lote de aproximadamente 25 mil pagamentos<br>  - O envio de 25 mil pagamentos através da API de lote deveria demorar < 60 segundos.<br>  - A resposta aos callbacks deveria demorar < 10 segundos.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.<br>?? necessita de mais clarificação</td>
<td>- Camada de integração baseada em Docker compose ou docker swarm.<br>- Camada de integração mínima e autónoma.</td>
</tr>
<tr>
<td class="high-medium participant-type">PISP/AISP de dimensão média-alta com alojamento próprio</td>
<td>- Pequena organização com uma ou duas agências.<br>- «Centro de dados» próprio, ou seja, um armário de vassouras com alguns servidores, router, firewall, etc.<br>- Algum conhecimento de cloud e/ou utilização de SaaS.</td>
<td>- Pagamentos em lote para grandes organizações, p. ex. departamentos governamentais.<br>- Agregação de contas</td>
<td>- Para tolerar a falha de 1 nó de hardware, são necessários 3 ou mais nós de hardware. (2n+1)</td>
<td>- «Algum» tempo de indisponibilidade limitado (minutos) é aceitável em caso de falha de hardware.<br>  - Alguns schemes podem excluir DFSPs que não consigam cumprir um determinado SLA de indisponibilidade.<br>  - Deveria dispor de hardware sobresselente em espera ou de serviços de substituição muito rápidos em caso de falhas.<br>- Conjunto completo de funcionalidades de segurança do Mojaloop: mTLS, JWS, ILP<br>- SLA da interface de lote?<br>  - Como deveria ser definido? Dimensão do lote? Tempo de envio do lote através da API? Tempo de resposta para os callbacks?<br>  - Dimensão máxima do lote de aproximadamente 100–200 mil pagamentos<br>  - O envio de 100–200 mil pagamentos através da API de lote deveria demorar < 300 segundos.<br>  - A resposta aos callbacks deveria demorar < 120 segundos.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.</td>
<td>- Camada de integração baseada em Kubernetes<br>- Possivelmente dispõe de tecnologia de integração existente.</td>
</tr>
<tr>
<td class="large participant-type">PISP/AISP de grande dimensão com alojamento próprio</td>
<td>- Organização madura, com várias agências e elevada capacidade interna de TI<br>- Dispõe de centro de dados próprio e de especialistas para gerir os sistemas<br>- À vontade com aplicações na cloud e híbridas<br>- Dispõe de capacidade interna de engenharia de software.</td>
<td>- Pagamentos em lote para grandes organizações, p. ex. departamentos governamentais.</td>
<td>- É necessária alta disponibilidade da infraestrutura interna<br>- Múltiplas instâncias ativas de todos os serviços de integração críticos, distribuídas por múltiplos nós de hardware.<br>- Armazenamento de dados replicado e de alta disponibilidade.<br>  - pode ser multi-site / zona de disponibilidade / região.</td>
<td>- Nenhum tempo de indisponibilidade é aceitável<br>- Alta disponibilidade da conectividade.<br>  - múltiplas ligações ativas através de rotas diversas.<br>- Armazenamento persistente opcional.<br>- O SLA da ligação ao scheme e da camada de integração deveria corresponder ao SLA da infraestrutura interna existente.<br>- SLA da interface de lote?<br>  - Como deveria ser definido? Dimensão do lote? Tempo de envio do lote através da API? Tempo de resposta para os callbacks?<br>  - Dimensão máxima do lote de aproximadamente 1 milhão de pagamentos<br>  - O envio de 1 milhão de pagamentos através da API de lote deveria demorar < 600 segundos.<br>  - A resposta aos callbacks deveria demorar < 300 segundos.</td>
<td>- Conservação de registos?<br>- Segurança?</td>
<td>- Pode necessitar de integração com plataformas de segurança empresariais existentes, p. ex. firewalls, gateways, etc.</td>
<td>- Camada de integração baseada em Kubernetes<br>- Possivelmente dispõe de tecnologia de integração existente.</td>
</tr>
</tbody>
</table>

## Histórico do documento
|Versão|Data|Autor|Detalhe|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|9 de junho de 2025|Tony Williams|Versão inicial| 
