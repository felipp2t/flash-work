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
import { cancelProposal } from "@/http/proposals/cancel-proposal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CancelProposalAlertProps {
  proposalId: string;
}

export const CancelProposalAlert = ({
  proposalId,
}: CancelProposalAlertProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: cancelProposalMutate } = useMutation({
    mutationKey: ["cancel-proposal", proposalId],
    mutationFn: async (proposalId: string) =>
      await cancelProposal({ proposalId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-proposals-by-user"] }),
  });

  const handleAcceptProposal = async (proposalId: string) => {
    try {
      await cancelProposalMutate(proposalId);
      toast.success("Proposta deletada com sucesso!");
    } catch {
      toast.error("Erro ao deletar proposta.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Cancelar Proposta</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja cancelar essa proposta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Isso fará com que os envolvidos
            não possam mais visualizar ou interagir com essa proposta.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAcceptProposal(proposalId)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
