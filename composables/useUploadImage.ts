import { ref } from 'vue';

export const useUploadImage = () => {
  const loading = ref(false);
  const { $api } = useNuxtApp();

  const uploadAvatar = async (file: File) => {
    loading.value = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Assuming there's an upload endpoint or using a generic one
      const res: any = await $api.auth.updateProfile(formData); // Fallback if no specific upload API
      // If there's a specific upload module, use it:
      // const res = await $api.upload.uploadFile(formData);
      
      if (res.type !== 'ERROR') {
        return res.data;
      }
      return null;
    } catch (e) {
      console.error('Image upload failed:', e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    uploadAvatar,
    loading
  };
};
