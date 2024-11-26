import { Category } from "@/@types/categories/category";
import { env } from "@/env";
import axios from "axios";

interface UpdateCategoryRequest {
  category: Category;
}

export const updateCategory = async ({ category }: UpdateCategoryRequest) => {
  await axios.post(`${env.BACKEND_ENDPOINT}/categories/${category.id}`, {
    name: category.name,
    description: category.description,
    iconName: category.iconName,
  });
};
