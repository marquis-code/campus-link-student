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
        <span class="text-sm font-medium text-gray-500">Dispute Resolution</span>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-6 py-16 space-y-12">
      <header class="space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-900 transition-colors">
          <Icon name="ArrowLeft" size="16" /> Back to home
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Dispute Resolution</h1>
        <p class="text-gray-500 font-medium text-sm">How we handle conflicts between ambassadors, sellers, and buyers.</p>
      </header>

      <div class="space-y-8">
        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">Overview</h2>
          <p class="text-sm text-gray-500 font-medium leading-relaxed">CampusLink is committed to ensuring a fair and transparent experience for all users. This page outlines how disputes are handled, the process for filing a claim, and the expected resolution timelines.</p>
        </section>

        <section class="space-y-4">
          <h2 class="text-lg font-bold text-gray-900">Types of Disputes</h2>
          <div class="grid gap-4">
            <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Icon name="AlertTriangle" size="16" /></div>
                <h3 class="text-sm font-bold text-gray-900">Commission Disputes</h3>
              </div>
              <p class="text-sm text-gray-500 font-medium leading-relaxed pl-11">If you believe a sale was completed through your referral link but the commission was not credited, file a dispute within 14 days of the transaction. Provide the order ID and your referral link as evidence.</p>
            </div>
            <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><Icon name="ShieldAlert" size="16" /></div>
                <h3 class="text-sm font-bold text-gray-900">Product Quality Issues</h3>
              </div>
              <p class="text-sm text-gray-500 font-medium leading-relaxed pl-11">If a buyer reports a quality issue with a product you promoted, the seller is responsible for resolution. However, repeated complaints about a product may lead to its removal from the marketplace.</p>
            </div>
            <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Icon name="Landmark" size="16" /></div>
                <h3 class="text-sm font-bold text-gray-900">Payout Issues</h3>
              </div>
              <p class="text-sm text-gray-500 font-medium leading-relaxed pl-11">If a payout request is delayed beyond 48 business hours or fails, contact support immediately. Provide your withdrawal ID and bank details for expedited resolution.</p>
            </div>
          </div>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-bold text-gray-900">Resolution Process</h2>
          <div class="space-y-4">
            <div class="flex gap-4 items-start">
              <div class="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">1</div>
              <div>
                <h4 class="text-sm font-bold text-gray-900">Submit a Dispute</h4>
                <p class="text-sm text-gray-500 font-medium mt-1">Contact our support team via the in-app chat widget or email support@campuslink.com with your dispute details.</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">2</div>
              <div>
                <h4 class="text-sm font-bold text-gray-900">Investigation</h4>
                <p class="text-sm text-gray-500 font-medium mt-1">Our team reviews the evidence, transaction logs, and referral data. We may contact both parties for additional information.</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">3</div>
              <div>
                <h4 class="text-sm font-bold text-gray-900">Resolution</h4>
                <p class="text-sm text-gray-500 font-medium mt-1">Most disputes are resolved within 3-5 business days. You will be notified of the outcome via email and in-app notification.</p>
              </div>
            </div>
          </div>
        </section>

        <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center space-y-4">
          <h3 class="text-lg font-bold text-gray-900">Need to file a dispute?</h3>
          <p class="text-sm text-gray-500 font-medium max-w-sm mx-auto">Use the in-app chat widget on your dashboard or email us directly at support@campuslink.com.</p>
          <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold text-xs hover:bg-gray-800 transition-all">
            Go to Dashboard <Icon name="ArrowRight" size="14" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
