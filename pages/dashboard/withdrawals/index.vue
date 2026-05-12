<template>
  <div class="max-w-4xl mx-auto space-y-10 py-6 pb-24">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Payout History</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Audit logs for your capital withdrawals</p>
      </div>
      <NuxtLink 
        to="/dashboard/withdrawals/new" 
        class="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-gray-900 transition-all"
      >
        <Icon name="ArrowUpRight" size="18" />
        Request Payout
      </NuxtLink>
    </header>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="h-20 bg-gray-50 border border-gray-100 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="withdrawals.length > 0" class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
      <div class="divide-y divide-gray-50">
        <div v-for="w in withdrawals" :key="w._id" class="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-gray-50/50 transition-colors">
          <div class="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <Icon name="Landmark" size="20" />
          </div>
          
          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-3">
              <h4 class="font-bold text-gray-900 tracking-tight text-lg">₦{{ w.amount?.toLocaleString() }}</h4>
              <span 
                class="px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider"
                :class="{
                  'bg-amber-50 text-amber-600': w.status === 'pending',
                  'bg-green-50 text-green-600': w.status === 'completed',
                  'bg-red-50 text-red-600': w.status === 'failed'
                }"
              >
                {{ w.status }}
              </span>
            </div>
            <p class="text-xs text-gray-500 font-medium">
              {{ w.bankName }} • {{ w.bankAccountNumber }}
            </p>
          </div>

          <div class="text-left md:text-right space-y-1">
             <p class="text-sm font-bold text-gray-900">{{ new Date(w.createdAt).toLocaleDateString() }}</p>
             <p class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Ref: {{ w._id.slice(-8).toUpperCase() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="py-32 flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
      <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 text-gray-200">
         <Icon name="History" size="36" />
      </div>
      <h3 class="text-xl font-bold text-gray-900">No Payout History</h3>
      <p class="text-gray-400 font-medium text-sm mt-2 max-w-xs mx-auto">Your withdrawal requests will appear here once you start moving your commissions.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { withdrawals, loading, fetchWithdrawals } = useFetchWithdrawals()

onMounted(() => {
  fetchWithdrawals()
})

definePageMeta({
  layout: 'default'
})
</script>
