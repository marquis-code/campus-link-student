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
        <span class="text-sm font-medium text-gray-500">Student Policy</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Student Ambassador Policy</h1>
        <p class="text-gray-500 font-medium text-sm">Last updated: May 2026</p>
      </header>

      <div class="prose prose-sm max-w-none space-y-8">
        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">1. Eligibility</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">To participate in the CampusLink Ambassador Program, you must be a currently enrolled student at a recognized institution. There is no minimum GPA requirement. Ambassadors must be at least 16 years of age and provide accurate personal information during registration.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">2. Ambassador Responsibilities</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">As a CampusLink Ambassador, you agree to promote products honestly and transparently. You must not make false claims about product quality, availability, or pricing. All promotional content should be factual and reflect the actual product listing on the platform.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">3. Commission Structure</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">Commission rates are set by individual sellers and displayed on each product listing. CampusLink does not guarantee a minimum commission amount. Commissions are earned only when a verified purchase is completed through your unique referral link. Cancelled orders or refunded purchases will result in commission reversal.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">4. Payout Terms</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">Ambassadors may request payouts once their wallet balance reaches a minimum of ₦1,000. Payouts are processed within 24-48 business hours to the bank account registered on the platform. CampusLink reserves the right to delay payouts if fraud is suspected.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">5. Prohibited Conduct</h2>
          <ul class="text-sm text-gray-500 font-medium leading-relaxed list-disc pl-5 space-y-2">
            <li>Self-referrals or clicking your own links to inflate metrics</li>
            <li>Using bots, scripts, or automated tools to generate clicks</li>
            <li>Spamming or sending unsolicited bulk messages</li>
            <li>Impersonating CampusLink staff or other ambassadors</li>
            <li>Promoting products from outside the CampusLink platform using CampusLink branding</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">6. Account Suspension</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink reserves the right to suspend or permanently terminate any ambassador account that violates these policies. Suspended accounts will have pending payouts frozen until an investigation is complete. Ambassadors may appeal suspensions by contacting support.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">7. Changes to This Policy</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink may update this policy at any time. Continued use of the platform after changes constitutes acceptance of the revised policy. We will notify ambassadors of significant changes via email or in-app notification.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
