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
        <span class="text-sm font-medium text-gray-500">Privacy Policy</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
        <p class="text-gray-500 font-medium text-sm">Last updated: May 2026</p>
      </header>

      <div class="space-y-8">
        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">1. Information We Collect</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">We collect information you provide directly, including your name, email address, phone number, campus affiliation, and bank account details for payouts. We also collect usage data such as pages visited, links clicked, products promoted, and referral performance metrics.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
          <ul class="text-sm text-gray-500 font-medium leading-relaxed list-disc pl-5 space-y-2">
            <li>To create and manage your ambassador account</li>
            <li>To track referral link clicks and attribute commissions accurately</li>
            <li>To process payout requests to your bank account</li>
            <li>To send transactional emails (payout confirmations, commission alerts)</li>
            <li>To improve platform performance and user experience</li>
            <li>To detect and prevent fraud or policy violations</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">3. Data Sharing</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">We do not sell your personal data. We share limited information with payment processors to facilitate payouts and with analytics providers to improve platform performance. Sellers do not have access to your personal information — they only see anonymized referral statistics.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">4. Data Security</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">We use industry-standard TLS encryption for all data in transit and AES-256 encryption for sensitive data at rest, including bank account details. Access to personal data is restricted to authorized team members on a need-to-know basis.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">5. Cookies and Tracking</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">We use essential cookies to maintain your session and referral tracking cookies to attribute sales to the correct ambassador. We do not use third-party advertising cookies. You can clear cookies at any time through your browser settings.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">6. Your Rights</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">You have the right to access, correct, or delete your personal data at any time. To request data deletion, contact support@campuslink.com. Please note that deleting your account will result in forfeiture of any unredeemed earnings.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">7. Contact Us</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">If you have questions about this Privacy Policy, contact our Data Protection team at privacy@campuslink.com.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
