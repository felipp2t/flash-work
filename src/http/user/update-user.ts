import { api } from "@/lib/api";

interface UpdateUserRequest {
  name: string;
  description: string;
  phone: string;
  profileImage: File | null;
}

export const updateUser = async ({
  name,
  phone,
  description,
  profileImage
}: UpdateUserRequest) => {
  const token = localStorage.getItem("token");
  await api.put(
    "/users",
    {
      description,
      phone,
      name,
      profileImage
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
