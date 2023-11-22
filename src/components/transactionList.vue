<script setup lang="ts">
import type { transaction } from '@/App.vue'

defineProps<{
  transactions: transaction[]
}>()
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      {{ transaction.text }} <span>${{ transaction.amount }}</span
      ><button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped></style>
