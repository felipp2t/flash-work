import { Client } from "@stomp/stompjs";

interface SendMessageRequest {
  text: string;
  stompClient: Client;
  chatId: string;
  userId: string;
}

export const sendMessage = ({
  text,
  stompClient,
  chatId,
  userId,
}: SendMessageRequest) => {
  if (stompClient && text.trim() !== "" && chatId) {
    const messageRequest = {
      chatId: chatId,
      userId: userId,
      content: text,
    };

    if (!stompClient || !stompClient.connected) {
      console.error("STOMP client is not connected");
      return;
    }

    stompClient.publish({
      destination: `/app/sendMessage`,
      body: JSON.stringify(messageRequest),
    });
  }
};
