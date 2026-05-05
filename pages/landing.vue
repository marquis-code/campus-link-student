<template>
  <div class="min-h-screen bg-white font-['Inter'] selection:bg-primary-100">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-dark-100">
      <div class="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <Icon name="ph:rocket-launch-fill" class="text-white text-2xl" />
          </div>
          <span class="text-2xl font-black tracking-tighter text-dark-900">CAMPUSLINK</span>
        </div>
        
        <div class="hidden md:flex items-center gap-8 font-bold text-dark-600">
          <a href="#how-it-works" class="hover:text-primary-600 transition-colors">How it works</a>
          <a href="#benefits" class="hover:text-primary-600 transition-colors">Benefits</a>
          <a href="#faq" class="hover:text-primary-600 transition-colors">FAQ</a>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="px-6 py-2.5 font-bold text-dark-700 hover:text-primary-600 transition-colors">Login</NuxtLink>
          <NuxtLink to="/signup" class="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-95">Get Started</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-40 pb-20 px-6">
      <div class="max-w-screen-xl mx-auto text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
          <span class="w-2 h-2 bg-primary-600 rounded-full animate-ping"></span>
          <span class="text-primary-700 font-bold text-sm uppercase tracking-widest">Built for Nigerian Students</span>
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black text-dark-900 leading-[1.1] tracking-tight">
          Turn your <span class="text-primary-600">Campus Network</span> <br /> into a Daily Income.
        </h1>
        
        <p class="max-w-2xl mx-auto text-xl text-dark-500 font-medium leading-relaxed">
          The #1 platform for students to promote local products, help sellers grow, and earn real commissions while studying.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NuxtLink to="/signup" class="w-full sm:w-auto px-10 py-5 bg-dark-900 text-white rounded-2xl font-black text-lg hover:bg-primary-600 transition-all active:scale-95 flex items-center justify-center gap-2">
            Start Earning Now
            <Icon name="ph:arrow-right-bold" />
          </NuxtLink>
          <a href="#how-it-works" class="w-full sm:w-auto px-10 py-5 border-2 border-dark-100 rounded-2xl font-black text-lg text-dark-700 hover:bg-dark-50 transition-all flex items-center justify-center gap-2">
            See How it Works
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
          <div v-for="stat in stats" :key="stat.label" class="p-8 border border-dark-100 rounded-3xl group hover:border-primary-500 transition-colors">
            <h3 class="text-4xl font-black text-dark-900 group-hover:text-primary-600 transition-colors">{{ stat.value }}</h3>
            <p class="text-dark-400 font-bold uppercase tracking-widest text-xs mt-2">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="how-it-works" class="py-24 bg-dark-50">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="text-center mb-20 space-y-4">
          <h2 class="text-4xl md:text-6xl font-black text-dark-900 tracking-tight">Earning is simple.</h2>
          <p class="text-dark-500 text-xl font-medium">Follow these three steps to your first commission.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i" class="bg-white p-10 rounded-[40px] border border-dark-100 space-y-6 relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 text-9xl font-black text-dark-50 opacity-50">{{ i + 1 }}</div>
            <div class="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl">
              <Icon :name="step.icon" />
            </div>
            <div class="space-y-3 relative">
              <h3 class="text-2xl font-black text-dark-900">{{ step.title }}</h3>
              <p class="text-dark-500 font-medium leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- App Preview / Interactive Section -->
    <section class="py-24 overflow-hidden">
      <div class="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">
          <h2 class="text-4xl md:text-6xl font-black text-dark-900 leading-[1.2]">A Dashboard that <span class="text-emerald-500">Grows</span> with you.</h2>
          <div class="space-y-6">
            <div v-for="feat in benefits" :key="feat.title" class="flex gap-5">
              <div class="flex-shrink-0 w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                <Icon :name="feat.icon" />
              </div>
              <div>
                <h4 class="text-xl font-bold text-dark-900">{{ feat.title }}</h4>
                <p class="text-dark-500 font-medium">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
          <NuxtLink to="/signup" class="inline-flex px-8 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all active:scale-95">
            Join 1,000+ Students
          </NuxtLink>
        </div>
        <div class="relative">
          <div class="aspect-[4/5] bg-dark-900 rounded-[60px] p-6 relative overflow-hidden">
            <!-- Simulated App UI -->
            <div class="w-full h-full bg-white rounded-[40px] p-6 space-y-6 overflow-hidden">
              <div class="flex justify-between items-center">
                <div class="w-32 h-4 bg-dark-100 rounded"></div>
                <div class="w-10 h-10 bg-dark-100 rounded-full"></div>
              </div>
              <div class="h-40 bg-emerald-500 rounded-3xl p-6 text-white space-y-2">
                <p class="text-xs font-bold uppercase opacity-80">Total Earnings</p>
                <h4 class="text-4xl font-black">₦45,200.00</h4>
                <div class="pt-4 flex gap-2">
                  <div class="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold">+12% this week</div>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-dark-50 rounded-2xl"></div>
                  <div class="flex-1 space-y-2">
                    <div class="w-3/4 h-3 bg-dark-100 rounded"></div>
                    <div class="w-1/2 h-2 bg-dark-50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Floating badge -->
          <div class="absolute -bottom-10 -left-10 bg-white border border-dark-100 p-6 rounded-3xl flex items-center gap-4 animate-bounce">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl">
              <Icon name="ph:bank-duotone" />
            </div>
            <div>
              <p class="text-xs font-bold text-dark-400 uppercase">Withdrawal Success</p>
              <h5 class="text-lg font-black text-dark-900">₦12,500.00 Paid</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark-950 text-white pt-24 pb-12">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 pb-20 border-b border-white/10">
          <div class="space-y-6">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Icon name="ph:rocket-launch-fill" class="text-white text-2xl" />
              </div>
              <span class="text-2xl font-black tracking-tighter">CAMPUSLINK</span>
            </div>
            <p class="text-dark-400 font-medium leading-relaxed">
              Empowering Nigerian students to achieve financial independence through campus-based promotion.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 transition-colors"><Icon name="ph:instagram-logo-duotone" /></a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 transition-colors"><Icon name="ph:twitter-logo-duotone" /></a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 transition-colors"><Icon name="ph:facebook-logo-duotone" /></a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6">Platform</h4>
            <ul class="space-y-4 text-dark-400 font-medium">
              <li><NuxtLink to="/products" class="hover:text-white transition-colors">Find Products</NuxtLink></li>
              <li><NuxtLink to="/referrals" class="hover:text-white transition-colors">My Links</NuxtLink></li>
              <li><NuxtLink to="/earnings" class="hover:text-white transition-colors">Earnings</NuxtLink></li>
              <li><NuxtLink to="/profile" class="hover:text-white transition-colors">Profile</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6">Support</h4>
            <ul class="space-y-4 text-dark-400 font-medium">
              <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div class="space-y-6">
            <h4 class="text-lg font-bold mb-6">Ready to earn?</h4>
            <NuxtLink to="/signup" class="block w-full py-4 bg-primary-600 text-white rounded-2xl font-black text-center hover:bg-primary-700 transition-all">
              Sign Up for Free
            </NuxtLink>
            <p class="text-xs text-center text-dark-500 font-bold uppercase tracking-widest">No hidden fees. Ever.</p>
          </div>
        </div>
        
        <div class="pt-12 text-center text-dark-500 font-bold text-sm">
          <p>© {{ new Date().getFullYear() }} CampusLink Technologies. Made for Nigerian Students.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '10k+', label: 'Active Promoters' },
  { value: '50+', label: 'Campuses' },
  { value: '₦2M+', label: 'Paid in Commissions' },
  { value: '500+', label: 'Local Sellers' },
]

const steps = [
  { icon: 'ph:hand-pointing-duotone', title: 'Pick a Product', desc: 'Browse hundreds of products listed by verified sellers on your campus.' },
  { icon: 'ph:share-network-duotone', title: 'Share your Link', desc: 'Generate your unique link and share it on WhatsApp, Telegram, or Instagram.' },
  { icon: 'ph:wallet-duotone', title: 'Get Paid', desc: 'Earn commissions instantly once someone buys through your link. Cash out weekly.' },
]

const benefits = [
  { icon: 'ph:lightning-duotone', title: 'Instant Notifications', desc: 'Know the second you earn a commission.' },
  { icon: 'ph:chart-line-up-duotone', title: 'Growth Tracking', desc: 'See which links are performing best and optimize.' },
  { icon: 'ph:shield-check-duotone', title: 'Verified Payments', desc: 'Direct bank transfers with no middleman delays.' },
]
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px border-dark-100;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
