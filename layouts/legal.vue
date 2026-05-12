<template>
  <div class="min-h-screen bg-white font-['Onest',sans-serif]">
    <nav class="h-20 border-b border-dark-100 flex items-center px-6 md:px-12">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
          <Icon name="ph:rocket-launch-fill" class="text-white text-xl" />
        </div>
        <span class="text-xl font-bold tracking-tight text-dark-900">CampusLink</span>
      </NuxtLink>
    </nav>
    
    <main class="max-w-3xl mx-auto py-24 px-6">
      <slot />
    </main>

    <footer class="py-12 border-t border-dark-100 text-center">
      <p class="text-sm font-bold text-dark-300 ">© {{ new Date().getFullYear() }} CampusLink Promoter Legal</p>
    </footer>
  </div>
</template>
