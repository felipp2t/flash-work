import { api } from "@/lib/api";

interface GetChatByUserRequest {
  chatId: string;
}

interface GetChatByUserResponse {}

export const getChatByUser = async ({
  chatId,
}: GetChatByUserRequest): Promise<GetChatByUserResponse> => {
    const { data } = await api.get(`/chats/${chatId}`);

    console.log(data)

};
