import { PageTitle } from "@/components/page-title";
import { MyProposals } from "../components/proposals/my-proposals";

export const MyProposalsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <PageTitle title="Minhas Propostas" />

      <div className="flex h-full flex-col gap-6">
        <MyProposals />
      </div>
    </div>
  );
};
