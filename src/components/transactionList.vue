<script setup lang="ts">
import type { transaction } from '@/App.vue'

defineProps<{
  transactions: transaction[]
}>()

const emit = defineEmits(['transactionDeleted'])

const deleteTransaction = (id: number) => {
  emit('transactionDeleted', id)
}
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
      ><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped></style>
