<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
    <div v-if="signupData && signupErrors" class="w-full max-w-md space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
      <div class="text-center">
        <img src="@/assets/images/logo.png" alt="CampusLink" class="h-20 w-20 mx-auto mb-6 object-contain" />
        <h1 class="text-3xl font-black text-dark-900 tracking-tight">Create Account</h1>
        <p class="mt-2 text-dark-400 font-medium">Join the CampusLink network today.</p>
      </div>

      <form @submit.prevent="handleSignup" class="mt-8 space-y-5">
        <div class="space-y-4">
          <AnimatedInput 
            label="Full Name"
            v-model="signupData.name"
            type="text"
            required
            placeholder="John Doe"
            :error-message="signupErrors.name"
            :show-error="!!signupErrors.name"
          />
          <AnimatedInput 
            label="Email address"
            v-model="signupData.email"
            type="email"
            required
            placeholder="you@campus.edu"
            :error-message="signupErrors.email"
            :show-error="!!signupErrors.email"
          />
          <AnimatedInput 
            label="Phone Number"
            v-model="signupData.phone"
            type="tel"
            required
            placeholder="080 1234 5678"
            :error-message="signupErrors.phone"
            :show-error="!!signupErrors.phone"
          />
          <SelectInput 
            label="Select Campus"
            v-model="signupData.campus"
            :options="campusOptions"
            required
            placeholder="Choose your campus"
            :error-message="signupErrors.campus"
            :show-error="!!signupErrors.campus"
          />
          <AnimatedInput 
            label="Password"
            v-model="signupData.password"
            type="password"
            required
            placeholder="••••••••"
            :error-message="signupErrors.password"
            :show-error="!!signupErrors.password"
          />
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="loading || !isFormValid" 
            class="btn-primary w-full flex justify-center py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <template v-if="loading">
              <Icon name="ph:spinner-bold" class="animate-spin text-2xl" />
            </template>
            <template v-else>Create Account</template>
          </button>
        </div>
      </form>

      <p class="text-center text-sm text-dark-500">
        Already have an account?
        <NuxtLink to="/login" class="font-bold text-primary-600 hover:text-primary-500 underline decoration-2 underline-offset-4">Login here</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import SelectInput from '@/components/ui/SelectInput.vue'

definePageMeta({
  layout: false
})

const signupData = ref({
  name: '',
  email: '',
  phone: '',
  campus: '',
  role: 'student',
  password: ''
})

const signupErrors = ref({
  name: '',
  email: '',
  phone: '',
  campus: '',
  password: ''
})

const { signup, loading: signupLoading } = useSignup()
const { campuses, fetchCampuses } = useFetchCampuses()
const { showLoading, hideLoading } = useGlobalLoading()

const campusOptions = computed(() => {
  return campuses.value.map((c: any) => ({
    label: c.name,
    value: c._id
  }))
})

// Real-time validation
watch(() => signupData.value.name, (val) => {
  if (val.length > 0 && val.length < 3) signupErrors.value.name = 'Name must be at least 3 characters'
  else signupErrors.value.name = ''
})

watch(() => signupData.value.email, (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (val.length > 0 && !emailRegex.test(val)) signupErrors.value.email = 'Please enter a valid email address'
  else signupErrors.value.email = ''
})

watch(() => signupData.value.phone, (val) => {
  const phoneRegex = /^[0-9]{11}$/
  if (val.length > 0 && !phoneRegex.test(val)) signupErrors.value.phone = 'Please enter a valid 11-digit phone number'
  else signupErrors.value.phone = ''
})

watch(() => signupData.value.password, (val) => {
  if (val.length > 0 && val.length < 6) signupErrors.value.password = 'Password must be at least 6 characters'
  else signupErrors.value.password = ''
})

const isFormValid = computed(() => {
  return signupData.value.name && 
         signupData.value.email && 
         signupData.value.phone && 
         signupData.value.campus && 
         signupData.value.password && 
         !signupErrors.value.name && 
         !signupErrors.value.email && 
         !signupErrors.value.phone && 
         !signupErrors.value.password
})

const loading = computed(() => signupLoading.value)

onMounted(async () => {
  showLoading()
  await fetchCampuses()
  hideLoading()
})

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  showLoading()
  const res = await signup(signupData.value)
  hideLoading()
  
  if (res) navigateTo('/')
}
</script>
