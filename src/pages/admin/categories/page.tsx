import { PageTitle } from "@/components/page-title";

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

      <div className="flex h-full flex-col gap-6">
        <AdminCategoriesTable />
      </div>
    </div>
  );
};
