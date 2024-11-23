import { ServiceResponse } from "@/@types/service/service-response";
import { api } from "@/lib/api";

interface GetServiceByCategoryRequest {
  categoryId: string;
  page: number;
  size: number;
}

interface GetServicesByCategoryResponse {
  services: ServiceResponse;
}

export const getServiceByCategory = async ({
  categoryId,
  page,
  size,
}: GetServiceByCategoryRequest): Promise<GetServicesByCategoryResponse> => {
  const params = {
    page: page - 1,
    size,
  };

  const { data: services }: { data: ServiceResponse } = await api.get(
    `/services/categories/${categoryId}`,
    {
      params,
    },
  );

  return { services };
};
