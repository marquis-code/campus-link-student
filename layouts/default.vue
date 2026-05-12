<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop Sidebar -->
    <aside class="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 hidden lg:flex flex-col shadow-sm">
      <!-- Logo -->
      <div class="h-20 px-8 flex items-center border-b border-gray-100">
        <NuxtLink to="/dashboard" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon name="GraduationCap" class="text-white text-lg" />
          </div>
          <div class="flex flex-col">
            <span class="text-base font-bold text-gray-900 tracking-tight leading-none">Ambassador</span>
            <span class="text-[10px] font-medium text-gray-400 mt-1">CampusLink</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        <p class="px-4 mb-4 text-[11px] font-semibold text-gray-400 tracking-wider">Navigation</p>
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.to" 
          :to="item.to" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group" 
          :class="isActive(item.to) 
            ? 'bg-black text-white' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'"
        >
          <Icon :name="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <!-- Bottom User Section -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-gray-50">
          <div class="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center">
             <Icon name="User" class="text-black text-sm" />
          </div>
          <div class="flex-1 min-w-0">
             <p class="text-xs font-bold text-gray-900 truncate">{{ user?.name || 'Ambassador' }}</p>
             <p class="text-[10px] text-gray-400 font-medium">Student</p>
          </div>
        </div>
        <button 
          @click="logout" 
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all group"
        >
          <Icon name="LogOut" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="lg:pl-64 min-h-screen flex flex-col">
      <!-- Top Bar -->
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="showMobileMenu = true" class="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
            <Icon name="Menu" class="w-5 h-5" />
          </button>
          <div class="flex flex-col">
            <h2 class="text-sm font-bold text-gray-900">{{ currentPageTitle }}</h2>
            <p class="text-[10px] text-gray-400 font-medium mt-0.5">{{ user?.campus?.name || 'Campus Network' }}</p>
          </div>
        </div>

        <div class="flex items-center gap-6">
           <!-- Notification Hub -->
           <button 
             @click="showNotifications = true"
             class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-colors relative"
           >
              <Icon name="Bell" size="18" />
              <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
           </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 lg:p-10">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Navigation -->
    <transition name="fade">
      <div v-if="showMobileMenu" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" @click="showMobileMenu = false">
        <transition name="slide">
          <aside v-if="showMobileMenu" class="absolute left-0 top-0 w-80 h-full bg-white flex flex-col shadow-2xl" @click.stop>
            <div class="h-20 px-8 flex items-center justify-between border-b border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Icon name="GraduationCap" class="text-white text-lg" />
                </div>
                <span class="text-base font-bold text-gray-900 tracking-tight">Ambassador</span>
              </div>
              <button @click="showMobileMenu = false" class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                <Icon name="X" class="w-5 h-5" />
              </button>
            </div>

            <nav class="flex-1 px-4 py-8 space-y-1">
              <NuxtLink 
                v-for="item in navItems" 
                :key="item.to" 
                :to="item.to" 
                @click="showMobileMenu = false"
                class="flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all" 
                :class="isActive(item.to) 
                  ? 'bg-black text-white' 
                  : 'text-gray-500 hover:bg-gray-100'"
              >
                <Icon :name="item.icon" class="w-5 h-5" />
                <span>{{ item.name }}</span>
              </NuxtLink>
            </nav>

            <div class="p-6 border-t border-gray-100">
              <button @click="logout" class="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                <Icon name="LogOut" class="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </aside>
        </transition>
      </div>
    </transition>

    <ChatWidget />
    <ConfirmModal />
    <NotificationHub v-model="showNotifications" />
  </div>
</template>

<script setup lang="ts">
import NotificationHub from '@/components/core/NotificationHub.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'

const route = useRoute()
const { user, logOut: logoutUser } = useUser()
const showMobileMenu = ref(false)
const showNotifications = ref(false)

const navItems = [
  { name: 'Discover', to: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'My Promoted', to: '/dashboard/referrals', icon: 'Megaphone' },
  { name: 'Financials', to: '/dashboard/earnings', icon: 'Wallet' },
  { name: 'My Profile', to: '/dashboard/profile', icon: 'UserCircle' },
  { name: 'Support', to: '/dashboard/support', icon: 'MessageSquare' },
]

const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(path)
}

const currentPageTitle = computed(() => {
  const activeItem = navItems.find(item => isActive(item.to))
  return activeItem ? activeItem.name : 'Ambassador Hub'
})

const { confirm } = useConfirmDialog()

const logout = async () => {
  const confirmed = await confirm({
    title: 'Confirm Sign Out',
    message: 'Are you sure you want to sign out? You will need to log back in to access your earnings.',
    confirmText: 'Sign out',
    cancelText: 'Stay',
    variant: 'danger'
  })

  if (confirmed) {
    logoutUser()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

* {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
