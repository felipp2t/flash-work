import { env } from "@/env";
import axios from "axios";

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export const verifyOTP = async (params: VerifyOTPRequest) => {
  await axios.post(
    `${env.BACKEND_ENDPOINT}/forgot-password/verify-otp?email=${params.email}`,
    {
      otp: params.otp,
    },
  );
};
