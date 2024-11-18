import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getProposalsByUser } from "@/http/proposals/get-proposals-by-user";
import { useQuery } from "@tanstack/react-query";
import { ProposalCard } from "../cards/proposal-card";

export const MyProposals = () => {
  const { data } = useQuery({
    queryKey: ["get-proposals-by-user"],
    queryFn: async () => await getProposalsByUser(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <>
      {!data
        ? Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))
        : data.proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
    </>
  );
};
