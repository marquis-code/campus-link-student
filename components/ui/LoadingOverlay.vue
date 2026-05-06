<template>
  <Transition name="fade">
    <div v-if="active" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div class="relative flex items-center justify-center">
        <!-- Logo in center -->
        <div class="absolute inset-0 flex items-center justify-center">
          <img src="@/assets/images/logo.png" alt="CampusLink" class="h-12 w-12 object-contain animate-pulse" />
        </div>
        
        <!-- Spinning ring -->
        <svg class="h-32 w-32 animate-spin text-primary-600" viewBox="0 0 100 100">
          <circle 
            class="opacity-25" 
            cx="50" cy="50" r="45" 
            stroke="currentColor" 
            stroke-width="2" 
            fill="none" 
          />
          <circle 
            class="opacity-75" 
            cx="50" cy="50" r="45" 
            stroke="currentColor" 
            stroke-width="2" 
            fill="none" 
            stroke-dasharray="282.7" 
            stroke-dashoffset="210" 
            stroke-linecap="round" 
          />
        </svg>
      </div>
      <p class="mt-4 text-dark-900 font-bold tracking-widest uppercase text-xs animate-pulse">Loading CampusLink...</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
