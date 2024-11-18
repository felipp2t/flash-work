import { getChatByUser } from "@/http/chat/get-chat-by-user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
};

type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
};

export function ChatsPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "2",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "",
      name: "Bob",
      status: "online",
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  const { data } = useQuery({
    queryKey: ["get-chats"],
    queryFn: async () => await getChatByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     const message: Message = {
  //       id: Date.now().toString(),
  //       senderId: currentUser.id,
  //       receiverId: selectedUser.id,
  //       content: newMessage,
  //       timestamp: new Date(),
  //     };
  //     setMessages([...messages, message]);
  //     setNewMessage("");

  //     setUsers(
  //       users.map((user) =>
  //         user.id === selectedUser.id
  //           ? { ...user, lastMessage: newMessage }
  //           : user,
  //       ),
  //     );
  //   }
  // };

  // const filteredMessages = messages.filter(
  //   (message) =>
  //     (message.senderId === currentUser.id &&
  //       message.receiverId === selectedUser.id) ||
  //     (message.senderId === selectedUser.id &&
  //       message.receiverId === currentUser.id),
  // );

  return (
    <div className="flex size-full max-h-screen max-w-full gap-6 overflow-x-auto overflow-y-hidden">
      {/* Sidebar para Usuários */}
      {/* <UserList users={data.chats} /> */}

      {/* Janela de Chat */}

      {/* <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-white/5">
        <div className="flex h-20 items-center border-b p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            <p
              className={`text-sm ${selectedUser.status === "online" ? "text-primary" : "text-muted-foreground"}`}
            >
              {selectedUser.status}
            </p>
          </div>
        </div>
        <ScrollArea className="h-full max-h-[709px] px-6">
          {filteredMessages.map((message) => {
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
                    <AvatarFallback>
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
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
          })}
        </ScrollArea>
        <div className="flex border-t bg-white/5 p-4">
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="mr-2 flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="mr-2 h-4 w-4" />
            Enviar
          </Button>
        </div>
      </div> */}
    </div>
  );
}
