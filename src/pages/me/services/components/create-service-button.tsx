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
import { getServicesByUser } from "@/http/services/get-services-by-user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { CreateServiceForm } from "./create-service-form";

export const CreateServiceButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { data: serviceResponse } = useQuery({
    queryKey: ["get-services-by-user"],
    queryFn: async () => await getServicesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const { data: addressResponse } = useQuery({
    queryKey: ["get-address-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const handleVerifyServiceQuantity = () => {
    if (serviceResponse!.services.totalElements >= 5) {
      toast.error("Você atingiu o limite de serviços cadastrados.");
      return false;
    }

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
