import { Pagination } from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROLE_USER } from "@/constants/role";
import { getAllUsers } from "@/http/user/get-all-users";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

export const UsersTable = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-all-users", page, perPage],
    queryFn: async () => await getAllUsers({ page, size: perPage }),
  });

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Foto</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Tipo de Usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.content.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar className="rounded-lg">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{format(user.birthDate, "dd'/'MM'/'yyyy")}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{ROLE_USER[user.role]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        items={data.users.totalElements}
        page={page}
        pages={data.users.totalPages}
      />
    </>
  );
};
