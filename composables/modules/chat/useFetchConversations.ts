import { useChatState } from './useChatState'

export const useFetchConversations = () => {
  const { conversations } = useChatState()
  const config = useRuntimeConfig()

  const fetchConversations = async () => {
    try {
      const response = await $fetch(`${config.public.apiBase}/chat/conversations`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
      }) as any
      conversations.value = response
    } catch (e) {
      console.error('Failed to fetch student conversations', e)
    }
  }

  return { fetchConversations }
}
