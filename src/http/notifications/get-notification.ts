import { NotificationResponse } from "@/@types/notification/notification-response";
import { api } from "@/lib/api";

interface GetNotificationRequest {
  page: number;
  perPage: number;
}

interface GetNotificationResponse {
  notifications: NotificationResponse;
}

export const getNotifications = async ({
  page,
  perPage,
}: GetNotificationRequest): Promise<GetNotificationResponse> => {
  const token = localStorage.getItem("token");

  const params = {
    page: page - 1,
    perPage,
  };

  const { data: notifications }: { data: NotificationResponse } = await api.get(
    "/notifications",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { notifications };
};
