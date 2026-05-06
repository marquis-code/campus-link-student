import { computed } from "vue";

export const useWithdrawals = () => {
  const { withdrawals, fetchWithdrawals, loading: fetchLoading } = useFetchWithdrawals();
  const { requestWithdrawal, loading: requestLoading } = useRequestWithdrawal();

  return {
    withdrawals,
    fetchWithdrawals,
    requestWithdrawal,
    loading: computed(() => fetchLoading.value || requestLoading.value),
  };
};
