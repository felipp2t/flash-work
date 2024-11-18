import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  chatId: string;
  createdAt: Date;
  users: User[];
  messages: Message[];
}
