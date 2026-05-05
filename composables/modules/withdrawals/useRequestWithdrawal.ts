import { earnings_api } from "@/api_factory/modules/earnings";
import { useLoader } from "@/composables/core/useLoader";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useRequestWithdrawal = () => {
  const loading = ref(false);
  const { startLoading, stopLoading } = useLoader();
  const { showToast } = useCustomToast();

  const requestWithdrawal = async (data: any) => {
    loading.value = true;
    startLoading("Processing withdrawal request...");
    try {
      const res: any = await earnings_api.requestWithdrawal(data);
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Withdrawal request submitted successfully",
          toastType: "success",
        });
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return { loading, requestWithdrawal };
};
