import { PageTitle } from "@/components/page-title";
import { AddAddressButton } from "./components/add-address-button";
import { AddressesTable } from "./components/addresses-table";

export const AddressPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Seus Endereços Cadastrados" />

        <AddAddressButton />
      </div>

      <AddressesTable />
    </div>
  );
};
