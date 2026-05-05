<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-primary-600 tracking-tight">CAMPUSLINK</h1>
        <p class="mt-2 text-dark-500 font-medium">Welcome back! Please login to your account.</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Email address</label>
            <input id="email" v-model="form.email" type="email" required class="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label for="password" class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Password</label>
            <input id="password" v-model="form.password" type="password" required class="input-field" placeholder="••••••••" />
          </div>
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
          <button type="submit" :disabled="loading" class="btn-primary w-full flex justify-center py-4">
            <template v-if="loading">
              <Icon name="ph:spinner-bold" class="animate-spin text-2xl" />
            </template>
            <template v-else>Login</template>
          </button>
        </div>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-dark-100"></div></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-2 text-dark-400 font-bold">Or continue with</span></div>
        </div>

        <button @click="handleGoogleLogin" type="button" class="w-full flex items-center justify-center gap-3 py-4 border-2 border-dark-100 rounded-2xl font-bold text-dark-700 hover:bg-dark-50 transition-all">
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
definePageMeta({
  layout: false
})

const { login, loading: loginLoading } = useLogin()
const { socialLogin, loading: socialLoading } = useSocialLogin()
const { loginWithGoogle } = useFirebase()

const loading = computed(() => loginLoading.value || socialLoading.value)
const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const res = await login(form)
  if (res) navigateTo('/')
}

const handleGoogleLogin = async () => {
  const idToken = await loginWithGoogle()
  if (idToken) {
    const res = await socialLogin(idToken)
    if (res) navigateTo('/')
  }
}
</script>
