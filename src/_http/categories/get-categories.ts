import { Category } from "@/@types/category";
import { env } from "@/env";
import axios from "axios";

interface GetCategoriesResponse {
  categories: Category[];
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const { data: categories }: { data: Category[] } = await axios.get(
    `${env.BACKEND_ENDPOINT}/categories`,
  );

  return { categories };
};
