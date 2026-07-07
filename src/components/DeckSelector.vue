<template>
  <div class="deck-selector">
    <h2>Choose a Deck</h2>
    <div class="deck-grid">
      <button
        v-for="deck in decks"
        :key="deck.id"
        class="deck-card"
        @click="$emit('select', deck.id)"
      >
        <span class="deck-icon">{{ deck.icon }}</span>
        <h3>{{ deck.name }}</h3>
        <p class="deck-desc">{{ deck.description }}</p>
        <span class="deck-count">{{ deck.cardCount }} cards</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Deck } from '../types'

defineProps<{ decks: Deck[] }>()
defineEmits<{ select: [deckId: string] }>()
</script>

<style scoped>
.deck-selector {
  width: 100%;
  max-width: 600px;
}

.deck-selector h2 {
  text-align: center;
  color: white;
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
}

.deck-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.deck-card {
  background: white;
  border: none;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s, box-shadow 0.15s;
}

.deck-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.deck-icon {
  font-size: 2rem;
  grid-row: 1 / 3;
}

.deck-card h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1a1a2e;
}

.deck-desc {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: #666;
  grid-column: 2;
}

.deck-count {
  grid-row: 1 / 3;
  font-size: 0.8rem;
  color: #999;
  background: #f0f0f0;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
}
</style>
