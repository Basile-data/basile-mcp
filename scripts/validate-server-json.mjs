#!/usr/bin/env node
// Valide les fichiers publics du dépôt.
//
//   node scripts/validate-server-json.mjs                 schémas et cohérence
//   node scripts/validate-server-json.mjs --check-icons   vérifie aussi que les icônes de server.json répondent
//
// - server.json contre le schéma officiel du registre MCP désigné par son champ "$schema",
//   plus les règles du registre que le schéma n'exprime pas ;
// - glama.json contre le schéma de Glama désigné par son champ "$schema" ;
// - tools.json : même nom, titre, version et adresse que server.json ;
// - chaque fichier JSON de examples/ : JSON valide, qui pointe vers l'adresse publique du serveur.
//
// Dépendances : ajv et ajv-formats, versions figées dans package.json (npm ci).

import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const NOM = 'cc.basile/basile'
const ADRESSE_SERVEUR = 'https://mcp.basile.cc/mcp'
// Les schémas sont téléchargés puis appliqués : seuls ces hôtes peuvent les servir.
const HOTES_SCHEMAS = new Set(['static.modelcontextprotocol.io', 'glama.ai'])
const TAILLE_MAX_ICONE = 5 * 1024 * 1024
const DELAI_MS = 30_000

const erreurs = []
const signaler = (message) => erreurs.push(message)

function lire(nom) {
	try {
		return JSON.parse(readFileSync(join(RACINE, nom), 'utf8'))
	} catch (erreur) {
		signaler(`${nom} : JSON illisible (${erreur.message})`)
		return null
	}
}

function estHttps(valeur) {
	try {
		const url = new URL(valeur)
		return url.protocol === 'https:' && Boolean(url.hostname)
	} catch {
		return false
	}
}

async function telecharger(url) {
	const reponse = await fetch(url, {
		headers: { 'user-agent': 'basile-mcp-validate' },
		redirect: 'follow',
		signal: AbortSignal.timeout(DELAI_MS),
	})
	return reponse
}

async function validerSchema(nom, document) {
	const url = document?.$schema
	if (!estHttps(url) || !HOTES_SCHEMAS.has(new URL(url).hostname)) {
		signaler(`${nom} : "$schema" doit être une adresse https sur ${[...HOTES_SCHEMAS].join(' ou ')}.`)
		return
	}
	let schema
	try {
		const reponse = await telecharger(url)
		if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`)
		schema = await reponse.json()
	} catch (erreur) {
		signaler(`${nom} : impossible de télécharger ${url} (${erreur.message})`)
		return
	}
	// Les schémas officiels sont en draft-07 et portent des mots-clés de documentation
	// (example, examples) : strict:false les laisse passer sans affaiblir la validation.
	const ajv = new Ajv({ allErrors: true, strict: false })
	addFormats(ajv)
	const valider = ajv.compile(schema)
	if (valider(document)) {
		console.log(`${nom} : valide contre ${url}`)
		return
	}
	for (const e of valider.errors) {
		const chemin = e.instancePath || '(racine)'
		const detail = e.params && Object.keys(e.params).length ? ` ${JSON.stringify(e.params)}` : ''
		signaler(`${nom} : ${chemin} : ${e.message}${detail}`)
	}
}

/** Règles du registre et du dépôt que le schéma n'exprime pas. */
function controlerServeur(serveur) {
	if (serveur.name !== NOM) signaler(`server.json : le nom doit rester ${NOM}.`)
	const description = serveur.description ?? ''
	const octets = Buffer.byteLength(description, 'utf8')
	// Le registre plafonne la description à 100 caractères ; on garde la marge en octets.
	if (octets > 100) signaler(`server.json : description de ${octets} octets (100 au plus).`)
	// Pas de volumes chiffrés dans la description : ils vieillissent mal (« B2B » n'en est pas un).
	if (/\d/.test(description.replace(/\bB2B\b/g, ''))) signaler('server.json : la description ne doit pas contenir de chiffres.')
	if ('repository' in serveur) {
		signaler('server.json : pas de champ "repository" : il désigne le dépôt du code source, et ce dépôt ne contient que la documentation.')
	}
	const adresses = [['websiteUrl', serveur.websiteUrl]]
	for (const [i, icone] of (serveur.icons ?? []).entries()) adresses.push([`icons/${i}/src`, icone.src])
	const remotes = serveur.remotes ?? []
	for (const [i, remote] of remotes.entries()) adresses.push([`remotes/${i}/url`, remote.url])
	for (const [chemin, valeur] of adresses) {
		if (valeur !== undefined && !estHttps(valeur)) signaler(`server.json : ${chemin} doit être une adresse https.`)
	}
	if (!remotes.some((remote) => remote.type === 'streamable-http' && remote.url === ADRESSE_SERVEUR)) {
		signaler(`server.json : remote streamable-http ${ADRESSE_SERVEUR} absent.`)
	}
	const themes = new Set((serveur.icons ?? []).map((icone) => icone.theme).filter(Boolean))
	if (themes.size && !(themes.has('light') && themes.has('dark'))) {
		signaler('server.json : avec des thèmes d\'icônes, il faut au moins une icône "light" et une "dark".')
	}
}

/** tools.json décrit le même serveur que server.json. */
function controlerTools(serveur, tools) {
	const info = tools?.server ?? {}
	for (const champ of ['name', 'title', 'version']) {
		if (info[champ] !== serveur[champ]) signaler(`tools.json : server.${champ} (${info[champ]}) diffère de server.json (${serveur[champ]}).`)
	}
	if (info.url !== ADRESSE_SERVEUR) signaler(`tools.json : server.url doit valoir ${ADRESSE_SERVEUR}.`)
	if (info.websiteUrl !== serveur.websiteUrl) signaler('tools.json : server.websiteUrl diffère de server.json.')
}

function controlerExemples() {
	const dossier = join(RACINE, 'examples')
	const fichiers = readdirSync(dossier, { recursive: true, withFileTypes: true })
		.filter((entree) => entree.isFile() && entree.name.endsWith('.json'))
		.map((entree) => join(entree.parentPath ?? entree.path, entree.name))
		.sort()
	if (!fichiers.length) signaler('examples/ : aucun fichier JSON.')
	for (const fichier of fichiers) {
		const nom = relative(RACINE, fichier)
		const contenu = readFileSync(fichier, 'utf8')
		try {
			JSON.parse(contenu)
		} catch (erreur) {
			signaler(`${nom} : JSON invalide (${erreur.message})`)
			continue
		}
		if (!contenu.includes(ADRESSE_SERVEUR)) signaler(`${nom} : l'adresse ${ADRESSE_SERVEUR} est absente.`)
	}
	console.log(`examples/ : ${fichiers.length} fichiers JSON contrôlés`)
}

function taillePng(octets) {
	const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
	if (octets.length < 24 || signature.some((valeur, i) => octets[i] !== valeur)) return null
	if (octets.toString('ascii', 12, 16) !== 'IHDR') return null
	return `${octets.readUInt32BE(16)}x${octets.readUInt32BE(20)}`
}

async function controlerIcones(serveur) {
	for (const icone of serveur.icons ?? []) {
		const { src } = icone
		try {
			const reponse = await telecharger(src)
			const type = (reponse.headers.get('content-type') ?? '').split(';')[0].trim()
			const octets = Buffer.from(await reponse.arrayBuffer())
			const taille = type === 'image/png' ? taillePng(octets) : null
			console.log(`icône ${src} : HTTP ${reponse.status}, ${type || 'type inconnu'}, ${taille ?? 'taille non lue'}${icone.theme ? `, thème ${icone.theme}` : ''}`)
			if (reponse.status !== 200) signaler(`icône ${src} : HTTP ${reponse.status}, 200 attendu.`)
			if (octets.length > TAILLE_MAX_ICONE) signaler(`icône ${src} : plus de 5 Mo.`)
			if (icone.mimeType && type !== icone.mimeType) signaler(`icône ${src} : servie en ${type}, déclarée en ${icone.mimeType}.`)
			const tailles = icone.sizes ?? []
			if (taille && tailles.length && !tailles.includes('any') && !tailles.includes(taille)) {
				signaler(`icône ${src} : image de ${taille}, déclarée en ${tailles.join(', ')}.`)
			}
		} catch (erreur) {
			signaler(`icône ${src} : ${erreur.message}`)
		}
	}
}

const serveur = lire('server.json')
const glama = lire('glama.json')
const tools = lire('tools.json')
if (serveur) {
	await validerSchema('server.json', serveur)
	controlerServeur(serveur)
	if (tools) controlerTools(serveur, tools)
	if (process.argv.includes('--check-icons')) await controlerIcones(serveur)
}
if (glama) await validerSchema('glama.json', glama)
controlerExemples()

if (erreurs.length) {
	console.error('\nValidation en échec :')
	for (const erreur of erreurs) console.error(`  - ${erreur}`)
	process.exit(1)
}
console.log('\nserver.json, glama.json, tools.json et examples/ sont valides.')
