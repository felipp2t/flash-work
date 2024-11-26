import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ADDRESS_TYPE, SHORT_DATE_ADDRESS } from "@/constants/address";
import { deleteAddress } from "@/http/addresses/delete-address";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building, HouseIcon, MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EditAddressButton } from "./edit-address-button";

export const AddressesTable = () => {
  const { data } = useQuery({
    queryKey: ["get-address-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deleteAddressMutate } = useMutation({
    mutationKey: ["delete-address"],
    mutationFn: async ({ addressId }: { addressId: string }) =>
      deleteAddress({ addressId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-address-by-user"] }),
  });

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressMutate({ addressId });
      toast.success("Endereço deletado com sucesso");
    } catch {
      toast.error("Erro ao deletar endereço");
    }
  };

  if (data && data.addresses.empty) {
    return (
      <Card className="bg-white/5">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <MapPin className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
            Nenhum endereço cadastrado
          </h2>
          <p className="mb-6 max-w-sm text-center text-muted-foreground">
            Você não tem nenhum endereço no momento. Mas você pode adicionar um
            clicando no botão "Adicionar Endereço"
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Número</TableHead>
          <TableHead>Edifício</TableHead>
          <TableHead>Número (apto.)</TableHead>
          <TableHead>Rua</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.addresses.content.map((address) => {
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
                <TableCell className="text-base">
                  {address.houseNumber}
                </TableCell>
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

                <TableCell className="text-base">
                  Rua. {address.street}
                </TableCell>
                <TableCell className="text-base">
                  {address.neighborhood}
                </TableCell>
                <TableCell className="text-base">{address.city}</TableCell>
                <TableCell className="text-base">
                  {SHORT_DATE_ADDRESS[address.state]}
                </TableCell>
                <TableCell className="text-base">
                  {address.postalCode}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditAddressButton address={address} />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="group"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
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
