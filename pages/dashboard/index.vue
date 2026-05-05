<template>
  <div class="px-4 py-8 space-y-8 max-w-screen-xl mx-auto">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-dark-900">Discover Products</h1>
        <p class="text-dark-500 font-medium">{{ user?.campus?.name || 'Your Campus' }}</p>
      </div>
      <button class="w-12 h-12 glass-card flex items-center justify-center relative">
        <Icon name="ph:bell-duotone" class="text-2xl text-dark-700" />
        <span class="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </header>

    <!-- Search & Filters -->
    <div class="space-y-4">
      <div class="relative">
        <Icon name="ph:magnifying-glass-bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 text-xl" />
        <input v-model="search" type="text" placeholder="Search products, brands, or categories..." class="input-field pl-12 py-4 bg-white border-2 border-dark-100 focus:border-primary-600 transition-colors" />
      </div>

      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button @click="selectedCategory = ''" class="px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap border-2" :class="selectedCategory === '' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-dark-500 border-dark-100 hover:border-dark-200'">
          All Items
        </button>
        <button v-for="cat in categories" :key="cat._id" @click="selectedCategory = cat._id" class="px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap border-2" :class="selectedCategory === cat._id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-dark-500 border-dark-100 hover:border-dark-200'">
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="space-y-4">
        <Skeleton height="280px" rounded="3xl" />
        <Skeleton width="70%" height="24px" />
        <Skeleton width="40%" height="20px" />
      </div>
    </div>

    <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard v-for="product in products" :key="product._id" :product="product" @promote="handlePromote" />
    </div>

    <div v-else class="py-10">
      <EmptyState 
        icon="ph:package-duotone" 
        title="No products found" 
        description="Try adjusting your filters or search terms to find what you're looking for." 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUser()
const { products, loading, fetchProducts } = useFetchProducts()
const { categories, fetchCategories } = useFetchCategories()

const search = ref('')
const selectedCategory = ref('')

// Debounced search
const debouncedSearch = ref('')
watch(search, (val) => {
  const timeout = setTimeout(() => {
    debouncedSearch.value = val
  }, 500)
  return () => clearTimeout(timeout)
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

const handlePromote = (product) => {
  navigateTo(`/promote/${product._id}`)
}
</script>
