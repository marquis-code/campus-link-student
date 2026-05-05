<template>
  <div class="px-6 py-8 max-w-screen-md mx-auto space-y-8">
    <header>
      <h1 class="text-3xl font-black text-dark-900 tracking-tight">Your Profile</h1>
    </header>

    <div v-if="user" class="space-y-8 pb-12">
      <!-- Profile Header -->
      <div class="flex items-center gap-5">
        <div class="relative group">
          <div class="w-24 h-24 rounded-3xl bg-primary-100 overflow-hidden border-4 border-white shadow-xl">
            <img :src="user.avatar || 'https://via.placeholder.com/200'" class="w-full h-full object-cover" />
          </div>
          <button class="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all">
            <Icon name="ph:camera-bold" class="text-sm" />
          </button>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-black text-dark-900 leading-tight">{{ user.name }}</h2>
          <p class="text-dark-500 font-medium">{{ user.email }}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-black rounded-lg uppercase tracking-tighter">{{ user.role }}</span>
            <span class="text-dark-300">•</span>
            <span class="text-dark-500 text-xs font-bold">{{ user.campus?.name }}</span>
          </div>
        </div>
      </div>

      <!-- Settings Groups -->
      <div class="space-y-6">
        <div class="space-y-3">
          <h3 class="text-xs font-bold text-dark-400 uppercase tracking-widest ml-1">Account Settings</h3>
          <div class="glass-card divide-y divide-dark-100 overflow-hidden">
            <NuxtLink to="/dashboard/profile/edit" class="flex items-center justify-between p-5 hover:bg-dark-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-dark-100 text-dark-600 flex items-center justify-center">
                  <Icon name="ph:user-focus-duotone" class="text-xl" />
                </div>
                <span class="font-bold text-dark-800">Edit Personal Info</span>
              </div>
              <Icon name="ph:caret-right-bold" class="text-dark-300" />
            </NuxtLink>
            <NuxtLink to="/dashboard/profile/bank" class="flex items-center justify-between p-5 hover:bg-dark-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Icon name="ph:bank-duotone" class="text-xl" />
                </div>
                <span class="font-bold text-dark-800">Bank Details</span>
              </div>
              <Icon name="ph:caret-right-bold" class="text-dark-300" />
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-xs font-bold text-dark-400 uppercase tracking-widest ml-1">My Activity</h3>
          <div class="glass-card divide-y divide-dark-100 overflow-hidden">
            <NuxtLink to="/dashboard/promote/history" class="flex items-center justify-between p-5 hover:bg-dark-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Icon name="ph:megaphone-duotone" class="text-xl" />
                </div>
                <span class="font-bold text-dark-800">Promoted Products</span>
              </div>
              <Icon name="ph:caret-right-bold" class="text-dark-300" />
            </NuxtLink>
            <NuxtLink to="/dashboard/withdrawals" class="flex items-center justify-between p-5 hover:bg-dark-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Icon name="ph:hand-coins-duotone" class="text-xl" />
                </div>
                <span class="font-bold text-dark-800">Withdrawal History</span>
              </div>
              <Icon name="ph:caret-right-bold" class="text-dark-300" />
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-3 pt-4">
          <button @click="logout" class="w-full flex items-center gap-4 p-5 glass-card bg-red-50/50 border-red-100/50 text-red-600 hover:bg-red-50 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Icon name="ph:power-bold" class="text-xl" />
            </div>
            <span class="font-bold">Log Out Account</span>
          </button>
          <p class="text-center text-[10px] font-bold text-dark-300 uppercase tracking-widest pt-2">CampusLink v1.0.0 — Made with ❤️</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logOut: logout } = useUser()
</script>
