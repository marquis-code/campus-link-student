<template>
  <div class="min-h-screen bg-white font-['Inter',sans-serif] selection:bg-emerald-100 overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <GraduationCap class="text-white" :size="18" />
          </div>
          <div class="flex flex-col">
            <span class="text-base font-bold text-gray-900 tracking-tight leading-none">CampusLink</span>
            <span class="text-[9px] font-semibold text-emerald-600 tracking-wider mt-0.5">Ambassador Hub</span>
          </div>
        </NuxtLink>
        
        <div class="hidden lg:flex items-center gap-8 text-gray-500 text-sm font-medium">
          <a href="#how-it-works" class="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#perks" class="hover:text-gray-900 transition-colors">Perks</a>
          <a href="#testimonials" class="hover:text-gray-900 transition-colors">Stories</a>
          <a href="#faq" class="hover:text-gray-900 transition-colors">FAQ</a>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="hidden sm:block font-semibold text-gray-900 hover:text-emerald-600 transition-colors text-sm">Sign in</NuxtLink>
          <NuxtLink to="/signup" class="px-5 py-2.5 bg-black text-white rounded-xl font-semibold text-xs hover:bg-gray-800 transition-all flex items-center gap-2">
            Get started
            <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Carousel -->
    <section class="relative pt-16 min-h-screen flex items-center overflow-hidden">
      <!-- Background Carousel -->
      <div class="absolute inset-0 z-0">
        <transition-group name="hero-slide" tag="div" class="absolute inset-0">
          <div 
            v-for="(slide, i) in heroSlides" 
            :key="i" 
            v-show="currentSlide === i" 
            class="absolute inset-0"
          >
            <img :src="slide.image" class="w-full h-full object-cover" :alt="slide.headline" />
          </div>
        </transition-group>
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-screen-xl mx-auto px-6 py-32 w-full">
        <div class="max-w-2xl space-y-8">
          <div class="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-white/90 font-semibold text-[11px] tracking-wider">Join 15,000+ campus ambassadors</span>
          </div>
          
          <transition name="slide-text" mode="out-in">
            <h1 :key="currentSlide" class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              {{ heroSlides[currentSlide].headline }}
            </h1>
          </transition>

          <transition name="slide-text" mode="out-in">
            <p :key="'desc-' + currentSlide" class="max-w-lg text-lg text-white/70 font-medium leading-relaxed">
              {{ heroSlides[currentSlide].description }}
            </p>
          </transition>

          <div class="flex flex-col sm:flex-row items-start gap-4 pt-2">
            <NuxtLink to="/signup" class="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all hover:scale-105 flex items-center gap-3 shadow-lg shadow-emerald-500/25">
              Start earning today
              <ArrowRight :size="18" />
            </NuxtLink>
          </div>

          <div class="flex items-center gap-3 pt-6">
            <button 
              v-for="(_, i) in heroSlides" 
              :key="i" 
              @click="currentSlide = i" 
              class="h-1 rounded-full transition-all duration-500"
              :class="currentSlide === i ? 'w-10 bg-emerald-400' : 'w-4 bg-white/30 hover:bg-white/50'"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="py-16 bg-gray-50 border-y border-gray-100">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center space-y-1">
            <h3 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{{ stat.value }}</h3>
            <p class="text-xs font-semibold text-gray-400 tracking-wider">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works (Grid) -->
    <section id="how-it-works" class="py-24 px-6">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <p class="text-xs font-bold text-emerald-600 tracking-widest uppercase">The Process</p>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Earning made simple.</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i" class="relative p-10 bg-white border border-gray-100 rounded-[40px] group hover:border-emerald-100 hover:shadow-xl transition-all duration-500">
            <div class="absolute right-8 top-8 text-7xl font-bold text-gray-50 group-hover:text-emerald-50 transition-colors">{{ i + 1 }}</div>
            <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              <component :is="step.icon" :size="32" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
            <p class="text-gray-500 font-medium text-base leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Perks (Grid) -->
    <section id="perks" class="py-24 px-6 bg-gray-900 text-white overflow-hidden">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <p class="text-xs font-bold text-emerald-400 tracking-widest uppercase">Perks</p>
          <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight">Built for student hustlers.</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="perk in perks" :key="perk.title" class="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 hover:border-white/20 transition-all group">
            <div class="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500/20 transition-colors">
              <component :is="perk.icon" :size="28" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ perk.title }}</h3>
            <p class="text-gray-400 text-sm font-medium leading-relaxed">{{ perk.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials (Grid) -->
    <section id="testimonials" class="py-24 px-6">
      <div class="max-w-screen-xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <p class="text-xs font-bold text-emerald-600 tracking-widest uppercase">Stories</p>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Student success stories.</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="t in testimonials" :key="t.name" class="p-10 bg-white border border-gray-100 rounded-[48px] shadow-sm hover:shadow-xl transition-all duration-500">
            <div class="flex items-center gap-1 mb-6">
              <Star v-for="s in 5" :key="s" :size="16" class="text-amber-400 fill-amber-400" />
            </div>
            <p class="text-gray-600 text-base font-medium leading-relaxed mb-8">"{{ t.quote }}"</p>
            <div class="flex items-center gap-4 pt-6 border-t border-gray-50">
              <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <User :size="24" />
              </div>
              <div>
                <p class="text-base font-bold text-gray-900">{{ t.name }}</p>
                <p class="text-xs text-gray-400 font-semibold">{{ t.campus }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-24 px-6 bg-gray-50">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16 space-y-4">
          <p class="text-xs font-bold text-emerald-600 tracking-widest uppercase">FAQ</p>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Common questions</h2>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, i) in faqs" :key="i" class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <button @click="openFaq = openFaq === i ? -1 : i" class="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors">
              <span class="text-base font-bold text-gray-900">{{ faq.q }}</span>
              <component :is="openFaq === i ? ChevronUp : ChevronDown" :size="20" class="text-gray-400 shrink-0 ml-4" />
            </button>
            <div v-show="openFaq === i" class="px-8 pb-8">
              <p class="text-base text-gray-500 font-medium leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-950 text-white pt-24 pb-8">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid lg:grid-cols-5 gap-12 pb-20 border-b border-white/10">
          <div class="lg:col-span-2 space-y-8">
            <NuxtLink to="/" class="flex items-center gap-2.5">
              <div class="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                <GraduationCap class="text-white" :size="20" />
              </div>
              <span class="text-lg font-bold tracking-tight text-white">CampusLink</span>
            </NuxtLink>
            <p class="max-w-xs text-gray-500 font-medium text-base leading-relaxed">
              Empowering African students to achieve financial independence through campus-based commerce.
            </p>
            <div class="flex gap-4">
              <a v-for="icon in [Instagram, Twitter, Linkedin]" :key="icon.name" href="#" class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all text-gray-400 hover:text-white">
                <component :is="icon" :size="20" />
              </a>
            </div>
          </div>

          <div v-for="linkGroup in footerLinks" :key="linkGroup.title">
            <h4 class="text-xs font-bold text-gray-400 tracking-wider mb-8 uppercase">{{ linkGroup.title }}</h4>
            <ul class="space-y-4 text-gray-500 font-medium text-base">
              <li v-for="link in linkGroup.links" :key="link.name">
                <NuxtLink :to="link.to" class="hover:text-white transition-colors">{{ link.name }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-8 text-center">
          <p class="text-gray-600 font-medium text-sm">© {{ new Date().getFullYear() }} CampusLink Technologies. Built for students, by students.</p>
        </div>
      </div>
    </footer>
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  GraduationCap, 
  ArrowRight, 
  Search, 
  Link as LinkIcon, 
  Wallet, 
  Zap, 
  BarChart3, 
  MessageCircle, 
  Shield, 
  Landmark, 
  Users,
  Star,
  User,
  ChevronDown,
  ChevronUp,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const currentSlide = ref(0)
const openFaq = ref(-1)

const heroSlides = [
  {
    image: '/images/hero-1.png',
    headline: 'Turn your campus network into real income.',
    description: 'Promote verified products from local sellers on your WhatsApp status and earn instant commissions on every sale. Zero investment needed.'
  },
  {
    image: '/images/hero-2.png',
    headline: 'Be the go-to plug on your campus.',
    description: 'Students already trust your recommendations. Now get paid for them. Share curated deals and watch your earnings grow.'
  },
  {
    image: '/images/hero-3.png',
    headline: 'Your hustle. Your rules. Your money.',
    description: 'Withdraw your earnings anytime directly to your bank account. No minimums, no delays, no hidden fees.'
  }
]

const stats = [
  { value: '₦12M+', label: 'Total paid out' },
  { value: '15k+', label: 'Active ambassadors' },
  { value: '250k+', label: 'Product shares' },
  { value: '54', label: 'Campuses' },
]

const steps = [
  { icon: Search, title: 'Browse deals', desc: 'Explore trending products from verified campus sellers. Filter by category, price, and commission rate.' },
  { icon: LinkIcon, title: 'Get your link', desc: 'Get a trackable referral link for any product in one click. Share it anywhere — WhatsApp, Instagram, Twitter.' },
  { icon: Wallet, title: 'Earn & Withdraw', desc: 'When someone buys through your link, you earn a commission. Withdraw directly to your bank anytime.' }
]

const perks = [
  { icon: Zap, title: 'Instant earnings', desc: 'Earn per sale with no cap. The more you promote, the more you make. Top ambassadors earn over ₦100k monthly.' },
  { icon: BarChart3, title: 'Live analytics', desc: 'Track clicks, conversions, and earnings in real time. Know exactly which products are performing best.' },
  { icon: MessageCircle, title: 'AI Copywriter', desc: 'Generate professional WhatsApp captions and DM scripts with our AI engine. No copywriting skills needed.' },
  { icon: Shield, title: 'Verified Only', desc: 'Every seller is verified. You only promote quality products from trusted campus businesses.' },
  { icon: Landmark, title: 'Direct Bank Pay', desc: 'Withdraw to any Nigerian bank account. No wallet minimums, no delays. Your money, when you want it.' },
  { icon: Users, title: 'Pro Community', desc: 'Join a network of student entrepreneurs. Access exclusive tips, strategies, and support from top earners.' },
]

const testimonials = [
  { name: 'Adebayo Oluwaseun', campus: 'UNILAG', quote: 'I made ₦45,000 in my first month just sharing perfume links. CampusLink changed my side hustle game completely.' },
  { name: 'Chioma Nwankwo', campus: 'UNN', quote: 'The AI copy feature is insane. It writes better captions than I ever could. My conversion rate doubled in two weeks!' },
  { name: 'Ibrahim Musa', campus: 'ABU', quote: 'Withdrew my earnings straight to my bank account within minutes. No stories, no delays. Truly built for students.' }
]

const faqs = [
  { q: 'Is CampusLink really free to join?', a: 'Yes, completely free. You never pay anything. You sign up, browse products, generate links, and start earning commissions.' },
  { q: 'How much can I earn?', a: 'Earnings depend on how actively you promote. Commission rates range from 5% to 25%. Our top ambassadors earn over ₦100,000 monthly.' },
  { q: 'How do I get paid?', a: 'You can withdraw your earnings at any time directly to your Nigerian bank account. Payouts are usually processed within minutes.' },
]

const footerLinks = [
  { title: 'Platform', links: [{ name: 'Find products', to: '/dashboard' }, { name: 'My campaigns', to: '/dashboard/referrals' }, { name: 'Earnings', to: '/dashboard/earnings' }] },
  { title: 'Support', links: [{ name: 'Help center', to: '/legal/help' }, { name: 'Student policy', to: '/legal/student-policy' }, { name: 'Dispute resolution', to: '/legal/disputes' }] },
  { title: 'Company', links: [{ name: 'About us', to: '/legal/about' }, { name: 'Privacy policy', to: '/legal/privacy' }, { name: 'Terms of use', to: '/legal/terms' }] },
]

// Auto-advance hero
let slideInterval: any
onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(slideInterval)
})
</script>

<style>
.hero-slide-enter-active, .hero-slide-leave-active { transition: opacity 1.2s ease; }
.hero-slide-enter-from, .hero-slide-leave-to { opacity: 0; }
.slide-text-enter-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-text-leave-active { transition: all 0.3s ease; }
.slide-text-enter-from { opacity: 0; transform: translateY(20px); }
.slide-text-leave-to { opacity: 0; transform: translateY(-10px); }

html { scroll-behavior: smooth; }
</style>
