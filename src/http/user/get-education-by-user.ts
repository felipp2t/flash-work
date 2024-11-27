import { EducationResponse } from "@/@types/education/education-response";
import { api } from "@/lib/api";

interface GetEducationByUserResponse {
  educations: EducationResponse;
}

export const getEducationsByUser =
  async (): Promise<GetEducationByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: educations }: { data: EducationResponse } = await api.get(
      "/educations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { educations };
  };
