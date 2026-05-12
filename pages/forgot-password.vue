<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-10 md:py-12 bg-white font-sans">
    <div class="w-full max-w-md space-y-10">
      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
          <KeyRound class="text-white w-7 h-7" />
        </div>
        <h1 class="text-xl font-bold text-gray-900">Forgot password?</h1>
        <p class="mt-2 text-sm text-gray-400 font-medium">No worries, we'll send you reset instructions.</p>
      </div>

      <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <AnimatedInput 
            label="Email address"
            v-model="email"
            type="email"
            required
            placeholder="you@email.com"
            :error-message="error"
            :show-error="!!error"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading || !email" 
          class="w-full py-4 bg-black text-white rounded-2xl flex justify-center items-center gap-3 text-sm font-bold transition-all hover:bg-gray-800 disabled:opacity-50"
        >
          <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
          <template v-else>Reset password</template>
        </button>
      </form>

      <div v-else class="text-center space-y-6">
        <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p class="text-sm font-medium text-emerald-800">Check your email for instructions.</p>
        </div>
        <p class="text-xs text-gray-400">Didn't receive the email? Check your spam folder or try again.</p>
      </div>

      <p class="text-center text-sm text-gray-500 font-medium">
        Remember your password?
        <NuxtLink to="/login" class="font-bold text-black hover:underline underline-offset-4 ml-1">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { KeyRound, Loader2 } from 'lucide-vue-next'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

definePageMeta({
  layout: false
})

const email = ref('')
const error = ref('')
const submitted = ref(false)

const { forgotPassword, loading } = useForgotPassword()
const { showToast } = useCustomToast()

const handleSubmit = async () => {
  if (!email.value) return
  
  error.value = ''
  try {
    await forgotPassword(email.value)
    submitted.value = true
    showToast({
      title: 'Success',
      message: 'Check your email for reset instructions.',
      toastType: 'success'
    })
  } catch (err: any) {
    error.value = err?.data?.message || 'Something went wrong. Please try again.'
    showToast({
      title: 'Request failed',
      message: error.value,
      toastType: 'error'
    })
  }
}
</script>
