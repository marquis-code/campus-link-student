<template>
  <div class="min-h-screen bg-white font-['Onest',sans-serif] selection:bg-emerald-100 overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-dark-100/50">
      <div class="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
        <img src="@/assets/images/logo.png" alt="CampusLink" class="h-10 w-10 object-contain transition-transform group-hover:rotate-6" />
          <div class="flex flex-col">
            <span class="text-xl font-black tracking-tight text-dark-900 leading-none">CampusLink</span>
            <span class="text-[10px] font-bold text-emerald-600 tracking-[0.2em] mt-1">Promoter Hub</span>
          </div>
        </NuxtLink>
        
        <div class="hidden lg:flex items-center gap-10 font-bold text-dark-500 text-sm tracking-wide">
          <a href="#how-it-works" class="hover:text-emerald-600 transition-all hover:-translate-y-0.5">How it works</a>
          <a href="#perks" class="hover:text-emerald-600 transition-all hover:-translate-y-0.5">Perks</a>
          <a href="#faq" class="hover:text-emerald-600 transition-all hover:-translate-y-0.5">Faq</a>
        </div>

        <div class="flex items-center gap-6">
          <NuxtLink to="/login" class="hidden sm:block font-bold text-dark-900 hover:text-emerald-600 transition-colors text-sm">Sign in</NuxtLink>
          <NuxtLink to="/signup" class="px-8 py-3 bg-dark-900 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2">
            Start earning
            <Icon name="ph:arrow-right-bold" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-48 pb-32 px-6">
      <div class="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-10 animate-fade-in-up">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100/50">
            <span class="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span class="text-emerald-700 font-bold text-[10px] tracking-[0.2em]">Join the 1% of campus earners</span>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-bold text-dark-900 leading-[0.95] tracking-tight">
            Turn your <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cobalt-500">network into cash.</span>
          </h1>
          
          <p class="max-w-xl text-xl text-dark-400 font-medium leading-relaxed">
            Promote verified campus products on your WhatsApp status and earn instant commissions on every sale. Zero investment needed.
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-5">
            <NuxtLink to="/signup" class="w-full sm:w-auto px-12 py-5 bg-emerald-600 text-white rounded-[24px] font-bold text-lg hover:bg-emerald-700 transition-all hover:scale-105 flex items-center justify-center gap-3 group">
              Join for free
              <Icon name="ph:sparkle-fill" class="transition-transform group-hover:rotate-12" />
            </NuxtLink>
            <div class="flex items-center gap-3 text-dark-400 font-bold">
              <span class="text-sm tracking-tight">No experience required • Earn weekly</span>
            </div>
          </div>
        </div>

        <div class="relative animate-fade-in">
          <div class="absolute -inset-10 bg-emerald-600/5 blur-3xl rounded-full"></div>
          <img 
            src="/Users/mac/.gemini/antigravity/brain/de342158-c60a-41fb-83a9-7c5ba47b3334/student_hero_african_students_1778002886774.png" 
            class="relative w-full rounded-[48px] border-2 border-emerald-50/50 hover:scale-[1.02] transition-transform duration-700" 
            alt="Student Hero"
          />
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-24 bg-dark-50/50 border-y border-dark-100/50">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <div v-for="stat in stats" :key="stat.label" class="text-center space-y-2">
            <h3 class="text-5xl font-bold text-dark-900 tracking-tighter">{{ stat.value }}</h3>
            <p class="text-[10px] font-bold text-dark-400 tracking-[0.2em]">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Workflow -->
    <section id="how-it-works" class="py-32 px-6">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-24 space-y-4">
          <h2 class="text-4xl md:text-6xl font-bold text-dark-900 tracking-tight">Earning made ridiculously simple.</h2>
          <p class="text-dark-500 text-lg font-medium">Follow the blueprint to your first payout.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-12">
          <div v-for="(step, i) in steps" :key="i" class="relative p-12 bg-white border border-dark-100 rounded-[50px] group hover:border-emerald-500/50 transition-all overflow-hidden">
            <div class="absolute -right-8 -top-8 text-[180px] font-bold text-dark-50/50 group-hover:text-emerald-50/50 transition-colors">{{ i + 1 }}</div>
            <div class="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-8 relative">
              <Icon :name="step.icon" />
            </div>
            <div class="relative">
              <h3 class="text-2xl font-bold text-dark-900 mb-4">{{ step.title }}</h3>
              <p class="text-dark-400 font-medium leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-950 text-white pt-32 pb-12">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid lg:grid-cols-5 gap-16 pb-24 border-b border-white/10">
          <div class="lg:col-span-2 space-y-8">
            <NuxtLink to="/" class="flex items-center gap-3">
              <img src="@/assets/images/logo.png" alt="CampusLink" class="h-10 w-10 object-contain" />
              <span class="text-xl font-black tracking-tight text-white">CampusLink</span>
            </NuxtLink>
            <p class="max-w-xs text-dark-400 font-medium leading-relaxed">
              Empowering Nigerian students to achieve financial independence through campus-based commerce.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all text-xl"><Icon name="ph:instagram-logo-fill" /></a>
              <a href="#" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all text-xl"><Icon name="ph:twitter-logo-fill" /></a>
              <a href="#" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all text-xl"><Icon name="ph:tiktok-logo-fill" /></a>
            </div>
          </div>

          <div>
            <h4 class="text-[10px] font-bold text-emerald-500 tracking-[0.4em] mb-8">Platform</h4>
            <ul class="space-y-4 text-dark-400 font-bold text-sm">
              <li><NuxtLink to="/dashboard" class="hover:text-white transition-colors">Find products</NuxtLink></li>
              <li><NuxtLink to="/dashboard/referrals" class="hover:text-white transition-colors">My links</NuxtLink></li>
              <li><NuxtLink to="/dashboard/earnings" class="hover:text-white transition-colors">Earning history</NuxtLink></li>
              <li><NuxtLink to="/dashboard/profile" class="hover:text-white transition-colors">Leaderboard</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] font-bold text-emerald-500 tracking-[0.4em] mb-8">Support</h4>
            <ul class="space-y-4 text-dark-400 font-bold text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Help center</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Student policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Dispute resolution</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-[10px] font-bold text-emerald-500 tracking-[0.4em] mb-8">Company</h4>
            <ul class="space-y-4 text-dark-400 font-bold text-sm">
              <li><NuxtLink to="/legal/privacy" class="hover:text-white transition-colors">Privacy shield</NuxtLink></li>
              <li><NuxtLink to="/legal/terms" class="hover:text-white transition-colors">Terms of use</NuxtLink></li>
            </ul>
          </div>
        </div>
        
        <div class="pt-12 text-center">
          <p class="text-dark-500 font-bold text-[10px] tracking-[0.4em]">© {{ new Date().getFullYear() }} CampusLink Technologies. Built for students, by students.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const stats = [
  { value: '₦12M+', label: 'Total paid out' },
  { value: '15k+', label: 'Active promoters' },
  { value: '250k+', label: 'Product shares' },
  { value: '54', label: 'Campuses' },
]

const steps = [
  { icon: 'ph:magnifying-glass-duotone', title: 'Find hot deals', desc: 'Browse trending products from verified campus sellers.' },
  { icon: 'ph:link-bold', title: 'Generate link', desc: 'Get your unique trackable link for any product in one click.' },
  { icon: 'ph:money-wavy-duotone', title: 'Collect commissions', desc: 'Share your link and earn every time someone buys.' },
]
</script>

<style>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}

html {
  scroll-behavior: smooth;
}
</style>
