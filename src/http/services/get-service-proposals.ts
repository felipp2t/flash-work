import { ProposalResponse } from "@/@types/proposal/proposal-response";
import { api } from "@/lib/api";

interface GetServiceProposalsRequest {
  serviceId: string;
}

interface GetServiceProposalsResponse {
  proposals: ProposalResponse;
}

export const getServiceProposals = async ({
  serviceId,
}: GetServiceProposalsRequest): Promise<GetServiceProposalsResponse> => {
  const { data: proposals }: { data: ProposalResponse } = await api.get(
    `/proposals/service/${serviceId}`,
  );

  return { proposals };
};
