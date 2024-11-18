import { env } from "@/env";
import axios from "axios";

interface DeleteServiceRequest {
  serviceId: string;
}

export const deleteService = async ({ serviceId }: DeleteServiceRequest) => {
  const token = localStorage.getItem("token");

  await axios.delete(`${env.BACKEND_ENDPOINT}/services/${serviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
