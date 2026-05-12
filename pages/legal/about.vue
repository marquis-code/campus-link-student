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
        <span class="text-sm font-medium text-gray-500">About Us</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-16">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">About CampusLink</h1>
        <p class="text-gray-500 font-medium text-base max-w-lg">We are building the largest student-powered commerce network across African campuses.</p>
      </header>

      <!-- Mission -->
      <section class="space-y-6">
        <div class="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
          <div class="relative z-10 space-y-4 max-w-xl">
            <p class="text-xs font-bold text-emerald-400 tracking-widest">Our mission</p>
            <h2 class="text-2xl font-bold tracking-tight">Empower every student to build financial independence through campus commerce.</h2>
            <p class="text-gray-400 text-sm font-medium leading-relaxed">We believe every student has untapped influence. CampusLink turns that influence into a revenue stream — connecting students who promote with sellers who need reach.</p>
          </div>
        </div>
      </section>

      <!-- Story -->
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-gray-900">Our Story</h2>
        <div class="space-y-4 text-sm text-gray-500 font-medium leading-relaxed">
          <p>CampusLink was born in a UNILAG hostel room in 2025. Our founders noticed something obvious: students were already promoting products to each other on WhatsApp and Instagram — sneakers, perfume, food, gadgets — but they rarely got paid for it.</p>
          <p>We asked a simple question: what if every student who shared a product link could earn a commission when their friend bought it? What if we could track that, automate the payouts, and build trust between sellers and promoters?</p>
          <p>That question became CampusLink. Today, we operate across 54 campuses with over 15,000 active student ambassadors who have collectively earned more than ₦12 million in commissions.</p>
        </div>
      </section>

      <!-- Values -->
      <section class="space-y-6">
        <h2 class="text-lg font-bold text-gray-900">What we stand for</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div v-for="value in values" :key="value.title" class="p-6 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
            <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400">
              <Icon :name="value.icon" size="20" />
            </div>
            <h3 class="text-sm font-bold text-gray-900">{{ value.title }}</h3>
            <p class="text-xs text-gray-500 font-medium leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="space-y-6">
        <h2 class="text-lg font-bold text-gray-900">The team</h2>
        <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink is built by a small, passionate team of engineers, designers, and operators who deeply understand the African student experience. We are remote-first, move fast, and ship weekly.</p>
        <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-2">
          <h3 class="text-sm font-bold text-emerald-700">We are hiring!</h3>
          <p class="text-xs text-emerald-600 font-medium">We are looking for campus ambassadors, community managers, and part-time developers. If you are a student who wants to build the future of campus commerce, reach out at careers@campuslink.com.</p>
        </div>
      </section>

      <!-- Contact -->
      <section class="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center space-y-4">
        <h3 class="text-lg font-bold text-gray-900">Get in touch</h3>
        <p class="text-sm text-gray-500 font-medium max-w-sm mx-auto">For partnerships, press inquiries, or general questions, reach us at hello@campuslink.com</p>
        <div class="flex justify-center gap-3">
          <a href="#" class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-300 transition-all">
            <Icon name="Instagram" size="18" />
          </a>
          <a href="#" class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-300 transition-all">
            <Icon name="Twitter" size="18" />
          </a>
          <a href="#" class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-300 transition-all">
            <Icon name="Linkedin" size="18" />
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const values = [
  { icon: 'Heart', title: 'Student-first', desc: 'Every feature we build starts with one question: does this help students earn more, faster?' },
  { icon: 'Eye', title: 'Radical transparency', desc: 'Real-time analytics, clear commission rates, and no hidden fees. You always know exactly where you stand.' },
  { icon: 'Shield', title: 'Trust by default', desc: 'Verified sellers, encrypted data, and fair dispute resolution. We protect both sides of every transaction.' },
  { icon: 'Zap', title: 'Speed of execution', desc: 'Instant link generation, real-time tracking, and fast payouts. We respect your time and your hustle.' },
]
</script>
