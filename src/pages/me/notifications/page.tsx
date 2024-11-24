import { PageTitle } from "@/components/page-title";
import { NotificationList } from "./components/notification-list";

export const NotificationsPage = () => {
  return (
    <div className="mx-auto flex size-full max-w-4xl flex-1 flex-col gap-16 p-4">
      <PageTitle title="Suas Notificações" />
      <NotificationList />
    </div>
  );
};
