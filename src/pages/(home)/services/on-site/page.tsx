import { PageTitle } from "@/_components/page-title";
import { ServiceList } from "../../_components/service-list";
import { OnSite } from "../../_components/services/onsite";

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
