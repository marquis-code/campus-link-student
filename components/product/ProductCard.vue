<template>
  <div 
    class="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:border-gray-200 transition-all duration-300 hover:shadow-lg flex"
    :class="viewType === 'grid' ? 'flex-col h-full' : 'flex-row gap-5 p-4 items-center'"
  >
    <div 
      class="relative overflow-hidden bg-gray-50 shrink-0"
      :class="viewType === 'grid' ? 'aspect-square' : 'w-20 h-20 md:w-28 md:h-28 rounded-xl'"
    >
      <img :src="product.images?.[0] || 'https://via.placeholder.com/600'" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      <!-- Overlay only for grid view -->
      <div v-if="viewType === 'grid'" class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
         <p class="text-[10px] font-medium text-white/70 mb-0.5">Commission</p>
         <p class="text-base font-semibold text-white">₦{{ product.commissionAmount?.toLocaleString() }}</p>
      </div>

      <div class="absolute top-2.5 left-2.5">
        <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md text-gray-700 font-medium text-[10px] rounded-md shadow-sm">
           {{ product.category?.name || 'Asset' }}
        </span>
      </div>
    </div>
    
    <div 
      class="flex-1 flex"
      :class="viewType === 'grid' ? 'p-4 flex-col' : 'flex-col md:flex-row md:items-center justify-between gap-4'"
    >
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors text-sm line-clamp-1 leading-snug">{{ product.name }}</h3>
        <p class="text-xs text-gray-400 font-normal mt-1.5 flex items-center gap-1.5">
           <MapPin :size="11" class="text-gray-300" />
           {{ product.campus?.name || 'Campus Wide' }}
        </p>
        
        <!-- List view specific: Commission & Price -->
        <div v-if="viewType === 'list'" class="flex items-center gap-5 mt-3">
           <div>
              <p class="text-[10px] font-medium text-gray-400 mb-0.5">Price</p>
              <p class="text-sm font-semibold text-gray-900">₦{{ product.price?.toLocaleString() }}</p>
           </div>
           <div class="w-px h-6 bg-gray-100"></div>
           <div>
              <p class="text-[10px] font-medium text-gray-400 mb-0.5">Commission</p>
              <p class="text-sm font-semibold text-emerald-600">₦{{ product.commissionAmount?.toLocaleString() }}</p>
           </div>
        </div>
      </div>

      <div 
        class="flex items-center gap-2"
        :class="viewType === 'grid' ? 'pt-4 border-t border-gray-50 mt-3' : 'shrink-0'"
      >
        <button 
          @click="$emit('view', product)"
          class="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-gray-100 text-xs font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Eye :size="14" />
          Details
        </button>
        <button 
          @click="$emit('promote', product)" 
          class="flex-[2] md:flex-none bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black transition-all shadow-sm group/btn px-5 py-2.5 text-xs font-medium gap-1.5 active:scale-95"
        >
          <span>Promote</span>
          <ArrowRight :size="14" class="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPin, 
  Eye, 
  ArrowRight 
} from 'lucide-vue-next'

defineProps({
  product: { type: Object, required: true },
  viewType: { type: String, default: 'grid' }
})
defineEmits(['promote', 'view'])
</script>
