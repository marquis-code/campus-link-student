import { watch } from 'vue'

export const useUser = () => {
  // Use cookies for persistence across client and server
  const user = useCookie<any>("user_data", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })
  
  const token = useCookie<string | null>("auth_token", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  // Sync with localStorage for any legacy components (optional, but good for backward compatibility)
  if (import.meta.client) {
    watch(user, (val) => {
      if (val) {
        localStorage.setItem("user_data", JSON.stringify(val))
      } else {
        localStorage.removeItem("user_data")
      }
    }, { deep: true, immediate: true })

    watch(token, (val) => {
      if (val) {
        localStorage.setItem("auth_token", val)
      } else {
        localStorage.removeItem("auth_token")
      }
    }, { immediate: true })
  }

  const logOut = () => {
    user.value = null
    token.value = null
    if (import.meta.client) {
      localStorage.removeItem("user_data")
      localStorage.removeItem("auth_token")
    }
    return navigateTo("/login")
  }

  return {
    user,
    token,
    logOut,
  }
}
