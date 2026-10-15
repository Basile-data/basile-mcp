<!-- Généré par scripts/generate-tools-md.mjs à partir de tools.json. Ne pas modifier à la main. -->

# Outils du serveur MCP de Basile

**Français** · [English](#english)

La version 0.2.1 du serveur MCP de Basile (`https://mcp.basile.cc/mcp`) expose **11 outils** en **4 familles**. Cette page est générée à partir de [`tools.json`](../tools.json), qui reprend le titre et les annotations de chaque outil tels que le serveur les déclare.

Retour au [README](../README.md).

| Famille | Outils | Lecture seule | Gratuits |
| --- | ---: | ---: | ---: |
| [Recherche et comptage](#recherche-et-comptage) | 5 | 5 | 3 |
| [Fiches](#fiches) | 1 | 1 | 0 |
| [Export](#export) | 2 | 1 | 1 |
| [Enrichissement](#enrichissement) | 3 | 2 | 2 |
| **Total** | **11** | **9** | **6** |

## Comment lire cette page

- **Lecture seule** (`readOnlyHint: true`) : l'outil ne fait que lire la base Basile. Votre client peut le lancer sans demander de confirmation. Une recherche consomme tout de même des crédits, indiqués dans la colonne Coût.
- **Consomme** (`readOnlyHint: false`) : l'outil débite le quota d'export de votre offre ou votre solde d'enrichissement. Votre client peut vous demander de confirmer avant de le lancer.
- **Aucun outil n'est destructif** (`destructiveHint: false` partout) : le serveur ne modifie ni ne supprime rien chez vous.
- **`idempotentHint`** : rappeler l'outil avec les mêmes paramètres ne change rien de plus. **`openWorldHint`** : l'outil interroge le service Basile, hors de votre client.
- **Comptez avant d'extraire** : `basile_count` est gratuit et exact, alors que le total rendu par une recherche s'arrête à 100 000.

## Recherche et comptage

Compter gratuitement, chercher des personnes et des entreprises, trouver les valeurs valides des filtres.

| Outil | Titre | Coût | Nature |
| --- | --- | --- | --- |
| [`basile_count`](#basile_count) | Compter sans extraire | Gratuit | lecture seule |
| [`basile_search_people`](#basile_search_people) | Chercher des personnes | 1 crédit par fiche renvoyée | lecture seule |
| [`basile_search_companies`](#basile_search_companies) | Chercher des entreprises | 1 crédit par fiche renvoyée | lecture seule |
| [`basile_activity_suggest`](#basile_activity_suggest) | Suggérer une activité (IDs concept) | Gratuit | lecture seule |
| [`basile_suggest`](#basile_suggest) | Autocomplete (villes, rôles, employeurs, noms…) | Gratuit | lecture seule |

### basile_count

**Compter sans extraire** · Gratuit · lecture seule

Rend le nombre total de résultats pour des filtres, sans rien extraire. Le total est exact, jamais plafonné, et le comptage ne consomme aucun crédit. Pour les entreprises, rend aussi le nombre de points de vente (fiches Google Maps) derrière les sociétés. À utiliser avant toute recherche ou tout export, pour dimensionner la demande.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `kind` | `"people" \| "companies"` | oui | `people` pour les personnes, `companies` pour les entreprises. |
| `filters` | `object` | oui | Les filtres de la recherche, les mêmes que pour `basile_search_people` et `basile_search_companies`. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

### basile_search_people

**Chercher des personnes** · 1 crédit par fiche renvoyée · lecture seule

Cherche des personnes dans Basile : dirigeants du registre légal et profils LinkedIn, avec des filtres sur le secteur, le poste, le mandat, la séniorité, la fonction, les compétences, la formation, l'ancienneté, la taille de l'employeur et la géographie. Rend les fiches de la page et un curseur pour la suivante. Le total renvoyé s'arrête à 100 000 : pour un total exact, utiliser `basile_count`. Quand une recherche par employeur ou par SIREN ne trouve rien d'exact, le serveur tente une récupération ou explique pourquoi.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `filters` | `object` | oui | Filtres sur les personnes. Un filtre texte s'écrit `{"include": [...], "exclude": [...]}` ; deux filtres différents se combinent en ET. |
| `limit` | `integer, 1 à 1 000` | non | Nombre de fiches à renvoyer, 25 par défaut. |
| `paginationToken` | `string` | non | Curseur de la page suivante, rendu par l'appel précédent. La pagination demande un abonnement actif. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

### basile_search_companies

**Chercher des entreprises** · 1 crédit par fiche renvoyée · lecture seule

Cherche des entreprises dans Basile, en croisant le registre légal, les pages LinkedIn et les fiches Google Maps, avec des filtres sur l'activité, le code NAF, la géographie, l'effectif, le capital, la forme juridique, la date de création, les procédures collectives, la convention collective, les technologies du site et les avis Google. Rend le nombre de sociétés et celui de leurs points de vente. 25 fiches par défaut, 1 000 au plus par appel, avec pagination. Le total renvoyé s'arrête à 100 000 : pour un total exact, utiliser `basile_count`.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `filters` | `object` | oui | Filtres sur les entreprises, même forme que pour les personnes. |
| `limit` | `integer, 1 à 1 000` | non | Nombre de fiches à renvoyer, 25 par défaut. |
| `paginationToken` | `string` | non | Curseur de la page suivante, rendu par l'appel précédent. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

### basile_activity_suggest

**Suggérer une activité (IDs concept)** · Gratuit · lecture seule

Trouve les identifiants d'activité qui correspondent à un mot (« restaurant », « plomberie »). Chaque identifiant réunit les codes NAF, les catégories Google et les secteurs LinkedIn d'un même métier. Sert à remplir le filtre `activity`, pour les personnes comme pour les entreprises.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `q` | `string` | oui | Le métier ou l'activité cherchée, par exemple « boulangerie » ou « avocat ». |
| `limit` | `integer, 1 à 50` | non | Nombre de suggestions. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

### basile_suggest

**Autocomplete (villes, rôles, employeurs, noms…)** · Gratuit · lecture seule

Propose les valeurs valides d'un filtre avant de chercher. Personnes : villes, employeurs, intitulés de poste, compétences, langues, formations, noms, nationalités, séniorités, tranches d'ancienneté, bornes d'âge et de nombre de mandats. Entreprises : nom, ville, forme juridique, SIREN. Pour une activité ou un métier, `basile_activity_suggest` est plus adapté.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `field` | `string (16 valeurs)` | oui | Le champ à compléter : `people_cities`, `people_companies`, `people_roles`, `people_skills`, `people_languages`, `people_education`, `people_names`, `people_nationalities`, `people_seniorities`, `people_tenure_buckets`, `people_age_bounds`, `people_mandate_count_bounds`, `company_name`, `company_city`, `company_legal_form` ou `company_siren`. |
| `q` | `string` | non | Le début de la valeur cherchée. Inutile pour les séniorités, les tranches d'ancienneté et les bornes. |
| `limit` | `integer, 1 à 50` | non | Nombre de suggestions, 50 au plus. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

## Fiches

La fiche complète d'une personne ou d'une entreprise, toutes sources réunies.

| Outil | Titre | Coût | Nature |
| --- | --- | --- | --- |
| [`basile_get_entity`](#basile_get_entity) | Fiche détaillée d'une personne / entreprise | 1 crédit par appel | lecture seule |

### basile_get_entity

**Fiche détaillée d'une personne / entreprise** · 1 crédit par appel · lecture seule

Rend la fiche complète d'une personne ou d'une entreprise à partir de son identifiant, renvoyé par une recherche. Personne : les colonnes de l'export CSV. Entreprise : une fiche par source (registre, LinkedIn, Google Maps) et, pour le registre, la situation de procédure collective d'après les jugements publiés au BODACC, l'historique des jugements, les conventions collectives (IDCC) et le numéro de TVA intracommunautaire. Chaque appel est facturé, même pour une fiche déjà renvoyée par une recherche : pour plusieurs fiches, `basile_export` coûte autant et rend tout d'un coup.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `kind` | `"people" \| "companies"` | oui | `people` pour une personne, `companies` pour une entreprise. |
| `id` | `string` | oui | L'identifiant de la fiche, renvoyé par `basile_search_people` ou `basile_search_companies`. |
| `full` | `boolean` | non | Fiche complète, `true` par défaut. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

## Export

Export CSV complet, dans la conversation jusqu'à 500 lignes, en fichier à télécharger au-delà.

| Outil | Titre | Coût | Nature |
| --- | --- | --- | --- |
| [`basile_export`](#basile_export) | Exporter en CSV (consomme du quota) | Quota d'export de l'offre, au nombre de lignes | consomme |
| [`basile_export_status`](#basile_export_status) | Suivre un export fichier et récupérer son lien | Gratuit | lecture seule |

### basile_export

**Exporter en CSV (consomme du quota)** · Quota d'export de l'offre, au nombre de lignes · consomme

Exporte un CSV complet (70 colonnes pour les entreprises, 92 pour les personnes), par filtres ou par liste d'identifiants, avec les colonnes de procédure collective et de convention collective. Le serveur compte d'abord, gratuitement : jusqu'à 500 lignes, le CSV arrive dans la conversation ; au-delà, Basile construit un fichier et rend un `jobId` à suivre avec `basile_export_status`. Le fichier est plafonné par l'offre (20 000 lignes en offre API, 50 000 en offre Agence). Pour les entreprises, le mode `locations` rend une ligne par point de vente Google au lieu d'une ligne par entreprise.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `kind` | `"people" \| "companies"` | oui | `people` pour les personnes, `companies` pour les entreprises. |
| `filters` | `object` | non | Les filtres de la recherche à exporter. Donner `filters` ou `ids`. |
| `ids` | `string[]` | non | Une liste d'identifiants précis à exporter, à la place des filtres. |
| `mode` | `"companies" \| "locations"` | non | Entreprises seulement : `companies` (une ligne par entreprise, par défaut) ou `locations` (une ligne par point de vente Google). |

Annotations : `readOnlyHint: false`, `destructiveHint: false`, `idempotentHint: false`, `openWorldHint: true`.

### basile_export_status

**Suivre un export fichier et récupérer son lien** · Gratuit · lecture seule

Suit un export fichier lancé par `basile_export` et rend, dès qu'il est prêt, un lien de téléchargement direct valable environ une heure. Attend jusqu'à 40 secondes environ : si le fichier n'est pas fini, il suffit de rappeler l'outil avec le même `jobId`, la construction continue. Ne consomme rien : le quota est débité au lancement de l'export. Le fichier reste aussi disponible dans l'application Basile, onglet Exports.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `jobId` | `string` | oui | L'identifiant rendu par `basile_export`. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

## Enrichissement

L'e-mail professionnel ou le numéro de portable d'une personne, payé sur le solde d'enrichissement.

| Outil | Titre | Coût | Nature |
| --- | --- | --- | --- |
| [`basile_enrich_person`](#basile_enrich_person) | Trouver l'e-mail ou le numéro d'une personne (payé sur le solde) | 0,05 € HT l'e-mail trouvé, 0,50 € HT le numéro trouvé, rien si introuvable | consomme |
| [`basile_enrichment_status`](#basile_enrichment_status) | Suivre une demande d'enrichissement | Gratuit | lecture seule |
| [`basile_enrichment_balance`](#basile_enrichment_balance) | Solde et prix de l'enrichissement | Gratuit | lecture seule |

### basile_enrich_person

**Trouver l'e-mail ou le numéro d'une personne (payé sur le solde)** · 0,05 € HT l'e-mail trouvé, 0,50 € HT le numéro trouvé, rien si introuvable · consomme

Trouve l'e-mail professionnel et/ou le numéro de portable d'une personne, qu'elle soit dans Basile ou non, à partir de son nom et de sa société. Pour l'e-mail, donner le domaine ou le nom de la société ; pour le numéro, le profil LinkedIn est nécessaire. Payé sur le solde d'enrichissement, jamais sur les crédits de recherche, et seulement si la coordonnée est trouvée. Une coordonnée déjà trouvée par votre compte est resservie gratuitement. Attend le résultat jusqu'à 25 secondes environ ; une demande encore en cours se suit avec `basile_enrichment_status`, sans être relancée ni refacturée.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `full_name` | `string` | non | Nom complet de la personne, ou bien `first_name` et `last_name`. |
| `first_name` | `string` | non | Prénom, avec `last_name`, si `full_name` n'est pas donné. |
| `last_name` | `string` | non | Nom, avec `first_name`. |
| `company_name` | `string` | non | Nom de la société. |
| `domain` | `string` | non | Domaine de la société (par exemple `acme.fr`). Une adresse de site ou un e-mail sont acceptés. |
| `linkedin_url` | `string` | non | Adresse du profil LinkedIn personnel. Obligatoire pour le numéro. |
| `find` | `"email" \| "phone" \| "both"` | non | Ce qui est cherché : `email` (par défaut), `phone` ou `both`. |
| `request_id` | `string` | non | Identifiant de demande facultatif : la même demande rejouée avec le même `request_id` n'est ni relancée ni refacturée. |

Annotations : `readOnlyHint: false`, `destructiveHint: false`, `idempotentHint: false`, `openWorldHint: true`.

### basile_enrichment_status

**Suivre une demande d'enrichissement** · Gratuit · lecture seule

Rend le résultat d'une demande lancée par `basile_enrich_person` et encore en cours. Ne relance aucune recherche et ne débite rien de plus : le prix est débité une seule fois, quand la coordonnée est trouvée.

| Paramètre | Type | Requis | Description |
| --- | --- | --- | --- |
| `id` | `string` | oui | L'identifiant rendu par `basile_enrich_person`. |

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

### basile_enrichment_balance

**Solde et prix de l'enrichissement** · Gratuit · lecture seule

Rend le solde d'enrichissement du compte, les prix (e-mail trouvé, numéro trouvé, rien si introuvable) et le lien de recharge. Sert à estimer le coût avant d'enrichir plusieurs personnes.

Aucun paramètre.

Annotations : `readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: true`.

---

## English

Version 0.2.1 of the Basile MCP server exposes **11 tools** in **4 families**. Every tool declares a title and the `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint` annotations. **Read-only** tools only read the Basile database, though searches still use credits; tools that **consume** use the plan export quota or the enrichment balance, so your client may ask you to confirm. No tool is destructive. Full parameter descriptions are in the French section above and in [`tools.json`](../tools.json).

| Family | Tool | What it does | Main parameters | Cost | Type |
| --- | --- | --- | --- | --- | --- |
| Search and count | `basile_count` | Exact number of results for a people or company search, plus the number of Google points of sale for companies. | `kind`, `filters` | Free | read-only |
| Search and count | `basile_search_people` | Search people: registered officers and LinkedIn profiles. | `filters`, `limit`, `paginationToken` | 1 credit per record returned | read-only |
| Search and count | `basile_search_companies` | Search companies: register, LinkedIn pages, Google Maps listings. | `filters`, `limit`, `paginationToken` | 1 credit per record returned | read-only |
| Search and count | `basile_activity_suggest` | Activity IDs from a keyword (NAF codes, Google categories, LinkedIn industries). | `q`, `limit` | Free | read-only |
| Search and count | `basile_suggest` | Valid filter values: cities, job titles, employers, schools, legal forms, SIREN… | `field`, `q`, `limit` | Free | read-only |
| Records | `basile_get_entity` | Full record of a person or a company. | `kind`, `id`, `full` | 1 credit per call | read-only |
| Export | `basile_export` | Full CSV export; up to 500 rows inline, a downloadable file beyond. | `kind`, `filters`, `ids`, `mode` | Plan export quota, per row | consumes |
| Export | `basile_export_status` | Tracks a file export and returns its download link (valid about one hour). | `jobId` | Free | read-only |
| Enrichment | `basile_enrich_person` | Finds a person's work email and/or mobile number from name and company. | `full_name`, `company_name`, `domain`, `linkedin_url`, `find` | €0.05 per email found, €0.50 per number found (excl. VAT), nothing if not found | consumes |
| Enrichment | `basile_enrichment_status` | Result of a pending enrichment request. | `id` | Free | read-only |
| Enrichment | `basile_enrichment_balance` | Enrichment balance, prices and top-up link. | none | Free | read-only |
