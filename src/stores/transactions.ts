import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

interface transaction {
  id: number
  text: string
  amount: number
}

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref<transaction[]>([])
  const toast = useToast()

  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
  })

  const income = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)
  })

  const expanse = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount
      }, 0)
  })

  // Add transaction
  function handleTransactionSubmitted(transactionData: { text: string; amount: number }) {
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
  function handleTransactionDeleted(transactionId: number) {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== transactionId
    )

    saveTransactionToLocalStorage()
    toast.success('Transaction deleted')
  }

  //Save to localstorage
  const saveTransactionToLocalStorage = () => {
    console.log(transactions.value)
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
  }

  return {
    transactions,
    total,
    income,
    expanse,
    handleTransactionDeleted,
    handleTransactionSubmitted
  }
})
