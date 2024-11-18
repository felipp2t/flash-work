import { PageTitle } from "@/components/page-title";
import { ServiceList } from "@/components/service-list";
import { MyServices } from "../components/services/my-services";

export const MyServicesPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex w-full justify-between">
        <PageTitle title="Meus Serviços" />
      </div>

      <div className="flex flex-col gap-16">
        <ServiceList>
          <MyServices />
        </ServiceList>
      </div>
    </div>
  );
};
