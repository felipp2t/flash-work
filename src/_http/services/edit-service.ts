import { ServiceRequest } from "@/@types/service/service-request";
import { env } from "@/env";
import axios from "axios";

interface EditServiceRequest {
  service: ServiceRequest;
}

export const editService = async ({ service }: EditServiceRequest) => {
  const token = localStorage.getItem("token");

  await axios.put(
    `${env.BACKEND_ENDPOINT}/services/${service.id}`,
    {
      title: service.title,
      description: service.description,
      budget: `${service.budget.min}-${service.budget.max}`,
      deadline: service.deadline,
      workType: service.workType,
      location: service.location,
      categories: service.categories,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
