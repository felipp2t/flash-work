import { ServiceResponse } from "@/@types/service/service-response";
import { ServiceStatus } from "@/@types/service/status";
import { api } from "@/lib/api";

interface GetServicesByUserRequest {
  status: ServiceStatus;
}

interface GetServicesByUserResponse {
  services: ServiceResponse;
}

export const getServicesByUser = async ({
  status,
}: GetServicesByUserRequest): Promise<GetServicesByUserResponse> => {
  const token = localStorage.getItem("token");

  const { data: services }: { data: ServiceResponse } = await api.get(
    `/services/user/${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { services };
};
