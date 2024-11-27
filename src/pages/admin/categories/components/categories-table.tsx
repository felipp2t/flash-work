import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategory } from "@/http/categories/delete-category";
import { getCategories } from "@/http/categories/get-categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { EditCategoryButton } from "./edit-transaction-button";

export const AdminCategoriesTable = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-categories", page, perPage],
    queryFn: async () => await getCategories({ page, size: perPage }),
    staleTime: 1000 * 60 * 15,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategoryMutation } = useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async ({ categoryId }: { categoryId: string }) =>
      await deleteCategory({ categoryId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-categories"] }),
  });

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryMutation({ categoryId });
      toast.success("Categoria deletada com sucesso");
    } catch {
      toast.error("Erro ao deletar categoria");
    }
  };

  if (!data) return;

  const getIconComponent = (iconName: string) => {
    const icons = Icons as unknown as Record<string, React.ElementType>;
    return icons[iconName] || Icons.Package;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.categories.content.map((category) => {
            const Icon = getIconComponent(category.iconName);
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <Icon className="size-6" />
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {category.name}
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditCategoryButton category={category} />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination
        items={data.categories.totalElements}
        page={page}
        pages={data.categories.totalPages}
      />
    </>
  );
};
