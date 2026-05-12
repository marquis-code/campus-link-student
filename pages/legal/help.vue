<template>
  <div class="min-h-screen bg-white font-['Inter',sans-serif]">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center gap-4">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
            <Icon name="GraduationCap" class="text-white" size="18" />
          </div>
          <span class="text-base font-bold text-gray-900 tracking-tight">CampusLink</span>
        </NuxtLink>
        <span class="text-gray-200">/</span>
        <span class="text-sm font-medium text-gray-500">Help Center</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-16">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Help Center</h1>
        <p class="text-gray-500 font-medium text-base max-w-lg">Find answers to common questions and learn how to get the most out of CampusLink.</p>
      </header>

      <div class="space-y-6">
        <div v-for="(section, i) in sections" :key="i" class="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <button @click="openSection = openSection === i ? -1 : i" class="w-full flex items-center justify-between p-6 text-left group">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Icon :name="section.icon" size="20" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">{{ section.title }}</h3>
                <p class="text-xs text-gray-400 font-medium mt-0.5">{{ section.subtitle }}</p>
              </div>
            </div>
            <Icon :name="openSection === i ? 'ChevronUp' : 'ChevronDown'" size="18" class="text-gray-300 shrink-0" />
          </button>
          <div v-show="openSection === i" class="px-6 pb-6 space-y-4">
            <div v-for="(item, j) in section.items" :key="j" class="pl-14">
              <h4 class="text-sm font-bold text-gray-900 mb-1">{{ item.q }}</h4>
              <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center space-y-4">
        <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto border border-gray-100 text-gray-300">
          <Icon name="MessageCircle" size="24" />
        </div>
        <h3 class="text-lg font-bold text-gray-900">Still need help?</h3>
        <p class="text-sm text-gray-500 font-medium max-w-sm mx-auto">Our support team is available 24/7 via the in-app chat widget. Tap the chat bubble on any dashboard page.</p>
        <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-xs hover:bg-gray-800 transition-all">
          Open Dashboard <Icon name="ArrowRight" size="14" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const openSection = ref(0)

const sections = [
  {
    icon: 'UserPlus', title: 'Getting Started', subtitle: 'Account setup and first steps',
    items: [
      { q: 'How do I create an account?', a: 'Visit the signup page, enter your name, email, select your campus, and create a password. You can also sign up instantly using Google.' },
      { q: 'Do I need to verify my identity?', a: 'No identity verification is required to start promoting. However, you will need to add your bank details before requesting your first payout.' },
      { q: 'Can I use CampusLink if my campus is not listed?', a: 'Yes! Select the closest campus or choose "Other." We are constantly adding new campuses based on demand.' }
    ]
  },
  {
    icon: 'Link', title: 'Promoting Products', subtitle: 'Generating and sharing referral links',
    items: [
      { q: 'How do I get a referral link?', a: 'Browse the Discover page, find a product you want to promote, and click "Promote." A unique tracking link is generated instantly for you.' },
      { q: 'Where should I share my link?', a: 'Anywhere your audience is — WhatsApp status, Instagram stories, Twitter, TikTok, or even in person. The link tracks all clicks and purchases automatically.' },
      { q: 'Can I promote multiple products at once?', a: 'Absolutely. There is no limit to the number of products you can promote. Each product gets its own unique tracking link.' }
    ]
  },
  {
    icon: 'Wallet', title: 'Earnings & Payouts', subtitle: 'Commissions, withdrawals, and bank setup',
    items: [
      { q: 'How are commissions calculated?', a: 'Each product has a fixed commission amount set by the seller. You earn that amount every time someone purchases through your link.' },
      { q: 'When can I withdraw my earnings?', a: 'You can request a payout at any time once your balance reaches ₦1,000. Payouts are processed within 24-48 hours to your registered bank account.' },
      { q: 'How do I add my bank details?', a: 'Go to Profile > Payout Details and enter your bank name, account number, and account holder name. This is required before your first withdrawal.' }
    ]
  },
  {
    icon: 'Shield', title: 'Trust & Safety', subtitle: 'Security, disputes, and account protection',
    items: [
      { q: 'Are the sellers verified?', a: 'Yes. Every seller on CampusLink goes through a verification process. We only allow legitimate campus businesses to list products.' },
      { q: 'What if a buyer has an issue with a product?', a: 'The seller handles all product-related issues including delivery and returns. If there is a dispute affecting your commission, contact support via the chat widget.' },
      { q: 'Is my personal data safe?', a: 'We use industry-standard encryption for all data. Your bank details are encrypted and never shared with sellers. Read our full Privacy Policy for details.' }
    ]
  }
]
</script>
