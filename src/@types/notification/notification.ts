import { UserMin } from "../user-min";
import { NotificationType } from "./notification-type";

export interface Notification {
  id: string;
  content: string;
  sender: UserMin;
  isViewed: boolean;
  date: Date;
  notificationType: NotificationType;
}
