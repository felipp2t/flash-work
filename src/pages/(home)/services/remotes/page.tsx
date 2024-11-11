import { PageTitle } from "@/_components/page-title";
import { ServiceList } from "../../_components/service-list";
import { Remotes } from "../../_components/services/remote";

export const RemotesServicePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <PageTitle title="Serviços - Remotos" />

      <div className="flex flex-col gap-16">
        <ServiceList>
          <Remotes />
        </ServiceList>
      </div>
    </div>
  );
};
