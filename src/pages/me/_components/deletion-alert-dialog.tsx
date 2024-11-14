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
} from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { deleteService } from "@/_http/services/delete-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeletionAlertDialogProps {
  serviceId: string;
}

export const DeletionAlertDialog = ({
  serviceId,
}: DeletionAlertDialogProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteServiceMutation } = useMutation({
    mutationKey: ["delete-service", serviceId],
    mutationFn: async ({ serviceId }: { serviceId: string }) =>
      await deleteService({ serviceId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-services-by-user"] }),
  });

  const handleServiceDeletion = async (serviceId: string) => {
    try {
      await deleteServiceMutation({ serviceId });
      toast.success("Serviço deletado com sucesso", {
        description:
          "Seu serviço foi deletado com sucesso. Verifique na tela de serviços.",
        duration: 1000 * 5,
      });
    } catch {
      toast.error("Algo deu errado", { duration: 1000 * 5 });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-1/2">
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir esse serviço?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Isso deletará permanentemente o
            serviço dos dados do nosso serviço.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="w-24">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="w-24 bg-destructive text-card-foreground hover:bg-destructive/80"
            onClick={() => handleServiceDeletion(serviceId)}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
