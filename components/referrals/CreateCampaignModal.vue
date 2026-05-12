<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click="close">
        <transition name="scale">
          <div v-if="modelValue" class="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-gray-100 shadow-2xl" @click.stop>
            <!-- Header -->
            <div class="h-20 px-8 flex items-center justify-between border-b border-gray-100">
               <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                     <Plus class="text-white" :size="20" />
                  </div>
                  <div>
                     <h3 class="text-lg font-bold text-gray-900">New Campaign</h3>
                     <p class="text-xs font-medium text-gray-500">Generate a unique referral asset</p>
                  </div>
               </div>
               <button @click="close" class="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400">
                 <X :size="20" />
               </button>
            </div>

            <!-- Body -->
            <div class="p-8 space-y-8">
              <div class="space-y-4">
                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Select Product</label>
                <div class="relative">
                  <input 
                    v-model="search" 
                    type="text" 
                    placeholder="Search products to promote..." 
                    class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                  <div class="absolute right-4 top-4 text-gray-300">
                     <Search :size="20" />
                  </div>
                </div>

                <!-- Product List -->
                <div class="max-h-60 overflow-y-auto space-y-2 rounded-2xl border border-gray-50 p-2">
                  <div v-if="loading" class="space-y-2">
                    <div v-for="i in 3" :key="i" class="h-16 bg-gray-50 rounded-xl animate-pulse"></div>
                  </div>
                  <template v-else-if="products.length > 0">
                    <button 
                      v-for="p in products" 
                      :key="p._id" 
                      @click="selectedProduct = p"
                      class="w-full p-4 rounded-xl flex items-center gap-4 transition-all text-left group"
                      :class="selectedProduct?._id === p._id ? 'bg-black text-white' : 'hover:bg-gray-50'"
                    >
                      <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                         <img :src="p.images?.[0] || 'https://via.placeholder.com/100'" class="w-full h-full object-cover" />
                      </div>
                      <div class="flex-1 min-w-0">
                         <p class="text-sm font-bold truncate">{{ p.name }}</p>
                         <p class="text-sm uppercase font-bold" :class="selectedProduct?._id === p._id ? 'text-white/60' : 'text-green-600'">₦{{ p.commissionAmount }} / Sale</p>
                      </div>
                      <div v-if="selectedProduct?._id === p._id" class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                         <Check :size="14" />
                      </div>
                    </button>
                  </template>
                  <div v-else class="py-10 text-center text-gray-400 text-xs italic">
                     No products found. Try a different search.
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-8 bg-gray-50/50 border-t border-gray-100">
               <button 
                @click="handleCreate"
                :disabled="!selectedProduct || creating"
                class="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl hover:bg-gray-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
               >
                 <RefreshCw v-if="creating" class="animate-spin" :size="18" />
                 <template v-else>Launch Campaign</template>
               </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Plus, X, Search, Check, RefreshCw } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'created'])

const close = () => emit('update:modelValue', false)

const { products, loading, fetchProducts } = useFetchProducts()
const { createReferral, loading: creating } = useCreateReferral()
const { user } = useUser()
const search = ref('')
const selectedProduct = ref<any>(null)

// Debounced search
const debouncedSearch = ref('')
let searchTimeout: any = null

watch(search, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    debouncedSearch.value = val
  }, 500)
})

onMounted(() => {
  if (props.modelValue) fetchProducts({ campus: user.value?.campus?._id })
})

watch(() => props.modelValue, (val) => {
  if (val) fetchProducts({ campus: user.value?.campus?._id, search: debouncedSearch.value })
})

watch(debouncedSearch, () => {
  fetchProducts({ campus: user.value?.campus?._id, search: debouncedSearch.value })
})

const { $api } = useNuxtApp()
const { showToast } = useCustomToast()

const handleCreate = async () => {
  if (!selectedProduct.value) return
  try {
    const res = await createReferral(selectedProduct.value._id)
    if (res.type !== 'ERROR') {
      showToast({
        title: 'Campaign Launched',
        message: 'Your new referral asset is ready for promotion.',
        toastType: 'success'
      })
      emit('created', res.data)
      close()
    }
  } catch (e) {
    showToast({
       title: 'Error',
       message: 'Failed to create campaign asset. Please try again.',
       toastType: 'error'
    })
  }
}
</script>
