import { Client } from "@stomp/stompjs";

interface SendNotificationRequest {
  content: string;
  receiverId: string;
  senderId: string;
  stompClient: Client;
  chatId: string;
}

export const sendNotification = ({
  content,
  receiverId,
  senderId,
  stompClient,
  chatId,
}: SendNotificationRequest) => {
  if (stompClient && content.trim() !== "" && chatId) {
    const notificationRequest = {
      chatId: chatId,
      sender: senderId,
      receiver: receiverId,
      content,
    };

    if (!stompClient || !stompClient.connected) {
      console.error("STOMP client is not connected");
      return;
    }

    stompClient.publish({
      destination: `/app/sendNotification`,
      body: JSON.stringify(notificationRequest),
    });
  }
};
