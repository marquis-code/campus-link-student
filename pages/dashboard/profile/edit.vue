<template>
  <div class="max-w-2xl mx-auto space-y-10 py-6 pb-20">
    <header class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group">
        <Icon name="ArrowLeft" size="18" class="text-gray-400 group-hover:text-black transition-colors" />
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
        <p class="text-xs font-medium text-gray-500 mt-1">Update your personal identity</p>
      </div>
    </header>

    <div class="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
      <form @submit.prevent="handleUpdate" class="space-y-10 relative z-10">
        <!-- Avatar Section -->
        <div class="flex flex-col items-center gap-6">
          <div class="relative group">
            <div class="w-24 h-24 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center group-hover:border-black transition-colors">
              <img v-if="user?.avatar" :src="user.avatar" class="w-full h-full object-cover" />
              <Icon v-else name="User" size="36" class="text-gray-300" />
              
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" @click="$refs.fileInput.click()">
                <Icon name="Camera" class="text-white" size="20" />
              </div>
            </div>
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleAvatarUpload" />
          </div>
          <div class="text-center">
            <p class="text-sm font-bold text-gray-900">Profile Identity</p>
            <p class="text-[11px] text-gray-400 font-medium mt-1">PNG or JPG. Max 5MB</p>
          </div>
        </div>

        <div class="space-y-8">
          <AnimatedInput 
            label="Full Name"
            v-model="form.name"
            placeholder="Enter your legal name"
            required
          />

          <div class="relative">
             <AnimatedInput 
               label="Email Address"
               :model-value="user?.email"
               disabled
             />
             <div class="absolute right-4 top-10 text-gray-300">
                <Icon name="Lock" size="14" />
             </div>
          </div>

          <AnimatedInput 
            label="Phone Number"
            v-model="form.phone"
            placeholder="+234 800 000 0000"
          />

          <div class="relative">
             <AnimatedInput 
               label="Assigned Campus"
               :model-value="user?.campus?.name || 'Global'"
               disabled
             />
             <div class="absolute right-4 top-10 text-gray-300">
                <Icon name="Lock" size="14" />
             </div>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-50">
          <button 
            type="submit" 
            :disabled="loading" 
            class="w-full py-4 bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:bg-gray-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <Icon v-if="loading" name="RefreshCw" class="animate-spin" size="18" />
            <template v-else>Update Identity</template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnimatedInput from '@/components/ui/AnimatedInput.vue'

const { user } = useUser()
const { updateProfile, loading } = useUpdateProfile()
const { uploadAvatar } = useUploadImage()
const { showToast } = useCustomToast()

const form = reactive({
  name: user.value?.name || '',
  phone: user.value?.phone || ''
})

const fileInput = ref(null)

const handleUpdate = async () => {
  const success = await updateProfile(form)
  if (success) {
    showToast({
      title: 'Profile Updated',
      message: 'Your personal information has been successfully synchronized.',
      toastType: 'success'
    })
    navigateTo('/dashboard/profile')
  }
}

const handleAvatarUpload = async (event: any) => {
  const file = event.target.files[0]
  if (!file) return
  
  const data = await uploadAvatar(file)
  if (data?.url) {
    await updateProfile({ avatar: data.url })
    showToast({ title: 'Avatar Updated', message: 'Profile picture updated successfully.', toastType: 'success' })
  }
}

definePageMeta({
  layout: 'default'
})
</script>
