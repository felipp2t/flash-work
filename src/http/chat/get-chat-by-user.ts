import { Chat } from "@/@types/chat";
import { env } from "@/env";
import axios from "axios";

interface GetChatByUserResonse {
  chats: Chat[];
}

export const getChatByUser = async (): Promise<GetChatByUserResonse> => {
  const token = localStorage.getItem("token");
  const { data: chats }: { data: Chat[] } = await axios.get(
    `${env.BACKEND_ENDPOINT}/chats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { chats };
};
