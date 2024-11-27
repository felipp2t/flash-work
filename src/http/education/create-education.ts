import { Education } from "@/@types/education/education";
import { api } from "@/lib/api";

interface CreateEducationProps {
  education: Omit<Education, "id">;
}

export const createEducation = async ({ education }: CreateEducationProps) => {
  const token = localStorage.getItem("token");

  await api.post("/educations", education, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
