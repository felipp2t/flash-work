import { Category } from "@/@types/categories/category";
import { env } from "@/env";
import axios from "axios";

interface CreateCategoryRequest {
  category: Category;
}

export const createCategory = async (params: CreateCategoryRequest) => {
  await axios.post(`${env.BACKEND_ENDPOINT}/categories`, {
    name: params.category.name,
    description: params.category.description,
    iconName: params.category.iconName,
  });
};
