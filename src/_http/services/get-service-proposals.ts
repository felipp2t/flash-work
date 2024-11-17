import { Proposal } from "@/@types/proposal";
import { env } from "@/env";
import axios from "axios";

interface GetServiceProposalsRequest {
  serviceId: string;
}

interface GetServiceProposalsResponse {
  proposals: Proposal[];
}

export const getServiceProposals = async ({
  serviceId,
}: GetServiceProposalsRequest): Promise<GetServiceProposalsResponse> => {
  const { data: proposals }: { data: Proposal[] } = await axios.get(
    `${env.BACKEND_ENDPOINT}/proposals/service/${serviceId}`,
  );

  return { proposals };
};
