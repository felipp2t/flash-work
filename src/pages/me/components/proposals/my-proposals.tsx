import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getProposalsByUser } from "@/http/proposals/get-proposals-by-user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ProposalCard } from "../cards/proposal-card";

export const MyProposals = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const perPage = searchParams.get("per_page")
    ? Number(searchParams.get("per_page"))
    : 10;

  const { data } = useQuery({
    queryKey: ["get-proposals-by-user", page, perPage],
    queryFn: async () => await getProposalsByUser(),
    staleTime: 1000 * 60 * 15,
  });

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
              <ProposalCard key={proposal.id} proposal={proposal} />
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
