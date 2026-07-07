export interface FlipCard {
  id: number
  question: string
  options: string[]
  answer: string
}

export interface Deck {
  id: string
  name: string
  description: string
  icon: string
  cardCount: number
}
