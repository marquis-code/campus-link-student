<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <div class="bg-white rounded-[2.5rem] p-12 w-full max-w-md shadow-xl border-2 border-gray-50 text-center space-y-8 animate-in zoom-in-95 duration-500">
      <div v-if="verifying" class="space-y-6">
        <div class="w-24 h-24 bg-gray-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-gray-200">
          <Loader2 :size="48" class="text-white animate-spin" />
        </div>
        <div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Verifying Payment</h2>
          <p class="text-sm text-gray-500 mt-2 font-medium">Please wait while we audit your transaction...</p>
        </div>
      </div>

      <div v-else-if="success" class="space-y-6 animate-in zoom-in-95 duration-500">
        <div class="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-100">
          <Check :size="48" class="text-white" />
        </div>
        <div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Top-up Success!</h2>
          <p class="text-sm text-gray-500 mt-2 font-medium">Your wallet has been credited. Redirecting you home...</p>
        </div>
      </div>

      <div v-else class="space-y-6 animate-in zoom-in-95 duration-500">
        <div class="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-rose-100">
          <AlertTriangle :size="48" />
        </div>
        <div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Verification Failed</h2>
          <p class="text-sm text-gray-500 mt-2 font-medium leading-relaxed">We couldn't confirm your transaction. If you were debited, please contact support.</p>
        </div>
        <button @click="navigateTo('/dashboard/earnings')" class="w-full py-5 rounded-2xl bg-gray-900 text-white text-sm font-bold shadow-xl shadow-gray-200 hover:translate-y-[-4px] active:translate-y-0 transition-all">
          Back to Wallet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Loader2, 
  Check, 
  AlertTriangle 
} from 'lucide-vue-next'
import { useWallet } from '@/composables/modules/wallets/useWallet'

const route = useRoute()
const { verifyTransaction } = useWallet()
const verifying = ref(true)
const success = ref(false)

onMounted(async () => {
  const reference = route.query.reference as string || route.query.trxref as string
  if (!reference) {
    verifying.value = false
    return
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 3000))
    await verifyTransaction(reference)
    success.value = true
    setTimeout(() => {
      navigateTo('/dashboard/earnings')
    }, 2000)
  } catch (error) {
    console.error('Verification failed', error)
  } finally {
    verifying.value = false
  }
})

definePageMeta({
  layout: 'empty'
})
</script>
