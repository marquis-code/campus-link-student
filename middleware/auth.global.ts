export default defineNuxtRouteMiddleware((to) => {
  const { token } = useUser()
  
  const publicPaths = ['/login', '/signup', '/', '/forgot-password', '/reset-password']
  const isPublicPath = publicPaths.includes(to.path) || to.path.startsWith('/products/') || to.path.startsWith('/p/') || to.path === '/orders/success'

  if (token.value && isPublicPath) {
    if (to.path === '/login' || to.path === '/signup') {
      return navigateTo('/dashboard')
    }
  }

  if (!token.value && !isPublicPath) {
    return navigateTo('/login')
  }
})
