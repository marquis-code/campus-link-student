import { ref, computed } from 'vue'

export const useWallet = () => {
  const wallet = useState<any>('student_wallet', () => null)
  const transactions = useState<any[]>('student_transactions', () => [])
  const loading = ref(false)
  const transactionLoading = ref(false)
  const config = useRuntimeConfig()

  const fetchWallet = async () => {
    loading.value = true
    try {
      const response = await $fetch(`${config.public.apiBase}/wallets/my-wallet`, {
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
      })
      wallet.value = response
    } catch (error) {
      console.error('Failed to fetch wallet', error)
    } finally {
      loading.value = false
    }
  }

  const fetchTransactions = async (page = 1, limit = 20) => {
    transactionLoading.value = true
    try {
      const response: any = await $fetch(`${config.public.apiBase}/wallets/my-transactions`, {
        params: { page, limit },
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
      })
      transactions.value = response.transactions || []
      return response
    } catch (error) {
      console.error('Failed to fetch transactions', error)
    } finally {
      transactionLoading.value = false
    }
  }

  const initializeFunding = async (amount: number, callbackUrl?: string) => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/wallets/fund-initialize`, {
        method: 'POST',
        body: { amount, callbackUrl },
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
      })
      return response
    } catch (error) {
      console.error('Failed to initialize funding', error)
      throw error
    }
  }

  const syncEarnings = async () => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/wallets/sync-earnings`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
      })
      if (response && response.creditedCount > 0) {
        await fetchWallet()
        await fetchTransactions()
      }
      return response
    } catch (error) {
      console.error('Failed to sync earnings', error)
    }
  }

  const verifyPayment = async (reference: string) => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/payments/verify-payment/${reference}`, {
        headers: { Authorization: `Bearer ${useCookie('auth_token').value}` }
      })
      if (response && response.status === 'success') {
        await fetchWallet()
        await fetchTransactions()
      }
      return response
    } catch (error) {
      console.error('Failed to verify payment', error)
    }
  }

  const verifyTransaction = async (reference: string) => {
    await fetchWallet()
    await fetchTransactions()
  }

  return { wallet, transactions, loading, transactionLoading, fetchWallet, fetchTransactions, initializeFunding, verifyTransaction, syncEarnings, verifyPayment }
}
