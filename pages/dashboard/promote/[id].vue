<template>
  <div class="w-full space-y-8 py-6 pb-32 px-4 sm:px-8">
    <!-- Header Section -->
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group active:scale-95">
        <ArrowLeft size="20" class="text-gray-400 group-hover:text-primary-600 transition-colors" />
      </button>
      <div>
        <h1 class="text-2xl font-black text-gray-900 tracking-tight leading-none">Share & Earn</h1>
        <p class="text-xs font-bold text-gray-400 mt-1.5  ">Promotion Toolkit</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-8">
      <div class="h-32 bg-gray-50 rounded-3xl animate-pulse"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="h-48 bg-gray-50 rounded-3xl animate-pulse"></div>
        <div class="h-48 bg-gray-50 rounded-3xl animate-pulse"></div>
      </div>
    </div>

    <div v-else-if="product && referral" class="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <!-- Compact Product Showcase Card -->
      <div class="bg-white border-2 border-gray-50 p-6 rounded-[2rem] flex flex-col sm:flex-row gap-6 items-center shadow-sm relative overflow-hidden group">
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
        
        <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-white shadow-lg shrink-0 transition-transform group-hover:scale-105">
          <img :src="product.images?.[0] || 'https://via.placeholder.com/400'" class="w-full h-full object-cover" />
        </div>

        <div class="flex-1 text-center sm:text-left space-y-3 relative z-10">
          <div class="flex flex-wrap justify-center sm:justify-start gap-2">
            <span class="px-3 py-1 bg-gray-900 text-white text-[10px] font-black rounded-full  ">{{ product.category?.name || 'Digital Asset' }}</span>
            <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full   flex items-center gap-1.5">
               <span class="w-1 h-1 bg-emerald-500 rounded-full"></span>
               In Stock
            </span>
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight truncate max-w-md">{{ product.name }}</h3>
          
          <div class="flex items-center justify-center sm:justify-start gap-8">
             <div class="space-y-0.5">
                <p class="text-[10px] font-black text-gray-400  ">Your Reward</p>
                <p class="text-xl font-black text-emerald-600 tracking-tighter">₦{{ product.commissionAmount?.toLocaleString() }}</p>
             </div>
             <div class="w-px h-8 bg-gray-100"></div>
             <div class="space-y-0.5">
                <p class="text-[10px] font-black text-gray-400  ">Price</p>
                <p class="text-xl font-black text-gray-900 tracking-tighter">₦{{ product.price?.toLocaleString() }}</p>
             </div>
          </div>
        </div>
      </div>

      <!-- Compact Magic Link Section -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 px-1">
          <Sparkles class="text-primary-500" :size="16" />
          <h4 class="text-xs font-black text-gray-400  ">Your Unique Affiliate Link</h4>
        </div>
        <div class="bg-gray-900 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div class="flex flex-col md:flex-row gap-4 items-center relative z-10">
            <div class="flex-1 w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-xs truncate flex items-center gap-3">
              <Link2 :size="16" class="text-white/40" />
              {{ referralLink }}
            </div>
            <button 
              @click="copyLink" 
              class="w-full md:w-auto px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg group/btn"
            >
              <component :is="copied ? Check : Copy" :size="18" :class="copied ? 'text-emerald-500' : ''" />
              <span class="text-xs font-black  ">{{ copied ? 'Saved!' : 'Copy Link' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Compact AI Content Engine -->
      <div class="space-y-6">
        <div class="flex items-center justify-between px-1">
          <div class="flex items-center gap-2">
            <Cpu class="text-primary-500" :size="16" />
            <h4 class="text-xs font-black text-gray-400  ">AI Content Library</h4>
          </div>
          <button @click="handleGenerateCopy" :disabled="generatingCopy" class="text-xs font-black text-gray-900 bg-gray-50 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-all active:scale-95 border border-gray-100">
            <RefreshCcw :class="{ 'animate-spin': generatingCopy }" size="14" />
            Generate Fresh
          </button>
        </div>

        <div v-if="copy" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- WhatsApp Status -->
          <div class="bg-white border-2 border-gray-50 rounded-[2rem] overflow-hidden shadow-sm flex flex-col group hover:border-emerald-100 transition-colors">
            <div class="px-5 py-3 bg-emerald-50/30 flex items-center justify-between border-b border-emerald-50">
              <div class="flex items-center gap-2">
                <MessageCircle size="16" class="text-emerald-500" />
                <span class="text-emerald-900 font-black text-[10px]  ">WhatsApp Status</span>
              </div>
              <button @click="shareOnWhatsapp" class="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-emerald-600 shadow-sm hover:scale-110 transition-all border border-emerald-100">
                <ExternalLink size="14" />
              </button>
            </div>
            <div class="p-6 flex-1 relative">
              <p class="text-sm text-gray-600 leading-relaxed font-bold">"{{ copy.whatsappCaption }}"</p>
              <button 
                @click="copyText(copy.whatsappCaption)" 
                class="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
              >
                <Copy size="14" />
              </button>
            </div>
          </div>

          <!-- Direct Message -->
          <div class="bg-white border-2 border-gray-50 rounded-[2rem] overflow-hidden shadow-sm flex flex-col group hover:border-primary-100 transition-colors">
            <div class="px-5 py-3 bg-gray-50/50 flex items-center justify-between border-b border-gray-100">
              <div class="flex items-center gap-2">
                <Send size="16" class="text-gray-400" />
                <span class="text-gray-900 font-black text-[10px]  ">Direct Pitch</span>
              </div>
              <button @click="copyText(copy.marketingText)" class="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-primary-600 shadow-sm hover:scale-110 transition-all border border-gray-100">
                <Copy size="14" />
              </button>
            </div>
            <div class="p-6 flex-1 relative">
              <p class="text-sm text-gray-600 leading-relaxed font-bold">{{ copy.marketingText }}</p>
              <button 
                @click="copyText(copy.marketingText)" 
                class="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
              >
                <Copy size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  RefreshCcw, 
  MessageCircle, 
  ExternalLink, 
  Send,
  Link2
} from 'lucide-vue-next'

const route = useRoute()
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const { fetchProduct, loading: fetchingProduct } = useFetchProduct()
const { generateCopy, loading: generatingCopy } = useAiCopy()
const { createReferral, loading: initializingReferral } = useCreateReferral()

const product = ref<any>(null)
const referral = ref<any>(null)
const copy = ref<any>(null)
const copied = ref(false)

const loading = computed(() => fetchingProduct.value || initializingReferral.value)

const referralLink = computed(() => {
  if (!referral.value) return ''
  return `${config.public.appUrl}/p/${referral.value.referralCode}`
})

const fetchData = async () => {
  try {
    const [p, r] = await Promise.all([
      fetchProduct(route.params.id as string),
      createReferral(route.params.id as string)
    ])
    
    if (p) {
      product.value = p
    }

    if (r && r.type !== 'ERROR') {
      referral.value = r.data
    }

    if (product.value && referral.value) {
      await handleGenerateCopy()
    } else {
      console.error('Missing product or referral data', { p: product.value, r: referral.value })
    }
  } catch (e) {
    console.error('Failed to initialize promotion', e)
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
