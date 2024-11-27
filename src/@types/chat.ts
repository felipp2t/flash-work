import { Message } from "./message";
import { UserMin } from "./user/user-min";

export interface Chat {
  chatId: string;
  createdAt: Date;
  users: UserMin[];
  messages: Message[];
}
