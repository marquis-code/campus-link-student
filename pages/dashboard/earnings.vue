<template>
  <div class="space-y-10 py-6">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Financial Hub</h1>
        <p class="text-gray-500 font-medium text-sm mt-1">Monitor your performance and manage payouts</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/dashboard/withdrawals/new')" class="px-6 py-2.5 bg-black text-white rounded-xl font-semibold text-xs shadow-md hover:bg-gray-900 transition-all flex items-center gap-2">
          <Icon name="ArrowUpRight" size="18" />
          Withdraw Assets
        </button>
        <button @click="navigateTo('/dashboard/withdrawals')" class="px-6 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold text-xs hover:bg-gray-50 transition-all flex items-center gap-2">
          <Icon name="History" size="18" />
          Audit Log
        </button>
      </div>
    </header>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gray-900 rounded-2xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden lg:col-span-2">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div class="space-y-2 relative z-10">
          <p class="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Capital Reserve</p>
          <div v-if="loadingSummary" class="h-10 w-48 bg-white/10 animate-pulse rounded-xl"></div>
          <h2 v-else class="text-5xl font-bold tracking-tight">₦{{ summary?.walletBalance?.toLocaleString() || '0.00' }}</h2>
        </div>
        <div class="pt-4 flex items-center gap-3 relative z-10">
           <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
           <span class="text-xs font-medium text-white/60">Verified for immediate payout</span>
        </div>
      </div>
      
      <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col justify-center">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Gross Revenue</p>
        <div v-if="loadingSummary" class="h-8 w-32 bg-gray-100 animate-pulse rounded-lg"></div>
        <h3 v-else class="text-3xl font-bold text-gray-900 tracking-tight">₦{{ summary?.totalEarnings?.toLocaleString() || '0.00' }}</h3>
        <div class="mt-4 flex items-center gap-2 text-green-600 text-[11px] font-bold">
          <Icon name="TrendingUp" size="14" />
          <span>Active Performance</span>
        </div>
      </div>
    </div>

    <!-- Recent Commissions -->
    <section id="history" class="space-y-6">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-lg font-bold text-gray-900 tracking-tight">Recent Commissions</h3>
        <button v-if="earnings.length > 0" class="text-xs font-semibold text-gray-400 hover:text-black transition-colors uppercase tracking-wider">Download CSV</button>
      </div>

      <div v-if="loadingHistory" class="space-y-4">
        <div v-for="i in 5" :key="i" class="h-20 bg-gray-50 border border-gray-100 rounded-2xl animate-pulse"></div>
      </div>

      <div v-else-if="earnings.length > 0" class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th class="px-8 py-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                <th class="px-8 py-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Commission</th>
                <th class="px-8 py-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-8 py-5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in earnings" :key="item._id" class="group hover:bg-gray-50/50 transition-colors">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon name="DollarSign" size="18" />
                    </div>
                    <p class="text-sm font-semibold text-gray-900 group-hover:text-black">{{ item.source || 'Sale Commission' }}</p>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <p class="text-sm font-bold text-gray-900">₦{{ item.amount?.toLocaleString() }}</p>
                </td>
                <td class="px-8 py-6">
                  <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600">
                    Credited
                  </span>
                </td>
                <td class="px-8 py-6">
                  <p class="text-xs font-medium text-gray-400">{{ new Date(item.createdAt).toLocaleDateString() }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="py-24 flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 text-gray-300">
           <Icon name="Wallet" size="32" />
        </div>
        <h3 class="text-xl font-bold text-gray-900">No Earnings Recorded</h3>
        <p class="text-gray-400 text-sm mt-2 max-w-xs mx-auto">Your commissions from product sales will appear here. Start promoting to earn!</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { summary, loading: loadingSummary, fetchSummary } = useFetchEarningsSummary()
const { earnings, loading: loadingHistory, fetchEarnings } = useFetchEarningsHistory()

onMounted(() => {
  fetchSummary()
  fetchEarnings()
})

definePageMeta({
  layout: 'default'
})
</script>
