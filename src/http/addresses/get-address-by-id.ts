import { Address } from "@/@types/address/address";
import { api } from "@/lib/api";

interface GetAddressByIdRequest {
  addressId: string;
}

interface GetAddressByIdResponse {
  address: Address;
}

export const getAddressById = async ({
  addressId,
}: GetAddressByIdRequest): Promise<GetAddressByIdResponse> => {
  const { data: address }: { data: Address } = await api.get(
    `/address/${addressId}`,
  );

  return { address };
};
