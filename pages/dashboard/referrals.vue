<template>
  <div class="space-y-8 py-6 w-full px-4 sm:px-8">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Campaign Assets</h1>
        <p class="text-gray-500 font-medium text-sm mt-1">Track and manage your active marketing links</p>
      </div>
      <button 
        @click="showCreateModal = true" 
        class="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-sm hover:bg-black transition-all active:scale-95"
      >
        <Plus :size="16" />
        New Campaign
      </button>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl animate-pulse">
        <div class="w-10 h-10 bg-gray-100 rounded-lg shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-gray-100 rounded w-1/3"></div>
          <div class="h-2 bg-gray-100 rounded w-1/2"></div>
        </div>
        <div class="h-3 bg-gray-100 rounded w-16"></div>
      </div>
    </div>

    <!-- Referral List -->
    <div v-else-if="referrals.length > 0" class="space-y-2">
      <div 
        v-for="ref in referrals" 
        :key="ref._id" 
        class="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all group"
      >
        <!-- Main row -->
        <div class="flex items-center gap-4">
          <!-- Product image -->
          <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
            <img v-if="ref.product?.images?.[0]" :src="ref.product.images[0]" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <Package :size="16" />
            </div>
          </div>

          <!-- Product info -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-900 truncate">{{ ref.product?.name || 'Asset' }}</h4>
            <p class="text-xs text-gray-400 mt-0.5">₦{{ ref.product?.commissionAmount?.toLocaleString() }} per sale</p>
          </div>

          <!-- Stats -->
          <div class="hidden sm:flex items-center gap-5 shrink-0">
            <div class="text-center">
              <p class="text-xs font-semibold text-gray-900">{{ ref.clicks || 0 }}</p>
              <p class="text-sm text-gray-400">Clicks</p>
            </div>
            <div class="text-center">
              <p class="text-xs font-semibold text-gray-900">{{ ref.salesCount || 0 }}</p>
              <p class="text-sm text-gray-400">Sales</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 shrink-0">
            <button 
              @click="copyLink(ref)" 
              class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              :title="copiedId === ref._id ? 'Copied!' : 'Copy link'"
            >
              <component :is="copiedId === ref._id ? Check : CopyIcon" :size="14" :class="copiedId === ref._id ? 'text-emerald-500' : ''" />
            </button>
            <button 
              @click="handlePromote(ref)" 
              class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              title="Promote"
            >
              <ExternalLink :size="14" />
            </button>
            <button 
              @click="handleDelete(ref)" 
              class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Archive"
            >
              <Trash2 :size="14" />
            </button>
          </div>
        </div>

        <!-- Link row (shown below on mobile, inline on wider) -->
        <div class="mt-3 flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
          <Link2 :size="12" class="text-gray-300 shrink-0" />
          <p class="text-sm font-mono text-gray-400 truncate flex-1 select-all">{{ getReferralLink(ref) }}</p>
          <button @click="copyLink(ref)" class="text-sm font-medium text-gray-500 hover:text-gray-900 shrink-0">
            {{ copiedId === ref._id ? 'Copied' : 'Copy' }}
          </button>
        </div>

        <!-- Mobile stats -->
        <div class="flex sm:hidden items-center gap-4 mt-3 pt-3 border-t border-gray-50">
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span class="text-sm text-gray-400">Active</span>
          </div>
          <span class="text-sm text-gray-400">{{ ref.clicks || 0 }} clicks</span>
          <span class="text-sm text-gray-400">{{ ref.salesCount || 0 }} sales</span>
        </div>
      </div>

      <!-- Add new row -->
      <button 
        @click="showCreateModal = true" 
        class="w-full p-4 border border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-xs font-medium text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all"
      >
        <Plus :size="14" />
        Add another campaign
      </button>
    </div>

    <!-- Empty State -->
    <div v-else class="py-24 flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-2xl">
      <div class="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-gray-200">
         <Megaphone :size="28" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900">No active campaigns</h3>
      <p class="text-gray-400 font-medium text-sm mt-1.5 max-w-sm mx-auto">Visit the marketplace to start promoting products and earning commissions.</p>
      <button @click="showCreateModal = true" class="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-xs shadow-sm hover:bg-black transition-all active:scale-95">
         Create your first campaign
      </button>
    </div>

    <CreateCampaignModal v-model="showCreateModal" @created="fetchReferrals" />

    <!-- Promote Drawer -->
    <PromoteDrawer 
      :open="promoteDrawerOpen" 
      :product-id="promoteProductId" 
      @close="promoteDrawerOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { 
  Plus, 
  Package, 
  Copy as CopyIcon, 
  Check, 
  ExternalLink, 
  Trash2, 
  Link2, 
  Megaphone 
} from 'lucide-vue-next'
import CreateCampaignModal from '@/components/referrals/CreateCampaignModal.vue'
import PromoteDrawer from '@/components/product/PromoteDrawer.vue'

const { referrals, loading, fetchReferrals, removeReferral } = useFetchReferrals()
const { user } = useUser()
const { confirm } = useConfirmDialog()
const { showToast } = useCustomToast()

const copiedId = ref('')
const showCreateModal = ref(false)
const promoteDrawerOpen = ref(false)
const promoteProductId = ref<string | null>(null)

const handleDelete = async (ref: any) => {
  const confirmed = await confirm({
    title: 'Archive Campaign',
    message: `Are you sure you want to archive the campaign for ${ref.product?.name}? You will no longer be able to track new clicks on this link.`,
    confirmText: 'Archive Asset',
    cancelText: 'Keep Active',
    variant: 'danger'
  })

  if (confirmed) {
    const success = await removeReferral(ref._id)
    if (success) {
      showToast({
        title: 'Asset Archived',
        message: 'The referral asset has been removed from your dashboard.',
        toastType: 'success'
      })
    }
  }
}

onMounted(() => {
  fetchReferrals()
})

const handlePromote = (ref: any) => {
  promoteProductId.value = ref.product?._id
  promoteDrawerOpen.value = true
}

const getReferralLink = (ref: any) => {
  const baseUrl = window.location.origin
  return `${baseUrl}/p/${ref.referralCode}`
}

const copyLink = (ref: any) => {
  const link = getReferralLink(ref)
  navigator.clipboard.writeText(link)
  copiedId.value = ref._id
  showToast({
    title: 'Link Copied',
    message: 'Referral link saved to clipboard',
    toastType: 'success'
  })
  setTimeout(() => {
    copiedId.value = ''
  }, 2000)
}

definePageMeta({
  layout: 'default'
})
</script>
