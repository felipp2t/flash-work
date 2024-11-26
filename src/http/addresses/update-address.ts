import { api } from "@/lib/api";

interface UpdateAddressRequest {
  addressId: string;
  address: {
    type: string;
    houseNumber: number;
    apartmentName: string | null;
    apartmentNumber: number | null;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export const updateAddress = async ({
  address,
  addressId,
}: UpdateAddressRequest) => {
  const token = localStorage.getItem("token");
  await api.put(
    `/address/${addressId}`,
    {
      ...address,
      apartmentNumber: address.apartmentNumber || null,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
