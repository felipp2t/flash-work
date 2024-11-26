import { Education } from "@/@types/education";
import { api } from "@/lib/api";

interface GetEducationByUserResponse {
  educations: Education[];
}

export const getEducationsByUser =
  async (): Promise<GetEducationByUserResponse> => {
    const token = localStorage.getItem("token");

    const { data: educations }: { data: Education[] } = await api.get(
      "/educations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { educations };
  };
