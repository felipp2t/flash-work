import { api } from "@/lib/api";

interface DeleteEducationRequest {
  educationId: string;
}

export const deleteEducation = async ({
  educationId,
}: DeleteEducationRequest) => {
  const token = localStorage.getItem("token");
  await api.delete(`/educations/${educationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
