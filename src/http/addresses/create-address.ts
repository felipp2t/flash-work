import { api } from "@/lib/api";

interface CreateAddressRequest {
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

export const createAddress = async (params: CreateAddressRequest) => {
  const token = localStorage.getItem("token");

  await api.post(
    `/address`,
    {
      ...params.address,
      apartmentNumber: params.address.apartmentNumber || null,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
