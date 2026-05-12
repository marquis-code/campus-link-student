<template>
  <div 
    class="fixed z-[100] flex flex-col items-end font-['Inter',sans-serif] transition-all duration-300"
    :class="[
      isOpen ? 'inset-0 sm:inset-auto sm:bottom-6 sm:right-6' : 'bottom-6 right-6 pointer-events-none'
    ]"
  >
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
        class="bg-[#efe7de] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative z-50 transition-all duration-300 border border-gray-200"
        :class="[
          isMobile 
            ? 'w-full h-full rounded-none m-0 inset-0' 
            : 'mb-4 w-[400px] h-[640px] rounded-2xl'
        ]"
      >
        <!-- Header: WhatsApp Teal -->
        <div class="bg-[#075e54] p-4 flex items-center justify-between z-20 shrink-0 shadow-md">
          <div class="flex items-center gap-3">
            <button @click="isOpen = false" class="sm:hidden text-white mr-1">
              <ArrowLeft :size="24" />
            </button>
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 overflow-hidden relative">
               <img src="https://ui-avatars.com/api/?name=Support&background=128c7e&color=fff" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="font-bold text-[16px] text-white tracking-tight leading-tight">CampusLink Support</h3>
              <p class="text-[11px] text-white/80 font-medium">Active now</p>
            </div>
          </div>
          <div class="flex items-center gap-4 text-white">
            <Video :size="20" class="opacity-80 cursor-not-allowed" />
            <Phone :size="18" class="opacity-80 cursor-not-allowed" />
            <MoreVertical :size="20" class="opacity-80 cursor-not-allowed" />
          </div>
        </div>

        <!-- Image Preview Modal -->
        <div v-if="selectedImage" class="absolute inset-0 z-[60] bg-black flex flex-col animate-in fade-in zoom-in duration-300">
          <div class="p-4 flex items-center justify-between text-white">
            <button @click="cancelImageUpload" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10">
              <X :size="24" />
            </button>
            <div class="flex items-center gap-6">
              <Crop :size="22" class="opacity-80" />
              <Smile :size="22" class="opacity-80" />
              <Type :size="22" class="opacity-80" />
              <Pencil :size="22" class="opacity-80" />
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center p-4 relative">
            <img :src="selectedImagePreview" class="max-w-full max-h-[70vh] object-contain shadow-2xl" :class="{'opacity-40 blur-sm': uploadingFile}" />
            
            <!-- Upload Loader -->
            <div v-if="uploadingFile" class="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
              <div class="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <p class="text-sm font-bold tracking-widest uppercase">Uploading to Cloudinary...</p>
            </div>
          </div>
          <div class="p-4 bg-black/40 backdrop-blur-md">
            <div class="flex items-end gap-3 bg-white/10 rounded-3xl p-2 border border-white/20">
              <textarea 
                v-model="imageCaption" 
                placeholder="Add a caption..." 
                rows="1"
                class="flex-1 bg-transparent border-none focus:ring-0 text-white text-[15px] py-2 px-3 resize-none outline-none font-medium placeholder:text-white/40"
              ></textarea>
              <button 
                @click="confirmImageUpload"
                class="w-12 h-12 flex items-center justify-center bg-[#00a884] text-white rounded-full shadow-lg"
              >
                <Send :size="20" />
              </button>
            </div>
          </div>
        </div>

        <!-- Guest Form -->
        <div v-if="showGuestForm && !user" class="flex-1 bg-white p-8 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto">
           <div class="w-20 h-20 bg-[#f0f2f5] rounded-full flex items-center justify-center text-[#075e54] mb-2 border-4 border-gray-50">
              <UserCircle2 :size="48" />
           </div>
           <div class="space-y-2">
             <h4 class="font-bold text-gray-900 text-xl">Support Center</h4>
             <p class="text-[13px] text-gray-500 font-medium leading-relaxed px-6">Please provide your details to connect with a support agent.</p>
           </div>
           
           <div class="w-full space-y-4 max-w-xs">
             <input v-model="guestInfo.name" type="text" placeholder="Your Name" class="w-full px-4 py-3 bg-[#f0f2f5] border-none rounded-xl outline-none text-sm font-semibold transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#075e54]/20" />
             <input v-model="guestInfo.email" type="email" placeholder="Email Address" class="w-full px-4 py-3 bg-[#f0f2f5] border-none rounded-xl outline-none text-sm font-semibold transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#075e54]/20" />
             <input v-model="guestInfo.phone" type="tel" placeholder="Phone Number" class="w-full px-4 py-3 bg-[#f0f2f5] border-none rounded-xl outline-none text-sm font-semibold transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#075e54]/20" />
             
             <button 
               @click="submitGuestInfo"
               :disabled="!isGuestInfoValid"
               class="w-full py-4 bg-[#075e54] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#075e54]/20 hover:bg-[#128c7e] transition-all disabled:opacity-50 mt-4 uppercase tracking-wider"
             >
               Start Session
             </button>
           </div>
        </div>

        <!-- Messages -->
        <template v-else>
          <div ref="messageContainer" class="flex-1 overflow-y-auto p-4 space-y-2 bg-[#efe7de] relative no-scrollbar">
            <div class="absolute inset-0 opacity-[0.06] pointer-events-none chat-pattern"></div>
            
            <div v-for="(msg, idx) in messages" :key="msg._id" 
              :class="['flex w-full relative z-10', isMe(msg) ? 'justify-end' : 'justify-start']"
            >
              <div v-if="shouldShowDate(msg, messages[idx-1])" class="w-full flex justify-center my-4 sticky top-0 z-20">
                <span class="px-3 py-1 bg-[#d1d7db] text-[#54656f] text-[11px] font-bold rounded-lg uppercase tracking-wider shadow-sm">{{ formatDateLabel(msg.createdAt) }}</span>
              </div>

              <div :class="[
                'max-w-[85%] px-2 py-1 rounded-lg text-[14px] shadow-sm relative group',
                isMe(msg) 
                  ? 'bg-[#dcf8c6] text-[#111b21]' 
                  : 'bg-white text-[#111b21]'
              ]">
                <!-- Tail -->
                <div v-if="isMe(msg)" class="absolute top-0 -right-2 w-3 h-3 bg-[#dcf8c6] clip-path-tail-right"></div>
                <div v-else class="absolute top-0 -left-2 w-3 h-3 bg-white clip-path-tail-left"></div>

                <!-- Image -->
                <div v-if="msg.type === 'image'" class="relative mb-1 p-0.5">
                  <div class="rounded-lg overflow-hidden border border-black/5 bg-gray-100">
                    <img :src="msg.mediaUrl" class="max-w-full h-auto object-cover min-w-[200px]" />
                  </div>
                  <p v-if="msg.content" class="mt-2 px-1 pb-1 font-medium leading-relaxed">{{ msg.content }}</p>
                </div>

                <!-- Text -->
                <p v-else class="px-1 py-0.5 font-medium leading-relaxed whitespace-pre-wrap">{{ msg.content }}</p>
                
                <!-- Status & Time -->
                <div class="flex items-center justify-end gap-1 px-1 select-none">
                  <span class="text-[10px] text-[#667781] font-medium">{{ formatTime(msg.createdAt) }}</span>
                  <div v-if="isMe(msg)" class="flex items-center">
                    <CheckCheck v-if="msg.isRead" :size="15" class="text-[#53bdeb]" />
                    <Check v-else :size="15" class="text-[#667781]" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Typing -->
            <div v-if="isTyping" class="flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm rounded-lg w-fit relative z-10 animate-in fade-in slide-in-from-bottom-2">
              <div class="flex gap-1">
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>

          <!-- Emoji Picker -->
          <div v-if="showEmojiPicker" class="absolute bottom-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-bottom-4 duration-300">
            <div class="flex items-center justify-between mb-3 px-1">
              <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Emojis</span>
              <button @click="showEmojiPicker = false" class="text-gray-400 hover:text-red-500 transition-colors"><X :size="16" /></button>
            </div>
            <div class="grid grid-cols-8 gap-2 overflow-y-auto max-h-48 no-scrollbar">
              <button 
                v-for="emoji in popularEmojis" 
                :key="emoji" 
                @click="addEmoji(emoji)"
                class="text-2xl hover:scale-125 transition-transform p-1 active:scale-95"
              >
                {{ emoji }}
              </button>
            </div>
          </div>

          <!-- Input Area -->
          <div class="p-3 bg-[#f0f2f5] z-20 shrink-0 flex items-end gap-2">
            <div class="flex-1 flex items-end gap-2 bg-white rounded-[24px] px-3 py-1.5 shadow-sm min-h-[48px]">
              <button @click="showEmojiPicker = !showEmojiPicker" class="p-2 text-[#54656f] hover:text-[#075e54] transition-colors">
                <Smile :size="24" />
              </button>
              <button @click="triggerFileUpload" class="p-2 text-[#54656f] hover:text-[#075e54] transition-colors">
                <Paperclip :size="24" class="rotate-45" />
              </button>
              <textarea 
                v-model="newMessage" 
                @keydown.enter.prevent="handleSendMessage"
                @input="handleTyping"
                placeholder="Type a message" 
                rows="1"
                class="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 resize-none outline-none font-medium text-[#111b21] min-h-[36px] max-h-32 placeholder:text-[#8696a0]"
              ></textarea>
            </div>
            
            <button 
              @click="handleSendMessage"
              class="w-12 h-12 flex items-center justify-center bg-[#00a884] text-white rounded-full shadow-md active:scale-90 transition-all shrink-0"
            >
              <Send v-if="newMessage.trim()" :size="22" class="ml-1" />
              <Mic v-else :size="22" />
            </button>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
          </div>
        </template>
      </div>
    </transition>

    <!-- Floating Bubble -->
    <button 
      v-if="!isOpen || !isMobile"
      @click="toggleChat"
      class="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 pointer-events-auto relative overflow-hidden group"
      :class="isOpen ? 'bg-[#075e54] text-white' : 'bg-[#25d366] text-white'"
    >
      <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <X v-if="isOpen" :size="24" stroke-width="3" />
      <MessageSquare v-else :size="26" stroke-width="2.5" class="relative z-10" />
      
      <span v-if="!isOpen && unreadCount > 0" class="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1.5 bg-[#00a884] text-white text-[11px] rounded-full flex items-center justify-center font-black shadow-lg border-2 border-white animate-bounce">
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
  Check,
  MessageCircle,
  Smile,
  Mic,
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  UserCircle2,
  Crop,
  Type,
  Pencil,
  MessageSquare
} from 'lucide-vue-next'
import { useChatState } from '@/composables/modules/chat/useChatState'
import { useSendMessage } from '@/composables/modules/chat/useSendMessage'
import { useFetchConversations } from '@/composables/modules/chat/useFetchConversations'
import { useFetchMessages } from '@/composables/modules/chat/useFetchMessages'
import { useGuestChat } from '@/composables/modules/chat/useGuestChat'
import { useChatActions } from '@/composables/modules/chat/useChatActions'
import { useFileUpload } from '@/composables/core/useFileUpload'
import { useUser } from '@/composables/modules/auth/user'

const { user } = useUser()
const { initiateGuestChat } = useGuestChat()
const { createSupportConversation } = useChatActions()
const { uploadFile, loading: uploadingFile } = useFileUpload()
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
const showEmojiPicker = ref(false)

const selectedImage = ref<File | null>(null)
const selectedImagePreview = ref('')
const imageCaption = ref('')

const popularEmojis = ['😀', '😂', '😍', '👍', '🙏', '🔥', '✨', '🎉', '💔', '😭', '😎', '🤔', '🙌', '💯', '🚀', '❤️', '✅', '❌', '🙄', '😴', '💪', '🥳', '🥺', '🤩', '💡', '📍', '🛍️', '💰', '🎓', '🤝', '👋', '⭐']

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

const addEmoji = (emoji: string) => {
  newMessage.value += emoji
  showEmojiPicker.value = false
}

const submitGuestInfo = async () => {
  if (!isGuestInfoValid.value) return
  
  try {
    const response = await initiateGuestChat(guestInfo.value) as any
    
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
    
    if (!supportConv) {
      try {
        supportConv = await createSupportConversation() as any
        await fetchConversations()
      } catch (e) {
        console.error('Failed to auto-create support chat', e)
      }
    }
  }
  
  if (supportConv) {
    activeConversation.value = supportConv
    initSocket(true) 
    
    if (socket.value) {
      if (socket.value.connected) {
        socket.value.emit('join_conversation', { conversationId: supportConv._id })
      } else {
        socket.value.on('connect', () => {
          socket.value?.emit('join_conversation', { conversationId: supportConv._id })
        })
      }
    }
    
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
  showEmojiPicker.value = false
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
  if (msg.isSystem) return false
  if (user.value) return msg.sender?._id === user.value._id
  return !msg.sender 
}

const triggerFileUpload = () => fileInput.value?.click()

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length || !activeConversation.value) return
  selectedImage.value = target.files[0]
  selectedImagePreview.value = URL.createObjectURL(selectedImage.value)
  imageCaption.value = ''
}

const cancelImageUpload = () => {
  selectedImage.value = null
  selectedImagePreview.value = ''
  imageCaption.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

const confirmImageUpload = async () => {
  if (!selectedImage.value || !activeConversation.value || uploadingFile.value) return
  
  try {
    const data = await uploadFile(selectedImage.value)
    if (data) {
      sendMessage({
        conversationId: activeConversation.value._id,
        type: 'image',
        mediaUrl: data.url,
        content: imageCaption.value.trim()
      })
      cancelImageUpload()
      scrollToBottom()
    }
  } catch (e) {
    console.error('Upload failed', e)
  }
}

const shouldShowDate = (msg: any, prevMsg: any) => {
  if (!prevMsg) return true
  const d1 = new Date(msg.createdAt).toDateString()
  const d2 = new Date(prevMsg.createdAt).toDateString()
  return d1 !== d2
}

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) return 'Today'
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::placeholder {
  color: #8696a0;
}
</style>
