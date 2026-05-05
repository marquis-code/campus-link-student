import { earnings_api } from "@/api_factory/modules/earnings";
import { useLoader } from "@/composables/core/useLoader";

export const useFetchWithdrawals = () => {
  const loading = ref(false);
  const withdrawals = ref([]);
  const { startLoading, stopLoading } = useLoader();

  const fetchWithdrawals = async () => {
    loading.value = true;
    startLoading("Fetching withdrawal history...");
    try {
      const res: any = await earnings_api.getWithdrawals();
      if (res.type !== "ERROR") {
        withdrawals.value = res.data;
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return { loading, withdrawals, fetchWithdrawals };
};
