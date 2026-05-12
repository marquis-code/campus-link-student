<template>
  <div class="max-w-2xl mx-auto space-y-10 py-6 pb-24">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group">
        <Icon name="ArrowLeft" size="18" class="text-gray-400 group-hover:text-black transition-colors" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Request Payout</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Convert your commissions to capital</p>
      </div>
    </header>

    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-40 bg-gray-50 rounded-3xl"></div>
      <div class="h-80 bg-gray-50 rounded-3xl"></div>
    </div>

    <div v-else class="space-y-10">
      <!-- Balance Info -->
      <div class="bg-gray-900 p-10 rounded-3xl text-white relative overflow-hidden shadow-xl">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <p class="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 relative z-10">Liquid Capital Available</p>
        <h2 class="text-5xl font-bold tracking-tight relative z-10">₦{{ summary?.walletBalance?.toLocaleString() }}</h2>
        <div class="mt-8 flex items-center gap-3 relative z-10">
           <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
           <span class="text-xs font-medium text-white/60">Verified for immediate payout</span>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
        <div class="space-y-8">
          <div class="flex items-center justify-between px-1">
             <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Payout Amount</h3>
             <button type="button" @click="form.amount = summary?.walletBalance || 0" class="text-xs font-bold text-black hover:underline">Withdraw Max</button>
          </div>
          <AnimatedInput 
            label="Enter Amount (₦)"
            v-model="form.amount"
            type="number"
            placeholder="0.00"
            required
          >
            <template #right>
              <div class="p-2 mr-1">
                <Icon name="Coins" class="text-gray-400" size="20" />
              </div>
            </template>
          </AnimatedInput>
          <p class="text-[11px] text-gray-400 font-medium ml-1">Minimum withdrawal: ₦1,000</p>

          <div class="pt-10 border-t border-gray-50">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">Destination Account</h3>
            <div class="space-y-8">
              <AnimatedInput 
                label="Receiving Bank"
                v-model="form.bankName"
                placeholder="e.g. Kuda Bank"
                required
              />
              <AnimatedInput 
                label="Account Number"
                v-model="form.bankAccountNumber"
                placeholder="0123456789"
                maxlength="10"
                required
              />
              <AnimatedInput 
                label="Account Holder Name"
                v-model="form.bankAccountName"
                placeholder="Full name on account"
                required
              />
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-6 rounded-2xl flex gap-4 border border-amber-100 items-start">
          <Icon name="Info" class="text-amber-600 shrink-0 mt-0.5" size="20" />
          <p class="text-xs text-amber-900 leading-relaxed font-medium">
            Standard processing takes 24-48 hours. Ensure your bank details are accurate.
          </p>
        </div>

        <div class="pt-6 border-t border-gray-50">
          <button 
            type="submit" 
            :disabled="submitting || form.amount < 1000 || form.amount > summary?.walletBalance" 
            class="w-full py-4 bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:bg-gray-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <Icon v-if="submitting" name="RefreshCw" class="animate-spin" size="18" />
            <template v-else>Authorize Withdrawal</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const { summary, loading, fetchSummary } = useFetchEarningsSummary()
const { requestWithdrawal, loading: submitting } = useRequestWithdrawal()
const { user } = useUser()
const { showToast } = useCustomToast()

const form = reactive({
  amount: 0,
  bankName: user.value?.bankName || '',
  bankAccountNumber: user.value?.bankAccountNumber || '',
  bankAccountName: user.value?.bankAccountName || ''
})

onMounted(async () => {
  await fetchSummary()
  form.amount = summary.value?.walletBalance || 0
})

const { confirm } = useConfirmDialog()

const handleSubmit = async () => {
  if (form.amount < 1000) {
    showToast({
      title: 'Validation Error',
      message: 'The minimum payout request is ₦1,000.',
      toastType: 'warning'
    })
    return
  }

  const confirmed = await confirm({
    title: 'Confirm Payout Request',
    message: `Are you sure you want to withdraw ₦${form.amount.toLocaleString()}? This action will initiate a transfer to your bank account.`,
    confirmText: 'Authorize Payout',
    cancelText: 'Review Details',
    variant: 'warning'
  })

  if (!confirmed) return

  const res = await requestWithdrawal(form)
  if (res) {
    showToast({
      title: 'Request Authorized',
      message: 'Your payout request has been queued for processing.',
      toastType: 'success'
    })
    navigateTo('/dashboard/earnings')
  }
}

definePageMeta({
  layout: 'default'
})
</script>
