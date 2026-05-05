import { earnings_api } from "@/api_factory/modules/earnings";
import { useLoader } from "@/composables/core/useLoader";

export const useFetchEarningsHistory = () => {
  const loading = ref(false);
  const earnings = ref([]);
  const { startLoading, stopLoading } = useLoader();

  const fetchEarnings = async () => {
    loading.value = true;
    startLoading("Fetching earnings history...");
    try {
      const res: any = await earnings_api.getMyEarnings();
      if (res.type !== "ERROR") {
        earnings.value = res.data;
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return { loading, earnings, fetchEarnings };
};
