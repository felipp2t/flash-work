import { ServiceResponse } from "@/@types/service/service-response";
import { env } from "@/env";
import axios from "axios";

interface GetServiceByCategoryRequest {
  categoryId: string;
}

interface GetServicesByCategoryResponse {
  services: ServiceResponse[];
}

export const getServiceByCategory = async ({
  categoryId,
}: GetServiceByCategoryRequest): Promise<GetServicesByCategoryResponse> => {
  const { data: services }: { data: ServiceResponse[] } = await axios.get(
    `${env.BACKEND_ENDPOINT}/services/categories/${categoryId}`,
  );

  return { services };
};
