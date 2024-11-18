import { PageTitle } from "@/components/page-title";
import { ServiceList } from "../../../../components/service-list";
import { OnSite } from "../../components/services/onsite";

export const OnSiteServicesPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <PageTitle title="Serviços - Presenciais" />

      <div className="flex flex-col gap-16">
        <ServiceList>
          <OnSite />
        </ServiceList>
      </div>
    </div>
  );
};
