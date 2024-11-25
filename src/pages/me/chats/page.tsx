import { Chat } from "@/@types/chat";
import { Message } from "@/@types/message";
import { User } from "@/@types/user/user";
import { Input } from "@/components/ui/input";
import { getUserByToken } from "@/http/user/get-user-by-token";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserChat } from "./components/user-chat";
import { UserChatHeader } from "./components/user-chat-header";
import { UserList } from "./components/user-list";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { sendMessage } from "@/http/chat/send-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@stomp/stompjs";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string({ required_error: "Digite algo para enviar" }).trim().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChatsPage() {
  const [, setSearchParams] = useSearchParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [currentUser, setCurrentUser] = useState<User>();
  const [chatSelected, setChatSelected] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);

  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    if (data) {
      setCurrentUser(data.user);
    }
  }, [data, setCurrentUser]);

  useEffect(() => {
    if (chatSelected?.chatId) {
      setSearchParams((params) => {
        params.set("chatId", chatSelected?.chatId);
        return params;
      });
    }
  }, [chatSelected, setSearchParams]);

  const onSubmit = async (dataForm: FormSchema) => {
    if (!chatSelected || !stompClient || !data?.user.id) {
      return;
    }

    sendMessage({
      chatId: chatSelected.chatId,
      text: dataForm.text,
      stompClient,
      userId: data?.user.id,
    });

    form.reset();
  };

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
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-[url('/bg-chat.png')]">
          <UserChatHeader userId={chatSelected.users[0].id} />

          <UserChat
            setMessages={setMessages}
            messages={messages}
            chatSelected={chatSelected}
            currentUser={currentUser}
            setStompClient={setStompClient}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full gap-4 bg-white/5 p-4"
            >
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Input {...field} id="text" className="w-full" />
                  </FormItem>
                )}
              />

              <Button type="submit">
                <Send className="mr-2 size-4" />
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
