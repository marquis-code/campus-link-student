import { auth_api } from "@/api_factory/modules/auth";

export const useResetPassword = () => {
  const loading = ref(false);

  const resetPassword = async (data: any) => {
    loading.value = true;
    try {
      const res = await auth_api.resetPassword(data);
      return res.data;
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { resetPassword, loading };
};
