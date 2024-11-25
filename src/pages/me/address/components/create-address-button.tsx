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
import { CreateAddressForm } from "./create-address-form";

export const CreateAddressButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["get-address-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  const handleVerifyAddressQuantity = () => {
    if (data.addresses.totalElements >= 3) {
      toast.info("Você já atingiu o limite de endereços cadastrados.");
      return false;
    }
    return true;
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open) => {
        if (open && !handleVerifyAddressQuantity()) return;
        setDialogIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>Cadastrar Novo Serviço</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Cadatre um novo endereço</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para cadastrar um novo endereço.
          </DialogDescription>
        </DialogHeader>
        <CreateAddressForm setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
