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
        <span class="text-sm font-medium text-gray-500">Terms of Service</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
        <p class="text-gray-500 font-medium text-sm">Last updated: May 2026</p>
      </header>

      <div class="space-y-8">
        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">By accessing or using CampusLink, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the platform. These terms apply to all users, including ambassadors, sellers, and visitors.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">2. Account Registration</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">You must provide accurate and complete information during registration. You are responsible for maintaining the security of your account credentials. CampusLink is not liable for any loss or damage arising from unauthorized account access due to your failure to protect your login information.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">3. Ambassador Program</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">As an ambassador, you are granted a non-exclusive, revocable license to promote products listed on CampusLink using your unique referral links. You agree not to misrepresent products, use deceptive marketing practices, or engage in any activity that damages the reputation of CampusLink or its sellers.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">4. Commission and Payments</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">Commissions are earned when a verified purchase is completed through your referral link. CampusLink reserves the right to reverse commissions for cancelled or refunded orders. Payment processing times may vary but typically complete within 24-48 business hours after a payout request.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">5. Intellectual Property</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">All CampusLink branding, logos, designs, and platform code are the intellectual property of CampusLink Technologies. You may not reproduce, distribute, or create derivative works from our intellectual property without written permission.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">6. Limitation of Liability</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink is provided on an "as is" basis. We do not guarantee uninterrupted service, specific earning amounts, or product quality from sellers. CampusLink is not liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">7. Termination</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink may suspend or terminate your account at any time for violation of these terms. You may also delete your account at any time through your profile settings. Upon termination, any pending commissions below the minimum payout threshold will be forfeited.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">8. Governing Law</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be resolved through the dispute resolution process outlined in our Dispute Resolution policy.</p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">9. Changes to Terms</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
