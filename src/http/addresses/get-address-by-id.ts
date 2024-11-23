import { Address } from "@/@types/address";
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
  const token = localStorage.getItem("token");

  const { data: address }: { data: Address } = await api.get(
    `/address/${addressId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { address };
};
