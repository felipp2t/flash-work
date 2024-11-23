import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UpsertCategoryFormDialog } from "./upsert-category-form-dialog";

export const AddCategoryButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>Adicionar Categoria</Button>
      <UpsertCategoryFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};
