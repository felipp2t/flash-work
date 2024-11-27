import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UpsertEducation } from "./upsert-education";

export const AddEducationButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>Adicionar Endereço</Button>
      <UpsertEducation isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};
