<p align="center">
  <a href="https://www.basile.cc"><img src="assets/basile-wordmark.png" alt="Basile, la base de données B2B française" width="300"></a>
</p>

# Basile MCP : la base de données B2B française dans Claude, ChatGPT et Cursor

**Basile MCP est le serveur MCP de base de données B2B française** : il connecte Claude, ChatGPT, Cursor, VS Code et tout client compatible MCP à [Basile](https://www.basile.cc), pour trouver des entreprises françaises, leurs dirigeants et leurs contacts en une phrase. Vous demandez une liste en français, l'IA interroge Basile, compte, filtre et vous rend le fichier.

**Français** · [English](#english)

| | |
|---|---|
| Adresse du serveur | `https://mcp.basile.cc/mcp` |
| Transport | Streamable HTTP (serveur distant, rien à installer) |
| Connexion | OAuth avec votre compte Basile, sans clé d'API |
| Facturation | comme une clé d'API : 1 crédit par fiche renvoyée, comptages gratuits |
| Registre officiel MCP | `cc.basile/basile` |
| Site | [www.basile.cc](https://www.basile.cc) |

## Sommaire

- [Ce que contient Basile](#ce-que-contient-basile)
- [Exemples de demandes](#exemples-de-demandes)
- [Connexion et facturation](#connexion-et-facturation)
- [Installation par client](#installation-par-client)
- [Outils du serveur MCP](#outils-du-serveur-mcp)
- [Offres et limites](#offres-et-limites)
- [Questions fréquentes](#questions-fréquentes)
- [Licence](#licence)
- [English](#english)

## Ce que contient Basile

Basile est une base de données B2B construite pour la France. Sa force : elle **croise** plusieurs sources pour chaque entreprise et chaque personne, là où beaucoup de bases n'en ont qu'une (LinkedIn seul, ou le registre légal seul).

| Source | Ce que vous obtenez |
|---|---|
| Registre légal des entreprises | SIREN, raison sociale, code NAF, forme juridique, capital, date de création, effectif, siège, dirigeants et mandats, entrepreneurs individuels compris |
| Procédures et conventions | procédures collectives (liquidation, redressement, sauvegarde) d'après les jugements publiés au BODACC, convention collective (IDCC), numéro de TVA intracommunautaire |
| Comptes annuels | chiffre d'affaires, résultat et autres chiffres publiés, sur la fiche entreprise |
| LinkedIn | profils (poste, séniorité, fonctions, compétences, langues, formation, ancienneté) et pages entreprises |
| Google Maps | établissements et points de vente : catégorie, adresse, téléphone, note, nombre d'avis |
| Sites web | e-mails et téléphones publiés par les entreprises, technologies utilisées (Shopify, WordPress…) |

Tout est rapproché : une fiche Google Maps mène à la société du registre, à ses dirigeants et à leurs profils LinkedIn. Et quand une coordonnée manque, l'enrichissement trouve l'e-mail professionnel ou le numéro de portable d'une personne.

**Filtres sur les personnes** : secteur d'activité, intitulé de poste, mandat légal (gérant, président, directeur général…), séniorité, fonction, compétences, langues, formation, ancienneté au poste, taille de l'entreprise, ville, région, pays, profil LinkedIn.

**Filtres sur les entreprises** : activité, code NAF, nom, domaine web, département, code postal, ville, région, effectif, capital, forme juridique, date de création, création récente, procédure collective, convention collective, technologies du site, note et avis Google, ouverture le dimanche, présence d'un e-mail, entreprise active ou cessée.

## Exemples de demandes

Écrivez simplement ce que vous cherchez. L'IA choisit les bons outils, compte d'abord (gratuit), puis extrait ce dont vous avez besoin.

**Trouver des prospects**

- « Combien y a-t-il d'entreprises de plomberie actives en Haute-Garonne ? Exporte-les en CSV avec leur site web et leur téléphone. »
- « Liste les e-commerçants français sous Shopify qui ont entre 10 et 50 salariés. »
- « Trouve les restaurants d'Auvergne-Rhône-Alpes notés 4,5 ou plus sur Google, avec au moins 100 avis. »
- « Liste les sociétés de conseil en informatique créées ces trois derniers mois en Île-de-France. »
- « Quelles entreprises du BTP du Rhône sont en redressement judiciaire en cours ? »

**Trouver des dirigeants et des décideurs**

- « Trouve les dirigeants (CEO, DG, présidents) des éditeurs de logiciels de 50 à 200 salariés en Île-de-France. »
- « Qui sont les gérants en poste des agences immobilières de Bordeaux ? »
- « Pour cette liste de SIREN, retrouve les dirigeants actuels de chaque société. »
- « Trouve les directeurs commerciaux des entreprises industrielles de plus de 100 salariés dans les Hauts-de-France. »

**Enrichir des contacts**

- « Trouve l'e-mail professionnel de [prénom nom], directrice marketing chez [société]. »
- « Pour ces 30 dirigeants, trouve leur e-mail et leur portable. Annonce-moi d'abord le coût maximal. »
- « Quel est mon solde d'enrichissement ? »

## Connexion et facturation

- **Adresse** : `https://mcp.basile.cc/mcp`, en Streamable HTTP.
- **Connexion** : OAuth. Au premier appel, votre client ouvre la page de connexion Basile ; vous vous connectez avec votre compte habituel et vous autorisez l'accès. Aucune clé à copier, à coller ni à stocker : le client s'enregistre tout seul (enregistrement dynamique OAuth, PKCE).
- **Votre compte** : le serveur agit en votre nom, avec votre offre, vos crédits et vos plafonds.
- **Offre requise** : une offre avec accès API (offre API ou Agence, voir [Offres et limites](#offres-et-limites)). Sans elle, seul l'enrichissement payé sur le solde fonctionne.
- **Facturation** : le serveur MCP est facturé comme une clé d'API. Chaque fiche renvoyée par une recherche consomme 1 crédit, et la consultation d'une fiche complète 1 crédit par appel. **Les comptages sont gratuits** et exacts : demandez toujours combien il y a de résultats avant d'extraire.
- **Enrichissement** : payé sur le solde d'enrichissement, 0,05 € HT par e-mail trouvé, 0,50 € HT par numéro trouvé, rien si rien n'est trouvé. Une coordonnée déjà trouvée par votre compte est resservie gratuitement.
- **État du service** : `https://mcp.basile.cc/health` répond publiquement quand le serveur tourne.

## Installation par client

Le serveur est hébergé : il suffit de déclarer son adresse dans votre client, puis de vous connecter avec votre compte Basile. Des fichiers prêts à copier sont dans [examples/](examples/). Les libellés des menus cités ci-dessous peuvent varier selon la version et la langue de votre client.

### Claude (claude.ai, Claude Desktop, applications mobiles)

Basile s'ajoute comme **connecteur personnalisé** :

1. Ouvrez **Customize**, puis **Connectors**.
2. Cliquez sur **+ Add**, puis **Add custom connector**.
3. Nom : `Basile`. URL : `https://mcp.basile.cc/mcp`. Cliquez sur **Continue**.
4. Gardez l'authentification détectée (OAuth), cliquez sur **Add**, puis connectez-vous avec votre compte Basile.
5. Dans une conversation, activez Basile avec le bouton **+**, puis **Connectors**.

Le connecteur ajouté depuis votre compte est disponible sur claude.ai, dans Claude Desktop et sur mobile. Sur les offres Team et Enterprise, un propriétaire l'ajoute d'abord dans **Organization settings**, **Connectors** (**Add**, **Custom**, **Web**), puis chaque membre clique sur **Connect**. L'offre gratuite de Claude est limitée à un connecteur personnalisé.

### Claude Code

```bash
claude mcp add --transport http basile https://mcp.basile.cc/mcp
```

Lancez ensuite `/mcp` dans Claude Code, choisissez `basile` et connectez-vous dans le navigateur. Ajoutez `--scope user` pour l'avoir dans tous vos projets, ou `--scope project` pour écrire un fichier `.mcp.json` partagé avec votre équipe ([exemple](examples/claude-code/.mcp.json)).

### ChatGPT

Les serveurs MCP personnalisés passent par le **mode développeur** de ChatGPT, sur le web et avec une offre payante.

1. Dans **Settings**, **Apps**, **Advanced settings**, activez **Developer mode**.
2. Cliquez sur **Create app**. Nom : `Basile`. URL : `https://mcp.basile.cc/mcp`. Authentification : **OAuth**.
3. Connectez-vous avec votre compte Basile et autorisez l'accès.
4. Dans une nouvelle conversation, choisissez Basile parmi les outils du mode développeur.

ChatGPT demande une confirmation avant les outils qui consomment (export, enrichissement). Sur les offres Business et Enterprise, un administrateur doit parfois autoriser les applications personnalisées.

### Cursor

Dans `~/.cursor/mcp.json` (tous vos projets) ou `.cursor/mcp.json` (un seul projet) :

```json
{
  "mcpServers": {
    "basile": {
      "url": "https://mcp.basile.cc/mcp"
    }
  }
}
```

Ouvrez ensuite les réglages MCP de Cursor et lancez la connexion du serveur `basile`. Pour une installation en un clic, collez ce lien dans votre navigateur :

```text
cursor://anysphere.cursor-deeplink/mcp/install?name=basile&config=eyJ1cmwiOiJodHRwczovL21jcC5iYXNpbGUuY2MvbWNwIn0=
```

### VS Code (GitHub Copilot)

Dans `.vscode/mcp.json` (espace de travail) ou dans le `mcp.json` de votre profil (commande **MCP: Open User Configuration**) :

```json
{
  "servers": {
    "basile": {
      "type": "http",
      "url": "https://mcp.basile.cc/mcp"
    }
  }
}
```

Ou en ligne de commande (macOS, Linux) :

```bash
code --add-mcp '{"name":"basile","type":"http","url":"https://mcp.basile.cc/mcp"}'
```

Au démarrage du serveur, VS Code vous propose de vous connecter. Utilisez ensuite Basile depuis Copilot Chat en mode agent.

### Windsurf (Devin Desktop)

Ouvrez le fichier de configuration MCP depuis le panneau Cascade (menu **…**, puis **Open MCP config file**). Il se trouve dans `~/.config/devin/mcp_config.json` sur macOS et Linux, et dans `%APPDATA%\devin\mcp_config.json` sous Windows ; les anciennes versions de Windsurf utilisent `~/.codeium/windsurf/mcp_config.json`.

```json
{
  "mcpServers": {
    "basile": {
      "serverUrl": "https://mcp.basile.cc/mcp"
    }
  }
}
```

### Clients qui ne lancent que des serveurs locaux (mcp-remote)

Si votre client ne sait lancer que des serveurs locaux (stdio), passez par `mcp-remote`, un pont open source qui n'est pas édité par Basile. Il demande Node.js 18 ou plus récent.

```json
{
  "mcpServers": {
    "basile": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.basile.cc/mcp"]
    }
  }
}
```

Au premier lancement, la page de connexion Basile s'ouvre dans votre navigateur. Quand votre client gère les serveurs distants, préférez la connexion directe décrite plus haut.

### Autres clients

Tout client qui gère les serveurs MCP distants (Streamable HTTP et OAuth) fonctionne avec la même adresse : `https://mcp.basile.cc/mcp`.

## Outils du serveur MCP

Le serveur expose onze outils. Chacun annonce son coût dans sa description, pour que l'IA puisse vous prévenir avant de consommer.

| Outil | Ce qu'il fait | Paramètres principaux | Coût |
|---|---|---|---|
| `basile_count` | Compte les résultats d'une recherche de personnes ou d'entreprises. Total exact, et pour les entreprises le nombre de points de vente Google. | `kind`, `filters` | Gratuit |
| `basile_search_people` | Cherche des personnes : dirigeants du registre légal et profils LinkedIn. 25 fiches par défaut, 1 000 au plus par appel, avec pagination. | `filters`, `limit`, `paginationToken` | 1 crédit par fiche renvoyée |
| `basile_search_companies` | Cherche des entreprises : registre légal, pages LinkedIn et fiches Google Maps. | `filters`, `limit`, `paginationToken` | 1 crédit par fiche renvoyée |
| `basile_activity_suggest` | Trouve l'identifiant d'une activité à partir d'un mot (« boulangerie », « avocat »), en réunissant codes NAF, catégories Google et secteurs LinkedIn. | `q`, `limit` | Gratuit |
| `basile_suggest` | Propose les valeurs valides d'un filtre : villes, intitulés de poste, employeurs, écoles, formes juridiques, SIREN… | `field`, `q`, `limit` | Gratuit |
| `basile_get_entity` | Fiche complète d'une personne ou d'une entreprise : toutes les sources, registre, procédures, conventions collectives, TVA intracommunautaire, comptes publiés. | `kind`, `id`, `full` | 1 crédit par appel |
| `basile_export` | Export CSV complet (70 colonnes pour les entreprises, 92 pour les personnes), par filtres ou par liste d'identifiants. Jusqu'à 500 lignes dans la conversation, au-delà un fichier à télécharger. Mode `locations` : une ligne par point de vente Google. | `kind`, `filters` ou `ids`, `mode` | Quota d'export de l'offre |
| `basile_export_status` | Suit un export fichier et rend son lien de téléchargement, valable environ une heure. | `jobId` | Gratuit |
| `basile_enrich_person` | Trouve l'e-mail professionnel et/ou le numéro de portable d'une personne, présente dans Basile ou non, à partir de son nom et de sa société. Le profil LinkedIn est nécessaire pour le numéro. | `full_name`, `company_name` ou `domain`, `linkedin_url`, `find` | 0,05 € HT l'e-mail trouvé, 0,50 € HT le numéro trouvé, rien si introuvable |
| `basile_enrichment_status` | Rend le résultat d'une demande d'enrichissement encore en cours, sans rien relancer ni refacturer. | `id` | Gratuit |
| `basile_enrichment_balance` | Solde d'enrichissement, prix et lien de recharge. | aucun | Gratuit |

Bon à savoir :

- **Comptez avant d'extraire.** `basile_count` est gratuit et exact ; le total renvoyé par une recherche, lui, s'arrête à 100 000.
- **Un zéro n'est jamais muet.** Quand une recherche par employeur ou par SIREN ne trouve rien d'exact, le serveur tente une récupération (nom nettoyé, SIREN du registre, page LinkedIn de la société) ou explique pourquoi, avec des pistes pour relancer.
- **Confirmation.** `basile_export` et `basile_enrich_person` sont déclarés comme des outils qui consomment : votre client peut vous demander de confirmer avant de les lancer. Les autres outils sont en lecture seule.
- **Enrichissement en lot.** Avant d'enrichir plusieurs personnes, l'IA est invitée à vous annoncer le coût maximal et à attendre votre accord.

## Offres et limites

Le serveur MCP demande une offre avec accès API. Les prix ci-dessous sont les tarifs de lancement affichés sur [www.basile.cc](https://www.basile.cc).

| | Offre API | Offre Agence |
|---|---|---|
| Prix | 79 € HT par mois | 279 € HT par mois |
| Crédits (lignes) par mois | 250 000 | 1 000 000 |
| Lignes par export fichier | 20 000 | 50 000 |
| Requêtes | 5 par seconde, 100 par minute, 2 000 par jour | 100 par seconde, 3 000 par minute, 5 000 par jour |

- L'offre Starter n'inclut pas l'accès API, donc pas le serveur MCP.
- Chaque recherche, comptage ou export compte une requête dans le plafond du jour, remis à zéro à minuit UTC. L'enrichissement n'entre dans aucun de ces plafonds.
- Jusqu'à 500 lignes, l'export arrive directement dans la conversation. Au-delà, Basile construit un fichier et vous donne un lien de téléchargement ; le fichier reste aussi disponible dans l'application, onglet Exports.
- Une recherche se pagine jusqu'à 250 000 fiches. Au-delà, découpez-la (par département, par tranche d'effectif…).
- Besoin de volumes plus élevés : écrivez à contact@basile.cc.

## Questions fréquentes

### Faut-il une clé d'API ?

Non. La connexion se fait par OAuth avec votre compte Basile : votre client ouvre la page de connexion, vous autorisez l'accès, et c'est tout.

### Le comptage est-il vraiment gratuit ?

Oui. `basile_count` ne consomme aucun crédit et rend un total exact. Il compte seulement comme une requête dans le plafond du jour de votre offre.

### Quelle offre faut-il pour utiliser le MCP ?

L'offre API ou l'offre Agence. Un compte qui n'a que du solde d'enrichissement peut utiliser les outils d'enrichissement, mais pas la recherche.

### Mon client affiche « 401 Unauthorized » ou « non autorisé »

C'est normal avant la connexion : cette réponse déclenche le parcours OAuth. Lancez la connexion depuis votre client (par exemple `/mcp` dans Claude Code). Pour vérifier que le service tourne, ouvrez `https://mcp.basile.cc/health`.

### Puis-je exporter plus de 500 lignes ?

Oui. Au-delà de 500 lignes, l'export devient un fichier à télécharger, dans la limite de votre offre (20 000 lignes par export en offre API, 50 000 en offre Agence).

### Basile couvre-t-il d'autres pays que la France ?

Basile est construit pour le marché français : registre légal français, établissements Google Maps en France, et ses filtres portent sur la France.

### Le code du serveur est-il public ?

Non. Ce dépôt contient la documentation, le fichier `server.json` du registre MCP et des exemples de configuration. Le serveur est hébergé et maintenu par Basile.

### Il me manque un filtre : que faire ?

Dites-le-nous : contact@basile.cc, ou une [demande sur ce dépôt](../../issues/new/choose). Basile évolue chaque semaine et vos demandes guident les prochains filtres.

## Licence

La documentation et les exemples de configuration de ce dépôt sont publiés sous licence [MIT](LICENSE). Le service Basile lui-même (serveur MCP hébergé, API et données) reste propriétaire : ce dépôt n'en contient pas le code. Le nom et le logo Basile ne sont pas couverts par la licence MIT.

Contact : contact@basile.cc · Sécurité : [SECURITY.md](SECURITY.md) · Nouveautés : [CHANGELOG.md](CHANGELOG.md) · Site : [www.basile.cc](https://www.basile.cc)

---

## English

**Basile MCP is the French B2B database MCP server**: a hosted, remote MCP server that connects Claude, ChatGPT, Cursor, VS Code and any MCP client to [Basile](https://www.basile.cc), so you can find French companies, their executives and their contacts with a plain-language request. Ask for a list, the AI queries Basile, counts, filters and hands you the file.

| | |
|---|---|
| Server URL | `https://mcp.basile.cc/mcp` |
| Transport | Streamable HTTP (remote, nothing to install) |
| Sign-in | OAuth with your Basile account, no API key |
| Billing | same as an API key: 1 credit per record returned, counts are free |
| Official MCP Registry | `cc.basile/basile` |
| Website | [www.basile.cc](https://www.basile.cc) |

### What is in Basile

Basile is a B2B database built for France. Many databases rely on a single source (LinkedIn only, or the company register only). Basile **cross-references** them:

- **French company register**: SIREN, legal name, NAF code, legal form, share capital, creation date, headcount, head office, officers and mandates, sole traders included;
- **Insolvency proceedings and collective agreements**: liquidation, receivership and safeguard proceedings from published court rulings, collective agreement (IDCC), EU VAT number;
- **Annual accounts**: published revenue, net income and other figures, on the company record;
- **LinkedIn**: profiles (title, seniority, functions, skills, languages, education, tenure) and company pages;
- **Google Maps**: establishments and points of sale with category, address, phone, rating and review count;
- **Websites**: emails and phone numbers published by companies, technologies used (Shopify, WordPress…).

When a contact detail is missing, enrichment finds a person's work email or mobile number.

### Example prompts

- "How many active plumbing companies are there in Haute-Garonne? Export them to CSV with website and phone."
- "Find the CEOs and managing directors of software companies with 50 to 200 employees in Île-de-France."
- "List restaurants in Auvergne-Rhône-Alpes rated 4.5 or more on Google with at least 100 reviews."
- "Which construction companies in the Rhône department are currently in receivership?"
- "Find the work email of [first name last name], marketing director at [company]."

### Setup

The server is hosted: add its URL to your client, then sign in with your Basile account. Ready-to-copy files are in [examples/](examples/).

| Client | How to add Basile |
|---|---|
| Claude (claude.ai, Desktop, mobile) | **Customize**, **Connectors**, **+ Add**, **Add custom connector**, URL `https://mcp.basile.cc/mcp` |
| Claude Code | `claude mcp add --transport http basile https://mcp.basile.cc/mcp`, then `/mcp` to sign in |
| ChatGPT | **Settings**, **Apps**, **Advanced settings**, enable **Developer mode**, then **Create app** with OAuth |
| Cursor | `~/.cursor/mcp.json`: `{"mcpServers": {"basile": {"url": "https://mcp.basile.cc/mcp"}}}` |
| VS Code | `.vscode/mcp.json`: `{"servers": {"basile": {"type": "http", "url": "https://mcp.basile.cc/mcp"}}}` |
| Windsurf (Devin Desktop) | `mcp_config.json`: `{"mcpServers": {"basile": {"serverUrl": "https://mcp.basile.cc/mcp"}}}` |
| stdio-only clients | `npx -y mcp-remote https://mcp.basile.cc/mcp` (Node.js 18+) |

Menu labels may vary with your client version.

### Tools

| Tool | What it does | Cost |
|---|---|---|
| `basile_count` | Exact number of results for a people or company search | Free |
| `basile_search_people` | Search people: registered officers and LinkedIn profiles | 1 credit per record |
| `basile_search_companies` | Search companies: register, LinkedIn pages, Google Maps listings | 1 credit per record |
| `basile_activity_suggest` | Activity IDs from a keyword (NAF codes, Google categories, LinkedIn industries) | Free |
| `basile_suggest` | Valid filter values: cities, job titles, employers, schools, legal forms, SIREN… | Free |
| `basile_get_entity` | Full record of a person or a company | 1 credit per call |
| `basile_export` | Full CSV export; up to 500 rows inline, a downloadable file beyond | Plan export quota |
| `basile_export_status` | Tracks a file export and returns its download link (valid about one hour) | Free |
| `basile_enrich_person` | Finds a person's work email and/or mobile number from name and company | €0.05 per email found, €0.50 per number found (excl. VAT), nothing if not found |
| `basile_enrichment_status` | Result of a pending enrichment request | Free |
| `basile_enrichment_balance` | Enrichment balance, prices and top-up link | Free |

### Plans and limits

The MCP server requires a plan with API access: **API** (€79 excl. VAT per month, 250,000 credits per month, 20,000 rows per file export, 2,000 requests per day) or **Agency** (€279 excl. VAT per month, 1,000,000 credits per month, 50,000 rows per file export, 5,000 requests per day). Launch prices as shown on [www.basile.cc](https://www.basile.cc). Daily limits reset at midnight UTC; enrichment does not count toward them.

### FAQ

- **Do I need an API key?** No. Sign-in uses OAuth with your Basile account.
- **Are counts free?** Yes. `basile_count` uses no credits and returns an exact total; it only counts as one request toward your daily limit.
- **My client shows "401 Unauthorized".** Expected before sign-in: it starts the OAuth flow. Check the service at `https://mcp.basile.cc/health`.
- **Can I export more than 500 rows?** Yes. Beyond 500 rows the export becomes a downloadable file, up to your plan's limit.
- **Is the server source code public?** No. This repository holds documentation, the MCP Registry `server.json` and client configuration examples.

### License

Documentation and configuration examples in this repository are released under the [MIT License](LICENSE). The Basile service itself (hosted MCP server, API and data) is proprietary and its code is not included here. The Basile name and logo are not covered by the MIT License.

Contact: contact@basile.cc · Security: [SECURITY.md](SECURITY.md) · Website: [www.basile.cc](https://www.basile.cc)
