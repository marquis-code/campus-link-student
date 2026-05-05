<template>
  <div class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 pb-20 md:pb-0 md:pt-16">
      <slot />
      <ChatWidget />
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-dark-100 px-6 py-3 flex justify-between items-center z-50">
      <NuxtLink to="/dashboard" class="flex flex-col items-center gap-1" :class="route.path === '/dashboard' ? 'text-primary-600' : 'text-dark-400'">
        <Icon name="ph:house-duotone" class="text-2xl" />
        <span class="text-[10px] font-medium">Home</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/promote" class="flex flex-col items-center gap-1" :class="route.path.startsWith('/dashboard/promote') ? 'text-primary-600' : 'text-dark-400'">
        <Icon name="ph:megaphone-duotone" class="text-2xl" />
        <span class="text-[10px] font-medium">Promote</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/earnings" class="flex flex-col items-center gap-1" :class="route.path.startsWith('/dashboard/earnings') ? 'text-primary-600' : 'text-dark-400'">
        <Icon name="ph:wallet-duotone" class="text-2xl" />
        <span class="text-[10px] font-medium">Earnings</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/profile" class="flex flex-col items-center gap-1" :class="route.path.startsWith('/dashboard/profile') ? 'text-primary-600' : 'text-dark-400'">
        <Icon name="ph:user-duotone" class="text-2xl" />
        <span class="text-[10px] font-medium">Profile</span>
      </NuxtLink>
    </nav>

    <!-- Desktop Sidebar/Nav could go here -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
