import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const earnings_api = {
  getSummary: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/earnings/summary");
  },
  getMyEarnings: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/earnings/me");
  },
  requestWithdrawal: (data: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/withdrawals", data);
  },
  getWithdrawals: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/withdrawals/me");
  },
};
