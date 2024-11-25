import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ADDRESS_TYPE, SHORT_DATE_ADDRESS } from "@/constants/address";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";
import { Building, HouseIcon, Pen, Trash2 } from "lucide-react";

export const AddressesTable = () => {
  const { data } = useQuery({
    queryKey: ["get-address-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Número</TableHead>
          <TableHead>Edifício</TableHead>
          <TableHead>Número (apt)</TableHead>
          <TableHead>Rua</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.addresses.content.map((address) => {
          return (
            <TableRow key={address.id}>
              <TableCell>
                {address.type === "HOUSE" ? (
                  <div className="flex w-fit items-center gap-4">
                    <HouseIcon className="size-6" />
                    <p className="text-base capitalize">
                      {ADDRESS_TYPE[address.type]}
                    </p>
                  </div>
                ) : (
                  <div className="flex w-fit items-center gap-4">
                    <Building className="size-6" />
                    <p className="text-base capitalize">
                      {ADDRESS_TYPE[address.type]}
                    </p>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-base">{address.houseNumber}</TableCell>
              <TableCell className="text-base">
                {address.apartmentName ? (
                  <span className="text-base">{address.apartmentName}</span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-base">
                {address.apartmentNumber ? (
                  <span className="text-base">{address.apartmentNumber}</span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>

              <TableCell className="text-base">Rua. {address.street}</TableCell>
              <TableCell className="text-base">
                {address.neighborhood}
              </TableCell>
              <TableCell className="text-base">{address.city}</TableCell>
              <TableCell className="text-base">
                {SHORT_DATE_ADDRESS[address.state]}
              </TableCell>
              <TableCell className="text-base">{address.postalCode}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="icon" className="group">
                    <Pen className="size-4 group-hover:text-primary" />
                  </Button>
                  <Button variant="secondary" size="icon" className="group">
                    <Trash2 className="size-4 group-hover:text-red-600" />
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
