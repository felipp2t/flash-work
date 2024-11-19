import { env } from "@/env";
import axios from "axios";

interface SendEmailRequest {
  email: string;
}

interface SendEmailResponse {
  email: string;
}

export const sendEmail = async (
  params: SendEmailRequest,
): Promise<SendEmailResponse> => {
  await axios.post(`${env.BACKEND_ENDPOINT}/forgot-password`, params);

  const email = encodeURIComponent(params.email);

  return { email };
};
