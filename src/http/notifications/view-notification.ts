import { api } from "@/lib/api";

interface ViewNotificationRequest {
  notificationId: string;
}

export const viewNotification = async ({
  notificationId,
}: ViewNotificationRequest) => {
  await api.get(`/notifications/${notificationId}`);
};
