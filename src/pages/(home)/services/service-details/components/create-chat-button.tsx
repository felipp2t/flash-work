import { Button } from "@/components/ui/button";
import { createChat } from "@/http/chat/create-chat";
import { useMutation } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CreateChatButtonProps {
  userId: string;
}

export const CreateChatButton = ({ userId }: CreateChatButtonProps) => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationKey: ["create-chat", userId],
    mutationFn: async ({ userId }: { userId: string }) =>
      await createChat({ userId }),
  });

  const handleCreateChat = async (userId: string) => {
    try {
      await mutateAsync({ userId });
      toast.success("Chat criado com sucesso", {
        duration: 5000,
      });
      navigate("/me/chats");
    } catch {
      toast.error("Erro ao criar chat", {
        duration: 5000,
        description: "Tente novamente mais tarde",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="flex-1"
      onClick={() => handleCreateChat(userId)}
    >
      <MessageSquare className="mr-2 size-4" />
      Chat com o cliente
    </Button>
  );
};
