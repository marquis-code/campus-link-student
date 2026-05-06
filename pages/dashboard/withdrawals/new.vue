<template>
  <div class="px-6 py-8 max-w-screen-md mx-auto space-y-8">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 glass-card flex items-center justify-center">
        <Icon name="ph:arrow-left-bold" />
      </button>
      <h1 class="text-2xl font-bold text-dark-900 tracking-tight">Withdraw funds</h1>
    </header>

    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-32 bg-dark-100 rounded-3xl"></div>
      <div class="h-60 bg-dark-100 rounded-3xl"></div>
    </div>

    <div v-else class="space-y-8">
      <!-- Balance Info -->
      <div class="bg-primary-50 p-6 rounded-3xl border border-primary-100">
        <p class="text-primary-700 font-bold text-sm tracking-wider">Available for withdrawal</p>
        <h2 class="text-4xl font-bold text-primary-900 pt-1">₦{{ summary?.availableEarnings?.toLocaleString() }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <AnimatedInput 
            label="Amount to withdraw"
            v-model="form.amount"
            type="number"
            placeholder="0.00"
            required
          >
            <template #left>
              <span class="font-bold text-dark-400 mr-1">₦</span>
            </template>
          </AnimatedInput>
          <p class="text-[10px] text-dark-400 mt-1 ml-1 font-bold">Minimum withdrawal: ₦1,000</p>

          <div class="pt-4 border-t border-dark-100">
            <h3 class="text-lg font-bold text-dark-900 mb-4">Bank details</h3>
            <div class="space-y-4">
              <AnimatedInput 
                label="Bank name"
                v-model="form.bankName"
                placeholder="e.g. Kuda Bank"
                required
              />
              <AnimatedInput 
                label="Account number"
                v-model="form.bankAccountNumber"
                placeholder="0123456789"
                maxlength="10"
                required
              />
              <AnimatedInput 
                label="Account name"
                v-model="form.bankAccountName"
                placeholder="Full account holder name"
                required
              />
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-4 rounded-2xl flex gap-3 border border-amber-100">
          <Icon name="ph:info-duotone" class="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
          <p class="text-xs text-amber-800 leading-relaxed font-medium">
            Withdrawals are processed within 24-48 hours. Please ensure your bank details are correct to avoid delays.
          </p>
        </div>

        <button type="submit" :disabled="submitting || form.amount < 1000 || form.amount > summary?.availableEarnings" class="btn-primary w-full py-5 text-lg font-bold">
          <template v-if="submitting">
            <Icon name="ph:spinner-bold" class="animate-spin text-2xl" />
          </template>
          <template v-else>Request withdrawal</template>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const { summary, loading, fetchSummary } = useFetchEarningsSummary()
const { requestWithdrawal, loading: submitting } = useRequestWithdrawal()
const { user } = useUser()

const form = reactive({
  amount: 0,
  bankName: user.value?.bankName || '',
  bankAccountNumber: user.value?.bankAccountNumber || '',
  bankAccountName: user.value?.bankAccountName || ''
})

onMounted(async () => {
  await fetchSummary()
  form.amount = summary.value?.availableEarnings || 0
})

const handleSubmit = async () => {
  if (form.amount < 1000) {
    alert('Minimum withdrawal is ₦1,000')
    return
  }

  const res = await requestWithdrawal(form)
  if (res) {
    navigateTo('/dashboard/earnings')
  }
}
</script>
