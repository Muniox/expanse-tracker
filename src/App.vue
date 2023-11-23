<script setup lang="ts">
import Header from './components/Header.vue'
import Balance from '@/components/Balance.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/transactionList.vue'
// import AddTransaction from '@/components/AddTransaction.vue'
import { onMounted } from 'vue'
import { useTransactionStore } from './stores/transactions'
import TestComponent from './components/TestComponent.vue'

export interface transaction {
  id: number
  text: string
  amount: number
}

const store = useTransactionStore()

const storage = localStorage.getItem('transactions')

onMounted(() => {
  const savedTransactions = JSON.parse(storage !== null ? storage : '')
  if (savedTransactions) {
    store.transactions = savedTransactions
  }
})
</script>

<template>
  <Header></Header>
  <div class="container">
    <Balance :total="store.total" />
    <IncomeExpenses :expense="store.expanse" :income="store.income" />
    <TransactionList
      :transactions="store.transactions"
      @transactionDeleted="store.handleTransactionDeleted"
    />
    <TestComponent />
    <!-- <AddTransaction @transactionSubmitted="store.handleTransactionSubmitted" /> -->
  </div>
</template>

<style scoped></style>
