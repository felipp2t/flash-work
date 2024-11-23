import { Chat } from "@/@types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatUsersByUser } from "@/http/chat/get-chat-users-by-user";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { UserAvatar } from "./user-avatar";

interface UserListProps {
  setChatSelected: (chat: Chat) => void;
}

export const UserList = ({ setChatSelected }: UserListProps) => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["get-chat-users-by-user"],
    queryFn: async () => await getChatUsersByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
    <div className="flex h-full w-1/4 flex-col rounded-lg border bg-white/5">
      <div className="flex h-20 items-center border-b border-border p-4">
        <h2 className="text-xl font-semibold">Conversas</h2>
      </div>

      <ScrollArea className="h-full max-h-[782px]">
        {data.chats.map((chat, i) => (
          <div
            key={chat.chatId}
            className={cn(
              "flex cursor-pointer items-center p-4 hover:bg-white/10",
              id && id === chat.users[i].id && "bg-white/10",
            )}
            onClick={() => setChatSelected(chat)}
          >
            <UserAvatar userId={chat.users[0].id} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
