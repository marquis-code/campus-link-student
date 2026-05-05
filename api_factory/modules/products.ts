import { GATEWAY_ENDPOINT } from "../axios.config";

export const products_api = {
  getProducts: (params: any = {}) => {
    return GATEWAY_ENDPOINT.get("/products", { params });
  },
  getProduct: (id: string) => {
    return GATEWAY_ENDPOINT.get(`/products/${id}`);
  },
  getCategories: () => {
    return GATEWAY_ENDPOINT.get("/categories");
  },
  getCampuses: () => {
    return GATEWAY_ENDPOINT.get("/campuses");
  },
};
