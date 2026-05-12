import { notifications_api } from "@/api_factory/modules/notifications";

export const useFetchNotifications = () => {
  const loading = ref(false);
  const notifications = ref([]);

  const fetchNotifications = async () => {
    loading.value = true;
    try {
      const res: any = await notifications_api.getNotifications();
      if (res.type !== "ERROR") {
        notifications.value = res.data;
      }
    } finally {
      loading.value = false;
    }
  };

  const markRead = async (id: string) => {
    try {
      const res: any = await notifications_api.markAsRead(id);
      if (res.type !== "ERROR") {
        const notif = notifications.value.find(n => n._id === id);
        if (notif) notif.isRead = true;
      }
    } catch (e) {}
  };

  const markAllRead = async () => {
    try {
      const res: any = await notifications_api.markAllAsRead();
      if (res.type !== "ERROR") {
        notifications.value.forEach(n => n.isRead = true);
      }
    } catch (e) {}
  };

  return { loading, notifications, fetchNotifications, markRead, markAllRead };
};
