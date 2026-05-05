<template>
  <div class="px-6 py-8 max-w-screen-md mx-auto space-y-8">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 glass-card flex items-center justify-center">
        <Icon name="ph:arrow-left-bold" />
      </button>
      <h1 class="text-2xl font-black text-dark-900 tracking-tight">Withdraw Funds</h1>
    </header>

    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-32 bg-dark-100 rounded-3xl"></div>
      <div class="h-60 bg-dark-100 rounded-3xl"></div>
    </div>

    <div v-else class="space-y-8">
      <!-- Balance Info -->
      <div class="bg-primary-50 p-6 rounded-3xl border border-primary-100">
        <p class="text-primary-700 font-bold text-sm uppercase tracking-wider">Available for Withdrawal</p>
        <h2 class="text-4xl font-black text-primary-900 pt-1">₦{{ summary?.availableEarnings?.toLocaleString() }}</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-dark-700 ml-1 mb-1">Amount to Withdraw</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 font-black text-dark-400">₦</span>
              <input v-model="form.amount" type="number" required :max="summary?.availableEarnings" class="input-field pl-10" placeholder="0.00" />
            </div>
            <p class="text-[10px] text-dark-400 mt-1 ml-1 font-bold italic">Minimum withdrawal: ₦1,000</p>
          </div>

          <div class="pt-4 border-t border-dark-100">
            <h3 class="text-lg font-bold text-dark-900 mb-4">Bank Details</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-dark-700 ml-1 mb-1">Bank Name</label>
                <input v-model="form.bankName" type="text" required class="input-field" placeholder="e.g. Kuda Bank" />
              </div>
              <div>
                <label class="block text-sm font-bold text-dark-700 ml-1 mb-1">Account Number</label>
                <input v-model="form.bankAccountNumber" type="text" required class="input-field" placeholder="0123456789" maxlength="10" />
              </div>
              <div>
                <label class="block text-sm font-bold text-dark-700 ml-1 mb-1">Account Name</label>
                <input v-model="form.bankAccountName" type="text" required class="input-field" placeholder="Full Account Holder Name" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-4 rounded-2xl flex gap-3 border border-amber-100">
          <Icon name="ph:info-duotone" class="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
          <p class="text-xs text-amber-800 leading-relaxed font-medium">
            Withdrawals are processed within 24-48 hours. Please ensure your bank details are correct to avoid delays.
          </p>
        </div>

        <button type="submit" :disabled="submitting || form.amount < 1000 || form.amount > summary?.availableEarnings" class="btn-primary w-full py-5 text-lg shadow-xl shadow-primary-500/30">
          <template v-if="submitting">
            <Icon name="ph:spinner-bold" class="animate-spin text-2xl" />
          </template>
          <template v-else>Request Withdrawal</template>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
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
