<template>
  <div class="space-y-10 py-6">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Marketplace</h1>
        <p class="text-gray-500 font-medium text-sm mt-1">{{ user?.campus?.name || 'Academic Network' }}</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center bg-gray-100 p-1 rounded-xl">
          <button 
            @click="viewType = 'grid'" 
            class="p-2 rounded-lg transition-all"
            :class="viewType === 'grid' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          >
            <Icon name="LayoutGrid" size="18" />
          </button>
          <button 
            @click="viewType = 'list'" 
            class="p-2 rounded-lg transition-all"
            :class="viewType === 'list' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          >
            <Icon name="List" size="18" />
          </button>
        </div>
        <div class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
           <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span class="text-xs font-semibold text-gray-500">Live Inventory</span>
        </div>
      </div>
    </header>

    <!-- Search & Filters -->
    <div class="space-y-8">
      <div class="max-w-2xl">
        <AnimatedInput 
          v-model="search"
          label="Search products, brands, or categories"
          placeholder="Try 'cakes' or 'laptops'"
        >
          <template #right>
            <div class="p-2 mr-1">
              <Icon name="Search" class="text-gray-400" size="20" />
            </div>
          </template>
        </AnimatedInput>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Browse Categories</p>
          <p class="text-xs font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">{{ categories.length }} Categories</p>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
          <button 
            @click="selectedCategory = ''" 
            class="px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border" 
            :class="selectedCategory === '' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-100 hover:text-black hover:border-gray-200'"
          >
            All Items
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat._id" 
            @click="selectedCategory = cat._id" 
            class="px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border flex items-center gap-2.5" 
            :class="selectedCategory === cat._id ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-100 hover:text-black hover:border-gray-200'"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Display -->
    <div v-if="loading" :class="viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'">
      <div v-for="i in 8" :key="i" :class="viewType === 'grid' ? 'space-y-4' : 'flex gap-4 p-4 border border-gray-100 rounded-2xl animate-pulse'">
        <div :class="viewType === 'grid' ? 'aspect-square bg-gray-100 rounded-2xl' : 'w-24 h-24 bg-gray-100 rounded-xl'"></div>
        <div class="flex-1 space-y-3">
          <div class="h-4 bg-gray-100 rounded-lg w-3/4"></div>
          <div class="h-4 bg-gray-100 rounded-lg w-1/2"></div>
        </div>
      </div>
    </div>

    <div v-else-if="products.length > 0" :class="viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'">
      <ProductCard 
        v-for="product in products" 
        :key="product._id" 
        :product="product" 
        :view-type="viewType"
        @promote="handlePromote" 
      />
    </div>

    <div v-else class="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
      <Icon name="Package" class="mx-auto text-gray-200 mb-4" size="48" />
      <h3 class="text-lg font-bold text-gray-900">No products found</h3>
      <p class="text-gray-500 max-w-xs mx-auto text-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import ProductCard from '@/components/product/ProductCard.vue'

const { user } = useUser()
const { products, loading, fetchProducts } = useFetchProducts()
const { categories, fetchCategories } = useFetchCategories()

const search = ref('')
const viewType = ref('grid')
const selectedCategory = ref('')

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
  fetchCategories()
  fetchProducts({
    campus: user.value?.campus?._id,
    category: selectedCategory.value,
    search: debouncedSearch.value
  })
})

watch([selectedCategory, debouncedSearch, () => user.value?.campus?._id], () => {
  fetchProducts({
    campus: user.value?.campus?._id,
    category: selectedCategory.value,
    search: debouncedSearch.value
  })
})

const handlePromote = (product: any) => {
  navigateTo(`/dashboard/promote/${product._id}`)
}

definePageMeta({
  layout: 'default'
})
</script>
