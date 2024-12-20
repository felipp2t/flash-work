import { PageTitle } from "@/components/page-title";

import { MyServiceList } from "../components/services/my-service-list";
import { CreateServiceButton } from "./components/create-service-button";
import { SelectServicesByStatus } from "./components/select-services-by-status";

export const MyServicesPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Meus Serviços" />
        <div className="flex items-center gap-4">
          <SelectServicesByStatus />
          <CreateServiceButton />
        </div>
      </div>

      <div className="flex h-full flex-col gap-16">
        <MyServiceList />
      </div>
    </div>
  );
};
