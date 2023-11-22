<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from '@/components/Balance.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/transactionList.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import { ref, computed } from 'vue'

export interface transaction {
  id: number
  text: string
  amount: number
}

const transactions = ref<transaction[]>([
  { id: 1, text: 'Flower', amount: -19.99 },
  { id: 2, text: 'Salary', amount: 299.97 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
])

// Get total
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

// get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
})

// get expanse
const expanse = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
})
</script>

<template>
  <Header></Header>
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :expense="expanse" :income="income" />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>

<style scoped></style>
