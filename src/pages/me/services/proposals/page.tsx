import { PageTitle } from "@/_components/page-title";
import { ServiceList } from "@/_components/service-list";
import { ServiceProposals } from "../../_components/services/proposals/service-proposals";

export const ServiceProposalsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex w-full justify-between">
        <PageTitle title="Propostas do meu Serviço" />
      </div>

      <div className="flex flex-col gap-16">
        <ServiceList>
          <ServiceProposals />
        </ServiceList>
      </div>
    </div>
  );
};
