import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { getAddressesByUser } from "@/http/addresses/get-addresses-by-user";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Region } from "../../components/services/region";
import { SelectAddress } from "./components/select-address";

export const RegionsServicePage = () => {
  const [addressId, setAddressId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["get-addresses-by-user"],
    queryFn: async () => await getAddressesByUser(),
  });

  useEffect(() => {
    const address = searchParams.get("city");

    if (!address && data && data.addresses.content.length > 0) {
      const firstAddress = data.addresses.content[0];
      setAddressId(firstAddress.id);
      setSearchParams((params) => {
        params.set("city", firstAddress.city);
        return params;
      });
    }
  }, [data, searchParams, setSearchParams]);

  const handleSelectAddress = (address: string) => {
    const addressId = data?.addresses.content.find(
      (a) => a.city === address,
    )?.id;

    if (addressId) {
      setAddressId(addressId);
      setSearchParams((params) => {
        params.set("page", "1");
        return params;
      });
      setSearchParams((params) => {
        params.set("city", address);
        return params;
      });
    }
  };

  return (
    <div className="flex size-full flex-1 flex-col gap-16 p-4">
      <div className="flex w-full justify-between">
        <PageTitle title="Serviços - Região" />

        <SelectAddress handleSelectAddress={handleSelectAddress} />
      </div>

      {data && data.addresses.empty ? (
        <Card className="bg-white/5">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <MapPin className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-semibold text-muted-foreground">
              Nenhum endereço cadastrado
            </h2>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              Você não tem nenhum endereço no momento, por isso não é possível
              filtrar por região.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Region addressId={addressId} />
      )}
    </div>
  );
};
