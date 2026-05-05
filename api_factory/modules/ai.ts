import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const ai_api = {
  generateCopy: (data: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post("/ai/generate-copy", data);
  },
};
