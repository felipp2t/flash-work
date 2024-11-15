import { ServiceResponse } from "@/@types/service/service-response";
import { env } from "@/env";
import axios from "axios";

interface GetServiceByIdRequest {
  serviceId: string;
}

interface GetServiceByIdResponse {
  service: ServiceResponse;
}

export const getServiceById = async ({
  serviceId,
}: GetServiceByIdRequest): Promise<GetServiceByIdResponse> => {
  const { data: service }: { data: ServiceResponse } = await axios.get(
    `${env.BACKEND_ENDPOINT}/services/${serviceId}`,
  );

  return { service };
};
