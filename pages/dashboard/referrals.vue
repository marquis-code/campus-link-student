<template>
  <div class="space-y-10 py-6 max-w-7xl mx-auto">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Campaign Assets</h1>
        <p class="text-gray-500 font-medium text-sm mt-1">Track and manage your active marketing links</p>
      </div>
      <button 
        @click="showCreateModal = true" 
        class="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md hover:bg-gray-900 transition-all"
      >
        <Icon name="Plus" size="18" />
        New Campaign
      </button>
    </header>

    <!-- Content Area -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="h-80 bg-gray-50 border border-gray-100 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="referrals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Active Assets -->
      <div v-for="ref in referrals" :key="ref._id" class="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 transition-all flex flex-col group shadow-sm">
        <div class="p-6 space-y-6 flex-1">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors overflow-hidden">
              <img v-if="ref.product?.images?.[0]" :src="ref.product.images[0]" class="w-full h-full object-cover" />
              <Icon v-else name="Package" size="20" />
            </div>
            <div class="min-w-0">
              <h4 class="font-bold text-gray-900 truncate tracking-tight text-base">{{ ref.product?.name || 'Asset' }}</h4>
              <p class="text-xs font-semibold text-green-600">₦{{ ref.product?.commissionAmount?.toLocaleString() }} / SALE</p>
            </div>
          </div>
          
          <div class="space-y-2">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider ml-1">Asset Link</p>
            <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 group/link">
              <p class="text-xs font-medium text-gray-500 truncate flex-1 select-all">{{ getReferralLink(ref) }}</p>
              <button @click="copyLink(ref)" class="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all">
                <Icon :name="copiedId === ref._id ? 'Check' : 'Copy'" size="16" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
              <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Engagements</p>
              <p class="text-xl font-bold text-gray-900">{{ ref.clicks || 0 }}</p>
            </div>
            <div class="p-4 bg-gray-900 text-white border border-gray-800 rounded-xl text-center">
              <p class="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">Conversions</p>
              <p class="text-xl font-bold text-white">{{ ref.salesCount || 0 }}</p>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
           <div class="flex items-center gap-2">
             <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
             <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Active</span>
           </div>
           <div class="flex items-center gap-3">
             <NuxtLink :to="`/dashboard/promote/${ref.productId}`" class="text-xs font-bold text-black hover:underline flex items-center gap-1">
                View Asset <Icon name="ArrowRight" size="14" />
             </NuxtLink>
             <div class="w-px h-4 bg-gray-200"></div>
             <button @click="handleDelete(ref)" class="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">
                Archive
             </button>
           </div>
        </div>
      </div>

      <!-- Add New Link Card -->
      <button @click="showCreateModal = true" class="group h-full bg-white border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-black transition-all min-h-[300px]">
        <div class="w-14 h-14 bg-gray-50 text-gray-300 rounded-xl flex items-center justify-center text-2xl transition-all group-hover:bg-black group-hover:text-white shadow-sm">
          <Icon name="Plus" />
        </div>
        <div>
          <h4 class="font-bold text-gray-900 text-base">Expand Portfolio</h4>
          <p class="text-gray-400 text-xs font-medium mt-1">Find more products to promote</p>
        </div>
      </button>
    </div>

    <!-- Empty State -->
    <div v-else class="py-32 flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-3xl shadow-sm">
      <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 text-gray-200">
         <Icon name="Megaphone" size="36" />
      </div>
      <h3 class="text-xl font-bold text-gray-900">No Active Campaigns</h3>
      <p class="text-gray-400 font-medium text-sm mt-2 max-w-sm mx-auto">You haven't generated any referral assets yet. Visit the marketplace to start earning.</p>
      <button @click="showCreateModal = true" class="mt-8 px-8 py-3 bg-black text-white rounded-xl font-bold text-sm shadow-xl hover:bg-gray-900 transition-all">
         Create Your First Campaign
      </button>
    </div>

    <CreateCampaignModal v-model="showCreateModal" @created="fetchReferrals" />
  </div>
</template>

<script setup lang="ts">
import CreateCampaignModal from '@/components/referrals/CreateCampaignModal.vue'

const { referrals, loading, fetchReferrals, removeReferral } = useFetchReferrals()
const { user } = useUser()
const { confirm } = useConfirmDialog()
const { showToast } = useCustomToast()

const copiedId = ref('')
const showCreateModal = ref(false)

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

const getReferralLink = (ref: any) => {
  const baseUrl = window.location.origin
  return `${baseUrl}/p/${ref.productId}?ref=${user.value?._id}`
}

const copyLink = (ref: any) => {
  const link = getReferralLink(ref)
  navigator.clipboard.writeText(link)
  copiedId.value = ref._id
  setTimeout(() => {
    copiedId.value = ''
  }, 2000)
}

definePageMeta({
  layout: 'default'
})
</script>
