<template>
  <div class="container mx-auto space-y-10 py-6 pb-24">
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">My Identity</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Ambassador Hub • Account Management</p>
      </div>
      <div class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400">
         <Icon name="UserCircle" size="20" />
      </div>
    </header>

    <div v-if="user" class="space-y-10">
      <!-- Profile Header -->
      <div class="relative group p-8 bg-black rounded-3xl text-white overflow-hidden shadow-xl">
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div class="relative group/avatar">
            <div class="w-28 h-28 rounded-3xl bg-white/10 p-1 backdrop-blur-md border border-white/20 overflow-hidden">
              <img :src="user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`" class="w-full h-full object-cover rounded-[1.4rem]" />
            </div>
            <NuxtLink to="/dashboard/profile/edit" class="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-xl">
              <Icon name="Camera" size="16" />
            </NuxtLink>
          </div>
          <div class="flex-1 space-y-2">
            <h2 class="text-2xl font-bold tracking-tight">{{ user.name }}</h2>
            <p class="text-white/60 font-medium text-sm">{{ user.email }}</p>
            <div class="flex flex-wrap justify-center md:justify-start items-center gap-3 pt-2">
              <span class="px-2.5 py-1 bg-white/10 text-white text-sm font-bold rounded-lg  tracking-wider border border-white/10">{{ user.role }}</span>
              <div class="w-1 h-1 rounded-full bg-white/20"></div>
              <span class="text-sm font-semibold text-white/60  tracking-wider">{{ user.campus?.name || 'Global Campus' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Groups -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Account Settings -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-gray-400  tracking-wider ml-1">Identity & Financials</h3>
          <div class="space-y-3">
            <NuxtLink to="/dashboard/profile/edit" class="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all group shadow-sm">
              <div class="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Icon name="User" size="18" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900">Personal Info</p>
                <p class="text-sm text-gray-400 font-medium">Update your details</p>
              </div>
              <Icon name="ChevronRight" class="text-gray-300 group-hover:text-black transition-colors" size="18" />
            </NuxtLink>

            <NuxtLink to="/dashboard/profile/bank" class="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all group shadow-sm">
              <div class="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Icon name="Landmark" size="18" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900">Payout Details</p>
                <p class="text-sm text-gray-400 font-medium">Manage bank accounts</p>
              </div>
              <Icon name="ChevronRight" class="text-gray-300 group-hover:text-black transition-colors" size="18" />
            </NuxtLink>
          </div>
        </div>

        <!-- Activity -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-gray-400  tracking-wider ml-1">Growth & History</h3>
          <div class="space-y-3">
            <NuxtLink to="/dashboard/referrals" class="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all group shadow-sm">
              <div class="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Icon name="Megaphone" size="18" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900">Active Assets</p>
                <p class="text-sm text-gray-400 font-medium">Track your links</p>
              </div>
              <Icon name="ChevronRight" class="text-gray-300 group-hover:text-black transition-colors" size="18" />
            </NuxtLink>

            <NuxtLink to="/dashboard/withdrawals" class="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-gray-300 transition-all group shadow-sm">
              <div class="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Icon name="History" size="18" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900">Payout Audit</p>
                <p class="text-sm text-gray-400 font-medium">Withdrawal history</p>
              </div>
              <Icon name="ChevronRight" class="text-gray-300 group-hover:text-black transition-colors" size="18" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Log Out -->
      <div class="pt-8 flex flex-col items-center gap-6">
        <button 
          @click="handleLogout" 
          class="flex items-center gap-3 px-8 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-xs  tracking-wider hover:bg-red-100 transition-all group"
        >
          <Icon name="LogOut" size="18" class="group-hover:-translate-x-1 transition-transform" />
          Sign out account
        </button>
        <div class="text-center">
           <p class="text-sm font-bold text-gray-300  ">CampusLink Ambassador</p>
           <p class="text-[9px] text-gray-300 font-medium mt-1">Version 1.0.4 PRODUCTION</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, logOut: logoutUser } = useUser()
const { confirm } = useConfirmDialog()

const handleLogout = async () => {
  const confirmed = await confirm({
    title: 'Confirm Sign Out',
    message: 'Are you sure you want to end your ambassador session? Your active links will still track.',
    confirmText: 'Sign out',
    cancelText: 'Stay',
    variant: 'danger'
  })

  if (confirmed) {
    logoutUser()
  }
}

definePageMeta({
  layout: 'default'
})
</script>
