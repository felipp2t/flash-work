import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UpsertAddress } from "./upsert-address";

export const AddAddressButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>Adicionar Endereço</Button>
      <UpsertAddress isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};
