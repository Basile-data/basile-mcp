# Sécurité

## Signaler une vulnérabilité

Écrivez à **contact@basile.cc**, avec « Sécurité » dans l'objet. Décrivez le problème, les étapes pour le reproduire et l'impact que vous envisagez. Nous accusons réception et revenons vers vous avec la suite donnée.

Merci de ne pas ouvrir d'issue publique pour une vulnérabilité, et de ne jamais coller de jeton, de cookie ou de donnée personnelle dans une issue.

## Périmètre

- le serveur MCP hébergé, `https://mcp.basile.cc/mcp`, et son parcours de connexion OAuth ;
- les fichiers de ce dépôt : documentation, `server.json`, `glama.json`, `tools.json` et exemples de configuration.

Le serveur est hébergé et mis à jour en continu : seule la version en ligne est prise en charge.

## Bonnes pratiques

- Ajoutez Basile uniquement avec l'adresse officielle `https://mcp.basile.cc/mcp`.
- Vérifiez que la page de connexion qui s'ouvre est bien sur un domaine `basile.cc` avant de saisir vos identifiants.
- Le serveur n'a besoin d'aucune clé : ne mettez jamais de jeton dans un fichier de configuration partagé ou versionné (par exemple un `.mcp.json` commité).

---

## Security (English)

To report a vulnerability, email **contact@basile.cc** with "Security" in the subject line, including a description, steps to reproduce and the expected impact. Please do not open a public issue for a vulnerability, and never paste tokens, cookies or personal data into an issue.

Scope: the hosted MCP server at `https://mcp.basile.cc/mcp` with its OAuth sign-in flow, and the files in this repository. The server is hosted and continuously updated, so only the live version is supported. Only add Basile with the official URL, check that the sign-in page is served from a `basile.cc` domain, and never commit a token to a shared configuration file: the server needs no key.
