import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getServiceProposals } from "@/http/services/get-service-proposals";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ServiceProposalCard } from "./service-proposal-card";

export const ServiceProposals = () => {
  const { id } = useParams();

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
      {!data
        ? Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))
        : data.proposals.map((proposal) => (
            <ServiceProposalCard key={proposal.id} proposal={proposal} />
          ))}
    </>
  );
};
