import { GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT } from "../axios.config";

export const referrals_api = {
  createReferral: (productId: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/referrals", { productId });
  },
  getMyReferrals: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get("/referrals/me");
  },
  deleteReferral: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/referrals/${id}`);
  },
  trackReferral: (code: string) => {
    return GATEWAY_ENDPOINT.get(`/referrals/track/${code}`);
  },
};
