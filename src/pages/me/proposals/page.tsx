import { PageTitle } from "@/components/page-title";
import { MyProposals } from "../components/proposals/my-proposals";
import { SelectProposalByStatus } from "./components/select-proposal-by-status";

export const MyProposalsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Minhas Propostas" />
        <SelectProposalByStatus />
      </div>

      <div className="flex h-full flex-col gap-6">
        <MyProposals />
      </div>
    </div>
  );
};
