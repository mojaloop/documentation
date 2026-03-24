---
sidebarTitle: "GET /parties"
---

## 7.1 GET /parties/{type}/{partyIdentifier}[/{subId}]

L’endpoint GET /parties ne prend pas en charge et n’exige pas de charge utile ; il peut être vu comme une instruction pour déclencher un rapport de vérification d’identification de compte.

- **{type}** — Types d’identifiant de partie<br>
  Le **{type}** désigne la classification du type d’identifiant de partie. Chaque schéma ne prend en charge qu’un sous-ensemble de ces codes. Les codes pris en charge par le schéma peuvent provenir des codes ISO 20022 d’identification externe d’organisation ou de personne, ou de codes pris en charge par FSPIOP. La liste complète des codes pris en charge figure dans [**l’annexe A**](../Appendix.md).

- **partyIdentifier** <br>
  Il s’agit de l’identifiant de la partie représentée, du type indiqué par le {type} ci-dessus.

- **{subId}** <br>
  Sous-identifiant ou sous-type pour la partie ; certaines implémentations l’exigent pour garantir l’unicité de l’identifiant.
