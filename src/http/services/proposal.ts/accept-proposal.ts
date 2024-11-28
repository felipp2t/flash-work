import { DigitalContract } from "@/@types/digital-contract/digital-contract";
import { api } from "@/lib/api";

interface AcceptProposalRequest {
  proposalId: string;
}

interface AcceptProposalResponse {
  digitalContract: DigitalContract;
}

export const acceptProposal = async ({
  proposalId,
}: AcceptProposalRequest): Promise<AcceptProposalResponse> => {
  const token = localStorage.getItem("token");

  const { data: digitalContract }: { data: DigitalContract } = await api.patch(
    `/proposals/${proposalId}/accept`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { digitalContract };
};
