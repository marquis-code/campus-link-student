<template>
  <div class="px-6 py-8 max-w-screen-md mx-auto space-y-8">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 glass-card flex items-center justify-center">
        <Icon name="ph:arrow-left-bold" />
      </button>
      <h1 class="text-2xl font-bold text-dark-900 tracking-tight">Promote & earn</h1>
    </header>

    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-40 bg-dark-100 rounded-3xl"></div>
      <div class="h-60 bg-dark-100 rounded-3xl"></div>
    </div>

    <div v-else-if="product && referral" class="space-y-8">
      <!-- Product Summary -->
      <div class="glass-card p-4 flex gap-4 items-center">
        <img :src="product.images?.[0] || 'https://via.placeholder.com/200'" class="w-20 h-20 rounded-2xl object-cover" />
        <div>
          <h3 class="font-bold text-dark-900">{{ product.name }}</h3>
          <p class="text-sm font-bold text-emerald-600">Earnings: ₦{{ product.commissionAmount?.toLocaleString() }} / sale</p>
        </div>
      </div>

      <!-- Referral Link -->
      <div class="space-y-3">
        <AnimatedInput 
          label="Your unique link"
          :model-value="referralLink"
          readonly
        >
          <template #right>
            <button @click="copyLink" class="px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-colors mr-2">
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </template>
        </AnimatedInput>
      </div>

      <!-- AI Marketing Copy -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-sm font-bold text-dark-500 tracking-wider ml-1">AI marketing copy</label>
          <button @click="generateCopy" :disabled="generatingCopy" class="text-primary-600 font-bold text-sm flex items-center gap-1">
            <Icon name="ph:arrows-clockwise-bold" :class="{ 'animate-spin': generatingCopy }" />
            Regenerate
          </button>
        </div>

        <div v-if="copy" class="space-y-6">
          <!-- WhatsApp Caption -->
          <div class="glass-card overflow-hidden">
            <div class="bg-emerald-50 px-5 py-3 flex items-center justify-between border-b border-emerald-100">
              <span class="text-emerald-700 font-bold text-xs tracking-tight flex items-center gap-2">
                <Icon name="ph:whatsapp-logo-fill" class="text-lg" /> WhatsApp caption
              </span>
              <button @click="shareOnWhatsapp" class="text-emerald-700 font-bold text-xs hover:underline">Share now</button>
            </div>
            <div class="p-5">
              <p class="text-sm text-dark-700 whitespace-pre-wrap leading-relaxed">{{ copy.whatsappCaption }}</p>
              <div class="mt-4 p-3 bg-dark-50 rounded-xl border border-dashed border-dark-200 text-xs text-dark-400 font-mono">
                [Your referral link will be added at the end]
              </div>
            </div>
          </div>

          <!-- Marketing Text -->
          <div class="glass-card overflow-hidden">
            <div class="bg-primary-50 px-5 py-3 flex items-center justify-between border-b border-primary-100">
              <span class="text-primary-700 font-bold text-xs tracking-tight flex items-center gap-2">
                <Icon name="ph:megaphone-duotone" class="text-lg" /> Social media text
              </span>
              <button @click="copyText(copy.marketingText)" class="text-primary-700 font-bold text-xs hover:underline">Copy text</button>
            </div>
            <div class="p-5">
              <p class="text-sm text-dark-700 whitespace-pre-wrap leading-relaxed">{{ copy.marketingText }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 flex flex-col gap-4 pb-12">
        <button @click="shareOnWhatsapp" class="btn-primary bg-emerald-600 flex items-center justify-center gap-3 py-5 text-lg font-bold">
          <Icon name="ph:whatsapp-logo-fill" class="text-2xl" />
          Post to WhatsApp status
        </button>
        <p class="text-center text-dark-400 text-xs px-10">
          Tip: Posting on WhatsApp status is the most effective way to earn on campus!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const route = useRoute()
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const { fetchProduct, loading } = useFetchProduct()
const { generateCopy, loading: generatingCopy } = useAiCopy()

const product = ref(null)
const referral = ref(null)
const copy = ref(null)
const copied = ref(false)

const referralLink = computed(() => {
  if (!referral.value) return ''
  return `${config.public.appUrl}/products/${product.value?._id}?ref=${referral.value.referralCode}`
})

const fetchData = async () => {
  try {
    const [p, r] = await Promise.all([
      fetchProduct(route.params.id),
      $api.referrals.createReferral(route.params.id)
    ])
    product.value = p
    referral.value = r
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

const copyText = (text) => {
  navigator.clipboard.writeText(`${text}\n\nOrder here: ${referralLink.value}`)
  alert('Text copied!')
}

const shareOnWhatsapp = () => {
  const text = `${copy.value.whatsappCaption}\n\nOrder here: ${referralLink.value}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
}

onMounted(fetchData)
</script>
