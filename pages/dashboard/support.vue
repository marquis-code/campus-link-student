<template>
  <div class="h-screen flex bg-[#efe7de] overflow-hidden relative no-scrollbar">
    <div class="absolute inset-0 opacity-[0.06] pointer-events-none custom-chat-bg"></div>

    <!-- Sidebar / Conversation List -->
    <div 
      class="absolute lg:relative inset-0 lg:inset-auto z-40 lg:z-0 w-full lg:w-[380px] border-r border-gray-100 flex flex-col bg-white transition-transform duration-300 ease-in-out"
      :class="[!activeConversation || showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    >
      <div class="p-6 bg-[#f0f2f5] border-b border-gray-100 space-y-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-black text-gray-900 tracking-tight">Messages</h1>
          <div class="flex items-center gap-2">
            <NuxtLink to="/dashboard" class="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-all" title="Back to Dashboard">
              <ArrowLeft :size="20" />
            </NuxtLink>
            <button class="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-all">
              <Users :size="20" />
            </button>
            <button @click="startSupportChat" class="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-all">
              <Plus :size="20" />
            </button>
            <button class="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-all">
              <MoreVertical :size="20" />
            </button>
          </div>
        </div>
        <!-- Search -->
        <div class="relative group">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#00a884] transition-colors" />
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            class="w-full pl-11 pr-4 py-2 bg-white rounded-lg border-none focus:ring-0 text-sm font-medium shadow-sm"
          />
        </div>
      </div>
      
      <!-- List -->
      <div class="flex-1 overflow-y-auto bg-white no-scrollbar">
        <div v-if="loading" class="divide-y divide-gray-50">
          <div v-for="i in 5" :key="i" class="p-4 flex gap-4 animate-pulse">
            <div class="w-12 h-12 bg-gray-50 rounded-full"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="h-3 bg-gray-50 rounded w-1/3"></div>
              <div class="h-2 bg-gray-50 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <button 
          v-for="conv in conversations" 
          :key="conv._id"
          @click="selectConversation(conv)"
          :class="[
            'w-full px-4 py-3 flex items-center gap-4 text-left transition-all border-b border-gray-50',
            activeConversation?._id === conv._id 
              ? 'bg-[#f0f2f5]' 
              : 'hover:bg-[#f5f6f6]'
          ]"
        >
          <div class="relative shrink-0">
            <div class="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border border-gray-50">
              <img v-if="getParticipant(conv)?.avatar" :src="getParticipant(conv)?.avatar" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-[#00a884] text-white font-bold text-base">
                {{ getParticipant(conv)?.name?.charAt(0) || 'C' }}
              </div>
            </div>
            <div 
              v-if="onlineUsers.has(getParticipant(conv)?._id)"
              class="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] border-2 border-white rounded-full"
            ></div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-0.5">
              <h4 class="font-bold text-[14px] text-[#111b21] truncate">{{ conv.isSupport ? 'Customer Support' : getParticipant(conv)?.name }}</h4>
              <span class="text-[11px] text-[#667781] font-medium">{{ formatTime(conv.updatedAt) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[13px] truncate text-[#667781] font-medium pr-2">
                {{ conv.lastMessage?.content || 'Tap to chat' }}
              </p>
              <div v-if="conv.unreadCount > 0" class="px-1.5 py-0.5 bg-[#25d366] text-white rounded-full text-[10px] font-black min-w-[18px] text-center shadow-sm">
                {{ conv.unreadCount }}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col bg-[#efe7de] relative z-10">
      <template v-if="activeConversation">
        <!-- Header -->
        <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-[#f0f2f5] z-30 sticky top-0 shadow-sm">
          <div class="flex items-center gap-4">
            <button @click="closeConversation" class="lg:hidden p-2 -ml-2 text-[#54656f]">
              <ArrowLeft :size="24" />
            </button>
            <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
              <img v-if="getParticipant(activeConversation)?.avatar" :src="getParticipant(activeConversation)?.avatar" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-[#00a884] text-white font-bold text-sm">
                {{ getParticipant(activeConversation)?.name?.charAt(0) || 'C' }}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-[#111b21] text-[15px] tracking-tight leading-tight">
                {{ activeConversation.isSupport ? 'Customer Support' : getParticipant(activeConversation)?.name }}
              </h3>
              <p v-if="isTyping" class="text-[12px] text-[#00a884] font-medium mt-0.5">typing...</p>
              <p v-else class="text-[12px] font-medium mt-0.5 text-[#667781]">
                {{ onlineUsers.has(getParticipant(activeConversation)?._id) ? 'online' : 'offline' }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-[#54656f]">
            <Search :size="20" class="cursor-pointer" />
            <MoreVertical :size="20" class="cursor-pointer" />
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
            <div class="flex items-end gap-3 bg-white/10 rounded-3xl p-2 border border-white/20 max-w-2xl mx-auto">
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

        <!-- Messages -->
        <div ref="messageContainer" class="flex-1 overflow-y-auto px-6 py-4 space-y-2 relative z-10 no-scrollbar">
          <div v-for="(msg, idx) in messages" :key="msg._id" 
            :class="['flex w-full', msg.sender?._id === user?._id ? 'justify-end' : 'justify-start']"
          >
            <div v-if="shouldShowDate(msg, messages[idx-1])" class="w-full flex justify-center my-4 sticky top-0 z-20">
              <span class="px-3 py-1 bg-[#ffffff] text-[#54656f] text-[11px] font-bold rounded-lg uppercase tracking-wider shadow-sm border border-gray-100">{{ formatDateLabel(msg.createdAt) }}</span>
            </div>

            <div 
              :class="[
                'max-w-[85%] lg:max-w-[65%] px-2 py-1 rounded-lg relative shadow-sm',
                msg.sender?._id === user?._id 
                  ? 'bg-[#dcf8c6] text-[#111b21]' 
                  : 'bg-white text-[#111b21]'
              ]"
            >
              <!-- Tails -->
              <div v-if="msg.sender?._id === user?._id" class="absolute top-0 -right-2 w-3 h-3 bg-[#dcf8c6] clip-path-tail-right"></div>
              <div v-else class="absolute top-0 -left-2 w-3 h-3 bg-white clip-path-tail-left"></div>

              <div class="flex flex-col">
                <!-- Image -->
                <div v-if="msg.type === 'image'" class="relative mb-1 p-0.5">
                  <div class="rounded-lg overflow-hidden border border-black/5 bg-gray-50">
                    <img :src="msg.mediaUrl" class="max-w-full h-auto min-w-[240px] cursor-pointer" />
                  </div>
                  <p v-if="msg.content" class="mt-2 px-1 pb-1 text-[14px] font-medium leading-relaxed">{{ msg.content }}</p>
                </div>

                <!-- Text -->
                <p v-else class="px-1 py-0.5 text-[14px] leading-relaxed font-medium whitespace-pre-wrap">{{ msg.content }}</p>
                
                <!-- Status & Time -->
                <div class="flex items-center justify-end gap-1 px-1 select-none self-end">
                  <span class="text-[10px] text-[#667781] font-medium">{{ formatFullTime(msg.createdAt) }}</span>
                  <div v-if="msg.sender?._id === user?._id" class="flex items-center">
                    <CheckCheck v-if="msg.isRead" :size="15" class="text-[#53bdeb]" />
                    <Check v-else :size="15" class="text-[#667781]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="anchor" class="h-1 w-full"></div>
        </div>

        <!-- Emoji Picker -->
        <div v-if="showEmojiPicker" class="absolute bottom-24 left-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-bottom-4 duration-300 max-w-sm">
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
        <div class="p-4 bg-[#f0f2f5] z-30 flex items-end gap-2">
          <div class="flex-1 flex items-end gap-2 bg-white rounded-[24px] px-3 py-1.5 shadow-sm min-h-[48px]">
            <button @click="showEmojiPicker = !showEmojiPicker" class="p-2 text-[#54656f] hover:text-[#00a884] transition-colors">
              <Smile :size="24" />
            </button>
            <button @click="triggerFileUpload" class="p-2 text-[#54656f] hover:text-[#00a884] transition-colors">
              <Paperclip :size="24" class="rotate-45" />
            </button>
            <textarea 
              v-model="newMessage" 
              @input="handleTyping"
              @keydown.enter.prevent="handleSendMessage"
              placeholder="Type a message"
              rows="1"
              class="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 resize-none outline-none font-medium text-[#111b21] min-h-[36px] max-h-32 placeholder:text-[#8696a0]"
            ></textarea>
          </div>
          <button 
            @click="handleSendMessage"
            class="w-12 h-12 shrink-0 flex items-center justify-center bg-[#00a884] text-white rounded-full shadow-md active:scale-90 transition-all"
          >
            <Send v-if="newMessage.trim()" :size="22" class="ml-1" />
            <Mic v-else :size="22" />
          </button>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
        </div>
      </template>

      <!-- Empty Selection -->
      <div v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#f0f2f5] relative">
        <div class="absolute inset-0 opacity-[0.06] pointer-events-none custom-chat-bg"></div>
        <div class="max-w-md space-y-8 relative z-10">
           <div class="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto text-[#075e54] shadow-sm">
              <MessageSquare :size="56" />
           </div>
           <div class="space-y-4">
             <h2 class="text-3xl font-black text-[#41525d] tracking-tight">Customer Support</h2>
             <p class="text-[14px] text-[#667781] font-medium leading-relaxed px-8">Connect with sellers or our dedicated support team to resolve any issues or get more information.</p>
           </div>
           <button @click="startSupportChat" class="px-10 py-3 bg-[#00a884] text-white rounded-full font-bold shadow-lg hover:bg-[#128c7e] transition-all uppercase tracking-wider text-[13px]">Start Chatting</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { 
  Plus, 
  MessageSquare, 
  Search, 
  CheckCheck, 
  Send, 
  ArrowLeft, 
  Smile, 
  Paperclip, 
  Mic, 
  MoreVertical, 
  Users,
  X,
  Crop,
  Type,
  Pencil,
  Check
} from 'lucide-vue-next'
import { useChatState } from '@/composables/modules/chat/useChatState'
import { useSendMessage } from '@/composables/modules/chat/useSendMessage'
import { useFetchConversations } from '@/composables/modules/chat/useFetchConversations'
import { useFetchMessages } from '@/composables/modules/chat/useFetchMessages'
import { useUser } from '@/composables/modules/auth/user'
import { useFileUpload } from '@/composables/core/useFileUpload'

definePageMeta({
  layout: 'full-screen'
})

const { user } = useUser()
const { uploadFile, loading: uploadingFile } = useFileUpload()
const { 
  initSocket, 
  conversations, 
  activeConversation, 
  messages, 
  isTyping,
  socket,
  onlineUsers
} = useChatState()

const { sendMessage, sendTyping } = useSendMessage()
const { fetchConversations } = useFetchConversations()
const { fetchMessages } = useFetchMessages()

const newMessage = ref('')
const messageContainer = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const showSidebar = ref(true)
const loading = ref(false)
const showEmojiPicker = ref(false)

const selectedImage = ref<File | null>(null)
const selectedImagePreview = ref('')
const imageCaption = ref('')

const popularEmojis = ['😀', '😂', '😍', '👍', '🙏', '🔥', '✨', '🎉', '💔', '😭', '😎', '🤔', '🙌', '💯', '🚀', '❤️', '✅', '❌', '🙄', '😴', '💪', '🥳', '🥺', '🤩', '💡', '📍', '🛍️', '💰', '🎓', '🤝', '👋', '⭐']

const selectConversation = async (conv: any) => {
  if (activeConversation.value) {
    socket.value?.emit('leave_conversation', { conversationId: activeConversation.value._id })
  }
  activeConversation.value = conv
  conv.unreadCount = 0
  showSidebar.value = false
  socket.value?.emit('join_conversation', { conversationId: conv._id })
  await fetchMessages(conv._id)
  scrollToBottom()
}

const addEmoji = (emoji: string) => {
  newMessage.value += emoji
}

const closeConversation = () => {
  if (activeConversation.value) {
    socket.value?.emit('leave_conversation', { conversationId: activeConversation.value._id })
  }
  activeConversation.value = null
  showSidebar.value = true
}

const startSupportChat = async () => {
  const supportConv = conversations.value.find(c => c.isSupport)
  if (supportConv) {
    selectConversation(supportConv)
    return
  }

  try {
    const config = useRuntimeConfig()
    const newConv = await $fetch(`${config.public.apiBase}/chat/conversations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      body: { 
        participantId: user.value?._id,
        isSupport: true,
        subject: 'General Support'
      }
    }) as any
    await fetchConversations()
    selectConversation(newConv)
  } catch (e) {
    console.error('Failed to start support chat', e)
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

const getParticipant = (conv: any) => {
  return conv.participants?.find((p: any) => p._id !== user.value?._id)
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
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatFullTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  initSocket()
  loading.value = true
  await fetchConversations()
  loading.value = false
})
</script>

<style scoped>
.custom-chat-bg {
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
</style>
