import { ref } from 'vue';

export const useUpdateProfile = () => {
  const loading = ref(false);
  const { $api } = useNuxtApp();
  const { user } = useUser();

  const updateProfile = async (data: any) => {
    loading.value = true;
    try {
      const res: any = await $api.auth.updateProfile(data);
      if (res.type !== 'ERROR') {
        user.value = { ...user.value, ...res.data };
        return true;
      }
      return false;
    } catch (e) {
      console.error('Profile update failed:', e);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    updateProfile,
    loading
  };
};
