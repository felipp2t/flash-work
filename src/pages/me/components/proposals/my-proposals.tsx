import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { Card, CardContent } from "@/components/ui/card";
import { getProposalsByUser } from "@/http/proposals/get-proposals-by-user";
import { useQuery } from "@tanstack/react-query";
import { HandHelping } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { MyServiceProposalCard } from "../cards/service-proposal-card";
import { STATUS_PROPOSAL } from "@/constants/status-proposal";

export const MyProposals = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;
  const status = searchParams.get("status") || "PENDING";

  const { data } = useQuery({
    queryKey: ["get-proposals-by-user", page, perPage],
    queryFn: async () => await getProposalsByUser(),
    staleTime: 1000 * 60 * 15,
  });

  if (data && data.proposals.empty) {
    return (
      <Card className="bg-white/5">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <HandHelping className="mb-4 size-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold capitalize text-muted-foreground">
            Nenhuma Proposta{" "}
            {STATUS_PROPOSAL[status as keyof typeof STATUS_PROPOSAL]}
          </h2>
          <p className="mb-6 max-w-sm text-center text-muted-foreground">
            Você não tem nenhuma proposta{" "}
            {STATUS_PROPOSAL[status as keyof typeof STATUS_PROPOSAL]} no
            momento. Mas você pode adicionar ao enviar uma para os serviços da aba "Serviços"
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {!data ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))}
        </div>
      ) : (
        <>
          <ServiceList>
            {data.proposals.content.map((proposal) => (
              <MyServiceProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </ServiceList>

          <Pagination
            items={data.proposals.totalElements}
            page={page}
            pages={data.proposals.totalPages}
          />
        </>
      )}
    </>
  );
};
