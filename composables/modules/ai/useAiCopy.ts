import { ai_api } from "@/api_factory/modules/ai";
import { useLoader } from "@/composables/core/useLoader";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useAiCopy = () => {
  const loading = ref(false);
  const { startLoading, stopLoading } = useLoader();
  const { showToast } = useCustomToast();

  const generateCopy = async (data: { productId: string; tone?: string; keywords?: string[] }) => {
    loading.value = true;
    startLoading("Generating AI copy...");
    try {
      const res: any = await ai_api.generateCopy(data);
      if (res.type !== "ERROR") {
        showToast("Copy generated successfully!", "success");
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  return {
    loading,
    generateCopy,
  };
};
