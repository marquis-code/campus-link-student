<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-10 md:py-12 bg-white font-sans">
    <div class="w-full max-w-md space-y-10">
      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap class="text-white w-7 h-7" />
        </div>
        <h1 class="text-xl font-bold text-gray-900">Create your account</h1>
        <p class="mt-2 text-sm text-gray-400 font-medium">Join CampusLink and start earning today</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-5">
        <div class="space-y-4">
          <AnimatedInput 
            label="Full name"
            v-model="signupData.name"
            type="text"
            required
            placeholder="e.g. John Doe"
            :error-message="signupErrors.name"
            :show-error="!!signupErrors.name"
          />
          <AnimatedInput 
            label="Email address"
            v-model="signupData.email"
            type="email"
            required
            placeholder="you@email.com"
            :error-message="signupErrors.email"
            :show-error="!!signupErrors.email"
          />
          <AnimatedInput 
            label="Phone number"
            v-model="signupData.phone"
            type="tel"
            required
            placeholder="080 1234 5678"
            :error-message="signupErrors.phone"
            :show-error="!!signupErrors.phone"
          />
          <SelectInput 
            label="Your campus"
            v-model="signupData.campus"
            :options="campusOptions"
            required
            placeholder="Select your campus"
            :error-message="signupErrors.campus"
            :show-error="!!signupErrors.campus"
          />
          <AnimatedInput 
            label="Password"
            v-model="signupData.password"
            type="password"
            required
            placeholder="At least 6 characters"
            :error-message="signupErrors.password"
            :show-error="!!signupErrors.password"
          />
        </div>

        <div class="pt-2">
          <button 
            type="submit" 
            :disabled="loading || !isFormValid" 
            class="w-full py-4 bg-black text-white rounded-2xl flex justify-center items-center gap-3 text-sm font-bold transition-all hover:bg-gray-800 disabled:opacity-50"
          >
            <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
            <template v-else>Create account</template>
          </button>
        </div>
      </form>

      <p class="text-center text-sm text-gray-500 font-medium">
        Already have an account?
        <NuxtLink to="/login" class="font-bold text-black hover:underline underline-offset-4 ml-1">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { GraduationCap, Loader2 } from 'lucide-vue-next'
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
  password: ''
})

const { signup, loading: signupLoading } = useSignup()
const { campuses, fetchCampuses } = useFetchCampuses()
const { showLoading, hideLoading } = useGlobalLoading()
const { showToast } = useCustomToast()

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
  if (val.length > 0 && !emailRegex.test(val)) signupErrors.value.email = 'Please enter a valid email'
  else signupErrors.value.email = ''
})

watch(() => signupData.value.password, (val) => {
  if (val.length > 0 && val.length < 6) signupErrors.value.password = 'Must be at least 6 characters'
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
         !signupErrors.value.password
})

const loading = computed(() => signupLoading.value)

onMounted(async () => {
  showLoading()
  try {
    await fetchCampuses()
  } finally {
    hideLoading()
  }
})

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  showLoading()
  try {
    const res = await signup(signupData.value)
    if (res) {
      showToast({
        title: 'Account created!',
        message: 'Welcome to CampusLink. Let\'s get started.',
        toastType: 'success'
      })
      navigateTo('/dashboard')
    }
  } catch (err: any) {
    showToast({
      title: 'Signup failed',
      message: err?.data?.message || 'Something went wrong. Please try again.',
      toastType: 'error'
    })
  } finally {
    hideLoading()
  }
}
</script>
