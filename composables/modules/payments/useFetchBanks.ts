import { ref } from 'vue'

export const useFetchBanks = () => {
  const banks = ref<any[]>([])
  const loading = ref(false)
  const config = useRuntimeConfig()

  const fetchBanks = async () => {
    loading.value = true
    try {
      const response = await $fetch(`${config.public.apiBase}/payments/banks`)
      banks.value = response as any[]
    } catch (error) {
      console.error('Failed to fetch banks', error)
    } finally {
      loading.value = false
    }
  }

  const resolveAccount = async (accountNumber: string, bankCode: string) => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/payments/resolve-account`, {
        params: { accountNumber, bankCode }
      })
      return response
    } catch (error) {
      console.error('Failed to resolve account', error)
      throw error
    }
  }

  return { banks, loading, fetchBanks, resolveAccount }
}
