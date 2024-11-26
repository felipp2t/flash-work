import { api } from "@/lib/api";

interface UpdateUserRequest {
  name: string;
  description: string;
  phone: string;
  profilePicture: File | null;
}

export const updateUser = async ({
  name,
  phone,
  description,
  profilePicture
}: UpdateUserRequest) => {
  const token = localStorage.getItem("token");
  await api.put(
    "/users",
    {
      description,
      phone,
      name,
      profilePicture
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
