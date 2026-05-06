import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const withdrawals_api = {
  getWithdrawals: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/withdrawals/mine");
  },
  requestWithdrawal: (data: { amount: number; bankName?: string; bankAccountNumber?: string; bankAccountName?: string }) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/withdrawals", data);
  },
};
