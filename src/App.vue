<template>
  <div class="app">
    <header>
      <h1>⚡ FlipCards</h1>
      <p v-if="activeDeck" class="progress">
        {{ activeDeck.name }} — Card {{ currentIndex + 1 }} / {{ cards.length }}
      </p>
    </header>

    <main>
      <!-- Deck selection screen -->
      <DeckSelector
        v-if="!activeDeck"
        :decks="decks"
        @select="selectDeck"
      />

      <!-- Quiz in progress -->
      <FlipCard
        v-else-if="currentCard"
        :key="currentCard.id"
        :card="currentCard"
        @next="nextCard"
        @answered="onAnswered"
      />

      <!-- Done screen -->
      <div v-else class="done">
        <h2>🎉 All done!</h2>
        <p>You scored <strong>{{ score }}</strong> / {{ cards.length }}</p>
        <div class="done-actions">
          <button class="restart-btn" @click="restart">Restart Deck</button>
          <button class="back-btn" @click="backToDecks">Choose Another Deck</button>
        </div>
      </div>
    </main>

    <footer v-if="activeDeck">
      <p>Score: {{ score }} correct</p>
      <button class="back-link" @click="backToDecks">← Back to decks</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FlipCard from './components/FlipCard.vue'
import DeckSelector from './components/DeckSelector.vue'
import { decks, getCardsByDeckId } from './data'
import type { Deck, FlipCard as FlipCardType } from './types'

const activeDeck = ref<Deck | null>(null)
const cards = ref<FlipCardType[]>([])
const currentIndex = ref(0)
const score = ref(0)

const currentCard = computed(() => cards.value[currentIndex.value] ?? null)

function selectDeck(deckId: string) {
  const deck = decks.find(d => d.id === deckId)
  if (!deck) return
  activeDeck.value = deck
  cards.value = getCardsByDeckId(deckId)
  currentIndex.value = 0
  score.value = 0
}

function nextCard() {
  currentIndex.value++
}

function onAnswered(correct: boolean) {
  if (correct) score.value++
}

function restart() {
  currentIndex.value = 0
  score.value = 0
}

function backToDecks() {
  activeDeck.value = null
  cards.value = []
  currentIndex.value = 0
  score.value = 0
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

header h1 {
  margin: 0;
  font-size: 2rem;
}

.progress {
  opacity: 0.8;
  margin: 0.5rem 0 0;
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.done {
  text-align: center;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.done h2 {
  font-size: 2rem;
  margin: 0 0 1rem;
}

.done-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.restart-btn {
  padding: 0.8rem 2rem;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.restart-btn:hover {
  background: #5a52d5;
}

.back-btn {
  padding: 0.8rem 2rem;
  background: transparent;
  color: #6c63ff;
  border: 2px solid #6c63ff;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.back-btn:hover {
  background: #f0eeff;
}

footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2rem;
}

.back-link {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  text-decoration: underline;
}

.back-link:hover {
  color: white;
}
</style>
