<template>
  <div class="container mx-auto space-y-8 py-6 pb-24">
    <header class="flex items-center gap-4 px-1">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group active:scale-95">
        <ArrowLeft :size="18" class="text-gray-400 group-hover:text-black transition-colors" />
      </button>
      <div>
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Request Payout</h1>
        <p class="text-sm font-medium text-gray-600   mt-1">Convert Commission to Capital</p>
      </div>
    </header>

    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-32 bg-gray-50 rounded-3xl"></div>
      <div class="h-64 bg-gray-50 rounded-3xl"></div>
    </div>

    <div v-else class="space-y-8">
      <!-- Balance Info -->
      <div class="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <p class="text-sm font-bold text-white/40   mb-1 relative z-10">Available for Payout</p>
        <h2 class="text-3xl font-bold tracking-tighter relative z-10">₦{{ summary?.walletBalance?.toLocaleString() }}</h2>
        <div class="mt-6 flex items-center gap-2 relative z-10">
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span class="text-sm font-bold text-white/50  ">Verified Capital</span>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div class="space-y-6">
          <div class="flex items-center justify-between px-1">
             <h3 class="text-sm font-medium text-gray-600  ">Payout Amount</h3>
             <button type="button" @click="form.amount = summary?.walletBalance || 0" class="text-sm font-bold text-primary-600 hover:underline  ">Withdraw Max</button>
          </div>
          <div class="relative group">
            <label class="absolute left-4 -top-2 px-1.5 bg-white text-sm font-medium text-gray-600   transition-colors group-focus-within:text-primary-600">Enter Amount (₦)</label>
            <input 
              v-model="form.amount"
              type="number"
              placeholder="0.00"
              required
              class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white transition-all outline-none rounded-xl text-base font-bold text-gray-900"
            />
          </div>
          <p class="text-[9px] text-gray-400 font-bold   ml-1">Minimum withdrawal: ₦1,000</p>

          <div class="pt-8 border-t border-gray-50">
            <h3 class="text-sm font-medium text-gray-600   mb-6">Destination Account</h3>
            <div class="space-y-6">
              <div class="relative group">
                <label class="absolute left-4 -top-2 px-1.5 bg-white text-sm font-medium text-gray-600 z-10">Receiving Bank</label>
                <select 
                  v-model="form.bankCode" 
                  @change="onBankChange"
                  class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white transition-all outline-none rounded-xl text-xs font-bold text-gray-900 appearance-none"
                  required
                >
                  <option value="" disabled>Select your bank</option>
                  <option v-for="bank in banks" :key="bank.code" :value="bank.code">
                    {{ bank.name }}
                  </option>
                </select>
              </div>

              <div class="relative group">
                <label class="absolute left-4 -top-2 px-1.5 bg-white text-sm font-medium text-gray-600 z-10">Account Number</label>
                <input 
                  v-model="form.bankAccountNumber"
                  placeholder="0123456789"
                  maxlength="10"
                  required
                  class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white transition-all outline-none rounded-xl text-xs font-bold text-gray-900"
                />
                <div v-if="resolvingAccount" class="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 class="w-4 h-4 animate-spin text-gray-400" />
                </div>
              </div>

              <div class="relative group">
                <label class="absolute left-4 -top-2 px-1.5 bg-white text-sm font-medium text-gray-600 z-10">Account Holder Identity</label>
                <div class="relative">
                  <input 
                    v-model="form.bankAccountName"
                    placeholder="Auto-resolved account name"
                    readonly
                    required
                    class="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white transition-all outline-none rounded-xl text-xs font-bold text-gray-900 disabled:opacity-50"
                  />
                  <div v-if="form.bankAccountName && !resolvingAccount" class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                    <CheckCircle :size="16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-4 rounded-xl flex gap-3 border border-amber-100 items-start">
          <Info class="text-amber-600 shrink-0 mt-0.5" :size="16" />
          <p class="text-sm text-amber-900 leading-relaxed font-bold">
            Standard processing takes 24-48 hours. Ensure your bank details are accurate.
          </p>
        </div>

        <div class="pt-6 border-t border-gray-50">
          <button 
            type="submit" 
            :disabled="submitting || form.amount < 1000 || form.amount > summary?.walletBalance || !form.bankAccountName" 
            class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-[11px]   shadow-xl shadow-gray-100 hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
          >
            <Loader2 v-if="submitting" class="animate-spin" :size="16" />
            <template v-else>Authorize Withdrawal</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft, 
  Coins, 
  Info, 
  Loader2,
  CheckCircle
} from 'lucide-vue-next'
import { useFetchBanks } from '@/composables/modules/payments/useFetchBanks'

const { summary, loading, fetchSummary } = useFetchEarningsSummary()
const { requestWithdrawal, loading: submitting } = useRequestWithdrawal()
const { user } = useUser()
const { showToast } = useCustomToast()
const { banks, fetchBanks, resolveAccount } = useFetchBanks()

const form = reactive({
  amount: 0,
  bankName: user.value?.bankName || '',
  bankAccountNumber: user.value?.bankAccountNumber || '',
  bankAccountName: user.value?.bankAccountName || '',
  bankCode: user.value?.bankCode || ''
})

const resolvingAccount = ref(false)

onMounted(async () => {
  await Promise.all([
    fetchSummary(),
    fetchBanks()
  ])
  form.amount = summary.value?.walletBalance || 0
})

const onBankChange = () => {
  const bank = banks.value.find(b => b.code === form.bankCode)
  if (bank) form.bankName = bank.name
  if (form.bankAccountNumber.length === 10) {
    handleResolveAccount()
  }
}

const handleResolveAccount = async () => {
  if (!form.bankAccountNumber || form.bankAccountNumber.length !== 10 || !form.bankCode) return

  resolvingAccount.value = true
  form.bankAccountName = ''
  try {
    const data = await resolveAccount(form.bankAccountNumber, form.bankCode)
    form.bankAccountName = data.account_name
    showToast({ title: 'Account Verified', message: `Confirmed: ${data.account_name}`, toastType: 'success' })
  } catch (error) {
    showToast({ title: 'Resolution Failed', message: 'Could not verify account details.', toastType: 'error' })
  } finally {
    resolvingAccount.value = false
  }
}

watch(() => form.bankAccountNumber, (val) => {
  if (val && val.length === 10 && form.bankCode) {
    handleResolveAccount()
  }
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
