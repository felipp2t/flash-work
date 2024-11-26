import { ServiceResponse } from "@/@types/service/service-response";
import { api } from "@/lib/api";

interface GetServiceByUserLocationRequest {
  page: number;
  size: number;
  addressId: string;
}

interface GetServiceByUserLocationResponse {
  services: ServiceResponse;
}

export const getServiceByUserLocation = async ({
  page,
  size,
  addressId,
}: GetServiceByUserLocationRequest): Promise<GetServiceByUserLocationResponse> => {
  const token = localStorage.getItem("token");

  const params = {
    page: page - 1,
    size,
  };

  const { data: services }: { data: ServiceResponse } = await api.get(
    `/services/city/${addressId}`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { services };
};
