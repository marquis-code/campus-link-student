<template>
  <Teleport to="body">
    <div class="fixed bottom-20 md:bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="pointer-events-auto bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 transition-all duration-300 shadow-lg"
        >
          <div 
            class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            :class="[
              toast.toastType === 'success' ? 'bg-green-50 text-green-600' : 
              toast.toastType === 'error' ? 'bg-red-50 text-red-600' : 
              toast.toastType === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
            ]"
          >
            <Icon 
              :name="
                toast.toastType === 'success' ? 'CheckCircle' : 
                toast.toastType === 'error' ? 'AlertCircle' : 
                toast.toastType === 'warning' ? 'AlertTriangle' : 'Info'
              " 
              class="text-lg"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-900">{{ toast.title }}</h4>
            <p class="text-xs text-gray-500 leading-tight mt-0.5 line-clamp-2">{{ toast.message }}</p>
          </div>
          <button @click="removeToast(toast.id)" class="text-gray-400 hover:text-gray-700 transition-colors">
            <Icon name="X" size="16" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
// State shared via auto-imported useCustomToast composable
const { toasts, removeToast } = useCustomToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}
</style>
