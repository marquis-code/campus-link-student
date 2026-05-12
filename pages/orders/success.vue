<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
    <div class="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
      <!-- Success Icon -->
      <div class="relative mx-auto w-24 h-24">
        <div class="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
        <div class="relative w-full h-full bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40">
          <Check size="40" stroke-width="3" />
        </div>
      </div>

      <!-- Text -->
      <div class="space-y-3">
        <h1 class="text-2xl font-black text-gray-900 tracking-tighter">Order Confirmed!</h1>
        <p class="text-gray-500 text-sm font-medium">Thank you for your purchase. Your payment was successful and your order is being processed.</p>
      </div>

      <!-- Action -->
      <div class="pt-8 space-y-4">
        <NuxtLink to="/" class="block w-full py-3 bg-black text-white rounded-2xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95">
          Return to Marketplace
        </NuxtLink>
        <p class="text-sm text-gray-400 font-medium">
          A confirmation email has been sent to you
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'

definePageMeta({
  layout: 'empty'
})
</script>
