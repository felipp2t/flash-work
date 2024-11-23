import { User } from "@/@types/user/user";
import { api } from "@/lib/api";

interface GetUserByIdRequest {
  userId: string;
}

interface GetUserByIdResponse {
  user: User;
}

export const getUserById = async ({
  userId,
}: GetUserByIdRequest): Promise<GetUserByIdResponse> => {
  const { data: user }: { data: User } = await api.get(
    `/users/${userId}/profile`,
  );

  return { user };
};
