import { PageTitle } from "@/components/page-title";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants/categories";
import { getCategories } from "@/http/categories/get-categories";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Category } from "./components/services/category";

export const ServicesPage = () => {
  const [categoryId, setCategoryId] = useState("");
  const [, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  const handleSelectCategory = (category: string) => {
    const categoryId = data.categories.content.find(
      (c) => c.name === category,
    )?.id;

    if (categoryId) {
      setCategoryId(categoryId);
      setSearchParams({ category });
    }
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-16 p-4">
      <div className="flex w-full justify-between">
        <PageTitle title="Comece por aqui" />

        <Select onValueChange={(category) => handleSelectCategory(category)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {data.categories.content.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {CATEGORIES[category.name as keyof typeof CATEGORIES]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Category categoryId={categoryId} />
    </div>
  );
};
