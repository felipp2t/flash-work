import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/http/categories/get-categories";
import { useQuery } from "@tanstack/react-query";
import { Package, Trash2 } from "lucide-react";
import { EditCategoryButton } from "./edit-transaction-button";

export const AdminCategoriesTable = () => {
  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
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
          const Icon = category.iconName || Package;
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
                  <Button variant="outline" size="icon">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
