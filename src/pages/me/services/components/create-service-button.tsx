import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { CreateServiceForm } from "./create-service-form";

export const CreateServiceButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { data: addressResponse } = useQuery({
    queryKey: ["get-addresses-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const handleVerifyServiceQuantity = () => {
    if (addressResponse!.addresses.totalElements === 0) {
      toast.error(
        <div>
          Você não pode lançar um serviço sem um endereço cadastrado. Clique{" "}
          <a href="/me/addresses" className="text-blue-500 underline">
            aqui
          </a>{" "}
          para cadastrar um novo endereço.
        </div>,
        {
          duration: 10000,
        },
      );
      return false;
    }
    return true;
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        if (open && !handleVerifyServiceQuantity()) return;
        setDialogIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>Lançar serviço</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Crie seu serviço aqui!</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para lançar um novo serviço.
          </DialogDescription>
        </DialogHeader>
        <CreateServiceForm />
      </DialogContent>
    </Dialog>
  );
};
