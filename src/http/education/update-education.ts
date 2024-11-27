import { Education } from "@/@types/education/education";
import { api } from "@/lib/api";

interface UpdateEducationProps {
  education: Omit<Education, "id">;
  educationId: string;
}

export const updateEducation = async ({
  educationId,
  education,
}: UpdateEducationProps) => {
  const token = localStorage.getItem("token");

  await api.put(`/educations/${educationId}`, education, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
