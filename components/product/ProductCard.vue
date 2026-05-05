<template>
  <div class="bg-white border-2 border-dark-100 rounded-3xl overflow-hidden group hover:border-primary-600 transition-all duration-300">
    <div class="relative aspect-square overflow-hidden bg-dark-50">
      <img :src="product.images?.[0] || 'https://via.placeholder.com/400'" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div class="absolute top-3 right-3">
        <span class="px-3 py-1.5 bg-white border-2 border-primary-100 text-primary-600 font-bold text-sm rounded-full">
          Earn ₦{{ product.commissionAmount?.toLocaleString() }}
        </span>
      </div>
    </div>
    
    <div class="p-5 space-y-3">
      <div>
        <h3 class="font-bold text-dark-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{{ product.name }}</h3>
        <p class="text-sm text-dark-500 font-medium">{{ product.category?.name }} • {{ product.campus?.name }}</p>
      </div>

      <div class="flex items-center justify-between pt-1">
        <span class="text-xl font-black text-dark-900">₦{{ product.price?.toLocaleString() }}</span>
      </div>

      <div class="grid grid-cols-2 gap-3 pt-2">
        <NuxtLink :to="`/products/${product._id}`" class="btn-secondary py-3 px-0 text-center text-sm">Details</NuxtLink>
        <button @click="$emit('promote', product)" class="btn-primary py-3 px-0 text-center text-sm">Promote</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  product: { type: Object, required: true }
})
defineEmits(['promote'])
</script>
