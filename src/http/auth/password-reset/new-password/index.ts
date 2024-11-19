import { env } from "@/env";
import axios from "axios";

interface UpdatePasswordRequest {
  password: string;
  passwordConfirmation: string;
  email: string;
}

export const updatePassword = async (params: UpdatePasswordRequest) => {
  await axios.post(
    `${env.BACKEND_ENDPOINT}/forgot-password/reset-password?email=${params.email}`,
    {
      password: params.password,
      confirmPassword: params.passwordConfirmation,
    },
  );
};
