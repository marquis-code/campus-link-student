<template>
  <div class="min-h-screen bg-white">
    <div v-if="loading" class="animate-pulse space-y-6 px-6 py-8">
      <div class="aspect-square bg-dark-100 rounded-3xl"></div>
      <div class="h-8 bg-dark-100 rounded w-3/4"></div>
      <div class="h-20 bg-dark-100 rounded"></div>
    </div>

    <div v-else-if="product" class="max-w-screen-md mx-auto">
      <!-- Back Button -->
      <div class="p-4 absolute top-0 left-0 z-10">
        <button @click="$router.back()" class="w-10 h-10 glass-card flex items-center justify-center">
          <Icon name="ph:arrow-left-bold" class="text-xl" />
        </button>
      </div>

      <!-- Image Gallery -->
      <div class="aspect-square bg-dark-50 relative">
        <img :src="product.images?.[0] || 'https://via.placeholder.com/800'" class="w-full h-full object-cover" />
      </div>

      <!-- Content -->
      <div class="px-6 py-8 space-y-8 bg-white -mt-10 rounded-t-[40px] relative">
        <!-- Success State: Virtual Account -->
        <div v-if="orderCreated" class="space-y-6">
          <div class="text-center space-y-2">
            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="ph:check-circle-duotone" class="text-4xl" />
            </div>
            <h2 class="text-2xl font-bold text-dark-900">Order placed!</h2>
            <p class="text-dark-500">Pay via bank transfer to confirm your order.</p>
          </div>

          <div class="bg-dark-50 p-6 rounded-3xl space-y-4 border border-dark-100">
            <div class="flex justify-between items-center pb-4 border-b border-dark-200">
              <span class="text-dark-500 font-bold tracking-wider text-[10px]">Bank name</span>
              <span class="text-dark-900 font-bold">{{ orderCreated.bankName }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-dark-500 font-bold tracking-wider text-[10px]">Account number</span>
              <div class="flex items-center gap-2">
                <span class="text-dark-900 font-bold text-xl">{{ orderCreated.accountNumber }}</span>
                <button @click="copy(orderCreated.accountNumber)" class="p-1 text-primary-600"><Icon name="ph:copy-bold" /></button>
              </div>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-dark-500 font-bold tracking-wider text-[10px]">Account name</span>
              <span class="text-dark-900 font-bold">{{ orderCreated.accountName }}</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-dark-200">
              <span class="text-dark-500 font-bold tracking-wider text-[10px]">Amount due</span>
              <span class="text-primary-600 font-bold text-lg">₦{{ orderCreated.totalAmount.toLocaleString() }}</span>
            </div>
          </div>
          
          <button @click="orderCreated = null" class="w-full py-4 text-dark-500 font-bold underline">Back to product</button>
        </div>

        <!-- Order Form -->
        <div v-else-if="showOrderForm" class="space-y-6">
          <h2 class="text-2xl font-bold text-dark-900">Complete your order</h2>
          <div class="space-y-4">
            <AnimatedInput 
              label="Full name"
              v-model="orderForm.buyerName"
              placeholder="Your full name"
              required
            />
            <AnimatedInput 
              label="Email address"
              v-model="orderForm.buyerEmail"
              type="email"
              placeholder="Your email address"
              required
            />
            <AnimatedInput 
              label="Phone number"
              v-model="orderForm.buyerPhone"
              type="tel"
              placeholder="Your phone number"
              required
            />
            <AnimatedInput 
              label="Delivery instructions (optional)"
              v-model="orderForm.notes"
              type="textarea"
              placeholder="e.g. Leave at the gate"
            />
          </div>
          <div class="flex gap-4">
            <button @click="showOrderForm = false" class="btn-secondary flex-1 py-4 font-bold">Cancel</button>
            <button @click="handlePlaceOrder" :disabled="orderLoading" class="btn-primary flex-[2] py-4 flex justify-center font-bold">
              <Icon v-if="orderLoading" name="ph:spinner-bold" class="animate-spin text-2xl" />
              <span v-else>Confirm order</span>
            </button>
          </div>
        </div>

        <div v-else class="space-y-8">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <span class="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full tracking-wider">{{ product.category?.name }}</span>
              <h1 class="text-3xl font-bold text-dark-900 leading-tight pt-1">{{ product.name }}</h1>
              <p class="text-dark-500 font-medium flex items-center gap-1">
                <Icon name="ph:map-pin-duotone" class="text-primary-500" />
                {{ product.campus?.name }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-3xl font-bold text-dark-900">₦{{ product.price?.toLocaleString() }}</p>
              <p v-if="isPromoter" class="text-emerald-600 font-bold text-sm">₦{{ product.commissionAmount?.toLocaleString() }} earnable</p>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-bold text-dark-900">Description</h3>
            <p class="text-dark-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <div v-if="isPromoter" class="bg-primary-50 p-6 rounded-3xl flex items-center gap-4">
            <div class="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl">
              <Icon name="ph:megaphone-duotone" />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-primary-900">Earn from this product</h4>
              <p class="text-primary-700 text-sm">Promote this to your friends and earn ₦{{ product.commissionAmount?.toLocaleString() }} per sale.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 pt-4">
            <NuxtLink v-if="isPromoter" :to="`/promote/${product._id}`" class="btn-primary py-5 text-lg text-center font-bold">
              Promote & earn commission
            </NuxtLink>
            <button @click="showOrderForm = true" class="btn-primary py-5 text-lg text-center font-bold">
              Order now — ₦{{ product.price?.toLocaleString() }}
            </button>
            <a :href="`https://wa.me/${product.seller?.phone}?text=Hello, I am interested in buying ${product.name} from CampusLink`" target="_blank" class="btn-secondary py-5 text-lg text-center flex items-center justify-center gap-2 font-bold">
              <Icon name="ph:whatsapp-logo-fill" class="text-emerald-500 text-2xl" />
              Chat with seller
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const route = useRoute()
const { fetchProduct, loading } = useFetchProduct()
const { createOrder, loading: orderLoading } = useOrders()
const { user } = useUser()

const product = ref(null)
const isPromoter = computed(() => !!user.value)

const showOrderForm = ref(false)
const orderCreated = ref(null)
const orderForm = reactive({
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  notes: ''
})

onMounted(async () => {
  product.value = await fetchProduct(route.params.id)
})

const handlePlaceOrder = async () => {
  const payload = {
    productId: product.value._id,
    ...orderForm,
    referralCode: route.query.ref as string
  }
  const res = await createOrder(payload)
  if (res) {
    orderCreated.value = res
  }
}

const { showToast } = useCustomToast()

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
  showToast({
    title: 'Copied',
    message: 'Account number copied to clipboard!',
    toastType: 'success'
  })
}
</script>
