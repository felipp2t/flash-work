import { api } from "@/lib/api";

interface AcceptProposalRequest {
  proposalId: string;
}

export const acceptProposal = async ({ proposalId }: AcceptProposalRequest) => {
  const token = localStorage.getItem("token");

  console.log(token)
  console.log(proposalId)
  
  await api.patch(`/proposals/${proposalId}/accept`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
