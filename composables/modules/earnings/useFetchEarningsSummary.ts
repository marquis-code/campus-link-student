import { earnings_api } from "@/api_factory/modules/earnings";
import { useLoader } from "@/composables/core/useLoader";

export const useFetchEarningsSummary = () => {
  const loading = ref(false);
  const summary = ref(null);
  const { startLoading, stopLoading } = useLoader();

  const fetchSummary = async () => {
    loading.value = true;
    startLoading("Fetching earnings summary...");
    try {
      const res: any = await earnings_api.getSummary();
      if (res.type !== "ERROR") {
        summary.value = res.data;
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return { loading, summary, fetchSummary };
};
