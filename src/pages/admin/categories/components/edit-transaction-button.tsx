import { Category } from "@/@types/categories/category";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UpsertCategoryFormDialog } from "./upsert-category-form-dialog";

interface EditCategoryButtonProps {
  category: Category;
}

export const EditCategoryButton = ({ category }: EditCategoryButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        variant="outline"
        size="icon"
      >
        <Pencil className="size-4" />
      </Button>
      <UpsertCategoryFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          name: category.name,
          icon: category.iconName,
          description: category.description,
        }}
        categoryId={category.id}
      />
    </>
  );
};
