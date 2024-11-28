import { PageTitle } from "@/components/page-title";

export const ContractsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-16 p-4">
      <PageTitle title="Seus Contratos Pendentes" />

      <div className="flex h-full flex-col gap-6">
        <Remotes />
      </div>
    </div>
  );
};
