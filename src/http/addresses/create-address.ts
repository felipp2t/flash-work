import { api } from "@/lib/api";

interface CreateAddressRequest {
  address: {
    type: string;
    houseNumber: string;
    apartmentName?: string;
    apartmentNumber?: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export const createAddress = async (params: CreateAddressRequest) => {
  const token = localStorage.getItem("token");

  await api.post(`/address`, params.address, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
