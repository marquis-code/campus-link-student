<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoadingOverlay :active="isActive" />
    <ToastContainer />
    <ConfirmModal />
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
const { fetchUser } = useAuth()
const { isActive } = useGlobalLoading()

onMounted(() => {
  fetchUser()
})
</script>

<style>
body {
    font-family: 'Inter', sans-serif;
    @apply bg-gray-50;
}
</style>