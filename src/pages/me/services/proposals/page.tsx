import { PageTitle } from "@/components/page-title";
import { ServiceProposals } from "../../components/services/proposals/service-proposals";

export const ServiceProposalsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <PageTitle title="Proposta do meu serviço" />

      <div className="flex h-full flex-col gap-16">
        <ServiceProposals />
      </div>
    </div>
  );
};
