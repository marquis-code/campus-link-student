<template>
  <transition name="slide-over">
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex justify-end overflow-hidden" @click="close">
      <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" @click="close"></div>
      
      <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300" @click.stop>
        <!-- Header -->
        <div class="h-20 px-8 flex items-center justify-between border-b border-gray-100">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Icon name="Bell" class="text-white" size="20" />
             </div>
             <div>
                <h2 class="text-lg font-bold text-gray-900 tracking-tight">Notifications</h2>
                <p class="text-xs font-medium text-gray-500">Your recent activities and alerts</p>
             </div>
          </div>
          <button @click="close" class="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400">
            <Icon name="X" size="20" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="loading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-24 bg-gray-50 rounded-2xl animate-pulse"></div>
          </div>

          <div v-else-if="notifications.length > 0" class="space-y-3">
            <div 
              v-for="notif in notifications" 
              :key="notif._id" 
              class="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group relative cursor-pointer"
              :class="{ 'bg-gray-50/50': !notif.isRead }"
              @click="handleMarkRead(notif)"
            >
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" :class="getNotifType(notif.type).class">
                  <Icon :name="getNotifType(notif.type).icon" size="18" />
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                   <p class="text-sm font-bold text-gray-900">{{ notif.title }}</p>
                   <p class="text-xs text-gray-500 leading-relaxed">{{ notif.message }}</p>
                   <p class="text-[10px] font-medium text-gray-400 uppercase tracking-wider pt-1">{{ formatTime(notif.createdAt) }}</p>
                </div>
                <div v-if="!notif.isRead" class="w-2 h-2 bg-black rounded-full shrink-0 mt-1"></div>
              </div>
            </div>
          </div>

          <div v-else class="h-full flex flex-col items-center justify-center text-center px-6">
            <div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-200 border border-gray-50">
               <Icon name="BellOff" size="32" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">All caught up!</h3>
            <p class="text-sm text-gray-500 mt-2">No new notifications at the moment. We'll alert you when something happens.</p>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="notifications.length > 0" class="p-6 border-t border-gray-100 bg-gray-50/50">
          <button @click="handleMarkAllRead" class="w-full py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 hover:bg-gray-100 transition-all shadow-sm">
             Mark all as read
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)

// Mock notifications if API is not fully ready, but we use the composable
const { notifications, loading, fetchNotifications, markRead, markAllRead } = useFetchNotifications()

onMounted(() => {
  if (props.modelValue) fetchNotifications()
})

watch(() => props.modelValue, (val) => {
  if (val) fetchNotifications()
})

const getNotifType = (type: string) => {
  switch (type) {
    case 'success': return { icon: 'CheckCircle', class: 'bg-green-50 text-green-600' }
    case 'error': return { icon: 'AlertCircle', class: 'bg-red-50 text-red-600' }
    case 'warning': return { icon: 'AlertTriangle', class: 'bg-amber-50 text-amber-600' }
    default: return { icon: 'Info', class: 'bg-gray-50 text-gray-600' }
  }
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleDateString() + ' • ' + new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const handleMarkRead = async (notif: any) => {
  if (notif.isRead) return
  await markRead(notif._id)
}

const handleMarkAllRead = async () => {
  await markAllRead()
}
</script>

<style scoped>
.slide-over-enter-active, .slide-over-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-over-enter-from .relative, .slide-over-leave-to .relative {
  transform: translateX(100%);
}
.slide-over-enter-from .bg-black\/20, .slide-over-leave-to .bg-black\/20 {
  opacity: 0;
}
</style>
