import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { acceptProposal } from "@/http/proposals/delete-proposal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeletionAlertDialogProps {
  proposalId: string;
}

export const AcceptProposalAlertDialog = ({
  proposalId,
}: DeletionAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["accept-proposal", proposalId],
    mutationFn: async ({ proposalId }: { proposalId: string }) =>
      await acceptProposal({ proposalId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-proposals-by-user"] });
      toast.success("Proposta deletada com sucesso!");
    },
  });

  const handleDeleteProposal = async (proposalId: string) => {
    try {
      await mutateAsync({ proposalId });
    } catch {
      toast.error("Erro ao deletar proposta.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Aceitar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir esse serviço?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Isso deletará permanentemente os
            dados da sua proposta desse serviço.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteProposal(proposalId)}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
