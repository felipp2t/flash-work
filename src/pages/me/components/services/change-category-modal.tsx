import { Category } from "@/@types/categories/category";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCategories } from "@/http/categories/get-categories";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./edit-service-modal";

type Value = FormSchema;

interface ChangeCategoryModalProps {
  field: ControllerRenderProps<Value, "categories">;
}

export const ChangeCategoryModal = ({ field }: ChangeCategoryModalProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await getCategories({ page: 1, size: 500 }),
  });

  if (!data) return;

  const categorySlides = data.categories.content.reduce(
    (acc, category, index) => {
      const slideIndex = Math.floor(index / 4);
      if (!acc[slideIndex]) {
        acc[slideIndex] = [];
      }
      acc[slideIndex].push(category);
      return acc;
    },
    [] as Category[][],
  );

  const verifyIfCategoryIsSelected = (categoryId: string) =>
    field.value.some((c) => c.id === categoryId);

  const verifyQuantityOfCategories = () => field.value.length < 3;

  const handleChangeCategory = (categoryId: string) => {
    if (verifyIfCategoryIsSelected(categoryId)) {
      const categoryFilter = field.value.filter((c) => c.id !== categoryId);
      field.onChange([...categoryFilter]);
    } else if (verifyQuantityOfCategories()) {
      const category = data.categories.content.find((c) => c.id === categoryId);

      if (category) field.onChange([...field.value, category]);
    }
  };

  return (
    <Dialog>
      <div className="grid grid-cols-2 gap-2">
        {field.value.map((category) => {
          const IconComponent = category.iconName;
          return (
            <div
              key={category.id}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-card px-2 text-sm font-medium capitalize text-muted-foreground"
            >
              <IconComponent />
              {category.name}
            </div>
          );
        })}
        <DialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className={cn("w-full", field.value.length === 0 && "col-span-2")}
          >
            Alterar
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="no-scrollbar max-h-screen w-full max-w-xl select-none overflow-y-auto">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Mude Suas Categorias Aqui</DialogTitle>
              <DialogDescription>
                Selecione as categorias que deseja adicionar ao seu serviço
                (max. 3)
              </DialogDescription>
              <main className="flex w-full items-center justify-center px-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {categorySlides?.map((slide, slideIndex) => (
                      <CarouselItem key={slideIndex}>
                        <div className="grid grid-cols-2 gap-4 p-2">
                          {slide.map((category) => {
                            const IconComponent = category.iconName;
                            const isSelected = field.value.some(
                              (c) => c.id === category.id,
                            );
                            return (
                              <Card
                                key={category.id}
                                className={cn(
                                  "flex cursor-pointer items-center transition-all",
                                  isSelected && "ring-2 ring-primary",
                                )}
                                onClick={() =>
                                  handleChangeCategory(category.id)
                                }
                              >
                                <CardContent className="flex w-full items-center justify-between p-4">
                                  <div className="flex items-center space-x-2">
                                    <IconComponent />
                                    <p className="capitalize">
                                      {category.name}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check className="size-5 text-primary" />
                                  )}
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </main>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
