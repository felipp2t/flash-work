import { ServiceRequest } from "@/@types/service/service-request";
import { api } from "@/lib/api";

interface createServiceRequest {
  service: ServiceRequest;
}

export const createService = async (params: createServiceRequest) => {
  const token = localStorage.getItem("token");
  await api.post(
    "/services",
    {
      ...params.service,
      budget: `${params.service.budget.min}-${params.service.budget.max}`,
      addressId: params.service.location.id,
      categories: params.service.categories.map((category) => category.id),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
