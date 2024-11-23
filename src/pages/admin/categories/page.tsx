import { PageTitle } from "@/components/page-title";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { getUserByToken } from "@/http/user/get-user-by-token";
import UnauthorizedPage from "@/pages/unauthorized";
import { useQuery } from "@tanstack/react-query";

import { AddCategoryButton } from "./components/add-category-button";
import { AdminCategoriesTable } from "./components/categories-table";

export const AdminCategoryPage = () => {
  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getUserByToken(),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.user.role === "CUSTOMER") {
    return <UnauthorizedPage />;
  }

  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Categorias" />

        <AddCategoryButton />
      </div>

      <div className="container mx-auto">
        <h1 className="mb-5 text-2xl font-bold">Categorias de Serviços</h1>
        <AdminCategoriesTable />

        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this category?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
