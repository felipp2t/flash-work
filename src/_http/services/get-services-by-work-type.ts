import { ServiceResponse } from "@/@types/service/service-response";
import { env } from "@/env";
import axios from "axios";

interface GetServicesByWorkTypeRequest {
  workType: "REMOTE" | "ONSITE";
}

interface GetServicesByWorkTypeResponse {
  services: ServiceResponse[];
}

export const getServicesByWorkType = async ({
  workType,
}: GetServicesByWorkTypeRequest): Promise<GetServicesByWorkTypeResponse> => {
  const { data: services }: { data: ServiceResponse[] } = await axios.get(
    `${env.BACKEND_ENDPOINT}/services/work-type/${workType}`,
  );

  return { services };
};
