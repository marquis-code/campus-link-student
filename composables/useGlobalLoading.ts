import { ref } from 'vue'

export const useGlobalLoading = () => {
  const isActive = useState('global-loading', () => false)

  const showLoading = () => { isActive.value = true }
  const hideLoading = () => { isActive.value = false }

  return {
    isActive,
    showLoading,
    hideLoading
  }
}
