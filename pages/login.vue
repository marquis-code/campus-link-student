<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
    <div v-if="loginData && loginErrors" class="w-full max-w-md space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
      <div class="text-center">
        <img src="@/assets/images/logo.png" alt="CampusLink" class="h-20 w-20 mx-auto mb-6 object-contain" />
        <h1 class="text-3xl font-black text-dark-900 tracking-tight">Welcome Back</h1>
        <p class="mt-2 text-dark-400 font-medium">Login to your promoter account.</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <AnimatedInput 
            label="Email address"
            v-model="loginData.email"
            type="email"
            required
            placeholder="you@example.com"
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

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-dark-600">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-semibold text-primary-600 hover:text-primary-500">Forgot password?</a>
          </div>
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
            <template v-else>Login</template>
          </button>
        </div>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-dark-100"></div></div>
          <div class="relative flex justify-center text-xs"><span class="bg-white px-2 text-dark-400 font-bold uppercase tracking-wider">Or continue with</span></div>
        </div>

        <button @click="handleGoogleLogin" type="button" class="w-full flex items-center justify-center gap-3 py-4 border-2 border-dark-100 rounded-2xl font-bold text-dark-700 hover:bg-dark-50 transition-all active:scale-[0.98]">
          <Icon name="logos:google-icon" class="text-xl" />
          Sign in with Google
        </button>
      </form>

      <p class="text-center text-sm text-dark-500">
        Don't have an account?
        <NuxtLink to="/signup" class="font-bold text-primary-600 hover:text-primary-500 underline decoration-2 underline-offset-4">Sign up for free</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
  const res = await login(loginData.value)
  hideLoading()
  
  if (res) navigateTo('/')
}

const handleGoogleLogin = async () => {
  const idToken = await loginWithGoogle()
  if (idToken) {
    showLoading()
    const res = await socialLogin(idToken)
    hideLoading()
    
    if (res) navigateTo('/')
  }
}
</script>
