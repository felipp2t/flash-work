import { QRCode } from "@/@types/qr-code";
import { env } from "@/env";
import axios from "axios";

interface SendDepositRequest {
  transactionAmount: number;
  description?: string;
  payer: {
    firstName: string;
    lastName: string;
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
}

interface SendDepositResponse {
  payment: QRCode;
}

export const sendDeposit = async (
  params: SendDepositRequest,
): Promise<SendDepositResponse> => {
  const token = localStorage.getItem("token");
  const { data: payment }: { data: QRCode } = await axios.post(
    `${env.BACKEND_ENDPOINT}/process_payment/pix`,
    {
      ...params,
      description: params.description || "Deposit",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { payment };
};
