<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6">
    <div class="text-center space-y-4 max-w-sm animate-in fade-in zoom-in duration-700">
      <div class="relative">
        <div class="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-xl relative z-10">
          <Icon name="lucide:sparkles" class="text-white text-2xl animate-pulse" />
        </div>
        <div class="absolute inset-0 bg-black/5 rounded-full blur-2xl scale-150 animate-pulse"></div>
      </div>
      
      <div class="space-y-1">
        <h2 class="text-xl font-bold text-gray-900 tracking-tight">Connecting you...</h2>
        <p class="text-xs font-medium text-gray-400">Preparing your exclusive campus offer</p>
      </div>

      <!-- Loading Bar -->
      <div class="w-32 h-1 bg-gray-100 rounded-full mx-auto overflow-hidden">
        <div class="h-full bg-black animate-[loading_1.5s_ease-in-out_infinite] origin-left w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { referrals_api } from '@/api_factory/modules/referrals'

const route = useRoute()
const code = route.params.code as string

// Aggressive Tracking & SEO Data Fetch
const { data: res } = await useAsyncData(`track-${code}`, async () => {
  try {
    const response: any = await referrals_api.trackReferral(code)
    return response.data
  } catch (e) {
    return null
  }
})

if (res.value) {
  const product = res.value.product
  
  // Set referral cookie for tracking
  const referralCookie = useCookie('active_referral', { maxAge: 60 * 60 * 24 })
  referralCookie.value = code

  // Aggressive SEO Setup
  useSeoMeta({
    title: () => `${product.name} — CampusLink`,
    ogTitle: () => `${product.name} — CampusLink`,
    description: () => product.description || 'Exclusive offer on CampusLink',
    ogDescription: () => product.description || 'Exclusive offer on CampusLink',
    ogImage: () => product.images?.[0] || 'https://via.placeholder.com/800',
    twitterCard: 'summary_large_image',
    ogType: 'website',
  })

  // Client-side redirect to the actual product page
  if (import.meta.client) {
    setTimeout(() => {
       navigateTo(`/products/${product._id}?ref=${code}`)
    }, 600) // Slightly faster for mobile
  }
} else {
  if (import.meta.client) {
    navigateTo('/')
  }
}

definePageMeta({
  layout: false
})
</script>

<style scoped>
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
</style>
