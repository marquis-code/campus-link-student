<template>
  <div class="product-page min-h-screen bg-[#F8F6F1]">
    <!-- Loading Skeleton -->
    <div v-if="loading" class="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
      <div class="h-10 w-24 bg-gray-200 rounded-lg"></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="aspect-[4/5] bg-gray-200 rounded-3xl"></div>
        <div class="space-y-6">
          <div class="h-8 bg-gray-200 rounded-xl w-1/3"></div>
          <div class="h-14 bg-gray-200 rounded-xl w-3/4"></div>
          <div class="h-32 bg-gray-200 rounded-2xl"></div>
          <div class="h-14 bg-gray-200 rounded-xl"></div>
          <div class="h-14 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="product">
      <!-- Floating Nav -->
      <nav class="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 py-4 pointer-events-none">
        <div class="max-w-screen-xl mx-auto flex items-center justify-between pointer-events-auto">
          <NuxtLink
            to="/"
            class="back-btn flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm text-[13px] font-semibold text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 hover:shadow-md"
          >
            <ArrowLeft size="14" />
            <span>Back</span>
          </NuxtLink>

          <div class="flex items-center gap-2">
            <div class="px-4 py-2 bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm">
              <span class="text-[12px] font-bold text-gray-900 tracking-tight">CampusLink</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Product Layout -->
      <div class="pt-0 lg:pt-0">
        <!-- Mobile: Stacked Layout | Desktop: Side by Side -->
        <div class="flex flex-col lg:flex-row lg:min-h-screen">

          <!-- ─── LEFT: Image Panel ─── -->
          <div class="relative w-full lg:w-[48%] lg:sticky lg:top-0 lg:h-screen overflow-hidden bg-[#EEEAE2]">
            <!-- Image -->
            <img
              :src="product.images?.[0] || 'https://via.placeholder.com/900x1100/EEEAE2/AAAAAA?text=Product'"
              :alt="product.name"
              class="w-full h-full object-cover"
              style="min-height: 380px; max-height: 520px; object-fit: cover;"
            />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>

            <!-- Mobile Price Badge (shown only on mobile) -->
            <div class="lg:hidden absolute bottom-5 left-5 right-5">
              <div class="flex items-end justify-between">
                <div class="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-white/60">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Price</p>
                  <p class="text-2xl font-black text-gray-900 tracking-tight">₦{{ product.price?.toLocaleString() }}</p>
                </div>
                <div class="bg-emerald-500 text-white rounded-2xl px-4 py-3 shadow-xl">
                  <p class="text-[10px] font-bold uppercase tracking-wide">Verified</p>
                </div>
              </div>
            </div>

            <!-- Desktop Corner Badge -->
            <div class="hidden lg:flex absolute top-24 left-6 flex-col gap-2">
              <span class="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-gray-600 rounded-full uppercase tracking-wider shadow-sm border border-white/60">
                {{ product.category?.name }}
              </span>
              <span class="px-3 py-1.5 bg-emerald-500 text-[10px] font-bold text-white rounded-full uppercase tracking-wider shadow-sm">
                ✓ Verified Offer
              </span>
            </div>
          </div>

          <!-- ─── RIGHT: Details Panel ─── -->
          <div class="w-full lg:w-[52%] bg-[#F8F6F1] px-5 sm:px-8 lg:px-14 xl:px-20 pt-8 pb-16 lg:pt-28 lg:pb-20 flex flex-col">
            <div class="max-w-lg w-full mx-auto lg:mx-0 space-y-8 flex-1">

              <!-- Category Pills (mobile only) -->
              <div class="flex flex-wrap gap-2 lg:hidden">
                <span class="px-3 py-1.5 bg-white border border-gray-200 text-[10px] font-bold text-gray-600 rounded-full uppercase tracking-wider">
                  {{ product.category?.name }}
                </span>
                <span class="px-3 py-1.5 bg-emerald-500/10 border border-emerald-200 text-[10px] font-bold text-emerald-700 rounded-full uppercase tracking-wider">
                  ✓ Verified
                </span>
              </div>

              <!-- Title Block -->
              <div class="space-y-3">
                <h1 class="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-gray-900 leading-[1.1] tracking-tight">
                  {{ product.name }}
                </h1>
                <div class="flex items-center gap-2 text-gray-500">
                  <div class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <MapPin size="11" class="text-gray-500" />
                  </div>
                  <span class="text-[13px] font-semibold">{{ product.campus?.name }}</span>
                </div>
              </div>

              <!-- Description -->
              <div class="space-y-3">
                <p class="text-[13px] font-bold text-gray-400 uppercase tracking-widest">About this item</p>
                <p class="text-[15px] text-gray-600 leading-[1.75] font-medium">
                  {{ product.description }}
                </p>
              </div>

              <!-- Divider -->
              <div class="h-px bg-gray-200/70 w-full"></div>

              <!-- Desktop Price -->
              <div class="hidden lg:flex items-baseline justify-between gap-4">
                <div class="space-y-1">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</p>
                  <p class="text-5xl font-black text-gray-900 tracking-tight">₦{{ product.price?.toLocaleString() }}</p>
                </div>
                <div class="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl">
                  <ShieldCheck size="15" />
                  <span class="text-[11px] font-bold">Secure</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="space-y-3">
                <button
                  @click="showOrderForm = true"
                  class="cta-primary w-full py-4 sm:py-4.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-[15px] font-bold shadow-lg shadow-gray-900/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <span>Buy Now — ₦{{ product.price?.toLocaleString() }}</span>
                  <ArrowRight size="17" class="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <a
                  :href="`https://wa.me/${product.seller?.phone}?text=Hello, I'm interested in ${product.name}`"
                  target="_blank"
                  class="w-full py-4 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MessageCircle size="16" class="text-emerald-500" />
                  Chat with Seller on WhatsApp
                </a>
              </div>

              <!-- Trust Row -->
              <div class="grid grid-cols-3 gap-3 pt-2">
                <div class="trust-card flex flex-col items-center text-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <ShieldCheck size="17" class="text-gray-500" />
                  </div>
                  <span class="text-[11px] font-bold text-gray-600 leading-tight">Secure<br>Payment</span>
                </div>
                <div class="trust-card flex flex-col items-center text-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Truck size="17" class="text-gray-500" />
                  </div>
                  <span class="text-[11px] font-bold text-gray-600 leading-tight">Fast<br>Pickup</span>
                </div>
                <div class="trust-card flex flex-col items-center text-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                    <BadgeCheck size="17" class="text-gray-500" />
                  </div>
                  <span class="text-[11px] font-bold text-gray-600 leading-tight">Verified<br>Seller</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- ─────────── MODALS ─────────── -->
      <Transition name="modal-fade">
        <div
          v-if="showOrderForm || showPaymentOptions || orderCreated"
          class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            @click="closeAllModals"
          ></div>

          <!-- ── STEP 1: Delivery Info Modal ── -->
          <Transition name="slide-up">
            <div
              v-if="showOrderForm"
              class="modal-sheet relative z-10 w-full sm:max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden"
            >
              <!-- Handle bar (mobile) -->
              <div class="sm:hidden flex justify-center pt-3 pb-1">
                <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
              </div>

              <!-- Progress -->
              <div class="h-1 bg-gray-100">
                <div class="h-full bg-gray-900 transition-all duration-500" style="width: 50%"></div>
              </div>

              <div class="p-6 sm:p-8">
                <header class="mb-7">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 1 of 2</span>
                    <button @click="closeAllModals" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                      <X size="13" class="text-gray-600" />
                    </button>
                  </div>
                  <h2 class="text-xl font-black text-gray-900 tracking-tight">Your Details</h2>
                  <p class="text-[13px] text-gray-500 font-medium mt-1">We'll send your order confirmation here</p>
                </header>

                <div class="space-y-4">
                  <div class="form-group">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      v-model="orderForm.buyerName"
                      placeholder="e.g. Chioma Adeyemi"
                      class="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl outline-none transition-all duration-200 text-[14px] font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>

                  <div class="form-group">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      v-model="orderForm.buyerEmail"
                      type="email"
                      placeholder="you@example.com"
                      class="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl outline-none transition-all duration-200 text-[14px] font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>

                  <div class="form-group">
                    <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      v-model="orderForm.buyerPhone"
                      type="tel"
                      placeholder="080XXXXXXXX"
                      class="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl outline-none transition-all duration-200 text-[14px] font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>

                  <!-- Order Summary -->
                  <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-3 mt-2">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                        <img :src="product.images?.[0]" class="w-full h-full object-cover" />
                      </div>
                      <div class="min-w-0">
                        <p class="text-[12px] font-bold text-gray-900 truncate">{{ product.name }}</p>
                        <p class="text-[11px] text-gray-400 font-medium">{{ product.campus?.name }}</p>
                      </div>
                    </div>
                    <span class="text-[14px] font-black text-gray-900 flex-shrink-0">₦{{ product.price?.toLocaleString() }}</span>
                  </div>
                </div>

                <div class="flex gap-3 mt-7">
                  <button
                    @click="closeAllModals"
                    class="flex-none px-5 py-3.5 text-[13px] font-bold text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleProceedToPayment"
                    :disabled="!isFormValid"
                    class="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl text-[14px] font-bold transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    Continue
                    <ArrowRight size="15" class="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- ── STEP 2: Payment Method Modal ── -->
          <Transition name="slide-up">
            <div
              v-if="showPaymentOptions"
              class="modal-sheet relative z-10 w-full sm:max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden"
            >
              <div class="sm:hidden flex justify-center pt-3 pb-1">
                <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
              </div>

              <!-- Progress -->
              <div class="h-1 bg-gray-100">
                <div class="h-full bg-gray-900 transition-all duration-500" style="width: 100%"></div>
              </div>

              <div class="p-6 sm:p-8">
                <header class="mb-7">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Step 2 of 2</span>
                    <button @click="closeAllModals" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                      <X size="13" class="text-gray-600" />
                    </button>
                  </div>
                  <h2 class="text-xl font-black text-gray-900 tracking-tight">Payment Method</h2>
                  <p class="text-[13px] text-gray-500 font-medium mt-1">Choose how you'd like to pay</p>
                </header>

                <div class="space-y-3">
                  <!-- Card Option -->
                  <button
                    @click="selectedPaymentMethod = 'paystack'"
                    :class="[
                      'w-full p-4 border-2 rounded-2xl flex items-center gap-4 transition-all duration-200 text-left',
                      selectedPaymentMethod === 'paystack'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                    ]"
                  >
                    <div :class="['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors', selectedPaymentMethod === 'paystack' ? 'bg-white/15' : 'bg-white border border-gray-100']">
                      <CreditCard size="19" :class="selectedPaymentMethod === 'paystack' ? 'text-white' : 'text-gray-500'" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p :class="['text-[14px] font-bold leading-tight', selectedPaymentMethod === 'paystack' ? 'text-white' : 'text-gray-900']">Card / USSD / Bank</p>
                      <p :class="['text-[12px] font-medium mt-0.5', selectedPaymentMethod === 'paystack' ? 'text-white/60' : 'text-gray-400']">Instant via Paystack</p>
                    </div>
                    <div :class="['w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center', selectedPaymentMethod === 'paystack' ? 'border-white bg-white' : 'border-gray-300']">
                      <div v-if="selectedPaymentMethod === 'paystack'" class="w-2.5 h-2.5 rounded-full bg-gray-900"></div>
                    </div>
                  </button>

                  <!-- Bank Transfer Option -->
                  <button
                    @click="selectedPaymentMethod = 'bank_transfer'"
                    :class="[
                      'w-full p-4 border-2 rounded-2xl flex items-center gap-4 transition-all duration-200 text-left',
                      selectedPaymentMethod === 'bank_transfer'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                    ]"
                  >
                    <div :class="['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors', selectedPaymentMethod === 'bank_transfer' ? 'bg-white/15' : 'bg-white border border-gray-100']">
                      <Banknote size="19" :class="selectedPaymentMethod === 'bank_transfer' ? 'text-white' : 'text-gray-500'" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p :class="['text-[14px] font-bold leading-tight', selectedPaymentMethod === 'bank_transfer' ? 'text-white' : 'text-gray-900']">Bank Transfer</p>
                      <p :class="['text-[12px] font-medium mt-0.5', selectedPaymentMethod === 'bank_transfer' ? 'text-white/60' : 'text-gray-400']">Virtual account number</p>
                    </div>
                    <div :class="['w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center', selectedPaymentMethod === 'bank_transfer' ? 'border-white bg-white' : 'border-gray-300']">
                      <div v-if="selectedPaymentMethod === 'bank_transfer'" class="w-2.5 h-2.5 rounded-full bg-gray-900"></div>
                    </div>
                  </button>
                </div>

                <!-- Total -->
                <div class="mt-6 px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                  <span class="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Total to Pay</span>
                  <span class="text-[18px] font-black text-gray-900">₦{{ product.price?.toLocaleString() }}</span>
                </div>

                <div class="mt-5 space-y-3">
                  <button
                    @click="handleFinalPayment"
                    :disabled="!selectedPaymentMethod || orderLoading"
                    class="w-full py-4 bg-gray-900 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl text-[15px] font-bold shadow-lg shadow-gray-900/15 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Loader2 v-if="orderLoading" class="animate-spin w-4 h-4" />
                    <template v-else>
                      Confirm & Pay ₦{{ product.price?.toLocaleString() }}
                    </template>
                  </button>
                  <button
                    @click="showPaymentOptions = false; showOrderForm = true"
                    class="w-full py-2.5 text-[13px] font-bold text-gray-400 hover:text-gray-600 transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft size="13" />
                    Go back & edit details
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- ── STEP 3: Success / Bank Details Modal ── -->
          <Transition name="slide-up">
            <div
              v-if="orderCreated"
              class="modal-sheet relative z-10 w-full sm:max-w-[440px] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden"
            >
              <div class="sm:hidden flex justify-center pt-3 pb-1">
                <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
              </div>

              <div class="p-6 sm:p-8">
                <!-- Success Header -->
                <div class="text-center mb-8">
                  <div class="relative inline-flex items-center justify-center mb-5">
                    <div class="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-100 border border-emerald-100">
                      <CheckCircle2 size="38" class="text-emerald-500" />
                    </div>
                  </div>
                  <h2 class="text-2xl font-black text-gray-900 tracking-tight">Order Confirmed!</h2>
                  <p class="text-[14px] text-gray-500 font-medium mt-2">
                    {{ paymentMethod === 'bank_transfer' ? 'Complete your bank transfer below to activate your order.' : 'Your order has been placed successfully.' }}
                  </p>
                </div>

                <!-- Bank Transfer Details -->
                <div v-if="paymentMethod === 'bank_transfer'" class="space-y-3">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Transfer Details</p>

                  <!-- Bank Name -->
                  <div class="flex items-center justify-between px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl">
                    <div>
                      <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Bank</p>
                      <p class="text-[14px] font-bold text-gray-900 mt-0.5">{{ orderCreated.bankName }}</p>
                    </div>
                    <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                      <Banknote size="15" class="text-gray-400" />
                    </div>
                  </div>

                  <!-- Account Number -->
                  <div class="px-4 py-4 bg-gray-900 text-white rounded-2xl">
                    <p class="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Account Number</p>
                    <div class="flex items-center justify-between gap-4">
                      <span class="text-3xl font-black tracking-widest">{{ orderCreated.accountNumber }}</span>
                      <button
                        @click="copy(orderCreated.accountNumber)"
                        class="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[12px] font-bold transition-colors active:scale-95"
                      >
                        <Copy size="13" />
                        Copy
                      </button>
                    </div>
                  </div>

                  <!-- Amount Due -->
                  <div class="flex items-center justify-between px-4 py-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div>
                      <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Amount to Transfer</p>
                      <p class="text-2xl font-black text-emerald-700 mt-0.5">₦{{ orderCreated.totalPayable?.toLocaleString() }}</p>
                    </div>
                    <div class="text-emerald-500">
                      <CheckCircle2 size="24" />
                    </div>
                  </div>

                  <p class="text-[11px] text-gray-400 text-center font-medium px-2 leading-relaxed">
                    Transfer the exact amount. Your order activates automatically once payment is confirmed.
                  </p>
                </div>

                <button
                  @click="orderCreated = null"
                  class="mt-6 w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-[15px] font-bold shadow-lg shadow-gray-900/15 transition-all duration-200 active:scale-[0.98]"
                >
                  I've Completed the Transfer
                </button>
              </div>
            </div>
          </Transition>

        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-vue-next'

const route = useRoute()
const { fetchProduct } = useFetchProduct()
const { createOrder, loading: orderLoading } = useOrders()
const { showToast } = useCustomToast()

// ─── State ───
const product = ref<any>(null)
const showOrderForm = ref(false)
const showPaymentOptions = ref(false)
const orderCreated = ref<any>(null)
const paymentMethod = ref('bank_transfer')
const selectedPaymentMethod = ref('')

const orderForm = reactive({
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  notes: '',
})

// Referral
const referralCode = useCookie('active_referral', { maxAge: 60 * 60 * 24 })
if (route.query.ref) referralCode.value = route.query.ref as string

// ─── Data Fetching ───
const { data: productData, pending: loading } = await useAsyncData(
  `product-${route.params.id}`,
  () => fetchProduct(route.params.id as string)
)

watchEffect(() => {
  if (productData.value) product.value = productData.value
})

// ─── SEO ───
useSeoMeta({
  title: () => product.value ? `${product.value.name} — CampusLink` : 'Product Details',
  description: () => product.value?.description || 'Exclusive offer on CampusLink',
  ogImage: () => product.value?.images?.[0],
})

// ─── Computed ───
const isFormValid = computed(() =>
  orderForm.buyerName.trim() && orderForm.buyerEmail.trim() && orderForm.buyerPhone.trim()
)

// ─── Methods ───
const closeAllModals = () => {
  showOrderForm.value = false
  showPaymentOptions.value = false
  orderCreated.value = null
  selectedPaymentMethod.value = ''
}

const handleProceedToPayment = () => {
  showOrderForm.value = false
  showPaymentOptions.value = true
}

const handleFinalPayment = async () => {
  paymentMethod.value = selectedPaymentMethod.value

  const payload = {
    productId: product.value._id,
    ...orderForm,
    referralCode: referralCode.value,
    paymentMethod: selectedPaymentMethod.value,
  }

  const res = await createOrder(payload)
  if (res) {
    if (res.checkoutUrl) {
      window.location.href = res.checkoutUrl
    } else {
      orderCreated.value = res
      showPaymentOptions.value = false
      referralCode.value = null
    }
  }
}

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
  showToast({ title: 'Copied!', message: 'Account number copied to clipboard', toastType: 'success' })
}

definePageMeta({ layout: 'empty' })
</script>

<style scoped>
/* Page background */
.product-page {
  font-family: 'DM Sans', 'Nunito', system-ui, sans-serif;
}

/* Image panel fill */
@media (min-width: 1024px) {
  .product-page > div > div > div:first-child {
    min-height: 100vh;
  }
  .product-page img {
    min-height: 100vh;
    max-height: 100vh;
  }
}

/* Modal transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}
.slide-up-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-up-enter-from {
  transform: translateY(32px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(16px);
  opacity: 0;
}

/* Mobile: slide from bottom */
@media (max-width: 640px) {
  .slide-up-enter-from {
    transform: translateY(100%);
    opacity: 1;
  }
  .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 1;
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  }
}

/* Ensure modal-sheet has correct bottom safe area on mobile */
.modal-sheet {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

@media (max-width: 640px) {
  .modal-sheet {
    max-height: 92dvh;
    overflow-y: auto;
  }
}

/* CTA button glow */
.cta-primary {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.1);
}
.cta-primary:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22), 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* Trust cards hover */
.trust-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.trust-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

/* Input focus ring */
input:focus {
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
}
</style>