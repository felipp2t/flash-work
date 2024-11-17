import { User } from "@/@types/user";
import { env } from "@/env";
import axios from "axios";

interface GetUserByIdRequest {
  userId: string;
}

interface GetUserByIdResponse {
  user: User;
}

export const getUserById = async ({
  userId,
}: GetUserByIdRequest): Promise<GetUserByIdResponse> => {
  const { data: user }: { data: User } = await axios.get(
    `${env.BACKEND_ENDPOINT}/users/${userId}/profile`,
  );

  return { user };
};
