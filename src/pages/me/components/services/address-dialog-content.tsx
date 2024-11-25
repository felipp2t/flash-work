import { Address } from "@/@types/address/address";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ADDRESS_TYPE } from "@/constants/address";
import { cn } from "@/lib/utils";
import { Building2, Home } from "lucide-react";

interface AddressDialogContentProps {
  addresses: Address[];
  addressId: string;
  selectAddress: (addressId: string) => void;
}

export const AddressDialogContent = ({
  addresses,
  addressId,
  selectAddress
}: AddressDialogContentProps) => {
  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Selecione um Endereço</DialogTitle>
        <DialogDescription>
          Selecione um endereço para alterar a localização
        </DialogDescription>
      </DialogHeader>
      {addresses.map((address) => (
        <Card
          className={cn(
            "w-full cursor-pointer bg-white/5 hover:bg-white/10 hover:transition-all",
            address.id === addressId && "border-primary",
          )}
          onClick={() => selectAddress(address.id)}
        >
          <CardContent className="flex h-full items-center gap-4 p-6">
            <div className="flex min-w-14 flex-col items-center">
              <p className="text-primary">
                {address.type === "HOUSE" ? (
                  <Home className="size-5" />
                ) : (
                  <Building2 className="size-5" />
                )}
              </p>
              <p className="capitalize">{ADDRESS_TYPE[address.type]}</p>
            </div>

            <Separator orientation="vertical" className="" />

            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <span>
                  {address.street}, {address.houseNumber},{" "}
                  {address.type === "APARTMENT" &&
                    address.apartmentNumber &&
                    `Apto ${address.apartmentNumber},`}{" "}
                  {address.neighborhood}, {address.city} - {address.state}, CEP:{" "}
                  {address.postalCode}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </DialogContent>
  );
};
