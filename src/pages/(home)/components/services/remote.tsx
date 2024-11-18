import { SkeletonCardService } from "@/components/skeleton-card-service";
import { getServicesByWorkType } from "@/http/services/get-services-by-work-type";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../../../../components/service-card";

export const Remotes = () => {
  const { data } = useQuery({
    queryKey: ["get-remotes-services"],
    queryFn: async () => await getServicesByWorkType({ workType: "REMOTE" }),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <>
      {!data
        ? Array.from({ length: 20 }).map((_, i) => (
            <SkeletonCardService key={i} />
          ))
        : data.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
    </>
  );
};
