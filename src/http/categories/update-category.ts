import { Category } from "@/@types/categories/category";
import { api } from "@/lib/api";

interface UpdateCategoryRequest {
  category: Category;
}

export const updateCategory = async ({ category }: UpdateCategoryRequest) => {
  console.log(category);
  await api.put(`/categories/${category.id}`, {
    name: category.name,
    description: category.description,
    iconName: category.iconName,
  });
};
