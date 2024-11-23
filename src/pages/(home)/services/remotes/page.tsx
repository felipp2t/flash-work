import { PageTitle } from "@/components/page-title";
import { Remotes } from "../../components/services/remote";

export const RemotesServicePage = () => {
  return (
    <div className="flex flex-1 h-full flex-col gap-16 p-4">
      <PageTitle title="Serviços - Remotos" />

      <div className="flex h-full flex-col gap-6">
        <Remotes />
      </div>
    </div>
  );
};
