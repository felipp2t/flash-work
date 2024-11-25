import { CategoryResponse } from "@/@types/categories/category-response";
import { env } from "@/env";
import axios from "axios";

interface GetCategoriesResponse {
  categories: CategoryResponse;
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const { data: categories }: { data: CategoryResponse } = await axios.get(
    `${env.BACKEND_ENDPOINT}/categories`,
  );

  return { categories };
};
