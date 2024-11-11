import { PageTitle } from "@/_components/page-title";
import { ServiceList } from "../../_components/service-list";
import { Region } from "../../_components/services/region";

export const RegionsServicePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <PageTitle title="Serviços - Região" />

      <div className="flex flex-col gap-16">
        <ServiceList>
          <Region />
        </ServiceList>
      </div>
    </div>
  );
};
