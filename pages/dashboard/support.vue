<template>
  <div class="h-[calc(100vh-140px)] flex bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm relative">
    <!-- Sidebar / Conversation List -->
    <div 
      class="absolute lg:relative inset-0 lg:inset-auto z-40 lg:z-0 w-full lg:w-[360px] border-r border-gray-100 flex flex-col bg-white transition-transform duration-300 ease-in-out"
      :class="[!activeConversation || showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    >
      <div class="p-6 border-b border-gray-100 space-y-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900 tracking-tight">Messages</h1>
          <button @click="startSupportChat" class="p-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-all" title="New Support Ticket">
            <Plus class="w-5 h-5" />
          </button>
        </div>
        <!-- Search -->
        <div class="relative group">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            class="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-xl border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-50 outline-none text-sm font-medium transition-all"
          />
        </div>
      </div>
      
      <!-- List -->
      <div class="flex-1 overflow-y-auto divide-y divide-gray-50">
        <div v-if="loading" class="p-6 space-y-4">
          <div v-for="i in 5" :key="i" class="flex gap-4 animate-pulse">
            <div class="w-12 h-12 bg-gray-100 rounded-2xl"></div>
            <div class="flex-1 space-y-2 py-1">
              <div class="h-3 bg-gray-100 rounded w-1/3"></div>
              <div class="h-2 bg-gray-50 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <button 
          v-for="conv in conversations" 
          :key="conv._id"
          @click="selectConversation(conv)"
          :class="[
            'w-full px-6 py-4 flex items-center gap-4 text-left transition-all relative overflow-hidden',
            activeConversation?._id === conv._id 
              ? 'bg-primary-50/50' 
              : 'hover:bg-gray-50'
          ]"
        >
          <div class="relative shrink-0">
            <div class="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-100 overflow-hidden">
              <img v-if="getParticipant(conv)?.avatar" :src="getParticipant(conv)?.avatar" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-base">
                {{ getParticipant(conv)?.name?.charAt(0) || 'S' }}
              </div>
            </div>
            <div 
              v-if="onlineUsers.has(getParticipant(conv)?._id)"
              class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
            ></div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-0.5">
              <h4 class="font-bold text-[13px] text-gray-900 truncate">{{ conv.isSupport ? 'Customer Support' : getParticipant(conv)?.name }}</h4>
              <span class="text-[10px] text-gray-400 font-bold">{{ formatTime(conv.updatedAt) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[12px] truncate text-gray-500 font-medium pr-2">
                {{ conv.lastMessage?.content || 'Tap to start chatting' }}
              </p>
              <div v-if="conv.unreadCount > 0" class="px-1.5 py-0.5 bg-primary-600 text-white rounded-lg text-[10px] font-black min-w-[18px] text-center">
                {{ conv.unreadCount }}
              </div>
            </div>
          </div>
        </button>

        <div v-if="!loading && conversations.length === 0" class="p-12 text-center space-y-4">
           <div class="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-200">
              <MessageSquare class="w-8 h-8" />
           </div>
           <div>
             <p class="text-sm font-bold text-gray-900">No messages yet</p>
             <p class="text-xs text-gray-400 font-medium mt-1">Start a conversation with support or a seller.</p>
           </div>
           <button @click="startSupportChat" class="text-xs font-bold text-primary-600 hover:underline">Chat with Support</button>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col bg-[#efe7de] relative">
      <div class="absolute inset-0 opacity-[0.06] pointer-events-none custom-chat-bg"></div>

      <template v-if="activeConversation">
        <!-- Header -->
        <div class="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white/90 backdrop-blur-md z-30 sticky top-0">
          <div class="flex items-center gap-4">
            <button @click="closeConversation" class="lg:hidden p-2 -ml-2 text-gray-400">
              <ArrowLeft class="w-6 h-6" />
            </button>
            <div class="w-10 h-10 rounded-xl bg-gray-100 border border-gray-100 overflow-hidden shrink-0">
              <img v-if="getParticipant(activeConversation)?.avatar" :src="getParticipant(activeConversation)?.avatar" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-sm">
                {{ getParticipant(activeConversation)?.name?.charAt(0) || 'S' }}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-sm tracking-tight leading-tight">
                {{ activeConversation.isSupport ? 'Customer Support' : getParticipant(activeConversation)?.name }}
              </h3>
              <p v-if="isTyping" class="text-[10px] text-emerald-500 font-black uppercase tracking-widest animate-pulse mt-0.5">typing...</p>
              <p v-else class="text-[10px] font-bold mt-0.5 tracking-wide flex items-center gap-1.5" :class="onlineUsers.has(getParticipant(activeConversation)?._id) ? 'text-emerald-500' : 'text-gray-400'">
                <span class="w-1.5 h-1.5 rounded-full" :class="onlineUsers.has(getParticipant(activeConversation)?._id) ? 'bg-emerald-500' : 'bg-gray-300'"></span>
                {{ onlineUsers.has(getParticipant(activeConversation)?._id) ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messageContainer" class="flex-1 overflow-y-auto px-6 py-8 space-y-4 relative z-10 scroll-smooth">
          <div v-for="msg in messages" :key="msg._id" 
            :class="['flex w-full', msg.sender?._id === user?._id ? 'justify-end' : 'justify-start']"
          >
            <div 
              :class="[
                'max-w-[85%] lg:max-w-[70%] px-4 py-2 rounded-2xl relative shadow-sm',
                msg.sender?._id === user?._id 
                  ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none' 
                  : 'bg-white text-gray-900 rounded-tl-none'
              ]"
            >
              <!-- Tails -->
              <div v-if="msg.sender?._id === user?._id" class="absolute top-0 -right-2 w-3 h-3 bg-[#d9fdd3] clip-path-tail-right"></div>
              <div v-else class="absolute top-0 -left-2 w-3 h-3 bg-white clip-path-tail-left"></div>

              <div class="flex flex-col gap-1">
                <p v-if="msg.type === 'text'" class="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">{{ msg.content }}</p>
                <div v-if="msg.type === 'image'" class="rounded-xl overflow-hidden mb-1 border border-black/5">
                  <img :src="msg.mediaUrl" class="max-w-full h-auto cursor-pointer" />
                </div>
                
                <div class="flex items-center justify-end gap-1 min-w-[50px] -mt-1 self-end">
                  <span class="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{{ formatFullTime(msg.createdAt) }}</span>
                  <div v-if="msg.sender?._id === user?._id" class="flex items-center">
                    <CheckCheck class="w-3.5 h-3.5" :class="msg.isRead ? 'text-[#53bdeb]' : 'text-gray-400'" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="anchor" class="h-1 w-full"></div>
        </div>

        <!-- Input -->
        <div class="p-4 bg-white border-t border-gray-100 z-30">
          <div class="flex items-end gap-3 max-w-4xl mx-auto">
            <button @click="triggerFileUpload" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary-600 rounded-xl transition-all">
              <Plus class="w-5 h-5" />
            </button>
            <div class="flex-1 bg-gray-50 rounded-2xl border border-transparent px-4 py-1.5 flex items-end transition-all focus-within:bg-white focus-within:border-primary-500">
              <textarea 
                v-model="newMessage" 
                @input="handleTyping"
                @keydown.enter.prevent="handleSendMessage"
                placeholder="Type your message..."
                rows="1"
                class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 resize-none outline-none font-medium text-gray-900 min-h-[40px] max-h-32"
              ></textarea>
            </div>
            <button 
              @click="handleSendMessage"
              :disabled="!newMessage.trim()"
              class="w-10 h-10 shrink-0 flex items-center justify-center bg-primary-600 text-white rounded-xl hover:bg-primary-700 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send class="w-5 h-5 ml-0.5" />
            </button>
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept="image/*" />
        </div>
      </template>

      <!-- Empty Selection -->
      <div v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
        <div class="max-w-sm space-y-6">
           <div class="w-24 h-24 bg-primary-50 rounded-[40px] flex items-center justify-center mx-auto text-primary-600">
              <MessageSquare class="w-10 h-10" />
           </div>
           <div class="space-y-2">
             <h2 class="text-xl font-bold text-gray-900">Your Conversations</h2>
             <p class="text-sm text-gray-500 font-medium">Select a chat to see your message history or start a new support ticket.</p>
           </div>
           <button @click="startSupportChat" class="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200">Chat with Support</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { Plus, MessageSquare, Search, CheckCheck, Send, ArrowLeft } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { user } = useUser()
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

const selectConversation = async (conv: any) => {
  if (activeConversation.value) {
    socket?.emit('leave_conversation', { conversationId: activeConversation.value._id })
  }
  activeConversation.value = conv
  conv.unreadCount = 0
  showSidebar.value = false
  socket?.emit('join_conversation', { conversationId: conv._id })
  await fetchMessages(conv._id)
  scrollToBottom()
}

const closeConversation = () => {
  if (activeConversation.value) {
    socket?.emit('leave_conversation', { conversationId: activeConversation.value._id })
  }
  activeConversation.value = null
  showSidebar.value = true
}

const startSupportChat = async () => {
  // Check if a support chat already exists
  const supportConv = conversations.value.find(c => c.isSupport)
  if (supportConv) {
    selectConversation(supportConv)
    return
  }

  // Create new support conversation
  try {
    const config = useRuntimeConfig()
    const newConv = await $fetch(`${config.public.apiBase}/chat/conversations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      body: { 
        participantId: user.value?._id, // Self as participant for support, backend handles logic
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
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
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

const getParticipant = (conv: any) => {
  return conv.participants?.find((p: any) => p._id !== user.value?._id)
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
</style>
