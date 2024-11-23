import { User } from "@/@types/user/user";
import { env } from "@/env";
import axios from "axios";

interface GetUserByTokenResponse {
  user: User;
}

export const getUserByToken = async (): Promise<GetUserByTokenResponse> => {
  const token = localStorage.getItem("token");

  const { data: user }: { data: User } = await axios.get(
    `${env.BACKEND_ENDPOINT}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { user };
};
