import { Chat } from "@/@types/chat";
import { env } from "@/env";
import axios from "axios";

interface CreateChatRequest {
  userId: string;
}

interface CreateChatResponse {
  chat: Chat;
}

export const createChat = async (
  params: CreateChatRequest,
): Promise<CreateChatResponse> => {
  const token = localStorage.getItem("token");

  const { data: chat }: { data: Chat } = await axios.post(
    `${env.BACKEND_ENDPOINT}/chats`,
    params,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { chat };
};
