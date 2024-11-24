import { NOTIFICATION_TYPE } from "@/constants/notification";
import { getNotifications } from "@/http/notifications/get-notification";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NotificationDropdown = () => {
  const navigate = useNavigate();
  const [dropdownMenuIsOpen, setDropdownMenuIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-notifications"],
    queryFn: async () => await getNotifications({ page, perPage }),
  });

  return (
    <div className="relative">
      <DropdownMenu
        open={dropdownMenuIsOpen}
        onOpenChange={(open) => setDropdownMenuIsOpen(open)}
      >
        {data &&
          data.notifications.content.some(
            (notification) => !notification.isViewed,
          ) && (
            <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary" />
          )}
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="aspect-square p-0">
            <Bell className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {data ? (
              data.notifications.content.slice(0, 3).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start"
                >
                  <div className="font-medium">
                    {NOTIFICATION_TYPE[notification.notificationType]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {notification.content}
                  </div>
                  <div className="mt-1 flex w-full items-center justify-between text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.date, {
                      addSuffix: true,
                      locale: pt,
                    })}
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem>Nenhuma notificação</DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-center"
            onClick={() => navigate("/me/notifications")}
          >
            Ver todas as notificações
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
