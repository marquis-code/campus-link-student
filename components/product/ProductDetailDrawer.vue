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
        class="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <h2 class="text-sm font-semibold text-gray-900">Product details</h2>
          <button @click="$emit('close')" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-900">
            <X :size="18" />
          </button>
        </div>

        <!-- Scrollable content -->
        <div v-if="product" class="flex-1 overflow-y-auto">
          <!-- Image -->
          <div class="aspect-square bg-gray-50 relative">
            <img :src="product.images?.[0] || 'https://via.placeholder.com/800'" class="w-full h-full object-cover" />
            <div class="absolute top-3 left-3">
              <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md text-gray-700 font-medium text-[10px] rounded-md shadow-sm">
                {{ product.category?.name || 'Asset' }}
              </span>
            </div>
          </div>

          <!-- Details -->
          <div class="px-5 py-6 space-y-6">
            <!-- Title & Price -->
            <div class="flex justify-between items-start gap-4">
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 leading-snug">{{ product.name }}</h3>
                <p class="text-xs text-gray-400 font-normal mt-1.5 flex items-center gap-1.5">
                  <MapPin :size="12" class="text-gray-300" />
                  {{ product.campus?.name || 'Campus Wide' }}
                </p>
              </div>
              <div class="text-right shrink-0">
                <p class="text-xl font-semibold text-gray-900">₦{{ product.price?.toLocaleString() }}</p>
              </div>
            </div>

            <!-- Commission info -->
            <div v-if="product.commissionAmount" class="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div class="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                <TrendingUp :size="16" />
              </div>
              <div class="flex-1">
                <p class="text-xs font-medium text-emerald-900">Commission per sale</p>
                <p class="text-sm font-semibold text-emerald-700">₦{{ product.commissionAmount?.toLocaleString() }}</p>
              </div>
            </div>

            <!-- Description -->
            <div v-if="product.description" class="space-y-2">
              <h4 class="text-xs font-semibold text-gray-400">Description</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Seller info -->
            <div v-if="product.seller" class="space-y-2">
              <h4 class="text-xs font-semibold text-gray-400">Sold by</h4>
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <Store :size="16" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ product.seller?.businessName || product.seller?.name || 'Vendor' }}</p>
                  <p class="text-[10px] text-gray-400">Verified seller</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer actions -->
        <div v-if="product" class="px-5 py-4 border-t border-gray-100 shrink-0 flex gap-3">
          <button 
            @click="$emit('promote', product)" 
            class="flex-1 py-3 bg-gray-900 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]"
          >
            <Megaphone :size="14" />
            Promote
          </button>
          <a 
            v-if="product.seller?.phone"
            :href="`https://wa.me/${product.seller.phone}?text=Hi, I'm interested in ${product.name}`" 
            target="_blank"
            class="flex-1 py-3 border border-gray-100 text-gray-700 rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            <MessageCircle :size="14" class="text-emerald-500" />
            Chat seller
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { 
  X, 
  MapPin, 
  TrendingUp, 
  Store, 
  Megaphone, 
  MessageCircle 
} from 'lucide-vue-next'

defineProps({
  open: { type: Boolean, default: false },
  product: { type: Object, default: null }
})

defineEmits(['close', 'promote'])
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
