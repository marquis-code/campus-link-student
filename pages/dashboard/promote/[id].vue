<template>
  <div class="max-w-3xl mx-auto space-y-10 py-6 pb-24">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group">
        <Icon name="ArrowLeft" size="18" class="text-gray-400 group-hover:text-black transition-colors" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Promote Asset</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Generate marketing assets and track conversions</p>
      </div>
    </header>

    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="h-40 bg-gray-100 rounded-2xl"></div>
      <div class="h-64 bg-gray-100 rounded-2xl"></div>
    </div>

    <div v-else-if="product && referral" class="space-y-10">
      <!-- Product Showcase -->
      <div class="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-sm">
        <div class="w-32 h-32 rounded-xl overflow-hidden border border-gray-100 shrink-0">
          <img :src="product.images?.[0] || 'https://via.placeholder.com/400'" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 text-center md:text-left space-y-3">
          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <span class="px-2.5 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">{{ product.category?.name || 'Asset' }}</span>
            <span class="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-md uppercase tracking-wider">Active Inventory</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 tracking-tight">{{ product.name }}</h3>
          <div class="flex items-center justify-center md:justify-start gap-6 pt-1">
             <div>
                <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sale Commission</p>
                <p class="text-lg font-bold text-green-600">₦{{ product.commissionAmount?.toLocaleString() }}</p>
             </div>
             <div class="w-px h-8 bg-gray-100"></div>
             <div>
                <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Retail Price</p>
                <p class="text-lg font-bold text-gray-900">₦{{ product.price?.toLocaleString() }}</p>
             </div>
          </div>
        </div>
      </div>

      <!-- Referral Link -->
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Unique Asset Link</h4>
        <div class="bg-gray-900 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div class="flex flex-col md:flex-row gap-4 items-center relative z-10">
            <div class="flex-1 w-full bg-white/10 border border-white/10 p-3.5 rounded-xl text-white font-mono text-xs truncate">
              {{ referralLink }}
            </div>
            <button @click="copyLink" class="w-full md:w-auto px-6 py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              <Icon :name="copied ? 'Check' : 'Copy'" size="16" />
              {{ copied ? 'Copied' : 'Copy Link' }}
            </button>
          </div>
        </div>
      </div>

      <!-- AI Marketing -->
      <div class="space-y-6">
        <div class="flex items-center justify-between px-1">
          <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Marketing Engine</h4>
          <button @click="handleGenerateCopy" :disabled="generatingCopy" class="text-[10px] font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Icon name="RefreshCw" :class="{ 'animate-spin': generatingCopy }" size="14" />
            Regenerate
          </button>
        </div>

        <div v-if="copy" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div class="px-5 py-3 bg-green-50 flex items-center justify-between border-b border-green-100">
              <span class="text-green-700 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="MessageCircle" size="14" /> WhatsApp Status
              </span>
              <button @click="shareOnWhatsapp" class="text-green-600 font-bold text-[10px] uppercase tracking-wider hover:underline">Share</button>
            </div>
            <div class="p-6 flex-1">
              <p class="text-sm text-gray-600 leading-relaxed">{{ copy.whatsappCaption }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div class="px-5 py-3 bg-gray-50 flex items-center justify-between border-b border-gray-100">
              <span class="text-gray-600 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="Megaphone" size="14" /> Direct Message
              </span>
              <button @click="copyText(copy.marketingText)" class="text-black font-bold text-[10px] uppercase tracking-wider hover:underline">Copy All</button>
            </div>
            <div class="p-6 flex-1">
              <p class="text-sm text-gray-600 leading-relaxed">{{ copy.marketingText }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const { fetchProduct, loading } = useFetchProduct()
const { generateCopy, loading: generatingCopy } = useAiCopy()

const product = ref<any>(null)
const referral = ref<any>(null)
const copy = ref<any>(null)
const copied = ref(false)

const referralLink = computed(() => {
  if (!referral.value) return ''
  return `${config.public.appUrl}/products/${product.value?._id}?ref=${referral.value._id}`
})

const fetchData = async () => {
  try {
    const [p, r] = await Promise.all([
      fetchProduct(route.params.id as string),
      $api.referrals.createReferral(route.params.id as string)
    ])
    product.value = p
    referral.value = r.data
    await handleGenerateCopy()
  } catch (e) {
    console.error('Failed to initialize promotion')
  }
}

const handleGenerateCopy = async () => {
  copy.value = await generateCopy({
    productName: product.value.name,
    price: product.value.price,
    description: product.value.description,
    category: product.value.category?.name
  })
}

const copyLink = () => {
  navigator.clipboard.writeText(referralLink.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const { showToast } = useCustomToast()

const copyText = (text: string) => {
  navigator.clipboard.writeText(`${text}\n\nOrder here: ${referralLink.value}`)
  showToast({
    title: 'Copied',
    message: 'Marketing text copied to clipboard!',
    toastType: 'success'
  })
}

const shareOnWhatsapp = () => {
  if (!copy.value) return
  const text = `${copy.value.whatsappCaption}\n\nOrder here: ${referralLink.value}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}

onMounted(fetchData)

definePageMeta({
  layout: 'default'
})
</script>
