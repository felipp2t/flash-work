import { Chat } from "@/@types/chat";
import { api } from "@/lib/api";

interface GetChatUsersByUserResonse {
  chats: Chat[];
}

export const getChatUsersByUser = async (): Promise<GetChatUsersByUserResonse> => {
  const token = localStorage.getItem("token");
  const { data: chats }: { data: Chat[] } = await api.get(`/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { chats };
};
