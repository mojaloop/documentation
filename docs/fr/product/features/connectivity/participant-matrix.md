---
sidebarTitle: Matrice des participants
---

# Matrice des fonctionnalités par participant

Ce document présente une matrice détaillée des types de participants, de leurs exigences et des solutions de connectivité recommandées pour l’intégration Mojaloop.

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

## DFSP et cas d’usage paiement

<table class="participant-matrix">
<thead>
<tr>
<th>Catégorie de participant</th>
<th>Description</th>
<th>Cas d’usage attendus</th>
<th>Exigences d’infrastructure pour l’intégration Mojaloop</th>
<th>SLA de production attendu</th>
<th>Réglementation probablement pertinente</th>
<th>Exigences de sécurité particulières</th>
<th>Options de solution</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">Petit DFSP en auto-hébergement</td>
<td>- Petite institution financière à agence unique.<br>- Postes de travail propres<br>- Cloud et/ou SaaS minimaux.</td>
<td>- Tous les types de transfert Mojaloop sauf masse.<br>- Open banking (y compris PISP, AISP)</td>
<td>- Mini-PC dédié bon marché bas de gamme (p. ex. RPi)<br>- Connexion Internet haut débit petite entreprise unique<br>- Système bancaire cœur auto-hébergé p. ex. Mifos<br>- Pare-feu OS/logiciel sur le même nœud matériel que la couche d’intégration.</td>
<td>- Une certaine indisponibilité acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - L’achat de matériel de remplacement en cas de panne totale peut prendre plusieurs jours/semaines.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- ~10 TPS de pic soutenu pendant 1 heure.<br>  - Capacité max. 864000 sur 24 heures.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Pas besoin d’intégration avec les plateformes de sécurité d’entreprise existantes.<br>- Solution entièrement sécurisée « prête à l’emploi » suivant les bonnes pratiques du secteur pour les services exposés à Internet, y compris pare-feu.</td>
<td>Le « Standard Service Manager » est recommandé : solution minimale basée sur l’Integration Toolkit (accessible localement via un outil BI). Elle peut être hébergée sur un serveur de base, d’un serveur milieu de gamme pour une grande IMF ou une petite banque jusqu’à un Raspberry Pi pour les plus petits DFSP avec des exigences de continuité de service moins strictes et des volumes de transaction plus faibles. Le Standard Service Manager ne prend pas en charge les paiements de masse.<br>- Couche d’intégration basée sur Docker Compose.<br>- Couche d’intégration minimale autonome.</td>
</tr>
<tr>
<td class="low-medium participant-type">DFSP faible-moyen en auto-hébergement</td>
<td>- Petite institution financière à une ou deux agences.<br>- Propre « centre de données », c.-à-d. placard à balais avec quelques serveurs, routeur, pare-feu, etc.<br>- Quelques connaissances cloud et/ou usage SaaS.</td>
<td>- Tous les types de transfert Mojaloop<br>- Masse (milliers de transferts).<br>- Open banking (y compris PISP, AISP)</td>
<td>- Nœud matériel serveur de qualité entreprise unique.<br>- Pare-feu OS/logiciel sur le même nœud matériel que la couche d’intégration OU pare-feu matériel dédié.</td>
<td>- Une certaine indisponibilité acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - Le remplacement du matériel en cas de panne totale peut prendre des heures.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- ~50 TPS de pic soutenu pendant 1 heure.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.<br>?? à préciser</td>
<td>Le « Enhanced Service Manager » est recommandé : il étend le « Standard Service Manager » décrit précédemment en ajoutant un déploiement Kafka et la prise en charge des paiements de masse. Il peut être hébergé au minimum sur un serveur de base dans le « centre de données » du DFSP.<br>- Couche d’intégration basée sur Docker Compose ou Docker Swarm.<br>- Couche d’intégration minimale autonome.</td>
</tr>
<tr>
<td class="high-medium participant-type">DFSP moyen-élevé en auto-hébergement</td>
<td>- Petite institution financière à une ou deux agences.<br>- Propre « centre de données », c.-à-d. placard à balais avec quelques serveurs, routeur, pare-feu, etc.<br>- Quelques connaissances cloud et/ou usage SaaS.</td>
<td>- Tous les types de transfert Mojaloop<br>- Masse (milliers de transferts).<br>- Open banking (y compris PISP, AISP)</td>
<td>- Pour tolérer la panne d’un nœud matériel, 3 nœuds matériels ou plus sont requis (2n+1).</td>
<td>- Indisponibilité limitée (minutes) acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - Matériel de rechange disponible ou services de remplacement très rapides en cas de panne.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- ~50 TPS de pic soutenu pendant 1 heure.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.</td>
<td>Le « Enhanced Service Manager » est recommandé : il étend le « Standard Service Manager » décrit précédemment en ajoutant un déploiement Kafka et la prise en charge des paiements de masse. Il peut être hébergé au minimum dans une configuration multi-serveurs redondante du « centre de données » du DFSP.<br>- Couche d’intégration basée sur Kubernetes<br>- Peut disposer déjà d’une technologie d’intégration.</td>
</tr>
<tr>
<td class="large participant-type">Grand DFSP en auto-hébergement</td>
<td>- Institution financière mature multi-agences avec forte capacité informatique interne<br>- Dispose de son propre centre de données et d’experts pour gérer les systèmes<br>- À l’aise avec le cloud et les applications hybrides<br>- Dispose d’une capacité d’ingénierie logicielle interne.</td>
<td>- Tous les types de transfert Mojaloop y compris masse.<br>- Masse (millions de transferts dans une transaction par paquets de 1000, triés par DFSP bénéficiaire).<br>- Open banking (y compris PISP, AISP)</td>
<td>- Haute disponibilité de l’infrastructure interne nécessaire<br>- Plusieurs instances actives de tous les services d’intégration critiques réparties sur plusieurs nœuds matériels.<br>- Stockage de données répliqué haute disponibilité.<br>  - peut être multi-site / zone de disponibilité / région.</td>
<td>- Aucune indisponibilité acceptable<br>- Haute disponibilité de la connectivité.<br>  - plusieurs connexions actives par des routes diversifiées.<br>- Stockage persistant facultatif.<br>- Le SLA de connexion au schéma et de la couche d’intégration doit s’aligner sur le SLA de l’infrastructure interne existante.<br>- Jusqu’à 800 TPS de pic soutenu pendant 1 heure pour les FXP par exemple.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.</td>
<td>Le « Premium Service Manager » est recommandé : service de type Payment Manager pleinement fonctionnel pour les grands DFSP. Son exploitation demande des ressources importantes ; il doit être hébergé soit dans le centre de données existant du DFSP, soit dans le cloud.<br>- Couche d’intégration basée sur Kubernetes<br>- Peut disposer déjà d’une technologie d’intégration.<br> </td>
</tr>
</tbody>
</table>

## Fintechs utilisant PISP et/ou AISP

<table class="participant-matrix">
<thead>
<tr>
<th>Catégorie de participant</th>
<th>Description</th>
<th>Cas d’usage attendus</th>
<th>Exigences d’infrastructure pour l’intégration Mojaloop</th>
<th>SLA de production attendu</th>
<th>Réglementation probablement pertinente</th>
<th>Exigences de sécurité particulières</th>
<th>Options de solution</th>
</tr>
</thead>
<tbody>
<tr>
<td class="small participant-type">Petit PISP/AISP en auto-hébergement</td>
<td>- Petite organisation « agence » unique avec un ou deux produits.<br>- Postes de travail / serveurs propres<br>- Cloud et/ou SaaS minimaux.</td>
<td>- Paiements de masse relativement modestes, p. ex. salaires pour PME</td>
<td>- Mini-PC dédié bon marché bas de gamme (p. ex. RPi)<br>- Connexion Internet haut débit petite entreprise unique<br>- Système bancaire cœur auto-hébergé p. ex. Mifos<br>- Pare-feu OS/logiciel sur le même nœud matériel que la couche d’intégration.</td>
<td>- Une certaine indisponibilité acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - L’achat de matériel de remplacement en cas de panne totale peut prendre plusieurs jours/semaines.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- SLA interface masse ?<br>  - Comment le définir ? Taille de lot ? Temps d’envoi du lot via API ? Délai de réponse aux callbacks ?<br>  - Taille max. de lot ~10k paiements<br>  - L’envoi de 10k paiements via l’API masse doit prendre &lt; 30 secondes.<br>  - La réponse aux callbacks doit prendre &lt; 5 secondes.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Pas besoin d’intégration avec les plateformes de sécurité d’entreprise existantes.<br>- Solution entièrement sécurisée « prête à l’emploi » suivant les bonnes pratiques du secteur pour les services exposés à Internet, y compris pare-feu.</td>
<td>- Couche d’intégration basée sur Docker Compose.<br>- Couche d’intégration minimale autonome.</td>
</tr>
<tr>
<td class="low-medium participant-type">PISP/AISP faible-moyen en auto-hébergement</td>
<td>- Petite organisation à une ou deux agences.<br>- Propre « centre de données », c.-à-d. placard à balais avec quelques serveurs, routeur, pare-feu, etc.<br>- Quelques connaissances cloud et/ou usage SaaS.</td>
<td>- Paiements de masse relativement modestes, p. ex. salaires pour PME<br>- Agrégation de comptes</td>
<td>- Nœud matériel serveur de qualité entreprise unique.<br>- Pare-feu OS/logiciel sur le même nœud matériel que la couche d’intégration OU pare-feu matériel dédié.</td>
<td>- Une certaine indisponibilité acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - Le remplacement du matériel en cas de panne totale peut prendre des heures.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- SLA interface masse ?<br>  - Comment le définir ? Taille de lot ? Temps d’envoi du lot via API ? Délai de réponse aux callbacks ?<br>  - Taille max. de lot ~25k paiements<br>  - L’envoi de 25k paiements via l’API masse doit prendre &lt; 60 secondes.<br>  - La réponse aux callbacks doit prendre &lt; 10 secondes.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.<br>?? à préciser</td>
<td>- Couche d’intégration basée sur Docker Compose ou Docker Swarm.<br>- Couche d’intégration minimale autonome.</td>
</tr>
<tr>
<td class="high-medium participant-type">PISP/AISP moyen-élevé en auto-hébergement</td>
<td>- Petite organisation à une ou deux agences.<br>- Propre « centre de données », c.-à-d. placard à balais avec quelques serveurs, routeur, pare-feu, etc.<br>- Quelques connaissances cloud et/ou usage SaaS.</td>
<td>- Paiement de masse pour grandes organisations, p. ex. ministères<br>- Agrégation de comptes</td>
<td>- Pour tolérer la panne d’un nœud matériel, 3 nœuds matériels ou plus sont requis (2n+1).</td>
<td>- Indisponibilité limitée (minutes) acceptable en cas de panne matérielle.<br>  - Certains schémas peuvent exclure les DFSP qui ne respectent pas un SLA d’indisponibilité donné.<br>  - Matériel de rechange disponible ou services de remplacement très rapides en cas de panne.<br>- Jeu complet de fonctions de sécurité Mojaloop : mTLS, JWS, ILP<br>- SLA interface masse ?<br>  - Comment le définir ? Taille de lot ? Temps d’envoi du lot via API ? Délai de réponse aux callbacks ?<br>  - Taille max. de lot ~100-200k paiements<br>  - L’envoi de 100-200k paiements via l’API masse doit prendre &lt; 300 secondes.<br>  - La réponse aux callbacks doit prendre &lt; 120 secondes.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.</td>
<td>- Couche d’intégration basée sur Kubernetes<br>- Peut disposer déjà d’une technologie d’intégration.</td>
</tr>
<tr>
<td class="large participant-type">Grand PISP/AISP en auto-hébergement</td>
<td>- Organisation mature multi-agences avec forte capacité informatique interne<br>- Dispose de son propre centre de données et d’experts pour gérer les systèmes<br>- À l’aise avec le cloud et les applications hybrides<br>- Dispose d’une capacité d’ingénierie logicielle interne.</td>
<td>- Paiement de masse pour grandes organisations, p. ex. ministères</td>
<td>- Haute disponibilité de l’infrastructure interne nécessaire<br>- Plusieurs instances actives de tous les services d’intégration critiques réparties sur plusieurs nœuds matériels.<br>- Stockage de données répliqué haute disponibilité.<br>  - peut être multi-site / zone de disponibilité / région.</td>
<td>- Aucune indisponibilité acceptable<br>- Haute disponibilité de la connectivité.<br>  - plusieurs connexions actives par des routes diversifiées.<br>- Stockage persistant facultatif.<br>- Le SLA de connexion au schéma et de la couche d’intégration doit s’aligner sur le SLA de l’infrastructure interne existante.<br>- SLA interface masse ?<br>  - Comment le définir ? Taille de lot ? Temps d’envoi du lot via API ? Délai de réponse aux callbacks ?<br>  - Taille max. de lot ~1M paiements<br>  - L’envoi de 1M paiements via l’API masse doit prendre &lt; 600 secondes.<br>  - La réponse aux callbacks doit prendre &lt; 300 secondes.</td>
<td>- Tenue des registres ?<br>- Sécurité ?</td>
<td>- Peut nécessiter une intégration avec les plateformes de sécurité d’entreprise existantes, p. ex. pare-feu, passerelles, etc.</td>
<td>- Couche d’intégration basée sur Kubernetes<br>- Peut disposer déjà d’une technologie d’intégration.</td>
</tr>
</tbody>
</table>

## Historique du document
|Version|Date|Auteur|Détail|
|:--------------:|:--------------:|:--------------:|:--------------:|
|1.0|9 juin 2025|Tony Williams|Version initiale|
