import { Chat } from "@/@types/chat";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserChat } from "./components/user-chat";
import { UserChatHeader } from "./components/user-chat-header";
import { UserList } from "./components/user-list";

export function ChatsPage() {
  const [, setSearchParams] = useSearchParams();

  const [chatSelected, setChatSelected] = useState<Chat | undefined>();

  useEffect(() => {
    if (chatSelected?.chatId) {
      setSearchParams((params) => {
        params.set("userId", chatSelected?.chatId);
        return params;
      });
    }
  }, [chatSelected, setSearchParams]);

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
      <UserList setChatSelected={setChatSelected} />

      {!chatSelected && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border bg-white/5 text-muted-foreground">
          <MessageCircle className="size-12" />
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">
              Chat com um usuário para ver as mensagens
            </h2>
            <p className="text-sm">
              Selecione um dos usuário para começar uma conversa
            </p>
          </div>
        </div>
      )}

      {chatSelected && (
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-white/5">
          <UserChatHeader userId={chatSelected.users[0].id} />

          <UserChat  />
        </div>
      )}

      {/* <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-white/5">
       
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
