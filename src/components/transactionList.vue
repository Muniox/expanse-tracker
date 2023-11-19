<script setup lang="ts">
const transactions = [
  { id: 1, text: 'Flower', amount: -19.99 },
  { id: 2, text: 'Salary', amount: 299.97 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
]
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      :class="transaction.amount >= 0 ? 'plus' : 'minus'"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      {{ transaction.text }} <span>{{ transaction.amount }}</span
      ><button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped></style>
