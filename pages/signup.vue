<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-primary-600 tracking-tight">CAMPUSLINK</h1>
        <p class="mt-2 text-dark-500 font-medium">Create your promoter account and start earning.</p>
      </div>

      <form @submit.prevent="handleSignup" class="mt-8 space-y-5">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Full Name</label>
            <input v-model="form.name" type="text" required class="input-field" placeholder="John Doe" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Email address</label>
            <input v-model="form.email" type="email" required class="input-field" placeholder="you@campus.edu" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Phone Number</label>
            <input v-model="form.phone" type="tel" required class="input-field" placeholder="080 1234 5678" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Select Campus</label>
            <select v-model="form.campus" required class="input-field">
              <option value="" disabled>Choose your campus</option>
              <option v-for="c in campuses" :key="c._id" :value="c._id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-dark-700 ml-1 mb-1">Password</label>
            <input v-model="form.password" type="password" required class="input-field" placeholder="••••••••" />
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="btn-primary w-full flex justify-center py-4">
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
definePageMeta({
  layout: false
})

const { signup, loading } = useSignup()
const { campuses, fetchCampuses } = useFetchCampuses()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  campus: '',
  role: 'student',
  password: ''
})

onMounted(async () => {
  await fetchCampuses()
})

const handleSignup = async () => {
  const res = await signup(form)
  if (res) navigateTo('/')
}
</script>
