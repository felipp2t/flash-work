import { PageTitle } from "@/components/page-title";
import { AddressesTable } from "./components/addresses-table";
import { CreateAddressButton } from "./components/create-address-button";

export const AddressPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Seus Endereços Cadastrados" />

        <CreateAddressButton />
      </div>

      <AddressesTable />
    </div>
  );
};
