import { ServiceResponse } from "@/@types/service/service-response";
import { api } from "@/lib/api";

interface GetServicesByWorkTypeRequest {
  workType: "REMOTE" | "ONSITE";
  page: number;
  size: number;
}

interface GetServicesByWorkTypeResponse {
  services: ServiceResponse;
}

export const getServicesByWorkType = async ({
  workType,
  page,
  size,
}: GetServicesByWorkTypeRequest): Promise<GetServicesByWorkTypeResponse> => {
  const params = {
    page: page - 1,
    size,
  };

  const { data: services }: { data: ServiceResponse } = await api.get(
    `/services/work-type/${workType}`,
    {
      params,
    },
  );

  return { services };
};
