import { Address } from "@/@types/address/address";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { useState } from "react";
import { UpsertAddress } from "./upsert-address";

interface EditAddressButtonProps {
  address: Address;
}

export const EditAddressButton = ({ address }: EditAddressButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" size="icon" className="group" onClick={() => setDialogIsOpen(true)}>
        <Pen className="size-4 group-hover:text-primary" />
      </Button>

      <UpsertAddress
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        addressId={address.id}
        defaultValues={address}
      />
    </>
  );
};
