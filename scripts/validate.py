"""Valide les fichiers publics du dépôt.

- server.json contre le schéma officiel du registre MCP référencé par son champ "$schema" ;
- glama.json contre le schéma de Glama référencé par son champ "$schema" ;
- chaque fichier JSON de examples/ : JSON valide et pointant vers l'adresse publique du serveur.

Usage : python scripts/validate.py
Dépendance : jsonschema (pip install jsonschema)
"""

from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

from jsonschema import Draft7Validator, FormatChecker

RACINE = Path(__file__).resolve().parent.parent
ADRESSE_SERVEUR = "https://mcp.basile.cc/mcp"
SCHEMAS_AUTORISES = (
    "https://static.modelcontextprotocol.io/schemas/",
    "https://glama.ai/mcp/schemas/",
)


def charger_json(chemin: Path) -> dict:
    with chemin.open(encoding="utf-8") as f:
        return json.load(f)


def telecharger_schema(url: str) -> dict:
    if not url.startswith(SCHEMAS_AUTORISES):
        raise ValueError(f"schéma inattendu : {url}")
    requete = urllib.request.Request(url, headers={"User-Agent": "basile-mcp-validate"})
    with urllib.request.urlopen(requete, timeout=30) as reponse:
        return json.load(reponse)


def valider_contre_schema(chemin: Path) -> list[str]:
    document = charger_json(chemin)
    url = document.get("$schema")
    if not url:
        return [f"{chemin.name} : champ $schema absent"]
    schema = telecharger_schema(url)
    validateur = Draft7Validator(schema, format_checker=FormatChecker())
    return [
        f"{chemin.name} : {'/'.join(str(p) for p in e.absolute_path) or '(racine)'} : {e.message}"
        for e in sorted(validateur.iter_errors(document), key=lambda e: list(e.absolute_path))
    ]


def controles_server_json(chemin: Path) -> list[str]:
    document = charger_json(chemin)
    erreurs = []
    description = document.get("description", "")
    # Le registre plafonne la description à 100 caractères ; on garde aussi la marge en octets.
    if len(description.encode("utf-8")) > 100:
        erreurs.append(f"server.json : description de {len(description.encode('utf-8'))} octets (100 au plus)")
    if document.get("name") != "cc.basile/basile":
        erreurs.append("server.json : le nom doit rester cc.basile/basile")
    remotes = document.get("remotes", [])
    if not any(r.get("type") == "streamable-http" and r.get("url") == ADRESSE_SERVEUR for r in remotes):
        erreurs.append(f"server.json : remote streamable-http {ADRESSE_SERVEUR} absent")
    return erreurs


def controles_exemples() -> list[str]:
    erreurs = []
    fichiers = sorted((RACINE / "examples").rglob("*.json"))
    if not fichiers:
        erreurs.append("examples/ : aucun fichier JSON")
    for chemin in fichiers:
        relatif = chemin.relative_to(RACINE)
        try:
            contenu = chemin.read_text(encoding="utf-8")
            json.loads(contenu)
        except json.JSONDecodeError as e:
            erreurs.append(f"{relatif} : JSON invalide ({e})")
            continue
        if ADRESSE_SERVEUR not in contenu:
            erreurs.append(f"{relatif} : l'adresse {ADRESSE_SERVEUR} est absente")
    return erreurs


def main() -> int:
    erreurs: list[str] = []
    erreurs += valider_contre_schema(RACINE / "server.json")
    erreurs += controles_server_json(RACINE / "server.json")
    erreurs += valider_contre_schema(RACINE / "glama.json")
    erreurs += controles_exemples()
    if erreurs:
        print("Validation en échec :")
        for e in erreurs:
            print(f"  - {e}")
        return 1
    print("server.json, glama.json et examples/ sont valides.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
