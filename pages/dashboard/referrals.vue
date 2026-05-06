<template>
  <div class="px-4 py-8 space-y-10 max-w-screen-xl mx-auto">
    <div>
      <h1 class="text-3xl font-black text-dark-900 tracking-tight">Your Promotion Links</h1>
      <p class="text-dark-500 font-medium">Manage and track your active product referral links.</p>
    </div>

    <!-- Empty State or Link List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Create New Link Card -->
      <NuxtLink to="/dashboard" class="group h-full bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-[40px] p-10 flex flex-col items-center justify-center text-center space-y-4 hover:bg-emerald-100 transition-all">
        <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
          <Icon name="ph:plus-bold" />
        </div>
        <div>
          <h4 class="font-black text-emerald-900 text-lg">Promote New Product</h4>
          <p class="text-emerald-700 text-xs font-bold uppercase tracking-widest mt-1">Earn up to 15% commission</p>
        </div>
      </NuxtLink>

      <!-- Active Links -->
      <div v-for="i in 5" :key="i" class="glass-card bg-white border-2 border-dark-900 rounded-[40px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
        <div class="p-8 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-dark-50 rounded-xl"></div>
            <div>
              <h4 class="font-black text-dark-900 truncate">Campus Sneaker #{{i}}</h4>
              <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Commission: ₦1,500/sale</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 p-3 bg-dark-50 rounded-2xl border-2 border-dark-100">
            <p class="text-xs font-bold text-dark-400 truncate flex-1">campuslink.com/p/sneaker-{{i}}-ref-{{user?._id}}</p>
            <button class="p-2 bg-white border-2 border-dark-900 rounded-xl hover:bg-dark-900 hover:text-white transition-all">
              <Icon name="ph:copy-bold" />
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="text-center p-3 bg-dark-50/50 rounded-2xl">
              <p class="text-[10px] font-black text-dark-400 uppercase tracking-widest">Total Clicks</p>
              <p class="text-lg font-black text-dark-900">{{85 - (i*5)}}</p>
            </div>
            <div class="text-center p-3 bg-dark-50/50 rounded-2xl">
              <p class="text-[10px] font-black text-dark-400 uppercase tracking-widest">Total Earned</p>
              <p class="text-lg font-black text-dark-900">₦{{(4500 - (i*200)).toLocaleString()}}</p>
            </div>
          </div>
        </div>
        <div class="px-8 py-4 bg-dark-900 flex justify-between items-center">
           <span class="text-[10px] font-black text-white uppercase tracking-[0.2em]">Active Link</span>
           <button class="text-white hover:text-red-400 transition-colors"><Icon name="ph:trash-bold" /></button>
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
