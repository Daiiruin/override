# OVERRIDE — Escape game hacker interactif

## Contexte

Petit jeu solo interactif dans l'esprit des autres projets du dossier `SoloProject`
(`skynet` : effet Matrix en vanilla JS ; `zombie-attack` : jeu déjà spécifié via
superpowers), mais construit en **React + TypeScript + Vite** (cohérent avec
`portfolio-ad` / `tips-and-tricks`) plutôt qu'en vanilla JS. Objectif : un escape game
narratif façon "reprends le contrôle d'une IA devenue hostile", jouable en solo dans le
navigateur, sans backend.

## Concept & narration

Une IA de défense nommée **NEXUS** a été compromise et a pris le contrôle du réseau.
Le joueur incarne le dernier hacker externe encore connecté au système.

- L'intro affiche un boot cyberpunk (texte façon terminal qui s'affiche
  progressivement) expliquant la situation, puis demande le prénom du joueur
  ("IDENTIFICATION AGENT REQUISE").
- Le prénom saisi est réutilisé dans les dialogues de NEXUS et dans les écrans de fin,
  pour l'immersion.
- Dès le prénom validé, un **compte à rebours global unique** démarre : le temps avant
  que NEXUS finalise sa prise de contrôle du réseau mondial.

## Séquence de jeu

Format linéaire : intro → 7 écrans d'énigmes → écran de fin (victoire ou défaite).

| # | Écran | Mécanique | Type |
|---|-------|-----------|------|
| 0 | Intro / identification | Saisie du prénom, lancement du timer global | — |
| 1 | Connexion terminal | Indice caché dans le code source de la page (commentaire HTML ou `console.log`) donnant le premier mot de passe | Observation |
| 2 | Message intercepté | Message chiffré (César ou Base64) à décoder pour obtenir le code suivant | Logique |
| 3 | Système de fichiers | Fausse arborescence de fichiers explorable (dossiers cliquables façon `ls`) contenant un fichier caché avec un indice | Observation |
| 4 | Séquence binaire/hexa | Conversion d'une suite binaire ou hexadécimale en texte pour obtenir un code d'accès | Logique |
| 5 | Pare-feu réseau | Puzzle visuel : activer/relier les bons nœuds d'un schéma réseau affiché à l'écran pour contourner le firewall | Logique + observation |
| 6 | NEXUS s'adresse à toi | NEXUS interpelle le joueur par son prénom et lui lance un défi personnalisé (chiffre dérivé du prénom à décoder) | Logique, personnalisé |
| 7 | Séquence de neutralisation | Combiner tous les codes trouvés précédemment dans un écran final sous tension (le timer s'accélère visuellement) pour désactiver le noyau de NEXUS | Synthèse finale |
| 8 | Fin | Victoire (message personnalisé + temps restant) ou défaite (timer à 0 → NEXUS a gagné, écran game over avec option de recommencer) | — |

## Condition de timer

Un seul compte à rebours global (ex. 15 minutes), démarré après la saisie du prénom.
S'il atteint zéro avant la fin de l'écran 7 → défaite immédiate (écran game over).
Aucun timer par énigme : l'échec sur une énigme ne pénalise pas directement, seul le
temps global compte.

## Architecture technique

- **Stack** : React 19 + TypeScript + Vite (cohérent avec `portfolio-ad` /
  `tips-and-tricks`), + `motion` (Framer Motion) pour les transitions d'écran et les
  effets glitch.
- **État du jeu** : un `GameProvider` (Context React) centralise prénom, écran
  courant, liste des énigmes résolues, et date limite du timer.
- **Timer** : stocké comme un **timestamp de fin absolu**
  (`Date.now() + durée_totale`) plutôt qu'un compteur de secondes décrémenté, pour que
  le temps restant reste correct même si l'onglet est mis en veille ou fermé puis
  rouvert.
- **Sauvegarde** : l'état complet (`prénom`, `écran courant`, `énigmes résolues`,
  `timestamp de fin`) est synchronisé dans `localStorage` à chaque changement et
  restauré au chargement — un refresh accidentel reprend la partie en cours avec le
  temps restant recalculé.
- **Config des énigmes** : fichier `puzzles.ts` déclarant chaque énigme (id, texte
  narratif avec `{name}` interpolé, indice, fonction de validation de la réponse).
  Chaque écran d'énigme est un composant dédié, partageant un wrapper commun
  (`PuzzleScreen`) pour le style terminal/CRT et les transitions Framer Motion.
- **Pas de backend** : site 100% statique, déployable sur Vercel/GitHub Pages.
- **Tests** : Vitest sur les fonctions pures (déchiffrement César/hexa/Base64, calcul
  du temps restant à partir du timestamp). Le reste (flux de jeu, transitions, UX) se
  valide manuellement en jouant dans le navigateur — pas d'e2e pour un projet de cette
  taille.

## Style visuel

Ambiance cyberpunk sombre : fond noir/bleu nuit très foncé, police monospace type
terminal (`Share Tech Mono` ou `VT323`), accents néon **cyan + magenta** (pour se
différencier du vert Matrix de `skynet`). Effets : léger scanline/CRT en overlay,
glitch text sur les moments clés (intro, apparitions de NEXUS, game over), transitions
d'écran via Framer Motion (fade + slide, effet de "déchirure" numérique entre écrans).
Le timer global reste visible en permanence en haut de l'écran, discret, et
pulse/rougit quand il reste peu de temps.

## Hors scope (v1)

- Pas de système d'indices/aide in-game au-delà de ceux écrits dans le récit.
- Pas de classement/scores partagés, pas de backend, pas de compte joueur persistant
  au-delà du `localStorage` local.
- Pas de mode difficulté ou de génération procédurale des énigmes — contenu fixe pour
  la v1.
