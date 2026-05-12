import { auth_api } from "@/api_factory/modules/auth";

export const useForgotPassword = () => {
  const loading = ref(false);

  const forgotPassword = async (email: string) => {
    loading.value = true;
    try {
      const res = await auth_api.forgotPassword(email);
      return res.data;
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { forgotPassword, loading };
};
