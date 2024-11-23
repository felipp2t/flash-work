import { Service } from "@/@types/service/service";
import { env } from "@/env";
import axios from "axios";

interface GetServiceByIdRequest {
  serviceId: string;
}

interface GetServiceByIdResponse {
  service: Service;
}

export const getServiceById = async ({
  serviceId,
}: GetServiceByIdRequest): Promise<GetServiceByIdResponse> => {
  const { data: service }: { data: Service } = await axios.get(
    `${env.BACKEND_ENDPOINT}/services/${serviceId}`,
  );

  return { service };
};
