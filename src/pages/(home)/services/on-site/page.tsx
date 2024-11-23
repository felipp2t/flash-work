import { PageTitle } from "@/components/page-title";
import { OnSite } from "../../components/services/onsite";

export const OnSiteServicesPage = () => {
  return (
    <div className="flex flex-1 h-full flex-col gap-16 p-4">
      <PageTitle title="Serviços - Presenciais" />

      <div className="flex h-full flex-col gap-16">
        <OnSite />
      </div>
    </div>
  );
};
