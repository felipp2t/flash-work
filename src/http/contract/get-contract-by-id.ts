import { DigitalContract } from "@/@types/digital-contract/digital-contract";
import { api } from "@/lib/api";

interface GetContractByIdRequest {
  digitalContractId: string;
}

interface GetContractByIdResponse {
  digitalContract: DigitalContract;
}

export const getContractById = async ({
  digitalContractId,
}: GetContractByIdRequest): Promise<GetContractByIdResponse> => {
  const { data: digitalContract }: { data: DigitalContract } = await api.get(
    `/contracts/${digitalContractId}`,
  );

  return { digitalContract };
};
