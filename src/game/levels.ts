import { caesarShift } from './cipher'
import { LevelId, type LevelDefinition } from './types'

const normalize = (value: string) => value.trim().toLowerCase()

export const INTERCEPT_SHIFT = 3
export const INTERCEPT_ANSWER = 'NIGHTFALL'
export const INTERCEPT_CIPHER = caesarShift(INTERCEPT_ANSWER, INTERCEPT_SHIFT)

export const LOG_ANSWER = 'SILENTECHO'

export const KEYPAD_NODE_COUNT = 4
export const KEYPAD_SEQUENCE_LENGTH = 6
export const KEYPAD_CLEARED_SIGNAL = 'UNLOCKED'

export const FIREWALL_SEQUENCE = [2, 3, 5, 7]
export const FIREWALL_ANSWER = FIREWALL_SEQUENCE.join('-')

export const BOTS_TO_CLEAR = 10
export const BOTS_CLEARED_SIGNAL = 'NEUTRALIZED'

export const DEFENSE_WORDS = [
  'DELETE',
  'FORMAT',
  'PURGE',
  'BREACH',
  'CORRUPT',
  'HIJACK',
  'DISABLE',
  'ERASE',
  'LOCKOUT',
  'BYPASS',
  'INFECT',
  'OVERRIDE',
]
export const DEFENSE_WORDS_TO_CLEAR = 8
export const DEFENSE_CLEARED_SIGNAL = 'CLEARED'

export const LEVELS: LevelDefinition[] = [
  {
    id: LevelId.Terminal,
    next: LevelId.Intercept,
    title: 'Connexion terminal',
    narrative: () =>
      'NEXUS a dissimulé le code d\'accès quelque part sur cette page.',
    validate: (input) => normalize(input) === normalize('GHOST99'),
  },
  {
    id: LevelId.Intercept,
    next: LevelId.FileSystem,
    title: 'Message intercepté',
    narrative: () =>
      `Un message a été intercepté : chaque lettre a été remplacée par une autre, toujours selon la même règle. Utilise la table de correspondance ci-dessous (lettre reçue → lettre réelle) pour le déchiffrer : ${INTERCEPT_CIPHER}`,
    validate: (input) => normalize(input) === normalize(INTERCEPT_ANSWER),
  },
  {
    id: LevelId.FileSystem,
    next: LevelId.Logs,
    title: 'Système de fichiers',
    narrative: () =>
      "Explore l'arborescence des fichiers de NEXUS pour trouver la clé de sauvegarde cachée.",
    validate: (input) => normalize(input) === normalize('REDLOTUS'),
  },
  {
    id: LevelId.Logs,
    next: LevelId.Firewall,
    title: 'Journal système',
    narrative: () =>
      "NEXUS journalise absolument tout. Fais défiler l'historique système ci-dessous pour repérer la ligne où un identifiant d'accès a été émis, noyée au milieu du bruit habituel.",
    validate: (input) => normalize(input) === normalize(LOG_ANSWER),
  },
  {
    id: LevelId.Firewall,
    next: LevelId.Keypad,
    title: 'Pare-feu réseau',
    narrative: () =>
      "Active uniquement les nœuds dont le numéro est un nombre premier — un nombre supérieur à 1 qui n'est divisible que par 1 et par lui-même (par exemple 5 est premier, mais 6 = 2 × 3 ne l'est pas) — en partant du plus petit.",
    validate: (input) => normalize(input) === normalize(FIREWALL_ANSWER),
  },
  {
    id: LevelId.Keypad,
    next: LevelId.Defense,
    title: 'Clavier de sécurité',
    narrative: () =>
      `NEXUS déverrouille un clavier de sécurité en affichant une séquence lumineuse de ${KEYPAD_SEQUENCE_LENGTH} symboles. Observe-la puis reproduis-la exactement en cliquant sur les symboles dans le même ordre. Une erreur relance la séquence depuis le début.`,
    validate: (input) => input === KEYPAD_CLEARED_SIGNAL,
  },
  {
    id: LevelId.Defense,
    next: LevelId.Finale,
    title: 'Intrusion en cours',
    narrative: () =>
      `NEXUS bombarde le terminal de commandes malveillantes qui tombent vers le bas de l'écran. Tape chaque commande exactement avant qu'elle n'atteigne le bas, sinon NEXUS l'exécute et reprend le contrôle. Neutralise-en ${DEFENSE_WORDS_TO_CLEAR} pour passer.`,
    validate: (input) => input === DEFENSE_CLEARED_SIGNAL,
  },
  {
    id: LevelId.Finale,
    next: 'end',
    title: 'Assaut final',
    narrative: () =>
      `NEXUS envoie une vague de bots pour prendre ton PC par la force. Clique sur chaque bot avant qu'il n'atteigne ton poste pour le détruire. Détruis-en ${BOTS_TO_CLEAR} pour reprendre le contrôle du réseau.`,
    validate: (input) => input === BOTS_CLEARED_SIGNAL,
  },
]

export const LEVEL_ORDER: LevelId[] = LEVELS.map((level) => level.id)

export function getLevel(id: LevelId): LevelDefinition {
  const level = LEVELS.find((entry) => entry.id === id)
  if (!level) throw new Error(`Unknown level id: ${id}`)
  return level
}
