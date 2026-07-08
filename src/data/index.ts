import type { Deck, FlipCard } from '../types'
import zijnConjugation from './zijn-conjugation.json'
import pronouns from './pronouns.json'
import vocabulary from './vocabulary.json'
import separable from './separable-verbs.json'

const deckCards: Record<string, FlipCard[]> = {
  'zijn-conjugation': zijnConjugation,
  'pronouns': pronouns,
  'vocabulary': vocabulary,
}

export const decks: Deck[] = [
  {
    id: 'zijn-conjugation',
    name: 'Ben / Zijn — Conjugation',
    description: 'Present & past tense forms of "to be" in Dutch',
    icon: '🇳🇱',
    cardCount: zijnConjugation.length,
  },
  {
    id: 'pronouns',
    name: 'Pronouns — Subject & Object',
    description: 'Choose correct active (subject) and passive (object) pronouns',
    icon: '👉',
    cardCount: pronouns.length,
  },
  {
    id: 'vocabulary',
    name: 'Dutch → English Vocabulary',
    description: 'Translate common Dutch words to English',
    icon: '📖',
    cardCount: vocabulary.length,
  },
  {
    id: 'separable-verbs',
    name: 'Separable verbs',
    description: 'Translate common Dutch verbs to English',
    icon: '🏋️',
    cardCount: separable.length,
  },
]

export function getCardsByDeckId(deckId: string): FlipCard[] {
  return deckCards[deckId] ?? []
}
