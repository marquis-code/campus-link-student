<template>
  <div class="max-w-2xl mx-auto space-y-10 py-6 pb-20">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group">
        <Icon name="ArrowLeft" size="18" class="text-gray-400 group-hover:text-black transition-colors" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Financial Payouts</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Manage where you receive your earnings</p>
      </div>
    </header>

    <div class="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
      <form @submit.prevent="handleUpdate" class="space-y-10 relative z-10">
        <div class="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
           <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Landmark" class="text-white" size="20" />
           </div>
           <div>
              <p class="text-sm font-bold text-gray-900">Secure Payouts</p>
              <p class="text-[11px] text-gray-500 font-medium">Verified Nigerian Bank Accounts only</p>
           </div>
        </div>

        <div class="space-y-8">
          <AnimatedInput 
            label="Bank Name"
            v-model="form.bankName"
            placeholder="e.g. Kuda Bank, GTBank"
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
            label="Account Name"
            v-model="form.bankAccountName"
            placeholder="Full Name as it appears on bank"
            required
          />
        </div>

        <div class="p-5 bg-amber-50 rounded-xl border border-amber-100 flex gap-4 items-start text-amber-800">
           <Icon name="AlertTriangle" size="18" class="shrink-0 mt-0.5" />
           <p class="text-xs leading-relaxed">
             Please double-check your account details. Providing incorrect information may lead to failed withdrawals or loss of funds.
           </p>
        </div>

        <div class="pt-6 border-t border-gray-50">
          <button 
            type="submit" 
            :disabled="loading" 
            class="w-full py-4 bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:bg-gray-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <Icon v-if="loading" name="RefreshCw" class="animate-spin" size="18" />
            <template v-else>Save Financial Details</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const { user } = useUser()
const { updateProfile, loading } = useUpdateProfile()
const { showToast } = useCustomToast()

const form = reactive({
  bankName: user.value?.bankName || '',
  bankAccountNumber: user.value?.bankAccountNumber || '',
  bankAccountName: user.value?.bankAccountName || ''
})

const handleUpdate = async () => {
  const success = await updateProfile(form)
  if (success) {
    showToast({
      title: 'Success',
      message: 'Your financial payout details have been updated.',
      toastType: 'success'
    })
    navigateTo('/dashboard/profile')
  }
}

definePageMeta({
  layout: 'default'
})
</script>
