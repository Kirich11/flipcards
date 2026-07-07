import type { Deck, FlipCard } from '../types'
import zijnConjugation from './zijn-conjugation.json'
import pronouns from './pronouns.json'

const deckCards: Record<string, FlipCard[]> = {
  'zijn-conjugation': zijnConjugation,
  'pronouns': pronouns,
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
]

export function getCardsByDeckId(deckId: string): FlipCard[] {
  return deckCards[deckId] ?? []
}
