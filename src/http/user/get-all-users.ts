import { UserResponse } from "@/@types/user/userResponse";
import { api } from "@/lib/api";

interface GetAllUsersProps {
  page: number;
  size: number;
}

interface GetAllUsersResponse {
  users: UserResponse;
}

export const getAllUsers = async ({
  page,
  size,
}: GetAllUsersProps): Promise<GetAllUsersResponse> => {
  const params = {
    page: page - 1,
    size,
  };

  const { data: users }: { data: UserResponse } = await api.get("/users/all", {
    params,
  });

  return { users };
};
