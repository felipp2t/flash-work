import { env } from "@/env";
import axios from "axios";
import { signUpSchema } from "./schema";

interface signUpRequest {
  name: string;
  email: string;
  phone: string;
  dateBirth: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  profilePhoto: File | null;
}

export const signUp = async (params: signUpRequest): Promise<void> => {
  signUpSchema.parse(params);

  console.log(params)

  await axios.post(`${env.BACKEND_ENDPOINT}/auth/register`, {
    ...params,
    birthDate: params.dateBirth
  });
};
