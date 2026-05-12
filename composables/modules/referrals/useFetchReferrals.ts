import { referrals_api } from "@/api_factory/modules/referrals";

export const useFetchReferrals = () => {
  const loading = ref(false);
  const referrals = ref([]);

  const fetchReferrals = async () => {
    loading.value = true;
    try {
      const res: any = await referrals_api.getMyReferrals();
      if (res.type !== "ERROR") {
        referrals.value = res.data;
      }
    } finally {
      loading.value = false;
    }
  };

  const removeReferral = async (id: string) => {
    try {
      const res: any = await referrals_api.deleteReferral(id);
      if (res.type !== "ERROR") {
        referrals.value = referrals.value.filter(r => r._id !== id);
        return true;
      }
    } catch (e) {
      return false;
    }
  };

  return { loading, referrals, fetchReferrals, removeReferral };
};
