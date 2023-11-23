<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from '@/components/Balance.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/transactionList.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import { ref, computed, onMounted } from 'vue'

import { useToast } from 'vue-toastification'

export interface transaction {
  id: number
  text: string
  amount: number
}

const toast = useToast()

const transactions = ref<transaction[]>([])

const storage = localStorage.getItem('transactions')

onMounted(() => {
  const savedTransactions = JSON.parse(storage !== null ? storage : '')
  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

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

// Add transaction
const handleTransactionSubmitted = (transactionData: { text: string; amount: number }) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })

  saveTransactionToLocalStorage()
  toast.success('Transaction added')
}

//generate Unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000000)
}

//delete transaction
const handleTransactionDeleted = (transactionId: number) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionId)

  saveTransactionToLocalStorage()
  toast.success('Transaction deleted')
}

//Save to localstorage
const saveTransactionToLocalStorage = () => {
  console.log(transactions.value)
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>

<template>
  <Header></Header>
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :expense="expanse" :income="income" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<style scoped></style>
