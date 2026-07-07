<template>
  <div class="flip-card" :class="{ flipped: isFlipped }">
    <!-- FRONT: Question side -->
    <div v-if="!isFlipped" class="card-face front">
      <h2 class="question">{{ card.question }}</h2>
      <div class="options">
        <button
          v-for="option in card.options"
          :key="option"
          class="option-btn"
          :class="{ selected: userAnswer === option }"
          @click="selectOption(option)"
        >
          {{ option }}
        </button>
      </div>
      <div class="input-section">
        <span class="or-divider">— or type your answer —</span>
        <input
          v-model="typedAnswer"
          type="text"
          placeholder="Type your answer..."
          class="answer-input"
          @keyup.enter="submitAnswer"
        />
      </div>
      <button class="submit-btn" :disabled="!hasAnswer" @click="submitAnswer">
        Check Answer
      </button>
    </div>

    <!-- BACK: Answer side -->
    <div v-else class="card-face back">
      <div class="result" :class="{ correct: isCorrect, wrong: !isCorrect }">
        <h3>{{ isCorrect ? '✓ Correct!' : '✗ Wrong!' }}</h3>
        <p class="correct-answer">Answer: <strong>{{ card.answer }}</strong></p>
        <p v-if="!isCorrect" class="your-answer">
          Your answer: <strong>{{ submittedAnswer }}</strong>
        </p>
      </div>
      <button class="next-btn" @click="$emit('next')">Next Card →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FlipCard } from '../types'

const props = defineProps<{ card: FlipCard }>()
const emit = defineEmits<{ next: [], answered: [correct: boolean] }>()

const isFlipped = ref(false)
const userAnswer = ref('')
const typedAnswer = ref('')
const submittedAnswer = ref('')
const isCorrect = ref(false)

const hasAnswer = computed(() => userAnswer.value !== '' || typedAnswer.value.trim() !== '')

function selectOption(option: string) {
  userAnswer.value = option
  typedAnswer.value = ''
}

function submitAnswer() {
  if (!hasAnswer.value) return

  const answer = userAnswer.value || typedAnswer.value.trim()
  submittedAnswer.value = answer
  isCorrect.value = answer.toLowerCase() === props.card.answer.toLowerCase()
  isFlipped.value = true
  emit('answered', isCorrect.value)
}

// Reset when card changes (parent handles via :key)
defineExpose({ reset: () => {
  isFlipped.value = false
  userAnswer.value = ''
  typedAnswer.value = ''
  submittedAnswer.value = ''
  isCorrect.value = false
}})
</script>

<style scoped>
.flip-card {
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;
}

.card-face {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  min-height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.question {
  font-size: 1.3rem;
  text-align: center;
  color: #1a1a2e;
  margin: 0;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
}

.option-btn {
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.option-btn:hover {
  border-color: #6c63ff;
  background: #f0eeff;
}

.option-btn.selected {
  border-color: #6c63ff;
  background: #6c63ff;
  color: white;
}

.input-section {
  width: 100%;
  text-align: center;
}

.or-divider {
  display: block;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.answer-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.answer-input:focus {
  outline: none;
  border-color: #6c63ff;
}

.submit-btn {
  padding: 0.8rem 2rem;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  background: #5a52d5;
}

.result h3 {
  font-size: 1.5rem;
  margin: 0;
}

.result.correct h3 {
  color: #27ae60;
}

.result.wrong h3 {
  color: #e74c3c;
}

.correct-answer {
  font-size: 1.1rem;
  color: #333;
}

.your-answer {
  font-size: 0.95rem;
  color: #888;
}

.next-btn {
  padding: 0.8rem 2rem;
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.next-btn:hover {
  background: #2d2d4e;
}
</style>
