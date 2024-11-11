import { SkeletonCardService } from "@/_components/skeleton-card-service";
import { getServicesByWorkType } from "@/_http/services/get-services-by-work-type";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "../service-card";

export const OnSite = () => {
  const { data } = useQuery({
    queryKey: ["get-onsite-services"],
    queryFn: async () => await getServicesByWorkType({ workType: "ONSITE" }),
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
