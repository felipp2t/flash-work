import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatByUser } from "@/http/chat/get-chat-by-user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const UserChat = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { data } = useQuery({
    queryKey: ["get-chat-by-user"],
    queryFn: async () => {
      if (chatId) {
        return await getChatByUser({ chatId });
      }
    },
    staleTime: 1000 * 60 * 15,
  });

  return (
    <ScrollArea className="h-full max-h-[709px] px-6">
      {/* {filteredMessages.map((message) => {
        const isCurrentUser = message.senderId === currentUser.id;
        return (
          <div
            key={message.id}
            className={`mb-4 flex items-end ${isCurrentUser ? "justify-end" : ""}`}
          >
            {!isCurrentUser && (
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs ${isCurrentUser ? "bg-blue-600 text-white" : "bg-white/5"} rounded-lg p-3 shadow`}
            >
              <p>{message.content}</p>
              <p
                className={`mt-1 text-xs ${isCurrentUser ? "text-blue-100" : "text-muted-foreground"}`}
              >
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })} */}
    </ScrollArea>
  );
};
