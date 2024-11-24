import { api } from "@/lib/api";

interface DeleteNotificationRequest {
  notificationId: string;
}

export const deleteNotification = async ({
  notificationId,
}: DeleteNotificationRequest) => {
  await api.delete(`/notifications/${notificationId}`);
};
