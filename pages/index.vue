<script setup lang="ts">
definePageMeta({
  middleware: 'auth-redirect'
})

onMounted(() => {
  navigateTo('/dashboard')
})
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center">
    <div class="animate-pulse flex flex-col items-center">
      <div class="w-16 h-16 bg-primary-600 rounded-2xl mb-4"></div>
      <p class="text-dark-400 font-bold">Loading CampusLink...</p>
    </div>
  </div>
</template>
