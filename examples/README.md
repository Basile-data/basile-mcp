# Configurations prêtes à copier

Toutes ces configurations pointent vers le même serveur hébergé, `https://mcp.basile.cc/mcp`. Aucune ne contient de clé : la connexion se fait par OAuth avec votre compte Basile, au premier appel.

| Client | Fichier d'exemple | Où le placer |
|---|---|---|
| Claude Code | [claude-code/.mcp.json](claude-code/.mcp.json) | `.mcp.json` à la racine du projet (portée « project ») |
| Cursor | [cursor/.cursor/mcp.json](cursor/.cursor/mcp.json) | `.cursor/mcp.json` dans un projet, ou `~/.cursor/mcp.json` pour tous les projets |
| VS Code | [vscode/.vscode/mcp.json](vscode/.vscode/mcp.json) | `.vscode/mcp.json` dans un espace de travail, ou `mcp.json` du profil (**MCP: Open User Configuration**) |
| Devin Desktop (anciennement Windsurf) | [devin-desktop/mcp_config.json](devin-desktop/mcp_config.json) | `~/.config/devin/mcp_config.json` (macOS, Linux), `%APPDATA%\devin\mcp_config.json` (Windows) ; `~/.codeium/windsurf/mcp_config.json` pour les anciennes versions de Windsurf |
| Clients stdio (via mcp-remote) | [mcp-remote/claude_desktop_config.json](mcp-remote/claude_desktop_config.json) | par exemple `claude_desktop_config.json` de Claude Desktop : `~/Library/Application Support/Claude/` (macOS), `%APPDATA%\Claude\` (Windows) |

Si le fichier existe déjà, ajoutez seulement l'entrée `basile` à côté de vos autres serveurs. Les dossiers `.cursor/` et `.vscode/` reproduisent l'emplacement attendu dans un projet : vous pouvez les copier tels quels à sa racine.

Devin Desktop accepte `url` (agents Devin Local et Cascade). Si une ancienne version de Windsurf ne reconnaît pas l'entrée, remplacez `url` par `serverUrl`.

## Sans fichier

**Claude Code**, en une commande :

```bash
claude mcp add --transport http basile https://mcp.basile.cc/mcp
```

Ajoutez `--scope user` pour tous vos projets, puis lancez `/mcp` dans Claude Code pour vous connecter.

**VS Code**, en une commande (macOS, Linux) :

```bash
code --add-mcp '{"name":"basile","type":"http","url":"https://mcp.basile.cc/mcp"}'
```

**Devin Desktop**, avec la CLI de Devin :

```bash
devin mcp add -s user basile https://mcp.basile.cc/mcp
devin mcp login basile
```

**Cursor**, lien d'installation à coller dans le navigateur :

```text
cursor://anysphere.cursor-deeplink/mcp/install?name=basile&config=eyJ1cmwiOiJodHRwczovL21jcC5iYXNpbGUuY2MvbWNwIn0=
```

**Claude (claude.ai, Desktop, mobile)** : **Customize**, **Connectors**, **+ Add**, **Add custom connector**, puis l'URL `https://mcp.basile.cc/mcp`.

**ChatGPT** : **Settings**, **Apps**, **Advanced settings**, activez **Developer mode**, puis **Create app** avec l'URL `https://mcp.basile.cc/mcp` et l'authentification OAuth.

Le détail de chaque client est dans le [README](../README.md#démarrage-rapide).

---

## English

Every file here points to the same hosted server, `https://mcp.basile.cc/mcp`. None of them holds a key: you sign in with your Basile account through OAuth on first use. Copy the file for your client to the location shown in the table above, or merge the `basile` entry into your existing configuration. The `.cursor/` and `.vscode/` folders mirror where the file goes in a project. Devin Desktop (formerly Windsurf) reads `url`; older Windsurf versions may expect `serverUrl`. See the [README](../README.md#quick-start) for step-by-step instructions.
