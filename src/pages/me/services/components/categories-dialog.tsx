import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CATEGORIES, ICONS_CATEGORIES } from "@/constants/categories";
import { getCategories } from "@/http/categories/get-categories";
import { useQuery } from "@tanstack/react-query";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./create-service-form";

interface CategoriesDialogProps {
  field: ControllerRenderProps<FormSchema, "categories">;
}

export const CategoriesDialog = ({ field }: CategoriesDialogProps) => {
  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 15,
  });

  const verifyIfCategoryIsSelected = (categoryId: string) =>
    field.value.some((c) => c.id === categoryId);

  const verifyQuantityOfCategories = () => field.value.length < 3;

  const handleSelectCategory = (categoryId: string) => {
    if (verifyIfCategoryIsSelected(categoryId)) {
      const categoryFilter = field.value.filter((c) => c.id !== categoryId);
      field.onChange([...categoryFilter]);
    } else if (verifyQuantityOfCategories()) {
      const category = data?.categories.content.find(
        (c) => c.id === categoryId,
      );

      if (category) field.onChange([...field.value, category]);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
      {data &&
        data.categories.content.map((category) => {
          const IconComponent = ICONS_CATEGORIES[category.iconName];
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={
                      verifyIfCategoryIsSelected(category.id)
                        ? "secondary"
                        : "ghost"
                    }
                    key={category.id}
                    onClick={() => handleSelectCategory(category.id)}
                  >
                    <IconComponent />
                    {CATEGORIES[category.name as keyof typeof CATEGORIES]}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-96">
                  <p className="text-center capitalize">
                    {category.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
    </div>
  );
};
