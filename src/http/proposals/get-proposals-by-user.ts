import { ProposalResponse } from "@/@types/proposal/proposal-response";
import { api } from "@/lib/api";

interface GetProposalsByUserResponse {
  proposals: ProposalResponse;
}

export const getProposalsByUser =
  async (): Promise<GetProposalsByUserResponse> => {
    const token = localStorage.getItem("token");
    const { data: proposals }: { data: ProposalResponse } = await api.get(
      `/proposals/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { proposals };
  };
