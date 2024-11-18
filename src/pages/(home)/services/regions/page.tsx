import { PageTitle } from "@/components/page-title";
import { ServiceList } from "../../../../components/service-list";
import { Region } from "../../components/services/region";

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
