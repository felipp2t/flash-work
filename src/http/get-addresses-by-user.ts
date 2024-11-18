import { Address } from "@/@types/address";
import { env } from "@/env";
import axios from "axios";

interface GetAddressesByUserResponse {
  addresses: Address[];
}

export const getAddressesByUser =
  async (): Promise<GetAddressesByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: addresses }: { data: Address[] } = await axios.get(
      `${env.BACKEND_ENDPOINT}/address`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { addresses };
  };
