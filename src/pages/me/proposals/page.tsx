import { PageTitle } from "@/components/page-title";
import { ServiceList } from "@/components/service-list";
import { MyProposals } from "../components/proposals/my-proposals";

export const MyProposalsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex w-full justify-between">
        <PageTitle title="Minhas Propostas" />
      </div>

      <div className="flex flex-col gap-16">
        <ServiceList>
          <MyProposals />
        </ServiceList>
      </div>
    </div>
  );
};
