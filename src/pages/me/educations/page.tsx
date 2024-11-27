import { PageTitle } from "@/components/page-title";
import { AddEducationButton } from "./components/add-education-button";
import { EducationsTable } from "./components/educations-table";

export const ProfileEducationsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-16 p-4">
      <div className="flex items-center justify-between">
        <PageTitle title="Seus Endereços Cadastrados" />

        <AddEducationButton />
      </div>

      <EducationsTable />
    </div>
  );
};
