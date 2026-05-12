<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-10 md:py-12 bg-white font-sans">
    <div class="w-full max-w-md space-y-10">
      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
          <KeyRound class="text-white w-7 h-7" />
        </div>
        <h1 class="text-xl font-bold text-gray-900">Set new password</h1>
        <p class="mt-2 text-sm text-gray-400 font-medium">Please enter a secure new password.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <AnimatedInput 
            label="New password"
            v-model="password"
            type="password"
            required
            placeholder="At least 6 characters"
            :error-message="error"
            :show-error="!!error"
          />
          <AnimatedInput 
            label="Confirm new password"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            :error-message="confirmError"
            :show-error="!!confirmError"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading || !isFormValid" 
          class="w-full py-4 bg-black text-white rounded-2xl flex justify-center items-center gap-3 text-sm font-bold transition-all hover:bg-gray-800 disabled:opacity-50"
        >
          <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
          <template v-else>Reset password</template>
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 font-medium">
        Remember your password?
        <NuxtLink to="/login" class="font-bold text-black hover:underline underline-offset-4 ml-1">Sign in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { KeyRound, Loader2 } from 'lucide-vue-next'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

definePageMeta({
  layout: false
})

const route = useRoute()
const token = computed(() => route.query.token as string)

const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const confirmError = ref('')

const { resetPassword, loading } = useResetPassword()
const { showToast } = useCustomToast()

watch(confirmPassword, (val) => {
  if (val && val !== password.value) confirmError.value = 'Passwords do not match'
  else confirmError.value = ''
})

const isFormValid = computed(() => {
  return password.value.length >= 6 && 
         password.value === confirmPassword.value && 
         token.value
})

const handleSubmit = async () => {
  if (!isFormValid.value) return
  
  error.value = ''
  try {
    await resetPassword({
      token: token.value,
      newPassword: password.value
    })
    showToast({
      title: 'Success',
      message: 'Your password has been reset. You can now sign in.',
      toastType: 'success'
    })
    navigateTo('/login')
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to reset password. Link may have expired.'
    showToast({
      title: 'Reset failed',
      message: error.value,
      toastType: 'error'
    })
  }
}

onMounted(() => {
  if (!token.value) {
    showToast({
      title: 'Invalid link',
      message: 'Password reset link is missing or invalid.',
      toastType: 'error'
    })
    navigateTo('/login')
  }
})
</script>
