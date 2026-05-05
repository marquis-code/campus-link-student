import { GATEWAY_ENDPOINT } from "../axios.config";

export const orders_api = {
  createOrder: (payload: {
    productId: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    referralCode?: string;
    quantity?: number;
    notes?: string;
  }) => {
    return GATEWAY_ENDPOINT.post("/orders", payload);
  },
  getOrder: (id: string) => {
    return GATEWAY_ENDPOINT.get(`/orders/${id}`);
  }
};
