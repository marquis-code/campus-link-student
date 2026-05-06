<template>
  <div class="px-4 py-8 space-y-10 max-w-screen-xl mx-auto">
    <div>
      <h1 class="text-3xl font-bold text-dark-900 tracking-tight">Your earnings</h1>
      <p class="text-dark-500 font-medium">Track your commissions and successful referrals.</p>
    </div>

    <!-- Wallet Balance -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-dark-900 rounded-[40px] p-10 text-white space-y-8 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="space-y-1">
          <p class="text-[10px] font-bold tracking-[0.2em] opacity-60">Available for withdrawal</p>
          <h2 class="text-5xl font-bold tracking-tighter">₦24,500.00</h2>
        </div>
        <div class="flex gap-4">
           <button @click="navigateTo('/dashboard/withdrawals/new')" class="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all">Withdraw to bank</button>
           <button class="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10">History</button>
        </div>
      </div>
      
      <div class="bg-white border border-dark-100 rounded-[40px] p-10 flex flex-col justify-center">
        <p class="text-[10px] font-bold tracking-[0.2em] text-dark-400 mb-2">Total earned</p>
        <h3 class="text-4xl font-bold text-dark-900 tracking-tighter">₦86,200.00</h3>
        <div class="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-sm">
          <Icon name="ph:arrow-trend-up-bold" />
          <span>+₦12k this week</span>
        </div>
      </div>
    </div>

    <!-- Earnings Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="glass-card bg-white border border-dark-100 rounded-[40px] p-10">
        <h3 class="text-xl font-bold text-dark-900 mb-8">Recent commissions</h3>
        <div class="space-y-6">
          <div v-for="i in 4" :key="i" class="flex items-center gap-4">
            <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl">
              <Icon name="ph:money-wavy-duotone" />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-dark-900">Sale #{{1204 - i}}</h4>
              <p class="text-xs text-dark-400 font-medium">From Nike Sneakers • 2 hours ago</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-emerald-600">+₦1,200</p>
              <p class="text-[10px] font-bold text-dark-300">Paid</p>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card bg-white border border-dark-100 rounded-[40px] p-10">
        <h3 class="text-xl font-bold text-dark-900 mb-8">Referral performance</h3>
        <div class="space-y-6">
          <div v-for="i in 4" :key="i" class="flex items-center gap-4">
            <div class="w-14 h-14 bg-dark-50 text-dark-400 rounded-2xl flex items-center justify-center text-2xl">
              <Icon name="ph:link-bold" />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-dark-900">Product link #{{i}}</h4>
              <p class="text-xs text-dark-400 font-medium">{{80 - (i*10)}} clicks • {{5 - i}} sales</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-dark-900">₦{{(5000 - (i*500)).toLocaleString()}}</p>
              <div class="w-20 h-1.5 bg-dark-50 rounded-full mt-2">
                <div class="h-full bg-emerald-500 rounded-full" :style="{ width: (100 - (i*20)) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
const { user } = useUser()
</script>
