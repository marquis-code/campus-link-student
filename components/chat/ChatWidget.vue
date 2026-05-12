<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
    <!-- Chat Window -->
    <transition
      enter-active-class="transition duration-400 cubic-bezier(0.16, 1, 0.3, 1)"
      enter-from-class="translate-y-12 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-12 opacity-0 scale-95"
    >
      <div 
        v-if="isOpen" 
        class="mb-4 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-100px)] bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden flex flex-col pointer-events-auto relative sm:relative fixed inset-x-4 bottom-24 sm:inset-auto z-50"
        :class="{'fixed inset-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !bottom-0 !mb-0': isMobile}"
      >
        <!-- Header -->
        <div class="bg-white/80 backdrop-blur-xl border-b border-gray-50 p-6 flex items-center justify-between z-20 shrink-0">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center border border-primary-100 text-primary-600 shadow-inner">
               <Headset :size="24" />
            </div>
            <div>
              <h3 class="font-black text-[17px] text-gray-900 tracking-tight leading-none">Support Center</h3>
              <div class="flex items-center gap-2 mt-2">
                <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Active Support</span>
              </div>
            </div>
          </div>
          <button @click="isOpen = false" class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-900">
            <X :size="20" stroke-width="3" />
          </button>
        </div>

        <!-- Guest Form -->
        <div v-if="showGuestForm && !user" class="flex-1 p-10 flex flex-col items-center justify-center text-center space-y-8 overflow-y-auto">
           <div class="w-20 h-20 bg-primary-50 rounded-[32px] flex items-center justify-center text-primary-600 mb-2 shadow-inner">
              <UserPlus :size="40" />
           </div>
           <div class="space-y-3">
             <h4 class="font-black text-gray-900 text-2xl tracking-tight">Welcome to Support</h4>
             <p class="text-sm text-gray-500 font-bold leading-relaxed px-4">Please introduce yourself to start a secure session with our team.</p>
           </div>
           
           <div class="w-full space-y-5 max-w-sm">
             <div class="space-y-1.5 text-left">
               <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
               <input v-model="guestInfo.name" type="text" placeholder="e.g. John Doe" class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-[24px] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
             </div>
             <div class="space-y-1.5 text-left">
               <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
               <input v-model="guestInfo.email" type="email" placeholder="email@example.com" class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-[24px] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
             </div>
             <div class="space-y-1.5 text-left">
               <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
               <input v-model="guestInfo.phone" type="tel" placeholder="+234..." class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-[24px] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
             </div>
             <button 
               @click="submitGuestInfo"
               :disabled="!isGuestInfoValid"
               class="w-full py-5 bg-primary-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-primary-200 hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50 mt-6"
             >
               Start Chatting
             </button>
           </div>
        </div>

        <!-- Messages -->
        <template v-else>
          <div ref="messageContainer" class="flex-1 overflow-y-auto p-6 space-y-5 bg-[#efe7de]/40 relative">
            <div class="absolute inset-0 opacity-[0.04] pointer-events-none chat-pattern"></div>
            
            <div v-for="msg in messages" :key="msg._id" 
              :class="['flex w-full relative z-10', isMe(msg) ? 'justify-end' : 'justify-start']"
            >
              <div :class="[
                'max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] font-semibold shadow-sm relative',
                isMe(msg) 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-900 border border-gray-100 rounded-tl-none'
              ]">
                <!-- Tail logic -->
                <div v-if="isMe(msg)" class="absolute top-0 -right-1.5 w-3 h-3 bg-primary-600 clip-path-tail-right"></div>
                <div v-else class="absolute top-0 -left-1.5 w-3 h-3 bg-white clip-path-tail-left"></div>

                <p v-if="msg.type === 'text'" class="whitespace-pre-wrap leading-relaxed">{{ msg.content }}</p>
                <div v-if="msg.type === 'image'" class="rounded-xl overflow-hidden border border-black/5 mb-1 mt-1">
                  <img :src="msg.mediaUrl" class="max-w-full h-auto" />
                </div>
                
                <div class="flex items-center justify-end gap-1.5 mt-1.5 opacity-60">
                  <span class="text-[9px] font-black uppercase tracking-tighter">{{ formatTime(msg.createdAt) }}</span>
                  <CheckCheck v-if="isMe(msg)" :size="14" :class="msg.isRead ? 'text-blue-200' : 'text-white/60'" stroke-width="3" />
                </div>
              </div>
            </div>
            <div v-if="isTyping" class="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur shadow-sm rounded-full w-fit">
              <span class="text-[10px] text-primary-600 font-black tracking-widest uppercase animate-pulse">Typing...</span>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-5 bg-white border-t border-gray-50 z-20 shrink-0">
            <div class="flex items-end gap-3 bg-gray-50 rounded-[28px] p-1.5 border-2 border-transparent focus-within:border-primary-500 focus-within:bg-white transition-all shadow-inner">
              <button @click="triggerFileUpload" class="p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all">
                <Paperclip :size="20" stroke-width="2.5" />
              </button>
              <textarea 
                v-model="newMessage" 
                @keydown.enter.prevent="handleSendMessage"
                @input="handleTyping"
                placeholder="Message support..." 
                rows="1"
                class="flex-1 bg-transparent border-none focus:ring-0 text-[14px] py-3 resize-none outline-none font-bold text-gray-900 min-h-[44px] max-h-32"
              ></textarea>
              <button 
                @click="handleSendMessage"
                :disabled="!newMessage.trim()"
                class="w-12 h-12 flex items-center justify-center bg-primary-600 text-white rounded-2xl disabled:opacity-50 transition-all hover:bg-primary-700 active:scale-95 shadow-lg shadow-primary-200"
              >
                <Send :size="20" class="ml-0.5" stroke-width="2.5" />
              </button>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
          </div>
        </template>
      </div>
    </transition>

    <!-- Floating Bubble -->
    <button 
      @click="toggleChat"
      class="w-16 h-16 rounded-[28px] flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-all active:scale-95 pointer-events-auto relative overflow-hidden group border-2"
      :class="isOpen ? 'bg-gray-900 text-white border-gray-800' : 'bg-primary-600 text-white border-primary-500'"
    >
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <X v-if="isOpen" :size="28" stroke-width="3" />
      <MessageCircle v-else :size="28" stroke-width="2.5" class="relative z-10" />
      
      <span v-if="!isOpen && unreadCount > 0" class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] rounded-xl flex items-center justify-center font-black shadow-lg animate-bounce border-2 border-white">
        {{ unreadCount }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { 
  Headset, 
  X, 
  UserPlus, 
  Paperclip, 
  Send, 
  CheckCheck, 
  MessageCircle,
  Smile
} from 'lucide-vue-next'
import { useChatState } from '@/composables/modules/chat/useChatState'
import { useSendMessage } from '@/composables/modules/chat/useSendMessage'
import { useFetchConversations } from '@/composables/modules/chat/useFetchConversations'
import { useFetchMessages } from '@/composables/modules/chat/useFetchMessages'
import { useUser } from '@/composables/modules/auth/user'

const { user } = useUser()
const { 
  initSocket, 
  messages, 
  isTyping, 
  conversations,
  socket,
  activeConversation
} = useChatState()

const { sendMessage, sendTyping } = useSendMessage()
const { fetchConversations } = useFetchConversations()
const { fetchMessages } = useFetchMessages()

const isOpen = ref(false)
const showGuestForm = ref(false)
const newMessage = ref('')
const messageContainer = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const isMobile = ref(false)

const guestInfo = ref({
  name: '',
  email: '',
  phone: ''
})

const unreadCount = computed(() => {
  const support = conversations.value.find(c => c.isSupport)
  return support?.unreadCount || 0
})

const isGuestInfoValid = computed(() => {
  return guestInfo.value.name.trim() && 
         guestInfo.value.email.includes('@') && 
         guestInfo.value.phone.trim()
})

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    if (!user.value && !localStorage.getItem('guest_chat_id')) {
      showGuestForm.value = true
    } else {
      showGuestForm.value = false
      await ensureSupportConversation()
      scrollToBottom()
    }
  }
}

const submitGuestInfo = async () => {
  if (!isGuestInfoValid.value) return
  
  const config = useRuntimeConfig()
  try {
    const response = await $fetch(`${config.public.apiBase}/chat/support/guest`, {
      method: 'POST',
      body: { 
        guestInfo: guestInfo.value,
        isSupport: true,
        subject: `Guest: ${guestInfo.value.name}`
      }
    }) as any
    
    localStorage.setItem('guest_chat_id', response._id)
    localStorage.setItem('guest_info', JSON.stringify(guestInfo.value))
    showGuestForm.value = false
    await ensureSupportConversation()
  } catch (e) {
    console.error('Failed to create guest chat', e)
  }
}

const ensureSupportConversation = async () => {
  let supportConv = conversations.value.find(c => c.isSupport)
  const guestConvId = localStorage.getItem('guest_chat_id')

  if (!supportConv && guestConvId) {
    supportConv = { _id: guestConvId, isSupport: true }
  } else if (!supportConv && user.value) {
    await fetchConversations()
    supportConv = conversations.value.find(c => c.isSupport)
  }
  
  if (supportConv) {
    activeConversation.value = supportConv
    initSocket(true) // Ensure socket is init with either token or guestId
    socket.value?.emit('join_conversation', { conversationId: supportConv._id })
    await fetchMessages(supportConv._id, !user.value)
    scrollToBottom()
  }
}

const handleSendMessage = () => {
  if (!newMessage.value.trim() || !activeConversation.value) return
  sendMessage({
    conversationId: activeConversation.value._id,
    type: 'text',
    content: newMessage.value.trim()
  })
  newMessage.value = ''
  scrollToBottom()
}

const handleTyping = () => {
  if (activeConversation.value) {
    sendTyping(activeConversation.value._id, true)
    clearTimeout((window as any).studentTypingTimer)
    ;(window as any).studentTypingTimer = setTimeout(() => {
      if (activeConversation.value) sendTyping(activeConversation.value._id, false)
    }, 2000)
  }
}

const isMe = (msg: any) => {
  if (user.value) return msg.sender?._id === user.value._id
  return !msg.sender // Guest
}

const triggerFileUpload = () => fileInput.value?.click()

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length || !activeConversation.value) return
  const file = target.files[0]
  const formData = new FormData()
  formData.append('file', file)
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiBase}/upload/single`, {
      method: 'POST',
      body: formData
    }) as any
    sendMessage({
      conversationId: activeConversation.value._id,
      type: 'image',
      mediaUrl: response.url || response.data?.url
    })
  } catch (e) {
    console.error('Upload failed', e)
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

const formatTime = (date: string) => {
  if (!date) return 'Now'
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  if (localStorage.getItem('guest_chat_id') || user.value) {
     initSocket()
     fetchConversations()
  }
})
</script>

<style scoped>
.chat-pattern {
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-repeat: repeat;
}
.clip-path-tail-right { clip-path: polygon(0 0, 0 100%, 100% 0); }
.clip-path-tail-left { clip-path: polygon(100% 0, 100% 100%, 0 0); }
</style>
