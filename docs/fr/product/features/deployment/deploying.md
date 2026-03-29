---
sidebarTitle: Déployer Mojaloop
---

# Déploiement de Mojaloop

Cette section décrit les aspects de déploiement du Hub Mojaloop.

## Déploiement du Hub Mojaloop (hors intégrations participants)

Le tableau suivant indique quel scénario de déploiement Mojaloop convient le mieux selon le type d’utilisateur et le cas d’usage.

Pour le détail de chaque outil de déploiement, voir la documentation [Outils de déploiement](./tools.md).

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
            content: "Utiliser : core test harness";
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
            content: "Utiliser : Miniloop";
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
            content: "Utiliser : déploiement HELM";
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
            content: "Utiliser : IaC";
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
<th>Scénario de déploiement / type d’utilisateur</th>
<th>Apprentissage</th>
<th>Évaluation (choix de Mojaloop)</th>
<th>Tests de cas d’usage</th>
<th>Développement de fonctionnalités et tests de développement</th>
<th>Production</th>
</tr>
</thead>
<tbody>
<tr>
<td>Étudiant</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td>N/A</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td>N/A</td>
</tr>
<tr>
<td>Développeur</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td>N/A</td>
<td class="green">Empreinte :<br>- Machine unique, p. ex. portable ou VM unique.<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="green">Empreinte :<br>- Machine unique, p. ex. portable ou VM unique.<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td>N/A</td>
</tr>
<tr>
<td>Analyste métier</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="green">Empreinte :<br>- Machine unique, p. ex. portable ou VM unique.<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td>N/A</td>
</tr>
<tr>
<td>Adoptant potentiel</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique<br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td>N/A</td>
</tr>
<tr>
<td>Auditeur / QA externe / analyste sécurité</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td>N/A</td>
<td>N/A</td>
</tr>
<tr>
<td>Intégrateur système</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="red">Empreinte :<br>- Déploiement entièrement redondant, répliqué, haute disponibilité<br>- Sur site ou cloud<br>SLA : SLA élevé sur de nombreux axes.</td>
</tr>
<tr>
<td>Opérateur de hub</td>
<td class="green">Empreinte : machine unique, p. ex. portable ou VM unique.<br>SLA : aucun</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="amber">Empreinte :<br>- Faible consommation de ressources, cluster unique <br>- Environnement proche de la production (bac à sable ? SLA inférieur à la prod)<br>SLA :<br>- Inférieur à la prod mais possibilité de tester les exigences non fonctionnelles.</td>
<td class="red">Empreinte :<br>- Déploiement entièrement redondant, répliqué, haute disponibilité<br>- Sur site ou cloud<br>SLA : SLA élevé sur de nombreux axes.</td>
</tr>
</tbody>
</table>

## Outils de déploiement

<table class="deployment-table">
<thead>
<tr>
<th>Outil</th>
<th>Fonctionnalités</th>
<th>Exigences minimales en ressources</th>
<th>Sécurité</th>
<th>Documentation</th>
<th>SLA</th>
<th>Réserves, hypothèses, limites, etc.</th>
</tr>
</thead>
<tbody>
<tr>
<td class="green"><a href="./tools.md#core-test-harness">core test harness</a></td>
<td>- nœud unique<br>- docker-compose<br>- « profils » disponibles<br>- Pas de HELM<br>- Pas de passerelle<br>- Pas de composants entrée/sortie<br>- Pas de pile IAM<br>- Déploie :<br>  - services cœur et services sous-jacents<br>  - portails (facultatif)<br>  - pile de supervision (facultatif)<br><br>Utilisé dans les pipelines CI pour les tests d’intégration.</td>
<td>Portable ou poste de travail milieu de gamme</td>
<td>Aucune sécurité</td>
<td>- Documentation orientée développeurs.<br>- Documentation pour utilisateurs non techniques à des fins pédagogiques.<br>- Documentation produit pour expliquer les fonctionnalités (rôle et pertinence)</td>
<td>- Aucun SLA</td>
<td>- Ne jamais utiliser en production.<br>- Ne jamais utiliser pour traiter des transactions impliquant de l’argent réel.</td>
</tr>

<tr>
<td class="amber"><a href="./tools.md#helm-deploy">déploiement HELM</a></td>
<td>- Seuls les charts HELM sont nécessaires pour déployer les services Mojaloop et les services sous-jacents.</td>
<td>- Portable ou poste haut de gamme<br>- Petit cluster Kubernetes cloud.</td>
<td>L’utilisateur doit durcir son propre cluster Kubernetes.</td>
<td>- Documentation orientée développeurs<br>- Documentation semi-technique / orientée analyste métier pour l’expérimentation et les tests de cas d’usage.<br>- Documentation produit pour expliquer les fonctionnalités (rôle et pertinence).</td>
<td>- Doit permettre d’atteindre des SLA (pour une configuration matérielle de référence) :<br>  - Disponibilité :<br>    - ? 4 ou 5 neufs ?<br>  - RTO/RPO : ? aussi proche de zéro que possible.<br>  - Débit / performance<br>    - TPS : 1000+ (soutenu pendant 1 heure)<br>    - Latence (percentiles) (hors latences externes) :<br>      - Compensation : 99 % &lt; 1 seconde.<br>      - Recherche : 99 % &lt; 1 seconde.<br>      - Accord sur les conditions : 99 % &lt; 1 seconde.<br>  - Gestion des données :<br>    - Mesures contre la perte de données (réplication, reprise après sinistre).<br>    - Conservation (audit, conformité)<br>    - Archivage.<br><br>NB : la stratégie privilégie la haute disponibilité par rapport à la reprise après sinistre.</td>
<td>- Peut être utilisé en production.<br>- Adapté au traitement d’opérations en argent réel.<br>- L’utilisateur / adoptant doit déployer et configurer sa propre infrastructure, y compris cluster(s) Kubernetes, entrée/sortie, pare-feu, etc.<br>- La sécurité se limite à ce que fournissent les charts HELM ; une conception et une configuration de sécurité complémentaires sont nécessaires.</td>
</tr>
<tr>
<td class="red"><a href="./tools.md#infrastructure-as-code-iac">Infrastructure as Code</a></td>
<td>- plusieurs cibles de plateforme de déploiement<br>  - AWS, sur site, autres clouds (modulaire)<br>- plusieurs options de couche d’orchestration<br>  - k8s managé, microk8s, EKS<br>- modèle GitOps (centre de contrôle)<br>  - peut déployer et gérer plusieurs instances / environnements de hub<br>- Déploie :<br>  - centre de contrôle<br>  - services cœur et services sous-jacents (options pour services sous-jacents managés)<br>  - portails<br>  - pile IAM<br>  - pile de supervision<br>  - pm4ml<br>- modèle GitOps</td>
<td>- Infrastructure cloud haut de gamme ou sur site.</td>
<td>Sécurité complète</td>
<td>- Plusieurs niveaux de documentation pour tous types d’« utilisateurs ».<br>- Documentation développeur pour utilisation, maintenance, évolution, extension des capacités IaC (nouvelles cibles / services / fonctionnalités).<br>  - Schémas d’architecture détaillés et explications pour une compréhension approfondie.<br>- Documentation orientée exploitation technique pour permettre aux profils « ingénieur infrastructure » d’utiliser l’IaC pour déployer et maintenir plusieurs instances Mojaloop en développement, test et production.<br>- Documentation produit pour présenter l’IaC (rôle et pertinence).</td>
<td>- Doit permettre d’atteindre des SLA (pour une configuration matérielle de référence) :<br>  - Disponibilité :<br>    - ? 4 ou 5 neufs ?<br>  - RTO/RPO : ? aussi proche de zéro que possible.<br>  - Débit / performance<br>    - TPS : 1000+ (soutenu pendant 1 heure)<br>    - Latence (percentiles) (hors latences externes) :<br>      - Compensation : 99 % &lt; 1 seconde.<br>      - Recherche : 99 % &lt; 1 seconde.<br>      - Accord sur les conditions : 99 % &lt; 1 seconde.<br>  - Gestion des données :<br>    - Mesures contre la perte de données (réplication, reprise après sinistre).<br>    - Conservation (audit, conformité)<br>    - Archivage.<br><br>NB : la stratégie privilégie la haute disponibilité par rapport à la reprise après sinistre.</td>
<td>- Peut être utilisé en production.<br>- Adapté au traitement d’opérations en argent réel.</td>
</tr>
</tbody>
</table>

## Historique du document
|Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.2|20 août 2025|Sam Kummary|Mise à jour des sections pour utiliser Helm comme option de déploiement le cas échéant|
|1.1|3 juin 2025|Paul Makin|Suppression de la section performance, déplacée vers un nouveau document|
|1.0|7 mai 2025|Tony Williams|Version initiale|
