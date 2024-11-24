import { Pagination } from "@/components/pagination";
import { NotificationSkeleton } from "@/components/skeletons/notification-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getNotifications } from "@/http/notifications/get-notification";
import { useQuery } from "@tanstack/react-query";
import { Bell, RefreshCw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { NotificationCard } from "./notification-card";

export const NotificationList = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-notifications"],
    queryFn: async () => await getNotifications({ page, perPage }),
    staleTime: 1000 * 60 * 15,
  });

  console.log(data);

  return (
    <>
      {!data ? (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      ) : data.notifications.empty ? (
        <>
          <Card className="bg-white/5">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Bell className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
                Nenhuma notificação
              </h2>
              <p className="mb-6 max-w-sm text-center text-muted-foreground">
                Você não tem nenhuma notificação no momento. As novas
                notificações aparecerão aqui quando chegarem.
              </p>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="size-4" />
                Atualizar
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex h-full flex-col gap-4">
          {data.notifications.content.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}

          <Pagination
            items={data.notifications.totalElements}
            page={page}
            pages={data.notifications.totalPages}
          />
        </div>
      )}
    </>
  );
};
