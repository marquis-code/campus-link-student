<template>
  <div>
    <NuxtPage />
    <LoadingOverlay :active="isActive" />
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
    font-family: 'Onest', sans-serif;
}
</style>