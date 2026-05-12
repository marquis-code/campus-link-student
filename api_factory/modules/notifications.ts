import { GATEWAY_ENDPOINT_WITH_AUTH } from "../axios.config";

export const notifications_api = {
  getNotifications: () => GATEWAY_ENDPOINT_WITH_AUTH.get('/notifications'),
  markAsRead: (id: string) => GATEWAY_ENDPOINT_WITH_AUTH.patch(`/notifications/${id}/read`),
  markAllAsRead: () => GATEWAY_ENDPOINT_WITH_AUTH.patch('/notifications/read-all'),
};
