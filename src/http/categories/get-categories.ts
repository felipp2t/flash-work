import { CategoryResponse } from "@/@types/categories/category-response";
import { env } from "@/env";
import axios from "axios";

interface GetCategoriesRequets {
  page: number;
  size: number;
}

interface GetCategoriesResponse {
  categories: CategoryResponse;
}

export const getCategories = async ({
  page,
  size,
}: GetCategoriesRequets): Promise<GetCategoriesResponse> => {
  const params = {
    page: page - 1,
    size,
  };

  const { data: categories }: { data: CategoryResponse } = await axios.get(
    `${env.BACKEND_ENDPOINT}/categories`,
    { params },
  );

  return { categories };
};
