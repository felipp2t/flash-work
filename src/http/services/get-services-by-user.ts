import { ServiceResponse } from "@/@types/service/service-response";
import { env } from "@/env";
import axios from "axios";

interface GetServicesByUserResponse {
  services: ServiceResponse[];
}

export const getServicesByUser =
  async (): Promise<GetServicesByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: services }: { data: ServiceResponse[] } = await axios.get(
      `${env.BACKEND_ENDPOINT}/services/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { services };
  };
