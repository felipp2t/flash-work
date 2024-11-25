import { ServiceRequest } from "@/@types/service/service-request";
import { api } from "@/lib/api";

interface EditServiceRequest {
  service: ServiceRequest;
}

export const editService = async (params: EditServiceRequest) => {
  const token = localStorage.getItem("token");

  await api.put(
    `/services/${params.service.id}`,
    {
      ...params.service,
      budget: `${params.service.budget.min}-${params.service.budget.max}`,
      addressId: params.service.location.id,
      deadline: params.service.deadline,
      categories: params.service.categories.map((category) => category.id),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
