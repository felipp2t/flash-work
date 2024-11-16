import { env } from "@/env";
import axios from "axios";

interface DeleteProposalRequest {
  proposalId: string;
}

export const deleteProposal = async (params: DeleteProposalRequest) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${env.BACKEND_ENDPOINT}/proposals/${params.proposalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
