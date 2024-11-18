import { Proposal } from "@/@types/proposal";
import { env } from "@/env";
import axios from "axios";

interface GetProposalsByUserResponse {
  proposals: Proposal[];
}

export const getProposalsByUser =
  async (): Promise<GetProposalsByUserResponse> => {
    const token = localStorage.getItem("token");
    const { data: proposals }: { data: Proposal[] } = await axios.get(
      `${env.BACKEND_ENDPOINT}/proposals/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { proposals };
  };
