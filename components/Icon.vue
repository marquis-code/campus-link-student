<template>
  <component 
    :is="lucideIcon" 
    v-bind="$attrs"
    :size="size || 24"
    :stroke-width="strokeWidth || 2"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps<{
  name: string
  size?: number | string
  strokeWidth?: number | string
}>()

const lucideIcon = computed(() => {
  if (!props.name) return icons.HelpCircle

  // If it doesn't start with ph:, assume it's a direct Lucide name
  if (!props.name.startsWith('ph:')) {
    return icons[props.name as keyof typeof icons] || icons.HelpCircle
  }

  // Map Phosphor icons to Lucide icons
  const map: Record<string, keyof typeof icons> = {
    'ph:arrow-left-bold': 'ArrowLeft',
    'ph:arrow-right-bold': 'ArrowRight',
    'ph:plus-bold': 'Plus',
    'ph:trash-bold': 'Trash2',
    'ph:check-bold': 'Check',
    'ph:check-circle-duotone': 'CheckCircle2',
    'ph:x-bold': 'X',
    'ph:copy-bold': 'Copy',
    'ph:megaphone-duotone': 'Megaphone',
    'ph:bank-duotone': 'Landmark',
    'ph:instagram-logo-duotone': 'Instagram',
    'ph:twitter-logo-duotone': 'Twitter',
    'ph:facebook-logo-duotone': 'Facebook',
    'ph:linkedin-logo-duotone': 'Linkedin',
    'ph:magnifying-glass-bold': 'Search',
    'ph:user-bold': 'User',
    'ph:shopping-bag-duotone': 'ShoppingBag',
    'ph:currency-circle-dollar-duotone': 'CircleDollarSign',
    'ph:package-duotone': 'Package',
    'ph:users-four-duotone': 'Users',
    'ph:whatsapp-logo-fill': 'MessageCircle',
    'ph:map-pin-duotone': 'MapPin',
    'ph:spinner-bold': 'Loader2',
    'ph:house-bold': 'Home',
    'ph:house-duotone': 'Home',
    'ph:chart-line-up-bold': 'TrendingUp',
    'ph:wallet-bold': 'Wallet',
    'ph:wallet-duotone': 'Wallet',
    'ph:user-circle-bold': 'UserCircle',
    'ph:user-duotone': 'User',
    'ph:sign-out-bold': 'LogOut',
    'ph:gear-bold': 'Settings',
    'ph:bell-bold': 'Bell',
    'ph:info-bold': 'Info',
    'ph:shield-check-bold': 'ShieldCheck',
    'ph:lightning-bold': 'Zap',
    'ph:rocket-launch-bold': 'Rocket',
    'ph:buildings-bold': 'Buildings',
    'ph:identification-card-bold': 'Contact',
    'ph:credit-card-bold': 'CreditCard',
    'ph:hand-coins-bold': 'HandCoins',
    'ph:clock-bold': 'Clock',
    'ph:eye-bold': 'Eye',
    'ph:eye-slash-bold': 'EyeOff',
    'ph:lock-bold': 'Lock',
    'ph:envelope-simple-bold': 'Mail',
    'ph:squares-four-bold': 'LayoutDashboard',
    'ph:shopping-cart-bold': 'ShoppingCart',
    'ph:package-bold': 'Package',
    'ph:list-bold': 'List',
    'ph:megaphone-bold': 'Megaphone',
    'ph:power-bold': 'LogOut',
  }

  const iconName = map[props.name] || 'HelpCircle'
  return icons[iconName as keyof typeof icons] || icons.HelpCircle
})
</script>
