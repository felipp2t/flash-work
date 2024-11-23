import { PageTitle } from "@/components/page-title";
import { AddressesTable } from "./components/addresses-table";

export const AddressPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <PageTitle title="Seus Endereços Cadastrados" />

      <AddressesTable />
    </div>
  );
};
