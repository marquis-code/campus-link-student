<template>
  <div class="px-6 py-8 max-w-screen-md mx-auto space-y-8">
    <header class="flex items-center justify-between">
      <h1 class="text-3xl font-black text-dark-900 tracking-tight">Your Wallet</h1>
      <NuxtLink to="/dashboard/profile" class="w-10 h-10 rounded-full bg-dark-100 overflow-hidden border-2 border-white shadow-sm">
        <img :src="user?.avatar || 'https://via.placeholder.com/100'" class="w-full h-full object-cover" />
      </NuxtLink>
    </header>

    <div v-if="loading" class="space-y-8">
      <Skeleton height="200px" rounded="3xl" />
      <div class="grid grid-cols-2 gap-4">
        <Skeleton height="100px" rounded="2xl" />
        <Skeleton height="100px" rounded="2xl" />
      </div>
      <div class="space-y-4">
        <Skeleton v-for="i in 3" :key="i" height="80px" rounded="2xl" />
      </div>
    </div>

    <div v-else-if="summary" class="space-y-8 pb-12">
      <!-- Balance Card -->
      <div class="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-8 rounded-[40px] text-white shadow-2xl shadow-primary-500/40 relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-950/20 rounded-full blur-3xl"></div>
        
        <div class="relative space-y-6">
          <div class="flex items-center justify-between">
            <span class="text-primary-100 font-bold uppercase tracking-widest text-xs">Available Balance</span>
            <Icon name="ph:shield-check-fill" class="text-primary-200 text-xl" />
          </div>
          <h2 class="text-5xl font-black tracking-tight">₦{{ summary.availableEarnings?.toLocaleString() }}</h2>
          <div class="pt-4 border-t border-white/10 flex justify-between items-center">
            <button @click="navigateTo('/dashboard/withdrawals/new')" class="px-8 py-3 bg-white text-primary-600 font-black rounded-2xl shadow-lg active:scale-95 transition-all">
              Withdraw Funds
            </button>
            <div class="text-right">
              <p class="text-primary-100 text-xs font-bold uppercase tracking-tighter">Total Life Earnings</p>
              <p class="font-black text-xl">₦{{ summary.totalEarnings?.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="glass-card p-5 bg-amber-50/50 border-amber-100/50">
          <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
            <Icon name="ph:clock-countdown-duotone" class="text-xl" />
          </div>
          <p class="text-xs font-bold text-dark-400 uppercase tracking-wider">Pending</p>
          <h4 class="text-xl font-black text-dark-900">₦{{ summary.pendingEarnings?.toLocaleString() }}</h4>
        </div>
        <div class="glass-card p-5 bg-emerald-50/50 border-emerald-100/50">
          <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
            <Icon name="ph:check-circle-duotone" class="text-xl" />
          </div>
          <p class="text-xs font-bold text-dark-400 uppercase tracking-wider">Paid</p>
          <h4 class="text-xl font-black text-dark-900">₦{{ summary.paidEarnings?.toLocaleString() }}</h4>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-dark-900">Earnings History</h3>
          <NuxtLink to="/dashboard/earnings/history" class="text-primary-600 font-bold text-sm">View All</NuxtLink>
        </div>

        <div v-if="earnings.length > 0" class="space-y-3">
          <div v-for="item in earnings" :key="item._id" class="glass-card p-4 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-dark-50 flex items-center justify-center">
              <Icon :name="item.status === 'available' ? 'ph:trend-up-bold' : 'ph:clock-bold'" 
                :class="item.status === 'available' ? 'text-emerald-500' : 'text-amber-500'" 
                class="text-2xl" 
              />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-dark-900">{{ item.product?.name }}</h4>
              <p class="text-xs text-dark-400 font-medium">{{ new Date(item.createdAt).toLocaleDateString() }} • Order Ref: {{ item.order?._id?.slice(-6).toUpperCase() }}</p>
            </div>
            <div class="text-right">
              <p class="font-black text-dark-900">+₦{{ item.amount?.toLocaleString() }}</p>
              <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md" 
                :class="item.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="py-10">
          <EmptyState 
            icon="ph:empty-duotone" 
            title="No earnings yet" 
            description="Start promoting products to your friends and earn commissions on every sale." 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUser()
const { summary, fetchSummary, loading: summaryLoading } = useFetchEarningsSummary()
const { earnings, fetchEarnings, loading: historyLoading } = useFetchEarningsHistory()

const loading = computed(() => summaryLoading.value || historyLoading.value)

onMounted(() => {
  fetchSummary()
  fetchEarnings()
})
</script>
