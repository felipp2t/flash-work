import { env } from "@/env";
import axios from "axios";
import { signInSchema } from "./schema";

interface signInRequest {
  email: string;
  password: string;
}

interface signInResponse {
  token: string;
}

export const signIn = async (
  params: signInRequest,
): Promise<signInResponse> => {
  signInSchema.parse(params);

  const {
    data: { token },
  }: { data: signInResponse } = await axios.post(
    `${env.BACKEND_ENDPOINT}/auth/login`,
    params,
  );
  console.log(token)

  return { token };
};
