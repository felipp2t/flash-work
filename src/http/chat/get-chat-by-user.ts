import { Chat } from "@/@types/chat";
import { api } from "@/lib/api";

interface GetChatByUserRequest {
  chatId: string;
}

interface GetChatByUserResponse {
  chat: Chat;
}

export const getChatByUser = async ({
  chatId,
}: GetChatByUserRequest): Promise<GetChatByUserResponse> => {

  const { data: chat }: { data: Chat } = await api.get(`/chats/${chatId}`);
  return { chat };
};
