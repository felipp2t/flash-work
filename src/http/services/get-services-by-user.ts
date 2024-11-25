import { ServiceResponse } from "@/@types/service/service-response";
import { api } from "@/lib/api";

interface GetServicesByUserResponse {
  services: ServiceResponse;
}

export const getServicesByUser =
  async (): Promise<GetServicesByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: services }: { data: ServiceResponse } = await api.get(
      `/services/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { services };
  };
