import { api } from "@/lib/api";

interface DeleteCategoryRequest {
  categoryId: string;
}

export const deleteCategory = async ({ categoryId }: DeleteCategoryRequest) =>
  await api.delete(`/categories/${categoryId}`);
