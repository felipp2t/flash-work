import { env } from "@/env";
import axios from "axios";
import { sendProposalSchema } from "./schema";

interface SendProposalRequest {
  serviceId: string;
  message: string;
  offerAmount: number;
  estimatedCompletionTime: Date;
}

export const sendProposal = async (params: SendProposalRequest) => {
  sendProposalSchema.parse(params);

  const token = localStorage.getItem("token");
  await axios.post(`${env.BACKEND_ENDPOINT}/proposals`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
