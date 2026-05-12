<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="state.visible" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40" @click="handleCancel">
        <Transition name="scale">
          <div v-if="state.visible" class="bg-white rounded-2xl w-full max-w-sm overflow-hidden border border-gray-200 shadow-xl" @click.stop>
            <div class="p-6 space-y-5">
              <div 
                class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
                :class="[
                  state.variant === 'danger' ? 'bg-red-50 text-red-600' : 
                  state.variant === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'
                ]"
              >
                <Icon 
                  :name="
                    state.variant === 'danger' ? 'Trash2' : 
                    state.variant === 'warning' ? 'AlertTriangle' : 'HelpCircle'
                  " 
                  class="text-2xl"
                />
              </div>
              
              <div class="text-center space-y-2">
                <h3 class="text-lg font-bold text-gray-900">{{ state.title }}</h3>
                <p class="text-sm text-gray-500 leading-relaxed">{{ state.message }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-1">
                <button 
                  @click="handleCancel"
                  class="py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {{ state.cancelText }}
                </button>
                <button 
                  @click="handleConfirm"
                  class="py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-colors"
                  :class="[
                    state.variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 
                    state.variant === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-black hover:bg-gray-800'
                  ]"
                >
                  {{ state.confirmText }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// State shared via auto-imported useConfirmDialog composable
const { state, handleConfirm, handleCancel } = useConfirmDialog()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
