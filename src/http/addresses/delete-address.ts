import { api } from "@/lib/api";

interface DeleteAddressRequest {
  addressId: string;
}

export const deleteAddress = async ({ addressId }: DeleteAddressRequest) => {
  const token = localStorage.getItem("token");
  await api.delete(`/address/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
