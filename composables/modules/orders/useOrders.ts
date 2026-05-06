import { orders_api } from "@/api_factory/modules/orders";
import { useLoader } from "@/composables/core/useLoader";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useOrders = () => {
  const loading = ref(false);
  const { startLoading, stopLoading } = useLoader();
  const { showToast } = useCustomToast();

  const createOrder = async (payload: any) => {
    loading.value = true;
    startLoading("Processing order...");
    try {
      const res: any = await orders_api.createOrder(payload);
      if (res.type !== "ERROR") {
        showToast("Order placed successfully!", "success");
        return res.data;
      }
    } finally {
      loading.value = false;
      stopLoading();
    }
  };

  const getOrder = async (id: string) => {
    loading.value = true;
    try {
      const res: any = await orders_api.getOrder(id);
      if (res.type !== "ERROR") {
        return res.data;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    createOrder,
    getOrder,
  };
};
