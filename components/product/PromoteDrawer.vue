<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="open" 
        class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div 
        v-if="open" 
        class="fixed inset-y-0 right-0 z-50 w-full sm:max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 class="text-sm font-semibold text-gray-900">Share & Earn</h2>
            <p class="text-[10px] text-gray-400 font-medium mt-0.5">Promotion toolkit</p>
          </div>
          <button @click="$emit('close')" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900">
            <X :size="18" />
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Loading State -->
          <div v-if="loading" class="p-5 space-y-5">
            <div class="flex gap-4 items-center">
              <div class="w-20 h-20 bg-gray-100 rounded-xl animate-pulse shrink-0"></div>
              <div class="flex-1 space-y-2">
                <div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                <div class="h-3 bg-gray-50 rounded w-1/2 animate-pulse"></div>
                <div class="h-5 bg-gray-100 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
            <div class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
            <div class="h-32 bg-gray-50 rounded-xl animate-pulse"></div>
            <div class="h-32 bg-gray-50 rounded-xl animate-pulse"></div>
          </div>

          <!-- Loaded Content -->
          <div v-else-if="product && referral" class="p-5 space-y-5">
            <!-- Product info -->
            <div class="flex gap-4 items-center">
              <div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <img :src="product.images?.[0] || 'https://via.placeholder.com/400'" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-gray-900 truncate">{{ product.name }}</h3>
                <p class="text-xs text-gray-400 mt-1">{{ product.category?.name }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="text-sm font-semibold text-emerald-600">₦{{ product.commissionAmount?.toLocaleString() }} reward</span>
                  <span class="text-xs text-gray-400">₦{{ product.price?.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <!-- Referral Link -->
            <div class="bg-gray-900 p-4 rounded-xl">
              <p class="text-[10px] font-medium text-white/50 mb-2">Your affiliate link</p>
              <div class="flex gap-2 items-center">
                <div class="flex-1 bg-white/5 border border-white/10 px-3 py-2.5 rounded-lg text-white font-mono text-[10px] truncate flex items-center gap-2">
                  <Link2 :size="12" class="text-white/40 shrink-0" />
                  {{ referralLink }}
                </div>
                <button 
                  @click="copyLink" 
                  class="px-4 py-2.5 bg-white text-gray-900 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-gray-100 active:scale-95 transition-all shrink-0"
                >
                  <component :is="copied ? CheckIcon : CopyIcon" :size="14" :class="copied ? 'text-emerald-500' : ''" />
                  {{ copied ? 'Copied' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- AI Content -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold text-gray-400">AI content</p>
                <button @click="handleGenerateCopy" :disabled="generatingCopy" class="text-[10px] font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gray-100 transition-all border border-gray-100">
                  <RefreshCcw :class="{ 'animate-spin': generatingCopy }" :size="12" />
                  Refresh
                </button>
              </div>

              <div v-if="generatingCopy" class="space-y-3">
                <div class="h-28 bg-gray-50 rounded-xl animate-pulse"></div>
                <div class="h-28 bg-gray-50 rounded-xl animate-pulse"></div>
              </div>

              <div v-else-if="copy" class="space-y-3">
                <!-- WhatsApp -->
                <div class="bg-white border border-gray-100 rounded-xl overflow-hidden group">
                  <div class="px-4 py-2.5 bg-emerald-50/50 flex items-center justify-between border-b border-emerald-50">
                    <div class="flex items-center gap-2">
                      <MessageCircle :size="14" class="text-emerald-500" />
                      <span class="text-xs font-medium text-emerald-800">WhatsApp status</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button @click="copyText(copy.whatsappCaption)" class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-all text-gray-400 hover:text-gray-900">
                        <CopyIcon :size="12" />
                      </button>
                      <button @click="shareOnWhatsapp" class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-all text-emerald-600">
                        <ExternalLink :size="12" />
                      </button>
                    </div>
                  </div>
                  <div class="p-4">
                    <p class="text-xs text-gray-600 leading-relaxed">{{ copy.whatsappCaption }}</p>
                  </div>
                </div>

                <!-- Direct Pitch -->
                <div class="bg-white border border-gray-100 rounded-xl overflow-hidden group">
                  <div class="px-4 py-2.5 bg-gray-50/50 flex items-center justify-between border-b border-gray-100">
                    <div class="flex items-center gap-2">
                      <Send :size="14" class="text-gray-400" />
                      <span class="text-xs font-medium text-gray-700">Direct pitch</span>
                    </div>
                    <button @click="copyText(copy.marketingText)" class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-all text-gray-400 hover:text-gray-900">
                      <CopyIcon :size="12" />
                    </button>
                  </div>
                  <div class="p-4">
                    <p class="text-xs text-gray-600 leading-relaxed">{{ copy.marketingText }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { 
  X, 
  Copy as CopyIcon, 
  Check as CheckIcon, 
  Link2, 
  RefreshCcw, 
  MessageCircle, 
  ExternalLink, 
  Send 
} from 'lucide-vue-next'

const props = defineProps({
  open: { type: Boolean, default: false },
  productId: { type: String, default: null }
})

const emit = defineEmits(['close'])

const config = useRuntimeConfig()
const { fetchProduct, loading: fetchingProduct } = useFetchProduct()
const { generateCopy, loading: generatingCopy } = useAiCopy()
const { createReferral, loading: initializingReferral } = useCreateReferral()
const { showToast } = useCustomToast()

const product = ref<any>(null)
const referral = ref<any>(null)
const copy = ref<any>(null)
const copied = ref(false)

const loading = computed(() => fetchingProduct.value || initializingReferral.value)

const referralLink = computed(() => {
  if (!referral.value) return ''
  return `${config.public.appUrl}/p/${referral.value.referralCode}`
})

const fetchData = async (id: string) => {
  product.value = null
  referral.value = null
  copy.value = null

  try {
    const [p, r] = await Promise.all([
      fetchProduct(id),
      createReferral(id)
    ])
    
    if (p) product.value = p
    if (r && r.type !== 'ERROR') referral.value = r.data

    if (product.value && referral.value) {
      await handleGenerateCopy()
    }
  } catch (e) {
    console.error('Failed to initialize promotion', e)
  }
}

const handleGenerateCopy = async () => {
  if (!product.value) return
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
  showToast({
    title: 'Link Copied',
    message: 'Referral link saved to clipboard',
    toastType: 'success'
  })
  setTimeout(() => copied.value = false, 2000)
}

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

// Watch for open + productId changes to fetch data
watch(() => [props.open, props.productId], ([isOpen, id]) => {
  if (isOpen && id) {
    fetchData(id as string)
  }
}, { immediate: true })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
