<template>
  <Transition name="fade">
    <div v-if="active" class="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
      <div class="relative flex items-center justify-center">
        <!-- Logo in center -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center animate-pulse">
            <Icon name="GraduationCap" class="text-white text-xl" />
          </div>
        </div>
        
        <!-- Spinning ring -->
        <svg class="h-32 w-32 animate-[spin_1.5s_linear_infinite] text-black" viewBox="0 0 100 100">
          <circle 
            class="opacity-5" 
            cx="50" cy="50" r="45" 
            stroke="currentColor" 
            stroke-width="1.5" 
            fill="none" 
          />
          <circle 
            cx="50" cy="50" r="45" 
            stroke="currentColor" 
            stroke-width="1.5" 
            fill="none" 
            stroke-dasharray="282.7" 
            stroke-dashoffset="200" 
            stroke-linecap="round" 
          />
        </svg>
      </div>
      <p class="mt-8 text-black font-bold tracking-[0.2em] uppercase text-[10px] animate-pulse">Loading Hub</p>
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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
