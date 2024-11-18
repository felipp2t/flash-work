import { ServiceResponse } from "@/@types/service/service-response";
import { env } from "@/env";
import axios from "axios";

interface GetServiceByUserLocationResponse {
  services: ServiceResponse[];
}

export const getServiceByUserLocation =
  async (): Promise<GetServiceByUserLocationResponse> => {
    const token = localStorage.getItem("token");

    const { data: services }: { data: ServiceResponse[] } = await axios.get(
      `${env.BACKEND_ENDPOINT}/services/location`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { services };
  };
