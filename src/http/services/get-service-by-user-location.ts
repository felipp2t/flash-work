import { ServiceResponse } from "@/@types/service/service-response";
import { api } from "@/lib/api";

interface GetServiceByUserLocationRequest {
  page: number;
  size: number;
}

interface GetServiceByUserLocationResponse {
  services: ServiceResponse;
}

export const getServiceByUserLocation = async ({
  page,
  size,
}: GetServiceByUserLocationRequest): Promise<GetServiceByUserLocationResponse> => {
  const token = localStorage.getItem("token");

  const params = {
    page: page - 1,
    size,
  };

  const { data: services }: { data: ServiceResponse } = await api.get(
    "/services/location",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { services };
};
