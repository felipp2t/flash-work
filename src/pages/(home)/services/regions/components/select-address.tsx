import { Address } from "@/@types/address/address";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";

interface SelectAddressProps {
  handleSelectAddress: (address: string) => void;
}

export const SelectAddress = ({ handleSelectAddress }: SelectAddressProps) => {
  const { data } = useQuery({
    queryKey: ["get-addresses-by-user"],
    queryFn: async () => await getAddressesByUser(),
  });

  if (!data) return;

  const uniqueAddresses: Address[] = Array.from(
    data.addresses.content.reduce((map, address) => {
      if (!map.has(address.city)) {
        map.set(address.city, address);
      }
      return map;
    }, new Map()),
  ).map(([, address]) => address);

  const defaultAddress = uniqueAddresses[0]?.city || "";

  return (
    <Select
      onValueChange={(address) => handleSelectAddress(address)}
      defaultValue={defaultAddress}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Endereços</SelectLabel>
          {uniqueAddresses.map((address) => {
            return (
              <SelectItem key={address.id} value={address.city}>
                {address.city}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
