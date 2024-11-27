import { Category } from "@/@types/categories/category";
import { api } from "@/lib/api";

interface CreateCategoryRequest {
  category: Category;
}

export const createCategory = async ({ category }: CreateCategoryRequest) => {
  await api.post("/categories", {
    name: category.name,
    description: category.description,
    iconName: category.iconName,
  });
};
