<template>
  <div class="space-y-10 py-6">
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
      <div>
        <h1 class="text-2xl font-black text-gray-900 tracking-tight">Financial Hub</h1>
        <p class="text-xs font-bold text-gray-400 mt-1  ">Wallet & Earnings</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="showFundModal = true" class="flex-1 sm:flex-none px-5 py-2.5 bg-primary-600 text-white rounded-xl font-bold text-[11px] shadow-lg shadow-primary-50 hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
          <Plus :size="16" />
          Top Up
        </button>
        <button @click="navigateTo('/dashboard/withdrawals/new')" class="flex-1 sm:flex-none px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-[11px] shadow-lg shadow-gray-100 hover:bg-black transition-all flex items-center justify-center gap-2">
          <ArrowUpRight :size="16" />
          Withdraw
        </button>
      </div>
    </header>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl relative overflow-hidden lg:col-span-2">
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="space-y-1 relative z-10">
          <p class="text-[10px] font-black text-white/40  ">Available Balance</p>
          <div v-if="walletLoading" class="h-10 w-40 bg-white/10 animate-pulse rounded-xl"></div>
          <h2 v-else class="text-3xl sm:text-4xl font-black tracking-tighter">₦{{ wallet?.balance?.toLocaleString() || '0.00' }}</h2>
        </div>
        <div class="pt-2 flex items-center gap-2 relative z-10">
           <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span class="text-[10px] font-bold text-white/50  ">Active Ledger</span>
        </div>
      </div>
      
      <div class="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-center relative overflow-hidden group">
        <p class="text-[10px] font-black text-gray-400   mb-1">Total Earnings</p>
        <div v-if="loadingSummary" class="h-8 w-24 bg-gray-50 animate-pulse rounded-lg"></div>
        <h3 v-else class="text-2xl font-black text-gray-900 tracking-tighter">₦{{ summary?.totalEarnings?.toLocaleString() || '0.00' }}</h3>
        <div class="mt-3 flex items-center gap-1.5 text-emerald-600 text-[10px] font-black  ">
          <TrendingUp :size="14" />
          <span>Lifetime</span>
        </div>
      </div>
    </div>

    <!-- Ledger History -->
    <section id="history" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-sm font-black text-gray-900  ">Wallet History</h3>
        <span class="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[9px] font-black  ">{{ transactions.length }} Records</span>
      </div>

      <div v-if="transactionLoading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="h-16 bg-gray-50 rounded-2xl animate-pulse"></div>
      </div>

      <div v-else-if="transactions.length > 0" class="space-y-3">
        <!-- Desktop Table View -->
        <div class="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-50">
                <th class="px-6 py-3.5 text-[10px] font-black text-gray-400  ">Type</th>
                <th class="px-6 py-3.5 text-[10px] font-black text-gray-400  ">Details</th>
                <th class="px-6 py-3.5 text-[10px] font-black text-gray-400  ">Amount</th>
                <th class="px-6 py-3.5 text-[10px] font-black text-gray-400   text-right">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in transactions" :key="item._id" class="group hover:bg-gray-50/30 transition-colors">
                <td class="px-6 py-4">
                  <div :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105',
                    item.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  ]">
                    <component :is="item.type === 'credit' ? ArrowDownLeft : ArrowUpRight" :size="14" />
                  </div>
                </td>
                <td class="px-6 py-4 min-w-[200px]">
                  <p class="text-[9px] font-black text-gray-400   leading-none">{{ item.purpose }}</p>
                  <p class="text-xs font-bold text-gray-900 mt-1 line-clamp-1">{{ item.description }}</p>
                </td>
                <td class="px-6 py-4">
                  <p :class="['text-sm font-black tracking-tighter', item.type === 'credit' ? 'text-emerald-600' : 'text-rose-600']">
                    {{ item.type === 'credit' ? '+' : '-' }}₦{{ item.amount?.toLocaleString() }}
                  </p>
                </td>
                <td class="px-6 py-4 text-right">
                  <p class="text-[10px] font-bold text-gray-400">{{ new Date(item.createdAt).toLocaleDateString() }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden space-y-3">
          <div v-for="item in transactions" :key="item._id" class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
              item.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            ]">
              <component :is="item.type === 'credit' ? ArrowDownLeft : ArrowUpRight" :size="16" />
            </div>
            <div class="flex-1 min-w-0">
               <p class="text-[9px] font-black text-gray-400   truncate">{{ item.purpose }}</p>
               <p class="text-xs font-bold text-gray-900 mt-0.5 truncate">{{ item.description }}</p>
            </div>
            <div class="text-right">
              <p :class="['text-sm font-black tracking-tighter', item.type === 'credit' ? 'text-emerald-600' : 'text-rose-600']">
                {{ item.type === 'credit' ? '+' : '-' }}₦{{ item.amount?.toLocaleString() }}
              </p>
              <p class="text-[9px] text-gray-400 font-bold">{{ new Date(item.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-16 flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
        <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-200">
           <Wallet :size="28" />
        </div>
        <h3 class="text-lg font-black text-gray-900 tracking-tight">Empty Vault</h3>
        <p class="text-gray-400 text-xs mt-2 max-w-[200px] mx-auto font-medium leading-relaxed">Your financial transactions will appear here.</p>
      </div>
    </section>

    <!-- Fund Wallet Modal -->
    <Teleport to="body">
      <div v-if="showFundModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click.self="showFundModal = false">
        <div class="bg-white rounded-3xl w-full max-w-[360px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
          <div class="bg-gray-900 p-8 text-white relative">
            <h3 class="text-xl font-black tracking-tight">Top Up Wallet</h3>
            <p class="text-[10px] text-white/40 mt-1   font-black">Secure Gateway</p>
            <button @click="showFundModal = false" class="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <X :size="20" />
            </button>
          </div>
          <div class="p-8 space-y-6">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-400   ml-1">Funding Amount (₦)</label>
              <input 
                v-model="fundAmount" 
                type="number" 
                placeholder="Min ₦100"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white transition-all outline-none text-base font-black text-gray-900"
              />
            </div>
            <div class="p-4 rounded-xl bg-primary-50 border border-primary-100 flex gap-3">
              <Info :size="16" class="text-primary-600 mt-0.5 shrink-0" />
              <p class="text-[10px] text-primary-800 font-bold leading-relaxed">
                Funds will be added instantly after successful payment.
              </p>
            </div>
            <button 
              @click="handleFundWallet"
              :disabled="fundLoading || !fundAmount"
              class="w-full py-3.5 rounded-xl bg-gray-900 text-white text-[11px] font-black   hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Loader2 v-if="fundLoading" :size="16" class="animate-spin" />
              <span v-else>Authorize Payment</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  ArrowDownLeft, 
  Wallet, 
  X, 
  Info, 
  Loader2 
} from 'lucide-vue-next'
import { useWallet } from '@/composables/modules/wallets/useWallet'
import { useUser } from '@/composables/modules/auth/user'
import { useCustomToast } from '@/composables/core/useCustomToast'

const { user } = useUser()
const config = useRuntimeConfig()
const { showToast } = useCustomToast()
const { summary, loading: loadingSummary, fetchSummary } = useFetchEarningsSummary()
const { wallet, transactions, loading: walletLoading, transactionLoading, fetchWallet, fetchTransactions, initializeFunding, syncEarnings } = useWallet()

const showFundModal = ref(false)
const fundAmount = ref('')
const fundLoading = ref(false)

const handleFundWallet = async () => {
  if (!fundAmount.value || Number(fundAmount.value) < 100) {
    showToast({ title: 'Invalid Amount', message: 'Minimum funding amount is ₦100', toastType: 'warning' })
    return
  }

  fundLoading.value = true
  try {
    const callbackUrl = `${window.location.origin}/dashboard/earnings`
    const res = await initializeFunding(Number(fundAmount.value), callbackUrl)
    
    if (res && res.checkoutUrl) {
      showToast({ title: 'Redirecting...', message: 'Opening secure payment gateway', toastType: 'info' })
      window.location.href = res.checkoutUrl
    } else {
      throw new Error('No checkout URL returned')
    }
  } catch (error) {
    showToast({ title: 'Error', message: 'Failed to initialize payment gateway', toastType: 'error' })
  } finally {
    fundLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    fetchSummary(),
    fetchWallet(),
    fetchTransactions(),
    syncEarnings()
  ])
})

definePageMeta({
  layout: 'default'
})
</script>
