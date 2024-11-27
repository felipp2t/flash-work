import { PageTitle } from "@/components/page-title";

import { getUserByToken } from "@/http/user/get-user-by-token";
import UnauthorizedPage from "@/pages/unauthorized";
import { useQuery } from "@tanstack/react-query";
import { UsersTable } from "./components/users-table";

export const AdminUsersPage = () => {
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
      <PageTitle title="Usuários" />

      <div className="flex h-full flex-col gap-6">
        <UsersTable />
      </div>
    </div>
  );
};
