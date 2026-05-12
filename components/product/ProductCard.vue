<template>
  <div 
    class="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:border-gray-300 transition-all duration-300 hover:shadow-lg flex"
    :class="viewType === 'grid' ? 'flex-col h-full' : 'flex-row gap-6 p-4 items-center'"
  >
    <div 
      class="relative overflow-hidden bg-gray-50 shrink-0"
      :class="viewType === 'grid' ? 'aspect-[4/5]' : 'w-24 h-24 md:w-32 md:h-32 rounded-xl'"
    >
      <img :src="product.images?.[0] || 'https://via.placeholder.com/600'" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      <!-- Overlay only for grid view -->
      <div v-if="viewType === 'grid'" class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
         <p class="text-[10px] font-medium text-white/80 mb-1">Commission Yield</p>
         <p class="text-lg font-bold text-white">₦{{ product.commissionAmount?.toLocaleString() }}</p>
      </div>

      <div class="absolute top-3 left-3">
        <span class="px-2.5 py-1 bg-white/90 backdrop-blur-md text-gray-900 font-semibold text-[10px] rounded-lg shadow-sm">
           {{ product.category?.name || 'Asset' }}
        </span>
      </div>
    </div>
    
    <div 
      class="flex-1 flex"
      :class="viewType === 'grid' ? 'p-5 flex-col' : 'flex-col md:flex-row md:items-center justify-between gap-4'"
    >
      <div class="flex-1">
        <h3 class="font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors text-base line-clamp-2 leading-snug">{{ product.name }}</h3>
        <p class="text-[10px] text-gray-400 font-medium mt-1 truncate">{{ product.campus?.name || 'Campus Wide' }}</p>
        
        <!-- List view specific: Commission & Price -->
        <div v-if="viewType === 'list'" class="flex items-center gap-6 mt-4">
           <div>
              <p class="text-[9px] font-semibold text-gray-400 mb-0.5">Price</p>
              <p class="text-sm font-bold text-gray-900">₦{{ product.price?.toLocaleString() }}</p>
           </div>
           <div class="w-px h-8 bg-gray-100"></div>
           <div>
              <p class="text-[9px] font-semibold text-gray-400 mb-0.5">Commission</p>
              <p class="text-sm font-bold text-green-600">₦{{ product.commissionAmount?.toLocaleString() }}</p>
           </div>
        </div>
      </div>

      <div 
        class="flex items-center justify-between"
        :class="viewType === 'grid' ? 'pt-4 border-t border-gray-50' : 'md:border-l md:border-gray-50 md:pl-8'"
      >
        <div v-if="viewType === 'grid'">
           <p class="text-[9px] font-semibold text-gray-400 mb-0.5">Price Point</p>
           <p class="text-base font-bold text-gray-900">₦{{ product.price?.toLocaleString() }}</p>
        </div>
        <button 
          @click="$emit('promote', product)" 
          class="bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-900 transition-all shadow-md group/btn"
          :class="viewType === 'grid' ? 'w-10 h-10' : 'px-6 py-2.5 text-xs font-bold gap-2'"
        >
          <span v-if="viewType === 'list'">Promote Asset</span>
          <Icon name="ArrowRight" size="18" class="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  product: { type: Object, required: true },
  viewType: { type: String, default: 'grid' }
})
defineEmits(['promote'])
</script>
