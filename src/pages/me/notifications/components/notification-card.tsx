import { Notification } from "@/@types/notification/notification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NOTIFICATION_TYPE } from "@/constants/notification";
import { deleteNotification } from "@/http/notifications/delete-notification";
import { viewNotification } from "@/http/notifications/view-notification";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { CheckCheckIcon, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteNotificationAsync } = useMutation({
    mutationKey: ["delete-notification", notification.id],
    mutationFn: async ({ notificationId }: { notificationId: string }) =>
      await deleteNotification({ notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });

  const { mutateAsync: viewNotificationMutate, isPending } = useMutation({
    mutationKey: ["view-notification", notification.id],
    mutationFn: async ({ notificationId }: { notificationId: string }) =>
      await viewNotification({ notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
  });

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotificationAsync({ notificationId });
      toast.success("Notificação deletada com sucesso", {
        duration: 5000,
      });
    } catch {
      toast.error("Erro ao deletar notificação", {
        duration: 5000,
      });
    }
  };

  const verifyIfNotificationIsViewed = (notification: Notification) => {
    if (notification.isViewed) return true;
    return false;
  };

  const handleViewNotifications = async (notificationId: string) => {
    try {
      if (verifyIfNotificationIsViewed(notification)) return;

      await viewNotificationMutate({ notificationId });
      toast.success("Notificação marcada como lida", {
        duration: 5000,
      });
    } catch {
      toast.error("Erro ao marcar notificação como lida", {
        duration: 5000,
      });
    }
  };

  return (
    <Card className="bg-white/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {NOTIFICATION_TYPE[notification.notificationType]}
        </CardTitle>
        <CardDescription className="text-xs">
          {formatDistanceToNow(notification.date, {
            addSuffix: true,
            locale: pt,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{notification.content}</p>
        <div className="mt-4 flex items-center justify-between">
          <div
            className={cn(
              "flex cursor-pointer items-center text-muted-foreground",
              notification.isViewed && "text-primary",
            )}
            onClick={() => handleViewNotifications(notification.id)}
          >
            <CheckCheckIcon className="mr-2 size-4" />
            <Label
              htmlFor={`read-${notification.id}`}
              className="block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : notification.isViewed ? (
                "Lida"
              ) : (
                "Marcar como lida"
              )}
            </Label>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteNotification(notification.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
