import { caesarShift, textToBinary } from './cipher'
import { LevelId, type LevelDefinition } from './types'

const normalize = (value: string) => value.trim().toLowerCase()

export const INTERCEPT_ANSWER = 'NIGHTFALL'
export const INTERCEPT_CIPHER = caesarShift(INTERCEPT_ANSWER, 3)

export const BINARY_ANSWER = 'OVERRIDE'
export const BINARY_CIPHER = textToBinary(BINARY_ANSWER)

export const FIREWALL_SEQUENCE = [2, 3, 5, 7]
export const FIREWALL_ANSWER = FIREWALL_SEQUENCE.join('-')

export const LEVELS: LevelDefinition[] = [
  {
    id: LevelId.Terminal,
    next: LevelId.Intercept,
    title: 'Connexion terminal',
    narrative: () =>
      "NEXUS a laissé une trace dans le code source de cette page. Inspecte le document (Ctrl+U) pour trouver le code d'accès.",
    validate: (input) => normalize(input) === normalize('GHOST99'),
  },
  {
    id: LevelId.Intercept,
    next: LevelId.FileSystem,
    title: 'Message intercepté',
    narrative: () =>
      `Un message chiffré par décalage de César (+3) a été intercepté : ${INTERCEPT_CIPHER}`,
    validate: (input) => normalize(input) === normalize(INTERCEPT_ANSWER),
  },
  {
    id: LevelId.FileSystem,
    next: LevelId.Binary,
    title: 'Système de fichiers',
    narrative: () =>
      "Explore l'arborescence des fichiers de NEXUS pour trouver la clé de sauvegarde cachée.",
    validate: (input) => normalize(input) === normalize('REDLOTUS'),
  },
  {
    id: LevelId.Binary,
    next: LevelId.Firewall,
    title: 'Séquence binaire',
    narrative: () => `NEXUS communique en binaire : ${BINARY_CIPHER}`,
    validate: (input) => normalize(input) === normalize(BINARY_ANSWER),
  },
  {
    id: LevelId.Firewall,
    next: LevelId.Identity,
    title: 'Pare-feu réseau',
    narrative: () =>
      "Active uniquement les nœuds premiers du pare-feu, dans l'ordre croissant.",
    validate: (input) => normalize(input) === normalize(FIREWALL_ANSWER),
  },
  {
    id: LevelId.Identity,
    next: LevelId.Finale,
    title: "NEXUS s'adresse à toi",
    narrative: (state) =>
      `NEXUS chiffre ton propre nom pour te tester : ${caesarShift(state.playerName, 1)}. Décode-le pour prouver qui tu es.`,
    validate: (input, state) => normalize(input) === normalize(state.playerName),
  },
  {
    id: LevelId.Finale,
    next: 'end',
    title: 'Séquence de neutralisation',
    narrative: (state) =>
      `Combine les codes récupérés pour désactiver le noyau : ${state.collectedCodes[LevelId.Terminal] ?? '???'}-${state.collectedCodes[LevelId.Binary] ?? '???'}-${state.collectedCodes[LevelId.Intercept] ?? '???'}`,
    validate: (input, state) =>
      normalize(input) ===
      normalize(
        `${state.collectedCodes[LevelId.Terminal] ?? ''}-${state.collectedCodes[LevelId.Binary] ?? ''}-${state.collectedCodes[LevelId.Intercept] ?? ''}`,
      ),
  },
]

export function getLevel(id: LevelId): LevelDefinition {
  const level = LEVELS.find((entry) => entry.id === id)
  if (!level) throw new Error(`Unknown level id: ${id}`)
  return level
}
