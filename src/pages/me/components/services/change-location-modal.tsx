import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";
import { MapPinned } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { AddressDialogContent } from "./address-dialog-content";
import { FormSchema } from "./edit-service-modal";

interface ChangeLocationModalProps {
  field: ControllerRenderProps<FormSchema, "address">;
}

export const ChangeLocationModal = ({ field }: ChangeLocationModalProps) => {
  const { data } = useQuery({
    queryKey: ["get-addresses-by-user"],
    queryFn: async () => await getAddressesByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (!data) return;

  const selectAddress = (addressId: string) => {
    field.onChange(data.addresses.content.find((a) => a.id === addressId));
  };

  return (
    <Dialog>
      <div className="flex items-center gap-2">
        <FormControl>
          <Input
            {...field}
            value={`${field.value.city}, ${field.value.state}`}
            id="location"
            readOnly
          />
        </FormControl>
        <DialogTrigger asChild>
          <Button className="aspect-square p-0">
            <MapPinned className="size-5" />
          </Button>
        </DialogTrigger>
      </div>

      <AddressDialogContent
        addresses={data.addresses.content}
        addressId={field.value.id}
        selectAddress={selectAddress}
      />
    </Dialog>
  );
};
