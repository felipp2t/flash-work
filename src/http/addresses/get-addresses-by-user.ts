import { AddressResponse } from "@/@types/address/address-response";
import { env } from "@/env";
import axios from "axios";

interface GetAddressesByUserResponse {
  addresses: AddressResponse;
}

export const getAddressesByUser =
  async (): Promise<GetAddressesByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: addresses }: { data: AddressResponse } = await axios.get(
      `${env.BACKEND_ENDPOINT}/address`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { addresses };
  };
