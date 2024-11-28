import { api } from "@/lib/api";

interface SignContractRequets {
  imageBase64: string;
  contractId: string;
}

export const signContract = async ({
  imageBase64,
  contractId,
}: SignContractRequets) => {
  const token = localStorage.getItem("token");
  await api.post(
    `/contracts/${contractId}/sign`,
    {
      image: imageBase64,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
