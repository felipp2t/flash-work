import { Chat } from "@/@types/chat";
import { Message } from "@/@types/message";
import { User } from "@/@types/user/user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatByUser } from "@/http/chat/get-chat-by-user";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dispatch, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface UserChatProps {
  setMessages: Dispatch<React.SetStateAction<Message[]>>;
  setStompClient: Dispatch<React.SetStateAction<Client | null>>;
  currentUser: User | undefined;
  chatSelected: Chat | undefined;
  messages: Message[];
}

export const UserChat = ({
  setMessages,
  currentUser,
  chatSelected,
  setStompClient,
  messages,
}: UserChatProps) => {
  const chatId = chatSelected?.chatId;
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const { data } = useQuery({
    queryKey: ["get-chat-by-user", chatId],
    queryFn: async () => {
      if (chatId) {
        return await getChatByUser({ chatId });
      }
    },
    staleTime: 1000 * 60 * 15,
    enabled: !!chatId,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.chat && data.chat.chatId === chatId) {
      setMessages(data.chat.messages);
      setLocalMessages(data.chat.messages);
    }
  }, [data, chatId, setMessages]);

  useEffect(() => {
    let stompClient: Client | null = null;

    const connectToWebSocket = () => {
      if (!chatId) return;

      stompClient = new Client({
        webSocketFactory: () => new SockJS("http://localhost:80/ws"),
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient?.subscribe(
            `/topic/messages/${chatId}`,
            (messageOutput) => {
              const newMessage = JSON.parse(messageOutput.body);

              setMessages((prevMessages) => {
                const exists = prevMessages.some(
                  (msg) => msg.id === newMessage.id,
                );
                return exists ? prevMessages : [...prevMessages, newMessage];
              });

              setLocalMessages((prevMessages) => {
                const exists = prevMessages.some(
                  (msg) => msg.id === newMessage.id,
                );
                return exists ? prevMessages : [...prevMessages, newMessage];
              });
            },
          );
        },
        onStompError: (frame) => {
          console.error("STOMP error", frame);
        },
      });

      stompClient.activate();
      setStompClient(stompClient);
    };

    connectToWebSocket();

    return () => {
      stompClient?.deactivate();
    };
  }, [chatId, setMessages, setStompClient]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    if (chatSelected?.chatId) {
      const fetchMessages = async () => {
        try {
          const response = await getChatByUser({
            chatId: chatSelected.chatId,
          });
          if (response.chat) {
            setMessages(response.chat.messages);
            setLocalMessages(response.chat.messages);
          }
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [chatSelected, setMessages]);

  return (
    <ScrollArea className="h-full max-h-[709px] px-6 py-4">
      {localMessages.map((message) => {
        const isCurrentUser = message.userId === currentUser?.id;
        return (
          <div
            key={message.id}
            className={`mb-4 flex items-start ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 shadow ${
                isCurrentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`mt-1 text-xs ${
                  isCurrentUser ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.sentAt
                  ? format(new Date(message.sentAt), "HH:mm")
                  : "Agora mesmo"}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};
