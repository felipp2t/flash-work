import { PageTitle } from "@/components/page-title";
import { Region } from "../../components/services/region";

export const RegionsServicePage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <PageTitle title="Serviços - Região" />

      <div className="flex h-full flex-col gap-16">
        <Region />
      </div>
    </div>
  );
};
