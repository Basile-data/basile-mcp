# Journal des modifications

Le serveur MCP de Basile est hébergé : chaque nouveauté arrive pour tous les utilisateurs, sans rien réinstaller. La version annoncée par le serveur et par le registre officiel MCP est indiquée entre crochets.

## Non publié

- Dépôt public de documentation : README bilingue, `server.json` du registre officiel MCP, `glama.json`, exemples de configuration par client et validation automatique de `server.json`.

## 2026-10-11 [0.2.0]

- Le serveur annonce le plafond de requêtes du jour : 2 000 avec l'offre API, 5 000 avec l'offre Agence.

## 2026-10-09 [0.2.0]

- Enrichissement : `basile_enrich_person` trouve l'e-mail professionnel et/ou le numéro de portable de n'importe quelle personne, présente dans Basile ou non, payé sur le solde d'enrichissement (rien si rien n'est trouvé).
- Nouveaux outils `basile_enrichment_status` et `basile_enrichment_balance`.

## 2026-10-06 [0.2.0]

- Une recherche par employeur ou par SIREN qui ne trouve rien d'exact tente une récupération, ou explique pourquoi avec des pistes pour relancer. Chaque fiche récupérée indique la qualité de la correspondance.
- Le filtre par domaine web cherche la correspondance exacte sur les trois sources (registre, LinkedIn, Google Maps), et accepte un nom seul.

## 2026-10-05 [0.2.0]

- Procédures collectives : le résumé de chaque entreprise donne la situation réelle d'après les jugements (période d'observation, plan en cours, liquidation, clôture).

## 2026-09-12 [0.2.0]

- Filtres sur les procédures collectives et les conventions collectives (IDCC).
- L'effectif des entreprises est rendu en tranches lisibles (« 50 à 99 salariés ») au lieu d'un code.

## 2026-09-11 [0.2.0]

- Publication au registre officiel MCP sous le nom `cc.basile/basile`.

## 2026-09-10 [0.2.0]

- Au-delà de 500 lignes, `basile_export` produit un fichier à télécharger au lieu de refuser ; nouvel outil `basile_export_status` pour récupérer le lien.
- Schémas de sortie, annotations (lecture seule ou non) et descriptions de paramètres sur tous les outils.

## 2026-08 [0.1.0]

- Comptage gratuit et exact avec `basile_count`, coût de chaque outil annoncé dans sa description.
- Filtre de taille d'entreprise directement sur la recherche de personnes.

## 2026-06 [0.1.0]

- Première version : recherche de personnes et d'entreprises, comptage, autocomplétion, fiche détaillée et export CSV, avec connexion OAuth par compte Basile.
