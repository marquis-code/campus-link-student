import { referrals_api } from "@/api_factory/modules/referrals";
import { useLoader } from "@/composables/core/useLoader";

export const useCreateReferral = () => {
  const loading = ref(false);
  const { startLoading, stopLoading } = useLoader();

  const createReferral = async (productId: string) => {
    loading.value = true;
    startLoading("Initializing promotion...");
    try {
      const res: any = await referrals_api.createReferral(productId);
      return res;
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return { loading, createReferral };
};
