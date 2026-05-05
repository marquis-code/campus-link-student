import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const referrals_api = {
  createReferral: (productId: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/referrals", { productId });
  },
  getMyReferrals: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/referrals/me");
  },
};
