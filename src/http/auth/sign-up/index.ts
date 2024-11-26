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

  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  formData.append("dateBirth", params.dateBirth);
  formData.append("cpf", params.cpf);
  formData.append("password", params.password);
  formData.append("confirmPassword", params.confirmPassword);

  if (params.profilePhoto) {
    formData.append("profilePhoto", params.profilePhoto);
  }

  await axios.post(`${env.BACKEND_ENDPOINT}/auth/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};