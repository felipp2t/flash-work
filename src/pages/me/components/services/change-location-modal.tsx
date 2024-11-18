import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ADDRESS_TYPE } from "@/constants/address";
import { getAddressesByUser } from "@/http/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";
import { Building2, House, MapPinned } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { FormSchema } from "./edit-service-modal";

type Value = FormSchema;

interface ChangeLocationModalProps {
  field: ControllerRenderProps<Value, "location">;
}

export const ChangeLocationModal = ({ field }: ChangeLocationModalProps) => {
  const { data } = useQuery({
    queryKey: ["get-user-by-token"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  return (
    <Dialog>
      <div className="flex gap-2">
        <FormControl>
          <Input {...field} value={field.value} id="location" readOnly />
        </FormControl>
        <DialogTrigger asChild>
          <Button className="aspect-square p-0">
            <MapPinned className="size-5" />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione um Endereço</DialogTitle>
          <DialogDescription>
            Selecione um endereço para alterar a localização
          </DialogDescription>
        </DialogHeader>
        {data.addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="flex h-full items-center gap-6 px-6 py-3">
              {address.type === "HOUSE" ? <House /> : <Building2 />}
              <div className="flex flex-1 flex-col">
                <p className="text-xl font-bold uppercase text-primary">
                  {ADDRESS_TYPE[address.type]}
                </p>
                <div>
                  {address.state}, {address.neighborhood} - {address.street},{" "}
                  {address.houseNumber || address.apartmentNumber},{" "}
                  {address.postalCode}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
};
