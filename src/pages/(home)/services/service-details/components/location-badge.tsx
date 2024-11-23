import { getAddressById } from "@/http/addresses/get-address-by-id";
import { useQuery } from "@tanstack/react-query";

interface LocationBadgeProps {
  addressId: string;
}

export const LocationBadge = ({ addressId }: LocationBadgeProps) => {
  const { data } = useQuery({
    queryKey: ["get-address-by-id", addressId],
    queryFn: async () => await getAddressById({ addressId }),
  });

  if (!data) return;

  return (
    <>
      {data.address.city}, {data.address.state}
    </>
  );
};
