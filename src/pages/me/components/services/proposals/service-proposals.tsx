import { Pagination } from "@/components/pagination";
import { ServiceList } from "@/components/service-list";
import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getServiceProposals } from "@/http/services/get-service-proposals";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { ProposalCard } from "../../cards/proposal-card";

export const ServiceProposals = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data } = useQuery({
    queryKey: ["get-service-proposals", id],
    queryFn: async () => {
      if (id) {
        return await getServiceProposals({ serviceId: id });
      }
    },
  });

  return (
    <>
      {!data ? (
        Array.from({ length: 20 }).map((_, i) => (
          <SkeletonCardService key={i} />
        ))
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
