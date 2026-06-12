# Versionnement

## Versionnement des releases des services cœur du Switch

Ce document présente les lignes directrices de la stratégie de versionnement des dépôts open source Mojaloop correspondant aux services du Switch.

### Stratégie de versionnement


#### Référence à partir de PI-11
1. À partir de PI-11 (27 juillet 2020), la directive de versionnement est de migrer vers un système étroitement aligné sur le [SemVer](https://semver.org/) en supprimant la dépendance PI/Sprint. À partir de 11.x.x, la proposition est donc de passer à un [SemVer](https://semver.org/) strict.
2. À haut niveau, on conserve le format vX.Y.Z, où X représente la version 'Major', Y la version 'Minor' et Z la version 'patch'. Les corrections mineures et patchs incrémentent Z ; les évolutions fonctionnelles non rupturistes modifient Y ; les changements rupturistes modifient X.
3. Des suffixes tels que « -snapshot », « -patch », « -hotfix » sont utilisés lorsque pertinent et selon les besoins (pris en charge par la configuration CI).
4. À partir de 11.0.0 (principalement pour Helm, mais aussi pour les services individuels) pour PI-11, la proposition est de passer à un [SemVer](https://semver.org/) pur.
5. Cela implique que toute nouvelle release d’un paquet ou service avec X &lt; 11 (pour les dépôts existants, pas les nouveaux) sera d’abord portée à v11.0.0 comme version de base, puis suivra les règles SemVer standard évoquées ci-dessus. Pour les nouveaux projets ou dépôts, le versionnement peut commencer à v1.0.0 (une fois qu’ils ont atteint le statut de release).


#### Stratégie utilisée jusqu’à PI-10
1. Le versionnement Mojaloop (jusqu’à PI-10) s'inspire du système de numérotation des releases du [versionnement sémantique](https://semver.org/).
2. Il est toutefois adapté pour refléter le calendrier du projet Mojaloop, selon les numéros d’incrément de programme (PI) et de sprint.
3. Par exemple, le numéro de release v5.1.0 indique la première release du sprint 5.1, où Sprint 5.1 est le premier sprint du PI-5. Pour une version vX.Y.Z, X.Y est le numéro de sprint (X = numéro de PI) et Z le numéro de release pour ce dépôt. Exemple : v4.4.4 = quatrième release sur quatre dans le sprint 4.4 (du PI-4).



### Version actuelle

Les informations de version actuelles pour Mojaloop se trouvent [ici](../../deployment-guide/releases.md).

### Calendrier des sprints PI-13

Ci-dessous le calendrier des sprints du Program Increment 13, qui se termine par l’événement communautaire PI-14 en avril 2021.

|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Lancement Phase-5 sur site**|25/01/2021|29/01/2021|5 jours| Webinaires Zoom virtuels|
|**Sprint 13.1**|01/02/2021|14/02/2021|2 semaines | |
|**Sprint 13.2**|15/02/2021|28/02/2021|2 semaines | |
|**Sprint 13.3**|01/03/2021|14/03/2021|2 semaines | |
|**Sprint 13.4**|15/03/2021|28/03/2021|2 semaines | |
|**Sprint 13.5**|29/03/2021|11/04/2021|2 semaines | |
|**Sprint 13.6**|12/04/2021|25/04/2021|2 semaines | |
|**Phase-5 PI-14**|26/04/2021|30/04/2021|5 jours| Réunions virtuelles |

### Calendrier des sprints PI-12

Ci-dessous le calendrier des sprints du Program Increment 12, qui se termine par l’événement communautaire PI-13 en janvier 2021.

|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Lancement Phase-4 sur site**|28/01/2020|30/01/2020|3 jours| Johannesbourg|
|**Phase-4 PI-10 virtuelle**|21/04/2020|24/04/2020|4 jours| Webinaires Zoom virtuels|
|**Phase-4 PI-11 virtuelle**|21/07/2020|24/07/2020|4 jours| Webinaires Zoom virtuels|
|**Phase-4 PI-12 virtuelle**|19/10/2020|23/10/2020|5 jours| Webinaires Zoom virtuels|
|**Sprint 12.1**|26/10/2020|15/11/2020|3 semaines | |
|**Sprint 12.2**|16/11/2020|29/11/2020|2 semaines | |
|**Sprint 12.3**|30/11/2020|13/12/2020|2 semaines | |
|**Sprint 12.4**|14/12/2020|27/12/2020|2 semaines | |
|**Sprint 12.5**|28/12/2020|10/01/2021|2 semaines | |
|**Sprint 12.6**|11/01/2021|24/01/2021|2 semaines | |
|**Lancement Phase-5 / PI-13**|25/01/2021|29/01/2021|5 jours| À confirmer |

### Calendriers de sprints antérieurs :

### Calendrier des sprints PI-11

Ci-dessous le calendrier des sprints du Program Increment 11, qui se termine par l’événement PI 12.

|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Lancement Phase-4 sur site**|28/01/2020|30/01/2020|3 jours| Johannesbourg|
|**Phase-4 PI-10 virtuelle**|21/04/2020|24/04/2020|4 jours| Webinaires Zoom virtuels |
|**Phase-4 PI-11 virtuelle**|21/07/2020|24/07/2020|4 jours| Webinaires Zoom virtuels |
|**Sprint 11.1**|27/07/2020|09/08/2020|2 semaines| |
|**Sprint 11.2**|10/08/2020|23/08/2020|2 semaines| |
|**Sprint 11.3**|24/08/2020|06/09/2020|2 semaines| |
|**Sprint 11.4**|07/09/2020|20/09/2020|2 semaines| |
|**Sprint 11.5**|21/09/2020|04/10/2020|2 semaines| |
|**Sprint 11.6**|05/10/2020|18/10/2020|2 semaines | |
|**Phase-4 PI-12**|20/10/2020|23/10/2020|4 jours| À confirmer |

#### Calendrier des sprints PI-10

Ci-dessous le calendrier du Program Increment 10, qui se termine par l’événement PI 11. Veuillez utiliser ceci comme guide lors des processus de versionnement et de release.

|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Phase-3 PI6 sur site**|16/04/2019|18/04/2019|3 jours| Johannesbourg|
|**Phase-3 PI7 sur site**|25/06/2019|27/06/2019|3 jours| Arusha|
|**Phase-3 PI8 sur site**|10/09/2019|12/09/2019|3 jours| Abidjan|
|**Lancement Phase-4 sur site**|28/01/2020|30/01/2020|3 jours| Johannesbourg|
|**Phase-4 PI 10 virtuelle**|21/04/2020|24/04/2020|5 jours| Webinaires Zoom virtuels |
|**Sprint 10.1**|27/04/2020|10/05/2020|2 semaines| |
|**Sprint 10.2**|11/05/2020|24/05/2020|2 semaines| |
|**Sprint 10.3**|25/05/2020|07/06/2020|2 semaines| |
|**Sprint 10.4**|08/06/2020|21/06/2020|2 semaines| |
|**Sprint 10.5**|22/06/2020|05/07/2020|2 semaines| |
|**Sprint 10.6**|06/07/2020|19/07/2020|2 semaines | |
|**Phase-4 PI 11 sur site**|21/07/2020|23/07/2020|3 jours| Kenya (provisoire) |

#### PI-9
|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Sprint 9.1**|03/02/2020|16/02/2020|2 semaines| |
|**Sprint 9.2**|17/02/2020|01/03/2020|2 semaines| |
|**Sprint 9.3**|02/03/2020|15/03/2020|2 semaines| |
|**Sprint 9.4**|16/03/2020|29/03/2020|2 semaines| |
|**Sprint 9.5**|30/03/2020|12/04/2020|2 semaines| |
|**Sprint 9.6**|13/04/2020|19/04/2020|1 semaine | |
|**Phase-4 PI 10 virtuelle**|21/04/2020|23/04/2020|5 jours| Webinaires Zoom virtuels |

#### PI-8
|Phase / jalon|Début|Fin|Semaines|Notes|
|---|---|---|---|---|
|**Sprint 8.1**|16/09/2019|29/09/2019|2 semaines| |
|**Sprint 8.2**|30/09/2019|13/10/2019|2 semaines| |
|**Sprint 8.3**|14/10/2019|27/10/2019|2 semaines| |
|**Sprint 8.4**|28/10/2019|10/11/2019|2 semaines| |
|**Sprint 8.5**|11/11/2019|24/11/2019|2 semaines| |
|**Sprint 8.6**|25/11/2019|08/12/2019|2 semaines| |
|**Sprint 8.7**|09/12/2019|05/01/2020|4 semaines| Pause de Noël|
|**Sprint 8.8**|06/01/2020|26/01/2020|3 semaines| 1 semaine de préparation|
|**Lancement Phase-4 sur site**|28/01/2020|30/01/2020|3 jours| Johannesbourg|

### Notes

1. Une nouvelle release du dépôt **helm** est produite en fonction des évolutions de fonctionnalités et de configuration des services cœur et des besoins de la communauté.
