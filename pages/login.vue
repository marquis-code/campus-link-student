<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-10 md:py-12 bg-white font-sans">
    <div class="w-full max-w-md space-y-10">
      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap class="text-white w-7 h-7" />
        </div>
        <h1 class="text-xl font-bold text-gray-900">Welcome back</h1>
        <p class="mt-2 text-sm text-gray-400 font-medium">Sign in to your CampusLink account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-4">
          <AnimatedInput 
            label="Email address"
            v-model="loginData.email"
            type="email"
            required
            placeholder="you@email.com"
            :error-message="loginErrors.email"
            :show-error="!!loginErrors.email"
          />
          <AnimatedInput 
            label="Password"
            v-model="loginData.password"
            type="password"
            required
            placeholder="••••••••"
            :error-message="loginErrors.password"
            :show-error="!!loginErrors.password"
          />
        </div>

        <div class="flex items-center justify-between px-1">
          <label class="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" class="custom-checkbox" />
            <span class="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">Remember me</span>
          </label>
          <NuxtLink to="/forgot-password" class="text-sm font-bold text-black hover:underline underline-offset-4">Forgot password?</NuxtLink>
        </div>

        <button 
          type="submit" 
          :disabled="loading || !isFormValid" 
          class="w-full py-4 bg-black text-white rounded-2xl flex justify-center items-center gap-3 text-sm font-bold transition-all hover:bg-gray-800 disabled:opacity-50"
        >
          <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
          <template v-else>Sign in</template>
        </button>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-100"></div></div>
          <div class="relative flex justify-center text-sm font-medium"><span class="bg-white px-4 text-gray-300">or</span></div>
        </div>

        <button @click="handleGoogleLogin" type="button" class="w-full flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
          <img src="@/assets/images/google-icon.svg" class="w-5 h-5" />
          Continue with Google
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 font-medium">
        Don't have an account?
        <NuxtLink to="/signup" class="font-bold text-black hover:underline underline-offset-4 ml-1">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { GraduationCap, Loader2 } from 'lucide-vue-next'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

definePageMeta({
  layout: false
})

const loginData = ref({
  email: '',
  password: ''
})

const loginErrors = ref({
  email: '',
  password: ''
})

const { login, loading: loginLoading } = useLogin()
const { socialLogin, loading: socialLoading } = useSocialLogin()
const { loginWithGoogle } = useFirebase()
const { showLoading, hideLoading } = useGlobalLoading()
const { showToast } = useCustomToast()

// Real-time validation
watch(() => loginData.value.email, (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (val.length > 0 && !emailRegex.test(val)) loginErrors.value.email = 'Please enter a valid email address'
  else loginErrors.value.email = ''
})

watch(() => loginData.value.password, (val) => {
  if (val.length > 0 && val.length < 6) loginErrors.value.password = 'Password must be at least 6 characters'
  else loginErrors.value.password = ''
})

const isFormValid = computed(() => {
  return loginData.value.email && 
         loginData.value.password && 
         !loginErrors.value.email && 
         !loginErrors.value.password
})

const loading = computed(() => loginLoading.value || socialLoading.value)

const handleLogin = async () => {
  if (!isFormValid.value) return
  
  showLoading()
  try {
    const res = await login(loginData.value)
    if (res) {
      showToast({
        title: 'Welcome back!',
        message: 'Taking you to your dashboard...',
        toastType: 'success'
      })
      navigateTo('/dashboard', { replace: true })
    }
  } catch (e) {
    showToast({
      title: 'Login failed',
      message: 'Wrong email or password. Please try again.',
      toastType: 'error'
    })
  } finally {
    hideLoading()
  }
}

const handleGoogleLogin = async () => {
  try {
    const idToken = await loginWithGoogle()
    if (idToken) {
      showLoading()
      const res = await socialLogin(idToken)
      if (res) navigateTo('/dashboard', { replace: true })
    }
  } catch (e) {
    showToast({
      title: 'Google sign in failed',
      message: 'Something went wrong. Please try again.',
      toastType: 'error'
    })
  } finally {
    hideLoading()
  }
}
</script>
