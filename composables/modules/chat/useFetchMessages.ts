import { useChatState } from './useChatState'

export const useFetchMessages = () => {
  const { messages } = useChatState()
  const config = useRuntimeConfig()

  const fetchMessages = async (conversationId: string, isGuest = false) => {
    try {
      const endpoint = isGuest 
        ? `${config.public.apiBase}/chat/support/guest/${conversationId}/messages`
        : `${config.public.apiBase}/chat/conversations/${conversationId}/messages`
      
      const headers: any = {}
      const token = localStorage.getItem('auth_token')
      if (token && !isGuest) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await $fetch(endpoint, { headers }) as any[]
      messages.value = [...response].reverse()
    } catch (e) {
      console.error('Failed to fetch messages', e)
      messages.value = []
    }
  }

  return { fetchMessages }
}
