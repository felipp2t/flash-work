import { api } from "@/lib/api";

interface CancelProposalRequest {
  proposalId: string;
}

export const cancelProposal = async ({ proposalId }: CancelProposalRequest) => {
  const token = localStorage.getItem("token");
  await api.delete(`/proposals/${proposalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
