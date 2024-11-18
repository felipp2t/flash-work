import { Chat } from "@/@types/chat";
import { User } from "@/@types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface UserListProps {
  chats: Chat[];
  selectedUser: User;
  setSelectedUser: (user: User) => void;
}

export const UserList = ({
  selectedUser,
  setSelectedUser,
  chats,
}: UserListProps) => {
  return (
    <div className="flex h-full w-1/4 flex-col rounded-lg border bg-white/5">
      <div className="flex h-20 items-center border-b border-border p-4">
        <h2 className="text-xl font-semibold">Conversas</h2>
      </div>

      <ScrollArea className="h-full max-h-[782px]">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className={cn(
              "flex cursor-pointer items-center p-4 hover:bg-white/10",
              selectedUser.id === chat.users && "bg-white/10",
            )}
            onClick={() => setSelectedUser(user)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1 overflow-hidden">
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
